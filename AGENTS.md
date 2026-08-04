# Repository Instructions

## Project

This is a static GitHub Pages site with no framework or build step.

- `index.html` defines the page structure and the element IDs used by scripts.
- `css/style.css` owns the cutting-mat presentation.
- `js/cutting-mat.js` owns responsive grid, ruler, and guide rendering.

Keep the site deployable by opening `index.html` directly or serving the
repository with `python3 -m http.server 8080`.

## Implementation Rules

- Keep changes small and focused; do not add a framework, bundler, or package
  manager without explicit approval.
- Preserve the HTML IDs and class names consumed by `js/cutting-mat.js` unless
  the corresponding JavaScript and CSS are updated in the same change.
- Prefer named constants over repeated rendering values.
- Keep functions focused and normally under 50 lines. Split layout calculation,
  DOM reconciliation, and SVG generation when refactoring `js/cutting-mat.js`.
- Keep calculation helpers pure: return new values and do not mutate inputs.
  Confine necessary DOM updates to rendering functions.
- Use `const` and `let` in new JavaScript; do not add new `var` bindings.
- Prefer CSS custom properties for shared visual values; avoid duplicating
  colors, spacing, and typography literals.
- Validate external or user-controlled input at boundaries. Do not introduce
  secrets, remote executable content, or unsafe HTML injection.

## Verification

- For HTML, CSS, or JavaScript changes, serve the site locally and check the
  affected viewport(s) in a browser.
- Verify resize behavior after changing the cutting-mat renderer.
- Add focused automated checks when behavior becomes non-trivial. There is no
  test harness today, so do not add tooling solely for cosmetic edits.
- Before handoff, run `git diff --check` and review `git diff` for unintended
  changes.

## Git and Local Files

- Use conventional, atomic commits when asked to commit. Do not push unless
  explicitly requested.
- Preserve existing user changes and never use destructive Git commands unless
  explicitly authorized.
- Keep `docs/`, `.docs/`, `.screenshots/`, `.superpowers/`, `.worktrees/`,
  `.playwright-mcp/`, and `node_modules/` local-only. Do not stage, commit, or
  push their contents.
