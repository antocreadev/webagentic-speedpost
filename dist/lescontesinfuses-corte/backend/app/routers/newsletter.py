from __future__ import annotations
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.communication import NewsletterSubscriber
from ..schemas.communication import NewsletterSubscribeIn, NewsletterConfirmIn, NewsletterUnsubscribeIn
from ..services.email import send_email
from ..security import random_token

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

DEFAULT_PREFS = {"coups_de_coeur": True, "calendar": True, "recettes": False, "promotions": False}


@router.post("/subscribe")
async def subscribe(payload: NewsletterSubscribeIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.email == payload.email))
    sub = res.scalar_one_or_none()
    token = random_token(16)
    if sub:
        sub.double_opt_in_token = token
        sub.unsubscribed_at = None
        if payload.preferences:
            sub.preferences = {**DEFAULT_PREFS, **payload.preferences}
    else:
        sub = NewsletterSubscriber(
            email=payload.email, phone=payload.phone,
            preferences={**DEFAULT_PREFS, **(payload.preferences or {})},
            double_opt_in_token=token,
        )
        db.add(sub)
    await db.commit()
    send_email(payload.email, "Confirmez votre inscription a la newsletter",
               f"Cliquez pour confirmer : http://localhost:4321/newsletter/confirm?token={token}")
    return {"status": "pending_confirm"}


@router.post("/confirm")
async def confirm(payload: NewsletterConfirmIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.double_opt_in_token == payload.token))
    sub = res.scalar_one_or_none()
    if not sub:
        raise HTTPException(404, "Token invalide")
    sub.confirmed_at = datetime.now(timezone.utc)
    sub.double_opt_in_token = None
    await db.commit()
    return {"status": "confirmed"}


@router.post("/unsubscribe")
async def unsubscribe(payload: NewsletterUnsubscribeIn, db: AsyncSession = Depends(get_db)):
    if not payload.email and not payload.token:
        raise HTTPException(400, "email or token required")
    stmt = select(NewsletterSubscriber)
    if payload.email:
        stmt = stmt.where(NewsletterSubscriber.email == payload.email)
    else:
        stmt = stmt.where(NewsletterSubscriber.double_opt_in_token == payload.token)
    sub = (await db.execute(stmt)).scalar_one_or_none()
    if not sub:
        raise HTTPException(404, "Not found")
    sub.unsubscribed_at = datetime.now(timezone.utc)
    await db.commit()
    return {"status": "unsubscribed"}
