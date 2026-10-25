import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'quel-examen',
  group: 'sejour',
  order: 122,
  tool: { kind: 'level', props: { title: 'csp' } },
  mini: { kind: 'mini:level' },
  related: ['examen-csp', 'examen-carte-resident', 'examen-naturalisation', 'dispenses', 'niveau-francais', 'carte-resident'],
  sources: ['sp_exam_sejour', 'sp_exam_nat', 'sp_actu', 'arrete_exam', 'arrete_dispense'],
  fr: {
    slug: 'quel-examen-civique-pour-mon-titre',
    nav: 'Quel examen pour mon titre ?',
    card: 'Carte pluriannuelle, carte de résident, naturalisation : la mention d’examen civique et le niveau de français qui correspondent à votre démarche.',
    title: 'Examen civique selon votre titre : mention et niveau exigés',
    description: 'Examen civique selon le titre demandé : mention carte pluriannuelle, carte de résident ou naturalisation, niveau A2, B1 ou B2, et les cas sans examen exigé.',
    h1: 'Quel examen civique et quel niveau de français pour votre titre ?',
    intro: 'Sélectionnez le titre ou la démarche, précisez votre âge et votre situation : l’outil indique la mention d’examen et le niveau de langue à préparer.',
    resume: (h) => `L’examen civique existe en trois mentions, une par famille de démarches, et chacune s’accompagne d’un niveau de français. La mention carte de séjour pluriannuelle vaut pour une première carte pluriannuelle, avec le niveau ${h.P.language.csp}. La mention carte de résident vaut pour une première carte de résident, y compris la carte de résident de longue durée-UE, avec le niveau ${h.P.language.cr}. La mention naturalisation vaut pour la naturalisation et la réintégration par décret, avec le niveau ${h.P.language.nat}. Les trois mentions ont la même forme : ${h.size} questions en ${h.P.exam.minutes} minutes, ${h.need} bonnes réponses pour réussir. L’attestation n’a pas de limite de validité, et celle de la mention carte de résident vaut aussi pour une carte pluriannuelle. Aucun examen n’est demandé pour un renouvellement, pour les déclarations de nationalité, dont celle par mariage, au-delà de ${h.P.exam.exemptAgeOver} ans pour un titre de séjour, ni pour la carte de résident « réfugié ». L’outil ci-dessus applique ces règles à votre situation et donne la mention et le niveau à préparer.`,
    faqs: (h) => [
      { q: 'Je demande une carte pluriannuelle mais vise la carte de résident ensuite : quelle mention passer ?', a: `La mention carte de résident. Son attestation vaut aussi pour une carte de séjour pluriannuelle et n’expire pas : un seul examen couvre donc les deux étapes. La liste officielle de cette mention compte ${h.num(h.count.cr)} questions de connaissance dans notre banque, contre ${h.num(h.count.csp)} pour la carte pluriannuelle, mais l’épreuve garde la même forme, ${h.size} questions et un seuil de ${h.need}. Seule la naturalisation exigera une nouvelle attestation.` },
      { q: 'Les bénéficiaires de la protection subsidiaire passent-ils l’examen civique ?', a: 'Pas pour leur carte de séjour pluriannuelle : les bénéficiaires de la protection subsidiaire et les apatrides en sont exclus. En revanche, s’ils demandent plus tard la carte de résident de longue durée-UE, l’examen civique mention carte de résident leur est demandé comme aux autres demandeurs. La naturalisation suppose aussi l’examen.' },
      { q: 'La carte de séjour temporaire est-elle concernée par l’examen civique ?', a: 'Non. L’examen est exigé depuis 2026 pour une première carte de séjour pluriannuelle, une première carte de résident et la naturalisation. La carte de séjour temporaire n’entre pas dans cette liste, pas plus que les titres hors contrat d’intégration républicaine. L’examen se posera au moment de demander la carte pluriannuelle.' },
      { q: 'Peut-on être dispensé de l’examen pour raison de santé ?', a: 'Oui. Un handicap ou un état de santé attesté par un certificat médical ouvre droit à des aménagements de l’épreuve ou à une dispense. Pour la nationalité, l’arrêté du 30 décembre 2025 précise les modalités de cette dispense. Renseignez-vous avant l’inscription : un aménagement se prévoit en amont avec le centre.' },
    ],
    body: (h) => `
<h2>La correspondance entre titres et mentions</h2>
${h.table(['Titre ou démarche', 'Mention de l’examen', 'Niveau de français'], [['Carte de séjour temporaire', 'aucune', 'non exigé à ce titre'], ['Première carte de séjour pluriannuelle', 'carte pluriannuelle', h.P.language.csp], ['Première carte de résident', 'carte de résident', h.P.language.cr], ['Carte de résident de longue durée-UE', 'carte de résident', h.P.language.cr], ['Carte de résident « réfugié »', 'aucune', 'non exigé à ce titre'], ['Renouvellement d’un titre', 'aucune', 'non exigé'], ['Naturalisation, réintégration', 'naturalisation', h.P.language.nat], ['Nationalité par mariage', 'aucune', h.P.language.marriage]], `Fiches service-public.gouv.fr relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Le tableau se lit ligne par ligne, mais une même personne en parcourt souvent plusieurs au fil des années : carte pluriannuelle, puis carte de résident, puis nationalité. Choisir la bonne mention au bon moment évite de repasser l’épreuve plus que nécessaire.</p>
<h2>Une épreuve commune, des listes différentes</h2>
<p>Les trois mentions partagent la structure fixée par l’arrêté du 10 octobre 2025 : ${h.P.exam.knowledge} questions de connaissance, ${h.P.exam.situations} mises en situation, cinq thématiques et un seuil à ${h.pc(h.P.exam.passPercent / 100)}. Ce qui change, c’est le réservoir de questions de connaissance. Le ministère publie une liste officielle pour la carte pluriannuelle et une pour la carte de résident ; notre banque en compte ${h.num(h.count.csp)} pour la première mention et ${h.num(h.count.cr)} pour la seconde. Pour vous entraîner sur la bonne mention, ouvrez l’${h.a('examen-csp', 'examen de la carte pluriannuelle')}, celui de la ${h.a('examen-carte-resident', 'carte de résident')} ou celui de la ${h.a('examen-naturalisation', 'naturalisation')}.</p>
<h2>Les cas où aucun examen n’est demandé</h2>
<ul>
<li>Les renouvellements d’un titre déjà obtenu.</li>
<li>Les demandeurs de plus de ${h.P.exam.exemptAgeOver} ans, pour les titres de séjour seulement : il n’existe pas de dispense d’âge pour la naturalisation.</li>
<li>Les déclarations de nationalité : mariage, ascendant ou frère et sœur de Français.</li>
<li>La carte pluriannuelle des bénéficiaires de la protection subsidiaire et des apatrides, et la carte de résident des réfugiés.</li>
<li>Les titres délivrés hors contrat d’intégration républicaine.</li>
<li>Les personnes dispensées pour raison de handicap ou de santé, sur certificat médical.</li>
</ul>
<p>La page des ${h.a('dispenses', 'dispenses')} reprend chacun de ces cas en détail. Attention à la règle d’âge : elle joue au moment de la demande de titre de séjour, et elle ne s’étend jamais à la naturalisation. Une personne de plus de ${h.P.exam.exemptAgeOver} ans qui obtient sa carte de résident sans examen devra donc tout de même réussir la mention naturalisation si elle demande ensuite à devenir française.</p>
<h2>Ce que l’outil vous demande, et pourquoi</h2>
<p>Chaque champ de l’outil correspond à une règle. Le titre détermine la mention. La question « première demande » écarte les renouvellements. L’âge déclenche la dispense au-delà de ${h.P.exam.exemptAgeOver} ans pour les titres de séjour. La protection internationale règle le cas des réfugiés, des bénéficiaires de la protection subsidiaire et des apatrides. Le certificat médical ouvre la piste d’un aménagement ou d’une dispense. Le résultat affiche la mention, le niveau de langue et la raison de la réponse.</p>
<h2>Trois conseils pour choisir</h2>
<ol>
<li><strong>Visez l’étape suivante.</strong> L’attestation mention carte de résident couvre aussi la carte pluriannuelle : si vous prévoyez de demander la carte de résident dans les années qui viennent, passez directement cette mention.</li>
<li><strong>Ne comptez pas sur une réutilisation pour la nationalité.</strong> La naturalisation exige sa propre mention ; une attestation de séjour ne la remplace pas.</li>
<li><strong>Préparez langue et examen ensemble.</strong> Le niveau de français est une condition distincte, détaillée sur la page ${h.a('niveau-francais', 'niveau de français')}.</li>
</ol>
<p>La fiche ${h.src('sp_exam_sejour', 'service-public.gouv.fr sur l’examen civique pour les titres de séjour')} reste la référence en cas de doute sur votre situation.</p>`,
  },
  en: {
    slug: 'which-civic-exam',
    nav: 'Which exam for my permit?',
    card: 'Multi-year permit, resident card, naturalisation: the civic exam level and the French level that match your application.',
    title: 'Civic exam level by permit: which test and French you need',
    description: 'Civic exam level by permit in France: multi-year permit, resident card or naturalisation, French at A2, B1 or B2, and the cases where no exam is required.',
    h1: 'Which civic exam and French level for your permit?',
    intro: 'Pick your permit or application, add your age and situation: the tool shows which civic exam level and which French level to prepare.',
    resume: (h) => `The French civic exam comes in three levels (mentions), one for each family of applications, and each is paired with a French language level. The multi-year permit level applies to a first multi-year residence permit, with French at ${h.P.language.csp}. The resident card level applies to a first resident card, including the EU long-term resident card, with French at ${h.P.language.cr}. The naturalisation level applies to naturalisation and reinstatement by decree, with French at ${h.P.language.nat}. All three take the same form: ${h.size} questions in ${h.P.exam.minutes} minutes, ${h.need} correct answers to pass. The certificate never expires, and the resident card level certificate also covers a multi-year permit. No exam is required for a renewal, for nationality declarations such as the marriage route, for anyone over ${h.P.exam.exemptAgeOver} applying for a residence permit, or for the refugee resident card. The tool above runs these rules on your situation and returns the exam level and French level to prepare. Use it before you book a centre, so that you register for the level your application actually needs.`,
    faqs: (h) => [
      { q: 'I am applying for a multi-year permit but plan a resident card later. Which level should I take?', a: `The resident card level. Its certificate also covers a multi-year permit and never expires, so one exam serves both steps. Its official list holds ${h.num(h.count.cr)} knowledge questions in our bank, against ${h.num(h.count.csp)} for the multi-year permit, but the test keeps the same form, ${h.size} questions and a pass mark of ${h.need}. Only naturalisation will need a new certificate.` },
      { q: 'Is a temporary residence permit covered by the civic exam?', a: 'No. Since 2026 the exam applies to a first multi-year residence permit, a first resident card and naturalisation. The temporary residence permit (carte de séjour temporaire) is not on that list, nor are permits issued outside the republican integration contract. The exam comes into play when you apply for the multi-year permit.' },
      { q: 'Does subsidiary protection exempt me from the exam?', a: 'For your multi-year permit, yes: beneficiaries of subsidiary protection and stateless people are outside the exam. If you later apply for the EU long-term resident card, however, the resident card level exam applies to you like everyone else, and naturalisation requires its own exam too.' },
    ],
    body: (h) => `
<h2>Matching permits to exam levels</h2>
${h.table(['Permit or application', 'Civic exam level', 'French level'], [['Temporary residence permit', 'none', 'not required for it'], ['First multi-year residence permit', 'multi-year permit', h.P.language.csp], ['First resident card', 'resident card', h.P.language.cr], ['EU long-term resident card', 'resident card', h.P.language.cr], ['Refugee resident card', 'none', 'not required for it'], ['Renewal of a permit', 'none', 'not required'], ['Naturalisation, reinstatement', 'naturalisation', h.P.language.nat], ['Nationality through marriage', 'none', h.P.language.marriage]], `service-public.gouv.fr pages, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Read it row by row, but bear in mind that many people move down several rows over the years: multi-year permit, then resident card, then citizenship. Picking the right level at the right moment saves you from sitting the exam more often than you need to.</p>
<h2>One format, different question lists</h2>
<p>All three levels share the structure set by the order of 10 October 2025: ${h.P.exam.knowledge} knowledge questions, ${h.P.exam.situations} scenarios, five themes and a pass mark of ${h.pc(h.P.exam.passPercent / 100)}. What differs is the pool of knowledge questions. The ministry publishes one official list for the multi-year permit and one for the resident card; our bank holds ${h.num(h.count.csp)} for the first and ${h.num(h.count.cr)} for the second. To practise at the right level, open the ${h.a('examen-csp', 'multi-year permit exam')}, the ${h.a('examen-carte-resident', 'resident card exam')} or the ${h.a('examen-naturalisation', 'naturalisation exam')}.</p>
<h2>When no exam is required</h2>
<ul>
<li>Renewals of a permit you already hold.</li>
<li>Applicants over ${h.P.exam.exemptAgeOver}, for residence permits only: there is no age exemption for naturalisation.</li>
<li>Nationality declarations: marriage, or being the ascendant or sibling of a French citizen.</li>
<li>The multi-year permit for beneficiaries of subsidiary protection and stateless people, and the refugee resident card.</li>
<li>Permits issued outside the republican integration contract.</li>
<li>People exempted for a certified disability or health condition.</li>
</ul>
<p>Our ${h.a('dispenses', 'exemptions page')} goes through each case. Watch the age rule: it applies when you apply for a residence permit and never extends to naturalisation. Someone over ${h.P.exam.exemptAgeOver} who gets a resident card without the exam will still have to pass the naturalisation level if they later apply to become French.</p>
<h2>What the tool asks, and why</h2>
<p>Each field maps to a rule. The permit decides the exam level. The first-application question rules out renewals. Your age triggers the exemption over ${h.P.exam.exemptAgeOver} for residence permits. International protection settles the cases of refugees, subsidiary protection and stateless people. The medical question opens the way to adjustments or an exemption. The result shows the exam level, the French level and the reason behind the answer, so you can check it against the official page.</p>
<h2>Three tips for choosing</h2>
<ol>
<li><strong>Aim one step ahead.</strong> The resident card level certificate covers the multi-year permit too: if a resident card is likely within a few years, take that level straight away.</li>
<li><strong>Do not count on reuse for citizenship.</strong> Naturalisation needs its own level; a residence permit certificate will not do.</li>
<li><strong>Prepare language and exam together.</strong> The French level is a separate requirement, set out on our ${h.a('niveau-francais', 'French level page')}.</li>
</ol>
<p>The ${h.src('sp_exam_sejour', 'service-public.gouv.fr page on the civic exam for residence permits')} remains the reference if your case is unusual. Expats whose plans are still open, staying a few years or settling for good, usually do best with the resident card level: it covers both residence permits, and the naturalisation level can wait until citizenship is a real project.</p>`,
  },
});
