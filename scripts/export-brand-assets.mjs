// Export brand assets — gera PNGs em múltiplos tamanhos a partir dos SVGs
// canônicos em assets/img/brand/. Usa @resvg/resvg-js (mesma lib do build de OG).
//
// Saída em assets/img/brand/:
//   mark-aperture/<size>.png            (verde sagrado, fundo transparente)
//   mark-aperture-white/<size>.png      (versão branca, fundo transparente)
//   mark-aperture-black/<size>.png      (versão preta, fundo transparente)
//   lockup-horizontal/<size>.png        (mark + wordmark, texto preto)
//   lockup-horizontal-light/<size>.png  (mark + wordmark, texto branco)
//
// Tamanhos:
//   mark:    16, 32, 48, 64, 128, 256, 512, 1024
//   lockup:  256, 512, 1024, 2048  (proporção 4:1 aprox.)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BRAND_DIR = join(ROOT, 'assets', 'img', 'brand');
const FONT_FILE = join(ROOT, 'assets', 'fonts', 'inter-latin.woff2');

const MARK_SIZES = [16, 32, 48, 64, 128, 256, 512, 1024];
const LOCKUP_SIZES = [256, 512, 1024, 2048];

const mkdir = (p) => { if (!existsSync(p)) mkdirSync(p, { recursive: true }); };

// Renderiza um SVG num PNG de tamanho fixo, transparente, com Inter disponível.
const renderPng = (svg, width) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: 'rgba(0,0,0,0)',
    font: {
      // resvg não suporta woff2 — usa system fonts (Inter / Helvetica / SF Pro
      // dependendo do OS) pra renderizar o wordmark do lockup.
      loadSystemFonts: true,
      defaultFontFamily: 'Inter',
    },
  });
  return resvg.render().asPng();
};

// SVG do mark — replica do mark-aperture.svg canônico, parametrizado por cor.
const markSvg = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="22" r="11" fill="${color}" opacity="0.45"/>
  <circle cx="58" cy="40" r="11" fill="${color}" opacity="0.65"/>
  <circle cx="40" cy="58" r="11" fill="${color}" opacity="0.85"/>
  <circle cx="22" cy="40" r="11" fill="${color}"/>
</svg>`;

// SVG do lockup horizontal — mark à esquerda, "kliente 360" à direita.
// viewBox 320×80: mark ocupa 80×80, gap 24, texto ~216×80 (Inter Bold,
// font-size 56, letter-spacing -0.035em). Texto pintado no fill final.
const lockupSvg = (markColor, textColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80">
  <g>
    <circle cx="40" cy="22" r="11" fill="${markColor}" opacity="0.45"/>
    <circle cx="58" cy="40" r="11" fill="${markColor}" opacity="0.65"/>
    <circle cx="40" cy="58" r="11" fill="${markColor}" opacity="0.85"/>
    <circle cx="22" cy="40" r="11" fill="${markColor}"/>
  </g>
  <text x="104" y="56" fill="${textColor}" font-family="Inter, system-ui, sans-serif" font-size="56" font-weight="700" letter-spacing="-0.035em">kliente 360</text>
</svg>`;

const exportSet = (label, svgFn, sizes, args) => {
  const dir = join(BRAND_DIR, label);
  mkdir(dir);
  for (const size of sizes) {
    const svg = svgFn(...args);
    const png = renderPng(svg, size);
    writeFileSync(join(dir, `${size}.png`), png);
    console.log(`  ${label}/${size}.png  (${png.length.toLocaleString()} bytes)`);
  }
};

console.log('Exporting brand assets...\n');

console.log('Mark Aperture (verde sagrado):');
exportSet('mark-aperture', markSvg, MARK_SIZES, ['#009900']);
console.log('\nMark Aperture (white, p/ fundo escuro):');
exportSet('mark-aperture-white', markSvg, MARK_SIZES, ['#ffffff']);
console.log('\nMark Aperture (black, monocromático):');
exportSet('mark-aperture-black', markSvg, MARK_SIZES, ['#0a0a0a']);

console.log('\nLockup horizontal (texto preto, fundo claro):');
exportSet('lockup-horizontal', lockupSvg, LOCKUP_SIZES, ['#009900', '#0a0a0a']);
console.log('\nLockup horizontal (texto branco, fundo escuro):');
exportSet('lockup-horizontal-light', lockupSvg, LOCKUP_SIZES, ['#009900', '#ffffff']);

// Lockup SVGs portáveis (texto como <text> Inter — requer fonte instalada
// ou pode ser convertido a paths num passo futuro)
mkdir(BRAND_DIR);
writeFileSync(join(BRAND_DIR, 'lockup-horizontal.svg'), lockupSvg('#009900', '#0a0a0a'));
writeFileSync(join(BRAND_DIR, 'lockup-horizontal-light.svg'), lockupSvg('#009900', '#ffffff'));
console.log('\nLockup SVGs gravados em assets/img/brand/.');

console.log('\n✓ Brand assets exportados.');
