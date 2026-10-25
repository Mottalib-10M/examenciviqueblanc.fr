import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'niveau-francais',
  group: 'langue',
  order: 100,
  tool: { kind: 'level', props: { title: 'cr' } },
  mini: { kind: 'mini:level' },
  related: ['tcf-irn', 'quel-examen', 'naturalisation', 'carte-resident', 'mariage', 'dispenses'],
  sources: ['sp_langue', 'arrete_langue', 'arrete_dispense', 'sp_exam_sejour', 'code_civil_nat'],
  fr: {
    slug: 'niveau-de-francais-titre-de-sejour',
    nav: 'Niveau de français exigé',
    card: 'A2, B1 ou B2 : le niveau de langue que réclame chaque titre et la naturalisation, avec les preuves acceptées.',
    title: 'Niveau de français A2, B1, B2 : séjour et naturalisation',
    description: 'Niveau de français exigé en 2026 : A2 pour la carte pluriannuelle, B1 pour la carte de résident, B2 pour la nationalité, avec les diplômes et tests acceptés.',
    h1: 'Niveau de français exigé : A2, B1 ou B2 selon votre démarche',
    intro: 'Indiquez votre titre, votre âge et votre situation : l’outil affiche le niveau de langue à prouver et la mention d’examen civique qui l’accompagne.',
    resume: (h) => `Le niveau de français demandé aux étrangers dépend de la stabilité du statut visé. Une première carte de séjour pluriannuelle exige le niveau ${h.P.language.csp}, une première carte de résident ou une carte de résident de longue durée-UE le niveau ${h.P.language.cr}, et la naturalisation comme la nationalité par mariage le niveau ${h.P.language.nat}. Ce niveau se prouve par un diplôme français, par exemple le brevet ou un diplôme de niveau 3 et plus, ou par un test linguistique reconnu, le TCF de France Éducation international ou le TEF de la CCI Paris Île-de-France, passé depuis moins de ${h.P.language.attestationValidityYears} ans. Le justificatif de langue ne remplace pas l’examen civique : pour la carte pluriannuelle, la carte de résident et la naturalisation, il faut les deux. Des dispenses existent pour raison médicale et, en naturalisation, pour le réfugié ou l’apatride de plus de ${h.P.language.natExemptRefugeeAge} ans installé en France depuis ${h.P.language.natExemptRefugeeYears} ans. L’outil ci-dessus applique ces règles à votre cas et indique, dans la même réponse, le niveau et la mention d’examen à préparer.`,
    faqs: (h) => [
      { q: 'Un niveau B1 suffit-il pour demander la naturalisation ?', a: `Non. La naturalisation exige le niveau ${h.P.language.nat}, comme la déclaration de nationalité par mariage. Une attestation ${h.P.language.cr} reste valable pour une carte de résident, mais pas pour un dossier de nationalité. Si votre dernier test affiche ${h.P.language.cr}, prévoyez de le repasser en visant ${h.P.language.nat} avant de déposer.` },
      { q: 'Mon diplôme obtenu en France dispense-t-il du test de langue ?', a: `Souvent, oui : un diplôme français comme le brevet ou un diplôme de niveau 3 et plus sert de preuve du niveau de langue, sans test à passer. Vérifiez sur la fiche service-public.gouv.fr la liste exacte des diplômes admis pour votre démarche, car elle n’est pas la même pour un titre de séjour et pour la nationalité. Joignez une copie du diplôme au dossier.` },
      { q: 'Quelle est la durée de validité d’une attestation de niveau de français ?', a: `Les résultats d’un test linguistique doivent dater de moins de ${h.P.language.attestationValidityYears} ans au moment du dépôt. Un test plus ancien, même réussi avec le bon niveau, sera refusé. Calez donc le test sur votre date de dépôt : inutile de le passer longtemps avant d’être éligible, mieux vaut le programmer dans les mois qui précèdent la demande.` },
      { q: 'Le niveau de français est-il exigé au renouvellement d’une carte ?', a: 'Non. Le niveau de langue et l’examen civique sont demandés à la première délivrance d’une carte de séjour pluriannuelle ou d’une carte de résident. Le renouvellement du même titre ne réclame pas de nouvelle preuve. En revanche, passer d’une carte pluriannuelle à une carte de résident est une première demande de carte de résident : le niveau supérieur sera alors exigé.' },
    ],
    body: (h) => `
<h2>Le niveau attendu, démarche par démarche</h2>
<p>La règle tient en une progression : plus le titre est durable, plus le niveau monte. Le tableau reprend les niveaux fixés par la fiche service-public.gouv.fr sur la justification du français et par l’arrêté du 22 décembre 2025 pour les cartes de séjour.</p>
${h.table(['Démarche', 'Niveau de français', 'Examen civique'], [['Première carte de séjour pluriannuelle', h.P.language.csp, 'mention carte pluriannuelle'], ['Première carte de résident', h.P.language.cr, 'mention carte de résident'], ['Carte de résident de longue durée-UE', h.P.language.cr, 'mention carte de résident'], ['Naturalisation ou réintégration', h.P.language.nat, 'mention naturalisation'], ['Nationalité par mariage', h.P.language.marriage, 'non exigé']], `Niveaux relus le ${h.date(h.P.retrieved_at)} sur service-public.gouv.fr et Légifrance.`, ['l', 'l', 'l'])}
<p>Deux cas surprennent souvent. Le conjoint de Français qui demande la nationalité par déclaration n’a pas d’examen civique, mais il doit atteindre le même niveau ${h.P.language.marriage} que le candidat à la naturalisation. Et la carte de résident de longue durée-UE suit la règle de la carte de résident ordinaire : niveau ${h.P.language.cr} et examen civique, même si elle est demandée après un titre « passeport talent » ou une protection internationale.</p>
<h2>Les preuves que la préfecture accepte</h2>
<p>Deux familles de justificatifs coexistent. La première est le diplôme français : le brevet, un diplôme de niveau 3 et plus, ou un autre diplôme figurant sur la liste officielle. La seconde est le test linguistique passé auprès d’un organisme reconnu, principalement le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France. La page ${h.a('tcf-irn', 'consacrée au TCF IRN')} détaille comment choisir son test et à quel moment le passer.</p>
<ul>
<li>Le diplôme n’a pas de date limite : même ancien, il reste une preuve.</li>
<li>Le test, lui, doit avoir moins de ${h.P.language.attestationValidityYears} ans le jour du dépôt.</li>
<li>Le niveau imprimé sur l’attestation doit être au moins celui de la démarche : un ${h.P.language.csp} ne couvre pas une carte de résident.</li>
</ul>
<h2>Langue et examen civique : deux épreuves, deux attestations</h2>
<p>L’examen civique se passe en français, mais il ne mesure pas votre niveau : il vérifie la connaissance des principes de la République, des institutions et de la vie en France. Réussir les ${h.size} questions ne dispense donc pas du test de langue, et un excellent score au test ne dispense pas de l’examen. Préparez les deux en parallèle : le vocabulaire des institutions travaillé pour l’${h.a('examen-blanc', 'examen civique blanc')} sert aussi à l’oral d’un test de langue.</p>
<h2>Les dispenses de justificatif</h2>
<p>Pour la nationalité, l’arrêté du 30 décembre 2025 organise la dispense des justificatifs de français et d’examen civique en cas de handicap ou d’état de santé attesté par un médecin. Le réfugié ou l’apatride de plus de ${h.P.language.natExemptRefugeeAge} ans qui réside en France depuis au moins ${h.P.language.natExemptRefugeeYears} ans est aussi dispensé du justificatif de français. Pour les titres de séjour, l’examen civique n’est plus demandé au-delà de ${h.P.exam.exemptAgeOver} ans. Le détail des cas figure sur la page des ${h.a('dispenses', 'dispenses')}, et la fiche ${h.src('sp_langue', 'service-public.gouv.fr sur le niveau de français')} reste la référence pour le dossier.</p>
<h2>Bien utiliser l’outil de cette page</h2>
<p>Sélectionnez le titre visé et précisez s’il s’agit d’une première demande : c’est ce point qui déclenche l’exigence de langue pour les cartes de séjour. Renseignez ensuite votre âge, une éventuelle protection internationale et l’existence d’un certificat médical. Le résultat affiche le niveau à prouver et la mention d’examen civique ; s’il vous indique ${h.P.language.nat}, poursuivez avec les ${h.a('conditions', 'conditions de la naturalisation')} pour vérifier les autres critères.</p>`,
  },
  en: {
    slug: 'french-language-level',
    nav: 'French level required',
    card: 'A2, B1 or B2: the French level each permit and citizenship route asks for, and the proof that counts.',
    title: 'Language level A2, B1, B2 for French permits and citizenship',
    description: 'Language level needed in France: A2 for a multi-year permit, B1 for a resident card, B2 for citizenship, plus the diplomas and tests that count as proof.',
    h1: 'French language level: A2, B1 or B2 depending on your application',
    intro: 'Enter the permit you want, your age and your situation: the tool shows the French level you must prove and the civic exam level that goes with it.',
    resume: (h) => `France ties the French level it expects from foreign residents to how settled the status is. A first multi-year residence permit (carte de séjour pluriannuelle) needs level ${h.P.language.csp}; a first resident card or an EU long-term resident card needs ${h.P.language.cr}; naturalisation and nationality through marriage both need ${h.P.language.nat}. You prove it with a French diploma, such as the brevet or a qualification at level 3 or above, or with a recognised language test, the TCF from France Éducation international or the TEF from the Paris Île-de-France Chamber of Commerce, taken less than ${h.P.language.attestationValidityYears} years before you apply. The language proof sits alongside the civic exam, it does not replace it: the multi-year permit, the resident card and naturalisation each need both. Medical exemptions exist, and for citizenship a refugee or stateless person over ${h.P.language.natExemptRefugeeAge} who has lived in France for ${h.P.language.natExemptRefugeeYears} years is excused from the language proof. The tool above runs these rules on your own case and returns the level and civic exam level in one answer.`,
    faqs: (h) => [
      { q: 'I passed a B1 test years ago. Can I use it for citizenship?', a: `Probably not, on two counts. Citizenship now needs level ${h.P.language.nat}, so a ${h.P.language.cr} result falls short whatever its date. And test results must be under ${h.P.language.attestationValidityYears} years old on the day you apply. Book a new test aiming for ${h.P.language.nat}, timed so the result is still fresh when your file goes in.` },
      { q: 'Does a degree from my home country count as proof of French?', a: 'The proof listed by service-public.gouv.fr is a French diploma, such as the brevet or a qualification at level 3 or above, or a recognised language test. A degree earned abroad, even one taught in French, is not on that list as such. If you studied in France, check whether your French qualification is accepted; otherwise plan for the TCF or the TEF.' },
      { q: 'Do I need to prove my French again when I renew my permit?', a: 'No. The language level and the civic exam apply to the first issue of a multi-year permit or a resident card. Renewing the same card asks for no new proof. Moving up from a multi-year permit to a resident card, however, counts as a first resident card application, so the higher level applies at that point.' },
    ],
    body: (h) => `
<h2>The level for each application</h2>
<p>Think of it as a ladder: the longer the right to stay, the higher the level. The table follows the service-public.gouv.fr page on proving your French and the order of 22 December 2025 for residence permits.</p>
${h.table(['Application', 'French level', 'Civic exam'], [['First multi-year residence permit', h.P.language.csp, 'multi-year permit level'], ['First resident card', h.P.language.cr, 'resident card level'], ['EU long-term resident card', h.P.language.cr, 'resident card level'], ['Naturalisation or reinstatement', h.P.language.nat, 'naturalisation level'], ['Nationality through marriage', h.P.language.marriage, 'not required']], `Levels checked on ${h.date(h.P.retrieved_at)} on service-public.gouv.fr and Légifrance.`, ['l', 'l', 'l'])}
<p>Spouses of French citizens are often caught out. The marriage route skips the civic exam, yet it asks for the same ${h.P.language.marriage} level as naturalisation. Holders of a talent passport or international protection who move to the EU long-term card follow the ordinary resident card rule: ${h.P.language.cr} plus the civic exam.</p>
<h2>What counts as proof</h2>
<p>There are two routes. The first is a French diploma, from the brevet upwards, or another qualification on the official list. The second is a test from a recognised body, in practice the TCF from France Éducation international or the TEF from the Paris Chamber of Commerce. Our page on the ${h.a('tcf-irn', 'TCF IRN')} explains how to pick a test and when to sit it.</p>
<ul>
<li>A diploma never expires as proof, however old it is.</li>
<li>A test result must be under ${h.P.language.attestationValidityYears} years old when you file.</li>
<li>The level printed on the result must match or beat the one your application needs.</li>
</ul>
<p>Expats who work in English all day often underestimate the jump from ${h.P.language.cr} to ${h.P.language.nat}. If citizenship is your goal, aim for ${h.P.language.nat} from your first test: the same certificate will then cover a resident card on the way.</p>
<h2>Language test and civic exam are separate</h2>
<p>The civic exam is in French but it does not grade your French. It checks what you know about the Republic, its institutions and daily life. Passing the ${h.size} questions does not excuse you from the language test, and a strong test score does not excuse you from the exam. The vocabulary you build on our ${h.a('examen-blanc', 'civic exam mock test')} helps for the speaking part of a language test too.</p>
<h2>Exemptions</h2>
<p>For citizenship, the order of 30 December 2025 covers exemptions from the French and civic exam proofs on medical grounds. A refugee or stateless applicant over ${h.P.language.natExemptRefugeeAge} who has lived in France for at least ${h.P.language.natExemptRefugeeYears} years does not have to prove French. For residence permits, nobody over ${h.P.exam.exemptAgeOver} has to sit the civic exam. See the ${h.a('dispenses', 'exemptions page')} for every case, and keep the ${h.src('sp_langue', 'service-public.gouv.fr page on proving French')} at hand when you build your file.</p>
<h2>Getting the most from the tool</h2>
<p>Pick your permit and say whether it is a first application: that answer decides whether a language proof is needed at all for residence permits. Then add your age, any international protection and whether a doctor has certified a disability or health condition. If the answer comes back as ${h.P.language.nat}, carry on with the ${h.a('conditions', 'naturalisation requirements')} to check the rest of your file. If it shows ${h.P.language.cr}, the ${h.a('carte-resident', 'resident card page')} explains the timing and the fees for that step.</p>`,
  },
});
