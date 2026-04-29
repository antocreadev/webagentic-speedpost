export interface Book {
  slug: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  spineColor: string;
  coverGradient: [string, string];
  summary: string;
  coupDeCoeur: boolean;
  stock: number;
  isbn: string;
  publishedAt: string;
  publisher: string;
}

export const books: Book[] = [
  { slug: "murtoriu", title: "Murtoriu", author: "Marcu Biancarelli", genre: "corse", price: 21.0, spineColor: "#5C3820", coverGradient: ["#5C3820","#3A2014"], summary: "Une plongée incandescente dans une Corse contemporaine déchirée. Roman noir et lyrique d'un grand auteur insulaire.", coupDeCoeur: true, stock: 6, isbn: "9782330012345", publishedAt: "2009-03-12", publisher: "Actes Sud" },
  { slug: "la-fiera", title: "La Fiera", author: "Marcu Biancarelli", genre: "corse", price: 19.5, spineColor: "#7C4F31", coverGradient: ["#7C4F31","#4A2D1F"], summary: "Une fresque humaine, brute et tendre, sur l'âme corse d'aujourd'hui.", coupDeCoeur: false, stock: 4, isbn: "9782330023456", publishedAt: "2018-09-05", publisher: "Actes Sud" },
  { slug: "plein-soleil", title: "Plein soleil", author: "Marie Susini", genre: "corse", price: 17.0, spineColor: "#C77A4F", coverGradient: ["#C77A4F","#9A4F2A"], summary: "Roman lumineux d'une grande prosatrice corse, entre mer et silence.", coupDeCoeur: true, stock: 3, isbn: "9782070123456", publishedAt: "1953-01-01", publisher: "Gallimard" },
  { slug: "le-sermon-sur-la-chute-de-rome", title: "Le sermon sur la chute de Rome", author: "Jérôme Ferrari", genre: "corse", price: 18.5, spineColor: "#4A2D1F", coverGradient: ["#4A2D1F","#26150C"], summary: "Goncourt 2012. Un village corse et un bar comme métaphore d'un monde qui s'effondre.", coupDeCoeur: true, stock: 8, isbn: "9782330014127", publishedAt: "2012-08-22", publisher: "Actes Sud" },
  { slug: "balco-atlantico", title: "Balco Atlantico", author: "Jérôme Ferrari", genre: "corse", price: 16.5, spineColor: "#8A9876", coverGradient: ["#8A9876","#5A6647"], summary: "Le drame d'un village qui s'imagine refuge et devient piège.", coupDeCoeur: false, stock: 5, isbn: "9782330015432", publishedAt: "2008-04-10", publisher: "Actes Sud" },
  { slug: "l-etranger", title: "L'Étranger", author: "Albert Camus", genre: "roman", price: 8.5, spineColor: "#C9A37D", coverGradient: ["#C9A37D","#7C4F31"], summary: "Le classique absolu : Meursault, l'absurde, le soleil d'Alger.", coupDeCoeur: false, stock: 12, isbn: "9782070360024", publishedAt: "1942-01-01", publisher: "Gallimard" },
  { slug: "la-peste", title: "La Peste", author: "Albert Camus", genre: "roman", price: 10.0, spineColor: "#9A4F2A", coverGradient: ["#9A4F2A","#5C3820"], summary: "Oran, 1940. Une chronique de la solidarité face à l'invisible.", coupDeCoeur: false, stock: 7, isbn: "9782070360420", publishedAt: "1947-06-10", publisher: "Gallimard" },
  { slug: "la-vagabonde", title: "La Vagabonde", author: "Colette", genre: "roman", price: 9.5, spineColor: "#8E6C90", coverGradient: ["#8E6C90","#5E456A"], summary: "Une femme, la scène, la liberté. Une voix incandescente de la fin de siècle.", coupDeCoeur: false, stock: 4, isbn: "9782253004936", publishedAt: "1910-01-01", publisher: "Le Livre de Poche" },
  { slug: "memoires-d-hadrien", title: "Mémoires d'Hadrien", author: "Marguerite Yourcenar", genre: "roman", price: 12.0, spineColor: "#C77A4F", coverGradient: ["#C77A4F","#9A4F2A"], summary: "La voix d'un empereur, la sagesse d'une romancière. Œuvre intemporelle.", coupDeCoeur: true, stock: 3, isbn: "9782070369218", publishedAt: "1951-01-01", publisher: "Gallimard" },
  { slug: "la-petite-fille-de-monsieur-linh", title: "La Petite Fille de Monsieur Linh", author: "Philippe Claudel", genre: "roman", price: 7.5, spineColor: "#5A6647", coverGradient: ["#5A6647","#3A2014"], summary: "Un vieil homme, un nourrisson, l'exil. Un récit court et bouleversant.", coupDeCoeur: false, stock: 9, isbn: "9782253115541", publishedAt: "2005-04-01", publisher: "Le Livre de Poche" },
  { slug: "le-petit-prince", title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", genre: "jeunesse", price: 9.9, spineColor: "#E2B594", coverGradient: ["#E2B594","#C77A4F"], summary: "Le conte universel pour les enfants, et ceux qu'ils restent.", coupDeCoeur: false, stock: 15, isbn: "9782070612758", publishedAt: "1943-01-01", publisher: "Gallimard Jeunesse" },
  { slug: "la-soupe-au-caillou", title: "La soupe au caillou", author: "Anaïs Vaugelade", genre: "jeunesse", price: 12.5, spineColor: "#8A9876", coverGradient: ["#8A9876","#C7CDB7"], summary: "Un loup, une marmite, la magie du partage. Album incontournable.", coupDeCoeur: false, stock: 6, isbn: "9782211056816", publishedAt: "2000-09-01", publisher: "École des Loisirs" },
  { slug: "ulysse-from-bagdad", title: "Ulysse from Bagdad", author: "Eric-Emmanuel Schmitt", genre: "roman", price: 8.0, spineColor: "#7C4F31", coverGradient: ["#7C4F31","#4A2D1F"], summary: "Une odyssée moderne entre l'Irak et l'Europe.", coupDeCoeur: false, stock: 5, isbn: "9782253134121", publishedAt: "2008-09-01", publisher: "Le Livre de Poche" },
  { slug: "persepolis", title: "Persepolis (intégrale)", author: "Marjane Satrapi", genre: "bande-dessinee", price: 27.0, spineColor: "#26150C", coverGradient: ["#26150C","#150B05"], summary: "L'enfance de l'autrice à Téhéran sous la Révolution. BD essentielle.", coupDeCoeur: true, stock: 4, isbn: "9782844141972", publishedAt: "2007-10-01", publisher: "L'Association" },
  { slug: "l-arabe-du-futur", title: "L'Arabe du futur, t.1", author: "Riad Sattouf", genre: "bande-dessinee", price: 22.5, spineColor: "#C9A37D", coverGradient: ["#C9A37D","#7C4F31"], summary: "Une enfance entre Libye, Syrie et France. Drôle, tendre, lucide.", coupDeCoeur: false, stock: 5, isbn: "9782370730541", publishedAt: "2014-05-22", publisher: "Allary" },
  { slug: "tu-appelleras-cendrars", title: "Tu appelleras Cendrars", author: "Léo Henry", genre: "polar", price: 19.0, spineColor: "#5C3820", coverGradient: ["#5C3820","#26150C"], summary: "Polar littéraire, ombres et lumières d'une enquête érudite.", coupDeCoeur: false, stock: 3, isbn: "9782370492012", publishedAt: "2023-02-15", publisher: "Rivages" },
  { slug: "le-mystere-de-la-citadelle", title: "Le mystère de la citadelle", author: "Anne-Marie Garat", genre: "polar", price: 17.5, spineColor: "#4A2D1F", coverGradient: ["#4A2D1F","#26150C"], summary: "Disparition à Corte. Polar local, atmosphère granitique.", coupDeCoeur: false, stock: 4, isbn: "9782742798312", publishedAt: "2021-10-06", publisher: "Actes Sud" },
  { slug: "alcools", title: "Alcools", author: "Guillaume Apollinaire", genre: "poesie", price: 7.0, spineColor: "#8E6C90", coverGradient: ["#8E6C90","#5E456A"], summary: "Le recueil-pivot de la modernité poétique française.", coupDeCoeur: false, stock: 6, isbn: "9782070300129", publishedAt: "1913-01-01", publisher: "Gallimard" },
  { slug: "fureur-et-mystere", title: "Fureur et mystère", author: "René Char", genre: "poesie", price: 9.5, spineColor: "#5A6647", coverGradient: ["#5A6647","#3A2014"], summary: "Poésie de résistance et d'aurore. Une langue dense et solaire.", coupDeCoeur: false, stock: 4, isbn: "9782070321305", publishedAt: "1948-01-01", publisher: "Gallimard" },
  { slug: "corse-secrete", title: "Corse secrète, photographies", author: "Jean-André Bertozzi", genre: "beaux-livres", price: 39.0, spineColor: "#C77A4F", coverGradient: ["#C77A4F","#9A4F2A"], summary: "Cent clichés rares, des bergeries de l'Alta Rocca aux ruelles de Corte.", coupDeCoeur: true, stock: 2, isbn: "9782914622334", publishedAt: "2022-11-12", publisher: "Albiana" },
  { slug: "atlas-des-sentiers", title: "Atlas des sentiers de Corse", author: "Collectif", genre: "beaux-livres", price: 32.0, spineColor: "#8A9876", coverGradient: ["#8A9876","#5A6647"], summary: "GR20, Mare e Monti, sentiers oubliés : tout l'arrière-pays cartographié.", coupDeCoeur: false, stock: 5, isbn: "9782914623012", publishedAt: "2024-03-01", publisher: "Albiana" },
  { slug: "cuisine-de-l-ile", title: "Cuisine de l'île", author: "Marie-Antoinette Maupertuis", genre: "cuisine", price: 24.0, spineColor: "#E2B594", coverGradient: ["#E2B594","#C77A4F"], summary: "Soixante recettes corses traditionnelles, du brocciu aux canistrelli.", coupDeCoeur: false, stock: 6, isbn: "9782914624511", publishedAt: "2020-05-04", publisher: "Albiana" },
  { slug: "histoire-de-la-corse", title: "Histoire de la Corse", author: "Antoine-Laurent Serpentini", genre: "essai-histoire", price: 28.0, spineColor: "#26150C", coverGradient: ["#26150C","#150B05"], summary: "Une synthèse magistrale, des Romains à nos jours.", coupDeCoeur: false, stock: 3, isbn: "9782914625019", publishedAt: "2019-09-12", publisher: "Albiana" },
  { slug: "lumieres-de-la-mediterranee", title: "Lumières de la Méditerranée", author: "Predrag Matvejević", genre: "essai-histoire", price: 14.5, spineColor: "#7C4F31", coverGradient: ["#7C4F31","#4A2D1F"], summary: "Un bréviaire poétique et savant de la mer du milieu.", coupDeCoeur: false, stock: 4, isbn: "9782070425327", publishedAt: "1992-01-01", publisher: "Gallimard" },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function coupsDeCoeur(): Book[] {
  return books.filter((b) => b.coupDeCoeur);
}
