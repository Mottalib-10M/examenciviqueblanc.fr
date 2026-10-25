/**
 * « Quel examen et quel niveau de français pour mon titre ? » : la règle de `need()` (F39530, F2209,
 * F2208, F17359, F39426, F11926), sans aucune donnée transmise.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { need, type Title, type NeedInput } from '../../lib/engine/eligibility';
import P from '../../data/params-2026.json';
import { dateL } from '../../lib/format-l';

type Lang = 'en' | 'fr';
const TITLES: Title[] = ['csp', 'cr', 'ldue', 'nat', 'mariage', 'cst'];
const T = {
  fr: {
    title: 'Titre ou démarche', t: { cst: 'Carte de séjour temporaire (1 an)', csp: 'Carte de séjour pluriannuelle', cr: 'Carte de résident (10 ans)', ldue: 'Carte de résident de longue durée-UE', nat: 'Naturalisation ou réintégration', mariage: 'Nationalité par mariage (déclaration)' } as Record<Title, string>,
    first: 'Première demande de ce titre ?', age: 'Votre âge', prot: 'Protection internationale', pr: { none: 'Aucune', refugee: 'Réfugié', subsidiary: 'Protection subsidiaire', stateless: 'Apatride' }, med: 'Handicap ou état de santé attesté par un médecin ?', no: 'Non', yes: 'Oui',
    exam: 'Examen civique', level: 'Niveau de français', none: 'Non exigé', m: { csp: 'Mention carte de séjour pluriannuelle', cr: 'Mention carte de résident', nat: 'Mention naturalisation' },
    why: {
      cst: 'La carte temporaire n’est pas concernée par l’examen civique.', declaration: 'La déclaration par mariage exige le niveau B2 mais pas l’examen civique.', required: 'Exigé pour une première demande depuis le 1er janvier 2026.',
      renewal: 'Un renouvellement du même titre n’exige ni examen ni niveau nouveau.', over65: `Au-delà de ${P.exam.exemptAgeOver} ans, examen et niveau ne sont pas exigés pour un titre de séjour.`,
      medical: 'Dispense ou aménagement possible sur certificat médical.', protection: 'Ce titre de protection n’est pas soumis à l’examen civique.',
    } as Record<string, string>,
    note: `Règles des fiches service-public.gouv.fr relues le ${dateL(P.retrieved_at, 'fr')}\u00a0; la préfecture reste seule juge de votre dossier.`,
  },
  en: {
    title: 'Permit or application', t: { cst: 'Temporary residence permit (1 year)', csp: 'Multi-year residence permit', cr: 'Resident card (10 years)', ldue: 'EU long-term resident card', nat: 'Naturalisation or reinstatement', mariage: 'Nationality through marriage (declaration)' } as Record<Title, string>,
    first: 'First application for this permit?', age: 'Your age', prot: 'International protection', pr: { none: 'None', refugee: 'Refugee', subsidiary: 'Subsidiary protection', stateless: 'Stateless' }, med: 'Disability or health condition certified by a doctor?', no: 'No', yes: 'Yes',
    exam: 'Civic exam', level: 'French level', none: 'Not required', m: { csp: 'Multi-year permit level', cr: 'Resident card level', nat: 'Naturalisation level' },
    why: {
      cst: 'The temporary permit is outside the civic exam.', declaration: 'The marriage declaration needs level B2 but no civic exam.', required: 'Required for a first application since 1 January 2026.',
      renewal: 'Renewing the same permit needs no new exam or level.', over65: `Over ${P.exam.exemptAgeOver}, no exam or level is required for a residence permit.`,
      medical: 'Exemption or adjustments possible with a medical certificate.', protection: 'This protection permit is outside the civic exam.',
    } as Record<string, string>,
    note: `Rules from the service-public.gouv.fr pages read on ${dateL(P.retrieved_at, 'en')}; the préfecture alone decides on your file.`,
  },
} as const;
interface Props { lang?: Lang; title?: Title; idPrefix?: string }

export default function LevelTool({ lang = 'fr', title: t0 = 'csp', idPrefix = 'l' }: Props) {
  const L = T[lang];
  const [title, setTitle] = useState<Title>(t0);
  const [first, setFirst] = useState('1');
  const [age, setAge] = useState(35);
  const [prot, setProt] = useState<NeedInput['protection']>('none');
  const [med, setMed] = useState('0');
  const r = useMemo(() => need({ title, first: first === '1', age, protection: prot, medical: med === '1' }), [title, first, age, prot, med]);
  const yn = [{ value: '0', label: L.no }, { value: '1', label: L.yes }];
  const isNat = title === 'nat' || title === 'mariage';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-title`} label={L.title} value={title} onChange={(v) => setTitle(v as Title)} options={TITLES.map((t) => ({ value: t, label: L.t[t] }))} />
        {!isNat && title !== 'cst' && <SelectField id={`${idPrefix}-first`} label={L.first} value={first} onChange={setFirst} options={yn} />}
        <NumberField id={`${idPrefix}-age`} label={L.age} value={age} onChange={(v) => setAge(Math.max(16, Math.min(110, v)))} max={110} unit={lang === 'fr' ? 'ans' : 'yrs'} tag={lang === 'fr' ? 'fr-FR' : 'en-GB'} />
        <SelectField id={`${idPrefix}-prot`} label={L.prot} value={prot} onChange={(v) => setProt(v as NeedInput['protection'])} options={(['none', 'refugee', 'subsidiary', 'stateless'] as const).map((p) => ({ value: p, label: L.pr[p] }))} />
        <SelectField id={`${idPrefix}-med`} label={L.med} value={med} onChange={setMed} options={yn} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.exam}</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">{r.exam ? L.m[r.exam] : L.none}</p>
        <p className="mt-3 text-sm font-medium text-navy-700">{L.level}</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">{r.level ?? L.none}</p>
        <p className="mt-3 text-sm text-navy-800">{L.why[r.examReason]}</p>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
