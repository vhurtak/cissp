# Next steps: beginner layer

Goal: make every concept understandable for someone who works near IT but not in security or DevOps.
Each concept should have a definition, a plain-language explanation, a real-world example and, where architecture matters, a diagram.

## Done

- `app/js/learn.js`:
  - glossary pop-overs: the first use of each known term in a concept card, quiz explanation or widget detail gets a dotted underline and shows its definition on hover or tap
  - `arch` diagram widget: boxes, zones and arrows, theme-aware
  - Basics page (`#/basics`)
- `app/data/basics.js`: 9 primer sections, each with a diagram (systems, networks, company network, encryption/PKI, identity/SSO, cloud/containers, CI/CD, attack chain, who does security), plus 107 basic glossary terms in EN and RU.
- The concept card renders `plain` (💡 In plain words, before the body), `ex` (🏢 Real-world example, after the body) and `dg` (one or more diagrams) when a concept has them.
- `tools/validate.js` checks the basics content and diagram edges, and reports how many concepts are explained (`concepts explained N/77`).

- `app/data/x1.js` … `x8.js`: all 77 concepts have `plain` and `ex` in EN and RU, plus 39 diagrams (governance, BCP timeline, risk treatment, STRIDE DFD, supply chain, data states, DLP/CASB, BLP vs Biba, reference monitor, hybrid TLS, PKI chain, TPM/HSM, facility layers, OSI devices, DMZ, IPsec modes, 802.1X, SDN, micro-segmentation, VPN types, Kerberos, SAML, OAuth/OIDC, JML/SCIM, PAM, scan vs pentest, testing in the pipeline, logs → KPI/KRI, chain of custody, incident response, change management, backup restore sets, recovery sites, RAID, SDLC, CI/CD gates, SQL injection, XSS/CSRF, database view).
- Fixed: on concept cards that have both a diagram and an interactive widget, the widget used to overwrite the diagram (`views.js` now targets the card's own widget slot).
- Edge labels accept an optional offset: `[from, to, label, kind, dx, dy]`. Basics diagrams use it so labels no longer sit on boxes.
- `tools/check-diagrams.js` checks every diagram in both languages (nodes inside the viewBox, no overlapping nodes, labels not on nodes). Text widths are estimated the same way as in `learn.js`.
- Polish pass:
  - `tools/check-diagrams.js` also reports edges that cross unrelated nodes; the two crossings it found (basics DMZ, D8 database view) are fixed.
  - Glossary density: basics terms (Network, Risk, Server…) are linked once per domain page, domain terms once per concept card. D1 went from 148 to 93 underlines, D4 from 159 to 94.
  - Russian pop-overs: `app/data/ru-match.js` maps terms to Russian patterns, where `*` stands for up to 4 more letters (`шифрован*`). Matching uses Unicode word boundaries. `validate.js` checks that every key is a known term.
  - Flashcards: optional "IT basics" deck (`#/flashcards/basics`, also linked from the Basics glossary). It is kept out of "All domains" and the dashboard due count.
  - Mobile: tighter card padding under 640px, a swipe hint, and a ⤢ full-screen button on diagrams (under 860px). On a portrait phone the full-screen diagram is turned 90° so it fills the long side; Esc or ✕ closes it.
- `tools/serve.js`: dependency-free static server (`node tools/serve.js 8766`), used by the `cissp-dev` entry in `.claude/launch.json`.
- Learning path pilot (item 0 below, plan step 1):
  - `app/js/path.js`: `#/path` (resumes at the saved card), `#/path/<card id>`, `#/path/stages` (stage list + kept cards), `#/path/refresh` (up to 10 kept cards and skipped `back` cards, Leitner intervals from `C.INTERVALS`), `#/path/concept/<key>` (first card for a concept), `#/path/end`. Arrow keys, Space to reveal, swipe on phones. Position, seen, kept and refresh state live in `store` key `path` (included in export and reset).
  - "Learning path" is in the nav and on the dashboard ("Continue →"). Every concept card on a domain page links "▶ See it in the path"; "Read more →" on a path card opens `#/domain/N/<key>` scrolled to the concept.
  - `app/data/path/index.js`: the 13 planned stages (titles EN/RU). `s01.js` (stage 1, 45 cards, complete with recap) and `s02.js` (stage 2, first 16 cards, marked `partial`). All 8 card kinds are used; 7 `think` cards, 6 `back` cards.
  - `validate.js` checks path cards (see "App work" below for the rules) and prints coverage; the "every concept introduced once and revisited twice" rule turns into an error once all stages exist and none is partial. `check-diagrams.js` checks card diagrams too.
  - Global `[hidden] { display: none !important }` in CSS: buttons and `.row`s with `hidden` were still shown (this also fixes the flashcard rating row, which used to show before flipping).

## Format reference for `xN.js`

```js
'use strict';
CISSP.explain(1, {
  'd1-c1': {
    plain: { en: `<p>…analogy, 2–4 sentences…</p>`, ru: `<p>…</p>` },
    ex:    { en: `<p>…concrete scenario: who, what happened, which control helped…</p>`, ru: `<p>…</p>` },
    dg:    { title: { en, ru }, h: 280, zones: [[x, y, w, h, label, kind]],
             nodes: [[id, x, y, label, sub, icon, kind, width]], edges: [[from, to, label, kind, dx, dy]], note: { en, ru } },
  },
});
```

The viewBox is 760 wide, and node x/y are centres. Node kinds: `bad`, `ok`, `key`, `dim`. Edge kinds: `dash`, `bad`, `ok`, `key`, `both`. Zone kinds: `trust`, `dmz`, `untrust`. `dg` can be an array of diagrams.

## To do

### 0. Learning path: one long feed of cards (top priority)

**Problem.** The domain pages read as reference text: definitions without a reason to remember them. Quizzes test what you already know but don't teach it. What's missing is a guided path that builds understanding step by step.

**Goal.** About 1,200 short cards in **one continuous path**. You go through them one by one, from easy to complex. It is not a quiz, and it is not split into domains. Ideas come back later with a different example, so they stick without drilling. Duplicating the same knowledge from different angles is intended.

#### How the path is ordered

- **Easy → complex, across domains.** The path follows the order you'd naturally learn security, not the exam's domain list. For example: why security exists (assets, CIA, risk) → people and policies → data → identity and access → networks → systems and crypto → operations and incidents → software → continuity and recovery → governance and law at depth. Domain tags are kept only for filtering and progress.
- **Stages.** The path is split into about 12 stages of ~100 cards (e.g. "1. Why security exists", "2. People are part of the system"). Each stage opens with a story/overview card and ends with a short recap card.
- **Spiral repetition.** Every idea is introduced once, then **comes back 2–4 times** later in the path, each time in a new form: a different real case, a diagram, a comparison with something learned since, or a harder twist. Typical gaps are ~20 cards, then ~100, then a later stage. A comeback card says so ("Remember separation of duties? Here it is in a bank's payment system…"), so the link is visible.
- **Rhythm.** Card types are mixed so no two of the same kind come in a row. About 1 in 8 cards asks you to think (a situation with "what would you do?" and a tap to reveal the answer). These are part of the story, not a test, and there's no score.

#### Card kinds (a mix, not categories the user sees)

| Kind | What it does | Example (Personnel security) |
|---|---|---|
| `story` | A real incident told briefly: what happened, what was missing, what would have stopped it | Kerviel / Société Générale: no enforced vacation → hidden trades for years |
| `idea` | One concept in plain words, starting with the problem it solves | "Why disable the account *before* telling someone they're fired?" |
| `picture` | One diagram that carries the idea, plus 2–3 lines | Employee timeline: hire → work → leave, each control pinned to the threat it blocks |
| `vs` | Two or three easily confused things side by side, with a one-line rule to tell them apart | Job rotation vs mandatory vacation vs separation of duties |
| `think` | A short situation with "what would you do?" and the answer on tap, including why the obvious instinct is wrong | "Long-tenured AP clerk suspected of fraud. What reveals it?" → mandatory vacation |
| `link` | Cause → effect across topics; ties earlier cards together | Weak offboarding → orphaned account → breach → regulator → BCP |
| `recap` | End-of-stage summary: 5–7 one-liners, each linking back to its card | — |
| `back` | A comeback: an earlier idea in a new example or a harder setting | Separation of duties again, now inside a CI/CD pipeline (dev can't approve their own deploy) |

#### Data format

The path is files in order: `app/data/path/s01.js` … `s13.js`, one per stage, lazy-loaded with a `<script>` tag. Stage titles live in `app/data/path/index.js` (so the stage list shows without loading every stage); set `file` there when a stage gets cards, and `partial: true` while it has no recap yet.

```js
CISSP.stage(1, { cards: [
  { id: 's01-001', kind: 'story', k: ['d1-c8'], lvl: 1,
    title: { en, ru },
    body:  { en: `<p>…</p>`, ru },
    dg:    { …same format as xN.js… },                 // optional; required for `picture`
    reveal: { en, ru },                                 // `think` only: answer shown on tap
    take:  { en: 'One-line takeaway', ru },             // shown last
    back:  's01-004',                                   // `back` cards: which earlier card this revisits
    items: [['s01-002', { en, ru }], …] },               // `recap` only: 5–7 one-liners, each linking to a card
] });
```

`k` lists the concept ids (`d1-c8`…) so each card links to the full reference text, and progress can be shown per domain.

#### App work

- New view `#/path` as the main "Study" entry: one card per screen, swipe or arrow keys, and a stage progress bar. **It resumes where you left off** (position saved in `store`). There's a stage list to jump around, and a "⭐ keep" button to save a card for later.
- Optional light repetition: kept cards and the `back` cards you skipped can be shown again as a short "refresh" set (reusing the Leitner `INTERVALS` in `views.js`). It is never required to move forward.
- Each card has a "Read more →" link to its concept on the domain page. Each concept on a domain page gets a "▶ See it in the path" link.
- Quizzes, flashcards and exam simulation stay as separate tools for checking yourself; the path doesn't depend on them.
- `validate.js`: unique ids, valid `k`, EN+RU present, `picture` has `dg`, `think` has `reveal`, and `back` points to an earlier card. Every concept is introduced at least once and revisited at least twice, and no 3 cards of the same kind come in a row. Run `check-diagrams.js` on card diagrams too.

#### Content rules

- Original wording only: no copying from official practice tests, Sybex/OSG or paid question banks.
- Real cases: well-documented public incidents only (Kerviel, Target 2013, Equifax 2017, SolarWinds 2020, Capital One 2019, NotPetya, Colonial Pipeline…). Get the facts right, include the year, and skip details that are uncertain.
- The `think` answers follow the exam's priorities: people's safety first, then management's/business goals. Policy and process come before technology, and you assess before you act.
- Keep cards short: body ≤ 120 words, one idea per card. Depth comes from more cards, not longer ones.

#### Plan

1. ~~**Pilot:** stage 1 plus the start of stage 2 (~60 cards, including a few `back` cards), using all card kinds, plus the `#/path` view.~~ Done (61 cards). **Next: review it on desktop and on a phone before scaling.** Stage 1 has 45 cards rather than ~100; it can grow later, or stages can simply be shorter.
2. Finish stage 2 after `s02-016`: security awareness vs training vs education, social engineering (phishing, pretexting, tailgating), insider threat signs, and a recap; then drop `partial`.
3. Write the full stage outline (~12 stages: concepts introduced and planned comebacks) as `app/data/path/outline.md` before writing the remaining cards, so the spiral is planned rather than accidental.
4. Then one stage per batch (~100 cards), committing after each with `validate.js` + `check-diagrams.js` green.

### 1. Ideas

- Russian match patterns (`data/ru-match.js`) cover the basics glossary and ~100 domain terms. The remaining domain terms (mostly acronyms and names such as Bell-LaPadula) match in RU text already or rarely appear in Russian form.
- The flashcards view could offer a "concepts" deck built from the `plain` explanations.

### 2. Housekeeping

- Rebuild the Docker image after content changes:
  `docker build -t cissp-app . && docker rm -f cissp-app && docker run -d --name cissp-app -p 8765:80 cissp-app`
- Run `node tools/validate.js` and `node tools/check-diagrams.js` before each commit; they must end with `OK` and `layout OK`.
