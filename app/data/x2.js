'use strict';
// Beginner layer for Domain 2: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(2, {
  'd2-c1': {
    plain: {
      en: `<p>Classification is sorting things by how much it would hurt to lose them, like a home where passports go in the safe, bills in a drawer and flyers on the fridge. First you list what you have (inventory), name who is responsible for each item (owner), then label it so everyone knows how to handle it. Labels are the visible sticker; classification is the decision behind it.</p>`,
      ru: `<p>Классификация — сортировка по тому, насколько больно будет потерять вещь: дома паспорта лежат в сейфе, счета в ящике, рекламные листовки на холодильнике. Сначала составляете перечень того, что есть (инвентаризация), назначаете ответственного за каждый предмет (владельца), затем маркируете, чтобы все знали, как обращаться. Метка — видимая наклейка; классификация — решение за ней.</p>`,
    },
    ex: {
      en: `<p>A pharma company uses four levels: Public, Internal, Confidential, Restricted. A new drug formula is Restricted: encrypted, access only for the named research team, no email outside. The cafeteria menu is Public. Microsoft Purview labels attached to documents enforce this automatically: a Restricted file can't be opened outside the company or forwarded.</p>`,
      ru: `<p>Фармкомпания использует четыре уровня: Публичная, Внутренняя, Конфиденциальная, Строго ограниченная. Формула нового лекарства — Строго ограниченная: зашифрована, доступ только у названной исследовательской группы, отправлять наружу нельзя. Меню столовой — Публичное. Метки Microsoft Purview на документах применяют правила автоматически: файл с высшей меткой нельзя открыть вне компании или переслать.</p>`,
    },
  },
  'd2-c2': {
    plain: {
      en: `<p>Think of a museum painting. The <b>owner</b> (the museum director) decides who may see it and how valuable it is, and is accountable if it is lost. The <b>custodian</b> (the guards and restorers) does the daily protection the owner asked for. The <b>user</b> (the visitor) looks at it under the rules. With personal data, the <b>controller</b> decides why and how data is processed, and the <b>processor</b> does it on the controller's behalf. The person the data is about is the <b>data subject</b>.</p>`,
      ru: `<p>Представьте картину в музее. <b>Владелец</b> (директор музея) решает, кто может её видеть и насколько она ценна, и отвечает, если её потеряют. <b>Хранитель (custodian)</b> — охрана и реставраторы — выполняет ежедневную защиту по указанию владельца. <b>Пользователь</b> (посетитель) смотрит на неё по правилам. Для персональных данных <b>контролёр</b> решает, зачем и как их обрабатывать, а <b>обработчик</b> делает это по его поручению. Человек, о котором данные, — <b>субъект данных</b>.</p>`,
    },
    ex: {
      en: `<p>The HR director owns the payroll data and decides that only HR and finance see salaries. The IT team (custodian) configures permissions and backups. The company is the GDPR controller; the cloud payroll provider is the processor and must sign a data processing agreement. If salaries leak because IT misconfigured a share, the HR director is still accountable for having owned and overseen that data.</p>`,
      ru: `<p>Директор по персоналу — владелец данных о зарплатах и решает, что их видят только HR и финансы. IT (хранитель) настраивает права и резервное копирование. Компания — контролёр по GDPR; облачный сервис расчёта зарплаты — обработчик и обязан подписать соглашение об обработке данных. Если зарплаты утекут из-за ошибки IT в настройке папки, отвечает всё равно директор по персоналу как владелец, который должен был это контролировать.</p>`,
    },
  },
  'd2-c3': {
    plain: {
      en: `<p>Data is always in one of three states. <b>At rest</b>: sitting on a disk, like money in a vault. <b>In transit</b>: moving across a network, like money in an armored truck. <b>In use</b>: open in memory while a program works on it, like money being counted on the table. Each needs its own protection: encryption on disk, encryption on the wire (TLS), and access control or special hardware while in use.</p>`,
      ru: `<p>Данные всегда в одном из трёх состояний. <b>В покое (at rest)</b>: лежат на диске, как деньги в хранилище. <b>В движении (in transit)</b>: передаются по сети, как деньги в инкассаторской машине. <b>В использовании (in use)</b>: открыты в памяти, пока программа с ними работает, как деньги, которые пересчитывают на столе. Каждому нужна своя защита: шифрование диска, шифрование канала (TLS), а в использовании — контроль доступа или специальное оборудование.</p>`,
    },
    ex: {
      en: `<p>A sales manager's laptop has BitLocker (at rest), connects to the CRM over HTTPS (in transit), and the CRM runs in the cloud. While the CRM processes a customer record it is decrypted in memory (in use). Cloud "confidential computing" (e.g. AMD SEV, Intel TDX) keeps that memory encrypted even from the cloud provider's own admins.</p>`,
      ru: `<p>На ноутбуке менеджера включён BitLocker (в покое), к CRM он подключается по HTTPS (в движении), а CRM работает в облаке. Пока CRM обрабатывает запись клиента, она расшифрована в памяти (в использовании). «Конфиденциальные вычисления» в облаке (например, AMD SEV, Intel TDX) держат эту память зашифрованной даже от администраторов облачного провайдера.</p>`,
    },
    dg: {
      title: { en: 'The three data states along one journey', ru: 'Три состояния данных на одном маршруте' }, h: 260,
      zones: [[10, 40, 200, 205, { en: 'At rest', ru: 'В покое' }, 'trust'], [270, 40, 220, 205, { en: 'In transit', ru: 'В движении' }, 'dmz'], [550, 40, 200, 205, { en: 'In use', ru: 'В использовании' }, 'trust']],
      nodes: [
        ['lap', 110, 110, { en: 'Laptop disk', ru: 'Диск ноутбука' }, null, '💻'],
        ['fde', 110, 190, { en: 'Full-disk encryption', ru: 'Шифрование диска' }, null, '🔒', 'key', 180],
        ['net', 380, 110, { en: 'Network', ru: 'Сеть' }, null, '🌐'],
        ['tls', 380, 190, { en: 'TLS / VPN', ru: 'TLS / VPN' }, null, '🔒', 'key'],
        ['app', 650, 110, { en: 'Cloud app RAM', ru: 'Память облачн. прил.' }, null, '☁️', null, 190],
        ['tee', 650, 190, { en: 'Enclave / access ctl.', ru: 'Анклав / контроль' }, null, '🔒', 'key', 190],
      ],
      edges: [['lap', 'net', null, 'key'], ['net', 'app', null, 'key'], ['fde', 'lap', null, 'dash'], ['tls', 'net', null, 'dash'], ['tee', 'app', null, 'dash']],
      note: { en: 'Data in use is the hardest to protect: the program must see plaintext to work with it.', ru: 'Данные в использовании защищать труднее всего: программе нужно видеть открытый текст, чтобы с ним работать.' },
    },
  },
  'd2-c4': {
    plain: {
      en: `<p>Data has a life, like a paper document: it is written (create), filed (store), read (use), sent to others (share), boxed up in the basement (archive) and finally shredded (destroy). A mistake at any stage can leak it, so security follows the data from birth to destruction.</p>`,
      ru: `<p>У данных есть жизненный цикл, как у бумажного документа: его пишут (создание), подшивают (хранение), читают (использование), отправляют другим (передача), уносят в коробке в подвал (архив) и в конце уничтожают в шредере. Ошибка на любом этапе может привести к утечке, поэтому безопасность сопровождает данные от рождения до уничтожения.</p>`,
    },
    ex: {
      en: `<p>A bank creates a loan application (classified Confidential at creation), stores it encrypted, lets the credit officer use it, shares it with a credit bureau over a secure API, archives it for the legally required 10 years, then crypto-shreds it by deleting the encryption key. The weak spot found in an audit: old copies in a test database that skipped the "destroy" step.</p>`,
      ru: `<p>Банк создаёт кредитную заявку (при создании ей присваивают «Конфиденциально»), хранит её зашифрованной, кредитный специалист её использует, по защищённому API она передаётся в бюро кредитных историй, архивируется на положенные по закону 10 лет, затем уничтожается криптографически — удалением ключа шифрования. Слабое место, найденное аудитом: старые копии в тестовой базе, которые пропустили этап «уничтожение».</p>`,
    },
  },
  'd2-c5': {
    plain: {
      en: `<p>Deleting a file is like removing a book's entry from the library catalogue: the book is still on the shelf. <b>Data remanence</b> is that leftover data. To truly remove it you <b>clear</b> (overwrite, fine for reuse inside the company), <b>purge</b> (stronger, e.g. degaussing magnetic media or crypto-erase, safe against lab recovery) or <b>destroy</b> (shred, incinerate, disintegrate). SSDs hide spare blocks, so overwriting is unreliable for them; use crypto-erase or destruction.</p>`,
      ru: `<p>Удалить файл — как убрать карточку книги из каталога библиотеки: книга всё ещё на полке. <b>Остаточные данные (remanence)</b> — это то, что осталось. Чтобы удалить по-настоящему, их <b>очищают</b> (перезапись, годится для повторного использования внутри компании), <b>стирают надёжно (purge)</b> (сильнее: размагничивание магнитных носителей или криптостирание, устойчиво к лабораторному восстановлению) или <b>уничтожают</b> (шредер, сжигание, измельчение). SSD прячут запасные блоки, поэтому перезапись для них ненадёжна: используйте криптостирание или уничтожение.</p>`,
    },
    ex: {
      en: `<p>In 2022 Morgan Stanley was fined $35 million by the US SEC after decommissioned servers and hard drives holding data on about 15 million customers were sold on by a moving company without being wiped. Some drives turned up on an online auction site. A certificate of destruction from a vetted vendor would have closed that gap.</p>`,
      ru: `<p>В 2022 году SEC США оштрафовала Morgan Stanley на $35 млн: списанные серверы и диски с данными около 15 млн клиентов были перепроданы транспортной компанией без затирания. Часть дисков всплыла на интернет-аукционе. Сертификат уничтожения от проверенного подрядчика закрыл бы эту брешь.</p>`,
    },
  },
  'd2-c6': {
    plain: {
      en: `<p>A <b>baseline</b> is a ready-made recipe of security controls, like a standard building code. <b>Scoping</b> removes the parts that don't apply (no pool, so no pool fence rules). <b>Tailoring</b> adjusts the rest to your situation (stronger locks in a high-crime area). Then tools enforce it: <b>DLP</b> (data loss prevention) watches for sensitive data leaving, and a <b>CASB</b> (cloud access security broker) sits between users and cloud apps to see and control what they do there.</p>`,
      ru: `<p><b>Базовый уровень (baseline)</b> — готовый рецепт мер защиты, как типовые строительные нормы. <b>Определение области (scoping)</b> убирает неприменимое (бассейна нет — правила ограждения бассейна не нужны). <b>Адаптация (tailoring)</b> подгоняет остальное под ваши условия (в неблагополучном районе — замки покрепче). Затем инструменты применяют правила: <b>DLP</b> (предотвращение утечек) следит, чтобы чувствительные данные не уходили наружу, а <b>CASB</b> (брокер безопасного доступа к облаку) стоит между пользователями и облачными приложениями и видит и контролирует, что там происходит.</p>`,
    },
    ex: {
      en: `<p>A hospital adopts the CIS Benchmark for Windows servers, scopes out the Bluetooth settings (servers have no Bluetooth) and tailors the password rules to its stricter policy. Its DLP blocks an email containing 50 patient records sent to a Gmail address. Its CASB notices a doctor uploading scans to a personal Dropbox and blocks the upload while allowing the hospital's approved OneDrive.</p>`,
      ru: `<p>Больница берёт CIS Benchmark для серверов Windows, исключает настройки Bluetooth (у серверов его нет) и ужесточает правила паролей под свою политику. DLP блокирует письмо с 50 записями пациентов, отправляемое на Gmail. CASB замечает, что врач загружает снимки в личный Dropbox, и блокирует загрузку, разрешая при этом одобренный больницей OneDrive.</p>`,
    },
    dg: {
      title: { en: 'Where DLP and CASB sit', ru: 'Где стоят DLP и CASB' }, h: 280,
      zones: [[10, 40, 330, 225, { en: 'Company', ru: 'Компания' }, 'trust'], [560, 40, 190, 225, { en: 'Internet / cloud', ru: 'Интернет / облако' }, 'untrust']],
      nodes: [
        ['u', 90, 150, { en: 'Employee', ru: 'Сотрудник' }, null, '🧑‍💻'],
        ['edlp', 245, 75, { en: 'Endpoint DLP', ru: 'DLP на ПК' }, { en: 'USB, print, copy', ru: 'USB, печать, копир.' }, '🛡', 'key'],
        ['ndlp', 245, 225, { en: 'Email / network DLP', ru: 'DLP почты и сети' }, null, '🛡', 'key'],
        ['casb', 425, 150, 'CASB', { en: 'sees cloud app use', ru: 'видит облачные прил.' }, '🛂', 'key'],
        ['ok', 655, 80, { en: 'Approved SaaS', ru: 'Одобренный SaaS' }, null, '✅', 'ok'],
        ['bad', 655, 220, { en: 'Personal cloud', ru: 'Личное облако' }, null, '⛔', 'bad'],
      ],
      edges: [['u', 'edlp', null, 'dash'], ['u', 'casb'], ['u', 'ndlp', null, 'dash'], ['casb', 'ok', { en: 'allow', ru: 'разрешить' }, 'ok'], ['casb', 'bad', { en: 'block', ru: 'блок' }, 'bad']],
      note: { en: 'DLP needs data classified first: it can only block what it can recognize (labels, patterns such as card numbers, fingerprints of documents).', ru: 'DLP требует предварительной классификации: блокировать можно только то, что удаётся распознать (метки, шаблоны вроде номеров карт, отпечатки документов).' },
    },
  },
  'd2-c7': {
    plain: {
      en: `<p>Keep data like milk in the fridge: as long as you need it and no longer. Old data you no longer need is pure risk: it can leak, and lawyers can demand it in a lawsuit. A <b>legal hold</b> overrides normal deletion when a case is expected. <b>EOL</b> (end of life) means the vendor stops selling a product; <b>EOS</b> (end of support) means no more security patches, so the product must be replaced or isolated.</p>`,
      ru: `<p>Храните данные как молоко в холодильнике: столько, сколько нужно, и не дольше. Старые ненужные данные — чистый риск: они могут утечь, а юристы могут потребовать их в суде. <b>Юридическое удержание (legal hold)</b> отменяет обычное удаление, если ожидается судебное дело. <b>EOL</b> (конец жизни) — производитель прекращает продажи; <b>EOS</b> (конец поддержки) — больше нет патчей безопасности, поэтому продукт надо заменить или изолировать.</p>`,
    },
    ex: {
      en: `<p>Windows 10 reached end of support in October 2025. A clinic that still ran it on reception PCs either had to pay for Extended Security Updates, upgrade, or isolate the machines. Meanwhile, its retention policy kept patient records for the legally required period, but marketing had kept every web form submission since 2012 "just in case", which became the bulk of a later breach notification.</p>`,
      ru: `<p>Поддержка Windows 10 закончилась в октябре 2025 года. Клинике, где на ресепшене всё ещё стояла эта ОС, пришлось либо платить за расширенные обновления безопасности, либо обновляться, либо изолировать машины. При этом политика хранения держала медкарты положенный законом срок, а маркетинг хранил «на всякий случай» все заявки с сайта с 2012 года — именно они составили основную часть последующего уведомления об утечке.</p>`,
    },
  },
});
