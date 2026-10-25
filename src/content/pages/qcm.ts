import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer] }; };

export default definePage({
  id: 'qcm',
  group: 'examen',
  order: 20,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice"}},
  mini: {"kind": "mini:errors"},
  related: ['examen-blanc', 'theme-1', 'theme-3', 'mises-en-situation', 'exemple', 'resultat'],
  sources: ['fc_fiches', 'fc_cr', 'fc_csp', 'arrete_exam', 'licence_ouverte'],
  fr: {
    slug: 'qcm-examen-civique',
    nav: 'QCM examen civique',
    card: 'Des séries courtes par thématique, corrigées question après question, pour apprendre avant de passer à l’examen blanc.',
    title: 'QCM examen civique : séries par thématique, corrigées',
    description: 'QCM examen civique en séries courtes : choisissez une thématique, répondez et lisez aussitôt la correction, avec le texte officiel où vérifier chaque réponse.',
    h1: 'QCM examen civique : s’entraîner thématique par thématique',
    intro: 'Choisissez une thématique, répondez aux questions de la série et lisez la correction juste après chaque réponse, ou à la fin si vous préférez.',
    resume: (h) => `Le QCM de l’examen civique est un questionnaire où chaque question propose ${h.P.exam.options} réponses dont une seule est exacte. Le jour de l’épreuve, il en compte ${h.size}, il dure ${h.P.exam.minutes} minutes et il faut ${h.need} bonnes réponses pour obtenir l’attestation ; une erreur et une absence de réponse rapportent toutes deux zéro point. Avant de vous mesurer à une épreuve complète, mieux vaut apprendre par petites séries : c’est le rôle de l’outil de cette page. Il tire dix questions dans la thématique choisie, parmi les ${h.num(h.count.all)} de notre banque, et affiche la correction après chaque réponse avec une explication et la fiche officielle où vérifier. Les ${h.num(h.count.knowledge)} questions de connaissance reprennent les intitulés publiés par le ministère de l’Intérieur ; les ${h.num(h.count.situations)} mises en situation sont rédigées par nous. Le bouton « Nouvelle série » change de questions à volonté, et la correction peut aussi être réservée à la fin pour se tester sans aide.`,
    faqs: (h) => [
      { q: 'Combien de questions compte une série du QCM d’entraînement ?', a: `Dix questions, tirées dans la thématique que vous choisissez ou dans toutes à la fois. Une série se fait en quelques minutes, ce qui permet d’en enchaîner plusieurs dans une même séance. Quand une thématique ne vous pose plus de difficulté, passez à l’épreuve complète de ${h.size} questions, chronométrée sur ${h.P.exam.minutes} minutes.` },
      { q: 'Faut-il afficher la correction tout de suite ou à la fin ?', a: 'Au début, affichez-la après chaque réponse : lire l’explication au moment où l’on se trompe fixe bien mieux la notion. Une fois la thématique connue, basculez sur la correction à la fin, qui reproduit les conditions du jour de l’examen, où aucune correction n’apparaît pendant l’épreuve. Le réglage se change d’un clic au-dessus des questions.' },
      { q: 'Les réponses du QCM sont-elles celles de l’examen officiel ?', a: `Non. Le ministère publie seulement les intitulés des questions de connaissance, sans propositions ni réponses. Les ${h.P.exam.options} propositions de chaque question et leur corrigé sont rédigés par Radif Partners à partir des fiches de la formation civique et des textes de loi. Le jour J, l’intitulé peut être identique mais les propositions formulées autrement : apprenez la notion, pas la position de la bonne case.` },
      { q: 'Peut-on deviner quand on ne connaît pas la réponse ?', a: `Oui, et c’est même conseillé : une question sans réponse vaut zéro, exactement comme une erreur. Éliminez d’abord les propositions contraires aux principes de la République, comme une discrimination présentée comme permise ou une obligation religieuse imposée par l’État, puis choisissez parmi celles qui restent. Le mini-outil de cette page compte les erreurs encore permises sous le seuil de ${h.need}.` },
    ],
    body: (h) => {
      const a = ex(h, 'o1-036'), b = ex(h, 'o2-058'), c = ex(h, 'o5-090');
      return `
<h2>Pourquoi passer par des séries courtes</h2>
<p>Une épreuve complète mélange cinq thématiques et ne dit pas pourquoi l’on s’est trompé. Une série de dix questions sur un seul thème fait l’inverse : elle isole une notion, montre aussitôt la bonne réponse et l’explique. On apprend plus vite en se trompant sur dix questions corrigées qu’en réussissant à moitié quarante questions notées en bloc.</p>
<p>La méthode qui fonctionne le mieux tient en trois temps. D’abord, une série par thématique avec la correction immédiate, pour découvrir les notions. Ensuite, les mêmes thématiques avec la correction à la fin, pour vérifier que la notion tient sans aide. Enfin, l’${h.a('examen-blanc', 'examen civique blanc')} complet, dans le temps réel, pour l’endurance.</p>
<h2>Ce que contient la banque de questions</h2>
${h.table(['Thématique', 'Questions dans la banque', 'Questions le jour de l’examen'], [1, 2, 3, 4, 5].map((t) => [`${t}. ${h.theme(t as 1)}`, h.count.theme(t as 1), h.quota(t as 1).total]), 'Banque Examen Civique Blanc et répartition de l’article 3 de l’arrêté du 10 octobre 2025.', ['l', 'r', 'r'])}
<p>Les thématiques ne pèsent pas le même poids. Principes et valeurs de la République et droits et devoirs comptent chacune ${h.quota(1).total} questions le jour de l’examen ; vivre dans la société française n’en compte que ${h.quota(5).total}. Répartissez donc votre temps de révision dans les mêmes proportions, sans négliger les petites thématiques : une question perdue coûte un point, quelle que soit sa thématique.</p>
<h2>Trois exemples de questions et leur logique</h2>
<ul>
<li>« ${a.q} » La bonne réponse est : ${a.a}. Le piège consiste à croire qu’une conviction personnelle l’emporte sur une obligation légale.</li>
<li>« ${b.q} » Réponse : ${b.a}. La nationalité et l’âge ne suffisent pas, l’inscription est une démarche à faire.</li>
<li>« ${c.q} » Réponse : ${c.a}. L’égalité entre les femmes et les hommes revient dans toutes les thématiques, y compris la vie professionnelle.</li>
</ul>
<p>Ces questions ont un point commun : la proposition juste découle d’un principe, pas d’un détail à apprendre par cœur. Quand vous hésitez, demandez-vous quelle réponse respecte l’égalité, la liberté et la laïcité ; elle est souvent la bonne. Les questions de dates et de lieux, surtout en histoire et en géographie, demandent en revanche de la mémoire : relisez-les à part.</p>
<h2>Connaissance et mises en situation</h2>
<p>Le QCM mêle deux types de questions. Les questions de connaissance portent un intitulé officiel, publié par le ministère dans la ${h.src('fc_cr', 'liste de la mention carte de résident')} et dans celle de la carte pluriannuelle. Les mises en situation décrivent une scène de la vie quotidienne et demandent la conduite conforme à la loi ; elles ne sont pas publiées, et les nôtres sont écrites d’après les fiches officielles. Pour vous concentrer sur ce second type, ouvrez la page des ${h.a('mises-en-situation', 'mises en situation')}.</p>
<h2>Quand passer à l’examen complet</h2>
<p>Un repère simple : quand vous réussissez au moins neuf questions sur dix dans chaque thématique avec la correction à la fin, vous êtes prêt pour l’épreuve chronométrée. Si une thématique reste en dessous, travaillez-la seule, par exemple avec la page ${h.a('theme-3', 'droits et devoirs')}, qui détaille ses notions. Le seuil réel laisse ${h.size - h.need} erreurs au plus sur l’ensemble : une seule thématique faible suffit à le franchir dans le mauvais sens.</p>`;
    },
  },
  en: {
    slug: 'civic-exam-practice-questions',
    nav: 'Civic exam practice questions',
    card: 'Short practice sets by theme, corrected one question at a time, to learn before the full mock test.',
    title: 'Civic exam practice questions by theme, marked as you go',
    description: 'Civic exam practice questions in short sets: pick a theme, answer, and read the explanation straight away, with the official sheet to check each answer against.',
    h1: 'French civic exam practice questions, one theme at a time',
    intro: 'Pick a theme, answer the questions in the set and read the explanation right after each answer, or at the end if you prefer.',
    resume: (h) => `French civic exam practice questions are multiple-choice items with ${h.P.exam.options} options and a single right answer, the same format as the real test. On the day, the paper has ${h.size} questions, lasts ${h.P.exam.minutes} minutes and needs ${h.need} correct answers; a wrong answer and a blank both score zero. The real exam is in French only, so these English questions are a way to understand the notions before you practise in French. The tool on this page draws ten questions from the theme you choose, out of the ${h.num(h.count.all)} in our bank, and shows the right answer after each one, with an explanation and the official sheet to check. The ${h.num(h.count.knowledge)} knowledge questions are translated from the stems published by the French Interior Ministry; the ${h.num(h.count.situations)} scenario questions are written by us. The "New set" button changes the questions as often as you like, and you can hold the marking back to the end to test yourself without help.`,
    faqs: (h) => [
      { q: 'How many questions are there in a practice set?', a: `Ten, drawn from the theme you choose or from all five. A set takes a few minutes, so you can run several in one sitting. Once a theme no longer trips you up, move on to the full ${h.size}-question paper, timed over ${h.P.exam.minutes} minutes, which is what the real exam looks like.` },
      { q: 'Should I practise in English or in French?', a: 'Start in English if your French is still shaky: understanding what laïcité or the separation of powers means matters more than the wording at first. Then switch to the French version with the language button and redo the same themes. On exam day every question, option and scenario is in French, with no translation available.' },
      { q: 'Is it better to see the answer at once or at the end?', a: 'At once while you are learning: reading the explanation at the moment you get it wrong makes the notion stick. When a theme feels solid, switch to marking at the end, which matches exam conditions, where nothing is corrected during the test. The setting sits just above the questions and changes in one click.' },
    ],
    body: (h) => {
      const a = ex(h, 'o1-036'), b = ex(h, 'o2-058'), c = ex(h, 'o5-090');
      return `
<h2>Why short sets work for expats</h2>
<p>A full paper mixes five themes and tells you little about why you went wrong. A ten-question set on a single theme does the opposite: it isolates one notion, shows the right answer at once and explains it. For someone who did not grow up in France, many notions are new rather than forgotten, so learning them in small, corrected batches is far quicker than sitting forty questions marked in one go.</p>
<p>A three-step routine works well. First, one set per theme in English with instant marking, to discover the notions. Second, the same themes in French, still with instant marking, to learn the vocabulary of the real exam. Third, the full ${h.a('examen-blanc', 'civic exam mock test')} in French, against the clock.</p>
<h2>What the question bank holds</h2>
${h.table(['Theme', 'Questions in our bank', 'Questions on exam day'], [1, 2, 3, 4, 5].map((t) => [`${t}. ${h.theme(t as 1)}`, h.count.theme(t as 1), h.quota(t as 1).total]), 'Examen Civique Blanc bank and the mix in Article 3 of the decree of 10 October 2025.', ['l', 'r', 'r'])}
<p>The themes do not weigh the same. The principles and values of the Republic and rights and duties carry ${h.quota(1).total} questions each on the day, while living in French society carries only ${h.quota(5).total}. Spread your revision in the same proportions, but do not skip the small themes: every question is worth one point.</p>
<h2>Three sample questions and the logic behind them</h2>
<ul>
<li>"${a.q}" Right answer: ${a.a}. The trap is to think a personal belief can override a legal duty.</li>
<li>"${b.q}" Right answer: ${b.a}. Age and nationality are not enough; registering is a step you have to take.</li>
<li>"${c.q}" Right answer: ${c.a}. Equality between women and men comes up in every theme, working life included.</li>
</ul>
<p>The right option usually follows from a principle rather than a detail. When in doubt, ask which answer respects equality, freedom and secularism; it is often the correct one. Dates and places, mostly in history and geography, need memory instead, so review them separately.</p>
<h2>Knowledge questions and scenarios</h2>
<p>The sets mix two kinds of question. Knowledge questions use an official stem published by the ministry in the ${h.src('fc_cr', 'resident card list')} and the multi-year permit list. Scenario questions describe an everyday situation and ask for the lawful response; the ministry does not publish them, so ours are written from the official guidance sheets. To focus on that second kind, open the ${h.a('mises-en-situation', 'scenario questions')} page.</p>
<h2>When to move on to the full paper</h2>
<p>A simple benchmark: when you get at least nine out of ten in every theme with marking held to the end, you are ready for the timed paper. If one theme stays below that, work on it alone, for instance on the ${h.a('theme-3', 'rights and duties')} page, which sets out its notions. The real pass mark leaves room for ${h.size - h.need} mistakes in total, and one weak theme is enough to use them all up.</p>`;
    },
  },
});
