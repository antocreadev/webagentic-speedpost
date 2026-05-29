import { useState } from "react";
import { Loader2 } from "lucide-react";
import { login as apiLogin, apiError } from "@/lib/api";
import { authStore } from "@/lib/auth";
import { toast } from "@/lib/toast";

interface Props {
  redirectTo?: string;
  defaultEmail?: string;
  mode?: "admin" | "client";
}

export default function LoginForm({ redirectTo, defaultEmail = "", mode = "client" }: Props) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLogin({ email, password });
      authStore.setSession(res.token, (res.user as any) ?? null);
      const user = authStore.getUser();
      const isAdmin = user?.scope === "admin";

      if (mode === "admin" && !isAdmin) {
        authStore.clearSession();
        toast.error("Accès refusé", "Ce compte n'a pas les droits administrateur.");
        setLoading(false);
        return;
      }

      toast.success("Connecté", "Redirection en cours.");

      const queryNext = new URLSearchParams(window.location.search).get("next");
      let target: string;
      if (mode === "admin") {
        target = "/admin";
      } else if (isAdmin) {
        target = "/admin";
      } else {
        const candidate = queryNext || redirectTo || "/compte";
        target = candidate.startsWith("/admin") ? "/compte" : candidate;
      }
      window.location.replace(target);
    } catch (err) {
      const e = await apiError(err);
      toast.error("Connexion impossible", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
        />
      </label>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Mot de passe
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="btn-terracotta w-full justify-center disabled:opacity-60"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> Connexion</> : "Se connecter"}
      </button>
      <div className="flex items-center justify-between text-xs text-cocoa-400 font-sans">
        <a href={mode === "admin" ? "/admin/forgot" : "/auth/mot-de-passe-oublie"} className="hover:text-terracotta-400">Mot de passe oublié</a>
        <a href="/auth/inscription" className="hover:text-terracotta-400">Créer un compte</a>
      </div>
    </form>
  );
}
