import React from "react";

interface Props {
  size?: number;
  className?: string;
}

export default function Steam({ size = 40, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 40 60"
      width={size}
      height={size * 1.5}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#7C4F31"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M10 50 q -4 -10, 0 -20 q 4 -10, 0 -20" className="lci-steam lci-steam-1" />
      <path d="M20 50 q -4 -10, 0 -20 q 4 -10, 0 -20" className="lci-steam lci-steam-2" />
      <path d="M30 50 q -4 -10, 0 -20 q 4 -10, 0 -20" className="lci-steam lci-steam-3" />
      <style>{`
        .lci-steam { animation: lci-steam-rise 3.2s ease-out infinite; transform-origin: center bottom; opacity: .55; }
        .lci-steam-1 { animation-delay: 0s; }
        .lci-steam-2 { animation-delay: .6s; }
        .lci-steam-3 { animation-delay: 1.2s; }
        @keyframes lci-steam-rise {
          0% { transform: translateY(0) scale(1); opacity: .6; }
          50% { opacity: .25; }
          100% { transform: translateY(-18px) scale(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lci-steam { animation: none; opacity: .5; }
        }
      `}</style>
    </svg>
  );
}
