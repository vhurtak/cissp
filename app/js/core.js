'use strict';
// Core: registry, storage, i18n, router. Everything hangs off window.CISSP so the
// app works from file:// without a server (classic scripts, no modules).

const CISSP = window.CISSP = {
  domains: [],
  widgets: {},
  views: {},
  meta: null,
  examActive: false,

  domain(d) {
    d.questions.forEach((q, i) => {
      q.id = q.id || `d${d.id}-${String(i + 1).padStart(3, '0')}`;
      q.dom = d.id;
      q.t = q.t || 'mcq';
      q.d = q.d || 2;
    });
    d.terms = d.terms.map((t, i) => ({ id: `d${d.id}-t${i + 1}`, dom: d.id, term: t[0], en: t[1], ru: t[2] }));
    d.concepts.forEach((c, i) => { c.key = `d${d.id}-c${i + 1}`; });
    this.domains[d.id - 1] = d;
  },

  allQuestions() { return this.domains.flatMap(d => d.questions); },
  allTerms() { return this.domains.flatMap(d => d.terms); },
  dom(id) { return this.domains[id - 1]; },
};

// ---------- storage (never throws) ----------
CISSP.store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('cissp.' + key); return v == null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('cissp.' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  },
};

// ---------- i18n ----------
const UI = {
  en: {
    'nav.dashboard': 'Dashboard', 'nav.plan': 'Study plan', 'nav.domains': 'Domains', 'nav.flashcards': 'Flashcards',
    'nav.quiz': 'Quizzes', 'nav.exam': 'Exam simulator', 'nav.mindset': 'Exam strategy', 'nav.resources': 'Resources',
    'showRu': 'Show in Russian', 'hideRu': 'Hide Russian', 'showEn': 'Show in English',
    'markRead': 'Mark as studied', 'read': 'Studied ✓', 'objectives': 'Official exam objectives',
    'concepts': 'Key concepts', 'terms': 'Glossary', 'practice': 'Practice this domain',
    'weight': 'Exam weight', 'questions': 'questions', 'answered': 'answered', 'accuracy': 'accuracy',
    'start': 'Start', 'next': 'Next', 'submit': 'Submit answer', 'finish': 'Finish', 'again': 'Try again',
    'correct': 'Correct', 'incorrect': 'Incorrect', 'explanation': 'Explanation',
    'flip': 'Click card to flip', 'again2': 'Again', 'hard': 'Hard', 'good': 'Good', 'easy': 'Easy',
    'mindmap': 'Domain map', 'diagram': 'Interactive', 'back': 'Back',
  },
  ru: {
    'nav.dashboard': 'Обзор', 'nav.plan': 'План', 'nav.domains': 'Домены', 'nav.flashcards': 'Карточки',
    'nav.quiz': 'Тесты', 'nav.exam': 'Симулятор экзамена', 'nav.mindset': 'Стратегия', 'nav.resources': 'Ресурсы',
    'showRu': 'Показать по-русски', 'hideRu': 'Скрыть перевод', 'showEn': 'Показать по-английски',
    'markRead': 'Отметить как изученное', 'read': 'Изучено ✓', 'objectives': 'Официальные цели экзамена',
    'concepts': 'Ключевые понятия', 'terms': 'Глоссарий', 'practice': 'Практика по домену',
    'weight': 'Вес на экзамене', 'questions': 'вопросов', 'answered': 'отвечено', 'accuracy': 'точность',
    'start': 'Начать', 'next': 'Далее', 'submit': 'Ответить', 'finish': 'Завершить', 'again': 'Ещё раз',
    'correct': 'Верно', 'incorrect': 'Неверно', 'explanation': 'Объяснение',
    'flip': 'Нажмите на карточку, чтобы перевернуть', 'again2': 'Снова', 'hard': 'Трудно', 'good': 'Хорошо', 'easy': 'Легко',
    'mindmap': 'Карта домена', 'diagram': 'Интерактив', 'back': 'Назад',
  },
};

CISSP.lang = CISSP.store.get('lang', 'en');
CISSP.t = key => (UI[CISSP.lang] && UI[CISSP.lang][key]) || UI.en[key] || key;
// L(): pick the current language from {en, ru} objects; plain strings pass through.
CISSP.L = (v, lang) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  lang = lang || CISSP.lang;
  return v[lang] || v.en || '';
};
CISSP.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

CISSP.setLang = lang => {
  CISSP.lang = lang;
  CISSP.store.set('lang', lang);
  document.documentElement.lang = lang;
  CISSP.applyI18n();
  if (!CISSP.examActive) CISSP.route();
};
CISSP.applyI18n = () => {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = CISSP.t(el.dataset.i18n); });
  document.getElementById('langBtn').textContent = CISSP.lang === 'en' ? 'EN' : 'RU';
};

// ---------- helpers ----------
CISSP.shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
CISSP.pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
CISSP.fmtTime = s => {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(sec).padStart(2, '0');
};
CISSP.domColor = id => `var(--d${id})`;

// Records an answer to the per-question stats used by the dashboard and "missed" filters.
CISSP.recordAnswer = (qid, ok) => {
  const ans = CISSP.store.get('answers', {});
  const a = ans[qid] || { n: 0, ok: 0 };
  a.n++; if (ok) a.ok++;
  a.last = ok ? 1 : 0; a.ts = Date.now();
  ans[qid] = a;
  CISSP.store.set('answers', ans);
};

CISSP.domainStats = () => {
  const ans = CISSP.store.get('answers', {});
  return CISSP.domains.map(d => {
    let n = 0, ok = 0, seen = 0;
    d.questions.forEach(q => { const a = ans[q.id]; if (a) { seen++; n += a.n; ok += a.ok; } });
    return { id: d.id, total: d.questions.length, seen, n, ok, acc: n ? ok / n : null };
  });
};

// RU toggle button: renders the Russian text under the English one on demand.
CISSP.ruToggle = (ruHtml, label) => {
  if (!ruHtml) return '';
  const id = 'ru' + Math.random().toString(36).slice(2, 9);
  return `<button class="btn small" data-ru-toggle="${id}">🇷🇺 ${label || CISSP.t('showRu')}</button>
    <div class="ru-box" id="${id}" hidden>${ruHtml}</div>`;
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-ru-toggle]');
  if (!b) return;
  const box = document.getElementById(b.dataset.ruToggle);
  if (box) box.hidden = !box.hidden;
});

// ---------- router ----------
CISSP.route = () => {
  const parts = (location.hash || '#/dashboard').slice(2).split('/');
  const view = parts[0] || 'dashboard';
  const main = document.getElementById('main');
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + (view === 'domain' ? 'domains' : view)));
  document.getElementById('nav').classList.remove('open');
  const fn = CISSP.views[view] || CISSP.views.dashboard;
  main.innerHTML = '';
  window.scrollTo(0, 0);
  fn(main, ...parts.slice(1));
};

CISSP.start = () => {
  const theme = CISSP.store.get('theme', null);
  if (theme) document.documentElement.dataset.theme = theme;
  document.documentElement.lang = CISSP.lang;
  CISSP.applyI18n();
  document.getElementById('langBtn').onclick = () => CISSP.setLang(CISSP.lang === 'en' ? 'ru' : 'en');
  document.getElementById('themeBtn').onclick = () => {
    const dark = getComputedStyle(document.documentElement).colorScheme === 'dark';
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    CISSP.store.set('theme', next);
  };
  document.getElementById('menuBtn').onclick = () => document.getElementById('nav').classList.toggle('open');
  let lastHash = location.hash;
  window.addEventListener('hashchange', () => {
    if (CISSP.examActive && !location.hash.startsWith('#/exam')) {
      if (!confirm('An exam is in progress. Leave and abandon it?')) { history.replaceState(null, '', lastHash); return; }
      CISSP.examActive = false;
      if (CISSP.examStop) CISSP.examStop();
    }
    lastHash = location.hash;
    CISSP.route();
  });
  window.addEventListener('beforeunload', e => { if (CISSP.examActive) { e.preventDefault(); e.returnValue = ''; } });
  CISSP.route();
};
