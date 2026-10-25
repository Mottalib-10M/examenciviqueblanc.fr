import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'demande-nationalite',
  group: 'nationalite',
  order: 112,
  tool: { kind: 'date', props: { route: 'nat5', routes: 'nat5,nat2,nat0,mariage' } },
  mini: { kind: 'mini:decision' },
  related: ['naturalisation', 'conditions', 'entretien', 'delai', 'cout-naturalisation', 'mariage'],
  sources: ['sp_nat', 'sp_mariage', 'sp_timbre', 'code_civil_nat', 'sp_exam_nat'],
  fr: {
    slug: 'demande-de-nationalite-francaise',
    nav: 'Demande de nationalité',
    card: 'Du dépôt en ligne gratuit au décret : les étapes de la demande, ce qui se paie et les pièges des sites payants.',
    title: 'Demande de nationalité française : étapes du dépôt au décret',
    description: 'Demande de nationalité française étape par étape : dépôt en ligne gratuit, timbre fiscal, récépissé, enquête, entretien, examen civique, décision et décret.',
    h1: 'Demande de nationalité française : les étapes, du dépôt au décret',
    intro: 'Vérifiez d’abord à partir de quelle date vous pouvez déposer, par décret ou par mariage : la suite de la page décrit chaque étape du dossier.',
    resume: (h) => `La demande de nationalité française par naturalisation se fait aujourd’hui en ligne, sur le service public dédié, et le dépôt lui-même est gratuit : seul le timbre fiscal de ${h.eur(h.natFee)} se paie, ${h.eur(h.P.naturalisation.feeGuyane)} en Guyane. Le parcours suit toujours le même ordre. Le candidat réunit ses pièces, dont l’attestation de niveau de français ${h.P.language.nat} et, pour la naturalisation, l’attestation de réussite à l’examen civique. Il dépose, puis reçoit un récépissé lorsque le dossier est complet ; ce récépissé fait courir le délai légal de décision de ${h.P.naturalisation.decisionMonths} mois. Une enquête porte sur le comportement civique, et une convocation à l’entretien d’assimilation suit si la demande est recevable. Chaque étape donne lieu à un courriel, et l’avancement se suit depuis l’espace personnel. Des sites privés proposent de « faciliter » la démarche contre paiement : ils ne sont pas nécessaires. L’outil ci-dessus indique la date à partir de laquelle vous pouvez déposer, par naturalisation ou par déclaration après mariage.`,
    faqs: (h) => [
      { q: 'Faut-il passer par un site ou une agence pour demander la nationalité ?', a: `Non. Service-public.gouv.fr met en garde contre les sites privés payants qui proposent d’aider à la démarche : la demande se fait gratuitement en ligne et seul le timbre fiscal de ${h.eur(h.natFee)} est dû. Un intermédiaire ne peut ni accélérer l’instruction ni influer sur la décision. Ce site, indépendant, n’offre lui non plus aucun service de dépôt.` },
      { q: 'À quel moment reçoit-on le récépissé de la demande ?', a: `Lorsque vous avez fourni tous les documents demandés. C’est un point clé : le délai légal de ${h.P.naturalisation.decisionMonths} mois, ou ${h.P.naturalisation.decisionMonthsLongResident} mois si vous résidez en France depuis ${h.P.naturalisation.longResidentYears} ans ou plus, court à partir de ce récépissé, pas du premier envoi. Un dossier incomplet repousse donc d’autant la date limite de la décision.` },
      { q: 'Que se passe-t-il si l’on manque la convocation à l’entretien ?', a: 'Selon service-public.gouv.fr, si vous ne vous présentez pas à l’entretien sans raison légitime, votre demande peut être classée sans suite. En cas d’empêchement sérieux, prévenez la préfecture le plus tôt possible et gardez la preuve de votre motif. Le jour venu, apportez les originaux des documents indiqués sur la convocation.' },
      { q: 'Comment sait-on que la naturalisation est accordée ?', a: 'Le demandeur résidant en France est informé par courriel de son inscription dans le décret de naturalisation après la publication au Journal officiel. Il télécharge ensuite son décret sur Légifrance. Le décret prend effet à la date de sa signature. Le demandeur qui vit à l’étranger est informé par courrier.' },
    ],
    body: (h) => `
<h2>Les étapes dans l’ordre</h2>
<ol>
<li><strong>Vérifier l’éligibilité.</strong> Durée de résidence, titre de séjour, ressources : l’outil en haut de page donne la date de dépôt possible et la page des ${h.a('conditions', 'conditions')} passe le reste en revue.</li>
<li><strong>Obtenir les deux attestations.</strong> Le justificatif de français ${h.P.language.nat} et, pour la naturalisation, l’attestation d’examen civique. Elles se préparent avant le dépôt, pas après.</li>
<li><strong>Réunir les pièces.</strong> Identité, état civil, domicile, revenus et impôts, situation familiale. Les actes étrangers sont accompagnés d’une traduction certifiée.</li>
<li><strong>Acheter le timbre fiscal</strong> de ${h.eur(h.P.naturalisation.fee)}, la seule somme à payer pour le dépôt.</li>
<li><strong>Déposer en ligne</strong> sur le service public de demande de naturalisation ou de réintégration.</li>
<li><strong>Recevoir le récépissé</strong>, délivré quand le dossier est complet : il fait courir le délai de décision.</li>
<li><strong>Enquête et entretien.</strong> L’administration enquête sur le comportement civique ; si la demande est recevable, une convocation à l’${h.a('entretien', 'entretien d’assimilation')} arrive.</li>
<li><strong>Décision</strong> dans le délai légal, puis, si elle est favorable, inscription dans un décret publié au Journal officiel.</li>
</ol>
<h2>Naturalisation ou déclaration par mariage : deux dossiers différents</h2>
${h.table(['Point', 'Naturalisation', 'Déclaration par mariage'], [['Nature', 'décret, après examen du dossier', 'déclaration du conjoint'], ['Durée', `${h.P.naturalisation.residenceYears} ans de résidence (ou moins)`, `${h.P.marriage.years} ans de mariage (${h.P.marriage.yearsIfNotResident} sans résidence suffisante)`], ['Français', h.P.language.nat, h.P.language.marriage], ['Examen civique', 'oui', 'non'], ['Timbre', h.eur(h.P.naturalisation.fee), h.eur(h.P.marriage.fee)]], `Fiches service-public.gouv.fr F2213 et F2726, relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>L’outil permet de basculer entre les deux voies. Pour la seconde, la page ${h.a('mariage', 'nationalité par mariage')} détaille la communauté de vie et la règle de résidence depuis le mariage.</p>
<h2>Ce qui se paie, et ce qui ne se paie pas</h2>
<p>Le dépôt en ligne est gratuit. Le timbre fiscal est le seul frais administratif. S’y ajoutent des dépenses qui ne vont pas à l’administration : le prix de l’examen civique, fixé par chaque centre, celui du test de français si vous n’avez pas de diplôme français, et les traductions. La page ${h.a('cout-naturalisation', 'coût de la naturalisation')} les additionne. Toute autre somme réclamée pour « déposer à votre place » ou « suivre votre dossier » relève d’un service privé dont vous n’avez pas besoin.</p>
<h2>Suivre son dossier</h2>
<p>Une fois la demande envoyée, l’avancement se consulte dans l’espace personnel en ligne, et un courriel signale chaque étape du traitement. Le mini-outil sous le résumé calcule, à partir du nombre de mois écoulés depuis le récépissé, le temps qui reste avant l’échéance légale. Cette échéance peut être prolongée une seule fois de ${h.P.naturalisation.extensionMonths} mois, par décision motivée : la page ${h.a('delai', 'délai de naturalisation')} donne les dates exactes et explique comment réagir en cas de refus.</p>
<h2>Les pièges les plus courants</h2>
<ul>
<li>Payer un site privé qui se présente comme un passage obligé : la fiche ${h.src('sp_nat', 'service-public.gouv.fr')} rappelle que la démarche en ligne est gratuite.</li>
<li>Déposer avec une attestation de langue de plus de ${h.P.language.attestationValidityYears} ans.</li>
<li>Envoyer un dossier incomplet en pensant gagner du temps : le délai ne court qu’au récépissé.</li>
<li>Oublier les originaux le jour de l’entretien.</li>
<li>Laisser expirer son titre de séjour pendant la préparation du dossier : il doit être valide au dépôt.</li>
</ul>
<p>Un dernier conseil : conservez une copie de chaque pièce envoyée et de chaque courriel reçu. En cas de recours contre un refus, c’est cette trace qui permet de reconstituer le dossier.</p>`,
  },
  en: {
    slug: 'french-nationality-application',
    nav: 'Nationality application',
    card: 'From the free online filing to the decree: the steps of a French nationality application, what you pay and the paid sites to avoid.',
    title: 'Nationality application in France: from filing to the decree',
    description: 'Nationality application in France step by step: free online filing, the tax stamp, the receipt, the inquiry, the interview, the decision and the decree.',
    h1: 'Applying for French nationality: every step from filing to decree',
    intro: 'First check the earliest date you can apply, by decree or through marriage: the rest of the page walks through each stage of the file.',
    resume: (h) => `A French naturalisation application is now filed online through the official public service, and filing itself is free: the only payment is a tax stamp of ${h.eur(h.natFee)}, or ${h.eur(h.P.naturalisation.feeGuyane)} in French Guiana. The sequence is always the same. You gather your documents, including proof of French at level ${h.P.language.nat} and, for naturalisation, the civic exam pass certificate. You file, then receive a receipt (récépissé) once the file is complete; that receipt starts the legal decision period of ${h.P.naturalisation.decisionMonths} months. The authorities look into your civic conduct, and if the application is admissible you are called to an assimilation interview at the préfecture. You get an email at each stage and can follow progress in your online account. Private websites offer to "help" with the process for a fee: you do not need them. The tool above shows the earliest date you can file, either for naturalisation or for a declaration after marriage, so you can plan the steps that come before it.`,
    faqs: (h) => [
      { q: 'Do I need a lawyer or agency to apply for French citizenship?', a: `No. service-public.gouv.fr warns that private paid websites offer to help with the process, while the application itself is free online and only the ${h.eur(h.natFee)} tax stamp is due. No intermediary can speed up the review or sway the decision. This independent site offers no filing service either.` },
      { q: 'When does the decision clock start?', a: `When you receive the receipt, which is issued once every requested document is in. The legal period of ${h.P.naturalisation.decisionMonths} months, or ${h.P.naturalisation.decisionMonthsLongResident} months if you have lived in France for ${h.P.naturalisation.longResidentYears} years or more, runs from that receipt, not from your first upload. An incomplete file pushes the deadline back.` },
      { q: 'I live abroad. How will I hear about the decision?', a: 'service-public.gouv.fr says applicants living abroad receive a letter telling them they are included in the naturalisation decree. Applicants in France are told by email after the decree is published in the Journal officiel and download it from Légifrance. In both cases the decree takes effect on the date it is signed.' },
    ],
    body: (h) => `
<h2>The steps in order</h2>
<ol>
<li><strong>Check eligibility.</strong> Residence period, permit, income: the tool at the top gives your filing date, and the ${h.a('conditions', 'requirements page')} covers the rest.</li>
<li><strong>Get the two certificates.</strong> Proof of French at ${h.P.language.nat} and, for naturalisation, the civic exam pass. Both come before filing, not after.</li>
<li><strong>Collect documents.</strong> ID, civil status, address, income and tax, family situation. Foreign certificates need certified translations.</li>
<li><strong>Buy the tax stamp</strong> of ${h.eur(h.P.naturalisation.fee)}, the only fee for filing.</li>
<li><strong>File online</strong> on the public service for naturalisation or reinstatement.</li>
<li><strong>Receive the receipt</strong> once the file is complete: it starts the decision clock.</li>
<li><strong>Inquiry and interview.</strong> The authorities check your civic conduct; if the application is admissible, you are called to the ${h.a('entretien', 'assimilation interview')}.</li>
<li><strong>Decision</strong> within the legal period, then, if positive, your name in a decree published in the Journal officiel.</li>
</ol>
<h2>Decree or marriage declaration</h2>
${h.table(['Point', 'Naturalisation', 'Marriage declaration'], [['Nature', 'decree, after review of the file', 'declaration by the spouse'], ['Period', `${h.P.naturalisation.residenceYears} years’ residence (or less)`, `${h.P.marriage.years} years married (${h.P.marriage.yearsIfNotResident} without enough residence)`], ['French', h.P.language.nat, h.P.language.marriage], ['Civic exam', 'yes', 'no'], ['Tax stamp', h.eur(h.P.naturalisation.fee), h.eur(h.P.marriage.fee)]], `service-public.gouv.fr pages F2213 and F2726, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The tool switches between the two routes. For the second, see our page on ${h.a('mariage', 'nationality through marriage')}.</p>
<h2>What you pay, and what you do not</h2>
<p>Online filing is free and the tax stamp is the only administrative fee. Other costs go to third parties: the civic exam, priced by each centre; a French test if you hold no French diploma; and translations. Our ${h.a('cout-naturalisation', 'naturalisation cost page')} adds them up. Anyone charging to "file for you" or "track your case" is selling a private service you do not need.</p>
<h2>Tracking your file</h2>
<p>After filing, progress shows in your online account and an email marks each stage. The small tool under the summary counts the months left before the legal deadline. It can be extended once, by ${h.P.naturalisation.extensionMonths} months, through a reasoned decision; the ${h.a('delai', 'processing time page')} gives the exact dates and explains what to do if you are refused.</p>
<h2>Pitfalls expats run into</h2>
<ul>
<li>Paying a private site that looks official: the ${h.src('sp_nat', 'service-public.gouv.fr page')} confirms the online application is free.</li>
<li>Filing with a language result over ${h.P.language.attestationValidityYears} years old.</li>
<li>Sending an incomplete file to "get in the queue": the clock only starts at the receipt.</li>
<li>Leaving translations of foreign certificates to the last minute.</li>
<li>Forgetting the original documents on interview day, as listed in your letter.</li>
<li>Letting your residence permit lapse while you prepare: it must be valid when you file.</li>
</ul>
<h2>Practical tips for international applicants</h2>
<p>Keep a copy of every document you upload and every email you receive; if you ever need to challenge a refusal, that trail lets you rebuild the file quickly. Check that the names on your foreign certificates match your French documents exactly, including accents and the order of first names, and get any mismatch explained before you file. If you move house during the review, update your details in your online account so the interview letter reaches you. And remember that the civic exam certificate never expires: sitting it early takes one task off the list while your residence period runs.</p>`,
  },
});
