import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  BookOpen,
  Users,
  CalendarDays,
  Package,
  Tag,
  LayoutDashboard,
  CornerDownLeft,
  Plus,
  Mail,
} from "lucide-react";

interface Item {
  id: string;
  label: string;
  hint?: string;
  group: "Pages" | "Commandes" | "Livres" | "Clients" | "Actions";
  href?: string;
  action?: () => void;
  icon: React.ElementType;
}

const STATIC_ITEMS: Item[] = [
  { id: "p_dash", label: "Tableau de bord", group: "Pages", href: "/admin", icon: LayoutDashboard },
  { id: "p_cmd", label: "Commandes", group: "Pages", href: "/admin/commandes", icon: ShoppingBag },
  { id: "p_pro", label: "Produits", group: "Pages", href: "/admin/produits", icon: BookOpen },
  { id: "p_evt", label: "Événements", group: "Pages", href: "/admin/evenements", icon: CalendarDays },
  { id: "p_stk", label: "Stocks", group: "Pages", href: "/admin/stocks", icon: Package },
  { id: "p_etq", label: "Étiquettes", group: "Pages", href: "/admin/etiquettes", icon: Tag },
  { id: "p_cli", label: "Clients", group: "Pages", href: "/admin/clients", icon: Users },
  { id: "a_new", label: "Ajouter un produit", group: "Actions", href: "/admin/produits/nouveau", icon: Plus, hint: "N" },
  { id: "a_print", label: "Imprimer toutes les étiquettes", group: "Actions", href: "/admin/etiquettes", icon: Tag },
  { id: "a_news", label: "Composer une newsletter", group: "Actions", href: "/admin", icon: Mail },
  { id: "c_42", label: "CI-2026-0042 · Pierre Antonelli", group: "Commandes", href: "/admin/commandes/CI-2026-0042", icon: ShoppingBag },
  { id: "c_41", label: "CI-2026-0041 · Marie Filippi", group: "Commandes", href: "/admin/commandes/CI-2026-0041", icon: ShoppingBag },
  { id: "c_40", label: "CI-2026-0040 · Lucia Marchetti", group: "Commandes", href: "/admin/commandes/CI-2026-0040", icon: ShoppingBag },
  { id: "b_murt", label: "Murtoriu, M. Biancarelli", group: "Livres", href: "/admin/produits", icon: BookOpen },
  { id: "b_hadr", label: "Mémoires d'Hadrien, M. Yourcenar", group: "Livres", href: "/admin/produits", icon: BookOpen },
  { id: "b_petit", label: "Le Petit Prince, Saint-Exupéry", group: "Livres", href: "/admin/produits", icon: BookOpen },
  { id: "cl_pa", label: "Pierre Antonelli", group: "Clients", href: "/admin/clients", icon: Users, hint: "p.antonelli@orange.fr" },
  { id: "cl_mf", label: "Marie Filippi", group: "Clients", href: "/admin/clients", icon: Users, hint: "marie.f@gmail.com" },
  { id: "cl_lm", label: "Lucia Marchetti", group: "Clients", href: "/admin/clients", icon: Users, hint: "lucia.marchetti@laposte.net" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    // open from external trigger
    const externalOpen = () => setOpen(true);
    window.addEventListener("lci:command-palette", externalOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("lci:command-palette", externalOpen as EventListener);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATIC_ITEMS;
    return STATIC_ITEMS.filter(
      (i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q) || (i.hint?.toLowerCase().includes(q) ?? false),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<Item["group"], Item[]>();
    filtered.forEach((it) => {
      const arr = map.get(it.group) ?? [];
      arr.push(it);
      map.set(it.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  function pick(it: Item) {
    setOpen(false);
    if (it.href) window.location.href = it.href;
    it.action?.();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[active];
      if (it) pick(it);
    }
  }

  if (!open) return null;

  let runIdx = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palette de commandes"
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-cocoa-900/35 backdrop-blur-[2px]"
        style={{ animation: "lci-cp-overlay .2s ease-out both" }}
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-cream-50 shadow-[0_30px_80px_-30px_rgba(74,45,31,0.45)]"
        style={{ animation: "lci-cp-pop .22s cubic-bezier(.2,.7,.2,1) both" }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={16} strokeWidth={1.6} className="text-cocoa-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Rechercher un livre, une commande, une page..."
            className="flex-1 bg-transparent font-sans text-sm text-cocoa-700 outline-none placeholder:text-cocoa-400/70"
          />
          <kbd className="rounded border border-line bg-cream-100 px-1.5 py-0.5 font-sans text-[10px] text-cocoa-400">
            Esc
          </kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <p className="px-4 py-6 text-center font-sans text-sm text-cocoa-400">
              Aucun résultat. Essayez "commandes", "livres" ou un nom.
            </p>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-4 py-1.5 font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">
                  {group}
                </p>
                <ul>
                  {items.map((it) => {
                    const i = runIdx++;
                    const Icon = it.icon;
                    const isActive = i === active;
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          onClick={() => pick(it)}
                          className={`flex w-full items-center gap-3 px-4 py-2 text-left font-sans text-sm transition-colors ${
                            isActive ? "bg-terracotta-50 text-cocoa-700" : "text-cocoa-700 hover:bg-cream-100/70"
                          }`}
                        >
                          <Icon size={15} strokeWidth={1.6} className={isActive ? "text-terracotta-400" : "text-cocoa-400"} />
                          <span className="flex-1 truncate">{it.label}</span>
                          {it.hint && <span className="font-mono text-[10px] text-cocoa-400">{it.hint}</span>}
                          {isActive && <CornerDownLeft size={13} strokeWidth={1.6} className="text-terracotta-400" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-line bg-cream-100/60 px-4 py-2 font-sans text-[10px] text-cocoa-400">
          <span>
            <kbd className="rounded border border-line bg-cream-50 px-1 py-0.5">↑</kbd>{" "}
            <kbd className="rounded border border-line bg-cream-50 px-1 py-0.5">↓</kbd> naviguer
          </span>
          <span>
            <kbd className="rounded border border-line bg-cream-50 px-1 py-0.5">↵</kbd> ouvrir
          </span>
        </div>
      </div>
      <style>{`
        @keyframes lci-cp-pop { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes lci-cp-overlay { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
