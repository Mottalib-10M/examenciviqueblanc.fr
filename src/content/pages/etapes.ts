import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Schéma « deux horloges » : la durée de résidence avant le dépôt, puis le délai légal après le récépissé. */
const clocks = (h: Helpers) => {
  const fr = h.lang === 'fr', N = h.P.naturalisation;
  const t = fr
    ? { a: 'Avant le dépôt : résidence', b: 'Après le récépissé : délai légal', a1: `${N.residenceYears} ans en règle générale`, a2: `${N.reducedYears} ans en cas de réduction`, b1: `${N.decisionMonths} mois au plus`, b2: `+ ${N.extensionMonths} mois si prolongation`, mid: 'Dépôt', end: 'Décret', cap: `Deux délais se suivent : la durée de résidence exigée avant de déposer, puis le délai légal de décision de ${N.decisionMonths} mois après le récépissé (${N.decisionMonthsLongResident} mois après ${N.longResidentYears} ans en France). L’examen civique et le test de français se placent avant le dépôt.`, aria: 'Schéma des deux délais de la naturalisation' }
    : { a: 'Before filing: residence', b: 'After the receipt: legal deadline', a1: `${N.residenceYears} years as a rule`, a2: `${N.reducedYears} years on a reduced route`, b1: `${N.decisionMonths} months at most`, b2: `+ ${N.extensionMonths} months if extended`, mid: 'Filing', end: 'Decree', cap: `Two periods follow each other: the residence required before filing, then the legal decision deadline of ${N.decisionMonths} months after the receipt (${N.decisionMonthsLongResident} months after ${N.longResidentYears} years in France). The civic exam and the French test fit before filing.`, aria: 'Diagram of the two naturalisation periods' };
  return `<figure class="not-prose my-8 rounded-2xl border border-navy-200 bg-white p-5"><svg viewBox="0 0 640 170" role="img" aria-label="${t.aria}" class="h-auto w-full">
<rect x="20" y="60" width="380" height="34" rx="6" fill="var(--color-accent-700)"/><rect x="404" y="60" width="160" height="34" rx="6" fill="var(--color-accent-400)"/><rect x="568" y="60" width="52" height="34" rx="6" fill="var(--color-accent-200)"/>
<text x="210" y="48" font-size="15" font-weight="700" text-anchor="middle" fill="var(--color-navy-900)">${t.a}</text><text x="512" y="48" font-size="15" font-weight="700" text-anchor="middle" fill="var(--color-navy-900)">${t.b}</text>
<text x="210" y="82" font-size="14" font-weight="600" text-anchor="middle" fill="#fff">${t.a1}</text><text x="484" y="82" font-size="13" font-weight="600" text-anchor="middle" fill="#fff">${t.b1}</text>
<text x="210" y="118" font-size="13" text-anchor="middle" fill="var(--color-navy-700)">${t.a2}</text><text x="512" y="118" font-size="13" text-anchor="middle" fill="var(--color-navy-700)">${t.b2}</text>
<line x1="402" x2="402" y1="54" y2="140" stroke="var(--color-navy-900)" stroke-width="2"/><text x="402" y="158" font-size="13" font-weight="700" text-anchor="middle" fill="var(--color-navy-900)">${t.mid}</text>
<line x1="620" x2="620" y1="54" y2="140" stroke="var(--color-navy-900)" stroke-width="2"/><text x="612" y="158" font-size="13" font-weight="700" text-anchor="end" fill="var(--color-navy-900)">${t.end}</text>
</svg><figcaption class="mt-3 text-sm text-navy-600">${t.cap}</figcaption></figure>`;
};

export default definePage({
  id: 'etapes',
  group: 'nationalite',
  order: 109,
  tool: { kind: 'frise' },
  mini: { kind: 'mini:natyears' },
  related: ['naturalisation', 'delai', 'examen-naturalisation', 'niveau-francais', 'demande-nationalite', 'entretien'],
  sources: ['sp_nat', 'code_civil_nat', 'sp_exam_nat', 'sp_langue', 'sp_ceremonie', 'code_civil_ceremonie'],
  fr: {
    slug: 'etapes-naturalisation',
    nav: 'Étapes de la naturalisation',
    card: 'Toute la démarche en frise : examen civique, français B2, dépôt, entretien, décision, décret au Journal officiel et cérémonie d’accueil.',
    title: 'Étapes de la naturalisation : de l’examen civique au décret',
    description: 'Étapes de la naturalisation, de A à Z : examen civique, niveau B2, dépôt en ligne, entretien, décision en 18 mois, décret au JO puis cérémonie d’accueil.',
    h1: 'Les étapes de la naturalisation, de l’examen civique à la cérémonie',
    intro: 'Entrez la date de votre examen civique : la frise place chaque étape légale dans le temps et donne la date au plus tard de la cérémonie.',
    resume: (h) => `Devenir français par naturalisation suit un ordre fixé par les textes. Il faut d’abord remplir la condition de résidence, en règle générale ${h.P.naturalisation.residenceYears} ans de résidence habituelle en France, et réunir deux justificatifs : l’attestation de réussite à l’examen civique, mention naturalisation, avec ${h.need} bonnes réponses sur ${h.size}, et la preuve du niveau ${h.P.language.nat} en français. Vient ensuite le dépôt en ligne, payé par un timbre fiscal de ${h.eur(h.natFee)} ; le récépissé de dossier complet fait courir le délai légal de décision de ${h.P.naturalisation.decisionMonths} mois, ramené à ${h.P.naturalisation.decisionMonthsLongResident} mois après ${h.P.naturalisation.longResidentYears} ans de résidence et prolongeable une fois de ${h.P.naturalisation.extensionMonths} mois (code civil, article 21-25-1). Pendant l’instruction ont lieu l’enquête et l’entretien d’assimilation en préfecture. En cas d’accord, un décret est publié au Journal officiel, puis le préfet organise une cérémonie d’accueil, en principe dans les ${h.P.naturalisation.ceremonyMonths} mois. La frise ci-dessus enchaîne ces étapes à partir de la date de votre examen.`,
    faqs: (h) => [
      { q: 'Faut-il passer l’examen civique avant de déposer la demande ?', a: `Oui, il vaut mieux l’avoir réussi avant : l’attestation fait partie des pièces qui prouvent l’assimilation, et le délai de décision ne court qu’au récépissé de dossier complet. L’attestation n’expire pas, on peut donc la passer tôt, alors que le justificatif de français doit avoir moins de ${h.P.language.attestationValidityYears} ans au dépôt.` },
      { q: 'Combien d’étapes compte la naturalisation ?', a: 'Six étapes se suivent : réunir les conditions et les justificatifs, dont l’examen civique et le niveau de français, déposer en ligne, obtenir le récépissé, passer l’instruction avec l’entretien d’assimilation, recevoir la décision et le décret publié au Journal officiel, puis être convié à la cérémonie d’accueil. Seuls la décision et la cérémonie ont un délai fixé par la loi.' },
      { q: 'Pourquoi la frise ne donne-t-elle pas une date exacte de décret ?', a: `Parce que la loi fixe un plafond et non une durée : ${h.P.naturalisation.decisionMonths} mois au plus après le récépissé. Aucune source officielle ne publie le délai réel de chaque préfecture. La frise montre donc la date au plus tard si chaque délai court en entier ; une réponse plus rapide reste possible à tout moment.` },
    ],
    body: (h) => `
<h2>Les deux temps de la démarche</h2>
<p>La naturalisation se lit comme deux périodes successives. La première est la vôtre : vous accumulez la durée de résidence exigée et préparez les justificatifs. La seconde appartient à l’administration : elle commence au récépissé et se termine par la décision. Le schéma ci-dessous les met bout à bout.</p>
${clocks(h)}
<h2>Étape par étape</h2>
<ol>
<li><strong>Remplir la condition de résidence.</strong> ${h.P.naturalisation.residenceYears} ans en règle générale, ${h.P.naturalisation.reducedYears} ans dans les cas de réduction, aucune durée pour un réfugié. Le dépôt est possible dès ${h.P.naturalisation.fileFromAge} ans. La page ${h.a('naturalisation', 'naturalisation')} calcule votre date.</li>
<li><strong>Réussir l’examen civique.</strong> Mention naturalisation, ${h.size} questions en ${h.P.exam.minutes} minutes, seuil de ${h.need}. Entraînez-vous avec l’${h.a('examen-naturalisation', 'examen blanc de cette mention')}.</li>
<li><strong>Prouver le niveau ${h.P.language.nat}.</strong> Diplôme français ou test de moins de ${h.P.language.attestationValidityYears} ans : voir la page ${h.a('niveau-francais', 'niveau de français')}.</li>
<li><strong>Déposer en ligne.</strong> Le timbre fiscal de ${h.eur(h.natFee)} est le seul coût officiel ; le délai de décision part du récépissé de dossier complet.</li>
<li><strong>Instruction et entretien.</strong> Enquête, puis ${h.a('entretien', 'entretien d’assimilation')} en préfecture et signature de la charte des droits et devoirs du citoyen français.</li>
<li><strong>Décision et décret.</strong> ${h.P.naturalisation.decisionMonths} mois au plus, ou ${h.P.naturalisation.decisionMonthsLongResident} mois, prolongeables une fois de ${h.P.naturalisation.extensionMonths} mois. En cas d’accord, un courriel suit la publication du décret au Journal officiel.</li>
<li><strong>Cérémonie d’accueil.</strong> Organisée par le préfet, en principe dans les ${h.P.naturalisation.ceremonyMonths} mois, avec la remise d’un dossier d’accueil.</li>
</ol>
<h2>Ce que la frise montre, et ce qu’elle ne montre pas</h2>
<p>Chaque segment de la frise a la longueur de son délai légal maximal, lu dans le ${h.src('code_civil_nat', 'code civil')} et sur la ${h.src('sp_ceremonie', 'fiche officielle de la cérémonie')}. Les étapes sans durée officielle, comme le dépôt ou la publication du décret, apparaissent comme des jalons. La frise ne prédit pas le délai réel de votre préfecture, qu’aucun texte ne publie ; elle dit jusqu’à quand chaque étape peut légalement durer. Pour la date exacte de l’échéance de décision à partir de votre récépissé, utilisez l’outil de la page ${h.a('delai', 'délai de naturalisation')}.</p>
<h2>Les erreurs qui allongent le parcours</h2>
<ul>
<li>Passer le test de français trop tôt : au-delà de ${h.P.language.attestationValidityYears} ans, il n’est plus accepté au dépôt.</li>
<li>Déposer un dossier incomplet : le délai légal ne démarre pas tant que le récépissé n’est pas remis.</li>
<li>Manquer l’entretien sans raison légitime : la demande peut être classée sans suite.</li>
</ul>`,
  },
  en: {
    slug: 'naturalisation-steps',
    nav: 'Naturalisation steps',
    card: 'The whole process on a timeline: civic exam, B2 French, filing, interview, decision, decree in the Journal officiel and welcome ceremony.',
    title: 'Naturalisation steps in France: civic exam to ceremony',
    description: 'Naturalisation steps in France from A to Z: civic exam, B2 French, online filing, interview, decision within 18 months, decree, then the welcome ceremony.',
    h1: 'French naturalisation steps, from the civic exam to the ceremony',
    intro: 'Enter the date of your civic exam: the timeline places each legal step in time and gives the latest date for the ceremony.',
    resume: (h) => `Becoming French by naturalisation follows an order set by law. First you meet the residence condition, as a rule ${h.P.naturalisation.residenceYears} years of habitual residence in France, and gather two proofs: the civic exam pass certificate at naturalisation level, with ${h.need} correct answers out of ${h.size}, and proof of French at level ${h.P.language.nat}. Then comes online filing, paid with a ${h.eur(h.natFee)} tax stamp; the receipt for a complete file starts the legal decision deadline of ${h.P.naturalisation.decisionMonths} months, cut to ${h.P.naturalisation.decisionMonthsLongResident} months after ${h.P.naturalisation.longResidentYears} years of residence and extendable once by ${h.P.naturalisation.extensionMonths} months (Civil Code, article 21-25-1). During the review come the inquiry and the assimilation interview at the préfecture. If the answer is yes, a decree is published in the Journal officiel, and the prefect then holds a welcome ceremony, as a rule within ${h.P.naturalisation.ceremonyMonths} months. The timeline above chains these steps from the date of your exam, so you can see the whole path at a glance.`,
    faqs: (h) => [
      { q: 'Should I sit the civic exam before I apply?', a: `Yes, ideally: the certificate is one of the documents proving integration, and the decision clock only starts at the receipt for a complete file. The certificate never expires, so you can sit it early, whereas your French test result must be under ${h.P.language.attestationValidityYears} years old when you file.` },
      { q: 'How many steps does French naturalisation have?', a: 'Six steps in a row: meet the conditions and gather the proofs, including the civic exam and French level; file online; get the receipt; go through the review and the assimilation interview; receive the decision and the decree published in the Journal officiel; then be invited to the welcome ceremony. Only the decision and the ceremony have deadlines set by law.' },
      { q: 'Why does the timeline not give an exact decree date?', a: `Because the law sets a ceiling, not a duration: ${h.P.naturalisation.decisionMonths} months at most after the receipt. No official source publishes each préfecture's real waiting time. The timeline therefore shows the latest date if every period runs in full; a faster answer is always possible.` },
    ],
    body: (h) => `
<h2>Two halves of the process</h2>
<p>Naturalisation reads as two periods back to back. The first is yours: you build up the residence required and prepare your documents. The second belongs to the administration: it starts at the receipt and ends with the decision. The diagram below puts them end to end.</p>
${clocks(h)}
<h2>Step by step</h2>
<ol>
<li><strong>Meet the residence condition.</strong> ${h.P.naturalisation.residenceYears} years as a rule, ${h.P.naturalisation.reducedYears} on a reduced route, none for a refugee. You can file from age ${h.P.naturalisation.fileFromAge}. The ${h.a('naturalisation', 'naturalisation page')} works out your date.</li>
<li><strong>Pass the civic exam.</strong> Naturalisation level, ${h.size} questions in ${h.P.exam.minutes} minutes, pass mark ${h.need}, in French only. Practise with the ${h.a('examen-naturalisation', 'mock test at this level')}.</li>
<li><strong>Prove level ${h.P.language.nat} French.</strong> A French diploma or a test under ${h.P.language.attestationValidityYears} years old: see the ${h.a('niveau-francais', 'French level page')}.</li>
<li><strong>File online.</strong> The ${h.eur(h.natFee)} tax stamp is the only official cost; the decision clock starts at the receipt for a complete file.</li>
<li><strong>Review and interview.</strong> An inquiry, then the ${h.a('entretien', 'assimilation interview')} at the préfecture and the signing of the charter of rights and duties of the French citizen.</li>
<li><strong>Decision and decree.</strong> ${h.P.naturalisation.decisionMonths} months at most, or ${h.P.naturalisation.decisionMonthsLongResident}, extendable once by ${h.P.naturalisation.extensionMonths}. If yes, an email follows the decree's publication in the Journal officiel.</li>
<li><strong>Welcome ceremony.</strong> Held by the prefect, as a rule within ${h.P.naturalisation.ceremonyMonths} months, with a welcome pack handed over.</li>
</ol>
<h2>What the timeline shows, and what it does not</h2>
<p>Each segment is as long as its maximum legal deadline, read in the ${h.src('code_civil_nat', 'Civil Code')} and on the ${h.src('sp_ceremonie', 'official ceremony page')}. Steps with no official duration, such as filing or the decree's publication, appear as milestones. The timeline does not predict your préfecture's real waiting time, which no text publishes; it shows how long each step may legally last. For the exact decision deadline from your receipt, use the tool on the ${h.a('delai', 'processing time page')}.</p>
<h2>Mistakes that make the path longer</h2>
<ul>
<li>Taking the French test too early: after ${h.P.language.attestationValidityYears} years it is no longer accepted at filing.</li>
<li>Filing an incomplete application: the legal clock does not start until the receipt is issued.</li>
<li>Missing the interview without a legitimate reason: the application can be closed.</li>
</ul>`,
  },
});
