# Learning path outline

The plan for all 13 stages: which concepts each stage introduces, and where each concept comes back.
Write a stage's cards from this plan, then update the plan if the stage turned out differently.

Rules (from `NEXT_STEPS.md`): every concept is introduced once and comes back at least twice, each time in a new form (another case, a diagram, a comparison with something learned since, a harder twist). Typical gaps: ~20 cards, then the next stage or two, then a late stage.

Stages are 35–90 cards. Shorter is fine: depth comes from comebacks, not from stage length.

## Stages

| # | Stage | Target cards | Introduces | Main comebacks | Anchor stories |
|---|---|---|---|---|---|
| 1 | Why security exists ✅ | 45 | d1-c1, d1-c9, d1-c11, d1-c2, d1-c3, d1-c6, d1-c4, d1-c10, d3-c1, d1-c13, d1-c7 (touch), d7-c6 (touch) | — | Target 2013, Stuxnet, Colonial Pipeline 2021, Equifax 2017, Capital One 2019 |
| 2 | People are part of the system ✅ | 35 | d1-c8, d7-c3, d1-c14, d5-c6, d8-c4, d6-c5, d7-c1, d7-c2, d7-c4, d7-c11, d8-c5 (touch), d5-c1 (touch) | d1-c11, d1-c13, d1-c3, d3-c1 | Société Générale 2008, Cisco 2018, Twitter 2020, Snowden 2013 |
| 3 | Data: what we protect ✅ | 40 | d2-c1, d2-c2, d2-c3, d2-c4, d2-c5, d2-c6, d2-c7 | d1-c1 (CIA per data state), d1-c4 (GDPR roles, residency), d1-c2 (owner accountability), d1-c9 (asset value), d7-c3 (need to know), d1-c11 (DLP as a control), d1-c13 (disposal by vendors) | Marriott/Starwood 2018, Morgan Stanley disposal (fined 2020/2022) |
| 4 | Who are you? Identity and access ✅ | 55 | d5-c1 (properly), d5-c2, d5-c3, d5-c4, d5-c5, d5-c7, d5-c8 | d5-c6 (JML), d7-c3 (least privilege), d2-c2 (owner approves access), d2-c1 (labels → MAC), d1-c14 (MFA fatigue), d1-c8 | Uber 2022 (MFA fatigue), Colonial Pipeline again (no MFA), 23andMe 2023, MGM Resorts 2023, OPM 2015 |
| 5 | How machines talk: networks ✅ | 69 | d4-c1, d4-c2, d4-c3, d4-c4, d4-c5, d4-c6, d4-c7, d4-c8, d4-c9 | d3-c1 (defense in depth, zero trust, air gap), d2-c3 (data in transit), d5-c7 (RADIUS/802.1X, TACACS+), d1-c13 (Target's flat network, vendor access, IoT), d1-c1 (availability), d1-c7 (DDoS and DNS dependency), d1-c14 (SPF/DKIM/DMARC), d7-c6, d7-c4, d1-c3, d1-c9 | Mirai/Dyn 2016, Target again (segmentation), GitHub 2018 (memcached), Kaminsky 2008, TJX 2007 (WEP), Stuxnet again (air gap) |
| 6 | Secrets and proof: cryptography ✅ | 70 | d3-c6, d3-c7, d3-c8, d3-c9, d3-c10, d3-c4 (TPM/HSM part) | d1-c1 (integrity, nonrepudiation, ransomware), d2-c3 (key next to the data), d2-c5 (crypto-shredding, BYOK/HYOK), d4-c5 (inside TLS, forward secrecy), d4-c9 (IKE, pre-shared keys), d5-c4 (Kerberoasting, replay), d5-c5 + d5-c7 (signed tokens), d5-c1 (passkeys, password rules), d1-c13 (DigiNotar, stolen signing keys), d7-c3 (split knowledge), d1-c9 | Enigma, Adobe 2013, Flame 2012, LinkedIn 2012, DigiNotar 2011, Heartbleed 2014, Stuxnet again (signed drivers) |
| 7 | Building secure systems ✅ | 68 | d3-c2, d3-c3, d3-c5, d3-c13, d1-c12, d3-c4 (TCB, rings, memory, virtualization) | d3-c1 (principles, fail-safe, zero trust PE/PA/PEP, privacy by design, SASE), d2-c1 (BLP, aggregation, polyinstantiation), d5-c3 (MAC, central PDP/PEP), d2-c6 (Select step), d1-c10 (RMF steps), d4-c4 + d4-c8 (Purdue, segmentation by design), d3-c9 (mTLS, secrets), d3-c10 (Spectre as a side channel), d1-c13 (kernel drivers, backdoors), d7-c11 (fail-safe doors), d2-c7 (EOS device), d2-c5 (retirement) | Spectre/Meltdown 2018, CrowdStrike 2024, Juniper ScreenOS 2015, Ukraine grid 2015, Capital One again (SSRF, over-broad role) |
| 8 | Buildings, power and people safety ✅ | 47 | d3-c11, d3-c12, d7-c9 (RAID as hardware redundancy) | d7-c11 (evacuation, duress, travel, fail-safe doors), d5-c8 (mantrap, badges, visitors, one log), d5-c2 (throughput, fallback), d1-c11 + d3-c1 (deter/delay/detect/respond, layers), d2-c5 (destruction room), d1-c1 (availability layers), d3-c5 (building systems as OT), d4-c7 (badge cloning, Wi-Fi past walls), d3-c10 (TEMPEST), d1-c7 (generator tests, offsite backups) | OVHcloud Strasbourg fire 2021, Hurricane Sandy 2012, ING Romania 2016, Target again (HVAC vendor) |
| 9 | Watching and testing ✅ | 69 | d6-c1, d6-c2, d6-c3, d6-c6, d6-c7, d7-c5, d6-c4 (touch: synthetic transactions) | d7-c2, d6-c5, d6-c4 (touch), d7-c6, d1-c6 (authorization to test), d1-c2 (due diligence), d1-c13 (SOC 2 of vendors), d3-c3, d3-c10, d4-c1, d4-c3, d4-c4, d4-c6 (port scans, Kaminsky disclosure), d4-c7, d2-c6, d1-c11, d1-c14 (phishing simulations), d5-c1 (impossible travel), d3-c8 + d3-c9 (log hashing, certificate inventory), d1-c10 (ISCM) | Equifax again (missed scan, expired inspection certificate), MOVEit 2023, Coalfire Iowa 2019, Kaminsky again (coordinated disclosure), Target again (ignored alerts) |
| 10 | When things go wrong: incidents ✅ | 70 | d1-c5, d8-c8 | d7-c4 (properly), d7-c1, d7-c2, d7-c5 (EDR response, sandbox), d6-c2, d1-c4 (breach notification clocks), d1-c14 (reporting a click), d2-c7 (legal hold, Windows XP EOS), d3-c8 (evidence hashes), d4-c2 (port 445), d4-c3 + d4-c6 (DDoS playbook), d4-c8 (containment, segments as firebreaks), d5-c4 (golden ticket, krbtgt reset), d1-c8, d1-c6 (no hacking back), d1-c9 (insurance), d1-c13, d1-c7 | WannaCry 2017 (NHS, kill switch), NotPetya 2017, Maersk, Colonial Pipeline again (the response), UBS PaineWebber 2002 (logic bomb), Merck (war exclusion) |
| 11 | Software that defends itself ✅ | 73 | d8-c1, d8-c2, d8-c3, d8-c6, d8-c7, d6-c4 (properly) | d8-c4, d8-c5, d8-c8, d1-c12, d1-c13 (SBOM), d7-c3 (SoD in pipeline), d7-c6, d3-c2 (Clark-Wilson), d3-c4, d3-c5, d3-c7 (code signing), d3-c8 (password storage), d3-c9, d3-c13, d4-c5, d5-c3, d5-c5, d6-c2, d6-c6, d2-c7 (EOS software) | SolarWinds 2020, Log4Shell 2021, xz utils 2024, Knight Capital 2012, Codecov 2021, Heartland 2008, dependency confusion 2021 |
| 12 | Staying in business: continuity and recovery | 80 | d7-c7, d7-c8, d7-c10, d1-c7 (properly) | d1-c9 (BIA ↔ risk), d1-c1 (availability), d7-c4, d7-c9, d7-c11 (people first), d2-c4 (archive), d3-c6 (backup encryption), d3-c11, d3-c12, d4-c9 | Maersk 2017 (one surviving domain controller), OVHcloud again |
| 13 | Governance, law and the manager's view | 90 | — (depth only) | d1-c2, d1-c3, d1-c4, d1-c5, d1-c6, d1-c7, d1-c8, d1-c9, d1-c10, d1-c12, d1-c13, d2-c2, d3-c3, d3-c13, d5-c6, d6-c1, d6-c3, d6-c5, d6-c6, d6-c7, d7-c1, d7-c7, d7-c8, d7-c10, d8-c1, d8-c2, d8-c3, d8-c6, d8-c7 | GDPR fines (British Airways 2020), Uber 2016 cover-up |

Total ≈ 850 cards. The ~1,200 goal in `NEXT_STEPS.md` can be reached later by growing stages, mostly with more `back` and `think` cards.

## Every concept: introduced → comebacks

Stage numbers; `✓` marks what already exists in the cards (`×N`: N cards in that stage). Generated from the cards for finished stages.

| Concept | Intro | Comebacks |
|---|---|---|
| d1-c1 CIA | 1 ✓ | 1 ✓×10, 3 ✓×2, 5 ✓, 6 ✓×5, 8 ✓×3, 10 ✓, 12 |
| d1-c2 Governance, due care/diligence | 1 ✓ | 1 ✓×6, 3 ✓, 9 ✓×3, 11 ✓, 13 |
| d1-c3 Policy hierarchy | 1 ✓ | 1 ✓×3, 2 ✓, 3 ✓, 5 ✓, 13 |
| d1-c4 Legal, privacy | 1 ✓ | 1 ✓, 2 ✓, 3 ✓×6, 4 ✓, 6 ✓, 7 ✓, 9 ✓, 10 ✓×6, 13 |
| d1-c5 Investigation types | 10 ✓ | 10 ✓×6, 13 |
| d1-c6 Code of Ethics | 1 ✓ | 1 ✓, 9 ✓×5, 10 ✓, 13 |
| d1-c7 BCP and BIA | 1 ✓ | 2 ✓, 5 ✓×2, 8 ✓×2, 9 ✓, 10 ✓×3, 12, 13 |
| d1-c8 Personnel security | 2 ✓ | 2 ✓×16, 4 ✓×2, 10 ✓×2, 13 |
| d1-c9 Risk | 1 ✓ | 1 ✓×18, 3 ✓×4, 5 ✓, 6 ✓, 8 ✓, 9 ✓×4, 10 ✓, 11 ✓, 12, 13 |
| d1-c10 RMF | 1 ✓ | 7 ✓×5, 9 ✓×2, 13 |
| d1-c11 Control types | 1 ✓ | 1 ✓×8, 2 ✓×3, 3 ✓×2, 8 ✓×4, 9 ✓×2 |
| d1-c12 Threat modeling | 7 ✓ | 7 ✓×6, 11 ✓, 13 |
| d1-c13 SCRM | 1 ✓ | 1 ✓, 2 ✓×2, 3 ✓×4, 5 ✓×3, 6 ✓×3, 7 ✓×3, 9 ✓×8, 10 ✓×4, 11 ✓×12, 13 |
| d1-c14 Awareness | 2 ✓ | 2 ✓×11, 4 ✓×6, 5 ✓, 9 ✓, 10 ✓×3 |
| d2-c1 Classification | 3 ✓ | 3 ✓×11, 4 ✓×3, 7 ✓×3, 11 ✓ |
| d2-c2 Data roles | 3 ✓ | 3 ✓×4, 4 ✓, 13 |
| d2-c3 Data states | 3 ✓ | 3 ✓×5, 5 ✓, 6 ✓×2, 8 ✓, 11 ✓ |
| d2-c4 Data lifecycle | 3 ✓ | 3 ✓, 8 ✓, 12 |
| d2-c5 Remanence, sanitization | 3 ✓ | 3 ✓×6, 6 ✓, 7 ✓, 8 ✓ |
| d2-c6 Scoping, tailoring, DLP | 3 ✓ | 3 ✓×6, 7 ✓, 9 ✓, 11 ✓ |
| d2-c7 Retention, EOL/EOS | 3 ✓ | 3 ✓×6, 7 ✓, 9 ✓, 10 ✓×3, 11 ✓ |
| d3-c1 Secure design principles | 1 ✓ | 1 ✓×2, 2 ✓, 4 ✓, 5 ✓×4, 7 ✓×13, 8 ✓×3 |
| d3-c2 Security models | 7 ✓ | 7 ✓×7, 11 ✓ |
| d3-c3 Evaluation, authorization | 7 ✓ | 7 ✓×8, 9 ✓, 13 |
| d3-c4 System capabilities (TPM, memory) | 6 ✓ | 6 ✓×3, 7 ✓×14, 11 ✓×2 |
| d3-c5 Architecture vulnerabilities | 7 ✓ | 7 ✓×19, 8 ✓, 11 ✓×4 |
| d3-c6 Symmetric crypto | 6 ✓ | 6 ✓×17, 12 |
| d3-c7 Asymmetric, signatures | 6 ✓ | 6 ✓×21, 11 ✓×2 |
| d3-c8 Hashing | 6 ✓ | 6 ✓×14, 9 ✓, 10 ✓, 11 ✓×2 |
| d3-c9 PKI | 6 ✓ | 6 ✓×17, 7 ✓×3, 9 ✓, 11 ✓×2 |
| d3-c10 Cryptanalytic attacks | 6 ✓ | 6 ✓×15, 7 ✓, 8 ✓, 9 ✓, 11 ✓ |
| d3-c11 Site design | 8 ✓ | 8 ✓×16, 12 |
| d3-c12 Fire, power, HVAC | 8 ✓ | 8 ✓×15, 12 |
| d3-c13 System lifecycle | 7 ✓ | 7 ✓×7, 11 ✓×2, 13 |
| d4-c1 OSI | 5 ✓ | 5 ✓×3, 9 ✓ |
| d4-c2 TCP/IP | 5 ✓ | 5 ✓×10, 10 ✓×2 |
| d4-c3 Handshake, SYN flood | 5 ✓ | 5 ✓, 9 ✓, 10 ✓ |
| d4-c4 Devices, firewalls | 5 ✓ | 5 ✓×15, 7 ✓×3, 9 ✓×2, 10 ✓ |
| d4-c5 TLS, IPsec, SSH, DNSSEC | 5 ✓ | 5 ✓×10, 6 ✓×4, 7 ✓, 11 ✓ |
| d4-c6 Network attacks | 5 ✓ | 5 ✓×13, 9 ✓×2, 10 ✓ |
| d4-c7 Wireless | 5 ✓ | 5 ✓×11, 8 ✓, 9 ✓ |
| d4-c8 Segmentation, SDN | 5 ✓ | 5 ✓×12, 7 ✓×5, 8 ✓, 10 ✓×5 |
| d4-c9 Remote access | 5 ✓ | 5 ✓×12, 6 ✓, 12 |
| d5-c1 IAAA, factors | 2 ✓ | 2 ✓, 4 ✓×21, 5 ✓, 6 ✓×3, 9 ✓, 10 ✓ |
| d5-c2 Biometrics | 4 ✓ | 4 ✓×5, 8 ✓ |
| d5-c3 Authorization models | 4 ✓ | 4 ✓×8, 7 ✓×3, 11 ✓×2 |
| d5-c4 Kerberos | 4 ✓ | 4 ✓×3, 6 ✓×2, 10 ✓×3 |
| d5-c5 Federation | 4 ✓ | 4 ✓×4, 6 ✓, 11 ✓ |
| d5-c6 Provisioning lifecycle | 2 ✓ | 2 ✓×4, 4 ✓×11, 9 ✓, 13 |
| d5-c7 SSO, auth systems | 4 ✓ | 4 ✓×6, 5 ✓×5, 6 ✓ |
| d5-c8 Physical and logical access | 4 ✓ | 4 ✓×4, 8 ✓×7 |
| d6-c1 Assessments, audits | 9 ✓ | 9 ✓×6, 13 |
| d6-c2 Vulnerability assessment | 9 ✓ | 9 ✓×14, 10 ✓, 11 ✓×2 |
| d6-c3 Pentesting | 9 ✓ | 9 ✓×10, 11 ✓, 13 |
| d6-c4 Software testing | 9 ✓ | 11 ✓×11 |
| d6-c5 Process data, KPI/KRI | 2 ✓ | 2 ✓, 9 ✓×9, 13 |
| d6-c6 Reporting, disclosure | 9 ✓ | 9 ✓×7, 11 ✓×3, 13 |
| d6-c7 Audits, SOC reports | 9 ✓ | 9 ✓×10, 13 |
| d7-c1 Evidence | 2 ✓ | 10 ✓×16, 13 |
| d7-c2 Logging, monitoring | 2 ✓ | 4 ✓×3, 8 ✓, 9 ✓×15, 10 ✓×5, 11 ✓×2 |
| d7-c3 Foundational ops (SoD, least privilege) | 2 ✓ | 2 ✓×11, 3 ✓×2, 4 ✓×5, 6 ✓, 7 ✓×3, 11 ✓×3 |
| d7-c4 Incident management | 2 ✓ | 2 ✓×2, 5 ✓, 10 ✓×43, 11 ✓, 12 |
| d7-c5 Detective/preventive (IDS, sandbox) | 9 ✓ | 9 ✓×9, 10 ✓×4 |
| d7-c6 Patch, change | 1 ✓ | 5 ✓, 7 ✓, 9 ✓×4, 10 ✓×2, 11 ✓×3 |
| d7-c7 Backups | 12 | 12, 13 |
| d7-c8 Recovery sites | 12 | 12, 13 |
| d7-c9 RAID | 8 ✓ | 8 ✓×6, 12, 12 |
| d7-c10 DR process, plan tests | 12 | 12, 13 |
| d7-c11 Physical ops, personnel safety | 2 ✓ | 4 ✓, 7 ✓×2, 8 ✓×10, 12 |
| d8-c1 SDLC | 11 ✓ | 11 ✓×8, 13 |
| d8-c2 Methodologies | 11 ✓ | 11 ✓×3, 13 |
| d8-c3 Maturity models | 11 ✓ | 11 ✓×2, 13, 13 |
| d8-c4 Dev ecosystem | 2 ✓ | 11 ✓×17 |
| d8-c5 Secure coding | 2 ✓ | 11 ✓×19 |
| d8-c6 Databases | 11 ✓ | 11 ✓×7, 13 |
| d8-c7 Acquired software | 11 ✓ | 11 ✓×11, 13 |
| d8-c8 Malware | 10 ✓ | 10 ✓×21, 11 ✓×2 |

## Stage 3 detail: Data, what we protect

Arc: you can't protect what you don't know you have → who owns it → how sensitive it is → where it lives and moves → what it goes through in its life → how to make it unreadable when it must leave → how to get rid of it.

1. Marriott/Starwood story (unknown inherited database) → inventory, owner, classification
2. Classification levels, government vs commercial, labels, who decides (owner, not IT)
3. Data roles: owner, custodian, steward, user; GDPR controller, processor, subject (comeback d1-c4)
4. Three states (at rest, in transit, in use) with CIA per state (comeback d1-c1), picture
5. Lifecycle: create → store → use → share → archive → destroy, picture
6. Baselines, scoping, tailoring; DLP, CASB, DRM; tokenization, masking, pseudonymization vs anonymization
7. Retention and legal hold, EOL vs EOS, data residency
8. Remanence: Morgan Stanley's unwiped drives, clear/purge/destroy, SSDs and degaussing, crypto-shredding
9. Recap
