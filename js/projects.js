const STACK_MAX_ITEMS = 10;
const STACK_TWO_COL_THRESHOLD = 5;

const PROJECTS_DATA = {
  key: 'projects',
  label: 'Projects',
  x: 1.2,
  y: -0.4,
  items: [
    {
      title: 'halal.',
      openSource: true,
      deployUrl: null,
      githubUrl: 'https://github.com/disposably-mono/halal.',
      description: 'A school election platform built for the OLPS Commission on Elections — covering the full election lifecycle from candidate and voter setup to anonymous ballots, live turnout, and certified results.',
      skills: [
        { label: 'Framework', value: 'Next.js 16' },
        { label: 'Language', value: 'TypeScript' },
        { label: 'Database', value: 'PostgreSQL 16' },
        { label: 'ORM', value: 'Prisma 7' },
        { label: 'Auth', value: 'Auth.js' },
      ],
      media: [
        { src: 'public/projects/halal/hero.png', caption: 'Voter homepage' },
        { src: 'public/projects/halal/ballot.png', caption: 'Official ballot' },
        { src: 'public/projects/halal/monitor.png', caption: 'Live results monitor' },
        { src: 'public/projects/halal/control.png', caption: 'Election control panel' },
      ],
    },
    {
      title: 'Mnemo',
      openSource: true,
      deployUrl: null,
      githubUrl: 'https://github.com/disposably-mono/Mnemo-Skill',
      description: 'A Claude Code skill and Python toolkit that turns study material into source-grounded Anki flashcards — planning learning objectives before generating cloze, basic, and image-occlusion cards, then importing them straight into Anki.',
      skills: [
        { label: 'Type', value: 'Claude Code Skill' },
        { label: 'Language', value: 'Python' },
        { label: 'Integration', value: 'AnkiConnect' },
        { label: 'Fallback', value: 'genanki (.apkg)' },
        { label: 'Testing', value: 'Pytest' },
      ],
      media: [
        { src: 'public/projects/mnemo/pipeline.svg', caption: 'Ingest → generate → import pipeline' },
        { src: 'public/projects/mnemo/terminal-ingest.svg', caption: 'mnemo-ingest' },
        { src: 'public/projects/mnemo/terminal-generate.svg', caption: 'mnemo-generate' },
        { src: 'public/projects/mnemo/terminal-import.svg', caption: 'mnemo-import' },
      ],
    },
  ],
};

function buildStackTable(rawSkills) {
  const skills = rawSkills.slice(0, STACK_MAX_ITEMS);
  const twoCol = skills.length > STACK_TWO_COL_THRESHOLD;

  if (!twoCol) {
    const rows = skills.map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('');
    return `<table class="stack-table"><tbody>${rows}</tbody></table>`;
  }

  const rows = [];
  for (let i = 0; i < skills.length; i += 2) {
    const a = skills[i];
    const b = skills[i + 1];
    rows.push(`
      <tr>
        <td>${a.label}</td>
        <td>${a.value}</td>
        <td class="stack-pair">${b ? b.label : ''}</td>
        <td>${b ? b.value : ''}</td>
      </tr>
    `);
  }
  return `<table class="stack-table two-col"><tbody>${rows.join('')}</tbody></table>`;
}

function mediaPicMarkup(m) {
  return m.src ? `<img class="media-img" src="${m.src}" alt="${m.caption}" loading="lazy">` : 'Pic';
}

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
    const stackTable = buildStackTable(item.skills);
    const prevHidden = i === 0 ? ' is-hidden' : '';
    const nextHidden = i === items.length - 1 ? ' is-hidden' : '';
    const [mainMedia, ...thumbMedia] = item.media;

    const thumbs = thumbMedia.map((m) => `
      <div class="media-card thumb" tabindex="0" role="button" aria-label="Show ${m.caption}">
        <div class="media-pic">${mediaPicMarkup(m)}</div>
        <div class="media-caption">${m.caption}</div>
      </div>
    `).join('');

    return `
      <article class="project-card" data-animate="fade-up" data-animate-delay="${delay}">
        <div class="project-sheet">
          <div class="project-header">
            <h2 class="project-title">Project ${i + 1}: ${item.title}</h2>
            <div class="project-tags">${openTag} ${deployTag}</div>
          </div>
          <div class="project-body">
            <div class="project-media">
              <div class="media-card main">
                <div class="media-pic">${mediaPicMarkup(mainMedia)}</div>
                <div class="media-caption">${mainMedia.caption}</div>
              </div>
              <div class="project-thumbs">${thumbs}</div>
            </div>
            <div class="project-info">
              <div class="info-card description">
                <div class="info-card-title">Description</div>
                <div class="info-card-body">
                  <p class="project-desc">${item.description}</p>
                </div>
              </div>
              <div class="info-card stack">
                <div class="info-card-title">Stack</div>
                <div class="info-card-body">${stackTable}</div>
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

  const mainPic = mainCard.querySelector('.media-pic');
  const thumbPic = thumbCard.querySelector('.media-pic');
  const swapPic = mainPic.innerHTML;
  mainPic.innerHTML = thumbPic.innerHTML;
  thumbPic.innerHTML = swapPic;

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
