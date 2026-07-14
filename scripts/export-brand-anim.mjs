// Requer: npm i --no-save gifenc (dep de geração, não de build — não vai pro package.json).
//
// Gera o Mark Aperture animado: SVG (SMIL) + GIF 200×200 transparente.
// Animação: rotação DISCRETA — a cada 0.8s os 4 valores canônicos de
// opacidade (0.45/0.65/0.85/1.0) trocam de círculo em sentido HORÁRIO
// (topo → direita → base → esquerda). Sem fade intermediário: em
// qualquer instante o mark é exatamente a marca canônica, girada.
// Loop de 3.2s (4 estados × 0.8s).
//
// Por que discreto: a versão anterior interpolava linearmente entre os
// keyframes e, no meio do ciclo, as opacidades convergiam pra valores
// intermediários parecidos — a rotação lia como aleatória.
import { Resvg } from '@resvg/resvg-js';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync } from 'node:fs';

const STEP = 0.8;           // segundos por estado
const STATES = 4;
const DUR = STEP * STATES;  // 3.2s

// Círculos em ordem HORÁRIA a partir do topo.
const CIRCLES = [
  { cx: 40, cy: 22 }, // topo     (12h)
  { cx: 58, cy: 40 }, // direita  (3h)
  { cx: 40, cy: 58 }, // base     (6h)
  { cx: 22, cy: 40 }, // esquerda (9h)
];

// Estado k: círculo i recebe V[(i - k) mod 4].
// k=0 é a marca canônica (topo .45 … esquerda 1.0); a cada passo os
// valores avançam uma posição em sentido horário (o 1.0 anda
// esquerda → topo → direita → base → …).
const V = [0.45, 0.65, 0.85, 1.0];
const opacityAt = (i, k) => V[(((i - k) % 4) + 4) % 4];

// ---------- SVG animado (SMIL, calcMode discrete) ----------
const seq = (i) => Array.from({ length: STATES }, (_, k) => opacityAt(i, k));
const svgAnim = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="200" height="200">
  <title>Kliente 360 — Mark Aperture (animado)</title>
${CIRCLES.map((c, i) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" opacity="${opacityAt(i, 0)}">
    <animate attributeName="opacity"
      values="${seq(i).join(';')}"
      keyTimes="0;0.25;0.5;0.75"
      calcMode="discrete"
      dur="${DUR}s" repeatCount="indefinite"/>
  </circle>`).join('\n')}
</svg>
`;
writeFileSync('assets/img/brand/mark-aperture-anim.svg', svgAnim);
console.log('✓ mark-aperture-anim.svg');

// ---------- GIF 200×200 — 4 frames, um por estado ----------
const SIZE = 200;
const gif = GIFEncoder();

for (let k = 0; k < STATES; k++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
${CIRCLES.map((c, i) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" fill-opacity="${opacityAt(i, k)}"/>`).join('\n')}
</svg>`;
  const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE } }).render();
  const { pixels, width, height } = rendered;
  const data = new Uint8ClampedArray(pixels);

  // GIF só tem transparência 1-bit: pré-compor semi-alpha sobre branco
  // (assinatura de e-mail vive em fundo claro), manter alpha 0 transparente.
  for (let p = 0; p < data.length; p += 4) {
    const a = data[p + 3] / 255;
    if (a === 0) continue;
    data[p]     = Math.round(data[p]     * a + 255 * (1 - a));
    data[p + 1] = Math.round(data[p + 1] * a + 255 * (1 - a));
    data[p + 2] = Math.round(data[p + 2] * a + 255 * (1 - a));
    data[p + 3] = 255;
  }

  const palette = quantize(data, 256, { format: 'rgba4444', oneBitAlpha: true });
  const index = applyPalette(data, palette, 'rgba4444');
  gif.writeFrame(index, width, height, {
    palette,
    transparent: true,
    delay: STEP * 1000,
    repeat: 0,
  });
}
gif.finish();
writeFileSync('assets/img/brand/mark-aperture-anim.gif', gif.bytes());
console.log(`✓ mark-aperture-anim.gif (${STATES} frames × ${STEP}s, ${SIZE}×${SIZE})`);
