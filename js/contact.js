const CONTACT_DATA = {
  key: 'contact',
  label: 'Contact',
  x: 2.3,
  y: 0.55,
  links: ['mail', 'github', 'linkedin'],
};

function createContactMat() {
  const section = document.createElement('section');
  section.className = 'mat';
  section.dataset.mat = CONTACT_DATA.key;
  section.dataset.texture = 'lines';
  section.dataset.x = CONTACT_DATA.x;
  section.dataset.y = CONTACT_DATA.y;
  section.style.setProperty('--x', CONTACT_DATA.x);
  section.style.setProperty('--y', CONTACT_DATA.y);

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <div class="contact-tablet" data-animate="fade-up" data-animate-delay="0.15">
      <div class="contact-screen">
        <h2 class="contact-heading">Say hi</h2>
        <div class="contact-links">${CONTACT_DATA.links.join(' · ')}</div>
      </div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
