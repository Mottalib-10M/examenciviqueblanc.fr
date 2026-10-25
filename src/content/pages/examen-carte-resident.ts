import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'examen-carte-resident',
  group: 'examen',
  order: 41,
  tool: {"kind": "quiz", "props": {"mention": "cr", "mode": "exam"}},
  mini: {"kind": "mini:cryears"},
  related: ['carte-resident', 'longue-duree-ue', 'questions-cr', 'examen-csp', 'niveau-francais', 'prix'],
  sources: ['sp_exam_sejour', 'arrete_exam', 'sp_cr', 'sp_ldue', 'arrete_langue', 'fei_centres'],
  fr: {
    slug: 'examen-civique-carte-de-resident',
    nav: 'Examen civique carte de résident',
    card: 'L’épreuve de la mention carte de résident, chronométrée, et le calendrier pour la caser avant la demande de carte.',
    title: 'Examen civique carte de résident : épreuve et calendrier',
    description: 'Examen civique carte de résident : l’épreuve d’une première carte de dix ans, le niveau B1, les motifs concernés, les exemptions et un examen blanc noté.',
    h1: 'Examen civique pour la carte de résident : préparer et planifier',
    intro: 'Faites une épreuve blanche de la mention carte de résident, puis calculez quand votre motif de séjour vous permettra de déposer la demande.',
    resume: (h) => `L’examen civique de la carte de résident est l’épreuve, mention carte de résident, exigée depuis le ${h.date(h.P.exam.since)} pour obtenir une première carte de résident de ${h.P.residentCard.validityYears} ans. Il concerne notamment le conjoint de Français, le parent d’enfant français, le bénéficiaire du regroupement familial, le résident de longue durée-UE, y compris lorsque cette carte est demandée après un passeport talent ou une protection internationale, et la carte de résident permanent. L’épreuve compte ${h.size} questions en français, dure ${h.P.exam.minutes} minutes et se réussit avec ${h.need} bonnes réponses. S’y ajoute un niveau de français ${h.P.language.cr}. Ne la passent pas les demandeurs de plus de ${h.P.exam.exemptAgeOver} ans, les réfugiés pour la carte de résident « réfugié », ni les personnes qui renouvellent leur carte. L’attestation n’expire pas et vaut aussi pour une carte pluriannuelle. L’outil ci-dessus tire une épreuve complète de cette mention ; le mini-outil compte les années qui restent avant de pouvoir déposer selon votre motif.`,
    faqs: (h) => [
      { q: 'Faut-il repasser l’examen civique au renouvellement de la carte de résident ?', a: `Non. L’examen est exigé pour une première carte de résident, pas pour son renouvellement. La carte est valable ${h.P.residentCard.validityYears} ans ; en revanche, elle se perd après ${h.P.residentCard.lossAbroadYears} ans consécutifs passés hors de France. Si vous prévoyez une longue période à l’étranger, gardez cette règle en tête : l’attestation, elle, reste valable sans limite de durée.` },
      { q: 'Quand passer l’examen par rapport au dépôt de la demande ?', a: `Le plus tôt possible. L’attestation n’a pas de limite de validité, et chaque centre organise ses propres sessions. La passer quelques mois avant d’atteindre la durée de séjour exigée laisse le temps d’une seconde tentative si le seuil de ${h.need} n’est pas atteint, sans retarder le dossier.` },
      { q: 'Un réfugié doit-il passer l’examen pour la carte de résident ?', a: 'Pas pour la carte de résident délivrée au titre de la qualité de réfugié : elle n’est pas soumise à l’examen civique. En revanche, si cette personne demande la carte de résident de longue durée-UE, l’examen est exigé, y compris lorsque ce statut découle d’une protection internationale. Le motif exact de la carte décide donc de tout.' },
    ],
    body: (h) => `
<h2>Les pièces d’une première carte de résident</h2>
<p>La carte de résident est un titre de séjour de ${h.P.residentCard.validityYears} ans, renouvelable, qui ouvre une installation durable sans passer par la nationalité. Depuis le ${h.date(h.P.exam.since)}, une première carte suppose de réunir une durée de séjour, un niveau de français attesté et l’attestation de réussite à l’examen civique, en plus des conditions propres à chaque motif.</p>
${h.table(['Élément', 'Exigence pour une première carte'], [['Durée de séjour', 'selon le motif, voir le mini-outil'], ['Français', `niveau ${h.P.language.cr}`], ['Examen civique', `mention carte de résident, ${h.need} sur ${h.size}`], ['Timbres', `${h.eur(h.P.fees.titleTotal)} (${h.eur(h.P.fees.titleTimbre)} de droit de timbre et ${h.eur(h.P.fees.titleTax)} de taxe)`], ['Visa de régularisation', `${h.eur(h.P.fees.visaRegularisation)} en plus si entrée sans visa de long séjour`]], `Fiches F2208 et F39530 de service-public.gouv.fr, relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Les motifs et leurs durées sont détaillés sur la page ${h.a('carte-resident', 'carte de résident')}. Pour la longue durée-UE, la difficulté tient moins à l’examen qu’au décompte des absences : ${h.P.residentCard.ldueMaxConsecutiveMonths} mois consécutifs au plus et ${h.P.residentCard.ldueMaxTotalMonths} mois au total sur les ${h.P.residentCard.ldueYears} ans.</p>
<!--tool:mini:ldue-->
<h2>Une stratégie de calendrier</h2>
<ol>
<li>Calculez avec le mini-outil la date à laquelle votre durée de séjour sera atteinte.</li>
<li>Faites valider votre niveau ${h.P.language.cr} : diplôme français ou test de moins de ${h.P.language.attestationValidityYears} ans au moment du dépôt.</li>
<li>Inscrivez-vous à l’examen civique plusieurs mois avant cette date, auprès d’un centre agréé par l’un des deux organismes habilités.</li>
<li>Entraînez-vous jusqu’à dépasser régulièrement le seuil, puis passez l’épreuve ; en cas d’échec, réinscrivez-vous sans attendre.</li>
<li>Déposez la demande de carte avec l’attestation dès que la durée est atteinte.</li>
</ol>
<p>Cet ordre évite un écueil évitable : remplir toutes les conditions de séjour et devoir encore attendre une session d’examen, puis le résultat, avant de pouvoir déposer. Les centres de France Éducation international figurent sur leur ${h.src('fei_centres', 'carte des centres d’examen civique')} ; ceux de la CCI Paris Île-de-France sur son propre site.</p>
<h2>Ce qui distingue la mention carte de résident</h2>
<p>L’épreuve a le même format que les autres mentions et la même répartition des ${h.size} questions. Ce qui change, ce sont les questions de connaissance, tirées d’une liste propre, plus fournie sur les notions abstraites et les repères historiques. Vous pouvez la parcourir en entier, avec les réponses, sur la page ${h.a('questions-cr', 'questions de la carte de résident')}.</p>
<p>Un avantage pratique : l’attestation de cette mention vaut aussi pour une carte de séjour pluriannuelle. Une personne qui demandera d’abord une carte pluriannuelle, puis une carte de résident quelques années plus tard, peut préparer directement la mention la plus exigeante et ne passer l’examen qu’une fois.</p>
<h2>Les exemptions à connaître</h2>
<ul>
<li>Plus de ${h.P.exam.exemptAgeOver} ans : pas d’examen pour un titre de séjour.</li>
<li>Carte de résident « réfugié » : pas d’examen.</li>
<li>Renouvellement de la carte : pas d’examen.</li>
<li>Handicap ou état de santé : aménagements ou dispense sur certificat médical.</li>
</ul>
<p>Ces cas, et leurs limites, sont repris sur la page ${h.a('dispenses', 'dispenses de l’examen civique')}.</p>`,
  },
  en: {
    slug: 'resident-card-civic-exam',
    nav: 'Resident card civic exam',
    card: 'The resident card level paper, timed, and a timeline to fit it in before you apply for the card.',
    title: 'Resident card civic exam: the paper, B1 French and timing',
    description: 'Resident card civic exam: the test required for a first ten-year card, B1 French, which routes are covered, who is exempt, and a timed mock paper at this level.',
    h1: 'Civic exam for the French resident card: prepare and plan',
    intro: 'Take a mock paper at the resident card level, then work out when your route will let you file the application.',
    resume: (h) => `The resident card civic exam is the test, at the resident card level, required since ${h.date(h.P.exam.since)} for a first ${h.P.residentCard.validityYears}-year resident card (carte de résident) in France. It covers, among others, spouses of French citizens, parents of French children, family reunification, EU long-term residents, including those whose status follows a talent passport or international protection, and the permanent resident card. The paper has ${h.size} questions in French only, lasts ${h.P.exam.minutes} minutes and you pass with ${h.need} correct answers. French at level ${h.P.language.cr} is required as well. Applicants over ${h.P.exam.exemptAgeOver}, refugees applying for the refugee resident card and people renewing their card do not sit it. The certificate never expires and also counts for a multi-year permit. The tool above draws a full paper at this level, with the English wording to help you learn, and the small tool counts the years left before your route lets you apply.`,
    faqs: (h) => [
      { q: 'Do I need to retake the civic exam when renewing my resident card?', a: `No. The exam is required for a first resident card, not for renewals. The card lasts ${h.P.residentCard.validityYears} years, but it is lost after ${h.P.residentCard.lossAbroadYears} consecutive years outside France. If you plan a long spell abroad, keep that rule in mind; the certificate itself stays valid with no time limit.` },
      { q: 'When should I sit the exam compared with my application?', a: `As early as you can. The certificate has no expiry date, and each centre runs its own sessions. Sitting it a few months before you reach the required length of stay leaves time for a second attempt if you fall short of ${h.need}, without delaying your file.` },
      { q: 'Do refugees have to sit the civic exam for a resident card?', a: 'Not for the resident card granted on the basis of refugee status, which is outside the exam. If the same person applies for the EU long-term resident card, though, the exam is required, even when that status follows international protection. The exact basis of the card decides everything.' },
    ],
    body: (h) => `
<h2>What a first resident card requires</h2>
<p>The resident card is a renewable ${h.P.residentCard.validityYears}-year residence permit that lets you settle for the long term without taking French nationality. Since ${h.date(h.P.exam.since)}, a first card requires a length of stay, certified French and a civic exam pass certificate, on top of the conditions specific to each route. For many expats it is the natural step after one or more multi-year permits.</p>
${h.table(['Item', 'Requirement for a first card'], [['Length of stay', 'depends on the route, see the small tool'], ['French', `level ${h.P.language.cr}`], ['Civic exam', `resident card level, ${h.need} of ${h.size}`], ['Stamps', `${h.eur(h.P.fees.titleTotal)} (${h.eur(h.P.fees.titleTimbre)} stamp duty and ${h.eur(h.P.fees.titleTax)} tax)`], ['Regularisation visa', `${h.eur(h.P.fees.visaRegularisation)} on top if you entered without a long-stay visa`]], `service-public.gouv.fr pages F2208 and F39530, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Routes and periods are set out on the ${h.a('carte-resident', 'French resident card')} page. For the EU long-term card, the harder part is usually counting time abroad rather than the exam: ${h.P.residentCard.ldueMaxConsecutiveMonths} consecutive months at most and ${h.P.residentCard.ldueMaxTotalMonths} months in total over the ${h.P.residentCard.ldueYears} years. Expats who travel often for work should check this first.</p>
<!--tool:mini:ldue-->
<h2>A timeline that works</h2>
<ol>
<li>Use the small tool to find when you will meet the length-of-stay condition.</li>
<li>Get your ${h.P.language.cr} French certified: a French diploma or a test less than ${h.P.language.attestationValidityYears} years old when you file.</li>
<li>Book the civic exam several months before that date at a centre approved by one of the two authorised bodies.</li>
<li>Practise until you clear the mark consistently, in French, then sit the exam; if you fail, book again straight away.</li>
<li>File the card application with the certificate as soon as the period is met.</li>
</ol>
<p>This order avoids an easy-to-miss snag: meeting every residence condition and then still having to wait for an exam session, then the result, before you can file. If you live abroad for part of the year, check whether a centre near you abroad runs the exam. France Éducation international lists its centres on a ${h.src('fei_centres', 'map of civic exam centres')}; the Paris Île-de-France Chamber of Commerce lists its own on its site.</p>
<h2>What sets the resident card level apart</h2>
<p>The paper has the same format and mix of ${h.size} questions as the other levels. What changes is the knowledge questions, drawn from their own list, which goes further into abstract notions and historical landmarks. You can read it in full, with answers, on the ${h.a('questions-cr', 'resident card questions')} page.</p>
<p>One practical advantage: a certificate at this level also counts for a multi-year permit. If you expect to apply for a multi-year permit first and a resident card later, you can prepare for the harder level straight away and sit the exam once.</p>
<h2>Exemptions to know</h2>
<ul>
<li>Over ${h.P.exam.exemptAgeOver}: no exam for a residence permit.</li>
<li>Refugee resident card: no exam.</li>
<li>Renewing the card: no exam.</li>
<li>Disability or health condition: adjustments or exemption on a medical certificate.</li>
</ul>
<p>These cases and their limits are covered on the ${h.a('dispenses', 'civic exam exemptions')} page.</p>`,
  },
});
