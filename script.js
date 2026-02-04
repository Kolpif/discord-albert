const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section, index) => {
  section.style.transitionDelay = `${index * 0.12}s`;
  observer.observe(section);
});

const galleryButtons = document.querySelectorAll('.testimonial-card');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');
const closeTargets = document.querySelectorAll('[data-lightbox-close]');
const prevButton = document.querySelector('[data-lightbox-prev]');
const nextButton = document.querySelector('[data-lightbox-next]');

if (galleryButtons.length && lightbox && lightboxImage && lightboxCounter) {
  const items = Array.from(galleryButtons).map((button) => {
    const img = button.querySelector('img');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
    };
  });
  let currentIndex = 0;

  const render = (index) => {
    const safeIndex = (index + items.length) % items.length;
    const item = items[safeIndex];
    currentIndex = safeIndex;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCounter.textContent = `${safeIndex + 1} / ${items.length}`;
  };

  const openLightbox = (index) => {
    render(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryButtons.forEach((button, index) => {
    button.addEventListener('click', () => openLightbox(index));
  });

  closeTargets.forEach((target) => {
    target.addEventListener('click', closeLightbox);
  });

  if (prevButton) {
    prevButton.addEventListener('click', () => render(currentIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => render(currentIndex + 1));
  }

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') render(currentIndex - 1);
    if (event.key === 'ArrowRight') render(currentIndex + 1);
  });
}
