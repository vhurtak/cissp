'use strict';
// Exam simulator view: setup → timed run (no going back) → score report.

(() => {
  const C = CISSP, { L, esc, store } = C, CAT = C.CAT;
  const tr = (en, r) => (C.lang === 'ru' ? r : en);
  const weights = () => Object.fromEntries(C.domains.map(d => [d.id, d.weight]));
  const qById = id => C.allQuestions().find(q => q.id === id);
  let timer = null;

  C.examStop = () => { clearInterval(timer); timer = null; C.examActive = false; store.set('activeExam', null); C._qKeys = null; };

  const MODES = {
    cat: { en: 'Full CAT simulation', ru: 'Полная CAT-симуляция', d: { en: '100–150 items, 3 hours, adaptive difficulty, 25 unscored pretest items, no going back. Ends as soon as the engine is 95% confident you are above or below the passing standard.', ru: '100–150 вопросов, 3 часа, адаптивная сложность, 25 незачётных пилотных, без возврата. Завершается, как только движок на 95% уверен, что вы выше или ниже порога.' } },
    mini: { en: 'Mini CAT', ru: 'Мини-CAT', d: { en: '25–50 items, 60 minutes, adaptive. A quick readiness check you can fit into a lunch break.', ru: '25–50 вопросов, 60 минут, адаптивно. Быстрая проверка готовности.' } },
    linear: { en: 'Linear 125', ru: 'Линейный 125', d: { en: 'Fixed 125 items weighted by domain, 3 hours, no adaptivity. Pass mark 70%. Good for building stamina.', ru: 'Фиксированные 125 вопросов по весам доменов, 3 часа, без адаптивности. Порог 70%. Тренирует выносливость.' } },
  };

  C.views.exam = main => {
    const saved = store.get('activeExam', null);
    let mode = 'cat';
    const render = () => {
      main.innerHTML = `<h1>${tr('Exam simulator', 'Симулятор экзамена')}</h1>
        ${saved ? `<div class="card hint"><b>${tr('Unfinished exam found', 'Найден незавершённый экзамен')}</b> — ${esc(L(MODES[saved.preset]))}, ${saved.items.length} ${tr('items answered', 'отвечено')}.
          <div class="row" style="margin-top:8px"><button class="btn primary" id="resume">${tr('Resume (timer kept running)', 'Продолжить (таймер шёл)')}</button><button class="btn" id="discard">${tr('Discard', 'Удалить')}</button></div></div>` : ''}
        <div class="grid">${Object.keys(MODES).map(k => `<div class="card mode-card ${k === mode ? 'on' : ''}" data-m="${k}"><h3 style="margin-top:0">${esc(L(MODES[k]))}</h3><div class="small">${esc(L(MODES[k].d))}</div></div>`).join('')}</div>
        <div class="card"><h3 style="margin-top:0">${tr('Rules (same as the real CISSP CAT)', 'Правила (как на реальном CAT)')}</h3>
          <ul><li>${tr('One question at a time. Once you submit, you cannot go back or change it.', 'Один вопрос за раз. После ответа вернуться нельзя.')}</li>
          <li>${tr('No feedback during the exam. Domain and difficulty are hidden.', 'Во время экзамена нет обратной связи; домен и сложность скрыты.')}</li>
          <li>${tr('The countdown keeps running even if you reload the page. Progress is saved automatically.', 'Таймер идёт даже при перезагрузке страницы; прогресс сохраняется.')}</li>
          <li>${tr('Questions are drawn in proportion to the official domain weights, including drag-and-drop style items.', 'Вопросы подбираются по официальным весам доменов, включая «drag-and-drop».')}</li></ul>
          <div class="small muted">${tr('Scoring is a simplified Rasch/IRT model calibrated to this app\'s question bank (~300 items), so treat the scaled score as an estimate. After several runs you will see repeated questions, which inflates the score. Aim for consistent passes with a margin (≥ 750).',
            'Оценка — упрощённая модель Раша/IRT на банке вопросов приложения (~300), поэтому балл ориентировочный. После нескольких прогонов вопросы повторяются, что завышает балл. Цель — стабильно ≥ 750.')}</div>
          <div class="row" style="margin-top:12px"><button class="btn primary" id="begin">▶ ${tr('Begin exam', 'Начать экзамен')}</button></div></div>
        ${historyTable()}`;
      main.querySelectorAll('[data-m]').forEach(c => c.onclick = () => { mode = c.dataset.m; render(); });
      main.querySelector('#begin').onclick = () => {
        if (saved && !confirm(tr('This will discard the unfinished exam. Continue?', 'Незавершённый экзамен будет удалён. Продолжить?'))) return;
        start(main, mode, null);
      };
      if (saved) {
        main.querySelector('#resume').onclick = () => start(main, saved.preset, saved);
        main.querySelector('#discard').onclick = () => { store.set('activeExam', null); C.views.exam(main); };
      }
    };
    render();
  };

  function historyTable() {
    const ex = store.get('history', []).filter(h => h.type === 'exam').slice(-10).reverse();
    if (!ex.length) return '';
    return `<div class="card table-wrap"><h3 style="margin-top:0">${tr('Recent simulations', 'Последние симуляции')}</h3><table><thead><tr><th>${tr('Date', 'Дата')}</th><th>${tr('Mode', 'Режим')}</th><th>${tr('Items', 'Вопросов')}</th><th>${tr('Score', 'Балл')}</th><th>${tr('Result', 'Итог')}</th></tr></thead>
      <tbody>${ex.map(e => `<tr><td>${new Date(e.date).toLocaleString()}</td><td>${esc(e.mode)}</td><td>${e.n}</td><td>${e.scaled}</td><td><span class="pill ${e.pass ? 'ok' : 'bad'}">${e.pass ? 'PASS' : 'FAIL'}</span></td></tr>`).join('')}</tbody></table></div>`;
  }

  function start(main, preset, saved) {
    const bank = C.allQuestions();
    const exam = CAT.createExam(bank, weights(), preset);
    let deadline = Date.now() + exam.cfg.minutes * 60000, startedAt = Date.now(), current = null;
    const answers = []; // {qid, ok}
    if (saved) {
      deadline = saved.deadline; startedAt = saved.startedAt;
      exam.pretestSlots = new Set(saved.pretestSlots);
      if (saved.linearIds) exam.linearQueue = saved.linearIds.map(qById).filter(Boolean);
      saved.items.forEach(it => { const q = qById(it.qid); if (q) { CAT.record(exam, q, it.ok); answers.push({ qid: it.qid, ok: it.ok }); } });
      current = saved.currentQid ? qById(saved.currentQid) : null;
    }
    const persist = () => store.set('activeExam', {
      preset, deadline, startedAt, pretestSlots: [...exam.pretestSlots], currentQid: current && current.id,
      linearIds: exam.linearQueue ? exam.linearQueue.map(q => q.id) : null, items: answers,
    });

    C.examActive = true;
    clearInterval(timer);
    const tick = () => {
      const left = (deadline - Date.now()) / 1000;
      const el = document.getElementById('examTimer');
      if (el) { el.textContent = C.fmtTime(left); el.classList.toggle('low', left < 600); }
      if (left <= 0) { CAT.timeout(exam); end(); }
    };
    const end = () => {
      clearInterval(timer); timer = null; C.examActive = false; C._qKeys = null;
      store.set('activeExam', null);
      if (!exam.done) CAT.finish(exam, 'bank-exhausted');
      report(main, exam, answers, startedAt);
    };

    const next = () => {
      if (exam.done) return end();
      if (!current) current = CAT.nextItem(exam, bank);
      if (!current) return end();
      persist();
      const n = exam.items.length + 1;
      const header = `<div class="exam-bar"><b>${tr('Item', 'Вопрос')} ${n}</b><span class="muted small">${exam.cfg.min === exam.cfg.max ? `/ ${exam.cfg.max}` : `(${exam.cfg.min}–${exam.cfg.max})`}</span>
        <span class="spacer"></span><span class="muted small">${tr('Time remaining', 'Осталось')}</span><span class="timer" id="examTimer"></span>
        <button class="btn small" id="abandon">${tr('Abandon', 'Прервать')}</button></div>`;
      const q = current;
      C.renderQuestion(main, q, {
        mode: 'exam', header,
        onAnswer: ok => {
          CAT.record(exam, q, ok);
          C.recordAnswer(q.id, ok);
          answers.push({ qid: q.id, ok });
          current = null;
          persist();
          next();
        },
      });
      main.querySelector('#abandon').onclick = () => {
        if (confirm(tr('Abandon this exam? It will not be scored.', 'Прервать экзамен? Он не будет оценён.'))) { C.examStop(); C.views.exam(main); }
      };
      tick();
      window.scrollTo(0, 0);
    };
    timer = setInterval(tick, 1000);
    next();
  }

  const REASONS = {
    'confident-pass': { en: 'The engine reached 95% confidence that your ability is ABOVE the passing standard.', ru: 'Движок на 95% уверен, что ваш уровень ВЫШЕ порога.' },
    'confident-fail': { en: 'The engine reached 95% confidence that your ability is BELOW the passing standard.', ru: 'Движок на 95% уверен, что ваш уровень НИЖЕ порога.' },
    'max-length': { en: 'Maximum number of items reached; decided on your final ability estimate.', ru: 'Достигнут максимум вопросов; решение по итоговой оценке уровня.' },
    timeout: { en: 'Time expired. Below the minimum item count = fail; otherwise the last 75 ability estimates must all be above the standard.', ru: 'Время вышло. Меньше минимума вопросов — провал; иначе последние 75 оценок должны быть выше порога.' },
    complete: { en: 'All items answered.', ru: 'Все вопросы отвечены.' },
    'bank-exhausted': { en: 'Question bank exhausted.', ru: 'Банк вопросов исчерпан.' },
  };

  function report(main, exam, answers, startedAt) {
    const r = exam.result;
    const used = Math.round((Date.now() - startedAt) / 1000);
    const h = store.get('history', []);
    h.push({ type: 'exam', mode: L(MODES[exam.preset]), date: Date.now(), n: exam.items.length, scaled: r.scaled, pass: r.pass, byDomain: r.byDomain, seconds: used });
    store.set('history', h.slice(-200));
    const scoredItems = exam.items.filter(i => !i.pretest);
    const correct = scoredItems.filter(i => i.ok).length;
    const lvlPill = l => `<span class="pill ${l === 'Above' ? 'ok' : l === 'Below' ? 'bad' : l === 'Near' ? 'warn' : ''}">${l === 'Above' ? tr('Above proficiency', 'Выше уровня') : l === 'Near' ? tr('Near proficiency', 'Около уровня') : l === 'Below' ? tr('Below proficiency', 'Ниже уровня') : 'n/a'}</span>`;
    main.innerHTML = `<h1>${tr('Exam result', 'Результат экзамена')}</h1>
      <div class="result-banner ${r.pass ? 'pass' : 'fail'}"><div class="big">${r.pass ? 'PASS' : 'FAIL'}</div>
        <div>${tr('Estimated scaled score', 'Оценка балла')}: <b>${r.scaled}</b> / 1000 (${tr('passing', 'порог')} 700)</div></div>
      <div class="grid" style="margin-top:14px">
        <div class="card"><div class="stat-label">${tr('Items answered', 'Отвечено')}</div><div class="stat">${exam.items.length}</div><div class="small muted">${exam.items.length - scoredItems.length} ${tr('unscored pretest', 'незачётных пилотных')}</div></div>
        <div class="card"><div class="stat-label">${tr('Scored correct', 'Верно (зачётных)')}</div><div class="stat">${correct}/${scoredItems.length}</div><div class="small muted">${C.pct(correct, scoredItems.length)}%</div></div>
        <div class="card"><div class="stat-label">${tr('Time used', 'Время')}</div><div class="stat">${C.fmtTime(used)}</div><div class="small muted">${exam.items.length ? Math.round(used / exam.items.length) : 0} ${tr('s / item', 'с / вопрос')}</div></div>
        ${r.theta != null ? `<div class="card"><div class="stat-label">${tr('Ability estimate', 'Оценка уровня')}</div><div class="stat">${r.theta.toFixed(2)}</div><div class="small muted">±${(1.96 * r.se).toFixed(2)} (95%) · ${tr('standard', 'порог')} ${exam.passTheta}</div></div>` : ''}
      </div>
      <div class="card hint">${esc(L(REASONS[r.reason] || REASONS.complete))}</div>
      ${exam.trajectory.length > 1 ? `<div class="card"><h3 style="margin-top:0">${tr('Ability estimate over the exam', 'Динамика оценки уровня')}</h3>
        <div class="chart-wrap">${C.charts.line(exam.trajectory.map((y, i) => ({ x: 'scored item ' + (i + 1), y: +((y + 4) * 125).toFixed(0) })), { min: 0, max: 1000, ref: (exam.passTheta + 4) * 125, refLabel: tr('passing standard', 'порог') })}</div>
        <div class="small muted">${tr('Ability scale mapped to 0–1000 for display (not the scaled score).', 'Шкала уровня приведена к 0–1000 для наглядности (это не итоговый балл).')}</div></div>` : ''}
      <div class="card table-wrap"><h3 style="margin-top:0">${tr('Domain performance', 'Результаты по доменам')}</h3>
        <table><thead><tr><th>${tr('Domain', 'Домен')}</th><th>${tr('Items', 'Вопросов')}</th><th>${tr('Correct', 'Верно')}</th><th>${tr('Level', 'Уровень')}</th></tr></thead>
        <tbody>${C.domains.map(d => { const b = r.byDomain[d.id] || { n: 0, ok: 0, level: 'n/a' };
          return `<tr><td><span class="dom-dot" style="background:${C.domColor(d.id)}"></span><a href="#/domain/${d.id}">D${d.id} ${esc(L(d.title))}</a></td><td>${b.n}</td><td>${b.ok}</td><td>${lvlPill(b.level)}</td></tr>`; }).join('')}</tbody></table>
        <div class="small muted">${tr('Like the real ISC2 report, levels are relative to the passing standard. Small item counts per domain make them noisy.', 'Как в реальном отчёте ISC2, уровни относительно порога; при малом числе вопросов они неточны.')}</div></div>
      <div class="card"><h3 style="margin-top:0">${tr('Review all items', 'Разбор всех вопросов')}</h3>
        ${exam.items.map((it, k) => { const q = qById(it.qid); return `<details><summary>${it.ok ? '✅' : '❌'} <b>${k + 1}.</b> <span class="small muted">D${q.dom}${it.pretest ? ' · pretest' : ''}</span> ${esc(q.q)}</summary>
          <div class="explain">${q.t === 'mcq' ? `<b>${esc(q.a[q.c])}</b><br>` : q.t === 'order' ? `<ol>${q.items.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : `<ul>${q.pairs.map(p => `<li>${esc(p[0])} → ${esc(p[1])}</li>`).join('')}</ul>`}
          ${esc(C.lang === 'ru' ? q.r : q.e)}<div style="margin-top:6px">${C.lang === 'ru' ? '' : C.ruToggle(esc(q.r))}</div></div></details>`; }).join('')}</div>
      <div class="row"><button class="btn primary" id="newExam">${tr('New simulation', 'Новая симуляция')}</button><a class="btn" href="#/dashboard">${tr('Dashboard', 'Обзор')}</a></div>`;
    main.querySelector('#newExam').onclick = () => C.views.exam(main);
    window.scrollTo(0, 0);
  }
})();
