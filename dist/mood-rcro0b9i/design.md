# Design brief — MOOD (Salon de coiffure, Borgo) — V2 SIMPLE & CLAIR

> **V2 (refonte 2026-05-29) :** la V1 « Chromatic Reveal Studio » (révélateur de teinte before/after, sections codées N°01/N°02, nuancier à codes, Space Mono partout) a été jugée **trop complexe et incompréhensible** par le client. Règle apprise : pour un commerce de quartier, **la clarté prime sur le concept**. On comprend en 2 secondes : ce que c'est, où c'est, comment réserver. Aucun gadget. On garde la jolie palette et la typo serif, on jette toute la complexité.

## Principe directeur

Un site de salon **clair, chaleureux, élégant et immédiatement lisible**. Structure classique et rassurante (on ne réinvente pas la navigation). La singularité passe par la **palette** (blanc lin + graphite + cuivre + miel), la **belle typo serif**, et de **belles photos plein cadre**, pas par des interactions conceptuelles. Mobile-first. Light mode. Le numéro de téléphone est visible partout.

## Palette (inchangée, elle est bien)

| Rôle       | Hex      | Nom                | Usage                                              |
|------------|----------|--------------------|----------------------------------------------------|
| `--bg`     | #F4F2EE  | Blanc lin          | Fond principal, lumineux et doux                   |
| `--ink`    | #1A1714  | Graphite           | Texte principal, titres                            |
| `--ink-2`  | #6E665C  | Cendré             | Texte secondaire, légendes                         |
| `--accent` | #B5582E  | Cuivre             | Boutons, liens, petits surlignages                 |
| `--line`   | #DED8CD  | Filet              | Séparateurs, bords de cartes                       |
| `--gold`   | #C9A24B  | Miel doré          | Badge note 4.9, étoiles, micro-accents             |

Light mode obligatoire. Contrastes : `--ink` sur `--bg` ≈ 14:1 (AAA), `--accent` ≈ 4.7:1 (AA). Boutons cuivre = texte blanc.

## Typographie (simplifiée)

- **Titres :** DM Serif Display (400) — élégant, chaleureux. PAS de dégradé sur le texte, PAS d'effet. Juste de beaux titres.
- **Corps + UI + nav + boutons :** Outfit (300/400/500/600).
- **PLUS de Space Mono**, plus de « codes de nuancier ». Tailles lisibles (corps 16-18px, titres généreux).

## Structure (sections claires, dans cet ordre)

1. **Header sticky simple** : à gauche le wordmark « MOOD » (DM Serif), à droite un bouton cuivre **« 04 95 37 66 33 »** (lien `tel:+33495376633`) + petits liens d'ancre (Salon, Prestations, Galerie, Infos) masqués/burger sur mobile. Rien d'autre.

2. **Hero** : une belle photo plein cadre du salon (`hero-salon-interieur.jpg`) avec scrim sombre permanent pour la lisibilité. Dessus, centré ou aligné à gauche :
   - petit sur-titre : « Salon de coiffure & barbier · Borgo »
   - H1 : **« MOOD »** + sous-titre court une ligne, ex. « Coupe, couleur et barbier au coeur de Borgo. »
   - 1 phrase de réassurance : « Note 4.9/5 sur Google · Spécialiste du balayage flash. »
   - 2 boutons : **Appeler pour réserver** (cuivre, principal) + **Nous trouver** (ancre `#infos`, secondaire outline).
   - Pas de slider, pas de before/after, pas de curseur-pinceau. Juste une photo + un message clair.

3. **Bienvenue / le salon** (texte + 1 photo côte à côte) : 2-3 phrases simples et chaleureuses, faits réels uniquement : salon mixte + barbier ouvert depuis 2021, écoute et personnalisation, ambiance chaleureuse, la meilleure note de Borgo. Photo `ambiance-salon-miroirs.jpg`.

4. **Prestations** : grille simple et lisible de cartes (2 col mobile→3-4 col desktop), chacune = nom clair + 1 ligne de description. Pas de prix inventés (mention discrète « Tarifs sur place, devis gratuit »). Mettre **Balayage flash** en premier / mis en avant (bord ou pastille cuivre) car c'est la spécialité. Liste :
   - Balayage flash (spécialité), Couleur & mèches, Coupe femme, Coupe homme & barbier, Bar à frange, Coiffure mariage & cérémonie, Soin & bilan capillaire, Chignon & extensions.

5. **Galerie** : grille **régulière et propre** (pas de décalage gauche/droite, pas de wipe au scroll) de 6 photos avec un léger zoom au survol uniquement. Utiliser : balayage-resultat, coupe-femme-apres, barbier-homme, cheveux-couleur-tendance, mains-coiffeur-ciseau, salon-accueil-moderne.

6. **Avis / confiance** : bloc sobre et centré : grand **4.9/5** + 5 étoiles dorées + « 14 avis Google, 100% positifs ». Une phrase d'accroche. **Aucun avis textuel fabriqué**, aucune note < 5, aucune comparaison concurrentielle.

7. **Infos pratiques (`#infos`)** : deux colonnes simples.
   - Gauche : adresse (Résidence le Revinco, Av. de Borgo, 20290 Borgo), téléphone XL cliquable, Instagram @salon_mood_borgo, et le **tableau des horaires** clair (lun-mar 9h-18h, **mercredi fermé**, jeu-ven 9h-18h, sam 9h-17h, **dimanche fermé** — jours fermés en gris/cuivre discret).
   - Droite : iframe Google Maps `https://maps.google.com/maps?q=42.5600428,9.441029499999999&z=15&output=embed`.

8. **Footer** : wordmark MOOD, adresse + téléphone + horaires résumés, lien Instagram, et le crédit discret « Site réalisé par SpeedPost.fr ». Barre fixe basse mobile « Appeler » (cuivre).

## Animations (minimales)

- Reveals **fade + translateY léger** one-shot via `inView` (durée 0.4-0.5s) sur les sections. C'est tout.
- Survol galerie : léger zoom image (CSS transform scale 1.04, transition 0.4s).
- Survol boutons/cartes : changement de fond/bord doux.
- **Scroll 100% natif.** PAS de Lenis, PAS de `scroll((p)=>...)`, PAS de parallaxe, PAS de marquee défilant. Smooth des ancres via CSS `html{scroll-behavior:smooth}` seulement.
- Reveals robustes : `[data-reveal]{opacity:0}` conditionné par `.js-ready` + `@keyframes autoreveal` filet de sécurité.

## Images (déjà téléchargées, référencer ./assets/images/)

hero-salon-interieur.jpg (hero), ambiance-salon-miroirs.jpg (bienvenue), balayage-resultat.jpg + coupe-femme-apres.jpg + barbier-homme.jpg + cheveux-couleur-tendance.jpg + mains-coiffeur-ciseau.jpg + salon-accueil-moderne.jpg (galerie). Toutes en local, zéro hotlink. Scrim + text-shadow obligatoire dès qu'un texte est posé sur une photo.

## À NE PAS faire (sources de la confusion V1)

- Pas de révélateur de teinte / slider before-after / curseur-pinceau.
- Pas de sections numérotées « N°01 / N°02 ».
- Pas de nuancier interactif ni de « codes de teinte ».
- Pas de Space Mono ni de jargon graphique.
- Pas de marquee, pas de dégradé sur le texte des titres.
- Pas de galerie décalée/asymétrique avec wipe au scroll.
