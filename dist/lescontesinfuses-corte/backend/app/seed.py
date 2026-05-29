"""Seed the database from frontend data files (values copied in Python).

Run: python -m app.seed
"""
from __future__ import annotations
import asyncio
from datetime import datetime, timedelta, timezone
from sqlalchemy import select, delete
from .database import AsyncSessionLocal, engine, Base, init_db
from .models.catalog import Book, Genre, Event, Boisson, Artisan, Product
from .models.customer import Customer
from .models.orders import Order, OrderItem, OrderEvent
from .security import hash_password


GENRES = [
    {"slug": "roman", "label": "Roman", "description": "Fictions contemporaines et grands recits.", "color": "#C77A4F", "icon_key": "BookOpen", "sort_order": 1},
    {"slug": "jeunesse", "label": "Jeunesse", "description": "Albums, contes et premiers romans.", "color": "#8A9876", "icon_key": "Sparkles", "sort_order": 2},
    {"slug": "bande-dessinee", "label": "Bande dessinee", "description": "BD, romans graphiques, mangas.", "color": "#8E6C90", "icon_key": "Palette", "sort_order": 3},
    {"slug": "poesie", "label": "Poesie", "description": "Vers, fragments, recueils.", "color": "#C9A37D", "icon_key": "Feather", "sort_order": 4},
    {"slug": "essai-histoire", "label": "Essai & Histoire", "description": "Pensee, sciences humaines, memoires.", "color": "#7C4F31", "icon_key": "ScrollText", "sort_order": 5},
    {"slug": "polar", "label": "Polar & Thriller", "description": "Frissons, enquetes, suspense.", "color": "#5C3820", "icon_key": "Search", "sort_order": 6},
    {"slug": "beaux-livres", "label": "Beaux-livres", "description": "Photographie, art, voyages.", "color": "#E2B594", "icon_key": "Image", "sort_order": 7},
    {"slug": "corse", "label": "Corse", "description": "Auteurs, paysages et memoire de l'ile.", "color": "#5A6647", "icon_key": "Mountain", "sort_order": 8},
    {"slug": "cuisine", "label": "Cuisine & Art de vivre", "description": "Recettes, jardins, douceurs.", "color": "#C9B0C5", "icon_key": "Coffee", "sort_order": 9},
    {"slug": "nouveautes", "label": "Nouveautes", "description": "Les sorties du moment.", "color": "#C77A4F", "icon_key": "Star", "sort_order": 10},
]

BOOKS = [
    ("murtoriu", "Murtoriu", "Marcu Biancarelli", "corse", 21.0, "#5C3820", ["#5C3820","#3A2014"], "Une plongee incandescente dans une Corse contemporaine.", True, 6, "9782330012345", "2009-03-12", "Actes Sud"),
    ("la-fiera", "La Fiera", "Marcu Biancarelli", "corse", 19.5, "#7C4F31", ["#7C4F31","#4A2D1F"], "Une fresque humaine sur l'ame corse d'aujourd'hui.", False, 4, "9782330023456", "2018-09-05", "Actes Sud"),
    ("plein-soleil", "Plein soleil", "Marie Susini", "corse", 17.0, "#C77A4F", ["#C77A4F","#9A4F2A"], "Roman lumineux d'une grande prosatrice corse.", True, 3, "9782070123456", "1953-01-01", "Gallimard"),
    ("le-sermon-sur-la-chute-de-rome", "Le sermon sur la chute de Rome", "Jerome Ferrari", "corse", 18.5, "#4A2D1F", ["#4A2D1F","#26150C"], "Goncourt 2012. Un village corse comme metaphore.", True, 8, "9782330014127", "2012-08-22", "Actes Sud"),
    ("balco-atlantico", "Balco Atlantico", "Jerome Ferrari", "corse", 16.5, "#8A9876", ["#8A9876","#5A6647"], "Le drame d'un village qui s'imagine refuge.", False, 5, "9782330015432", "2008-04-10", "Actes Sud"),
    ("l-etranger", "L'Etranger", "Albert Camus", "roman", 8.5, "#C9A37D", ["#C9A37D","#7C4F31"], "Le classique absolu : Meursault, l'absurde.", False, 12, "9782070360024", "1942-01-01", "Gallimard"),
    ("la-peste", "La Peste", "Albert Camus", "roman", 10.0, "#9A4F2A", ["#9A4F2A","#5C3820"], "Oran, 1940. Une chronique de la solidarite.", False, 7, "9782070360420", "1947-06-10", "Gallimard"),
    ("la-vagabonde", "La Vagabonde", "Colette", "roman", 9.5, "#8E6C90", ["#8E6C90","#5E456A"], "Une femme, la scene, la liberte.", False, 4, "9782253004936", "1910-01-01", "Le Livre de Poche"),
    ("memoires-d-hadrien", "Memoires d'Hadrien", "Marguerite Yourcenar", "roman", 12.0, "#C77A4F", ["#C77A4F","#9A4F2A"], "La voix d'un empereur. Oeuvre intemporelle.", True, 3, "9782070369218", "1951-01-01", "Gallimard"),
    ("la-petite-fille-de-monsieur-linh", "La Petite Fille de Monsieur Linh", "Philippe Claudel", "roman", 7.5, "#5A6647", ["#5A6647","#3A2014"], "Un vieil homme, un nourrisson, l'exil.", False, 9, "9782253115541", "2005-04-01", "Le Livre de Poche"),
    ("le-petit-prince", "Le Petit Prince", "Antoine de Saint-Exupery", "jeunesse", 9.9, "#E2B594", ["#E2B594","#C77A4F"], "Le conte universel.", False, 15, "9782070612758", "1943-01-01", "Gallimard Jeunesse"),
    ("la-soupe-au-caillou", "La soupe au caillou", "Anais Vaugelade", "jeunesse", 12.5, "#8A9876", ["#8A9876","#C7CDB7"], "Un loup, une marmite, la magie du partage.", False, 6, "9782211056816", "2000-09-01", "Ecole des Loisirs"),
    ("ulysse-from-bagdad", "Ulysse from Bagdad", "Eric-Emmanuel Schmitt", "roman", 8.0, "#7C4F31", ["#7C4F31","#4A2D1F"], "Une odyssee moderne entre l'Irak et l'Europe.", False, 5, "9782253134121", "2008-09-01", "Le Livre de Poche"),
    ("persepolis", "Persepolis (integrale)", "Marjane Satrapi", "bande-dessinee", 27.0, "#26150C", ["#26150C","#150B05"], "L'enfance de l'autrice a Teheran.", True, 4, "9782844141972", "2007-10-01", "L'Association"),
    ("l-arabe-du-futur", "L'Arabe du futur, t.1", "Riad Sattouf", "bande-dessinee", 22.5, "#C9A37D", ["#C9A37D","#7C4F31"], "Une enfance entre Libye, Syrie et France.", False, 5, "9782370730541", "2014-05-22", "Allary"),
    ("tu-appelleras-cendrars", "Tu appelleras Cendrars", "Leo Henry", "polar", 19.0, "#5C3820", ["#5C3820","#26150C"], "Polar litteraire, ombres et lumieres.", False, 3, "9782370492012", "2023-02-15", "Rivages"),
    ("le-mystere-de-la-citadelle", "Le mystere de la citadelle", "Anne-Marie Garat", "polar", 17.5, "#4A2D1F", ["#4A2D1F","#26150C"], "Disparition a Corte. Polar local.", False, 4, "9782742798312", "2021-10-06", "Actes Sud"),
    ("alcools", "Alcools", "Guillaume Apollinaire", "poesie", 7.0, "#8E6C90", ["#8E6C90","#5E456A"], "Le recueil-pivot de la modernite poetique.", False, 6, "9782070300129", "1913-01-01", "Gallimard"),
    ("fureur-et-mystere", "Fureur et mystere", "Rene Char", "poesie", 9.5, "#5A6647", ["#5A6647","#3A2014"], "Poesie de resistance et d'aurore.", False, 4, "9782070321305", "1948-01-01", "Gallimard"),
    ("corse-secrete", "Corse secrete, photographies", "Jean-Andre Bertozzi", "beaux-livres", 39.0, "#C77A4F", ["#C77A4F","#9A4F2A"], "Cent cliches rares.", True, 2, "9782914622334", "2022-11-12", "Albiana"),
    ("atlas-des-sentiers", "Atlas des sentiers de Corse", "Collectif", "beaux-livres", 32.0, "#8A9876", ["#8A9876","#5A6647"], "GR20, Mare e Monti, sentiers oublies.", False, 5, "9782914623012", "2024-03-01", "Albiana"),
    ("cuisine-de-l-ile", "Cuisine de l'ile", "Marie-Antoinette Maupertuis", "cuisine", 24.0, "#E2B594", ["#E2B594","#C77A4F"], "Soixante recettes corses traditionnelles.", False, 6, "9782914624511", "2020-05-04", "Albiana"),
    ("histoire-de-la-corse", "Histoire de la Corse", "Antoine-Laurent Serpentini", "essai-histoire", 28.0, "#26150C", ["#26150C","#150B05"], "Une synthese magistrale.", False, 3, "9782914625019", "2019-09-12", "Albiana"),
    ("lumieres-de-la-mediterranee", "Lumieres de la Mediterranee", "Predrag Matvejevic", "essai-histoire", 14.5, "#7C4F31", ["#7C4F31","#4A2D1F"], "Un breviaire poetique et savant.", False, 4, "9782070425327", "1992-01-01", "Gallimard"),
]

EVENTS = [
    ("dedicace-marcu-biancarelli", "Dedicace : Marcu Biancarelli", "Une rencontre intime avec un grand prosateur corse.", "2026-05-09T18:00:00+02:00", 90, "Les Contes Infuses, Corte", 40, 22, 0, "boutique"),
    ("club-lecture-mai", "Club lecture du mois : Memoires d'Hadrien", "On boit, on lit, on partage. Inscription obligatoire.", "2026-05-16T17:00:00+02:00", 120, "Les Contes Infuses, Corte", 16, 12, 800, "boutique"),
    ("atelier-ecriture-ados", "Atelier d'ecriture pour ados", "Deux heures de jeu litteraire. A partir de 13 ans.", "2026-05-22T14:30:00+02:00", 120, "Les Contes Infuses, Corte", 10, 6, 1200, "boutique"),
    ("soiree-contes-corses", "Soiree contes corses", "Une conteuse, une bougie, des histoires de l'ile.", "2026-05-30T20:30:00+02:00", 90, "Les Contes Infuses, Corte", 50, 31, 500, "boutique"),
    ("lecture-publique-poesie", "Lecture publique : poesie corse", "Hors-les-murs, sur la place. Micro ouvert.", "2026-06-05T18:30:00+02:00", 75, "Place Paoli, Corte", 80, 0, 0, "horsLesMurs"),
    ("concert-acoustique-guitare", "Concert acoustique : guitare seule", "Un set intime, cordes nylon.", "2026-06-12T20:00:00+02:00", 60, "Les Contes Infuses, Corte", 30, 9, 1000, "boutique"),
]

CAFE = [
    ("cafe", "Cafe", "cafe", 250, ["espresso pure origine"], [], "espresso", True),
    ("machiato", "Machiato", "cafe", 250, ["espresso", "tache de lait"], ["lait"], "machiato", False),
    ("cappuccino-catte", "Cappuccino Catte", "cafe", 400, ["espresso double", "lait vapeur", "cacao"], ["lait"], "cappuccino", True),
    ("chocolat", "Chocolat (chaud ou froid)", "cafe", 250, ["cacao maison", "lait", "sucre brun"], ["lait"], "chocolat", False),
    ("chai-catte", "Chai Catte", "cafe", 250, ["the noir", "epices", "lait"], ["lait"], "chai", False),
    ("matcha-latte", "Matcha latte", "cafe", 450, ["matcha", "lait", "sirop d'erable"], ["lait"], "matcha", True),
    ("ube-catte", "Ube Catte", "cafe", 450, ["igname violet", "lait", "miel"], ["lait"], "ube", True),
    ("the-damman", "Thes Damman Freres", "the", 350, ["selection maison"], [], "the", False),
    ("ice-tea", "Ice Tea", "boisson", 350, ["the glace", "citron"], [], "icetea", False),
    ("coca", "Coca-Cola", "boisson", 350, ["33cl"], [], "coca", False),
    ("coca-zero", "Coca Zero", "boisson", 350, ["33cl"], [], "coca", False),
    ("pago", "Pago", "boisson", 350, ["jus de fruit"], [], "pago", False),
    ("eau", "Eau", "boisson", 350, ["50cl"], [], "eau", False),
    ("kombucha-framboise", "Kombucha framboise", "kombucha", 350, ["the fermente", "framboise"], [], "kombucha", False),
    ("kombucha-peche", "Kombucha peche", "kombucha", 350, ["the fermente", "peche"], [], "kombucha", False),
    ("kombucha-fraise", "Kombucha fraise", "kombucha", 350, ["the fermente", "fraise"], [], "kombucha", False),
    ("kombucha-nature", "Kombucha nature", "kombucha", 350, ["the fermente"], [], "kombucha", False),
    ("the-glace-peche", "The glace maison peche", "the-glace", 350, ["the maison", "peche"], [], "iceteaMaison", True),
    ("the-glace-citron", "The glace maison citron", "the-glace", 350, ["the maison", "citron"], [], "iceteaMaison", False),
    ("brownie", "Brownie", "dessert", 400, ["chocolat noir", "noix de pecan"], ["gluten", "oeuf", "lait"], "brownie", False),
    ("cake-du-jour", "Cake du jour", "dessert", 350, ["recette du jour"], ["gluten", "oeuf", "lait"], "cake", False),
    ("cookie-tout-choco", "Cookie tout chocolat", "dessert", 300, ["chocolat noir"], ["gluten", "oeuf", "lait"], "cookie", False),
    ("cookie-matcha-blanc", "Cookie matcha chocolat blanc", "dessert", 300, ["matcha", "chocolat blanc"], ["gluten", "oeuf", "lait"], "cookie", False),
    ("cookie-fleur-de-sel", "Cookie chocolat lait fleur de sel", "dessert", 300, ["chocolat lait"], ["gluten", "oeuf", "lait"], "cookie", False),
]

ARTISANS = [
    ("atelier-si", "Atelier Si", "Calenzana", "Bougies parfumees inspirees du maquis corse."),
    ("maroquinerie-petralba", "Maroquinerie Petralba", "Aleria", "Cuir tanne vegetal, gravures fines."),
    ("terra-forme", "Terra Forme", "Pigna", "Ceramique emaillee a la main."),
    ("tela", "Tela", "Bastia", "Lin lave et impressions textiles."),
    ("saponaria", "Saponaria", "Olmeto", "Saponification a froid."),
    ("apiculture-marchetti", "Apiculture Marchetti", "Soveria", "Apiculteur en Centre-Corse."),
    ("conserves-petra", "Conserves Petra", "Cervione", "Confitures de figues et productions locales."),
]

PRODUCTS = [
    ("bougie-maquis", "Bougie parfumee Maquis", "atelier-si", "bougie", 2800, 12, "Cire vegetale, parfum d'immortelle, ciste, myrte. 50h.", "bougie"),
    ("bougie-chataignier", "Bougie Chataignier", "atelier-si", "bougie", 2600, 8, "Bois chaud, sous-bois. Hommage a la Castagniccia.", "bougie"),
    ("marque-page-cuir-laurier", "Marque-page cuir laurier", "maroquinerie-petralba", "papeterie", 1400, 18, "Cuir tanne vegetal, gravure laurier. 4 coloris.", "marquepage"),
    ("mug-tasse-livre", "Mug ceramique Tasse-Livre", "terra-forme", "ceramique", 3200, 9, "Emaille main, anse en signet.", "mug"),
    ("foulard-lin-constellation", "Foulard lin constellation", "tela", "textile", 4800, 5, "Lin lave, motif Pleiades.", "foulard"),
    ("savon-olive", "Savon huile d'olive corse", "saponaria", "soin", 900, 24, "Saponification a froid, AOC, bergamote.", "savon"),
    ("miel-printemps", "Miel de printemps", "apiculture-marchetti", "epicerie", 1150, 14, "Pot 250g, toutes fleurs Centre-Corse.", "miel"),
    ("confiture-figue", "Confiture de figue", "conserves-petra", "epicerie", 750, 20, "Figues noires de Cervione, sucre de canne. 220g.", "confiture"),
]


async def reset_and_seed():
    await init_db()
    async with AsyncSessionLocal() as db:
        # Wipe in reverse FK order
        for tbl in [
            "order_events", "order_items", "orders", "event_registrations",
            "products", "artisans", "books", "genres", "events", "boissons",
            "customers",
        ]:
            try:
                await db.execute(delete(__import__(f"app.models", fromlist=[tbl])))  # noqa - placeholder
            except Exception:
                pass
        # safer wipe
        from .models.orders import Order, OrderItem, OrderEvent, EventRegistration
        from .models.catalog import Book, Genre, Event, Boisson, Artisan, Product
        from .models.customer import Customer
        for M in [OrderEvent, OrderItem, Order, EventRegistration, Product, Artisan, Book, Genre, Event, Boisson, Customer]:
            await db.execute(delete(M))
        await db.commit()

        # Genres
        genre_objs = {}
        for g in GENRES:
            obj = Genre(**g)
            db.add(obj)
            genre_objs[g["slug"]] = obj
        await db.flush()

        # Books
        for slug, title, author, genre, price, spine, gradient, summary, cdc, stock, isbn, pub, publisher in BOOKS:
            db.add(Book(
                slug=slug, title=title, author=author, isbn=isbn, publisher=publisher,
                year_published=pub[:4], summary=summary,
                genre_id=genre_objs[genre].id if genre in genre_objs else None,
                price_cents=int(price * 100), stock=stock, coup_de_coeur=cdc,
                cover_gradient=gradient, spine_color=spine,
            ))

        # Events
        for slug, title, desc, dt, dur, loc, cap, reg, price, hosted in EVENTS:
            db.add(Event(
                slug=slug, title=title, description=desc,
                starts_at=datetime.fromisoformat(dt),
                duration_min=dur, location=loc, capacity=cap, registered=reg,
                price_cents=price if price else None, hosted_at=hosted, status="published",
            ))

        # Cafe
        for slug, name, cat, price, ing, allerg, img, sig in CAFE:
            db.add(Boisson(
                slug=slug, name=name, category=cat, price_cents=price,
                ingredients=ing, allergens=allerg, image_key=img, signature=sig,
                hot=cat == "cafe",
            ))

        # Artisans + products
        artisan_map = {}
        for slug, name, city, bio in ARTISANS:
            a = Artisan(slug=slug, name=name, city=city, bio=bio)
            db.add(a); artisan_map[slug] = a
        await db.flush()
        for slug, name, artisan_slug, cat, price, stock, desc, img in PRODUCTS:
            db.add(Product(
                slug=slug, name=name, artisan_id=artisan_map[artisan_slug].id,
                category=cat, price_cents=price, stock=stock, description=desc, image_key=img,
            ))

        # Admin user
        admin = Customer(
            email="admin@lescontesinfuses.corsica",
            first_name="Admin", last_name="Contes",
            password_hash=hash_password("admin123"),
            is_admin=True, marketing_consent=False,
        )
        demo = Customer(
            email="client@example.com",
            first_name="Marie", last_name="Demo",
            password_hash=hash_password("client123"),
            is_admin=False, marketing_consent=True,
        )
        db.add(admin); db.add(demo)

        await db.commit()
        print("Seed OK : 10 genres, 24 livres, 6 evenements, 24 items cafe, 7 artisans, 8 produits, 2 comptes (admin@.. / admin123, client@.. / client123)")


def main():
    asyncio.run(reset_and_seed())


if __name__ == "__main__":
    main()
