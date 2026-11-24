(function () {
  'use strict';

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    document.body.removeChild(textarea);
    return copied;
  }

  function initCopyControls(root) {
    if (!root) return;
    const buttons = root.querySelectorAll('[data-copy-text], .btn-copy-email[data-email]');
    buttons.forEach((btn) => {
      let copyTimeout = null;
      const defaultLabel = btn.getAttribute('data-default-label') || btn.textContent;

      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy-text') || btn.getAttribute('data-email') || '';
        if (!text) return;

        let copied = false;
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          try {
            await navigator.clipboard.writeText(text);
            copied = true;
          } catch {
            copied = fallbackCopyText(text);
          }
        } else {
          copied = fallbackCopyText(text);
        }

        if (!copied) {
          if (btn.classList.contains('btn-copy-email')) {
            window.location.href = `mailto:${encodeURIComponent(text)}`;
          }
          return;
        }

        if (copyTimeout) clearTimeout(copyTimeout);
        btn.textContent = 'COPIED';
        btn.classList.add('is-copied');
        copyTimeout = setTimeout(() => {
          btn.textContent = defaultLabel;
          btn.classList.remove('is-copied');
          copyTimeout = null;
        }, 1800);
      });
    });
  }

  function initScrollSpy(root) {
    if (!root) return;
    const links = Array.from(root.querySelectorAll('.toc-nav a[href^="#"]'));
    const items = links
      .map((link) => {
        const id = link.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        return target ? { link, target } : null;
      })
      .filter(Boolean);

    if (items.length === 0) return;

    function setActive(activeLink) {
      items.forEach(({ link }) => {
        const isCurrent = link === activeLink;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function updateActive() {
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(items[items.length - 1].link);
        return;
      }

      let activeItem = items[0];
      for (let i = 0; i < items.length; i++) {
        if (items[i].target.getBoundingClientRect().top <= 140) {
          activeItem = items[i];
        }
      }
      setActive(activeItem.link);
    }

    let ticking = false;
    function scheduleUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });
    window.addEventListener('hashchange', updateActive);

    updateActive();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateActive);
    }
  }

  initCopyControls(document);
  initScrollSpy(document);

  // Guarded carousel for legacy preview pages
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

  // Guarded Tlaloc mascot for legacy preview pages
  const mascot = document.getElementById('pixelMascotCompanion');
  const spriteWrapper = document.getElementById('mascotSpriteWrapper');
  const bubbleText = document.getElementById('mascotBubbleText');

  if (mascot) {
    const targetList = [
      { id: 'stats-ledger', status: "DATA PIPELINES & AI", side: 'right', walkDist: 36 },
      { id: 'banner-about', status: "ABOUT & STACK", side: 'left', walkDist: 40 },
      { id: 'focus', status: "DEBIAN 4GB + RAG", side: 'right', walkDist: 38 },
      { id: 'work', status: "AIRFLOW & AWS IAC", side: 'right', walkDist: 48 },
      { id: 'banner-exp', status: "AI RESEARCH LAB", side: 'left', walkDist: 42 },
      { id: 'skills', status: "PYTHON & POSTGRES", side: 'right', walkDist: 34 },
      { id: 'certs', status: "AWS CERTIFIED", side: 'left', walkDist: 38 },
      { id: 'education', status: "UPY & HOLBERTON", side: 'right', walkDist: 36 },
      { id: 'contact', status: "GET IN TOUCH", side: 'right', walkDist: 52 }
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

      mascot.className = 'pixel-mascot-companion is-burrowing';

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

        animTimers.push(setTimeout(() => {
          mascot.className = 'pixel-mascot-companion is-walking';
          mascot.style.transition = 'left 0.5s steps(4, end)';
          mascot.style.left = `${walkTargetX}px`;

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

    triggerSectionMascot(0, true);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => triggerSectionMascot(0, true));
    }

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

    mascot.addEventListener('click', () => {
      mascot.className = 'pixel-mascot-companion is-emerging';
      if (bubbleText) {
        const statusMessages = [
          "[99.982% UPTIME SLA]",
          "[TOP-25 TO TOP-5 RERANK]",
          "[DEBIAN 4GB RAM]",
          "[UV RUN AIRFLOW]",
          "[TERRAFORM APPLY]"
        ];
        bubbleText.textContent = statusMessages[Math.floor(Math.random() * statusMessages.length)];
      }
      setTimeout(() => {
        mascot.className = 'pixel-mascot-companion is-typing';
      }, 400);
    });
  }
})();
