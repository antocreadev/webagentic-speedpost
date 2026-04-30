import { useEffect, useState } from "react";
import { X, Mail, ShoppingBag, ShieldCheck, Calendar, Download, Trash2 } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  orders: number;
  total: number;
  last: string;
  consent: string;
}

interface Props {
  customers: Customer[];
}

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function CustomerPanel({ customers }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Customer | null>(null);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent).detail as { email?: string };
      const c = customers.find((x) => x.email === detail?.email);
      if (c) {
        setActive(c);
        setOpen(true);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("lci:open-customer", onOpen as EventListener);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("lci:open-customer", onOpen as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, customers]);

  if (!open || !active) return null;

  // Mocked order history
  const history = Array.from({ length: Math.min(active.orders, 6) }, (_, i) => ({
    id: `CI-2026-00${(40 - i).toString().padStart(2, "0")}`,
    date: `${20 - i} avril 2026`,
    total: +((active.total / Math.max(active.orders, 1)) * (0.7 + i * 0.07)).toFixed(2),
    status: i === 0 ? "À traiter" : i === 1 ? "Préparée" : "Livrée",
  }));

  const initials = active.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Fiche client">
      <button
        type="button"
        aria-label="Fermer"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-cocoa-900/40"
        style={{ animation: "lci-cp-overlay .2s ease-out both" }}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-[0_0_60px_-10px_rgba(74,45,31,0.5)]"
        style={{ animation: "lci-slideover .3s cubic-bezier(.2,.7,.2,1) both" }}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">Fiche client</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="rounded p-1.5 text-cocoa-400 hover:bg-cream-100 hover:text-cocoa-700"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-400 to-cocoa-500 font-sans text-base font-medium text-cream-50">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl italic text-cocoa-700">{active.name}</h2>
              <a href={`mailto:${active.email}`} className="font-sans text-sm text-cocoa-400 hover:text-terracotta-400">
                {active.email}
              </a>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Commandes" value={String(active.orders)} icon={ShoppingBag} />
            <Stat label="Total dépensé" value={formatPrice(active.total)} icon={Download} />
            <Stat label="Dernière" value={active.last.slice(5)} icon={Calendar} />
          </dl>

          <section className="mt-7">
            <h3 className="font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">Historique</h3>
            <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-cream-100/40">
              {history.map((h) => (
                <li key={h.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-cocoa-700">{h.id}</p>
                    <p className="font-sans text-[11px] text-cocoa-400">{h.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-sm tabular-nums text-cocoa-700">{formatPrice(h.total)}</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-cocoa-400">{h.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-7">
            <h3 className="font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">RGPD</h3>
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-line bg-cream-100/40 px-4 py-3">
              <ShieldCheck size={18} strokeWidth={1.6} className={active.consent === "OK" ? "text-sage-600" : "text-terracotta-600"} />
              <div className="flex-1">
                <p className="font-sans text-sm text-cocoa-700">
                  Consentement : <span className="font-medium">{active.consent}</span>
                </p>
                <p className="mt-0.5 font-sans text-[11px] text-cocoa-400">
                  Newsletter : opt-in. Conservation : 3 ans après dernière commande.
                </p>
              </div>
            </div>
          </section>
        </div>
        <footer className="flex items-center gap-2 border-t border-line bg-cream-100/40 px-6 py-3">
          <button type="button" className="btn-ghost !py-2 !px-4 !text-[11px]">
            <Mail size={14} strokeWidth={1.6} /> Email
          </button>
          <button type="button" className="btn-ghost !py-2 !px-4 !text-[11px]">
            <Download size={14} strokeWidth={1.6} /> Export
          </button>
          <button type="button" className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-terracotta-400/40 px-4 py-2 font-smallcap text-[11px] uppercase tracking-widest text-terracotta-600 hover:bg-terracotta-50">
            <Trash2 size={13} strokeWidth={1.6} /> Anonymiser
          </button>
        </footer>
      </aside>
      <style>{`
        @keyframes lci-slideover { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes lci-cp-overlay { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="rounded-lg border border-line bg-cream-100/40 px-3 py-2.5">
      <div className="flex items-center gap-1.5 font-smallcap text-[9px] uppercase tracking-windier text-cocoa-400">
        <Icon size={11} strokeWidth={1.6} />
        {label}
      </div>
      <p className="mt-1 font-display italic text-lg text-cocoa-700 tabular-nums">{value}</p>
    </div>
  );
}
