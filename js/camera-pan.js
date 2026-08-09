const PAN_DURATION = 1.1;
const PAN_EASE = 'power2.inOut';

let currentMatKey = 'home';

function panTo(matKey, opts) {
  const options = opts || {};
  const mat = document.querySelector(`.mat[data-mat="${matKey}"]`);
  if (!mat) return;

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
