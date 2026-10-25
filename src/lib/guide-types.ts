/**
 * Une page = UN fichier de données `src/content/pages/<id>.ts`, avec sa version française et sa
 * version anglaise. Ajouter une page : CONTRIBUTING-PAGES.md.
 */
import type { Helpers } from './helpers';

export type Lang = 'en' | 'fr';
/** Rubrique de la page : menus, pied de page et listes de l'accueil la suivent. */
export type Group = 'examen' | 'themes' | 'langue' | 'nationalite' | 'sejour';
export interface FAQ { q: string; a: string }
/**
 * `quiz` (props : mention 'csp'|'cr'|'nat', mode 'exam'|'practice', theme 1-5, situations, size, mentionSelect),
 * `bank` (props : list 'csp'|'cr'|'nat'|'situation', theme), `date` (props : route, routes "a,b"),
 * `cost` (props : procedure), `level` (props : title) ou `mini:<spec>` de `lib/mini-specs.ts`.
 */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean> }
export interface PageText {
  /** Path after /en/ or /fr/, without slashes at the ends; may hold one "/". */
  slug: string; nav: string; card: string;
  /** 50–60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150–160 characters. */
  description: string;
  h1: string; intro: string;
  /** Citable block, one paragraph of 120 words or more (RECETTE §21), folded after its first sentence. */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML; `<!--tool:mini:spec-->` or `<!--tool:date|{"route":"ldue"}-->` places a tool in the body. */
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  tool?: ToolDef; mini?: ToolDef;
  related: string[];
  /** Keys of `data/params-2026.json` sources. */
  sources: string[];
  fr: PageText; en: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
