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
- `tools/serve.js`: dependency-free static server (`node tools/serve.js 8766`), used by the `cissp-dev` entry in `.claude/launch.json`.

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

### 1. Polish

- Edges can still cross unrelated boxes (the checker only tests labels and nodes). Worth a look when adding diagrams.
- Glossary underlines can be dense on network-heavy cards (~120 on D4). Consider dropping very common basics terms (Network, Risk, Server, Client, Log) from auto-linking, or linking only once per page instead of once per card.
- Russian text: auto-linking matches only English terms. Add Russian match aliases (e.g. stems like `шифрован`) if RU mode needs pop-overs too.
- The flashcards view could include basics glossary terms as an optional "IT basics" deck.
- Mobile: diagrams scroll horizontally (min-width 620px). Check readability on a 375px screen.

### 2. Housekeeping

- Rebuild the Docker image after content changes:
  `docker build -t cissp-app . && docker rm -f cissp-app && docker run -d --name cissp-app -p 8765:80 cissp-app`
- Run `node tools/validate.js` and `node tools/check-diagrams.js` before each commit; they must end with `OK` and `layout OK`.
