function playEntranceAnimation(matKey) {
  const mat = document.querySelector(`.mat[data-mat="${matKey}"]`);
  if (!mat) return;

  const fadeEls = mat.querySelectorAll('[data-animate="fade-up"]');
  const drawEls = mat.querySelectorAll('.draw-line');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    gsap.set(fadeEls, { opacity: 1, y: 0 });
    drawEls.forEach((el) => gsap.set(el, { strokeDasharray: 'none', strokeDashoffset: 0 }));
    return;
  }

  gsap.set(fadeEls, { opacity: 0, y: 8 });
  drawEls.forEach((el) => {
    const length = el.getTotalLength();
    gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
  });

  const tl = gsap.timeline();

  fadeEls.forEach((el) => {
    const delay = parseFloat(el.dataset.animateDelay || '0');
    tl.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, delay);
  });

  drawEls.forEach((el) => {
    const delay = parseFloat(el.dataset.animateDelay || '0.45');
    tl.to(el, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, delay);
  });
}
