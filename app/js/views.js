'use strict';
// Views: dashboard, plan, domains, domain detail, flashcards, quiz, strategy, resources.
// Plus the shared question renderer used by quizzes and the exam simulator.

(() => {
  const C = CISSP, { L, t, esc, store } = C;
  const ru = () => C.lang === 'ru';
  const tr = (en, r) => (ru() ? r : en);
  const domName = id => L(C.dom(id).title);
  const domDot = id => `<span class="dom-dot" style="background:${C.domColor(id)}"></span>`;

  // ======================= shared question renderer =======================
  // opts: { mode: 'practice'|'exam', onAnswer(ok, q), onNext(), header }
  C.renderQuestion = (el, q, opts) => {
    const practice = opts.mode === 'practice';
    let state = {};
    // In exam mode the domain and difficulty stay hidden, as on the real exam.
    const meta = practice
      ? `<div class="row small muted" style="margin-bottom:8px">${domDot(q.dom)} D${q.dom} · ${esc(domName(q.dom))} · obj ${q.o}
        · <span class="pill">${['', 'easy', 'medium', 'hard'][q.d]}</span>${q.t !== 'mcq' ? ' · <span class="pill warn">advanced item</span>' : ''}</div>`
      : '';
    let body = '';
    if (q.t === 'mcq') {
      state.order = C.shuffle([0, 1, 2, 3]);
      body = `<div class="opts">${state.order.map((oi, k) => `<button class="opt" data-oi="${oi}"><span class="k">${'ABCD'[k]}</span><span>${esc(q.a[oi])}</span></button>`).join('')}</div>`;
    } else if (q.t === 'order') {
      state.cur = C.shuffle(q.items.map((_, i) => i));
      if (state.cur.every((v, i) => v === i)) state.cur.reverse();
      body = `<div class="small muted">${tr('Use ↑ ↓ to arrange the items in the correct order.', 'Расставьте элементы в правильном порядке кнопками ↑ ↓.')}</div><div class="order-list"></div>`;
    } else if (q.t === 'match') {
      state.rights = C.shuffle(q.pairs.map((_, i) => i));
      body = `<div class="small muted">${tr('Select the matching item for each row.', 'Выберите соответствие для каждой строки.')}</div>
        ${q.pairs.map((p, i) => `<div class="match-row" data-i="${i}"><span class="txt"><b>${esc(p[0])}</b></span>
          <select data-i="${i}"><option value="">—</option>${state.rights.map(ri => `<option value="${ri}">${esc(q.pairs[ri][1])}</option>`).join('')}</select></div>`).join('')}`;
    }
    el.innerHTML = `${opts.header || ''}<div class="card">${meta}<div class="q-stem">${esc(q.q)}</div>${body}
      <div class="row" style="margin-top:14px"><button class="btn primary" id="qSubmit" disabled>${practice ? t('submit') : tr('Submit and next →', 'Ответить и далее →')}</button>
      <span class="spacer"></span><span class="small muted">${q.t === 'mcq' ? tr('Keys: A–D / 1–4, Enter', 'Клавиши: A–D / 1–4, Enter') : ''}</span></div>
      <div id="qFeedback"></div></div>`;
    const submit = el.querySelector('#qSubmit');

    const renderOrder = () => {
      const list = el.querySelector('.order-list');
      list.innerHTML = state.cur.map((ii, pos) => `<div class="oi" data-pos="${pos}"><b>${pos + 1}.</b><span class="txt">${esc(q.items[ii])}</span>
        <button class="btn small" data-mv="-1" ${pos === 0 ? 'disabled' : ''}>↑</button><button class="btn small" data-mv="1" ${pos === state.cur.length - 1 ? 'disabled' : ''}>↓</button></div>`).join('');
      list.querySelectorAll('[data-mv]').forEach(b => b.onclick = () => {
        const pos = +b.closest('.oi').dataset.pos, to = pos + +b.dataset.mv;
        [state.cur[pos], state.cur[to]] = [state.cur[to], state.cur[pos]];
        renderOrder();
      });
    };
    if (q.t === 'order') { renderOrder(); submit.disabled = false; }
    if (q.t === 'mcq') {
      el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (state.locked) return;
        el.querySelectorAll('.opt').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); state.sel = +b.dataset.oi; submit.disabled = false;
      });
    }
    if (q.t === 'match') {
      el.querySelectorAll('select').forEach(s => s.onchange = () => { submit.disabled = [...el.querySelectorAll('select')].some(x => x.value === ''); });
    }

    const grade = () => {
      if (q.t === 'mcq') return state.sel === q.c;
      if (q.t === 'order') return state.cur.every((v, i) => v === i);
      return [...el.querySelectorAll('select')].every(s => +s.value === +s.dataset.i);
    };

    submit.onclick = () => {
      if (state.locked) return;
      state.locked = true;
      const ok = grade();
      C._qKeys = null;
      opts.onAnswer && opts.onAnswer(ok, q);
      if (!practice) return;
      // practice feedback
      if (q.t === 'mcq') el.querySelectorAll('.opt').forEach(b => {
        b.disabled = true; const oi = +b.dataset.oi;
        if (oi === q.c) b.classList.add('correct'); else if (oi === state.sel) b.classList.add('wrong');
      });
      if (q.t === 'order') el.querySelectorAll('.oi').forEach((r, pos) => { r.classList.add(state.cur[pos] === pos ? 'ok' : 'bad'); r.querySelectorAll('button').forEach(b => b.disabled = true); });
      if (q.t === 'match') el.querySelectorAll('.match-row').forEach(r => { const s = r.querySelector('select'); s.disabled = true; r.classList.add(+s.value === +s.dataset.i ? 'ok' : 'bad'); });
      const correctList = q.t === 'order' ? `<ol>${q.items.map(i => `<li>${esc(i)}</li>`).join('')}</ol>`
        : q.t === 'match' ? `<ul>${q.pairs.map(p => `<li><b>${esc(p[0])}</b> → ${esc(p[1])}</li>`).join('')}</ul>` : '';
      submit.style.display = 'none';
      el.querySelector('#qFeedback').innerHTML = `<div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ ' + t('correct') : '✗ ' + t('incorrect')}</div>
        <div class="explain">${correctList}<b>${t('explanation')}:</b> ${esc(ru() ? q.r : q.e)}
        <div style="margin-top:8px">${ru() ? C.ruToggle(esc(q.e), 'EN') : C.ruToggle(esc(q.r))}</div></div>
        <div class="row" style="margin-top:10px"><button class="btn primary" id="qNext">${t('next')} →</button></div>`;
      C.glossify(el.querySelector('#qFeedback .explain'));
      const nx = el.querySelector('#qNext');
      nx.onclick = () => opts.onNext && opts.onNext();
      nx.focus();
    };

    C._qKeys = e => {
      if (state.locked || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      const k = e.key.toUpperCase();
      const idx = 'ABCD'.indexOf(k) >= 0 ? 'ABCD'.indexOf(k) : '1234'.indexOf(k);
      if (q.t === 'mcq' && idx >= 0) { el.querySelectorAll('.opt')[idx].click(); e.preventDefault(); }
      if (e.key === 'Enter' && !submit.disabled) { submit.click(); e.preventDefault(); }
    };
  };
  document.addEventListener('keydown', e => { if (C._qKeys) C._qKeys(e); });

  // ======================= dashboard =======================
  C.views.dashboard = main => {
    const stats = C.domainStats();
    const allQ = C.allQuestions().length;
    const answered = stats.reduce((s, d) => s + d.seen, 0);
    const n = stats.reduce((s, d) => s + d.n, 0), ok = stats.reduce((s, d) => s + d.ok, 0);
    const cards = store.get('cards', {});
    const mastered = Object.values(cards).filter(c => c.box >= 4).length;
    const planDone = Object.values(store.get('plan', {})).filter(Boolean).length;
    const planTotal = C.meta.plan.reduce((s, w) => s + w.tasks.length, 0);
    const hist = store.get('history', []);
    const exams = hist.filter(h => h.type === 'exam');
    const lastExam = exams[exams.length - 1];
    const examDate = store.get('examDate', '');
    const daysLeft = examDate ? Math.ceil((new Date(examDate) - new Date()) / 864e5) : null;
    const read = store.get('read', {});

    // weighted readiness: accuracy weighted by domain weight, only domains with data
    let wsum = 0, wacc = 0;
    stats.forEach(s => { if (s.acc != null) { wsum += C.dom(s.id).weight; wacc += s.acc * C.dom(s.id).weight; } });
    const weakest = stats.filter(s => s.acc != null).sort((a, b) => a.acc - b.acc)[0];
    const unstarted = stats.find(s => s.seen === 0);
    const dueCards = C.allTerms().filter(tm => !cards[tm.id] || cards[tm.id].due <= Date.now()).length;

    main.innerHTML = `
      <h1>${tr('Your CISSP preparation', 'Ваша подготовка к CISSP')}</h1>
      <div class="grid">
        <div class="card"><div class="stat-label">${tr('Exam date', 'Дата экзамена')}</div>
          <div class="stat">${daysLeft != null ? (daysLeft >= 0 ? daysLeft + tr(' days', ' дн.') : tr('passed?', 'прошла')) : '—'}</div>
          <input type="date" id="examDate" value="${esc(examDate)}" style="margin-top:6px"></div>
        <div class="card"><div class="stat-label">${tr('Question bank coverage', 'Покрытие банка вопросов')}</div><div class="stat">${answered}/${allQ}</div>
          <div class="progress" style="margin-top:8px"><i style="width:${C.pct(answered, allQ)}%"></i></div></div>
        <div class="card"><div class="stat-label">${tr('Weighted accuracy', 'Взвешенная точность')}</div><div class="stat">${wsum ? Math.round(wacc / wsum * 100) + '%' : '—'}</div>
          <div class="small muted">${tr('Target: ≥ 75% in every domain', 'Цель: ≥ 75% в каждом домене')}</div></div>
        <div class="card"><div class="stat-label">${tr('Last simulation', 'Последняя симуляция')}</div><div class="stat">${lastExam ? lastExam.scaled : '—'}</div>
          <div class="small">${lastExam ? `<span class="pill ${lastExam.pass ? 'ok' : 'bad'}">${lastExam.pass ? 'PASS' : 'FAIL'}</span> ${esc(lastExam.mode)}` : `<a href="#/exam">${tr('Take a simulation', 'Пройти симуляцию')}</a>`}</div></div>
        <div class="card"><div class="stat-label">${tr('Flashcards mastered', 'Карточек выучено')}</div><div class="stat">${mastered}/${C.allTerms().length}</div>
          <div class="small muted">${dueCards} ${tr('due now', 'к повторению')}</div></div>
        <div class="card"><div class="stat-label">${tr('Study plan', 'План')}</div><div class="stat">${C.pct(planDone, planTotal)}%</div>
          <div class="progress" style="margin-top:8px"><i style="width:${C.pct(planDone, planTotal)}%"></i></div></div>
      </div>

      <div class="card hint"><b>${tr('Next best step', 'Следующий шаг')}:</b>
        ${unstarted ? `${tr('Start', 'Начните')} <a href="#/domain/${unstarted.id}">D${unstarted.id} — ${esc(domName(unstarted.id))}</a> ${tr('and its', 'и его')} <a href="#/quiz/${unstarted.id}">${tr('quiz', 'тест')}</a>.`
        : weakest ? `${tr('Your weakest domain is', 'Самый слабый домен —')} <a href="#/domain/${weakest.id}">D${weakest.id} ${esc(domName(weakest.id))}</a> (${Math.round(weakest.acc * 100)}%). <a href="#/quiz/${weakest.id}">${tr('Practice it', 'Потренируйтесь')}</a>.` : ''}
        ${dueCards ? ` · <a href="#/flashcards">${dueCards} ${tr('flashcards due', 'карточек к повторению')}</a>` : ''}</div>

      <div class="grid2">
        <div class="card"><h2 style="margin-top:0">${tr('Exam weight by domain', 'Вес доменов на экзамене')}</h2>
          <div class="row" style="align-items:center">${C.charts.donut(C.domains.map(d => ({ label: 'D' + d.id + ' ' + L(d.title), value: d.weight, color: C.domColor(d.id) })), { center: '100%', sub: tr('8 domains', '8 доменов'), unit: '%' })}
          <div class="small">${C.domains.map(d => `<div>${domDot(d.id)}<a href="#/domain/${d.id}">D${d.id}</a> ${d.weight}% <span class="muted">· ${esc(L(d.title))}</span></div>`).join('')}</div></div></div>
        <div class="card"><h2 style="margin-top:0">${tr('Your accuracy by domain', 'Ваша точность по доменам')}</h2>
          <div class="chart-wrap">${C.charts.hbars(stats.map(s => ({ label: 'D' + s.id + ' ' + C.dom(s.id).title.en.split(' ').slice(0, 3).join(' '), value: s.acc == null ? null : s.acc * 100, color: C.domColor(s.id) })), { target: 75 })}</div>
          <div class="small muted">${tr('Dashed line = 75% target. Studied concepts:', 'Пунктир — цель 75%. Изучено понятий:')} ${Object.values(read).filter(Boolean).length}/${C.domains.reduce((s, d) => s + d.concepts.length, 0)}</div></div>
      </div>

      <div class="card"><h2 style="margin-top:0">${tr('Simulation history (estimated scaled score)', 'История симуляций (оценка балла)')}</h2>
        ${exams.length ? `<div class="chart-wrap">${C.charts.line(exams.slice(-15).map(e => ({ x: new Date(e.date).toLocaleDateString() + ' ' + e.mode, y: e.scaled })), { ref: 700, refLabel: '700 pass' })}</div>`
        : `<p class="muted">${tr('No simulations yet.', 'Симуляций пока нет.')} <a href="#/exam">${tr('Start one', 'Начать')}</a></p>`}
      </div>

      <div class="grid2">
        <div class="card"><h2 style="margin-top:0">${tr('Current exam facts', 'Актуальные факты об экзамене')} <span class="pill">${tr('verified', 'проверено')} ${C.meta.verified}</span></h2>
          <div class="table-wrap"><table>${C.meta.facts.map(f => `<tr><th style="width:38%">${esc(L(f[0]))}</th><td>${esc(L(f[1]))}</td></tr>`).join('')}</table></div></div>
        <div class="card"><h2 style="margin-top:0">${tr('What changed since the 2018 article', 'Что изменилось со статьи 2018 года')}</h2>
          <ul>${C.meta.changesSince2018.map(c => `<li>${esc(L(c))}</li>`).join('')}</ul>
          <p class="small muted">${tr('The article\'s approach — ~3 months, Official Study Guide, Eleventh Hour for final review, focus on terminology and "best answer" thinking — still works.', 'Подход статьи — ~3 месяца, Official Study Guide, Eleventh Hour для финала, упор на терминологию и выбор «лучшего ответа» — по-прежнему работает.')}</p>
          <div class="row"><button class="btn small" id="exportBtn">⬇ ${tr('Export progress', 'Экспорт прогресса')}</button>
          <label class="btn small">⬆ ${tr('Import', 'Импорт')}<input type="file" id="importFile" accept="application/json" hidden></label>
          <button class="btn small" id="resetBtn">${tr('Reset all progress', 'Сбросить прогресс')}</button></div></div>
      </div>`;

    main.querySelector('#examDate').onchange = e => { store.set('examDate', e.target.value); C.route(); };
    main.querySelector('#resetBtn').onclick = () => {
      if (!confirm(tr('Delete all progress stored in this browser?', 'Удалить весь прогресс в этом браузере?'))) return;
      ['answers', 'cards', 'plan', 'history', 'read', 'examDate', 'activeExam'].forEach(k => store.set(k, k === 'history' ? [] : k === 'examDate' ? '' : {}));
      C.route();
    };
    main.querySelector('#exportBtn').onclick = () => {
      const data = {};
      ['answers', 'cards', 'plan', 'history', 'read', 'examDate'].forEach(k => { data[k] = store.get(k, null); });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' }));
      a.download = 'cissp-progress.json'; a.click();
    };
    main.querySelector('#importFile').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(txt => {
        try { const d = JSON.parse(txt); Object.keys(d).forEach(k => { if (d[k] != null) store.set(k, d[k]); }); C.route(); }
        catch (err) { alert('Invalid file'); }
      });
    };
  };

  // ======================= plan =======================
  C.views.plan = main => {
    const done = store.get('plan', {});
    main.innerHTML = `<h1>${tr('12-week study plan', 'План подготовки на 12 недель')}</h1>
      <p class="muted">${tr('Based on the Habr article\'s ~3-month approach, mapped to the current outline and the Official Study Guide (9th/10th ed.) chapters. Budget ~1.5–2 h on weekdays and ~4 h on weekends. Daily: 15 min flashcards + 20 questions.',
        'По подходу статьи (~3 месяца), привязан к актуальной программе и главам Official Study Guide (9/10 изд.). Около 1,5–2 ч в будни и ~4 ч в выходные. Ежедневно: 15 мин карточек + 20 вопросов.')}</p>
      ${C.meta.plan.map(w => {
        const cnt = w.tasks.filter((_, i) => done[`${w.w}-${i}`]).length;
        const c = w.dom.length === 1 ? C.domColor(w.dom[0]) : 'var(--accent)';
        return `<div class="card week" style="--c:${c}"><div class="row"><h3 style="margin:0">${tr('Week', 'Неделя')} ${w.w}: ${esc(L(w.t))}</h3><span class="spacer"></span>
          <span class="pill ${cnt === w.tasks.length ? 'ok' : ''}">${cnt}/${w.tasks.length}</span></div>
          <div class="small" style="margin:4px 0 6px">${w.dom.map(id => `<a href="#/domain/${id}">${domDot(id)}D${id}</a>`).join(' ')}
            ${w.dom.length === 1 ? ` · <a href="#/quiz/${w.dom[0]}">${tr('quiz', 'тест')}</a> · <a href="#/flashcards/${w.dom[0]}">${tr('flashcards', 'карточки')}</a>` : ` · <a href="#/exam">${tr('exam simulator', 'симулятор')}</a>`}</div>
          ${w.tasks.map((tk, i) => `<label class="task ${done[`${w.w}-${i}`] ? 'done' : ''}"><input type="checkbox" data-k="${w.w}-${i}" ${done[`${w.w}-${i}`] ? 'checked' : ''}><span>${esc(L(tk))}</span></label>`).join('')}</div>`;
      }).join('')}`;
    main.querySelectorAll('input[data-k]').forEach(cb => cb.onchange = () => {
      const d = store.get('plan', {}); d[cb.dataset.k] = cb.checked; store.set('plan', d);
      cb.closest('.task').classList.toggle('done', cb.checked);
    });
  };

  // ======================= domains list =======================
  C.views.domains = main => {
    const stats = C.domainStats(), read = store.get('read', {});
    main.innerHTML = `<h1>${tr('The 8 CISSP domains', '8 доменов CISSP')}</h1>
      <div class="grid">${C.domains.map(d => {
        const s = stats[d.id - 1], rc = d.concepts.filter(c => read[c.key]).length;
        return `<a class="card dom-tile" style="--c:${C.domColor(d.id)}" href="#/domain/${d.id}">
          <div class="num">DOMAIN ${d.id} · ${d.weight}%</div><h3 style="margin:.2em 0">${esc(L(d.title))}</h3>
          <div class="small muted">${esc(L(d.summary))}</div>
          <div class="small" style="margin-top:8px">${tr('Concepts', 'Понятия')} ${rc}/${d.concepts.length} · ${tr('Questions', 'Вопросы')} ${s.seen}/${s.total}
          ${s.acc != null ? ` · <b>${Math.round(s.acc * 100)}%</b>` : ''}</div>
          <div class="progress" style="margin-top:6px"><i style="width:${C.pct(rc, d.concepts.length)}%;background:${C.domColor(d.id)}"></i></div></a>`;
      }).join('')}</div>`;
  };

  // radial "mind map" of the domain's concepts
  const mindmap = d => {
    // Two columns of concept nodes connected to a central hub.
    const n = d.concepts.length, half = Math.ceil(n / 2), step = 46, W = 760, H = Math.max(240, half * step + 30), cx = W / 2, cy = H / 2;
    const nodes = d.concepts.map((c, i) => {
      const left = i < half, row = left ? i : i - half, rows = left ? half : n - half;
      const x = left ? 115 : W - 115, y = cy + (row - (rows - 1) / 2) * step;
      const label = L(c.t); const short = label.length > 30 ? label.slice(0, 28) + '…' : label;
      const ex = left ? x + 95 : x - 95;
      return `<path d="M${cx},${cy} C${(cx + ex) / 2},${cy} ${(cx + ex) / 2},${y} ${ex},${y}" fill="none" stroke="${C.domColor(d.id)}" opacity=".4" stroke-width="2"/>
        <a data-jump="${c.key}"><rect x="${x - 95}" y="${y - 15}" width="190" height="30" rx="15" fill="var(--panel)" stroke="${C.domColor(d.id)}"/>
        <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11.5">${esc(short)}</text><title>${esc(label)}</title></a>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" role="img">${nodes}<circle cx="${cx}" cy="${cy}" r="58" fill="${C.domColor(d.id)}"/>
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="14" font-weight="700" style="fill:#fff">DOMAIN ${d.id}</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="12" style="fill:#fff">${d.weight}%</text></svg>`;
  };

  // ======================= domain detail =======================
  C.views.domain = (main, idStr) => {
    const d = C.dom(+idStr);
    if (!d) { location.hash = '#/domains'; return; }
    const read = store.get('read', {});
    const s = C.domainStats()[d.id - 1];
    main.innerHTML = `<div class="small"><a href="#/domains">← ${tr('All domains', 'Все домены')}</a></div>
      <h1 style="border-left:6px solid ${C.domColor(d.id)};padding-left:10px">D${d.id}. ${esc(L(d.title))}</h1>
      <p class="muted">${esc(L(d.summary))}</p>
      <div class="row"><span class="pill">${t('weight')}: ${d.weight}%</span><span class="pill">${d.questions.length} ${t('questions')}</span>
        <span class="pill">${s.seen} ${t('answered')}</span>${s.acc != null ? `<span class="pill ${s.acc >= .75 ? 'ok' : 'warn'}">${Math.round(s.acc * 100)}% ${t('accuracy')}</span>` : ''}
        <span class="spacer"></span><a class="btn primary" href="#/quiz/${d.id}">▶ ${t('practice')}</a><a class="btn" href="#/flashcards/${d.id}">🗂 ${t('nav.flashcards')}</a></div>
      <div class="card mindmap" style="margin-top:14px"><div class="widget-title">◈ ${t('mindmap')}</div>${mindmap(d)}</div>
      <details class="card"><summary>${t('objectives')} (${d.objectives.length})</summary>
        <table style="margin-top:8px">${d.objectives.map(o => `<tr><td style="width:60px"><b>${o[0]}</b></td><td>${esc(o[1])}</td></tr>`).join('')}</table>
        <p class="small muted">${tr('Source:', 'Источник:')} <a href="https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline" target="_blank" rel="noopener">ISC2 CISSP Exam Outline (April 15, 2024)</a></p></details>
      <h2>${t('concepts')}</h2>
      <div class="hint small">${tr('New to IT or security? Each concept starts with a plain-words explanation and ends with a real-world example. <span class="gl-demo">Dotted words</span> show a definition when you hover or tap them. For the fundamentals (networks, encryption, cloud, servers), see', 'Новичок в IT или безопасности? Каждое понятие начинается с объяснения простыми словами и заканчивается примером из жизни. <span class="gl-demo">Подчёркнутые пунктиром слова</span> показывают определение при наведении или нажатии. Фундамент (сети, шифрование, облако, серверы) — на странице')} <a href="#/basics">${t('nav.basics')}</a>.</div>
      <div class="toc">${d.concepts.map(c => `<a href="javascript:void 0" data-jump="${c.key}" class="${read[c.key] ? 'done' : ''}">${esc(L(c.t))}</a>`).join('')}</div>
      <div id="concepts" style="margin-top:14px"></div>
      <h2>${t('terms')} (${d.terms.length})</h2>
      <div class="card table-wrap"><table><thead><tr><th>Term</th><th>Definition</th><th>RU</th></tr></thead>
        <tbody>${d.terms.map(tm => `<tr><td><b>${esc(tm.term)}</b></td><td>${esc(tm.en)}</td><td class="small muted">${esc(tm.ru)}</td></tr>`).join('')}</tbody></table></div>`;

    const box = main.querySelector('#concepts');
    d.concepts.forEach(c => {
      const card = document.createElement('div');
      card.className = 'card concept'; card.id = c.key; card.style.setProperty('--c', C.domColor(d.id));
      const primary = ru() ? c.b.ru : c.b.en, other = ru() ? c.b.en : c.b.ru;
      card.innerHTML = `<div class="row"><h3>${esc(L(c.t))}</h3><span class="spacer"></span>
        <button class="btn small" data-read>${read[c.key] ? t('read') : t('markRead')}</button></div>
        ${ru() && c.t.en ? `<div class="small muted" style="margin-top:-6px">${esc(c.t.en)}</div>` : ''}
        ${C.explainHtml(c).plain}
        <div class="body">${primary || ''}</div>
        ${other ? (ru() ? C.ruToggle(other, t('showEn')).replace('🇷🇺 ', '🇬🇧 ') : C.ruToggle(other)) : ''}
        ${C.explainHtml(c).ex}
        <div class="dgs"></div>
        ${c.w ? '<div class="widget"></div>' : ''}`;
      box.appendChild(card);
      C.renderDiagrams(card.querySelector('.dgs'), c);
      if (c.w) C.renderWidget(card.querySelector('.widget'), c.w);
      C.glossify(card);
      card.querySelector('[data-read]').onclick = e => {
        const r = store.get('read', {}); r[c.key] = !r[c.key]; store.set('read', r);
        e.target.textContent = r[c.key] ? t('read') : t('markRead');
        main.querySelector(`.toc [data-jump="${c.key}"]`).classList.toggle('done', r[c.key]);
      };
    });
    main.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => {
      document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };

  // ======================= flashcards (Leitner) =======================
  const INTERVALS = [0, 0, 1, 3, 7, 16]; // days for boxes 1..5 (index by box)
  C.views.flashcards = (main, domArg) => {
    let dom = domArg ? +domArg : 0, onlyDue = true;
    const pickDeck = () => {
      const cards = store.get('cards', {});
      let terms = C.allTerms().filter(tm => !dom || tm.dom === dom);
      if (onlyDue) terms = terms.filter(tm => !cards[tm.id] || cards[tm.id].due <= Date.now());
      return C.shuffle(terms);
    };
    let deck = pickDeck(), i = 0;
    const render = () => {
      const cards = store.get('cards', {});
      const scope = C.allTerms().filter(tm => !dom || tm.dom === dom);
      const boxes = [1, 2, 3, 4, 5].map(b => scope.filter(tm => (cards[tm.id] ? cards[tm.id].box : 1) === b).length);
      const tm = deck[i];
      main.innerHTML = `<h1>${tr('Flashcards', 'Карточки')}</h1>
        <div class="row"><select id="dom"><option value="0">${tr('All domains', 'Все домены')}</option>${C.domains.map(d => `<option value="${d.id}" ${d.id === dom ? 'selected' : ''}>D${d.id} ${esc(L(d.title))}</option>`).join('')}</select>
          <label class="chk"><input type="checkbox" id="due" ${onlyDue ? 'checked' : ''}> ${tr('Only due cards', 'Только к повторению')}</label>
          <span class="spacer"></span><span class="muted small">${tm ? `${i + 1} / ${deck.length}` : ''}</span></div>
        <div class="boxes" style="margin:12px 0">${boxes.map((n, k) => `<div>${tr('Box', 'Коробка')} ${k + 1}<b>${n}</b></div>`).join('')}</div>
        ${tm ? `<div class="flash" id="flash"><div class="flash-inner">
            <div class="flash-face"><div class="small muted">${domDot(tm.dom)}D${tm.dom}</div><div class="flash-term">${esc(tm.term)}</div><div class="small muted" style="margin-top:14px">${t('flip')} · Space</div></div>
            <div class="flash-face back"><div class="flash-term" style="font-size:1.2rem">${esc(tm.term)}</div><p>${esc(tm.en)}</p><div class="ru-box">${esc(tm.ru)}</div></div>
          </div></div>
          <div class="row" style="justify-content:center;margin-top:14px" id="rate" hidden>
            <button class="btn" data-r="0">1 · ${t('again2')}</button><button class="btn" data-r="1">2 · ${t('hard')}</button>
            <button class="btn primary" data-r="2">3 · ${t('good')}</button><button class="btn" data-r="3">4 · ${t('easy')}</button></div>`
        : `<div class="card"><p>${tr('No cards due. Great job!', 'Нет карточек к повторению. Отлично!')}</p><button class="btn" id="all">${tr('Review all cards anyway', 'Повторить все карточки')}</button></div>`}
        <p class="small muted">${tr('Leitner system: "Good" moves a card up a box (longer interval), "Again" sends it back to box 1. Intervals: 0, 1, 3, 7, 16 days.', 'Система Лейтнера: «Хорошо» — в следующую коробку (интервал длиннее), «Снова» — в коробку 1. Интервалы: 0, 1, 3, 7, 16 дней.')}</p>`;
      main.querySelector('#dom').onchange = e => { dom = +e.target.value; deck = pickDeck(); i = 0; render(); };
      main.querySelector('#due').onchange = e => { onlyDue = e.target.checked; deck = pickDeck(); i = 0; render(); };
      const all = main.querySelector('#all');
      if (all) all.onclick = () => { onlyDue = false; deck = pickDeck(); i = 0; render(); };
      if (!tm) { C._qKeys = null; return; }
      const flash = main.querySelector('#flash'), rate = main.querySelector('#rate');
      const flip = () => { flash.classList.toggle('flipped'); rate.hidden = false; };
      flash.onclick = flip;
      const doRate = r => {
        const cs = store.get('cards', {});
        const cur = cs[tm.id] || { box: 1 };
        const box = r === 0 ? 1 : r === 1 ? cur.box : Math.min(5, cur.box + (r === 3 ? 2 : 1));
        cs[tm.id] = { box, due: Date.now() + INTERVALS[box] * 864e5 };
        store.set('cards', cs);
        i++; if (i >= deck.length) { deck = pickDeck(); i = 0; }
        render();
      };
      rate.querySelectorAll('[data-r]').forEach(b => b.onclick = () => doRate(+b.dataset.r));
      C._qKeys = e => {
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
        if (e.key === ' ') { e.preventDefault(); flip(); }
        else if (!rate.hidden && '1234'.includes(e.key)) doRate(+e.key - 1);
      };
    };
    render();
  };

  // ======================= quiz =======================
  C.views.quiz = (main, domArg) => {
    const sel = new Set(domArg ? [+domArg] : C.domains.map(d => d.id));
    const setup = () => {
      C._qKeys = null;
      const ans = store.get('answers', {});
      main.innerHTML = `<h1>${tr('Practice quiz', 'Тренировочный тест')}</h1>
        <p class="muted">${tr('Immediate feedback with explanations (Russian on demand). Answers update your dashboard statistics.', 'Мгновенная обратная связь с объяснениями (русский по запросу). Ответы обновляют статистику.')}</p>
        <div class="card"><h3 style="margin-top:0">${tr('Domains', 'Домены')}</h3>
          <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px">${C.domains.map(d => {
            const seen = d.questions.filter(q => ans[q.id]).length;
            return `<label class="chk"><input type="checkbox" data-d="${d.id}" ${sel.has(d.id) ? 'checked' : ''}>${domDot(d.id)}D${d.id} ${esc(L(d.title))} <span class="small muted">(${seen}/${d.questions.length})</span></label>`;
          }).join('')}</div>
          <div class="row" style="margin-top:12px">
            <label>${tr('Questions', 'Вопросов')} <select id="cnt"><option>10</option><option selected>20</option><option>40</option><option value="999">${tr('all', 'все')}</option></select></label>
            <label>${tr('Source', 'Отбор')} <select id="src"><option value="all">${tr('All questions', 'Все вопросы')}</option><option value="new">${tr('Not yet answered', 'Ещё не отвеченные')}</option><option value="missed">${tr('Missed last time', 'Ошибки в прошлый раз')}</option></select></label>
            <label>${tr('Difficulty', 'Сложность')} <select id="dif"><option value="0">${tr('any', 'любая')}</option><option value="1">easy</option><option value="2">medium</option><option value="3">hard</option></select></label>
            <span class="spacer"></span><button class="btn primary" id="go">▶ ${t('start')}</button></div>
          <div id="msg" class="small muted"></div></div>`;
      main.querySelectorAll('[data-d]').forEach(cb => cb.onchange = () => { cb.checked ? sel.add(+cb.dataset.d) : sel.delete(+cb.dataset.d); });
      main.querySelector('#go').onclick = () => {
        const src = main.querySelector('#src').value, dif = +main.querySelector('#dif').value, cnt = +main.querySelector('#cnt').value;
        const a = store.get('answers', {});
        let pool = C.allQuestions().filter(q => sel.has(q.dom) && (!dif || q.d === dif));
        if (src === 'new') pool = pool.filter(q => !a[q.id]);
        if (src === 'missed') pool = pool.filter(q => a[q.id] && a[q.id].last === 0);
        if (!pool.length) { main.querySelector('#msg').textContent = tr('No questions match these filters.', 'Нет вопросов под эти фильтры.'); return; }
        run(C.shuffle(pool).slice(0, cnt));
      };
    };
    const run = qs => {
      let i = 0; const res = [];
      const next = () => {
        if (i >= qs.length) return summary(qs, res);
        const header = `<div class="row" style="margin-bottom:8px"><b>${tr('Question', 'Вопрос')} ${i + 1}/${qs.length}</b><span class="spacer"></span>
          <span class="small muted">${res.filter(Boolean).length} ${tr('correct', 'верно')}</span><button class="btn small" id="quit">${t('finish')}</button></div>
          <div class="progress" style="margin-bottom:12px"><i style="width:${C.pct(i, qs.length)}%"></i></div>`;
        C.renderQuestion(main, qs[i], {
          mode: 'practice', header,
          onAnswer: ok => { res.push(ok); C.recordAnswer(qs[i].id, ok); },
          onNext: () => { i++; next(); },
        });
        main.querySelector('#quit').onclick = () => summary(qs.slice(0, res.length), res);
        window.scrollTo(0, 0);
      };
      next();
    };
    const summary = (qs, res) => {
      C._qKeys = null;
      const ok = res.filter(Boolean).length;
      const per = {};
      qs.forEach((q, k) => { per[q.dom] = per[q.dom] || { n: 0, ok: 0 }; per[q.dom].n++; if (res[k]) per[q.dom].ok++; });
      if (qs.length) {
        const h = store.get('history', []);
        h.push({ type: 'quiz', date: Date.now(), n: qs.length, ok, pct: C.pct(ok, qs.length), domains: per });
        store.set('history', h.slice(-200));
      }
      main.innerHTML = `<h1>${tr('Quiz result', 'Результат теста')}</h1>
        <div class="result-banner ${C.pct(ok, qs.length) >= 75 ? 'pass' : 'fail'}"><div class="big">${ok}/${qs.length} · ${C.pct(ok, qs.length)}%</div>
          <div>${C.pct(ok, qs.length) >= 75 ? tr('On target (≥75%)', 'В цели (≥75%)') : tr('Below the 75% target — review the explanations and concepts', 'Ниже цели 75% — повторите объяснения и понятия')}</div></div>
        <div class="card" style="margin-top:14px">${C.charts.hbars(Object.keys(per).map(id => ({ label: 'D' + id + ' ' + C.dom(+id).title.en.split(' ').slice(0, 3).join(' '), value: per[id].ok / per[id].n * 100, color: C.domColor(+id) })), { target: 75 })}</div>
        <div class="card"><h3 style="margin-top:0">${tr('Review', 'Разбор')}</h3>${qs.map((q, k) => `<details><summary>${res[k] ? '✅' : '❌'} ${esc(q.q)}</summary>
          <div class="explain">${q.t === 'mcq' ? `<b>${esc(q.a[q.c])}</b><br>` : ''}${esc(ru() ? q.r : q.e)}</div></details>`).join('')}</div>
        <div class="row"><button class="btn primary" id="again">${t('again')}</button><a class="btn" href="#/dashboard">${t('nav.dashboard')}</a></div>`;
      main.querySelector('#again').onclick = setup;
    };
    setup();
  };

  // ======================= strategy =======================
  C.views.mindset = main => {
    main.innerHTML = `<h1>${tr('Exam strategy: think like ISC2', 'Стратегия: думать как ISC2')}</h1>
      <p class="muted">${tr('The article\'s key insight: several answers are often technically correct — pick the one that matches best practice and the manager\'s perspective.', 'Главная мысль статьи: верными бывают несколько ответов — выбирайте тот, что соответствует лучшей практике и взгляду менеджера.')}</p>
      ${C.meta.mindset.map(m => `<div class="card concept"><h3>${esc(L(m.t))}</h3><div class="body">${L(m.b)}</div>
        ${ru() ? '' : C.ruToggle(m.b.ru)}</div>`).join('')}
      <div class="card"><h3 style="margin-top:0">${tr('Priority ladder when answers compete', 'Лестница приоритетов при выборе ответа')}</h3>
        <ol><li>${tr('Human life and safety', 'Жизнь и безопасность людей')}</li><li>${tr('Legal and ethical obligations (law, Code of Ethics)', 'Правовые и этические обязательства (закон, Кодекс)')}</li>
        <li>${tr('Senior management direction, policy, business objectives', 'Указания руководства, политика, цели бизнеса')}</li><li>${tr('Risk-based decision (assess before acting; cost ≤ value)', 'Решение на основе риска (оценить до действия; стоимость ≤ ценности)')}</li>
        <li>${tr('Process (incident plan, change management) over ad-hoc technical fixes', 'Процесс (план реагирования, управление изменениями) важнее импровизированных технических исправлений')}</li>
        <li>${tr('Technical control details', 'Технические детали')}</li></ol></div>
      <div class="card"><h3 style="margin-top:0">${tr('Exam-day checklist', 'Чек-лист дня экзамена')}</h3>
        <ul><li>${tr('Government-issued ID with signature matching your registration name exactly', 'Удостоверение личности с подписью; имя точно как при регистрации')}</li>
        <li>${tr('Arrive 30 min early; palm-vein scan, photo, locker for belongings', 'Приехать за 30 мин; скан вен ладони, фото, личные вещи — в шкафчик')}</li>
        <li>${tr('Breaks are allowed but the 3-hour clock keeps running', 'Перерывы можно, но 3-часовой таймер идёт')}</li>
        <li>${tr('Eat and hydrate beforehand; read every word of each question', 'Поесть и попить заранее; читать каждое слово вопроса')}</li>
        <li>${tr('Result: provisional pass/fail printout from the test center', 'Результат: предварительный pass/fail на распечатке в центре')}</li>
        <li>${tr('After a pass: endorsement application within 9 months', 'После сдачи: заявка на endorsement в течение 9 месяцев')}</li></ul></div>`;
  };

  // ======================= resources =======================
  C.views.resources = main => {
    main.innerHTML = `<h1>${tr('Resources and links', 'Ресурсы и ссылки')}</h1>
      ${C.meta.resources.map(g => `<div class="card"><h3 style="margin-top:0">${esc(L(g.cat))}</h3><ul>
        ${g.items.map(it => `<li><a href="${esc(it[1])}" target="_blank" rel="noopener">${esc(it[0])}</a></li>`).join('')}</ul></div>`).join('')}
      <div class="card hint small">${tr('Avoid "brain dumps": they violate the ISC2 NDA and can cost you the certification. Use legitimate practice questions only.', 'Избегайте «дампов»: это нарушает NDA ISC2 и может стоить сертификата. Только легальные практические вопросы.')}</div>`;
  };
})();
