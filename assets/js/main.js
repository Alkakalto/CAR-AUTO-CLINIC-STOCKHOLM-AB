(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeNav = () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Öppna meny');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
    document.body.classList.toggle('nav-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      closeNav();
      navToggle?.focus();
    }
  });

  const updateHeader = () => header?.classList.toggle('is-fixed', window.scrollY > 45);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
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
      lightboxImage.src = item.dataset.full || '';
      lightboxImage.alt = item.querySelector('img')?.alt || '';
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.showModal();
      lightboxClose?.focus();
    });
  });

  const closeLightbox = () => { if (lightbox?.open) lightbox.close(); };
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    const rect = lightbox.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeLightbox();
  });
  lightbox?.addEventListener('close', () => lightboxTrigger?.focus());

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const validationMessages = {
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
    for (const [key, text] of Object.entries(validationMessages)) {
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
    if (!fields.map(validateField).every(Boolean)) {
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

