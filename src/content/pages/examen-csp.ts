import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'examen-csp',
  group: 'examen',
  order: 42,
  tool: {"kind": "quiz", "props": {"mention": "csp", "mode": "exam"}},
  mini: {"kind": "mini:titlefee"},
  related: ['questions-csp', 'examen-carte-resident', 'niveau-francais', 'quel-examen', 'dispenses', 'prix'],
  sources: ['sp_exam_sejour', 'arrete_exam', 'fc_csp', 'arrete_langue', 'sp_actu', 'ccip_exam'],
  fr: {
    slug: 'examen-civique-carte-pluriannuelle',
    nav: 'Examen civique carte pluriannuelle',
    card: 'L’épreuve de la mention carte de séjour pluriannuelle en conditions réelles, avec les règles propres à ce premier titre.',
    title: 'Examen civique carte pluriannuelle : épreuve, A2, taxe',
    description: 'Examen civique carte pluriannuelle : l’épreuve d’une première carte de séjour pluriannuelle, le niveau A2, les personnes exemptées et la taxe à prévoir.',
    h1: 'Examen civique pour la carte de séjour pluriannuelle',
    intro: 'Passez une épreuve blanche de la mention carte pluriannuelle, la plus accessible des trois, et vérifiez ce que coûte le titre lui-même.',
    resume: (h) => `L’examen civique de la carte de séjour pluriannuelle est l’épreuve, mention carte de séjour pluriannuelle, exigée depuis le ${h.date(h.P.exam.since)} pour la délivrance d’une première carte pluriannuelle, un titre valable de ${h.P.csp.validityMinYears} à ${h.P.csp.validityMaxYears} ans. C’est la première des trois mentions dans le parcours d’un étranger qui s’installe : elle s’accompagne du niveau de français ${h.P.language.csp}, le moins élevé des trois. L’épreuve elle-même ne fait pas de cadeau : ${h.size} questions en français, ${h.P.exam.minutes} minutes, ${h.need} bonnes réponses exigées, dont ${h.P.exam.situations} mises en situation. Les questions de connaissance viennent de la liste officielle propre à cette mention, centrée sur la vie courante. Sont hors du champ les renouvellements, les demandeurs de plus de ${h.P.exam.exemptAgeOver} ans, les bénéficiaires de la protection subsidiaire et les apatrides pour leur carte pluriannuelle, ainsi que les titres délivrés hors contrat d’intégration républicaine. L’outil ci-dessus tire une épreuve complète de cette mention ; le mini-outil calcule les timbres à payer pour le titre, hors prix de l’examen.`,
    faqs: (h) => [
      { q: 'Pourquoi le niveau de français demandé pour la carte pluriannuelle est-il le plus bas ?', a: `Parce que la carte pluriannuelle intervient tôt dans le parcours d’installation. Le niveau exigé monte ensuite par paliers : ${h.P.language.csp} pour la carte pluriannuelle, ${h.P.language.cr} pour la carte de résident, ${h.P.language.nat} pour la naturalisation. L’examen civique, lui, garde le même format et le même seuil à chaque étape ; seules changent les listes de questions de connaissance.` },
      { q: 'Un bénéficiaire de la protection subsidiaire passe-t-il l’examen pour sa carte pluriannuelle ?', a: 'Non. La carte pluriannuelle délivrée aux bénéficiaires de la protection subsidiaire et aux apatrides n’est pas soumise à l’examen civique. Attention toutefois : si la même personne demande plus tard une carte de résident de longue durée-UE, l’examen de la mention carte de résident devient obligatoire, comme pour tout autre demandeur de cette carte.' },
      { q: 'Faut-il viser la mention carte de résident dès la carte pluriannuelle ?', a: `C’est une option si vous comptez demander une carte de résident ensuite. L’attestation de la mention carte de résident vaut pour une carte pluriannuelle, et elle n’expire pas : une seule réussite peut servir aux deux titres. La contrepartie est une liste de questions plus exigeante, à préparer avec plus de temps pour atteindre ${h.need} bonnes réponses.` },
    ],
    body: (h) => `
<h2>Un premier titre, une première épreuve</h2>
<p>Pour beaucoup d’étrangers, la carte de séjour pluriannuelle est le premier titre où l’examen civique entre en jeu. Valable plusieurs années, elle permet de construire une vie professionnelle et familiale sans démarche annuelle en préfecture. Depuis le ${h.date(h.P.exam.since)}, une première carte pluriannuelle suppose deux preuves supplémentaires : le français au niveau ${h.P.language.csp} et l’attestation d’examen civique de la mention carte pluriannuelle. Les deux se préparent en parallèle, et l’une aide l’autre : lire les questions de l’examen est aussi un exercice de compréhension écrite.</p>
${h.table(['Point', 'Carte de séjour pluriannuelle'], [['Examen civique', `mention carte pluriannuelle, ${h.need} sur ${h.size}`], ['Français', `niveau ${h.P.language.csp}`], ['Durée du titre', `${h.P.csp.validityMinYears} à ${h.P.csp.validityMaxYears} ans`], ['Taxe usuelle de première délivrance', h.eur(h.P.fees.titleTotal)], ['Visa de régularisation', `${h.eur(h.P.fees.visaRegularisation)} en plus si entrée sans visa de long séjour, dont ${h.eur(h.P.fees.visaRegularisationAtFiling)} au dépôt`]], `Fiches service-public.gouv.fr et arrêté du 22 décembre 2025, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<h2>Les questions de cette mention</h2>
<p>La ${h.src('fc_csp', 'liste officielle de la mention carte pluriannuelle')} privilégie des situations que vit tout nouvel arrivant : les symboles de la République, le vote, l’école, la santé, le travail. Elle reste exigeante en histoire et en géographie, où il faut retenir des dates et des lieux. Vous pouvez parcourir toute la liste, réponses comprises, sur la page ${h.a('questions-csp', 'questions de la carte pluriannuelle')}.</p>
<p>Les ${h.P.exam.situations} mises en situation, elles, ne figurent dans aucune liste. Elles portent sur les principes de la République et sur les droits et devoirs, et demandent de reconnaître la conduite conforme à la loi : une discrimination à l’embauche, un refus de soins, une question de laïcité au guichet d’un service public.</p>
<h2>Qui ne passe pas l’examen pour ce titre</h2>
<ul>
<li>Les personnes qui renouvellent leur carte pluriannuelle.</li>
<li>Les demandeurs de plus de ${h.P.exam.exemptAgeOver} ans.</li>
<li>Les bénéficiaires de la protection subsidiaire et les apatrides, pour leur carte pluriannuelle.</li>
<li>Les titulaires de titres délivrés hors contrat d’intégration républicaine.</li>
<li>Les personnes dont le handicap ou l’état de santé est attesté par certificat médical, qui peuvent obtenir des aménagements ou une dispense.</li>
</ul>
<p>Le mini-outil ci-dessous vérifie la règle d’âge ; la page ${h.a('dispenses', 'dispenses de l’examen civique')} détaille chaque cas. En cas d’échec, rien n’impose d’attendre pour se réinscrire, et l’attestation obtenue ensuite n’a pas de limite de validité.</p>
<!--tool:mini:age-->
<h2>Se préparer sans dépenser</h2>
<p>Le contrat d’intégration républicaine comprend une formation civique gratuite de ${h.P.exam.civicTrainingHours} heures sur ${h.P.exam.civicTrainingDays} jours ; le ministère indique d’ailleurs que la préparation à l’examen peut être entièrement gratuite. Les listes de questions et les fiches thématiques du ministère sont en accès libre, et l’examen blanc de cette page aussi. Le seul coût lié à l’épreuve est son prix d’inscription, fixé par chaque centre : la page ${h.a('prix', 'prix et inscription')} explique comment s’y retrouver. Si vous hésitez encore sur la mention à passer, la page ${h.a('quel-examen', 'quel examen pour mon titre')} fait le tri selon votre situation.</p>`,
  },
  en: {
    slug: 'multi-year-permit-civic-exam',
    nav: 'Multi-year permit civic exam',
    card: 'The multi-year permit level paper in real conditions, with the rules that apply to this first permit.',
    title: 'Multi-year permit civic exam: the paper, A2 French, fees',
    description: 'Multi-year permit civic exam: the test for a first multi-year residence permit, A2 French, who is exempt and the fees to budget for the permit itself.',
    h1: 'Civic exam for the multi-year residence permit',
    intro: 'Sit a mock paper at the multi-year permit level, the most accessible of the three, and check what the permit itself costs.',
    resume: (h) => `The multi-year permit civic exam is the test, at the multi-year residence permit level (carte de séjour pluriannuelle), required since ${h.date(h.P.exam.since)} for a first multi-year permit, valid for ${h.P.csp.validityMinYears} to ${h.P.csp.validityMaxYears} years. It is the first of the three levels most newcomers meet, and it goes with French at level ${h.P.language.csp}, the lowest of the three. The paper itself is no easier: ${h.size} questions in French only, ${h.P.exam.minutes} minutes, ${h.need} correct answers needed, ${h.P.exam.situations} of them scenarios. The knowledge questions come from an official list specific to this level, focused on everyday life. Outside its scope are renewals, applicants over ${h.P.exam.exemptAgeOver}, beneficiaries of subsidiary protection and stateless people for their multi-year permit, and permits issued outside the republican integration contract. The tool above draws a full paper at this level, shown in English to help you learn, and the small tool works out the stamps to pay for the permit, not counting the exam price.`,
    faqs: (h) => [
      { q: 'Why is the French level for the multi-year permit the lowest?', a: `Because the multi-year permit comes early in the settling-in process. The level then rises step by step: ${h.P.language.csp} for the multi-year permit, ${h.P.language.cr} for the resident card, ${h.P.language.nat} for naturalisation. The civic exam keeps the same format and pass mark at every step; only the knowledge question lists change.` },
      { q: 'Does subsidiary protection exempt me from the civic exam?', a: 'For the multi-year permit, yes: the permit issued to beneficiaries of subsidiary protection and to stateless people is outside the exam. If the same person later applies for the EU long-term resident card, the resident card level exam becomes compulsory, as for any other applicant for that card.' },
      { q: 'Should I aim for the resident card level straight away?', a: `It is an option if you plan to apply for a resident card later. A resident card level certificate is valid for a multi-year permit and never expires, so one pass can serve both. The trade-off is a harder question list that needs more preparation time to reach ${h.need} correct answers.` },
    ],
    body: (h) => `
<h2>A first permit, a first exam</h2>
<p>For many newcomers, the multi-year permit is the first point where the civic exam applies. Valid for several years, it lets you plan work and family life without a yearly trip to the préfecture. Since ${h.date(h.P.exam.since)}, a first multi-year permit requires two extra proofs: French at level ${h.P.language.csp} and a civic exam certificate at the multi-year permit level. The two can be prepared together, and each helps the other: reading the exam questions in French is good reading practice, and the A2 vocabulary makes the questions easier to follow. Bear in mind that the whole exam, including the instructions on screen, is in French only.</p>
${h.table(['Point', 'Multi-year residence permit'], [['Civic exam', `multi-year permit level, ${h.need} of ${h.size}`], ['French', `level ${h.P.language.csp}`], ['Permit length', `${h.P.csp.validityMinYears} to ${h.P.csp.validityMaxYears} years`], ['Usual first-issue fee', h.eur(h.P.fees.titleTotal)], ['Regularisation visa', `${h.eur(h.P.fees.visaRegularisation)} on top if you entered without a long-stay visa, ${h.eur(h.P.fees.visaRegularisationAtFiling)} of it at filing`]], `service-public.gouv.fr pages and the order of 22 December 2025, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<h2>The questions at this level</h2>
<p>The ${h.src('fc_csp', 'official list for the multi-year permit level')} leans towards what every newcomer deals with: symbols of the Republic, voting, school, healthcare, work. History and geography still demand dates and places. You can read the full list, with answers, on the ${h.a('questions-csp', 'multi-year permit questions')} page.</p>
<p>The ${h.P.exam.situations} scenario questions appear on no list. They cover the principles of the Republic and rights and duties, and ask you to spot the lawful response: discrimination in hiring, a refusal of care, a secularism question at a public service counter. Expats from countries with different rules on religion in public life often find these the trickiest.</p>
<h2>Who does not sit the exam for this permit</h2>
<ul>
<li>People renewing their multi-year permit.</li>
<li>Applicants over ${h.P.exam.exemptAgeOver}.</li>
<li>Beneficiaries of subsidiary protection and stateless people, for their multi-year permit.</li>
<li>Holders of permits issued outside the republican integration contract.</li>
<li>People whose disability or health condition is certified by a doctor, who may get adjustments or an exemption.</li>
</ul>
<p>The small tool below checks the age rule; the ${h.a('dispenses', 'civic exam exemptions')} page covers each case. If you fail, there is no waiting period before you can book again, and the certificate you eventually get has no expiry date.</p>
<!--tool:mini:age-->
<h2>Preparing for free</h2>
<p>The republican integration contract includes a free civic training course of ${h.P.exam.civicTrainingHours} hours over ${h.P.exam.civicTrainingDays} days, and the ministry states that preparing for the exam can cost nothing at all. The ministry's question lists and theme sheets are open to all, and so is the mock paper on this page. The only exam-related cost is the booking fee, set by each centre: the ${h.a('prix', 'price and booking')} page explains how to find your way. If you are unsure which level applies to you, the ${h.a('quel-examen', 'which civic exam')} page sorts it out by situation.</p>`,
  },
});
