import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/lib/banks-build';
import { buildExam, buildPractice, lintBank, seedOf, poolFor, QUOTAS, type Mention } from '../src/lib/engine/exam';
import P from '../src/data/params-2026.json';

describe('banque de questions', () => {
  it('banque propre (lint)', () => { expect(lintBank(QUESTIONS)).toEqual([]); });
  it('identifiants uniques, aucun tiret cadratin, réponses réparties', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    expect(JSON.stringify(QUESTIONS).includes('—')).toBe(false);
    const by = [0, 0, 0, 0]; QUESTIONS.forEach((q) => by[q.answer]++);
    expect(Math.max(...by) / QUESTIONS.length).toBeLessThan(0.3);
  });
  it('chaque notion de la grille a assez de questions pour un tirage', () => {
    for (const m of ['csp', 'cr', 'nat'] as Mention[]) {
      const pool = poolFor(QUESTIONS, m);
      for (const q of QUOTAS) for (const [notion, n] of Object.entries(q.notions)) {
        expect(pool.filter((x) => x.theme === q.theme && x.notion === notion).length, `${m} ${q.theme} ${notion}`).toBeGreaterThanOrEqual(n);
      }
    }
  });
});

describe('tirage de l’examen blanc', () => {
  it('40 questions, 28 de connaissance et 12 mises en situation, grille respectée', () => {
    for (const m of ['csp', 'cr', 'nat'] as Mention[]) for (let s = 1; s < 40; s++) {
      const e = buildExam(QUESTIONS, m, s).questions;
      expect(e).toHaveLength(P.exam.questions);
      expect(new Set(e.map((q) => q.id)).size).toBe(P.exam.questions);
      expect(e.filter((q) => q.type === 'situation')).toHaveLength(P.exam.situations);
      for (const q of QUOTAS) expect(e.filter((x) => x.theme === q.theme)).toHaveLength(q.total);
      if (m !== 'nat') expect(e.filter((q) => q.type === 'connaissance').every((q) => q.lists.includes(m))).toBe(true);
    }
  });
  it('tirage reproductible, entraînement par thématique', () => {
    const a = buildExam(QUESTIONS, 'cr', seedOf('home')).questions.map((q) => q.id);
    const b = buildExam(QUESTIONS, 'cr', seedOf('home')).questions.map((q) => q.id);
    expect(a).toEqual(b);
    const p = buildPractice(QUESTIONS, 'cr', 4, 7, 10);
    expect(p).toHaveLength(10);
    expect(p.every((q) => q.theme === 4)).toBe(true);
    const s = buildPractice(QUESTIONS, 'cr', null, 7, 10, 'situation');
    expect(s.every((q) => q.type === 'situation')).toBe(true);
  });
});
