/**
 * Examen civique blanc et entraînement (outil principal). Premier rendu = les questions tirées au
 * build pour cette page (RECETTE §17.5) ; un nouveau tirage, une autre mention ou un lien partagé ne
 * changent l'affichage qu'après le montage. Notation de l'arrêté du 10 octobre 2025 : 40 questions,
 * 45 minutes, 32 bonnes réponses ; une absence de réponse vaut 0. Rien ne quitte le navigateur.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildExam, buildPractice, passNeeded, examSize, EXAM, type Mention, type Question, type Theme } from '../../lib/engine/exam';
import { loadBank, THEMES, themeName } from '../../lib/banks';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'fr';
const NB = ' ';
const T = {
  fr: {
    mention: 'Mention de l’examen', mentions: { csp: 'Carte de séjour pluriannuelle', cr: 'Carte de résident', nat: 'Naturalisation' } as Record<Mention, string>,
    theme: 'Thématique', allThemes: 'Toutes les thématiques', q: (i: number, n: number) => `Question ${i} sur ${n}`,
    next: 'Suivante', prev: 'Précédente', finish: 'Voir mon résultat', again: 'Nouvel examen, autres questions', againP: 'Nouvelle série', loading: 'Chargement des questions…',
    right: 'Bonne réponse.', wrong: 'Pas tout à fait.', answer: `Bonne réponse${NB}:`, score: 'Votre résultat', answered: 'répondues',
    feedback: 'Correction', asYouGo: 'Au fur et à mesure', atEnd: 'À la fin', hidden: 'Réponse enregistrée. La correction vient à la fin, comme le jour de l’examen.',
    pass: (need: number, n: number) => `Seuil de réussite${NB}: ${need} sur ${n}`, practice: (n: number) => `Série d’entraînement de ${n} questions`,
    status: { start: 'Choisissez une réponse pour commencer', on: 'En bonne voie', risk: 'Plus aucune erreur permise', pass: 'Réussi', fail: 'Sous le seuil de 32', practiceDone: 'Série terminée' },
    canMiss: (k: number) => (k <= 0 ? 'Plus aucune erreur permise' : `Erreurs encore permises${NB}: ${k}`),
    byTheme: 'Résultat par thématique', review: 'Questions manquées', none: 'Aucune erreur.', timeLeft: 'Temps restant', timeUp: 'Temps écoulé : l’examen est noté tel quel, les questions sans réponse valent 0.',
    kind: { connaissance: 'Question de connaissance (intitulé officiel)', situation: 'Mise en situation (rédigée par nous)' },
    note: 'Intitulés des questions de connaissance : ministère de l’Intérieur, Licence Ouverte 2.0. Propositions, corrigés et mises en situation : Radif Partners. Ce n’est pas l’examen officiel.',
  },
  en: {
    mention: 'Exam level', mentions: { csp: 'Multi-year residence permit', cr: 'Resident card', nat: 'Naturalisation' } as Record<Mention, string>,
    theme: 'Theme', allThemes: 'All themes', q: (i: number, n: number) => `Question ${i} of ${n}`,
    next: 'Next', prev: 'Previous', finish: 'See my result', again: 'New exam, new questions', againP: 'New set', loading: 'Loading the questions…',
    right: 'Correct.', wrong: 'Not quite.', answer: 'Right answer:', score: 'Your score', answered: 'answered',
    feedback: 'Answers', asYouGo: 'As I go', atEnd: 'At the end', hidden: 'Answer recorded. The marking comes at the end, as on exam day.',
    pass: (need: number, n: number) => `Pass mark: ${need} of ${n}`, practice: (n: number) => `Practice set of ${n} questions`,
    status: { start: 'Pick an answer to start', on: 'On track', risk: 'No more mistakes allowed', pass: 'Passed', fail: 'Below the pass mark of 32', practiceDone: 'Set finished' },
    canMiss: (k: number) => (k <= 0 ? 'No more mistakes allowed' : `Mistakes still allowed: ${k}`),
    byTheme: 'Score by theme', review: 'Questions you missed', none: 'No mistakes.', timeLeft: 'Time left', timeUp: 'Time is up: the exam is marked as it stands, unanswered questions score 0.',
    kind: { connaissance: 'Knowledge question (official wording, translated)', situation: 'Scenario question (written by us)' },
    note: 'Knowledge questions: French Interior Ministry, Licence Ouverte 2.0, translated by us. Options, explanations and scenarios: Radif Partners. The real exam is in French only. Not the official exam.',
  },
} as const;

interface Props {
  lang?: Lang; mention: Mention; mode?: 'exam' | 'practice'; theme?: Theme | null; situations?: boolean;
  initial: Question[]; seed: number; mentionSelect?: boolean; idPrefix?: string; size?: number;
}

export default function CivicQuiz({ lang = 'fr', mention: m0, mode = 'exam', theme: t0 = null, situations = false, initial, seed: s0, mentionSelect = false, idPrefix = 'q', size = 10 }: Props) {
  const L = T[lang];
  const [mention, setMention] = useState<Mention>(m0);
  const [theme, setTheme] = useState<Theme | null>(t0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [instant, setInstant] = useState(mode === 'practice');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const started = useRef<number | null>(null);
  const seedRef = useRef(s0);
  const isExam = mode === 'exam';

  const draw = async (m: Mention, th: Theme | null, seed: number) => {
    setLoading(true);
    const bank = await loadBank();
    const next = isExam ? buildExam(bank, m, seed).questions : buildPractice(bank, m, th, seed, size, situations ? 'situation' : 'all');
    seedRef.current = seed;
    setQs(next); setAnswers(next.map(() => null)); setCur(0); setDone(false); setLoading(false); started.current = null; setLeft(null);
  };
  useEffect(() => { // lien partagé (?seed=…&mention=…) : appliqué après le premier rendu seulement
    const u = readParams(window.location.search);
    const s = Number(u.get('seed')); const m = u.get('mention') as Mention | null;
    const mm = mentionSelect && m && ['csp', 'cr', 'nat'].includes(m) ? m : m0;
    if ((s && s !== s0) || mm !== m0) { if (mm !== m0) setMention(mm); draw(mm, t0, s || s0); }
  }, []);
  useEffect(() => { // chronomètre de l'examen blanc : démarre à la première réponse
    if (!isExam || done) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = EXAM.minutes * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isExam, done]);

  const n = qs.length;
  const need = isExam ? passNeeded() : Math.ceil(n * (EXAM.passPercent / 100));
  const answeredN = answers.filter((a) => a !== null).length;
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const wrongN = answeredN - right;
  const canMiss = n - need - wrongN;
  const showAll = instant || done;
  const status: keyof typeof L.status = !answeredN ? 'start'
    : (done || answeredN === n) ? (isExam ? (right >= need ? 'pass' : 'fail') : 'practiceDone')
    : !showAll ? 'start' : canMiss < 0 ? 'fail' : canMiss === 0 ? 'risk' : 'on';
  const q = qs[cur];
  const a = answers[cur];
  const choose = (i: number) => {
    if (done || (showAll && a !== null)) return;
    if (started.current == null) started.current = Date.now();
    setAnswers((o) => o.map((x, j) => (j === cur ? i : x)));
    if (!showAll && cur < n - 1) window.setTimeout(() => setCur((c) => Math.min(c + 1, n - 1)), 250);
  };
  const newTest = () => { const s = Math.floor(Math.random() * 2 ** 31); updateURL({ seed: s, mention: mentionSelect && mention !== m0 ? mention : undefined }); draw(mention, theme, s); };
  const byTheme = THEMES.map((t) => {
    const idx = qs.map((x, i) => (x.theme === t ? i : -1)).filter((i) => i >= 0);
    return { t, n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  }).filter((x) => x.n);
  const mm = left == null ? EXAM.minutes * 60 : left;
  const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
  const good = status === 'pass' || status === 'on' || status === 'practiceDone';
  const tone = status === 'start' ? 'text-navy-700' : good ? 'text-green-800' : 'text-red-700';
  const tx = (x: Question) => x[lang];

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {(mentionSelect || (!isExam && !situations)) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {mentionSelect && <SelectField id={`${idPrefix}-mention`} label={L.mention} value={mention} onChange={(v) => { const m = v as Mention; setMention(m); updateURL({ mention: m === m0 ? undefined : m }); draw(m, theme, seedRef.current); }} options={(['csp', 'cr', 'nat'] as Mention[]).map((k) => ({ value: k, label: L.mentions[k] }))} />}
            {!isExam && !situations && <SelectField id={`${idPrefix}-theme`} label={L.theme} value={theme ? String(theme) : ''} onChange={(v) => { const th = v ? (Number(v) as Theme) : null; setTheme(th); draw(mention, th, seedRef.current); }} options={[{ value: '', label: L.allThemes }, ...THEMES.map((t) => ({ value: String(t), label: `${t}. ${themeName(t, lang)}` }))]} />}
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-700">
            <span>{L.q(cur + 1, n)}{q ? ` · ${themeName(q.theme, lang)}` : ''}</span>
            {isExam && (
              <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-xs" role="group" aria-label={L.feedback}>
                <button type="button" aria-pressed={instant} onClick={() => setInstant(true)} className={`h-full px-2.5 py-1.5 ${instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.asYouGo}</button>
                <button type="button" aria-pressed={!instant} onClick={() => setInstant(false)} className={`h-full px-2.5 py-1.5 ${!instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.atEnd}</button>
              </span>
            )}
          </div>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {q && !loading && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{tx(q).q}</legend>
              <p className="mt-1 text-xs text-navy-600">{L.kind[q.type]}</p>
              <div className="mt-4 grid gap-2">
                {tx(q).options.map((o, i) => {
                  const picked = a === i, isRight = i === q.answer, shown = showAll && a !== null;
                  const cls = !shown ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}><span className="mr-2 font-semibold">{'ABCD'[i]}.</span>{o}</button>;
                })}
              </div>
              {a !== null && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  {showAll ? <p><strong>{a === q.answer ? L.right : L.wrong}</strong>{a !== q.answer && <> {L.answer} {tx(q).options[q.answer]}.</>} {tx(q).explain}</p> : <p>{L.hidden}</p>}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {!done && answeredN > 0 && (cur === n - 1 || answeredN === n) && <button type="button" onClick={() => setDone(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.finish}</button>}
                <button type="button" onClick={newTest} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{isExam ? L.again : L.againP}</button>
              </div>
            </fieldset>
          )}
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">{L.timeUp}</p>}
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((x, i) => answers[i] === x.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((x, i) => (answers[i] !== x.answer ? <li key={x.id}><span className="font-medium">{tx(x).q}</span> {L.answer} {tx(x).options[x.answer]}. <span className="text-navy-700">{tx(x).explain}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score} · {L.mentions[mention]}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{showAll ? right : answeredN}<span className="text-xl font-semibold text-navy-700"> / {showAll ? answeredN : n}</span></p>
        <p className="text-sm text-navy-700">{answeredN} / {n} {L.answered}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{isExam ? L.pass(need, examSize()) : L.practice(n)}</td></tr>
          {showAll && isExam && <tr><td className="py-1.5 text-navy-700">{L.canMiss(canMiss)}</td></tr>}
          {isExam && <tr><td className="tabular-nums py-1.5 text-navy-700">{L.timeLeft}{lang === 'fr' ? `${NB}: ` : ': '}{clock}</td></tr>}
        </tbody></table>
        {(done || showAll) && byTheme.length > 1 && answeredN > 0 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">{L.byTheme}</p>
            <ul className="mt-1 space-y-1 text-xs text-navy-700">{byTheme.map((b) => <li key={b.t} className="flex justify-between gap-2"><span>{themeName(b.t, lang)}</span><span className="tabular-nums">{b.r}/{b.n}</span></li>)}</ul></div>
        )}
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
