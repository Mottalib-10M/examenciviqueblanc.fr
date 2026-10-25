import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mariage',
  group: 'nationalite',
  order: 116,
  tool: { kind: 'date', props: { route: 'mariage', routes: 'mariage' } },
  mini: { kind: 'mini:marriage' },
  related: ['naturalisation', 'carte-resident', 'niveau-francais', 'demande-nationalite', 'dispenses'],
  sources: ['sp_mariage', 'sp_langue', 'sp_timbre', 'sp_exam_nat', 'sp_cr'],
  fr: {
    slug: 'nationalite-francaise-par-mariage',
    nav: 'Nationalité par mariage',
    card: 'La déclaration du conjoint de Français : durée de mariage, résidence, communauté de vie, niveau B2 et absence d’examen civique.',
    title: 'Nationalité française par mariage : délai, B2 et démarche',
    description: 'Nationalité française par mariage : déclaration après 4 ans de mariage (5 ans sans 3 ans de résidence en France), vie commune, niveau B2, pas d’examen civique.',
    h1: 'Nationalité française par mariage : quand déclarer et à quelles conditions',
    intro: 'Indiquez la date de votre mariage et votre résidence en France depuis : l’outil donne la date à partir de laquelle vous pouvez souscrire la déclaration.',
    resume: (h) => `La nationalité française par mariage s’obtient par déclaration, une procédure distincte de la naturalisation par décret. L’étranger marié à un Français peut la souscrire après ${h.P.marriage.years} ans de mariage. Ce délai passe à ${h.P.marriage.yearsIfNotResident} ans s’il ne peut pas justifier d’au moins ${h.P.marriage.residenceSinceMarriageYears} ans de résidence ininterrompue et régulière en France depuis le mariage. La communauté de vie, affective et matérielle, ne doit pas avoir cessé depuis le mariage, et le conjoint doit avoir conservé la nationalité française pendant toute cette période. Le déclarant prouve un niveau de français ${h.P.language.marriage}, le même que pour la naturalisation, mais il n’a pas à passer l’examen civique, qui ne concerne pas les déclarations de nationalité. Le timbre fiscal est de ${h.eur(h.P.marriage.fee)}. Les deux époux sont convoqués à un entretien qui vérifie la réalité de la vie commune et l’assimilation. L’outil ci-dessus calcule, à partir de la date du mariage et de votre résidence en France, la première date à laquelle la déclaration peut être souscrite.`,
    faqs: (h) => [
      { q: 'Faut-il vivre en France pour devenir français par mariage ?', a: `Non, mais cela change la durée. Avec au moins ${h.P.marriage.residenceSinceMarriageYears} ans de résidence ininterrompue et régulière en France depuis le mariage, la déclaration est possible après ${h.P.marriage.years} ans de mariage. Sans cette résidence, il faut ${h.P.marriage.yearsIfNotResident} ans de mariage. Le couple qui vit à l’étranger dépose alors son dossier auprès d’un consulat français.` },
      { q: 'Le conjoint de Français doit-il passer l’examen civique ?', a: `Non. L’examen civique est exigé pour la naturalisation et pour certains titres de séjour, pas pour les déclarations de nationalité, dont la déclaration par mariage. En revanche, le niveau de français ${h.P.language.marriage} est exigé et se prouve par un diplôme ou une attestation de test. L’entretien des deux époux vérifie aussi l’assimilation à la société française.` },
      { q: 'À quelle date devient-on français par déclaration de mariage ?', a: 'Selon service-public.gouv.fr, la nationalité prend effet à la date de souscription de la déclaration, pas à la date de son enregistrement. Le ministère dispose ensuite d’un délai pour refuser l’enregistrement, et le ministre chargé des naturalisations peut s’opposer à l’acquisition pour indignité ou défaut d’assimilation autre que linguistique.' },
      { q: 'Mieux vaut-il demander la carte de résident ou la nationalité ?', a: `Les deux ne s’excluent pas. La carte de résident du conjoint de Français est possible après ${h.P.residentCard.spouseYears} ans de mariage, avec un niveau ${h.P.language.cr} et l’examen civique ; elle sécurise le séjour pour ${h.P.residentCard.validityYears} ans. La déclaration de nationalité arrive plus tard, après ${h.P.marriage.years} ans, sans examen mais avec le niveau ${h.P.language.marriage}. Beaucoup de couples enchaînent les deux.` },
    ],
    body: (h) => `
<h2>Les conditions en un coup d’œil</h2>
${h.table(['Condition', 'Exigence'], [['Durée de mariage', `${h.P.marriage.years} ans`], [`Sans ${h.P.marriage.residenceSinceMarriageYears} ans de résidence en France depuis le mariage`, `${h.P.marriage.yearsIfNotResident} ans`], ['Communauté de vie', 'affective et matérielle, continue depuis le mariage'], ['Conjoint', 'français pendant toute la durée du mariage'], ['Niveau de français', h.P.language.marriage], ['Examen civique', 'non exigé'], ['Timbre fiscal', h.eur(h.P.marriage.fee)]], `Fiche service-public.gouv.fr sur la déclaration par mariage, relue le ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<h2>Comment l’outil compte</h2>
<p>Le calcul part de la date du mariage et ajoute ${h.P.marriage.years} ans si vous répondez « oui » à la question de la résidence en France depuis le mariage, ${h.P.marriage.yearsIfNotResident} ans sinon. La résidence prise en compte doit être ininterrompue et régulière, c’est-à-dire couverte par un titre de séjour valable quand il en faut un. Un couple qui a vécu à l’étranger puis s’est installé en France doit donc vérifier, date par date, s’il atteint ${h.P.marriage.residenceSinceMarriageYears} ans de résidence continue depuis le mariage ; à défaut, c’est la durée longue qui s’applique.</p>
<h2>La démarche, étape par étape</h2>
<ol>
<li><strong>Réunir les justificatifs</strong> : actes d’état civil, preuve de la nationalité française du conjoint, preuves de la vie commune depuis le mariage, justificatif de français ${h.P.language.marriage} et timbre fiscal.</li>
<li><strong>Déposer le dossier</strong> : en France, selon la plateforme compétente, au guichet ou par courrier ; à l’étranger, auprès d’un consulat français.</li>
<li><strong>L’entretien des deux époux</strong> : il vérifie la réalité de la communauté de vie et l’assimilation à la société française. Le récépissé est remis à la fin de cet entretien.</li>
<li><strong>L’enregistrement</strong> : le ministère dispose d’un délai, qui court à partir du récépissé, pour refuser d’enregistrer la déclaration ; ce délai est plus long si une procédure d’opposition est engagée.</li>
</ol>
<p>Contrairement à la naturalisation, cette procédure n’a pas d’examen civique. Elle n’est pas pour autant une formalité : l’entretien commun et la vérification de la vie de couple en sont le cœur.</p>
<h2>Préparer l’entretien commun</h2>
<p>L’entretien réunit les deux époux. Il porte sur la réalité de la vie commune et sur l’assimilation du déclarant. Rassemblez à l’avance les traces de votre vie de couple depuis le mariage : bail ou titre de propriété au nom des deux, comptes ou factures communs, avis d’impôt, documents concernant les enfants. Côté langue, le ${h.a('niveau-francais', 'niveau de français')} ${h.P.language.marriage} se prouve par un diplôme ou un test récent, mais il se voit aussi pendant l’échange : entraînez-vous à parler de votre parcours et de votre vie en France.</p>
<h2>Les motifs de refus et d’opposition</h2>
<p>La déclaration peut être refusée si une condition manque : durée, communauté de vie, nationalité du conjoint, niveau de langue. Le ministre chargé des naturalisations peut en outre s’opposer à l’acquisition de la nationalité pour indignité ou pour défaut d’assimilation autre que linguistique. La décision d’opposition peut être contestée devant le Conseil d’État dans le délai indiqué par la fiche officielle.</p>
<h2>Déclaration par mariage ou naturalisation ?</h2>
<p>Le conjoint de Français qui réside en France depuis longtemps peut parfois remplir aussi les conditions de la ${h.a('naturalisation', 'naturalisation')}. La déclaration a deux avantages : pas d’examen civique, et une date d’effet fixée à la souscription. La naturalisation suppose l’examen, mais ne dépend pas de la durée du mariage ni de la vie commune. Pour sécuriser le séjour en attendant, la ${h.a('carte-resident', 'carte de résident')} du conjoint de Français est accessible plus tôt. La fiche ${h.src('sp_mariage', 'service-public.gouv.fr sur la nationalité par mariage')} détaille les pièces à fournir.</p>`,
  },
  en: {
    slug: 'nationality-through-marriage',
    nav: 'Nationality through marriage',
    card: 'The declaration for spouses of French citizens: years of marriage, residence, life together, level B2 and no civic exam.',
    title: 'Nationality through marriage in France: timing and French B2',
    description: 'Nationality through marriage in France: declaration after 4 years (5 without 3 years in France), a shared life since the wedding, B2 French and no civic exam.',
    h1: 'French nationality through marriage: when and how to declare',
    intro: 'Enter your wedding date and whether you have lived in France since: the tool gives the first date you can make the declaration.',
    resume: (h) => `French nationality through marriage is acquired by declaration, a separate procedure from naturalisation by decree. A foreign national married to a French citizen can make the declaration after ${h.P.marriage.years} years of marriage. That becomes ${h.P.marriage.yearsIfNotResident} years if you cannot show at least ${h.P.marriage.residenceSinceMarriageYears} years of continuous, lawful residence in France since the wedding. Your shared life, emotional and material, must not have stopped since the marriage, and your spouse must have kept French nationality throughout. You prove French at level ${h.P.language.marriage}, the same as for naturalisation, but you do not sit the civic exam, which does not apply to nationality declarations. The tax stamp is ${h.eur(h.P.marriage.fee)}. Both spouses are called to an interview that checks the reality of your life together and your assimilation. For couples living abroad, the file goes to a French consulate. The tool above takes your wedding date and your residence in France and works out the first date on which the declaration can be made.`,
    faqs: (h) => [
      { q: 'We live abroad. Can I still become French through marriage?', a: `Yes, on the longer timetable. Without ${h.P.marriage.residenceSinceMarriageYears} years of continuous, lawful residence in France since the wedding, the declaration needs ${h.P.marriage.yearsIfNotResident} years of marriage instead of ${h.P.marriage.years}. The file is lodged with a French consulate, and you and your spouse are interviewed together, as you would be in France.` },
      { q: 'From what date am I French after the declaration?', a: 'service-public.gouv.fr states that nationality takes effect on the date you make the declaration, not the date it is registered. The ministry then has a set period to refuse registration, and the minister responsible for naturalisation may oppose the acquisition on grounds of unworthiness or lack of assimilation other than linguistic.' },
      { q: 'Should I get a resident card first?', a: `Often, yes. A spouse of a French citizen can apply for a resident card after ${h.P.residentCard.spouseYears} years of marriage, with French at ${h.P.language.cr} and the civic exam, and it secures your stay for ${h.P.residentCard.validityYears} years. The nationality declaration comes later, after ${h.P.marriage.years} years, with no exam but at level ${h.P.language.marriage}. Many couples do one after the other.` },
    ],
    body: (h) => `
<h2>Requirements at a glance</h2>
${h.table(['Requirement', 'What is asked'], [['Length of marriage', `${h.P.marriage.years} years`], [`Without ${h.P.marriage.residenceSinceMarriageYears} years living in France since the wedding`, `${h.P.marriage.yearsIfNotResident} years`], ['Life together', 'emotional and material, unbroken since the wedding'], ['Spouse', 'French throughout the marriage'], ['French level', h.P.language.marriage], ['Civic exam', 'not required'], ['Tax stamp', h.eur(h.P.marriage.fee)]], `service-public.gouv.fr page on the marriage declaration, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<h2>How the tool counts</h2>
<p>It starts from your wedding date and adds ${h.P.marriage.years} years if you answer yes to the question on residence in France since the marriage, ${h.P.marriage.yearsIfNotResident} years if not. The residence must be continuous and lawful, so covered by a valid permit when one is needed. International couples who lived abroad before settling in France should check date by date whether they reach ${h.P.marriage.residenceSinceMarriageYears} years of continuous residence since the wedding; otherwise the longer period applies.</p>
<h2>The procedure</h2>
<ol>
<li><strong>Gather your documents</strong>: civil status certificates, proof of your spouse’s French nationality, proof of life together since the wedding, proof of French at ${h.P.language.marriage} and the tax stamp.</li>
<li><strong>Lodge the file</strong>: in France, at the counter or by post depending on the competent office; abroad, at a French consulate.</li>
<li><strong>Joint interview</strong>: it checks that your life together is real and that you are assimilated into French society. You receive the receipt at the end of it.</li>
<li><strong>Registration</strong>: the ministry has a set period from the receipt to refuse registration, longer if opposition proceedings are opened.</li>
</ol>
<p>Unlike naturalisation, there is no civic exam here. That does not make it a formality: the joint interview and the check on your married life are at its heart.</p>
<h2>Preparing for the joint interview</h2>
<p>Both spouses attend. The interview looks at whether your life together is real and at the declarant’s assimilation. Gather proof of your married life since the wedding beforehand: a lease or deeds in both names, joint accounts or bills, tax notices, papers about your children. For the language side, ${h.a('niveau-francais', 'French at level')} ${h.P.language.marriage} is proved by a diploma or a recent test, but it also shows in the conversation, so practise talking about your story and your life in France. Couples who usually speak English together at home often underestimate this part: a few weeks of speaking French as a couple before the interview make a real difference.</p>
<h2>Refusal and opposition</h2>
<p>The declaration can be refused if a condition is missing: length of marriage, life together, the spouse’s nationality or the language level. The minister responsible for naturalisation can also oppose the acquisition for unworthiness or for lack of assimilation other than linguistic. An opposition decision can be challenged before the Conseil d’État within the time limit set out on the official page.</p>
<h2>Marriage declaration or naturalisation?</h2>
<p>A spouse who has lived in France for years may also meet the conditions for ${h.a('naturalisation', 'naturalisation')}. The declaration has two advantages: no civic exam, and nationality dated from the day you declare. Naturalisation needs the exam but does not depend on the length of the marriage or on life together, which matters if the relationship ends. To secure your stay in the meantime, the spouse’s ${h.a('carte-resident', 'resident card')} comes earlier. The ${h.src('sp_mariage', 'service-public.gouv.fr page on nationality through marriage')} lists the documents.</p>`,
  },
});
