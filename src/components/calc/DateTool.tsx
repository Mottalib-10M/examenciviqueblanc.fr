/**
 * « À partir de quand puis-je demander ? » : naturalisation (5 ans, 2 ans ou sans durée), nationalité
 * par mariage (4 ou 5 ans) et première carte de résident (conjoint de Français, regroupement familial,
 * parent d'enfant français, longue durée-UE avec ses absences jour par jour). Premier rendu = jour du
 * build et dates d'exemple (RECETTE §17.5) ; aujourd'hui et le lien partagé après le montage.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { earliestDate, yearsFor, type Route } from '../../lib/engine/eligibility';
import { dayNum, type Trip } from '../../lib/engine/dates';
import { dateL, formatNumberL, money } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'fr';
const NB = ' ';
const iso = (s: string | null) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const ROUTES: Route[] = ['nat5', 'nat2', 'nat0', 'mariage', 'crSpouse', 'crFamily', 'crParent', 'ldue'];
const T = {
  fr: {
    route: 'Votre démarche',
    r: { nat5: 'Naturalisation, cas général (5 ans)', nat2: 'Naturalisation, durée réduite (2 ans)', nat0: 'Naturalisation sans durée minimale (réfugié…)', mariage: 'Nationalité par mariage (déclaration)', crSpouse: 'Carte de résident, conjoint de Français', crFamily: 'Carte de résident, regroupement familial', crParent: 'Carte de résident, parent d’enfant français', ldue: 'Carte de résident de longue durée-UE' } as Record<Route, string>,
    start: { nat5: 'Début de votre résidence habituelle en France', nat2: 'Début de votre résidence habituelle en France', nat0: 'Début de votre résidence en France', mariage: 'Date du mariage', crSpouse: 'Date du mariage', crFamily: 'Date d’entrée en France (regroupement familial)', crParent: 'Début de votre 1re carte vie privée et familiale', ldue: 'Début de votre séjour régulier en France' } as Record<Route, string>,
    birth: 'Date de naissance', tunisian: 'Nationalité tunisienne ?', lived: 'En France sans interruption depuis 3 ans depuis le mariage ?', no: 'Non', yes: 'Oui',
    trips: 'Séjours hors de France (passés et prévus)', left: 'Départ le', back: 'Retour le', add: 'Ajouter un séjour', remove: 'Retirer',
    head: 'Date à partir de laquelle vous pouvez déposer', none: 'Pas dans les 20 prochaines années avec ces absences', now: 'Vous pouvez déposer dès aujourd’hui', inDays: (d: number) => `dans ${formatNumberL(d, 'fr')} jours`,
    k: { years: 'Durée exigée', age: 'Dépôt possible dès 17 ans, le', absTotal: 'Jours d’absence sur les 5 ans', absCap: 'Plafond (10 mois)' } as Record<string, string>,
    yrs: (n: number) => (n === 0 ? 'aucune' : `${n}${NB}an${n > 1 ? 's' : ''}`), exam: `Examen civique${NB}:`, examV: { nat: 'mention naturalisation', cr: 'mention carte de résident', none: 'non exigé' }, level: `Niveau de français${NB}:`, fee: `Timbre fiscal${NB}:`,
    err: { order: 'Un retour précède son départ.', overlap: 'Deux séjours se chevauchent.' },
    rule: 'Absences : du lendemain du départ à la veille du retour. Carte de longue durée-UE : 6 mois consécutifs au plus et 10 mois au total sur les 5 ans.',
    note: 'Date indicative : la durée de résidence n’est qu’une condition parmi d’autres (titre de séjour valide, ressources, assimilation, casier judiciaire). La préfecture décide.',
  },
  en: {
    route: 'Your application',
    r: { nat5: 'Naturalisation, general case (5 years)', nat2: 'Naturalisation, reduced period (2 years)', nat0: 'Naturalisation with no minimum period (refugee…)', mariage: 'Nationality through marriage (declaration)', crSpouse: 'Resident card, spouse of a French citizen', crFamily: 'Resident card, family reunification', crParent: 'Resident card, parent of a French child', ldue: 'EU long-term resident card' } as Record<Route, string>,
    start: { nat5: 'Start of your habitual residence in France', nat2: 'Start of your habitual residence in France', nat0: 'Start of your residence in France', mariage: 'Date of the marriage', crSpouse: 'Date of the marriage', crFamily: 'Date you entered France (family reunification)', crParent: 'Start of your first private and family life permit', ldue: 'Start of your lawful stay in France' } as Record<Route, string>,
    birth: 'Date of birth', tunisian: 'Tunisian national?', lived: 'Lived in France without a break for 3 years since the marriage?', no: 'No', yes: 'Yes',
    trips: 'Time outside France (past and planned)', left: 'Left on', back: 'Back on', add: 'Add a trip', remove: 'Remove',
    head: 'Earliest date you can apply', none: 'Not within 20 years with these absences', now: 'You can apply today', inDays: (d: number) => `in ${formatNumberL(d, 'en')} days`,
    k: { years: 'Period required', age: 'You can file from age 17, on', absTotal: 'Days abroad over the 5 years', absCap: 'Cap (10 months)' } as Record<string, string>,
    yrs: (n: number) => (n === 0 ? 'none' : `${n} year${n > 1 ? 's' : ''}`), exam: 'Civic exam:', examV: { nat: 'naturalisation level', cr: 'resident card level', none: 'not required' }, level: 'French level:', fee: 'Tax stamp:',
    err: { order: 'A trip comes back before it leaves.', overlap: 'Two trips overlap.' },
    rule: 'Absences run from the day after you leave to the day before you return. EU long-term card: at most 6 months in a row and 10 months in total over the 5 years.',
    note: 'A guide date only: residence is one condition among others (valid permit, income, integration, criminal record). The préfecture decides.',
  },
} as const;
const DEF = { start: '2022-03-01', birth: '1990-06-15', trips: [{ out: '2024-07-12', back: '2024-08-20' }] as Trip[] };
interface Props { lang?: Lang; route?: Route; routes?: Route[]; idPrefix?: string }

export default function DateTool({ lang = 'fr', route: r0 = 'nat5', routes = ROUTES, idPrefix = 'd' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [route, setRoute] = useState<Route>(r0);
  const [start, setStart] = useState(DEF.start);
  const [birth, setBirth] = useState(DEF.birth);
  const [tun, setTun] = useState('0');
  const [lived, setLived] = useState('1');
  const [trips, setTrips] = useState<Trip[]>(DEF.trips);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const u = readParams(window.location.search);
    const ur = u.get('r') as Route | null, us = u.get('s'), ub = u.get('n'), ut = u.get('t');
    if (ur && routes.includes(ur)) setRoute(ur); if (iso(us)) setStart(us!); if (iso(ub)) setBirth(ub!);
    if (ut) { const tt = ut.split(',').map((x) => x.split('_')).filter(([o, k]) => iso(o) && iso(k)).map(([o, k]) => ({ out: o, back: k })); if (tt.length) setTrips(tt); }
  }, []);
  useEffect(() => { updateURL({ r: route === r0 ? undefined : route, s: start, n: route.startsWith('nat') ? birth : undefined, t: route === 'ldue' ? trips.filter((t) => iso(t.out) && iso(t.back)).map((t) => `${t.out}_${t.back}`).join(',') : undefined }); }, [route, start, birth, trips]);
  const valid = trips.filter((t) => iso(t.out) && iso(t.back));
  const err = (() => {
    if (route !== 'ldue') return null;
    const s = [...valid].sort((x, y) => (x.out < y.out ? -1 : 1));
    for (let i = 0; i < s.length; i++) { if (s[i].back! < s[i].out) return L.err.order; if (i && s[i - 1].back! > s[i].out) return L.err.overlap; }
    return null;
  })();
  const res = useMemo(() => (err || !iso(start) ? null : earliestDate({ route, start, birth: iso(birth) ? birth : undefined, tunisian: tun === '1', livedInFrance3y: lived === '1', trips: valid })), [route, start, birth, tun, lived, trips, err]);
  const date = res?.earliest ?? null;
  const days = date ? dayNum(date) - dayNum(today) : null;
  const inputCls = 'h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={`${inputCls} min-w-0`} /><span /></div>
  );
  const fmt = (k: string, v: string | number) => (k === 'years' ? L.yrs(Number(v)) : typeof v === 'number' ? formatNumberL(v, lang) : iso(v) ? dateL(v, lang) : v);
  const yn = [{ value: '0', label: L.no }, { value: '1', label: L.yes }];
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {routes.length > 1 && <SelectField id={`${idPrefix}-route`} label={L.route} value={route} onChange={(v) => setRoute(v as Route)} options={routes.map((r) => ({ value: r, label: L.r[r] }))} />}
          {field('start', L.start[route], start, setStart)}
          {route.startsWith('nat') && field('birth', L.birth, birth, setBirth)}
          {route === 'crSpouse' && <SelectField id={`${idPrefix}-tun`} label={L.tunisian} value={tun} onChange={setTun} options={yn} />}
          {route === 'mariage' && <SelectField id={`${idPrefix}-lived`} label={L.lived} value={lived} onChange={setLived} options={yn} />}
        </div>
        {route === 'ldue' && (
          <fieldset className="rounded-xl border border-navy-200 bg-white p-4">
            <legend className="px-1 text-sm font-semibold text-navy-900">{L.trips}</legend>
            <div className="space-y-3">
              {trips.map((t, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                  {field(`o${i}`, L.left, t.out, (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, out: x } : y))))}
                  {field(`r${i}`, L.back, t.back ?? '', (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, back: x } : y))))}
                  <button type="button" onClick={() => setTrips((o) => o.filter((_, j) => j !== i))} className="col-span-2 mb-0 h-12 rounded-lg border border-navy-300 px-3 text-sm text-navy-800 hover:bg-navy-50 sm:col-span-1" aria-label={`${L.remove} ${i + 1}`}>×</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setTrips((o) => [...o, { out: today, back: today }])} className="mt-3 h-12 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">+ {L.add}</button>
            {err && <p role="status" className="mt-2 text-sm font-medium text-red-700">{err}</p>}
            <p className="mt-2 text-xs text-navy-700">{L.rule}</p>
          </fieldset>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{res ? (date ? (days !== null && days <= 0 ? L.now : dateL(date, lang)) : L.none) : '…'}</p>
        {date && days !== null && days > 0 && <p className="text-sm text-navy-700">{L.inDays(days)}</p>}
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {(res?.rows ?? [{ k: 'years', v: yearsFor(route) }]).map((c) => <tr key={c.k}><td className="py-1.5 pr-2 text-navy-700">{L.k[c.k] ?? c.k}</td><td className="py-1.5 text-right font-medium text-navy-900">{fmt(c.k, c.v)}</td></tr>)}
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.exam}</td><td className="py-1.5 text-right font-medium text-navy-900">{L.examV[res?.exam ?? (route === 'mariage' ? 'none' : route.startsWith('nat') ? 'nat' : 'cr')]}</td></tr>
          {res && <tr><td className="py-1.5 pr-2 text-navy-700">{L.level}</td><td className="py-1.5 text-right font-medium text-navy-900">{res.level}</td></tr>}
          {res && <tr><td className="py-1.5 pr-2 text-navy-700">{L.fee}</td><td className="py-1.5 text-right font-medium text-navy-900">{money(res.fee, lang)}</td></tr>}
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
