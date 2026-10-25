import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'theme-1',
  group: 'themes',
  order: 70,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "theme": 1}},
  mini: {"kind": "mini:quota", "props": {"t": 1}},
  related: ['theme-2', 'theme-3', 'mises-en-situation', 'qcm', 'livret', 'examen-blanc'],
  sources: ['fc_fiches', 'referentiel', 'arrete_exam', 'charte', 'fc_cr'],
  fr: {
    slug: 'principes-valeurs-republique',
    nav: 'Principes et valeurs de la République',
    card: 'Devise, symboles et laïcité : la thématique la plus lourde de l’examen avec les droits et devoirs, et ses pièges.',
    title: 'Principes et valeurs de la République : thématique 1',
    description: 'Principes et valeurs de la République pour l’examen civique : devise, symboles, laïcité et mises en situation, avec des questions types et les pièges à éviter.',
    h1: 'Principes et valeurs de la République : réviser la thématique 1',
    intro: 'Entraînez-vous sur des séries de la thématique 1, corrigées après chaque réponse, puis relisez les notions et les pièges qui coûtent le plus de points.',
    resume: (h) => `Principes et valeurs de la République est la première des cinq thématiques de l’examen civique. Elle couvre la devise « Liberté, Égalité, Fraternité », les symboles de la République, comme le drapeau, l’hymne, Marianne ou la fête nationale, la langue française, et la laïcité. Le jour de l’épreuve, elle compte ${h.quota(1).total} questions sur ${h.size} : ${h.quota(1).notions.symboles} sur la devise et les symboles, ${h.quota(1).notions.laicite} sur la laïcité et ${h.quota(1).notions.situation} mises en situation, soit la moitié de toutes les mises en situation de l’examen. Avec les droits et devoirs, c’est la thématique la plus lourde. Les questions de connaissance testent des repères précis ; les mises en situation demandent d’appliquer l’égalité, la non-discrimination et la laïcité à des scènes de la vie courante, au guichet d’un service public, au travail ou dans la recherche d’un logement. L’outil ci-dessus tire des séries de dix questions de cette seule thématique, parmi les ${h.num(h.count.theme(1))} de notre banque, avec la correction après chaque réponse ; le mini-outil rappelle la répartition officielle.`,
    faqs: (h) => [
      { q: 'Quels symboles de la République faut-il connaître pour l’examen ?', a: 'Le drapeau tricolore bleu, blanc, rouge, la Marseillaise, la devise « Liberté, Égalité, Fraternité », Marianne, la fête nationale du 14 juillet, et des symboles d’usage comme le coq. La langue française, langue de la République inscrite dans la Constitution, revient aussi dans les questions. Les fiches de la formation civique consacrent une page à chacun.' },
      { q: 'La laïcité interdit-elle de porter un signe religieux en public ?', a: 'Non, c’est le piège le plus fréquent de la thématique. La neutralité religieuse s’impose à l’État et à ses agents, pas aux usagers. Dans la rue comme au guichet d’une préfecture, un usager peut porter un signe religieux, dans le respect de l’ordre public et du fonctionnement du service. Retenez la distinction entre l’agent, tenu à la neutralité, et l’usager, libre de ses convictions.' },
      { q: 'Combien de mises en situation compte la thématique principes et valeurs ?', a: `${h.quota(1).notions.situation}, soit autant que la thématique droits et devoirs. Ensemble, elles forment les ${h.P.exam.situations} mises en situation de l’épreuve. Celles de la thématique 1 portent surtout sur l’égalité entre les femmes et les hommes, les discriminations et la laïcité dans la vie quotidienne : les réussir pèse plus lourd que de connaître toutes les dates d’histoire.` },
    ],
    body: (h) => {
      const a = ex(h, 'o1-001'), b = ex(h, 'o1-022'), c = ex(h, 'o1-014'), d = ex(h, 'o1-110'), e = ex(h, 'o1-029'), f = ex(h, 's1-003'), g = ex(h, 's1-024');
      return `
<h2>La devise et les symboles</h2>
<p>Les ${h.quota(1).notions.symboles} questions de cette notion portent sur des repères qu’on croise tous les jours sans toujours les nommer. Trois exemples de la banque montrent l’éventail, de la date au sens d’un mot de la devise :</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}. ${a.e}</li>
<li>« ${b.q} » Réponse : ${b.a}. ${b.e}</li>
<li>« ${c.q} » Réponse : ${c.a}.</li>
</ul>
<p>Le piège classique consiste à confondre les commémorations : le 14 juillet n’est ni l’armistice de la Première Guerre mondiale ni la fin de la Seconde. Apprenez chaque symbole avec sa signification, pas seulement son nom.</p>
<h2>La laïcité</h2>
<p>La laïcité tient en deux idées. D’un côté, la liberté de conscience : chacun croit, ne croit pas ou change de religion librement. De l’autre, la neutralité de l’État : il ne reconnaît ni ne finance aucun culte, et ses agents ne manifestent pas leurs convictions dans l’exercice de leurs fonctions.</p>
<ul>
<li>« ${d.q} » Réponse : ${d.a}. ${d.e}</li>
<li>« ${e.q} » Réponse : ${e.a}. ${e.e}</li>
</ul>
<p>Les mauvaises réponses de cette notion ont souvent un air de bon sens : « il faut l’accord de sa famille », « l’État choisit une religion officielle ». Toute proposition qui fait dépendre une conviction de l’autorisation d’un tiers est fausse.</p>
<h2>Les mises en situation de la thématique</h2>
<p>Elles appliquent ces principes à des scènes concrètes. Deux cas de notre banque :</p>
<ul>
<li><strong>${f.q}</strong> Réponse : ${f.a}. ${f.e}</li>
<li><strong>${g.q}</strong> Réponse : ${g.a}. ${g.e}</li>
</ul>
<p>Le raisonnement est toujours le même : qui est l’agent public, qui est l’usager, et quel critère protégé est en jeu (origine, sexe, religion, orientation sexuelle, handicap). La page ${h.a('mises-en-situation', 'mises en situation')} propose une méthode de lecture détaillée.</p>
<h2>Les pièges qui coûtent des points</h2>
${h.table(['Idée reçue', 'Ce que dit la règle'], [['La laïcité interdit les signes religieux partout', 'la neutralité vise l’État et ses agents, pas les usagers'], ['Une discrimination est permise si le client la demande', 'une discrimination reste interdite, quelle que soit la demande'], ['Le 14 juillet célèbre la fin d’une guerre', 'c’est la fête nationale, liée à la Révolution'], ['Le français est une langue officielle parmi d’autres', 'c’est la langue de la République, inscrite dans la Constitution']], 'Corrigés de la banque Examen Civique Blanc, établis d’après les fiches de la formation civique.', ['l', 'l'])}
<h2>Où approfondir</h2>
<p>Les ${h.src('fc_fiches', 'fiches de la formation civique')} consacrent un chapitre entier aux principes et valeurs de la République. La charte des droits et devoirs du citoyen français et le ${h.a('livret', 'livret du citoyen')} reprennent les mêmes valeurs, utiles pour les candidats à la naturalisation. Cette thématique se travaille bien en parallèle de la thématique ${h.a('theme-3', 'droits et devoirs')}, qui partage avec elle toutes les mises en situation.</p>`;
    },
  },
  en: {
    slug: 'republic-principles-values',
    nav: 'Principles and values of the Republic',
    card: 'Motto, symbols and secularism: one of the two heaviest themes of the exam, and its traps.',
    title: 'Principles and values of the French Republic: civic theme 1',
    description: 'Principles and values of the French Republic for the civic exam: motto, symbols, secularism and scenarios, with sample questions and the traps expats fall into.',
    h1: 'Principles and values of the French Republic: theme 1 revision',
    intro: 'Practise on sets from theme 1, marked after each answer, then read the notions and the traps that cost the most points.',
    resume: (h) => `Principles and values of the Republic is the first of the five themes of the French civic exam. It covers the motto "Liberté, Égalité, Fraternité", the symbols of the Republic such as the flag, the anthem, Marianne and the national holiday, the French language, and secularism (laïcité). On the day it carries ${h.quota(1).total} of the ${h.size} questions: ${h.quota(1).notions.symboles} on the motto and symbols, ${h.quota(1).notions.laicite} on secularism and ${h.quota(1).notions.situation} scenarios, half of all scenarios in the paper. Together with rights and duties, it is the heaviest theme. Knowledge questions test precise landmarks; scenarios ask you to apply equality, non-discrimination and secularism to everyday scenes, at a public service counter, at work or when renting a flat. French secularism often differs from what expats know at home, which makes this theme worth extra time. The tool above draws ten-question sets from this theme only, out of the ${h.num(h.count.theme(1))} in our bank, marked after each answer, in English here and in French on the real exam; the small tool shows the official split.`,
    faqs: (h) => [
      { q: 'Which symbols of the Republic should I know?', a: 'The blue, white and red flag, the Marseillaise, the motto "Liberté, Égalité, Fraternité", Marianne, the 14 July national holiday, and customary symbols such as the rooster. French, the language of the Republic written into the Constitution, also comes up. Learn the French names, since that is how they appear on the day.' },
      { q: 'Does French secularism ban religious signs in public?', a: 'No, and this is the most common trap in the theme. Religious neutrality binds the State and its officials, not members of the public. In the street or at a préfecture counter, you may wear a religious sign, within public order and the smooth running of the service. Remember the line between the official, bound to neutrality, and the member of the public, free in their beliefs.' },
      { q: 'How many scenario questions are there in theme 1?', a: `${h.quota(1).notions.situation}, the same as in rights and duties; together they make up the ${h.P.exam.situations} scenarios in the paper. Theme 1 scenarios mostly deal with equality between women and men, discrimination and secularism in daily life. Getting them right weighs more than knowing every date in history.` },
    ],
    body: (h) => {
      const a = ex(h, 'o1-001'), b = ex(h, 'o1-022'), c = ex(h, 'o1-014'), d = ex(h, 'o1-110'), e = ex(h, 'o1-029'), f = ex(h, 's1-003'), g = ex(h, 's1-024');
      return `
<h2>The motto and the symbols</h2>
<p>The ${h.quota(1).notions.symboles} questions on this notion deal with landmarks you see every day without always naming them. Three examples from our bank show the range, from a date to the meaning of a word in the motto:</p>
<ul>
<li>"${a.q}" Answer: ${a.a}. ${a.e}</li>
<li>"${b.q}" Answer: ${b.a}. ${b.e}</li>
<li>"${c.q}" Answer: ${c.a}.</li>
</ul>
<p>The classic trap is mixing up commemorations: 14 July is neither the armistice of the First World War nor the end of the Second. Learn each symbol with its meaning, not just its name.</p>
<h2>Secularism (laïcité)</h2>
<p>French secularism rests on two ideas. First, freedom of conscience: everyone may believe, not believe or change religion freely. Second, State neutrality: the State recognises and funds no religion, and its officials do not show their beliefs while on duty. This may differ from what you know at home: the strict neutrality binds the State, not you.</p>
<ul>
<li>"${d.q}" Answer: ${d.a}. ${d.e}</li>
<li>"${e.q}" Answer: ${e.a}. ${e.e}</li>
</ul>
<p>Wrong answers here often sound sensible: "you need your family's consent", "the State picks an official religion". Any option that makes a belief depend on someone else's permission is wrong.</p>
<h2>Scenario questions in this theme</h2>
<p>They apply these principles to real scenes. Two cases from our bank:</p>
<ul>
<li><strong>${f.q}</strong> Answer: ${f.a}. ${f.e}</li>
<li><strong>${g.q}</strong> Answer: ${g.a}. ${g.e}</li>
</ul>
<p>The reasoning is always the same: who is the public official, who is the member of the public, and which protected ground is at stake (origin, sex, religion, sexual orientation, disability). The ${h.a('mises-en-situation', 'scenario questions')} page sets out a reading method.</p>
<h2>Traps that cost points</h2>
${h.table(['Misconception', 'What the rule says'], [['Secularism bans religious signs everywhere', 'neutrality binds the State and its officials, not the public'], ['Discrimination is fine if a customer asks for it', 'discrimination stays unlawful whoever asks'], ['14 July marks the end of a war', 'it is the national holiday, tied to the Revolution'], ['French is one official language among several', 'it is the language of the Republic, written into the Constitution']], 'Explanations from the Examen Civique Blanc bank, based on the civic training sheets.', ['l', 'l'])}
<h2>Going further</h2>
<p>The ${h.src('fc_fiches', 'civic training sheets')} give a whole chapter to the principles and values of the Republic. The charter of the rights and duties of the French citizen and the ${h.a('livret', 'citizen\'s booklet')} cover the same values, useful for naturalisation applicants. This theme pairs well with ${h.a('theme-3', 'rights and duties')}, which shares every scenario question with it.</p>`;
    },
  },
});
