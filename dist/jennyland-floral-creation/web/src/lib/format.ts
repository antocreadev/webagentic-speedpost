export function formatEur(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export function formatEurShort(cents: number): string {
  return `${(cents / 100).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`;
}

export function formatDateFr(timestamp: number): string {
  const d = new Date(timestamp * 1000);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function pluralize(n: number, singular: string, plural?: string): string {
  return n <= 1 ? `${n} ${singular}` : `${n} ${plural || singular + "s"}`;
}

export function whatsappLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
