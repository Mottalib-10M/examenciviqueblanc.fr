import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'theme-2',
  group: 'themes',
  order: 71,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "theme": 2}},
  mini: {"kind": "mini:quota", "props": {"t": 2}},
  related: ['theme-1', 'theme-4', 'questions-cr', 'examen-naturalisation', 'qcm', 'examen-blanc'],
  sources: ['fc_fiches', 'referentiel', 'arrete_exam', 'fc_csp', 'fc_cr'],
  fr: {
    slug: 'institutions-politiques-france',
    nav: 'Institutions politiques',
    card: 'Vote, séparation des pouvoirs, préfet, Union européenne : six questions où le vocabulaire précis fait la différence.',
    title: 'Institutions politiques françaises : thématique 2 et pièges',
    description: 'Institutions politiques françaises pour l’examen civique : démocratie et vote, organisation de la République, Union européenne, questions types et confusions.',
    h1: 'Institutions politiques françaises : réviser la thématique 2',
    intro: 'Testez-vous sur des séries de la thématique 2, puis remettez en ordre qui vote, qui fait la loi, qui l’applique et qui représente l’État.',
    resume: (h) => `Les institutions politiques françaises forment la deuxième thématique de l’examen civique, intitulée système institutionnel et politique. Elle porte sur la démocratie et le vote, sur l’organisation de la République, du président aux communes, et sur les institutions européennes. Le jour de l’épreuve, elle pèse ${h.quota(2).total} questions sur ${h.size} : ${h.quota(2).notions.democratie} sur la démocratie et le vote, ${h.quota(2).notions.organisation} sur l’organisation de la République et ${h.quota(2).notions.europe} sur l’Union européenne. Elle ne contient aucune mise en situation : toutes ses questions sont des questions de connaissance, dont les intitulés figurent dans les listes officielles. Le vocabulaire y est déterminant, car les propositions fausses mélangent volontiers des rôles proches, comme député et sénateur, préfet et maire, Premier ministre et président de la République. L’outil ci-dessus tire des séries de dix questions de cette thématique, parmi les ${h.num(h.count.theme(2))} de notre banque, et corrige chaque réponse ; le mini-outil rappelle la répartition par notion fixée par l’arrêté du 10 octobre 2025.`,
    faqs: (h) => [
      { q: 'Pourquoi la thématique institutions ne compte-t-elle que six questions ?', a: `La répartition est fixée par l’article 3 de l’arrêté du 10 octobre 2025 : ${h.quota(2).total} questions, toutes de connaissance. C’est peu, mais chacune vaut un point comme les autres, et la liste officielle de cette thématique est longue. Mieux vaut comprendre la logique d’ensemble, qui fait quoi, que tenter d’apprendre chaque intitulé par cœur.` },
      { q: 'Faut-il connaître le nom des responsables politiques actuels ?', a: 'Les questions portent sur les fonctions et les règles, pas sur les personnes en poste : qui nomme le Premier ministre, qui vote la loi, qui représente l’État dans le département. Retenir les rôles est plus utile, et plus durable, que retenir des noms qui changent au fil des élections.' },
      { q: 'Quelle question européenne peut tomber à l’examen ?', a: `Une seule question européenne figure dans l’épreuve, tirée d’une liste qui couvre la journée de l’Europe, la monnaie unique, les conditions de vote aux élections européennes, les États membres et les grandes dates de la construction européenne. Une révision rapide de ces repères suffit pour ce point unique sur ${h.size}.` },
    ],
    body: (h) => {
      const a = ex(h, 'o2-063'), b = ex(h, 'o2-038'), c = ex(h, 'o2-073'), d = ex(h, 'o2-053'), e = ex(h, 'o2-078'), f = ex(h, 'o2-083');
      return `
<h2>Qui fait quoi : la séparation des pouvoirs</h2>
<p>La clé de la thématique est une grille simple : un pouvoir vote la loi, un autre l’applique, un troisième juge. Toutes les institutions se rangent dans l’une de ces cases.</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}. ${a.e}</li>
<li>« ${b.q} » Réponse : ${b.a}. ${b.e}</li>
</ul>
${h.table(['Pouvoir', 'Qui l’exerce', 'Ce qu’il fait'], [['Législatif', 'le Parlement : Assemblée nationale et Sénat', 'vote les lois'], ['Exécutif', 'le président de la République et le Gouvernement', 'applique les lois'], ['Judiciaire', 'les juges', 'contrôlent leur application']], 'D’après les corrigés de la banque Examen Civique Blanc et les fiches de la formation civique.', ['l', 'l', 'l'])}
<h2>L’organisation de la République sur le territoire</h2>
<p>Les ${h.quota(2).notions.organisation} questions d’organisation descendent souvent du sommet de l’État vers le territoire : président, Gouvernement, puis préfet, région, département et commune.</p>
<ul><li>« ${c.q} » Réponse : ${c.a}. ${c.e}</li></ul>
<p>Le piège consiste à prêter au préfet des fonctions qui ne sont pas les siennes, ou à le confondre avec le maire. Le préfet est nommé et représente l’État ; le maire est élu par le conseil municipal et dirige la commune. Pour un étranger, la préfecture est aussi le lieu des démarches de séjour, ce qui aide à retenir son rôle.</p>
<h2>Démocratie et vote</h2>
<p>Avec ${h.quota(2).notions.democratie} questions, c’est la notion la plus tirée de la thématique. Elle porte sur les élections, le suffrage, les conditions pour voter et l’État de droit.</p>
<ul>
<li>« ${d.q} » Réponse : ${d.a}. ${d.e}</li>
<li>« ${e.q} » Réponse : ${e.a}. ${e.e}</li>
</ul>
<p>Retenez la différence entre les élections : législatives pour les députés, présidentielle pour le président de la République, municipales pour les conseillers municipaux, qui élisent le maire, européennes pour les députés européens. Les intitulés aiment interroger sur qui est élu, par qui, et à quelle échéance.</p>
<h2>L’Union européenne en une question</h2>
<p>Un seul point se joue sur l’Europe, mais il se gagne facilement avec quelques repères : la monnaie unique, les États membres, le Parlement européen, la journée de l’Europe.</p>
<ul><li>« ${f.q} » Réponse : ${f.a}.</li></ul>
<h2>Les confusions les plus fréquentes</h2>
<ol>
<li>Député et sénateur : les deux siègent au Parlement, l’un à l’Assemblée nationale, l’autre au Sénat ; seuls les députés sont élus aux législatives.</li>
<li>Premier ministre et président : le président nomme le Premier ministre, qui dirige le Gouvernement.</li>
<li>Préfet et maire : l’un est nommé par l’État, l’autre élu par le conseil municipal.</li>
<li>Conseillers municipaux et maire : aux municipales, les électeurs élisent les conseillers, qui élisent ensuite le maire.</li>
</ol>
<p>Les ${h.src('fc_fiches', 'fiches de la formation civique')} détaillent chaque institution. Pour les candidats à la naturalisation, cette thématique prend un sens concret : une fois Français, ils voteront à ces élections. La page ${h.a('examen-naturalisation', 'examen civique de la naturalisation')} revient sur cette dimension, et la thématique ${h.a('theme-4', 'histoire, géographie et culture')} éclaire l’origine de plusieurs institutions.</p>`;
    },
  },
  en: {
    slug: 'french-institutions',
    nav: 'French institutions',
    card: 'Voting, separation of powers, the préfet, the European Union: six questions where precise vocabulary decides.',
    title: 'Institutions of the French Republic: civic exam theme 2',
    description: 'Institutions of the French Republic for the civic exam: democracy and voting, how the State is organised, the European Union, sample questions and mix-ups.',
    h1: 'Institutions of the French Republic: theme 2 revision',
    intro: 'Test yourself on theme 2 sets, then sort out who votes, who makes the law, who applies it and who represents the State.',
    resume: (h) => `The institutions of the French Republic make up the second theme of the civic exam, officially called the institutional and political system. It covers democracy and voting, how the Republic is organised from the President down to the communes, and the European institutions. On the day it carries ${h.quota(2).total} of the ${h.size} questions: ${h.quota(2).notions.democratie} on democracy and voting, ${h.quota(2).notions.organisation} on how the Republic is organised and ${h.quota(2).notions.europe} on the European Union. It has no scenario questions: every question is a knowledge question whose stem appears on the official lists. Vocabulary matters a great deal, because wrong options mix up similar roles such as député and sénateur, préfet and maire, or Prime Minister and President. Expats used to a parliamentary or federal system elsewhere should pay attention to the French split between President and Prime Minister. The tool above draws ten-question sets from this theme, out of the ${h.num(h.count.theme(2))} in our bank, and marks each answer; the small tool shows the split by notion set by the decree of 10 October 2025.`,
    faqs: (h) => [
      { q: 'Why does the institutions theme have only six questions?', a: `The split is set by Article 3 of the decree of 10 October 2025: ${h.quota(2).total} questions, all on knowledge. That is few, but each is worth a point like any other, and the official list for this theme is long. Understanding the overall logic of who does what works better than memorising every stem.` },
      { q: 'Do I need to know the names of current politicians?', a: 'The questions deal with offices and rules, not the people in post: who appoints the Prime Minister, who votes laws, who represents the State in a département. Learning roles is more useful and lasts longer than learning names that change with each election.' },
      { q: 'Can foreign residents vote in France?', a: 'The exam asks about the conditions for voting. Our bank explains that the right to vote belongs to French citizens aged 18 and over who are registered on the electoral rolls, while citizens of another EU country living in France can vote in European elections. Read the explanation under each voting question in the tool to see the exact rule.' },
    ],
    body: (h) => {
      const a = ex(h, 'o2-063'), b = ex(h, 'o2-038'), c = ex(h, 'o2-073'), d = ex(h, 'o2-053'), e = ex(h, 'o2-078'), f = ex(h, 'o2-083');
      return `
<h2>Who does what: the separation of powers</h2>
<p>The key to this theme is a simple grid: one power votes the law, another applies it, a third judges. Every institution fits into one of these boxes.</p>
<ul>
<li>"${a.q}" Answer: ${a.a}. ${a.e}</li>
<li>"${b.q}" Answer: ${b.a}. ${b.e}</li>
</ul>
${h.table(['Power', 'Who holds it', 'What it does'], [['Legislative', 'Parliament: National Assembly and Senate', 'votes laws'], ['Executive', 'the President of the Republic and the Government', 'applies laws'], ['Judicial', 'judges', 'oversee how laws are applied']], 'Based on the Examen Civique Blanc bank explanations and the civic training sheets.', ['l', 'l', 'l'])}
<h2>How the Republic is organised across the country</h2>
<p>The ${h.quota(2).notions.organisation} organisation questions usually run from the top of the State down to local level: President, Government, then préfet, region, département and commune.</p>
<ul><li>"${c.q}" Answer: ${c.a}. ${c.e}</li></ul>
<p>The trap is to give the préfet duties that are not theirs, or to confuse the préfet with the mayor. The préfet is appointed and represents the State; the mayor is elected by the municipal council and runs the commune. For a foreign resident, the préfecture is also where residence applications are handled, which helps you remember its role.</p>
<h2>Democracy and voting</h2>
<p>With ${h.quota(2).notions.democratie} questions, this is the most heavily drawn notion in the theme. It covers elections, suffrage, voting conditions and the rule of law.</p>
<ul>
<li>"${d.q}" Answer: ${d.a}. ${d.e}</li>
<li>"${e.q}" Answer: ${e.a}. ${e.e}</li>
</ul>
<p>Keep the elections apart: legislative elections for députés, the presidential election for the President, municipal elections for local councillors, who then elect the mayor, European elections for members of the European Parliament. The stems like to ask who is elected, by whom and how often.</p>
<h2>The European Union in one question</h2>
<p>Only one point is at stake on Europe, and a few landmarks win it: the single currency, the member states, the European Parliament, Europe Day.</p>
<ul><li>"${f.q}" Answer: ${f.a}.</li></ul>
<h2>The most common mix-ups</h2>
<ol>
<li>Député and sénateur: both sit in Parliament, one in the National Assembly, the other in the Senate; only députés are chosen in legislative elections.</li>
<li>Prime Minister and President: the President appoints the Prime Minister, who leads the Government.</li>
<li>Préfet and maire: one is appointed by the State, the other elected by the municipal council.</li>
<li>Councillors and mayor: in municipal elections voters elect the councillors, who then elect the mayor.</li>
</ol>
<p>The ${h.src('fc_fiches', 'civic training sheets')} describe each institution. For naturalisation applicants this theme becomes concrete, since they will vote in these elections once French; the ${h.a('examen-naturalisation', 'naturalisation civic exam')} page comes back to this, and the ${h.a('theme-4', 'history, geography and culture')} theme explains where several institutions come from.</p>`;
    },
  },
});
