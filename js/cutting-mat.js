function build() {
  var vw = window.innerWidth;
  var vh = window.innerHeight;
  var gap = 2;
  var target = 39;

  var pad = Math.floor(Math.min(vw, vh) * 0.012);
  if (pad < 8) pad = 8;

  var innerW = vw - pad * 2;
  var innerH = vh - pad * 2;

  var cols = Math.floor((innerW + gap) / (target + gap));
  var rows = Math.floor((innerH + gap) / (target + gap));
  if (cols < 1) cols = 1;
  if (rows < 1) rows = 1;

  var cell = Math.floor(Math.min(
    (innerW - (cols - 1) * gap) / cols,
    (innerH - (rows - 1) * gap) / rows
  ));

  var gridW = cols * cell + (cols - 1) * gap;
  var gridH = rows * cell + (rows - 1) * gap;
  var padL = Math.floor((vw - gridW) / 2);
  var padT = Math.floor((vh - gridH) / 2);

  var mat = document.getElementById('mat');
  mat.style.setProperty('--cell', cell + 'px');
  mat.style.gridTemplateColumns = 'repeat(' + cols + ', ' + cell + 'px)';
  mat.style.gridTemplateRows = 'repeat(' + rows + ', ' + cell + 'px)';
  mat.style.padding = padT + 'px ' + padL + 'px';

  var total = cols * rows;
  var current = mat.children.length;

  while (current < total) {
    var d = document.createElement('div');
    d.className = 'cell';
    mat.appendChild(d);
    current++;
  }
  while (current > total) {
    mat.removeChild(mat.lastChild);
    current--;
  }

  var wrapper = document.getElementById('wrapper');
  wrapper.style.width = vw + 'px';
  wrapper.style.height = vh + 'px';

  var svg = document.getElementById('overlay');
  svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
  svg.setAttribute('width', vw);
  svg.setAttribute('height', vh);

  var step = cell + gap;
  var L = padL;
  var T = padT;
  var R = padL + gridW;
  var B = padT + gridH;

  var rulerColor = 'rgba(140, 220, 170, 0.55)';
  var majorColor = 'rgba(140, 220, 170, 0.7)';
  var numColor = 'rgba(140, 220, 170, 0.6)';
  var guideColor = 'rgba(140, 210, 170, 0.12)';
  var F = 'font-family="Helvetica Neue, Arial, sans-serif" font-weight="600"';
  var fs = Math.max(9, cell * 0.35);
  var tl = Math.max(8, cell * 0.3);
  var ts = Math.max(4, cell * 0.15);

  var p = [];

  // horizontal rulers (top & bottom), numbers every 3 cells
  var hGroup = 3;
  for (var i = 0; i <= cols; i++) {
    var x = L + i * step;
    var hx = x + step / 2;

    // top
    p.push('<line x1="' + x + '" y1="' + (T - 2 - tl) + '" x2="' + x + '" y2="' + (T - 2) + '" stroke="' + majorColor + '" stroke-width="1"/>');
    if (i < cols) p.push('<line x1="' + hx + '" y1="' + (T - 2 - ts) + '" x2="' + hx + '" y2="' + (T - 2) + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
    if (i > 0 && i < cols && i % hGroup === 0) {
      p.push('<text x="' + (x + 3) + '" y="' + (T + fs + 2) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '">' + (i / hGroup) + '</text>');
    }

    // bottom (mirrored)
    p.push('<line x1="' + x + '" y1="' + (B + 2) + '" x2="' + x + '" y2="' + (B + 2 + tl) + '" stroke="' + majorColor + '" stroke-width="1"/>');
    if (i < cols) p.push('<line x1="' + hx + '" y1="' + (B + 2) + '" x2="' + hx + '" y2="' + (B + 2 + ts) + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
    var ri = cols - i;
    if (i > 0 && i < cols && ri % hGroup === 0) {
      p.push('<text x="' + (x - 3) + '" y="' + (B - 5) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="end">' + (ri / hGroup) + '</text>');
    }
  }
  p.push('<line x1="' + L + '" y1="' + (T - 2) + '" x2="' + R + '" y2="' + (T - 2) + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
  p.push('<line x1="' + L + '" y1="' + (B + 2) + '" x2="' + R + '" y2="' + (B + 2) + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');

  // vertical rulers (left & right)
  for (var j = 0; j <= rows; j++) {
    var y = T + j * step;
    var hy = y + step / 2;

    // left
    p.push('<line x1="' + (L - 2 - tl) + '" y1="' + y + '" x2="' + (L - 2) + '" y2="' + y + '" stroke="' + majorColor + '" stroke-width="1"/>');
    if (j < rows) p.push('<line x1="' + (L - 2 - ts) + '" y1="' + hy + '" x2="' + (L - 2) + '" y2="' + hy + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
    if (j > 0 && j < rows) p.push('<text x="' + (L + 4) + '" y="' + (y + fs + 2) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '">' + j + '</text>');

    // right (mirrored)
    p.push('<line x1="' + (R + 2) + '" y1="' + y + '" x2="' + (R + 2 + tl) + '" y2="' + y + '" stroke="' + majorColor + '" stroke-width="1"/>');
    if (j < rows) p.push('<line x1="' + (R + 2) + '" y1="' + hy + '" x2="' + (R + 2 + ts) + '" y2="' + hy + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
    if (j > 0 && j < rows) p.push('<text x="' + (R - 4) + '" y="' + (y - 4) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="end">' + (rows - j) + '</text>');
  }
  p.push('<line x1="' + (L - 2) + '" y1="' + T + '" x2="' + (L - 2) + '" y2="' + B + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');
  p.push('<line x1="' + (R + 2) + '" y1="' + T + '" x2="' + (R + 2) + '" y2="' + B + '" stroke="' + rulerColor + '" stroke-width="0.5"/>');

  // corner zeros
  p.push('<text x="' + (padL / 2) + '" y="' + (padT / 2 + fs / 3) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="middle">0</text>');
  p.push('<text x="' + (R + padL / 2) + '" y="' + (padT / 2 + fs / 3) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="middle">0</text>');
  p.push('<text x="' + (padL / 2) + '" y="' + (B + padT / 2 + fs / 3) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="middle">0</text>');
  p.push('<text x="' + (R + padL / 2) + '" y="' + (B + padT / 2 + fs / 3) + '" fill="' + numColor + '" ' + F + ' font-size="' + fs + '" text-anchor="middle">0</text>');

  // 45° guides from top corners
  var diag45 = Math.min(gridW, gridH);
  p.push('<line x1="' + L + '" y1="' + T + '" x2="' + (L + diag45) + '" y2="' + (T + diag45) + '" stroke="' + guideColor + '" stroke-width="1.5"/>');
  p.push('<line x1="' + R + '" y1="' + T + '" x2="' + (R - diag45) + '" y2="' + (T + diag45) + '" stroke="' + guideColor + '" stroke-width="1.5"/>');

  // 60° guides from bottom corners
  var rise60 = gridH;
  var run60 = rise60 / Math.tan(60 * Math.PI / 180);
  var clampedRun = Math.min(run60, gridW);
  var clampedRise = Math.min(rise60, gridW * Math.tan(60 * Math.PI / 180));
  p.push('<line x1="' + L + '" y1="' + B + '" x2="' + (L + clampedRun) + '" y2="' + (B - clampedRise) + '" stroke="' + guideColor + '" stroke-width="1.5"/>');
  p.push('<line x1="' + R + '" y1="' + B + '" x2="' + (R - clampedRun) + '" y2="' + (B - clampedRise) + '" stroke="' + guideColor + '" stroke-width="1.5"/>');

  svg.innerHTML = p.join('');
}

build();
window.addEventListener('resize', build);
