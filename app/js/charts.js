'use strict';
// Tiny SVG chart helpers. Each returns an SVG string; colors come from CSS variables.

CISSP.charts = {
  donut(items, opts = {}) {
    const size = opts.size || 220, r = size / 2 - 14, cx = size / 2, cy = size / 2, sw = opts.stroke || 26;
    const total = items.reduce((s, i) => s + i.value, 0) || 1;
    const C = 2 * Math.PI * r;
    let off = 0;
    const arcs = items.map(it => {
      const len = (it.value / total) * C;
      const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${it.color}" stroke-width="${sw}"
        stroke-dasharray="${len - 2} ${C - len + 2}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cy})">
        <title>${CISSP.esc(it.label)}: ${it.value}${opts.unit || ''}</title></circle>`;
      off += len;
      return seg;
    }).join('');
    const center = opts.center ? `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700">${opts.center}</text>
      <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" opacity=".7">${opts.sub || ''}</text>` : '';
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">${arcs}${center}</svg>`;
  },

  // Horizontal bars, values 0..100. Optional `target` draws a marker line.
  hbars(items, opts = {}) {
    const w = 520, rowH = 28, labelW = opts.labelW || 190, barW = w - labelW - 50;
    const h = items.length * rowH + 10;
    const rows = items.map((it, i) => {
      const y = i * rowH + 6;
      const v = it.value == null ? 0 : Math.max(0, Math.min(100, it.value));
      const bar = it.value == null
        ? `<text x="${labelW + 4}" y="${y + 15}" font-size="11" opacity=".55">no data</text>`
        : `<rect x="${labelW}" y="${y + 3}" width="${(barW * v) / 100}" height="${rowH - 10}" rx="4" fill="${it.color}"/>
           <text x="${labelW + (barW * v) / 100 + 6}" y="${y + 16}" font-size="12" font-weight="600">${Math.round(v)}%</text>`;
      return `<text x="${labelW - 8}" y="${y + 16}" font-size="12" text-anchor="end">${CISSP.esc(it.label)}</text>
        <rect x="${labelW}" y="${y + 3}" width="${barW}" height="${rowH - 10}" rx="4" fill="currentColor" opacity=".08"/>${bar}`;
    }).join('');
    const target = opts.target != null
      ? `<line x1="${labelW + (barW * opts.target) / 100}" x2="${labelW + (barW * opts.target) / 100}" y1="2" y2="${h - 2}" stroke="var(--ok)" stroke-dasharray="4 3"/>`
      : '';
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;color:var(--text)">${rows}${target}</svg>`;
  },

  // Line chart of {x label, y} with optional horizontal reference line.
  line(points, opts = {}) {
    const w = 520, h = 200, pl = 40, pr = 10, pt = 12, pb = 28;
    const min = opts.min ?? 0, max = opts.max ?? 1000;
    const X = i => pl + (points.length <= 1 ? (w - pl - pr) / 2 : (i * (w - pl - pr)) / (points.length - 1));
    const Y = v => pt + (h - pt - pb) * (1 - (v - min) / (max - min));
    const grid = [0, .25, .5, .75, 1].map(f => {
      const v = min + f * (max - min);
      return `<line x1="${pl}" x2="${w - pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="currentColor" opacity=".08"/>
        <text x="${pl - 6}" y="${Y(v) + 4}" font-size="10" text-anchor="end" opacity=".6">${Math.round(v)}</text>`;
    }).join('');
    const ref = opts.ref != null ? `<line x1="${pl}" x2="${w - pr}" y1="${Y(opts.ref)}" y2="${Y(opts.ref)}" stroke="var(--ok)" stroke-dasharray="5 4"/>
      <text x="${w - pr}" y="${Y(opts.ref) - 4}" font-size="10" text-anchor="end" fill="var(--ok)">${opts.refLabel || ''}</text>` : '';
    const path = points.map((p, i) => `${i ? 'L' : 'M'}${X(i)},${Y(p.y)}`).join(' ');
    const dots = points.map((p, i) => `<circle cx="${X(i)}" cy="${Y(p.y)}" r="4" fill="${p.y >= (opts.ref ?? -1) ? 'var(--ok)' : 'var(--bad)'}"><title>${CISSP.esc(p.x)}: ${p.y}</title></circle>`).join('');
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;color:var(--text)">${grid}${ref}
      <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2"/>${dots}</svg>`;
  },
};
