/**
 * Liste des questions officielles avec leurs réponses : une thématique à la fois, chaque question avec
 * ses propositions, la bonne réponse et le corrigé dans le HTML (<details> natif, lisible sans
 * JavaScript). Premier rendu = la liste et la thématique choisies pour la page au build ; une autre
 * thématique ou une autre liste n'est chargée que si le visiteur la choisit.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import { loadBank, THEMES, themeName } from '../../lib/banks';
import type { Question, Theme } from '../../lib/engine/exam';

type List = 'csp' | 'cr' | 'nat' | 'situation';
const NB = ' ';
const T = {
  fr: {
    list: 'Liste', lists: { csp: 'Carte de séjour pluriannuelle (liste officielle)', cr: 'Carte de résident (liste officielle)', nat: 'Intitulés aussi posés en naturalisation', situation: 'Mises en situation (rédigées par nous)' } as Record<List, string>,
    theme: 'Thématique', count: (n: number) => `question${n > 1 ? 's' : ''} dans cette thématique`, src: `Où vérifier${NB}:`, loading: 'Chargement…', answer: 'Réponse',
  },
  en: {
    list: 'List', lists: { csp: 'Multi-year permit (official list)', cr: 'Resident card (official list)', nat: 'Questions also asked for naturalisation', situation: 'Scenario questions (written by us)' } as Record<List, string>,
    theme: 'Theme', count: (n: number) => `question${n > 1 ? 's' : ''} in this theme`, src: 'Where to check:', loading: 'Loading…', answer: 'Answer',
  },
} as const;
export const inList = (q: Question, l: List) => (l === 'situation' ? q.type === 'situation' : q.type === 'connaissance' && (l === 'nat' ? q.nat : q.lists.includes(l)));

interface Props { lang?: 'fr' | 'en'; list: List; theme: Theme; initial: Question[]; idPrefix?: string; lists?: List[] }
export default function QuestionBank({ lang = 'fr', list: l0, theme: t0, initial, idPrefix = 'b', lists = ['csp', 'cr', 'nat', 'situation'] }: Props) {
  const L = T[lang];
  const [list, setList] = useState<List>(l0);
  const [theme, setTheme] = useState<Theme>(t0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [loading, setLoading] = useState(false);
  const reload = async (l: List, t: Theme) => {
    setList(l); setTheme(t); setLoading(true);
    const all = await loadBank();
    setQs(all.filter((q) => inList(q, l) && q.theme === t)); setLoading(false);
  };
  const themes = list === 'situation' ? ([1, 3] as Theme[]) : THEMES;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-list`} label={L.list} value={list} onChange={(v) => { const nl = v as List; reload(nl, nl === 'situation' && ![1, 3].includes(theme) ? 1 : theme); }} options={lists.map((k) => ({ value: k, label: L.lists[k] }))} />
          <SelectField id={`${idPrefix}-theme`} label={L.theme} value={String(theme)} onChange={(v) => reload(list, Number(v) as Theme)} options={themes.map((t) => ({ value: String(t), label: `${t}. ${themeName(t, lang)}` }))} />
        </form>
        {loading ? <p className="mt-4 text-navy-700">{L.loading}</p> : (
          <ol className="mt-4 space-y-2">
            {qs.map((q, i) => (
              <li key={q.id}>
                <details className="group rounded-lg border border-navy-200 bg-white">
                  <summary className="cursor-pointer px-4 py-3 font-medium text-navy-900"><span className="tabular-nums mr-2 text-navy-600">{i + 1}.</span>{q[lang].q}</summary>
                  <div className="px-4 pb-4 text-sm text-navy-800">
                    <ul className="mb-2 space-y-1">{q[lang].options.map((o, j) => <li key={j} className={j === q.answer ? 'font-semibold text-green-800' : 'text-navy-700'}>{j === q.answer ? `✓ ${L.answer}${lang === 'fr' ? NB : ''}: ` : '· '}{o}</li>)}</ul>
                    <p>{q[lang].explain}</p>
                    <p className="mt-1 text-xs text-navy-600">{L.src} <a className="underline" href={q.ref.url} target="_blank" rel="nofollow noopener noreferrer">{q.ref.doc}</a></p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div data-resultat className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{themeName(theme, lang)}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{qs.length}</p>
        <p className="text-sm text-navy-700">{L.count(qs.length)}</p>
        <p className="mt-2 text-xs text-navy-700">{L.lists[list]}</p>
      </div>
    </div>
  );
}
