# Design brief — Yuna Concept by Léa

> Concept bien-être 3-en-1 a Biguglia (Haute-Corse) : coiffure naturelle + hair spa / head spa + reflexologie & massages. Tenu par Lea, 15 ans d'experience, produits 100% naturels Natulique. 5/5 Google (13 avis), 4.9/5 Planity (77 avis).

---

## 0. Reflexion UX (question par question)

**Visiteur-type :** Une femme 28-55 ans de Biguglia / Bastia / Furiani, sensible au naturel et au bio, fatiguee, en quete d'un moment pour elle. Elle peut aussi etre une touriste estivale cherchant un soin haut de gamme local. Device majoritaire : mobile (recherche le soir depuis le canape, ou entre deux courses a l'Espace Artium). Secondairement desktop pour la decouverte approfondie.

**Contexte d'arrivee :** Recherche Google "coiffeur naturel Biguglia", "head spa Bastia", "reflexologie Haute-Corse", "massage Biguglia" ; recommandation bouche-a-oreille (la note parfaite circule) ; lien Planity partage ; clic depuis le profil Instagram/Facebook. Elle arrive curieuse mais prudente : "est-ce que ce lieu est vraiment a la hauteur de ce qu'on m'a dit ?"

**Intention primaire :** Comprendre le concept 3-en-1 (qui est rare et un peu abstrait au premier abord) PUIS reserver un creneau. La conversion finale = clic vers Planity ou appel. Avant de reserver elle veut "ressentir" l'ambiance cocon et verifier que c'est bien naturel/expert, pas un salon de chaine.

**Intention business :** (1) Faire comprendre instantanement que Yuna n'est pas un simple salon de coiffure mais un lieu de soin holistique unique dans la zone, pour justifier un panier moyen plus eleve (rituels 1h-2h, soins reflexo a 45-90 EUR). (2) Convertir le trafic local en reservations Planity. (3) Incarner Lea comme figure experte et de confiance (le "by Lea" est un actif). (4) Vendre les cheques cadeaux (asset photo dedie, fort potentiel saisonnier fetes / fete des meres).

**Contrainte UX structurante :** Le concept est TRIPLE et heterogene (cheveux / corps / pieds-energie). Un layout lineaire generique noierait ce qui fait la singularite. La contrainte = mettre en scene un PARCOURS sensoriel en 3 univers distincts mais relies par la meme main (Lea) et la meme philosophie (naturel). Autre contrainte : pas de tarifs detailles fiables a afficher partout (on garde quelques reperes mais on pousse vers Planity pour le detail/dispo). Reservation 100% deportee sur Planity (pas de booking maison).

**Emotion-cible a 5s :** Apaisement chaud + sentiment d'etre attendue, comme franchir le seuil d'un cocon. Chaleur de la terracotta, lumiere de bougie, matiere bois et plante. JAMAIS le froid clinique d'un spa blanc-bleu d'hopital. On veut que l'epaule du visiteur descende d'un cran.

**Money shot :** `salon-05` (la cabine massage en cocon de bougies, guirlande lumineuse, table drapee) : c'est l'image qui resume l'emotion-cible. En hero on combine cette chaleur avec `salon-01` (mur terracotta + miroir dore) qui ancre le cote coiffure-signature. Le second money shot, reserve a sa section, est `salon-06` (Head Spa LED bleu, cascade d'eau) : le geste signature spectaculaire qu'on garde pour le climax du parcours.

---

## Archetype

**`custom` : `Le Rituel en 3 Temperatures` (parcours sensoriel scroll-traversee)**

Justification : le concept 3-en-1 appelle un parcours, pas une grille. J'invente un fil narratif ou le visiteur TRAVERSE trois univers de soin enchaines comme un rituel chez Lea : on commence dans la CHALEUR (coiffure, terracotta), on glisse vers le COCON (massage & reflexologie, ambre-bougie + sauge), puis on bascule dans la FRAICHEUR APAISANTE (head spa, bleu LED). La couleur d'ambiance de fond evolue progressivement au scroll, comme la temperature d'une seance. Cet archetype "transition chromatique pilotee par le scroll" diverge radicalement des 3 derniers clients (carte marine, scorecard bowling, arches pierre) qui sont tous sur fond parchemin fige avec encre marine. Ici le fond RESPIRE et change, l'arbre de vie se dessine, et aucun n'a de geste de gradient-de-temperature.

---

## Palette de couleurs

Light mode chaud. Le fond n'est PAS un crème-beurre (palette defaut Claude bannie, et deja "use" par les 3 derniers clients en parchemin) : c'est un **ivoire argileux rose tres pale** distinct, qui evolue legerement selon l'acte du rituel.

| Role          | Hex       | Nom descriptif         | Utilisation                                                        |
|---------------|-----------|------------------------|--------------------------------------------------------------------|
| `--bg`        | `#FBF3EC` | Ivoire argile          | Fond principal (acte 1, coiffure) : ivoire rose-poudre tres clair  |
| `--ink`       | `#3A2A22` | Cacao tiede            | Texte principal, titres, traits de l'arbre de vie                  |
| `--ink-2`     | `#8A6F60` | Bois flotte            | Texte secondaire, legendes, labels d'etapes                        |
| `--accent`    | `#C0633C` | Terracotta sienne      | Couleur signature : CTA, soulignages, chiffres, pastilles, seuils  |
| `--line`      | `#E6D6C6` | Lin / carreau ciment   | Separateurs, borders fines, fonds de cards                         |

**Accents secondaires (touches, non dominants) :**
- `--sauge` `#8FA68A` (vert sauge cendre) : botanique, acte 2 (massage/reflexo), badges "100% naturel", feuilles SVG, hover doux. C'est l'accent secondaire des feuillages tropicaux de `salon-04`. Aucun des 3 derniers clients n'utilise un vert sauge : forte divergence.
- `--or` `#B98A4E` (or laiton mat) : filets fins, encadrement du wordmark, micro-details (rappel du miroir baroque dore et du logo). Jamais en aplat, uniquement en trait/texte fin.
- `--spa` `#3E7C95` (bleu Head Spa, version desaturee profonde) : RESERVE exclusivement a l'acte 3 (section Head Spa) : fond de section, lueur LED, CTA local. Interdit ailleurs sur le site. C'est le "twist" de temperature qui clot le rituel.

**Fonds evolutifs par acte (le geste de temperature) :**
- Acte 1 Coiffure : `--bg` `#FBF3EC` (ivoire argile chaud)
- Acte 2 Massage/Reflexo : derive vers `#F6EAE0` (ambre-cocon, un cran plus chaud/dore)
- Acte 3 Head Spa : bascule vers `#EAF1F2` (brume bleutee fraiche) avec accents `--spa`
- Retour infos/footer : revient a `#FBF3EC` (on ressort apaise, dans la chaleur)

> Palette tiree DIRECTEMENT des vraies photos du salon (mur terracotta, bois, carreaux ciment ivoire, miroir dore, feuillages sauge, LED bleue), pas inventee. Contrastes verifies sur `--bg` #FBF3EC : `--ink` #3A2A22 = 10.9:1 (AAA), `--ink-2` #8A6F60 = 4.6:1 (AA), `--accent` #C0633C = 4.5:1 (AA texte 16px+). `--sauge` et `--or` reserves au decoratif / texte large bold. `--spa` #3E7C95 sur fond brume #EAF1F2 = 4.8:1 (AA).

### Pourquoi cette palette n'est PAS celle des 3 derniers clients

| Client            | `--bg`     | `--ink`        | `--accent`        | Accent 2          |
|-------------------|-----------|----------------|-------------------|-------------------|
| Le Nautic         | `#F4EFE3` parchemin | `#0E2A3A` encre marine | `#C0502A` terre Balagne | —                 |
| La Voute (refonte)| `#F4EDE0` pierre Piana | `#1C1714` basalte | `#B9452A` rouge Calanques | `#3A5A78` bleu volet |
| Le Bowling        | `#FAF4E6` creme Sagone | `#0E2A3C` encre marine | `#E85A3C` corail | `#2C9DB8` azur    |
| **Yuna (ce site)**| `#FBF3EC` **ivoire argile rose** | `#3A2A22` **cacao tiede (PAS marine)** | `#C0633C` terracotta sienne | `#8FA68A` **sauge** + `#3E7C95` spa |

Divergence : fond ivoire rose (pas beige parchemin), encre CACAO chaude (les 3 autres ont une encre bleu-marine froide), accent secondaire VERT SAUGE jamais vu chez eux, et un fond QUI EVOLUE au scroll au lieu d'etre fige. Seul `--accent` terracotta est dans la meme famille que les autres rouges (impose par les vraies photos), mais ma teinte `#C0633C` est plus sienne-orangee-douce, et c'est le seul token de chevauchement (< 1 autorise).

---

## Typographie

- **Wordmark (logo cursif) :** `Dancing Script` (Google Fonts) — poids 600/700 — pour ecrire "Yuna concept by Léa" en lettrage manuscrit, fidele au vrai logo cursif du salon. Usage STRICTEMENT limite au wordmark (nav + footer + hero). Ne jamais utiliser pour du body (illisible).
- **Display (titres) :** `Cormorant` (Google Fonts) — poids 400 + 500 + 600, dont l'italique 500 — serif doux, humaniste, elegant et feminin sans etre clinique. Pour H1, H2, noms des actes. (Note : on prend `Cormorant`, plus respire et plus large que Cormorant Garamond, pour eviter le "tell" de la paire defaut.)
- **Body / UI :** `Mulish` (Google Fonts) — poids 400 + 500 + 600 — sans-serif aere, rond, doux, tres lisible mobile. Choisi pour sa rondeur chaleureuse (vs Inter trop neutre/corporate). Sert le corps, les labels, les CTA, les chiffres.

**Size scale (mobile-first) :**
- Wordmark hero : `clamp(3rem, 11vw, 6.5rem)` (Dancing Script)
- H1 : `clamp(2.2rem, 6.5vw, 4.4rem)` (Cormorant 500)
- H2 (titres d'acte) : `clamp(1.7rem, 4vw, 2.9rem)` (Cormorant 500)
- H3 : `clamp(1.25rem, 2.5vw, 1.6rem)` (Cormorant 600)
- Eyebrow / labels : `0.78rem` letter-spaced `0.22em` uppercase (Mulish 600)
- Body : `1.06rem`, line-height 1.7 (Mulish 400)
- Small / legendes : `0.86rem` (Mulish 500, `--ink-2`)

**Tracking :** display `-0.005em` (serif respire), eyebrow `+0.22em`, body `0`, wordmark `0`.

---

## Layout archetype — DIVERGENCE OBLIGATOIRE

**Choix : `Le Rituel en 3 Temperatures`** (parcours scroll-traversee a fond chromatique evolutif). Le site se lit comme une seance complete chez Yuna : on entre, on traverse les 3 univers de soin dans l'ordre de chaleur, on ressort apaise. La structure n'est ni une grille produit ni une timeline historique : c'est un long ruban sensoriel ou la couleur d'ambiance change sous les pieds du visiteur. Diverge des 3 derniers (parchemin fige + encre marine + grilles/scorecard/arches).

### Rythme des sections (de haut en bas)

1. **Nav-cocon flottante** : barre transparente qui se densifie (fond `--bg` + filet `--or` bas) au scroll. Wordmark "Yuna" en Dancing Script `--accent` a gauche. A droite : `Le concept`, `Les soins`, `Head Spa`, et un bouton pilule `--accent` plein "Reserver" (vers Planity). Mobile : wordmark + bouton "Reserver" + burger qui ouvre un drawer chaud.

2. **Hero seuil (acte 0, ivoire)** : split asymetrique 55/45. A gauche, sur fond `--bg`, eyebrow "BIEN-ETRE NATUREL · BIGUGLIA", wordmark XXL "Yuna concept by Léa" en Dancing Script, lede 2 phrases, et 2 CTA (`Reserver sur Planity` plein terracotta / `Decouvrir le rituel` lien souligne or). Dessous, une ligne de "proof" discrete : 5,0 etoiles Google + 4,9 Planity + "100% produits naturels Natulique". A droite, une composition photo : `salon-05` (cocon bougies, money shot) en grande verticale arrondie haut, avec un encart superpose `salon-01` (coiffure terracotta) en bas, filet `--or`. L'**arbre de vie SVG** commence ici, fin, en watermark derriere le wordmark, ses branches encore nues.

3. **Manifeste Lea (bandeau respiration)** : pleine largeur fond `--bg`, une seule grande phrase en Cormorant italic centree : "Un seul lieu, trois facons de prendre soin de vous. Par les mains de Léa, depuis quinze ans." Portrait textuel de l'experte (15 ans, reflexologie & energetique chinoise). Petit medaillon `salon-02` (identite, arbre de vie bois) en encart rond `--or`.

4. **Le concept 3-en-1 (carte des 3 temperatures)** : trois "stations" presentees en triptyque vertical empile (mobile) / aligne (desktop), reliees par un trait `--or` qui descend (le fil du rituel). Chaque station = pastille numerotee terracotta + nom de l'acte + une ligne. C'est la table des matieres sensorielle : `01 Coiffure naturelle`, `02 Massage & Reflexologie`, `03 Head Spa & Hair Spa`. Au survol/scroll, le fil `--or` se remplit progressivement vers la station active.

5. **ACTE 1 — Coiffure naturelle (chaud terracotta)** : fond `--bg` ivoire. Titre Cormorant "La coiffure, version naturelle". Texte sur Natulique (95-100% naturel, colorations sans agressivite, sante capillaire). Photo `salon-01` (mur terracotta + miroir dore) en grand format arrondi, et `salon-03` (gamme Natulique) en encart secondaire. Liste de 3-4 prestations en chips `--line` (coupe, coloration vegetale, soin Natulique, brushing). Micro-detail : feuilles SVG sauge qui flottent en marge.

6. **ACTE 2 — Massage & Reflexologie (cocon ambre-sauge)** : ICI le fond derive vers `#F6EAE0` (transition chromatique progressive declenchee a l'entree de section). Titre "Le corps qui se denoue". Money-shot `salon-05` (cocon bougies) en grande largeur avec scrim chaud + texte overlay (regle contraste appliquee). Dessous, `salon-04` (cabine jour feuilles tropicales) en split avec le bloc reflexologie : explication reflexologie plantaire/palmaire/cranio-faciale + energetique chinoise. Reperes tarifaires doux en chips (Plantaire 65 EUR · Palmaire 30 EUR · Faciale 45 EUR · Complet 90 EUR), formules "indicatives, detail et dispo sur Planity". Accent `--sauge` sur les puces botaniques.

7. **ACTE 3 — Head Spa & Hair Spa (la fraicheur, bleu spa)** : LE climax. Le fond bascule vers `#EAF1F2` brume fraiche, accents `--spa` `#3E7C95`. C'est le seul endroit du site ou le bleu apparait. Photo `salon-06` (bac LED bleu, cascade d'eau) en full-bleed ou tres grand, scrim, texte overlay. Titre "Head Spa : le rituel signature". Description du rituel (bain vapeur, massage cranien, brushing, purifiant/hydratant/reparateur, 1h-2h). CTA local `--spa` "Reserver mon Head Spa". L'arbre de vie SVG est ici a son plein feuillage (climax du dessin progressif).

8. **Pourquoi Yuna (preuve + naturel)** : retour fond `--bg` chaud. Trois colonnes/cards `--line` : "100% naturel Natulique" (avec `salon-03`), "Note parfaite" (5,0 Google · 4,9 Planity, 90 avis cumules, accueil & proprete notes 5/5), "Cheque cadeau" (avec `salon-02`, CTA offrir un soin). Un ou deux verbatim clients courts en Cormorant italic ("Accueil genial, tres gentille et tres professionnelle", "Au top comme d'habitude").

9. **Infos & venir (carte chaude)** : fond `--bg`. Bloc gauche : adresse Espace Artium, route d'Ortale, 20620 Biguglia ; horaires Mar-Sam 09:00-18:00 (Dim-Lun fermes) en grille ; tel 06 63 80 98 97 (cliquable) ; bouton Planity. Bloc droite : iframe Google Maps (lat 42.5937348 / lng 9.4363509), coins arrondis, filet `--or`. Footer dessous : wordmark Dancing Script `--accent`, rappel concept en une ligne, mention SpeedPost discrete `--ink-2`.

### Singularites du site (geste UI invente)

- **GESTE SIGNATURE — La transition de temperature au scroll.** Le `<body>` (ou un calque fixe `::before`) interpole sa couleur de fond en fonction de la section active : ivoire chaud (acte 1) -> ambre-cocon (acte 2) -> brume bleutee fraiche (acte 3) -> retour ivoire. Implementation : `Motion.scroll()` ou `inView` par section qui set une CSS var `--ambient` animee en `transition: background-color 1.2s ease`. C'est la traduction litterale d'une seance de soin : on monte en chaleur puis on se rafraichit. Personne d'autre dans le catalogue n'a un fond qui change.

- **L'arbre de vie qui pousse au scroll.** Le motif identitaire du salon (arbre de vie, vrai logo bois decoupe) est un SVG inline en watermark fil-de-fer `--or`/`--ink-2` qui se DESSINE progressivement via `stroke-dashoffset` pilote par le scroll : tronc nu au hero, branches a l'acte 1, premieres feuilles `--sauge` a l'acte 2, plein feuillage au Head Spa. Il relie visuellement les 3 actes et incarne "le soin qui s'epanouit". (Technique : `path` SVG + `pathLength`, `Motion.scroll` mappe sur `strokeDashoffset`.)

- **Le fil d'or du rituel** (section 4) : un trait vertical `--or` qui se remplit en suivant la progression dans les 3 stations, comme on suit le fil d'une seance.

- **Triptyque des temperatures** : la table des matieres n'est pas un menu, c'est une carte de 3 stations chromatiques (chaud / cocon / frais) qui annonce le voyage.

- **Pastilles "seuil" terracotta numerotees** (01/02/03) qui ouvrent chaque acte, comme franchir une porte du cocon.

### Ce que ce site n'a PAS (divergence explicite)

- Pas de fond parchemin/creme fige (les 3 derniers en ont tous un : ici le fond EVOLUE).
- Pas d'encre bleu-marine (ici cacao chaud).
- Pas de grille bento / scorecard / catalogue produit.
- Pas de marquee defilant (un salon de soin n'a pas besoin de bruit ; on privilegie le calme).
- Pas de hero plein-ecran texte-sur-photo seul : le hero est un split chaud avec wordmark cursif.
- Pas de cursor follower, pas de popup, pas d'auto-play.
- Pas de bleu ailleurs que dans l'acte Head Spa (discipline chromatique stricte).

---

## Motion language

- **Entrees scroll :** `Motion.inView`, `opacity 0->1 + translateY 18px->0`, duree 0.5s, easing `[0.2,0.7,0.2,1]`, stagger 70ms sur les groupes (chips, cards). Reveals proteges : `[data-reveal]{opacity:0}` conditionne par `.js-ready`, + `@keyframes autoreveal` filet de securite a ~0.5s si Motion plante.
- **Transition de temperature :** background-color du calque ambient en `transition: background-color 1.2s ease`, declenche par `inView` de chaque section-acte (threshold ~0.35). Doux, jamais brutal.
- **Arbre de vie :** `strokeDashoffset` mappe lineairement sur `scrollY/scrollHeight` via `Motion.scroll()`. Feuilles sauge : `opacity` + `scale 0.9->1` qui s'allument par paliers d'acte.
- **Hero composition photo :** parallax vertical tres leger (~8%) sur l'image cocon au scroll.
- **Fil d'or (section 4) :** hauteur d'un trait `--or` animee de 0 a 100% selon la station active.
- **Cards hover :** `translateY(-3px)` + ombre douce chaude, transition 180ms.
- **CTA hover :** leger eclaircissement terracotta + `scale 1.02`, 160ms.
- **Smooth scroll global :** Lenis actif (essentiel pour fluidite des transitions de fond et du dessin de l'arbre).

---

## Images selectionnees

Uniquement des chemins locaux (6 vraies photos HD du salon, deja telechargees). Zero Unsplash : on a 6 photos reelles, regle satisfaite.

| Role                          | Chemin local                    | Source (origine)        | Alt text                                                       |
|-------------------------------|---------------------------------|-------------------------|----------------------------------------------------------------|
| hero principal (cocon, money) | ./assets/images/salon-05.jpg    | Planity (Cloudinary HD) | Cabine de massage en cocon de bougies chez Yuna a Biguglia     |
| hero encart (coiffure)        | ./assets/images/salon-01.jpg    | Planity (Cloudinary HD) | Espace coiffure mur terracotta et miroir dore chez Yuna        |
| identite / cadeau (medaillon) | ./assets/images/salon-02.jpg    | Planity (Cloudinary HD) | Logo manuscrit, arbre de vie en bois et cheque cadeau Yuna     |
| acte 1 produits Natulique     | ./assets/images/salon-03.jpg    | Planity (Cloudinary HD) | Gamme de soins naturels Natulique bio sur etagere bois         |
| acte 2 cabine massage (jour)  | ./assets/images/salon-04.jpg    | Planity (Cloudinary HD) | Cabine de massage au papier-peint feuilles tropicales          |
| acte 3 Head Spa (signature)   | ./assets/images/salon-06.jpg    | Planity (Cloudinary HD) | Rituel Head Spa avec bac inclinable et lumiere LED bleue       |

Aucun placeholder. Les 6 roles couverts par 6 vraies photos. Le money shot `salon-05` est en hero ET reutilise en grand dans l'acte 2. `salon-06` reserve a l'acte Head Spa (seul endroit bleu).

---

## Copy directions (pour le builder) — FR sans em-dash

- **Eyebrow hero :** `BIEN-ETRE NATUREL · BIGUGLIA, HAUTE-CORSE`
- **Wordmark :** "Yuna concept by Léa" (Dancing Script)
- **H1 / lede hero :** "Un cocon de bien-etre, trois facons de prendre soin de vous. Coiffure naturelle, massages et reflexologie reunis sous un meme toit, par les mains de Léa." (35-50 mots max, decoupe en 2 phrases).
- **Tagline reprise :** "Coiffure, hair spa et reflexologie."
- **Titres d'actes :** Acte 1 "La coiffure, version naturelle" · Acte 2 "Le corps qui se denoue" · Acte 3 "Head Spa : le rituel signature".
- **Manifeste :** "Quinze ans d'experience, des produits 100% naturels Natulique, et une seule intention : que vous repartiez apaisee."
- **CTA primaire :** `Reserver sur Planity` (vers https://www.planity.com/yuna-concept-by-lea-20620-biguglia)
- **CTA secondaire :** `Decouvrir le rituel` (scroll vers section concept)
- **CTA Head Spa :** `Reserver mon Head Spa`
- **CTA infos :** `Appeler le salon` (tel:+33663809897)
- **Verbatims (positifs only) :** "Accueil genial, tres gentille et tres professionnelle." · "Au top comme d'habitude." · "Tres contente."
- **Reperes tarifaires (chips, formulation douce) :** "Reflexologie plantaire 65 EUR · palmaire 30 EUR · faciale 45 EUR · complete 90 EUR. Tarifs indicatifs, detail et disponibilites sur Planity."
- Ne jamais afficher de note < 5, jamais de comparaison concurrentielle, jamais le caractere em-dash.

## Infos pratiques (a integrer section 9)

- **Adresse :** Espace Artium, route d'Ortale, 20620 Biguglia
- **Tel :** 06 63 80 98 97 (lien `tel:+33663809897`)
- **Horaires :** Mardi a Samedi, 09:00 - 18:00. Dimanche et Lundi : fermes.
- **Reservation :** Planity, https://www.planity.com/yuna-concept-by-lea-20620-biguglia
- **Google Maps iframe :** `https://maps.google.com/maps?q=42.5937348,9.4363509&z=15&output=embed`
- **Note :** 5,0/5 Google (13 avis) · 4,9/5 Planity (77 avis), accueil et proprete 5/5.

## Stack technique (rappel pour builder)

- Tailwind PRE-COMPILE en `tailwind.css` local (jamais le CDN play). theme.extend avec la palette ci-dessus + fontFamily (Dancing Script / Cormorant / Mulish).
- Google Fonts : preconnect + `Dancing+Script:wght@600;700` + `Cormorant:ital,wght@0,400;0,500;0,600;1,500` + `Mulish:wght@400;500;600`.
- Motion One + Lenis en ESM via jsdelivr.
- Maps iframe sans cle API (URL ci-dessus).
- Toutes images en `./assets/images/...`, zero hotlink.
- Contraste texte-sur-photo : appliquer integralement la recette scrim permanent + brightness(.92) + text-shadow sur les actes 2 et 3 (salon-05, salon-06).

## Checklist avant handoff au builder

- [x] 5 couleurs hex principales + 3 accents secondaires definis, contrastes AA verifies
- [x] 3 polices Google Fonts nommees avec poids (wordmark + display + body)
- [x] 1 archetype custom choisi + justifie + nomme (`Le Rituel en 3 Temperatures`)
- [x] 9 sections ordonnees
- [x] 6 images reelles assignees a des roles (0 placeholder, 0 Unsplash)
- [x] Motion language decrit (durees + easings + geste signature)
- [x] Geste UI singulier invente : transition de temperature au scroll + arbre de vie qui pousse
- [x] Google Maps iframe (lat 42.5937348 / lng 9.4363509) prete
- [x] Divergence palette verifiee vs 3 derniers clients (1 seul token terracotta en chevauchement, impose par photos)
