const PAN_DURATION = 1.1;
const PAN_EASE = 'power2.inOut';

function panTo(matKey, opts) {
  const options = opts || {};
  const mat = document.querySelector(`.mat[data-mat="${matKey}"]`);
  if (!mat) return;

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

window.panTo = panTo;
