'use strict';
CISSP.domain({
  id: 6, weight: 12,
  title: { en: 'Security Assessment and Testing', ru: 'Оценка и тестирование безопасности' },
  summary: {
    en: 'Assessment, test and audit strategies; vulnerability scanning and penetration testing; software testing (SAST, DAST, fuzzing, code review); collecting security process data (KPIs, KRIs); reporting; SOC reports and audits.',
    ru: 'Стратегии оценки, тестирования и аудита; сканирование уязвимостей и пентест; тестирование ПО (SAST, DAST, фаззинг, ревью кода); сбор данных о процессах безопасности (KPI, KRI); отчётность; SOC-отчёты и аудиты.',
  },
  objectives: [
    ['6.1', 'Design and validate assessment, test, and audit strategies (internal, external, third-party; location)'],
    ['6.2', 'Conduct security control testing (vulnerability assessment, penetration testing, log reviews, synthetic transactions, code review, misuse case, coverage analysis, interface testing, breach attack simulations, compliance checks)'],
    ['6.3', 'Collect security process data (account management, management review, KPIs/KRIs, backup verification, training, DR/BC)'],
    ['6.4', 'Analyze test output and generate report (remediation, exception handling, ethical disclosure)'],
    ['6.5', 'Conduct or facilitate security audits (internal, external, third-party)'],
  ],
  concepts: [
    {
      t: { en: 'Assessments, tests and audits', ru: 'Оценки, тесты и аудиты' },
      b: {
        en: `<ul><li><b>Security test</b>: verifies that a specific control works (e.g. a scan or a failover test).</li>
<li><b>Security assessment</b>: a comprehensive review of a system or program's security, usually including tests, interviews and document review, and resulting in recommendations.</li>
<li><b>Audit</b>: a formal, independent evaluation against a standard or set of criteria. It needs independence and evidence, and produces an attestation for third parties.</li>
<li><b>Internal</b> (own staff, cheaper, less independent), <b>external</b> (an outside firm hired by you), <b>third-party</b> (an outside party performing it on behalf of another party, e.g. a regulator or customer, or a SOC report auditor).</li>
<li>Test frequency is driven by <b>risk</b>, criticality, change rate, and regulation. Design the strategy to answer "what assurance do stakeholders need?"</li>
<li><b>Location</b>: on-premises, cloud (respect the provider's testing policy and get permission), hybrid.</li></ul>`,
        ru: `<ul><li><b>Тест</b> — проверка работы конкретной меры (скан, проверка переключения).</li>
<li><b>Оценка</b> — всесторонний анализ безопасности системы или программы: тесты, интервью, документы; итог — рекомендации.</li>
<li><b>Аудит</b> — формальная независимая проверка на соответствие стандарту или критериям: нужны независимость и доказательства; результат — заключение для третьих сторон.</li>
<li><b>Внутренний</b> (свой персонал, дешевле, менее независим), <b>внешний</b> (сторонняя фирма по вашему заказу), <b>третьей стороной</b> (внешняя сторона в интересах другой стороны — регулятора, клиента; аудитор SOC-отчёта).</li>
<li>Частота тестов определяется <b>риском</b>, критичностью, частотой изменений, регуляторикой. Стратегия отвечает на вопрос: «какая уверенность нужна заинтересованным сторонам?»</li>
<li><b>Расположение</b>: on-prem, облако (соблюдать политику провайдера, получать разрешение), гибрид.</li></ul>`,
      },
    },
    {
      t: { en: 'Vulnerability assessment and SCAP', ru: 'Оценка уязвимостей и SCAP' },
      b: {
        en: `<ul><li><b>Vulnerability scanning</b>: automated detection of known weaknesses. <b>Credentialed / authenticated</b> scans log in, giving more accurate results with fewer false positives. <b>Non-credentialed</b> scans show the attacker's view. Network discovery scans (Nmap port states: open, closed, filtered), network vulnerability scans, web application scans, database scans.</li>
<li><b>False positive</b>: reports a vulnerability that doesn't exist. <b>False negative</b>: misses a real vulnerability, which is the more dangerous of the two.</li>
<li><b>SCAP</b> (Security Content Automation Protocol) components: <b>CVE</b> (vulnerability naming), <b>CVSS</b> (severity scoring, 0–10), <b>CPE</b> (platform naming), <b>CCE</b> (configuration naming), <b>XCCDF</b> (checklist language), <b>OVAL</b> (test language for system state).</li>
<li>Prioritize remediation by risk: CVSS + asset criticality + exploitability (e.g. CISA KEV, EPSS).</li></ul>`,
        ru: `<ul><li><b>Сканирование уязвимостей</b> — автоматический поиск известных слабостей. <b>С учётными данными</b> — точнее, меньше ложных срабатываний; <b>без учётных данных</b> — взгляд атакующего. Сетевое обнаружение (Nmap: open, closed, filtered), сетевое сканирование уязвимостей, веб-приложений, БД.</li>
<li><b>Ложноположительный</b> результат — уязвимости нет, а сканер её показал. <b>Ложноотрицательный</b> — реальная уязвимость пропущена; это опаснее.</li>
<li><b>SCAP</b>: <b>CVE</b> (наименование уязвимостей), <b>CVSS</b> (оценка серьёзности 0–10), <b>CPE</b> (платформы), <b>CCE</b> (конфигурации), <b>XCCDF</b> (язык чек-листов), <b>OVAL</b> (язык проверки состояния).</li>
<li>Приоритет устранения — по риску: CVSS + критичность актива + эксплуатируемость (CISA KEV, EPSS).</li></ul>`,
      },
    },
    {
      t: { en: 'Penetration testing', ru: 'Тестирование на проникновение' },
      b: {
        en: `<p>A pentest simulates a real attack to <b>exploit</b> vulnerabilities and show impact. It needs <b>written authorization from senior management</b>, defined <b>scope</b> and <b>rules of engagement</b> (targets, timing, allowed techniques, contacts, data handling).</p>
<ul><li>Knowledge levels: <b>black box / zero knowledge</b> (simulates an external attacker; slow, realistic), <b>gray box / partial</b>, <b>white box / full knowledge</b> (most thorough and efficient).</li>
<li>Team colors: <b>red</b> (offense), <b>blue</b> (defense), <b>purple</b> (collaboration), <b>white</b> (referees / rules).</li>
<li><b>Breach and attack simulation (BAS)</b>: automated, continuous simulation of attack techniques (often mapped to MITRE ATT&amp;CK).</li>
<li>Risks: system disruption and data exposure. Back up systems and have a rollback plan.</li></ul>`,
        ru: `<p>Пентест имитирует реальную атаку, чтобы <b>эксплуатировать</b> уязвимости и показать последствия. Нужно <b>письменное разрешение высшего руководства</b>, определённые <b>рамки</b> и <b>правила проведения</b> (цели, время, допустимые техники, контакты, обращение с данными).</p>
<ul><li>Уровни знаний: <b>чёрный ящик</b> (имитация внешнего атакующего; долго, реалистично), <b>серый</b> (частичные знания), <b>белый</b> (полные знания; тщательнее и эффективнее).</li>
<li>Команды: <b>red</b> (атака), <b>blue</b> (защита), <b>purple</b> (совместная работа), <b>white</b> (судьи, правила).</li>
<li><b>BAS</b> — автоматизированная непрерывная имитация техник атак (часто по MITRE ATT&amp;CK).</li>
<li>Риски: сбои систем и раскрытие данных. Бэкапы и план отката.</li></ul>`,
      },
      w: ['flow', { title: { en: 'Penetration test phases (NIST SP 800-115)', ru: 'Этапы пентеста (NIST SP 800-115)' }, steps: [
        { t: 'Planning', d: { en: 'Scope, rules of engagement, written approval, success criteria, emergency contacts.', ru: 'Рамки, правила, письменное одобрение, критерии успеха, экстренные контакты.' } },
        { t: 'Discovery', d: { en: 'Reconnaissance (OSINT, footprinting), network discovery, port scanning, vulnerability analysis.', ru: 'Разведка (OSINT), обнаружение сети, сканирование портов, анализ уязвимостей.' } },
        { t: 'Attack', d: { en: 'Gain access → escalate privileges → system browsing → install additional tools. May loop back to discovery (pivoting).', ru: 'Получение доступа → повышение привилегий → исследование системы → установка инструментов; возможен возврат к обнаружению (pivoting).' } },
        { t: 'Reporting', d: { en: 'Happens throughout and at the end: findings, risk ratings, evidence, remediation recommendations. Treat the report as sensitive.', ru: 'Ведётся на протяжении и в конце: находки, оценка риска, доказательства, рекомендации. Отчёт — конфиденциален.' } },
      ] }],
    },
    {
      t: { en: 'Software and interface testing', ru: 'Тестирование ПО и интерфейсов' },
      b: {
        en: `<ul><li><b>Static testing (SAST)</b>: analyzes source or bytecode <b>without executing it</b>. Early in the SDLC, finds coding flaws.</li>
<li><b>Dynamic testing (DAST)</b>: tests the <b>running</b> application from outside (black box). Finds runtime and configuration issues. <b>IAST</b> uses agents inside the running app. <b>RASP</b> protects at runtime.</li>
<li><b>Fuzzing</b>: feeds invalid or random input to find crashes. <b>Mutation (dumb) fuzzing</b> modifies real input. <b>Generational (intelligent) fuzzing</b> builds input from a model of the data format.</li>
<li><b>Code review</b>: from informal peer review up to <b>Fagan inspection</b>, the most formal: planning → overview → preparation → inspection → rework → follow-up.</li>
<li><b>Misuse case testing</b>: tests how an attacker could abuse functionality (abuse cases).</li>
<li><b>Test coverage analysis</b>: tested ÷ total (e.g. branch, statement, condition, function, loop coverage).</li>
<li><b>Interface testing</b>: APIs, user interfaces, and physical interfaces (ports, kiosks).</li>
<li>Levels: unit → integration → system → acceptance (UAT). <b>Regression testing</b> checks that changes don't break existing functionality.</li>
<li><b>Synthetic transactions</b>: scripted transactions that test functionality and performance proactively. <b>Real user monitoring (RUM)</b>: passive capture of actual user interactions.</li></ul>`,
        ru: `<ul><li><b>Статическое (SAST)</b> — анализ исходного или байт-кода <b>без выполнения</b>; рано в SDLC, находит ошибки кодирования.</li>
<li><b>Динамическое (DAST)</b> — тест <b>работающего</b> приложения снаружи (чёрный ящик), ошибки исполнения и конфигурации. <b>IAST</b> — агенты внутри приложения; <b>RASP</b> — защита во время выполнения.</li>
<li><b>Фаззинг</b> — некорректный или случайный ввод для поиска сбоев. <b>Мутационный (dumb)</b> — изменяет реальные данные; <b>генерационный (intelligent)</b> — строит ввод по модели формата.</li>
<li><b>Ревью кода</b> — от неформального до <b>инспекции Фагана</b> (самая формальная): планирование → обзор → подготовка → инспекция → доработка → контроль.</li>
<li><b>Тестирование сценариев злоупотребления</b> — как атакующий может злоупотребить функциональностью.</li>
<li><b>Анализ покрытия</b> — протестировано ÷ всего (ветви, операторы, условия, функции, циклы).</li>
<li><b>Тестирование интерфейсов</b>: API, пользовательские, физические (порты, киоски).</li>
<li>Уровни: модульное → интеграционное → системное → приёмочное (UAT). <b>Регрессионное</b> — изменения не ломают существующее.</li>
<li><b>Синтетические транзакции</b> — скриптовые проверки функциональности и производительности; <b>RUM</b> — пассивный мониторинг реальных пользователей.</li></ul>`,
      },
    },
    {
      t: { en: 'Collecting security process data', ru: 'Сбор данных о процессах безопасности' },
      b: {
        en: `<ul><li><b>Log reviews</b>: centralized (SIEM), time-synchronized (NTP), protected from tampering, with retention per policy. Sampling and clipping levels (thresholds that reduce noise).</li>
<li><b>KPI</b> (Key Performance Indicator): how well a process performs (e.g. mean time to patch). <b>KRI</b> (Key Risk Indicator): an early warning that risk is rising (e.g. number of critical unpatched systems).</li>
<li><b>Account management</b>: review new, modified and orphaned accounts and privileged use.</li>
<li><b>Management review and approval</b>: leadership regularly reviews program metrics and decides.</li>
<li><b>Backup verification</b>: <b>test restores</b>. A backup that hasn't been restored is a hope, not a control.</li>
<li><b>Training and awareness</b> metrics. <b>DR/BC</b> test results.</li>
<li><b>ISCM</b>, Information Security Continuous Monitoring (NIST SP 800-137): define, establish, implement, analyze/report, respond, review/update.</li></ul>`,
        ru: `<ul><li><b>Анализ журналов</b>: централизация (SIEM), синхронизация времени (NTP), защита от изменения, хранение по политике. Выборка и clipping levels (пороги, снижающие шум).</li>
<li><b>KPI</b> — насколько хорошо работает процесс (среднее время установки патча). <b>KRI</b> — ранний сигнал роста риска (число критичных непропатченных систем).</li>
<li><b>Управление учётками</b>: новые, изменённые, «осиротевшие», привилегированные.</li>
<li><b>Рассмотрение руководством</b> — регулярный анализ метрик и решения.</li>
<li><b>Проверка бэкапов</b> — <b>тестовые восстановления</b>. Непроверенный бэкап — надежда, а не мера защиты.</li>
<li>Метрики обучения и осведомлённости; результаты тестов DR/BC.</li>
<li><b>ISCM</b> (NIST SP 800-137): определить, создать, внедрить, анализировать/отчитываться, реагировать, пересматривать.</li></ul>`,
      },
    },
    {
      t: { en: 'Reporting, exceptions and ethical disclosure', ru: 'Отчётность, исключения и этичное раскрытие' },
      b: {
        en: `<ul><li>Reports are tailored to the audience: an <b>executive summary</b> (risk and business impact) for management, technical details for IT.</li>
<li><b>Remediation</b>: prioritized by risk, assigned owners and deadlines, then verified by retesting.</li>
<li><b>Exception handling</b>: when a finding can't be fixed, document the risk, apply compensating controls, get formal risk acceptance by the appropriate authority, and set an expiration and review date.</li>
<li><b>Ethical disclosure</b> of vulnerabilities found in third-party products: <b>responsible / coordinated disclosure</b> (notify the vendor privately and allow reasonable time) vs full disclosure. Bug bounty programs.</li></ul>`,
        ru: `<ul><li>Отчёт адаптирован к аудитории: <b>резюме для руководства</b> (риск и влияние на бизнес) и технические детали для ИТ.</li>
<li><b>Устранение</b>: приоритет по риску, ответственные и сроки, затем проверка повторным тестом.</li>
<li><b>Исключения</b>: если устранить нельзя — задокументировать риск, применить компенсирующие меры, получить формальное принятие риска уполномоченным лицом, установить срок действия и пересмотра.</li>
<li><b>Этичное раскрытие</b> уязвимостей в чужих продуктах: <b>ответственное / скоординированное</b> (сначала приватно производителю с разумным сроком) против полного раскрытия. Программы bug bounty.</li></ul>`,
      },
    },
    {
      t: { en: 'Audits and SOC reports', ru: 'Аудиты и SOC-отчёты' },
      b: {
        en: `<p>Auditors must be <b>independent</b> of the area they audit. Audit standards include SSAE 18 (US, AICPA) and ISAE 3402 (international). Frameworks: COBIT, ISO 27001, NIST.</p>`,
        ru: `<p>Аудитор должен быть <b>независим</b> от проверяемой области. Стандарты аудита: SSAE 18 (США, AICPA), ISAE 3402 (международный). Фреймворки: COBIT, ISO 27001, NIST.</p>`,
      },
      w: ['compare', { title: { en: 'SOC reports (AICPA SSAE 18)', ru: 'SOC-отчёты (AICPA SSAE 18)' }, cols: ['Report', 'Focus', 'Audience', 'Notes'], rows: [
        ['SOC 1', 'Controls relevant to <b>financial reporting</b> (ICFR)', 'Customer\'s auditors, restricted', 'Used for SOX compliance of customers'],
        ['SOC 2', '<b>Trust Services Criteria</b>: security, availability, processing integrity, confidentiality, privacy', 'Restricted (customers, regulators, under NDA)', 'Detailed. The usual choice for cloud/SaaS vendor assurance'],
        ['SOC 3', 'Same criteria as SOC 2', '<b>Public</b> / general use', 'Summary only, no detailed test results, can be posted on a website'],
        ['Type I', 'Design of controls at a <b>point in time</b>', '—', '"Are the controls suitably designed?"'],
        ['Type II', 'Design <b>and operating effectiveness</b> over a <b>period</b> (typically 6–12 months)', '—', 'Much stronger assurance'],
      ] }],
    },
  ],
  terms: [
    ['Security assessment', 'Comprehensive review of security of a system/program, producing recommendations.', 'Всесторонний анализ безопасности системы или программы с рекомендациями.'],
    ['Security audit', 'Formal independent evaluation against criteria, producing an attestation.', 'Формальная независимая проверка на соответствие критериям.'],
    ['Credentialed scan', 'Vulnerability scan using valid login credentials for deeper, more accurate results.', 'Сканирование с учётными данными: глубже и точнее.'],
    ['False negative', 'Failing to detect a real vulnerability or attack.', 'Пропуск реальной уязвимости или атаки.'],
    ['CVE', 'Common Vulnerabilities and Exposures — naming system for vulnerabilities.', 'Система наименования уязвимостей.'],
    ['CVSS', 'Common Vulnerability Scoring System — severity 0–10.', 'Система оценки серьёзности уязвимостей 0–10.'],
    ['SCAP', 'Security Content Automation Protocol — suite: CVE, CVSS, CPE, CCE, XCCDF, OVAL.', 'Набор стандартов автоматизации: CVE, CVSS, CPE, CCE, XCCDF, OVAL.'],
    ['XCCDF', 'Extensible Configuration Checklist Description Format.', 'Формат описания чек-листов конфигурации.'],
    ['OVAL', 'Open Vulnerability and Assessment Language for describing system state tests.', 'Язык описания проверок состояния системы.'],
    ['Black box test', 'Zero-knowledge test simulating an external attacker.', 'Тест без знаний о системе (внешний атакующий).'],
    ['White box test', 'Full-knowledge test with access to source code and documentation.', 'Тест с полными знаниями (код, документация).'],
    ['Rules of engagement', 'Agreed scope, methods, timing and constraints of a test.', 'Согласованные рамки, методы, время и ограничения теста.'],
    ['SAST', 'Static Application Security Testing — analyzes code without execution.', 'Статический анализ кода без выполнения.'],
    ['DAST', 'Dynamic Application Security Testing — tests the running application.', 'Динамическое тестирование работающего приложения.'],
    ['Fuzzing', 'Supplying invalid/random input to find crashes and flaws.', 'Подача некорректного ввода для поиска сбоев.'],
    ['Mutation fuzzing', 'Modifies existing valid inputs ("dumb" fuzzing).', 'Модификация реальных входных данных.'],
    ['Generational fuzzing', 'Generates inputs from a model of the expected format ("intelligent").', 'Генерация ввода по модели формата.'],
    ['Fagan inspection', 'Most formal code review process with defined phases.', 'Самый формальный процесс ревью кода.'],
    ['Misuse case', 'Test scenario describing how a system could be abused by an attacker.', 'Сценарий злоупотребления системой атакующим.'],
    ['Synthetic transaction', 'Scripted transaction run to proactively test functionality/performance.', 'Скриптовая транзакция для проактивной проверки.'],
    ['RUM', 'Real User Monitoring — passive capture of real user interactions.', 'Пассивный мониторинг реальных пользователей.'],
    ['KPI', 'Key Performance Indicator — measures process performance.', 'Ключевой показатель эффективности процесса.'],
    ['KRI', 'Key Risk Indicator — early warning of increasing risk.', 'Ключевой индикатор риска — ранний сигнал.'],
    ['Clipping level', 'Threshold below which events are not recorded/alerted, reducing noise.', 'Порог, ниже которого события не фиксируются.'],
    ['SOC 2 Type II', 'Report on design and operating effectiveness of trust services controls over a period.', 'Отчёт о дизайне и эффективности мер за период.'],
    ['SOC 3', 'General-use summary report on trust services criteria.', 'Публичный краткий отчёт.'],
    ['Coordinated disclosure', 'Reporting a vulnerability privately to the vendor, allowing time to fix before publication.', 'Скоординированное раскрытие: сначала производителю.'],
    ['BAS', 'Breach and Attack Simulation — automated continuous attack simulation.', 'Автоматизированная непрерывная имитация атак.'],
  ],
  questions: [
    { o: '6.2', d: 1, q: 'What is the MOST important prerequisite before starting a penetration test?', a: ['Written authorization from senior management defining scope', 'A list of all known vulnerabilities', 'Installation of an IDS', 'Notification of all employees'], c: 0,
      e: 'Without written permission, a pentest is illegal hacking. Scope and rules of engagement must be agreed.',
      r: 'Без письменного разрешения пентест — незаконный взлом; рамки и правила должны быть согласованы.' },
    { o: '6.2', d: 1, q: 'A penetration tester receives no information about the target in order to simulate an external attacker. This is a:', a: ['Black-box test', 'White-box test', 'Gray-box test', 'Crystal-box test'], c: 0,
      e: 'Black box means zero knowledge. White box means full knowledge. Gray box means partial knowledge.',
      r: 'Чёрный ящик — без знаний; белый — полные знания; серый — частичные.' },
    { o: '6.2', d: 2, q: 'Which type of test provides the MOST thorough coverage in the least time?', a: ['White-box (full knowledge) test', 'Black-box test', 'Gray-box test', 'Blind test'], c: 0,
      e: 'Full knowledge lets testers focus on real weaknesses without spending time on reconnaissance.',
      r: 'Полные знания позволяют сосредоточиться на реальных слабостях без затрат на разведку.' },
    { o: '6.2', d: 2, q: 'Which vulnerability scanning approach produces the MOST accurate results with the fewest false positives?', a: ['Credentialed (authenticated) scan', 'Non-credentialed external scan', 'Ping sweep', 'Passive network sniffing only'], c: 0,
      e: 'With credentials, the scanner can check installed patches and configurations directly.',
      r: 'С учётными данными сканер напрямую проверяет установленные патчи и конфигурации.' },
    { o: '6.2', d: 2, q: 'Which is the MOST dangerous outcome of a vulnerability scan?', a: ['A false negative', 'A false positive', 'A true positive', 'A true negative'], c: 0,
      e: 'A false negative hides a real vulnerability, giving false assurance. False positives only waste time.',
      r: 'Ложноотрицательный результат скрывает реальную уязвимость и даёт ложную уверенность; ложноположительный лишь отнимает время.' },
    { o: '6.2', d: 2, q: 'Which SCAP component provides a standardized severity score for vulnerabilities?', a: ['CVSS', 'CVE', 'CPE', 'XCCDF'], c: 0,
      e: 'CVSS scores severity (0–10). CVE names vulnerabilities. CPE names platforms. XCCDF describes checklists.',
      r: 'CVSS — оценка серьёзности (0–10); CVE — наименование; CPE — платформы; XCCDF — чек-листы.' },
    { o: '6.2', d: 2, q: 'Which testing technique analyzes source code for flaws without executing it?', a: ['Static application security testing (SAST)', 'Dynamic application security testing (DAST)', 'Fuzzing', 'Synthetic transactions'], c: 0,
      e: 'Static analysis inspects code at rest and can run early in the SDLC.',
      r: 'Статический анализ проверяет код без выполнения, его можно применять рано в SDLC.' },
    { o: '6.2', d: 2, q: 'A tester sends malformed and random input to an application to find crashes and unexpected behavior. This is:', a: ['Fuzzing', 'Regression testing', 'Code review', 'Unit testing'], c: 0,
      e: 'Fuzzing finds input-handling flaws such as buffer overflows and unhandled exceptions.',
      r: 'Фаззинг находит ошибки обработки ввода: переполнения буфера, необработанные исключения.' },
    { o: '6.2', d: 3, q: 'A fuzzer builds test inputs from a model of the file format\'s structure rather than altering sample files. This is:', a: ['Generational (intelligent) fuzzing', 'Mutation (dumb) fuzzing', 'Static analysis', 'Black-box regression'], c: 0,
      e: 'Generational fuzzing creates input from a specification. Mutation fuzzing modifies existing valid inputs.',
      r: 'Генерационный фаззинг создаёт ввод по спецификации; мутационный модифицирует существующие данные.' },
    { o: '6.2', d: 2, q: 'Which code review method is the MOST formal, with defined phases including planning, overview, preparation, inspection, rework and follow-up?', a: ['Fagan inspection', 'Pair programming', 'Over-the-shoulder review', 'Email pass-around'], c: 0,
      e: 'Fagan inspection is the most rigorous structured review process.',
      r: 'Инспекция Фагана — самый строгий структурированный процесс ревью.' },
    { o: '6.2', d: 2, q: 'Testers write scenarios describing how a malicious user might abuse the account-recovery feature. This is:', a: ['Misuse case testing', 'Use case testing', 'Load testing', 'Regression testing'], c: 0,
      e: 'Misuse (abuse) cases model attacker behavior against functionality.',
      r: 'Сценарии злоупотребления моделируют поведение атакующего против функциональности.' },
    { o: '6.2', d: 2, q: 'An organization runs scripted logins and purchases against its web store every 5 minutes to detect problems before customers do. This is:', a: ['Synthetic transaction monitoring', 'Real user monitoring', 'Penetration testing', 'Fuzzing'], c: 0,
      e: 'Synthetic transactions are proactive and scripted. RUM passively observes real users.',
      r: 'Синтетические транзакции — проактивные скрипты; RUM пассивно наблюдает реальных пользователей.' },
    { o: '6.2', d: 2, q: 'What does test coverage analysis measure?', a: ['The proportion of code or functionality exercised by tests', 'The number of vulnerabilities found', 'The time required to run tests', 'Network bandwidth used during testing'], c: 0,
      e: 'Coverage = tested ÷ total (e.g. branch, statement or function coverage).',
      r: 'Покрытие = протестировано ÷ всего (ветви, операторы, функции).' },
    { o: '6.2', d: 2, q: 'After a developer fixes a bug, the team re-runs the existing test suite to ensure nothing else broke. This is:', a: ['Regression testing', 'Acceptance testing', 'Fuzz testing', 'Penetration testing'], c: 0,
      e: 'Regression tests confirm that changes didn\'t introduce new defects.',
      r: 'Регрессионные тесты подтверждают, что изменения не внесли новых дефектов.' },
    { o: '6.3', d: 2, q: 'Which metric is a Key Risk Indicator rather than a Key Performance Indicator?', a: ['Number of internet-facing systems with critical unpatched vulnerabilities', 'Average time to close help-desk tickets', 'Percentage of staff completing training on time', 'Number of firewall changes processed per month'], c: 0,
      e: 'A KRI signals rising risk exposure. KPIs measure how well a process is performing.',
      r: 'KRI сигнализирует о росте риска; KPI измеряют эффективность процесса.' },
    { o: '6.3', d: 1, q: 'What is the BEST way to verify that backups are effective?', a: ['Perform periodic test restores', 'Check that backup jobs report "success"', 'Increase backup frequency', 'Encrypt backup media'], c: 0,
      e: 'Only a successful restore proves that a backup is usable.',
      r: 'Только успешное восстановление доказывает пригодность бэкапа.' },
    { o: '6.3', d: 2, q: 'Why is time synchronization critical for log review?', a: ['To correlate events accurately across systems and support investigations', 'To reduce log storage size', 'To encrypt log files', 'To speed up log searches'], c: 0,
      e: 'Without synchronized clocks (NTP), you can\'t reconstruct timelines across sources, and evidence may be challenged.',
      r: 'Без синхронизации (NTP) нельзя восстановить хронологию по разным источникам, а доказательства можно оспорить.' },
    { o: '6.3', d: 2, q: 'An administrator configures the system to log only failed logins that exceed 5 within 10 minutes. This threshold is called a:', a: ['Clipping level', 'Baseline', 'Sampling rate', 'Watermark'], c: 0,
      e: 'A clipping level sets a threshold that filters out routine noise.',
      r: 'Clipping level задаёт порог, отсеивающий обычный «шум».' },
    { o: '6.5', d: 2, q: 'A company needs to give its customers detailed assurance about the operating effectiveness of its security controls over the past year. Which report should it provide?', a: ['SOC 2 Type II', 'SOC 3', 'SOC 1 Type I', 'SOC 2 Type I'], c: 0,
      e: 'SOC 2 Type II covers security criteria and operating effectiveness over a period. SOC 3 is a public summary without details.',
      r: 'SOC 2 Type II — критерии безопасности и эффективность за период; SOC 3 — публичная сводка без деталей.' },
    { o: '6.5', d: 2, q: 'A cloud provider wants to publish a security assurance report on its public website. Which report is designed for this?', a: ['SOC 3', 'SOC 2 Type II', 'SOC 1 Type II', 'Penetration test report'], c: 0,
      e: 'SOC 3 is for general use. SOC 1 and SOC 2 are restricted-use reports.',
      r: 'SOC 3 — для общего использования; SOC 1 и SOC 2 — ограниченного.' },
    { o: '6.5', d: 2, q: 'Which SOC report focuses on controls relevant to a customer\'s financial reporting?', a: ['SOC 1', 'SOC 2', 'SOC 3', 'SOC for Cybersecurity'], c: 0,
      e: 'SOC 1 covers internal control over financial reporting (ICFR) and supports customers\' SOX audits.',
      r: 'SOC 1 — внутренний контроль над финансовой отчётностью, поддерживает SOX-аудит клиентов.' },
    { o: '6.5', d: 2, q: 'What is the MOST important characteristic of an auditor?', a: ['Independence from the area being audited', 'Deep programming skills', 'Membership in the IT department', 'Ability to fix the issues found'], c: 0,
      e: 'Independence ensures objectivity. Auditors shouldn\'t audit their own work or fix the issues they report.',
      r: 'Независимость обеспечивает объективность; аудитор не проверяет свою работу и не устраняет найденное сам.' },
    { o: '6.1', d: 2, q: 'A regulator hires an independent firm to audit a bank on the regulator\'s behalf. This is a:', a: ['Third-party audit', 'Internal audit', 'Self-assessment', 'External audit commissioned by the bank'], c: 0,
      e: 'A third-party audit is performed by or for an outside party (regulator, customer), not the audited organization itself.',
      r: 'Аудит третьей стороной проводит внешняя сторона (регулятор, клиент) или её подрядчик, а не сама проверяемая организация.' },
    { o: '6.4', d: 2, q: 'A critical vulnerability cannot be patched for six months due to vendor constraints. What should be done?', a: ['Document an exception with compensating controls and formal risk acceptance by management, with an expiration date', 'Ignore it until the patch is available', 'Remove it from the report', 'Shut down the business process permanently'], c: 0,
      e: 'Exception handling means documented risk, compensating controls, approval by an appropriate authority, and periodic review.',
      r: 'Исключение: задокументированный риск, компенсирующие меры, одобрение уполномоченным лицом, периодический пересмотр.' },
    { o: '6.4', d: 2, q: 'Who is the PRIMARY audience for the executive summary of a penetration test report?', a: ['Senior management', 'System administrators', 'Developers', 'External attackers'], c: 0,
      e: 'The executive summary conveys business risk for decision-makers. The technical details are for IT.',
      r: 'Резюме передаёт бизнес-риск лицам, принимающим решения; технические детали — для ИТ.' },
    { o: '6.4', d: 2, q: 'A security researcher discovers a vulnerability in a vendor\'s product. What is the MOST ethical approach?', a: ['Privately notify the vendor and allow reasonable time to fix before public disclosure', 'Immediately publish exploit code', 'Sell the vulnerability to the highest bidder', 'Say nothing to anyone'], c: 0,
      e: 'Coordinated (responsible) disclosure balances user protection with transparency.',
      r: 'Скоординированное раскрытие балансирует защиту пользователей и прозрачность.' },
    { o: '6.2', d: 2, q: 'Which testing type focuses on verifying APIs, user interfaces and physical interfaces?', a: ['Interface testing', 'Unit testing', 'Load testing', 'Black-box penetration testing'], c: 0,
      e: 'Interface testing covers application programming interfaces, user interfaces and physical interfaces.',
      r: 'Тестирование интерфейсов: программные (API), пользовательские и физические.' },
    { o: '6.3', d: 3, q: 'Which NIST publication describes Information Security Continuous Monitoring (ISCM)?', a: ['SP 800-137', 'SP 800-88', 'SP 800-34', 'SP 800-63'], c: 0,
      e: 'SP 800-137 covers ISCM. SP 800-88 is sanitization, 800-34 is contingency planning, and 800-63 is digital identity.',
      r: 'SP 800-137 — ISCM; 800-88 — санитизация; 800-34 — планирование непрерывности; 800-63 — цифровая идентичность.' },
    { o: '6.2', d: 3, q: 'An organization wants continuous, automated validation that its controls detect techniques mapped to MITRE ATT&CK, without hiring a red team each time. What should it use?', a: ['Breach and attack simulation (BAS)', 'Annual SOC 2 audit', 'Static code analysis', 'Manual log review'], c: 0,
      e: 'BAS platforms safely emulate attacker techniques on a continuous basis and measure detection and prevention.',
      r: 'Платформы BAS безопасно и непрерывно эмулируют техники атак и измеряют обнаружение и предотвращение.' },
    { t: 'order', o: '6.2', d: 2, q: 'Order the penetration testing phases according to NIST SP 800-115.', items: ['Planning', 'Discovery', 'Attack', 'Reporting'],
      e: 'Planning → Discovery → Attack → Reporting (reporting also happens throughout).', r: 'Планирование → обнаружение → атака → отчётность (отчётность ведётся и по ходу).' },
    { t: 'match', o: '6.5', d: 2, q: 'Match each SOC report to its description.', pairs: [['SOC 1', 'Financial reporting controls'], ['SOC 2', 'Detailed trust services criteria, restricted use'], ['SOC 3', 'Public summary of trust services'], ['Type II', 'Operating effectiveness over a period']],
      e: 'SOC 1 = financial, SOC 2 = detailed security, SOC 3 = public. Type II = over a period.', r: 'SOC 1 — финансы, SOC 2 — детально про безопасность, SOC 3 — публичный; Type II — за период.' },
  ],
});
