/**
 * Examen civique blanc : tirage reproductible (graine dans l'URL partagée) et correction selon
 * l'arrêté du 10 octobre 2025 (40 questions, quotas par thématique et notion, 32 bonnes réponses).
 * Les intitulés des questions de connaissance sont ceux publiés par le ministère de l'Intérieur
 * (Licence Ouverte 2.0) ; propositions, réponses, corrigés et mises en situation sont écrits par
 * Radif Partners (src/data/questions/*.json). Tous les chiffres viennent de params-2026.json.
 */
import P from '../../data/params-2026.json';

export type Mention = 'csp' | 'cr' | 'nat';
export type Theme = 1 | 2 | 3 | 4 | 5;
export interface QText { q: string; options: string[]; explain: string }
export interface Question {
  id: string;
  theme: Theme;
  /** notion de l'arrêté : symboles, laicite, democratie, organisation, europe, droits, devoirs, histoire, geographie, patrimoine, installer, soins, travail, ecole, situation */
  notion: string;
  type: 'connaissance' | 'situation';
  /** listes officielles où figure l'intitulé (csp, cr) ; les mises en situation sont dans les deux */
  lists: Array<'csp' | 'cr'>;
  /** l'intitulé figure aussi dans la liste de la mention naturalisation */
  nat: boolean;
  fr: QText;
  en: QText;
  answer: number;
  ref: { doc: string; url: string };
}
export interface Exam { mention: Mention; seed: number; questions: Question[] }
export interface Score { correct: number; total: number; needed: number; pass: boolean; byTheme: Array<{ theme: Theme; correct: number; total: number }> }

export const EXAM = P.exam;
export const QUOTAS = P.exam.quotas as Array<{ theme: Theme; total: number; notions: Record<string, number> }>;

/** Générateur pseudo-aléatoire mulberry32 : même graine, même examen (lien partageable, hydratation). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function pick<T>(xs: T[], n: number, r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}
/** Graine stable tirée d'un texte (id de page) : le build et le navigateur tirent le même premier examen. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

/**
 * Questions disponibles pour une mention. CSP : liste CSP ; CR : liste CR (le niveau CR vaut aussi
 * pour la CSP) ; naturalisation : intitulés présents dans la liste naturalisation, complétés par la
 * liste CR, niveau le plus proche. Les mises en situation servent aux trois mentions.
 */
export function poolFor(bank: Question[], mention: Mention): Question[] {
  if (mention === 'csp') return bank.filter((q) => q.lists.includes('csp'));
  if (mention === 'cr') return bank.filter((q) => q.lists.includes('cr'));
  return bank.filter((q) => q.nat || q.lists.includes('cr'));
}

export const examSize = () => P.exam.questions;
export const passNeeded = () => P.exam.passCorrect;

/** Examen complet : quotas de l'arrêté par thématique et par notion, puis ordre mélangé. */
export function buildExam(bank: Question[], mention: Mention, seed: number): Exam {
  const r = rng(seed);
  const pool = poolFor(bank, mention);
  const out: Question[] = [];
  for (const t of QUOTAS) {
    for (const [notion, n] of Object.entries(t.notions)) {
      let cands = pool.filter((q) => q.theme === t.theme && q.notion === notion);
      // naturalisation : on privilégie les intitulés de la liste naturalisation quand il y en a assez
      if (mention === 'nat') { const natOnes = cands.filter((q) => q.nat); if (natOnes.length >= n) cands = [...natOnes, ...pick(cands.filter((q) => !q.nat), Math.max(0, n - natOnes.length), r)]; }
      if (cands.length < n) {
        // notion trop petite : on complète par la même thématique (jamais par une autre)
        const extra = pool.filter((q) => q.theme === t.theme && q.type === (notion === 'situation' ? 'situation' : 'connaissance') && !cands.includes(q) && !out.includes(q));
        cands = [...cands, ...pick(extra, n - cands.length, r)];
      }
      if (cands.length < n) throw new Error(`banque trop petite : thème ${t.theme}, ${notion}`);
      out.push(...pick(cands, n, r));
    }
  }
  return { mention, seed, questions: pick(out, out.length, r) };
}

/** Série d'entraînement : `n` questions d'une thématique (ou de toutes), même graine, même série. */
export function buildPractice(bank: Question[], mention: Mention, theme: Theme | null, seed: number, n = 10, type: 'all' | 'situation' = 'all'): Question[] {
  let own = poolFor(bank, mention);
  if (theme) own = own.filter((q) => q.theme === theme);
  if (type === 'situation') own = own.filter((q) => q.type === 'situation');
  return pick(own, Math.min(n, own.length), rng(seed));
}

/** answers[i] = index choisi pour la question i, ou null (sans réponse = 0 point, art. 3 de l'arrêté). */
export function score(questions: Question[], answers: Array<number | null>): Score {
  const correct = questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const needed = passNeeded();
  const byTheme = QUOTAS.map((t) => {
    const idx = questions.map((q, i) => (q.theme === t.theme ? i : -1)).filter((i) => i >= 0);
    return { theme: t.theme, total: idx.length, correct: idx.filter((i) => answers[i] === questions[i].answer).length };
  });
  return { correct, total: questions.length, needed, pass: questions.length === examSize() && correct >= needed, byTheme };
}

/** Bonnes réponses qu'il faut encore pour atteindre le seuil, et erreurs encore permises. */
export function margin(answered: number, correct: number) {
  const n = examSize(), need = passNeeded();
  const wrong = answered - correct;
  return { stillNeeded: Math.max(0, need - correct), canMiss: n - need - wrong, remaining: n - answered };
}

/** Contrôle d'une banque : identifiants uniques, 4 propositions distinctes, réponse valide, source, corrigé. */
export function lintBank(bank: Question[]): string[] {
  const errs: string[] = [];
  const seen = new Set<string>();
  const allowed: Record<number, string[]> = {
    1: ['symboles', 'laicite', 'situation'], 2: ['democratie', 'organisation', 'europe'], 3: ['droits', 'devoirs', 'situation'],
    4: ['histoire', 'geographie', 'patrimoine'], 5: ['installer', 'soins', 'travail', 'ecole'],
  };
  for (const q of bank) {
    if (seen.has(q.id)) errs.push(`${q.id} : identifiant en double`);
    seen.add(q.id);
    if (!allowed[q.theme]?.includes(q.notion)) errs.push(`${q.id} : notion ${q.notion} hors du thème ${q.theme}`);
    for (const l of ['fr', 'en'] as const) {
      const t = q[l];
      if (!t?.q || t.options.length !== P.exam.options) errs.push(`${q.id} (${l}) : il faut ${P.exam.options} propositions`);
      if (new Set(t.options).size !== t.options.length) errs.push(`${q.id} (${l}) : propositions en double`);
      if (!t.explain || t.explain.split(/\s+/).length < 8) errs.push(`${q.id} (${l}) : corrigé trop court`);
      if (/—/.test(t.q + t.options.join('') + t.explain)) errs.push(`${q.id} (${l}) : tiret cadratin`);
    }
    if (q.answer < 0 || q.answer >= P.exam.options) errs.push(`${q.id} : réponse hors des propositions`);
    if (!q.ref?.doc || !q.ref?.url) errs.push(`${q.id} : source manquante`);
  }
  return errs;
}
