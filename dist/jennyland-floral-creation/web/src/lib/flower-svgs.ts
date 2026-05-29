// SVG sprite registry for the configurateur. Each sprite is recolorable via --petal CSS variable.
export type FlowerSvgId =
  | "rose-open" | "rose-bud" | "daisy" | "calla" | "tulip" | "peony" | "anemone"
  | "wildflower" | "leaf-eucalyptus" | "leaf-fern" | "leaf-olive" | "ribbon"
  | "pearl" | "gypso" | "star" | "heart" | "tag";

export const SPRITE_VIEWBOX = "0 0 100 100";

export const FLOWER_SVGS: Record<FlowerSvgId, string> = {
  "rose-open": `<defs><radialGradient id="rg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#fff" stop-opacity="0.85"/><stop offset="100%" stop-color="var(--petal,#A03E2A)"/></radialGradient></defs><g transform="translate(50 50)"><g opacity="0.95">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-22" rx="14" ry="22" fill="url(#rg)" transform="rotate(${a})"/>`).join("")}</g><g opacity="0.75">${[36,108,180,252,324].map(a=>`<ellipse cx="0" cy="-12" rx="10" ry="14" fill="url(#rg)" transform="rotate(${a})"/>`).join("")}</g><circle r="6" fill="#191512" opacity="0.85"/></g>`,
  "rose-bud": `<g transform="translate(50 50)"><path d="M -16 -5 Q -22 -22 0 -34 Q 22 -22 16 -5 Q 14 14 0 18 Q -14 14 -16 -5 Z" fill="var(--petal,#A03E2A)"/><path d="M -2 18 Q -10 22 -16 30" stroke="#5C7048" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 2 18 Q 10 22 16 30" stroke="#5C7048" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  daisy: `<g transform="translate(50 50)">${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>`<ellipse cx="0" cy="-22" rx="6" ry="14" fill="var(--petal,#FAF7EE)" transform="rotate(${a})"/>`).join("")}<circle r="9" fill="#E8B739"/></g>`,
  calla: `<g transform="translate(50 50)"><path d="M -22 -10 Q -28 -38 0 -42 Q 28 -38 22 -10 Q 18 12 -4 16 Q -22 14 -22 -10 Z" fill="var(--petal,#F2EADA)"/><ellipse cx="-3" cy="0" rx="3" ry="14" fill="#E8B739"/><path d="M 0 12 Q -6 20 -12 32" stroke="#5C7048" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  tulip: `<g transform="translate(50 50)"><path d="M -16 -10 Q -16 -38 -6 -36 Q 0 -42 6 -36 Q 16 -38 16 -10 Q 14 8 0 12 Q -14 8 -16 -10 Z" fill="var(--petal,#A03E2A)"/><path d="M 0 12 Q 0 26 -2 36" stroke="#5C7048" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  peony: `<g transform="translate(50 50)">${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="0" cy="-20" rx="14" ry="20" fill="var(--petal,#E8B739)" transform="rotate(${a})" opacity="0.85"/>`).join("")}${[22,67,112,157,202,247,292,337].map(a=>`<ellipse cx="0" cy="-12" rx="10" ry="13" fill="var(--petal,#E8B739)" transform="rotate(${a})" opacity="0.7"/>`).join("")}<circle r="5" fill="#191512" opacity="0.6"/></g>`,
  anemone: `<g transform="translate(50 50)">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-22" rx="13" ry="18" fill="var(--petal,#F2EADA)" transform="rotate(${a})"/>`).join("")}<circle r="10" fill="#191512"/></g>`,
  wildflower: `<g transform="translate(50 50)">${[0,72,144,216,288].map(a=>`<circle cx="0" cy="-14" r="6" fill="var(--petal,#A03E2A)" transform="rotate(${a})"/>`).join("")}<circle r="4" fill="#E8B739"/></g>`,
  "leaf-eucalyptus": `<g transform="translate(50 50)"><path d="M 0 30 Q 0 0 0 -32" stroke="#5C7048" stroke-width="2" fill="none"/>${[-22,-12,-2,8,18].map((y,i)=>{const s=i%2===0?-1:1;return `<ellipse cx="${s*8}" cy="${y}" rx="8" ry="5" fill="var(--petal,#5C7048)" transform="rotate(${s*25} ${s*8} ${y})"/>`;}).join("")}</g>`,
  "leaf-fern": `<g transform="translate(50 50)"><path d="M 0 32 Q 0 0 0 -34" stroke="#3D5030" stroke-width="1.6" fill="none"/>${Array.from({length:9}).map((_,i)=>{const y=-28+i*7;const w=18-Math.abs(i-4)*1.5;return `<path d="M 0 ${y} Q ${-w/2} ${y-4} ${-w} ${y-2}" stroke="#3D5030" stroke-width="1.6" fill="none"/><path d="M 0 ${y} Q ${w/2} ${y-4} ${w} ${y-2}" stroke="#3D5030" stroke-width="1.6" fill="none"/>`;}).join("")}</g>`,
  "leaf-olive": `<g transform="translate(50 50)"><path d="M -24 24 Q 0 0 24 -24" stroke="#5C7048" stroke-width="1.6" fill="none"/>${[-20,-10,0,10,20].map((t,i)=>{const x=-t;const y=t;const s=i%2===0?-1:1;return `<ellipse cx="${x+s*6}" cy="${y-s*6}" rx="6" ry="3" fill="var(--petal,#5C7048)" transform="rotate(-45 ${x+s*6} ${y-s*6})"/>`;}).join("")}</g>`,
  ribbon: `<g transform="translate(50 50)"><path d="M -28 -2 Q -10 -28 0 -2 Q 10 -28 28 -2 Q 24 8 12 6 Q 2 4 0 -2 Q -2 4 -12 6 Q -24 8 -28 -2 Z" fill="var(--petal,#A03E2A)"/><circle r="4" fill="#7A2D1F"/></g>`,
  pearl: `<g transform="translate(50 50)"><circle r="14" fill="var(--petal,#FAF7EE)"/><circle cx="-4" cy="-4" r="3" fill="#fff" opacity="0.7"/></g>`,
  gypso: `<g transform="translate(50 50)">${[[-20,-18],[-12,-22],[-4,-14],[4,-22],[12,-16],[20,-22],[-18,-8],[-8,-2],[0,-10],[10,-2],[18,-10]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="var(--petal,#FAF7EE)" stroke="#A03E2A" stroke-width="0.4"/>`).join("")}</g>`,
  star: `<g transform="translate(50 50)"><path d="M 0 -30 L 8 -8 L 30 -6 L 12 8 L 18 30 L 0 18 L -18 30 L -12 8 L -30 -6 L -8 -8 Z" fill="var(--petal,#E8B739)" stroke="#B8870C" stroke-width="0.5"/></g>`,
  heart: `<g transform="translate(50 50)"><path d="M 0 24 C -32 6 -32 -22 -16 -22 C -8 -22 -2 -16 0 -10 C 2 -16 8 -22 16 -22 C 32 -22 32 6 0 24 Z" fill="var(--petal,#A03E2A)"/></g>`,
  tag: `<g transform="translate(50 50)"><circle r="28" fill="#FAF7EE" stroke="var(--petal,#A03E2A)" stroke-width="1.2"/><text x="0" y="-6" text-anchor="middle" font-family="'Pinyon Script',cursive" font-size="14" fill="#191512">Jenny</text><text x="0" y="9" text-anchor="middle" font-family="Inter,sans-serif" font-size="3.5" letter-spacing="0.5" fill="#6A5F54">FLORAL CRÉATION</text></g>`,
};

export function flowerSvg(id: FlowerSvgId): string {
  return FLOWER_SVGS[id] ?? FLOWER_SVGS["rose-open"];
}
