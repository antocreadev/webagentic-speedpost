"""Fetch real free images for seeded entities, save under backend/static/images/<type>/<slug>.jpg
and persist the relative path in <model>.image_url.

Run from backend/:  python -m scripts.fetch_images
Idempotent: skips download if file already exists, but always re-checks DB for image_url.
"""
from __future__ import annotations
import asyncio
from pathlib import Path
from typing import Iterable, Optional

import httpx
from sqlalchemy import select

from app.database import AsyncSessionLocal, init_db
from app.models.catalog import Book, Event, Boisson, Artisan, Product

ROOT = Path(__file__).resolve().parent.parent
STATIC_DIR = ROOT / "static"
IMAGES_DIR = STATIC_DIR / "images"
TIMEOUT = httpx.Timeout(10.0, connect=10.0)
SEMAPHORE = asyncio.Semaphore(10)
RETRIES = 2


def _ensure(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _picsum(seed: str, w: int, h: int) -> str:
    return f"https://picsum.photos/seed/{seed}/{w}/{h}"


def _openlibrary(isbn: str) -> str:
    return f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"


async def _download_one(client: httpx.AsyncClient, url: str, dest: Path) -> bool:
    """Try url, return True on success (200 + non-trivial body)."""
    for attempt in range(RETRIES + 1):
        try:
            r = await client.get(url, follow_redirects=True)
            if r.status_code == 200 and len(r.content) > 1000:
                dest.write_bytes(r.content)
                return True
            return False
        except (httpx.TimeoutException, httpx.TransportError):
            if attempt == RETRIES:
                return False
            await asyncio.sleep(0.5 * (attempt + 1))
    return False


async def _download(client: httpx.AsyncClient, urls: Iterable[str], dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    _ensure(dest.parent)
    async with SEMAPHORE:
        for url in urls:
            ok = await _download_one(client, url, dest)
            if ok:
                return True
    return False


async def _process(
    client: httpx.AsyncClient,
    type_dir: str,
    slug: str,
    urls: list[str],
) -> Optional[str]:
    dest = IMAGES_DIR / type_dir / f"{slug}.jpg"
    ok = await _download(client, urls, dest)
    if ok:
        return f"/static/images/{type_dir}/{slug}.jpg"
    return None


async def main() -> None:
    await init_db()
    _ensure(IMAGES_DIR)

    downloaded = 0
    failed = 0
    skipped = 0
    total = 0

    async with httpx.AsyncClient(timeout=TIMEOUT, headers={"User-Agent": "lci-fetch-images/1.0"}) as client:
        async with AsyncSessionLocal() as session:
            books = (await session.execute(select(Book))).scalars().all()
            events = (await session.execute(select(Event))).scalars().all()
            boissons = (await session.execute(select(Boisson))).scalars().all()
            artisans = (await session.execute(select(Artisan))).scalars().all()
            products = (await session.execute(select(Product))).scalars().all()

            tasks = []

            for b in books:
                total += 1
                urls = []
                if b.isbn:
                    urls.append(_openlibrary(b.isbn))
                urls.append(_picsum(f"book-{b.slug}", 600, 900))
                tasks.append(("book", b, _process(client, "books", b.slug, urls)))

            for e in events:
                total += 1
                tasks.append(("event", e, _process(client, "events", e.slug, [_picsum(f"event-{e.slug}", 1200, 800)])))

            for b in boissons:
                total += 1
                tasks.append(("boisson", b, _process(client, "cafe", b.slug, [_picsum(f"cafe-{b.slug}", 600, 600)])))

            for a in artisans:
                total += 1
                seed = a.slug or a.name.lower().replace(" ", "-")
                tasks.append(("artisan", a, _process(client, "artisans", a.slug, [_picsum(f"artisan-{seed}", 800, 800)])))

            for p in products:
                total += 1
                tasks.append(("product", p, _process(client, "products", p.slug, [_picsum(f"product-{p.slug}", 800, 800)])))

            results = await asyncio.gather(*[t[2] for t in tasks])

            for (kind, obj, _), rel in zip(tasks, results):
                if rel is None:
                    failed += 1
                    continue
                # If file existed before this run, count as skipped (still set image_url if missing)
                if obj.image_url == rel:
                    skipped += 1
                else:
                    obj.image_url = rel
                    downloaded += 1

            await session.commit()

    print(f"[fetch_images] total={total} downloaded={downloaded} skipped={skipped} failed={failed}")


if __name__ == "__main__":
    asyncio.run(main())
