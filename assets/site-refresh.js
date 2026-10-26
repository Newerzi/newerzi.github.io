(() => {
  'use strict';

  const headerGlass = document.getElementById('header-glass');
  if (headerGlass && !headerGlass.querySelector('.header-glass-layer')) {
    const steps = 16;
    const strength = 13;
    const stepSize = 100 / steps;

    for (let index = 0; index < steps; index += 1) {
      const layer = document.createElement('span');
      const bandStart = index * stepSize;
      const bandEnd = (index + 1) * stepSize;
      const fadeStart = Math.max(0, bandStart - stepSize);
      const fadeEnd = Math.min(100, bandEnd + stepSize);

      layer.className = 'header-glass-layer';
      layer.style.setProperty('--glass-blur', `${strength / (2 ** index)}px`);
      layer.style.setProperty('--glass-mask-a', `${fadeStart}%`);
      layer.style.setProperty('--glass-mask-b', `${bandStart}%`);
      layer.style.setProperty('--glass-mask-c', `${bandEnd}%`);
      layer.style.setProperty('--glass-mask-d', `${fadeEnd}%`);
      headerGlass.append(layer);
    }
  }

  const statusNote = document.createElement('div');
  statusNote.className = 'site-status-note';
  statusNote.setAttribute('role', 'status');
  statusNote.textContent = document.documentElement.lang === 'en'
    ? 'The site is being refined — small changes may appear.'
    : 'Сайт обновляется — возможны небольшие изменения.';
  document.body.append(statusNote);
  requestAnimationFrame(() => statusNote.classList.add('is-visible'));
  setTimeout(() => statusNote.classList.remove('is-visible'), 4600);
  setTimeout(() => statusNote.remove(), 5000);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const selector = [
    'main h1', 'main h2', 'main h3', 'main .eyebrow', 'main .body-copy',
    'main .project-sector', 'main .project-tags', 'main .metric',
    'main blockquote', 'main .pricing-copy', 'main .pricing-options', 'main .pricing-meta',
    'footer h2', 'footer .footer-nav', 'footer .footer-contact-actions',
    'footer .footer-bottom'
  ].join(',');
  const elements = [...document.querySelectorAll(selector)].filter(element =>
    !element.closest('.header, .drawer, .cookie-notice')
  );
  if (!elements.length) return;

  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('blur-pending');
      entry.target.classList.add('blur-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px' });

  elements.forEach(element => {
    element.classList.add('blur-reveal', 'blur-pending');
    observer.observe(element);
  });
})();
