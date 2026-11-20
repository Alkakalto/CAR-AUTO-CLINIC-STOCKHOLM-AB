(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeNav = () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Öppna meny');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.setAttribute('aria-label', willOpen ? 'Stäng meny' : 'Öppna meny');
    document.body.classList.toggle('nav-open', willOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      closeNav();
      navToggle?.focus();
    }
  });

  const updateHeader = () => header?.classList.toggle('is-fixed', window.scrollY > 60);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('p');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  let lightboxTrigger = null;

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      lightboxTrigger = item;
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector('img')?.alt || '';
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.showModal();
      lightboxClose?.focus();
    });
  });

  const closeLightbox = () => {
    if (lightbox?.open) lightbox.close();
  };
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    const rect = lightbox.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeLightbox();
  });
  lightbox?.addEventListener('close', () => lightboxTrigger?.focus());

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const messages = {
    valueMissing: 'Fyll i det här fältet.',
    typeMismatch: 'Ange en giltig e-postadress.',
    tooShort: 'Skriv lite mer information.',
    patternMismatch: 'Kontrollera telefonnumrets format.'
  };

  const validateField = (field) => {
    const error = field.parentElement?.querySelector('.error');
    field.removeAttribute('aria-invalid');
    if (error) error.textContent = '';
    if (field.validity.valid) return true;

    let message = 'Kontrollera uppgiften.';
    for (const [key, text] of Object.entries(messages)) {
      if (field.validity[key]) { message = text; break; }
    }
    field.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
    return false;
  };

  form?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) validateField(field);
      status?.classList.remove('is-visible');
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    if (status) {
      status.textContent = 'Förfrågan är korrekt ifylld. Eftersom detta är en demo har ingenting skickats eller sparats. Ring företaget för kontakt.';
      status.classList.add('is-visible');
      status.focus();
    }
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

