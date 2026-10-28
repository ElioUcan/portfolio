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

  // Mascota Maya Pixel - Videojuego Retro (Sale del suelo, camina por los bordes en steps)
  const mascot = document.getElementById('pixelMascotCompanion');
  const spriteWrapper = document.getElementById('mascotSpriteWrapper');
  const bubbleText = document.getElementById('mascotBubbleText');

  if (mascot) {
    const targetList = [
      { id: 'stats-ledger', status: "K'UUK' // DATA & AI", side: 'right', walkDist: 36 },
      { id: 'banner-about', status: "K'UUK' // COMPILING THESIS", side: 'left', walkDist: 40 },
      { id: 'focus', status: "K'UUK' // 4GB DEBIAN + RAG", side: 'right', walkDist: 38 },
      { id: 'work', status: "K'UUK' // AIRFLOW & AWS IAC", side: 'right', walkDist: 48 },
      { id: 'banner-exp', status: "K'UUK' // AI RESEARCH LAB", side: 'left', walkDist: 42 },
      { id: 'skills', status: "K'UUK' // PYTHON & POSTGRES", side: 'right', walkDist: 34 },
      { id: 'certs', status: "K'UUK' // AWS CERTIFIED", side: 'left', walkDist: 38 },
      { id: 'education', status: "K'UUK' // UPY & HOLBERTON", side: 'right', walkDist: 36 },
      { id: 'contact', status: "K'UUK' // TRANSMIT PING", side: 'right', walkDist: 52 }
    ];

    let currentTargetIndex = -1;
    let animTimers = [];
    const MASCOT_HEIGHT = 48;
    const MASCOT_WIDTH = 88;

    const clearAnimTimers = () => {
      animTimers.forEach((t) => clearTimeout(t));
      animTimers = [];
    };

    const triggerSectionMascot = (index, immediate = false) => {
      const target = targetList[index];
      const el = document.getElementById(target.id);
      if (!el) return;

      clearAnimTimers();
      const rect = el.getBoundingClientRect();
      const pageTop = Math.round(rect.top + window.scrollY);
      const pageLeft = Math.round(rect.left + window.scrollX);
      const targetY = pageTop - MASCOT_HEIGHT + 1;

      const isLeft = target.side === 'left';
      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 12 : 24;
      const walk = isMobile ? Math.min(20, target.walkDist) : target.walkDist;

      let spawnX, walkTargetX;
      if (isLeft) {
        spawnX = Math.round(pageLeft + margin);
        walkTargetX = spawnX + walk;
      } else {
        spawnX = Math.round(pageLeft + rect.width - MASCOT_WIDTH - margin);
        walkTargetX = spawnX - walk;
      }

      if (immediate || currentTargetIndex === -1) {
        currentTargetIndex = index;
        mascot.style.transition = 'none';
        mascot.style.top = `${targetY}px`;
        mascot.style.left = `${walkTargetX}px`;
        mascot.className = 'pixel-mascot-companion is-typing';
        if (spriteWrapper) {
          spriteWrapper.classList.toggle('is-facing-right', isLeft);
        }
        if (bubbleText) bubbleText.textContent = target.status;
        return;
      }

      // Secuencia retro de videojuego:
      // 1. Sumergirse en el suelo de la tarjeta actual (200ms)
      mascot.className = 'pixel-mascot-companion is-burrowing';

      // 2. Warp instantáneo a la nueva tarjeta y emerger del suelo
      animTimers.push(setTimeout(() => {
        currentTargetIndex = index;
        mascot.style.transition = 'none';
        mascot.style.top = `${targetY}px`;
        mascot.style.left = `${spawnX}px`;

        if (spriteWrapper) {
          spriteWrapper.classList.toggle('is-facing-right', isLeft);
        }

        mascot.className = 'pixel-mascot-companion is-emerging';
        if (bubbleText) bubbleText.textContent = target.status;

        // 3. Caminar por el borde en pasos discretos (steps de 8-bit)
        animTimers.push(setTimeout(() => {
          mascot.className = 'pixel-mascot-companion is-walking';
          mascot.style.transition = 'left 0.5s steps(4, end)';
          mascot.style.left = `${walkTargetX}px`;

          // 4. Detenerse, desplegar laptop y comenzar a programar
          animTimers.push(setTimeout(() => {
            mascot.style.transition = 'none';
            mascot.className = 'pixel-mascot-companion is-typing';
          }, 520));
        }, 340));
      }, 200));
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
        triggerSectionMascot(activeIndex, false);
      }
    };

    window.addEventListener('resize', () => {
      if (currentTargetIndex >= 0 && currentTargetIndex < targetList.length) {
        triggerSectionMascot(currentTargetIndex, true);
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

    // Inicio inmediato al cargar
    triggerSectionMascot(0, true);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => triggerSectionMascot(0, true));
    }

    // Clic en cualquier banner o tarjeta para invocar a la mascota caminando allí
    targetList.forEach((item, index) => {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (!e.target.closest('a, button, input')) {
            triggerSectionMascot(index, false);
          }
        });
      }
    });

    // Clic en la mascota: animación de festejo y easter egg
    mascot.addEventListener('click', () => {
      mascot.className = 'pixel-mascot-companion is-emerging';
      if (bubbleText) {
        const easterEggs = [
          "K'UUK' // [100% PIPELINE SLA]",
          "K'UUK' // [RERANK TOP-5 READY]",
          "K'UUK' // [4GB DEBIAN OPTIMIZED]",
          "K'UUK' // [UV RUN AIRFLOW DAG]",
          "K'UUK' // [LEVEL UP! STAGE CLEARED]"
        ];
        bubbleText.textContent = easterEggs[Math.floor(Math.random() * easterEggs.length)];
      }
      setTimeout(() => {
        mascot.className = 'pixel-mascot-companion is-typing';
      }, 400);
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
