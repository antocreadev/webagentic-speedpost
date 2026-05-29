import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { register as apiRegister, login as apiLogin, recordConsent, apiError } from "@/lib/api";
import { authStore } from "@/lib/auth";
import { toast } from "@/lib/toast";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Mots de passe différents", "Vérifiez la confirmation.");
      return;
    }
    setLoading(true);
    try {
      await apiRegister({ email, password, first_name: firstName, last_name: lastName });
      const tokenRes = await apiLogin({ email, password });
      authStore.setSession(tokenRes.token, (tokenRes.user as any) ?? null);
      try { await recordConsent({ key: "marketing_email", granted: marketing }); } catch { /* ignore */ }
      toast.success("Compte créé.", "Bienvenue dans la maison.");
      window.location.assign("/compte");
    } catch (err) {
      const ee = await apiError(err);
      toast.error("Inscription impossible", ee.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Prénom
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Nom
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
      </div>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" autoComplete="email"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
      </label>
      <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
        Téléphone (facultatif)
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel"
          className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Mot de passe
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={8} autoComplete="new-password"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
        <label className="block text-xs font-smallcap tracking-widest uppercase text-cocoa-400">
          Confirmer
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} required type="password" minLength={8} autoComplete="new-password"
            className="mt-1 w-full px-4 py-2.5 rounded-full border border-line bg-paper font-body text-sm focus:outline-none focus:border-terracotta-400" />
        </label>
      </div>
      <label className="flex items-start gap-2 text-xs text-cocoa-400 font-sans">
        <input checked={marketing} onChange={(e) => setMarketing(e.target.checked)} type="checkbox" className="mt-0.5 accent-terracotta-400" />
        <span>Je souhaite recevoir la lettre mensuelle (facultatif).</span>
      </label>
      <button type="submit" disabled={loading} className="btn-terracotta w-full justify-center disabled:opacity-60">
        {loading ? <><Loader2 size={14} className="animate-spin" /> Création</> : "Créer mon compte"}
      </button>
      <p className="text-xs text-cocoa-400 text-center">
        Vous avez déjà un compte ? <a href="/auth/connexion" className="underline text-terracotta-400">Se connecter</a>
      </p>
    </form>
  );
}
