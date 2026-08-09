const HOME_DATA = {
  key: 'home',
  label: 'Home',
  x: 0,
  y: 0,
};

function createHomeMat() {
  const section = document.createElement('section');
  section.className = 'mat';
  section.dataset.mat = HOME_DATA.key;
  section.dataset.x = HOME_DATA.x;
  section.dataset.y = HOME_DATA.y;
  section.style.setProperty('--x', HOME_DATA.x);
  section.style.setProperty('--y', HOME_DATA.y);

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="home-panels">
      <div class="hero-panel">
        <h1 class="hero-name" data-animate="fade-up" data-animate-delay="0.1">
          Mono
          <svg class="hero-underline" width="300" height="10" viewBox="0 0 300 10">
            <line class="draw-line" data-animate-delay="0.45" x1="4" y1="5" x2="296" y2="5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </h1>
        <div class="hero-desc" data-animate="fade-up" data-animate-delay="0.7">Mikel Taopa — BS Management Economics, UPB, Class of 2026–2030. Antipolo City, Rizal.</div>
      </div>
      <div class="about-panel">
        <p class="about-text" data-animate="fade-up" data-animate-delay="0.85">I study Management Economics with one goal: solving real problems with curiosity and intellect. Growing up here taught me grit and resilience — my curiosity asks the hard questions, my education lets me critique and analyze, and my ego convinces me I can build things that matter.</p>
      </div>
    </div>
    <div class="hero-tagwrap">
      <div class="hero-tag" data-animate="fade-up" data-animate-delay="1.05">One problem at a time</div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
