import { useEffect, useState } from "react";
import { itemCount, readCart } from "@/lib/cart";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(itemCount(readCart()));
    sync();
    window.addEventListener("cart:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function open() {
    window.dispatchEvent(new CustomEvent("cart:open"));
  }

  return (
    <button
      onClick={open}
      className="relative inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium hover:border-rose-deep hover:bg-surface transition-all"
      aria-label={`Voir le panier (${count} articles)`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2l2.7 12.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.5L21 8H6" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
      </svg>
      <span className="hidden sm:inline">Panier</span>
      {count > 0 && (
        <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-ink">
          {count}
        </span>
      )}
    </button>
  );
}
