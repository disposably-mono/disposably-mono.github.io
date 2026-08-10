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
      <div class="hero-zone hero-zone--topleft">
        <h1 class="hero-name" data-animate="fade-up" data-animate-delay="0.1">
          Mono
          <svg class="hero-underline" width="300" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
            <line class="draw-line" data-animate-delay="0.35" x1="4" y1="5" x2="296" y2="5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </h1>
      </div>
      <div class="hero-zone hero-zone--topright">
        <div class="hero-oneliner" data-animate="fade-up" data-animate-delay="0.4">Mikel Taopa — BS Management Economics, UPB '26–'30. Antipolo City, Rizal.</div>
      </div>
      <div class="hero-zone hero-zone--bottomleft">
        <p class="about-text" data-animate="fade-up" data-animate-delay="0.7">I study Management Economics to solve real problems with curiosity and intellect. Growing up here taught me grit — curiosity asks the hard questions, education sharpens the critique, and ego convinces me I can build things that matter.</p>
      </div>
      <div class="hero-zone hero-zone--bottomright">
        <div class="hero-tagwrap" data-animate="fade-up" data-animate-delay="1.0">
          <div class="hero-tag">One problem at a time</div>
        </div>
      </div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
