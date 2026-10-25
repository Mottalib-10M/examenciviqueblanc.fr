import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'theme-4',
  group: 'themes',
  order: 73,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "theme": 4}},
  mini: {"kind": "mini:quota", "props": {"t": 4}},
  related: ['theme-2', 'theme-5', 'questions-cr', 'questions-csp', 'qcm', 'examen-blanc'],
  sources: ['fc_fiches', 'referentiel', 'arrete_exam', 'fc_cr', 'fc_csp'],
  fr: {
    slug: 'histoire-geographie-culture',
    nav: 'Histoire, géographie et culture',
    card: 'Dates, lieux et patrimoine : la thématique où la mémoire compte le plus, avec une méthode pour retenir l’essentiel.',
    title: 'Histoire, géographie et culture : thématique 4 de l’examen',
    description: 'Histoire, géographie et culture de la France pour l’examen civique : dates clés, repères géographiques, patrimoine, questions types et méthode pour les retenir.',
    h1: 'Histoire, géographie et culture : réviser la thématique 4',
    intro: 'Révisez la thématique 4 par séries corrigées, puis fixez les dates et les lieux qui reviennent le plus souvent dans les listes officielles.',
    resume: (h) => `Histoire, géographie et culture est la quatrième thématique de l’examen civique. Elle demande de situer les grands moments de l’histoire de France, de la Révolution à la construction européenne, de connaître les repères géographiques du pays, villes, fleuves, montagnes, territoires d’outre-mer, et quelques éléments du patrimoine culturel. Le jour de l’épreuve, elle compte ${h.quota(4).total} questions sur ${h.size} : ${h.quota(4).notions.histoire} en histoire, ${h.quota(4).notions.geographie} en géographie et ${h.quota(4).notions.patrimoine} sur le patrimoine. Elle ne comporte aucune mise en situation. C’est pourtant la thématique la plus fournie des listes officielles, et celle où la mémoire pèse le plus : une date ou un lieu se savent ou non, le raisonnement aide peu. Pour qui n’a pas été scolarisé en France, c’est souvent la thématique la plus nouvelle, et donc celle qui demande d’être commencée tôt. L’outil ci-dessus tire des séries de dix questions de cette thématique, parmi les ${h.num(h.count.theme(4))} de notre banque, avec un corrigé qui replace chaque réponse dans son contexte ; le mini-outil détaille la répartition.`,
    faqs: (h) => [
      { q: 'Faut-il apprendre beaucoup de dates pour l’examen civique ?', a: `Une poignée suffit pour l’essentiel : début de la Révolution, abolition de l’esclavage, fin des deux guerres mondiales, naissance de la Ve République, élection du président au suffrage universel direct, monnaie unique. Les ${h.quota(4).notions.histoire} questions d’histoire tournent souvent autour de ces repères. Apprenez chaque date avec l’événement et sa signification, pas seule.` },
      { q: 'La géographie de l’outre-mer est-elle au programme ?', a: 'Oui. Les listes officielles comprennent des questions sur les territoires d’outre-mer, en plus de la France métropolitaine : où ils se trouvent, quels départements et régions existent hors de l’Hexagone. Une carte de la France avec ses territoires ultramarins, regardée régulièrement, suffit souvent à éviter les erreurs.' },
      { q: 'Que recouvre le patrimoine dans cette thématique ?', a: `Les grands monuments et musées, les fêtes et événements culturels, la langue française dans le monde, et quelques figures de la culture française. Avec ${h.quota(4).notions.patrimoine} questions le jour de l’épreuve, c’est la plus petite notion de la thématique : visez les repères les plus connus plutôt qu’une culture encyclopédique.` },
    ],
    body: (h) => {
      const a = ex(h, 'o4-031'), b = ex(h, 'o4-148'), c = ex(h, 'o4-160'), d = ex(h, 'o4-043'), e = ex(h, 'o4-166'), f = ex(h, 'o4-178'), g = ex(h, 'o4-073');
      return `
<h2>L’histoire : quelques dates, bien comprises</h2>
<p>Les questions d’histoire portent rarement sur des détails. Elles visent les moments qui ont façonné la République actuelle, et leurs leurres sont souvent des dates voisines. Quatre exemples de la banque :</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}. ${a.e}</li>
<li>« ${b.q} » Réponse : ${b.a}. ${b.e}</li>
<li>« ${c.q} » Réponse : ${c.a}. ${c.e}</li>
<li>« ${d.q} » Réponse : ${d.a}.</li>
</ul>
<p>Un bon moyen de retenir ces repères est de les relier aux symboles et aux institutions vus dans les autres thématiques : la fête nationale renvoie à la Révolution, l’élection du président au suffrage universel renvoie à la Ve République, la journée de l’Europe à la construction européenne.</p>
<h2>La géographie : savoir lire une carte de France</h2>
<p>Les ${h.quota(4).notions.geographie} questions de géographie testent des repères que l’on retient bien avec une carte sous les yeux : grandes villes, fleuves, chaînes de montagnes, mers et océans, pays voisins, territoires d’outre-mer.</p>
<ul><li>« ${e.q} » Réponse : ${e.a}. ${e.e}</li></ul>
<p>Les leurres jouent sur la proximité : les Alpes au lieu des Pyrénées, une grande ville de l’intérieur au lieu d’une ville du littoral. Une méthode simple consiste à réviser par frontière, puis par façade maritime, puis par grand fleuve.</p>
<h2>Le patrimoine : les repères les plus connus</h2>
<ul>
<li>« ${f.q} » Réponse : ${f.a}.</li>
<li>« ${g.q} » Réponse : ${g.a}.</li>
</ul>
<p>Le patrimoine couvre les monuments, les musées, les fêtes et la langue française dans le monde. Inutile de viser l’exhaustivité : ces questions portent sur ce qu’un résident croise dans la vie culturelle courante.</p>
<h2>Un plan de révision en trois semaines</h2>
${h.table(['Semaine', 'Contenu', 'Exercice'], [['Première', 'les dates clés de l’histoire, de la Révolution à l’Union européenne', 'une série par jour en correction immédiate'], ['Deuxième', 'la carte de France : villes, fleuves, montagnes, outre-mer', 'une série par jour, puis relecture des erreurs'], ['Troisième', 'le patrimoine et la révision des erreurs des deux semaines', 'séries en correction à la fin']], 'Plan indicatif proposé par Examen Civique Blanc.', ['l', 'l', 'l'])}
<p>Le programme officiel de la thématique figure dans le ${h.src('referentiel', 'référentiel de l’examen')}. La liste de la carte de résident y est particulièrement fournie : la page ${h.a('questions-cr', 'questions de la carte de résident')} permet de la parcourir en entier avec les réponses, et la page ${h.a('questions-csp', 'questions de la carte pluriannuelle')} fait de même pour l’autre liste.</p>
<h2>Pourquoi ne pas négliger cette thématique</h2>
<p>Avec ${h.quota(4).total} questions, elle pèse plus que les institutions (${h.quota(2).total}) ou la vie en société (${h.quota(5).total}). Comme ses réponses ne se déduisent pas d’un principe, elle récompense directement le travail de mémorisation : c’est la thématique où quelques heures de révision rapportent le plus de points sûrs. Elle éclaire aussi la thématique ${h.a('theme-2', 'institutions politiques')}, dont plusieurs règles ont une origine historique.</p>`;
    },
  },
  en: {
    slug: 'french-history-geography',
    nav: 'History, geography and culture',
    card: 'Dates, places and heritage: the theme where memory counts most, with a method to retain the essentials.',
    title: 'History, geography and culture of France: civic theme 4',
    description: 'History, geography and culture of France for the civic exam: key dates, map landmarks, heritage, sample questions and a three-week plan to remember them.',
    h1: 'History, geography and culture of France: theme 4 revision',
    intro: 'Revise theme 4 through marked sets, then pin down the dates and places that come up most often on the official lists.',
    resume: (h) => `History, geography and culture is the fourth theme of the French civic exam. It asks you to place the major moments of French history, from the Revolution to European integration, to know the country's geographical landmarks, cities, rivers, mountains and overseas territories, and some elements of its cultural heritage. On the day it carries ${h.quota(4).total} of the ${h.size} questions: ${h.quota(4).notions.histoire} on history, ${h.quota(4).notions.geographie} on geography and ${h.quota(4).notions.patrimoine} on heritage. It has no scenario questions. Yet it is the largest theme on the official lists and the one where memory matters most: you either know a date or a place or you do not, and reasoning helps little. For anyone not schooled in France it is often the newest material, so it rewards early, steady revision. The tool above draws ten-question sets from this theme, out of the ${h.num(h.count.theme(4))} in our bank, with explanations that place each answer in context; the small tool shows the split. On the day, the questions are in French only.`,
    faqs: (h) => [
      { q: 'How many dates do I need to learn?', a: `A handful covers most of it: the start of the Revolution, the abolition of slavery, the end of both world wars, the birth of the Fifth Republic, direct election of the President, the single currency. The ${h.quota(4).notions.histoire} history questions often revolve around these. Learn each date with its event and meaning, never on its own.` },
      { q: 'Is overseas France part of the geography questions?', a: 'Yes. The official lists include questions on the overseas territories as well as mainland France: where they are and which départements and regions lie outside the mainland. Looking regularly at a map of France that shows its overseas territories is usually enough to avoid mistakes.' },
      { q: 'What does heritage cover in this theme?', a: `Major monuments and museums, festivals and cultural events, the French language in the world, and a few figures of French culture. With ${h.quota(4).notions.patrimoine} questions on the day, it is the smallest notion in the theme: aim for the best-known landmarks rather than encyclopaedic knowledge.` },
    ],
    body: (h) => {
      const a = ex(h, 'o4-031'), b = ex(h, 'o4-148'), c = ex(h, 'o4-160'), d = ex(h, 'o4-043'), e = ex(h, 'o4-166'), f = ex(h, 'o4-178'), g = ex(h, 'o4-073');
      return `
<h2>History: a few dates, well understood</h2>
<p>History questions rarely go into detail. They target the moments that shaped today's Republic, and their distractors are often nearby dates. Four examples from our bank:</p>
<ul>
<li>"${a.q}" Answer: ${a.a}. ${a.e}</li>
<li>"${b.q}" Answer: ${b.a}. ${b.e}</li>
<li>"${c.q}" Answer: ${c.a}. ${c.e}</li>
<li>"${d.q}" Answer: ${d.a}.</li>
</ul>
<p>Tie these landmarks to the symbols and institutions from the other themes: the national holiday points back to the Revolution, direct election of the President to the Fifth Republic, Europe Day to European integration.</p>
<h2>Geography: reading a map of France</h2>
<p>The ${h.quota(4).notions.geographie} geography questions test landmarks that are easy to remember with a map in front of you: major cities, rivers, mountain ranges, seas and oceans, neighbouring countries, overseas territories.</p>
<ul><li>"${e.q}" Answer: ${e.a}. ${e.e}</li></ul>
<p>Distractors play on proximity: the Alps instead of the Pyrenees, an inland city instead of a coastal one. A simple method is to revise border by border, then coast by coast, then river by river.</p>
<h2>Heritage: the best-known landmarks</h2>
<ul>
<li>"${f.q}" Answer: ${f.a}.</li>
<li>"${g.q}" Answer: ${g.a}.</li>
</ul>
<p>Heritage covers monuments, museums, festivals and the French language in the world. There is no need to be exhaustive: these questions deal with what a resident meets in everyday cultural life.</p>
<h2>A three-week revision plan</h2>
${h.table(['Week', 'Content', 'Exercise'], [['First', 'key dates, from the Revolution to the European Union', 'one set a day with instant marking'], ['Second', 'the map of France: cities, rivers, mountains, overseas', 'one set a day, then review mistakes'], ['Third', 'heritage, plus a review of the first two weeks\' mistakes', 'sets with marking at the end']], 'Suggested plan by Examen Civique Blanc.', ['l', 'l', 'l'])}
<p>The official syllabus for this theme is in the ${h.src('referentiel', 'exam syllabus')}. The resident card list is especially long here: the ${h.a('questions-cr', 'resident card questions')} page lets you read it in full with answers, and the ${h.a('questions-csp', 'multi-year permit questions')} page does the same for the other list.</p>
<h2>Why this theme deserves time</h2>
<p>With ${h.quota(4).total} questions, it outweighs institutions (${h.quota(2).total}) or living in French society (${h.quota(5).total}), and since its answers cannot be worked out from a principle, it directly rewards memorising. It is the theme where a few hours of revision bring the most safe points. It also sheds light on ${h.a('theme-2', 'French institutions')}, several of whose rules have historical roots.</p>`;
    },
  },
});
