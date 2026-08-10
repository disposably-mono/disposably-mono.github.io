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
    <img class="mat-accessory mat-accessory--scissors" src="public/accessories/scissors.png" alt="" aria-hidden="true">
    <img class="mat-accessory mat-accessory--highlighter" src="public/accessories/highlighter.png" alt="" aria-hidden="true">
    <img class="mat-accessory mat-accessory--protractor" src="public/accessories/protractor.png" alt="" aria-hidden="true">
    <img class="mat-accessory mat-accessory--marker" src="public/accessories/marker.png" alt="" aria-hidden="true">
    <div class="home-panels home-portrait">
      <p class="hero-identity" data-animate="fade-up" data-animate-delay="0.1">Mikel Taopa | Antipolo City, Rizal<br>UPB '26-'30 - B.S. Management Economics</p>
      <h1 class="hero-name" data-animate="fade-up" data-animate-delay="0.3">
        Mono
        <svg class="hero-underline" width="300" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
          <line class="draw-line" data-animate-delay="0.5" x1="4" y1="5" x2="296" y2="5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </h1>
      <p class="hero-statement" data-animate="fade-up" data-animate-delay="0.7">I'm a student based in the Philippines with the curiosity to ask the hard questions and the grit to persevere through hardship. Growing up here taught me two important lessons: 1. Life is never easy and 2. I am someone capable of great change. My blend of curiosity, intellect, resilience and upbringing make me someone who builds for the betterment of all.</p>
      <div class="hero-tagwrap" data-animate="fade-up" data-animate-delay="0.9">
        <div class="hero-tag">One problem at a time</div>
      </div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
