    /* ── Theme: detect OS preference on first visit, restore saved ── */
    (function() {
      const saved     = localStorage.getItem('mono-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme     = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = theme === 'dark' ? '\u2600 Light' : '\u263E Dark';
      });
    })();

    /* ── Theme toggle ── */
    function toggleTheme() {
      var html  = document.documentElement;
      var isDark = html.getAttribute('data-theme') === 'dark';
      var next  = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('mono-theme', next);
      document.getElementById('theme-toggle').textContent = next === 'dark' ? '\u2600 Light' : '\u263E Dark';
    }

    /* ── Nav scroll ── */
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ── Scroll progress ── */
    var progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
    }, { passive: true });

    /* ── Copyright year ── */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── Mobile menu ── */
    function toggleMobileMenu() {
      var menu   = document.getElementById('mobile-menu');
      var burger = document.getElementById('nav-hamburger');
      var isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      burger.classList.toggle('open', !isOpen);
      burger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    }
    function closeMobileMenu() {
      var menu   = document.getElementById('mobile-menu');
      var burger = document.getElementById('nav-hamburger');
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    /* ── Scroll reveal — both directions ── */
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        e.target.classList.toggle('visible', e.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

    /* ── Project filter ── */
    function filterProjects(tag) {
      document.querySelectorAll('.project-filters .filter-btn').forEach(function(b) {
        b.classList.toggle('active', b.textContent.toLowerCase().indexOf(tag) !== -1 || tag === 'all');
      });
      document.querySelectorAll('#projects-grid .project-card').forEach(function(card) {
        var tags = card.dataset.tags || '';
        var show = tag === 'all' || tags.indexOf(tag) !== -1;
        card.classList.toggle('hidden', !show);
      });
    }

