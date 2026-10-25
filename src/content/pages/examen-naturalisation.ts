import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'examen-naturalisation',
  group: 'examen',
  order: 40,
  tool: {"kind": "quiz", "props": {"mention": "nat", "mode": "exam"}},
  mini: {"kind": "mini:level", "props": {"t": 2}},
  related: ['naturalisation', 'conditions', 'entretien', 'livret', 'cout-naturalisation', 'dispenses'],
  sources: ['sp_exam_nat', 'arrete_exam', 'sp_nat', 'arrete_dispense', 'arrete_livret', 'charte'],
  fr: {
    slug: 'examen-civique-naturalisation',
    nav: 'Examen civique naturalisation',
    card: 'L’épreuve de la mention naturalisation en conditions réelles, et sa place parmi les preuves d’assimilation du dossier.',
    title: 'Examen civique naturalisation : mention, niveau B2, dossier',
    description: 'Examen civique naturalisation : la mention exigée depuis 2026 pour devenir Français par décret, avec le B2, l’entretien d’assimilation et une épreuve blanche.',
    h1: 'Examen civique de la naturalisation : l’épreuve et le dossier',
    intro: 'Passez une épreuve blanche de la mention naturalisation, puis voyez comment l’attestation s’insère dans le dossier de demande de nationalité.',
    resume: (h) => `L’examen civique de la naturalisation est l’épreuve, mention naturalisation, que doit réussir tout étranger qui demande la nationalité française par décret, ou sa réintégration, depuis le ${h.date(h.P.exam.since)}. Son format ne diffère pas des autres mentions : ${h.size} questions à choix multiples en français, ${h.P.exam.minutes} minutes, ${h.need} bonnes réponses exigées. Il ne remplace rien : il s’ajoute au niveau de français ${h.P.language.nat}, à l’entretien d’assimilation en préfecture et à la signature de la charte des droits et devoirs du citoyen français. Aucune dispense liée à l’âge n’existe pour cette mention, contrairement aux titres de séjour ; seuls un handicap ou un état de santé attestés par certificat médical ouvrent droit à des aménagements ou à une dispense. La nationalité par mariage, obtenue par déclaration, n’est pas concernée. L’outil ci-dessus tire une épreuve complète de la mention naturalisation, chronométrée et notée au seuil réel ; le mini-outil indique le niveau de français et la mention attendus selon votre démarche et votre âge.`,
    faqs: (h) => [
      { q: 'L’examen civique remplace-t-il l’entretien d’assimilation ?', a: 'Non, les deux coexistent. L’attestation de réussite à l’examen civique se joint au dossier ; l’entretien d’assimilation est un échange oral en préfecture. L’examen mesure des connaissances de base sur un programme fixe, avec des réponses fermées ; l’entretien permet d’apprécier l’assimilation de façon plus large, à partir de votre parcours. Préparer l’un aide pour l’autre.' },
      { q: 'Un candidat de plus de 65 ans est-il dispensé de l’examen pour la naturalisation ?', a: `Non. La dispense liée à l’âge, au-delà de ${h.P.exam.exemptAgeOver} ans, vaut seulement pour les titres de séjour. Pour la naturalisation, l’examen est exigé quel que soit l’âge. Seul un handicap ou un état de santé attesté par un certificat médical peut conduire à des aménagements ou à une dispense, selon l’arrêté du 30 décembre 2025.` },
      { q: 'Quelle mention choisir si je demande la réintégration dans la nationalité ?', a: 'La mention naturalisation. La réintégration par décret, qui concerne les personnes ayant perdu la nationalité française, est soumise à l’examen civique au même titre que la naturalisation. Les déclarations de nationalité, par mariage ou en tant qu’ascendant ou frère ou sœur de Français, n’exigent en revanche aucun examen civique.' },
      { q: 'Peut-on passer l’examen civique avant d’avoir la durée de résidence requise ?', a: `Oui. L’attestation n’a pas de limite de durée de validité : elle reste utilisable le jour où vous remplirez la condition de ${h.P.naturalisation.residenceYears} ans de résidence habituelle, ou de ${h.P.naturalisation.reducedYears} ans dans les cas de réduction. La passer tôt laisse le temps de la repasser en cas d’échec, sans retarder le dépôt du dossier.` },
    ],
    body: (h) => `
<h2>Où se place l’examen dans la naturalisation</h2>
<p>La naturalisation par décret n’est pas un droit : l’administration apprécie l’ensemble du dossier. Parmi les conditions, l’assimilation à la communauté française se vérifie désormais par plusieurs pièces et étapes, dont l’examen civique n’est qu’une partie.</p>
${h.table(['Exigence', 'Ce qu’il faut savoir'], [['Âge', `${h.P.naturalisation.minAge} ans, dépôt possible dès ${h.P.naturalisation.fileFromAge} ans`], ['Résidence habituelle en France', `${h.P.naturalisation.residenceYears} ans en règle générale, ${h.P.naturalisation.reducedYears} ans dans certains cas`], ['Français', `niveau ${h.P.language.nat}`], ['Examen civique', `mention naturalisation, ${h.need} bonnes réponses sur ${h.size}`], ['Entretien', 'entretien d’assimilation en préfecture'], ['Charte', 'signature de la charte des droits et devoirs du citoyen français'], ['Timbre fiscal', h.eur(h.natFee)]], `Fiche F2213 de service-public.gouv.fr et code civil, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Le détail de chaque condition, des durées réduites aux ressources, figure sur la page ${h.a('conditions', 'conditions de la naturalisation')}. Retenez ici que l’attestation d’examen civique n’a pas de limite de validité : rien n’empêche de la passer bien avant de constituer le reste du dossier.</p>
<h2>Ce que l’épreuve vérifie chez un futur Français</h2>
<p>Le programme est le même référentiel que pour les autres mentions, réparti en cinq thématiques. Le ministère a publié des listes de questions de connaissance pour la carte pluriannuelle et pour la carte de résident ; notre tirage de la mention naturalisation puise dans la seconde et privilégie ${h.num(h.count.nat)} intitulés que le ministère pose aussi à ce niveau. Les ${h.P.exam.situations} mises en situation complètent l’épreuve, sur les principes de la République et sur les droits et devoirs.</p>
<p>Pour un candidat à la nationalité, certaines notions prennent un relief particulier : le droit de vote et les élections, que vous exercerez une fois Français, la devise et les symboles, que vous serez appelé à respecter, la laïcité et l’égalité entre les femmes et les hommes, souvent abordées aussi lors de l’entretien. Le ${h.a('livret', 'livret du citoyen')}, approuvé par l’arrêté du 3 juillet 2026, fait partie des repères de la procédure d’assimilation ; sa page en présente le contenu et l’usage.</p>
<h2>Examen civique et entretien : deux préparations qui se répondent</h2>
<ul>
<li>L’examen se passe dans un centre agréé, sur ordinateur, avec des réponses fermées.</li>
<li>L’${h.a('entretien', 'entretien d’assimilation')} se déroule en préfecture, à l’oral, et part de votre situation personnelle.</li>
<li>Les connaissances acquises pour l’un servent directement à l’autre : histoire, institutions, valeurs.</li>
<li>La charte des droits et devoirs du citoyen français, publiée sur ${h.src('charte', 'Légifrance')}, est signée en fin de procédure : la lire tôt évite toute surprise.</li>
</ul>
<h2>Le coût de la démarche</h2>
<p>Le timbre fiscal de la naturalisation s’élève à ${h.eur(h.natFee)} par demandeur, ${h.eur(h.P.naturalisation.feeGuyane)} en Guyane. L’examen civique se paie à part, au centre de passation, qui fixe librement son prix ; le test de français aussi, si vous n’avez pas de diplôme français suffisant. La page ${h.a('cout-naturalisation', 'coût de la naturalisation')} additionne ces postes.</p>
<!--tool:mini:natfee-->
<h2>Après la réussite</h2>
<p>L’attestation n’a pas de limite de validité : vous pouvez la passer avant d’avoir réuni le reste du dossier. La décision sur la naturalisation intervient dans les ${h.P.naturalisation.decisionMonths} mois suivant le récépissé de dossier complet, ${h.P.naturalisation.decisionMonthsLongResident} mois si vous résidez en France depuis au moins ${h.P.naturalisation.longResidentYears} ans. Les cas de dispense médicale sont détaillés sur la page ${h.a('dispenses', 'dispenses de l’examen civique')}.</p>`,
  },
  en: {
    slug: 'naturalisation-civic-exam',
    nav: 'Naturalisation civic exam',
    card: 'The naturalisation-level paper in real conditions, and where its certificate fits in a citizenship application.',
    title: 'Naturalisation civic exam: B2 French, interview, the paper',
    description: 'Naturalisation civic exam: the level required since 2026 to become French by decree, alongside B2 French and the assimilation interview, with a mock paper.',
    h1: 'The naturalisation civic exam for French citizenship',
    intro: 'Sit a mock paper at the naturalisation level, then see how the certificate fits into a French citizenship application.',
    resume: (h) => `The naturalisation civic exam is the test, at the naturalisation level, that every foreign national applying for French citizenship by decree, or for reinstatement, has had to pass since ${h.date(h.P.exam.since)}. The format is the same as the other levels: ${h.size} multiple-choice questions in French only, ${h.P.exam.minutes} minutes, ${h.need} correct answers needed. It replaces nothing. It comes on top of French at level ${h.P.language.nat}, an assimilation interview at the préfecture and the signing of the charter of the rights and duties of the French citizen. There is no age exemption at this level, unlike for residence permits; only a disability or health condition certified by a doctor can lead to adjustments or an exemption. Citizenship through marriage, obtained by declaration, does not require the exam. The tool above draws a full naturalisation-level paper, timed and marked at the real pass mark, and the small tool checks which French level and exam level apply to your application and age.`,
    faqs: (h) => [
      { q: 'Does the civic exam replace the citizenship interview?', a: 'No, you need both. The pass certificate goes into your application file; the assimilation interview is a spoken exchange at the préfecture. The exam measures basic knowledge on a fixed syllabus with closed answers, while the interview looks at your integration more broadly, starting from your own story. Preparing for one helps with the other.' },
      { q: 'Is there an age exemption for the naturalisation civic exam?', a: `No. The exemption for people over ${h.P.exam.exemptAgeOver} applies only to residence permits. For naturalisation the exam is required at any age. Only a disability or health condition certified by a doctor can lead to adjustments or an exemption, under the order of 30 December 2025.` },
      { q: 'Can I sit the naturalisation civic exam outside France?', a: 'Some centres abroad, such as French institutes and Alliances françaises, run the civic exam, depending on what each centre offers. Check the centre maps of the two authorised bodies. The paper is the same as in France, in French only, and the certificate has no expiry date, so you can sit it before you move or apply.' },
    ],
    body: (h) => `
<h2>Where the exam fits in a citizenship application</h2>
<p>Naturalisation by decree is not an entitlement: the authorities weigh the whole file. Integration into the French community, called assimilation, is now checked through several documents and steps, and the civic exam is only one of them.</p>
${h.table(['Requirement', 'What to know'], [['Age', `${h.P.naturalisation.minAge}, with filing possible from ${h.P.naturalisation.fileFromAge}`], ['Habitual residence in France', `${h.P.naturalisation.residenceYears} years as a rule, ${h.P.naturalisation.reducedYears} in some cases`], ['French', `level ${h.P.language.nat}`], ['Civic exam', `naturalisation level, ${h.need} correct out of ${h.size}`], ['Interview', 'assimilation interview at the préfecture'], ['Charter', 'signing the charter of the rights and duties of the French citizen'], ['Tax stamp', h.eur(h.natFee)]], `service-public.gouv.fr page F2213 and the Civil Code, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Each condition, from shortened periods to income, is detailed on the ${h.a('conditions', 'naturalisation requirements')} page. The point here is that the civic exam certificate has no expiry date, so nothing stops you from sitting it well before you put the rest of the file together.</p>
<h2>What the paper checks in a future citizen</h2>
<p>The syllabus is the same as for the other levels, across five themes. The ministry has published knowledge question lists for the multi-year permit and the resident card; our naturalisation-level draw uses the latter and favours ${h.num(h.count.nat)} stems that the ministry also asks at this level. The ${h.P.exam.situations} scenario questions complete the paper.</p>
<p>For someone about to become French, some notions carry extra weight: voting and elections, which you will take part in; the motto and symbols; secularism and equality between women and men, which often come up again at the interview. The ${h.a('livret', 'citizen\'s booklet')}, approved by the order of 3 July 2026, is one of the reference points of the assimilation process; its page explains what it contains and how it is used.</p>
<h2>Exam and interview: two kinds of preparation</h2>
<ul>
<li>The exam is taken in an approved centre, on a computer, with closed answers, in French.</li>
<li>The ${h.a('entretien', 'assimilation interview')} takes place at the préfecture, spoken, and starts from your personal situation.</li>
<li>What you learn for one serves the other: history, institutions, values.</li>
<li>The charter of the rights and duties of the French citizen, published on ${h.src('charte', 'Légifrance')}, is signed at the end: reading it early avoids surprises.</li>
</ul>
<h2>What it costs</h2>
<p>The naturalisation tax stamp is ${h.eur(h.natFee)} per applicant, ${h.eur(h.P.naturalisation.feeGuyane)} in French Guiana. The civic exam is paid separately to the test centre, which sets its own price, and so is the French test if you have no qualifying French diploma. The ${h.a('cout-naturalisation', 'naturalisation cost')} page adds these up.</p>
<!--tool:mini:natfee-->
<h2>After you pass</h2>
<p>The certificate never expires, so you can sit the exam before the rest of your file is ready. The decision on naturalisation is due within ${h.P.naturalisation.decisionMonths} months of the receipt for a complete file, or ${h.P.naturalisation.decisionMonthsLongResident} months if you have lived in France for at least ${h.P.naturalisation.longResidentYears} years. Medical exemptions are covered on the ${h.a('dispenses', 'civic exam exemptions')} page.</p>`,
  },
});
