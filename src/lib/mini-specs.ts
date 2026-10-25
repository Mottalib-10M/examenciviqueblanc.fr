/**
 * Mini-outils des pages (RECETTE §9.3) : un sujet = un calcul, toujours lu dans params-2026.json ou
 * dans les moteurs du site, jamais une seconde formule. Français et anglais ici.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { officialFee } from './engine/cost';
import { need, yearsFor, type Title } from './engine/eligibility';
import { money, formatNumberL, pct } from './format-l';
import { passNeeded, examSize, QUOTAS } from './engine/exam';

type L = 'en' | 'fr';
const yn = (lang: L) => (lang === 'fr' ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const N = (v: number, lang: L, d = 0) => formatNumberL(v, lang, d);
const fr = (lang: L) => lang === 'fr';
const s = (n: number) => (n > 1 ? 's' : '');
const yrs = (n: number, lang: L) => (fr(lang) ? `${N(n, lang, n % 1 ? 1 : 0)} an${n >= 2 ? 's' : ''}` : `${N(n, lang, n % 1 ? 1 : 0)} year${n === 1 ? '' : 's'}`);
const mo = (n: number, lang: L) => (fr(lang) ? `${N(n, lang)} mois` : `${N(n, lang)} month${n === 1 ? '' : 's'}`);
const themes = (lang: L) => P.exam.themes[lang].map((t, i) => ({ value: String(i + 1), label: `${i + 1}. ${t}` }));

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  /** Réussi ou non : 32 bonnes réponses sur 40. */
  pass: (lang) => ({
    title: fr(lang) ? 'Ai-je réussi l’examen civique ?' : 'Did I pass the civic exam?', cta: fr(lang) ? 'Faire un examen blanc complet' : 'Take a full mock exam', ctaPage: 'examen-blanc',
    inputs: [{ id: 'right', label: fr(lang) ? 'Bonnes réponses' : 'Correct answers', def: 30, max: examSize(), unit: `/ ${examSize()}` }],
    run: (v) => {
      const n = examSize(), need = passNeeded(), r = clamp(v.right ?? 0, 0, n), ok = r >= need;
      return fr(lang)
        ? { head: ['Résultat', ok ? 'Réussi' : 'Échoué'], rows: [['Seuil', `${need} sur ${n} (${pct(need / n, lang)})`], ['Votre note', pct(r / n, lang)], [ok ? 'Marge' : 'Il manque', ok ? `${r - need} réponse${s(r - need)} au-dessus du seuil` : `${need - r} bonne${s(need - r)} réponse${s(need - r)}`]] }
        : { head: ['Result', ok ? 'Pass' : 'Fail'], rows: [['Pass mark', `${need} of ${n} (${pct(need / n, lang)})`], ['Your score', pct(r / n, lang)], [ok ? 'Margin' : 'Missing', ok ? `${r - need} above the mark` : `${need - r} more correct answer${need - r === 1 ? '' : 's'}`]] };
    },
  }),
  /** Combien d'erreurs reste-t-il permises en cours d'épreuve. */
  errors: (lang) => ({
    title: fr(lang) ? 'Combien d’erreurs me reste-t-il ?' : 'How many mistakes can I still make?', cta: fr(lang) ? 'S’entraîner par thématique' : 'Practise by theme', ctaPage: 'qcm',
    inputs: [{ id: 'wrong', label: fr(lang) ? 'Erreurs déjà faites' : 'Mistakes made so far', def: 3, max: examSize() }],
    run: (v) => {
      const allowed = examSize() - passNeeded(), w = clamp(v.wrong ?? 0, 0, examSize()), left = allowed - w;
      return fr(lang)
        ? { head: ['Erreurs encore permises', left >= 0 ? N(left, lang) : 'Aucune, seuil manqué'], rows: [['Erreurs permises sur l’épreuve', N(allowed, lang)], ['Une absence de réponse compte', 'comme une erreur (0 point)'], ['Seuil', `${passNeeded()} bonnes réponses`]] }
        : { head: ['Mistakes still allowed', left >= 0 ? N(left, lang) : 'None, mark missed'], rows: [['Mistakes allowed in the exam', N(allowed, lang)], ['A blank answer counts', 'as a mistake (0 points)'], ['Pass mark', `${passNeeded()} correct answers`]] };
    },
  }),
  /** Temps par question restant. */
  pace: (lang) => ({
    title: fr(lang) ? 'Combien de temps par question ?' : 'How much time per question?', cta: fr(lang) ? 'Examen blanc chronométré' : 'Timed mock exam', ctaPage: 'examen-blanc',
    inputs: [{ id: 'done', label: fr(lang) ? 'Questions déjà traitées' : 'Questions already answered', def: 10, max: examSize() - 1 }, { id: 'min', label: fr(lang) ? 'Minutes écoulées' : 'Minutes gone', def: 12, max: P.exam.minutes, unit: 'min' }],
    run: (v) => {
      const left = examSize() - clamp(v.done ?? 0, 0, examSize() - 1), t = Math.max(0, P.exam.minutes - clamp(v.min ?? 0, 0, P.exam.minutes)), sec = Math.floor((t * 60) / left);
      return fr(lang)
        ? { head: ['Temps par question restante', `${N(sec, lang)} s`], rows: [['Questions restantes', N(left, lang)], ['Minutes restantes', N(t, lang)], ['Rythme moyen de l’épreuve', `${N(Math.floor((P.exam.minutes * 60) / examSize()), lang)} s par question`]] }
        : { head: ['Time per remaining question', `${N(sec, lang)} s`], rows: [['Questions left', N(left, lang)], ['Minutes left', N(t, lang)], ['Average pace of the exam', `${N(Math.floor((P.exam.minutes * 60) / examSize()), lang)} s a question`]] };
    },
  }),
  /** Questions d'une thématique dans l'épreuve. */
  quota: (lang) => ({
    title: fr(lang) ? 'Combien de questions sur cette thématique ?' : 'How many questions on this theme?', cta: fr(lang) ? 'S’entraîner sur cette thématique' : 'Practise this theme', ctaPage: 'qcm',
    inputs: [{ id: 't', label: fr(lang) ? 'Thématique' : 'Theme', def: 1, options: themes(lang) }],
    run: (v) => {
      const q = QUOTAS[clamp(v.t ?? 1, 1, 5) - 1];
      const name = (k: string) => (fr(lang) ? ({ symboles: 'Devise et symboles', laicite: 'Laïcité', situation: 'Mises en situation', democratie: 'Démocratie et vote', organisation: 'Organisation de la République', europe: 'Institutions européennes', droits: 'Droits fondamentaux', devoirs: 'Obligations et devoirs', histoire: 'Histoire', geographie: 'Géographie', patrimoine: 'Patrimoine', installer: 'S’installer et résider', soins: 'Accès aux soins', travail: 'Travailler', ecole: 'Autorité parentale, école' } as Record<string, string>)[k] : ({ symboles: 'Motto and symbols', laicite: 'Secularism', situation: 'Scenarios', democratie: 'Democracy and voting', organisation: 'How the Republic is organised', europe: 'European institutions', droits: 'Fundamental rights', devoirs: 'Obligations and duties', histoire: 'History', geographie: 'Geography', patrimoine: 'Heritage', installer: 'Settling and living', soins: 'Healthcare', travail: 'Working', ecole: 'Parental authority, school' } as Record<string, string>)[k]) ?? k;
      return { head: [fr(lang) ? 'Questions dans l’épreuve' : 'Questions in the exam', `${q.total} / ${examSize()}`], rows: Object.entries(q.notions).map(([k, n]) => [name(k), N(n, lang)] as [string, string]) };
    },
  }),
  /** Timbre fiscal de la naturalisation pour un foyer. */
  natfee: (lang) => ({
    title: fr(lang) ? 'Timbre fiscal de la naturalisation' : 'Naturalisation tax stamp', cta: fr(lang) ? 'Coût total avec l’examen et le test' : 'Full cost with exam and test', ctaPage: 'cout-naturalisation',
    inputs: [{ id: 'n', label: fr(lang) ? 'Demandeurs majeurs' : 'Adult applicants', def: 2, max: 10 }, { id: 'g', label: fr(lang) ? 'En Guyane ?' : 'In French Guiana?', def: 0, options: yn(lang) }],
    run: (v) => {
      const n = clamp(v.n ?? 1, 1, 10), f = officialFee('nat', !!v.g);
      return { head: [fr(lang) ? 'Timbres à acheter' : 'Stamps to buy', money(f * n, lang)], rows: [[fr(lang) ? 'Par demandeur' : 'Per applicant', money(f, lang)], [fr(lang) ? 'Tarif en Guyane' : 'Rate in French Guiana', money(P.naturalisation.feeGuyane, lang)], [fr(lang) ? 'Examen civique' : 'Civic exam', fr(lang) ? 'payé à part au centre' : 'paid separately to the centre']] };
    },
  }),
  /** Taxe d'un premier titre de séjour. */
  titlefee: (lang) => ({
    title: fr(lang) ? 'Taxe d’un premier titre de séjour' : 'Fee for a first residence permit', cta: fr(lang) ? 'Coût total de la démarche' : 'Full cost of the application', ctaPage: 'prix',
    inputs: [{ id: 'v', label: fr(lang) ? 'Entré sans visa de long séjour ?' : 'Entered without a long-stay visa?', def: 0, options: yn(lang) }],
    run: (v) => {
      const visa = v.v ? P.fees.visaRegularisation : 0;
      return { head: [fr(lang) ? 'À payer en timbres' : 'To pay in stamps', money(P.fees.titleTotal + visa, lang)], rows: [[fr(lang) ? 'Droit de timbre' : 'Stamp duty', money(P.fees.titleTimbre, lang)], [fr(lang) ? 'Taxe' : 'Tax', money(P.fees.titleTax, lang)], [fr(lang) ? 'Visa de régularisation' : 'Regularisation visa', money(visa, lang)]] };
    },
  }),
  /** Niveau de français et mention de l'examen par titre. */
  level: (lang) => ({
    title: fr(lang) ? 'Quel niveau de français pour mon titre ?' : 'Which French level for my permit?', cta: fr(lang) ? 'Toutes les dispenses' : 'All the exemptions', ctaPage: 'dispenses',
    inputs: [{ id: 't', label: fr(lang) ? 'Titre demandé' : 'Permit applied for', def: 0, options: (fr(lang) ? ['Carte pluriannuelle', 'Carte de résident', 'Naturalisation', 'Nationalité par mariage'] : ['Multi-year permit', 'Resident card', 'Naturalisation', 'Nationality through marriage']).map((l, i) => ({ value: String(i), label: l })) }, { id: 'age', label: fr(lang) ? 'Votre âge' : 'Your age', def: 35, max: 110, unit: fr(lang) ? 'ans' : 'yrs' }],
    run: (v) => {
      const title = (['csp', 'cr', 'nat', 'mariage'] as Title[])[clamp(v.t ?? 0, 0, 3)];
      const r = need({ title, first: true, age: clamp(v.age ?? 35, 16, 110), protection: 'none', medical: false });
      const m = { csp: fr(lang) ? 'mention carte pluriannuelle' : 'multi-year permit level', cr: fr(lang) ? 'mention carte de résident' : 'resident card level', nat: fr(lang) ? 'mention naturalisation' : 'naturalisation level' };
      return { head: [fr(lang) ? 'Niveau exigé' : 'Level required', r.level ?? (fr(lang) ? 'Aucun' : 'None')], rows: [[fr(lang) ? 'Examen civique' : 'Civic exam', r.exam ? m[r.exam] : fr(lang) ? 'non exigé' : 'not required'], [fr(lang) ? 'Seuil de l’examen' : 'Exam pass mark', `${passNeeded()} / ${examSize()}`]] };
    },
  }),
  /** Années de résidence restantes avant la naturalisation. */
  natyears: (lang) => ({
    title: fr(lang) ? 'Combien d’années avant la naturalisation ?' : 'How many years before naturalisation?', cta: fr(lang) ? 'Calculer ma date exacte' : 'Work out my exact date', ctaPage: 'naturalisation',
    inputs: [{ id: 'y', label: fr(lang) ? 'Années de résidence en France' : 'Years living in France', def: 3, max: 50, decimals: 1, unit: fr(lang) ? 'ans' : 'yrs' }, { id: 'r', label: fr(lang) ? 'Diplôme du supérieur français ?' : 'French higher-education degree?', def: 0, options: yn(lang) }],
    run: (v) => {
      const need = yearsFor(v.r ? 'nat2' : 'nat5'), left = Math.max(0, need - (v.y ?? 0));
      return { head: [fr(lang) ? 'Encore à attendre' : 'Still to wait', left ? yrs(Math.round(left * 10) / 10, lang) : fr(lang) ? 'Rien' : 'Nothing'], rows: [[fr(lang) ? 'Durée exigée' : 'Period required', yrs(need, lang)], [fr(lang) ? 'Dépôt possible dès' : 'You can file from age', fr(lang) ? `${P.naturalisation.fileFromAge} ans` : `${P.naturalisation.fileFromAge}`], [fr(lang) ? 'Examen civique' : 'Civic exam', fr(lang) ? 'mention naturalisation' : 'naturalisation level']] };
    },
  }),
  /** Délai de décision de la naturalisation. */
  decision: (lang) => ({
    title: fr(lang) ? 'Où en est le délai de ma naturalisation ?' : 'Where is my naturalisation deadline?', cta: fr(lang) ? 'Conditions de la naturalisation' : 'Naturalisation requirements', ctaPage: 'conditions',
    inputs: [{ id: 'm', label: fr(lang) ? 'Mois depuis le récépissé complet' : 'Months since the receipt of a complete file', def: 9, max: 60, unit: fr(lang) ? 'mois' : 'mo' }, { id: 'l', label: fr(lang) ? 'En France depuis 10 ans ou plus ?' : 'In France for 10 years or more?', def: 0, options: yn(lang) }],
    run: (v) => {
      const max = v.l ? P.naturalisation.decisionMonthsLongResident : P.naturalisation.decisionMonths, m = clamp(v.m ?? 0, 0, 60), left = max - m;
      return { head: [fr(lang) ? 'Délai légal restant' : 'Legal time left', left > 0 ? mo(left, lang) : fr(lang) ? 'Dépassé' : 'Passed'], rows: [[fr(lang) ? 'Délai de décision' : 'Decision deadline', mo(max, lang)], [fr(lang) ? 'Prolongation possible' : 'Possible extension', mo(P.naturalisation.extensionMonths, lang)], [fr(lang) ? 'Recours contre un refus' : 'Appeal against a refusal', mo(P.naturalisation.appealMonths, lang)]] };
    },
  }),
  /** Nationalité par mariage : années de mariage. */
  marriage: (lang) => ({
    title: fr(lang) ? 'Puis-je déclarer la nationalité par mariage ?' : 'Can I claim nationality through marriage?', cta: fr(lang) ? 'Calculer la date exacte' : 'Work out the exact date', ctaPage: 'mariage',
    inputs: [{ id: 'y', label: fr(lang) ? 'Années de mariage' : 'Years married', def: 3, max: 60, decimals: 1, unit: fr(lang) ? 'ans' : 'yrs' }, { id: 'f', label: fr(lang) ? '3 ans de résidence en France depuis le mariage ?' : '3 years living in France since the marriage?', def: 1, options: yn(lang) }],
    run: (v) => {
      const need = yearsFor('mariage', false, !!v.f), left = Math.max(0, need - (v.y ?? 0));
      return { head: [fr(lang) ? 'Encore à attendre' : 'Still to wait', left ? yrs(Math.round(left * 10) / 10, lang) : fr(lang) ? 'Rien' : 'Nothing'], rows: [[fr(lang) ? 'Durée de mariage exigée' : 'Marriage length required', yrs(need, lang)], [fr(lang) ? 'Niveau de français' : 'French level', P.language.marriage], [fr(lang) ? 'Examen civique' : 'Civic exam', fr(lang) ? 'non exigé' : 'not required']] };
    },
  }),
  /** Carte de résident : années restantes selon le motif. */
  cryears: (lang) => ({
    title: fr(lang) ? 'Quand demander la carte de résident ?' : 'When can I apply for the resident card?', cta: fr(lang) ? 'Calculer ma date exacte' : 'Work out my exact date', ctaPage: 'carte-resident',
    inputs: [{ id: 'r', label: fr(lang) ? 'Motif' : 'Ground', def: 0, options: (fr(lang) ? ['Conjoint de Français', 'Regroupement familial', 'Parent d’enfant français', 'Longue durée-UE'] : ['Spouse of a French citizen', 'Family reunification', 'Parent of a French child', 'EU long-term']).map((l, i) => ({ value: String(i), label: l })) }, { id: 'y', label: fr(lang) ? 'Années déjà faites' : 'Years already done', def: 2, max: 50, decimals: 1, unit: fr(lang) ? 'ans' : 'yrs' }],
    run: (v) => {
      const route = (['crSpouse', 'crFamily', 'crParent', 'ldue'] as const)[clamp(v.r ?? 0, 0, 3)], need = yearsFor(route), left = Math.max(0, need - (v.y ?? 0));
      return { head: [fr(lang) ? 'Encore à attendre' : 'Still to wait', left ? yrs(Math.round(left * 10) / 10, lang) : fr(lang) ? 'Rien' : 'Nothing'], rows: [[fr(lang) ? 'Durée exigée' : 'Period required', yrs(need, lang)], [fr(lang) ? 'Niveau de français' : 'French level', P.language.cr], [fr(lang) ? 'Timbres' : 'Stamps', money(P.fees.titleTotal, lang)]] };
    },
  }),
  /** Absences cumulées pour la carte de résident de longue durée-UE. */
  ldue: (lang) => ({
    title: fr(lang) ? 'Mes absences bloquent-elles la carte longue durée-UE ?' : 'Do my trips block the EU long-term card?', cta: fr(lang) ? 'Compter mes absences jour par jour' : 'Count my trips day by day', ctaPage: 'longue-duree-ue',
    inputs: [{ id: 't', label: fr(lang) ? 'Mois d’absence sur les 5 ans' : 'Months abroad over the 5 years', def: 4, max: 60, decimals: 1, unit: fr(lang) ? 'mois' : 'mo' }, { id: 'l', label: fr(lang) ? 'Plus longue absence' : 'Longest trip', def: 2, max: 60, decimals: 1, unit: fr(lang) ? 'mois' : 'mo' }],
    run: (v) => {
      const R = P.residentCard, t = v.t ?? 0, l = v.l ?? 0, ok = t <= R.ldueMaxTotalMonths && l <= R.ldueMaxConsecutiveMonths;
      return { head: [fr(lang) ? 'Séjour ininterrompu' : 'Unbroken stay', ok ? (fr(lang) ? 'Oui' : 'Yes') : fr(lang) ? 'Non' : 'No'], rows: [[fr(lang) ? 'Plafond total' : 'Total cap', mo(R.ldueMaxTotalMonths, lang)], [fr(lang) ? 'Plafond d’une absence' : 'Cap for one trip', mo(R.ldueMaxConsecutiveMonths, lang)], [fr(lang) ? 'Marge totale' : 'Total margin', `${N(Math.max(0, R.ldueMaxTotalMonths - t), lang, 1)} ${fr(lang) ? 'mois' : 'mo'}`]] };
    },
  }),
  /** Examen exigé selon l'âge pour un titre de séjour. */
  age: (lang) => ({
    title: fr(lang) ? 'Dois-je passer l’examen à mon âge ?' : 'Do I have to sit the exam at my age?', cta: fr(lang) ? 'Quel examen pour mon titre' : 'Which exam for my permit', ctaPage: 'quel-examen',
    inputs: [{ id: 'age', label: fr(lang) ? 'Votre âge' : 'Your age', def: 40, max: 110, unit: fr(lang) ? 'ans' : 'yrs' }, { id: 'n', label: fr(lang) ? 'Pour la naturalisation ?' : 'For naturalisation?', def: 0, options: yn(lang) }],
    run: (v) => {
      const a = clamp(v.age ?? 40, 16, 110), r = need({ title: v.n ? 'nat' : 'cr', first: true, age: a, protection: 'none', medical: false });
      return { head: [fr(lang) ? 'Examen civique' : 'Civic exam', r.exam ? (fr(lang) ? 'Exigé' : 'Required') : fr(lang) ? 'Non exigé' : 'Not required'], rows: [[fr(lang) ? 'Titres de séjour' : 'Residence permits', fr(lang) ? `dispense au-delà de ${P.exam.exemptAgeOver} ans` : `exempt over ${P.exam.exemptAgeOver}`], [fr(lang) ? 'Naturalisation' : 'Naturalisation', fr(lang) ? 'pas de dispense liée à l’âge' : 'no age exemption']] };
    },
  }),
};
export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Mini-outil inconnu : ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
