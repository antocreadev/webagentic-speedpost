-- Jennyland Floral Création — initial seed
-- Run after schema.sql. Idempotent: clears tables first.

DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM unit_items;
DELETE FROM unit_item_palette;
DELETE FROM content_blocks;
DELETE FROM settings;
DELETE FROM admin_users;
DELETE FROM admin_sessions;

-- ---------- Categories ----------
INSERT INTO categories (slug, name, tagline, description, emoji, sort) VALUES
('bouquets-romantiques', 'Bouquets romantiques', 'Pour dire ce que les mots gardent en silence',
  'Des bouquets pensés pour les moments qui comptent : Saint-Valentin, anniversaire, première rencontre. Chaque pièce est tendre, douce, et garde sa fraîcheur des années.',
  'rose', 1),
('bouquets-mariage', 'Bouquets de mariage', 'Le bouquet qui survit au grand jour',
  'Des compositions de mariée et demoiselles d''honneur, faites main au crochet pour traverser les années aussi bien que vos souvenirs. Personnalisables sur demande.',
  'sparkles', 2),
('compositions', 'Compositions & vases', 'Pour la table, le bureau, la chambre',
  'Des bouquets compacts dans des vases ronds, terrariums fermés, mobiles à suspendre. Tout pour habiller un coin de pièce avec douceur.',
  'flower', 3),
('decorations', 'Couronnes & accessoires', 'Le détail qui change tout',
  'Couronnes fleuries pour cheveux, corsages, boutonnières, headbands. Pour mariées, mères, demoiselles d''honneur, et celles qui ont envie d''avoir des fleurs sur la tête un jeudi.',
  'crown', 4),
('fleurs-unitaires', 'Fleurs à l''unité', 'Composez votre bouquet, fleur par fleur',
  'Toutes les fleurs et décorations qui rentrent dans le configurateur, achetables aussi à l''unité. Idéal pour offrir une rose seule, ou compléter un bouquet existant.',
  'leaf', 5);

-- ---------- Products (10) ----------
INSERT INTO products (category_id, slug, name, short_description, description, story, price_cents, compare_at_cents, stock, is_unique, is_made_to_order, prep_days_min, prep_days_max, dimensions, materials, care_instructions, primary_color, badge, status, featured, sort) VALUES
((SELECT id FROM categories WHERE slug='bouquets-romantiques'),
  'bouquet-premiere-lumiere',
  'Première Lumière',
  'Un duo de roses pêche et de marguerites blanches, le bouquet d''un matin doux.',
  'Trois roses pêche ouvertes, deux boutons rose poudré, six marguerites blanches au cœur jaune beurre, quelques brins d''eucalyptus crochetés en sauge tendre. Ruban de satin nude noué à la française.',
  'C''est le bouquet qu''on offre quand on n''ose pas encore l''écrire. Jenny l''a imaginé comme un premier rayon de soleil sur la fenêtre : peu de fleurs, beaucoup de lumière. Travaillé en coton mercerisé teinté à la main, il garde sa forme et ses couleurs sans entretien.',
  6500, NULL, 1, 1, 1, 5, 7,
  'Ø 22 cm, hauteur 28 cm', 'Coton mercerisé, fil de fer gainé, ruban satin', 'Dépoussiérer délicatement avec un sèche-cheveux air froid à 30 cm.', 'peche', 'Pièce unique', 'active', 1, 1),

((SELECT id FROM categories WHERE slug='bouquets-romantiques'),
  'bouquet-aurore-pastel',
  'Aurore Pastel',
  'Pêche, blush et butter — la palette d''un lever de soleil corse.',
  'Cinq roses pêche, trois pivoines pâles, deux lys calla ivoire, six marguerites butter, brins de gypsophile et feuillage olivier. Ruban gaze ivoire double passe.',
  'Pensé pour les "juste parce que". Une cliente l''avait commandé pour le retour d''hôpital de sa mère ; depuis, c''est un de mes préférés. Les couleurs viennent d''une photographie d''aurore prise depuis la pointe de la Revellata à 6h12.',
  8500, 9500, 1, 1, 1, 5, 7,
  'Ø 26 cm, hauteur 32 cm', 'Coton mercerisé, fil de fer gainé, ruban gaze', 'Conservez à l''abri du soleil direct. Pas d''eau.', 'pastel', 'Coup de coeur', 'active', 1, 2),

((SELECT id FROM categories WHERE slug='bouquets-mariage'),
  'bouquet-mariage-eternel',
  'Mariage Éternel',
  'Le bouquet de mariée qui voyage avec vous toute la vie.',
  'Douze roses ivoire crochetées en relief, quatre pivoines blanches, brins de gypsophile, longues feuilles d''eucalyptus, ruban de soie crème de 1m20 noué en cascade. Personnalisable (couleur de ruban, ajout d''une initiale brodée).',
  'C''est le bouquet sur lequel on revient. Trois cents à quatre cents heures de travail réparties sur six semaines, chaque rose montée sur tige ajustable. Pour qu''après le grand jour, le bouquet trouve sa place dans une vitrine, pas un placard.',
  18000, NULL, 1, 1, 1, 35, 45,
  'Ø 30 cm, hauteur 38 cm, traîne 1m20', 'Coton mercerisé, soie naturelle, fil de fer gainé', 'Conservez sous cloche en verre, à l''abri du soleil.', 'ivoire', 'Sur-mesure', 'active', 1, 3),

((SELECT id FROM categories WHERE slug='bouquets-mariage'),
  'bouquet-demoiselle-honneur',
  'Demoiselle d''Honneur',
  'Version compacte du Mariage Éternel pour vos témoins.',
  'Six roses ivoire, deux pivoines, brins de gypsophile, ruban gaze ivoire. Coordonné en couleur au bouquet de la mariée, taille adaptée pour porter toute la journée sans fatigue.',
  'À commander en duo, trio ou plus avec le Mariage Éternel. Jenny ajuste la palette pour que vos demoiselles aient leur propre identité tout en étant clairement liées au bouquet principal.',
  9500, NULL, 1, 1, 1, 25, 35,
  'Ø 18 cm, hauteur 22 cm', 'Coton mercerisé, fil de fer gainé, ruban gaze', 'Conservez à l''abri du soleil direct.', 'ivoire', 'Sur-mesure', 'active', 0, 4),

((SELECT id FROM categories WHERE slug='compositions'),
  'composition-petit-atelier',
  'Petit Atelier',
  'Un vase rond avec cinq fleurs assorties, prêt à poser sur un bureau.',
  'Vase en céramique blanche brute (Ø 10 cm), trois roses pêche, une pivoine blush, deux marguerites butter, deux feuilles d''eucalyptus. Composition fixée mais retirable du vase.',
  'Le cadeau collègue / fête des mères / pendaison de crémaillère parfait. Léger, robuste, sans entretien. Le vase est un porcelainier corse à Ajaccio, chaque pièce a son grain.',
  4500, NULL, 1, 1, 0, 4, 6,
  'Ø 14 cm, hauteur 22 cm', 'Coton mercerisé, vase céramique, fil de fer gainé', 'Le vase peut être lavé à l''eau, retirez d''abord la composition.', 'peche', NULL, 'active', 1, 5),

((SELECT id FROM categories WHERE slug='compositions'),
  'composition-chambre-douce',
  'Chambre Douce',
  'Terrarium en verre avec roses miniatures et mousse de coton.',
  'Globe en verre Ø 12 cm, trois roses miniatures crochetées (rose poudré, ivoire, pêche), mousse de coton beige, microbillles dorées. Posé sur socle bois clair.',
  'Pensé pour la table de chevet. Petit, solide, sa silhouette ronde renvoie une lumière douce le matin. Une cliente m''a écrit qu''elle l''avait offert à sa fille pour son entrée en première année de fac.',
  3800, NULL, 1, 1, 0, 4, 6,
  'Ø 12 cm, hauteur 16 cm', 'Coton mercerisé, verre soufflé, bois de hêtre, perles', 'Dépoussiérer le globe avec un chiffon sec.', 'rose-poudre', NULL, 'active', 1, 6),

((SELECT id FROM categories WHERE slug='decorations'),
  'couronne-etoiles',
  'Couronne d''Étoiles',
  'Couronne fleurie cheveux pour mariée, demoiselle, ou parce que.',
  'Base en fil souple, six petites roses ivoire, gypsophile, perles nacre, étoiles dorées en relief. Ajustable de 54 à 60 cm. Crochets de fixation invisibles.',
  'Le bibelot qui n''a aucun intérêt à rester rangé. Pensé pour pouvoir être déposé dans une boîte à bijoux entre deux occasions et reprendre forme tout de suite. Beaucoup de clientes la portent au quotidien à la maison.',
  5500, NULL, 1, 1, 1, 7, 10,
  'Ø ajustable 54-60 cm', 'Coton mercerisé, fil souple gainé, perles nacre, fil métallique doré', 'Range plié en cercle. Ne pas mouiller.', 'ivoire', 'Pièce unique', 'active', 1, 7),

((SELECT id FROM categories WHERE slug='bouquets-romantiques'),
  'bouquet-saint-valentin-unique',
  'Saint-Valentin Unique',
  'Sept roses rouge profond crochetées et un cœur en fil doré.',
  'Sept roses rouge brique, un mini cœur fil doré au centre, feuillage eucalyptus, ruban de satin rouge. Édition limitée, disponible chaque année du 1ᵉʳ janvier au 14 février.',
  'Le bouquet qu''on garde plus longtemps que la relation parfois. Conçu pour durer, le rouge utilisé est un coton teint à la garance, sa nuance évolue très lentement vers un rouge plus chaud avec le temps.',
  7500, NULL, 0, 1, 1, 5, 7,
  'Ø 24 cm, hauteur 30 cm', 'Coton mercerisé teinté garance, fil de fer gainé, ruban satin', 'À conserver à l''abri du soleil. Sans entretien.', 'rouge', 'Édition limitée', 'active', 0, 8),

((SELECT id FROM categories WHERE slug='compositions'),
  'composition-suspension-botanique',
  'Suspension Botanique',
  'Un mobile floral à suspendre, chambre d''enfant ou véranda.',
  'Cercle en bois Ø 28 cm, douze fleurs réparties en grappes (mix roses, marguerites, feuillage), suspensions de longueurs variables 15-40 cm. Cordon en fil de coton nature.',
  'Né d''une commande pour une chambre de bébé à Calvi. La cliente voulait quelque chose qui bouge légèrement avec l''air mais ne pas avoir de fleurs séchées qui lâchent. Le résultat est devenu un classique de la boutique.',
  6800, NULL, 2, 0, 0, 7, 10,
  'Ø 28 cm, longueur totale 70 cm', 'Coton mercerisé, cerceau hêtre brut, cordelette coton', 'Dépoussiérer avec un sèche-cheveux air froid.', 'mixte', NULL, 'active', 0, 9),

((SELECT id FROM categories WHERE slug='bouquets-romantiques'),
  'bouquet-anniversaire-rose-poudre',
  'Anniversaire Rose Poudré',
  'Mini-bouquet cinq fleurs, parfait à glisser dans un colis.',
  'Deux roses rose poudré, deux marguerites butter, une feuille olivier, ruban gaze blush. Format compact pour expédition par courrier suivi.',
  'Mon premier mini-bouquet, créé pour les anniversaires à distance. Format pensé pour rentrer dans une boîte aux lettres standard, livré dans son carton kraft signé Jennyland.',
  3500, NULL, 1, 1, 0, 3, 5,
  'Ø 15 cm, hauteur 18 cm', 'Coton mercerisé, fil de fer gainé, ruban gaze', 'Sortez délicatement du carton, retirer le papier de soie.', 'rose-poudre', 'Petits prix', 'active', 1, 10);

-- ---------- Product images placeholder ----------
-- Single hero image for the bouquet that we DO have in real life.
INSERT INTO product_images (product_id, url, alt, sort) VALUES
((SELECT id FROM products WHERE slug='bouquet-premiere-lumiere'), '/assets/bouquet-hero.webp', 'Bouquet Première Lumière, roses pêche et marguerites blanches', 0);

-- ---------- Unit items (for configurator) ----------
INSERT INTO unit_items (slug, name, kind, color, hex, description, price_cents, svg_id, sort) VALUES
-- Roses
('rose-ouverte-ivoire', 'Rose ouverte ivoire', 'flower', 'ivoire', '#F4E8D0', 'Une rose pleinement éclose, douze pétales travaillés un à un.', 800, 'rose-open', 1),
('rose-peche', 'Rose pêche', 'flower', 'peche', '#E89B7B', 'Rose pêche tendre, la couleur signature de Jenny.', 800, 'rose-open', 2),
('rose-blush', 'Rose blush', 'flower', 'blush', '#F4D4C4', 'Rose blush poudré, parfaite pour adoucir une composition.', 800, 'rose-open', 3),
('bouton-rose-blanc', 'Bouton de rose blanc', 'flower', 'ivoire', '#FFF8EE', 'Un bouton fermé, plus discret, en accompagnement.', 600, 'rose-bud', 4),
('marguerite-butter', 'Marguerite butter', 'flower', 'butter', '#F4C66D', 'Marguerite blanche au cœur jaune beurre.', 500, 'daisy', 5),
('lys-calla-ivoire', 'Lys calla ivoire', 'flower', 'ivoire', '#F4E8D0', 'Une longue calla blanche au pistil jaune-orange.', 1200, 'calla', 6),
('tulipe-pastel', 'Tulipe pastel', 'flower', 'peche', '#F2B79E', 'Tulipe en bouton, courbe douce sur sa tige.', 700, 'tulip', 7),
('pivoine-pale', 'Pivoine pâle', 'flower', 'blush', '#F4D4C4', 'Pivoine généreuse en pétales superposés.', 1000, 'peony', 8),
('anemone-blanche', 'Anémone blanche', 'flower', 'ivoire', '#F8F1E1', 'Anémone blanche au cœur noir, contraste graphique.', 800, 'anemone', 9),
('petite-fleur-champs', 'Petite fleur des champs', 'flower', 'mixte', '#E2C9A8', 'Une mini fleur sauvage, à glisser entre les grandes.', 400, 'wildflower', 10),
-- Decorations
('feuille-eucalyptus', 'Feuille d''eucalyptus', 'decoration', 'sage', '#A4B494', 'Brin de feuilles arrondies, vert sauge doux.', 300, 'leaf-eucalyptus', 11),
('feuille-fougere', 'Feuille de fougère', 'decoration', 'sage', '#7A8A68', 'Longue palme verte, donne du volume.', 300, 'leaf-fern', 12),
('branche-olivier', 'Branche d''olivier', 'decoration', 'sage', '#A4B494', 'Brin d''olivier symbolique, cinq feuilles.', 400, 'leaf-olive', 13),
('ruban-satin-peche', 'Ruban satin pêche', 'decoration', 'peche', '#E89B7B', 'Ruban satin 2 cm, longueur 40 cm, noué main.', 300, 'ribbon', 14),
('ruban-gaze-ivoire', 'Ruban gaze ivoire', 'decoration', 'ivoire', '#F4E8D0', 'Gaze légère ivoire, tombe en cascade.', 300, 'ribbon', 15),
('perle-nacre', 'Petite perle nacre', 'decoration', 'ivoire', '#FFF8EE', 'Perle de 6 mm, accroche douce dans le bouquet.', 200, 'pearl', 16),
('gypsophile', 'Brins de gypsophile', 'decoration', 'ivoire', '#FAF1E0', 'Petites fleurs blanches en grappes aérées.', 400, 'gypso', 17),
('etoile-doree', 'Étoile filante dorée', 'decoration', 'gold', '#C9A55C', 'Étoile à cinq branches en fil doré.', 500, 'star', 18),
('mini-coeur-crochet', 'Mini cœur crochet', 'decoration', 'rose-poudre', '#E5B6A8', 'Petit cœur en fil rose poudré, glissable au centre.', 500, 'heart', 19),
('carte-tag', 'Carte tag personnalisée', 'decoration', 'ivoire', '#FAF1E0', 'Tag rond ivoire avec votre message manuscrit (max 40 caractères).', 300, 'tag', 20);

-- ---------- Color palette for filter chips ----------
INSERT INTO unit_item_palette (color, hex, sort) VALUES
('peche', '#E89B7B', 1),
('blush', '#F4D4C4', 2),
('ivoire', '#F4E8D0', 3),
('butter', '#F4C66D', 4),
('sage', '#A4B494', 5),
('rose-poudre', '#E5B6A8', 6),
('gold', '#C9A55C', 7),
('mixte', '#E2C9A8', 8);

-- ---------- Site content blocks ----------
INSERT INTO content_blocks (key, value) VALUES
('hero.eyebrow', 'Atelier de création florale au crochet'),
('hero.title', 'Des fleurs faites main qui ne fanent jamais'),
('hero.subtitle', 'Bouquets, compositions et créations sur-mesure, pensés un point à la fois pour traverser les années aussi bien que vos souvenirs.'),
('hero.cta_primary', 'Découvrir la boutique'),
('hero.cta_secondary', 'Composer mon bouquet'),
('about.intro', 'Je m''appelle Jenny. Depuis 2019, je crée des fleurs au crochet dans mon atelier — pour les mariées, les amoureux, les filles qui s''offrent des fleurs sans attendre qu''on leur en offre.'),
('about.story', 'Tout a commencé pendant un hiver pluvieux où je voulais garder l''été un peu plus longtemps. Aujourd''hui, chaque bouquet est encore tricoté à la main, sur des aiguilles 2 mm, avec du coton mercerisé teinté en bain végétal. Comptez entre 8 et 50 heures par pièce.'),
('about.values', 'Pas de série. Pas de stock. Chaque bouquet sort de l''atelier avec son histoire, son tempo, et un défaut quelque part qui le rend reconnaissable entre tous.'),
('shipping.intro', 'Préparation entre 5 et 7 jours pour les pièces du catalogue, plus longtemps pour les bouquets de mariée. Livraison Mondial Relay (8€) ou Colissimo Suivi (12€). Au-dessus de 100€, livraison offerte.'),
('shipping.return', 'Retour sous 14 jours pour les pièces non personnalisées. Pour les commandes sur-mesure : on échange autant qu''il faut tant que le bouquet n''est pas commencé. Au-delà, vous bénéficiez d''un avoir.'),
('contact.text', 'Pour toute commande sur-mesure, demandez Jenny directement sur WhatsApp. Réponse sous 24h en semaine. Pour les questions plus longues, l''email reste la meilleure option.'),
('faq.q1.question', 'Combien de temps Jenny met pour faire un bouquet ?'),
('faq.q1.answer', 'Entre 8h pour un mini-bouquet à 50h pour un bouquet de mariée complet. La file d''attente courante est visible en temps réel sur Instagram.'),
('faq.q2.question', 'Mes fleurs vont-elles tenir dans le temps ?'),
('faq.q2.answer', 'Oui. Le coton mercerisé tient sa couleur sur 15-20 ans à l''abri du soleil direct. Pas d''eau, pas d''entretien.'),
('faq.q3.question', 'Puis-je modifier les couleurs d''un bouquet ?'),
('faq.q3.answer', 'Oui pour les bouquets sur-mesure. Pour les pièces du catalogue, les couleurs sont fixées mais Jenny peut faire une variante sur demande WhatsApp (devis en 24h).');

-- ---------- Settings (artisan info, integrations) ----------
INSERT INTO settings (key, value) VALUES
('brand.name', 'Jennyland Floral Création'),
('brand.tagline', 'Des fleurs faites main qui ne fanent jamais'),
('artisan.first_name', 'Jenny'),
('artisan.last_name', 'TBD'),
('artisan.city', 'Bastia'),
('artisan.country', 'France'),
('contact.email', 'contact@jennyland.fr'),
('contact.whatsapp', '+33600000000'),
('contact.instagram', 'jennyland.floral'),
('paypal.handle', 'jennyland'),
('paypal.live', '0'),
('shipping.standard_cents', '800'),
('shipping.tracked_cents', '1200'),
('shipping.free_threshold_cents', '10000'),
('legal.siret', '000 000 000 00000'),
('legal.tva', 'FR00000000000');

-- ---------- Default admin user ----------
-- email: hello@jennyland.fr
-- password: Jennyland2026!
-- hash: PBKDF2-SHA256, 200000 iterations, 32-byte derived key, base64 encoded
-- (use POST /admin/seed-password to regenerate)
INSERT INTO admin_users (email, password_hash, password_salt, role, display_name) VALUES
('hello@jennyland.fr',
 'PLACEHOLDER_REPLACE_VIA_SCRIPT',
 'PLACEHOLDER_REPLACE_VIA_SCRIPT',
 'admin',
 'Jenny');
