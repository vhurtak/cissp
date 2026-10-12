# CISSP Preparation

A personal study repo for the ISC2 CISSP exam. It includes an **offline, interactive study app** with the
8 domains, diagrams, flashcards, quizzes and an adaptive (CAT) exam simulator.

The study approach is based on
[“How I passed CISSP” (Habr, Gazinformservice, 2018)](https://habr.com/ru/companies/gaz-is/articles/415085/),
with the exam details updated to the current ISC2 outline.

## Run the app

No install or build step is needed. Open `app/index.html` in a browser, or serve it locally so that
the SHA-256 hashing demo can use WebCrypto:

```bash
python3 -m http.server 8765 --directory app
```

Then open http://localhost:8765. Progress is stored in the browser (localStorage). The dashboard can
export and import it as a JSON file.

### What's inside

| Section | What it does |
|---|---|
| **Dashboard** | Exam countdown, coverage, weighted accuracy, domain-weight donut, accuracy per domain vs. a 75% target, simulation score history, current exam facts |
| **Study plan** | 12-week plan (≈3 months, as in the article) mapped to Official Study Guide chapters, with checkboxes |
| **Domains** | For each domain: a concept map, the official objectives, key concepts (EN with RU on demand), interactive widgets and a glossary |
| **Flashcards** | 250+ terms with Russian translations, using Leitner spaced repetition (keys: Space, 1–4) |
| **Quizzes** | 300+ exam-style questions (multiple choice plus drag-and-drop style ordering and matching), each with an explanation in EN and RU |
| **Exam simulator** | Full CAT (100–150 items, 3 h, 25 unscored pretest items, no going back, adaptive stop rule), Mini CAT (25–50 items, 1 h) and Linear 125. Reports a scaled score estimate and domain proficiency, and lets you review every item |
| **Exam strategy** | "Think like a manager", question qualifiers, CAT tactics, exam-day checklist |
| **Resources** | Official ISC2 links, books, videos, NIST/OWASP references, community |

Interactive widgets include:

- risk calculator (SLE/ALE/safeguard value)
- control-type classification game
- Bell-LaPadula/Biba simulator
- symmetric vs. asymmetric key counts
- Caesar/Vigenère ciphers
- SHA-256 avalanche demo
- FAR/FRR/CER biometric chart
- backup restore simulator
- cloud shared-responsibility matrix
- OSI layers
- RMF, BCP, incident response, Kerberos, SDLC and pentest flows
- DR test types, RAID, recovery sites, and more

**Language:** content is in English, matching the exam language. The **EN/RU** toggle in the header switches
the UI and concept text to Russian. In English mode, every concept, explanation and flashcard also has a 🇷🇺 button.

## Current exam facts (verified October 2026)

| | |
|---|---|
| Outline | ISC2 CISSP Exam Outline, effective **April 15, 2024** (no newer outline announced) |
| Format | **CAT** in all languages: **100–150 items, 3 hours** (includes 25 unscored pretest items) |
| Item types | Multiple choice and advanced (drag-and-drop, hotspot) |
| Passing score | **700 / 1000** |
| Languages | English, Chinese, German, Japanese, Spanish |
| Delivery / fee | Pearson VUE, **$749** USD |
| Experience | 5 years paid in 2+ domains. A degree or approved credential waives 1 year. Without experience: Associate of ISC2 |
| After passing | Endorsement within 9 months, ISC2 Code of Ethics, 120 CPE per 3 years, annual fee |

| # | Domain | Weight |
|---|---|---|
| 1 | Security and Risk Management | 16% |
| 2 | Asset Security | 10% |
| 3 | Security Architecture and Engineering | 13% |
| 4 | Communication and Network Security | 13% |
| 5 | Identity and Access Management | 13% |
| 6 | Security Assessment and Testing | 12% |
| 7 | Security Operations | 13% |
| 8 | Software Development Security | 10% |

**What changed since the 2018 article:**

- The exam went from 250 linear questions in 6 hours to CAT with 100–150 questions in 3 hours.
- The fee rose from $699 to $749.
- "(ISC)²" was rebranded as "ISC2".
- The 2021 and 2024 outlines added zero trust, SASE, supply chain risk, threat modeling, DevSecOps and cloud topics.

The article's method still applies: about 3 months of study, the Official Study Guide, *Eleventh Hour CISSP*
for the final review, and a focus on ISC2 terminology and "best answer" thinking.

Source: [ISC2 CISSP Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline).

## About the simulator's scoring

The simulator uses a simplified Rasch/IRT model with EAP ability estimation, content balancing by domain weight,
the ISC2 stop rules (95% confidence after the minimum length, or the maximum length) and the time-out rule
(the last 75 estimates must be above the standard). It approximates the real exam: it is not ISC2's algorithm,
and the items are not calibrated on real candidates. The bank holds about 300 questions, so after a few runs you
will see repeats, which inflates the score. Aim for consistent passes at 750 or above, and use other
legitimate question banks too (for example, the Official Practice Tests).

## Repo layout

```
app/                 the study app (static HTML/CSS/JS, no dependencies)
  data/meta.js       exam facts, 12-week plan, strategy, resources
  data/d1.js … d8.js domain content: concepts, widgets, glossary, questions
  js/cat.js          CAT engine (also importable in Node)
domains/             your own free-form notes per domain
practice/scores.md   manual log for external practice tests
tools/validate.js    validates the question bank and simulates CAT outcomes
```

### Adding questions

Append to the `questions` array of the matching `app/data/dN.js`. Don't reorder existing questions:
their IDs come from their position and are used to store your progress.

```js
{ o: '3.6', d: 2, q: 'Question?', a: ['correct', 'wrong', 'wrong', 'wrong'], c: 0, e: 'Explanation', r: 'Объяснение' }
```

Answer options are shuffled when shown, so `c` can stay `0`. Set `d` to 1, 2 or 3 for easy, medium or hard.
Ordering and matching items use `t: 'order', items: [...]` and `t: 'match', pairs: [[left, right], ...]`.
Run `node tools/validate.js` afterwards.
