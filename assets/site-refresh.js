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

  const adaptiveHeader = document.getElementById('header');
  if (adaptiveHeader) {
    let headerToneFrame = 0;
    const syncHeaderTone = () => {
      headerToneFrame = 0;
      const sampleY = Math.min(Math.max(1, adaptiveHeader.getBoundingClientRect().height * .5), innerHeight - 1);
      const section = [...document.querySelectorAll('[data-theme]')].find(node => {
        const rect = node.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom > sampleY;
      });
      adaptiveHeader.classList.toggle('header-on-dark', section?.dataset.theme === 'dark');
    };
    const queueHeaderTone = () => {
      if (!headerToneFrame) headerToneFrame = requestAnimationFrame(syncHeaderTone);
    };
    syncHeaderTone();
    addEventListener('scroll', queueHeaderTone, { passive: true });
    addEventListener('resize', queueHeaderTone, { passive: true });
    new MutationObserver(queueHeaderTone).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  const homeWorks = document.querySelector('main > .works-section');
  if (homeWorks && !document.body.classList.contains('home-modern-v3') && !document.querySelector('.studio-intro')) {
    const isEnglish = document.documentElement.lang === 'en';
    const pricingHref = isEnglish ? '/en/pricing/' : '/pricing/';
    const worksHref = isEnglish ? '/en/works/' : '/works/';
    const copy = isEnglish ? {
      worksEyebrow: 'Selected work',
      worksTitle: 'Visual systems built around a real task',
      introEyebrow: 'NEWERZI / approach',
      introTitle: 'Design that connects <span>brand character</span> with digital experience',
      introText: 'We bring identity, interfaces and communication into one visual language — so the project looks consistent and remains recognisable at every touchpoint.',
      introLink: 'Explore services',
      principlesEyebrow: 'Why NEWERZI',
      principlesTitle: 'Clear reasoning behind every visual decision',
      principles: [
        ['01', 'The task comes before the style', 'We start with context, audience and the role design must play. The visual direction grows from the project rather than from a generic template.'],
        ['02', 'One system across every medium', 'Identity, web pages, social media and motion are designed as connected parts, not as unrelated deliverables.'],
        ['03', 'A process without fog', 'We agree on the scope and direction, show intermediate decisions and keep the next step visible throughout the project.']
      ],
      processEyebrow: 'Working process',
      processTitle: 'From context to a system ready to evolve',
      processText: 'A compact sequence with clear checkpoints. The exact scope adapts to the task while the logic remains predictable.',
      processSteps: [
        ['01', 'Context and goal', 'We clarify the product, audience, constraints and the result the design should support.'],
        ['02', 'Concept and system', 'We define the visual direction, typography, colour and the principles that hold the project together.'],
        ['03', 'Design and adaptation', 'We develop key layouts and extend the system to the required screens, formats and states.'],
        ['04', 'Handoff and growth', 'We prepare materials for use and leave the visual system understandable for future development.']
      ],
      archiveLink: 'View all work'
    } : {
      worksEyebrow: 'Избранные работы',
      worksTitle: 'Визуальные системы, собранные вокруг реальной задачи',
      introEyebrow: 'NEWERZI / подход',
      introTitle: 'Дизайн, который связывает <span>характер бренда</span> и цифровой опыт',
      introText: 'Объединяем айдентику, интерфейсы и коммуникацию в один визуальный язык — чтобы проект выглядел цельно и оставался узнаваемым в каждой точке контакта.',
      introLink: 'Посмотреть услуги',
      principlesEyebrow: 'Почему NEWERZI',
      principlesTitle: 'За каждым визуальным решением стоит понятная логика',
      principles: [
        ['01', 'Сначала задача, потом стиль', 'Начинаем с контекста, аудитории и роли дизайна. Визуальное направление рождается из проекта, а не из универсального шаблона.'],
        ['02', 'Одна система на всех носителях', 'Айдентика, веб, социальные сети и моушн проектируются как связанные части, а не как набор отдельных макетов.'],
        ['03', 'Процесс без тумана', 'Фиксируем объём и направление, показываем промежуточные решения и на каждом этапе сохраняем понятный следующий шаг.']
      ],
      processEyebrow: 'Процесс работы',
      processTitle: 'От контекста до системы, готовой развиваться',
      processText: 'Компактная последовательность с понятными точками контроля. Состав этапов меняется под задачу, но логика остаётся предсказуемой.',
      processSteps: [
        ['01', 'Контекст и цель', 'Уточняем продукт, аудиторию, ограничения и результат, который должен поддержать дизайн.'],
        ['02', 'Концепция и система', 'Определяем визуальное направление, типографику, цвет и принципы, которые связывают проект.'],
        ['03', 'Дизайн и адаптация', 'Разрабатываем ключевые макеты и переносим систему на нужные экраны, форматы и состояния.'],
        ['04', 'Передача и развитие', 'Готовим материалы к использованию и оставляем визуальную систему понятной для дальнейшего роста.']
      ],
      archiveLink: 'Все работы'
    };

    homeWorks.insertAdjacentHTML('afterbegin', `
      <div class="works-heading">
        <p class="studio-eyebrow">${copy.worksEyebrow}</p>
        <h2>${copy.worksTitle}</h2>
        <a href="${worksHref}">${copy.archiveLink}<span aria-hidden="true">↗</span></a>
      </div>
    `);

    homeWorks.insertAdjacentHTML('afterend', `
      <section class="studio-intro" data-theme="dark" aria-labelledby="studio-intro-title">
        <div class="studio-intro-copy">
          <p class="studio-eyebrow">${copy.introEyebrow}</p>
          <h2 id="studio-intro-title">${copy.introTitle}</h2>
          <div class="studio-intro-aside">
            <p>${copy.introText}</p>
            <a href="${pricingHref}">${copy.introLink}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="studio-visual" aria-hidden="true">
          <span class="studio-code">NWRZ / 26</span>
          <div class="studio-plane studio-plane-a"><span>identity</span></div>
          <div class="studio-plane studio-plane-b"><span>digital</span></div>
          <div class="studio-plane studio-plane-c"><span>motion</span></div>
          <strong>one system</strong>
        </div>
      </section>
      <section class="principles-section" data-theme="dark" aria-labelledby="principles-title">
        <div class="studio-section-head">
          <p class="studio-eyebrow">${copy.principlesEyebrow}</p>
          <h2 id="principles-title">${copy.principlesTitle}</h2>
        </div>
        <div class="principles-grid">
          ${copy.principles.map(([number, title, text], index) => `
            <article class="principle-card">
              <div class="principle-visual principle-visual-${index + 1}" aria-hidden="true"><i></i><i></i><i></i></div>
              <span class="principle-number">${number}</span>
              <h3>${title}</h3>
              <p>${text}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="process-section" data-theme="dark" aria-labelledby="process-title">
        <div class="process-intro">
          <p class="studio-eyebrow">${copy.processEyebrow}</p>
          <h2 id="process-title">${copy.processTitle}</h2>
          <p>${copy.processText}</p>
        </div>
        <ol class="process-list">
          ${copy.processSteps.map(([number, title, text]) => `
            <li>
              <span>${number}</span>
              <div><h3>${title}</h3><p>${text}</p></div>
            </li>
          `).join('')}
        </ol>
      </section>
    `);
  }

  const isRussianModernHome = document.body.classList.contains('home-modern-v3')
    && document.body.dataset.lang === 'ru';

  if (isRussianModernHome) {
    const worksV4 = document.querySelector('main > .works-section');
    const approachV4 = document.querySelector('.studio-intro');
    const principlesV4 = document.querySelector('.principles-section');

    if (worksV4) {
      const worksEyebrow = worksV4.querySelector('.works-heading .studio-eyebrow');
      const worksTitle = worksV4.querySelector('.works-heading h2');
      if (worksEyebrow) worksEyebrow.textContent = '01 / избранные работы';
      if (worksTitle) worksTitle.innerHTML = 'Проекты, где дизайн <span>держит задачу.</span>';
      worksV4.querySelectorAll('.project').forEach((project, index) => {
        project.dataset.v4Index = String(index + 1).padStart(2, '0');
      });

      const moreV5 = document.querySelector('.more-section-v5');
      const reviewsV5 = document.querySelector('.home-reviews-v5');
      if (moreV5 && reviewsV5) worksV4.after(moreV5, reviewsV5);
    }

    if (approachV4) {
      approachV4.classList.add('studio-intro-v4');
      approachV4.innerHTML = `
        <div class="studio-intro-v4__head">
          <p class="studio-eyebrow">02 / подход</p>
          <h2 id="studio-intro-title">Дизайн становится сильнее, когда работает <span>как система.</span></h2>
          <div class="studio-intro-v4__aside">
            <p>Не начинаем с декоративного приёма. Сначала собираем контекст, затем переводим его в понятные визуальные правила и только после — в конкретные носители.</p>
            <a href="/pricing/">Посмотреть услуги <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="approach-map-v4" aria-label="Схема подхода NEWERZI">
          <div class="approach-map-v4__bar">
            <span><i aria-hidden="true"></i> рабочая система</span>
            <span>контекст → решение → применение</span>
          </div>
          <div class="approach-map-v4__grid">
            <article>
              <span class="approach-map-v4__step">01 / вход</span>
              <h3>Понимаем задачу</h3>
              <ul><li>продукт</li><li>аудитория</li><li>ограничения</li></ul>
            </article>
            <article class="is-active">
              <span class="approach-map-v4__step">02 / система</span>
              <h3>Собираем язык</h3>
              <ul><li>идея</li><li>типографика</li><li>цвет и движение</li></ul>
            </article>
            <article>
              <span class="approach-map-v4__step">03 / выход</span>
              <h3>Применяем точно</h3>
              <ul><li>сайт</li><li>социальные сети</li><li>носители</li></ul>
            </article>
          </div>
          <div class="approach-map-v4__footer"><span>одна логика</span><span>разные точки контакта</span></div>
        </div>
      `;
    }

    if (principlesV4) {
      principlesV4.classList.add('principles-v4');
      principlesV4.innerHTML = `
        <div class="principles-v4__head">
          <p class="studio-eyebrow">03 / почему NEWERZI</p>
          <h2 id="principles-title">Меньше случайных решений.<br>Больше связности.</h2>
        </div>
        <div class="principles-v4__list">
          <article>
            <span>01</span>
            <h3>Задача задаёт форму</h3>
            <p>Визуальное направление рождается из продукта, аудитории и контекста — не из готового стилистического шаблона.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Решение работает системой</h3>
            <p>Айдентика, интерфейс, социальные сети и моушн проектируются как связанные части одного языка.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Процесс остаётся понятным</h3>
            <p>Фиксируем направление, показываем промежуточные решения и сохраняем ясный следующий шаг на каждом этапе.</p>
          </article>
        </div>
      `;
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

(() => {
  if (!document.body?.classList.contains('home-modern-v3')) return;
  const onlineScript = document.createElement('script');
  onlineScript.src = '/assets/site-online.js?v=20261122-3';
  onlineScript.defer = true;
  document.head.append(onlineScript);
})();

(() => {
  const home = document.body;
  if (!home?.classList.contains('home-modern-v3')) return;

  const isEnglish = home.dataset.lang === 'en';
  const reviewCarousel = document.querySelector('.home-reviews-v5');
  if (reviewCarousel) {
    const track = reviewCarousel.querySelector('.home-reviews-v5__track');
    const reviews = [...reviewCarousel.querySelectorAll('[data-review-slide]')];
    const previous = reviewCarousel.querySelector('[data-review-prev]');
    const next = reviewCarousel.querySelector('[data-review-next]');
    const status = reviewCarousel.querySelector('[data-review-status]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let position = 1;
    let moving = false;
    let fallback;

    // Identical end cards keep the transition seamless in either direction.
    if (track && reviews.length > 1) {
      track.prepend(reviews.at(-1).cloneNode(true));
      track.append(reviews[0].cloneNode(true));
    }
    const slides = [...(track?.querySelectorAll('[data-review-slide]') || [])];

    const render = (announce = true) => {
      track?.style.setProperty('--review-index', String(position));
      slides.forEach((slide, index) => {
        slide.toggleAttribute('inert', index !== position);
        slide.setAttribute('aria-hidden', String(index !== position));
      });
      if (announce && status) {
        const number = ((position - 1 + reviews.length) % reviews.length) + 1;
        status.textContent = `${isEnglish ? 'Review' : 'Отзыв'} ${number} / ${reviews.length}`;
      }
    };

    const finishMove = () => {
      clearTimeout(fallback);
      if (position === 0 || position === reviews.length + 1) {
        track.style.transition = 'none';
        position = position === 0 ? reviews.length : 1;
        render(false);
        void track.offsetWidth;
        track.style.transition = '';
      }
      moving = false;
    };

    const move = direction => {
      if (moving || reviews.length < 2) return;
      moving = true;
      position += direction;
      render();
      if (reducedMotion.matches) requestAnimationFrame(finishMove);
      else fallback = setTimeout(finishMove, 560);
    };

    track?.addEventListener('transitionend', event => {
      if (event.target === track && event.propertyName === 'transform') finishMove();
    });
    previous?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    track.style.transition = 'none';
    render(false);
    requestAnimationFrame(() => { track.style.transition = ''; });
  }

  const reviewToggle = document.querySelector('[data-review-toggle]');
  const extraReviews = [...document.querySelectorAll('[data-extra-review]')];

  reviewToggle?.addEventListener('click', () => {
    const expanded = reviewToggle.getAttribute('aria-expanded') === 'true';
    extraReviews.forEach((review) => {
      review.hidden = expanded;
    });
    reviewToggle.setAttribute('aria-expanded', String(!expanded));
    reviewToggle.innerHTML = expanded
      ? `${isEnglish ? 'show more' : 'показать ещё'} <span>+2</span>`
      : `${isEnglish ? 'show less' : 'свернуть'} <span>−</span>`;
  });

  const briefMessages = isEnglish
    ? {
        identity: 'I’d like to discuss an identity and understand the best place to start.',
        web: 'I’d like to discuss a website: its structure, visual direction and launch scope.',
        social: 'I’d like to build a consistent visual system for social media.',
        motion: 'I’d like to discuss a motion piece and choose the right format for the task.',
      }
    : {
        identity: 'Хочу обсудить айдентику и понять, с чего лучше начать.',
        web: 'Хочу обсудить сайт: его структуру, визуальное направление и объём запуска.',
        social: 'Хочу собрать цельную визуальную систему для социальных сетей.',
        motion: 'Хочу обсудить моушн-задачу и подобрать подходящий формат.',
      };

  const briefMessage = document.querySelector('[data-brief-message]');
  document.querySelectorAll('[data-brief-option]').forEach((option) => {
    option.addEventListener('click', () => {
      document.querySelectorAll('[data-brief-option]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button === option));
      });
      if (briefMessage) briefMessage.textContent = briefMessages[option.dataset.briefOption] || '';
    });
  });

  document.querySelector('[data-back-to-top]')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();

(() => {
  const portal = document.querySelector('.footer-portal');
  const orbit = document.querySelector('.footer-orbit');
  if (!portal || !orbit || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frame = 0;
  const update = event => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = portal.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      portal.style.setProperty('--portal-x', `${(x * 100).toFixed(2)}%`);
      portal.style.setProperty('--portal-y', `${(y * 100).toFixed(2)}%`);
      orbit.style.setProperty('--orbit-x', `${((x - .5) * 18).toFixed(2)}px`);
      orbit.style.setProperty('--orbit-y', `${((y - .5) * 18).toFixed(2)}px`);
      frame = 0;
    });
  };

  portal.addEventListener('pointermove', update, { passive: true });
  portal.addEventListener('pointerleave', () => {
    portal.style.setProperty('--portal-x', '73%');
    portal.style.setProperty('--portal-y', '43%');
    orbit.style.setProperty('--orbit-x', '0px');
    orbit.style.setProperty('--orbit-y', '0px');
  });
})();
