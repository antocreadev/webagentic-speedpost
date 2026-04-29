export interface AdminOrder {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  delivery: "relais" | "domicile" | "click";
  status: "À traiter" | "Préparée" | "Expédiée" | "Livrée";
  tracking?: string;
  address: { street: string; zip: string; city: string };
  lines: { title: string; qty: number; unit: number }[];
}

export const adminOrders: AdminOrder[] = [
  { id: "CI-2026-0042", date: "2026-04-20T09:12:00+02:00", customer: "Pierre Antonelli", email: "p.antonelli@orange.fr", items: 3, total: 47.5, delivery: "relais", status: "À traiter",
    address: { street: "12 chemin di a Gargale", zip: "20250", city: "Corte" },
    lines: [{ title: "Murtoriu", qty: 1, unit: 21 }, { title: "Le sermon sur la chute de Rome", qty: 1, unit: 18.5 }, { title: "Bougie Châtaignier", qty: 1, unit: 8 }] },
  { id: "CI-2026-0041", date: "2026-04-20T08:45:00+02:00", customer: "Marie Filippi", email: "marie.f@gmail.com", items: 2, total: 29.0, delivery: "domicile", status: "À traiter",
    address: { street: "5 rue Saint Joseph", zip: "20200", city: "Bastia" },
    lines: [{ title: "Mémoires d'Hadrien", qty: 1, unit: 12 }, { title: "Persepolis", qty: 1, unit: 17 }] },
  { id: "CI-2026-0040", date: "2026-04-19T19:02:00+02:00", customer: "Lucia Marchetti", email: "lucia.marchetti@laposte.net", items: 1, total: 39.0, delivery: "click", status: "Préparée",
    address: { street: "Place Paoli", zip: "20250", city: "Corte" },
    lines: [{ title: "Corse secrète, photographies", qty: 1, unit: 39 }] },
  { id: "CI-2026-0039", date: "2026-04-19T16:30:00+02:00", customer: "Antoine Dubois", email: "a.dubois@hotmail.fr", items: 4, total: 64.5, delivery: "relais", status: "Expédiée", tracking: "MR-2026-0014872",
    address: { street: "27 cours Napoléon", zip: "20000", city: "Ajaccio" },
    lines: [{ title: "L'Étranger", qty: 1, unit: 8.5 }, { title: "La Peste", qty: 1, unit: 10 }, { title: "Atlas des sentiers de Corse", qty: 1, unit: 32 }, { title: "Savon huile d'olive", qty: 1, unit: 9 }] },
  { id: "CI-2026-0038", date: "2026-04-18T14:15:00+02:00", customer: "Saveriu Casanova", email: "saveriu.c@free.fr", items: 2, total: 33.5, delivery: "relais", status: "Livrée", tracking: "MR-2026-0014701",
    address: { street: "8 piazza San Ghjuvanni", zip: "20137", city: "Porto-Vecchio" },
    lines: [{ title: "Histoire de la Corse", qty: 1, unit: 28 }, { title: "Confiture de figue", qty: 1, unit: 7.5 }] },
  { id: "CI-2026-0037", date: "2026-04-18T11:48:00+02:00", customer: "Catarina Versini", email: "c.versini@protonmail.com", items: 5, total: 88.0, delivery: "domicile", status: "Expédiée", tracking: "CL-9F23-44A1",
    address: { street: "14 rue des Citronniers", zip: "06000", city: "Nice" },
    lines: [{ title: "La Fiera", qty: 1, unit: 19.5 }, { title: "Plein soleil", qty: 1, unit: 17 }, { title: "Cuisine de l'île", qty: 1, unit: 24 }, { title: "Foulard lin", qty: 1, unit: 22 }, { title: "Miel de printemps", qty: 1, unit: 5.5 }] },
  { id: "CI-2026-0036", date: "2026-04-17T17:25:00+02:00", customer: "Jean-Baptiste Rossi", email: "jb.rossi@gmail.com", items: 1, total: 22.5, delivery: "click", status: "Livrée",
    address: { street: "Place Paoli", zip: "20250", city: "Corte" },
    lines: [{ title: "L'Arabe du futur, t.1", qty: 1, unit: 22.5 }] },
  { id: "CI-2026-0035", date: "2026-04-17T10:02:00+02:00", customer: "Élise Pietri", email: "elise.p@yahoo.fr", items: 3, total: 41.0, delivery: "relais", status: "Livrée", tracking: "MR-2026-0014502",
    address: { street: "3 chemin de la Forge", zip: "20290", city: "Borgo" },
    lines: [{ title: "Le Petit Prince", qty: 1, unit: 9.9 }, { title: "La soupe au caillou", qty: 1, unit: 12.5 }, { title: "Marque-page cuir", qty: 1, unit: 14 }] },
  { id: "CI-2026-0034", date: "2026-04-16T15:30:00+02:00", customer: "Paul-François Giudicelli", email: "pf.giudicelli@orange.fr", items: 2, total: 26.0, delivery: "domicile", status: "Livrée", tracking: "CL-9F22-12B7",
    address: { street: "44 rue de Rivoli", zip: "75004", city: "Paris" },
    lines: [{ title: "Balco Atlantico", qty: 1, unit: 16.5 }, { title: "Alcools", qty: 1, unit: 7 }] },
  { id: "CI-2026-0033", date: "2026-04-16T09:00:00+02:00", customer: "Anna Filippi", email: "a.filippi@laposte.net", items: 1, total: 7.5, delivery: "click", status: "Livrée",
    address: { street: "Place Paoli", zip: "20250", city: "Corte" },
    lines: [{ title: "La Petite Fille de Monsieur Linh", qty: 1, unit: 7.5 }] },
  { id: "CI-2026-0032", date: "2026-04-15T18:40:00+02:00", customer: "Marc-Antoine Leca", email: "ma.leca@gmail.com", items: 6, total: 102.5, delivery: "domicile", status: "Livrée", tracking: "CL-9F20-77E2",
    address: { street: "12 boulevard Paoli", zip: "20200", city: "Bastia" },
    lines: [{ title: "Murtoriu", qty: 1, unit: 21 }, { title: "Atlas des sentiers", qty: 1, unit: 32 }, { title: "Bougie Maquis", qty: 1, unit: 28 }, { title: "Café 250g", qty: 2, unit: 9 }, { title: "Mug Tasse-Livre", qty: 1, unit: 3.5 }] },
  { id: "CI-2026-0031", date: "2026-04-15T11:18:00+02:00", customer: "Toussainte Renucci", email: "t.renucci@free.fr", items: 2, total: 24.5, delivery: "relais", status: "Livrée", tracking: "MR-2026-0014320",
    address: { street: "9 rue Sainte-Lucie", zip: "20220", city: "L'Île-Rousse" },
    lines: [{ title: "Tu appelleras Cendrars", qty: 1, unit: 19 }, { title: "Confiture de figue", qty: 1, unit: 5.5 }] },
];

export const adminCustomers = [
  { name: "Pierre Antonelli", email: "p.antonelli@orange.fr", orders: 14, total: 412.5, last: "2026-04-20", consent: "OK" },
  { name: "Marie Filippi", email: "marie.f@gmail.com", orders: 22, total: 678.0, last: "2026-04-20", consent: "OK" },
  { name: "Lucia Marchetti", email: "lucia.marchetti@laposte.net", orders: 8, total: 234.0, last: "2026-04-19", consent: "OK" },
  { name: "Antoine Dubois", email: "a.dubois@hotmail.fr", orders: 5, total: 187.5, last: "2026-04-19", consent: "À renouveler" },
  { name: "Saveriu Casanova", email: "saveriu.c@free.fr", orders: 11, total: 298.0, last: "2026-04-18", consent: "OK" },
  { name: "Catarina Versini", email: "c.versini@protonmail.com", orders: 19, total: 542.5, last: "2026-04-18", consent: "OK" },
  { name: "Jean-Baptiste Rossi", email: "jb.rossi@gmail.com", orders: 3, total: 76.0, last: "2026-04-17", consent: "OK" },
  { name: "Élise Pietri", email: "elise.p@yahoo.fr", orders: 7, total: 152.0, last: "2026-04-17", consent: "OK" },
  { name: "Paul-François Giudicelli", email: "pf.giudicelli@orange.fr", orders: 4, total: 98.5, last: "2026-04-16", consent: "À renouveler" },
  { name: "Anna Filippi", email: "a.filippi@laposte.net", orders: 31, total: 894.0, last: "2026-04-16", consent: "OK" },
  { name: "Marc-Antoine Leca", email: "ma.leca@gmail.com", orders: 9, total: 322.0, last: "2026-04-15", consent: "OK" },
  { name: "Toussainte Renucci", email: "t.renucci@free.fr", orders: 6, total: 134.5, last: "2026-04-15", consent: "OK" },
  { name: "Dominique Mariani", email: "d.mariani@orange.fr", orders: 2, total: 41.0, last: "2026-04-14", consent: "À renouveler" },
  { name: "Ghjuvan Petru Susini", email: "gp.susini@laposte.net", orders: 13, total: 387.5, last: "2026-04-13", consent: "OK" },
  { name: "Claire Battesti", email: "c.battesti@gmail.com", orders: 5, total: 124.0, last: "2026-04-12", consent: "OK" },
];

export interface EventRegistrant {
  name: string;
  email: string;
  phone: string;
  seats: number;
  registeredAt: string;
  present: boolean;
}

export function registrantsFor(slug: string): EventRegistrant[] {
  // deterministic mock based on slug length
  const base: EventRegistrant[] = [
    { name: "Pierre Antonelli", email: "p.antonelli@orange.fr", phone: "06 12 34 56 78", seats: 2, registeredAt: "2026-04-12", present: false },
    { name: "Marie Filippi", email: "marie.f@gmail.com", phone: "06 23 45 67 89", seats: 1, registeredAt: "2026-04-11", present: false },
    { name: "Lucia Marchetti", email: "lucia.marchetti@laposte.net", phone: "06 34 56 78 90", seats: 4, registeredAt: "2026-04-10", present: false },
    { name: "Antoine Dubois", email: "a.dubois@hotmail.fr", phone: "06 45 67 89 01", seats: 1, registeredAt: "2026-04-09", present: false },
    { name: "Saveriu Casanova", email: "saveriu.c@free.fr", phone: "06 56 78 90 12", seats: 2, registeredAt: "2026-04-08", present: false },
    { name: "Catarina Versini", email: "c.versini@protonmail.com", phone: "06 67 89 01 23", seats: 1, registeredAt: "2026-04-07", present: true },
    { name: "Jean-Baptiste Rossi", email: "jb.rossi@gmail.com", phone: "06 78 90 12 34", seats: 2, registeredAt: "2026-04-06", present: false },
    { name: "Élise Pietri", email: "elise.p@yahoo.fr", phone: "06 89 01 23 45", seats: 1, registeredAt: "2026-04-05", present: true },
    { name: "Toussainte Renucci", email: "t.renucci@free.fr", phone: "06 90 12 34 56", seats: 3, registeredAt: "2026-04-04", present: false },
    { name: "Marc-Antoine Leca", email: "ma.leca@gmail.com", phone: "06 11 22 33 44", seats: 1, registeredAt: "2026-04-03", present: false },
    { name: "Anna Filippi", email: "a.filippi@laposte.net", phone: "06 22 33 44 55", seats: 2, registeredAt: "2026-04-02", present: true },
    { name: "Ghjuvan Petru Susini", email: "gp.susini@laposte.net", phone: "06 33 44 55 66", seats: 1, registeredAt: "2026-04-01", present: false },
  ];
  const count = 8 + (slug.length % 5);
  return base.slice(0, count);
}
