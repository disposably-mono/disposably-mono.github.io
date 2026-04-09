/* ── Theme: detect OS preference on first visit, restore saved ── */
(function () {
  const saved = localStorage.getItem('mono-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600 Light' : '\u263E Dark';
  });
})();

/* ── Theme toggle — clip-path circle wipe from the button ──────────────
   Uses WAAPI (Web Animations API) for hardware-accelerated clip-path
   expansion. The wipe overlay reveals the new theme's background color
   expanding outward from the toggle button's center, then the actual
   html attribute flips once the wipe is fully covering the screen.

   Why not CSS transition on html[data-theme]?
   The attribute flip is instant — there's nothing to transition between
   two theme states at the html level without JS-orchestrated sequencing.
   The wipe overlay gives us a definite visual moment to flip mid-animation.

   Timeline per toggle:
     0ms     Wipe overlay placed at toggle button's position, starts expanding
     220ms   Circle covers the screen → html[data-theme] flips, overlay removed
     The whole thing reads as ~220ms which is fast and intentional.
   ──────────────────────────────────────────────────────────────────────── */
function toggleTheme() {
  /* Skip if a wipe is already in progress */
  if (document.getElementById('theme-wipe')) return;

  var html = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var isDark = html.getAttribute('data-theme') === 'dark';
  var next = isDark ? 'light' : 'dark';

  /* Incoming theme bg colors — matched to CSS token values */
  var nextBg = next === 'dark' ? '#34312D' : '#EAF0CE';

  /* Get toggle button center as the wipe origin */
  var rect = btn ? btn.getBoundingClientRect() : { left: window.innerWidth - 80, top: 28, width: 60, height: 28 };
  var originX = rect.left + rect.width / 2;
  var originY = rect.top + rect.height / 2;

  /* Max radius needed to cover the full viewport from that origin */
  var maxR = Math.ceil(Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  ));

  /* Build overlay */
  var wipe = document.createElement('div');
  wipe.id = 'theme-wipe';
  wipe.style.background = nextBg;
  /* Start: circle of radius 0 at the button center */
  wipe.style.clipPath =
    'circle(0px at ' + originX + 'px ' + originY + 'px)';
  document.body.appendChild(wipe);

  /* Reduced motion: skip wipe, just flip */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    html.setAttribute('data-theme', next);
    localStorage.setItem('mono-theme', next);
    btn.textContent = next === 'dark' ? '\u2600 Light' : '\u263E Dark';
    wipe.remove();
    return;
  }

  /* WAAPI clip-path expansion — runs off the main thread */
  var anim = wipe.animate(
    [
      { clipPath: 'circle(0px at ' + originX + 'px ' + originY + 'px)' },
      { clipPath: 'circle(' + (maxR + 10) + 'px at ' + originX + 'px ' + originY + 'px)' },
    ],
    {
      duration: 460,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)', /* strong ease-out — feels immediate */
      fill: 'forwards',
    }
  );

  /* Flip the theme at ~55% through — circle is covering most of the screen */
  var flipAt = 460 * 0.55;
  setTimeout(function () {
    html.setAttribute('data-theme', next);
    localStorage.setItem('mono-theme', next);
    btn.textContent = next === 'dark' ? '\u2600 Light' : '\u263E Dark';
  }, flipAt);

  /* Remove overlay once expansion is complete */
  anim.onfinish = function () { wipe.remove(); };
  anim.oncancel = function () { wipe.remove(); };
}

/* ── Nav scroll ── */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Scroll progress ── */
var progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', function () {
  var docH = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
}, { passive: true });

/* ── Copyright year ── */
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Mobile menu ── */
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('nav-hamburger');
  var isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  burger.classList.toggle('open', !isOpen);
  burger.setAttribute('aria-expanded', String(!isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
}
function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('nav-hamburger');
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ── Scroll reveal — exposed globally so render.js can re-observe ── */
window._revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    e.target.classList.toggle('visible', e.isIntersecting);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(function (el) { window._revealObserver.observe(el); });

/* ── Project filter — smooth card transitions ── */
function filterProjects(tag) {
  document.querySelectorAll('.project-filters .filter-btn').forEach(function (b) {
    var isActive = b.textContent.toLowerCase().indexOf(tag) !== -1 || tag === 'all';
    b.classList.toggle('active', isActive);
  });

  var cards = document.querySelectorAll('#projects-grid .project-card');

  cards.forEach(function (card) {
    var tags = card.dataset.tags || '';
    var shouldShow = tag === 'all' || tags.indexOf(tag) !== -1;

    if (shouldShow) {
      card.classList.remove('hidden');
      void card.offsetWidth;
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.style.pointerEvents = '';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.97)';
      card.style.pointerEvents = 'none';
      clearTimeout(card._hideTimer);
      card._hideTimer = setTimeout(function () {
        card.classList.add('hidden');
      }, 230);
    }
  });
}
