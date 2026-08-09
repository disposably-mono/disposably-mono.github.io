# public/

Static assets referenced by the site (images, documents). Not code — nothing
here is loaded by a build step; pages just link to these paths directly.

## Structure

```
public/
  resume/
    resume.pdf          — restored from git history (see below)
  projects/
    halal/               — screenshots of github.com/disposably-mono/halal.
      hero.png            "House of Zeal Elections" voter homepage
      ballot.png           Official ballot voting screen
      monitor.png           Live results / turnout monitor (admin)
      control.png            Election scheduling & override panel (admin)
    mnemo/                — github.com/disposably-mono/Mnemo-Skill
      pipeline.svg          Hand-authored diagram of the ingest -> ... -> sync pipeline
      terminal-ingest.svg     Mocked terminal output for `mnemo-ingest`
      terminal-generate.svg    Mocked terminal output for `mnemo-generate`
      terminal-import.svg       Mocked terminal output for `mnemo-import`
```

Captions for each image live next to the data that uses them, in
`js/projects.js`'s `PROJECTS_DATA[].media[].caption` — that file is the
source of truth; this README just explains where the pixels came from.

## Provenance

- **halal/** screenshots are real app screenshots taken from a local dev
  run of the `halal.` repo (pulled from `~/Pictures/Screenshots/halal.`).
  The four selected avoid showing student names, IDs, or officer photos —
  they show generic app UI (homepage, ballot, live monitor, control panel).
- **mnemo/** has no live web UI to screenshot (it's a Claude Code skill +
  CLI toolkit, not a webapp), so its visuals are original assets built for
  this portfolio: a pipeline diagram matching the README's documented
  architecture, and mocked-up terminal screenshots of its `mnemo-*`
  commands. These are illustrative, not captured terminal sessions.
- **resume.pdf** was previously committed to this repo at `assets/resume.pdf`
  and removed in commit `b94743a` during the cutting-mat redesign. Restored
  here from git history (`git show b94743a^:assets/resume.pdf`) unchanged.

## Adding more project images

Drop files under `public/projects/<project-slug>/`, then reference them from
the matching project's `media` array in `js/projects.js` as
`{ src: 'public/projects/<slug>/<file>', caption: '...' }`. The first entry
in `media` is the sheet's main picture; the rest fill the three thumbnail
slots.
