#!/usr/bin/env node
/**
 * Kliente 360 — build do blog MD → HTML, multilíngue.
 *
 * Convenção de arquivos em blog/posts/:
 *   <slug>.md        → variante PT (padrão)
 *   <slug>.en.md     → variante EN (opcional)
 *   <slug>.es.md     → variante ES (opcional)
 *
 * Saída:
 *   /blog/<slug>.html        (PT — padrão)
 *   /blog/en/<slug>.html     (EN — se houver tradução)
 *   /blog/es/<slug>.html     (ES — se houver tradução)
 *   /blog/index.html         (PT)
 *   /blog/en/index.html      (EN, posts com tradução EN)
 *   /blog/es/index.html      (ES, posts com tradução ES)
 *   /sitemap.xml             (inclui todas as variantes)
 *   /og-image.png            (renderiza SVG → PNG)
 *
 * Arquivos ignorados: _*.md, README.md.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = join(__dirname, '..');
const POSTS_DIR  = join(ROOT, 'blog', 'posts');
const BLOG_DIR   = join(ROOT, 'blog');

// Hash do conteúdo dos assets CSS/JS — muda só quando o arquivo muda,
// preservando o cache do browser entre rebuilds sem mudança real.
const hashAssets = () => {
  const files = [
    'assets/css/tokens.css',
    'assets/css/reset.css',
    'assets/css/main.css',
    'assets/js/i18n.js',
    'assets/js/main.js',
  ];
  const h = createHash('sha256');
  for (const f of files) {
    const p = join(ROOT, f);
    if (existsSync(p)) h.update(readFileSync(p));
  }
  return h.digest('hex').slice(0, 10);
};
const ASSET_VERSION = hashAssets();

const LANGS = ['pt', 'en', 'es'];
const HTML_LANG = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
const SITE_LANG = { pt: 'pt', en: 'en', es: 'es' };

// Labels de UI por idioma — usados na geração estática (chrome do post).
const STRINGS = {
  pt: {
    pillars: { sf: 'Pilar 01 · Salesforce', data: 'Pilar 02 · Data', ai: 'Pilar 03 · IA' },
    sections: { sf: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada' },
    blogBack: 'Blog',
    by: 'Por Kliente 360',
    readMin: 'min de leitura',
    tldr: 'TL;DR',
    endLabel: 'Continuar a conversa',
    endTitle: 'Quer discutir esse tema com um sócio?',
    endText: 'Diagnóstico inicial sem compromisso. Levamos uma primeira leitura do seu cenário em uma semana e devolvemos um relatório.',
    endLink: 'Conversar com um sócio',
    exploreLabel: 'Continue explorando',
    explorePillar: (name) => `Pilar · ${name}`,
    explorePillarDesc: (name) => `Como entregamos ${name} na prática — escopo, riscos típicos, sinais de saúde.`,
    exploreGlossary: 'Glossário',
    exploreGlossaryDesc: 'Vocabulário de CRM com Salesforce, dados e IA. Direto ao ponto, com link pro post canônico.',
    exploreHow: 'Como trabalhamos',
    exploreHowDesc: 'Trilha 360 — os cinco verbos da nossa prática: mapear, prototipar, validar, implantar, sustentar.',
    relatedTitle: 'Próximas leituras',
    listingTitle: 'Análise, prática, opinião.',
    listingLead: 'Textos curtos sobre o que estamos vendo na prática em projetos de Salesforce, dados e IA.',
    listingMeta: 'Blog Kliente 360 — análise, prática e opinião em Salesforce, dados e IA. Textos curtos sobre o que estamos vendo na prática.',
    filterAll: 'Todos',
    filterDataShort: 'Dados',
    filterAiShort: 'IA',
    readLink: 'Ler →',
    searchPlaceholder: 'Buscar no conteúdo',
    searchEmpty: 'Nenhum post corresponde à busca.',
    searchLoading: 'Buscando…',
    loadMore: 'Carregar mais',
    loadMoreOf: 'de',
  },
  en: {
    pillars: { sf: 'Practice 01 · Salesforce', data: 'Practice 02 · Data', ai: 'Practice 03 · AI' },
    sections: { sf: 'Salesforce', data: 'Data & Analytics', ai: 'Applied AI' },
    blogBack: 'Blog',
    by: 'By Kliente 360',
    readMin: 'min read',
    tldr: 'TL;DR',
    endLabel: 'Keep the conversation going',
    endTitle: 'Want to discuss this topic with a partner?',
    endText: 'Initial diagnostic with no commitment. We assess your scenario in a week and send back a report.',
    endLink: 'Talk to a partner',
    exploreLabel: 'Keep exploring',
    explorePillar: (name) => `Practice · ${name}`,
    explorePillarDesc: (name) => `How we deliver ${name} in practice — scope, common pitfalls, health signals.`,
    exploreGlossary: 'Glossary',
    exploreGlossaryDesc: 'Vocabulary for CRM with Salesforce, data and AI. No buzzwords, with links to the canonical post.',
    exploreHow: 'How we work',
    exploreHowDesc: 'Trilha 360 — the five verbs of our practice: map, prototype, validate, deploy, sustain.',
    relatedTitle: 'Further reading',
    listingTitle: 'Analysis, practice, opinion.',
    listingLead: 'Short pieces on what we are seeing in real Salesforce, data and AI projects.',
    listingMeta: 'Kliente 360 Blog — analysis, practice and opinion on Salesforce, data and AI. Short pieces from real projects.',
    filterAll: 'All',
    filterDataShort: 'Data',
    filterAiShort: 'AI',
    readLink: 'Read →',
    searchPlaceholder: 'Search content',
    searchEmpty: 'No post matches the search.',
    searchLoading: 'Searching…',
    loadMore: 'Load more',
    loadMoreOf: 'of',
  },
  es: {
    pillars: { sf: 'Pilar 01 · Salesforce', data: 'Pilar 02 · Data', ai: 'Pilar 03 · IA' },
    sections: { sf: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada' },
    blogBack: 'Blog',
    by: 'Por Kliente 360',
    readMin: 'min de lectura',
    tldr: 'TL;DR',
    endLabel: 'Continuar la conversación',
    endTitle: '¿Quieres discutir este tema con un socio?',
    endText: 'Diagnóstico inicial sin compromiso. Hacemos una primera lectura de tu escenario en una semana y devolvemos un informe.',
    endLink: 'Hablar con un socio',
    exploreLabel: 'Sigue explorando',
    explorePillar: (name) => `Pilar · ${name}`,
    explorePillarDesc: (name) => `Cómo entregamos ${name} en la práctica — alcance, riesgos típicos, señales de salud.`,
    exploreGlossary: 'Glosario',
    exploreGlossaryDesc: 'Vocabulario de CRM con Salesforce, datos e IA. Directo al grano, con enlace al post canónico.',
    exploreHow: 'Cómo trabajamos',
    exploreHowDesc: 'Trilha 360 — los cinco verbos de nuestra práctica: mapear, prototipar, validar, implantar, sostener.',
    relatedTitle: 'Próximas lecturas',
    listingTitle: 'Análisis, práctica, opinión.',
    listingLead: 'Textos cortos sobre lo que estamos viendo en proyectos reales de Salesforce, datos e IA.',
    listingMeta: 'Blog Kliente 360 — análisis, práctica y opinión en Salesforce, datos e IA. Textos cortos desde proyectos reales.',
    filterAll: 'Todos',
    filterDataShort: 'Datos',
    filterAiShort: 'IA',
    readLink: 'Leer →',
    searchPlaceholder: 'Buscar contenido',
    searchEmpty: 'Ningún post coincide con la búsqueda.',
    searchLoading: 'Buscando…',
    loadMore: 'Cargar más',
    loadMoreOf: 'de',
  },
};

const PILLARS_DATA = { sf: {}, data: {}, ai: {} };

// Cor secundária por pilar (usada no card de OG image e no breadcrumb).
const PILLAR_COLOR = { sf: '#0B5394', data: '#8a6f15', ai: '#6D28D9' };
const PILLAR_NAME_PT = { sf: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada' };
const PILLAR_NAME_EN = { sf: 'Salesforce', data: 'Data & Analytics', ai: 'Applied AI' };
const PILLAR_NAME_ES = { sf: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada' };
const PILLAR_URL_PT = { sf: '/pilares/salesforce/', data: '/pilares/data/', ai: '/pilares/ia/' };
const PILLAR_URL_EN = { sf: '/en/pilares/salesforce/', data: '/en/pilares/data/', ai: '/en/pilares/ia/' };
const PILLAR_URL_ES = { sf: '/es/pilares/salesforce/', data: '/es/pilares/data/', ai: '/es/pilares/ia/' };
const PILLAR_NAME = { pt: PILLAR_NAME_PT, en: PILLAR_NAME_EN, es: PILLAR_NAME_ES };
const PILLAR_URL  = { pt: PILLAR_URL_PT,  en: PILLAR_URL_EN,  es: PILLAR_URL_ES };
const BLOG_LABEL = { pt: 'Blog', en: 'Blog', es: 'Blog' };

// Páginas estratégicas por idioma — usadas no bloco "Continue explorando".
const GLOSSARY_URL = { pt: '/glossario/', en: '/en/glossario/', es: '/es/glossario/' };
const HOWWE_URL    = { pt: '/como-trabalhamos/', en: '/en/como-trabalhamos/', es: '/es/como-trabalhamos/' };

// ---------- helpers ----------
const formatDate = (iso, lang = 'pt') => {
  const d = new Date(iso + 'T00:00:00');
  const months = {
    pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  };
  return `${d.getDate()} ${months[lang][d.getMonth()]} ${d.getFullYear()}`;
};

const escapeHtml = (s) => String(s)
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  .replaceAll('"','&quot;').replaceAll("'", '&#39;');

const renderMarkdown = (md) => {
  const html = marked.parse(md, { breaks: false, gfm: true });
  return html.replace('<p>', '<p class="post-intro">');
};

// Domínio canônico de produção — usado em canonical, hreflang, og:url, sitemap.
const SITE_URL = 'https://kliente360.com';
const abs = (path) => path.startsWith('http') ? path : `${SITE_URL}${path}`;
const postPath = (slug, lang) => lang === 'pt' ? `/blog/${slug}.html` : `/blog/${lang}/${slug}.html`;
const listingPath = (lang) => lang === 'pt' ? '/blog/' : `/blog/${lang}/`;
const postUrl = (slug, lang) => abs(postPath(slug, lang));
const listingUrl = (lang) => abs(listingPath(lang));

// ---------- shared chunks ----------
const navHtml = (currentPath = '', lang = 'pt') => {
  const cmPath = lang === 'pt' ? '/como-trabalhamos/' : `/${lang}/como-trabalhamos/`;
  return `
  <header class="nav" role="banner">
    <div class="container nav-inner">
      <a class="nav-brand" href="/" aria-label="Kliente 360 — início">
        <svg class="mark-aperture" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="22" r="11"/>
          <circle cx="58" cy="40" r="11"/>
          <circle cx="40" cy="58" r="11"/>
          <circle cx="22" cy="40" r="11"/>
        </svg>
        <span>kliente 360</span>
      </a>

      <nav class="nav-links" aria-label="Principal">
        <a href="/#pilares" data-i18n="nav.pillars">Pilares</a>
        <a href="${cmPath}" data-i18n="nav.howWeWork">Como trabalhamos</a>
        <a href="/blog/" data-i18n="nav.blog"${currentPath.startsWith('/blog') ? ' aria-current="page"' : ''}>Blog</a>
        <a href="/#contato" data-i18n="nav.contact">Contato</a>
      </nav>

      <div class="nav-right">
        <div class="lang-switch" role="group" aria-label="Idioma">
          <button type="button" data-lang="pt" aria-current="true">PT</button>
          <button type="button" data-lang="en">EN</button>
          <button type="button" data-lang="es">ES</button>
        </div>
        <button class="nav-toggle" type="button" aria-controls="nav-menu" aria-expanded="false" data-nav-toggle data-i18n-attr="aria-label:nav.menu" aria-label="Abrir menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>

    <div class="nav-menu" id="nav-menu" data-open="false">
      <div class="group">
        <div class="group-label" data-i18n="nav.mobile.pillars">Pilares</div>
        <a href="/pilares/salesforce/" data-i18n="nav.mobile.salesforce">Salesforce</a>
        <a href="/pilares/data/" data-i18n="nav.mobile.data">Data &amp; Analytics</a>
        <a href="/pilares/ia/" data-i18n="nav.mobile.ai">IA Aplicada</a>
      </div>
      <div class="group">
        <div class="group-label" data-i18n="nav.mobile.empresa">Empresa</div>
        <a href="/#trilha" data-i18n="nav.mobile.trilha">Trilha 360</a>
        <a href="/blog/" data-i18n="nav.mobile.blog">Blog</a>
        <a href="/como-trabalhamos/">Como trabalhamos</a>
        <a href="/glossario/">Glossário</a>
        <a href="/#contato" data-i18n="nav.contact">Contato</a>
      </div>
      <div class="nav-cta">
        <a class="btn btn-primary" href="/#contato" data-i18n="nav.cta">Falar com um sócio</a>
      </div>
    </div>
  </header>`;
};

const footerHtml = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-top">
        <div>
          <a class="footer-brand" href="/" aria-label="Kliente 360">
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="22" r="11" opacity="0.45"/>
              <circle cx="58" cy="40" r="11" opacity="0.65"/>
              <circle cx="40" cy="58" r="11" opacity="0.85"/>
              <circle cx="22" cy="40" r="11"/>
            </svg>
            <span>kliente 360</span>
          </a>
          <p data-i18n="footer.tagline">Consultoria especializada em CRM com Salesforce, dados e IA. Conhecimento aplicado, como serviço.</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.pillarsTitle">Pilares</h4>
          <ul>
            <li><a href="/pilares/salesforce/" data-i18n="nav.mobile.salesforce">Salesforce</a></li>
            <li><a href="/pilares/data/" data-i18n="nav.mobile.data">Data &amp; Analytics</a></li>
            <li><a href="/pilares/ia/" data-i18n="nav.mobile.ai">IA Aplicada</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.empresaTitle">Empresa</h4>
          <ul>
            <li><a href="/#trilha" data-i18n="nav.trilha">Trilha 360</a></li>
            <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>
            <li><a href="/como-trabalhamos/">Como trabalhamos</a></li>
            <li><a href="/glossario/">Glossário</a></li>
            <li><a href="/#contato" data-i18n="nav.contact">Contato</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.contactTitle">Contato</h4>
          <ul>
            <li><a href="mailto:contato@kliente360.com">contato@kliente360.com</a></li>
            <li><a href="https://www.linkedin.com/company/kliente360/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="http://wa.me/5511961875594" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div data-i18n="footer.rights">© 2026 Kliente 360. Todos os direitos reservados.</div>
      </div>
    </div>
  </footer>`;

const hreflangCode = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', 'x-default': 'x-default' };
const renderAlternates = (alternates = []) => alternates
  .map(({ lang, href }) => `  <link rel="alternate" hreflang="${hreflangCode[lang]}" href="${href}" />`)
  .join('\n');

const headCommon = ({ title, description, canonical, ogType = 'article', pubDate, section, htmlLang = 'pt-BR', alternates = [], ogImage = '/og-image.png' }) => `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0a0a0a" />

  <link rel="canonical" href="${canonical}" />
${renderAlternates(alternates)}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Kliente 360" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${abs(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  ${pubDate ? `<meta property="article:published_time" content="${pubDate}" />` : ''}
  ${section ? `<meta property="article:section" content="${escapeHtml(section)}" />` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />

  <link rel="stylesheet" href="/assets/css/tokens.css?v=${ASSET_VERSION}" />
  <link rel="stylesheet" href="/assets/css/reset.css?v=${ASSET_VERSION}" />
  <link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_VERSION}" />`;

// ---------- structured data helpers ----------

// Extrai pares pergunta/resposta de H2 terminados em "?" no markdown.
// A resposta é tudo do H2 até o próximo H2 (ou EOF), convertido pra texto puro.
const extractFaqs = (md) => {
  const lines = md.split('\n');
  const faqs = [];
  let current = null;

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      if (current) faqs.push(current);
      const q = h2[1].trim();
      current = q.endsWith('?') ? { q, body: [] } : null;
      continue;
    }
    if (current) current.body.push(line);
  }
  if (current) faqs.push(current);

  // Converte body MD em HTML mínimo (parágrafos + ênfase + links — sem código/listas/imagens).
  return faqs.map(f => {
    const html = marked.parseInline(f.body.join('\n').trim()).trim()
      || marked.parse(f.body.join('\n').trim()).trim();
    return { q: f.q, a: html };
  });
};

const faqPageSchema = (faqs, lang) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: HTML_LANG[lang],
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const breadcrumbSchema = (post, lang) => {
  const blogHref = listingUrl(lang);
  const pillarHref = abs(PILLAR_URL[lang][post.pillar]);
  const postHref = postUrl(post.slug, lang);
  const title = post.translations[lang].title;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BLOG_LABEL[lang], item: blogHref },
      { '@type': 'ListItem', position: 2, name: PILLAR_NAME[lang][post.pillar], item: pillarHref },
      { '@type': 'ListItem', position: 3, name: title, item: postHref },
    ],
  };
};

// ---------- OG image dinâmica por post ----------
// Template variante A: título à esquerda (Inter 56–64, peso 700), mark Aperture
// grande à direita pintada na cor do pilar. Fundo branco. Pílula de pilar acima
// do título. Wordmark no rodapé.
//
// Word-wrap simples: divide o título em palavras e quebra por largura
// aproximada de caracteres (acomodando peso 700 + Inter @ ~58px).
const wrapTitle = (title, maxCharsPerLine = 22) => {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length <= maxCharsPerLine) {
      line = (line ? line + ' ' : '') + w;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  // Cap em 4 linhas — se passar, condensa as duas últimas com ellipsis.
  if (lines.length > 4) {
    const head = lines.slice(0, 3);
    const tail = lines.slice(3).join(' ');
    head.push(tail.slice(0, maxCharsPerLine - 1).trim() + '…');
    return head;
  }
  return lines;
};

const escapeSvg = (s) => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&apos;');

const renderOgSvg = ({ title, pillarLabel, pillarColor }) => {
  const lines = wrapTitle(title, 22);
  const fontSize = lines.length <= 2 ? 76 : lines.length === 3 ? 64 : 56;
  const lineHeight = Math.round(fontSize * 1.08);
  const blockHeight = lines.length * lineHeight;
  // Posição vertical: bloco centralizado verticalmente na faixa 200..510 (ish)
  const startY = 250 + (lines.length === 1 ? 30 : 0);

  const titleTspans = lines.map((ln, i) =>
    `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${escapeSvg(ln)}</tspan>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Mark Aperture à direita, na cor do pilar -->
  <g transform="translate(840, 175)">
    <circle cx="140" cy="77" r="38" fill="${pillarColor}" opacity="0.45"/>
    <circle cx="203" cy="140" r="38" fill="${pillarColor}" opacity="0.65"/>
    <circle cx="140" cy="203" r="38" fill="${pillarColor}" opacity="0.85"/>
    <circle cx="77" cy="140" r="38" fill="${pillarColor}"/>
  </g>

  <!-- Pílula do pilar -->
  <g transform="translate(80, 120)">
    <rect x="0" y="0" rx="6" ry="6" width="${pillarLabel.length * 11 + 32}" height="36" fill="${pillarColor}"/>
    <text x="16" y="24" font-family="Inter, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#ffffff" letter-spacing="0.04em">${escapeSvg(pillarLabel.toUpperCase())}</text>
  </g>

  <!-- Título -->
  <text x="80" y="${startY}" font-family="Inter, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="#0a0a0a" letter-spacing="-0.025em">${titleTspans}</text>

  <!-- Wordmark no rodapé -->
  <g transform="translate(80, 540)">
    <g transform="scale(0.45)">
      <circle cx="40" cy="22" r="11" fill="#009900" opacity="0.5"/>
      <circle cx="58" cy="40" r="11" fill="#009900" opacity="0.7"/>
      <circle cx="40" cy="58" r="11" fill="#009900" opacity="0.85"/>
      <circle cx="22" cy="40" r="11" fill="#009900"/>
    </g>
    <text x="48" y="32" font-family="Inter, -apple-system, sans-serif" font-size="26" font-weight="700" fill="#0a0a0a" letter-spacing="-0.02em">kliente 360</text>
  </g>
</svg>`;
};

const ogImageRelPath = (slug, lang) => `assets/img/og/${slug}-${lang}.png`;

const generateOgImage = (post, lang) => {
  const t = post.translations[lang];
  if (!t) return null;
  const S = STRINGS[lang];
  const svg = renderOgSvg({
    title: t.title,
    pillarLabel: S.pillars[post.pillar],
    pillarColor: PILLAR_COLOR[post.pillar],
  });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true } });
  const pngData = resvg.render().asPng();
  const rel = ogImageRelPath(post.slug, lang);
  const target = join(ROOT, rel);
  const dir = dirname(target);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(target, pngData);
  return '/' + rel;
};

// ---------- post template ----------
const renderPost = (post, lang, allPosts) => {
  const t = post.translations[lang];
  if (!t) return null;
  const S = STRINGS[lang];
  const pillarLabel = S.pillars[post.pillar];
  const sectionLabel = S.sections[post.pillar];

  const related = [
    ...allPosts.filter(p => p.slug !== post.slug && p.pillar === post.pillar && p.translations[lang]),
    ...allPosts.filter(p => p.slug !== post.slug && p.pillar !== post.pillar && p.translations[lang]),
  ].slice(0, 3);

  const canonical = postUrl(post.slug, lang);
  const blogHref = listingUrl(lang);

  // hreflang alternates: uma entrada por idioma disponível + x-default (PT, fallback ordem LANGS)
  const defaultLang = LANGS.find(l => post.translations[l]);
  const alternates = [
    ...LANGS.filter(l => post.translations[l]).map(l => ({ lang: l, href: postUrl(post.slug, l) })),
    { lang: 'x-default', href: postUrl(post.slug, defaultLang) },
  ];

  const ogImage = '/' + ogImageRelPath(post.slug, lang);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.excerpt,
    datePublished: post.date,
    inLanguage: HTML_LANG[lang],
    image: abs(ogImage),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author:    { '@type': 'Organization', name: 'Kliente 360' },
    publisher: { '@type': 'Organization', name: 'Kliente 360' },
    articleSection: sectionLabel,
    keywords: t.keywords || [],
  };

  // FAQ schema: detecta H2 terminados em "?" no body (ou flag explícita).
  const faqs = extractFaqs(t.body);
  const hasFaq = faqs.length >= 2;
  const faqScript = hasFaq
    ? `\n  <script type="application/ld+json">\n${JSON.stringify(faqPageSchema(faqs, lang), null, 2)}\n  </script>`
    : '';

  // Breadcrumb: Blog › Pilar › Post
  const breadcrumb = breadcrumbSchema(post, lang);

  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
${headCommon({
  title: `${t.title} | Kliente 360`,
  description: t.excerpt,
  canonical,
  ogType: 'article',
  pubDate: post.date,
  section: sectionLabel,
  htmlLang: HTML_LANG[lang],
  alternates,
  ogImage,
})}

  <script type="application/ld+json">
${JSON.stringify(ldJson, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(breadcrumb, null, 2)}
  </script>${faqScript}
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
${navHtml('/blog/' + post.slug, lang)}

  <main id="main">
    <article class="post-article" data-pillar="${post.pillar}" data-pagefind-body data-pagefind-filter="pillar:${post.pillar}">

      <header class="post-header">
        <div class="container container-narrow">
          <div class="post-header-top">
            <span class="pill-pillar">${escapeHtml(pillarLabel)}</span>
            <a class="post-back" href="${blogHref}">${escapeHtml(S.blogBack)}</a>
          </div>
          <h1 data-pagefind-meta="title">${escapeHtml(t.title)}</h1>
          <div class="post-meta-line">
            <time datetime="${post.date}">${formatDate(post.date, lang)}</time>
            <span class="sep">·</span>
            <span>${t.readMinutes} ${escapeHtml(S.readMin)}</span>
            <span class="sep">·</span>
            <span>${escapeHtml(S.by)}</span>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="post-body">
          ${t.tldr ? `<aside class="post-tldr">
            <div class="label">${escapeHtml(S.tldr)}</div>
            <p>${escapeHtml(t.tldr)}</p>
          </aside>` : ''}

          ${renderMarkdown(t.body)}
        </div>
      </div>

      <section class="post-end">
        <div class="container">
          <div class="post-end-cta">
            <div class="label">${escapeHtml(S.endLabel)}</div>
            <h3>${escapeHtml(S.endTitle)}</h3>
            <p>${escapeHtml(S.endText)}</p>
            <a class="btn-link" href="/#contato">${escapeHtml(S.endLink)}</a>
          </div>
        </div>
      </section>

      <section class="post-explore">
        <div class="container">
          <div class="label">${escapeHtml(S.exploreLabel)}</div>
          <div class="grid-cards cols-2-3">
            <a class="card explore-card" data-pillar="${post.pillar}" href="${PILLAR_URL[lang][post.pillar]}">
              <div class="explore-kind">${escapeHtml(S.explorePillar(PILLAR_NAME[lang][post.pillar]))}</div>
              <p>${escapeHtml(S.explorePillarDesc(PILLAR_NAME[lang][post.pillar]))}</p>
            </a>
            <a class="card explore-card" href="${HOWWE_URL[lang]}">
              <div class="explore-kind">${escapeHtml(S.exploreHow)}</div>
              <p>${escapeHtml(S.exploreHowDesc)}</p>
            </a>
            <a class="card explore-card" href="${GLOSSARY_URL[lang]}?pilar=${post.pillar}">
              <div class="explore-kind">${escapeHtml(S.exploreGlossary)}</div>
              <p>${escapeHtml(S.exploreGlossaryDesc)}</p>
            </a>
          </div>
        </div>
      </section>

      ${related.length ? `<section class="post-related">
        <div class="container">
          <h2>${escapeHtml(S.relatedTitle)}</h2>
          <div class="grid-cards cols-2-3">
${related.map(r => `            <a class="card post-card" data-pillar="${r.pillar}" href="${postPath(r.slug, lang)}">
              <div class="post-meta">
                <span class="pill-pillar">${escapeHtml(S.pillars[r.pillar])}</span>
                <span class="post-date">${formatDate(r.date, lang)}</span>
              </div>
              <h3>${escapeHtml(r.translations[lang].title)}</h3>
              <div class="read">${escapeHtml(S.readLink)}</div>
            </a>`).join('\n')}
          </div>
        </div>
      </section>` : ''}

    </article>
  </main>

${footerHtml}

  <script src="/assets/js/i18n.js?v=${ASSET_VERSION}"></script>
  <script src="/assets/js/main.js?v=${ASSET_VERSION}" type="module"></script>
</body>
</html>`;
};

// ---------- listing template ----------
const renderListing = (lang, allPosts) => {
  const S = STRINGS[lang];
  const posts = allPosts.filter(p => p.translations[lang]);

  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
${headCommon({
  title: 'Blog — Kliente 360',
  description: S.listingMeta,
  canonical: listingUrl(lang),
  ogType: 'website',
  htmlLang: HTML_LANG[lang],
  alternates: [
    ...LANGS.map(l => ({ lang: l, href: listingUrl(l) })),
    { lang: 'x-default', href: listingUrl('pt') },
  ],
})}
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
${navHtml(listingPath(lang), lang)}

  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <span class="eyebrow" data-i18n="blog.eyebrow">Blog</span>
        <h1 style="margin-top: var(--sp-3);">${escapeHtml(S.listingTitle)}</h1>
        <p class="lead">${escapeHtml(S.listingLead)}</p>

        <div class="blog-controls">
          <label class="blog-search">
            <svg class="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input type="search" data-blog-search placeholder="${escapeHtml(S.searchPlaceholder)}" aria-label="${escapeHtml(S.searchPlaceholder)}" autocomplete="off" />
          </label>
          <div class="blog-filter" role="group" aria-label="Filter">
            <button type="button" data-filter="all" aria-pressed="true">${escapeHtml(S.filterAll)}</button>
            <button type="button" data-filter="sf"   aria-pressed="false">${escapeHtml(S.sections.sf)}</button>
            <button type="button" data-filter="data" aria-pressed="false">${escapeHtml(S.filterDataShort)}</button>
            <button type="button" data-filter="ai"   aria-pressed="false">${escapeHtml(S.filterAiShort)}</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="grid-cards cols-2-3" data-blog-grid>
${posts.map(p => `          <a class="card post-card" data-pillar="${p.pillar}" href="${postPath(p.slug, lang)}">
            <div class="post-meta">
              <span class="pill-pillar">${escapeHtml(S.pillars[p.pillar])}</span>
              <span class="post-date">${formatDate(p.date, lang)}</span>
            </div>
            <h3>${escapeHtml(p.translations[lang].title)}</h3>
            <div class="read">${escapeHtml(S.readLink)}</div>
          </a>`).join('\n')}
        </div>
        <div class="blog-search-results" data-blog-search-results hidden>
          <div class="blog-search-status" data-blog-search-status></div>
          <div class="grid-cards cols-2-3" data-blog-search-list></div>
        </div>
        <div class="blog-more" data-blog-more hidden>
          <div class="blog-more-count" data-blog-more-count aria-live="polite"></div>
          <button type="button" class="btn btn-ghost" data-blog-more-btn>${escapeHtml(S.loadMore)}</button>
        </div>
      </div>
    </section>
  </main>

${footerHtml}

  <script src="/assets/js/i18n.js?v=${ASSET_VERSION}"></script>
  <script src="/assets/js/main.js?v=${ASSET_VERSION}" type="module"></script>
  <script type="module">
    // Busca Pagefind no listing + load-more na navegação por chips.
    const input  = document.querySelector('[data-blog-search]');
    const grid   = document.querySelector('[data-blog-grid]');
    const wrap   = document.querySelector('[data-blog-search-results]');
    const list   = document.querySelector('[data-blog-search-list]');
    const status = document.querySelector('[data-blog-search-status]');
    const filterButtons = document.querySelectorAll('.blog-filter button');
    const more   = document.querySelector('[data-blog-more]');
    const moreBtn = document.querySelector('[data-blog-more-btn]');
    const moreCount = document.querySelector('[data-blog-more-count]');
    const labels = { loading: ${JSON.stringify(S.searchLoading)}, empty: ${JSON.stringify(S.searchEmpty)}, read: ${JSON.stringify(S.readLink)}, of: ${JSON.stringify(S.loadMoreOf)} };
    const pillarLabels = ${JSON.stringify(S.sections)};

    // ----- Load more (paginação no modo navegação) -----
    const mq = window.matchMedia('(min-width: 768px)');
    const sizes = () => mq.matches ? { initial: 12, step: 12 } : { initial: 6, step: 6 };
    let limit = sizes().initial;
    const cards = grid ? Array.from(grid.querySelectorAll('.post-card')) : [];
    const paginate = () => {
      if (!grid || grid.style.display === 'none') { if (more) more.hidden = true; return; }
      const visible = cards.filter(c => c.dataset.hidden !== 'true');
      visible.forEach((c, i) => { c.dataset.overflow = i < limit ? 'false' : 'true'; });
      const shown = Math.min(limit, visible.length);
      if (visible.length > limit) {
        more.hidden = false;
        moreCount.textContent = shown + ' ' + labels.of + ' ' + visible.length;
      } else {
        more.hidden = true;
      }
    };
    if (moreBtn) moreBtn.addEventListener('click', () => { limit += sizes().step; paginate(); });
    mq.addEventListener('change', () => { limit = sizes().initial; paginate(); });

    // ----- Busca Pagefind (modo busca) -----
    let pagefind = null;
    let token = 0;
    const loadPagefind = async () => {
      if (pagefind) return pagefind;
      try {
        pagefind = await import('/pagefind/pagefind.js');
        await pagefind.options({ excerptLength: 28 });
      } catch (e) { pagefind = { _err: e }; }
      return pagefind;
    };
    const currentFilter = () => {
      const active = Array.from(filterButtons).find(b => b.getAttribute('aria-pressed') === 'true');
      return active ? active.dataset.filter : 'all';
    };
    const runSearch = async () => {
      const q = input.value.trim();
      if (!q) { wrap.hidden = true; grid.style.display = ''; paginate(); return; }
      grid.style.display = 'none';
      wrap.hidden = false;
      if (more) more.hidden = true;
      status.textContent = labels.loading;
      list.innerHTML = '';
      const my = ++token;
      const pf = await loadPagefind();
      if (my !== token) return;
      if (pf._err) { status.textContent = labels.empty; return; }
      const filter = currentFilter();
      const opts = filter === 'all' ? {} : { filters: { pillar: filter } };
      let r;
      try { r = await pf.search(q, opts); }
      catch (e) { console.error('Pagefind search error:', e); status.textContent = labels.empty; return; }
      if (my !== token) return;
      if (!r || !r.results.length) { status.textContent = labels.empty; return; }
      status.textContent = '';
      let data;
      try { data = await Promise.all(r.results.slice(0, 24).map(x => x.data())); }
      catch (e) { console.error('Pagefind data() error:', e); status.textContent = labels.empty; return; }
      if (my !== token) return;
      list.innerHTML = data.map(d => {
        const pillarCode = (d.filters && d.filters.pillar && d.filters.pillar[0]) || '';
        const pillarLabel = pillarLabels[pillarCode] || '';
        const title = (d.meta && d.meta.title) || d.url;
        return \`<a class="card post-card" data-pillar="\${pillarCode}" href="\${d.url}">
          <div class="post-meta"><span class="pill-pillar">\${pillarLabel}</span></div>
          <h3>\${title}</h3>
          <p class="post-excerpt">\${d.excerpt}</p>
          <div class="read">\${labels.read}</div>
        </a>\`;
      }).join('');
    };
    let timer;
    if (input) {
      input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(runSearch, 120); });
    }
    // Filter clicks: resetar paginação OU re-disparar busca, conforme modo.
    filterButtons.forEach(b => b.addEventListener('click', () => {
      if (input && input.value.trim()) { runSearch(); }
      else { limit = sizes().initial; setTimeout(paginate, 0); }
    }));
    // Inicial: aplica paginação ao carregar.
    paginate();
  </script>
</body>
</html>`;
};

// ---------- collect posts by base slug + lang ----------
const collectPosts = () => {
  if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

  const files = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .filter(f => !f.startsWith('_'))
    .filter(f => f.toLowerCase() !== 'readme.md');

  const bySlug = new Map();

  for (const file of files) {
    // Pattern: <slug>.md (PT) or <slug>.<lang>.md (EN/ES)
    const m = file.match(/^(.+?)(?:\.(en|es))?\.md$/);
    if (!m) continue;
    const baseSlug = m[1];
    const lang = m[2] || 'pt';

    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    if (!bySlug.has(baseSlug)) {
      bySlug.set(baseSlug, {
        slug: baseSlug,
        pillar: data.pillar,
        date: data.date,
        translations: {},
      });
    }
    const post = bySlug.get(baseSlug);

    // Pillar e date vêm sempre do PT — outros podem omitir.
    if (lang === 'pt') {
      post.pillar = data.pillar;
      post.date = data.date;
    }

    post.translations[lang] = {
      title: data.title,
      excerpt: data.excerpt || '',
      tldr: data.tldr || '',
      readMinutes: data.readMinutes || Math.max(2, Math.round(content.split(/\s+/).length / 220)),
      keywords: data.keywords || [],
      body: content,
    };
  }

  // Ordena do mais recente pro mais antigo.
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
};

// ---------- write helper ----------
const writeOut = (relPath, html) => {
  const target = join(ROOT, relPath);
  const dir = dirname(target);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(target, html);
  console.log(`   ✓ ${relPath}`);
};

// Reescreve refs /assets/*.css|js em HTMLs estáticas pra carimbar ?v=<ASSET_VERSION>.
// Mantém index.html/styleguide.html sincronizadas com o hash de conteúdo.
const stampStaticAssetVersions = (files) => {
  const re = /(["'])(\/assets\/[^"'?]+\.(?:css|js))(\?v=[^"'\s]*)?\1/g;
  for (const rel of files) {
    const target = join(ROOT, rel);
    if (!existsSync(target)) continue;
    const src = readFileSync(target, 'utf-8');
    const out = src.replace(re, (_m, q, path) => `${q}${path}?v=${ASSET_VERSION}${q}`);
    if (out !== src) {
      writeFileSync(target, out);
      console.log(`   ✓ ${rel} (asset version → ${ASSET_VERSION})`);
    }
  }
};

// ---------- build ----------
const main = () => {
  const posts = collectPosts();
  console.log(`📚 ${posts.length} posts (base slug) coletados`);

  // OG image PNG por post + idioma (precisa rodar antes do render — o caminho
  // gerado vai no <meta property="og:image">).
  let ogCount = 0;
  for (const post of posts) {
    for (const lang of LANGS) {
      if (!post.translations[lang]) continue;
      generateOgImage(post, lang);
      ogCount++;
    }
  }
  console.log(`   ✓ ${ogCount} OG images geradas em /assets/img/og/`);

  // Posts por idioma
  for (const post of posts) {
    for (const lang of LANGS) {
      const html = renderPost(post, lang, posts);
      if (!html) continue;
      const relPath = lang === 'pt'
        ? `blog/${post.slug}.html`
        : `blog/${lang}/${post.slug}.html`;
      writeOut(relPath, html);
    }
  }

  // Listagens
  for (const lang of LANGS) {
    const relPath = lang === 'pt' ? 'blog/index.html' : `blog/${lang}/index.html`;
    writeOut(relPath, renderListing(lang, posts));
  }

  // Sitemap
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = [
    { path: '/', priority: '1.0' },
    { path: '/blog/', priority: '0.8' },
    { path: '/pilares/salesforce/', priority: '0.9' },
    { path: '/pilares/data/', priority: '0.9' },
    { path: '/pilares/ia/', priority: '0.9' },
    { path: '/como-trabalhamos/', priority: '0.8' },
    { path: '/glossario/', priority: '0.6' },
    { path: '/en/pilares/salesforce/', priority: '0.7' },
    { path: '/en/pilares/data/', priority: '0.7' },
    { path: '/en/pilares/ia/', priority: '0.7' },
    { path: '/en/como-trabalhamos/', priority: '0.6' },
    { path: '/en/glossario/', priority: '0.5' },
    { path: '/es/pilares/salesforce/', priority: '0.7' },
    { path: '/es/pilares/data/', priority: '0.7' },
    { path: '/es/pilares/ia/', priority: '0.7' },
    { path: '/es/como-trabalhamos/', priority: '0.6' },
    { path: '/es/glossario/', priority: '0.5' },
  ];
  const allUrls = [
    ...staticUrls.map(u => ({ loc: abs(u.path), lastmod: today, changefreq: 'monthly', priority: u.priority })),
  ];
  for (const post of posts) {
    for (const lang of LANGS) {
      if (!post.translations[lang]) continue;
      allUrls.push({ loc: postUrl(post.slug, lang), lastmod: post.date, changefreq: 'yearly', priority: '0.6' });
    }
  }
  for (const lang of ['en', 'es']) {
    allUrls.push({ loc: listingUrl(lang), lastmod: today, changefreq: 'monthly', priority: '0.6' });
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
  console.log(`   ✓ sitemap.xml (${allUrls.length} URLs)`);

  // Manifest de posts (para o home trocar cards no swap de idioma)
  const manifest = posts.map(p => ({
    slug: p.slug,
    pillar: p.pillar,
    date: p.date,
    translations: Object.fromEntries(LANGS.filter(l => p.translations[l]).map(l => [l, {
      title: p.translations[l].title,
      url: postPath(p.slug, l),
      date: formatDate(p.date, l),
    }])),
  }));
  const dataDir = join(ROOT, 'assets', 'data');
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(dataDir, 'posts.json'), JSON.stringify(manifest, null, 2));
  console.log(`   ✓ assets/data/posts.json (${manifest.length} posts)`);

  // OG image PNG
  const ogSvgPath = join(ROOT, 'og-image.svg');
  if (existsSync(ogSvgPath)) {
    const svg = readFileSync(ogSvgPath, 'utf-8');
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
      font: { loadSystemFonts: true },
    });
    const pngData = resvg.render().asPng();
    writeFileSync(join(ROOT, 'og-image.png'), pngData);
    console.log(`   ✓ og-image.png (1200x630)`);
  }

  // Carimba ?v=<hash> em HTMLs estáticas (não geradas)
  stampStaticAssetVersions(['index.html', 'styleguide.html']);

  console.log(`✅ Build concluído (asset version: ${ASSET_VERSION}).`);
};

main();
