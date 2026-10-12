// Validates the question bank and simulates CAT exams for examinees of known ability.
// Usage: node tools/validate.js   (SIM_RUNS=60 for more simulation runs)
const fs = require('fs'), vm = require('vm'), path = require('path');
const app = process.argv[2] || path.join(__dirname, '..', 'app');
const ctx = { window: {}, console, localStorage: undefined, document: { addEventListener() {} } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ['js/core.js', 'data/meta.js', ...[1,2,3,4,5,6,7,8].map(i => `data/d${i}.js`), 'data/basics.js', ...[1,2,3,4,5,6,7,8].map(i => `data/x${i}.js`).filter(f => fs.existsSync(path.join(app, f))), 'js/cat.js'])
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
let explained = 0, all = 0;
C.domains.forEach(d => d.concepts.forEach(c => { all++; if (c.plain && c.ex) explained++; checkDg(c.dg, c.key); }));
console.log('basics sections', C.basics.sections.length, 'basics terms', C.basics.glossary.length, 'concepts explained', explained + '/' + all);
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
