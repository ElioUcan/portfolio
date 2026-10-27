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

  // Selector Dinámico de Tipografía Neoazteca
  const fontPills = document.querySelectorAll('.font-pill');
  if (fontPills.length > 0) {
    const applyFont = (font) => {
      document.documentElement.setAttribute('data-font', font);
      fontPills.forEach((p) => {
        const isActive = p.getAttribute('data-font') === font;
        p.classList.toggle('is-active', isActive);
        p.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      try { localStorage.setItem('portfolio-font', font); } catch {}
    };

    fontPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const font = pill.getAttribute('data-font');
        if (font) applyFont(font);
      });
    });

    try {
      const saved = localStorage.getItem('portfolio-font');
      if (saved) applyFont(saved);
    } catch {}
  }

  // Mascota Maya Pixel que Brinca entre Secciones
  const pixelMascot = document.getElementById('pixelMayaCompanion');
  const pixelTag = document.getElementById('pixelNameTag');
  if (pixelMascot) {
    const sectionList = [
      { id: 'hero', name: "K'UUK'" },
      { id: 'about', name: 'TESIS' },
      { id: 'focus', name: 'NOW' },
      { id: 'work', name: 'PROYECTOS' },
      { id: 'experience', name: 'EXP' },
      { id: 'skills', name: 'SKILLS' },
      { id: 'certs', name: 'CERTS' },
      { id: 'education', name: 'ACADEMIA' },
      { id: 'contact', name: 'CONTACTO' }
    ];

    let currentActiveIndex = 0;
    let jumpTimeout = null;

    const updateHop = () => {
      let activeIndex = 0;
      for (let i = sectionList.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionList[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          activeIndex = i;
          break;
        }
      }

      if (window.innerWidth > 768) {
        const activeEl = document.getElementById(sectionList[activeIndex].id);
        if (activeEl) {
          const banner = activeEl.querySelector('.section-banner') || activeEl;
          const rect = banner.getBoundingClientRect();
          const targetY = Math.max(90, Math.min(window.innerHeight - 110, rect.top + 6));
          pixelMascot.style.top = `${targetY}px`;
        }
      }

      if (activeIndex !== currentActiveIndex) {
        currentActiveIndex = activeIndex;
        pixelMascot.classList.remove('is-jumping', 'is-landing');
        void pixelMascot.offsetWidth;
        pixelMascot.classList.add('is-jumping');
        if (pixelTag) pixelTag.textContent = sectionList[activeIndex].name;

        if (jumpTimeout) clearTimeout(jumpTimeout);
        jumpTimeout = setTimeout(() => {
          pixelMascot.classList.remove('is-jumping');
          pixelMascot.classList.add('is-landing');
        }, 500);
      }
    };

    window.addEventListener('scroll', updateHop, { passive: true });
    window.addEventListener('resize', updateHop);
    updateHop();

    pixelMascot.addEventListener('click', () => {
      pixelMascot.classList.add('is-jumping');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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
