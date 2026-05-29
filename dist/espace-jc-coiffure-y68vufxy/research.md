# Recherche — ESPACE JC COIFFURE (Bastia)

## 1. Synthèse business

- **Activité :** Salon de coiffure mixte (femmes, hommes, enfants) — coupe, couleur, balayage, mèches, permanente, lissage, brushing, coiffures de mariage
- **Dirigeant :** Jean-Michel Pomier — coiffeur visagiste, fondateur
- **Cible :** Clientèle locale bastiais fidèle, actifs du centre-ville (salon en semaine), mariées et occasions spéciales
- **Proposition de valeur :**
  - Visagiste expert : chaque coupe est pensée selon la morphologie du visage
  - Accueil chaleureux, ambiance conviviale ("salon convivial")
  - Sans rendez-vous possible — accessibilité immédiate
  - Coiffures de mariage : service premium ponctuel
- **Ton & image de marque :** Professionnel et bienveillant, artisan expert de quartier, ancrage local fort
- **Localisation :** 28 Rue César Campinchi, 20200 Bastia — artère commerçante centrale, à quelques mètres de la Place Saint-Nicolas (la plus grande place de Bastia), flux piétonnier quotidien important, cœur de ville
- **Note Google :** 4.8/5 sur 17 avis (16 × 5★ / 0 × 4★-3★-2★ / 1 × 1★) — excellente satisfaction
- **Ancienneté :** Ouvert depuis juin 2006 — 20 ans d'établissement à Bastia
- **Horaires :**
  - Mardi : 09:00 – 18:30
  - Mercredi : 08:30 – 12:00 (demi-journée)
  - Jeudi : 09:00 – 18:30
  - Vendredi : 09:00 – 18:30
  - Samedi : 09:00 – 18:30
  - Lundi & Dimanche : Fermé
- **Contact :** 04 95 37 29 40
- **Site actuel :** Aucun site web

## 2. Contenu exploitable

### Résumés / descriptions extraites

1. « À Bastia, Espace JC Coiffure vous accueille dans un salon convivial pour prendre soin de vos cheveux avec style. » (Source : fnc.fr)

2. « Espace JC Coiffure vous propose des coupes, colorations, soins et coiffages adaptés à vos envies pour révéler votre beauté. Le salon vous propose également des idées de coiffures pour sublimer votre beauté lors de votre journée de mariage. » (Source : fnc.fr / unboncoiffeur.fr)

3. « Coiffeur visagiste — style change ou rafraîchissement, mèches et colorations, permanentes et traitements de lissage, coiffures de mariage. » (Source : Google Maps / directories)

4. « La possibilité de venir sans rendez-vous. » (Source : plusieurs annuaires)

5. « Note de 4.8/5 sur 17 avis Google — 16 avis 5 étoiles sur 17, témoignage d'une clientèle très satisfaite et fidèle. » (Source : CSV Google Maps)

6. « Entreprise individuelle fondée en juin 2006 — Jean-Michel Pomier, SIREN 490 341 583, inscrit au RCS de Bastia. » (Source : manageo.fr)

### Éléments différenciants

- **20 ans d'ancienneté à Bastia** (depuis 2006) — rare fidélité locale, réputation construite client par client
- **Visagiste** — compétence supérieure à la simple coupe, conseil morphologie personnalisé
- **Sans rendez-vous accepté** — service de proximité immédiat, accessible à la pause déjeuner
- **Localisation prime** : Rue César Campinchi, artère centrale, à 2 min à pied de la Place Saint-Nicolas
- **Note quasi-parfaite 4.8/5** avec presque exclusivement des 5★ sur 17 avis — bouche-à-oreille fort

## 3. Assets visuels

Note : Le CSV ne contient que des images Street View (panoid Google Maps, pas de vraies photos intérieures). Les URLs `premiere_image` et `thumbnail` pointent vers des vues extérieures de rue — non exploitables comme hero intérieur. Aucune photo réelle de l'intérieur du salon trouvée sur les plateformes accessibles (Facebook indisponible, PagesJaunes 403, annuaires sans photos). Les assets ci-dessous sont des candidats Unsplash P3 et Street View P4 en attente de remplacement par de vraies photos après signature.

**Usage démo — toutes les images Unsplash ci-dessous sont à remplacer par de vraies photos du salon après signature. Aucune photo réelle de l'intérieur du commerce n'a été trouvée via le web (Facebook protégé, annuaires sans galerie). Si le client signe, lui demander 3-5 photos de son salon pour le site final.**

| # | URL candidate | Description | Source | Priorité | Recommandation |
|---|---------------|-------------|--------|----------|----------------|
| 1 | `https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=2400` | Chaises noires et argent, miroirs salon moderne | Unsplash (hair-salon-interior) | P3 | hero ambiance |
| 2 | `https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?w=2400` | Fauteuil roulant bureau noir et argent à côté miroir | Unsplash (hair-salon-interior) | P3 | section intérieur |
| 3 | `https://images.unsplash.com/photo-1746723378067-83a345ff3160?w=2400` | Intérieur salon moderne avec produits capillaires | Unsplash (hair-salon-interior 2025) | P3 | section produits |
| 4 | `https://images.unsplash.com/photo-1626383137804-ff908d2753a2?w=2400` | Femme en chemise blanche debout près de fauteuil | Unsplash (salon-coiffure) | P3 | section services |
| 5 | `https://images.unsplash.com/photo-1695527081848-1e46c06e6458?w=2400` | Femme se faisant coiffer en salon | Unsplash (salon-experience) | P3 | section expérience |

**Script de téléchargement (à exécuter par l'orchestrateur) :**

```python
import sys; sys.path.insert(0,'.')
from tools.image_dl import download

out_dir = 'dist/espace-jc-coiffure-y68vufxy/site/assets/images'

assets = [
    ('https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=2400', 'hero-salon-chaises'),
    ('https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?w=2400', 'interieur-fauteuil-miroir'),
    ('https://images.unsplash.com/photo-1746723378067-83a345ff3160?w=2400', 'salon-produits-modernes'),
    ('https://images.unsplash.com/photo-1626383137804-ff908d2753a2?w=2400', 'coiffeuse-salon-blanc'),
    ('https://images.unsplash.com/photo-1695527081848-1e46c06e6458?w=2400', 'experience-coiffure'),
]

for url, hint in assets:
    result = download(url, out_dir, hint)
    print(f'OK: {result}' if result else f'ERR: {hint}')
```

## 4. Signaux pour le designer

- **Archétype suggéré :** `portrait-studio` ou `atelier-visagiste` — un site centré sur le GESTE et la PERSONNE (le visagiste au travail), avec typographie expressive proche de la mode/beauté, pas un site de franchise. Peut aussi aller vers `beauty-manifesto` (texte large, blanc glacé, typographie serrée, 1-2 photos signature). À différencier des 14 archétypes déjà utilisés dans le catalogue.
- **Palette évoquée :** Noir profond + blanc glacé + un accent chaud (or pâle ou terracotta rosé) — codes de la beauté professionnelle parisienne. Éviter à tout prix le cream/butter/peach palette défaut Claude. Direction possible : blanc `#F8F8F6`, noir ardoise `#1A1A1A`, or champagne `#C9A96E`, rose nude `#D4A89A`.
- **Ambiance :** Élégance artisanale, précision du geste, chaleur humaine, ancrage bastiais 20 ans. Ton : confiant, expert, accessible.
- **Typographie suggérée :** Paire mode/éditorial — ex. `Cormorant Garamond` (display, élégant) + `DM Sans` (body, lisible). Ou `Playfair Display` + `Lato`.
- **Geste UI singulier possible :** Animation "ciseau qui coupe" en hero scroll, ou révélation progressive d'une coupe "avant/après" via clip-path, ou compteur animé "20 ans à Bastia" + "17 avis 5★".
- **3 faits exploitables pour l'email :**
  1. Espace JC Coiffure n'a aucun site web malgré 20 ans d'activité à Bastia et une note Google 4.8/5.
  2. Jean-Michel Pomier est coiffeur visagiste — compétence haut de gamme, idéal à mettre en valeur en ligne.
  3. Salon rue César Campinchi, artère centrale de Bastia, à 2 min de la Place Saint-Nicolas — localisation premium sans présence numérique.
