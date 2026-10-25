import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dispenses',
  group: 'examen',
  order: 63,
  tool: {"kind": "level", "props": {"title": "csp"}},
  mini: {"kind": "mini:age"},
  related: ['quel-examen', 'examen-2026', 'niveau-francais', 'mariage', 'examen-csp', 'examen-naturalisation'],
  sources: ['arrete_dispense', 'sp_exam_sejour', 'sp_exam_nat', 'sp_actu', 'sp_mariage', 'sp_langue'],
  fr: {
    slug: 'dispense-examen-civique',
    nav: 'Dispenses de l’examen',
    card: 'Âge, santé, renouvellement, protection internationale, nationalité par déclaration : qui échappe à l’examen, et dans quelles limites.',
    title: 'Dispense examen civique : âge, santé, protection, cas exclus',
    description: 'Dispense d’examen civique : plus de 65 ans pour un titre de séjour, santé ou handicap sur certificat, renouvellement, protection subsidiaire, réfugiés.',
    h1: 'Dispense de l’examen civique : qui n’a pas à le passer',
    intro: 'Décrivez votre démarche et votre situation dans l’outil : il indique si l’examen et un niveau de français vous sont demandés, ou si vous en êtes exempté.',
    resume: (h) => `Une dispense d’examen civique libère certains étrangers de l’épreuve normalement exigée depuis le ${h.date(h.P.exam.since)} pour une première carte pluriannuelle, une première carte de résident ou la naturalisation. Les cas sont limités et dépendent de la démarche. Pour un titre de séjour, les personnes de plus de ${h.P.exam.exemptAgeOver} ans ne passent pas l’examen ; aucune dispense liée à l’âge n’existe en revanche pour la naturalisation. Un handicap ou un état de santé attesté par certificat médical ouvre droit à des aménagements de l’épreuve ou à une dispense. Plusieurs démarches sont simplement hors du champ : les renouvellements de titre, la carte pluriannuelle des bénéficiaires de la protection subsidiaire et des apatrides, la carte de résident « réfugié », les titres délivrés hors contrat d’intégration républicaine et les déclarations de nationalité, par mariage notamment. L’outil ci-dessus applique ces règles à votre démarche, votre âge et votre statut de protection, et indique aussi le niveau de français attendu ; le mini-outil isole la seule question de l’âge.`,
    faqs: (h) => [
      { q: 'Faut-il demander la dispense d’examen pour plus de 65 ans ?', a: `La dispense résulte de l’âge du demandeur d’un titre de séjour au-delà de ${h.P.exam.exemptAgeOver} ans : l’examen n’est pas exigé. Votre date de naissance figure déjà sur les pièces d’identité du dossier ; suivez les indications de la préfecture. Rappel important : cette règle ne vaut pas pour la naturalisation, où l’examen reste obligatoire à tout âge.` },
      { q: 'Quel certificat médical faut-il pour une dispense liée à la santé ?', a: 'Un certificat attestant le handicap ou l’état de santé qui empêche de passer l’épreuve dans les conditions normales. Selon la situation, il conduit à des aménagements de l’épreuve ou à une dispense complète. Pour la nationalité, les modalités sont fixées par l’arrêté du 30 décembre 2025, publié sur Légifrance.' },
      { q: 'La dispense de français des réfugiés de plus de 70 ans vaut-elle pour l’examen civique ?', a: `Non, il s’agit de deux règles distinctes. Pour la naturalisation, le réfugié ou l’apatride de plus de ${h.P.language.natExemptRefugeeAge} ans résidant en France depuis ${h.P.language.natExemptRefugeeYears} ans est dispensé du justificatif de niveau de français. Cette dispense porte sur la langue ; elle ne mentionne pas l’examen civique, pour lequel seule la voie médicale permet une dispense en naturalisation.` },
    ],
    body: (h) => `
<h2>Les exemptions en un tableau</h2>
${h.table(['Situation', 'Titre de séjour', 'Naturalisation'], [[`Plus de ${h.P.exam.exemptAgeOver} ans`, 'pas d’examen', 'examen exigé'], ['Handicap ou état de santé, sur certificat médical', 'aménagements ou dispense', 'aménagements ou dispense'], ['Renouvellement du titre', 'pas d’examen', 'sans objet'], ['Protection subsidiaire ou apatridie', 'pas d’examen pour la carte pluriannuelle', 'examen exigé'], ['Réfugié', 'pas d’examen pour la carte de résident « réfugié »', 'examen exigé'], ['Titre hors contrat d’intégration républicaine', 'pas d’examen', 'sans objet']], `Fiches F39530 et F39426 de service-public.gouv.fr et arrêté du 30 décembre 2025, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>La lecture du tableau tient en une idée : les exemptions suivent le titre demandé, pas la personne. Un même réfugié est exempté pour sa carte de résident « réfugié », mais passe l’examen s’il demande une carte de résident de longue durée-UE ou la naturalisation.</p>
<h2>L’âge : une règle propre aux titres de séjour</h2>
<p>Au-delà de ${h.P.exam.exemptAgeOver} ans, l’examen n’est pas demandé pour une carte de séjour pluriannuelle ou une carte de résident. Cette règle ne se transpose pas à la naturalisation : un candidat âgé qui demande la nationalité par décret doit réussir l’examen, sauf dispense médicale. Le mini-outil de cette page fait la distinction en une question.</p>
<h2>La santé et le handicap</h2>
<p>Un handicap ou un état de santé attesté par un certificat médical permet d’obtenir soit des aménagements de l’épreuve, soit une dispense. Pour la nationalité, l’${h.src('arrete_dispense', 'arrêté du 30 décembre 2025')} fixe les modalités de dispense des justificatifs de français et d’examen civique. Mieux vaut faire établir le certificat avant de s’inscrire, pour savoir si l’on passera l’épreuve aménagée ou si l’on en sera dispensé.</p>
<h2>Les démarches hors du champ</h2>
<ul>
<li><strong>Renouvellements.</strong> L’examen est attaché à la première délivrance d’une carte pluriannuelle ou d’une carte de résident.</li>
<li><strong>Protection subsidiaire et apatrides.</strong> Leur carte pluriannuelle n’y est pas soumise.</li>
<li><strong>Carte de résident « réfugié ».</strong> Exemptée.</li>
<li><strong>Titres hors contrat d’intégration républicaine.</strong> Non concernés.</li>
<li><strong>Déclarations de nationalité.</strong> La ${h.a('mariage', 'nationalité par mariage')}, ou la déclaration comme ascendant, frère ou sœur de Français, n’exige pas d’examen civique ; la déclaration par mariage demande toutefois le niveau de français ${h.P.language.marriage}.</li>
</ul>
<h2>Ne pas confondre dispense de français et dispense d’examen</h2>
<p>Les deux exigences sont distinctes et leurs exemptions aussi. Pour la naturalisation, le réfugié ou l’apatride de plus de ${h.P.language.natExemptRefugeeAge} ans résidant en France depuis ${h.P.language.natExemptRefugeeYears} ans n’a pas à justifier de son niveau de français ; cette règle ne parle pas de l’examen civique. Les niveaux et leurs preuves sont détaillés sur la page ${h.a('niveau-francais', 'niveau de français')}.</p>
<p>En cas de doute sur votre situation, la page ${h.a('quel-examen', 'quel examen pour mon titre')} part de votre démarche, et la préfecture qui instruit votre dossier reste l’interlocuteur qui tranche. Dans le doute, préparez-vous quand même : l’attestation n’expire pas, et une réussite finalement superflue ne coûte que le prix de l’inscription.</p>`,
  },
  en: {
    slug: 'civic-exam-exemptions',
    nav: 'Exam exemptions',
    card: 'Age, health, renewals, international protection, nationality by declaration: who skips the exam, and within which limits.',
    title: 'Civic exam exemptions: age, health, protection, exclusions',
    description: 'Civic exam exemptions: over 65 for a residence permit, health or disability on a medical certificate, renewals, subsidiary protection, refugees, nationality.',
    h1: 'French civic exam exemptions: who does not have to sit it',
    intro: 'Describe your application and situation in the tool: it shows whether the exam and a French level apply to you, or whether you are exempt.',
    resume: (h) => `Civic exam exemptions release some foreign nationals from the test normally required in France since ${h.date(h.P.exam.since)} for a first multi-year permit, a first resident card or naturalisation. The cases are narrow and depend on the application. For a residence permit, people over ${h.P.exam.exemptAgeOver} do not sit the exam; there is no age exemption for naturalisation. A disability or health condition certified by a doctor can lead to adjustments or an exemption. Several applications are simply outside the scope: permit renewals, the multi-year permit for beneficiaries of subsidiary protection and stateless people, the refugee resident card, permits issued outside the republican integration contract and nationality declarations, including through marriage. Note that having limited French is not in itself a ground for exemption: the exam is in French only for everyone who has to take it. The tool above applies these rules to your application, age and protection status and shows the French level required, and the small tool isolates the age question.`,
    faqs: (h) => [
      { q: 'I am over 65: do I need to apply for the exemption?', a: `For a residence permit, being over ${h.P.exam.exemptAgeOver} means the exam is not required. Your date of birth already appears on the identity documents in your file; follow the préfecture's instructions. Remember that this rule does not apply to naturalisation, where the exam is required at any age.` },
      { q: 'Is weak French a reason to be exempted?', a: 'No. Limited French is not a ground for exemption from the civic exam, which is taken in French only by everyone who has to sit it. Only age, for residence permits, health or disability on a medical certificate, and the excluded applications listed on this page lead to an exemption. If French is your obstacle, build reading practice into your revision.' },
      { q: 'Does the French-language exemption for older refugees cover the civic exam?', a: `No, they are separate rules. For naturalisation, a refugee or stateless person over ${h.P.language.natExemptRefugeeAge} who has lived in France for ${h.P.language.natExemptRefugeeYears} years is exempt from proving their French level. That exemption concerns language; it does not mention the civic exam, for which only the medical route gives an exemption at the naturalisation level.` },
    ],
    body: (h) => `
<h2>The exemptions at a glance</h2>
${h.table(['Situation', 'Residence permit', 'Naturalisation'], [[`Over ${h.P.exam.exemptAgeOver}`, 'no exam', 'exam required'], ['Disability or health condition, on a medical certificate', 'adjustments or exemption', 'adjustments or exemption'], ['Permit renewal', 'no exam', 'not applicable'], ['Subsidiary protection or stateless', 'no exam for the multi-year permit', 'exam required'], ['Refugee', 'no exam for the refugee resident card', 'exam required'], ['Permit outside the integration contract', 'no exam', 'not applicable']], `service-public.gouv.fr pages F39530 and F39426 and the order of 30 December 2025, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>One idea sums up the table: exemptions follow the permit applied for, not the person. The same refugee is exempt for the refugee resident card but sits the exam when applying for the EU long-term resident card or naturalisation.</p>
<h2>Age: a rule for residence permits only</h2>
<p>Over ${h.P.exam.exemptAgeOver}, the exam is not required for a multi-year permit or a resident card. The rule does not carry over to naturalisation: an older applicant seeking citizenship by decree must pass the exam unless medically exempt. The small tool on this page makes the distinction in one question.</p>
<h2>Health and disability</h2>
<p>A disability or health condition certified by a doctor can lead either to adjustments to the paper or to an exemption. For nationality, the ${h.src('arrete_dispense', 'order of 30 December 2025')} sets out how exemptions from the French-language and civic exam proofs work. Get the certificate before you book, so you know whether you will sit an adjusted paper or be exempt. The order is in French on Légifrance; if your French is limited, ask the doctor or a support association to help you read what it requires.</p>
<h2>Applications outside the scope</h2>
<ul>
<li><strong>Renewals.</strong> The exam is tied to the first issue of a multi-year permit or resident card.</li>
<li><strong>Subsidiary protection and stateless people.</strong> Their multi-year permit is outside it.</li>
<li><strong>Refugee resident card.</strong> Exempt.</li>
<li><strong>Permits outside the republican integration contract.</strong> Not concerned.</li>
<li><strong>Nationality declarations.</strong> ${h.a('mariage', 'Nationality through marriage')}, or a declaration as the parent, grandparent or sibling of a French citizen, needs no civic exam; the marriage route still requires French at level ${h.P.language.marriage}.</li>
</ul>
<h2>Language exemption is not exam exemption</h2>
<p>The two requirements are separate, and so are their exemptions. For naturalisation, a refugee or stateless person over ${h.P.language.natExemptRefugeeAge} who has lived in France for ${h.P.language.natExemptRefugeeYears} years need not prove their French level; that rule says nothing about the civic exam. Levels and proofs are covered on the ${h.a('niveau-francais', 'French language level')} page.</p>
<p>If you are unsure, the ${h.a('quel-examen', 'which civic exam')} page starts from your application, and the préfecture handling your file has the final word. When in doubt about an exemption, it is usually safer to prepare anyway: the certificate never expires, so a pass you turn out not to need costs only the booking fee.</p>`,
  },
});
