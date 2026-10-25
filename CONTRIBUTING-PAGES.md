# Ajouter ou modifier une page

Une page = un fichier `src/content/pages/<id>.ts`, avec sa version française (`fr`) et sa version anglaise (`en`). Le nom du fichier est l'identifiant de la page.

1. Copier `src/content/pages/examen-blanc.ts` sous un nouvel identifiant.
2. Choisir la rubrique (`group` : examen, themes, langue, nationalite, sejour), l'ordre, l'outil principal (`tool`) et le mini-outil (`mini`) parmi ceux de `src/components/Tool.astro` et `src/lib/mini-specs.ts`.
3. Écrire les deux langues : titre de 50 à 60 caractères et description de 150 à 160 caractères commençant par le terme-clé, bloc citable (`resume`) d'un seul paragraphe de 130 mots ou plus, 3 à 5 questions de FAQ propres à la page, corps de 450 mots ou plus.
4. Tout chiffre vient de `src/data/params-2026.json` (via `h.P`) ou de la banque (`h.count`, `h.q`), jamais tapé dans la page. Un chiffre absent de params doit d'abord y être ajouté avec sa source officielle (clé de `sources`).
5. Liens internes avec `h.a('<id>', 'texte')`, liens officiels avec `h.src('<clé>', 'texte')`.
6. Lancer `npm run check` : tout doit être à 0.

## Banque de questions

`src/data/questions/bank.json` : intitulés de connaissance repris des listes du ministère de l'Intérieur (Licence Ouverte 2.0, formation-civique.interieur.gouv.fr), propositions, corrigés et mises en situation rédigés par Radif Partners. Chaque question a 4 propositions, une seule juste, un corrigé et une référence (`ref`). `npx vitest run` vérifie la banque (`lintBank`) et que chaque tirage respecte la grille de l'arrêté du 10 octobre 2025.

## Mise à jour des règles

Les règles et tarifs sont relus à la main sur Légifrance et service-public.gouv.fr ; mettre à jour `retrieved_at` et `LAST_UPDATED` (`src/data/site-config.ts`) à chaque relecture. Aucune mise à jour automatique n'est configurée.
