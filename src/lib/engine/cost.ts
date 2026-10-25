/**
 * Coût total d'une démarche : timbre fiscal officiel (naturalisation, nationalité par mariage :
 * 255 €, 127,50 € en Guyane, F32952 ; première carte de séjour pluriannuelle ou carte de résident :
 * 50 € de droit de timbre + 300 € de taxe, F2208 et F2209 ; visa de régularisation 300 € si l'on est
 * entré sans visa long séjour), plus les frais sans barème national (examen civique : prix fixé par
 * chaque centre ; test de français ; traductions) que le visiteur saisit lui-même. Rien n'est estimé.
 */
import P from '../../data/params-2026.json';

export type Procedure = 'nat' | 'mariage' | 'csp' | 'cr';
export interface CostInput {
  procedure: Procedure;
  people: number;
  guyane?: boolean;
  /** entré sans visa de long séjour (titres de séjour) */
  noVisa?: boolean;
  examPrice: number;
  examAttempts: number;
  languagePrice: number;
  needLanguageTest: boolean;
  translations: number;
}
export interface CostLine { key: string; amount: number; each?: number; official: boolean }
export interface Cost { lines: CostLine[]; official: number; other: number; total: number; perPerson: number }

export function officialFee(p: Procedure, guyane = false): number {
  if (p === 'nat' || p === 'mariage') return guyane ? P.naturalisation.feeGuyane : P.naturalisation.fee;
  return P.fees.titleTotal;
}
/** Examen civique exigé ? Pas pour la déclaration de nationalité par mariage (F39426). */
export const examRequired = (p: Procedure) => p !== 'mariage';

export function totalCost(i: CostInput): Cost {
  const n = Math.max(1, Math.round(i.people));
  const lines: CostLine[] = [];
  const fee = officialFee(i.procedure, i.guyane);
  lines.push({ key: i.procedure === 'nat' || i.procedure === 'mariage' ? 'timbreNat' : 'timbreTitre', amount: fee * n, each: fee, official: true });
  if ((i.procedure === 'csp' || i.procedure === 'cr') && i.noVisa) lines.push({ key: 'visa', amount: P.fees.visaRegularisation * n, each: P.fees.visaRegularisation, official: true });
  if (examRequired(i.procedure)) {
    const att = Math.max(1, Math.round(i.examAttempts));
    lines.push({ key: 'exam', amount: Math.max(0, i.examPrice) * att * n, each: Math.max(0, i.examPrice) * att, official: false });
  }
  if (i.needLanguageTest) lines.push({ key: 'language', amount: Math.max(0, i.languagePrice) * n, each: Math.max(0, i.languagePrice), official: false });
  if (i.translations > 0) lines.push({ key: 'translations', amount: i.translations, official: false });
  const official = lines.filter((l) => l.official).reduce((s, l) => s + l.amount, 0);
  const other = lines.filter((l) => !l.official).reduce((s, l) => s + l.amount, 0);
  return { lines, official, other, total: official + other, perPerson: (official + other) / n };
}
