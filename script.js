(() => {
  'use strict';
  const config = window.AIRFACIL_CONFIG || {};
  // Guarda o horário final, não o número de segundos: fechar não pausa nem reinicia.
  const countdown = document.querySelector('[data-offer-countdown]');
  if (countdown) {
    const storageKey = 'airfacil-countdown-deadline-2h-v1';
    const duration = 2 * 60 * 60 * 1000;
    const isDeadline = value => Number.isSafeInteger(value) && value > 0;
    let deadline;
    try {
      const saved = Number(window.localStorage.getItem(storageKey));
      // Migra o contador anterior preservando o tempo já transcorrido.
      const previousDeadline = Number(window.localStorage.getItem('airfacil-countdown-deadline-v1'));
      deadline = isDeadline(saved) ? saved
        : isDeadline(previousDeadline) ? previousDeadline + 60 * 60 * 1000
        : Date.now() + duration;
      if (!isDeadline(saved)) window.localStorage.setItem(storageKey, String(deadline));
    } catch {
      // Se o navegador bloquear o armazenamento, funciona durante esta visita.
      deadline = Date.now() + duration;
    }
    const countdownViews = [...document.querySelectorAll('[data-offer-countdown]')].map(element => ({
      element,
      hours: element.querySelector('[data-countdown-hours]'),
      minutes: element.querySelector('[data-countdown-minutes]'),
      seconds: element.querySelector('[data-countdown-seconds]'),
      display: element.querySelector('[data-countdown-display]'),
      label: element.querySelector('[data-countdown-label]')
    }));
    let intervalId = null;
    function syncCountdownHeight() {
      document.documentElement.style.setProperty('--countdown-bar-height', `${countdown.getBoundingClientRect().height}px`);
    }
    function updateCountdown() {
      const remaining = Math.max(0, Math.min(duration / 1000, Math.ceil((deadline - Date.now()) / 1000)));
      const h = Math.floor(remaining / 3600);
      const m = Math.floor(remaining % 3600 / 60);
      const s = remaining % 60;
      countdownViews.forEach(view => {
        view.hours.textContent = String(h).padStart(2, '0');
        view.minutes.textContent = String(m).padStart(2, '0');
        view.seconds.textContent = String(s).padStart(2, '0');
        view.display.setAttribute('aria-label', `${h} horas, ${m} minutos e ${s} segundos restantes`);
        view.label.textContent = remaining > 0 ? 'Tempo restante' : 'Contagem encerrada';
        view.element.hidden = false;
      });
      document.documentElement.classList.add('has-countdown-bar');
      if (remaining === 0 && intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      return remaining;
    }
    if (updateCountdown() > 0) intervalId = window.setInterval(updateCountdown, 1000);
    syncCountdownHeight();
    if ('ResizeObserver' in window) new ResizeObserver(syncCountdownHeight).observe(countdown);
    else window.addEventListener('resize', syncCountdownHeight);
    document.addEventListener('visibilitychange', updateCountdown);
    window.addEventListener('pageshow', updateCountdown);
    window.addEventListener('storage', event => {
      if (event.key !== storageKey || event.newValue === null) return;
      const saved = Number(event.newValue);
      if (isDeadline(saved)) {
        deadline = Math.min(deadline, saved);
        updateCountdown();
      }
    });
  }

  // Só substitui o recorte antigo depois que a nova imagem carregar.
  // Assim, um arquivo ausente não deixa a seção com uma imagem quebrada.
  document.querySelectorAll('[data-image]').forEach(container => {
    const setting = config.images?.[container.dataset.image];
    if (!setting?.src) return;
    const replacement = new Image();
    replacement.alt = '';
    replacement.setAttribute('aria-hidden', 'true');
    replacement.decoding = 'async';
    replacement.onload = () => {
      if (!replacement.naturalWidth) return;
      container.replaceChildren(replacement);
      container.classList.add('custom-image');
      if (setting.alt) container.setAttribute('aria-label', setting.alt);
      if (container.parentElement.classList.contains('hero-art')) {
        container.parentElement.classList.add('custom-image-wrapper');
      }
    };
    replacement.onerror = () => {
      // Mantém a referência até o arquivo indicado em config.js ser adicionado.
    };
    replacement.src = setting.src;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Depoimentos: rolagem nativa com toque, teclado, setas e indicadores.
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    const track = carousel.querySelector('.testimonial-track');
    const slides = [...track.children];
    const previous = carousel.querySelector('[data-testimonial-prev]');
    const next = carousel.querySelector('[data-testimonial-next]');
    const dots = carousel.querySelector('.testimonial-dots');
    const status = carousel.querySelector('[data-testimonial-status]');
    let index = 0;
    let visible = 1;
    let lastIndex = 0;
    let scrollFrame = null;
    const slideLeft = position => slides[position].offsetLeft - slides[0].offsetLeft;
    function renderPosition() {
      previous.disabled = index === 0;
      next.disabled = index === lastIndex;
      [...dots.children].forEach((dot, position) => {
        dot.setAttribute('aria-current', String(position === index));
      });
      const end = Math.min(slides.length, index + visible);
      status.textContent = visible === 1
        ? `Depoimento ${index + 1} de ${slides.length}`
        : `Depoimentos ${index + 1} a ${end} de ${slides.length}`;
    }
    function goTo(position, instant = false) {
      index = Math.max(0, Math.min(lastIndex, position));
      track.scrollTo({ left: slideLeft(index), behavior: instant || reducedMotion ? 'instant' : 'smooth' });
      renderPosition();
    }
    function layoutCarousel() {
      visible = Number(getComputedStyle(carousel).getPropertyValue('--visible-slides')) || 1;
      lastIndex = Math.max(0, slides.length - visible);
      const fragment = document.createDocumentFragment();
      for (let position = 0; position <= lastIndex; position++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'testimonial-dot';
        dot.setAttribute('aria-label', `Ver a partir do depoimento ${position + 1}`);
        dot.setAttribute('aria-controls', 'testimonial-track');
        dot.addEventListener('click', () => goTo(position));
        fragment.append(dot);
      }
      dots.replaceChildren(fragment);
      goTo(index, true);
    }
    previous.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));
    track.addEventListener('keydown', event => {
      const positions = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: lastIndex };
      if (!(event.key in positions)) return;
      event.preventDefault();
      goTo(positions[event.key]);
    });
    track.addEventListener('scroll', () => {
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(() => {
        const step = slides.length > 1 ? slideLeft(1) : track.clientWidth;
        index = Math.max(0, Math.min(lastIndex, Math.round(track.scrollLeft / step)));
        renderPosition();
        scrollFrame = null;
      });
    }, { passive: true });
    carousel.querySelector('.testimonial-controls').hidden = false;
    layoutCarousel();
    if ('ResizeObserver' in window) new ResizeObserver(layoutCarousel).observe(track);
    else window.addEventListener('resize', layoutCarousel);

    const modal = document.querySelector('#testimonial-modal');
    if (modal && typeof modal.showModal === 'function') {
      let previousOverflow = '';
      track.querySelectorAll('[data-testimonial-image]').forEach(link => {
        link.addEventListener('click', event => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          const original = link.querySelector('img');
          const enlarged = modal.querySelector('img');
          enlarged.src = original.src;
          enlarged.alt = original.alt;
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          modal.showModal();
          modal.scrollTop = 0;
        });
      });
      modal.querySelector('button').addEventListener('click', () => modal.close());
      modal.addEventListener('click', event => {
        if (event.target !== modal) return;
        const rect = modal.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
      });
      modal.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
    }
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    document.documentElement.classList.add('reveal-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    revealElements.forEach(el => observer.observe(el));
  }
  const progress = document.querySelector('.scroll-progress');
  const backTop = document.querySelector('.back-top');
  let framePending = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
    backTop.classList.toggle('visible', window.scrollY > 650);
    framePending = false;
  }
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateScroll);
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  window.addEventListener('load', updateScroll);
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));

  // Keep the mobile offer reachable without covering another visible purchase CTA.
  const mobilePurchase = document.querySelector('.mobile-purchase');
  const mobileViewport = window.matchMedia('(max-width: 680px)');
  if (mobilePurchase && 'IntersectionObserver' in window) {
    const visiblePurchaseSections = new Set();
    let heroPassed = false;
    const setPurchaseVisibility = () => {
      const show = mobileViewport.matches && heroPassed && visiblePurchaseSections.size === 0;
      mobilePurchase.classList.toggle('visible', show);
      mobilePurchase.setAttribute('aria-hidden', String(!show));
      mobilePurchase.inert = !show;
    };
    const purchaseObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('hero')) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        } else if (entry.isIntersecting) {
          visiblePurchaseSections.add(entry.target);
        } else {
          visiblePurchaseSections.delete(entry.target);
        }
      });
      setPurchaseVisibility();
    }, { threshold: 0 });
    document.querySelectorAll('.hero, .offer, .final-cta, .contact, .footer').forEach(section => purchaseObserver.observe(section));
    mobileViewport.addEventListener('change', setPurchaseVisibility);
    setPurchaseVisibility();
  }

  document.querySelectorAll('.faq details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq details[open]').forEach(other => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const dialog = document.querySelector('#notice');
  function notice(title, body) {
    dialog.querySelector('#notice-title').textContent = title;
    dialog.querySelector('#notice-description').textContent = body;
    dialog.showModal();
  }
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  function safeCheckout(value) {
    if (!value) return null;
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  }
  const checkoutUrl = safeCheckout(config.checkoutUrl);
  document.querySelectorAll('[data-checkout]').forEach(button => button.addEventListener('click', () => {
    if (checkoutUrl) window.location.assign(checkoutUrl);
    else notice('As compras ainda não estão disponíveis', 'Esta é uma prévia da página AirFácil. O link de pagamento será disponibilizado em breve. Nenhuma cobrança foi realizada.');
  }));
  const emailButton = document.querySelector('[data-email]');
  const whatsappButton = document.querySelector('[data-whatsapp]');
  const email = String(config.supportEmail || '').trim();
  const phone = String(config.whatsappNumber || '').replace(/\D/g, '');
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailButton.textContent = email;
    emailButton.addEventListener('click', () => { window.location.href = 'mailto:' + encodeURIComponent(email); });
  } else emailButton.addEventListener('click', () => notice('Atendimento por e-mail', 'O endereço de atendimento será informado em breve.'));
  if (/^\d{10,15}$/.test(phone)) {
    whatsappButton.textContent = 'Conversar no WhatsApp';
    whatsappButton.addEventListener('click', () => window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(config.whatsappMessage || ''), '_blank', 'noopener,noreferrer'));
  } else whatsappButton.addEventListener('click', () => notice('Atendimento pelo WhatsApp', 'O contato de atendimento será disponibilizado em breve.'));
})();
