import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const SECTIONS = [
  {
    title: "Hero (page d'accueil)",
    keys: [
      { k: "hero.eyebrow", label: "Petit titre", multiline: false },
      { k: "hero.title", label: "Titre principal", multiline: false },
      { k: "hero.subtitle", label: "Sous-titre / accroche", multiline: true },
      { k: "hero.cta_primary", label: "CTA principal", multiline: false },
      { k: "hero.cta_secondary", label: "CTA secondaire", multiline: false },
    ],
  },
  {
    title: "À propos",
    keys: [
      { k: "about.intro", label: "Introduction", multiline: true },
      { k: "about.story", label: "Histoire", multiline: true },
      { k: "about.values", label: "Valeurs / engagements", multiline: true },
    ],
  },
  {
    title: "Livraison & retours",
    keys: [
      { k: "shipping.intro", label: "Délais / livraison", multiline: true },
      { k: "shipping.return", label: "Politique de retour", multiline: true },
    ],
  },
  {
    title: "Contact",
    keys: [
      { k: "contact.text", label: "Texte de la page contact", multiline: true },
    ],
  },
  {
    title: "FAQ",
    keys: [
      { k: "faq.q1.question", label: "Question 1", multiline: false },
      { k: "faq.q1.answer", label: "Réponse 1", multiline: true },
      { k: "faq.q2.question", label: "Question 2", multiline: false },
      { k: "faq.q2.answer", label: "Réponse 2", multiline: true },
      { k: "faq.q3.question", label: "Question 3", multiline: false },
      { k: "faq.q3.answer", label: "Réponse 3", multiline: true },
    ],
  },
];

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  async function load() {
    const r = await api.admin.content();
    const map: Record<string, string> = {};
    for (const c of r.content) map[c.key] = c.value;
    setContent(map);
  }
  useEffect(() => { load(); }, []);

  async function save(key: string) {
    setSavingKey(key);
    try {
      await api.admin.setContent(key, content[key] || "");
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="font-display text-4xl text-ink">Contenu du site</h1>
        <p className="text-sm text-ink-2 mt-1">Modifiez les textes affichés sur le site public.</p>
      </header>

      {SECTIONS.map((section) => (
        <section key={section.title} className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
          <h2 className="font-display text-2xl text-ink">{section.title}</h2>
          {section.keys.map((field) => (
            <div key={field.k}>
              <label className="field-label">{field.label} <span className="font-mono text-[10px] opacity-50 normal-case tracking-normal">{field.k}</span></label>
              {field.multiline ? (
                <textarea
                  rows={4}
                  value={content[field.k] || ""}
                  onChange={(e) => setContent({ ...content, [field.k]: e.target.value })}
                  onBlur={() => save(field.k)}
                  className="field-input"
                />
              ) : (
                <input
                  value={content[field.k] || ""}
                  onChange={(e) => setContent({ ...content, [field.k]: e.target.value })}
                  onBlur={() => save(field.k)}
                  className="field-input"
                />
              )}
              {savingKey === field.k && <p className="text-xs text-ink-2 mt-1">Enregistrement...</p>}
            </div>
          ))}
        </section>
      ))}

      <p className="text-xs text-ink-2 text-center pt-4">
        Les modifications sont enregistrées automatiquement à la perte de focus du champ.
      </p>
    </div>
  );
}
