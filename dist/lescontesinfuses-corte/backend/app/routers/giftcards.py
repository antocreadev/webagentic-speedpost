from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.giftcard import GiftCard
from ..schemas.communication import GiftCardCreateIn
from ..services.stripe_mock import create_payment_intent
from ..services.email import send_email
from ..security import gift_card_code

router = APIRouter(prefix="/giftcards", tags=["giftcards"])


@router.post("")
async def create_giftcard(payload: GiftCardCreateIn, db: AsyncSession = Depends(get_db)):
    if payload.value_cents < 1000:
        raise HTTPException(400, "Montant minimum 10 EUR")
    intent = create_payment_intent(payload.value_cents, metadata={"giftcard_recipient": payload.recipient_email})
    gc = GiftCard(
        code=gift_card_code(),
        value_cents=payload.value_cents,
        balance_cents=payload.value_cents,
        message=payload.message,
        recipient_email=payload.recipient_email,
        recipient_name=payload.recipient_name,
        sender_name=payload.sender_name,
        sender_email=payload.sender_email,
        status="pending_payment",
        payment_intent_id=intent["id"],
    )
    db.add(gc)
    await db.commit()
    await db.refresh(gc)
    return {"giftcard_id": gc.id, "code": gc.code, "payment_action": {"provider": "stripe_mock", "intent": intent}}


@router.get("/{code}/balance")
async def balance(code: str, email: str | None = None, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(GiftCard).where(GiftCard.code == code))
    gc = res.scalar_one_or_none()
    if not gc:
        raise HTTPException(404, "Carte introuvable")
    # require email match for security
    if email and gc.recipient_email != email and gc.sender_email != email:
        raise HTTPException(403, "Email non associe a cette carte")
    return {"code": gc.code, "balance_cents": gc.balance_cents, "status": gc.status}


@router.post("/{code}/apply")
async def apply(code: str, body: dict, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(GiftCard).where(GiftCard.code == code))
    gc = res.scalar_one_or_none()
    if not gc or gc.status != "active":
        raise HTTPException(400, "Carte non utilisable")
    return {"code": gc.code, "applied_to_order": body.get("order_id"), "balance_cents": gc.balance_cents}
