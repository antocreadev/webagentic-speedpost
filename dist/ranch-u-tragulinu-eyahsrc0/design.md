# Design brief — Ranch U Tragulinu

## 0. Réflexion UX (question par question)

**Visiteur-type :** Famille en vacances dans le Cap Corse (35-50 ans, enfants 6-14 ans), couple en road-trip côtier sur la D80, randonneur nature en short saison. Device dominant : iPhone tenu à la verticale en bord de route ou en terrasse d'hôtel à Saint-Florent à 19h, connexion 4G correcte mais pas fibrée. Vient souvent depuis une recherche "balade cheval Saint-Florent" ou "que faire Cap Corse avec enfants".

**Contexte d'arrivée :** Google Maps fiche → clic site, ou TripAdvisor "Travelers' Choice #1 Farinole" → site, ou bouche-à-oreille hôtel/camping local. Une partie via Instagram (#capcorse).

**Intention primaire :** "Est-ce que ça vaut le détour ?" → puis "C'est quel type de balade et combien ?" → puis "Comment je réserve, vite, sans appeler à 23h ?". Le visiteur cherche une **preuve sensorielle** (photos chevaux + mer) avant tout, et un téléphone cliquable ensuite.

**Intention business :** Remplir les créneaux matin et fin de journée d'avril à octobre, et capter les familles pour le poney-club. Faire monter le panier moyen en mettant en avant le rituel post-balade (charcuterie + rosé Patrimonio). Devenir LA référence "balade cheval mer + maquis" sur le Cap, devant les concurrents non-référencés.

**Contrainte UX structurante :** Pas de système de réservation en ligne (téléphone uniquement). Saisonnalité forte. Trois terrains très différents (plage Agriates / maquis-montagne / poney-club enfants) qui doivent coexister sans se cannibaliser. Romain est le visage humain de la marque, son prénom revient dans tous les avis, le site doit l'incarner.

**Émotion-cible à 5s :** Le **grand large doré**. Lumière du Cap Corse vers 18h, sel sur la peau, sabots dans le sable mouillé, sentiment de liberté méditerranéenne lente. Pas "sportif technique cheval", pas "club hippique" : **évasion sensorielle**.

**Money shot :** `ta-ranch-2.jpg` (cavalière de dos sur cheval noir, plage turquoise Agriates, ciel azur). C'est l'image qui fait dire "je veux être à sa place demain matin". Elle ouvre le site en pleine hauteur, en mode "fenêtre topographique".

---

## Archétype

**`topographie-galops`** (custom, hors blacklist).

Justification : un site organisé comme une **carte topographique IGN** dépliée, avec courbes de niveau SVG dessinées main (rough.js), repères d'altitude, et un **tracé d'itinéraire** qui se dessine au scroll de section en section. Le visiteur descend "le sentier" depuis l'écurie (altitude 180m, point de départ) jusqu'à la plage Agriates (altitude 0m, finish line), en traversant 3 paliers de terrain. C'est la métaphore exacte du business de Romain : un guide qui mène ses clients d'un point A en hauteur jusqu'à la mer. Aucun client du catalogue n'a exploité la verticalité topographique ni le tracé-au-scroll : on diverge de `dashboard-carnet-route` (qui était horizontal et chiffré) et de `livre-de-bord` (qui était maritime-rose des vents).

---

## Palette de couleurs

Direction retenue après exploration de 4 pistes : (a) azur dominant + ocre, (b) maquis sombre + sable, (c) schiste rouge Patrimonio + ivoire, (d) **vert maquis profond + ocre cheval bai + ivoire dégradé Agriates + accent rosé crépuscule** (choisie). Cette direction reflète littéralement les 4 matières du Ranch : végétal (maquis), animal (robe baie), minéral (sable Agriates), atmosphérique (lumière du couchant). Light mode, mais ivoire poussiéreux légèrement verdi, pas cream warm.

| Rôle       | Hex      | Nom descriptif         | Utilisation                                                     |
|------------|----------|------------------------|------------------------------------------------------------------|
| `--bg`     | `#F2EEDF` | Ivoire Agriates        | Fond principal, ton sable calcaire des plages désertes du Cap.  |
| `--ink`    | `#1F2A1E` | Maquis profond         | Texte principal, vert très sombre presque noir du maquis dense. |
| `--ink-2`  | `#5E6B4F` | Olive séchée           | Texte secondaire, tons de feuilles d'olivier au soleil.         |
| `--accent` | `#B85A2A` | Bai brûlé              | CTA, surlignages, tracé itinéraire. Robe d'un cheval corse.     |
| `--line`   | `#D9CFA8` | Schiste poussiéreux    | Bords cartes, courbes de niveau, dividers. Rappel sentier.      |
| (bonus)    | `#E89372` | Rosé crépuscule        | Hover, glow horizon, halo lumineux au-dessus du money shot.     |

Contraste : `--ink` sur `--bg` = 12.4:1 (AAA). `--ink-2` sur `--bg` = 5.1:1 (AA). `--accent` sur `--bg` = 4.6:1 (AA). Vérifié.

### Pourquoi cette palette n'est PAS celle des 3 derniers clients

- **La Voûte (arcade-keystone)** : pierre crème `#E8DCC4` + ocre brûlé `#A8632B` + encre `#1A1410`. → On reprend zéro token. Ivoire Agriates est verdi, pas crème pierre.
- **Le Bowling (scorecard-arcade)** : navy `#142840` + jaune piste `#F4C842` + crème `#F2E8D5`. → Zéro token commun.
- **Le Nautic (livre-de-bord)** : bleu marin `#1F3A4A` + cuivre `#B47A3E` + parchemin `#EEE3CB`. → Le parchemin est proche, mais notre ivoire est verdi (h.55 vs h.45) et le dominant chromatique est vert maquis, pas bleu marine. Aucun risque de confusion.

---

## Typographie

- **Display :** `Tenor Sans` (Google Fonts) — 400. Une serif graphique mince avec un caractère naturaliste, qui évoque les étiquettes cartographiques anciennes (lettres droites, hautes, déliées). Utilisé pour H1/H2 et les altitudes.
- **Secondaire display :** `Caveat` (Google Fonts) — 500 + 700. Une cursive manuscrite pour les annotations type "carnet de guide" : noms de balades, durées, citations de randonneurs. Donne le supplément humain "écrit par Romain" qu'aucun autre client du catalogue n'a.
- **Body :** `Manrope` (Google Fonts) — 400 + 600. Sans-serif neutre lisible sur mobile en plein soleil, structure géométrique qui équilibre la chaleur des deux autres.
- **Échelle (mobile-first) :** h1 `clamp(2.6rem, 9vw, 5.4rem)` / h2 `clamp(1.9rem, 5vw, 3.2rem)` / lede `clamp(1.05rem, 2.4vw, 1.25rem)` / body `1rem` / caveat-annotation `clamp(1.3rem, 3vw, 1.8rem)` / altitude-tag `0.78rem` letter-spaced `0.18em`.
- **Tracking :** Tenor Sans `-0.01em` sur H1, `0` partout ailleurs. Caveat `+0.01em`. Manrope `0`.

Pourquoi pas Cormorant/Fraunces : c'est le défaut "éditorial chic" surutilisé. Tenor Sans est plus rare, plus cartographique, plus juste pour un brief topographique.

---

## Layout archétype — `topographie-galops`

### Structure verticale (carte dépliée du haut vers le bas)

Le site est lu comme une **descente topographique**. À gauche en sticky pendant le scroll, un **rail vertical** affiche en permanence : (a) l'altitude actuelle de la section en mètres, (b) une **mini-carte SVG** du sentier avec un point qui descend, (c) le nom du terrain en cours.

### Rythme des sections

1. **Hero — Cote 180m, le point de départ** (h. 100vh). Money shot `ta-ranch-2.jpg` en full-bleed avec scrim conforme aux règles. Surimpression : H1 Tenor Sans `Le Cap au pas du cheval`. Dans le coin supérieur droit, une **boussole-altimètre SVG** (custom inline) qui marque 180m et l'azimut Saint-Florent. Eyebrow `Ranch U Tragulinu · Farinole · D80 · depuis 2012`. CTA primaire `Réserver une balade` (tel:), secondaire `Voir les sentiers`. Le rail topographique apparaît à droite après 30vh de scroll.

2. **Marqueur d'altitude — 165m, "Le pré"** (h. 60vh). Bande horizontale fine. Photo `ta-ranch-1.jpg` (chevaux dans le pré fleuri). Annotation Caveat manuscrite "vue Elbe par temps clair" pointée par une flèche SVG rough.js. Lede 2 phrases : où on est, ce qu'on voit, qui est Romain.

3. **Trois sentiers (cote 120m)** (h. ~90vh). PAS une grille bento, PAS trois cartes alignées : trois **fiches topographiques** empilées en cascade décalée gauche/droite/centre, chacune avec sa courbe de niveau SVG en arrière-plan, une mini-altimétrie (départ→arrivée), durée, niveau, prix.
   - Sentier "Maquis-Crête" (photo `ta-ranch-12.jpg`, dénivelé 350m, 2h)
   - Sentier "Agriates-Plage" (photo `ta-ranch-2.jpg`, dénivelé 180m descendant, 3h, baignade à cheval)
   - Sentier "Aqua-Poney enfants" (photo `ta-ranch-3.jpg`, plat, 1h, 30€)
   Hover : la courbe de niveau s'épaissit, le tracé `--accent` se dessine en stroke-dashoffset.

4. **Cote 80m, "Aqua-poney" (le geste signature business)** (h. 80vh). Section dédiée à l'offre rare. Photo `ta-ranch-3.jpg` en grand 4:5. Texte court "expérience qu'on ne trouve nulle part ailleurs" en citation avis TripAdvisor (Caveat). Pas de carte, pas de bouton "réserver" : juste un téléphone géant cliquable.

5. **Carnet de Romain (cote 50m)** (h. ~70vh). Format **carnet de guide ouvert** sur 2 pages. Page gauche : portrait/groupe `ta-ranch-4.jpg` + signature manuscrite "Romain Provent, éleveur depuis 2012". Page droite : 3 paragraphes manuscrits (Caveat) sur le ranch, les chevaux corses, la philosophie nature. C'est le moment incarné humain, contrepoids émotionnel à la rigueur topographique.

6. **Le rituel — Cote 30m, "après la balade"** (h. 60vh). Photo `ta-ranch-6.jpg` (assiette charcuterie + rosé Patrimonio) en bandeau horizontal. Texte court éditorial sur le rituel post-balade. Aucun autre client n'a glorifié l'après-activité comme un produit : ici, c'est central.

7. **Voix des cavaliers (cote 15m)** (h. ~50vh). 3 citations TripAdvisor sélectionnées, présentées en **tampons "Travelers' Choice"** dessinés rough.js (cercles imparfaits, encre baveuse). Pas de slider, pas de carousel : statique, lisible d'un coup. Note 4.8/66 en chiffre XL Tenor Sans.

8. **Cote 0m — La plage** (h. 90vh). Section finale immersive. Photo `ta-ranch-14.jpg` (chevaux pie/bai crépuscule) en full-bleed avec scrim. Surimpression CTA final massif `Réserver : 06 17 14 52 12` (tel:). Le rail topographique affiche "ARRIVÉE — niveau de la mer". Petit message Caveat "on vous offre le rosé".

9. **Pied de carte (footer)** (h. auto). Google Maps iframe (lat 42.7466, lng 9.3265 Farinole, à confirmer côté builder via CSV) en format **bandeau cartographique** (16:5), avec un repère SVG "X" rouge dessiné main par-dessus. Horaires (ouvert 365j), téléphone, email, Instagram, Facebook. Mention "site signé Menghi Computer Science".

### Singularités du site (5)

- **Rail topographique sticky gauche** avec altitude live + mini-carte qui descend (geste UI singulier majeur).
- **Boussole-altimètre SVG** en coin hero, indiquant cote 180m et azimut Saint-Florent.
- **Courbes de niveau SVG rough.js** en arrière-plan de chaque section, légèrement animées au scroll (dilatation 1%).
- **Tracé d'itinéraire `--accent` qui se dessine** au scroll via `stroke-dashoffset` lié à scrollY, reliant les 9 cotes d'altitude.
- **Carnet manuscrit de Romain** avec Caveat + papier texturé SVG noise, format livre ouvert, qui rompt totalement avec la rigueur topographique des autres sections.

### Ce que ce site n'a PAS

- Pas de marquee.
- Pas de hero split 50/50.
- Pas de grille bento de cartes uniformes.
- Pas de nav sticky horizontale classique : la nav est intégrée au rail topographique gauche en mobile-collapsé.
- Pas de carousel/slider d'avis : statique, en tampons.
- Pas de section "menu" : ce n'est pas un restaurant.

---

## Material-driven — checklist

1. **Matières** : cuir (selles), crin (chevaux), schiste (sentiers Cap), maquis (immortelle, ciste, lentisque), sable Agriates.
2. **Texture de fond** : SVG noise très subtil "papier topographique" (grain papier IGN ~ 3% opacité) + courbes de niveau rough.js fines en `--line` à 18% opacité, regénérées pseudo-aléatoirement par section.
3. **Bordures** : pas de `rounded-3xl`. Cards rectangulaires avec coins légèrement cornés (clip-path coins coupés 6px) façon fiche topo. Dividers = pointillés rough.js irréguliers.
4. **Effet typo signature** : sur H1 et altitudes, double-trait léger (text-stroke 0.5px `--accent` + fill `--ink`) pour effet "lettre estampée sur carte". Sur annotations Caveat, légère rotation -2°/+1° aléatoire.
5. **Motif signature récurrent** : la **courbe de niveau** (3 lignes parallèles concentriques) revient en arrière-plan de toutes les sections, en filigrane.
6. **Hovers matière** : hover sentier-card → tracé d'altitude qui se dessine (stroke-dash), légère élévation +2px, ombre douce sable. Hover photo → léger zoom + halo `--accent` 4% en cadre intérieur.
7. **Lib externe autorisée** : `roughjs` (~12kb gz) pour les courbes de niveau, tampons, flèches manuscrites, divider pointillés. C'est la seule lib : on reste largement sous 100kb gz.

Test final : sans contenu, le site évoque carte topographique + équitation Méditerranée. Ne peut pas illustrer un bowling, un bar à vin, un glacier. Validé.

---

## Motion language

- **Smooth scroll** : Lenis actif, `lerp: 0.08`, scroll bloqué à 1× sur mobile.
- **Tracé itinéraire** : SVG path total, `stroke-dasharray = pathLength`, `stroke-dashoffset` lié à `window.scrollY / maxScroll` via `requestAnimationFrame` (pas Motion `scroll()` pour économie). Animation continue, jamais saccadée.
- **Rail topographique sticky** : apparaît avec `opacity 0→1, translateX -20px→0`, durée 0.5s, easing `[0.2,0.7,0.2,1]`, déclenché à scrollY > 60vh.
- **Sections reveal** : `Motion.inView` avec `opacity 0→1 + translateY 24px→0`, durée 0.5s (filet `@keyframes autoreveal` à 0.6s en CSS). Stagger 60ms.
- **Courbes rough.js** : générées une fois au load (seedrandom) puis statiques. Pas de regen au scroll (perf).
- **Boussole-altimètre** : aiguille rotation continue lente ±3° via CSS `@keyframes compass-sway` 6s ease-in-out infinite alternate.
- **Hero parallax** : translateY 0→-8% sur l'image hero entre scrollY 0 et 100vh.
- **Tampons avis** : légère oscillation rotation -1°→+1° sur hover, 240ms.
- **Cards sentier hover** : translateY -2px + tracé altimétrie qui se dessine en 600ms.
- **Pas de cursor follower, pas d'autoplay vidéo, pas de popup**.

---

## Images sélectionnées

Toutes les images sont déjà téléchargées dans `dist/ranch-u-tragulinu-eyahsrc0/site/assets/images/` (16 photos réelles). Zéro Unsplash, zéro placeholder.

| Rôle                                  | Chemin local                              | Alt text                                                          |
|---------------------------------------|-------------------------------------------|--------------------------------------------------------------------|
| Hero money shot (3:4 portrait full)   | `./assets/images/ta-ranch-2.jpg`          | Cavalière sur cheval noir face à la plage turquoise des Agriates  |
| Cote 165m "Le pré" (16:9)             | `./assets/images/ta-ranch-1.jpg`          | Chevaux dans un pré fleuri face à la mer et l'île d'Elbe          |
| Sentier Maquis-Crête (4:5)            | `./assets/images/ta-ranch-12.jpg`         | Cavalière en forêt de chênes-lièges du Cap Corse                  |
| Sentier Agriates-Plage (4:5)          | `./assets/images/ta-ranch-2.jpg` (réuse)  | Cheval marchant sur la plage déserte des Agriates                 |
| Sentier Aqua-Poney (4:5)              | `./assets/images/ta-ranch-3.jpg`          | Enfants à poney dans les vagues au coucher de soleil              |
| Aqua-poney grand format (4:5)         | `./assets/images/ta-ranch-3.jpg` (réuse)  | Poneys entrant dans la mer avec enfants                           |
| Carnet de Romain (3:4)                | `./assets/images/ta-ranch-4.jpg`          | Groupe convivial sous le préau du ranch                           |
| Le rituel (21:9 bandeau)              | `./assets/images/ta-ranch-6.jpg`          | Assiette de charcuterie corse et rosé de Patrimonio               |
| Tampons avis (décoratif)              | `./assets/images/ta-ranch-7.jpg`          | Enfants dans le pick-up du ranch au crépuscule                    |
| Cote 0m final (full-bleed)            | `./assets/images/ta-ranch-14.jpg`         | Chevaux pie et bai au coucher de soleil rose                      |
| Décor secondaire footer               | `./assets/images/ta-ranch-9.jpg`          | Scène du ranch                                                    |

Réutilisation de `ta-ranch-2.jpg` (hero + sentier) acceptable : c'est le money shot, traitement crop différent (full vs 4:5).

---

## Copy directions (pour le builder)

- **Eyebrow hero** : `RANCH U TRAGULINU · FARINOLE · CAP CORSE` (capitales, tracking 0.22em, Manrope 600, 0.78rem)
- **H1 hero** : `Le Cap, au pas du cheval.` (Tenor Sans, point final assumé)
- **Lede hero** : "À dix minutes de Saint-Florent, sur la D80, Romain élève ses chevaux corses depuis 2012. Trois sentiers, du maquis jusqu'à la plage des Agriates, à votre rythme."
- **CTA primaire (partout)** : `Réserver : 06 17 14 52 12` (tel: cliquable, jamais masqué dans un bouton générique)
- **CTA secondaire** : `Voir les sentiers` (scroll vers section 3)
- **Pas d'em-dash**. Substituts `:`, `,`, `.`, `()` partout.

---

## Breakpoints

- **Mobile** (default → 640px) : rail topographique se transforme en barre fine en bas avec altitude actuelle uniquement. Fiches sentier empilées 1 colonne. Carnet Romain passe en 1 page (image puis texte).
- **Tablette** (641-1024px) : rail latéral apparaît à 50% taille. Fiches sentier en cascade décalée mais hauteur réduite.
- **Desktop** (1025+) : rail topographique full à gauche (largeur 220px), contenu centré max-width 1080px, marges respiratoires généreuses à droite.

---

## Checklist avant handoff au builder

- [x] Palette 5+1 hex définie, contrastes AA/AAA vérifiés
- [x] 3 polices Google Fonts nommées (Tenor Sans + Caveat + Manrope) avec poids
- [x] Archétype `topographie-galops` unique, hors blacklist, justifié
- [x] 9 sections ordonnées avec rythmes de hauteurs variés
- [x] 10+ rôles d'image assignés à 10 photos réelles distinctes (16 dispo)
- [x] Motion language décrit (durées 0.4-0.6s, easing, stagger, filet autoreveal)
- [x] Google Maps iframe : `lat 42.7466, lng 9.3265` (Farinole, à confirmer builder via CSV)
- [x] Geste UI signature inventé : rail topographique sticky + tracé itinéraire scroll-drawn + boussole-altimètre
- [x] Lib externe : `roughjs` v4 (~12kb gz) pour courbes/tampons/flèches manuscrites
- [x] Material-driven : courbes niveau + papier topographique + manuscrit Caveat + clip-path coins coupés
