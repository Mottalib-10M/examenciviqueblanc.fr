import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'examen-blanc',
  group: 'examen',
  order: 10,
  tool: { kind: 'quiz', props: { mention: 'cr', mode: 'exam', mentionSelect: true } },
  mini: { kind: 'mini:pace' },
  related: ['qcm', 'mises-en-situation', 'resultat', 'questions-cr', 'examen-2026', 'prix'],
  sources: ['arrete_exam', 'sp_exam_sejour', 'sp_exam_nat', 'fc_info', 'ccip_exam'],
  fr: {
    slug: 'examen-civique-blanc',
    nav: 'Examen civique blanc',
    card: 'Quarante questions en 45 minutes, tirées selon la répartition officielle et notées au seuil de 32 bonnes réponses.',
    title: 'Examen civique blanc 2026 : 40 questions en 45 minutes',
    description: 'Examen civique blanc gratuit : 40 questions tirées selon l’arrêté du 10 octobre 2025, chronomètre de 45 minutes, seuil de 32 et corrigé de chaque réponse.',
    h1: 'Examen civique blanc : 40 questions en conditions réelles',
    intro: 'Choisissez la mention de votre démarche, répondez aux 40 questions : le chronomètre démarre à la première réponse et la note tombe au seuil réel de 32.',
    resume: (h) => `L’examen civique est un questionnaire à choix multiples de ${h.size} questions, en français, à traiter en ${h.P.exam.minutes} minutes. Chaque question propose ${h.P.exam.options} réponses dont une seule est juste ; une bonne réponse vaut un point, une erreur ou une absence de réponse zéro. Il faut ${h.need} bonnes réponses, soit ${h.pc(h.P.exam.passPercent / 100)}, pour obtenir l’attestation. L’épreuve compte ${h.P.exam.knowledge} questions de connaissance et ${h.P.exam.situations} mises en situation, réparties sur cinq thématiques : principes et valeurs de la République, institutions, droits et devoirs, histoire et géographie, vie en société. Trois mentions existent selon la démarche : carte de séjour pluriannuelle, carte de résident et naturalisation. Depuis le ${h.date(h.P.exam.since)}, l’attestation est exigée pour une première carte pluriannuelle, une première carte de résident et toute demande de naturalisation. L’examen blanc ci-dessus tire ${h.size} questions de notre banque de ${h.num(h.count.all)} en respectant la répartition fixée par l’arrêté du 10 octobre 2025, déclenche le chronomètre à votre première réponse et vous dit, thématique par thématique, où vous perdez des points.`,
    faqs: (h) => [
      { q: 'Les questions de l’examen blanc sont-elles les vraies questions ?', a: `Les intitulés des ${h.num(h.count.knowledge)} questions de connaissance viennent des listes publiées par le ministère de l’Intérieur sur formation-civique.interieur.gouv.fr. Le ministère ne publie ni les propositions de réponse ni les mises en situation : nous les avons rédigées, avec un corrigé qui renvoie au texte où vérifier. Le jour de l’examen, la formulation des réponses peut donc différer.` },
      { q: 'Combien de temps faut-il pour se préparer à l’examen civique ?', a: `Comptez deux à quatre semaines à raison de vingt minutes par jour si vous partez de zéro. Commencez par une thématique par jour en mode entraînement, revenez sur les notions où vous faites le plus d’erreurs, puis enchaînez des examens blancs complets. Visez au moins ${h.need + 3} bonnes réponses plusieurs fois de suite avant de vous inscrire, pour garder une marge le jour J.` },
      { q: 'Que se passe-t-il quand le chronomètre arrive à zéro ?', a: `Comme le jour de l’examen, l’épreuve s’arrête : elle est notée telle quelle et les questions sans réponse valent zéro. Le chronomètre ne démarre qu’à votre première réponse, pour vous laisser lire la consigne. ${h.P.exam.minutes} minutes pour ${h.size} questions laissent un peu plus d’une minute par question ; si vous manquez souvent de temps ici, travaillez les mises en situation, plus longues à lire.` },
      { q: 'Quelle mention choisir pour l’examen blanc ?', a: `Celle de votre démarche : carte de séjour pluriannuelle, carte de résident ou naturalisation. Les deux premières mentions ont chacune une liste officielle de questions de connaissance ; pour la naturalisation, l’examen blanc privilégie les intitulés que le ministère pose aussi à ce niveau. La structure de l’épreuve, ${h.size} questions et ${h.need} pour réussir, est la même pour les trois.` },
    ],
    body: (h) => `
<h2>L’épreuve en chiffres</h2>
${h.table(['Règle', 'Valeur'], [['Questions', h.size], ['Propositions par question', h.P.exam.options], ['Durée', `${h.P.exam.minutes} minutes`], ['Bonnes réponses pour réussir', `${h.need} (${h.pc(h.P.exam.passPercent / 100)})`], ['Questions de connaissance', h.P.exam.knowledge], ['Mises en situation', h.P.exam.situations], ['Langue', 'français uniquement'], ['Validité de l’attestation', 'sans limite de durée']], `Article 3 de l’arrêté du 10 octobre 2025 et fiches service-public.gouv.fr, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<p>La marge est étroite : ${h.size - h.need} erreurs au plus. Une question laissée sans réponse coûte autant qu’une erreur, si bien qu’il vaut mieux répondre à tout, même au jugé, que laisser des cases vides à la fin.</p>
<h2>Comment les 40 questions sont tirées</h2>
<p>L’arrêté ne laisse pas le hasard choisir les thèmes : il fixe, thématique par thématique, combien de questions de chaque notion figurent dans l’épreuve. Notre tirage applique la même grille.</p>
${h.table(['Thématique', 'Questions', 'Dont mises en situation'], [1, 2, 3, 4, 5].map((t) => [`${t}. ${h.theme(t as 1)}`, h.quota(t as 1).total, (h.quota(t as 1).notions as Record<string, number>).situation ?? 0]), 'Répartition fixée par l’article 3 de l’arrêté du 10 octobre 2025.', ['l', 'r', 'r'])}
<p>Les deux thématiques les plus lourdes, principes et valeurs de la République puis droits et devoirs, pèsent ${h.quota(1).total + h.quota(3).total} questions sur ${h.size} et contiennent toutes les mises en situation. C’est là que se gagne l’examen. Les ${h.a('mises-en-situation', 'mises en situation')} se travaillent à part : elles décrivent un cas de la vie courante et demandent la réaction conforme à la loi.</p>
<!--tool:mini:quota-->
<h2>Lire son résultat</h2>
<p>À la fin, l’outil affiche votre note sur ${h.size}, le verdict au seuil de ${h.need} et le détail par thématique. Une thématique sous les trois quarts de bonnes réponses signale la notion à revoir : ouvrez alors la ${h.a('qcm', 'série d’entraînement par thématique')}, qui corrige chaque réponse aussitôt, puis revenez à l’examen blanc. Le bouton « Nouvel examen » tire une autre combinaison de questions ; le lien de la page garde le tirage, ce qui permet de refaire exactement le même examen plus tard.</p>
<h2>Le jour de l’examen</h2>
<p>L’examen se passe sur ordinateur dans un centre agréé par l’un des deux organismes habilités, la CCI Paris Île-de-France (Le français des affaires) et France Éducation international. Une pièce d’identité est demandée à l’entrée et toute fraude entraîne une interdiction de se présenter pendant ${h.P.exam.fraudBanYears} ans. Le prix est fixé par chaque centre : notre page ${h.a('prix', 'prix et inscription')} explique comment le comparer. Le résultat arrive après l’épreuve ; en cas d’échec, rien n’empêche de se réinscrire à une nouvelle session.</p>
<h2>D’où viennent nos questions</h2>
<p>Les intitulés de connaissance sont ceux des listes officielles du ministère, réutilisés sous Licence Ouverte. Les propositions de réponse, les corrigés et les mises en situation sont écrits par Radif Partners, à partir des fiches du site ${h.src('fc_fiches', 'formation-civique.interieur.gouv.fr')} et des textes de loi publiés sur Légifrance. Chaque corrigé cite le texte où vérifier. Nous ne reprenons aucune question de site ou d’application privée.</p>`,
  },
  en: {
    slug: 'civic-exam-mock-test',
    nav: 'Civic exam mock test',
    card: 'Forty questions in 45 minutes, drawn with the official mix and marked at the real pass mark of 32.',
    title: 'Civic Exam Mock Test France 2026: 40 Questions, 45 Minutes',
    description: 'Free mock test for the French civic exam: 40 questions drawn with the official mix, a 45-minute timer, the real pass mark of 32 and every answer explained.',
    h1: 'French civic exam mock test: 40 questions, real conditions',
    intro: 'Pick the level that matches your application and answer the 40 questions: the timer starts with your first answer and you are marked at the real pass mark of 32.',
    resume: (h) => `The French civic exam (examen civique) is a multiple-choice test of ${h.size} questions, in French only, to be answered in ${h.P.exam.minutes} minutes. Each question has ${h.P.exam.options} options and one correct answer; a correct answer scores one point, a wrong or blank one scores nothing. You need ${h.need} correct answers, ${h.pc(h.P.exam.passPercent / 100)}, to get the certificate. The paper holds ${h.P.exam.knowledge} knowledge questions and ${h.P.exam.situations} scenario questions over five themes: the principles and values of the Republic, institutions, rights and duties, history and geography, and daily life in France. There are three levels, one per application: multi-year residence permit, resident card and naturalisation. Since ${h.date(h.P.exam.since)}, the certificate is required for a first multi-year permit, a first resident card and every naturalisation application. The mock test above draws ${h.size} questions from our bank of ${h.num(h.count.all)} using the mix set by the decree of 10 October 2025, starts the timer at your first answer and shows, theme by theme, where you lose points. The questions are in English here to help you learn; the real exam is in French.`,
    faqs: (h) => [
      { q: 'Are these the real civic exam questions?', a: `The stems of our ${h.num(h.count.knowledge)} knowledge questions come from the lists published by the French Interior Ministry on formation-civique.interieur.gouv.fr. The ministry publishes neither the answer options nor the scenario questions, so we wrote them, each with an explanation pointing to the text to check. On the day, the answer options will be worded differently.` },
      { q: 'Why practise in French if I understand the rules in English?', a: 'Because the exam is in French only and the wording matters: two options often differ by a single word, such as laïcité and liberté, or préfet and maire. Use this English version to understand each notion and its explanation, then switch to the French mock test with the language button and practise until you clear the mark there. The questions and draws are the same in both languages.' },
      { q: 'How much time is there for each question?', a: `${h.P.exam.minutes} minutes for ${h.size} questions is a little over a minute each. Knowledge questions take a few seconds when you know the answer, while scenario questions need careful reading. As on the real day, our mock test stops when the timer reaches zero and marks the paper as it stands, with unanswered questions scoring nothing.` },
    ],
    body: (h) => `
<h2>The exam in figures</h2>
${h.table(['Rule', 'Figure'], [['Questions', h.size], ['Options per question', h.P.exam.options], ['Time', `${h.P.exam.minutes} minutes`], ['Correct answers to pass', `${h.need} (${h.pc(h.P.exam.passPercent / 100)})`], ['Knowledge questions', h.P.exam.knowledge], ['Scenario questions', h.P.exam.situations], ['Language', 'French only'], ['Certificate validity', 'no time limit']], `Article 3 of the decree of 10 October 2025 and service-public.gouv.fr pages, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<p>The margin is tight: ${h.size - h.need} mistakes at most. A blank answer costs as much as a wrong one, so it is better to answer everything, guessing if you must, than to leave boxes empty at the end.</p>
<h2>How the 40 questions are drawn</h2>
<p>The decree does not leave the themes to chance. It sets, theme by theme, how many questions on each notion appear in the paper, and our draw follows the same grid.</p>
${h.table(['Theme', 'Questions', 'Of which scenarios'], [1, 2, 3, 4, 5].map((t) => [`${t}. ${h.theme(t as 1)}`, h.quota(t as 1).total, (h.quota(t as 1).notions as Record<string, number>).situation ?? 0]), 'Mix set by Article 3 of the decree of 10 October 2025.', ['l', 'r', 'r'])}
<p>The two heaviest themes, the principles and values of the Republic and rights and duties, carry ${h.quota(1).total + h.quota(3).total} of the ${h.size} questions and hold every scenario question. That is where the exam is won. The ${h.a('mises-en-situation', 'scenario questions')} can be practised on their own: each describes an everyday case and asks for the response that complies with French law.</p>
<!--tool:mini:quota-->
<h2>Reading your result</h2>
<p>At the end the tool shows your score out of ${h.size}, the verdict against the mark of ${h.need} and a breakdown by theme. A theme below three quarters correct points to the notion to revise: open the ${h.a('qcm', 'practice set by theme')}, which corrects each answer at once, then come back to the full mock test. The "New exam" button draws another set of questions; the page address keeps the draw, so you can sit the very same paper again later.</p>
<h2>On the day</h2>
<p>The exam is taken on a computer in a centre approved by one of the two authorised bodies, the Paris Île-de-France Chamber of Commerce (Le français des affaires) and France Éducation international. You show an identity document at the door, and cheating bars you from sitting again for ${h.P.exam.fraudBanYears} years. Each centre sets its own price: our ${h.a('prix', 'price and booking page')} explains how to compare them. If you fail, nothing stops you from booking another session.</p>
<h2>Where our questions come from</h2>
<p>The knowledge stems are those of the ministry's official lists, reused under the Licence Ouverte (Open Licence) and translated by us for this English version. Answer options, explanations and scenarios are written by Radif Partners from the guidance sheets on ${h.src('fc_fiches', 'formation-civique.interieur.gouv.fr')} and the legal texts on Légifrance. Every explanation names the text to check. We copy no question from any private site or app.</p>`,
  },
});
