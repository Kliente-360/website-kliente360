// Kliente 360 — main script
// Mobile nav toggle + i18n stub (a expandir).

(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

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
})();
