'use strict';
// Learning path, stage 2: people are part of the system. Hiring, duties, vacations, leaving, vendors,
// social engineering, awareness and training, insider threats.
CISSP.stage(2, { cards: [
  { id: 's02-001', kind: 'story', k: ['d1-c8', 'd7-c3'], lvl: 1,
    title: { en: `Société Générale: €4.9 billion and almost no days off`, ru: `Société Générale: 4,9 млрд евро и почти без отпусков` },
    body: {
      en: `<p>In January 2008, the French bank Société Générale found that a junior trader, Jérôme Kerviel, had built up huge unauthorized positions on the markets. Unwinding them cost the bank about <b>€4.9 billion</b>.</p><p>He hid the bets with fake offsetting trades. He had previously worked in the middle office, which checks trades, so he knew which checks to dodge and when. He rarely took holidays, so nobody else handled his book long enough to notice. The French banking regulator later fined the bank €4 million for weak internal controls.</p>`,
      ru: `<p>В январе 2008 года французский банк Société Générale обнаружил, что младший трейдер Жером Кервьель открыл на рынках огромные несанкционированные позиции. Их закрытие обошлось банку примерно в <b>4,9 млрд евро</b>.</p><p>Он прятал ставки за фиктивными встречными сделками. Раньше он работал в мидл-офисе, который проверяет сделки, поэтому знал, какие проверки и когда обходить. В отпуск он почти не ходил, так что никто другой не вёл его позиции достаточно долго, чтобы заметить. Позже французский банковский регулятор оштрафовал банк на 4 млн евро за слабый внутренний контроль.</p>`,
    },
    take: { en: `The most dangerous insider knows exactly how the controls work.`, ru: `Самый опасный инсайдер — тот, кто точно знает, как устроены проверки.` } },

  { id: 's02-002', kind: 'idea', k: ['d7-c3'], lvl: 1,
    title: { en: `Separation of duties: no one does it alone`, ru: `Разделение обязанностей: никто не делает всё сам` },
    body: {
      en: `<p>If one person can both do something and approve it, mistakes and fraud go unnoticed. <b>Separation of duties</b> (SoD) splits a sensitive task so that no single person can complete it alone.</p><p>In accounting, one person creates a supplier, another approves payments to it. In IT, a developer writes code but can't push it to production alone. To cheat, two people now have to agree, which is much harder and much riskier for them.</p>`,
      ru: `<p>Если один человек может и сделать, и утвердить, ошибки и мошенничество остаются незамеченными. <b>Разделение обязанностей</b> (separation of duties, SoD) делит чувствительную задачу так, чтобы ни один человек не мог выполнить её целиком.</p><p>В бухгалтерии один заводит поставщика, другой утверждает платежи ему. В IT разработчик пишет код, но не может в одиночку выкатить его в продакшн. Чтобы смошенничать, теперь нужно договориться двоим, а это намного труднее и рискованнее.</p>`,
    },
    take: { en: `Split sensitive tasks so that fraud needs an accomplice.`, ru: `Делите чувствительные задачи так, чтобы для мошенничества нужен был сообщник.` } },

  { id: 's02-003', kind: 'idea', k: ['d1-c8', 'd7-c3'], lvl: 1,
    title: { en: `Mandatory vacation: the job without its owner`, ru: `Обязательный отпуск: работа без хозяина` },
    body: {
      en: `<p>Many frauds need daily care: fake entries must be rolled over, questions answered, reports adjusted. Someone running a scheme often avoids time off.</p><p><b>Mandatory vacation</b> requires people in sensitive roles to take a block of consecutive days off, often one or two weeks, while someone else does their job and their access is suspended. If something was hidden, it tends to surface. Banks in several countries require it for traders for exactly this reason.</p>`,
      ru: `<p>Многие схемы требуют ежедневного ухода: фиктивные записи нужно продлевать, на вопросы отвечать, отчёты подправлять. Тот, кто ведёт такую схему, часто избегает отпусков.</p><p><b>Обязательный отпуск</b> требует, чтобы люди на чувствительных должностях брали несколько дней подряд, часто неделю-две, пока их работу делает кто-то другой, а их доступ приостановлен. Если что-то было спрятано, оно обычно всплывает. Именно поэтому банки во многих странах требуют этого от трейдеров.</p>`,
    },
    take: { en: `Mandatory vacation is a detective control: it reveals fraud by taking away the person who hides it.`, ru: `Обязательный отпуск — детективная мера: он выявляет мошенничество, убирая того, кто его прячет.` } },

  { id: 's02-004', kind: 'picture', k: ['d1-c8'], lvl: 1,
    title: { en: `An employee's life, and the threat each stage invites`, ru: `Жизненный путь сотрудника и угрозы на каждом этапе` },
    body: {
      en: `<p>Personnel security follows a person from the day they apply to the day they leave. Each stage has its own typical threat and its own control.</p>`,
      ru: `<p>Безопасность персонала сопровождает человека от отклика на вакансию до ухода. У каждого этапа своя типичная угроза и своя мера.</p>`,
    },
    dg: { title: { en: `Hire → work → leave`, ru: `Наём → работа → уход` }, h: 260,
      nodes: [
        ['h', 115, 70, { en: 'Hire', ru: 'Наём' }, { en: 'background check, NDA', ru: 'проверка, NDA' }, '📝', 'ok'],
        ['w', 380, 70, { en: 'Work', ru: 'Работа' }, { en: 'least privilege, SoD, vacation', ru: 'минимум прав, SoD, отпуск' }, '💼', 'ok'],
        ['l', 645, 70, { en: 'Leave', ru: 'Уход' }, { en: 'access off first', ru: 'сначала отключить доступ' }, '🚪', 'ok'],
        ['th', 115, 200, { en: 'Fake CV, past fraud', ru: 'Ложное резюме' }, null, '⚠', 'bad'],
        ['tw', 380, 200, { en: 'Fraud, privilege creep', ru: 'Мошенничество, лишние права' }, null, '⚠', 'bad'],
        ['tl', 645, 200, { en: 'Revenge, orphaned account', ru: 'Месть, забытая учётка' }, null, '⚠', 'bad'],
      ],
      edges: [
        ['h', 'w', null], ['w', 'l', null],
        ['h', 'th', { en: 'blocks', ru: 'блокирует' }, 'ok'],
        ['w', 'tw', { en: 'blocks', ru: 'блокирует' }, 'ok'],
        ['l', 'tl', { en: 'blocks', ru: 'блокирует' }, 'ok'],
      ] },
    take: { en: `Every stage of employment needs its own control: before, during and after.`, ru: `Каждому этапу работы нужна своя мера: до, во время и после.` } },

  { id: 's02-005', kind: 'idea', k: ['d1-c8'], lvl: 1,
    title: { en: `Before day one: checks and signatures`, ru: `До первого рабочего дня: проверки и подписи` },
    body: {
      en: `<p>The cheapest moment to stop an insider problem is before the person is hired.</p><ul><li><b>Background checks</b>, scaled to the role: references and identity for everyone, plus education, past employers, criminal or credit history for sensitive jobs where the law allows it.</li><li><b>Agreements</b>: a non-disclosure agreement (NDA) and the acceptable use policy are signed before any access is given.</li><li><b>Job description</b>: written with security in mind, so the role's access needs are clear from the start.</li></ul>`,
      ru: `<p>Дешевле всего предотвратить проблему с инсайдером до того, как человека наняли.</p><ul><li><b>Проверка кандидата</b> соразмерно должности: рекомендации и личность — для всех; образование, прежние работодатели, судимости или кредитная история — для чувствительных должностей, если это разрешает закон.</li><li><b>Соглашения</b>: соглашение о неразглашении (NDA) и правила допустимого использования подписываются до выдачи любого доступа.</li><li><b>Должностная инструкция</b> пишется с учётом безопасности, чтобы с самого начала было ясно, какой доступ нужен роли.</li></ul>`,
    },
    take: { en: `Check people in proportion to what they'll be able to touch, and get signatures before access.`, ru: `Проверяйте людей соразмерно тому, к чему они получат доступ, и берите подписи до выдачи доступа.` } },

  { id: 's02-006', kind: 'vs', k: ['d7-c3', 'd1-c8'], lvl: 1,
    title: { en: `Separation of duties vs job rotation vs mandatory vacation`, ru: `Разделение обязанностей, ротация и обязательный отпуск` },
    body: {
      en: `<p>All three fight insider fraud, in different ways:</p><ul><li><b>Separation of duties</b>: <i>split the task</i> among people at the same time. Prevents one person from doing it all.</li><li><b>Job rotation</b>: <i>move people</i> between roles over months. Someone new looks at the work, and the company isn't dependent on one person's knowledge.</li><li><b>Mandatory vacation</b>: <i>remove the person</i> for a short time. Reveals what needs constant hiding.</li></ul><p>Rule of thumb: SoD is about <i>who at once</i>, rotation about <i>who over time</i>, vacation about <i>who's absent</i>.</p>`,
      ru: `<p>Все три борются с мошенничеством изнутри, но по-разному:</p><ul><li><b>Разделение обязанностей</b> — <i>разделить задачу</i> между людьми одновременно. Не даёт одному сделать всё.</li><li><b>Ротация</b> — <i>перемещать людей</i> между ролями раз в несколько месяцев. На работу смотрит новый человек, и компания не зависит от знаний одного сотрудника.</li><li><b>Обязательный отпуск</b> — <i>убрать человека</i> на короткое время. Выявляет то, что требует постоянного сокрытия.</li></ul><p>Правило: SoD — <i>кто одновременно</i>, ротация — <i>кто со временем</i>, отпуск — <i>кого нет</i>.</p>`,
    },
    take: { en: `SoD splits the task; rotation changes the person; vacation removes the person.`, ru: `SoD делит задачу, ротация меняет человека, отпуск убирает человека.` } },

  { id: 's02-007', kind: 'think', k: ['d1-c8', 'd7-c3'], lvl: 1,
    title: { en: `The clerk who never takes leave`, ru: `Бухгалтер, который не ходит в отпуск` },
    body: {
      en: `<p>An accounts-payable clerk has run supplier payments for nine years and is trusted by everyone. An auditor notices small, regular payments to a supplier nobody else seems to know. You suspect fraud but have no proof.</p><p>Which control is most likely to reveal what's going on?</p>`,
      ru: `<p>Бухгалтер по расчётам с поставщиками девять лет ведёт платежи, и все ему доверяют. Аудитор замечает небольшие регулярные платежи поставщику, которого больше никто не знает. Вы подозреваете мошенничество, но доказательств нет.</p><p>Какая мера скорее всего вскроет, что происходит?</p>`,
    },
    reveal: {
      en: `<p><b>Mandatory vacation.</b> Have the clerk take two consecutive weeks off, suspend their access, and let a colleague run the payments. If there's a scheme, it will need attention it isn't getting.</p><p>Separation of duties is the right long-term fix, but it <i>prevents</i> future fraud; it doesn't reveal past fraud. Confronting the person first would only warn them. Involve HR and legal before acting, and keep the investigation discreet.</p>`,
      ru: `<p><b>Обязательный отпуск.</b> Отправьте бухгалтера в отпуск на две недели подряд, приостановите доступ и передайте платежи коллеге. Если схема есть, ей понадобится уход, которого не будет.</p><p>Разделение обязанностей — правильное решение на будущее, но оно <i>предотвращает</i> новое мошенничество, а не вскрывает прошлое. Разговор напрямую только предупредит человека. Подключите HR и юристов до любых действий и ведите проверку тихо.</p>`,
    },
    take: { en: `To uncover hidden fraud, take the person out of the loop for a while.`, ru: `Чтобы вскрыть скрытое мошенничество, выведите человека из процесса на время.` } },

  { id: 's02-008', kind: 'idea', k: ['d7-c3', 'd3-c1'], lvl: 1,
    title: { en: `Least privilege and need to know`, ru: `Минимальные привилегии и необходимость знать` },
    body: {
      en: `<p>Two related rules decide how much access a person gets:</p><ul><li><b>Least privilege</b>: give only the <i>rights</i> needed to do the job, and nothing more. A support agent can reset a password but not delete an account.</li><li><b>Need to know</b>: even with the right clearance, see only the <i>information</i> the current task requires. A doctor sees their own patients' records, not every record in the hospital.</li></ul><p>The less someone can reach, the less damage a mistake, a fraud or a stolen password can cause.</p>`,
      ru: `<p>Два связанных правила определяют, сколько доступа получает человек:</p><ul><li><b>Минимальные привилегии</b> (least privilege) — только те <i>права</i>, что нужны для работы, и ничего сверх. Сотрудник поддержки может сбросить пароль, но не удалить учётную запись.</li><li><b>Необходимость знать</b> (need to know) — даже при нужном допуске видеть только ту <i>информацию</i>, которая нужна для текущей задачи. Врач видит карты своих пациентов, а не все карты больницы.</li></ul><p>Чем меньше человеку доступно, тем меньше вреда от ошибки, мошенничества или украденного пароля.</p>`,
    },
    take: { en: `Least privilege limits what you can do; need to know limits what you can see.`, ru: `Минимальные привилегии ограничивают действия, необходимость знать — то, что вы видите.` } },

  { id: 's02-009', kind: 'back', back: 's01-029', k: ['d1-c11', 'd7-c3'], lvl: 1,
    title: { en: `The people controls by function`, ru: `Кадровые меры по функциям` },
    body: {
      en: `<p>The controls from this stage fit the preventive-detective-corrective timeline you've already seen:</p><ul><li><b>Preventive</b>: background checks, separation of duties, least privilege. They make the bad act hard to commit.</li><li><b>Detective</b>: mandatory vacation, job rotation, access reviews. They make a hidden act surface.</li><li><b>Deterrent</b>: signed NDAs and well-known consequences. They make people think twice.</li></ul><p>All of them are <b>administrative</b> controls: rules about people, enforced partly by technology.</p>`,
      ru: `<p>Меры этого этапа укладываются в уже знакомую шкалу «предотвратить — обнаружить — исправить»:</p><ul><li><b>Превентивные</b>: проверка кандидатов, разделение обязанностей, минимальные привилегии. Они затрудняют злоупотребление.</li><li><b>Детективные</b>: обязательный отпуск, ротация, пересмотр прав доступа. Они заставляют скрытое всплыть.</li><li><b>Сдерживающие</b>: подписанные NDA и известные всем последствия. Они заставляют подумать дважды.</li></ul><p>Все они — <b>административные</b> меры: правила для людей, частично подкреплённые технологиями.</p>`,
    },
    take: { en: `SoD prevents, vacation and rotation detect, NDAs deter.`, ru: `SoD предотвращает, отпуск и ротация обнаруживают, NDA сдерживает.` } },

  { id: 's02-010', kind: 'idea', k: ['d1-c8', 'd5-c6'], lvl: 1,
    title: { en: `Leaving: switch off access before the conversation ends`, ru: `Увольнение: отключить доступ до конца разговора` },
    body: {
      en: `<p>Most departures are friendly, but the risk is in the exceptions. An upset employee with working access can delete data, copy client lists or plant something for later.</p><p>For an involuntary termination, access is disabled <b>during or just before</b> the meeting where the person is told. Afterwards: collect badges, laptops and tokens; remind them of the NDA in an exit interview; and check for shared passwords or service accounts they knew. For a friendly departure, access ends on the last day, not "some time next month".</p>`,
      ru: `<p>Большинство увольнений проходит мирно, но риск — в исключениях. Обиженный сотрудник с рабочим доступом может удалить данные, скопировать базу клиентов или оставить «сюрприз» на потом.</p><p>При увольнении по инициативе компании доступ отключают <b>во время или прямо перед</b> встречей, на которой человеку сообщают о решении. Затем: забрать пропуск, ноутбук и токены, на выходном интервью напомнить про NDA и проверить общие пароли или служебные учётные записи, которые он знал. При мирном уходе доступ прекращается в последний день, а не «где-нибудь в следующем месяце».</p>`,
    },
    take: { en: `Access should end no later than the moment the person learns they're leaving.`, ru: `Доступ должен закончиться не позже момента, когда человек узнаёт об увольнении.` } },

  { id: 's02-011', kind: 'story', k: ['d1-c8', 'd5-c6'], lvl: 1,
    title: { en: `Cisco 2018: 456 servers deleted by an ex-employee`, ru: `Cisco, 2018: бывший сотрудник удалил 456 серверов` },
    body: {
      en: `<p>An engineer left Cisco in April 2018. Five months later, in September, he accessed Cisco's cloud environment on Amazon Web Services and deleted <b>456 virtual machines</b> running the Webex Teams collaboration service.</p><p>About 16,000 Webex Teams accounts were affected for up to two weeks. Cisco spent about $1.4 million on recovery and paid about $1 million in refunds to customers. In 2020 he was sentenced to two years in US federal prison.</p>`,
      ru: `<p>Инженер ушёл из Cisco в апреле 2018 года. Через пять месяцев, в сентябре, он зашёл в облачную среду Cisco в Amazon Web Services и удалил <b>456 виртуальных машин</b>, на которых работал сервис совместной работы Webex Teams.</p><p>Около 16 000 учётных записей Webex Teams пострадали на срок до двух недель. Cisco потратила около 1,4 млн долларов на восстановление и примерно 1 млн на компенсации клиентам. В 2020 году суд США приговорил его к двум годам федеральной тюрьмы.</p>`,
    },
    take: { en: `Offboarding isn't done until every route in, including cloud consoles, is closed.`, ru: `Увольнение не завершено, пока не закрыт каждый путь внутрь, включая облачные консоли.` } },

  { id: 's02-012', kind: 'think', k: ['d1-c8', 'd5-c6'], lvl: 1,
    title: { en: `Friday, 3 p.m.: letting a sysadmin go`, ru: `Пятница, 15:00: увольнение системного администратора` },
    body: {
      en: `<p>Management has decided to dismiss a senior system administrator. HR has booked a meeting for Friday at 3 p.m. Your manager asks you to "handle the IT side".</p><p>In what order should things happen, and when should the admin's access be removed?</p>`,
      ru: `<p>Руководство решило уволить ведущего системного администратора. HR назначил встречу на пятницу, 15:00. Руководитель просит вас «взять на себя IT-часть».</p><p>В каком порядке всё должно происходить и когда отключать доступ администратора?</p>`,
    },
    reveal: {
      en: `<p>Prepare beforehand and quietly: list every account, VPN, cloud console, shared password and admin key the person could use. At the moment the meeting starts, disable all of them and rotate shared secrets. Then HR and the manager deliver the news; someone escorts the person, and equipment and badges are collected. Finish with an exit interview reminding them of their NDA.</p><p>Disabling access <i>after</i> the meeting leaves a window for revenge. Disabling it days before tips them off.</p>`,
      ru: `<p>Подготовьтесь заранее и без огласки: составьте список всех учётных записей, VPN, облачных консолей, общих паролей и ключей администратора, которыми человек может воспользоваться. В момент начала встречи отключите всё и смените общие секреты. Затем HR и руководитель сообщают решение, человека провожают, забирают оборудование и пропуск. В конце — выходное интервью с напоминанием про NDA.</p><p>Отключение <i>после</i> встречи оставляет окно для мести. Отключение за несколько дней до неё выдаст ваши планы.</p>`,
    },
    take: { en: `Inventory first, cut access as the meeting starts, then talk.`, ru: `Сначала инвентаризация, доступ — отключить в начале встречи, потом разговор.` } },

  { id: 's02-013', kind: 'link', k: ['d1-c8', 'd5-c6', 'd1-c4', 'd1-c7'], lvl: 2,
    title: { en: `How a forgotten account becomes a board-level problem`, ru: `Как забытая учётная запись становится проблемой совета директоров` },
    body: {
      en: `<p>Follow one gap through the company:</p><ol><li><b>People</b>: offboarding misses an account, leaving an <i>orphaned account</i>: still active, with no owner.</li><li><b>Identity</b>: nobody reviews access, so it stays active for months.</li><li><b>Incident</b>: an attacker, or the former employee, logs in with it.</li><li><b>Law</b>: personal data leaks, and regulators expect notification and ask about due care.</li><li><b>Continuity</b>: if systems are wiped, the business runs on its recovery plans.</li></ol><p>Colonial Pipeline's way in was exactly this kind of account. Small HR and IT habits carry big consequences.</p>`,
      ru: `<p>Проследим один пробел через всю компанию:</p><ol><li><b>Люди</b>: при увольнении пропустили учётную запись, и она стала <i>«сиротой»</i> — активной, но без владельца.</li><li><b>Идентификация</b>: права никто не пересматривает, и запись живёт месяцами.</li><li><b>Инцидент</b>: злоумышленник или бывший сотрудник входит под ней.</li><li><b>Право</b>: утекают персональные данные, регуляторы ждут уведомления и спрашивают про due care.</li><li><b>Непрерывность</b>: если системы стёрты, бизнес живёт на планах восстановления.</li></ol><p>Colonial Pipeline взломали именно через такую учётную запись. Мелкие привычки HR и IT имеют большие последствия.</p>`,
    },
    take: { en: `Orphaned account → breach → regulator → recovery: offboarding is a business-continuity control.`, ru: `Забытая учётка → взлом → регулятор → восстановление: увольнение — это тоже мера непрерывности бизнеса.` } },

  { id: 's02-014', kind: 'back', back: 's02-002', k: ['d7-c3', 'd8-c4'], lvl: 2,
    title: { en: `Separation of duties inside a software pipeline`, ru: `Разделение обязанностей в конвейере разработки` },
    body: {
      en: `<p>The same idea from the accounts department works in modern software teams. In a CI/CD pipeline (the automated path from code to production), you set rules so that:</p><ul><li>a developer can't merge their own change without another person's review;</li><li>nobody can deploy to production by hand, skipping the pipeline;</li><li>the people who manage the pipeline's settings are not the ones whose code it checks.</li></ul><p>Without these rules, one compromised developer laptop can push malicious code straight to every customer.</p>`,
      ru: `<p>Та же идея из бухгалтерии работает в современных командах разработки. В конвейере CI/CD (автоматическом пути кода в продакшн) задают правила:</p><ul><li>разработчик не может слить своё изменение без проверки другим человеком;</li><li>никто не может вручную выкатить код в продакшн в обход конвейера;</li><li>настройками конвейера управляют не те, чей код он проверяет.</li></ul><p>Без этих правил один взломанный ноутбук разработчика может отправить вредоносный код прямо всем клиентам.</p>`,
    },
    take: { en: `"Two people for a sensitive step" works for payments and for code deploys alike.`, ru: `«Два человека на чувствительный шаг» работает и для платежей, и для выкатки кода.` } },

  { id: 's02-015', kind: 'idea', k: ['d7-c3'], lvl: 2,
    title: { en: `Collusion: when two people cheat together`, ru: `Сговор: когда обманывают вдвоём` },
    body: {
      en: `<p>Separation of duties has a known weakness: if the two people who share a task agree to cheat together, the split doesn't help. This is <b>collusion</b>.</p><p>You can't remove the risk, but you can make it rarer and easier to spot. Job rotation breaks up long partnerships. Mandatory vacations bring in a third person. Logs and regular reviews by someone outside the pair create a record. And splitting a task across different departments makes friendly deals less likely.</p>`,
      ru: `<p>У разделения обязанностей есть известная слабость: если двое, делящие задачу, договорятся обманывать вместе, разделение не поможет. Это <b>сговор</b> (collusion).</p><p>Убрать этот риск нельзя, но можно сделать его реже и заметнее. Ротация разрушает долгие «партнёрства». Обязательный отпуск приводит третьего человека. Журналы и регулярные проверки кем-то вне пары оставляют след. А если задача разделена между разными отделами, дружеские договорённости менее вероятны.</p>`,
    },
    take: { en: `SoD forces collusion; rotation, vacations and outside review make collusion hard.`, ru: `SoD вынуждает к сговору, а ротация, отпуска и внешние проверки делают сговор трудным.` } },

  { id: 's02-016', kind: 'back', back: 's01-001', k: ['d1-c13', 'd1-c8'], lvl: 2,
    title: { en: `Vendors are people with access too`, ru: `Подрядчики — тоже люди с доступом` },
    body: {
      en: `<p>The way into Target was a heating contractor's login. Personnel security doesn't stop at your own staff. Contractors, consultants and suppliers with access need the same treatment:</p><ul><li>a contract that sets security duties, including breach notification;</li><li>access limited to exactly what they need, ideally only while they need it;</li><li>their accounts removed when the contract ends, just like an employee's;</li><li>reviews of what they can still reach.</li></ul><p>A supplier's weakest employee can become your weakest link.</p>`,
      ru: `<p>Путь внутрь Target начался с логина подрядчика по отоплению. Безопасность персонала не заканчивается на собственных сотрудниках. С подрядчиками, консультантами и поставщиками, у которых есть доступ, обращаются так же:</p><ul><li>договор с обязанностями по безопасности, включая уведомление об инцидентах;</li><li>доступ строго к тому, что нужно, и лучше только на нужное время;</li><li>удаление их учётных записей по окончании договора, как у сотрудника;</li><li>регулярная проверка того, к чему они ещё имеют доступ.</li></ul><p>Самый слабый сотрудник поставщика может стать вашим самым слабым звеном.</p>`,
    },
    take: { en: `Treat third-party access like employee access: contract, least privilege, review, offboarding.`, ru: `Доступ третьих сторон — как доступ сотрудников: договор, минимум прав, проверки, отключение.` } },
  { id: 's02-017', kind: 'story', k: ['d1-c14', 'd5-c1'], lvl: 1,
    title: { en: `Twitter 2020: hacked with a phone call`, ru: `Twitter 2020: взлом телефонным звонком` },
    body: {
      en: `<p>On 15 July 2020, the Twitter accounts of Barack Obama, Joe Biden, Elon Musk, Apple and others posted the same message: send bitcoin and get double back. Within hours, the scammers had collected over $100,000.</p><p>No software flaw was involved. The attackers phoned Twitter employees, posed as the company's IT help desk, and talked several of them into entering their credentials on a fake login page. With those logins they reached an internal admin tool that could take over any account. About 130 accounts were targeted.</p>`,
      ru: `<p>15 июля 2020 года в Twitter-аккаунтах Барака Обамы, Джо Байдена, Илона Маска, Apple и других появилось одно и то же: пришлите биткоины и получите вдвое больше. За несколько часов мошенники собрали больше 100 000 долларов.</p><p>Уязвимость в программах тут ни при чём. Злоумышленники звонили сотрудникам Twitter, представлялись службой IT-поддержки и уговаривали ввести логин и пароль на поддельной странице входа. С этими учётными данными они попали во внутреннюю админку, через которую можно было захватить любой аккаунт. Атаке подверглись около 130 аккаунтов.</p>`,
    },
    take: { en: `The cheapest way past strong technology is a convincing voice on the phone.`, ru: `Самый дешёвый путь в обход сильных технологий — убедительный голос в телефоне.` } },

  { id: 's02-018', kind: 'idea', k: ['d1-c14'], lvl: 1,
    title: { en: `Social engineering: hacking the person`, ru: `Социальная инженерия: взлом человека` },
    body: {
      en: `<p><b>Social engineering</b> means getting people to do something that helps the attacker: reveal a password, open a file, hold a door, send a payment. It works because it uses normal, good human habits.</p><p>Attackers pull a few levers again and again:</p><ul><li><b>Authority</b>: "This is IT" or "the CEO needs this".</li><li><b>Urgency</b>: "Your account closes in one hour".</li><li><b>Helpfulness and trust</b>: most people want to help a polite colleague.</li><li><b>Fear or reward</b>: a fine, a prize, a parcel.</li></ul><p>Spotting the lever is the first defense.</p>`,
      ru: `<p><b>Социальная инженерия</b> — это когда человека заставляют сделать что-то полезное для атакующего: сообщить пароль, открыть файл, придержать дверь, отправить платёж. Она работает, потому что опирается на нормальные, хорошие привычки людей.</p><p>Злоумышленники снова и снова давят на одни и те же рычаги:</p><ul><li><b>Авторитет</b>: «Это IT» или «Это нужно директору».</li><li><b>Срочность</b>: «Ваш аккаунт закроют через час».</li><li><b>Готовность помочь и доверие</b>: большинство хочет помочь вежливому коллеге.</li><li><b>Страх или выгода</b>: штраф, приз, посылка.</li></ul><p>Заметить рычаг — первая защита.</p>`,
    },
    take: { en: `Authority, urgency, trust, fear: when you feel one of them, slow down.`, ru: `Авторитет, срочность, доверие, страх: почувствовали один из них — притормозите.` } },

  { id: 's02-019', kind: 'vs', k: ['d1-c14'], lvl: 1,
    title: { en: `Phishing, spear phishing, whaling, vishing`, ru: `Фишинг, целевой фишинг, «охота на китов», вишинг` },
    body: {
      en: `<ul><li><b>Phishing</b>: the same bait sent to thousands of people. Cheap, and a few always bite.</li><li><b>Spear phishing</b>: aimed at one person or team, using real names, projects and tone.</li><li><b>Whaling</b>: spear phishing aimed at executives, who can approve large payments.</li><li><b>Vishing</b> (voice) and <b>smishing</b> (SMS): the same trick over the phone or text messages.</li><li><b>Business email compromise (BEC)</b>: a real or spoofed executive or supplier mailbox asks for a payment or a change of bank details.</li></ul><p>Rule of thumb: the narrower the target, the more convincing the message.</p>`,
      ru: `<ul><li><b>Фишинг</b> — одна и та же приманка тысячам людей. Дёшево, и кто-нибудь всегда клюнет.</li><li><b>Целевой фишинг</b> (spear phishing) — на одного человека или команду, с настоящими именами, проектами и манерой письма.</li><li><b>«Охота на китов»</b> (whaling) — целевой фишинг на руководителей, которые могут одобрить крупный платёж.</li><li><b>Вишинг</b> (голос) и <b>смишинг</b> (SMS) — тот же приём по телефону или в сообщениях.</li><li><b>Компрометация деловой переписки (BEC)</b> — настоящий или поддельный ящик руководителя или поставщика просит платёж или смену реквизитов.</li></ul><p>Правило: чем уже цель, тем убедительнее сообщение.</p>`,
    },
    take: { en: `Phishing casts a net; spear phishing aims; whaling aims at the top.`, ru: `Фишинг — сеть, целевой фишинг — прицел, «охота на китов» — прицел в руководство.` } },

  { id: 's02-020', kind: 'idea', k: ['d1-c14', 'd7-c11'], lvl: 1,
    title: { en: `Pretexting and tailgating: lies in person`, ru: `Претекстинг и проход «хвостом»: обман вживую` },
    body: {
      en: `<p><b>Pretexting</b> is inventing a believable story to get information or access: a new auditor who "lost the link", a courier who must deliver "to the server room", a caller from the "bank's fraud team".</p><p><b>Tailgating</b> (or <b>piggybacking</b>) is following an authorized person through a secure door. Someone carrying boxes, or simply walking close behind, gets let in out of politeness.</p><p>Defenses are mostly process: verify identity through a channel <i>you</i> choose, escort visitors, use mantraps or turnstiles at sensitive doors, and make it normal to ask "Can I see your badge?"</p>`,
      ru: `<p><b>Претекстинг</b> — правдоподобная легенда, чтобы получить сведения или доступ: новый аудитор, который «потерял ссылку», курьер, которому нужно доставить «прямо в серверную», звонок из «службы безопасности банка».</p><p><b>Проход «хвостом»</b> (tailgating, piggybacking) — проход за сотрудником через защищённую дверь. Человека с коробками или просто идущего следом пропускают из вежливости.</p><p>Защита в основном процедурная: проверять личность по каналу, который выбрали <i>вы</i>, сопровождать посетителей, ставить шлюзы или турникеты на важных дверях и сделать нормой вопрос «Покажите, пожалуйста, пропуск».</p>`,
    },
    take: { en: `Verify through your own channel, and make asking for a badge polite, not rude.`, ru: `Проверяйте по своему каналу и сделайте просьбу показать пропуск вежливой нормой.` } },

  { id: 's02-021', kind: 'think', k: ['d1-c14', 'd7-c3'], lvl: 1,
    title: { en: `The CFO's urgent email`, ru: `Срочное письмо финансового директора` },
    body: {
      en: `<p>At 5:40 p.m. on a Friday, a payments clerk gets an email that appears to come from the CFO: "We're closing a confidential acquisition. Wire €380,000 to the account below before 6. Don't discuss it with anyone, I'm in meetings all evening."</p><p>The address looks right. What should the clerk do?</p>`,
      ru: `<p>В пятницу в 17:40 сотрудник по платежам получает письмо, похожее на письмо финансового директора: «Закрываем конфиденциальную сделку. Переведите 380 000 евро на счёт ниже до 18:00. Ни с кем не обсуждайте, я весь вечер на встречах».</p><p>Адрес выглядит правильным. Что должен сделать сотрудник?</p>`,
    },
    reveal: {
      en: `<p><b>Don't pay; verify through a separate, known channel.</b> Call the CFO on the number from the company directory, not one from the email. Follow the normal payment process, including the second approval, however urgent the request sounds. Then report the email to security, even if it turns out to be real.</p><p>Secrecy, urgency and authority all at once are the classic signs of business email compromise. A good process protects the clerk: "policy requires two approvals" is an easy answer even to a real CFO.</p>`,
      ru: `<p><b>Не платить, а проверить по отдельному известному каналу.</b> Позвонить финансовому директору по номеру из внутреннего справочника, а не из письма. Провести платёж по обычной процедуре со вторым утверждением, как бы срочно это ни звучало. И сообщить о письме в службу ИБ, даже если оно окажется настоящим.</p><p>Секретность, срочность и авторитет сразу — классические признаки BEC. Хорошая процедура защищает сотрудника: «по правилам нужны две подписи» — простой ответ даже настоящему директору.</p>`,
    },
    take: { en: `Urgent + secret + from the top = verify out of band and follow the process.`, ru: `Срочно + секретно + сверху = проверить по другому каналу и действовать по процедуре.` } },

  { id: 's02-022', kind: 'picture', k: ['d1-c14', 'd5-c1', 'd1-c11'], lvl: 1,
    title: { en: `Anatomy of a phishing attack`, ru: `Анатомия фишинговой атаки` },
    body: {
      en: `<p>A phishing attack is a chain of steps, and each step can be broken by a different control. People are one layer, not the only one.</p>`,
      ru: `<p>Фишинговая атака — это цепочка шагов, и каждый шаг можно разорвать своей мерой. Люди — один из слоёв, но не единственный.</p>`,
    },
    dg: { title: { en: `Email → click → password → login`, ru: `Письмо → клик → пароль → вход` }, h: 260,
      nodes: [
        ['m', 95, 70, { en: 'Email arrives', ru: 'Письмо' }, null, '📧', 'bad'],
        ['c', 285, 70, { en: 'User clicks', ru: 'Клик' }, null, '🖱', 'bad'],
        ['p', 475, 70, { en: 'Fake login page', ru: 'Поддельный вход' }, null, '🔑', 'bad'],
        ['a', 665, 70, { en: 'Attacker logs in', ru: 'Вход злоумышленника' }, null, '⚠', 'bad'],
        ['f', 95, 200, { en: 'Mail filter', ru: 'Фильтр почты' }, { en: 'SPF, DKIM, DMARC', ru: 'SPF, DKIM, DMARC' }, '🛡', 'ok'],
        ['t', 285, 200, { en: 'Awareness', ru: 'Осведомлённость' }, { en: 'spot it, report it', ru: 'заметить, сообщить' }, '🧠', 'ok'],
        ['k', 475, 200, { en: 'Phishing-resistant MFA', ru: 'MFA против фишинга' }, { en: 'FIDO2 keys', ru: 'ключи FIDO2' }, '🔐', 'ok'],
        ['d', 665, 200, { en: 'Monitoring', ru: 'Мониторинг' }, { en: 'odd logins alert', ru: 'странные входы' }, '👁', 'ok'],
      ],
      edges: [
        ['m', 'c', null, 'bad'], ['c', 'p', null, 'bad'], ['p', 'a', null, 'bad'],
        ['f', 'm', { en: 'blocks', ru: 'блокирует' }, 'ok'],
        ['t', 'c', { en: 'stops', ru: 'останавливает' }, 'ok'],
        ['k', 'p', { en: 'defeats', ru: 'обесценивает' }, 'ok'],
        ['d', 'a', { en: 'detects', ru: 'обнаруживает' }, 'ok'],
      ] },
    take: { en: `Train people, but assume someone will click: layer filters, MFA and monitoring around them.`, ru: `Учите людей, но исходите из того, что кто-то кликнет: окружите их фильтрами, MFA и мониторингом.` } },

  { id: 's02-023', kind: 'vs', k: ['d1-c14'], lvl: 1,
    title: { en: `Awareness vs training vs education`, ru: `Осведомлённость, обучение и образование` },
    body: {
      en: `<ul><li><b>Awareness</b>: for everyone. Short, repeated reminders that change what people notice and do: posters, briefings, phishing simulations. It answers <i>what</i> to watch for.</li><li><b>Training</b>: for a role. Specific skills for a job: how a developer handles secrets, how the help desk verifies a caller. It answers <i>how</i>.</li><li><b>Education</b>: for specialists. Deep understanding through courses, degrees and certifications like this one. It answers <i>why</i>.</li></ul><p>Rule of thumb: awareness reaches everyone, training fits the job, education builds experts.</p>`,
      ru: `<ul><li><b>Осведомлённость</b> (awareness) — для всех. Короткие повторяющиеся напоминания, которые меняют то, что люди замечают и делают: плакаты, брифинги, фишинговые симуляции. Отвечает на вопрос <i>что</i> замечать.</li><li><b>Обучение</b> (training) — для роли. Конкретные навыки для работы: как разработчик обращается с секретами, как поддержка проверяет звонящего. Отвечает на вопрос <i>как</i>.</li><li><b>Образование</b> (education) — для специалистов. Глубокое понимание через курсы, степени и сертификации вроде этой. Отвечает на вопрос <i>почему</i>.</li></ul><p>Правило: осведомлённость — для всех, обучение — под работу, образование — для экспертов.</p>`,
    },
    take: { en: `Awareness = what (everyone), training = how (role), education = why (experts).`, ru: `Осведомлённость — что (все), обучение — как (роль), образование — почему (эксперты).` } },

  { id: 's02-024', kind: 'idea', k: ['d1-c14', 'd6-c5'], lvl: 2,
    title: { en: `Does the awareness program actually work?`, ru: `Работает ли программа осведомлённости?` },
    body: {
      en: `<p>Counting how many people finished the annual video says little. Measure behavior instead:</p><ul><li><b>Reporting rate</b>: how many people report a simulated phishing email, and how fast. This matters more than the click rate, because one quick report can protect everyone else.</li><li><b>Click rate</b> over time, by department.</li><li><b>Real incidents</b> caused by human error: are they falling?</li></ul><p>Keep simulations fair: teach at the moment of the mistake, never shame people publicly, and refresh the content as attacks change. A program that punishes clicks teaches people to hide them.</p>`,
      ru: `<p>Число сотрудников, досмотревших ежегодное видео, мало о чём говорит. Измеряйте поведение:</p><ul><li><b>Доля сообщивших</b>: сколько людей сообщили о тестовом фишинговом письме и как быстро. Это важнее доли кликов: одно быстрое сообщение защищает всех остальных.</li><li><b>Доля кликов</b> в динамике и по отделам.</li><li><b>Реальные инциденты</b> из-за ошибок людей: становится ли их меньше?</li></ul><p>Симуляции должны быть честными: объясняйте в момент ошибки, никого публично не стыдите и обновляйте содержание вслед за атаками. Программа, которая наказывает за клики, учит их скрывать.</p>`,
    },
    take: { en: `Measure behavior, especially reporting, not attendance.`, ru: `Измеряйте поведение, особенно сообщения об угрозах, а не посещаемость.` } },

  { id: 's02-025', kind: 'back', back: 's01-026', k: ['d1-c11', 'd1-c14'], lvl: 1,
    title: { en: `People as a control, and as a sensor`, ru: `Люди как мера защиты и как датчик` },
    body: {
      en: `<p>Remember the three materials of controls: administrative, technical, physical? An awareness program is an <b>administrative</b> control, and its main function is <b>preventive</b>: people who recognize a scam don't fall for it.</p><p>But trained people are also <b>detective</b>. An employee who reports a strange email or an unknown visitor is a sensor that no tool can replace: they notice context, such as "our CFO never writes like this". Many incidents are first spotted by a person, not a tool.</p>`,
      ru: `<p>Помните три «материала» мер: административные, технические, физические? Программа осведомлённости — <b>административная</b> мера, и её главная функция — <b>превентивная</b>: тот, кто узнаёт обман, на него не попадается.</p><p>Но обученные люди — ещё и <b>детективная</b> мера. Сотрудник, сообщивший о странном письме или незнакомом посетителе, — датчик, которого не заменит ни один инструмент: он замечает контекст вроде «наш финдиректор так не пишет». Многие инциденты первым замечает человек, а не система.</p>`,
    },
    take: { en: `Awareness is an administrative control that prevents, and turns staff into detectors.`, ru: `Осведомлённость — административная мера, которая предотвращает и превращает сотрудников в датчики.` } },

  { id: 's02-026', kind: 'story', k: ['d1-c8', 'd7-c3', 'd1-c13'], lvl: 2,
    title: { en: `Snowden 2013: the contractor with the keys`, ru: `Сноуден, 2013: подрядчик с ключами` },
    body: {
      en: `<p>In 2013, Edward Snowden, a systems administrator working for the NSA through the contractor Booz Allen Hamilton, copied a vast number of classified documents and passed them to journalists. Whatever one thinks of his motives, the security lessons are clear.</p><p>His admin role gave him broad access, far beyond what any single task required. Few people checked what administrators did with it. An NSA memo later said that a colleague had let him use their own credentials. Afterwards, the NSA introduced a <b>two-person rule</b> for sysadmins working with the most sensitive data.</p>`,
      ru: `<p>В 2013 году Эдвард Сноуден, системный администратор, работавший на АНБ через подрядчика Booz Allen Hamilton, скопировал огромное количество секретных документов и передал их журналистам. Как бы ни оценивать его мотивы, уроки для безопасности понятны.</p><p>Роль администратора давала ему широкий доступ, гораздо больше, чем требовала любая отдельная задача. Что администраторы делают с этим доступом, почти никто не проверял. Позже в служебной записке АНБ говорилось, что коллега разрешил ему пользоваться своими учётными данными. После этого АНБ ввело <b>правило двух человек</b> для администраторов, работающих с самыми чувствительными данными.</p>`,
    },
    take: { en: `Admins and contractors are insiders too: limit, log and pair their most powerful access.`, ru: `Администраторы и подрядчики — тоже инсайдеры: ограничивайте, журналируйте и удваивайте их самый сильный доступ.` } },

  { id: 's02-027', kind: 'idea', k: ['d1-c8', 'd7-c2'], lvl: 2,
    title: { en: `Insider threat: the signs to watch`, ru: `Внутренняя угроза: на что смотреть` },
    body: {
      en: `<p>Most insiders who cause harm show warning signs first. Typical ones:</p><ul><li><b>Behavior</b>: open anger at the company, a recent demotion or a denied raise, sudden money trouble.</li><li><b>Activity</b>: reaching data outside their role, large downloads or uploads to personal storage, logins at odd hours, interest in projects they don't work on.</li><li><b>Timing</b>: the weeks around a resignation are the riskiest.</li></ul><p>No single sign proves anything. The value comes from HR and security seeing the picture together, with tools such as DLP and user behavior analytics, under a clear policy that respects privacy law.</p>`,
      ru: `<p>Большинство инсайдеров, причинивших вред, заранее подают сигналы. Типичные:</p><ul><li><b>Поведение</b>: открытая злость на компанию, недавнее понижение или отказ в повышении, внезапные денежные проблемы.</li><li><b>Активность</b>: доступ к данным вне своей роли, крупные выгрузки или загрузки в личные хранилища, входы в необычное время, интерес к чужим проектам.</li><li><b>Время</b>: самые опасные недели — вокруг увольнения по собственному желанию.</li></ul><p>Ни один признак ничего не доказывает. Пользу даёт общая картина у HR и ИБ, инструменты вроде DLP и анализа поведения пользователей и ясная политика, соблюдающая законы о приватности.</p>`,
    },
    take: { en: `Insider signs are clues, not proof: combine HR and technical views, within the law.`, ru: `Признаки инсайдера — подсказки, а не доказательства: сводите взгляды HR и ИБ в рамках закона.` } },

  { id: 's02-028', kind: 'think', k: ['d1-c8', 'd7-c4', 'd7-c1'], lvl: 2,
    title: { en: `40 GB on the last day`, ru: `40 ГБ в последний день` },
    body: {
      en: `<p>A senior engineer resigned last week to join a competitor. The DLP system flags that, yesterday evening, their account copied 40 GB of design documents to a personal cloud drive. They're still working out their notice period.</p><p>You're in the security team. What do you do first?</p>`,
      ru: `<p>Ведущий инженер на прошлой неделе уволился по собственному желанию и переходит к конкуренту. DLP-система сообщает, что вчера вечером с его учётной записи 40 ГБ проектной документации скопировали в личное облачное хранилище. Он ещё отрабатывает последние дни.</p><p>Вы в команде ИБ. Что делаете в первую очередь?</p>`,
    },
    reveal: {
      en: `<p><b>Follow the incident process: preserve the evidence and escalate to management, HR and legal.</b> Save the DLP alert and the related logs so they can be used later. Management, with HR and legal, decides on the next steps: restricting access now, asking for the data back, or involving the authorities.</p><p>The instinct is to confront the engineer or quietly delete the files yourself. Both are wrong: confronting them can destroy evidence, and acting on your own goes beyond your role. You may also be wrong, since the account itself could be compromised.</p>`,
      ru: `<p><b>Действовать по процессу реагирования: сохранить доказательства и передать вопрос руководству, HR и юристам.</b> Сохраните оповещение DLP и связанные журналы, чтобы их можно было использовать позже. Дальше решает руководство вместе с HR и юристами: ограничить доступ сейчас, потребовать вернуть данные или подключить правоохранительные органы.</p><p>Хочется поговорить с инженером напрямую или тихо удалить файлы самому. И то и другое неверно: разговор может привести к уничтожению улик, а самостоятельные действия выходят за рамки вашей роли. К тому же вы можете ошибаться: учётную запись могли взломать.</p>`,
    },
    take: { en: `Preserve, escalate, let management decide; don't investigate alone or tip them off.`, ru: `Сохранить, передать наверх, решает руководство; не расследовать в одиночку и не спугнуть.` } },

  { id: 's02-029', kind: 'vs', k: ['d1-c8'], lvl: 2,
    title: { en: `Malicious, careless or compromised insider`, ru: `Злонамеренный, небрежный или скомпрометированный инсайдер` },
    body: {
      en: `<p>"Insider threat" covers three quite different people:</p><ul><li><b>Malicious</b>: wants to cause harm or profit, like a fraudster or a disgruntled admin. Countered by SoD, least privilege, monitoring and good offboarding.</li><li><b>Careless</b> (negligent): means well but makes mistakes, like emailing a spreadsheet to the wrong person or leaving a laptop on a train. The most common kind. Countered by training, DLP and encryption.</li><li><b>Compromised</b>: an honest employee whose account an attacker controls, like the Twitter staff in 2020. Countered by MFA and detecting odd behavior.</li></ul>`,
      ru: `<p>«Внутренняя угроза» — это три очень разных человека:</p><ul><li><b>Злонамеренный</b>: хочет навредить или нажиться, как мошенник или обиженный администратор. Против него: SoD, минимум прав, мониторинг, правильное увольнение.</li><li><b>Небрежный</b>: хочет как лучше, но ошибается — отправил таблицу не тому адресату, забыл ноутбук в поезде. Самый частый случай. Против него: обучение, DLP, шифрование.</li><li><b>Скомпрометированный</b>: честный сотрудник, чьей учётной записью управляет злоумышленник, как сотрудники Twitter в 2020 году. Против него: MFA и обнаружение необычного поведения.</li></ul>`,
    },
    take: { en: `Malicious needs limits, careless needs training, compromised needs MFA and detection.`, ru: `Злонамеренному — ограничения, небрежному — обучение, скомпрометированному — MFA и обнаружение.` } },

  { id: 's02-030', kind: 'link', k: ['d1-c14', 'd7-c4', 'd6-c5'], lvl: 2,
    title: { en: `Why blame makes you less secure`, ru: `Почему поиск виноватых снижает защищённость` },
    body: {
      en: `<p>Follow the chain from culture to incident response:</p><ol><li><b>Culture</b>: if people get punished for clicking, they stop admitting it.</li><li><b>Reporting</b>: no report means the attacker's foothold stays hidden.</li><li><b>Detection</b>: the time between break-in and discovery grows from minutes to months.</li><li><b>Response</b>: the longer the attacker stays, the more data and systems are lost.</li><li><b>Metrics</b>: the dashboard shows fewer reported incidents, and looks better while things get worse.</li></ol><p>A "thank you for reporting, even if you clicked" culture is a real security control.</p>`,
      ru: `<p>Проследим цепочку от культуры до реагирования:</p><ol><li><b>Культура</b>: если за клик наказывают, люди перестают в нём признаваться.</li><li><b>Сообщения</b>: нет сообщения — плацдарм злоумышленника остаётся скрытым.</li><li><b>Обнаружение</b>: время от взлома до обнаружения растёт с минут до месяцев.</li><li><b>Реагирование</b>: чем дольше злоумышленник внутри, тем больше потерянных данных и систем.</li><li><b>Метрики</b>: на дашборде меньше инцидентов, и всё выглядит лучше, пока становится хуже.</li></ol><p>Культура «спасибо, что сообщили, даже если кликнули» — настоящая мера защиты.</p>`,
    },
    take: { en: `Blame hides incidents; fast, safe reporting shortens them.`, ru: `Наказания прячут инциденты, а быстрые и безопасные сообщения их сокращают.` } },

  { id: 's02-031', kind: 'back', back: 's02-008', k: ['d7-c3', 'd5-c6'], lvl: 2,
    title: { en: `Least privilege after the phishing email`, ru: `Минимальные привилегии после фишингового письма` },
    body: {
      en: `<p>Back to least privilege, now from the attacker's side. Phishing steals whatever access the victim has. So the damage of a successful phish is decided long before the email arrives, by how much that person could reach.</p><p>At Twitter in 2020, the internal tool that could take over any account was available to a large number of support staff. Fewer people with that power, and an extra approval for high-profile accounts, would have made each stolen login worth much less.</p><p>Least privilege is also a way of planning for the click you can't prevent.</p>`,
      ru: `<p>Вернёмся к минимальным привилегиям, теперь глазами злоумышленника. Фишинг крадёт тот доступ, который есть у жертвы. Значит, ущерб от успешного фишинга определяется задолго до письма: тем, до чего этот человек мог дотянуться.</p><p>В Twitter в 2020 году внутренний инструмент, позволявший захватить любой аккаунт, был доступен множеству сотрудников поддержки. Меньше людей с такой властью и дополнительное подтверждение для известных аккаунтов сделали бы каждый украденный логин гораздо менее ценным.</p><p>Минимальные привилегии — ещё и подготовка к клику, который не удалось предотвратить.</p>`,
    },
    take: { en: `Least privilege limits the blast radius of every stolen login.`, ru: `Минимальные привилегии ограничивают «радиус поражения» каждого украденного логина.` } },

  { id: 's02-032', kind: 'idea', k: ['d1-c8', 'd1-c3'], lvl: 1,
    title: { en: `What employees sign: AUP and NDA`, ru: `Что подписывают сотрудники: AUP и NDA` },
    body: {
      en: `<p>Two documents set the rules before access is granted:</p><ul><li><b>Acceptable use policy (AUP)</b>: what you may and may not do with company systems: no personal crypto mining, no sharing passwords, monitoring may happen.</li><li><b>Non-disclosure agreement (NDA)</b>: what information you must keep secret, during and after employment.</li></ul><p>Signing them is a deterrent, and it creates a record: nobody can later claim they didn't know. Ask for a fresh acknowledgment each year, ideally as part of awareness training, so the rules stay current in people's minds.</p>`,
      ru: `<p>Два документа задают правила до выдачи доступа:</p><ul><li><b>Политика допустимого использования (AUP)</b>: что можно и чего нельзя делать с системами компании — никакого личного майнинга, никакой передачи паролей, возможен мониторинг.</li><li><b>Соглашение о неразглашении (NDA)</b>: какую информацию нужно хранить в тайне во время работы и после неё.</li></ul><p>Подпись — сдерживающая мера, и она оставляет след: никто потом не скажет, что не знал. Просите подтверждать ознакомление каждый год, лучше в рамках обучения осведомлённости, чтобы правила оставались на слуху.</p>`,
    },
    take: { en: `AUP and NDA: signed before access, renewed every year.`, ru: `AUP и NDA: подписать до доступа и подтверждать каждый год.` } },

  { id: 's02-033', kind: 'think', k: ['d1-c14', 'd1-c8', 'd7-c4'], lvl: 2,
    title: { en: `"Fire whoever clicked"`, ru: `«Уволить того, кто кликнул»` },
    body: {
      en: `<p>Ransomware got in through a phishing email that one employee in the finance team opened. Recovery took four days. At the review meeting, the CEO says: "Find who clicked and fire them, so everyone learns."</p><p>As the security manager, what do you recommend?</p>`,
      ru: `<p>Программа-вымогатель проникла через фишинговое письмо, которое открыл сотрудник финансового отдела. Восстановление заняло четыре дня. На разборе генеральный директор говорит: «Найдите, кто кликнул, и увольте его, чтобы все усвоили урок».</p><p>Что вы порекомендуете как руководитель ИБ?</p>`,
    },
    reveal: {
      en: `<p><b>Focus the review on controls and process, not on one person.</b> Ask why a single click could spread so far: missing MFA, too broad access, no segmentation, slow detection. Fix those, and use the case, without names, in awareness training.</p><p>The decision is the CEO's, so give a reasoned recommendation rather than refuse. Firing the person tells everyone to hide their mistakes next time, which slows detection. Discipline belongs to HR policy, for deliberate or repeated violations, not for one honest mistake.</p>`,
      ru: `<p><b>Сосредоточить разбор на мерах и процессах, а не на человеке.</b> Выяснить, почему один клик смог распространиться так далеко: нет MFA, слишком широкий доступ, нет сегментации, медленное обнаружение. Исправить это и использовать случай (без имён) в обучении осведомлённости.</p><p>Решение за генеральным директором, поэтому дайте обоснованную рекомендацию, а не отказ. Увольнение научит всех в следующий раз скрывать ошибки, и обнаружение замедлится. Дисциплинарные меры — дело кадровой политики, для умышленных или повторных нарушений, а не для одной честной ошибки.</p>`,
    },
    take: { en: `After a click, fix the system that let one click matter so much.`, ru: `После клика чините систему, в которой один клик так много значил.` } },

  { id: 's02-034', kind: 'idea', k: ['d1-c14', 'd8-c5'], lvl: 2,
    title: { en: `Different people, different training`, ru: `Разным людям — разное обучение` },
    body: {
      en: `<p>One annual course for everyone is a start, not a program. Each group faces different attacks and makes different mistakes:</p><ul><li><b>Executives</b>: whaling, deepfake voice calls, approving exceptions.</li><li><b>Finance and HR</b>: payment fraud, fake bank-detail changes, requests for employee data.</li><li><b>Help desk</b>: callers posing as staff to reset passwords or MFA.</li><li><b>Developers</b>: secure coding, handling secrets, trusting open-source packages.</li><li><b>Admins</b>: privileged account hygiene, change control.</li></ul><p>Train new joiners before they get access, and repeat at least once a year.</p>`,
      ru: `<p>Один ежегодный курс для всех — это начало, а не программа. Разные группы сталкиваются с разными атаками и ошибаются по-разному:</p><ul><li><b>Руководители</b>: «охота на китов», голосовые дипфейки, одобрение исключений.</li><li><b>Финансы и HR</b>: платёжное мошенничество, поддельная смена реквизитов, запросы данных сотрудников.</li><li><b>Служба поддержки</b>: звонящие под видом сотрудников, чтобы сбросить пароль или MFA.</li><li><b>Разработчики</b>: безопасный код, работа с секретами, доверие к пакетам open source.</li><li><b>Администраторы</b>: гигиена привилегированных учётных записей, управление изменениями.</li></ul><p>Обучайте новичков до выдачи доступа и повторяйте хотя бы раз в год.</p>`,
    },
    take: { en: `Train each role against the attacks it actually meets.`, ru: `Учите каждую роль против тех атак, с которыми она реально сталкивается.` } },

  { id: 's02-035', kind: 'recap', lvl: 1,
    title: { en: `Stage 2 in seven lines`, ru: `Этап 2 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s02-004', { en: `Every stage of employment has its own threat and its own control.`, ru: `У каждого этапа работы своя угроза и своя мера.` }],
      ['s02-006', { en: `SoD splits the task, rotation changes the person, vacation removes the person.`, ru: `SoD делит задачу, ротация меняет человека, отпуск убирает человека.` }],
      ['s02-012', { en: `When someone leaves, cut access as the meeting starts.`, ru: `При увольнении отключайте доступ в начале встречи.` }],
      ['s02-016', { en: `Contractors and vendors with access are insiders too.`, ru: `Подрядчики и поставщики с доступом — тоже инсайдеры.` }],
      ['s02-018', { en: `Social engineering pulls on authority, urgency, trust and fear.`, ru: `Социальная инженерия давит на авторитет, срочность, доверие и страх.` }],
      ['s02-023', { en: `Awareness for everyone, training for the role, education for experts.`, ru: `Осведомлённость — всем, обучение — под роль, образование — экспертам.` }],
      ['s02-030', { en: `Make reporting safe: blame hides incidents.`, ru: `Сделайте сообщения безопасными: наказания прячут инциденты.` }],
    ],
    take: { en: `Next: the thing all these people handle every day, data.`, ru: `Дальше — то, с чем все эти люди работают каждый день: данные.` } },
] });
