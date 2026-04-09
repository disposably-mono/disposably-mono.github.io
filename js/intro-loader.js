/* ============================================================
   Mono — intro-loader.js  (v2 — Emil-polished)

   Timeline:
     0ms       Overlay present, body locked
     120ms     M fades + scales in (+ radial bloom behind it)
     1800ms    M flies to nav-logo (dots pulse for ~1680ms)
     2200ms    Overlay fades out
     2550ms    Nav-logo revealed
     3200ms    Loader removed, hero content animates in
     3350ms    Canvas fades in, particles begin spawning

   Changes from v1:
     - Radial bloom (#intro-loader::before) triggered with M
     - M entrance starts from translateY(6px) — rises up, not just scales
     - Dot pulse upgraded to scale + opacity (see CSS dotPulse keyframe)
     - FLIP fly uses tighter 850ms drawer-spring; opacity delay shortened
     - Bloom fades naturally with the overlay (no extra step needed)
   ============================================================ */

(function () {

  /* ── 1. Build overlay DOM ── */
  var loader = document.createElement('div');
  loader.id = 'intro-loader';

  var mEl = document.createElement('div');
  mEl.id = 'intro-m';
  mEl.textContent = 'M';

  var dots = document.createElement('div');
  dots.id = 'intro-dots';
  dots.innerHTML = '<span></span><span></span><span></span>';
  mEl.appendChild(dots);

  loader.appendChild(mEl);
  document.body.appendChild(loader);

  /* ── 2. Lock the page ── */
  document.body.classList.add('intro-active');

  /* ── 3. Particle stagger hook ── */
  var particleStagger = { ready: false, interval: 160 };
  window._introParticleStagger = particleStagger;

  /* ── 4. Reduced motion shortcut ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove();
    document.body.classList.remove('intro-active');
    particleStagger.ready = true;
    return;
  }

  /* ── 5. Inject nav-logo reveal keyframe ── */
  var styleEl = document.createElement('style');
  styleEl.textContent =
    '@keyframes introNavReveal {' +
    '  from { opacity: 0; transform: scale(0.55); }' +
    '  to   { opacity: 1; transform: scale(1); }' +
    '}';
  document.head.appendChild(styleEl);

  /* ── Utility ── */
  function wait(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  /* ── 6. Guard: run() fires exactly once ── */
  var hasRun = false;
  function safeRun() {
    if (hasRun) return;
    hasRun = true;
    run();
  }

  if (document.readyState === 'complete') {
    setTimeout(safeRun, 0);
  } else {
    window.addEventListener('load', safeRun);
  }

  /* ── 7. Main sequence ── */
  async function run() {

    /* ── Phase 1: M rises + fades in, bloom expands behind it ── */
    await wait(120);
    void mEl.offsetWidth;
    mEl.classList.add('visible');
    loader.classList.add('bloom-active');

    /* ── Phase 1b: dots pulse ── */
    await wait(1680);

    /* ── Phase 2: FLIP — M flies to nav-logo ── */
    var navLogo = document.getElementById('nav-logo');
    if (navLogo) navLogo.classList.add('nav-logo-hidden');

    var fromRect = mEl.getBoundingClientRect();
    var toRect = navLogo
      ? navLogo.getBoundingClientRect()
      : { top: 24, left: 24, width: 14, height: 14 };

    var dx = (toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2);
    var dy = (toRect.top + toRect.height / 2) - (fromRect.top + fromRect.height / 2);
    var scaleTarget = toRect.height / fromRect.height;

    mEl.classList.add('fly-to-nav');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        mEl.style.transformOrigin = 'center center';
        mEl.style.transform =
          'translate(' + dx + 'px, ' + dy + 'px) scale(' + scaleTarget + ')';
        mEl.style.opacity = '0';
        mEl.style.textShadow = '0 0 0px rgba(88,129,87,0)';
      });
    });

    /* ── Phase 2b: overlay fades while M travels ── */
    await wait(400);
    loader.classList.add('phase-out');

    /* ── Phase 2c: nav-logo pops in ── */
    await wait(350);
    if (navLogo) {
      navLogo.classList.remove('nav-logo-hidden');
      navLogo.style.animation =
        'introNavReveal 0.5s cubic-bezier(0.23,1,0.32,1) forwards';
    }

    /* ── Phase 3: remove loader, unlock body ── */
    await wait(650);
    loader.remove();
    document.body.classList.remove('intro-active');

    /* ── Phase 3b: hero elements animate in ── */
    var heroAnimations = [
      { sel: '.hero-eyebrow', anim: 'heroFadeUp 0.8s  cubic-bezier(0.23,1,0.32,1) 0s    both' },
      { sel: '.hero-name', anim: 'heroFadeUp 0.9s  cubic-bezier(0.23,1,0.32,1) 0.18s both' },
      { sel: '.hero-tagline', anim: 'heroFadeUp 0.8s  cubic-bezier(0.23,1,0.32,1) 0.34s both' },
      { sel: '.hero-hint-inline', anim: 'heroFadeUp 0.75s cubic-bezier(0.23,1,0.32,1) 0.5s  both' },
      { sel: '.hero-cta', anim: 'heroFadeUp 0.75s cubic-bezier(0.23,1,0.32,1) 0.62s both' },
    ];

    heroAnimations.forEach(function (item) {
      var el = document.querySelector(item.sel);
      if (!el) return;
      el.style.opacity = '0';
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = item.anim;
    });

    /* ── Phase 3c: canvas fades in ── */
    setTimeout(function () {
      var canvas = document.getElementById('hero-canvas');
      if (canvas) canvas.classList.add('particles-visible');
    }, 150);

    /* ── Phase 3d: signal particles.js ── */
    particleStagger.ready = true;
  }

})();
