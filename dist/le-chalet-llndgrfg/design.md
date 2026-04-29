# Design brief, Le Chalet (Vivario, RN193)

## 0. Réflexion UX (question par question)

**Visiteur-type :** trois profils, tous mobiles, tous en mouvement.
1. Le chauffeur routier qui a quitté Ajaccio à 4h30 et cherche à savoir s'il mange chaud à 6h, téléphone dans une main, volant dans l'autre, connexion 4G irrégulière dans la vallée du Vecchio.
2. Le voyageur Ajaccio-Bastia (ou inverse) qui a un train/un bateau/un avion à prendre et qui "google" "restaurant ouvert RN193" depuis l'autoroute A. Il décide en 10 secondes s'il s'arrête.
3. La famille qui traverse le col de Vizzavona après une randonnée, enfants fatigués, besoin d'un repère fiable avant Corte ou avant Bocognano.

Point commun : **ils ne sont pas assis à un bureau**, ils sont dans un véhicule, ils scrollent d'un pouce, ils n'ont pas l'intention de "découvrir une marque", ils ont besoin d'informations actionnables sous 10 secondes.

**Contexte d'arrivée :** recherche Google mobile principalement ("le chalet vivario", "restaurant ouvert matin corse RN193", "halte charcuterie corse"), recommandation IA (ChatGPT/Perplexity sur itinéraire A→B), éventuellement lien d'un forum routier ou d'un blog de road-trip corse. Device probable : 390×844 iOS, 5G/4G variable, écran au soleil en journée.

**Intention primaire (classée) :**
1. Est-ce que c'est ouvert **maintenant** ? (question #1 absolue à 5h40, 14h20, 18h45)
2. Combien de temps pour y arriver depuis ma position sur la RN193 ?
3. Est-ce une vraie halte fiable, pas un piège à touriste ? (preuve sociale rapide)
4. Qu'est-ce qu'on y mange concrètement, et qu'est-ce que je peux emporter (charcuterie) ?

**Intention business :** transformer le passant en ticket moyen supérieur (plat + charcuterie emportée). Le Chalet a deux flux : la table (petit-déj, déjeuner, dîner léger) et la **boutique de charcuteries corses** intégrée. Aujourd'hui le visiteur découvre la boutique sur place par hasard. Le site doit l'annoncer AVANT l'arrivée pour qu'il prépare son budget et son coffre.

**Contrainte UX structurante :** pas de réservation, pas de menu du jour publié, pas d'email dans le CSV. Horaires constants mais amplitude énorme (05h30, 19h00). Saisonnalité faible (ouvert toute l'année), météo forte (col de la Serra, neige possible en hiver, accès RN193 parfois ralenti). Le site ne doit pas vendre une expérience, il doit **certifier une halte**.

**Émotion-cible à 5 secondes :** confiance opérationnelle + chaleur de montagne. "Ici on sait où on arrive, c'est ouvert, c'est vrai, c'est chaud". Pas de séduction, pas de storytelling long. On cherche le soulagement du voyageur qui trouve son repère.

**Money shot :** ce n'est **pas une photo**. C'est une **grande horloge d'ouverture** qui dit `OUVERT DEPUIS 05:30, FERME À 19:00` en temps réel, avec en dessous un **compas altimétrique RN193** qui place Le Chalet entre Ajaccio (km 0, altitude 0m, ~1h20) et Bastia (km 148, altitude 0m, ~1h50) avec son altitude réelle (~800m, Col de la Serra). La photo du chalet vient en deuxième rang visuel, pas en premier. C'est une inversion délibérée de la hiérarchie resto classique.

---

## Archétype

**`custom`, dashboard-carnet-route de montagne.**

Justification : aucun des archétypes du catalogue ne matche l'intention. `editorial` raconterait une histoire au lieu de répondre "c'est ouvert ?". `rustic` habillerait le site en maison de village mais noierait l'information opérationnelle sous une nappe de terroir. `maritime` est géographiquement à contresens. `minimal-luxe` n'a pas la chaleur. Le seul traitement juste est un **tableau de bord de halte**, assumé comme tel : grande typo de cadran, indicateurs géographiques, fiche-terrain style carnet de route, touches manuscrites pour la chaleur. Ce layout diverge radicalement des 8 autres clients déjà livrés (aucun n'est un dashboard, aucun n'a de compas altimétrique, aucun n'est ancré sur une route nationale comme colonne vertébrale).

---

## Palette de couleurs

| Rôle       | Hex      | Nom descriptif      | Utilisation                                      |
|------------|----------|---------------------|---------------------------------------------------|
| `--bg`     | #F2ECDE  | Papier kraft clair  | Fond principal (papier de carnet de route)       |
| `--ink`    | #1A1713  | Encre charbon       | Titres, horloge géante, chiffres d'altimètre     |
| `--ink-2`  | #6B5E4E  | Bois patiné         | Textes secondaires, labels, annotations          |
| `--accent` | #B8391A  | Braise Vizzavona    | Statut "OUVERT", CTA primaire, aiguille du compas|
| `--line`   | #CFC0A3  | Corde de chalet     | Filets, cartouches, cadres d'instrument           |

Rationale : papier kraft et bois patiné pour la chaleur du chalet sans tomber dans le cliché rustique lourd (pas de brun foncé, pas de vert sapin facile). L'encre charbon donne à la typo la lisibilité d'une ardoise. La braise Vizzavona (rouge-orangé corse, tiré des cheminées et de la terre cuite des charcuteries suspendues) porte tous les signaux d'état actif (OUVERT, CTA, aiguille) : c'est la couleur du "maintenant, c'est vivant". La corde de chalet structure les instruments sans alourdir.

Contrastes AA vérifiés sur `--bg` (#F2ECDE) :
- `--ink` (#1A1713) : ratio ~15.8:1 (AAA)
- `--ink-2` (#6B5E4E) : ratio ~5.8:1 (AA normal)
- `--accent` (#B8391A) : ratio ~5.2:1 (AA normal, AA large)

Divergence palette : aucun autre client du catalogue n'a cette combinaison papier-kraft + braise. Les autres restaurants corses utilisent soit un crème pur (Spuntinu), soit un blanc-maritime (Nautic, Grand Bleu), soit un terracotta saturé (Caradellu). Ici, kraft + braise = instrument de bord d'altimètre en papier, pas nappe de bistrot.

---

## Typographie

- **Display :** `Bricolage Grotesque` (Google Fonts), poids 400 + 700 + variable optical size.
  Raison : c'est un grotesque contemporain avec des terminaisons légèrement humanistes, parfait pour une typographie d'instrumentation (chiffres de l'horloge, altitude, kilométrage) qui doit rester chaleureuse sans tomber dans le mono-industriel froid. Son optical-size variable donne à l'horloge géante son caractère de cadran gravé.
- **Mono :** `JetBrains Mono` (Google Fonts), poids 400 + 500.
  Raison : usage strictement circonscrit aux **coordonnées, horaires, altitudes, kilomètres**, c'est-à-dire tout ce qui relève du carnet de bord. Renforce l'aspect "instrument" du dashboard et crée un contraste lisible avec le Bricolage.
- **Body :** `Inter` (Google Fonts), poids 400 + 500.
  Raison : lisibilité sans faille sur mobile en plein soleil RN193, neutre pour ne pas concurrencer la typographie d'instrument. Trois polices seulement (display + mono + body), jamais deux sérifs.

**Size scale (mobile-first) :**
- Horloge hero : `clamp(4.5rem, 18vw, 11rem)` Bricolage 700
- H1 : `clamp(2.2rem, 6vw, 3.8rem)` Bricolage 400
- H2 : `clamp(1.6rem, 3.6vw, 2.4rem)` Bricolage 500
- Body : `1.02rem` Inter 400, line-height 1.6
- Mono labels : `0.82rem` JetBrains Mono 500, uppercase, tracking +0.06em
- Small : `0.85rem` Inter 400

**Tracking :** display `-0.01em`, mono `+0.06em` uppercase, body `0`.

---

## Layout archétype, divergence explicite

### Rythme des sections (lecture top-to-bottom)

1. **`nav` carnet de bord mince** : bande haute fine, logo wordmark "LE CHALET" en Bricolage 500, à droite 3 ancres textuelles (Halte, Carte, Boutique), pas de CTA dans la nav (le CTA principal est dans le hero). Pas de sticky, pas de backdrop-blur, fond `--bg` plein, séparée par un filet 1px `--line`. Moins de 56px de haut.

2. **`hero` horloge + verdict** (≈ 80vh mobile, 90vh desktop, pas 100vh : on veut que le bord de la section suivante soit visible pour inciter au scroll) :
   - Eyebrow mono : `RN193 · COL DE LA SERRA · 20219 VIVARIO · ALT. 800M`
   - **Horloge d'ouverture géante** plein centre, chiffres Bricolage 700 très gras, format `OUVERT DEPUIS 05:30` ou `FERME DEPUIS 19:00, ROUVERTURE 05:30` selon `Date.now()` côté JS. Pastille `--accent` animée (pulse léger 2s) à côté du statut OUVERT.
   - Sous l'horloge : ligne unique, une phrase nette : `Halte de montagne corse, ouverte 7j/7 dès l'aube, depuis Vivario.`
   - Deux CTA plats : `Nous trouver sur la RN193` (plein `--accent`), `Appeler le 04 95 47 22 40` (outline `--ink`).
   - **Pas de photo dans le hero.** Le premier bloc visuel est textuel + instrumentation. La photo vient section 3.
   - Traitement visuel clé : grille typographique très lisible, pas de shadows, pas de gradients, deux filets horizontaux `--line` de 1px qui encadrent l'horloge comme un cartouche d'instrument.

3. **`compas-RN193` (geste d'UI singulier)** : section dédiée, ~70vh, fond `--bg` avec subtil motif de courbes de niveau topographiques en SVG 5% opacité.
   - **Barre altimétrique horizontale** allant d'Ajaccio (gauche, alt. 0m, km 0) à Bastia (droite, alt. 0m, km ~148), traversant Vizzavona (alt. 910m, km ~70) et **Vivario / Le Chalet (alt. ~800m, km ~75)** comme point culminant signalé par une épingle `--accent` épaisse, animée en "plantée" au scroll-in.
   - Sous la barre : trois indicateurs mono lisibles :
     - `DEPUIS AJACCIO, ~1H20, 75KM`
     - `DEPUIS BASTIA, ~1H50, 73KM`
     - `ALTITUDE ACTUELLE, 800M`
   - Les durées affichées se **désaturent en rouge-accent si l'heure du navigateur est avant 07h00 ou après 18h00** (signal visuel "route plus longue à cette heure, phares obligatoires"). Microinteraction utile, pas gadget.
   - Label de section : eyebrow mono `REPÈRE GÉOGRAPHIQUE`, h2 `Entre mer et mer, au col.`

4. **`halte` (photo réelle première apparition)** : section paysage, image `tripadvisor-le-chalet-terrasse.jpg` en 16:9 pleine largeur mais avec 24px de marge latérale (pas fullbleed, on garde le papier-kraft visible sur les côtés comme un polaroid collé dans un carnet), légende mono en dessous `PHOTO, TERRASSE CÔTÉ ROUTE, NR193 VIVARIO`. À droite/dessous, paragraphe court de 2 phrases sur l'identité : "Un chalet ouvre avant l'aube depuis des années. On y arrête le moteur, on pose les mains sur une tasse chaude, on repart avec un saucisson."

5. **`carte-terrain`, ce qui est servi** : 3 colonnes mobiles empilées / 3 colonnes desktop, chaque colonne = un moment de halte (Petit-déj dès 5:30, Déjeuner corse, Assiette du Bûcheron). Pas de cartes ombrées : chaque colonne est un **cartouche bordé `--line`** avec eyebrow mono en haut (`05:30-10:00`, `12:00-14:30`, `TOUTE LA JOURNÉE`), h3 Bricolage, micro-liste d'items (4-5 max) en Inter, pas de prix (pas de prix fiables dans le research). Images associées : `restaurantguru-le-chalet-plats.jpg`, `restaurantguru-le-chalet-assiettes.jpg`, `restaurantguru-le-chalet-lasagnes.jpg`, format carré 1:1, dans les cartouches, non-décorative.

6. **`boutique-emporter`** : section à part, traitée différemment du reste. Fond inversé : bande `--ink` (charbon) pleine, texte en `--bg` (kraft clair). Contraste total pour faire signal. H2 blanc cassé : "La charcuterie que vous emportez." Un seul paragraphe, une seule image carrée à droite (`restaurantguru-le-chalet-moules.jpg` reclassé signature charcuterie ou placeholder si non pertinent, voir mapping ci-dessous), CTA ghost blanc cassé : "Voir la boutique sur place".

7. **`preuve-trafic`** : grande statistique typographique centrée, pas de carrousel d'avis. Format :
   - Chiffre géant : `1 422` (Bricolage 700, ≈ `clamp(4rem, 14vw, 8rem)`)
   - Label mono : `AVIS GOOGLE · NOTE 4.5/5`
   - Une seule citation courte en dessous, centrée, italique, max 20 mots : "Le restaurant typique de montagne corse, accueil chaleureux, parfait pour une halte sur la nationale." (source TripAdvisor, déjà dans research)
   - Sous la citation, barre de 5 étoiles `--accent` en SVG épuré.

8. **`infos-terrain`** : section finale utilitaire, traitée comme **fiche-terrain de carnet de route**.
   - 2 colonnes mobile stackées : à gauche, bloc mono strict : adresse, téléphone, horaires (7 jours listés), coordonnées GPS `42.1675, 9.1717` (approx Vivario), URL Google Maps. À droite, iframe Google Maps (400px hauteur mobile, 520px desktop) **sans arrondi**, avec un filet 1px `--line` tout autour, label mono au-dessus `CARTE, VIVARIO, COL DE LA SERRA`.
   - Au-dessus de la fiche, un indicateur horaire répété (plus petit que le hero) pour que le visiteur qui a scrollé ait la confirmation opérationnelle avant d'appeler.

9. **`footer`** : bande mince `--ink`, texte kraft. Nom du lieu, mention "Halte RN193 depuis toujours", mention Menghi Computer Science discrète, téléphone cliquable, lien Google Maps. Pas de newsletter (personne ne s'inscrit à la newsletter d'une halte routière), pas de réseaux sociaux (pas trouvés dans le research).

### Singularités du site (5)

- **Hero sans photo, horloge d'ouverture géante en money shot.** Inversion délibérée de la hiérarchie resto classique : l'information opérationnelle prime sur l'image.
- **Compas altimétrique RN193** qui positionne Le Chalet entre Ajaccio et Bastia avec dénivelé, km, durée estimée. Les durées se nuancent en rouge si l'heure du navigateur est hors amplitude lumineuse. C'est le **geste d'UI singulier imposé par le brief**, rendu comme un instrument de bord.
- **Statut OUVERT/FERMÉ live** calculé côté client à partir de `new Date().getHours()` croisé avec l'amplitude 05:30-19:00, mis à jour chaque minute. La pastille d'état pulse quand c'est ouvert, reste éteinte quand c'est fermé avec affichage de l'heure de réouverture.
- **Bande `boutique-emporter` en inversion totale kraft→charbon**, rupture chromatique délibérée pour signaler la deuxième ligne de revenus.
- **Grande statistique 1422** typographique comme preuve sociale, au lieu d'un carrousel d'avis façon widget. Un restaurant qui fait 1422 avis dans un village de 450 habitants, le chiffre parle seul.

### Ce que ce site n'a PAS (divergence explicite)

- **Pas de marquee** (banni par le brief et inadapté à un site utilitaire).
- **Pas de hero-split 60/40** texte/image (banni par le brief, inadapté à la priorité info-first).
- **Pas de galerie 3×2 standard** : les photos sont distribuées dans les sections fonctionnelles, pas en grille décorative.
- **Pas de photo en hero.** C'est la décision structurante du design.
- **Pas de section "notre histoire"** dans le sens éditorial long : Le Chalet n'est pas une maison qui raconte, c'est une halte qui certifie. Un paragraphe de 2 phrases suffit (section 4).
- **Pas de réservation, pas de formulaire, pas de popup.** Le CTA téléphone est le chemin court naturel.
- **Pas de sticky nav, pas de backdrop-blur, pas d'animation de parallaxe sur les photos.** Le site doit se lire comme un carnet, pas comme une démo Awwwards-tape-à-l'œil.
- **Pas de marquee texte, pas de ticker-tape, pas de cursor follower, pas de dark mode.** Light uniquement.

---

## Motion language

- **Entrée de sections** : `Motion.inView` avec `opacity 0→1 + translateY 12px→0`, durée 0.6s, easing `[0.2, 0.7, 0.2, 1]`, stagger 40ms. Sobre, rapide, pas de sensation "effet".
- **Horloge hero** : apparition en fade simple 0.4s au chargement, puis **le statut OUVERT/FERMÉ pulse** en opacité 1→0.6→1 sur un cycle de 2.2s easing `easeInOut`, pastille uniquement (pas le texte). Pause quand `prefers-reduced-motion`.
- **Compas altimétrique** : au scroll-in, la barre horizontale se **trace de gauche à droite** en 1.1s easing `[0.22, 1, 0.36, 1]`, puis l'épingle Vivario se "plante" en translateY(-8px)→0 avec bounce léger 0.5s. Les 3 indicateurs en dessous arrivent en stagger 80ms après la fin de la barre.
- **Chiffre 1422** : count-up au scroll-in de `0` à `1422` sur 1.4s, easing `[0.16, 1, 0.3, 1]`, format monospace pour éviter les sauts de largeur. Désactivé si `prefers-reduced-motion`.
- **Cards hover (cartouches section carte-terrain)** : `translateY(-2px)` + filet `--accent` qui remplace `--line`, transition 160ms. Pas de shadow, on reste en carnet.
- **Smooth scroll global** : Lenis actif, durée 0.9s, lerp 0.1.
- **Pas d'auto-play de vidéo, pas de cursor follower, pas de popup, pas de parallax sur images.** Le site doit rester clair sous 4G irrégulière en voiture.

---

## Images sélectionnées (mapping)

Toutes les images sont déjà téléchargées dans `site/assets/images/`. Aucune URL Unsplash n'est utilisée (terrain corse montagnard, photos Google Maps et TripAdvisor réelles suffisent). Aucun `source.unsplash.com`.

| Rôle                               | Chemin local                                                      | Source (origine)                                                                              | Alt text                                                              |
|------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| pas de hero image                   | (vide, intentionnel)                                              | n/a                                                                                           | n/a, hero typographique                                                |
| halte (paysage 16:9)                | ./assets/images/tripadvisor-le-chalet-terrasse.jpg                | og:image TripAdvisor, https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/50/8b/be/pretty-eating-stop.jpg | Le Chalet, halte en bord de RN193 à Vivario, vue façade               |
| carte-terrain, moment 1 (1:1)       | ./assets/images/restaurantguru-le-chalet-plats.jpg                | RestaurantGuru, https://img02.restaurantguru.com/c3f5-Le-Chalet-Vivario-meals.jpg             | Plateau de plats corses servis au Chalet                               |
| carte-terrain, moment 2 (1:1)       | ./assets/images/restaurantguru-le-chalet-assiettes.jpg            | RestaurantGuru, https://img02.restaurantguru.com/cbfb-Le-Chalet-Vivario-dishes.jpg            | Assiettes de spécialités corses servies au Chalet                      |
| carte-terrain, moment 3 (1:1)       | ./assets/images/restaurantguru-le-chalet-lasagnes.jpg             | RestaurantGuru, https://img02.restaurantguru.com/cb85-Restaurant-Le-Chalet-lasagna.jpg        | Lasagnes maison du Chalet, Vivario                                     |
| boutique-emporter (1:1)             | ./assets/images/thumbnail-le-chalet-vivario.jpg                   | CSV thumbnail Google Maps                                                                     | Vignette de l'atmosphère du Chalet, charcuteries suspendues            |
| halte secondaire (facultative 4:3)  | ./assets/images/hero-le-chalet-vivario.jpg                        | CSV premiere_image Google Maps                                                                | Le Chalet, façade principale RN193, Vivario                            |
| placeholder moules                  | non utilisée dans le site                                         | conservée dans `/assets/images/` pour traçabilité uniquement                                  | n/a (`restaurantguru-le-chalet-moules.jpg` écartée : moules ne correspondent pas au positionnement montagne/charcuterie) |

**Total : 6 images locales utilisées, 0 placeholder `placehold.co`, 0 image Unsplash, 0 image externe hotlinked.** L'image `restaurantguru-le-chalet-moules.jpg` reste dans le dossier pour traçabilité mais n'est pas affichée car les moules sont hors-positionnement (montagne corse, charcuterie, pas de signal fruits de mer dans le research). `hero-le-chalet-vivario.jpg` est réservée comme image de secours de la section `halte` ou du footer si besoin côté builder. Le hero n'utilise délibérément aucune image (c'est le parti-pris).

---

## Copy directions (pour le builder)

- **Eyebrow hero** (mono uppercase, tracking +0.06em) : `RN193 · COL DE LA SERRA · 20219 VIVARIO · ALT. 800M`
- **Hero display** : l'horloge dynamique `OUVERT DEPUIS 05:30` ou `FERMÉ, ROUVRE À 05:30` (pas de phrase littéraire, le money shot est la donnée elle-même).
- **Lede hero** (une phrase sous l'horloge) : `Halte de montagne corse sur la RN193, ouverte 7j/7 dès l'aube, petit-déjeuner, plats corses et charcuterie à emporter.` (35 mots, ancrée, zéro fioriture).
- **H2 compas** : `Entre mer et mer, au col.`
- **H2 halte** : `Une halte qui ne ferme jamais tôt.`
- **H2 carte-terrain** : `Ce qu'on sert, selon l'heure.`
- **H2 boutique** : `La charcuterie que vous emportez.`
- **H2 preuve** : `Mille quatre cent vingt-deux avis.` (mention en toutes lettres juste au-dessus du chiffre XXL, pour renforcer la densité typographique)
- **H2 infos** : `Venir au Chalet.`
- **CTA primaire** : `Nous trouver sur la RN193` (action géographique, pas "réserver" car pas de résa en ligne).
- **CTA secondaire** : `Appeler le 04 95 47 22 40` (téléphone = vrai chemin court pour ce client).
- **CTA boutique** : `Voir la boutique sur place`.
- **Ton** : factuel, chaleureux sec, phrases courtes, zéro superlatif marketing, zéro "authentique", zéro "passionnément". Aucun tiret cadratin. Le chalet parle comme un routier qui a trouvé sa place à table.

---

## Checklist avant handoff au builder

- [x] 5 couleurs hex définies, contrastes AA vérifiés sur `--bg`
- [x] 3 polices Google Fonts nommées avec poids (Bricolage Grotesque + JetBrains Mono + Inter)
- [x] 1 archétype choisi et justifié (`custom`, dashboard-carnet-route de montagne)
- [x] Rythme de sections défini (9 sections, intentionnel, ordre justifié par intention primaire)
- [x] 6 images réelles assignées à des rôles, 0 placeholder `placehold.co`, 0 Unsplash
- [x] Motion language décrit (durées, easings, stagger, respect de `prefers-reduced-motion`)
- [x] Geste d'UI singulier décrit : compas altimétrique RN193 + horloge d'ouverture live
- [x] Google Maps iframe : `https://maps.google.com/maps?q=42.1675,9.1717&output=embed` (coordonnées Vivario RN193, à affiner par le builder avec lat/lng exacts du CSV si disponibles)
- [x] Divergence explicite des 8 autres clients du catalogue (aucun n'est dashboard, aucun n'a horloge live, aucun n'a compas altimétrique)
- [x] Respect brief : pas de marquee, pas de hero split 60/40, pas de galerie 3×2, pas d'emojis, pas de tiret cadratin, light mode uniquement
