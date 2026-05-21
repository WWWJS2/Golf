const header = document.querySelector('.site-header');
const nav = document.getElementById('mainNav');
const toggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
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
}, { threshold: 0.12 });

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
  revealObserver.observe(el);
});

const slides = [
  { src: 'veritas-golf-kit.jpg', alt: 'Golf course at sunset' },
  { src: 'golfer-sunset-course.jpg', alt: 'Golf ball in flight' },
  { src: 'titleist-golf-ball.jpg', alt: 'Golf equipment detail' }
];
const experienceImage = document.getElementById('experienceImage');
const slideButtons = document.querySelectorAll('.slide-controls button');
let currentSlide = 0;

function showSlide(index) {
  const next = slides[index];
  if (!next || !experienceImage) return;
  experienceImage.classList.add('switching');
  window.setTimeout(() => {
    experienceImage.src = next.src;
    experienceImage.alt = next.alt;
    slideButtons.forEach((btn) => btn.classList.remove('active'));
    slideButtons[index]?.classList.add('active');
    experienceImage.classList.remove('switching');
    currentSlide = index;
  }, 160);
}

slideButtons.forEach((button) => {
  button.addEventListener('click', () => showSlide(Number(button.dataset.slide)));
});

if (experienceImage && slideButtons.length) {
  window.setInterval(() => showSlide((currentSlide + 1) % slides.length), 4200);
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item, .closing-card').forEach((item) => {
  item.addEventListener('click', () => {
    const src = item.dataset.image || item.querySelector('img')?.getAttribute('src');
    const title = item.dataset.title || item.textContent?.trim() || 'Gallery image';
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
