export interface Event {
  slug: string;
  title: string;
  date: string;       // ISO
  duration: number;   // minutes
  location: string;
  capacity: number;
  registered: number;
  price: number;      // 0 = gratuit
  description: string;
  hostedAt: "boutique" | "horsLesMurs";
}

export const events: Event[] = [
  {
    slug: "dedicace-marcu-biancarelli",
    title: "Dédicace : Marcu Biancarelli",
    date: "2026-05-09T18:00:00+02:00",
    duration: 90,
    location: "Les Contes Infusés, Corte",
    capacity: 40,
    registered: 22,
    price: 0,
    description: "Une rencontre intime avec l'un des plus grands prosateurs corses contemporains. Lecture, échange, dédicace de Murtoriu et de La Fiera.",
    hostedAt: "boutique",
  },
  {
    slug: "club-lecture-mai",
    title: "Club lecture du mois : Mémoires d'Hadrien",
    date: "2026-05-16T17:00:00+02:00",
    duration: 120,
    location: "Les Contes Infusés, Corte",
    capacity: 16,
    registered: 12,
    price: 8,
    description: "On boit, on lit, on partage. Le club mensuel discute Yourcenar autour d'une infusion. Inscription obligatoire.",
    hostedAt: "boutique",
  },
  {
    slug: "atelier-ecriture-ados",
    title: "Atelier d'écriture pour ados",
    date: "2026-05-22T14:30:00+02:00",
    duration: 120,
    location: "Les Contes Infusés, Corte",
    capacity: 10,
    registered: 6,
    price: 12,
    description: "Deux heures de jeu littéraire, animées par une autrice locale. À partir de 13 ans.",
    hostedAt: "boutique",
  },
  {
    slug: "soiree-contes-corses",
    title: "Soirée contes corses",
    date: "2026-05-30T20:30:00+02:00",
    duration: 90,
    location: "Les Contes Infusés, Corte",
    capacity: 50,
    registered: 31,
    price: 5,
    description: "Une conteuse, une bougie, des histoires de l'île à voix basse. Tisanes offertes.",
    hostedAt: "boutique",
  },
  {
    slug: "lecture-publique-poesie",
    title: "Lecture publique : poésie corse",
    date: "2026-06-05T18:30:00+02:00",
    duration: 75,
    location: "Place Paoli, Corte",
    capacity: 80,
    registered: 0,
    price: 0,
    description: "Hors-les-murs, sur la place. Poètes invités, micro ouvert, accent du soir.",
    hostedAt: "horsLesMurs",
  },
  {
    slug: "concert-acoustique-guitare",
    title: "Concert acoustique : guitare seule",
    date: "2026-06-12T20:00:00+02:00",
    duration: 60,
    location: "Les Contes Infusés, Corte",
    capacity: 30,
    registered: 9,
    price: 10,
    description: "Un set intime, cordes nylon, lumières basses. Capacité limitée à 30 places.",
    hostedAt: "boutique",
  },
];

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}
