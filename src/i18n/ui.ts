import type { Locale } from './routes';
const fr = {
  updatedOn: 'Règles et tarifs vérifiés le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Réponses, dates et coûts par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions des candidats', relatedCalculators: 'Pour continuer', sourcesTitle: 'Textes officiels consultés pour cette page', writtenBy: 'Rédigé par',
  asOf: 'Règles de l’examen civique et de la nationalité', lastUpdated: 'relues sur Légifrance et service-public.gouv.fr, dernière vérification le',
  footerValidated: 'Chaque règle et chaque tarif renvoie au texte officiel où il a été lu',
  footerBrowser: 'Examens et calculs faits dans votre navigateur · rien de ce que vous saisissez n’est transmis · gratuit, sans compte, sans e-mail',
  footerDisclaimer: 'Examen Civique Blanc est un site indépendant publié par Radif Partners. Ce n’est ni le ministère de l’Intérieur, ni une préfecture, ni un centre d’examen : il n’inscrit à aucune session, ne reçoit aucun dossier et ne délivre aucune attestation. Les dates et les coûts sont indicatifs : vérifiez-les sur service-public.gouv.fr avant toute démarche.',
  footerPopular: 'Examens blancs',
  notFound: 'Aucune page à cette adresse. L’examen civique blanc gratuit est sur la page d’accueil.',
  readMore: 'Lire la suite', back: 'Accueil',
};
const en: typeof fr = {
  updatedOn: 'Rules and fees checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Answers, dates and costs by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions applicants ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official texts behind this page', writtenBy: 'Written by',
  asOf: 'French civic exam and nationality rules', lastUpdated: 'read on Légifrance and service-public.gouv.fr, last checked on',
  footerValidated: 'Every rule and fee links to the official text it was read on',
  footerBrowser: 'Exams and calculations run in your browser · nothing you type is sent · free, no account, no email',
  footerDisclaimer: 'Examen Civique Blanc is an independent site published by Radif Partners. It is not the French Interior Ministry, a préfecture or an exam centre: it books no session, takes no application and issues no certificate. Dates and costs are for guidance: check them on service-public.gouv.fr before you apply.',
  footerPopular: 'Mock exams',
  notFound: 'There is no page at this address. The free civic exam mock test is on the home page.',
  readMore: 'Read more', back: 'Home',
};
export function t(lang: Locale) { return lang === 'fr' ? fr : en; }
