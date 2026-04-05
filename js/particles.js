    /* ── Hero word-particle canvas — autonomous drift/merge/break ── */
    (function() {
      var canvas = document.getElementById('hero-canvas');
      var ctx    = canvas.getContext('2d');
      var toast  = document.getElementById('merge-toast');
      var W, H, particles;
      var toastTimer = null;
      var frame = 0;

      /* read from data.js — edit particleWords and particleMerges there */
      var WORDS  = DATA.particleWords;
      var MERGES = DATA.particleMerges;

      /* source pool — words that have been merged out get returned here */
      var POOL = WORDS.map(function(w) { return { text: w.text, col: w.col, size: w.size }; });

      function showToast(txt) {
        toast.textContent = '"' + txt + '"';
        toast.style.opacity = '1';
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function() { toast.style.opacity = '0'; }, 2600);
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

      /* gentle sinusoidal drift — each word has its own phase & amplitude */
      function mkParticle(text, col, size, x, y) {
        var spd = 0.18 + Math.random() * 0.22;
        var ang = Math.random() * Math.PI * 2;
        return {
          text: text, col: col, size: size,
          x: x !== undefined ? x : 60 + Math.random() * (W - 120),
          y: y !== undefined ? y : 80 + Math.random() * (H - 200),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          /* sinusoidal wandering */
          wax: 0.008 + Math.random() * 0.012,  /* wander x amplitude */
          way: 0.006 + Math.random() * 0.010,
          wpx: Math.random() * Math.PI * 2,    /* wander x phase */
          wpy: Math.random() * Math.PI * 2,
          a:   Math.random() * 0.25 + 0.25,
          merged: false,
          flashT: 0,
          breakT: 0,        /* countdown until break check */
          isMerged: false,  /* was this born from a merge? */
          src1: null, src2: null, /* original word texts to return to pool */
        };
      }

      function getTextW(p) {
        ctx.font = p.size + "px 'Outfit', sans-serif";
        return ctx.measureText(p.text).width;
      }

      function tryMerge(a, b) {
        for (var i = 0; i < MERGES.length; i++) {
          var m = MERGES[i];
          if ((a.text === m[0] && b.text === m[1]) || (a.text === m[1] && b.text === m[0])) return m[2];
        }
        return null;
      }

      /* find a word in the pool by text */
      function poolFind(txt) {
        for (var i = 0; i < POOL.length; i++) {
          if (POOL[i].text === txt) return POOL[i];
        }
        return null;
      }

      /* spawn a particle from pool at a given position, drifting apart */
      function spawnFrom(poolWord, x, y, angle) {
        var p = mkParticle(poolWord.text, poolWord.col, poolWord.size, x, y);
        var spd = 0.3 + Math.random() * 0.2;
        p.vx = Math.cos(angle) * spd;
        p.vy = Math.sin(angle) * spd;
        p.flashT = 20;
        particles.push(p);
      }

      function initParticles() {
        particles = [];
        /* start with a random subset so the field isn't too crowded */
        var chosen = WORDS.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 22);
        chosen.forEach(function(w) {
          particles.push(mkParticle(w.text, w.col, w.size));
        });
      }

      /* occasionally inject a missing word back into the field */
      function maybeInject() {
        if (particles.length >= 26) return;
        var active = {};
        particles.forEach(function(p) {
          active[p.text] = true;
          if (p.src1) active[p.src1] = true;
          if (p.src2) active[p.src2] = true;
        });
        var missing = POOL.filter(function(w) { return !active[w.text]; });
        if (!missing.length) return;
        var w = missing[Math.floor(Math.random() * missing.length)];
        /* fade in from a random edge */
        var ex = Math.random() < 0.5 ? 60 : W - 60;
        var ey = 80 + Math.random() * (H - 220);
        var p = mkParticle(w.text, w.col, w.size, ex, ey);
        p.a = 0.05; /* start faint, ramp up */
        particles.push(p);
      }

      function resize() {
        var r = canvas.getBoundingClientRect();
        W = canvas.width  = r.width;
        H = canvas.height = r.height;
        if (!particles) { initParticles(); return; }
        particles.forEach(function(p) {
          p.x = Math.max(60, Math.min(W - 60, p.x));
          p.y = Math.max(80, Math.min(H - 150, p.y));
        });
      }

      function loop() {
        frame++;
        ctx.clearRect(0, 0, W, H);

        /* inject missing words occasionally */
        if (frame % 280 === 0) maybeInject();

        var alive = particles.filter(function(p) { return !p.merged; });

        for (var i = 0; i < alive.length; i++) {
          var p = alive[i];

          if (p.flashT > 0) p.flashT--;
          if (p.breakT > 0) p.breakT--;

          /* ramp alpha up gently if new */
          if (p.a < (p.isMerged ? 0.7 : 0.5)) p.a = Math.min(p.isMerged ? 0.7 : 0.5, p.a + 0.003);

          /* sinusoidal wander — adds organic feel without momentum buildup */
          p.vx += Math.sin(frame * p.wax + p.wpx) * 0.004;
          p.vy += Math.cos(frame * p.way + p.wpy) * 0.003;

          /* gentle damping to prevent runaway speed */
          p.vx *= 0.992;
          p.vy *= 0.992;

          /* clamp max speed */
          var spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 0.55) { p.vx = (p.vx / spd) * 0.55; p.vy = (p.vy / spd) * 0.55; }

          p.x += p.vx;
          p.y += p.vy;

          /* soft boundary — gentle push back, no hard bounce */
          var pad = 50;
          if (p.x < pad)     p.vx += 0.04;
          if (p.x > W - pad) p.vx -= 0.04;
          if (p.y < 75)      p.vy += 0.04;
          if (p.y > H - 140) p.vy -= 0.04;

          /* ── auto-break merged words ── */
          if (p.isMerged && p.breakT === 0) {
            /* random lifetime: 6–14 seconds at ~60fps */
            p.breakT = Math.floor((6 + Math.random() * 8) * 60);
          }
          if (p.isMerged && p.breakT === 1 && p.src1 && p.src2) {
            var w1 = poolFind(p.src1), w2 = poolFind(p.src2);
            if (w1 && w2) {
              p.merged = true;
              var ang1 = Math.random() * Math.PI * 2;
              spawnFrom(w1, p.x, p.y, ang1);
              spawnFrom(w2, p.x, p.y, ang1 + Math.PI + (Math.random() - 0.5) * 1.2);
            }
          }

          /* ── merge check ── */
          for (var j = i + 1; j < alive.length; j++) {
            var q = alive[j];
            if (q.merged) continue;
            var dx = p.x - q.x, dy = p.y - q.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var thresh = (getTextW(p) + getTextW(q)) * 0.28 + 8;
            if (dist < thresh) {
              var result = tryMerge(p, q);
              if (result) {
                var nx = (p.x + q.x) / 2, ny = (p.y + q.y) / 2;
                p.merged = true; q.merged = true;
                var np = mkParticle(result, '#9FE1CB', 13, nx, ny);
                np.flashT = 55;
                np.isMerged = true;
                np.src1 = p.text;
                np.src2 = q.text;
                np.vx = (p.vx + q.vx) * 0.2;
                np.vy = (p.vy + q.vy) * 0.2;
                np.a = 0.05;
                particles.push(np);
                showToast(result);
              }
            }
          }
        }

        particles = particles.filter(function(p) { return !p.merged; });

        /* draw */
        particles.forEach(function(p) {
          var alpha = p.flashT > 0 ? Math.min(0.9, p.a + (p.flashT / 55) * 0.4) : p.a;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font         = p.size + "px 'Outfit', sans-serif";
          ctx.fillStyle    = p.flashT > 0 ? '#9FE1CB' : wordColor(p.col);
          ctx.textAlign    = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.text, p.x, p.y);
          ctx.restore();
        });
      }

      function tick() {
        loop();
        requestAnimationFrame(tick);
      }

      window.addEventListener('resize', resize, { passive: true });
      setTimeout(function() { resize(); tick(); }, 80);
    })();

