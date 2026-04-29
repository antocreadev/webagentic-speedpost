# Les Contes Infusés, Corte

Site prototype (mock) d'une librairie-café à Corte (Haute-Corse). Front-end statique, données mockées, navigation complète sur ~93 pages : catalogue livres, carte café, événements, artisans, panier, checkout, espace client, et un back-office mock (commandes, étiquettes, stocks, clients).

## Stack

- Astro 5 (output statique)
- React 19 (islands hydratées : panier, recherche, filtres, calendrier, modales, custom cursor)
- Tailwind CSS 3.4 (palette + typo dans `tailwind.config.mjs`)
- Lucide React pour les icônes fonctionnelles
- Astro View Transitions pour la transition entre pages

Aucun backend. Toutes les "actions" admin sont des `console.log` + toast. Données dans `src/data/*.ts`.

## Commandes

```bash
npm install
npm run dev       # serveur local
npm run build     # build statique dans dist/
npm run preview   # preview du build
```

## Routes principales

Public :
- `/` accueil
- `/livres`, `/livres/[genre]`, `/livres/[slug]`
- `/cafe`, `/cafe/commander`
- `/evenements`, `/evenements/[slug]`
- `/artisans`, `/artisans/[slug]`
- `/contact`, `/recherche`, `/newsletter`, `/social`
- `/panier`, `/checkout`, `/checkout/confirmation`, `/suivi/[order_id]`
- `/compte`, `/compte/commandes`, `/compte/donnees`, `/compte/preferences`

Admin (mock) :
- `/admin`, `/admin/commandes`, `/admin/commandes/[id]`
- `/admin/produits`, `/admin/produits/nouveau`
- `/admin/evenements`, `/admin/inscriptions/[event]`
- `/admin/stocks`, `/admin/etiquettes`, `/admin/clients`

Légal :
- `/mentions-legales`, `/cgv`, `/rgpd`, `/cookies`

## Note LibriSoft

L'écran `/admin/stocks` mentionne explicitement "raccord LibriSoft à venir". L'intégration LibriSoft (logiciel libraire) reste à câbler côté production : dans cette version mock, les stocks sont statiques et lus depuis `src/data/books.ts`.

## Notes design

Palette : crème (`#FBF6E9`), cocoa (`#4A2D1F`), terracotta (`#C77A4F`), sage et plum en accent. Filets et lignes en `#D9C8A8`.

Typo : Cormorant Garamond (display, italic), Cormorant SC (eyebrows small caps), Lora (body), Inter (UI / chiffres), Pinyon Script (touche signature occasionnelle).

Geste UI signature : "Bibliothèque vivante". Trois éléments couplés :
1. Marque-page persistant en haut à droite, qui descend avec le scroll, ripple ping au clic, scroll-to-top doux.
2. Transition de page "tournage de page" via View Transitions API : balayage clip-path diagonal de droite à gauche sur l'ancienne vue, fade-up doux sur la nouvelle.
3. Cards livres en relief 3D (perspective + rotateY), curseur "petit livre" custom au survol, ombre qui s'allonge à droite au hover.

Bonus : custom cursor desktop tasse fumante (vapeur CSS animée), trail léger 3 positions, fade au clic. Splash loader initial 1.2s (logo dessiné, italique). Reveal-on-scroll IntersectionObserver. Tout désactivé en `prefers-reduced-motion`.

## Crédits

Direction artistique, code, design : Menghi Computer Science.
Photos café et étagères : sources internes (mock).
