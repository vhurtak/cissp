'use strict';
// Simplified Computerized Adaptive Testing engine modeled on the ISC2 CISSP CAT rules:
//  - Rasch (1PL) model, ability estimated by EAP on a grid.
//  - Content balancing toward the official domain weights.
//  - 25 unscored pretest items placed randomly (realistic mode).
//  - Stops once the minimum length is reached and the 95% confidence interval is
//    entirely above or below the passing standard, or at the maximum length.
//  - Time-out: below minimum = fail; otherwise the last 75 scored ability
//    estimates must all be at or above the passing standard.
// Item difficulty labels (1 easy, 2 medium, 3 hard) are mapped to logits.
// It's an approximation for practice, not ISC2's actual algorithm or item calibration.

(function (root) {
  const DIFF = { 1: -1.0, 2: 0.0, 3: 1.0 };
  const GRID = [];
  for (let t = -4; t <= 4.0001; t += 0.05) GRID.push(+t.toFixed(2));

  function prob(theta, b) { return 1 / (1 + Math.exp(-(theta - b))); }

  // Log-posterior over GRID with a weak normal prior N(0, 2^2); updated one response at a time.
  function prior() { return GRID.map(t => -(t * t) / 8); }
  function update(logpost, b, ok) {
    for (let i = 0; i < GRID.length; i++) { const p = prob(GRID[i], b); logpost[i] += Math.log(ok ? p : 1 - p); }
  }
  // EAP estimate (posterior mean and SD).
  function estimate(responses) {
    const lp = prior();
    responses.forEach(r => update(lp, r.b, r.ok));
    return summarize(lp);
  }
  function summarize(post) {
    let num = 0, den = 0, sq = 0;
    const mx = Math.max(...post);
    GRID.forEach((t, i) => { const w = Math.exp(post[i] - mx); num += w * t; den += w; });
    const mean = num / den;
    GRID.forEach((t, i) => { const w = Math.exp(post[i] - mx); sq += w * (t - mean) ** 2; });
    return { theta: mean, se: Math.sqrt(sq / den) };
  }

  const PRESETS = {
    cat: { label: 'Full CAT (realistic)', min: 100, max: 150, minutes: 180, pretest: 25, adaptive: true },
    mini: { label: 'Mini CAT', min: 25, max: 50, minutes: 60, pretest: 0, adaptive: true },
    linear: { label: 'Linear 125', min: 125, max: 125, minutes: 180, pretest: 0, adaptive: false },
  };

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // weights: {domainId: percent}
  function createExam(bank, weights, presetKey, passTheta) {
    const cfg = Object.assign({}, PRESETS[presetKey]);
    const pretestSlots = new Set(shuffle([...Array(cfg.min).keys()]).slice(0, cfg.pretest));
    const exam = {
      preset: presetKey, cfg, passTheta: passTheta ?? 0.6, weights,
      items: [], // {qid, dom, b, ok, pretest}
      used: new Set(), pretestSlots,
      theta: 0, se: 2, trajectory: [], done: false, result: null, logpost: prior(),
      linearQueue: null,
    };
    if (!cfg.adaptive) exam.linearQueue = buildLinear(bank, weights, cfg.max);
    return exam;
  }

  function buildLinear(bank, weights, n) {
    const out = [];
    const ids = Object.keys(weights).map(Number);
    let alloc = ids.map(id => ({ id, k: Math.floor(n * weights[id] / 100), rem: (n * weights[id] / 100) % 1 }));
    let left = n - alloc.reduce((s, a) => s + a.k, 0);
    alloc.sort((a, b) => b.rem - a.rem).forEach(a => { if (left > 0) { a.k++; left--; } });
    alloc.forEach(a => out.push(...shuffle(bank.filter(q => q.dom === a.id)).slice(0, a.k)));
    return shuffle(out);
  }

  // Pick the domain furthest below its target share, then the unused item closest to theta.
  function nextItem(exam, bank) {
    if (exam.done) return null;
    if (exam.linearQueue) return exam.linearQueue[exam.items.length] || null;
    const pos = exam.items.length;
    const isPretest = exam.pretestSlots.has(pos);
    const counts = {};
    exam.items.forEach(it => { counts[it.dom] = (counts[it.dom] || 0) + 1; });
    const ids = Object.keys(exam.weights).map(Number);
    const deficits = ids.map(id => ({ id, d: (exam.weights[id] / 100) * (pos + 1) - (counts[id] || 0) + Math.random() * 0.01 }))
      .sort((a, b) => b.d - a.d);
    for (const { id } of deficits) {
      const pool = bank.filter(q => q.dom === id && !exam.used.has(q.id));
      if (!pool.length) continue;
      if (isPretest) return pool[Math.floor(Math.random() * pool.length)];
      let best = Infinity, cands = [];
      for (const q of pool) {
        const dist = Math.abs(DIFF[q.d] - exam.theta);
        if (dist < best - 1e-9) { best = dist; cands = [q]; } else if (Math.abs(dist - best) < 1e-9) cands.push(q);
      }
      return cands[Math.floor(Math.random() * cands.length)];
    }
    const any = bank.filter(q => !exam.used.has(q.id));
    return any.length ? any[Math.floor(Math.random() * any.length)] : null;
  }

  function record(exam, q, ok) {
    const pos = exam.items.length;
    const pretest = !exam.linearQueue && exam.pretestSlots.has(pos);
    exam.items.push({ qid: q.id, dom: q.dom, b: DIFF[q.d], ok: !!ok, pretest });
    exam.used.add(q.id);
    if (!pretest) {
      update(exam.logpost, DIFF[q.d], !!ok);
      const est = summarize(exam.logpost);
      exam.theta = est.theta; exam.se = est.se;
      exam.trajectory.push(est.theta);
    }
    checkStop(exam);
  }

  function checkStop(exam) {
    const n = exam.items.length, { min, max } = exam.cfg;
    if (exam.linearQueue) {
      if (n >= exam.linearQueue.length) finish(exam, 'complete');
      return;
    }
    if (n >= min) {
      const lo = exam.theta - 1.96 * exam.se, hi = exam.theta + 1.96 * exam.se;
      if (lo > exam.passTheta) return finish(exam, 'confident-pass');
      if (hi < exam.passTheta) return finish(exam, 'confident-fail');
    }
    if (n >= max) finish(exam, 'max-length');
  }

  function timeout(exam) {
    if (exam.done) return;
    finish(exam, 'timeout');
  }

  function finish(exam, reason) {
    exam.done = true;
    const n = exam.items.length;
    const scored = exam.items.filter(i => !i.pretest);
    let pass;
    if (exam.linearQueue) {
      const pct = scored.length ? scored.filter(i => i.ok).length / exam.linearQueue.length : 0;
      pass = pct >= 0.7;
      exam.result = { reason, pass, pct, scaled: Math.round(Math.min(1000, Math.max(0, pct * 1000))) };
    } else {
      if (reason === 'timeout') {
        if (n < exam.cfg.min) pass = false;
        else pass = exam.trajectory.slice(-75).every(t => t >= exam.passTheta);
      } else if (reason === 'confident-pass') pass = true;
      else if (reason === 'confident-fail') pass = false;
      else pass = exam.theta >= exam.passTheta;
      exam.result = { reason, pass, theta: exam.theta, se: exam.se, scaled: scaled(exam.theta, exam.passTheta) };
    }
    exam.result.byDomain = byDomain(exam);
    return exam.result;
  }

  function scaled(theta, passTheta) { return Math.round(Math.max(0, Math.min(1000, 700 + (theta - passTheta) * 250))); }

  function byDomain(exam) {
    const out = {};
    const scored = exam.items.filter(i => !i.pretest);
    Object.keys(exam.weights).map(Number).forEach(id => {
      const its = scored.filter(i => i.dom === id);
      const est = its.length ? estimate(its) : null;
      const level = !est ? 'n/a' : est.theta >= exam.passTheta + 0.35 ? 'Above' : est.theta <= exam.passTheta - 0.35 ? 'Below' : 'Near';
      out[id] = { n: its.length, ok: its.filter(i => i.ok).length, level };
    });
    return out;
  }

  const api = { DIFF, PRESETS, prob, estimate, createExam, nextItem, record, timeout, finish, scaled };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CISSP.CAT = api;
})(typeof window !== 'undefined' ? window : globalThis);
