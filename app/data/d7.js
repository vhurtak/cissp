'use strict';
CISSP.domain({
  id: 7, weight: 13,
  title: { en: 'Security Operations', ru: 'Операционная безопасность' },
  summary: {
    en: 'Investigations and digital forensics, logging and monitoring, configuration and change management, incident management, detective/preventive tools, patching, backups and recovery sites, disaster recovery and its testing, physical security and personnel safety.',
    ru: 'Расследования и криминалистика, журналирование и мониторинг, управление конфигурациями и изменениями, управление инцидентами, средства обнаружения и предотвращения, патчи, бэкапы и резервные площадки, аварийное восстановление и его тестирование, физическая безопасность и безопасность персонала.',
  },
  objectives: [
    ['7.1', 'Understand and comply with investigations (evidence, forensics, reporting, techniques, artifacts)'],
    ['7.2', 'Conduct logging and monitoring activities (IDS/IPS, SIEM, SOAR, continuous monitoring, egress, threat intel, UEBA)'],
    ['7.3', 'Perform Configuration Management (provisioning, baselining, automation)'],
    ['7.4', 'Apply foundational security operations concepts (need-to-know/least privilege, SoD, PAM, job rotation, SLAs)'],
    ['7.5', 'Apply resource protection (media management, media protection techniques, data at rest/in transit)'],
    ['7.6', 'Conduct incident management (detection, response, mitigation, reporting, recovery, remediation, lessons learned)'],
    ['7.7', 'Operate and maintain detection and preventative measures (firewalls, IDS/IPS, allow/deny lists, sandboxing, honeypots, anti-malware, ML/AI tools)'],
    ['7.8', 'Implement and support patch and vulnerability management'],
    ['7.9', 'Understand and participate in change management processes'],
    ['7.10', 'Implement recovery strategies (backup storage, recovery sites, multiple processing sites, resiliency, HA, QoS, fault tolerance)'],
    ['7.11', 'Implement Disaster Recovery (DR) processes'],
    ['7.12', 'Test Disaster Recovery Plans (read-through/tabletop, walkthrough, simulation, parallel, full interruption, communications)'],
    ['7.13', 'Participate in Business Continuity (BC) planning and exercises'],
    ['7.14', 'Implement and manage physical security (perimeter, internal)'],
    ['7.15', 'Address personnel safety and security concerns (travel, training, emergency management, duress)'],
  ],
  concepts: [
    {
      t: { en: 'Evidence and investigations', ru: 'Доказательства и расследования' },
      b: {
        en: `<p>Evidence must be <b>admissible</b>: <b>relevant</b> (relates to the case), <b>material</b> (matters to the case), and <b>competent</b> (legally obtained and reliable). It is also expected to be authentic, accurate, complete and convincing.</p>
<ul><li><b>Types</b>: <b>real</b> (physical objects), <b>documentary</b> (written, including logs and code), <b>testimonial</b> (witness statements). Under the <b>best evidence rule</b> the original document is preferred over copies. The <b>parol evidence rule</b>: a written agreement is assumed to be the whole agreement. <b>Hearsay</b> (second-hand) is generally inadmissible, though business records made in the normal course of business may be an exception.</li>
<li><b>Chain of custody</b>: documents who collected, handled, transferred and stored the evidence, and when, proving it wasn't tampered with.</li>
<li><b>Forensic process</b>: identify → preserve (<b>write blockers</b>, bit-for-bit image, <b>hash</b> the original and the image) → collect → examine/analyze (always on a <b>copy</b>) → present. Follow the <b>order of volatility</b>.</li>
<li><b>Locard's exchange principle</b>: every contact leaves a trace. <b>MOM</b>: Motive, Opportunity, Means.</li>
<li><b>Enticement</b> (luring someone who already intends to commit an act, e.g. a honeypot) is legal and ethical. <b>Entrapment</b> (inducing someone to commit a crime they didn't intend) is illegal.</li>
<li><b>eDiscovery (EDRM)</b>: information governance → identification → preservation → collection → processing → review → analysis → production → presentation.</li></ul>`,
        ru: `<p>Доказательства должны быть <b>допустимыми</b>: <b>относимыми</b> (relevant — связаны с делом), <b>существенными</b> (material — важны для дела), <b>компетентными</b> (competent — получены законно и надёжны). Также: подлинность, точность, полнота, убедительность.</p>
<ul><li><b>Виды</b>: <b>вещественные</b>, <b>документальные</b> (включая журналы и код), <b>свидетельские</b>. <b>Правило лучшего доказательства</b>: оригинал предпочтительнее копии. <b>Parol evidence rule</b>: письменный договор считается полным соглашением. <b>Показания с чужих слов (hearsay)</b> обычно недопустимы; исключение — деловые записи, сделанные в обычном ходе деятельности.</li>
<li><b>Цепочка хранения (chain of custody)</b>: кто, когда собирал, передавал, хранил — доказывает отсутствие вмешательства.</li>
<li><b>Процесс</b>: идентификация → сохранение (<b>блокираторы записи</b>, побитовый образ, <b>хеш</b> оригинала и образа) → сбор → исследование и анализ (всегда на <b>копии</b>) → представление. Соблюдать <b>порядок волатильности</b>.</li>
<li><b>Принцип Локара</b>: любой контакт оставляет след. <b>MOM</b>: мотив, возможность, средства.</li>
<li><b>Приманка (enticement)</b> — тот, кто уже намерен, «клюёт» на honeypot — законно. <b>Провокация (entrapment)</b> — склонение к преступлению, которого человек не замышлял, — незаконно.</li>
<li><b>eDiscovery (EDRM)</b>: управление информацией → идентификация → сохранение → сбор → обработка → просмотр → анализ → предоставление → презентация.</li></ul>`,
      },
      w: ['layers', { title: { en: 'Order of volatility (collect first → last)', ru: 'Порядок волатильности (собирать сначала → в конце)' }, items: [
        { t: 'CPU registers and cache', d: 'Lost in nanoseconds.' },
        { t: 'Routing table, ARP cache, process table, kernel statistics, RAM', d: 'Live memory: running processes, network connections, encryption keys, malware in memory. Capture before powering off.' },
        { t: 'Temporary file systems / swap', d: 'May be overwritten quickly.' },
        { t: 'Disk (persistent storage)', d: 'Create a bit-level forensic image with a write blocker; hash it.' },
        { t: 'Remote logging and monitoring data', d: 'SIEM, syslog servers — may roll over per retention.' },
        { t: 'Physical configuration, network topology', d: 'Document, photograph.' },
        { t: 'Archival media (backups, tapes)', d: 'Least volatile.' },
      ] }],
    },
    {
      t: { en: 'Logging and monitoring', ru: 'Журналирование и мониторинг' },
      b: {
        en: `<ul><li><b>SIEM</b>: centralizes, normalizes and correlates logs, alerts, and supports retention and reporting. <b>SOAR</b>: automates response playbooks and orchestrates tools.</li>
<li><b>Continuous monitoring</b> and <b>egress monitoring</b> (DLP, watching for data exfiltration and C2 beacons, and for steganography and watermark detection).</li>
<li><b>UEBA</b> (User and Entity Behavior Analytics): baselines behavior and flags anomalies such as insider threats and compromised accounts.</li>
<li><b>Threat intelligence</b>: feeds, IOCs, TTPs, STIX/TAXII. <b>Threat hunting</b>: proactive, hypothesis-driven searching for adversaries that tools missed.</li>
<li>Protect log integrity: send logs to a central, write-once or append-only store, restrict access, hash them, and synchronize time with NTP.</li></ul>`,
        ru: `<ul><li><b>SIEM</b> — централизация, нормализация, корреляция журналов, оповещения, хранение, отчёты. <b>SOAR</b> — автоматизация сценариев реагирования и оркестрация инструментов.</li>
<li><b>Непрерывный мониторинг</b> и <b>мониторинг исходящего трафика</b> (DLP, утечки и C2-маяки, стеганография и водяные знаки).</li>
<li><b>UEBA</b> — базовая линия поведения пользователей и сущностей, выявление аномалий (инсайдеры, скомпрометированные учётки).</li>
<li><b>Разведка угроз</b>: фиды, IOC, TTP, STIX/TAXII. <b>Threat hunting</b> — проактивный поиск по гипотезам того, что пропустили инструменты.</li>
<li>Целостность журналов: центральное хранилище только для записи/добавления, ограниченный доступ, хеши, синхронизация NTP.</li></ul>`,
      },
    },
    {
      t: { en: 'Foundational security operations concepts', ru: 'Базовые концепции операционной безопасности' },
      b: {
        en: `<ul><li><b>Need to know</b> (access only to the information required for the task) and <b>least privilege</b> (minimum rights needed).</li>
<li><b>Separation of duties</b> and <b>two-person integrity / dual control</b>. <b>Job rotation</b>. <b>Mandatory vacation</b>.</li>
<li><b>Privileged account management</b>: monitor privileged activity and use separate admin accounts.</li>
<li><b>SLAs</b> (service level agreements: uptime, response times, penalties). Also OLA, MOU and ISA.</li>
<li><b>Configuration management</b>: secure <b>baselines</b>, <b>provisioning</b> from standard images, <b>automation</b> (Infrastructure as Code, configuration drift detection), CMDB. Configuration management keeps systems in a known state. Change management controls how that state changes.</li>
<li><b>Resource protection / media management</b>: labeling, secure storage, transport (encrypted, tracked), library check-in/out, sanitization at end of life. Tapes go to offsite vaults.</li></ul>`,
        ru: `<ul><li><b>Need to know</b> (доступ только к нужной для задачи информации) и <b>минимальные привилегии</b> (минимально необходимые права).</li>
<li><b>Разделение обязанностей</b> и <b>двойной контроль</b>. <b>Ротация</b>. <b>Обязательный отпуск</b>.</li>
<li><b>Управление привилегированными учётками</b> — мониторинг действий, отдельные админ-учётки.</li>
<li><b>SLA</b> — соглашения об уровне сервиса (доступность, время реакции, штрафы); также OLA, MOU, ISA.</li>
<li><b>Управление конфигурациями</b>: защищённые <b>базовые конфигурации</b>, <b>развёртывание</b> из стандартных образов, <b>автоматизация</b> (IaC, обнаружение дрейфа), CMDB. Управление конфигурациями держит систему в известном состоянии; управление изменениями контролирует, как это состояние меняется.</li>
<li><b>Защита ресурсов / носители</b>: маркировка, хранение, транспортировка (шифрование, учёт), выдача и возврат, санитизация. Ленты — во внешнее хранилище.</li></ul>`,
      },
    },
    {
      t: { en: 'Incident management', ru: 'Управление инцидентами' },
      b: {
        en: `<p>An <b>event</b> is any observable occurrence. An <b>incident</b> is an event that negatively affects CIA or violates policy. Every incident is an event, but not every event is an incident. You need a documented <b>incident response plan</b>, a trained <b>CSIRT</b>, communication plans (legal, PR, regulators, law enforcement), and evidence handling.</p>
<p>NIST SP 800-61 phases: <b>Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity</b>. Revision 3 (2025) maps incident response to the CSF 2.0 functions. The ISC2 / OSG model has 7 steps (below).</p>
<p>Key exam point: <b>containment</b> is the priority after detection, to limit damage. But don't destroy evidence. For example, isolate the machine from the network instead of powering it off, to preserve memory.</p>`,
        ru: `<p><b>Событие</b> — любое наблюдаемое происшествие; <b>инцидент</b> — событие, негативно влияющее на CIA или нарушающее политику. Каждый инцидент — событие, но не наоборот. Нужны документированный <b>план реагирования</b>, обученная <b>CSIRT</b>, план коммуникаций (юристы, PR, регуляторы, правоохранители), порядок обращения с доказательствами.</p>
<p>Этапы NIST SP 800-61: <b>Подготовка → Обнаружение и анализ → Сдерживание, устранение, восстановление → Действия после инцидента</b>. Редакция 3 (2025) сопоставляет реагирование с функциями CSF 2.0. В модели ISC2/OSG — 7 шагов (ниже).</p>
<p>Важно для экзамена: после обнаружения приоритет — <b>сдерживание</b> (ограничить ущерб), не уничтожая доказательства. Например, изолировать машину от сети, а не выключать, чтобы сохранить память.</p>`,
      },
      w: ['flow', { title: { en: 'Incident management steps (OSG)', ru: 'Шаги управления инцидентом (OSG)' }, steps: [
        { t: 'Detection', d: { en: 'Identify that an incident occurred: IDS alerts, SIEM correlation, user reports, anti-malware. Triage and validate (is it a real incident?).', ru: 'Выявить инцидент: IDS, SIEM, сообщения пользователей, антивирус. Триаж и подтверждение.' } },
        { t: 'Response', d: { en: 'Activate the CSIRT/IR team, start documentation and evidence handling.', ru: 'Активировать команду реагирования, начать документирование и сбор доказательств.' } },
        { t: 'Mitigation', d: { en: '<b>Containment</b>: limit the effect and scope (isolate hosts, disable accounts, block IPs).', ru: '<b>Сдерживание</b>: ограничить последствия и масштаб (изоляция хостов, блокировка учёток, IP).' } },
        { t: 'Reporting', d: { en: 'Report to management, and to regulators, customers or law enforcement as required (e.g. GDPR 72h). Reporting continues throughout.', ru: 'Доложить руководству; при необходимости регуляторам, клиентам, полиции (GDPR — 72 часа). Ведётся на всём протяжении.' } },
        { t: 'Recovery', d: { en: 'Restore systems to normal operation (from clean backups or rebuilds), verify, and monitor closely.', ru: 'Вернуть системы в норму (чистые бэкапы или пересборка), проверить, усилить мониторинг.' } },
        { t: 'Remediation', d: { en: 'Root cause analysis and fixing the underlying vulnerability so it doesn\'t recur (eradication).', ru: 'Анализ первопричины и устранение уязвимости, чтобы не повторилось.' } },
        { t: 'Lessons learned', d: { en: 'Post-incident review: what happened, what worked, what to improve. Update the IR plan and controls. Often the most neglected, yet the most valuable.', ru: 'Разбор: что случилось, что сработало, что улучшить; обновить план и меры. Часто пропускают, хотя ценнее всего.' } },
      ] }],
    },
    {
      t: { en: 'Detective and preventive measures', ru: 'Средства обнаружения и предотвращения' },
      b: {
        en: `<ul><li><b>Allow list (whitelisting)</b>: only approved software runs. This is the strongest option against unknown malware but the hardest to maintain. <b>Deny list (blacklisting)</b> blocks known bad items.</li>
<li><b>Sandboxing</b>: run untrusted code in an isolated environment to observe its behavior.</li>
<li><b>Honeypot</b> (a single decoy system), <b>honeynet</b> (a network of them), <b>honeytoken</b> (fake credentials or records that alert when used), <b>darknet</b> (unused address space where any traffic is suspicious). Their purpose is to detect, distract and study attackers. Stay on the side of enticement, not entrapment.</li>
<li><b>Anti-malware</b>: signature, heuristic and behavioral. EDR/XDR. Central management and automatic updates.</li>
<li><b>Machine learning / AI tools</b>: anomaly detection, but they produce false positives and can face adversarial evasion.</li>
<li><b>Third-party security services</b>: MSSP, MDR, SOC-as-a-service. Accountability stays with you.</li></ul>`,
        ru: `<ul><li><b>Белый список (allow list)</b> — запускается только одобренное ПО: сильнейшая защита от неизвестного вредоноса, но сложно поддерживать. <b>Чёрный список</b> — блокирует известное плохое.</li>
<li><b>Песочница</b> — запуск недоверенного кода в изоляции для наблюдения за поведением.</li>
<li><b>Honeypot</b> (одна приманка), <b>honeynet</b> (сеть приманок), <b>honeytoken</b> (фальшивые учётки или записи, срабатывающие при использовании), <b>darknet</b> (неиспользуемое адресное пространство — любой трафик подозрителен). Цель: обнаружить, отвлечь, изучить атакующего. Приманка, а не провокация.</li>
<li><b>Антивирус</b>: сигнатурный, эвристический, поведенческий; EDR/XDR; централизованное управление и автообновление.</li>
<li><b>ML/AI</b> — выявление аномалий; ложные срабатывания и состязательное уклонение.</li>
<li><b>Сторонние сервисы</b>: MSSP, MDR, SOC-as-a-service; подотчётность остаётся у вас.</li></ul>`,
      },
    },
    {
      t: { en: 'Patch, vulnerability and change management', ru: 'Управление патчами, уязвимостями и изменениями' },
      b: {
        en: `<p><b>Patch management</b>: evaluate (does it apply, how critical?) → <b>test</b> (in non-production) → approve (via change management) → deploy (staged) → verify, and keep an audit trail. Emergency patches still follow an expedited change process and are documented afterwards.</p>
<p><b>Vulnerability management</b> is a continuous cycle: asset inventory → scanning → prioritization by risk → remediation or exception → verification.</p>
<p><b>Change management</b> ensures changes don't reduce security or cause outages. It needs a <b>CAB</b> (Change Advisory Board), rollback plans and documentation. Unauthorized changes are a security incident.</p>`,
        ru: `<p><b>Управление патчами</b>: оценить (применим ли, насколько критичен) → <b>протестировать</b> (не в продуктиве) → одобрить (через управление изменениями) → развернуть (поэтапно) → проверить; вести журнал. Срочные патчи — по ускоренной процедуре изменений с документированием постфактум.</p>
<p><b>Управление уязвимостями</b> — непрерывный цикл: инвентаризация → сканирование → приоритизация по риску → устранение или исключение → проверка.</p>
<p><b>Управление изменениями</b> гарантирует, что изменения не снижают безопасность и не вызывают сбоев. Нужны <b>CAB</b> (консультативный совет по изменениям), планы отката, документирование. Несанкционированное изменение — инцидент безопасности.</p>`,
      },
      w: ['flow', { title: { en: 'Change management process', ru: 'Процесс управления изменениями' }, steps: [
        { t: 'Request', d: 'Formal change request with business justification.' },
        { t: 'Review / impact analysis', d: 'Assess security, operational and business impact; risk.' },
        { t: 'Approve / reject', d: 'CAB or delegated authority decides.' },
        { t: 'Test', d: 'Validate in a non-production environment; prepare rollback plan.' },
        { t: 'Schedule & implement', d: 'Deploy in approved maintenance window; communicate to stakeholders.' },
        { t: 'Document & verify', d: 'Update configuration records (CMDB), baselines, and confirm success.' },
      ] }],
    },
    {
      t: { en: 'Backups and storage strategies', ru: 'Резервное копирование и хранение' },
      b: {
        en: `<ul><li><b>Full</b>: everything, clears the archive bit. <b>Incremental</b>: changes since the last backup of any type, clears the archive bit. Fastest backup, slowest restore. <b>Differential</b>: changes since the last <i>full</i>, does not clear the archive bit. Backups grow over the week, but restore needs only full + last differential.</li>
<li>The <b>3-2-1 rule</b>: 3 copies, 2 different media, 1 offsite. Add <b>immutable / offline (air-gapped)</b> copies against ransomware.</li>
<li><b>Electronic vaulting</b> (bulk transfer of backups offsite), <b>remote journaling</b> (transaction logs sent offsite), <b>remote mirroring</b> (real-time copy, the most expensive and lowest RPO).</li>
<li>Tape rotation schemes: GFS (Grandfather-Father-Son), Tower of Hanoi.</li></ul>`,
        ru: `<ul><li><b>Полная</b> — всё, сбрасывает архивный бит. <b>Инкрементальная</b> — изменения с последнего бэкапа любого типа, сбрасывает бит: быстрый бэкап, медленное восстановление. <b>Дифференциальная</b> — изменения с последней <i>полной</i>, бит не сбрасывает: копии растут, но для восстановления нужны только полная + последняя дифференциальная.</li>
<li><b>Правило 3-2-1</b>: 3 копии, 2 типа носителей, 1 вне площадки. Плюс <b>неизменяемые / офлайн (air-gap)</b> копии против вымогателей.</li>
<li><b>Электронное хранилище (vaulting)</b> — пакетная передача бэкапов на удалённую площадку; <b>удалённое журналирование</b> — передача журналов транзакций; <b>удалённое зеркалирование</b> — копия в реальном времени (дороже всего, минимальный RPO).</li>
<li>Схемы ротации лент: GFS («дед-отец-сын»), «Ханойская башня».</li></ul>`,
      },
      w: ['backupSim'],
    },
    {
      t: { en: 'Recovery sites and resiliency', ru: 'Резервные площадки и отказоустойчивость' },
      b: {
        en: `<ul><li><b>RAID</b> provides fault tolerance for disks. It is not a backup.</li>
<li><b>High availability</b>: clustering (active-active or active-passive), load balancing, redundant power and network paths, multiple processing sites, geo-redundancy. <b>QoS</b> prioritizes critical traffic.</li>
<li><b>MTBF</b> (mean time between failures, i.e. reliability), <b>MTTR</b> (mean time to repair), <b>MTTF</b> (for non-repairable items).</li></ul>`,
        ru: `<ul><li><b>RAID</b> — отказоустойчивость дисков, но не бэкап.</li>
<li><b>Высокая доступность</b>: кластеры (active-active / active-passive), балансировка, резервирование питания и каналов, несколько площадок, георезервирование. <b>QoS</b> — приоритет критичному трафику.</li>
<li><b>MTBF</b> — среднее время между отказами (надёжность), <b>MTTR</b> — среднее время ремонта, <b>MTTF</b> — для неремонтируемых.</li></ul>`,
      },
      w: ['compare', { title: { en: 'Recovery sites', ru: 'Резервные площадки' }, cols: ['Site', 'What is there', 'Time to operate', 'Cost'], rows: [
        ['Cold site', 'Space, power, HVAC — no equipment or data', 'Weeks', 'Lowest'],
        ['Warm site', 'Equipment and connectivity, data not current (restore from backup)', 'Hours to days', 'Medium'],
        ['Hot site', 'Fully equipped, near real-time data replication', 'Minutes to hours', 'High'],
        ['Redundant / mirrored site', 'Fully operational duplicate, live load sharing', 'Near zero (failover)', 'Highest'],
        ['Mobile site', 'Self-contained trailer/container with equipment', 'Days', 'Medium–high'],
        ['Reciprocal agreement', 'Mutual aid with another organization', 'Varies, often unreliable', 'Low (but hard to enforce, capacity and security issues)'],
        ['Cloud / DRaaS', 'Provisioned on demand from images and replicated data', 'Minutes to hours', 'Pay-as-you-go'],
      ], note: { en: 'Choose the site by RTO/RPO from the BIA. Shorter RTO means a hotter site and higher cost. The exam favors the cheapest option that meets the RTO.', ru: 'Площадку выбирают по RTO/RPO из BIA: меньше RTO — «горячее» и дороже. На экзамене — самый дешёвый вариант, удовлетворяющий RTO.' } }],
    },
    {
      t: { en: 'RAID levels', ru: 'Уровни RAID' },
      b: { en: '<p>RAID improves availability (and sometimes performance). It does <b>not</b> protect against deletion, corruption or ransomware, so you still need backups.</p>', ru: '<p>RAID повышает доступность (иногда производительность), но <b>не</b> защищает от удаления, повреждения или вымогателей — бэкапы всё равно нужны.</p>' },
      w: ['compare', { title: 'RAID', cols: ['Level', 'Technique', 'Fault tolerance', 'Min disks'], rows: [
        ['RAID 0', 'Striping', '<b>None</b> (performance only)', '2'],
        ['RAID 1', 'Mirroring', '1 disk failure', '2'],
        ['RAID 5', 'Striping with distributed parity', '1 disk failure', '3'],
        ['RAID 6', 'Striping with double distributed parity', '2 disk failures', '4'],
        ['RAID 10 (1+0)', 'Mirrored sets, striped', '1 per mirror set', '4'],
      ] }],
    },
    {
      t: { en: 'Disaster recovery process and plan testing', ru: 'Процесс DR и тестирование плана' },
      b: {
        en: `<p>The DR process covers <b>response</b>, <b>personnel</b> (roles, contact lists, succession), <b>communications</b> (internal, external, media, using alternate channels), <b>assessment</b> (damage assessment), <b>restoration</b> (recovering critical functions at the alternate site), and <b>training and awareness</b>. Moving back to the primary site: <b>least critical functions go first</b>, to test the primary site before the critical systems return.</p>
<p>Plans must be tested regularly (at least annually) and after major changes.</p>`,
        ru: `<p>Процесс DR: <b>реагирование</b>, <b>персонал</b> (роли, списки контактов, замещение), <b>коммуникации</b> (внутренние, внешние, СМИ; альтернативные каналы), <b>оценка ущерба</b>, <b>восстановление</b> (критичные функции на резервной площадке), <b>обучение</b>. Возврат на основную площадку: <b>сначала наименее критичные функции</b> — чтобы проверить площадку до переноса критичных.</p>
<p>План тестируют регулярно (минимум ежегодно) и после значимых изменений.</p>`,
      },
      w: ['layers', { title: { en: 'DR test types — least to most disruptive', ru: 'Типы тестов DR — от наименее к наиболее разрушительным' }, items: [
        { n: 1, t: 'Read-through / checklist', d: { en: 'Copies of the plan are distributed and each team reviews them for accuracy and completeness. No disruption.', ru: 'План рассылается, команды проверяют его на точность и полноту. Без прерывания.' } },
        { n: 2, t: 'Structured walkthrough / tabletop', d: { en: 'The team meets and talks through a scenario step by step ("table-top exercise").', ru: 'Команда собирается и проговаривает сценарий по шагам («настольные учения»).' } },
        { n: 3, t: 'Simulation', d: { en: 'A scenario is acted out, possibly including travel to the alternate site, but without actual processing at the alternate site.', ru: 'Сценарий отыгрывается, возможно с выездом на резервную площадку, но без реальной обработки там.' } },
        { n: 4, t: 'Parallel test', d: { en: 'Systems are brought up at the alternate site and process real data <b>in parallel</b>. The primary site keeps operating, so there is no disruption to the business.', ru: 'Системы поднимаются на резервной площадке и обрабатывают реальные данные <b>параллельно</b>; основная площадка работает.' } },
        { n: 5, t: 'Full interruption / full-scale', d: { en: 'The primary site is actually shut down and operations move to the alternate site. This is the most realistic and the riskiest, and needs senior management approval.', ru: 'Основная площадка реально отключается, работа переносится. Самый реалистичный и рискованный тест; нужно одобрение руководства.' } },
      ] }],
    },
    {
      t: { en: 'Physical security operations and personnel safety', ru: 'Физическая безопасность и безопасность персонала' },
      b: {
        en: `<ul><li><b>Perimeter</b>: fences, gates, lighting, CCTV, guards and patrols, intrusion detection. <b>Internal</b>: badges worn visibly, visitor logs and <b>escorts</b>, locked server rooms, clean desk, key management, alarms.</li>
<li><b>Personnel safety</b>: occupant emergency plans, evacuation drills, safety wardens and meeting points, first aid.</li>
<li><b>Duress</b>: <b>duress codes or passwords</b> silently signal coercion (e.g. a guard forced to open a door). Duress alarms. Training: comply, don't resist.</li>
<li><b>Travel</b>: loaner laptops for high-risk destinations, no sensitive data, VPN, avoid public Wi-Fi, beware of border device searches, report lost devices, wipe or reimage on return.</li>
<li><b>Emergency management</b>: natural disasters, pandemics, active threats. Life safety always comes first.</li>
<li><b>Security training and awareness</b> on social engineering, tailgating and reporting.</li></ul>`,
        ru: `<ul><li><b>Периметр</b>: заборы, ворота, освещение, CCTV, охрана и патрули, датчики вторжения. <b>Внутри</b>: бейджи на виду, журнал и <b>сопровождение посетителей</b>, закрытые серверные, чистый стол, управление ключами, сигнализация.</li>
<li><b>Безопасность людей</b>: планы действий при ЧС, учения по эвакуации, ответственные и точки сбора, первая помощь.</li>
<li><b>Принуждение (duress)</b>: <b>кодовые слова или пароли принуждения</b> скрытно сигнализируют об угрозе (охранника заставляют открыть дверь). Тревожные кнопки. Обучение: подчиниться, не сопротивляться.</li>
<li><b>Командировки</b>: «чистые» ноутбуки для рискованных стран, без чувствительных данных, VPN, избегать публичного Wi-Fi, осторожность при досмотре на границе, сообщать о потере, переустановка по возвращении.</li>
<li><b>Управление ЧС</b>: стихийные бедствия, пандемии, активные угрозы. Жизнь — прежде всего.</li>
<li><b>Обучение</b>: социальная инженерия, tailgating, сообщение об инцидентах.</li></ul>`,
      },
    },
  ],
  terms: [
    ['Chain of custody', 'Documented history of evidence handling proving integrity.', 'Документированная история обращения с доказательствами.'],
    ['Best evidence rule', 'Original documents are preferred over copies.', 'Оригинал предпочтительнее копии.'],
    ['Hearsay', 'Second-hand evidence; generally inadmissible (business records may be an exception).', 'Показания с чужих слов; обычно недопустимы.'],
    ['Admissible evidence', 'Relevant, material, and competent.', 'Относимое, существенное, компетентное.'],
    ['Order of volatility', 'Collect most volatile evidence first: registers/cache → RAM → swap → disk → logs → archives.', 'Сначала самое изменчивое: регистры → ОЗУ → своп → диск → журналы → архивы.'],
    ['Write blocker', 'Device preventing writes to evidence media during acquisition.', 'Устройство, блокирующее запись на носитель-доказательство.'],
    ['Locard\'s exchange principle', 'Every contact leaves a trace.', 'Любой контакт оставляет след.'],
    ['Enticement', 'Legal: providing an opportunity (e.g., honeypot) to someone already intending to commit an act.', 'Законно: возможность для уже намеренного (honeypot).'],
    ['Entrapment', 'Illegal: inducing someone to commit a crime they did not intend.', 'Незаконно: склонение к преступлению.'],
    ['SIEM', 'Security Information and Event Management: log aggregation, correlation, alerting.', 'Сбор, корреляция журналов и оповещение.'],
    ['SOAR', 'Security Orchestration, Automation and Response: automated playbooks.', 'Оркестрация и автоматизация реагирования.'],
    ['UEBA', 'User and Entity Behavior Analytics: detects anomalies from behavioral baselines.', 'Поведенческая аналитика пользователей и сущностей.'],
    ['Threat hunting', 'Proactive, hypothesis-driven search for undetected adversaries.', 'Проактивный поиск незамеченных атакующих.'],
    ['Event vs incident', 'Event: any observable occurrence. Incident: event with negative impact on CIA/policy.', 'Событие — любое; инцидент — с негативным влиянием.'],
    ['Containment', 'Limiting the scope and impact of an incident.', 'Ограничение масштаба и последствий инцидента.'],
    ['Lessons learned', 'Post-incident review to improve processes and controls.', 'Разбор после инцидента для улучшений.'],
    ['Honeypot', 'Decoy system designed to attract and study attackers.', 'Система-приманка для привлечения и изучения атакующих.'],
    ['Honeytoken', 'Fake data/credential that alerts when used.', 'Фальшивые данные или учётка, срабатывающая при использовании.'],
    ['Allow list', 'Only explicitly approved applications may run.', 'Запускаются только явно разрешённые приложения.'],
    ['Sandboxing', 'Running untrusted code in an isolated environment.', 'Запуск недоверенного кода в изоляции.'],
    ['CAB', 'Change Advisory Board — reviews and approves changes.', 'Совет по изменениям.'],
    ['Configuration baseline', 'Approved, documented secure configuration of a system.', 'Утверждённая защищённая конфигурация.'],
    ['Incremental backup', 'Backs up changes since last backup of any type; clears archive bit.', 'Изменения с любого последнего бэкапа; сбрасывает бит.'],
    ['Differential backup', 'Backs up changes since last full; does not clear archive bit.', 'Изменения с последней полной; бит не сбрасывает.'],
    ['Remote journaling', 'Sending transaction logs to an offsite location.', 'Передача журналов транзакций на удалённую площадку.'],
    ['Electronic vaulting', 'Bulk transfer of backup data to an offsite location.', 'Пакетная передача бэкапов на удалённую площадку.'],
    ['Hot site', 'Fully equipped alternate site with current data; fastest recovery.', 'Полностью оснащённая площадка с актуальными данными.'],
    ['Warm site', 'Equipped site requiring data restore; hours to days.', 'Оснащённая площадка, нужно восстановить данные.'],
    ['Cold site', 'Space and utilities only; weeks to recover.', 'Только помещение и коммуникации; недели.'],
    ['RAID 5', 'Striping with distributed parity; survives one disk failure; min 3 disks.', 'Чередование с распределённой чётностью; выдерживает 1 отказ.'],
    ['MTBF', 'Mean Time Between Failures — expected reliability.', 'Среднее время между отказами.'],
    ['MTTR', 'Mean Time To Repair.', 'Среднее время восстановления.'],
    ['Parallel test', 'DR test running alternate site in parallel with production.', 'Тест DR с параллельной работой резервной площадки.'],
    ['Full interruption test', 'DR test that shuts down primary site — most disruptive.', 'Тест DR с отключением основной площадки.'],
    ['Duress code', 'Signal used to indicate coercion silently.', 'Сигнал скрытого оповещения о принуждении.'],
  ],
  questions: [
    { o: '7.1', d: 1, q: 'What is the PRIMARY purpose of maintaining a chain of custody?', a: ['To prove evidence has not been altered and is admissible', 'To speed up the investigation', 'To identify the attacker', 'To reduce storage costs'], c: 0,
      e: 'The chain of custody documents every transfer and access, proving the evidence\'s integrity in court.',
      r: 'Цепочка хранения документирует каждую передачу и доступ, доказывая целостность доказательств в суде.' },
    { o: '7.1', d: 2, q: 'A forensic investigator arrives at a running, compromised server. What should be collected FIRST?', a: ['Contents of RAM', 'A bit-by-bit image of the hard drive', 'Backup tapes', 'Printed configuration documentation'], c: 0,
      e: 'Order of volatility: memory is lost when the system powers off, so capture it before the disk.',
      r: 'Порядок волатильности: память пропадает при выключении, поэтому её снимают раньше диска.' },
    { o: '7.1', d: 2, q: 'Before analyzing a seized hard drive, what should the investigator do?', a: ['Create a forensic image using a write blocker and verify it with hashes, then analyze the copy', 'Boot the drive to see what is running', 'Run antivirus on the original drive', 'Defragment the drive to speed analysis'], c: 0,
      e: 'Never work on the original. Use a write blocker for the bit-level image and compare hashes to prove the copy is identical.',
      r: 'Никогда не работать с оригиналом: блокиратор записи, побитовый образ, сравнение хешей.' },
    { o: '7.1', d: 2, q: 'For evidence to be admissible, it must be relevant, material, and:', a: ['Competent', 'Circumstantial', 'Hearsay', 'Conclusive'], c: 0,
      e: 'Competent means it was obtained legally and is reliable.',
      r: 'Компетентность: доказательство получено законно и надёжно.' },
    { o: '7.1', d: 3, q: 'Which type of evidence is generally inadmissible because it is second-hand, although regularly kept business records may be an exception?', a: ['Hearsay', 'Real evidence', 'Best evidence', 'Direct evidence'], c: 0,
      e: 'Hearsay is generally excluded. Computer logs made in the regular course of business may qualify under the business-records exception.',
      r: 'Hearsay обычно исключают; компьютерные журналы, ведущиеся в обычном ходе деятельности, могут подпадать под исключение для деловых записей.' },
    { o: '7.1', d: 2, q: 'A company sets up a honeypot with intriguing fake files to detect intruders already scanning its network. This is:', a: ['Enticement — legal', 'Entrapment — illegal', 'Hacking back', 'Due diligence violation'], c: 0,
      e: 'Enticement offers an opportunity to someone already intent on intrusion. Entrapment induces a crime the person didn\'t intend.',
      r: 'Enticement даёт возможность уже намеренному нарушителю; entrapment склоняет к преступлению, которого не замышляли.' },
    { o: '7.6', d: 1, q: 'Which is the difference between an event and an incident?', a: ['An incident is an event that negatively impacts CIA or violates policy', 'There is no difference', 'An event is always malicious', 'Incidents never require reporting'], c: 0,
      e: 'Every incident is an event, but most events (e.g. a successful login) are not incidents.',
      r: 'Каждый инцидент — событие, но большинство событий (например, успешный вход) инцидентами не являются.' },
    { o: '7.6', d: 2, q: 'A SOC analyst confirms that ransomware is spreading on a workstation. What should be done NEXT?', a: ['Contain the incident by isolating the affected system from the network', 'Wipe and reimage the workstation immediately', 'Notify the press', 'Pay the ransom'], c: 0,
      e: 'After detection and confirmation comes containment, to limit the spread. Isolating (not powering off) preserves evidence. Eradication and recovery come later.',
      r: 'После подтверждения — сдерживание: изоляция (а не выключение) сохраняет доказательства. Устранение и восстановление позже.' },
    { o: '7.6', d: 2, q: 'Which incident response phase is MOST often neglected but provides the greatest long-term improvement?', a: ['Lessons learned', 'Detection', 'Containment', 'Recovery'], c: 0,
      e: 'The post-incident review leads to updated plans and controls, preventing recurrence.',
      r: 'Разбор после инцидента ведёт к обновлению планов и мер и предотвращает повторение.' },
    { o: '7.6', d: 2, q: 'In the ISC2 incident management steps, which step involves identifying the root cause and fixing the underlying weakness?', a: ['Remediation', 'Mitigation', 'Reporting', 'Detection'], c: 0,
      e: 'Mitigation contains the incident. Remediation addresses the root cause so it does not recur.',
      r: 'Mitigation сдерживает инцидент; remediation устраняет первопричину, чтобы он не повторился.' },
    { o: '7.6', d: 3, q: 'What is the correct order of the NIST SP 800-61 (Rev. 2) incident response lifecycle phases?', a: ['Preparation; Detection & Analysis; Containment, Eradication & Recovery; Post-Incident Activity', 'Detection; Preparation; Recovery; Lessons learned', 'Containment; Detection; Eradication; Preparation', 'Identification; Protection; Detection; Response'], c: 0,
      e: 'NIST 800-61 (Rev. 2) has four phases, with Post-Incident Activity feeding back into Preparation.',
      r: 'NIST 800-61 (ред. 2): четыре фазы, действия после инцидента возвращаются в подготовку.' },
    { o: '7.2', d: 2, q: 'Which tool correlates logs from many sources to detect suspicious patterns and generate alerts?', a: ['SIEM', 'SOAR', 'DLP', 'WAF'], c: 0,
      e: 'A SIEM aggregates and correlates. SOAR automates the response actions.',
      r: 'SIEM собирает и коррелирует; SOAR автоматизирует действия реагирования.' },
    { o: '7.2', d: 2, q: 'An employee who normally downloads 50 MB per day suddenly downloads 40 GB from the file server at 3 a.m. Which technology is BEST suited to flag this?', a: ['User and Entity Behavior Analytics (UEBA)', 'Signature-based antivirus', 'Stateful firewall', 'Full-disk encryption'], c: 0,
      e: 'UEBA baselines normal behavior and detects anomalies such as insider data theft.',
      r: 'UEBA строит базовую линию поведения и выявляет аномалии вроде кражи данных инсайдером.' },
    { o: '7.2', d: 2, q: 'Security analysts proactively search for signs of an adversary based on a hypothesis derived from new threat intelligence. This is:', a: ['Threat hunting', 'Vulnerability scanning', 'Penetration testing', 'Incident containment'], c: 0,
      e: 'Threat hunting is proactive and hypothesis-driven. It assumes a breach that tools have missed.',
      r: 'Threat hunting — проактивный поиск по гипотезе; предполагается взлом, пропущенный инструментами.' },
    { o: '7.7', d: 2, q: 'Which control is MOST effective at preventing unknown (zero-day) malware from executing on servers?', a: ['Application allow listing', 'Signature-based antivirus', 'Deny listing known malware hashes', 'Weekly vulnerability scans'], c: 0,
      e: 'An allow list permits only approved executables, so unknown code doesn\'t run regardless of signatures.',
      r: 'Белый список пропускает только одобренные программы: неизвестный код не запустится независимо от сигнатур.' },
    { o: '7.7', d: 2, q: 'A fake database record named "CEO_Salaries" that triggers an alert whenever accessed is an example of a:', a: ['Honeytoken', 'Honeynet', 'Sandbox', 'Darknet'], c: 0,
      e: 'A honeytoken is decoy data or a decoy credential. Any access to it is suspicious.',
      r: 'Honeytoken — данные или учётка-приманка; любое обращение подозрительно.' },
    { o: '7.7', d: 2, q: 'Suspicious email attachments are opened automatically in an isolated virtual environment to observe their behavior before delivery. This is:', a: ['Sandboxing', 'Allow listing', 'Data masking', 'Honeypotting'], c: 0,
      e: 'Sandboxing executes untrusted code in isolation to detect malicious behavior.',
      r: 'Песочница выполняет недоверенный код в изоляции для выявления вредоносного поведения.' },
    { o: '7.8', d: 2, q: 'What should be done BEFORE deploying a critical security patch to production servers?', a: ['Test it in a non-production environment and follow change management', 'Deploy it immediately to all servers', 'Wait for the next annual maintenance window', 'Ask users whether they want it'], c: 0,
      e: 'Untested patches can cause outages. Evaluate, test, approve, deploy, verify. Emergencies use an expedited process, not no process.',
      r: 'Непротестированные патчи могут вызвать сбой: оценить, протестировать, одобрить, развернуть, проверить. Срочно — ускоренно, но по процессу.' },
    { o: '7.9', d: 2, q: 'An administrator makes an urgent firewall change during an outage without prior approval. What should happen afterward?', a: ['Document the change and submit it for retroactive review and approval per the emergency change process', 'Nothing, since it fixed the outage', 'Immediately revert the change', 'Discipline the administrator for any emergency change'], c: 0,
      e: 'Emergency changes are allowed but must be documented and reviewed afterwards so the configuration records stay accurate.',
      r: 'Срочные изменения допустимы, но документируются и рассматриваются постфактум, чтобы учёт конфигураций оставался точным.' },
    { o: '7.9', d: 1, q: 'What is the PRIMARY goal of change management from a security perspective?', a: ['Ensure changes do not reduce security or cause unplanned outages', 'Speed up deployments', 'Reduce the number of administrators', 'Eliminate testing'], c: 0,
      e: 'Change management controls risk from modifications through review, testing, approval and rollback planning.',
      r: 'Управление изменениями контролирует риск модификаций: анализ, тесты, одобрение, план отката.' },
    { o: '7.3', d: 2, q: 'Which practice BEST detects unauthorized configuration drift on servers?', a: ['Comparing current configurations against approved baselines automatically', 'Annual penetration tests', 'User awareness training', 'Increasing password length'], c: 0,
      e: 'Configuration management with automated baseline comparison (IaC, compliance scanning) detects drift.',
      r: 'Управление конфигурациями с автоматическим сравнением с базовой линией (IaC, проверка соответствия) выявляет дрейф.' },
    { o: '7.10', d: 2, q: 'A company does a full backup Sunday and incremental backups Monday–Saturday. The server fails Thursday afternoon. Which backups are needed to restore?', a: ['Sunday full + Monday, Tuesday, Wednesday, Thursday incrementals', 'Sunday full + Thursday incremental only', 'Thursday incremental only', 'Sunday full only'], c: 0,
      e: 'Incremental restores need the full backup plus every incremental since then, in order.',
      r: 'Для инкрементальной схемы нужны полная и все инкрементальные после неё, по порядку.' },
    { o: '7.10', d: 2, q: 'With full backups on Sunday and differential backups daily, what is needed to restore after a Friday failure?', a: ['Sunday full + Friday differential', 'Sunday full + all differentials', 'Friday differential only', 'All differentials only'], c: 0,
      e: 'Each differential contains all changes since the last full, so only the latest one is needed.',
      r: 'Каждая дифференциальная содержит все изменения с последней полной — нужна только последняя.' },
    { o: '7.10', d: 2, q: 'An organization needs an alternate site that can be operational within hours, but cannot afford real-time replication. Which site type fits BEST?', a: ['Warm site', 'Cold site', 'Hot site', 'Redundant site'], c: 0,
      e: 'A warm site has equipment ready and data restored from backup, so it can run in hours to days at moderate cost.',
      r: 'Тёплая площадка: оборудование готово, данные восстанавливаются из бэкапа; часы–дни при умеренной стоимости.' },
    { o: '7.10', d: 2, q: 'What is the MAIN drawback of a reciprocal agreement for recovery?', a: ['It is hard to enforce, and the partner may lack capacity or have conflicting security requirements', 'It is the most expensive option', 'It requires building a new data center', 'It provides the fastest recovery'], c: 0,
      e: 'Reciprocal agreements are cheap but unreliable, since both parties may be affected by the same disaster, and they raise confidentiality issues.',
      r: 'Взаимные соглашения дёшевы, но ненадёжны: обе стороны могут пострадать от одного бедствия; проблемы конфиденциальности.' },
    { o: '7.10', d: 1, q: 'Which RAID level provides striping with no fault tolerance?', a: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6'], c: 0,
      e: 'RAID 0 improves performance only. A single disk failure loses all the data.',
      r: 'RAID 0 только ускоряет; отказ одного диска — потеря всех данных.' },
    { o: '7.10', d: 2, q: 'Which RAID level can survive the simultaneous failure of two disks?', a: ['RAID 6', 'RAID 5', 'RAID 1', 'RAID 0'], c: 0,
      e: 'RAID 6 uses double distributed parity and needs a minimum of 4 disks.',
      r: 'RAID 6 — двойная распределённая чётность, минимум 4 диска.' },
    { o: '7.10', d: 2, q: 'A company keeps its database replicated in real time to a second data center to achieve near-zero RPO. This is:', a: ['Remote mirroring', 'Electronic vaulting', 'Remote journaling', 'Tape rotation'], c: 0,
      e: 'Mirroring is a real-time copy. Journaling sends transaction logs. Vaulting is bulk backup transfer.',
      r: 'Зеркалирование — копия в реальном времени; журналирование — передача журналов; vaulting — пакетная передача бэкапов.' },
    { o: '7.10', d: 3, q: 'Why should at least one backup copy be immutable or offline?', a: ['Ransomware and attackers with admin access can encrypt or delete online backups', 'Offline backups are faster to restore', 'Regulations forbid online backups', 'Immutable backups don\'t need testing'], c: 0,
      e: 'Modern ransomware targets backups. Air-gapped or immutable (WORM) copies survive.',
      r: 'Современные вымогатели атакуют бэкапы; изолированные или неизменяемые (WORM) копии уцелеют.' },
    { o: '7.12', d: 2, q: 'Which DR test brings up systems at the alternate site and processes real transactions without stopping the primary site?', a: ['Parallel test', 'Full interruption test', 'Tabletop exercise', 'Checklist review'], c: 0,
      e: 'A parallel test validates the alternate site with real data while production continues.',
      r: 'Параллельный тест проверяет резервную площадку на реальных данных при работающем продуктиве.' },
    { o: '7.12', d: 2, q: 'Which DR test carries the HIGHEST risk to business operations?', a: ['Full interruption test', 'Parallel test', 'Simulation test', 'Structured walkthrough'], c: 0,
      e: 'Full interruption actually shuts down primary operations. It requires senior management approval.',
      r: 'Полное прерывание реально останавливает основную площадку; нужно одобрение руководства.' },
    { o: '7.12', d: 1, q: 'Team members gather in a conference room to talk through their roles in a hurricane scenario. Which test type is this?', a: ['Structured walkthrough (tabletop)', 'Parallel test', 'Full interruption', 'Simulation with relocation'], c: 0,
      e: 'A tabletop or walkthrough is discussion-based and causes no operational impact.',
      r: 'Настольные учения — обсуждение без влияния на работу.' },
    { o: '7.11', d: 3, q: 'After a disaster, the primary site has been repaired. Which functions should be moved back FIRST?', a: ['The least critical functions', 'The most critical functions', 'All functions simultaneously', 'Only the IT help desk'], c: 0,
      e: 'Moving the least critical functions first tests the restored site before risking critical operations on it.',
      r: 'Сначала наименее критичные функции — проверка восстановленной площадки до переноса критичных.' },
    { o: '7.11', d: 2, q: 'During a disaster, what is the FIRST priority of the DR team?', a: ['Ensuring the safety of personnel', 'Restoring the database', 'Notifying customers', 'Assessing equipment damage'], c: 0,
      e: 'People always come first. Then damage assessment and recovery.',
      r: 'Люди всегда первыми; затем оценка ущерба и восстановление.' },
    { o: '7.4', d: 2, q: 'A system administrator can read the HR database because they manage the server, but they don\'t need its content for their job. Which principle is violated?', a: ['Need to know', 'Separation of duties', 'Job rotation', 'Dual control'], c: 0,
      e: 'Having technical access doesn\'t imply a need to know. Use encryption and role design to limit content access.',
      r: 'Техническая возможность доступа не означает need to know; ограничивать доступ к содержимому шифрованием и ролями.' },
    { o: '7.4', d: 2, q: 'A vendor contract specifies 99.95% uptime and a 1-hour response time for critical issues, with financial penalties. This is a(n):', a: ['Service Level Agreement (SLA)', 'Memorandum of Understanding (MOU)', 'Non-disclosure agreement', 'Interconnection Security Agreement'], c: 0,
      e: 'An SLA defines measurable service levels and remedies. An MOU is less formal and usually not binding.',
      r: 'SLA определяет измеримые уровни сервиса и санкции; MOU менее формален и обычно не обязывает.' },
    { o: '7.5', d: 2, q: 'Backup tapes must be transported to an offsite vault. Which measure BEST protects their confidentiality in transit?', a: ['Encrypt the tapes and use a bonded courier with a tracked chain of custody', 'Label the tapes "Confidential"', 'Use a regular postal service', 'Store the encryption keys with the tapes'], c: 0,
      e: 'Encryption protects against loss or theft, and tracked handling prevents tampering. Keys must be kept separately.',
      r: 'Шифрование защищает от потери или кражи, учёт при перевозке — от подмены; ключи хранить отдельно.' },
    { o: '7.15', d: 2, q: 'An employee is traveling to a high-risk country. What is the BEST practice for their laptop?', a: ['Issue a clean loaner laptop with minimal data and reimage it upon return', 'Take their usual laptop with all data for convenience', 'Disable full-disk encryption to avoid customs issues', 'Use hotel Wi-Fi without a VPN'], c: 0,
      e: 'Loaner devices limit exposure, and reimaging removes possible implants after return.',
      r: 'Временное устройство ограничивает риски, переустановка удаляет возможные закладки после возвращения.' },
    { o: '7.15', d: 2, q: 'A guard is forced at gunpoint to disarm the alarm. What lets them alert the security center without the attacker noticing?', a: ['A duress code', 'A mantrap', 'Job rotation', 'CCTV'], c: 0,
      e: 'A duress code (or duress PIN) silently signals coercion while appearing to comply.',
      r: 'Код принуждения скрытно сигнализирует об угрозе, создавая видимость подчинения.' },
    { o: '7.14', d: 1, q: 'Which practice helps prevent visitors from accessing restricted areas?', a: ['Escorting visitors and logging their entry and exit', 'Allowing visitors to borrow employee badges', 'Removing visitor logs to save paper', 'Leaving server room doors open for airflow'], c: 0,
      e: 'Escorts and visitor logs control and record visitor access.',
      r: 'Сопровождение и журналы посетителей контролируют и фиксируют их доступ.' },
    { t: 'order', o: '7.6', d: 2, q: 'Arrange the ISC2/OSG incident management steps in order.', items: ['Detection', 'Response', 'Mitigation', 'Reporting', 'Recovery', 'Remediation', 'Lessons learned'],
      e: 'Detection → Response → Mitigation → Reporting → Recovery → Remediation → Lessons learned.', r: 'Обнаружение → реагирование → сдерживание → отчёт → восстановление → устранение причин → уроки.' },
    { t: 'order', o: '7.12', d: 2, q: 'Order the DR test types from least to most disruptive.', items: ['Read-through (checklist)', 'Structured walkthrough (tabletop)', 'Simulation', 'Parallel', 'Full interruption'],
      e: 'Disruption and realism increase together.', r: 'Разрушительность и реалистичность растут вместе.' },
    { t: 'order', o: '7.1', d: 2, q: 'Order the evidence from MOST volatile to LEAST volatile.', items: ['CPU registers and cache', 'RAM', 'Swap / temporary files', 'Hard disk', 'Remote logs', 'Archival backups'],
      e: 'Collect the most volatile first (RFC 3227).', r: 'Сначала самое изменчивое (RFC 3227).' },
    { t: 'match', o: '7.10', d: 2, q: 'Match the recovery site to its description.', pairs: [['Cold site', 'Space and utilities only, weeks to recover'], ['Warm site', 'Equipment ready, restore data from backup'], ['Hot site', 'Fully equipped with current data'], ['Redundant site', 'Live duplicate sharing the load']],
      e: 'Cost and readiness increase from cold to redundant.', r: 'Стоимость и готовность растут от холодной к дублирующей.' },
  ],
});
