# Brief — Étape 5 : Revue qualité (QA gate)

**Agent :** `menghi-reviewer`
**Livrable :** `dist/<slug>/review.md` (PASS ou FAIL avec remédiations)
**Pré-requis :** lire `workflows/rules.md`, lire tous les livrables du client

## Objectif

Valider ou rejeter la sortie d'un client avant de le marquer `done`. Refuser sans pitié ce qui n'atteint pas le bar premium 2025-2026.

## Checklist stricte

### `research.md`
- [ ] Synthèse business complète (activité, cible, proposition de valeur, ton)
- [ ] Au moins 3 sources web citées avec URL
- [ ] Table d'assets visuels avec ≥ 4 entrées
- [ ] Aucun signal négatif (note basse, avis 1-2★, critique)
- [ ] Archétype suggéré en fin de rapport

### `design.md`
- [ ] Archétype unique + justification
- [ ] Palette ≥ 5 couleurs hex avec rôles
- [ ] Paire de polices Google Fonts nommée (display + body)
- [ ] 9 sections listées et ordonnées
- [ ] Language motion décrit (durée, easing, effets par section)
- [ ] Table image→rôle avec ≥ 6 entrées (idéalement 0 placeholder)

### `site/index.html`
- [ ] **Layout unique par client** : la structure (archétype, ordre des sections, traitement du hero, nav, rythme visuel) diverge clairement des autres sites du catalogue. FAIL si le site ressemble à un template 9-sections générique identique à d'autres clients.
- [ ] **CLARTÉ AVANT CONCEPT** (incident MOOD 2026-05-29) : test « 2 secondes » : le hero énonce-t-il EN CLAIR l'activité + la ville ? Les sections ont-elles des titres explicites (Prestations, Galerie, Infos/Horaires) ? Le téléphone/CTA de réservation est-il trouvable immédiatement (header + footer + barre mobile) ? **FAIL** si le hero repose sur une interaction à deviner (slider before/after, curseur-pinceau, scrolljack) au lieu d'un message clair, si les sections sont numérotées cryptiquement (« N°01/N°02 ») sans titre, si des « codes » de métier remplacent les libellés, ou si la page est globalement perçue comme « trop complexe / on comprend rien ». L'originalité ne justifie jamais la confusion.
- [ ] Un seul fichier, se charge en double-clic
- [ ] **Tailwind PRÉ-COMPILÉ** présent : `<link rel="stylesheet" href="./tailwind.css"/>` ET aucune référence à `cdn.tailwindcss.com`. FAIL si le CDN play est utilisé.
- [ ] **Tailwind RÉELLEMENT COMPILÉ (pas purgé)** : `wc -c site/tailwind.css` > 8000 (site riche > 12000) ET `grep -c '\.flex{' site/tailwind.css` ≥ 1 ET `grep -c 'bg-accent\|text-ink' site/tailwind.css` ≥ 1. Un CSS ~5KB qui "existe non vide" mais ne contient que le reset preflight = PURGE RATÉE (content path mal résolu) = page sans style = **FAIL**. Incident 2026-05-29 Ranch l'Indianna : CSS 5.2ko avait faussement PASS car on vérifiait seulement l'existence du fichier.
- [ ] **Contenu visible par défaut (règle durcie anti-scroll-hijack)** : le pattern PRÉFÉRÉ et suffisant est `[data-reveal]{opacity:1;transform:none}` (contenu toujours affiché, zéro masquage en attente de scroll, zéro dépendance Motion). C'est un **PASS** : ne JAMAIS exiger de réintroduire `.js-ready [data-reveal]{opacity:0}` + `@keyframes autoreveal` + `inView` quand le contenu est déjà visible par défaut. FAIL UNIQUEMENT si `[data-reveal]{opacity:0}` est inconditionnel (ou conditionné `.js-ready` sans filet `autoreveal`) → risque de page vide si JS échoue. Réf : `feedback_no_scroll_hijack.md` (incidents Horizon Coiffure 2026-05-29, 2 plaintes).
- [ ] **Filet anti-zéro sur les compteurs** : `grep -oE 'class="count"[^>]*>[^<]*<' index.html` ne doit montrer AUCUN `>0<` ni `>0,0<`. La valeur de repos doit être la vraie donnée (cohérente avec `data-to`), pas `0`. Un compteur qui n'anime que depuis `0` affiche « 0 » si `inView` ne se déclenche pas (section déjà visible au chargement) ou si Motion est bloqué → lu comme « données manquantes » = **FAIL**. Incident 2026-05-29 espace-jc-coiffure. Vérifier aussi au screenshot que les stats affichent bien leur vraie valeur.
- [ ] **Pas de voile opaque de révélation** : FAIL si un overlay (`div`/`::before`/`::after` en `position:fixed|absolute; inset:0`) a une opacité de fond > ~0.2 ET dépend d'une classe JS (`.opened`, `.revealed`, `.js-ready ... transform`) pour se retirer (loadveil plein écran, light-veil par section, veil image opaque). Ces voiles cachent tout le contenu si le JS tarde/échoue → page illisible. Vérifier au **rendu screenshot** (hero + 1 section interne lisibles, sans filtre laiteux). Incident 2026-05-29 Delphine Beauté.
- [ ] Google Fonts intégrées. **Motion One OPTIONNEL** (pas requis) : un site quasi-statique sans aucun import Motion est un PASS valide (préféré depuis la règle anti-scroll-hijack). Si Motion est présent, uniquement `inView`/`animate` pour micro-interactions one-shot NON liées au scroll.
- [ ] **SCROLL NATIF** : `grep -ci 'lenis' index.html` doit être 0 hors commentaire (FAIL si Lenis instancié : `new Lenis`, `lenis.raf`). AUCUN appel `scroll((p)=>...)` / `scroll(animate(...))` de Motion (effets scroll-linked interdits : parallaxe, stroke scrubbé). Le geste UI signature doit se déclencher via **hover/click** (interaction), ou via un `IntersectionObserver` standard de type scroll-spy (highlight de nav active), JAMAIS via un effet scrubbé sur la position de scroll. Incident 2026-05-29 Horizon Coiffure (2 plaintes : même les reveals `inView` masquant le contenu ont été perçus comme « scroll cassé »).
- [ ] **Pas de grand SVG dessiné main en hero / premier plan** : inspecter le hero et les sections principales. FAIL si un `<svg>` inline sert d'illustration/scène plein écran, de fond de hero, ou de money shot (grande largeur/hauteur, `viewBox` large, paths d'illustration). SVG tolérés UNIQUEMENT en petits décors : icônes (<64px), dividers/filets fins, patterns de fond subtils, micro-accents. Le premier plan doit être une vraie photo du commerce.
- [ ] **Le site remplace le service existant : aucune référence** : `grep -iE 'planity\|treatwell\|fresha\|thefork\|lafourchette\|opentable\|zenchef\|guestonline\|resengo\|ubereats\|uber eats\|deliveroo\|just eat\|wix\|linktree' index.html` doit être 0. FAIL si un service de réservation/RDV/commande/présence-web tiers est lié ou cité comme CTA. Réservation/contact doivent être natifs (`tel:`, email, formulaire, ancre interne). Maps iframe + liens réseaux sociaux en footer restent OK.
- [ ] Palette CSS variables injectée
- [ ] Typographie display appliquée au h1 et aux titres de section
- [ ] Hero avec image réelle priorité 1 (vérifier le `src`)
- [ ] **CONTENU VISUEL DES IMAGES vérifié à l'œil** (incident Soldani 2026-05-29) : ouvrir CHAQUE image de `assets/images/` avec l'outil Read (vision) et confirmer que (a) son sujet correspond à son rôle et à son `alt`/sa légende (un intérieur de salon n'est PAS « un village »), (b) toutes les photos partagent un registre cohérent (clair/chaud/candide vs sombre/N&B/barbershop). **FAIL** si une image ment sur la légende (lieu/sujet faux) ou si l'ensemble est tonalement disparate. La QA texte ne suffit pas : un `src` valide peut pointer une image au mauvais contenu.
- [ ] Marquee : **conditionnel au design brief**. Si le brief prévoit un marquee, il doit être fonctionnel (boucle sans couture). Si le brief ne le prévoit PAS (ex. archétype lent/digne, secteur sensible), son ABSENCE n'est PAS un FAIL (cf. `02_design.md:102` « optionnel », `03_build.md:104`). Ne JAMAIS faire échouer un site parce qu'il manque un marquee : forcer un marquee partout = tell template, contraire à la règle « layout radicalement unique » (ligne 29).
- [ ] Section photo : **forme et nombre dictés par l'archétype, pas un seuil fixe**. Une galerie ≥ 6 images est souhaitable quand le contenu s'y prête (le visiteur veut voir le lieu : restaurant, hébergement, accueil de personnes). Mais le nombre exact n'est PAS imposé : un archétype radical (`wordmark-xxl`) ou un manque de vraies photos peut justifier moins. FAIL uniquement si les images disponibles sont sous-exploitées (ex. 8 photos réelles dispo mais seulement 2 montrées). Ne pas padder avec du stock générique juste pour atteindre 6.
- [ ] Google Maps iframe présent (`lat,lng` cohérents)
- [ ] Horaires structurés, CTA principal ancré
- [ ] **Source de vérité des faits = `clients.csv`, JAMAIS `research.md`.** Pour valider horaires / adresse / téléphone / note, comparer le site au CSV (`horaires_ouverture`, `adresse_complete`, `telephone`, `note`), pas au research.md. Le research.md est enrichissement web et peut contenir des faits scrapés FAUX (mauvaise fiche, doublon Fresha/Planity, horaires périmés). Ne JAMAIS FAIL un site parce qu'il diverge du research.md sur un fait factuel : si conflit, le site doit suivre le CSV et c'est le research.md qui a tort. Incident 2026-05-29 Stellu Coiff : faux FAIL « lundi fermé » (research.md erroné) alors que le CSV dit lundi ouvert 9h-19h.
- [ ] Mobile-first (vérifier qu'aucune largeur fixe > 100vw)
- [ ] `alt` présent sur toutes les `<img>`
- [ ] **Aucune URL `source.unsplash.com/...`**
- [ ] **Aucun négatif** dans le contenu
- [ ] **Toutes les images sont locales** : chaque `<img src>` pointe sur `./assets/images/...` (ou `placehold.co` placeholder). Zéro hotlink `lh3.googleusercontent.com`, `images.unsplash.com`, `tourinsoft.eu`, etc. dans le HTML livré.
- [ ] `dist/<slug>/site/assets/images/` existe et contient effectivement les fichiers référencés par `index.html`.
- [ ] **Zéro caractère `—` (tiret cadratin U+2014)** dans le texte du site : `grep -c $'\u2014' dist/<slug>/site/index.html` doit retourner 0.

### `email.txt` + `email.html`
- [ ] Sujet ≤ 55 caractères, spécifique
- [ ] Au moins 2 éléments spécifiques au client cités dans les bénéfices
- [ ] Offre reproduite **mot pour mot** (rebrand 2026-05-29) : **Formule A** = 1500€ HT une fois + 20€/mois HT (maintenance + agent IA modif langage naturel + rapport SEO mensuel), sans engagement ; **Formule B** = 89€/mois HT engagé 12 mois, mêmes services. (PAS de prix barré 1740€, PAS d'« année 2 », PAS d'option premium +10€/mois : ce sont des reliquats de l'ancienne offre Menghi, désormais bannis.)
- [ ] Corps **180-280 mots** (offre + services inclus), FR uniquement
- [ ] **Maquette cadrée** : l'email dit explicitement que le lien est une maquette / un aperçu offert (pour donner le goût et montrer l'intérêt), pas un produit facturé
- [ ] **Services explicités** : rapport mensuel des visites, stratégie SEO, agent IA pour modifier le site, garantie première page Google (recherches locales naturelles + IA). Les 4 doivent être présents et compréhensibles.
- [ ] **Flexibilité explicitée** : prix discutable + paiement échelonnable (en plusieurs fois) + « on s'adapte / équipe humaine »
- [ ] **Garantie Google crédible** : formulée sur des recherches locales pertinentes, jamais comme « 1er partout / sur tous les mots-clés »
- [ ] Émetteur/signature rebrand : Anto / SpeedPost.fr / contact@speedpost.fr / webagentic.speedpost.fr. **Aucune** trace de l'ancienne marque (Menghi Computer Science, menghicomputerscience@gmail.com, 06 43 87 91 14)
- [ ] URL GitHub Pages en clair dans le corps (pas de lien masqué)
- [ ] Le numéro du commerce client (ex. 06 66 63 88 21) **n'a pas à figurer** dans l'email : c'est un outreach VERS le commerçant, le CTA est de répondre à Anto, pas d'appeler son propre numéro
- [ ] HTML version sans image distante, ≤ 640px max-width
- [ ] **Zéro caractère `—` (tiret cadratin U+2014)** dans `email.txt` et `email.html` : `grep -c $'\u2014' dist/<slug>/email.txt dist/<slug>/email.html` doit retourner 0 pour les deux fichiers.

## Verdict

Écrire `dist/<slug>/review.md` ainsi :

```markdown
# Revue qualité — <Nom>

## Verdict : PASS | FAIL

## Détails
- research.md : <PASS|FAIL> — <commentaire>
- design.md : <PASS|FAIL> — <commentaire>
- site/index.html : <PASS|FAIL> — <commentaire>
- email : <PASS|FAIL> — <commentaire>

## Remédiations (si FAIL)
1. <action concrète, ciblée, re-déléguable>
2. ...
```

## Règles

- **FAIL** si un seul point critique échoue (images réelles absentes, offre mal rendue, template basique, source.unsplash.com présent, négatif détecté).
- **PASS** uniquement si tous les points essentiels passent. Les remarques mineures (typo, micro-spacing) peuvent être listées mais ne provoquent pas de FAIL.
- Proposer des remédiations **actionnables par un sous-agent** (indiquer lequel ciblé).

## Sortie

Retourner à l'orchestrateur :
- verdict PASS / FAIL
- 1-3 remédiations clés si FAIL
- chemin `review.md`
