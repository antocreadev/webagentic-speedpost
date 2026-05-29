// Image URL helper. Prefixes API base if path is relative.
const BASE =
  (import.meta as ImportMeta & { env: Record<string, string> }).env?.PUBLIC_API_BASE ||
  "http://localhost:8000";

export function imageUrl(path: string | null | undefined, fallback?: string): string {
  if (!path) return fallback ?? "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const apiBase = BASE;
