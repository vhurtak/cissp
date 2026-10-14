'use strict';
// Beginner layer for Domain 7: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(7, {
  'd7-c1': {
    plain: {
      en: `<p>Digital evidence is like a fingerprint on a glass: useful only if you can prove nobody touched it between the crime scene and the courtroom. So investigators photograph everything, make an exact copy (a forensic image), prove the copy is identical with a hash, work only on the copy, and log every hand-over: the <b>chain of custody</b>. Collect the most volatile evidence first (memory, then disk, then backups), because it disappears fastest.</p>`,
      ru: `<p>Цифровое доказательство — как отпечаток пальца на стакане: полезно, только если можно доказать, что его никто не трогал между местом преступления и залом суда. Поэтому следователи всё фотографируют, делают точную копию (криминалистический образ), доказывают её идентичность хешем, работают только с копией и записывают каждую передачу из рук в руки — это <b>цепочка хранения (chain of custody)</b>. Сначала собирают самое изменчивое (память, потом диск, потом бэкапы), потому что оно исчезает быстрее.</p>`,
    },
    ex: {
      en: `<p>A company suspects an employee of selling customer lists. The IR team captures the laptop's RAM, images the disk with a write blocker, records the SHA-256 hashes, seals the drive in a numbered evidence bag and logs every person who handles it. Months later the defense lawyer questions the evidence; the unbroken custody log and matching hashes keep it admissible.</p>`,
      ru: `<p>Компания подозревает сотрудника в продаже клиентских баз. Команда реагирования снимает дамп памяти ноутбука, делает образ диска через блокиратор записи, фиксирует хеши SHA-256, запечатывает диск в пронумерованный пакет для улик и записывает каждого, кто к нему прикасается. Через несколько месяцев адвокат защиты оспаривает доказательства; непрерывный журнал хранения и совпадающие хеши сохраняют их допустимость.</p>`,
    },
    dg: {
      title: { en: 'Chain of custody', ru: 'Цепочка хранения доказательств' }, h: 230,
      nodes: [
        ['seize', 110, 60, { en: 'Seize', ru: 'Изъятие' }, { en: 'photo, label, time', ru: 'фото, метка, время' }, '📸', 'key'],
        ['img', 380, 60, { en: 'Forensic image', ru: 'Образ диска' }, { en: 'write blocker + hash', ru: 'блокиратор + хеш' }, '💽', 'key'],
        ['bag', 650, 60, { en: 'Seal and store', ru: 'Опечатать и хранить' }, { en: 'evidence locker', ru: 'хранилище улик' }, '🔒', 'key'],
        ['lab', 650, 175, { en: 'Analysis', ru: 'Анализ' }, { en: 'on a copy only', ru: 'только на копии' }, '🔬'],
        ['rep', 380, 175, { en: 'Report', ru: 'Отчёт' }, { en: 'hashes still match', ru: 'хеши совпадают' }, '📄'],
        ['court', 110, 175, { en: 'Court', ru: 'Суд' }, { en: 'admissible', ru: 'допустимо' }, '⚖️', 'ok'],
      ],
      edges: [['seize', 'img'], ['img', 'bag'], ['bag', 'lab'], ['lab', 'rep'], ['rep', 'court', null, 'ok']],
      note: { en: 'Every arrow is a signed entry in the custody log: who, when, why. A gap anywhere lets the other side challenge the evidence.', ru: 'Каждая стрелка — подписанная запись в журнале хранения: кто, когда, зачем. Пробел в любом месте позволяет другой стороне оспорить доказательство.' },
    },
  },
  'd7-c2': {
    plain: {
      en: `<p>Logging is a security camera for systems; monitoring is someone actually watching the screens. A <b>SIEM</b> collects logs from everywhere and raises alerts when patterns look bad. <b>SOAR</b> automates the routine response, like isolating a laptop. <b>UEBA</b> (user and entity behavior analytics) learns what is normal for each person and flags oddities, such as an accountant suddenly downloading source code at 3 a.m.</p>`,
      ru: `<p>Журналирование — камера наблюдения для систем; мониторинг — человек, который действительно смотрит в экраны. <b>SIEM</b> собирает журналы отовсюду и поднимает тревогу, когда картина выглядит плохо. <b>SOAR</b> автоматизирует рутинное реагирование, например изоляцию ноутбука. <b>UEBA</b> (поведенческая аналитика пользователей и сущностей) учится, что нормально для каждого, и отмечает странности — например, бухгалтер вдруг качает исходный код в 3 часа ночи.</p>`,
    },
    ex: {
      en: `<p>In the 2013 Target breach, the company's FireEye malware-detection system did raise alerts, and its security team in Bangalore escalated them, but nobody in the US acted. Logging and alerting worked; monitoring and response didn't. Tools are only useful if someone owns the alert and has the authority to act.</p>`,
      ru: `<p>При взломе Target в 2013 году система обнаружения вредоносного ПО FireEye действительно подняла тревогу, и команда безопасности в Бангалоре эскалировала её, но в США никто не отреагировал. Журналирование и оповещение сработали; мониторинг и реагирование — нет. Инструменты полезны, только если у оповещения есть владелец с полномочиями действовать.</p>`,
    },
  },
  'd7-c3': {
    plain: {
      en: `<p>Daily operations follow a few simple rules. Know only what you need (<b>need to know</b>) and have only the rights you need (<b>least privilege</b>). Don't let one person do a sensitive job alone (<b>separation of duties</b>); for the most critical tasks require two people at once (<b>two-person integrity</b>), like two keys to launch a missile. <b>Rotate jobs</b> so fraud can't hide, and keep admin rights rare and watched.</p>`,
      ru: `<p>Повседневная эксплуатация следует нескольким простым правилам. Знай только то, что нужно (<b>необходимость знать</b>), и имей только нужные права (<b>минимальные привилегии</b>). Не позволяй одному человеку делать чувствительную работу в одиночку (<b>разделение обязанностей</b>); для самых критичных задач нужны двое одновременно (<b>правило двух лиц</b>), как два ключа для запуска ракеты. <b>Ротируй должности</b>, чтобы мошенничество не могло прятаться, а админ-права держи редкими и под наблюдением.</p>`,
    },
    ex: {
      en: `<p>In a bank's payment team, one person creates a new supplier in the system and a different person approves payments to it. A fraudster who adds a fake supplier can't also pay it. Changes to the SWIFT payment gateway require two administrators to be logged in together, and every session is recorded.</p>`,
      ru: `<p>В платёжном отделе банка один человек заводит нового поставщика в системе, а другой одобряет платежи ему. Мошенник, добавивший фиктивного поставщика, не сможет сам же ему заплатить. Изменения в платёжном шлюзе SWIFT требуют одновременного входа двух администраторов, и каждая сессия записывается.</p>`,
    },
  },
  'd7-c4': {
    plain: {
      en: `<p>An <b>event</b> is anything that happens (a login, a file opened). An <b>incident</b> is an event that harms or threatens confidentiality, integrity or availability. Incident response is a fire drill you practice before the fire: detect it, stop it spreading (contain), remove the cause, restore service, report as required, and learn lessons so it doesn't happen again. Containment comes before clean-up, and evidence must be preserved along the way.</p>`,
      ru: `<p><b>Событие</b> — всё, что происходит (вход, открытие файла). <b>Инцидент</b> — событие, которое вредит или угрожает конфиденциальности, целостности или доступности. Реагирование на инциденты — пожарные учения, которые проводят до пожара: обнаружить, остановить распространение (сдерживание), устранить причину, восстановить сервис, отчитаться как положено и извлечь уроки, чтобы не повторилось. Сдерживание идёт раньше очистки, а доказательства по пути сохраняются.</p>`,
    },
    ex: {
      en: `<p>At 02:10 the SIEM correlates an impossible-travel login (Berlin, then Singapore 10 minutes later) with mass file downloads. The SOAR playbook disables the account and isolates the laptop within 90 seconds. The on-call analyst confirms an incident, the IR team rotates credentials and finds the phishing email, and the lessons-learned meeting adds a new detection rule.</p>`,
      ru: `<p>В 02:10 SIEM связывает «невозможное перемещение» (вход из Берлина, а через 10 минут из Сингапура) с массовым скачиванием файлов. Сценарий SOAR за 90 секунд блокирует учётку и изолирует ноутбук. Дежурный аналитик подтверждает инцидент, команда реагирования меняет учётные данные и находит фишинговое письмо, а разбор полётов добавляет новое правило обнаружения.</p>`,
    },
    dg: {
      title: { en: 'Incident response with SIEM, SOC and SOAR', ru: 'Реагирование на инциденты с SIEM, SOC и SOAR' }, h: 230,
      nodes: [
        ['ev', 80, 60, { en: 'Events', ru: 'События' }, { en: 'logs, EDR', ru: 'журналы, EDR' }, '📥'],
        ['siem', 270, 60, 'SIEM', { en: 'detect', ru: 'обнаружение' }, '📊', 'key'],
        ['soc', 470, 60, { en: 'SOC analyst', ru: 'Аналитик SOC' }, { en: 'triage: incident?', ru: 'разбор: инцидент?' }, '🧑‍💻', 'key'],
        ['soar', 660, 60, 'SOAR', { en: 'contain fast', ru: 'быстрое сдерживание' }, '🤖', 'ok'],
        ['ir', 660, 175, { en: 'IR team', ru: 'Команда IR' }, { en: 'eradicate, recover', ru: 'устранить, восстановить' }, '🚒', 'ok'],
        ['rep', 460, 175, { en: 'Report', ru: 'Отчётность' }, { en: 'regulators, customers', ru: 'регуляторы, клиенты' }, '📣'],
        ['ll', 260, 175, { en: 'Lessons learned', ru: 'Разбор уроков' }, { en: 'improve controls', ru: 'улучшить меры' }, '📝'],
        ['prep', 70, 175, { en: 'Preparation', ru: 'Подготовка' }, null, '🧰', 'dim'],
      ],
      edges: [['ev', 'siem'], ['siem', 'soc', { en: 'alert', ru: 'тревога' }], ['soc', 'soar'], ['soar', 'ir'], ['ir', 'rep'], ['rep', 'll'], ['ll', 'prep'], ['prep', 'siem', { en: 'new rules', ru: 'новые правила' }, 'dash']],
      note: { en: 'ISC2 order: detection → response → mitigation (containment) → reporting → recovery → remediation → lessons learned.', ru: 'Порядок ISC2: обнаружение → реагирование → смягчение (сдерживание) → отчётность → восстановление → устранение причин → извлечение уроков.' },
    },
  },
  'd7-c5': {
    plain: {
      en: `<p>Detective and preventive tools on endpoints and networks: <b>allow lists</b> run only approved software (a guest list at the door), <b>deny lists</b> block known-bad (a list of banned people). <b>EDR</b> (endpoint detection and response) watches what programs do on each computer. <b>Sandboxes</b> open suspicious files in a safe box first. <b>Honeypots</b> are fake systems that no real user should ever touch, so any touch is an alarm.</p>`,
      ru: `<p>Детективные и превентивные средства на конечных точках и в сети: <b>списки разрешённого</b> запускают только одобренное ПО (список гостей у двери), <b>списки запрещённого</b> блокируют известное плохое (список нежелательных лиц). <b>EDR</b> (обнаружение и реагирование на конечных точках) следит, что делают программы на каждом компьютере. <b>Песочницы</b> сначала открывают подозрительные файлы в безопасной коробке. <b>Ханипоты</b> — фальшивые системы, которых ни один настоящий пользователь не должен касаться, поэтому любое касание — тревога.</p>`,
    },
    ex: {
      en: `<p>A hospital places a fake file server named "HR-Salaries" on its network. Nobody legitimate has a reason to open it. Six months later an alert fires: a compromised reception PC is scanning shares and opened it. EDR on that PC had already flagged an unusual PowerShell command, and together they gave the SOC a two-hour head start on the ransomware gang.</p>`,
      ru: `<p>Больница размещает в сети фальшивый файловый сервер «HR-Зарплаты». У легитимных пользователей нет причин его открывать. Через полгода срабатывает тревога: взломанный ПК регистратуры сканирует папки и открыл его. EDR на этом ПК уже отметил необычную команду PowerShell, и вместе они дали SOC двухчасовую фору перед группой вымогателей.</p>`,
    },
  },
  'd7-c6': {
    plain: {
      en: `<p>Changing a production system is like doing surgery: plan it, get approval, have a way to undo it, do it at a quiet time, then check the patient. <b>Change management</b> ensures every change is requested, assessed, approved (often by a <b>CAB</b>, change advisory board), tested, documented and reversible. <b>Patch management</b> is a special, frequent kind of change. Unapproved changes are a top cause of outages.</p>`,
      ru: `<p>Изменение рабочей системы — как операция: спланировать, получить одобрение, иметь способ откатить, делать в спокойное время, потом проверить пациента. <b>Управление изменениями</b> обеспечивает, что каждое изменение запрошено, оценено, одобрено (часто <b>CAB</b> — консультативным советом по изменениям), протестировано, задокументировано и обратимо. <b>Управление патчами</b> — особый, частый вид изменений. Неодобренные изменения — одна из главных причин сбоев.</p>`,
    },
    ex: {
      en: `<p>In July 2024 a faulty CrowdStrike content update crashed about 8.5 million Windows computers worldwide, grounding flights and disrupting hospitals. The update went to all customers at once. Staged rollouts (a few machines first, then a wider ring) and the ability for customers to control update timing are exactly the change-management practices that limit such blast radius.</p>`,
      ru: `<p>В июле 2024 года ошибочное обновление контента CrowdStrike уронило около 8,5 млн компьютеров Windows по всему миру: отменялись рейсы, страдали больницы. Обновление ушло всем клиентам одновременно. Поэтапное развёртывание (сначала несколько машин, затем шире) и возможность клиентам управлять временем обновлений — именно те практики управления изменениями, которые ограничивают радиус поражения.</p>`,
    },
    dg: {
      title: { en: 'Change management process', ru: 'Процесс управления изменениями' }, h: 230,
      nodes: [
        ['req', 125, 60, { en: 'Request', ru: 'Запрос' }, { en: 'what and why', ru: 'что и зачем' }, '📝'],
        ['imp', 380, 60, { en: 'Impact analysis', ru: 'Анализ влияния' }, { en: 'risk, rollback plan', ru: 'риск, план отката' }, '🔍'],
        ['cab', 650, 60, { en: 'CAB approval', ru: 'Одобрение CAB' }, null, '✅', 'key'],
        ['do', 650, 170, { en: 'Test, then implement', ru: 'Тест, затем внедрение' }, { en: 'change window', ru: 'окно изменений' }, '🛠'],
        ['ver', 380, 170, { en: 'Verify', ru: 'Проверка' }, { en: 'works? if not, roll back', ru: 'работает? нет — откат' }, '🔁'],
        ['doc', 125, 170, { en: 'Document and close', ru: 'Документировать, закрыть' }, { en: 'update CMDB', ru: 'обновить CMDB' }, '📚', 'ok'],
      ],
      edges: [['req', 'imp'], ['imp', 'cab'], ['cab', 'do'], ['do', 'ver'], ['ver', 'doc', null, 'ok']],
      note: { en: 'Emergency changes may skip the meeting but never the record: they are approved by a designated person and reviewed by the CAB afterwards.', ru: 'Экстренные изменения могут обойтись без заседания, но не без записи: их одобряет назначенное лицо, а CAB рассматривает постфактум.' },
    },
  },
  'd7-c7': {
    plain: {
      en: `<p>Backups are your undo button for disasters and ransomware. A <b>full</b> backup copies everything. An <b>incremental</b> copies only what changed since the last backup of any kind: fast each night, but a restore needs the full plus every incremental since. A <b>differential</b> copies everything changed since the last full: grows each day, but a restore needs only the full plus the latest differential. Follow the <b>3-2-1 rule</b>: 3 copies, on 2 different media, 1 off-site (ideally offline or immutable).</p>`,
      ru: `<p>Резервные копии — кнопка «отменить» для аварий и шифровальщиков. <b>Полная</b> копия копирует всё. <b>Инкрементная</b> — только изменения с последней копии любого типа: быстро каждую ночь, но для восстановления нужны полная и все инкрементные после неё. <b>Дифференциальная</b> — всё изменённое с последней полной: растёт каждый день, но для восстановления нужны только полная и последняя дифференциальная. Правило <b>3-2-1</b>: 3 копии, на 2 разных носителях, 1 вне площадки (лучше офлайн или неизменяемая).</p>`,
    },
    ex: {
      en: `<p>A law firm hit by ransomware finds the attackers also encrypted the backup server, which was joined to the same domain. Its only clean copy is a weekly tape stored off-site, so it loses five days of work. After rebuilding, it adds immutable cloud backups that can't be deleted for 30 days, even by an administrator, and tests a restore every quarter.</p>`,
      ru: `<p>Юридическая фирма, атакованная шифровальщиком, обнаруживает, что зашифрован и сервер резервного копирования, состоявший в том же домене. Единственная чистая копия — еженедельная лента вне офиса, и фирма теряет пять дней работы. После восстановления она добавляет неизменяемые облачные копии, которые нельзя удалить 30 дней даже администратору, и раз в квартал тестирует восстановление.</p>`,
    },
    dg: {
      title: { en: 'Restoring Wednesday: which backups do you need?', ru: 'Восстановление на среду: какие копии нужны?' }, h: 200,
      nodes: [
        ['hi', 90, 50, { en: 'Incremental', ru: 'Инкрементная' }, null, null, 'key', 150],
        ['i0', 250, 50, { en: 'Sun: full', ru: 'Вс: полная' }, null, null, 'ok', 120], ['i1', 390, 50, { en: 'Mon: Δ Mon', ru: 'Пн: Δ пн' }, null, null, 'ok', 120],
        ['i2', 530, 50, { en: 'Tue: Δ Tue', ru: 'Вт: Δ вт' }, null, null, 'ok', 120], ['i3', 670, 50, { en: 'Wed: Δ Wed', ru: 'Ср: Δ ср' }, null, null, 'ok', 120],
        ['hd', 90, 140, { en: 'Differential', ru: 'Дифференц.' }, null, null, 'key', 150],
        ['d0', 250, 140, { en: 'Sun: full', ru: 'Вс: полная' }, null, null, 'ok', 120], ['d1', 390, 140, { en: 'Mon: Δ Sun', ru: 'Пн: Δ с вс' }, null, null, 'dim', 120],
        ['d2', 530, 140, { en: 'Tue: Δ Sun', ru: 'Вт: Δ с вс' }, null, null, 'dim', 120], ['d3', 670, 140, { en: 'Wed: Δ Sun', ru: 'Ср: Δ с вс' }, null, null, 'ok', 120],
      ],
      edges: [['i0', 'i1', null, 'ok'], ['i1', 'i2', null, 'ok'], ['i2', 'i3', null, 'ok']],
      note: { en: 'Green = needed for the restore. Incremental: 4 sets (fast backups, slow restore). Differential: 2 sets (slower backups, fast restore). Δ = changes.', ru: 'Зелёным — нужно для восстановления. Инкрементная: 4 набора (быстрое копирование, медленное восстановление). Дифференциальная: 2 набора (копирование медленнее, восстановление быстрее). Δ — изменения.' },
    },
  },
  'd7-c8': {
    plain: {
      en: `<p>If your main site burns down, where do you go? A <b>hot site</b> is a fully furnished, running copy: move in within minutes or hours, very expensive. A <b>warm site</b> has hardware and network but needs data loaded and setup: days. A <b>cold site</b> is an empty room with power and cooling: weeks. <b>Cloud DR</b> lets you keep a small copy running and scale it up on demand. Pick based on the RTO from the BIA, not on what sounds best.</p>`,
      ru: `<p>Если основная площадка сгорит, куда переезжать? <b>Горячий резерв</b> — полностью обставленная работающая копия: переезд за минуты или часы, очень дорого. <b>Тёплый</b> — есть железо и сеть, но нужно загрузить данные и настроить: дни. <b>Холодный</b> — пустое помещение с питанием и охлаждением: недели. <b>Облачное DR</b> позволяет держать маленькую работающую копию и масштабировать её по требованию. Выбирайте по RTO из BIA, а не по тому, что звучит лучше.</p>`,
    },
    ex: {
      en: `<p>A stock exchange runs active-active data centers in two cities: if one fails, trading continues (hot site, RTO near zero). A regional insurer keeps a warm site with a contracted provider and rehearses a 48-hour switchover once a year. A small design studio relies on cloud backups and a plan to rent laptops: effectively a cold site, which matches its one-week RTO.</p>`,
      ru: `<p>Биржа держит два активных дата-центра в разных городах: если один откажет, торги продолжатся (горячий резерв, RTO почти ноль). Региональный страховщик держит тёплую площадку у подрядчика и раз в год репетирует переключение за 48 часов. Небольшая дизайн-студия полагается на облачные бэкапы и план аренды ноутбуков: фактически холодный резерв, что соответствует её RTO в одну неделю.</p>`,
    },
    dg: {
      title: { en: 'Recovery site options', ru: 'Варианты резервных площадок' }, h: 260,
      nodes: [
        ['main', 110, 130, { en: 'Primary site', ru: 'Основная площадка' }, { en: 'disaster', ru: 'авария' }, '🏢', 'bad'],
        ['hot', 560, 45, { en: 'Hot site', ru: 'Горячий резерв' }, { en: 'minutes–hours · $$$$', ru: 'минуты–часы · $$$$' }, '🔥', 'ok', 230],
        ['warm', 560, 130, { en: 'Warm site', ru: 'Тёплый резерв' }, { en: 'hours–days · $$', ru: 'часы–дни · $$' }, '🌤', 'key', 230],
        ['cold', 560, 215, { en: 'Cold site', ru: 'Холодный резерв' }, { en: 'weeks · $', ru: 'недели · $' }, '❄️', 'dim', 230],
      ],
      edges: [['main', 'hot', { en: 'live replication', ru: 'репликация онлайн' }, 'ok'], ['main', 'warm', { en: 'restore backups', ru: 'восстановить бэкапы' }], ['main', 'cold', { en: 'ship hardware', ru: 'привезти железо' }, 'dash']],
      note: { en: 'Also on the exam: mobile sites (trailers), reciprocal agreements with another company (hard to enforce), and redundant (mirrored) sites.', ru: 'Также на экзамене: мобильные площадки (трейлеры), взаимные соглашения с другой компанией (трудно обеспечить) и зеркальные площадки.' },
    },
  },
  'd7-c9': {
    plain: {
      en: `<p>RAID combines several disks so one can fail without losing data. <b>RAID 0</b> splits data across disks for speed but has no protection. <b>RAID 1</b> mirrors: two identical copies. <b>RAID 5</b> spreads data plus a checksum (<b>parity</b>) across 3 or more disks, so any one disk can be rebuilt from the others. <b>RAID 10</b> is mirrors striped together: fast and robust. RAID protects against a dead disk, not against deletion or ransomware; it is not a backup.</p>`,
      ru: `<p>RAID объединяет несколько дисков, чтобы один мог отказать без потери данных. <b>RAID 0</b> разбивает данные по дискам ради скорости, но защиты не даёт. <b>RAID 1</b> — зеркало: две одинаковые копии. <b>RAID 5</b> распределяет данные и контрольную сумму (<b>чётность</b>) по 3 и более дискам, и любой один диск восстанавливается по остальным. <b>RAID 10</b> — зеркала, объединённые в чередование: быстро и надёжно. RAID защищает от умершего диска, но не от удаления или шифровальщика; это не резервная копия.</p>`,
    },
    ex: {
      en: `<p>A file server with RAID 5 loses one disk on Friday; it keeps running and the replacement rebuilds over the weekend. The next month a user's ransomware infection encrypts the shares, and RAID faithfully stores the encrypted files on every disk. Only last night's backup saves the data.</p>`,
      ru: `<p>Файловый сервер с RAID 5 теряет один диск в пятницу; он продолжает работать, а замена перестраивается за выходные. Через месяц шифровальщик у пользователя шифрует общие папки, и RAID добросовестно хранит зашифрованные файлы на всех дисках. Спасает данные только вчерашний бэкап.</p>`,
    },
    dg: {
      title: { en: 'RAID 1, RAID 5 and RAID 10', ru: 'RAID 1, RAID 5 и RAID 10' }, h: 230,
      zones: [[10, 30, 200, 185, { en: 'RAID 1: mirror', ru: 'RAID 1: зеркало' }], [225, 30, 255, 185, { en: 'RAID 5: striping + parity', ru: 'RAID 5: чередование + чётность' }], [495, 30, 255, 185, { en: 'RAID 10: striped mirrors', ru: 'RAID 10: чередование зеркал' }]],
      nodes: [
        ['m1', 60, 110, 'A B C', null, null, 'ok', 80], ['m2', 160, 110, 'A B C', null, null, 'ok', 80],
        ['r1', 270, 90, 'A1 B2', null, null, 'ok', 75], ['r2', 352, 90, 'A2 Bp', null, null, 'ok', 75], ['r3', 434, 90, 'Ap B1', null, null, 'ok', 75],
        ['t1', 545, 90, 'A1', null, null, 'ok', 75], ['t2', 545, 170, 'A1', null, null, 'ok', 75], ['t3', 700, 90, 'A2', null, null, 'ok', 75], ['t4', 700, 170, 'A2', null, null, 'ok', 75],
        ['r5n', 352, 175, { en: '1 disk may fail', ru: 'может отказать 1 диск' }, null, null, 'dim', 200],
      ],
      edges: [['m1', 'm2', null, 'both'], ['t1', 't2', null, 'both'], ['t3', 't4', null, 'both'], ['t1', 't3', { en: 'stripe', ru: 'чередование' }, 'dash']],
      note: { en: 'p = parity block. RAID 1 and 10 survive one failure per mirror pair; RAID 5 survives exactly one disk; RAID 6 (double parity) survives two.', ru: 'p — блок чётности. RAID 1 и 10 переживают отказ одного диска в каждой зеркальной паре; RAID 5 — ровно одного диска; RAID 6 (двойная чётность) — двух.' },
    },
  },
  'd7-c10': {
    plain: {
      en: `<p>A disaster recovery plan is useless until you've tested it, just as a fire evacuation plan is useless if nobody knows where the exits are. Tests go from cheap to realistic: <b>read-through</b> (everyone reads the plan), <b>walkthrough / tabletop</b> (talk through a scenario in a meeting), <b>simulation</b> (act it out without touching production), <b>parallel</b> (bring up the backup site alongside production), and <b>full interruption</b> (actually switch off production, risky and rare).</p>`,
      ru: `<p>План аварийного восстановления бесполезен, пока его не проверили, — как план эвакуации, если никто не знает, где выходы. Тесты идут от дешёвых к реалистичным: <b>чтение</b> (все читают план), <b>прогон / настольные учения</b> (обсуждение сценария на встрече), <b>симуляция</b> (разыгрывание без касания боевой системы), <b>параллельный</b> (резервная площадка поднимается рядом с основной) и <b>полное прерывание</b> (основная действительно отключается, рискованно и редко).</p>`,
    },
    ex: {
      en: `<p>A retailer's tabletop exercise asks: "Our payment provider is down on Black Friday. What now?" Within 20 minutes they discover nobody has the backup provider's emergency contact and the switchover requires a developer who is on holiday. Fixing those two gaps cost almost nothing; finding them during the real outage would have cost millions.</p>`,
      ru: `<p>На настольных учениях ритейлера звучит вопрос: «В Чёрную пятницу упал платёжный провайдер. Что делаем?» За 20 минут выясняется, что ни у кого нет экстренного контакта резервного провайдера, а для переключения нужен разработчик, который в отпуске. Устранить эти два пробела почти ничего не стоило; найти их во время реального сбоя стоило бы миллионы.</p>`,
    },
  },
  'd7-c11': {
    plain: {
      en: `<p>Physical security operations protect buildings and, above all, people. Guards, cameras, badges and visitor escorts keep intruders out. Fire drills, emergency exits that always open from inside, and plans for travelling staff keep people safe. When safety and security conflict, <b>human life always comes first</b>: a door may lock against intruders from outside, but it must never trap people inside during a fire.</p>`,
      ru: `<p>Физическая безопасность в эксплуатации защищает здания и, прежде всего, людей. Охрана, камеры, бейджи и сопровождение посетителей не пускают нарушителей. Пожарные учения, аварийные выходы, которые всегда открываются изнутри, и планы для сотрудников в командировках сохраняют людей. Когда безопасность людей и защита активов конфликтуют, <b>жизнь человека всегда на первом месте</b>: дверь может запираться от нарушителей снаружи, но никогда не должна запирать людей внутри при пожаре.</p>`,
    },
    ex: {
      en: `<p>A data center's server-room doors are set to <b>fail-secure</b> (stay locked) on power loss, to protect the equipment, but have a mechanical push bar on the inside so nobody can be trapped. Office doors on the evacuation route are <b>fail-safe</b> (unlock on power loss or fire alarm). Staff travelling to high-risk countries get loaner laptops with no sensitive data.</p>`,
      ru: `<p>Двери серверной дата-центра настроены как <b>fail-secure</b> (остаются запертыми) при пропадании питания, чтобы защитить оборудование, но изнутри у них механическая штанга-ручка, чтобы никто не оказался в ловушке. Офисные двери на пути эвакуации — <b>fail-safe</b> (открываются при пропадании питания или пожарной тревоге). Сотрудникам, едущим в страны с высоким риском, выдают подменные ноутбуки без чувствительных данных.</p>`,
    },
  },
});
