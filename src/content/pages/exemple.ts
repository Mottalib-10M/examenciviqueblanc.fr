import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, propositions, bonne réponse. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, o: t.options, a: t.options[x.answer], th: x.theme }; };

export default definePage({
  id: 'exemple',
  group: 'examen',
  order: 51,
  tool: {"kind": "quiz", "props": {"mention": "nat", "mode": "practice"}},
  mini: {"kind": "mini:pass"},
  related: ['examen-blanc', 'qcm', 'mises-en-situation', 'questions-csp', 'questions-cr', 'examen-2026'],
  sources: ['arrete_exam', 'fc_info', 'fc_csp', 'fc_cr', 'sp_actu'],
  fr: {
    slug: 'exemple-examen-civique',
    nav: 'Exemple d’examen civique',
    card: 'À quoi ressemble une question de l’examen civique : un exemple par thématique, avec ses quatre propositions.',
    title: 'Exemple examen civique : une question par thématique',
    description: 'Exemple d’examen civique : à quoi ressemblent les questions, une par thème avec ses quatre propositions et la réponse, plus une mise en situation commentée.',
    h1: 'Exemple d’examen civique : à quoi ressemblent les questions',
    intro: 'Voyez une question type de chaque thématique avec ses propositions, puis essayez une courte série pour sentir le format avant l’épreuve.',
    resume: (h) => `Un exemple d’examen civique aide à comprendre le format avant de réviser le fond. Chaque question affiche un intitulé court et ${h.P.exam.options} propositions, dont une seule est juste ; on coche une case, sans rédiger. L’épreuve réelle enchaîne ${h.size} questions de ce type en ${h.P.exam.minutes} minutes, en français, et se réussit avec ${h.need} bonnes réponses. Elle mêle ${h.P.exam.knowledge} questions de connaissance, dont l’intitulé figure dans les listes publiées par le ministère de l’Intérieur, et ${h.P.exam.situations} mises en situation qui décrivent un cas concret. Cette page montre un exemple de chaque thématique avec toutes ses propositions, puis une mise en situation commentée. L’outil ci-dessus prolonge l’exemple par une série de dix questions corrigées, tirées dans la mention naturalisation et dans toutes les thématiques ; le mini-outil indique si un score donné atteint le seuil. Les propositions de réponse sont rédigées par nous, car le ministère ne publie que les intitulés : le jour de l’épreuve, leur formulation sera différente.`,
    faqs: (h) => [
      { q: 'Les questions de l’examen civique demandent-elles d’écrire une réponse ?', a: `Non, il n’y a rien à rédiger. Chaque question affiche ${h.P.exam.options} propositions et l’on en choisit une, sur ordinateur. Il faut en revanche lire le français avec aisance, car les intitulés et les mises en situation peuvent compter plusieurs lignes. Une bonne maîtrise de la lecture fait gagner un temps précieux sur l’ensemble de l’épreuve.` },
      { q: 'Les questions d’exemple sont-elles plus faciles que les vraies ?', a: 'Les intitulés de connaissance de nos exemples sont ceux des listes officielles, donc de même niveau. Les propositions de réponse, rédigées par nous, sont conçues pour être plausibles, avec des erreurs fréquentes parmi les leurres. Les mises en situation sont les seules à ne pas reprendre un texte officiel, puisque le ministère ne les publie pas.' },
      { q: 'Combien d’exemples faut-il faire avant de s’inscrire ?', a: `Il n’y a pas de nombre magique. Un bon indicateur est de réussir plusieurs épreuves complètes d’affilée avec une marge au-dessus de ${h.need}, et non une seule. Les exemples de cette page servent à découvrir le format ; la progression se fait ensuite par thématique, puis en conditions réelles avec le chronomètre.` },
    ],
    body: (h) => {
      const ids = ['o1-008', 'o2-068', 'o3-126', 'o4-061', 'o5-094'];
      const items = ids.map((id) => ex(h, id));
      const s = ex(h, 's3-028');
      return `
<h2>Une question type par thématique</h2>
<p>Voici, pour chacune des cinq thématiques, une question de connaissance tirée de notre banque, avec ses ${h.P.exam.options} propositions. La bonne réponse est indiquée après la liste : essayez de la trouver avant de la lire.</p>
${items.map((x) => `<h3>${x.th}. ${h.theme(x.th as 1)}</h3>
<p><strong>${x.q}</strong></p>
<ul>${x.o.map((o: string) => `<li>${o}</li>`).join('')}</ul>
<p>Bonne réponse : ${x.a}.</p>`).join('\n')}
<h2>Une mise en situation commentée</h2>
<p><strong>${s.q}</strong></p>
<ul>${s.o.map((o: string) => `<li>${o}</li>`).join('')}</ul>
<p>Bonne réponse : ${s.a}. La scène tente de faire passer une offre informelle pour une chance à saisir. La question porte en réalité sur les obligations de l’employeur et sur la protection du salarié : sans déclaration, pas de couverture en cas d’accident du travail, pas de cotisations pour la retraite ni pour le chômage, et aucune preuve de l’emploi. Ce type de raisonnement, qui part de la règle plutôt que de l’intérêt immédiat, est celui qu’attendent toutes les ${h.a('mises-en-situation', 'mises en situation')}.</p>
<h2>Ce que montrent ces exemples</h2>
<ul>
<li>Les intitulés sont courts et directs, mais exigent un vocabulaire précis : régime, préfet, organisation, prise en charge.</li>
<li>Les leurres ne sont pas absurdes : ils reprennent des idées reçues ou des règles d’autres pays.</li>
<li>La géographie et l’histoire demandent de la mémoire ; les principes, du raisonnement.</li>
<li>Une mise en situation se lit plus lentement qu’une question de connaissance : prévoyez du temps pour elles.</li>
</ul>
<h2>D’où viennent ces questions</h2>
<p>Les intitulés de connaissance figurent dans les listes officielles publiées par le ministère pour la ${h.src('fc_csp', 'carte pluriannuelle')} et pour la ${h.src('fc_cr', 'carte de résident')}, que nous reprenons sous Licence Ouverte. Les propositions, la bonne réponse, le corrigé et les mises en situation sont rédigés par Radif Partners. Vous pouvez consulter les listes complètes avec leurs réponses sur la page des ${h.a('questions-cr', 'questions de la carte de résident')}.</p>
<h2>Passer de l’exemple à l’épreuve</h2>
<p>Après ces exemples, la série de l’outil ci-dessus vous met dans la situation d’un candidat : une question à la fois, une case à cocher, puis la correction. Quand le format vous est familier, l’${h.a('examen-blanc', 'examen civique blanc')} reproduit l’épreuve entière, avec ${h.size} questions et le chronomètre de ${h.P.exam.minutes} minutes.</p>`;
    },
  },
  en: {
    slug: 'civic-exam-sample-questions',
    nav: 'Civic exam sample questions',
    card: 'What a civic exam question looks like: one sample per theme, with all four options.',
    title: 'Civic exam sample questions: one from each theme, answered',
    description: 'Civic exam sample questions: what the French test looks like, one question per theme with its four options and answer, plus a worked scenario for expats.',
    h1: 'French civic exam sample questions: see the format first',
    intro: 'See a typical question from each theme with its options, then try a short set to get a feel for the format before the real test.',
    resume: (h) => `Civic exam sample questions show you the format before you revise the content. Each question has a short stem and ${h.P.exam.options} options, only one of them right; you tick a box, with nothing to write. The real paper runs ${h.size} such questions in ${h.P.exam.minutes} minutes and you pass with ${h.need} correct answers. It is entirely in French, so the English versions here are a learning aid, not a preview of the screen you will see. The paper mixes ${h.P.exam.knowledge} knowledge questions, whose stems appear in the lists published by the French Interior Ministry, and ${h.P.exam.situations} scenario questions describing a concrete case. This page shows one sample from each theme with all its options, then a worked scenario. The tool above extends the samples with a set of ten marked questions drawn at the naturalisation level across all themes, and the small tool tells you whether a given score reaches the pass mark. The answer options are ours, because the ministry publishes only the stems.`,
    faqs: (h) => [
      { q: 'Do civic exam questions require a written answer?', a: `No, there is nothing to write. Each question shows ${h.P.exam.options} options and you pick one on a computer. You do need to read French comfortably, since stems and scenarios can run to several lines. For expats whose spoken French is better than their reading, reading practice is the quickest gain.` },
      { q: 'Are sample questions easier than the real ones?', a: 'Our knowledge stems are those of the official lists, so they are at the same level. The answer options, written by us, are designed to be plausible, with common mistakes among the distractors. Only the scenario questions do not come from an official text, because the ministry does not publish them.' },
      { q: 'Will the real exam show the English version?', a: 'No. The exam is in French only, with no translation on screen and no bilingual option. Use the English samples to understand what is being asked, then switch to the French version of this page with the language button and read the same questions in the language of the test.' },
    ],
    body: (h) => {
      const ids = ['o1-008', 'o2-068', 'o3-126', 'o4-061', 'o5-094'];
      const items = ids.map((id) => ex(h, id));
      const s = ex(h, 's3-028');
      return `
<h2>One typical question per theme</h2>
<p>For each of the five themes, here is a knowledge question from our bank with its ${h.P.exam.options} options. The right answer follows the list: try to find it before you read it.</p>
${items.map((x) => `<h3>${x.th}. ${h.theme(x.th as 1)}</h3>
<p><strong>${x.q}</strong></p>
<ul>${x.o.map((o: string) => `<li>${o}</li>`).join('')}</ul>
<p>Right answer: ${x.a}.</p>`).join('\n')}
<h2>A worked scenario question</h2>
<p><strong>${s.q}</strong></p>
<ul>${s.o.map((o: string) => `<li>${o}</li>`).join('')}</ul>
<p>Right answer: ${s.a}. The scene makes an informal offer look like an opportunity. The real subject is the employer's obligations and the worker's protection: without a declared job there is no cover for workplace accidents, no pension or unemployment contributions and no proof of employment. Starting from the rule rather than the immediate benefit is the reasoning every ${h.a('mises-en-situation', 'scenario question')} expects.</p>
<h2>What the samples show</h2>
<ul>
<li>Stems are short and direct but need precise vocabulary: régime, préfet, organisation, prise en charge.</li>
<li>Distractors are not absurd: they echo common misconceptions or rules from other countries.</li>
<li>Geography and history need memory; principles need reasoning.</li>
<li>A scenario takes longer to read than a knowledge question, so leave time for them.</li>
</ul>
<h2>Where the questions come from</h2>
<p>The knowledge stems appear on the official lists published by the ministry for the ${h.src('fc_csp', 'multi-year permit')} and the ${h.src('fc_cr', 'resident card')}, reused under the Licence Ouverte and translated by us. Options, right answers, explanations and scenarios are written by Radif Partners. The full lists with answers are on the ${h.a('questions-cr', 'resident card questions')} page.</p>
<h2>From samples to the real paper</h2>
<p>After these samples, the set in the tool above puts you in a candidate's seat: one question at a time, one box to tick, then the marking. Once the format feels familiar, the ${h.a('examen-blanc', 'civic exam mock test')} reproduces the whole paper, with ${h.size} questions and the ${h.P.exam.minutes}-minute clock.</p>`;
    },
  },
});
