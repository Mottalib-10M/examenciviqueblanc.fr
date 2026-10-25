import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'prix',
  group: 'examen',
  order: 61,
  tool: {"kind": "cost", "props": {"procedure": "cr"}},
  mini: {"kind": "mini:titlefee"},
  related: ['cout-naturalisation', 'resultat', 'examen-blanc', 'examen-2026', 'carte-resident', 'tcf-irn'],
  sources: ['ccip_inscription', 'fei_centres', 'ccip_exam', 'sp_exam_sejour', 'sp_timbre', 'sp_cr'],
  fr: {
    slug: 'prix-examen-civique',
    nav: 'Prix et inscription',
    card: 'Pas de tarif national : comment comparer les centres, où s’inscrire et quels timbres prévoir en plus de l’examen.',
    title: 'Prix examen civique et inscription : centres, timbres, coût',
    description: 'Prix de l’examen civique : pas de tarif national, chaque centre fixe le sien. Où s’inscrire auprès des deux organismes habilités et le coût total avec timbres.',
    h1: 'Prix de l’examen civique et inscription auprès d’un centre',
    intro: 'Saisissez le prix relevé dans votre centre : l’outil y ajoute les timbres de votre démarche et le test de français éventuel pour donner le coût total.',
    resume: (h) => `Le prix de l’examen civique n’est fixé par aucun texte national : chaque centre de passation agréé détermine le sien, et il varie d’un centre à l’autre. Deux organismes sont habilités à organiser l’épreuve, la CCI Paris Île-de-France, sous la marque Le français des affaires, et France Éducation international ; c’est auprès d’un centre rattaché à l’un d’eux que l’on s’inscrit et que l’on paie. Le prix d’inscription n’est qu’une partie de la dépense. Une première carte de résident ou pluriannuelle coûte en outre ${h.eur(h.P.fees.titleTotal)} de timbres, plus ${h.eur(h.P.fees.visaRegularisation)} de visa de régularisation en cas d’entrée sans visa de long séjour ; une naturalisation, ${h.eur(h.natFee)} de timbre fiscal par demandeur. S’y ajoute parfois un test de français, lui aussi au prix du centre. L’outil ci-dessus additionne ces postes à partir du prix d’examen que vous avez relevé et du nombre de passages prévus ; le mini-outil calcule les timbres d’un premier titre. La préparation, elle, peut être entièrement gratuite.`,
    faqs: (h) => [
      { q: 'Pourquoi le site n’affiche-t-il aucun prix d’examen ?', a: 'Parce qu’aucun prix national n’existe. Chaque centre agréé fixe son propre tarif, qui peut changer d’une session à l’autre. Afficher un montant reviendrait à donner un chiffre faux pour la plupart des lecteurs. L’outil de coût vous laisse saisir le prix exact relevé lors de l’inscription, et calcule le reste à partir des montants fixés par les textes.' },
      { q: 'Faut-il payer à nouveau pour repasser l’examen ?', a: `Oui : chaque passage correspond à une nouvelle inscription auprès d’un centre, au prix qu’il pratique. C’est pourquoi l’outil prévoit un nombre de passages. Il vaut mieux s’inscrire après avoir dépassé ${h.need} bonnes réponses plusieurs fois à l’entraînement que tenter l’épreuve trop tôt. Les conditions d’annulation ou de report relèvent de chaque centre.` },
      { q: 'Faut-il payer quelqu’un pour préparer l’examen civique ?', a: `Non. Le ministère indique que la préparation peut être entièrement gratuite : listes de questions et fiches thématiques sur son site, et formation civique gratuite de ${h.P.exam.civicTrainingHours} heures pour les signataires du contrat d’intégration républicaine. Méfiez-vous des intermédiaires payants qui proposent de s’occuper de vos démarches : seuls les timbres et l’inscription à l’examen se paient.` },
      { q: 'Peut-on payer l’examen civique avec un timbre fiscal ?', a: 'Non, ce sont deux paiements distincts. L’inscription à l’examen se règle directement au centre de passation, selon ses modalités. Le timbre fiscal, lui, paie le titre de séjour ou la demande de naturalisation, selon les modalités décrites par service-public.gouv.fr. Ne confondez pas les deux lorsque vous établissez votre budget.' },
    ],
    body: (h) => `
<h2>Ce que vous payez, et à qui</h2>
${h.table(['Poste', 'Montant', 'Payé à'], [['Inscription à l’examen civique', 'fixé par chaque centre', 'centre de passation agréé'], ['Test de français (si pas de diplôme)', 'fixé par chaque centre', 'centre de test'], ['Timbres d’une première carte de séjour', h.eur(h.P.fees.titleTotal), 'administration, par timbre fiscal'], ['Visa de régularisation (entrée sans visa long séjour)', h.eur(h.P.fees.visaRegularisation), 'administration, dont ' + h.eur(h.P.fees.visaRegularisationAtFiling) + ' au dépôt'], ['Timbre fiscal de la naturalisation', h.eur(h.natFee), 'administration, par timbre fiscal']], `Montants des fiches service-public.gouv.fr, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'l'])}
<p>Les montants des timbres sont fixés par la loi et identiques partout ; seuls l’examen et le test de français dépendent du centre. Les ${h.eur(h.P.fees.titleTotal)} d’une première carte se décomposent en ${h.eur(h.P.fees.titleTimbre)} de droit de timbre et ${h.eur(h.P.fees.titleTax)} de taxe.</p>
<h2>S’inscrire auprès des deux organismes habilités</h2>
<p>L’examen ne s’achète pas auprès de la préfecture : on s’inscrit dans un centre agréé par l’un des deux organismes.</p>
<ul>
<li><strong>CCI Paris Île-de-France (Le français des affaires).</strong> Sa page ${h.src('ccip_inscription', 'inscription à l’examen civique')} explique les modalités et rappelle que les droits d’inscription sont fixés par le centre.</li>
<li><strong>France Éducation international.</strong> L’inscription se fait sur le site test-civique.fr, et la ${h.src('fei_centres', 'carte des centres d’examen civique')} permet de trouver un centre proche.</li>
</ul>
<p>Certains centres se trouvent à l’étranger, dans des instituts français ou des alliances françaises, selon l’offre de chacun. Choisissez la mention correspondant à votre démarche au moment de l’inscription : carte de séjour pluriannuelle, carte de résident ou naturalisation. Une erreur de mention coûte cher, puisque l’attestation porte la mention passée ; seule celle de la carte de résident vaut aussi pour une carte pluriannuelle. Munissez-vous enfin d’une pièce d’identité valide pour le jour de l’épreuve.</p>
<h2>Comparer les centres sans se tromper</h2>
<ul>
<li>Relevez le prix affiché pour la mention qui vous concerne, pas un tarif général.</li>
<li>Vérifiez la date de la prochaine session et le délai d’envoi du résultat.</li>
<li>Lisez les conditions de report ou d’annulation, propres à chaque centre.</li>
<li>Pensez au trajet : un centre moins cher mais éloigné peut coûter plus au total.</li>
</ul>
<p>Une fois le prix connu, saisissez-le dans l’outil en haut de page avec le nombre de passages que vous prévoyez, par prudence, pour obtenir un budget réaliste.</p>
<h2>Les timbres de la naturalisation</h2>
<p>Pour une demande de nationalité, le timbre fiscal s’élève à ${h.eur(h.natFee)} par demandeur, ${h.eur(h.P.naturalisation.feeGuyane)} en Guyane. La ${h.src('sp_timbre', 'fiche service-public.gouv.fr consacrée à ce timbre')} explique comment l’acheter. Un couple qui dépose deux demandes paie deux timbres : le calcul se fait par demandeur majeur, pas par dossier. Le mini-outil ci-dessous le calcule pour un foyer ; la page ${h.a('cout-naturalisation', 'coût de la naturalisation')} détaille l’ensemble des frais.</p>
<!--tool:mini:natfee-->
<h2>Réduire la facture</h2>
<p>Le poste qui pèse le plus lourd est souvent un passage raté, qui oblige à payer une nouvelle inscription. Le meilleur investissement est donc gratuit : l’${h.a('examen-blanc', 'examen civique blanc')} jusqu’à réussir avec une marge, puis l’inscription. Si l’épreuve se passe mal malgré tout, la page ${h.a('resultat', 'résultat de l’examen civique')} explique comment contester ou repasser.</p>`,
  },
  en: {
    slug: 'civic-exam-price',
    nav: 'Price and booking',
    card: 'No national price: how to compare centres, where to book and which stamps to budget for on top of the exam.',
    title: 'Civic exam price and booking: centres, stamps, total cost',
    description: 'Civic exam price: there is no national fee, each centre sets its own. Where to book with the two authorised bodies, and your total cost once stamps are added.',
    h1: 'French civic exam price and how to book a centre',
    intro: 'Enter the price quoted by your centre: the tool adds the stamps for your application and any French test to give the total cost.',
    resume: (h) => `The French civic exam price is not set by any national rule: each approved test centre decides its own, and it varies from one centre to another. Two bodies are authorised to run the exam, the Paris Île-de-France Chamber of Commerce, under the name Le français des affaires, and France Éducation international; you book and pay at a centre attached to one of them. The booking fee is only part of the bill. A first resident card or multi-year permit also costs ${h.eur(h.P.fees.titleTotal)} in stamps, plus ${h.eur(h.P.fees.visaRegularisation)} for a regularisation visa if you entered without a long-stay visa; naturalisation costs ${h.eur(h.natFee)} in tax stamps per applicant. A French test may come on top, again at the centre's price. The tool above adds these items up from the exam price you were quoted and the number of attempts you plan for, and the small tool works out the stamps for a first permit. Booking pages and the exam itself are in French only. Preparing, on the other hand, can cost nothing.`,
    faqs: (h) => [
      { q: 'Why does this site show no exam price?', a: 'Because there is no national price. Each approved centre sets its own fee, which can change from one session to the next. Showing a figure would give most readers a wrong number. The cost tool lets you enter the exact price you see when booking, and works out the rest from the amounts fixed by law.' },
      { q: 'Can I book the civic exam from abroad?', a: 'Some centres operate outside France, in French institutes and Alliances françaises, depending on what each one offers. Check the centre maps of the two authorised bodies. Booking from abroad does not change the paper: it is the same exam, in French only, and the certificate has no expiry date, so you can sit it before you move.' },
      { q: 'Do I need to pay an agency to prepare or apply?', a: `No. The ministry states that preparation can be entirely free: question lists and theme sheets on its site, plus a free ${h.P.exam.civicTrainingHours}-hour civic training course for those who sign the republican integration contract. Be wary of paid intermediaries offering to handle your application: only the stamps and the exam booking cost money.` },
    ],
    body: (h) => `
<h2>What you pay, and to whom</h2>
${h.table(['Item', 'Amount', 'Paid to'], [['Civic exam booking', 'set by each centre', 'approved test centre'], ['French test (if no diploma)', 'set by each centre', 'test centre'], ['Stamps for a first residence permit', h.eur(h.P.fees.titleTotal), 'the State, by tax stamp'], ['Regularisation visa (entry without long-stay visa)', h.eur(h.P.fees.visaRegularisation), 'the State, ' + h.eur(h.P.fees.visaRegularisationAtFiling) + ' of it at filing'], ['Naturalisation tax stamp', h.eur(h.natFee), 'the State, by tax stamp']], `Amounts from service-public.gouv.fr pages, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'l'])}
<p>Stamp amounts are set by law and are the same everywhere; only the exam and the French test depend on the centre. The ${h.eur(h.P.fees.titleTotal)} for a first permit break down into ${h.eur(h.P.fees.titleTimbre)} of stamp duty and ${h.eur(h.P.fees.titleTax)} of tax.</p>
<h2>Booking with the two authorised bodies</h2>
<p>You do not book the exam through the préfecture: you register at a centre approved by one of the two bodies.</p>
<ul>
<li><strong>Paris Île-de-France Chamber of Commerce (Le français des affaires).</strong> Its ${h.src('ccip_inscription', 'civic exam booking page')} explains how to register and notes that each centre sets the fee.</li>
<li><strong>France Éducation international.</strong> Registration is on the test-civique.fr site, and its ${h.src('fei_centres', 'map of civic exam centres')} helps you find one near you.</li>
</ul>
<p>When you book, pick the level that matches your application: multi-year permit, resident card or naturalisation. Booking a level that does not match your file is a costly mistake, since the certificate names the level; only the resident card level also counts for a multi-year permit. Some centres operate abroad, in French institutes and Alliances françaises, which can suit expats preparing a move. Bring valid identification on the day.</p>
<h2>Comparing centres sensibly</h2>
<ul>
<li>Note the price shown for your level, not a general rate.</li>
<li>Check the next session date and how long the result takes to arrive.</li>
<li>Read the centre's own rules on postponing or cancelling.</li>
<li>Count the journey: a cheaper but distant centre can cost more overall.</li>
</ul>
<p>Once you have the price, enter it in the tool at the top with the number of attempts you plan for, to be safe, and you get a realistic budget.</p>
<h2>Naturalisation stamps</h2>
<p>For a nationality application, the tax stamp is ${h.eur(h.natFee)} per applicant, ${h.eur(h.P.naturalisation.feeGuyane)} in French Guiana. The ${h.src('sp_timbre', 'service-public.gouv.fr page on this stamp')} explains how to buy it. A couple filing two applications pays two stamps: the count is per adult applicant, not per file. The small tool below works it out for a household; the ${h.a('cout-naturalisation', 'naturalisation cost')} page covers every fee.</p>
<!--tool:mini:natfee-->
<h2>Keeping the bill down</h2>
<p>The heaviest item is often a failed attempt, which means paying for a new booking. The best investment is therefore free: the ${h.a('examen-blanc', 'civic exam mock test')} until you pass with a margin, then the booking. If the exam still goes badly, the ${h.a('resultat', 'civic exam result')} page explains how to challenge it or sit it again.</p>`,
  },
});
