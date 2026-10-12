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

## To do

### 1. Write `app/data/x1.js` … `x8.js` (main remaining work, currently 0/77 concepts explained)

Add each file to `app/index.html` after `data/basics.js`. The validator picks the files up automatically. Format:

```js
'use strict';
CISSP.explain(1, {
  'd1-c1': {
    plain: { en: `<p>…analogy, 2–4 sentences…</p>`, ru: `<p>…</p>` },
    ex:    { en: `<p>…concrete scenario: who, what happened, which control helped…</p>`, ru: `<p>…</p>` },
    dg:    { title: { en, ru }, h: 280, zones: [[x, y, w, h, label, kind]],
             nodes: [[id, x, y, label, sub, icon, kind, width]], edges: [[from, to, label, kind]], note: { en, ru } },
  },
});
```

The viewBox is 760 wide, and node x/y are centres. Node kinds: `bad`, `ok`, `key`, `dim`. Edge kinds: `dash`, `bad`, `ok`, `key`, `both`. Zone kinds: `trust`, `dmz`, `untrust`. See `basics.js` for working examples. Concept keys are listed with `node tools/validate.js` (or in order of `concepts` in `dN.js`).

Planned diagrams (the rest get `plain` and `ex` only):

- **D1**
  - governance hierarchy (board → CEO → CISO → managers; auditors)
  - BCP timeline (last backup → disaster → RTO → MTD, with RPO)
  - risk treatment (asset + threat + vulnerability → risk → mitigate/transfer/avoid/accept)
  - threat-model DFD with trust boundaries and STRIDE
  - supply chain compromise (SolarWinds-style update)
- **D2**
  - data states (at rest / in transit / in use) across laptop → network → cloud
  - DLP / CASB placement
- **D3**
  - reference monitor / TCB
  - Bell-LaPadula vs Biba (read/write arrows)
  - hybrid encryption (TLS key exchange)
  - PKI chain (root → intermediate → leaf, CRL/OCSP)
  - TPM/HSM
  - cloud shared responsibility
  - facility layers (perimeter → building → server room)
- **D4**
  - OSI with devices per layer
  - firewall/DMZ (screened subnet)
  - IPsec tunnel vs transport
  - VPN site-to-site vs remote access
  - Wi-Fi enterprise (802.1X: supplicant → authenticator → RADIUS)
  - SDN control/data plane
  - micro-segmentation
- **D5**
  - Kerberos (client, AS, TGS, service)
  - SAML (user, SP, IdP)
  - OAuth / OIDC (client, authorization server, resource server)
  - joiner/mover/leaver with HR → IdP → apps (SCIM)
  - PAM vault with just-in-time access
- **D6**
  - where SAST, DAST, SCA and fuzzing sit in the pipeline
  - pentest vs vulnerability scan scope
  - log → SIEM → KPI/KRI dashboard
- **D7**
  - incident-response flow with SOC/SIEM/SOAR
  - chain of custody
  - backup types (full / incremental / differential) over a week
  - hot/warm/cold sites
  - RAID 1/5/10
  - change management (request → CAB → implement → review)
- **D8**
  - SDLC with security activities per phase
  - CI/CD with security gates
  - SQL injection vs parameterized query
  - XSS / CSRF request flows
  - database view and access control

Write for a non-specialist: define every acronym on first use, use one analogy from everyday life, and give one named or realistic incident.
Keep the facts in line with the ISC2 April 2024 outline (see memory note: use current exam facts).

### 2. Polish

- Diagram labels sometimes overlap a line or another label (e.g. "VPN tunnel" in Basics §3). Consider supporting an optional label offset per edge (`[from, to, label, kind, dx, dy]`).
- Glossary underlines can be dense on network-heavy cards (~120 on D4). Consider dropping very common basics terms (Network, Risk, Server, Client, Log) from auto-linking, or linking only once per page instead of once per card.
- Russian text: auto-linking matches only English terms. Add Russian match aliases (e.g. stems like `шифрован`) if RU mode needs pop-overs too.
- The flashcards view could include basics glossary terms as an optional "IT basics" deck.
- Mobile: diagrams scroll horizontally (min-width 620px). Check readability on a 375px screen.

### 3. Housekeeping

- Rebuild the Docker image after content changes:
  `docker build -t cissp-app . && docker rm -f cissp-app && docker run -d --name cissp-app -p 8765:80 cissp-app`
- Run `node tools/validate.js` before each commit; it must end with `OK`.
- Not yet committed: `Dockerfile`, `.dockerignore`, the beginner layer (`learn.js`, `basics.js`, CSS, view changes) and this file.
