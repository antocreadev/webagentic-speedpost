# Les Contes Infusés — Design Brief

**Client** : Librairie & Café à Corte (Haute-Corse), ouverture prochaine.
**Domaine** : `lescontesinfuses.corsica`
**Email** : `contact@lescontesinfuses.corsica`
**Horaires** : mardi-samedi, 10h-13h et 14h-19h.

## 1. Direction artistique distillée des sources

### Ambiance globale

Librairie-café romantique, intime, "cocon de conte". Mariage d'un imaginaire **gravure XIXᵉ** (trait fin sépia, dentelle, médaillons ovales, théière, plumes, livres ficelés, mains tenant un livre) avec une **flat illustration contemporaine** (étagères de livres colorées, plantes en pots, boissons en illustration plate). Émotion-cible : on s'assoit, on ralentit, on lit, on infuse. Lent, doux, savant. Adresse à Corte → fierté insulaire discrète, jamais clinquante.

### Palette (canon)

| Token | Hex | Usage |
|-------|-----|-------|
| `paper` / `cream-50` | `#FBF6E9` | Fond principal, page |
| `cream-100` | `#F7EFD8` | Cards, blocs secondaires |
| `cream-200` | `#F2E7C4` | Séparateurs subtils |
| `cocoa-600` | `#4A2D1F` | Encre principale, texte body, titres |
| `cocoa-400` | `#7C4F31` | Texte secondaire, lignes |
| `cocoa-200` | `#C9A37D` | Hover, accents secondaires |
| `terracotta-400` | `#C77A4F` | Accent #1 — boutons, prix, alertes douces |
| `sage-400` | `#8A9876` | Accent #2 — feuillages, badges nature |
| `plum-400` | `#8E6C90` | Accent #3 — genres littéraires "rêveur" |
| `line` | `#D9C8A8` | Filets 1px, séparateurs |
| `ink` | `#2A1810` | Réservé aux blocs intégralement sombres (footer, modale livre ouverte) |

Le scrim/contrast pour texte sur image utilise `cocoa-900` à 55-70% en gradients.

### Typographie

| Rôle | Police Google Fonts | Poids |
|------|---------------------|-------|
| Display titres | **Cormorant Garamond** + italic 500/600/700 | élégance | 
| Display all-caps | **Cormorant SC** (small caps) | titres section, eyebrows |
| Body lecture | **Lora** | 400/500 corps, paragraphes longs |
| Sans utilitaire (UI, formulaires, admin) | **Inter** | 400/500/600 |
| Touche signature occasionnelle | **Pinyon Script** | usage minimal, citations chaleureuses, jamais le body |

Caractéristiques d'application :
- Eyebrows en Cormorant SC `tracking-windier` `text-cocoa-400 text-xs`.
- H1 en Cormorant Garamond italic 500 ou 700 selon ambiance, `text-cocoa-600`.
- Body en Lora 400 16-17px, line-height 1.7, `text-cocoa-700`.
- Chiffres tabulaires en Inter pour prix/dates/horaires (lisibilité).

### Iconographie & motifs

1. **Trait sépia gravure** (illustrations vectorielles dans `src/components/icons/decor/`) : médaillon dentelle ovale, théière vapeur, plume d'oie, livres empilés ficelés, brindille de laurier, grain de café. À utiliser comme **ornements** discrets, jamais en fonctionnel.
2. **Flat illustration** : étagères de livres colorées (style image source 1214) pour les sections livres / catalogue ; tasses et boissons à plat pour la carte café (style image source 1210).
3. **Lucide React** pour TOUTES les icônes fonctionnelles (Search, ShoppingBag, User, Calendar, MapPin, Heart, Bookmark, Coffee, Truck, Mail, Instagram, Facebook). Stroke 1.5, taille 20-24px par défaut.
4. **SVG custom** pour : logo, médaillon dentelle, vapeur fumée animée, marque-page, grain de café flottant. Chaque SVG dans son propre composant `.astro` ou `.tsx` (`src/components/icons/Logo.astro`, `src/components/icons/Steam.tsx`, etc.).

### Geste UI signature (la valeur ajoutée design)

**"Bibliothèque vivante"** — combinaison de 3 éléments uniques :

1. **Marque-page persistant** : ruban terracotta SVG fixé en haut à droite, descend doucement avec le scroll, indique la progression dans la "page" courante. Au clic, scroll-to-top doux.
2. **View Transitions API** entre toutes les pages : transition "tournage de page" subtle (mask diagonal cocoa qui balaie de droite à gauche, 600ms, easing manuscrit).
3. **Cards livres en relief** : chaque BookCard simule un livre vu de 3/4 (CSS perspective + transform-style preserve-3d), tranche visible, légère ombre à droite, hover = livre se redresse de 6° + ombre s'allonge.

Bonus : custom cursor sur desktop avec une petite tasse fumante qui suit, vapeur en CSS animée. Désactivé en `prefers-reduced-motion`.

## 2. Architecture de l'information

### Public

```
/                           Accueil
/livres                     Catalogue livres (grille + filtres)
/livres/[genre]             Sous-catégorie : roman, jeunesse, BD, poésie, essais, polar, corse, jeunesse, beaux-livres
/livres/[slug]              Fiche livre (avec onglet "Coup de cœur")
/cafe                       Carte café (preview clic → modale plein écran)
/cafe/commander             Click & collect boisson rapide
/evenements                 Liste + calendrier
/evenements/[slug]          Page événement avec inscription
/artisans                   Bougies & accessoires d'artisans corses
/artisans/[slug]            Fiche produit artisan
/contact                    Contact + plan + horaires + email
/recherche                  Page recherche unifiée (livres + événements + produits)
/newsletter                 Page d'inscription dédiée
/social                     Aggrégation des réseaux sociaux (mur Instagram + Facebook)
/panier                     Panier
/checkout                   Paiement (CB / PayPal) + livraison (Mondial Relay / domicile / click&collect)
/checkout/confirmation      Récap après commande
/suivi/[order_id]           Suivi colis (Mondial Relay tracking number stub)
/compte                     Espace client
/compte/commandes           Historique
/compte/donnees             RGPD : export/suppression
/compte/preferences         Newsletter, consentements
```

### Backend (mock visuel)

```
/admin                      Dashboard
/admin/commandes            Liste, statuts, action "préparer / expédier"
/admin/commandes/[id]       Détail commande + génération étiquette Mondial Relay (PDF mock)
/admin/produits             Gestion livres + artisans
/admin/produits/nouveau     Formulaire création produit
/admin/evenements           Calendrier + édition
/admin/inscriptions/[event] Liste inscrits à un événement
/admin/stocks               Vue stock (mention "raccord LibriSoft à venir")
/admin/etiquettes           File d'attente d'étiquettes à imprimer
/admin/clients              Base clients + RGPD
```

### Légal

```
/mentions-legales
/cgv
/rgpd
/cookies
```

## 3. Stack technique

- **Astro 5** + `output: "static"` (mock fully static, hydratation islands React où nécessaire).
- **Tailwind CSS 3.4** (config locale, palette + fonts dans `tailwind.config.mjs`).
- **React 19** islands pour : panier (Zustand-like store léger), recherche live, filtres livres, calendrier événements, modale PDF preview, custom cursor.
- **Lucide React** pour icônes fonctionnelles.
- **Motion** (motion@11) pour animations, page reveals, hover micro-interactions.
- **Astro View Transitions** pour les transitions entre pages.
- **Pas de backend réel** : les "actions" admin sont des `console.log` + toast de feedback. Données mockées via `src/data/*.ts`.

## 4. Données mock (fichiers à créer dans `src/data/`)

- `books.ts` : 24 livres avec titre, auteur, prix, genre, couverture (placeholder + couleur de tranche), résumé court, "coup de cœur" boolean, stock.
- `genres.ts` : 8-10 genres avec icône, couleur de fil (tirée de la palette accents).
- `events.ts` : 6 événements (dédicace, club lecture, atelier écriture, soirée contes, lecture publique, concert acoustique), date, heure, capacité, prix, slug.
- `cafe.ts` : menu boissons + desserts d'après l'image source (Café 2.50, Machiato 2.50, Cappuccino Catte 4.00, Chocolat 2.50, Chai Catte 2.50, Matcha latte 4.50, Ube Catte 4.50, kombucha, the glace, brownie, cake du jour, cookies).
- `artisans.ts` : 8 produits (bougies parfumées corse, marque-pages cuir, mugs céramique, foulards lin, savons, miel, confiture, thé damman frères) avec artisan associé.
- `coupsDeCoeur.ts` : 4 sélections du mois.

## 5. Contenu rédactionnel (à respecter)

Ton : chaleureux, savant, jamais condescendant, accent corse discret. Phrases courtes pour les CTA, longues et tissées dans les pages éditoriales (Histoire, À propos).

Slogan possible : "Lire, infuser, recommencer."
Manifesto : "Une librairie indépendante au pied de la citadelle de Corte. Un café qui sent le grain et le papier. Des livres qu'on choisit avec lenteur, parce qu'ici on prend le temps."

**Interdictions absolues** :
- Em-dash `—` (U+2014) dans toute copie publique. Utiliser `:`, `,`, `.`, `()`.
- Anglicismes lourds (use "Découvrir" pas "Discover", "Catalogue" pas "Shop").
- Stock images génériques. Toutes les illustrations sont propres au projet (SVG custom ou flat illustrations style image source 1214).

## 6. Mobile-first et accessibilité

- Tout testé à 360px de large.
- Contraste AA minimum, AAA pour le body principal.
- `prefers-reduced-motion` désactive : page-turn, custom cursor, parallaxes, animations longues.
- Hiérarchie sémantique stricte : un seul `<h1>` par page, alt sur toutes les images, `aria-label` sur tout bouton-icône.
- Form fields avec labels visibles (pas juste placeholders).

## 7. Livrables attendus

- Projet Astro fonctionnel : `npm run dev` lance le serveur, `npm run build` produit `dist/` exploitable.
- ~30 pages, toutes mockées, navigables.
- Composants partagés réutilisés (DRY).
- README court avec commandes (dev/build/preview).
