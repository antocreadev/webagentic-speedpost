export interface ArtisanProduct {
  slug: string;
  name: string;
  artisan: string;
  city: string;
  price: number;
  stock: number;
  description: string;
  imageKey: string;
  category: "bougie" | "papeterie" | "ceramique" | "textile" | "soin" | "epicerie";
}

export const artisans: ArtisanProduct[] = [
  {
    slug: "bougie-maquis",
    name: "Bougie parfumée Maquis",
    artisan: "Atelier Sì",
    city: "Calenzana",
    price: 28.0, stock: 12,
    description: "Cire végétale, mèche en bois, parfum d'immortelle, ciste et myrte. 50h de combustion, en pot terre cuite émaillée.",
    imageKey: "bougie", category: "bougie",
  },
  {
    slug: "bougie-chataignier",
    name: "Bougie Châtaignier",
    artisan: "Atelier Sì",
    city: "Calenzana",
    price: 26.0, stock: 8,
    description: "Bois chaud, sous-bois, fumée douce. Hommage à la châtaigneraie de Castagniccia.",
    imageKey: "bougie", category: "bougie",
  },
  {
    slug: "marque-page-cuir-laurier",
    name: "Marque-page cuir, motif laurier",
    artisan: "Maroquinerie Petralba",
    city: "Aleria",
    price: 14.0, stock: 18,
    description: "Cuir tanné végétal, gravure à chaud d'une brindille de laurier. Quatre coloris : naturel, cognac, sépia, ardoise.",
    imageKey: "marquepage", category: "papeterie",
  },
  {
    slug: "mug-tasse-livre",
    name: "Mug céramique Tasse-Livre",
    artisan: "Terra Forme",
    city: "Pigna",
    price: 32.0, stock: 9,
    description: "Émaillé à la main, anse en forme de signet, intérieur cream, extérieur cocoa.",
    imageKey: "mug", category: "ceramique",
  },
  {
    slug: "foulard-lin-constellation",
    name: "Foulard lin, constellation",
    artisan: "Tela",
    city: "Bastia",
    price: 48.0, stock: 5,
    description: "Lin lavé, motif imprimé constellation des Pléiades, finition à la main.",
    imageKey: "foulard", category: "textile",
  },
  {
    slug: "savon-olive",
    name: "Savon huile d'olive corse",
    artisan: "Saponaria",
    city: "Olmeto",
    price: 9.0, stock: 24,
    description: "Saponification à froid, huile d'olive AOC, parfum bergamote.",
    imageKey: "savon", category: "soin",
  },
  {
    slug: "miel-printemps",
    name: "Miel de printemps",
    artisan: "Apiculture Marchetti",
    city: "Soveria",
    price: 11.5, stock: 14,
    description: "Pot 250g, miel toutes fleurs récolté au printemps dans le Centre-Corse.",
    imageKey: "miel", category: "epicerie",
  },
  {
    slug: "confiture-figue",
    name: "Confiture de figue",
    artisan: "Conserves Petra",
    city: "Cervione",
    price: 7.5, stock: 20,
    description: "Figues noires de Cervione, sucre de canne, citron. Pot 220g.",
    imageKey: "confiture", category: "epicerie",
  },
];

export function getArtisan(slug: string): ArtisanProduct | undefined {
  return artisans.find((a) => a.slug === slug);
}
