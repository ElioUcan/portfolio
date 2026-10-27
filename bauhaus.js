(function () {
  'use strict';
  // Carrusel Bauhaus Circular
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot-btn');
  const counter = document.getElementById('carousel-counter');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const carousel = document.getElementById('projects-carousel');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const total = slides.length;

    function goToSlide(index) {
      currentIndex = (index + total) % total;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (counter) counter.textContent = `[ 0${currentIndex + 1} / 0${total} ]`;
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      slides.forEach((slide, i) => {
        if (i === currentIndex) slide.removeAttribute('inert');
        else slide.setAttribute('inert', '');
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

    if (carousel) {
      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(currentIndex - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(currentIndex + 1); }
      });
    }

    let startX = 0, startY = 0;
    track.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          goToSlide(diffX > 0 ? currentIndex - 1 : currentIndex + 1);
        }
      }
    }, { passive: true });

    goToSlide(0);
  }

  // Copiado de Correo Directo
  document.querySelectorAll('.btn-copy-email').forEach((btn) => {
    let copyTimeout = null;
    const initialText = btn.textContent;
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'elioeduardo06@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyTimeout) clearTimeout(copyTimeout);
        btn.textContent = 'COPIED!';
        btn.classList.add('is-copied');
        copyTimeout = setTimeout(() => {
          btn.textContent = initialText;
          btn.classList.remove('is-copied');
          copyTimeout = null;
        }, 2000);
      } catch {
        window.location.href = `mailto:${encodeURIComponent(email)}`;
      }
    });
  });
})();
