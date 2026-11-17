/* ============================================
   SUITELMA BATISTA - TERAPEUTA TRG
   JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Reveal on Scroll (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('show');
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el, index) => {
    // Add staggered delay to cards and list items within grids
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('about-trg__grid') ||
                   parent.classList.contains('services__grid') ||
                   parent.classList.contains('highlights__list') ||
                   parent.classList.contains('how-it-works__steps'))) {
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 120;
    }
    revealObserver.observe(el);
  });

  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  let lastScroll = 0;

  const updateHeader = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ---- Mobile Menu Toggle ----
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside (overlay)
  nav.addEventListener('click', (e) => {
    if (e.target === nav) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ---- Active Link Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__menu a');

  const highlightActiveLink = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
  highlightActiveLink();

  // ---- Smooth scrolling for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
