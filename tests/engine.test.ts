import { describe, expect, it } from 'vitest';
import { earliestDate, ldueCheck, need, yearsFor } from '../src/lib/engine/eligibility';
import { totalCost, officialFee } from '../src/lib/engine/cost';
import { score } from '../src/lib/engine/exam';
import { QUESTIONS } from '../src/lib/banks-build';
import { getSpec, SPEC_KINDS } from '../src/lib/mini-specs';
import P from '../src/data/params-2026.json';

describe('dates de dépôt', () => {
  it('naturalisation : 5 ans, pas avant 17 ans', () => {
    expect(earliestDate({ route: 'nat5', start: '2021-03-01', birth: '1990-01-01' }).earliest).toBe('2026-03-01');
    expect(earliestDate({ route: 'nat0', start: '2025-03-01', birth: '2010-06-15' }).earliest).toBe('2027-06-15');
    expect(earliestDate({ route: 'nat2', start: '2024-09-01' }).earliest).toBe('2026-09-01');
  });
  it('mariage : 4 ans, 5 sans résidence en France', () => {
    expect(earliestDate({ route: 'mariage', start: '2022-05-10', livedInFrance3y: true }).earliest).toBe('2026-05-10');
    expect(earliestDate({ route: 'mariage', start: '2022-05-10', livedInFrance3y: false }).earliest).toBe('2027-05-10');
    expect(earliestDate({ route: 'mariage', start: '2022-05-10' }).exam).toBeNull();
  });
  it('carte de résident : conjoint 3 ans, tunisien 1 an', () => {
    expect(yearsFor('crSpouse')).toBe(3);
    expect(yearsFor('crSpouse', true)).toBe(1);
    expect(earliestDate({ route: 'crSpouse', start: '2024-01-15', tunisian: true }).earliest).toBe('2025-01-15');
  });
  it('longue durée-UE : absences plafonnées', () => {
    expect(earliestDate({ route: 'ldue', start: '2020-01-01', trips: [] }).earliest).toBe('2025-01-01');
    const long = [{ out: '2021-01-01', back: '2021-09-01' }];
    const r = earliestDate({ route: 'ldue', start: '2020-01-01', trips: long });
    expect(r.earliest! > '2025-01-01').toBe(true);
    expect(ldueCheck(long, r.earliest!).ok).toBe(true);
    expect(ldueCheck([{ out: '2022-01-01', back: '2022-03-01' }], '2025-01-01').ok).toBe(true);
  });
});

describe('examen et niveau par titre', () => {
  it('règles de F39530 et F2213', () => {
    expect(need({ title: 'csp', first: true, age: 30, protection: 'none', medical: false })).toMatchObject({ exam: 'csp', level: 'A2' });
    expect(need({ title: 'cr', first: true, age: 30, protection: 'none', medical: false })).toMatchObject({ exam: 'cr', level: 'B1' });
    expect(need({ title: 'nat', first: true, age: 80, protection: 'none', medical: false })).toMatchObject({ exam: 'nat', level: 'B2' });
    expect(need({ title: 'cr', first: true, age: 70, protection: 'none', medical: false }).exam).toBeNull();
    expect(need({ title: 'csp', first: false, age: 30, protection: 'none', medical: false }).exam).toBeNull();
    expect(need({ title: 'mariage', first: true, age: 30, protection: 'none', medical: false })).toMatchObject({ exam: null, level: 'B2' });
    expect(need({ title: 'csp', first: true, age: 30, protection: 'subsidiary', medical: false }).exam).toBeNull();
    expect(need({ title: 'ldue', first: true, age: 30, protection: 'refugee', medical: false }).exam).toBe('cr');
  });
});

describe('coût', () => {
  it('timbres officiels', () => {
    expect(officialFee('nat')).toBe(255);
    expect(officialFee('nat', true)).toBe(127.5);
    expect(officialFee('cr')).toBe(350);
    const c = totalCost({ procedure: 'cr', people: 1, noVisa: true, examPrice: 80, examAttempts: 2, languagePrice: 100, needLanguageTest: true, translations: 50 });
    expect(c.official).toBe(650);
    expect(c.other).toBe(310);
    expect(totalCost({ procedure: 'mariage', people: 1, examPrice: 80, examAttempts: 1, languagePrice: 0, needLanguageTest: false, translations: 0 }).total).toBe(255);
  });
});

describe('notation et mini-outils', () => {
  it('seuil de 32', () => {
    const qs = QUESTIONS.slice(0, P.exam.questions);
    const ans = qs.map((q, i) => (i < 32 ? q.answer : (q.answer + 1) % 4));
    expect(score(qs, ans).pass).toBe(true);
    ans[0] = (qs[0].answer + 1) % 4;
    expect(score(qs, ans).pass).toBe(false);
  });
  it('chaque mini-outil répond dans les deux langues', () => {
    for (const k of SPEC_KINDS) for (const l of ['fr', 'en'] as const) {
      const s = getSpec(k, l);
      const out = s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])));
      expect(out.head[1]).toBeTruthy();
    }
  });
});

import { decisionDates, addWorkingDays } from '../src/components/calc/DelayTool';
describe('délais de la naturalisation', () => {
  it('18 mois, 12 mois après 10 ans, prolongation de 3 mois', () => {
    expect(decisionDates('2026-03-02', false)).toEqual({ months: 18, deadline: '2027-09-02', extended: '2027-12-02' });
    expect(decisionDates('2026-03-02', true).deadline).toBe('2027-03-02');
  });
  it('jours ouvrés', () => {
    expect(addWorkingDays('2026-10-23', 2)).toBe('2026-10-27'); // vendredi + 2 jours ouvrés = mardi
  });
});
