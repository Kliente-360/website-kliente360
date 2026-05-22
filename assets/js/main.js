// Kliente 360 — main script
// Mobile nav, idioma (stub), form simples.

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

  // -------- Idioma (stub, sem swap real ainda) --------
  document.querySelectorAll('.lang-switch button, .lang-mobile button').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.parentElement;
      group.querySelectorAll('button').forEach(b => b.removeAttribute('aria-current'));
      btn.setAttribute('aria-current', 'true');
      // TODO: integrar swap PT/EN/ES via data-i18n quando dicionários existirem.
    });
  });

  // -------- Form (impede submit, mostra estado) --------
  const form = document.querySelector('form.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit');
      const original = btn.textContent;
      btn.textContent = 'Enviado — em breve respondemos';
      btn.disabled = true;
      // TODO: integrar com endpoint (Formspree / Netlify Forms / API própria).
      setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 4000);
    });
  }
})();
