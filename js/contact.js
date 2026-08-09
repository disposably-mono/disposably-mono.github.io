const CONTACT_DATA = {
  key: 'contact',
  label: 'Contact',
  x: 2.3,
  y: 0.55,
  links: [
    { label: 'facebook', href: 'https://www.facebook.com/MikelTaopa/' },
    { label: 'instagram', href: 'https://www.instagram.com/disposablymono/' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/mikel-taopa-a86205359/' },
    { label: 'github', href: 'https://github.com/disposably-mono' },
    { label: 'mail', href: 'mailto:mikel.taopa@gmail.com' },
  ],
};

function createContactMat() {
  const section = document.createElement('section');
  section.className = 'mat';
  section.dataset.mat = CONTACT_DATA.key;
  section.dataset.x = CONTACT_DATA.x;
  section.dataset.y = CONTACT_DATA.y;
  section.style.setProperty('--x', CONTACT_DATA.x);
  section.style.setProperty('--y', CONTACT_DATA.y);

  const links = CONTACT_DATA.links.map((link) => {
    const isMail = link.href.startsWith('mailto:');
    const attrs = isMail ? '' : ' target="_blank" rel="noopener"';
    return `<a class="contact-link" href="${link.href}"${attrs}>${link.label}</a>`;
  }).join('<span class="contact-sep">·</span>');

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="contact-tablet" data-animate="fade-up" data-animate-delay="0.15">
      <div class="contact-screen">
        <h2 class="contact-heading">Say hi</h2>
        <div class="contact-links">${links}</div>
      </div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
