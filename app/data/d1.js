'use strict';
CISSP.domain({
  id: 1, weight: 16,
  title: { en: 'Security and Risk Management', ru: 'Безопасность и управление рисками' },
  summary: {
    en: 'The foundation and the largest domain: the CIA triad, governance, law, ethics, business continuity, personnel security, risk management, threat modeling, supply chain and awareness.',
    ru: 'Фундамент и самый «тяжёлый» домен: триада CIA, управление (governance), право, этика, непрерывность бизнеса, безопасность персонала, управление рисками, моделирование угроз, цепочки поставок и обучение.',
  },
  objectives: [
    ['1.1', 'Understand, adhere to, and promote professional ethics'],
    ['1.2', 'Understand and apply security concepts (CIA, authenticity, nonrepudiation)'],
    ['1.3', 'Evaluate, apply, and sustain security governance principles'],
    ['1.4', 'Understand legal, regulatory, and compliance issues'],
    ['1.5', 'Understand requirements for investigation types'],
    ['1.6', 'Develop, document, and implement security policy, standards, procedures, and guidelines'],
    ['1.7', 'Identify, analyze, assess, prioritize, and implement Business Continuity (BC) requirements'],
    ['1.8', 'Contribute to and enforce personnel security policies and procedures'],
    ['1.9', 'Understand and apply risk management concepts'],
    ['1.10', 'Understand and apply threat modeling concepts and methodologies'],
    ['1.11', 'Apply Supply Chain Risk Management (SCRM) concepts'],
    ['1.12', 'Establish and maintain a security awareness, education, and training program'],
  ],
  concepts: [
    {
      t: { en: 'CIA triad and core security concepts', ru: 'Триада CIA и базовые понятия' },
      b: {
        en: `<p><b>Confidentiality</b> prevents unauthorized disclosure (encryption, access control). <b>Integrity</b> prevents unauthorized modification and keeps data accurate (hashing, digital signatures, change control). <b>Availability</b> keeps systems and data accessible to authorized users when needed (redundancy, backups, DDoS protection).</p>
<p>The opposite is <b>DAD</b>: Disclosure, Alteration, Destruction.</p>
<ul><li><b>Authenticity</b>: the data or sender is genuine.</li><li><b>Nonrepudiation</b>: the sender can't deny the action. It needs a digital signature (private key) or a trusted log. A symmetric MAC alone does not provide it.</li>
<li><b>IAAA</b>: Identification (claim), Authentication (prove), Authorization (permissions), Accountability (audit trail tied to the individual).</li></ul>
<p>Balance is key. Too much confidentiality can kill availability, so management decides the priority per asset.</p>`,
        ru: `<p><b>Конфиденциальность</b> — защита от несанкционированного раскрытия (шифрование, контроль доступа). <b>Целостность</b> — защита от несанкционированного изменения, точность данных (хеши, ЭЦП, управление изменениями). <b>Доступность</b> — доступ авторизованных пользователей тогда, когда нужно (резервирование, бэкапы, защита от DDoS).</p>
<p>Противоположность — <b>DAD</b>: Disclosure (раскрытие), Alteration (изменение), Destruction (уничтожение).</p>
<ul><li><b>Аутентичность</b> — данные или отправитель подлинные.</li><li><b>Неотказуемость (nonrepudiation)</b> — отправитель не может отрицать действие. Нужна ЭЦП (закрытый ключ) или доверенный журнал. Один симметричный MAC её не даёт.</li>
<li><b>IAAA</b>: идентификация (заявление), аутентификация (доказательство), авторизация (права), подотчётность (журнал, привязанный к человеку).</li></ul>
<p>Важен баланс: избыток конфиденциальности может «убить» доступность, поэтому приоритеты для каждого актива задаёт руководство.</p>`,
      },
    },
    {
      t: { en: 'Security governance, roles, due care & due diligence', ru: 'Управление безопасностью, роли, due care и due diligence' },
      b: {
        en: `<p>Security governance aligns security with business <b>strategy, goals, mission and objectives</b>. It is top-down: senior management sets direction, approves policy, funds the program and <b>bears ultimate responsibility</b>.</p>
<ul><li><b>Senior management / board</b>: accountable, accepts risk.</li><li><b>CISO / security professional</b>: designs and implements the program, advises.</li><li><b>Data owner</b>: classifies data, decides who gets access.</li><li><b>Custodian</b>: implements the protections day to day (IT ops, backups).</li><li><b>Auditor</b>: independently verifies that controls work.</li></ul>
<p><b>Due diligence</b> = knowing and planning: research, risk assessments, developing policy ("do detect"). <b>Due care</b> = doing: carrying out and operating the controls ("do correct"), i.e. acting as a prudent person would. Failing at due care = <b>negligence</b>.</p>
<p>Plans: <b>strategic</b> (~5 years), <b>tactical</b> (~1 year), <b>operational</b> (short-term, detailed).</p>
<p>Frameworks: ISO/IEC 27001 (certifiable ISMS) and 27002 (control guidance), NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), COBIT (IT governance), SABSA and TOGAF (enterprise architecture), Zachman.</p>`,
        ru: `<p>Управление безопасностью (governance) согласует безопасность со <b>стратегией, целями и миссией</b> бизнеса. Подход сверху вниз: высшее руководство задаёт курс, утверждает политику, финансирует и <b>несёт конечную ответственность</b>.</p>
<ul><li><b>Высшее руководство / совет директоров</b> — подотчётно, принимает риск.</li><li><b>CISO / специалист</b> — проектирует и внедряет программу, консультирует.</li><li><b>Владелец данных (owner)</b> — классифицирует, решает, кому дать доступ.</li><li><b>Хранитель (custodian)</b> — ежедневно реализует защиту (ИТ, бэкапы).</li><li><b>Аудитор</b> — независимо проверяет работу мер.</li></ul>
<p><b>Due diligence</b> — «знать и планировать»: исследования, оценка рисков, разработка политики. <b>Due care</b> — «делать»: внедрять и эксплуатировать меры, как поступил бы разумный человек. Нарушение due care — <b>халатность (negligence)</b>.</p>
<p>Планы: <b>стратегический</b> (~5 лет), <b>тактический</b> (~1 год), <b>операционный</b> (краткосрочный, детальный).</p>
<p>Фреймворки: ISO/IEC 27001 (СУИБ, сертифицируемый) и 27002 (рекомендации по мерам), NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), COBIT, SABSA, TOGAF, Zachman.</p>`,
      },
    },
    {
      t: { en: 'Policy hierarchy', ru: 'Иерархия документов' },
      b: {
        en: `<p>Documents flow from general and mandatory down to specific. Only <b>guidelines</b> are optional.</p>`,
        ru: `<p>Документы идут от общих и обязательных к конкретным. Необязательны только <b>руководства (guidelines)</b>.</p>`,
      },
      w: ['layers', { title: { en: 'From policy to procedure', ru: 'От политики к процедуре' }, items: [
        { n: '1', t: 'Policy', s: { en: 'high-level, mandatory, approved by senior management', ru: 'верхнеуровневая, обязательная, утверждается руководством' }, d: { en: 'States management intent and the organization\'s security goals. Technology-agnostic, rarely changes. Example: "All sensitive data must be encrypted in transit."', ru: 'Выражает намерения руководства и цели. Не зависит от технологий, меняется редко. Пример: «Все чувствительные данные шифруются при передаче».' } },
        { n: '2', t: 'Standards', s: { en: 'mandatory, specific technologies/methods', ru: 'обязательные, конкретные технологии' }, d: { en: 'Compulsory requirements that support the policy. Example: "Use TLS 1.2 or higher with AES-GCM."', ru: 'Обязательные требования в поддержку политики. Пример: «Используйте TLS 1.2+ с AES-GCM».' } },
        { n: '3', t: 'Baselines', s: { en: 'mandatory minimum security level for a system type', ru: 'обязательный минимальный уровень для типа систем' }, d: { en: 'A minimum configuration, often based on CIS Benchmarks or DISA STIGs. Tailor and scope them to your environment.', ru: 'Минимальная конфигурация, часто на основе CIS Benchmarks или DISA STIG. Подгоняется (tailoring/scoping) под среду.' } },
        { n: '4', t: 'Procedures', s: { en: 'mandatory step-by-step instructions', ru: 'обязательные пошаговые инструкции' }, d: { en: 'Detailed how-to (SOPs) that ensures consistency and supports compliance. Example: the steps to onboard a new server.', ru: 'Пошаговые инструкции (SOP) для единообразия и соответствия. Пример: шаги ввода нового сервера.' } },
        { n: '5', t: 'Guidelines', s: { en: 'OPTIONAL recommendations', ru: 'НЕОБЯЗАТЕЛЬНЫЕ рекомендации' }, d: { en: 'Best-practice advice where flexibility is acceptable. Example: "Consider using a password manager."', ru: 'Советы по лучшей практике, где допустима гибкость. Пример: «Рекомендуется использовать менеджер паролей».' } },
      ] }],
    },
    {
      t: { en: 'Legal, regulatory, compliance and privacy', ru: 'Право, регулирование, соответствие и приватность' },
      b: {
        en: `<ul><li><b>Criminal law</b>: offenses against society, prosecuted by government. Prison is possible. Standard: <i>beyond a reasonable doubt</i>.</li>
<li><b>Civil law</b>: disputes between parties (contracts, torts). Remedy: monetary damages. Standard: <i>preponderance of evidence</i>.</li>
<li><b>Administrative / regulatory law</b>: rules made by government agencies (e.g. HIPAA rules).</li></ul>
<p><b>Intellectual property</b>: <b>Patent</b> (invention, ~20 years from filing, must be novel, useful and non-obvious, publicly disclosed). <b>Copyright</b> (expression of an idea, automatic, life of the author + 70 years). <b>Trademark</b> (brand, renewable every 10 years). <b>Trade secret</b> (protected by secrecy and NDAs, never disclosed, no registration).</p>
<p><b>Privacy</b>: GDPR applies to any organization processing EU residents' personal data. Breach notification to the authority within <b>72 hours</b>. Fines up to €20M or 4% of global turnover. Data-subject rights include access, rectification, erasure ("right to be forgotten") and portability. Roles: <b>controller</b> (decides purpose and means), <b>processor</b> (processes on behalf of the controller), DPO. Other laws: HIPAA (US health data), GLBA (financial), SOX (financial reporting integrity), PCI DSS (a contractual industry standard, not a law), CCPA/CPRA.</p>
<p><b>Transborder data flow</b>: data residency and sovereignty. <b>Export controls</b>: ITAR, EAR, the Wassenaar Arrangement (crypto export).</p>`,
        ru: `<ul><li><b>Уголовное право</b> — преступления против общества, преследует государство, возможна тюрьма. Стандарт: <i>вне разумных сомнений</i>.</li>
<li><b>Гражданское право</b> — споры между сторонами (договоры, деликты), возмещение деньгами. Стандарт: <i>перевес доказательств</i>.</li>
<li><b>Административное право</b> — нормы госорганов (например, правила HIPAA).</li></ul>
<p><b>Интеллектуальная собственность</b>: <b>патент</b> (изобретение, ~20 лет от подачи, новизна и неочевидность, раскрывается публично), <b>авторское право</b> (выражение идеи, возникает автоматически, жизнь автора + 70 лет), <b>товарный знак</b> (бренд, продление каждые 10 лет), <b>коммерческая тайна</b> (защищается секретностью и NDA, не раскрывается и не регистрируется).</p>
<p><b>Приватность</b>: GDPR применяется к любой организации, обрабатывающей ПДн резидентов ЕС. Уведомление регулятора об утечке — в течение <b>72 часов</b>; штрафы до €20 млн или 4% мирового оборота. Права субъекта: доступ, исправление, удаление («право на забвение»), переносимость. Роли: <b>контролёр</b> (определяет цели и средства), <b>обработчик</b> (обрабатывает по поручению), DPO. Другие: HIPAA (медицина, США), GLBA (финансы), SOX (финансовая отчётность), PCI DSS (отраслевой договорной стандарт, не закон), CCPA/CPRA.</p>
<p><b>Трансграничная передача данных</b> — резидентность и суверенитет данных. <b>Экспортный контроль</b>: ITAR, EAR, Вассенаарские соглашения (экспорт криптографии).</p>`,
      },
    },
    {
      t: { en: 'Investigation types', ru: 'Виды расследований' },
      b: { en: '<p>The investigation type determines the standard of proof, who leads it, and how strictly evidence must be handled.</p>', ru: '<p>Тип расследования определяет стандарт доказывания, кто его ведёт и насколько строго обращаться с доказательствами.</p>' },
      w: ['compare', { title: { en: 'Investigation types compared', ru: 'Сравнение видов расследований' }, cols: ['Type', 'Purpose', 'Standard of proof', 'Led by'], rows: [
        ['Administrative', 'Internal/operational issues (policy violation, outage root cause)', 'Lowest; whatever management needs', 'Internal staff'],
        ['Criminal', 'Violation of criminal law', '<b>Beyond a reasonable doubt</b>', 'Law enforcement'],
        ['Civil', 'Dispute between parties, damages', '<b>Preponderance of the evidence</b> (>50%)', 'Parties & lawyers'],
        ['Regulatory', 'Violation of regulations', 'Varies by regulator', 'Government agency'],
        ['Industry standards', 'Compliance with e.g. PCI DSS', 'Contractual', 'Industry bodies / assessors'],
      ], note: { en: 'If an administrative investigation may turn criminal, handle evidence to criminal standards (chain of custody) from the start.', ru: 'Если внутреннее расследование может перерасти в уголовное, сразу обращайтесь с доказательствами по уголовным стандартам (цепочка хранения).' } }],
    },
    {
      t: { en: 'ISC2 Code of Ethics', ru: 'Кодекс этики ISC2' },
      b: {
        en: '<p>The preamble requires <b>the safety and welfare of society and the common good</b>. The four canons are applied <b>in order</b>. When they conflict, the higher canon wins. Violations can be reported by any member and lead to loss of certification. Also know RFC 1087 ("Ethics and the Internet"): misuse such as gaining unauthorized access, disrupting use, wasting resources, destroying integrity or compromising privacy is unethical.</p>',
        ru: '<p>Преамбула: <b>безопасность и благополучие общества, общее благо</b>. Четыре канона применяются <b>по порядку</b>; при конфликте побеждает вышестоящий. Нарушения может сообщить любой член, итог — потеря сертификата. Также полезно знать RFC 1087 «Ethics and the Internet»: неэтично получать несанкционированный доступ, нарушать работу, тратить ресурсы впустую, нарушать целостность или приватность.</p>',
      },
      w: ['layers', { title: { en: 'Canons — in priority order', ru: 'Каноны — по приоритету' }, items: [
        { t: 'Protect society, the common good, necessary public trust and confidence, and the infrastructure.', d: { en: 'Highest priority. Society comes before employer, clients, or yourself.', ru: 'Наивысший приоритет: общество важнее работодателя, клиентов и вас самих.' } },
        { t: 'Act honorably, honestly, justly, responsibly, and legally.', d: { en: 'Follow the law. Don\'t lie. Tell the truth about risk even when it\'s unwelcome.', ru: 'Соблюдать закон, не лгать, честно говорить о рисках, даже если это неприятно.' } },
        { t: 'Provide diligent and competent service to principals.', d: { en: 'Principals = employers and clients. Do good work and avoid conflicts of interest.', ru: 'Principals — работодатели и клиенты: качественная работа, без конфликта интересов.' } },
        { t: 'Advance and protect the profession.', d: { en: 'Mentor others and don\'t associate the profession with unethical practitioners.', ru: 'Развивать профессию, наставлять, не связываться с неэтичными практиками.' } },
      ] }],
    },
    {
      t: { en: 'Business continuity planning (BCP) and BIA', ru: 'Планирование непрерывности бизнеса (BCP) и BIA' },
      b: {
        en: `<p>BCP keeps <b>critical business functions</b> running during and after a disruption. DRP (Domain 7) restores IT. BCP needs <b>senior management support</b> and a cross-functional team.</p>
<ul><li><b>MTD / MAO</b> (Maximum Tolerable Downtime / Outage): the longest the business can survive the outage.</li>
<li><b>RTO</b> (Recovery Time Objective): target time to restore the system. Must be ≤ MTD.</li>
<li><b>RPO</b> (Recovery Point Objective): the maximum tolerable data loss measured in time. It drives backup frequency.</li>
<li><b>WRT</b> (Work Recovery Time): time to verify data and resume work after the system is back. <b>RTO + WRT ≤ MTD</b>.</li></ul>
<p>The <b>BIA</b> identifies critical processes, their dependencies, impacts (financial, reputational, legal) and the metrics above. It is the most important early step of BCP: you can't prioritize without it.</p>`,
        ru: `<p>BCP обеспечивает работу <b>критичных бизнес-функций</b> во время и после сбоя (DRP из Домена 7 восстанавливает ИТ). Нужна <b>поддержка высшего руководства</b> и кросс-функциональная команда.</p>
<ul><li><b>MTD / MAO</b> — максимально допустимый простой: сколько бизнес «выживет» без функции.</li>
<li><b>RTO</b> — целевое время восстановления системы; должно быть ≤ MTD.</li>
<li><b>RPO</b> — допустимая потеря данных во времени; определяет частоту бэкапов.</li>
<li><b>WRT</b> — время на проверку данных и возобновление работы после восстановления системы. <b>RTO + WRT ≤ MTD</b>.</li></ul>
<p><b>BIA</b> выявляет критичные процессы, зависимости, последствия (финансовые, репутационные, юридические) и метрики. Это важнейший ранний шаг BCP: без него нельзя расставить приоритеты.</p>`,
      },
      w: ['flow', { title: { en: 'BCP process (OSG model)', ru: 'Процесс BCP (модель OSG)' }, steps: [
        { t: { en: 'Project scope & planning', ru: 'Рамки и планирование' }, d: { en: 'Structured analysis of the organization, create the BCP team, assess available resources, analyze the legal and regulatory landscape. Get senior management buy-in.', ru: 'Анализ организации, формирование команды BCP, оценка ресурсов, правовая среда. Поддержка руководства.' } },
        { t: { en: 'Business Impact Analysis', ru: 'Анализ влияния на бизнес (BIA)' }, d: { en: 'Identify priorities (MTD, RTO, RPO), risks, likelihood (ARO), impact, and prioritize resources. Can be qualitative and quantitative.', ru: 'Приоритеты (MTD, RTO, RPO), риски, вероятность (ARO), влияние; распределение ресурсов.' } },
        { t: { en: 'Continuity planning', ru: 'Планирование непрерывности' }, d: { en: 'Strategy development (which risks to address), provisions & processes (people first, then buildings and infrastructure).', ru: 'Разработка стратегии и мер: сначала люди, затем здания и инфраструктура.' } },
        { t: { en: 'Approval & implementation', ru: 'Утверждение и внедрение' }, d: { en: 'Senior management approves. Then implement, train and raise awareness, and keep the plan maintained and tested.', ru: 'Утверждение руководством, внедрение, обучение, поддержка и тестирование плана.' } },
      ] }],
    },
    {
      t: { en: 'Personnel security', ru: 'Безопасность персонала' },
      b: {
        en: `<ul><li><b>Pre-hire</b>: job descriptions with security responsibilities, background and reference checks, NDA, and acceptable use agreement.</li>
<li><b>During employment</b>: <b>least privilege</b>, <b>need to know</b>, <b>separation of duties</b> (no single person controls a critical process), <b>job rotation</b> and <b>mandatory vacation</b> (detect fraud, reduce single points of failure), <b>two-person control / dual control</b>, and periodic access reviews.</li>
<li><b>Termination</b>: disable accounts at or before notification, retrieve assets, exit interview to review NDA obligations, escorted out if hostile. Coordinate HR and IT.</li>
<li><b>Third parties</b>: vendor, consultant and contractor controls via contracts, SLAs, and their own background checks.</li>
<li><b>Collusion</b>: separation of duties and rotation make fraud require collusion, which is harder.</li></ul>`,
        ru: `<ul><li><b>До найма</b>: описание должностей с обязанностями по ИБ, проверка биографии и рекомендаций, NDA, соглашение о допустимом использовании.</li>
<li><b>Во время работы</b>: <b>минимальные привилегии</b>, <b>need to know</b>, <b>разделение обязанностей</b>, <b>ротация</b> и <b>обязательный отпуск</b> (выявление мошенничества, устранение единой точки отказа), <b>двойной контроль</b>, периодический пересмотр доступа.</li>
<li><b>Увольнение</b>: отключить учётки в момент уведомления или раньше, вернуть имущество, exit-интервью с напоминанием об NDA, сопровождение при конфликте. Координация HR и ИТ.</li>
<li><b>Третьи стороны</b>: подрядчики и консультанты — через договоры, SLA, их собственные проверки.</li>
<li><b>Сговор</b>: разделение обязанностей и ротация вынуждают мошенника искать сообщника, что сложнее.</li></ul>`,
      },
    },
    {
      t: { en: 'Risk management concepts', ru: 'Управление рисками' },
      b: {
        en: `<p><b>Asset</b> (has value) → <b>threat</b> (potential harmful event) exploits a <b>vulnerability</b> (weakness) → <b>risk</b> = likelihood × impact. <b>Exposure</b> = being susceptible to loss. A <b>safeguard / countermeasure</b> reduces risk.</p>
<p><b>Qualitative</b>: high/medium/low, scenarios, Delphi technique (anonymous expert consensus). <b>Quantitative</b>: money values (SLE, ALE). Most organizations use a hybrid.</p>
<p><b>Responses</b>: <b>Mitigate/reduce</b> (implement controls), <b>Transfer/share</b> (insurance, outsourcing — accountability stays with you), <b>Avoid</b> (stop the risky activity), <b>Accept</b> (a documented management decision when cost > benefit). <b>Reject/ignore</b> is never acceptable.</p>
<p><b>Total risk</b> = threats × vulnerabilities × asset value. <b>Residual risk</b> = total risk − controls gap, i.e. what remains after controls. Senior management must formally accept residual risk. <b>Risk appetite</b> is how much risk the organization wants to take on; <b>risk tolerance</b> is the acceptable deviation from it.</p>`,
        ru: `<p><b>Актив</b> (имеет ценность) → <b>угроза</b> (потенциальное вредное событие) использует <b>уязвимость</b> (слабость) → <b>риск</b> = вероятность × последствия. <b>Подверженность (exposure)</b> — возможность понести ущерб. <b>Мера защиты</b> снижает риск.</p>
<p><b>Качественный</b> анализ: высокий/средний/низкий, сценарии, метод Дельфи (анонимный консенсус экспертов). <b>Количественный</b>: деньги (SLE, ALE). Обычно используется гибрид.</p>
<p><b>Реакции</b>: <b>снижение</b> (меры), <b>передача</b> (страхование, аутсорсинг — подотчётность остаётся у вас), <b>избегание</b> (отказ от рискованной деятельности), <b>принятие</b> (задокументированное решение руководства, когда затраты > выгоды). <b>Игнорирование</b> недопустимо никогда.</p>
<p><b>Общий риск</b> = угрозы × уязвимости × ценность актива. <b>Остаточный риск</b> = общий риск − пробел в мерах, т.е. что осталось после мер; его формально принимает руководство. <b>Аппетит к риску</b> — сколько риска организация готова взять; <b>толерантность</b> — допустимое отклонение.</p>`,
      },
      w: ['riskCalc'],
    },
    {
      t: { en: 'NIST Risk Management Framework (SP 800-37)', ru: 'NIST RMF (SP 800-37)' },
      b: { en: '<p>The 7 steps of the RMF. A handy mnemonic: "<b>P</b>eople <b>C</b>an\'t <b>S</b>top <b>I</b>nternet <b>A</b>ttacks <b>A</b>ll <b>M</b>onth".</p>', ru: '<p>7 шагов RMF. Мнемоника: «<b>P</b>eople <b>C</b>an\'t <b>S</b>top <b>I</b>nternet <b>A</b>ttacks <b>A</b>ll <b>M</b>onth».</p>' },
      w: ['flow', { title: 'NIST RMF', steps: [
        { t: 'Prepare', d: { en: 'Establish context, priorities, roles and a risk management strategy at organization and system level.', ru: 'Контекст, приоритеты, роли, стратегия управления рисками.' } },
        { t: 'Categorize', d: { en: 'Categorize the system and its information based on impact (FIPS 199: low/moderate/high for C, I, A).', ru: 'Категорировать систему по влиянию (FIPS 199: низкий/средний/высокий для C, I, A).' } },
        { t: 'Select', d: { en: 'Select a baseline of controls (SP 800-53) and tailor it.', ru: 'Выбрать базовый набор мер (SP 800-53) и адаптировать.' } },
        { t: 'Implement', d: { en: 'Implement the controls and document how they are deployed.', ru: 'Внедрить меры и задокументировать.' } },
        { t: 'Assess', d: { en: 'Determine whether controls are implemented correctly, operating as intended, and producing the desired outcome.', ru: 'Проверить, что меры внедрены верно и дают нужный результат.' } },
        { t: 'Authorize', d: { en: 'A senior official (Authorizing Official) accepts the residual risk and grants an Authorization to Operate (ATO).', ru: 'Уполномоченное лицо (AO) принимает остаточный риск и выдаёт разрешение на эксплуатацию (ATO).' } },
        { t: 'Monitor', d: { en: 'Continuously monitor controls, changes and risk; report status.', ru: 'Непрерывный мониторинг мер, изменений и рисков.' } },
      ] }],
    },
    {
      t: { en: 'Control types and categories', ru: 'Типы и категории мер защиты' },
      b: {
        en: `<p><b>Categories</b> (how a control is implemented): <b>Administrative/managerial</b> (policies, training, background checks), <b>Technical/logical</b> (firewalls, encryption, ACLs), <b>Physical</b> (fences, locks, guards).</p>
<p><b>Functional types</b> (what it does): <b>Preventive</b> stops it, <b>Detective</b> discovers it, <b>Corrective</b> fixes the immediate issue, <b>Recovery</b> restores operations (more advanced than corrective), <b>Deterrent</b> discourages it, <b>Directive</b> tells people what to do, and <b>Compensating</b> is an alternative when the primary control isn't feasible.</p>
<p>Controls are selected based on <b>cost vs. benefit</b>. A control should never cost more than the asset it protects. Defense in depth layers multiple control types.</p>`,
        ru: `<p><b>Категории</b> (как реализовано): <b>административные</b> (политики, обучение, проверки), <b>технические/логические</b> (МЭ, шифрование, ACL), <b>физические</b> (заборы, замки, охрана).</p>
<p><b>Функциональные типы</b> (что делает): <b>превентивные</b> — предотвращают; <b>детективные</b> — обнаруживают; <b>корректирующие</b> — исправляют текущую проблему; <b>восстанавливающие</b> — возвращают работу (сложнее корректирующих); <b>сдерживающие</b> — отпугивают; <b>директивные</b> — предписывают; <b>компенсирующие</b> — альтернатива, когда основная мера невозможна.</p>
<p>Выбор — по <b>соотношению затрат и выгод</b>: мера не должна стоить дороже актива. Эшелонированная защита сочетает разные типы.</p>`,
      },
      w: ['controlGame'],
    },
    {
      t: { en: 'Threat modeling', ru: 'Моделирование угроз' },
      b: {
        en: `<p>Threat modeling identifies, categorizes and prioritizes threats, ideally <b>early in design</b> (proactive), but also on existing systems (reactive). Steps: identify assets and objectives, diagram the system (data flow diagrams, trust boundaries), identify threats, rate them, plan mitigations.</p>
<ul><li><b>STRIDE</b> (Microsoft): threat categories (see table).</li>
<li><b>PASTA</b>: 7-stage, <b>risk-centric</b>: Definition of Objectives → Technical Scope → Application Decomposition → Threat Analysis → Weakness & Vulnerability Analysis → Attack Modeling & Simulation → Risk & Impact Analysis.</li>
<li><b>DREAD</b>: rating: Damage, Reproducibility, Exploitability, Affected users, Discoverability.</li>
<li><b>VAST</b>: Agile and scalable, for DevOps. <b>Trike</b>: risk-based, built around an acceptable-risk "requirements model".</li>
<li><b>Attack trees</b>, and <b>MITRE ATT&amp;CK</b> (adversary tactics and techniques knowledge base).</li></ul>`,
        ru: `<p>Моделирование угроз выявляет, классифицирует и приоритизирует угрозы. Лучше <b>на этапе проектирования</b> (проактивно), но возможно и для готовых систем. Шаги: активы и цели → диаграммы (DFD, границы доверия) → угрозы → оценка → меры.</p>
<ul><li><b>STRIDE</b> (Microsoft): категории угроз (см. таблицу).</li>
<li><b>PASTA</b>: 7 стадий, <b>риск-ориентированная</b>: цели → технические рамки → декомпозиция приложения → анализ угроз → анализ уязвимостей → моделирование атак → анализ рисков и влияния.</li>
<li><b>DREAD</b>: оценка — ущерб, воспроизводимость, эксплуатируемость, затронутые пользователи, обнаруживаемость.</li>
<li><b>VAST</b> — для Agile/DevOps, масштабируемая; <b>Trike</b> — риск-ориентированная, на базе модели требований.</li>
<li><b>Деревья атак</b>, <b>MITRE ATT&amp;CK</b> (база тактик и техник).</li></ul>`,
      },
      w: ['compare', { title: 'STRIDE', cols: ['Threat', 'Violates', 'Example', 'Mitigation'], rows: [
        ['<b>S</b>poofing', 'Authentication', 'Forged sender, stolen credentials', 'Strong authentication, MFA'],
        ['<b>T</b>ampering', 'Integrity', 'Modifying data in transit', 'Hashes, signatures, access control'],
        ['<b>R</b>epudiation', 'Nonrepudiation', 'User denies placing an order', 'Digital signatures, secure audit logs'],
        ['<b>I</b>nformation disclosure', 'Confidentiality', 'Data leak, verbose errors', 'Encryption, least privilege'],
        ['<b>D</b>enial of service', 'Availability', 'Flooding, resource exhaustion', 'Rate limiting, redundancy'],
        ['<b>E</b>levation of privilege', 'Authorization', 'User gains admin rights', 'Least privilege, input validation'],
      ] }],
    },
    {
      t: { en: 'Supply chain risk management (SCRM)', ru: 'Риски цепочки поставок (SCRM)' },
      b: {
        en: `<p>Every vendor, service provider, and component is part of your attack surface (e.g. SolarWinds, compromised libraries, counterfeit hardware).</p>
<ul><li>Risks: tampering, counterfeits, implants, malicious updates, vendor breach, single-source dependence, and fourth parties (your vendor's vendors).</li>
<li>Mitigations: vendor due diligence and security questionnaires, <b>minimum security requirements</b> in contracts, the <b>right to audit</b>, SLAs, independent assessments (<b>SOC 2 Type II</b>, ISO 27001), <b>SBOM</b> (Software Bill of Materials), silicon root of trust, code signing, and secure transport and acceptance testing of hardware.</li>
<li>Third-party assessment: on-site review, document exchange and review, process/policy review, third-party audit.</li></ul>`,
        ru: `<p>Каждый поставщик, сервис и компонент — часть поверхности атаки (SolarWinds, скомпрометированные библиотеки, контрафактное оборудование).</p>
<ul><li>Риски: подмена, контрафакт, закладки, вредоносные обновления, взлом поставщика, зависимость от единственного источника, «четвёртые стороны» (поставщики поставщиков).</li>
<li>Меры: проверка поставщиков и опросники, <b>минимальные требования ИБ</b> в договоре, <b>право на аудит</b>, SLA, независимые оценки (<b>SOC 2 Type II</b>, ISO 27001), <b>SBOM</b> (перечень компонентов ПО), аппаратный корень доверия, подпись кода, проверка поставок оборудования.</li>
<li>Оценка третьих сторон: выезд на площадку, обмен и анализ документов, анализ процессов и политик, независимый аудит.</li></ul>`,
      },
    },
    {
      t: { en: 'Security awareness, training and education', ru: 'Осведомлённость, обучение и образование' },
      b: {
        en: `<ul><li><b>Awareness</b>: makes everyone recognize security issues (posters, briefings, phishing simulations). The goal is to change behavior. Answers "what".</li>
<li><b>Training</b>: teaches specific skills for a job role (how to use the DLP tool). Answers "how".</li>
<li><b>Education</b>: deep understanding and theory, e.g. for security professionals (degrees, certifications). Answers "why".</li></ul>
<p>Methods include social engineering simulations, security champions, gamification, and periodic content review. <b>Measure effectiveness</b> with phishing click rates, reporting rates, incident trends, and quiz results. Training starts at onboarding, is repeated at least annually, and must be updated as threats change.</p>`,
        ru: `<ul><li><b>Осведомлённость</b> — чтобы все распознавали проблемы ИБ (плакаты, брифинги, фишинговые симуляции). Цель — изменить поведение. «Что».</li>
<li><b>Обучение (training)</b> — конкретные навыки для роли (как пользоваться DLP). «Как».</li>
<li><b>Образование</b> — глубокое понимание, теория, для специалистов (степени, сертификаты). «Почему».</li></ul>
<p>Методы: симуляции социальной инженерии, «чемпионы безопасности», геймификация, регулярный пересмотр контента. <b>Измеряйте эффективность</b>: доля кликов по фишингу, доля сообщений о фишинге, тренды инцидентов, результаты тестов. Обучение — при найме, минимум ежегодно, с обновлением под новые угрозы.</p>`,
      },
    },
  ],
  terms: [
    ['CIA triad', 'Confidentiality, Integrity, Availability — the core security objectives.', 'Конфиденциальность, целостность, доступность — базовые цели ИБ.'],
    ['DAD', 'Disclosure, Alteration, Destruction — the opposite of CIA.', 'Раскрытие, изменение, уничтожение — противоположность CIA.'],
    ['Nonrepudiation', 'Assurance that the originator cannot deny the action; achieved with digital signatures.', 'Невозможность отрицать авторство действия; достигается ЭЦП.'],
    ['Due care', 'Doing what a prudent person would do: operating and maintaining controls. Lack of it = negligence.', 'Действия разумного человека: эксплуатация мер. Отсутствие — халатность.'],
    ['Due diligence', 'Investigation and planning to know what is required (risk assessment, policy research).', 'Изучение и планирование: понять, что требуется (оценка рисков, политики).'],
    ['SLE', 'Single Loss Expectancy = Asset Value × Exposure Factor.', 'Ожидаемые потери от одного инцидента = ценность актива × фактор воздействия.'],
    ['ALE', 'Annualized Loss Expectancy = SLE × ARO.', 'Ожидаемые годовые потери = SLE × ARO.'],
    ['ARO', 'Annualized Rate of Occurrence — expected number of times per year a threat occurs.', 'Ожидаемая частота инцидента в год.'],
    ['EF', 'Exposure Factor — percentage of asset value lost in one incident.', 'Фактор воздействия — доля ценности актива, теряемая за один инцидент.'],
    ['Residual risk', 'Risk remaining after controls are applied; must be accepted by management.', 'Риск после применения мер; его принимает руководство.'],
    ['Risk appetite', 'The amount and type of risk an organization is willing to pursue or retain.', 'Объём и тип риска, который организация готова принять.'],
    ['Delphi technique', 'Anonymous, iterative expert feedback to reach consensus (qualitative analysis).', 'Анонимный итеративный опрос экспертов для консенсуса (качественный анализ).'],
    ['MTD / MAO', 'Maximum Tolerable Downtime / Outage — the longest a function can be down before unacceptable damage.', 'Максимально допустимый простой функции.'],
    ['RTO', 'Recovery Time Objective — target time to restore a system after disruption; RTO ≤ MTD.', 'Целевое время восстановления; RTO ≤ MTD.'],
    ['RPO', 'Recovery Point Objective — maximum acceptable data loss measured in time.', 'Допустимая потеря данных, измеряемая во времени.'],
    ['WRT', 'Work Recovery Time — time to verify and resume business after systems are restored.', 'Время на проверку и возобновление работы после восстановления систем.'],
    ['BIA', 'Business Impact Analysis — identifies critical functions, impacts and recovery priorities.', 'Анализ влияния на бизнес: критичные функции, последствия, приоритеты.'],
    ['STRIDE', 'Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege.', 'Модель угроз Microsoft из шести категорий.'],
    ['PASTA', 'Process for Attack Simulation and Threat Analysis — 7-stage risk-centric threat modeling.', '7-этапная риск-ориентированная методология моделирования угроз.'],
    ['SBOM', 'Software Bill of Materials — inventory of components and dependencies in software.', 'Перечень компонентов и зависимостей ПО.'],
    ['Separation of duties', 'Splitting critical tasks so no single person can complete them alone.', 'Разделение критичных задач, чтобы один человек не мог выполнить их целиком.'],
    ['Job rotation', 'Moving people between roles to detect fraud and provide cross-training.', 'Перемещение сотрудников между ролями для выявления мошенничества и взаимозаменяемости.'],
    ['Compensating control', 'An alternative control used when the primary control is not feasible.', 'Альтернативная мера, когда основная невозможна.'],
    ['Trade secret', 'Confidential business information protected by secrecy (NDAs), never registered.', 'Конфиденциальная информация, защищённая секретностью (NDA), без регистрации.'],
    ['Patent', 'Protects an invention for ~20 years from filing; requires public disclosure.', 'Защита изобретения ~20 лет; требует раскрытия.'],
    ['Copyright', 'Protects the expression of an idea; generally life of author + 70 years.', 'Защищает выражение идеи; обычно жизнь автора + 70 лет.'],
    ['Data controller (GDPR)', 'Entity that determines the purposes and means of processing personal data.', 'Лицо, определяющее цели и средства обработки ПДн.'],
    ['Data processor (GDPR)', 'Entity that processes personal data on behalf of the controller.', 'Лицо, обрабатывающее ПДн по поручению контролёра.'],
    ['Preponderance of evidence', 'Civil standard of proof: more likely than not.', 'Гражданский стандарт: «скорее да, чем нет».'],
    ['Wassenaar Arrangement', 'Multinational export-control regime covering dual-use goods including cryptography.', 'Международный режим экспортного контроля товаров двойного назначения, включая криптографию.'],
  ],
  questions: [
    { o: '1.3', d: 1, q: 'Who has ultimate responsibility for the security of an organization\'s information assets?', a: ['Senior management', 'The CISO', 'The data custodian', 'The security administrator'], c: 0,
      e: 'Senior management (board, CEO) holds ultimate responsibility and accountability. They may delegate tasks but not accountability. The CISO runs the program; custodians implement controls.',
      r: 'Конечная ответственность — у высшего руководства. Задачи можно делегировать, подотчётность — нет. CISO ведёт программу, хранители реализуют меры.' },
    { o: '1.9', d: 1, q: 'A server worth $200,000 would lose 25% of its value in a flood. Floods are expected once every 10 years. What is the ALE?', a: ['$5,000', '$50,000', '$20,000', '$2,500'], c: 0,
      e: 'SLE = AV × EF = 200,000 × 0.25 = $50,000. ARO = 1/10 = 0.1. ALE = SLE × ARO = $5,000.',
      r: 'SLE = 200 000 × 0,25 = 50 000. ARO = 0,1. ALE = 50 000 × 0,1 = 5 000 $.' },
    { o: '1.9', d: 2, q: 'The ALE for a risk is $40,000. A safeguard costing $15,000 per year would reduce the ALE to $10,000. What is the annual value of the safeguard to the organization?', a: ['$15,000', '$30,000', '$25,000', '$5,000'], c: 0,
      e: 'Safeguard value = ALE before − ALE after − annual cost = 40,000 − 10,000 − 15,000 = $15,000. A positive value means the safeguard is cost-justified.',
      r: 'Ценность меры = ALE до − ALE после − годовая стоимость = 40 000 − 10 000 − 15 000 = 15 000 $. Положительное значение — мера оправдана.' },
    { o: '1.9', d: 2, q: 'After implementing all cost-effective controls, a risk remains that management decides not to address further. This is BEST described as:', a: ['Risk acceptance of residual risk', 'Risk rejection', 'Risk transference', 'Risk avoidance'], c: 0,
      e: 'The risk left after controls is residual risk. Making a documented decision to live with it is acceptance. Rejection (ignoring the risk) is never acceptable.',
      r: 'Риск после мер — остаточный; осознанное задокументированное решение с ним жить — принятие. Игнорирование (rejection) недопустимо.' },
    { o: '1.9', d: 1, q: 'Purchasing cybersecurity insurance is an example of which risk response?', a: ['Transference', 'Mitigation', 'Acceptance', 'Avoidance'], c: 0,
      e: 'Insurance transfers (shares) the financial impact to a third party. The organization still remains accountable for the security of its assets.',
      r: 'Страховка передаёт финансовые последствия третьей стороне. Подотчётность при этом остаётся у организации.' },
    { o: '1.9', d: 2, q: 'A company decides to discontinue a product line because the risk of a data breach from the related web application is too high. Which risk response is this?', a: ['Avoidance', 'Mitigation', 'Transference', 'Deterrence'], c: 0,
      e: 'Stopping the activity that creates the risk is avoidance.',
      r: 'Прекращение деятельности, порождающей риск, — избегание.' },
    { o: '1.3', d: 2, q: 'Conducting a risk assessment to understand which controls are needed is an example of:', a: ['Due diligence', 'Due care', 'Risk transference', 'Negligence'], c: 0,
      e: 'Due diligence is the research, investigation and planning (knowing what to do). Due care is actually doing it, i.e. implementing and operating controls.',
      r: 'Due diligence — исследование и планирование (знать, что делать). Due care — фактическое выполнение и эксплуатация мер.' },
    { o: '1.3', d: 2, q: 'An organization has identified that its patching process is weak but has done nothing about it for a year. A breach occurs through an unpatched server. The organization is MOST likely to be found to have failed in:', a: ['Due care', 'Due diligence', 'Risk avoidance', 'Separation of duties'], c: 0,
      e: 'It knew about the weakness (due diligence was done) but didn\'t act as a prudent person would. That is a failure of due care, i.e. negligence.',
      r: 'О слабости знали (due diligence выполнен), но не действовали как разумный человек — нарушение due care (халатность).' },
    { o: '1.6', d: 1, q: 'Which security document is NOT mandatory?', a: ['Guideline', 'Standard', 'Procedure', 'Baseline'], c: 0,
      e: 'Guidelines are recommendations. Policies, standards, baselines and procedures are mandatory.',
      r: 'Руководства (guidelines) — рекомендации. Политики, стандарты, базовые уровни и процедуры обязательны.' },
    { o: '1.6', d: 2, q: 'A document states: "All servers must use AES-256 for data at rest." This is BEST classified as a:', a: ['Standard', 'Policy', 'Guideline', 'Procedure'], c: 0,
      e: 'It specifies a particular technology and is mandatory, which makes it a standard. A policy would be technology-agnostic ("sensitive data must be encrypted at rest").',
      r: 'Указана конкретная технология и это обязательно — это стандарт. Политика была бы технологически нейтральной.' },
    { o: '1.1', d: 2, q: 'According to the ISC2 Code of Ethics, which canon takes precedence when canons conflict?', a: ['Protect society, the common good, necessary public trust and confidence, and the infrastructure', 'Provide diligent and competent service to principals', 'Advance and protect the profession', 'Act honorably, honestly, justly, responsibly, and legally'], c: 0,
      e: 'The canons are applied in order. Protecting society comes first, before acting legally and honorably, serving principals, and advancing the profession.',
      r: 'Каноны применяются по порядку: защита общества первая, затем честность и законность, затем служение работодателю/клиентам, затем профессия.' },
    { o: '1.1', d: 3, q: 'A CISSP discovers that their employer is knowingly shipping a medical device with a flaw that could endanger patients. Management orders them to stay silent. According to the ISC2 Code of Ethics, what should they do?', a: ['Report the issue through appropriate channels, since protecting society takes precedence over duty to the employer', 'Stay silent because the third canon requires diligent service to principals', 'Publicly disclose the vulnerability details on social media immediately', 'Resign without saying anything to avoid a conflict of interest'], c: 0,
      e: 'Canon 1 (protect society) outranks Canon 3 (serve principals). The ethical action is to escalate and report responsibly and legally (Canon 2), not to make a reckless public disclosure.',
      r: 'Канон 1 (защита общества) выше канона 3 (служение работодателю). Этично — эскалировать и сообщить ответственно и законно (канон 2), а не публиковать детали безрассудно.' },
    { o: '1.7', d: 1, q: 'Which BCP element determines the maximum amount of data loss, measured in time, that the business can tolerate?', a: ['Recovery Point Objective (RPO)', 'Recovery Time Objective (RTO)', 'Maximum Tolerable Downtime (MTD)', 'Work Recovery Time (WRT)'], c: 0,
      e: 'RPO is the point in time to which data must be recovered, i.e. acceptable data loss. It drives backup frequency. RTO is about how long restoration takes.',
      r: 'RPO — момент, к которому нужно восстановить данные (допустимая потеря). Определяет частоту бэкапов. RTO — про время восстановления.' },
    { o: '1.7', d: 2, q: 'A business process has an MTD of 8 hours. Work recovery (data validation) takes 3 hours. What is the MAXIMUM RTO for the supporting system?', a: ['5 hours', '8 hours', '11 hours', '3 hours'], c: 0,
      e: 'RTO + WRT must not exceed MTD, so RTO ≤ 8 − 3 = 5 hours.',
      r: 'RTO + WRT ≤ MTD, значит RTO ≤ 8 − 3 = 5 часов.' },
    { o: '1.7', d: 2, q: 'What is the FIRST thing needed for a successful business continuity program?', a: ['Senior management support and sponsorship', 'A business impact analysis', 'A contract with a hot site provider', 'A tested disaster recovery plan'], c: 0,
      e: 'Without senior management support (authority, budget, priority) the BCP will fail. The BIA comes early in the process, but only after the project is sanctioned and scoped.',
      r: 'Без поддержки руководства (полномочия, бюджет, приоритет) BCP провалится. BIA — ранний шаг, но после санкционирования и определения рамок проекта.' },
    { o: '1.7', d: 2, q: 'Which activity within BCP identifies critical business processes and quantifies the impact of their disruption?', a: ['Business impact analysis', 'Vulnerability assessment', 'Continuity strategy development', 'Plan approval'], c: 0,
      e: 'The BIA identifies critical functions, dependencies and impact (financial and non-financial), and it sets MTD, RTO and RPO.',
      r: 'BIA выявляет критичные функции, зависимости и последствия, задаёт MTD, RTO, RPO.' },
    { o: '1.7', d: 1, q: 'In business continuity planning, what is always the top priority?', a: ['Safety of people', 'Protection of critical data', 'Restoration of revenue-generating systems', 'Preservation of the facility'], c: 0,
      e: 'Human life and safety always come first in every ISC2 scenario.',
      r: 'Жизнь и безопасность людей — всегда на первом месте.' },
    { o: '1.4', d: 1, q: 'Which form of intellectual property protection requires public disclosure of the invention in exchange for exclusive rights?', a: ['Patent', 'Trade secret', 'Copyright', 'Trademark'], c: 0,
      e: 'A patent grants ~20 years of exclusivity in exchange for public disclosure. Trade secrets depend on never being disclosed.',
      r: 'Патент даёт ~20 лет исключительных прав в обмен на публичное раскрытие. Коммерческая тайна держится на нераскрытии.' },
    { o: '1.4', d: 2, q: 'A company wants to protect its proprietary manufacturing formula indefinitely. Which protection is MOST appropriate?', a: ['Trade secret', 'Patent', 'Copyright', 'Trademark'], c: 0,
      e: 'Trade secret protection lasts as long as secrecy is maintained (NDAs, access control). A patent expires after ~20 years and discloses the formula.',
      r: 'Коммерческая тайна действует, пока сохраняется секретность (NDA, контроль доступа). Патент истекает через ~20 лет и раскрывает формулу.' },
    { o: '1.4', d: 2, q: 'Under GDPR, within what timeframe must a controller notify the supervisory authority of a personal data breach (where feasible)?', a: ['72 hours', '24 hours', '30 days', 'Without any deadline'], c: 0,
      e: 'GDPR Article 33 requires notification without undue delay and, where feasible, within 72 hours of becoming aware of the breach.',
      r: 'Ст. 33 GDPR: без неоправданной задержки и, по возможности, в течение 72 часов с момента обнаружения.' },
    { o: '1.4', d: 2, q: 'A cloud provider stores and processes customer personal data strictly according to the customer\'s instructions. Under GDPR, the provider is the:', a: ['Data processor', 'Data controller', 'Data subject', 'Data protection officer'], c: 0,
      e: 'The processor processes on behalf of the controller. The controller (the customer) decides the purposes and means of processing.',
      r: 'Обработчик действует по поручению контролёра; контролёр (клиент) определяет цели и средства обработки.' },
    { o: '1.4', d: 2, q: 'PCI DSS is BEST described as:', a: ['A contractual industry standard enforced by the card brands', 'A US federal law', 'An EU regulation', 'An international treaty on data privacy'], c: 0,
      e: 'PCI DSS is created by the PCI Security Standards Council and enforced contractually through the card brands and acquirers. It is not a law.',
      r: 'PCI DSS — отраслевой стандарт PCI SSC, применяемый через договоры с платёжными системами и банками-эквайерами, а не закон.' },
    { o: '1.5', d: 2, q: 'Which standard of proof applies in a civil case?', a: ['Preponderance of the evidence', 'Beyond a reasonable doubt', 'Clear and convincing beyond any doubt', 'Probable cause'], c: 0,
      e: 'Civil cases use preponderance of the evidence (more likely than not). Criminal cases require proof beyond a reasonable doubt.',
      r: 'В гражданских делах — перевес доказательств («скорее да, чем нет»), в уголовных — вне разумных сомнений.' },
    { o: '1.5', d: 3, q: 'An internal investigation into an employee\'s policy violation reveals evidence of embezzlement. What should the investigator do to preserve the option of criminal prosecution?', a: ['Handle all evidence according to criminal-investigation standards, including chain of custody', 'Finish the administrative process first and then hand over a summary', 'Confront the employee to obtain a confession', 'Delete non-relevant evidence to simplify the case'], c: 0,
      e: 'Any investigation that could become criminal should follow the highest evidentiary standard from the start. Otherwise the evidence may be inadmissible.',
      r: 'Расследование, которое может стать уголовным, с самого начала ведётся по высшим стандартам обращения с доказательствами, иначе они могут быть недопустимы.' },
    { o: '1.8', d: 1, q: 'Requiring two different employees to approve and to issue a payment is an example of:', a: ['Separation of duties', 'Job rotation', 'Least privilege', 'Mandatory vacation'], c: 0,
      e: 'Splitting a critical task between people so that fraud requires collusion is separation of duties.',
      r: 'Разделение критичной задачи между людьми, чтобы мошенничество требовало сговора, — разделение обязанностей.' },
    { o: '1.8', d: 2, q: 'What is the PRIMARY security purpose of mandatory vacations?', a: ['To detect fraud or errors that the absent employee may be concealing', 'To improve employee morale', 'To comply with labor law', 'To reduce payroll costs'], c: 0,
      e: 'When the employee is away, someone else performs their duties and may discover irregularities. It is a detective control.',
      r: 'Пока сотрудник в отпуске, его обязанности выполняет другой и может обнаружить нарушения. Это детективная мера.' },
    { o: '1.8', d: 2, q: 'An employee with privileged access is about to be terminated on unfriendly terms. When should their access be disabled?', a: ['At or before the time they are notified of termination', 'At the end of their last working day', 'After the exit interview is completed', 'Within 24 hours of notification'], c: 0,
      e: 'Disable access no later than the moment of notification so that a disgruntled employee cannot cause damage.',
      r: 'Отключить доступ не позже момента уведомления, чтобы недовольный сотрудник не успел навредить.' },
    { o: '1.10', d: 1, q: 'In STRIDE, an attacker modifying data in transit falls under which category?', a: ['Tampering', 'Spoofing', 'Repudiation', 'Information disclosure'], c: 0,
      e: 'Tampering is the unauthorized modification of data, which violates integrity.',
      r: 'Tampering — несанкционированное изменение данных (нарушение целостности).' },
    { o: '1.10', d: 2, q: 'Which threat modeling methodology is a seven-stage, risk-centric process that aligns business objectives with technical requirements?', a: ['PASTA', 'STRIDE', 'DREAD', 'VAST'], c: 0,
      e: 'PASTA (Process for Attack Simulation and Threat Analysis) has 7 stages and is risk-centric. STRIDE is a threat categorization scheme and DREAD is a rating scheme.',
      r: 'PASTA — 7 стадий, риск-ориентированная. STRIDE — классификация угроз, DREAD — оценка.' },
    { o: '1.10', d: 2, q: 'When is threat modeling MOST effective?', a: ['During the early design phase of a system', 'Immediately after deployment', 'During annual penetration testing', 'After a security incident'], c: 0,
      e: 'Proactive threat modeling during design allows threats to be mitigated cheaply before code is written. It can still be done later, but at a higher cost.',
      r: 'Проактивное моделирование при проектировании позволяет дёшево устранить угрозы до написания кода.' },
    { o: '1.11', d: 2, q: 'A company wants assurance that a SaaS vendor\'s controls operated effectively over a period of time. Which report should it request?', a: ['SOC 2 Type II', 'SOC 1 Type I', 'SOC 3', 'SOC 2 Type I'], c: 0,
      e: 'SOC 2 covers security, availability, processing integrity, confidentiality and privacy controls. Type II tests operating effectiveness over a period (e.g. 6–12 months). Type I only covers design at a single point in time.',
      r: 'SOC 2 — меры безопасности, доступности и т.д.; Type II проверяет эффективность за период (6–12 мес.), Type I — только дизайн на дату.' },
    { o: '1.11', d: 2, q: 'Which artifact BEST helps an organization quickly determine whether its software is affected by a newly disclosed vulnerability in an open-source library?', a: ['Software Bill of Materials (SBOM)', 'Business impact analysis', 'Service level agreement', 'Penetration test report'], c: 0,
      e: 'An SBOM lists all components and their versions, so you can quickly match newly published CVEs against your software.',
      r: 'SBOM перечисляет компоненты и версии, что позволяет быстро сопоставить новые CVE с вашим ПО.' },
    { o: '1.11', d: 3, q: 'An organization outsources payroll processing to a third party. Which statement is MOST accurate?', a: ['The organization remains accountable for protecting the data even though the processing is outsourced', 'All liability transfers to the third party under the contract', 'The organization no longer needs to assess the vendor once the contract is signed', 'Only the vendor is responsible for breach notification'], c: 0,
      e: 'Responsibility for performing tasks can be outsourced, but accountability cannot. The organization must manage vendor risk throughout the relationship.',
      r: 'Выполнение задач можно передать, подотчётность — нет. Организация управляет риском поставщика на протяжении всего сотрудничества.' },
    { o: '1.12', d: 1, q: 'Which program is designed to change user behavior by making staff recognize security threats, without teaching detailed job skills?', a: ['Awareness', 'Training', 'Education', 'Certification'], c: 0,
      e: 'Awareness focuses attention on security ("what"). Training builds skills ("how"). Education builds deep understanding ("why").',
      r: 'Осведомлённость — привлечь внимание («что»); обучение — навыки («как»); образование — понимание («почему»).' },
    { o: '1.12', d: 2, q: 'What is the BEST way to measure the effectiveness of a security awareness program on phishing?', a: ['Track simulated-phishing click and reporting rates over time', 'Count the number of training sessions delivered', 'Measure how many employees signed the acceptable use policy', 'Survey employees on whether they liked the training'], c: 0,
      e: 'Behavioral metrics (clicks down, reports up) measure outcomes. Session counts and signatures measure only activity.',
      r: 'Поведенческие метрики (меньше кликов, больше сообщений) измеряют результат; число занятий и подписей — лишь активность.' },
    { o: '1.2', d: 2, q: 'Which mechanism provides nonrepudiation for a message?', a: ['Digital signature using the sender\'s private key', 'HMAC with a shared secret key', 'Encryption with the recipient\'s public key', 'A CRC checksum'], c: 0,
      e: 'Only the sender holds their private key, so the signature proves origin. With an HMAC, both parties share the key, so either could have created it.',
      r: 'Закрытый ключ есть только у отправителя, поэтому подпись доказывает авторство. HMAC — общий ключ, создать мог любой из двоих.' },
    { o: '1.3', d: 2, q: 'A security strategy that covers a five-year horizon and aligns security to business goals is a:', a: ['Strategic plan', 'Tactical plan', 'Operational plan', 'Project plan'], c: 0,
      e: 'Strategic plans are long-term (~5 years). Tactical plans are mid-term (~1 year). Operational plans are short-term and detailed.',
      r: 'Стратегический — долгосрочный (~5 лет), тактический — ~1 год, операционный — краткосрочный и детальный.' },
    { o: '1.9', d: 3, q: 'During a qualitative risk assessment, a facilitator collects anonymous expert opinions in several rounds until consensus is reached. Which technique is this?', a: ['Delphi technique', 'Monte Carlo simulation', 'Annualized loss expectancy', 'Fault tree analysis'], c: 0,
      e: 'Delphi uses anonymous, iterative feedback to avoid groupthink and the influence of dominant personalities.',
      r: 'Метод Дельфи — анонимная итеративная обратная связь, исключающая групповое мышление и давление авторитетов.' },
    { o: '1.9', d: 3, q: 'A small company cannot implement separation of duties for its sole system administrator. Management requires a second person to review all admin logs weekly. This review is BEST described as a:', a: ['Compensating control', 'Corrective control', 'Directive control', 'Recovery control'], c: 0,
      e: 'It substitutes for a control (separation of duties) that isn\'t feasible, so it is compensating. Functionally the review is also detective.',
      r: 'Заменяет невозможную меру (разделение обязанностей), значит компенсирующая; по функции — также детективная.' },
    { o: '1.9', d: 1, q: 'Which is an example of a deterrent control?', a: ['A "Premises under video surveillance" sign', 'An intrusion detection system', 'Restoring from backup', 'An access control list'], c: 0,
      e: 'Deterrent controls discourage an attacker. A warning sign deters, an IDS detects, a restore recovers, and an ACL prevents.',
      r: 'Сдерживающая мера отпугивает: табличка сдерживает, IDS обнаруживает, восстановление — восстанавливающая, ACL — превентивная.' },
    { o: '1.3', d: 2, q: 'Which framework is used to establish a certifiable Information Security Management System (ISMS)?', a: ['ISO/IEC 27001', 'ISO/IEC 27002', 'NIST SP 800-53', 'COBIT'], c: 0,
      e: 'ISO/IEC 27001 specifies ISMS requirements and organizations can be certified against it. 27002 provides control guidance and is not certifiable.',
      r: 'ISO/IEC 27001 задаёт требования к СУИБ, по нему сертифицируются. 27002 — рекомендации по мерам, не сертифицируется.' },
    { o: '1.3', d: 2, q: 'Which function was added to NIST Cybersecurity Framework 2.0?', a: ['Govern', 'Identify', 'Recover', 'Detect'], c: 0,
      e: 'CSF 2.0 (2024) added Govern to the original five functions: Identify, Protect, Detect, Respond and Recover.',
      r: 'CSF 2.0 (2024) добавил функцию Govern к пяти исходным: Identify, Protect, Detect, Respond, Recover.' },
    { t: 'order', o: '1.9', d: 2, q: 'Arrange the NIST RMF (SP 800-37 Rev. 2) steps in the correct order.', items: ['Prepare', 'Categorize', 'Select', 'Implement', 'Assess', 'Authorize', 'Monitor'],
      e: 'Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor.', r: 'Подготовка → Категорирование → Выбор → Внедрение → Оценка → Авторизация → Мониторинг.' },
    { t: 'match', o: '1.6', d: 2, q: 'Match each document type to its description.', pairs: [['Policy', 'Management intent, high-level and mandatory'], ['Standard', 'Mandatory specific technology or method'], ['Procedure', 'Mandatory step-by-step instructions'], ['Guideline', 'Optional recommendation']],
      e: 'Policies set intent, standards make it specific, procedures say how, and guidelines are the only optional documents.', r: 'Политика — намерение, стандарт — конкретика, процедура — как делать, руководство — единственное необязательное.' },
    { t: 'order', o: '1.7', d: 2, q: 'Arrange the BCP phases in order.', items: ['Project scope and planning', 'Business impact analysis', 'Continuity planning', 'Approval and implementation'],
      e: 'Scope and planning → BIA → continuity planning (strategy and provisions) → approval and implementation.', r: 'Рамки и планирование → BIA → планирование непрерывности → утверждение и внедрение.' },
  ],
});
