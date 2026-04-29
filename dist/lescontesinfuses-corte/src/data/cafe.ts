export type CafeCategory = "cafe" | "the" | "boisson" | "kombucha" | "the-glace" | "dessert";

export interface CafeItem {
  slug: string;
  name: string;
  category: CafeCategory;
  price: number;
  ingredients: string[];
  allergens: string[];
  imageKey: string;     // logical key, used by ColorMug component for flat illustration
  signature?: boolean;
}

export const cafe: CafeItem[] = [
  // CAFÉ
  { slug: "cafe", name: "Café", category: "cafe", price: 2.5, ingredients: ["espresso pure origine"], allergens: [], imageKey: "espresso", signature: true },
  { slug: "machiato", name: "Machiato", category: "cafe", price: 2.5, ingredients: ["espresso", "tache de lait mousseux"], allergens: ["lait"], imageKey: "machiato" },
  { slug: "cappuccino-catte", name: "Cappuccino Catte", category: "cafe", price: 4.0, ingredients: ["espresso double", "lait vapeur", "mousse fine", "cacao"], allergens: ["lait"], imageKey: "cappuccino", signature: true },
  { slug: "chocolat", name: "Chocolat (chaud ou froid)", category: "cafe", price: 2.5, ingredients: ["cacao maison", "lait", "sucre brun"], allergens: ["lait"], imageKey: "chocolat" },
  { slug: "chai-catte", name: "Chai Catte", category: "cafe", price: 2.5, ingredients: ["thé noir", "épices chai", "lait"], allergens: ["lait"], imageKey: "chai" },
  { slug: "matcha-latte", name: "Matcha latte", category: "cafe", price: 4.5, ingredients: ["matcha cérémonial", "lait", "sirop d'érable"], allergens: ["lait"], imageKey: "matcha", signature: true },
  { slug: "ube-catte", name: "Ube Catte", category: "cafe", price: 4.5, ingredients: ["igname violet", "lait", "miel"], allergens: ["lait"], imageKey: "ube", signature: true },

  // THÉS
  { slug: "the-damman", name: "Thés Damman Frères", category: "the", price: 3.5, ingredients: ["sélection de la maison"], allergens: [], imageKey: "the" },

  // BOISSONS
  { slug: "ice-tea", name: "Ice Tea", category: "boisson", price: 3.5, ingredients: ["thé glacé", "citron"], allergens: [], imageKey: "icetea" },
  { slug: "coca", name: "Coca-Cola", category: "boisson", price: 3.5, ingredients: ["33cl"], allergens: [], imageKey: "coca" },
  { slug: "coca-zero", name: "Coca Zéro", category: "boisson", price: 3.5, ingredients: ["33cl"], allergens: [], imageKey: "coca" },
  { slug: "pago", name: "Pago", category: "boisson", price: 3.5, ingredients: ["jus de fruit"], allergens: [], imageKey: "pago" },
  { slug: "eau", name: "Eau", category: "boisson", price: 3.5, ingredients: ["50cl"], allergens: [], imageKey: "eau" },

  // KOMBUCHA
  { slug: "kombucha-framboise", name: "Kombucha framboise", category: "kombucha", price: 3.5, ingredients: ["thé fermenté", "framboise"], allergens: [], imageKey: "kombucha" },
  { slug: "kombucha-peche", name: "Kombucha pêche", category: "kombucha", price: 3.5, ingredients: ["thé fermenté", "pêche"], allergens: [], imageKey: "kombucha" },
  { slug: "kombucha-fraise", name: "Kombucha fraise", category: "kombucha", price: 3.5, ingredients: ["thé fermenté", "fraise"], allergens: [], imageKey: "kombucha" },
  { slug: "kombucha-nature", name: "Kombucha nature", category: "kombucha", price: 3.5, ingredients: ["thé fermenté"], allergens: [], imageKey: "kombucha" },

  // THÉ GLACÉ MAISON
  { slug: "the-glace-peche", name: "Thé glacé maison pêche", category: "the-glace", price: 3.5, ingredients: ["thé maison", "pêche fraîche"], allergens: [], imageKey: "iceteaMaison", signature: true },
  { slug: "the-glace-citron", name: "Thé glacé maison citron", category: "the-glace", price: 3.5, ingredients: ["thé maison", "citron de Corse"], allergens: [], imageKey: "iceteaMaison" },

  // DESSERTS
  { slug: "brownie", name: "Brownie", category: "dessert", price: 4.0, ingredients: ["chocolat noir", "noix de pécan", "beurre"], allergens: ["gluten", "œuf", "fruits à coque", "lait"], imageKey: "brownie" },
  { slug: "cake-du-jour", name: "Cake du jour", category: "dessert", price: 3.5, ingredients: ["recette du jour"], allergens: ["gluten", "œuf", "lait"], imageKey: "cake" },
  { slug: "cookie-tout-choco", name: "Cookie tout chocolat", category: "dessert", price: 3.0, ingredients: ["chocolat noir", "pépites"], allergens: ["gluten", "œuf", "lait"], imageKey: "cookie" },
  { slug: "cookie-matcha-blanc", name: "Cookie matcha chocolat blanc", category: "dessert", price: 3.0, ingredients: ["matcha", "chocolat blanc"], allergens: ["gluten", "œuf", "lait"], imageKey: "cookie" },
  { slug: "cookie-fleur-de-sel", name: "Cookie chocolat au lait fleur de sel", category: "dessert", price: 3.0, ingredients: ["chocolat au lait", "fleur de sel"], allergens: ["gluten", "œuf", "lait"], imageKey: "cookie" },
];

export function cafeBy(category: CafeCategory): CafeItem[] {
  return cafe.filter((c) => c.category === category);
}

export function cafeSignature(): CafeItem[] {
  return cafe.filter((c) => c.signature);
}
