const header = document.querySelector('.site-header');
const nav = document.getElementById('mainNav');
const toggle = document.getElementById('navToggle');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  revealObserver.observe(el);
});

const slides = [
  { src: 'assets/images/golf-cart-sunset.jpg', alt: 'Golf cart on a sunset course' },
  { src: 'assets/images/golf-ball-flight.jpg', alt: 'Golf ball in flight with grass particles' },
  { src: 'assets/images/golfer-sunset-course.jpg', alt: 'Golfer driving from the tee at sunset' }
];
const experienceImage = document.getElementById('experienceImage');
const slideButtons = document.querySelectorAll('.slide-controls button');

slideButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.slide);
    const next = slides[index];
    if (!next || !experienceImage) return;
    experienceImage.classList.add('switching');
    setTimeout(() => {
      experienceImage.src = next.src;
      experienceImage.alt = next.alt;
      slideButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      experienceImage.classList.remove('switching');
    }, 180);
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const src = item.dataset.image;
    const title = item.dataset.title || 'Gallery image';
    if (!src || !lightbox || !lightboxImage || !lightboxTitle) return;
    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightbox.showModal();
    document.body.classList.add('no-scroll');
  });
});

function closeModal() {
  lightbox?.close();
  document.body.classList.remove('no-scroll');
}
closeLightbox?.addEventListener('click', closeModal);
lightbox?.addEventListener('click', (event) => {
  const rect = lightbox.getBoundingClientRect();
  const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
  if (!isInDialog) closeModal();
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = encodeURIComponent(data.get('name') || '');
  const email = encodeURIComponent(data.get('email') || '');
  const message = encodeURIComponent(data.get('message') || '');
  const subject = encodeURIComponent('Private Golf Website Request');
  const body = `Name: ${name}%0AEmail: ${email}%0A%0ARequest:%0A${message}`;
  window.location.href = `mailto:hello@majestygolf.com?subject=${subject}&body=${body}`;
});
