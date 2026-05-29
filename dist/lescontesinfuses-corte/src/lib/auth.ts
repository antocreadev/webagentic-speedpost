import { decodeJwt } from "jose";

export type AuthUser = {
  email: string;
  first_name?: string;
  last_name?: string;
  scope?: string;
};

const TOKEN_KEY = "lci_token";
const USER_KEY = "lci_user";
const EVENT = "lci:auth";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readUserFromToken(token: string): AuthUser | null {
  try {
    const claims = decodeJwt(token) as Record<string, unknown>;
    const exp = typeof claims.exp === "number" ? claims.exp : 0;
    if (exp && exp * 1000 < Date.now()) return null;
    return {
      email: String(claims.sub ?? claims.email ?? ""),
      first_name: typeof claims.first_name === "string" ? claims.first_name : undefined,
      last_name: typeof claims.last_name === "string" ? claims.last_name : undefined,
      scope: typeof claims.scope === "string"
        ? claims.scope
        : Array.isArray(claims.scopes) && claims.scopes.includes("admin")
          ? "admin"
          : Array.isArray(claims.scopes) && claims.scopes.length > 0
            ? String(claims.scopes[0])
            : undefined,
    };
  } catch {
    return null;
  }
}

type Listener = (state: { token: string | null; user: AuthUser | null }) => void;
const listeners = new Set<Listener>();

function emit(): void {
  if (!isBrowser()) return;
  const payload = { token: authStore.getToken(), user: authStore.getUser() };
  for (const l of listeners) {
    try { l(payload); } catch { /* ignore */ }
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: payload }));
}

export const authStore = {
  getToken(): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  getUser(): AuthUser | null {
    if (!isBrowser()) return null;
    const cached = localStorage.getItem(USER_KEY);
    if (cached) {
      try { return JSON.parse(cached) as AuthUser; } catch { /* ignore */ }
    }
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? readUserFromToken(token) : null;
  },
  isAuthenticated(): boolean {
    return !!authStore.getToken() && !!authStore.getUser();
  },
  isAdmin(): boolean {
    const u = authStore.getUser();
    return !!u && u.scope === "admin";
  },
  setSession(token: string, user?: AuthUser | null): void {
    if (!isBrowser()) return;
    localStorage.setItem(TOKEN_KEY, token);
    const u = user ?? readUserFromToken(token);
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
    emit();
  },
  clearSession(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    emit();
  },
  subscribe(cb: Listener): () => void {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};
