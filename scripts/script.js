document.addEventListener('DOMContentLoaded', function () {

  // ─── 1. Mobile Navigation Toggle ────────────────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');

  if (menuToggle && navUl) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navUl.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when any nav link is clicked
    navUl.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navUl.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── 2. Scroll Animations (IntersectionObserver) ────────────────────────────
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el, index) {
      el.style.transitionDelay = (index % 3) * 100 + 'ms';
      scrollObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support
    animatedEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ─── 3. Stats Counter Animation ─────────────────────────────────────────────
  const counterEls = document.querySelectorAll('[data-count]');

  if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Fallback: set final value immediately
    counterEls.forEach(function (el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: 1 - (1 - progress)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

});
