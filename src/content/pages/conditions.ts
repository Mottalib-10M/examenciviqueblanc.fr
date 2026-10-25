import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'conditions',
  group: 'nationalite',
  order: 111,
  tool: { kind: 'date', props: { route: 'nat5', routes: 'nat5,nat2,nat0' } },
  mini: { kind: 'mini:natyears' },
  related: ['naturalisation', 'niveau-francais', 'entretien', 'demande-nationalite', 'dispenses'],
  sources: ['sp_nat', 'code_civil_nat', 'decret_nat', 'sp_langue', 'arrete_dispense'],
  fr: {
    slug: 'conditions-naturalisation',
    nav: 'Conditions de la naturalisation',
    card: 'Âge, résidence, titre de séjour, ressources, casier, langue, examen civique et entretien : la liste à cocher avant de déposer.',
    title: 'Conditions de naturalisation : la liste complète à vérifier',
    description: 'Conditions de naturalisation : âge, 5 ans de résidence ou durée réduite, titre de séjour, ressources, casier, niveau B2, examen civique et entretien, une à une.',
    h1: 'Conditions de la naturalisation : chaque critère, un par un',
    intro: 'Vérifiez d’abord la condition de durée avec l’outil, puis passez en revue les autres critères de la liste ci-dessous.',
    resume: (h) => `Les conditions de la naturalisation se répartissent en trois blocs. Le premier tient à la personne et à son séjour : avoir ${h.P.naturalisation.minAge} ans (dépôt possible dès ${h.P.naturalisation.fileFromAge} ans), résider habituellement en France depuis ${h.P.naturalisation.residenceYears} ans, ou ${h.P.naturalisation.reducedYears} ans dans les cas de durée réduite, sans durée pour les réfugiés et quelques autres profils, et détenir un titre de séjour valide, sauf pour les citoyens de l’Union européenne, de l’Espace économique européen et de la Suisse. Le deuxième bloc porte sur la situation matérielle et la conduite : ressources stables et suffisantes, centre des intérêts matériels en France, aucune condamnation à ${h.P.naturalisation.prisonMonthsBar} mois de prison ou plus sans sursis, bonnes mœurs. Le troisième bloc est l’assimilation : niveau de français ${h.P.language.nat}, examen civique mention naturalisation, entretien en préfecture et signature de la charte des droits et devoirs. L’outil ci-dessus vérifie la seule condition qui se calcule, la durée de résidence, et donne la date à laquelle elle est remplie.`,
    faqs: (h) => [
      { q: 'Faut-il un CDI pour remplir la condition de ressources ?', a: 'Les textes parlent de ressources stables et suffisantes, sans exiger un type de contrat précis. L’administration regarde la régularité des revenus dans la durée et leur niveau. Un travail indépendant ou une succession de contrats peuvent convenir s’ils montrent cette stabilité. Joignez les justificatifs de revenus et d’impôts des dernières années pour la démontrer.' },
      { q: 'Une condamnation avec sursis empêche-t-elle la naturalisation ?', a: `La condition légale vise une condamnation à ${h.P.naturalisation.prisonMonthsBar} mois de prison ou plus sans sursis. Une peine avec sursis ou plus courte ne ferme pas automatiquement la porte, mais elle entre dans l’appréciation des bonnes mœurs et du comportement civique. L’administration peut alors rejeter ou ajourner la demande. Mieux vaut la déclarer que la taire.` },
      { q: 'Les citoyens européens doivent-ils remplir les mêmes conditions ?', a: `Oui pour l’essentiel : durée de résidence, niveau ${h.P.language.nat}, examen civique, ressources et entretien. La seule différence notable est le titre de séjour : les ressortissants de l’Union européenne, de l’Espace économique européen et de la Suisse n’ont pas à en produire un. Ils doivent tout de même prouver leur résidence habituelle en France sur la durée exigée.` },
      { q: 'Peut-on déposer avant d’avoir réussi l’examen civique ?', a: 'Non. L’attestation de réussite à l’examen civique fait partie des pièces du dossier de naturalisation. Comme elle n’a pas de limite de durée de validité, rien n’empêche de la passer bien avant d’être éligible. C’est même conseillé : vous gardez le temps de repasser l’épreuve si besoin sans retarder le dépôt.' },
    ],
    body: (h) => `
<h2>La liste à cocher</h2>
${h.table(['Condition', 'Exigence', 'Comment la prouver'], [['Âge', `${h.P.naturalisation.minAge} ans, dépôt dès ${h.P.naturalisation.fileFromAge} ans`, 'pièce d’identité, acte de naissance'], ['Résidence habituelle', `${h.P.naturalisation.residenceYears} ans (ou ${h.P.naturalisation.reducedYears} ans, ou aucune)`, 'justificatifs de domicile, travail, études'], ['Titre de séjour', 'valide au dépôt (sauf UE, EEE, Suisse)', 'copie recto verso'], ['Ressources', 'stables et suffisantes', 'revenus et avis d’impôt'], ['Casier', `aucune peine de ${h.P.naturalisation.prisonMonthsBar} mois ou plus sans sursis`, 'vérifié par l’administration'], ['Français', h.P.language.nat, 'diplôme ou test de moins de ' + h.P.language.attestationValidityYears + ' ans'], ['Examen civique', `mention naturalisation, ${h.need} sur ${h.size}`, 'attestation de réussite'], ['Assimilation', 'entretien en préfecture, charte signée', 'convocation']], `Conditions de la fiche service-public.gouv.fr et du code civil, relues le ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Qui bénéficie d’une durée réduite ou nulle</h2>
<p>La durée de ${h.P.naturalisation.residenceYears} ans est la règle, mais le code civil prévoit deux régimes plus favorables. Ils changent votre date de dépôt du tout au tout : vérifiez-les avant de conclure que vous devez attendre.</p>
<ul>
<li><strong>${h.P.naturalisation.reducedYears} ans suffisent</strong> si vous avez obtenu un diplôme de l’enseignement supérieur français après deux années d’études en France, si vous avez rendu des services importants à la France, ou si votre intégration est jugée exceptionnelle.</li>
<li><strong>Aucune durée n’est exigée</strong> pour les réfugiés, les francophones de langue maternelle venant d’un pays francophone, les personnes scolarisées ${h.P.naturalisation.residenceYears} ans en français dans un établissement francophone, celles qui ont servi dans l’armée française ou se sont engagées en temps de guerre, et les auteurs de services exceptionnels.</li>
</ul>
<p>Le mini-outil sous le résumé fait le compte pour la durée réduite liée au diplôme ; l’outil principal couvre les trois régimes avec une date précise.</p>
<h2>Démontrer la résidence habituelle</h2>
<p>La durée ne se prouve pas par un seul document. L’administration cherche à savoir si la France est le centre de vos intérêts matériels : vos attaches professionnelles, votre famille, votre logement. Rassemblez, année par année, des justificatifs de domicile, des preuves d’activité ou d’études, vos revenus et vos avis d’impôt. Les actes établis à l’étranger, comme un acte de naissance ou de mariage, doivent être accompagnés d’une traduction certifiée : commandez-les tôt, car ce sont souvent eux qui retardent le dépôt. Si vous avez vécu un temps hors de France, l’outil de date reste valable à condition de choisir comme point de départ le moment où votre vie s’est réellement réinstallée ici.</p>
<h2>L’assimilation, la condition qui se prépare</h2>
<p>L’article 21-24 du code civil demande de justifier de son assimilation à la communauté française. Concrètement, quatre éléments la composent depuis 2026. Le ${h.a('niveau-francais', 'niveau de français')} ${h.P.language.nat}, prouvé par un diplôme ou un test récent. L’examen civique mention naturalisation, sans dispense d’âge. L’${h.a('entretien', 'entretien d’assimilation')} en préfecture, qui vérifie la connaissance de l’histoire, de la culture, de la société françaises et des droits et devoirs. Enfin la signature de la charte des droits et devoirs du citoyen français à la fin de cet entretien.</p>
<h2>Les points qui font échouer un dossier</h2>
<ol>
<li>Un titre de séjour expiré ou en cours de renouvellement au moment du dépôt, alors qu’il doit être valide.</li>
<li>Une attestation de langue de plus de ${h.P.language.attestationValidityYears} ans, ou d’un niveau inférieur à ${h.P.language.nat}.</li>
<li>Des revenus irréguliers sans explication, ou des impôts non déclarés : l’enquête porte sur le comportement civique.</li>
<li>Une résidence trop courte une fois les longs séjours à l’étranger pris en compte, quand le centre des intérêts n’est plus clairement en France.</li>
</ol>
<p>Les ${h.a('dispenses', 'dispenses')} existent pour raison médicale et, pour la langue, pour le réfugié ou l’apatride de plus de ${h.P.language.natExemptRefugeeAge} ans installé en France depuis ${h.P.language.natExemptRefugeeYears} ans. La fiche ${h.src('sp_nat', 'naturalisation de service-public.gouv.fr')} détaille les pièces attendues pour chaque situation.</p>`,
  },
  en: {
    slug: 'naturalisation-requirements',
    nav: 'Naturalisation requirements',
    card: 'Age, residence, permit, income, record, language, civic exam and interview: the checklist to run before you apply.',
    title: 'Naturalisation requirements in France: the full checklist',
    description: 'Naturalisation requirements in France: age, 5 years of residence or a shorter route, permit, income, record, B2 French, civic exam and interview, one by one.',
    h1: 'French naturalisation requirements, one by one',
    intro: 'Check the residence period with the tool first, then work through the rest of the checklist below.',
    resume: (h) => `The requirements for French naturalisation fall into three groups. The first is about you and your stay: be ${h.P.naturalisation.minAge} (you can file from ${h.P.naturalisation.fileFromAge}), have lived habitually in France for ${h.P.naturalisation.residenceYears} years, or ${h.P.naturalisation.reducedYears} years on a reduced route, with no minimum for refugees and a few other groups, and hold a valid residence permit unless you are an EU, EEA or Swiss national. The second group covers your finances and conduct: stable and sufficient income, the centre of your material interests in France, no prison sentence of ${h.P.naturalisation.prisonMonthsBar} months or more that was not suspended, and good character. The third is assimilation: French at level ${h.P.language.nat}, a pass in the naturalisation-level civic exam, an interview at the préfecture and signing the charter of the rights and duties of the French citizen. The tool above checks the one requirement that can be calculated, the residence period, and gives the date on which you meet it.`,
    faqs: (h) => [
      { q: 'Does income earned abroad or as a freelancer count?', a: 'The rule asks for stable and sufficient income without naming a type of contract. What the administration looks for is regular income over time and its level, and that the centre of your material interests is in France. Freelance or contract work can qualify if it shows that stability; bring income and tax records for recent years.' },
      { q: 'I am an EU citizen. What is different for me?', a: `Very little. You still need the residence period, French at ${h.P.language.nat}, the civic exam, sufficient income and the interview. The one notable difference is the permit: EU, EEA and Swiss nationals do not have to produce one. You must still prove habitual residence in France for the whole period, so keep leases, payslips and tax notices.` },
      { q: 'Should I pass the civic exam before I am eligible?', a: 'Yes, it is a good idea. The civic exam certificate is part of the naturalisation file, and it has no expiry date. Sitting it early means a failed attempt costs you nothing in time: you can retake it while you wait for your residence period to run, and file as soon as you reach the date.' },
    ],
    body: (h) => `
<h2>The checklist</h2>
${h.table(['Requirement', 'What is asked', 'How you show it'], [['Age', `${h.P.naturalisation.minAge}, file from ${h.P.naturalisation.fileFromAge}`, 'ID, birth certificate'], ['Habitual residence', `${h.P.naturalisation.residenceYears} years (or ${h.P.naturalisation.reducedYears}, or none)`, 'proof of address, work, study'], ['Residence permit', 'valid when you file (not for EU, EEA, Swiss)', 'copy of both sides'], ['Income', 'stable and sufficient', 'payslips, tax notices'], ['Criminal record', `no unsuspended sentence of ${h.P.naturalisation.prisonMonthsBar} months or more`, 'checked by the authorities'], ['French', h.P.language.nat, 'diploma or test under ' + h.P.language.attestationValidityYears + ' years old'], ['Civic exam', `naturalisation level, ${h.need} of ${h.size}`, 'pass certificate'], ['Assimilation', 'préfecture interview, charter signed', 'interview letter']], `From service-public.gouv.fr and the Civil Code, checked on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Shorter routes worth checking first</h2>
<p>The ${h.P.naturalisation.residenceYears}-year rule is the default, but two more generous regimes can move your date forward by years.</p>
<ul>
<li><strong>${h.P.naturalisation.reducedYears} years</strong> if you earned a French higher-education degree after two years of study in France, rendered important services to France, or show exceptional integration. Former international students are the group that most often misses this.</li>
<li><strong>No minimum</strong> for refugees, native French speakers from a French-speaking country, people with ${h.P.naturalisation.residenceYears} years of schooling in French at a French-language school, those who served in the French army or volunteered in wartime, and people who rendered exceptional services.</li>
</ul>
<h2>Proving habitual residence</h2>
<p>No single document proves the residence period. The administration wants to see that France is the centre of your material interests: your work, your family and your home. Build a year-by-year file of proof of address, employment or study, income and tax notices. Certificates issued abroad, such as birth or marriage certificates, need certified translations, and they are often what delays a file, so order them early. If you lived elsewhere for a while, the date tool still works: enter the day your life genuinely moved back to France as the starting point.</p>
<p>Expats often ask whether years spent in France on a company secondment or as a student count. The text speaks of habitual residence with a valid permit where one is required, and the préfecture weighs the whole picture. What helps is continuity: a lease or property in your name, French payslips or business income, tax returns filed in France and children at school here.</p>
<h2>Assimilation: the requirement you prepare for</h2>
<p>Article 21-24 of the Civil Code requires applicants to show assimilation into the French community. Since 2026 that means four things: ${h.a('niveau-francais', 'French at level')} ${h.P.language.nat}, proved by a diploma or a recent test; the naturalisation-level civic exam, with no age exemption; the ${h.a('entretien', 'assimilation interview')} at the préfecture, which checks your knowledge of French history, culture, society and of citizens’ rights and duties; and signing the charter of rights and duties at the end of that interview.</p>
<h2>What sinks applications</h2>
<ol>
<li>A permit that has expired or is mid-renewal on the day you file.</li>
<li>A language result older than ${h.P.language.attestationValidityYears} years, or below ${h.P.language.nat}.</li>
<li>Irregular income with no explanation, or undeclared tax: the inquiry covers your civic conduct.</li>
<li>Long spells abroad that leave doubt over whether France is still the centre of your life.</li>
</ol>
<p>The last point matters for mobile professionals. If your job takes you abroad often, keep a clear trail showing that home, family and tax residence stayed in France. ${h.a('dispenses', 'Exemptions')} exist on medical grounds and, for the language proof, for refugees or stateless people over ${h.P.language.natExemptRefugeeAge} with ${h.P.language.natExemptRefugeeYears} years in France. The ${h.src('sp_nat', 'service-public.gouv.fr naturalisation page')} lists the documents expected for each situation.</p>`,
  },
});
