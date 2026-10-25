import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cout-naturalisation',
  group: 'nationalite',
  order: 113,
  tool: { kind: 'cost', props: { procedure: 'nat' } },
  mini: { kind: 'mini:natfee' },
  related: ['naturalisation', 'prix', 'demande-nationalite', 'tcf-irn', 'carte-resident'],
  sources: ['sp_timbre', 'sp_nat', 'sp_mariage', 'ccip_inscription', 'sp_cr'],
  fr: {
    slug: 'cout-naturalisation',
    nav: 'Coût de la naturalisation',
    card: 'Timbre fiscal, examen civique, test de français, traductions : le budget réel d’une demande, sans frais inventés.',
    title: 'Coût de la naturalisation : timbre, examen, test de français',
    description: 'Coût de la naturalisation : timbre fiscal de 255 € (127,50 € en Guyane), examen civique et test de français au prix du centre, traductions et total du foyer.',
    h1: 'Coût de la naturalisation : le budget complet d’une demande',
    intro: 'Saisissez le nombre de demandeurs et les prix relevés dans vos centres : l’outil additionne le timbre officiel et les frais variables.',
    resume: (h) => `Le coût de la naturalisation se compose d’un seul frais administratif et de plusieurs dépenses qui varient selon votre situation. Le frais administratif est le timbre fiscal de ${h.eur(h.natFee)} par demande, ramené à ${h.eur(h.P.naturalisation.feeGuyane)} en Guyane ; le dépôt en ligne, lui, ne coûte rien. Les autres dépenses n’ont pas de barème national. L’examen civique, obligatoire pour la naturalisation, est facturé par le centre agréé où vous le passez, à un prix qui change d’un centre à l’autre, et chaque nouvelle tentative se paie. Le test de français, TCF ou TEF, n’est dû que si vous n’avez pas de diplôme français prouvant le niveau ${h.P.language.nat}. Les traductions certifiées des actes étrangers complètent le budget. Pour comparaison, la déclaration de nationalité par mariage coûte le même timbre de ${h.eur(h.P.marriage.fee)}, sans examen civique. L’outil ci-dessus additionne le timbre officiel et les prix que vous relevez vous-même, pour un ou plusieurs demandeurs, sans jamais inventer de tarif.`,
    faqs: (h) => [
      { q: 'Le timbre fiscal de naturalisation est-il dû par chaque membre du couple ?', a: `Le timbre de ${h.eur(h.P.naturalisation.fee)} accompagne chaque demande. Si les deux conjoints demandent la naturalisation, chacun dépose son dossier et paie son timbre, comme le prévoit le mini-outil de cette page. Pour un foyer, multipliez donc le timbre par le nombre de demandeurs majeurs, puis ajoutez pour chacun son examen civique et, le cas échéant, son test de français.` },
      { q: 'Pourquoi ce site ne donne-t-il pas le prix de l’examen civique ?', a: 'Parce qu’il n’existe pas de tarif national : chaque centre de passation agréé fixe son prix. Citer un montant reviendrait à présenter le tarif d’un centre comme une règle générale. L’outil vous laisse saisir le prix affiché lors de votre inscription, et le nombre de passages que vous prévoyez, pour obtenir un total honnête.' },
      { q: 'Comment payer le timbre quand on dépose depuis l’étranger ?', a: 'Selon service-public.gouv.fr, le demandeur qui réside à l’étranger règle le droit auprès du consulat au lieu d’acheter un timbre fiscal en France. Le montant de référence reste celui fixé pour la naturalisation. Renseignez-vous auprès du consulat compétent sur les modalités pratiques avant de constituer le dossier.' },
    ],
    body: (h) => `
<h2>Les postes de dépense</h2>
${h.table(['Poste', 'Montant', 'Nature'], [['Timbre fiscal', h.eur(h.P.naturalisation.fee), 'fixé par la loi'], ['Timbre fiscal en Guyane', h.eur(h.P.naturalisation.feeGuyane), 'fixé par la loi'], ['Dépôt en ligne', h.eur(0), 'gratuit'], ['Examen civique', 'prix du centre', 'variable, par passage'], ['Test de français (TCF ou TEF)', 'prix du centre', 'seulement sans diplôme français'], ['Traductions certifiées', 'selon le traducteur', 'pour les actes étrangers']], `Timbre : fiche service-public.gouv.fr relue le ${h.date(h.P.retrieved_at)}. Les autres postes n’ont pas de barème national.`, ['l', 'r', 'l'])}
<p>Seul le premier poste est certain. Les autres dépendent de votre parcours : un diplôme français supprime le test, un examen civique réussi du premier coup évite un second paiement, des actes déjà rédigés en français évitent les traductions.</p>
<h2>Comment l’outil calcule</h2>
<p>Le simulateur part du timbre officiel lu dans nos paramètres et le multiplie par le nombre de demandeurs. Il ajoute ensuite, si vous les renseignez, le prix de l’examen civique multiplié par le nombre de passages prévus, le prix du test de français et le total des traductions. Il sépare à l’écran les frais officiels et les frais que vous avez saisis : vous voyez ainsi ce qui relève de la loi et ce qui relève de vos choix. Pour estimer prudemment, prévoyez deux passages à l’examen tant que vos examens blancs ne dépassent pas nettement le seuil de ${h.need} sur ${h.size}.</p>
<h2>Réduire la facture</h2>
<ul>
<li><strong>Se préparer gratuitement.</strong> Les listes officielles, les fiches thématiques du ministère et l’${h.a('examen-blanc', 'examen civique blanc')} de ce site ne demandent aucun paiement. Un échec à l’examen coûte un second passage : c’est là que la préparation rapporte le plus.</li>
<li><strong>Comparer les centres.</strong> La page ${h.a('prix', 'prix de l’examen civique')} explique où trouver les tarifs des deux organismes habilités.</li>
<li><strong>Vérifier ses diplômes.</strong> Un diplôme français de la liste officielle évite le ${h.a('tcf-irn', 'test de français')}.</li>
<li><strong>Ignorer les intermédiaires.</strong> Le dépôt en ligne est gratuit ; un site privé qui facture l’envoi du dossier n’apporte rien que la démarche officielle ne fasse déjà.</li>
</ul>
<h2>Un exemple de budget à construire soi-même</h2>
<p>Prenons un couple dont un seul conjoint possède un diplôme français. Le budget comprend deux timbres de ${h.eur(h.P.naturalisation.fee)}, soit ${h.eur(h.P.naturalisation.fee * 2)}, deux inscriptions à l’examen civique au prix de leur centre, un seul test de français pour le conjoint sans diplôme, et les traductions des actes de naissance et de mariage établis à l’étranger. Entrez ces éléments dans l’outil : il affiche le total, la part par personne et la répartition entre frais officiels et frais variables. Refaites ensuite le calcul avec un passage supplémentaire à l’examen pour voir ce que coûterait un échec.</p>
<h2>Quand payer quoi</h2>
<p>Les dépenses s’étalent dans le temps. Le test de français et l’examen civique se paient au moment de l’inscription, souvent des mois avant le dépôt ; les traductions se commandent pendant la constitution du dossier ; le timbre s’achète juste avant l’envoi. La fiche officielle de la naturalisation ne mentionne aucun autre frais administratif après le dépôt, ni pour l’entretien, ni pour le décret.</p>
<h2>Comparer avec les autres démarches</h2>
${h.table(['Démarche', 'Frais officiels', 'Examen civique'], [['Naturalisation', h.eur(h.natFee), 'oui, prix du centre'], ['Nationalité par mariage', h.eur(h.P.marriage.fee), 'non'], ['Première carte de résident', h.eur(h.titleFee), 'oui, prix du centre'], ['Avec visa de régularisation', h.eur(h.P.fees.titleTotal + h.P.fees.visaRegularisation), 'oui, prix du centre']], 'Timbres et taxes officiels, hors frais variables.', ['l', 'r', 'l'])}
<p>La carte de résident coûte davantage en frais officiels, ${h.eur(h.P.fees.titleTimbre)} de droit de timbre et ${h.eur(h.P.fees.titleTax)} de taxe, et davantage encore pour qui est entré sans visa de long séjour. La naturalisation reste donc, à frais administratifs égaux, l’une des démarches les moins chères, à condition de réussir l’examen sans multiplier les passages. Le détail du timbre se trouve sur la fiche ${h.src('sp_timbre', 'service-public.gouv.fr du timbre fiscal')}.</p>`,
  },
  en: {
    slug: 'naturalisation-cost',
    nav: 'Naturalisation cost',
    card: 'Tax stamp, civic exam, French test, translations: the real budget for a citizenship application, with no made-up fees.',
    title: 'Naturalisation cost in France: stamp, exam and French test',
    description: 'Naturalisation cost in France: a €255 tax stamp (€127.50 in French Guiana), civic exam and French test priced by each centre, translations, household total.',
    h1: 'The cost of French naturalisation: a full budget',
    intro: 'Enter the number of applicants and the prices quoted by your centres: the tool adds the official stamp to the variable costs.',
    resume: (h) => `The cost of French naturalisation is one fixed administrative fee plus a handful of costs that depend on your situation. The fixed fee is the tax stamp of ${h.eur(h.natFee)} per application, reduced to ${h.eur(h.P.naturalisation.feeGuyane)} in French Guiana; filing online is free. Everything else has no national price list. The civic exam, compulsory for naturalisation, is charged by the approved centre where you sit it, at a price that varies from centre to centre, and every new attempt is paid again. A French test, TCF or TEF, is only needed if you hold no French diploma proving level ${h.P.language.nat}. Certified translations of foreign certificates complete the budget. By way of comparison, nationality through marriage costs the same ${h.eur(h.P.marriage.fee)} stamp with no civic exam. The tool above adds the official stamp to the prices you look up yourself, for one or more applicants, and never makes up a fee. Use it to see how much of your budget is set by law and how much depends on your own preparation and choices.`,
    faqs: (h) => [
      { q: 'We are a couple. Do we pay the stamp twice?', a: `The ${h.eur(h.P.naturalisation.fee)} stamp goes with each application. If both spouses apply for naturalisation, each files and pays a stamp, which is how the small tool on this page counts. For a household, multiply the stamp by the number of adult applicants, then add each person’s civic exam and, where needed, their French test.` },
      { q: 'I live abroad. How do I pay the fee?', a: 'According to service-public.gouv.fr, applicants living abroad pay the fee at the consulate instead of buying a tax stamp in France. The reference amount is the one set for naturalisation. Ask the consulate that covers your place of residence how payment works in practice before you put the file together.' },
      { q: 'Why is there no civic exam price on this site?', a: 'Because there is no national price: each approved centre sets its own. Quoting one figure would pass off a single centre’s price as a general rule. The tool lets you enter the price shown when you book, and how many sittings you plan for, so the total reflects your real situation.' },
    ],
    body: (h) => `
<h2>Cost lines</h2>
${h.table(['Item', 'Amount', 'Type'], [['Tax stamp', h.eur(h.P.naturalisation.fee), 'set by law'], ['Tax stamp, French Guiana', h.eur(h.P.naturalisation.feeGuyane), 'set by law'], ['Online filing', h.eur(0), 'free'], ['Civic exam', 'centre’s price', 'varies, per sitting'], ['French test (TCF or TEF)', 'centre’s price', 'only without a French diploma'], ['Certified translations', 'translator’s price', 'for foreign certificates']], `Stamp: service-public.gouv.fr, checked on ${h.date(h.P.retrieved_at)}. Other items have no national price.`, ['l', 'r', 'l'])}
<p>Only the first line is certain. The rest depend on your route: a French diploma removes the test, passing the civic exam first time saves a second fee, and certificates already in French need no translation. For many expats, translations are the line that surprises: birth and marriage certificates for each applicant can add up quickly.</p>
<h2>How the tool works it out</h2>
<p>It starts from the official stamp in our parameters and multiplies it by the number of applicants. It then adds, if you enter them, the civic exam price times the sittings you plan, the language test price and your translation total. Official fees and the costs you typed are shown apart, so you can see what the law sets and what depends on you. To budget cautiously, plan for two exam sittings until your mock scores sit well above ${h.need} out of ${h.size}.</p>
<h2>Keeping the bill down</h2>
<ul>
<li><strong>Prepare for free.</strong> The official lists, the ministry’s revision sheets and our ${h.a('examen-blanc', 'civic exam mock test')} cost nothing. A failed exam means paying again, so this is where preparation pays most.</li>
<li><strong>Compare centres.</strong> Our ${h.a('prix', 'civic exam price page')} explains where to find the prices of the two authorised bodies.</li>
<li><strong>Check your diplomas.</strong> A French diploma on the official list replaces the ${h.a('tcf-irn', 'French test')}.</li>
<li><strong>Skip intermediaries.</strong> Filing online is free; a private site charging to send your file adds nothing the official service does not already do.</li>
</ul>
<h2>A worked budget to build yourself</h2>
<p>Take a couple where only one partner holds a French diploma. The budget includes two stamps of ${h.eur(h.P.naturalisation.fee)}, so ${h.eur(h.P.naturalisation.fee * 2)}, two civic exam bookings at their centre’s price, one French test for the partner without a diploma, and translations of the birth and marriage certificates issued abroad. Enter those in the tool: it shows the total, the share per person and the split between official and variable costs. Then run it again with one extra exam sitting to see what a fail would cost.</p>
<h2>When each cost falls due</h2>
<p>The spending is spread out. The French test and the civic exam are paid when you book, often months before filing; translations are ordered while you build the file; the stamp is bought just before you send it. The official naturalisation page lists no other administrative fee after filing, neither for the interview nor for the decree. If you are budgeting a move to citizenship alongside a job change or a house purchase, that timeline helps you plan cash flow.</p>
<h2>How it compares</h2>
${h.table(['Application', 'Official fees', 'Civic exam'], [['Naturalisation', h.eur(h.natFee), 'yes, centre’s price'], ['Nationality through marriage', h.eur(h.P.marriage.fee), 'no'], ['First resident card', h.eur(h.titleFee), 'yes, centre’s price'], ['With regularisation visa fee', h.eur(h.P.fees.titleTotal + h.P.fees.visaRegularisation), 'yes, centre’s price']], 'Official stamps and taxes only, before variable costs.', ['l', 'r', 'l'])}
<p>A resident card costs more in official fees, ${h.eur(h.P.fees.titleTimbre)} in stamp duty plus ${h.eur(h.P.fees.titleTax)} in tax, and more again if you entered without a long-stay visa. In fee terms naturalisation is one of the cheaper applications, provided you pass the exam without repeated sittings. Details of the stamp are on the ${h.src('sp_timbre', 'service-public.gouv.fr tax stamp page')}.</p>`,
  },
});
