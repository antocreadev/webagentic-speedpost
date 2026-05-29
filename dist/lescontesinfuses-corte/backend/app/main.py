from __future__ import annotations
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from .config import settings
from .database import init_db
from .routers import (
    catalog, search, orders, cafe_orders, events, newsletter, contact,
    giftcards, auth, account, loyalty, rgpd, admin, webhooks,
)

limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Les Contes Infuses API",
    description="Backend de la librairie-cafe Les Contes Infuses (Corte). Guest checkout + compte optionnel + admin.",
    version="0.1.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RateLimitExceeded)
async def _ratelimit_handler(request, exc):
    from fastapi.responses import JSONResponse
    return JSONResponse(status_code=429, content={"detail": "Trop de requetes, ralentissez."})


STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
STATIC_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/")
async def root():
    return {"app": "Les Contes Infuses API", "version": "0.1.0", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}


API_PREFIX = "/api"
for r in (catalog.router, search.router, orders.router, cafe_orders.router, events.router,
          newsletter.router, contact.router, giftcards.router, auth.router, account.router,
          loyalty.router, rgpd.router, admin.router, webhooks.router):
    app.include_router(r, prefix=API_PREFIX)
