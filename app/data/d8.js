'use strict';
CISSP.domain({
  id: 8, weight: 10,
  title: { en: 'Software Development Security', ru: 'Безопасность разработки ПО' },
  summary: {
    en: 'Security in the SDLC, development methodologies (Waterfall, Agile, DevSecOps), maturity models (CMMI, SAMM), development ecosystem controls, application and database security, secure coding and OWASP, acquired software risk, malicious code.',
    ru: 'Безопасность в SDLC, методологии разработки (Waterfall, Agile, DevSecOps), модели зрелости (CMMI, SAMM), меры в среде разработки, безопасность приложений и БД, безопасное программирование и OWASP, риски приобретаемого ПО, вредоносный код.',
  },
  objectives: [
    ['8.1', 'Understand and integrate security in the Software Development Life Cycle (SDLC) (methodologies, maturity models, operation & maintenance, change management, IPT)'],
    ['8.2', 'Identify and apply security controls in software development ecosystems (languages, libraries, toolsets, IDE, runtime, CI/CD, SOAR, SCM, code repositories, application security testing)'],
    ['8.3', 'Assess the effectiveness of software security (auditing and logging of changes, risk analysis and mitigation)'],
    ['8.4', 'Assess security impact of acquired software (COTS, open source, third-party, managed services)'],
    ['8.5', 'Define and apply secure coding guidelines and standards (source-code weaknesses, APIs, secure coding practices, software-defined security)'],
  ],
  concepts: [
    {
      t: { en: 'Security in the SDLC', ru: 'Безопасность в жизненном цикле разработки' },
      b: {
        en: `<p>Security is cheapest when built in <b>early</b>: a defect found in requirements costs a fraction of one found in production. "Shift left." Security requirements are defined at the start, alongside functional ones.</p>
<p>An <b>Integrated Product Team (IPT)</b> brings together stakeholders (developers, security, operations, business) throughout the project.</p>`,
        ru: `<p>Безопасность дешевле всего, если заложить её <b>рано</b>: дефект в требованиях стоит малую долю дефекта в продуктиве («shift left»). Требования безопасности определяются в начале вместе с функциональными.</p>
<p><b>Интегрированная продуктовая команда (IPT)</b> объединяет заинтересованные стороны (разработка, ИБ, эксплуатация, бизнес) на протяжении проекта.</p>`,
      },
      w: ['flow', { title: { en: 'SDLC with security activities', ru: 'SDLC и активности безопасности' }, steps: [
        { t: 'Initiation / requirements', d: { en: 'Define security and privacy requirements, classify data, legal and regulatory needs, initial risk assessment.', ru: 'Требования безопасности и приватности, классификация данных, правовые требования, первичная оценка рисков.' } },
        { t: 'Design', d: { en: 'Threat modeling, secure architecture, attack surface reduction, design review.', ru: 'Моделирование угроз, безопасная архитектура, сокращение поверхности атаки, ревью дизайна.' } },
        { t: 'Development', d: { en: 'Secure coding standards, peer code review, SAST, SCA for dependencies, secrets scanning.', ru: 'Стандарты безопасного кодирования, ревью, SAST, SCA зависимостей, поиск секретов.' } },
        { t: 'Testing', d: { en: 'DAST, fuzzing, pentest, misuse cases, regression, UAT. Testers should be independent of the developers.', ru: 'DAST, фаззинг, пентест, сценарии злоупотребления, регрессия, UAT; тестировщики независимы от разработчиков.' } },
        { t: 'Deployment', d: { en: 'Secure configuration, certification and accreditation (ATO), separation of environments, code signing.', ru: 'Безопасная конфигурация, сертификация и аккредитация, разделение сред, подпись кода.' } },
        { t: 'Operations & maintenance', d: { en: 'Patching, monitoring, change management, vulnerability management.', ru: 'Патчи, мониторинг, управление изменениями и уязвимостями.' } },
        { t: 'Disposal', d: { en: 'Data retention and migration, sanitization, decommissioning.', ru: 'Хранение и миграция данных, санитизация, вывод из эксплуатации.' } },
      ] }],
    },
    {
      t: { en: 'Development methodologies', ru: 'Методологии разработки' },
      b: { en: '<p>Know the strengths and weaknesses of each methodology and where security fits in.</p>', ru: '<p>Знайте сильные и слабые стороны каждой методологии и место безопасности в ней.</p>' },
      w: ['compare', { title: { en: 'Methodologies', ru: 'Методологии' }, cols: ['Model', 'Characteristics', 'Security notes'], rows: [
        ['Waterfall', 'Sequential phases. Each must finish before the next; returning to a previous phase is limited', 'Clear documentation and gates, but late discovery of flaws is expensive'],
        ['Modified waterfall / V-model', 'Waterfall with verification and validation at each phase', 'Testing is planned alongside each development phase'],
        ['Spiral', 'Iterative, <b>risk-driven</b>. Each loop: objectives → risk analysis → develop/test → plan', 'Explicit risk analysis in every iteration. Good for large, high-risk projects'],
        ['Agile (Scrum, XP, Kanban)', 'Short sprints, working software, customer collaboration, responding to change', 'Security must be part of user stories, the definition of done, and automated tests'],
        ['RAD / prototyping', 'Rapid prototypes and user feedback', 'Prototypes risk becoming production without hardening'],
        ['DevOps / DevSecOps', 'Dev + Ops (+ Sec) collaboration, CI/CD automation, infrastructure as code', 'Automated SAST/DAST/SCA in the pipeline, shared responsibility for security'],
        ['Cleanroom', 'Formal methods to prevent defects rather than remove them', 'High-quality, high-assurance code'],
      ] }],
    },
    {
      t: { en: 'Maturity models', ru: 'Модели зрелости' },
      b: {
        en: `<p><b>CMMI / SW-CMM</b> (Carnegie Mellon SEI) measures process maturity across 5 levels. <b>OWASP SAMM</b> (Software Assurance Maturity Model) is a prescriptive, open model with 5 business functions: Governance, Design, Implementation, Verification, Operations. <b>BSIMM</b> is <i>descriptive</i>: it measures what real organizations actually do. The <b>IDEAL</b> model (SEI) is for process improvement: Initiating, Diagnosing, Establishing, Acting, Learning.</p>`,
        ru: `<p><b>CMMI / SW-CMM</b> (SEI Карнеги-Меллон) — зрелость процессов, 5 уровней. <b>OWASP SAMM</b> — предписывающая открытая модель, 5 бизнес-функций: Governance, Design, Implementation, Verification, Operations. <b>BSIMM</b> — <i>описательная</i>: что реально делают организации. <b>IDEAL</b> (SEI) — модель улучшения процессов: Initiating, Diagnosing, Establishing, Acting, Learning.</p>`,
      },
      w: ['layers', { title: 'Capability Maturity Model (SW-CMM / CMMI)', items: [
        { n: 1, t: 'Initial', d: { en: 'Chaotic, ad hoc. Success depends on individual heroics.', ru: 'Хаос, всё ad hoc; успех держится на героизме отдельных людей.' } },
        { n: 2, t: 'Repeatable / Managed', d: { en: 'Basic project management, so processes can be repeated on similar projects.', ru: 'Базовое управление проектами, процессы повторяемы.' } },
        { n: 3, t: 'Defined', d: { en: 'Standardized, documented processes across the organization.', ru: 'Стандартизированные задокументированные процессы во всей организации.' } },
        { n: 4, t: 'Quantitatively Managed', d: { en: 'Processes are measured and controlled with metrics.', ru: 'Процессы измеряются и управляются метриками.' } },
        { n: 5, t: 'Optimizing', d: { en: 'Continuous process improvement.', ru: 'Непрерывное улучшение процессов.' } },
      ] }],
    },
    {
      t: { en: 'Development ecosystem controls', ru: 'Меры в экосистеме разработки' },
      b: {
        en: `<ul><li><b>Programming languages</b>: compiled vs interpreted. Memory-safe languages (Rust, Go, Java, C#) avoid whole classes of bugs, while C/C++ are prone to buffer overflows. Generations run from 1GL (machine code) to 5GL (natural language / AI).</li>
<li><b>Libraries and dependencies</b>: <b>Software Composition Analysis (SCA)</b> finds vulnerable or outdated open-source components and license issues. Produce an SBOM. Watch for <b>dependency confusion</b> and typosquatting.</li>
<li><b>Toolsets and IDE</b>: secure plugins and linters, and the IDE itself is an attack surface.</li>
<li><b>Runtime</b>: sandboxes and VMs (JVM, .NET CLR), containers, least-privilege service accounts.</li>
<li><b>CI/CD pipeline</b>: protect the pipeline as production. Signed commits and builds, protected branches, mandatory reviews, secrets in a vault (never in code), artifact signing, SLSA provenance.</li>
<li><b>SCM (Software Configuration Management)</b>: version control, baselines, change tracking and auditing of code changes. <b>Code repositories</b> need access control, MFA, and branch protection, and must not be public by mistake.</li>
<li><b>Application security testing</b>: SAST, DAST, IAST, SCA, RASP (Domain 6).</li>
<li><b>Separation of environments</b>: dev / test / prod, no production data in test, developers shouldn't have production access (separation of duties).</li></ul>`,
        ru: `<ul><li><b>Языки</b>: компилируемые и интерпретируемые. Безопасные по памяти (Rust, Go, Java, C#) исключают целые классы ошибок; C/C++ склонны к переполнениям. Поколения: от 1GL (машинный код) до 5GL (естественный язык / ИИ).</li>
<li><b>Библиотеки и зависимости</b>: <b>SCA</b> находит уязвимые и устаревшие компоненты, проблемы лицензий; формировать SBOM. Риски: <b>dependency confusion</b>, тайпсквоттинг.</li>
<li><b>Инструменты и IDE</b>: безопасные плагины и линтеры; IDE — тоже поверхность атаки.</li>
<li><b>Среда выполнения</b>: песочницы и ВМ (JVM, .NET CLR), контейнеры, сервисные учётки с минимальными правами.</li>
<li><b>CI/CD</b>: защищать конвейер как продуктив. Подписанные коммиты и сборки, защищённые ветки, обязательное ревью, секреты в хранилище (никогда в коде), подпись артефактов, SLSA.</li>
<li><b>SCM</b> (управление конфигурацией ПО): контроль версий, базовые линии, отслеживание и аудит изменений кода. <b>Репозитории</b>: контроль доступа, MFA, защита веток, не открывать публично по ошибке.</li>
<li><b>Тестирование безопасности</b>: SAST, DAST, IAST, SCA, RASP (Домен 6).</li>
<li><b>Разделение сред</b>: dev / test / prod, без продуктивных данных в тесте, у разработчиков нет доступа в продуктив (разделение обязанностей).</li></ul>`,
      },
    },
    {
      t: { en: 'Secure coding and common weaknesses', ru: 'Безопасное кодирование и типичные уязвимости' },
      b: {
        en: `<ul><li><b>Input validation</b>: on the <b>server side</b>, with an <b>allow list</b> (accept known good), checking type, length, format and range. Client-side validation is for usability only.</li>
<li><b>Output encoding</b> (against XSS), <b>parameterized queries / prepared statements</b> (against SQL injection), least privilege for DB accounts, secure error handling (generic messages to users, details only in logs), secure session management, safe deserialization.</li>
<li><b>API security</b>: authentication (OAuth 2.0 / OIDC tokens, API keys aren't authentication by themselves), authorization per object (avoid BOLA/IDOR), rate limiting, input validation, TLS, an API gateway.</li>
<li><b>Software-defined security</b>: security policy as code, enforced automatically by the infrastructure.</li>
<li>Standards: OWASP ASVS, OWASP Top 10, CWE Top 25, CERT secure coding, NIST SSDF (SP 800-218).</li></ul>`,
        ru: `<ul><li><b>Проверка ввода</b>: на <b>стороне сервера</b>, по <b>белому списку</b> (разрешено известное хорошее), тип, длина, формат, диапазон. Проверка на клиенте — только для удобства.</li>
<li><b>Кодирование вывода</b> (против XSS), <b>параметризованные запросы</b> (против SQL-инъекций), минимальные права учёток БД, безопасная обработка ошибок (пользователю общее сообщение, детали — в журнал), безопасные сессии, безопасная десериализация.</li>
<li><b>Безопасность API</b>: аутентификация (токены OAuth 2.0/OIDC; API-ключ сам по себе не аутентификация), авторизация на уровне объектов (против BOLA/IDOR), ограничение частоты, проверка ввода, TLS, API-шлюз.</li>
<li><b>Программно-определяемая безопасность</b>: политика как код, автоматически применяемая инфраструктурой.</li>
<li>Стандарты: OWASP ASVS, OWASP Top 10, CWE Top 25, CERT, NIST SSDF (SP 800-218).</li></ul>`,
      },
      w: ['compare', { title: { en: 'Source-code weaknesses and defenses', ru: 'Уязвимости кода и защита' }, cols: ['Weakness', 'What happens', 'Defense'], rows: [
        ['SQL injection', 'Untrusted input changes the query logic (\' OR 1=1 --)', 'Parameterized queries, stored procedures, input validation, least-privilege DB account'],
        ['Cross-site scripting (XSS)', 'Attacker script runs in the victim\'s browser (reflected, stored, DOM)', 'Output encoding, input validation, Content Security Policy, HttpOnly cookies'],
        ['Cross-site request forgery (CSRF)', 'Victim\'s browser sends an authenticated request the user didn\'t intend', 'Anti-CSRF tokens, SameSite cookies, re-authentication'],
        ['Buffer overflow', 'Writing past a buffer overwrites memory and enables code execution', 'Bounds checking, memory-safe languages, ASLR, DEP/NX, stack canaries'],
        ['Race condition / TOCTOU', 'State changes between check and use', 'Atomic operations, locking'],
        ['Insecure direct object reference (IDOR/BOLA)', 'Changing an ID in a request accesses others\' data', 'Server-side authorization check per object'],
        ['Server-side request forgery (SSRF)', 'Server is tricked into requesting internal resources', 'Allow-list destinations, block metadata endpoints, network segmentation'],
        ['Insecure deserialization', 'Crafted serialized objects execute code', 'Don\'t deserialize untrusted data; integrity checks'],
        ['Back door / maintenance hook', 'Undocumented access path left by developers', 'Code review, remove before production'],
        ['Hard-coded credentials', 'Secrets in source code or repos', 'Secrets vault, secret scanning'],
      ] }],
    },
    {
      t: { en: 'Databases', ru: 'Базы данных' },
      b: {
        en: `<ul><li>DBMS models: hierarchical (tree), network, <b>relational</b> (tables: rows are <b>tuples</b>, columns are <b>attributes</b>. The number of rows is <b>cardinality</b> and the number of columns is <b>degree</b>), object-oriented, NoSQL (key-value, document, graph).</li>
<li>Keys: <b>primary</b> (unique row identifier), <b>candidate</b>, <b>foreign</b> (enforces <b>referential integrity</b>).</li>
<li><b>ACID</b>: <b>Atomicity</b> (all or nothing), <b>Consistency</b> (valid state to valid state), <b>Isolation</b> (concurrent transactions don't interfere), <b>Durability</b> (committed means permanent).</li>
<li>Security: <b>views</b> (restrict what users see), <b>polyinstantiation</b>, <b>concurrency control / locking</b> (prevents lost updates and dirty reads), <b>commit / rollback / savepoints</b>, encryption (TDE, column-level), and controls for aggregation and inference.</li>
<li><b>Data warehouses</b> (consolidated data for analysis) and <b>data mining</b> (finding patterns) increase aggregation risk. Metadata is "data about data".</li>
<li>Interfaces: ODBC, JDBC, OLE DB, ADO. Each needs least privilege and encryption.</li></ul>`,
        ru: `<ul><li>Модели СУБД: иерархическая (дерево), сетевая, <b>реляционная</b> (таблицы: строки — <b>кортежи</b>, столбцы — <b>атрибуты</b>; число строк — <b>кардинальность</b>, число столбцов — <b>степень</b>), объектная, NoSQL (ключ-значение, документная, графовая).</li>
<li>Ключи: <b>первичный</b> (уникальный идентификатор строки), <b>потенциальный</b>, <b>внешний</b> (обеспечивает <b>ссылочную целостность</b>).</li>
<li><b>ACID</b>: <b>атомарность</b> (всё или ничего), <b>согласованность</b> (из корректного состояния в корректное), <b>изолированность</b> (параллельные транзакции не мешают), <b>долговечность</b> (зафиксировано — навсегда).</li>
<li>Безопасность: <b>представления</b> (ограничивают видимое), <b>полиинстанцирование</b>, <b>управление параллелизмом и блокировки</b> (против потерянных обновлений и «грязного» чтения), <b>commit / rollback / savepoints</b>, шифрование (TDE, по столбцам), контроль агрегации и вывода.</li>
<li><b>Хранилища данных</b> (консолидация для анализа) и <b>data mining</b> (поиск закономерностей) повышают риск агрегации. Метаданные — «данные о данных».</li>
<li>Интерфейсы: ODBC, JDBC, OLE DB, ADO — каждому минимальные права и шифрование.</li></ul>`,
      },
    },
    {
      t: { en: 'Acquired software', ru: 'Приобретаемое ПО' },
      b: {
        en: `<ul><li><b>COTS</b> (commercial off-the-shelf): you can't see the code. Rely on vendor reputation, certifications (Common Criteria), patch cadence, contracts and SLAs, and test it in your environment. Change insecure defaults.</li>
<li><b>Open source</b>: the code is visible, but maintenance and support vary. Run SCA for known CVEs, review licenses (GPL obligations), and check whether the project is actively maintained.</li>
<li><b>Third-party / custom development</b>: contractual secure-development requirements, the right to audit, code review, acceptance testing, and <b>source code escrow</b> (protects you if the vendor goes out of business).</li>
<li><b>Managed services (SaaS, PaaS, IaaS)</b>: the shared responsibility model, SOC 2 Type II, data location, exit strategy (data portability), and vendor lock-in.</li>
<li>Assessment: due diligence questionnaires, security testing, contract clauses, ongoing monitoring.</li></ul>`,
        ru: `<ul><li><b>COTS</b> — коробочное ПО: кода не видно; полагаемся на репутацию, сертификаты (Common Criteria), регулярность патчей, договор и SLA; тестируем в своей среде, меняем небезопасные умолчания.</li>
<li><b>Open source</b> — код открыт, но поддержка разная: SCA на известные CVE, проверка лицензий (обязательства GPL), активность проекта.</li>
<li><b>Заказная разработка</b>: требования безопасной разработки в договоре, право на аудит, ревью кода, приёмочное тестирование, <b>депонирование исходного кода (escrow)</b> — защита на случай банкротства поставщика.</li>
<li><b>Облачные сервисы (SaaS, PaaS, IaaS)</b>: разделённая ответственность, SOC 2 Type II, место хранения данных, стратегия выхода (переносимость данных), зависимость от поставщика.</li>
<li>Оценка: опросники, тестирование, условия договора, постоянный мониторинг.</li></ul>`,
      },
    },
    {
      t: { en: 'Malicious code', ru: 'Вредоносный код' },
      b: {
        en: `<ul><li><b>Virus</b>: needs a host and user action to spread. Types: <b>boot sector</b>, <b>file infector</b>, <b>macro</b> (Office documents), <b>multipartite</b> (several vectors), <b>polymorphic</b> (changes its signature each time), <b>encrypted</b>, <b>stealth</b> (hides changes), <b>service injection</b>.</li>
<li><b>Worm</b>: self-replicating over networks with <b>no user interaction</b> (e.g. WannaCry, the Morris worm).</li>
<li><b>Trojan horse</b>: appears useful but carries a malicious payload. <b>RAT</b> (remote access trojan).</li>
<li><b>Logic bomb</b>: triggered by a condition such as a date or event, often planted by insiders.</li>
<li><b>Rootkit</b>: hides deep in the system (kernel, firmware) to maintain privileged, stealthy access.</li>
<li><b>Ransomware</b>: encrypts or exfiltrates data for extortion. <b>Spyware / adware</b>, <b>fileless malware</b> (lives in memory and uses legitimate tools like PowerShell, "living off the land"), <b>botnets</b> (C2-controlled zombies).</li>
<li><b>APT</b> (Advanced Persistent Threat): a well-resourced, stealthy, long-term targeted actor.</li></ul>`,
        ru: `<ul><li><b>Вирус</b> — нужен носитель и действие пользователя. Виды: <b>загрузочный</b>, <b>файловый</b>, <b>макровирус</b> (документы Office), <b>многокомпонентный</b> (multipartite), <b>полиморфный</b> (меняет сигнатуру), <b>зашифрованный</b>, <b>стелс</b> (скрывает изменения), <b>внедрение в службы</b>.</li>
<li><b>Червь</b> — самораспространение по сети <b>без участия пользователя</b> (WannaCry, червь Морриса).</li>
<li><b>Троян</b> — выглядит полезным, несёт вредоносную нагрузку; <b>RAT</b> — троян удалённого доступа.</li>
<li><b>Логическая бомба</b> — срабатывает по условию (дата, событие), часто закладывают инсайдеры.</li>
<li><b>Руткит</b> — прячется глубоко (ядро, прошивка) для скрытного привилегированного доступа.</li>
<li><b>Вымогатель</b> — шифрование или кража данных ради выкупа. <b>Шпионское и рекламное ПО</b>, <b>бесфайловое</b> (в памяти, через легитимные инструменты вроде PowerShell — «living off the land»), <b>ботнеты</b> (зомби под управлением C2).</li>
<li><b>APT</b> — хорошо оснащённый, скрытный, долгосрочный целевой атакующий.</li></ul>`,
      },
    },
  ],
  terms: [
    ['SDLC', 'Software Development Life Cycle — phases from requirements to disposal.', 'Жизненный цикл разработки ПО.'],
    ['Shift left', 'Moving security activities earlier in the SDLC.', 'Перенос активностей безопасности на ранние этапы.'],
    ['Waterfall', 'Sequential development model with distinct phases.', 'Последовательная модель разработки.'],
    ['Spiral model', 'Iterative, risk-driven development model.', 'Итеративная риск-ориентированная модель.'],
    ['Agile', 'Iterative incremental development with short sprints and continuous feedback.', 'Итеративная разработка короткими спринтами.'],
    ['DevSecOps', 'Integrating security into DevOps pipelines and culture.', 'Интеграция безопасности в DevOps.'],
    ['CI/CD', 'Continuous Integration / Continuous Delivery or Deployment.', 'Непрерывная интеграция и поставка.'],
    ['IPT', 'Integrated Product Team — cross-functional stakeholders working together.', 'Интегрированная кросс-функциональная команда.'],
    ['CMMI', 'Capability Maturity Model Integration: 5 levels Initial → Optimizing.', 'Модель зрелости возможностей: 5 уровней.'],
    ['OWASP SAMM', 'Software Assurance Maturity Model — prescriptive, 5 business functions.', 'Модель зрелости обеспечения безопасности ПО.'],
    ['BSIMM', 'Building Security In Maturity Model — descriptive, based on observed practices.', 'Описательная модель зрелости по реальным практикам.'],
    ['IDEAL model', 'Initiating, Diagnosing, Establishing, Acting, Learning — process improvement.', 'Модель улучшения процессов SEI.'],
    ['SCA', 'Software Composition Analysis — identifies vulnerable third-party components.', 'Анализ состава ПО — уязвимые сторонние компоненты.'],
    ['SCM', 'Software Configuration Management — version control and change tracking of code.', 'Управление конфигурацией ПО.'],
    ['Source code escrow', 'Third party holds source code, released if vendor fails.', 'Депонирование исходного кода у третьей стороны.'],
    ['COTS', 'Commercial off-the-shelf software.', 'Коробочное коммерческое ПО.'],
    ['Input validation', 'Server-side checking of input against allowed patterns (allow list).', 'Серверная проверка ввода по белому списку.'],
    ['Parameterized query', 'Prepared statement separating SQL code from data — prevents SQL injection.', 'Подготовленный запрос — защита от SQL-инъекций.'],
    ['XSS', 'Cross-site scripting: injecting script into pages viewed by others.', 'Межсайтовый скриптинг.'],
    ['CSRF', 'Cross-site request forgery: forcing a user\'s browser to send unwanted authenticated requests.', 'Межсайтовая подделка запроса.'],
    ['Buffer overflow', 'Writing beyond buffer bounds, potentially executing code.', 'Переполнение буфера.'],
    ['IDOR / BOLA', 'Insecure direct object reference / broken object-level authorization.', 'Небезопасная прямая ссылка на объект.'],
    ['SSRF', 'Server-side request forgery: making the server request internal resources.', 'Подделка серверного запроса.'],
    ['ACID', 'Atomicity, Consistency, Isolation, Durability — transaction properties.', 'Атомарность, согласованность, изолированность, долговечность.'],
    ['Referential integrity', 'Foreign keys must reference existing primary keys.', 'Внешние ключи ссылаются на существующие первичные.'],
    ['Cardinality', 'Number of rows (tuples) in a relational table.', 'Число строк в таблице.'],
    ['Degree', 'Number of columns (attributes) in a relational table.', 'Число столбцов в таблице.'],
    ['Database view', 'Virtual table restricting what data a user can see.', 'Виртуальная таблица, ограничивающая видимые данные.'],
    ['Polymorphic virus', 'Virus that changes its code/signature with each infection.', 'Вирус, меняющий сигнатуру при каждом заражении.'],
    ['Multipartite virus', 'Virus using multiple infection vectors (boot sector + files).', 'Вирус с несколькими векторами заражения.'],
    ['Worm', 'Self-replicating malware spreading without user interaction.', 'Самораспространяющийся вредонос без участия пользователя.'],
    ['Logic bomb', 'Malicious code triggered by a specific condition or date.', 'Код, срабатывающий по условию или дате.'],
    ['Rootkit', 'Malware hiding at a privileged level to maintain stealthy access.', 'Вредонос, скрывающийся на привилегированном уровне.'],
    ['Fileless malware', 'Malware operating in memory using legitimate system tools.', 'Бесфайловый вредонос в памяти.'],
    ['NIST SSDF', 'Secure Software Development Framework (SP 800-218).', 'Фреймворк безопасной разработки ПО NIST.'],
  ],
  questions: [
    { o: '8.1', d: 1, q: 'At which phase of the SDLC is it MOST cost-effective to address security?', a: ['Requirements and design', 'Testing', 'Deployment', 'Operations and maintenance'], c: 0,
      e: 'Fixing issues early ("shift left") costs far less than fixing them in production.',
      r: 'Исправление на ранних этапах («shift left») обходится гораздо дешевле, чем в продуктиве.' },
    { o: '8.1', d: 2, q: 'Which software development model is iterative and explicitly includes risk analysis in every cycle?', a: ['Spiral', 'Waterfall', 'Cleanroom', 'Big bang'], c: 0,
      e: 'The spiral model (Boehm) is risk-driven. Each loop includes planning, risk analysis, engineering and evaluation.',
      r: 'Спиральная модель (Бём) риск-ориентирована: каждый виток включает планирование, анализ рисков, разработку и оценку.' },
    { o: '8.1', d: 2, q: 'A development team works in two-week sprints delivering working software and adjusting to changing requirements. How should security be integrated?', a: ['Include security requirements in user stories, the definition of done, and automated tests each sprint', 'Perform a single security review after the final sprint', 'Security is not compatible with Agile', 'Only test security in production'], c: 0,
      e: 'In Agile, security must be continuous: security stories, abuse cases, automated testing in CI, and threat modeling per feature.',
      r: 'В Agile безопасность должна быть непрерывной: истории безопасности, сценарии злоупотребления, автотесты в CI, моделирование угроз для каждой функции.' },
    { o: '8.1', d: 2, q: 'In the Capability Maturity Model, which level is characterized by standardized, documented processes across the organization?', a: ['Level 3 — Defined', 'Level 2 — Repeatable', 'Level 4 — Quantitatively Managed', 'Level 5 — Optimizing'], c: 0,
      e: '1 Initial → 2 Repeatable/Managed → 3 Defined → 4 Quantitatively Managed → 5 Optimizing.',
      r: '1 Начальный → 2 Повторяемый → 3 Определённый → 4 Количественно управляемый → 5 Оптимизирующий.' },
    { o: '8.1', d: 1, q: 'In the CMM, an organization whose software projects succeed mainly through individual effort without defined processes is at which level?', a: ['Initial', 'Repeatable', 'Defined', 'Optimizing'], c: 0,
      e: 'Level 1 (Initial) is chaotic and ad hoc, relying on heroics.',
      r: 'Уровень 1 (Initial) — хаос и ad hoc, всё держится на героизме.' },
    { o: '8.1', d: 2, q: 'Which maturity model is descriptive, measuring the software security activities that real organizations actually perform?', a: ['BSIMM', 'OWASP SAMM', 'CMMI', 'IDEAL'], c: 0,
      e: 'BSIMM describes observed practices. SAMM is prescriptive guidance for building a program.',
      r: 'BSIMM описывает наблюдаемые практики; SAMM — предписывающее руководство по построению программы.' },
    { o: '8.1', d: 2, q: 'Who should approve a change to a production application\'s code?', a: ['The change management process (e.g. CAB), after review and testing', 'The developer who wrote it', 'Any member of the IT department', 'The end user who requested it'], c: 0,
      e: 'Formal change management ensures review, testing and approval, and that the developer is not deploying their own changes (separation of duties).',
      r: 'Формальное управление изменениями обеспечивает ревью, тесты, одобрение и то, что разработчик не выкатывает свои изменения сам (разделение обязанностей).' },
    { o: '8.2', d: 2, q: 'Developers should NOT have direct access to production systems PRIMARILY because of:', a: ['Separation of duties', 'Performance concerns', 'Licensing costs', 'Network latency'], c: 0,
      e: 'Separating development from operations prevents unauthorized or untested changes and fraud.',
      r: 'Разделение разработки и эксплуатации предотвращает несанкционированные или непротестированные изменения и мошенничество.' },
    { o: '8.2', d: 2, q: 'Which tool identifies known vulnerabilities and license issues in third-party open-source libraries used by an application?', a: ['Software Composition Analysis (SCA)', 'DAST', 'A web application firewall', 'A SIEM'], c: 0,
      e: 'SCA inventories dependencies (and can generate an SBOM), then matches them against CVE databases.',
      r: 'SCA инвентаризирует зависимости (и может формировать SBOM) и сопоставляет их с базами CVE.' },
    { o: '8.2', d: 2, q: 'A developer accidentally commits a cloud API key to a public Git repository. What is the BEST immediate action?', a: ['Revoke/rotate the key immediately, then remove it from history and investigate usage', 'Delete the commit and do nothing else', 'Make the repository private', 'Wait to see whether it is misused'], c: 0,
      e: 'Assume the key is already harvested (bots scan within minutes). Rotate first, then clean up and investigate.',
      r: 'Считайте ключ уже украденным (боты сканируют за минуты): сначала ротация, затем очистка и расследование.' },
    { o: '8.2', d: 2, q: 'Which practice BEST protects the integrity of a CI/CD pipeline?', a: ['Protected branches, mandatory code review, signed commits/artifacts, and secrets stored in a vault', 'Giving all developers admin rights on the build server', 'Storing credentials in pipeline scripts for convenience', 'Disabling logging on build agents'], c: 0,
      e: 'The pipeline is a high-value supply chain target. Protect it with least privilege, reviews, signing and secrets management.',
      r: 'Конвейер — ценная цель атак на цепочку поставок: минимальные права, ревью, подписи, управление секретами.' },
    { o: '8.2', d: 3, q: 'An attacker publishes a malicious package to a public registry with the same name as an internal private package, and a higher version number. The build system pulls it. This is:', a: ['Dependency confusion', 'Typosquatting', 'SQL injection', 'Cross-site scripting'], c: 0,
      e: 'Dependency confusion exploits package managers preferring public or higher versions. Use scoped registries and pinning.',
      r: 'Dependency confusion эксплуатирует предпочтение менеджерами пакетов публичных или более новых версий; защита — scoped-реестры и фиксация версий.' },
    { o: '8.3', d: 2, q: 'Which practice BEST supports assessing the effectiveness of software security over time?', a: ['Auditing and logging all code and configuration changes, and tracking security defects to closure', 'Relying on developer self-attestation', 'Testing only once before the first release', 'Removing logs to improve performance'], c: 0,
      e: 'Change auditing plus defect metrics provide evidence of effectiveness and support risk analysis and mitigation.',
      r: 'Аудит изменений и метрики дефектов дают доказательства эффективности и основу для анализа и снижения рисков.' },
    { o: '8.4', d: 2, q: 'A company relies on a small vendor\'s custom application. What protects the company if the vendor goes out of business?', a: ['Source code escrow agreement', 'Non-disclosure agreement', 'SOC 3 report', 'Service level agreement'], c: 0,
      e: 'Escrow releases the source code to the customer under specified conditions, such as bankruptcy.',
      r: 'Escrow передаёт исходный код клиенту при оговорённых условиях (например, банкротстве).' },
    { o: '8.4', d: 2, q: 'What is the BEST way to assess the security of COTS software before deployment?', a: ['Review vendor security documentation and certifications, and test it in your own environment', 'Assume it is secure because it is commercial', 'Decompile and rewrite it', 'Rely only on marketing materials'], c: 0,
      e: 'You can\'t see COTS code, so use due diligence (certifications such as Common Criteria, patch history) plus testing and secure configuration.',
      r: 'Код COTS не виден: проверка поставщика (сертификаты, например Common Criteria, история патчей), тестирование, безопасная настройка.' },
    { o: '8.4', d: 2, q: 'When using open-source components, which risk is MOST specific to open source compared with COTS?', a: ['Uncertain maintenance and license obligations (e.g. copyleft)', 'Inability to review the code', 'Vendor bankruptcy', 'Lack of documentation is impossible'], c: 0,
      e: 'Open-source projects may be abandoned, and licenses such as GPL create obligations. The code is reviewable, unlike COTS.',
      r: 'Open-source проекты могут быть заброшены, а лицензии (GPL) накладывают обязательства; код при этом можно проверить, в отличие от COTS.' },
    { o: '8.5', d: 1, q: 'Which is the MOST effective defense against SQL injection?', a: ['Parameterized queries (prepared statements)', 'Client-side JavaScript validation', 'Hiding error messages only', 'Using HTTPS'], c: 0,
      e: 'Parameterization separates code from data. Client-side checks can be bypassed, and HTTPS doesn\'t affect injection.',
      r: 'Параметризация отделяет код от данных; клиентская проверка обходится, HTTPS на инъекции не влияет.' },
    { o: '8.5', d: 2, q: 'Where should input validation be performed to be effective as a security control?', a: ['On the server side', 'Only in the browser', 'Only in the database', 'In the network firewall'], c: 0,
      e: 'Attackers control the client and can bypass browser validation. Server-side validation is authoritative.',
      r: 'Атакующий контролирует клиент и может обойти проверку в браузере; решающая проверка — на сервере.' },
    { o: '8.5', d: 2, q: 'An attacker posts a comment containing a script that runs in every visitor\'s browser. Which defense is MOST effective?', a: ['Context-aware output encoding', 'Parameterized SQL queries', 'Account lockout', 'Full-disk encryption'], c: 0,
      e: 'Stored XSS is prevented by encoding output (plus input validation and CSP).',
      r: 'Хранимый XSS предотвращается кодированием вывода (плюс проверка ввода и CSP).' },
    { o: '8.5', d: 2, q: 'A logged-in banking user visits a malicious site that silently submits a funds transfer to the bank using the user\'s session. Which attack is this and what prevents it?', a: ['CSRF; anti-CSRF tokens and SameSite cookies', 'XSS; output encoding', 'SQL injection; prepared statements', 'Buffer overflow; ASLR'], c: 0,
      e: 'CSRF abuses the browser\'s automatic sending of credentials. Unpredictable tokens and SameSite cookies defeat it.',
      r: 'CSRF использует автоматическую отправку учётных данных браузером; защита — непредсказуемые токены и SameSite.' },
    { o: '8.5', d: 2, q: 'A user changes the URL from /invoice?id=1001 to /invoice?id=1002 and sees another customer\'s invoice. What is the flaw?', a: ['Insecure direct object reference (broken object-level authorization)', 'Cross-site scripting', 'Clickjacking', 'Session fixation'], c: 0,
      e: 'The server must check authorization for every object requested, not just authentication.',
      r: 'Сервер обязан проверять авторизацию для каждого запрошенного объекта, а не только аутентификацию.' },
    { o: '8.5', d: 2, q: 'Which programming practice BEST prevents buffer overflow vulnerabilities?', a: ['Bounds checking or using memory-safe languages', 'Using longer variable names', 'Compiling with debugging symbols', 'Disabling ASLR'], c: 0,
      e: 'Check the length before copying, or use memory-safe languages. ASLR and DEP make exploitation harder but don\'t fix the bug.',
      r: 'Проверка длины перед копированием или безопасные по памяти языки; ASLR и DEP лишь затрудняют эксплуатацию.' },
    { o: '8.5', d: 2, q: 'An application displays full stack traces with database details to users when errors occur. What is the BEST fix?', a: ['Show generic error messages to users and log the details securely server-side', 'Remove all logging', 'Display errors only in red', 'Encrypt the stack traces in the browser'], c: 0,
      e: 'Verbose errors leak information useful to attackers. Users get generic messages, and the logs keep the details.',
      r: 'Подробные ошибки раскрывают информацию атакующему: пользователю — общее сообщение, детали — в журнал.' },
    { o: '8.5', d: 3, q: 'A developer leaves an undocumented debug login in production code that bypasses authentication. This is:', a: ['A maintenance hook (back door)', 'A logic bomb', 'A rootkit', 'Polyinstantiation'], c: 0,
      e: 'Maintenance hooks must be removed before production. Code review should catch them.',
      r: 'Отладочные «лазейки» должны удаляться до продуктива; их должно выявлять ревью кода.' },
    { o: '8.5', d: 3, q: 'Which control BEST protects an API that third parties use to retrieve customer records?', a: ['Strong token-based authentication (OAuth 2.0), per-object authorization, rate limiting, and TLS', 'Publishing the API key in the documentation', 'Relying on an obscure URL', 'Allowing unlimited requests for performance'], c: 0,
      e: 'APIs need authentication, authorization on every object, throttling, input validation and encryption in transit.',
      r: 'API нужны аутентификация, авторизация на каждый объект, ограничение частоты, проверка ввода и шифрование при передаче.' },
    { o: '8.2', d: 2, q: 'Which database property guarantees that a transaction is either fully completed or not at all?', a: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], c: 0,
      e: 'ACID: Atomicity means all or nothing. Consistency means valid states. Isolation means no interference. Durability means permanence.',
      r: 'ACID: атомарность — всё или ничего; согласованность — корректные состояния; изолированность — без взаимного влияния; долговечность — постоянство.' },
    { o: '8.2', d: 2, q: 'Which database feature restricts the columns and rows a user can see without changing the underlying tables?', a: ['A view', 'A foreign key', 'A trigger', 'A cursor'], c: 0,
      e: 'Views are virtual tables used for access restriction (a constrained interface).',
      r: 'Представления — виртуальные таблицы для ограничения доступа (ограниченный интерфейс).' },
    { o: '8.2', d: 3, q: 'In a relational database, what is the number of rows in a table called?', a: ['Cardinality', 'Degree', 'Domain', 'Schema'], c: 0,
      e: 'Cardinality is the number of rows (tuples). Degree is the number of columns (attributes).',
      r: 'Кардинальность — число строк (кортежей); степень — число столбцов (атрибутов).' },
    { o: '8.5', d: 2, q: 'Malware that changes its code with each infection to evade signature-based detection is:', a: ['Polymorphic', 'Multipartite', 'Macro', 'Boot sector'], c: 0,
      e: 'Polymorphic malware mutates its signature. Multipartite malware uses multiple infection vectors.',
      r: 'Полиморфный вредонос меняет сигнатуру; multipartite использует несколько векторов заражения.' },
    { o: '8.5', d: 1, q: 'What distinguishes a worm from a virus?', a: ['A worm self-replicates across networks without user interaction', 'A worm requires a host file', 'A worm only affects boot sectors', 'A worm cannot cause damage'], c: 0,
      e: 'Viruses need a host and user action. Worms spread on their own.',
      r: 'Вирусу нужен носитель и действие пользователя; червь распространяется сам.' },
    { o: '8.5', d: 2, q: 'A disgruntled programmer inserts code that deletes payroll records if their name is ever removed from the employee database. This is a:', a: ['Logic bomb', 'Worm', 'Trojan horse', 'Rootkit'], c: 0,
      e: 'A logic bomb triggers on a condition. Code review and separation of duties help prevent it.',
      r: 'Логическая бомба срабатывает по условию; помогают ревью кода и разделение обязанностей.' },
    { o: '8.1', d: 2, q: 'In which methodology do development and operations teams collaborate closely with heavy automation, and security is integrated into the pipeline?', a: ['DevSecOps', 'Waterfall', 'Cleanroom', 'Spiral'], c: 0,
      e: 'DevSecOps embeds automated security testing (SAST, DAST, SCA, IaC scanning) into CI/CD and makes security a shared responsibility.',
      r: 'DevSecOps встраивает автоматизированное тестирование безопасности (SAST, DAST, SCA, IaC) в CI/CD; безопасность — общая ответственность.' },
    { t: 'order', o: '8.1', d: 1, q: 'Order the Capability Maturity Model levels from lowest to highest.', items: ['Initial', 'Repeatable', 'Defined', 'Quantitatively Managed', 'Optimizing'],
      e: '1 → 5: Initial, Repeatable/Managed, Defined, Quantitatively Managed, Optimizing.', r: 'С 1 по 5: Initial, Repeatable, Defined, Quantitatively Managed, Optimizing.' },
    { t: 'match', o: '8.5', d: 2, q: 'Match each vulnerability to its primary defense.', pairs: [['SQL injection', 'Parameterized queries'], ['XSS', 'Output encoding'], ['CSRF', 'Anti-CSRF tokens'], ['Buffer overflow', 'Bounds checking']],
      e: 'Each weakness class has a "go-to" defense.', r: 'У каждого класса уязвимостей своя основная защита.' },
    { t: 'match', o: '8.2', d: 2, q: 'Match each ACID property to its meaning.', pairs: [['Atomicity', 'All or nothing'], ['Consistency', 'Valid state to valid state'], ['Isolation', 'Concurrent transactions don\'t interfere'], ['Durability', 'Committed changes persist']],
      e: 'ACID properties guarantee reliable transactions.', r: 'Свойства ACID гарантируют надёжность транзакций.' },
  ],
});
