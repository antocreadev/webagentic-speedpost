# Brief — Étape 3 : Construction du site

**Agent :** `menghi-builder`
**Livrable :** `dist/<slug>/site/index.html`
**Pré-requis :** lire `workflows/rules.md`, lire `dist/<slug>/research.md`, lire `dist/<slug>/design.md`

## Objectif

Coder à la main un site **bespoke, single-file, state-of-the-art 2025-2026** qui respecte strictement le design brief. Pas de template. Le rendu doit être digne d'Awwwards.

## Stack obligatoire

- HTML5, un seul fichier `index.html` (CSS et JS inline ou via CDN)
- **Tailwind CDN** (JIT, via `<script src="https://cdn.tailwindcss.com"></script>`)
- **Google Fonts** (chargement via `<link rel="preconnect">` + `<link href="...">`)
- **Motion One** (`https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.min.js`)
- **Lenis** smooth scroll (`https://unpkg.com/lenis@1.1.13/dist/lenis.min.js`)
- Palette : injecter les hex du brief en CSS variables + via `tailwind.config` inline

## Structure du document

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title><Nom> — <Ville></title>
  <meta name="description" content="<résumé 150-155 chars extrait du brief>"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=<Display>:wght@...&family=<Body>:wght@...&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { bg:'#...', ink:'#...', 'ink-2':'#...', accent:'#...', line:'#...' },
          fontFamily: { display:['<Display>','serif'], sans:['<Body>','system-ui'] },
        }
      }
    }
  </script>
  <style>
    :root { --bg:#...; --ink:#...; --ink-2:#...; --accent:#...; --line:#...; }
    html,body{background:var(--bg);color:var(--ink);}
    body{font-family:'<Body>',system-ui,sans-serif;}
    .font-display{font-family:'<Display>',serif;}
    .marquee{animation:marquee 30s linear infinite;}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    [data-reveal]{opacity:0;transform:translateY(20px);}
  </style>
</head>
<body class="antialiased">
  <!--
    STRUCTURE À COMPOSER D'APRÈS `design.md`.
    Chaque client a un archétype de layout distinct — `magazine-editorial`,
    `carnet-scrapbook`, `bento-grid`, `split-sticky`, `timeline-verticale`,
    `fullbleed-photo-first`, `showcase-catalogue`, `scrolljack-sequence`,
    `asymmetric-collage`, `wordmark-xxl`, `circular-petal`, etc.
    Ne JAMAIS cloner la disposition d'un autre client. Ne pas forcer 9 sections.
  -->
  <main>...</main>
  <footer>...</footer>

  <script type="module">
    import { animate, inView, scroll } from 'https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm';
    import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/+esm';

    const lenis = new Lenis();
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf);

    inView('[data-reveal]', el => {
      animate(el, { opacity:[0,1], transform:['translateY(20px)','translateY(0)'] },
              { duration:0.8, easing:[0.2,0.7,0.2,1] });
    });

    const hero = document.querySelector('#hero-image');
    if (hero) scroll(animate(hero, { transform:['translateY(0)','translateY(-10%)'] }),
                      { target: hero, offset:['start end','end start'] });
  </script>
</body>
</html>
```

> Cet exemple est une **ossature**, pas un rendu final. Chaque section doit être composée avec les classes Tailwind adaptées au brief (grilles, spacings, typographies, contrastes).

## Règles d'exécution

1. **Toujours lire `design.md` en premier** : toutes les décisions s'y trouvent. Ne jamais ré-inventer une couleur ou une typo.
2. **Assigner `data-reveal`** à tous les blocs qui doivent apparaître au scroll (titres de section, paragraphes, cartes).
3. **Hero image** : balise `<img id="hero-image">` avec le `src` du brief (toujours un **chemin local relatif** `./assets/images/...`), `loading="eager"`, `fetchpriority="high"`, `alt` du brief, objet-cover, aspect 4:5 mobile + 3:4 desktop.
4. **Marquee (si le brief le prévoit)** : duplicate le contenu (`<div class="marquee flex gap-10 whitespace-nowrap">` × 2) pour boucle sans couture. Si le brief ne prévoit PAS de marquee, ne pas en ajouter un.
5. **Galerie (si le brief la prévoit)** : la forme suit l'archétype (masonry, diagonale, stack vertical, strip horizontale, carousel, grille dense, etc.), pas toujours une grille 3×2 standard. Si le brief n'inclut pas de section galerie (ex. `wordmark-xxl` radical), ne pas en ajouter.
6. **Maps** : iframe avec `loading="lazy"`, `style="border:0;border-radius:16px"`, `src` construit avec `lat,lng` du client, zoom 15.
7. **CTA** : au moins 2 dans le hero + 1 dans `infos`. Ancrer `#infos` sur le bouton principal.
8. **Mobile-first** : tester mentalement à 360px de large avant le desktop. Aucune section ne doit déborder.
9. **Accessibilité** : contraste AA minimum, `<h1>` unique, hiérarchie `h2`/`h3` respectée, `alt` descriptif sur toutes les images.
10. **Poids visuel** : ne pas empiler les effets. Un seul effet "signature" par section max.

## Interdictions

- Importer un framework qui nécessite un build (React, Vue, Svelte…).
- Inline base64 des images.
- **Hotlink externe** dans le HTML, toute image doit être locale (`./assets/images/...`). Seule exception tolérée : `placehold.co` pour les placeholders.
- Utiliser une image Unsplash si un visuel réel priorité 1 existe pour ce rôle.
- Mentionner la pire note, un commentaire négatif, ou un concurrent.
- Ajouter des sections non prévues dans le brief.
- Dupliquer un asset sur plusieurs rôles incompatibles.
- **Caractère `—` (tiret cadratin U+2014) interdit** dans les textes visibles du site. Utiliser `:`, `,`, `.` ou `()` selon le contexte. Le tiret simple `-` reste autorisé.

## Avant de rendre — vérification hotlink

```bash
# Aucune URL d'image externe hors CDN JS/CSS et Google Maps iframe
grep -nE 'src="https?://(lh3\.googleusercontent\.com|images\.unsplash\.com|.*\.tourinsoft\.eu|tripadvisor|restaurantguru)' dist/<slug>/site/index.html
# Doit retourner 0 ligne. Si ≥ 1 → télécharger l'image et remplacer par ./assets/images/...
```

## Livraison

- Écrire `dist/<slug>/site/index.html`.
- Ouvrir localement (`open dist/<slug>/site/index.html`) uniquement si l'orchestrateur le demande — sinon signaler le chemin.
- Retourner ≤ 8 lignes : archétype implémenté, nombre de sections, nombre d'images utilisées, éventuelles dettes (ex. "gallery 5/6 images réelles, 1 Unsplash cohérent").
