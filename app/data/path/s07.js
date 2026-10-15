'use strict';
// Learning path, stage 7: building secure systems. Threat modeling, design principles, security models,
// the TCB and reference monitor, memory and virtualization, architecture weaknesses (Spectre, OT, cloud),
// evaluation (Common Criteria), authorization (RMF) and the system lifecycle.
CISSP.stage(7, { cards: [
  { id: 's07-001', kind: 'story', k: ['d3-c4', 'd3-c5'], lvl: 1,
    title: { en: `Spectre and Meltdown 2018: the chip that guessed ahead`, ru: `Spectre и Meltdown, 2018: процессор, который забегал вперёд` },
    body: {
      en: `<p>In January 2018, researchers from Google Project Zero and several universities published two flaws, <b>Meltdown</b> and <b>Spectre</b>. They weren't bugs in any program. They were in the processors themselves: almost every Intel chip from the previous two decades, and many AMD and ARM chips too.</p><p>To be fast, a modern CPU guesses what comes next and runs it early. Wrong guesses are thrown away, but they leave traces in the cache, and a clever program can read those traces. One program could peek at another program's memory, or at the operating system's, which is exactly what the hardware was supposed to prevent.</p>`,
      ru: `<p>В январе 2018 года исследователи из Google Project Zero и нескольких университетов опубликовали две уязвимости, <b>Meltdown</b> и <b>Spectre</b>. Это были ошибки не в программах, а в самих процессорах: почти во всех чипах Intel за два десятилетия и во многих чипах AMD и ARM.</p><p>Ради скорости современный процессор угадывает, что будет дальше, и выполняет это заранее. Неверные догадки отбрасываются, но оставляют следы в кэше, а хитрая программа может эти следы прочитать. Одна программа могла подсмотреть память другой или самой операционной системы, хотя оборудование должно было именно это запрещать.</p>`,
    },
    take: { en: `A system is only as secure as the layer beneath it, including the silicon.`, ru: `Система защищена не лучше, чем слой под ней, вплоть до кремния.` } },

  { id: 's07-002', kind: 'idea', k: ['d3-c13', 'd3-c1'], lvl: 1,
    title: { en: `Built in, not bolted on`, ru: `Встроить, а не прикрутить` },
    body: {
      en: `<p>Spectre was a design decision made decades earlier, for speed. Fixing it afterwards meant patches to chips, operating systems and browsers, and some servers lost noticeable performance.</p><p>That's the general rule of this stage: a security problem is cheapest to fix on paper, before anything is built. A wrong choice in the design becomes expensive in code, more expensive in production, and sometimes impossible to fix in hardware. So security belongs in the first meeting about a new system, as a requirement next to cost and speed, not as a review the week before launch.</p>`,
      ru: `<p>Spectre — следствие проектного решения, принятого десятилетия назад ради скорости. Исправлять его пришлось задним числом: патчами для процессоров, операционных систем и браузеров, а некоторые серверы заметно потеряли в производительности.</p><p>Это главное правило этапа: проблему безопасности дешевле всего исправить на бумаге, пока ничего не построено. Ошибка в проекте дорого обходится в коде, ещё дороже в эксплуатации, а в железе иногда не исправляется вовсе. Поэтому безопасности место на первой встрече о новой системе, как требованию рядом со стоимостью и скоростью, а не на проверке за неделю до запуска.</p>`,
    },
    take: { en: `The earlier a flaw is found, the cheaper it is to fix.`, ru: `Чем раньше найден изъян, тем дешевле его исправить.` } },

  { id: 's07-003', kind: 'idea', k: ['d1-c12'], lvl: 1,
    title: { en: `Threat modeling: attacking your design on paper`, ru: `Моделирование угроз: атакуем проект на бумаге` },
    body: {
      en: `<p><b>Threat modeling</b> is a structured way to ask "how could this be attacked?" before attackers do. A simple version is four questions:</p><ol><li>What are we building? (draw it)</li><li>What can go wrong?</li><li>What are we going to do about it?</li><li>Did we do a good job?</li></ol><p>It works best early, in design (<b>proactive</b>), but you can also model a system that already runs (<b>reactive</b>). The output is a list of threats, ranked, each with a planned control or an accepted risk.</p>`,
      ru: `<p><b>Моделирование угроз</b> — структурированный способ спросить «как это можно атаковать?» раньше атакующего. Простейшая версия — четыре вопроса:</p><ol><li>Что мы строим? (нарисуйте)</li><li>Что может пойти не так?</li><li>Что мы с этим сделаем?</li><li>Хорошо ли мы справились?</li></ol><p>Лучше всего оно работает на этапе проектирования (<b>проактивно</b>), но смоделировать можно и уже работающую систему (<b>реактивно</b>). Результат — ранжированный список угроз, у каждой — запланированная мера или принятый риск.</p>`,
    },
    take: { en: `Draw the system, ask what can go wrong, decide what to do, check your work.`, ru: `Нарисуйте систему, спросите, что может пойти не так, решите, что делать, проверьте себя.` } },

  { id: 's07-004', kind: 'picture', k: ['d1-c12'], lvl: 2,
    title: { en: `Draw the data flow, mark the trust boundaries`, ru: `Нарисуйте потоки данных, отметьте границы доверия` },
    body: {
      en: `<p>Threat modeling starts with a <b>data flow diagram</b>: who and what talks to whom. Then mark each <b>trust boundary</b>, where data crosses from a less trusted zone to a more trusted one. Most threats sit on those crossings: that's where you check identity, validate input and encrypt.</p>`,
      ru: `<p>Моделирование угроз начинается с <b>диаграммы потоков данных</b>: кто и что с кем общается. Затем отмечают каждую <b>границу доверия</b>, где данные переходят из менее доверенной зоны в более доверенную. Большинство угроз живёт именно на этих переходах: там проверяют личность, входные данные и включают шифрование.</p>`,
    },
    dg: { title: { en: `An online shop as a data flow diagram`, ru: `Интернет-магазин как диаграмма потоков данных` }, h: 300,
      zones: [[20, 30, 190, 250, { en: 'Internet', ru: 'Интернет' }, 'untrust'], [240, 30, 230, 250, { en: 'Company network', ru: 'Сеть компании' }, 'trust'], [500, 30, 240, 130, { en: 'Data zone', ru: 'Зона данных' }, 'trust'], [500, 185, 240, 95, { en: 'Third party', ru: 'Внешний партнёр' }, 'untrust']],
      nodes: [
        ['u', 115, 150, { en: 'Customer', ru: 'Клиент' }, { en: 'browser', ru: 'браузер' }, '🧑', 'dim'],
        ['w', 355, 110, { en: 'Web app', ru: 'Веб-приложение' }, { en: 'login, orders', ru: 'вход, заказы' }, '🖥', 'ok'],
        ['a', 355, 230, { en: 'Admin console', ru: 'Админ-консоль' }, { en: 'staff only', ru: 'только сотрудники' }, '🛠', 'key'],
        ['d', 620, 110, { en: 'Customer DB', ru: 'База клиентов' }, { en: 'addresses, orders', ru: 'адреса, заказы' }, '🗄', 'key'],
        ['p', 620, 245, { en: 'Payment API', ru: 'Платёжный API' }, { en: 'card data stays here', ru: 'данные карт — здесь' }, '💳', 'dim'],
      ],
      edges: [['u', 'w', 'HTTPS', 'ok'], ['w', 'd', 'SQL', 'ok'], ['w', 'p', { en: 'token', ru: 'токен' }, 'ok'], ['a', 'w', { en: 'admin', ru: 'админ' }, 'dash']],
      note: { en: 'Every line that crosses a zone edge is a trust boundary: authenticate, validate and encrypt there.', ru: 'Каждая линия через край зоны — граница доверия: здесь аутентифицируют, проверяют и шифруют.' } },
    take: { en: `Threats gather where data crosses a trust boundary.`, ru: `Угрозы собираются там, где данные пересекают границу доверия.` } },

  { id: 's07-005', kind: 'vs', k: ['d1-c12'], lvl: 1,
    title: { en: `STRIDE: six threats, six broken promises`, ru: `STRIDE: шесть угроз, шесть нарушенных обещаний` },
    body: {
      en: `<p>Microsoft's <b>STRIDE</b> gives a checklist for each element of the diagram. Each letter breaks one security property:</p><ul><li><b>S</b>poofing: pretending to be someone → breaks authentication.</li><li><b>T</b>ampering: changing data → breaks integrity.</li><li><b>R</b>epudiation: "I never did that" → breaks nonrepudiation.</li><li><b>I</b>nformation disclosure → breaks confidentiality.</li><li><b>D</b>enial of service → breaks availability.</li><li><b>E</b>levation of privilege → breaks authorization.</li></ul>`,
      ru: `<p><b>STRIDE</b> от Microsoft даёт чек-лист для каждого элемента диаграммы. Каждая буква нарушает одно свойство безопасности:</p><ul><li><b>S</b>poofing, подмена: выдать себя за другого → нарушена аутентификация.</li><li><b>T</b>ampering, искажение данных → нарушена целостность.</li><li><b>R</b>epudiation, отказ: «я этого не делал» → нарушена неотказуемость.</li><li><b>I</b>nformation disclosure, раскрытие → нарушена конфиденциальность.</li><li><b>D</b>enial of service, отказ в обслуживании → нарушена доступность.</li><li><b>E</b>levation of privilege, повышение привилегий → нарушена авторизация.</li></ul>`,
    },
    take: { en: `Each STRIDE letter is the opposite of a property you want to keep.`, ru: `Каждая буква STRIDE — противоположность свойства, которое вы хотите сохранить.` } },

  { id: 's07-006', kind: 'think', k: ['d1-c12'], lvl: 2,
    title: { en: `Name the letter`, ru: `Назовите букву` },
    body: {
      en: `<p>During a threat-modeling session for the online shop, the team writes down three worries:</p><ol><li>A customer edits the hidden price field in the order form before submitting it.</li><li>A customer disputes a large order, and the logs can't show it was really them.</li><li>A bug in the admin console lets an ordinary customer account open it.</li></ol><p>Which STRIDE category is each?</p>`,
      ru: `<p>На сессии моделирования угроз для интернет-магазина команда записывает три опасения:</p><ol><li>Клиент меняет скрытое поле цены в форме заказа перед отправкой.</li><li>Клиент оспаривает крупный заказ, а журналы не могут доказать, что это был он.</li><li>Из-за ошибки в админ-консоль может войти обычная учётная запись клиента.</li></ol><p>К какой категории STRIDE относится каждое?</p>`,
    },
    reveal: {
      en: `<p>1. <b>Tampering</b>: the data was changed on its way across a trust boundary. Fix: never trust prices from the browser; the server looks them up.</p><p>2. <b>Repudiation</b>: the system can't prove who did what. Fix: strong authentication plus tamper-evident logs.</p><p>3. <b>Elevation of privilege</b>: a user gets rights they shouldn't have. Fix: check authorization on the server for every admin function, not only by hiding the menu.</p>`,
      ru: `<p>1. <b>Tampering</b>: данные изменили при пересечении границы доверия. Решение: не доверять ценам из браузера, сервер берёт их сам.</p><p>2. <b>Repudiation</b>: система не может доказать, кто что сделал. Решение: надёжная аутентификация и журналы, защищённые от подделки.</p><p>3. <b>Elevation of privilege</b>: пользователь получил права, которых не должно быть. Решение: проверять авторизацию на сервере для каждой админ-функции, а не просто прятать меню.</p>`,
    },
    take: { en: `Classify the threat, and the property to protect tells you the control.`, ru: `Классифицируйте угрозу — и защищаемое свойство подскажет меру.` } },

  { id: 's07-007', kind: 'vs', k: ['d1-c12'], lvl: 2,
    title: { en: `STRIDE, PASTA, DREAD and friends`, ru: `STRIDE, PASTA, DREAD и другие` },
    body: {
      en: `<ul><li><b>STRIDE</b>: what kinds of threat? A classification.</li><li><b>DREAD</b>: how bad is it? A rating: Damage, Reproducibility, Exploitability, Affected users, Discoverability.</li><li><b>PASTA</b>: a seven-stage, risk-centric process that starts from business objectives and ends with risk and impact analysis.</li><li><b>VAST</b>: built to scale across many Agile and DevOps teams.</li><li><b>Trike</b>: starts from an acceptable-risk "requirements model".</li><li><b>Attack trees</b>: the attacker's goal at the root, ways to reach it as branches.</li><li><b>MITRE ATT&amp;CK</b>: a catalogue of real attackers' tactics and techniques.</li></ul>`,
      ru: `<ul><li><b>STRIDE</b>: какие бывают угрозы? Классификация.</li><li><b>DREAD</b>: насколько это плохо? Оценка: ущерб, воспроизводимость, простота эксплуатации, число затронутых, обнаруживаемость.</li><li><b>PASTA</b>: семиэтапный риск-ориентированный процесс — от целей бизнеса до анализа риска и последствий.</li><li><b>VAST</b>: рассчитан на масштаб многих Agile- и DevOps-команд.</li><li><b>Trike</b>: исходит из «модели требований» с допустимым риском.</li><li><b>Деревья атак</b>: цель атакующего в корне, пути к ней — ветви.</li><li><b>MITRE ATT&amp;CK</b>: каталог тактик и техник реальных атакующих.</li></ul>`,
    },
    take: { en: `STRIDE names threats, DREAD rates them, PASTA ties them to business risk.`, ru: `STRIDE называет угрозы, DREAD их оценивает, PASTA связывает с бизнес-риском.` } },

  { id: 's07-008', kind: 'back', back: 's01-031', k: ['d3-c1'], lvl: 1,
    title: { en: `Design principles you already know`, ru: `Принципы проектирования, которые вы уже знаете` },
    body: {
      en: `<p>In stage 1 you met <b>defense in depth</b>: never one wall. Since then you've collected more rules that architects call <b>secure design principles</b>:</p><ul><li><b>Least privilege</b> (stage 2): only the access the job needs.</li><li><b>Separation of duties</b> (stage 2): no one completes a critical task alone.</li><li><b>Zero trust</b> (stage 5): location grants nothing; check every request.</li><li><b>Threat modeling</b> (just now): find the attacks early.</li></ul><p>The next cards add the rest: secure defaults, failing securely, keeping it simple, and privacy by design.</p>`,
      ru: `<p>На этапе 1 вы познакомились с <b>эшелонированной защитой</b>: никогда не одна стена. С тех пор набралось ещё несколько правил, которые архитекторы называют <b>принципами безопасного проектирования</b>:</p><ul><li><b>Минимальные привилегии</b> (этап 2): только тот доступ, что нужен для работы.</li><li><b>Разделение обязанностей</b> (этап 2): никто не выполняет критичную задачу в одиночку.</li><li><b>Нулевое доверие</b> (этап 5): расположение ничего не даёт, проверяется каждый запрос.</li><li><b>Моделирование угроз</b> (только что): находить атаки заранее.</li></ul><p>Следующие карточки добавят остальные: безопасные настройки по умолчанию, безопасный отказ, простоту и приватность в проекте.</p>`,
    },
    take: { en: `Secure design is a short list of principles applied everywhere.`, ru: `Безопасное проектирование — короткий список принципов, применяемых везде.` } },

  { id: 's07-009', kind: 'idea', k: ['d3-c1'], lvl: 1,
    title: { en: `Secure by default, and keep it simple`, ru: `Безопасно по умолчанию и просто` },
    body: {
      en: `<p><b>Secure defaults</b>: a system should be safe straight out of the box. Ports closed, guest accounts off, default passwords impossible, and logging on. Most people never change a default, so the default is the real setting. The rule for access is <b>deny by default</b>: anything not explicitly allowed is blocked.</p><p><b>Keep it simple</b> (economy of mechanism): every extra feature, option and line of code is something more to get wrong and more to test. A small, simple security mechanism can be understood and verified; a sprawling one hides mistakes.</p>`,
      ru: `<p><b>Безопасность по умолчанию</b>: система должна быть защищена сразу после распаковки. Порты закрыты, гостевые учётные записи выключены, стандартных паролей нет, журналирование включено. Большинство людей не меняют настройки по умолчанию, так что они и есть настоящие настройки. Правило для доступа — <b>запрещено всё, что не разрешено</b>.</p><p><b>Простота</b> (экономия механизма): каждая лишняя функция, опция и строка кода — ещё одна возможность ошибиться и ещё одна вещь для проверки. Небольшой простой механизм защиты можно понять и проверить; разросшийся прячет ошибки.</p>`,
    },
    take: { en: `The default is the setting most people will run; complexity hides flaws.`, ru: `Настройки по умолчанию — те, с которыми работает большинство; сложность прячет изъяны.` } },

  { id: 's07-010', kind: 'vs', k: ['d3-c1', 'd7-c11'], lvl: 1,
    title: { en: `Fail-secure vs fail-safe`, ru: `Fail-secure и fail-safe` },
    body: {
      en: `<p>Everything fails eventually. The design question is: <b>which state does it fail into?</b></p><ul><li><b>Fail-secure</b> (fail-closed): on failure, stay locked. A firewall that crashes blocks all traffic; a vault door stays shut when power is lost. Protects the assets.</li><li><b>Fail-safe</b> (fail-open): on failure, open up. Fire exit doors unlock when the alarm sounds or power fails. Protects the people.</li></ul><p>When human life is involved, fail-safe wins. Software should also fail securely: an error must not skip the access check or dump secrets into the error message.</p>`,
      ru: `<p>Всё рано или поздно отказывает. Вопрос проекта: <b>в какое состояние система уходит при отказе?</b></p><ul><li><b>Fail-secure</b> (закрытый отказ): при сбое оставаться запертым. Упавший межсетевой экран блокирует весь трафик; дверь хранилища остаётся закрытой без питания. Защищает активы.</li><li><b>Fail-safe</b> (открытый отказ): при сбое открываться. Двери аварийных выходов отпираются при пожарной тревоге или без питания. Защищает людей.</li></ul><p>Если речь о жизни людей, побеждает fail-safe. Программы тоже должны отказывать безопасно: ошибка не должна пропускать проверку доступа или выводить секреты в сообщение об ошибке.</p>`,
    },
    take: { en: `Fail-secure protects assets, fail-safe protects people; people come first.`, ru: `Fail-secure защищает активы, fail-safe — людей; люди важнее.` } },

  { id: 's07-011', kind: 'think', k: ['d3-c1', 'd7-c11'], lvl: 2,
    title: { en: `The power cut at the data centre`, ru: `Отключение питания в дата-центре` },
    body: {
      en: `<p>You're designing door locks for a small data centre. There are two doors controlled by badge readers:</p><ul><li>the door from the server hall into the corridor, which is on the fire escape route;</li><li>the door of a locked cage inside the hall that holds the backup tapes.</li></ul><p>The facilities manager asks: "When the power or the access system fails, should the doors lock or unlock?" Is one answer right for both?</p>`,
      ru: `<p>Вы проектируете замки для небольшого дата-центра. Две двери управляются считывателями пропусков:</p><ul><li>дверь из машинного зала в коридор, которая находится на пути эвакуации;</li><li>дверь запертой клетки внутри зала, где хранятся ленты резервных копий.</li></ul><p>Руководитель эксплуатации спрашивает: «Когда пропадает питание или отказывает система доступа, двери должны запираться или отпираться?» Подходит ли один ответ для обеих?</p>`,
    },
    reveal: {
      en: `<p>No. The <b>escape-route door must fail-safe</b>: it unlocks, because people may be trapped in a fire, and safety codes require it. Protect the room in other ways: cameras, an alarm on the door, a guard.</p><p>The <b>tape cage can fail-secure</b>: it stays locked, because nobody needs to escape through it, and the tapes hold every backup the company has. Same building, same failure, opposite answers, decided by whether a person's life depends on the door.</p>`,
      ru: `<p>Нет. <b>Дверь на пути эвакуации — fail-safe</b>: она отпирается, потому что при пожаре люди могут оказаться в ловушке, и этого требуют нормы. Помещение защищают иначе: камерами, сигнализацией на двери, охраной.</p><p><b>Клетка с лентами — fail-secure</b>: остаётся запертой, ведь через неё никто не эвакуируется, а в лентах все резервные копии компании. То же здание, тот же сбой, противоположные ответы, и решает одно: зависит ли от двери жизнь человека.</p>`,
    },
    take: { en: `Choose the failure mode per door: people's safety decides.`, ru: `Режим отказа выбирают для каждой двери: решает безопасность людей.` } },

  { id: 's07-012', kind: 'back', back: 's05-032', k: ['d3-c1', 'd4-c8'], lvl: 2,
    title: { en: `Zero trust again: who makes the decision?`, ru: `Снова нулевое доверие: кто принимает решение?` },
    body: {
      en: `<p>In stage 5, zero trust meant micro-segmentation: no request is trusted because of where it comes from. NIST SP 800-207 describes the architecture behind it:</p><ul><li>The <b>policy engine</b> decides: given this user, device, resource and context, allow or deny?</li><li>The <b>policy administrator</b> carries out the decision: it opens or closes the session.</li><li>The <b>policy enforcement point</b> sits in the path, in front of the resource, and lets traffic through only when told to.</li></ul><p>Every request goes through the decision, and the decision is re-evaluated as context changes.</p>`,
      ru: `<p>На этапе 5 нулевое доверие означало микросегментацию: запросу не доверяют из-за того, откуда он пришёл. NIST SP 800-207 описывает архитектуру за этим:</p><ul><li><b>Механизм политик</b> (policy engine) решает: для этого пользователя, устройства, ресурса и контекста — разрешить или запретить?</li><li><b>Администратор политик</b> исполняет решение: открывает или закрывает сеанс.</li><li><b>Точка применения политик</b> стоит на пути перед ресурсом и пропускает трафик только по команде.</li></ul><p>Каждый запрос проходит через решение, и оно пересматривается при изменении контекста.</p>`,
    },
    take: { en: `Zero trust: one place decides, another enforces, on every request.`, ru: `Нулевое доверие: одно место решает, другое применяет — для каждого запроса.` } },

  { id: 's07-013', kind: 'idea', k: ['d3-c1', 'd1-c4'], lvl: 2,
    title: { en: `Privacy by design`, ru: `Приватность в проекте` },
    body: {
      en: `<p>Ann Cavoukian, a privacy commissioner in Ontario, described <b>privacy by design</b> in seven principles. The core of them: be proactive rather than reactive; make privacy the <b>default</b>, so users are protected without doing anything; embed it in the design; keep full functionality (privacy and features, not one or the other); protect data from collection to deletion; be transparent; and respect the user.</p><p>GDPR turned the idea into law: Article 25 requires <b>data protection by design and by default</b>. Collect less, keep it shorter, show it to fewer people.</p>`,
      ru: `<p>Энн Кавукян, уполномоченная по приватности провинции Онтарио, описала <b>приватность в проекте</b> (privacy by design) в семи принципах. Суть: действовать проактивно, а не реактивно; делать приватность <b>настройкой по умолчанию</b>, чтобы пользователь был защищён без усилий; встраивать её в проект; сохранять полную функциональность (и приватность, и функции, а не что-то одно); защищать данные от сбора до удаления; быть прозрачными; уважать пользователя.</p><p>GDPR сделал идею законом: статья 25 требует <b>защиты данных в проекте и по умолчанию</b>. Собирайте меньше, храните короче, показывайте меньшему числу людей.</p>`,
    },
    take: { en: `Privacy should be the default setting, not an option the user must find.`, ru: `Приватность должна быть настройкой по умолчанию, а не опцией, которую надо найти.` } },

  { id: 's07-014', kind: 'idea', k: ['d3-c2'], lvl: 2,
    title: { en: `Security models: rules precise enough to prove`, ru: `Модели безопасности: правила, которые можно доказать` },
    body: {
      en: `<p>A policy says "secret documents must not leak". A <b>security model</b> turns that into exact rules a system can enforce and a mathematician can check.</p><p>Many models are <b>state machine</b> models: the system is always in some state (who has which access to what). If it starts in a secure state, and every allowed transition leads to another secure state, it can never become insecure. Other models describe how <b>information flows</b> between levels, or require <b>noninterference</b>: what high-level users do must not change what low-level users can see.</p>`,
      ru: `<p>Политика говорит: «секретные документы не должны утекать». <b>Модель безопасности</b> превращает это в точные правила, которые система может применять, а математик — проверить.</p><p>Многие модели — модели <b>конечного автомата</b>: система всегда в каком-то состоянии (у кого какой доступ к чему). Если она начинает в безопасном состоянии и каждый разрешённый переход ведёт в другое безопасное состояние, небезопасной она стать не может. Другие модели описывают, как <b>информация перетекает</b> между уровнями, или требуют <b>невмешательства</b>: действия пользователей высокого уровня не должны менять то, что видят пользователи низкого.</p>`,
    },
    take: { en: `A model turns a policy into rules exact enough to verify.`, ru: `Модель превращает политику в правила, достаточно точные для проверки.` } },

  { id: 's07-015', kind: 'back', back: 's04-027', k: ['d3-c2', 'd2-c1', 'd5-c3'], lvl: 2,
    title: { en: `MAC from stage 4, as a model: Bell-LaPadula`, ru: `MAC с этапа 4 как модель: Белл — Лападула` },
    body: {
      en: `<p>In stage 4, mandatory access control compared labels: a Secret clearance opens Secret files. <b>Bell-LaPadula</b> (1973, for the US military) is the model behind it. It protects <b>confidentiality</b> only, with two rules:</p><ul><li><b>No read up</b> (simple security property): you can't read above your clearance.</li><li><b>No write down</b> (star property): you can't write into a lower level, so a Secret user, or a Trojan running as them, can't copy Secret text into an Unclassified file.</li></ul><p>The <b>strong star property</b> goes further: read and write only at your own level.</p>`,
      ru: `<p>На этапе 4 мандатное управление доступом сравнивало метки: допуск «Секретно» открывает секретные файлы. <b>Модель Белла — Лападулы</b> (1973, для армии США) стоит за этим. Она защищает только <b>конфиденциальность</b> и задаёт два правила:</p><ul><li><b>Не читать вверх</b> (простое свойство безопасности): нельзя читать выше своего допуска.</li><li><b>Не писать вниз</b> (*-свойство): нельзя записывать на более низкий уровень, чтобы пользователь с допуском «Секретно» или троян от его имени не скопировал секретный текст в открытый файл.</li></ul><p><b>Сильное *-свойство</b> идёт дальше: читать и писать только на своём уровне.</p>`,
    },
    take: { en: `Bell-LaPadula: no read up, no write down; secrets only flow upward.`, ru: `Белл — Лападула: не читать вверх, не писать вниз; секреты текут только вверх.` } },

  { id: 's07-016', kind: 'picture', k: ['d3-c2'], lvl: 2,
    title: { en: `Bell-LaPadula and Biba are mirror images`, ru: `Белл — Лападула и Биба — зеркальные отражения` },
    body: {
      en: `<p><b>Biba</b> (1977) protects <b>integrity</b> instead, so it flips both rules: <b>no read down</b> (don't let unreliable data into your work) and <b>no write up</b> (don't let a low-integrity user corrupt trusted data). Memory aid: in Bell-LaPadula, secrets mustn't fall; in Biba, dirt mustn't rise.</p>`,
      ru: `<p><b>Модель Бибы</b> (1977) защищает <b>целостность</b>, поэтому переворачивает оба правила: <b>не читать вниз</b> (не впускать ненадёжные данные в свою работу) и <b>не писать вверх</b> (не давать пользователю низкой целостности портить доверенные данные). Подсказка: у Белла — Лападулы секреты не должны падать, у Бибы грязь не должна подниматься.</p>`,
    },
    dg: { title: { en: `Same subject, opposite rules`, ru: `Тот же субъект, противоположные правила` }, h: 300,
      zones: [[20, 10, 350, 285, { en: 'Bell-LaPadula: confidentiality', ru: 'Белл — Лападула: конфиденциальность' }, 'trust'], [390, 10, 350, 285, { en: 'Biba: integrity', ru: 'Биба: целостность' }, 'trust']],
      nodes: [
        ['bh', 195, 65, { en: 'Top Secret', ru: 'Совершенно секретно' }, null, null, 'dim'],
        ['bs', 195, 160, { en: 'Subject: Secret', ru: 'Субъект: Секретно' }, null, '🧑', 'key'],
        ['bl', 195, 255, { en: 'Unclassified', ru: 'Несекретно' }, null, null, 'dim'],
        ['ih', 565, 65, { en: 'High integrity', ru: 'Высокая целостность' }, null, null, 'dim'],
        ['is', 565, 160, { en: 'Subject: Medium', ru: 'Субъект: средняя' }, null, '🧑', 'key'],
        ['il', 565, 255, { en: 'Low integrity', ru: 'Низкая целостность' }, null, null, 'dim'],
      ],
      edges: [
        ['bs', 'bh', { en: 'read ✗ · write ✓', ru: 'чтение ✗ · запись ✓' }, 'dash'], ['bs', 'bl', { en: 'read ✓ · write ✗', ru: 'чтение ✓ · запись ✗' }, 'dash'],
        ['is', 'ih', { en: 'read ✓ · write ✗', ru: 'чтение ✓ · запись ✗' }, 'dash'], ['is', 'il', { en: 'read ✗ · write ✓', ru: 'чтение ✗ · запись ✓' }, 'dash'],
      ],
      note: { en: 'Bell-LaPadula: no read up, no write down. Biba: no read down, no write up.', ru: 'Белл — Лападула: не читать вверх, не писать вниз. Биба: не читать вниз, не писать вверх.' } },
    take: { en: `Confidentiality stops secrets falling; integrity stops dirt rising.`, ru: `Конфиденциальность не даёт секретам падать, целостность — грязи подниматься.` } },

  { id: 's07-017', kind: 'think', k: ['d3-c2'], lvl: 3,
    title: { en: `The safety controller and the weather feed`, ru: `Контроллер безопасности и прогноз погоды` },
    body: {
      en: `<p>A chemical plant has a safety controller that shuts down a reactor if pressure gets too high. Its readings come from certified sensors. A developer suggests improving it by also pulling a weather forecast from a free website, to predict heat-related pressure spikes.</p><p>Nothing secret is involved. Which security model's rule does this break, and why does it matter?</p>`,
      ru: `<p>На химическом заводе контроллер безопасности останавливает реактор, если давление слишком высокое. Показания он берёт с сертифицированных датчиков. Разработчик предлагает улучшить его: брать ещё и прогноз погоды с бесплатного сайта, чтобы предсказывать скачки давления в жару.</p><p>Ничего секретного здесь нет. Правило какой модели это нарушает и почему это важно?</p>`,
    },
    reveal: {
      en: `<p><b>Biba's "no read down"</b>. The controller is a high-integrity subject; the website is low-integrity data that anyone could tamper with. If the controller reads it, its decisions are only as trustworthy as that website.</p><p>Bell-LaPadula has nothing to say here, because nothing is confidential. That's the point: when the risk is wrong decisions or safety, think integrity. A safer design shows the forecast to a human operator but keeps it out of the automatic shutdown logic.</p>`,
      ru: `<p><b>«Не читать вниз» из модели Бибы</b>. Контроллер — субъект высокой целостности, а сайт — данные низкой целостности, которые может подменить кто угодно. Если контроллер их читает, его решения надёжны ровно настолько, насколько надёжен этот сайт.</p><p>Белл — Лападула здесь ничего не скажет: конфиденциального ничего нет. В этом и смысл: когда риск в неверных решениях или безопасности людей, думайте о целостности. Безопаснее показать прогноз оператору-человеку, но не пускать его в логику автоматической остановки.</p>`,
    },
    take: { en: `When wrong data could cause harm, it's an integrity problem: think Biba.`, ru: `Когда неверные данные могут навредить, это задача целостности: вспомните Бибу.` } },

  { id: 's07-018', kind: 'idea', k: ['d3-c2', 'd7-c3'], lvl: 2,
    title: { en: `Clark-Wilson: no direct access to the books`, ru: `Кларк — Вилсон: к бухгалтерским книгам напрямую нельзя` },
    body: {
      en: `<p>Banks don't think in clearance levels. They care that every change to the books is a <b>well-formed transaction</b>, and that no one person can both create and approve one.</p><p><b>Clark-Wilson</b> (1987) captures this. Users never touch important data directly. They act only through approved programs, forming an <b>access triple</b>: subject → program → object. Important data (<b>constrained data items</b>) changes only through <b>transformation procedures</b>; <b>integrity verification procedures</b> check it stays consistent; and the rules enforce separation of duties.</p>`,
      ru: `<p>Банки не мыслят уровнями допуска. Им важно, чтобы каждое изменение в учёте было <b>корректной транзакцией</b> и чтобы ни один человек не мог одновременно создать и утвердить её.</p><p><b>Модель Кларка — Вилсона</b> (1987) это и описывает. Пользователи никогда не трогают важные данные напрямую, только через утверждённые программы. Получается <b>тройка доступа</b>: субъект → программа → объект. Важные данные (<b>ограниченные элементы данных</b>, CDI) меняются только через <b>процедуры преобразования</b> (TP); <b>процедуры проверки целостности</b> (IVP) следят за их согласованностью; правила обеспечивают разделение обязанностей.</p>`,
    },
    take: { en: `Clark-Wilson: change data only through trusted programs, with duties separated.`, ru: `Кларк — Вилсон: данные меняются только через доверенные программы, обязанности разделены.` } },

  { id: 's07-019', kind: 'vs', k: ['d3-c2'], lvl: 3,
    title: { en: `Brewer-Nash, Graham-Denning, HRU, Take-Grant`, ru: `Брюэр — Нэш, Грэм — Деннинг, HRU, Take-Grant` },
    body: {
      en: `<ul><li><b>Brewer-Nash</b> ("Chinese Wall"): access changes with what you've already seen. A consultant who opens Bank A's files is then blocked from Bank B's. It prevents conflicts of interest.</li><li><b>Graham-Denning</b>: eight rules for safely creating and deleting subjects and objects and granting and removing rights.</li><li><b>Harrison-Ruzzo-Ullman</b> (HRU): builds on it and asks whether a right can ever leak to someone it shouldn't.</li><li><b>Take-Grant</b>: draws rights as a graph that changes through take, grant, create and remove.</li></ul>`,
      ru: `<ul><li><b>Брюэр — Нэш</b> («китайская стена»): доступ зависит от того, что вы уже видели. Консультант, открывший файлы банка A, больше не получит файлы банка B. Модель предотвращает конфликт интересов.</li><li><b>Грэм — Деннинг</b>: восемь правил безопасного создания и удаления субъектов и объектов, выдачи и отзыва прав.</li><li><b>Харрисон — Руззо — Ульман</b> (HRU): развивает её и спрашивает, может ли право когда-нибудь утечь к тому, кому не положено.</li><li><b>Take-Grant</b>: изображает права как граф, который меняется операциями take, grant, create и remove.</li></ul>`,
    },
    take: { en: `Brewer-Nash stops conflicts of interest; the others govern how rights are handed out.`, ru: `Брюэр — Нэш предотвращает конфликт интересов; остальные регулируют раздачу прав.` } },

  { id: 's07-020', kind: 'link', k: ['d3-c2', 'd5-c3', 'd7-c3'], lvl: 2,
    title: { en: `Which model fits which organization?`, ru: `Какая модель подходит какой организации?` },
    body: {
      en: `<p>Each model is a policy you've already met, written precisely:</p><ul><li>A <b>military</b> network worried about leaks: Bell-LaPadula, enforced as MAC (stage 4).</li><li>A <b>factory</b> safety system worried about bad data: Biba.</li><li>A <b>bank</b> worried about fraud: Clark-Wilson, which is separation of duties (stage 2) in formal dress.</li><li>A <b>consulting or law firm</b> serving competitors: Brewer-Nash.</li></ul><p>On the exam, read what the organization fears most. Leaks point to confidentiality models, fraud and errors to integrity models, conflicts of interest to the Chinese Wall.</p>`,
      ru: `<p>Каждая модель — уже знакомая политика, записанная точно:</p><ul><li><b>Военная</b> сеть, где боятся утечек: Белл — Лападула, применяемая как MAC (этап 4).</li><li>Система безопасности <b>завода</b>, где боятся неверных данных: Биба.</li><li><b>Банк</b>, где боятся мошенничества: Кларк — Вилсон, то есть разделение обязанностей (этап 2) в формальном виде.</li><li><b>Консалтинговая или юридическая фирма</b>, обслуживающая конкурентов: Брюэр — Нэш.</li></ul><p>На экзамене смотрите, чего организация боится больше всего. Утечки — модели конфиденциальности, мошенничество и ошибки — модели целостности, конфликт интересов — «китайская стена».</p>`,
    },
    take: { en: `Pick the model by the organization's biggest fear.`, ru: `Модель выбирают по главному страху организации.` } },

  { id: 's07-021', kind: 'idea', k: ['d3-c4'], lvl: 2,
    title: { en: `The trusted computing base`, ru: `Доверенная вычислительная база` },
    body: {
      en: `<p>Every security rule is enforced by something: the operating system kernel, the hypervisor, the firmware, the processor. Together, all the hardware, firmware and software that enforce security are the <b>trusted computing base</b> (TCB). If any part of the TCB is wrong or compromised, every rule on top of it can be bypassed.</p><p>The <b>security perimeter</b> is the line between the TCB and everything else. Good design keeps the TCB as <b>small</b> as possible: less to trust, less to verify, fewer places for a fatal bug.</p>`,
      ru: `<p>Каждое правило безопасности кто-то применяет: ядро операционной системы, гипервизор, прошивка, процессор. Всё оборудование, прошивки и программы, которые обеспечивают безопасность, вместе называются <b>доверенной вычислительной базой</b> (TCB). Если любая её часть ошибается или скомпрометирована, любое правило поверх неё можно обойти.</p><p><b>Периметр безопасности</b> — граница между TCB и всем остальным. Хороший проект делает TCB как можно <b>меньше</b>: меньше доверять, меньше проверять, меньше мест для фатальной ошибки.</p>`,
    },
    take: { en: `The TCB is everything you must trust; keep it small.`, ru: `TCB — всё, чему приходится доверять; держите её маленькой.` } },

  { id: 's07-022', kind: 'picture', k: ['d3-c4'], lvl: 2,
    title: { en: `The reference monitor: one guard at every door`, ru: `Монитор обращений: один охранник у каждой двери` },
    body: {
      en: `<p>The <b>reference monitor</b> is the idea at the heart of the TCB: something that checks every access by a subject (user or process) to an object (file, record, device). The <b>security kernel</b> is its real implementation. To be trusted, it must be <b>tamper-proof</b>, <b>always invoked</b> (no way around it), and <b>small enough to verify</b>.</p>`,
      ru: `<p><b>Монитор обращений</b> — идея в сердце TCB: нечто, что проверяет каждое обращение субъекта (пользователя или процесса) к объекту (файлу, записи, устройству). <b>Ядро безопасности</b> — его реальная реализация. Чтобы ему доверять, он должен быть <b>защищён от вмешательства</b>, <b>вызываться всегда</b> (обойти нельзя) и быть <b>достаточно маленьким для проверки</b>.</p>`,
    },
    dg: { title: { en: `Every request passes the reference monitor`, ru: `Каждый запрос проходит через монитор обращений` }, h: 300,
      zones: [[240, 15, 280, 275, { en: 'Security kernel (TCB)', ru: 'Ядро безопасности (TCB)' }, 'trust']],
      nodes: [
        ['s', 120, 150, { en: 'Subject', ru: 'Субъект' }, { en: 'user or process', ru: 'пользователь, процесс' }, '🧑', 'dim'],
        ['rm', 380, 150, { en: 'Reference monitor', ru: 'Монитор обращений' }, { en: 'always invoked, tamper-proof', ru: 'всегда вызывается, защищён' }, '🛡', 'key', 220],
        ['pol', 380, 60, { en: 'Access policy', ru: 'Политика доступа' }, null, '📋', 'dim'],
        ['log', 380, 250, { en: 'Audit log', ru: 'Журнал аудита' }, null, '📝', 'dim'],
        ['o', 650, 150, { en: 'Object', ru: 'Объект' }, { en: 'file, record, device', ru: 'файл, запись, устройство' }, '📁', 'ok'],
      ],
      edges: [['s', 'rm', { en: 'request', ru: 'запрос' }, 'ok'], ['rm', 'o', { en: 'allowed', ru: 'разрешено' }, 'ok'], ['rm', 'pol', { en: 'check', ru: 'проверка' }, 'key'], ['rm', 'log', { en: 'record', ru: 'запись' }, 'dash']],
      note: { en: 'If any path reaches the object without passing the monitor, the model is broken.', ru: 'Если хоть один путь ведёт к объекту в обход монитора, модель сломана.' } },
    take: { en: `Tamper-proof, always invoked, verifiable: or it isn't a reference monitor.`, ru: `Защищён, вызывается всегда, проверяем — иначе это не монитор обращений.` } },

  { id: 's07-023', kind: 'idea', k: ['d3-c4'], lvl: 2,
    title: { en: `Protection rings: kernel mode and user mode`, ru: `Кольца защиты: режим ядра и режим пользователя` },
    body: {
      en: `<p>Processors run code at different privilege levels, drawn as <b>rings</b>. <b>Ring 0</b> is the kernel: it can touch all memory and hardware. Rings 1 and 2 were meant for drivers and system services; most systems today simply use ring 0 and <b>ring 3</b>, where ordinary applications run.</p><p>Code in ring 3 (<b>user mode</b>) can't touch hardware directly. It asks the kernel through a <b>system call</b>, and the kernel decides. That boundary is what keeps a crashed or malicious app from taking the whole machine with it. Anything that runs in ring 0 is part of the TCB.</p>`,
      ru: `<p>Процессоры выполняют код на разных уровнях привилегий, которые изображают <b>кольцами</b>. <b>Кольцо 0</b> — ядро: оно может обращаться ко всей памяти и оборудованию. Кольца 1 и 2 задумывались для драйверов и системных служб; большинство систем сегодня использует только кольцо 0 и <b>кольцо 3</b>, где работают обычные приложения.</p><p>Код в кольце 3 (<b>режим пользователя</b>) не может обратиться к оборудованию напрямую. Он просит ядро через <b>системный вызов</b>, и ядро решает. Эта граница не даёт упавшему или вредоносному приложению утянуть за собой всю машину. Всё, что работает в кольце 0, входит в TCB.</p>`,
    },
    take: { en: `Ring 0 can do anything, so whatever runs there must be trusted.`, ru: `В кольце 0 можно всё, поэтому всему, что там работает, приходится доверять.` } },

  { id: 's07-024', kind: 'story', k: ['d3-c4', 'd1-c13', 'd7-c6'], lvl: 2,
    title: { en: `CrowdStrike 2024: one update in ring 0`, ru: `CrowdStrike 2024: одно обновление в кольце 0` },
    body: {
      en: `<p>On 19 July 2024, the security company CrowdStrike pushed a routine content update to its Falcon sensor on Windows. The sensor runs a driver in <b>kernel mode</b>, so it can watch everything. The update contained a logic error, the driver read memory it shouldn't, and in kernel mode that means a crash of the whole system.</p><p>About <b>8.5 million</b> Windows machines went into a blue-screen loop. Airlines grounded flights, hospitals postponed surgeries, banks and broadcasters went down. Many machines had to be fixed by hand, one at a time, often after typing in a BitLocker recovery key.</p>`,
      ru: `<p>19 июля 2024 года компания CrowdStrike выпустила рутинное обновление контента для своего сенсора Falcon в Windows. Сенсор работает как драйвер в <b>режиме ядра</b>, чтобы видеть всё. В обновлении была логическая ошибка, драйвер прочитал память, которую читать не должен, а в режиме ядра это означает падение всей системы.</p><p>Около <b>8,5 миллиона</b> компьютеров с Windows ушли в цикл «синего экрана». Авиакомпании отменяли рейсы, больницы переносили операции, падали банки и телеканалы. Многие машины пришлось чинить вручную, по одной, часто вводя ключ восстановления BitLocker.</p>`,
    },
    take: { en: `Code in the kernel is part of your TCB, whoever wrote it.`, ru: `Код в ядре — часть вашей TCB, кто бы его ни написал.` } },

  { id: 's07-025', kind: 'think', k: ['d3-c4', 'd1-c13'], lvl: 3,
    title: { en: `"It needs a kernel driver"`, ru: `«Ему нужен драйвер ядра»` },
    body: {
      en: `<p>Your company is choosing a monitoring agent for 5,000 laptops. The favourite vendor's product installs a kernel driver and updates itself several times a day directly from the vendor's cloud. The team loves its features.</p><p>After CrowdStrike, what questions should you ask before you approve it?</p>`,
      ru: `<p>Компания выбирает агент мониторинга для 5000 ноутбуков. Продукт фаворита ставит драйвер ядра и обновляется несколько раз в день прямо из облака поставщика. Команде нравятся его возможности.</p><p>Какие вопросы стоит задать после CrowdStrike, прежде чем одобрить его?</p>`,
    },
    reveal: {
      en: `<p>You're adding code to your TCB and handing its update button to a supplier, so treat it as supply-chain risk:</p><ul><li>Does it really need kernel mode, or is a user-mode option available?</li><li>Are updates tested and released in <b>stages</b> (a few machines first), and can <b>you</b> control the rings and pause them?</li><li>Are drivers and updates signed, and how does rollback work?</li><li>What's the recovery plan if every laptop fails to boot at once, and where are the recovery keys?</li></ul><p>The answer isn't "never use kernel drivers"; it's "know what you're trusting".</p>`,
      ru: `<p>Вы добавляете код в свою TCB и отдаёте кнопку его обновления поставщику, так что это риск цепочки поставок:</p><ul><li>Действительно ли нужен режим ядра или есть вариант в режиме пользователя?</li><li>Выкатываются ли обновления <b>поэтапно</b> (сначала на нескольких машинах), и можете ли <b>вы</b> управлять этапами и ставить их на паузу?</li><li>Подписаны ли драйверы и обновления, как работает откат?</li><li>Каков план восстановления, если разом не загрузится ни один ноутбук, и где ключи восстановления?</li></ul><p>Ответ не «никогда не ставить драйверы ядра», а «понимать, чему доверяешь».</p>`,
    },
    take: { en: `Before trusting kernel code, check staged updates, rollback and your recovery plan.`, ru: `Прежде чем доверять коду в ядре, проверьте поэтапные обновления, откат и план восстановления.` } },

  { id: 's07-026', kind: 'idea', k: ['d3-c4'], lvl: 2,
    title: { en: `Memory protection: walls between programs`, ru: `Защита памяти: стены между программами` },
    body: {
      en: `<p>Dozens of programs share one memory. The hardware and the kernel keep them apart:</p><ul><li><b>Process isolation</b> and <b>virtual memory</b>: each process sees its own address space and can't read another's.</li><li><b>DEP / NX</b> (data execution prevention): memory holding data is marked "not executable", so injected bytes can't simply be run as code.</li><li><b>ASLR</b> (address space layout randomization): programs load at random addresses, so an attacker can't predict where to jump.</li></ul><p>Spectre and Meltdown mattered because they slipped through the first wall without breaking any rule the software could see.</p>`,
      ru: `<p>Десятки программ делят одну память. Оборудование и ядро разделяют их:</p><ul><li><b>Изоляция процессов</b> и <b>виртуальная память</b>: каждый процесс видит своё адресное пространство и не может читать чужое.</li><li><b>DEP / NX</b> (предотвращение выполнения данных): память с данными помечена как «не исполняемая», и внедрённые байты нельзя просто запустить как код.</li><li><b>ASLR</b> (случайное размещение адресного пространства): программы загружаются по случайным адресам, и атакующий не может предсказать, куда прыгать.</li></ul><p>Spectre и Meltdown были опасны тем, что проходили через первую стену, не нарушая ни одного правила, видимого программам.</p>`,
    },
    take: { en: `Isolation keeps programs apart; DEP and ASLR make exploits harder.`, ru: `Изоляция разделяет программы; DEP и ASLR усложняют эксплойты.` } },

  { id: 's07-027', kind: 'back', back: 's06-048', k: ['d3-c5', 'd3-c4', 'd3-c10'], lvl: 3,
    title: { en: `Side channels again: Spectre and Meltdown up close`, ru: `Снова побочные каналы: Spectre и Meltdown вблизи` },
    body: {
      en: `<p>In stage 6, side channels read secrets from timing, power or sound. Spectre and Meltdown are side channels inside the CPU. The processor runs ahead on a guess; the guess touches secret memory; the result is discarded but leaves the secret's trace in the cache; the attacker times memory reads to recover it, one byte at a time.</p><p><b>Meltdown</b> let user programs read kernel memory; operating systems fixed it by unmapping the kernel from user processes (KPTI). <b>Spectre</b> tricks branch prediction and needed microcode updates, compiler changes and less precise timers in browsers.</p>`,
      ru: `<p>На этапе 6 побочные каналы считывали секреты по времени, питанию или звуку. Spectre и Meltdown — побочные каналы внутри процессора. Процессор забегает вперёд по догадке; догадка трогает секретную память; результат отбрасывается, но оставляет след секрета в кэше; атакующий замеряет время чтения памяти и восстанавливает секрет байт за байтом.</p><p><b>Meltdown</b> позволял пользовательским программам читать память ядра; операционные системы исправили это, убрав ядро из адресного пространства процессов (KPTI). <b>Spectre</b> обманывает предсказатель ветвлений, и для него понадобились обновления микрокода, изменения компиляторов и менее точные таймеры в браузерах.</p>`,
    },
    take: { en: `Spectre and Meltdown are side channels: no rule broken, a secret still leaked.`, ru: `Spectre и Meltdown — побочные каналы: правила не нарушены, а секрет утёк.` } },

  { id: 's07-028', kind: 'back', back: 's06-052', k: ['d3-c4'], lvl: 2,
    title: { en: `The TPM again: a root of trust`, ru: `Снова TPM: корень доверия` },
    body: {
      en: `<p>In stage 6, the TPM measured each boot step and released the disk key only if nothing had changed. Now you can see why that matters architecturally. The TCB has to start somewhere you trust without checking: a <b>root of trust</b>, usually a small piece of hardware and firmware.</p><p>From there, <b>secure boot</b> lets each stage verify the signature of the next before running it, and <b>measured boot</b> records what ran so a remote server can check it (<b>attestation</b>). A rootkit that loads before the operating system breaks the chain, and that's exactly what the chain is designed to catch.</p>`,
      ru: `<p>На этапе 6 TPM измерял каждый шаг загрузки и выдавал ключ диска, только если ничего не изменилось. Теперь видно, почему это важно для архитектуры. TCB должна с чего-то начинаться, и этому началу доверяют без проверки: это <b>корень доверия</b>, обычно небольшой кусок оборудования и прошивки.</p><p>Дальше <b>безопасная загрузка</b> (secure boot) даёт каждому этапу проверить подпись следующего перед запуском, а <b>измеряемая загрузка</b> записывает, что было запущено, чтобы удалённый сервер мог это проверить (<b>аттестация</b>). Руткит, загружающийся раньше операционной системы, рвёт цепочку, и цепочка как раз для того, чтобы это заметить.</p>`,
    },
    take: { en: `Trust starts in hardware and is passed up the boot chain, step by checked step.`, ru: `Доверие начинается в железе и передаётся вверх по цепочке загрузки, шаг за проверенным шагом.` } },

  { id: 's07-029', kind: 'vs', k: ['d3-c4'], lvl: 2,
    title: { en: `Type 1 vs Type 2 hypervisor`, ru: `Гипервизор типа 1 и типа 2` },
    body: {
      en: `<p>A <b>hypervisor</b> runs virtual machines (VMs), each with its own operating system, on one physical computer.</p><ul><li><b>Type 1</b> (bare metal): runs directly on the hardware. VMware ESXi, Hyper-V, Xen, KVM. Used in data centres and clouds. Smaller attack surface.</li><li><b>Type 2</b> (hosted): runs as an app on a normal operating system. VirtualBox, VMware Workstation. Fine for a laptop lab; the host OS is now part of what you trust.</li></ul><p>Risks: <b>VM escape</b>, where code in a VM breaks out to the hypervisor and every other VM, and <b>VM sprawl</b>: forgotten, unpatched VMs nobody owns.</p>`,
      ru: `<p><b>Гипервизор</b> запускает на одном физическом компьютере виртуальные машины (ВМ), у каждой своя операционная система.</p><ul><li><b>Тип 1</b> (bare metal): работает прямо на оборудовании. VMware ESXi, Hyper-V, Xen, KVM. Используется в дата-центрах и облаках. Меньше поверхность атаки.</li><li><b>Тип 2</b> (hosted): работает как приложение в обычной ОС. VirtualBox, VMware Workstation. Годится для лаборатории на ноутбуке; хостовая ОС теперь тоже часть того, чему вы доверяете.</li></ul><p>Риски: <b>побег из ВМ</b>, когда код вырывается к гипервизору и всем другим ВМ, и <b>разрастание ВМ</b>: забытые непропатченные машины без владельца.</p>`,
    },
    take: { en: `Type 1 sits on the hardware, Type 2 on an OS; watch for escape and sprawl.`, ru: `Тип 1 — на железе, тип 2 — на ОС; опасайтесь побега и разрастания.` } },

  { id: 's07-030', kind: 'vs', k: ['d3-c4', 'd3-c5'], lvl: 2,
    title: { en: `VMs vs containers vs serverless`, ru: `ВМ, контейнеры и serverless` },
    body: {
      en: `<ul><li><b>Virtual machine</b>: a full operating system per workload. Strong isolation, heavier.</li><li><b>Container</b> (Docker, Kubernetes): many workloads share one host kernel, each in its own box. Light and fast, but a kernel bug or a <b>container escape</b> reaches every container on the host. Watch where images come from, keep them small, never run them as root, and keep secrets out of them.</li><li><b>Serverless</b> (functions): you upload code; the provider runs it on demand. No servers to patch, but each function needs least-privilege permissions, and its inputs are an attack surface.</li></ul>`,
      ru: `<ul><li><b>Виртуальная машина</b>: полноценная ОС на каждую нагрузку. Сильная изоляция, но тяжелее.</li><li><b>Контейнер</b> (Docker, Kubernetes): много нагрузок делят одно ядро хоста, каждая в своей коробке. Легко и быстро, но ошибка ядра или <b>побег из контейнера</b> достаёт все контейнеры на хосте. Следите, откуда образы, делайте их маленькими, не запускайте от root и не кладите в них секреты.</li><li><b>Serverless</b> (функции): вы загружаете код, провайдер запускает его по требованию. Серверы патчить не нужно, но каждой функции нужны минимальные права, а её входные данные — поверхность атаки.</li></ul>`,
    },
    take: { en: `VMs isolate by OS, containers share a kernel, serverless shifts the patching to the provider.`, ru: `ВМ изолирует ОС, контейнеры делят ядро, serverless перекладывает патчи на провайдера.` } },

  { id: 's07-031', kind: 'idea', k: ['d3-c5'], lvl: 3,
    title: { en: `Covert channels: talking where no one listens`, ru: `Скрытые каналы: разговор там, где никто не слушает` },
    body: {
      en: `<p>A <b>covert channel</b> is a way to pass information that the system was never designed to treat as communication, so no rule watches it. Two kinds:</p><ul><li><b>Timing</b>: a process on a Secret system makes the CPU busy for "1" and idle for "0"; a process at Unclassified measures its own speed and reads the message.</li><li><b>Storage</b>: one process writes to something both can see, such as a file's existence, a lock or a disk-full flag, and the other reads it.</li></ul><p>A side channel leaks by accident; a covert channel is used <b>on purpose</b> by insiders or malware.</p>`,
      ru: `<p><b>Скрытый канал</b> — способ передать информацию через то, что система никогда не считала средством связи, поэтому за ним не следит ни одно правило. Два вида:</p><ul><li><b>По времени</b>: процесс в секретной системе нагружает процессор для «1» и простаивает для «0»; процесс на открытом уровне замеряет собственную скорость и читает сообщение.</li><li><b>По памяти</b>: один процесс пишет в то, что видят оба, например в факт существования файла, блокировку или флаг заполненного диска, а другой это читает.</li></ul><p>Побочный канал утекает случайно; скрытым каналом пользуются <b>намеренно</b> инсайдеры или вредоносы.</p>`,
    },
    take: { en: `Covert channels are deliberate; side channels are accidental.`, ru: `Скрытые каналы — намеренные, побочные — случайные.` } },

  { id: 's07-032', kind: 'idea', k: ['d3-c5'], lvl: 3,
    title: { en: `Time of check, time of use`, ru: `Время проверки и время использования` },
    body: {
      en: `<p>A program checks "is this user allowed to open file X?" Yes. A moment later it opens file X. Between the check and the use, an attacker swaps X for a link to the password file. The check passed; the use hit something else.</p><p>This is a <b>TOCTOU</b> flaw (time of check to time of use), a kind of <b>race condition</b>: the result depends on which of two things happens first. Fixes: make check and use one <b>atomic</b> step, lock the resource in between, or check the object you actually opened, not its name.</p>`,
      ru: `<p>Программа проверяет: «можно ли этому пользователю открыть файл X?» Можно. Мгновением позже она открывает X. Между проверкой и использованием атакующий подменяет X ссылкой на файл паролей. Проверка пройдена, а использование попало в другое место.</p><p>Это уязвимость <b>TOCTOU</b> (time of check to time of use) — разновидность <b>состояния гонки</b>: результат зависит от того, что произойдёт первым. Исправления: сделать проверку и использование одним <b>атомарным</b> шагом, заблокировать ресурс между ними или проверять уже открытый объект, а не его имя.</p>`,
    },
    take: { en: `If the world can change between check and use, the check means nothing.`, ru: `Если мир может измениться между проверкой и использованием, проверка ничего не значит.` } },

  { id: 's07-033', kind: 'story', k: ['d3-c5', 'd1-c13'], lvl: 3,
    title: { en: `Juniper 2015: code nobody at Juniper wrote`, ru: `Juniper 2015: код, который в Juniper никто не писал` },
    body: {
      en: `<p>In December 2015, Juniper Networks announced that an internal code review had found <b>unauthorized code</b> in ScreenOS, the software of its NetScreen firewalls, in versions going back to 2012.</p><p>There were two backdoors. One was a hard-coded master password that let anyone log in as administrator over SSH or Telnet. The other changed a constant in the random number generator, which would let someone who knew the secret decrypt the firewalls' VPN traffic. Nobody publicly took responsibility. Companies and governments that relied on these firewalls had been trusting code that nobody at Juniper had approved.</p>`,
      ru: `<p>В декабре 2015 года Juniper Networks объявила, что внутренняя проверка кода нашла <b>несанкционированный код</b> в ScreenOS — ПО межсетевых экранов NetScreen — в версиях начиная с 2012 года.</p><p>Бэкдоров было два. Первый — зашитый мастер-пароль, с которым любой мог войти администратором по SSH или Telnet. Второй менял константу в генераторе случайных чисел, что позволило бы знающему секрет расшифровывать VPN-трафик этих экранов. Ответственность публично никто не взял. Компании и правительства, полагавшиеся на эти экраны, доверяли коду, который в Juniper никто не утверждал.</p>`,
    },
    take: { en: `A backdoor is a hidden way past the reference monitor, and it can come from anyone.`, ru: `Бэкдор — скрытый путь в обход монитора обращений, и подложить его может кто угодно.` } },

  { id: 's07-034', kind: 'back', back: 's03-011', k: ['d3-c5', 'd2-c1'], lvl: 2,
    title: { en: `The two harmless lists, inside a database`, ru: `Два безобидных списка внутри базы данных` },
    body: {
      en: `<p>In stage 3, two Internal lists combined into something sensitive. Databases face this all the time:</p><ul><li><b>Aggregation</b>: collecting many low-sensitivity facts reveals a sensitive one, like the headcount per office adding up to a secret expansion.</li><li><b>Inference</b>: deducing a hidden fact from what you're allowed to see. The total salary of a department before and after one person joins reveals that person's salary.</li></ul><p>Countermeasures: <b>views</b> that show only what's needed, <b>cell suppression</b> (hide small groups), <b>noise and perturbation</b> (slightly blur statistics), and polyinstantiation, next.</p>`,
      ru: `<p>На этапе 3 два внутренних списка вместе стали чувствительными. Базы данных сталкиваются с этим постоянно:</p><ul><li><b>Агрегация</b>: множество малочувствительных фактов вместе раскрывают чувствительный, например численность по офисам складывается в секретное расширение.</li><li><b>Логический вывод</b> (inference): вывести скрытый факт из того, что вам разрешено видеть. Общий фонд зарплаты отдела до и после прихода одного человека раскрывает его зарплату.</li></ul><p>Меры: <b>представления</b> (views), показывающие только нужное, <b>подавление ячеек</b> (скрывать маленькие группы), <b>шум и возмущение</b> (слегка размывать статистику) и полиинстанцирование — на следующей карточке.</p>`,
    },
    take: { en: `Aggregation adds facts up; inference reasons its way to a secret.`, ru: `Агрегация складывает факты; вывод приходит к секрету рассуждением.` } },

  { id: 's07-035', kind: 'think', k: ['d3-c5', 'd2-c1'], lvl: 3,
    title: { en: `The ship with no cargo record`, ru: `Корабль без записи о грузе` },
    body: {
      en: `<p>A navy logistics database lists every ship's cargo. One ship's real cargo is classified Secret. A sailor with Unclassified clearance queries it and gets: "Access denied".</p><p>The access control worked. Why is this still a leak, and what can the database do instead?</p>`,
      ru: `<p>В базе снабжения флота указан груз каждого корабля. Настоящий груз одного судна засекречен. Матрос с открытым допуском запрашивает его и получает: «Доступ запрещён».</p><p>Контроль доступа сработал. Почему это всё равно утечка и что база может сделать вместо этого?</p>`,
    },
    reveal: {
      en: `<p>"Access denied" on only one ship tells the sailor <b>that ship carries something secret</b>. That's inference: the refusal itself is information.</p><p>The fix is <b>polyinstantiation</b>: the database keeps two versions of the same record at different levels. Unclassified users see a plausible cover entry ("food supplies"); Secret users see the real cargo. Nobody gets a suspicious refusal, and nothing classified flows down.</p>`,
      ru: `<p>«Доступ запрещён» только для одного корабля сообщает матросу, <b>что он везёт что-то секретное</b>. Это вывод: сам отказ — уже информация.</p><p>Решение — <b>полиинстанцирование</b>: база хранит две версии одной записи на разных уровнях. Пользователи с открытым допуском видят правдоподобную запись-прикрытие («продовольствие»), с секретным — настоящий груз. Подозрительных отказов нет, и ничего секретного не стекает вниз.</p>`,
    },
    take: { en: `A refusal can leak; polyinstantiation gives each level its own consistent answer.`, ru: `Отказ может выдать секрет; полиинстанцирование даёт каждому уровню свой согласованный ответ.` } },

  { id: 's07-036', kind: 'idea', k: ['d3-c5'], lvl: 2,
    title: { en: `Industrial control systems: availability and safety first`, ru: `Промышленные системы: сначала доступность и безопасность` },
    body: {
      en: `<p><b>Operational technology</b> (OT) runs physical things: power grids, water plants, pipelines, factory lines. <b>SCADA</b> systems supervise them over wide areas; <b>PLCs</b> switch the valves and motors.</p><p>The priorities are reversed from office IT. A frozen screen in an office is annoying; a frozen controller in a chemical plant can kill. So <b>safety and availability come first</b>. Equipment lives 20 years or more, can't be rebooted for patches on a whim, and often speaks old protocols such as <b>Modbus</b> and <b>DNP3</b>, which were designed without any authentication: whoever can reach them can command them.</p>`,
      ru: `<p><b>Операционные технологии</b> (OT) управляют физическим миром: энергосетями, водоочистными станциями, трубопроводами, линиями заводов. Системы <b>SCADA</b> контролируют их на больших территориях; <b>ПЛК</b> переключают задвижки и двигатели.</p><p>Приоритеты здесь обратные офисным. Зависший экран в офисе раздражает; зависший контроллер на химзаводе может убить. Поэтому <b>сначала безопасность людей и доступность</b>. Оборудование живёт 20 лет и больше, его нельзя перезагрузить ради патча когда захочется, и оно часто говорит на старых протоколах вроде <b>Modbus</b> и <b>DNP3</b>, созданных без всякой аутентификации: кто до них дотянулся, тот и командует.</p>`,
    },
    take: { en: `In OT, the first question is "could this hurt someone or stop the plant?"`, ru: `В OT первый вопрос: «может ли это кому-то навредить или остановить производство?»` } },

  { id: 's07-037', kind: 'story', k: ['d3-c5', 'd4-c8'], lvl: 2,
    title: { en: `Ukraine 2015: the cursor moved by itself`, ru: `Украина, 2015: курсор двигался сам` },
    body: {
      en: `<p>On 23 December 2015, operators at three Ukrainian electricity distribution companies watched the cursors on their control screens move on their own. Remote attackers clicked through the SCADA software and opened breakers at substations. About <b>225,000</b> customers lost power for several hours in winter.</p><p>The attack had started months earlier with phishing emails to office staff. From the IT network, the attackers stole VPN credentials that also reached the control network. They also overwrote firmware on network converters at the substations and flooded the call centres with fake calls. Engineers restored power by driving out and switching manually.</p>`,
      ru: `<p>23 декабря 2015 года операторы трёх украинских энергораспределительных компаний увидели, как курсоры на их экранах управления двигаются сами. Удалённые атакующие щёлкали по программе SCADA и размыкали выключатели на подстанциях. Около <b>225 тысяч</b> абонентов остались без света на несколько часов, зимой.</p><p>Атака началась за несколько месяцев с фишинговых писем офисным сотрудникам. Из IT-сети атакующие украли учётные данные VPN, которые открывали и сеть управления. Они также перезаписали прошивку сетевых преобразователей на подстанциях и забили колл-центры ложными звонками. Инженеры восстановили питание, выезжая на подстанции и переключая вручную.</p>`,
    },
    take: { en: `When the office network can reach the control network, a phishing email can switch off a city.`, ru: `Если из офисной сети можно попасть в сеть управления, фишинговое письмо может обесточить город.` } },

  { id: 's07-038', kind: 'picture', k: ['d3-c5', 'd4-c8', 'd4-c4'], lvl: 2,
    title: { en: `The Purdue model: layers between email and valves`, ru: `Модель Purdue: слои между почтой и задвижками` },
    body: {
      en: `<p>The <b>Purdue model</b> stacks industrial networks in levels, from the business network at the top down to sensors and valves. The key rule: no direct path from the internet or the office to the control levels. Traffic stops in an <b>IT/OT DMZ</b>; where possible, a <b>unidirectional gateway</b> (data diode) lets data out but nothing in.</p>`,
      ru: `<p><b>Модель Purdue</b> раскладывает промышленные сети по уровням: от бизнес-сети наверху до датчиков и задвижек внизу. Главное правило: из интернета или офиса нет прямого пути к уровням управления. Трафик останавливается в <b>демилитаризованной зоне IT/OT</b>; где возможно, <b>однонаправленный шлюз</b> (диод данных) выпускает данные наружу, но ничего не впускает.</p>`,
    },
    dg: { title: { en: `IT on top, the physical process at the bottom`, ru: `IT наверху, физический процесс внизу` }, h: 330,
      zones: [[20, 8, 560, 78, { en: 'IT', ru: 'IT' }, 'untrust'], [20, 170, 560, 152, { en: 'OT', ru: 'OT' }, 'trust']],
      nodes: [
        ['e', 300, 45, { en: 'Enterprise IT', ru: 'Корпоративная IT' }, { en: 'Levels 4–5: email, ERP, internet', ru: 'Уровни 4–5: почта, ERP, интернет' }, '🏢', 'dim'],
        ['z', 300, 125, { en: 'IT/OT DMZ', ru: 'DMZ между IT и OT' }, { en: 'Level 3.5: patch server, data copy', ru: 'Уровень 3.5: сервер обновлений, копия данных' }, '🚧', 'key'],
        ['o', 300, 205, { en: 'Site operations', ru: 'Управление площадкой' }, { en: 'Level 3: SCADA servers, historian', ru: 'Уровень 3: серверы SCADA, архив' }, '🖥', 'ok'],
        ['c', 300, 285, { en: 'Control and process', ru: 'Управление процессом' }, { en: 'Levels 0–2: HMI, PLCs, sensors, valves', ru: 'Уровни 0–2: HMI, ПЛК, датчики, задвижки' }, '⚙', 'ok'],
        ['v', 640, 125, { en: 'Remote vendor', ru: 'Удалённый подрядчик' }, { en: 'jump host only', ru: 'только через jump-хост' }, '🧑‍🔧', 'bad'],
      ],
      edges: [['e', 'z', { en: 'firewall', ru: 'межсетевой экран' }, 'key'], ['z', 'o', { en: 'firewall, one-way if possible', ru: 'экран, по возможности в одну сторону' }, 'key'], ['o', 'c', null, 'ok'], ['v', 'z', { en: 'MFA, logged', ru: 'MFA, журнал' }, 'dash']],
      note: { en: 'Nothing from the internet or the office talks to levels 0–2 directly.', ru: 'Ничто из интернета или офиса не обращается к уровням 0–2 напрямую.' } },
    take: { en: `Put walls between business IT and the physical process, and make every crossing deliberate.`, ru: `Поставьте стены между бизнес-IT и физическим процессом и сделайте каждый переход осознанным.` } },

  { id: 's07-039', kind: 'back', back: 's05-031', k: ['d3-c5', 'd4-c8'], lvl: 2,
    title: { en: `The smart building again: embedded and IoT`, ru: `Снова умное здание: встроенные системы и IoT` },
    body: {
      en: `<p>In stage 5, the smart building's controllers wanted to join the office Wi-Fi, and the answer was a separate segment. Here's why they're risky by design. <b>Embedded</b> and <b>IoT</b> devices often ship with default or hard-coded passwords, run old software that's rarely or never updated, use weak or no encryption, and are too small to run security agents. Mirai (stage 5) built its botnet from exactly these.</p><p>Laws are catching up: since April 2024, the UK bans universal default passwords on consumer connected devices, and the EU Cyber Resilience Act will require security updates for products with digital elements.</p>`,
      ru: `<p>На этапе 5 контроллеры умного здания хотели подключиться к офисному Wi-Fi, и ответом был отдельный сегмент. Вот почему они рискованны по устройству. <b>Встроенные</b> и <b>IoT</b>-устройства часто поставляются со стандартными или зашитыми паролями, работают на старом ПО, которое обновляют редко или никогда, используют слабое шифрование или никакого и слишком малы для агентов защиты. Mirai (этап 5) собрал ботнет как раз из таких.</p><p>Законы догоняют: с апреля 2024 года Великобритания запрещает единые стандартные пароли на потребительских подключаемых устройствах, а европейский Cyber Resilience Act потребует обновлений безопасности для продуктов с цифровыми элементами.</p>`,
    },
    take: { en: `Assume an IoT device can't defend itself: segment it, change its defaults, track its updates.`, ru: `Считайте, что IoT-устройство не может защититься само: изолируйте его, смените умолчания, следите за обновлениями.` } },

  { id: 's07-040', kind: 'vs', k: ['d3-c5'], lvl: 1,
    title: { en: `IaaS vs PaaS vs SaaS`, ru: `IaaS, PaaS и SaaS` },
    body: {
      en: `<p>Cloud services differ in how much the provider runs for you:</p><ul><li><b>IaaS</b> (infrastructure): you rent virtual machines, storage and networks. You install and patch the operating system and everything above. Example: AWS EC2, Azure VMs.</li><li><b>PaaS</b> (platform): the provider runs the OS and runtime; you bring your code and data. Example: a managed database, Google App Engine.</li><li><b>SaaS</b> (software): a finished application. You manage users, settings and your data. Example: Microsoft 365, Salesforce.</li></ul>`,
      ru: `<p>Облачные услуги различаются тем, сколько провайдер делает за вас:</p><ul><li><b>IaaS</b> (инфраструктура): вы арендуете виртуальные машины, хранилище и сети. ОС и всё выше вы ставите и патчите сами. Пример: AWS EC2, виртуальные машины Azure.</li><li><b>PaaS</b> (платформа): провайдер ведёт ОС и среду выполнения; вы приносите код и данные. Пример: управляемая база данных, Google App Engine.</li><li><b>SaaS</b> (программа): готовое приложение. Вы управляете пользователями, настройками и своими данными. Пример: Microsoft 365, Salesforce.</li></ul>`,
    },
    take: { en: `The more "as a service" you buy, the less you patch, but never less data to protect.`, ru: `Чем больше покупаете «как услугу», тем меньше патчите, но данных для защиты меньше не становится.` } },

  { id: 's07-041', kind: 'picture', k: ['d3-c5'], lvl: 1,
    title: { en: `The shared responsibility model`, ru: `Модель разделённой ответственности` },
    body: {
      en: `<p>In every cloud model, security is split between you and the provider. The line moves up as you go from IaaS to SaaS, but one row never moves: <b>your data, your users and their access are always yours</b>. Most cloud breaches happen in that row, through misconfiguration, not through the provider's hardware.</p>`,
      ru: `<p>В любой облачной модели безопасность разделена между вами и провайдером. Граница поднимается от IaaS к SaaS, но одна строка не двигается никогда: <b>ваши данные, ваши пользователи и их доступ всегда на вас</b>. Большинство облачных утечек случается именно в этой строке, из-за ошибок настройки, а не из-за железа провайдера.</p>`,
    },
    dg: { title: { en: `Who secures what`, ru: `Кто что защищает` }, h: 320,
      zones: [[265, 15, 140, 290, 'IaaS', 'trust'], [415, 15, 140, 290, 'PaaS', 'trust'], [565, 15, 140, 290, 'SaaS', 'trust']],
      nodes: [
        ['r1', 130, 65, { en: 'Data, users, access', ru: 'Данные, пользователи, доступ' }, null, null, null, 220],
        ['r2', 130, 115, { en: 'Application', ru: 'Приложение' }, null, null, null, 220],
        ['r3', 130, 165, { en: 'OS and runtime', ru: 'ОС и среда выполнения' }, null, null, null, 220],
        ['r4', 130, 215, { en: 'Virtualization, servers', ru: 'Виртуализация, серверы' }, null, null, null, 220],
        ['r5', 130, 265, { en: 'Building and power', ru: 'Здание и питание' }, null, null, null, 220],
        ['a1', 335, 65, { en: 'You', ru: 'Вы' }, null, null, 'key'], ['b1', 485, 65, { en: 'You', ru: 'Вы' }, null, null, 'key'], ['c1', 635, 65, { en: 'You', ru: 'Вы' }, null, null, 'key'],
        ['a2', 335, 115, { en: 'You', ru: 'Вы' }, null, null, 'key'], ['b2', 485, 115, { en: 'You', ru: 'Вы' }, null, null, 'key'], ['c2', 635, 115, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'],
        ['a3', 335, 165, { en: 'You', ru: 'Вы' }, null, null, 'key'], ['b3', 485, 165, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'], ['c3', 635, 165, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'],
        ['a4', 335, 215, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'], ['b4', 485, 215, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'], ['c4', 635, 215, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'],
        ['a5', 335, 265, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'], ['b5', 485, 265, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'], ['c5', 635, 265, { en: 'Provider', ru: 'Провайдер' }, null, null, 'dim'],
      ],
      edges: [],
      note: { en: 'Simplified: real splits vary by service, so read each provider\'s own matrix.', ru: 'Упрощённо: реальное деление зависит от услуги, читайте матрицу конкретного провайдера.' } },
    take: { en: `Whatever the model, your data and who can reach it are your job.`, ru: `В любой модели ваши данные и доступ к ним — ваша забота.` } },

  { id: 's07-042', kind: 'back', back: 's01-038', k: ['d3-c5', 'd7-c3'], lvl: 3,
    title: { en: `Capital One again: the architecture behind the fine`, ru: `Снова Capital One: архитектура за штрафом` },
    body: {
      en: `<p>In stage 1, Capital One was fined for weak governance. Here's the technical chain, as reported in court documents and investigations. The attacker sent crafted requests through a misconfigured web application firewall, making it fetch an internal address: the cloud server's <b>metadata service</b> (server-side request forgery). That service handed out temporary credentials for the firewall's cloud role. The role had far more rights than a firewall needs, including listing and reading the bank's storage buckets.</p><p>Two design failures: a component that could be tricked into making requests, and a role that ignored least privilege. The provider's own layers held.</p>`,
      ru: `<p>На этапе 1 Capital One оштрафовали за слабое управление. Вот техническая цепочка по судебным документам и расследованиям. Атакующая отправляла специальные запросы через неверно настроенный межсетевой экран веб-приложений и заставляла его обращаться к внутреннему адресу — <b>службе метаданных</b> облачного сервера (подделка запросов на стороне сервера, SSRF). Эта служба выдала временные учётные данные облачной роли экрана. У роли было намного больше прав, чем нужно экрану, включая просмотр и чтение хранилищ банка.</p><p>Два изъяна проекта: компонент, который можно обманом заставить делать запросы, и роль, нарушающая минимальные привилегии. Уровни провайдера выдержали.</p>`,
    },
    take: { en: `Cloud breaches usually happen in the customer's half of the shared model.`, ru: `Облачные утечки обычно случаются в половине модели, за которую отвечает клиент.` } },

  { id: 's07-043', kind: 'vs', k: ['d3-c5'], lvl: 2,
    title: { en: `Public, private, community, hybrid cloud`, ru: `Публичное, частное, общественное, гибридное облако` },
    body: {
      en: `<ul><li><b>Public</b>: shared infrastructure, open to any customer. Cheapest and most elastic. Main concern: <b>multitenancy</b>, other customers on the same hardware (remember Spectre).</li><li><b>Private</b>: cloud technology used by one organization, on premises or hosted. More control, more cost.</li><li><b>Community</b>: shared by organizations with common needs, such as government agencies or hospitals under the same rules.</li><li><b>Hybrid</b>: a mix, with workloads moving between them. The joins between clouds are new trust boundaries to secure.</li></ul>`,
      ru: `<ul><li><b>Публичное</b>: общая инфраструктура для любых клиентов. Дешевле и гибче всего. Главная забота — <b>мультиарендность</b>: чужие клиенты на том же оборудовании (вспомните Spectre).</li><li><b>Частное</b>: облачные технологии для одной организации, у себя или у хостера. Больше контроля, больше затрат.</li><li><b>Общественное</b> (community): общее для организаций с похожими нуждами, например госорганов или больниц с одними правилами.</li><li><b>Гибридное</b>: смесь, между частями которой переезжают нагрузки. Стыки между облаками — новые границы доверия, которые надо защищать.</li></ul>`,
    },
    take: { en: `Public means shared hardware; hybrid means more boundaries to secure.`, ru: `Публичное — общее железо; гибридное — больше границ для защиты.` } },

  { id: 's07-044', kind: 'idea', k: ['d3-c5', 'd3-c9'], lvl: 2,
    title: { en: `Microservices: many small doors`, ru: `Микросервисы: много маленьких дверей` },
    body: {
      en: `<p>Modern applications are often split into dozens of small <b>microservices</b> that talk over <b>APIs</b>. That's flexible, but every service is a door, and every API call crosses a boundary.</p><p>So each service needs to authenticate its callers (not just "it's inside our network"), authorize every request, validate input, and limit request rates. An <b>API gateway</b> puts common checks in one place. And each service needs <b>secrets</b>: database passwords, API keys, certificates. They belong in a secrets manager or vault that hands them out at runtime and rotates them, never in code, images or config files.</p>`,
      ru: `<p>Современные приложения часто разбиты на десятки маленьких <b>микросервисов</b>, общающихся через <b>API</b>. Это гибко, но каждый сервис — дверь, и каждый вызов API пересекает границу.</p><p>Поэтому каждый сервис должен аутентифицировать вызывающих (а не считать «раз внутри сети — свой»), авторизовать каждый запрос, проверять входные данные и ограничивать частоту запросов. <b>API-шлюз</b> собирает общие проверки в одном месте. И каждому сервису нужны <b>секреты</b>: пароли баз, ключи API, сертификаты. Им место в менеджере секретов (vault), который выдаёт их во время работы и меняет, а не в коде, образах или конфигурационных файлах.</p>`,
    },
    take: { en: `Every service is a door: authenticate it, authorize it, and keep its secrets in a vault.`, ru: `Каждый сервис — дверь: аутентификация, авторизация и секреты в хранилище.` } },

  { id: 's07-045', kind: 'think', k: ['d3-c5', 'd3-c9'], lvl: 2,
    title: { en: `The key in the public repository`, ru: `Ключ в публичном репозитории` },
    body: {
      en: `<p>A developer notices that a cloud access key for the production account was committed to a public code repository three days ago. They propose to delete the file in a new commit and say nothing, since "it's gone now".</p><p>What's wrong with that plan, and what should happen first?</p>`,
      ru: `<p>Разработчик замечает, что ключ доступа к боевому облачному аккаунту три дня назад попал в публичный репозиторий кода. Он предлагает удалить файл новым коммитом и никому не говорить: «его же больше нет».</p><p>Что не так с этим планом и что нужно сделать в первую очередь?</p>`,
    },
    reveal: {
      en: `<p>The key isn't gone: it's still in the repository's history, and bots scan public repositories for keys within minutes. Assume it's been copied.</p><ol><li><b>Revoke and rotate</b> the key now; deleting the file protects nothing.</li><li><b>Report</b> it through the incident process, and check the account's logs for use of the key over the last three days.</li><li>Then clean the history, and prevent a repeat: secret scanning before commits, keys in a vault, and short-lived credentials instead of long-lived keys.</li></ol>`,
      ru: `<p>Ключ никуда не делся: он остался в истории репозитория, а боты находят ключи в публичных репозиториях за минуты. Считайте, что его уже скопировали.</p><ol><li><b>Отозвать и заменить</b> ключ немедленно: удаление файла ничего не защищает.</li><li><b>Сообщить</b> через процесс реагирования на инциденты и проверить журналы аккаунта на использование ключа за три дня.</li><li>Затем почистить историю и не допустить повторения: сканирование секретов до коммита, ключи в хранилище, краткоживущие учётные данные вместо долгоживущих ключей.</li></ol>`,
    },
    take: { en: `A leaked secret is a compromised secret: rotate first, clean up after.`, ru: `Утёкший секрет — скомпрометированный секрет: сначала замена, потом уборка.` } },

  { id: 's07-046', kind: 'back', back: 's06-038', k: ['d3-c9', 'd4-c5'], lvl: 3,
    title: { en: `The chain of trust again: certificates for machines`, ru: `Снова цепочка доверия: сертификаты для машин` },
    body: {
      en: `<p>In stage 6, the chain of trust let your browser trust a bank's website. Inside a modern system, the same idea lets services trust each other. An organization runs an <b>internal CA</b>, and every service gets its own certificate. When two services talk, both present certificates: <b>mutual TLS</b> (mTLS). Each side proves who it is, and the traffic is encrypted, even inside the data centre.</p><p>A <b>service mesh</b> automates this, issuing short-lived certificates and rotating them every few hours, so no human ever handles the keys. It's zero trust between machines.</p>`,
      ru: `<p>На этапе 6 цепочка доверия позволяла браузеру доверять сайту банка. Внутри современной системы та же идея позволяет сервисам доверять друг другу. Организация держит <b>внутренний УЦ</b>, и каждый сервис получает свой сертификат. Когда два сервиса общаются, оба предъявляют сертификаты: <b>взаимный TLS</b> (mTLS). Каждая сторона доказывает, кто она, и трафик зашифрован даже внутри дата-центра.</p><p><b>Сервисная сетка</b> (service mesh) делает это автоматически: выпускает краткоживущие сертификаты и меняет их каждые несколько часов, так что ключей не касается ни один человек. Это нулевое доверие между машинами.</p>`,
    },
    take: { en: `With mTLS, every service proves its identity to every other.`, ru: `С mTLS каждый сервис доказывает свою личность каждому другому.` } },

  { id: 's07-047', kind: 'idea', k: ['d3-c5'], lvl: 2,
    title: { en: `Edge, fog, HPC, mobile: every shape has its own holes`, ru: `Edge, fog, HPC, мобильные: у каждой формы свои дыры` },
    body: {
      en: `<ul><li><b>Edge computing</b> processes data near where it's produced, in a shop, a cell tower or a car. The devices sit in places you can't lock up, so physical tampering is a risk.</li><li><b>Fog computing</b> is a layer between edge devices and the cloud that gathers and filters their data.</li><li><b>High-performance computing</b> (HPC) clusters chase speed, and security tools that slow jobs down get switched off.</li><li><b>Mobile devices</b> get lost, mix work and personal apps, and connect to any network.</li><li><b>Distributed systems</b> spread trust across many nodes, so one compromised node mustn't be able to lie to all the rest.</li></ul>`,
      ru: `<ul><li><b>Граничные вычисления</b> (edge) обрабатывают данные рядом с местом их появления: в магазине, на вышке связи, в автомобиле. Устройства стоят там, где их не запереть, поэтому есть риск физического вмешательства.</li><li><b>Туманные вычисления</b> (fog) — слой между граничными устройствами и облаком, который собирает и фильтрует их данные.</li><li><b>Высокопроизводительные кластеры</b> (HPC) гонятся за скоростью, и средства защиты, замедляющие задачи, отключают.</li><li><b>Мобильные устройства</b> теряются, смешивают рабочие и личные приложения и подключаются к любой сети.</li><li><b>Распределённые системы</b> делят доверие между многими узлами, и один взломанный узел не должен суметь обмануть остальных.</li></ul>`,
    },
    take: { en: `For each architecture, ask where it runs, who can touch it and what it trusts.`, ru: `Для каждой архитектуры спрашивайте: где работает, кто может её потрогать и чему она доверяет.` } },

  { id: 's07-048', kind: 'link', k: ['d3-c5', 'd3-c4', 'd3-c1'], lvl: 3,
    title: { en: `Spectre in the cloud: why your neighbour matters`, ru: `Spectre в облаке: почему важен сосед` },
    body: {
      en: `<p>Put the pieces together. In a public cloud (multitenancy), your VM shares a physical CPU with strangers. The hypervisor (TCB) promises isolation. Spectre and Meltdown showed that the processor under the hypervisor could leak memory across that promise, through a side channel.</p><p>Cloud providers patched their hosts quietly in the weeks before disclosure, but customers still had to patch their own guest operating systems, their part of the shared model. Highly sensitive workloads can rent <b>dedicated hosts</b>, so no stranger shares the hardware. That's defense in depth: don't let one layer's promise be your only protection.</p>`,
      ru: `<p>Соберём кусочки. В публичном облаке (мультиарендность) ваша ВМ делит физический процессор с незнакомцами. Гипервизор (TCB) обещает изоляцию. Spectre и Meltdown показали, что процессор под гипервизором может пропускать память сквозь это обещание через побочный канал.</p><p>Облачные провайдеры тихо пропатчили свои хосты в недели перед раскрытием, но клиентам всё равно пришлось патчить свои гостевые ОС — свою часть разделённой модели. Особо чувствительные нагрузки могут арендовать <b>выделенные хосты</b>, где чужих на железе нет. Это эшелонированная защита: обещание одного слоя не должно быть единственной защитой.</p>`,
    },
    take: { en: `Shared hardware means shared risk; patch your half and add layers where it matters.`, ru: `Общее железо — общий риск; патчите свою половину и добавляйте слои, где это важно.` } },

  { id: 's07-049', kind: 'idea', k: ['d3-c3'], lvl: 2,
    title: { en: `How do you know a product is secure?`, ru: `Как узнать, что продукт защищён?` },
    body: {
      en: `<p>You can't test every firewall, smart card or operating system yourself. <b>Common Criteria</b> (ISO/IEC 15408) lets independent labs do it to one shared standard, recognized across many countries.</p><p>Three terms:</p><ul><li><b>Protection Profile</b> (PP): what a type of customer needs, such as "a network firewall for government use". Written by buyers or their representatives.</li><li><b>Security Target</b> (ST): what the vendor claims this product does.</li><li><b>Target of Evaluation</b> (TOE): the exact product and configuration that the lab tests.</li></ul>`,
      ru: `<p>Нельзя самому проверить каждый межсетевой экран, смарт-карту или операционную систему. <b>Общие критерии</b> (Common Criteria, ISO/IEC 15408) позволяют это делать независимым лабораториям по единому стандарту, признанному во многих странах.</p><p>Три термина:</p><ul><li><b>Профиль защиты</b> (PP): что нужно определённому типу заказчика, например «сетевой экран для госорганов». Пишут покупатели или их представители.</li><li><b>Задание по безопасности</b> (ST): что, по словам производителя, делает этот продукт.</li><li><b>Объект оценки</b> (TOE): конкретный продукт и конфигурация, которые проверяет лаборатория.</li></ul>`,
    },
    take: { en: `PP is what buyers need, ST is what the vendor claims, TOE is what was tested.`, ru: `PP — что нужно покупателю, ST — что заявляет производитель, TOE — что проверили.` } },

  { id: 's07-050', kind: 'vs', k: ['d3-c3'], lvl: 2,
    title: { en: `EAL1 to EAL7: how hard they looked`, ru: `От EAL1 до EAL7: насколько тщательно смотрели` },
    body: {
      en: `<p>The <b>evaluation assurance level</b> (EAL) says how thoroughly the product was examined, not how strong it is:</p><ul><li><b>EAL1</b>: functionally tested.</li><li><b>EAL2</b>: structurally tested.</li><li><b>EAL3</b>: methodically tested and checked.</li><li><b>EAL4</b>: methodically designed, tested and reviewed. The usual top level for commercial products.</li><li><b>EAL5</b>: semiformally designed and tested.</li><li><b>EAL6</b>: semiformally verified design and tested.</li><li><b>EAL7</b>: formally verified design and tested. Rare, for small, critical components.</li></ul><p>A "+" (such as EAL4+) means extra requirements were added.</p>`,
      ru: `<p><b>Уровень доверия к оценке</b> (EAL) говорит, насколько тщательно проверяли продукт, а не насколько он стоек:</p><ul><li><b>EAL1</b>: функционально протестирован.</li><li><b>EAL2</b>: структурно протестирован.</li><li><b>EAL3</b>: методически протестирован и проверен.</li><li><b>EAL4</b>: методически спроектирован, протестирован и проанализирован. Обычный потолок для коммерческих продуктов.</li><li><b>EAL5</b>: полуформально спроектирован и протестирован.</li><li><b>EAL6</b>: полуформально верифицированный проект, протестирован.</li><li><b>EAL7</b>: формально верифицированный проект, протестирован. Редкость, для небольших критичных компонентов.</li></ul><p>«+» (например, EAL4+) означает, что добавлены дополнительные требования.</p>`,
    },
    take: { en: `EAL measures assurance, the depth of checking, not the strength of security.`, ru: `EAL измеряет доверие — глубину проверки, а не силу защиты.` } },

  { id: 's07-051', kind: 'vs', k: ['d3-c3'], lvl: 3,
    title: { en: `Orange Book vs ITSEC vs Common Criteria`, ru: `«Оранжевая книга», ITSEC и Общие критерии` },
    body: {
      en: `<ul><li><b>TCSEC</b>, the "Orange Book" (US, 1985): rated operating systems from D (minimal) through C1, C2, B1, B2, B3 to A1 (verified design). Confidentiality only, and functionality and assurance were bundled into one grade.</li><li><b>ITSEC</b> (Europe, 1991): rated <b>functionality</b> (F) and <b>assurance</b> (E) separately, and covered integrity and availability too.</li><li><b>Common Criteria</b> (1990s onwards): replaced both. Needs are written as Protection Profiles; assurance is the EAL.</li></ul><p>The Orange Book is history, but its levels still appear in exam questions.</p>`,
      ru: `<ul><li><b>TCSEC</b>, «Оранжевая книга» (США, 1985): оценивала ОС от D (минимальная защита) через C1, C2, B1, B2, B3 до A1 (верифицированный проект). Только конфиденциальность, а функциональность и доверие слиты в одну оценку.</li><li><b>ITSEC</b> (Европа, 1991): оценивала <b>функциональность</b> (F) и <b>доверие</b> (E) отдельно и учитывала также целостность и доступность.</li><li><b>Общие критерии</b> (с 1990-х): заменили обе. Потребности записываются в профилях защиты, доверие — это EAL.</li></ul><p>«Оранжевая книга» — история, но её уровни всё ещё встречаются в вопросах экзамена.</p>`,
    },
    take: { en: `TCSEC bundled, ITSEC split function from assurance, Common Criteria replaced both.`, ru: `TCSEC всё смешивала, ITSEC разделила функции и доверие, Общие критерии заменили обе.` } },

  { id: 's07-052', kind: 'think', k: ['d3-c3'], lvl: 2,
    title: { en: `"It's EAL4+ certified, so it's secure"`, ru: `«Он сертифицирован по EAL4+, значит, защищён»` },
    body: {
      en: `<p>A vendor's sales deck says their firewall is "Common Criteria EAL4+ certified". Your manager concludes it can go straight into production and no further review is needed.</p><p>What does the certificate actually tell you, and what should you still check?</p>`,
      ru: `<p>В презентации производителя сказано, что его межсетевой экран «сертифицирован по Общим критериям на EAL4+». Руководитель делает вывод, что его можно сразу ставить в работу и больше ничего проверять не надо.</p><p>Что на самом деле говорит сертификат и что всё же нужно проверить?</p>`,
    },
    reveal: {
      en: `<p>It says a lab checked the <b>specific version and configuration</b> (the TOE) against the vendor's own <b>Security Target</b>, at EAL4 depth. Still check:</p><ul><li>Does the ST or Protection Profile cover the threats <b>you</b> care about?</li><li>Is the version you're buying the one evaluated, set up in the evaluated configuration?</li><li>How old is the certificate, and what's been patched since?</li></ul><p>And it still has to fit your architecture and pass your own risk assessment and authorization. Evaluation is evidence, not a decision.</p>`,
      ru: `<p>Он говорит, что лаборатория проверила <b>конкретную версию и конфигурацию</b> (TOE) на соответствие собственному <b>заданию по безопасности</b> производителя с глубиной EAL4. Всё же проверьте:</p><ul><li>Покрывают ли ST или профиль защиты угрозы, важные <b>вам</b>?</li><li>Та ли версия покупается, что оценивалась, и настроена ли она в оценённой конфигурации?</li><li>Сколько лет сертификату и что с тех пор исправляли?</li></ul><p>И продукт всё равно должен вписаться в вашу архитектуру и пройти вашу оценку рисков и авторизацию. Оценка — это свидетельство, а не решение.</p>`,
    },
    take: { en: `A certificate covers one configuration against the vendor's claims, not your environment.`, ru: `Сертификат покрывает одну конфигурацию и заявления производителя, а не вашу среду.` } },

  { id: 's07-053', kind: 'idea', k: ['d3-c3', 'd1-c10'], lvl: 2,
    title: { en: `Certification vs accreditation`, ru: `Сертификация и аккредитация` },
    body: {
      en: `<p>Two steps that are easy to mix up:</p><ul><li><b>Certification</b> is technical. Assessors test the system's controls: are they in place, working, and producing the intended result? The output is a report with findings.</li><li><b>Accreditation</b>, now usually called <b>authorization</b>, is a management decision. A senior official, the <b>authorizing official</b>, reads the findings, weighs the remaining risk against the mission, and formally accepts it by signing an <b>authorization to operate</b> (ATO). Or refuses.</li></ul><p>The security team gives evidence; management owns the risk.</p>`,
      ru: `<p>Два шага, которые легко спутать:</p><ul><li><b>Сертификация</b> — техническая. Оценщики проверяют меры защиты системы: внедрены ли, работают ли, дают ли нужный результат? Итог — отчёт с замечаниями.</li><li><b>Аккредитация</b>, сейчас обычно называемая <b>авторизацией</b>, — решение руководства. Ответственное должностное лицо (<b>authorizing official</b>) читает замечания, взвешивает остаточный риск против задач организации и официально принимает его, подписывая <b>разрешение на эксплуатацию</b> (ATO). Или отказывает.</li></ul><p>Команда безопасности даёт свидетельства; риск принадлежит руководству.</p>`,
    },
    take: { en: `Certification tests the controls; accreditation is management accepting the risk.`, ru: `Сертификация проверяет меры; аккредитация — руководство принимает риск.` } },

  { id: 's07-054', kind: 'back', back: 's01-044', k: ['d1-c10', 'd3-c3'], lvl: 2,
    title: { en: `The RMF loop from stage 1, step by step`, ru: `Цикл RMF с этапа 1, шаг за шагом` },
    body: {
      en: `<p>In stage 1, the NIST Risk Management Framework was a shape: a loop, not a project. Now each step has meaning:</p><ol><li><b>Prepare</b>: roles, risk strategy, context.</li><li><b>Categorize</b>: how bad would a loss of C, I or A be? Low, moderate or high (FIPS 199).</li><li><b>Select</b> controls from a baseline (SP 800-53) and tailor them.</li><li><b>Implement</b> and document them.</li><li><b>Assess</b>: do they work? (certification)</li><li><b>Authorize</b>: an official accepts the risk (accreditation).</li><li><b>Monitor</b> continuously, and loop back.</li></ol>`,
      ru: `<p>На этапе 1 NIST Risk Management Framework был формой: цикл, а не проект. Теперь у каждого шага есть смысл:</p><ol><li><b>Подготовка</b>: роли, стратегия риска, контекст.</li><li><b>Категоризация</b>: насколько тяжела потеря C, I или A? Низкая, средняя или высокая (FIPS 199).</li><li><b>Выбор</b> мер из базового набора (SP 800-53) и их адаптация.</li><li><b>Внедрение</b> и документирование.</li><li><b>Оценка</b>: работают ли меры? (сертификация)</li><li><b>Авторизация</b>: должностное лицо принимает риск (аккредитация).</li><li><b>Мониторинг</b> постоянно — и снова к началу.</li></ol>`,
    },
    take: { en: `Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor.`, ru: `Подготовка, категоризация, выбор, внедрение, оценка, авторизация, мониторинг.` } },

  { id: 's07-055', kind: 'picture', k: ['d1-c10', 'd3-c3'], lvl: 2,
    title: { en: `The RMF as a cycle`, ru: `RMF как цикл` },
    body: {
      en: `<p>Prepare sits in the middle because it sets the context for everything else. The other six go round and round: monitoring finds changes, and changes send the system back to categorize or select again. Mnemonic for the order: "<b>P</b>eople <b>C</b>an't <b>S</b>top <b>I</b>nternet <b>A</b>ttacks <b>A</b>ll <b>M</b>onth".</p>`,
      ru: `<p>Подготовка стоит в центре: она задаёт контекст для всего остального. Шесть других шагов идут по кругу: мониторинг находит изменения, а изменения возвращают систему к категоризации или выбору мер. Английская подсказка для порядка: «<b>P</b>eople <b>C</b>an't <b>S</b>top <b>I</b>nternet <b>A</b>ttacks <b>A</b>ll <b>M</b>onth».</p>`,
    },
    dg: { title: { en: `NIST RMF (SP 800-37)`, ru: `NIST RMF (SP 800-37)` }, h: 300,
      nodes: [
        ['p', 380, 155, { en: 'Prepare', ru: 'Подготовка' }, { en: 'context, roles, risk strategy', ru: 'контекст, роли, стратегия риска' }, '🧭', 'key'],
        ['c', 140, 80, { en: 'Categorize', ru: 'Категоризация' }, { en: 'FIPS 199: low, moderate, high', ru: 'FIPS 199: низкая, средняя, высокая' }, null, 'ok'],
        ['s', 380, 45, { en: 'Select', ru: 'Выбор мер' }, { en: 'SP 800-53 baseline, tailor', ru: 'базовый набор SP 800-53' }, null, 'ok'],
        ['i', 620, 80, { en: 'Implement', ru: 'Внедрение' }, { en: 'build and document', ru: 'внедрить и описать' }, null, 'ok'],
        ['a', 620, 230, { en: 'Assess', ru: 'Оценка' }, { en: 'do the controls work?', ru: 'работают ли меры?' }, null, 'ok'],
        ['z', 380, 265, { en: 'Authorize', ru: 'Авторизация' }, { en: 'an official accepts the risk', ru: 'должностное лицо принимает риск' }, '✍', 'key'],
        ['m', 140, 230, { en: 'Monitor', ru: 'Мониторинг' }, { en: 'continuously, feed back', ru: 'постоянно, с обратной связью' }, null, 'ok'],
      ],
      edges: [['p', 'c', null, 'dash'], ['c', 's', null, 'ok'], ['s', 'i', null, 'ok'], ['i', 'a', null, 'ok'], ['a', 'z', null, 'ok'], ['z', 'm', null, 'ok'], ['m', 'c', null, 'ok']],
      note: { en: 'Assess is certification; Authorize is accreditation.', ru: 'Оценка — это сертификация; авторизация — аккредитация.' } },
    take: { en: `Assess, then authorize, then keep monitoring: the loop never closes for good.`, ru: `Оценить, авторизовать, продолжать наблюдать: цикл не замыкается навсегда.` } },

  { id: 's07-056', kind: 'back', back: 's03-021', k: ['d2-c6', 'd1-c10'], lvl: 2,
    title: { en: `Scoping and tailoring again: the Select step`, ru: `Снова scoping и tailoring: шаг выбора мер` },
    body: {
      en: `<p>In stage 3, you started from a baseline, removed what didn't apply (scoping) and adjusted the rest (tailoring). That's exactly the RMF's <b>Select</b> step.</p><p>The categorization picks the baseline: a system rated <b>moderate</b> starts from the moderate set in SP 800-53. Then you scope and tailor, and where a control can't be used, you choose a <b>compensating control</b> that reduces the same risk another way, and write down why. The authorizing official will read those decisions before signing.</p>`,
      ru: `<p>На этапе 3 вы начинали с базового набора, убирали неприменимое (scoping) и подстраивали остальное (tailoring). Это и есть шаг <b>выбора мер</b> в RMF.</p><p>Категоризация определяет базовый набор: система со <b>средней</b> категорией начинает со среднего набора SP 800-53. Затем вы сужаете и адаптируете, а где меру применить нельзя, выбираете <b>компенсирующую меру</b>, которая снижает тот же риск иначе, и записываете почему. Ответственное лицо прочитает эти решения перед подписью.</p>`,
    },
    take: { en: `The category picks the baseline; tailoring and compensating controls make it fit.`, ru: `Категория выбирает базовый набор; адаптация и компенсирующие меры подгоняют его.` } },

  { id: 's07-057', kind: 'idea', k: ['d3-c13'], lvl: 1,
    title: { en: `The system lifecycle: security at every phase`, ru: `Жизненный цикл системы: безопасность на каждом этапе` },
    body: {
      en: `<p>Standards such as ISO/IEC/IEEE 15288 and NIST SP 800-160 describe a system's life from idea to disposal: <b>requirements, design, development, verification, deployment, operations and maintenance, retirement</b>.</p><p>Security engineering means each phase has its security work. Requirements include security needs and a threat model. Design applies the principles. Building means secure configuration and hardening. Verification tests the controls. Deployment ends with authorization. Operations brings patching, monitoring and change control. Retirement means sanitizing data and revoking access. Skipping a phase doesn't save the work; it moves it later, at a higher price.</p>`,
      ru: `<p>Стандарты вроде ISO/IEC/IEEE 15288 и NIST SP 800-160 описывают жизнь системы от идеи до утилизации: <b>требования, проектирование, разработка, проверка, развёртывание, эксплуатация и сопровождение, вывод из эксплуатации</b>.</p><p>Инженерия безопасности означает, что у каждого этапа своя работа по защите. В требованиях — потребности безопасности и модель угроз. В проекте — принципы. При создании — безопасная настройка и харднинг. При проверке — тестирование мер. Развёртывание завершается авторизацией. В эксплуатации — патчи, мониторинг и управление изменениями. При выводе — очистка данных и отзыв доступа. Пропуск этапа не экономит работу, а переносит её на потом, по более высокой цене.</p>`,
    },
    take: { en: `Every lifecycle phase has its own security work; none can be skipped for free.`, ru: `У каждого этапа жизненного цикла своя работа по защите; бесплатно не пропустить ни один.` } },

  { id: 's07-058', kind: 'picture', k: ['d3-c13'], lvl: 1,
    title: { en: `What security does in each phase`, ru: `Что делает безопасность на каждом этапе` },
    body: {
      en: `<p>Read the arrows as the life of one system. The dashed line back from operations is the part people forget: changes and new threats send you back to requirements, and the cycle repeats until the system is retired.</p>`,
      ru: `<p>Читайте стрелки как жизнь одной системы. Пунктир из эксплуатации назад — то, о чём забывают: изменения и новые угрозы возвращают к требованиям, и цикл повторяется, пока систему не выведут из эксплуатации.</p>`,
    },
    dg: { title: { en: `Lifecycle with its security work`, ru: `Жизненный цикл и работа по защите` }, h: 300,
      nodes: [
        ['r', 140, 55, { en: 'Requirements', ru: 'Требования' }, { en: 'security needs, threat model', ru: 'требования, модель угроз' }, '📋', 'key'],
        ['d', 380, 55, { en: 'Design', ru: 'Проектирование' }, { en: 'secure architecture', ru: 'защищённая архитектура' }, '📐', 'ok'],
        ['b', 620, 55, { en: 'Development', ru: 'Разработка' }, { en: 'secure coding, hardening', ru: 'безопасный код, харднинг' }, '🔧', 'ok'],
        ['v', 620, 160, { en: 'Verification', ru: 'Проверка' }, { en: 'testing and assessment', ru: 'тестирование и оценка' }, '🔍', 'ok'],
        ['dep', 380, 160, { en: 'Deployment', ru: 'Развёртывание' }, { en: 'authorization, secure config', ru: 'авторизация, настройка' }, '🚀', 'key'],
        ['op', 140, 160, { en: 'Operations', ru: 'Эксплуатация' }, { en: 'patch, monitor, change control', ru: 'патчи, мониторинг, изменения' }, '⚙', 'ok'],
        ['ret', 380, 260, { en: 'Retirement', ru: 'Вывод из эксплуатации' }, { en: 'sanitize, revoke, update inventory', ru: 'очистка, отзыв доступа, учёт' }, '🗑', 'dim'],
      ],
      edges: [['r', 'd', null, 'ok'], ['d', 'b', null, 'ok'], ['b', 'v', null, 'ok'], ['v', 'dep', null, 'ok'], ['dep', 'op', null, 'ok'], ['op', 'r', { en: 'changes', ru: 'изменения' }, 'dash'], ['op', 'ret', null, 'ok']],
      note: { en: 'Security work is in every box, not only in "Verification".', ru: 'Работа по защите есть в каждом блоке, а не только в «Проверке».' } },
    take: { en: `Security runs through the whole lifecycle, and loops back with every change.`, ru: `Безопасность проходит через весь цикл и возвращается с каждым изменением.` } },

  { id: 's07-059', kind: 'think', k: ['d3-c13', 'd3-c3', 'd1-c10'], lvl: 3,
    title: { en: `Launch tomorrow, three high findings today`, ru: `Запуск завтра, три серьёзных замечания сегодня` },
    body: {
      en: `<p>A new customer portal goes live tomorrow; marketing has already announced it. Today the security assessment came back with three <b>high</b> findings. The project manager asks you, the security lead, to "sign it off" so the launch isn't blocked, and promises the fixes next month.</p><p>What do you do?</p>`,
      ru: `<p>Новый клиентский портал запускается завтра, маркетинг уже объявил об этом. Сегодня пришла оценка безопасности с тремя <b>высокими</b> замечаниями. Руководитель проекта просит вас, руководителя по безопасности, «подписать», чтобы не сорвать запуск, и обещает исправить всё в следующем месяце.</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p>Accepting the risk isn't your decision to make, and refusing to talk isn't either. Your job is to make the risk clear to the person who owns it.</p><ul><li>Explain each finding in business terms: what could happen, how likely it is, what it would cost.</li><li>Offer options: fix, delay, launch with compensating controls (for example, disable the risky feature), or launch with documented acceptance and a dated plan of action.</li><li>The <b>authorizing official</b> or business owner decides and signs.</li></ul><p>Whatever they choose, it's on record, with owners and deadlines for the fixes.</p>`,
      ru: `<p>Принимать риск — не ваше решение, и отказываться от разговора — тоже. Ваша задача — сделать риск понятным тому, кому он принадлежит.</p><ul><li>Объясните каждое замечание языком бизнеса: что может случиться, насколько вероятно, сколько будет стоить.</li><li>Предложите варианты: исправить, отложить, запуститься с компенсирующими мерами (например, отключив рискованную функцию) или запуститься с задокументированным принятием риска и планом исправлений с датами.</li><li>Решает и подписывает <b>ответственное должностное лицо</b> или владелец бизнеса.</li></ul><p>Что бы ни выбрали, это записано, с ответственными и сроками исправлений.</p>`,
    },
    take: { en: `Security informs the decision; the risk owner makes it and signs it.`, ru: `Безопасность готовит решение; владелец риска принимает и подписывает его.` } },

  { id: 's07-060', kind: 'back', back: 's05-029', k: ['d4-c8', 'd4-c4', 'd3-c1'], lvl: 2,
    title: { en: `Segmentation is decided on the drawing board`, ru: `Сегментацию решают на чертеже` },
    body: {
      en: `<p>In stage 5, the flat network let Target's attackers walk from a vendor portal to the checkout lanes. Segmenting a running, flat network later is painful: every application's traffic has to be discovered, mapped and allowed one rule at a time, and something always breaks.</p><p>That's why segmentation is an architecture decision. When a system is designed, the threat model already shows its trust boundaries; the zones, firewall rules and allowed flows are drawn then, alongside the data flow diagram. Building them in from day one costs a meeting; adding them after a breach costs months.</p>`,
      ru: `<p>На этапе 5 плоская сеть позволила атакующим Target пройти от портала подрядчика до касс. Сегментировать работающую плоскую сеть потом — мучение: трафик каждого приложения нужно найти, описать и разрешить правилом за правилом, и что-нибудь обязательно сломается.</p><p>Поэтому сегментация — решение архитектуры. Когда систему проектируют, модель угроз уже показывает её границы доверия; зоны, правила экранов и разрешённые потоки рисуют тогда же, рядом с диаграммой потоков данных. Заложить их с первого дня стоит одной встречи; добавить после взлома — месяцев.</p>`,
    },
    take: { en: `Draw the zones when you draw the system.`, ru: `Рисуйте зоны, когда рисуете систему.` } },

  { id: 's07-061', kind: 'back', back: 's04-029', k: ['d5-c3', 'd3-c4'], lvl: 3,
    title: { en: `RBAC again: one place to decide`, ru: `Снова RBAC: одно место для решений` },
    body: {
      en: `<p>In stage 4, roles carried permissions. In a large system, the architecture question is: where is "may this role do this?" answered?</p><p>If every application checks in its own code, the rules drift apart and nobody can review them. A better design separates a <b>policy decision point</b> (one service that holds the rules and answers yes or no) from <b>policy enforcement points</b> (each application asks and obeys). It's the reference monitor again, scaled up to a whole company: always invoked, in one place, small enough to review.</p>`,
      ru: `<p>На этапе 4 роли несли разрешения. В большой системе вопрос архитектуры: где отвечают на вопрос «может ли эта роль это сделать?»</p><p>Если каждое приложение проверяет это в своём коде, правила расходятся и проверить их никто не может. Лучше разделить <b>точку принятия решений</b> (один сервис, который хранит правила и отвечает «да» или «нет») и <b>точки применения</b> (каждое приложение спрашивает и подчиняется). Это снова монитор обращений, увеличенный до масштаба компании: вызывается всегда, в одном месте, достаточно мал для проверки.</p>`,
    },
    take: { en: `Decide access in one place, enforce it everywhere.`, ru: `Решать о доступе в одном месте, применять везде.` } },

  { id: 's07-062', kind: 'idea', k: ['d3-c1', 'd4-c4'], lvl: 2,
    title: { en: `SASE: the perimeter moves to the cloud`, ru: `SASE: периметр переезжает в облако` },
    body: {
      en: `<p>When staff work from home and applications live in SaaS, sending all traffic back through the head-office firewall makes little sense. <b>SASE</b> (secure access service edge) puts the security checks in the cloud, close to the user.</p><p>It combines <b>SD-WAN</b> (smart routing between sites and clouds) with cloud-delivered security: a secure web gateway, a CASB (stage 3), <b>zero trust network access</b> (ZTNA) instead of a classic VPN, and firewall as a service. The same policy applies wherever the user is.</p>`,
      ru: `<p>Когда сотрудники работают из дома, а приложения живут в SaaS, гонять весь трафик через межсетевой экран головного офиса мало смысла. <b>SASE</b> (secure access service edge) переносит проверки безопасности в облако, ближе к пользователю.</p><p>Это сочетание <b>SD-WAN</b> (умной маршрутизации между площадками и облаками) и облачных средств защиты: защищённого веб-шлюза, CASB (этап 3), <b>доступа к сети по нулевому доверию</b> (ZTNA) вместо классического VPN и межсетевого экрана как услуги. Одна политика действует, где бы пользователь ни был.</p>`,
    },
    take: { en: `SASE brings the security stack to the user instead of the user to the stack.`, ru: `SASE подносит защиту к пользователю, а не пользователя к защите.` } },

  { id: 's07-063', kind: 'think', k: ['d3-c13', 'd3-c1', 'd2-c7'], lvl: 3,
    title: { en: `The machine that can't be patched`, ru: `Машина, которую нельзя пропатчить` },
    body: {
      en: `<p>A hospital's MRI scanner is controlled by a PC running an operating system that went end-of-support years ago. The manufacturer won't certify the scanner with a newer system, and a new scanner costs millions and is two years away.</p><p>IT wants to unplug it from the network "until it's safe". What's a better answer?</p>`,
      ru: `<p>МРТ-сканер больницы управляется компьютером с операционной системой, поддержка которой закончилась много лет назад. Производитель не сертифицирует сканер с более новой системой, а новый сканер стоит миллионы и появится не раньше чем через два года.</p><p>IT хочет отключить его от сети, «пока не станет безопасно». Какой ответ лучше?</p>`,
    },
    reveal: {
      en: `<p>Unplugging it may stop doctors getting images to the people who need them, and patient care comes first. Instead, contain the risk around the device:</p><ul><li><b>Isolate</b> it in its own segment, allowing only the flows it needs (to the imaging archive), and nothing to the internet.</li><li>Add <b>compensating controls</b>: application allow-listing, no email or browsing on it, monitoring of its traffic, restricted physical access.</li><li>Have the business owner <b>formally accept</b> the remaining risk, and put replacement on the plan with a date.</li></ul>`,
      ru: `<p>Отключение может помешать врачам передавать снимки тем, кому они нужны, а забота о пациентах важнее. Лучше ограничить риск вокруг устройства:</p><ul><li><b>Изолировать</b> его в отдельном сегменте, разрешив только нужные потоки (в архив снимков) и ничего в интернет.</li><li>Добавить <b>компенсирующие меры</b>: белый список приложений, никакой почты и браузера на нём, мониторинг трафика, ограниченный физический доступ.</li><li>Владелец бизнеса <b>официально принимает</b> остаточный риск, а замена ставится в план с датой.</li></ul>`,
    },
    take: { en: `When you can't patch, isolate, compensate, accept formally and plan the replacement.`, ru: `Если пропатчить нельзя — изолируйте, компенсируйте, примите риск официально и планируйте замену.` } },

  { id: 's07-064', kind: 'idea', k: ['d3-c13', 'd2-c5'], lvl: 2,
    title: { en: `Retiring a system without leaving doors open`, ru: `Вывести систему, не оставив открытых дверей` },
    body: {
      en: `<p>Old systems rarely get switched off cleanly. They linger: a forgotten server still answering on the network, a service account still working, a certificate still valid, a backup still holding customer data.</p><p>A proper <b>retirement</b> plan: migrate or archive the data the business still needs, under its retention rules (stage 3); <b>sanitize</b> the media; disable accounts, API keys and firewall rules; revoke certificates; remove DNS entries; and update the asset inventory. Each leftover is an unwatched door, often with old, unpatched software behind it.</p>`,
      ru: `<p>Старые системы редко выключают чисто. Они остаются: забытый сервер всё ещё отвечает в сети, служебная учётная запись работает, сертификат действителен, резервная копия хранит данные клиентов.</p><p>Правильный <b>вывод из эксплуатации</b>: перенести или заархивировать нужные бизнесу данные по правилам хранения (этап 3); <b>очистить</b> носители; отключить учётные записи, ключи API и правила экранов; отозвать сертификаты; удалить записи DNS; обновить реестр активов. Каждый остаток — дверь без присмотра, часто со старым непропатченным ПО за ней.</p>`,
    },
    take: { en: `Decommissioning is a security task: data, accounts, keys, rules, inventory.`, ru: `Вывод из эксплуатации — задача безопасности: данные, учётки, ключи, правила, учёт.` } },

  { id: 's07-065', kind: 'vs', k: ['d3-c1'], lvl: 2,
    title: { en: `Trust but verify vs zero trust vs defense in depth`, ru: `«Доверяй, но проверяй», нулевое доверие, эшелонированная защита` },
    body: {
      en: `<ul><li><b>Trust but verify</b>: the old perimeter model. Check people at the edge, then trust whatever is inside the network. One stolen VPN login, and the attacker is "inside".</li><li><b>Zero trust</b>: never trust because of location; authenticate, authorize and re-check every request, everywhere.</li><li><b>Defense in depth</b>: layer several independent controls so one failure isn't fatal.</li></ul><p>They aren't rivals. Zero trust replaces trust-but-verify, and defense in depth applies to both: a zero trust design still needs layers behind each decision.</p>`,
      ru: `<ul><li><b>«Доверяй, но проверяй»</b>: старая модель периметра. Людей проверяют на границе, а всему внутри сети доверяют. Один украденный логин VPN — и атакующий «внутри».</li><li><b>Нулевое доверие</b>: никогда не доверять из-за расположения; аутентифицировать, авторизовать и перепроверять каждый запрос везде.</li><li><b>Эшелонированная защита</b>: несколько независимых слоёв, чтобы отказ одного не был фатальным.</li></ul><p>Это не соперники. Нулевое доверие заменяет «доверяй, но проверяй», а эшелонированная защита применима к обоим: даже за каждым решением нулевого доверия нужны слои.</p>`,
    },
    take: { en: `Zero trust replaces the trusted inside; defense in depth layers everything.`, ru: `Нулевое доверие отменяет «доверенное внутри»; эшелонированная защита наслаивает всё.` } },

  { id: 's07-066', kind: 'link', k: ['d1-c12', 'd3-c1', 'd3-c2', 'd3-c4', 'd3-c3', 'd3-c13'], lvl: 2,
    title: { en: `A new payroll system, start to finish`, ru: `Новая система расчёта зарплаты от начала до конца` },
    body: {
      en: `<p>Follow one system through the whole stage:</p><ol><li><b>Threat model</b> the design: the top worries are fraud (tampering) and salary leaks (disclosure).</li><li>Apply <b>principles</b>: least privilege, deny by default, fail securely, separate segment.</li><li>Fraud is an integrity problem: <b>Clark-Wilson</b>. Pay changes only through approved transactions, entered by one person and approved by another.</li><li>Run it on hardened hosts with a <b>TPM</b> and secure boot, with keys in an HSM.</li><li>Prefer components with a relevant <b>Common Criteria</b> evaluation.</li><li>Assess the controls, and the finance director <b>authorizes</b> it.</li><li>Then patch, monitor and, one day, retire it cleanly.</li></ol>`,
      ru: `<p>Проследим одну систему через весь этап:</p><ol><li><b>Моделирование угроз</b>: главные опасения — мошенничество (искажение) и утечка зарплат (раскрытие).</li><li>Применяем <b>принципы</b>: минимальные привилегии, запрет по умолчанию, безопасный отказ, отдельный сегмент.</li><li>Мошенничество — задача целостности: <b>Кларк — Вилсон</b>. Зарплата меняется только через утверждённые транзакции: вводит один, утверждает другой.</li><li>Работает на укреплённых хостах с <b>TPM</b> и безопасной загрузкой, ключи в HSM.</li><li>Предпочитаем компоненты с подходящей оценкой по <b>Общим критериям</b>.</li><li>Меры оценены, финансовый директор <b>авторизует</b> систему.</li><li>Дальше патчи, мониторинг и однажды — чистый вывод из эксплуатации.</li></ol>`,
    },
    take: { en: `Secure systems come from a chain of decisions, each made early and on purpose.`, ru: `Защищённые системы — это цепочка решений, принятых рано и осознанно.` } },

  { id: 's07-067', kind: 'think', k: ['d1-c12', 'd3-c13'], lvl: 2,
    title: { en: `What comes first?`, ru: `Что сначала?` },
    body: {
      en: `<p>A startup is about to build a platform that will store medical records. The CTO has budget for one security activity this month and lists three options:</p><ul><li>buy an HSM for the encryption keys;</li><li>hire a firm to run a penetration test;</li><li>run a threat-modeling workshop on the design.</li></ul><p>Which comes first, and why?</p>`,
      ru: `<p>Стартап собирается строить платформу для хранения медицинских карт. У технического директора бюджет на одно мероприятие по безопасности в этом месяце, и он называет три варианта:</p><ul><li>купить HSM для ключей шифрования;</li><li>нанять компанию для теста на проникновение;</li><li>провести воркшоп по моделированию угроз для проекта.</li></ul><p>Что сначала и почему?</p>`,
    },
    reveal: {
      en: `<p><b>The threat-modeling workshop.</b> Nothing is built yet, so there's nothing to pentest, and buying an HSM before you know your threats and requirements is choosing a control before understanding the problem.</p><p>The threat model will show which data and flows matter most, which in turn tells you whether you need an HSM, what to test later, and which regulations (such as health-data laws) apply. On the exam, as in life: understand and assess first, then pick technology.</p>`,
      ru: `<p><b>Воркшоп по моделированию угроз.</b> Ещё ничего не построено, так что тестировать на проникновение нечего, а покупать HSM, не зная угроз и требований, — значит выбирать меру, не поняв проблему.</p><p>Модель угроз покажет, какие данные и потоки важнее всего, а значит, нужен ли HSM, что тестировать потом и какие нормы (например, законы о медицинских данных) применимы. На экзамене, как и в жизни: сначала понять и оценить, потом выбирать технологию.</p>`,
    },
    take: { en: `Understand the threats before you buy the controls.`, ru: `Сначала поймите угрозы, потом покупайте меры.` } },

  { id: 's07-068', kind: 'recap', lvl: 1,
    title: { en: `Stage 7 in seven lines`, ru: `Этап 7 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s07-005', { en: `Threat-model early: STRIDE names threats by the property they break.`, ru: `Моделируйте угрозы рано: STRIDE называет угрозы по нарушаемому свойству.` }],
      ['s07-010', { en: `Fail-secure protects assets, fail-safe protects people; people come first.`, ru: `Fail-secure защищает активы, fail-safe — людей; люди важнее.` }],
      ['s07-016', { en: `Bell-LaPadula: no read up, no write down. Biba is its integrity mirror.`, ru: `Белл — Лападула: не читать вверх, не писать вниз. Биба — зеркало для целостности.` }],
      ['s07-022', { en: `The reference monitor: tamper-proof, always invoked, small enough to verify.`, ru: `Монитор обращений: защищён, вызывается всегда, достаточно мал для проверки.` }],
      ['s07-041', { en: `In every cloud model, your data and access are your job.`, ru: `В любой облачной модели ваши данные и доступ — ваша забота.` }],
      ['s07-050', { en: `EAL measures how hard they checked, not how strong it is.`, ru: `EAL измеряет тщательность проверки, а не силу защиты.` }],
      ['s07-055', { en: `RMF: assess is certification, authorize is management accepting the risk.`, ru: `RMF: оценка — сертификация, авторизация — руководство принимает риск.` }],
    ],
    take: { en: `Next: buildings, power and people safety, the physical layer under all of this.`, ru: `Дальше: здания, питание и безопасность людей — физический слой под всем этим.` } },
] });
