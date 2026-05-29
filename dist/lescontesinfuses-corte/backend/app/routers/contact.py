from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.communication import ContactRequest
from ..schemas.communication import ContactIn
from ..services.email import send_email
from ..config import settings

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("")
async def contact(payload: ContactIn, db: AsyncSession = Depends(get_db)):
    if not payload.consent_privacy:
        raise HTTPException(400, "Consentement requis")
    cr = ContactRequest(
        name=payload.name, email=payload.email, phone=payload.phone,
        subject=payload.subject, message=payload.message,
    )
    db.add(cr)
    await db.commit()
    send_email(settings.ADMIN_EMAIL, f"[contact] {payload.subject}",
               f"De : {payload.name} <{payload.email}>\nTel : {payload.phone or '-'}\n\n{payload.message}")
    return {"status": "received", "id": cr.id}
