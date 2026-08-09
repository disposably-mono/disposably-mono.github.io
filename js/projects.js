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

const ARROW_ICON = `
  <svg class="scribble-arrow-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M52 30c-10 1-19 3-28 6-4 1.5-7 3-10 5" stroke="#151515" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 34c-9 1-18 3-26 6-3 1-6 2-9 4" stroke="#151515" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <path d="M24 27c-5 3-9 6-12 10" stroke="#151515" stroke-width="3" stroke-linecap="round"/>
    <path d="M24 43c-5-3-9-6-12-10" stroke="#151515" stroke-width="3" stroke-linecap="round"/>
  </svg>
`;

function createProjectsMat() {
  const section = document.createElement('section');
  section.className = 'mat';
  section.dataset.mat = PROJECTS_DATA.key;
  section.dataset.x = PROJECTS_DATA.x;
  section.dataset.y = PROJECTS_DATA.y;
  section.style.setProperty('--x', PROJECTS_DATA.x);
  section.style.setProperty('--y', PROJECTS_DATA.y);

  const cards = PROJECTS_DATA.items.map((item, i) => {
    const delay = (0.1 + i * 0.15).toFixed(2);
    const badge = `<span class="project-badge ${item.openSource ? 'open' : 'closed'}">${item.openSource ? 'Open Source' : 'Closed Source'}</span>`;
    const deployLink = item.deployUrl
      ? `<a class="project-link" href="${item.deployUrl}" target="_blank" rel="noopener">Deploy ↗</a>`
      : '';
    const githubLink = item.githubUrl
      ? `<a class="project-link" href="${item.githubUrl}" target="_blank" rel="noopener">GitHub ↗</a>`
      : '';
    const skills = item.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join('');

    return `
      <article class="project-card" data-animate="fade-up" data-animate-delay="${delay}">
        <div class="project-sheet">
          <div class="project-header">
            <h2 class="project-title">${item.title}</h2>
            <div class="project-meta">
              ${badge}
              ${deployLink}
              ${githubLink}
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
        </div>
      </article>
    `;
  }).join('');

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="projects-row">${cards}</div>
    <button type="button" class="project-nav-arrow prev" aria-label="Previous project">${ARROW_ICON}</button>
    <button type="button" class="project-nav-arrow next" aria-label="Next project">${ARROW_ICON}</button>
  `;

  buildCuttingMat(section);
  wireProjectsNav(section);
  return section;
}

function wireProjectsNav(section) {
  const row = section.querySelector('.projects-row');
  const prevBtn = section.querySelector('.project-nav-arrow.prev');
  const nextBtn = section.querySelector('.project-nav-arrow.next');

  const updateArrows = () => {
    const max = row.scrollWidth - row.clientWidth;
    prevBtn.classList.toggle('is-hidden', row.scrollLeft <= 4);
    nextBtn.classList.toggle('is-hidden', row.scrollLeft >= max - 4);
  };

  prevBtn.addEventListener('click', () => {
    row.scrollBy({ left: -row.clientWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    row.scrollBy({ left: row.clientWidth, behavior: 'smooth' });
  });

  row.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  requestAnimationFrame(updateArrows);
}
