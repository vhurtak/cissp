'use strict';
// Interactive widgets. Each is (el, data) => void and renders into el.
// Concepts reference a widget as w: ['name', data].

(() => {
  const { L, esc } = CISSP;
  const W = CISSP.widgets;
  const title = (el, t) => { el.innerHTML = `<div class="widget-title">◈ ${esc(L(t) || CISSP.t('diagram'))}</div>`; };
  const add = (el, html) => { const d = document.createElement('div'); d.innerHTML = html; el.appendChild(d); return d; };

  CISSP.renderWidget = (el, spec) => {
    const [name, data] = spec;
    if (!W[name]) { el.textContent = 'Unknown widget ' + name; return; }
    W[name](el, data || {});
  };

  // ---- generic: clickable process steps ----
  W.flow = (el, data) => {
    title(el, data.title);
    const box = add(el, `<div class="flow">${data.steps.map((s, i) =>
      `<div class="step" data-i="${i}"><span class="n">${data.noNum ? '' : (CISSP.lang === 'ru' ? 'ШАГ ' : 'STEP ') + (i + 1)}</span>${esc(L(s.t))}</div>`).join('')}</div>
      <div class="flow-detail muted">${CISSP.lang === 'ru' ? 'Нажмите на шаг, чтобы увидеть детали.' : 'Click a step to see details.'}</div>`);
    const det = box.querySelector('.flow-detail');
    box.querySelectorAll('.step').forEach(st => st.onclick = () => {
      box.querySelectorAll('.step').forEach(x => x.classList.remove('on'));
      st.classList.add('on');
      const s = data.steps[+st.dataset.i];
      det.classList.remove('muted');
      det.innerHTML = `<b>${esc(L(s.t))}</b><div>${L(s.d)}</div>`;
    });
  };

  // ---- generic: stacked layers (OSI, maturity levels, order of volatility…) ----
  W.layers = (el, data) => {
    title(el, data.title);
    const box = add(el, `<div class="layers">${data.items.map((it, i) =>
      `<div class="layer" data-i="${i}"><span class="n">${esc(it.n ?? i + 1)}</span><div><b>${esc(L(it.t))}</b>
       ${it.s ? `<div class="small muted">${esc(L(it.s))}</div>` : ''}</div></div>`).join('')}</div>
      <div class="flow-detail muted">${CISSP.lang === 'ru' ? 'Нажмите на уровень.' : 'Click a layer for details.'}</div>`);
    const det = box.querySelector('.flow-detail');
    box.querySelectorAll('.layer').forEach(st => st.onclick = () => {
      box.querySelectorAll('.layer').forEach(x => x.classList.remove('on'));
      st.classList.add('on');
      const it = data.items[+st.dataset.i];
      det.classList.remove('muted');
      det.innerHTML = `<b>${esc(L(it.t))}</b><div>${L(it.d)}</div>`;
    });
  };

  // ---- generic: comparison table ----
  W.compare = (el, data) => {
    title(el, data.title);
    add(el, `<div class="table-wrap"><table><thead><tr>${data.cols.map(c => `<th>${esc(L(c))}</th>`).join('')}</tr></thead>
      <tbody>${data.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<td><b>${L(c)}</b></td>` : `<td>${L(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      ${data.note ? `<div class="hint small">${L(data.note)}</div>` : ''}`);
  };

  // ---- D1: quantitative risk calculator ----
  W.riskCalc = el => {
    title(el, { en: 'Quantitative risk calculator', ru: 'Калькулятор количественного риска' });
    const box = add(el, `<div class="calc-grid">
      <div><label>Asset Value (AV), $</label><input type="number" id="av" value="500000"></div>
      <div><label>Exposure Factor (EF), %</label><input type="number" id="ef" value="40"></div>
      <div><label>ARO (times / year)</label><input type="number" id="aro" value="0.5" step="0.1"></div>
      <div><label>Safeguard annual cost (ACS), $</label><input type="number" id="acs" value="30000"></div>
      <div><label>ARO after safeguard</label><input type="number" id="aro2" value="0.1" step="0.05"></div>
      <div><label>EF after safeguard, %</label><input type="number" id="ef2" value="40"></div>
    </div><div class="calc-out"></div><div class="verdict"></div>
    <div class="hint small mono">SLE = AV × EF · ALE = SLE × ARO · Safeguard value = ALE(before) − ALE(after) − ACS</div>`);
    const v = id => parseFloat(box.querySelector('#' + id).value) || 0;
    const money = n => '$' + Math.round(n).toLocaleString('en-US');
    const calc = () => {
      const sle = v('av') * v('ef') / 100, ale = sle * v('aro');
      const sle2 = v('av') * v('ef2') / 100, ale2 = sle2 * v('aro2');
      const value = ale - ale2 - v('acs');
      box.querySelector('.calc-out').innerHTML = `<div>SLE<b>${money(sle)}</b></div><div>ALE before<b>${money(ale)}</b></div>
        <div>ALE after<b>${money(ale2)}</b></div><div>Safeguard value<b>${money(value)}</b></div>`;
      const vd = box.querySelector('.verdict');
      vd.className = 'verdict ' + (value > 0 ? 'ok' : 'bad');
      vd.textContent = value > 0
        ? (CISSP.lang === 'ru' ? 'Мера экономически оправдана: снижение ALE больше её стоимости.' : 'Cost-justified: the reduction in ALE exceeds the annual cost of the safeguard.')
        : (CISSP.lang === 'ru' ? 'Мера НЕ оправдана: стоит больше, чем снижает потери. Рассмотрите принятие или передачу риска.' : 'NOT cost-justified: the safeguard costs more than the loss it prevents. Consider acceptance or transference.');
    };
    box.querySelectorAll('input').forEach(i => i.oninput = calc);
    calc();
  };

  // ---- D1: control classification game ----
  const CONTROLS = [
    ['Firewall rule blocking inbound Telnet', 'Preventive', 'Technical'],
    ['CCTV recordings reviewed after an incident', 'Detective', 'Physical'],
    ['"Beware of dog" sign on the fence', 'Deterrent', 'Physical'],
    ['Restoring a server from last night\'s backup', 'Recovery', 'Technical'],
    ['Antivirus quarantining an infected file', 'Corrective', 'Technical'],
    ['Acceptable Use Policy', 'Directive', 'Administrative'],
    ['Mandatory vacation for finance staff', 'Detective', 'Administrative'],
    ['Separation of duties for payments', 'Preventive', 'Administrative'],
    ['IDS raising an alert', 'Detective', 'Technical'],
    ['Mantrap at the data-center entrance', 'Preventive', 'Physical'],
    ['Periodic audit log review', 'Detective', 'Administrative'],
    ['Warm site used after a flood', 'Recovery', 'Physical'],
    ['Extra supervisory review because a small team cannot separate duties', 'Compensating', 'Administrative'],
    ['Full-disk encryption on laptops', 'Preventive', 'Technical'],
    ['Pre-employment background check', 'Preventive', 'Administrative'],
    ['Bright perimeter lighting', 'Deterrent', 'Physical'],
    ['Sprinkler system activating', 'Corrective', 'Physical'],
    ['Motion detector in a server room', 'Detective', 'Physical'],
    ['"Authorized personnel only" sign', 'Directive', 'Physical'],
    ['Account lockout after 5 failed logons', 'Preventive', 'Technical'],
  ];
  const FUNCS = ['Preventive', 'Detective', 'Corrective', 'Deterrent', 'Recovery', 'Directive', 'Compensating'];
  W.controlGame = el => {
    title(el, { en: 'Classify the control (functional type)', ru: 'Классифицируйте меру защиты (функциональный тип)' });
    const box = add(el, '');
    let deck = CISSP.shuffle(CONTROLS), i = 0, score = 0;
    const show = () => {
      if (i >= deck.length) {
        box.innerHTML = `<div class="verdict ok">Score: ${score}/${deck.length}</div><button class="btn small">Restart</button>`;
        box.querySelector('button').onclick = () => { deck = CISSP.shuffle(CONTROLS); i = 0; score = 0; show(); };
        return;
      }
      const c = deck[i];
      box.innerHTML = `<div class="row"><b>${i + 1}/${deck.length}:</b> ${esc(c[0])}</div>
        <div class="row" style="margin-top:8px">${FUNCS.map(f => `<button class="btn small" data-f="${f}">${f}</button>`).join('')}</div><div class="fb"></div>`;
      box.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
        const ok = b.dataset.f === c[1];
        if (ok) score++;
        box.querySelectorAll('[data-f]').forEach(x => { x.disabled = true; if (x.dataset.f === c[1]) x.classList.add('primary'); });
        box.querySelector('.fb').innerHTML = `<div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓' : '✗'} ${c[1]} · category: ${c[2]}</div>
          <button class="btn small">${CISSP.t('next')} →</button>`;
        box.querySelector('.fb button').onclick = () => { i++; show(); };
      });
    };
    show();
  };

  // ---- D3: Bell-LaPadula / Biba simulator ----
  W.secModels = el => {
    title(el, { en: 'Security model simulator: can the subject do it?', ru: 'Симулятор моделей безопасности: разрешено ли действие?' });
    const box = add(el, `<div class="row">
      <label>Model <select id="m"><option value="blp">Bell-LaPadula (confidentiality)</option><option value="biba">Biba (integrity)</option></select></label>
      <label>Subject <select id="s"></select></label>
      <label>Action <select id="a"><option value="r">read</option><option value="w">write</option></select></label>
      <label>Object <select id="o"></select></label>
      <label class="chk"><input type="checkbox" id="strong"> Strong * property</label>
      </div><div class="chart-wrap" id="svg"></div><div class="verdict"></div><div class="small muted" id="rule"></div>`);
    const LV = { blp: ['Top Secret', 'Secret', 'Confidential', 'Unclassified'], biba: ['High integrity', 'Medium integrity', 'Low integrity'] };
    const $ = id => box.querySelector('#' + id);
    const fill = () => {
      const lv = LV[$('m').value];
      ['s', 'o'].forEach(k => { $(k).innerHTML = lv.map((l, i) => `<option value="${i}">${l}</option>`).join(''); });
      $('s').value = 1; $('o').value = 0;
    };
    const run = () => {
      const m = $('m').value, s = +$('s').value, o = +$('o').value, a = $('a').value, strong = $('strong').checked;
      // index 0 = highest level
      let ok, rule;
      if (m === 'blp') {
        if (strong && a === 'w') { ok = s === o; rule = 'Strong * property: read and write only at your own level.'; }
        else if (a === 'r') { ok = s <= o; rule = 'Simple Security Property: NO READ UP (subject may read at or below its clearance).'; }
        else { ok = o <= s; rule = '* (Star) Property: NO WRITE DOWN (prevents leaking secrets to lower levels).'; }
      } else {
        if (a === 'r') { ok = o <= s; rule = 'Simple Integrity Axiom: NO READ DOWN (don\'t let low-integrity data contaminate you).'; }
        else { ok = s <= o; rule = '* Integrity Axiom: NO WRITE UP (don\'t corrupt higher-integrity data).'; }
      }
      const lv = LV[m], H = 44, W0 = 460;
      const y = i => 20 + i * H;
      const rows = lv.map((l, i) => `<rect x="120" y="${y(i)}" width="220" height="${H - 8}" rx="6" fill="var(--panel)" stroke="var(--border)"/>
        <text x="230" y="${y(i) + 23}" text-anchor="middle" font-size="13">${l}</text>`).join('');
      const sy = y(s) + 18, oy = y(o) + 18;
      const col = ok ? 'var(--ok)' : 'var(--bad)';
      const svg = `<svg viewBox="0 0 ${W0} ${y(lv.length) + 10}" width="100%" style="max-width:${W0}px">
        <defs><marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker></defs>
        ${rows}
        <circle cx="70" cy="${sy}" r="16" fill="var(--accent)"/><text x="70" y="${sy + 4}" text-anchor="middle" font-size="11" fill="#fff" style="fill:#fff">S</text>
        <rect x="378" y="${oy - 14}" width="28" height="28" rx="4" fill="var(--warn)"/><text x="392" y="${oy + 4}" text-anchor="middle" font-size="11" style="fill:#000">O</text>
        <path d="M86,${sy} C 250,${sy} 250,${oy} 374,${oy}" fill="none" stroke="${col}" stroke-width="3" ${ok ? '' : 'stroke-dasharray="6 5"'} marker-end="url(#arr)"/>
        <text x="70" y="${sy - 24}" text-anchor="middle" font-size="12" font-weight="700" fill="${col}" style="fill:${col}">${a === 'r' ? 'READ' : 'WRITE'} ${ok ? '✓' : '✗'}</text>
      </svg>`;
      $('svg').innerHTML = svg;
      const vd = box.querySelector('.verdict');
      vd.className = 'verdict ' + (ok ? 'ok' : 'bad');
      vd.textContent = ok ? 'ALLOWED' : 'DENIED';
      $('rule').textContent = rule;
      $('strong').parentElement.style.display = m === 'blp' ? '' : 'none';
    };
    $('m').onchange = () => { fill(); run(); };
    ['s', 'o', 'a', 'strong'].forEach(k => $(k).onchange = run);
    fill(); run();
  };

  // ---- D3: key count / complete graph ----
  W.keyCount = el => {
    title(el, { en: 'How many keys do N users need?', ru: 'Сколько ключей нужно N пользователям?' });
    const box = add(el, `<label>N users: <input type="range" min="2" max="12" value="5" id="n"> <b id="nv">5</b></label>
      <div class="row"><div class="chart-wrap" id="g" style="flex:0 0 240px"></div><div class="calc-out" style="flex:1" id="out"></div></div>`);
    const run = () => {
      const n = +box.querySelector('#n').value;
      box.querySelector('#nv').textContent = n;
      const R = 95, c = 120, pts = Array.from({ length: n }, (_, i) => [c + R * Math.cos(2 * Math.PI * i / n - Math.PI / 2), c + R * Math.sin(2 * Math.PI * i / n - Math.PI / 2)]);
      let lines = '';
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) lines += `<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="var(--accent)" opacity=".45"/>`;
      box.querySelector('#g').innerHTML = `<svg viewBox="0 0 240 240" width="240">${lines}${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="var(--d3)"/>`).join('')}</svg>`;
      box.querySelector('#out').innerHTML = `<div>Symmetric keys<b>${n * (n - 1) / 2}</b><span class="small muted">n(n−1)/2 — one shared secret per pair (each line)</span></div>
        <div>Asymmetric keys<b>${2 * n}</b><span class="small muted">2n — one public + one private per user</span></div>
        <div>For 1,000 users<b>499,500 vs 2,000</b><span class="small muted">why we use asymmetric crypto to exchange symmetric session keys</span></div>`;
    };
    box.querySelector('#n').oninput = run;
    run();
  };

  // ---- D3: hashing avalanche demo ----
  W.hashDemo = el => {
    title(el, { en: 'Hashing: avalanche effect (SHA-256)', ru: 'Хеширование: лавинный эффект (SHA-256)' });
    const box = add(el, `<div class="calc-grid"><div><label>Message A</label><input type="text" id="a" value="Pay Bob $100" style="width:100%"></div>
      <div><label>Message B</label><input type="text" id="b" value="Pay Bob $900" style="width:100%"></div></div>
      <div class="mono small" id="ha" style="word-break:break-all;margin-top:8px"></div><div class="mono small" id="hb" style="word-break:break-all"></div><div class="verdict ok" id="diff"></div>`);
    const hex = async s => {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    };
    const run = async () => {
      if (!(window.crypto && crypto.subtle)) { box.querySelector('#diff').textContent = 'WebCrypto unavailable in this context (open via http://localhost).'; return; }
      const a = await hex(box.querySelector('#a').value), b = await hex(box.querySelector('#b').value);
      box.querySelector('#ha').textContent = 'A: ' + a;
      box.querySelector('#hb').textContent = 'B: ' + b;
      let bits = 0;
      for (let i = 0; i < 64; i += 2) { let x = parseInt(a.substr(i, 2), 16) ^ parseInt(b.substr(i, 2), 16); while (x) { bits += x & 1; x >>= 1; } }
      box.querySelector('#diff').textContent = `${bits} of 256 bits differ (${Math.round(bits / 2.56)}%). Fixed-length output, one-way, a tiny input change flips ~50% of bits.`;
    };
    box.querySelectorAll('input').forEach(i => i.oninput = run);
    run();
  };

  // ---- D3: classical ciphers ----
  W.cipher = el => {
    title(el, { en: 'Classical ciphers: substitution (Caesar) and Vigenère', ru: 'Классические шифры: подстановка (Цезарь) и Виженер' });
    const box = add(el, `<div class="row"><select id="mode"><option value="c">Caesar (shift)</option><option value="v">Vigenère (keyword)</option></select>
      <span id="kwrap">Shift <input type="number" id="k" value="3" min="0" max="25" style="width:70px"></span>
      <span id="vwrap" hidden>Key <input type="text" id="vk" value="LEMON" style="width:110px"></span></div>
      <div class="calc-grid" style="margin-top:8px"><div><label>Plaintext</label><input type="text" id="p" value="ATTACK AT DAWN" style="width:100%"></div>
      <div><label>Ciphertext</label><input type="text" id="c" readonly style="width:100%"></div></div>
      <div class="hint small" id="note"></div>`);
    const $ = id => box.querySelector('#' + id);
    const run = () => {
      const mode = $('mode').value;
      $('kwrap').hidden = mode !== 'c'; $('vwrap').hidden = mode !== 'v';
      const key = mode === 'c' ? [+$('k').value % 26] : ($('vk').value.toUpperCase().replace(/[^A-Z]/g, '') || 'A').split('').map(ch => ch.charCodeAt(0) - 65);
      let j = 0;
      $('c').value = $('p').value.toUpperCase().replace(/[A-Z]/g, ch => String.fromCharCode((ch.charCodeAt(0) - 65 + key[j++ % key.length]) % 26 + 65));
      $('note').textContent = mode === 'c'
        ? 'Monoalphabetic substitution: each letter always maps to the same letter, so frequency analysis breaks it. ROT13 is Caesar with shift 13.'
        : 'Polyalphabetic substitution: the keyword changes the shift per letter, defeating simple frequency analysis. A truly random key as long as the message, used once, is a one-time pad.';
    };
    box.querySelectorAll('input,select').forEach(i => i.oninput = run);
    run();
  };

  // ---- D5: biometric FAR / FRR / CER ----
  W.biometric = el => {
    title(el, { en: 'Biometrics: FAR, FRR and the Crossover Error Rate', ru: 'Биометрия: FAR, FRR и CER' });
    const box = add(el, `<label>Sensitivity: <input type="range" id="s" min="0" max="100" value="30"></label><div class="chart-wrap" id="g"></div><div class="calc-out" id="o"></div>`);
    const FAR = x => 10 / (1 + Math.exp((x - 50) / 10)), FRR = x => 10 / (1 + Math.exp(-(x - 50) / 10));
    const run = () => {
      const s = +box.querySelector('#s').value, w = 480, h = 220, X = x => 40 + x * 4.2, Y = y => 190 - y * 16.5;
      const path = f => Array.from({ length: 101 }, (_, x) => `${x ? 'L' : 'M'}${X(x)},${Y(f(x))}`).join(' ');
      box.querySelector('#g').innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px">
        <line x1="40" y1="190" x2="460" y2="190" stroke="currentColor" opacity=".3"/><line x1="40" y1="20" x2="40" y2="190" stroke="currentColor" opacity=".3"/>
        <path d="${path(FAR)}" fill="none" stroke="var(--bad)" stroke-width="2.5"/><path d="${path(FRR)}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
        <circle cx="${X(50)}" cy="${Y(5)}" r="5" fill="var(--ok)"/><text x="${X(50) + 8}" y="${Y(5) - 6}" font-size="11">CER</text>
        <line x1="${X(s)}" x2="${X(s)}" y1="20" y2="190" stroke="var(--warn)" stroke-dasharray="4 3"/>
        <text x="60" y="34" font-size="11" fill="var(--bad)" style="fill:var(--bad)">FAR (Type II)</text>
        <text x="370" y="34" font-size="11" fill="var(--accent)" style="fill:var(--accent)">FRR (Type I)</text>
        <text x="250" y="210" font-size="11" text-anchor="middle">sensitivity →</text><text x="12" y="105" font-size="11" transform="rotate(-90 12 105)">error rate</text></svg>`;
      box.querySelector('#o').innerHTML = `<div>FAR — false accept<b>${FAR(s).toFixed(2)}%</b><span class="small muted">Type II: impostor let in (worse for security)</span></div>
        <div>FRR — false reject<b>${FRR(s).toFixed(2)}%</b><span class="small muted">Type I: valid user denied (annoying)</span></div>
        <div>CER / EER<b>5.00%</b><span class="small muted">where FAR = FRR; lower CER = more accurate device</span></div>`;
    };
    box.querySelector('#s').oninput = run;
    run();
  };

  // ---- D7: backup strategy restore simulator ----
  W.backupSim = el => {
    title(el, { en: 'Backup types: what do you need to restore?', ru: 'Типы резервного копирования: что нужно для восстановления?' });
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const box = add(el, `<div class="row"><label>Strategy <select id="st"><option value="inc">Full (Sun) + daily Incremental</option><option value="diff">Full (Sun) + daily Differential</option><option value="full">Full every day</option></select></label>
      <label>Failure on <select id="f">${days.slice(1).map((d, i) => `<option value="${i + 1}" ${i === 3 ? 'selected' : ''}>${d} (after backup)</option>`).join('')}</select></label></div>
      <div class="flow" id="tapes" style="margin-top:10px"></div><div class="hint small" id="ex"></div>`);
    const run = () => {
      const st = box.querySelector('#st').value, f = +box.querySelector('#f').value;
      const need = st === 'full' ? [f] : st === 'diff' ? [0, f] : Array.from({ length: f + 1 }, (_, i) => i);
      box.querySelector('#tapes').innerHTML = days.map((d, i) => {
        const type = st === 'full' || i === 0 ? 'Full' : st === 'inc' ? 'Incr' : 'Diff';
        const size = type === 'Full' ? 'all data' : type === 'Incr' ? 'changes since last backup' : `changes since Sun (${i} day${i > 1 ? 's' : ''})`;
        return `<div class="step ${need.includes(i) ? 'on' : ''}" style="${i > f ? 'opacity:.35' : ''}"><span class="n">${d}</span>${type}<div class="small muted" style="font-weight:400">${size}</div></div>`;
      }).join('');
      box.querySelector('#ex').innerHTML = st === 'inc'
        ? `<b>Restore needs ${need.length} backups:</b> the full + every incremental in order. Fastest backups, slowest restore. Incremental clears the archive bit.`
        : st === 'diff' ? `<b>Restore needs 2 backups:</b> the full + the latest differential. Backups grow daily, restore is fast. Differential does NOT clear the archive bit.`
          : `<b>Restore needs 1 backup.</b> Fastest restore, but the most time and storage per backup.`;
    };
    box.querySelectorAll('select').forEach(s => s.onchange = run);
    run();
  };

  // ---- D3: cloud shared responsibility ----
  W.sharedResp = el => {
    title(el, { en: 'Cloud shared responsibility model', ru: 'Модель разделённой ответственности в облаке' });
    const rows = [['Data & information', 'Y', 'Y', 'Y', 'Y'], ['Devices / endpoints', 'Y', 'Y', 'Y', 'Y'], ['Accounts & identities', 'Y', 'Y', 'Y', 'Y'],
      ['Identity & directory infrastructure', 'Y', 'Y', 'S', 'S'], ['Applications', 'Y', 'Y', 'S', 'P'], ['Network controls', 'Y', 'Y', 'S', 'P'],
      ['Operating system', 'Y', 'Y', 'P', 'P'], ['Virtualization / hypervisor', 'Y', 'P', 'P', 'P'], ['Physical hosts, network, data center', 'Y', 'P', 'P', 'P']];
    const lab = { Y: ['c-you', 'Customer'], P: ['c-csp', 'Provider'], S: ['c-sh', 'Shared'] };
    add(el, `<div class="table-wrap"><table class="sr"><thead><tr><th>Responsibility</th><th>On-prem</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td>${r.slice(1).map(c => `<td class="${lab[c][0]}">${lab[c][1]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="hint small">The customer is <b>always</b> accountable for its data, endpoints, and accounts, whatever the service model. Accountability can't be outsourced; responsibility for operating controls can.</div>`);
  };
})();
