import React, { useEffect, useRef, useState } from "react";

interface Pt { x: number; y: number }

export default function CursorTeacup() {
  const [pos, setPos] = useState<Pt>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Pt[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [clicking, setClicking] = useState(false);
  const trailRef = useRef<Pt[]>([]);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      trailRef.current = [{ x: e.clientX, y: e.clientY }, ...trailRef.current].slice(0, 3);
      setTrail([...trailRef.current]);
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

  if (!enabled) return null;

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
            background: "rgba(199,122,79,0.18)",
            opacity: (1 - i / 3) * 0.5,
            transition: "opacity 200ms ease-out",
          }}
        />
      ))}
      <div
        className="pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-150 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: clicking ? 0.3 : 1,
          transform: `translate(-50%,-50%) scale(${clicking ? 0.85 : 1})`,
        }}
      >
        <svg viewBox="0 0 40 50" width="36" height="44" fill="none" stroke="#4A2D1F" strokeWidth="1.1" strokeLinecap="round">
          <path d="M8 28 L 10 42 Q 10 46, 14 46 L 26 46 Q 30 46, 30 42 L 32 28 Z" fill="#FBF6E9"/>
          <path d="M32 32 q 6 0, 6 5 q 0 5, -6 5"/>
          <ellipse cx="20" cy="28" rx="12" ry="2" fill="#7C4F31" opacity=".25"/>
          <path d="M14 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s1"/>
          <path d="M20 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s2"/>
          <path d="M26 22 q -3 -4, 0 -8 q 3 -4, 0 -8" className="cur-steam s3"/>
        </svg>
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
    </div>
  );
}
