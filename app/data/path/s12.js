'use strict';
// Learning path, stage 12: staying in business. BCP vs DRP, the BIA and its numbers (RPO, RTO, WRT, MTD), dependencies,
// recovery strategies and sites, high availability, backups (types, restore sets, 3-2-1, immutability, vaulting),
// the DR plan and process, plan tests, people and suppliers in the plan, crisis communication.
CISSP.stage(12, { cards: [
  { id: 's12-001', kind: 'story', k: ['d7-c10', 'd7-c7', 'd1-c7'], lvl: 1,
    title: { en: `Maersk 2017: the server that survived a power cut`, ru: `Maersk 2017: сервер, который спасло отключение света` },
    body: {
      en: `<p>Stage 10 left Maersk on paper after NotPetya. To rebuild 4,000 servers, the team first needed the <b>domain controllers</b>: the directory that knows every user, computer and password. Without it, nothing else could log in.</p><p>Maersk had about 150 of them, all copying each other in real time. NotPetya wiped every one, and the replication made sure no clean copy was left. Except one: a controller in an office in Ghana that happened to be offline because of a local power cut.</p><p>Its disk was flown to the recovery team in the UK. From that one copy, the company rebuilt its identity system, then everything else.</p>`,
      ru: `<p>Этап 10 оставил Maersk на бумаге после NotPetya. Чтобы восстановить 4000 серверов, команде сначала нужны были <b>контроллеры домена</b>: каталог, знающий каждого пользователя, компьютер и пароль. Без него больше ничто не могло войти.</p><p>У Maersk их было около 150, и все копировали друг друга в реальном времени. NotPetya стёр каждый, а репликация позаботилась, чтобы чистой копии не осталось. Кроме одной: контроллера в офисе в Гане, который случайно был выключен из-за местного отключения электричества.</p><p>Его диск доставили самолётом команде восстановления в Великобританию. С этой единственной копии компания восстановила систему идентификации, а затем и всё остальное.</p>`,
    },
    take: { en: `Maersk's recovery rested on luck: one offline copy nobody had planned.`, ru: `Восстановление Maersk держалось на везении: одной офлайн-копии, которую никто не планировал.` } },

  { id: 's12-002', kind: 'idea', k: ['d7-c7', 'd7-c8'], lvl: 1,
    title: { en: `Replication is not a backup`, ru: `Репликация — не резервная копия` },
    body: {
      en: `<p>Maersk's 150 domain controllers were excellent protection against one server failing. They were no protection against a bad change, because <b>replication copies everything instantly, including the damage</b>. Delete a file, encrypt a disk, corrupt a database: every replica faithfully does the same.</p><p>A <b>backup</b> is different: a copy from a point in the past, kept separately, that the live system can't change. Replication and redundancy give you availability against failures. Backups give you a way back from mistakes and attacks. You need both, and one never replaces the other.</p>`,
      ru: `<p>150 контроллеров домена Maersk отлично защищали от отказа одного сервера. От плохого изменения они не защищали никак, потому что <b>репликация мгновенно копирует всё, включая ущерб</b>. Удалите файл, зашифруйте диск, испортите базу — каждая реплика добросовестно повторит.</p><p><b>Резервная копия</b> устроена иначе: это копия из момента в прошлом, хранящаяся отдельно, которую живая система изменить не может. Репликация и избыточность дают доступность при отказах. Резервные копии дают путь назад после ошибок и атак. Нужно и то и другое, и одно не заменяет другое.</p>`,
    },
    take: { en: `Replication copies the damage too; a backup is a separate copy from the past.`, ru: `Репликация копирует и ущерб; резервная копия — отдельная копия из прошлого.` } },

  { id: 's12-003', kind: 'idea', k: ['d1-c7', 'd7-c10'], lvl: 1,
    title: { en: `Keep the business going, bring the systems back`, ru: `Удержать бизнес, вернуть системы` },
    body: {
      en: `<p>When Maersk's IT went dark, port staff kept trucks moving with paper forms and personal phones. That was <b>business continuity</b>: keeping the essential work of the business going, by whatever means, during a disruption.</p><p>Meanwhile the IT team rebuilt servers. That was <b>disaster recovery</b>: restoring the technology, at the original site or another one.</p><p>A <b>business continuity plan (BCP)</b> is wide and owned by the business: people, processes, premises, suppliers. A <b>disaster recovery plan (DRP)</b> is narrower and more technical; it's one part of continuity. Both start from the same question: what must keep working, and how soon?</p>`,
      ru: `<p>Когда ИТ Maersk погасли, сотрудники портов продолжали пропускать грузовики по бумажным бланкам и личным телефонам. Это была <b>непрерывность бизнеса</b>: поддержка основной работы компании любыми средствами во время сбоя.</p><p>Тем временем ИТ-команда восстанавливала серверы. Это было <b>аварийное восстановление</b>: возврат технологий на исходной площадке или на другой.</p><p><b>План непрерывности бизнеса (BCP)</b> широкий, и владеет им бизнес: люди, процессы, помещения, поставщики. <b>План аварийного восстановления (DRP)</b> уже и техничнее; это одна из частей непрерывности. Оба начинаются с одного вопроса: что должно работать и как скоро?</p>`,
    },
    take: { en: `BCP keeps the business running; DRP brings the technology back. DRP is part of BCP.`, ru: `BCP удерживает бизнес на ходу; DRP возвращает технологии. DRP — часть BCP.` } },

  { id: 's12-004', kind: 'vs', k: ['d1-c7', 'd7-c10', 'd7-c4'], lvl: 2,
    title: { en: `Which plan is which?`, ru: `Какой план для чего?` },
    body: {
      en: `<ul><li><b>Business continuity plan</b>: keep critical business functions going during and after a disruption.</li><li><b>Disaster recovery plan</b>: restore IT systems and data after a major disruption.</li><li><b>Incident response plan</b>: detect, contain and recover from a security incident.</li><li><b>Continuity of operations plan (COOP)</b>: the US government term; keep an agency's essential functions going, often from another site, for up to 30 days.</li><li><b>Crisis communications plan</b>: who tells staff, customers, regulators and the press what, and when.</li><li><b>Occupant emergency plan</b>: protect people in a building: evacuation, shelter in place.</li></ul>`,
      ru: `<ul><li><b>План непрерывности бизнеса</b>: удержать критичные функции во время сбоя и после.</li><li><b>План аварийного восстановления</b>: вернуть ИТ-системы и данные после крупного сбоя.</li><li><b>План реагирования на инциденты</b>: обнаружить, сдержать инцидент безопасности и восстановиться.</li><li><b>План непрерывности деятельности (COOP)</b>: термин госсектора США; удержать основные функции ведомства, часто с другой площадки, до 30 дней.</li><li><b>План кризисных коммуникаций</b>: кто, что и когда сообщает сотрудникам, клиентам, регуляторам и прессе.</li><li><b>План действий персонала в ЧС</b>: защита людей в здании — эвакуация, укрытие на месте.</li></ul>`,
    },
    take: { en: `BCP = business, DRP = IT, IRP = security incident, OEP = people in the building.`, ru: `BCP — бизнес, DRP — ИТ, IRP — инцидент безопасности, OEP — люди в здании.` } },

  { id: 's12-005', kind: 'idea', k: ['d1-c7', 'd1-c2'], lvl: 1,
    title: { en: `Continuity starts at the top`, ru: `Непрерывность начинается сверху` },
    body: {
      en: `<p>The first step of continuity planning isn't technical. It's getting <b>senior management</b> to sponsor it: approve the scope, name a team, fund it, and accept that some decisions, such as which business line to save first, are theirs.</p><p>The <b>BCP team</b> includes people from each core business area, IT, security, facilities, HR, legal and communications. Then the project goes through the same steps every time: scope and plan the project; the business impact analysis; choose continuity strategies; write and approve the plan; train and test; keep it up to date.</p><p>A plan written by IT alone ends up protecting servers, not the business.</p>`,
      ru: `<p>Первый шаг планирования непрерывности не технический. Это получить поддержку <b>высшего руководства</b>: утвердить охват, назначить команду, выделить деньги и принять, что часть решений, например какое направление спасать первым, — за ним.</p><p>В <b>команду BCP</b> входят люди из каждого ключевого направления, ИТ, безопасность, эксплуатация зданий, HR, юристы и коммуникации. Дальше проект каждый раз проходит одни и те же шаги: охват и план проекта; анализ влияния на бизнес; выбор стратегий непрерывности; написание и утверждение плана; обучение и тесты; поддержание в актуальном состоянии.</p><p>План, написанный одним ИТ, в итоге защищает серверы, а не бизнес.</p>`,
    },
    take: { en: `Senior management sponsors the BCP; the team spans the whole business, not just IT.`, ru: `BCP спонсирует высшее руководство; команда охватывает весь бизнес, а не только ИТ.` } },

  { id: 's12-006', kind: 'think', k: ['d1-c7', 'd1-c2'], lvl: 1,
    title: { en: `"IT can write the continuity plan"`, ru: `«План непрерывности напишет ИТ»` },
    body: {
      en: `<p>The board asks for a business continuity plan before the next audit. The CEO forwards the request to the IT director: "You know the systems, please write it." The IT director asks you how to start.</p><p>What's your answer?</p>`,
      ru: `<p>Совет директоров просит план непрерывности бизнеса к следующему аудиту. Генеральный директор пересылает запрос ИТ-директору: «Вы знаете системы, напишите, пожалуйста». ИТ-директор спрашивает вас, с чего начать.</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p>Start by sending it back up, politely. IT can coordinate and write the disaster recovery part, but the BCP has to be <b>sponsored by senior management</b> and built with the business: only the heads of sales, operations and finance can say which of their processes are critical, how long each can stop, and what workarounds exist.</p><p>Ask the CEO for three things: a named executive sponsor, a cross-functional team, and the authority to interview every department for the business impact analysis. Without them, you'd produce a technical document that the auditors will rightly call a DRP, not a BCP.</p>`,
      ru: `<p>Начните с того, что вежливо верните запрос наверх. ИТ может координировать и написать часть про аварийное восстановление, но BCP должен <b>спонсировать высший менеджмент</b>, а строить его — вместе с бизнесом: только руководители продаж, операций и финансов могут сказать, какие их процессы критичны, как долго каждый может стоять и какие есть обходные пути.</p><p>Попросите у генерального директора три вещи: названного спонсора из руководства, межфункциональную команду и полномочия опросить каждый отдел для анализа влияния на бизнес. Без этого получится технический документ, который аудиторы справедливо назовут DRP, а не BCP.</p>`,
    },
    take: { en: `The BCP needs an executive sponsor and the business at the table; IT writes the DR part.`, ru: `Для BCP нужен спонсор из руководства и бизнес за столом; ИТ пишет часть про DR.` } },

  { id: 's12-007', kind: 'idea', k: ['d1-c7', 'd1-c9'], lvl: 1,
    title: { en: `The business impact analysis`, ru: `Анализ влияния на бизнес` },
    body: {
      en: `<p>The <b>business impact analysis (BIA)</b> is the heart of continuity planning. For each business process it asks:</p><ul><li>What happens if this stops for an hour, a day, a week? Lost revenue, fines, safety, reputation, contracts.</li><li>How long can it be down before the damage is unacceptable?</li><li>How much data can it afford to lose?</li><li>What does it depend on: people, systems, data, suppliers, buildings?</li></ul><p>The answers rank the processes. Payroll may survive two days; online ordering may not survive two hours. Everything later, from recovery sites to backup schedules, follows from this ranking.</p>`,
      ru: `<p><b>Анализ влияния на бизнес (BIA)</b> — сердце планирования непрерывности. Для каждого бизнес-процесса он спрашивает:</p><ul><li>Что будет, если он встанет на час, день, неделю? Потерянная выручка, штрафы, безопасность людей, репутация, договоры.</li><li>Как долго он может стоять, пока ущерб не станет неприемлемым?</li><li>Сколько данных он может позволить себе потерять?</li><li>От чего он зависит: людей, систем, данных, поставщиков, зданий?</li></ul><p>Ответы ранжируют процессы. Зарплата может пережить два дня; онлайн-заказы могут не пережить и двух часов. Всё дальнейшее, от резервных площадок до расписания копий, следует из этого рейтинга.</p>`,
    },
    take: { en: `The BIA ranks processes by the cost of stopping them; every recovery choice follows from it.`, ru: `BIA ранжирует процессы по цене их остановки; из этого следуют все решения о восстановлении.` } },

  { id: 's12-008', kind: 'picture', k: ['d1-c7', 'd7-c10'], lvl: 2,
    title: { en: `The recovery timeline`, ru: `Временная шкала восстановления` },
    body: {
      en: `<p>Look at a disruption on a timeline. Backwards from the moment it hits: the <b>RPO</b>, how much data you can lose. Forwards: the <b>RTO</b>, how long until the system is back; then the <b>WRT</b>, the time to check it and catch up on the work. Together they must fit inside the <b>MTD</b>, the longest the business can survive without the process.</p>`,
      ru: `<p>Посмотрим на сбой на временной шкале. Назад от момента удара — <b>RPO</b>: сколько данных можно потерять. Вперёд — <b>RTO</b>: сколько до возврата системы, затем <b>WRT</b>: время проверить её и нагнать работу. Вместе они должны уложиться в <b>MTD</b> — самый долгий срок, который бизнес переживёт без процесса.</p>`,
    },
    dg: { title: { en: `RPO, RTO, WRT and MTD`, ru: `RPO, RTO, WRT и MTD` }, h: 280,
      nodes: [
        ['bk', 90, 90, { en: 'Last good backup', ru: 'Последняя копия' }, '', '💾', 'dim', 150],
        ['hit', 280, 90, { en: 'Disruption', ru: 'Сбой' }, '', '💥', 'bad'],
        ['up', 480, 90, { en: 'System restored', ru: 'Система восстановлена' }, '', '🖥️', 'ok', 200],
        ['work', 670, 90, { en: 'Business normal', ru: 'Бизнес в норме' }, '', '✅', 'ok', 140],
        ['rpo', 185, 210, 'RPO', { en: 'data you can lose', ru: 'допустимая потеря данных' }, '⏪', 'key', 160],
        ['rto', 380, 210, 'RTO', { en: 'time to restore', ru: 'время до восстановления' }, '⏩', 'key', 160],
        ['wrt', 575, 210, 'WRT', { en: 'verify, catch up', ru: 'проверить, нагнать' }, '🔍', 'key', 160],
      ],
      edges: [['hit', 'bk', '', 'dash'], ['hit', 'up', '', 'ok'], ['up', 'work', '', 'ok']],
      note: { en: `RTO + WRT must not exceed the MTD.`, ru: `RTO + WRT не должны превышать MTD.` } },
    take: { en: `RPO looks back (data), RTO and WRT look forward (time); RTO + WRT ≤ MTD.`, ru: `RPO смотрит назад (данные), RTO и WRT — вперёд (время); RTO + WRT ≤ MTD.` } },

  { id: 's12-009', kind: 'vs', k: ['d1-c7', 'd7-c10'], lvl: 2,
    title: { en: `RPO vs RTO vs WRT vs MTD`, ru: `RPO, RTO, WRT и MTD` },
    body: {
      en: `<ul><li><b>MTD</b> (maximum tolerable downtime, also MAO, maximum allowable outage): set by the <b>business</b>. Beyond this, the damage is unacceptable or the business may not survive.</li><li><b>RTO</b> (recovery time objective): the target time to bring the system back. Must be shorter than the MTD.</li><li><b>WRT</b> (work recovery time): after the system is up, the time to test it, load missing data and catch up.</li><li><b>RPO</b> (recovery point objective): the maximum <b>data loss</b>, measured in time. An RPO of one hour means backups or replication at least every hour.</li></ul><p>Rule: MTD is the business limit; RTO and RPO are the IT targets that keep you inside it.</p>`,
      ru: `<ul><li><b>MTD</b> (максимально допустимый простой, также MAO): задаёт <b>бизнес</b>. Дальше ущерб неприемлем или бизнес может не выжить.</li><li><b>RTO</b> (целевое время восстановления): за сколько вернуть систему. Должно быть меньше MTD.</li><li><b>WRT</b> (время восстановления работы): после запуска системы — время проверить её, загрузить недостающие данные и нагнать работу.</li><li><b>RPO</b> (целевая точка восстановления): максимальная <b>потеря данных</b>, измеренная во времени. RPO в один час значит копии или репликацию не реже раза в час.</li></ul><p>Правило: MTD — предел бизнеса; RTO и RPO — цели ИТ, которые держат в этом пределе.</p>`,
    },
    take: { en: `MTD is the business limit; RTO (time) and RPO (data) are the IT targets inside it.`, ru: `MTD — предел бизнеса; RTO (время) и RPO (данные) — цели ИТ внутри него.` } },

  { id: 's12-010', kind: 'think', k: ['d1-c7', 'd7-c8'], lvl: 2,
    title: { en: `The numbers don't add up`, ru: `Цифры не сходятся` },
    body: {
      en: `<p>The BIA for an online shop says: orders can't stop for more than <b>8 hours</b> (MTD), and losing more than <b>15 minutes</b> of orders is unacceptable.</p><p>Current setup: nightly backup to tape, stored offsite; restoring the order database from tape takes about 12 hours, plus 3 hours to check it.</p><p>What's wrong, and what are the options?</p>`,
      ru: `<p>BIA интернет-магазина говорит: заказы не могут стоять больше <b>8 часов</b> (MTD), а потеря больше <b>15 минут</b> заказов неприемлема.</p><p>Сейчас: ночная копия на ленту, хранится вне площадки; восстановление базы заказов с ленты занимает около 12 часов, плюс 3 часа на проверку.</p><p>Что не так и какие есть варианты?</p>`,
    },
    reveal: {
      en: `<p>Both numbers fail. RTO + WRT is about 15 hours, nearly double the 8-hour MTD. And a nightly backup means an RPO of up to 24 hours, against a requirement of 15 minutes.</p><p>Options: replicate the database continuously or ship transaction logs every few minutes (fixes RPO); keep a warm standby that can take over in an hour or two (fixes RTO); keep the nightly offline backup too, for ransomware. Price each option and take it to the business owner. If they won't pay, the honest alternative is to change the numbers in the BIA and accept the risk in writing, not to leave a gap nobody admits.</p>`,
      ru: `<p>Обе цифры не выполнены. RTO + WRT около 15 часов, почти вдвое больше MTD в 8 часов. А ночная копия значит RPO до 24 часов при требовании 15 минут.</p><p>Варианты: непрерывная репликация базы или отправка журналов транзакций каждые несколько минут (решает RPO); тёплый резерв, способный принять нагрузку за час-два (решает RTO); ночную офлайн-копию тоже оставить — на случай вымогателя. Оцените стоимость каждого варианта и отнесите владельцу бизнеса. Если он не готов платить, честная альтернатива — изменить цифры в BIA и письменно принять риск, а не оставлять разрыв, который никто не признаёт.</p>`,
    },
    take: { en: `Check RTO + WRT against MTD and backup frequency against RPO; price the gap for the owner.`, ru: `Сверьте RTO + WRT с MTD и частоту копий с RPO; оцените разрыв для владельца.` } },

  { id: 's12-011', kind: 'back', back: 's01-018', k: ['d1-c9', 'd1-c7'], lvl: 2,
    title: { en: `Risk again: the BIA and the risk assessment`, ru: `Снова риск: BIA и оценка рисков` },
    body: {
      en: `<p>Stage 1 put a price on risk: single loss expectancy, annual rate, annualized loss.</p><p>The BIA and the risk assessment are cousins, and they're easy to mix up:</p><ul><li>the <b>risk assessment</b> starts from threats: what could happen, how likely, how bad?</li><li>the <b>BIA</b> starts from the business: if this process stops, whatever the cause, what does it cost per hour?</li></ul><p>The BIA doesn't care whether the order system is down because of a fire, ransomware or a cloud outage; the impact is the same. That's why it gives recovery targets, while the risk assessment tells you which causes to prevent first. Good continuity plans use both.</p>`,
      ru: `<p>Этап 1 назначал цену риску: ожидаемые потери от одного случая, годовая частота, годовые потери.</p><p>BIA и оценка рисков — родственники, и их легко перепутать:</p><ul><li><b>оценка рисков</b> начинается с угроз: что может случиться, насколько вероятно, насколько плохо?</li><li><b>BIA</b> начинается с бизнеса: если этот процесс встанет, по любой причине, сколько это стоит в час?</li></ul><p>Для BIA неважно, лёг ли сервис заказов из-за пожара, вымогателя или сбоя облака: влияние одно и то же. Поэтому BIA даёт цели восстановления, а оценка рисков говорит, какие причины предотвращать первыми. Хорошие планы непрерывности используют оба.</p>`,
    },
    take: { en: `Risk assessment starts from threats; BIA starts from impact, whatever the cause.`, ru: `Оценка рисков начинается с угроз; BIA — с влияния, независимо от причины.` } },

  { id: 's12-012', kind: 'idea', k: ['d1-c7', 'd1-c13'], lvl: 2,
    title: { en: `What the process stands on`, ru: `На чём стоит процесс` },
    body: {
      en: `<p>"Online ordering" isn't one system. Trace what it needs:</p><ul><li><b>applications</b>: the web shop, payments, stock, email confirmations;</li><li><b>infrastructure</b>: identity (log-in), DNS, network, the cloud region;</li><li><b>data</b>: products, customers, orders;</li><li><b>people</b>: the warehouse team, customer service, the one engineer who knows the payment integration;</li><li><b>suppliers</b>: the payment provider, the courier, the hosting company;</li><li><b>premises</b>: the warehouse.</li></ul><p>Each dependency inherits the process's RTO. If the shop must be back in 4 hours, so must identity and DNS, which is why they are restored first.</p>`,
      ru: `<p>«Онлайн-заказы» — не одна система. Проследите, что им нужно:</p><ul><li><b>приложения</b>: веб-магазин, платежи, склад, письма-подтверждения;</li><li><b>инфраструктура</b>: идентификация (вход), DNS, сеть, облачный регион;</li><li><b>данные</b>: товары, клиенты, заказы;</li><li><b>люди</b>: склад, служба поддержки, единственный инженер, знающий интеграцию платежей;</li><li><b>поставщики</b>: платёжный провайдер, курьер, хостинг;</li><li><b>помещения</b>: склад.</li></ul><p>Каждая зависимость наследует RTO процесса. Если магазин должен вернуться за 4 часа, то и идентификация, и DNS тоже, поэтому их восстанавливают первыми.</p>`,
    },
    take: { en: `Map every dependency of a process; each one inherits its recovery target.`, ru: `Опишите все зависимости процесса; каждая наследует его цель восстановления.` } },

  { id: 's12-013', kind: 'back', back: 's07-024', k: ['d7-c10', 'd3-c4', 'd1-c7'], lvl: 2,
    title: { en: `CrowdStrike again: recovery, one machine at a time`, ru: `Снова CrowdStrike: восстановление по одной машине` },
    body: {
      en: `<p>In stage 7, a faulty CrowdStrike update in kernel mode crashed about 8.5 million Windows machines on 19 July 2024.</p><p>The fix was simple: boot each machine into safe mode and delete one file. But it had to be done <b>by hand, on every machine</b>, and disks encrypted with BitLocker first needed their recovery keys. Many organizations found those keys were kept on servers that had crashed too.</p><p>Delta Air Lines took five days to recover and cancelled about 7,000 flights. Recovery plans had assumed a site or a system would fail, not every endpoint at once, and hadn't checked what recovery itself depended on.</p>`,
      ru: `<p>На этапе 7 сбойное обновление CrowdStrike в режиме ядра 19 июля 2024 года обрушило около 8,5 миллиона машин с Windows.</p><p>Исправление было простым: загрузить машину в безопасном режиме и удалить один файл. Но делать это пришлось <b>вручную, на каждой машине</b>, а для дисков, зашифрованных BitLocker, сначала нужны были ключи восстановления. Многие организации обнаружили, что эти ключи хранятся на серверах, которые тоже упали.</p><p>Delta Air Lines восстанавливалась пять дней и отменила около 7000 рейсов. Планы восстановления предполагали отказ площадки или системы, а не всех конечных точек сразу, и не проверяли, от чего зависит само восстановление.</p>`,
    },
    take: { en: `Check what recovery itself depends on: keys, tools and people must be reachable when everything is down.`, ru: `Проверьте, от чего зависит само восстановление: ключи, средства и люди должны быть доступны, когда всё лежит.` } },

  { id: 's12-014', kind: 'vs', k: ['d7-c8', 'd7-c9'], lvl: 2,
    title: { en: `MTBF vs MTTR`, ru: `MTBF и MTTR` },
    body: {
      en: `<ul><li><b>MTBF</b> (mean time between failures): how long, on average, a component runs before it fails. A disk rated at a million hours still fails; in a data centre with 10,000 disks, several fail every month.</li><li><b>MTTR</b> (mean time to repair or recover): how long it takes, on average, to fix it and return to service.</li></ul><p>Availability improves either way: make failures rarer (higher MTBF) or recovery faster (lower MTTR). Spare parts on site, hot-swappable disks, automation and practised staff all lower MTTR, and they're often cheaper than more reliable hardware.</p><p>Rule: MTBF is about failing less; MTTR about recovering faster.</p>`,
      ru: `<ul><li><b>MTBF</b> (среднее время между отказами): сколько в среднем работает компонент до отказа. Диск с рейтингом в миллион часов всё равно ломается; в дата-центре с 10 000 дисков несколько отказывают каждый месяц.</li><li><b>MTTR</b> (среднее время восстановления): сколько в среднем занимает починить его и вернуть в работу.</li></ul><p>Доступность растёт обоими путями: отказы реже (выше MTBF) или восстановление быстрее (ниже MTTR). Запчасти на месте, диски с горячей заменой, автоматизация и натренированные люди снижают MTTR и часто дешевле более надёжного железа.</p><p>Правило: MTBF — реже отказывать; MTTR — быстрее восстанавливаться.</p>`,
    },
    take: { en: `MTBF: how long until it breaks. MTTR: how long to fix it. Lower MTTR is often the cheaper win.`, ru: `MTBF — сколько до поломки. MTTR — сколько чинить. Снизить MTTR часто дешевле.` } },

  { id: 's12-015', kind: 'idea', k: ['d1-c7', 'd7-c8'], lvl: 2,
    title: { en: `Choosing a strategy: speed costs money`, ru: `Выбор стратегии: скорость стоит денег` },
    body: {
      en: `<p>Once the BIA has set the targets, each process gets a <b>recovery strategy</b>. Roughly, there are three ways to meet a target:</p><ul><li><b>prevent</b> the disruption: fire suppression, redundant power, patching;</li><li><b>tolerate</b> it: redundancy and high availability, so the failure doesn't stop the service at all;</li><li><b>recover</b> from it: backups and an alternate site to come back to.</li></ul><p>The faster the recovery, the more it costs. A standby site that takes over in seconds may cost as much as production; a contract for empty space costs little but takes weeks. The right answer is the cheapest option that meets the RTO and RPO, process by process, not one answer for everything.</p>`,
      ru: `<p>Когда BIA задал цели, каждому процессу выбирают <b>стратегию восстановления</b>. Грубо говоря, достичь цели можно тремя способами:</p><ul><li><b>предотвратить</b> сбой: пожаротушение, резервное питание, патчи;</li><li><b>выдержать</b> его: избыточность и высокая доступность, чтобы отказ вообще не останавливал сервис;</li><li><b>восстановиться</b>: резервные копии и альтернативная площадка, куда можно вернуться.</li></ul><p>Чем быстрее восстановление, тем дороже. Резервная площадка, принимающая нагрузку за секунды, может стоить как продуктив; договор на пустое помещение стоит мало, но занимает недели. Правильный ответ — самый дешёвый вариант, который выполняет RTO и RPO, для каждого процесса свой, а не один на всё.</p>`,
    },
    take: { en: `Prevent, tolerate or recover; pick the cheapest option that meets each process's RTO and RPO.`, ru: `Предотвратить, выдержать или восстановиться; выбирайте самое дешёвое, что выполняет RTO и RPO процесса.` } },

  { id: 's12-016', kind: 'picture', k: ['d7-c8'], lvl: 2,
    title: { en: `Recovery sites: time against cost`, ru: `Резервные площадки: время против стоимости` },
    body: {
      en: `<p>Each kind of alternate site trades money for speed. A <b>cold</b> site is a room with power and cooling; you bring everything else. A <b>warm</b> site has hardware and network, but data must be restored. A <b>hot</b> site has current data and can take over in hours. A <b>mirror</b> (redundant) site runs live all the time, sharing the load.</p>`,
      ru: `<p>Каждый вид альтернативной площадки меняет деньги на скорость. <b>Холодная</b> — помещение с питанием и охлаждением, всё остальное вы привозите. <b>Тёплая</b> — есть оборудование и сеть, но данные надо восстановить. <b>Горячая</b> — актуальные данные, принимает нагрузку за часы. <b>Зеркальная</b> (резервная) работает вживую всё время и делит нагрузку.</p>`,
    },
    dg: { title: { en: `Alternate sites by recovery time and cost`, ru: `Альтернативные площадки по времени и стоимости` }, h: 290,
      nodes: [
        ['cold', 110, 220, { en: 'Cold site', ru: 'Холодная' }, { en: 'weeks · €', ru: 'недели · €' }, '🧊', 'dim'],
        ['warm', 290, 160, { en: 'Warm site', ru: 'Тёплая' }, { en: 'days · €€', ru: 'дни · €€' }, '🌤️', 'ok'],
        ['hot', 470, 100, { en: 'Hot site', ru: 'Горячая' }, { en: 'hours · €€€', ru: 'часы · €€€' }, '🔥', 'key'],
        ['mirror', 650, 50, { en: 'Mirror site', ru: 'Зеркальная' }, { en: 'seconds · €€€€', ru: 'секунды · €€€€' }, '🪞', 'bad'],
      ],
      edges: [['cold', 'warm', '', 'dash'], ['warm', 'hot', '', 'dash'], ['hot', 'mirror', '', 'dash']],
      note: { en: `Faster recovery, higher cost: match the site to the RTO.`, ru: `Быстрее восстановление — дороже: подбирайте площадку под RTO.` } },
    take: { en: `Cold = weeks and cheap, warm = days, hot = hours, mirror = seconds and most expensive.`, ru: `Холодная — недели и дёшево, тёплая — дни, горячая — часы, зеркальная — секунды и дороже всех.` } },

  { id: 's12-017', kind: 'vs', k: ['d7-c8'], lvl: 2,
    title: { en: `Hot vs warm vs cold site`, ru: `Горячая, тёплая и холодная площадка` },
    body: {
      en: `<ul><li><b>Cold site</b>: space, power, cooling, maybe network cabling. No equipment. Cheapest; recovery takes weeks, because hardware must be bought and installed. Also the hardest to test.</li><li><b>Warm site</b>: equipment and connectivity in place, but data and recent software must be loaded. Recovery in a day or a few days. The common compromise.</li><li><b>Hot site</b>: fully equipped, data kept current by replication or frequent backups; staff only need to arrive and switch over. Recovery in hours. Expensive, and must be kept in step with every change in production.</li></ul><p>Rule: what's missing on arrival? Cold: everything but the room. Warm: the data. Hot: only the people.</p>`,
      ru: `<ul><li><b>Холодная</b>: помещение, питание, охлаждение, может быть кабели. Оборудования нет. Дешевле всего; восстановление занимает недели, потому что железо надо купить и установить. И труднее всего тестировать.</li><li><b>Тёплая</b>: оборудование и связь на месте, но данные и свежее ПО нужно загрузить. Восстановление за день или несколько. Обычный компромисс.</li><li><b>Горячая</b>: полностью оснащена, данные поддерживаются актуальными репликацией или частыми копиями; людям нужно только приехать и переключиться. Восстановление за часы. Дорого, и её нужно синхронизировать с каждым изменением продуктива.</li></ul><p>Правило: чего не хватает по прибытии? Холодной — всего, кроме помещения. Тёплой — данных. Горячей — только людей.</p>`,
    },
    take: { en: `What's missing when you arrive: cold = everything, warm = the data, hot = only the people.`, ru: `Чего не хватает по прибытии: холодной — всего, тёплой — данных, горячей — только людей.` } },

  { id: 's12-018', kind: 'vs', k: ['d7-c8'], lvl: 2,
    title: { en: `Mobile, mirror, reciprocal and cloud`, ru: `Мобильная, зеркальная, взаимная и облачная` },
    body: {
      en: `<ul><li><b>Mobile site</b>: equipment in trailers or containers, driven where needed. Useful after a regional disaster or for field operations.</li><li><b>Mirror / redundant site</b>: a second live site running all the time, often sharing the load. Near-zero downtime, at the cost of running two of everything.</li><li><b>Reciprocal agreement</b>: two organizations promise to host each other. Cheap, but rarely works: neither has spare capacity, the agreement is hard to enforce, and a regional disaster may hit both.</li><li><b>Cloud DR</b>: copies of systems and data in a cloud region, started only when needed. Often turns a warm site's cost into a cold site's, with a hot site's speed, if it's tested.</li></ul>`,
      ru: `<ul><li><b>Мобильная площадка</b>: оборудование в прицепах или контейнерах, которое везут туда, где нужно. Полезна после региональной катастрофы или для полевой работы.</li><li><b>Зеркальная / резервная</b>: вторая живая площадка, работающая всё время, часто делящая нагрузку. Почти нулевой простой ценой двух экземпляров всего.</li><li><b>Взаимное соглашение</b>: две организации обещают приютить друг друга. Дёшево, но редко работает: свободных мощностей нет ни у кого, договор трудно исполнить, а региональная катастрофа может задеть обоих.</li><li><b>Облачное DR</b>: копии систем и данных в облачном регионе, запускаемые только при необходимости. Часто даёт цену холодной площадки при скорости горячей, если это протестировано.</li></ul>`,
    },
    take: { en: `Mirror = two live sites; reciprocal deals rarely work; cloud DR can be cheap and fast if tested.`, ru: `Зеркальная — две живые площадки; взаимные соглашения редко работают; облачное DR дёшево и быстро, если проверено.` } },

  { id: 's12-019', kind: 'think', k: ['d7-c8', 'd1-c7'], lvl: 2,
    title: { en: `One site for everything?`, ru: `Одна площадка на всё?` },
    body: {
      en: `<p>A bank's BIA gives three results:</p><ul><li>card payment authorization: MTD 15 minutes;</li><li>the mortgage application system: MTD 3 days;</li><li>the archive of closed accounts, needed for legal requests: MTD 3 weeks.</li></ul><p>The infrastructure manager proposes one hot site for all three "to keep it simple". What would you suggest?</p>`,
      ru: `<p>BIA банка дал три результата:</p><ul><li>авторизация карточных платежей: MTD 15 минут;</li><li>система ипотечных заявок: MTD 3 дня;</li><li>архив закрытых счетов для юридических запросов: MTD 3 недели.</li></ul><p>Руководитель инфраструктуры предлагает одну горячую площадку для всех трёх, «чтобы было проще». Что вы предложите?</p>`,
    },
    reveal: {
      en: `<p>Match the strategy to each target. Payment authorization can't wait even for a hot site's hours: it needs <b>active-active</b> redundancy, two live sites or zones, so a failure is absorbed without anyone switching anything. Mortgages fit a <b>warm</b> site or cloud standby restored within a day or two. The archive needs only good <b>offsite backups</b> and a plan to restore them somewhere within weeks.</p><p>One hot site for everything overpays for the archive and still fails the payment target. Simplicity is worth something, but the BIA numbers decide.</p>`,
      ru: `<p>Подберите стратегию под каждую цель. Авторизация платежей не может ждать даже часов горячей площадки: ей нужна избыточность <b>active-active</b>, две живые площадки или зоны, чтобы отказ поглощался без всякого переключения. Ипотеке подходит <b>тёплая</b> площадка или облачный резерв с восстановлением за день-два. Архиву хватит хороших <b>копий вне площадки</b> и плана развернуть их где-нибудь за недели.</p><p>Одна горячая площадка на всё переплачивает за архив и всё равно не выполняет цель по платежам. Простота чего-то стоит, но решают цифры BIA.</p>`,
    },
    take: { en: `Different MTDs need different strategies: active-active, warm standby, offsite backups.`, ru: `Разным MTD — разные стратегии: active-active, тёплый резерв, копии вне площадки.` } },

  { id: 's12-020', kind: 'back', back: 's08-031', k: ['d3-c11', 'd7-c8', 'd7-c7'], lvl: 2,
    title: { en: `OVHcloud again: how far is far enough?`, ru: `Снова OVHcloud: насколько далеко — достаточно далеко?` },
    body: {
      en: `<p>In stage 8, customers whose backups sat in another building on the same Strasbourg campus lost them in the same fire.</p><p>Choosing a recovery site is site selection again, with one extra rule: it must not share the <b>same disaster</b> as the primary. Different flood plain, different power grid, different fault line, often a different region. But not so far that staff can't reach it, or that data can't be copied fast enough to meet the RPO, or that it falls under a different law the data isn't allowed to go to.</p><p>There's no single right distance; it comes from the threats your BIA and risk assessment found.</p>`,
      ru: `<p>На этапе 8 клиенты, чьи копии лежали в другом здании того же кампуса в Страсбурге, потеряли их в том же пожаре.</p><p>Выбор резервной площадки — снова выбор места, с одним дополнительным правилом: она не должна делить с основной <b>одну и ту же катастрофу</b>. Другая пойма, другая энергосеть, другой тектонический разлом, часто другой регион. Но не так далеко, чтобы люди не могли доехать, чтобы данные не успевали копироваться под RPO или чтобы площадка оказалась под другим правом, куда данным нельзя.</p><p>Единственно правильного расстояния нет: оно следует из угроз, найденных BIA и оценкой рисков.</p>`,
    },
    take: { en: `A recovery site must not share the primary's disaster, but must stay reachable and lawful.`, ru: `Резервная площадка не должна делить катастрофу с основной, но должна быть досягаемой и законной.` } },

  { id: 's12-021', kind: 'idea', k: ['d7-c8', 'd7-c9'], lvl: 2,
    title: { en: `High availability: failing without stopping`, ru: `Высокая доступность: отказать, не остановившись` },
    body: {
      en: `<p>Some services can't wait for any recovery. For them, the goal is that one failure doesn't stop the service at all:</p><ul><li><b>clustering</b>: several servers act as one; if one dies, the others carry on;</li><li><b>load balancing</b>: traffic is spread across servers, and a dead one is taken out of rotation;</li><li><b>failover</b>: a standby takes over automatically, active-passive or active-active;</li><li>redundant disks, power supplies, network links and zones underneath.</li></ul><p><b>High availability</b> handles failures. It doesn't handle bad changes, corruption or ransomware, which it spreads to every node instantly. That's still a job for backups and DR.</p>`,
      ru: `<p>Некоторые сервисы не могут ждать никакого восстановления. Для них цель — чтобы один отказ вообще не останавливал сервис:</p><ul><li><b>кластеризация</b>: несколько серверов работают как один; если один умер, остальные продолжают;</li><li><b>балансировка нагрузки</b>: трафик распределяется по серверам, а мёртвый выводится из ротации;</li><li><b>переключение (failover)</b>: резерв берёт работу автоматически, active-passive или active-active;</li><li>под этим — избыточные диски, блоки питания, сетевые каналы и зоны.</li></ul><p><b>Высокая доступность</b> справляется с отказами. С плохими изменениями, порчей данных и вымогателями она не справляется: она мгновенно разносит их на все узлы. Это по-прежнему работа резервных копий и DR.</p>`,
    },
    take: { en: `HA absorbs failures; it also spreads corruption. Backups and DR are still needed.`, ru: `Высокая доступность гасит отказы, но и разносит порчу. Копии и DR всё равно нужны.` } },

  { id: 's12-022', kind: 'back', back: 's08-035', k: ['d7-c9', 'd7-c7'], lvl: 2,
    title: { en: `RAID again: one layer of a much bigger stack`, ru: `Снова RAID: один слой гораздо большей стопки` },
    body: {
      en: `<p>In stage 8 someone said "we have RAID 6, so no backups", and the answer was no: RAID survives a dead disk, not a deleted file, a fire or ransomware.</p><p>Now put RAID in its place in the stack:</p><ol><li><b>RAID</b>: a disk fails, the server keeps running.</li><li><b>Clustering</b>: a server fails, the service keeps running.</li><li><b>Zones or a second site</b>: a building fails, the service moves.</li><li><b>Backups</b>: the data itself is damaged; go back in time.</li><li><b>Offline or immutable backups</b>: an attacker controls everything online; the last copy still survives.</li></ol><p>Each layer covers a failure the one above can't.</p>`,
      ru: `<p>На этапе 8 кто-то сказал «у нас RAID 6, значит копии не нужны», и ответ был «нет»: RAID переживает мёртвый диск, но не удалённый файл, пожар или вымогателя.</p><p>Теперь поставим RAID на место в стопке:</p><ol><li><b>RAID</b>: отказал диск — сервер работает.</li><li><b>Кластер</b>: отказал сервер — сервис работает.</li><li><b>Зоны или вторая площадка</b>: отказало здание — сервис переезжает.</li><li><b>Резервные копии</b>: повреждены сами данные — возвращаемся во времени.</li><li><b>Офлайн или неизменяемые копии</b>: злоумышленник управляет всем, что онлайн, — последняя копия всё равно выживает.</li></ol><p>Каждый слой закрывает отказ, который не закрывает предыдущий.</p>`,
    },
    take: { en: `RAID → cluster → second site → backups → offline copies: each layer covers a different failure.`, ru: `RAID → кластер → вторая площадка → копии → офлайн-копии: каждый слой закрывает свой отказ.` } },

  { id: 's12-023', kind: 'idea', k: ['d7-c8', 'd3-c5'], lvl: 2,
    title: { en: `Resilience in the cloud`, ru: `Устойчивость в облаке` },
    body: {
      en: `<p>Cloud providers offer building blocks: <b>availability zones</b> (separate data centres in one region, with their own power and cooling) and <b>regions</b> (far apart, often in different countries).</p><p>Spreading a service across zones protects against one building failing. Across regions, against a regional outage. But the provider doesn't do this for you: by the shared responsibility model, designing for resilience and backing up your data are usually <b>your</b> job.</p><p>Two traps: a backup kept in the same cloud account as production can be deleted by whoever takes over that account, and some outages hit a provider's shared services in every region at once.</p>`,
      ru: `<p>Облачные провайдеры дают строительные блоки: <b>зоны доступности</b> (отдельные дата-центры в одном регионе, со своим питанием и охлаждением) и <b>регионы</b> (далеко друг от друга, часто в разных странах).</p><p>Размещение сервиса по зонам защищает от отказа одного здания. По регионам — от регионального сбоя. Но провайдер не делает этого за вас: по модели разделённой ответственности проектировать устойчивость и делать копии данных обычно — <b>ваша</b> задача.</p><p>Две ловушки: копию в том же облачном аккаунте, что и продуктив, может удалить тот, кто захватит этот аккаунт, а некоторые сбои задевают общие сервисы провайдера сразу во всех регионах.</p>`,
    },
    take: { en: `Use zones and regions, but resilience and backups are your job; keep backups outside the production account.`, ru: `Используйте зоны и регионы, но устойчивость и копии — ваша задача; храните копии вне продуктивного аккаунта.` } },

  { id: 's12-024', kind: 'story', k: ['d7-c7', 'd7-c8'], lvl: 2,
    title: { en: `Code Spaces 2014: deleted in an afternoon`, ru: `Code Spaces 2014: удалена за один день` },
    body: {
      en: `<p>Code Spaces hosted source code for developers, entirely on Amazon Web Services. In June 2014 an attacker got into its AWS control panel and demanded a ransom.</p><p>When the staff tried to lock the attacker out, the attacker started deleting: servers, storage, machine images, and the <b>backups</b>, which lived in the same account and could be deleted with the same access.</p><p>Within about 12 hours most of the company's data and its customers' data was gone. Code Spaces announced it could no longer operate and closed. It had backups; they just weren't out of reach.</p>`,
      ru: `<p>Code Spaces хранила исходный код разработчиков, целиком на Amazon Web Services. В июне 2014 года злоумышленник проник в её панель управления AWS и потребовал выкуп.</p><p>Когда сотрудники попытались выставить его, он начал удалять: серверы, хранилища, образы машин и <b>резервные копии</b>, которые лежали в том же аккаунте и удалялись тем же доступом.</p><p>Примерно за 12 часов большая часть данных компании и её клиентов исчезла. Code Spaces объявила, что больше не может работать, и закрылась. Копии у неё были, просто не вне досягаемости.</p>`,
    },
    take: { en: `A backup that the same stolen access can delete isn't a backup when it matters.`, ru: `Копия, которую можно удалить тем же украденным доступом, — не копия, когда она нужна.` } },

  { id: 's12-025', kind: 'idea', k: ['d7-c7'], lvl: 1,
    title: { en: `Full, incremental, differential`, ru: `Полная, инкрементная, дифференциальная` },
    body: {
      en: `<ul><li>A <b>full backup</b> copies everything. Slow and large, but one copy restores it all.</li><li>An <b>incremental backup</b> copies only what changed since the <b>last backup of any kind</b>. Fast and small each night, but a restore needs the full backup plus every incremental since, in order.</li><li>A <b>differential backup</b> copies everything changed since the <b>last full backup</b>. It grows each day, but a restore needs only the full plus the latest differential.</li></ul><p>Behind the scenes, files carry an "archive bit" that says "changed since backed up". Full and incremental backups clear it; differential leaves it set, which is why each differential repeats the previous one's files.</p>`,
      ru: `<ul><li><b>Полная копия</b> копирует всё. Медленно и много, но одна копия восстанавливает всё.</li><li><b>Инкрементная</b> копирует только изменённое с <b>последней копии любого типа</b>. Быстро и мало каждую ночь, но для восстановления нужна полная плюс все инкрементные после неё, по порядку.</li><li><b>Дифференциальная</b> копирует всё изменённое с <b>последней полной</b>. Растёт каждый день, но для восстановления нужна только полная плюс последняя дифференциальная.</li></ul><p>За кулисами у файлов есть «архивный бит»: «изменён с последнего копирования». Полная и инкрементная копии его сбрасывают, дифференциальная — нет, поэтому каждая дифференциальная повторяет файлы предыдущей.</p>`,
    },
    take: { en: `Incremental: since the last backup, many pieces to restore. Differential: since the last full, two pieces.`, ru: `Инкрементная — с последней копии, много частей. Дифференциальная — с последней полной, две части.` } },

  { id: 's12-026', kind: 'picture', k: ['d7-c7'], lvl: 2,
    title: { en: `What a Thursday restore needs`, ru: `Что нужно для восстановления в четверг` },
    body: {
      en: `<p>A full backup runs on Sunday night. The server dies on Thursday morning. With <b>incrementals</b>, you restore Sunday's full and then Monday's, Tuesday's and Wednesday's, in order; if any one is missing or broken, the rest can't be applied. With <b>differentials</b>, you restore Sunday's full and Wednesday's differential, and that's all.</p>`,
      ru: `<p>Полная копия делается в воскресенье вечером. Сервер умирает в четверг утром. С <b>инкрементными</b> вы восстанавливаете воскресную полную, затем понедельничную, вторничную и средовую, по порядку; если одна потеряна или повреждена, остальные не применить. С <b>дифференциальными</b> — воскресную полную и средовую дифференциальную, и всё.</p>`,
    },
    dg: { title: { en: `Restore sets: incremental vs differential`, ru: `Наборы для восстановления: инкрементные и дифференциальные` }, h: 290,
      zones: [[15, 25, 730, 115, { en: 'Incremental', ru: 'Инкрементные' }, 'dmz'], [15, 160, 730, 115, { en: 'Differential', ru: 'Дифференциальные' }, 'trust']],
      nodes: [
        ['f1', 95, 90, { en: 'Sun full', ru: 'Вс полная' }, '', '💾', 'key', 110],
        ['i1', 255, 90, { en: 'Mon incr', ru: 'Пн инкр' }, '', '➕', 'ok', 110],
        ['i2', 415, 90, { en: 'Tue incr', ru: 'Вт инкр' }, '', '➕', 'ok', 110],
        ['i3', 575, 90, { en: 'Wed incr', ru: 'Ср инкр' }, '', '➕', 'ok', 110],
        ['f2', 95, 200, { en: 'Sun full', ru: 'Вс полная' }, '', '💾', 'key', 110],
        ['d1', 255, 245, { en: 'Mon diff', ru: 'Пн дифф' }, '', '➕', 'dim', 110],
        ['d2', 415, 245, { en: 'Tue diff', ru: 'Вт дифф' }, '', '➕', 'dim', 110],
        ['d3', 575, 200, { en: 'Wed diff', ru: 'Ср дифф' }, '', '➕', 'ok', 110],
      ],
      edges: [['f1', 'i1', '', 'ok'], ['i1', 'i2', '', 'ok'], ['i2', 'i3', '', 'ok'], ['f2', 'd3', { en: 'only these two', ru: 'только эти две' }, 'ok', 0, -20]],
      note: { en: `Incremental: fast backups, longer restores. Differential: the reverse.`, ru: `Инкрементные: быстрые копии, долгое восстановление. Дифференциальные — наоборот.` } },
    take: { en: `Incremental restore = full + every incremental; differential restore = full + the last differential.`, ru: `Инкрементные: полная + все инкрементные; дифференциальные: полная + последняя дифференциальная.` } },

  { id: 's12-027', kind: 'think', k: ['d7-c7', 'd1-c7'], lvl: 2,
    title: { en: `Which scheme for the file server?`, ru: `Какая схема для файлового сервера?` },
    body: {
      en: `<p>A file server holds 4 TB; about 50 GB changes each day. The backup window at night is 3 hours, enough for incrementals or early-week differentials but never for a full backup on weekdays. The RTO is 6 hours.</p><p>Incremental or differential? And what else would you check?</p>`,
      ru: `<p>Файловый сервер хранит 4 ТБ; каждый день меняется около 50 ГБ. Ночное окно для копирования — 3 часа: хватает на инкрементные или дифференциальные в начале недели, но никогда на полную в будни. RTO — 6 часов.</p><p>Инкрементные или дифференциальные? И что ещё вы проверите?</p>`,
    },
    reveal: {
      en: `<p>Either can work; the deciding question is the <b>restore</b>, not the backup. Differentials grow to about 300 GB by Saturday: check they still fit in the window. Incrementals stay small, but a Saturday restore needs six pieces, and the RTO depends on how fast they apply.</p><p>The things that really decide it: <b>measure an actual restore</b> against the 6-hour RTO, keep a copy offsite and one offline, and consider whether snapshots or a synthetic full (built from the pieces at the backup site) would shorten the restore. A scheme you've never restored from is a guess.</p>`,
      ru: `<p>Подойдут обе; решающий вопрос — <b>восстановление</b>, а не копирование. Дифференциальные к субботе вырастают примерно до 300 ГБ: проверьте, что они ещё укладываются в окно. Инкрементные остаются маленькими, но восстановление в субботу требует шести частей, и RTO зависит от того, как быстро они применяются.</p><p>Что решает на самом деле: <b>измерьте реальное восстановление</b> против RTO в 6 часов, держите копию вне площадки и одну офлайн, подумайте, не сократят ли восстановление снимки или синтетическая полная копия (собранная из частей на стороне хранилища). Схема, из которой ни разу не восстанавливали, — догадка.</p>`,
    },
    take: { en: `Choose the backup scheme by the restore you can prove, not by the backup window alone.`, ru: `Выбирайте схему копирования по доказанному восстановлению, а не только по окну копирования.` } },

  { id: 's12-028', kind: 'idea', k: ['d7-c7'], lvl: 1,
    title: { en: `3-2-1, and one more`, ru: `3-2-1 и ещё одна` },
    body: {
      en: `<p>The classic rule for backups is <b>3-2-1</b>:</p><ul><li><b>3</b> copies of the data (production plus two backups);</li><li>on <b>2</b> different types of media or storage;</li><li><b>1</b> of them offsite.</li></ul><p>Ransomware added a rule: at least one copy must be <b>offline or immutable</b>, so that an attacker with admin rights can't delete or encrypt it. That can be a tape on a shelf, a disconnected disk, or cloud storage with a <b>write once, read many (WORM)</b> lock that even the account owner can't lift before the date. Some add a "0": zero errors in the last restore test. That's 3-2-1-1-0.</p>`,
      ru: `<p>Классическое правило копирования — <b>3-2-1</b>:</p><ul><li><b>3</b> копии данных (продуктив плюс две копии);</li><li>на <b>2</b> разных типах носителей или хранилищ;</li><li><b>1</b> из них вне площадки.</li></ul><p>Вымогатели добавили правило: хотя бы одна копия должна быть <b>офлайн или неизменяемой</b>, чтобы злоумышленник с правами админа не мог её удалить или зашифровать. Это может быть лента на полке, отключённый диск или облачное хранилище с блокировкой <b>WORM (однократная запись, многократное чтение)</b>, которую до срока не снимет даже владелец аккаунта. Некоторые добавляют «0»: ноль ошибок в последнем тесте восстановления. Получается 3-2-1-1-0.</p>`,
    },
    take: { en: `3 copies, 2 media, 1 offsite, plus 1 offline or immutable, and 0 errors in the restore test.`, ru: `3 копии, 2 носителя, 1 вне площадки, плюс 1 офлайн или неизменяемая и 0 ошибок в тесте.` } },

  { id: 's12-029', kind: 'back', back: 's10-021', k: ['d7-c7', 'd8-c8'], lvl: 2,
    title: { en: `Ransomware again: the backups are the first target`, ru: `Снова вымогатели: копии — первая цель` },
    body: {
      en: `<p>Stage 10 showed ransomware growing up: steal the data, encrypt it, threaten to publish. A step it didn't name: before encrypting anything, modern gangs <b>look for the backups</b>.</p><p>They log into the backup console with stolen admin credentials, delete restore points, shorten retention, and wipe snapshots. Only then do they launch the encryption, so the victim has no way back but paying.</p><p>So the backup system needs its own protection: separate accounts with MFA, not joined to the main directory; alerts when retention changes or backups are deleted; and at least one copy that's offline or immutable. Backup admin credentials are crown jewels.</p>`,
      ru: `<p>Этап 10 показал, как повзрослели вымогатели: украсть данные, зашифровать, угрожать публикацией. Шаг, который он не назвал: прежде чем шифровать, современные группы <b>ищут резервные копии</b>.</p><p>Они входят в консоль резервного копирования с украденными правами админа, удаляют точки восстановления, сокращают срок хранения, стирают снимки. Только потом запускают шифрование, чтобы у жертвы не осталось пути назад, кроме оплаты.</p><p>Поэтому системе копирования нужна своя защита: отдельные учётки с MFA, не входящие в основной каталог; оповещения при изменении срока хранения или удалении копий; хотя бы одна копия офлайн или неизменяемая. Учётные данные админа копий — главная ценность.</p>`,
    },
    take: { en: `Attackers delete backups before they encrypt; isolate backup admin and keep one copy out of reach.`, ru: `Злоумышленники удаляют копии до шифрования; изолируйте админов копий и держите одну копию вне досягаемости.` } },

  { id: 's12-030', kind: 'vs', k: ['d7-c7', 'd2-c4'], lvl: 2,
    title: { en: `Snapshot vs replica vs backup vs archive`, ru: `Снимок, реплика, копия и архив` },
    body: {
      en: `<ul><li><b>Snapshot</b>: a point-in-time picture of a disk or volume, usually on the <b>same</b> storage. Instant to take and restore, but lost with the storage, and often deletable by the same admin.</li><li><b>Replica</b>: a live copy kept in step with the original. Great for availability; copies corruption too.</li><li><b>Backup</b>: an independent copy from a point in time, kept separately, for recovery. Kept for days to months.</li><li><b>Archive</b>: data moved out of production for <b>long-term retention</b>, often for legal reasons; the original may be deleted. Kept for years, rarely read.</li></ul><p>Rule: snapshots and replicas are for speed; backups are for recovery; archives are for retention.</p>`,
      ru: `<ul><li><b>Снимок</b>: картина диска или тома на момент времени, обычно на <b>том же</b> хранилище. Мгновенно делается и восстанавливается, но теряется вместе с хранилищем и часто удаляется тем же админом.</li><li><b>Реплика</b>: живая копия, синхронная с оригиналом. Отлично для доступности; копирует и порчу.</li><li><b>Резервная копия</b>: независимая копия на момент времени, хранится отдельно, для восстановления. Дни или месяцы.</li><li><b>Архив</b>: данные, вынесенные из продуктива для <b>долгого хранения</b>, часто по закону; оригинал может быть удалён. Годы, читается редко.</li></ul><p>Правило: снимки и реплики — для скорости, копии — для восстановления, архивы — для хранения.</p>`,
    },
    take: { en: `Snapshots and replicas are for speed, backups for recovery, archives for long-term retention.`, ru: `Снимки и реплики — для скорости, копии — для восстановления, архивы — для долгого хранения.` } },

  { id: 's12-031', kind: 'back', back: 's03-016', k: ['d2-c4', 'd7-c7'], lvl: 2,
    title: { en: `The data lifecycle again: backups live by the same rules`, ru: `Снова жизненный цикл данных: копии живут по тем же правилам` },
    body: {
      en: `<p>Stage 3 followed data from creation to destruction, with a control at every phase.</p><p>Backups are copies of that data, so they go through the same life: same classification, same encryption, same access limits. They also need the same <b>retention</b> rules. If personal data must be deleted after 2 years, a backup kept for 7 still holds it, and a legal hold may require keeping backups you'd otherwise overwrite.</p><p>Archives are the "archive" phase of the lifecycle. Backups are a safety net across all phases. Mixing them up, such as using 7-year backups as the archive, makes both expensive and hard to search.</p>`,
      ru: `<p>Этап 3 проследил данные от создания до уничтожения, с мерой на каждой фазе.</p><p>Резервные копии — копии этих данных, поэтому проходят ту же жизнь: та же классификация, то же шифрование, те же ограничения доступа. И те же правила <b>хранения</b>. Если персональные данные нужно удалить через 2 года, копия, хранящаяся 7 лет, всё ещё их содержит, а юридическое удержание может потребовать сохранить копии, которые иначе были бы перезаписаны.</p><p>Архивы — это фаза «архив» жизненного цикла. Копии — страховочная сетка через все фазы. Если их смешать, например использовать семилетние копии как архив, оба становятся дорогими и неудобными для поиска.</p>`,
    },
    take: { en: `Backups inherit the data's classification and retention rules; don't use backups as the archive.`, ru: `Копии наследуют классификацию и сроки хранения данных; не используйте копии как архив.` } },

  { id: 's12-032', kind: 'vs', k: ['d7-c7'], lvl: 3,
    title: { en: `Electronic vaulting vs remote journaling vs shadowing`, ru: `Электронное хранение, удалённое журналирование и теневая база` },
    body: {
      en: `<ul><li><b>Electronic vaulting</b>: whole backup files are sent over the network to an offsite location in <b>batches</b>, say every night. Replaces driving tapes to a vault.</li><li><b>Remote journaling</b>: the database's <b>transaction logs</b> are sent offsite, often many times an hour. Restoring means taking the last backup and replaying the journal. Much better RPO.</li><li><b>Database shadowing</b>: changes are applied <b>live</b> to a second copy of the database at another site, so it's always current. Best RPO and RTO, and like any replica it copies mistakes too.</li></ul><p>Rule: vaulting sends files, journaling sends transactions, shadowing keeps a live twin.</p>`,
      ru: `<ul><li><b>Электронное хранение (vaulting)</b>: файлы копий целиком отправляются по сети на внешнюю площадку <b>пакетами</b>, например каждую ночь. Заменяет перевозку лент в хранилище.</li><li><b>Удалённое журналирование</b>: на внешнюю площадку отправляются <b>журналы транзакций</b> базы, часто много раз в час. Восстановление — взять последнюю копию и проиграть журнал. Намного лучше RPO.</li><li><b>Теневая база (shadowing)</b>: изменения применяются <b>вживую</b> ко второй копии базы на другой площадке, и она всегда актуальна. Лучшие RPO и RTO, и, как любая реплика, копирует и ошибки.</li></ul><p>Правило: vaulting отправляет файлы, journaling — транзакции, shadowing держит живого двойника.</p>`,
    },
    take: { en: `Vaulting = batches of files; journaling = transaction logs; shadowing = a live copy of the database.`, ru: `Vaulting — пакеты файлов; journaling — журналы транзакций; shadowing — живая копия базы.` } },

  { id: 's12-033', kind: 'idea', k: ['d7-c7'], lvl: 2,
    title: { en: `Grandfather, father, son`, ru: `Дед, отец, сын` },
    body: {
      en: `<p>You can't keep every nightly backup forever, and you can't keep only last night's: corruption or an intruder may have been there for weeks. A <b>rotation scheme</b> keeps a spread of points in time.</p><p>The best known is <b>grandfather-father-son (GFS)</b>: daily backups (sons) are kept for a week, weekly ones (fathers) for a month or so, monthly ones (grandfathers) for a year or more. With a handful of media, you can go back one day, one week, or many months.</p><p>The choice matters for ransomware: attackers often sit inside for weeks before encrypting, so restoring needs a copy from before they arrived.</p>`,
      ru: `<p>Хранить каждую ночную копию вечно нельзя, но и одну вчерашнюю — тоже: порча или злоумышленник могли быть там неделями. <b>Схема ротации</b> держит разброс точек во времени.</p><p>Самая известная — <b>дед-отец-сын (GFS)</b>: ежедневные копии (сыновья) хранят неделю, еженедельные (отцы) — около месяца, ежемесячные (деды) — год и больше. С горсткой носителей можно вернуться на день, на неделю или на много месяцев.</p><p>Для вымогателей это важно: злоумышленники часто сидят внутри неделями перед шифрованием, и для восстановления нужна копия из времени до их появления.</p>`,
    },
    take: { en: `GFS rotation keeps daily, weekly and monthly points, so you can go back before the problem began.`, ru: `Ротация GFS хранит ежедневные, еженедельные и ежемесячные точки, чтобы вернуться до начала проблемы.` } },

  { id: 's12-034', kind: 'back', back: 's06-049', k: ['d3-c6', 'd7-c7', 'd3-c9'], lvl: 2,
    title: { en: `Keys again: an encrypted backup and its key`, ru: `Снова ключи: зашифрованная копия и её ключ` },
    body: {
      en: `<p>Stage 6 said the algorithm is the easy part; the keys are hard.</p><p>Backups leave the building, so they should be encrypted, usually with AES. That moves the problem to the key:</p><ul><li>if the key exists only on the backup server, a fire or ransomware takes the key with the data, and every copy is useless;</li><li>if the key sits next to the tapes, encryption protects nothing.</li></ul><p>So the key is stored separately, in a key management system or HSM, with an escrowed copy at the recovery site or in a safe, under dual control. And the restore test proves the key works, not just the media.</p>`,
      ru: `<p>Этап 6 говорил: алгоритм — простая часть, ключи — трудная.</p><p>Копии покидают здание, поэтому их шифруют, обычно AES. Это переносит проблему на ключ:</p><ul><li>если ключ есть только на сервере копирования, пожар или вымогатель заберут ключ вместе с данными, и все копии бесполезны;</li><li>если ключ лежит рядом с лентами, шифрование ничего не защищает.</li></ul><p>Поэтому ключ хранят отдельно, в системе управления ключами или HSM, с депонированной копией на резервной площадке или в сейфе, под двойным контролем. А тест восстановления доказывает, что работает ключ, а не только носитель.</p>`,
    },
    take: { en: `Encrypt backups and keep the key separately, escrowed, under dual control; test it in restores.`, ru: `Шифруйте копии, ключ храните отдельно, с депонированием и двойным контролем; проверяйте его при восстановлении.` } },

  { id: 's12-035', kind: 'story', k: ['d7-c7', 'd7-c10'], lvl: 2,
    title: { en: `GitLab 2017: five backups, none working`, ru: `GitLab 2017: пять способов копирования, ни один не работал` },
    body: {
      en: `<p>On 31 January 2017, late at night, a tired GitLab engineer fighting a database problem ran a delete command on what he thought was the secondary server. It was the primary. About 300 GB of production data vanished in seconds.</p><p>Then the team checked the backups. Nightly database dumps had been failing silently because of a version mismatch; the failure alerts had been rejected by the mail system. Disk snapshots weren't enabled for those servers. Of five backup and replication methods, none gave a usable copy.</p><p>What saved them was a snapshot taken six hours earlier, by chance, for a test environment. GitLab lost six hours of data, and streamed the recovery live.</p>`,
      ru: `<p>31 января 2017 года поздно ночью уставший инженер GitLab, сражавшийся с проблемой базы данных, выполнил команду удаления на сервере, который считал вторичным. Это был основной. Около 300 ГБ продуктивных данных исчезли за секунды.</p><p>Затем команда проверила копии. Ночные дампы базы тихо падали из-за несовпадения версий; оповещения об ошибке отклоняла почтовая система. Снимки дисков для этих серверов не были включены. Из пяти способов копирования и репликации ни один не дал пригодной копии.</p><p>Спас снимок, сделанный за шесть часов до этого случайно, для тестовой среды. GitLab потерял шесть часов данных и транслировал восстановление в прямом эфире.</p>`,
    },
    take: { en: `Backups nobody restores from fail silently; GitLab was saved by an accident, not a plan.`, ru: `Копии, из которых не восстанавливают, ломаются молча; GitLab спасла случайность, а не план.` } },

  { id: 's12-036', kind: 'back', back: 's09-061', k: ['d7-c7', 'd7-c10', 'd6-c5'], lvl: 2,
    title: { en: `The green dashboard again: proving a restore`, ru: `Снова зелёная панель: как доказать восстановление` },
    body: {
      en: `<p>In stage 9 a backup dashboard had been green for three years, and nobody had ever restored from it. GitLab shows where that ends.</p><p>A real restore test:</p><ul><li>restores to a separate environment, on a schedule, without warning the people who run backups;</li><li>covers a random sample of systems, and the critical ones every time;</li><li>checks the result works: the application starts, the data is complete and recent enough for the RPO;</li><li>measures the time taken against the RTO;</li><li>uses the procedure as written, by someone other than its author.</li></ul><p>The metric that matters isn't "backups succeeded"; it's "restores succeeded, within RTO".</p>`,
      ru: `<p>На этапе 9 панель копирования три года была зелёной, и никто ни разу из неё не восстанавливал. GitLab показывает, чем это кончается.</p><p>Настоящий тест восстановления:</p><ul><li>восстанавливает в отдельную среду, по расписанию, без предупреждения тех, кто делает копии;</li><li>охватывает случайную выборку систем и каждый раз — критичные;</li><li>проверяет, что результат работает: приложение запускается, данные полны и достаточно свежи для RPO;</li><li>измеряет затраченное время против RTO;</li><li>идёт по написанной процедуре, и выполняет её не автор.</li></ul><p>Важна не метрика «копии прошли», а «восстановления прошли, в пределах RTO».</p>`,
    },
    take: { en: `Measure restores, not backups: regular, unannounced, timed against RTO, checked against RPO.`, ru: `Измеряйте восстановления, а не копии: регулярно, без предупреждения, по времени против RTO и RPO.` } },

  { id: 's12-037', kind: 'story', k: ['d1-c7', 'd1-c13'], lvl: 2,
    title: { en: `Thailand 2011: when the supplier is under water`, ru: `Таиланд 2011: когда поставщик под водой` },
    body: {
      en: `<p>In autumn 2011, months of floods in Thailand swamped industrial parks north of Bangkok. A large share of the world's hard drives, and many of their parts, were made there. Western Digital's factories were flooded; car makers such as Honda stopped production lines in Thailand and abroad for lack of parts.</p><p>Hard drive prices roughly doubled within weeks, and shortages lasted into 2012. Companies that had planned for their own buildings flooding found the disaster was at a supplier, two or three links down the chain, in a country they'd never thought about.</p>`,
      ru: `<p>Осенью 2011 года многомесячные наводнения в Таиланде затопили промышленные парки к северу от Бангкока. Там производилась большая доля жёстких дисков мира и многих их деталей. Заводы Western Digital ушли под воду; автопроизводители вроде Honda остановили линии в Таиланде и за рубежом из-за нехватки деталей.</p><p>Цены на жёсткие диски примерно удвоились за несколько недель, дефицит продлился до 2012 года. Компании, планировавшие на случай затопления своих зданий, обнаружили, что катастрофа случилась у поставщика, в двух-трёх звеньях вниз по цепочке, в стране, о которой они не думали.</p>`,
    },
    take: { en: `Your continuity depends on your suppliers' continuity, several links down.`, ru: `Ваша непрерывность зависит от непрерывности поставщиков, на несколько звеньев вниз.` } },

  { id: 's12-038', kind: 'idea', k: ['d1-c13', 'd1-c7'], lvl: 2,
    title: { en: `Suppliers in the continuity plan`, ru: `Поставщики в плане непрерывности` },
    body: {
      en: `<p>Every critical dependency on a supplier belongs in the BIA, and gets a strategy:</p><ul><li><b>ask for their BCP</b> and test results, and match their recovery times against yours; a SaaS with a 24-hour RTO can't support your 4-hour MTD;</li><li>put recovery commitments in the <b>contract</b>: service levels, notification, priority in a shortage;</li><li>keep a <b>second source</b> for what can't wait, or stock spares;</li><li>know who they depend on: a cloud region, a single factory;</li><li>plan for the supplier simply disappearing: source code escrow, data export, exit plans.</li></ul>`,
      ru: `<p>Каждая критичная зависимость от поставщика входит в BIA и получает стратегию:</p><ul><li><b>запросите их BCP</b> и результаты тестов и сверьте их сроки восстановления со своими: SaaS с RTO 24 часа не обеспечит ваш MTD в 4 часа;</li><li>запишите обязательства по восстановлению в <b>договор</b>: уровни сервиса, уведомления, приоритет при дефиците;</li><li>держите <b>второй источник</b> для того, что не может ждать, или запас;</li><li>знайте, от кого зависят они: облачный регион, единственный завод;</li><li>планируйте на случай, если поставщик просто исчезнет: депонирование кода, выгрузка данных, план выхода.</li></ul>`,
    },
    take: { en: `Check suppliers' recovery times against yours, contract for them, and keep a second source or exit plan.`, ru: `Сверьте сроки восстановления поставщиков со своими, закрепите их в договоре, держите второй источник или план выхода.` } },

  { id: 's12-039', kind: 'back', back: 's08-038', k: ['d7-c11', 'd1-c7'], lvl: 2,
    title: { en: `People first again: Rick Rescorla's drills`, ru: `Снова люди прежде всего: учения Рика Рескорлы` },
    body: {
      en: `<p>Stage 8 said life safety comes before everything, and evacuation must be practised.</p><p>Rick Rescorla was head of security for Morgan Stanley's offices in the World Trade Center. After the 1993 bombing there, he made thousands of employees practise evacuation regularly, down the stairs, even when people complained it was a waste of time.</p><p>On 11 September 2001, when the first plane hit the North Tower, he ignored an announcement to stay at desks and ordered his staff in the South Tower out. About 2,700 people left; all but 13 Morgan Stanley employees survived. Rescorla went back in to help others and was among those who died.</p>`,
      ru: `<p>Этап 8 говорил, что безопасность жизни — прежде всего и эвакуацию нужно отрабатывать.</p><p>Рик Рескорла возглавлял безопасность офисов Morgan Stanley во Всемирном торговом центре. После взрыва там в 1993 году он заставлял тысячи сотрудников регулярно отрабатывать эвакуацию по лестницам, даже когда люди жаловались, что это пустая трата времени.</p><p>11 сентября 2001 года, когда первый самолёт врезался в Северную башню, он пренебрёг объявлением оставаться на местах и приказал своим сотрудникам в Южной башне выходить. Ушли около 2700 человек; погибли лишь 13 сотрудников Morgan Stanley. Рескорла вернулся помогать другим и был среди погибших.</p>`,
    },
    take: { en: `Practised evacuation saves lives; people come first in every continuity plan.`, ru: `Отработанная эвакуация спасает жизни; в любом плане непрерывности люди прежде всего.` } },

  { id: 's12-040', kind: 'idea', k: ['d7-c11', 'd1-c7', 'd1-c8'], lvl: 2,
    title: { en: `People in the plan, not only systems`, ru: `Люди в плане, а не только системы` },
    body: {
      en: `<p>A plan that restores every server but has nobody who can run it hasn't worked. Continuity planning covers people too:</p><ul><li><b>key-person risk</b>: the one engineer who knows the payment integration. Cross-train, document, and don't let critical knowledge live in one head;</li><li><b>succession</b>: who decides if the CEO and the deputy are both unreachable;</li><li><b>call trees</b> and contact lists, kept up to date and available offline;</li><li>people's own needs in a disaster: their families, transport, pay, rest. Staff who are worried about their homes won't run a recovery for 20 hours straight.</li></ul>`,
      ru: `<p>План, который восстанавливает все серверы, но некому их вести, не сработал. Планирование непрерывности охватывает и людей:</p><ul><li><b>риск ключевого человека</b>: единственный инженер, знающий интеграцию платежей. Обучайте других, документируйте, не давайте критичным знаниям жить в одной голове;</li><li><b>преемственность</b>: кто решает, если недоступны и генеральный директор, и заместитель;</li><li><b>деревья оповещения</b> и списки контактов, актуальные и доступные офлайн;</li><li>собственные нужды людей в катастрофе: семьи, транспорт, зарплата, отдых. Сотрудники, тревожащиеся о доме, не будут восстанавливать системы 20 часов подряд.</li></ul>`,
    },
    take: { en: `Plan for people: no single points of knowledge, clear succession, offline contacts, and care for staff.`, ru: `Планируйте людей: без единственных носителей знаний, ясная преемственность, офлайн-контакты и забота о сотрудниках.` } },

  { id: 's12-041', kind: 'story', k: ['d1-c7', 'd4-c9'], lvl: 2,
    title: { en: `March 2020: everyone works from home, at once`, ru: `Март 2020: все работают из дома, сразу` },
    body: {
      en: `<p>Many continuity plans had a pandemic scenario. Most imagined it as staff absence: 30% off sick, critical teams split into shifts.</p><p>COVID-19 brought something else in March 2020: the buildings were fine, the people were fine, but almost everyone had to work from home within days. VPN gateways sized for a tenth of staff collapsed. Laptops ran out. Processes that needed a signature on paper, a visit to the server room or a token handed out at the office stopped.</p><p>The organizations that coped best had a plan that focused on <b>outcomes</b>, not one scenario, and had already moved to cloud services and remote access.</p>`,
      ru: `<p>Во многих планах непрерывности был сценарий пандемии. Большинство представляло его как отсутствие персонала: 30% на больничном, критичные команды разбиты на смены.</p><p>COVID-19 в марте 2020 года принёс другое: здания в порядке, люди в порядке, но почти все за несколько дней должны работать из дома. VPN-шлюзы, рассчитанные на десятую часть сотрудников, рухнули. Ноутбуки закончились. Процессы, требовавшие подписи на бумаге, визита в серверную или токена, выдаваемого в офисе, встали.</p><p>Лучше всех справились организации, чей план был сосредоточен на <b>результатах</b>, а не на одном сценарии, и которые уже перешли на облачные сервисы и удалённый доступ.</p>`,
    },
    take: { en: `Plan for losing a capability (the office, the staff, a system), not for one specific scenario.`, ru: `Планируйте потерю возможности (офиса, людей, системы), а не один конкретный сценарий.` } },

  { id: 's12-042', kind: 'back', back: 's05-054', k: ['d4-c9', 'd1-c7'], lvl: 2,
    title: { en: `VPNs again: built for some, needed by all`, ru: `Снова VPN: строили для некоторых, понадобился всем` },
    body: {
      en: `<p>Stage 5 described the VPN as a private corridor across the internet, with full or split tunnelling.</p><p>In a continuity plan, remote access is a <b>dependency</b> like any other, with a capacity to plan:</p><ul><li>licences and gateways sized for the scenario where everyone is remote, or able to grow quickly;</li><li>split tunnelling decided in advance, as a risk choice, not in a panic;</li><li>MFA that works without the office: no tokens handed out at the front desk;</li><li>alternatives that don't need the corridor at all: SaaS behind single sign-on and zero trust access.</li></ul><p>During March 2020, attackers went straight for unpatched VPN appliances. Emergency capacity still needs patching.</p>`,
      ru: `<p>Этап 5 описал VPN как частный коридор через интернет, с полным или раздельным туннелем.</p><p>В плане непрерывности удалённый доступ — такая же <b>зависимость</b>, как любая другая, с мощностью, которую надо планировать:</p><ul><li>лицензии и шлюзы под сценарий, где удалённо работают все, или с возможностью быстро нарастить;</li><li>раздельный туннель решён заранее, как выбор по риску, а не в панике;</li><li>MFA, которая работает без офиса: никаких токенов, выдаваемых на ресепшене;</li><li>альтернативы, которым коридор вовсе не нужен: SaaS за единым входом и доступ по модели zero trust.</li></ul><p>В марте 2020 года злоумышленники сразу пошли на непропатченные VPN-устройства. Аварийная мощность тоже требует патчей.</p>`,
    },
    take: { en: `Remote access is a continuity dependency: size it for everyone, decide tunnelling early, keep it patched.`, ru: `Удалённый доступ — зависимость непрерывности: на всех, туннель решён заранее, патчи вовремя.` } },

  { id: 's12-043', kind: 'think', k: ['d7-c10', 'd8-c8'], lvl: 2,
    title: { en: `Where's the plan?`, ru: `Где план?` },
    body: {
      en: `<p>Ransomware has encrypted the company's file servers, email and intranet. The recovery manager says: "Fine, we have a DR plan. It's on the intranet, in the IT folder, with all the contact numbers and the restore procedures."</p><p>What's the problem, and how should it have been done?</p>`,
      ru: `<p>Вымогатель зашифровал файловые серверы, почту и интранет компании. Руководитель восстановления говорит: «Ничего, у нас есть план DR. Он в интранете, в папке ИТ, со всеми телефонами и процедурами восстановления».</p><p>В чём проблема и как надо было сделать?</p>`,
    },
    reveal: {
      en: `<p>The plan is locked inside the disaster it's meant to solve. A DR plan must be available <b>when everything it describes is down</b>.</p><p>Keep current copies where the incident can't reach them: printed in the recovery binder, at the alternate site, in a separate cloud service or on encrypted devices held by key people, with contact lists, passwords for break-glass accounts kept under dual control, and vendor support numbers. Include "the plan is unavailable" in tests: in a tabletop exercise, take away the intranet and see who can still find the procedure.</p>`,
      ru: `<p>План заперт внутри катастрофы, которую должен решать. План DR должен быть доступен, <b>когда всё, что он описывает, лежит</b>.</p><p>Держите актуальные копии там, куда инцидент не дотянется: распечатанными в папке восстановления, на альтернативной площадке, в отдельном облачном сервисе или на зашифрованных устройствах ключевых людей, вместе со списками контактов, паролями аварийных учёток под двойным контролем и телефонами поддержки поставщиков. Включите «план недоступен» в тесты: на настольном учении отключите интранет и посмотрите, кто всё ещё найдёт процедуру.</p>`,
    },
    take: { en: `Keep the DR plan where the disaster can't reach it: printed, offsite, in a separate service.`, ru: `Храните план DR там, куда катастрофа не дотянется: на бумаге, вне площадки, в отдельном сервисе.` } },

  { id: 's12-044', kind: 'idea', k: ['d7-c10'], lvl: 2,
    title: { en: `What a DR plan contains`, ru: `Что содержит план DR` },
    body: {
      en: `<p>A disaster recovery plan is written to be used by tired people under pressure, so it's practical, not literary:</p><ul><li><b>activation criteria</b>: what counts as a disaster, and who can declare it;</li><li>roles and teams, with deputies, and an up-to-date <b>call tree</b>;</li><li>the <b>recovery order</b>, from the BIA, with the dependencies;</li><li>step-by-step procedures per system, with the RTO and RPO each must meet;</li><li>where the backups, keys and alternate site are, and how to reach them;</li><li>communication: who tells whom, by which channel;</li><li>how to return to the primary site.</li></ul><p>Different readers get different parts: the executive summary, a team's checklist, a technician's procedure.</p>`,
      ru: `<p>План аварийного восстановления пишут для уставших людей под давлением, поэтому он практичный, а не литературный:</p><ul><li><b>критерии активации</b>: что считается катастрофой и кто может её объявить;</li><li>роли и команды с заместителями и актуальное <b>дерево оповещения</b>;</li><li><b>порядок восстановления</b> по BIA, с зависимостями;</li><li>пошаговые процедуры для каждой системы, с RTO и RPO, которые она должна выполнить;</li><li>где копии, ключи и альтернативная площадка и как до них добраться;</li><li>связь: кто, кому и по какому каналу сообщает;</li><li>как вернуться на основную площадку.</li></ul><p>Разным читателям — разные части: краткое резюме для руководства, чек-лист команды, процедура техника.</p>`,
    },
    take: { en: `Activation criteria, roles, recovery order, procedures, locations, communications, return: practical and short.`, ru: `Критерии активации, роли, порядок, процедуры, места, связь, возврат: практично и коротко.` } },

  { id: 's12-045', kind: 'picture', k: ['d7-c10'], lvl: 2,
    title: { en: `The disaster recovery process`, ru: `Процесс аварийного восстановления` },
    body: {
      en: `<p>A disaster is <b>declared</b>, by someone with the authority. The plan is <b>activated</b> and people notified. The <b>recovery team</b> brings critical functions back at the alternate site, in BIA order. Meanwhile the <b>salvage team</b> repairs the primary site. Finally, operations <b>return</b>, and the disaster is closed only after lessons are captured.</p>`,
      ru: `<p>Катастрофу <b>объявляет</b> тот, у кого есть полномочия. План <b>активируется</b>, людей оповещают. <b>Команда восстановления</b> поднимает критичные функции на альтернативной площадке в порядке BIA. Тем временем <b>команда спасения</b> восстанавливает основную площадку. В конце операции <b>возвращаются</b>, и катастрофа закрывается только после разбора уроков.</p>`,
    },
    dg: { title: { en: `From declaration to return`, ru: `От объявления до возврата` }, h: 300,
      nodes: [
        ['decl', 110, 70, { en: 'Declare', ru: 'Объявить' }, { en: 'authorized person', ru: 'уполномоченный' }, '📣', 'bad'],
        ['act', 380, 70, { en: 'Activate & notify', ru: 'Активировать, оповестить' }, { en: 'call tree', ru: 'дерево оповещения' }, '📞', 'key'],
        ['rec', 650, 70, { en: 'Recover', ru: 'Восстановить' }, { en: 'alternate site, BIA order', ru: 'резервная площадка, порядок BIA' }, '🛠️', 'ok'],
        ['salv', 650, 230, { en: 'Salvage', ru: 'Спасение' }, { en: 'repair primary site', ru: 'ремонт основной' }, '🏗️', 'dim'],
        ['ret', 380, 230, { en: 'Return', ru: 'Возврат' }, { en: 'least critical first', ru: 'сначала наименее критичное' }, '↩️', 'ok'],
        ['less', 110, 230, { en: 'Lessons learned', ru: 'Уроки' }, { en: 'update the plan', ru: 'обновить план' }, '📝', 'key'],
      ],
      edges: [['decl', 'act', '', 'ok'], ['act', 'rec', '', 'ok'], ['rec', 'salv', { en: 'in parallel', ru: 'параллельно' }, 'dash'], ['salv', 'ret', '', 'ok'], ['ret', 'less', '', 'ok']],
      note: { en: `Recovery and salvage are different teams working at the same time.`, ru: `Восстановление и спасение — разные команды, работающие одновременно.` } },
    take: { en: `Declare, activate, recover at the alternate site, salvage the primary, return, learn.`, ru: `Объявить, активировать, восстановиться на резервной, спасти основную, вернуться, извлечь уроки.` } },

  { id: 's12-046', kind: 'vs', k: ['d7-c10'], lvl: 2,
    title: { en: `Recovery team vs salvage team`, ru: `Команда восстановления и команда спасения` },
    body: {
      en: `<ul><li><b>Recovery team</b>: gets the critical business functions running again at the <b>alternate</b> site as fast as possible, following the recovery order. Measured against the RTO.</li><li><b>Salvage team</b>: goes to the <b>damaged primary</b> site, once it's safe. Assesses the damage, works with insurers, saves what can be saved, repairs or rebuilds, and declares the site ready for return. Measured on making the primary site safe and reliable again.</li></ul><p>They're kept separate because the skills and pressures differ: one is a sprint under time pressure; the other is careful work where rushing can destroy evidence or put people at risk.</p>`,
      ru: `<ul><li><b>Команда восстановления</b>: как можно быстрее поднимает критичные функции бизнеса на <b>альтернативной</b> площадке, по порядку восстановления. Её мерило — RTO.</li><li><b>Команда спасения (salvage)</b>: идёт на <b>повреждённую основную</b> площадку, когда там безопасно. Оценивает ущерб, работает со страховщиками, спасает, что можно, ремонтирует или восстанавливает и объявляет площадку готовой к возврату. Её мерило — сделать основную площадку снова безопасной и надёжной.</li></ul><p>Их разделяют, потому что навыки и давление разные: одно — спринт под давлением времени, другое — аккуратная работа, где спешка может уничтожить доказательства или подвергнуть людей опасности.</p>`,
    },
    take: { en: `Recovery team: alternate site, fast. Salvage team: primary site, careful.`, ru: `Команда восстановления — резервная площадка, быстро. Команда спасения — основная площадка, аккуратно.` } },

  { id: 's12-047', kind: 'think', k: ['d7-c10'], lvl: 2,
    title: { en: `Moving home`, ru: `Переезд домой` },
    body: {
      en: `<p>After a flood, a company has been running from its warm site for three weeks. The salvage team says the main data centre is repaired and tested. The CIO wants to move everything back this weekend, "starting with the most important systems, so they get the best infrastructure first."</p><p>Is that the right order?</p>`,
      ru: `<p>После наводнения компания три недели работает с тёплой площадки. Команда спасения говорит, что основной дата-центр отремонтирован и проверен. ИТ-директор хочет перенести всё обратно в эти выходные, «начиная с самых важных систем, чтобы им первыми досталась лучшая инфраструктура».</p><p>Это правильный порядок?</p>`,
    },
    reveal: {
      en: `<p>No: move the <b>least critical</b> functions back first. The repaired site is unproven under real load. If something is still wrong with power, cooling or the network, you want to find out with the canteen menu system, not with payments.</p><p>Critical systems stay at the alternate site, which is known to work, until the primary has proven itself. The emergency isn't over until the last function is back and stable at the primary site, and the alternate site is ready for the next disaster. Doing it all in one weekend also multiplies risk; stage it.</p>`,
      ru: `<p>Нет: обратно первыми переносят <b>наименее критичные</b> функции. Отремонтированная площадка не проверена реальной нагрузкой. Если с питанием, охлаждением или сетью ещё что-то не так, лучше узнать это на системе меню столовой, а не на платежах.</p><p>Критичные системы остаются на альтернативной площадке, которая точно работает, пока основная себя не докажет. Чрезвычайная ситуация не закончена, пока последняя функция не вернулась и не работает стабильно на основной, а альтернативная площадка не готова к следующей катастрофе. Переносить всё за одни выходные — умножать риск; делайте поэтапно.</p>`,
    },
    take: { en: `Return least critical first; the disaster ends when everything is stable back home.`, ru: `Возвращайте сначала наименее критичное; катастрофа кончается, когда всё стабильно дома.` } },

  { id: 's12-048', kind: 'idea', k: ['d7-c10', 'd7-c4'], lvl: 2,
    title: { en: `Declaring a disaster`, ru: `Объявление катастрофы` },
    body: {
      en: `<p>Switching to an alternate site is expensive and disruptive, so nobody wants to do it too early. Waiting too long is worse: the MTD runs out while people hope the problem fixes itself.</p><p>The plan removes the guesswork with written <b>declaration criteria</b>: for example, "the primary site will be unavailable for longer than the RTO", or "the data centre is physically inaccessible". It names who may declare, with deputies, so the decision doesn't wait for one person on a plane.</p><p>A security incident can become a disaster: ransomware that takes out most systems is handled by both the incident response and the DR plans, which must hand over cleanly.</p>`,
      ru: `<p>Переход на альтернативную площадку дорог и болезнен, поэтому никто не хочет делать это слишком рано. Ждать слишком долго хуже: MTD истекает, пока люди надеются, что проблема решится сама.</p><p>План убирает гадание письменными <b>критериями объявления</b>: например, «основная площадка будет недоступна дольше RTO» или «к дата-центру нет физического доступа». Он называет, кто может объявить, с заместителями, чтобы решение не ждало одного человека в самолёте.</p><p>Инцидент безопасности может стать катастрофой: вымогатель, положивший большую часть систем, ведут и план реагирования, и план DR, и передача между ними должна быть чёткой.</p>`,
    },
    take: { en: `Written declaration criteria and named deputies stop the MTD running out while people hesitate.`, ru: `Письменные критерии и названные заместители не дают MTD истечь, пока люди колеблются.` } },

  { id: 's12-049', kind: 'back', back: 's10-033', k: ['d7-c4', 'd7-c10', 'd8-c8'], lvl: 2,
    title: { en: `Recovery again: when incident response and DR meet`, ru: `Снова восстановление: где встречаются реагирование и DR` },
    body: {
      en: `<p>Stage 10 said recovery after an incident means clean sources, the right order, verification, and close watching.</p><p>After ransomware, DR gains a new question it doesn't face after a fire: <b>is the backup itself clean?</b> The attacker may have been inside for weeks, so the latest backup can contain their tools, accounts or backdoors.</p><p>So the two teams work together. Incident response finds out when the attacker first got in and what they changed. DR picks a restore point from before that, restores into an isolated network, and lets the IR team check it before it rejoins. A fire is over when the flames are out; an intruder may still be inside.</p>`,
      ru: `<p>Этап 10 говорил: восстановление после инцидента — это чистые источники, правильный порядок, проверка и пристальное наблюдение.</p><p>После вымогателя у DR появляется вопрос, которого нет после пожара: <b>чиста ли сама копия?</b> Злоумышленник мог быть внутри неделями, и последняя копия может содержать его инструменты, учётки или бэкдоры.</p><p>Поэтому две команды работают вместе. Реагирование выясняет, когда злоумышленник впервые проник и что изменил. DR выбирает точку восстановления до этого, восстанавливает в изолированную сеть и даёт команде реагирования проверить результат, прежде чем вернуть его в сеть. Пожар кончается, когда потушено пламя; злоумышленник может быть всё ещё внутри.</p>`,
    },
    take: { en: `After an attack, restore from before the intrusion, into isolation, and let IR check it first.`, ru: `После атаки восстанавливайте с точки до проникновения, в изоляции, и дайте IR сначала проверить.` } },

  { id: 's12-050', kind: 'vs', k: ['d7-c10'], lvl: 1,
    title: { en: `Five ways to test a plan`, ru: `Пять способов проверить план` },
    body: {
      en: `<ol><li><b>Read-through (checklist)</b>: each team reviews the plan on its own and checks contacts and steps are current.</li><li><b>Structured walk-through (tabletop)</b>: the teams meet and talk through a scenario, step by step, without touching systems.</li><li><b>Simulation</b>: a more realistic rehearsal of a specific scenario, possibly with some systems or a site involved, but production keeps running normally.</li><li><b>Parallel test</b>: systems are actually brought up at the alternate site and process real data, while the primary keeps running.</li><li><b>Full interruption</b>: the primary is shut down and operations move to the alternate site. The only full proof, and the riskiest.</li></ol>`,
      ru: `<ol><li><b>Прочтение (по чек-листу)</b>: каждая команда сама просматривает план и проверяет, что контакты и шаги актуальны.</li><li><b>Структурированный разбор (настольное учение)</b>: команды встречаются и проговаривают сценарий шаг за шагом, не трогая системы.</li><li><b>Симуляция</b>: более реалистичная репетиция конкретного сценария, возможно с участием части систем или площадки, но продуктив работает как обычно.</li><li><b>Параллельный тест</b>: системы действительно поднимают на альтернативной площадке и обрабатывают реальные данные, пока основная продолжает работать.</li><li><b>Полное прерывание</b>: основную площадку отключают, и работа переходит на альтернативную. Единственное полное доказательство и самое рискованное.</li></ol>`,
    },
    take: { en: `Read-through, walk-through, simulation, parallel, full interruption: each more real and riskier.`, ru: `Прочтение, разбор, симуляция, параллельный тест, полное прерывание: всё реальнее и рискованнее.` } },

  { id: 's12-051', kind: 'think', k: ['d7-c10', 'd1-c1'], lvl: 2,
    title: { en: `"Let's pull the plug for real"`, ru: `«Давайте выдернем вилку по-настоящему»` },
    body: {
      en: `<p>A hospital's new IT manager wants to prove the DR plan works: "We've only ever done tabletop exercises. On Saturday night we'll shut the main data centre down and run everything from the backup site."</p><p>Good idea?</p>`,
      ru: `<p>Новый ИТ-руководитель больницы хочет доказать, что план DR работает: «Мы всегда делали только настольные учения. В субботу ночью выключим основной дата-центр и запустим всё с резервной площадки».</p><p>Хорошая идея?</p>`,
    },
    reveal: {
      en: `<p>Not as the next step. A <b>full interruption test</b> in a hospital puts patients at risk if the backup site doesn't work, and nothing so far proves it does. Going from tabletop straight to full interruption skips the steps that find problems safely.</p><p>Build up: a simulation, then a <b>parallel test</b> that brings the backup site up with real data while the main site keeps running. Full interruption, if it's ever justified, needs senior management's approval, clinical leaders involved, a tested rollback, and a quiet period. The goal of a test is to learn, not to cause the disaster it was meant to prepare for.</p>`,
      ru: `<p>Не как следующий шаг. <b>Тест с полным прерыванием</b> в больнице подвергает пациентов опасности, если резервная площадка не сработает, а пока ничто не доказывает, что сработает. Переход от настольного учения сразу к полному прерыванию пропускает шаги, которые безопасно находят проблемы.</p><p>Наращивайте: симуляция, затем <b>параллельный тест</b>, который поднимает резервную площадку с реальными данными, пока основная работает. Полное прерывание, если когда-нибудь оправдано, требует одобрения высшего руководства, участия клинических руководителей, проверенного отката и спокойного периода. Цель теста — научиться, а не вызвать ту катастрофу, к которой он готовит.</p>`,
    },
    take: { en: `Build up through simulation and parallel tests; full interruption needs top approval and never risks lives.`, ru: `Наращивайте через симуляцию и параллельный тест; полное прерывание — с одобрения руководства и без риска для жизней.` } },

  { id: 's12-052', kind: 'idea', k: ['d7-c10', 'd1-c7'], lvl: 2,
    title: { en: `A plan is never finished`, ru: `План никогда не закончен` },
    body: {
      en: `<p>Every test produces a list of what went wrong: a phone number that changed, a step in the wrong order, a restore that took twice as long. Each goes into an <b>action list</b> with an owner and a date, and the plan is updated.</p><p>Plans also go stale on their own. Update the BCP and DRP when:</p><ul><li>a system, supplier or site is added or changed;</li><li>the organization reorganizes or key people leave;</li><li>a test, an incident or a near-miss teaches something;</li><li>at least once a year, with a fresh BIA.</li></ul><p>Version-control the plan and know who has copies. Training goes with it: a plan nobody has read is a plan nobody can follow.</p>`,
      ru: `<p>Каждый тест даёт список того, что пошло не так: сменившийся телефон, шаг не в том порядке, восстановление вдвое дольше. Каждый пункт попадает в <b>список действий</b> с ответственным и сроком, и план обновляется.</p><p>Планы устаревают и сами. Обновляйте BCP и DRP, когда:</p><ul><li>добавлены или изменены система, поставщик или площадка;</li><li>организацию реорганизовали или ушли ключевые люди;</li><li>тест, инцидент или едва не случившийся сбой чему-то научил;</li><li>не реже раза в год, со свежим BIA.</li></ul><p>Ведите версии плана и знайте, у кого есть копии. Обучение идёт вместе с ним: план, который никто не читал, никто и не сможет выполнить.</p>`,
    },
    take: { en: `Every test feeds an action list; update the plan on change, after lessons, and at least yearly.`, ru: `Каждый тест даёт список действий; обновляйте план при изменениях, после уроков и не реже раза в год.` } },

  { id: 's12-053', kind: 'story', k: ['d1-c7', 'd7-c8'], lvl: 2,
    title: { en: `Cantor Fitzgerald: trading again in two days`, ru: `Cantor Fitzgerald: снова торговать через два дня` },
    body: {
      en: `<p>Cantor Fitzgerald, a bond-trading firm, had its headquarters on floors 101 to 105 of the World Trade Center's North Tower. On 11 September 2001 it lost 658 of its roughly 960 New York employees, more than any other company.</p><p>Its systems, though, had been duplicated at a backup data centre in New Jersey and in London. Surviving staff, colleagues in London and the technology vendors worked through the following days. When the US bond market reopened two days later, Cantor's electronic trading platform was running.</p><p>The technology recovered fast because it had been planned. The human loss could not be recovered at all; the firm later committed a share of its profits to the victims' families.</p>`,
      ru: `<p>Штаб-квартира Cantor Fitzgerald, компании по торговле облигациями, занимала этажи с 101 по 105 Северной башни Всемирного торгового центра. 11 сентября 2001 года она потеряла 658 из примерно 960 нью-йоркских сотрудников — больше, чем любая другая компания.</p><p>Но её системы были продублированы в резервном дата-центре в Нью-Джерси и в Лондоне. Выжившие сотрудники, коллеги в Лондоне и поставщики технологий работали все следующие дни. Когда через два дня рынок облигаций США открылся, электронная торговая платформа Cantor работала.</p><p>Технологии восстановились быстро, потому что это было спланировано. Потерю людей восстановить было нельзя; позже компания направила часть прибыли семьям погибших.</p>`,
    },
    take: { en: `Planned redundancy brought the systems back in two days; no plan can bring people back.`, ru: `Спланированное дублирование вернуло системы за два дня; людей не вернёт никакой план.` } },

  { id: 's12-054', kind: 'idea', k: ['d1-c7', 'd7-c4'], lvl: 2,
    title: { en: `Talking during a crisis`, ru: `Связь во время кризиса` },
    body: {
      en: `<p>In a disaster, silence is filled by rumour. The <b>crisis communications plan</b> decides in advance:</p><ul><li><b>who speaks</b> for the organization: one trained spokesperson, with legal and management approving messages;</li><li><b>who is told</b>, in what order: staff and their families, customers, regulators, partners, the press;</li><li><b>which channels</b> still work when email and the intranet don't: phone trees, SMS, a status page hosted elsewhere, a messaging app agreed in advance;</li><li>prepared <b>templates</b>, so the first message goes out in minutes, not hours.</li></ul><p>Be honest about what you know and don't know, and say when the next update comes.</p>`,
      ru: `<p>В катастрофе тишину заполняют слухи. <b>План кризисных коммуникаций</b> заранее решает:</p><ul><li><b>кто говорит</b> от имени организации: один обученный представитель, а сообщения утверждают юристы и руководство;</li><li><b>кому сообщают</b> и в каком порядке: сотрудникам и их семьям, клиентам, регуляторам, партнёрам, прессе;</li><li><b>какие каналы</b> работают, когда почта и интранет нет: дерево звонков, SMS, страница статуса на другом хостинге, заранее согласованный мессенджер;</li><li>готовые <b>шаблоны</b>, чтобы первое сообщение ушло за минуты, а не часы.</li></ul><p>Честно говорите, что известно и что нет, и когда будет следующее обновление.</p>`,
    },
    take: { en: `One spokesperson, a contact order, out-of-band channels and templates, prepared before the crisis.`, ru: `Один представитель, порядок оповещения, внеполосные каналы и шаблоны — до кризиса.` } },

  { id: 's12-055', kind: 'back', back: 's08-029', k: ['d3-c12', 'd7-c8'], lvl: 2,
    title: { en: `The generator again: fuel for how long?`, ru: `Снова генератор: топливо на сколько?` },
    body: {
      en: `<p>In stage 8, a generator that was never tested under load didn't start when needed, and in Hurricane Sandy staff carried diesel up the stairs in buckets.</p><p>For continuity, the generator question becomes a numbers question: the site holds fuel for <b>how many hours</b>, and is that longer than the outage the BIA expects? Then: who delivers more fuel, under what contract, and with what priority when a whole region is asking at once?</p><p>Many data centres keep fuel for 24 to 72 hours and sign priority refuelling contracts with more than one supplier. A regional disaster tests those contracts more than the generator.</p>`,
      ru: `<p>На этапе 8 генератор, ни разу не проверенный под нагрузкой, не запустился, когда был нужен, а во время урагана Сэнди люди носили дизель по лестницам вёдрами.</p><p>Для непрерывности вопрос о генераторе становится вопросом цифр: на площадке топлива на <b>сколько часов</b>, и это дольше, чем отключение, которое ожидает BIA? Затем: кто привезёт ещё, по какому договору и с каким приоритетом, когда топливо просит весь регион?</p><p>Многие дата-центры держат топливо на 24–72 часа и заключают договоры приоритетной заправки с несколькими поставщиками. Региональная катастрофа проверяет эти договоры сильнее, чем сам генератор.</p>`,
    },
    take: { en: `Know how many hours of fuel you hold and who refuels you when the whole region needs fuel.`, ru: `Знайте, на сколько часов у вас топлива и кто привезёт его, когда топливо нужно всему региону.` } },

  { id: 's12-056', kind: 'idea', k: ['d7-c10', 'd5-c7'], lvl: 3,
    title: { en: `What comes back first`, ru: `Что возвращается первым` },
    body: {
      en: `<p>Maersk's story shows a rule that's easy to forget: business applications can't come back before the things they stand on. A typical <b>recovery order</b>:</p><ol><li>the network, and the out-of-band access to manage it;</li><li><b>identity</b>: directory and domain controllers, MFA, privileged accounts;</li><li>DNS, time, certificates and the key management system;</li><li>the backup system itself, if it wasn't kept separate;</li><li>business applications, in BIA order;</li><li>everything else.</li></ol><p>Recovery plans that list only applications miss the first four, and those are exactly the systems ransomware attacks most and teams practise restoring least.</p>`,
      ru: `<p>История Maersk показывает правило, которое легко забыть: бизнес-приложения не вернутся раньше того, на чём стоят. Типичный <b>порядок восстановления</b>:</p><ol><li>сеть и внеполосный доступ для управления ею;</li><li><b>идентификация</b>: каталог и контроллеры домена, MFA, привилегированные учётки;</li><li>DNS, время, сертификаты и система управления ключами;</li><li>сама система резервного копирования, если её не держали отдельно;</li><li>бизнес-приложения, в порядке BIA;</li><li>всё остальное.</li></ol><p>Планы, где перечислены только приложения, пропускают первые четыре пункта, а это ровно те системы, которые вымогатели атакуют чаще всего, а команды реже всего тренируются восстанавливать.</p>`,
    },
    take: { en: `Network, identity, DNS and keys before applications; plan and practise restoring the foundations.`, ru: `Сеть, идентификация, DNS и ключи — до приложений; планируйте и тренируйте восстановление основ.` } },

  { id: 's12-057', kind: 'think', k: ['d7-c7', 'd7-c4', 'd8-c8'], lvl: 3,
    title: { en: `Which restore point?`, ru: `Какая точка восстановления?` },
    body: {
      en: `<p>Ransomware hit on Monday. Investigators find the attackers first logged in 19 days ago and created two admin accounts 12 days ago. Backups exist for every night of the last 30 days, then monthly.</p><p>The business wants last night's backup, to lose as little data as possible. What do you advise?</p>`,
      ru: `<p>Вымогатель ударил в понедельник. Расследование показало, что злоумышленники впервые вошли 19 дней назад, а 12 дней назад создали две учётки администратора. Копии есть за каждую ночь последних 30 дней, дальше — ежемесячные.</p><p>Бизнес хочет вчерашнюю копию, чтобы потерять как можно меньше данных. Что вы посоветуете?</p>`,
    },
    reveal: {
      en: `<p>Last night's backup contains the attackers' accounts and probably their tools. Restore it as is, and you restore them too.</p><p>Treat systems and data differently. <b>Systems</b> (operating systems, directories, configuration) are rebuilt from clean images or a backup from before day 19, and then hardened. <b>Data</b> (files, databases) can come from a recent backup, restored into an isolated network and checked for malicious content and planted accounts before it rejoins. That keeps data loss small without bringing the attacker back. Explain the trade-off to the business owner; the choice is theirs, with the risk spelled out.</p>`,
      ru: `<p>Вчерашняя копия содержит учётки злоумышленников и, вероятно, их инструменты. Восстановите её как есть — восстановите и их.</p><p>Разделите системы и данные. <b>Системы</b> (ОС, каталоги, конфигурации) пересобирают из чистых образов или копии до 19-го дня и затем укрепляют. <b>Данные</b> (файлы, базы) можно взять из свежей копии, восстановив в изолированную сеть и проверив на вредоносное содержимое и подброшенные учётки, прежде чем вернуть. Так потеря данных мала, а злоумышленник не возвращается. Объясните компромисс владельцу бизнеса; выбор за ним, с чётко названным риском.</p>`,
    },
    take: { en: `Rebuild systems from before the intrusion; restore recent data into isolation and check it first.`, ru: `Системы пересобирайте с точки до проникновения; свежие данные восстанавливайте в изоляции и проверяйте.` } },

  { id: 's12-058', kind: 'idea', k: ['d1-c7', 'd7-c10'], lvl: 2,
    title: { en: `The standards behind the plans`, ru: `Стандарты за планами` },
    body: {
      en: `<p>You don't have to invent the method. A few standards are worth knowing by name:</p><ul><li><b>ISO 22301</b>: requirements for a business continuity management system; organizations can be certified against it.</li><li><b>NIST SP 800-34</b>: contingency planning for information systems, in seven steps: policy, BIA, preventive controls, recovery strategies, the plan, testing and training, maintenance.</li><li><b>ISO/IEC 27031</b>: making IT ready to support business continuity.</li></ul><p>The steps look alike across all of them: policy and sponsorship, impact analysis, strategy, plan, test, maintain. If you remember one sequence, remember that one.</p>`,
      ru: `<p>Метод не нужно изобретать. Несколько стандартов стоит знать по имени:</p><ul><li><b>ISO 22301</b>: требования к системе менеджмента непрерывности бизнеса; по нему можно сертифицироваться.</li><li><b>NIST SP 800-34</b>: планирование на случай чрезвычайных ситуаций для информационных систем, в семи шагах: политика, BIA, превентивные меры, стратегии восстановления, план, тестирование и обучение, поддержание.</li><li><b>ISO/IEC 27031</b>: готовность ИТ поддерживать непрерывность бизнеса.</li></ul><p>Шаги во всех похожи: политика и спонсорство, анализ влияния, стратегия, план, тест, поддержание. Если запоминать одну последовательность, то эту.</p>`,
    },
    take: { en: `ISO 22301 for the BCMS, NIST SP 800-34 for IT contingency; all follow policy → BIA → strategy → plan → test → maintain.`, ru: `ISO 22301 — для системы менеджмента, NIST SP 800-34 — для ИТ; везде политика → BIA → стратегия → план → тест → поддержание.` } },

  { id: 's12-059', kind: 'back', back: 's01-006', k: ['d1-c1', 'd1-c7'], lvl: 1,
    title: { en: `Availability again: the letter with a budget`, ru: `Снова доступность: буква с бюджетом` },
    body: {
      en: `<p>In stage 1, availability was the third letter of CIA: there when you need it.</p><p>This stage turned that word into numbers. "Available" now means: this process may stop for at most 8 hours (MTD), lose at most 15 minutes of data (RPO), and must be back within 4 hours (RTO), with a warm standby and immutable backups to make it so, and a parallel test each year to prove it.</p><p>That's the difference between a principle and a plan. Confidentiality and integrity become numbers too, in their own ways, but availability is the one the business can price most easily, which is why continuity is often the first place security gets a real budget.</p>`,
      ru: `<p>На этапе 1 доступность была третьей буквой CIA: есть, когда нужно.</p><p>Этот этап превратил слово в цифры. «Доступно» теперь значит: процесс может стоять не больше 8 часов (MTD), потерять не больше 15 минут данных (RPO) и должен вернуться за 4 часа (RTO), а обеспечивают это тёплый резерв и неизменяемые копии, а доказывает ежегодный параллельный тест.</p><p>В этом разница между принципом и планом. Конфиденциальность и целостность тоже по-своему становятся цифрами, но доступность бизнесу проще всего оценить в деньгах, поэтому непрерывность часто первое место, где безопасность получает настоящий бюджет.</p>`,
    },
    take: { en: `Continuity turns "availability" into MTD, RTO and RPO, a strategy to meet them, and a test to prove it.`, ru: `Непрерывность превращает «доступность» в MTD, RTO и RPO, стратегию их выполнения и тест-доказательство.` } },

  { id: 's12-060', kind: 'vs', k: ['d1-c9', 'd1-c7'], lvl: 2,
    title: { en: `Insurance vs recovery`, ru: `Страховка и восстановление` },
    body: {
      en: `<ul><li><b>Insurance</b> transfers part of the <b>financial</b> loss: repair costs, lost income, sometimes incident response fees. It pays later, after a claim, with exclusions and limits. It doesn't bring a single system back.</li><li><b>Recovery capability</b> (backups, alternate sites, tested plans) reduces the <b>actual</b> downtime and data loss. It works during the disaster.</li></ul><p>They complement each other. Insurers increasingly ask for proof of recovery capability, such as offline backups and MFA, before they'll offer cyber cover, and some claims are refused when the stated controls turn out to be missing. Neither transfers the duty to protect people, or the reputational damage.</p>`,
      ru: `<ul><li><b>Страховка</b> переносит часть <b>финансовых</b> потерь: ремонт, упущенный доход, иногда услуги реагирования. Она платит позже, после требования, с исключениями и лимитами. Ни одной системы она не возвращает.</li><li><b>Способность к восстановлению</b> (копии, альтернативные площадки, проверенные планы) уменьшает <b>фактический</b> простой и потерю данных. Она работает во время катастрофы.</li></ul><p>Они дополняют друг друга. Страховщики всё чаще требуют доказательств способности к восстановлению, например офлайн-копий и MFA, прежде чем предложить киберстрахование, и некоторые выплаты отклоняют, когда заявленных мер не оказалось. Ни то ни другое не снимает обязанности защищать людей и не переносит ущерб репутации.</p>`,
    },
    take: { en: `Insurance pays later for the loss; recovery reduces the loss now. You need both.`, ru: `Страховка платит потом за потери; восстановление уменьшает потери сейчас. Нужно и то и другое.` } },

  { id: 's12-061', kind: 'link', k: ['d7-c7', 'd7-c8', 'd7-c10', 'd1-c7', 'd5-c7'], lvl: 3,
    title: { en: `Maersk replayed with this stage`, ru: `Maersk заново, с этим этапом` },
    body: {
      en: `<p>Replay 27 June 2017 at a company that did this stage's work:</p><ol><li>The <b>BIA</b> ranked port operations top, with an MTD of 24 hours, and listed identity as their first dependency.</li><li>Domain controllers were backed up nightly to an <b>immutable</b> store outside the main directory, with one copy offline, so recovery didn't depend on a power cut in Ghana.</li><li>The <b>DR plan</b>, printed and held offsite, put network and identity first, then terminals, then the rest.</li><li>A <b>parallel test</b> six months earlier had timed a full directory restore at 9 hours.</li><li>Port staff had practised the <b>paper process</b> once a year.</li><li><b>Crisis communications</b> went out by SMS within the hour.</li></ol>`,
      ru: `<p>Переиграем 27 июня 2017 года в компании, выполнившей работу этого этапа:</p><ol><li><b>BIA</b> поставил портовые операции на первое место с MTD 24 часа и назвал идентификацию их первой зависимостью.</li><li>Контроллеры домена каждую ночь копировались в <b>неизменяемое</b> хранилище вне основного каталога, одна копия — офлайн, поэтому восстановление не зависело от отключения света в Гане.</li><li><b>План DR</b>, распечатанный и хранящийся вне площадки, ставил первыми сеть и идентификацию, затем терминалы, затем остальное.</li><li><b>Параллельный тест</b> полгода назад засёк полное восстановление каталога за 9 часов.</li><li>Сотрудники портов раз в год отрабатывали <b>бумажный процесс</b>.</li><li><b>Кризисные сообщения</b> ушли по SMS в течение часа.</li></ol>`,
    },
    take: { en: `BIA, immutable offline backups, a reachable plan, a timed test, a practised workaround, a second channel.`, ru: `BIA, неизменяемые офлайн-копии, доступный план, засечённый тест, отработанный обходной путь, второй канал.` } },

  { id: 's12-062', kind: 'think', k: ['d7-c8', 'd1-c9', 'd1-c2'], lvl: 3,
    title: { en: `The CFO's question`, ru: `Вопрос финансового директора` },
    body: {
      en: `<p>You present the DR programme: a warm cloud standby for the top 12 systems, immutable backups, and two tests a year. It costs €400,000 a year. The CFO asks: "We've never had a disaster in 20 years. Why should we pay this?"</p><p>How do you answer?</p>`,
      ru: `<p>Вы представляете программу DR: тёплый облачный резерв для 12 главных систем, неизменяемые копии и два теста в год. Стоимость — 400 000 € в год. Финансовый директор спрашивает: «За 20 лет у нас не было ни одной катастрофы. Зачем нам за это платить?»</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p>In the business's terms, from the BIA, not with fear. "Twenty years without a disaster" is survivorship, not evidence: ransomware, the most likely cause today, hits organizations of every size, and the BIA says a week without the order system costs, say, €6 million plus contract penalties.</p><p>Show the risk in numbers (likelihood and impact, the expected annual loss with and without the programme), what the board's stated risk appetite allows, and cheaper alternatives with what each leaves uncovered. Then it's management's decision. If they choose less, record it as a risk acceptance, signed. Due care means the decision is informed, not that security always wins.</p>`,
      ru: `<p>Языком бизнеса, по BIA, а не страхом. «Двадцать лет без катастроф» — ошибка выжившего, а не доказательство: вымогатели, самая вероятная причина сегодня, бьют по организациям любого размера, а BIA говорит, что неделя без системы заказов стоит, скажем, 6 миллионов евро плюс штрафы по договорам.</p><p>Покажите риск в цифрах (вероятность и влияние, ожидаемые годовые потери с программой и без), что допускает утверждённый советом аппетит к риску, и более дешёвые альтернативы с тем, что каждая оставляет непокрытым. Дальше решает руководство. Если оно выберет меньше, оформите это как подписанное принятие риска. Должная забота — это когда решение принято осознанно, а не когда безопасность всегда побеждает.</p>`,
    },
    take: { en: `Answer with BIA numbers and risk appetite, offer options; management decides and signs the residual risk.`, ru: `Отвечайте цифрами BIA и аппетитом к риску, предлагайте варианты; руководство решает и подписывает остаточный риск.` } },

  { id: 's12-063', kind: 'recap', lvl: 1,
    title: { en: `Stage 12 in seven lines`, ru: `Этап 12 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s12-002', { en: `Replication copies the damage too; a backup is a separate copy from the past.`, ru: `Репликация копирует и ущерб; копия — отдельная копия из прошлого.` }],
      ['s12-007', { en: `The BIA ranks processes by the cost of stopping; it drives every recovery choice.`, ru: `BIA ранжирует процессы по цене остановки; он определяет все решения о восстановлении.` }],
      ['s12-008', { en: `RPO is data you can lose; RTO + WRT must fit inside the MTD.`, ru: `RPO — допустимая потеря данных; RTO + WRT должны уложиться в MTD.` }],
      ['s12-017', { en: `Cold, warm, hot, mirror: match the site to the RTO, not one site for all.`, ru: `Холодная, тёплая, горячая, зеркальная: площадка под RTO, а не одна на всё.` }],
      ['s12-028', { en: `3-2-1 plus one offline or immutable copy, and zero errors in the restore test.`, ru: `3-2-1 плюс одна офлайн или неизменяемая копия и ноль ошибок в тесте.` }],
      ['s12-047', { en: `Return the least critical first; the disaster ends when everything is stable at home.`, ru: `Возвращайте сначала наименее критичное; катастрофа кончается, когда всё стабильно дома.` }],
      ['s12-050', { en: `Read-through, walk-through, simulation, parallel, full interruption.`, ru: `Прочтение, разбор, симуляция, параллельный тест, полное прерывание.` }],
    ],
    take: { en: `Next: governance, law and the manager's view.`, ru: `Дальше: управление, право и взгляд менеджера.` } },
] });
