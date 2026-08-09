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
      media: [
        { caption: 'Home screen' },
        { caption: 'Search & filters' },
        { caption: 'Restaurant detail' },
        { caption: 'Map view' },
      ],
    },
    {
      title: 'OLPS Site',
      openSource: false,
      deployUrl: '#',
      githubUrl: null,
      description: 'Parish website redesign with an events calendar, bulletin archive, and a donation portal.',
      skills: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
      media: [
        { caption: 'Homepage' },
        { caption: 'Events calendar' },
        { caption: 'Bulletin archive' },
        { caption: 'Donation portal' },
      ],
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
    const openTag = item.openSource
      ? `(<a class="project-tag open" href="${item.githubUrl}" target="_blank" rel="noopener">Open Source</a>)`
      : `(<span class="project-tag closed">Closed Source</span>)`;
    const deployTag = item.deployUrl
      ? `(<a class="project-tag deploy" href="${item.deployUrl}" target="_blank" rel="noopener">Deployment</a>)`
      : '';
    const skills = item.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join('');
    const prevHidden = i === 0 ? ' is-hidden' : '';
    const nextHidden = i === items.length - 1 ? ' is-hidden' : '';
    const [mainMedia, ...thumbMedia] = item.media;

    const thumbs = thumbMedia.map((m) => `
      <div class="media-card thumb" tabindex="0" role="button" aria-label="Show ${m.caption}">
        <div class="media-pic">Pic</div>
        <div class="media-caption">${m.caption}</div>
      </div>
    `).join('');

    return `
      <article class="project-card" data-animate="fade-up" data-animate-delay="${delay}">
        <div class="project-sheet">
          <div class="project-header">
            <h2 class="project-title">${item.title}</h2>
            <div class="project-tags">${openTag} ${deployTag}</div>
          </div>
          <div class="project-body">
            <div class="project-media">
              <div class="media-card main">
                <div class="media-pic">Pic</div>
                <div class="media-caption">${mainMedia.caption}</div>
              </div>
              <div class="project-thumbs">${thumbs}</div>
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
  wireMediaSwap(section);
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

function wireMediaSwap(section) {
  section.querySelectorAll('.project-media').forEach((mediaEl) => {
    const mainCard = mediaEl.querySelector('.media-card.main');

    mediaEl.querySelectorAll('.media-card.thumb').forEach((thumbCard) => {
      const activate = () => swapMediaCards(mainCard, thumbCard);
      thumbCard.addEventListener('click', activate);
      thumbCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  });
}

function swapMediaCards(mainCard, thumbCard) {
  if (mainCard.dataset.animating === '1' || thumbCard.dataset.animating === '1') return;
  if (typeof gsap === 'undefined') return;

  const mainRect = mainCard.getBoundingClientRect();
  const thumbRect = thumbCard.getBoundingClientRect();

  const mainCaption = mainCard.querySelector('.media-caption');
  const thumbCaption = thumbCard.querySelector('.media-caption');
  const swapText = mainCaption.textContent;
  mainCaption.textContent = thumbCaption.textContent;
  thumbCaption.textContent = swapText;

  mainCard.dataset.animating = '1';
  thumbCard.dataset.animating = '1';
  mainCard.style.zIndex = 5;
  thumbCard.style.zIndex = 5;

  gsap.fromTo(mainCard, {
    x: thumbRect.left - mainRect.left,
    y: thumbRect.top - mainRect.top,
    scaleX: thumbRect.width / mainRect.width,
    scaleY: thumbRect.height / mainRect.height,
    transformOrigin: 'top left',
  }, {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration: 0.55,
    ease: 'power2.inOut',
    onComplete: () => {
      mainCard.dataset.animating = '0';
      mainCard.style.zIndex = '';
    },
  });

  gsap.fromTo(thumbCard, {
    x: mainRect.left - thumbRect.left,
    y: mainRect.top - thumbRect.top,
    scaleX: mainRect.width / thumbRect.width,
    scaleY: mainRect.height / thumbRect.height,
    transformOrigin: 'top left',
  }, {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration: 0.55,
    ease: 'power2.inOut',
    onComplete: () => {
      thumbCard.dataset.animating = '0';
      thumbCard.style.zIndex = '';
    },
  });
}
