import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer] }; };

export default definePage({
  id: 'questions-cr',
  group: 'examen',
  order: 31,
  tool: {"kind": "bank", "props": {"list": "cr", "theme": 1}},
  mini: {"kind": "mini:pass"},
  related: ['examen-carte-resident', 'questions-csp', 'carte-resident', 'longue-duree-ue', 'theme-4', 'examen-blanc'],
  sources: ['fc_cr', 'arrete_exam', 'sp_exam_sejour', 'sp_cr', 'licence_ouverte'],
  fr: {
    slug: 'questions-carte-de-resident',
    nav: 'Questions carte de résident',
    card: 'Les intitulés officiels de la mention carte de résident, avec la bonne réponse, un corrigé et la fiche où vérifier.',
    title: 'Questions examen civique carte de résident avec réponses',
    description: 'Questions examen civique de la carte de résident : chaque intitulé de la liste officielle, sa bonne réponse, un corrigé et la fiche officielle où le vérifier.',
    h1: 'Questions de l’examen civique, mention carte de résident',
    intro: 'Les intitulés officiels de la mention carte de résident, rangés par thématique, avec la réponse juste et la source de chaque corrigé.',
    resume: (h) => `Les questions de l’examen civique pour la carte de résident sont tirées d’une liste officielle que le ministère de l’Intérieur publie sur son site de formation civique, distincte de celle de la carte pluriannuelle. Comme elle, cette liste ne comporte que des intitulés de questions de connaissance : ni propositions, ni réponses, ni mises en situation. Notre banque en reprend ${h.num(h.count.cr)} sous Licence Ouverte et leur associe une réponse juste, trois réponses fausses et un corrigé sourcé. L’outil ci-dessus les affiche thématique par thématique, réponse en vert. L’épreuve de la mention carte de résident compte ${h.size} questions en ${h.P.exam.minutes} minutes, dont ${h.P.exam.situations} mises en situation, et se réussit avec ${h.need} bonnes réponses. Elle concerne la première carte de résident, demandée par exemple comme conjoint de Français, au titre du regroupement familial ou de la longue durée-UE, avec un niveau de français ${h.P.language.cr}. L’attestation obtenue à ce niveau vaut aussi pour une carte pluriannuelle.`,
    faqs: (h) => [
      { q: 'En quoi la liste de la carte de résident diffère-t-elle de celle de la carte pluriannuelle ?', a: `Les deux listes sont publiées séparément et ne partagent qu’une petite partie de leurs intitulés. Celle de la carte de résident, qui compte ${h.num(h.count.cr)} questions dans notre banque, va plus loin sur les notions abstraites comme l’État de droit ou la liberté de la presse et pose davantage de questions datées sur l’Europe et l’histoire.` },
      { q: 'L’attestation de la mention carte de résident sert-elle pour une carte pluriannuelle ?', a: 'Oui. Les textes prévoient que l’attestation obtenue avec la mention carte de résident vaut pour une carte de séjour pluriannuelle. L’inverse ne fonctionne pas : une attestation de mention carte pluriannuelle ne suffit pas pour une première carte de résident. Si vous hésitez entre les deux démarches à court terme, préparer la mention carte de résident couvre les deux.' },
      { q: 'Quel niveau de français faut-il pour la carte de résident ?', a: `Le niveau ${h.P.language.cr}, contre ${h.P.language.csp} pour une carte pluriannuelle. Il se prouve par un diplôme français ou par un test linguistique reconnu de moins de ${h.P.language.attestationValidityYears} ans. L’examen civique lui-même se passe en français : comprendre les intitulés de cette liste est donc aussi un bon entraînement à la lecture.` },
    ],
    body: (h) => {
      const a = ex(h, 'o2-119'), b = ex(h, 'o3-114'), c = ex(h, 'o2-134'), d = ex(h, 'o1-096'), e = ex(h, 'o5-200');
      return `
<h2>Une liste plus exigeante sur les notions</h2>
<p>La ${h.src('fc_cr', 'liste officielle de la mention carte de résident')} suppose une installation durable en France. On y trouve moins de questions de vie pratique et davantage de questions qui demandent d’expliquer un principe ou de situer un événement. Les intitulés suivants, tirés de notre banque, donnent le ton.</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}.</li>
<li>« ${b.q} » Réponse : ${b.a}.</li>
<li>« ${c.q} » Réponse : ${c.a}.</li>
<li>« ${d.q} » Réponse : ${d.a}.</li>
<li>« ${e.q} » Réponse : ${e.a}.</li>
</ul>
<p>Aucune de ces réponses ne se devine à partir de l’expérience quotidienne seule. Elles demandent d’avoir lu, au moins une fois, la fiche correspondante de la formation civique. C’est pourquoi chaque corrigé de l’outil cite la fiche ou le texte où vérifier.</p>
<h2>Qui doit réviser cette liste</h2>
<p>La mention carte de résident s’applique aux personnes qui demandent pour la première fois une carte de résident de ${h.P.residentCard.validityYears} ans. Les cas les plus fréquents sont les suivants.</p>
${h.table(['Motif de la carte', 'Condition de durée'], [['Conjoint de Français', `${h.P.residentCard.spouseYears} ans de mariage`], ['Regroupement familial', `${h.P.residentCard.familyReunionYears} ans de séjour régulier`], ['Parent d’enfant français', `${h.P.residentCard.parentYears} ans de carte vie privée et familiale`], ['Résident de longue durée-UE', `${h.P.residentCard.ldueYears} ans de séjour régulier ininterrompu`]], `Fiches service-public.gouv.fr relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Les personnes de plus de ${h.P.exam.exemptAgeOver} ans et les réfugiés qui demandent la carte de résident « réfugié » ne passent pas l’examen. Le détail des motifs et le calcul de la date de dépôt se trouvent sur la page ${h.a('carte-resident', 'carte de résident')}, et le cas particulier des absences sur la page ${h.a('longue-duree-ue', 'longue durée-UE')}.</p>
<h2>Les thématiques où la liste pèse le plus</h2>
<p>Histoire, géographie et culture est la thématique la plus fournie de la liste, alors qu’elle ne fournit que ${h.quota(4).total} questions le jour de l’examen. Le système institutionnel compte de nombreux intitulés sur l’Union européenne, pour une seule question européenne tirée dans l’épreuve. Ce décalage invite à ne pas tout apprendre au même niveau de détail : visez la compréhension des notions sur l’ensemble, et une mémorisation précise sur les thèmes les plus tirés, principes et valeurs (${h.quota(1).total} questions) et droits et devoirs (${h.quota(3).total} questions).</p>
<h2>De la liste à l’épreuve</h2>
<p>Lire la liste ne suffit pas : le jour J, les intitulés arrivent mélangés, avec quatre propositions et un chronomètre. Après une première lecture dans l’outil ci-dessus, passez à l’${h.a('examen-carte-resident', 'examen blanc de la mention carte de résident')}, qui tire les questions selon la répartition officielle. Si la thématique historique vous coûte des points, la page ${h.a('theme-4', 'histoire, géographie et culture')} rassemble ses repères essentiels.</p>`;
    },
  },
  en: {
    slug: 'resident-card-questions',
    nav: 'Resident card questions',
    card: 'The official stems for the resident card level, each with the right answer, an explanation and the sheet to check.',
    title: 'Civic exam questions for the resident card, with answers',
    description: 'Civic exam questions for the resident card: every stem on the official list, translated, with its right answer, an explanation and the official sheet to check.',
    h1: 'Civic exam questions for the French resident card',
    intro: 'The official stems for the resident card level, grouped by theme, with the right answer and the source of every explanation.',
    resume: (h) => `The civic exam questions for the French resident card (carte de résident) come from an official list published by the Interior Ministry on its civic training site, separate from the multi-year permit list. Like that one, it holds only the stems of knowledge questions: no options, no answers and no scenario questions. Our bank reuses ${h.num(h.count.cr)} of these stems under the Licence Ouverte, translates them here, and pairs each one with a right answer, three wrong options and a sourced explanation. The tool above lists them theme by theme, with the answer in green. The resident card paper has ${h.size} questions in ${h.P.exam.minutes} minutes, ${h.P.exam.situations} of them scenarios, and you pass with ${h.need} correct answers. It is taken in French only. It applies to a first resident card, for example as the spouse of a French citizen, through family reunification or as an EU long-term resident, alongside French at level ${h.P.language.cr}. A certificate at this level is also accepted for a multi-year permit.`,
    faqs: (h) => [
      { q: 'How does the resident card list differ from the multi-year permit list?', a: `The two lists are published separately and share only a small part of their stems. The resident card list, ${h.num(h.count.cr)} questions in our bank, goes further into abstract notions such as the rule of law or press freedom, and asks more date-based questions on Europe and history.` },
      { q: 'Does a resident card level certificate work for a multi-year permit?', a: 'Yes. The rules state that a certificate obtained at the resident card level is valid for a multi-year residence permit. The reverse does not work: a multi-year permit certificate is not enough for a first resident card. If you may need either in the near future, preparing for the resident card level covers both.' },
      { q: 'Which French level does the resident card require?', a: `Level ${h.P.language.cr}, against ${h.P.language.csp} for a multi-year permit. You prove it with a French diploma or a recognised language test less than ${h.P.language.attestationValidityYears} years old. The civic exam is itself in French, so reading the French version of this list is also good reading practice.` },
    ],
    body: (h) => {
      const a = ex(h, 'o2-119'), b = ex(h, 'o3-114'), c = ex(h, 'o2-134'), d = ex(h, 'o1-096'), e = ex(h, 'o5-200');
      return `
<h2>A list that goes deeper into notions</h2>
<p>The ${h.src('fc_cr', 'official list for the resident card level')} assumes you have settled in France for the long term. It has fewer practical questions and more that ask you to explain a principle or place an event in time. These stems from our bank set the tone.</p>
<ul>
<li>"${a.q}" Answer: ${a.a}.</li>
<li>"${b.q}" Answer: ${b.a}.</li>
<li>"${c.q}" Answer: ${c.a}.</li>
<li>"${d.q}" Answer: ${d.a}.</li>
<li>"${e.q}" Answer: ${e.a}.</li>
</ul>
<p>None of these can be guessed from daily life alone. Each needs at least one reading of the matching civic training sheet, which is why every explanation in the tool names the sheet or text to check. For an expat, these sheets are also the best way into the vocabulary of French public life: words such as État de droit, laïcité or préfet have no exact English equivalent, and the exam will use them as they are.</p>
<h2>Who needs this list</h2>
<p>The resident card level applies to people applying for their first ${h.P.residentCard.validityYears}-year resident card. The most common routes are these.</p>
${h.table(['Route to the card', 'Time condition'], [['Spouse of a French citizen', `${h.P.residentCard.spouseYears} years of marriage`], ['Family reunification', `${h.P.residentCard.familyReunionYears} years of legal residence`], ['Parent of a French child', `${h.P.residentCard.parentYears} years on a private and family life permit`], ['EU long-term resident', `${h.P.residentCard.ldueYears} years of unbroken legal residence`]], `service-public.gouv.fr pages, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>People over ${h.P.exam.exemptAgeOver} and refugees applying for the refugee resident card do not sit the exam. The details of each route and the date you can apply are on the ${h.a('carte-resident', 'French resident card')} page, and the rules on time spent abroad on the ${h.a('longue-duree-ue', 'EU long-term resident card')} page.</p>
<h2>Where the list is longest</h2>
<p>History, geography and culture has the most stems, yet supplies only ${h.quota(4).total} questions on the day. Institutions include many stems on the European Union, for a single European question in the paper. So do not learn everything to the same depth: aim to understand every notion, and memorise precisely the most heavily drawn themes, principles and values (${h.quota(1).total} questions) and rights and duties (${h.quota(3).total} questions).</p>
<h2>From the list to the real paper</h2>
<p>Reading the list is not enough: on the day the stems arrive shuffled, in French, with four options and a clock. After a first pass in the tool above, sit the ${h.a('examen-carte-resident', 'resident card civic exam')} mock test, drawn with the official mix. If history costs you points, the ${h.a('theme-4', 'history, geography and culture')} page gathers its key landmarks.</p>`;
    },
  },
});
