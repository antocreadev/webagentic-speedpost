from __future__ import annotations
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.otp import OneTimeCode
from ..security import random_otp
from .email import send_email, send_sms

OTP_TTL_MIN = 10


async def generate_and_send_otp(
    db: AsyncSession, purpose: str, email: Optional[str] = None, phone: Optional[str] = None, payload: Optional[dict] = None
) -> dict:
    code = random_otp(6)
    otp = OneTimeCode(
        id=str(uuid.uuid4()),
        code=code,
        purpose=purpose,
        email=email,
        phone=phone,
        payload=payload or {},
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=OTP_TTL_MIN),
    )
    db.add(otp)
    await db.commit()

    channel = "email" if email else "sms"
    if email:
        send_email(email, "Votre code de vérification - Les Contes Infusés", f"Votre code : {code}\n\nValable {OTP_TTL_MIN} minutes.")
    elif phone:
        send_sms(phone, f"Code Les Contes Infusés : {code} (valable {OTP_TTL_MIN} min)")
    return {"otp_id": otp.id, "channel": channel}


async def verify_otp(db: AsyncSession, otp_id: str, code: str) -> OneTimeCode:
    res = await db.execute(select(OneTimeCode).where(OneTimeCode.id == otp_id))
    otp = res.scalar_one_or_none()
    if not otp:
        raise ValueError("OTP not found")
    if otp.used_at is not None:
        raise ValueError("OTP already used")
    exp = otp.expires_at if otp.expires_at.tzinfo else otp.expires_at.replace(tzinfo=timezone.utc)
    if exp < datetime.now(timezone.utc):
        raise ValueError("OTP expired")
    if otp.code != code:
        raise ValueError("Invalid code")
    otp.used_at = datetime.now(timezone.utc)
    await db.commit()
    return otp
