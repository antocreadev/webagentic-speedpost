from __future__ import annotations
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db, require_user
from ..models.customer import Customer
from ..models.orders import Order
from ..models.loyalty import LoyaltyAccount

router = APIRouter(prefix="/account", tags=["account"])


@router.get("/orders")
async def my_orders(
    user: Customer = Depends(require_user),
    db: AsyncSession = Depends(get_db),
    status: str | None = None,
    limit: int = Query(20, ge=1, le=100),
):
    stmt = select(Order).where(Order.customer_email == user.email).order_by(Order.created_at.desc()).limit(limit)
    if status:
        stmt = stmt.where(Order.status == status)
    res = await db.execute(stmt)
    return [
        {"id": o.id, "reference": o.reference, "status": o.status, "total_cents": o.total_cents, "created_at": o.created_at.isoformat()}
        for o in res.scalars().all()
    ]


@router.get("/loyalty")
async def my_loyalty(user: Customer = Depends(require_user), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(LoyaltyAccount).where(LoyaltyAccount.key_email == user.email))
    la = res.scalar_one_or_none()
    if not la:
        return {"cafe_stamps": 0, "book_stamps": 0}
    return {"cafe_stamps": la.cafe_stamps, "book_stamps": la.book_stamps}


@router.get("/preferences")
async def my_prefs(user: Customer = Depends(require_user)):
    return {"marketing_consent": user.marketing_consent}


@router.patch("/preferences")
async def patch_prefs(payload: dict, user: Customer = Depends(require_user), db: AsyncSession = Depends(get_db)):
    if "marketing_consent" in payload:
        user.marketing_consent = bool(payload["marketing_consent"])
    await db.commit()
    return {"marketing_consent": user.marketing_consent}
