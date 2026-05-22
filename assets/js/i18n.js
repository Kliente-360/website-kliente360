// Kliente 360 — i18n minimalista
// Suporta PT/EN/ES. Persiste em localStorage. Lê ?lang=xx da URL.
//
// Como funciona:
//  - elemento HTML ganha [data-i18n="chave.aninhada"] → texto trocado
//  - elemento ganha [data-i18n-attr="placeholder:chave"] → atributo trocado
//  - <html lang> e <button[data-lang]> são atualizados automaticamente

const DICT = {
  pt: {
    nav: {
      pillars: 'Pilares', trilha: 'Trilha 360', cases: 'Cases', blog: 'Blog', contact: 'Contato',
      cta: 'Falar com um sócio', menu: 'Abrir menu',
      mobile: { pillars: 'Pilares', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'IA & Aplicações',
                empresa: 'Empresa', trilha: 'Trilha 360', cases: 'Cases', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Conhecimento aplicado,', title2: 'como serviço',
      sub: 'Boutique de CRM, dados e IA — três pilares como uma prática única. Poucos clientes estratégicos, atendidos por quem entrega.',
      cta1: 'Falar com um sócio', cta2: 'Conhecer a Trilha 360',
    },
    pillars: {
      eyebrow: 'Portfólio',
      title: 'Três pilares. Uma prática única.',
      lead: 'Nenhum boutique do Brasil entrega os três como uma só disciplina. CRM sem dado é cego; dado sem ativação é decoração; IA sem operação é demo. Operamos os três como uma engrenagem.',
      more: 'Ver o pilar',
      sf: { num: '01 · Pilar', t: 'Salesforce', d: 'Core CRM. Da implementação à evolução com agentes, sem terceirizar a estratégia.' },
      data: { num: '02 · Pilar', t: 'Data & Analytics', d: 'Engenharia de dados, analytics avançado e data science. Agnóstico de cloud, viés Tableau na ponta.' },
      ai: { num: '03 · Pilar', t: 'IA & Aplicações', d: 'Copilots sob medida e produtos SaaS verticais. Pegada de software house com discovery rápido.' },
    },
    pillarDeep: {
      cta: 'Falar com um sócio', link: 'Como entregamos',
      sf:   { eyebrow: 'Pilar 01', title: 'Salesforce — do CRM ao agente.', lead: 'Sales, Service, Data Cloud e Agentforce. Implementamos com cabeça de negócio, evoluímos com agentes onde já existe dado e processo.' },
      data: { eyebrow: 'Pilar 02', title: 'Data & Analytics — do dado bruto à decisão.', lead: 'Engenharia de dados moderna, modelos preditivos e visualização. Agnóstico de cloud, com prática certificada em Tableau na camada de consumo.' },
      ai:   { eyebrow: 'Pilar 03', titleLead: 'IA & Aplicações — do', titleMid: 'dado', titleConn: 'ao', titleEnd: 'agente', titleTail: '. Sem emendas.',
              lead: 'Copilots sob medida e produtos SaaS verticais. Sprint de IA enxuto: do diagnóstico ao primeiro modelo em produção rapidamente.' },
    },
    trilha: {
      eyebrow: 'Metodologia', title: 'Trilha 360.',
      lead: 'Cinco verbos. Híbrido entre consultoria estratégica, projeto de tecnologia e deploy rápido de IA. Mesmo método nos três pilares.',
      steps: [
        { v: 'Mapear',     d: 'Negócio, dados e processos. Onde a fricção mora.' },
        { v: 'Prototipar', d: 'Primeiro corte funcional. Baixo compromisso, alto aprendizado.' },
        { v: 'Validar',    d: 'Prova de valor com KPI claro. Mata ou avança.' },
        { v: 'Implantar',  d: 'Engenharia robusta, produção, integração.' },
        { v: 'Sustentar',  d: 'AMS, evolução contínua, agentes vivos.' },
      ],
    },
    cases: {
      eyebrow: 'Quem confia', title: 'Clientes estratégicos. Resultado mensurável.',
      lead: 'Carteira enxuta por escolha. Cada conta lidera-se por um sócio. Métricas exatas atualizadas a cada projeto encerrado.',
      placeholder: 'métrica a publicar com aprovação do cliente',
    },
    trust: {
      eyebrow: 'Por que a Kliente 360', title: 'Parceria Salesforce, time enxuto, conversa direta.',
      lead: 'Boutique por escolha. Operação liderada pelos sócios em todos os pilares, sem camadas de account manager entre você e quem entrega.',
      items: [
        { n: '3',     l: 'Pilares integrados — CRM, dados e IA' },
        { n: '2026',  l: 'Salesforce Partner ativo' },
        { n: '100%',  l: 'Contas lideradas por sócio' },
        { n: '<10',   l: 'Clientes estratégicos por vez' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Estratégia, prática e crítica.',
      lead: 'CRM, dados e IA — ensaios e análises para quem decide. Conteúdo técnico, sem clichês.',
      read: 'Ler →', all: 'Ver todos os textos', date: 'Em breve', filterAll: 'Todos',
    },
    contact: {
      eyebrow: 'Contato', title: 'Conversa direta com um sócio.',
      lead: 'Mande uma linha sobre o problema. Respondemos em 1 dia útil. Sem formulário-fila, sem SDR, sem agenda fantasma.',
      name: 'Nome', email: 'E-mail corporativo', company: 'Empresa', msg: 'Sobre o que conversamos?',
      msgPh: 'Ex.: estamos implantando Data Cloud e queremos avaliar parceria.',
      submit: 'Enviar mensagem', sent: 'Enviado — em breve respondemos',
      reply: 'Respondemos pessoalmente em até 1 dia útil.',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Boutique de CRM, dados e IA. Conhecimento aplicado, como serviço.',
      pillarsTitle: 'Pilares', empresaTitle: 'Empresa', contactTitle: 'Contato',
      rights: '© 2026 Kliente 360. Todos os direitos reservados.',
    },
  },

  en: {
    nav: {
      pillars: 'Practices', trilha: 'Method', cases: 'Cases', blog: 'Blog', contact: 'Contact',
      cta: 'Talk to a partner', menu: 'Open menu',
      mobile: { pillars: 'Practices', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'AI & Applications',
                empresa: 'Company', trilha: 'Method', cases: 'Cases', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Applied knowledge,', title2: 'as a service',
      sub: 'A boutique in CRM, data and AI — three practices as a single discipline. Few strategic clients, served by the people who deliver.',
      cta1: 'Talk to a partner', cta2: 'Explore the Method',
    },
    pillars: {
      eyebrow: 'Portfolio',
      title: 'Three practices. One discipline.',
      lead: 'No Brazilian boutique delivers all three as one. CRM without data is blind; data without activation is decoration; AI without operation is a demo. We run them as a single engine.',
      more: 'Open practice',
      sf:   { num: '01 · Practice', t: 'Salesforce', d: 'Core CRM. From implementation to agent-driven evolution, without outsourcing strategy.' },
      data: { num: '02 · Practice', t: 'Data & Analytics', d: 'Data engineering, advanced analytics and data science. Cloud-agnostic, Tableau-leaning at the edge.' },
      ai:   { num: '03 · Practice', t: 'AI & Applications', d: 'Custom copilots and vertical SaaS products. Software-house pace with fast discovery.' },
    },
    pillarDeep: {
      cta: 'Talk to a partner', link: 'How we deliver',
      sf:   { eyebrow: 'Practice 01', title: 'Salesforce — from CRM to agent.', lead: 'Sales, Service, Data Cloud and Agentforce. We implement with business sense, evolve with agents where data and process already exist.' },
      data: { eyebrow: 'Practice 02', title: 'Data & Analytics — from raw data to decision.', lead: 'Modern data engineering, predictive models and visualization. Cloud-agnostic, with certified Tableau practice at the consumption layer.' },
      ai:   { eyebrow: 'Practice 03', titleLead: 'AI & Applications — from', titleMid: 'data', titleConn: 'to', titleEnd: 'agent', titleTail: '. No seams.',
              lead: 'Custom copilots and vertical SaaS products. Lean AI sprint: from discovery to first model in production, fast.' },
    },
    trilha: {
      eyebrow: 'Method', title: 'Method 360.',
      lead: 'Five verbs. A hybrid of strategic consulting, tech project and rapid AI deployment. Same method across all three practices.',
      steps: [
        { v: 'Map',         d: 'Business, data and process. Where friction lives.' },
        { v: 'Prototype',   d: 'First functional cut. Low commitment, high learning.' },
        { v: 'Validate',    d: 'Proof of value with a clear KPI. Kills or advances.' },
        { v: 'Deploy',      d: 'Robust engineering, production, integration.' },
        { v: 'Sustain',     d: 'AMS, continuous evolution, living agents.' },
      ],
    },
    cases: {
      eyebrow: 'Who trusts us', title: 'Strategic clients. Measurable outcomes.',
      lead: 'A lean book of business by design. Each account led by a partner. Numbers published as each engagement closes.',
      placeholder: 'metric to be published with client approval',
    },
    trust: {
      eyebrow: 'Why Kliente 360', title: 'Salesforce partnership, lean team, direct conversation.',
      lead: 'Boutique by choice. Operation led by partners across all practices, no account-manager layer between you and the people who deliver.',
      items: [
        { n: '3',     l: 'Integrated practices — CRM, data and AI' },
        { n: '2026',  l: 'Active Salesforce Partner' },
        { n: '100%',  l: 'Accounts led by a partner' },
        { n: '<10',   l: 'Strategic clients at a time' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Strategy, practice and critique.',
      lead: 'CRM, data and AI — essays and analysis for decision-makers. Technical content, no buzzwords.',
      read: 'Read →', all: 'See all posts', date: 'Coming soon', filterAll: 'All',
    },
    contact: {
      eyebrow: 'Contact', title: 'A direct conversation with a partner.',
      lead: 'Send a line about the problem. We reply within 1 business day. No form-queue, no SDR, no phantom calendar.',
      name: 'Name', email: 'Work email', company: 'Company', msg: 'What should we discuss?',
      msgPh: 'E.g., we are rolling out Data Cloud and want to evaluate a partnership.',
      submit: 'Send message', sent: 'Sent — we will reply shortly',
      reply: 'We reply personally within 1 business day.',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Boutique in CRM, data and AI. Applied knowledge, as a service.',
      pillarsTitle: 'Practices', empresaTitle: 'Company', contactTitle: 'Contact',
      rights: '© 2026 Kliente 360. All rights reserved.',
    },
  },

  es: {
    nav: {
      pillars: 'Pilares', trilha: 'Método', cases: 'Casos', blog: 'Blog', contact: 'Contacto',
      cta: 'Hablar con un socio', menu: 'Abrir menú',
      mobile: { pillars: 'Pilares', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'IA & Aplicaciones',
                empresa: 'Empresa', trilha: 'Método', cases: 'Casos', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Conocimiento aplicado,', title2: 'como servicio',
      sub: 'Boutique de CRM, datos e IA — tres pilares como una sola práctica. Pocos clientes estratégicos, atendidos por quien entrega.',
      cta1: 'Hablar con un socio', cta2: 'Conocer el Método 360',
    },
    pillars: {
      eyebrow: 'Portafolio',
      title: 'Tres pilares. Una práctica única.',
      lead: 'Ningún boutique en Brasil entrega los tres como una sola disciplina. CRM sin datos es ciego; datos sin activación son decoración; IA sin operación es demo. Operamos los tres como un solo engranaje.',
      more: 'Ver el pilar',
      sf:   { num: '01 · Pilar', t: 'Salesforce', d: 'Core CRM. De la implementación a la evolución con agentes, sin tercerizar la estrategia.' },
      data: { num: '02 · Pilar', t: 'Data & Analytics', d: 'Ingeniería de datos, analítica avanzada y data science. Agnóstico de nube, con sesgo Tableau en la punta.' },
      ai:   { num: '03 · Pilar', t: 'IA & Aplicaciones', d: 'Copilots a medida y productos SaaS verticales. Velocidad de software house con discovery rápido.' },
    },
    pillarDeep: {
      cta: 'Hablar con un socio', link: 'Cómo entregamos',
      sf:   { eyebrow: 'Pilar 01', title: 'Salesforce — del CRM al agente.', lead: 'Sales, Service, Data Cloud y Agentforce. Implementamos con cabeza de negocio, evolucionamos con agentes donde ya existen datos y proceso.' },
      data: { eyebrow: 'Pilar 02', title: 'Data & Analytics — del dato bruto a la decisión.', lead: 'Ingeniería de datos moderna, modelos predictivos y visualización. Agnóstico de nube, con práctica certificada en Tableau en la capa de consumo.' },
      ai:   { eyebrow: 'Pilar 03', titleLead: 'IA & Aplicaciones — del', titleMid: 'dato', titleConn: 'al', titleEnd: 'agente', titleTail: '. Sin uniones.',
              lead: 'Copilots a medida y productos SaaS verticales. Sprint de IA enjuto: del diagnóstico al primer modelo en producción, rápido.' },
    },
    trilha: {
      eyebrow: 'Metodología', title: 'Método 360.',
      lead: 'Cinco verbos. Híbrido entre consultoría estratégica, proyecto de tecnología y deploy rápido de IA. Mismo método en los tres pilares.',
      steps: [
        { v: 'Mapear',     d: 'Negocio, datos y procesos. Dónde vive la fricción.' },
        { v: 'Prototipar', d: 'Primer corte funcional. Bajo compromiso, alto aprendizaje.' },
        { v: 'Validar',    d: 'Prueba de valor con KPI claro. Mata o avanza.' },
        { v: 'Implantar',  d: 'Ingeniería robusta, producción, integración.' },
        { v: 'Sostener',   d: 'AMS, evolución continua, agentes vivos.' },
      ],
    },
    cases: {
      eyebrow: 'Quién confía', title: 'Clientes estratégicos. Resultado medible.',
      lead: 'Cartera enjuta por elección. Cada cuenta liderada por un socio. Métricas exactas actualizadas en cada cierre de proyecto.',
      placeholder: 'métrica a publicar con aprobación del cliente',
    },
    trust: {
      eyebrow: 'Por qué Kliente 360', title: 'Sociedad Salesforce, equipo enjuto, conversación directa.',
      lead: 'Boutique por elección. Operación liderada por los socios en todos los pilares, sin capas de account manager entre tú y quien entrega.',
      items: [
        { n: '3',     l: 'Pilares integrados — CRM, datos e IA' },
        { n: '2026',  l: 'Salesforce Partner activo' },
        { n: '100%',  l: 'Cuentas lideradas por socio' },
        { n: '<10',   l: 'Clientes estratégicos a la vez' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Estrategia, práctica y crítica.',
      lead: 'CRM, datos e IA — ensayos y análisis para quien decide. Contenido técnico, sin clichés.',
      read: 'Leer →', all: 'Ver todos los textos', date: 'Pronto', filterAll: 'Todos',
    },
    contact: {
      eyebrow: 'Contacto', title: 'Conversación directa con un socio.',
      lead: 'Envía una línea sobre el problema. Respondemos en 1 día hábil. Sin formulario-cola, sin SDR, sin agenda fantasma.',
      name: 'Nombre', email: 'E-mail corporativo', company: 'Empresa', msg: '¿Sobre qué conversamos?',
      msgPh: 'Ej.: estamos implementando Data Cloud y queremos evaluar una sociedad.',
      submit: 'Enviar mensaje', sent: 'Enviado — pronto respondemos',
      reply: 'Respondemos personalmente en hasta 1 día hábil.',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Boutique de CRM, datos e IA. Conocimiento aplicado, como servicio.',
      pillarsTitle: 'Pilares', empresaTitle: 'Empresa', contactTitle: 'Contacto',
      rights: '© 2026 Kliente 360. Todos los derechos reservados.',
    },
  },
};

const SUPPORTED = ['pt', 'en', 'es'];
const HTML_LANG = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
const PILLAR_LABELS = {
  pt: { sf: 'Pilar 01 · Salesforce',     data: 'Pilar 02 · Data',     ai: 'Pilar 03 · IA' },
  en: { sf: 'Practice 01 · Salesforce',  data: 'Practice 02 · Data',  ai: 'Practice 03 · AI' },
  es: { sf: 'Pilar 01 · Salesforce',     data: 'Pilar 02 · Data',     ai: 'Pilar 03 · IA' },
};

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

// Detecta idioma de uma página de blog pelo prefixo da URL.
// /blog/en/...  → en | /blog/es/... → es | /blog/... → pt | (outras URLs) → null
const langFromUrl = () => {
  const m = location.pathname.match(/^\/blog\/(en|es)\//);
  if (m) return m[1];
  if (location.pathname.startsWith('/blog/')) return 'pt';
  return null;
};

const detect = () => {
  // URL é a fonte de verdade em páginas de blog.
  const urlLang = langFromUrl();
  if (urlLang) return urlLang;

  const qs = new URLSearchParams(location.search).get('lang');
  if (qs && SUPPORTED.includes(qs)) return qs;

  const stored = localStorage.getItem('k360.lang');
  if (stored && SUPPORTED.includes(stored)) return stored;

  const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : 'pt';
};

const apply = (lang) => {
  const dict = DICT[lang];
  if (!dict) return;
  document.documentElement.lang = HTML_LANG[lang] || 'pt-BR';
  localStorage.setItem('k360.lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = get(dict, key);
    if (typeof val === 'string') el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (!attr || !key) return;
      const val = get(dict, key);
      if (typeof val === 'string') el.setAttribute(attr, val);
    });
  });

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
  });

  renderHomeBlogTeaser(lang);
};

// Teaser de blog na home — renderiza os 3 posts mais recentes, troca conforme idioma.
let _postsManifest = null;
const ensureManifest = async () => {
  if (_postsManifest) return _postsManifest;
  try {
    const res = await fetch('/assets/data/posts.json');
    _postsManifest = await res.json();
  } catch { _postsManifest = []; }
  return _postsManifest;
};

const READ_LABELS = { pt: 'Ler →', en: 'Read →', es: 'Leer →' };

const renderHomeBlogTeaser = async (lang) => {
  const grid = document.getElementById('home-blog-grid');
  if (!grid) return;
  const manifest = await ensureManifest();

  // Top 3 mais recentes (manifest já vem ordenado pelo build)
  const latest = manifest.slice(0, 3);

  grid.innerHTML = latest.map(post => {
    const tr = post.translations[lang] || post.translations.pt;
    const pillarLbl = PILLAR_LABELS[lang][post.pillar];
    return `
      <a class="post-card" data-pillar="${post.pillar}" data-post-slug="${post.slug}" href="${tr.url}">
        <div class="post-meta">
          <span class="pill-pillar">${pillarLbl}</span>
          <span class="post-date">${tr.date}</span>
        </div>
        <h3>${tr.title}</h3>
        <div class="read">${READ_LABELS[lang] || READ_LABELS.pt}</div>
      </a>`;
  }).join('');
};

document.addEventListener('DOMContentLoaded', () => {
  const initial = detect();
  apply(initial);

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      // Em páginas de blog: SÓ redireciona, sem aplicar antes (evita flash).
      const path = location.pathname;
      const isBlog = path.startsWith('/blog/');
      if (isBlog) {
        const m = path.match(/^\/blog\/(en|es)\/(.*)$/);
        const rest = m ? m[2] : path.slice('/blog/'.length);
        const newPath = lang === 'pt' ? `/blog/${rest}` : `/blog/${lang}/${rest}`;
        if (newPath !== path) {
          localStorage.setItem('k360.lang', lang);
          location.href = newPath;
          return;
        }
      }
      apply(lang);
    });
  });
});
