"""Google Maps embed builders — no API key required."""
from __future__ import annotations

import urllib.parse


def iframe_src(latitude: float, longitude: float, zoom: int = 15) -> str:
    """Key-less embed URL. Works in an <iframe>."""
    q = f"{latitude},{longitude}"
    return f"https://maps.google.com/maps?q={urllib.parse.quote_plus(q)}&z={zoom}&output=embed"


def iframe_html(latitude: float | None, longitude: float | None, *, title: str,
                height: int = 420) -> str:
    if latitude is None or longitude is None:
        return ""
    src = iframe_src(latitude, longitude)
    safe_title = urllib.parse.quote(title, safe=" ")
    return (
        f'<iframe src="{src}" width="100%" height="{height}" '
        f'style="border:0;border-radius:16px" loading="lazy" '
        f'referrerpolicy="no-referrer-when-downgrade" '
        f'title="Carte {safe_title}"></iframe>'
    )
