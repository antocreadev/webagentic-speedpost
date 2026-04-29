import React, { useState } from "react";
import type { ArtisanProduct } from "@/data/artisans";
import { formatPrice } from "@/lib/format";

interface Props {
  products: ArtisanProduct[];
}

const CATS: { slug: ArtisanProduct["category"] | "tous"; label: string }[] = [
  { slug: "tous", label: "Tous" },
  { slug: "bougie", label: "Bougies" },
  { slug: "papeterie", label: "Papeterie" },
  { slug: "ceramique", label: "Céramique" },
  { slug: "textile", label: "Textile" },
  { slug: "soin", label: "Soin" },
  { slug: "epicerie", label: "Épicerie" },
];

const palette: Record<string, [string, string]> = {
  bougie: ["#E2B594", "#9A4F2A"],
  marquepage: ["#C9A37D", "#7C4F31"],
  mug: ["#F2E7C4", "#C77A4F"],
  foulard: ["#C9B0C5", "#8E6C90"],
  savon: ["#C7CDB7", "#5A6647"],
  miel: ["#EAD9A6", "#C77A4F"],
  confiture: ["#C77A4F", "#5C3820"],
};

export default function ArtisansFilter({ products }: Props) {
  const [cat, setCat] = useState<ArtisanProduct["category"] | "tous">("tous");
  const list = cat === "tous" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATS.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCat(c.slug)}
            className={`chip transition ${
              cat === c.slug
                ? "bg-cocoa-600 text-cream-50 border-cocoa-600"
                : "hover:border-terracotta-400"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {list.map((p) => {
          const [c1, c2] = palette[p.imageKey] ?? ["#C9A37D", "#7C4F31"];
          return (
            <a key={p.slug} href={`/artisans/${p.slug}`} className="group block">
              <div
                className="aspect-square rounded-2xl border border-line overflow-hidden relative transition-transform group-hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
              >
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="text-cream-50">
                    <p className="font-smallcap tracking-widest text-[10px] uppercase opacity-80">
                      {p.artisan}, {p.city}
                    </p>
                    <p className="font-display italic text-xl mt-1">{p.name}</p>
                  </div>
                </div>
                <svg
                  viewBox="0 0 60 60"
                  width="50"
                  height="50"
                  className="absolute top-4 right-4 opacity-30"
                  fill="none"
                  stroke="#FBF6E9"
                  strokeWidth="0.6"
                >
                  <circle cx="30" cy="30" r="22" />
                  <circle cx="30" cy="30" r="14" />
                </svg>
              </div>
              <div className="mt-3 px-1">
                <p className="font-display italic text-cocoa-600 group-hover:text-terracotta-400 transition">
                  {p.name}
                </p>
                <p className="font-body text-cocoa-400 text-xs mt-0.5">
                  {p.artisan}, {p.city}
                </p>
                <p className="price-tab text-sm mt-1">{formatPrice(p.price)}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
