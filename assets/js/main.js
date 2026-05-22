// Kliente 360 — main script
// Mobile nav + form simples.
// (Idioma é tratado em assets/js/i18n.js)

(() => {
  // -------- Mobile nav --------
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    const close = () => {
      menu.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const open = () => {
      menu.dataset.open = 'true';
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
      menu.dataset.open === 'true' ? close() : open();
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.dataset.open === 'true') close();
    });
  }

  // -------- Blog filter (listagens /blog/, /blog/en/, /blog/es/) --------
  const filterButtons = document.querySelectorAll('.blog-filter button');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        document.querySelectorAll('.post-card').forEach(card => {
          const show = filter === 'all' || card.dataset.pillar === filter;
          card.dataset.hidden = show ? 'false' : 'true';
        });
      });
    });
  }

  // -------- Form (impede submit, mostra estado) --------
  const form = document.querySelector('form.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit');
      const original = btn.textContent;
      const sentMsg = btn.dataset.sent || 'Enviado — em breve respondemos';
      btn.textContent = sentMsg;
      btn.disabled = true;
      // TODO: integrar com endpoint (Formspree / Netlify Forms / API própria).
      setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 4000);
    });
  }
})();
