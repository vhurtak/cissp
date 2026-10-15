// Validates the question bank and simulates CAT exams for examinees of known ability.
// Usage: node tools/validate.js   (SIM_RUNS=60 for more simulation runs)
const fs = require('fs'), vm = require('vm'), path = require('path');
const app = process.argv[2] || path.join(__dirname, '..', 'app');
const ctx = { window: {}, console, localStorage: undefined, document: { addEventListener() {} } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ['js/core.js', 'data/meta.js', ...[1,2,3,4,5,6,7,8].map(i => `data/d${i}.js`), 'data/basics.js', 'data/ru-match.js', ...[1,2,3,4,5,6,7,8].map(i => `data/x${i}.js`).filter(f => fs.existsSync(path.join(app, f))), 'js/cat.js', 'data/path/index.js'])
  vm.runInContext(fs.readFileSync(path.join(app, f), 'utf8'), ctx, { filename: f });
const C = ctx.CISSP;
let errs = 0; const err = m => { errs++; console.log('ERR', m); };
const ids = new Set();
let tot = 0, byType = {}, byDiff = {};
C.domains.forEach(d => {
  if (!d) return err('missing domain');
  d.questions.forEach(q => {
    tot++; byType[q.t] = (byType[q.t]||0)+1; byDiff[q.d]=(byDiff[q.d]||0)+1;
    if (ids.has(q.id)) err('dup ' + q.id); ids.add(q.id);
    if (!q.q || !q.e || !q.r) err('missing text ' + q.id);
    if (!d.objectives.some(o => o[0] === q.o)) err('bad objective ' + q.id + ' ' + q.o);
    if (q.t === 'mcq') { if (!Array.isArray(q.a) || q.a.length !== 4 || q.c == null || !q.a[q.c]) err('mcq ' + q.id); if (new Set(q.a).size !== 4) err('dup opts ' + q.id); }
    if (q.t === 'order' && !(q.items && q.items.length >= 3)) err('order ' + q.id);
    if (q.t === 'match' && !(q.pairs && q.pairs.length >= 3)) err('match ' + q.id);
  });
  d.terms.forEach(t => { if (!t.term || !t.en || !t.ru) err('term ' + t.id); });
  d.concepts.forEach(c => { if (!c.t.en || !c.b.en || !c.b.ru) err('concept ' + c.key); if (c.w && !['flow','layers','compare','riskCalc','controlGame','secModels','keyCount','hashDemo','cipher','biometric','backupSim','sharedResp'].includes(c.w[0])) err('widget ' + c.w[0]); });
  console.log(`D${d.id} w=${d.weight} q=${d.questions.length} terms=${d.terms.length} concepts=${d.concepts.length}`);
});
// beginner layer: architecture diagrams must reference existing nodes
const checkDg = (dg, where) => [].concat(dg || []).forEach(g => {
  const ids = new Set(g.nodes.map(n => n[0]));
  (g.edges || []).forEach(e => { if (!ids.has(e[0]) || !ids.has(e[1])) err('diagram edge ' + where + ' ' + e[0] + '>' + e[1]); });
});
C.basics.sections.forEach((s, i) => { if (!s.t.en || !s.b.en || !s.b.ru) err('basics section ' + i); checkDg(s.dg, 'basics' + i); });
C.basics.glossary.forEach(g => { if (!g[0] || !g[1] || !g[2]) err('basics term ' + g[0]); });
const known = new Set([...C.allTerms().map(t => t.term), ...C.basics.glossary.map(g => g[0])]);
Object.entries(C.ruMatch || {}).forEach(([term, pats]) => { if (!known.has(term)) err('ruMatch unknown term ' + term); pats.forEach(p => { if (!/[а-яё]/i.test(p)) err('ruMatch pattern has no Cyrillic ' + term + ': ' + p); }); });
let explained = 0, all = 0;
C.domains.forEach(d => d.concepts.forEach(c => { all++; if (c.plain && c.ex) explained++; checkDg(c.dg, c.key); }));
console.log('basics sections', C.basics.sections.length, 'basics terms', C.basics.glossary.length, 'concepts explained', explained + '/' + all);
// learning path (data/path): ids, links, required fields, rhythm, coverage
const pathFiles = C.pathStages.filter(m => m.file);
pathFiles.forEach(m => vm.runInContext(fs.readFileSync(path.join(app, 'data/path', m.file), 'utf8'), ctx, { filename: m.file }));
const KINDS = ['story', 'idea', 'picture', 'vs', 'think', 'link', 'recap', 'back'];
const conceptKeys = new Set(C.domains.flatMap(d => d.concepts.map(c => c.key)));
const words = h => (h || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const order = new Map(), intro = {}, revisit = {};
let pathCards = 0;
C.pathStages.forEach((m, i) => { if (m.n !== i + 1) err('path stage numbering ' + m.n); });
pathFiles.forEach(m => {
  const st = C.stages[m.n];
  if (!st || !st.cards.length) return err('path stage ' + m.n + ' has no cards (' + m.file + ')');
  const cards = st.cards;
  if (!['story', 'idea'].includes(cards[0].kind)) err('path stage ' + m.n + ' should open with a story or idea card');
  if (!m.partial && cards[cards.length - 1].kind !== 'recap') err('path stage ' + m.n + ' should end with a recap (or be marked partial)');
  cards.forEach((c, i) => {
    const w = 'path ' + c.id;
    pathCards++;
    if (!new RegExp('^s' + String(m.n).padStart(2, '0') + '-\\d{3}$').test(c.id)) err(w + ' id does not match its stage');
    if (order.has(c.id)) err(w + ' duplicate id');
    order.set(c.id, order.size);
    if (!KINDS.includes(c.kind)) err(w + ' unknown kind ' + c.kind);
    for (const f of ['title', 'body', 'take']) if (!c[f] || !c[f].en || !c[f].ru) err(w + ' missing EN/RU ' + f);
    for (const lang of ['en', 'ru']) if (c.body && words(c.body[lang]) > 120) err(w + ' body over 120 words (' + lang + ' ' + words(c.body[lang]) + ')');
    if (c.kind !== 'recap' && !(c.k && c.k.length)) err(w + ' needs concept ids in k');
    (c.k || []).forEach(k => { if (!conceptKeys.has(k)) err(w + ' unknown concept ' + k); });
    if (c.kind === 'picture' && !c.dg) err(w + ' picture card needs dg');
    checkDg(c.dg, c.id);
    if (c.kind === 'think' && !(c.reveal && c.reveal.en && c.reveal.ru)) err(w + ' think card needs reveal EN/RU');
    if (c.kind !== 'think' && c.reveal) err(w + ' only think cards have reveal');
    if (c.kind === 'back' && !(c.back && order.has(c.back) && c.back !== c.id)) err(w + ' back must point to an earlier card: ' + c.back);
    if (c.kind !== 'back' && c.back) err(w + ' only back cards have back');
    if (c.kind === 'recap') {
      if (!(c.items && c.items.length >= 5 && c.items.length <= 7)) err(w + ' recap needs 5-7 items');
      (c.items || []).forEach(([id, txt]) => { if (!order.has(id)) err(w + ' recap item points to unknown or later card ' + id); if (!txt || !txt.en || !txt.ru) err(w + ' recap item missing EN/RU ' + id); });
    }
    if (i >= 2 && cards[i - 1].kind === c.kind && cards[i - 2].kind === c.kind) err(w + ' third ' + c.kind + ' card in a row');
    (c.k || []).forEach(k => { if (intro[k] == null) intro[k] = c.id; else revisit[k] = (revisit[k] || 0) + 1; });
  });
});
const introduced = Object.keys(intro).length, revisited2 = Object.values(revisit).filter(n => n >= 2).length;
console.log('path stages', pathFiles.length + '/' + C.pathStages.length, 'cards', pathCards, 'concepts introduced', introduced + '/' + conceptKeys.size, 'revisited 2+ times', revisited2);
// Coverage of every concept is the goal for the finished path; enforced once all stages exist.
if (pathFiles.length === C.pathStages.length && !pathFiles.some(m => m.partial)) conceptKeys.forEach(k => { if (!intro[k]) err('path never introduces ' + k); else if ((revisit[k] || 0) < 2) err('path revisits ' + k + ' fewer than 2 times'); });
console.log('total q', tot, byType, 'diff', byDiff, 'terms', C.allTerms().length, 'weights', C.domains.reduce((s,d)=>s+d.weight,0));
// CAT simulation
const CAT = C.CAT, bank = C.allQuestions(), W = Object.fromEntries(C.domains.map(d => [d.id, d.weight]));
for (const preset of ['cat', 'mini', 'linear']) for (const th of [-1, 0, 0.4, 0.6, 0.8, 1.2, 2]) {
  let pass = 0, len = 0, sc = 0; const N = +(process.env.SIM_RUNS || 30);
  for (let k = 0; k < N; k++) {
    const ex = CAT.createExam(bank, W, preset);
    let q;
    while ((q = CAT.nextItem(ex, bank))) { CAT.record(ex, q, Math.random() < CAT.prob(th, CAT.DIFF[q.d])); if (ex.done) break; }
    if (!ex.done) CAT.finish(ex, 'bank-exhausted');
    pass += ex.result.pass; len += ex.items.length; sc += ex.result.scaled;
  }
  console.log(preset, 'θ=' + th, 'pass%', Math.round(pass / N * 100), 'avgLen', Math.round(len / N), 'avgScaled', Math.round(sc / N));
}
console.log(errs ? errs + ' ERRORS' : 'OK');
