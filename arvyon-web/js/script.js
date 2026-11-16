/* ========================================================
   ARVYON — AI & Automation Studio
   JavaScript
   ======================================================== */

(function () {
  'use strict';

  /* ---- DOM references ---- */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const sections = document.querySelectorAll('section[id]');

  /* ========================================================
     HEADER — scroll effect
     ======================================================== */
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ========================================================
     MOBILE MENU
     ======================================================== */
  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ========================================================
     ACTIVE NAV LINK ON SCROLL
     ======================================================== */
  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ========================================================
     SCROLL REVEAL
     ======================================================== */
  function initReveal() {
    var revealElements = [
      '.section-header',
      '.service-card',
      '.benefit-item',
      '.process-step',
      '.about__content',
      '.about__visual',
      '.contact__info',
      '.contact__form-wrapper'
    ];

    revealElements.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  initReveal();

  /* ========================================================
     CONTACT FORM
     ======================================================== */
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    input.classList.add('error');
    error.classList.add('visible');
  }

  function clearError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    input.classList.remove('error');
    error.classList.remove('visible');
  }

  /* Clear errors on input */
  var nombre = document.getElementById('nombre');
  var email = document.getElementById('email');

  if (nombre) {
    nombre.addEventListener('input', function () {
      if (nombre.value.trim()) {
        clearError('nombre', 'nombreError');
      }
    });
  }

  if (email) {
    email.addEventListener('input', function () {
      if (validateEmail(email.value.trim())) {
        clearError('email', 'emailError');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      /* Validate name */
      if (!nombre.value.trim()) {
        showError('nombre', 'nombreError');
        isValid = false;
      } else {
        clearError('nombre', 'nombreError');
      }

      /* Validate email */
      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        showError('email', 'emailError');
        isValid = false;
      } else {
        clearError('email', 'emailError');
      }

      if (!isValid) return;

      /* Collect form data (ready for backend integration) */
      var formData = {
        nombre: nombre.value.trim(),
        empresa: document.getElementById('empresa').value.trim(),
        email: email.value.trim(),
        servicio: document.getElementById('servicio').value,
        mensaje: document.getElementById('mensaje').value.trim(),
        timestamp: new Date().toISOString()
      };

      /* Log data for integration testing */
      console.log('ARVYON — Formulario enviado:', formData);

      /*
       * ============================================
       * INTEGRACIÓN BACKEND
       * ============================================
       * Reemplazar este bloque con la llamada al servicio
       * de formularios (EmailJS, Formspree, API propia, etc.)
       *
       * Ejemplo con fetch:
       *
       * fetch('https://api.example.com/contact', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(formData)
       * })
       * .then(response => response.json())
       * .then(data => { showSuccess(); })
       * .catch(error => { console.error(error); });
       *
       * ============================================
       */

      showSuccess();
    });
  }

  function showSuccess() {
    /* Hide form fields */
    var groups = contactForm.querySelectorAll('.contact-form__group');
    groups.forEach(function (group) {
      group.style.display = 'none';
    });

    /* Show success message */
    formSuccess.classList.add('visible');
  }

  /* ========================================================
     SMOOTH SCROLL for CTA buttons
     ======================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.offsetTop - 72;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

})();
