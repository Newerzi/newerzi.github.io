(() => {
  'use strict';

  const body = document.body;
  if (!body?.classList.contains('home-modern-v3') || body.dataset.lang !== 'ru') return;

  const main = document.querySelector('main');
  const works = main?.querySelector(':scope > .works-section');
  const more = main?.querySelector(':scope > .more-section-v5');
  const reviews = main?.querySelector(':scope > .home-reviews-v5');
  if (!main || !works || !more || !reviews || document.querySelector('.online-services')) return;

  const serviceData = [
    {
      key: 'branding', title: 'Брендинг', image: '/assets/service-branding.png',
      description: 'Создаём основу визуального образа бренда — от отдельного знака до цельной системы и правил её применения.',
      items: [
        ['Логотип', 'Разрабатываем основной знак и его базовые версии, чтобы бренд уверенно узнавался в цифровой среде и на физических носителях.'],
        ['Айдентика / визуальная система', 'Собираем типографику, палитру, композиционные принципы и правила работы с изображениями в единый узнаваемый язык.'],
        ['Маскот', 'Создаём персонажа с понятным характером и визуальными особенностями для коммуникации и контента.']
      ]
    },
    {
      key: 'web', title: 'Веб-дизайн', image: '/assets/service-web.png', activeImage: '/assets/service-web-active.png',
      description: 'Проектируем лендинги и многостраничные сайты: выстраиваем структуру, сценарий, интерфейс и адаптивные состояния.',
      items: [
        ['Лендинг', 'Одностраничный сайт с последовательной подачей продукта, продуманными смысловыми блоками и адаптацией под основные экраны.'],
        ['Многостраничный сайт', 'Система связанных страниц с общей логикой навигации, повторяемыми компонентами и понятной структурой контента.']
      ]
    },
    {
      key: 'social', title: 'Социальные сети', image: '/assets/service-social.png',
      description: 'Собираем узнаваемое оформление профиля и систему регулярного контента, которую удобно поддерживать и развивать.',
      items: [
        ['Оформление соцсетей', 'Формируем единый вид профиля: аватар, обложки, основные шаблоны и правила подачи визуальных материалов.'],
        ['Пост / квадрат', 'Разрабатываем отдельную публикацию под конкретную задачу с учётом существующего стиля и требований площадки.'],
        ['5 постов в одной системе', 'Создаём серию взаимосвязанных публикаций, которые сохраняют общий ритм, композицию и узнаваемость.']
      ]
    },
    {
      key: 'print', title: 'Печать и реклама', image: '/assets/service-print.png',
      description: 'Готовим рекламные, печатные и сувенирные материалы с учётом формата, носителя и технических требований производства.',
      items: [
        ['Баннер', 'Собираем рекламную композицию с ясной иерархией и адаптируем её под нужный размер и площадку размещения.'],
        ['Ролл-ап', 'Проектируем вертикальный выставочный макет, который быстро считывается с расстояния и готов к печати.'],
        ['Бейдж', 'Оформляем персональную карточку участника или сотрудника с учётом переменных данных и способа печати.'],
        ['Сертификат / диплом', 'Создаём аккуратный официальный макет и подготавливаем файл для печати или цифровой выдачи.'],
        ['Стикер', 'Разрабатываем отдельную графику для наклейки с учётом формы, контура реза и масштаба.'],
        ['Стикерпак 6–8 шт.', 'Собираем серию тематически связанных стикеров в единой стилистике.'],
        ['Сувенирная продукция', 'Адаптируем графику под выбранный готовый носитель и требования производства.'],
        ['Обложка блокнота', 'Разрабатываем лицевую и оборотную стороны обложки и подготавливаем их к печати.'],
        ['Блокнот с внутренними страницами', 'Оформляем обложку и систему внутренних страниц как единый печатный продукт.'],
        ['Векторизация', 'Аккуратно переводим растровые изображения или объекты в масштабируемую векторную графику.']
      ]
    },
    {
      key: 'events', title: 'Мероприятия', event: true,
      description: 'Создаём визуальную систему события и адаптируем её под необходимые носители, навигацию, коммуникацию и тираж.',
      items: [
        ['Персонализация большого тиража', 'Подготавливаем серию макетов с переменными именами, номерами или другими данными без потери единого стиля.'],
        ['Небольшое мероприятие', 'Формируем базовый образ события и комплект основных носителей для анонса и проведения.'],
        ['Большое мероприятие', 'Разрабатываем расширенную систему для сцены, навигации, социальных сетей, раздаточных и печатных материалов.']
      ]
    },
    {
      key: 'motion', title: 'Моушн-дизайн', image: '/assets/service-motion.png',
      description: 'Добавляем движение в рекламные материалы и визуальную коммуникацию, сохраняя характер и правила проекта.',
      items: [
        ['Короткий рекламный креатив', 'Создаём компактную анимацию для объявления, публикации или digital-размещения с быстрым и понятным сообщением.'],
        ['Анимационный монтаж', 'Собираем ролик из исходных материалов, добавляем титры, переходы и графические акценты.']
      ]
    }
  ];

  const eventVisual = `
    <span class="online-service-event" aria-hidden="true">
      <img class="ground" src="/assets/service-event-ground.svg" alt="">
      <img class="banner" src="/assets/service-event-banner.svg" alt="">
      <img class="flag-left" src="/assets/service-event-flag-left.svg" alt="">
      <img class="flag-right" src="/assets/service-event-flag-right.svg" alt="">
    </span>`;

  const services = document.createElement('section');
  services.className = 'online-section online-services';
  services.id = 'services';
  services.dataset.theme = 'dark';
  services.setAttribute('aria-labelledby', 'online-services-title');
  services.innerHTML = `
    <h2 class="online-section-title online-reveal" id="online-services-title">Список услуг</h2>
    <div class="online-services-grid">
      ${serviceData.map((service, index) => `
        <button class="online-service-card" type="button" data-service-key="${service.key}" aria-haspopup="dialog">
          <span class="online-service-visual">
            ${service.event ? eventVisual : `<img class="${service.activeImage ? 'online-service-web-base' : ''}" src="${service.image}" alt="" width="1357" height="905" loading="lazy" decoding="async">`}
            ${service.activeImage ? `<img class="online-service-web-active" src="${service.activeImage}" alt="" width="1357" height="905" loading="lazy" decoding="async">` : ''}
          </span>
          <span class="online-service-meta">
            <span>${service.title}</span>
            <span class="online-service-more">подробнее <img src="/assets/project-arrow-figma.svg" alt="" width="17" height="17"></span>
          </span>
        </button>
      `).join('')}
    </div>`;

  const studio = document.createElement('section');
  studio.className = 'online-section online-studio';
  studio.id = 'about';
  studio.dataset.theme = 'dark';
  studio.innerHTML = `
    <div class="online-studio-intro online-reveal">
      <p class="online-kicker">NEWERZI / о студии</p>
      <h2>Визуал собирает проект в одно целое.</h2>
      <p>NEWERZI — независимая студия визуальных систем. Мы помогаем проектам последовательно выглядеть и говорить с аудиторией: от первого образа и айдентики до сайта, социальных сетей, рекламы и движения.</p>
    </div>
    <div class="online-studio-list">
      <article class="online-studio-item online-reveal"><span>01</span><div><h3>Сначала — смысл</h3><p>Разбираемся, что проект предлагает, кому он нужен и какое впечатление должен оставить. Визуальное направление появляется из задачи, а не из случайного тренда.</p></div></article>
      <article class="online-studio-item online-reveal"><span>02</span><div><h3>Один узнаваемый язык</h3><p>Соединяем типографику, цвет, композицию, изображения и движение так, чтобы проект одинаково уверенно выглядел на разных носителях.</p></div></article>
      <article class="online-studio-item online-reveal"><span>03</span><div><h3>Не отдельный макет, а система</h3><p>Продумываем правила и состояния заранее. Благодаря этому дизайн можно развивать и переносить на новые форматы без потери характера.</p></div></article>
      <article class="online-studio-item online-reveal"><span>04</span><div><h3>Понятный процесс</h3><p>Показываем логику решений и фиксируем согласованное направление. На каждом этапе понятно, что уже готово и что происходит дальше.</p></div></article>
      <article class="online-studio-item online-reveal"><span>05</span><div><h3>Материалы для реальной работы</h3><p>Передаём готовые файлы и правила использования, чтобы результат работал после запуска, а не оставался только красивой презентацией.</p></div></article>
    </div>`;

  const process = document.createElement('section');
  process.className = 'online-section online-process';
  process.id = 'approach';
  process.dataset.theme = 'dark';
  process.innerHTML = `
    <div class="online-process-head online-reveal"><p class="online-kicker">04 / подход и этапы</p><h2>От задачи к системе, готовой работать и развиваться.</h2></div>
    <div class="online-process-list">
      <article class="online-process-step online-reveal"><span>01</span><div><h3>Знакомство</h3><p>Обсуждаем продукт, аудиторию, задачу, ограничения и ожидаемый результат.</p><small>Результат: понятный состав проекта</small></div></article>
      <article class="online-process-step online-reveal"><span>02</span><div><h3>Исследование</h3><p>Собираем контекст, смотрим на категорию и определяем, что поможет проекту отличаться.</p><small>Результат: визуальные ориентиры</small></div></article>
      <article class="online-process-step online-reveal"><span>03</span><div><h3>Направление</h3><p>Предлагаем образ, типографику, цвет и основные принципы подачи материалов.</p><small>Результат: выбранная концепция</small></div></article>
      <article class="online-process-step online-reveal"><span>04</span><div><h3>Разработка</h3><p>Собираем ключевые макеты, состояния и адаптации для согласованных носителей.</p><small>Результат: рабочая дизайн-система</small></div></article>
      <article class="online-process-step online-reveal"><span>05</span><div><h3>Передача</h3><p>Подготавливаем материалы, структуру файлов и правила, необходимые для дальнейшей работы.</p><small>Результат: готовый комплект</small></div></article>
    </div>`;

  const faq = document.createElement('section');
  faq.className = 'online-section online-faq';
  faq.id = 'faq';
  faq.dataset.theme = 'dark';
  faq.innerHTML = `
    <div class="online-faq-head online-reveal"><p class="online-kicker">06 / FAQ</p><h2>Коротко о том, что обычно важно до старта.</h2></div>
    <div class="online-faq-list">
      <div class="online-faq-item online-reveal"><button class="online-faq-question" type="button" aria-expanded="false">С чего начинается работа?<span aria-hidden="true">+</span></button><div class="online-faq-answer"><div><p>С короткого разговора о проекте, задаче и том, какой результат должен дать дизайн. После этого уточняются состав, сроки и формат работы.</p></div></div></div>
      <div class="online-faq-item online-reveal"><button class="online-faq-question" type="button" aria-expanded="false">Можно начать, если нет точного ТЗ?<span aria-hidden="true">+</span></button><div class="online-faq-answer"><div><p>Да. Достаточно описать проект своими словами. Уточняющие вопросы помогут собрать исходную информацию в понятный рабочий бриф.</p></div></div></div>
      <div class="online-faq-item online-reveal"><button class="online-faq-question" type="button" aria-expanded="false">Сколько вариантов и правок входит?<span aria-hidden="true">+</span></button><div class="online-faq-answer"><div><p>Количество подходов зависит от задачи и фиксируется до старта. Правки обсуждаются по выбранному направлению и помогают довести решение до нужного результата.</p></div></div></div>
      <div class="online-faq-item online-reveal"><button class="online-faq-question" type="button" aria-expanded="false">Можно ли разбить проект на этапы?<span aria-hidden="true">+</span></button><div class="online-faq-answer"><div><p>Да, если такой порядок не мешает целостности решения. Этапы, материалы и точки согласования определяются индивидуально.</p></div></div></div>
    </div>`;

  const briefServices = [
    ['branding', 'Брендинг'], ['web', 'Веб-дизайн'], ['social', 'Соцсети'], ['other', 'Другое'],
    ['print', 'Печать и реклама'], ['events', 'Мероприятия'], ['motion', 'Моушн-дизайн']
  ];

  const brief = document.createElement('section');
  brief.className = 'online-section online-brief';
  brief.id = 'brief';
  brief.dataset.theme = 'dark';
  brief.innerHTML = `
    <h2 class="online-reveal">Готовы к преображению?</h2>
    <div class="online-brief-grid">
      <div class="online-brief-main">
        <p class="online-brief-label">Что нужно сделать? <small>Можно выбрать несколько</small></p>
        <div class="online-service-options">
          ${briefServices.map(([key, label]) => `<button class="online-option" type="button" data-brief-service="${key}" aria-pressed="false">${label}</button>`).join('')}
        </div>
        <label class="online-brief-label" for="online-project-text">Расскажите о проекте</label>
        <div class="online-textarea-wrap">
          <textarea class="online-project-text" id="online-project-text" maxlength="500" placeholder="Чем занимаетесь, какую задачу хотите решить?"></textarea>
          <span class="online-counter">0/500</span>
        </div>
        <button class="online-details-toggle" type="button" aria-expanded="false" aria-controls="online-details">
          <img src="/assets/form-details-figma.svg" alt="" width="59" height="59"> Уточнить детали <span class="online-details-arrow" aria-hidden="true"></span>
        </button>
        <div class="online-details" id="online-details"><div>
          <p class="online-brief-label">На какой бюджет рассчитываете? <small>Необязательно</small></p>
          <div class="online-budget-wrap"><input class="online-budget-input" inputmode="numeric" maxlength="12" placeholder="Например, 5.000" aria-label="Бюджет"></div>
          <p class="online-brief-label" style="margin-top:32px">Когда нужен результат? <small>Необязательно</small></p>
          <div class="online-deadline-options">
            <button class="online-option online-deadline" type="button" data-deadline="1–3 дня" aria-pressed="false">1–3 дня</button>
            <button class="online-option online-deadline" type="button" data-deadline="1–2 недели" aria-pressed="false">1–2 недели</button>
            <button class="online-option online-deadline" type="button" data-deadline="1 месяц" aria-pressed="false">1 месяц</button>
            <button class="online-option online-deadline" type="button" data-deadline="date" aria-pressed="false">Указать дату<input class="online-date" type="date" aria-label="Дата готовности"></button>
          </div>
        </div></div>
      </div>
      <aside class="online-brief-side">
        <p class="online-brief-label">Готовое сообщение</p>
        <div class="online-ready-message" data-ready-message aria-live="polite"></div>
        <div class="online-platforms" aria-label="Площадка для связи">
          <button class="online-platform" type="button" data-platform="telegram" aria-pressed="true" aria-label="Telegram"><img src="/assets/contact-telegram-figma.svg" alt=""></button>
          <button class="online-platform" type="button" data-platform="vk" aria-pressed="false" aria-label="VK"><img src="/assets/contact-vk-figma.svg" alt=""></button>
          <button class="online-platform" type="button" data-platform="whatsapp" aria-pressed="false" aria-label="WhatsApp"><img src="/assets/contact-whatsapp-figma.svg" alt=""></button>
          <button class="online-platform" type="button" data-platform="email" aria-pressed="false" aria-label="Email"><img src="/assets/contact-mail-figma.svg" alt=""></button>
        </div>
        <a class="online-send" data-send-link href="https://t.me/specfc" target="_blank" rel="noopener">Перейти в Telegram <img src="/assets/form-send-figma.svg" alt="" width="60" height="36"></a>
        <p class="online-platform-note" data-platform-note aria-live="polite"></p>
        <button class="online-copy-button" type="button" data-copy-message><img src="/assets/form-copy-figma.svg" alt="" width="58" height="59"> Скопировать текст</button>
      </aside>
    </div>`;

  more.after(services, studio, process, reviews, faq, brief);

  const dialog = document.createElement('dialog');
  dialog.className = 'online-service-dialog';
  dialog.setAttribute('aria-labelledby', 'online-service-dialog-title');
  dialog.innerHTML = `
    <div class="online-service-dialog-inner">
      <span class="online-service-dialog-index"></span>
      <div class="online-service-dialog-copy">
        <h3 id="online-service-dialog-title"></h3>
        <p class="online-service-dialog-lead"></p>
        <div class="online-service-subcategories"></div>
      </div>
      <button class="online-service-dialog-close" type="button">назад</button>
    </div>`;
  document.body.append(dialog);
  const customCursor = document.querySelector('#cursor');

  services.addEventListener('click', event => {
    const card = event.target.closest('[data-service-key]');
    if (!card) return;
    const service = serviceData.find(item => item.key === card.dataset.serviceKey);
    if (!service) return;
    const index = serviceData.indexOf(service) + 1;
    dialog.querySelector('.online-service-dialog-index').textContent = `${String(index).padStart(2, '0')} / ${String(serviceData.length).padStart(2, '0')}`;
    dialog.querySelector('h3').textContent = service.title;
    dialog.querySelector('.online-service-dialog-lead').textContent = service.description;
    dialog.querySelector('.online-service-subcategories').innerHTML = service.items.map(([name, description], itemIndex) => `
      <article class="online-service-subcategory">
        <span>${String(itemIndex + 1).padStart(2, '0')}</span>
        <h4>${name}</h4>
        <p>${description}</p>
      </article>`).join('');
    dialog.showModal();
    if (customCursor) dialog.append(customCursor);
    body.classList.add('service-dialog-open');
    body.style.overflow = 'hidden';
  });

  const closeDialog = () => {
    if (dialog.open) dialog.close();
    if (customCursor) body.append(customCursor);
    body.classList.remove('service-dialog-open');
    body.style.overflow = '';
  };
  dialog.querySelector('.online-service-dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });

  faq.querySelectorAll('.online-faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!expanded));
      question.closest('.online-faq-item')?.classList.toggle('is-open', !expanded);
      question.querySelector('span').textContent = expanded ? '+' : '−';
    });
  });

  /* Replace the former horizontal track with an infinite, bidirectional card deck. */
  const reviewData = [
    { name: 'Айгерим', date: '07.11.2026', project: 'Проект: ВМКФ 2026', text: '«Работали над проектом Всероссийского медицинского карьерного форума. Были проведены работы по разработке 15 макетов различной сложности — от ручки и стикерпаков до лонгсливов и нескольких баннеров. Также были проведены работы по персонализации благодарственных писем. Вся обратная связь от нас была отработана в полном объёме.»' },
    { name: 'Айгерим', date: '23.06.2026', project: 'Проект: Перспектива', text: '«По срокам: всё быстро, иногда раньше установленного времени. Также брал горящие задачи. Лояльность: взял дополнительные задачи, которые ранее не обговаривали. Качество: всё согласно техническому заданию и фирменному стилю проекта.»' },
    { name: 'holic', date: '20.04.2026', project: 'Проект: AtomCheats', text: '«хороший дизайнер, сделал всё быстро!»' },
    { name: 'Whiteness', date: '01.03.2026', project: 'Проекты: Astra VPS, Franchise Support, RayTun VPN, Sempai VPN, Kaguya VPN, Whiteness VPN', text: '«срабатываемся уже два раза, оформил два моих проекта! сделал все четко и круто! +rep»' },
    { name: 'Makhkets (Lacorner)', date: '18.01.2026', project: 'Проект: Makhkets VPN', text: '«работает быстро, качественно, принял все мои капризы насчет правок)»' },
    { name: 'Нафаня', date: '23.12.2025', project: 'Проект: Darknet VPN', text: '«хороший дизайнер, понял тз, сделал первый вариант и принял небольшие правки, с кайфом сделал баннер. рекомендую челика. +реп @specfc ☺️»' },
    { name: 'Mercuit', date: '29.03.2025', project: 'Услуги: Социальные сети; обложки для видеороликов', text: '«всё отлично, всем советую. чел сделал ахуенную работу. всё понравилось!»' },
    { name: 'Croffer', date: '25.03.2025', project: 'Услуга: Брендинг; логотип', text: '«сделал свою работу хорошо, определенно будем работать ещё!»' },
    { name: 'Эксфадор', date: '18.03.2025', project: 'Проект: CoxerHub', text: '«+rep»' },
    { name: 'hornykiller', date: '11.03.2025', project: 'Проект: Деригатор', text: '«сделал быстро, круто, топ, советую, рекомендую.»' }
  ];
  const viewport = reviews.querySelector('.home-reviews-v5__viewport');
  const oldControls = reviews.querySelector('.home-reviews-v5__controls');
  reviews.querySelector(':scope > [data-review-status]')?.remove();
  if (oldControls) oldControls.replaceWith(oldControls.cloneNode(true));
  if (viewport && reviewData.length) {
    viewport.innerHTML = '<div class="online-review-deck" aria-live="polite"></div><p class="sr-only" data-review-status></p>';
    const deck = viewport.querySelector('.online-review-deck');
    const status = viewport.querySelector('[data-review-status]');
    const prev = reviews.querySelector('[data-review-prev]');
    const next = reviews.querySelector('[data-review-next]');
    let current = 0;
    let moving = false;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const cardMarkup = (item, depth) => `
      <article class="online-review-card" data-depth="${depth}" aria-hidden="${depth !== 0}">
        <div class="online-review-meta">
          <p class="online-review-name"><img src="/assets/review-mark.svg" alt="" width="45" height="45">${item.name}</p>
          <div><time>${item.date}</time><span>${item.project}</span></div>
        </div>
        <blockquote>${item.text}</blockquote>
      </article>`;

    const renderDeck = () => {
      deck.innerHTML = [2, 1, 0].map(depth => {
        const item = reviewData[(current + depth) % reviewData.length];
        return cardMarkup(item, depth);
      }).join('');
      status.textContent = `Отзыв ${current + 1} из ${reviewData.length}`;
    };

    const moveDeck = direction => {
      if (moving || reviewData.length < 2) return;
      moving = true;
      const front = deck.querySelector('[data-depth="0"]');
      const target = (current + direction + reviewData.length) % reviewData.length;
      deck.insertAdjacentHTML('beforeend', cardMarkup(reviewData[target], 0));
      const incoming = deck.lastElementChild;
      incoming?.classList.add(direction > 0 ? 'is-incoming-next' : 'is-incoming-prev');
      front?.classList.add(direction > 0 ? 'is-leaving-next' : 'is-leaving-prev');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        incoming?.classList.remove('is-incoming-next', 'is-incoming-prev');
      }));
      const finish = () => {
        current = target;
        renderDeck();
        moving = false;
      };
      if (reducedMotion.matches) requestAnimationFrame(finish);
      else setTimeout(finish, 300);
    };

    prev?.addEventListener('click', () => moveDeck(-1));
    next?.addEventListener('click', () => moveDeck(1));
    renderDeck();
  }

  /* Interactive brief. Visible text starts empty; links always have a neutral fallback. */
  const chosenServices = new Set();
  const serviceNames = {
    branding: 'брендинг', web: 'веб-дизайн', social: 'оформление соцсетей', other: 'дизайн',
    print: 'печать и реклама', events: 'оформление мероприятия', motion: 'моушн-дизайн'
  };
  const projectText = brief.querySelector('.online-project-text');
  const counter = brief.querySelector('.online-counter');
  const ready = brief.querySelector('[data-ready-message]');
  const budget = brief.querySelector('.online-budget-input');
  const dateInput = brief.querySelector('.online-date');
  const send = brief.querySelector('[data-send-link]');
  const platformNote = brief.querySelector('[data-platform-note]');
  let deadline = '';
  let platform = 'telegram';
  const neutralMessage = 'Здравствуйте! Хочу обсудить дизайн для своего проекта.\n\nПока я не выбрал конкретную услугу и хочу обсудить задачу. Подскажите, пожалуйста, какие детали и материалы нужны для начала работы.';

  const formatDate = value => {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}.${month}.${year}`;
  };

  const buildMessage = () => {
    const servicesList = [...chosenServices].map(key => serviceNames[key]);
    const project = projectText.value.trim();
    const budgetValue = budget.value.trim();
    const deadlineValue = deadline === 'date' ? formatDate(dateInput.value) : deadline;
    if (!servicesList.length && !project && !budgetValue && !deadlineValue) return neutralMessage;
    const lines = ['Здравствуйте! Хочу обсудить дизайн для своего проекта.'];
    if (servicesList.length) lines.push(`Интересуют услуги: ${servicesList.join(', ')}.`);
    if (project) lines.push(`Немного о проекте: ${project}`);
    if (budgetValue) lines.push(`Ориентир по бюджету: ${budgetValue} ₽.`);
    if (deadlineValue) lines.push(`Желаемый срок: ${deadlineValue}.`);
    lines.push('Пожалуйста, подскажите точную стоимость и сроки выполнения работы.');
    return lines.join('\n\n');
  };

  const updateSendLink = message => {
    const outbound = message || neutralMessage;
    send.removeAttribute('aria-disabled');
    platformNote.textContent = '';
    if (!platform || platform === 'telegram') {
      send.href = `https://t.me/specfc?text=${encodeURIComponent(outbound)}`;
      send.innerHTML = `Перейти в Telegram <img src="/assets/form-send-figma.svg" alt="" width="60" height="36">`;
      return;
    }
    if (platform === 'email') {
      send.href = `mailto:neformya@mail.ru?subject=${encodeURIComponent('Запрос на дизайн')}&body=${encodeURIComponent(outbound)}`;
      send.innerHTML = `Перейти в Email <img src="/assets/form-send-figma.svg" alt="" width="60" height="36">`;
      return;
    }
    if (platform === 'vk') {
      send.href = 'https://vk.com/shxd1n';
      send.innerHTML = `Перейти в VK <img src="/assets/form-send-figma.svg" alt="" width="60" height="36">`;
      return;
    }
    send.href = `https://wa.me/specfck?text=${encodeURIComponent(outbound)}`;
    send.innerHTML = `Перейти в WhatsApp <img src="/assets/form-send-figma.svg" alt="" width="60" height="36">`;
  };

  const updateMessage = () => {
    const message = buildMessage();
    ready.textContent = message;
    counter.textContent = `${projectText.value.length}/500`;
    updateSendLink(message);
  };

  brief.querySelectorAll('[data-brief-service]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.briefService;
      const active = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!active));
      if (active) chosenServices.delete(key); else chosenServices.add(key);
      updateMessage();
    });
  });
  projectText.addEventListener('input', updateMessage);
  budget.addEventListener('input', updateMessage);

  const detailsToggle = brief.querySelector('.online-details-toggle');
  const details = brief.querySelector('.online-details');
  detailsToggle.addEventListener('click', () => {
    const open = detailsToggle.getAttribute('aria-expanded') === 'true';
    detailsToggle.setAttribute('aria-expanded', String(!open));
    details.classList.toggle('is-open', !open);
  });

  brief.querySelectorAll('[data-deadline]').forEach(button => {
    button.addEventListener('click', event => {
      if (event.target === dateInput) return;
      deadline = button.dataset.deadline;
      brief.querySelectorAll('[data-deadline]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      if (deadline === 'date') {
        if (typeof dateInput.showPicker === 'function') dateInput.showPicker();
        else dateInput.focus();
      }
      updateMessage();
    });
  });
  dateInput.addEventListener('change', () => { deadline = 'date'; updateMessage(); });

  brief.querySelectorAll('[data-platform]').forEach(button => {
    button.addEventListener('click', () => {
      platform = button.dataset.platform;
      brief.querySelectorAll('[data-platform]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateMessage();
    });
  });

  send.addEventListener('click', event => {
    if (send.getAttribute('aria-disabled') === 'true') event.preventDefault();
  });

  const copyText = async text => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {}
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.left = '-9999px';
    helper.style.top = '0';
    document.body.append(helper);
    helper.focus();
    helper.select();
    helper.setSelectionRange(0, helper.value.length);
    const copied = document.execCommand('copy');
    helper.remove();
    return copied;
  };

  brief.querySelector('[data-copy-message]').addEventListener('click', async event => {
    const text = ready.textContent;
    const button = event.currentTarget;
    const original = button.innerHTML;
    const copied = Boolean(text) && await copyText(text);
    button.innerHTML = copied
      ? '<img src="/assets/form-copy-figma.svg" alt="" width="58" height="59"> Текст скопирован'
      : '<img src="/assets/form-copy-figma.svg" alt="" width="58" height="59"> Не удалось скопировать';
    setTimeout(() => { button.innerHTML = original; }, 1500);
  });
  updateMessage();

  const revealItems = [...document.querySelectorAll('.online-reveal')];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px' });
    revealItems.forEach(item => observer.observe(item));
  }
})();
