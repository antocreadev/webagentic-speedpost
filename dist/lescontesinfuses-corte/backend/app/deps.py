from __future__ import annotations
from typing import Optional
from fastapi import Depends, Header, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .database import AsyncSessionLocal
from .security import decode_jwt
from .models.customer import Customer


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def get_current_user(authorization: Optional[str] = Header(default=None), db: AsyncSession = Depends(get_db)) -> Optional[Customer]:
    if not authorization or not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1]
    payload = decode_jwt(token)
    if not payload:
        return None
    sub = payload.get("sub")
    if not sub:
        return None
    res = await db.execute(select(Customer).where(Customer.email == sub))
    return res.scalar_one_or_none()


async def require_user(user: Optional[Customer] = Depends(get_current_user)) -> Customer:
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return user


async def require_admin(authorization: Optional[str] = Header(default=None), db: AsyncSession = Depends(get_db)) -> Customer:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Admin auth required")
    token = authorization.split(" ", 1)[1]
    payload = decode_jwt(token)
    if not payload or "admin" not in (payload.get("scopes") or []):
        raise HTTPException(status_code=403, detail="Admin scope required")
    res = await db.execute(select(Customer).where(Customer.email == payload["sub"]))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=403, detail="Admin user not found")
    return user


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"
