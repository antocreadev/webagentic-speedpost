from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.loyalty import LoyaltyAccount

router = APIRouter(prefix="/loyalty", tags=["loyalty"])


async def _get_or_create(db: AsyncSession, email: str | None, phone: str | None) -> LoyaltyAccount:
    if not email and not phone:
        raise HTTPException(400, "email or phone required")
    stmt = select(LoyaltyAccount)
    if email:
        stmt = stmt.where(LoyaltyAccount.key_email == email)
    else:
        stmt = stmt.where(LoyaltyAccount.key_phone == phone)
    la = (await db.execute(stmt)).scalar_one_or_none()
    if not la:
        la = LoyaltyAccount(key_email=email, key_phone=phone, cafe_stamps=0, book_stamps=0)
        db.add(la)
        await db.commit()
        await db.refresh(la)
    return la


@router.get("")
async def get_loyalty(email: str | None = None, phone: str | None = None, db: AsyncSession = Depends(get_db)):
    la = await _get_or_create(db, email, phone)
    return {"cafe_stamps": la.cafe_stamps, "book_stamps": la.book_stamps,
            "cafe_reward_at": 10, "book_reward_at": 5}


@router.post("/redeem")
async def redeem(payload: dict, db: AsyncSession = Depends(get_db)):
    email = payload.get("key_email"); phone = payload.get("key_phone")
    typ = payload.get("type")
    la = await _get_or_create(db, email, phone)
    if typ == "cafe":
        if la.cafe_stamps < 10:
            raise HTTPException(400, "Pas assez de tampons cafe")
        la.cafe_stamps -= 10
        reward = "1 cafe offert"
    elif typ == "book":
        if la.book_stamps < 5:
            raise HTTPException(400, "Pas assez de tampons livre")
        la.book_stamps -= 5
        reward = "10% sur prochain livre"
    else:
        raise HTTPException(400, "type invalide")
    await db.commit()
    return {"reward": reward, "cafe_stamps": la.cafe_stamps, "book_stamps": la.book_stamps}
