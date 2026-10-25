import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'resultat',
  group: 'examen',
  order: 62,
  tool: {"kind": "mini:pass"},
  mini: {"kind": "mini:errors"},
  related: ['examen-blanc', 'prix', 'qcm', 'mises-en-situation', 'quel-examen', 'demande-nationalite'],
  sources: ['ccip_attestation', 'ccip_resultats', 'arrete_exam', 'sp_exam_sejour', 'sp_exam_nat', 'fc_info'],
  fr: {
    slug: 'resultat-examen-civique',
    nav: 'Résultat de l’examen',
    card: 'Le seuil de 32 sur 40, l’attestation sans date de fin, la contestation sous 30 jours et la possibilité de repasser.',
    title: 'Résultat examen civique : seuil de 32, attestation, recours',
    description: 'Résultat de l’examen civique : le seuil de 32 bonnes réponses sur 40, l’attestation sans limite de validité, la contestation sous 30 jours et comment repasser.',
    h1: 'Résultat de l’examen civique : lire sa note et la suite à donner',
    intro: 'Entrez votre nombre de bonnes réponses pour savoir si le seuil est atteint et de combien, puis voyez ce que vous pouvez faire selon le résultat.',
    resume: (h) => `Le résultat de l’examen civique se lit en un chiffre : le nombre de bonnes réponses sur ${h.size}. L’épreuve est réussie à partir de ${h.need}, soit ${h.pc(h.P.exam.passPercent / 100)} ; chaque bonne réponse vaut un point, une erreur ou une case vide ne vaut rien, et aucun point n’est retiré. En cas de réussite, le candidat reçoit une attestation qui n’a pas de limite de durée de validité et qui se joint au dossier de titre de séjour ou de naturalisation ; l’attestation de la mention carte de résident vaut aussi pour une carte pluriannuelle. En cas d’échec, rien n’oblige à attendre : on peut se réinscrire à une nouvelle session sans délai imposé. Le résultat peut être contesté dans les ${h.P.exam.appealDays} jours auprès de l’organisme. Une fraude constatée entraîne une interdiction de se présenter pendant ${h.P.exam.fraudBanYears} ans. L’outil ci-dessus dit, à partir de votre score, si le seuil est atteint et quelle marge ou quel manque vous sépare de lui ; le mini-outil compte les erreurs encore permises en cours d’épreuve.`,
    faqs: (h) => [
      { q: 'Combien de temps l’attestation de l’examen civique reste-t-elle valable ?', a: 'Sans limite de durée. Une fois l’examen réussi, l’attestation peut servir des années plus tard, pour la démarche correspondant à sa mention. Conservez l’original et une copie numérique : c’est la pièce qui prouve votre réussite dans le dossier. Pensez aussi à vérifier, avant de la joindre, que la mention indiquée est bien celle de votre démarche.' },
      { q: 'Comment contester le résultat de l’examen civique ?', a: `Une contestation peut être formée dans les ${h.P.exam.appealDays} jours suivant le résultat, auprès de l’organisme qui a fait passer l’épreuve. La CCI Paris Île-de-France décrit la démarche sur sa page consacrée aux résultats. Gardez la convocation, la date de l’épreuve et tout élément utile, par exemple un incident technique survenu pendant la session.` },
      { q: 'Que risque-t-on en cas de fraude à l’examen civique ?', a: `Une interdiction de se présenter à l’examen pendant ${h.P.exam.fraudBanYears} ans. Pour un candidat qui a besoin de l’attestation pour une carte de résident ou une naturalisation, cela peut bloquer la démarche pendant toute cette période. Aucune aide extérieure, aucun document et aucun appareil non autorisé ne sont permis pendant l’épreuve.` },
      { q: 'Le seuil de réussite change-t-il selon la mention ?', a: `Non. Que vous passiez la mention carte pluriannuelle, carte de résident ou naturalisation, il faut ${h.need} bonnes réponses sur ${h.size}, avec le même barème : un point par bonne réponse, zéro pour une erreur ou une absence de réponse. Seules les questions de connaissance diffèrent d’une mention à l’autre, car elles proviennent de listes distinctes.` },
    ],
    body: (h) => `
<h2>Ce que dit votre score</h2>
${h.table(['Score sur ' + h.size, 'Verdict', 'Lecture'], [[`${h.size} à ${h.need + 4}`, 'réussi', 'marge confortable'], [`${h.need + 3} à ${h.need}`, 'réussi', 'réussite juste, sans marge'], [`${h.need - 1} à ${h.need - 4}`, 'échoué', 'proche du seuil, quelques notions à revoir'], [`${h.need - 5} ou moins`, 'échoué', 'préparation à reprendre par thématique']], `Seuil fixé par l’article 3 de l’arrêté du 10 octobre 2025 ; lecture proposée par Examen Civique Blanc.`, ['l', 'l', 'l'])}
<p>Le seuil est le même pour les trois mentions et ne se négocie pas : ${h.need - 1} bonnes réponses, c’est un échec, même si l’écart tient à une seule question. Le barème ne prévoit pas de minimum par thématique : seule compte la somme des points. Une très bonne note en histoire peut donc compenser quelques erreurs ailleurs, et inversement une thématique négligée peut suffire à faire basculer le total sous le seuil.</p>
<h2>Après une réussite</h2>
<ul>
<li>Récupérez l’attestation auprès de l’organisme et vérifiez la mention indiquée.</li>
<li>Joignez-la au dossier de titre de séjour ou de naturalisation, en même temps que la preuve du niveau de français.</li>
<li>Gardez-la précieusement : elle n’expire pas, et l’attestation de la mention carte de résident pourra resservir pour une carte pluriannuelle.</li>
</ul>
<p>Pour la naturalisation, l’attestation n’est qu’une étape : la ${h.a('demande-nationalite', 'demande de nationalité')} se poursuit par l’entretien d’assimilation en préfecture.</p>
<h2>Après un échec</h2>
<p>Un échec n’a aucune conséquence durable sur la démarche, sinon le temps perdu et le prix d’une nouvelle inscription. Aucun délai n’est imposé avant de repasser l’épreuve. Avant de vous réinscrire, prenez le temps de diagnostiquer :</p>
<ol>
<li>Refaites un ${h.a('examen-blanc', 'examen civique blanc')} complet et regardez le résultat par thématique.</li>
<li>Travaillez la thématique la plus faible avec le ${h.a('qcm', 'QCM par thématique')}, correction immédiate.</li>
<li>Si les mises en situation vous ont coûté des points, entraînez-vous sur elles seules.</li>
<li>Réinscrivez-vous quand vous dépassez ${h.need} avec plusieurs points d’avance, plusieurs fois de suite.</li>
</ol>
<p>Le budget d’un second passage se calcule avec l’outil de la page ${h.a('prix', 'prix et inscription')}, en indiquant deux passages.</p>
<h2>Contester un résultat</h2>
<p>Si vous estimez que l’épreuve s’est mal déroulée ou que le résultat est erroné, vous disposez de ${h.P.exam.appealDays} jours pour le contester auprès de l’organisme. La ${h.src('ccip_resultats', 'page de la CCI Paris Île-de-France sur les résultats')} décrit la marche à suivre pour ses candidats ; si vous avez passé l’épreuve avec France Éducation international, renseignez-vous auprès de cet organisme. Le seuil, lui, est fixé par l’arrêté et ne peut pas être discuté : une contestation n’a de sens que si vous pensez que l’épreuve ou votre note pose problème. Agissez vite, car le délai court à partir du résultat.</p>
<h2>La fraude, une erreur qui coûte deux fois</h2>
<p>Toute fraude constatée entraîne une interdiction de se présenter pendant ${h.P.exam.fraudBanYears} ans. Au-delà de l’épreuve perdue, c’est le titre de séjour ou la naturalisation qui se trouve reporté d’autant. La seule stratégie qui vaille reste la préparation : la note de l’épreuve se gagne avant d’entrer dans la salle.</p>
<h2>Quand et comment arrive le résultat</h2>
<p>À la ${h.src('ccip_attestation', 'CCI Paris Île-de-France')}, le résultat est transmis sous ${h.P.exam.resultHoursMin} à ${h.P.exam.resultHoursMax} heures ouvrées après l’épreuve, par un courriel qui mène à un coffre-fort numérique où télécharger l’attestation ; aucune attestation papier n’est envoyée et le centre la conserve ${h.P.exam.attestationKeptYears} ans. Pensez à vérifier vos courriers indésirables, et enregistrez une copie dès réception. Les autres délais de la démarche, de la décision au décret, sont sur la page ${h.a('delai', 'délai de naturalisation')}.</p>`,
  },
  en: {
    slug: 'civic-exam-result',
    nav: 'Exam result',
    card: 'The pass mark of 32 out of 40, a certificate with no end date, a 30-day appeal window and the option to resit.',
    title: 'Civic exam result: pass mark of 32, certificate, appeals',
    description: 'Civic exam result: the pass mark of 32 correct answers out of 40, a certificate with no expiry date, the 30-day window to challenge it and how to resit it.',
    h1: 'French civic exam result: read your score and plan next steps',
    intro: 'Enter your number of correct answers to see whether you cleared the pass mark and by how much, then read what you can do next.',
    resume: (h) => `The French civic exam result comes down to one number: your correct answers out of ${h.size}. You pass from ${h.need}, ${h.pc(h.P.exam.passPercent / 100)}; each correct answer scores one point, a wrong or blank one scores nothing, and no points are deducted. If you pass, you receive a certificate with no expiry date, which goes into your residence permit or naturalisation file; a certificate at the resident card level also counts for a multi-year permit. If you fail, there is no waiting period: you can book another session straight away. The result can be challenged within ${h.P.exam.appealDays} days with the body that ran the exam. Cheating bars you from sitting again for ${h.P.exam.fraudBanYears} years. The certificate will be in French, as the exam itself is. The tool above tells you from your score whether you reached the pass mark and by what margin or shortfall, and the small tool counts the mistakes you can still afford during the paper.`,
    faqs: (h) => [
      { q: 'How long is the civic exam certificate valid?', a: 'It has no expiry date. Once you pass, the certificate can be used years later for the application that matches its level. Keep the original and a digital copy, since it is the document that proves your pass in your file, and check that the level shown matches your application before you submit it.' },
      { q: 'How do I challenge my civic exam result?', a: `You can lodge a challenge within ${h.P.exam.appealDays} days of the result with the body that ran the exam. The Paris Île-de-France Chamber of Commerce describes the process on its results page. Keep your notice of attendance, the exam date and anything relevant, such as a technical incident during the session, and write as soon as you can.` },
      { q: 'What happens if I am caught cheating?', a: `You are barred from sitting the exam for ${h.P.exam.fraudBanYears} years. If you need the certificate for a resident card or naturalisation, that can stall your application for the whole period. No outside help, documents or unauthorised devices are allowed during the paper, including translation apps.` },
    ],
    body: (h) => `
<h2>What your score means</h2>
${h.table(['Score out of ' + h.size, 'Verdict', 'Reading'], [[`${h.size} to ${h.need + 4}`, 'pass', 'comfortable margin'], [`${h.need + 3} to ${h.need}`, 'pass', 'narrow pass, no margin'], [`${h.need - 1} to ${h.need - 4}`, 'fail', 'close, a few notions to review'], [`${h.need - 5} or fewer`, 'fail', 'rebuild preparation theme by theme']], `Pass mark set by Article 3 of the decree of 10 October 2025; reading suggested by Examen Civique Blanc.`, ['l', 'l', 'l'])}
<p>The pass mark is the same at all three levels and is not negotiable: ${h.need - 1} correct answers is a fail, even if one question made the difference. The marking has no minimum per theme; only the total counts. A strong score in history can make up for a few slips elsewhere, and one neglected theme can be enough to drag the total below the mark.</p>
<h2>After a pass</h2>
<ul>
<li>Get the certificate from the exam body and check the level shown on it.</li>
<li>Add it to your residence permit or naturalisation file, together with your proof of French.</li>
<li>Keep it safe: it never expires, and a resident card level certificate can be reused for a multi-year permit.</li>
</ul>
<p>For naturalisation, the certificate is only one step: the ${h.a('demande-nationalite', 'nationality application')} continues with the assimilation interview at the préfecture.</p>
<h2>After a fail</h2>
<p>Failing has no lasting effect on your application beyond lost time and the cost of a new booking. There is no waiting period before you resit. Before booking again, take time to diagnose what went wrong:</p>
<ol>
<li>Sit a full ${h.a('examen-blanc', 'civic exam mock test')} and look at your score by theme.</li>
<li>Work on the weakest theme with the ${h.a('qcm', 'practice questions')}, marked as you go.</li>
<li>If scenario questions cost you points, practise them on their own.</li>
<li>Book again once you clear ${h.need} with a few points to spare, several times in a row.</li>
</ol>
<p>For many expats the gap is reading speed in French rather than knowledge: if you ran short of time, practise in French under the clock. The cost of a second attempt can be worked out with the tool on the ${h.a('prix', 'price and booking')} page by entering two attempts.</p>
<h2>Challenging a result</h2>
<p>If you believe the session went wrong or the result is incorrect, you have ${h.P.exam.appealDays} days to challenge it with the exam body. The ${h.src('ccip_resultats', 'Paris Île-de-France Chamber of Commerce results page')} explains the process for its candidates; if you sat the exam with France Éducation international, ask that body. The pass mark itself is set by the decree and cannot be argued: a challenge only makes sense if you believe the session or your mark went wrong. Act quickly, since the window runs from the result.</p>
<h2>Cheating costs twice</h2>
<p>Any cheating that is detected bars you from sitting again for ${h.P.exam.fraudBanYears} years. Beyond the lost exam, your residence permit or naturalisation is pushed back by the same amount. Preparation is the only strategy that works.</p>
<h2>When and how the result arrives</h2>
<p>At the ${h.src('ccip_attestation', 'Paris Île-de-France Chamber of Commerce')}, results are sent within ${h.P.exam.resultHoursMin} to ${h.P.exam.resultHoursMax} working hours of the test, by an email leading to a digital safe where you download the certificate; no paper copy is posted and the centre keeps it for ${h.P.exam.attestationKeptYears} years. Check your spam folder and save a copy as soon as it arrives. The later deadlines, from decision to decree, are on the ${h.a('delai', 'naturalisation processing time page')}.</p>`,
  },
});
