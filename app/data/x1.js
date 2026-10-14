'use strict';
// Beginner layer for Domain 1: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(1, {
  'd1-c1': {
    plain: {
      en: `<p>Think of a bank safe. <b>Confidentiality</b>: only the right people can look inside. <b>Integrity</b>: nobody can quietly swap the banknotes for fakes. <b>Availability</b>: when you need your money, the safe actually opens. Every security control protects at least one of these three.</p>`,
      ru: `<p>Представьте банковский сейф. <b>Конфиденциальность</b>: заглянуть внутрь могут только те, кому положено. <b>Целостность</b>: никто не может незаметно подменить купюры на фальшивые. <b>Доступность</b>: когда деньги нужны, сейф действительно открывается. Любая мера защиты охраняет хотя бы одно из этих трёх свойств.</p>`,
    },
    ex: {
      en: `<p>A hospital's records system shows all three. A nurse posting a celebrity's chart online breaks <b>confidentiality</b>. Ransomware that encrypts the records breaks <b>availability</b>: surgeries get postponed. A changed allergy entry breaks <b>integrity</b> and can kill a patient. That is why hospitals use access control, backups and audit logs together.</p>`,
      ru: `<p>В больничной системе видны все три свойства. Медсестра, выложившая карту знаменитости в сеть, нарушает <b>конфиденциальность</b>. Шифровальщик, заблокировавший записи, нарушает <b>доступность</b>: операции переносят. Изменённая запись об аллергии нарушает <b>целостность</b> и может стоить пациенту жизни. Поэтому больницы применяют вместе контроль доступа, резервные копии и журналы аудита.</p>`,
    },
  },
  'd1-c2': {
    plain: {
      en: `<p>Governance is how a company <i>steers</i> security, the way a captain sets the course and the crew rows. The board and executives decide how much risk is acceptable and pay for protection. The CISO (Chief Information Security Officer) turns that into a program. <b>Due care</b> is doing the right thing (actually locking the door). <b>Due diligence</b> is checking that it keeps being done (walking around at night to test the locks).</p>`,
      ru: `<p>Управление (governance) — это то, как компания <i>направляет</i> безопасность: капитан задаёт курс, команда гребёт. Совет директоров и руководство решают, какой риск допустим, и платят за защиту. CISO (директор по информационной безопасности) превращает это в программу. <b>Должная забота (due care)</b> — делать правильное (действительно запирать дверь). <b>Должная осмотрительность (due diligence)</b> — проверять, что это продолжают делать (обходить здание ночью и дёргать замки).</p>`,
    },
    ex: {
      en: `<p>After the 2017 Equifax breach (an unpatched web server exposed data on about 147 million people), the CEO, CIO and CSO all left, and the company paid around $700 million in settlements. A patch policy existed on paper, but nobody verified it was followed: a failure of due diligence that landed on senior management, because they own the risk.</p>`,
      ru: `<p>После утечки в Equifax в 2017 году (через непропатченный веб-сервер утекли данные примерно 147 млн человек) ушли CEO, CIO и CSO, а компания заплатила около $700 млн по искам. Политика патчей существовала на бумаге, но никто не проверял её исполнение: провал due diligence, за который отвечает высшее руководство, ведь риск принадлежит ему.</p>`,
    },
    dg: {
      title: { en: 'Who governs security', ru: 'Кто управляет безопасностью' }, h: 300,
      nodes: [
        ['board', 300, 40, { en: 'Board of directors', ru: 'Совет директоров' }, { en: 'sets risk appetite', ru: 'задаёт аппетит к риску' }, '🏛', 'key'],
        ['ceo', 300, 120, 'CEO', { en: 'ultimately accountable', ru: 'несёт итоговую ответственность' }, '👔', 'key'],
        ['ciso', 300, 200, 'CISO', { en: 'runs the security program', ru: 'ведёт программу ИБ' }, '🛡'],
        ['own', 140, 270, { en: 'Data / system owners', ru: 'Владельцы данных и систем' }, null, '🗂'],
        ['it', 460, 270, { en: 'IT and security staff', ru: 'IT и специалисты ИБ' }, null, '🧑‍💻'],
        ['audit', 640, 120, { en: 'Auditors', ru: 'Аудиторы' }, { en: 'independent check', ru: 'независимая проверка' }, '🔍', 'ok'],
      ],
      edges: [
        ['board', 'ceo', { en: 'direction', ru: 'курс' }], ['ceo', 'ciso', { en: 'budget + mandate', ru: 'бюджет + полномочия' }],
        ['ciso', 'own'], ['ciso', 'it'],
        ['audit', 'board', { en: 'reports to', ru: 'отчёт' }, 'ok dash'], ['audit', 'ciso', { en: 'tests controls', ru: 'проверяет меры' }, 'ok dash'],
      ],
      note: { en: 'Accountability flows up (senior management owns the risk); responsibility for the work flows down. Auditors report to the board, not to the people they audit.', ru: 'Подотчётность идёт вверх (риск принадлежит высшему руководству), ответственность за работу — вниз. Аудиторы отчитываются совету, а не тем, кого проверяют.' },
    },
  },
  'd1-c3': {
    plain: {
      en: `<p>Think of driving. The <b>policy</b> is the law: "drive safely". The <b>standard</b> sets the hard rule: "speed limit 50 km/h in town". The <b>baseline</b> is the minimum every car must have: working brakes and lights. The <b>procedure</b> is the step-by-step driving-school checklist. A <b>guideline</b> is friendly advice: "leave early when it rains". Only guidelines are optional.</p>`,
      ru: `<p>Представьте вождение. <b>Политика</b> — это закон: «езди безопасно». <b>Стандарт</b> — жёсткое правило: «в городе не больше 50 км/ч». <b>Базовый уровень (baseline)</b> — минимум для каждой машины: исправные тормоза и фары. <b>Процедура</b> — пошаговый чек-лист автошколы. <b>Руководство (guideline)</b> — дружеский совет: «в дождь выезжай пораньше». Необязательны только руководства.</p>`,
    },
    ex: {
      en: `<p>A retailer's policy says "customer card data must be protected". The standard requires AES-256 encryption and PCI DSS compliance. The baseline is a CIS Benchmark hardening profile for every payment server. A procedure walks an admin through rotating the encryption key. A guideline suggests using a password manager. When an auditor asks "why AES-256?", the answer points back up the chain to the policy.</p>`,
      ru: `<p>Политика ритейлера: «данные карт клиентов должны быть защищены». Стандарт требует шифрования AES-256 и соответствия PCI DSS. Базовый уровень — профиль харденинга CIS Benchmark для каждого платёжного сервера. Процедура пошагово описывает админу смену ключа шифрования. Руководство советует пользоваться менеджером паролей. Когда аудитор спрашивает «почему AES-256?», ответ ведёт вверх по цепочке к политике.</p>`,
    },
  },
  'd1-c4': {
    plain: {
      en: `<p>Different laws play different games. <b>Criminal</b> law: the state against someone who harmed society, and prison is possible. <b>Civil</b> law: one party sues another for money. <b>Administrative</b> (regulatory) law: rules set by agencies, such as fines from a data-protection authority. Privacy laws like the EU <b>GDPR</b> say what you may do with personal data and how fast you must report a breach (72 hours under GDPR).</p>`,
      ru: `<p>Разные виды права играют по разным правилам. <b>Уголовное</b>: государство против того, кто навредил обществу, возможна тюрьма. <b>Гражданское</b>: одна сторона судится с другой за деньги. <b>Административное</b> (регуляторное): правила ведомств, например штрафы от органа по защите данных. Законы о приватности вроде европейского <b>GDPR</b> определяют, что можно делать с персональными данными и как быстро сообщать об утечке (72 часа по GDPR).</p>`,
    },
    ex: {
      en: `<p>In 2023 the Irish Data Protection Commission fined Meta €1.2 billion under GDPR for transferring EU users' data to the US: an administrative penalty. At the same time, users could file civil claims for damages. If an employee had sold the data, that would be a criminal case. One incident can trigger all three.</p>`,
      ru: `<p>В 2023 году ирландский регулятор по защите данных оштрафовал Meta на €1,2 млрд по GDPR за передачу данных пользователей из ЕС в США — административное наказание. Параллельно пользователи могли подать гражданские иски о возмещении. Если бы данные продал сотрудник, это было бы уголовное дело. Один инцидент может запустить все три вида.</p>`,
    },
  },
  'd1-c5': {
    plain: {
      en: `<p>Who is investigating decides how careful you must be. An <b>administrative</b> (internal HR) investigation is like a school asking "who broke the window?": low bar, no court. A <b>criminal</b> one involves police and must prove guilt "beyond a reasonable doubt", so evidence handling must be perfect. <b>Civil</b> cases need only "more likely than not". <b>Regulatory</b> ones are run by a government agency checking the rules.</p>`,
      ru: `<p>От того, кто расследует, зависит, насколько аккуратным нужно быть. <b>Административное</b> (внутреннее, HR) расследование — как в школе: «кто разбил окно?», низкая планка, без суда. <b>Уголовное</b> — с полицией, вину нужно доказать «вне разумных сомнений», поэтому обращение с доказательствами должно быть безупречным. В <b>гражданском</b> достаточно «скорее да, чем нет». <b>Регуляторное</b> ведёт госорган, проверяя соблюдение правил.</p>`,
    },
    ex: {
      en: `<p>An engineer copies source code to a USB stick before joining a competitor. HR starts an administrative investigation and fires them. The company then sues for damages (civil). If prosecutors bring trade-secret theft charges (criminal), the laptop image must have a clean chain of custody from day one. Treat evidence as if the case will end up in criminal court.</p>`,
      ru: `<p>Инженер копирует исходники на флешку перед уходом к конкуренту. HR проводит административное расследование и увольняет его. Затем компания подаёт иск о возмещении (гражданское дело). Если прокуратура возбудит дело о краже коммерческой тайны (уголовное), образ ноутбука должен иметь чистую цепочку хранения с первого дня. Обращайтесь с доказательствами так, будто дело дойдёт до уголовного суда.</p>`,
    },
  },
  'd1-c6': {
    plain: {
      en: `<p>The ISC2 Code of Ethics is a ranked to-do list for tricky situations. First, protect society. Second, act honorably and legally. Third, serve your employer and clients well. Fourth, help the profession grow. If serving your employer would harm the public, the public wins because it is higher on the list.</p>`,
      ru: `<p>Кодекс этики ISC2 — упорядоченный список приоритетов для сложных ситуаций. Первое: защищай общество. Второе: действуй честно и законно. Третье: добросовестно служи работодателю и клиентам. Четвёртое: развивай профессию. Если служба работодателю навредит обществу, побеждает общество, потому что оно выше в списке.</p>`,
    },
    ex: {
      en: `<p>Your manager asks you to sign off a medical-device update while a known flaw could let attackers change insulin doses. Canon 3 (serve the employer) says ship it. Canon 1 (protect society) says escalate and refuse to sign until the risk is handled. Canon 1 wins. The exam rewards exactly this ordering.</p>`,
      ru: `<p>Руководитель просит подписать обновление медицинского устройства, хотя известная уязвимость позволяет злоумышленнику менять дозу инсулина. Канон 3 (служи работодателю) говорит: выпускай. Канон 1 (защищай общество) говорит: эскалируй и не подписывай, пока риск не устранён. Побеждает канон 1. Экзамен вознаграждает именно такой порядок.</p>`,
    },
  },
  'd1-c7': {
    plain: {
      en: `<p>BCP (business continuity planning) answers: "If our office, data center or key supplier disappears tomorrow, how do we keep serving customers?" The BIA (business impact analysis) comes first: it lists what the business does, what each function costs per hour when it is down, and how long it can survive. Those numbers become <b>MTD</b> (maximum tolerable downtime), <b>RTO</b> (time to restore) and <b>RPO</b> (how much data you can afford to lose).</p>`,
      ru: `<p>BCP (планирование непрерывности бизнеса) отвечает на вопрос: «Если завтра исчезнет офис, дата-центр или ключевой поставщик, как мы продолжим обслуживать клиентов?» Сначала проводится BIA (анализ влияния на бизнес): перечень функций, сколько стоит час простоя каждой и сколько бизнес продержится без неё. Из этих чисел получаются <b>MTD</b> (максимально допустимый простой), <b>RTO</b> (время восстановления) и <b>RPO</b> (сколько данных можно потерять).</p>`,
    },
    ex: {
      en: `<p>An online shop's BIA finds that checkout loses €20,000 per hour and customers leave for good after 8 hours (MTD = 8 h). The team sets RTO = 4 h, leaving margin. Orders are replicated every 15 minutes (RPO = 15 min). The newsletter system can wait a week, so it gets the cheapest recovery option. Money goes where the BIA says the pain is.</p>`,
      ru: `<p>BIA интернет-магазина показывает: оформление заказов теряет €20 000 в час, а через 8 часов клиенты уходят навсегда (MTD = 8 ч). Команда ставит RTO = 4 ч с запасом. Заказы реплицируются каждые 15 минут (RPO = 15 мин). Рассылка может подождать неделю, поэтому получает самый дешёвый вариант восстановления. Деньги идут туда, где BIA показала боль.</p>`,
    },
    dg: {
      title: { en: 'BCP timeline: RPO, RTO and MTD', ru: 'Шкала BCP: RPO, RTO и MTD' }, h: 260,
      nodes: [
        ['bk', 80, 130, { en: 'Last backup', ru: 'Последний бэкап' }, '09:45', '💾', 'ok'],
        ['dis', 230, 130, { en: 'Disaster', ru: 'Авария' }, '10:00', '💥', 'bad'],
        ['rec', 490, 130, { en: 'Service restored', ru: 'Сервис восстановлен' }, '14:00', '✅', 'ok'],
        ['mtd', 680, 130, { en: 'MTD limit', ru: 'Предел MTD' }, '18:00', '⛔', 'bad'],
        ['rpo', 165, 225, { en: 'RPO = 15 min of data lost', ru: 'RPO = потеря 15 мин данных' }, null, null, 'dim'],
        ['rto', 360, 40, { en: 'RTO = 4 h to recover', ru: 'RTO = 4 ч на восстановление' }, null, null, 'key'],
        ['wrt', 585, 225, { en: 'margin', ru: 'запас' }, null, null, 'dim'],
      ],
      edges: [['bk', 'dis'], ['dis', 'rec', { en: 'recovery', ru: 'восстановление' }, 'key'], ['rec', 'mtd', null, 'dash'], ['rpo', 'bk', null, 'dash'], ['rpo', 'dis', null, 'dash'], ['rto', 'dis', null, 'dash'], ['rto', 'rec', null, 'dash'], ['wrt', 'rec', null, 'dash'], ['wrt', 'mtd', null, 'dash']],
      note: { en: 'RPO looks back from the disaster (data lost), RTO looks forward (time to recover). RTO must always be shorter than MTD.', ru: 'RPO смотрит назад от аварии (потерянные данные), RTO — вперёд (время восстановления). RTO всегда должно быть меньше MTD.' },
    },
  },
  'd1-c8': {
    plain: {
      en: `<p>People are part of the system, so they get "security controls" too, across their whole career: check them before hiring, give them only the access they need, rotate duties and enforce vacations so fraud surfaces, and on the last day take everything back. Think of a hotel: the key card works only for your room and stops working at checkout.</p>`,
      ru: `<p>Люди — часть системы, поэтому и к ним применяются «меры защиты» на протяжении всей карьеры: проверка перед наймом, только нужный доступ, ротация обязанностей и обязательный отпуск, чтобы всплыло мошенничество, а в последний день — забрать всё обратно. Как в отеле: карта открывает только ваш номер и перестаёт работать при выезде.</p>`,
    },
    ex: {
      en: `<p>At Société Générale, trader Jérôme Kerviel hid about €50 billion of unauthorized positions, causing a €4.9 billion loss in 2008. He had worked in the back office, knew the controls, and rarely took vacation. A mandatory two-week absence, during which someone else runs his book, would likely have exposed the hidden trades much earlier.</p>`,
      ru: `<p>В Société Générale трейдер Жером Кервьель скрыл неавторизованные позиции примерно на €50 млрд, что привело к убытку €4,9 млрд в 2008 году. Он раньше работал в бэк-офисе, знал контроли и почти не брал отпуск. Обязательные две недели отсутствия, когда его книгу ведёт другой, скорее всего, вскрыли бы скрытые сделки гораздо раньше.</p>`,
    },
  },
  'd1-c9': {
    plain: {
      en: `<p>Risk is "what could go wrong, how likely, and how bad". A house (<b>asset</b>) in a dry forest (<b>threat</b>: wildfire) with a wooden roof (<b>vulnerability</b>) has high risk. You can <b>mitigate</b> it (fire-resistant roof), <b>transfer</b> it (insurance), <b>avoid</b> it (move away) or <b>accept</b> it (live with it, knowingly). Ignoring it without a decision is never acceptable.</p>`,
      ru: `<p>Риск — это «что может пойти не так, насколько вероятно и насколько плохо». Дом (<b>актив</b>) в сухом лесу (<b>угроза</b>: пожар) с деревянной крышей (<b>уязвимость</b>) — высокий риск. Его можно <b>снизить</b> (огнестойкая крыша), <b>передать</b> (страховка), <b>избежать</b> (переехать) или <b>принять</b> (осознанно жить с ним). Игнорировать без решения — недопустимо.</p>`,
    },
    ex: {
      en: `<p>A laptop with customer data is worth €2,000, but a breach would cost €200,000 (SLE, single loss expectancy). The company expects one lost laptop with data every two years (ARO = 0.5), so ALE (annualized loss expectancy) = €100,000. Full-disk encryption for all laptops costs €15,000 per year and cuts the breach cost almost to zero, so it is clearly worth it.</p>`,
      ru: `<p>Ноутбук с данными клиентов стоит €2 000, но утечка обойдётся в €200 000 (SLE, ожидаемый ущерб от одного случая). Компания ожидает одну потерю ноутбука с данными раз в два года (ARO = 0,5), значит ALE (годовой ожидаемый ущерб) = €100 000. Полнодисковое шифрование всех ноутбуков стоит €15 000 в год и сводит ущерб почти к нулю — это явно выгодно.</p>`,
    },
    dg: {
      title: { en: 'From asset to risk decision', ru: 'От актива к решению по риску' }, h: 300,
      nodes: [
        ['as', 90, 50, { en: 'Asset', ru: 'Актив' }, { en: 'customer database', ru: 'база клиентов' }, '💎', 'ok'],
        ['th', 90, 150, { en: 'Threat', ru: 'Угроза' }, { en: 'ransomware gang', ru: 'группа вымогателей' }, '🦹', 'bad'],
        ['vu', 90, 250, { en: 'Vulnerability', ru: 'Уязвимость' }, { en: 'unpatched VPN', ru: 'непропатченный VPN' }, '🕳', 'bad'],
        ['risk', 330, 150, { en: 'Risk', ru: 'Риск' }, { en: 'likelihood × impact', ru: 'вероятность × ущерб' }, '⚠️', 'bad'],
        ['mit', 600, 40, { en: 'Mitigate', ru: 'Снизить' }, { en: 'patch, MFA, backups', ru: 'патч, MFA, бэкапы' }, '🛠', 'ok'],
        ['tr', 600, 113, { en: 'Transfer', ru: 'Передать' }, { en: 'cyber insurance', ru: 'киберстрахование' }, '📄', 'key'],
        ['av', 600, 186, { en: 'Avoid', ru: 'Избежать' }, { en: 'retire the VPN', ru: 'отключить VPN' }, '🚫', 'key'],
        ['ac', 600, 259, { en: 'Accept', ru: 'Принять' }, { en: 'signed by the owner', ru: 'подпись владельца' }, '✍️', 'dim'],
      ],
      edges: [['as', 'risk'], ['th', 'risk'], ['vu', 'risk'], ['risk', 'mit'], ['risk', 'tr'], ['risk', 'av'], ['risk', 'ac']],
      note: { en: 'Whatever remains after treatment is residual risk; management must formally accept it. Total risk − controls = residual risk.', ru: 'То, что остаётся после обработки, — остаточный риск; руководство должно формально его принять. Общий риск − меры = остаточный риск.' },
    },
  },
  'd1-c10': {
    plain: {
      en: `<p>The NIST RMF (Risk Management Framework) is a recipe for running a system safely: get ready, decide how important the system is, pick controls that fit, build them in, check they work, have a senior official formally say "yes, we accept the remaining risk", then keep watching. Like getting a car road-certified, except the inspection never stops.</p>`,
      ru: `<p>NIST RMF (фреймворк управления рисками) — рецепт безопасной эксплуатации системы: подготовиться, определить важность системы, выбрать подходящие меры, внедрить их, проверить, что работают, получить от уполномоченного руководителя формальное «да, остаточный риск принимаем», а потом постоянно наблюдать. Как техосмотр автомобиля, только проверка не заканчивается никогда.</p>`,
    },
    ex: {
      en: `<p>A US federal agency launches a new benefits portal. It categorizes the system as "moderate" impact (FIPS 199), selects the NIST SP 800-53 moderate baseline, implements it, and has an independent assessor test it. The authorizing official signs an ATO (authority to operate) for three years. Continuous monitoring then feeds monthly scan results back to that official.</p>`,
      ru: `<p>Федеральное ведомство США запускает новый портал выплат. Систему относят к «умеренному» уровню воздействия (FIPS 199), выбирают умеренный базовый набор NIST SP 800-53, внедряют его, независимый оценщик проверяет. Уполномоченное лицо подписывает ATO (разрешение на эксплуатацию) на три года. Затем непрерывный мониторинг ежемесячно передаёт ему результаты сканирований.</p>`,
    },
  },
  'd1-c11': {
    plain: {
      en: `<p>Controls are sorted two ways. <b>Category</b> is <i>what</i> the control is made of: paper and people (administrative), technology (technical), or things you can touch (physical). <b>Type</b> is <i>what it does</i>: stop it (preventive), notice it (detective), discourage it (deterrent), fix it (corrective), get back to normal (recovery), or stand in for a missing control (compensating). A "Beware of the dog" sign is a physical deterrent; the dog is a physical preventive and detective control.</p>`,
      ru: `<p>Меры классифицируют двумя способами. <b>Категория</b> — <i>из чего</i> мера состоит: бумаги и люди (административная), технологии (техническая) или то, что можно потрогать (физическая). <b>Тип</b> — <i>что она делает</i>: останавливает (превентивная), замечает (детективная), отпугивает (сдерживающая), исправляет (корректирующая), возвращает к норме (восстановительная) или заменяет недостающую меру (компенсирующая). Табличка «Осторожно, злая собака» — физическая сдерживающая мера, а сама собака — физическая превентивная и детективная.</p>`,
    },
    ex: {
      en: `<p>An old factory machine runs Windows XP and can't be patched. PCI DSS requires patching, so the company adds compensating controls: it isolates the machine on its own network segment, allows only one IP to talk to it, and monitors its traffic. Auditors accept this because the compensating controls address the same risk the patch would have.</p>`,
      ru: `<p>Старый заводской станок работает на Windows XP и не может быть пропатчен. PCI DSS требует патчей, поэтому компания добавляет компенсирующие меры: изолирует станок в отдельном сегменте сети, разрешает связь только с одним IP и мониторит его трафик. Аудиторы принимают это, потому что компенсирующие меры закрывают тот же риск, что и патч.</p>`,
    },
  },
  'd1-c12': {
    plain: {
      en: `<p>Threat modeling is "thinking like a burglar" while the house is still on paper. Draw how data flows, mark the places where it crosses from less trusted to more trusted areas (<b>trust boundaries</b>), and at each crossing ask what could go wrong. Microsoft's <b>STRIDE</b> is a checklist for that: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.</p>`,
      ru: `<p>Моделирование угроз — это «думать как взломщик», пока дом ещё на бумаге. Рисуете, как текут данные, отмечаете места перехода из менее доверенных зон в более доверенные (<b>границы доверия</b>) и на каждом переходе спрашиваете, что может пойти не так. <b>STRIDE</b> от Microsoft — чек-лист для этого: подмена (Spoofing), искажение (Tampering), отказ от авторства (Repudiation), раскрытие информации (Information disclosure), отказ в обслуживании (Denial of service), повышение привилегий (Elevation of privilege).</p>`,
    },
    ex: {
      en: `<p>A team designing a mobile banking app draws the flow phone → API → database. At the phone-to-API boundary STRIDE finds spoofing (stolen tokens) and tampering (modified requests). They add certificate pinning, signed requests and server-side checks before writing a line of code. Fixing this in design costs hours; fixing it after launch costs weeks and possibly a breach.</p>`,
      ru: `<p>Команда, проектирующая мобильный банк, рисует поток телефон → API → база. На границе телефон–API STRIDE выявляет подмену (украденные токены) и искажение (изменённые запросы). Ещё до первой строки кода добавляют пиннинг сертификата, подписанные запросы и проверки на сервере. Исправление на этапе дизайна стоит часы; после запуска — недели и, возможно, утечку.</p>`,
    },
    dg: {
      title: { en: 'Data-flow diagram with trust boundaries and STRIDE', ru: 'Диаграмма потоков данных с границами доверия и STRIDE' }, h: 280,
      zones: [[10, 40, 190, 225, { en: 'Internet (untrusted)', ru: 'Интернет (недоверенная)' }, 'untrust'], [250, 40, 230, 225, { en: 'Web tier', ru: 'Веб-уровень' }, 'dmz'], [530, 40, 220, 225, { en: 'Internal (trusted)', ru: 'Внутренняя (доверенная)' }, 'trust']],
      nodes: [
        ['u', 105, 150, { en: 'Customer', ru: 'Клиент' }, { en: 'mobile app', ru: 'мобильное прил.' }, '📱'],
        ['api', 365, 150, 'API', { en: 'login, payments', ru: 'вход, платежи' }, '⚙️', 'key'],
        ['db', 640, 105, { en: 'Accounts DB', ru: 'БД счетов' }, null, '🗄'],
        ['log', 640, 205, { en: 'Audit log', ru: 'Журнал аудита' }, null, '📜'],
      ],
      edges: [
        ['u', 'api', { en: 'S, T, D', ru: 'S, T, D' }, 'bad'], ['api', 'db', { en: 'I, E', ru: 'I, E' }, 'bad'], ['api', 'log', { en: 'R', ru: 'R' }, 'bad'],
      ],
      note: { en: 'Letters show where each STRIDE threat is most likely: Spoofing, Tampering and DoS at the internet edge; Information disclosure and Elevation of privilege at the database; Repudiation is countered by a tamper-proof audit log.', ru: 'Буквы показывают, где вероятнее каждая угроза STRIDE: подмена, искажение и DoS — на границе с интернетом; раскрытие информации и повышение привилегий — у базы; от отказа от авторства защищает защищённый от изменений журнал аудита.' },
    },
  },
  'd1-c13': {
    plain: {
      en: `<p>You are only as secure as everyone you buy from. Every vendor, cloud service, software library and hardware part is a back door if it is compromised. Supply chain risk management means checking suppliers before signing, putting security requirements in the contract, knowing what components you use (an SBOM, software bill of materials, is an ingredient list for software) and watching vendors over time.</p>`,
      ru: `<p>Вы защищены настолько, насколько защищены все, у кого вы покупаете. Каждый поставщик, облачный сервис, программная библиотека и аппаратный компонент — это чёрный ход, если его скомпрометируют. Управление рисками цепочки поставок — проверять поставщиков до подписания, вписывать требования безопасности в контракт, знать, какие компоненты используются (SBOM, перечень компонентов ПО, — это «состав продукта» для софта) и следить за поставщиками со временем.</p>`,
    },
    ex: {
      en: `<p>In 2020 attackers broke into SolarWinds and inserted a backdoor into a routine update of its Orion monitoring software. About 18,000 customers installed the signed, trusted update, including US government agencies. The victims did nothing "wrong" locally: the attack came through a supplier they trusted.</p>`,
      ru: `<p>В 2020 году злоумышленники проникли в SolarWinds и встроили бэкдор в обычное обновление ПО мониторинга Orion. Около 18 000 клиентов, включая госведомства США, установили подписанное доверенное обновление. Жертвы ничего «не нарушили» у себя: атака пришла через поставщика, которому они доверяли.</p>`,
    },
    dg: {
      title: { en: 'A supply chain compromise (SolarWinds-style)', ru: 'Компрометация цепочки поставок (как в SolarWinds)' }, h: 260,
      zones: [[160, 30, 330, 120, { en: 'Vendor', ru: 'Поставщик' }], [520, 30, 230, 220, { en: 'Customers', ru: 'Клиенты' }, 'trust']],
      nodes: [
        ['att', 80, 210, { en: 'Attacker', ru: 'Атакующий' }, null, '🦹', 'bad'],
        ['build', 245, 100, { en: 'Build server', ru: 'Сервер сборки' }, null, '⚙️', 'bad'],
        ['upd', 410, 100, { en: 'Update', ru: 'Обновление' }, { en: 'signed by vendor', ru: 'подписано вендором' }, '📦', 'bad'],
        ['c1', 635, 75, { en: 'Gov agency', ru: 'Госведомство' }, null, '🏛'],
        ['c2', 635, 140, { en: 'Bank', ru: 'Банк' }, null, '🏦'],
        ['c3', 635, 205, { en: 'Tech firm', ru: 'IT-компания' }, null, '🏢'],
        ['c2s', 340, 215, { en: 'Attacker C2 server', ru: 'C2-сервер атакующего' }, null, '📡', 'bad'],
      ],
      edges: [
        ['att', 'build', { en: 'implant', ru: 'внедряет' }, 'bad'], ['build', 'upd'],
        ['upd', 'c1', null, 'bad'], ['upd', 'c2', null, 'bad'], ['upd', 'c3', null, 'bad'],
        ['c3', 'c2s', { en: 'beacon home', ru: 'связь с C2' }, 'bad dash'],
      ],
      note: { en: 'Controls: vendor security assessments, build-pipeline integrity (signed, reproducible builds), SBOM, and monitoring outbound traffic from trusted software.', ru: 'Меры: оценка безопасности поставщиков, целостность конвейера сборки (подписанные, воспроизводимые сборки), SBOM и мониторинг исходящего трафика даже от доверенного ПО.' },
    },
  },
  'd1-c14': {
    plain: {
      en: `<p><b>Awareness</b> is a road sign: everyone sees it, it reminds you that danger exists. <b>Training</b> is driving lessons: specific skills for your role. <b>Education</b> is an engineering degree: deep understanding of why things work. Most employees need awareness, some need training, and the security team needs education.</p>`,
      ru: `<p><b>Осведомлённость</b> — дорожный знак: его видят все, он напоминает, что опасность есть. <b>Обучение (training)</b> — уроки вождения: конкретные навыки для вашей роли. <b>Образование (education)</b> — инженерный диплом: глубокое понимание, почему всё работает. Большинству сотрудников нужна осведомлённость, части — обучение, а команде безопасности — образование.</p>`,
    },
    ex: {
      en: `<p>A company runs monthly phishing simulations. In the first one, 28% of staff click the fake link. Each clicker gets a 3-minute lesson right after the click. After a year the click rate is 4%, and, more importantly, the report rate rises from 5% to 60%. The metric that matters is behavior change, not attendance.</p>`,
      ru: `<p>Компания ежемесячно проводит фишинговые учения. В первый раз по ссылке кликают 28% сотрудников. Каждый кликнувший сразу получает 3-минутный урок. Через год кликают 4%, а главное — доля сообщивших о письме растёт с 5% до 60%. Важна метрика изменения поведения, а не посещаемость.</p>`,
    },
  },
});
