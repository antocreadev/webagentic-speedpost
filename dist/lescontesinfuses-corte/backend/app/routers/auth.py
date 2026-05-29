from __future__ import annotations
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db, require_user
from ..models.customer import Customer
from ..schemas.auth import RegisterIn, LoginIn, TokenOut, CustomerOut, ProfileUpdateIn, ForgotIn, ResetIn
from ..security import hash_password, verify_password, create_jwt, decode_jwt, random_token
from ..services.email import send_email
from ..config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenOut)
async def register(payload: RegisterIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Customer).where(Customer.email == payload.email))
    if res.scalar_one_or_none():
        raise HTTPException(409, "Email deja utilise")
    c = Customer(
        email=payload.email,
        phone=payload.phone, first_name=payload.first_name, last_name=payload.last_name,
        password_hash=hash_password(payload.password),
        marketing_consent=payload.marketing_consent,
    )
    db.add(c)
    await db.commit()
    send_email(c.email, "Bienvenue chez Les Contes Infuses",
               f"Bonjour {c.first_name or ''},\n\nVotre compte a ete cree.\n\nLes Contes Infuses")
    token = create_jwt(c.email)
    return TokenOut(access_token=token, expires_in=settings.JWT_EXPIRE_DAYS * 86400)


@router.post("/login", response_model=TokenOut)
async def login(payload: LoginIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Customer).where(Customer.email == payload.email))
    c = res.scalar_one_or_none()
    if not c or not c.password_hash or not verify_password(payload.password, c.password_hash):
        raise HTTPException(401, "Identifiants invalides")
    c.last_login_at = datetime.now(timezone.utc)
    await db.commit()
    scopes = ["admin"] if c.is_admin else []
    token = create_jwt(c.email, scopes=scopes)
    return TokenOut(access_token=token, expires_in=settings.JWT_EXPIRE_DAYS * 86400)


@router.post("/logout")
async def logout():
    return {"status": "logged_out"}


@router.get("/me", response_model=CustomerOut)
async def me(user: Customer = Depends(require_user)):
    return user


@router.patch("/me", response_model=CustomerOut)
async def patch_me(payload: ProfileUpdateIn, user: Customer = Depends(require_user), db: AsyncSession = Depends(get_db)):
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(user, k, v)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/forgot")
async def forgot(payload: ForgotIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Customer).where(Customer.email == payload.email))
    c = res.scalar_one_or_none()
    if c:
        token = create_jwt(c.email, scopes=["password_reset"], expires_minutes=30)
        send_email(c.email, "Reinitialisation de mot de passe",
                   f"Lien : http://localhost:4321/reset?token={token}")
    return {"status": "sent_if_exists"}


@router.post("/reset")
async def reset(payload: ResetIn, db: AsyncSession = Depends(get_db)):
    data = decode_jwt(payload.token)
    if not data or "password_reset" not in (data.get("scopes") or []):
        raise HTTPException(400, "Token invalide")
    res = await db.execute(select(Customer).where(Customer.email == data["sub"]))
    c = res.scalar_one_or_none()
    if not c:
        raise HTTPException(404, "Compte introuvable")
    c.password_hash = hash_password(payload.new_password)
    await db.commit()
    return {"status": "reset"}
