import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const GROUPS = [
  {
    title: "Identité de marque",
    keys: [
      { k: "brand.name", label: "Nom de la boutique" },
      { k: "brand.tagline", label: "Accroche / signature" },
      { k: "artisan.first_name", label: "Prénom de l'artisane" },
      { k: "artisan.last_name", label: "Nom de l'artisane" },
      { k: "artisan.city", label: "Ville" },
      { k: "artisan.country", label: "Pays" },
    ],
  },
  {
    title: "Contact public",
    keys: [
      { k: "contact.email", label: "Email" },
      { k: "contact.whatsapp", label: "WhatsApp (avec indicatif, ex +33600000000)" },
      { k: "contact.instagram", label: "Instagram (handle sans @)" },
    ],
  },
  {
    title: "Paiement PayPal",
    keys: [
      { k: "paypal.handle", label: "Identifiant PayPal.me (jenny)" },
      { k: "paypal.live", label: "Mode live (1 = production, 0 = sandbox)" },
    ],
  },
  {
    title: "Livraison",
    keys: [
      { k: "shipping.standard_cents", label: "Mondial Relay (centimes, ex 800 = 8 €)" },
      { k: "shipping.tracked_cents", label: "Colissimo Suivi (centimes)" },
      { k: "shipping.free_threshold_cents", label: "Seuil livraison offerte (centimes, ex 10000 = 100 €)" },
    ],
  },
  {
    title: "Mentions légales",
    keys: [
      { k: "legal.siret", label: "SIRET" },
      { k: "legal.tva", label: "Numéro TVA intracommunautaire" },
    ],
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  async function load() {
    const r = await api.admin.settings();
    const map: Record<string, string> = {};
    for (const s of r.settings) map[s.key] = s.value;
    setSettings(map);
  }
  useEffect(() => { load(); }, []);

  async function save(key: string) {
    setSavingKey(key);
    try {
      await api.admin.setSetting(key, settings[key] || "");
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="font-display text-4xl text-ink">Paramètres</h1>
        <p className="text-sm text-ink-2 mt-1">Identité de la boutique, intégrations, frais de livraison.</p>
      </header>

      {GROUPS.map((group) => (
        <section key={group.title} className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
          <h2 className="font-display text-2xl text-ink">{group.title}</h2>
          {group.keys.map((field) => (
            <div key={field.k}>
              <label className="field-label">{field.label} <span className="font-mono text-[10px] opacity-50 normal-case tracking-normal">{field.k}</span></label>
              <input
                value={settings[field.k] || ""}
                onChange={(e) => setSettings({ ...settings, [field.k]: e.target.value })}
                onBlur={() => save(field.k)}
                className="field-input"
              />
              {savingKey === field.k && <p className="text-xs text-ink-2 mt-1">Enregistrement...</p>}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
