# Revue qualité — Soldani Coiffure

## Verdict : FAIL

## Détails

- **research.md** : PASS — 112 lignes, 13+ URLs citées, assets visuels listés, archétype suggéré, aucun signal négatif.
- **design.md** : PASS — Archétype `balayage-gradient` unique, palette 8 tokens nommés (non-défaut), polices Fraunces + Manrope + Caveat, sections ordonnées, motion décrit.
- **site/index.html** : FAIL — Galerie insuffisante : seulement 5 `<img>` dans l'ensemble du site (miroir-salon, ciseaux, homme-coupe, balayage, village-balagne). Le fichier `soin-cheveux.jpg` est présent dans `assets/images/` mais n'est pas référencé dans le HTML. La checklist exige ≥ 6 images. Tous les autres points passent : Tailwind pré-compilé (tailwind.css 12KB, zéro cdn.tailwindcss.com), zéro Lenis, zéro scroll-linked (--balayage-scroll fixé à 0.5 statique, pas d'écouteur scroll), zéro em-dash, zéro hotlink externe, zéro source.unsplash, toutes images locales présentes sur disque, reveals robustes (.js-ready + @keyframes autoreveal), Google Fonts chargées, Maps iframe présent, alt sur toutes les imgs, palette inventée (hair-gradient racine-cuivre-blond), layout material-driven coiffure unique, mobile-first, positif uniquement.
- **email.txt + email.html** : PASS (mineur) — Rebrand SpeedPost correct (zéro Menghi, zéro ancienne marque), offre 2 formules HT reproduites mot-pour-mot (1500€ + 20€/mois / 89€/mois 12 mois), URL site en clair, ≥ 3 faits spécifiques (5★, 14 avis Google, 136 Planity, balayage/mèches/coloration sans ammoniaque, Occhiatana), signature contact@speedpost.fr. Corps 187 mots (légèrement au-dessus de la cible 120-180 mots : mineur, pas de FAIL). Sujet 56 chars (cible ≤ 55 : mineur). Zéro em-dash.

## Remédiations

1. **menghi-builder : ajouter soin-cheveux.jpg dans le HTML** — `soin-cheveux.jpg` est déjà téléchargé dans `dist/soldani-coiffure-xdtaoeoc/site/assets/images/`. L'insérer dans une section existante (galerie, prestations ou ambiance) pour atteindre ≥ 6 images. Exemple : ajouter une carte `<img src="./assets/images/soin-cheveux.jpg" alt="Soin capillaire nourrissant, texture soyeuse">` dans la section prestations ou créer une micro-galerie de 3 images en grille CSS sous la section balayage.
