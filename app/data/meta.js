'use strict';
// Exam facts, study plan, strategy and resources.
// Exam facts verified against the ISC2 CISSP Exam Outline (effective April 15, 2024) in October 2026.

CISSP.meta = {
  verified: '2026-10',
  facts: [
    [{ en: 'Exam outline in force', ru: 'Действующая программа' }, { en: 'Effective April 15, 2024 (no newer outline announced as of Oct 2026)', ru: 'С 15 апреля 2024 (новой программы на октябрь 2026 не объявлено)' }],
    [{ en: 'Format', ru: 'Формат' }, { en: 'Computerized Adaptive Testing (CAT) in all languages', ru: 'Компьютерное адаптивное тестирование (CAT) на всех языках' }],
    [{ en: 'Number of items', ru: 'Количество вопросов' }, { en: '100–150 (includes 25 unscored pretest items)', ru: '100–150 (включая 25 незачётных пилотных вопросов)' }],
    [{ en: 'Time', ru: 'Время' }, { en: '3 hours', ru: '3 часа' }],
    [{ en: 'Item types', ru: 'Типы вопросов' }, { en: 'Multiple choice and advanced innovative items (drag-and-drop, hotspot)', ru: 'Множественный выбор и «продвинутые» (drag-and-drop, hotspot)' }],
    [{ en: 'Passing score', ru: 'Проходной балл' }, { en: '700 out of 1000 (scaled)', ru: '700 из 1000 (шкалированный)' }],
    [{ en: 'Navigation', ru: 'Навигация' }, { en: 'No going back, no skipping, no flagging for review', ru: 'Нельзя вернуться, пропустить или отметить вопрос' }],
    [{ en: 'Languages', ru: 'Языки' }, { en: 'English, Chinese, German, Japanese, Spanish (no Russian)', ru: 'Английский, китайский, немецкий, японский, испанский (русского нет)' }],
    [{ en: 'Delivery', ru: 'Где сдавать' }, { en: 'Pearson VUE test centers', ru: 'Тестовые центры Pearson VUE' }],
    [{ en: 'Fee', ru: 'Стоимость' }, { en: '$749 USD (local equivalents vary); retake costs the full fee', ru: '$749 (в других валютах по-разному); пересдача — полная стоимость' }],
    [{ en: 'Retake policy', ru: 'Пересдача' }, { en: 'Wait 30 days after 1st attempt, 60 after 2nd, 90 after 3rd; max 4 attempts in 12 months', ru: 'Ожидание 30 дней после 1-й, 60 после 2-й, 90 после 3-й; не более 4 попыток за 12 мес.' }],
    [{ en: 'Experience', ru: 'Опыт' }, { en: '5 years paid, full-time, in 2+ of the 8 domains. A 4-year degree or approved credential waives 1 year', ru: '5 лет оплачиваемой работы в 2+ доменах. Диплом или одобренный сертификат засчитывает 1 год' }],
    [{ en: 'Without experience', ru: 'Без опыта' }, { en: 'Pass → Associate of ISC2; 6 years to gain the experience', ru: 'Сдача → Associate of ISC2; 6 лет на набор опыта' }],
    [{ en: 'After passing', ru: 'После сдачи' }, { en: 'Endorsement by an ISC2-certified member within 9 months; agree to the Code of Ethics', ru: 'Рекомендация (endorsement) сертифицированного члена ISC2 в течение 9 месяцев; принять Кодекс этики' }],
    [{ en: 'Maintenance', ru: 'Поддержание' }, { en: '120 CPE credits per 3-year cycle (aim for 40/year) + annual maintenance fee ($135)', ru: '120 CPE за 3 года (ориентир 40/год) + ежегодный взнос ($135)' }],
  ],
  changesSince2018: [
    { en: '250 linear questions in 6 hours → CAT with 100–150 questions in 3 hours.', ru: '250 линейных вопросов за 6 часов → CAT, 100–150 вопросов за 3 часа.' },
    { en: 'Fee $699 → $749.', ru: 'Цена $699 → $749.' },
    { en: '"(ISC)²" rebranded as "ISC2" (2023).', ru: '«(ISC)²» переименована в «ISC2» (2023).' },
    { en: 'Outlines refreshed in 2021 and 2024: supply chain risk, threat modeling, zero trust, SASE, cloud, DevSecOps, SBOM-era topics added.', ru: 'Программа обновлялась в 2021 и 2024: добавлены риски цепочки поставок, моделирование угроз, zero trust, SASE, облака, DevSecOps.' },
    { en: 'Domain weights changed (Domain 1 is now 16%, Domain 8 is 10%).', ru: 'Изменились веса доменов (Домен 1 — 16%, Домен 8 — 10%).' },
  ],

  plan: [
    { w: 1, dom: [1], t: { en: 'Orientation + Security & Risk Management (I)', ru: 'Введение + Безопасность и риски (I)' }, tasks: [
      { en: 'Read the official exam outline and this app\'s "Exam strategy" page', ru: 'Прочитать официальную программу и страницу «Стратегия»' },
      { en: 'Take a baseline mini-exam (25 questions) — don\'t worry about the score', ru: 'Пройти входной мини-экзамен (25 вопросов) — результат не важен' },
      { en: 'OSG ch. 1 (Security Governance) and ch. 2 (Personnel Security & Risk Management)', ru: 'OSG гл. 1 (Управление безопасностью) и гл. 2 (Персонал и риски)' },
      { en: 'Study Domain 1 concepts: CIA, governance, risk, controls; play with the risk calculator', ru: 'Изучить понятия Домена 1: CIA, управление, риски, контроли; калькулятор риска' },
      { en: 'Start flashcards: Domain 1, 15 minutes per day', ru: 'Начать карточки: Домен 1, 15 минут в день' }] },
    { w: 2, dom: [1], t: { en: 'Security & Risk Management (II)', ru: 'Безопасность и риски (II)' }, tasks: [
      { en: 'OSG ch. 3 (Business Continuity Planning) and ch. 4 (Laws, Regulations, Compliance)', ru: 'OSG гл. 3 (Непрерывность бизнеса) и гл. 4 (Законы и соответствие)' },
      { en: 'Study BCP/BIA metrics (MTD, RTO, RPO, WRT), ethics canons, threat modeling, supply chain', ru: 'Изучить метрики BIA (MTD, RTO, RPO, WRT), канон этики, моделирование угроз, цепочки поставок' },
      { en: 'Domain 1 quiz until ≥ 75%', ru: 'Тест по Домену 1 до ≥ 75%' }] },
    { w: 3, dom: [2], t: { en: 'Asset Security', ru: 'Безопасность активов' }, tasks: [
      { en: 'OSG ch. 5 (Protecting Security of Assets)', ru: 'OSG гл. 5 (Защита активов)' },
      { en: 'Study classification, data roles, data states, sanitization (clear/purge/destroy)', ru: 'Изучить классификацию, роли, состояния данных, санитизацию' },
      { en: 'Domain 2 quiz ≥ 75%; review Domain 1 flashcards', ru: 'Тест по Домену 2 ≥ 75%; повторить карточки Домена 1' }] },
    { w: 4, dom: [3], t: { en: 'Architecture & Engineering (I): cryptography', ru: 'Архитектура (I): криптография' }, tasks: [
      { en: 'OSG ch. 6 (Cryptography & Symmetric Key Algorithms) and ch. 7 (PKI & Cryptographic Applications)', ru: 'OSG гл. 6 (Симметричная криптография) и гл. 7 (PKI)' },
      { en: 'Use the key-count, cipher and hashing demos', ru: 'Поработать с демо ключей, шифров и хешей' },
      { en: 'Make your own table: algorithm → type → key size → use', ru: 'Составить таблицу: алгоритм → тип → длина ключа → применение' }] },
    { w: 5, dom: [3], t: { en: 'Architecture & Engineering (II): models, vulnerabilities, physical', ru: 'Архитектура (II): модели, уязвимости, физическая защита' }, tasks: [
      { en: 'OSG ch. 8 (Security Models), ch. 9 (Vulnerabilities & Countermeasures), ch. 10 (Physical Security)', ru: 'OSG гл. 8, 9, 10' },
      { en: 'Bell-LaPadula / Biba simulator until the rules are automatic', ru: 'Симулятор Bell-LaPadula / Biba до автоматизма' },
      { en: 'Domain 3 quiz ≥ 75%', ru: 'Тест по Домену 3 ≥ 75%' }] },
    { w: 6, dom: [4], t: { en: 'Communication & Network Security', ru: 'Сетевая безопасность' }, tasks: [
      { en: 'OSG ch. 11 (Secure Network Architecture) and ch. 12 (Secure Communications & Network Attacks)', ru: 'OSG гл. 11 и 12' },
      { en: 'Learn the OSI model layer by layer: protocols, devices, attacks', ru: 'Выучить модель OSI: протоколы, устройства, атаки по уровням' },
      { en: 'Domain 4 quiz ≥ 75%', ru: 'Тест по Домену 4 ≥ 75%' }] },
    { w: 7, dom: [5], t: { en: 'Identity & Access Management', ru: 'Управление доступом' }, tasks: [
      { en: 'OSG ch. 13 (Managing Identity & Authentication) and ch. 14 (Controlling & Monitoring Access)', ru: 'OSG гл. 13 и 14' },
      { en: 'Kerberos flow, federation (SAML/OIDC/OAuth), access-control models, biometrics chart', ru: 'Kerberos, федерация (SAML/OIDC/OAuth), модели доступа, биометрия' },
      { en: 'Domain 5 quiz ≥ 75%', ru: 'Тест по Домену 5 ≥ 75%' }] },
    { w: 8, dom: [6], t: { en: 'Security Assessment & Testing', ru: 'Оценка и тестирование' }, tasks: [
      { en: 'OSG ch. 15 (Security Assessment & Testing)', ru: 'OSG гл. 15' },
      { en: 'SOC reports, test types, pentest phases, code testing, KPIs/KRIs', ru: 'SOC-отчёты, виды тестов, этапы пентеста, тестирование кода, KPI/KRI' },
      { en: 'Domain 6 quiz ≥ 75%; take a 2nd mini-exam', ru: 'Тест по Домену 6 ≥ 75%; второй мини-экзамен' }] },
    { w: 9, dom: [7], t: { en: 'Security Operations', ru: 'Операционная безопасность' }, tasks: [
      { en: 'OSG ch. 16 (Security Operations), 17 (Incidents), 18 (Disaster Recovery), 19 (Investigations & Ethics)', ru: 'OSG гл. 16, 17, 18, 19' },
      { en: 'Incident response lifecycle, evidence, DR sites, backups, RAID, change management', ru: 'Реагирование на инциденты, доказательства, DR-площадки, бэкапы, RAID, управление изменениями' },
      { en: 'Domain 7 quiz ≥ 75%', ru: 'Тест по Домену 7 ≥ 75%' }] },
    { w: 10, dom: [8], t: { en: 'Software Development Security', ru: 'Безопасность разработки ПО' }, tasks: [
      { en: 'OSG ch. 20 (Software Development Security) and ch. 21 (Malicious Code & Application Attacks)', ru: 'OSG гл. 20 и 21' },
      { en: 'SDLC & methodologies, maturity models, OWASP, database security, testing', ru: 'SDLC и методологии, модели зрелости, OWASP, безопасность БД, тестирование' },
      { en: 'Domain 8 quiz ≥ 75%', ru: 'Тест по Домену 8 ≥ 75%' }] },
    { w: 11, dom: [1, 2, 3, 4, 5, 6, 7, 8], t: { en: 'Full simulations & gap closing', ru: 'Полные симуляции и устранение пробелов' }, tasks: [
      { en: 'Full CAT simulation #1 (3 hours, in one sitting)', ru: 'Полная CAT-симуляция №1 (3 часа, за один подход)' },
      { en: 'Re-study the 2 weakest domains; quiz "missed questions only"', ru: 'Повторить 2 самых слабых домена; тест «только ошибки»' },
      { en: 'Full CAT simulation #2; target ≥ 750 estimated score', ru: 'CAT-симуляция №2; цель ≥ 750 баллов' },
      { en: 'Book the exam if you are consistently above the bar', ru: 'Записаться на экзамен, если стабильно выше порога' }] },
    { w: 12, dom: [1, 2, 3, 4, 5, 6, 7, 8], t: { en: 'Final review & exam readiness', ru: 'Финальное повторение' }, tasks: [
      { en: 'Eleventh Hour CISSP (fast read) + Destination Certification mind map videos', ru: 'Eleventh Hour CISSP + видео mind maps от Destination Certification' },
      { en: 'Re-read "Exam strategy": think like a manager / risk advisor', ru: 'Перечитать «Стратегию»: думать как менеджер / консультант по рискам' },
      { en: 'All flashcards in box ≥ 3', ru: 'Все карточки в коробке ≥ 3' },
      { en: 'Final CAT simulation 3–4 days before the exam, then rest', ru: 'Финальная CAT-симуляция за 3–4 дня, затем отдых' },
      { en: 'Logistics: ID, route to Pearson VUE center, sleep', ru: 'Логистика: документ, дорога до центра Pearson VUE, сон' }] },
  ],

  mindset: [
    { t: { en: 'Think like a manager, not a technician', ru: 'Думайте как менеджер, а не как техник' }, b: {
      en: 'You are a security advisor to senior management. You rarely "fix" things yourself; you identify risk, recommend, and follow process. When an answer has you reconfiguring a firewall and another has you following the incident-response plan or informing management, the process answer usually wins.',
      ru: 'Вы — советник по безопасности при высшем руководстве. Вы редко «чините» сами: вы выявляете риск, даёте рекомендации и следуете процессу. Если один ответ — перенастроить межсетевой экран, а другой — следовать плану реагирования или уведомить руководство, обычно верен процессный ответ.' } },
    { t: { en: 'Human safety first, always', ru: 'Безопасность людей — всегда на первом месте' }, b: {
      en: 'If any option protects people\'s lives, it beats protecting data, equipment, or money. Doors fail-safe (unlocked) in a fire; evacuate before saving servers.',
      ru: 'Если какой-то вариант защищает жизни людей, он важнее защиты данных, оборудования и денег. Двери при пожаре открываются (fail-safe); сначала эвакуация, потом серверы.' } },
    { t: { en: 'Senior management owns the risk', ru: 'Риск принадлежит высшему руководству' }, b: {
      en: 'Ultimate responsibility for security sits with senior management (the board, CEO). They approve policy, accept residual risk, and fund the program. Security proposes; management decides.',
      ru: 'Конечная ответственность за безопасность — у высшего руководства (совет директоров, CEO). Оно утверждает политику, принимает остаточный риск и финансирует программу. Безопасность предлагает — руководство решает.' } },
    { t: { en: 'Read the qualifier: BEST, FIRST, MOST, LEAST, PRIMARY', ru: 'Ищите ключевое слово: BEST, FIRST, MOST, LEAST, PRIMARY' }, b: {
      en: 'Several answers may be true. The question asks which is BEST, or what to do FIRST. "First" often means: understand or assess before acting (scope, business impact, policy). "Most important" usually points to the strategic, broad answer, not a detail.',
      ru: 'Верными могут быть несколько ответов. Вопрос спрашивает, что ЛУЧШЕ или что делать В ПЕРВУЮ ОЧЕРЕДЬ. «First» часто значит: сначала понять/оценить (рамки, влияние на бизнес, политику), потом действовать. «Most important» обычно указывает на стратегический, широкий ответ, а не на деталь.' } },
    { t: { en: 'Policy → standards → procedures; governance before technology', ru: 'Политика → стандарты → процедуры; управление до технологий' }, b: {
      en: 'Nothing happens without a policy and management support. Before buying a tool: understand the business requirement, classify the data, assess risk, and select controls whose cost doesn\'t exceed the asset value.',
      ru: 'Без политики и поддержки руководства ничего не делается. Прежде чем покупать инструмент: понять бизнес-требование, классифицировать данные, оценить риск и выбрать меры, стоимость которых не превышает ценность актива.' } },
    { t: { en: 'Due care / due diligence, and the "prudent person"', ru: 'Due care / due diligence и «разумный человек»' }, b: {
      en: 'Choose the answer a reasonable, prudent professional would take. Not paranoid and not negligent. Doing nothing is rarely right. Ignoring the law or the Code of Ethics is never right.',
      ru: 'Выбирайте то, что сделал бы разумный и осмотрительный профессионал: без паранойи и без халатности. Бездействие редко верно, нарушение закона или Кодекса этики — никогда.' } },
    { t: { en: 'CAT tactics', ru: 'Тактика CAT' }, b: {
      en: '<ul><li>You cannot go back. Answer, commit, move on. Don\'t carry the last question into the next one.</li><li>Hard questions are a <b>good</b> sign: CAT serves harder items when you are doing well.</li><li>Budget ~1.2 min per item (180 min / 150). Check the clock every 25 items.</li><li>Running out of time after 100 items is scored on your last 75 items. Running out before 100 is a fail.</li><li>Stopping at 100 can mean pass <i>or</i> fail. Don\'t read anything into the count.</li><li>25 items are unscored pretest items you can\'t identify. Treat every item as scored.</li></ul>',
      ru: '<ul><li>Вернуться нельзя. Ответили — забыли, не тащите прошлый вопрос в следующий.</li><li>Сложные вопросы — <b>хороший</b> знак: CAT даёт сложнее, когда вы отвечаете верно.</li><li>Бюджет ~1,2 мин на вопрос (180/150). Сверяйтесь со временем каждые 25 вопросов.</li><li>Если время кончилось после 100 вопросов, оценивают последние 75. До 100 — провал.</li><li>Остановка на 100 может значить и сдачу, и провал: не гадайте по количеству.</li><li>25 вопросов — незачётные пилотные, их не отличить. Отвечайте на всё всерьёз.</li></ul>' } },
    { t: { en: 'Elimination technique', ru: 'Метод исключения' }, b: {
      en: 'Remove answers that are illegal, unethical, too technical for the role, out of scope, or only partial. Of two "right" answers, pick the one that addresses the root cause, covers more, or comes earlier in the process.',
      ru: 'Отбрасывайте незаконные, неэтичные, слишком технические для роли, выходящие за рамки или частичные ответы. Из двух «правильных» выбирайте тот, что устраняет первопричину, шире охватывает или стоит раньше в процессе.' } },
  ],

  resources: [
    { cat: { en: 'Official (ISC2)', ru: 'Официальные (ISC2)' }, items: [
      ['CISSP certification page', 'https://www.isc2.org/certifications/cissp'],
      ['CISSP Exam Outline (current)', 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline'],
      ['ISC2 Code of Ethics', 'https://www.isc2.org/ethics'],
      ['Exam registration (Pearson VUE)', 'https://home.pearsonvue.com/isc2'],
      ['CISSP experience requirements', 'https://www.isc2.org/certifications/cissp/cissp-experience-requirements'],
    ] },
    { cat: { en: 'Books', ru: 'Книги' }, items: [
      ['ISC2 CISSP Official Study Guide, 10th ed. (Chapple, Stewart, Gibson, 2024) — main textbook', 'https://www.wiley.com/en-us/search?pq=CISSP%20Official%20Study%20Guide'],
      ['ISC2 CISSP Official Practice Tests, 4th ed. (Chapple, Seidl, 2024)', 'https://www.wiley.com/en-us/search?pq=CISSP%20Official%20Practice%20Tests'],
      ['CISSP All-in-One Exam Guide (Harris, Maymí) — deeper alternative', 'https://www.mheducation.com/search.html?searchQuery=cissp%20all-in-one'],
      ['Eleventh Hour CISSP (Conrad, Misenar, Feldman) — final review', 'https://www.google.com/search?q=Eleventh+Hour+CISSP+3rd+edition'],
      ['Destination CISSP: A Concise Guide (Destination Certification)', 'https://destcert.com/'],
    ] },
    { cat: { en: 'Video', ru: 'Видео' }, items: [
      ['Destination Certification — CISSP MindMaps (YouTube)', 'https://www.youtube.com/@DestinationCertification'],
      ['Pete Zerger — CISSP Exam Cram (Inside Cloud and Security, YouTube)', 'https://www.youtube.com/@InsideCloudandSecurity'],
      ['Kelly Handerhan — "Why you WILL pass the CISSP" (YouTube search)', 'https://www.youtube.com/results?search_query=kelly+handerhan+why+you+will+pass+the+cissp'],
      ['Larry Greenblatt — "Think like a manager" (YouTube search)', 'https://www.youtube.com/results?search_query=larry+greenblatt+cissp+think+like+a+manager'],
    ] },
    { cat: { en: 'Frameworks & standards referenced on the exam', ru: 'Стандарты и фреймворки' }, items: [
      ['NIST Cybersecurity Framework 2.0', 'https://www.nist.gov/cyberframework'],
      ['NIST SP 800-37 Risk Management Framework', 'https://csrc.nist.gov/pubs/sp/800/37/r2/final'],
      ['NIST SP 800-53 Security & Privacy Controls', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'],
      ['NIST SP 800-61 Incident Response', 'https://csrc.nist.gov/publications/sp800'],
      ['NIST SP 800-88 Media Sanitization', 'https://csrc.nist.gov/publications/sp800'],
      ['NIST SP 800-34 Contingency Planning', 'https://csrc.nist.gov/publications/sp800'],
      ['NIST SP 800-207 Zero Trust Architecture', 'https://csrc.nist.gov/pubs/sp/800/207/final'],
      ['OWASP Top 10', 'https://owasp.org/www-project-top-ten/'],
      ['OWASP SAMM', 'https://owaspsamm.org/'],
      ['MITRE ATT&CK', 'https://attack.mitre.org/'],
      ['CIS Critical Security Controls', 'https://www.cisecurity.org/controls'],
      ['Common Criteria portal', 'https://www.commoncriteriaportal.org/'],
    ] },
    { cat: { en: 'Community', ru: 'Сообщество' }, items: [
      ['r/cissp (Reddit) — pass/fail reports, advice', 'https://www.reddit.com/r/cissp/'],
      ['Original article this project is based on (Habr, 2018, RU)', 'https://habr.com/ru/companies/gaz-is/articles/415085/'],
    ] },
  ],
};
