(() => {
  'use strict';

  const headerGlass = document.getElementById('header-glass');
  if (headerGlass) {
    const renderHeaderGlass = () => {
      headerGlass.replaceChildren();

      const headerHeight = Math.max(72, document.getElementById('header')?.getBoundingClientRect().height || 0);
      const fadeEnd = headerHeight + 24;
      headerGlass.style.setProperty('--glass-tint-mid', `${headerHeight * .58}px`);
      headerGlass.style.setProperty('--glass-fade-end', `${fadeEnd}px`);
      const layers = [
        {
          blur: 9.4,
          mask: `linear-gradient(to bottom, #000 0, rgb(0 0 0 / .82) ${headerHeight * .42}px, rgb(0 0 0 / .28) ${headerHeight * .78}px, transparent ${fadeEnd}px, transparent 100%)`
        },
        {
          blur: 35,
          mask: `linear-gradient(to bottom, #000 0, rgb(0 0 0 / .9) ${headerHeight * .18}px, rgb(0 0 0 / .48) ${headerHeight * .5}px, rgb(0 0 0 / .12) ${headerHeight * .84}px, transparent ${fadeEnd}px, transparent 100%)`
        }
      ];

      layers.forEach(({ blur, mask }, index) => {
        const layer = document.createElement('span');
        layer.className = 'header-glass-layer';
        layer.style.zIndex = index + 1;
        layer.style.setProperty('--glass-blur', `${blur}px`);
        layer.style.setProperty('--glass-mask', mask);
        headerGlass.append(layer);
      });
    };

    renderHeaderGlass();
    let glassResizeFrame = 0;
    addEventListener('resize', () => {
      cancelAnimationFrame(glassResizeFrame);
      glassResizeFrame = requestAnimationFrame(renderHeaderGlass);
    }, { passive: true });
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
