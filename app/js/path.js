'use strict';
// Learning path (#/path): one long feed of short cards, easy → complex across domains.
// Stage list: data/path/index.js. Cards: data/path/sNN.js, loaded on demand with a <script> tag
// (works from file:// too). Progress lives in store 'path': { pos, seen, keep, rf }.
//   #/path                 resume where you left off
//   #/path/s01-005         a given card
//   #/path/stages          stage list, kept cards, refresh set
//   #/path/refresh         short optional review of kept and skipped comeback cards
//   #/path/concept/d1-c8   first card that introduces a concept (from the domain pages)

(() => {
  const C = CISSP, { L, esc, store } = C;
  const ru = () => C.lang === 'ru';
  const tr = (en, r) => (ru() ? r : en);
  const state = () => Object.assign({ pos: null, seen: {}, keep: {}, rf: {} }, store.get('path', {}));
  const save = s => store.set('path', s);

  // ---------- loading ----------
  const loading = {};
  const available = () => C.pathStages.filter(s => s.file);
  C.loadStage = n => {
    if (C.stages[n]) return Promise.resolve(C.stages[n]);
    const meta = C.pathStages.find(s => s.n === n);
    if (!meta || !meta.file) return Promise.resolve(null);
    return loading[n] = loading[n] || new Promise(resolve => {
      const sc = document.createElement('script');
      sc.src = 'data/path/' + meta.file;
      sc.onload = () => resolve(C.stages[n] || null);
      sc.onerror = () => { delete loading[n]; resolve(null); };
      document.head.appendChild(sc);
    });
  };
  const loadAll = () => Promise.all(available().map(s => C.loadStage(s.n)));
  const stageOf = id => +(/^s(\d+)-/.exec(id || '') || [])[1] || 0;
  const findCard = id => { const st = C.stages[stageOf(id)]; return st && st.cards.find(c => c.id === id); };
  const stageMeta = n => C.pathStages.find(s => s.n === n) || { n, title: { en: 'Stage ' + n, ru: 'Этап ' + n } };
  const nextStageWithCards = n => available().find(s => s.n > n);
  const prevStageWithCards = n => available().filter(s => s.n < n).pop();
  const conceptTitle = key => {
    const [, d] = /^d(\d)-/.exec(key) || [];
    const c = d && C.dom(+d) && C.dom(+d).concepts.find(x => x.key === key);
    return c ? L(c.t) : key;
  };

  const KIND = {
    think: () => '🤔 ' + tr('Your call', 'Как бы вы поступили?'),
    back: () => '↩ ' + tr('Comeback', 'Возвращаемся'),
    recap: () => '✔ ' + tr('Stage recap', 'Итоги этапа'),
    story: () => '📰 ' + tr('Real case', 'Реальный случай'),
  };

  // ---------- one card ----------
  const renderCard = (main, card, opts) => {
    const st = C.stages[card.stage], meta = stageMeta(card.stage), total = st.cards.length;
    const s = state();
    if (!opts.refresh) {
      s.pos = card.id; s.seen[card.id] = 1; save(s);
    }
    const kept = !!s.keep[card.id];
    const prev = card.i > 0 ? st.cards[card.i - 1] : null;
    const next = card.i < total - 1 ? st.cards[card.i + 1] : null;
    const backTo = card.back && findCard(card.back);
    const think = card.kind === 'think';
    const recap = card.kind === 'recap'
      ? `<ul class="recap">${(card.items || []).map(([id, txt]) => `<li><a href="#/path/${id}">${L(txt)}</a></li>`).join('')}</ul>` : '';

    main.innerHTML = `<div class="path-top">
        <div class="row"><a href="#/path/stages">☰ ${tr('Stage', 'Этап')} ${card.stage} · ${esc(L(meta.title))}</a><span class="spacer"></span>
          <span class="small muted">${opts.refresh ? tr('Refresh', 'Повторение') + ' ' + opts.refresh : `${card.i + 1} / ${total}`}</span></div>
        <div class="progress"><i style="width:${C.pct(card.i + 1, total)}%"></i></div></div>
      <article class="card pcard k-${card.kind}" style="--c:${C.domColor(card.k && card.k[0] ? +card.k[0][1] : 1)}">
        ${KIND[card.kind] ? `<div class="pk">${KIND[card.kind]()}</div>` : ''}
        ${backTo ? `<div class="small pback">${tr('Remember', 'Помните')} <a href="#/path/${backTo.id}">“${esc(L(backTo.title))}”</a>?</div>` : ''}
        <h2>${esc(L(card.title))}</h2>
        <div class="body">${L(card.body)}</div>
        ${recap}
        <div class="dgs"></div>
        ${think ? `<button class="btn primary" id="reveal">${tr('Show the answer', 'Показать ответ')} · Space</button>
          <div class="reveal" hidden>${L(card.reveal)}</div>` : ''}
        ${card.take ? `<div class="take"${think ? ' hidden' : ''}>→ ${L(card.take)}</div>` : ''}
        ${card.k && card.k.length ? `<div class="pmore small">${tr('Read more', 'Подробнее')}: ${card.k.map(k => `<a href="#/domain/${k[1]}/${k}">${esc(conceptTitle(k))} →</a>`).join(' · ')}</div>` : ''}
      </article>
      <div class="row path-nav">
        ${opts.refresh ? `<button class="btn" data-rf="0">↺ ${tr('Again', 'Ещё раз')}</button><span class="spacer"></span>
            <button class="btn primary" data-rf="1">${tr('Got it', 'Понятно')} →</button>`
          : `<button class="btn" id="prev" ${prev || prevStageWithCards(card.stage) ? '' : 'disabled'}>← ${tr('Back', 'Назад')}</button>
            <button class="btn" id="keep" aria-pressed="${kept}">${kept ? '★' : '☆'} ${tr('Keep', 'Сохранить')}</button>
            <span class="spacer"></span>
            <button class="btn primary" id="next">${next ? tr('Next', 'Далее') : tr('Next stage', 'Следующий этап')} →</button>`}
      </div>
      <p class="small muted path-keys">${tr('Keys: ← → to move, Space to reveal. On a phone, swipe the card.', 'Клавиши: ← → — листать, пробел — открыть ответ. На телефоне листайте карточку пальцем.')}</p>`;

    const art = main.querySelector('.pcard');
    if (card.dg) C.renderDiagrams(art.querySelector('.dgs'), card);
    C.glossify(art.querySelector('.body'));

    const reveal = () => {
      const b = main.querySelector('#reveal'); if (!b || b.hidden) return false;
      b.hidden = true; main.querySelector('.reveal').hidden = false;
      const tk = main.querySelector('.take'); if (tk) tk.hidden = false;
      C.glossify(main.querySelector('.reveal'));
      return true;
    };
    const go = id => { location.hash = '#/path/' + id; };
    const goNext = () => {
      if (reveal()) return; // a "think" card shows its answer before moving on
      if (opts.refresh) return opts.onDone(1);
      if (next) return go(next.id);
      const ns = nextStageWithCards(card.stage);
      if (ns) C.loadStage(ns.n).then(x => x && x.cards.length ? go(x.cards[0].id) : (location.hash = '#/path/stages'));
      else location.hash = '#/path/end';
    };
    const goPrev = () => {
      if (opts.refresh) return;
      if (prev) return go(prev.id);
      const ps = prevStageWithCards(card.stage);
      if (ps) C.loadStage(ps.n).then(x => x && go(x.cards[x.cards.length - 1].id));
    };

    if (opts.refresh) main.querySelectorAll('[data-rf]').forEach(b => b.onclick = () => opts.onDone(+b.dataset.rf));
    else {
      main.querySelector('#next').onclick = goNext;
      main.querySelector('#prev').onclick = goPrev;
      main.querySelector('#keep').onclick = e => {
        const s2 = state();
        if (s2.keep[card.id]) { delete s2.keep[card.id]; delete s2.rf[card.id]; } else s2.keep[card.id] = Date.now();
        save(s2);
        const on = !!s2.keep[card.id];
        e.currentTarget.innerHTML = `${on ? '★' : '☆'} ${tr('Keep', 'Сохранить')}`;
        e.currentTarget.setAttribute('aria-pressed', on);
      };
    }
    const rb = main.querySelector('#reveal');
    if (rb) rb.onclick = reveal;

    C._qKeys = e => {
      if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === ' ' && think) { e.preventDefault(); reveal(); }
    };

    // swipe left/right on the card; diagrams keep their own sideways scroll
    let sx = null, sy = 0;
    art.addEventListener('touchstart', e => {
      sx = e.target.closest('.arch-wrap') || e.touches.length > 1 ? null : e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    art.addEventListener('touchend', e => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dy)) (dx < 0 ? goNext : goPrev)();
    }, { passive: true });
  };

  // ---------- views ----------
  const loadingMsg = main => { main.innerHTML = `<p class="muted">${tr('Loading…', 'Загрузка…')}</p>`; };
  const firstCard = () => { const s = available()[0]; return s ? C.loadStage(s.n).then(st => st && st.cards[0]) : Promise.resolve(null); };

  const stagesView = main => {
    loadingMsg(main);
    loadAll().then(() => {
      const s = state(), keptIds = Object.keys(s.keep).filter(findCard);
      const due = refreshPool().length;
      main.innerHTML = `<h1>${tr('Learning path', 'Путь обучения')}</h1>
        <p class="muted">${tr('One continuous path of short cards, from easy to complex. Ideas come back later in new examples, so they stick without drilling. Quizzes and flashcards stay separate tools for checking yourself.',
          'Один непрерывный путь из коротких карточек — от простого к сложному. Идеи возвращаются позже в новых примерах и запоминаются без зубрёжки. Тесты и карточки — отдельные инструменты для самопроверки.')}</p>
        <div class="row" style="margin-bottom:14px">${s.pos && findCard(s.pos) ? `<a class="btn primary" href="#/path/${s.pos}">▶ ${tr('Continue', 'Продолжить')}</a>` : `<a class="btn primary" href="#/path/start">▶ ${tr('Start', 'Начать')}</a>`}
          <a class="btn" href="#/path/refresh" ${due ? '' : 'aria-disabled="true"'}>↺ ${tr('Refresh', 'Повторить')} (${due})</a></div>
        <div class="stage-list">${C.pathStages.map(m => {
          const st = C.stages[m.n], n = st ? st.cards.length : 0, seen = st ? st.cards.filter(c => s.seen[c.id]).length : 0;
          return st ? `<a class="card stage-tile" href="#/path/${(st.cards.find(c => !s.seen[c.id]) || st.cards[0]).id}">
              <div class="num">${tr('Stage', 'Этап')} ${m.n}${m.partial ? ' · ' + tr('in progress', 'в работе') : ''}</div><b>${esc(L(m.title))}</b>
              <div class="small muted">${seen}/${n} ${tr('cards', 'карточек')}</div><div class="progress"><i style="width:${C.pct(seen, n)}%"></i></div></a>`
            : `<div class="card stage-tile dim"><div class="num">${tr('Stage', 'Этап')} ${m.n} · ${tr('coming soon', 'скоро')}</div><b>${esc(L(m.title))}</b></div>`;
        }).join('')}</div>
        <h2>☆ ${tr('Kept cards', 'Сохранённые карточки')} (${keptIds.length})</h2>
        ${keptIds.length ? `<ul>${keptIds.map(id => `<li><a href="#/path/${id}">${esc(L(findCard(id).title))}</a></li>`).join('')}</ul>`
          : `<p class="small muted">${tr('Tap ☆ Keep on any card to save it here and add it to the refresh set.', 'Нажмите ☆ Сохранить на любой карточке, чтобы она появилась здесь и в наборе для повторения.')}</p>`}`;
    });
  };

  // kept cards that are due, plus comeback cards you jumped past without seeing
  const refreshPool = () => {
    const s = state(), now = Date.now(), pos = findCard(s.pos);
    const before = c => pos && (c.stage < pos.stage || (c.stage === pos.stage && c.i < pos.i));
    const out = [];
    Object.values(C.stages).forEach(st => st.cards.forEach(c => {
      const rf = s.rf[c.id];
      if (s.keep[c.id] && (!rf || rf.due <= now)) out.push(c);
      else if (c.kind === 'back' && !s.seen[c.id] && before(c) && (!rf || rf.due <= now)) out.push(c);
    }));
    return out;
  };

  const refreshView = main => {
    loadingMsg(main);
    loadAll().then(() => {
      const pool = C.shuffle(refreshPool()).slice(0, 10);
      let i = 0;
      const step = () => {
        if (i >= pool.length) {
          main.innerHTML = `<h1>${tr('Refresh', 'Повторение')}</h1><div class="card"><p>${pool.length ? tr('Done for now. Cards you marked “Got it” come back after a longer gap.', 'На сейчас всё. Карточки с отметкой «Понятно» вернутся через больший промежуток.') : tr('Nothing to refresh right now. Keep cards with ☆ to build your set.', 'Сейчас повторять нечего. Сохраняйте карточки кнопкой ☆, чтобы собрать набор.')}</p>
            <a class="btn primary" href="#/path">▶ ${tr('Back to the path', 'Вернуться к пути')}</a></div>`;
          return;
        }
        renderCard(main, pool[i], { refresh: `${i + 1}/${pool.length}`, onDone: ok => {
          const s = state(), cur = s.rf[pool[i].id] || { box: 1 };
          const box = ok ? Math.min(5, cur.box + 1) : 1;
          s.rf[pool[i].id] = { box, due: Date.now() + C.INTERVALS[box] * 864e5 };
          if (pool[i].kind === 'back') s.seen[pool[i].id] = 1;
          save(s); i++; window.scrollTo(0, 0); step();
        } });
      };
      step();
    });
  };

  const conceptView = (main, key) => {
    loadingMsg(main);
    loadAll().then(() => {
      for (const m of available()) {
        const c = (C.stages[m.n] || { cards: [] }).cards.find(x => (x.k || []).includes(key));
        if (c) { location.replace('#/path/' + c.id); return; }
      }
      main.innerHTML = `<div class="card"><p>${tr('This concept is not in the learning path yet.', 'Этого понятия пока нет в пути обучения.')}</p>
        <a class="btn" href="#/domain/${key[1]}/${key}">← ${esc(conceptTitle(key))}</a> <a class="btn primary" href="#/path">▶ ${tr('Learning path', 'Путь обучения')}</a></div>`;
    });
  };

  C.views.path = (main, arg, arg2) => {
    if (arg === 'stages') return stagesView(main);
    if (arg === 'refresh') return refreshView(main);
    if (arg === 'concept') return conceptView(main, arg2 || '');
    if (arg === 'end') {
      main.innerHTML = `<h1>${tr('You reached the end of the path so far', 'Вы дошли до конца доступного пути')}</h1>
        <div class="card"><p>${tr('More stages are on the way. Meanwhile, check yourself with a quiz or refresh your kept cards.', 'Новые этапы в работе. А пока проверьте себя тестом или повторите сохранённые карточки.')}</p>
        <div class="row"><a class="btn primary" href="#/quiz">${tr('Take a quiz', 'Пройти тест')}</a><a class="btn" href="#/path/refresh">↺ ${tr('Refresh', 'Повторить')}</a><a class="btn" href="#/path/stages">☰ ${tr('Stages', 'Этапы')}</a></div></div>`;
      return;
    }
    loadingMsg(main);
    const id = arg && arg !== 'start' ? arg : !arg ? state().pos : null;
    C.loadStage(stageOf(id)).then(() => {
      const card = findCard(id);
      if (card) return renderCard(main, card, {});
      firstCard().then(c => c ? location.replace('#/path/' + c.id) : stagesView(main));
    });
  };

  // "Continue the path" banner for the dashboard (synchronous: uses the stage list only)
  C.pathResumeHtml = () => {
    const s = state(), n = stageOf(s.pos), m = n && stageMeta(n);
    return `<div class="card hint"><b>📚 ${tr('Learning path', 'Путь обучения')}:</b>
      ${m ? `${tr('you are in stage', 'вы на этапе')} ${n} · ${esc(L(m.title))}. <a href="#/path/${s.pos}">${tr('Continue', 'Продолжить')} →</a>`
        : `${tr('short cards from easy to complex, the best place to start.', 'короткие карточки от простого к сложному — лучшее место для начала.')} <a href="#/path/start">${tr('Start', 'Начать')} →</a>`}</div>`;
  };
})();
