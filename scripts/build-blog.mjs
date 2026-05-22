#!/usr/bin/env node
/**
 * Kliente 360 — build do blog MD → HTML
 *
 * Lê todos os posts em blog/posts/*.md, gera:
 *  - blog/<slug>.html para cada post
 *  - blog/index.html com listagem completa
 *
 * Estrutura de um post (frontmatter YAML + corpo MD):
 *
 *   ---
 *   title: "Título do post"
 *   slug: "titulo-do-post"
 *   pillar: "ai"          # sf | data | ai
 *   date: "2026-05-14"
 *   readMinutes: 6
 *   excerpt: "Resumo em uma linha."
 *   tldr: "Resumo de 2-3 linhas pra capa do post."
 *   keywords: ["IA", "agentes"]
 *   ---
 *
 *   Conteúdo em Markdown aqui...
 *
 * Pensado para automação: agentes podem produzir arquivos .md
 * sem tocar em HTML/CSS. O template é fixo, o conteúdo é livre.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
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

const ASSET_VERSION = new Date().toISOString().slice(0, 10).replaceAll('-', '');

const PILLARS = {
  sf:   { id: 'sf',   label: 'Pilar 01 · Salesforce', sectionName: 'Salesforce' },
  data: { id: 'data', label: 'Pilar 02 · Data',       sectionName: 'Data & Analytics' },
  ai:   { id: 'ai',   label: 'Pilar 03 · IA',         sectionName: 'IA & Aplicações' },
};

// ---------- helpers ----------
const formatDate = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const escapeHtml = (s) => String(s)
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  .replaceAll('"','&quot;').replaceAll("'", '&#39;');

const renderMarkdown = (md) => {
  // Marca o primeiro parágrafo do corpo para receber o drop-cap.
  const html = marked.parse(md, { breaks: false, gfm: true });
  return html.replace('<p>', '<p class="post-intro">');
};

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
        <a href="/#salesforce" data-i18n="nav.mobile.salesforce">Salesforce</a>
        <a href="/#data" data-i18n="nav.mobile.data">Data &amp; Analytics</a>
        <a href="/#ia" data-i18n="nav.mobile.ai">IA &amp; Aplicações</a>
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
          <p data-i18n="footer.tagline">Boutique de CRM, dados e IA. Conhecimento aplicado, como serviço.</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.pillarsTitle">Pilares</h4>
          <ul>
            <li><a href="/#salesforce" data-i18n="nav.mobile.salesforce">Salesforce</a></li>
            <li><a href="/#data" data-i18n="nav.mobile.data">Data &amp; Analytics</a></li>
            <li><a href="/#ia" data-i18n="nav.mobile.ai">IA &amp; Aplicações</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.empresaTitle">Empresa</h4>
          <ul>
            <li><a href="/#trilha" data-i18n="nav.trilha">Trilha 360</a></li>
            <li><a href="/#cases" data-i18n="nav.cases">Cases</a></li>
            <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>
            <li><a href="/#contato" data-i18n="nav.contact">Contato</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.contactTitle">Contato</h4>
          <ul>
            <li><a href="mailto:contato@kliente360.com">contato@kliente360.com</a></li>
            <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div data-i18n="footer.rights">© 2026 Kliente 360. Todos os direitos reservados.</div>
        <div class="mono">v0.1 · boutique CRM · dados · IA</div>
      </div>
    </div>
  </footer>`;

const headCommon = ({ title, description, canonical, ogType = 'article', pubDate, section }) => `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />

  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate icon" href="/favicon.ico" />

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
const renderPost = (post, posts) => {
  const pillar = PILLARS[post.pillar];
  if (!pillar) throw new Error(`Post ${post.slug}: pillar inválido '${post.pillar}'`);

  // Próximas leituras: 3 outros posts (preferindo o mesmo pilar)
  const related = [
    ...posts.filter(p => p.slug !== post.slug && p.pillar === post.pillar),
    ...posts.filter(p => p.slug !== post.slug && p.pillar !== post.pillar),
  ].slice(0, 3);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author:    { '@type': 'Organization', name: 'Kliente 360' },
    publisher: { '@type': 'Organization', name: 'Kliente 360' },
    articleSection: pillar.sectionName,
    keywords: post.keywords || [],
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${headCommon({
  title: `${post.title} | Kliente 360`,
  description: post.excerpt,
  canonical: `/blog/${post.slug}.html`,
  ogType: 'article',
  pubDate: post.date,
  section: pillar.sectionName,
})}

  <script type="application/ld+json">
${JSON.stringify(ldJson, null, 2)}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
${navHtml('/blog/' + post.slug)}

  <main id="main">
    <article class="post-article" data-pillar="${pillar.id}">

      <header class="post-header">
        <div class="container container-narrow">
          <a class="post-back" href="/blog/">Blog</a>
          <span class="pill-pillar">${escapeHtml(pillar.label)}</span>
          <h1>${escapeHtml(post.title)}</h1>
          <div class="post-meta-line">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span class="sep">·</span>
            <span>${post.readMinutes} min de leitura</span>
            <span class="sep">·</span>
            <span>Por Kliente 360</span>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="post-body">
          ${post.tldr ? `<aside class="post-tldr">
            <div class="label">TL;DR</div>
            <p>${escapeHtml(post.tldr)}</p>
          </aside>` : ''}

          ${renderMarkdown(post.body)}
        </div>
      </div>

      <section class="post-end">
        <div class="container">
          <div class="post-end-cta">
            <div class="label">Continuar a conversa</div>
            <h3>Quer discutir esse tema com um sócio?</h3>
            <p>Diagnóstico inicial sem compromisso. Levamos uma primeira leitura do seu cenário em uma semana e devolvemos um relatório.</p>
            <a class="btn-link" href="/#contato">Conversar com um sócio</a>
          </div>
        </div>
      </section>

      ${related.length ? `<section class="post-related">
        <div class="container">
          <h2>Próximas leituras</h2>
          <div class="blog-list">
${related.map(r => `            <a class="post-card" data-pillar="${r.pillar}" href="/blog/${r.slug}.html">
              <div class="post-meta">
                <span class="pill-pillar">${escapeHtml(PILLARS[r.pillar].label)}</span>
                <span class="post-date">${formatDate(r.date)}</span>
              </div>
              <h3>${escapeHtml(r.title)}</h3>
              <div class="read" data-i18n="blog.read">Ler →</div>
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
const renderListing = (posts) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${headCommon({
  title: 'Blog — Kliente 360',
  description: 'Blog Kliente 360 — Estratégia, prática e crítica em CRM, dados e IA. Ensaios e análises para quem decide.',
  canonical: '/blog/',
  ogType: 'website',
})}
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
${navHtml('/blog/')}

  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <span class="eyebrow" data-i18n="blog.eyebrow">Blog</span>
        <h1 style="margin-top: var(--sp-3);" data-i18n="blog.title">Estratégia, prática e crítica.</h1>
        <p class="lead" data-i18n="blog.lead">CRM, dados e IA — ensaios e análises para quem decide. Conteúdo técnico, sem clichês.</p>

        <div class="blog-filter" role="group" aria-label="Filtrar por pilar">
          <button type="button" data-filter="all" aria-pressed="true" data-i18n="blog.filterAll">Todos</button>
          <button type="button" data-filter="sf"   aria-pressed="false" data-i18n="nav.mobile.salesforce">Salesforce</button>
          <button type="button" data-filter="data" aria-pressed="false" data-i18n="nav.mobile.data">Data &amp; Analytics</button>
          <button type="button" data-filter="ai"   aria-pressed="false" data-i18n="nav.mobile.ai">IA &amp; Aplicações</button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="blog-list">
${posts.map(p => `          <a class="post-card" data-pillar="${p.pillar}" href="/blog/${p.slug}.html">
            <div class="post-meta">
              <span class="pill-pillar">${escapeHtml(PILLARS[p.pillar].label)}</span>
              <span class="post-date">${formatDate(p.date)}</span>
            </div>
            <h3>${escapeHtml(p.title)}</h3>
            <div class="read" data-i18n="blog.read">Ler →</div>
          </a>`).join('\n')}
        </div>
      </div>
    </section>
  </main>

${footerHtml}

  <script src="/assets/js/i18n.js?v=${ASSET_VERSION}"></script>
  <script src="/assets/js/main.js?v=${ASSET_VERSION}" type="module"></script>
  <script>
    document.querySelectorAll('.blog-filter button').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.blog-filter button').forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        document.querySelectorAll('.post-card').forEach(card => {
          const show = filter === 'all' || card.dataset.pillar === filter;
          card.dataset.hidden = show ? 'false' : 'true';
        });
      });
    });
  </script>
</body>
</html>`;

// ---------- build ----------
const main = () => {
  if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

  const files = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .filter(f => !f.startsWith('_'))      // _template.md, _draft.md, etc.
    .filter(f => f.toLowerCase() !== 'readme.md');
  console.log(`📚 ${files.length} posts encontrados em ${POSTS_DIR}`);

  const posts = files.map(file => {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: data.slug || file.replace(/\.md$/, ''),
      title: data.title,
      pillar: data.pillar,
      date: data.date,
      readMinutes: data.readMinutes || Math.max(2, Math.round(content.split(/\s+/).length / 220)),
      excerpt: data.excerpt || '',
      tldr: data.tldr || '',
      keywords: data.keywords || [],
      body: content,
    };
  }).sort((a, b) => b.date.localeCompare(a.date));

  // Gera HTML de cada post
  for (const post of posts) {
    const html = renderPost(post, posts);
    const target = join(BLOG_DIR, `${post.slug}.html`);
    writeFileSync(target, html);
    console.log(`   ✓ ${post.slug}.html`);
  }

  // Gera a listagem
  writeFileSync(join(BLOG_DIR, 'index.html'), renderListing(posts));
  console.log(`   ✓ index.html (listing)`);

  // Gera sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = ['/', '/blog/', '/styleguide.html'];
  const allUrls = [
    ...staticUrls.map(u => ({ loc: u, lastmod: today, changefreq: 'monthly', priority: u === '/' ? '1.0' : '0.7' })),
    ...posts.map(p => ({ loc: `/blog/${p.slug}.html`, lastmod: p.date, changefreq: 'yearly', priority: '0.6' })),
  ];
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

  // Converte og-image.svg → og-image.png para compatibilidade
  // com WhatsApp, Facebook Messenger e Slack (que não renderizam SVG).
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

  console.log(`✅ Build concluído (asset version: ${ASSET_VERSION}).`);
};

main();
