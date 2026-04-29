import React, { useEffect, useState } from "react";

export default function SplashLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    try {
      if (sessionStorage.getItem("cif_visited")) return;
      sessionStorage.setItem("cif_visited", "1");
    } catch {
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 1700);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="lci-splash" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        width="120"
        height="120"
        fill="none"
        stroke="#4A2D1F"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <circle cx="100" cy="100" r="80" stroke="#7C4F31" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="64" stroke="#7C4F31" strokeWidth="0.6" strokeDasharray="1 3" />
        <g transform="translate(100,118)">
          <path
            d="M -36 0 Q -18 -8, 0 -2 Q 18 -8, 36 0 L 36 14 Q 18 6, 0 12 Q -18 6, -36 14 Z"
            fill="#FBF6E9"
          />
          <path d="M 0 -2 L 0 12" />
        </g>
        <g transform="translate(100,98)">
          <path d="M -14 6 L -12 18 Q -12 22, -8 22 L 8 22 Q 12 22, 12 18 L 14 6 Z" fill="#FBF6E9" />
          <path d="M 14 9 q 6 0, 6 6 q 0 6, -6 6" />
          <path d="M -6 0 q -3 -4, 0 -8 q 3 -4, 0 -8" />
          <path d="M 0 0 q -3 -4, 0 -8 q 3 -4, 0 -8" />
          <path d="M 6 0 q -3 -4, 0 -8 q 3 -4, 0 -8" />
        </g>
      </svg>
      <p className="lci-splash-tagline">Les Contes Infusés</p>
    </div>
  );
}
