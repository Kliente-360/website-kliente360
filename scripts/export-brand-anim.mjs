// Requer: npm i --no-save gifenc (dep de geração, não de build — não vai pro package.json).
// Gera o Mark Aperture animado: SVG (SMIL) + GIF 200×200 transparente.
// Animação: opacidades 0.45/0.65/0.85/1.0 circulam anti-horário
// (topo → esquerda → base → direita), loop linear de 3.2s.
import { Resvg } from '@resvg/resvg-js';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync } from 'node:fs';

const DUR = 3.2;
const CIRCLES = [
  { cx: 40, cy: 22, phase: 0.0 },  // topo     — .45 em t0
  { cx: 58, cy: 40, phase: 0.8 },  // direita  — .65 em t0
  { cx: 40, cy: 58, phase: 1.6 },  // base     — .85 em t0
  { cx: 22, cy: 40, phase: 2.4 },  // esquerda — 1.0 em t0
];

// Ciclo de opacidade de um círculo: keyframes lineares a cada 0.8s.
const KEYS = [0.45, 0.65, 0.85, 1.0];
const cycleOpacity = (t) => {
  const tm = ((t % DUR) + DUR) % DUR;
  const seg = Math.floor(tm / 0.8);
  const frac = (tm - seg * 0.8) / 0.8;
  const a = KEYS[seg % 4];
  const b = KEYS[(seg + 1) % 4];
  return a + (b - a) * frac;
};

// ---------- SVG animado (SMIL) ----------
const svgAnim = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="200" height="200">
  <title>Kliente 360 — Mark Aperture (animado)</title>
${CIRCLES.map((c) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" opacity="${cycleOpacity(c.phase).toFixed(2)}">
    <animate attributeName="opacity"
      values="0.45;0.65;0.85;1;0.45"
      keyTimes="0;0.25;0.5;0.75;1"
      dur="${DUR}s" begin="${-c.phase}s"
      calcMode="linear" repeatCount="indefinite"/>
  </circle>`).join('\n')}
</svg>
`;
writeFileSync('assets/img/brand/mark-aperture-anim.svg', svgAnim);
console.log('✓ mark-aperture-anim.svg');

// ---------- GIF 200×200 ----------
const SIZE = 200;
const FPS = 10;                       // 32 frames × 100ms = 3.2s exatos
const FRAMES = Math.round(DUR * FPS);
const gif = GIFEncoder();

for (let f = 0; f < FRAMES; f++) {
  const t = f / FPS;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
${CIRCLES.map((c) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" fill-opacity="${cycleOpacity(t + c.phase).toFixed(4)}"/>`).join('\n')}
</svg>`;
  const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE } }).render();
  const { pixels, width, height } = rendered;
  const data = new Uint8ClampedArray(pixels);

  // GIF só tem transparência 1-bit: pré-compor semi-alpha sobre branco
  // (assinatura de e-mail vive em fundo claro), manter alpha 0 transparente.
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3] / 255;
    if (a === 0) continue;
    data[i]     = Math.round(data[i]     * a + 255 * (1 - a));
    data[i + 1] = Math.round(data[i + 1] * a + 255 * (1 - a));
    data[i + 2] = Math.round(data[i + 2] * a + 255 * (1 - a));
    data[i + 3] = 255;
  }

  const palette = quantize(data, 256, { format: 'rgba4444', oneBitAlpha: true });
  const index = applyPalette(data, palette, 'rgba4444');
  gif.writeFrame(index, width, height, {
    palette,
    transparent: true,
    delay: Math.round(1000 / FPS),
    repeat: 0,
  });
}
gif.finish();
writeFileSync('assets/img/brand/mark-aperture-anim.gif', gif.bytes());
console.log(`✓ mark-aperture-anim.gif (${FRAMES} frames, ${SIZE}×${SIZE})`);
