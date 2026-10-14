'use strict';
// Beginner layer: glossary pop-overs on jargon, the architecture-diagram widget,
// and the "Basics" primer page. Content lives in data/basics.js and data/x*.js.

(() => {
  const C = CISSP, { L, esc, t } = C;
  const ru = () => C.lang === 'ru';
  const tr = (en, r) => (ru() ? r : en);

  // ======================= glossary =======================
  // Patterns that would match too much ordinary text (or mean several things) are dropped.
  const SKIP = new Set(['MAC', 'Clear', 'Purge', 'Destroy', 'Degree', 'Event vs incident', 'Surge']);
  const isAcronym = s => /\p{Lu}.*[\p{Lu}0-9]/u.test(s) && s === s.toUpperCase();
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  // a `*` in a Russian pattern (data/ru-match.js) stands for up to 4 more letters: a case ending
  const reSrc = p => p.split('*').map(reEsc).join('\\p{L}{0,4}');
  let index = null, stems = null, regex = null;

  const patternsFor = term => {
    const base = term.replace(/\s*\(.*?\)\s*/g, ' ').trim();
    return base.split(/\s+(?:\/|vs)\s+/).map(s => s.trim()).filter(s => s.length > 1 && !SKIP.has(s) && !SKIP.has(term));
  };

  const build = () => {
    index = new Map(); stems = [];
    const byTerm = new Map();
    const add = (pat, entry) => {
      const k = pat.toLowerCase();
      if (index.has(k)) return;
      const e = { ...entry, cs: isAcronym(pat.replace(/\*/g, '')), pat, k };
      index.set(k, e);
      if (pat.includes('*')) stems.push({ re: new RegExp(`^${reSrc(pat)}$`, e.cs ? 'u' : 'iu'), e });
    };
    const addTerm = (term, pats, entry) => { byTerm.set(term, entry); pats.forEach(p => add(p, entry)); };
    C.allTerms().forEach(tm => addTerm(tm.term, patternsFor(tm.term), { term: tm.term, en: tm.en, ru: tm.ru, src: 'D' + tm.dom }));
    (C.basics ? C.basics.glossary : []).forEach(g => addTerm(g[0], [g[0], ...(g[3] || [])].flatMap(patternsFor), { term: g[0], en: g[1], ru: g[2], src: 'basics' }));
    Object.entries(C.ruMatch || {}).forEach(([term, pats]) => { const e = byTerm.get(term); if (e) pats.forEach(p => add(p, e)); });
    const pats = [...index.values()].map(e => e.pat).sort((a, b) => b.length - a.length).map(reSrc);
    regex = new RegExp(`(?<![\\p{L}\\p{N}_-])(${pats.join('|')})(?![\\p{L}\\p{N}_-])`, 'giu');
  };
  // index entry for a matched piece of text: an exact pattern, or a Russian stem pattern
  const lookup = s => {
    const e = index.get(s.toLowerCase());
    if (e) return e.cs && s !== e.pat ? null : e;
    const st = stems.find(x => x.re.test(s));
    return st ? st.e : null;
  };

  C.glossaryEntries = () => { if (!index) build(); return index; };

  // Wraps the first occurrence of each known term inside el with a hoverable definition.
  // seen: terms already linked in this block. page: optional set shared by the whole page;
  // basics terms (Network, Risk, Server…) are linked only once per page to keep cards readable.
  C.glossify = (el, seen, page) => {
    if (!el) return;
    if (!index) build();
    seen = seen || new Set();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.parentElement.closest('a,button,code,svg,.gl,script,style,select,option,h1,h3,.widget-title,th') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const text = node.nodeValue;
      regex.lastIndex = 0;
      let m, last = 0, frag = null;
      while ((m = regex.exec(text))) {
        const e = lookup(m[1]);
        if (!e) continue;
        const set = page && e.src === 'basics' ? page : seen;
        if (set.has(e.term)) continue;
        set.add(e.term);
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const span = document.createElement('span');
        span.className = 'gl'; span.tabIndex = 0; span.dataset.k = e.k; span.textContent = m[1];
        frag.appendChild(span);
        last = m.index + m[1].length;
      }
      if (frag) { frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }
    });
  };

  // one shared pop-over
  let pop = null, popFor = null;
  const hide = () => { if (pop) pop.hidden = true; popFor = null; };
  const show = el => {
    const e = C.glossaryEntries().get(el.dataset.k);
    if (!e) return;
    if (!pop) { pop = document.createElement('div'); pop.className = 'gl-pop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop); }
    pop.innerHTML = `<div class="row"><b>${esc(e.term)}</b><span class="spacer"></span><span class="pill">${e.src === 'basics' ? tr('IT basics', 'Основы IT') : e.src}</span></div>
      <div>${esc(ru() ? e.ru : e.en)}</div>`;
    pop.hidden = false; popFor = el;
    const r = el.getBoundingClientRect(), pw = Math.min(340, window.innerWidth - 24);
    pop.style.width = pw + 'px';
    pop.style.left = Math.max(12, Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - pw - 12)) + 'px';
    const below = r.bottom + 8 + pop.offsetHeight < window.innerHeight;
    pop.style.top = (window.scrollY + (below ? r.bottom + 6 : r.top - pop.offsetHeight - 6)) + 'px';
  };
  document.addEventListener('mouseover', e => { const g = e.target.closest && e.target.closest('.gl'); if (g && g !== popFor) show(g); });
  document.addEventListener('mouseout', e => { const g = e.target.closest && e.target.closest('.gl'); if (g && !g.contains(e.relatedTarget)) hide(); });
  document.addEventListener('focusin', e => { if (e.target.classList && e.target.classList.contains('gl')) show(e.target); });
  document.addEventListener('focusout', e => { if (e.target.classList && e.target.classList.contains('gl')) hide(); });
  document.addEventListener('click', e => {
    const g = e.target.closest('.gl');
    if (g) { if (popFor === g) hide(); else show(g); } else if (!e.target.closest('.gl-pop')) hide();
  });
  window.addEventListener('hashchange', hide);

  // ======================= architecture diagram widget =======================
  // spec: { title, w, h, zones: [[x, y, w, h, label, kind]], nodes: [[id, x, y, label, sub, icon, kind, width]],
  //         edges: [[from, to, label, kind, dx, dy]], note }
  // Node x/y are centres. Node kinds: bad, ok, key, dim. Edge kinds: dash, bad, ok, key, both.
  // Zone kinds: trust, dmz, untrust.
  let uid = 0;
  const textW = (s, fs) => [...s].length * fs * 0.56;

  C.widgets.arch = (el, data) => {
    const id = 'a' + (++uid);
    const W = data.w || 760, H = data.h || 300;
    const nodes = {};
    data.nodes.forEach(n => {
      const [nid, x, y, label, sub, icon, kind, fixedW] = n;
      const lab = (icon ? icon + ' ' : '') + L(label), s = sub ? L(sub) : '';
      const w = fixedW || Math.max(96, textW(lab, 13) + 24, textW(s, 11) + 20), h = s ? 46 : 34;
      nodes[nid] = { x, y, w, h, lab, s, kind };
    });
    const clip = (a, b) => {
      // point where the segment from a's centre towards b leaves a's box
      const dx = b.x - a.x, dy = b.y - a.y;
      if (!dx && !dy) return { x: a.x, y: a.y };
      const sx = dx ? (a.w / 2 + 4) / Math.abs(dx) : Infinity, sy = dy ? (a.h / 2 + 4) / Math.abs(dy) : Infinity, k = Math.min(sx, sy);
      return { x: a.x + dx * k, y: a.y + dy * k };
    };
    const pairs = new Set((data.edges || []).map(e => e[0] + '>' + e[1]));
    const zones = (data.zones || []).map(z => {
      const [x, y, w, h, label, kind] = z;
      return `<g class="zone ${kind || ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>
        ${label ? `<text x="${x + 10}" y="${y + 17}">${esc(L(label))}</text>` : ''}</g>`;
    }).join('');
    const edges = (data.edges || []).map(e => {
      const [f, to, label, kind] = e, a = nodes[f], b = nodes[to];
      if (!a || !b) return '';
      let p = clip(a, b), q = clip(b, a), at = 0.5;
      if (pairs.has(to + '>' + f)) {
        at = 0.32; // labels of a request/response pair sit near their own sender
        // request/response pair: shift each arrow sideways so they don't overlap
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1, ox = -(b.y - a.y) / len * 7, oy = (b.x - a.x) / len * 7;
        p = { x: p.x + ox, y: p.y + oy }; q = { x: q.x + ox, y: q.y + oy };
      }
      const k = (kind || '').split(' ');
      const color = k.includes('bad') ? 'bad' : k.includes('ok') ? 'ok' : k.includes('key') ? 'key' : 'def';
      const lab = label ? L(label) : '';
      // optional label offset: [from, to, label, kind, dx, dy]
      const mx = p.x + (q.x - p.x) * at + (e[4] || 0), my = p.y + (q.y - p.y) * at + (e[5] || 0), lw = textW(lab, 11) + 10;
      return `<g class="edge ${color}${k.includes('dash') ? ' dash' : ''}">
        <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" marker-end="url(#${id}-${color})"${k.includes('both') ? ` marker-start="url(#${id}-${color})"` : ''}/>
        ${lab ? `<rect class="lbg" x="${mx - lw / 2}" y="${my - 9}" width="${lw}" height="17" rx="4"/><text x="${mx}" y="${my + 4}">${esc(lab)}</text>` : ''}</g>`;
    }).join('');
    const nodeSvg = Object.values(nodes).map(n => `<g class="nd ${n.kind || ''}">
      <rect x="${n.x - n.w / 2}" y="${n.y - n.h / 2}" width="${n.w}" height="${n.h}" rx="8"/>
      <text x="${n.x}" y="${n.y + (n.s ? -3 : 4.5)}" class="t">${esc(n.lab)}</text>
      ${n.s ? `<text x="${n.x}" y="${n.y + 13}" class="s">${esc(n.s)}</text>` : ''}</g>`).join('');
    const marker = c => `<marker id="${id}-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mk ${c}"/></marker>`;
    el.innerHTML = `<div class="widget-title arch-head">◈ ${esc(L(data.title) || t('schema'))}
        <button class="btn small arch-full" title="${tr('Full screen', 'Во весь экран')}" aria-label="${tr('Full screen', 'Во весь экран')}">⤢</button></div>
      <div class="arch-hint">${tr('Swipe sideways to see the whole diagram, or tap ⤢ (works best in landscape).', 'Листайте вбок, чтобы увидеть всю схему, или нажмите ⤢ (лучше в горизонтальной ориентации).')}</div>
      <div class="arch-wrap"><svg class="arch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L(data.title) || '')}">
      <defs>${['def', 'bad', 'ok', 'key'].map(marker).join('')}</defs>${zones}${edges}${nodeSvg}</svg></div>
      ${data.note ? `<div class="small muted" style="margin-top:6px">${L(data.note)}</div>` : ''}`;
    el.querySelector('.arch-full').onclick = () => openFull(el);
  };

  // full-screen view of one diagram, for phones where the inline one scrolls sideways.
  // On a portrait phone the diagram is turned 90° so its width runs along the long side of the screen.
  let full = null;
  const closeFull = () => { if (full) { full.remove(); full = null; document.body.style.overflow = ''; } };
  const layoutFull = () => {
    if (!full) return;
    const wrap = full.querySelector('.arch-wrap'), svg = wrap.querySelector('svg'), vb = svg.viewBox.baseVal;
    const top = wrap.getBoundingClientRect().top - full.getBoundingClientRect().top;
    const rot = window.innerWidth < 700 && window.innerHeight > window.innerWidth;
    full.classList.toggle('rot', rot);
    if (!rot) { svg.removeAttribute('style'); wrap.removeAttribute('style'); return; }
    const availW = window.innerWidth - 24, len = Math.min(window.innerHeight - top - 12, availW * vb.width / vb.height);
    const h = len * vb.height / vb.width;
    svg.setAttribute('style', `width:${len}px;min-width:0;transform-origin:0 0;transform:translate(${h}px,0) rotate(90deg)`);
    wrap.setAttribute('style', `height:${len}px;width:${h}px;overflow:hidden;margin:0 auto`);
  };
  window.addEventListener('resize', layoutFull);
  const openFull = el => {
    closeFull();
    full = document.createElement('div');
    full.className = 'arch-overlay'; full.setAttribute('role', 'dialog'); full.setAttribute('aria-modal', 'true');
    const title = el.querySelector('.arch-head').firstChild.textContent.trim();
    full.innerHTML = `<div class="row"><b>${esc(title)}</b><span class="spacer"></span><button class="btn small" data-close>✕ ${tr('Close', 'Закрыть')}</button></div>
      <div class="arch-wrap">${el.querySelector('svg.arch').outerHTML}</div>${el.querySelector('.arch-wrap + .small') ? el.querySelector('.arch-wrap + .small').outerHTML : ''}`;
    document.body.appendChild(full); document.body.style.overflow = 'hidden';
    layoutFull();
    full.querySelector('[data-close]').onclick = closeFull;
    full.querySelector('[data-close]').focus();
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFull(); });
  window.addEventListener('hashchange', closeFull);

  // Renders the beginner boxes of a concept card: plain words, example, diagram.
  C.explainHtml = c => ({
    plain: c.plain ? `<div class="xbox plain"><div class="xh">💡 ${t('plain')}</div>${L(c.plain)}</div>` : '',
    ex: c.ex ? `<div class="xbox ex"><div class="xh">🏢 ${t('example')}</div>${L(c.ex)}</div>` : '',
  });
  C.renderDiagrams = (el, c) => {
    (c.dg ? [].concat(c.dg) : []).forEach(spec => {
      const box = document.createElement('div');
      box.className = 'widget';
      el.appendChild(box);
      C.widgets.arch(box, spec);
    });
  };

  // ======================= basics page =======================
  C.views.basics = main => {
    const B = C.basics;
    main.innerHTML = `<h1>${tr('IT and security basics', 'Основы IT и безопасности')}</h1>
      <p class="muted">${esc(L(B.intro))}</p>
      <div class="toc">${B.sections.map((s, i) => `<a href="javascript:void 0" data-jump="b${i}">${esc(L(s.t))}</a>`).join('')}
        <a href="javascript:void 0" data-jump="bgl">${tr('Glossary', 'Глоссарий')}</a></div>
      <div id="bsec" style="margin-top:14px"></div>
      <h2 id="bgl">${tr('Basic glossary', 'Базовый глоссарий')} (${B.glossary.length})</h2>
      <p class="small"><a class="btn" href="#/flashcards/basics">🗂 ${tr('Practice these as flashcards', 'Учить как карточки')}</a></p>
      <div class="card"><input type="text" id="glq" placeholder="${tr('Filter terms…', 'Фильтр терминов…')}" style="width:100%;max-width:360px">
        <div class="table-wrap" style="margin-top:10px"><table><thead><tr><th>${tr('Term', 'Термин')}</th><th>${tr('Meaning', 'Значение')}</th></tr></thead><tbody id="glb"></tbody></table></div></div>`;
    const box = main.querySelector('#bsec');
    B.sections.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'card concept'; card.id = 'b' + i;
      card.innerHTML = `<h3>${esc(L(s.t))}</h3><div class="body">${L(s.b)}</div>`;
      box.appendChild(card);
      C.renderDiagrams(card, s);
      C.glossify(card.querySelector('.body'));
    });
    const tb = main.querySelector('#glb');
    const draw = q => {
      q = (q || '').toLowerCase();
      tb.innerHTML = B.glossary.filter(g => !q || (g[0] + ' ' + g[1] + ' ' + g[2]).toLowerCase().includes(q))
        .map(g => `<tr><td><b>${esc(g[0])}</b></td><td>${esc(ru() ? g[2] : g[1])}</td></tr>`).join('');
    };
    draw();
    main.querySelector('#glq').oninput = e => draw(e.target.value);
    main.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => {
      document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };
})();
