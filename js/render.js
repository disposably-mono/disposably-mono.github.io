/* ============================================================
   render.js — reads DATA and populates the page
   You should never need to edit this file to update content.
   Edit js/data.js instead.
============================================================ */

(function () {

  /* ── helpers ── */
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    return d;
  }

  function $(id) { return document.getElementById(id); }

  /* ── Hero identity pills ── */
  function renderHero() {
    var id = DATA.identity;

    /* eyebrow */
    var eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) eyebrow.textContent = id.eyebrow;

    /* name */
    var name = document.querySelector('.hero-name');
    if (name) { name.textContent = id.handle + '.'; name.setAttribute('aria-label', id.handle); }

    /* tagline */
    var tag = document.querySelector('.hero-tagline');
    if (tag) tag.innerHTML = id.tagline + '<br><em>' + id.taglineSub + '</em>';

    /* cta line */
    var ctaLine = document.querySelector('.hero-cta-line');
    if (ctaLine) ctaLine.textContent = id.ctaLine;

    /* identity pills */
    var pillData = [
      { text: id.name,     cls: 'p-beige' },
      { text: id.age,      cls: 'p-fern'  },
      { text: id.course,   cls: 'p-lav'   },
      { text: id.location, cls: 'p-grey'  },
    ];
    var pillWrap = document.querySelector('.hero-pills');
    if (pillWrap) {
      pillWrap.innerHTML = '';
      pillData.forEach(function(p) {
        var span = el('span', 'hero-pill ' + p.cls, p.text);
        pillWrap.appendChild(span);
      });
    }
  }

  /* ── About ── */
  function renderAbout() {
    var id  = DATA.identity;
    var lnk = DATA.links;

    /* bio paragraphs */
    var bioCol = document.querySelector('.about-text-col');
    if (bioCol) {
      /* clear existing bio paragraphs only, keep status block */
      var status = bioCol.querySelector('.about-status');
      bioCol.innerHTML = '';
      DATA.bio.forEach(function(para, i) {
        var p = el('p', 't-body', para.replace(/—/g, '&mdash;'));
        p.style.marginBottom = i < DATA.bio.length - 1 ? '20px' : '0';
        bioCol.appendChild(p);
      });
      if (status) bioCol.appendChild(status);
    }

    /* status rows */
    var statusEl = document.querySelector('.about-status');
    if (statusEl) {
      statusEl.innerHTML = '';
      DATA.status.forEach(function(row) {
        var rowEl = el('div', 'about-status-row');
        var labelEl = el('span', 't-label');
        labelEl.style.color = 'var(--text-muted)';
        if (row.active) {
          var dot = el('span', 'status-dot');
          labelEl.appendChild(dot);
        }
        labelEl.appendChild(document.createTextNode(row.label));
        var valEl = el('p');
        valEl.style.cssText = 'font-size:14px; color:' + (row.active ? 'var(--text-primary)' : 'var(--text-sec)') + '; margin-top:2px;';
        valEl.innerHTML = row.value;
        rowEl.appendChild(labelEl);
        rowEl.appendChild(valEl);
        statusEl.appendChild(rowEl);
      });
    }

    /* about links */
    var linkCol = document.querySelector('.about-label-col');
    if (linkCol) {
      var linkWrap = linkCol.querySelector('div');
      if (linkWrap) {
        linkWrap.innerHTML = '';
        var aboutLinks = [
          { label: 'GitHub',   href: lnk.github   },
          { label: 'LinkedIn', href: lnk.linkedin  },
          { label: 'Resume',   href: lnk.resume    },
        ];
        aboutLinks.forEach(function(l) {
          var a = el('a', 't-label', l.label + ' &#8599;');
          a.href   = l.href;
          a.target = '_blank';
          a.rel    = 'noopener';
          a.style.cssText = 'color:var(--text-sec); transition:color 0.2s;';
          a.addEventListener('mouseenter', function() { this.style.color = 'var(--accent)'; });
          a.addEventListener('mouseleave', function() { this.style.color = 'var(--text-sec)'; });
          linkWrap.appendChild(a);
        });
      }
    }
  }

  /* ── Skills ── */
  function renderSkills() {
    var grid = document.querySelector('.skills-grid');
    if (!grid) return;
    grid.innerHTML = '';
    DATA.skills.forEach(function(group, i) {
      var groupEl = el('div', 'skill-group reveal');
      if (i > 0) groupEl.style.transitionDelay = (i * 0.1) + 's';
      var label = el('p', 't-label', group.group);
      label.style.cssText = 'color:var(--text-muted); margin-bottom:20px;';
      var tagWrap = el('div');
      tagWrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px;';
      group.tags.forEach(function(tag) {
        tagWrap.appendChild(el('span', 'skill-tag' + (group.exploring ? ' exploring' : ''), tag));
      });
      groupEl.appendChild(label);
      groupEl.appendChild(tagWrap);
      grid.appendChild(groupEl);
    });
  }

  /* ── Projects ── */
  function renderProjects() {
    var grid = $('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    /* real projects */
    DATA.projects.forEach(function(proj, i) {
      var card = el('article', 'project-card reveal' + (proj.featured ? ' featured' : ''));
      card.dataset.tags = proj.tags.join(' ');
      if (i > 0) card.style.transitionDelay = (i * 0.1) + 's';

      /* header row */
      var header = el('div');
      header.style.cssText = 'display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;';
      var featLabel = el('span', 't-label', proj.featured ? 'Featured project' : 'Project');
      var linkWrap  = el('div');
      linkWrap.style.cssText = 'display:flex; gap:10px;';
      ['Live', 'GitHub'].forEach(function(lbl, li) {
        var href = li === 0 ? proj.liveUrl : proj.repoUrl;
        var a = el('a', 't-label', lbl + ' &#8599;');
        a.href   = href;
        a.target = '_blank';
        a.rel    = 'noopener';
        a.style.cssText = 'color:var(--text-muted); transition:color 0.2s;';
        a.addEventListener('mouseenter', function() { this.style.color = 'var(--accent)'; });
        a.addEventListener('mouseleave', function() { this.style.color = 'var(--text-muted)'; });
        linkWrap.appendChild(a);
      });
      header.appendChild(featLabel);
      header.appendChild(linkWrap);

      /* title */
      var title = el('h3', 't-h2', proj.title);
      title.style.marginBottom = '12px';

      /* description */
      var desc = el('p', 't-body', proj.description);
      desc.style.cssText = 'margin-bottom:24px; font-size:15px;';

      /* learned */
      var learnedWrap = el('div');
      learnedWrap.style.cssText = 'border-top:0.5px solid var(--border); padding-top:16px; margin-bottom:16px;';
      var learnedLabel = el('p', 't-label', 'What I learned');
      learnedLabel.style.cssText = 'color:var(--text-muted); margin-bottom:8px;';
      var learnedText = el('p', '', proj.learned);
      learnedText.style.cssText = 'font-size:14px; color:var(--text-sec);';
      learnedWrap.appendChild(learnedLabel);
      learnedWrap.appendChild(learnedText);

      /* stack tags */
      var stackWrap = el('div');
      stackWrap.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap;';
      proj.stack.forEach(function(s) {
        var tag = el('span', 'filter-btn', s);
        tag.style.pointerEvents = 'none';
        stackWrap.appendChild(tag);
      });

      card.appendChild(header);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(learnedWrap);
      card.appendChild(stackWrap);
      grid.appendChild(card);
    });

    /* placeholder slots — fills up to 3 total cards */
    var placeholderCount = Math.max(0, 3 - DATA.projects.length);
    for (var p = 0; p < placeholderCount; p++) {
      var placeholder = el('article', 'project-card reveal');
      placeholder.dataset.tags = 'all';
      placeholder.style.cssText = 'opacity:0.4; border-style:dashed; transition-delay:' + ((DATA.projects.length + p) * 0.1) + 's;';
      placeholder.appendChild(el('span', 't-label', 'Coming this summer'));
      var phText = el('p', '', 'Next project in progress...');
      phText.style.cssText = 'margin-top:16px; font-size:14px; color:var(--text-muted);';
      placeholder.appendChild(phText);
      grid.appendChild(placeholder);
    }
  }

  /* ── Learning ticker ── */
  function renderLearning() {
    var ticker = document.querySelector('.learning-ticker');
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
      card.appendChild(type);
      card.appendChild(title);
      card.appendChild(source);
      card.appendChild(dot);
      return card;
    }

    ticker.innerHTML = '';
    /* render twice for seamless infinite loop */
    [1, 2].forEach(function() {
      DATA.learning.forEach(function(item) {
        ticker.appendChild(makeCard(item));
      });
    });
  }

  /* ── Notes ── */
  function renderNotes() {
    var list = document.querySelector('.notes-list');
    if (!list) return;
    list.innerHTML = '';

    DATA.notes.forEach(function(note, i) {
      var item = el('a', 'note-item reveal', '');
      item.href = note.url;
      if (i > 0) item.style.transitionDelay = (i * 0.05) + 's';
      item.appendChild(el('span', 'note-title', note.title));
      item.appendChild(el('span', 'note-date', note.date));
      list.appendChild(item);
    });

    /* placeholder */
    var ph = el('div', 'note-item reveal');
    ph.style.cssText = 'opacity:0.35; pointer-events:none; transition-delay:' + (DATA.notes.length * 0.05) + 's;';
    var phTitle = el('span', 'note-title', 'More notes coming soon...');
    phTitle.style.fontStyle = 'italic';
    ph.appendChild(phTitle);
    ph.appendChild(el('span', 'note-date', '&mdash;'));
    list.appendChild(ph);
  }

  /* ── Contact ── */
  function renderContact() {
    var id  = DATA.identity;
    var lnk = DATA.links;

    /* say hello button */
    var cta = document.querySelector('.contact-cta-btn');
    if (cta) cta.href = 'mailto:' + id.email;

    /* contact links */
    var linkWrap = document.querySelector('.contact-links');
    if (!linkWrap) return;
    linkWrap.innerHTML = '';

    var contactLinks = [
      { label: 'GitHub',    href: lnk.github    },
      { label: 'LinkedIn',  href: lnk.linkedin   },
      { label: 'Instagram', href: lnk.instagram  },
      { label: 'Facebook',  href: lnk.facebook   },
      { label: id.phoneDisplay, href: 'tel:' + id.phone, noExternal: true },
    ];

    contactLinks.forEach(function(l) {
      var a = el('a', 'contact-link', l.label);
      a.href = l.href;
      if (!l.noExternal) { a.target = '_blank'; a.rel = 'noopener'; }
      linkWrap.appendChild(a);
    });
  }

  /* ── Re-observe reveals after dynamic render ── */
  function reObserveReveals() {
    if (!window._revealObserver) return;
    document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
      window._revealObserver.observe(el);
    });
  }

  /* ── Boot ── */
  function init() {
    renderHero();
    renderAbout();
    renderSkills();
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
