const PROJECTS_DATA = {
  key: 'projects',
  label: 'Projects',
  x: 1.2,
  y: -0.4,
  items: [
    { title: 'Halal Finder' },
    { title: 'OLPS Site' },
  ],
};

function createProjectsMat() {
  const section = document.createElement('section');
  section.className = 'mat';
  section.dataset.mat = PROJECTS_DATA.key;
  section.dataset.x = PROJECTS_DATA.x;
  section.dataset.y = PROJECTS_DATA.y;
  section.style.setProperty('--x', PROJECTS_DATA.x);
  section.style.setProperty('--y', PROJECTS_DATA.y);

  const cards = PROJECTS_DATA.items.map((item, i) => `
    <article class="project-card" data-animate="fade-up" data-animate-delay="${(0.1 + i * 0.15).toFixed(2)}">
      <h3 class="project-title">${item.title}</h3>
      <div class="project-grid">
        <div class="project-col">
          <div class="project-block pic">Pic</div>
          <div class="project-block carousel">Carousel of project pics</div>
        </div>
        <div class="project-block skills">Skills / Desc</div>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="projects-row">${cards}</div>
  `;

  buildCuttingMat(section);
  return section;
}
