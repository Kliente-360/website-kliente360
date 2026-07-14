// Requer: npm i --no-save gifenc (dep de geração, não de build — não vai pro package.json).
//
// Gera o Mark Aperture animado pra assinatura de e-mail:
//  - GIF 200×200, fundo BRANCO sólido (#fff), 64 frames × 50ms = loop 3.2s
//  - SVG (SMIL) equivalente, fundo transparente (uso web)
//
// Animação — opacidade como função contínua (senoide):
//   op(dot, t) = 0.45 + 0.55 · (0.5 + 0.5·sin(2π·t/T − fase))
// com fases 0, ¼, ½, ¾ de ciclo na ordem ANTI-HORÁRIA
// (topo → esquerda → base → direita). A "luz" gira sem degrau.
//
// Histórico: v1 rampa linear com wrap = leu como aleatório; v2 degraus
// discretos = enroscava. A senoide contínua com fundo branco composto
// (sem transparência 1-bit) é a versão fluida.
import { Resvg } from '@resvg/resvg-js';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync } from 'node:fs';

const T = 3.2;              // ciclo (s)
const FRAMES = 64;          // 64 × 50ms = 3.2s exatos (delay GIF é múltiplo de 10ms)
const DELAY_MS = 50;

// Ordem de fase ANTI-HORÁRIA a partir do topo.
const CIRCLES = [
  { cx: 40, cy: 22, phase: 0.00 }, // topo     (12h)
  { cx: 22, cy: 40, phase: 0.25 }, // esquerda (9h)
  { cx: 40, cy: 58, phase: 0.50 }, // base     (6h)
  { cx: 58, cy: 40, phase: 0.75 }, // direita  (3h)
];

const op = (phase, t) =>
  0.45 + 0.55 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (t / T) - phase * 2 * Math.PI));

// ---------- SVG animado (SMIL) — senoide amostrada em 16 pontos ----------
const SAMPLES = 16;
const sineValues = (phase) =>
  Array.from({ length: SAMPLES + 1 }, (_, k) => op(phase, (k / SAMPLES) * T).toFixed(3)).join(';');
const keyTimes = Array.from({ length: SAMPLES + 1 }, (_, k) => (k / SAMPLES).toFixed(4)).join(';');

const svgAnim = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="200" height="200">
  <title>Kliente 360 — Mark Aperture (animado)</title>
${CIRCLES.map((c) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" opacity="${op(c.phase, 0).toFixed(3)}">
    <animate attributeName="opacity"
      values="${sineValues(c.phase)}"
      keyTimes="${keyTimes}"
      calcMode="linear"
      dur="${T}s" repeatCount="indefinite"/>
  </circle>`).join('\n')}
</svg>
`;
writeFileSync('assets/img/brand/mark-aperture-anim.svg', svgAnim);
console.log('✓ mark-aperture-anim.svg');

// ---------- GIF 200×200, fundo branco sólido ----------
const SIZE = 200;
const gif = GIFEncoder();

for (let f = 0; f < FRAMES; f++) {
  const t = (f / FRAMES) * T;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <rect width="80" height="80" fill="#ffffff"/>
${CIRCLES.map((c) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" fill-opacity="${op(c.phase, t).toFixed(4)}"/>`).join('\n')}
</svg>`;
  const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE } }).render();
  const { pixels, width, height } = rendered;
  const data = new Uint8ClampedArray(pixels); // já 100% opaco (rect branco)

  const palette = quantize(data, 256, { format: 'rgb444' });
  const index = applyPalette(data, palette, 'rgb444');
  gif.writeFrame(index, width, height, {
    palette,
    delay: DELAY_MS,
    repeat: 0,
  });
}
gif.finish();
writeFileSync('assets/img/brand/mark-aperture-anim.gif', gif.bytes());
console.log(`✓ mark-aperture-anim.gif (${FRAMES} frames × ${DELAY_MS}ms, ${SIZE}×${SIZE}, fundo branco)`);
