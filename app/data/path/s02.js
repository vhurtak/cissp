'use strict';
// Learning path, stage 2: people are part of the system. Hiring, duties, vacations, leaving, vendors.
// In progress: the stage continues after s02-016 (awareness, social engineering, insiders) and ends with a recap.
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
] });
