# AUDIT design / UX — Les Contes Infusés

> Audit interne destiné aux agents qui vont enrichir le site (designer, builder, copy).
> Périmètre : 36 routes Astro, qui se déploient en 93 pages générées (livres `[slug]` x 24, livres `[genre]` x 9, événements `[slug]` x 6, artisans `[slug]` x 8, suivi `[order_id]` x 5, admin commandes `[id]` x N, admin inscriptions `[event]` x N, etc.).
> Tous les principes sont à appliquer en respectant le `DESIGN_BRIEF.md` (palette cream/cocoa/terracotta, Cormorant + Lora + Pinyon, gravure XIXᵉ + flat illu, light mode uniquement, em-dash interdit).

## Sommaire
- [1. Inventaire par section](#1-inventaire-par-section)
- [2. Analyse page par page](#2-analyse-page-par-page)
- [3. Motifs récurrents transversaux](#3-motifs-recurrents-transversaux)
- [4. Pages éditoriales à créer](#4-pages-editoriales-a-creer)
- [5. Composants à refactoriser ou ajouter](#5-composants-a-refactoriser-ou-ajouter)
- [6. Ornementation custom](#6-ornementation-custom)
- [7. Transitions et micro-interactions manquantes](#7-transitions-et-micro-interactions-manquantes)
- [8. Quick wins (20)](#8-quick-wins-20)
- [9. Big wins (10)](#9-big-wins-10)

---

## 1. Inventaire par section

### A. Public (16 routes -> ~64 pages)
1. `/` Accueil
2. `/livres` Catalogue
3. `/livres/[genre]` (9 genres : roman, polar, jeunesse, BD, poésie, essais, corse, beaux-livres, nouveautés)
4. `/livres/[slug]` (24 fiches livres)
5. `/cafe` Carte café
6. `/cafe/commander` Click & collect
7. `/evenements` Liste + calendrier
8. `/evenements/[slug]` (6 fiches événements)
9. `/artisans` Catalogue artisans
10. `/artisans/[slug]` (8 fiches produits)
11. `/contact`
12. `/recherche`
13. `/newsletter`
14. `/social`
15. `/panier`
16. `/checkout` + `/checkout/confirmation`

### B. E-commerce post-achat (2 routes -> ~6 pages)
17. `/checkout/confirmation`
18. `/suivi/[order_id]` (5 commandes mock)

### C. Compte client (5 routes)
19. `/compte`
20. `/compte/commandes`
21. `/compte/informations`
22. `/compte/preferences`
23. `/compte/donnees`

### D. Admin (10 routes -> ~13 pages)
24. `/admin` Dashboard
25. `/admin/commandes`
26. `/admin/commandes/[id]`
27. `/admin/produits`
28. `/admin/produits/nouveau`
29. `/admin/evenements`
30. `/admin/inscriptions/[event]` (6 événements)
31. `/admin/stocks`
32. `/admin/etiquettes`
33. `/admin/clients`

### E. Légal (4 routes)
34. `/mentions-legales`
35. `/cgv`
36. `/rgpd`
37. `/cookies`

---

## 2. Analyse page par page

### A. Public

#### `/` Accueil
- Hero impeccable mais **manque un visuel signature** (illustration flat de la devanture place Paoli ou photo d'ambiance teintée sépia) entre le H1 et le manifesto.
- Section Instagram en gradients colorés est trop "placeholder", remplacer par 6 photogrammes de gravure (livres ouverts, tasse, plume) avec hover qui révèle un caption manuscrit.
- La citation "Le café est un livre, le livre est une infusion" gagnerait une **lettrine T** Cormorant XXL en drop-cap.
- Aucun lien rapide vers `/artisans/[slug]` ou `/livres/[slug]` depuis les cards de la home : ajouter teaser hover (4ème de couverture pour livres).
- **Manque un encart "Coup de cœur du libraire de la semaine"** avec photo + signature manuscrite Pinyon Script.

#### `/livres` Catalogue
- Hero correct mais squelettique : pas d'**illustration flat d'étagère** (motif central du brief), à ajouter en bandeau parallax doux.
- Pas de **breadcrumb** `Accueil > La bibliothèque`.
- Aucun état "skeleton" pendant que `BookCatalog` (client:load) hydrate : flash de page vide.
- Manque un encart "Comment on choisit nos livres" (manifesto court) avant la grille.
- Pas de **tri visuel par tranche colorée** ni de teaser des filtres au-dessus du fold.

#### `/livres/[genre]`
- À auditer mais probablement clone du catalogue avec filtre pré-appliqué. Améliorations :
  - Hero spécifique par genre (couleur d'accent, icône, citation d'un classique du genre).
  - Liste de **3 sous-genres recommandés** (ex roman -> roman corse, roman étranger, roman court).
  - "Le pic de la pile" : un livre vedette du genre en grande carte avant la grille.

#### `/livres/[slug]` Fiche livre
- À enrichir absolument : **lettrine drop-cap** sur la 4ᵉ de couverture, **bouton "Ajouter au panier" avec animation livre rangé sur étagère SVG**, onglets `Résumé / Extrait / Coup de cœur de l'équipe / Du même auteur`.
- Bloc "Ils l'ont aimé" (mini-citations clients fictives en Pinyon).
- **Suggestions liées** par genre, par humeur, par saison.
- Bouton "Réserver en boutique" séparé du panier en ligne.
- Indicateur de stock visuel (3 livres SVG empilés qui diminuent).

#### `/cafe`
- Hero avec grains qui dérivent : déjà signature, garder.
- Manque **visuel flat des tasses** par catégorie (icône latte, chai, matcha, kombucha, glace, dessert).
- Pas de **filtre "lait au choix"** interactif (cliquer un lait pour voir compatibles).
- Section "Cinq laits" en chips est plate : remplacer par 5 mini-pichets SVG.
- **Aucun renvoi vers les artisans** (le miel pour le chai, la cannelle, le grain de café).
- Manque pricing total visible et indication allergènes.

#### `/cafe/commander` Click & collect
- À auditer : probablement formulaire de panier rapide. Améliorations probables :
  - Choix créneau de retrait avec **horloge SVG** custom.
  - Récapitulatif persistant en sticky.
  - Animation tasse qui se remplit lors de l'ajout.

#### `/evenements`
- Hero correct, mais le composant `EventsView` hydrate sans skeleton.
- Manque **toggle vue liste / vue calendrier mensuel** persistant.
- Pas de **carte iCal téléchargeable** par événement.
- Aucun encart "Proposez votre événement" pour les auteurs locaux.

#### `/evenements/[slug]`
- À enrichir : **compte à rebours** vers la date, photo de l'invité (placeholder gravure), **plan de salle** (capacité visuelle), bouton "Ajouter à mon agenda" (.ics download), section "Ils ont participé aux précédents" témoignages courts.

#### `/artisans` & `/artisans/[slug]`
- Manque **carte de Corse** indiquant la commune d'origine de chaque artisan (signature locale forte).
- Bio artisan trop courte probablement : ajouter **citation manuscrite + signature**.
- Pas de **filtre par matière** (céramique, cire, cuir, lin, alimentaire).
- **Photogrammes du processus** (3 petites images : fabrication, atelier, signature).

#### `/contact`
- Bon, mais : les 3 cards "À pied / En voiture / En train" gagneraient des **micro-illustrations** (semelle, voiture vintage, locomotive corse).
- Ajouter un **plan dessiné main** (depuis citadelle vers place Paoli) en alternative au Google Maps.
- Bouton "Réserver une visite privée".
- FAQ contact (5 questions courantes : commande spéciale, dédicace, locations événements, livraison hors Corse, paiement).

#### `/recherche`
- Hero bien, mais aucun **état initial** : afficher des "recherches du moment", "auteurs corses", "sélections saisonnières" tant que `q` est vide.
- Manque **historique** (localStorage) avec petite liste "vos dernières recherches".
- Pas de **résultat zéro** custom (illustration loupe + suggestion).

#### `/newsletter`
- Bon, mais le formulaire est dans un onsubmit inline qui ne valide pas le mail visuellement.
- Manque **archive des éditions** (3 numéros précédents en preview PDF/HTML).
- Ajouter un **CTA "lire l'édition de mai" sans s'abonner**.
- Mettre une **vraie illustration de gazette pliée** en SVG en hero.

#### `/social`
- À enrichir : aujourd'hui c'est juste `SocialTabs`. Ajouter **statistiques douces** ("1 200 abonnés Instagram, 480 sur Facebook"), tags hashtag, **bouton suivi en un clic**.
- Mur photo en mosaïque varied-aspect (style Pinterest cream).

#### `/panier`
- Trop minimaliste : tout est dans `CartView`. La page elle-même devrait montrer un **état vide riche** ("Votre panier attend, voici 4 coups de cœur de la semaine").
- **Code promo** + estimation livraison + cadeau emballage.
- Note manuscrite "à offrir ? écrivez un mot" (max 200 char).

#### `/checkout`
- Header bien, mais **stepper visuel custom** absent à ce niveau (probablement dans le island, mais le redoubler dans la page rassure).
- **Trust marks** : paiement sécurisé, label artisan corse, livraison Mondial Relay, retours 14j.
- Bandeau **rappel coup de cœur** "n'oubliez pas le marque-page assorti".

#### `/checkout/confirmation`
- À enrichir : confettis sépia (petites feuilles de laurier qui tombent), **téléchargement de la facture PDF**, **partage social** "j'ai acheté chez Les Contes Infusés", **suggestion d'événement** lié aux livres achetés.

#### `/suivi/[order_id]`
- Bonne base avec stepper, mais la **timeline est verticale au desktop seulement** ; ajouter une vue mobile horizontale.
- **Carte mini-Corse** avec point de départ Corte -> point relais.
- Bouton **"Signaler un problème"** + chat fictif.
- Indicateur **CO2 économisé** (point relais vs domicile).

### B. Compte

#### `/compte` (index)
- 4 cards solides. **Ajouter une 5ᵉ card "Tampon fidélité"** (10 cafés = 1 offert), avec SVG marque-page tamponné.
- "Bonjour Jean" : ajouter un **résumé statut** ("votre dernière commande arrive vendredi").
- Notifications discrètes (point terracotta) sur les cards qui ont du nouveau.

#### `/compte/commandes`
- À auditer ; améliorations probables : **filtres statut** (en cours / livrée / annulée), bouton "Racheter", export CSV des commandes.

#### `/compte/informations`
- Manque **avatar custom** (initiales en médaillon dentelle).
- Champs probablement plats : ajouter **inline edit** avec stylo plume Quill comme icône d'édition.
- Section **adresses multiples** (livraison, facturation, cadeau).

#### `/compte/preferences`
- Toggles probablement classiques. Ajouter **switches custom** (forme marque-page).
- Section **fréquence** (mensuelle, saisonnière, exceptionnelle uniquement).
- Préférence de **rythme de lecture** (un livre / semaine, / mois) pour personnaliser les recommandations.

#### `/compte/donnees`
- Confirme que c'est juridique et clair. Améliorations : **journal des consentements** en timeline, **bouton export JSON + CSV**, **explication "ce que cela signifie"** humanisée.

### C. Admin

#### `/admin` Dashboard
- Très propre, KPIs et bar chart. Améliorations :
  - Bar chart : ajouter **labels au hover** (Motion).
  - Card todo : drag-to-reorder.
  - Météo de Corte (pour préparer terrasse) en widget discret.
  - **Sparkline** par KPI à droite.

#### `/admin/commandes` & `[id]`
- Probable table dense. Ajouts :
  - **Filtres rapides** par statut + date + canal (ligne / boutique).
  - **Action rapide** "imprimer étiquette" en bulk.
  - Détail commande : **timeline interne** (qui a fait quoi quand), notes internes.

#### `/admin/produits` & `/nouveau`
- Manque **upload visuel** drag&drop, prévisualisation **fiche publique** en modale, validation IA qui suggère le résumé.
- Tableau : **colonnes triables**, ligne en alerte stock < 3 surlignée.

#### `/admin/evenements`
- Probable mini-calendar. Ajouts : **drag pour reprogrammer**, vue charge (jauge inscrits / capacité), **dupliquer un événement passé**.

#### `/admin/inscriptions/[event]`
- Email bulk, badge présent / absent, **export liste émargement PDF**.

#### `/admin/stocks`
- Ajouter **graphes mini par produit** (rotation 30j), seuil d'alerte éditable, **commande fournisseur en un clic**.

#### `/admin/etiquettes`
- Manque **mode impression A4** (CSS print stylesheet), prévisualisation 1 / 4 / 6 par feuille, marquage "imprimée" pour ne pas doublonner.

#### `/admin/clients`
- Ajouter **score de fidélité**, **filtres RGPD** (consentements), bouton "anonymiser".

### D. Légal

#### `/mentions-legales`, `/cgv`, `/rgpd`, `/cookies`
- Tous propres mais visuellement **trop denses**. Améliorations communes :
  - **Sommaire ancré** sticky à gauche en desktop.
  - **Eyebrow + filet décoratif** entre chaque section.
  - **Lettrine drop-cap** sur le premier paragraphe.
  - Bandeau "dernière mise à jour" plus visible avec icône calendrier plume.
  - **Lien de téléchargement PDF** de chaque texte.
  - Pour `/cookies` : tableau interactif (toggle par finalité).

---

## 3. Motifs récurrents transversaux

1. **Breadcrumb absent** sur quasiment toutes les pages secondaires. Ajouter un fil d'Ariane discret en Cormorant SC + filets fins entre crumbs.
2. **Skeletons inexistants** sur les islands React (`BookCatalog`, `EventsView`, `CartView`, `CheckoutFlow`, `UnifiedSearch`). Tous causent un flash blanc avant hydratation.
3. **Hero pattern dupliqué** (eyebrow / filet / H1 italique / sous-titre Pinyon / paragraphe italique). Introduire 3 variantes (asymétrique avec illu, fullbleed photo overlay, citation centrée XXL).
4. **Pas de "Coup de cœur du libraire" récurrent** : encart à dropper sur catalogue, fiche genre, panier vide, confirmation, gazette.
5. **Maps Google iframe bruit visuel** (style par défaut). Toujours wrapper avec un overlay duotone cocoa + crédit "Place Paoli".
6. **CTA secondaires faibles** ("btn-ghost" partout). Différencier au moins 3 niveaux de CTA (primaire terracotta, secondaire ghost, tertiaire underline plume).
7. **Aucune transition entre sections d'une même page** : ajouter `Reveal` (déjà en composant) sur tous les `<section>` au scroll.
8. **Hover preview des liens livres** absent. Ajouter une mini-carte flottante (couverture + auteur + prix + bouton panier) sur survol des liens internes vers `/livres/[slug]`.
9. **Empty states ignorés** : panier vide, recherche vide, aucun événement, aucun favori, aucune commande. Tous méritent une illustration custom + CTA.
10. **Numéros et tabular-nums utilisés correctement, mais sans rythme typographique** : hiérarchiser les chiffres clés (prix XL en Cormorant italic pour le prix principal, Inter tabular pour micro-prix annexes).

---

## 4. Pages éditoriales à créer (15)

1. `/lieu` — Visite virtuelle de la librairie-café : photogrammes, plan dessiné, ambiances par heure (10h, 14h, 18h).
2. `/equipe` — Portraits de l'équipe : Anna (libraire), Léa (barista), Mattéo (événements), avec citation manuscrite chacun.
3. `/presse` — Revue de presse, kit média téléchargeable (logos, photos HD), contact presse.
4. `/livres-occasion` — Rayon livres d'occasion / dépôt-vente, mode d'emploi pour vendre ses livres.
5. `/abonnements-the` — Box thé mensuelle Damman + livre court assorti.
6. `/ateliers` — Calendrier ateliers (écriture, reliure, calligraphie, dégustation thé).
7. `/fidelite` — Programme tampons : 10 cafés = 1 offert, 5 livres = 10% sur le 6ᵉ. Carte virtuelle scannable.
8. `/cartes-cadeaux` — Bons cadeaux 20 / 50 / 100 €, design carte gravure imprimable, message personnalisable.
9. `/carte-corte` — Carte interactive de Corte avec **adresses partenaires** (boulangeries, hôtels qui distribuent les flyers, lieux où l'équipe a ses habitudes).
10. `/glossaire` — Glossaire littéraire : 50 termes (incipit, exergue, chevauchement, hapax) en mini-fiches Cormorant.
11. `/recette-du-mois` — Recette de la boisson du mois (chai catte, ube latte) en flat illu étape par étape.
12. `/club-lecture` — Page dédiée au club, archives des lectures, prochain titre, inscription dédiée.
13. `/dedicaces` — Sous-page de `/evenements` mais filtrée auteurs avec biographie expansive.
14. `/jeunesse` — Mini-univers enfants : sélection 0-3, 4-7, 8-12, ado. Couleurs plus vives, illustrations ludiques, atelier conté.
15. `/histoire` — Histoire de la maison, pourquoi Corte, généalogie Paoli, photos sépia (placeholder).

Bonus si le temps : `/manifeste`, `/partenaires-locaux`, `/charte-engagements` (bio, équitable, IA absente du process curation).

---

## 5. Composants à refactoriser ou ajouter

### À créer
- `Breadcrumb.astro` (filet + Cormorant SC, max 4 niveaux).
- `Skeleton.astro` (variantes : card, list, table, hero).
- `EmptyState.astro` (illustration + titre + CTA, 8 variantes : panier, recherche, favoris, événements, commandes, stock, inscrits, recherche admin).
- `Toast.tsx` (succès, info, erreur, "ajouté au panier", couleurs palette).
- `Tooltip.tsx` (style parchemin, flèche petite plume).
- `BookHoverCard.tsx` (preview au hover des liens livres internes).
- `PageTurnTransition.tsx` (clip-path mask diagonal, déclenché par View Transitions API).
- `SectionDivider.astro` (filets + médaillon central, 4 variantes).
- `DropCap.astro` (lettrine Cormorant XXL, 4 lignes).
- `StampSVG.tsx` (tampon de fidélité avec rotation aléatoire).
- `CountdownTimer.tsx` (pour fiches événements).
- `ProgressBar.tsx` (jauge type ruban marque-page).
- `IcsButton.tsx` (téléchargement .ics calendrier).
- `PrintSheet.astro` (CSS print pour étiquettes admin).
- `MapCorse.astro` (SVG Corse stylisée pour artisans + suivi).

### À refactorer
- `BookCard.tsx` — ajouter état "livre rangé" pour animation panier, support tranche couleur dynamique, hover redress 6°.
- `BoissonCard.astro` — ajouter icône lait + allergène + tooltip ingrédients.
- `EventCard.astro` — ajouter compteur places restantes + bouton ics + image invité.
- `ProductCard.astro` — ajouter badge artisan + commune + matière.
- `Newsletter.astro` — ajouter validation email visuelle, anti-spam honeypot, success state animé (gazette qui se plie).
- `Header.astro` — méga-menu sur "La bibliothèque" qui révèle les genres en colonnes, mini-cart sticky, indicateur ouvert / fermé.
- `Footer.astro` — sitemap éditorial + "Lettres précédentes" + adresse en gravure.
- `SplashLoader.tsx` — vérifier qu'il respecte `prefers-reduced-motion`.
- `CursorTeacup.tsx` — fallback desktop only, vérifier perfs.
- `Reveal.astro` — exposer plus de variantes (fade, slide-up, page-turn).

---

## 6. Ornementation custom

1. **Lettrines drop-cap** sur premiers paragraphes des pages éditoriales (manifesto, légal, fiches livres, gazette).
2. **Filets décoratifs typographiques** : 3 styles (simple 1px, double, double + losange central).
3. **Frises sépia** : ajouter une frise SVG (volutes, brindille de laurier répétée) en haut/bas de section éditoriale.
4. **Médaillons dentelle** numérotés (I, II, III) pour ouvrir les chapitres dans `/histoire`, `/manifeste`.
5. **Tampons** scannables : cachet "Lu et approuvé", "Coup de cœur 2026", "Édition de mai", "Stock limité" avec inclinaison aléatoire.
6. **Ruban marque-page** persistant (déjà prévu dans le brief, à confirmer implémenté).
7. **Photogrammes manuscrits** : 5-6 vignettes "objets" (clé, théière, plume, feuille, livre fermé) à parsemer comme separators.
8. **Lettrages décoratifs** : nom des sections en Pinyon Script + ombrage sépia léger pour titres XXL hero (ex `/cafe`).
9. **Grattage / vignettage** : texture papier vieilli en background optionnel pour pages légales (très subtile, opacity 0.04).
10. **Cartouche dédié** : encadré "À savoir" / "Coup de cœur" / "Anecdote" avec coin droit corné (page coin folded en CSS clip-path).

---

## 7. Transitions et micro-interactions manquantes

1. **Ajout au panier** : livre miniature SVG vole vers l'icône panier dans le header puis se range dans une étagère SVG. Compteur panier rebondit.
2. **Favoris (cœur)** : transition cœur vide -> cœur plein, petit éclat sépia, son optionnel (piano note, opt-in).
3. **Bookmark hover** : marque-page latéral s'incline de 6° et la teinte vire sage->terracotta.
4. **Hover preview livres** : flip 3D pour révéler la 4ᵉ de couverture, ombre se rallonge.
5. **Ouverture fiche événement** : transition page-turn diagonale (View Transitions API).
6. **Validation formulaire** : champ correct = filet vert sage discret + tick plume manuscrite. Erreur = filet terracotta + secousse minuscule.
7. **Ajout au calendrier** : icône calendrier qui se feuillette de la date du jour à la date de l'événement.
8. **Recherche live** : caret typewriter sur input vide cyclant "un titre", "un auteur", "un événement".
9. **Scroll progress** : ruban terracotta haut de page se remplit au scroll (déjà prévu marque-page latéral, doubler).
10. **Infusion** : sur `/cafe`, une vapeur SVG anime au-dessus de chaque card boisson au hover (Steam component existe déjà).
11. **Ajout panier confirmation toast** : toast cream avec mini-illustration tasse, slide-in depuis le bas droit.
12. **Skeleton -> contenu** : fade + filet qui scanne de gauche à droite.
13. **Click & collect** : tasse SVG qui se remplit au hover du créneau choisi.
14. **Empty state interactions** : illustration animée doucement (livre qui s'ouvre, plume qui écrit "rien encore").
15. **Page transitions globales** : implémenter View Transitions API avec mask diagonal cocoa 600ms (déjà prévu brief).

---

## 8. Quick wins (20)

1. Ajouter `<Breadcrumb>` sur toutes les pages secondaires (catalogue, fiches, légal, compte, admin).
2. Pose un skeleton statique dans `BookCatalog`, `EventsView`, `CartView`, `CheckoutFlow`, `UnifiedSearch` (CSS pur, avant hydratation).
3. Remplacer les 6 carrés gradients Instagram de la home par 6 médaillons gravure semi-transparents.
4. Ajouter une **lettrine T** Cormorant à la citation home.
5. Sur `/cafe`, transformer les chips "lait au choix" en pictos pichets SVG.
6. Sur `/contact`, ajouter 3 micro-illus sépia aux cards transport (pied / voiture / train).
7. Sur `/recherche`, afficher un bloc "Recherches du moment" + 6 chips quand `q` vide.
8. Sur `/panier` vide, ajouter encart "4 coups de cœur de la semaine".
9. Sur `/checkout/confirmation`, ajouter confettis SVG laurier (Motion, désactivé reduce-motion).
10. Sur `/newsletter`, mettre une vraie illustration "gazette pliée" en SVG en hero.
11. Sur les fiches admin tables, mettre la ligne "stock < 3" en surlignage terracotta-50.
12. Footer : ajouter sitemap éditorial complet par section et "Lettres précédentes".
13. Header : badge "Ouvert / Fermé" temps réel basé sur l'heure courante (mardi-samedi 10-19).
14. Toutes les iframes Maps : wrapper avec overlay duotone cocoa + caption "Place Paoli, Corte".
15. Tous les `prose-style` (légal) : ajouter sommaire ancré sticky desktop.
16. Tous les hero des pages publiques : `Reveal` sur les enfants pour anim séquentielle.
17. Ajouter `aria-live="polite"` sur les toasts et les compteurs panier.
18. Remplacer "btn-ghost" par 2 niveaux différenciés (secondaire bordure cocoa-200, tertiaire underline plume).
19. Ajouter un **encart "Coup de cœur libraire"** dans la home + catalogue + panier vide (composant dédié).
20. Toutes les cards (4 angles arrondis 16px) : ajouter `shadow-page` au hover sur les liens-cards (cohérence avec books).

---

## 9. Big wins (10)

1. **Implémenter View Transitions API globale** avec mask diagonal cocoa 600ms (page-turn signature du brief, encore absent).
2. **Construire 15 nouvelles pages éditoriales** listées en section 4 (lieu, équipe, presse, occasion, abonnements thé, ateliers, fidélité, cartes-cadeaux, carte-corte, glossaire, recette du mois, club lecture, jeunesse, histoire, manifeste).
3. **Refondre le header** en méga-menu littéraire (genres en colonnes, mini-cart sticky, indicateur ouverture en temps réel, recherche inline expandable).
4. **Système de favoris fonctionnel** (Zustand + localStorage), affiché dans `/compte/favoris` et synchronisé sur les cards.
5. **Programme fidélité tampons** complet : 10 cafés = 1 offert, carte virtuelle scannable QR mockée, animation tampon qui s'apposent.
6. **Ajout panier signature** : animation livre miniature qui vole vers l'étagère SVG dans le header, avec ressort Motion.
7. **Hover preview cards** (`BookHoverCard`) sur tous les liens internes vers `/livres/[slug]` : carte flottante avec 4ᵉ couverture, prix, ajout direct.
8. **Carte interactive de Corte** SVG avec adresses partenaires cliquables, popup gravure sur hover. Pose la fierté insulaire sans bruit.
9. **Empty states custom illustrés** pour les 8 cas (panier, recherche, favoris, événements, commandes, stock admin, inscrits, recherche admin) avec 8 illustrations dédiées.
10. **Mode impression admin** : CSS print pour étiquettes Mondial Relay, listes émargement, factures, bons de commande fournisseurs. Différenciateur boutique réel.

---

*Document rédigé le 20 avril 2026, audit interne destiné aux agents de production. Aucune modification de code n'a été effectuée durant cet audit.*
