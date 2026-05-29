# Recherche — Yuna Concept by Léa (Biguglia)

## 1. Synthèse business

- **Activité :** Salon de coiffure + Institut de massages + Réflexologie/Énergétique chinoise. Concept 3-en-1 unique en Haute-Corse.
- **Propriétaire :** Léa Ferrier — coiffeuse depuis 15 ans, praticienne en réflexologie et énergétique chinoise. Fondatrice de ce concept intégratif.
- **Cible :** Femmes (et hommes) à la recherche d'un espace de bien-être global, sensibles au naturel et à l'authenticité. Clientèle locale Biguglia/Bastia, probablement 25-55 ans. Pas de saisonnalité marquée (services réguliers + touristique en été).
- **Proposition de valeur :**
  1. Concept cocon 3-en-1 inédit : coiffure naturelle + massages + réflexologie dans un même lieu de soin
  2. Produits 100% naturels Natulique (95-100% naturel, colorations, soins) — démarche éco-responsable
  3. Accueil chaleureux et personnalisé, "comme à la maison", 100% recommandé par les clients
- **Ton & image de marque :** Cocon, bien-être, naturel, bienveillant, intime. Ni salon standard ni spa froid : un lieu de soin holistique à taille humaine.
- **Localisation :** Espace Artium, route d'Ortale, 20620 Biguglia (Haute-Corse). Zone commerciale structurée (Espace Artium), accessible, au nord de Bastia.
- **Note Google :** 5/5 sur 13 avis (100% cinq étoiles, zéro négatif)
- **Note Planity :** 4.9/5 sur 77 avis (accueil 5.0, propreté 5.0, atmosphère 4.9, qualité 4.9)
- **Horaires :** Mardi–Samedi 09:00–18:00 | Dimanche et Lundi Fermés
- **Réservation :** Planity → https://www.planity.com/yuna-concept-by-lea-20620-biguglia
- **Contact :** Téléphone **06 63 80 98 97** (confirmé sur le chèque cadeau du salon, sur rendez-vous). Présence Facebook (page ID 113144600870122). Réservation Planity.
- **Logo / identité :** wordmark manuscrit "Yuna concept by Léa", tagline officielle "coiffure, hair spa et reflexologie". Motif récurrent : **arbre de vie** (découpe bois laser). Carte de visite et chèque cadeau en terracotta + or.
- **Site actuel :** yuna-concept-by-lea.webia.com (inaccessible lors du fetch — site webia probablement inactif ou basique)

---

## 2. Contenu exploitable

### Résumés / descriptions extraites

1. **Présentation de Léa (Planity)** : "Coiffeuse depuis 15 ans et praticienne en réflexologie en énergétique chinoise. Je vous propose un cocon 100% bien être en utilisant des produits naturels de la marque Natulique." — Source : planity.com/yuna-concept-by-lea-20620-biguglia

2. **Concept produit Natulique** : Shampooings, soins, colorations et poudres de décoloration entre 95% et 100% à base d'ingrédients naturels. Engagement éco-responsable et santé capillaire authentique. — Source : planity.com

3. **Témoignage client (Planity, 5★)** : "Au top comme d'habitude" — client régulier, sous-entend fidélisation forte et constance de la qualité.

4. **Témoignage client (Planity, 5★)** : "Accueil génial, très gentille et très professionnelle !" — Source : planity.com

5. **Témoignage client (Planity, 5★)** : "Très contente" — client satisfait, retour positif concis.

6. **Contexte agrégateur (Planity, note synthèse)** : Note globale 4.9/5 sur 77 avis. Accueil et propreté notés 5.0/5 — deux axes differenciants majeurs perçus par les clients. Source : planity.com

### Éléments différenciants

- **Concept 3-en-1 unique dans la zone** : coiffure naturelle + massages (ayurvédique Shiro-Shampi, soins corps) + réflexologie plantaire/palmaire/cranio-faciale. Rare dans la zone Bastia/Biguglia.
- **Démarche 100% naturelle** : seule praticienne certifiée Natulique identifiée dans la région (marque professionnelle danoise 95-100% naturelle).
- **Head Spa & Hair Spa rituels** : prestations tendance (purifiante, hydratante, réparatrice) avec bain vapeur, massage crânien, brushing — durée 1h à 2h+, format rituels premium.
- **Réflexologie et énergétique chinoise** : positionnement bien-être holistique peu commun en salon de coiffure standard. Foot 65€/h, hand 30€/20min, facial 45€/40min, complet 90€/1h30.
- **Note parfaite Google** : 13 avis, 13 x 5★ — légitimité et confiance absolues dans la zone.
- **Léa, 15 ans d'expérience** : expertise double (coiffure + thérapies douces), figure de confiance, prénom mis en avant dans le nom de marque ("by Léa").

---

## 3. Assets visuels

### Instructions de téléchargement pour l'orchestrateur

Exécuter le script groupé suivant depuis `/Users/antocreadev/Developer/menghi_computer_science/` :

```python
import sys; sys.path.insert(0,'.')
from tools.image_dl import download

SLUG = "yuna-concept-by-lea-l5uktyve"
OUT = f"dist/{SLUG}/site/assets/images"

assets = [
    # PRIORITÉ 1 — Photo Google Maps réelle du commerce (HD)
    (
        "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFak6LVA1Lbx0jJTEa9WghMsmqONyARGIgCQNpo3khEYLAvzoke6dhftKudoRyWAXMps0DzjNTFeq47nsmYk_130_0CBX2Stz_PNWsn1use6sKonFnLLRP0FCmQMGmVjP4QYotcdg=w2400-h1800-k-no",
        "hero-yuna-concept-gmaps"
    ),
]

for url, hint in assets:
    result = download(url, OUT, hint)
    print(f"OK: {result}" if result else f"ERR: {hint}")
```

### Table des assets — TÉLÉCHARGÉES (6 vraies photos HD du salon, via Planity Cloudinary)

| Fichier local | Description réelle (vue par l'orchestrateur) | Usage recommandé |
|---|---|---|
| `./assets/images/salon-01.jpg` | **Espace coiffure** : mur accent terracotta, miroir baroque doré, fauteuil noir, bac de lavage, chariot, produits Natulique, sol carreaux de ciment beige, déco arbre de vie | Section Coiffure, hero possible |
| `./assets/images/salon-02.jpg` | **Identité de marque** : chèque cadeau + carte de visite (logo manuscrit terracotta/or), arbre de vie bois découpé, plantes vertes, mur terracotta | Section marque / cadeau, détail identité |
| `./assets/images/salon-03.jpg` | **Gamme Natulique** : rangée de flacons bio certifiés sur étagère bois + serviettes noires roulées | Section produits naturels / engagement |
| `./assets/images/salon-04.jpg` | **Cabine massage (jour)** : papier-peint feuilles tropicales beige/terracotta/sauge, table de massage, échelle déco guirlande, tapis jute, serviette terracotta | Section massages / réflexologie |
| `./assets/images/salon-05.jpg` | **Cabine massage (cocon bougies)** : ambiance chaude bougies + guirlande lumineuse, table de massage drapée, coussins — MONEY SHOT cocon | Hero ou section bien-être (money shot) |
| `./assets/images/salon-06.jpg` | **Head Spa / Hair Spa signature** : bac inclinable LED bleu, cascade d'eau sur cheveux, ambiance tamisée — rituel signature | Section Head Spa (geste UI fort, accent bleu spa) |

Note : la photo Google Maps `premiere_image` renvoie 403 au download direct (signature lh3 expirée) — on a 6 vraies photos Planity HD, largement suffisant. **Aucun Unsplash nécessaire.**

### PALETTE RÉELLE OBSERVÉE (à respecter par le designer)

Les photos révèlent l'identité visuelle réelle du salon (NE PAS partir sur sauge-green-first comme suggéré au §4 ci-dessus) :
- **Terracotta / sienne brûlée** (mur accent, towels, logo) : couleur signature dominante
- **Bois chaud naturel** (étagères, table, échelle, arbre de vie découpé)
- **Crème / ivoire** (murs clairs, carreaux de ciment)
- **Or / laiton** (miroir baroque, logo, détails)
- **Vert sauge / plantes** (botanique, feuillages tropicaux) : accent secondaire
- **Bleu Head Spa** (LED du bac) : accent ponctuel réservé à la section Head Spa
- Matières : bois, jute/rotin, bougie, botanique tropical, eau. Ambiance cocon chaud bohème-naturel, PAS spa clinique froid.

### Notes sur les photos manquantes

- La page Planity ne rend pas les URLs d'images extractables via WebFetch (JavaScript rendu côté client).
- Le site webia.com était inaccessible (ECONNREFUSED).
- La page Facebook (113144600870122) a renvoyé un contenu vide (authentification requise pour voir les posts/photos).
- **Recommandation** : lors du build, chercher la page Instagram de Léa en cherchant `@yunaconcept` ou `@yuna_concept_biguglia` et récupérer l'og:image du profil. Chercher aussi sur Google Maps la galerie photos de l'établissement (ChIJSYk7be871xIRr1El5UKtyvE).

### Images complémentaires Unsplash (fallback, uniquement si < 3 photos réelles HD)

Avec seulement 1 photo réelle confirmée, les images Unsplash suivantes peuvent compléter (jamais en hero) :

| # | URL | Description | Pertinence |
|---|-----|-------------|------------|
| F1 | https://images.unsplash.com/photo-1560066984-138dadb4c035 | Salon de coiffure lumière naturelle, espace zen | Élevée — coiffure |
| F2 | https://images.unsplash.com/photo-1544161515-4ab6ce6db874 | Massage détente mains professionnelles | Élevée — massage |
| F3 | https://images.unsplash.com/photo-1570172619644-dfd03ed5d881 | Soins du visage, ambiance spa naturelle | Élevée — bien-être |
| F4 | https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388 | Produits capillaires naturels en flacon | Moyenne — produits |

**Règle** : si l'orchestrateur récupère ≥ 3 photos réelles HD du commerce (Google Maps galerie + Facebook + Planity), ignorer les fallback Unsplash.

---

## 4. Signaux pour le designer

- **Archétype suggéré :** `cocon-rituel` — concept bien-être holistique, parcours de soin en 3 étapes (cheveux → corps → réflexologie), ambiance intime et enveloppante. Archétype original à inventer, hors blacklist actuelle.
- **Palette évoquée :**
  - Fond : blanc chaud ou ivoire très pâle (lin naturel) — évoque la pureté Natulique
  - Accent principal : vert sauge cendré (#8FA68A ou équivalent) — nature, plantes, bien-être
  - Accent secondaire : terre rosée / argile (#C4917A) — chaleur, soin, matière naturelle
  - Typographie : contraste délicat serif doux (ex. Cormorant Garamond pour le display) + sans-serif aérien (ex. DM Sans ou Plus Jakarta Sans pour le corps)
  - Eviter : bleu maritime (trop Flibustier), crème+beurre (palette bannie Claude)
- **Ambiance :** Cocon, sérénité, rituel, nature, matière végétale, plantes médicinales, énergétique douce. Ni clinique froid, ni luxe ostentatoire. Petit salon intime et expert.
- **Geste UI singulier suggéré :** Un parcours de soin en 3 "bulles" ou "cercles-pétales" qui s'ouvrent au scroll (coiffure → massages → réflexologie) — chaque pétale révèle une prestation et son univers sensoriel. Référence archétypes possibles : `circular-petal` adapté, ou `rituel-en-trois-actes` (scroll-séquentiel).
- **Références visuelles extérieures à explorer (pour le designer) :**
  - Marque Natulique.com (identité visuelle douce, naturelle, scandinave)
  - Sites de spas coréens / head spa japonais (Head Spa concept trend 2024-2025)
  - Awwwards wellness : studios de yoga ou soins à l'image épurée et sensorielle
