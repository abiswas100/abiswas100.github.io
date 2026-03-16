/* ============================================
   Academic Portfolio — Minimal JS
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar__links a');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  // --- Active nav link based on scroll position ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector('.navbar__links a[href="#' + id + '"]');

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav ---
  const toggle = document.querySelector('.navbar__toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.overlay');
  const mobileClose = document.querySelector('.mobile-nav__close');

  function openMobile() {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (overlay) overlay.addEventListener('click', closeMobile);

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(function (link) {
    link.addEventListener('click', closeMobile);
  });

  // --- Fade-in on scroll (Intersection Observer) ---
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
