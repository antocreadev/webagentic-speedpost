import { useState } from "react";
import { api } from "@/lib/api";

export default function LoginForm() {
  const [email, setEmail] = useState("hello@jennyland.fr");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await api.login(email, password);
      window.location.href = "/admin";
    } catch (e: any) {
      setErr("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="field-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="field-label">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
          required
          autoComplete="current-password"
        />
      </div>
      {err && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-900">
          {err}
        </div>
      )}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      <p className="text-xs text-ink-2 leading-relaxed pt-2">
        Bootstrap : à la première connexion, le mot de passe que vous saisissez devient celui de l'admin
        <code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded">hello@jennyland.fr</code>.
      </p>
    </form>
  );
}
