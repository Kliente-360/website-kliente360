// Requer: npm i --no-save gifenc (dep de geração, não de build — não vai pro package.json).
//
// Gera o Mark Aperture animado pra assinatura de e-mail:
//  - GIF 200×200, fundo BRANCO sólido (#fff), 64 frames × 50ms = loop 3.2s
//  - SVG (SMIL) equivalente, fundo transparente (uso web)
//
// Animação v6 — forma de onda MEDIDA da referência CSS aprovada
// (frame a frame, vídeo de 2026-07-14): cada círculo SOBE DEVAGAR
// (72% do ciclo, smoothstep) de 0.45 até 1.0 e DESCE RÁPIDO (28%).
// Fases ¼ de ciclo em ordem HORÁRIA (picos: topo → direita → base →
// esquerda). A subida lenta é o que elimina o pisca: nenhuma bolinha
// "acende" — ela amanhece.
//
// Histórico: v1 rampa+wrap = aleatório · v2 degraus = enrosco ·
// v3 senoide = gangorra anti-fase · v4 attack rápido = flash ·
// v5 rotação física = rejeitada (logo não gira).
import { Resvg } from '@resvg/resvg-js';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { writeFileSync } from 'node:fs';

const T = 3.2;              // ciclo (s)
const FRAMES = 64;          // 64 × 50ms = 3.2s exatos
const DELAY_MS = 50;
const FALL = 0.28;          // fração do ciclo descendo (rápido)
const LO = 0.45, HI = 1.0;

// Fase = instante do PICO (fração do ciclo), ordem HORÁRIA.
const CIRCLES = [
  { cx: 40, cy: 22, phase: 0.00 }, // topo     (12h)
  { cx: 58, cy: 40, phase: 0.25 }, // direita  (3h)
  { cx: 40, cy: 58, phase: 0.50 }, // base     (6h)
  { cx: 22, cy: 40, phase: 0.75 }, // esquerda (9h)
];

const smooth = (x) => x * x * (3 - 2 * x); // smoothstep
// u = distância (em fração de ciclo) desde o pico deste círculo.
const op = (phase, t) => {
  const u = (((t / T - phase) % 1) + 1) % 1;
  if (u < FALL) return HI - (HI - LO) * smooth(u / FALL);        // desce rápido
  return LO + (HI - LO) * smooth((u - FALL) / (1 - FALL));       // sobe devagar
};

// ---------- SVG animado (SMIL) — forma amostrada em 32 pontos ----------
const SAMPLES = 32;
const waveValues = (phase) =>
  Array.from({ length: SAMPLES + 1 }, (_, k) => op(phase, (k / SAMPLES) * T).toFixed(3)).join(';');
const keyTimes = Array.from({ length: SAMPLES + 1 }, (_, k) => (k / SAMPLES).toFixed(4)).join(';');

const svgAnim = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="200" height="200">
  <title>Kliente 360 — Mark Aperture (animado)</title>
${CIRCLES.map((c) => `  <circle cx="${c.cx}" cy="${c.cy}" r="11" fill="#009900" opacity="${op(c.phase, 0).toFixed(3)}">
    <animate attributeName="opacity"
      values="${waveValues(c.phase)}"
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
  const data = new Uint8ClampedArray(pixels);

  const palette = quantize(data, 256, { format: 'rgb444' });
  const index = applyPalette(data, palette, 'rgb444');
  gif.writeFrame(index, width, height, { palette, delay: DELAY_MS, repeat: 0 });
}
gif.finish();
writeFileSync('assets/img/brand/mark-aperture-anim.gif', gif.bytes());
console.log(`✓ mark-aperture-anim.gif (${FRAMES} frames × ${DELAY_MS}ms — onda medida da referência CSS)`);
