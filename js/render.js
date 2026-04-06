(function () {

  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    return d;
  }

  function $(id) { return document.getElementById(id); }

  /* ── Meta tags ── */
  function renderMeta() {
    var m = DATA.meta;
    document.title = m.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', m.description);

    // Fixed: Added check for ogTitle and ogDesc keys
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && m.ogTitle) ogTitle.setAttribute('content', m.ogTitle);

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && m.ogDesc) ogDesc.setAttribute('content', m.ogDesc);
  }

  /* ── Nav ── */
  function renderNav() {
    var n = DATA.nav;
    var logo = $('nav-logo');
    if (logo) logo.innerHTML = n.logo + ' <span>&#8212;</span>';

    var linksList = $('nav-links');
    var mobileMenu = $('mobile-menu');
    if (linksList) linksList.innerHTML = '';
    if (mobileMenu) mobileMenu.innerHTML = '';

    n.links.forEach(function (link) {
      if (linksList) {
        var li = el('li');
        var a = el('a', '', link.label);
        a.href = link.href;
        li.appendChild(a);
        linksList.appendChild(li);
      }
      if (mobileMenu) {
        var ma = el('a', '', link.label);
        ma.href = link.href;
        ma.setAttribute('onclick', 'closeMobileMenu()');
        mobileMenu.appendChild(ma);
      }
    });
  }

  /* ── Section intro labels ── */
  function renderSectionLabels() {
    var s = DATA.sections;
    Object.keys(s).forEach(function (key) {
      var intro = $('intro-' + key);
      var label = intro ? intro.querySelector('.t-label') : null;
      var heading = $(key + '-heading');
      var text = s[key].num + ' \u2014 ' + s[key].label;
      if (label) label.textContent = text;
      // Fixed: Prevent overwriting custom headings that have specific IDs like "about-heading-text"
      if (heading) heading.textContent = text;
    });
  }

  /* ── Hero ── */
  function renderHero() {
    var id = DATA.identity;

    var eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) eyebrow.textContent = id.eyebrow;

    var name = document.querySelector('.hero-name');
    if (name) { name.textContent = id.handle + '.'; name.setAttribute('aria-label', id.handle); }

    var tag = document.querySelector('.hero-tagline');
    if (tag) tag.innerHTML = id.tagline + '<br><em>' + id.taglineSub + '</em>';

    var hint = document.querySelector('.hero-hint-inline');
    if (hint) hint.textContent = id.hintText;

    var ctaLine = document.querySelector('.hero-cta-line');
    if (ctaLine) ctaLine.textContent = id.ctaLine;

    var pillData = [
      { text: id.name, cls: 'p-beige' },
      { text: id.age, cls: 'p-fern' },
      { text: id.course, cls: 'p-lav' },
      { text: id.location, cls: 'p-grey' },
    ];
    var pillWrap = document.querySelector('.hero-pills');
    if (pillWrap) {
      pillWrap.innerHTML = '';
      pillData.forEach(function (p) {
        pillWrap.appendChild(el('span', 'hero-pill ' + p.cls, p.text));
      });
    }
  }

  /* ── About ── */
  function renderAbout() {
    var id = DATA.identity;
    var lnk = DATA.links;

    var bioEl = $('about-bio');
    if (bioEl) {
      bioEl.innerHTML = '';
      DATA.bio.forEach(function (para, i) {
        var p = el('p', 't-body', para.replace(/\u2014/g, '&mdash;'));
        p.style.marginBottom = i < DATA.bio.length - 1 ? '20px' : '0';
        bioEl.appendChild(p);
      });
    }

    var statusEl = $('about-status');
    if (statusEl) {
      statusEl.innerHTML = '';
      DATA.status.forEach(function (row) {
        var rowEl = el('div', 'about-status-row');
        var labelEl = el('span', 't-label');
        labelEl.style.color = 'var(--text-muted)';
        if (row.active) labelEl.appendChild(el('span', 'status-dot'));
        labelEl.appendChild(document.createTextNode(row.label));
        var valEl = el('p');
        valEl.style.cssText = 'font-size:14px; color:' + (row.active ? 'var(--text-primary)' : 'var(--text-sec)') + '; margin-top:2px;';
        valEl.innerHTML = row.value;
        rowEl.appendChild(labelEl);
        rowEl.appendChild(valEl);
        statusEl.appendChild(rowEl);
      });
    }

    var linkWrap = $('about-links');
    if (linkWrap) {
      linkWrap.innerHTML = '';
      [['GitHub', lnk.github], ['LinkedIn', lnk.linkedin], ['Resume', lnk.resume]].forEach(function (pair) {
        var a = el('a', 't-label', pair[0] + ' &#8599;');
        a.href = pair[1]; a.target = '_blank'; a.rel = 'noopener';
        a.style.cssText = 'color:var(--text-sec); transition:color 0.2s;';
        a.addEventListener('mouseenter', function () { this.style.color = 'var(--accent)'; });
        a.addEventListener('mouseleave', function () { this.style.color = 'var(--text-sec)'; });
        linkWrap.appendChild(a);
      });
    }
  }

  /* ── Skills ── */
  function renderSkills() {
    var grid = document.querySelector('.skills-grid');
    if (!grid) return;
    grid.innerHTML = '';
    DATA.skills.forEach(function (group, i) {
      var isExp = group.exploring;
      var groupEl = el('div', 'skill-group reveal' + (isExp ? ' full-width' : ''));
      if (i > 0) groupEl.style.transitionDelay = (i * 0.1) + 's';
      var label = el('p', 't-label', group.group);
      label.style.cssText = 'color:var(--text-muted); margin-bottom:20px;';
      var tagWrap = el('div', 'skill-tags-wrap');
      tagWrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px;';
      group.tags.forEach(function (tag) {
        tagWrap.appendChild(el('span', 'skill-tag' + (isExp ? ' exploring' : ''), tag));
      });
      groupEl.appendChild(label);
      groupEl.appendChild(tagWrap);
      grid.appendChild(groupEl);
    });
  }

  /* ── Project filters ── */
  function renderProjectFilters() {
    var wrap = $('project-filters');
    if (!wrap) return;
    wrap.innerHTML = '';
    DATA.projectFilters.forEach(function (f, i) {
      var btn = el('button', 'filter-btn' + (i === 0 ? ' active' : ''), f.label);
      btn.setAttribute('onclick', "filterProjects('" + f.value + "')");
      wrap.appendChild(btn);
    });
  }

  /* ── Projects ── */
  function renderProjects() {
    var grid = $('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    DATA.projects.forEach(function (proj, i) {
      var card = el('article', 'project-card reveal' + (proj.featured ? ' featured' : ''));
      card.dataset.tags = proj.tags.join(' ');
      if (i > 0) card.style.transitionDelay = (i * 0.1) + 's';

      var header = el('div');
      header.style.cssText = 'display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;';
      header.appendChild(el('span', 't-label', proj.featured ? 'Featured project' : 'Project'));
      var linkRow = el('div');
      linkRow.style.cssText = 'display:flex; gap:10px;';
      [['Live', proj.liveUrl], ['GitHub', proj.repoUrl]].forEach(function (pair) {
        var a = el('a', 't-label', pair[0] + ' &#8599;');
        a.href = pair[1]; a.target = '_blank'; a.rel = 'noopener';
        a.style.cssText = 'color:var(--text-muted); transition:color 0.2s;';
        a.addEventListener('mouseenter', function () { this.style.color = 'var(--accent)'; });
        a.addEventListener('mouseleave', function () { this.style.color = 'var(--text-muted)'; });
        linkRow.appendChild(a);
      });
      header.appendChild(linkRow);

      var title = el('h3', 't-h2', proj.title);
      title.style.marginBottom = '12px';
      var desc = el('p', 't-body', proj.description);
      desc.style.cssText = 'margin-bottom:24px; font-size:15px;';

      var lw = el('div');
      lw.style.cssText = 'border-top:0.5px solid var(--border); padding-top:16px; margin-bottom:16px;';
      var ll = el('p', 't-label', 'What I learned');
      ll.style.cssText = 'color:var(--text-muted); margin-bottom:8px;';
      var lt = el('p', '', proj.learned);
      lt.style.cssText = 'font-size:14px; color:var(--text-sec);';
      lw.appendChild(ll); lw.appendChild(lt);

      var sw = el('div');
      sw.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap;';
      proj.stack.forEach(function (s) {
        var t = el('span', 'filter-btn', s);
        t.style.pointerEvents = 'none';
        sw.appendChild(t);
      });

      card.appendChild(header); card.appendChild(title);
      card.appendChild(desc); card.appendChild(lw);
      card.appendChild(sw);
      grid.appendChild(card);
    });

    /* placeholder slots — fills to 3 total */
    var count = Math.max(0, 3 - DATA.projects.length);
    for (var p = 0; p < count; p++) {
      var ph = el('article', 'project-card reveal');
      ph.dataset.tags = 'all';
      ph.style.cssText = 'opacity:0.4; border-style:dashed; transition-delay:' + ((DATA.projects.length + p) * 0.1) + 's;';
      ph.appendChild(el('span', 't-label', 'Coming soon'));
      var pt = el('p', '', 'Next project in progress...');
      pt.style.cssText = 'margin-top:16px; font-size:14px; color:var(--text-muted);';
      ph.appendChild(pt);
      grid.appendChild(ph);
    }
  }

  /* ── Learning ticker ── */
  function renderLearning() {
    var ticker = $('learning-ticker');
    if (!ticker) return;
    var dotColors = { accent: 'var(--accent)', highlight: 'var(--highlight)', grey: 'var(--lavender-grey)' };

    function makeCard(item) {
      var card = el('div', 'learning-card');
      var type = el('p', 't-label', item.type);
      type.style.cssText = 'color:var(--text-muted); margin-bottom:8px;';
      var title = el('p', '', item.title);
      title.style.cssText = 'font-size:15px; font-weight:400; color:var(--text-primary); margin-bottom:4px;';
      var source = el('p', '', item.source);
      source.style.cssText = 'font-size:13px; color:var(--text-sec);';
      var dot = el('div');
      dot.style.cssText = 'width:8px; height:8px; border-radius:50%; background:' + (dotColors[item.dot] || dotColors.accent) + '; margin-top:14px;';
      card.appendChild(type); card.appendChild(title);
      card.appendChild(source); card.appendChild(dot);
      return card;
    }

    ticker.innerHTML = '';
    [1, 2].forEach(function () {
      DATA.learning.forEach(function (item) { ticker.appendChild(makeCard(item)); });
    });
  }

  /* ── Notes ── */
  function renderNotes() {
    var list = $('notes-list');
    if (!list) return;
    list.innerHTML = '';
    DATA.notes.forEach(function (note, i) {
      var item = el('a', 'note-item reveal', '');
      item.href = note.url;
      if (i > 0) item.style.transitionDelay = (i * 0.05) + 's';
      item.appendChild(el('span', 'note-title', note.title));
      item.appendChild(el('span', 'note-date', note.date));
      list.appendChild(item);
    });
    var ph = el('div', 'note-item reveal');
    ph.style.cssText = 'opacity:0.35; pointer-events:none; transition-delay:' + (DATA.notes.length * 0.05) + 's;';
    var phT = el('span', 'note-title', 'More notes coming soon...');
    phT.style.fontStyle = 'italic';
    ph.appendChild(phT);
    ph.appendChild(el('span', 'note-date', '\u2014'));
    list.appendChild(ph);
  }

  /* ── Contact ── */
  function renderContact() {
    var id = DATA.identity;
    var lnk = DATA.links;

    var heading = $('contact-headline'); // Changed to match data key
    if (!heading) heading = $('contact-heading'); // Fallback
    if (heading) heading.textContent = id.contactHeadline;

    var sub = $('contact-sub');
    if (sub) sub.textContent = id.contactSub;

    var cta = $('contact-cta');
    if (cta) { cta.href = 'mailto:' + id.email; cta.innerHTML = 'Say hello &#8599;'; }

    var linkWrap = $('contact-links');
    if (linkWrap) {
      linkWrap.innerHTML = '';
      [
        { label: 'GitHub', href: lnk.github },
        { label: 'LinkedIn', href: lnk.linkedin },
        { label: 'Instagram', href: lnk.instagram },
        { label: 'Facebook', href: lnk.facebook },
        { label: id.phoneDisplay, href: 'tel:' + id.phone, local: true },
      ].forEach(function (l) {
        var a = el('a', 'contact-link', l.label);
        a.href = l.href;
        if (!l.local) { a.target = '_blank'; a.rel = 'noopener'; }
        linkWrap.appendChild(a);
      });
    }

    var foot = $('contact-foot');
    if (foot) {
      foot.innerHTML = '&copy; <span id="year"></span> ' + id.handle + ' \u2014 ' + id.footerText;
      var yr = foot.querySelector('#year');
      if (yr) yr.textContent = new Date().getFullYear();
    }
  }

  /* ── Re-observe reveals after dynamic render ── */
  function reObserveReveals() {
    // Fixed: Added safety check for missing observer
    if (!window._revealObserver) return;
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      window._revealObserver.observe(el);
    });
  }

  /* ── Boot ── */
  function init() {
    renderMeta();
    renderNav();
    renderSectionLabels();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjectFilters();
    renderProjects();
    renderLearning();
    renderNotes();
    renderContact();
    reObserveReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
