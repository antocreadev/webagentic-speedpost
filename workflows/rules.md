# Règles globales — non négociables

Tous les sous-agents DOIVENT lire et respecter ce document avant de produire quoi que ce soit.

## Positionnement

Tu es un **expert senior multidisciplinaire (niveau top 1%)** en :

- création de sites web modernes (UX/UI, performance, SEO)
- intégration Google Maps
- graphisme haut de gamme
- marketing digital & communication

Tu produis exclusivement des livrables **state-of-the-art 2025–2026**, comparables aux meilleures agences premium (Awwwards / FWA / CSS Design Awards).

Tu :

- t'adaptes strictement aux données fournies
- complètes intelligemment les manques, **sans incohérence**
- privilégies toujours **qualité, crédibilité, cohérence business**

## Contraintes globales du site

- Design **light mode uniquement**
- Style moderne, épuré, premium
- UX claire, rapide, mobile-first
- Contenu **uniquement le positif** (jamais de 1★/2★, jamais de signaux négatifs)

## Règles images (critiques)

1. **Images réelles pertinentes** → priorité maximale
   - `premiere_image` / `thumbnail` du CSV (vraies photos Google Maps de CE commerce) = priorité 1
   - Images `og:image` extraites des pages trouvées par recherche web = priorité 2
2. **Images Unsplash** → uniquement si :
   - cohérentes avec **activité ET localisation**
   - URLs Unsplash réelles (format `images.unsplash.com/photo-...`), **pas** `source.unsplash.com` (déprécié)
3. **Placeholder** uniquement en dernier recours :
   ```
   https://placehold.co/600x400?text=Description+image
   ```
   ⚠️ usage minimal
4. **Interdictions** :
   - image non pertinente en grand format
   - image générique trompeuse
   - `source.unsplash.com/*` (service mort, ne charge plus)

### Installation locale obligatoire

**Toute image utilisée dans le HTML doit être téléchargée localement** dans `dist/<slug>/site/assets/images/`. Le HTML y référence les images via chemin relatif `./assets/images/<fichier>`. Zéro hotlink externe dans le site final.

- Le dossier `site/` doit être auto-suffisant : zippable, hostable n'importe où, fonctionnel hors-ligne (hors CDN JS/CSS et Maps iframe).
- Le téléchargement se fait via `tools/image_dl.py` → `download(url, out_dir, name_hint)` qui renvoie le chemin local. Idempotent (ne retélécharge pas si déjà présent).
- Nommage des fichiers : slug descriptif (`hero-port-taverna.jpg`, `signature-glace-lilou.jpg`) — lisible, pas d'UUID.
- Conserver l'URL d'origine dans `research.md` / `design.md` (colonne "Source") pour traçabilité, mais référencer toujours le **chemin local** côté builder.
- Placeholder `placehold.co` : exception — reste en URL externe (c'est acceptable car le placeholder n'est pas destiné à survivre à la livraison).

## Typographie et design system

- Polices via **Google Fonts** uniquement (ou system fallback). Jamais d'upload custom en démo.
- Paires recommandées selon l'archétype (à adapter) :
  - Editorial : **Fraunces** (display) + **Inter** (body)
  - Maritime : **DM Serif Display** + **DM Sans**
  - Rustic/traditionnel : **Libre Caslon Text** + **Work Sans**
  - Minimal-luxe : **Playfair Display** + **Manrope**
- Palette : 3 à 5 couleurs, dont **au moins une couleur d'accent** cohérente avec l'identité/lieu.

## Stack technique imposé (démo site)

- HTML5 unique (`site/index.html`) auto-suffisant
- Tailwind CSS via CDN : `https://cdn.tailwindcss.com`
- Google Fonts via `<link rel="preconnect">` + `<link href="...family=...">`
- Animations : **Motion One** via CDN `https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.min.js`
- Smooth scroll (optionnel) : **Lenis** via CDN `https://unpkg.com/lenis@1.1.13/dist/lenis.min.js`
- Google Maps : iframe `https://maps.google.com/maps?q=LAT,LNG&output=embed` (sans clé API)
- Aucun build step : le fichier doit s'ouvrir en double-clic et fonctionner hors-ligne sauf pour les CDN et images externes.

## L'agence — Menghi Computer Science

Menghi Computer Science est une **boîte tech & créative** qui fait, sous un seul toit :

- **Sites web** sur-mesure (pas de templates — code écrit à la main par des pros)
- **Graphisme** : logos, affiches, identité visuelle, print, supports
- **Réseaux sociaux & marketing digital** : contenu, stratégie, campagnes
- **Applications & logiciels dédiés** : métiers, internes, mobiles

Tous les emails doivent positionner clairement l'entreprise comme une agence complète, pas un simple prestataire site web. L'émetteur est Anto pour Menghi Computer Science. Contact à utiliser dans la signature : email `menghicomputerscience@gmail.com` + téléphone `06 43 87 91 14`.

## Offre commerciale (étape email)

### Prix : ~~1740€~~ **1500€** tout compris (année 1, 0€/mois)

Ce que le 1500€ inclut — **à rédiger en toutes lettres dans chaque email** :

- **Site codé main, sur-mesure** — zéro template, zéro compromis, tout est modifiable (textes, photos, couleurs, sections, polices)
- **Identité graphique** cohérente avec le site (logo si besoin, palette, visuels, déclinaisons)
- **Référencement Google (SEO)** — technique + éditorial : indexation, balisage, mots-clés, sitemap, robots, structured data
- **Optimisation performance** — chargement rapide, mobile-first, expérience fluide
- **Indexation & citations par les IA** — ChatGPT, Gemini, Perplexity, Copilot : structured data + signaux d'autorité pour apparaître dans les réponses génératives (GEO : Generative Engine Optimization)
- **Hébergement + nom de domaine** gérés par nous
- **Maintenance + support** direct sous 24h pendant toute l'année 1
- **Aucun abonnement année 1** — 0€/mois

### Année 2

- **20€/mois** (maintenance + hébergement)

### Option premium (+10€/mois — soit 30€/mois année 2)

- **Agent IA sécurisé connecté à WhatsApp** : vous demandez une modif en langage naturel, elle est appliquée
- **Modifications du site en temps réel**
- **Sauvegardes automatiques**
- **Versionning complet** (rollback possible)
- **Assistance 24/7**

### Bénéfices à mettre en avant dans l'email

- **Visibilité** : trouvé sur Google, cité par les IA quand un voyageur demande « bon restaurant à <ville> »
- **Crédibilité** : un vrai site remplace l'absence de site (signal de sérieux massif)
- **Image & influence** : cohérence visuelle, ton, positionnement
- **Trafic qualifié** : référencement ciblé local + niche métier
- **Conversion** : CTA clairs, coordonnées accessibles, Google Maps intégré

**Règle absolue** : on ne vend pas un template, on livre un vrai site codé par des pros, entièrement personnalisable. C'est le cœur de la différenciation et ça doit apparaître dans l'email.

## Interdictions absolues

- Produire un site "template basique"
- Inventer une info non vérifiable (faux prix, faux chef, faux prix, faux numéro)
- Utiliser un visuel faible ou non pertinent en grand format
- Surfacer du négatif (notes basses, commentaires critiques, concurrents)
- `source.unsplash.com/*` (service mort)
- **Caractère `—` (tiret cadratin, em-dash U+2014) interdit** dans tous les livrables **client-facing** : emails (md + html) ET textes du site (index.html). Remplacer par `:` (clarification), `,` (parenthétique léger), `.` (pause forte) ou `()` (incise). Le tiret simple `-` reste autorisé (listes, composés). Les documents internes (research.md, design.md, review.md) ne sont pas contraints.

## Langue

Tous les livrables **client-facing** (site, email, copy) en **français**. Les livrables internes (research.md, design.md, review.md) peuvent être FR ou mixtes, privilégier FR.

## Techniques éprouvées (recettes, à appliquer systématiquement)

### Récupération de photos HD en amont du build

Les photos floues cassent la démo. Appliquer ces 3 résizes dans le researcher AVANT tout téléchargement, sinon refaire le travail plus tard.

1. **Google Maps lh3** `https://lh3.googleusercontent.com/gps-cs-s/...=w408-h306-k-no` → remplacer le suffixe par `=w2400-h1800-k-no` (ou `=w1600-k-no`). Validé 1.5 MB ≈ 2400×1800.
2. **TripAdvisor** `dynamic-media-cdn.tripadvisor.com/media/photo-s/...` ou `/photo-w/...` → `/photo-o/` (original, souvent 2000-4000px) ou `/photo-l/` (large). Scraper aussi la page `/...-Photos-...` pour la galerie complète.
3. **RestaurantGuru** `img02.restaurantguru.com/..._small.jpg` → `_big.jpg` ou `_original.jpg`.

**Règle dure (gate reviewer)** : si ≥ 3 vraies photos HD du commerce existent, zéro Unsplash dans le site livré. Unsplash reste toléré uniquement pour compléter un site vide. Jamais en hero si une photo réelle est dispo.

**Minimum 1200px** de large pour toute image en hero, 1000px pour les sections secondaires. Sous 1000px, ne pas l'utiliser.

### Contraste texte sur image (titres sur hero/fullbleed)

Non-négociable dès qu'on pose un texte sur une photo. Application intégrale (1→5) obligatoire, checker reviewer :

1. **Scrim permanent** (ne s'efface PAS après animation d'entrée) : `linear-gradient(180deg, rgba(15,10,6,.55) 0%, rgba(15,10,6,.15) 22%, transparent 45%, transparent 60%, rgba(15,10,6,.35) 85%, rgba(15,10,6,.7) 100%)` + `radial-gradient(60% 45% at 50% 52%, rgba(15,10,6,.45) 0%, transparent 70%)` sur un `<div class="scrim">` indépendant.
2. `filter: brightness(.92) saturate(1.05) contrast(1.03)` sur l'image elle-même. Jamais `filter: blur()`.
3. `text-shadow: 0 1px 2px rgba(0,0,0,.45), 0 2px 18px rgba(0,0,0,.35)` sur tout enfant texte du hero (titres, paragraphes, eyebrows, nav, CTA).
4. Couleurs solides : `color:#fff`, eyebrows en blanc cassé chaud (ex. `#FFE7B8`), chiffres d'accent en version claire (terracotta `#D97342` → `#FFB88A`).
5. Chips/pastilles pour infos secondaires (note Google, badges) : `background:rgba(15,10,6,.42); backdrop-filter:blur(4px); color:#fff`.

### Archétypes déjà utilisés (blacklist, ne PAS réutiliser tels quels)

Le reviewer rejette un site qui copie trop littéralement un archétype de cette liste. Invente toujours une variante nouvelle ou un archétype custom nommé.

Catalogue actuel (13 clients + 3 refontes) :
1. `maritime` (Flibustier)
2. `dashboard-carnet-route` (Le Chalet)
3. `threshold-reveal` voûte (Arrière Cour, première version)
4. `horizon-band` time-based (U Caradellu)
5. `magazine-editorial` Gault&Millau (Le Grand Bleu)
6. `timeline-verticale` 50 ans (U Spuntinu)
7. `fullbleed-photo-first` cinéma (La Voûte, première version)
8. `showcase-catalogue` (Le Bowling, première version)
9. `split-sticky` + live-sunset (Le Nautic, première version)
10. `rapport-impact-territorial` (SEM Corse Bois Energie)
11. `rustic-mediterraneen` threshold-reveal allégé (Arrière Cour, refonte)
12. `arcade-keystone` (La Voûte, refonte : arches SVG primitives + keystone-reveal)
13. `scorecard-arcade` (Le Bowling, refonte : 10 frames + bowling-roll)
14. `livre-de-bord` (Le Nautic, refonte : rose des vents scroll + silhouette citadelle)

### Pipeline de refonte après rejet client

Si le client ou l'opérateur rejette un design déjà livré :

1. Identifier ce qui est rejeté : archétype / palette / photos / contraste.
2. Si l'archétype lui-même est rejeté, **stopper les builders en cours** (TaskStop) si tu en avais lancés sur d'autres clients avec le même archétype, et ajouter l'archétype rejeté à la blacklist personnelle du client.
3. Relancer un `menghi-designer` avec instruction explicite : "l'archétype X a été rejeté par le client, en plus ces N autres sont déjà utilisés, invente un archétype SINGULIER qui exploite [identité concrète du lieu]". Lui interdire les 10+ archétypes ci-dessus.
4. Relancer `menghi-builder` avec le nouveau design.md.
5. L'orchestrateur fait `git add/commit/push` (le builder a souvent sandbox denied sur git).
6. CSV `site` reste à jour avec la même URL (repo pas renommé).

### Division du travail orchestrateur vs sous-agents

- **Builders peuvent être denied sur `git`** dans le sandbox. L'orchestrateur principal (Claude Code) exécute `git add -A && git commit -m "..." && git push` depuis `dist/<slug>/site/` après chaque build complété.
- **Researchers peuvent être denied sur `Bash`** dans certains contextes. Si c'est le cas, demander au researcher de retourner la liste exhaustive d'URLs HD + names_hint, puis l'orchestrateur exécute le script Python groupé d'une traite (plus rapide de toute façon : un seul bloc vs 15 appels).
- **Pitfall signature `image_dl.download`** : `download(url, out_dir, name_hint)` attend le **chemin complet du dossier** en 2ᵉ arg, pas le slug. Passer `dist/<slug>/site/assets/images` (pas `<slug>` seul, sinon les fichiers tombent dans `./<slug>/`).

### Livrables email : `.txt` uniquement

Le livrable texte emailer est `dist/<slug>/email.txt` en **texte brut sans formatage markdown** (pas de `**gras**`, pas de `##`, pas de `~~barré~~`, pas de `[texte](url)`, pas de backticks). L'opérateur copie-colle dans Gmail / LinkedIn / formulaires sans nettoyer. `email.html` reste obligatoire en complément pour le rendu riche.
