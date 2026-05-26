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
      pillars: 'Pilares', trilha: 'Trilha 360', howWeWork: 'Como trabalhamos', cases: 'Cases', blog: 'Blog', contact: 'Contato',
      cta: 'Falar com um sócio', menu: 'Abrir menu',
      mobile: { pillars: 'Pilares', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada',
                empresa: 'Empresa', trilha: 'Trilha 360', cases: 'Cases', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Conhecimento aplicado,', title2: 'como serviço',
      sub: 'Consultoria especializada em CRM com Salesforce, Dados e IA — três pilares como uma prática única. Carteira com poucos clientes estratégicos, atendidos diretamente por quem entrega.',
      cta1: 'Falar com um sócio', cta2: 'Conhecer a Trilha 360',
    },
    pillars: {
      eyebrow: 'Portfólio',
      title: 'Três pilares. Uma prática única.',
      lead: 'Nenhuma consultoria especializada do Brasil entrega os três como uma só disciplina. CRM sem dado é cego. Dados sem ativação é desperdício. IA sem operação é demo. Operamos os três como uma engrenagem.',
      more: 'Ver o pilar',
      sf: { num: '01 · Pilar', t: 'Salesforce', d: 'Core CRM. Da implementação à evolução com agentes, sem terceirizar a estratégia.' },
      data: { num: '02 · Pilar', t: 'Data & Analytics', d: 'Do dado bruto à decisão. Stack moderna, agnóstica, escolhida pelo cenário.' },
      ai: { num: '03 · Pilar', t: 'IA Aplicada', d: 'Agentes de IA sob medida e produtos SaaS verticais. Discovery rápido, entrega em ciclos curtos.' },
    },
    pillarDeep: {
      cta: 'Falar com um sócio', link: 'Como entregamos',
      sf:   { eyebrow: 'Pilar 01', title: 'Salesforce — do desenho à operação escalável.', lead: 'Sales, Service, Data Cloud e Agentforce. Implementação com cabeça de negócio; evolução com agentes onde dado e processo já sustentam.' },
      data: { eyebrow: 'Pilar 02', title: 'Data & Analytics — do dado bruto à decisão.', lead: 'Engenharia de dados moderna, modelos preditivos e visualização. Agnóstico de stack, com prática certificada na camada de consumo — escolha guiada pelo cenário.' },
      ai:   { eyebrow: 'Pilar 03', titleLead: 'IA Aplicada — do', titleMid: 'problema', titleConn: 'ao', titleEnd: 'agente', titleTail: '.',
              lead: 'Agentes de IA sob medida e produtos SaaS verticais. Validação rápida: do diagnóstico ao primeiro modelo em produção.' },
    },
    trilha: {
      eyebrow: 'Metodologia', title: 'Trilha 360.',
      lead: 'Metodologia híbrida entre consultoria estratégica, projeto de tecnologia e deploy rápido de IA. Mesmo método nos três pilares.',
      steps: [
        { v: 'Mapear',     d: 'Negócio, dados e processos. O cenário real, sem suposição.' },
        { v: 'Prototipar', d: 'Primeiro corte funcional. Baixo compromisso, alto aprendizado.' },
        { v: 'Validar',    d: 'Prova de valor com KPI claro. Mata ou avança.' },
        { v: 'Implantar',  d: 'Engenharia robusta, produção, integração.' },
        { v: 'Sustentar',  d: 'Evolução contínua, suporte ativo, agentes vivos.' },
      ],
    },
    cases: {
      eyebrow: 'Quem confia', title: 'Clientes estratégicos. Resultado mensurável.',
      lead: 'Carteira enxuta por escolha. Cada conta lidera-se por um sócio. Métricas exatas atualizadas a cada projeto encerrado.',
      placeholder: 'métrica a publicar com aprovação do cliente',
    },
    trust: {
      eyebrow: 'Por que a Kliente 360', title: 'Parceria Salesforce, time enxuto, conversa direta.',
      lead: 'Especialização por escolha. Operação liderada pelos sócios em todos os pilares, sem camadas de account manager entre você e quem entrega.',
      items: [
        { n: '20+',   l: 'Anos de mercado dos sócios' },
        { n: '100+',  l: 'Projetos implementados com sucesso' },
        { n: '100%',  l: 'Contas lideradas por sócio' },
        { n: '<10',   l: 'Clientes estratégicos por vez' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Análise, prática, opinião.',
      lead: 'Textos sobre o que estamos vendo na prática em projetos de Salesforce, Dados e IA.',
      read: 'Ler →', all: 'Ver mais', date: 'Em breve', filterAll: 'Todos',
    },
    contact: {
      eyebrow: 'Contato', title: 'Conversa direta com um sócio.',
      lead: 'Mande uma mensagem sobre o que está em jogo. Em pouco tempo, um dos sócios responde diretamente — sem etapas intermediárias, sem agenda genérica.',
      name: 'Nome', email: 'E-mail corporativo', company: 'Empresa', msg: 'Sobre o que conversamos?',
      msgPh: 'Ex.: estamos implantando Data Cloud e queremos avaliar parceria.',
      submit: 'Enviar mensagem', sent: 'Enviado — em breve respondemos', error: 'Erro ao enviar — tente novamente',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Consultoria especializada em CRM com Salesforce, Dados e IA. Conhecimento aplicado, como serviço.',
      pillarsTitle: 'Pilares', empresaTitle: 'Empresa', contactTitle: 'Contato',
      rights: '© 2026 Kliente 360. Todos os direitos reservados.',
    },
  },

  en: {
    nav: {
      pillars: 'Practices', trilha: 'Method', howWeWork: 'How we work', cases: 'Cases', blog: 'Blog', contact: 'Contact',
      cta: 'Talk to a partner', menu: 'Open menu',
      mobile: { pillars: 'Practices', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'Applied AI',
                empresa: 'Company', trilha: 'Method', cases: 'Cases', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Applied knowledge,', title2: 'as a service',
      sub: 'A specialist consultancy in CRM with Salesforce, Data and AI — three practices as a single discipline. A small book of strategic clients, served directly by the people who deliver.',
      cta1: 'Talk to a partner', cta2: 'Explore the Method',
    },
    pillars: {
      eyebrow: 'Portfolio',
      title: 'Three practices. One discipline.',
      lead: 'No specialist consultancy in Brazil delivers all three as one discipline. CRM without data is blind. Data without activation is waste. AI without operation is a demo. We run them as a single engine.',
      more: 'Open practice',
      sf:   { num: '01 · Practice', t: 'Salesforce', d: 'Core CRM. From implementation to agent-driven evolution, without outsourcing strategy.' },
      data: { num: '02 · Practice', t: 'Data & Analytics', d: 'From raw data to decision. Modern, stack-agnostic, chosen per scenario.' },
      ai:   { num: '03 · Practice', t: 'Applied AI', d: 'Custom AI agents and vertical SaaS products. Fast discovery, short delivery cycles.' },
    },
    pillarDeep: {
      cta: 'Talk to a partner', link: 'How we deliver',
      sf:   { eyebrow: 'Practice 01', title: 'Salesforce — from design to operation that scales.', lead: 'Sales, Service, Data Cloud and Agentforce. Implementation with business sense; agent-driven evolution where data and process already hold up.' },
      data: { eyebrow: 'Practice 02', title: 'Data & Analytics — from raw data to decision.', lead: 'Modern data engineering, predictive models and visualization. Stack-agnostic at the consumption layer — chosen per scenario.' },
      ai:   { eyebrow: 'Practice 03', titleLead: 'Applied AI — from', titleMid: 'problem', titleConn: 'to', titleEnd: 'agent', titleTail: '.',
              lead: 'Custom AI agents and vertical SaaS products. Fast validation: from discovery to first model in production.' },
    },
    trilha: {
      eyebrow: 'Method', title: 'Method 360.',
      lead: 'A hybrid methodology of strategic consulting, tech project and rapid AI deployment. Same method across all three practices.',
      steps: [
        { v: 'Map',         d: 'Business, data and process. The real scenario, no assumptions.' },
        { v: 'Prototype',   d: 'First functional cut. Low commitment, high learning.' },
        { v: 'Validate',    d: 'Proof of value with a clear KPI. Kills or advances.' },
        { v: 'Deploy',      d: 'Robust engineering, production, integration.' },
        { v: 'Sustain',     d: 'Continuous evolution, active support, living agents.' },
      ],
    },
    cases: {
      eyebrow: 'Who trusts us', title: 'Strategic clients. Measurable outcomes.',
      lead: 'A lean book of business by design. Each account led by a partner. Numbers published as each engagement closes.',
      placeholder: 'metric to be published with client approval',
    },
    trust: {
      eyebrow: 'Why Kliente 360', title: 'Salesforce partnership, lean team, direct conversation.',
      lead: 'Specialization by choice. Operation led by partners across all practices, no account-manager layer between you and the people who deliver.',
      items: [
        { n: '20+',   l: 'Years of market experience among the partners' },
        { n: '100+',  l: 'Projects delivered successfully' },
        { n: '100%',  l: 'Accounts led by a partner' },
        { n: '<10',   l: 'Strategic clients at a time' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Analysis, practice, opinion.',
      lead: 'Pieces on what we are seeing in real Salesforce, Data and AI projects.',
      read: 'Read →', all: 'See more', date: 'Coming soon', filterAll: 'All',
    },
    contact: {
      eyebrow: 'Contact', title: 'A direct conversation with a partner.',
      lead: 'Send a message about what is at stake. In short order, one of the partners replies directly — no intermediate steps, no generic calendar.',
      name: 'Name', email: 'Work email', company: 'Company', msg: 'What should we discuss?',
      msgPh: 'E.g., we are rolling out Data Cloud and want to evaluate a partnership.',
      submit: 'Send message', sent: 'Sent — we will reply shortly', error: 'Failed to send — try again',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Specialist consultancy in CRM with Salesforce, Data and AI. Applied knowledge, as a service.',
      pillarsTitle: 'Practices', empresaTitle: 'Company', contactTitle: 'Contact',
      rights: '© 2026 Kliente 360. All rights reserved.',
    },
  },

  es: {
    nav: {
      pillars: 'Pilares', trilha: 'Método', howWeWork: 'Cómo trabajamos', cases: 'Casos', blog: 'Blog', contact: 'Contacto',
      cta: 'Hablar con un socio', menu: 'Abrir menú',
      mobile: { pillars: 'Pilares', salesforce: 'Salesforce', data: 'Data & Analytics', ai: 'IA Aplicada',
                empresa: 'Empresa', trilha: 'Método', cases: 'Casos', blog: 'Blog' },
    },
    hero: {
      badge1: 'Salesforce Partner', badge2: 'Agentforce ready',
      title1: 'Conocimiento aplicado,', title2: 'como servicio',
      sub: 'Consultoría especializada en CRM con Salesforce, Datos e IA — tres pilares como una sola práctica. Cartera con pocos clientes estratégicos, atendidos directamente por quien entrega.',
      cta1: 'Hablar con un socio', cta2: 'Conocer el Método 360',
    },
    pillars: {
      eyebrow: 'Portafolio',
      title: 'Tres pilares. Una práctica única.',
      lead: 'Ninguna consultoría especializada en Brasil entrega los tres como una sola disciplina. CRM sin datos es ciego. Datos sin activación es desperdicio. IA sin operación es demo. Operamos los tres como un solo engranaje.',
      more: 'Ver el pilar',
      sf:   { num: '01 · Pilar', t: 'Salesforce', d: 'Core CRM. De la implementación a la evolución con agentes, sin tercerizar la estrategia.' },
      data: { num: '02 · Pilar', t: 'Data & Analytics', d: 'Del dato bruto a la decisión. Stack moderna, agnóstica, elegida según el escenario.' },
      ai:   { num: '03 · Pilar', t: 'IA Aplicada', d: 'Agentes de IA a medida y productos SaaS verticales. Discovery rápido, entrega en ciclos cortos.' },
    },
    pillarDeep: {
      cta: 'Hablar con un socio', link: 'Cómo entregamos',
      sf:   { eyebrow: 'Pilar 01', title: 'Salesforce — del diseño a la operación escalable.', lead: 'Sales, Service, Data Cloud y Agentforce. Implementación con cabeza de negocio; evolución con agentes donde dato y proceso ya sostienen.' },
      data: { eyebrow: 'Pilar 02', title: 'Data & Analytics — del dato bruto a la decisión.', lead: 'Ingeniería de datos moderna, modelos predictivos y visualización. Agnóstico de stack en la capa de consumo — la elección la guía el escenario.' },
      ai:   { eyebrow: 'Pilar 03', titleLead: 'IA Aplicada — del', titleMid: 'problema', titleConn: 'al', titleEnd: 'agente', titleTail: '.',
              lead: 'Agentes de IA a medida y productos SaaS verticales. Validación rápida: del diagnóstico al primer modelo en producción.' },
    },
    trilha: {
      eyebrow: 'Metodología', title: 'Método 360.',
      lead: 'Metodología híbrida entre consultoría estratégica, proyecto de tecnología y deploy rápido de IA. Mismo método en los tres pilares.',
      steps: [
        { v: 'Mapear',     d: 'Negocio, datos y procesos. El escenario real, sin suposiciones.' },
        { v: 'Prototipar', d: 'Primer corte funcional. Bajo compromiso, alto aprendizaje.' },
        { v: 'Validar',    d: 'Prueba de valor con KPI claro. Mata o avanza.' },
        { v: 'Implantar',  d: 'Ingeniería robusta, producción, integración.' },
        { v: 'Sostener',   d: 'Evolución continua, soporte activo, agentes vivos.' },
      ],
    },
    cases: {
      eyebrow: 'Quién confía', title: 'Clientes estratégicos. Resultado medible.',
      lead: 'Cartera enjuta por elección. Cada cuenta liderada por un socio. Métricas exactas actualizadas en cada cierre de proyecto.',
      placeholder: 'métrica a publicar con aprobación del cliente',
    },
    trust: {
      eyebrow: 'Por qué Kliente 360', title: 'Sociedad Salesforce, equipo enjuto, conversación directa.',
      lead: 'Especialización por elección. Operación liderada por los socios en todos los pilares, sin capas de account manager entre tú y quien entrega.',
      items: [
        { n: '20+',   l: 'Años de mercado de los socios' },
        { n: '100+',  l: 'Proyectos implementados con éxito' },
        { n: '100%',  l: 'Cuentas lideradas por socio' },
        { n: '<10',   l: 'Clientes estratégicos a la vez' },
      ],
    },
    blog: {
      eyebrow: 'Blog', title: 'Análisis, práctica, opinión.',
      lead: 'Textos sobre lo que estamos viendo en proyectos reales de Salesforce, Datos e IA.',
      read: 'Leer →', all: 'Ver más', date: 'Pronto', filterAll: 'Todos',
    },
    contact: {
      eyebrow: 'Contacto', title: 'Conversación directa con un socio.',
      lead: 'Envía un mensaje sobre lo que está en juego. En poco tiempo, uno de los socios responde directamente — sin etapas intermedias, sin agenda genérica.',
      name: 'Nombre', email: 'E-mail corporativo', company: 'Empresa', msg: '¿Sobre qué conversamos?',
      msgPh: 'Ej.: estamos implementando Data Cloud y queremos evaluar una sociedad.',
      submit: 'Enviar mensaje', sent: 'Enviado — pronto respondemos', error: 'Error al enviar — vuelve a intentar',
      linkedin: 'LinkedIn — Kliente 360',
      whatsapp: 'WhatsApp — Kliente 360',
    },
    footer: {
      tagline: 'Consultoría especializada en CRM con Salesforce, Datos e IA. Conocimiento aplicado, como servicio.',
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

// Detecta idioma da URL atual.
// /blog/en/...     → en  (blog usa subpasta interna por convenção legada)
// /blog/es/...     → es
// /blog/...        → pt
// /en/...          → en  (resto do site usa prefixo top-level)
// /es/...          → es
// /(qualquer)      → null se não tem variante; pt se a rota tem variante
const langFromUrl = () => {
  const p = location.pathname;
  const blog = p.match(/^\/blog\/(en|es)\//);
  if (blog) return blog[1];
  if (p.startsWith('/blog/')) return 'pt';
  const top = p.match(/^\/(en|es)(\/|$)/);
  if (top) return top[1];
  // Para rotas que TÊM variantes em /en/ e /es/, retorna pt se URL é "raw"
  if (/^\/(pilares|como-trabalhamos|glossario)(\/|$)/.test(p)) return 'pt';
  return null;
};

// Rotas que possuem variantes EN/ES (define onde o lang switcher pode redirecionar).
const HAS_VARIANTS = (path) => {
  const normalized = path.replace(/^\/(en|es)\//, '/');
  return normalized.startsWith('/blog/')
      || normalized.startsWith('/pilares/')
      || normalized === '/como-trabalhamos/'
      || normalized === '/glossario/'
      || normalized.startsWith('/como-trabalhamos')
      || normalized.startsWith('/glossario');
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
      const path = location.pathname;

      // Rotas com variantes (blog, pilares, comercial, glossário) — redireciona sem flash.
      if (HAS_VARIANTS(path)) {
        let newPath;
        if (path.startsWith('/blog/')) {
          // Convenção legada do blog: /blog/<lang>/<rest>
          const m = path.match(/^\/blog\/(en|es)\/(.*)$/);
          const rest = m ? m[2] : path.slice('/blog/'.length);
          newPath = lang === 'pt' ? `/blog/${rest}` : `/blog/${lang}/${rest}`;
        } else {
          // Resto do site: /<lang>/<rest>
          const stripped = path.replace(/^\/(en|es)\//, '/');
          newPath = lang === 'pt' ? stripped : `/${lang}${stripped}`;
        }
        if (newPath !== path) {
          localStorage.setItem('k360.lang', lang);
          location.href = newPath;
          return;
        }
      }
      // Rotas sem variante (home, styleguide etc) — apenas troca a chrome.
      apply(lang);
    });
  });
});
