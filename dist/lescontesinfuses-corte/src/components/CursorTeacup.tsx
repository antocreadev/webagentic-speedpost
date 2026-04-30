import React, { useEffect, useRef, useState } from "react";

interface Pt { x: number; y: number }
type Variant = "cup" | "book" | "bean" | "event" | "quill" | "point" | "heart";
type Mode = Variant | "native";

const NATIVE_SELECTOR =
  "iframe, input, textarea, [contenteditable='true'], [role='textbox']";

function detectMode(target: EventTarget | null): Mode {
  const el = target as HTMLElement | null;
  if (!el || !el.closest) return "cup";

  // Native form / map → no overlay, system cursor takes over
  if (el.closest(NATIVE_SELECTOR)) return "native";

  // Explicit override
  const ov = el.closest<HTMLElement>("[data-cursor]");
  if (ov) {
    const v = ov.getAttribute("data-cursor") as Variant;
    if (v) return v;
  }

  // Wishlist heart
  if (el.closest("[aria-label*='favoris'], [aria-label*='Coup de'], button[aria-label*='Heart']")) return "heart";

  // Book context
  if (el.closest(".book-3d, .book-cover, [data-book]")) return "book";

  // Event context
  if (el.closest(".event-card, [data-event]")) return "event";

  // Boisson / café context
  if (el.closest(".boisson-card, [data-boisson]")) return "bean";

  // Quill (editorial)
  if (el.closest("article.long-form, blockquote, [data-editorial]")) return "quill";

  // Route-based detection on closest anchor
  const link = el.closest<HTMLAnchorElement>("a[href]");
  if (link) {
    const href = link.getAttribute("href") || "";
    if (/^\/livres(\/|$)/.test(href)) return "book";
    if (/^\/cafe(\/|$)/.test(href)) return "bean";
    if (/^\/evenements(\/|$)/.test(href)) return "event";
    if (/^\/(journal|a-propos|equipe|recettes|lieu|fidelite|ateliers|partenaires|cartes-cadeaux)(\/|$)/.test(href))
      return "quill";
    if (/^\/(artisans)(\/|$)/.test(href)) return "point";
    return "point";
  }

  // Buttons that aren't natives
  if (el.closest("button:not([disabled])")) return "point";

  return "cup";
}

function CursorGlyph({ mode, clicking }: { mode: Variant; clicking: boolean }) {
  const baseStyle: React.CSSProperties = {
    opacity: clicking ? 0.45 : 1,
    transform: `translate(-50%, -50%) scale(${clicking ? 0.85 : 1})`,
  };
  const wrap = (children: React.ReactNode, w = 36, h = 44) => (
    <div className="pointer-events-none" style={baseStyle}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none" stroke="#4A2D1F" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );

  switch (mode) {
    case "cup":
      return wrap(
        <>
          <path d="M8 28 L 10 42 Q 10 46, 14 46 L 26 46 Q 30 46, 30 42 L 32 28 Z" fill="#FBF6E9" />
          <path d="M32 32 q 6 0, 6 5 q 0 5, -6 5" />
          <ellipse cx="20" cy="28" rx="12" ry="2" fill="#7C4F31" opacity=".25" />
          <path d="M14 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s1" />
          <path d="M20 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s2" />
          <path d="M26 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s3" />
        </>,
        40,
        50,
      );
    case "book":
      return wrap(
        <>
          {/* open book */}
          <path d="M4 12 Q 18 7, 32 12 L 32 32 Q 18 27, 4 32 Z" fill="#FBF6E9" />
          <path d="M18 9 L 18 30" stroke="#4A2D1F" strokeWidth="0.9" />
          {/* lines on left and right */}
          <path d="M8 17 q 6 -1.5, 8 0" stroke="#7C4F31" strokeWidth="0.55" />
          <path d="M8 21 q 6 -1.5, 8 0" stroke="#7C4F31" strokeWidth="0.55" />
          <path d="M20 17 q 6 -1.5, 8 0" stroke="#7C4F31" strokeWidth="0.55" />
          <path d="M20 21 q 6 -1.5, 8 0" stroke="#7C4F31" strokeWidth="0.55" />
          {/* bookmark ribbon */}
          <path d="M24 12 L 24 22 L 26 20 L 28 22 L 28 12" fill="#C77A4F" stroke="#9A4F2A" strokeWidth="0.6" />
        </>,
        36,
        36,
      );
    case "bean":
      // takeaway coffee cup with lid (universally readable for café)
      return wrap(
        <>
          {/* lid */}
          <path d="M10 10 L 26 10 L 25 14 L 11 14 Z" fill="#4A2D1F" stroke="#4A2D1F" strokeWidth="1" strokeLinejoin="round" />
          {/* sip hole */}
          <ellipse cx="18" cy="11.5" rx="2.5" ry="0.6" fill="#FBF6E9" />
          {/* cup body */}
          <path d="M11 14 L 13 32 Q 13 34, 15 34 L 21 34 Q 23 34, 23 32 L 25 14 Z" fill="#FBF6E9" stroke="#4A2D1F" strokeWidth="1.2" strokeLinejoin="round" />
          {/* coffee sleeve band */}
          <path d="M12 22 L 24 22" stroke="#C77A4F" strokeWidth="2.4" strokeLinecap="butt" />
          {/* steam */}
          <path d="M14 8 q -2 -3, 0 -6" className="cur-steam s1" stroke="#7C4F31" strokeWidth="1" fill="none" />
          <path d="M18 8 q -2 -3, 0 -6" className="cur-steam s2" stroke="#7C4F31" strokeWidth="1" fill="none" />
          <path d="M22 8 q -2 -3, 0 -6" className="cur-steam s3" stroke="#7C4F31" strokeWidth="1" fill="none" />
        </>,
        36,
        40,
      );
    case "event":
      // little calendar / ticket
      return wrap(
        <>
          <rect x="6" y="9" width="24" height="22" rx="2" fill="#FBF6E9" stroke="#4A2D1F" strokeWidth="1.1" />
          <path d="M6 15 L 30 15" stroke="#4A2D1F" strokeWidth="0.9" />
          <path d="M11 6 L 11 12" />
          <path d="M25 6 L 25 12" />
          <circle cx="13" cy="22" r="1.4" fill="#C77A4F" />
          <circle cx="18" cy="22" r="1.4" fill="#C77A4F" />
          <circle cx="23" cy="22" r="1.4" fill="#C77A4F" />
        </>,
        36,
        36,
      );
    case "quill":
      // feather quill
      return wrap(
        <>
          <path
            d="M6 32 Q 10 18, 24 8 Q 30 6, 32 4 Q 30 10, 28 14 Q 24 22, 16 28 Q 12 30, 8 32 Z"
            fill="#FBF6E9"
            stroke="#4A2D1F"
            strokeWidth="1"
          />
          <path d="M10 28 L 24 12" stroke="#7C4F31" strokeWidth="0.6" />
          <path d="M12 30 L 22 14" stroke="#7C4F31" strokeWidth="0.45" />
          <path d="M14 32 L 20 18" stroke="#7C4F31" strokeWidth="0.45" />
          {/* ink dot */}
          <circle cx="6" cy="32" r="1.2" fill="#4A2D1F" />
        </>,
        36,
        36,
      );
    case "heart":
      return wrap(
        <>
          <path
            d="M18 30 s -12 -7 -12 -16 a 6 6 0 0 1 12 -3 a 6 6 0 0 1 12 3 c 0 9 -12 16 -12 16 z"
            fill="#C77A4F"
            stroke="#9A4F2A"
            strokeWidth="1.1"
          />
        </>,
        36,
        34,
      );
    case "point":
    default:
      // Classic pointer arrow, sépia trait (instantly recognizable, hotspot top-left)
      return wrap(
        <>
          <path
            d="M6 4 L 6 26 L 12 21 L 15 27 L 18 26 L 15 20 L 22 19 Z"
            fill="#FBF6E9"
            stroke="#4A2D1F"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* small ink dot at the tip */}
          <circle cx="6" cy="4" r="0.8" fill="#4A2D1F" />
        </>,
        32,
        32,
      );
  }
}

export default function CursorTeacup() {
  const [pos, setPos] = useState<Pt>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Pt[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mode, setMode] = useState<Mode>("cup");
  const trailRef = useRef<Pt[]>([]);
  const lastModeRef = useRef<Mode>("cup");

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    // The html.lci-cursor class is added by inline script in BaseLayout <head>,
    // persists across view transitions, hides the OS cursor everywhere.

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      trailRef.current = [{ x: e.clientX, y: e.clientY }, ...trailRef.current].slice(0, 3);
      setTrail([...trailRef.current]);
      const m = detectMode(e.target);
      if (m !== lastModeRef.current) {
        lastModeRef.current = m;
        setMode(m);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!enabled || mode === "native") return null;

  const trailColor =
    mode === "bean"
      ? "rgba(124,79,49,0.20)"
      : mode === "heart"
      ? "rgba(199,122,79,0.22)"
      : "rgba(199,122,79,0.18)";

  return (
    <div className="lci-cursor" aria-hidden="true">
      {trail.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-[59] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: 6,
            height: 6,
            background: trailColor,
            opacity: (1 - i / 3) * 0.45,
            transition: "opacity 200ms ease-out",
          }}
        />
      ))}
      <div
        className="pointer-events-none fixed z-[60] transition-[transform,opacity] duration-150 ease-out"
        style={{ left: pos.x, top: pos.y }}
      >
        <CursorGlyph mode={mode as Variant} clicking={clicking} />
      </div>
      <style>{`
        .cur-steam { opacity: .55; animation: cur-rise 2.4s ease-out infinite; }
        .s1 { animation-delay: 0s; } .s2 { animation-delay: .5s; } .s3 { animation-delay: 1s; }
        @keyframes cur-rise {
          0% { transform: translateY(0); opacity: .6; }
          80% { opacity: 0; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
