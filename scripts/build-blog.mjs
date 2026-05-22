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
    relatedTitle: 'Próximas leituras',
    listingTitle: 'Estratégia, prática e crítica.',
    listingLead: 'CRM, dados e IA — ensaios e análises para quem decide. Conteúdo técnico, sem clichês.',
    listingMeta: 'Blog Kliente 360 — Estratégia, prática e crítica em CRM, dados e IA. Ensaios e análises para quem decide.',
    filterAll: 'Todos',
    readLink: 'Ler →',
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
    relatedTitle: 'Further reading',
    listingTitle: 'Strategy, practice and critique.',
    listingLead: 'CRM, data and AI — essays and analysis for decision-makers. Technical content, no buzzwords.',
    listingMeta: 'Kliente 360 Blog — Strategy, practice and critique in CRM, data and AI. Essays for decision-makers.',
    filterAll: 'All',
    readLink: 'Read →',
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
    relatedTitle: 'Próximas lecturas',
    listingTitle: 'Estrategia, práctica y crítica.',
    listingLead: 'CRM, datos e IA — ensayos y análisis para quien decide. Contenido técnico, sin clichés.',
    listingMeta: 'Blog Kliente 360 — Estrategia, práctica y crítica en CRM, datos e IA. Ensayos para quien decide.',
    filterAll: 'Todos',
    readLink: 'Leer →',
  },
};

const PILLARS_DATA = { sf: {}, data: {}, ai: {} };

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

// Caminho relativo de um asset CSS/JS (sempre absoluto a partir da raiz).
const postUrl = (slug, lang) => lang === 'pt' ? `/blog/${slug}.html` : `/blog/${lang}/${slug}.html`;
const listingUrl = (lang) => lang === 'pt' ? '/blog/' : `/blog/${lang}/`;

// ---------- shared chunks ----------
const navHtml = (currentPath = '') => `
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
        <a href="/#trilha" data-i18n="nav.trilha">Trilha 360</a>
        <a href="/#cases" data-i18n="nav.cases">Cases</a>
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
        <a href="/#cases" data-i18n="nav.mobile.cases">Cases</a>
        <a href="/blog/" data-i18n="nav.mobile.blog">Blog</a>
      </div>
      <div class="nav-cta">
        <a class="btn btn-primary" href="/#contato" data-i18n="nav.cta">Falar com um sócio</a>
      </div>
    </div>
  </header>`;

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
          <p data-i18n="footer.tagline">Consultoria especializada em CRM, dados e IA. Conhecimento aplicado, como serviço.</p>
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
            <li><a href="/#cases" data-i18n="nav.cases">Cases</a></li>
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
        <div class="mono">v0.1 · CRM · dados · IA</div>
      </div>
    </div>
  </footer>`;

const hreflangCode = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', 'x-default': 'x-default' };
const renderAlternates = (alternates = []) => alternates
  .map(({ lang, href }) => `  <link rel="alternate" hreflang="${hreflangCode[lang]}" href="${href}" />`)
  .join('\n');

const headCommon = ({ title, description, canonical, ogType = 'article', pubDate, section, htmlLang = 'pt-BR', alternates = [] }) => `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />

  <link rel="canonical" href="${canonical}" />
${renderAlternates(alternates)}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Kliente 360" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  ${pubDate ? `<meta property="article:published_time" content="${pubDate}" />` : ''}
  ${section ? `<meta property="article:section" content="${escapeHtml(section)}" />` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/assets/css/tokens.css?v=${ASSET_VERSION}" />
  <link rel="stylesheet" href="/assets/css/reset.css?v=${ASSET_VERSION}" />
  <link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_VERSION}" />`;

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

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.excerpt,
    datePublished: post.date,
    inLanguage: HTML_LANG[lang],
    author:    { '@type': 'Organization', name: 'Kliente 360' },
    publisher: { '@type': 'Organization', name: 'Kliente 360' },
    articleSection: sectionLabel,
    keywords: t.keywords || [],
  };

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
})}

  <script type="application/ld+json">
${JSON.stringify(ldJson, null, 2)}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
${navHtml('/blog/' + post.slug)}

  <main id="main">
    <article class="post-article" data-pillar="${post.pillar}">

      <header class="post-header">
        <div class="container container-narrow">
          <div class="post-header-top">
            <span class="pill-pillar">${escapeHtml(pillarLabel)}</span>
            <a class="post-back" href="${blogHref}">${escapeHtml(S.blogBack)}</a>
          </div>
          <h1>${escapeHtml(t.title)}</h1>
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

      ${related.length ? `<section class="post-related">
        <div class="container">
          <h2>${escapeHtml(S.relatedTitle)}</h2>
          <div class="blog-list">
${related.map(r => `            <a class="post-card" data-pillar="${r.pillar}" href="${postUrl(r.slug, lang)}">
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
${navHtml(listingUrl(lang))}

  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <span class="eyebrow" data-i18n="blog.eyebrow">Blog</span>
        <h1 style="margin-top: var(--sp-3);">${escapeHtml(S.listingTitle)}</h1>
        <p class="lead">${escapeHtml(S.listingLead)}</p>

        <div class="blog-filter" role="group" aria-label="Filter">
          <button type="button" data-filter="all" aria-pressed="true">${escapeHtml(S.filterAll)}</button>
          <button type="button" data-filter="sf"   aria-pressed="false">${escapeHtml(S.sections.sf)}</button>
          <button type="button" data-filter="data" aria-pressed="false">${escapeHtml(S.sections.data)}</button>
          <button type="button" data-filter="ai"   aria-pressed="false">${escapeHtml(S.sections.ai)}</button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="blog-list">
${posts.map(p => `          <a class="post-card" data-pillar="${p.pillar}" href="${postUrl(p.slug, lang)}">
            <div class="post-meta">
              <span class="pill-pillar">${escapeHtml(S.pillars[p.pillar])}</span>
              <span class="post-date">${formatDate(p.date, lang)}</span>
            </div>
            <h3>${escapeHtml(p.translations[lang].title)}</h3>
            <div class="read">${escapeHtml(S.readLink)}</div>
          </a>`).join('\n')}
        </div>
      </div>
    </section>
  </main>

${footerHtml}

  <script src="/assets/js/i18n.js?v=${ASSET_VERSION}"></script>
  <script src="/assets/js/main.js?v=${ASSET_VERSION}" type="module"></script>
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
  const staticUrls = ['/', '/blog/', '/styleguide.html'];
  const allUrls = [
    ...staticUrls.map(u => ({ loc: u, lastmod: today, changefreq: 'monthly', priority: u === '/' ? '1.0' : '0.7' })),
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
      url: postUrl(p.slug, l),
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
