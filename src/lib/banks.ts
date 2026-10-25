/**
 * Banque de questions. `BANKS` (import statique, banks-build.ts) ne sert qu'au build : pages, aides et
 * premier rendu de chaque outil. Dans le navigateur, `loadBank` charge la banque à la demande (un seul
 * morceau), pour qu'une page n'embarque que les questions qu'elle affiche tant qu'on ne relance pas.
 */
import type { Question, Theme } from './engine/exam';
import P from '../data/params-2026.json';
export async function loadBank(): Promise<Question[]> {
  const m = await import('../data/questions/bank.json');
  return (m.default as { questions: Question[] }).questions;
}
export const THEMES: Theme[] = [1, 2, 3, 4, 5];
export const themeName = (t: Theme, lang: 'fr' | 'en') => P.exam.themes[lang][t - 1];
