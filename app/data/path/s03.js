'use strict';
// Learning path, stage 3: data, what we protect. Inventory and classification, data roles, data states,
// the data lifecycle, baselines and protection techniques, retention, and getting rid of data safely.
CISSP.stage(3, { cards: [
  { id: 's03-001', kind: 'story', k: ['d2-c1', 'd1-c13'], lvl: 1,
    title: { en: `Marriott: the database nobody knew well`, ru: `Marriott: база, которую никто толком не знал` },
    body: {
      en: `<p>In 2016, Marriott bought the hotel group Starwood and kept running Starwood's guest reservation system. In September 2018 a security tool flagged a suspicious query in it. The investigation found attackers had been inside since <b>2014</b>, two years before the deal.</p><p>The UK regulator counted about <b>339 million guest records</b> exposed, some with passport numbers stored unencrypted. In 2020 it fined Marriott £18.4 million: Marriott had taken over a large store of personal data without checking what was in it and how it was protected.</p>`,
      ru: `<p>В 2016 году Marriott купил гостиничную группу Starwood и продолжил пользоваться её системой бронирования. В сентябре 2018 года средство защиты заметило в ней подозрительный запрос. Расследование показало, что злоумышленники находились внутри с <b>2014 года</b>, за два года до сделки.</p><p>Британский регулятор насчитал около <b>339 млн записей о гостях</b>, часть — с номерами паспортов без шифрования. В 2020 году он оштрафовал Marriott на 18,4 млн фунтов: компания получила огромный массив персональных данных, не проверив, что в нём и как он защищён.</p>`,
    },
    take: { en: `You inherit the risk of every dataset you take over, whether or not you look inside.`, ru: `Вместе с чужими данными вы получаете их риск, даже если не заглядывали внутрь.` } },

  { id: 's03-002', kind: 'idea', k: ['d2-c1', 'd1-c9'], lvl: 1,
    title: { en: `You can't protect what you don't know you have`, ru: `Нельзя защитить то, о чём не знаешь` },
    body: {
      en: `<p>Data protection starts with three plain steps:</p><ol><li><b>Inventory</b>: list what data exists and where it lives: databases, file shares, cloud services, laptops, backups.</li><li><b>Owner</b>: name a business person responsible for each dataset.</li><li><b>Classify</b>: the owner decides how sensitive and valuable it is.</li></ol><p>Everything else, from encryption to deletion, depends on these. In stage 1 you priced risk from the asset's value; classification is how you record that value for data.</p>`,
      ru: `<p>Защита данных начинается с трёх простых шагов:</p><ol><li><b>Инвентаризация</b>: какие данные есть и где они лежат — базы, файловые ресурсы, облачные сервисы, ноутбуки, резервные копии.</li><li><b>Владелец</b>: для каждого набора данных назначается ответственный человек из бизнеса.</li><li><b>Классификация</b>: владелец решает, насколько данные чувствительны и ценны.</li></ol><p>От этого зависит всё остальное, от шифрования до удаления. На этапе 1 вы оценивали риск по ценности актива; классификация — способ зафиксировать эту ценность для данных.</p>`,
    },
    take: { en: `Inventory, owner, classification: in that order, before any control.`, ru: `Инвентаризация, владелец, классификация — именно в таком порядке и до любых мер.` } },

  { id: 's03-003', kind: 'idea', k: ['d2-c1'], lvl: 1,
    title: { en: `Classification: sorting data by the damage it can do`, ru: `Классификация: сортировка данных по возможному ущербу` },
    body: {
      en: `<p>Not all data deserves the same protection. Encrypting the canteen menu wastes money; leaving payroll on a public share is a disaster.</p><p><b>Classification</b> puts data into a few levels by asking: how much harm if it is disclosed, changed or lost? Laws matter too: health or card data may be required to sit at a high level.</p><p>Each level then comes with its own rules: who may see it, whether it must be encrypted, where it may be stored, how long it is kept and how it is destroyed.</p>`,
      ru: `<p>Не все данные заслуживают одинаковой защиты. Шифровать меню столовой — пустая трата денег, а зарплатная ведомость в общей папке — катастрофа.</p><p><b>Классификация</b> делит данные на несколько уровней по вопросу: какой будет вред, если их раскроют, изменят или потеряют? Важны и законы: медицинские или карточные данные могут требовать высокого уровня.</p><p>Для каждого уровня затем действуют свои правила: кто может видеть, нужно ли шифрование, где можно хранить, сколько держать и как уничтожать.</p>`,
    },
    take: { en: `The level decides the controls, so you protect data in proportion to its value.`, ru: `Уровень определяет меры, и защита становится соразмерной ценности данных.` } },

  { id: 's03-004', kind: 'vs', k: ['d2-c1'], lvl: 1,
    title: { en: `Government labels vs company labels`, ru: `Государственные грифы и корпоративные метки` },
    body: {
      en: `<p>Two common schemes, highest level first:</p><ul><li><b>Government / military</b>: Top Secret (exceptionally grave damage to national security), Secret (serious damage), Confidential (damage), Unclassified.</li><li><b>Company</b> (names vary): Confidential or Proprietary (trade secrets), Private (personal data of staff and customers), Sensitive (internal), Public.</li></ul><p>Government levels are defined by harm to the nation; company levels by harm to the business and the people in its data. Most companies need only three or four levels: more levels means more confusion.</p>`,
      ru: `<p>Две распространённые схемы, от высшего уровня:</p><ul><li><b>Государственная / военная</b>: Top Secret (исключительно тяжёлый ущерб национальной безопасности), Secret (серьёзный ущерб), Confidential (ущерб), Unclassified (без грифа).</li><li><b>Корпоративная</b> (названия бывают разными): Confidential или Proprietary (коммерческая тайна), Private (персональные данные сотрудников и клиентов), Sensitive (внутреннее), Public (публичное).</li></ul><p>Государственные уровни определяются ущербом стране, корпоративные — ущербом бизнесу и людям в его данных. Большинству компаний хватает трёх-четырёх уровней: чем их больше, тем больше путаницы.</p>`,
    },
    take: { en: `Government: harm to the nation. Company: harm to the business and to people.`, ru: `Государство — ущерб стране. Компания — ущерб бизнесу и людям.` } },

  { id: 's03-005', kind: 'think', k: ['d2-c1', 'd2-c2'], lvl: 1,
    title: { en: `"Just tell me what label to put on it"`, ru: `«Просто скажите, какую метку ставить»` },
    body: {
      en: `<p>A database administrator is setting up a new customer database with names, addresses and order history. The classification field is required, and he asks you, the security analyst, to pick the level so he can finish today.</p><p>Who should decide, and what do you do?</p>`,
      ru: `<p>Администратор баз данных настраивает новую клиентскую базу: имена, адреса, история заказов. Поле «классификация» обязательное, и он просит вас, аналитика ИБ, выбрать уровень, чтобы закончить сегодня.</p><p>Кто должен решать и что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>The data owner decides</b>: the business manager accountable for customer data, for example the head of sales. Security advises (this looks like personal data, so probably "Private" or higher), and IT applies the result.</p><p>The tempting answer is to pick a level yourself to unblock the work. But whoever sets the label also sets the cost and the rules for everyone who uses the data, and that is a business decision. Offer a quick call with the owner instead.</p>`,
      ru: `<p><b>Решает владелец данных</b> — руководитель из бизнеса, отвечающий за клиентские данные, например глава продаж. ИБ советует (похоже на персональные данные, значит, вероятно, «Private» или выше), а IT применяет решение.</p><p>Соблазнительно выбрать уровень самому, чтобы не тормозить работу. Но тот, кто ставит метку, задаёт стоимость и правила для всех, кто работает с данными, а это решение бизнеса. Предложите вместо этого быстро созвониться с владельцем.</p>`,
    },
    take: { en: `The owner classifies; security advises; IT implements.`, ru: `Владелец классифицирует, ИБ советует, IT внедряет.` } },

  { id: 's03-006', kind: 'idea', k: ['d2-c2'], lvl: 1,
    title: { en: `Data roles: who decides, who does, who uses`, ru: `Роли в работе с данными: кто решает, кто делает, кто пользуется` },
    body: {
      en: `<ul><li><b>Data owner</b>: a senior business person accountable for the data. Sets its classification, approves who gets access, and accepts its risks.</li><li><b>Data custodian</b>: usually IT. Does the hands-on work the owner asks for: backups, encryption, permissions, patching.</li><li><b>Data steward</b>: looks after quality and meaning: definitions, accuracy, correct use.</li><li><b>User</b>: anyone who works with the data, following the rules for its level.</li></ul><p>On the exam, when a question asks who is <i>responsible</i> for protecting data, look for the owner.</p>`,
      ru: `<ul><li><b>Владелец данных</b> (data owner) — руководитель из бизнеса, подотчётный за данные. Задаёт классификацию, утверждает доступ и принимает риски.</li><li><b>Хранитель</b> (data custodian) — обычно IT. Выполняет практическую работу по заданию владельца: резервные копии, шифрование, права, обновления.</li><li><b>Распорядитель</b> (data steward) — отвечает за качество и смысл: определения, точность, правильное использование.</li><li><b>Пользователь</b> — любой, кто работает с данными по правилам их уровня.</li></ul><p>На экзамене, если спрашивают, кто <i>отвечает</i> за защиту данных, ищите владельца.</p>`,
    },
    take: { en: `The owner is accountable; the custodian carries out the owner's decisions.`, ru: `Владелец подотчётен, хранитель выполняет его решения.` } },

  { id: 's03-007', kind: 'picture', k: ['d2-c2'], lvl: 1,
    title: { en: `Four roles around one dataset`, ru: `Четыре роли вокруг одного набора данных` },
    body: {
      en: `<p>Decisions flow from the owner; the custodian turns them into settings. The steward keeps the data correct, and users work within the rules.</p>`,
      ru: `<p>Решения исходят от владельца, хранитель превращает их в настройки. Распорядитель следит за правильностью данных, пользователи работают по правилам.</p>`,
    },
    dg: { title: { en: `Customer data and its people`, ru: `Клиентские данные и их люди` }, h: 270,
      nodes: [
        ['o', 130, 60, { en: 'Data owner', ru: 'Владелец' }, { en: 'classifies, approves access', ru: 'классифицирует, даёт доступ' }, '👔', 'key'],
        ['c', 630, 60, { en: 'Custodian (IT)', ru: 'Хранитель (IT)' }, { en: 'backups, encryption, rights', ru: 'копии, шифрование, права' }, '🛠', 'ok'],
        ['d', 380, 150, { en: 'Customer data', ru: 'Клиентские данные' }, null, '🗄', 'dim'],
        ['s', 130, 230, { en: 'Data steward', ru: 'Распорядитель' }, { en: 'quality, definitions', ru: 'качество, определения' }, '📏', 'ok'],
        ['u', 630, 230, { en: 'Users', ru: 'Пользователи' }, { en: 'follow the rules', ru: 'соблюдают правила' }, '👥', 'ok'],
      ],
      edges: [
        ['o', 'c', { en: 'instructs', ru: 'поручает' }, 'key'],
        ['c', 'd', { en: 'protects', ru: 'защищает' }, 'ok'],
        ['s', 'd', { en: 'keeps accurate', ru: 'следит за точностью' }],
        ['u', 'd', { en: 'uses', ru: 'пользуются' }],
      ] },
    take: { en: `Owner decides, custodian does, steward corrects, user follows.`, ru: `Владелец решает, хранитель делает, распорядитель уточняет, пользователь соблюдает.` } },

  { id: 's03-008', kind: 'back', back: 's01-033', k: ['d2-c2', 'd1-c2'], lvl: 1,
    title: { en: `The data owner is "management decides", for one dataset`, ru: `Владелец данных — это «решает руководство» для одного набора данных` },
    body: {
      en: `<p>In stage 1 you saw that senior management owns security decisions, because they own the business and its risks. The data owner is that same idea, applied to one dataset: the head of HR for staff records, the CFO for the general ledger.</p><p>The owner can hand the <i>work</i> to the custodian. The owner cannot hand off the <i>accountability</i>: if customer data leaks because nobody approved its controls, the owner answers for it. That is due care in practice.</p>`,
      ru: `<p>На этапе 1 вы видели, что решения по безопасности принимает высшее руководство, потому что ему принадлежат бизнес и его риски. Владелец данных — та же идея для одного набора данных: директор по персоналу для кадровых записей, финансовый директор для главной книги.</p><p>Владелец может передать хранителю <i>работу</i>, но не <i>подотчётность</i>: если клиентские данные утекли, потому что никто не утвердил меры защиты, отвечает владелец. Это и есть due care на практике.</p>`,
    },
    take: { en: `Work can be delegated; accountability stays with the owner.`, ru: `Работу можно поручить, подотчётность остаётся у владельца.` } },

  { id: 's03-009', kind: 'vs', k: ['d2-c2', 'd1-c4'], lvl: 2,
    title: { en: `Controller vs processor vs data subject`, ru: `Контролёр, обработчик и субъект данных` },
    body: {
      en: `<p>Privacy law (the EU's GDPR and many laws modelled on it) uses its own roles for personal data:</p><ul><li><b>Data subject</b>: the person the data is about, such as a customer or employee.</li><li><b>Controller</b>: the organization that decides <i>why</i> and <i>how</i> the data is processed. It carries the main legal duty.</li><li><b>Processor</b>: processes the data on the controller's behalf, under contract, for example a payroll provider or a cloud email service.</li></ul><p>A shop using a cloud CRM is the controller; the CRM vendor is a processor. Outsourcing the processing doesn't move the responsibility.</p>`,
      ru: `<p>Законы о персональных данных (GDPR в ЕС и многие похожие) используют свои роли:</p><ul><li><b>Субъект данных</b> — человек, о котором данные: клиент, сотрудник.</li><li><b>Контролёр</b> (оператор) — организация, которая решает, <i>зачем</i> и <i>как</i> обрабатывать данные. На ней основная юридическая обязанность.</li><li><b>Обработчик</b> (processor) — обрабатывает данные по поручению контролёра и по договору, например расчётчик зарплаты или облачная почта.</li></ul><p>Магазин, работающий в облачной CRM, — контролёр, поставщик CRM — обработчик. Передача обработки на сторону не переносит ответственность.</p>`,
    },
    take: { en: `The controller decides the purpose; the processor acts on its instructions.`, ru: `Контролёр определяет цель, обработчик действует по его указаниям.` } },

  { id: 's03-010', kind: 'idea', k: ['d2-c1', 'd1-c3'], lvl: 1,
    title: { en: `A label nobody can see is no label`, ru: `Метка, которую никто не видит, — не метка` },
    body: {
      en: `<p>Classification only works if people and systems can tell the level at a glance.</p><ul><li><b>Marking and labeling</b>: a footer on documents, a stamp on paper, a tag in file metadata or in the email subject. Machines like DLP tools read the metadata tags.</li><li><b>Label public data too</b>. An unmarked document makes people guess, and the guess is often wrong.</li><li><b>Handling rules</b>: the classification policy (a stage 1 policy, in the hierarchy) says what each level means: print or not, email outside or not, encrypt on USB or not.</li></ul>`,
      ru: `<p>Классификация работает, только если люди и системы с первого взгляда видят уровень.</p><ul><li><b>Маркировка</b>: колонтитул в документе, штамп на бумаге, тег в метаданных файла или в теме письма. Машины, например DLP, читают теги в метаданных.</li><li><b>Помечайте и публичные данные</b>. Документ без метки заставляет гадать, а догадка часто ошибочна.</li><li><b>Правила обращения</b>: политика классификации (уровень политики из иерархии этапа 1) говорит, что означает каждый уровень: можно ли печатать, отправлять наружу, нужно ли шифровать на USB.</li></ul>`,
    },
    take: { en: `Mark every level, including public, and write down what each level allows.`, ru: `Помечайте каждый уровень, включая публичный, и запишите, что каждый разрешает.` } },

  { id: 's03-011', kind: 'think', k: ['d2-c1'], lvl: 2,
    title: { en: `Two harmless lists`, ru: `Два безобидных списка` },
    body: {
      en: `<p>Marketing wants to merge two datasets, both labeled Internal: a list of customer names and emails, and purchase history by customer ID. The purchases include medicines from the company's online pharmacy.</p><p>The merged file is "just two internal lists". What level should it get?</p>`,
      ru: `<p>Маркетинг хочет объединить два набора данных с меткой «Внутреннее»: список имён и адресов клиентов и историю покупок по ID клиента. Среди покупок есть лекарства из интернет-аптеки компании.</p><p>Объединённый файл — «просто два внутренних списка». Какой уровень ему дать?</p>`,
    },
    reveal: {
      en: `<p><b>Higher than either list: it now reveals who buys which medicines.</b> That is health-related personal data, so it probably needs the top level and the owner's approval before the merge is done at all.</p><p>Combining low-sensitivity pieces into something sensitive is called <b>aggregation</b>. The rule: classify the result by what it reveals, never lower than the most sensitive part. Ask the owner whether the merge is needed at all.</p>`,
      ru: `<p><b>Выше, чем у каждого из списков: теперь видно, кто какие лекарства покупает.</b> Это персональные данные, связанные со здоровьем, так что, скорее всего, нужен высший уровень, а само объединение — с согласия владельца.</p><p>Сборка чувствительного целого из малочувствительных частей называется <b>агрегацией</b>. Правило: классифицируйте результат по тому, что он раскрывает, и никогда не ниже самой чувствительной части. Спросите владельца, нужно ли объединение вообще.</p>`,
    },
    take: { en: `Combined data can be more sensitive than any of its parts.`, ru: `Объединённые данные бывают чувствительнее любой из своих частей.` } },

  { id: 's03-012', kind: 'idea', k: ['d2-c3'], lvl: 1,
    title: { en: `Data has three states`, ru: `У данных три состояния` },
    body: {
      en: `<p>The same customer record spends its life in three states, and each needs its own protection:</p><ul><li><b>At rest</b>: stored on a disk, in a database, on a backup tape, on a lost laptop.</li><li><b>In transit</b>: moving across a network: an email, an API call, a file upload, Wi-Fi in a café.</li><li><b>In use</b>: being processed, so it sits decrypted in memory and on someone's screen.</li></ul><p>Encryption covers the first two well. Data in use is the hardest: to work with data, the program has to see it in the clear.</p>`,
      ru: `<p>Одна и та же запись о клиенте проводит жизнь в трёх состояниях, и каждому нужна своя защита:</p><ul><li><b>В покое</b> (at rest): хранится на диске, в базе, на ленте с копией, на потерянном ноутбуке.</li><li><b>В движении</b> (in transit): передаётся по сети — письмо, вызов API, загрузка файла, Wi-Fi в кафе.</li><li><b>В использовании</b> (in use): обрабатывается, то есть лежит расшифрованной в памяти и на чьём-то экране.</li></ul><p>Первые два хорошо закрывает шифрование. Сложнее всего с данными в использовании: чтобы работать с данными, программа должна видеть их в открытом виде.</p>`,
    },
    take: { en: `At rest, in transit, in use: data in use is the hardest to protect.`, ru: `В покое, в движении, в использовании: труднее всего защитить данные в использовании.` } },

  { id: 's03-013', kind: 'picture', k: ['d2-c3', 'd1-c1'], lvl: 1,
    title: { en: `One file, three states, three kinds of protection`, ru: `Один файл, три состояния, три вида защиты` },
    body: {
      en: `<p>Follow a payroll file from the server to a manager's screen. The control changes as the state changes.</p>`,
      ru: `<p>Проследите путь зарплатного файла от сервера до экрана руководителя. С каждым состоянием меняется мера защиты.</p>`,
    },
    dg: { title: { en: `At rest → in transit → in use`, ru: `В покое → в движении → в использовании` }, h: 260,
      nodes: [
        ['r', 115, 70, { en: 'At rest', ru: 'В покое' }, { en: 'disk, database, backup', ru: 'диск, база, копия' }, '💾', 'dim'],
        ['t', 380, 70, { en: 'In transit', ru: 'В движении' }, { en: 'network, email, API', ru: 'сеть, почта, API' }, '📡', 'dim'],
        ['u', 645, 70, { en: 'In use', ru: 'В использовании' }, { en: 'memory, screen', ru: 'память, экран' }, '🖥', 'dim'],
        ['rc', 115, 200, { en: 'Disk encryption', ru: 'Шифрование диска' }, { en: 'plus access control', ru: 'плюс контроль доступа' }, '🔒', 'ok'],
        ['tc', 380, 200, { en: 'TLS, VPN', ru: 'TLS, VPN' }, { en: 'encrypted channel', ru: 'шифрованный канал' }, '🔒', 'ok'],
        ['uc', 645, 200, { en: 'Least privilege', ru: 'Минимум прав' }, { en: 'screen lock, enclaves', ru: 'блокировка, анклавы' }, '🔒', 'ok'],
      ],
      edges: [
        ['r', 't', { en: 'sent', ru: 'отправлен' }], ['t', 'u', { en: 'opened', ru: 'открыт' }],
        ['rc', 'r', { en: 'protects', ru: 'защищает' }, 'ok'],
        ['tc', 't', { en: 'protects', ru: 'защищает' }, 'ok'],
        ['uc', 'u', { en: 'protects', ru: 'защищает' }, 'ok'],
      ] },
    take: { en: `Ask "which state?" before choosing the control.`, ru: `Прежде чем выбрать меру, спросите: «В каком состоянии данные?»` } },

  { id: 's03-014', kind: 'back', back: 's01-007', k: ['d1-c1', 'd2-c3'], lvl: 2,
    title: { en: `The patient record again, now in three states`, ru: `Снова карта пациента, теперь в трёх состояниях` },
    body: {
      en: `<p>In stage 1, one patient record could fail in three ways: read by the wrong person, changed, or unavailable. Now cross that with the three states:</p><ul><li><b>At rest</b>: a stolen backup disk is a confidentiality failure; a corrupted database is an integrity one.</li><li><b>In transit</b>: an unencrypted lab result can be read or altered on the way.</li><li><b>In use</b>: a screen left open in a ward shows the record to visitors; a crashed app makes it unavailable during surgery.</li></ul><p>Each cell of that grid is a place to put a control.</p>`,
      ru: `<p>На этапе 1 карта пациента могла пострадать тремя способами: её прочтёт посторонний, её изменят или она будет недоступна. Теперь совместите это с тремя состояниями:</p><ul><li><b>В покое</b>: украденный диск с копией — нарушение конфиденциальности, повреждённая база — целостности.</li><li><b>В движении</b>: незашифрованный результат анализа можно прочитать или изменить по пути.</li><li><b>В использовании</b>: открытый в палате экран показывает карту посетителям, упавшее приложение делает её недоступной во время операции.</li></ul><p>Каждая клетка этой сетки — место для меры защиты.</p>`,
    },
    take: { en: `CIA × three states gives you a checklist of nine places to look.`, ru: `CIA × три состояния — это список из девяти мест, куда стоит заглянуть.` } },

  { id: 's03-015', kind: 'think', k: ['d2-c3', 'd1-c11'], lvl: 2,
    title: { en: `The laptop was only asleep`, ru: `Ноутбук просто спал` },
    body: {
      en: `<p>A sales manager's laptop is stolen from her car. IT confirms it has full-disk encryption. She says she closed the lid, so it went to sleep, not shut down.</p><p>Her manager says: "It's encrypted, so there's no incident." Is he right?</p>`,
      ru: `<p>Из машины менеджера по продажам украли ноутбук. IT подтверждает: включено полное шифрование диска. Она говорит, что просто закрыла крышку, то есть ноутбук уснул, а не выключился.</p><p>Её руководитель говорит: «Он зашифрован, значит, инцидента нет». Прав ли он?</p>`,
    },
    reveal: {
      en: `<p><b>Not necessarily.</b> Disk encryption protects data <i>at rest</i>, when the machine is off. In sleep mode the key is still in memory and the session may be one lock screen away, so the data is closer to <i>in use</i>.</p><p>So report it through the incident process, have the account passwords changed, try a remote wipe, and let the incident team assess whether it's a breach. Then fix the cause: shut down or hibernate when traveling, and require a PIN before the system starts.</p>`,
      ru: `<p><b>Не обязательно.</b> Шифрование диска защищает данные <i>в покое</i>, когда машина выключена. В спящем режиме ключ остаётся в памяти, а сеанс защищён лишь экраном блокировки, так что данные ближе к состоянию <i>в использовании</i>.</p><p>Поэтому сообщите об этом через процесс реагирования на инциденты, смените пароли учётных записей, попробуйте удалённо стереть данные и дайте команде оценить, утечка ли это. Затем устраните причину: в поездках выключать или переводить в гибернацию и требовать PIN до загрузки системы.</p>`,
    },
    take: { en: `Disk encryption protects a machine that is off, not one that is asleep.`, ru: `Шифрование диска защищает выключенный компьютер, а не спящий.` } },

  { id: 's03-016', kind: 'idea', k: ['d2-c4'], lvl: 1,
    title: { en: `The data lifecycle: from birth to destruction`, ru: `Жизненный цикл данных: от рождения до уничтожения` },
    body: {
      en: `<p>Data goes through the same phases everywhere:</p><ol><li><b>Create</b>: typed in, collected, generated. Classify it here, at birth.</li><li><b>Store</b>: saved somewhere, with backups.</li><li><b>Use</b>: read, processed, changed.</li><li><b>Share</b>: sent to colleagues, partners, customers.</li><li><b>Archive</b>: kept for the long term, rarely touched.</li><li><b>Destroy</b>: removed so it can't be recovered.</li></ol><p>Security has to follow the data through all of them. Revisit the label too: a product launch plan is secret before the launch and public the day after.</p>`,
      ru: `<p>Данные везде проходят одни и те же фазы:</p><ol><li><b>Создание</b>: ввели, собрали, сгенерировали. Классифицируйте здесь, при рождении.</li><li><b>Хранение</b>: сохранили, сделали резервные копии.</li><li><b>Использование</b>: читают, обрабатывают, изменяют.</li><li><b>Передача</b>: коллегам, партнёрам, клиентам.</li><li><b>Архив</b>: долгое хранение, редкие обращения.</li><li><b>Уничтожение</b>: удаление без возможности восстановить.</li></ol><p>Защита должна сопровождать данные на всех фазах. Пересматривайте и метку: план запуска продукта секретен до запуска и публичен на следующий день.</p>`,
    },
    take: { en: `Classify at creation, and revisit the label as the data ages.`, ru: `Классифицируйте при создании и пересматривайте метку со временем.` } },

  { id: 's03-017', kind: 'picture', k: ['d2-c4', 'd2-c1'], lvl: 1,
    title: { en: `A control at every phase`, ru: `Мера на каждой фазе` },
    body: {
      en: `<p>The six phases with the typical control for each. A gap at any phase undoes the others: perfect encryption in storage doesn't help if the archive is a forgotten share.</p>`,
      ru: `<p>Шесть фаз и типичная мера для каждой. Пробел на любой фазе сводит на нет остальные: идеальное шифрование хранилища не поможет, если архив лежит в забытой общей папке.</p>`,
    },
    dg: { title: { en: `Data lifecycle`, ru: `Жизненный цикл данных` }, h: 250,
      nodes: [
        ['cr', 115, 60, { en: 'Create', ru: 'Создание' }, { en: 'classify, label', ru: 'классифицировать' }, '✏️', 'key'],
        ['st', 380, 60, { en: 'Store', ru: 'Хранение' }, { en: 'encrypt, back up', ru: 'шифровать, копировать' }, '💾', 'ok'],
        ['us', 645, 60, { en: 'Use', ru: 'Использование' }, { en: 'least privilege, logs', ru: 'минимум прав, журналы' }, '🖥', 'ok'],
        ['sh', 645, 190, { en: 'Share', ru: 'Передача' }, { en: 'TLS, DLP, DRM', ru: 'TLS, DLP, DRM' }, '📤', 'ok'],
        ['ar', 380, 190, { en: 'Archive', ru: 'Архив' }, { en: 'retention, legal hold', ru: 'сроки, legal hold' }, '🗃', 'ok'],
        ['de', 115, 190, { en: 'Destroy', ru: 'Уничтожение' }, { en: 'sanitize, certificate', ru: 'очистка, акт' }, '🗑', 'bad'],
      ],
      edges: [['cr', 'st', null], ['st', 'us', null], ['us', 'sh', null], ['sh', 'ar', null], ['ar', 'de', null]] },
    take: { en: `Protection must follow the data through all six phases.`, ru: `Защита должна сопровождать данные на всех шести фазах.` } },

  { id: 's03-018', kind: 'link', k: ['d2-c1', 'd2-c3', 'd2-c5', 'd7-c3'], lvl: 2,
    title: { en: `One label, many decisions`, ru: `Одна метка — много решений` },
    body: {
      en: `<p>Once a file is labeled "Confidential", the label answers questions all through its life:</p><ul><li><b>Who</b> may open it: only roles with a need to know.</li><li><b>Which state needs what</b>: encrypted at rest and in transit.</li><li><b>Where</b> it may go: not to personal email or USB sticks; DLP blocks it.</li><li><b>How long</b>: the retention period for that type of record.</li><li><b>How it dies</b>: sanitization strong enough for that level.</li></ul><p>That is why getting the label right at creation saves dozens of decisions later.</p>`,
      ru: `<p>Как только файлу поставили метку «Конфиденциально», она отвечает на вопросы всю его жизнь:</p><ul><li><b>Кто</b> может открыть: только роли с необходимостью знать.</li><li><b>Что нужно в каждом состоянии</b>: шифрование в покое и при передаче.</li><li><b>Куда</b> можно отправить: не на личную почту и не на флешку, DLP блокирует.</li><li><b>Сколько</b> хранить: срок для этого типа записей.</li><li><b>Как уничтожить</b>: очистка, достаточная для этого уровня.</li></ul><p>Поэтому верная метка при создании избавляет от десятков решений потом.</p>`,
    },
    take: { en: `The label is a shortcut: it carries the owner's decisions to every system that touches the data.`, ru: `Метка — короткий путь: она доносит решения владельца до каждой системы, которая касается данных.` } },

  { id: 's03-019', kind: 'back', back: 's02-008', k: ['d7-c3', 'd2-c1'], lvl: 2,
    title: { en: `Clearance is not enough: need to know again`, ru: `Допуска мало: снова «необходимость знать»` },
    body: {
      en: `<p>In stage 2 you met least privilege and need to know. Classification makes them sharper.</p><p>In government, a person cleared for Secret still can't read every Secret file. Their <b>clearance</b> says they <i>may</i> be trusted at that level; <b>need to know</b> says whether this file is part of their job. Both must be true.</p><p>Companies work the same way: an HR manager can see Confidential HR data, but not the Confidential merger plans in Finance.</p>`,
      ru: `<p>На этапе 2 вы познакомились с минимальными привилегиями и необходимостью знать. Классификация делает их точнее.</p><p>В государственных структурах человек с допуском Secret всё равно не может читать любые секретные файлы. <b>Допуск</b> говорит, что ему <i>можно</i> доверять на этом уровне; <b>необходимость знать</b> — нужен ли этот файл для его работы. Должно выполняться и то, и другое.</p><p>В компаниях так же: HR-менеджер видит конфиденциальные кадровые данные, но не конфиденциальные планы слияния в финансовом отделе.</p>`,
    },
    take: { en: `Clearance sets the ceiling; need to know picks the files under it.`, ru: `Допуск задаёт потолок, необходимость знать выбирает файлы под ним.` } },

  { id: 's03-020', kind: 'idea', k: ['d2-c6'], lvl: 2,
    title: { en: `Baselines: start from a ready-made set`, ru: `Базовые наборы: начните с готового` },
    body: {
      en: `<p>Nobody designs controls from a blank page. You start from a <b>baseline</b>: a published set of minimum controls for a given level of risk.</p><ul><li><b>NIST SP 800-53</b> has low, moderate and high baselines; you pick the one matching how bad a breach of the system would be.</li><li><b>CIS Benchmarks</b> give hardened settings for specific products: Windows, Linux, cloud accounts, browsers.</li></ul><p>A baseline saves time and gives auditors something to check against. But it is written for an average organization, so it always needs adjusting.</p>`,
      ru: `<p>Меры защиты никто не придумывает с чистого листа. Берут <b>базовый набор</b> (baseline) — опубликованный минимум мер для заданного уровня риска.</p><ul><li><b>NIST SP 800-53</b>: наборы low, moderate и high; выбирают тот, что соответствует тяжести последствий взлома системы.</li><li><b>CIS Benchmarks</b>: защищённые настройки для конкретных продуктов — Windows, Linux, облачных аккаунтов, браузеров.</li></ul><p>Базовый набор экономит время и даёт аудиторам эталон. Но он написан для «средней» организации, поэтому его всегда нужно подгонять.</p>`,
    },
    take: { en: `A baseline is the starting point, not the finished design.`, ru: `Базовый набор — отправная точка, а не готовое решение.` } },

  { id: 's03-021', kind: 'vs', k: ['d2-c6'], lvl: 2,
    title: { en: `Scoping vs tailoring`, ru: `Scoping и tailoring` },
    body: {
      en: `<p>Two ways to adjust a baseline, often confused:</p><ul><li><b>Scoping</b>: deciding <i>which</i> controls apply. A system with no wireless drops the Wi-Fi controls; a system with no customer data drops some privacy controls.</li><li><b>Tailoring</b>: changing <i>how</i> the remaining controls work: setting the parameters (lock the screen after 10 minutes, not 15), or using a compensating control where the original one is impossible.</li></ul><p>Both are documented, with the reason, and approved by the system owner.</p>`,
      ru: `<p>Два способа подогнать базовый набор, которые часто путают:</p><ul><li><b>Scoping</b> (определение области) — решить, <i>какие</i> меры применимы. В системе без беспроводной сети убирают меры для Wi-Fi, в системе без клиентских данных — часть мер приватности.</li><li><b>Tailoring</b> (адаптация) — изменить, <i>как</i> работают оставшиеся меры: задать параметры (блокировка экрана через 10 минут, а не 15) или применить компенсирующую меру там, где исходная невозможна.</li></ul><p>И то, и другое документируют с причиной и утверждают у владельца системы.</p>`,
    },
    take: { en: `Scoping removes what doesn't apply; tailoring adjusts what's left.`, ru: `Scoping убирает лишнее, tailoring настраивает оставшееся.` } },

  { id: 's03-022', kind: 'think', k: ['d2-c6', 'd1-c9'], lvl: 2,
    title: { en: `The control the factory floor can't use`, ru: `Мера, которую нельзя применить в цеху` },
    body: {
      en: `<p>Your baseline says every workstation locks after 5 minutes idle and needs a password to unlock. On the factory floor, operators in gloves watch a control terminal for hours, and a locked screen during an alarm could hurt someone.</p><p>The plant manager wants to "just switch the rule off". What do you do?</p>`,
      ru: `<p>Ваш базовый набор требует, чтобы каждая рабочая станция блокировалась через 5 минут простоя и разблокировалась паролем. В цеху операторы в перчатках часами следят за пультом управления, и заблокированный экран во время аварии может кому-то навредить.</p><p>Директор завода хочет «просто отключить правило». Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>Tailor it, don't just drop it.</b> Safety comes first, so the screen must stay visible. But the risk the lock addressed (someone else using the terminal) is still there.</p><p>Choose a <b>compensating control</b>: the terminal sits in a badge-controlled area, operators log in with a badge tap, and actions are logged per person. Document the change and the reason, and have the system owner accept the remaining risk.</p>`,
      ru: `<p><b>Адаптировать, а не просто убрать.</b> Безопасность людей важнее, поэтому экран должен оставаться видимым. Но риск, от которого защищала блокировка (терминалом воспользуется посторонний), никуда не делся.</p><p>Выберите <b>компенсирующую меру</b>: терминал стоит в зоне с доступом по пропускам, операторы входят прикосновением карты, действия журналируются по каждому человеку. Задокументируйте изменение и причину, а оставшийся риск пусть примет владелец системы.</p>`,
    },
    take: { en: `When a control can't fit, replace it with one that covers the same risk, and write it down.`, ru: `Если мера не подходит, замените её другой, закрывающей тот же риск, и задокументируйте это.` } },

  { id: 's03-023', kind: 'idea', k: ['d2-c6', 'd1-c11'], lvl: 2,
    title: { en: `DLP: watching data on its way out`, ru: `DLP: наблюдение за данными на выходе` },
    body: {
      en: `<p><b>Data loss prevention</b> (DLP) tools look for sensitive data where it shouldn't be, and can warn, block or log.</p><ul><li><b>Network DLP</b> inspects traffic leaving the company: email, web uploads.</li><li><b>Endpoint DLP</b> runs on laptops: copying to USB, printing, pasting into a website.</li><li><b>Discovery</b> scans file shares and cloud storage to find sensitive data sitting in the wrong place.</li></ul><p>DLP depends on classification: it recognizes data by its labels or by patterns like card numbers. As a control, blocking is preventive and logging is detective.</p>`,
      ru: `<p>Средства <b>предотвращения утечек</b> (DLP, data loss prevention) ищут чувствительные данные там, где их быть не должно, и могут предупредить, заблокировать или записать в журнал.</p><ul><li><b>Сетевой DLP</b> проверяет исходящий трафик: почту, загрузки в веб.</li><li><b>DLP на рабочих местах</b> работает на ноутбуках: копирование на USB, печать, вставка в сайт.</li><li><b>Discovery</b> сканирует файловые ресурсы и облачные хранилища, находя чувствительные данные не на своём месте.</li></ul><p>DLP зависит от классификации: узнаёт данные по меткам или по шаблонам вроде номеров карт. Как мера блокировка превентивна, а журналирование — детективно.</p>`,
    },
    take: { en: `DLP can only protect what it can recognize, so it needs good labels.`, ru: `DLP защищает только то, что может распознать, поэтому ему нужны хорошие метки.` } },

  { id: 's03-024', kind: 'vs', k: ['d2-c6'], lvl: 2,
    title: { en: `DLP vs DRM vs CASB`, ru: `DLP, DRM и CASB` },
    body: {
      en: `<ul><li><b>DLP</b> guards the <i>exits</i>: it inspects data as it tries to leave and stops what shouldn't go.</li><li><b>DRM / IRM</b> (digital or information rights management) travels <i>with the file</i>: even after it's sent, the file can't be printed or forwarded, and access can expire or be revoked.</li><li><b>CASB</b> (cloud access security broker) sits <i>between users and cloud services</i>: it shows which cloud apps are in use (including unapproved "shadow IT") and applies access and DLP rules to them.</li></ul>`,
      ru: `<ul><li><b>DLP</b> охраняет <i>выходы</i>: проверяет данные, когда они пытаются уйти, и останавливает то, что уходить не должно.</li><li><b>DRM / IRM</b> (управление цифровыми или информационными правами) путешествует <i>вместе с файлом</i>: даже после отправки его нельзя напечатать или переслать, а доступ может истечь или быть отозван.</li><li><b>CASB</b> (брокер безопасного доступа к облаку) стоит <i>между пользователями и облачными сервисами</i>: показывает, какие облачные приложения используются (включая неодобренные — «теневое IT»), и применяет к ним правила доступа и DLP.</li></ul>`,
    },
    take: { en: `DLP guards the door, DRM rides with the file, CASB watches the cloud.`, ru: `DLP охраняет дверь, DRM едет с файлом, CASB следит за облаком.` } },

  { id: 's03-025', kind: 'story', k: ['d2-c6', 'd1-c4'], lvl: 2,
    title: { en: `AOL 2006: "anonymous" user No. 4417749`, ru: `AOL 2006: «анонимный» пользователь № 4417749` },
    body: {
      en: `<p>In August 2006, AOL published about 20 million search queries from roughly 650,000 users, for researchers. Names were replaced with numbers, so AOL considered the data anonymous.</p><p>Within days, New York Times reporters took the searches of user No. 4417749 (local businesses, a town in Georgia, people with the same surname) and found the woman behind them. She confirmed they were hers. AOL pulled the data and apologized, but copies were already everywhere.</p>`,
      ru: `<p>В августе 2006 года AOL опубликовала для исследователей около 20 млн поисковых запросов примерно 650 тысяч пользователей. Имена заменили номерами, и в AOL сочли данные анонимными.</p><p>За несколько дней журналисты New York Times по запросам пользователя № 4417749 (местные фирмы, городок в Джорджии, люди с одной фамилией) нашли женщину, которой они принадлежали. Она подтвердила, что запросы её. AOL убрала данные и извинилась, но копии уже разошлись повсюду.</p>`,
    },
    take: { en: `Replacing names with numbers isn't anonymization if the rest of the data still points to a person.`, ru: `Замена имён номерами — не анонимизация, если остальные данные всё равно указывают на человека.` } },

  { id: 's03-026', kind: 'vs', k: ['d2-c6', 'd1-c4'], lvl: 2,
    title: { en: `Pseudonymization, anonymization, tokenization, masking`, ru: `Псевдонимизация, анонимизация, токенизация, маскирование` },
    body: {
      en: `<ul><li><b>Pseudonymization</b>: identifiers are replaced, but someone with extra information can re-identify people. AOL's data was this. Under GDPR it is still personal data.</li><li><b>Anonymization</b>: re-identification is no longer reasonably possible. It is no longer personal data, and it's harder to achieve than it looks.</li><li><b>Tokenization</b>: a value such as a card number is swapped for a random token; the real value sits in a protected vault.</li><li><b>Masking</b>: part of a value is hidden, such as ****1234 on a receipt or fake data in a test system.</li></ul>`,
      ru: `<ul><li><b>Псевдонимизация</b>: идентификаторы заменены, но тот, у кого есть дополнительные сведения, может снова узнать людей. Данные AOL были именно такими. По GDPR это всё ещё персональные данные.</li><li><b>Анонимизация</b>: повторная идентификация больше невозможна при разумных усилиях. Это уже не персональные данные, и добиться этого труднее, чем кажется.</li><li><b>Токенизация</b>: значение, например номер карты, заменяется случайным токеном, а настоящее хранится в защищённом хранилище.</li><li><b>Маскирование</b>: часть значения скрыта, как ****1234 в чеке или вымышленные данные в тестовой системе.</li></ul>`,
    },
    take: { en: `If it can be reversed, it's pseudonymized, and the privacy rules still apply.`, ru: `Если преобразование обратимо, это псевдонимизация, и правила приватности по-прежнему действуют.` } },

  { id: 's03-027', kind: 'idea', k: ['d2-c7', 'd1-c4'], lvl: 2,
    title: { en: `Retention: as long as needed, and no longer`, ru: `Сроки хранения: сколько нужно, и не дольше` },
    body: {
      en: `<p>A <b>retention policy</b> says how long each type of record is kept: invoices for the years tax law requires, CVs of rejected candidates for a few months, logs for a year.</p><p>Keeping data "just in case" feels safe but isn't. Every old record is something to lose in a breach, to search in a lawsuit (e-discovery) and to justify to a privacy regulator. Data you no longer have can't leak.</p><p>One exception overrides the schedule: a <b>legal hold</b>. When a lawsuit or investigation is expected, relevant data must be preserved, even if it's due for deletion.</p>`,
      ru: `<p><b>Политика хранения</b> определяет, сколько держать записи каждого типа: счета — столько лет, сколько требует налоговый закон, резюме отклонённых кандидатов — несколько месяцев, журналы — год.</p><p>Хранить «на всякий случай» кажется надёжным, но это не так. Каждая старая запись — то, что можно потерять при утечке, что придётся искать в суде (e-discovery) и объяснять регулятору. Данные, которых у вас нет, утечь не могут.</p><p>Одно исключение отменяет график: <b>legal hold</b> (запрет на уничтожение). Если ожидается суд или расследование, относящиеся к делу данные нужно сохранить, даже если срок их удаления наступил.</p>`,
    },
    take: { en: `Keep data only as long as law and business need it, unless a legal hold says otherwise.`, ru: `Храните данные столько, сколько требуют закон и бизнес, если только не действует legal hold.` } },

  { id: 's03-028', kind: 'think', k: ['d2-c7', 'd1-c4'], lvl: 2,
    title: { en: `The clean-up that comes at the wrong time`, ru: `Чистка не вовремя` },
    body: {
      en: `<p>The IT team schedules a long-planned clean-up: delete all emails older than two years, as the retention policy says. The day before, you hear that a former distributor has sued the company over a contract from three years ago.</p><p>Do you let the clean-up run?</p>`,
      ru: `<p>IT-команда назначила давно запланированную чистку: удалить всю почту старше двух лет, как требует политика хранения. Накануне вы узнаёте, что бывший дистрибьютор подал в суд на компанию из-за договора трёхлетней давности.</p><p>Запускать чистку?</p>`,
    },
    reveal: {
      en: `<p><b>Pause it for the relevant data and call the legal team now.</b> Once litigation is reasonably expected, the company must preserve related records: a legal hold overrides the normal schedule.</p><p>Deleting them now, even "by policy", can look like destroying evidence and lead to sanctions. Legal decides the scope of the hold (which mailboxes, which dates). The rest of the clean-up can go ahead.</p>`,
      ru: `<p><b>Приостановить для относящихся к делу данных и сразу позвонить юристам.</b> Как только судебный спор обоснованно ожидается, компания обязана сохранить связанные записи: legal hold отменяет обычный график.</p><p>Удаление сейчас, даже «по политике», может выглядеть как уничтожение доказательств и привести к санкциям. Объём запрета (какие ящики, какие даты) определяют юристы. Остальная чистка может продолжаться.</p>`,
    },
    take: { en: `A legal hold beats the retention schedule.`, ru: `Legal hold важнее графика хранения.` } },

  { id: 's03-029', kind: 'idea', k: ['d2-c7', 'd1-c4'], lvl: 2,
    title: { en: `Where the data sleeps decides which law applies`, ru: `Где лежат данные, тот закон и действует` },
    body: {
      en: `<p><b>Data sovereignty</b>: data is subject to the laws of the country where it is stored or processed. <b>Data residency</b> is the requirement to keep it in a certain place.</p><p>A clinic in Germany choosing a cloud backup has to ask: in which region will the copies live? Can the provider's support staff in other countries see them? Does the law allow personal data to be transferred there, and under which safeguards?</p><p>The answer goes into the contract and the cloud configuration, before the first upload.</p>`,
      ru: `<p><b>Суверенитет данных</b>: данные подчиняются законам страны, где их хранят или обрабатывают. <b>Резидентность данных</b> — требование держать их в определённом месте.</p><p>Клиника в Германии, выбирая облачное резервное копирование, должна спросить: в каком регионе будут копии? Видят ли их сотрудники поддержки провайдера из других стран? Разрешает ли закон передавать туда персональные данные и при каких гарантиях?</p><p>Ответы записывают в договор и в настройки облака до первой загрузки.</p>`,
    },
    take: { en: `Choosing a cloud region is also choosing a legal system.`, ru: `Выбирая регион облака, вы выбираете и правовую систему.` } },

  { id: 's03-030', kind: 'vs', k: ['d2-c7'], lvl: 2,
    title: { en: `End of life vs end of support`, ru: `End of life и end of support` },
    body: {
      en: `<p>Products age too, and two dates matter:</p><ul><li><b>EOL</b> (end of life): the vendor stops <i>selling</i> the product. It still works and may still get fixes for a while.</li><li><b>EOS</b> (end of support): the vendor stops <i>fixing</i> it. No more security patches, so every new flaw stays open forever.</li></ul><p>EOS is the date that changes the risk. Track both dates in the asset inventory, so the replacement is planned and budgeted years ahead.</p>`,
      ru: `<p>Продукты тоже стареют, и важны две даты:</p><ul><li><b>EOL</b> (end of life, конец жизни): производитель перестаёт <i>продавать</i> продукт. Он работает и какое-то время может получать исправления.</li><li><b>EOS</b> (end of support, конец поддержки): производитель перестаёт его <i>исправлять</i>. Обновлений безопасности больше нет, и каждая новая уязвимость остаётся открытой навсегда.</li></ul><p>Риск меняет именно дата EOS. Отслеживайте обе даты в реестре активов, чтобы замену планировали и закладывали в бюджет за годы вперёд.</p>`,
    },
    take: { en: `EOL: no longer sold. EOS: no longer patched, and that is when the risk jumps.`, ru: `EOL — больше не продают. EOS — больше не исправляют, и тогда риск резко растёт.` } },

  { id: 's03-031', kind: 'back', back: 's01-020', k: ['d2-c7', 'd1-c9'], lvl: 2,
    title: { en: `An unsupported system and the four risk options`, ru: `Неподдерживаемая система и четыре варианта обращения с риском` },
    body: {
      en: `<p>A lab instrument runs an old operating system that reached end of support. The vendor's new model costs €200,000. Apply the four treatments from stage 1:</p><ul><li><b>Avoid</b>: retire it and switch to the new model.</li><li><b>Mitigate</b>: isolate it on its own network segment, no internet, no email, strict access.</li><li><b>Transfer</b>: a vendor contract for extended support, if one exists.</li><li><b>Accept</b>: the owner signs off the remaining risk until a set date.</li></ul><p>Usually it's a mix: mitigate now, avoid next budget year.</p>`,
      ru: `<p>Лабораторный прибор работает на старой операционной системе, поддержка которой закончилась. Новая модель стоит 200 000 евро. Примените четыре варианта из этапа 1:</p><ul><li><b>Избежать</b>: вывести из работы и перейти на новую модель.</li><li><b>Снизить</b>: изолировать в отдельном сегменте сети, без интернета и почты, со строгим доступом.</li><li><b>Передать</b>: договор с производителем о расширенной поддержке, если такой есть.</li><li><b>Принять</b>: владелец подписывает оставшийся риск до определённой даты.</li></ul><p>Обычно это смесь: снизить сейчас, избежать в следующем бюджетном году.</p>`,
    },
    take: { en: `End of support is a risk decision for the owner, not just an IT chore.`, ru: `Конец поддержки — решение владельца о риске, а не просто задача IT.` } },

  { id: 's03-032', kind: 'story', k: ['d2-c5', 'd1-c13'], lvl: 1,
    title: { en: `Morgan Stanley: customer data sold at auction`, ru: `Morgan Stanley: клиентские данные ушли с аукциона` },
    body: {
      en: `<p>In 2016, Morgan Stanley closed two data centers and hired a moving and storage company, one with no experience in data destruction, to dispose of thousands of hard drives and servers. Many weren't wiped. The mover sold them on, and some ended up for sale online, still holding customer data.</p><p>Regulators fined the bank <b>$60 million</b> (OCC, 2020) and <b>$35 million</b> (SEC, 2022). The SEC said the personal data of about 15 million customers had been at risk.</p>`,
      ru: `<p>В 2016 году Morgan Stanley закрыл два дата-центра и поручил утилизацию тысяч жёстких дисков и серверов компании по переездам и хранению, у которой не было опыта уничтожения данных. Многие устройства не очистили. Перевозчик перепродал их, и часть оказалась в продаже в интернете вместе с данными клиентов.</p><p>Регуляторы оштрафовали банк на <b>60 млн долларов</b> (OCC, 2020) и <b>35 млн долларов</b> (SEC, 2022). По данным SEC, под угрозой оказались персональные данные примерно 15 млн клиентов.</p>`,
    },
    take: { en: `The last phase of the lifecycle is a security control too, and it can be outsourced badly.`, ru: `Последняя фаза жизненного цикла — тоже мера защиты, и её можно плохо отдать на сторону.` } },

  { id: 's03-033', kind: 'idea', k: ['d2-c5'], lvl: 1,
    title: { en: `Deleting doesn't delete`, ru: `Удаление не удаляет` },
    body: {
      en: `<p><b>Data remanence</b> is data that stays on media after you think it's gone.</p><ul><li>Deleting a file or quick-formatting a disk only removes the pointers. The data is still there until overwritten, and free tools bring it back.</li><li><b>SSDs</b> are harder: they spread writes across spare cells (wear leveling), so overwriting a file may never touch the old copy.</li><li>Copies hide everywhere: backups, printer and copier disks, phones, old virtual machines.</li></ul><p>So sanitization is a deliberate step, matched to the media and the classification.</p>`,
      ru: `<p><b>Остаточная информация</b> (data remanence) — данные, которые остаются на носителе, когда вы думаете, что их уже нет.</p><ul><li>Удаление файла или быстрое форматирование убирает только указатели. Данные лежат на месте, пока их не перезапишут, и бесплатные утилиты их возвращают.</li><li>С <b>SSD</b> сложнее: они распределяют запись по запасным ячейкам (wear leveling), поэтому перезапись файла может не затронуть старую копию.</li><li>Копии прячутся повсюду: резервные копии, диски принтеров и копиров, телефоны, старые виртуальные машины.</li></ul><p>Поэтому очистка — отдельный продуманный шаг, подобранный под носитель и уровень классификации.</p>`,
    },
    take: { en: `Assume deleted data is still there until you've sanitized the media.`, ru: `Считайте, что удалённые данные на месте, пока носитель не очищен.` } },

  { id: 's03-034', kind: 'vs', k: ['d2-c5'], lvl: 2,
    title: { en: `Clear vs purge vs destroy`, ru: `Clear, purge и destroy` },
    body: {
      en: `<p>The NIST media sanitization guide (SP 800-88) uses three levels:</p><ul><li><b>Clear</b>: overwrite with standard tools. Stops simple recovery; fine if the device stays in the company.</li><li><b>Purge</b>: defeats even lab techniques. Built-in secure erase, cryptographic erase, or degaussing for magnetic media. For devices that leave the company.</li><li><b>Destroy</b>: shred, disintegrate, incinerate. The media can't be used again.</li></ul><p>The higher the classification and the less control you keep over the device afterwards, the higher the level. Record it with a certificate of sanitization.</p>`,
      ru: `<p>Руководство NIST по очистке носителей (SP 800-88) выделяет три уровня:</p><ul><li><b>Clear</b> (очистка): перезапись стандартными средствами. Защищает от простого восстановления; подходит, если устройство остаётся в компании.</li><li><b>Purge</b> (глубокая очистка): не поддаётся даже лабораторным методам. Встроенное безопасное стирание, криптографическое стирание или размагничивание магнитных носителей. Для устройств, покидающих компанию.</li><li><b>Destroy</b> (уничтожение): шредер, измельчение, сжигание. Носитель больше не использовать.</li></ul><p>Чем выше классификация и чем меньше контроля над устройством после, тем выше уровень. Фиксируйте результат актом об очистке.</p>`,
    },
    take: { en: `Clear for reuse inside, purge for leaving, destroy when nothing less will do.`, ru: `Clear — для повторного использования внутри, purge — когда уходит наружу, destroy — когда иначе нельзя.` } },

  { id: 's03-035', kind: 'picture', k: ['d2-c5'], lvl: 2,
    title: { en: `Which method for which media`, ru: `Какой метод для какого носителя` },
    body: {
      en: `<p>Degaussing works only on magnetic media and does nothing to flash or optical discs. In the cloud you can't touch the disks at all, so you destroy the keys instead.</p>`,
      ru: `<p>Размагничивание работает только на магнитных носителях и бесполезно для флеш-памяти и оптических дисков. В облаке к дискам вообще не прикоснуться, поэтому уничтожают ключи.</p>`,
    },
    dg: { title: { en: `Media → sanitization`, ru: `Носитель → очистка` }, h: 380,
      nodes: [
        ['hdd', 130, 45, { en: 'Hard disk, tape', ru: 'Жёсткий диск, лента' }, null, '💽', 'dim'],
        ['ssd', 130, 120, { en: 'SSD, USB, phone', ru: 'SSD, USB, телефон' }, null, '📱', 'dim'],
        ['opt', 130, 195, { en: 'CD, DVD', ru: 'CD, DVD' }, null, '💿', 'dim'],
        ['pap', 130, 270, { en: 'Paper', ru: 'Бумага' }, null, '📄', 'dim'],
        ['cl', 130, 345, { en: 'Cloud storage', ru: 'Облако' }, null, '☁️', 'dim'],
        ['m1', 545, 45, { en: 'Overwrite or degauss', ru: 'Перезапись или размагничивание' }, { en: 'shred if it leaves', ru: 'шредер, если уходит' }, '🧲', 'ok', 300],
        ['m2', 545, 120, { en: 'Secure / crypto erase', ru: 'Безопасное / крипто-стирание' }, { en: 'no degaussing; shred if unsure', ru: 'не размагничивать; сомнения — шредер' }, '⚙️', 'ok', 300],
        ['m3', 545, 195, { en: 'Shred or incinerate', ru: 'Измельчить или сжечь' }, null, '🔥', 'ok', 300],
        ['m4', 545, 270, { en: 'Cross-cut shred, pulp', ru: 'Шредер с перекрёстной резкой' }, null, '✂️', 'ok', 300],
        ['m5', 545, 345, { en: 'Crypto-shredding', ru: 'Криптографическое удаление' }, { en: 'destroy the keys', ru: 'уничтожить ключи' }, '🔑', 'key', 300],
      ],
      edges: [['hdd', 'm1', null], ['ssd', 'm2', null], ['opt', 'm3', null], ['pap', 'm4', null], ['cl', 'm5', null]] },
    take: { en: `Match the method to the media: degaussing an SSD erases nothing.`, ru: `Подбирайте метод под носитель: размагничивание SSD ничего не стирает.` } },

  { id: 's03-036', kind: 'think', k: ['d2-c5', 'd1-c13'], lvl: 2,
    title: { en: `Leaving the cloud provider`, ru: `Уход от облачного провайдера` },
    body: {
      en: `<p>Your company is moving its customer database from one cloud provider to another. The old provider will "delete the storage" when the contract ends. Your auditor asks how you know the data is really gone, since you can't shred their disks.</p><p>What should have been in place, and what do you do now?</p>`,
      ru: `<p>Компания переносит клиентскую базу от одного облачного провайдера к другому. Старый провайдер «удалит хранилище» по окончании договора. Аудитор спрашивает, откуда вы знаете, что данные действительно исчезли: ведь их диски не отправишь в шредер.</p><p>Что должно было быть сделано заранее и что делать сейчас?</p>`,
    },
    reveal: {
      en: `<p><b>Crypto-shredding.</b> If the data was encrypted with keys you control (your own key management, not only the provider's), destroying those keys makes every remaining copy unreadable, including copies in the provider's backups.</p><p>Also check the contract: it should state how data is deleted at exit, and require written confirmation. Ask for that confirmation now, and keep it with your records. Next time, plan the exit at the start of the contract.</p>`,
      ru: `<p><b>Криптографическое удаление.</b> Если данные были зашифрованы ключами, которые контролируете вы (своё управление ключами, а не только провайдера), уничтожение ключей делает нечитаемыми все оставшиеся копии, в том числе в резервных копиях провайдера.</p><p>Проверьте и договор: в нём должно быть сказано, как удаляются данные при выходе, и требование письменного подтверждения. Запросите это подтверждение сейчас и сохраните. В следующий раз планируйте выход в начале договора.</p>`,
    },
    take: { en: `In the cloud, you sanitize by destroying the keys, so you must hold them.`, ru: `В облаке очищают уничтожением ключей, поэтому ключи должны быть у вас.` } },

  { id: 's03-037', kind: 'back', back: 's02-016', k: ['d1-c13', 'd2-c5'], lvl: 2,
    title: { en: `The disposal company is a vendor with your data`, ru: `Компания-утилизатор — поставщик с вашими данными` },
    body: {
      en: `<p>In stage 2: vendors with access are insiders too. Morgan Stanley's mover was exactly that: for a few weeks it held millions of customer records on unwiped drives.</p><p>Treat a disposal vendor like any vendor with sensitive access:</p><ul><li>Check its competence and certifications before signing.</li><li>Put the method and level (purge or destroy) in the contract.</li><li>Track every device by serial number, handed over and destroyed.</li><li>Get a certificate of destruction, and spot-check it.</li></ul>`,
      ru: `<p>На этапе 2: поставщики с доступом — тоже инсайдеры. Перевозчик Morgan Stanley был именно таким: несколько недель у него были миллионы клиентских записей на неочищенных дисках.</p><p>Относитесь к утилизатору как к любому поставщику с чувствительным доступом:</p><ul><li>Проверьте компетенцию и сертификаты до подписания.</li><li>Пропишите метод и уровень (purge или destroy) в договоре.</li><li>Отслеживайте каждое устройство по серийному номеру: передано и уничтожено.</li><li>Получите акт об уничтожении и выборочно проверьте его.</li></ul>`,
    },
    take: { en: `Outsourcing destruction doesn't outsource the responsibility for it.`, ru: `Передав уничтожение на сторону, вы не передаёте ответственность за него.` } },

  { id: 's03-038', kind: 'link', k: ['d2-c1', 'd2-c3', 'd2-c7', 'd1-c9'], lvl: 2,
    title: { en: `Marriott, phase by phase`, ru: `Marriott по фазам` },
    body: {
      en: `<p>Go back to the Starwood database with what you know now:</p><ul><li><b>Inventory and owner</b>: after the takeover, nobody fully assessed the system or its risks.</li><li><b>Classification</b>: passport numbers are among the most sensitive personal data.</li><li><b>States</b>: some passport numbers were stored unencrypted at rest.</li><li><b>Retention</b>: did a hotel need passport numbers from stays years earlier?</li></ul><p>Each phase was a chance to shrink the damage. Less data, labeled and encrypted, would have meant a smaller breach and a smaller fine.</p>`,
      ru: `<p>Вернитесь к базе Starwood с тем, что вы знаете теперь:</p><ul><li><b>Инвентаризация и владелец</b>: после покупки никто полностью не оценил систему и её риски.</li><li><b>Классификация</b>: номера паспортов — одни из самых чувствительных персональных данных.</li><li><b>Состояния</b>: часть номеров паспортов хранилась без шифрования.</li><li><b>Сроки хранения</b>: нужны ли отелю номера паспортов гостей, живших много лет назад?</li></ul><p>Каждая фаза была шансом уменьшить ущерб. Меньше данных, с метками и шифрованием, — меньше утечка и меньше штраф.</p>`,
    },
    take: { en: `Knowing, labeling, encrypting and deleting on time each cut the impact of a breach.`, ru: `Знать, помечать, шифровать и вовремя удалять — каждое из этого уменьшает последствия утечки.` } },

  { id: 's03-039', kind: 'idea', k: ['d2-c7', 'd2-c1'], lvl: 2,
    title: { en: `Secure provisioning: the inventory, from purchase to disposal`, ru: `Безопасное введение в работу: реестр от покупки до утилизации` },
    body: {
      en: `<p>The inventory from the start of this stage isn't a one-off list. Each asset is tracked through its whole life:</p><ul><li><b>Before use</b>: recorded with an owner, set up from an approved, hardened configuration, licensed.</li><li><b>In use</b>: kept up to date, with its EOS date known.</li><li><b>At the end</b>: data sanitized, the device handed over with a record, the inventory updated.</li></ul><p>A device that left the inventory without a sanitization record is how unwiped drives end up for sale online.</p>`,
      ru: `<p>Реестр из начала этапа — не разовый список. Каждый актив отслеживают всю его жизнь:</p><ul><li><b>До использования</b>: внесён в реестр с владельцем, настроен по утверждённой защищённой конфигурации, лицензирован.</li><li><b>В работе</b>: обновляется, известна дата EOS.</li><li><b>В конце</b>: данные очищены, устройство передано с записью, реестр обновлён.</li></ul><p>Устройство, выбывшее из реестра без отметки об очистке, — так неочищенные диски и попадают в продажу в интернете.</p>`,
    },
    take: { en: `Track every asset from the day it arrives to the day it's destroyed.`, ru: `Отслеживайте каждый актив со дня поступления до дня уничтожения.` } },

  { id: 's03-040', kind: 'recap', lvl: 1,
    title: { en: `Stage 3 in seven lines`, ru: `Этап 3 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s03-002', { en: `Inventory, owner, classification: before any control.`, ru: `Инвентаризация, владелец, классификация — до любых мер.` }],
      ['s03-006', { en: `The owner is accountable; the custodian does the work.`, ru: `Владелец подотчётен, хранитель выполняет работу.` }],
      ['s03-011', { en: `Combined data can be more sensitive than its parts.`, ru: `Объединённые данные бывают чувствительнее своих частей.` }],
      ['s03-013', { en: `At rest, in transit, in use: each state needs its own control.`, ru: `В покое, в движении, в использовании — каждому состоянию своя мера.` }],
      ['s03-021', { en: `Scoping removes controls that don't apply; tailoring adjusts the rest.`, ru: `Scoping убирает лишние меры, tailoring настраивает остальные.` }],
      ['s03-028', { en: `Keep data no longer than needed, but a legal hold comes first.`, ru: `Не храните данные дольше нужного, но legal hold важнее.` }],
      ['s03-034', { en: `Clear, purge or destroy, matched to the media and the label.`, ru: `Clear, purge или destroy — под носитель и метку.` }],
    ],
    take: { en: `Next: who gets to touch all this data, and how we know it's really them.`, ru: `Дальше — кто может прикасаться к этим данным и как убедиться, что это действительно он.` } },
] });
