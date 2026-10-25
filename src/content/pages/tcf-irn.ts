import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tcf-irn',
  group: 'langue',
  order: 101,
  tool: { kind: 'level', props: { title: 'nat' } },
  mini: { kind: 'mini:level', props: { t: 2 } },
  related: ['niveau-francais', 'naturalisation', 'demande-nationalite', 'quel-examen', 'cout-naturalisation'],
  sources: ['sp_langue', 'arrete_langue', 'fei_centres', 'sp_exam_nat'],
  fr: {
    slug: 'tcf-irn',
    nav: 'TCF IRN',
    card: 'Le test de France Éducation international pour l’intégration, la résidence et la nationalité : quel niveau viser et quand le passer.',
    title: 'TCF IRN : quel niveau viser pour la carte ou la nationalité',
    description: 'TCF IRN, test de français pour la résidence et la nationalité : niveau à atteindre selon la démarche, validité de 2 ans, diplômes et TEF qui le remplacent.',
    h1: 'TCF IRN : le test de français des démarches de séjour et de nationalité',
    intro: 'Choisissez votre démarche : l’outil vous dit quel niveau votre attestation TCF IRN devra afficher et si l’examen civique s’y ajoute.',
    resume: (h) => `Le TCF IRN est la version du Test de connaissance du français (TCF) que France Éducation international propose pour l’intégration, la résidence et la nationalité. Il sert à prouver le niveau de langue exigé par l’administration : ${h.P.language.csp} pour une première carte de séjour pluriannuelle, ${h.P.language.cr} pour une première carte de résident ou une carte de résident de longue durée-UE, ${h.P.language.nat} pour la naturalisation et pour la nationalité par mariage. Son attestation doit dater de moins de ${h.P.language.attestationValidityYears} ans au moment du dépôt du dossier. Ce n’est pas le seul moyen de prouver son français : un diplôme français, comme le brevet ou un diplôme de niveau 3 et plus, en dispense, et le TEF de la CCI Paris Île-de-France est aussi admis. Les épreuves, leur durée et leur prix relèvent de l’organisme et des centres : ce site ne les reproduit pas. L’outil ci-dessus indique, pour votre démarche, le niveau que votre attestation devra afficher et l’examen civique qui s’y ajoute.`,
    faqs: (h) => [
      { q: 'TCF IRN ou TEF : lequel choisir pour un dossier de préfecture ?', a: 'Les deux sont admis comme test linguistique par la fiche service-public.gouv.fr sur le niveau de français : le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France. Le choix se fait donc surtout sur les dates disponibles et la proximité du centre. Ce qui compte pour la préfecture, c’est le niveau imprimé sur l’attestation et sa date.' },
      { q: 'À quel moment passer le TCF IRN avant une naturalisation ?', a: `L’attestation doit avoir moins de ${h.P.language.attestationValidityYears} ans le jour du dépôt. Calculez d’abord votre date d’éligibilité avec l’outil de la page naturalisation, puis placez le test dans les mois qui la précèdent. Passé trop tôt, le test expire avant que vous puissiez déposer ; passé trop tard, il retarde le dépôt si le niveau n’est pas atteint du premier coup.` },
      { q: 'Faut-il passer le TCF IRN si l’on a un diplôme français ?', a: `En général non. Un diplôme français figurant sur la liste officielle, comme le brevet ou un diplôme de niveau 3 et plus, prouve le niveau de langue sans limite de date. Le test devient utile si votre diplôme n’est pas sur la liste ou si vous n’en avez pas. Vérifiez la liste sur service-public.gouv.fr avant de payer un test inutile.` },
      { q: 'Le TCF IRN remplace-t-il l’examen civique ?', a: `Non. Le TCF IRN mesure votre niveau de français ; l’examen civique vérifie la connaissance des valeurs, des institutions et de la vie en France, avec un seuil de ${h.need} bonnes réponses sur ${h.size}. Pour une première carte pluriannuelle, une première carte de résident ou la naturalisation, il faut les deux attestations. Seule la nationalité par mariage demande le niveau de langue sans examen civique.` },
    ],
    body: (h) => `
<h2>Ce que le TCF IRN permet de prouver</h2>
<p>Le sigle se lit en trois mots : intégration, résidence, nationalité. Ce sont les trois familles de démarches pour lesquelles la préfecture demande une preuve de français. Le TCF IRN ne donne pas une note de réussite ou d’échec : il situe le candidat sur l’échelle des niveaux, et c’est ce niveau que l’agent compare à celui qu’exige votre demande. Un même test peut donc servir à une carte de résident aujourd’hui et, s’il affiche un niveau suffisant et qu’il est encore récent, à une naturalisation demain.</p>
<h2>Le niveau à viser selon la démarche</h2>
${h.table(['Démarche', 'Niveau à obtenir', 'Examen civique en plus'], [['Première carte de séjour pluriannuelle', h.P.language.csp, 'oui'], ['Première carte de résident', h.P.language.cr, 'oui'], ['Carte de résident de longue durée-UE', h.P.language.cr, 'oui'], ['Naturalisation', h.P.language.nat, 'oui'], ['Nationalité par mariage', h.P.language.marriage, 'non']], `Niveaux de la fiche service-public.gouv.fr sur le français et de l’arrêté du 22 décembre 2025, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Si votre projet est la nationalité, visez directement ${h.P.language.nat} : une attestation de ce niveau couvre aussi une carte de résident demandée entre-temps, alors qu’un ${h.P.language.cr} vous obligerait à repasser le test. Notre page sur le ${h.a('niveau-francais', 'niveau de français exigé')} reprend la règle pour chaque titre.</p>
<h2>La règle des ${h.P.language.attestationValidityYears} ans</h2>
<p>Le résultat doit dater de moins de ${h.P.language.attestationValidityYears} ans le jour où le dossier est déposé, pas le jour où il est examiné. C’est la principale cause d’attestation refusée : un test passé « pour être prêt » longtemps avant l’éligibilité expire avant le dépôt. La bonne méthode part de la date de dépôt possible, que l’outil de la page ${h.a('naturalisation', 'naturalisation')} calcule, et remonte de quelques mois pour laisser le temps de repasser le test si le niveau n’est pas atteint.</p>
<h2>Les autres preuves admises</h2>
<ul>
<li><strong>Un diplôme français</strong> : le brevet, un diplôme de niveau 3 et plus ou un autre diplôme de la liste officielle. Il n’expire pas.</li>
<li><strong>Le TEF de la CCI Paris Île-de-France</strong> : un autre test reconnu, soumis à la même règle d’ancienneté.</li>
<li><strong>Une dispense</strong> : raison médicale attestée, ou, pour la naturalisation, réfugié ou apatride de plus de ${h.P.language.natExemptRefugeeAge} ans résidant en France depuis ${h.P.language.natExemptRefugeeYears} ans.</li>
</ul>
<h2>Ce que ce site ne vous dira pas</h2>
<p>Nous ne décrivons ni les épreuves du TCF IRN, ni leur durée, ni leur tarif. Ces éléments relèvent de France Éducation international et de ses centres agréés, et nous n’avons pas pu les vérifier à la source au moment de la rédaction. Plutôt que de recopier des informations de seconde main, nous renvoyons au ${h.src('fei_centres', 'site de France Éducation international')}, qui présente aussi la carte de ses centres d’examen civique. Méfiez-vous des pages qui annoncent un format ou un prix sans citer l’organisme.</p>
<h2>Avant de réserver une session</h2>
<ol>
<li>Vérifiez que vous n’avez pas déjà un diplôme français qui vous dispense du test.</li>
<li>Notez le niveau exigé par votre démarche, et visez plutôt celui de l’étape suivante si vous comptez la franchir.</li>
<li>Calculez votre date de dépôt et placez le test dans les mois qui la précèdent, jamais plus de ${h.P.language.attestationValidityYears} ans avant.</li>
<li>Gardez l’attestation originale : elle part avec le dossier, au même titre que l’attestation d’examen civique.</li>
</ol>
<h2>Test de langue et examen civique, deux épreuves distinctes</h2>
<p>France Éducation international conçoit le TCF et fait aussi partie des deux organismes habilités à organiser l’examen civique, avec la CCI Paris Île-de-France. Les deux épreuves restent séparées : inscription, convocation et attestation propres à chacune. Pour l’examen civique, entraînez-vous sur l’${h.a('examen-blanc', 'examen civique blanc')} : il reprend la grille officielle de ${h.size} questions et le seuil de ${h.need}.</p>`,
  },
  en: {
    slug: 'tcf-irn-french-test',
    nav: 'TCF IRN test',
    card: 'France Éducation international’s test for integration, residence and nationality: which level to aim for and when to sit it.',
    title: 'TCF IRN test: the level you need for a permit or citizenship',
    description: 'TCF IRN, the French test for residence and nationality files: the level each application needs, the 2-year validity rule and the proof that replaces it.',
    h1: 'TCF IRN: the French test behind residence and citizenship files',
    intro: 'Pick your application: the tool tells you which level your TCF IRN result must show and whether the civic exam comes on top.',
    resume: (h) => `The TCF IRN is the version of the Test de connaissance du français (TCF) that France Éducation international offers for integration, residence and nationality (intégration, résidence, nationalité). Préfectures use it to check the French level an application requires: ${h.P.language.csp} for a first multi-year residence permit, ${h.P.language.cr} for a first resident card or an EU long-term resident card, and ${h.P.language.nat} for naturalisation and for nationality through marriage. The result must be less than ${h.P.language.attestationValidityYears} years old on the day you file. It is not the only way to prove your French: a French diploma such as the brevet, or a qualification at level 3 or above, makes it unnecessary, and the TEF from the Paris Île-de-France Chamber of Commerce is accepted too. The test papers, their length and their price are set by the organiser and its centres, and this site does not reproduce them. The tool above shows the level your result must reach for your application and whether the civic exam is required as well.`,
    faqs: (h) => [
      { q: 'Should an expat pick the TCF IRN or the TEF?', a: 'Both are listed as accepted tests on the service-public.gouv.fr page about proving French: the TCF from France Éducation international and the TEF from the Paris Chamber of Commerce. In practice, choose on available dates and how close the centre is. The préfecture only looks at the level printed on your result and its date.' },
      { q: 'How far ahead of my citizenship application should I sit the test?', a: `The result must be under ${h.P.language.attestationValidityYears} years old when you file. Work out your eligibility date first with the tool on our naturalisation page, then book the test a few months before it. Too early and it expires before you can apply; too late and a missed level holds up your file while you retake it.` },
      { q: 'Where do I find TCF IRN dates and centres?', a: 'On the France Éducation international website, which is the organiser of the TCF. We keep no list of our own for test centres, session dates or prices: they change from one centre to the next and from one season to another, and a copied list would soon be wrong. Book directly with an approved centre and keep the confirmation with your file.' },
    ],
    body: (h) => `
<h2>What the TCF IRN proves</h2>
<p>The three letters stand for the three kinds of application that need proof of French: integration, residence and nationality. The test does not hand you a pass or a fail. It places you on the scale of levels, and the préfecture compares that level with the one your application needs. One result can therefore back a resident card now and, if it is high enough and still recent, a citizenship file later.</p>
<h2>Which level to aim for</h2>
${h.table(['Application', 'Level to reach', 'Civic exam too'], [['First multi-year residence permit', h.P.language.csp, 'yes'], ['First resident card', h.P.language.cr, 'yes'], ['EU long-term resident card', h.P.language.cr, 'yes'], ['Naturalisation', h.P.language.nat, 'yes'], ['Nationality through marriage', h.P.language.marriage, 'no']], `Levels from the service-public.gouv.fr page on French and the order of 22 December 2025, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>If citizenship is where you are heading, go straight for ${h.P.language.nat}. That one result also covers a resident card on the way, whereas a ${h.P.language.cr} would send you back to the test centre. Our page on the ${h.a('niveau-francais', 'French level for each permit')} sets the rule out in full.</p>
<h2>The ${h.P.language.attestationValidityYears}-year rule</h2>
<p>What counts is the date you file, not the date someone reads your file. This is the most common reason a result is turned down: people sit the test early "to get it out of the way" and it has expired by the time they are eligible. Start from your earliest filing date, which the ${h.a('naturalisation', 'naturalisation date tool')} works out, and count back a few months so there is room for a retake.</p>
<h2>Other accepted proof</h2>
<ul>
<li><strong>A French diploma</strong>: the brevet, a qualification at level 3 or above, or another diploma on the official list. It never expires.</li>
<li><strong>The TEF</strong> from the Paris Île-de-France Chamber of Commerce, under the same age rule.</li>
<li><strong>An exemption</strong>: certified medical grounds, or, for naturalisation, a refugee or stateless person over ${h.P.language.natExemptRefugeeAge} who has lived in France for ${h.P.language.natExemptRefugeeYears} years.</li>
</ul>
<h2>What we deliberately leave out</h2>
<p>You will not find the TCF IRN papers, timings or fees here. They belong to France Éducation international and its approved centres, and we could not check them at the source when writing. Rather than repeat second-hand figures, we point you to the ${h.src('fei_centres', 'France Éducation international website')}, which also maps its civic exam centres. Be wary of any page quoting a format or price without naming the organiser.</p>
<h2>A checklist before you book</h2>
<ol>
<li>Check whether a French diploma you already hold makes the test unnecessary.</li>
<li>Note the level your application needs, and aim for the next step up if you plan to take it.</li>
<li>Work out your filing date and book the test in the months just before it, never more than ${h.P.language.attestationValidityYears} years ahead.</li>
<li>Keep the original result safe: it goes into your file next to the civic exam certificate.</li>
</ol>
<p>For many expats the hard part is not the test itself but the timing. A resident card and a citizenship file can be a few years apart, and a single well-timed result at the higher level can serve both if the dates line up.</p>
<h2>Language test and civic exam are two different things</h2>
<p>France Éducation international writes the TCF and is also one of the two bodies authorised to run the civic exam, alongside the Paris Chamber of Commerce. The two remain separate, each with its own booking and certificate. For the civic exam, practise on our ${h.a('examen-blanc', 'mock test')}, built on the official ${h.size}-question grid and the pass mark of ${h.need}.</p>`,
  },
});
