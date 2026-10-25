/**
 * Étapes de la frise « de l'examen civique au décret puis à la cérémonie » (RECETTE §17.6).
 * Toutes les durées viennent de params-2026.json ; une étape sans durée officielle est un jalon (0/0).
 */
import P from '../data/params-2026.json';
import { money } from './format-l';
import type { FriseStep, FriseLabels } from '../components/ui/Frise';

type L = 'fr' | 'en';
const M = 30.44;
const src = (k: keyof typeof P.sources, lang: L) => ({ label: (P.sources[k].label as Record<L, string>)[lang], href: P.sources[k].url });
const N = P.naturalisation;

export function natSteps(lang: L): FriseStep[] {
  const fr = lang === 'fr';
  return [
    { id: 'exam', title: fr ? 'Examen civique et attestation' : 'Civic exam and certificate', minDays: Math.round(P.exam.resultHoursMin / 24), maxDays: Math.round(P.exam.resultHoursMax / 24) + 2,
      detail: fr ? `${P.exam.questions} questions, ${P.exam.passCorrect} bonnes réponses pour réussir. Résultat sous ${P.exam.resultHoursMin} à ${P.exam.resultHoursMax} heures ouvrées à la CCI Paris Île-de-France (week-end compris dans la fourchette).` : `${P.exam.questions} questions, ${P.exam.passCorrect} correct answers to pass. Result within ${P.exam.resultHoursMin} to ${P.exam.resultHoursMax} working hours at the Paris Île-de-France Chamber of Commerce (a weekend included in the range).`,
      source: src('ccip_attestation', lang) },
    { id: 'depot', title: fr ? 'Dépôt en ligne et récépissé' : 'Online filing and receipt', minDays: 0, maxDays: 0,
      detail: fr ? `Aucun délai officiel pour réunir les pièces. Le délai de décision ne court qu’au récépissé de dossier complet ; seul le timbre de ${money(N.fee, 'fr')} se paie.` : `No official time to gather documents. The decision clock only starts at the receipt for a complete file; only the ${money(N.fee, 'en')} stamp is paid.`,
      source: src('sp_nat', lang) },
    { id: 'instruction', title: fr ? 'Instruction, entretien, décision (délai légal)' : 'Review, interview, decision (legal deadline)', minDays: Math.round(N.decisionMonths * M), maxDays: Math.round(N.decisionMonths * M),
      detail: fr ? `Délai légal : ${N.decisionMonths} mois au plus après le récépissé, ${N.decisionMonthsLongResident} mois après ${N.longResidentYears} ans de résidence en France (code civil, art. 21-25-1).` : `Legal deadline: ${N.decisionMonths} months at most after the receipt, ${N.decisionMonthsLongResident} months after ${N.longResidentYears} years living in France (Civil Code, art. 21-25-1).`,
      source: src('code_civil_nat', lang) },
    { id: 'prolongation', title: fr ? 'Prolongation éventuelle' : 'Possible extension', minDays: 0, maxDays: Math.round(N.extensionMonths * M),
      detail: fr ? `Une seule fois, ${N.extensionMonths} mois, par décision motivée.` : `Once only, ${N.extensionMonths} months, by reasoned decision.`,
      source: src('code_civil_nat', lang) },
    { id: 'decret', title: fr ? 'Décret au Journal officiel' : 'Decree in the Journal officiel', minDays: 0, maxDays: 0,
      detail: fr ? `Courriel après la publication ; le décret prend effet à sa signature et peut être retiré pendant ${N.withdrawalYears} ans en cas de fraude.` : `Email after publication; the decree takes effect when signed and can be withdrawn for ${N.withdrawalYears} years in case of fraud.`,
      source: src('sp_nat', lang) },
    { id: 'ceremonie', title: fr ? 'Cérémonie d’accueil' : 'Welcome ceremony', minDays: 0, maxDays: Math.round(N.ceremonyMonths * M),
      detail: fr ? `Organisée par le préfet, en principe dans les ${N.ceremonyMonths} mois suivant la publication du décret.` : `Held by the prefect, as a rule within ${N.ceremonyMonths} months of the decree's publication.`,
      source: src('sp_ceremonie', lang) },
  ];
}

export function friseLabels(lang: L): FriseLabels {
  return lang === 'fr'
    ? { start: 'Date de passage de l’examen civique', startHelp: 'Modifiez la date : la frise se recalcule.', end: 'Fin au plus tard, si chaque délai légal court en entier', between: 'entre le', and: 'et le', today: 'Aujourd’hui', done: 'Terminé', current: 'En cours', upcoming: 'À venir', day: 'jour', days: 'jours', week: 'semaine', weeks: 'semaines', month: 'mois', months: 'mois', milestone: 'jalon', upTo: 'jusqu’à', caption: 'De l’examen civique à la cérémonie d’accueil : chaque segment a la longueur de son délai légal maximal ; les jalons n’ont pas de durée officielle. Les délais réels des préfectures ne sont pas publiés.' }
    : { start: 'Date you sit the civic exam', startHelp: 'Change the date: the timeline updates.', end: 'Latest end, if every legal deadline runs in full', between: 'between', and: 'and', today: 'Today', done: 'Done', current: 'In progress', upcoming: 'Upcoming', day: 'day', days: 'days', week: 'week', weeks: 'weeks', month: 'month', months: 'months', milestone: 'milestone', upTo: 'up to', caption: 'From the civic exam to the welcome ceremony: each segment is as long as its maximum legal deadline; milestones have no official duration. Préfectures do not publish their real waiting times.' };
}
