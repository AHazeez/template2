/* ===================================
   TGV WORLDWIDE HOLIDAYS — MAIN.JS
   Merged & cleaned from Replit export
   =================================== */

'use strict';

// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===================================
// MOBILE MENU
// ===================================
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay    = document.getElementById('nav-overlay');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close when a mobile nav link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ===================================
// ACTIVE NAV LINK
// ===================================
(function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ===================================
// SCROLL-TO-TOP BUTTON
// ===================================
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===================================
// FADE-IN ON SCROLL (Intersection Observer)
// ===================================
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
})();

// ===================================
// DESTINATION FILTER (destinations.html)
// ===================================
(function initDestFilter() {
  const filterBtns = document.querySelectorAll('.dest-filter__btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.dest-card-wrap').forEach(function (card) {
        if (filter === 'all' || card.dataset.region === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ===================================
// GALLERY LIGHTBOX (gallery.html)
// ===================================
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const triggers     = document.querySelectorAll('[data-lightbox]');

  function openLightbox(src, alt) {
    lightboxImg.src   = src;
    lightboxImg.alt   = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  triggers.forEach(function (el) {
    el.addEventListener('click', function () {
      const src = el.dataset.lightbox;
      const alt = el.dataset.alt || '';
      openLightbox(src, alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// ===================================
// CONTACT FORM (contact.html)
// ===================================
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission (replace with real API endpoint)
    setTimeout(function () {
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#2ecc71';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }
    }, 1200);
  });
})();

// ===================================
// PAYMENT FORM (payment.html)
// ===================================
(function initPaymentForm() {
  const form = document.getElementById('payment-form');
  if (!form) return;

  // Card number formatting
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').substring(0, 16);
      this.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry formatting
  const expiryInput = document.getElementById('card-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
      this.value = v;
    });
  }

  // CVV — digits only
  const cvvInput = document.getElementById('card-cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Processing…';
    btn.disabled = true;

    setTimeout(function () {
      const successMsg = document.getElementById('payment-success');
      if (successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Payment Confirmed ✓';
        btn.style.background = '#2ecc71';
      }
    }, 1800);
  });
})();

// ===================================
// CUSTOMIZE JOURNEY — DYNAMIC FORM
// ===================================
(function initCustomizeForm() {
  const form = document.getElementById('customize-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Submitting…';
    btn.disabled = true;

    setTimeout(function () {
      const success = document.getElementById('customize-success');
      if (success) {
        form.style.display = 'none';
        success.style.display = 'block';
      }
    }, 1200);
  });
})();

// ===================================
// HERO SEARCH FORM (index.html)
// ===================================
(function initPaymentPopup() {
  const payNowButtons = document.querySelectorAll('.pay-now-btn');
  const paymentPopup = document.getElementById('payment-popup');
  const closeBtn = document.getElementById('payment-popup-close');
  const demoForm = document.getElementById('demo-payment-form');
  const status = document.getElementById('demo-payment-status');

  function openPopup() {
    paymentPopup.classList.add('show');
    paymentPopup.setAttribute('aria-hidden', 'false');
    document.body.classList.add('payment-popup-open');
    document.getElementById('demo-booking-id')?.focus();
  }

  function closePopup() {
    paymentPopup.classList.remove('show');
    paymentPopup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('payment-popup-open');
  }

  if (payNowButtons.length > 0 && paymentPopup) {
    payNowButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    paymentPopup.addEventListener('click', (e) => {
      if (e.target === paymentPopup) {
        closePopup();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && paymentPopup.classList.contains('show')) closePopup();
    });

    if (demoForm) {
      demoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = demoForm.querySelector('[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Opening Demo...';
        btn.disabled = true;
        if (status) status.textContent = '';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          if (status) status.textContent = 'Demo payment form submitted successfully.';
        }, 900);
      });
    }
  }
})();
(function initHeroSearch() {
  const searchForm = document.getElementById('hero-search');
  if (!searchForm) return;

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dest = document.getElementById('search-dest')?.value?.trim();
    if (dest) {
      window.location.href = 'contact.html?destination=' + encodeURIComponent(dest);
    } else {
      window.location.href = 'contact.html';
    }
  });
})();

// ===================================
// SMOOTH ANCHOR SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
