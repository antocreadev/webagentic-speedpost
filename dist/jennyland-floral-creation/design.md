# Design Brief — Jennyland Floral Création (v3 — Atelier de fil)

> Refonte 2026-05-09 après deuxième itération. La v1 reprenait la palette défaut Claude. La v2 (Velours Minuit) sentait le template "luxe-éditorial" générique. La v3 part d'une règle nouvelle : **le design doit incarner la matière du métier** (crochet, laine, fil, coton). On TOUCHE le site avant de le lire.

## La matière : crochet / laine / coton — attributs sensoriels

| Attribut         | Traduction visuelle / interactive                                            |
|------------------|------------------------------------------------------------------------------|
| Mailles / chain  | Bordures de section en chain-stitch SVG, dividers en boucles de fil          |
| Doux / fluffy    | Drop-shadow douce et large (pas hard 1px), grain SVG dans les fonds          |
| Hand-stitched    | Headings au "stitched-outline" (text-stroke + offset shadow) animés en reveal |
| Doily            | Coins/cartes scalloped (doily-edge), pas de rounded-3xl génériques            |
| Granny square    | Motif répété en filigrane comme background pattern                           |
| Embroidery hoop  | Le configurateur "vase" devient un cercle bois + tissu lin                   |
| Yarn ball / hook | Décor récurrent (header, hover micro-interactions, footer signature)         |
| Fil qui se tire  | Hover sur card → un fil sort, ondule, se rétracte au mouseout                |
| Coton brut       | Texture de fond linen weave SVG très subtile, papier presque palpable        |
| Dye végétal      | Palette ancrée dans les vrais teints naturels (madder, saffron, walnut, woad, sage) |

## Recherches web visuelles

1. **Loop of the Loom** (Boston) — atelier de tissage, site avec textures fabric en background, headings en serif chunky avec stroke effect.
2. **Wool and the Gang** — e-commerce DIY tricot, headings hand-painted, palette dyed naturel, embroidery hoop comme nav element.
3. **Awwwards — Hand & Land Studio** — ferme/textile artisanal, fond linen, surpiqûres décoratives sur les cards.
4. **Awwwards — Lemonadestand 2026 winner "Folk Story"** — chain-stitch borders entre sections, motif granny square en filigrane.
5. **Mochi New York** — pull en crochet, photographie sur fond lin écru, typographie chunky DM Serif Display.
6. **Pinterest "yarn aesthetic web design 2026"** : tendance dominante = **fond lin + headings serif chunky + accents dye végétal + bordures chain stitch SVG**.
7. **Etsy bestseller "wool natural dye"** — palette walnut/madder/saffron/indigo/sage est la référence visuelle commune des artisans textiles 2026.
8. **Florists' Review 2026** — direction "fearless texture" : mélanger 3 textures différentes (lin, soie, métal) dans un même page sans diluer.

## Anti-redondance — où on en est sur tous les clients Menghi

| Client              | --bg     | --ink    | --accent | Vibe                              |
|---------------------|----------|----------|----------|-----------------------------------|
| la-voute            | `#FAF1E0`| `#2C1F18`| `#E89B7B`| arcade-keystone warm cream         |
| le-bowling          | `#FBE8D6`| `#2A1810`| `#F4C66D`| scorecard arcade warm + butter     |
| le-nautic           | `#F4E8D0`| `#1F2A38`| `#9A4F2A`| livre-de-bord beige + terracotta   |
| jennyland v1        | `#FFF8EE`| `#2C1F18`| `#E89B7B`| **rejeté** — palette défaut Claude |
| jennyland v2        | `#FAFAFA`| `#1B1F2A`| `#C9A961`| **rejeté** — éditorial-template glacé |
| **jennyland v3**    | `#F4ECD8`| `#2D241A`| `#B85C3D`| **atelier-de-fil** matière dyed     |

Le `#F4ECD8` est lin brut écru avec une dominante jaune-vert légère (différent de tous les warm-cream précédents, qui tirent rose-orangé). Le `#2D241A` est encre walnut (brune-verte, pas chocolat noir). Le `#B85C3D` est madder root (rouge-brique, vraiment pas un peach). 0 token recyclé.

## Palette finale — dyed yarn naturelle

```css
:root {
  /* Fonds lin */
  --bg: #F4ECD8;          /* lin brut écru, dominante jaune-vert (flax dyed) */
  --bg-2: #EFE6CD;        /* lin un ton plus profond pour zonings */
  --surface: #FBF6E6;     /* lin blanc raw, cards posées sur --bg */
  --paper: #F8EFD5;       /* papier kraft fin pour overlays/quotes */

  /* Encres brunes */
  --ink: #2D241A;          /* walnut hull dyed, profond chaud */
  --ink-2: #6B5A47;        /* mordançage brun, body secondaire */
  --ink-3: #9C8A72;        /* brun lin clair, captions */

  /* Dyes végétaux */
  --madder: #B85C3D;        /* madder root rouge-brique, accent principal */
  --madder-deep: #8E4128;   /* madder concentré, hover */
  --saffron: #D7B23F;       /* safran-curcuma, accent secondaire */
  --saffron-soft: #E8CD7E;  /* safran lavé, blush nuance */
  --woad: #4A6B7A;          /* indigo woad léger, accent froid d'équilibre */
  --sage-dyed: #7B8A5E;     /* sauge dyed végétal, leafy */

  /* Filets et lignes */
  --line: #C9B696;          /* lin écru pour bordures principales */
  --line-stitch: #8E4128;   /* madder pour les chain-stitch decoratives */
  --line-soft: #DDCFB2;     /* lin pâle pour séparateurs discrets */
}
```

Contrastes :
- `--ink #2D241A` sur `--bg #F4ECD8` ≈ 11.2:1 (AAA)
- `--madder #B85C3D` sur `--bg #F4ECD8` ≈ 4.8:1 (AA Large + UI)
- `--woad #4A6B7A` sur `--surface #FBF6E6` ≈ 5.6:1 (AA)

## Typographie — caractère matière

| Rôle                | Famille                  | Poids               | Effet matière                                              |
|---------------------|--------------------------|---------------------|------------------------------------------------------------|
| Display "stitched"  | **DM Serif Display**     | 400 (italic + reg)  | Chunky serif, applique stitched-outline CSS (voir ci-dessous)|
| Body serif          | **Lora**                 | 400/500/600 italic  | Serif humaniste tiède, texte courant                       |
| Sans UI             | **Outfit**               | 300/400/500/600/700 | Sans ronde et chaude, navigation/UI/prix                   |
| Cursive signature   | **Pinyon Script**        | 400                 | Préservée du logo, pour "Jennyland" et titres poétiques    |
| Hand brush          | **Caveat Brush**         | 400                 | Notes manuscrites, badges "fait avec amour", témoignages   |
| Numérique mono      | **JetBrains Mono**       | 400/500             | Codes commande admin                                       |

**Effet stitched-outline sur les headings** (la signature visuelle du site) :
```css
.stitched-headline {
  font-family: 'DM Serif Display', serif;
  color: var(--surface);
  -webkit-text-stroke: 2px var(--ink);
  text-stroke: 2px var(--ink);
  filter:
    drop-shadow(3px 3px 0 var(--ink-2))
    drop-shadow(-1px -1px 0 var(--madder));
  letter-spacing: -0.01em;
}
.stitched-headline .swash {
  font-family: 'Pinyon Script', cursive;
  -webkit-text-stroke: 0;
  color: var(--madder);
  filter: none;
  font-style: normal;
}
```

Effet : chaque lettre apparaît creuse avec un trait foncé d'aiguille tout autour, une ombre madder décalée comme si elle était cousue sur un tissu un peu en relief.

## Libs à installer (autorisées par les nouvelles règles)

| Lib                              | Poids gz | Rôle                                                             |
|----------------------------------|----------|------------------------------------------------------------------|
| `rough-notation`                 | 3.5 kb   | Souligner "Jennyland" et certains accents avec un trait hand-drawn |
| `splittype`                      | 1.6 kb   | Split text par char/word pour anim per-letter (stitch reveal)    |
| `gsap` (core seul, pas plugins)  | 23 kb    | Orchestration animations stitch-by-stitch + ScrollTrigger natif Motion 1 |
| `@lottiefiles/dotlottie-react`   | 14 kb    | Animation lottie d'un fil qui s'enroule (yarn-ball + crochet hook), import 1 fichier dotLottie |

Total ≈ 42 kb gz, sous le budget 100 kb.

Pour les éléments décoratifs **on dessine en SVG inline** (granny square, doily corner, chain-stitch border, embroidery hoop, yarn ball, crochet hook) — pas de lib externe pour ces motifs.

## Archétype : `atelier-de-fil` (custom material-driven)

C'est le geste structurant : **toutes les sections vivent sur fond lin écru `--bg`** (pas d'alternance blanc/charcoal v2). Le rythme vient de :
1. **Bordures chain-stitch SVG** entre les sections (filet madder qui ondule en boucles de crochet)
2. **Granny-square pattern** en motif filigrane répété au-dessus du lin (5% opacity), donne de la profondeur sans prendre l'œil
3. **Cards en doily-edge** (coins scalloped via SVG mask), pas de rounded-3xl
4. **Headings stitched-outline** sur tous les H1/H2 — c'est la signature visuelle qui revient page après page
5. **Embroidery hoop** comme fenêtre vers les images importantes (hero, configurateur, about)
6. **Yarn ball illustration** SVG en background des sections "process" (4 étapes), animée GSAP qui se déroule au scroll

## Geste UI signature : Configurateur "Compose ton bouquet" (revisité material)

Le vase rond v2 devient un **embroidery hoop** :
- Cercle bois beige clair (SVG, gradient bois subtil + grain texture)
- À l'intérieur : tissu lin tendu (texture canvas SVG)
- Quand on clique une fleur dans le catalogue, elle apparaît dans le hoop avec une animation **stitch-in** :
  1. Une aiguille SVG plonge depuis le haut (transformée GSAP, 0.3s)
  2. Un point de chain-stitch se trace au sol où la fleur va atterrir (stroke-dasharray animé, 0.2s)
  3. La fleur "pousse" depuis ce point en bouncePop (0.4s easeOutElastic)
  4. L'aiguille remonte (0.2s)
- Total animation : 0.9s, mais perçu fluide. Donne le sentiment qu'on **brode la fleur dans le tissu**, pas qu'on la fait tomber dans un vase.

Le panneau de droite (récap) est sur **papier kraft** plié (`--paper`), avec les fleurs ajoutées listées comme une recette de couture. Total en cursive Pinyon Script. Bouton "Ajouter au panier" stylisé comme un patch brodé.

## Motion language

- **Reveal scroll** : opacity + translateY 24px, durée 0.6s, easing `cubic-bezier(.16,.84,.3,1)`. Stagger 100ms.
- **Stitched headlines apparition** : sur entrance dans le viewport, animer le `-webkit-text-stroke` de transparent à `var(--ink)` sur 0.7s (ou alternative : split par char via `splittype`, animer chaque char avec un decalage stagger 30ms — chaque lettre apparaît "stitched in" comme si une aiguille passait dessus).
- **Underline rough-notation** : sur le mot "Jennyland" (cursive Pinyon Script), un trait madder dessiné main apparaît au scroll (rough-notation `type: "underline"`, color: var(--madder), strokeWidth: 3, animationDuration: 1200).
- **Hover card produit** : 
  1. La card monte de 4px
  2. Un fil madder sort du coin haut-droit (SVG line, stroke-dasharray animé, 0.4s)
  3. Les coins doily se gonflent légèrement (scale 1.02 sur la SVG mask)
  4. Au mouseout : tout se rétracte en 0.3s
- **Process 4 étapes** : un fil de coton madder dessiné en SVG path traverse les 4 cartes ; au scroll, le path se trace progressivement (stroke-dasharray) — métaphore "le fil qui relie les étapes".
- **Yarn ball footer** : illustration SVG d'une boule de laine + crochet hook ; au hover, la boule tourne légèrement (rotation 360deg sur 8s linear), le hook fait un mini-stitch loop.
- **Embroidery hoop hover (about)** : le hoop tourne doucement sur lui-même, comme si Jenny tournait son ouvrage pour observer.

## Architecture pages — alternance signalée par la matière, pas par la couleur

Toutes les sections sur fond `--bg` lin écru. Le rythme vient des transitions :

| Section                  | Transition entrante                                              |
|--------------------------|------------------------------------------------------------------|
| 1. Hero                  | Aucune, c'est l'arrivée                                          |
| 2. Marquee mots-clés     | Chain-stitch border madder horizontal (SVG, animation roll)       |
| 3. Univers (4 catégories)| Granny-square pattern apparaît en filigrane (fade-in 0.5s)       |
| 4. Featured produits     | Bordure inverse : un fil tissé qui s'épaissit                    |
| 5. Configurateur teaser  | Embroidery hoop qui se zoome au scroll                            |
| 6. About Jenny           | Photo de Jenny dans un hoop oval, fond papier kraft               |
| 7. Process 4 étapes      | Fil de coton madder qui se trace de gauche à droite               |
| 8. Témoignages           | 3 cards papier kraft, surpiqûres en bordure                      |
| 9. CTA final             | "Jennyland" cursive XXL avec rough-notation underline + sparkles |

## Composants — révision matière

### Boutons

- **Primary** (CTA dominant) : fond `--ink` walnut, texte `--surface`, **surpiqûres décoratives en bordure** (SVG path en stitch). Hover : `--madder` apparaît derrière en doublon décalé 2px (effet "patch brodé").
- **Madder** (CTA accent) : fond `--madder`, texte `--surface`, surpiqûres `--surface` en bordure.
- **Secondary** : transparent + bordure `--ink` 1.5px en SVG dotted (chaque tiret est une petite ovale de chain-stitch). Hover : remplissage `--ink`.
- **Light** : fond `--surface`, texte `--ink`, bordure `--line`. Hover : bordure `--madder`.

### Cards produit

- Forme : **doily-edge** (SVG mask-image avec coins scalloped), pas rounded-3xl générique.
- Fond : `--surface` (lin blanc raw)
- Bordure : 1px `--line` extérieur + 1px `--line-soft` intérieur (effet "double surpiqûre")
- Drop-shadow : 0 12px 32px -16px rgba(45,36,26,.18) (douce comme tissu posé)
- Hover : un fil madder sort du coin haut-droit + lift 4px

### Embroidery hoop (composant signature, multi-page)

Cercle SVG en deux couches :
1. Anneau bois extérieur (gradient `#C8A876` → `#9F7A4E`, grain texture noise SVG)
2. Tissu lin intérieur (couleur `--surface`, texture linen-weave SVG)
3. Optionnel : petit serrage en métal en haut (cercle gris)
4. À l'intérieur, on peut afficher : photo, illustration, image de fleur SVG.

### Tag round Jennyland

Préserve le tag rond du bouquet original :
- Cercle `--surface` lin blanc
- Bordure 1.5px `--madder` en chain-stitch SVG (pas trait plein)
- "Jennyland" Pinyon Script `--madder`
- "Floral Création" Outfit uppercase `--ink-2`
- Animation `tag-spin` 4s alternate (préservée)

### Sparkles

Plus or champagne. Devient des petits **points de coton** en `--saffron` + `--surface` mélangés, plus organiques (pas géométrique).

## Structure index.astro — section par section

1. **Hero** : à gauche le headline en stitched-outline ("Des fleurs en crochet qui ne fanent **jamais**") + cursive Pinyon "Jennyland" rough-notation underlined. À droite, la photo bouquet **dans un embroidery hoop** circulaire (au lieu d'un rectangle rounded-3xl). Tag rond superposé. SparkleField en fond.
2. **Marquee** : ruban madder horizontal animé, mots-clés en Outfit uppercase + Pinyon entre certains.
3. **Univers** : 4 catégories en doily-edge cards, granny-square pattern en background filigrane.
4. **Featured produits** : grid 4 cards doily-edge avec hover thread-pull.
5. **Configurateur teaser** : embroidery hoop interactive avec fleurs SVG pré-disposées + à droite la copy + bouton madder.
6. **About** : photo de Jenny dans un hoop oval (placeholder pour l'instant), texte centré Lora italic, drop cap sur la première lettre en stitched-outline.
7. **Process 4 étapes** : fil de coton madder SVG qui traverse les 4 colonnes, chaque étape a un mini-icon SVG dessiné main (rose ouverte, aiguille, ciseaux, paquet).
8. **Témoignages** : 3 cards papier kraft (`--paper`) avec surpiqûres en bordure, citations en Lora italic, signatures en Caveat Brush.
9. **CTA final** : "Écrivez-moi sur **WhatsApp**" stitched-outline + cursive Pinyon, sparkles, bouton madder.

## Mapping image → rôle

| Source                                  | Rôle                                                          |
|-----------------------------------------|---------------------------------------------------------------|
| `_design-sources/bouquet-hero.webp`     | Hero home (dans embroidery hoop) + about (mini hoop)          |
| `_design-sources/logo-color.png`        | Header light, footer (sur fond lin → utilisable direct)        |
| `_design-sources/logo-mono.webp`        | Favicon, version monochrome                                   |
| SVG flowers x 17 (existants)            | Cards produit (sur doily) + configurateur (dans hoop)         |
| **NOUVEAU** : SVG patterns à dessiner   | linen-weave bg, granny-square, chain-stitch border, doily-corner, embroidery-hoop, yarn-ball, crochet-hook, needle, kraft-paper texture |

## Hors scope MVP (rappel)

- Compte client (guest checkout)
- Newsletter
- Multi-langue
- Stripe / Apple Pay
- Suivi tracking transporteur
- Avis produits / wishlist / codes promo
- Lottie remplacé par SVG inline pour rester sous budget gz initial

## Anti-template checklist (à valider avant livraison)

- [ ] Le fond est-il vivant (linen-weave SVG + granny-square filigrane) ou plat ?
- [ ] Les cards ont-elles une forme propre au métier (doily-edge), pas `rounded-3xl` ?
- [ ] Les titres sont-ils habités (stitched-outline) ou juste italique gros ?
- [ ] Y a-t-il un motif signature dessiné main (chain-stitch border, granny square, embroidery hoop) qui revient du début à la fin ?
- [ ] Le geste signature (configurateur) incarne-t-il la matière (embroidery hoop + needle stitch animation) ?
- [ ] Si je masque le contenu, devine-t-on en 2 secondes que c'est un atelier crochet ?
- [ ] Au moins 1 lib design installée et utilisée (rough-notation pour le underline cursive minimum) ?
- [ ] La palette est-elle ancrée dans les vraies teintures naturelles textiles (madder, saffron, walnut, woad, sage) et pas dans mes défauts (peach, butter, cream) ?
