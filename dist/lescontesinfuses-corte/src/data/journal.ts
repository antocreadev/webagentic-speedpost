export interface Article {
  slug: string;
  title: string;
  category: "Chronique" | "Recette" | "Portrait" | "Citadelle" | "Sélection" | "Club lecture";
  date: string; // ISO
  author: string;
  excerpt: string;
  readingMinutes: number;
  gradient: [string, string];
  body?: string[]; // paragraphs (plain text). only for the 3 detailed slugs.
  pullQuotes?: string[];
}

export const articles: Article[] = [
  {
    slug: "chronique-fureur-et-mystere",
    title: "Fureur et mystère, René Char à voix basse",
    category: "Chronique",
    date: "2026-04-12",
    author: "Anna Filippi",
    excerpt: "Relire Char au printemps, c'est descendre dans une crypte qui s'ouvre sur un verger. Voici pourquoi ce recueil habite encore nos étagères.",
    readingMinutes: 7,
    gradient: ["#5C3820", "#3A2014"],
    body: [
      "Il y a des livres que l'on n'ouvre jamais sans avoir d'abord regardé par la fenêtre. Fureur et mystère est de ceux-là. On le saisit, et déjà l'air change : le bois de la table devient plus mat, la pluie semble peser un peu plus. Char ne se lit pas en surface. Il s'infuse, lentement, comme un thé qu'on aurait oublié.",
      "À la librairie, c'est un livre qui revient sans cesse. On le voit passer de main en main, parfois pendant des semaines, avant qu'il ne trouve sa lectrice. Il faut une certaine disposition de l'âme pour entrer dans ces poèmes : un peu de silence, un peu de patience, et la conviction qu'un mot peut suffire à ouvrir un paysage.",
      "Le recueil rassemble des textes écrits entre 1938 et 1947, dans la nuit la plus dense du siècle. Char y travaille la langue comme un orfèvre travaille un alliage difficile : il ne cède rien à la facilité, il ne polit rien pour plaire. Chaque poème est un coup de burin, et c'est précisément ce qui le rend si vivant aujourd'hui.",
      "On parle souvent du résistant qu'il fut. C'est juste, mais c'est court. Char est d'abord un homme qui regarde. Les Feuillets d'Hypnos, écrits dans le maquis du Vaucluse, sont un journal sans dates où la guerre est partout présente sans jamais être nommée. Ce qui compte, ce sont les amandiers, les compagnons, le pain partagé. La beauté tient debout malgré tout.",
      "Lu à Corte, ces pages prennent une couleur particulière. Notre maquis n'est pas celui de Char, et pourtant il y a des correspondances : la même odeur d'hiver tiède, la même pierre qui rend la chaleur le soir. On comprend, ligne après ligne, que la poésie n'est pas une décoration : c'est une manière de tenir.",
      "Il faut bien sûr du temps pour entrer dans ce livre. La première fois, on en sort déconcerté : qu'a-t-on lu, au juste ? Mais quelques jours plus tard, sans qu'on s'y attende, un vers revient. On le murmure en marchant. C'est à ce moment précis que Char a fait son travail.",
      "Notre édition préférée reste la collection Poésie Gallimard, sobre, fidèle, sans appareil critique envahissant. Elle tient dans une poche, ce qui est précieux : un livre comme celui-ci doit pouvoir voyager. On le lit en haut de la citadelle, au pied d'un châtaignier, dans la salle d'attente d'une gare. Partout, il fait son office.",
      "Si vous ne l'avez jamais lu, commencez par les Feuillets d'Hypnos. Choisissez un fragment au hasard, le 178 par exemple : « Le poème est l'amour réalisé du désir demeuré désir. » Reposez le livre. Allez marcher. Revenez. Vous saurez."
    ],
    pullQuotes: [
      "Char ne se lit pas en surface. Il s'infuse, lentement, comme un thé qu'on aurait oublié.",
      "La poésie n'est pas une décoration : c'est une manière de tenir.",
    ],
  },
  {
    slug: "recette-cappuccino-catte",
    title: "Le cappuccino Catte, recette maison",
    category: "Recette",
    date: "2026-03-28",
    author: "Saveriu Pieri",
    excerpt: "Notre signature au comptoir : un cappuccino marbré au lait châtaigne, longuement émulsionné, à boire en lisant.",
    readingMinutes: 5,
    gradient: ["#C77A4F", "#9A4F2A"],
    body: [
      "Le cappuccino Catte n'est pas un caprice de barista. C'est la rencontre de deux gestes simples : un espresso bien tiré, et un lait de châtaigne mousseux, dont la douceur tempère exactement l'amertume du grain. On le sert dans une tasse haute, parce qu'il faut voir les couches.",
      "À l'origine, il y a une frustration. Les laits végétaux du commerce sont souvent trop sucrés, ou trop fades, ou les deux. Pendant des semaines, nous avons cherché : amande, avoine, soja, riz. Aucun n'avait la rondeur que nous voulions. C'est en goûtant le lait châtaigne d'un torréfacteur de Piedicroce que nous avons compris : il fallait reprendre la matière première de l'île.",
      "La recette tient en cinq étapes. Pour deux tasses : 18 grammes de café fraîchement moulu, 220 millilitres de lait châtaigne, un soupçon de cannelle moulue, une cuillère à café de sirop de farine de châtaigne maison, et le temps qu'il faut. Comptez douze minutes en tout.",
      "Premièrement, tirez l'espresso. Mouture fine, pas trop tassée, vingt-cinq secondes d'extraction pour 36 millilitres en double. Le crema doit être noisette, dense, sans bulles.",
      "Deuxièmement, faites chauffer le lait châtaigne à 65 degrés. Plus chaud, il perd sa douceur. Pendant qu'il chauffe, fouettez-le à la main ou au mousseur : on cherche une mousse fine, presque crémeuse, pas une mousse de bain.",
      "Troisièmement, dans la tasse, déposez la cuillère de sirop de châtaigne au fond. Versez l'espresso par-dessus. Le sirop remontera doucement par capillarité.",
      "Quatrièmement, versez le lait moussé en penchant la tasse à 30 degrés. La technique du latte art classique fonctionne : commencez haut pour le lait, descendez quand la mousse arrive. Une rosette suffit.",
      "Cinquièmement, saupoudrez d'une pincée de cannelle. Servez immédiatement, avec une cuillère à long manche pour mélanger sans détruire la mousse.",
      "Conseil : pour reproduire le sirop maison, faites infuser 100 grammes de farine de châtaigne dans 200 millilitres d'eau et 80 grammes de sucre de canne, à feu doux pendant 20 minutes. Filtrez. Conservez au frais une semaine.",
      "Au comptoir, on accompagne souvent ce cappuccino d'un petit cookie châtaigne fleur de sel. La boucle est bouclée. Le lecteur peut s'asseoir."
    ],
    pullQuotes: [
      "Aucun lait végétal n'avait la rondeur que nous voulions. La châtaigne, oui.",
      "On le sert dans une tasse haute, parce qu'il faut voir les couches.",
    ],
  },
  {
    slug: "portrait-artisan-bougie-maquis",
    title: "Portrait : Lisandra, bougies du maquis",
    category: "Portrait",
    date: "2026-02-15",
    author: "Letizia Mariotti",
    excerpt: "Dans son atelier de Castagniccia, Lisandra Casanova distille des cires parfumées au myrte, à l'immortelle, au lentisque. Visite.",
    readingMinutes: 8,
    gradient: ["#8A9876", "#5A6647"],
    body: [
      "On arrive chez Lisandra par une route en lacets. Le brouillard du matin n'a pas tout à fait quitté les châtaigniers. Son atelier est une ancienne bergerie, rachetée pour rien il y a dix ans, restaurée pierre à pierre. À l'entrée, une odeur immédiate : myrte, cire d'abeille, un fond chaud de lentisque. On comprend tout de suite ce qu'on est venu chercher.",
      "Lisandra Casanova a 41 ans. Elle a longtemps travaillé à Marseille comme chimiste pour une grande maison de parfum. Un jour, elle a démissionné, sans plan précis, juste l'envie de revenir. Elle est arrivée à Piedicroce avec deux valises et un rêve de cire.",
      "Aujourd'hui, son atelier produit 4 000 bougies par an. Pas plus. Elle refuse de croître. Chaque bougie passe au moins quatre fois entre ses mains : la fonte, le parfumage, le coulage, l'étiquetage. Les flacons sont fabriqués par un verrier de Sotta. Les mèches sont en coton non blanchi. La cire est un mélange de cire d'abeille corse et de cire de soja française.",
      "Sa gamme s'organise autour de cinq plantes du maquis : le myrte, l'immortelle, le lentisque, le cyste, et la nepita. Pour chacune, elle distille elle-même une partie des huiles essentielles, à froid, dans un alambic de cuivre que lui a légué son grand-père. Le reste vient d'un confrère ajaccien.",
      "Ce qui frappe, en la regardant travailler, c'est la lenteur. Une bougie demande cinq jours, en comptant le séchage. Elle ne fait pas de promotion sur Instagram. Elle ne vend pas en ligne. Elle préfère que ses bougies passent par des libraires, des cavistes, des hôtels qui prennent le temps de les présenter.",
      "Notre coup de cœur, à la librairie : la bougie Lentisque. C'est un parfum sec, presque résineux, très méditerranéen, qui rappelle les fins d'après-midi de septembre. On la brûle dans le coin lecture quand l'air devient frais. Elle accompagne très bien la poésie.",
      "Lisandra nous prépare actuellement une édition limitée pour Noël 2026, parfumée à l'immortelle et à la fleur d'oranger. Cinquante exemplaires numérotés. Nous en aurons une douzaine en boutique à partir de novembre. Ne tardez pas.",
      "À la fin de notre visite, elle nous a montré son carnet de notes. Des dizaines de pages d'essais, ratés, abandonnés, recommencés. « C'est comme ça que ça marche, dit-elle simplement. On ne fait pas une bonne bougie au premier essai. » Cette phrase, à elle seule, vaut tout le voyage."
    ],
    pullQuotes: [
      "Elle refuse de croître. Chaque bougie passe au moins quatre fois entre ses mains.",
      "On ne fait pas une bonne bougie au premier essai.",
    ],
  },
  {
    slug: "echos-citadelle",
    title: "Échos de la citadelle, printemps 2026",
    category: "Citadelle",
    date: "2026-04-02",
    author: "Paul-Antoine Casta",
    excerpt: "Petit journal de lecture en plein air : les bancs où l'on s'assied, les heures où la lumière tombe juste, et les livres qu'on emporte.",
    readingMinutes: 4,
    gradient: ["#8E6C90", "#5E456A"],
  },
  {
    slug: "selection-rentree-2026",
    title: "Sélection rentrée 2026, douze livres pour septembre",
    category: "Sélection",
    date: "2026-01-20",
    author: "Anna Filippi",
    excerpt: "Notre sélection commentée pour la rentrée : six romans, quatre essais, un récit de voyage, un livre jeunesse.",
    readingMinutes: 12,
    gradient: ["#C77A4F", "#7C4F31"],
  },
  {
    slug: "club-lecture-marie-susini",
    title: "Club lecture, Marie Susini en mai",
    category: "Club lecture",
    date: "2026-04-18",
    author: "Anna Filippi",
    excerpt: "Le club se penche sur Plein soleil. Compte-rendu de la séance d'avril, programme du prochain rendez-vous.",
    readingMinutes: 6,
    gradient: ["#C9A37D", "#7C4F31"],
  },
];

export const categories = [
  "Tous",
  "Chronique",
  "Recette",
  "Portrait",
  "Citadelle",
  "Sélection",
  "Club lecture",
] as const;
