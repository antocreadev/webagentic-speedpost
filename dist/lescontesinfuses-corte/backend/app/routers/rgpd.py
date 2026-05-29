from __future__ import annotations
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db, client_ip
from ..models.consent import Consent, DataExportRequest, AccountDeletionRequest
from ..models.customer import Customer
from ..schemas.communication import ConsentIn
from ..services.email import send_email
from ..security import random_token

router = APIRouter(prefix="/rgpd", tags=["rgpd"])


@router.post("/export")
async def export_data(payload: dict, db: AsyncSession = Depends(get_db)):
    email = payload.get("email")
    if not email:
        raise HTTPException(400, "email required")
    req = DataExportRequest(
        email=email,
        export_url=f"/api/rgpd/export/download/{random_token(8)}",
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=15),
    )
    db.add(req); await db.commit()
    send_email(email, "Votre export de donnees", f"Lien : http://localhost:4321{req.export_url}\n(15 minutes)")
    return {"status": "queued", "request_id": req.id}


@router.post("/delete")
async def request_delete(payload: dict, db: AsyncSession = Depends(get_db)):
    email = payload.get("email")
    if not email:
        raise HTTPException(400, "email required")
    token = random_token(16)
    req = AccountDeletionRequest(email=email, reason=payload.get("reason"), token=token)
    db.add(req); await db.commit()
    send_email(email, "Confirmez la suppression de votre compte", f"Lien : http://localhost:4321/rgpd/delete/confirm?token={token}")
    return {"status": "pending_confirmation"}


@router.post("/delete/confirm")
async def confirm_delete(payload: dict, db: AsyncSession = Depends(get_db)):
    token = payload.get("token")
    res = await db.execute(select(AccountDeletionRequest).where(AccountDeletionRequest.token == token))
    req = res.scalar_one_or_none()
    if not req:
        raise HTTPException(404, "Token invalide")
    # Anonymise customer if exists
    cres = await db.execute(select(Customer).where(Customer.email == req.email))
    c = cres.scalar_one_or_none()
    if c:
        c.email = f"anon_{c.id}@deleted.local"
        c.first_name = None; c.last_name = None; c.phone = None
        c.password_hash = None
    req.status = "processed"
    req.processed_at = datetime.now(timezone.utc)
    await db.commit()
    return {"status": "deleted"}


@router.get("/consents")
async def list_consents(key: str = Query(...), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Consent).where(Consent.key == key))
    return [
        {"type": c.type, "version": c.version, "accepted": c.accepted, "accepted_at": c.accepted_at.isoformat()}
        for c in res.scalars().all()
    ]


@router.post("/consents")
async def add_consent(payload: ConsentIn, request: Request, db: AsyncSession = Depends(get_db)):
    c = Consent(
        key=payload.key, type=payload.type, version=payload.version,
        accepted=payload.accepted, ip=payload.ip or client_ip(request),
        user_agent=payload.user_agent or request.headers.get("user-agent", ""),
    )
    db.add(c); await db.commit()
    return {"status": "recorded"}
