import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'mises-en-situation',
  group: 'examen',
  order: 50,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "situations": true}},
  mini: {"kind": "mini:errors"},
  related: ['theme-1', 'theme-3', 'qcm', 'examen-blanc', 'exemple', 'resultat'],
  sources: ['arrete_exam', 'referentiel', 'fc_fiches', 'fc_info', 'sp_exam_sejour'],
  fr: {
    slug: 'mises-en-situation-examen-civique',
    nav: 'Mises en situation',
    card: 'Des cas de la vie courante où il faut choisir la réaction conforme à la loi, corrigés et expliqués.',
    title: 'Mises en situation examen civique : cas pratiques corrigés',
    description: 'Mises en situation de l’examen civique : des scènes de la vie courante à trancher selon la loi, corrigées une à une, et une méthode pour les lire sans piège.',
    h1: 'Mises en situation de l’examen civique : s’entraîner sur des cas',
    intro: 'Lisez chaque scène, choisissez la réaction conforme à la loi et découvrez aussitôt le corrigé, avec la règle qui s’applique.',
    resume: (h) => `Les mises en situation de l’examen civique sont les questions qui décrivent une scène de la vie courante, au travail, à la préfecture, chez le médecin ou entre voisins, et demandent quelle réaction ou quelle règle est conforme à la loi française. L’épreuve en compte ${h.P.exam.situations} sur ${h.size}, soit ${h.pc(h.P.exam.situations / h.size)} de la note : ${h.quota(1).notions.situation} dans la thématique principes et valeurs de la République, ${h.quota(3).notions.situation} dans la thématique droits et devoirs. Contrairement aux questions de connaissance, le ministère ne les publie pas ; il faut donc maîtriser les principes plutôt que retenir des réponses. Elles prennent aussi plus de temps à lire, ce qui pèse dans une épreuve de ${h.P.exam.minutes} minutes. L’outil ci-dessus tire dix mises en situation parmi les ${h.num(h.count.situations)} que nous avons rédigées d’après les fiches officielles de la formation civique, corrige chaque réponse et cite la règle applicable. Le mini-outil compte les erreurs qui vous restent permises sous le seuil de ${h.need}.`,
    faqs: (h) => [
      { q: 'Les mises en situation de l’examen sont-elles publiées quelque part ?', a: 'Non. Le ministère publie la liste des questions de connaissance, mais pas les mises en situation, ni leurs réponses. Celles de cette page sont rédigées par Radif Partners à partir des fiches thématiques officielles et des textes de loi. Elles ressemblent par leur forme à celles de l’épreuve sans prétendre les reproduire : leur but est d’entraîner au raisonnement.' },
      { q: 'Combien de temps consacrer à une mise en situation pendant l’épreuve ?', a: `L’épreuve laisse en moyenne un peu plus d’une minute par question. Les questions de connaissance se traitent souvent en quelques secondes : gardez ce temps gagné pour les mises en situation, plus longues à lire. Lisez d’abord la question finale, puis la scène, puis les ${h.P.exam.options} propositions ; repérez le principe en jeu avant de choisir.` },
      { q: 'Quels principes reviennent le plus dans les mises en situation ?', a: 'L’égalité et l’interdiction des discriminations, la laïcité, en particulier la différence entre l’agent public tenu à la neutralité et l’usager libre de ses convictions, l’égalité entre les femmes et les hommes, la protection des enfants, et les règles du travail et de la consommation. Une réponse qui tolère une discrimination ou impose une pratique religieuse est presque toujours fausse.' },
    ],
    body: (h) => {
      const a = ex(h, 's1-017'), b = ex(h, 's1-031'), c = ex(h, 's3-016'), d = ex(h, 's3-034'), e = ex(h, 's1-010');
      return `
<h2>Ce qui fait la difficulté d’une mise en situation</h2>
<p>Une question de connaissance se reconnaît ou non. Une mise en situation se raisonne : la scène contient souvent un détail qui oriente vers la mauvaise réponse, comme un usage répandu, une habitude du pays d’origine ou une solution qui semble arrangeante. La bonne proposition est celle que la loi impose, même quand une autre paraît plus naturelle.</p>
<p>Le ${h.src('referentiel', 'référentiel de l’examen')} rattache toutes les mises en situation à deux thématiques. Leur poids est considérable : à elles seules, elles valent plus que l’écart entre le seuil de ${h.need} et la note maximale. Négliger ce type de question revient à renoncer à toute marge.</p>
<h2>Cinq cas tirés de notre banque</h2>
<ol>
<li><strong>${a.q}</strong> Réponse : ${a.a}. ${a.e}</li>
<li><strong>${b.q}</strong> Réponse : ${b.a}. ${b.e}</li>
<li><strong>${c.q}</strong> Réponse : ${c.a}. ${c.e}</li>
<li><strong>${d.q}</strong> Réponse : ${d.a}. ${d.e}</li>
<li><strong>${e.q}</strong> Réponse : ${e.a}. ${e.e}</li>
</ol>
<h2>Une méthode en quatre temps</h2>
<ul>
<li><strong>Lire la question d’abord.</strong> « Que dit la loi ? », « Qui a raison ? », « Que pouvez-vous faire ? » : la formulation indique si l’on attend une règle, un arbitrage ou un droit.</li>
<li><strong>Nommer le principe.</strong> Discrimination, laïcité, égalité, protection de l’enfant, droit du travail : une fois le principe nommé, deux propositions tombent souvent d’elles-mêmes.</li>
<li><strong>Se méfier du compromis.</strong> Une proposition qui accepte une discrimination « si tout le monde est d’accord » ou « par tradition » est un piège classique.</li>
<li><strong>Distinguer l’agent et l’usager.</strong> L’agent d’un service public doit rester neutre ; l’usager, lui, peut exprimer ses convictions dans le respect de l’ordre public.</li>
</ul>
<h2>Où se trouvent les règles à connaître</h2>
<p>Les ${h.src('fc_fiches', 'fiches thématiques de la formation civique')} détaillent les principes sur lesquels reposent nos corrigés. Les deux pages thématiques du site les reprennent sous l’angle de l’examen : ${h.a('theme-1', 'principes et valeurs de la République')} pour la laïcité, l’égalité et les symboles, ${h.a('theme-3', 'droits et devoirs')} pour les libertés, la justice, le travail et la vie quotidienne.</p>
<p>Une fois les mises en situation maîtrisées en série, vérifiez que le rythme tient en conditions réelles avec l’${h.a('examen-blanc', 'examen civique blanc')} : les mises en situation y arrivent mêlées aux questions de connaissance, comme le jour de l’épreuve.</p>`;
    },
  },
  en: {
    slug: 'civic-exam-scenario-questions',
    nav: 'Scenario questions',
    card: 'Everyday cases where you pick the lawful response, each one marked and explained.',
    title: 'Civic exam scenario questions: everyday cases, explained',
    description: 'Civic exam scenario questions: everyday situations in France to settle under French law, marked one by one, and a reading method that avoids the usual traps.',
    h1: 'French civic exam scenario questions: practise on real-life cases',
    intro: 'Read each scene, pick the response that complies with French law and see the explanation at once, with the rule that applies.',
    resume: (h) => `Civic exam scenario questions (mises en situation) describe an everyday scene, at work, at the préfecture, at the doctor's or between neighbours, and ask which response or rule complies with French law. The paper holds ${h.P.exam.situations} of them out of ${h.size}, ${h.pc(h.P.exam.situations / h.size)} of the marks: ${h.quota(1).notions.situation} under the principles and values of the Republic and ${h.quota(3).notions.situation} under rights and duties. Unlike knowledge questions, the ministry does not publish them, so you need to master the principles rather than memorise answers. They also take longer to read, which matters in a ${h.P.exam.minutes}-minute paper taken in French only. For expats, they are often the hardest part, because the right answer can differ from what is normal in their home country. The tool above draws ten scenarios from the ${h.num(h.count.situations)} we wrote from the official civic training sheets, marks each answer and names the rule that applies. The small tool counts the mistakes you can still afford under the pass mark of ${h.need}.`,
    faqs: (h) => [
      { q: 'Where can I find the official scenario questions?', a: 'Nowhere: the ministry publishes the knowledge question list but not the scenarios or their answers. The ones on this page are written by Radif Partners from the official theme sheets and legal texts. They follow the same shape as those in the exam without claiming to reproduce them; their aim is to train your reasoning.' },
      { q: 'Why do expats find scenario questions hard?', a: 'Because the trap is often what feels normal elsewhere. Asking a tenant about their religion, paying a worker cash in hand or a civil servant wearing a religious sign may be common in other countries, yet each runs against French law. Read each scene asking what French law requires, not what you would expect at home.' },
      { q: 'How should I read a scenario under time pressure?', a: `Read the final question first, then the scene, then the ${h.P.exam.options} options, and name the principle at stake before you choose. Knowledge questions often take only seconds, so bank that time for the scenarios. On the day the text is in French, so practise this routine on the French version as well.` },
    ],
    body: (h) => {
      const a = ex(h, 's1-017'), b = ex(h, 's1-031'), c = ex(h, 's3-016'), d = ex(h, 's3-034'), e = ex(h, 's1-010');
      return `
<h2>What makes a scenario question tricky</h2>
<p>A knowledge question you either know or you do not. A scenario has to be reasoned through: the scene often contains a detail that pulls you towards the wrong answer, such as a widespread habit, a custom from another country or a solution that seems convenient. The right option is the one French law requires, even when another feels more natural.</p>
<p>The ${h.src('referentiel', 'exam syllabus')} attaches every scenario to two themes. Their weight is large: together they are worth more than the gap between the pass mark of ${h.need} and a perfect score. Skipping them means giving up any margin.</p>
<h2>Five cases from our bank</h2>
<ol>
<li><strong>${a.q}</strong> Answer: ${a.a}. ${a.e}</li>
<li><strong>${b.q}</strong> Answer: ${b.a}. ${b.e}</li>
<li><strong>${c.q}</strong> Answer: ${c.a}. ${c.e}</li>
<li><strong>${d.q}</strong> Answer: ${d.a}. ${d.e}</li>
<li><strong>${e.q}</strong> Answer: ${e.a}. ${e.e}</li>
</ol>
<h2>A four-step method</h2>
<ul>
<li><strong>Read the question first.</strong> "What does the law say?", "Who is right?", "What can you do?": the wording tells you whether a rule, a judgement or a right is expected.</li>
<li><strong>Name the principle.</strong> Discrimination, secularism, equality, child protection, employment law: once named, two options usually fall away.</li>
<li><strong>Distrust the compromise.</strong> An option that accepts discrimination "if everyone agrees" or "by tradition" is a classic trap.</li>
<li><strong>Tell the official from the user.</strong> A public servant must stay neutral; a member of the public may express their beliefs within public order.</li>
</ul>
<h2>Where the rules are explained</h2>
<p>The ${h.src('fc_fiches', 'civic training theme sheets')} set out the principles behind our explanations. Two theme pages on this site cover them from the exam's angle: ${h.a('theme-1', 'principles and values of the Republic')} for secularism, equality and symbols, and ${h.a('theme-3', 'rights and duties')} for freedoms, justice, work and daily life.</p>
<p>Once you handle scenarios well in sets, check your pace in real conditions with the ${h.a('examen-blanc', 'civic exam mock test')}, where they arrive mixed with knowledge questions, as on the day.</p>`;
    },
  },
});
