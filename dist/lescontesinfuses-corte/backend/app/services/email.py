from __future__ import annotations
from datetime import datetime
from pathlib import Path
from ..config import settings

OUTBOX = Path(__file__).resolve().parent.parent / "_outbox"
OUTBOX.mkdir(exist_ok=True)


def send_email(to: str, subject: str, body_text: str, body_html: str | None = None) -> dict:
    """Mock email: prints to console + writes .eml in app/_outbox/."""
    ts = datetime.now().strftime("%Y%m%dT%H%M%S%f")
    safe_to = to.replace("@", "_at_").replace("/", "_")
    path = OUTBOX / f"{ts}__{safe_to}.eml"
    eml = (
        f"From: {settings.SMTP_FROM}\n"
        f"To: {to}\n"
        f"Subject: {subject}\n"
        f"Date: {datetime.utcnow().isoformat()}\n"
        f"Content-Type: text/plain; charset=utf-8\n\n"
        f"{body_text}\n"
    )
    if body_html:
        eml += f"\n--HTML--\n{body_html}\n"
    path.write_text(eml, encoding="utf-8")
    print(f"[email mock] -> {to} | {subject} | saved={path.name}")
    return {"to": to, "subject": subject, "path": str(path)}


def send_sms(phone: str, message: str) -> dict:
    print(f"[sms mock] -> {phone} | {message}")
    return {"phone": phone, "message": message}
