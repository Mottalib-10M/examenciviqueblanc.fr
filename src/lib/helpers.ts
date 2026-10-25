/** Outils d'écriture remis à chaque page : liens, chiffres lus dans params-2026.json, tableaux, banque. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { QUESTIONS } from './banks-build';
import { passNeeded, examSize, QUOTAS, type Theme } from './engine/exam';
import { officialFee } from './engine/cost';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>, lang: Locale) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Identifiant de page inconnu dans un lien : ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const know = QUESTIONS.filter((q) => q.type === 'connaissance');
  return {
    lang, a, ext, src, P,
    eur: (n: number) => money(n, lang),
    num: (n: number, d = 0) => formatNumberL(n, lang, d),
    pc: (x: number, d = 0) => pct(x, lang, d),
    date: (iso: string) => dateL(iso, lang),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    /** Tailles de la banque, lues dans le JSON (jamais tapées dans une page). */
    count: {
      all: QUESTIONS.length, knowledge: know.length, situations: QUESTIONS.length - know.length,
      csp: know.filter((q) => q.lists.includes('csp')).length, cr: know.filter((q) => q.lists.includes('cr')).length, nat: know.filter((q) => q.nat).length,
      theme: (t: Theme) => QUESTIONS.filter((q) => q.theme === t).length,
    },
    quota: (t: Theme) => QUOTAS[t - 1],
    theme: (t: Theme) => P.exam.themes[lang][t - 1],
    /** Une question de la banque (par identifiant), pour un exemple dans le texte. */
    q: (id: string) => QUESTIONS.find((x) => x.id === id),
    need: passNeeded(), size: examSize(),
    natFee: officialFee('nat'), titleFee: officialFee('cr'),
  };
}
export type Helpers = ReturnType<typeof helpers>;
