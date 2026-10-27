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

  // Mascota Maya Interactiva (Scroll Companion)
  const mayaMascot = document.getElementById('mayaMascot');
  const mayaBubble = document.getElementById('mayaBubble');
  const mayaTrack = document.querySelector('.maya-track');

  if (mayaMascot && mayaTrack) {
    const sections = [
      { id: 'hero', label: 'INICIO' },
      { id: 'about', label: 'TESIS' },
      { id: 'focus', label: 'NOW' },
      { id: 'work', label: 'PROYECTOS' },
      { id: 'experience', label: 'EXP' },
      { id: 'skills', label: 'SKILLS' },
      { id: 'certs', label: 'CERTS' },
      { id: 'education', label: 'ACADEMIA' },
      { id: 'contact', label: 'FIN ✦' }
    ];

    const updateMascotPosition = () => {
      if (window.innerWidth <= 768) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      const trackHeight = mayaTrack.clientHeight - mayaMascot.clientHeight;
      const translateY = progress * trackHeight;
      mayaMascot.style.transform = `translate(-50%, ${translateY}px)`;

      let currentLabel = `${Math.round(progress * 100)}%`;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          currentLabel = sections[i].label;
          break;
        }
      }
      if (mayaBubble) {
        mayaBubble.textContent = currentLabel;
      }
    };

    window.addEventListener('scroll', updateMascotPosition, { passive: true });
    window.addEventListener('resize', updateMascotPosition);
    updateMascotPosition();

    mayaMascot.addEventListener('click', () => {
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
