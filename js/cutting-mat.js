function buildCuttingMat(matEl) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = 2;
  const target = 39;

  const pad = Math.max(8, Math.floor(Math.min(vw, vh) * 0.012));

  const innerW = vw - pad * 2;
  const innerH = vh - pad * 2;

  const cols = Math.max(1, Math.floor((innerW + gap) / (target + gap)));
  const rows = Math.max(1, Math.floor((innerH + gap) / (target + gap)));

  const cell = Math.floor(Math.min(
    (innerW - (cols - 1) * gap) / cols,
    (innerH - (rows - 1) * gap) / rows
  ));

  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const padL = Math.floor((vw - gridW) / 2);
  const padT = Math.floor((vh - gridH) / 2);

  const style = getComputedStyle(matEl);
  const lineTint = style.getPropertyValue('--line-tint').trim() || 'rgba(255,255,255,0.5)';
  const lineTintStrong = style.getPropertyValue('--line-tint-strong').trim() || '#ffffff';

  const grid = matEl.querySelector('.cutting-grid');
  grid.style.setProperty('--cell', cell + 'px');
  grid.style.display = 'grid';
  grid.style.gap = gap + 'px';
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cell}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cell}px)`;
  grid.style.padding = `${padT}px ${padL}px`;
  grid.style.background = lineTint.replace(/[\d.]+\)$/, '0.15)');

  const total = cols * rows;
  while (grid.children.length < total) {
    const d = document.createElement('div');
    d.className = 'cutting-cell';
    d.style.background = 'rgba(0,0,0,0.12)';
    grid.appendChild(d);
  }
  while (grid.children.length > total) {
    grid.removeChild(grid.lastChild);
  }

  const svg = matEl.querySelector('.cutting-overlay');
  svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  svg.setAttribute('width', vw);
  svg.setAttribute('height', vh);

  const step = cell + gap;
  const L = padL;
  const T = padT;
  const R = padL + gridW;
  const B = padT + gridH;

  const guideColor = lineTint.replace(/[\d.]+\)$/, '0.12)');
  const F = 'font-family="Helvetica Neue, Arial, sans-serif" font-weight="600"';
  const fs = Math.max(9, cell * 0.35);
  const tl = Math.max(8, cell * 0.3);
  const ts = Math.max(4, cell * 0.15);

  const p = [];
  const hGroup = 3;

  for (let i = 0; i <= cols; i++) {
    const x = L + i * step;
    const hx = x + step / 2;

    p.push(`<line x1="${x}" y1="${T - 2 - tl}" x2="${x}" y2="${T - 2}" stroke="${lineTintStrong}" stroke-width="1"/>`);
    if (i < cols) p.push(`<line x1="${hx}" y1="${T - 2 - ts}" x2="${hx}" y2="${T - 2}" stroke="${lineTint}" stroke-width="0.5"/>`);
    if (i > 0 && i < cols && i % hGroup === 0) {
      p.push(`<text x="${x + 3}" y="${T + fs + 2}" fill="${lineTint}" ${F} font-size="${fs}">${i / hGroup}</text>`);
    }

    p.push(`<line x1="${x}" y1="${B + 2}" x2="${x}" y2="${B + 2 + tl}" stroke="${lineTintStrong}" stroke-width="1"/>`);
    if (i < cols) p.push(`<line x1="${hx}" y1="${B + 2}" x2="${hx}" y2="${B + 2 + ts}" stroke="${lineTint}" stroke-width="0.5"/>`);
    const ri = cols - i;
    if (i > 0 && i < cols && ri % hGroup === 0) {
      p.push(`<text x="${x - 3}" y="${B - 5}" fill="${lineTint}" ${F} font-size="${fs}" text-anchor="end">${ri / hGroup}</text>`);
    }
  }
  p.push(`<line x1="${L}" y1="${T - 2}" x2="${R}" y2="${T - 2}" stroke="${lineTint}" stroke-width="0.5"/>`);
  p.push(`<line x1="${L}" y1="${B + 2}" x2="${R}" y2="${B + 2}" stroke="${lineTint}" stroke-width="0.5"/>`);

  for (let j = 0; j <= rows; j++) {
    const y = T + j * step;
    const hy = y + step / 2;

    p.push(`<line x1="${L - 2 - tl}" y1="${y}" x2="${L - 2}" y2="${y}" stroke="${lineTintStrong}" stroke-width="1"/>`);
    if (j < rows) p.push(`<line x1="${L - 2 - ts}" y1="${hy}" x2="${L - 2}" y2="${hy}" stroke="${lineTint}" stroke-width="0.5"/>`);
    if (j > 0 && j < rows) p.push(`<text x="${L + 4}" y="${y + fs + 2}" fill="${lineTint}" ${F} font-size="${fs}">${j}</text>`);

    p.push(`<line x1="${R + 2}" y1="${y}" x2="${R + 2 + tl}" y2="${y}" stroke="${lineTintStrong}" stroke-width="1"/>`);
    if (j < rows) p.push(`<line x1="${R + 2}" y1="${hy}" x2="${R + 2 + ts}" y2="${hy}" stroke="${lineTint}" stroke-width="0.5"/>`);
    if (j > 0 && j < rows) p.push(`<text x="${R - 4}" y="${y - 4}" fill="${lineTint}" ${F} font-size="${fs}" text-anchor="end">${rows - j}</text>`);
  }
  p.push(`<line x1="${L - 2}" y1="${T}" x2="${L - 2}" y2="${B}" stroke="${lineTint}" stroke-width="0.5"/>`);
  p.push(`<line x1="${R + 2}" y1="${T}" x2="${R + 2}" y2="${B}" stroke="${lineTint}" stroke-width="0.5"/>`);

  const diag45 = Math.min(gridW, gridH);
  p.push(`<line x1="${L}" y1="${T}" x2="${L + diag45}" y2="${T + diag45}" stroke="${guideColor}" stroke-width="1.5"/>`);
  p.push(`<line x1="${R}" y1="${T}" x2="${R - diag45}" y2="${T + diag45}" stroke="${guideColor}" stroke-width="1.5"/>`);

  const rise60 = gridH;
  const run60 = rise60 / Math.tan(60 * Math.PI / 180);
  const clampedRun = Math.min(run60, gridW);
  const clampedRise = Math.min(rise60, gridW * Math.tan(60 * Math.PI / 180));
  p.push(`<line x1="${L}" y1="${B}" x2="${L + clampedRun}" y2="${B - clampedRise}" stroke="${guideColor}" stroke-width="1.5"/>`);
  p.push(`<line x1="${R}" y1="${B}" x2="${R - clampedRun}" y2="${B - clampedRise}" stroke="${guideColor}" stroke-width="1.5"/>`);

  svg.innerHTML = p.join('');
}
