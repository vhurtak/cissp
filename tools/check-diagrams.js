// Checks concept diagrams in both languages: nodes inside the viewBox, no overlapping nodes, edge labels not on nodes.
// Usage: node tools/check-diagrams.js   (text widths use the same estimate as the arch widget in learn.js)
const fs = require('fs'), vm = require('vm'), path = require('path');
const app = process.argv[2] || path.join(__dirname, '..', 'app');
const ctx = { console, document: { addEventListener() {} } }; ctx.window = ctx; vm.createContext(ctx);
const files = ['js/core.js', 'data/meta.js', ...[1,2,3,4,5,6,7,8].map(i => `data/d${i}.js`), 'data/basics.js', ...[1,2,3,4,5,6,7,8].map(i => `data/x${i}.js`).filter(f => fs.existsSync(path.join(app, f)))];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(app, f), 'utf8'), ctx, { filename: f });
const C = ctx.CISSP, textW = (s, fs) => [...s].length * fs * 0.56;
const L = (v, lang) => v == null ? '' : typeof v === 'string' ? v : v[lang];
const ov = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
let n = 0;
const check = (g, where) => ['en', 'ru'].forEach(lang => {
  const W = g.w || 760, H = g.h || 300, nodes = {};
  g.nodes.forEach(([id, x, y, label, sub, icon, kind, fw]) => {
    const lab = (icon ? icon + ' ' : '') + L(label, lang), s = L(sub, lang);
    const w = fw || Math.max(96, textW(lab, 13) + 24, textW(s, 11) + 20), h = s ? 46 : 34;
    if (fw && (textW(lab, 13) + 16 > fw || textW(s, 11) + 12 > fw)) console.log(where, lang, 'text wider than fixed width', id);
    nodes[id] = { x, y, w, h, x1: x - w / 2, x2: x + w / 2, y1: y - h / 2, y2: y + h / 2 };
    if (x - w / 2 < 0 || x + w / 2 > W || y - h / 2 < 0 || y + h / 2 > H) { n++; console.log(where, lang, 'out of bounds', id); }
  });
  const ns = Object.entries(nodes);
  ns.forEach(([a, A], i) => ns.slice(i + 1).forEach(([b, B]) => { if (ov(A, B)) { n++; console.log(where, lang, 'overlap', a, b); } }));
  const pairs = new Set((g.edges || []).map(e => e[0] + '>' + e[1]));
  (g.edges || []).forEach(([f, t, label, kind, dx = 0, dy = 0]) => {
    if (!label) return;
    const a = nodes[f], b = nodes[t]; if (!a || !b) return;
    const at = pairs.has(t + '>' + f) ? 0.32 : 0.5;
    const clip = (a, b) => { const dx = b.x - a.x, dy = b.y - a.y, sx = dx ? (a.w / 2 + 4) / Math.abs(dx) : Infinity, sy = dy ? (a.h / 2 + 4) / Math.abs(dy) : Infinity, k = Math.min(sx, sy); return { x: a.x + dx * k, y: a.y + dy * k }; };
    const p = clip(a, b), q = clip(b, a), mx = p.x + (q.x - p.x) * at + dx, my = p.y + (q.y - p.y) * at + dy, lw = textW(L(label, lang), 11) + 10;
    const box = { x1: mx - lw / 2, x2: mx + lw / 2, y1: my - 9, y2: my + 8 };
    ns.forEach(([id, N]) => { if (ov(box, N)) { n++; console.log(where, lang, 'label', JSON.stringify(L(label, lang)), 'on node', id); } });
    if (box.x1 < 0 || box.x2 > W) { n++; console.log(where, lang, 'label out of bounds', L(label, lang)); }
  });
});
C.domains.forEach(d => d.concepts.forEach(c => [].concat(c.dg || []).forEach((g, i) => check(g, c.key + '#' + i))));
C.basics.sections.forEach((sec, k) => [].concat(sec.dg || []).forEach((g, i) => check(g, 'basics' + k + '#' + i)));
console.log(n ? n + ' layout issues' : 'layout OK');
