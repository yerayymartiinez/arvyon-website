/* ========================================================
   ARVYON — AI & Automation Studio
   Premium Redesign — JavaScript
   ======================================================== */
(function () {
  'use strict';

  /* ---- DOM ---- */
  var header   = document.getElementById('header');
  var toggle   = document.getElementById('menuToggle');
  var nav      = document.getElementById('mainNav');
  var navLinks = document.querySelectorAll('.header__nav-link');
  var form     = document.getElementById('contactForm');
  var success  = document.getElementById('formSuccess');
  var sections = document.querySelectorAll('section[id]');
  var canvas   = document.getElementById('bgCanvas');
  var lineFill = document.getElementById('processLineFill');

  /* ==========================================================
     PARTICLE CANVAS BACKGROUND
     ========================================================== */
  (function initCanvas() {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: -500, y: -500 };
    var w, h;

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function Particle() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r  = Math.random() * 1.5 + 0.5;
    }

    var count = Math.min(80, Math.floor(w * h / 15000));
    for (var i = 0; i < count; i++) particles.push(new Particle());

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(23, 107, 255, 0.35)';
        ctx.fill();

        /* Connect nearby particles */
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(23, 107, 255, ' + (0.06 * (1 - dist / 140)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        /* Mouse interaction */
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(113, 60, 255, ' + (0.12 * (1 - mDist / 160)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ==========================================================
     HEADER — Scroll effect
     ========================================================== */
  function onScroll() {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ==========================================================
     MOBILE MENU
     ========================================================== */
  function toggleMenu() {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  toggle.addEventListener('click', toggleMenu);
  navLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  /* ==========================================================
     ACTIVE NAV LINK
     ========================================================== */
  function updateActive() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      var id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + h) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */
  (function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ==========================================================
     PROCESS LINE ANIMATION
     ========================================================== */
  (function initProcessLine() {
    if (!lineFill) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              lineFill.classList.add('animated');
            }, 400);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(lineFill.parentElement);
  })();

  /* ==========================================================
     SMOOTH SCROLL
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================
     CONTACT FORM
     ========================================================== */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function showErr(inputId, errId) {
    document.getElementById(inputId).classList.add('error');
    document.getElementById(errId).classList.add('visible');
  }
  function clearErr(inputId, errId) {
    document.getElementById(inputId).classList.remove('error');
    document.getElementById(errId).classList.remove('visible');
  }

  var nombre = document.getElementById('nombre');
  var email  = document.getElementById('email');

  if (nombre) nombre.addEventListener('input', function () {
    if (nombre.value.trim()) clearErr('nombre', 'nombreError');
  });
  if (email) email.addEventListener('input', function () {
    if (validEmail(email.value.trim())) clearErr('email', 'emailError');
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      if (!nombre.value.trim()) { showErr('nombre', 'nombreError'); ok = false; }
      else clearErr('nombre', 'nombreError');

      if (!email.value.trim() || !validEmail(email.value.trim())) { showErr('email', 'emailError'); ok = false; }
      else clearErr('email', 'emailError');

      if (!ok) return;

      /* Show loader */
      var btn = document.getElementById('submitBtn');
      var btnText = btn.querySelector('.btn__text');
      var btnLoader = btn.querySelector('.btn__loader');
      btnText.style.display = 'none';
      btnLoader.style.display = 'block';
      btn.disabled = true;

      var formData = {
        nombre:   nombre.value.trim(),
        empresa:  document.getElementById('empresa').value.trim(),
        email:    email.value.trim(),
        servicio: document.getElementById('servicio').value,
        mensaje:  document.getElementById('mensaje').value.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('ARVYON — Formulario enviado:', formData);

      /*
       * ============================================
       * INTEGRACIÓN BACKEND
       * ============================================
       * Reemplazar este bloque con la llamada al servicio
       * de formularios (EmailJS, Formspree, API propia, etc.)
       *
       * fetch('https://api.example.com/contact', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(formData)
       * })
       * .then(r => r.json())
       * .then(d => { showSuccess(); })
       * .catch(err => { console.error(err); });
       * ============================================
       */

      /* Simulate brief delay for realism */
      setTimeout(showSuccess, 800);
    });
  }

  function showSuccess() {
    var groups = form.querySelectorAll('.contact-form__group, .contact-form__row');
    groups.forEach(function (g) { g.style.display = 'none'; });
    success.classList.add('visible');
  }

})();
