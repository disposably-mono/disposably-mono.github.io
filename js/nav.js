function initNav(matsData) {
  const nav = document.getElementById('nav');

  matsData.forEach((data, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'nav-sep';
      sep.textContent = '|';
      sep.setAttribute('aria-hidden', 'true');
      nav.appendChild(sep);
    }

    const btn = document.createElement('button');
    btn.className = 'nav-link' + (i === 0 ? ' cur' : '');
    btn.dataset.target = data.key;
    btn.textContent = data.label;

    btn.addEventListener('click', () => {
      if (btn.classList.contains('cur')) return;

      nav.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('cur'));
      btn.classList.add('cur');

      panTo(data.key, { onComplete: () => playEntranceAnimation(data.key) });
    });

    nav.appendChild(btn);
  });
}
