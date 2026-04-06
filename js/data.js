const DATA = {
  /* ── Meta ── */
  meta: {
    title: 'Mono — Portfolio',
    description: 'One problem at a time. CS student, builder-in-progress.',
    ogTitle: 'Mono — Portfolio',
    ogDesc: 'CS student and builder-in-progress.'
  },

  /* ── Nav ── */
  nav: {
    logo: 'M',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#projects' },
      { label: 'Learning', href: '#learning' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  /* ── Sections ── */
  sections: {
    about: { num: '01', label: 'About' },
    skills: { num: '02', label: 'Skills & Tools' },
    projects: { num: '03', label: 'Projects' },
    learning: { num: '04', label: 'Currently Learning' },
    notes: { num: '05', label: 'Notes' },
  },

  projectFilters: [
    { label: 'All', value: 'all' },
    { label: 'WebDev', value: 'web' },
    { label: 'GameDev', value: 'game' },
    { label: 'AI / ML', value: 'ai' },
    { label: 'Utils', value: 'util' },
  ],

  /* ── Identity ── */
  identity: {
    handle: 'Mono',
    name: 'Mikel Taopa',
    age: '17 years old',
    course: 'Computer Science',
    location: 'Antipolo City, Rizal',
    eyebrow: 'CS Student · Builder in progress',
    tagline: 'One problem at a time.',
    taglineSub: 'Currently: all of them.',
    ctaLine: "I'm here. No one can stop me.",
    hintText: '↑ words drift and merge on their own',
    email: 'mikel.taopa@gmail.com',
    phone: '+639614436758',
    phoneDisplay: '+63 961 443 6758',
    contactHeadline: "Let's talk.",
    contactSub: 'Always open to interesting conversations, collaborations, and opportunities.',
    footerText: 'Built from scratch.',
  },

  links: {
    github: 'https://github.com/disposably-mono',
    linkedin: 'https://www.linkedin.com/in/mikel-taopa-a86205359/',
    instagram: 'https://www.instagram.com/disposablymono/',
    facebook: 'https://www.facebook.com/MikelTaopa',
    resume: 'assets/resume.pdf',
  },

  bio: [
    "Hey — I'm Mono. I'm an incoming CS freshman with a curiosity for building things that are simple, useful, and well-made. I'm drawn to the intersection of web and AI, though honestly I'm still figuring out exactly where I want to go.",
    "What drives me is finding the simplest solution to a hard problem. I like the moment when something clicks — when 50 lines becomes 10, or when an idea that seemed vague suddenly has a clear shape.",
    "Currently: studying CS, building in public, and learning as fast as I can.",
  ],

  status: [
    { label: 'Currently', value: 'Freshman CS Student', active: true },
    { label: 'Previously', value: 'Alumni @ Our Lady of Peace School', active: false },
  ],

  skills: [
    {
      group: 'Languages',
      tags: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
      exploring: false,
    },
    {
      group: 'Tools',
      tags: ['Git', 'Terminal', 'VS Code', 'NeoVim', 'Claude Code', 'MS Excel', 'MS Powerpoint',],
      exploring: false,
    },
    {
      group: 'Setup',
      tags: ['Linux', 'Fedora', 'i3', 'Polybar', 'Picom', 'Rofi', 'Alacritty', 'LazyVim'],
      exploring: false,
    },
    {
      group: 'Exploring',
      tags: ['TypeScript', 'SQLite', 'PostgresSQL', 'Prisma', 'NumPy', 'React', 'Next.js', 'Node.js', 'Docker'],
      exploring: true,
    },
  ],

  projects: [
    {
      title: 'halal.',
      description: 'A full-stack election management system built for a school of ~2,000 students, replacing manual paper ballot processes with real-time digital voting, live tally monitoring, and automated results publishing.',
      learned: 'Architecting a production-grade system end-to-end — from database schema design and JWT authentication to Docker deployment and real-time polling — while directing AI-assisted development with full ownership of every technical decision.',
      tags: ['web'],
      stack: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind', 'Docker'],
      liveUrl: '#',
      repoUrl: 'https://github.com/disposably-mono/halal',
      featured: true,
    },
    {
      title: 'Portfolio Site',
      description: 'A custom-built, data-driven portfolio designed to showcase my projects and learning journey.',
      learned: 'Integrating JavaScript data objects with DOM rendering while maintaining a clean aesthetic.',
      tags: ['web'],
      stack: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://disposably-mono.github.io/',
      repoUrl: 'https://github.com/disposably-mono/disposably-mono.github.io',
      featured: false,
    },
  ],

  learning: [
    { type: 'Course', title: 'CS50P', source: 'Harvard / EdX', dot: 'accent' },
    { type: 'Topic', title: 'Machine Learning basics', source: 'Self-directed', dot: 'grey' },
    { type: 'Topic', title: 'Data structures & algorithms', source: 'Self-directed', dot: 'accent' },
    { type: 'Framework', title: 'React fundamentals', source: 'docs.react.dev', dot: 'highlight' },
  ],

  notes: [
    { title: 'The start of my CS journey', date: 'Summer 2025', url: '#' },
  ],

  particleWords: [
    { text: 'creator', col: '#588157', size: 13 },
    { text: 'builder', col: '#EAF0CE', size: 13 },
    { text: 'student', col: '#8D99AE', size: 12 },
    { text: 'curious', col: '#E5D4ED', size: 12 },
    { text: 'learning', col: '#588157', size: 12 },
    { text: 'coder', col: '#8D99AE', size: 12 },
    { text: 'late nights', col: '#E5D4ED', size: 11 },
    { text: 'thinker', col: '#EAF0CE', size: 12 },
    { text: 'maker', col: '#588157', size: 13 },
    { text: 'explorer', col: '#8D99AE', size: 11 },
    { text: 'debugger', col: '#E5D4ED', size: 11 },
    { text: 'dreamer', col: '#EAF0CE', size: 12 },
    { text: 'problem solver', col: '#588157', size: 11 },
    { text: 'freshman', col: '#8D99AE', size: 11 },
    { text: 'grower', col: '#E5D4ED', size: 12 },
    { text: 'hacker', col: '#EAF0CE', size: 12 },
    { text: 'overthinker', col: '#E5D4ED', size: 11 },
    { text: 'minimalist', col: '#8D99AE', size: 12 },
    { text: 'night owl', col: '#EAF0CE', size: 11 },
    { text: 'self-taught', col: '#588157', size: 12 },
    { text: 'Filipino', col: '#E5D4ED', size: 12 },
    { text: 'simplifier', col: '#EAF0CE', size: 12 },
    { text: 'always asking', col: '#8D99AE', size: 11 },
    { text: 'bug chaser', col: '#588157', size: 11 },
    { text: 'keyboard warrior', col: '#E5D4ED', size: 11 },
    { text: 'still figuring', col: '#8D99AE', size: 11 },
    { text: 'web curious', col: '#EAF0CE', size: 11 },
    { text: 'ai enthusiast', col: '#588157', size: 11 },
    { text: 'notion addict', col: '#8D99AE', size: 11 },
    { text: 'reader', col: '#E5D4ED', size: 12 },
    { text: 'shipping soon', col: '#588157', size: 11 },
    { text: 'iteration', col: '#EAF0CE', size: 12 },
  ],

  particleMerges: [
    ['curious', 'builder', 'curious builder'],
    ['student', 'late nights', 'learning the hard way'],
    ['creator', 'coder', 'creative technologist'],
    ['thinker', 'maker', 'thoughtful maker'],
    ['dreamer', 'builder', 'builder of dreams'],
    ['explorer', 'debugger', 'bug hunter'],
    ['maker', 'hacker', 'maker-hacker'],
    ['problem solver', 'coder', 'elegant engineer'],
    ['curious', 'explorer', 'endlessly curious'],
    ['creator', 'dreamer', 'visionary creator'],
    ['freshman', 'late nights', 'first year grind'],
    ['grower', 'learning', 'always growing'],
    ['night owl', 'coder', 'midnight coder'],
    ['Filipino', 'builder', 'building from Antipolo'],
    ['minimalist', 'coder', 'clean code only'],
    ['self-taught', 'curious', 'relentlessly self-taught'],
    ['overthinker', 'builder', 'think then build'],
    ['ai enthusiast', 'curious', 'chasing intelligence'],
    ['reader', 'thinker', 'read to build'],
    ['shipping soon', 'builder', 'shipping is learning'],
    ['simplifier', 'problem solver', 'elegantly simple'],
    ['iteration', 'grower', 'improve every loop'],
  ],
};
