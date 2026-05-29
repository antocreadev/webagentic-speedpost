# Backend Les Contes Infuses

Backend FastAPI pour la librairie-cafe Les Contes Infuses (Corte). Guest checkout, lookup OTP par email/SMS, compte client optionnel, espace admin, integrations mockees pour Stripe, Mondial Relay et LibriSoft.

## Stack

- Python 3.11+
- FastAPI + Uvicorn
- SQLAlchemy 2.0 (async) + Alembic
- SQLite par defaut (PostgreSQL via `DATABASE_URL`)
- bcrypt + python-jose (JWT HS256, optionnel)
- slowapi (rate limit), reportlab (etiquettes Mondial Relay), httpx
- Pas de Redis : OTP en table avec TTL

## Images

Les modeles `Book`, `Event`, `Boisson`, `Artisan`, `Product` exposent `image_url` (relatif, ex: `/static/images/books/<slug>.jpg`). Le script `scripts/fetch_images.py` telecharge :

- Livres : Open Library Covers via ISBN (fallback Picsum)
- Boissons / cafe : Picsum 600x600 seede par slug
- Evenements : Picsum 1200x800
- Artisans : Picsum 800x800
- Produits : Picsum 800x800

Idempotent : les fichiers deja presents ne sont pas re-telecharges. Sortie sous `backend/static/images/` exposee par FastAPI sur `/static/images/...`.

```bash
make fetch-images
```

## Mocks

- **Stripe** : `app/services/stripe_mock.py` (creation et confirmation d'intent, 95% succes aleatoire)
- **Mondial Relay** : `app/services/mondial_relay.py` (numero de tracking + PDF reportlab + progression simulee)
- **LibriSoft** : `app/services/librisoft.py` (placeholder pour synchro stock future)
- **Email** : `app/services/email.py` ecrit dans `app/_outbox/*.eml` et logge en console

## Setup

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env

python -m app.seed              # cree contes.db et insere donnees demo
python -m scripts.fetch_images  # telecharge ~70 images reelles dans static/images/ (idempotent)
# ou via make :  make seed && make fetch-images
uvicorn app.main:app --reload --port 8000
```

Swagger : http://localhost:8000/docs

Comptes seedes :
- `admin@lescontesinfuses.corsica` / `admin123` (scope admin)
- `client@example.com` / `client123`

## Commandes

| Cible | Action |
|-------|--------|
| `make install` | Cree venv et installe |
| `make dev` | Demarre uvicorn en hot-reload |
| `make seed` | Reset SQLite + seed |
| `make test` | Lance pytest |
| `make migrate` | Genere et applique une migration Alembic |

## Endpoints clefs

Tous prefixes par `/api`.

- `GET /catalog/books?genre=&q=&min_price=&max_price=&sort=` : catalogue livres
- `GET /catalog/cafe`, `/catalog/events`, `/catalog/artisans`
- `POST /orders` : creation commande **guest** (calcule TVA 5,5% livres / 20% autres + livraison)
- `POST /orders/{id}/confirm-payment` : marque payee + decremente stock
- `POST /orders/lookup` puis `POST /orders/lookup/verify` : retrouver ses commandes via OTP envoye par email
- `GET /orders/{id}/tracking?token=...` : timeline + statut Mondial Relay
- `POST /cafe/orders` : click & collect cafe
- `POST /events/{slug}/register` : inscription evenement (sans compte)
- `POST /newsletter/subscribe` (double opt-in)
- `POST /contact`, `POST /giftcards`, `GET /loyalty`, `POST /loyalty/redeem`
- `POST /auth/register`, `/auth/login`, `GET /auth/me` (compte optionnel)
- `GET /account/orders`, `/account/loyalty` (auth)
- `POST /rgpd/export`, `/rgpd/delete`, `GET/POST /rgpd/consents`
- `GET /admin/orders`, `/admin/dashboard/stats`, `POST /admin/orders/{id}/label`, `GET /admin/orders/{id}/label/pdf`
- `POST /webhooks/stripe-mock`, `/webhooks/mondial-relay-mock`

## Tests

```bash
pytest -v
```

## RGPD

Les consentements sont stockes dans la table `consents` (clef `email` ou `session_id`, type, version, IP, user-agent, timestamp). Conservation : 13 mois pour cookies, 3 ans pour newsletter inactive, 5 ans pour donnees de commande (obligation comptable). La suppression de compte anonymise les donnees rattachees aux commandes pour preserver la facturation.

## Branchement realite

Pour passer du mock a la realite :
1. **Stripe** : remplacer `stripe_mock.py` par appels Stripe API. La structure `payment_intent_id` + `client_secret` est deja Stripe-compatible.
2. **Mondial Relay** : implementer le SOAP/REST officiel dans `mondial_relay.py`. Conserver l'interface `generate_label(order)` et `track(tracking_number)`.
3. **LibriSoft** : implementer `LibriSoftClient.sync_stock()` et `push_order()`.
4. **Email** : configurer SMTP via `.env` et brancher fastapi-mail dans `email.py`.
