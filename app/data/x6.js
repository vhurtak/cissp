'use strict';
// Beginner layer for Domain 6: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(6, {
  'd6-c1': {
    plain: {
      en: `<p>Think of a car. A <b>test</b> checks one thing: do the brakes work? An <b>assessment</b> looks at the whole car and tells you what to fix. An <b>audit</b> is the official inspection against a rulebook, done by someone independent, with a formal report. Tests can be internal (your own team), external (a firm you hire) or third-party (on behalf of someone else, like a customer or regulator).</p>`,
      ru: `<p>Представьте автомобиль. <b>Тест</b> проверяет одно: работают ли тормоза? <b>Оценка</b> осматривает машину целиком и говорит, что починить. <b>Аудит</b> — официальный техосмотр по своду правил, проводимый независимым лицом, с формальным отчётом. Проверки бывают внутренние (своя команда), внешние (нанятая фирма) и третьей стороны (по поручению кого-то другого, например клиента или регулятора).</p>`,
    },
    ex: {
      en: `<p>A SaaS company runs a monthly failover test of its database (test), hires a consultancy for a yearly security assessment of its cloud setup, and has an accredited auditor issue an ISO 27001 certificate. Its biggest customer, a bank, also sends its own third-party assessor, because the bank's regulator requires it to check its vendors.</p>`,
      ru: `<p>SaaS-компания ежемесячно тестирует переключение базы данных (тест), раз в год нанимает консультантов для оценки безопасности облачной инфраструктуры и получает сертификат ISO 27001 от аккредитованного аудитора. Крупнейший клиент, банк, присылает ещё и своего оценщика третьей стороны, потому что регулятор банка требует проверять поставщиков.</p>`,
    },
  },
  'd6-c2': {
    plain: {
      en: `<p>A vulnerability scan is a building inspector with a checklist walking past every door and window, noting which locks are known to be weak. It doesn't try to break in. <b>Credentialed</b> scans get the keys and look inside, so they are more accurate. <b>CVE</b> gives every known flaw an ID, <b>CVSS</b> scores how severe it is (0–10), and <b>SCAP</b> is the set of standards that lets tools speak the same language.</p>`,
      ru: `<p>Сканирование уязвимостей — инспектор с чек-листом, который обходит все двери и окна и отмечает, какие замки известны как слабые. Взломать он не пытается. <b>Сканирование с учётными данными</b> получает ключи и смотрит внутри, поэтому оно точнее. <b>CVE</b> присваивает каждой известной уязвимости номер, <b>CVSS</b> оценивает её серьёзность (0–10), а <b>SCAP</b> — набор стандартов, позволяющий инструментам говорить на одном языке.</p>`,
    },
    ex: {
      en: `<p>In December 2021 Log4Shell (CVE-2021-44228, CVSS 10.0) hit the Java logging library Log4j. Companies with a current asset inventory and weekly authenticated scans knew within a day which of their servers were exposed. Others spent weeks just finding where Log4j was hidden inside their software.</p>`,
      ru: `<p>В декабре 2021 года уязвимость Log4Shell (CVE-2021-44228, CVSS 10.0) поразила Java-библиотеку логирования Log4j. Компании с актуальной инвентаризацией и еженедельным сканированием с учётными данными за сутки знали, какие серверы уязвимы. Другие неделями просто искали, где Log4j спрятан внутри их ПО.</p>`,
    },
  },
  'd6-c3': {
    plain: {
      en: `<p>A penetration test is hiring a professional burglar to actually try to break in, with written permission, and tell you how far they got. It goes further than a scan: it chains weaknesses together to show real impact. Testers may know nothing in advance (<b>black box</b>), a little (<b>gray box</b>) or everything (<b>white box</b>). Without signed authorization and agreed rules of engagement, it is simply a crime.</p>`,
      ru: `<p>Тест на проникновение — нанять профессионального взломщика, чтобы он по-настоящему попытался проникнуть, с письменного разрешения, и рассказал, как далеко зашёл. Это глубже сканирования: слабости связываются в цепочку, чтобы показать реальный ущерб. Тестировщики могут ничего не знать заранее (<b>чёрный ящик</b>), знать немного (<b>серый ящик</b>) или всё (<b>белый ящик</b>). Без подписанного разрешения и согласованных правил это просто преступление.</p>`,
    },
    ex: {
      en: `<p>A scan of a retailer reports 300 "medium" findings. A two-week pentest then shows that three of them chained together (an exposed admin panel, a default password and an outdated plugin) give full access to the customer database. That one story gets the budget approved faster than the 300-line scan report ever did.</p>`,
      ru: `<p>Сканирование ритейлера выдаёт 300 «средних» находок. Двухнедельный пентест показывает, что три из них в цепочке (открытая админ-панель, пароль по умолчанию и устаревший плагин) дают полный доступ к базе клиентов. Эта одна история утверждает бюджет быстрее, чем отчёт сканера на 300 строк.</p>`,
    },
    dg: {
      title: { en: 'Vulnerability scan vs penetration test', ru: 'Сканирование уязвимостей и тест на проникновение' }, h: 270,
      zones: [[10, 30, 350, 225, { en: 'Scan: wide and shallow', ru: 'Сканирование: широко и неглубоко' }], [400, 30, 350, 225, { en: 'Pentest: narrow and deep', ru: 'Пентест: узко и глубоко' }, 'untrust']],
      nodes: [
        ['s1', 75, 90, 'Web', { en: '⚠ 12 findings', ru: '⚠ 12 находок' }, null, 'dim', 100], ['s2', 185, 90, 'VPN', { en: '⚠ 3', ru: '⚠ 3' }, null, 'dim', 100], ['s3', 295, 90, 'Mail', { en: '⚠ 5', ru: '⚠ 5' }, null, 'dim', 100],
        ['scan', 185, 200, { en: 'Scanner', ru: 'Сканер' }, { en: 'automated, frequent', ru: 'автомат., часто' }, '🔎', 'key'],
        ['p1', 480, 90, 'Web', { en: 'weak plugin', ru: 'слабый плагин' }, null, 'bad', 120], ['p2', 670, 90, { en: 'Admin', ru: 'Админка' }, { en: 'default password', ru: 'пароль по умолч.' }, null, 'bad', 140],
        ['p3', 670, 200, { en: 'Customer DB', ru: 'База клиентов' }, { en: 'data proven reachable', ru: 'данные доступны' }, '🗄', 'bad', 170],
        ['pt', 480, 200, { en: 'Pentester', ru: 'Пентестер' }, { en: 'manual, authorized', ru: 'вручную, с разреш.' }, '🦹', 'key'],
      ],
      edges: [['scan', 's1', null, 'dash'], ['scan', 's2', null, 'dash'], ['scan', 's3', null, 'dash'], ['pt', 'p1', '1', 'bad'], ['p1', 'p2', '2', 'bad'], ['p2', 'p3', '3', 'bad']],
      note: { en: 'Scans find many possible weaknesses and are run often; pentests prove which ones lead to real impact and need written authorization and scope.', ru: 'Сканы находят много возможных слабостей и запускаются часто; пентест доказывает, какие из них ведут к реальному ущербу, и требует письменного разрешения и границ.' },
    },
  },
  'd6-c4': {
    plain: {
      en: `<p>Software can be checked in different ways at different times. <b>SAST</b> reads the code without running it, like proofreading a recipe. <b>DAST</b> attacks the running application from outside, like tasting the dish. <b>SCA</b> (software composition analysis) checks the third-party libraries you use for known flaws, like checking ingredients for recalls. <b>Fuzzing</b> throws huge amounts of random, broken input at a program to see what makes it crash.</p>`,
      ru: `<p>ПО можно проверять разными способами в разное время. <b>SAST</b> читает код, не запуская его, как вычитка рецепта. <b>DAST</b> атакует работающее приложение снаружи, как дегустация блюда. <b>SCA</b> (анализ состава ПО) проверяет используемые сторонние библиотеки на известные уязвимости, как проверка продуктов на отзыв с рынка. <b>Фаззинг</b> бросает в программу огромные объёмы случайного испорченного ввода и смотрит, от чего она падает.</p>`,
    },
    ex: {
      en: `<p>A fintech team adds SAST and SCA to every pull request, so a developer sees "SQL injection risk on line 42" and "this library version has a critical CVE" before merging. Nightly DAST scans hit the staging site. Google's OSS-Fuzz project has used fuzzing to find over 10,000 vulnerabilities in open-source software that code reviews had missed.</p>`,
      ru: `<p>Команда финтеха добавляет SAST и SCA к каждому pull request, и разработчик ещё до слияния видит «риск SQL-инъекции в строке 42» и «у этой версии библиотеки критическая CVE». Ночные проверки DAST атакуют тестовый стенд. Проект Google OSS-Fuzz с помощью фаззинга нашёл более 10 000 уязвимостей в открытом ПО, пропущенных при ревью кода.</p>`,
    },
    dg: {
      title: { en: 'Where each kind of testing sits in the pipeline', ru: 'Где в конвейере стоит каждый вид тестирования' }, h: 200,
      nodes: [
        ['code', 75, 40, { en: 'Code', ru: 'Код' }, null, '✍️', null, 100],
        ['build', 245, 40, { en: 'Build', ru: 'Сборка' }, null, '⚙️', null, 110],
        ['test', 425, 40, { en: 'Test / staging', ru: 'Тест / стенд' }, null, '🧪', null, 150],
        ['prod', 640, 40, 'Production', null, '🚀', 'ok', 140],
        ['sast', 75, 150, 'SAST', { en: 'reads source', ru: 'читает код' }, null, 'key', 110],
        ['sca', 245, 150, 'SCA', { en: 'checks libraries', ru: 'проверяет библ.' }, null, 'key', 130],
        ['dast', 425, 150, 'DAST + fuzzing', { en: 'attacks the running app', ru: 'атакует работающее прил.' }, null, 'key', 170],
        ['mon', 640, 150, { en: 'Pentest, bug bounty', ru: 'Пентест, баг-баунти' }, { en: 'real environment', ru: 'реальная среда' }, null, 'key', 170],
      ],
      edges: [['code', 'build'], ['build', 'test'], ['test', 'prod'], ['sast', 'code', null, 'dash'], ['sca', 'build', null, 'dash'], ['dast', 'test', null, 'dash'], ['mon', 'prod', null, 'dash']],
      note: { en: 'Static tests run early and cheaply but miss runtime and configuration issues; dynamic tests find those but only later. Use both.', ru: 'Статические проверки идут рано и дёшево, но не видят проблем исполнения и конфигурации; динамические их находят, но позже. Нужны обе.' },
    },
  },
  'd6-c5': {
    plain: {
      en: `<p>To know whether security works, you need data. Logs from everything flow into a <b>SIEM</b>, which turns millions of events into a few alerts and charts. Management doesn't want logs, though; they want numbers. A <b>KPI</b> (key performance indicator) says how well a process works ("95% of critical patches applied within 14 days"). A <b>KRI</b> (key risk indicator) warns that risk is rising ("unpatched internet-facing servers: 12, up from 3").</p>`,
      ru: `<p>Чтобы знать, работает ли безопасность, нужны данные. Журналы со всего попадают в <b>SIEM</b>, который превращает миллионы событий в несколько оповещений и графиков. Но руководству нужны не логи, а цифры. <b>KPI</b> (ключевой показатель эффективности) говорит, насколько хорошо работает процесс («95% критичных патчей установлено за 14 дней»). <b>KRI</b> (ключевой индикатор риска) предупреждает, что риск растёт («непропатченных серверов в интернете: 12, было 3»).</p>`,
    },
    ex: {
      en: `<p>A CISO's monthly board slide shows three KPIs (phishing report rate, patch time, MFA coverage) and two KRIs (exposed critical vulnerabilities, accounts with no owner). When "accounts with no owner" jumped after a merger, the board approved an identity-cleanup project the same meeting, because the trend was visible, not buried in logs.</p>`,
      ru: `<p>На ежемесячном слайде CISO для совета — три KPI (доля сообщённых фишинговых писем, срок установки патчей, охват MFA) и два KRI (открытые критичные уязвимости, учётки без владельца). Когда после слияния «учётки без владельца» резко выросли, совет одобрил проект по наведению порядка в учётках на том же заседании, потому что тренд был виден, а не похоронен в логах.</p>`,
    },
    dg: {
      title: { en: 'From raw logs to board-level indicators', ru: 'От сырых журналов к показателям для совета' }, h: 260,
      nodes: [
        ['l1', 80, 50, { en: 'Firewalls', ru: 'МЭ' }, null, '🧱', null, 130], ['l2', 80, 130, { en: 'Servers', ru: 'Серверы' }, null, '🖥', null, 130], ['l3', 80, 210, { en: 'Cloud, IdP', ru: 'Облако, IdP' }, null, '☁️', null, 130],
        ['siem', 320, 130, 'SIEM', { en: 'normalize, correlate', ru: 'нормализация, корреляция' }, '📊', 'key'],
        ['soc', 560, 65, { en: 'SOC alerts', ru: 'Оповещения SOC' }, { en: 'minutes', ru: 'минуты' }, '🚨'],
        ['dash', 560, 195, { en: 'KPI / KRI dashboard', ru: 'Панель KPI / KRI' }, { en: 'monthly trends', ru: 'месячные тренды' }, '📈', 'ok'],
        ['board', 700, 130, { en: 'Board', ru: 'Совет' }, null, '🏛', null, 90],
      ],
      edges: [['l1', 'siem'], ['l2', 'siem'], ['l3', 'siem'], ['siem', 'soc'], ['siem', 'dash'], ['dash', 'board', null, 'ok']],
      note: { en: 'Logs must be time-synchronized (NTP) and protected from tampering, or neither the alerts nor the metrics can be trusted.', ru: 'Журналы должны быть синхронизированы по времени (NTP) и защищены от изменения, иначе нельзя доверять ни оповещениям, ни метрикам.' },
    },
  },
  'd6-c6': {
    plain: {
      en: `<p>Finding problems is only half the job; the report decides whether anything gets fixed. Executives get a one-page summary in business terms (risk, money, deadlines); engineers get the technical detail. If a risk can't be fixed now, it becomes a documented <b>exception</b> with an owner and an expiry date. If you find a flaw in someone else's product, <b>responsible disclosure</b> means telling the vendor privately first and giving them time to patch.</p>`,
      ru: `<p>Найти проблемы — полдела; отчёт решает, будет ли что-то исправлено. Руководителям — сводка на страницу на языке бизнеса (риск, деньги, сроки); инженерам — технические детали. Если риск нельзя устранить сейчас, оформляется <b>исключение</b> с владельцем и сроком действия. Если вы нашли уязвимость в чужом продукте, <b>ответственное раскрытие</b> означает сначала сообщить производителю конфиденциально и дать время на патч.</p>`,
    },
    ex: {
      en: `<p>A researcher finds a flaw in a popular router and reports it privately. The vendor gets the industry-standard 90 days (the window Google Project Zero uses) to ship a fix before details are published. Inside a company, a legacy app that can't support MFA gets a signed exception for six months with compensating controls, and the exception appears on the risk register until it is closed.</p>`,
      ru: `<p>Исследователь находит уязвимость в популярном роутере и сообщает о ней конфиденциально. Производитель получает принятые в отрасли 90 дней (срок, который использует Google Project Zero), чтобы выпустить исправление до публикации деталей. Внутри компании старое приложение без поддержки MFA получает подписанное исключение на полгода с компенсирующими мерами, и оно висит в реестре рисков, пока не будет закрыто.</p>`,
    },
  },
  'd6-c7': {
    plain: {
      en: `<p>When you hand data to a cloud provider, you can't audit them yourself, so you read their auditor's report. <b>SOC 1</b> covers controls that affect customers' financial reporting. <b>SOC 2</b> covers security, availability, confidentiality, processing integrity and privacy; it is detailed and shared under NDA. <b>SOC 3</b> is the short public version. <b>Type I</b> says the controls were well designed on one day; <b>Type II</b> says they actually worked over a period (usually 6–12 months), which is far more valuable.</p>`,
      ru: `<p>Передав данные облачному провайдеру, вы не можете проверить его сами, поэтому читаете отчёт его аудитора. <b>SOC 1</b> — контроли, влияющие на финансовую отчётность клиентов. <b>SOC 2</b> — безопасность, доступность, конфиденциальность, целостность обработки и приватность; отчёт подробный и выдаётся под NDA. <b>SOC 3</b> — краткая публичная версия. <b>Type I</b> говорит, что контроли были хорошо спроектированы на одну дату; <b>Type II</b> — что они действительно работали в течение периода (обычно 6–12 месяцев), и это гораздо ценнее.</p>`,
    },
    ex: {
      en: `<p>Before choosing a payroll SaaS, a company's security team asks for the vendor's SOC 2 Type II report. They find one exception: quarterly access reviews were skipped twice. They accept the vendor but add a contract clause requiring the fix and a bridge letter covering the months since the audit period ended.</p>`,
      ru: `<p>Прежде чем выбрать SaaS для расчёта зарплаты, команда безопасности запрашивает отчёт SOC 2 Type II поставщика. В нём одно замечание: квартальные пересмотры доступа дважды пропускались. Поставщика принимают, но в договор добавляют пункт с требованием исправить это и «бридж-письмо» за месяцы после окончания аудиторского периода.</p>`,
    },
  },
});
