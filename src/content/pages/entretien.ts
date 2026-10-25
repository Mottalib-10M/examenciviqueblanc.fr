import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'entretien',
  group: 'nationalite',
  order: 114,
  tool: { kind: 'quiz', props: { mention: 'nat', mode: 'practice' } },
  mini: { kind: 'mini:decision' },
  related: ['livret', 'examen-naturalisation', 'conditions', 'demande-nationalite', 'delai', 'theme-1'],
  sources: ['sp_nat', 'code_civil_nat', 'charte', 'arrete_livret', 'sp_exam_nat'],
  fr: {
    slug: 'entretien-naturalisation',
    nav: 'Entretien de naturalisation',
    card: 'L’entretien d’assimilation en préfecture : quand il arrive, ce qu’il vérifie, quoi apporter et comment s’y préparer.',
    title: 'Entretien de naturalisation : préparer l’assimilation',
    description: 'Entretien de naturalisation en préfecture : convocation, ce que vérifie l’assimilation, originaux à apporter, charte à signer et questions d’entraînement.',
    h1: 'Entretien de naturalisation : comment se préparer à l’assimilation',
    intro: 'Entraînez-vous sur les questions de la mention naturalisation, corrigées une à une : ce sont les notions sur lesquelles repose aussi l’entretien.',
    resume: (h) => `L’entretien de naturalisation, appelé entretien d’assimilation, est l’étape où la préfecture rencontre le candidat pour vérifier son assimilation à la communauté française. La convocation n’arrive que si la demande est jugée recevable, après le dépôt du dossier complet et le récépissé. Le code civil fixe ce qui est attendu : une connaissance suffisante, selon sa condition, de la langue, de l’histoire, de la culture et de la société françaises, la connaissance des droits et devoirs du citoyen et l’adhésion aux principes et valeurs de la République. Pour s’y préparer, l’administration renvoie au livret du citoyen, dont la version en vigueur a été approuvée en juillet 2026. Le candidat apporte les originaux des documents listés sur sa convocation ; une absence sans raison légitime peut conduire au classement sans suite de la demande. À la fin de l’entretien, il signe la charte des droits et devoirs du citoyen français. Depuis le ${h.date(h.P.exam.since)}, l’examen civique s’y ajoute. L’outil ci-dessus entraîne aux questions de la mention naturalisation, avec une correction immédiate.`,
    faqs: (h) => [
      { q: 'Quels documents apporter à l’entretien de naturalisation ?', a: 'Les originaux des documents indiqués sur votre convocation : c’est la seule liste qui fait foi pour votre rendez-vous. Elle reprend en général des pièces déjà envoyées en copie lors du dépôt. Préparez-les la veille, dans l’ordre de la convocation, avec les traductions certifiées des actes étrangers, et vérifiez que votre titre de séjour est toujours valide.' },
      { q: 'L’entretien d’assimilation remplace-t-il l’examen civique ?', a: `Non, les deux coexistent depuis 2026. L’examen civique est une épreuve écrite de ${h.size} questions passée dans un centre agréé, dont l’attestation accompagne le dossier. L’entretien se déroule ensuite en préfecture, si la demande est recevable. Réussir l’examen ne dispense pas de l’entretien, et l’entretien ne remplace pas l’attestation d’examen.` },
      { q: 'Que signe-t-on à la fin de l’entretien ?', a: 'La charte des droits et devoirs du citoyen français. Approuvée par décret, elle rappelle les principes, valeurs et symboles essentiels de la République française. Sa signature est prévue par l’article 21-24 du code civil à l’issue du contrôle de l’assimilation. Lisez-la avant le rendez-vous : elle se trouve sur Légifrance et en lien dans les sources de cette page.' },
      { q: 'Que faire si l’on ne peut pas se rendre à la convocation ?', a: 'Prévenez la préfecture sans attendre et justifiez votre empêchement. Service-public.gouv.fr indique qu’une absence sans raison légitime peut entraîner le classement sans suite de la demande, ce qui obligerait à tout recommencer. Gardez une trace écrite de votre message et du motif, par exemple un certificat médical ou une attestation de l’employeur.' },
    ],
    body: (h) => `
<h2>Où se place l’entretien dans la procédure</h2>
${h.table(['Étape', 'Ce qui se passe'], [['Dépôt en ligne', 'dossier complet, timbre de ' + h.eur(h.natFee)], ['Récépissé', `point de départ du délai de ${h.P.naturalisation.decisionMonths} mois`], ['Enquête', 'comportement civique, par exemple le paiement des impôts'], ['Convocation', 'si la demande est recevable'], ['Entretien d’assimilation', 'en préfecture, originaux à présenter'], ['Charte', 'signée à la fin de l’entretien'], ['Décision', 'décret publié au Journal officiel si elle est favorable']], `Procédure décrite par service-public.gouv.fr, relue le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>L’entretien intervient donc au cœur du délai d’instruction. Le mini-outil sous le résumé vous situe dans ce délai à partir du nombre de mois écoulés depuis votre récépissé.</p>
<h2>Ce que l’entretien vérifie</h2>
<p>La loi ne dresse pas une liste de questions ; elle décrit un résultat à atteindre. L’article 21-24 du code civil demande de justifier de son assimilation, ce qui recouvre plusieurs volets :</p>
<ul>
<li>la langue française, au niveau ${h.P.language.nat} exigé pour la naturalisation ;</li>
<li>l’histoire, la culture et la société françaises, appréciées selon la condition du candidat ;</li>
<li>les droits et devoirs conférés par la nationalité ;</li>
<li>l’adhésion aux principes et valeurs essentiels de la République.</li>
</ul>
<p>La formule « selon sa condition » compte : l’appréciation tient compte du parcours de la personne. Elle ne dispense pas pour autant de connaître les repères de base, que l’examen civique vérifie aussi par écrit.</p>
<h2>Une préparation en trois temps</h2>
<ol>
<li><strong>Lire le ${h.a('livret', 'livret du citoyen')}.</strong> C’est le support que l’administration recommande. Prenez la version approuvée par l’arrêté du 3 juillet 2026, pas l’ancienne.</li>
<li><strong>S’entraîner sur des questions.</strong> L’outil en haut de page propose des séries de la mention naturalisation, toutes thématiques confondues, avec un corrigé qui cite le texte de référence. Les principes et valeurs de la République, qui pèsent ${h.quota(1).total} questions sur ${h.size} à l’examen, méritent une attention particulière ; la page ${h.a('theme-1', 'principes et valeurs')} les rassemble.</li>
<li><strong>Parler à voix haute.</strong> L’entretien est un échange oral en français. Expliquer avec vos mots ce que signifient la laïcité, l’égalité entre les femmes et les hommes ou le rôle du vote prépare mieux qu’une lecture silencieuse.</li>
</ol>
<h2>Les erreurs qui coûtent cher</h2>
<ul>
<li><strong>Arriver sans les originaux.</strong> La convocation les énumère ; un document manquant peut obliger à revenir ou retarder l’instruction.</li>
<li><strong>Réviser sur un support périmé.</strong> Le livret approuvé en 2022 a été abrogé ; préférez la version de 2026 publiée au Journal officiel.</li>
<li><strong>Négliger l’oral.</strong> Le niveau ${h.P.language.nat} se démontre aussi en conversation, et une bonne note écrite ne suffit pas à mettre à l’aise le jour J.</li>
<li><strong>Taire un changement de situation.</strong> Un déménagement, un nouvel emploi ou une séparation non signalés créent un doute inutile sur la sincérité du dossier.</li>
</ul>
<p>Aucune de ces erreurs ne tient au niveau de connaissance : elles relèvent de l’organisation, et c’est précisément pour cela qu’elles s’évitent facilement avec quelques jours d’avance.</p>
<h2>Le jour du rendez-vous</h2>
<p>Arrivez avec votre convocation, votre pièce d’identité et les originaux demandés, classés dans l’ordre de la liste. Si un document a changé depuis le dépôt, comme une adresse, un emploi ou une situation familiale, apportez le justificatif à jour et signalez-le. Après l’entretien et la signature de la charte, le dossier poursuit son instruction jusqu’à la décision ; la page ${h.a('delai', 'délai de naturalisation')} détaille les échéances. La fiche ${h.src('sp_nat', 'service-public.gouv.fr sur la naturalisation')} décrit l’ensemble de la procédure.</p>`,
  },
  en: {
    slug: 'naturalisation-interview',
    nav: 'Naturalisation interview',
    card: 'The assimilation interview at the préfecture: when it comes, what it checks, what to bring and how to prepare.',
    title: 'Naturalisation interview in France: how to prepare for it',
    description: 'Naturalisation interview at the préfecture: the invitation, what the assimilation check covers, originals to bring, the charter you sign and practice questions.',
    h1: 'The French naturalisation interview: preparing for the assimilation check',
    intro: 'Practise on naturalisation-level questions, each marked as you go: they cover the same ground the interview relies on.',
    resume: (h) => `The naturalisation interview, officially the assimilation interview (entretien d’assimilation), is the stage where the préfecture meets you to check your assimilation into the French community. You are only invited once your application is found admissible, after you have filed a complete file and received the receipt. The Civil Code sets what is expected: enough knowledge, given your circumstances, of the French language, history, culture and society, knowledge of the rights and duties of citizens, and adherence to the principles and values of the Republic. To prepare, the administration points to the livret du citoyen, whose current edition was approved in July 2026. You bring the originals of the documents listed in your letter; failing to attend without a legitimate reason can lead to your application being closed. At the end of the interview you sign the charter of the rights and duties of the French citizen. Since ${h.date(h.P.exam.since)} the civic exam has been required as well. The tool above lets you practise naturalisation-level questions, each corrected straight away.`,
    faqs: (h) => [
      { q: 'Is the interview held in English if my French is weak?', a: `Nothing in the official guidance suggests an interview in another language, and citizenship requires French at level ${h.P.language.nat}. Treat the interview as a conversation in French. If speaking is your weak point, practise explaining everyday notions aloud, such as voting, secularism or equality, well before the date.` },
      { q: 'What should I bring to the interview?', a: 'The originals of the documents listed in your invitation letter: that list is the one that counts for your appointment. It usually repeats papers you sent as copies when you filed. Lay them out in the order of the letter the night before, with certified translations of foreign certificates, and check your residence permit is still valid.' },
      { q: 'Do I still need the civic exam if I have the interview?', a: `Yes. Since 2026 both apply. The civic exam is a ${h.size}-question test taken at an approved centre, and its certificate goes into your file. The interview follows at the préfecture if the application is admissible. Passing the exam does not excuse you from the interview, and the interview does not replace the certificate.` },
    ],
    body: (h) => `
<h2>Where the interview sits in the process</h2>
${h.table(['Stage', 'What happens'], [['Online filing', 'complete file, stamp of ' + h.eur(h.natFee)], ['Receipt', `starts the ${h.P.naturalisation.decisionMonths}-month clock`], ['Inquiry', 'civic conduct, for example paying taxes'], ['Invitation', 'if the application is admissible'], ['Assimilation interview', 'at the préfecture, originals to show'], ['Charter', 'signed at the end of the interview'], ['Decision', 'decree in the Journal officiel if positive']], `Process as described by service-public.gouv.fr, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>The interview falls in the middle of the review period. The small tool under the summary shows where you stand, from the months since your receipt.</p>
<h2>What the interview checks</h2>
<p>The law does not publish a question list; it describes an outcome. Article 21-24 of the Civil Code asks you to show assimilation, which covers:</p>
<ul>
<li>the French language, at the ${h.P.language.nat} level required for naturalisation;</li>
<li>French history, culture and society, judged in light of your circumstances;</li>
<li>the rights and duties that come with citizenship;</li>
<li>adherence to the essential principles and values of the Republic.</li>
</ul>
<p>"In light of your circumstances" matters: your background is taken into account. It does not excuse you from the basics, which the civic exam also tests in writing.</p>
<h2>Preparing in three stages</h2>
<ol>
<li><strong>Read the ${h.a('livret', 'livret du citoyen')}.</strong> It is the material the administration recommends. Use the edition approved on 3 July 2026, not the old one.</li>
<li><strong>Practise on questions.</strong> The tool at the top runs naturalisation-level sets across all themes, each with an explanation citing the source text. The principles and values of the Republic carry ${h.quota(1).total} of the ${h.size} exam questions and deserve extra time; our ${h.a('theme-1', 'principles and values page')} gathers them.</li>
<li><strong>Speak out loud.</strong> Explaining in your own words what secularism, equality between women and men or the role of voting mean prepares you better than silent reading.</li>
</ol>
<h2>Costly mistakes</h2>
<ul>
<li><strong>Turning up without originals.</strong> Your letter lists them; a missing document can mean a second visit or a slower review.</li>
<li><strong>Revising from outdated material.</strong> The 2022 booklet was repealed; use the 2026 edition published in the Journal officiel.</li>
<li><strong>Ignoring speaking practice.</strong> Level ${h.P.language.nat} shows in conversation too, and a good written score will not settle your nerves on the day.</li>
<li><strong>Keeping quiet about a change.</strong> A move, a new job or a separation you did not report raises needless doubts about your file.</li>
</ul>
<p>None of these is about knowledge. They are about organisation, which is exactly why a few days of preparation avoid them. Many expats find it helps to rehearse with a French-speaking friend or colleague, who can ask follow-up questions the way a real conversation would.</p>
<h2>On the day</h2>
<p>Bring your invitation, your ID and the originals requested, sorted in the order of the list. If something has changed since you filed, such as your address, job or family situation, bring up-to-date proof and say so. Expats who have moved for work in the meantime should mention it plainly: an unexplained change looks worse than a documented one. After the interview and the charter, the file continues to a decision; our ${h.a('delai', 'processing time page')} sets out the deadlines. The ${h.src('sp_nat', 'service-public.gouv.fr naturalisation page')} describes the whole procedure.</p>`,
  },
});
