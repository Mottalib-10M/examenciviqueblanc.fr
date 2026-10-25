import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'examen-2026',
  group: 'examen',
  order: 60,
  tool: {"kind": "level", "props": {"title": "cr"}},
  mini: {"kind": "mini:age"},
  related: ['quel-examen', 'dispenses', 'examen-blanc', 'niveau-francais', 'prix', 'naturalisation'],
  sources: ['sp_actu', 'arrete_exam', 'sp_exam_sejour', 'sp_exam_nat', 'arrete_langue', 'arrete_dispense'],
  fr: {
    slug: 'examen-civique-2026',
    nav: 'Examen civique 2026',
    card: 'Ce qui a changé le 1er janvier 2026 : les démarches concernées, les textes, le format de l’épreuve et les exceptions.',
    title: 'Examen civique 2026 : ce qui change, pour qui, comment',
    description: 'Examen civique 2026 : l’épreuve exigée depuis le 1er janvier pour une première carte pluriannuelle, de résident ou la naturalisation, et ses textes officiels.',
    h1: 'Examen civique 2026 : la réforme du 1er janvier expliquée',
    intro: 'Indiquez votre démarche dans l’outil pour savoir si l’examen et quel niveau de français vous concernent, puis lisez ce que la réforme a changé.',
    resume: (h) => `L’examen civique 2026 désigne l’épreuve devenue obligatoire le ${h.date(h.P.exam.since)} pour trois démarches : une première carte de séjour pluriannuelle, une première carte de résident et la naturalisation ou la réintégration par décret. Son programme et son organisation sont fixés par l’arrêté du 10 octobre 2025. Il s’agit d’un questionnaire de ${h.size} questions en français, ${h.P.exam.knowledge} de connaissance et ${h.P.exam.situations} mises en situation, à traiter en ${h.P.exam.minutes} minutes ; il faut ${h.need} bonnes réponses pour obtenir une attestation, valable sans limite de durée. Chaque démarche a sa mention, et chaque mention s’accompagne d’un niveau de français : ${h.P.language.csp} pour la carte pluriannuelle, ${h.P.language.cr} pour la carte de résident, ${h.P.language.nat} pour la naturalisation. Ne sont pas concernés les renouvellements, les déclarations de nationalité, ni les plus de ${h.P.exam.exemptAgeOver} ans pour un titre de séjour. L’outil ci-dessus indique, selon votre démarche et votre situation, si l’examen s’applique et à quel niveau ; le mini-outil vérifie la règle d’âge.`,
    faqs: (h) => [
      { q: 'Un dossier déposé avant le 1er janvier 2026 est-il soumis à l’examen civique ?', a: `Les fiches officielles présentent l’examen comme exigé depuis le ${h.date(h.P.exam.since)} pour les démarches concernées. Pour un dossier déjà en cours à cette date, la règle applicable dépend de la date de dépôt et de la procédure : interrogez la préfecture qui instruit votre demande, et conservez la preuve de la date à laquelle votre dossier a été déposé.` },
      { q: 'Qu’est-ce qui existait avant l’examen civique de 2026 ?', a: `Les étrangers signataires du contrat d’intégration républicaine suivaient déjà une formation civique, qui reste en place : ${h.P.exam.civicTrainingHours} heures sur ${h.P.exam.civicTrainingDays} jours, gratuites. La nouveauté de ${h.P.year} est une épreuve notée, avec un seuil de réussite, dont l’attestation devient une pièce du dossier pour les trois démarches concernées.` },
      { q: 'Où suivre les évolutions de l’examen civique ?', a: 'Sur les sources officielles : Légifrance pour les arrêtés, service-public.gouv.fr pour les fiches pratiques, le site formation-civique.interieur.gouv.fr pour les listes de questions, et les pages des deux organismes habilités. Nous relisons ces sources à la main et datons chaque relecture ; en cas de doute, la version officielle fait foi.' },
    ],
    body: (h) => `
<h2>Les textes de la réforme, dans l’ordre</h2>
${h.table(['Date', 'Texte ou étape', 'Ce qu’il fixe'], [['10 octobre 2025', 'Arrêté relatif à l’examen civique', 'programme, épreuve, répartition des questions'], ['18 décembre 2025', 'Actualité de service-public.gouv.fr', 'annonce du nouvel examen'], ['22 décembre 2025', 'Arrêté sur la maîtrise du français', 'niveaux pour les cartes pluriannuelle et de résident'], ['30 décembre 2025', 'Arrêté de dispense', 'dispenses de français et d’examen pour la nationalité'], [h.date(h.P.exam.since), 'Entrée en application', 'attestation exigée pour les démarches concernées'], ['3 juillet 2026', 'Arrêté du livret du citoyen', 'nouveau livret pour la naturalisation']], `Légifrance et service-public.gouv.fr, relus le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Le texte central est l’${h.src('arrete_exam', 'arrêté du 10 octobre 2025')}. Son article 3 fixe l’épreuve : nombre de questions, durée, notation, seuil et répartition par thématique. Les autres textes précisent le niveau de français et les cas de dispense. Quand une préfecture ou un centre cite l’un d’eux, le tableau ci-dessus permet de savoir lequel ouvrir.</p>
<h2>Trois mentions pour trois démarches</h2>
${h.table(['Démarche', 'Mention de l’examen', 'Niveau de français'], [['Première carte de séjour pluriannuelle', 'carte de séjour pluriannuelle', h.P.language.csp], ['Première carte de résident', 'carte de résident', h.P.language.cr], ['Naturalisation ou réintégration par décret', 'naturalisation', h.P.language.nat]], 'Fiches F39530 et F39426 de service-public.gouv.fr.', ['l', 'l', 'l'])}
<p>Le format est identique pour les trois mentions : ${h.size} questions, ${h.P.exam.minutes} minutes, ${h.need} bonnes réponses. Ce qui change d’une mention à l’autre, ce sont les questions de connaissance, tirées de listes distinctes. Pour savoir laquelle vous concerne, la page ${h.a('quel-examen', 'quel examen pour mon titre')} part de votre situation.</p>
<h2>Ce que la réforme n’a pas changé</h2>
<ul>
<li>Le renouvellement d’un titre ne demande pas d’examen.</li>
<li>Les déclarations de nationalité, par mariage ou comme ascendant, frère ou sœur de Français, n’en demandent pas non plus.</li>
<li>La carte de résident « réfugié » et la carte pluriannuelle des bénéficiaires de la protection subsidiaire et des apatrides restent hors du champ.</li>
<li>Les titres délivrés hors contrat d’intégration républicaine ne sont pas concernés.</li>
<li>Au-delà de ${h.P.exam.exemptAgeOver} ans, aucun examen pour un titre de séjour ; pour la naturalisation, aucune dispense liée à l’âge.</li>
</ul>
<p>Le détail des exceptions, y compris les dispenses médicales, est sur la page ${h.a('dispenses', 'dispenses de l’examen civique')}.</p>
<h2>Comment l’examen s’organise en pratique</h2>
<p>Deux organismes sont habilités à le faire passer : la CCI Paris Île-de-France, sous la marque Le français des affaires, et France Éducation international. Ils s’appuient sur un réseau de centres agréés, en France et dans certains instituts français et alliances françaises à l’étranger. Chaque centre fixe son prix ; aucun tarif national n’existe. La page ${h.a('prix', 'prix et inscription')} explique comment s’inscrire.</p>
<p>Pour se préparer, le ministère indique que tout peut se faire gratuitement : listes de questions et fiches thématiques sur son site, formation civique du contrat d’intégration républicaine. L’${h.a('examen-blanc', 'examen civique blanc')} de ce site, gratuit lui aussi, reproduit le format de ${h.P.year} avec sa répartition officielle.</p>`,
  },
  en: {
    slug: 'civic-exam-2026',
    nav: 'Civic exam 2026',
    card: 'What changed on 1 January 2026: the applications affected, the legal texts, the format and the exceptions.',
    title: 'Civic exam 2026 in France: what changed and who it affects',
    description: 'Civic exam 2026: the test required since 1 January for a first multi-year permit, resident card or naturalisation in France, and the legal texts behind it.',
    h1: 'The 2026 French civic exam reform, explained for expats',
    intro: 'Enter your application in the tool to see whether the exam and which French level apply to you, then read what the reform changed.',
    resume: (h) => `The 2026 civic exam is the test that became compulsory in France on ${h.date(h.P.exam.since)} for three applications: a first multi-year residence permit, a first resident card, and naturalisation or reinstatement by decree. Its syllabus and organisation are set by the order of 10 October 2025. It is a ${h.size}-question test in French only, ${h.P.exam.knowledge} knowledge questions and ${h.P.exam.situations} scenarios, to be completed in ${h.P.exam.minutes} minutes; you need ${h.need} correct answers to get a certificate, which never expires. Each application has its own exam level, and each level goes with a French language requirement: ${h.P.language.csp} for the multi-year permit, ${h.P.language.cr} for the resident card, ${h.P.language.nat} for naturalisation. Renewals, nationality declarations and people over ${h.P.exam.exemptAgeOver} applying for a residence permit are outside it. For expats already settled in France, the first renewal is not affected; the next step up is. The tool above tells you, from your application and situation, whether the exam applies and at which level, and the small tool checks the age rule.`,
    faqs: (h) => [
      { q: 'Does the 2026 civic exam affect my permit renewal?', a: 'No. Renewing a multi-year permit or a resident card does not require the exam. It applies when you apply for a first multi-year permit, a first resident card or naturalisation. If you are on a renewal cycle now, the exam will matter only when you move up to the next status.' },
      { q: 'What if I filed my application before 1 January 2026?', a: `The official pages present the exam as required from ${h.date(h.P.exam.since)} for the applications concerned. For a file already under way on that date, the rule that applies depends on the filing date and the procedure: ask the préfecture handling your case, and keep proof of the date your file was lodged.` },
      { q: 'Where can I follow changes to the civic exam?', a: 'On the official sources: Légifrance for the orders, service-public.gouv.fr for practical pages, formation-civique.interieur.gouv.fr for the question lists, and the pages of the two authorised bodies. All are in French. We reread these sources by hand and date each check; if in doubt, the official version prevails.' },
    ],
    body: (h) => `
<h2>The reform's texts, in order</h2>
${h.table(['Date', 'Text or step', 'What it sets'], [['10 October 2025', 'Order on the civic exam', 'syllabus, paper, question mix'], ['18 December 2025', 'service-public.gouv.fr news item', 'announcement of the new exam'], ['22 December 2025', 'Order on proof of French', 'levels for multi-year permits and resident cards'], ['30 December 2025', 'Exemption order', 'French and exam exemptions for nationality'], [h.date(h.P.exam.since), 'Rules take effect', 'certificate required for the applications concerned'], ['3 July 2026', 'Citizen\'s booklet order', 'new booklet for naturalisation']], `Légifrance and service-public.gouv.fr, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The core text is the ${h.src('arrete_exam', 'order of 10 October 2025')}. Its Article 3 sets the paper: number of questions, time, marking, pass mark and split by theme. The other texts set the French level and the exemptions. All of them are in French; the table above gives their gist so you know which one to open if a préfecture or a centre refers to it.</p>
<h2>Three levels for three applications</h2>
${h.table(['Application', 'Exam level', 'French level'], [['First multi-year residence permit', 'multi-year permit', h.P.language.csp], ['First resident card', 'resident card', h.P.language.cr], ['Naturalisation or reinstatement by decree', 'naturalisation', h.P.language.nat]], 'service-public.gouv.fr pages F39530 and F39426.', ['l', 'l', 'l'])}
<p>The format is the same at every level: ${h.size} questions, ${h.P.exam.minutes} minutes, ${h.need} correct answers. What changes is the knowledge questions, drawn from separate lists. The ${h.a('quel-examen', 'which civic exam')} page starts from your situation to tell you which level is yours.</p>
<h2>What the reform left alone</h2>
<ul>
<li>Renewing a permit requires no exam.</li>
<li>Nationality declarations, through marriage or as a parent, grandparent or sibling of a French citizen, require none either.</li>
<li>The refugee resident card and the multi-year permit for beneficiaries of subsidiary protection and stateless people stay outside it.</li>
<li>Permits issued outside the republican integration contract are not concerned.</li>
<li>Over ${h.P.exam.exemptAgeOver}, no exam for a residence permit; for naturalisation, no age exemption.</li>
</ul>
<p>All exceptions, medical ones included, are on the ${h.a('dispenses', 'civic exam exemptions')} page. If you hold a status that is exempt today, check again before any change of permit: the exemption follows the permit applied for, not the person.</p>
<h2>How the exam works in practice</h2>
<p>Two bodies are authorised to run it: the Paris Île-de-France Chamber of Commerce, under the name Le français des affaires, and France Éducation international. They work through approved centres in France and in some French institutes and Alliances françaises abroad, which helps expats who prepare their move from outside the country. Each centre sets its own price; there is no national fee. The ${h.a('prix', 'price and booking')} page explains how to book.</p>
<p>The ministry states that preparation can be entirely free: question lists and theme sheets on its site, plus the civic training of the republican integration contract. The ${h.a('examen-blanc', 'civic exam mock test')} on this site, also free, follows the ${h.P.year} format and its official mix.</p>`,
  },
});
