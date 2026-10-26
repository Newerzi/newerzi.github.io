(() => {
  'use strict';

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const selector = [
    'main h1', 'main h2', 'main h3', 'main .eyebrow', 'main .body-copy',
    'main .project-sector', 'main .project-tags', 'main .metric',
    'main blockquote', 'main .pricing-copy', 'main .pricing-meta',
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
