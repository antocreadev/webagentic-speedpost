import { useEffect, useState } from "react";
import { Loader2, ShoppingBag, User, Mail, Shield, LayoutDashboard } from "lucide-react";
import { getMe, type AuthUserResponse } from "@/lib/api";
import { authStore } from "@/lib/auth";

function greetingName(user: AuthUserResponse | null, fallback?: string | null): string {
  const fn = user?.first_name?.trim();
  if (fn) return fn;
  if (fallback && fallback.trim()) return fallback.trim();
  if (user?.email) return user.email.split("@")[0];
  return "";
}

export default function MyAccount() {
  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = authStore.getUser();
    if (cached) {
      setUser({ email: cached.email, first_name: cached.first_name, last_name: cached.last_name, scope: cached.scope });
    }
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
        // Refresh local cache
        const tok = authStore.getToken();
        if (tok) {
          authStore.setSession(tok, {
            email: me.email,
            first_name: me.first_name,
            last_name: me.last_name,
            scope: me.scope,
          });
        }
      } catch {
        /* ignore, AuthGuard will redirect on 401 */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const name = greetingName(user);
  const greeting = name ? `Bonjour ${name}` : "Bonjour";
  const isAdmin = user?.scope === "admin";

  const cards = [
    { href: "/compte/commandes", eyebrow: "Historique", title: "Mes commandes", desc: "Consultez l'état et le suivi de vos commandes.", Icon: ShoppingBag },
    { href: "/compte/informations", eyebrow: "Profil", title: "Mes informations", desc: "Adresse, téléphone, email.", Icon: User },
    { href: "/compte/preferences", eyebrow: "Préférences", title: "Newsletter et alertes", desc: "Lettre mensuelle, rappels d'événements.", Icon: Mail },
    { href: "/compte/donnees", eyebrow: "RGPD", title: "Mes données", desc: "Export, suppression, journal de consentement.", Icon: Shield },
  ];

  return (
    <>
      <header className="mb-10">
        <p className="eyebrow">Espace personnel</p>
        <h1 className="font-display italic text-5xl md:text-6xl text-cocoa-600 mt-2">
          {loading && !user ? <span className="opacity-60">Bonjour</span> : greeting}
        </h1>
        <p className="font-body italic text-cocoa-400 mt-3 max-w-xl">
          Ravis de vous retrouver. Voici un raccourci vers vos commandes, vos préférences et vos données.
        </p>
      </header>

      {isAdmin && (
        <a
          href="/admin"
          className="group block bg-cocoa-700 hover:bg-cocoa-800 transition-colors rounded-2xl p-6 md:p-8 mb-8 text-cream-50 shadow-book"
        >
          <div className="flex items-start md:items-center gap-5 flex-col md:flex-row md:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-terracotta-400/20 border border-terracotta-200/30 flex items-center justify-center shrink-0">
                <LayoutDashboard size={22} color="#FFB88A" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-smallcap tracking-widest uppercase text-[10px] text-terracotta-200">Espace administration</p>
                <p className="font-display italic text-2xl md:text-3xl text-cream-50 mt-1">Tableau de bord administrateur</p>
                <p className="text-sm text-cream-100/80 mt-2 max-w-xl">Gérez les commandes, le catalogue, les événements, les stocks et les clients.</p>
              </div>
            </div>
            <span className="font-smallcap tracking-widest uppercase text-xs text-cream-50 border border-cream-50/30 group-hover:border-terracotta-200 px-5 py-2.5 rounded-full transition-colors shrink-0">
              Ouvrir
            </span>
          </div>
        </a>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <a key={c.href} href={c.href} className="group bg-cream-50 border border-line rounded-2xl p-6 hover:border-terracotta-400 hover:shadow-book transition-all">
            <div className="w-10 h-10 rounded-full bg-terracotta-50 flex items-center justify-center mb-4">
              <c.Icon size={18} color="#C77A4F" strokeWidth={1.5} />
            </div>
            <p className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400">{c.eyebrow}</p>
            <p className="font-display italic text-xl text-cocoa-700 mt-1 group-hover:text-terracotta-400 transition-colors">{c.title}</p>
            <p className="text-xs text-cocoa-400 mt-2 leading-relaxed">{c.desc}</p>
          </a>
        ))}
      </div>
    </>
  );
}

// ----- Orders island -----

import { getMyOrders, type Order } from "@/lib/api";

export function MyOrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await getMyOrders({ limit: 50 });
        const list: Order[] = Array.isArray(r) ? r : (r as any)?.items ?? [];
        setOrders(list);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-cocoa-400 text-sm">
        <Loader2 className="animate-spin" size={16} /> <span>Chargement de vos commandes</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-cream-50 px-8 py-14 text-center">
        <p className="font-display italic text-3xl text-cocoa-600">Aucune commande pour l'instant.</p>
        <p className="text-cocoa-400 mt-3 max-w-md mx-auto">
          Quand vous passerez votre première commande, son suivi s'affichera ici.
        </p>
        <a href="/livres" className="btn-terracotta mt-6 inline-flex">Découvrir le catalogue</a>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 border border-line rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-cream-100/70 border-b border-line">
          <tr className="text-left">
            <th className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400 px-5 py-3">N°</th>
            <th className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400 px-5 py-3 hidden md:table-cell">Date</th>
            <th className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400 px-5 py-3 hidden md:table-cell">Articles</th>
            <th className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400 px-5 py-3">Statut</th>
            <th className="font-smallcap tracking-widest uppercase text-[10px] text-cocoa-400 px-5 py-3 text-right">Total</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {orders.map((o) => {
            const items = Array.isArray(o.items) ? o.items : [];
            const itemsLabel = items
              .map((it: any) => it.name || it.title || it.product_name || it.slug || "Article")
              .join(", ");
            const date = o.created_at ? new Date(o.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "";
            const isDone = (o.status || "").toLowerCase().includes("livr") || (o.status || "").toLowerCase().includes("delivered");
            const tone = isDone ? "sage" : "terracotta";
            return (
              <tr key={o.id} className="hover:bg-cream-100/30 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-cocoa-700 tabular-nums">{o.id}</td>
                <td className="px-5 py-4 text-cocoa-400 hidden md:table-cell">{date}</td>
                <td className="px-5 py-4 text-cocoa-700 hidden md:table-cell max-w-[260px] truncate">{itemsLabel || "-"}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${tone === "sage" ? "bg-sage-200/40 text-sage-600" : "bg-terracotta-50 text-terracotta-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${tone === "sage" ? "bg-sage-400" : "bg-terracotta-400"}`}></span>
                    {o.status || "En cours"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right tabular-nums">{((o.total_cents ?? 0) / 100).toFixed(2).replace(".", ",")} €</td>
                <td className="px-5 py-4 text-right">
                  <a href={`/suivi/${o.id}`} className="text-xs text-terracotta-400 hover:underline">Suivre</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ----- Informations form -----

import { updateMe, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

export function MyInformationsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me: any = await getMe();
        setFirstName(me.first_name || "");
        setLastName(me.last_name || "");
        setEmail(me.email || "");
        setPhone(me.phone || "");
        const addr = me.address || {};
        setStreet(addr.street || me.street || "");
        setZip(addr.zip || me.zip || "");
        setCity(addr.city || me.city || "");
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateMe({
        first_name: firstName,
        last_name: lastName,
        phone,
        address: { street, zip, city },
      });
      toast.success("Enregistré", "Vos informations ont été mises à jour.");
    } catch (err) {
      const e = await apiError(err);
      toast.error("Sauvegarde impossible", e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-cocoa-400 text-sm">
        <Loader2 className="animate-spin" size={16} /> <span>Chargement</span>
      </div>
    );
  }

  const inputCls = "mt-1 w-full bg-paper border border-line rounded-md px-3 py-2.5 text-sm font-sans text-cocoa-700 focus:outline-none focus:border-terracotta-400";
  const labelCls = "text-[11px] font-smallcap tracking-widest uppercase text-cocoa-400";

  return (
    <form onSubmit={onSave} className="bg-cream-50 border border-line rounded-2xl p-6 md:p-8 space-y-6">
      <fieldset>
        <legend className="font-display italic text-2xl text-cocoa-700 mb-4">Identité</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className={labelCls}>Prénom</span>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Nom</span>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend className="font-display italic text-2xl text-cocoa-700 mb-4">Contact</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2">
            <span className={labelCls}>Email</span>
            <input type="email" value={email} disabled className={inputCls + " opacity-70"} />
          </label>
          <label className="block">
            <span className={labelCls}>Téléphone</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend className="font-display italic text-2xl text-cocoa-700 mb-4">Adresse de livraison</legend>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block sm:col-span-3">
            <span className={labelCls}>Rue</span>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Code postal</span>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className={inputCls} />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelCls}>Ville</span>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
          </label>
        </div>
      </fieldset>
      <div className="pt-6 border-t border-line flex justify-end gap-3">
        <a href="/compte" className="btn-ghost">Annuler</a>
        <button type="submit" disabled={saving} className="btn-terracotta disabled:opacity-60">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Enregistrement</> : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

// ----- Preferences form -----

import { getMyPreferences, updateMyPreferences } from "@/lib/api";

const TOGGLES = [
  { key: "newsletter", label: "Lettre mensuelle", desc: "Une fois par mois, les coups de cœur, les événements à venir, les coulisses de la maison." },
  { key: "events", label: "Rappels d'événements", desc: "Un message la veille des événements auxquels vous êtes inscrit." },
  { key: "stock", label: "Alertes stock", desc: "Quand un livre sauvegardé revient en rayon." },
  { key: "promo", label: "Bons plans", desc: "Soldes encadrées, ventes privées d'éditeurs partenaires. Au plus 4 par an." },
  { key: "sms", label: "Notifications SMS", desc: "Pour le retrait Click & Collect et la disponibilité en relais." },
];

export function MyPreferencesForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        const p = await getMyPreferences();
        const flat: Record<string, boolean> = {};
        for (const t of TOGGLES) flat[t.key] = !!(p as any)[t.key];
        setPrefs(flat);
      } catch {
        const flat: Record<string, boolean> = {};
        for (const t of TOGGLES) flat[t.key] = false;
        setPrefs(flat);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function toggle(k: string) {
    setPrefs((p) => ({ ...p, [k]: !p[k] }));
  }

  async function onSave() {
    setSaving(true);
    try {
      await updateMyPreferences(prefs);
      toast.success("Préférences enregistrées.");
    } catch (err) {
      const e = await apiError(err);
      toast.error("Sauvegarde impossible", e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-cocoa-400 text-sm">
        <Loader2 className="animate-spin" size={16} /> <span>Chargement</span>
      </div>
    );
  }

  return (
    <>
      <section className="bg-cream-50 border border-line rounded-2xl p-6 md:p-8">
        <h2 className="font-display italic text-2xl text-cocoa-700">Communications</h2>
        <ul className="mt-6 divide-y divide-line">
          {TOGGLES.map((t) => {
            const on = !!prefs[t.key];
            return (
              <li key={t.key} className="py-4 flex items-start gap-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggle(t.key)}
                  className={`shrink-0 mt-1 w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-terracotta-400" : "bg-cream-200"}`}
                >
                  <span className={`block w-5 h-5 rounded-full bg-cream-50 shadow transition-transform ${on ? "translate-x-5" : ""}`}></span>
                </button>
                <div className="flex-1">
                  <p className="font-display italic text-lg text-cocoa-700">{t.label}</p>
                  <p className="text-xs text-cocoa-400 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="mt-8 flex justify-end gap-3">
        <a href="/compte" className="btn-ghost">Retour</a>
        <button type="button" onClick={onSave} disabled={saving} className="btn-terracotta disabled:opacity-60">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Enregistrement</> : "Enregistrer mes choix"}
        </button>
      </div>
    </>
  );
}
