import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'livret',
  group: 'langue',
  order: 102,
  tool: { kind: 'quiz', props: { mention: 'nat', mode: 'practice', theme: 4 } },
  mini: { kind: 'mini:quota', props: { t: 4 } },
  related: ['entretien', 'examen-naturalisation', 'theme-4', 'naturalisation', 'conditions'],
  sources: ['arrete_livret', 'sp_nat', 'code_civil_nat', 'charte', 'referentiel'],
  fr: {
    slug: 'livret-du-citoyen',
    nav: 'Livret du citoyen',
    card: 'Le livret approuvé par l’arrêté du 3 juillet 2026 : où le lire, à quoi il sert et comment le travailler avant l’entretien.',
    title: 'Livret du citoyen 2026 : nouvelle version et préparation',
    description: 'Livret du citoyen approuvé par l’arrêté du 3 juillet 2026 : où lire la version en vigueur, son rôle pour l’entretien d’assimilation et questions pour réviser.',
    h1: 'Livret du citoyen : la version de juillet 2026 et comment s’en servir',
    intro: 'Révisez l’histoire, la géographie et la culture avec des questions corrigées aussitôt, puis lisez le livret pour préparer l’entretien d’assimilation.',
    resume: (h) => `Le livret du citoyen est le document que l’administration met à la disposition des candidats à la nationalité française pour préparer l’entretien d’assimilation en préfecture. Sa version actuelle a été approuvée par l’arrêté du 3 juillet 2026 (NOR INTV2612527A), publié au Journal officiel du 16 juillet 2026, qui abroge l’arrêté du 4 février 2022 approuvant l’ancien livret. Le texte du livret figure en annexe de cet arrêté et se consulte sur Légifrance, dans l’extrait authentifié du Journal officiel électronique. Il accompagne une exigence du code civil : justifier d’une connaissance suffisante de la langue, de l’histoire, de la culture et de la société françaises, des droits et devoirs du citoyen, et adhérer aux principes et valeurs de la République. Depuis le ${h.date(h.P.exam.since)}, l’examen civique mention naturalisation s’ajoute à l’entretien. L’outil ci-dessus propose des questions de la thématique histoire, géographie et culture, qui pèse ${h.quota(4).total} questions sur ${h.size} dans l’examen, avec une correction immédiate.`,
    faqs: (h) => [
      { q: 'Où télécharger le livret du citoyen en vigueur ?', a: 'Sur Légifrance. Le livret est l’annexe de l’arrêté du 3 juillet 2026 portant approbation du livret du citoyen, publié au Journal officiel du 16 juillet 2026. La page de l’arrêté renvoie à l’extrait authentifié du Journal officiel électronique, qui contient le texte complet avec ses images. Évitez les copies hébergées ailleurs : elles peuvent reprendre l’ancienne version de 2022.' },
      { q: 'L’ancien livret de 2022 est-il encore utile ?', a: 'Il n’est plus la référence. L’arrêté du 3 juillet 2026 abroge expressément celui du 4 février 2022 qui l’approuvait. Certaines notions restent bien sûr les mêmes, mais réviser sur la version abrogée expose à des informations dépassées. Si un document que vous avez téléchargé ne mentionne pas l’arrêté de 2026, considérez qu’il s’agit de l’ancien livret.' },
      { q: 'Le livret du citoyen suffit-il pour réussir l’examen civique ?', a: `Non, ce sont deux préparations qui se recoupent sans se confondre. Le livret prépare l’entretien d’assimilation ; l’examen civique suit son propre programme, fixé par l’arrêté du 10 octobre 2025, avec ${h.size} questions sur cinq thématiques et un seuil de ${h.need}. Les fiches thématiques du ministère et un entraînement sur des questions corrigées complètent utilement la lecture du livret.` },
    ],
    body: (h) => {
      const ex = h.q('o4-031');
      return `
<h2>Ce que dit l’arrêté du 3 juillet 2026</h2>
<p>L’arrêté tient en trois articles. Le premier approuve le livret du citoyen figurant en annexe. Le deuxième abroge l’arrêté du 4 février 2022, qui avait approuvé la version précédente. Le troisième ordonne la publication au Journal officiel, intervenue le 16 juillet 2026. Il est pris en application du code civil, dont l’article 21-24 fait de l’assimilation à la communauté française une condition de la naturalisation.</p>
${h.table(['Élément', 'Référence'], [['Texte', 'arrêté du 3 juillet 2026 portant approbation du livret du citoyen'], ['NOR', 'INTV2612527A'], ['Publication', 'Journal officiel du 16 juillet 2026'], ['Texte abrogé', 'arrêté du 4 février 2022'], ['Où lire le livret', 'annexe, extrait authentifié du Journal officiel électronique']], `Relu sur Légifrance le ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Le lien vers l’arrêté figure dans les sources en bas de page : ${h.src('arrete_livret', 'arrêté du 3 juillet 2026 sur Légifrance')}.</p>
<h2>À quoi sert le livret dans une demande de nationalité</h2>
<p>La fiche service-public.gouv.fr sur la naturalisation le présente simplement : pour préparer l’entretien, vous pouvez consulter le livret du citoyen. Cet entretien a lieu en préfecture si la demande est recevable et vise à vérifier votre assimilation. Le code civil précise ce que recouvre cette assimilation : une connaissance suffisante de la langue, de l’histoire, de la culture et de la société françaises, la connaissance des droits et devoirs liés à la nationalité et l’adhésion aux principes et valeurs de la République. À l’issue de ce contrôle, le candidat signe la charte des droits et devoirs du citoyen français. Notre page sur l’${h.a('entretien', 'entretien de naturalisation')} détaille son déroulement.</p>
<h2>Livret, charte, examen civique : trois documents à ne pas confondre</h2>
<ul>
<li><strong>Le livret du citoyen</strong> : un support de révision, approuvé par arrêté, pour l’entretien d’assimilation.</li>
<li><strong>La charte des droits et devoirs du citoyen français</strong> : un texte approuvé par décret, qui rappelle les principes, valeurs et symboles essentiels de la République, et que l’on signe à la fin de l’entretien.</li>
<li><strong>L’examen civique</strong> : une épreuve de ${h.size} questions passée dans un centre agréé, avec son programme propre et une attestation à joindre au dossier. Entraînez-vous sur l’${h.a('examen-naturalisation', 'examen civique mention naturalisation')}.</li>
</ul>
<h2>Réviser l’histoire, la géographie et la culture</h2>
<p>C’est le terrain où le livret et l’examen se rejoignent le plus. La thématique 4 de l’examen, ${h.theme(4)}, compte ${h.quota(4).total} questions : ${h.quota(4).notions.histoire} d’histoire, ${h.quota(4).notions.geographie} de géographie et ${h.quota(4).notions.patrimoine} de patrimoine. Une question typique de notre banque : « ${ex ? ex[h.lang].q : ''} ». Ce type de repère se retient mieux par séries courtes que par une lecture d’une traite.</p>
<p>Une méthode simple : lisez une partie du livret, puis lancez l’entraînement en haut de page sur la même thématique. Notez les réponses manquées, relisez le passage correspondant, recommencez le lendemain. La page ${h.a('theme-4', 'histoire, géographie et culture')} rassemble toutes nos questions de cette thématique.</p>
<h2>Les erreurs fréquentes</h2>
<ul>
<li>Réviser sur un livret téléchargé sur un site tiers sans vérifier qu’il s’agit bien de la version approuvée en 2026.</li>
<li>Attendre la convocation pour ouvrir le livret : l’entretien n’arrive qu’une fois la demande jugée recevable, mais la préparation se fait mieux sur la durée.</li>
<li>Croire que l’attestation d’examen civique dispense de l’entretien : les deux étapes figurent dans la procédure de naturalisation.</li>
<li>Négliger le niveau de langue : l’entretien se prépare aussi en parlant, pas seulement en lisant.</li>
</ul>`;
    },
  },
  en: {
    slug: 'citizens-booklet',
    nav: 'Citizen’s booklet',
    card: 'The livret du citoyen approved on 3 July 2026: where to read it, what it is for and how to revise with it before the interview.',
    title: 'Livret du citoyen: French citizen’s booklet, 2026 edition',
    description: 'Livret du citoyen, the booklet for French citizenship applicants approved on 3 July 2026: where to read it, its role at the interview and how to revise for it.',
    h1: 'The livret du citoyen: the July 2026 booklet and how to use it',
    intro: 'Revise history, geography and culture with questions marked as you go, then read the booklet to prepare for the assimilation interview.',
    resume: (h) => `The livret du citoyen, or citizen’s booklet, is the document the French administration offers naturalisation applicants to prepare for the assimilation interview at the préfecture. The current edition was approved by an order of 3 July 2026 (NOR INTV2612527A), published in the Journal officiel on 16 July 2026, which repeals the order of 4 February 2022 behind the previous booklet. The booklet itself is the annex to that order and can be read on Légifrance, in the authenticated extract of the electronic Journal officiel. It supports a requirement of the Civil Code: applicants must show sufficient knowledge of the French language, history, culture and society and of a citizen’s rights and duties, and must adhere to the principles and values of the Republic. Since ${h.date(h.P.exam.since)}, the naturalisation-level civic exam has been required on top of the interview. The tool above gives you practice questions on history, geography and culture, a theme worth ${h.quota(4).total} of the ${h.size} exam questions, each marked straight away.`,
    faqs: (h) => [
      { q: 'Is there an official English version of the livret du citoyen?', a: `The approved booklet is the annex to a French order published in the Journal officiel, and that French text is the reference. We have not found an official translation alongside it on Légifrance. A translation can help you understand, but citizenship requires level ${h.P.language.nat} French, so revise the key notions in French as well.` },
      { q: 'Where can I read the current livret du citoyen?', a: 'On Légifrance, as the annex to the order of 3 July 2026 approving the livret du citoyen. The order page points to the authenticated extract of the electronic Journal officiel, which holds the full text with its images. Copies on other websites may still be the 2022 edition, which the 2026 order repealed.' },
      { q: 'Does the booklet cover everything in the civic exam?', a: `No. The booklet prepares you for the interview; the civic exam follows its own syllabus, set by the order of 10 October 2025, with ${h.size} questions over five themes and a pass mark of ${h.need}. Use the ministry’s revision sheets and marked practice questions alongside the booklet.` },
    ],
    body: (h) => {
      const ex = h.q('o4-031');
      return `
<h2>What the order of 3 July 2026 does</h2>
<p>The order has three articles. The first approves the booklet set out in its annex. The second repeals the order of 4 February 2022, which had approved the previous edition. The third orders publication in the Journal officiel, which followed on 16 July 2026. It rests on the Civil Code, whose article 21-24 makes assimilation into the French community a condition of naturalisation.</p>
${h.table(['Item', 'Reference'], [['Text', 'order of 3 July 2026 approving the livret du citoyen'], ['NOR', 'INTV2612527A'], ['Published', 'Journal officiel, 16 July 2026'], ['Repealed', 'order of 4 February 2022'], ['Where to read it', 'annex, authenticated extract of the electronic Journal officiel']], `Checked on Légifrance on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>You can open the order directly: ${h.src('arrete_livret', 'order of 3 July 2026 on Légifrance')}.</p>
<h2>Where the booklet fits in a citizenship application</h2>
<p>The service-public.gouv.fr page on naturalisation puts it plainly: to prepare for the interview, you can read the livret du citoyen. The interview takes place at the préfecture once your application is found admissible, and its purpose is to check your assimilation. The Civil Code spells out what that means: enough knowledge of the language, history, culture and society of France, knowledge of the rights and duties that come with citizenship, and adherence to the values of the Republic. At the end, you sign the charter of the rights and duties of the French citizen. Our page on the ${h.a('entretien', 'naturalisation interview')} walks through it.</p>
<h2>Booklet, charter and civic exam</h2>
<ul>
<li><strong>The livret du citoyen</strong>: revision material, approved by order, for the assimilation interview.</li>
<li><strong>The charter of rights and duties</strong>: a text approved by decree that recalls the core principles, values and symbols of the Republic; you sign it after the interview.</li>
<li><strong>The civic exam</strong>: a ${h.size}-question test in an approved centre, with its own syllabus and a certificate for your file. Practise on the ${h.a('examen-naturalisation', 'naturalisation-level civic exam')}.</li>
</ul>
<h2>Revising history, geography and culture</h2>
<p>This is where the booklet and the exam overlap most. Theme 4 of the exam, ${h.theme(4)}, has ${h.quota(4).total} questions: ${h.quota(4).notions.histoire} on history, ${h.quota(4).notions.geographie} on geography and ${h.quota(4).notions.patrimoine} on heritage. A typical question from our bank: "${ex ? ex[h.lang].q : ''}" Dates and places like this stick better in short daily rounds than in one long read.</p>
<p>For expats who did not go to school in France, these references are often the least familiar part. Read a section of the booklet, then run the practice set at the top of the page on the same theme. Note what you missed, reread that passage and go again the next day. Our ${h.a('theme-4', 'history, geography and culture page')} gathers every question on the theme.</p>
<h2>Common mistakes</h2>
<ul>
<li>Revising from a copy found on a third-party site without checking that it is the edition approved in 2026.</li>
<li>Waiting for the interview letter before opening the booklet: the notions take time to settle, especially in a second language.</li>
<li>Assuming the civic exam certificate replaces the interview: naturalisation includes both steps.</li>
<li>Reading in silence only: practise saying the key ideas out loud in French, since the interview is a conversation.</li>
</ul>`;
    },
  },
});
