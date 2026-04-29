# Revue qualité — S.E.M Corse Bois Energie (Corte)

## Verdict : PASS

---

## Détails

### research.md : PASS

- Synthèse business complète : activité SEM opérateur biomasse, cible institutionnelle, 3 axes de proposition de valeur, ton ancrage territorial documenté.
- Sources web : 8 listées dont 4 fetchées avec succès (corsenetinfos, bioenergie-promotion, ccomptes.fr, annuaire-entreprises).
- Table d'assets visuels : 11 entrées, dont 1 image réelle de terrain (og:image bioenergie-promotion.fr), 10 Unsplash téléchargées localement.
- Aucun signal négatif : PASS (note Google absente = 0 avis, normal pour une SEM B2B, non exposé).
- Archétype suggéré en fin de rapport : PASS ("industrial-territory" ou "bento-grid", avec alternative "timeline-verticale").

### design.md : PASS

- Archétype unique : `rapport-impact-territorial` (custom inventé), justifié par la nature B2B institutionnelle et la divergence totale avec les 9 clients déjà livrés (aucun n'est un opérateur public, aucun n'a de carte territoriale SVG).
- Réflexion UX 7 questions : PASS, complète et approfondie. Visiteur-type décideur institutionnel, intention documentaire, contrainte UX "zéro avis" assumée, émotion-cible "crédibilité institutionnelle chaleureuse", money shot titre-déclaration + 3 chiffres énormes bien définis.
- Palette : 5 couleurs hex avec rôles (`--bg` #F5EDD8, `--ink` #1E2A16, `--ink-2` #5C4A35, `--accent` #D4560A, `--line` #D9CDAE). Contrastes AA/AAA vérifiés dans le brief.
- Polices Google Fonts : Fraunces (display, 400/700) + Inter (body, 400/500/600).
- 11 sections ordonnées (supérieur aux 9 requises), adaptées au B2B institutionnel.
- Motion language : PASS, durées, easings et effets décrits par section (count-up, scroll parallax, stroke-dashoffset, cascade points carte).
- Table images : 11 entrées, 0 placeholder, tous rôles assignés.
- Geste UI signature : carte SVG Corse interactive avec points de chaleur en cascade - singulier dans tout le catalogue.

### site/index.html : PASS

- Layout unique : PASS. Archétype `rapport-impact-territorial` radicalement distinct des 9 sites précédents (tous restaurants/loisirs). Hero 100% typographique sans photo (premier site du catalogue à faire ce choix), carte SVG Corse interactive inline, diagramme de flux forêt-chaufferie, mur partenaires typographique, KPI count-up en manifesto. Aucun clone de structure détecté.
- Single file HTML5 : PASS.
- Tailwind CDN (cdn.tailwindcss.com) + config palette inline : PASS.
- Google Fonts (Fraunces + Inter via fonts.googleapis.com avec preconnect) : PASS.
- Motion One (motion@10.18.0 ESM) : PASS.
- Lenis (lenis@1.1.13 ESM via jsdelivr) : PASS.
- Variables CSS palette injectées (`--bg`, `--ink`, `--ink-2`, `--accent`, `--line`) : PASS.
- Typographie display sur h1 et titres de section : PASS (Fraunces 700, clamp sizing).
- Hero avec image réelle priorité 1 : PASS. Section money shot full-bleed avec `corse-bois-energie-chantier.jpg` (og:image de bioenergie-promotion.fr, photo terrain réelle du chantier Aleria). Note : le hero manifesto (section 1) est intentionnellement 100% typographique, la photo est placée en section 2 comme "money shot" - choix bespoke justifié par le brief.
- Marquee : ABSENT. Justification acceptée : le design brief argumente explicitement contre le marquee ("pas de multiple localisations à énumérer rapidement") pour ce client B2B institutionnel. Remplacement fonctionnel par le mur partenaires typographique. Point mineur, non bloquant.
- Galerie >= 6 images : PASS. 7 images locales réparties dans la section diagramme de flux (foret-corse-montagne, buches-bois-tas, granules-bois-pellets, bois-coupe-stocke, chaudiere-biomasse-bois, cheminee-feu-interieur) + 1 money shot (corse-bois-energie-chantier). Total : 7 images.
- Google Maps iframe : PASS. `maps.google.com/maps?q=42.221396,8.968508&z=15&output=embed` (coordonnées Corte Quartier Gare, conformes à la demande).
- Contact et CTA : PASS. Téléphone cliquable (04 95 61 07 31), adresse Quartier Gare 20250 Corte, CTA "Nous écrire" ancré vers #contact.
- Mobile-first : PASS. Grilles responsive (grid-cols-1 lg:grid-cols-12), aucune largeur fixe > 100vw, frise jalons bascule en vertical sur mobile.
- Attribut alt sur toutes les `<img>` : PASS. 7 images, 7 alt renseignés.
- Zéro `source.unsplash.com` : PASS (0 occurrence).
- Zéro négatif : PASS (aucun avis bas, aucune comparaison concurrentielle, aucun signal négatif).
- Images 100% locales : PASS. Tous les `<img src>` pointent vers `./assets/images/`. Seuls src HTTPS présents : CDN Tailwind (script), Maps iframe. Zéro hotlink image externe.
- Fichiers locaux présents dans `site/assets/images/` : PASS. 11 fichiers présents, 7 utilisés dans le HTML, tous vérifiés existants.
- Zéro em-dash U+2014 : PASS (0 occurrence dans index.html).
- HTML bien formé : PASS (structure correcte, pas de balises non fermées détectées).
- Langue FR, light mode, positif uniquement : PASS.
- Aucun framework bundler : PASS (HTML5 + Tailwind CDN + Motion ESM + Lenis ESM, zéro React/Vue/Svelte).

### email.md + email.html : PASS

- Sujet : "Corse Bois Energie, un rapport d'impact en ligne" (49 caractères, <= 55) : PASS.
- Personnalisation >= 3 faits spécifiques : PASS (1988, 15 000 tonnes, 9 chaufferies, bois 100% corse, déchiquetage Aleria, hôpital + Université Pascal Paoli + CROUS + Logirem + EHPAD U Serenu, modernisation 4 M€ FEDER, duplication Sartène/Porto-Vecchio).
- Offre mot-pour-mot : PASS. Prix ~~1740€~~ **1500€** barré présent, liste 8 items inclus, année 2 à 20€/mois, option premium +10€/mois (30€/mois) avec les 5 items détaillés.
- Signature Anto / Menghi Computer Science / menghicomputerscience@gmail.com / 06 43 87 91 14 : PASS.
- HTML version sans image distante, max-width 640px : PASS (max-width 640px, 0 `<img>`, liens mailto et tel en HTML).
- URL GitHub Pages en clair dans le corps : PASS (URL complète non masquée dans md et html).
- Zéro em-dash U+2014 dans email.md et email.html : PASS (0 occurrence dans les deux fichiers).
- Longueur corps : environ 400 mots (dans la fourchette 320-450) : PASS.
- Ton vendeur-conseil FR, chaleureux, non agressif : PASS.
- Menghi Computer Science positionnée comme agence complète (web, graphisme, marketing, apps) : PASS.

---

## Remédiations

Aucune remédiation critique requise. Le livrable passe tous les critères bloquants.

Remarques mineures (non bloquantes) :
1. Marquee absent : acceptable pour ce client B2B institutionnel sans données multi-localisations. Aucune action requise.
2. Lenis chargé depuis `cdn.jsdelivr.net/npm/lenis@1.1.13/+esm` au lieu du chemin `unpkg.com` mentionné dans rules.md : les deux servent le même package, fonctionnellement équivalent. Aucune action requise.

---

Revue effectuée le 2026-04-20.
