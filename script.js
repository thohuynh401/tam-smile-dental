/* ============================================
   TÂM SMILE DENTAL CLINIC - JavaScript
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {



  // ---------- STICKY HEADER ----------
  const header = document.getElementById('header');
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- MOBILE MENU ----------
    const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  if (menuToggle && navLinks && navOverlay) {
    const toggleMenu = () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };
    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ---------- SMOOTH SCROLL ----------
  // ---------- LOGO SCROLL TO TOP ----------
  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so re-entering can re-trigger if needed,
        // but for performance we unobserve after first reveal
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- COUNTER ANIMATION ----------
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = new Set();

  const animateCounter = (el) => {
    if (countersAnimated.has(el)) return;
    countersAnimated.add(el);

    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));

    // ---------- TESTIMONIAL SLIDER ----------
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = 4;
    let autoplayInterval;

    const updateSlider = (index) => {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    const nextSlide = () => {
      updateSlider((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
      updateSlider((currentSlide - 1 + totalSlides) % totalSlides);
    };

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        updateSlider(parseInt(dot.getAttribute('data-index')));
        resetAutoplay();
      });
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
        resetAutoplay();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
        resetAutoplay();
      }
    }, { passive: true });

    // Autoplay
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      startAutoplay();
    };

    startAutoplay();
  }

// ---------- ACTIVE NAV LINK HIGHLIGHT ----------
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a:not(.btn-primary)').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- PARALLAX-LIKE EFFECT FOR HERO ----------
  const heroImage = document.querySelector('.hero-image-wrapper');

  if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }, { passive: true });
  }

  // ---------- PREFERS REDUCED MOTION ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('visible');
      el.style.transition = 'none';
    });

    document.querySelectorAll('.floating-badge').forEach(el => {
      el.style.animation = 'none';
    });
  }

    // ---------- BOOKING MODAL ----------
  const bookingModal = document.getElementById('bookingModal');
  const bookingOverlay = document.getElementById('bookingOverlay');
  const bookingClose = document.getElementById('bookingClose');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const bookingDateInput = document.getElementById('bookingDate');
  const formNextUrl = document.getElementById('formNextUrl');

  if (bookingModal && bookingOverlay) {
    if (bookingDateInput) {
      const today = new Date().toISOString().split('T')[0];
      bookingDateInput.setAttribute('min', today);
    }
    if (formNextUrl) {
      formNextUrl.value = window.location.href;
    }
    window.openBookingModal = () => {
      bookingModal.classList.add('open');
      bookingOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (bookingForm) bookingForm.style.display = '';
      if (bookingSuccess) bookingSuccess.style.display = 'none';
    };
    window.closeBookingModal = () => {
      bookingModal.classList.remove('open');
      bookingOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (bookingClose) bookingClose.addEventListener('click', closeBookingModal);
    bookingOverlay.addEventListener('click', closeBookingModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
        closeBookingModal();
      }
    });
  } else {
    window.openBookingModal = () => {
        console.error("Booking modal elements not found on this page.");
    };
  }

// ---------- MAP WIDGET ----------
  const mapToggle = document.getElementById('mapToggle');
  const mapPanel = document.getElementById('mapPanel');
  const mapClose = document.getElementById('mapClose');

  if (mapToggle && mapPanel) {
    mapToggle.addEventListener('click', () => {
      mapPanel.classList.toggle('open');
    });

    mapClose.addEventListener('click', () => {
      mapPanel.classList.remove('open');
    });

    // Close map when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.map-widget') && mapPanel.classList.contains('open')) {
        mapPanel.classList.remove('open');
      }
    });
  }

  // ---------- BEFORE & AFTER SLIDER ----------
  const baSliders = document.querySelectorAll('.ba-slider');
  baSliders.forEach(slider => {
    const range = slider.querySelector('.ba-range');
    const beforeWrapper = slider.querySelector('.ba-image-before-wrapper');
    const handle = slider.querySelector('.ba-handle');

    if (range && beforeWrapper && handle) {
      range.addEventListener('input', (e) => {
        const val = e.target.value;
        beforeWrapper.style.clipPath = `polygon(0 0, ` + val + `% 0, ` + val + `% 100%, 0 100%)`;
        handle.style.left = val + '%';
      });
    }
  });

});

