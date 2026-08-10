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

  const labels = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', github: 'GitHub' };

  const links = CONTACT_DATA.links
    .filter((link) => link.label !== 'mail')
    .map((link) => {
      return `<a class="contact-icon-link" href="${link.href}" target="_blank" rel="noopener" aria-label="${link.label}">${labels[link.label]}</a>`;
    }).join('');

  section.innerHTML = `
    <div class="cutting-grid"></div>
    <svg class="cutting-overlay"></svg>
    <img class="mat-accessory mat-accessory--wireless-mouse" src="public/accessories/wireless-mouse.png" alt="" aria-hidden="true">
    <img class="mat-accessory mat-accessory--calculator" src="public/accessories/calculator.png" alt="" aria-hidden="true">
    <div class="contact-tablet">
      <div class="contact-screen">

        <div class="contact-panel-identity">
          <div class="contact-avatar">
            <img src="public/grad-pic.jpg" alt="Mikel Taopa">
          </div>
          <div class="contact-identity-divider" aria-hidden="true"></div>
          <p class="contact-identity-name">Mikel Taopa</p>
        </div>

        <div class="contact-panel-note">
          <div class="contact-note-status">
            <span class="contact-status-dot" aria-hidden="true"></span>
            <span class="contact-status-text">Open to conversations</span>
          </div>
          <div class="contact-rule" aria-hidden="true"></div>
          <p class="contact-bio">Curious about finance, automation, or machine learning? Or just why things break in the first place? Let's talk.</p>
          <a class="contact-cta" href="mailto:mikel.taopa@gmail.com">Write to Mikel →</a>
          <p class="contact-channel-label">Find me at</p>
          <div class="contact-icons" aria-label="Contact channels">${links}</div>
        </div>

      </div>
    </div>
  `;

  buildCuttingMat(section);
  return section;
}
