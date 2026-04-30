# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mission

Pour chaque ligne de `clients.csv` (~5085 petits commerces scrapés depuis Google Maps, essentiellement restaurants corses sans site web), l'équipe agentique Claude Code produit, sur-mesure et à la main :

1. Un **rapport de recherche enrichi** (web + CSV)
2. Un **design brief bespoke** (UX + UI + palette + typo + archétype unique)
3. Un **site premium single-file** (Tailwind CDN + Google Fonts + Motion One + Lenis) publié sur **GitHub Pages** sous un repo dédié
4. Un **email de conversion vendeur** en FR avec l'offre Menghi (1500€) et le lien public du site
5. Une **revue qualité** qui gate la livraison

**Positionnement commercial** : Menghi Computer Science = agence tech + créative (web sur-mesure, graphisme, social/marketing, apps/logiciels dédiés).
**Émetteur / contact dans tous les emails :** Anto / Menghi Computer Science / `menghicomputerscience@gmail.com` / `06 43 87 91 14`.

## État au dernier run (2026-04-20)

- **Clients traités & publiés** (10) :
  - `restaurant-glacier-le-flibustier-oevfyznw` (maritime)
  - `le-chalet-llndgrfg` (dashboard-carnet-route, compas altimétrique RN193)
  - `restaurant-l-arriere-cour-lurfms4c` (**refonte 2026-04-20** : rustic-mediterraneen, 12 vraies photos HD, threshold allégé + scrim contraste)
  - `restaurant-u-caradellu-bpl6jwse` (horizon-band time-based)
  - `le-grand-bleu-ecdm5ex0` (magazine-editorial Gault&Millau)
  - `restaurant-u-spuntinu-yvlwnmxg` (timeline-verticale 50 ans)
  - `la-voute-hubyezde` (**refonte 2026-04-20** : `arcade-keystone`, arches SVG structurantes, keystone-reveal)
  - `le-bowling-dbufszwc` (**refonte 2026-04-20** : `scorecard-arcade`, 10 frames, bowling-roll d'ouverture)
  - `le-nautic-gvmjpnec` (**refonte 2026-04-20** : `livre-de-bord`, rose des vents scroll, silhouette citadelle)
  - `s-e-m-corse-bois-energie-zdfkbleu` (rapport-impact-territorial, carte SVG Corse interactive)
- Tous publiés : `https://antocreadev.github.io/menghicomputerscience-<slug>/`
- CSV colonne `site` mise à jour pour les 10 clients
- Emails livrés en **`email.txt`** (texte brut sans markdown) + `email.html` pour chaque client
- **~5075 clients restants** à traiter.

## Architecture

### Équipe agentique (5 sous-agents dans `.claude/agents/`)

| Sous-agent           | Étape         | Modèle  | Responsabilité                                           |
|----------------------|---------------|---------|-----------------------------------------------------------|
| `menghi-researcher`  | 1 (Research)  | sonnet  | Web search + WebFetch + téléchargement images réelles    |
| `menghi-designer`    | 2 (Design)    | opus    | Réflexion UX 7 questions + archétype layout + design brief |
| `menghi-builder`     | 3 (Build)     | opus    | Code HTML/CSS/JS bespoke, unique par client              |
| `menghi-emailer`     | 5 (Email)     | opus    | Copy FR vendeur avec offre mot-pour-mot                  |
| `menghi-reviewer`    | 6 (QA)        | sonnet  | QA gate strict contre `workflows/rules.md`               |

Les sous-agents sont chargés au démarrage de Claude Code. Si tu viens de cloner / redémarre, ils deviennent disponibles via `subagent_type=menghi-<name>`. En fallback, les appeler via `general-purpose` en passant leur fichier `.md` en référence dans le prompt.

### Briefs markdown (`workflows/`)

- `workflows/README.md` — vue d'ensemble
- `workflows/rules.md` — **contraintes globales non-négociables** (à relire à chaque session)
- `workflows/01_research.md` — brief researcher
- `workflows/02_design.md` — brief designer (inclut réflexion UX 7 questions + table d'archétypes)
- `workflows/03_build.md` — brief builder
- `workflows/04_email.md` — brief emailer (structure type + signature)
- `workflows/05_review.md` — checklist QA reviewer
- `workflows/06_publish.md` — étape mécanique (pas d'agent) : git + gh + Pages + CSV update

### Python tools (`tools/`, stdlib uniquement)

| Module              | Rôle                                                                    |
|---------------------|-------------------------------------------------------------------------|
| `paths.py`          | Chemins canoniques (`ROOT`, `CSV_PATH`, `DIST_DIR`, `client_dir(slug)`) |
| `csv_client.py`     | `Client` dataclass + `iter_clients()` / `get_client(index│place_id)`    |
| `slugify.py`        | `slugify(nom, place_id)` → ASCII-fold + suffixe 8 chars du place_id     |
| `progress.py`       | JSON atomique `dist/_progress.json` (`mark`, `next_pending_place_id`, `summary`) |
| `csv_update.py`     | Rewrite atomique de `clients.csv` (`set_site`, `set_field`)             |
| `image_dl.py`       | Download URL → `dist/<slug>/site/assets/images/` (idempotent, stdlib urllib) |
| `publish.py`        | `publish(slug)` → git init/commit + `gh repo create --public` + Pages enable → URL |
| `maps_embed.py`     | iframe `maps.google.com/maps?q=LAT,LNG&output=embed` (pas de clé API)  |
| `web_search.py`     | DuckDuckGo HTML fallback si `WebSearch` natif indisponible              |

Stdlib only. Pas de `requirements.txt`. Pas de venv. Pas de build step. Ajouter une dep (requests/jinja/bs4) **nécessite validation utilisateur**.

## Pipeline par client (séquentiel agent-par-agent, parallélisable entre clients)

```
1. Pick next pending client
2. menghi-researcher     → dist/<slug>/research.md  + images téléchargées dans site/assets/images/
3. menghi-designer       → dist/<slug>/design.md    (archétype UNIQUE, réflexion UX)
4. menghi-builder        → dist/<slug>/site/index.html (bespoke, hand-written)
5. publish(slug)         → repo GitHub public + Pages → pages_url
6. set_site(pid, url)    → mise à jour colonne `site` de clients.csv
7. menghi-emailer        → dist/<slug>/email.txt + email.html (utilise pages_url)
8. menghi-reviewer       → dist/<slug>/review.md (PASS|FAIL)
9. progress.mark(pid, status='done')   si PASS
   sinon relance l'agent visé par la remédiation
```

### Parallélisation en batch

Pour traiter N clients, l'orchestrateur (Claude Code principal) peut paralléliser par étape :
- Stage 1 : N researchers en parallèle (indépendants)
- Stage 2 : N designers en parallèle
- Stage 3 : N builders en parallèle
- Stage 4 : **séquentiel** — publish + set_site (gh rate limit + CSV écriture atomique single-writer)
- Stage 5 : N emailers en parallèle
- Stage 6 : N reviewers en parallèle
- Stage 7 : marquer `done` (séquentiel)

## Commandes essentielles

```bash
# Prochain client pending
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import next_pending_place_id; print(next_pending_place_id())"

# Résumé pipeline
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import summary; print(summary())"

# Récupérer la fiche complète d'un client
python3 -c "import sys; sys.path.insert(0,'.'); from tools.csv_client import get_client; import json; print(json.dumps(get_client(place_id='<PID>').raw, ensure_ascii=False, indent=2))"

# Publier un site déjà construit
python3 -c "import sys; sys.path.insert(0,'.'); from tools.publish import publish; print(publish('<slug>'))"

# Mettre à jour la colonne `site` dans le CSV
python3 -c "import sys; sys.path.insert(0,'.'); from tools.csv_update import set_site; set_site('<PID>', 'https://...')"

# Marquer un client comme done
python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import mark; mark('<PID>', status='done')"

# Ouvrir un site localement
open dist/<slug>/site/index.html

# Ouvrir un site publié
open "https://antocreadev.github.io/menghicomputerscience-<slug>/"
```

## Règles non-négociables (gate par le reviewer)

### Design & UX

- **Layout radicalement unique par client.** Jamais 2 sites avec le même squelette. Archétype choisi parmi : `magazine-editorial`, `carnet-scrapbook`, `bento-grid`, `long-scroll-horizontal`, `split-sticky`, `timeline-verticale`, `fullbleed-photo-first`, `showcase-catalogue`, `scrolljack-sequence`, `asymmetric-collage`, `wordmark-xxl`, `circular-petal`, ou inventé. **Obligation d'inventer au moins UN geste d'UI singulier par site** (compas altimétrique / curseur année / composez-votre-cornet / etc.).
- **Réflexion UX 7 questions obligatoire** avant tout choix visuel (visiteur-type, intention primaire, contrainte structurante, émotion-cible, money shot…) — voir `workflows/02_design.md` section "Réflexion UX obligatoire".
- **Light mode uniquement**, mobile-first, **positif uniquement** (jamais 1★/2★, jamais de comparaison concurrentielle, jamais de négatif implicite).
- Niveau attendu : **Awwwards / FWA / CSS Design Awards**, pas de "template basique".

### Stack site

- HTML5 (`site/index.html`) + `tailwind.css` pré-compilé local. Auto-suffisant, servi en statique sur GitHub Pages.
- **Tailwind PRÉ-COMPILÉ** (jamais le CDN play). Le builder doit :
  1. Écrire `site/tw.config.js` (theme.extend palette + fontFamily du brief) et `site/tw.in.css` (`@tailwind base/components/utilities`).
  2. Compiler : `/tmp/tailwindcss -c site/tw.config.js -i site/tw.in.css -o site/tailwind.css --minify` (binaire standalone, télécharger depuis https://github.com/tailwindlabs/tailwindcss/releases v3.4.17 macos-arm64 si absent).
  3. Référencer `<link rel="stylesheet" href="./tailwind.css"/>` dans `index.html`.
  4. Supprimer `tw.config.js` et `tw.in.css` (artefacts), garder uniquement `tailwind.css`.
  - **Raison** : `cdn.tailwindcss.com` est régulièrement bloqué par les adblockers (Brave, uBlock) → layout cassé, page perçue "vide" / "horrible". Incident 2026-05-01 sur Ile de Beauté.
- **Reveals robustes** : `[data-reveal]{opacity:0}` doit être conditionné par une classe `.js-ready` ajoutée par le module script. Ajouter aussi un `@keyframes autoreveal` CSS qui force opacity:1 après ~0.5s en filet de sécurité si Motion plante. Animation reveal courte (0.4-0.6s, jamais 0.9-1.4s) sinon perçue comme lente.
- **Google Fonts** via `<link rel="preconnect">` + `<link href="...&display=swap">`.
- **Motion One** + **Lenis** en ESM (`import { animate, inView, scroll } from 'https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm'`).
- **Google Maps iframe** sans clé : `https://maps.google.com/maps?q=LAT,LNG&z=15&output=embed`.
- **Aucun build step**, aucun framework avec bundler (React/Vue/Svelte interdits).

### Images

1. **Priorité 1** : `premiere_image` / `thumbnail` CSV (vraies photos Google Maps lh3) — utilisation démo outreach acceptée
2. **Priorité 2** : `og:image` extraits des pages trouvées par recherche web
3. **Priorité 3** : `images.unsplash.com/photo-...` (réel) si cohérent activité ET localisation
4. **Fallback** : `placehold.co/WxH?text=...` (usage minimal)
5. **INTERDIT** : `source.unsplash.com/*` (service mort depuis juin 2024)

**Toute image utilisée dans le HTML doit être téléchargée localement** dans `dist/<slug>/site/assets/images/` via `tools.image_dl.download()`. Le HTML référence uniquement `./assets/images/<fichier>`. **Zéro hotlink externe** dans le site livré (exception tolérée : `placehold.co` placeholder).

### Emails

- Longueur corps : **320–450 mots** (hors bloc offre listée).
- FR uniquement. Ton vendeur-conseil, confiant, chaleureux. Pas marketing-agressif.
- **Personnalisation obligatoire** : ≥ 3 faits spécifiques du client cités.
- **Offre reproduite mot-pour-mot** depuis `workflows/rules.md` (voir ci-dessous).
- **URL GitHub Pages en clair** dans le corps, pas de "[cliquez ici](url)" masqué.
- **Signature obligatoire** dans cet ordre :
  ```
  Anto
  Menghi Computer Science
  menghicomputerscience@gmail.com
  06 43 87 91 14
  ```
  (HTML : lien `mailto:` + lien `tel:+33643879114`).

### Typographie (TOUS livrables client-facing)

- **Em-dash `—` (U+2014) INTERDIT** dans emails (md+html) et textes du site. Substituts : `:` (clarification), `,` (parenthétique), `.` (pause forte), `()` (incise). Le tiret simple `-` reste autorisé.
- Check QA : `grep -c $'\u2014' dist/<slug>/site/index.html  # doit être 0`.

## Offre commerciale (mot-pour-mot)

### Prix : ~~1740€~~ **1500€** tout compris année 1 (0€/mois)

Inclus dans le 1500€ :
- **Site codé main, sur-mesure** (zéro template, tout modifiable)
- **Identité graphique** cohérente (logo, palette, visuels, déclinaisons)
- **Référencement Google (SEO)**, technique + éditorial (balisage, sitemap, structured data)
- **Optimisation performance** (rapide, mobile-first)
- **Indexation & citations par les IA** (ChatGPT, Gemini, Perplexity, Copilot)
- **Hébergement + nom de domaine** gérés par nous
- **Maintenance + support** sous 24h pendant toute l'année 1
- **Aucun abonnement année 1**

### Année 2
- **20€/mois** (maintenance + hébergement)

### Option premium (+10€/mois, soit 30€/mois année 2)
- Agent IA sécurisé connecté à WhatsApp (modif en langage naturel)
- Modifications du site en temps réel
- Sauvegardes automatiques
- Versionning complet (rollback)
- Assistance 24/7

## Persistence de l'état

### `dist/_progress.json`

Source de vérité du pipeline. JSON atomique (tmp + `os.replace`). Clés = `place_id`, valeurs :

```json
{
  "status": "pending | in_progress | done | needs_review",
  "steps_done": ["research", "design", "site", "publish", "email", "review"],
  "slug": "restaurant-glacier-le-flibustier-oevfyznw",
  "pages_url": "https://antocreadev.github.io/menghicomputerscience-...",
  "repo": "antocreadev/menghicomputerscience-...",
  "updated_at": "2026-04-19T22:16:44+00:00",
  "last_error": "optional"
}
```

`next_pending_place_id()` parcourt `clients.csv` dans l'ordre et renvoie le premier `place_id` dont `status != "done"`.

### `clients.csv` colonne `site`

Mise à jour après chaque publish via `tools.csv_update.set_site(place_id, url)`. Rewrite atomique de la CSV entière (5086 lignes, ~5.8 MB). Source de vérité finale pour "quels clients ont un site Menghi".

## Répertoires

```
menghi_computer_science/
├── CLAUDE.md                    # ce fichier
├── clients.csv                  # 5086 lignes (header + 5085 clients)
├── .claude/
│   ├── agents/                  # 5 sous-agents menghi-*
│   │   ├── menghi-researcher.md
│   │   ├── menghi-designer.md
│   │   ├── menghi-builder.md
│   │   ├── menghi-emailer.md
│   │   └── menghi-reviewer.md
│   └── settings.local.json
├── workflows/                   # briefs markdown
│   ├── README.md
│   ├── rules.md                 # contraintes globales
│   ├── 01_research.md
│   ├── 02_design.md             # réflexion UX + archétypes
│   ├── 03_build.md
│   ├── 04_email.md              # signature canonique
│   ├── 05_review.md
│   └── 06_publish.md
├── tools/                       # helpers Python stdlib
│   ├── paths.py
│   ├── csv_client.py
│   ├── csv_update.py
│   ├── slugify.py
│   ├── progress.py
│   ├── image_dl.py
│   ├── publish.py
│   ├── maps_embed.py
│   └── web_search.py
└── dist/                        # sorties, 1 dossier par client
    ├── _progress.json
    └── <slug>/
        ├── research.md
        ├── design.md
        ├── email.txt
        ├── email.html
        ├── review.md
        └── site/                # repo GitHub publié via gh
            ├── .git/
            ├── .gitignore
            ├── index.html
            └── assets/
                └── images/      # photos locales (jamais de hotlink)
```

## Prérequis système

- **Python 3** (stdlib suffit)
- **git** (version ≥ 2.50, SSH configuré pour GitHub)
- **gh CLI** authentifié sur `antocreadev` avec scope `repo` (`gh auth status` pour vérifier)
- macOS/Linux (testé sur macOS Darwin 24.6)

## Boucle d'auto-amélioration (OBLIGATOIRE)

Quand le user signale une erreur, un site cassé, ou corrige une approche, je dois **immédiatement** boucler :

1. Identifier la **root cause** (pas le symptôme).
2. Écrire/mettre à jour un fichier `feedback_*.md` dans `~/.claude/projects/-Users-antocreadev-Developer-menghi-computer-science/memory/` avec : règle, **Why** (incident concret + date + slug), **How to apply** (étapes reproductibles).
3. Ajouter le pointeur dans `MEMORY.md`.
4. Mettre à jour `CLAUDE.md` + le `workflows/<étape>.md` concerné (et `workflows/rules.md` si règle globale).
5. Mettre à jour les briefs des sous-agents `.claude/agents/menghi-*.md` quand pertinent pour qu'ils intègrent la règle dès leur prochain run.
6. Lister les sites/clients à patcher rétroactivement si la règle affecte la prod existante.
7. Si le QA reviewer a fait un faux-positif (PASS sur un site cassé) : renforcer `workflows/05_review.md` avec la nouvelle assertion détectable automatiquement.

**Why:** Sinon je refais la même erreur sur les ~5075 clients restants. Le user paie le coût en revues à la main et perd confiance. Persister chaque leçon = la dette ne s'accumule pas. Cette boucle est non-négociable.

## Leçons apprises (persistées en mémoire)

Tirées des itérations précédentes, toutes persistées dans `~/.claude/projects/-Users-antocreadev-Developer-menghi-computer-science/memory/` :

- `feedback_no_template_gen.md` — Jamais de génération templatée Python. Toujours déléguer à l'équipe agentique.
- `feedback_no_em_dash.md` — Em-dash interdit en client-facing (UI tell IA, FR copy-paste anglophone).
- `feedback_layout_uniqueness.md` — Chaque client doit avoir un layout radicalement différent. Réflexion UX obligatoire.
- `feedback_email_txt_not_md.md` — Emailer livre `email.txt` en texte brut sans markdown, pas `email.md`.
- `feedback_real_photos_priority.md` — Vraies photos Google Maps/TripAdvisor en P1, astuce lh3 `=w2400-h1800-k-no`, TripAdvisor `/photo-o/`, RestaurantGuru `_big`. Rejet Unsplash en hero si photos réelles dispo.
- `feedback_text_on_image_contrast.md` — Scrim permanent + text-shadow + couleurs solides obligatoires dès qu'un texte est posé sur photo.
- `feedback_tailwind_precompile.md` — Tailwind doit être pré-compilé en local (`tailwind.css`), jamais le CDN play (bloqué adblockers). Reveals avec filet de sécurité CSS.
- `feedback_self_improvement.md` — Boucle d'auto-amélioration sur chaque erreur user-signalée (memory + CLAUDE.md + workflows + agents).
- `project_commercial_offer.md`, `project_pipeline_rules.md`, `project_tech_defaults.md`, `project_data_source.md`, `project_overview.md`, `user_profile.md`.

## Techniques éprouvées (raccourcis opérationnels)

Toutes détaillées dans `workflows/rules.md` section "Techniques éprouvées". Résumé :

- **HD images** : toujours resize avant téléchargement. lh3 `=w2400-h1800-k-no`, TripAdvisor `/photo-o/`, RestaurantGuru `_big`. Minimum 1200px en hero.
- **`image_dl.download(url, out_dir, name_hint)`** : le 2ᵉ arg est le chemin complet du dossier (`dist/<slug>/site/assets/images`), pas le slug seul.
- **Builders sandbox-denied sur `git`** : l'orchestrateur exécute `git add/commit/push` depuis `dist/<slug>/site/` après chaque build.
- **Researchers sandbox-denied sur `Bash`** : prendre la liste d'URLs qu'ils remontent et exécuter le script Python groupé depuis l'orchestrateur (plus rapide de toute façon).
- **Contraste texte-sur-image** : scrim permanent + `filter: brightness(.92)` + `text-shadow` + couleurs solides + chips pour infos.
- **Rejet client → refonte** : TaskStop builders en cours, relancer designer avec blacklist d'archétype + consigne "radicalement différent", puis builder.
- **Archétypes brûlés** (ne pas réutiliser tels quels) : liste complète dans `workflows/rules.md`, déjà 14 entrées à 2026-04-20.

## Reprise après pause

Pour continuer la production :

1. Vérifier `gh auth status` (doit être `antocreadev` logged in).
2. `python3 -c "import sys; sys.path.insert(0,'.'); from tools.progress import summary, next_pending_place_id; print(summary()); print('next:', next_pending_place_id())"`.
3. Décider du nombre de clients à traiter dans ce batch (raisonnable : 5-10 pour pouvoir surveiller).
4. Déclencher le pipeline : dis simplement `"prochain batch de N clients"` ou `"traite le client X"` et l'orchestrateur enchaîne les 5 étapes + publish.
5. En cas d'échec sur un client, `progress.json` marque `needs_review` avec `last_error` — analyser puis relancer l'étape concernée.

## Comptes & noms de repo

- GitHub owner : `antocreadev` (compte perso, public)
- Pattern de nommage : `menghicomputerscience-<slug>`, où `<slug> = slugify(nom, place_id)` (suffixe 8 chars du place_id pour unicité)
- GitHub Pages : branche `main`, racine `/`
- URL publique : `https://antocreadev.github.io/menghicomputerscience-<slug>/`
