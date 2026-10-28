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

  // Mascota Maya Pixel que se para sobre los recuadros y teclea en su laptop
  const mascot = document.getElementById('pixelMascotCompanion');
  const bubbleText = document.getElementById('mascotBubbleText');

  if (mascot) {
    const targetList = [
      { id: 'stats-ledger', status: "K'UUK' // DATA & AI" },
      { id: 'banner-about', status: "K'UUK' // COMPILING THESIS" },
      { id: 'focus', status: "K'UUK' // 4GB DEBIAN + RAG" },
      { id: 'work', status: "K'UUK' // AIRFLOW & AWS IAC" },
      { id: 'banner-exp', status: "K'UUK' // AI RESEARCH LAB" },
      { id: 'skills', status: "K'UUK' // PYTHON & POSTGRES" },
      { id: 'certs', status: "K'UUK' // AWS CERTIFIED" },
      { id: 'education', status: "K'UUK' // UPY & HOLBERTON" },
      { id: 'contact', status: "K'UUK' // TRANSMIT PING" }
    ];

    let currentTargetIndex = -1;
    let landingTimeout = null;
    const MASCOT_HEIGHT = 48;
    const MASCOT_WIDTH = 88;

    const setMascotPosition = (targetEl, isJump) => {
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const pageTop = rect.top + window.scrollY;
      const pageLeft = rect.left + window.scrollX;

      // El borde superior es el suelo. y=pageTop.
      // Las patitas tocan exactamente la línea superior (borde 1px hairline).
      const targetY = Math.round(pageTop - MASCOT_HEIGHT + 1);

      // A la derecha del recuadro, como en la imagen
      const rightPadding = window.innerWidth <= 768 ? 16 : 36;
      const targetX = Math.round(pageLeft + rect.width - MASCOT_WIDTH - rightPadding);

      mascot.style.top = `${targetY}px`;
      mascot.style.left = `${Math.max(12, targetX)}px`;

      if (isJump) {
        mascot.classList.remove('is-jumping', 'is-landing');
        void mascot.offsetWidth; // retrigger reflow
        mascot.classList.add('is-jumping');

        if (landingTimeout) clearTimeout(landingTimeout);
        landingTimeout = setTimeout(() => {
          mascot.classList.remove('is-jumping');
          mascot.classList.add('is-landing');
        }, 460);
      }
    };

    const updateActiveSection = () => {
      let activeIndex = 0;
      const scrollThreshold = window.innerHeight * 0.45;

      for (let i = targetList.length - 1; i >= 0; i--) {
        const el = document.getElementById(targetList[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollThreshold) {
            activeIndex = i;
            break;
          }
        }
      }

      if (activeIndex !== currentTargetIndex) {
        currentTargetIndex = activeIndex;
        const target = targetList[activeIndex];
        const el = document.getElementById(target.id);
        if (el) {
          setMascotPosition(el, true);
          if (bubbleText) bubbleText.textContent = target.status;
        }
      }
    };

    // Al redimensionar, reposicionar sin animación de salto
    window.addEventListener('resize', () => {
      if (currentTargetIndex >= 0 && currentTargetIndex < targetList.length) {
        const el = document.getElementById(targetList[currentTargetIndex].id);
        if (el) setMascotPosition(el, false);
      }
    }, { passive: true });

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    // Posición inicial inmediata y al cargar contenido
    updateActiveSection();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateActiveSection);
    }
    setTimeout(updateActiveSection, 150);

    // Permitir hacer clic en cualquier sección o banner para que la mascota brinque a él
    targetList.forEach((item, index) => {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (!e.target.closest('a, button, input')) {
            currentTargetIndex = index;
            setMascotPosition(el, true);
            if (bubbleText) bubbleText.textContent = item.status;
          }
        });
      }
    });

    // Clic en la mascota: acrobacia feliz y mensaje especial
    mascot.addEventListener('click', () => {
      mascot.classList.remove('is-jumping', 'is-landing');
      void mascot.offsetWidth;
      mascot.classList.add('is-jumping');
      if (bubbleText) {
        const easterEggs = [
          "K'UUK' // [100% PIPELINE SLA]",
          "K'UUK' // [RERANK TOP-5 READY]",
          "K'UUK' // [4GB DEBIAN OPTIMIZED]",
          "K'UUK' // [UV RUN AIRFLOW DAG]"
        ];
        bubbleText.textContent = easterEggs[Math.floor(Math.random() * easterEggs.length)];
      }
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
