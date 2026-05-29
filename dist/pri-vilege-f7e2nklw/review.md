# Revue qualité — Pri'vilège (Aregno, Balagne)

## Verdict : FAIL

---

## Détails

### research.md : PASS
- Synthèse business complète (activité, cible, proposition de valeur, ton, localisation, horaires, contact).
- 6 sources web citées avec URL (icoiffeur.fr, unboncoiffeur.fr, francebleu.fr, balagne-corsica.com, facebook.com, acceslibre.beta.gouv.fr).
- Table d'assets visuels avec 3 entrées (1 lh3 HD priorité 1 + 2 Unsplash fallback justifiés). Honnête sur les limites d'accès.
- Aucun signal négatif.
- Archétype suggéré en fin de rapport.

### design.md : PASS
- Archétype custom `editorial-village` justifié, divergent des 14 archétypes blacklistés (documenté ligne par ligne).
- 7 tokens hex avec rôles, contrastes vérifiés AA/AAA, palette défaut Claude bannie, comparatif anti-redondance vs 5 clients récents fourni.
- 3 Google Fonts nommées avec poids (Fraunces 300/500, DM Sans 400/500, Caveat 500).
- 9 sections ordonnées, toutes remplies, zéro vide, zéro placeholder.
- Motion décrit (inView one-shot 0.5s, fil-mèche 0.6s, scroll natif, no scroll-linked, reveal safety net, filet anti-zéro compteurs).
- Table image-rôle : 5 rôles photo + iframe Maps = 6 entrées minimum couvertes. 0 placeholder.

### site/index.html : PASS
Résultats des checks automatisés :

| Check | Résultat | Statut |
|---|---|---|
| source.unsplash.com | 0 | PASS |
| cdn.tailwindcss.com | 0 | PASS |
| href="./tailwind.css" | 1 | PASS |
| tailwind.css size | 11182 octets | PASS (> 8000) |
| .flex{ dans tailwind.css | 1 | PASS |
| classes custom compilées (bg-bg, bg-surface, border-line) | 1 | PASS |
| em-dash U+2014 | 0 | PASS |
| hotlinks externes (lh3/unsplash/tourinsoft) | 0 | PASS |
| Lenis | 0 | PASS |
| scroll-linked scroll((p)=>) | 0 | PASS |
| services tiers (planity/treatwell/fresha...) | 0 | PASS |
| sections cryptiques N°0x | 0 | PASS |
| .js-ready [data-reveal] | 2 | PASS |
| @keyframes autoreveal | 1 | PASS |
| classList.add('js-ready') | 1 | PASS |
| compteurs sans >0< | data-to="7">7<, >4<, >5<, >15<, >11< | PASS |
| images locales (4 refs, 0 manquantes) | ok | PASS |
| HTML bien formé | ok | PASS |
| Google Fonts | 2 occurrences | PASS |
| Maps iframe output=embed, coords 42.5822036,8.8956816 | 1 | PASS |

Checks qualitatifs :
- Layout unique : archétype editorial-village photo-first avec fil-mèche SVG discret, bandeau village full-bleed, split éditorial 55/45, footer sombre. Non répertorié dans les 14 archétypes brûlés. PASS.
- Clarté 2s : eyebrow "SALON DE COIFFURE MIXTE · AREGNO, BALAGNE" + h1 + CTA tel: + numéro 06 75 49 08 00 visible en hero dès le chargement. PASS.
- Palette ivoire-prune-rose poudré-cuivre, aucun token cream/butter/peach/chocolate. PASS.
- Hero = vraie photo (couleur-balayage-detail.jpg, locale). PASS.
- Pas de SVG grand format en hero (fil-mèche = 180px de large, décor de titre discret). PASS.
- CTA tel:+33675490800 présent en nav, hero, prestations, infos, footer. PASS.
- Sections toutes remplies avec contenu réel. PASS.
- Positif uniquement, zéro négatif. PASS.
- Light mode, mobile-first, overflow-x:hidden. PASS.
- Alt présent sur toutes les img. PASS.

### email.txt + email.html : FAIL

- Sujet : "Pri'vilège, votre site est en ligne" = 35 caractères. PASS.
- URL GitHub Pages en clair dans le corps. PASS.
- Offre reproduite mot-pour-mot (1500€ + 20€/mois sans engagement, 89€/mois 12 mois). PASS.
- Signature SpeedPost / Anto / contact@speedpost.fr / webagentic.speedpost.fr. 0 trace Menghi. PASS.
- Em-dash : 0 dans email.txt et email.html. PASS.
- HTML max-width 640px, sans image distante. PASS.
- **FAIL CRITIQUE : pitch descriptif obsolète (V1 rejetée).** L'email contient la phrase : "J'ai traité le nom Pri'vilège comme un carton de membre gravé, palette ivoire et champagne, avec un reflet lumineux signature." Ce descriptif correspond à la V1 rejetée par le client (carton de membre gravé = archétype banni, palette champagne = palette défaut Claude bannie). La refonte livrée est un archétype `editorial-village`, palette ivoire-prune-rose poudré-cuivre, hero photo plein cadre. Envoyer cet email crée une incohérence totale : le client lit "carton de membre gravé" et ouvre un site éditorial photo-first. Ce décalage nuit gravement à la crédibilité de la proposition commerciale.
- Longueur corps : ~155 mots (hors signature). PASS.
- Éléments spécifiques : 4,5/5 (15 avis), Village préféré des Français 2024, amandiers, Calvi/L'Île-Rousse. PASS (critère qualitatif OK, 4 faits).

---

## Remédiations

1. **menghi-emailer : réécrire email.txt + email.html** — Supprimer la phrase "J'ai traité le nom Pri'vilège comme un carton de membre gravé, palette ivoire et champagne, avec un reflet lumineux signature." et la remplacer par un pitch cohérent avec la refonte livrée : archétype éditorial de magazine de beauté de village, hero photo lumineux plein cadre, ambiance salon de Balagne, 7 ans d'ancrage local, prise de rendez-vous par téléphone. Conserver l'offre, la signature, l'URL et les faits spécifiques tels quels. Corps cible : 130-160 mots.
