// Templates compartilhados entre páginas estáticas e páginas geradas pelo build.
//
// Por que existe: footer e nav aparecem em ~60 páginas (17 estáticas + 45+
// posts + 3 listings). Manter inline em cada uma força sed multi-arquivo
// toda vez que muda uma URL, label ou link. Aqui é a single source.
//
// Como funciona pra páginas estáticas:
//  - O HTML tem marcadores `<!-- footer:auto -->...<!-- /footer:auto -->`.
//  - `injectComponents()` no build-blog.mjs lê o `<html lang>` da página
//    e substitui o conteúdo entre marcadores pelo footer da língua certa.
//  - Pra páginas geradas (blog posts/listings), o template é usado direto.

// Prefixo de URL por língua (PT é raiz; EN/ES são /en/ e /es/).
const PREFIX = { pt: '', en: '/en', es: '/es' };
const BLOG_PREFIX = { pt: '/blog/', en: '/blog/en/', es: '/blog/es/' };

// Defaults inline para data-i18n (texto pré-hidratação + SEO/crawlers).
const LABELS = {
  pt: {
    tagline: 'Consultoria especializada em CRM com Salesforce, Dados e IA. Conhecimento aplicado, como serviço.',
    pillarsTitle: 'Pilares', empresaTitle: 'Empresa', contactTitle: 'Contato',
    salesforce: 'Salesforce', data: 'Data &amp; Analytics', ai: 'IA Aplicada',
    trilha: 'Trilha 360', blog: 'Blog', howWeWork: 'Como trabalhamos',
    glossary: 'Glossário', contact: 'Contato',
    rights: '© 2026 Kliente 360. Todos os direitos reservados.',
  },
  en: {
    tagline: 'Specialist consultancy in CRM with Salesforce, Data and AI. Applied knowledge, as a service.',
    pillarsTitle: 'Practices', empresaTitle: 'Company', contactTitle: 'Contact',
    salesforce: 'Salesforce', data: 'Data &amp; Analytics', ai: 'Applied AI',
    trilha: 'Method 360', blog: 'Blog', howWeWork: 'How we work',
    glossary: 'Glossary', contact: 'Contact',
    rights: '© 2026 Kliente 360. All rights reserved.',
  },
  es: {
    tagline: 'Consultoría especializada en CRM con Salesforce, Datos e IA. Conocimiento aplicado, como servicio.',
    pillarsTitle: 'Pilares', empresaTitle: 'Empresa', contactTitle: 'Contacto',
    salesforce: 'Salesforce', data: 'Data &amp; Analytics', ai: 'IA Aplicada',
    trilha: 'Método 360', blog: 'Blog', howWeWork: 'Cómo trabajamos',
    glossary: 'Glosario', contact: 'Contacto',
    rights: '© 2026 Kliente 360. Todos los derechos reservados.',
  },
};

export function footerHtml(lang = 'pt') {
  const L = LABELS[lang] || LABELS.pt;
  const p = PREFIX[lang] || '';
  const blog = BLOG_PREFIX[lang] || '/blog/';
  return `
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
          <p data-i18n="footer.tagline">${L.tagline}</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.pillarsTitle">${L.pillarsTitle}</h4>
          <ul>
            <li><a href="${p}/pilares/salesforce/" data-i18n="nav.mobile.salesforce">${L.salesforce}</a></li>
            <li><a href="${p}/pilares/data/" data-i18n="nav.mobile.data">${L.data}</a></li>
            <li><a href="${p}/pilares/ia/" data-i18n="nav.mobile.ai">${L.ai}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.empresaTitle">${L.empresaTitle}</h4>
          <ul>
            <li><a href="/#trilha" data-i18n="nav.trilha">${L.trilha}</a></li>
            <li><a href="${blog}" data-i18n="nav.blog">${L.blog}</a></li>
            <li><a href="${p}/como-trabalhamos/">${L.howWeWork}</a></li>
            <li><a href="${p}/glossario/">${L.glossary}</a></li>
            <li><a href="/#contato" data-i18n="nav.contact">${L.contact}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.contactTitle">${L.contactTitle}</h4>
          <ul>
            <li><a href="mailto:contato@kliente360.com">contato@kliente360.com</a></li>
            <li><a href="https://www.linkedin.com/company/kliente360/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://wa.me/5511930488622" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div data-i18n="footer.rights">${L.rights}</div>
      </div>
    </div>
  </footer>`;
}

// Detecta `<html lang="...">` no HTML de uma página estática.
export function detectLang(html) {
  const m = html.match(/<html[^>]*\blang="([^"]+)"/i);
  if (!m) return 'pt';
  const code = m[1].toLowerCase();
  if (code.startsWith('en')) return 'en';
  if (code.startsWith('es')) return 'es';
  return 'pt';
}

// Substitui conteúdo entre marcadores `<!-- footer:auto -->...<!-- /footer:auto -->`.
// Retorna `{ html, changed }`. Se não encontrar marcadores, devolve igual.
export function injectFooter(html) {
  const lang = detectLang(html);
  const open = '<!-- footer:auto -->';
  const close = '<!-- /footer:auto -->';
  const re = new RegExp(`${open}[\\s\\S]*?${close}`);
  if (!re.test(html)) return { html, changed: false };
  const next = html.replace(re, `${open}${footerHtml(lang)}\n  ${close}`);
  return { html: next, changed: next !== html };
}
