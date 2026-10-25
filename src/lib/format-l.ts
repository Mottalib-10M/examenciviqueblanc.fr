/** Mise en forme selon la langue de la page (RECETTE §4 : une locale par langue). Pages françaises : fr-FR ; pages anglaises : en-GB. */
export type L = 'en' | 'fr';
const TAG: Record<L, string> = { en: 'en-GB', fr: 'fr-FR' };
export const langTag = (lang: L) => TAG[lang];
const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: L, o: Intl.NumberFormatOptions) {
  const k = lang + JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG[lang], o));
  return cache.get(k)!;
}
/** fr-FR groupe les milliers par une espace fine insécable ; on la remplace par l'espace insécable ordinaire, que typo-nbsp attend. */
export const formatNumberL = (v: number, lang: L, d = 0) => nf(lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v).replace(/ /g, ' ');
/** 255 € en français, €255 en anglais ; les centimes seulement s'il y en a (127,50 €). */
export const money = (v: number, lang: L) => {
  const cents = Math.round(v * 100) % 100 !== 0;
  const n = formatNumberL(v, lang, cents ? 2 : 0);
  return lang === 'fr' ? `${n} €` : `€${n}`;
};
// « 80 % » en français, « 80% » en anglais.
export const pct = (v: number, lang: L, d = 0) => `${formatNumberL(v * 100, lang, d)}${lang === 'fr' ? ' ' : ''}%`;
/** "2026-10-25" → "25 octobre 2026" / "25 October 2026" (UTC, jamais de décalage d'un jour). */
export const dateL = (iso: string, lang: L) => {
  const s = new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  return lang === 'fr' ? s.replace(/^1 /, '1er ') : s;
};
