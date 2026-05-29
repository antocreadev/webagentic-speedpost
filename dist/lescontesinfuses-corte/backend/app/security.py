from __future__ import annotations
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
from jose import jwt, JWTError
import bcrypt
from .config import settings


def _to72(password: str) -> bytes:
    return password.encode("utf-8")[:72]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(_to72(password), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(_to72(password), hashed.encode("utf-8"))
    except Exception:
        return False


def create_jwt(subject: str, scopes: Optional[list[str]] = None, expires_minutes: Optional[int] = None, extra: Optional[Dict[str, Any]] = None) -> str:
    now = datetime.now(timezone.utc)
    exp = now + (timedelta(minutes=expires_minutes) if expires_minutes else timedelta(days=settings.JWT_EXPIRE_DAYS))
    payload: Dict[str, Any] = {"sub": subject, "iat": int(now.timestamp()), "exp": int(exp.timestamp()), "scopes": scopes or []}
    if extra:
        payload.update(extra)
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_jwt(token: str) -> Optional[Dict[str, Any]]:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except JWTError:
        return None


def random_token(n_bytes: int = 24) -> str:
    return secrets.token_urlsafe(n_bytes)


def random_otp(n: int = 6) -> str:
    return "".join(secrets.choice("0123456789") for _ in range(n))


def gift_card_code() -> str:
    raw = secrets.token_hex(8).upper()
    return "-".join([raw[i : i + 4] for i in range(0, 16, 4)])
