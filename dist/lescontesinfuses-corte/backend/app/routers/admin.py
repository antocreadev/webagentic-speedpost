from __future__ import annotations
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy import select, func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db, require_admin
from ..models.orders import Order, OrderItem, OrderEvent, EventRegistration
from ..models.catalog import Book, Product, Event, Boisson
from ..models.customer import Customer
from ..services.mondial_relay import generate_label
from ..services.librisoft import LibriSoftClient

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@router.get("/orders")
async def list_orders(
    db: AsyncSession = Depends(get_db),
    status: str | None = None,
    shipping: str | None = None,
    q: str | None = None,
    limit: int = Query(50, ge=1, le=200),
):
    stmt = select(Order).order_by(Order.created_at.desc()).limit(limit)
    conds = []
    if status:
        conds.append(Order.status == status)
    if shipping:
        conds.append(Order.shipping_method == shipping)
    if q:
        like = f"%{q}%"
        conds.append(or_(Order.customer_email.ilike(like), Order.reference.ilike(like)))
    if conds:
        stmt = stmt.where(and_(*conds))
    res = await db.execute(stmt)
    return [
        {"id": o.id, "reference": o.reference, "status": o.status,
         "customer_email": o.customer_email, "total_cents": o.total_cents,
         "shipping_method": o.shipping_method, "created_at": o.created_at.isoformat()}
        for o in res.scalars().all()
    ]


@router.get("/orders/{order_id}")
async def get_order(order_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    o = res.scalar_one_or_none()
    if not o:
        raise HTTPException(404, "Not found")
    items = (await db.execute(select(OrderItem).where(OrderItem.order_id == order_id))).scalars().all()
    events = (await db.execute(select(OrderEvent).where(OrderEvent.order_id == order_id).order_by(OrderEvent.ts))).scalars().all()
    return {
        "order": {"id": o.id, "reference": o.reference, "status": o.status,
                  "customer_email": o.customer_email, "customer_phone": o.customer_phone,
                  "shipping_method": o.shipping_method, "shipping_address": o.shipping_address,
                  "total_cents": o.total_cents, "tracking_number": o.tracking_number,
                  "created_at": o.created_at.isoformat(),
                  "paid_at": o.paid_at.isoformat() if o.paid_at else None},
        "items": [{"kind": i.kind, "name": i.name, "qty": i.qty, "line_total_cents": i.line_total_cents} for i in items],
        "timeline": [{"ts": e.ts.isoformat(), "type": e.type, "payload": e.payload, "actor": e.actor} for e in events],
    }


@router.patch("/orders/{order_id}/status")
async def patch_status(order_id: str, payload: dict, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    o = res.scalar_one_or_none()
    if not o:
        raise HTTPException(404, "Not found")
    new_status = payload.get("status")
    if not new_status:
        raise HTTPException(400, "status required")
    o.status = new_status
    if new_status == "shipped":
        o.shipped_at = datetime.now(timezone.utc)
    elif new_status == "delivered":
        o.delivered_at = datetime.now(timezone.utc)
    db.add(OrderEvent(order_id=o.id, type="status_changed", payload={"to": new_status, "note": payload.get("note")}, actor="admin"))
    await db.commit()
    return {"status": o.status}


@router.post("/orders/{order_id}/label")
async def make_label(order_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    o = res.scalar_one_or_none()
    if not o:
        raise HTTPException(404, "Not found")
    label = generate_label(o)
    o.tracking_number = label["tracking_number"]
    db.add(OrderEvent(order_id=o.id, type="label_generated", payload={"tracking_number": label["tracking_number"]}, actor="admin"))
    await db.commit()
    return {"label_id": label["tracking_number"], "tracking_number": label["tracking_number"],
            "pdf_url": f"/api/admin/orders/{order_id}/label/pdf"}


@router.get("/orders/{order_id}/label/pdf")
async def get_label_pdf(order_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    o = res.scalar_one_or_none()
    if not o:
        raise HTTPException(404, "Not found")
    label = generate_label(o)
    return Response(content=label["pdf_bytes"], media_type="application/pdf",
                    headers={"Content-Disposition": f'inline; filename="label-{o.reference or o.id}.pdf"'})


@router.get("/labels")
async def labels_queue(status: str = "pending", db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.status == "paid", Order.tracking_number.is_(None)))
    return [{"order_id": o.id, "reference": o.reference, "customer": o.customer_email} for o in res.scalars().all()]


@router.post("/labels/print-batch")
async def print_batch(payload: dict, db: AsyncSession = Depends(get_db)):
    ids = payload.get("order_ids", [])
    return {"batch_size": len(ids), "status": "queued"}


@router.get("/products")
async def list_products(type: str = "book", db: AsyncSession = Depends(get_db)):
    if type == "book":
        res = await db.execute(select(Book))
        return [{"id": b.id, "slug": b.slug, "title": b.title, "stock": b.stock, "price_cents": b.price_cents} for b in res.scalars().all()]
    res = await db.execute(select(Product))
    return [{"id": p.id, "slug": p.slug, "name": p.name, "stock": p.stock, "price_cents": p.price_cents} for p in res.scalars().all()]


@router.post("/products")
async def create_product(payload: dict, db: AsyncSession = Depends(get_db)):
    if payload.get("type") == "book":
        b = Book(**{k: v for k, v in payload.items() if k != "type"})
        db.add(b); await db.commit(); await db.refresh(b)
        return {"id": b.id, "slug": b.slug}
    p = Product(**{k: v for k, v in payload.items() if k != "type"})
    db.add(p); await db.commit(); await db.refresh(p)
    return {"id": p.id, "slug": p.slug}


@router.patch("/products/{id}")
async def patch_product(id: int, payload: dict, db: AsyncSession = Depends(get_db)):
    typ = payload.pop("type", "book")
    Model = Book if typ == "book" else Product
    res = await db.execute(select(Model).where(Model.id == id))
    obj = res.scalar_one_or_none()
    if not obj:
        raise HTTPException(404, "Not found")
    for k, v in payload.items():
        if hasattr(obj, k):
            setattr(obj, k, v)
    await db.commit()
    return {"id": obj.id}


@router.get("/customers")
async def list_customers(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Customer).order_by(Customer.created_at.desc()))
    return [{"email": c.email, "first_name": c.first_name, "last_name": c.last_name, "created_at": c.created_at.isoformat()} for c in res.scalars().all()]


@router.get("/customers/{email}")
async def get_customer(email: str, db: AsyncSession = Depends(get_db)):
    cres = await db.execute(select(Customer).where(Customer.email == email))
    c = cres.scalar_one_or_none()
    if not c:
        raise HTTPException(404, "Not found")
    ores = await db.execute(select(Order).where(Order.customer_email == email).order_by(Order.created_at.desc()))
    return {
        "customer": {"email": c.email, "first_name": c.first_name, "last_name": c.last_name, "phone": c.phone},
        "orders": [{"id": o.id, "reference": o.reference, "status": o.status, "total_cents": o.total_cents} for o in ores.scalars().all()],
    }


@router.get("/events/registrations/{event_slug}")
async def event_regs(event_slug: str, db: AsyncSession = Depends(get_db)):
    eres = await db.execute(select(Event).where(Event.slug == event_slug))
    e = eres.scalar_one_or_none()
    if not e:
        raise HTTPException(404, "Event not found")
    rres = await db.execute(select(EventRegistration).where(EventRegistration.event_id == e.id))
    return [{"id": r.id, "name": r.name, "email": r.email, "seats": r.seats, "payment_status": r.payment_status} for r in rres.scalars().all()]


@router.get("/dashboard/stats")
async def dashboard_stats(db: AsyncSession = Depends(get_db)):
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    month_start = today.replace(day=1)
    orders_today = (await db.execute(select(func.count()).select_from(Order).where(Order.created_at >= today))).scalar_one()
    ca_month = (await db.execute(select(func.coalesce(func.sum(Order.total_cents), 0)).where(Order.created_at >= month_start, Order.payment_status == "succeeded"))).scalar_one()
    low_stock = (await db.execute(select(func.count()).select_from(Book).where(Book.stock <= 3))).scalar_one()
    last_orders = (await db.execute(select(Order).order_by(Order.created_at.desc()).limit(5))).scalars().all()
    return {
        "orders_today": orders_today,
        "ca_month_cents": ca_month,
        "low_stock_count": low_stock,
        "last_orders": [{"id": o.id, "reference": o.reference, "total_cents": o.total_cents, "status": o.status} for o in last_orders],
    }


@router.get("/stocks")
async def stocks(threshold: int = 3, db: AsyncSession = Depends(get_db)):
    bres = await db.execute(select(Book).where(Book.stock <= threshold))
    pres = await db.execute(select(Product).where(Product.stock <= threshold))
    return {
        "books": [{"slug": b.slug, "title": b.title, "stock": b.stock} for b in bres.scalars().all()],
        "products": [{"slug": p.slug, "name": p.name, "stock": p.stock} for p in pres.scalars().all()],
    }


@router.post("/stocks/sync-librisoft")
async def sync_librisoft():
    return LibriSoftClient().sync_stock()
