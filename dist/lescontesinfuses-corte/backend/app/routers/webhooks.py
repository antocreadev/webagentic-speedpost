from __future__ import annotations
from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.orders import Order, OrderEvent

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/stripe-mock")
async def stripe_mock(payload: dict, db: AsyncSession = Depends(get_db)):
    return {"received": True, "type": payload.get("event_type")}


@router.post("/mondial-relay-mock")
async def mr_mock(payload: dict, db: AsyncSession = Depends(get_db)):
    tn = payload.get("tracking_number")
    new_status = payload.get("status")
    res = await db.execute(select(Order).where(Order.tracking_number == tn))
    o = res.scalar_one_or_none()
    if o:
        if new_status == "delivered":
            o.status = "delivered"
            o.delivered_at = datetime.now(timezone.utc)
        elif new_status == "in_transit":
            o.status = "shipped"
        db.add(OrderEvent(order_id=o.id, type=f"mr_{new_status}", actor="webhook"))
        await db.commit()
    return {"ok": True}
