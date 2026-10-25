import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';
const R = (id: string, fr: string, en: string, noindex = false): RouteDef<Locale> => ({ id, paths: { fr: `/fr/${fr}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { fr: '/fr/', en: '/en/' } },
  R('method', 'methode', 'method'),
  R('about', 'a-propos', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'contact', 'contact', true),
  R('editorial', 'politique-editoriale', 'editorial-policy', true),
  R('privacy', 'confidentialite', 'privacy', true),
  R('terms', 'mentions-legales', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', true),
];
const fromPage = (p: (typeof PAGES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { fr: `/fr/${p.fr.slug}/`, en: `/en/${p.en.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map(fromPage), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
