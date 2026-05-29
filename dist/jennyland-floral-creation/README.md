# Jennyland Floral Création

> E-commerce sur-mesure pour Jenny, artisane qui crée des fleurs au crochet à la main.
> Hand-built by Menghi Computer Science.

## Stack

| Couche       | Tech                                                              |
|--------------|-------------------------------------------------------------------|
| Frontend     | Astro 5 (SSR) + React 19 (islands) + Tailwind 3.4 + Motion 11    |
| Backend      | Hono 4 (Cloudflare Workers)                                       |
| Database     | Cloudflare D1 (SQLite serverless)                                 |
| Storage      | Cloudflare R2 (images uploadées)                                  |
| Paiement     | PayPal Smart Buttons (compatible PayPal Pro)                      |
| Auth admin   | JWT cookie HttpOnly + PBKDF2-SHA256 (Web Crypto)                  |
| Hébergement  | Cloudflare Pages (web) + Cloudflare Workers (api)                 |

Pas de framework lourd côté backend, pas de bundler côté admin, zéro Node.js en prod.

## Architecture

```
jennyland-floral-creation/
├── _design-sources/        # Logo + photo source (à archiver)
├── design.md               # Direction artistique complète
├── README.md               # Ce fichier
├── web/                    # Astro frontend (Cloudflare Pages)
│   ├── src/
│   │   ├── components/     # Composants .astro
│   │   ├── islands/        # Composants React (interactivité)
│   │   ├── layouts/        # BaseLayout (public) + AdminLayout
│   │   ├── lib/            # api client, cart, format, flower SVGs
│   │   ├── pages/          # Routes (incl. /admin)
│   │   └── styles/         # global.css
│   ├── public/             # Assets statiques (logo, hero, favicon)
│   ├── astro.config.mjs
│   ├── tailwind.config.mjs
│   ├── wrangler.toml       # Bindings env Pages
│   └── package.json
└── api/                    # Hono backend (Cloudflare Worker)
    ├── src/
    │   ├── index.ts        # App + routes mounting
    │   ├── lib/            # auth, crypto, db, env, paypal
    │   ├── routes/         # public, orders, paypal, auth, admin, media
    │   └── db/
    │       ├── schema.sql  # Tables D1
    │       └── seed.sql    # 5 catégories + 10 produits + 20 unitaires + admin user
    ├── wrangler.toml       # Bindings D1 + R2 + secrets
    └── package.json
```

## Démarrage local (5 minutes)

### Prérequis

- Node.js 20+
- npm ou pnpm
- Compte Cloudflare gratuit (pour `wrangler`)
- Compte PayPal Developer (pour le `client_id` sandbox) — facultatif (le SDK marche en mode `sb` test)

### 1. Installer les deps

```bash
cd api && npm install
cd ../web && npm install
```

### 2. Lancer le backend (terminal 1)

```bash
cd api
npm run db:schema       # Crée les tables D1 locales (dans .wrangler/)
npm run db:seed         # Charge le catalogue (10 bouquets + 20 unitaires)
npm run dev             # Démarre wrangler dev sur http://127.0.0.1:8787
```

À la première utilisation, ajoutez aussi un fichier `api/.dev.vars` pour les secrets locaux :

```ini
JWT_SECRET=any-random-string-min-32-chars
PAYPAL_CLIENT_ID=sb
PAYPAL_CLIENT_SECRET=optional-for-sandbox
```

### 3. Lancer le frontend (terminal 2)

```bash
cd web
npm run dev             # Démarre Astro sur http://127.0.0.1:4321
```

### 4. Premier login admin

1. Ouvrir http://127.0.0.1:4321/admin/login
2. Email : `hello@jennyland.fr`
3. Mot de passe : choisissez-le maintenant. Il sera persisté en base au premier login (mécanisme bootstrap).

Une fois loggué, vous pouvez :
- `/admin` — Dashboard (stats, commandes récentes, stocks bas)
- `/admin/produits` — CRUD bouquets + photos
- `/admin/categories` — CRUD catégories
- `/admin/unitaires` — CRUD fleurs/déco unitaires (configurateur)
- `/admin/commandes` — Suivi des commandes
- `/admin/contenu` — Édition des textes du site (hero, à propos, FAQ…)
- `/admin/parametres` — Identité, contact, PayPal, livraison

## Pages publiques

| Route                                   | Description                                      |
|-----------------------------------------|--------------------------------------------------|
| `/`                                     | Home (hero + 4 catégories + 4 produits + about + process + témoignages) |
| `/boutique`                             | Catalogue complet, tri par prix/nom/recommandé   |
| `/boutique/<categorie>`                 | Catalogue filtré par catégorie                   |
| `/boutique/<categorie>/<slug>`          | Fiche produit (story, dimensions, matériaux, ajout panier) |
| `/composer`                             | **Configurateur "Compose ton bouquet"** (geste signature) |
| `/panier`                               | Récap panier détaillé                            |
| `/checkout`                             | Coordonnées + livraison + PayPal                 |
| `/confirmation/<reference>`             | Page merci avec récap de la commande             |
| `/sur-mesure`                           | Demande sur-mesure → CTA WhatsApp                |
| `/a-propos`                             | Histoire de Jenny + valeurs + chiffres atelier   |
| `/contact`                              | WhatsApp / email / Instagram + FAQ               |
| `/livraison-paiement`                   | FAQ logistique                                   |
| `/cgv`, `/mentions-legales`             | Pages légales                                    |
| `/404`                                  | Page introuvable (avec sparkles)                 |

## Le configurateur "Compose ton bouquet"

C'est le geste UI signature du site, l'équivalent du "compas altimétrique" du chalet et du "curseur année" des contes infusés.

**Mécanique** :
1. Panneau gauche — catalogue de fleurs/déco unitaires, filtrable par couleur (peach, blush, ivoire, butter, sauge, rose poudré, or) et type (fleurs, déco).
2. Centre — un cadre rond "vase" avec fond ivoire moiré. Au clic d'un élément du catalogue, il apparaît dans le vase avec :
   - position aléatoire mais bornée (pas de superposition complète)
   - rotation aléatoire ±15°
   - scale 0.78-1.05
   - drop-shadow doux
   - animation d'entrée bounce 0.55s easeOutElastic
3. Panneau droit — liste des éléments ajoutés, total qui s'incrémente, bouton "Ajouter au panier".
4. Toolbar — Annuler (10 derniers), Aléatoire (5 fleurs au hasard), Tout effacer, Télécharger preview PNG.

**Implémentation** : SVG sprites inline (`web/src/lib/flower-svgs.ts`), 17 sprites couvrant rose ouverte, rose bouton, marguerite, calla, tulipe, pivoine, anémone, fleurs sauvages, eucalyptus, fougère, olivier, ruban, perle, gypsophile, étoile, cœur, tag.

Chaque sprite utilise une CSS variable `--petal` pour la couleur principale → facile à recolorer dynamiquement.

## Déploiement Cloudflare

### Backend (api)

```bash
cd api

# 1. Créer les ressources Cloudflare (une fois)
npx wrangler login
npx wrangler d1 create jennyland         # Récupère le database_id, mets-le dans wrangler.toml
npx wrangler r2 bucket create jennyland-media

# 2. Charger le schéma + seed en remote
npx wrangler d1 execute jennyland --remote --file=./src/db/schema.sql
npx wrangler d1 execute jennyland --remote --file=./src/db/seed.sql

# 3. Configurer les secrets
npx wrangler secret put JWT_SECRET
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET

# 4. Déployer
npm run deploy
# → Worker URL : https://jennyland-api.<your-subdomain>.workers.dev
```

### Frontend (web)

```bash
cd web

# 1. Mettre à jour PUBLIC_API_URL dans wrangler.toml avec l'URL du Worker
# 2. Build + deploy
npm run build
npx wrangler pages deploy ./dist --project-name=jennyland
```

Configurer le custom domain (jennyland.fr) dans le dashboard Cloudflare Pages.

## Variables d'environnement

### Frontend (`web/wrangler.toml` → `[vars]`)

| Clé                          | Description                                      |
|------------------------------|--------------------------------------------------|
| `PUBLIC_API_URL`             | URL du Worker Hono (https://jennyland-api...)    |
| `PUBLIC_PAYPAL_CLIENT_ID`    | Client ID PayPal frontend                        |
| `PUBLIC_BRAND_NAME`          | "Jennyland Floral Création"                      |
| `PUBLIC_WHATSAPP`            | +33600000000                                     |
| `PUBLIC_INSTAGRAM`           | jennyland.floral                                 |
| `PUBLIC_EMAIL`               | contact@jennyland.fr                             |

### Backend (Worker secrets via `wrangler secret put`)

| Clé                          | Description                                      |
|------------------------------|--------------------------------------------------|
| `JWT_SECRET`                 | Random 32+ chars pour signer les sessions admin  |
| `PAYPAL_CLIENT_ID`           | PayPal REST API client id                        |
| `PAYPAL_CLIENT_SECRET`       | PayPal REST API client secret                    |

## Modèle de données (D1)

```
categories       — 5 univers (bouquets romantiques, mariage, compositions, déco, fleurs unitaires)
products         — Bouquets/compositions du catalogue (10 produits seedés)
product_images   — Photos par produit (multi)
unit_items      — Fleurs et déco unitaires pour le configurateur (20 seedés)
unit_item_palette — Couleurs de filtre du configurateur (8 couleurs)
orders           — Commandes
order_items      — Lignes de commandes (kind: product | custom_bouquet | unit_item)
content_blocks   — Textes éditables (hero, about, faq…)
settings         — Paramètres clé/valeur (brand, contact, paypal, shipping)
admin_users      — Comptes admin (PBKDF2-SHA256)
admin_sessions   — Sessions JWT (expiry 7 jours)
```

## Sécurité

- **Auth admin** : JWT HS256 (Web Crypto), cookie HttpOnly + Secure en prod
- **Mot de passe admin** : PBKDF2-SHA256, 200k iterations, salt unique par utilisateur
- **CORS** : whitelist explicite via `ALLOWED_ORIGINS`
- **Validation prix** : le backend recalcule le prix de chaque ligne au moment de la création de commande, en lookupant les produits/unitaires en base. Le client ne peut pas tricher.
- **PayPal capture côté serveur** : pas de capture par le frontend, le Worker contacte PayPal en server-to-server avec le client secret

## Améliorations futures (post-MVP)

- [ ] Email transactionnel (confirmation commande, suivi expédition) — Resend ou Cloudflare Email
- [ ] Newsletter (Mailchimp / Buttondown)
- [ ] Compte client (lookup commande par email + reference)
- [ ] Stripe en alternative à PayPal
- [ ] Multi-langue (fr / en) via Astro i18n
- [ ] Sitemap XML auto + robots.txt
- [ ] Avis clients par produit
- [ ] Wishlist
- [ ] Codes promo
- [ ] Suivi UPS / Mondial Relay (API tracking)
- [ ] Page Instagram feed (Instagram Basic Display API)

## Crédits

Conception, design, dev par **Menghi Computer Science** — `menghicomputerscience@gmail.com`.

Direction artistique : `boutique-romantique-artisanale` (custom), inspirée du logo Jennyland (cursive Pinyon Script + main avec fleurs étincelantes) et de la photo bouquet (palette pêche, ivoire, blush, butter, sauge, or).

Toutes les fleurs SVG du configurateur sont dessinées sur-mesure (17 sprites custom). Photo du bouquet hero fournie par la cliente.
