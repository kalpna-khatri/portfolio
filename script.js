window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

function closeMobileMenu() {
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

function openModal(id) {
  const modal = document.getElementById('modal-' + id);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalClick(e, id) {
  if (e.target === document.getElementById('modal-' + id)) closeModal(id);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

function handleFormSubmit() {
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  setTimeout(() => success.style.display = 'none', 4000);
}

function initProjectThumbnails() {
  document.querySelectorAll('.project-thumb, .hero-photo').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback) fallback.style.display = 'flex';
    });
  });
}

function initExternalLinkThumbnails() {
  document.querySelectorAll('[data-favicon-domain]').forEach(el => {
    const domain = el.getAttribute('data-favicon-domain');
    const label = el.querySelector('.contact-link-label');
    if (!domain || !label || label.querySelector('.contact-link-icon')) return;

    const icon = document.createElement('img');
    icon.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
    icon.alt = '';
    icon.className = 'contact-link-icon';
    icon.loading = 'lazy';
    icon.addEventListener('error', () => icon.remove());
    label.prepend(icon);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectThumbnails();
  initExternalLinkThumbnails();
});