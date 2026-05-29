from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.catalog import Event
from ..models.orders import EventRegistration
from ..schemas.orders import EventRegistrationIn, EventRegistrationOut
from ..services.email import send_email
from ..services.stripe_mock import create_payment_intent

router = APIRouter(prefix="/events", tags=["events"])


@router.get("/{slug}/seats")
async def seats(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Event).where(Event.slug == slug))
    e = res.scalar_one_or_none()
    if not e:
        raise HTTPException(404, "Event not found")
    return {"capacity": e.capacity, "registered": e.registered, "seats_remaining": max(0, e.capacity - e.registered)}


@router.post("/{slug}/register")
async def register(slug: str, payload: EventRegistrationIn, db: AsyncSession = Depends(get_db)):
    if not payload.consent_terms:
        raise HTTPException(400, "Terms required")
    res = await db.execute(select(Event).where(Event.slug == slug))
    e = res.scalar_one_or_none()
    if not e:
        raise HTTPException(404, "Event not found")
    if (e.capacity - e.registered) < payload.seats:
        raise HTTPException(400, "Plus assez de places")

    method = payload.payment.get("method", "free")
    total = (e.price_cents or 0) * payload.seats if method != "free" else 0
    payment_status = "succeeded" if method == "free" else "pending"

    reg = EventRegistration(
        event_id=e.id, name=payload.name, email=payload.email, phone=payload.phone,
        seats=payload.seats, total_cents=total, payment_method=method, payment_status=payment_status,
        consent_marketing=payload.consent_marketing,
    )
    e.registered += payload.seats
    db.add(reg)
    await db.commit()
    await db.refresh(reg)

    intent = None
    if method == "cb" and total > 0:
        intent = create_payment_intent(total, metadata={"event": slug, "registration": reg.id})

    send_email(payload.email, f"Inscription confirmee : {e.title}",
               f"Bonjour {payload.name},\n\nVotre inscription a '{e.title}' est confirmee ({payload.seats} place(s)).\n\nA bientot,\nLes Contes Infuses")

    return {
        "registration": EventRegistrationOut.model_validate(reg).model_dump(),
        "payment_action": {"provider": "stripe_mock", "intent": intent} if intent else None,
    }
