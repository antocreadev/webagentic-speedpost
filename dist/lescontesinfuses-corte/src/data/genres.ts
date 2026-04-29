export interface Genre {
  slug: string;
  label: string;
  description: string;
  color: string;
  iconKey: string;
}

export const genres: Genre[] = [
  { slug: "roman", label: "Roman", description: "Fictions contemporaines et grands récits.", color: "#C77A4F", iconKey: "BookOpen" },
  { slug: "jeunesse", label: "Jeunesse", description: "Albums, contes et premiers romans.", color: "#8A9876", iconKey: "Sparkles" },
  { slug: "bande-dessinee", label: "Bande dessinée", description: "BD, romans graphiques, mangas.", color: "#8E6C90", iconKey: "Palette" },
  { slug: "poesie", label: "Poésie", description: "Vers, fragments, recueils.", color: "#C9A37D", iconKey: "Feather" },
  { slug: "essai-histoire", label: "Essai & Histoire", description: "Pensée, sciences humaines, mémoires.", color: "#7C4F31", iconKey: "ScrollText" },
  { slug: "polar", label: "Polar & Thriller", description: "Frissons, enquêtes, suspense.", color: "#5C3820", iconKey: "Search" },
  { slug: "beaux-livres", label: "Beaux-livres", description: "Photographie, art, voyages.", color: "#E2B594", iconKey: "Image" },
  { slug: "corse", label: "Corse", description: "Auteurs, paysages et mémoire de l'île.", color: "#5A6647", iconKey: "Mountain" },
  { slug: "cuisine", label: "Cuisine & Art de vivre", description: "Recettes, jardins, douceurs.", color: "#C9B0C5", iconKey: "Coffee" },
  { slug: "nouveautes", label: "Nouveautés", description: "Les sorties du moment.", color: "#C77A4F", iconKey: "Star" },
];
