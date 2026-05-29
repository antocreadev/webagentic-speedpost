# Les Contes Infusés

Librairie & café à Corte (Haute-Corse). Plateforme web complète : site marchand front-office (Astro + React) et back-office d'administration, le tout connecté à une API FastAPI.

> "Lire, infuser, recommencer."

## Périmètre fonctionnel

### Côté client
- Catalogue livres (24 titres) avec filtres par genre et recherche
- Carte café (24 boissons et desserts)
- Calendrier d'événements et inscription en ligne
- Sélection d'artisans corses
- Click & collect pour boissons et plats
- Tunnel de commande sans création de compte (guest checkout)
- Suivi de commande par email ou téléphone (OTP)
- Compte client optionnel avec préférences, RGPD, historique
- Newsletter, contact, cartes cadeaux, programme fidélité

### Côté administrateur
- Tableau de bord avec KPI temps réel (commandes, CA, inscriptions, alertes stock)
- Gestion des commandes (statuts, étiquettes Mondial Relay PDF, file d'expédition)
- Gestion du catalogue (livres, café, artisans) avec création et stock
- Gestion des événements et inscriptions
- Base clients avec consultation détaillée
- Synchronisation stock LibriSoft (interface prête, intégration en attente)

## Stack technique

| Couche | Technologies |
|---|---|
| **Frontend** | Astro 5 (hybrid SSR), React 19 islands, Tailwind 3.4, TypeScript strict |
| **Animations** | Motion One, Astro View Transitions API |
| **HTTP** | ky 2.x, jose (JWT decode) |
| **Icônes** | Lucide React + 30+ ornements SVG sépia gravure XIXᵉ custom |
| **Backend** | FastAPI, SQLAlchemy 2.0 (async), Pydantic v2 |
| **Base de données** | SQLite (dev), prêt PostgreSQL (`DATABASE_URL`) |
| **Auth** | JWT HS256 7 jours, bcrypt, OTP 6 chiffres pour guest lookup |
| **Documents** | reportlab (étiquettes Mondial Relay PDF) |
| **Tests** | pytest + httpx AsyncClient |

## Architecture

```
lescontesinfuses-corte/
├── src/                          # Frontend Astro
│   ├── pages/                    # ~50 routes (public, compte, admin, légal)
│   ├── components/
│   │   ├── icons/                # SVG ornements sépia
│   │   ├── cards/                # BookCard 3D, EventCard, ProductCard, BoissonCard
│   │   ├── form/                 # 8 composants form premium
│   │   ├── empty/                # 6 empty states ornementés
│   │   ├── skeleton/             # 5 skeletons shimmer
│   │   ├── mobile/               # BottomNav, CartDrawer swipe, MobileGallery
│   │   └── islands/              # React islands (interactivité)
│   │       └── admin/            # 10 islands admin (dashboard, tables, slide-overs)
│   ├── layouts/                  # BaseLayout, AdminLayout
│   ├── lib/                      # api.ts, auth.ts, cart.ts, format.ts, img.ts
│   ├── data/                     # journal.ts (articles éditoriaux)
│   ├── styles/                   # global.css (palette + curseurs sépia + transitions)
│   └── scripts/                  # reveals.ts, scroll-effects.ts
├── backend/                      # FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py           # SQLAlchemy async engine
│   │   ├── security.py           # bcrypt + JWT
│   │   ├── seed.py               # Initialisation des données
│   │   ├── models/               # 9 modèles (catalog, orders, customer, ...)
│   │   ├── schemas/              # Pydantic
│   │   ├── routers/              # 14 routeurs (catalog, orders, auth, admin, ...)
│   │   └── services/             # email, otp, mondial_relay, stripe_mock, librisoft
│   ├── scripts/
│   │   └── fetch_images.py       # Télécharge ~70 images réelles (Open Library, Picsum)
│   ├── static/                   # Images servies (généré par fetch_images)
│   ├── tests/                    # pytest
│   ├── alembic/                  # Migrations
│   ├── pyproject.toml
│   └── Makefile
├── public/                       # Assets statiques frontend
├── astro.config.mjs              # output: "static" + adapter Node standalone
├── tailwind.config.mjs           # Palette cocoa + cream + terracotta + sage + plum
├── tsconfig.json
└── package.json
```

## Direction artistique

Univers librairie-café romantique : gravure sépia XIXᵉ associée à des illustrations flat contemporaines.

- **Palette** : cream `#FBF6E9`, cocoa-600 `#4A2D1F`, terracotta-400 `#C77A4F`, sage-400 `#8A9876`, plum-400 `#8E6C90`
- **Typographies** : Cormorant Garamond (display italique), Lora (corps), Cormorant SC (eyebrows), Inter (UI), Pinyon Script (touches manuscrites)
- **Geste UI signature** : 11 curseurs SVG contextuels (tasse fumante, livre ouvert, gobelet café, calendrier, plume d'oie, cœur, flèche, I-beam ornementé, chevron select, resize, disabled, grab) qui changent selon l'élément survolé
- **Transitions** : View Transitions API entre pages, parallax lerp, scene-pin, magnet, badge chapitre romain, splash loader première visite, marque-page persistant terracotta avec ripple

## Démarrage local

### Prérequis
- Node.js 20+
- Python 3.11+

### Backend FastAPI

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Initialiser la base et les seeds
python -m app.seed

# Télécharger les images (Open Library + Picsum, ~70 fichiers, idempotent)
python -m scripts.fetch_images

# Lancer le serveur
uvicorn app.main:app --reload --port 8000
```

API disponible sur `http://localhost:8000`. Documentation Swagger auto sur `/docs`.

### Frontend Astro

```bash
# Depuis la racine du projet
npm install
npm run dev          # http://localhost:4321
```

Build de production :
```bash
npm run build
npm run preview
```

## Comptes seed

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | `admin@lescontesinfuses.corsica` | `admin123` |
| Client | `client@example.com` | `client123` |

## Variables d'environnement

### Frontend (`.env` à la racine)

```bash
PUBLIC_API_URL=http://localhost:8000/api
PUBLIC_API_BASE=http://localhost:8000
```

### Backend (`backend/.env`, optionnel, voir `backend/.env.example`)

```bash
DATABASE_URL=sqlite+aiosqlite:///./contes.db
JWT_SECRET=change-me-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_DAYS=7
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=contact@lescontesinfuses.corsica
ADMIN_EMAIL=admin@lescontesinfuses.corsica
CORS_ORIGINS=http://localhost:4321,https://lescontesinfuses.corsica
APP_ENV=development
SHIPPING_MONDIAL_RELAY_PRICE_CENTS=490
SHIPPING_HOME_PRICE_CENTS=790
TVA_BOOK=5.5
TVA_OTHER=20.0
```

## Endpoints API (préfixe `/api`)

Documentation interactive complète sur `http://localhost:8000/docs`. Aperçu :

| Domaine | Endpoints clés |
|---|---|
| Catalog | `GET /catalog/books`, `/catalog/genres`, `/catalog/events`, `/catalog/cafe`, `/catalog/artisans` |
| Search | `GET /search?q=&types=` |
| Orders (guest) | `POST /orders`, `POST /orders/{id}/confirm-payment`, `GET /orders/{id}?token=`, `GET /orders/{id}/tracking?token=` |
| Lookup OTP | `POST /orders/lookup`, `POST /orders/lookup/verify` |
| Café C&C | `POST /cafe/orders` |
| Events | `POST /events/{slug}/register`, `GET /events/{slug}/seats` |
| Auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `PATCH /auth/me`, `POST /auth/forgot`, `POST /auth/reset` |
| Account | `GET /account/orders`, `GET /account/loyalty`, `GET /account/preferences`, `PATCH /account/preferences` |
| Newsletter | `POST /newsletter/subscribe`, `POST /newsletter/confirm`, `POST /newsletter/unsubscribe` |
| Contact | `POST /contact` |
| Gift cards | `POST /giftcards`, `GET /giftcards/{code}/balance`, `POST /giftcards/{code}/apply` |
| Loyalty | `GET /loyalty?email=`, `POST /loyalty/redeem` |
| RGPD | `POST /rgpd/export`, `POST /rgpd/delete`, `GET /rgpd/consents`, `POST /rgpd/consents` |
| Admin (scope `admin`) | `GET /admin/dashboard/stats`, `/admin/orders`, `/admin/orders/{id}/label`, `/admin/products`, `/admin/customers`, `/admin/stocks`, `/admin/sync-librisoft` |

## Intégrations mock

Quatre intégrations externes sont volontairement mockées en local pour permettre un développement entièrement offline :

| Service | Fichier | Statut |
|---|---|---|
| **Stripe** | `backend/app/services/stripe_mock.py` | Génère un payment intent fictif, succès aléatoire 95%. Brancher sur la vraie API Stripe avec une clé secrète. |
| **PayPal** | redirect mock dans le checkout | Boutons SDK à intégrer. |
| **Mondial Relay** | `backend/app/services/mondial_relay.py` | Génère tracking number `MR-{year}-{6 random}` + PDF reportlab. Statut progresse selon le temps écoulé. À remplacer par les WebServices Mondial Relay. |
| **LibriSoft** | `backend/app/services/librisoft.py` | Placeholder. Format prévu : export CSV horaire ou API REST. |

## Tests

```bash
cd backend
pytest                    # Suite complète (catalog, orders, auth, admin)
```

## Conformité

- **RGPD** : consentements stockés (cookies analytics, marketing, newsletter), export ZIP des données utilisateur, suppression de compte avec double confirmation
- **Accessibilité** : focus rings, hiérarchie sémantique, alt sur toutes les images, `prefers-reduced-motion` respecté sur toutes les animations
- **Mobile-first** : testé à 360px, BottomNav 5 onglets, drawer panier swipe, sticky CTA contextuels
- **Print** : feuille de style dédiée pour impression admin (étiquettes, CGV)

## Conventions d'écriture

- Pas d'em-dash U+2014 dans les textes client (utiliser `:`, `,`, `.`, `()`)
- Tous les composants Astro `.astro` par défaut, React `.tsx` uniquement pour interactivité (état, hooks)
- Tailwind classes only, utilitaires custom dans `@layer components` de `global.css`
- Imports via alias `@/` (configuré dans `tsconfig.json`)
- Lucide pour les icônes fonctionnelles, SVG custom dans `src/components/icons/`

## Licence

Tous droits réservés Les Contes Infusés. Code source confidentiel à usage interne.

## Crédits

Conception et développement : équipe Menghi Computer Science.
Illustrations propriétaires sépia. Photos d'ouvrages : Open Library Covers API. Photos d'ambiance : Picsum (placeholders éditoriaux à remplacer en production).
