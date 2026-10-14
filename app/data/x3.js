'use strict';
// Beginner layer for Domain 3: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(3, {
  'd3-c1': {
    plain: {
      en: `<p>Secure design principles are the "building code" for systems. Give each part only the keys it needs (<b>least privilege</b>). Put several locks in a row so one failure isn't fatal (<b>defense in depth</b>). Ship things locked, not open (<b>secure defaults</b>). If something breaks, it should fail closed, like a bank door that stays locked in a power cut (<b>fail securely</b>). Keep it simple, because complexity hides bugs. And <b>zero trust</b>: never trust a request just because it comes from inside the network.</p>`,
      ru: `<p>Принципы безопасного проектирования — «строительные нормы» для систем. Давайте каждой части только нужные ключи (<b>минимальные привилегии</b>). Ставьте несколько замков подряд, чтобы отказ одного не был фатальным (<b>эшелонированная защита</b>). Поставляйте закрытым, а не открытым (<b>безопасные настройки по умолчанию</b>). При поломке система должна закрываться, как дверь банка, которая остаётся запертой при отключении света (<b>безопасный отказ</b>). Держите всё простым: сложность прячет ошибки. И <b>нулевое доверие</b>: не доверяйте запросу только потому, что он пришёл изнутри сети.</p>`,
    },
    ex: {
      en: `<p>In the 2013 Target breach, attackers stole credentials from an HVAC (air-conditioning) contractor and used them to reach the payment network, because the vendor network and the card terminals were not separated. Least privilege for the vendor account and network segmentation (defense in depth) would each have stopped the path to 40 million card numbers.</p>`,
      ru: `<p>При взломе Target в 2013 году злоумышленники украли учётные данные подрядчика по кондиционированию и через них добрались до платёжной сети, потому что сеть подрядчиков не была отделена от кассовых терминалов. Минимальные привилегии для учётки подрядчика или сегментация сети (эшелонированная защита) — каждая по отдельности перекрыла бы путь к 40 млн номеров карт.</p>`,
    },
  },
  'd3-c2': {
    plain: {
      en: `<p>Security models are rules about which way information may flow. <b>Bell-LaPadula</b> protects secrets: you can't read above your clearance (no read up), and you can't write secrets down into a lower, more public level (no write down). <b>Biba</b> protects accuracy, so it is the mirror image: don't read less trustworthy data (no read down), and don't write into more trusted data (no write up). Memory hook: BLP keeps secrets from leaking down; Biba keeps dirt from flowing up.</p>`,
      ru: `<p>Модели безопасности — правила о том, в какую сторону может течь информация. <b>Белла–Лападулы</b> защищает секреты: нельзя читать выше своего допуска (no read up) и нельзя записывать секреты вниз, на более открытый уровень (no write down). <b>Биба</b> защищает достоверность, поэтому она зеркальна: не читай менее надёжные данные (no read down) и не пиши в более доверенные (no write up). Запомнить: BLP не даёт секретам утечь вниз; Biba не даёт «грязи» подняться вверх.</p>`,
    },
    ex: {
      en: `<p>An army officer cleared for Secret can't open Top Secret files (BLP: no read up) and the system won't let them paste Secret text into an Unclassified email (no write down). In a factory, the safety controller follows Biba: a sensor reading from an unverified guest Wi-Fi device must never overwrite the verified calibration values (no write up).</p>`,
      ru: `<p>Офицер с допуском «Секретно» не может открыть «Совершенно секретные» файлы (BLP: no read up), и система не даст вставить секретный текст в несекретное письмо (no write down). На заводе контроллер безопасности следует Biba: показание с непроверенного устройства из гостевого Wi-Fi никогда не должно перезаписывать проверенные калибровочные значения (no write up).</p>`,
    },
    dg: {
      title: { en: 'Bell-LaPadula vs Biba: allowed flows for a subject at the middle level', ru: 'Белла–Лападулы и Биба: разрешённые потоки для субъекта среднего уровня' }, h: 290,
      zones: [[10, 30, 360, 250, { en: 'Bell-LaPadula (confidentiality)', ru: 'Белла–Лападулы (конфиденциальность)' }], [390, 30, 360, 250, { en: 'Biba (integrity)', ru: 'Биба (целостность)' }]],
      nodes: [
        ['bh', 90, 80, { en: 'Top Secret', ru: 'Сов. секретно' }, null, null, 'dim', 120], ['bm', 90, 155, { en: 'Secret', ru: 'Секретно' }, null, null, 'dim', 120], ['bl', 90, 230, { en: 'Public', ru: 'Открыто' }, null, null, 'dim', 120],
        ['bs', 290, 155, { en: 'Subject', ru: 'Субъект' }, { en: 'cleared Secret', ru: 'допуск «Секретно»' }, '🧑', 'key', 120],
        ['ih', 470, 80, { en: 'High integrity', ru: 'Высокая целостн.' }, null, null, 'dim', 140], ['im', 470, 155, { en: 'Medium', ru: 'Средняя' }, null, null, 'dim', 140], ['il', 470, 230, { en: 'Low integrity', ru: 'Низкая целостн.' }, null, null, 'dim', 140],
        ['is', 670, 155, { en: 'Subject', ru: 'Субъект' }, { en: 'medium level', ru: 'средний уровень' }, '🧑', 'key', 120],
      ],
      edges: [
        ['bh', 'bs', { en: 'read ✗', ru: 'чтение ✗' }, 'bad'], ['bs', 'bh', { en: 'write ✓', ru: 'запись ✓' }, 'ok'],
        ['bl', 'bs', { en: 'read ✓', ru: 'чтение ✓' }, 'ok'], ['bs', 'bl', { en: 'write ✗', ru: 'запись ✗' }, 'bad'],
        ['ih', 'is', { en: 'read ✓', ru: 'чтение ✓' }, 'ok'], ['is', 'ih', { en: 'write ✗', ru: 'запись ✗' }, 'bad'],
        ['il', 'is', { en: 'read ✗', ru: 'чтение ✗' }, 'bad'], ['is', 'il', { en: 'write ✓', ru: 'запись ✓' }, 'ok'],
      ],
      note: { en: 'Arrows show the direction data moves: object → subject is a read, subject → object is a write. The two models are exact mirror images.', ru: 'Стрелки показывают направление данных: объект → субъект — чтение, субъект → объект — запись. Модели — точные зеркальные отражения.' },
    },
  },
  'd3-c3': {
    plain: {
      en: `<p>Before buying a lock, you want proof it was tested. <b>Common Criteria</b> is that independent lab test for IT products: the customer writes what they need (Protection Profile), the vendor describes what the product claims (Security Target), and a lab grades how thoroughly it was checked (EAL 1–7). Separately, <b>certification</b> is the technical review of <i>your</i> system, and <b>accreditation</b> (authorization) is management formally accepting the risk to run it.</p>`,
      ru: `<p>Прежде чем покупать замок, хочется доказательств, что его испытали. <b>Common Criteria</b> — такое независимое лабораторное испытание для IT-продуктов: заказчик пишет, что ему нужно (профиль защиты), производитель описывает, что заявляет продукт (задание по безопасности), а лаборатория оценивает глубину проверки (EAL 1–7). Отдельно: <b>сертификация</b> — техническая проверка <i>вашей</i> системы, а <b>аккредитация</b> (авторизация) — формальное принятие руководством риска её эксплуатации.</p>`,
    },
    ex: {
      en: `<p>A government agency needs firewalls and requires a product certified against the NIAP Network Device Protection Profile. A vendor's firewall evaluated to that profile makes the shortlist. After installation, the agency's own assessors test the configured system (certification) and the authorizing official signs the authority to operate (accreditation). The product certificate alone does not make the deployment secure.</p>`,
      ru: `<p>Госведомству нужны межсетевые экраны, и оно требует продукт, сертифицированный по профилю защиты сетевых устройств NIAP. Экран производителя, оценённый по этому профилю, попадает в шорт-лист. После установки собственные оценщики ведомства проверяют настроенную систему (сертификация), и уполномоченное лицо подписывает разрешение на эксплуатацию (аккредитация). Сертификат продукта сам по себе не делает внедрение безопасным.</p>`,
    },
  },
  'd3-c4': {
    plain: {
      en: `<p>Inside every computer there is a "bouncer" that checks every single access: the <b>reference monitor</b>. Its code is the <b>security kernel</b>. Everything that enforces security (hardware, firmware, kernel) together is the <b>TCB</b> (trusted computing base): the part you must trust because if it fails, nothing else can save you. The bouncer must check every request, be impossible to tamper with, and be small enough to verify.</p>`,
      ru: `<p>В каждом компьютере есть «вышибала», который проверяет каждое обращение, — <b>монитор обращений (reference monitor)</b>. Его код — <b>ядро безопасности</b>. Всё, что обеспечивает безопасность (оборудование, прошивка, ядро), вместе образует <b>TCB</b> (доверенную вычислительную базу): часть, которой приходится доверять, ведь если она откажет, ничто другое не спасёт. Вышибала должен проверять каждый запрос, быть защищён от вмешательства и быть достаточно маленьким, чтобы его можно было проверить.</p>`,
    },
    ex: {
      en: `<p>When a Word macro tries to open your SSH keys, the operating system kernel checks the file's permissions against the user and process: that check is the reference monitor at work. Attackers prize kernel exploits and malicious drivers because code running inside the TCB can switch the bouncer off. That is why Windows requires signed drivers and modern Macs and PCs use Secure Boot.</p>`,
      ru: `<p>Когда макрос Word пытается открыть ваши SSH-ключи, ядро ОС сверяет права файла с пользователем и процессом — это и есть работа монитора обращений. Злоумышленники ценят эксплойты ядра и вредоносные драйверы, потому что код внутри TCB может «отключить вышибалу». Поэтому Windows требует подписанных драйверов, а современные Mac и ПК используют Secure Boot.</p>`,
    },
    dg: {
      title: { en: 'Reference monitor inside the TCB', ru: 'Монитор обращений внутри TCB' }, h: 270,
      zones: [[230, 35, 300, 220, { en: 'Trusted computing base', ru: 'Доверенная вычислительная база' }, 'trust']],
      nodes: [
        ['s', 100, 120, { en: 'Subject', ru: 'Субъект' }, { en: 'user / process', ru: 'пользователь / процесс' }, '🧑'],
        ['rm', 380, 120, { en: 'Reference monitor', ru: 'Монитор обращений' }, { en: 'security kernel', ru: 'ядро безопасности' }, '🛂', 'key'],
        ['pol', 310, 215, { en: 'Policy', ru: 'Политика' }, null, '📜', null, 110],
        ['aud', 455, 215, { en: 'Audit log', ru: 'Журнал' }, null, '🧾', null, 110],
        ['o', 650, 120, { en: 'Object', ru: 'Объект' }, { en: 'file, port, memory', ru: 'файл, порт, память' }, '📁'],
      ],
      edges: [['s', 'rm', { en: 'request', ru: 'запрос' }], ['rm', 'o', { en: 'allowed', ru: 'разрешено' }, 'ok'], ['pol', 'rm', null, 'dash'], ['rm', 'aud', null, 'dash']],
      note: { en: 'Three requirements: always invoked (complete mediation), tamperproof, and small enough to be verified.', ru: 'Три требования: вызывается всегда (полное посредничество), защищён от вмешательства и достаточно мал для проверки.' },
    },
  },
  'd3-c5': {
    plain: {
      en: `<p>Every kind of system has its own typical weak spots. Databases can leak secrets by combining harmless facts (<b>aggregation</b>) or letting you guess them (<b>inference</b>). Web apps suffer injection and XSS. IoT and industrial (ICS/SCADA) devices are often old, unpatched and never designed for the internet. In the cloud, the provider secures the building and hardware, but <i>you</i> must configure your data and access correctly: the <b>shared responsibility model</b>.</p>`,
      ru: `<p>У каждого типа систем свои типичные слабости. Базы данных могут выдать секрет через сочетание безобидных фактов (<b>агрегация</b>) или позволить его угадать (<b>логический вывод</b>). Веб-приложения страдают от инъекций и XSS. IoT и промышленные устройства (ICS/SCADA) часто старые, без патчей и никогда не проектировались для интернета. В облаке провайдер защищает здание и железо, но правильно настроить данные и доступ должны <i>вы</i>: это <b>модель разделённой ответственности</b>.</p>`,
    },
    ex: {
      en: `<p>In 2019 a misconfigured web application firewall in Capital One's AWS account let an attacker obtain cloud credentials and download data on about 106 million people from storage buckets. AWS's infrastructure worked as designed; the misconfiguration was on the customer's side of the shared responsibility line. Capital One was fined $80 million.</p>`,
      ru: `<p>В 2019 году неверно настроенный веб-экран (WAF) в AWS-аккаунте Capital One позволил атакующему получить облачные учётные данные и скачать из хранилищ данные примерно 106 млн человек. Инфраструктура AWS работала как положено; ошибка была на стороне клиента в модели разделённой ответственности. Capital One оштрафовали на $80 млн.</p>`,
    },
  },
  'd3-c6': {
    plain: {
      en: `<p>Symmetric encryption is a single key that both locks and unlocks, like a house key you copy for each family member. It is very fast, so it encrypts nearly all data (AES is the standard). The problem: how do you safely hand the key to someone far away? And since both sides hold the same key, you can't prove which of them wrote a message.</p>`,
      ru: `<p>Симметричное шифрование — один ключ, который и запирает, и отпирает, как ключ от дома, копия которого есть у каждого члена семьи. Оно очень быстрое, поэтому им шифруют почти все данные (стандарт — AES). Проблема: как безопасно передать ключ тому, кто далеко? И раз у обеих сторон одинаковый ключ, нельзя доказать, кто из них написал сообщение.</p>`,
    },
    ex: {
      en: `<p>BitLocker and FileVault encrypt whole laptop disks with AES. Wi-Fi WPA2/WPA3 encrypts your traffic with AES too. In a team of 10 people who each need a private channel with everyone else, symmetric keys add up: 10 × 9 / 2 = 45 keys. With 1,000 people it is 499,500, which is why we need asymmetric crypto to exchange them.</p>`,
      ru: `<p>BitLocker и FileVault шифруют диски ноутбуков с помощью AES. Wi-Fi WPA2/WPA3 тоже шифрует трафик AES. В команде из 10 человек, где каждому нужен отдельный канал с каждым, ключи копятся: 10 × 9 / 2 = 45. Для 1000 человек — 499 500, поэтому для их обмена нужна асимметричная криптография.</p>`,
    },
  },
  'd3-c7': {
    plain: {
      en: `<p>Asymmetric crypto uses a pair of keys, like a mailbox with a slot: anyone can drop a letter in using the <b>public key</b>, but only the owner's <b>private key</b> opens it. Run it backwards and you get a <b>digital signature</b>: only you can sign with your private key, and anyone can check it with your public key. A <b>hash</b> is a fingerprint of data: same input, same fingerprint; change one letter and the fingerprint is totally different. Real systems combine all three: <b>hybrid encryption</b>.</p>`,
      ru: `<p>Асимметричная криптография использует пару ключей, как почтовый ящик с прорезью: бросить письмо может любой с помощью <b>открытого ключа</b>, а открыть ящик может только владелец <b>закрытым ключом</b>. В обратную сторону получается <b>цифровая подпись</b>: подписать закрытым ключом можете только вы, а проверить открытым — любой. <b>Хеш</b> — отпечаток данных: одинаковый вход — одинаковый отпечаток; измените одну букву, и отпечаток станет совсем другим. Реальные системы сочетают все три: <b>гибридное шифрование</b>.</p>`,
    },
    ex: {
      en: `<p>Every HTTPS connection is hybrid: your browser checks the site's certificate (a signature), uses asymmetric key exchange (ECDHE) to agree on a fresh secret, and then encrypts the page with fast symmetric AES. Software updates use the same idea: Apple and Microsoft sign the hash of each update, and your device refuses an update whose signature doesn't verify.</p>`,
      ru: `<p>Каждое HTTPS-соединение — гибридное: браузер проверяет сертификат сайта (подпись), с помощью асимметричного обмена ключами (ECDHE) договаривается о новом секрете, а затем шифрует страницу быстрым симметричным AES. Обновления ПО работают так же: Apple и Microsoft подписывают хеш каждого обновления, и устройство отказывается ставить обновление, подпись которого не сходится.</p>`,
    },
    dg: {
      title: { en: 'Hybrid encryption in a TLS 1.3 connection', ru: 'Гибридное шифрование в соединении TLS 1.3' }, h: 280,
      nodes: [
        ['c', 110, 140, { en: 'Browser', ru: 'Браузер' }, null, '💻'],
        ['s', 650, 140, { en: 'Server', ru: 'Сервер' }, { en: 'holds private key', ru: 'хранит закрытый ключ' }, '🖥'],
        ['cert', 380, 40, { en: 'Certificate + signature', ru: 'Сертификат + подпись' }, { en: 'asymmetric: proves identity', ru: 'асимметрия: подтверждает личность' }, '📜', 'key'],
        ['kx', 380, 140, { en: 'ECDHE key exchange', ru: 'Обмен ключами ECDHE' }, { en: 'asymmetric: agree a secret', ru: 'асимметрия: общий секрет' }, '🤝', 'key'],
        ['aes', 380, 240, { en: 'AES-GCM session key', ru: 'Сеансовый ключ AES-GCM' }, { en: 'symmetric: bulk data', ru: 'симметрия: сами данные' }, '🔐', 'ok'],
      ],
      edges: [['s', 'cert', '1'], ['cert', 'c'], ['c', 'kx', '2', 'both'], ['kx', 's', null, 'both'], ['c', 'aes', '3', 'ok both'], ['aes', 's', null, 'ok both']],
      note: { en: 'Asymmetric crypto is slow, so it is only used to authenticate and agree a key; the fast symmetric key then protects all the data. Hashes inside the signature and the GCM tag give integrity.', ru: 'Асимметрия медленная, поэтому ею только аутентифицируют и согласуют ключ; затем все данные защищает быстрый симметричный ключ. Хеши в подписи и тег GCM дают целостность.' },
    },
  },
  'd3-c8': {
    plain: {
      en: `<p>Try it in the widget below: a hash turns any text into a fixed-length fingerprint. You can't turn the fingerprint back into the text, and two different texts practically never share one. That makes hashes perfect for spotting tampering and for storing passwords (with a random <b>salt</b> added so identical passwords look different).</p>`,
      ru: `<p>Попробуйте в виджете ниже: хеш превращает любой текст в отпечаток фиксированной длины. Обратно в текст его не превратить, а два разных текста практически никогда не дают один отпечаток. Поэтому хеши идеальны для обнаружения подмены и хранения паролей (с добавлением случайной <b>соли</b>, чтобы одинаковые пароли выглядели по-разному).</p>`,
    },
    ex: {
      en: `<p>When you download Ubuntu, the site lists the SHA-256 hash of the ISO file. If a mirror was hacked and the file modified, your computed hash won't match. In the 2012 LinkedIn breach, 6.5 million passwords were stored as unsalted SHA-1 hashes, so attackers cracked most of them within days using precomputed tables.</p>`,
      ru: `<p>При скачивании Ubuntu сайт публикует SHA-256 хеш ISO-файла. Если зеркало взломали и файл изменили, вычисленный вами хеш не совпадёт. При утечке LinkedIn в 2012 году 6,5 млн паролей хранились как SHA-1 без соли, и злоумышленники за несколько дней взломали большинство с помощью заранее вычисленных таблиц.</p>`,
    },
  },
  'd3-c9': {
    plain: {
      en: `<p>PKI (public key infrastructure) is the passport system of the internet. A <b>certificate</b> is a passport: it binds a name (bank.com) to a public key. A <b>CA</b> (certificate authority) is the passport office that checks who you are and signs it. Browsers carry a short list of trusted root CAs. If a passport is stolen, the CA revokes it and publishes that via a <b>CRL</b> (revocation list) or <b>OCSP</b> (online status check). The private keys are the crown jewels, so they live in tamper-resistant hardware: an <b>HSM</b> in the data center, a <b>TPM</b> chip in your laptop.</p>`,
      ru: `<p>PKI (инфраструктура открытых ключей) — паспортная система интернета. <b>Сертификат</b> — паспорт: связывает имя (bank.com) с открытым ключом. <b>УЦ</b> (удостоверяющий центр, CA) — паспортный стол, который проверяет, кто вы, и подписывает документ. Браузеры содержат короткий список доверенных корневых УЦ. Если «паспорт» украден, УЦ отзывает его и публикует это через <b>CRL</b> (список отзыва) или <b>OCSP</b> (онлайн-проверка статуса). Закрытые ключи — главная ценность, поэтому их держат в защищённом от вскрытия железе: <b>HSM</b> в дата-центре, чип <b>TPM</b> в ноутбуке.</p>`,
    },
    ex: {
      en: `<p>In 2011 the Dutch CA DigiNotar was hacked and attackers issued fake certificates for google.com, used to spy on Iranian Gmail users. Browsers removed DigiNotar from their trust stores and the company went bankrupt within weeks. Today, Certificate Transparency logs make every issued certificate public, so a rogue one is spotted quickly.</p>`,
      ru: `<p>В 2011 году был взломан нидерландский УЦ DigiNotar, и злоумышленники выпустили поддельные сертификаты для google.com, которыми шпионили за иранскими пользователями Gmail. Браузеры удалили DigiNotar из списков доверия, и компания обанкротилась за несколько недель. Сегодня журналы Certificate Transparency делают каждый выпущенный сертификат публичным, и поддельный быстро замечают.</p>`,
    },
    dg: [{
      title: { en: 'Certificate chain of trust and revocation', ru: 'Цепочка доверия сертификатов и отзыв' }, h: 280,
      zones: [[20, 30, 220, 80, { en: 'Offline, in a vault', ru: 'Офлайн, в хранилище' }, 'trust']],
      nodes: [
        ['root', 130, 80, 'Root CA', { en: 'self-signed', ru: 'самоподписанный' }, '🏛', 'key'],
        ['int', 130, 170, 'Intermediate CA', { en: 'issues daily', ru: 'выпускает ежедневно' }, '🏢', 'key'],
        ['leaf', 130, 250, 'www.bank.com', { en: 'server certificate', ru: 'сертификат сервера' }, '📜'],
        ['br', 470, 250, { en: 'Browser', ru: 'Браузер' }, { en: 'checks the chain', ru: 'проверяет цепочку' }, '💻'],
        ['store', 470, 80, { en: 'Trust store', ru: 'Хранилище доверия' }, { en: 'built-in root CAs', ru: 'встроенные корневые УЦ' }, '📚', 'ok'],
        ['ocsp', 660, 170, 'OCSP / CRL', { en: 'revoked?', ru: 'отозван?' }, '🚫'],
      ],
      edges: [
        ['root', 'int', { en: 'signs', ru: 'подписывает' }, 'key'], ['int', 'leaf', { en: 'signs', ru: 'подписывает' }, 'key'],
        ['leaf', 'br', { en: 'sent in TLS', ru: 'в TLS' }], ['store', 'br', { en: 'trusted anchor', ru: 'точка доверия' }, 'ok dash'], ['br', 'ocsp', null, 'dash'],
      ],
      note: { en: 'The browser walks up the chain until it reaches a root in its own trust store, and checks validity dates, the name, and revocation status.', ru: 'Браузер идёт вверх по цепочке до корня из своего хранилища доверия и проверяет сроки действия, имя и статус отзыва.' },
    }, {
      title: { en: 'Where private keys live: TPM vs HSM', ru: 'Где живут закрытые ключи: TPM и HSM' }, h: 220,
      zones: [[20, 35, 330, 170, { en: 'Laptop', ru: 'Ноутбук' }], [410, 35, 330, 170, { en: 'Data center', ru: 'Дата-центр' }, 'trust']],
      nodes: [
        ['os', 185, 85, 'OS', { en: 'BitLocker, login', ru: 'BitLocker, вход' }, '💻'],
        ['tpm', 185, 170, 'TPM', { en: 'chip on motherboard', ru: 'чип на плате' }, '🔑', 'key'],
        ['ca', 575, 85, { en: 'CA / payment app', ru: 'УЦ / платёжн. прил.' }, null, '🖥'],
        ['hsm', 575, 170, 'HSM', { en: 'tamper-resistant box', ru: 'защищённый модуль' }, '🔐', 'key'],
      ],
      edges: [['os', 'tpm', { en: 'unseal', ru: 'выдай' }, 'both'], ['ca', 'hsm', { en: 'sign', ru: 'подпиши' }, 'both']],
      note: { en: 'Keys are generated and used inside the hardware and never leave it in plaintext. TPM: one per device, measures boot. HSM: shared appliance, certified to FIPS 140-3, high throughput.', ru: 'Ключи создаются и используются внутри железа и никогда не покидают его в открытом виде. TPM — один на устройство, измеряет загрузку. HSM — общий аппарат, сертифицирован по FIPS 140-3, высокая производительность.' },
    }],
  },
  'd3-c10': {
    plain: {
      en: `<p>Cryptanalytic attacks are ways to break encryption without being given the key. Most real attacks don't break the math; they go around it: guessing weak passwords (brute force, dictionary), using precomputed answer tables (rainbow tables, beaten by salt), listening to power use or timing (side channels), or simply threatening someone (the "rubber-hose" attack). Strong algorithms with long keys make direct attacks hopeless.</p>`,
      ru: `<p>Криптоаналитические атаки — способы взломать шифрование, не получив ключ. Большинство реальных атак не ломают математику, а обходят её: подбирают слабые пароли (перебор, словарь), используют заранее посчитанные таблицы ответов (радужные таблицы, от них защищает соль), слушают энергопотребление или время работы (побочные каналы) или просто угрожают человеку (атака «резиновым шлангом»). Сильные алгоритмы с длинными ключами делают прямые атаки безнадёжными.</p>`,
    },
    ex: {
      en: `<p>Brute-forcing a 128-bit AES key would take longer than the age of the universe even with every computer on Earth. Yet researchers have repeatedly pulled AES keys out of smart cards and chips through side channels such as power consumption, and countless breaches crack weak passwords offline. Attackers go for the weakest link, which is rarely the algorithm.</p>`,
      ru: `<p>Перебор 128-битного ключа AES занял бы больше, чем возраст Вселенной, даже со всеми компьютерами Земли. Но исследователи извлекали ключи по побочному каналу, измеряя энергопотребление устройства, а в бесчисленных утечках слабые пароли взламывают офлайн. Атакующие бьют в самое слабое звено, и это редко алгоритм.</p>`,
    },
  },
  'd3-c11': {
    plain: {
      en: `<p>Physical security starts before the building exists. Pick a site away from flood zones and with emergency services nearby. Then design like an onion: a fence and lighting outside, a guarded entrance with a mantrap (two doors, only one opens at a time), badges inside, and the server room at the center, without windows and with its own access control. <b>CPTED</b> (crime prevention through environmental design) uses landscaping, lighting and sightlines so that intruders feel watched.</p>`,
      ru: `<p>Физическая безопасность начинается до постройки здания. Выбирайте площадку вне зон затопления и рядом с экстренными службами. Затем проектируйте как луковицу: снаружи забор и освещение, охраняемый вход со шлюзом (mantrap: две двери, одновременно открывается только одна), внутри бейджи, а в центре серверная — без окон и со своим контролем доступа. <b>CPTED</b> (предотвращение преступлений через проектирование среды) использует озеленение, свет и обзор, чтобы нарушитель чувствовал, что за ним наблюдают.</p>`,
    },
    ex: {
      en: `<p>Large cloud data centers are built as concentric layers: perimeter fence with vehicle barriers, guarded gate with ID check, badge plus biometric at the building, and badge plus PIN again at each data hall. Visitors are escorted and every door event is logged. Penetration testers who tailgate an employee through the front door are a classic finding when the inner layers are missing.</p>`,
      ru: `<p>Крупные облачные дата-центры строят концентрическими слоями: забор с противотаранными барьерами, охраняемые ворота с проверкой документов, бейдж и биометрия на входе в здание, и снова бейдж с PIN у каждого машинного зала. Посетителей сопровождают, каждое открытие двери журналируется. Пентестер, прошедший за сотрудником «на хвосте» через главный вход, — классическая находка, когда внутренних слоёв нет.</p>`,
    },
    dg: {
      title: { en: 'Facility security in layers', ru: 'Слои физической защиты объекта' }, h: 290,
      zones: [[10, 30, 740, 250, { en: 'Perimeter: fence, lighting, CCTV, vehicle barriers', ru: 'Периметр: забор, освещение, видеонаблюдение, барьеры' }, 'untrust'], [200, 65, 540, 200, { en: 'Building: guard, mantrap, badges', ru: 'Здание: охрана, шлюз, бейджи' }, 'dmz'], [460, 100, 270, 150, { en: 'Server room: biometric + PIN', ru: 'Серверная: биометрия + PIN' }, 'trust']],
      nodes: [
        ['v', 100, 180, { en: 'Visitor', ru: 'Посетитель' }, null, '🚶'],
        ['gate', 100, 100, { en: 'Gate', ru: 'Ворота' }, null, '🚧', 'key'],
        ['mt', 320, 180, { en: 'Mantrap', ru: 'Шлюз' }, { en: 'one door at a time', ru: 'одна дверь за раз' }, '🚪', 'key'],
        ['door', 595, 150, { en: 'Locked door', ru: 'Запертая дверь' }, null, '🔒', 'key'],
        ['rack', 595, 215, { en: 'Server racks', ru: 'Серверные стойки' }, null, '🗄', 'ok'],
      ],
      edges: [['gate', 'v', null, 'dash'], ['v', 'mt', { en: 'escorted', ru: 'с сопровожд.' }], ['mt', 'door'], ['door', 'rack']],
      note: { en: 'Each layer should deter, detect and delay so the response team arrives before the intruder reaches the assets.', ru: 'Каждый слой должен отпугивать, обнаруживать и задерживать, чтобы группа реагирования успела раньше, чем нарушитель доберётся до активов.' },
    },
  },
  'd3-c12': {
    plain: {
      en: `<p>Data centers need the right environment to survive. Fire needs heat, fuel and oxygen, so extinguishing removes one of them: water cools, gas (like FM-200) interrupts the chemical reaction without damaging electronics. For power, a <b>UPS</b> (battery) bridges short outages and a generator takes over long ones. <b>HVAC</b> (heating, ventilation and air conditioning) keeps temperature and humidity in range: too dry causes static, too humid causes corrosion.</p>`,
      ru: `<p>Дата-центру нужна правильная среда. Огню нужны тепло, топливо и кислород, поэтому тушение убирает одно из них: вода охлаждает, газ (например, FM-200) прерывает химическую реакцию, не повреждая электронику. Для питания <b>ИБП</b> (батарея) перекрывает короткие отключения, а генератор берёт на себя длинные. <b>HVAC</b> (отопление, вентиляция, кондиционирование) держит температуру и влажность в норме: слишком сухо — статика, слишком влажно — коррозия.</p>`,
    },
    ex: {
      en: `<p>In March 2021 a fire destroyed one OVHcloud data center in Strasbourg and damaged another. Thousands of websites went offline, and some customers lost data permanently because their backups were stored in the same building. A dry-pipe or pre-action sprinkler system, fire compartments, and off-site backups are the lessons.</p>`,
      ru: `<p>В марте 2021 года пожар уничтожил один дата-центр OVHcloud в Страсбурге и повредил другой. Тысячи сайтов упали, а часть клиентов потеряла данные навсегда, потому что резервные копии хранились в том же здании. Уроки: спринклеры с сухими трубами или предварительного действия, противопожарные отсеки и резервные копии на другой площадке.</p>`,
    },
  },
  'd3-c13': {
    plain: {
      en: `<p>A system lives through stages: idea, requirements, design, build, test, deploy, operate, retire. Security belongs in every stage, not just a check at the end, the same way a house is designed with fire exits rather than having them cut into the walls after people move in. Adding security late is expensive and usually weaker.</p>`,
      ru: `<p>Система проходит этапы: идея, требования, проектирование, создание, тестирование, развёртывание, эксплуатация, вывод из эксплуатации. Безопасность нужна на каждом этапе, а не только как проверка в конце — как дом проектируют сразу с пожарными выходами, а не прорубают их в стенах после заселения. Добавлять безопасность поздно дорого и обычно менее надёжно.</p>`,
    },
    ex: {
      en: `<p>A city's new parking-payment system: security requirements (card data must never be stored) are written in the requirements phase, the design uses a tokenizing payment provider, testing includes a pentest, operations patch monthly, and at retirement the old servers' disks are destroyed with a certificate. Skipping that last step is how old systems become future breaches.</p>`,
      ru: `<p>Новая городская система оплаты парковки: требования безопасности (данные карт нигде не хранятся) записаны на этапе требований, в дизайне используется платёжный провайдер с токенизацией, тестирование включает пентест, в эксплуатации ежемесячные патчи, а при выводе диски старых серверов уничтожаются с сертификатом. Пропуск последнего шага — путь, которым старые системы становятся будущими утечками.</p>`,
    },
  },
});
