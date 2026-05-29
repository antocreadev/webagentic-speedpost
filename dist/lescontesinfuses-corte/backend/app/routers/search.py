from __future__ import annotations
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.catalog import Book, Event, Product

router = APIRouter(prefix="/search", tags=["search"])


@router.get("")
async def search(
    db: AsyncSession = Depends(get_db),
    q: str = Query(..., min_length=1),
    types: str = "books,events,products",
    limit: int = Query(10, ge=1, le=50),
):
    type_set = {t.strip() for t in types.split(",")}
    like = f"%{q}%"
    out: dict = {"q": q, "results": {}}

    if "books" in type_set:
        res = await db.execute(select(Book).where(or_(Book.title.ilike(like), Book.author.ilike(like))).limit(limit))
        out["results"]["books"] = [{"slug": b.slug, "title": b.title, "author": b.author} for b in res.scalars().all()]
    if "events" in type_set:
        res = await db.execute(select(Event).where(Event.title.ilike(like)).limit(limit))
        out["results"]["events"] = [{"slug": e.slug, "title": e.title, "starts_at": e.starts_at.isoformat()} for e in res.scalars().all()]
    if "products" in type_set:
        res = await db.execute(select(Product).where(Product.name.ilike(like)).limit(limit))
        out["results"]["products"] = [{"slug": p.slug, "name": p.name} for p in res.scalars().all()]
    if "journal" in type_set:
        out["results"]["journal"] = []
    return out
