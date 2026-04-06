/* ── Hero word-particle canvas — autonomous drift/merge/break ── */
(function () {
  var canvas = document.getElementById('hero-canvas');
  var ctx = canvas.getContext('2d');
  var toast = document.getElementById('merge-toast');
  var W, H, particles;
  var toastTimer = null;
  var frame = 0;

  /* Guard for missing DATA */
  if (typeof DATA === 'undefined') {
    console.error('data.js not loaded — particle system disabled');
    return;
  }

  /* read from data.js — edit particleWords and particleMerges there */
  var WORDS = DATA.particleWords;
  var MERGES = DATA.particleMerges;

  /* source pool — words that have been merged out get returned here */
  var POOL = WORDS.map(function (w) { return { text: w.text, col: w.col, size: w.size }; });

  /* ── burst dots ── */
  var bursts = [];
  var BURST_COLS = ['#588157', '#EAF0CE', '#E5D4ED', '#8D99AE', '#9FE1CB'];

  function spawnBurst(x, y) {
    var count = 10 + Math.floor(Math.random() * 6);
    for (var i = 0; i < count; i++) {
      var ang = Math.random() * Math.PI * 2;
      var spd = 0.6 + Math.random() * 1.8;
      bursts.push({
        x: x, y: y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        r: 1 + Math.random() * 1.8,
        life: 1.0,
        decay: 0.022 + Math.random() * 0.018,
        col: BURST_COLS[Math.floor(Math.random() * BURST_COLS.length)],
      });
    }
  }

  function updateBursts() {
    for (var i = bursts.length - 1; i >= 0; i--) {
      var b = bursts[i];
      b.vx *= 0.91;
      b.vy *= 0.91;
      b.x += b.vx;
      b.y += b.vy;
      b.life -= b.decay;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = b.life * 0.75;
      ctx.fillStyle = b.col;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function showToast(txt) {
    toast.textContent = '"' + txt + '"';
    toast.style.opacity = '1';
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.style.opacity = '0'; }, 2600);
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function wordColor(col) {
    if (!isDark()) {
      if (col === '#EAF0CE') return 'rgba(52,49,45,0.45)';
      if (col === '#588157') return 'rgba(59,109,17,0.65)';
      if (col === '#8D99AE') return 'rgba(95,94,90,0.55)';
      if (col === '#E5D4ED') return 'rgba(83,74,183,0.5)';
      return 'rgba(52,49,45,0.4)';
    }
    return col;
  }

  function mkParticle(text, col, size, x, y) {
    /* Gentle, calm movement speed */
    var spd = 0.12 + Math.random() * 0.18;
    var ang = Math.random() * Math.PI * 2;
    return {
      text: text, col: col, size: size,
      x: x !== undefined ? x : 60 + Math.random() * (W - 120),
      y: y !== undefined ? y : 80 + Math.random() * (H - 200),
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      wax: 0.006 + Math.random() * 0.008,
      way: 0.004 + Math.random() * 0.006,
      wpx: Math.random() * Math.PI * 2,
      wpy: Math.random() * Math.PI * 2,
      a: Math.random() * 0.25 + 0.25,
      merged: false,
      flashT: 0,
      breakT: 0,
      cooldown: 0,
      isMerged: false,
      src1: null, src2: null,
    };
  }

  /* Cache for text widths */
  var widthCache = {};
  function getTextW(p) {
    var key = p.text + '|' + p.size;
    if (widthCache[key]) return widthCache[key];
    ctx.save();
    ctx.font = p.size + "px 'Outfit', sans-serif";
    var w = ctx.measureText(p.text).width;
    ctx.restore();
    widthCache[key] = w;
    return w;
  }

  function tryMerge(a, b) {
    for (var i = 0; i < MERGES.length; i++) {
      var m = MERGES[i];
      if ((a.text === m[0] && b.text === m[1]) || (a.text === m[1] && b.text === m[0])) return m[2];
    }
    return null;
  }

  function poolFind(txt) {
    for (var i = 0; i < POOL.length; i++) {
      if (POOL[i].text === txt) return POOL[i];
    }
    return null;
  }

  function spawnFrom(poolWord, x, y, angle) {
    var p = mkParticle(poolWord.text, poolWord.col, poolWord.size, x, y);
    var spd = 0.2 + Math.random() * 0.2;
    p.vx = Math.cos(angle) * spd;
    p.vy = Math.sin(angle) * spd;
    p.flashT = 20;
    p.cooldown = 180;
    particles.push(p);
  }

  function initParticles() {
    particles = [];
    var chosen = WORDS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 24);
    chosen.forEach(function (w) {
      particles.push(mkParticle(w.text, w.col, w.size));
    });
  }

  function maybeInject() {
    if (particles.length >= 28) return;
    var active = {};
    particles.forEach(function (p) {
      active[p.text] = true;
      if (p.src1) active[p.src1] = true;
      if (p.src2) active[p.src2] = true;
    });
    var missing = POOL.filter(function (w) { return !active[w.text]; });
    if (!missing.length) return;
    var w = missing[Math.floor(Math.random() * missing.length)];
    var ex = Math.random() < 0.5 ? 40 : W - 40;
    var ey = 80 + Math.random() * (H - 220);
    var p = mkParticle(w.text, w.col, w.size, ex, ey);
    p.a = 0.05;
    p.cooldown = 120;
    particles.push(p);
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = canvas.width = r.width;
    H = canvas.height = r.height;
    if (!particles) { initParticles(); return; }
    particles.forEach(function (p) {
      p.x = Math.min(Math.max(p.x, 40), W - 40);
      p.y = Math.min(Math.max(p.y, 80), H - 150);
    });
    widthCache = {};
  }

  function drawParticle(p) {
    var alpha = p.flashT > 0 ? Math.min(0.9, p.a + (p.flashT / 55) * 0.4) : p.a;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = p.size + "px 'Outfit', sans-serif";
    ctx.fillStyle = p.flashT > 0 ? '#9FE1CB' : wordColor(p.col);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.text, p.x, p.y);
    ctx.restore();
  }

  function loop() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    if (frame % 280 === 0) maybeInject();

    /* Update timers for ALL particles */
    for (var idx = 0; idx < particles.length; idx++) {
      var pAll = particles[idx];
      if (pAll.flashT > 0) pAll.flashT--;
      if (pAll.breakT > 0) pAll.breakT--;
      if (pAll.cooldown > 0) pAll.cooldown--;

      if (pAll.a < (pAll.isMerged ? 0.7 : 0.5)) {
        pAll.a = Math.min(pAll.isMerged ? 0.7 : 0.5, pAll.a + 0.003);
      }
    }

    /* Movement and boundary collision for non-merged particles */
    var alive = particles.filter(function (p) { return !p.merged; });

    for (var i = 0; i < alive.length; i++) {
      var p = alive[i];

      /* Gentle wander behavior */
      p.vx += Math.sin(frame * p.wax + p.wpx) * 0.003;
      p.vy += Math.cos(frame * p.way + p.wpy) * 0.002;
      p.vx *= 0.995;
      p.vy *= 0.995;

      var spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 0.65) {
        p.vx = (p.vx / spd) * 0.65;
        p.vy = (p.vy / spd) * 0.65;
      }

      p.x += p.vx;
      p.y += p.vy;

      /* Soft boundary push */
      var pad = 35;
      if (p.x < pad) p.vx += 0.03;
      if (p.x > W - pad) p.vx -= 0.03;
      if (p.y < 60) p.vy += 0.03;
      if (p.y > H - 120) p.vy -= 0.03;
    }

    /* Merge checking */
    for (var i = 0; i < alive.length; i++) {
      var p = alive[i];
      if (p.cooldown > 0 || p.isMerged) continue;

      for (var j = i + 1; j < alive.length; j++) {
        var q = alive[j];
        if (q.merged || q.cooldown > 0 || q.isMerged) continue;

        var dx = p.x - q.x, dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var thresh = (getTextW(p) + getTextW(q)) * 0.42 + 20;

        if (dist < thresh) {
          var result = tryMerge(p, q);
          if (result) {
            var nx = (p.x + q.x) / 2, ny = (p.y + q.y) / 2;
            p.merged = true;
            q.merged = true;
            var np = mkParticle(result, '#9FE1CB', 14, nx, ny);
            np.flashT = 55;
            np.isMerged = true;
            np.src1 = p.text;
            np.src2 = q.text;
            np.vx = (p.vx + q.vx) * 0.3;
            np.vy = (p.vy + q.vy) * 0.3;
            np.a = 0.05;
            np.cooldown = 0;
            particles.push(np);
            spawnBurst(nx, ny);
            showToast(result);
            break;
          }
        }
      }
    }

    /* Break handling */
    for (var i = 0; i < particles.length; i++) {
      var pBrk = particles[i];
      if (pBrk.isMerged && pBrk.breakT === 1 && pBrk.src1 && pBrk.src2 && !pBrk.merged) {
        var w1 = poolFind(pBrk.src1);
        var w2 = poolFind(pBrk.src2);
        if (w1 && w2) {
          var ang1 = Math.random() * Math.PI * 2;
          spawnFrom(w1, pBrk.x, pBrk.y, ang1);
          spawnFrom(w2, pBrk.x, pBrk.y, ang1 + Math.PI + (Math.random() - 0.5) * 1.2);
          pBrk.merged = true;
        }
      }
    }

    /* Remove merged particles */
    particles = particles.filter(function (p) { return !p.merged; });

    /* Draw all remaining particles */
    particles.forEach(drawParticle);

    /* Draw burst dots on top */
    updateBursts();
  }

  function tick() {
    loop();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize, { passive: true });
  setTimeout(function () {
    resize();
    tick();
  }, 80);
})();
