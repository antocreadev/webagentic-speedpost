import React, { useState } from "react";
import { Instagram, Facebook, Heart, MessageCircle, Share2 } from "lucide-react";

const insta: { c: [string, string]; tall?: boolean; wide?: boolean; cap: string }[] = [
  { c: ["#5C3820", "#3A2014"], cap: "Étagère du matin" },
  { c: ["#C77A4F", "#9A4F2A"], tall: true, cap: "Cappuccino Catte" },
  { c: ["#8A9876", "#5A6647"], cap: "Coup de cœur Yourcenar" },
  { c: ["#8E6C90", "#5E456A"], wide: true, cap: "Soirée contes corses" },
  { c: ["#E2B594", "#C77A4F"], cap: "Brownie maison" },
  { c: ["#C9A37D", "#7C4F31"], cap: "Marque-pages cuir Petralba" },
  { c: ["#26150C", "#150B05"], cap: "Persepolis, intégrale" },
  { c: ["#C9B0C5", "#8E6C90"], tall: true, cap: "Kombucha pêche" },
  { c: ["#C7CDB7", "#5A6647"], cap: "Place Paoli, lumière du soir" },
  { c: ["#EAD9A6", "#C77A4F"], cap: "Cake du jour" },
  { c: ["#5A6647", "#3A2014"], wide: true, cap: "Citadelle, brume" },
  { c: ["#7C4F31", "#4A2D1F"], cap: "Atlas des sentiers" },
];

const facebook = [
  {
    title: "Dédicace Marcu Biancarelli ce vendredi",
    body: "Marcu sera parmi nous vendredi 9 mai à 18h pour une lecture et une dédicace. Entrée libre, réservation recommandée. Tisanes offertes.",
    likes: 87, comments: 12, shares: 9, date: "Il y a 2 jours",
  },
  {
    title: "Nouveau coup de cœur, Cuisine de l'île",
    body: "Soixante recettes corses, du brocciu aux canistrelli. Marie-Antoinette Maupertuis signe un livre qui sent la pierre chaude et le four à bois.",
    likes: 54, comments: 6, shares: 3, date: "Il y a 5 jours",
  },
  {
    title: "On ouvre bientôt nos portes",
    body: "Place Paoli, à deux pas de la citadelle. Premiers cafés tirés, premières pages tournées. Suivez les coulisses sur Instagram.",
    likes: 213, comments: 31, shares: 24, date: "Il y a 1 semaine",
  },
  {
    title: "Atelier d'écriture pour ados",
    body: "Deux heures de jeu littéraire, animées par une autrice locale, le 22 mai à 14h30. Inscription par mail.",
    likes: 41, comments: 4, shares: 2, date: "Il y a 1 semaine",
  },
  {
    title: "Le matcha latte est arrivé",
    body: "Matcha cérémonial, lait vapeur, sirop d'érable. Vert profond, mousse veloutée. À 4,50 €.",
    likes: 76, comments: 8, shares: 5, date: "Il y a 10 jours",
  },
  {
    title: "Carte café visible en ligne",
    body: "Toute la carte est désormais consultable depuis le site. Cliquez, zoomez, partagez. La version papier vous attend en boutique.",
    likes: 38, comments: 2, shares: 4, date: "Il y a 2 semaines",
  },
];

export default function SocialTabs() {
  const [tab, setTab] = useState<"instagram" | "facebook">("instagram");

  return (
    <div>
      <div className="flex justify-center gap-2 mb-12">
        <button
          onClick={() => setTab("instagram")}
          className={`btn-ghost ${tab === "instagram" ? "border-terracotta-400 text-terracotta-400" : ""}`}
        >
          <Instagram size={14} /> Instagram
        </button>
        <button
          onClick={() => setTab("facebook")}
          className={`btn-ghost ${tab === "facebook" ? "border-terracotta-400 text-terracotta-400" : ""}`}
        >
          <Facebook size={14} /> Facebook
        </button>
      </div>

      {tab === "instagram" && (
        <div>
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
            <div>
              <p className="font-display italic text-2xl text-cocoa-600">@lescontesinfuses</p>
              <p className="text-sm text-cocoa-400">1 248 abonnés, 86 publications</p>
            </div>
            <a href="#" className="btn-terracotta">
              <Instagram size={14} /> S'abonner
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto auto-rows-[180px]">
            {insta.map((p, i) => {
              const [c1, c2] = p.c;
              return (
                <a
                  href="#"
                  key={i}
                  className={`relative rounded-md overflow-hidden group ${p.tall ? "row-span-2" : ""} ${p.wide ? "col-span-2" : ""}`}
                  style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                  aria-label={p.cap}
                >
                  <div className="absolute inset-0 flex items-end p-3 bg-cocoa-900/0 group-hover:bg-cocoa-900/40 transition">
                    <p className="text-cream-50 text-xs font-body opacity-0 group-hover:opacity-100 transition">
                      {p.cap}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {tab === "facebook" && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-display italic text-2xl text-cocoa-600">Les Contes Infusés</p>
              <p className="text-sm text-cocoa-400">982 j'aime, 41 publications</p>
            </div>
            <a href="#" className="btn-terracotta">
              <Facebook size={14} /> J'aime
            </a>
          </div>
          <ul className="space-y-5">
            {facebook.map((p, i) => (
              <li key={i} className="bg-cream-50 border border-line rounded-2xl p-6">
                <p className="eyebrow">{p.date}</p>
                <h3 className="font-display italic text-xl text-cocoa-600 mt-1">{p.title}</h3>
                <p className="text-sm text-cocoa-700 mt-3 leading-relaxed">{p.body}</p>
                <div className="mt-4 flex items-center gap-5 text-xs text-cocoa-400 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Heart size={14} /> {p.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} /> {p.comments}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Share2 size={14} /> {p.shares}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
