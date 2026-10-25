/**
 * Dates d'une demande de naturalisation à partir du dépôt : échéance légale de la décision (code civil,
 * art. 21-25-1 : 18 mois après le récépissé de dossier complet, 12 mois après 10 ans de résidence,
 * prolongeable une fois de 3 mois), cérémonie d'accueil (en principe dans les 6 mois après le décret
 * au JO, F15868) et résultat de l'examen civique (24 à 48 h ouvrées à la CCI Paris Île-de-France).
 * Premier rendu = jour du build et dates d'exemple (RECETTE §17.5) ; aujourd'hui après le montage.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { addMonths, addDays, dayNum } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'fr';
const iso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
/** Ajoute n jours ouvrés (lundi à vendredi, jours fériés non comptés). */
export function addWorkingDays(d: string, n: number): string {
  let x = d, k = 0;
  while (k < n) { x = addDays(x, 1); const wd = new Date(`${x}T12:00:00Z`).getUTCDay(); if (wd !== 0 && wd !== 6) k++; }
  return x;
}
export function decisionDates(receipt: string, longResident: boolean) {
  const N = P.naturalisation;
  const m = longResident ? N.decisionMonthsLongResident : N.decisionMonths;
  const deadline = addMonths(receipt, m);
  return { months: m, deadline, extended: addMonths(deadline, N.extensionMonths) };
}
const T = {
  fr: {
    receipt: 'Date du récépissé de dossier complet', long: 'En France depuis 10 ans ou plus ?', ext: 'Prolongation motivée reçue ?', no: 'Non', yes: 'Oui',
    exam: 'Date de passage de l’examen civique (facultatif)', decree: 'Date du décret au Journal officiel (facultatif)',
    head: 'Échéance légale de la décision', left: (d: number) => `dans ${formatNumberL(d, 'fr')} jours`, past: 'échéance passée',
    rows: { months: 'Délai applicable', ext: 'Échéance avec prolongation', result: 'Résultat de l’examen (CCI Paris IDF), au plus tard vers le', ceremony: 'Cérémonie d’accueil, en principe avant le' },
    mo: (n: number) => `${n} mois`,
    note: 'Dates calculées sur les textes, pas sur les délais réels de votre préfecture. Jours fériés non déduits pour le résultat d’examen.',
  },
  en: {
    receipt: 'Date of the receipt for a complete file', long: 'In France for 10 years or more?', ext: 'Reasoned extension received?', no: 'No', yes: 'Yes',
    exam: 'Civic exam date (optional)', decree: 'Date of the decree in the Journal officiel (optional)',
    head: 'Legal deadline for the decision', left: (d: number) => `in ${formatNumberL(d, 'en')} days`, past: 'deadline passed',
    rows: { months: 'Period that applies', ext: 'Deadline with extension', result: 'Exam result (Paris IDF Chamber), by about', ceremony: 'Welcome ceremony, as a rule before' },
    mo: (n: number) => `${n} months`,
    note: 'Dates come from the legal texts, not from your préfecture’s real waiting times. Public holidays are not deducted for the exam result.',
  },
} as const;
interface Props { lang?: Lang; idPrefix?: string }

export default function DelayTool({ lang = 'fr', idPrefix = 'y' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [receipt, setReceipt] = useState('2026-03-02');
  const [long, setLong] = useState('0');
  const [ext, setExt] = useState('0');
  const [exam, setExam] = useState('');
  const [decree, setDecree] = useState('');
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const r = useMemo(() => (iso(receipt) ? decisionDates(receipt, long === '1') : null), [receipt, long]);
  const target = r ? (ext === '1' ? r.extended : r.deadline) : null;
  const days = target ? dayNum(target) - dayNum(today) : null;
  const yn = [{ value: '0', label: L.no }, { value: '1', label: L.yes }];
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="min-w-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={inputCls} /></div>
  );
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {field('receipt', L.receipt, receipt, setReceipt)}
        <SelectField id={`${idPrefix}-long`} label={L.long} value={long} onChange={setLong} options={yn} />
        <SelectField id={`${idPrefix}-ext`} label={L.ext} value={ext} onChange={setExt} options={yn} />
        {field('exam', L.exam, exam, setExam)}
        {field('decree', L.decree, decree, setDecree)}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{target ? dateL(target, lang) : '…'}</p>
        {days !== null && <p className="text-sm text-navy-700">{days > 0 ? L.left(days) : L.past}</p>}
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {r && <tr><td className="py-1.5 pr-2 text-navy-700">{L.rows.months}</td><td className="py-1.5 text-right font-medium text-navy-900">{L.mo(r.months)}</td></tr>}
          {r && ext === '0' && <tr><td className="py-1.5 pr-2 text-navy-700">{L.rows.ext}</td><td className="py-1.5 text-right font-medium text-navy-900">{dateL(r.extended, lang)}</td></tr>}
          {iso(exam) && <tr><td className="py-1.5 pr-2 text-navy-700">{L.rows.result}</td><td className="py-1.5 text-right font-medium text-navy-900">{dateL(addWorkingDays(exam, Math.ceil(P.exam.resultHoursMax / 24)), lang)}</td></tr>}
          {iso(decree) && <tr><td className="py-1.5 pr-2 text-navy-700">{L.rows.ceremony}</td><td className="py-1.5 text-right font-medium text-navy-900">{dateL(addMonths(decree, P.naturalisation.ceremonyMonths), lang)}</td></tr>}
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
