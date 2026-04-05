/* ============================================================
   data.js — all site content lives here
   Edit this file to update any section of the portfolio.
   No HTML knowledge needed for most updates.
============================================================ */

const DATA = {

  /* ── Identity ── */
  identity: {
    handle:   'Mono',
    name:     'Mikel Taopa',
    age:      '17 years old',
    course:   'Computer Science',
    location: 'Antipolo City, Rizal',
    eyebrow:  'CS Student · Builder in progress',
    tagline:  'One problem at a time.',
    taglineSub: 'Currently: all of them.',
    ctaLine:  "I'm here. No one can stop me.",
    email:    'mikel.taopa@gmail.com',
    phone:    '+639614436758',
    phoneDisplay: '+63 961 443 6758',
  },

  /* ── Social / quick links ── */
  links: {
    github:    'https://github.com/disposably-mono',
    linkedin:  'https://www.linkedin.com/in/mikel-taopa-a86205359/',
    instagram: 'https://www.instagram.com/disposablymono/',
    facebook:  'https://www.facebook.com/',
    resume:    '/resume.pdf',
  },

  /* ── About bio — each string is one paragraph ── */
  bio: [
    "Hey — I'm Mono. I'm an incoming CS freshman with a curiosity for building things that are simple, useful, and well-made. I'm drawn to the intersection of web and AI, though honestly I'm still figuring out exactly where I want to go.",
    "What drives me is finding the simplest solution to a hard problem. I like the moment when something clicks — when 50 lines becomes 10, or when an idea that seemed vague suddenly has a clear shape.",
    "Currently: studying CS, building in public, and learning as fast as I can.",
  ],

  /* ── Status rows in the About card ── */
  status: [
    { label: 'Currently', value: 'Freshman @ [Your University]',   active: true  },
    { label: 'Previously', value: 'Alumni @ Our Lady of Peace School', active: false },
  ],

  /* ── Skills — add/remove tags freely ── */
  skills: [
    {
      group: 'Languages',
      tags: ['Python', 'JavaScript', 'HTML', 'CSS'],
      exploring: false,
    },
    {
      group: 'Tools',
      tags: ['Git', 'VS Code', 'Terminal'],
      exploring: false,
    },
    {
      group: 'Exploring',
      tags: ['React', 'SQL', 'ML / NumPy', 'Node.js'],
      exploring: true,
    },
  ],

  /* ── Projects ── */
  /* tags: used for filter buttons — must match filter values: 'web', 'ai', 'tools' */
  projects: [
    {
      title:       '[Project Name]',
      description: 'A brief description of what this project does, the problem it solves, and what made it interesting to build.',
      learned:     'The most interesting thing I learned building this was...',
      tags:        ['web'],
      stack:       ['HTML', 'CSS', 'JavaScript'],
      liveUrl:     '#',
      repoUrl:     '#',
      featured:    true,
    },
    /* Add more projects here — copy the object above */
  ],

  /* ── Learning ticker ── */
  /* type: 'Course' | 'Book' | 'Topic' | 'Framework' | 'Tool' */
  /* dot: 'accent' | 'highlight' | 'grey' — controls the dot color */
  learning: [
    { type: 'Course',    title: '[Course Name]',               source: '[Platform / University]', dot: 'accent'    },
    { type: 'Book',      title: '[Book Title]',                source: '[Author]',                dot: 'highlight' },
    { type: 'Topic',     title: 'Machine Learning basics',     source: 'Self-directed',           dot: 'grey'      },
    { type: 'Topic',     title: 'Data structures & algorithms',source: 'Self-directed',           dot: 'accent'    },
    { type: 'Framework', title: 'React fundamentals',          source: 'docs.react.dev',          dot: 'highlight' },
  ],

  /* ── Notes / blog ── */
  notes: [
    { title: '[Post title — what you learned, observed, or built]', date: 'Summer 2025', url: '#' },
    { title: '[Another post]',                                       date: 'Summer 2025', url: '#' },
  ],

  /* ── Particle words — the hero background ── */
  particleWords: [
    { text: 'creator',          col: '#588157', size: 13 },
    { text: 'builder',          col: '#EAF0CE', size: 13 },
    { text: 'student',          col: '#8D99AE', size: 12 },
    { text: 'curious',          col: '#E5D4ED', size: 12 },
    { text: 'learning',         col: '#588157', size: 12 },
    { text: 'coder',            col: '#8D99AE', size: 12 },
    { text: 'late nights',      col: '#E5D4ED', size: 11 },
    { text: 'thinker',          col: '#EAF0CE', size: 12 },
    { text: 'maker',            col: '#588157', size: 13 },
    { text: 'explorer',         col: '#8D99AE', size: 11 },
    { text: 'debugger',         col: '#E5D4ED', size: 11 },
    { text: 'dreamer',          col: '#EAF0CE', size: 12 },
    { text: 'problem solver',   col: '#588157', size: 11 },
    { text: 'freshman',         col: '#8D99AE', size: 11 },
    { text: 'grower',           col: '#E5D4ED', size: 12 },
    { text: 'hacker',           col: '#EAF0CE', size: 12 },
    { text: 'overthinker',      col: '#E5D4ED', size: 11 },
    { text: 'minimalist',       col: '#8D99AE', size: 12 },
    { text: 'night owl',        col: '#EAF0CE', size: 11 },
    { text: 'self-taught',      col: '#588157', size: 12 },
    { text: 'Filipino',         col: '#E5D4ED', size: 12 },
    { text: 'simplifier',       col: '#EAF0CE', size: 12 },
    { text: 'always asking',    col: '#8D99AE', size: 11 },
    { text: 'bug chaser',       col: '#588157', size: 11 },
    { text: 'keyboard warrior', col: '#E5D4ED', size: 11 },
    { text: 'still figuring',   col: '#8D99AE', size: 11 },
    { text: 'web curious',      col: '#EAF0CE', size: 11 },
    { text: 'ai enthusiast',    col: '#588157', size: 11 },
    { text: 'notion addict',    col: '#8D99AE', size: 11 },
    { text: 'reader',           col: '#E5D4ED', size: 12 },
    { text: 'shipping soon',    col: '#588157', size: 11 },
    { text: 'iteration',        col: '#EAF0CE', size: 12 },
  ],

  /* ── Particle merge pairs ── */
  /* ['word1', 'word2', 'result when they collide'] */
  particleMerges: [
    ['curious',       'builder',       'curious builder'],
    ['student',       'late nights',   'learning the hard way'],
    ['creator',       'coder',         'creative technologist'],
    ['thinker',       'maker',         'thoughtful maker'],
    ['dreamer',       'builder',       'builder of dreams'],
    ['explorer',      'debugger',      'bug hunter'],
    ['maker',         'hacker',        'maker-hacker'],
    ['problem solver','coder',         'elegant engineer'],
    ['curious',       'explorer',      'endlessly curious'],
    ['creator',       'dreamer',       'visionary creator'],
    ['freshman',      'late nights',   'first year grind'],
    ['grower',        'learning',      'always growing'],
    ['night owl',     'coder',         'midnight coder'],
    ['Filipino',      'builder',       'building from Antipolo'],
    ['minimalist',    'coder',         'clean code only'],
    ['self-taught',   'curious',       'relentlessly self-taught'],
    ['overthinker',   'builder',       'think then build'],
    ['ai enthusiast', 'curious',       'chasing intelligence'],
    ['reader',        'thinker',       'read to build'],
    ['shipping soon', 'builder',       'shipping is learning'],
    ['simplifier',    'problem solver','elegantly simple'],
    ['iteration',     'grower',        'improve every loop'],
  ],

};
