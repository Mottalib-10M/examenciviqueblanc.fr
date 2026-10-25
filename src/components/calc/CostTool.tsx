/**
 * Coût total d'une démarche : le timbre fiscal officiel (lu dans params-2026.json) et les frais sans
 * barème national que le visiteur saisit (prix de l'examen civique dans son centre, test de français,
 * traductions). Aucun prix d'examen n'est estimé : chaque centre fixe le sien.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { totalCost, examRequired, type Procedure } from '../../lib/engine/cost';
import { money } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'fr';
const PROCS: Procedure[] = ['nat', 'mariage', 'cr', 'csp'];
const T = {
  fr: {
    proc: 'Démarche', p: { nat: 'Naturalisation', mariage: 'Nationalité par mariage', cr: 'Première carte de résident', csp: 'Première carte de séjour pluriannuelle' } as Record<Procedure, string>,
    people: 'Nombre de demandeurs', guyane: 'Demande déposée en Guyane ?', noVisa: 'Entré en France sans visa de long séjour ?', no: 'Non', yes: 'Oui',
    exam: 'Prix de l’examen civique dans votre centre', attempts: 'Nombre de passages prévus', lang: 'Test de français à passer ?', langPrice: 'Prix du test de français', tr: 'Traductions et autres frais (total)',
    head: 'Coût total estimé', per: 'par demandeur', official: 'Frais officiels', other: 'Frais saisis par vous',
    l: { timbreNat: 'Timbre fiscal (droit de timbre)', timbreTitre: 'Timbre et taxe du titre', visa: 'Visa de régularisation', exam: 'Examen civique', language: 'Test de français', translations: 'Traductions, autres' } as Record<string, string>,
    help: 'Prix fixé par chaque centre agréé : recopiez celui affiché à l’inscription.',
    note: 'Le timbre fiscal est fixé par la loi ; l’examen civique et le test de français n’ont pas de prix national.',
  },
  en: {
    proc: 'Application', p: { nat: 'Naturalisation', mariage: 'Nationality through marriage', cr: 'First resident card', csp: 'First multi-year residence permit' } as Record<Procedure, string>,
    people: 'Number of applicants', guyane: 'Applying in French Guiana?', noVisa: 'Entered France without a long-stay visa?', no: 'No', yes: 'Yes',
    exam: 'Civic exam price at your centre', attempts: 'Sittings you plan for', lang: 'French test to take?', langPrice: 'French test price', tr: 'Translations and other costs (total)',
    head: 'Estimated total cost', per: 'per applicant', official: 'Official fees', other: 'Costs you typed in',
    l: { timbreNat: 'Tax stamp (stamp duty)', timbreTitre: 'Permit stamp and tax', visa: 'Regularisation visa fee', exam: 'Civic exam', language: 'French test', translations: 'Translations, other' } as Record<string, string>,
    help: 'Each approved centre sets its own price: copy the one shown when you book.',
    note: 'The tax stamp is set by law; the civic exam and the French test have no national price.',
  },
} as const;
interface Props { lang?: Lang; procedure?: Procedure; idPrefix?: string }

export default function CostTool({ lang = 'fr', procedure: p0 = 'nat', idPrefix = 'c' }: Props) {
  const L = T[lang];
  const tag = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const [proc, setProc] = useState<Procedure>(p0);
  const [people, setPeople] = useState(1);
  const [guyane, setGuyane] = useState('0');
  const [noVisa, setNoVisa] = useState('0');
  const [examPrice, setExamPrice] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [needLang, setNeedLang] = useState('1');
  const [langPrice, setLangPrice] = useState(0);
  const [tr, setTr] = useState(0);
  useEffect(() => { const u = readParams(window.location.search); const p = u.get('p') as Procedure | null; if (p && PROCS.includes(p)) setProc(p); }, []);
  useEffect(() => { updateURL({ p: proc === p0 ? undefined : proc }); }, [proc]);
  const c = useMemo(() => totalCost({ procedure: proc, people, guyane: guyane === '1', noVisa: noVisa === '1', examPrice, examAttempts: attempts, languagePrice: langPrice, needLanguageTest: needLang === '1', translations: tr }), [proc, people, guyane, noVisa, examPrice, attempts, needLang, langPrice, tr]);
  const yn = [{ value: '0', label: L.no }, { value: '1', label: L.yes }];
  const isNat = proc === 'nat' || proc === 'mariage';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-proc`} label={L.proc} value={proc} onChange={(v) => setProc(v as Procedure)} options={PROCS.map((p) => ({ value: p, label: L.p[p] }))} />
        <NumberField id={`${idPrefix}-people`} label={L.people} value={people} onChange={(v) => setPeople(Math.max(1, Math.min(10, v)))} max={10} min={1} tag={tag} />
        {isNat ? <SelectField id={`${idPrefix}-guyane`} label={L.guyane} value={guyane} onChange={setGuyane} options={yn} /> : <SelectField id={`${idPrefix}-visa`} label={L.noVisa} value={noVisa} onChange={setNoVisa} options={yn} />}
        {examRequired(proc) && <NumberField id={`${idPrefix}-exam`} label={L.exam} value={examPrice} onChange={setExamPrice} unit="€" max={1000} help={L.help} tag={tag} />}
        {examRequired(proc) && <NumberField id={`${idPrefix}-att`} label={L.attempts} value={attempts} onChange={(v) => setAttempts(Math.max(1, Math.min(10, v)))} max={10} min={1} tag={tag} />}
        <SelectField id={`${idPrefix}-lang`} label={L.lang} value={needLang} onChange={setNeedLang} options={yn} />
        {needLang === '1' && <NumberField id={`${idPrefix}-lp`} label={L.langPrice} value={langPrice} onChange={setLangPrice} unit="€" max={1000} tag={tag} />}
        <NumberField id={`${idPrefix}-tr`} label={L.tr} value={tr} onChange={setTr} unit="€" max={10000} tag={tag} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{money(c.total, lang)}</p>
        {people > 1 && <p className="text-sm text-navy-700">{money(c.perPerson, lang)} {L.per}</p>}
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {c.lines.map((l) => <tr key={l.key}><td className="py-1.5 pr-2 text-navy-700">{L.l[l.key]}</td><td className="tabular-nums py-1.5 text-right font-medium text-navy-900">{money(l.amount, lang)}</td></tr>)}
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.official}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(c.official, lang)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.other}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(c.other, lang)}</td></tr>
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
