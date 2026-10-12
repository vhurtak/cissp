'use strict';
// "Basics" primer for readers who work near IT but not in security or DevOps.
// glossary rows: [term, en, ru, [extra match patterns]] — these terms get hover definitions everywhere.

CISSP.basics = {
  intro: {
    en: 'CISSP assumes you already speak "IT". This page fills that gap in about an hour: how systems, networks, encryption, identity, cloud and software delivery work, plus the vocabulary of attacks and defenders. Read it once before the domains and come back whenever a word feels foreign.',
    ru: 'CISSP предполагает, что вы уже «говорите на IT». Эта страница закрывает пробел примерно за час: как устроены системы, сети, шифрование, идентичность, облако и доставка ПО, а также словарь атак и защитников. Прочитайте один раз перед доменами и возвращайтесь, когда встречаете незнакомое слово.',
  },
  sections: [
    {
      t: { en: '1. What an IT system is made of', ru: '1. Из чего состоит IT-система' },
      b: {
        en: `<p>Almost every system you will protect has the same four layers:</p>
<ul><li><b>Hardware</b>: the physical machine (laptop, phone, server in a data center).</li>
<li><b>Operating system (OS)</b>: Windows, macOS, Linux, Android. It controls the hardware and decides which program may touch which file.</li>
<li><b>Applications</b>: the programs people use (browser, Outlook, the company's CRM).</li>
<li><b>Data</b>: what the business actually cares about (customer records, payroll, designs).</li></ul>
<p>Most business software is <b>client–server</b>. The <b>client</b> is what you hold (a browser or mobile app). The <b>server</b> is a computer somewhere else that runs the real logic and keeps the data in a <b>database</b>. When you open online banking, your phone is the client, the bank's servers do the work, and your balance lives in the bank's database.</p>
<p><b>Why security cares:</b> every layer can be attacked. A stolen laptop is a hardware problem, an unpatched OS is a software problem, a weak app password is an identity problem, and a leaked database is a data problem. CISSP teaches you to protect all of them, with the data as the end goal.</p>`,
        ru: `<p>Почти любая защищаемая система состоит из четырёх слоёв:</p>
<ul><li><b>Оборудование</b>: физическая машина (ноутбук, телефон, сервер в дата-центре).</li>
<li><b>Операционная система (ОС)</b>: Windows, macOS, Linux, Android. Управляет железом и решает, какая программа может трогать какой файл.</li>
<li><b>Приложения</b>: программы, которыми пользуются люди (браузер, Outlook, CRM компании).</li>
<li><b>Данные</b>: то, что действительно ценно для бизнеса (клиенты, зарплаты, чертежи).</li></ul>
<p>Большинство бизнес-ПО устроено по модели <b>клиент–сервер</b>. <b>Клиент</b> у вас в руках (браузер или мобильное приложение). <b>Сервер</b> — компьютер где-то ещё, который выполняет основную логику и хранит данные в <b>базе данных</b>. Открывая онлайн-банк, телефон — это клиент, серверы банка делают работу, а баланс лежит в базе банка.</p>
<p><b>Почему это важно для безопасности:</b> атаковать можно каждый слой. Украденный ноутбук — проблема железа, непропатченная ОС — проблема ПО, слабый пароль — проблема идентичности, утёкшая база — проблема данных. CISSP учит защищать всё это, а конечная цель — данные.</p>`,
      },
      dg: {
        title: { en: 'A typical client–server application', ru: 'Типичное клиент-серверное приложение' }, h: 270,
        zones: [[440, 30, 210, 225, { en: 'Data center or cloud', ru: 'Дата-центр или облако' }]],
        nodes: [
          ['user', 70, 140, { en: 'User', ru: 'Пользователь' }, null, '🧑'],
          ['cl', 215, 140, { en: 'Client', ru: 'Клиент' }, { en: 'browser / mobile app', ru: 'браузер / приложение' }, '💻'],
          ['net', 365, 140, { en: 'Internet', ru: 'Интернет' }, null, '🌐'],
          ['app', 545, 90, { en: 'App server', ru: 'Сервер приложения' }, { en: 'runs business logic', ru: 'бизнес-логика' }, '🖥'],
          ['db', 545, 205, { en: 'Database', ru: 'База данных' }, { en: 'stores the records', ru: 'хранит записи' }, '🗄'],
        ],
        edges: [['user', 'cl', { en: 'clicks', ru: 'кликает' }], ['cl', 'net', { en: 'request', ru: 'запрос' }], ['net', 'app'], ['app', 'db', { en: 'SQL query', ru: 'SQL-запрос' }]],
        note: { en: 'Security controls sit on every arrow (encryption, firewalls, authentication) and every box (patching, hardening, access control).', ru: 'Меры защиты стоят на каждой стрелке (шифрование, межсетевые экраны, аутентификация) и в каждом блоке (патчи, харденинг, контроль доступа).' },
      },
    },
    {
      t: { en: '2. Networks and the internet', ru: '2. Сети и интернет' },
      b: {
        en: `<p>A <b>network</b> is computers connected so they can exchange data. Data travels in small chunks called <b>packets</b>, each with a sender and receiver address, like envelopes in the post.</p>
<ul><li><b>IP address</b> (e.g. 203.0.113.10): the "street address" of a device on a network.</li>
<li><b>Port</b> (e.g. 443): the "apartment number". It tells the server which program should get the packet: 443 is HTTPS (web), 22 is SSH (admin access), 25 is mail.</li>
<li><b>Protocol</b>: an agreed language for a conversation. HTTP for web pages, SMTP for email, DNS for name lookups.</li>
<li><b>DNS</b>: the internet's phone book. It turns <i>bank.com</i> into an IP address.</li>
<li><b>Switch</b>: connects devices inside one office network (LAN). <b>Router</b>: connects different networks and picks the path between them.</li>
<li><b>TCP vs UDP</b>: TCP is a phone call (connection set up first, everything confirmed). UDP is a postcard (just send, no confirmation). That makes UDP faster, e.g. for video calls.</li></ul>
<p>The <b>OSI model</b> (Domain 4) is just a 7-layer way of naming these pieces, from cables (layer 1) to applications (layer 7). Security people use it to say <i>where</i> an attack or a control works.</p>`,
        ru: `<p><b>Сеть</b> — компьютеры, соединённые для обмена данными. Данные идут небольшими порциями — <b>пакетами</b>, у каждого есть адрес отправителя и получателя, как у конверта.</p>
<ul><li><b>IP-адрес</b> (например, 203.0.113.10): «адрес дома» устройства в сети.</li>
<li><b>Порт</b> (например, 443): «номер квартиры». Говорит серверу, какой программе отдать пакет: 443 — HTTPS (веб), 22 — SSH (админ-доступ), 25 — почта.</li>
<li><b>Протокол</b>: договорённый язык общения. HTTP для веб-страниц, SMTP для почты, DNS для поиска имён.</li>
<li><b>DNS</b>: телефонная книга интернета. Превращает <i>bank.com</i> в IP-адрес.</li>
<li><b>Коммутатор (switch)</b> соединяет устройства внутри офисной сети (LAN). <b>Маршрутизатор (router)</b> соединяет разные сети и выбирает путь между ними.</li>
<li><b>TCP и UDP</b>: TCP — телефонный звонок (сначала соединение, всё подтверждается). UDP — открытка (просто отправил, без подтверждения). Поэтому UDP быстрее, например для видеозвонков.</li></ul>
<p><b>Модель OSI</b> (домен 4) — просто способ назвать эти части по 7 уровням, от кабелей (уровень 1) до приложений (уровень 7). Безопасники используют её, чтобы сказать, <i>где</i> работает атака или мера защиты.</p>`,
      },
      dg: {
        title: { en: 'What happens when you open https://bank.com', ru: 'Что происходит, когда вы открываете https://bank.com' }, h: 250,
        zones: [[540, 105, 205, 125, { en: 'Bank', ru: 'Банк' }]],
        nodes: [
          ['br', 100, 170, { en: 'Your browser', ru: 'Ваш браузер' }, null, '💻'],
          ['dns', 390, 50, { en: 'DNS resolver', ru: 'DNS-резолвер' }, { en: 'name → IP', ru: 'имя → IP' }, '📖'],
          ['web', 640, 170, { en: 'Web server', ru: 'Веб-сервер' }, { en: '203.0.113.10, port 443', ru: '203.0.113.10, порт 443' }, '🖥'],
        ],
        edges: [
          ['br', 'dns', { en: '1. where is bank.com?', ru: '1. где bank.com?' }], ['dns', 'br', '2. 203.0.113.10'],
          ['br', 'web', { en: '3. TCP + TLS handshake', ru: '3. TCP + TLS рукопожатие' }, 'key'], ['web', 'br', { en: '4. encrypted page', ru: '4. шифрованная страница' }, 'key'],
        ],
        note: { en: 'Each step is an attack point: fake DNS answers (DNS poisoning), a fake Wi-Fi in the middle (man-in-the-middle), or a fake certificate. TLS and DNSSEC are the controls.', ru: 'Каждый шаг — точка атаки: поддельный ответ DNS (отравление DNS), фальшивый Wi-Fi посередине (MITM), поддельный сертификат. Защита — TLS и DNSSEC.' },
      },
    },
    {
      t: { en: '3. A typical company network', ru: '3. Типичная сеть компании' },
      b: {
        en: `<p>Companies split their network into <b>zones</b> by trust level and put <b>firewalls</b> between them. A firewall is a guard with a rule list: "allow web traffic to the web server on port 443, block everything else".</p>
<ul><li><b>Internet</b>: untrusted. Anyone, including attackers.</li>
<li><b>DMZ (screened subnet)</b>: a buffer zone for servers the public must reach (website, mail gateway). If one is hacked, the attacker still faces another firewall.</li>
<li><b>Internal LAN</b>: employee laptops, file servers, databases. Never directly reachable from the internet.</li>
<li><b>VPN</b>: an encrypted tunnel that lets a remote employee work as if they were in the office.</li></ul>
<p>This layering is <b>defense in depth</b>: no single control is trusted to stop everything. Modern companies add <b>Zero Trust</b> on top: even inside the LAN, every request must prove who it is and that the device is healthy.</p>`,
        ru: `<p>Компании делят сеть на <b>зоны</b> по уровню доверия и ставят между ними <b>межсетевые экраны (firewall)</b>. Firewall — охранник со списком правил: «пускать веб-трафик к веб-серверу на порт 443, остальное блокировать».</p>
<ul><li><b>Интернет</b>: недоверенная зона. Кто угодно, включая злоумышленников.</li>
<li><b>DMZ (экранированная подсеть)</b>: буферная зона для серверов, к которым должна обращаться публика (сайт, почтовый шлюз). Если один из них взломан, перед атакующим ещё один firewall.</li>
<li><b>Внутренняя сеть (LAN)</b>: ноутбуки сотрудников, файловые серверы, базы данных. Напрямую из интернета недоступна.</li>
<li><b>VPN</b>: зашифрованный туннель, через который удалённый сотрудник работает как из офиса.</li></ul>
<p>Такое наслоение — <b>эшелонированная защита (defense in depth)</b>: ни одной мере не доверяют остановить всё. Современные компании добавляют <b>Zero Trust</b>: даже внутри LAN каждый запрос доказывает, кто он и что устройство в порядке.</p>`,
      },
      dg: {
        title: { en: 'Internet → DMZ → internal network', ru: 'Интернет → DMZ → внутренняя сеть' }, h: 330,
        zones: [[10, 40, 120, 210, { en: 'Untrusted', ru: 'Недоверенная' }, 'untrust'], [255, 40, 175, 250, 'DMZ', 'dmz'], [565, 40, 185, 250, { en: 'Internal LAN', ru: 'Внутренняя сеть' }, 'trust']],
        nodes: [
          ['inet', 70, 150, { en: 'Internet', ru: 'Интернет' }, null, '🌐', null, 100],
          ['fw1', 190, 165, 'Firewall', null, '🧱', 'key', 90],
          ['web', 342, 115, { en: 'Public website', ru: 'Публичный сайт' }, null, '🖥'],
          ['mail', 342, 225, { en: 'Mail gateway', ru: 'Почтовый шлюз' }, null, '📧'],
          ['fw2', 497, 165, 'Firewall', null, '🧱', 'key', 90],
          ['pc', 657, 95, { en: 'Employee PCs', ru: 'ПК сотрудников' }, null, '💻'],
          ['fs', 657, 165, { en: 'File server', ru: 'Файл-сервер' }, null, '🗂'],
          ['db', 657, 235, { en: 'Database', ru: 'База данных' }, null, '🗄'],
          ['rem', 120, 300, { en: 'Remote employee', ru: 'Удалённый сотрудник' }, null, '🏠'],
        ],
        edges: [
          ['inet', 'fw1'], ['fw1', 'web', { en: 'HTTPS only', ru: 'только HTTPS' }], ['fw1', 'mail', 'SMTP'],
          ['web', 'fw2', { en: 'app → DB only', ru: 'только к БД' }], ['fw2', 'db'], ['rem', 'fw2', { en: 'VPN tunnel (encrypted)', ru: 'VPN-туннель (шифр.)' }, 'key dash'],
        ],
      },
    },
    {
      t: { en: '4. Encryption, keys and hashes in five minutes', ru: '4. Шифрование, ключи и хэши за пять минут' },
      b: {
        en: `<p><b>Encryption</b> scrambles data so only someone with the right <b>key</b> can read it. The readable text is <b>plaintext</b>; the scrambled result is <b>ciphertext</b>.</p>
<ul><li><b>Symmetric encryption</b> (AES): one shared key locks and unlocks, like a house key. Very fast. The hard part is getting the key to the other person safely.</li>
<li><b>Asymmetric encryption</b> (RSA, ECC): a key pair. The <b>public key</b> is like an open padlock you hand to anyone: they can lock a box for you. Only your <b>private key</b> opens it. Slow, so it is used to exchange a symmetric key, which then does the bulk work.</li>
<li><b>Hash</b> (SHA-256): a fingerprint of data. The same input always gives the same short value; change one letter and the hash changes completely. You can't turn a hash back into the data. Used to check that files weren't changed and to store passwords.</li>
<li><b>Digital signature</b>: you hash a document and encrypt the hash with your <i>private</i> key. Anyone can check it with your public key. It proves who signed and that nothing changed.</li>
<li><b>Certificate</b>: a digital ID card that binds a public key to a name (e.g. bank.com). It is signed by a trusted <b>Certificate Authority (CA)</b>. That is what the padlock icon in your browser checks.</li></ul>
<p>Memory hook: encryption = <b>confidentiality</b>, hash = <b>integrity</b>, signature = integrity + <b>authenticity</b> + <b>non-repudiation</b>.</p>`,
        ru: `<p><b>Шифрование</b> перемешивает данные так, что прочитать их может только владелец правильного <b>ключа</b>. Читаемый текст — <b>открытый текст (plaintext)</b>, результат — <b>шифртекст (ciphertext)</b>.</p>
<ul><li><b>Симметричное шифрование</b> (AES): один общий ключ и запирает, и отпирает, как ключ от дома. Очень быстро. Сложность — безопасно передать ключ собеседнику.</li>
<li><b>Асимметричное шифрование</b> (RSA, ECC): пара ключей. <b>Открытый ключ</b> — как открытый навесной замок, который вы раздаёте всем: любой может запереть для вас ящик. Открыть его может только ваш <b>закрытый ключ</b>. Медленно, поэтому им обмениваются симметричным ключом, а тот уже шифрует основной поток.</li>
<li><b>Хэш</b> (SHA-256): отпечаток данных. Один и тот же вход даёт одно и то же короткое значение; поменяйте одну букву — хэш изменится полностью. Из хэша данные не восстановить. Используют для проверки, что файл не менялся, и для хранения паролей.</li>
<li><b>Цифровая подпись</b>: хэш документа шифруется вашим <i>закрытым</i> ключом. Любой проверит её вашим открытым ключом. Доказывает, кто подписал и что ничего не изменено.</li>
<li><b>Сертификат</b>: цифровое удостоверение, связывающее открытый ключ с именем (например, bank.com). Подписан доверенным <b>удостоверяющим центром (CA)</b>. Именно это проверяет значок замка в браузере.</li></ul>
<p>Запомнить: шифрование = <b>конфиденциальность</b>, хэш = <b>целостность</b>, подпись = целостность + <b>подлинность</b> + <b>неотказуемость</b>.</p>`,
      },
      dg: {
        title: { en: 'How your browser trusts bank.com (PKI)', ru: 'Почему браузер доверяет bank.com (PKI)' }, h: 260,
        nodes: [
          ['ca', 390, 50, { en: 'Certificate Authority', ru: 'Удостоверяющий центр' }, { en: 'e.g. DigiCert, Let\'s Encrypt', ru: 'например, DigiCert, Let\'s Encrypt' }, '🏛', 'key'],
          ['br', 110, 200, { en: 'Browser', ru: 'Браузер' }, { en: 'has a list of trusted CAs', ru: 'знает список доверенных CA' }, '💻'],
          ['web', 650, 200, 'bank.com', { en: 'certificate + private key', ru: 'сертификат + закрытый ключ' }, '🖥'],
        ],
        edges: [
          ['ca', 'web', { en: 'signs certificate', ru: 'подписывает сертификат' }, 'key'],
          ['web', 'br', { en: 'sends certificate', ru: 'отправляет сертификат' }],
          ['br', 'web', { en: 'agree session key', ru: 'согласуют сеансовый ключ' }, 'ok'],
          ['br', 'ca', { en: 'verify CA signature', ru: 'проверка подписи CA' }, 'dash'],
        ],
        note: { en: 'After the handshake, all traffic is encrypted with a fast symmetric session key (AES).', ru: 'После рукопожатия весь трафик шифруется быстрым симметричным сеансовым ключом (AES).' },
      },
    },
    {
      t: { en: '5. Identity: accounts, passwords, MFA, SSO', ru: '5. Идентичность: учётки, пароли, MFA, SSO' },
      b: {
        en: `<p>Every access decision answers four questions, in order: <b>who do you claim to be</b> (identification, e.g. username), <b>prove it</b> (authentication, e.g. password), <b>what may you do</b> (authorization, e.g. "read-only on payroll"), and <b>what did you do</b> (accounting, the audit log).</p>
<ul><li><b>Authentication factors</b>: something you <i>know</i> (password), <i>have</i> (phone, security key), <i>are</i> (fingerprint). <b>MFA</b> means two or more <i>different</i> types. Password + PIN is still one factor.</li>
<li><b>SSO (single sign-on)</b>: you log in once to an <b>identity provider (IdP)</b> such as Microsoft Entra ID or Okta, and it vouches for you to dozens of apps.</li>
<li><b>Federation</b>: the same idea between organizations ("Log in with Google"). Protocols: SAML, OAuth 2.0, OpenID Connect.</li>
<li><b>Least privilege</b>: give each person only the access their job needs, and remove it when the job changes.</li></ul>`,
        ru: `<p>Каждое решение о доступе отвечает на четыре вопроса по порядку: <b>кем вы себя называете</b> (идентификация, например логин), <b>докажите</b> (аутентификация, например пароль), <b>что вам можно</b> (авторизация, например «только чтение зарплат») и <b>что вы сделали</b> (учёт, журнал аудита).</p>
<ul><li><b>Факторы аутентификации</b>: то, что вы <i>знаете</i> (пароль), <i>имеете</i> (телефон, ключ безопасности), чем вы <i>являетесь</i> (отпечаток). <b>MFA</b> — два и более <i>разных</i> типа. Пароль + PIN — всё ещё один фактор.</li>
<li><b>SSO (единый вход)</b>: вы входите один раз в <b>поставщик идентификации (IdP)</b>, например Microsoft Entra ID или Okta, и он ручается за вас перед десятками приложений.</li>
<li><b>Федерация</b>: то же самое между организациями («Войти через Google»). Протоколы: SAML, OAuth 2.0, OpenID Connect.</li>
<li><b>Минимальные привилегии</b>: каждому только тот доступ, который нужен для работы, и отзыв, когда работа меняется.</li></ul>`,
      },
      dg: {
        title: { en: 'Logging in to a cloud app with SSO + MFA', ru: 'Вход в облачное приложение через SSO + MFA' }, h: 310,
        nodes: [
          ['u', 90, 160, { en: 'Employee', ru: 'Сотрудник' }, null, '🧑'],
          ['app', 380, 55, { en: 'Cloud app', ru: 'Облачное приложение' }, { en: 'e.g. Salesforce', ru: 'например, Salesforce' }, '☁️'],
          ['idp', 380, 260, { en: 'Identity provider', ru: 'Поставщик идентификации' }, 'Entra ID / Okta', '🪪', 'key'],
          ['ph', 650, 260, { en: 'Phone', ru: 'Телефон' }, { en: 'authenticator app', ru: 'приложение-аутентификатор' }, '📱'],
        ],
        edges: [
          ['u', 'app', { en: '1. open app', ru: '1. открыть' }], ['app', 'u', { en: '2. go to IdP', ru: '2. иди к IdP' }],
          ['u', 'idp', { en: '3. password', ru: '3. пароль' }], ['idp', 'ph', { en: '4. push to approve', ru: '4. push-запрос' }],
          ['idp', 'app', { en: '5. signed token: "this is Anna"', ru: '5. подписанный токен: «это Анна»' }, 'key'],
        ],
        note: { en: 'The app never sees the password. When Anna leaves the company, disabling one IdP account cuts access to every app.', ru: 'Приложение не видит пароль. Когда Анна уходит, отключение одной учётки в IdP закрывает доступ ко всем приложениям.' },
      },
    },
    {
      t: { en: '6. Cloud, virtual machines and containers', ru: '6. Облако, виртуальные машины и контейнеры' },
      b: {
        en: `<p><b>Virtualization</b> lets one physical server pretend to be many. A <b>hypervisor</b> (VMware, Hyper-V, KVM) splits the hardware into <b>virtual machines (VMs)</b>, each with its own OS. <b>Containers</b> (Docker, Kubernetes) are lighter: they share the host OS and package just the app and its libraries. They start in seconds and are how most modern apps are shipped.</p>
<p><b>Cloud</b> means renting this from a provider (AWS, Azure, Google Cloud) instead of owning it:</p>
<ul><li><b>IaaS</b>: you rent VMs, networks and storage. You manage the OS and everything above it.</li>
<li><b>PaaS</b>: you upload your code; the provider runs the OS and runtime.</li>
<li><b>SaaS</b>: you just use the finished app (Microsoft 365, Gmail, Salesforce).</li></ul>
<p>The <b>shared responsibility model</b> says who secures what. The provider always secures the buildings and hardware. The customer is <i>always</i> responsible for its data, its users and their access. Most cloud breaches are customer mistakes, such as a storage bucket left public.</p>`,
        ru: `<p><b>Виртуализация</b> позволяет одному физическому серверу притворяться многими. <b>Гипервизор</b> (VMware, Hyper-V, KVM) делит железо на <b>виртуальные машины (VM)</b>, у каждой своя ОС. <b>Контейнеры</b> (Docker, Kubernetes) легче: они используют ОС хоста и упаковывают только приложение и его библиотеки. Запускаются за секунды; так поставляется большинство современных приложений.</p>
<p><b>Облако</b> — аренда всего этого у провайдера (AWS, Azure, Google Cloud) вместо владения:</p>
<ul><li><b>IaaS</b>: арендуете VM, сети и хранилище. ОС и всё выше — ваше.</li>
<li><b>PaaS</b>: загружаете код; ОС и среду выполнения ведёт провайдер.</li>
<li><b>SaaS</b>: просто пользуетесь готовым приложением (Microsoft 365, Gmail, Salesforce).</li></ul>
<p><b>Модель разделённой ответственности</b> говорит, кто что защищает. Провайдер всегда отвечает за здания и железо. Клиент <i>всегда</i> отвечает за свои данные, пользователей и их доступ. Большинство облачных утечек — ошибки клиента, например публично открытое хранилище.</p>`,
      },
      dg: {
        title: { en: 'Virtual machines vs containers', ru: 'Виртуальные машины и контейнеры' }, h: 300,
        zones: [[15, 30, 345, 260, { en: 'Virtual machines', ru: 'Виртуальные машины' }], [400, 30, 345, 260, { en: 'Containers', ru: 'Контейнеры' }]],
        nodes: [
          ['a1', 110, 75, { en: 'App A', ru: 'Прил. A' }, null, null, 'ok', 130], ['a2', 265, 75, { en: 'App B', ru: 'Прил. B' }, null, null, 'ok', 130],
          ['g1', 110, 125, { en: 'Guest OS', ru: 'Гостевая ОС' }, null, null, 'key', 130], ['g2', 265, 125, { en: 'Guest OS', ru: 'Гостевая ОС' }, null, null, 'key', 130],
          ['hv', 187, 190, { en: 'Hypervisor', ru: 'Гипервизор' }, null, null, null, 285],
          ['hw', 187, 245, { en: 'Physical server', ru: 'Физический сервер' }, null, null, 'dim', 285],
          ['c1', 495, 100, { en: 'Container A', ru: 'Контейнер A' }, { en: 'app + libraries', ru: 'прил. + библиотеки' }, null, 'ok', 130],
          ['c2', 650, 100, { en: 'Container B', ru: 'Контейнер B' }, { en: 'app + libraries', ru: 'прил. + библиотеки' }, null, 'ok', 130],
          ['ce', 572, 175, { en: 'Host OS + container engine', ru: 'ОС хоста + движок контейнеров' }, null, null, 'key', 285],
          ['hw2', 572, 245, { en: 'Server (physical or VM)', ru: 'Сервер (физический или VM)' }, null, null, 'dim', 285],
        ],
        edges: [],
        note: { en: 'VMs are isolated by separate operating systems; containers share one kernel, so a kernel flaw can affect all containers on that host.', ru: 'VM изолированы отдельными ОС; контейнеры делят одно ядро, поэтому уязвимость ядра может затронуть все контейнеры на хосте.' },
      },
    },
    {
      t: { en: '7. How software is built and shipped (DevOps)', ru: '7. Как создаётся и выпускается ПО (DevOps)' },
      b: {
        en: `<p>Developers keep code in a <b>repository</b> (Git, on GitHub or GitLab). Every change goes through a <b>CI/CD pipeline</b>: an automated assembly line that builds the code, runs tests, and deploys it.</p>
<ul><li><b>CI (continuous integration)</b>: every change is built and tested automatically within minutes.</li>
<li><b>CD (continuous delivery/deployment)</b>: tested builds are pushed to test and then production environments automatically or with one approval click.</li>
<li><b>Environments</b>: <i>dev</i> (developers play), <i>test/staging</i> (a copy of production), <i>production</i> (real customers and real data). Real customer data should not be used in dev or test.</li>
<li><b>DevSecOps / shift left</b>: put security checks into the pipeline so problems are caught early, when they are cheap to fix. Examples: code scanning (SAST), checking open-source libraries for known flaws (SCA), and scanning the running app (DAST).</li></ul>`,
        ru: `<p>Разработчики хранят код в <b>репозитории</b> (Git на GitHub или GitLab). Каждое изменение проходит через <b>CI/CD-конвейер</b>: автоматическую линию, которая собирает код, запускает тесты и разворачивает его.</p>
<ul><li><b>CI (непрерывная интеграция)</b>: каждое изменение автоматически собирается и тестируется за минуты.</li>
<li><b>CD (непрерывная доставка/развёртывание)</b>: проверенные сборки уходят в тестовую, а затем в продуктивную среду автоматически или по одному клику одобрения.</li>
<li><b>Среды</b>: <i>dev</i> (песочница разработчиков), <i>test/staging</i> (копия продакшена), <i>production</i> (реальные клиенты и данные). Реальные данные клиентов не стоит использовать в dev и test.</li>
<li><b>DevSecOps / shift left</b>: встраивать проверки безопасности в конвейер, чтобы ловить проблемы рано, когда их дёшево исправить. Примеры: анализ кода (SAST), проверка open-source библиотек на известные уязвимости (SCA), сканирование работающего приложения (DAST).</li></ul>`,
      },
      dg: {
        title: { en: 'A CI/CD pipeline with security gates', ru: 'CI/CD-конвейер с проверками безопасности' }, h: 280,
        nodes: [
          ['dev', 80, 70, { en: 'Developer', ru: 'Разработчик' }, null, '👩‍💻'],
          ['repo', 245, 70, { en: 'Git repository', ru: 'Git-репозиторий' }, { en: 'code review', ru: 'ревью кода' }, '📦'],
          ['ci', 445, 70, { en: 'CI build', ru: 'CI-сборка' }, { en: 'tests, SAST, SCA', ru: 'тесты, SAST, SCA' }, '⚙️', 'key'],
          ['reg', 640, 70, { en: 'Artifact registry', ru: 'Реестр артефактов' }, { en: 'signed builds', ru: 'подписанные сборки' }, '🏷'],
          ['stg', 640, 215, 'Staging', { en: 'DAST, approval', ru: 'DAST, одобрение' }, '🧪', 'key'],
          ['prod', 400, 215, 'Production', { en: 'real customers', ru: 'реальные клиенты' }, '🚀', 'ok'],
          ['cust', 150, 215, { en: 'Customers', ru: 'Клиенты' }, null, '👥'],
        ],
        edges: [
          ['dev', 'repo', { en: 'push', ru: 'push' }], ['repo', 'ci', { en: 'triggers', ru: 'запускает' }], ['ci', 'reg', { en: 'publish', ru: 'публикует' }],
          ['reg', 'stg', { en: 'deploy', ru: 'развернуть' }], ['stg', 'prod', { en: 'release', ru: 'релиз' }], ['cust', 'prod', { en: 'use', ru: 'пользуются' }],
        ],
        note: { en: 'If any gate fails (a test, a scan with a critical finding), the pipeline stops and the change never reaches production.', ru: 'Если любая проверка провалена (тест, скан с критической находкой), конвейер останавливается и изменение не попадает в продакшен.' },
      },
    },
    {
      t: { en: '8. Threats, vulnerabilities and attacks', ru: '8. Угрозы, уязвимости и атаки' },
      b: {
        en: `<p>Security vocabulary that people often mix up:</p>
<ul><li><b>Asset</b>: anything of value (data, servers, reputation).</li>
<li><b>Vulnerability</b>: a weakness, e.g. an unpatched server or a guessable password.</li>
<li><b>Threat</b>: something that could exploit it: a criminal group, a careless employee, a flood.</li>
<li><b>Exploit</b>: the actual tool or technique that uses the vulnerability.</li>
<li><b>Risk</b> = likelihood × impact. No vulnerability, or no threat, means no risk.</li>
<li><b>Control (countermeasure)</b>: anything that reduces risk: a patch, a firewall rule, a policy, a training session.</li></ul>
<p>Common attacks: <b>phishing</b> (fake emails that trick people into clicking or giving passwords), <b>malware</b> (malicious software), <b>ransomware</b> (malware that encrypts your files and demands payment), <b>DDoS</b> (flooding a service until it falls over), and the <b>insider threat</b> (a trusted person misusing access). Most real breaches chain several steps, as shown below.</p>`,
        ru: `<p>Термины, которые часто путают:</p>
<ul><li><b>Актив</b>: всё ценное (данные, серверы, репутация).</li>
<li><b>Уязвимость</b>: слабость, например непропатченный сервер или угадываемый пароль.</li>
<li><b>Угроза</b>: то, что может ею воспользоваться: преступная группа, невнимательный сотрудник, наводнение.</li>
<li><b>Эксплойт</b>: конкретный инструмент или приём, использующий уязвимость.</li>
<li><b>Риск</b> = вероятность × ущерб. Нет уязвимости или нет угрозы — нет риска.</li>
<li><b>Мера защиты (контроль)</b>: всё, что снижает риск: патч, правило firewall, политика, обучение.</li></ul>
<p>Частые атаки: <b>фишинг</b> (поддельные письма, чтобы человек кликнул или отдал пароль), <b>вредоносное ПО</b>, <b>шифровальщик (ransomware)</b> (шифрует файлы и требует выкуп), <b>DDoS</b> (заваливание сервиса запросами), <b>инсайдер</b> (доверенный человек злоупотребляет доступом). Реальные взломы обычно складываются из цепочки шагов, как ниже.</p>`,
      },
      dg: {
        title: { en: 'A typical ransomware attack chain', ru: 'Типичная цепочка атаки шифровальщика' }, h: 300,
        nodes: [
          ['att', 90, 150, { en: 'Attacker', ru: 'Атакующий' }, null, '🦹', 'bad'],
          ['mail', 280, 55, { en: 'Phishing email', ru: 'Фишинговое письмо' }, null, '📧', 'bad'],
          ['lap', 500, 55, { en: 'Employee laptop', ru: 'Ноутбук сотрудника' }, { en: 'malware runs', ru: 'запускается ВПО' }, '💻'],
          ['dc', 640, 165, { en: 'Domain controller', ru: 'Контроллер домена' }, { en: 'admin accounts', ru: 'админ-учётки' }, '🔑'],
          ['fs', 440, 255, { en: 'File servers', ru: 'Файл-серверы' }, { en: 'customer data', ru: 'данные клиентов' }, '🗂'],
        ],
        edges: [
          ['att', 'mail', { en: '1. sends', ru: '1. отправляет' }, 'bad'], ['mail', 'lap', { en: '2. user clicks', ru: '2. клик' }, 'bad'],
          ['lap', 'att', { en: '3. calls home (C2)', ru: '3. связь с C2' }, 'bad dash'], ['lap', 'dc', { en: '4. steals passwords', ru: '4. кража паролей' }, 'bad'],
          ['dc', 'fs', { en: '5. admin access', ru: '5. админ-доступ' }, 'bad'], ['fs', 'att', { en: '6. copy + encrypt', ru: '6. копия + шифрование' }, 'bad'],
        ],
        note: { en: 'Controls that break the chain: awareness training (2), endpoint protection (2–3), egress filtering (3), MFA and least privilege (4–5), segmentation (5), offline backups (6).', ru: 'Меры, рвущие цепочку: обучение (2), защита конечных точек (2–3), фильтрация исходящего трафика (3), MFA и минимальные привилегии (4–5), сегментация (5), офлайн-бэкапы (6).' },
      },
    },
    {
      t: { en: '9. Who does security in a company', ru: '9. Кто занимается безопасностью в компании' },
      b: {
        en: `<ul><li><b>Board and senior management</b>: own the risk and are ultimately accountable. They approve policy and budget. CISSP always expects you to get their support first.</li>
<li><b>CISO</b> (Chief Information Security Officer): runs the security program and advises management.</li>
<li><b>Data owner</b>: a business manager who decides how sensitive data is and who may access it. <b>Data custodian</b>: IT staff who carry out those decisions (backups, permissions).</li>
<li><b>SOC</b> (Security Operations Center): analysts who watch alerts 24/7, usually through a <b>SIEM</b> that collects logs from everything.</li>
<li><b>Incident response team</b>: steps in when an alert turns out to be a real attack.</li>
<li><b>Auditors</b>: independent people who check that controls exist and work. They are internal, or external for SOC 2 and ISO 27001 certification.</li></ul>`,
        ru: `<ul><li><b>Совет директоров и топ-менеджмент</b>: владеют риском и несут итоговую ответственность. Утверждают политику и бюджет. CISSP всегда ожидает, что сначала вы получите их поддержку.</li>
<li><b>CISO</b> (директор по информационной безопасности): ведёт программу безопасности и консультирует руководство.</li>
<li><b>Владелец данных</b>: бизнес-руководитель, который решает, насколько данные чувствительны и кому доступны. <b>Хранитель данных (custodian)</b>: IT-специалисты, которые исполняют эти решения (бэкапы, права).</li>
<li><b>SOC</b> (центр мониторинга безопасности): аналитики, которые 24/7 разбирают оповещения, обычно через <b>SIEM</b>, собирающий журналы со всего.</li>
<li><b>Команда реагирования на инциденты</b>: подключается, когда оповещение оказывается реальной атакой.</li>
<li><b>Аудиторы</b>: независимые люди, проверяющие, что меры есть и работают. Внутренние или внешние (для SOC 2 и сертификации ISO 27001).</li></ul>`,
      },
      dg: {
        title: { en: 'From log line to response', ru: 'От строки журнала до реагирования' }, h: 330,
        nodes: [
          ['l1', 90, 50, { en: 'Laptops (EDR)', ru: 'Ноутбуки (EDR)' }, null, '💻'], ['l2', 90, 125, { en: 'Servers', ru: 'Серверы' }, null, '🖥'],
          ['l3', 90, 200, 'Firewall', null, '🧱'], ['l4', 90, 275, { en: 'Cloud / IdP', ru: 'Облако / IdP' }, null, '☁️'],
          ['siem', 360, 162, 'SIEM', { en: 'collects + correlates', ru: 'сбор + корреляция' }, '📊', 'key'],
          ['an', 620, 90, { en: 'SOC analyst', ru: 'Аналитик SOC' }, { en: 'triage: real or noise?', ru: 'триаж: реально или шум?' }, '🕵️'],
          ['soar', 620, 245, 'SOAR', { en: 'playbook: isolate host', ru: 'плейбук: изолировать хост' }, '🤖'],
        ],
        edges: [
          ['l1', 'siem', { en: 'logs', ru: 'журналы' }], ['l2', 'siem'], ['l3', 'siem'], ['l4', 'siem'],
          ['siem', 'an', { en: 'alert', ru: 'оповещение' }, 'key'], ['siem', 'soar', { en: 'auto-trigger', ru: 'автозапуск' }], ['an', 'soar', { en: 'approve', ru: 'одобрить' }, 'dash'],
        ],
      },
    },
  ],

  glossary: [
    ['Server', 'A computer that provides a service (website, files, email) to other computers over a network.', 'Компьютер, предоставляющий сервис (сайт, файлы, почту) другим компьютерам по сети.', ['servers']],
    ['Client', 'The device or program a user works with that requests services from a server (browser, mobile app).', 'Устройство или программа пользователя, запрашивающая сервис у сервера (браузер, приложение).'],
    ['Endpoint', 'Any end-user device connected to the network: laptop, desktop, phone, tablet.', 'Любое конечное устройство в сети: ноутбук, ПК, телефон, планшет.', ['endpoints']],
    ['Operating system', 'Core software (Windows, Linux, macOS, Android) that manages hardware and runs applications.', 'Базовое ПО (Windows, Linux, macOS, Android), управляющее железом и запускающее приложения.', ['OS']],
    ['Kernel', 'The most privileged core of the operating system; it controls memory, CPU and devices.', 'Самая привилегированная часть ОС; управляет памятью, процессором и устройствами.'],
    ['Database', 'Organized storage for structured data (customers, orders) queried with languages like SQL.', 'Организованное хранилище структурированных данных (клиенты, заказы), запросы — на языках вроде SQL.', ['databases']],
    ['SQL', 'Structured Query Language, used to read and change data in relational databases.', 'Язык запросов к реляционным базам данных: чтение и изменение данных.'],
    ['API', 'Application Programming Interface: a defined way for one program to call another (e.g. a payment API).', 'Программный интерфейс: заданный способ, которым одна программа вызывает другую (например, API платежей).', ['APIs']],
    ['Network', 'Devices connected so they can exchange data.', 'Устройства, соединённые для обмена данными.'],
    ['LAN', 'Local Area Network: the network inside one office or building.', 'Локальная сеть внутри офиса или здания.'],
    ['WAN', 'Wide Area Network: connects networks across cities or countries.', 'Глобальная сеть, связывающая сети в разных городах или странах.'],
    ['IP address', 'Numeric address of a device on a network, e.g. 192.168.1.10 (IPv4) or 2001:db8::1 (IPv6).', 'Числовой адрес устройства в сети, например 192.168.1.10 (IPv4) или 2001:db8::1 (IPv6).', ['IP addresses']],
    ['Port', 'A number (0–65535) that identifies which service on a host should receive traffic, e.g. 443 for HTTPS.', 'Число (0–65535), определяющее, какой сервис на узле получает трафик, например 443 для HTTPS.', ['ports']],
    ['Packet', 'A small unit of data sent over a network, with source and destination addresses.', 'Небольшая порция данных в сети с адресами отправителя и получателя.', ['packets']],
    ['Protocol', 'An agreed set of rules for communication, e.g. HTTP, TCP, SMTP.', 'Договорённые правила общения, например HTTP, TCP, SMTP.', ['protocols']],
    ['Router', 'A device that forwards packets between different networks using IP addresses (OSI layer 3).', 'Устройство, пересылающее пакеты между сетями по IP-адресам (уровень 3 OSI).', ['routers']],
    ['Switch', 'A device that connects devices within one LAN using MAC addresses (OSI layer 2).', 'Устройство, соединяющее устройства в одной LAN по MAC-адресам (уровень 2 OSI).', ['switches']],
    ['MAC address', 'The hardware address burned into a network card, used inside a LAN (not the same as Mandatory Access Control).', 'Аппаратный адрес сетевой карты, используется внутри LAN (не путать с мандатным доступом MAC).'],
    ['DNS', 'Domain Name System: translates names like bank.com into IP addresses.', 'Система доменных имён: переводит имена вроде bank.com в IP-адреса.'],
    ['HTTP', 'The protocol web browsers use to fetch pages. HTTPS is HTTP inside TLS encryption.', 'Протокол, по которому браузер получает страницы. HTTPS — это HTTP внутри шифрования TLS.', ['HTTPS']],
    ['TLS', 'Transport Layer Security: encrypts and authenticates network connections (the padlock in the browser). Successor of SSL.', 'Протокол, шифрующий и аутентифицирующий соединения (замок в браузере). Преемник SSL.', ['SSL', 'SSL/TLS']],
    ['Firewall', 'A device or software that allows or blocks network traffic according to rules.', 'Устройство или ПО, пропускающее или блокирующее трафик по правилам.', ['firewalls']],
    ['VPN', 'Virtual Private Network: an encrypted tunnel over the internet between a user (or site) and a private network.', 'Виртуальная частная сеть: зашифрованный туннель через интернет между пользователем (или офисом) и частной сетью.'],
    ['Proxy', 'An intermediary server that makes requests on behalf of clients, often to filter or log web traffic.', 'Промежуточный сервер, делающий запросы от имени клиентов, часто для фильтрации или журналирования.'],
    ['Load balancer', 'Spreads incoming traffic across several servers so no single one is overloaded.', 'Распределяет входящий трафик между несколькими серверами, чтобы ни один не был перегружен.'],
    ['Wi-Fi', 'Wireless LAN based on the IEEE 802.11 standards.', 'Беспроводная LAN на стандартах IEEE 802.11.'],
    ['Bandwidth', 'How much data a connection can carry per second.', 'Сколько данных соединение может передать в секунду.'],
    ['Latency', 'The delay before data arrives; matters for voice and video.', 'Задержка доставки данных; важна для голоса и видео.'],
    ['Encryption', 'Transforming data with a key so only key holders can read it.', 'Преобразование данных с помощью ключа, чтобы прочитать их мог только владелец ключа.', ['encrypted', 'encrypt']],
    ['Plaintext', 'Readable data before encryption.', 'Читаемые данные до шифрования.'],
    ['Ciphertext', 'Scrambled, unreadable data after encryption.', 'Зашифрованные, нечитаемые данные.'],
    ['Cryptographic key', 'The secret value that controls encryption and decryption. Whoever has the key can read the data.', 'Секретное значение, управляющее шифрованием и расшифровкой. У кого ключ — тот читает данные.'],
    ['Public key', 'The shareable half of an asymmetric key pair; used to encrypt to the owner or verify the owner\'s signature.', 'Публичная половина асимметричной пары: шифровать для владельца или проверять его подпись.'],
    ['Private key', 'The secret half of an asymmetric key pair; used to decrypt or to sign. Must never leave its owner.', 'Секретная половина асимметричной пары: расшифровывать или подписывать. Никогда не покидает владельца.'],
    ['Hash', 'A fixed-length fingerprint of data from a one-way function (e.g. SHA-256). Any change gives a different hash.', 'Отпечаток данных фиксированной длины от односторонней функции (например, SHA-256). Любое изменение даёт другой хэш.', ['hashing', 'hashes', 'hashed']],
    ['Digital signature', 'A hash encrypted with the signer\'s private key; proves origin and integrity.', 'Хэш, зашифрованный закрытым ключом подписанта; доказывает источник и целостность.', ['digital signatures']],
    ['Certificate', 'A file (X.509) binding a public key to an identity, signed by a Certificate Authority.', 'Файл (X.509), связывающий открытый ключ с владельцем, подписанный удостоверяющим центром.', ['certificates']],
    ['Certificate Authority', 'A trusted organization that issues and signs digital certificates.', 'Доверенная организация, выпускающая и подписывающая цифровые сертификаты.', ['CA']],
    ['PKI', 'Public Key Infrastructure: the CAs, certificates, policies and revocation services that make public keys trustworthy.', 'Инфраструктура открытых ключей: CA, сертификаты, политики и отзыв, делающие открытые ключи доверенными.'],
    ['Password manager', 'An app that generates and stores unique strong passwords in an encrypted vault.', 'Приложение, создающее и хранящее уникальные стойкие пароли в зашифрованном хранилище.'],
    ['SSO', 'Single sign-on: one login gives access to many applications.', 'Единый вход: один логин даёт доступ ко многим приложениям.'],
    ['Token', 'A digital object proving identity or permission (session token, access token) or a physical device that generates codes.', 'Цифровой объект, подтверждающий личность или права (токен сессии, доступа), либо физическое устройство, генерирующее коды.', ['tokens']],
    ['Active Directory', 'Microsoft\'s directory service holding users, groups and computers of a Windows network; domain controllers run it.', 'Служба каталогов Microsoft с пользователями, группами и компьютерами сети Windows; работает на контроллерах домена.', ['AD', 'Entra ID']],
    ['Directory', 'A central database of users, groups and devices used for login and permissions (e.g. Active Directory, LDAP).', 'Центральная база пользователей, групп и устройств для входа и прав (например, Active Directory, LDAP).', ['LDAP']],
    ['Privileged account', 'An account with admin rights (root, Domain Admin). The most valuable target for attackers.', 'Учётная запись с правами администратора (root, Domain Admin). Самая ценная цель для атакующих.', ['privileged accounts', 'admin rights']],
    ['Least privilege', 'Give users and systems only the minimum access needed for their task.', 'Давать пользователям и системам только минимально нужный доступ.'],
    ['Defense in depth', 'Layering several independent controls so one failure does not lead to a breach.', 'Несколько независимых слоёв защиты, чтобы отказ одного не приводил к взлому.'],
    ['Cloud', 'Computing resources rented on demand over the internet from a provider such as AWS, Azure or Google Cloud.', 'Вычислительные ресурсы, арендуемые по требованию через интернет у провайдера (AWS, Azure, Google Cloud).', ['cloud computing']],
    ['IaaS', 'Infrastructure as a Service: rent virtual machines, storage and networks; you manage the OS and above.', 'Инфраструктура как сервис: аренда VM, хранилища и сетей; ОС и выше — на вас.'],
    ['PaaS', 'Platform as a Service: the provider runs the OS and runtime; you deploy your code.', 'Платформа как сервис: ОС и среду ведёт провайдер; вы разворачиваете свой код.'],
    ['SaaS', 'Software as a Service: a finished application used through the browser (Microsoft 365, Salesforce).', 'ПО как сервис: готовое приложение через браузер (Microsoft 365, Salesforce).'],
    ['Virtual machine', 'A software-emulated computer with its own OS running on a hypervisor.', 'Программно эмулированный компьютер со своей ОС, работающий на гипервизоре.', ['VM', 'VMs', 'virtual machines']],
    ['Hypervisor', 'Software that creates and runs virtual machines and isolates them from each other.', 'ПО, создающее и запускающее виртуальные машины и изолирующее их друг от друга.'],
    ['Container', 'A lightweight package of an app and its libraries that shares the host OS kernel (Docker).', 'Лёгкий пакет приложения и библиотек, использующий ядро ОС хоста (Docker).', ['containers', 'Docker']],
    ['Kubernetes', 'A platform that runs and scales large numbers of containers across many servers.', 'Платформа, запускающая и масштабирующая множество контейнеров на многих серверах.'],
    ['Microservices', 'An architecture where an application is split into many small services talking over APIs.', 'Архитектура, где приложение разбито на много мелких сервисов, общающихся через API.'],
    ['Serverless', 'Cloud model where you upload single functions and the provider runs them on demand; no servers to manage.', 'Облачная модель: загружаете отдельные функции, провайдер запускает их по требованию; серверами управлять не нужно.'],
    ['DevOps', 'A culture and toolset where development and operations teams share responsibility and automate building, testing and deploying software.', 'Культура и инструменты, где разработка и эксплуатация делят ответственность и автоматизируют сборку, тесты и развёртывание.'],
    ['Repository', 'A versioned store of source code, usually Git.', 'Хранилище исходного кода с версиями, обычно Git.', ['Git', 'repo']],
    ['Pipeline', 'An automated chain of build, test and deploy steps.', 'Автоматическая цепочка шагов сборки, тестирования и развёртывания.', ['pipelines']],
    ['Production', 'The live environment serving real users and real data.', 'Боевая среда с реальными пользователями и данными.', ['production environment']],
    ['Open source', 'Software whose source code is public and free to use under a license; most apps include many such libraries.', 'ПО с открытым исходным кодом, свободное к использованию по лицензии; большинство приложений содержат много таких библиотек.', ['open-source']],
    ['Library', 'Reusable code that a program includes rather than writing from scratch (a dependency).', 'Повторно используемый код, подключаемый программой вместо написания с нуля (зависимость).', ['libraries', 'dependency', 'dependencies']],
    ['Patch', 'A software update that fixes bugs or security vulnerabilities.', 'Обновление ПО, исправляющее ошибки или уязвимости.', ['patches', 'patching', 'patched']],
    ['Asset', 'Anything of value to the organization: data, systems, people, reputation.', 'Всё ценное для организации: данные, системы, люди, репутация.', ['assets']],
    ['Vulnerability', 'A weakness that could be exploited, e.g. a missing patch or a misconfiguration.', 'Слабость, которую можно использовать, например отсутствующий патч или ошибка настройки.', ['vulnerabilities']],
    ['Threat', 'Any potential cause of harm: an attacker, malware, a careless insider, a natural disaster.', 'Любой потенциальный источник вреда: атакующий, ВПО, неосторожный сотрудник, стихийное бедствие.', ['threats']],
    ['Threat actor', 'The person or group behind an attack: criminals, nation-states, hacktivists, insiders.', 'Человек или группа за атакой: преступники, государства, хактивисты, инсайдеры.', ['threat actors']],
    ['Exploit', 'Code or a technique that takes advantage of a vulnerability.', 'Код или приём, использующий уязвимость.', ['exploits', 'exploited']],
    ['Zero-day', 'A vulnerability that attackers use before the vendor has released a fix.', 'Уязвимость, которую используют до того, как производитель выпустил исправление.', ['zero-day']],
    ['Attack surface', 'All the points where an attacker could try to get in: open ports, apps, accounts, people.', 'Все точки, через которые атакующий может попытаться проникнуть: порты, приложения, учётки, люди.'],
    ['Risk', 'The likelihood that a threat exploits a vulnerability, times the impact if it does.', 'Вероятность того, что угроза использует уязвимость, умноженная на ущерб.'],
    ['Control', 'A safeguard or countermeasure that reduces risk (technical, administrative or physical).', 'Мера защиты, снижающая риск (техническая, административная или физическая).', ['controls', 'countermeasure', 'countermeasures', 'safeguard', 'safeguards']],
    ['Malware', 'Malicious software: viruses, worms, trojans, ransomware, spyware.', 'Вредоносное ПО: вирусы, черви, трояны, шифровальщики, шпионское ПО.'],
    ['Ransomware', 'Malware that encrypts data and demands payment for the key; often also steals data first.', 'ВПО, шифрующее данные и требующее выкуп за ключ; часто сначала ещё и крадёт данные.'],
    ['Trojan', 'Malware disguised as a legitimate program.', 'ВПО, замаскированное под легитимную программу.'],
    ['Phishing', 'Fraudulent messages that trick people into clicking a link, opening a file or revealing credentials.', 'Мошеннические сообщения, вынуждающие кликнуть ссылку, открыть файл или раскрыть учётные данные.', ['spear phishing']],
    ['Social engineering', 'Manipulating people, rather than technology, into breaking security.', 'Манипуляция людьми (а не техникой), чтобы обойти защиту.'],
    ['DDoS', 'Distributed denial of service: many machines flood a target until it cannot serve real users.', 'Распределённый отказ в обслуживании: множество машин заваливают цель запросами, пока она не перестанет обслуживать пользователей.', ['DoS']],
    ['Botnet', 'A network of infected computers remotely controlled by an attacker.', 'Сеть заражённых компьютеров под удалённым управлением атакующего.'],
    ['Man-in-the-middle', 'An attacker secretly sits between two parties, reading or changing their traffic.', 'Атакующий тайно встраивается между двумя сторонами, читая или меняя трафик.', ['MITM', 'on-path attack']],
    ['Insider threat', 'Risk from employees, contractors or partners who misuse legitimate access, maliciously or by accident.', 'Риск от сотрудников, подрядчиков или партнёров, злоупотребляющих легитимным доступом — умышленно или случайно.'],
    ['Lateral movement', 'An attacker moving from the first compromised machine to others inside the network.', 'Перемещение атакующего с первой взломанной машины на другие внутри сети.'],
    ['Breach', 'A confirmed incident where data was accessed or disclosed without authorization.', 'Подтверждённый инцидент, при котором данные были получены или раскрыты без разрешения.', ['data breach', 'breaches']],
    ['Antivirus', 'Software that detects known malware, mainly by signatures. Modern version: EDR.', 'ПО, обнаруживающее известное ВПО, в основном по сигнатурам. Современный вариант — EDR.', ['anti-malware']],
    ['EDR', 'Endpoint Detection and Response: agent on laptops/servers that records behavior, detects attacks and can isolate the device.', 'Агент на ноутбуках/серверах, записывающий поведение, обнаруживающий атаки и умеющий изолировать устройство.', ['XDR']],
    ['Log', 'A timestamped record of events (logins, errors, changes) written by systems and applications.', 'Запись событий с отметкой времени (входы, ошибки, изменения), которую пишут системы и приложения.', ['logs', 'logging']],
    ['SOC', 'Security Operations Center: the team that monitors alerts and responds to attacks 24/7.', 'Центр мониторинга безопасности: команда, круглосуточно разбирающая оповещения и реагирующая на атаки.'],
    ['CISO', 'Chief Information Security Officer: the executive who leads the security program.', 'Директор по информационной безопасности: руководитель программы безопасности.'],
    ['Policy', 'A high-level, mandatory management statement of what must be done and why.', 'Высокоуровневое обязательное заявление руководства о том, что и зачем нужно делать.', ['policies']],
    ['Compliance', 'Proving that you follow required laws, regulations, contracts and standards.', 'Подтверждение, что вы соблюдаете обязательные законы, нормы, договоры и стандарты.'],
    ['Audit', 'A formal, independent check that controls exist and work as claimed.', 'Формальная независимая проверка, что меры существуют и работают как заявлено.', ['audits', 'auditor', 'auditors']],
    ['Backup', 'A copy of data kept separately so it can be restored after loss or corruption.', 'Копия данных, хранимая отдельно для восстановления после потери или повреждения.', ['backups']],
    ['Redundancy', 'Duplicate components (power, disks, servers, links) so one failure does not stop the service.', 'Дублирование компонентов (питание, диски, серверы, каналы), чтобы один отказ не останавливал сервис.', ['redundant']],
    ['Failover', 'Automatic switch to a standby system when the primary one fails.', 'Автоматическое переключение на резервную систему при отказе основной.'],
    ['Data center', 'A facility housing servers, storage and network equipment with dedicated power and cooling.', 'Объект с серверами, хранилищами и сетевым оборудованием, с выделенным питанием и охлаждением.', ['data centers']],
    ['Configuration', 'The settings of a system. Misconfiguration (wrong settings) is one of the most common causes of breaches.', 'Настройки системы. Ошибочная конфигурация — одна из самых частых причин утечек.', ['misconfiguration', 'misconfigurations']],
    ['Hardening', 'Reducing a system\'s attack surface: removing unused services, closing ports, changing defaults, applying secure settings.', 'Сокращение поверхности атаки: удаление лишних сервисов, закрытие портов, смена настроек по умолчанию.'],
    ['Sandbox', 'An isolated environment where untrusted code can run without harming the real system.', 'Изолированная среда, где недоверенный код запускается без вреда для реальной системы.'],
    ['IoT', 'Internet of Things: network-connected devices such as cameras, sensors and smart thermostats; often weakly secured.', 'Интернет вещей: подключённые устройства (камеры, датчики, умные термостаты); часто слабо защищены.'],
    ['Third party', 'An outside company (vendor, supplier, contractor) that provides services or has access to your data.', 'Внешняя компания (поставщик, подрядчик), оказывающая услуги или имеющая доступ к вашим данным.', ['third parties', 'third-party', 'vendor', 'vendors']],
    ['SLA', 'Service Level Agreement: a contract that sets measurable service levels (e.g. 99.9% uptime) and penalties.', 'Соглашение об уровне сервиса: договор с измеримыми показателями (например, 99,9% доступности) и штрафами.'],
    ['PII', 'Personally Identifiable Information: data that can identify a person (name, ID number, email).', 'Персональные данные, позволяющие идентифицировать человека (имя, номер документа, email).', ['personal data']],
    ['GDPR', 'EU General Data Protection Regulation: strict rules on processing personal data of people in the EU, fines up to 4% of global turnover.', 'Общий регламент ЕС по защите данных: строгие правила обработки персональных данных в ЕС, штрафы до 4% мирового оборота.'],
    ['PCI DSS', 'Payment Card Industry Data Security Standard: required security rules for anyone handling card data.', 'Стандарт безопасности индустрии платёжных карт: обязательные правила для всех, кто обрабатывает данные карт.'],
    ['ISO 27001', 'International standard for an information security management system (ISMS); companies can be certified against it.', 'Международный стандарт системы управления ИБ (СУИБ); компании могут сертифицироваться по нему.'],
    ['NIST', 'US National Institute of Standards and Technology; publishes widely used security frameworks (CSF, SP 800 series).', 'Национальный институт стандартов и технологий США; публикует широко используемые фреймворки (CSF, серия SP 800).'],
  ],
};
