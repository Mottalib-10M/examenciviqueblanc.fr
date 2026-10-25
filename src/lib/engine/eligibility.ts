/**
 * Date à partir de laquelle on peut demander la naturalisation, la nationalité par mariage ou une
 * première carte de résident, et ce qu'il faut pour chaque titre (examen civique, niveau de français).
 * Règles lues sur service-public.gouv.fr (F2213, F2726, F2208, F17359, F39530, F11926) et sur
 * Légifrance ; chiffres dans params-2026.json. Aucune lecture de l'horloge : « aujourd'hui » est
 * passé par l'appelant (RECETTE §17.5).
 */
import P from '../../data/params-2026.json';
import { addMonths, addYears, dayNum, isoOf, maxIso, type Iso, type Trip } from './dates';

export type Route =
  | 'nat5' | 'nat2' | 'nat0' // naturalisation : cas général, durée réduite à 2 ans, sans durée minimale
  | 'mariage'                // déclaration de nationalité par mariage
  | 'crSpouse' | 'crFamily' | 'crParent' | 'ldue'; // carte de résident

export interface DateInput {
  route: Route;
  /** début de la résidence habituelle en France (naturalisation), du séjour régulier (regroupement familial, LD-UE),
   *  date du mariage (conjoint de Français, nationalité par mariage) ou de la 1re carte vie privée et familiale (parent) */
  start: Iso;
  /** date de naissance : la demande de naturalisation peut être déposée dès 17 ans */
  birth?: Iso;
  /** conjoint de Français tunisien : 1 an au lieu de 3 */
  tunisian?: boolean;
  /** nationalité par mariage : résidence en France ininterrompue d'au moins 3 ans depuis le mariage */
  livedInFrance3y?: boolean;
  trips?: Trip[];
}
export interface DateResult {
  earliest: Iso | null;
  rows: Array<{ k: string; v: string | number; ok?: boolean }>;
  /** l'examen civique est-il exigé pour cette démarche ? */
  exam: 'nat' | 'cr' | null;
  level: string;
  fee: number;
}

export function yearsFor(route: Route, tunisian = false, livedInFrance3y = true): number {
  const n = P.naturalisation, r = P.residentCard, m = P.marriage;
  switch (route) {
    case 'nat5': return n.residenceYears;
    case 'nat2': return n.reducedYears;
    case 'nat0': return 0;
    case 'mariage': return livedInFrance3y ? m.years : m.yearsIfNotResident;
    case 'crSpouse': return tunisian ? r.spouseYearsTunisia : r.spouseYears;
    case 'crFamily': return r.familyReunionYears;
    case 'crParent': return r.parentYears;
    case 'ldue': return r.ldueYears;
  }
}

/** Mois entiers entre deux dates (pour la règle des absences de la carte de résident de longue durée-UE). */
export function monthsBetween(a: Iso, b: Iso): number {
  const [y1, m1, d1] = a.split('-').map(Number), [y2, m2, d2] = b.split('-').map(Number);
  return (y2 - y1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
}

/**
 * Carte de résident de longue durée-UE : 5 ans de séjour ininterrompu, absences autorisées d'au plus
 * 6 mois consécutifs et 10 mois au total sur la période (F17359). Une absence se compte du lendemain
 * du départ à la veille du retour ; 10 mois = jours de la période de 10 mois qui précède la date testée.
 */
export function ldueCheck(trips: Trip[], d: Iso) {
  const from = addYears(d, -P.residentCard.ldueYears);
  let total = 0, longest = 0, longestMonths = 0;
  for (const t of trips) {
    const back = t.back ?? d;
    const a = Math.max(dayNum(t.out) + 1, dayNum(from)), b = Math.min(dayNum(back) - 1, dayNum(d) - 1);
    if (b < a) continue;
    total += b - a + 1;
    if (b - a + 1 > longest) { longest = b - a + 1; longestMonths = monthsBetween(isoOf(a - 1), isoOf(b + 1)); }
  }
  const totalCap = dayNum(d) - dayNum(addMonths(d, -P.residentCard.ldueMaxTotalMonths));
  // absence trop longue : dernier jour d'absence (veille du retour) au-delà de départ + 6 mois, pour un voyage qui touche la période
  const consecOk = trips.every((t) => !t.back || dayNum(t.back) - 1 < dayNum(from) || dayNum(t.back) - 1 <= dayNum(addMonths(t.out, P.residentCard.ldueMaxConsecutiveMonths)));
  return { total, totalCap, longest, longestMonths, ok: consecOk && total <= totalCap, consecOk };
}

export function earliestDate(i: DateInput): DateResult {
  const y = yearsFor(i.route, i.tunisian, i.livedInFrance3y ?? true);
  const isNat = i.route.startsWith('nat');
  const isCr = i.route.startsWith('cr') || i.route === 'ldue';
  let d = addYears(i.start, y);
  const rows: DateResult['rows'] = [];
  if (isNat && i.birth) {
    const at17 = addYears(i.birth, P.naturalisation.fileFromAge);
    rows.push({ k: 'age', v: at17, ok: d >= at17 });
    d = maxIso(d, at17);
  }
  if (i.route === 'ldue') {
    const trips = i.trips ?? [];
    if (trips.some((t) => !t.back)) return { earliest: null, rows, exam: 'cr', level: P.language.cr, fee: P.fees.titleTotal };
    let n = 0;
    while (!ldueCheck(trips, d).ok && n < 365 * 20) { d = isoOf(dayNum(d) + 1); n++; }
    if (n >= 365 * 20) return { earliest: null, rows, exam: 'cr', level: P.language.cr, fee: P.fees.titleTotal };
    const c = ldueCheck(trips, d);
    rows.push({ k: 'absTotal', v: c.total, ok: c.total <= c.totalCap }, { k: 'absCap', v: c.totalCap });
  }
  return {
    earliest: d,
    rows: [{ k: 'years', v: y }, ...rows],
    exam: isNat ? 'nat' : isCr ? 'cr' : null,
    level: isNat || i.route === 'mariage' ? P.language.nat : P.language.cr,
    fee: isNat || i.route === 'mariage' ? P.naturalisation.fee : P.fees.titleTotal,
  };
}

export type Title = 'cst' | 'csp' | 'cr' | 'ldue' | 'nat' | 'mariage';
export interface NeedInput { title: Title; first: boolean; age: number; protection: 'none' | 'refugee' | 'subsidiary' | 'stateless'; medical: boolean }
export interface Need { exam: 'csp' | 'cr' | 'nat' | null; level: string | null; reason: string; examReason: string }

/**
 * Quel examen et quel niveau de français pour mon titre ? (F39530, F2209, F2208, F17359, F39426, F11926)
 * - CST (carte d'un an) : ni examen ni niveau exigé à ce titre ;
 * - CSP : 1re demande, examen mention CSP et A2, sauf plus de 65 ans ; protection subsidiaire et apatrides non concernés ;
 * - carte de résident / LD-UE : 1re demande, examen mention CR et B1, sauf plus de 65 ans ;
 * - naturalisation : examen mention naturalisation et B2, à tout âge ; dispense possible pour raison médicale ;
 *   réfugié ou apatride de plus de 70 ans en France depuis 15 ans : dispensé du justificatif de français ;
 * - nationalité par mariage : pas d'examen civique, niveau B2.
 */
export function need(i: NeedInput): Need {
  const L = P.language, over65 = i.age > P.exam.exemptAgeOver;
  if (i.title === 'cst') return { exam: null, level: null, reason: 'cst', examReason: 'cst' };
  if (i.title === 'mariage') return { exam: null, level: i.medical ? null : L.marriage, reason: i.medical ? 'medical' : 'level', examReason: 'declaration' };
  if (i.title === 'nat') {
    const langExempt = i.medical || ((i.protection === 'refugee' || i.protection === 'stateless') && i.age > L.natExemptRefugeeAge);
    return { exam: i.medical ? null : 'nat', level: langExempt ? null : L.nat, reason: langExempt ? (i.medical ? 'medical' : 'refugee70') : 'level', examReason: i.medical ? 'medical' : 'required' };
  }
  if (!i.first) return { exam: null, level: null, reason: 'renewal', examReason: 'renewal' };
  if (over65) return { exam: null, level: null, reason: 'over65', examReason: 'over65' };
  if (i.medical) return { exam: null, level: null, reason: 'medical', examReason: 'medical' };
  if (i.title === 'csp') {
    if (i.protection !== 'none') return { exam: null, level: null, reason: 'protection', examReason: 'protection' };
    return { exam: 'csp', level: L.csp, reason: 'level', examReason: 'required' };
  }
  // carte de résident de 10 ans : la carte du réfugié n'est pas dans la liste des cartes concernées (F39530) ;
  // la carte de résident de longue durée-UE l'est, y compris pour les bénéficiaires d'une protection.
  if (i.title === 'cr' && i.protection === 'refugee') return { exam: null, level: null, reason: 'protection', examReason: 'protection' };
  return { exam: 'cr', level: L.cr, reason: 'level', examReason: 'required' };
}
