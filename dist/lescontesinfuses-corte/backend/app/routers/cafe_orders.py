from __future__ import annotations
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.orders import CafeOrder
from ..models.catalog import Boisson
from ..schemas.orders import CafeOrderCreate, CafeOrderOut

router = APIRouter(prefix="/cafe/orders", tags=["cafe"])


@router.post("", response_model=dict)
async def create_cafe_order(payload: CafeOrderCreate, db: AsyncSession = Depends(get_db)):
    items_out = []
    total = 0
    for ci in payload.items:
        res = await db.execute(select(Boisson).where(Boisson.slug == ci.boisson_slug))
        b = res.scalar_one_or_none()
        if not b:
            raise HTTPException(400, f"Boisson {ci.boisson_slug} introuvable")
        line = b.price_cents * ci.qty
        total += line
        items_out.append({"boisson_slug": b.slug, "name": b.name, "qty": ci.qty, "unit_price_cents": b.price_cents})
    co = CafeOrder(
        customer_first_name=payload.first_name,
        customer_email=payload.email,
        customer_phone=payload.phone,
        pickup_time=payload.pickup_time,
        items=items_out,
        total_cents=total,
        payment_method=payload.payment.method,
        payment_status="pending" if payload.payment.method != "onsite" else "onsite",
    )
    db.add(co)
    await db.commit()
    await db.refresh(co)
    return {
        "order_id": co.id, "public_token": co.public_token,
        "total_cents": total,
        "ready_at_estimate": (co.pickup_time or datetime.now(timezone.utc) + timedelta(minutes=10)).isoformat(),
    }


@router.get("/{order_id}", response_model=CafeOrderOut)
async def get_cafe_order(order_id: str, token: str = Query(...), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(CafeOrder).where(CafeOrder.id == order_id))
    o = res.scalar_one_or_none()
    if not o or o.public_token != token:
        raise HTTPException(404, "Not found")
    return o
