import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'theme-3',
  group: 'themes',
  order: 72,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "theme": 3}},
  mini: {"kind": "mini:quota", "props": {"t": 3}},
  related: ['theme-1', 'theme-5', 'mises-en-situation', 'qcm', 'resultat', 'examen-blanc'],
  sources: ['fc_fiches', 'referentiel', 'arrete_exam', 'charte', 'fc_csp'],
  fr: {
    slug: 'droits-et-devoirs',
    nav: 'Droits et devoirs',
    card: 'Libertés, obligations, justice et six mises en situation : la thématique qui pèse autant que les principes de la République.',
    title: 'Droits et devoirs du citoyen : réviser la thématique 3',
    description: 'Droits et devoirs pour l’examen civique : libertés, obligations, justice et mises en situation, avec des questions types et la logique des bonnes réponses.',
    h1: 'Droits et devoirs : réviser la thématique 3 de l’examen civique',
    intro: 'Enchaînez des séries de la thématique 3 avec la correction immédiate, puis relisez comment libertés et obligations s’articulent dans les réponses attendues.',
    resume: (h) => `Droits et devoirs est la troisième thématique de l’examen civique. Elle rassemble les droits fondamentaux, comme les libertés d’expression, de religion, de la presse ou le droit au divorce, et les obligations de toute personne qui réside en France : respecter la loi, payer ses impôts, scolariser ses enfants, respecter l’environnement et les forces de l’ordre. Le jour de l’épreuve, elle compte ${h.quota(3).total} questions sur ${h.size} : ${h.quota(3).notions.droits} sur les droits fondamentaux, ${h.quota(3).notions.devoirs} sur les obligations et devoirs et ${h.quota(3).notions.situation} mises en situation. Elle pèse donc autant que les principes et valeurs de la République, et ces deux thématiques réunissent à elles seules plus de la moitié de la note. Son fil directeur tient en une idée : une liberté s’exerce dans les limites fixées par la loi pour protéger les autres. L’outil ci-dessus tire des séries de dix questions de cette thématique, parmi les ${h.num(h.count.theme(3))} de notre banque, corrigées une à une ; le mini-outil détaille la répartition officielle.`,
    faqs: (h) => [
      { q: 'Quelle différence entre un droit fondamental et un devoir dans les questions ?', a: 'Les questions sur les droits demandent ce qu’une liberté permet, par exemple s’exprimer ou changer de religion. Celles sur les devoirs demandent ce que la loi impose à tous : respecter les règles, payer l’impôt, scolariser ses enfants, obéir aux forces de l’ordre. Beaucoup de réponses justes combinent les deux : la liberté existe, dans les limites de la loi.' },
      { q: 'Quels thèmes reviennent dans les mises en situation de droits et devoirs ?', a: `La garde à vue et les droits de la défense, le travail non déclaré, la protection des enfants, le mariage forcé, les droits du consommateur, le respect de l’environnement et du voisinage. Les ${h.quota(3).notions.situation} mises en situation de cette thématique mettent souvent en scène une proposition illégale présentée comme un service ou une tradition.` },
      { q: 'Faut-il connaître le vocabulaire juridique pour cette thématique ?', a: 'Quelques mots reviennent et méritent d’être sus : infraction, contravention, délit, crime, garde à vue, avocat commis d’office, tribunal correctionnel. Les intitulés les emploient sans les définir. Notre banque explique chacun dans le corrigé de la question où il apparaît, avec un renvoi à la fiche officielle correspondante.' },
    ],
    body: (h) => {
      const a = ex(h, 'o3-007'), b = ex(h, 'o3-013'), c = ex(h, 'o3-019'), d = ex(h, 'o3-138'), e = ex(h, 's3-010');
      return `
<h2>Les droits fondamentaux</h2>
<p>Les ${h.quota(3).notions.droits} questions de cette notion vérifient que l’on sait ce que garantissent les grandes libertés. Les leurres présentent souvent une liberté comme absolue, ou au contraire comme soumise à autorisation.</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}. ${a.e}</li>
<li>« ${b.q} » Réponse : ${b.a}. ${b.e}</li>
</ul>
<h2>Les obligations et devoirs</h2>
<p>Avec ${h.quota(3).notions.devoirs} questions, c’est la notion de connaissance la plus tirée de la thématique. Elle couvre le respect de la loi, l’impôt, l’école obligatoire, les règles de vie collective et la distinction entre les infractions.</p>
<ul>
<li>« ${c.q} » Réponse : ${c.a}. ${c.e}</li>
<li>« ${d.q} » Réponse : ${d.a}. ${d.e}</li>
</ul>
${h.table(['Infraction', 'Exemple', 'Sanction ou juridiction'], [['Contravention', 'excès de vitesse, tapage nocturne', 'amende'], ['Délit', 'vol, fraude fiscale', 'tribunal correctionnel'], ['Crime, la plus grave', 'meurtre', 'cour d’assises ou cour criminelle']], 'Repères tirés des corrigés de la banque Examen Civique Blanc et des fiches de la formation civique.', ['l', 'l', 'l'])}
<h2>Les mises en situation de la thématique</h2>
<p>Elles comptent pour plus de la moitié des questions de la thématique. Elles demandent de reconnaître un droit dont on bénéficie ou une règle que l’on doit respecter, souvent dans une situation de vulnérabilité : interpellation, emploi précaire, conflit familial.</p>
<ul><li><strong>${e.q}</strong> Réponse : ${e.a}. ${e.e}</li></ul>
<p>Un réflexe utile : la loi française garantit des droits même à une personne soupçonnée, comme le montre la garde à vue, et protège le salarié même quand il a accepté une situation illégale. Les propositions du type « vous n’avez aucun droit » ou « il faut accepter pour garder son emploi » sont presque toujours fausses. La page ${h.a('mises-en-situation', 'mises en situation')} réunit d’autres cas de cette thématique.</p>
<h2>Les erreurs typiques</h2>
<ol>
<li>Croire qu’une liberté est sans limite : la liberté d’expression ne couvre ni l’injure ni l’incitation à la haine.</li>
<li>Confondre la règle d’un autre pays avec la règle française, par exemple sur le divorce ou le mariage.</li>
<li>Penser qu’un arrangement privé l’emporte sur la loi : un contrat de travail non déclaré reste illégal, même accepté par les deux parties.</li>
<li>Oublier que les obligations s’appliquent à tous, étrangers compris : impôt, scolarisation, respect des forces de l’ordre.</li>
</ol>
<h2>Pour aller plus loin</h2>
<p>Les ${h.src('fc_fiches', 'fiches de la formation civique')} consacrent un chapitre aux droits et devoirs, divisé entre droits fondamentaux et obligations des personnes résidant en France. La thématique dialogue avec ${h.a('theme-1', 'principes et valeurs de la République')}, qui contient l’autre moitié des mises en situation, et avec ${h.a('theme-5', 'vivre dans la société française')}, plus pratique, qui aborde le travail, la santé et l’école sous l’angle des démarches.</p>`;
    },
  },
  en: {
    slug: 'rights-and-duties',
    nav: 'Rights and duties',
    card: 'Freedoms, obligations, justice and six scenarios: the theme that weighs as much as the principles of the Republic.',
    title: 'Rights and duties in France: civic exam theme 3 explained',
    description: 'Rights and duties in France for the civic exam: freedoms, obligations, justice and scenario questions, with sample questions and why the right answers hold.',
    h1: 'Rights and duties in France: theme 3 revision',
    intro: 'Run through theme 3 sets with instant marking, then read how freedoms and obligations fit together in the answers the exam expects.',
    resume: (h) => `Rights and duties is the third theme of the French civic exam. It brings together fundamental rights, such as freedom of expression, religion and the press or the right to divorce, and the obligations of everyone living in France: obeying the law, paying taxes, sending children to school, respecting the environment and the police. On the day it carries ${h.quota(3).total} of the ${h.size} questions: ${h.quota(3).notions.droits} on fundamental rights, ${h.quota(3).notions.devoirs} on obligations and duties and ${h.quota(3).notions.situation} scenarios. It weighs as much as the principles and values of the Republic, and those two themes alone make up more than half the marks. Its guiding idea fits in one line: a freedom is exercised within limits set by law to protect others. For expats, the difficulty is often a rule that differs from home, on divorce, undeclared work or police custody. The tool above draws ten-question sets from this theme, out of the ${h.num(h.count.theme(3))} in our bank, marked one by one; the small tool shows the official split. The real exam is in French only.`,
    faqs: (h) => [
      { q: 'What is the difference between rights and duties questions?', a: 'Rights questions ask what a freedom allows, such as speaking freely or changing religion. Duties questions ask what the law requires of everyone: following the rules, paying tax, schooling children, obeying the police. Many right answers combine both: the freedom exists, within the limits of the law.' },
      { q: 'Which topics come up in rights and duties scenarios?', a: `Police custody and defence rights, undeclared work, child protection, forced marriage, consumer rights, the environment and neighbours. The ${h.quota(3).notions.situation} scenarios in this theme often present something unlawful as a favour or a tradition. Ask what French law says, not what is usual elsewhere.` },
      { q: 'Do these duties apply to foreign residents too?', a: 'Yes. The obligations in this theme apply to everyone living in France, whatever their nationality: obeying the law, paying tax, sending children to school, respecting the police and the environment. The official sheets speak of the duties of people residing in France, not only of citizens, and the exam questions follow that wording.' },
    ],
    body: (h) => {
      const a = ex(h, 'o3-007'), b = ex(h, 'o3-013'), c = ex(h, 'o3-019'), d = ex(h, 'o3-138'), e = ex(h, 's3-010');
      return `
<h2>Fundamental rights</h2>
<p>The ${h.quota(3).notions.droits} questions on this notion check that you know what the main freedoms guarantee. Distractors often present a freedom as absolute, or as needing permission.</p>
<ul>
<li>"${a.q}" Answer: ${a.a}. ${a.e}</li>
<li>"${b.q}" Answer: ${b.a}. ${b.e}</li>
</ul>
<h2>Obligations and duties</h2>
<p>With ${h.quota(3).notions.devoirs} questions, this is the most heavily drawn knowledge notion in the theme. It covers obeying the law, tax, compulsory schooling, rules of community life and the different kinds of offence.</p>
<ul>
<li>"${c.q}" Answer: ${c.a}. ${c.e}</li>
<li>"${d.q}" Answer: ${d.a}. ${d.e}</li>
</ul>
${h.table(['Offence', 'Example', 'Penalty or court'], [['Contravention', 'speeding, night-time noise', 'fine'], ['Délit', 'theft, tax fraud', 'criminal court (tribunal correctionnel)'], ['Crime, the most serious', 'murder', 'assize court or criminal court']], 'Landmarks from the Examen Civique Blanc bank explanations and the civic training sheets.', ['l', 'l', 'l'])}
<h2>Scenario questions in this theme</h2>
<p>They make up more than half of the theme's questions. They ask you to recognise a right you hold or a rule you must follow, often in a vulnerable moment: an arrest, insecure work, a family conflict.</p>
<ul><li><strong>${e.q}</strong> Answer: ${e.a}. ${e.e}</li></ul>
<p>A useful reflex: French law grants rights even to a suspect, as police custody shows, and protects workers even when they agreed to an unlawful arrangement. Options such as "you have no rights" or "accept it to keep your job" are almost always wrong. The ${h.a('mises-en-situation', 'scenario questions')} page gathers more cases from this theme.</p>
<h2>Typical mistakes</h2>
<ol>
<li>Thinking a freedom has no limit: free speech does not cover insults or incitement to hatred.</li>
<li>Applying a rule from another country instead of the French one, for instance on divorce or marriage.</li>
<li>Believing a private arrangement beats the law: undeclared work stays illegal even if both sides agree.</li>
<li>Forgetting that obligations apply to everyone, foreign residents included: tax, schooling, respect for the police.</li>
</ol>
<h2>Going further</h2>
<p>The ${h.src('fc_fiches', 'civic training sheets')} give a chapter to rights and duties, split between fundamental rights and the obligations of people living in France. The theme links with ${h.a('theme-1', 'principles and values of the Republic')}, which holds the other half of the scenarios, and with ${h.a('theme-5', 'living in French society')}, a more practical theme on work, healthcare and school.</p>`;
    },
  },
});
