"""Rebrand existing emails from Menghi Computer Science → SpeedPost.fr.

For each dist/<slug>/email.txt + email.html present, extract:
- Subject line
- Accroche personnalisée (paragraph 1)
- 1 highlight bullet from "Ce qui a été mis en avant"
- existing pages_url (kept as-is, legacy menghicomputerscience-* URLs)

Then regenerate a SHORT email (120-180 words) in the SpeedPost format.

Idempotent : re-running on a SpeedPost email leaves it as-is (detected via signature).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
PROGRESS = DIST / "_progress.json"

SPEEDPOST_SIGNATURE_MARK = "SpeedPost.fr"

SIGNATURE_TXT = """Anto
SpeedPost.fr (WebAgentic Builder)
Un service de SAS Mindlet, Corte (Corse)
Lauréat PEPITE France & Corse, Start'in Corsica, Tecnulugia, Fundtruck Régional
contact@speedpost.fr  |  webagentic.speedpost.fr"""

SIGNATURE_HTML = """<p style="margin:24px 0 4px 0;">Anto<br>
<strong>SpeedPost.fr</strong> (WebAgentic Builder)<br>
<span style="color:#555;">Un service de SAS Mindlet, Corte (Corse)</span><br>
<span style="color:#555;font-size:13px;">Lauréat PEPITE France &amp; Corse, Start'in Corsica, Tecnulugia, Fundtruck Régional</span><br>
<a href="mailto:contact@speedpost.fr">contact@speedpost.fr</a>  |  <a href="https://webagentic.speedpost.fr">webagentic.speedpost.fr</a></p>"""


def load_pages_urls() -> dict[str, str]:
    p = json.loads(PROGRESS.read_text(encoding="utf-8"))
    out = {}
    for pid, v in p.get("clients", {}).items():
        slug = v.get("slug")
        url = v.get("pages_url")
        if slug and url:
            out[slug] = url
    return out


def parse_old_email(txt: str) -> dict:
    """Extract subject, accroche, highlight from old Menghi email.txt."""
    lines = txt.splitlines()
    subject = ""
    for ln in lines:
        if ln.lower().startswith("sujet"):
            subject = ln.split(":", 1)[1].strip()
            break

    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", txt) if p.strip()]
    # Paragraph 0 = subject. Paragraph 1 = "Bonjour,". Paragraph 2 = accroche.
    accroche = ""
    for i, p in enumerate(paragraphs):
        if p.lower().startswith("bonjour"):
            if i + 1 < len(paragraphs):
                accroche = paragraphs[i + 1]
            break
    # Trim accroche to 2 sentences max
    sents = re.split(r"(?<=[.!?])\s+", accroche)
    accroche_short = " ".join(sents[:2]).strip()

    # Highlight: first bullet under "Ce qui a été mis en avant"
    highlight = ""
    m = re.search(r"Ce qui a été mis en avant[^\n]*\n+\s*-\s*([^\n]+)", txt)
    if m:
        highlight = m.group(1).strip()
        # remove trailing period for inline use
        highlight = highlight.rstrip(".")
        # lowercase first letter so it flows mid-sentence? keep as-is, it's a standalone line

    return {"subject": subject, "accroche": accroche_short, "highlight": highlight}


def shorten_accroche(accroche: str) -> str:
    """Cap accroche to ~80 words while keeping complete sentences. Always keeps ≥1 full sentence."""
    words = accroche.split()
    if len(words) <= 80:
        return accroche
    sents = re.split(r"(?<=[.!?])\s+", accroche)
    out = []
    n = 0
    for s in sents:
        w = len(s.split())
        if out and n + w > 80:
            break
        out.append(s)
        n += w
    return " ".join(out).strip()


def build_email_txt(subject: str, accroche: str, highlight: str, pages_url: str) -> str:
    highlight_line = ""
    if highlight:
        highlight_line = f"\nCe qu'on a mis en avant pour vous : {highlight.lower()[0] + highlight[1:] if highlight else ''}.\n"

    return f"""Sujet : {subject}

Bonjour,

{accroche}

J'ai préparé une démo gratuite de votre site, codée à la main et 100% personnalisable :
{pages_url}
{highlight_line}
Deux formules au choix (tarifs HT) :
- 1500€ une fois + 20€/mois (maintenance, agent IA pour modifier le site, rapport SEO mensuel), sans engagement
- 89€/mois engagé 12 mois, mêmes services

Inclus dans les deux : hébergement, nom de domaine, SEO, indexation IA (ChatGPT, Gemini, Perplexity), support.

Si la démo vous plaît, je la mets en ligne sur votre nom de domaine cette semaine. Sinon, dites-moi ce qu'on ajuste.

{SIGNATURE_TXT}
"""


def build_email_html(subject: str, accroche: str, highlight: str, pages_url: str) -> str:
    highlight_block = ""
    if highlight:
        h = highlight[0].lower() + highlight[1:] if highlight else ""
        highlight_block = f'<p>Ce qu\'on a mis en avant pour vous : {h}.</p>\n'

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>{subject}</title>
</head>
<body style="margin:0;padding:24px;background:#fafafa;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111;line-height:1.6;">
<div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border-radius:8px;">
<p>Bonjour,</p>
<p>{accroche}</p>
<p>J'ai préparé une démo gratuite de votre site, codée à la main et 100% personnalisable :<br>
<a href="{pages_url}">{pages_url}</a></p>
{highlight_block}<p><strong>Deux formules au choix</strong> (tarifs HT) :</p>
<ul>
<li><strong>1500€ une fois + 20€/mois</strong> (maintenance, agent IA pour modifier le site, rapport SEO mensuel), sans engagement</li>
<li><strong>89€/mois engagé 12 mois</strong>, mêmes services</li>
</ul>
<p>Inclus dans les deux : hébergement, nom de domaine, SEO, indexation IA (ChatGPT, Gemini, Perplexity), support.</p>
<p>Si la démo vous plaît, je la mets en ligne sur votre nom de domaine cette semaine. Sinon, dites-moi ce qu'on ajuste.</p>
{SIGNATURE_HTML}
</div>
</body>
</html>
"""


def word_count(txt: str) -> int:
    # Count words in body (between "Bonjour," and signature)
    m = re.search(r"Bonjour,\s*\n(.*?)\nAnto\n", txt, re.DOTALL)
    if not m:
        return len(txt.split())
    return len(m.group(1).split())


def rebrand_one(slug: str, pages_url: str) -> tuple[bool, str]:
    """Returns (changed, info)."""
    client_dir = DIST / slug
    email_txt = client_dir / "email.txt"
    if not email_txt.exists():
        return False, "no email.txt"

    old = email_txt.read_text(encoding="utf-8")
    if SPEEDPOST_SIGNATURE_MARK in old:
        return False, "already SpeedPost"

    parsed = parse_old_email(old)
    if not parsed["subject"]:
        return False, "no subject parsed"

    accroche = shorten_accroche(parsed["accroche"])
    new_txt = build_email_txt(parsed["subject"], accroche, parsed["highlight"], pages_url)
    new_html = build_email_html(parsed["subject"], accroche, parsed["highlight"], pages_url)

    # Backup
    (client_dir / "email.menghi.txt.bak").write_text(old, encoding="utf-8")
    email_html = client_dir / "email.html"
    if email_html.exists():
        (client_dir / "email.menghi.html.bak").write_text(email_html.read_text(encoding="utf-8"), encoding="utf-8")

    email_txt.write_text(new_txt, encoding="utf-8")
    email_html.write_text(new_html, encoding="utf-8")

    wc = word_count(new_txt)
    return True, f"OK ({wc} words, subj: {parsed['subject'][:50]})"


def main():
    urls = load_pages_urls()
    print(f"Found {len(urls)} clients with pages_url")
    for slug in sorted(urls):
        changed, info = rebrand_one(slug, urls[slug])
        flag = "✓" if changed else "—"
        print(f"  {flag} {slug}: {info}")


if __name__ == "__main__":
    main()
