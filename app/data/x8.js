'use strict';
// Beginner layer for Domain 8: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(8, {
  'd8-c1': {
    plain: {
      en: `<p>The SDLC (software development life cycle) is the path from idea to retired software: requirements, design, build, test, release, maintain, retire. Security is cheapest at the start: changing a line in a requirements document costs minutes; fixing the same flaw after release can cost a breach. "<b>Shift left</b>" means moving security activities earlier in that path.</p>`,
      ru: `<p>SDLC (жизненный цикл разработки ПО) — путь от идеи до выведенного из эксплуатации ПО: требования, проектирование, разработка, тестирование, выпуск, сопровождение, вывод. Безопасность дешевле всего в начале: поправить строку в требованиях — минуты; исправить ту же ошибку после выпуска может стоить утечки. «<b>Сдвиг влево</b>» (shift left) — перенос мер безопасности на более ранние этапы этого пути.</p>`,
    },
    ex: {
      en: `<p>A bank building a mobile app writes "all sessions expire after 5 minutes of inactivity" and "no card numbers stored on the device" as requirements, threat-models the design, runs code scanning on every commit, gets a pentest before launch, and monitors and patches afterwards. When the app is replaced, its API is shut down and its keys revoked rather than left running.</p>`,
      ru: `<p>Банк, создающий мобильное приложение, записывает в требования «сессия истекает через 5 минут бездействия» и «номера карт не хранятся на устройстве», моделирует угрозы на этапе дизайна, сканирует код при каждом коммите, проводит пентест перед запуском, а потом мониторит и патчит. Когда приложение заменяют, его API отключают, а ключи отзывают, а не оставляют работать.</p>`,
    },
    dg: {
      title: { en: 'Security activities in each SDLC phase', ru: 'Меры безопасности на каждом этапе SDLC' }, h: 230,
      nodes: [
        ['p1', 85, 50, { en: 'Requirements', ru: 'Требования' }, null, null, 'key', 140], ['p2', 235, 50, { en: 'Design', ru: 'Дизайн' }, null, null, 'key', 130],
        ['p3', 385, 50, { en: 'Build', ru: 'Разработка' }, null, null, 'key', 130], ['p4', 535, 50, { en: 'Test', ru: 'Тестирование' }, null, null, 'key', 130],
        ['p5', 680, 50, { en: 'Release + run', ru: 'Выпуск + работа' }, null, null, 'key', 140],
        ['s1', 85, 160, { en: 'security reqs', ru: 'требования ИБ' }, { en: 'abuse cases', ru: 'сценарии злоуп.' }, null, 'dim', 140],
        ['s2', 235, 160, { en: 'threat model', ru: 'модель угроз' }, { en: 'secure design', ru: 'безоп. дизайн' }, null, 'dim', 130],
        ['s3', 385, 160, { en: 'secure coding', ru: 'безоп. код' }, { en: 'SAST, SCA, review', ru: 'SAST, SCA, ревью' }, null, 'dim', 130],
        ['s4', 535, 160, 'DAST, fuzzing', { en: 'pentest', ru: 'пентест' }, null, 'dim', 130],
        ['s5', 680, 160, { en: 'monitor, patch', ru: 'мониторинг, патчи' }, { en: 'secure disposal', ru: 'безоп. вывод' }, null, 'dim', 140],
      ],
      edges: [['p1', 'p2'], ['p2', 'p3'], ['p3', 'p4'], ['p4', 'p5'], ['s1', 'p1', null, 'dash'], ['s2', 'p2', null, 'dash'], ['s3', 'p3', null, 'dash'], ['s4', 'p4', null, 'dash'], ['s5', 'p5', null, 'dash']],
      note: { en: 'The further right a flaw is found, the more it costs to fix. Certification and accreditation happen before release.', ru: 'Чем правее найдена ошибка, тем дороже её исправить. Сертификация и аккредитация проходят до выпуска.' },
    },
  },
  'd8-c2': {
    plain: {
      en: `<p>Teams build software in different rhythms. <b>Waterfall</b> is building a house from a fixed blueprint, one phase after another. <b>Agile</b> (e.g. Scrum) delivers small working pieces every few weeks and adjusts as it goes. <b>DevOps</b> merges development and operations so code ships continuously; <b>DevSecOps</b> adds security as an automated part of that flow. Security must fit the rhythm: in Agile, security requirements become user stories, not a 100-page document at the end.</p>`,
      ru: `<p>Команды создают ПО в разном ритме. <b>Водопад</b> — строительство дома по жёсткому проекту, этап за этапом. <b>Agile</b> (например, Scrum) выдаёт небольшие работающие части каждые несколько недель и корректирует курс по ходу. <b>DevOps</b> объединяет разработку и эксплуатацию, чтобы код выходил непрерывно; <b>DevSecOps</b> добавляет безопасность как автоматическую часть этого потока. Безопасность должна вписываться в ритм: в Agile требования ИБ становятся пользовательскими историями, а не документом на 100 страниц в конце.</p>`,
    },
    ex: {
      en: `<p>A government contractor builds a weapons-control system with Waterfall: requirements are fixed by contract and every phase is formally signed off. A food-delivery startup ships 30 times a day with DevSecOps: every change runs through automated security tests, and the security team writes "as a user, my session expires after logout" stories into each sprint.</p>`,
      ru: `<p>Оборонный подрядчик делает систему управления оружием по водопаду: требования зафиксированы контрактом, каждый этап формально подписывается. Стартап доставки еды выпускает изменения 30 раз в день по DevSecOps: каждое изменение проходит автоматические проверки безопасности, а команда ИБ пишет в каждый спринт истории вроде «как пользователь, после выхода моя сессия завершается».</p>`,
    },
  },
  'd8-c3': {
    plain: {
      en: `<p>Maturity models measure how grown-up a development process is, from chaotic heroics to measured, continuously improving routines. <b>CMMI</b> has five levels: initial (chaos), managed (repeatable), defined (documented standard), quantitatively managed (measured), optimizing (improving). <b>OWASP SAMM</b> and <b>BSIMM</b> do the same specifically for software security. Their value is telling you the next sensible step, not giving you a trophy.</p>`,
      ru: `<p>Модели зрелости измеряют, насколько «взрослый» процесс разработки: от хаотичного героизма до измеряемой, постоянно улучшающейся рутины. В <b>CMMI</b> пять уровней: начальный (хаос), управляемый (повторяемый), определённый (документированный стандарт), количественно управляемый (измеряемый), оптимизирующий (улучшающийся). <b>OWASP SAMM</b> и <b>BSIMM</b> делают то же специально для безопасности ПО. Их ценность в том, чтобы подсказать следующий разумный шаг, а не вручить кубок.</p>`,
    },
    ex: {
      en: `<p>A software company scores itself with OWASP SAMM and finds "threat assessment" at level 0: nobody threat-models anything. Rather than buying a tool, it sets a one-year goal of level 1: every new feature with external input gets a 30-minute STRIDE session. Next year's assessment shows the improvement and picks the next weakest area.</p>`,
      ru: `<p>Софтверная компания оценивает себя по OWASP SAMM и видит «оценку угроз» на уровне 0: угрозы никто не моделирует. Вместо покупки инструмента она ставит цель на год — уровень 1: каждая новая функция с внешним вводом получает 30-минутную сессию STRIDE. Оценка через год показывает улучшение и выбирает следующую слабую область.</p>`,
    },
  },
  'd8-c4': {
    plain: {
      en: `<p>Software today is assembled more than written: a typical app is mostly open-source libraries. The <b>development ecosystem</b> is everything around the code: languages, libraries, the code repository, the build pipeline (<b>CI/CD</b>, continuous integration and delivery), and the tools in it. Each is part of the attack surface. Protect them like production: MFA on the repository, signed commits and builds, secrets kept in a vault and not in code, and automated security gates in the pipeline.</p>`,
      ru: `<p>Сегодня ПО больше собирают, чем пишут: типичное приложение в основном состоит из библиотек с открытым кодом. <b>Экосистема разработки</b> — всё вокруг кода: языки, библиотеки, репозиторий, конвейер сборки (<b>CI/CD</b>, непрерывная интеграция и доставка) и его инструменты. Каждая часть — поверхность атаки. Защищайте их как боевую среду: MFA на репозиторий, подписанные коммиты и сборки, секреты в хранилище, а не в коде, и автоматические «ворота» безопасности в конвейере.</p>`,
    },
    ex: {
      en: `<p>In 2024 a backdoor was discovered in the XZ Utils compression library, slipped in over two years by a contributor who had gained the maintainer's trust. It was caught by chance, just before reaching major Linux distributions, because a Microsoft engineer noticed SSH logins were half a second slower. SCA, SBOMs and reproducible builds are the systematic defenses.</p>`,
      ru: `<p>В 2024 году в библиотеке сжатия XZ Utils нашли бэкдор, который за два года внедрил участник, завоевавший доверие сопровождающего. Его обнаружили случайно, незадолго до попадания в крупные дистрибутивы Linux: инженер Microsoft заметил, что вход по SSH стал медленнее на полсекунды. Системная защита — SCA, SBOM и воспроизводимые сборки.</p>`,
    },
    dg: {
      title: { en: 'CI/CD pipeline with security gates', ru: 'Конвейер CI/CD с «воротами» безопасности' }, h: 240,
      nodes: [
        ['dev', 75, 70, { en: 'Developer', ru: 'Разработчик' }, { en: 'MFA, signed commits', ru: 'MFA, подписи' }, '🧑‍💻', null, 130],
        ['repo', 225, 70, { en: 'Repository', ru: 'Репозиторий' }, { en: 'code review', ru: 'ревью кода' }, '📚', null, 130],
        ['ci', 385, 70, { en: 'CI build', ru: 'CI-сборка' }, { en: 'SAST, SCA, secrets', ru: 'SAST, SCA, секреты' }, '⚙️', 'key', 150],
        ['art', 640, 70, { en: 'Signed artifact', ru: 'Подписанный артефакт' }, 'SBOM', '📦', 'key', 180],
        ['stg', 640, 185, 'Staging', 'DAST', '🧪', 'key', 140],
        ['prod', 400, 185, 'Production', { en: 'monitoring', ru: 'мониторинг' }, '🚀', 'ok', 150],
        ['vault', 150, 185, { en: 'Secrets vault', ru: 'Хранилище секретов' }, null, '🔐', null, 170],
      ],
      edges: [['dev', 'repo'], ['repo', 'ci'], ['ci', 'art', { en: 'gate', ru: 'ворота' }, 'ok'], ['art', 'stg'], ['stg', 'prod', { en: 'gate', ru: 'ворота' }, 'ok'], ['vault', 'prod', null, 'dash']],
      note: { en: 'A gate fails the build on critical findings. Secrets are injected at runtime from the vault, never stored in the repository.', ru: '«Ворота» останавливают сборку при критичных находках. Секреты подставляются при запуске из хранилища и никогда не лежат в репозитории.' },
    },
  },
  'd8-c5': {
    plain: {
      en: `<p>Most web attacks trick a program into treating <i>data</i> as <i>commands</i>. In <b>SQL injection</b>, a user types database commands into a form field and the app glues them into its query. In <b>XSS</b> (cross-site scripting), an attacker gets their JavaScript into a page that other users load. In <b>CSRF</b> (cross-site request forgery), a malicious site makes your logged-in browser send a request you never intended. The cures: <b>validate input</b> on the server, use <b>parameterized queries</b>, <b>encode output</b>, and use anti-CSRF tokens and SameSite cookies.</p>`,
      ru: `<p>Большинство веб-атак заставляют программу принять <i>данные</i> за <i>команды</i>. При <b>SQL-инъекции</b> пользователь вводит команды базы в поле формы, а приложение склеивает их со своим запросом. При <b>XSS</b> (межсайтовый скриптинг) атакующий внедряет свой JavaScript в страницу, которую загружают другие. При <b>CSRF</b> (межсайтовая подделка запроса) вредоносный сайт заставляет ваш залогиненный браузер отправить запрос, которого вы не хотели. Лекарства: <b>проверка ввода</b> на сервере, <b>параметризованные запросы</b>, <b>кодирование вывода</b>, анти-CSRF токены и cookie SameSite.</p>`,
    },
    ex: {
      en: `<p>In 2015 the UK telecom TalkTalk lost data on about 157,000 customers to a SQL injection attack on old web pages, reportedly carried out by teenagers; the regulator fined it £400,000 and the total cost was estimated at £77 million. The vulnerable code built queries by string concatenation, exactly the pattern parameterized queries eliminate.</p>`,
      ru: `<p>В 2015 году британский оператор TalkTalk потерял данные примерно 157 000 клиентов из-за SQL-инъекции в старых веб-страницах; по сообщениям, атаку провели подростки. Регулятор оштрафовал компанию на £400 000, а общий ущерб оценили в £77 млн. Уязвимый код строил запросы склейкой строк — ровно тот шаблон, который устраняют параметризованные запросы.</p>`,
    },
    dg: [{
      title: { en: 'SQL injection vs parameterized query', ru: 'SQL-инъекция и параметризованный запрос' }, h: 250,
      zones: [[10, 30, 740, 100, { en: 'Vulnerable: string concatenation', ru: 'Уязвимо: склейка строк' }, 'untrust'], [10, 140, 740, 100, { en: 'Safe: parameterized query', ru: 'Безопасно: параметризованный запрос' }, 'trust']],
      nodes: [
        ['in1', 120, 85, { en: "Input: ' OR 1=1 --", ru: "Ввод: ' OR 1=1 --" }, null, '⌨️', 'bad', 200],
        ['q1', 450, 85, "WHERE name='' OR 1=1 --'", { en: 'input became code', ru: 'ввод стал кодом' }, null, 'bad', 280],
        ['r1', 670, 85, { en: 'All rows', ru: 'Все строки' }, null, '💥', 'bad', 140],
        ['in2', 120, 195, { en: "Input: ' OR 1=1 --", ru: "Ввод: ' OR 1=1 --" }, null, '⌨️', null, 200],
        ['q2', 450, 195, 'WHERE name = ?', { en: 'input bound as data', ru: 'ввод передан как данные' }, null, 'ok', 280],
        ['r2', 670, 195, { en: 'No match', ru: 'Нет совпадений' }, null, '✅', 'ok', 140],
      ],
      edges: [['in1', 'q1', null, 'bad'], ['q1', 'r1', null, 'bad'], ['in2', 'q2', null, 'ok'], ['q2', 'r2', null, 'ok']],
      note: { en: 'With a parameterized query the database receives the command and the data separately, so the input can never change the command.', ru: 'При параметризованном запросе база получает команду и данные раздельно, и ввод никогда не может изменить команду.' },
    }, {
      title: { en: 'XSS and CSRF request flows', ru: 'Потоки запросов при XSS и CSRF' }, h: 270,
      zones: [[10, 30, 360, 230, 'Stored XSS', 'untrust'], [390, 30, 360, 230, 'CSRF', 'untrust']],
      nodes: [
        ['xa', 90, 90, { en: 'Attacker', ru: 'Атакующий' }, null, '🦹', 'bad'],
        ['xs', 280, 90, { en: 'Forum site', ru: 'Форум' }, { en: 'stores comment', ru: 'хранит коммент.' }, '🖥'],
        ['xv', 280, 210, { en: 'Victim browser', ru: 'Браузер жертвы' }, { en: 'runs the script', ru: 'выполняет скрипт' }, '💻', 'bad'],
        ['cv', 470, 85, { en: 'Victim browser', ru: 'Браузер жертвы' }, { en: 'logged in to bank', ru: 'вошёл в банк' }, '💻'],
        ['ce', 470, 215, { en: 'Evil site', ru: 'Злой сайт' }, { en: 'hidden form', ru: 'скрытая форма' }, '🦹', 'bad'],
        ['cb', 680, 150, { en: 'Bank', ru: 'Банк' }, { en: 'sees valid cookie', ru: 'видит cookie' }, '🏦'],
      ],
      edges: [
        ['xa', 'xs', { en: '1. <script>', ru: '1. <script>' }, 'bad'], ['xs', 'xv', { en: '2. page + script', ru: '2. стр. + скрипт' }, 'bad'], ['xv', 'xa', { en: '3. cookie', ru: '3. cookie' }, 'bad dash'],
        ['ce', 'cv', '1', 'bad'], ['cv', 'cb', { en: '2. transfer', ru: '2. перевод' }, 'bad'],
      ],
      note: { en: 'XSS abuses the user\'s trust in a site: fix with output encoding and a Content Security Policy. CSRF abuses the site\'s trust in the user\'s browser: fix with anti-CSRF tokens and SameSite cookies.', ru: 'XSS злоупотребляет доверием пользователя к сайту: лечится кодированием вывода и Content Security Policy. CSRF злоупотребляет доверием сайта к браузеру пользователя: лечится анти-CSRF токенами и cookie SameSite.' },
    }],
  },
  'd8-c6': {
    plain: {
      en: `<p>A database is a set of spreadsheets (tables) that a program can search very fast. Security inside a database works like a library: not everyone may enter the rare-books room. <b>Views</b> show users only some columns or rows, like a photocopy with the sensitive parts blacked out. <b>Transactions</b> follow <b>ACID</b> (atomicity, consistency, isolation, durability): a bank transfer either fully happens or not at all, never half. Watch out for <b>aggregation</b> and <b>inference</b>: harmless pieces that together reveal a secret.</p>`,
      ru: `<p>База данных — набор таблиц, по которым программа очень быстро ищет. Безопасность внутри базы похожа на библиотеку: не каждого пускают в зал редких книг. <b>Представления (views)</b> показывают пользователю только часть столбцов или строк, как ксерокопия с вымаранными секретами. <b>Транзакции</b> подчиняются <b>ACID</b> (атомарность, согласованность, изоляция, долговечность): банковский перевод либо проходит полностью, либо никак, никогда наполовину. Остерегайтесь <b>агрегации</b> и <b>логического вывода</b>: безобидные кусочки вместе раскрывают секрет.</p>`,
    },
    ex: {
      en: `<p>A hospital's call center needs to confirm appointments but must not see diagnoses. The DBA creates a view with name, date and doctor only, and grants the call-center role access to the view, never to the underlying table. A researcher with access only to anonymized statistics notices that "patients aged 97 in village X with condition Y" is a group of one: inference, countered by suppressing small groups.</p>`,
      ru: `<p>Колл-центру больницы нужно подтверждать приёмы, но диагнозы видеть нельзя. Администратор БД создаёт представление только с именем, датой и врачом и даёт роли колл-центра доступ к представлению, а не к исходной таблице. Исследователь с доступом лишь к анонимной статистике замечает, что «пациенты 97 лет из деревни X с болезнью Y» — группа из одного человека: это логический вывод, против которого скрывают малые группы.</p>`,
    },
    dg: {
      title: { en: 'Database view as an access-control layer', ru: 'Представление БД как уровень контроля доступа' }, h: 240,
      nodes: [
        ['cc', 100, 70, { en: 'Call center', ru: 'Колл-центр' }, { en: 'role: scheduler', ru: 'роль: запись' }, '☎️'],
        ['dr', 100, 180, { en: 'Doctor', ru: 'Врач' }, { en: 'role: clinician', ru: 'роль: врач' }, '🩺'],
        ['view', 380, 42, { en: 'View: appointments', ru: 'Представление: приёмы' }, { en: 'name, date, doctor', ru: 'имя, дата, врач' }, '🪟', 'key', 210],
        ['tbl', 640, 125, { en: 'Patients table', ru: 'Таблица пациентов' }, { en: '+ diagnosis, notes', ru: '+ диагноз, заметки' }, '🗄', null, 180],
      ],
      edges: [['cc', 'view', { en: 'SELECT', ru: 'SELECT' }, 'ok'], ['view', 'tbl', null, 'dash'], ['dr', 'tbl', { en: 'full row, own patients', ru: 'вся строка, свои пациенты' }, 'ok'], ['cc', 'tbl', null, 'bad dash']],
      note: { en: 'The call-center role has no grant on the table (red dashed line = denied); the view is the only path, and it hides sensitive columns.', ru: 'У роли колл-центра нет прав на таблицу (красный пунктир — запрещено); представление — единственный путь, и оно скрывает чувствительные столбцы.' },
    },
  },
  'd8-c7': {
    plain: {
      en: `<p>Not all software is written in-house. You can buy it off the shelf (<b>COTS</b>), use open source, outsource development, or rent it as a cloud service (<b>SaaS</b>). Each way you trust someone else's code. You can't review a vendor's source, so you check their reputation, certifications, patch history and SOC 2 report, write security requirements into the contract, and test the product in your own environment before trusting it.</p>`,
      ru: `<p>Не всё ПО пишется своими силами. Его можно купить готовым (<b>COTS</b>), взять открытое, заказать разработку на стороне или арендовать как облачный сервис (<b>SaaS</b>). В любом случае вы доверяете чужому коду. Исходники поставщика не проверить, поэтому оценивают репутацию, сертификаты, историю патчей и отчёт SOC 2, вписывают требования безопасности в договор и тестируют продукт в своей среде, прежде чем доверять.</p>`,
    },
    ex: {
      en: `<p>In 2023 a flaw in the MOVEit file-transfer product, bought off the shelf by thousands of organizations, let the Cl0p gang steal data from over 2,500 of them, including government agencies, airlines and payroll providers. Customers who had restricted MOVEit's internet exposure and monitored its database for unusual activity limited the damage.</p>`,
      ru: `<p>В 2023 году уязвимость в продукте передачи файлов MOVEit, купленном тысячами организаций, позволила группе Cl0p украсть данные более чем у 2500 из них, включая госведомства, авиакомпании и сервисы расчёта зарплаты. Клиенты, ограничившие доступ к MOVEit из интернета и отслеживавшие необычную активность в его базе, уменьшили ущерб.</p>`,
    },
  },
  'd8-c8': {
    plain: {
      en: `<p>Malware is any software built to harm. A <b>virus</b> attaches to files and needs a person to spread it. A <b>worm</b> spreads by itself across the network. A <b>trojan</b> pretends to be useful. <b>Ransomware</b> encrypts your data and demands payment. A <b>rootkit</b> hides deep in the system. A <b>logic bomb</b> waits for a trigger (a date, a deleted account). Defenses are layered: patches, least privilege, EDR, application allow lists, email filtering and good backups.</p>`,
      ru: `<p>Вредоносное ПО — любое ПО, созданное, чтобы навредить. <b>Вирус</b> прикрепляется к файлам, и для распространения ему нужен человек. <b>Червь</b> распространяется по сети сам. <b>Троян</b> притворяется полезным. <b>Шифровальщик</b> шифрует данные и требует выкуп. <b>Руткит</b> прячется глубоко в системе. <b>Логическая бомба</b> ждёт триггера (даты, удаления учётки). Защита эшелонирована: патчи, минимальные привилегии, EDR, списки разрешённых приложений, фильтрация почты и хорошие бэкапы.</p>`,
    },
    ex: {
      en: `<p>WannaCry in May 2017 was ransomware with a worm built in: it used the EternalBlue exploit against Windows file sharing (SMB) to jump from machine to machine with no user action. It hit about 200,000 computers in 150 countries, including much of the UK's NHS. Microsoft had released the patch two months earlier; unpatched and exposed SMB was the whole story.</p>`,
      ru: `<p>WannaCry в мае 2017 года — шифровальщик со встроенным червём: эксплойт EternalBlue против общего доступа к файлам Windows (SMB) позволял ему перескакивать с машины на машину без участия пользователя. Он поразил около 200 000 компьютеров в 150 странах, включая значительную часть британской NHS. Microsoft выпустила патч за два месяца до этого; вся история — в непропатченном и открытом SMB.</p>`,
    },
  },
});
