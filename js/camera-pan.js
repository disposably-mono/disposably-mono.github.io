const PAN_DURATION = 1.1;
const PAN_EASE = 'power2.inOut';

let currentMatKey = 'home';

function hideSwipeHint() {
  var hint = document.querySelector('.swipe-hint');
  if (hint) hint.classList.add('is-hidden');
}

function panTo(matKey, opts) {
  const options = opts || {};
  const mat = document.querySelector(`.mat[data-mat="${matKey}"]`);
  if (!mat) return;

  hideSwipeHint();
  currentMatKey = matKey;

  const x = parseFloat(mat.dataset.x);
  const y = parseFloat(mat.dataset.y);
  const targetX = -x * window.innerWidth;
  const targetY = -y * window.innerHeight;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    gsap.set('#desk', { x: targetX, y: targetY });
    if (options.onComplete) options.onComplete();
    return;
  }

  gsap.to('#desk', {
    x: targetX,
    y: targetY,
    duration: PAN_DURATION,
    ease: PAN_EASE,
    onComplete: options.onComplete,
  });
}

// Instantly re-applies the desk translate for the currently active mat,
// recomputed against the CURRENT viewport size, without animating. Used on
// resize so the camera doesn't desync from `.mat` elements (positioned in
// vw/vh) after `panTo`'s cached pixel translate goes stale.
function snapToCurrentMat() {
  if (!currentMatKey) return;
  const mat = document.querySelector(`.mat[data-mat="${currentMatKey}"]`);
  if (!mat) return;

  const x = parseFloat(mat.dataset.x);
  const y = parseFloat(mat.dataset.y);
  gsap.set('#desk', { x: -x * window.innerWidth, y: -y * window.innerHeight });
}

window.panTo = panTo;
window.snapToCurrentMat = snapToCurrentMat;

(function initMobileSwipe() {
  var viewport = document.getElementById('viewport');
  if (!viewport) return;

  var matOrder = ['home', 'projects', 'contact'];
  var touchStartX = 0;
  var touchStartY = 0;
  var tracking = false;

  viewport.addEventListener('touchstart', function (e) {
    if (e.target.closest('.projects-row, .project-sheet, .contact-screen, .contact-tablet')) return;
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
    tracking = true;
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (!tracking) return;
    var dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
    var dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
    if (dy > dx) tracking = false;
  }, { passive: true });

  viewport.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;

    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 60) return;

    var idx = matOrder.indexOf(currentMatKey);
    var next = dx < 0 ? idx + 1 : idx - 1;
    if (next < 0 || next >= matOrder.length) return;

    var targetKey = matOrder[next];
    var nav = document.getElementById('nav');
    nav.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('cur'); });
    var btn = nav.querySelector('[data-target="' + targetKey + '"]');
    if (btn) btn.classList.add('cur');

    nav.classList.add('is-panning');
    panTo(targetKey, {
      onComplete: function () { nav.classList.remove('is-panning'); },
    });
  }, { passive: true });
})();
