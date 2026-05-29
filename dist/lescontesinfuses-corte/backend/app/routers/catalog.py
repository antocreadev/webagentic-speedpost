from __future__ import annotations
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.catalog import Book, Genre, Event, Boisson, Artisan, Product
from ..schemas.catalog import (
    BookOut, BookList, GenreOut, EventOut, BoissonOut,
    ArtisanOut, ArtisanDetailOut, ProductOut,
)

router = APIRouter(prefix="/catalog", tags=["catalog"])


def _book_to_out(b: Book, genre_slug: Optional[str] = None) -> BookOut:
    return BookOut(
        slug=b.slug, title=b.title, author=b.author, isbn=b.isbn, publisher=b.publisher,
        summary=b.summary, price_cents=b.price_cents, stock=b.stock,
        coup_de_coeur=b.coup_de_coeur, cover_gradient=b.cover_gradient,
        spine_color=b.spine_color, genre_slug=genre_slug,
        image_url=b.image_url,
    )


@router.get("/books", response_model=BookList)
async def list_books(
    db: AsyncSession = Depends(get_db),
    genre: Optional[str] = None,
    q: Optional[str] = None,
    min_price: Optional[int] = Query(None, description="Cents"),
    max_price: Optional[int] = Query(None, description="Cents"),
    sort: str = Query("title", pattern="^(title|price_asc|price_desc|recent)$"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    stmt = select(Book).join(Genre, isouter=True)
    conds = []
    if genre:
        conds.append(Genre.slug == genre)
    if q:
        like = f"%{q}%"
        conds.append(or_(Book.title.ilike(like), Book.author.ilike(like), Book.summary.ilike(like)))
    if min_price is not None:
        conds.append(Book.price_cents >= min_price)
    if max_price is not None:
        conds.append(Book.price_cents <= max_price)
    if conds:
        stmt = stmt.where(and_(*conds))

    if sort == "price_asc":
        stmt = stmt.order_by(Book.price_cents.asc())
    elif sort == "price_desc":
        stmt = stmt.order_by(Book.price_cents.desc())
    elif sort == "recent":
        stmt = stmt.order_by(Book.created_at.desc())
    else:
        stmt = stmt.order_by(Book.title.asc())

    total = (await db.execute(select(func.count()).select_from(stmt.subquery()))).scalar_one()
    res = await db.execute(stmt.limit(limit).offset(offset))
    books = res.scalars().unique().all()

    # Resolve genre slugs
    genre_ids = {b.genre_id for b in books if b.genre_id}
    genres_map = {}
    if genre_ids:
        gres = await db.execute(select(Genre).where(Genre.id.in_(genre_ids)))
        genres_map = {g.id: g.slug for g in gres.scalars().all()}

    return BookList(
        items=[_book_to_out(b, genres_map.get(b.genre_id)) for b in books],
        total=total, limit=limit, offset=offset,
    )


@router.get("/books/{slug}", response_model=BookOut)
async def get_book(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Book).where(Book.slug == slug))
    b = res.scalar_one_or_none()
    if not b:
        raise HTTPException(404, "Book not found")
    genre_slug = None
    if b.genre_id:
        gr = await db.execute(select(Genre.slug).where(Genre.id == b.genre_id))
        genre_slug = gr.scalar_one_or_none()
    return _book_to_out(b, genre_slug)


@router.get("/genres", response_model=List[GenreOut])
async def list_genres(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Genre).order_by(Genre.sort_order.asc(), Genre.label.asc()))
    return list(res.scalars().all())


@router.get("/events", response_model=List[EventOut])
async def list_events(
    db: AsyncSession = Depends(get_db),
    upcoming: bool = True,
    limit: int = Query(50, ge=1, le=200),
):
    stmt = select(Event).order_by(Event.starts_at.asc()).limit(limit)
    res = await db.execute(stmt)
    items = list(res.scalars().all())
    if upcoming:
        from datetime import datetime
        now = datetime.utcnow()
        items = [
            e for e in items
            if (e.starts_at.replace(tzinfo=None) if e.starts_at.tzinfo else e.starts_at) >= now
        ]
    return [
        EventOut.model_validate({**e.__dict__, "seats_remaining": max(0, e.capacity - e.registered)})
        for e in items
    ]


@router.get("/events/{slug}", response_model=EventOut)
async def get_event(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Event).where(Event.slug == slug))
    e = res.scalar_one_or_none()
    if not e:
        raise HTTPException(404, "Event not found")
    return EventOut.model_validate({**e.__dict__, "seats_remaining": max(0, e.capacity - e.registered)})


@router.get("/cafe", response_model=List[BoissonOut])
async def list_cafe(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    stmt = select(Boisson)
    if category:
        stmt = stmt.where(Boisson.category == category)
    stmt = stmt.order_by(Boisson.category, Boisson.name)
    res = await db.execute(stmt)
    return list(res.scalars().all())


@router.get("/cafe/{slug}", response_model=BoissonOut)
async def get_cafe(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Boisson).where(Boisson.slug == slug))
    b = res.scalar_one_or_none()
    if not b:
        raise HTTPException(404, "Boisson not found")
    return b


@router.get("/artisans", response_model=List[ArtisanOut])
async def list_artisans(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Artisan).order_by(Artisan.name))
    return list(res.scalars().all())


@router.get("/artisans/{slug}", response_model=ArtisanDetailOut)
async def get_artisan(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Artisan).where(Artisan.slug == slug))
    a = res.scalar_one_or_none()
    if not a:
        raise HTTPException(404, "Artisan not found")
    pres = await db.execute(select(Product).where(Product.artisan_id == a.id))
    prods = list(pres.scalars().all())
    return ArtisanDetailOut(
        slug=a.slug, name=a.name, city=a.city, bio=a.bio, image_url=a.image_url,
        products=[ProductOut(
            slug=p.slug, name=p.name, category=p.category, price_cents=p.price_cents,
            stock=p.stock, description=p.description, image_key=p.image_key,
            image_url=p.image_url, artisan_slug=a.slug,
        ) for p in prods],
    )


@router.get("/products/{slug}", response_model=ProductOut)
async def get_product(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Product).where(Product.slug == slug))
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(404, "Product not found")
    artisan_slug = None
    if p.artisan_id:
        ar = await db.execute(select(Artisan.slug).where(Artisan.id == p.artisan_id))
        artisan_slug = ar.scalar_one_or_none()
    return ProductOut(
        slug=p.slug, name=p.name, category=p.category, price_cents=p.price_cents,
        stock=p.stock, description=p.description, image_key=p.image_key,
        image_url=p.image_url, artisan_slug=artisan_slug,
    )
