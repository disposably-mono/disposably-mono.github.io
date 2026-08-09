const PROJECTS_DATA = {
  key: 'projects',
  label: 'Projects',
  x: 1.2,
  y: -0.4,
  items: [
    {
      title: 'Halal Finder',
      openSource: true,
      deployUrl: '#',
      githubUrl: '#',
      description: 'A directory app for finding halal-certified restaurants nearby, with filters for cuisine and distance.',
      skills: ['React Native', 'Node.js', 'PostgreSQL'],
    },
    {
      title: 'OLPS Site',
      openSource: false,
      deployUrl: '#',
      githubUrl: null,
      description: 'Parish website redesign with an events calendar, bulletin archive, and a donation portal.',
      skills: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
    },
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

  const items = PROJECTS_DATA.items;

  const cards = items.map((item, i) => {
    const delay = (0.1 + i * 0.15).toFixed(2);
    const badge = item.openSource
      ? `<a class="project-badge open" href="${item.githubUrl}" target="_blank" rel="noopener">Open Source</a>`
      : `<span class="project-badge closed">Closed Source</span>`;
    const deployPill = item.deployUrl
      ? `<a class="project-badge deploy" href="${item.deployUrl}" target="_blank" rel="noopener">Deployment ↗</a>`
      : '';
    const skills = item.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join('');
    const prevHidden = i === 0 ? ' is-hidden' : '';
    const nextHidden = i === items.length - 1 ? ' is-hidden' : '';

    return `
      <article class="project-card" data-animate="fade-up" data-animate-delay="${delay}">
        <div class="project-sheet">
          <div class="project-header">
            <h2 class="project-title">${item.title}</h2>
            <div class="project-pills">
              ${badge}
              ${deployPill}
            </div>
          </div>
          <div class="project-body">
            <div class="project-media">
              <div class="project-pic">Main Picture</div>
              <div class="project-carousel">
                <div class="carousel-thumb"></div>
                <div class="carousel-thumb"></div>
                <div class="carousel-thumb"></div>
              </div>
            </div>
            <div class="project-info">
              <p class="project-desc">${item.description}</p>
              <div class="project-skills">
                <span class="project-skills-label">Skills</span>
                <div class="project-skills-chips">${skills}</div>
              </div>
            </div>
          </div>
          <button type="button" class="sheet-nav prev${prevHidden}" data-dir="prev">&larr; Previous project</button>
          <button type="button" class="sheet-nav next${nextHidden}" data-dir="next">Next project &rarr;</button>
        </div>
      </article>
    `;
  }).join('');

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="projects-row">${cards}</div>
  `;

  buildCuttingMat(section);
  wireProjectsNav(section);
  return section;
}

function wireProjectsNav(section) {
  const row = section.querySelector('.projects-row');

  row.addEventListener('click', (e) => {
    const btn = e.target.closest('.sheet-nav');
    if (!btn || btn.classList.contains('is-hidden')) return;

    const dir = btn.dataset.dir === 'next' ? 1 : -1;
    row.scrollBy({ left: dir * row.clientWidth, behavior: 'smooth' });
  });
}
