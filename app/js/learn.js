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
  const isAcronym = s => /[A-Z].*[A-Z0-9]/.test(s) && s === s.toUpperCase();
  let index = null, regex = null;

  const patternsFor = term => {
    const base = term.replace(/\s*\(.*?\)\s*/g, ' ').trim();
    return base.split(/\s+(?:\/|vs)\s+/).map(s => s.trim()).filter(s => s.length > 1 && !SKIP.has(s) && !SKIP.has(term));
  };

  const build = () => {
    index = new Map();
    const add = (pat, entry) => {
      const k = pat.toLowerCase();
      if (!index.has(k)) index.set(k, { ...entry, cs: isAcronym(pat), pat });
    };
    C.allTerms().forEach(tm => patternsFor(tm.term).forEach(p => add(p, { term: tm.term, en: tm.en, ru: tm.ru, src: 'D' + tm.dom })));
    (C.basics ? C.basics.glossary : []).forEach(g => [g[0], ...(g[3] || [])].forEach(p => patternsFor(p).forEach(pp => add(pp, { term: g[0], en: g[1], ru: g[2], src: 'basics' }))));
    const pats = [...index.values()].map(e => e.pat).sort((a, b) => b.length - a.length)
      .map(p => p.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'));
    regex = new RegExp(`(?<![\\w-])(${pats.join('|')})(?![\\w-])`, 'gi');
  };

  C.glossaryEntries = () => { if (!index) build(); return index; };

  // Wraps the first occurrence of each known term inside el with a hoverable definition.
  C.glossify = (el, seen) => {
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
        const e = index.get(m[1].toLowerCase());
        if (!e || (e.cs && m[1] !== e.pat) || seen.has(e.term)) continue;
        seen.add(e.term);
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const span = document.createElement('span');
        span.className = 'gl'; span.tabIndex = 0; span.dataset.k = m[1].toLowerCase(); span.textContent = m[1];
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
  //         edges: [[from, to, label, kind]], note }
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
      const mx = p.x + (q.x - p.x) * at, my = p.y + (q.y - p.y) * at, lw = textW(lab, 11) + 10;
      return `<g class="edge ${color}${k.includes('dash') ? ' dash' : ''}">
        <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" marker-end="url(#${id}-${color})"${k.includes('both') ? ` marker-start="url(#${id}-${color})"` : ''}/>
        ${lab ? `<rect class="lbg" x="${mx - lw / 2}" y="${my - 9}" width="${lw}" height="17" rx="4"/><text x="${mx}" y="${my + 4}">${esc(lab)}</text>` : ''}</g>`;
    }).join('');
    const nodeSvg = Object.values(nodes).map(n => `<g class="nd ${n.kind || ''}">
      <rect x="${n.x - n.w / 2}" y="${n.y - n.h / 2}" width="${n.w}" height="${n.h}" rx="8"/>
      <text x="${n.x}" y="${n.y + (n.s ? -3 : 4.5)}" class="t">${esc(n.lab)}</text>
      ${n.s ? `<text x="${n.x}" y="${n.y + 13}" class="s">${esc(n.s)}</text>` : ''}</g>`).join('');
    const marker = c => `<marker id="${id}-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mk ${c}"/></marker>`;
    el.innerHTML = `<div class="widget-title">◈ ${esc(L(data.title) || t('schema'))}</div>
      <div class="arch-wrap"><svg class="arch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L(data.title) || '')}">
      <defs>${['def', 'bad', 'ok', 'key'].map(marker).join('')}</defs>${zones}${edges}${nodeSvg}</svg></div>
      ${data.note ? `<div class="small muted" style="margin-top:6px">${L(data.note)}</div>` : ''}`;
  };

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
