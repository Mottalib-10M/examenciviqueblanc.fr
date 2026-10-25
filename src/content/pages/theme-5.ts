import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Une question de la banque citée dans le texte : intitulé, bonne réponse, corrigé. */
const ex = (h: Helpers, id: string) => { const x = h.q(id)!; const t = x[h.lang]; return { q: t.q, a: t.options[x.answer], e: t.explain }; };

export default definePage({
  id: 'theme-5',
  group: 'themes',
  order: 74,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "practice", "theme": 5}},
  mini: {"kind": "mini:quota", "props": {"t": 5}},
  related: ['theme-3', 'theme-4', 'examen-csp', 'qcm', 'exemple', 'examen-blanc'],
  sources: ['fc_fiches', 'referentiel', 'arrete_exam', 'fc_csp', 'fc_cr'],
  fr: {
    slug: 'vivre-dans-la-societe-francaise',
    nav: 'Vivre dans la société française',
    card: 'Logement, santé, travail, école : quatre questions très concrètes, une par notion, à ne pas laisser filer.',
    title: 'Vivre dans la société française : thématique 5, la pratique',
    description: 'Vivre dans la société française pour l’examen civique : logement, état civil, santé, travail, autorité parentale et école, avec des questions types corrigées.',
    h1: 'Vivre dans la société française : réviser la thématique 5',
    intro: 'Faites des séries de la thématique 5, la plus concrète, puis relisez les démarches et les règles de vie quotidienne qu’elle interroge.',
    resume: (h) => `Vivre dans la société française est la cinquième et dernière thématique de l’examen civique. C’est la plus concrète : elle porte sur les démarches et les règles de la vie quotidienne, réparties en quatre notions, s’installer et résider en France, accéder aux soins, travailler, et l’autorité parentale avec l’école. Le jour de l’épreuve, elle ne compte que ${h.quota(5).total} questions sur ${h.size}, une par notion : ${h.quota(5).notions.installer} sur l’installation, ${h.quota(5).notions.soins} sur les soins, ${h.quota(5).notions.travail} sur le travail et ${h.quota(5).notions.ecole} sur l’école et l’autorité parentale. Elle ne contient pas de mise en situation. Pour une personne déjà installée, beaucoup de réponses relèvent de l’expérience : numéros d’urgence, inscription à France Travail, bail écrit, déclaration de naissance. Les erreurs viennent surtout des délais et des numéros, appris de façon approximative. L’outil ci-dessus tire des séries de dix questions de cette thématique, parmi les ${h.num(h.count.theme(5))} de notre banque, et corrige chaque réponse avec la règle et la fiche officielle ; le mini-outil rappelle la répartition.`,
    faqs: (h) => [
      { q: 'Quels numéros d’urgence faut-il connaître pour l’examen civique ?', a: `${ex(h, 'o5-078').e} Ces numéros reviennent dans la notion accès aux soins. Les leurres les intervertissent : apprenez chacun avec le service qu’il joint, pas en liste.` },
      { q: 'Pourquoi la thématique vie en société pèse-t-elle si peu ?', a: `La répartition de l’arrêté du 10 octobre 2025 lui attribue ${h.quota(5).total} questions, une par notion. Cela reste ${h.quota(5).total} points sur les ${h.size - h.need} erreurs permises au total : perdre toute la thématique consommerait la moitié de la marge. Comme ses réponses sont concrètes et souvent connues, c’est aussi la plus facile à sécuriser.` },
      { q: 'Les questions sur l’école concernent-elles les parents seulement ?', a: 'Elles s’adressent à tous, parents ou non. Elles portent sur l’instruction obligatoire, l’autorité parentale exercée par les deux parents, la place des parents d’élèves, le respect dû aux enseignants et la scolarisation des enfants en situation de handicap. Ce sont des principes d’organisation de la société, pas seulement des règles familiales.' },
    ],
    body: (h) => {
      const a = ex(h, 'o5-082'), b = ex(h, 'o5-196'), c = ex(h, 'o5-078'), d = ex(h, 'o5-086'), e = ex(h, 'o5-192'), f = ex(h, 'o5-102');
      return `
<h2>S’installer et résider</h2>
<p>La notion couvre l’état civil, le logement, les démarches administratives et la vie de quartier. Les questions vérifient que l’on connaît les obligations de base d’un résident.</p>
<ul>
<li>« ${a.q} » Réponse : ${a.a}. ${a.e}</li>
<li>« ${b.q} » Réponse : ${b.a}. ${b.e}</li>
</ul>
<h2>Accéder aux soins</h2>
<p>Numéros d’urgence, prise en charge des soins, vaccinations, secret médical : la notion mêle santé publique et droits du patient.</p>
<ul><li>« ${c.q} » Réponse : ${c.a}. ${c.e}</li></ul>
<p>Retenez aussi que l’accès aux soins repose sur la résidence stable et régulière, et que le secret médical protège les informations du patient, y compris vis-à-vis de sa famille.</p>
<h2>Travailler</h2>
<p>La notion porte sur la recherche d’emploi, le contrat et le bulletin de paie, l’égalité professionnelle, le droit de grève et l’interdiction du travail non déclaré.</p>
<ul><li>« ${d.q} » Réponse : ${d.a}. ${d.e}</li></ul>
<p>Le piège récurrent présente un arrangement informel comme acceptable : « payé en espèces », « sans contrat pour commencer ». La réponse juste rappelle toujours l’obligation de déclaration et les droits sociaux qui en dépendent.</p>
<h2>Autorité parentale et école</h2>
<ul>
<li>« ${e.q} » Réponse : ${e.a}. ${e.e}</li>
<li>« ${f.q} » Réponse : ${f.a}.</li>
</ul>
<p>Deux idées dominent : les deux parents exercent ensemble l’autorité parentale, et l’instruction est obligatoire pour tous les enfants, filles comme garçons, sans exception religieuse.</p>
<h2>Les repères à mémoriser</h2>
${h.table(['Notion', 'Repère fréquent', 'Piège habituel'], [['S’installer', 'déclaration de naissance en mairie dans un délai court', 'confondre mairie et préfecture'], ['Soins', `le ${c.a} pour le SAMU`, 'intervertir les numéros d’urgence'], ['Travail', 'inscription à France Travail pour chercher un emploi', 'croire le travail non déclaré toléré'], ['École', 'instruction obligatoire, autorité parentale partagée', 'penser qu’un divorce retire l’autorité à un parent']], 'Repères tirés des corrigés de la banque Examen Civique Blanc.', ['l', 'l', 'l'])}
<h2>Comment travailler cette thématique</h2>
<p>Parce qu’elle ne compte qu’une question par notion, inutile d’y passer autant de temps qu’aux principes ou aux droits et devoirs. Deux ou trois séries de l’outil, une relecture des erreurs et des ${h.src('fc_fiches', 'fiches de la formation civique')} correspondantes suffisent souvent. Gardez-la plutôt pour les jours où le temps manque : une série de dix questions se fait en quelques minutes.</p>
<p>Elle prolonge la thématique ${h.a('theme-3', 'droits et devoirs')}, qui traite des mêmes sujets sous l’angle des libertés et des obligations, et rejoint les préoccupations des candidats à une ${h.a('examen-csp', 'première carte pluriannuelle')}, pour qui ces démarches sont encore récentes.</p>`;
    },
  },
  en: {
    slug: 'living-in-french-society',
    nav: 'Living in French society',
    card: 'Housing, healthcare, work, school: four very practical questions, one per notion, not to be thrown away.',
    title: 'Living in French society: civic exam theme 5 in practice',
    description: 'Living in French society for the civic exam: housing, civil status, healthcare, work, parental authority and school, with sample questions fully explained.',
    h1: 'Living in French society: theme 5 revision',
    intro: 'Work through sets from theme 5, the most practical, then review the everyday procedures and rules it asks about.',
    resume: (h) => `Living in French society is the fifth and last theme of the French civic exam. It is the most practical one: it deals with everyday procedures and rules, split into four notions, settling and living in France, access to healthcare, working, and parental authority with school. On the day it carries only ${h.quota(5).total} of the ${h.size} questions, one per notion: ${h.quota(5).notions.installer} on settling in, ${h.quota(5).notions.soins} on healthcare, ${h.quota(5).notions.travail} on work and ${h.quota(5).notions.ecole} on school and parental authority. It has no scenario questions. For someone already living in France, many answers come from experience: emergency numbers, registering with France Travail, a written lease, declaring a birth. Mistakes mostly come from deadlines and numbers learnt roughly. Expats who arrived recently may not yet have met every procedure, which is where this theme helps beyond the exam. The tool above draws ten-question sets from this theme, out of the ${h.num(h.count.theme(5))} in our bank, and marks each answer with the rule and the official sheet; the small tool shows the split. The real exam is in French only.`,
    faqs: (h) => [
      { q: 'Which emergency numbers should I know for the civic exam?', a: `${ex(h, 'o5-078').e} These numbers come up under access to healthcare. Distractors swap them around, so learn each number with the service it reaches rather than as a list.` },
      { q: 'Why does this theme carry so few questions?', a: `The split in the decree of 10 October 2025 gives it ${h.quota(5).total} questions, one per notion. That is still ${h.quota(5).total} points against the ${h.size - h.need} mistakes allowed overall: losing the whole theme would use up half your margin. Since its answers are practical and often familiar, it is also the easiest to secure.` },
      { q: 'Do the school questions only concern parents?', a: 'They are for everyone, parents or not. They cover compulsory schooling, parental authority shared by both parents, the role of parents\' representatives, the respect due to teachers and schooling for children with disabilities. These are principles of how society is organised, not just family rules.' },
    ],
    body: (h) => {
      const a = ex(h, 'o5-082'), b = ex(h, 'o5-196'), c = ex(h, 'o5-078'), d = ex(h, 'o5-086'), e = ex(h, 'o5-192'), f = ex(h, 'o5-102');
      return `
<h2>Settling and living in France</h2>
<p>This notion covers civil status, housing, paperwork and neighbourhood life. The questions check that you know a resident's basic obligations.</p>
<ul>
<li>"${a.q}" Answer: ${a.a}. ${a.e}</li>
<li>"${b.q}" Answer: ${b.a}. ${b.e}</li>
</ul>
<h2>Access to healthcare</h2>
<p>Emergency numbers, healthcare cover, vaccinations, medical confidentiality: the notion mixes public health and patients' rights.</p>
<ul><li>"${c.q}" Answer: ${c.a}. ${c.e}</li></ul>
<p>Remember too that access to care rests on stable, legal residence, and that medical confidentiality protects the patient's information, including from their family.</p>
<h2>Working</h2>
<p>This notion covers job hunting, contracts and payslips, equality at work, the right to strike and the ban on undeclared work.</p>
<ul><li>"${d.q}" Answer: ${d.a}. ${d.e}</li></ul>
<p>The recurring trap presents an informal arrangement as acceptable: "paid in cash", "no contract to start with". The right answer always comes back to the duty to declare work and the social rights that depend on it.</p>
<h2>Parental authority and school</h2>
<ul>
<li>"${e.q}" Answer: ${e.a}. ${e.e}</li>
<li>"${f.q}" Answer: ${f.a}.</li>
</ul>
<p>Two ideas dominate: both parents share parental authority, and schooling is compulsory for every child, girls and boys alike, with no religious exception.</p>
<h2>Landmarks to memorise</h2>
${h.table(['Notion', 'Frequent landmark', 'Usual trap'], [['Settling in', 'declaring a birth at the town hall within a short deadline', 'mixing up town hall and préfecture'], ['Healthcare', `${c.a} for the SAMU`, 'swapping the emergency numbers'], ['Work', 'registering with France Travail to look for a job', 'thinking undeclared work is tolerated'], ['School', 'compulsory schooling, shared parental authority', 'thinking divorce removes one parent\'s authority']], 'Landmarks from the Examen Civique Blanc bank explanations.', ['l', 'l', 'l'])}
<h2>How to work on this theme</h2>
<p>With one question per notion, it does not need as much time as principles or rights and duties. Two or three sets in the tool, a look at your mistakes and the matching ${h.src('fc_fiches', 'civic training sheets')} are often enough. Keep it for days when time is short: a ten-question set takes a few minutes.</p>
<p>It extends ${h.a('theme-3', 'rights and duties')}, which covers the same subjects from the angle of freedoms and obligations, and matches the concerns of people applying for a ${h.a('examen-csp', 'first multi-year permit')}, for whom these procedures are still recent.</p>`;
    },
  },
});
