import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'carte-resident',
  group: 'sejour',
  order: 120,
  tool: { kind: 'date', props: { route: 'crSpouse', routes: 'crSpouse,crFamily,crParent,ldue' } },
  mini: { kind: 'mini:cryears' },
  related: ['longue-duree-ue', 'examen-carte-resident', 'questions-cr', 'quel-examen', 'niveau-francais', 'prix'],
  sources: ['sp_cr', 'sp_ldue', 'sp_vpf', 'sp_exam_sejour', 'arrete_langue'],
  fr: {
    slug: 'carte-de-resident',
    nav: 'Carte de résident',
    card: 'La carte de 10 ans : à quel moment la demander selon votre motif, l’examen civique et le niveau B1, le coût en timbres.',
    title: 'Carte de résident de 10 ans : motifs, date, examen et coût',
    description: 'Carte de résident de 10 ans : date de demande selon le motif (conjoint de Français, regroupement familial, parent), niveau B1, examen civique, 350 € de timbres.',
    h1: 'Carte de résident : quand la demander et ce qu’elle exige',
    intro: 'Choisissez votre motif et la date de départ du calcul : l’outil indique à partir de quand vous pouvez demander la carte de résident.',
    resume: (h) => `La carte de résident est le titre de séjour de ${h.P.residentCard.validityYears} ans qui donne à un étranger un droit au séjour durable en France. Plusieurs motifs y donnent accès, chacun avec sa durée préalable : ${h.P.residentCard.spouseYears} ans de mariage pour le conjoint de Français (${h.P.residentCard.spouseYearsTunisia} an pour un ressortissant tunisien), ${h.P.residentCard.familyReunionYears} ans de séjour régulier pour la personne venue par regroupement familial, ${h.P.residentCard.parentYears} ans de carte vie privée et familiale pour le parent d’enfant français, et ${h.P.residentCard.ldueYears} ans de séjour régulier ininterrompu pour la carte de résident de longue durée-UE. Depuis le ${h.date(h.P.exam.since)}, une première carte de résident exige le niveau de français ${h.P.language.cr} et l’attestation d’examen civique mention carte de résident, sauf au-delà de ${h.P.exam.exemptAgeOver} ans. Elle coûte ${h.eur(h.titleFee)} en timbres, plus ${h.eur(h.P.fees.visaRegularisation)} pour qui est entré sans visa de long séjour. Elle se perd après ${h.P.residentCard.lossAbroadYears} ans consécutifs hors de France. L’outil ci-dessus calcule, selon votre motif, la date à partir de laquelle vous pouvez la demander.`,
    faqs: (h) => [
      { q: 'L’attestation d’examen civique mention carte de résident sert-elle pour d’autres titres ?', a: 'Oui pour la carte pluriannuelle : l’attestation mention carte de résident vaut aussi pour une carte de séjour pluriannuelle, et elle n’a pas de limite de durée de validité. Elle ne remplace pas en revanche l’attestation mention naturalisation exigée pour devenir français. Si la nationalité est votre objectif, gardez en tête qu’une nouvelle épreuve vous attendra.' },
      { q: 'Peut-on perdre sa carte de résident en vivant à l’étranger ?', a: `Oui. La carte de résident est perdue après ${h.P.residentCard.lossAbroadYears} ans consécutifs passés hors de France. Une expatriation longue, même pour le travail, peut donc faire tomber le droit au séjour. Si vous prévoyez une absence de cette durée, renseignez-vous avant le départ auprès de la préfecture sur les démarches possibles.` },
      { q: 'Le réfugié doit-il passer l’examen civique pour sa carte de résident ?', a: 'Non pour la carte de résident délivrée au titre du statut de réfugié, qui ne figure pas parmi les titres soumis à l’examen. En revanche, la carte de résident de longue durée-UE reste soumise à l’examen civique mention carte de résident, y compris lorsqu’elle est demandée par un réfugié, un bénéficiaire de la protection subsidiaire ou un titulaire du passeport talent.' },
      { q: 'Combien de temps la carte de résident est-elle valable ?', a: `Elle est valable ${h.P.residentCard.validityYears} ans. L’examen civique et le niveau ${h.P.language.cr} ne sont demandés qu’à la première délivrance : le renouvellement du même titre n’exige pas de les présenter à nouveau. C’est l’une des raisons pour lesquelles beaucoup d’étrangers installés durablement la préfèrent à une succession de cartes pluriannuelles.` },
    ],
    body: (h) => `
<h2>Les motifs et leur durée préalable</h2>
${h.table(['Motif', 'Durée avant la demande', 'Point de départ du calcul'], [['Conjoint de Français', `${h.P.residentCard.spouseYears} ans (${h.P.residentCard.spouseYearsTunisia} an si tunisien)`, 'date du mariage'], ['Regroupement familial', `${h.P.residentCard.familyReunionYears} ans`, 'entrée en France, séjour régulier'], ['Parent d’enfant français', `${h.P.residentCard.parentYears} ans`, 'première carte vie privée et familiale'], ['Résident de longue durée-UE', `${h.P.residentCard.ldueYears} ans`, 'début du séjour régulier']], `Fiches service-public.gouv.fr relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>L’outil applique ces durées à la date que vous saisissez. Pour la carte de longue durée-UE, il compte en plus vos absences : la page ${h.a('longue-duree-ue', 'carte de résident longue durée-UE')} explique la règle des absences.</p>
<h2>Examen civique et niveau de français</h2>
<p>Une première carte de résident exige deux attestations. La première prouve le niveau ${h.P.language.cr}, par un diplôme français ou un test de moins de ${h.P.language.attestationValidityYears} ans. La seconde est l’attestation de réussite à l’examen civique mention carte de résident : ${h.size} questions, ${h.need} bonnes réponses pour réussir. Le ministère publie la liste des questions de connaissance de cette mention, que nous reprenons avec leurs réponses sur la page ${h.a('questions-cr', 'questions de la carte de résident')} ; l’${h.a('examen-carte-resident', 'examen blanc de la mention')} permet de s’entraîner en conditions réelles.</p>
<ul>
<li>Pas d’examen civique au-delà de ${h.P.exam.exemptAgeOver} ans pour un titre de séjour.</li>
<li>Pas d’examen pour la carte de résident délivrée au réfugié.</li>
<li>Aménagement ou dispense possible pour raison de handicap ou de santé attestée.</li>
</ul>
<h2>Le coût en timbres</h2>
${h.table(['Poste', 'Montant'], [['Droit de timbre', h.eur(h.P.fees.titleTimbre)], ['Taxe', h.eur(h.P.fees.titleTax)], ['Total, cas général', h.eur(h.P.fees.titleTotal)], ['Visa de régularisation, si entré sans visa long séjour', h.eur(h.P.fees.visaRegularisation)], ['dont à payer au dépôt', h.eur(h.P.fees.visaRegularisationAtFiling)]], 'Frais officiels ; l’examen civique et le test de langue se paient à part, au prix du centre.', ['l', 'r'])}
<p>Les frais d’examen et de test n’ont pas de barème national : la page ${h.a('prix', 'prix de l’examen civique')} explique où les comparer.</p>
<h2>Préparer la demande dans le bon ordre</h2>
<ol>
<li><strong>Calculer la date.</strong> L’outil en haut de page la donne selon votre motif. Pour le conjoint de Français, le point de départ est la date du mariage ; pour le parent d’enfant français, la première carte vie privée et familiale.</li>
<li><strong>Passer l’examen civique tôt.</strong> L’attestation n’a pas de limite de validité : rien n’empêche de la décrocher plusieurs mois avant la date, ce qui laisse le temps d’un second passage.</li>
<li><strong>Caler le test de langue.</strong> À l’inverse, un test doit avoir moins de ${h.P.language.attestationValidityYears} ans au dépôt : placez-le dans les mois qui précèdent la demande, sauf si un diplôme français vous en dispense.</li>
<li><strong>Prévoir le budget.</strong> ${h.eur(h.P.fees.titleTotal)} de timbres, et le visa de régularisation si vous êtes entré sans visa de long séjour, dont ${h.eur(h.P.fees.visaRegularisationAtFiling)} au dépôt.</li>
</ol>
<p>Cet ordre évite la situation la plus frustrante : un dossier prêt à la bonne date, mais bloqué par une attestation manquante ou un test devenu trop ancien. Le mini-outil sous le résumé donne en un coup d’œil les années qui restent, la durée exigée et le montant des timbres pour chaque motif.</p>
<h2>Une carte de ${h.P.residentCard.validityYears} ans, à certaines conditions</h2>
<p>La carte de résident offre une stabilité que la carte pluriannuelle, valable ${h.P.csp.validityMinYears} à ${h.P.csp.validityMaxYears} ans, ne donne pas. Elle se perd toutefois après ${h.P.residentCard.lossAbroadYears} ans consécutifs hors de France, ce qui compte pour qui envisage une mobilité professionnelle longue. Pour la suite du parcours, elle prépare aussi la naturalisation : le niveau ${h.P.language.cr} est une étape vers le ${h.P.language.nat} exigé pour devenir français. La fiche ${h.src('sp_cr', 'service-public.gouv.fr sur la carte de résident')} détaille les pièces selon le motif.</p>`,
  },
  en: {
    slug: 'french-resident-card',
    nav: 'Resident card',
    card: 'The 10-year card: when you can apply for each route, the civic exam and level B1, and the stamp fees.',
    title: 'Resident card in France: 10-year card, timing, exam and fees',
    description: 'Resident card in France, valid 10 years: when to apply on each route (spouse of a French citizen, family reunification, parent), B1 French, civic exam, €350.',
    h1: 'The French resident card: when to apply and what it takes',
    intro: 'Pick your route and the start date: the tool shows from when you can apply for the resident card.',
    resume: (h) => `The resident card (carte de résident) is France’s ${h.P.residentCard.validityYears}-year residence permit, the step that gives a foreign national long-term security. Several routes lead to it, each with a qualifying period: ${h.P.residentCard.spouseYears} years of marriage for the spouse of a French citizen (${h.P.residentCard.spouseYearsTunisia} year for Tunisian nationals), ${h.P.residentCard.familyReunionYears} years of lawful stay for people who came through family reunification, ${h.P.residentCard.parentYears} years on a private and family life permit for the parent of a French child, and ${h.P.residentCard.ldueYears} years of unbroken lawful stay for the EU long-term resident card. Since ${h.date(h.P.exam.since)}, a first resident card requires French at level ${h.P.language.cr} and the civic exam certificate at resident card level, unless you are over ${h.P.exam.exemptAgeOver}. It costs ${h.eur(h.titleFee)} in stamps, plus ${h.eur(h.P.fees.visaRegularisation)} if you entered without a long-stay visa. It lapses after ${h.P.residentCard.lossAbroadYears} consecutive years outside France. The tool above works out, for your route, the date from which you can apply, so you can line up the French test and the civic exam in time.`,
    faqs: (h) => [
      { q: 'Does the resident card civic exam certificate also cover a multi-year permit?', a: 'Yes. The resident card level certificate is also valid for a multi-year residence permit, and it never expires. It does not, however, replace the naturalisation-level certificate needed to become French. If citizenship is your long-term aim, expect to sit the exam again at that level when the time comes.' },
      { q: 'I am being posted abroad for a few years. Will I lose my card?', a: `Possibly. The resident card is lost after ${h.P.residentCard.lossAbroadYears} consecutive years outside France, whatever the reason for the absence. A long assignment abroad can therefore end your right of residence. Before you leave, ask the préfecture what options exist for your situation, and keep evidence of your ties to France.` },
      { q: 'I came to France as a refugee. Do I need the civic exam?', a: 'Not for the resident card issued on the basis of refugee status, which is outside the list of permits covered by the exam. The EU long-term resident card is different: it still requires the resident card level civic exam, including for refugees, beneficiaries of subsidiary protection and talent passport holders.' },
    ],
    body: (h) => `
<h2>Routes and qualifying periods</h2>
${h.table(['Route', 'Period before applying', 'Counted from'], [['Spouse of a French citizen', `${h.P.residentCard.spouseYears} years (${h.P.residentCard.spouseYearsTunisia} if Tunisian)`, 'wedding date'], ['Family reunification', `${h.P.residentCard.familyReunionYears} years`, 'arrival in France, lawful stay'], ['Parent of a French child', `${h.P.residentCard.parentYears} years`, 'first private and family life permit'], ['EU long-term resident', `${h.P.residentCard.ldueYears} years`, 'start of lawful stay']], `service-public.gouv.fr pages, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The tool applies these periods to the date you enter. For the EU long-term card it also counts your trips abroad; our ${h.a('longue-duree-ue', 'EU long-term resident card page')} explains the absence rule.</p>
<h2>Civic exam and French level</h2>
<p>A first resident card needs two certificates. One proves French at ${h.P.language.cr}, through a French diploma or a test under ${h.P.language.attestationValidityYears} years old. The other is the resident card level civic exam pass: ${h.size} questions, ${h.need} correct to pass. The ministry publishes the knowledge questions for this level, which we reproduce with answers on our ${h.a('questions-cr', 'resident card questions page')}; the ${h.a('examen-carte-resident', 'resident card mock exam')} lets you practise under real conditions.</p>
<ul>
<li>No civic exam over ${h.P.exam.exemptAgeOver} for a residence permit.</li>
<li>No exam for the resident card issued to refugees.</li>
<li>Adjustments or an exemption for a certified disability or health condition.</li>
</ul>
<h2>Fees</h2>
${h.table(['Item', 'Amount'], [['Stamp duty', h.eur(h.P.fees.titleTimbre)], ['Tax', h.eur(h.P.fees.titleTax)], ['Total, general case', h.eur(h.P.fees.titleTotal)], ['Regularisation visa fee, if no long-stay visa on entry', h.eur(h.P.fees.visaRegularisation)], ['of which paid when filing', h.eur(h.P.fees.visaRegularisationAtFiling)]], 'Official fees; the civic exam and language test are paid separately at the centre’s price.', ['l', 'r'])}
<p>Exam and test fees have no national price list; our ${h.a('prix', 'civic exam price page')} explains where to compare them.</p>
<h2>Getting the order right</h2>
<ol>
<li><strong>Work out your date.</strong> The tool at the top gives it for your route. For a spouse of a French citizen it runs from the wedding; for the parent of a French child, from the first private and family life permit.</li>
<li><strong>Sit the civic exam early.</strong> The certificate never expires, so you can pass it months before your date and still have time for a second attempt.</li>
<li><strong>Time the language test.</strong> A test, by contrast, must be under ${h.P.language.attestationValidityYears} years old when you file: book it in the months before, unless a French diploma covers you.</li>
<li><strong>Budget.</strong> ${h.eur(h.P.fees.titleTotal)} in stamps, plus the regularisation visa fee if you entered without a long-stay visa, of which ${h.eur(h.P.fees.visaRegularisationAtFiling)} is due when filing.</li>
</ol>
<p>This order avoids the most frustrating outcome: a file ready on the right date but held up by a missing certificate or a test that has gone stale. If you hold a talent passport or another work-based permit and are not married to a French citizen, the EU long-term route is the one to check: it counts ${h.P.residentCard.ldueYears} years of lawful stay and caps your time abroad. If you are married to a French citizen, the spouse route usually comes sooner, after ${h.P.residentCard.spouseYears} years of marriage. The small tool under the summary compares the years left, the period required and the stamp fees for each route at a glance.</p>
<h2>Ten years of security, with conditions</h2>
<p>The resident card gives a stability the multi-year permit, valid ${h.P.csp.validityMinYears} to ${h.P.csp.validityMaxYears} years, cannot. It lapses after ${h.P.residentCard.lossAbroadYears} consecutive years outside France, which matters if your career may take you abroad for long. It is also a natural step towards citizenship: level ${h.P.language.cr} is a stage on the way to the ${h.P.language.nat} needed for naturalisation. The ${h.src('sp_cr', 'service-public.gouv.fr resident card page')} lists the documents for each route.</p>`,
  },
});
