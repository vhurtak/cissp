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
- Stage 2 finished (`s02.js`, 35 cards, recap at `s02-035`, no longer `partial`): social engineering (Twitter 2020, the levers, phishing variants, pretexting/tailgating, BEC), a phishing-chain diagram, awareness vs training vs education, measuring awareness, insider threat signs and types (Snowden 2013), AUP/NDA, role-based training, and a blame-free reporting culture. Path total: 80 cards, 24/77 concepts introduced.
- Stage outline: `app/data/path/outline.md` plans all 13 stages (target cards, concepts introduced, comebacks, anchor stories) and lists every concept's intro stage and comeback stages.
- Stage 3 (`s03.js`, 40 cards): inventory and classification (Marriott/Starwood 2018), data roles and GDPR controller/processor, aggregation, three data states, the lifecycle, baselines with scoping and tailoring, DLP/DRM/CASB, pseudonymization vs anonymization (AOL 2006), retention and legal hold, data sovereignty, EOL vs EOS, remanence and clear/purge/destroy (Morgan Stanley), crypto-shredding. Path total: 120 cards, 31/77 concepts introduced.
- Stage 4 (`s04.js`, 55 cards): IAAA and factor types, real MFA vs two knowledge factors, NIST password guidance, credential stuffing (23andMe 2023) and other password attacks, Colonial Pipeline again (no MFA, dormant account), MFA fatigue (Uber 2022) and the MFA strength ladder, passkeys, help-desk resets (MGM 2023) and identity proofing, biometrics with FAR/FRR/CER (OPM 2015), DAC/MAC/RBAC/rule/ABAC/risk-based, directories and SSO, Kerberos, federation (SAML/OAuth/OIDC, consent phishing), automated JML, privilege creep and access reviews, PAM, service accounts, physical plus logical access, sessions, identity as the perimeter. 6 diagrams, 7 think cards, 7 back cards. Path total: 175 cards, 37/77 concepts introduced.
- Stage 5 (`s05.js`, 69 cards): packets and addresses, OSI vs TCP/IP, NAT and private ranges, cleartext ports and their secure replacements, TCP vs UDP, the handshake and SYN flood, DoS/DDoS and amplification (Mirai/Dyn 2016, GitHub 2018), ARP poisoning and switch attacks, DNS poisoning (Kaminsky 2008) and DNSSEC vs DoH, firewall rules and types, DMZ and bastion hosts, IDS vs IPS, Target again (segmentation), VLANs, IoT segments, micro-segmentation and SDN, the air gap (Stuxnet again), converged protocols and media, TLS and IPsec (AH/ESP, transport/tunnel), management traffic, SPF/DKIM/DMARC, Wi-Fi (TJX 2007, WEP→WPA3, 802.1X, EAP methods, evil twin), Bluetooth/RFID, NAC, VPNs and split tunnelling, third-party access, PAP/CHAP/EAP, RADIUS vs TACACS+ vs Diameter, voice and meetings, classic DoS attacks, IPv6, egress filtering, endpoints. 8 diagrams, 9 think cards, 10 back cards. Path total: 244 cards, 46/77 concepts introduced.
- Stage 6 (`s06.js`, 70 cards): Enigma, what crypto can and can't do, Kerckhoffs, encoding vs encryption vs hashing, symmetric and the n(n−1)/2 key problem, DES/3DES/AES, key length and work factor, ECB vs CBC/CTR/GCM (Adobe 2013), stream ciphers, asymmetric key pairs (encrypt vs sign), RSA/ECC/DH, hybrid crypto and TLS 1.3 again, forward secrecy, hashing and the avalanche effect, MD5/SHA-1 vs SHA-2/3 (Flame 2012), the birthday attack, hash vs HMAC vs signature, nonrepudiation and key custody, password storage (LinkedIn 2012, salt, Argon2/bcrypt) and cracking methods, certificates and the chain of trust, CRL/OCSP/stapling, DigiNotar 2011 and Certificate Transparency, Heartbleed 2014 and its clean-up order, implementation and side-channel attacks, attack models, key lifecycle, TPM/HSM/enclave and measured boot, BYOK/HYOK crypto-shredding, split knowledge and M of N, key escrow vs recovery, Kerberoasting, replay, signed SAML/OIDC tokens, passkeys, IPsec IKE, S/MIME vs PGP, Stuxnet's stolen signing keys, ransomware, post-quantum (FIPS 203/204/205). 7 diagrams, 7 think cards, 11 back cards. Path total: 314 cards, 52/77 concepts introduced.
- Stage 7 (`s07.js`, 68 cards): Spectre/Meltdown 2018, built in vs bolted on, threat modeling (four questions, data flow diagram with trust boundaries, STRIDE, PASTA/DREAD/VAST/Trike/attack trees/ATT&CK), design principles (secure defaults, keep it simple, fail-secure vs fail-safe, zero trust PE/PA/PEP, privacy by design, SASE, trust-but-verify vs zero trust vs defense in depth), security models (state machine, Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash, Graham-Denning/HRU/Take-Grant), TCB and the reference monitor, protection rings (CrowdStrike 2024), memory protection, root of trust and secure/measured boot, hypervisors, VMs vs containers vs serverless, covert channels, TOCTOU, backdoors (Juniper ScreenOS 2015), aggregation/inference and polyinstantiation, ICS/OT (Ukraine grid 2015, Purdue model), IoT, IaaS/PaaS/SaaS and shared responsibility, Capital One again (SSRF, over-broad role), cloud deployment models, microservices and secrets, mTLS, edge/fog/HPC/mobile, Common Criteria (PP/ST/TOE, EAL1–7), TCSEC/ITSEC, certification vs accreditation, the RMF steps, the system lifecycle, unpatchable legacy devices, decommissioning. 7 diagrams, 10 think cards, 13 back cards. Path total: 382 cards, 57/77 concepts introduced.
- Stage 8 (`s08.js`, 47 cards): OVHcloud Strasbourg fire 2021, physical threat families, site selection, Hurricane Sandy 2012 (fuel pumps in the basement), the server room's placement, rings from fence to encrypted disk, CPTED, deter/delay/detect/respond, fences and lighting, guard vs camera, mantraps, locks and badges, biometrics at real doors, visitors and escorts, intrusion sensors, badge logs in the SIEM, the fire tetrahedron and detectors, fire classes, wet/dry/pre-action/deluge, gas suppression (CO₂ deadly, halon banned), ING Romania 2016 (gas test noise broke disks), fail-safe doors and the pulled fire alarm, power problem names, the power path (grid/ATS/generator/UPS), UPS vs generator vs conditioner, generator testing, HVAC, same-campus backups, RAID 0/1/5/6/10 and RAID ≠ backup, N+1/2N redundancy, availability layers, evacuation, duress, witnessed destruction, travel, building systems as OT (Target's HVAC vendor), badge cloning and Wi-Fi past walls, TEMPEST. 4 diagrams, 7 think cards, 8 back cards. Path total: 429 cards, 60/77 concepts introduced.
- Stage 9 (`s09.js`, 69 cards): Equifax again (the scan that missed the portal, the inspection device blinded by an expired certificate), test vs assessment vs audit, internal/external/third-party, a risk-based test strategy, vulnerability scanning (credentialed vs not, false positives vs negatives, port states via the handshake, CVE/CVSS/SCAP, the vulnerability management loop, prioritizing by risk and KEV), MOVEit 2023 (a zero-day no scanner knew), scan vs assessment vs pentest, pentest authorization and rules of engagement (Coalfire Iowa 2019), staying in scope, black/grey/white box, NIST SP 800-115 phases, red/blue/purple/white teams, BAS, phishing and wireless assessments, reports and retests, exceptions, coordinated disclosure (Kaminsky again), audits, SOC 1/2/3 and Type I/II, carve-outs and CUECs, ISO 27001 vs SOC 2, evaluation vs authorization vs audit, Target again (ignored FireEye alerts), logging, the SIEM pipeline, SIEM/SOAR/UEBA, alert fatigue, clipping levels and sampling, correlation, log integrity, threat intel vs hunting, anti-malware and EDR, allow vs deny lists, sandboxing, honeypots and entrapment, IDS/IPS placement, MSSP/MDR, KPI/KRI, process evidence and test restores, egress monitoring, ISCM, synthetic transactions vs RUM, crypto configuration scans, sensors per OSI layer. 4 diagrams, 11 think cards, 15 back cards. Path total: 498 cards, 67/77 concepts introduced.
- Stage 10 (`s10.js`, 70 cards): WannaCry 2017 (NHS, port 445 and EternalBlue, the kill switch, Windows XP past end of support), event vs incident vs breach, the plan and the CSIRT, the NIST SP 800-61 lifecycle vs the seven ISC2 steps, preparation and the jump bag, NotPetya 2017 (M.E.Doc update, a wiper disguised as ransomware, credential theft in flat networks), Maersk, virus/worm/trojan and other malware types, triage, isolate-don't-power-off, containment, segments as firebreaks, containment vs eradication vs recovery, double extortion and RaaS, whether to pay, Colonial Pipeline again (the response), UBS PaineWebber 2002 (logic bomb), living off the land, golden ticket and krbtgt reset, rebuild vs clean, sandboxing a sample, APTs, EDR response, reporting and notification clocks (GDPR, NIS2, SEC), the press, blameless lessons learned, investigation types and standards of proof, admissible evidence and evidence rules, chain of custody, the forensic process, hashing images, order of volatility, legal hold, eDiscovery (EDRM), enticement vs entrapment, Locard and MOM, law enforcement, attribution, hacking back, cyber insurance and the war exclusion (Merck), DDoS playbook, playbooks and SOAR, team models, a reported phishing click, cloud incidents and a leaked access key, tabletop exercises, IoC vs IoA. 4 diagrams, 11 think cards, 16 back cards. Path total: 568 cards, 69/77 concepts introduced.
- Stage 11 (`s11.js`, 73 cards): SolarWinds 2020 (the build server, the signed backdoor), shift left and the SDLC with security per phase, use vs misuse cases, threat modeling at design time, a late pentest, IPT and security champions, waterfall/V-model/spiral, agile and the definition of done, prototyping/RAD/JAD/cleanroom, DevOps and DevSecOps, SoD as pipeline settings, a pipeline with security gates, Knight Capital 2012 and change management for code, emergency changes, separate environments and no real data in test, the development ecosystem as supply chain, Codecov 2021 and secrets management, provenance/SLSA/reproducible builds, code signing proves origin not safety, compiled/interpreted/managed, SAST/DAST/IAST/RASP, SCA and SBOM, Log4Shell 2021 and transitive dependencies, fuzzing, unit to regression tests, code review and Fagan, positive/negative/boundary testing, interface testing, tester independence, input validation, Heartland 2008 and SQL injection, MOVEit again, XSS vs CSRF, buffer overflows and memory safety, Heartbleed again, other weaknesses (Ariane 5), errors and logs, password storage for developers, OWASP Top 10/CWE/ASVS, a debug backdoor, API security and BOLA, server-side authorization, OAuth tokens, ACID, keys and integrity, views and polyinstantiation, a race condition, warehouses and NoSQL, xz utils 2024, open-source responsibility, COTS/open source/custom/SaaS, dependency confusion 2021, vetting a library, contracts and escrow, component end of support, CMMI, SAMM vs BSIMM, IDEAL, Clark-Wilson in code, being the vendor in disclosure, IaC and drift, certificate validation, AI coding assistants, three poisoned supply chains. 4 diagrams, 9 think cards, 16 back cards. Path total: 641 cards, 74/77 concepts introduced.
- Stage 12 (`s12.js`, 63 cards): Maersk's domain controller saved by a power cut in Ghana, replication is not backup, BCP vs DRP and the other plans (IRP, COOP, crisis comms, OEP), management sponsorship and the BCP team, the BIA, the recovery timeline (RPO, RTO, WRT, MTD) and numbers that don't add up, BIA vs risk assessment, dependencies, CrowdStrike/Delta and recovery dependencies (BitLocker keys), MTBF vs MTTR, prevent/tolerate/recover, cold/warm/hot/mirror sites, mobile/reciprocal/cloud DR, site per MTD, recovery-site distance (OVHcloud again), high availability, the resilience stack from RAID to offline copies, cloud zones and regions, Code Spaces 2014, full/incremental/differential and restore sets, 3-2-1-1-0 and immutable backups, ransomware going after backups, snapshot/replica/backup/archive, backups and retention, vaulting/journaling/shadowing, GFS rotation, backup encryption keys, GitLab 2017, proving restores, Thailand floods 2011 and supplier continuity, Rescorla's drills, key-person risk and succession, COVID-19 and VPN capacity, a DR plan locked inside the disaster, plan contents, the DR process, recovery vs salvage teams, returning least critical first, declaration criteria, choosing a clean restore point, plan tests (read-through to full interruption), maintenance, Cantor Fitzgerald, crisis communications, generator fuel, recovery order (network, identity, DNS, keys first), ISO 22301 and NIST SP 800-34, insurance vs recovery, Maersk replayed, the CFO's question. 4 diagrams, 10 think cards, 13 back cards. Path total: 704 cards, 77/77 concepts introduced.

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
2. ~~Finish stage 2~~ Done (35 cards).
3. ~~Write the full stage outline~~ Done: `app/data/path/outline.md`.
4. One stage per batch, following the outline, committing after each with `validate.js` + `check-diagrams.js` green. Stages 3–12 done; **next: stage 13 (governance, law and the manager's view)**. Update the outline when a stage turns out differently.

### 1. Ideas

- Russian match patterns (`data/ru-match.js`) cover the basics glossary and ~100 domain terms. The remaining domain terms (mostly acronyms and names such as Bell-LaPadula) match in RU text already or rarely appear in Russian form.
- The flashcards view could offer a "concepts" deck built from the `plain` explanations.

### 2. Housekeeping

- Rebuild the Docker image after content changes:
  `docker build -t cissp-app . && docker rm -f cissp-app && docker run -d --name cissp-app -p 8765:80 cissp-app`
- Run `node tools/validate.js` and `node tools/check-diagrams.js` before each commit; they must end with `OK` and `layout OK`.
