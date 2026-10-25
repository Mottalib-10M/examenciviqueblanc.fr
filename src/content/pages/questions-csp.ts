import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer] }; };

export default definePage({
  id: 'questions-csp',
  group: 'examen',
  order: 30,
  tool: {"kind": "bank", "props": {"list": "csp", "theme": 1}},
  mini: {"kind": "mini:pass"},
  related: ['examen-csp', 'questions-cr', 'qcm', 'examen-blanc', 'niveau-francais', 'theme-2'],
  sources: ['fc_csp', 'arrete_exam', 'sp_exam_sejour', 'referentiel', 'licence_ouverte'],
  fr: {
    slug: 'questions-carte-pluriannuelle',
    nav: 'Questions carte pluriannuelle',
    card: 'La liste officielle des questions de connaissance de la mention carte pluriannuelle, avec une réponse et un corrigé pour chacune.',
    title: 'Questions examen civique carte pluriannuelle et réponses',
    description: 'Questions examen civique de la carte de séjour pluriannuelle : la liste officielle classée par thématique, avec la bonne réponse et un corrigé sourcé.',
    h1: 'Questions de l’examen civique, mention carte de séjour pluriannuelle',
    intro: 'Toute la liste officielle de la mention carte pluriannuelle, thématique par thématique, avec la bonne réponse en vert et le texte où la vérifier.',
    resume: (h) => `Les questions de l’examen civique pour la carte de séjour pluriannuelle forment une liste officielle publiée par le ministère de l’Intérieur sur le site de la formation civique. Elle ne donne que les intitulés des questions de connaissance, sans propositions ni réponses, et ne contient aucune mise en situation. Notre banque en reprend ${h.num(h.count.csp)} intitulés sous Licence Ouverte et y ajoute, pour chacun, la bonne réponse, trois propositions fausses et un corrigé qui renvoie à la fiche officielle. L’outil ci-dessus les affiche par thématique : choisissez la liste et le thème, la réponse juste apparaît en vert sous chaque question. Le jour de l’épreuve, la mention carte pluriannuelle compte ${h.size} questions, dont ${h.P.exam.knowledge} de connaissance et ${h.P.exam.situations} mises en situation, à traiter en ${h.P.exam.minutes} minutes avec un seuil de ${h.need} bonnes réponses. Le mini-outil calcule si un score donné atteint ce seuil. Cette liste sert aux étrangers qui demandent une première carte pluriannuelle, pour laquelle le niveau de français exigé est ${h.P.language.csp}.`,
    faqs: (h) => [
      { q: 'Combien de questions compte la liste officielle de la carte pluriannuelle ?', a: `Notre banque en reprend ${h.num(h.count.csp)}, réparties sur les cinq thématiques du référentiel. Le nombre exact peut évoluer si le ministère met sa liste à jour : nous la relisons à la main et datons chaque relecture. Le jour de l’examen, seules ${h.P.exam.knowledge} questions de connaissance sont tirées, selon une répartition fixe par notion.` },
      { q: 'Les questions de la carte pluriannuelle sont-elles plus faciles que celles de la carte de résident ?', a: `Elles portent davantage sur la vie courante et les repères de base : symboles, vote, numéros d’urgence, grandes villes. La liste de la carte de résident pose plus souvent des questions abstraites ou datées. Le format, lui, est identique : ${h.size} questions, ${h.P.exam.minutes} minutes et ${h.need} bonnes réponses pour réussir, quelle que soit la mention.` },
      { q: 'Faut-il apprendre les réponses par cœur ?', a: 'Mieux vaut comprendre la notion que retenir une formule. Le ministère ne publie pas les propositions de réponse : celles de l’examen seront rédigées autrement que les nôtres. Si vous savez pourquoi une réponse est juste, vous la reconnaîtrez sous n’importe quelle formulation. Lisez le corrigé de chaque question et la fiche officielle citée quand une notion vous échappe.' },
    ],
    body: (h) => {
      const a = ex(h, 'o1-015'), b = ex(h, 'o2-043'), c = ex(h, 'o3-025'), d = ex(h, 'o5-098');
      return `
<h2>Ce que publie le ministère, et ce qu’il garde</h2>
<p>Le ministère de l’Intérieur met en ligne la ${h.src('fc_csp', 'liste officielle des questions de connaissance de la mention carte pluriannuelle')}. Il s’agit d’intitulés seuls : aucune proposition, aucune bonne réponse, aucune mise en situation. Les ${h.P.exam.situations} questions de mise en situation de l’épreuve restent inconnues avant le jour J, ce qui oblige à comprendre les principes plutôt qu’à mémoriser une grille.</p>
<p>Nous avons repris chaque intitulé, puis rédigé une réponse juste, trois réponses fausses plausibles et un corrigé court. Le corrigé cite la fiche de la formation civique ou le texte de loi où vérifier. Une réponse qui paraît discutable peut donc toujours être confrontée à sa source.</p>
<h2>Le poids de chaque thématique</h2>
${h.table(['Thématique', 'Questions de connaissance tirées', 'Mises en situation'], [1, 2, 3, 4, 5].map((t) => { const q = h.quota(t as 1); const s = (q.notions as Record<string, number>).situation ?? 0; return [`${t}. ${h.theme(t as 1)}`, q.total - s, s]; }), 'Répartition de l’article 3 de l’arrêté du 10 octobre 2025, identique pour les trois mentions.', ['l', 'r', 'r'])}
<p>Histoire, géographie et culture fournit à elle seule ${h.quota(4).total} questions de connaissance : c’est la thématique où la liste de la carte pluriannuelle est la plus longue et où la mémoire compte le plus. Principes et valeurs de la République et droits et devoirs tirent moins de questions de connaissance mais ajoutent toutes les mises en situation.</p>
<h2>Quatre questions de la liste, et ce qu’elles testent</h2>
<ol>
<li>« ${a.q} » Réponse : ${a.a}. Les symboles reviennent souvent : drapeau, hymne, devise, Marianne, fête nationale.</li>
<li>« ${b.q} » Réponse : ${b.a}. Une question sur l’égalité devant la loi, cœur de la thématique institutionnelle.</li>
<li>« ${c.q} » Réponse : ${c.a}. Le vocabulaire juridique de base (infraction, délit, contravention) se retrouve dans les droits et devoirs.</li>
<li>« ${d.q} » Réponse : ${d.a}. La santé publique relève de la vie en société française.</li>
</ol>
<p>Ces exemples montrent le ton de la liste : des questions concrètes, souvent liées à des démarches que tout résident rencontre. Une personne installée en France depuis quelques années connaît déjà une partie des réponses ; le travail porte surtout sur l’histoire, les institutions et le vocabulaire précis.</p>
<h2>Comment réviser cette liste efficacement</h2>
<ul>
<li>Parcourez une thématique par jour dans l’outil ci-dessus, en cachant mentalement la ligne verte avant de la lire.</li>
<li>Notez les intitulés où vous hésitez et reprenez-les le lendemain.</li>
<li>Passez ensuite au ${h.a('qcm', 'QCM par thématique')}, qui mélange les propositions et vous oblige à choisir sans voir la réponse.</li>
<li>Terminez par l’${h.a('examen-csp', 'examen blanc de la mention carte pluriannuelle')}, chronométré, pour vérifier que vous dépassez le seuil avec une marge.</li>
</ul>
<h2>Une partie des intitulés est commune aux deux listes</h2>
<p>Quelques questions figurent à la fois sur la liste de la carte pluriannuelle et sur celle de la ${h.a('questions-cr', 'carte de résident')}. Si vous visez plus tard une carte de résident, ce travail n’est pas perdu : il couvre déjà une partie du programme suivant, et l’attestation obtenue avec la mention carte de résident vaut aussi pour une carte pluriannuelle, l’inverse n’étant pas vrai.</p>`;
    },
  },
  en: {
    slug: 'multi-year-permit-questions',
    nav: 'Multi-year permit questions',
    card: 'The official list of knowledge questions for the multi-year permit level, each with an answer and an explanation.',
    title: 'Civic exam questions for the multi-year permit, answered',
    description: 'Civic exam questions for the multi-year residence permit: the official list sorted by theme, translated, with the right answer and a sourced explanation.',
    h1: 'Civic exam questions for the multi-year residence permit',
    intro: 'The whole official list for the multi-year permit level, theme by theme, with the right answer in green and the text where it can be checked.',
    resume: (h) => `The civic exam questions for the multi-year residence permit (carte de séjour pluriannuelle) form an official list published by the French Interior Ministry on its civic training site. It gives only the stems of the knowledge questions, with no options, no answers and no scenario questions. Our bank reuses ${h.num(h.count.csp)} of these stems under the Licence Ouverte, translates them for this English version and adds the right answer, three wrong options and an explanation pointing to the official sheet. The tool above lists them by theme, with the right answer in green. On the day, the multi-year permit paper has ${h.size} questions, ${h.P.exam.knowledge} on knowledge and ${h.P.exam.situations} scenarios, to be answered in ${h.P.exam.minutes} minutes with a pass mark of ${h.need}. The exam itself is in French only, so read each question in French too before you book. This list concerns foreign nationals applying for a first multi-year permit, which also requires French at level ${h.P.language.csp}; the small tool on the page checks whether a given score clears the mark.`,
    faqs: (h) => [
      { q: 'How many questions are on the multi-year permit list?', a: `Our bank holds ${h.num(h.count.csp)} of them, spread over the five themes of the syllabus. The number can change if the ministry updates its list; we reread it by hand and date each check. On exam day only ${h.P.exam.knowledge} knowledge questions are drawn, following a fixed split by notion.` },
      { q: 'Can I memorise the English translations?', a: 'They will not help on the day, because the questions are asked in French only and the answer options are worded by the exam body, not by us. Use the English to grasp the notion, then switch to the French page with the language button and learn the French wording of the stems you found difficult.' },
      { q: 'Is this list easier than the resident card list?', a: `It leans towards everyday life and basic landmarks: symbols, voting, emergency numbers, major cities. The resident card list more often asks abstract or date-based questions. The format is the same for both levels: ${h.size} questions, ${h.P.exam.minutes} minutes and ${h.need} correct answers to pass.` },
    ],
    body: (h) => {
      const a = ex(h, 'o1-015'), b = ex(h, 'o2-043'), c = ex(h, 'o3-025'), d = ex(h, 'o5-098');
      return `
<h2>What the ministry publishes, and what it keeps back</h2>
<p>The Interior Ministry publishes the ${h.src('fc_csp', 'official list of knowledge questions for the multi-year permit level')}. It contains stems only: no options, no right answers, no scenarios. The ${h.P.exam.situations} scenario questions on the paper stay unknown until the day, so understanding the principles matters more than memorising a grid.</p>
<p>We took every stem, translated it, and wrote a right answer, three plausible wrong ones and a short explanation naming the official sheet or legal text to check. If an answer looks debatable, you can always go back to its source.</p>
<h2>How much each theme weighs</h2>
${h.table(['Theme', 'Knowledge questions drawn', 'Scenario questions'], [1, 2, 3, 4, 5].map((t) => { const q = h.quota(t as 1); const s = (q.notions as Record<string, number>).situation ?? 0; return [`${t}. ${h.theme(t as 1)}`, q.total - s, s]; }), 'Mix set by Article 3 of the decree of 10 October 2025, the same for all three levels.', ['l', 'r', 'r'])}
<p>History, geography and culture alone supplies ${h.quota(4).total} knowledge questions, and it is the theme where newcomers usually have the most catching up to do. The principles of the Republic and rights and duties draw fewer knowledge questions but hold every scenario.</p>
<h2>Four questions from the list</h2>
<ol>
<li>"${a.q}" Answer: ${a.a}. Symbols come up often: flag, anthem, motto, Marianne, national holiday.</li>
<li>"${b.q}" Answer: ${b.a}. Equality before the law sits at the heart of the institutions theme.</li>
<li>"${c.q}" Answer: ${c.a}. Basic legal vocabulary returns in rights and duties.</li>
<li>"${d.q}" Answer: ${d.a}. Public health belongs to living in French society.</li>
</ol>
<p>The list is concrete and often tied to steps every resident takes. If you have lived in France for a few years, you already know part of it; the real work is history, institutions and the precise French vocabulary.</p>
<h2>A revision plan for expats</h2>
<ul>
<li>Go through one theme a day in the tool above, first in English, then the same theme on the French page.</li>
<li>Write down the stems you hesitate on, in French, and review them the next day.</li>
<li>Move on to the ${h.a('qcm', 'practice questions by theme')}, which shuffle the options so you choose without seeing the answer.</li>
<li>Finish with the timed ${h.a('examen-csp', 'multi-year permit civic exam')} mock test, in French, until you clear the mark with room to spare.</li>
</ul>
<h2>Some stems appear on both lists</h2>
<p>A few questions sit on both the multi-year permit list and the ${h.a('questions-cr', 'resident card list')}. If you plan to apply for a resident card later, the effort carries over. Note also that a certificate obtained at the resident card level is accepted for a multi-year permit, while the reverse does not hold.</p>`;
    },
  },
});
