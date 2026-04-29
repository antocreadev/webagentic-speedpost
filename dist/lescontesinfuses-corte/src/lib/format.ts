export function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const MOIS = [
  "janvier","février","mars","avril","mai","juin",
  "juillet","août","septembre","octobre","novembre","décembre"
];
const JOURS = [
  "dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"
];

export function formatDate(iso: string, fmt: "long" | "short" | "day" | "month" = "long"): string {
  const d = new Date(iso);
  if (fmt === "day") return String(d.getDate()).padStart(2, "0");
  if (fmt === "month") return MOIS[d.getMonth()].slice(0, 3);
  if (fmt === "short") return `${d.getDate()} ${MOIS[d.getMonth()].slice(0,3)}.`;
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
}

export function relativeDate(iso: string): string {
  const d = new Date(iso).getTime();
  const now = Date.now();
  const diffDays = Math.round((d - now) / 86400000);
  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return "demain";
  if (diffDays > 0 && diffDays < 7) return `dans ${diffDays} jours`;
  return formatDate(iso, "short");
}
