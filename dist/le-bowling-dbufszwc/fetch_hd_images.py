#!/usr/bin/env python3
"""
Script de récupération d'images HD pour Le Bowling (Sagone).
Usage : python3 dist/le-bowling-dbufszwc/fetch_hd_images.py
"""
import sys
import os
sys.path.insert(0, '/Users/antocreadev/Developer/menghi_computer_science')

from pathlib import Path
from tools.image_dl import download

OUT_DIR = Path('/Users/antocreadev/Developer/menghi_computer_science/dist/le-bowling-dbufszwc/site/assets/images')

# Fichiers Unsplash à supprimer
UNSPLASH_TO_DELETE = [
    # Aucun Unsplash confirmé pour l'instant - on vérifie lesquels sont Unsplash
]

# Images à télécharger
IMAGES = [
    # ── PRIORITÉ 1 : Google Maps CSV en haute résolution ──────────────────────
    {
        "url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEv82oq0fZh3_DsHy1Dh4uNFpm6cdRaZqrqOBC0a7h95OHKgW1N9VKzhYp41qX-VeEoKSGyxi56KurSANQKf2P5JLttTw6s6kPob95CleEVPzzSv1rLVxhG6tRzMfZWGI2ZOoeV=w2400-h1800-k-no",
        "hint": "gmaps-thumbnail-hd-le-bowling",
        "categorie": "HERO",
        "desc": "Google Maps thumbnail HD (w2400) — façade / vue extérieure"
    },
    {
        "url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAECV9IjWY1epurOC_GWt6YflLbaNqkXykRfBfMwGwRiG8Ik7W92oZnPaToHcTwWSX6ttRLYT1t25bNbnJu1utunTPoS9pD80WbMMWzCNQ5e68RUT2udC_e7Mlyl-raPoxr-Dn3O=w2400-h1800-k-no",
        "hint": "gmaps-premiere-image-hd-le-bowling",
        "categorie": "HERO",
        "desc": "Google Maps premiere_image HD (w2400) — vue principale"
    },
    # ── PRIORITÉ 2 : TripAdvisor photo-o (vraies photos du commerce) ──────────
    # Photos officielles du restaurant (galerie principale TripAdvisor)
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/6a/e7/74/le-bowling.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-le-bowling-officiel-1",
        "categorie": "AMBIANCE",
        "desc": "Photo officielle TripAdvisor Le Bowling #1"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/6a/e5/8c/le-bowling.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-le-bowling-officiel-2",
        "categorie": "AMBIANCE",
        "desc": "Photo officielle TripAdvisor Le Bowling #2"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/6a/e7/8d/le-bowling.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-le-bowling-officiel-3",
        "categorie": "AMBIANCE",
        "desc": "Photo officielle TripAdvisor Le Bowling #3"
    },
    # Salade (food)
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/5c/7c/70/belles-salades.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-bowling-salade",
        "categorie": "PLATS-GLACES",
        "desc": "Belles salades — photo TripAdvisor"
    },
    # Soirée / ambiance (photo_o récente 2023-2024)
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/28/7a/4c/20180814-195051-largejpg.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-bowling-soiree-ete",
        "categorie": "AMBIANCE",
        "desc": "Soirée estivale Le Bowling — TripAdvisor 2018"
    },
    # Photos voyageurs récentes (caption = sans titre = photo générique du lieu)
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/c6/b9/c3/caption.jpg?w=1100&h=1100&s=1",
        "hint": "tripadvisor-bowling-voyageur-2024-a",
        "categorie": "PLATS-GLACES",
        "desc": "Photo voyageur récente Le Bowling 2024 A"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/c6/b9/c2/caption.jpg?w=1100&h=1100&s=1",
        "hint": "tripadvisor-bowling-voyageur-2024-b",
        "categorie": "PLATS-GLACES",
        "desc": "Photo voyageur récente Le Bowling 2024 B"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/00/ed/c0/caption.jpg?w=1200&h=1200&s=1",
        "hint": "tripadvisor-bowling-voyageur-2023-a",
        "categorie": "PLATS-GLACES",
        "desc": "Photo voyageur Le Bowling 2023 A"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/00/ed/bf/caption.jpg?w=1100&h=1100&s=1",
        "hint": "tripadvisor-bowling-voyageur-2023-b",
        "categorie": "PLATS-GLACES",
        "desc": "Photo voyageur Le Bowling 2023 B"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/40/30/4e/caption.jpg?w=1100&h=1100&s=1",
        "hint": "tripadvisor-bowling-voyageur-2023-c",
        "categorie": "AMBIANCE",
        "desc": "Photo voyageur Le Bowling 2023 C"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1d/20/5a/caption.jpg?w=1100&h=1100&s=1",
        "hint": "tripadvisor-bowling-voyageur-2022-a",
        "categorie": "PLATS-GLACES",
        "desc": "Photo voyageur Le Bowling 2022 A"
    },
    # Photo avec titre "le-bowling" (probablement glace / cornet)
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/d6/62/57/le-bowling.jpg?w=2400&h=-1&s=1",
        "hint": "tripadvisor-bowling-glaces-panorama",
        "categorie": "PLATS-GLACES",
        "desc": "Le Bowling glaces/panorama — TripAdvisor photo-o"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/45/dc/4a/le-bowling.jpg?w=1400&h=-1&s=1",
        "hint": "tripadvisor-bowling-interieur-1",
        "categorie": "AMBIANCE",
        "desc": "Intérieur Le Bowling — TripAdvisor"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/45/dc/49/le-bowling.jpg?w=1600&h=-1&s=1",
        "hint": "tripadvisor-bowling-interieur-2",
        "categorie": "AMBIANCE",
        "desc": "Intérieur Le Bowling #2 — TripAdvisor"
    },
    {
        "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/e7/5f/55/le-bowling.jpg?w=2200&h=-1&s=1",
        "hint": "tripadvisor-bowling-terrasse",
        "categorie": "AMBIANCE",
        "desc": "Terrasse Le Bowling — TripAdvisor"
    },
]

# Fichiers actuels à supprimer s'ils sont Unsplash ou de mauvaise qualité
# (les 4 restaurantguru sont des vraies photos, on les garde si elles sont bonnes)
# On liste d'abord les fichiers existants
existing = list(OUT_DIR.glob('*.jpg')) + list(OUT_DIR.glob('*.png')) + list(OUT_DIR.glob('*.webp'))
print(f"\n=== Fichiers existants ({len(existing)}) ===")
for f in existing:
    size = f.stat().st_size
    print(f"  {f.name} — {size:,} octets ({size//1024} Ko)")

print(f"\n=== Téléchargement de {len(IMAGES)} images HD ===\n")

results = []
for img in IMAGES:
    try:
        path = download(img["url"], OUT_DIR, img["hint"])
        size = path.stat().st_size
        width_est = "HD" if size > 200_000 else ("OK" if size > 50_000 else "PETIT")
        status = f"OK ({size:,} octets / {size//1024} Ko) [{width_est}]"
        results.append({"path": path, "img": img, "ok": True, "size": size})
        print(f"  [OK] {path.name} — {size//1024} Ko — {img['categorie']} — {img['desc']}")
    except Exception as e:
        results.append({"path": None, "img": img, "ok": False, "error": str(e)})
        print(f"  [ECHEC] {img['hint']} — {e}")

print(f"\n=== Résumé ===")
ok = [r for r in results if r["ok"] and r["size"] > 30_000]
small = [r for r in results if r["ok"] and r["size"] <= 30_000]
fail = [r for r in results if not r["ok"]]
print(f"  Réussies (>30 Ko) : {len(ok)}")
print(f"  Trop petites (<30 Ko) : {len(small)}")
print(f"  Échouées : {len(fail)}")

# Supprimer les petites images téléchargées (probablement des erreurs)
for r in small:
    if r["path"] and r["path"].exists():
        r["path"].unlink()
        print(f"  [SUPPRIMÉ] {r['path'].name} (trop petit)")

# Analyser les fichiers existants
print(f"\n=== Analyse fichiers existants (Unsplash ?) ===")
for f in existing:
    # Les restaurantguru sont des vraies photos — on les garde
    # Le thumbnail original (basse résolution) est remplacé par la version HD
    print(f"  {f.name}")

print(f"\n=== Fichiers finaux dans {OUT_DIR} ===")
final = sorted(OUT_DIR.glob('*'))
for f in final:
    if f.is_file():
        size = f.stat().st_size
        print(f"  {f.name} — {size//1024} Ko")
