"""Stdlib web search via the DuckDuckGo HTML endpoint.

Returns a list of {title, url, snippet}. No API key.
Be polite: the caller is responsible for rate-limiting across many clients.
"""
from __future__ import annotations

import html
import re
import urllib.parse
import urllib.request
from dataclasses import dataclass

_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)
_RESULT_RE = re.compile(
    r'<a[^>]+class="result__a"[^>]+href="(?P<url>[^"]+)"[^>]*>(?P<title>.+?)</a>'
    r'(?:.*?<a[^>]+class="result__snippet"[^>]*>(?P<snippet>.+?)</a>)?',
    re.DOTALL,
)
_TAG_RE = re.compile(r"<[^>]+>")


@dataclass
class SearchResult:
    title: str
    url: str
    snippet: str


def _clean(text: str) -> str:
    return html.unescape(_TAG_RE.sub("", text or "")).strip()


def _unwrap_ddg(url: str) -> str:
    # DDG wraps links like //duckduckgo.com/l/?uddg=...&rut=...
    if url.startswith("//"):
        url = "https:" + url
    parsed = urllib.parse.urlparse(url)
    if parsed.netloc.endswith("duckduckgo.com") and parsed.path.startswith("/l/"):
        qs = urllib.parse.parse_qs(parsed.query)
        if "uddg" in qs:
            return urllib.parse.unquote(qs["uddg"][0])
    return url


def search(query: str, *, max_results: int = 8, timeout: float = 10.0) -> list[SearchResult]:
    q = urllib.parse.quote_plus(query)
    req = urllib.request.Request(
        f"https://html.duckduckgo.com/html/?q={q}",
        headers={"User-Agent": _UA, "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read().decode("utf-8", errors="replace")

    results: list[SearchResult] = []
    for m in _RESULT_RE.finditer(body):
        results.append(
            SearchResult(
                title=_clean(m.group("title")),
                url=_unwrap_ddg(m.group("url")),
                snippet=_clean(m.group("snippet") or ""),
            )
        )
        if len(results) >= max_results:
            break
    return results
