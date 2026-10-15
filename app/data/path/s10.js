'use strict';
// Learning path, stage 10: when things go wrong. Events vs incidents, the response plan and team, the NIST lifecycle
// and the seven ISC2 steps, malware families, containment, eradication and recovery, reporting and notification,
// lessons learned, investigation types, admissible evidence, chain of custody and forensics.
CISSP.stage(10, { cards: [
  { id: 's10-001', kind: 'story', k: ['d8-c8', 'd7-c4'], lvl: 1,
    title: { en: `WannaCry: a Friday in May 2017`, ru: `WannaCry: пятница в мае 2017 года` },
    body: {
      en: `<p>On Friday 12 May 2017, screens in hospitals, factories and offices around the world turned red: "Ooops, your files have been encrypted!" The ransom was $300 in bitcoin.</p><p>Within a day <b>WannaCry</b> had hit more than 200,000 computers in about 150 countries. In England, a third of NHS hospital trusts were affected; around 19,000 appointments were cancelled and some ambulances were sent to other hospitals.</p><p>It spread on its own, through a Windows flaw that Microsoft had patched two months earlier. The organisations that coped best weren't the ones with the best antivirus. They were the ones with a plan.</p>`,
      ru: `<p>В пятницу 12 мая 2017 года экраны в больницах, на заводах и в офисах по всему миру стали красными: «Ой, ваши файлы зашифрованы!» Выкуп — 300 долларов в биткоинах.</p><p>За сутки <b>WannaCry</b> поразил больше 200 000 компьютеров примерно в 150 странах. В Англии пострадала треть больничных трастов NHS; около 19 000 приёмов отменили, часть машин скорой помощи развернули в другие больницы.</p><p>Он распространялся сам, через уязвимость Windows, которую Microsoft закрыла двумя месяцами раньше. Лучше всех справились не те, у кого был лучший антивирус, а те, у кого был план.</p>`,
    },
    take: { en: `Incidents will happen; what you prepared decides how bad they get.`, ru: `Инциденты случатся; насколько тяжёлыми они будут, решает подготовка.` } },

  { id: 's10-002', kind: 'idea', k: ['d7-c4'], lvl: 1,
    title: { en: `Event or incident?`, ru: `Событие или инцидент?` },
    body: {
      en: `<p>Systems produce millions of <b>events</b>: anything observable. A login, a file opened, a firewall dropping a packet. Almost all are harmless.</p><p>An <b>incident</b> is an event, or a series of them, that harms confidentiality, integrity or availability, or breaks security policy. Ransomware encrypting a file server is an incident. So is an employee emailing customer data to a personal address.</p><p>Every incident is an event, but very few events are incidents. Deciding which is which is the first real job of incident response, and it needs written criteria, so the decision doesn't depend on who is on shift.</p>`,
      ru: `<p>Системы порождают миллионы <b>событий</b>: всё, что можно наблюдать. Вход в систему, открытие файла, отброшенный межсетевым экраном пакет. Почти все безобидны.</p><p><b>Инцидент</b> — событие или их серия, которые вредят конфиденциальности, целостности или доступности либо нарушают политику безопасности. Вымогатель, шифрующий файловый сервер, — инцидент. Как и сотрудник, отправивший данные клиентов на личную почту.</p><p>Каждый инцидент — событие, но инцидентами становятся очень немногие события. Решить, что есть что, — первая настоящая задача реагирования, и для неё нужны письменные критерии, чтобы решение не зависело от того, кто на смене.</p>`,
    },
    take: { en: `An incident is an event that hurts CIA or breaks policy; write down the criteria.`, ru: `Инцидент — событие, вредящее CIA или нарушающее политику; критерии запишите.` } },

  { id: 's10-003', kind: 'vs', k: ['d7-c4', 'd1-c4'], lvl: 1,
    title: { en: `Event vs incident vs breach`, ru: `Событие, инцидент и утечка` },
    body: {
      en: `<ul><li><b>Event</b>: anything observable. A failed login.</li><li><b>Adverse event</b>: an event with a negative effect. Two hundred failed logins on one account in a minute.</li><li><b>Incident</b>: an actual or likely violation of security policy or harm to CIA. The account is taken over.</li><li><b>Breach</b>: an incident in which protected data, especially personal data, is accessed or disclosed without authorization. The attacker downloads customer records.</li></ul><p>The words matter because the law attaches duties to them: "breach" usually starts a notification clock. So it's a word to use carefully, after legal counsel has looked at the facts.</p>`,
      ru: `<ul><li><b>Событие</b>: всё наблюдаемое. Неудачный вход.</li><li><b>Неблагоприятное событие</b>: событие с негативным эффектом. Двести неудачных входов в одну учётку за минуту.</li><li><b>Инцидент</b>: фактическое или вероятное нарушение политики безопасности или вред CIA. Учётку захватили.</li><li><b>Утечка</b> (breach): инцидент, при котором к защищаемым данным, особенно персональным, получили несанкционированный доступ или их раскрыли. Атакующий скачивает записи клиентов.</li></ul><p>Слова важны, потому что закон привязывает к ним обязанности: «утечка» обычно запускает отсчёт срока уведомления. Поэтому это слово употребляют осторожно, после того как факты посмотрели юристы.</p>`,
    },
    take: { en: `Every breach is an incident, every incident an event; "breach" can start a legal clock.`, ru: `Каждая утечка — инцидент, каждый инцидент — событие; «утечка» может запустить юридический отсчёт.` } },

  { id: 's10-004', kind: 'think', k: ['d7-c4'], lvl: 1,
    title: { en: `Three reports before lunch`, ru: `Три сообщения до обеда` },
    body: {
      en: `<p>Three things reach the service desk on one morning:</p><ul><li><b>A</b>: the firewall blocked 50,000 connection attempts from the internet overnight.</li><li><b>B</b>: a salesperson left an encrypted company laptop in a taxi.</li><li><b>C</b>: an accountant says the payroll file now has two employees she's never heard of, with bank accounts abroad.</li></ul><p>Which are incidents?</p>`,
      ru: `<p>За одно утро в службу поддержки приходят три сообщения:</p><ul><li><b>A</b>: межсетевой экран за ночь заблокировал 50 000 попыток подключения из интернета.</li><li><b>B</b>: продавец забыл в такси зашифрованный рабочий ноутбук.</li><li><b>C</b>: бухгалтер говорит, что в файле зарплат появились два сотрудника, о которых она никогда не слышала, со счетами за границей.</li></ul><p>Что из этого инциденты?</p>`,
    },
    reveal: {
      en: `<p><b>A</b> is an event: background noise of the internet, and the control worked. Watch the trend, but don't wake anyone.</p><p><b>B</b> is an incident, but a small one: a lost asset. Because the disk is encrypted, the data is probably safe. Log it, wipe the laptop remotely, and confirm it really was encrypted.</p><p><b>C</b> is a serious incident: the integrity of payroll is broken, possibly by fraud. Escalate at once, preserve the file and its change history, and involve management. Severity, not the number of alerts, sets the priority.</p>`,
      ru: `<p><b>A</b> — событие: фоновый шум интернета, и мера сработала. Следите за тенденцией, но никого не будите.</p><p><b>B</b> — инцидент, но небольшой: потерянный актив. Раз диск зашифрован, данные, скорее всего, в безопасности. Зарегистрируйте, сотрите ноутбук удалённо и подтвердите, что шифрование действительно было.</p><p><b>C</b> — серьёзный инцидент: нарушена целостность зарплатных данных, возможно мошенничество. Немедленно эскалируйте, сохраните файл и историю его изменений, подключите руководство. Приоритет задаёт серьёзность, а не число оповещений.</p>`,
    },
    take: { en: `Classify by harm: blocked noise is an event, broken integrity is an incident.`, ru: `Классифицируйте по вреду: заблокированный шум — событие, нарушенная целостность — инцидент.` } },

  { id: 's10-005', kind: 'idea', k: ['d7-c4'], lvl: 1,
    title: { en: `The plan and the team, before anything happens`, ru: `План и команда до того, как что-то случится` },
    body: {
      en: `<p>At 3 a.m., with screens turning red, nobody should be asking "who's in charge?" An <b>incident response plan</b>, approved by senior management, answers that in advance: what counts as an incident, how severe each level is, who decides what, and who must be told.</p><p>The plan names a <b>CSIRT</b> (computer security incident response team). It's more than IT and security:</p><ul><li><b>management</b>, to make business decisions;</li><li><b>legal</b>, for notification duties and evidence;</li><li><b>HR</b>, when an employee is involved;</li><li><b>communications</b>, for customers and the press.</li></ul>`,
      ru: `<p>В 3 часа ночи, когда экраны краснеют, никто не должен спрашивать «кто главный?». <b>План реагирования на инциденты</b>, утверждённый высшим руководством, отвечает на это заранее: что считается инцидентом, каковы уровни серьёзности, кто что решает и кому нужно сообщить.</p><p>План называет <b>CSIRT</b> (группу реагирования на инциденты компьютерной безопасности). Это не только ИТ и безопасность:</p><ul><li><b>руководство</b> — для деловых решений;</li><li><b>юристы</b> — для обязанностей по уведомлению и доказательств;</li><li><b>HR</b> — если замешан сотрудник;</li><li><b>коммуникации</b> — для клиентов и прессы.</li></ul>`,
    },
    take: { en: `A management-approved plan and a cross-functional CSIRT, decided before the incident.`, ru: `План, утверждённый руководством, и межфункциональная CSIRT — до инцидента.` } },

  { id: 's10-006', kind: 'back', back: 's02-028', k: ['d7-c4', 'd7-c1', 'd1-c8'], lvl: 2,
    title: { en: `40 GB again: the process had a name`, ru: `Снова 40 ГБ: у процесса было имя` },
    body: {
      en: `<p>In stage 2 an engineer who had resigned copied 40 GB to a personal drive, and the answer was: preserve the evidence, escalate to management, HR and legal, don't confront them alone.</p><p>That was incident response in miniature. The DLP alert was <b>detection</b>. Checking it wasn't a false alarm was <b>analysis</b>. Restricting the account would be <b>containment</b>. Saving the logs untouched was <b>evidence handling</b>. Management deciding with HR and legal was the plan working as written.</p><p>This stage takes each of those steps apart, and adds what comes after: recovery, reporting and lessons learned.</p>`,
      ru: `<p>На этапе 2 уволившийся инженер скопировал 40 ГБ на личный диск, и ответ был такой: сохранить доказательства, передать руководству, HR и юристам, не разбираться с ним в одиночку.</p><p>Это было реагирование на инцидент в миниатюре. Оповещение DLP — <b>обнаружение</b>. Проверка, что тревога не ложная, — <b>анализ</b>. Ограничение учётки — <b>сдерживание</b>. Нетронутые сохранённые журналы — <b>обращение с доказательствами</b>. Решение руководства вместе с HR и юристами — план, работающий как написано.</p><p>Этот этап разбирает каждый из шагов и добавляет то, что идёт после: восстановление, отчётность и извлечённые уроки.</p>`,
    },
    take: { en: `Detect, analyse, contain, preserve, let management decide: that's the incident process.`, ru: `Обнаружить, проанализировать, сдержать, сохранить, дать решить руководству — это и есть процесс.` } },

  { id: 's10-007', kind: 'picture', k: ['d7-c4'], lvl: 1,
    title: { en: `The incident response lifecycle`, ru: `Жизненный цикл реагирования на инциденты` },
    body: {
      en: `<p>NIST SP 800-61 describes four phases. <b>Preparation</b> happens before anything goes wrong. <b>Detection and analysis</b> confirms an incident and how bad it is. <b>Containment, eradication and recovery</b> stops the damage, removes the cause and brings systems back; analysis often continues inside it, as new affected systems turn up. <b>Post-incident activity</b> feeds lessons back into preparation. The 2025 revision maps the same work onto the functions of the NIST Cybersecurity Framework 2.0.</p>`,
      ru: `<p>NIST SP 800-61 описывает четыре фазы. <b>Подготовка</b> идёт до того, как что-то случилось. <b>Обнаружение и анализ</b> подтверждают инцидент и его серьёзность. <b>Сдерживание, устранение и восстановление</b> останавливают ущерб, убирают причину и возвращают системы; анализ часто продолжается внутри этой фазы, по мере того как находятся новые затронутые системы. <b>Действия после инцидента</b> возвращают уроки в подготовку. Редакция 2025 года сопоставляет ту же работу с функциями NIST Cybersecurity Framework 2.0.</p>`,
    },
    dg: { title: { en: `Incident response lifecycle (NIST SP 800-61)`, ru: `Жизненный цикл реагирования (NIST SP 800-61)` }, h: 290,
      nodes: [
        ['prep', 140, 80, { en: 'Preparation', ru: 'Подготовка' }, { en: 'plan, team, tools', ru: 'план, команда, средства' }, '🧰', 'key'],
        ['det', 560, 80, { en: 'Detection & analysis', ru: 'Обнаружение и анализ' }, { en: 'is it real? how bad?', ru: 'настоящий ли? насколько плох?' }, '🔍', 'ok'],
        ['cer', 560, 220, { en: 'Contain, eradicate, recover', ru: 'Сдержать, устранить, восстановить' }, { en: 'stop, remove, restore', ru: 'остановить, убрать, вернуть' }, '🛠️', 'bad'],
        ['post', 140, 220, { en: 'Post-incident', ru: 'После инцидента' }, { en: 'lessons learned', ru: 'извлечённые уроки' }, '📝', 'dim'],
      ],
      edges: [['prep', 'det', '', 'ok'], ['det', 'cer', { en: 'new systems found', ru: 'найдены новые системы' }, 'both'], ['cer', 'post', '', 'ok'], ['post', 'prep', { en: 'improve', ru: 'улучшить' }, 'dash']],
      note: { en: `The arrow back to preparation is the one most often skipped.`, ru: `Стрелку обратно к подготовке пропускают чаще всего.` } },
    take: { en: `Prepare, detect and analyse, contain-eradicate-recover, learn, and loop.`, ru: `Подготовка, обнаружение и анализ, сдерживание-устранение-восстановление, уроки — и по кругу.` } },

  { id: 's10-008', kind: 'vs', k: ['d7-c4'], lvl: 2,
    title: { en: `NIST's four phases vs the ISC2 seven steps`, ru: `Четыре фазы NIST и семь шагов ISC2` },
    body: {
      en: `<p>The ISC2 study material splits the same work into seven steps:</p><ol><li><b>Detection</b></li><li><b>Response</b>: activate the team</li><li><b>Mitigation</b>: contain the damage</li><li><b>Reporting</b>: inform management and, if required, outsiders</li><li><b>Recovery</b>: return systems to normal</li><li><b>Remediation</b>: fix the root cause</li><li><b>Lessons learned</b></li></ol><p>Preparation isn't a step here: it's assumed to be done before step 1. Reporting is listed once but really runs throughout.</p><p>Memory hook: "<b>DRM-R-RRL</b>": detect, respond, mitigate, report, recover, remediate, learn. On the exam, after detection the priority is <b>containment</b>.</p>`,
      ru: `<p>Учебные материалы ISC2 делят ту же работу на семь шагов:</p><ol><li><b>Обнаружение</b> (detection)</li><li><b>Реагирование</b> (response): задействовать команду</li><li><b>Смягчение</b> (mitigation): сдержать ущерб</li><li><b>Отчётность</b> (reporting): сообщить руководству и, если нужно, внешним сторонам</li><li><b>Восстановление</b> (recovery): вернуть системы в норму</li><li><b>Устранение причины</b> (remediation)</li><li><b>Извлечённые уроки</b> (lessons learned)</li></ol><p>Подготовки здесь нет: считается, что она сделана до шага 1. Отчётность указана один раз, но на деле идёт всё время.</p><p>Подсказка: «<b>DRM-R-RRL</b>». На экзамене после обнаружения приоритет — <b>сдерживание</b>.</p>`,
    },
    take: { en: `Detect, respond, mitigate, report, recover, remediate, learn; contain first.`, ru: `Обнаружить, отреагировать, смягчить, сообщить, восстановить, устранить причину, извлечь уроки; сначала сдержать.` } },

  { id: 's10-009', kind: 'idea', k: ['d7-c4'], lvl: 2,
    title: { en: `Preparation: what you need on the shelf`, ru: `Подготовка: что должно лежать на полке` },
    body: {
      en: `<p>Most of incident response is decided before the incident:</p><ul><li><b>Contact lists</b>: team members, management, legal, the insurer, key vendors, law enforcement. On paper too, in case the network is down.</li><li><b>Playbooks</b> for common cases: ransomware, phishing, lost device, DDoS, insider.</li><li><b>Logs kept</b> long enough, and clocks synchronised, so a timeline can be built.</li><li><b>Clean backups</b> that attackers can't reach.</li><li><b>Out-of-band communication</b>: if email is compromised, the attacker reads your response plan in real time.</li><li>A <b>jump bag</b>: forensic laptop, write blockers, blank drives, evidence bags, forms.</li></ul>`,
      ru: `<p>Большая часть реагирования решается до инцидента:</p><ul><li><b>Списки контактов</b>: команда, руководство, юристы, страховщик, ключевые поставщики, правоохранители. И на бумаге — на случай, если сеть лежит.</li><li><b>Сценарии</b> (playbooks) для типичных случаев: вымогатель, фишинг, потерянное устройство, DDoS, инсайдер.</li><li><b>Журналы</b>, хранимые достаточно долго, и синхронизированные часы, чтобы можно было построить хронологию.</li><li><b>Чистые резервные копии</b>, до которых атакующим не дотянуться.</li><li><b>Внеполосная связь</b>: если почта скомпрометирована, атакующий читает ваш план реагирования в реальном времени.</li><li><b>Тревожный чемоданчик</b> (jump bag): ноутбук для криминалистики, блокираторы записи, чистые диски, пакеты для улик, бланки.</li></ul>`,
    },
    take: { en: `Contacts, playbooks, logs, clean backups, a second channel and a jump bag, ready in advance.`, ru: `Контакты, сценарии, журналы, чистые бэкапы, второй канал связи и чемоданчик — заранее.` } },

  { id: 's10-010', kind: 'story', k: ['d8-c8', 'd1-c13', 'd7-c4'], lvl: 2,
    title: { en: `NotPetya 2017: ransomware that wasn't`, ru: `NotPetya, 2017: вымогатель, который им не был` },
    body: {
      en: `<p>Six weeks after WannaCry, on 27 June 2017, a second outbreak began in Ukraine. Attackers had broken into the company behind <b>M.E.Doc</b>, accounting software used by most Ukrainian businesses, and pushed malware out through its normal update.</p><p>Inside each network, <b>NotPetya</b> stole administrator credentials from memory and spread to every Windows machine it could reach, in minutes. It showed a ransom note, but there was no working way to decrypt: it was a <b>wiper</b> dressed as ransomware.</p><p>Maersk, Merck, FedEx's TNT and Mondelez were among the victims. The US government put total damage at over $10 billion and blamed Russia's military intelligence.</p>`,
      ru: `<p>Через шесть недель после WannaCry, 27 июня 2017 года, в Украине началась вторая вспышка. Атакующие взломали компанию, выпускавшую <b>M.E.Doc</b> — бухгалтерскую программу, которой пользовалось большинство украинских предприятий, — и разослали вредонос через её обычное обновление.</p><p>В каждой сети <b>NotPetya</b> крал учётные данные администраторов из памяти и за минуты распространялся на все доступные машины Windows. Он показывал требование выкупа, но рабочего способа расшифровки не было: это был <b>вайпер</b>, переодетый вымогателем.</p><p>Среди жертв — Maersk, Merck, TNT (FedEx) и Mondelez. Правительство США оценило общий ущерб более чем в 10 млрд долларов и обвинило военную разведку России.</p>`,
    },
    take: { en: `A trusted update carried a wiper in disguise; paying would have recovered nothing.`, ru: `Доверенное обновление принесло замаскированный вайпер; оплата ничего бы не вернула.` } },

  { id: 's10-011', kind: 'vs', k: ['d8-c8'], lvl: 1,
    title: { en: `Virus vs worm vs trojan`, ru: `Вирус, червь и троян` },
    body: {
      en: `<ul><li><b>Virus</b>: attaches to a host (a file, a document, a boot sector) and needs someone to run it. It spreads when people share infected files.</li><li><b>Worm</b>: spreads by itself across the network, exploiting a flaw, with <b>no user action</b>. WannaCry and NotPetya were worms; so was the Morris worm in 1988.</li><li><b>Trojan horse</b>: looks useful, so the user installs it willingly, but carries a hidden payload. A RAT (remote access trojan) gives the attacker control of the machine.</li></ul><p>Rule: a virus needs a host and a click, a worm needs neither, a trojan needs the user's trust.</p>`,
      ru: `<ul><li><b>Вирус</b>: прикрепляется к носителю (файлу, документу, загрузочному сектору) и требует, чтобы кто-то его запустил. Распространяется, когда люди передают заражённые файлы.</li><li><b>Червь</b>: сам распространяется по сети через уязвимость, <b>без действий пользователя</b>. WannaCry и NotPetya были червями, как и червь Морриса в 1988 году.</li><li><b>Троян</b>: выглядит полезным, поэтому пользователь сам его устанавливает, но несёт скрытую нагрузку. RAT (троян удалённого доступа) отдаёт атакующему управление машиной.</li></ul><p>Правило: вирусу нужны носитель и клик, червю — ничего, трояну — доверие пользователя.</p>`,
    },
    take: { en: `Virus: host and click. Worm: spreads alone. Trojan: invited in.`, ru: `Вирус — носитель и клик. Червь — сам. Трояна приглашают.` } },

  { id: 's10-012', kind: 'back', back: 's05-008', k: ['d4-c2', 'd8-c8', 'd4-c4'], lvl: 2,
    title: { en: `Ports again: why 445 mattered so much`, ru: `Снова порты: почему 445 так важен` },
    body: {
      en: `<p>Stage 5 said every service listens on a port. Windows file sharing, <b>SMB</b>, uses TCP port <b>445</b>. WannaCry used <b>EternalBlue</b>, an exploit for a flaw in the old SMB version 1, leaked from the NSA in April 2017.</p><p>Each infected machine tried port 445 on random internet addresses and on every address in its own network. A computer that answered on 445 and lacked the March patch (MS17-010) was infected without anyone clicking anything.</p><p>So three controls each broke the chain: the patch, turning off SMBv1, and never letting port 445 through the internet firewall.</p>`,
      ru: `<p>Этап 5 говорил, что каждый сервис слушает порт. Общий доступ к файлам Windows, <b>SMB</b>, использует TCP-порт <b>445</b>. WannaCry использовал <b>EternalBlue</b> — эксплойт уязвимости в старой версии SMB 1, утёкший из АНБ в апреле 2017 года.</p><p>Каждая заражённая машина стучалась на порт 445 случайных адресов в интернете и всех адресов своей сети. Компьютер, отвечавший на 445 и не получивший мартовский патч (MS17-010), заражался без единого клика.</p><p>Поэтому цепочку рвала каждая из трёх мер: патч, отключение SMBv1 и запрет пропускать порт 445 через внешний межсетевой экран.</p>`,
    },
    take: { en: `Patch, disable what you don't need, and keep internal ports off the internet.`, ru: `Патчите, отключайте ненужное и не выпускайте внутренние порты в интернет.` } },

  { id: 's10-013', kind: 'picture', k: ['d8-c8', 'd4-c8', 'd5-c4'], lvl: 2,
    title: { en: `How NotPetya moved`, ru: `Как двигался NotPetya` },
    body: {
      en: `<p>The attack began in the <b>supply chain</b>: a trusted update server. On the first victim machine, NotPetya used two ways to spread at once. If neighbours lacked the patch, it used the same SMB exploits as WannaCry. If they were patched, it stole <b>credentials</b> from memory and logged in to them with ordinary admin tools. In a flat network where one admin account works everywhere, patching alone didn't stop it.</p>`,
      ru: `<p>Атака началась в <b>цепочке поставок</b>: с доверенного сервера обновлений. На первой машине-жертве NotPetya распространялся двумя путями сразу. Если соседи не были пропатчены, он использовал те же эксплойты SMB, что и WannaCry. Если были — крал <b>учётные данные</b> из памяти и входил на них обычными средствами администратора. В плоской сети, где одна админская учётка работает везде, одних патчей было мало.</p>`,
    },
    dg: { title: { en: `NotPetya: one update, two ways to spread`, ru: `NotPetya: одно обновление, два пути распространения` }, h: 300,
      zones: [[260, 30, 480, 250, { en: 'Victim network (flat)', ru: 'Сеть жертвы (плоская)' }, 'trust']],
      nodes: [
        ['upd', 120, 150, { en: 'Update server', ru: 'Сервер обновлений' }, { en: 'M.E.Doc, hijacked', ru: 'M.E.Doc, захвачен' }, '📦', 'bad'],
        ['pc', 380, 150, { en: 'First PC', ru: 'Первый ПК' }, { en: 'runs the update', ru: 'ставит обновление' }, '💻', 'bad'],
        ['unp', 620, 80, { en: 'Unpatched PCs', ru: 'Без патча' }, { en: 'SMB exploit', ru: 'эксплойт SMB' }, '🖥️', 'bad'],
        ['pat', 620, 220, { en: 'Patched PCs', ru: 'С патчем' }, { en: 'stolen admin login', ru: 'украденный вход админа' }, '🖥️', 'bad'],
      ],
      edges: [['upd', 'pc', { en: 'trusted update', ru: 'обновление' }, 'bad'], ['pc', 'unp', '', 'bad'], ['pc', 'pat', '', 'bad']],
      note: { en: `Patching closed one path; only segmentation and limited admin rights closed both.`, ru: `Патч закрыл один путь; оба закрывали только сегментация и ограниченные права админов.` } },
    take: { en: `Exploits beat unpatched machines; stolen credentials beat patched ones.`, ru: `Эксплойты берут непропатченные машины, украденные учётки — пропатченные.` } },

  { id: 's10-014', kind: 'idea', k: ['d7-c4', 'd7-c2'], lvl: 2,
    title: { en: `Detection and analysis: is it real, and how bad?`, ru: `Обнаружение и анализ: настоящий ли, насколько плох?` },
    body: {
      en: `<p>Incidents announce themselves in many ways: a SIEM alert, EDR blocking a file, a user saying "my files have strange names", a partner reporting spam from your domain, a journalist calling.</p><p>The first person to look does <b>triage</b>:</p><ul><li>Is it real or a false positive?</li><li>What is affected, and is it spreading?</li><li>How <b>severe</b> is it: what does it do to the business, what data is involved, how hard will recovery be?</li></ul><p>Then they <b>open a record</b> and start a timeline: every action, with the time and who did it. That record becomes the evidence, the report and the lessons learned.</p>`,
      ru: `<p>Инциденты заявляют о себе по-разному: оповещение SIEM, EDR, заблокировавший файл, пользователь со словами «у моих файлов странные имена», партнёр, получающий спам с вашего домена, звонок журналиста.</p><p>Первый, кто смотрит, проводит <b>сортировку</b> (triage):</p><ul><li>Настоящий ли это инцидент или ложное срабатывание?</li><li>Что затронуто и распространяется ли?</li><li>Насколько он <b>серьёзен</b>: что он делает с бизнесом, какие данные замешаны, насколько трудно будет восстановиться?</li></ul><p>Затем он <b>заводит запись</b> и начинает хронологию: каждое действие со временем и исполнителем. Эта запись станет доказательством, отчётом и материалом для уроков.</p>`,
    },
    take: { en: `Triage: real? spreading? how severe? Then write down everything, with times.`, ru: `Сортировка: настоящий? распространяется? насколько серьёзен? И записывайте всё со временем.` } },

  { id: 's10-015', kind: 'back', back: 's09-044', k: ['d7-c2', 'd7-c4'], lvl: 2,
    title: { en: `The SIEM pipeline again: where the alert ends up`, ru: `Снова конвейер SIEM: куда попадает оповещение` },
    body: {
      en: `<p>Stage 9 followed log lines through collection, normalization and correlation to an alert. That's where monitoring ends and incident response begins.</p><p>A good hand-off needs three things:</p><ul><li>a <b>clear owner</b> for every alert, so it doesn't sit in a queue like Target's did;</li><li>a <b>severity</b> that matches the playbook, so a critical alert pages someone at night and a low one waits until morning;</li><li><b>context</b>: which asset, whose account, what else happened around it.</li></ul><p>After the incident, the timeline flows back: what did the logs show, and when could we have known?</p>`,
      ru: `<p>Этап 9 провёл строки журналов через сбор, нормализацию и корреляцию до оповещения. Там заканчивается мониторинг и начинается реагирование.</p><p>Хорошей передаче нужны три вещи:</p><ul><li><b>ясный владелец</b> каждого оповещения, чтобы оно не лежало в очереди, как у Target;</li><li><b>серьёзность</b>, совпадающая со сценарием: критичное оповещение будит дежурного ночью, низкое ждёт утра;</li><li><b>контекст</b>: какой актив, чья учётка, что ещё происходило рядом.</li></ul><p>После инцидента хронология идёт обратно: что показывали журналы и когда мы могли узнать?</p>`,
    },
    take: { en: `Monitoring hands over an owned, ranked, contextual alert; the timeline flows back.`, ru: `Мониторинг передаёт оповещение с владельцем, уровнем и контекстом; хронология возвращается.` } },

  { id: 's10-016', kind: 'think', k: ['d7-c4', 'd7-c1', 'd8-c8'], lvl: 1,
    title: { en: `The red screen on one PC`, ru: `Красный экран на одном ПК` },
    body: {
      en: `<p>A user calls: a ransom note has appeared on her PC, and files on the shared drive are getting strange extensions. You're the first responder on site.</p><p>Your colleague says: "Switch it off right now, before it encrypts anything else!"</p><p>What do you do first?</p>`,
      ru: `<p>Звонит пользователь: на её ПК появилось требование выкупа, а у файлов на общем диске меняются расширения. Вы первым прибыли на место.</p><p>Коллега говорит: «Выключай его немедленно, пока он не зашифровал что-нибудь ещё!»</p><p>Что вы сделаете первым?</p>`,
    },
    reveal: {
      en: `<p><b>Isolate it from the network, but leave it running.</b> Pull the network cable, disable Wi-Fi, or use the EDR's "isolate host" button. That stops it reaching the shared drive and other machines, which is the goal of <b>containment</b>.</p><p>Switching off destroys the contents of memory: running processes, network connections and sometimes the very encryption keys that could help recover files. Then follow the playbook: report it, check the file server, and look for other infected machines. Containment first, without destroying evidence.</p>`,
      ru: `<p><b>Изолируйте его от сети, но оставьте включённым.</b> Выдерните сетевой кабель, отключите Wi-Fi или нажмите в EDR «изолировать хост». Это не даст ему добраться до общего диска и других машин — в этом и цель <b>сдерживания</b>.</p><p>Выключение уничтожает содержимое памяти: запущенные процессы, сетевые соединения, а иногда и сами ключи шифрования, которые помогли бы вернуть файлы. Дальше — по сценарию: сообщите, проверьте файловый сервер, ищите другие заражённые машины. Сначала сдерживание, не уничтожая доказательств.</p>`,
    },
    take: { en: `Isolate, don't power off: contain the spread and keep memory for evidence.`, ru: `Изолируйте, а не выключайте: остановите распространение и сохраните память для доказательств.` } },

  { id: 's10-017', kind: 'idea', k: ['d7-c4', 'd4-c8'], lvl: 2,
    title: { en: `Containment: stop the bleeding`, ru: `Сдерживание: остановить кровотечение` },
    body: {
      en: `<p>Containment limits how far the damage goes. The tools depend on the incident:</p><ul><li><b>Isolate hosts</b>: unplug them, or move them to a quarantine VLAN.</li><li><b>Disable or reset accounts</b> the attacker is using, and revoke their sessions and tokens.</li><li><b>Block</b> the attacker's addresses, domains and file hashes at the firewall, proxy and EDR.</li><li><b>Cut links</b> between network segments, or to a compromised partner.</li></ul><p><b>Short-term</b> containment is fast and rough. <b>Long-term</b> containment keeps the business running safely while the clean-up is prepared. Containment is a business decision too: cutting off a factory costs money, so management signs off on the big moves.</p>`,
      ru: `<p>Сдерживание ограничивает, как далеко зайдёт ущерб. Средства зависят от инцидента:</p><ul><li><b>Изолировать хосты</b>: отключить их или перевести в карантинную VLAN.</li><li><b>Отключить или сбросить учётки</b>, которыми пользуется атакующий, и отозвать их сессии и токены.</li><li><b>Заблокировать</b> адреса, домены и хеши файлов атакующего на межсетевом экране, прокси и в EDR.</li><li><b>Разорвать связи</b> между сегментами сети или со скомпрометированным партнёром.</li></ul><p><b>Краткосрочное</b> сдерживание быстрое и грубое. <b>Долгосрочное</b> позволяет бизнесу безопасно работать, пока готовится очистка. Сдерживание — ещё и деловое решение: отключение завода стоит денег, поэтому крупные шаги утверждает руководство.</p>`,
    },
    take: { en: `Isolate, disable, block, cut; big containment moves are management's call.`, ru: `Изолировать, отключить, заблокировать, разорвать; крупные шаги решает руководство.` } },

  { id: 's10-018', kind: 'back', back: 's05-029', k: ['d4-c8', 'd7-c4'], lvl: 2,
    title: { en: `Segmentation again: firebreaks for a worm`, ru: `Снова сегментация: противопожарные полосы для червя` },
    body: {
      en: `<p>Stage 5 compared a flat network, where every machine reaches every other, with a segmented one. In 2017 the difference was measured in minutes.</p><p>In flat networks, NotPetya reached thousands of machines before anyone could react. Where segments had firewalls between them, with SMB and admin protocols allowed only from management hosts, the worm stopped at the boundary.</p><p>Segmentation also makes containment possible at all: you can cut one segment off and keep the rest working. In a flat network, the only switch big enough is the one for the whole company.</p>`,
      ru: `<p>Этап 5 сравнивал плоскую сеть, где каждая машина достаёт до любой другой, с сегментированной. В 2017 году разница измерялась минутами.</p><p>В плоских сетях NotPetya добирался до тысяч машин раньше, чем кто-то успевал отреагировать. Там, где между сегментами стояли межсетевые экраны и SMB с протоколами администрирования разрешались только с управляющих хостов, червь останавливался на границе.</p><p>Сегментация вообще делает сдерживание возможным: можно отрезать один сегмент, а остальные продолжат работать. В плоской сети единственный достаточно большой рубильник — рубильник всей компании.</p>`,
    },
    take: { en: `Segments stop worms at the boundary and let you contain one part, not everything.`, ru: `Сегменты останавливают червей на границе и позволяют сдерживать часть, а не всё.` } },

  { id: 's10-019', kind: 'story', k: ['d7-c4', 'd8-c8', 'd1-c7'], lvl: 2,
    title: { en: `Maersk: the world's largest shipping line on paper`, ru: `Maersk: крупнейшая судоходная линия мира на бумаге` },
    body: {
      en: `<p>Maersk had one M.E.Doc installation, at an office in Ukraine. On 27 June 2017 NotPetya used it as a way in and spread through the company's global network in hours.</p><p>Port terminals Maersk operated stopped. Trucks queued at gates, ships waited, and staff went back to paper, spreadsheets and personal phones. The company later estimated the cost at up to $300 million.</p><p>In about ten days, the IT team and outside helpers reinstalled some 4,000 servers and 45,000 PCs. How they rebuilt the network's identity system, from one machine that survived by luck, is a story for stage 12.</p>`,
      ru: `<p>У Maersk была одна установка M.E.Doc, в офисе в Украине. 27 июня 2017 года NotPetya вошёл через неё и за часы распространился по глобальной сети компании.</p><p>Портовые терминалы, которыми управляла Maersk, остановились. Грузовики стояли в очередях у ворот, суда ждали, а сотрудники вернулись к бумаге, таблицам и личным телефонам. Позже компания оценила ущерб в сумму до 300 млн долларов.</p><p>Примерно за десять дней ИТ-команда с внешними помощниками переустановила около 4000 серверов и 45 000 ПК. Как они восстановили систему учёток сети с одной машины, уцелевшей по случайности, — история для этапа 12.</p>`,
    },
    take: { en: `One remote office's software took down a global company; recovery took days of rebuilding.`, ru: `ПО одного удалённого офиса положило глобальную компанию; восстановление заняло дни пересборки.` } },

  { id: 's10-020', kind: 'vs', k: ['d7-c4'], lvl: 1,
    title: { en: `Containment vs eradication vs recovery`, ru: `Сдерживание, устранение и восстановление` },
    body: {
      en: `<ul><li><b>Containment</b>: stop it getting worse. Isolate, block, disable. The attacker may still be inside, but boxed in.</li><li><b>Eradication</b>: remove the cause. Delete the malware, close the hole it used, remove the attacker's accounts and backdoors, reset stolen credentials.</li><li><b>Recovery</b>: return to normal. Rebuild or restore systems, check they're clean, bring them back gradually and watch them closely.</li></ul><p>Rule: contain, then eradicate, then recover. Restoring before eradicating just gives the attacker fresh systems to infect.</p>`,
      ru: `<ul><li><b>Сдерживание</b>: не дать стать хуже. Изолировать, заблокировать, отключить. Атакующий может быть ещё внутри, но заперт.</li><li><b>Устранение</b> (eradication): убрать причину. Удалить вредонос, закрыть дыру, через которую он вошёл, убрать учётки и бэкдоры атакующего, сбросить украденные учётные данные.</li><li><b>Восстановление</b>: вернуться к норме. Пересобрать или восстановить системы, убедиться, что они чисты, возвращать их постепенно и внимательно наблюдать.</li></ul><p>Правило: сдержать, затем устранить, затем восстановить. Восстановление до устранения просто даёт атакующему свежие системы для заражения.</p>`,
    },
    take: { en: `Box it in, take it out, bring systems back: in that order.`, ru: `Запереть, убрать, вернуть системы — именно в этом порядке.` } },

  { id: 's10-021', kind: 'idea', k: ['d8-c8', 'd1-c1'], lvl: 1,
    title: { en: `Ransomware grew up: encrypt, steal, threaten`, ru: `Вымогатели повзрослели: зашифровать, украсть, пригрозить` },
    body: {
      en: `<p>Early ransomware hit <b>availability</b>: it encrypted files and sold the key. Good backups were the answer.</p><p>Since about 2019, most gangs <b>steal the data first</b>, then encrypt. If you restore from backup and refuse to pay, they threaten to publish it. This is <b>double extortion</b>, and now it's a <b>confidentiality</b> incident too, with notification duties. Some add a DDoS or call your customers.</p><p>Many gangs work as <b>ransomware-as-a-service</b>: developers rent the malware to "affiliates" who break in, and split the money. Cl0p's MOVEit campaign in stage 9 skipped encryption entirely and only stole.</p>`,
      ru: `<p>Ранние вымогатели били по <b>доступности</b>: шифровали файлы и продавали ключ. Ответом были хорошие резервные копии.</p><p>Примерно с 2019 года большинство группировок <b>сначала крадут данные</b>, а потом шифруют. Если вы восстановитесь из бэкапа и откажетесь платить, они грозят опубликовать данные. Это <b>двойное вымогательство</b>, и теперь это ещё и инцидент <b>конфиденциальности</b> с обязанностью уведомлять. Некоторые добавляют DDoS или звонят вашим клиентам.</p><p>Многие группировки работают как <b>вымогатель-как-услуга</b> (RaaS): разработчики сдают вредонос «партнёрам», которые взламывают, и делят деньги. Кампания Cl0p с MOVEit на этапе 9 вообще обошлась без шифрования — только кража.</p>`,
    },
    take: { en: `Modern ransomware hits availability and confidentiality; backups solve only half.`, ru: `Современные вымогатели бьют по доступности и конфиденциальности; бэкапы решают лишь половину.` } },

  { id: 's10-022', kind: 'think', k: ['d8-c8', 'd7-c4', 'd1-c4'], lvl: 2,
    title: { en: `"Just pay them"`, ru: `«Просто заплатите им»` },
    body: {
      en: `<p>Ransomware has encrypted your main file servers. The note demands $2 million in bitcoin within 72 hours. The operations director says: "Pay it. Every day offline costs us more than that."</p><p>The IT manager is ready to buy the bitcoin. What should happen?</p>`,
      ru: `<p>Вымогатель зашифровал основные файловые серверы. В записке требуют 2 млн долларов в биткоинах за 72 часа. Операционный директор говорит: «Платите. Каждый день простоя обходится дороже».</p><p>ИТ-менеджер готов покупать биткоины. Что должно произойти?</p>`,
    },
    reveal: {
      en: `<p>Not an IT decision. Paying is a <b>business and legal decision</b> for senior management, with legal counsel, the insurer and often law enforcement. Things they must weigh:</p><ul><li>Paying a sanctioned group can be illegal in itself.</li><li>There's no guarantee: decryptors are often slow and buggy, and NotPetya's never existed.</li><li>Stolen data may be published anyway, and payers get targeted again.</li><li>Can you restore from clean backups, and how long would that take?</li></ul><p>Ideally the organisation decided its position in advance, in the plan, not under a 72-hour clock.</p>`,
      ru: `<p>Это не решение ИТ. Оплата — <b>деловое и юридическое решение</b> высшего руководства вместе с юристами, страховщиком и часто правоохранителями. Что им нужно взвесить:</p><ul><li>Платёж группировке под санкциями сам по себе может быть незаконным.</li><li>Гарантий нет: дешифраторы часто медленные и с ошибками, а у NotPetya его не было вовсе.</li><li>Украденные данные могут опубликовать всё равно, а заплативших атакуют снова.</li><li>Можно ли восстановиться из чистых бэкапов и за какое время?</li></ul><p>В идеале позиция организации решена заранее, в плане, а не под отсчётом 72 часов.</p>`,
    },
    take: { en: `Whether to pay is management's decision, with legal; best decided before the incident.`, ru: `Платить ли — решает руководство с юристами; лучше решить до инцидента.` } },

  { id: 's10-023', kind: 'back', back: 's01-011', k: ['d8-c8', 'd1-c7', 'd7-c4'], lvl: 2,
    title: { en: `Colonial Pipeline again: what happened after the password`, ru: `Снова Colonial Pipeline: что было после пароля` },
    body: {
      en: `<p>Stage 1 told how one old VPN password let the DarkSide gang into Colonial Pipeline in May 2021. The response is just as instructive.</p><p>The ransomware hit business IT systems, including billing, not the pipeline controls. Colonial shut the pipeline anyway, as a precaution, because it couldn't be sure the infection wouldn't spread, or bill for fuel it delivered. That containment decision caused the fuel queues.</p><p>Colonial paid about $4.4 million. The decryptor was so slow that backups did most of the work. The FBI later traced and seized about $2.3 million of the ransom.</p>`,
      ru: `<p>Этап 1 рассказывал, как один старый пароль от VPN впустил группировку DarkSide в Colonial Pipeline в мае 2021 года. Реагирование не менее поучительно.</p><p>Вымогатель поразил деловые ИТ-системы, включая выставление счетов, а не управление трубопроводом. Colonial всё равно остановила трубопровод из предосторожности: она не была уверена, что заражение не распространится, и не могла выставлять счета за поставленное топливо. Именно это решение о сдерживании вызвало очереди за бензином.</p><p>Colonial заплатила около 4,4 млн долларов. Дешифратор был таким медленным, что основную работу сделали бэкапы. Позже ФБР отследило и изъяло около 2,3 млн из выкупа.</p>`,
    },
    take: { en: `Containment can cost more than the attack, and paying didn't make recovery faster.`, ru: `Сдерживание может стоить больше атаки, а оплата не ускорила восстановление.` } },

  { id: 's10-024', kind: 'vs', k: ['d8-c8'], lvl: 2,
    title: { en: `Rootkit vs logic bomb vs backdoor vs botnet`, ru: `Руткит, логическая бомба, бэкдор и ботнет` },
    body: {
      en: `<ul><li><b>Rootkit</b>: hides deep in the system, in the kernel or firmware, so its files and processes are invisible to the system's own tools. Its job is to stay, privileged and unseen.</li><li><b>Logic bomb</b>: code that waits for a condition, a date or an event such as "my account is deleted", then does damage. Usually planted by an insider.</li><li><b>Backdoor</b>: a hidden way in that skips normal authentication, like the one in Juniper's firewalls in stage 7.</li><li><b>Botnet</b>: many infected machines (bots) taking orders from a <b>command-and-control</b> (C2) server, like Mirai in stage 5.</li></ul>`,
      ru: `<ul><li><b>Руткит</b>: прячется глубоко в системе, в ядре или прошивке, так что его файлы и процессы невидимы для собственных средств системы. Его задача — оставаться, с привилегиями и незаметно.</li><li><b>Логическая бомба</b>: код, ждущий условия — даты или события вроде «мою учётку удалили», — а затем наносящий ущерб. Обычно её закладывает инсайдер.</li><li><b>Бэкдор</b>: скрытый вход в обход обычной аутентификации, как в межсетевых экранах Juniper на этапе 7.</li><li><b>Ботнет</b>: множество заражённых машин (ботов), получающих команды от сервера <b>управления</b> (C2), как Mirai на этапе 5.</li></ul>`,
    },
    take: { en: `Rootkit hides, logic bomb waits, backdoor bypasses, botnet obeys.`, ru: `Руткит прячется, бомба ждёт, бэкдор обходит, ботнет подчиняется.` } },

  { id: 's10-025', kind: 'story', k: ['d8-c8', 'd1-c8'], lvl: 2,
    title: { en: `UBS PaineWebber 2002: the bomb set for a Monday`, ru: `UBS PaineWebber, 2002: бомба, назначенная на понедельник` },
    body: {
      en: `<p>Roger Duronio was a systems administrator at the brokerage UBS PaineWebber. Angry about his bonus, he quit in February 2002. Before leaving, he planted a <b>logic bomb</b> on the company's Unix servers.</p><p>On the morning of Monday 4 March 2002 it went off, deleting files on about 2,000 servers in branch offices across the US. Brokers couldn't trade for days in some branches; the cleanup cost the firm about $3 million.</p><p>Duronio had also bet on the company's share price falling. Forensic investigators traced the code to him, and in 2006 he was sentenced to more than eight years in prison.</p>`,
      ru: `<p>Роджер Дюронио был системным администратором брокерской компании UBS PaineWebber. Недовольный бонусом, он уволился в феврале 2002 года. Перед уходом он заложил <b>логическую бомбу</b> на Unix-серверах компании.</p><p>Утром в понедельник 4 марта 2002 года она сработала и удалила файлы примерно на 2000 серверов в отделениях по всем США. В некоторых отделениях брокеры несколько дней не могли торговать; очистка обошлась фирме примерно в 3 млн долларов.</p><p>Дюронио ещё и поставил на падение акций компании. Криминалисты вышли на него по коду, и в 2006 году его приговорили к более чем восьми годам тюрьмы.</p>`,
    },
    take: { en: `Logic bombs come from insiders with access; code review, SoD and good forensics catch them.`, ru: `Логические бомбы закладывают инсайдеры с доступом; их ловят ревью кода, SoD и криминалистика.` } },

  { id: 's10-026', kind: 'vs', k: ['d8-c8'], lvl: 2,
    title: { en: `How viruses hide: the classic types`, ru: `Как прячутся вирусы: классические виды` },
    body: {
      en: `<ul><li><b>Boot sector</b>: infects the code that runs before the operating system starts.</li><li><b>File infector</b>: attaches to programs.</li><li><b>Macro</b>: lives in Office documents and runs when the macro does.</li><li><b>Multipartite</b>: uses several of these at once, so removing one copy isn't enough.</li><li><b>Polymorphic</b>: changes its own code with each copy, so no fixed signature matches.</li><li><b>Encrypted</b>: hides its body under encryption, leaving only a small decryptor visible.</li><li><b>Stealth</b>: lies to the operating system about the changes it made.</li></ul><p>All of these defeat simple signature matching. That's why stage 9's EDR watches <b>behaviour</b> instead.</p>`,
      ru: `<ul><li><b>Загрузочный</b>: заражает код, который выполняется до запуска операционной системы.</li><li><b>Файловый</b>: прикрепляется к программам.</li><li><b>Макровирус</b>: живёт в документах Office и запускается вместе с макросом.</li><li><b>Многокомпонентный</b> (multipartite): использует несколько способов сразу, поэтому удалить одну копию мало.</li><li><b>Полиморфный</b>: меняет свой код в каждой копии, так что фиксированная сигнатура не подходит.</li><li><b>Зашифрованный</b>: прячет тело под шифрованием, оставляя видимым лишь маленький расшифровщик.</li><li><b>Стелс</b>: обманывает операционную систему насчёт сделанных изменений.</li></ul><p>Все они обходят простое сравнение с сигнатурами. Поэтому EDR из этапа 9 следит за <b>поведением</b>.</p>`,
    },
    take: { en: `Polymorphic, encrypted and stealth viruses beat signatures; watch behaviour.`, ru: `Полиморфные, зашифрованные и стелс-вирусы обходят сигнатуры; следите за поведением.` } },

  { id: 's10-027', kind: 'idea', k: ['d8-c8', 'd7-c5'], lvl: 2,
    title: { en: `Living off the land: malware that uses your own tools`, ru: `«Подножный корм»: вредонос, использующий ваши же инструменты` },
    body: {
      en: `<p>Classic malware is a file on disk, which antivirus can scan. Many attackers now avoid leaving files at all.</p><p><b>Fileless malware</b> runs in memory, often through tools already on every Windows machine: PowerShell, WMI, the task scheduler. NotPetya spread through PsExec and WMI, the same tools admins use daily, with passwords it pulled out of memory.</p><p>This is called <b>living off the land</b>. Nothing looks foreign, so signature matching sees nothing. What gives it away is <b>behaviour</b>: a spreadsheet starting PowerShell, an accountant's PC running admin tools against forty servers. Restricting who may run such tools helps as much as detecting them.</p>`,
      ru: `<p>Классический вредонос — файл на диске, который антивирус может проверить. Многие атакующие теперь вообще не оставляют файлов.</p><p><b>Бесфайловый вредонос</b> работает в памяти, часто через инструменты, которые уже есть на каждой машине Windows: PowerShell, WMI, планировщик задач. NotPetya распространялся через PsExec и WMI — те же средства, которыми администраторы пользуются ежедневно, — с паролями, вытащенными из памяти.</p><p>Это называют <b>living off the land</b> («жить подножным кормом»). Ничего чужого не видно, и сравнение с сигнатурами ничего не находит. Выдаёт <b>поведение</b>: таблица, запускающая PowerShell, ПК бухгалтера, гоняющий админские утилиты по сорока серверам. Ограничить, кто может запускать такие средства, помогает не меньше, чем их обнаруживать.</p>`,
    },
    take: { en: `Fileless attacks use legitimate tools; catch them by behaviour and limit who can run them.`, ru: `Бесфайловые атаки используют легитимные средства; ловите по поведению и ограничивайте запуск.` } },

  { id: 's10-028', kind: 'back', back: 's04-038', k: ['d5-c4', 'd7-c4'], lvl: 3,
    title: { en: `Golden ticket again: when the domain itself is lost`, ru: `Снова золотой билет: когда потерян сам домен` },
    body: {
      en: `<p>Stage 4 listed the worst Kerberos attack: with the krbtgt account's key, an attacker forges tickets for anyone, for as long as they like.</p><p>After an incident where attackers reached domain administrator, as NotPetya did in many networks, eradication has to assume they took that key. Resetting users' passwords isn't enough: forged tickets don't need passwords. The krbtgt password must be reset <b>twice</b>, with time between for replication, because the domain still accepts tickets signed with the previous key.</p><p>Often the honest conclusion is harder: if you can't prove what the attacker changed in the directory, you rebuild it.</p>`,
      ru: `<p>Этап 4 называл худшую атаку на Kerberos: с ключом учётки krbtgt атакующий подделывает билеты для кого угодно и на любой срок.</p><p>После инцидента, в котором атакующие получили права администратора домена, как NotPetya во многих сетях, устранение должно исходить из того, что ключ у них. Сбросить пароли пользователей мало: поддельным билетам пароли не нужны. Пароль krbtgt нужно сбросить <b>дважды</b>, с паузой на репликацию, потому что домен всё ещё принимает билеты, подписанные предыдущим ключом.</p><p>Часто честный вывод жёстче: если нельзя доказать, что атакующий изменил в каталоге, его пересобирают.</p>`,
    },
    take: { en: `Domain admin lost: reset krbtgt twice, or rebuild the directory.`, ru: `Потерян админ домена: сбросить krbtgt дважды или пересобрать каталог.` } },

  { id: 's10-029', kind: 'think', k: ['d7-c4', 'd8-c8'], lvl: 2,
    title: { en: `Clean it or rebuild it?`, ru: `Почистить или пересобрать?` },
    body: {
      en: `<p>A web server was compromised. The antivirus has removed the malware it found, and a fresh scan comes back clean. The server's owner says: "Great, it's clean. Put it back online, rebuilding it would take two days."</p><p>Do you agree?</p>`,
      ru: `<p>Веб-сервер был скомпрометирован. Антивирус удалил найденный вредонос, и свежий скан чист. Владелец сервера говорит: «Отлично, он чистый. Возвращайте его в работу, пересборка займёт два дня».</p><p>Вы согласны?</p>`,
    },
    reveal: {
      en: `<p>Usually not. A clean scan means the scanner found nothing, not that nothing is there. Once an attacker had control, they may have left a rootkit, a new account, a scheduled task or a changed configuration that no scanner flags.</p><p>The safe path is to <b>rebuild from a known-good image</b>, patch it, restore only the data (checked), change every credential the server held, and fix the hole they came in through. Two days offline is a business cost the owner can weigh against the risk of reinfection, but they should weigh it knowingly.</p>`,
      ru: `<p>Обычно нет. Чистый скан означает, что сканер ничего не нашёл, а не что ничего нет. Получив управление, атакующий мог оставить руткит, новую учётку, задачу в планировщике или изменённую настройку, которых ни один сканер не отметит.</p><p>Безопасный путь — <b>пересобрать из заведомо чистого образа</b>, пропатчить, восстановить только данные (проверенные), сменить все учётные данные, хранившиеся на сервере, и закрыть дыру, через которую вошли. Два дня простоя — деловая цена, которую владелец может сравнить с риском повторного заражения, но сравнивать нужно осознанно.</p>`,
    },
    take: { en: `After a compromise, rebuild from a known-good image; a clean scan proves little.`, ru: `После компрометации пересобирайте из чистого образа; чистый скан мало что доказывает.` } },

  { id: 's10-030', kind: 'back', back: 's09-054', k: ['d7-c5', 'd8-c8'], lvl: 2,
    title: { en: `The sandbox again: taking a sample apart`, ru: `Снова песочница: разбор образца` },
    body: {
      en: `<p>Stage 9 used a sandbox to test suspicious files before they reach users. During an incident, the same idea helps the responders.</p><p>An analyst runs the captured malware in an isolated sandbox and watches: which files it touches, which addresses it calls, what it tries to spread through. That answers the questions eradication needs. What do we block? What do we look for on other machines? Does it steal data or only encrypt?</p><p>It also gives a list of <b>indicators</b> (hashes, domains, addresses) to hunt for across the network, and to share with partners. The sample itself stays in the sandbox, never on a normal PC.</p>`,
      ru: `<p>Этап 9 использовал песочницу, чтобы проверять подозрительные файлы до того, как они дойдут до пользователей. Во время инцидента та же идея помогает команде реагирования.</p><p>Аналитик запускает пойманный вредонос в изолированной песочнице и наблюдает: какие файлы он трогает, какие адреса вызывает, через что пытается распространиться. Это отвечает на вопросы, нужные для устранения. Что блокировать? Что искать на других машинах? Он крадёт данные или только шифрует?</p><p>Ещё это даёт список <b>индикаторов</b> (хеши, домены, адреса) для поиска по всей сети и для обмена с партнёрами. Сам образец остаётся в песочнице и никогда не попадает на обычный ПК.</p>`,
    },
    take: { en: `Detonate the sample in a sandbox to learn what to block and what to hunt.`, ru: `Запустите образец в песочнице, чтобы понять, что блокировать и что искать.` } },

  { id: 's10-031', kind: 'idea', k: ['d8-c8'], lvl: 2,
    title: { en: `APT: the attacker who plans to stay`, ru: `APT: атакующий, который собирается остаться` },
    body: {
      en: `<p>WannaCry was loud and fast. An <b>advanced persistent threat</b> (APT) is the opposite:</p><ul><li><b>Advanced</b>: skilled and well funded, often by a state. Custom tools, zero-days when needed.</li><li><b>Persistent</b>: after the first break-in, it quietly sets up several ways back in and stays for months or years.</li><li><b>Threat</b>: a specific group with a goal, usually espionage, sometimes sabotage, like Stuxnet in stage 1.</li></ul><p>For responders this changes the tactics. If you clean one machine while the APT watches, it simply uses another way in. So you scope the whole intrusion quietly first, then cut off every way in at once.</p>`,
      ru: `<p>WannaCry был громким и быстрым. <b>Продвинутая постоянная угроза</b> (APT) — противоположность:</p><ul><li><b>Продвинутая</b>: умелая и хорошо финансируемая, часто государством. Собственные инструменты, уязвимости нулевого дня, когда нужно.</li><li><b>Постоянная</b>: после первого проникновения тихо создаёт несколько путей обратно и остаётся на месяцы или годы.</li><li><b>Угроза</b>: конкретная группа с целью, обычно шпионажем, иногда саботажем, как Stuxnet на этапе 1.</li></ul><p>Для команды реагирования это меняет тактику. Если вычистить одну машину на глазах у APT, она просто войдёт другим путём. Поэтому сначала тихо выясняют масштаб всего вторжения, а потом перекрывают все пути разом.</p>`,
    },
    take: { en: `Against an APT, map the whole intrusion quietly, then cut every way in at once.`, ru: `Против APT тихо очертите всё вторжение, затем перекройте все пути разом.` } },

  { id: 's10-032', kind: 'story', k: ['d8-c8', 'd4-c2'], lvl: 2,
    title: { en: `The $10 domain that slowed WannaCry`, ru: `Домен за 10 долларов, затормозивший WannaCry` },
    body: {
      en: `<p>On the afternoon of 12 May 2017, a young British researcher, Marcus Hutchins, was examining a WannaCry sample. He noticed it tried to contact a long, meaningless domain name that nobody had registered. He registered it for about $10, to watch the infections.</p><p>It turned out WannaCry checked that domain before doing anything. If the domain answered, the malware stopped. Every new infection that could reach it now shut itself down. This <b>kill switch</b> slowed the outbreak sharply, though copies without the check followed.</p><p>Responders use the same idea deliberately: <b>sinkholing</b> redirects malware's domains to a server they control.</p>`,
      ru: `<p>Днём 12 мая 2017 года молодой британский исследователь Маркус Хатчинс изучал образец WannaCry. Он заметил, что тот пытается связаться с длинным бессмысленным доменом, который никто не регистрировал. Он зарегистрировал его примерно за 10 долларов, чтобы наблюдать за заражениями.</p><p>Оказалось, WannaCry проверял этот домен прежде всего. Если домен отвечал, вредонос останавливался. Каждое новое заражение, которое могло до него дотянуться, теперь само себя выключало. Этот <b>аварийный выключатель</b> (kill switch) резко замедлил вспышку, хотя потом появились копии без проверки.</p><p>Команды реагирования используют ту же идею намеренно: <b>sinkholing</b> перенаправляет домены вредоноса на подконтрольный им сервер.</p>`,
    },
    take: { en: `Malware analysis can find a kill switch; sinkholing turns its domains against it.`, ru: `Анализ вредоноса может найти аварийный выключатель; sinkholing обращает его домены против него.` } },

  { id: 's10-033', kind: 'idea', k: ['d7-c4', 'd1-c7'], lvl: 2,
    title: { en: `Recovery: back to normal, carefully`, ru: `Восстановление: назад к норме, осторожно` },
    body: {
      en: `<p>Recovery isn't "switch everything back on":</p><ul><li><b>Order</b>: bring back what the business needs most first. The business impact analysis from stage 1 already ranked it.</li><li><b>Clean sources</b>: rebuild from known-good images, restore data from backups taken before the attacker arrived. Restoring last night's backup may restore the attacker too.</li><li><b>Verify</b>: patched, hardened, credentials changed, the owner confirms it works.</li><li><b>Watch closely</b>: extra monitoring for weeks, because attackers often try to come back.</li></ul><p>The system owner, not the security team, decides when a system is ready to return to production.</p>`,
      ru: `<p>Восстановление — это не «включить всё обратно»:</p><ul><li><b>Порядок</b>: сначала то, что бизнесу нужнее всего. Анализ воздействия на бизнес из этапа 1 это уже ранжировал.</li><li><b>Чистые источники</b>: пересобирать из заведомо чистых образов, восстанавливать данные из бэкапов, сделанных до прихода атакующего. Восстановив бэкап прошлой ночи, можно восстановить и атакующего.</li><li><b>Проверка</b>: пропатчено, усилено, учётные данные сменены, владелец подтверждает, что работает.</li><li><b>Пристальное наблюдение</b>: усиленный мониторинг неделями, потому что атакующие часто пытаются вернуться.</li></ul><p>Когда система готова вернуться в работу, решает её владелец, а не команда безопасности.</p>`,
    },
    take: { en: `Recover in business priority order, from clean sources, verified, and watched.`, ru: `Восстанавливайте по приоритетам бизнеса, из чистых источников, с проверкой и наблюдением.` } },

  { id: 's10-034', kind: 'back', back: 's09-052', k: ['d7-c5', 'd7-c4'], lvl: 2,
    title: { en: `EDR again: the responder's remote hands`, ru: `Снова EDR: удалённые руки команды реагирования` },
    body: {
      en: `<p>Stage 9 introduced EDR as anti-malware that records behaviour. During an incident, its other half matters most: <b>response</b>.</p><ul><li><b>Isolate</b> a host with one click, from anywhere, while keeping the EDR's own connection open.</li><li><b>Search</b> every endpoint at once: "which machines ran this file?" "which ones contacted this domain?"</li><li><b>Collect</b> memory and files remotely for forensics.</li><li><b>Kill</b> processes and delete files across the fleet.</li></ul><p>In 2017, responders without such tools walked from desk to desk unplugging cables. With them, containment across 45,000 PCs takes minutes, if the agents are installed everywhere before the incident.</p>`,
      ru: `<p>Этап 9 представил EDR как антивирус, записывающий поведение. Во время инцидента важнее всего его вторая половина — <b>реагирование</b>.</p><ul><li><b>Изолировать</b> хост одним щелчком откуда угодно, сохранив собственное соединение EDR.</li><li><b>Искать</b> по всем конечным точкам сразу: «на каких машинах запускался этот файл?» «какие обращались к этому домену?»</li><li><b>Собирать</b> память и файлы удалённо для криминалистики.</li><li><b>Завершать</b> процессы и удалять файлы по всему парку.</li></ul><p>В 2017 году команды без таких средств ходили от стола к столу и выдёргивали кабели. С ними сдерживание на 45 000 ПК занимает минуты — если агенты установлены везде до инцидента.</p>`,
    },
    take: { en: `EDR lets responders isolate, search and collect across every endpoint at once.`, ru: `EDR позволяет изолировать, искать и собирать сразу на всех конечных точках.` } },

  { id: 's10-035', kind: 'idea', k: ['d7-c4', 'd1-c4'], lvl: 2,
    title: { en: `Reporting: who needs to know, and when`, ru: `Отчётность: кому нужно знать и когда` },
    body: {
      en: `<p>Reporting runs through the whole incident, not just the end:</p><ul><li><b>Inside</b>: management gets regular, honest updates in business terms: what's affected, what's being done, what decisions are needed.</li><li><b>Regulators</b>: many laws set deadlines from the moment you become aware.</li><li><b>Affected people</b>: customers whose data was exposed, so they can protect themselves.</li><li><b>Partners and contracts</b>: customers, card brands, insurers often require notice within days.</li><li><b>Law enforcement</b>, when management decides to involve them.</li></ul><p>Legal counsel decides what must be reported. The CSIRT's job is to give them accurate facts quickly.</p>`,
      ru: `<p>Отчётность идёт через весь инцидент, а не только в конце:</p><ul><li><b>Внутри</b>: руководство регулярно получает честные сводки на языке бизнеса: что затронуто, что делается, какие нужны решения.</li><li><b>Регуляторы</b>: многие законы задают сроки с момента, когда вы узнали.</li><li><b>Пострадавшие люди</b>: клиенты, чьи данные раскрыты, — чтобы они могли себя защитить.</li><li><b>Партнёры и договоры</b>: клиенты, платёжные системы, страховщики часто требуют уведомления в течение дней.</li><li><b>Правоохранители</b> — если руководство решит их привлечь.</li></ul><p>Что обязательно сообщать, решают юристы. Задача CSIRT — быстро дать им точные факты.</p>`,
    },
    take: { en: `Report continuously inside; outside reporting is set by law and contract, decided with legal.`, ru: `Внутри докладывайте постоянно; внешнюю отчётность задают закон и договоры, решают с юристами.` } },

  { id: 's10-036', kind: 'back', back: 's01-042', k: ['d1-c4', 'd7-c4'], lvl: 2,
    title: { en: `"Let's not tell customers yet", again: the clocks`, ru: `Снова «пока не говорить клиентам»: сроки` },
    body: {
      en: `<p>In stage 1 a manager wanted to keep a data leak quiet until the quarter closed. Here are the clocks that made that a bad idea:</p><ul><li><b>GDPR</b>: tell the supervisory authority within <b>72 hours</b> of becoming aware of a personal data breach, unless it's unlikely to harm anyone. Tell the affected people without undue delay if the risk to them is high.</li><li><b>NIS2</b> (EU essential services): an early warning within <b>24 hours</b>, a notification within 72, a final report within a month.</li><li><b>US listed companies</b>: disclose a material incident within <b>four business days</b> of deciding it's material.</li></ul><p>The clocks start at awareness, so detection speed matters legally too.</p>`,
      ru: `<p>На этапе 1 менеджер хотел скрыть утечку данных до закрытия квартала. Вот сроки, из-за которых это была плохая идея:</p><ul><li><b>GDPR</b>: сообщить надзорному органу в течение <b>72 часов</b> с момента, когда стало известно об утечке персональных данных, если только она вряд ли кому-то навредит. Пострадавшим — без неоправданной задержки, если риск для них высок.</li><li><b>NIS2</b> (важные услуги в ЕС): раннее предупреждение в течение <b>24 часов</b>, уведомление в течение 72, итоговый отчёт в течение месяца.</li><li><b>Публичные компании США</b>: раскрыть существенный инцидент в течение <b>четырёх рабочих дней</b> после признания его существенным.</li></ul><p>Отсчёт начинается с момента осведомлённости, так что скорость обнаружения важна и юридически.</p>`,
    },
    take: { en: `GDPR 72 hours, NIS2 24 then 72, SEC four business days: the clock starts at awareness.`, ru: `GDPR — 72 часа, NIS2 — 24, затем 72, SEC — четыре рабочих дня; отсчёт с момента осведомлённости.` } },

  { id: 's10-037', kind: 'think', k: ['d7-c4', 'd1-c4'], lvl: 1,
    title: { en: `A journalist calls the server room`, ru: `Журналист звонит в серверную` },
    body: {
      en: `<p>Day two of a ransomware incident. A journalist reaches one of your engineers directly: "We hear you've been hacked and customer data is on a leak site. Can you confirm?"</p><p>The engineer knows quite a lot, and thinks honesty is the best policy. What should they say?</p>`,
      ru: `<p>Второй день инцидента с вымогателем. Журналист дозванивается напрямую до одного из ваших инженеров: «Говорят, вас взломали и данные клиентов лежат на сайте утечек. Подтвердите?»</p><p>Инженер знает довольно много и считает, что честность — лучшая политика. Что ему сказать?</p>`,
    },
    reveal: {
      en: `<p>Nothing about the incident, politely: "I'm not the right person; let me give you our press contact." Then tell the incident lead about the call.</p><p>Honesty does matter, but it's delivered by the <b>designated spokesperson</b>, with facts checked by the CSIRT and wording cleared by legal. An engineer's guess, even a correct one, can breach notification rules, tip off the attacker, mislead customers or prejudice an investigation. The communication plan says who speaks; everyone else refers.</p>`,
      ru: `<p>Ничего об инциденте, вежливо: «Я не тот, кто вам нужен; вот контакт нашей пресс-службы». А затем рассказать о звонке руководителю реагирования.</p><p>Честность важна, но её доносит <b>назначенный представитель</b>, с фактами, проверенными CSIRT, и формулировками, согласованными с юристами. Догадка инженера, даже верная, может нарушить правила уведомления, подсказать атакующему, ввести клиентов в заблуждение или навредить расследованию. План коммуникаций говорит, кто говорит; остальные перенаправляют.</p>`,
    },
    take: { en: `Only the designated spokesperson talks to the press; everyone else refers and reports the call.`, ru: `С прессой говорит только назначенный представитель; остальные перенаправляют и сообщают о звонке.` } },

  { id: 's10-038', kind: 'idea', k: ['d7-c4'], lvl: 1,
    title: { en: `Lessons learned: the step everyone skips`, ru: `Извлечённые уроки: шаг, который все пропускают` },
    body: {
      en: `<p>When systems are back, everyone is exhausted and wants to move on. That's exactly when the most valuable step happens: the <b>post-incident review</b>.</p><p>Within a couple of weeks, while memories are fresh, the people involved go through the timeline:</p><ul><li>What happened, and when could we have known?</li><li>What was the <b>root cause</b>, not just the trigger?</li><li>What worked in the response, and what slowed us down?</li><li>What will we change, who owns each change, and by when?</li></ul><p>The output updates the plan, the playbooks and the controls, and goes to management. Skip it, and you'll have the same incident again.</p>`,
      ru: `<p>Когда системы вернулись, все вымотаны и хотят двигаться дальше. Именно тогда наступает самый ценный шаг — <b>разбор после инцидента</b>.</p><p>В течение пары недель, пока память свежа, участники проходят по хронологии:</p><ul><li>Что произошло и когда мы могли узнать?</li><li>Какова <b>первопричина</b>, а не только спусковой крючок?</li><li>Что в реагировании сработало, а что нас тормозило?</li><li>Что мы изменим, кто отвечает за каждое изменение и к какому сроку?</li></ul><p>Итог обновляет план, сценарии и меры защиты и уходит руководству. Пропустите его — и получите тот же инцидент снова.</p>`,
    },
    take: { en: `Review within weeks: root cause, what worked, owned changes with deadlines.`, ru: `Разбор в течение недель: первопричина, что сработало, изменения с владельцами и сроками.` } },

  { id: 's10-039', kind: 'back', back: 's02-030', k: ['d7-c4', 'd1-c14'], lvl: 2,
    title: { en: `No blame again: why the review must be safe`, ru: `Снова без виноватых: почему разбор должен быть безопасным` },
    body: {
      en: `<p>Stage 2 argued that blaming people makes them hide mistakes. A post-incident review is where that matters most.</p><p>If the admin who missed the patch expects to be fired, the review hears a tidy story and the real causes stay hidden: no test environment, a patching window that was always cancelled, one person covering three jobs.</p><p>A <b>blameless review</b> asks "what made this easy to get wrong?" rather than "who did it?" It still finds accountability where there was deliberate misconduct. But most incidents come from systems that made the mistake likely, and only an honest review can fix those.</p>`,
      ru: `<p>Этап 2 утверждал, что поиск виноватых заставляет людей прятать ошибки. Разбор после инцидента — место, где это важнее всего.</p><p>Если администратор, пропустивший патч, ждёт увольнения, разбор услышит гладкую историю, а настоящие причины останутся скрытыми: нет тестовой среды, окно для патчей всегда отменяли, один человек работал за троих.</p><p><b>Разбор без поиска виноватых</b> спрашивает «что сделало эту ошибку лёгкой?», а не «кто это сделал?». Ответственность за умышленные нарушения он всё равно находит. Но большинство инцидентов происходят из систем, в которых ошибка была вероятна, и исправить их может только честный разбор.</p>`,
    },
    take: { en: `Ask what made the mistake easy, not who made it; honesty finds the real cause.`, ru: `Спрашивайте, что облегчило ошибку, а не кто её сделал; честность находит настоящую причину.` } },

  { id: 's10-040', kind: 'back', back: 's03-030', k: ['d2-c7', 'd7-c6'], lvl: 2,
    title: { en: `End of support again: Windows XP in 2017`, ru: `Снова конец поддержки: Windows XP в 2017 году` },
    body: {
      en: `<p>Stage 3 separated end of life from <b>end of support</b>: the day the vendor stops sending security fixes.</p><p>Windows XP's support ended in 2014. In May 2017 many hospitals and factories still ran it, often inside medical devices or machines that couldn't easily be upgraded. The March patch for EternalBlue didn't cover XP.</p><p>The day after WannaCry, Microsoft took the rare step of releasing an emergency patch for XP anyway. You can't plan on that. Unsupported systems need a decision before the outbreak: replace them, isolate them on their own segment, or have management formally accept the risk.</p>`,
      ru: `<p>Этап 3 отделил конец жизни от <b>конца поддержки</b>: дня, когда производитель перестаёт выпускать исправления безопасности.</p><p>Поддержка Windows XP закончилась в 2014 году. В мае 2017 года многие больницы и заводы всё ещё на ней работали, часто внутри медицинских приборов или станков, которые трудно обновить. Мартовский патч от EternalBlue XP не покрывал.</p><p>На следующий день после WannaCry Microsoft сделала редкий шаг и всё же выпустила экстренный патч для XP. Рассчитывать на это нельзя. По неподдерживаемым системам решение нужно до вспышки: заменить, изолировать в отдельном сегменте или формально принять риск руководством.</p>`,
    },
    take: { en: `Unsupported systems need a decision before the outbreak: replace, isolate or accept.`, ru: `По неподдерживаемым системам решайте до вспышки: заменить, изолировать или принять риск.` } },

  { id: 's10-041', kind: 'link', k: ['d7-c4', 'd7-c6', 'd6-c2', 'd4-c8', 'd8-c8', 'd2-c7'], lvl: 2,
    title: { en: `WannaCry replayed with this stage`, ru: `WannaCry заново, с этим этапом` },
    body: {
      en: `<p>Replay a hospital on 12 May 2017 with everything so far:</p><ol><li>The <b>vulnerability loop</b> from stage 9 applied MS17-010 in March, and SMBv1 was turned off.</li><li>Port 445 never crossed the <b>internet firewall</b>.</li><li>The XP machines that couldn't be patched sat in their own <b>segment</b>.</li><li>A <b>playbook</b> for worms said: isolate, don't power off; block SMB between segments.</li><li>Clinicians had <b>paper procedures</b> to keep treating patients during the outage.</li><li>Clean, offline <b>backups</b> made restoring routine.</li><li>A <b>lessons-learned review</b> replaced the unsupported systems by the end of the year.</li></ol>`,
      ru: `<p>Переиграем больницу 12 мая 2017 года со всем, что было до сих пор:</p><ol><li><b>Цикл управления уязвимостями</b> из этапа 9 установил MS17-010 в марте, и SMBv1 был отключён.</li><li>Порт 445 никогда не проходил через <b>внешний межсетевой экран</b>.</li><li>Машины на XP, которые нельзя было пропатчить, стояли в своём <b>сегменте</b>.</li><li><b>Сценарий</b> для червей гласил: изолировать, не выключать; блокировать SMB между сегментами.</li><li>У врачей были <b>бумажные процедуры</b>, чтобы продолжать лечить людей во время сбоя.</li><li>Чистые офлайн-<b>бэкапы</b> сделали восстановление рутиной.</li><li><b>Разбор уроков</b> заменил неподдерживаемые системы к концу года.</li></ol>`,
    },
    take: { en: `Patch, filter, segment, plan, keep working, restore, learn.`, ru: `Патч, фильтрация, сегменты, план, работа вручную, восстановление, уроки.` } },

  { id: 's10-042', kind: 'idea', k: ['d1-c5', 'd7-c1'], lvl: 1,
    title: { en: `When an incident becomes an investigation`, ru: `Когда инцидент становится расследованием` },
    body: {
      en: `<p>Incident response asks "how do we stop this and recover?" Sometimes a second question follows: "who did it, and what happens to them?" That's an <b>investigation</b>.</p><p>It may lead to firing an employee, suing a vendor, a regulator's fine or a criminal trial. Each of those needs <b>evidence</b> that will stand up to challenge, and each has its own rules.</p><p>The trouble is that you rarely know at the start where it will end. An outage that looks like a mistake turns out to be sabotage. So responders handle evidence carefully from the first minute, even when it seems unnecessary.</p>`,
      ru: `<p>Реагирование на инцидент спрашивает: «как это остановить и восстановиться?» Иногда следует второй вопрос: «кто это сделал и что с ним будет?» Это <b>расследование</b>.</p><p>Оно может закончиться увольнением сотрудника, иском к поставщику, штрафом регулятора или уголовным процессом. Каждому из них нужны <b>доказательства</b>, которые выдержат проверку, и у каждого свои правила.</p><p>Беда в том, что в начале редко известно, чем всё кончится. Сбой, похожий на ошибку, оказывается саботажем. Поэтому команда реагирования бережно обращается с доказательствами с первой минуты, даже когда это кажется лишним.</p>`,
    },
    take: { en: `You rarely know where an incident will end, so treat evidence carefully from the start.`, ru: `Чем кончится инцидент, заранее неизвестно, поэтому берегите доказательства с самого начала.` } },

  { id: 's10-043', kind: 'vs', k: ['d1-c5'], lvl: 1,
    title: { en: `Five kinds of investigation`, ru: `Пять видов расследований` },
    body: {
      en: `<ul><li><b>Administrative</b> (operational): internal, about policy violations or what caused an outage. Run by the organisation; the bar is whatever management needs.</li><li><b>Criminal</b>: a possible crime. Led by law enforcement; guilt must be proven <b>beyond a reasonable doubt</b>.</li><li><b>Civil</b>: a dispute between parties, such as a breach of contract. Decided on the <b>preponderance of the evidence</b>: more likely than not.</li><li><b>Regulatory</b>: a government agency checks whether a law or regulation was broken. The standard depends on the regulator.</li><li><b>Industry standards</b>: compliance with a contract-based standard such as PCI DSS.</li></ul>`,
      ru: `<ul><li><b>Административное</b> (операционное): внутреннее, о нарушениях политик или причинах сбоя. Ведёт сама организация; планку задаёт то, что нужно руководству.</li><li><b>Уголовное</b>: возможное преступление. Ведут правоохранители; вину нужно доказать <b>вне разумных сомнений</b>.</li><li><b>Гражданское</b>: спор сторон, например о нарушении договора. Решается по <b>перевесу доказательств</b>: скорее да, чем нет.</li><li><b>Регуляторное</b>: государственный орган проверяет, нарушен ли закон или норматив. Стандарт зависит от регулятора.</li><li><b>По отраслевым стандартам</b>: соответствие договорному стандарту вроде PCI DSS.</li></ul>`,
    },
    take: { en: `Criminal: beyond reasonable doubt. Civil: more likely than not. Administrative: management's call.`, ru: `Уголовное — вне разумных сомнений. Гражданское — скорее да, чем нет. Административное — решает руководство.` } },

  { id: 's10-044', kind: 'think', k: ['d1-c5', 'd7-c1'], lvl: 2,
    title: { en: `"It's only an HR matter"`, ru: `«Это всего лишь вопрос HR»` },
    body: {
      en: `<p>A manager suspects an employee of using a company laptop for a side business, a policy violation. HR asks IT to "have a quick look" at the laptop. The technician plans to log in as an admin and browse through the files.</p><p>As you look, you find signs that the employee may also be selling customer data. What changes, and what should have been done from the start?</p>`,
      ru: `<p>Руководитель подозревает, что сотрудник использует рабочий ноутбук для подработки, — нарушение политики. HR просит ИТ «быстро глянуть» ноутбук. Техник собирается войти под админом и полистать файлы.</p><p>По ходу находятся признаки того, что сотрудник, возможно, ещё и продаёт данные клиентов. Что меняется и что нужно было сделать с самого начала?</p>`,
    },
    reveal: {
      en: `<p>The case may now be <b>criminal</b>, with the highest standard of proof, and possibly regulatory too. Browsing as admin has already changed timestamps on the files, which a defence lawyer can use to challenge everything found.</p><p>From the start: treat any investigation that <i>might</i> become criminal to criminal standards. Take a forensic image with a write blocker, hash it, record the chain of custody, and examine only the copy. Now stop, preserve what you have, and escalate to management and legal, who decide whether to involve law enforcement.</p>`,
      ru: `<p>Дело теперь может стать <b>уголовным</b>, с самым высоким стандартом доказывания, а возможно, и регуляторным. Просмотр под админом уже изменил отметки времени у файлов, и адвокат может этим оспорить всё найденное.</p><p>С самого начала: любое расследование, которое <i>может</i> стать уголовным, ведите по уголовным стандартам. Снимите криминалистический образ с блокиратором записи, вычислите хеш, ведите цепочку хранения и исследуйте только копию. Сейчас — остановитесь, сохраните то, что есть, и передайте руководству и юристам: они решат, привлекать ли правоохранителей.</p>`,
    },
    take: { en: `If it might become criminal, handle evidence to criminal standards from the start.`, ru: `Если дело может стать уголовным, обращайтесь с доказательствами по уголовным стандартам с самого начала.` } },

  { id: 's10-045', kind: 'idea', k: ['d7-c1'], lvl: 1,
    title: { en: `What makes evidence usable in court`, ru: `Что делает доказательство пригодным для суда` },
    body: {
      en: `<p>A log file proves nothing if a court won't accept it. To be <b>admissible</b>, evidence must be:</p><ul><li><b>Relevant</b>: it relates to the facts of the case.</li><li><b>Material</b>: it matters to what the court must decide.</li><li><b>Competent</b>: it was obtained legally and is reliable.</li></ul><p>Beyond that, it should be <b>authentic</b> (it is what you say it is), <b>accurate</b>, <b>complete</b> (not just the lines that suit you) and <b>convincing</b>.</p><p>Most of these are won or lost in the first hours of an incident, by the people who collect the evidence, long before any lawyer sees it.</p>`,
      ru: `<p>Файл журнала ничего не доказывает, если суд его не примет. Чтобы быть <b>допустимым</b>, доказательство должно быть:</p><ul><li><b>Относимым</b> (relevant): связанным с фактами дела.</li><li><b>Существенным</b> (material): важным для того, что должен решить суд.</li><li><b>Компетентным</b> (competent): полученным законно и надёжным.</li></ul><p>Кроме того, оно должно быть <b>подлинным</b> (оно то, чем вы его называете), <b>точным</b>, <b>полным</b> (а не только удобные строки) и <b>убедительным</b>.</p><p>Большая часть этого выигрывается или проигрывается в первые часы инцидента, теми, кто собирает доказательства, задолго до того, как их увидит юрист.</p>`,
    },
    take: { en: `Admissible evidence is relevant, material and competent; collectors decide that early.`, ru: `Допустимое доказательство относимо, существенно и компетентно; это решается при сборе.` } },

  { id: 's10-046', kind: 'vs', k: ['d7-c1'], lvl: 2,
    title: { en: `Kinds of evidence, and the rules about them`, ru: `Виды доказательств и правила о них` },
    body: {
      en: `<ul><li><b>Real</b> evidence: physical objects, such as a laptop, a USB stick or a hard drive.</li><li><b>Documentary</b>: written records, including logs, emails and source code.</li><li><b>Testimonial</b>: what a witness says, in person or in a statement.</li></ul><p>Three rules come up often:</p><ul><li><b>Best evidence rule</b>: the original document is preferred over a copy.</li><li><b>Parol evidence rule</b>: a written contract is assumed to be the whole agreement; talk about other promises doesn't change it.</li><li><b>Hearsay</b>: second-hand statements are usually inadmissible. Logs made automatically in the normal course of business can be an exception.</li></ul>`,
      ru: `<ul><li><b>Вещественные</b>: физические предметы — ноутбук, флешка, жёсткий диск.</li><li><b>Документальные</b>: записи, включая журналы, письма и исходный код.</li><li><b>Свидетельские</b>: то, что говорит свидетель, лично или в показаниях.</li></ul><p>Часто встречаются три правила:</p><ul><li><b>Правило лучшего доказательства</b>: оригинал документа предпочтительнее копии.</li><li><b>Parol evidence rule</b>: письменный договор считается полным соглашением; разговоры о других обещаниях его не меняют.</li><li><b>Показания с чужих слов</b> (hearsay) обычно недопустимы. Журналы, создаваемые автоматически в обычном ходе деятельности, могут быть исключением.</li></ul>`,
    },
    take: { en: `Real, documentary, testimonial; originals preferred; logs can escape the hearsay rule.`, ru: `Вещественные, документальные, свидетельские; предпочтителен оригинал; журналы могут обойти правило hearsay.` } },

  { id: 's10-047', kind: 'picture', k: ['d7-c1'], lvl: 1,
    title: { en: `Chain of custody: every hand, written down`, ru: `Цепочка хранения: каждая рука — на бумаге` },
    body: {
      en: `<p>The <b>chain of custody</b> is a record that follows each piece of evidence from the moment it's collected: who took it, when, where it was stored, and every handover after that. It proves nobody could have tampered with it. One unexplained gap, such as a drive left on a desk overnight, lets the other side argue it was altered, and the evidence may be thrown out.</p>`,
      ru: `<p><b>Цепочка хранения</b> (chain of custody) — запись, сопровождающая каждое доказательство с момента сбора: кто его взял, когда, где оно хранилось, и каждая передача после этого. Она доказывает, что никто не мог его подменить. Один необъяснённый пробел, например диск, оставленный на ночь на столе, позволяет другой стороне утверждать, что его изменили, и доказательство могут отклонить.</p>`,
    },
    dg: { title: { en: `Chain of custody`, ru: `Цепочка хранения` }, h: 290,
      zones: [[20, 175, 720, 100, { en: 'Logged at every step: who, when, why', ru: 'Записано на каждом шаге: кто, когда, зачем' }, 'trust']],
      nodes: [
        ['col', 100, 80, { en: 'Collect', ru: 'Сбор' }, { en: 'hash, photo', ru: 'хеш, фото' }, '🧤', 'key'],
        ['tag', 285, 80, { en: 'Seal & tag', ru: 'Опечатать' }, { en: 'evidence bag', ru: 'пакет для улик' }, '🏷️', 'ok'],
        ['sto', 470, 80, { en: 'Store', ru: 'Хранение' }, { en: 'locked, logged', ru: 'под замком' }, '🔒', 'ok'],
        ['ana', 655, 80, { en: 'Analyse', ru: 'Анализ' }, { en: 'on a copy', ru: 'на копии' }, '🔬', 'ok'],
        ['log', 380, 225, { en: 'Custody form', ru: 'Форма хранения' }, { en: 'every handover signed', ru: 'каждая передача подписана' }, '📝', 'dim', 260],
      ],
      edges: [['col', 'tag', '', 'ok'], ['tag', 'sto', '', 'ok'], ['sto', 'ana', '', 'ok'], ['col', 'log', '', 'dash'], ['ana', 'log', '', 'dash']],
      note: { en: `The original stays sealed; analysts work on verified copies.`, ru: `Оригинал остаётся опечатанным; аналитики работают с проверенными копиями.` } },
    take: { en: `Record who held the evidence at every moment; one gap can sink the case.`, ru: `Записывайте, у кого было доказательство в каждый момент; один пробел может провалить дело.` } },

  { id: 's10-048', kind: 'idea', k: ['d7-c1'], lvl: 2,
    title: { en: `The forensic process: never work on the original`, ru: `Криминалистический процесс: никогда не работать с оригиналом` },
    body: {
      en: `<p>Digital forensics follows a fixed order:</p><ol><li><b>Identify</b> what may hold evidence: disks, phones, cloud accounts, logs.</li><li><b>Preserve</b> it: connect the original disk through a <b>write blocker</b>, a device that lets data be read but never written, and make a <b>bit-for-bit image</b>.</li><li><b>Collect</b> it with the chain of custody.</li><li><b>Examine and analyse</b> the <b>copy</b>, never the original.</li><li><b>Present</b> the findings in a report others can check.</li></ol><p>Just booting a suspect's computer writes hundreds of files. The write blocker and the image exist so that the original stays exactly as it was found.</p>`,
      ru: `<p>Цифровая криминалистика идёт в строгом порядке:</p><ol><li><b>Идентифицировать</b>, что может содержать доказательства: диски, телефоны, облачные учётки, журналы.</li><li><b>Сохранить</b>: подключить исходный диск через <b>блокиратор записи</b> — устройство, позволяющее читать данные, но никогда не писать, — и снять <b>побитовый образ</b>.</li><li><b>Собрать</b> с цепочкой хранения.</li><li><b>Исследовать и анализировать</b> <b>копию</b>, никогда не оригинал.</li><li><b>Представить</b> выводы в отчёте, который другие могут проверить.</li></ol><p>Одна загрузка компьютера подозреваемого записывает сотни файлов. Блокиратор записи и образ нужны, чтобы оригинал остался точно таким, каким его нашли.</p>`,
    },
    take: { en: `Identify, preserve (write blocker, image), collect, analyse the copy, present.`, ru: `Идентифицировать, сохранить (блокиратор, образ), собрать, анализировать копию, представить.` } },

  { id: 's10-049', kind: 'back', back: 's06-022', k: ['d3-c8', 'd7-c1'], lvl: 2,
    title: { en: `Hashing again: proving the copy is exact`, ru: `Снова хеширование: доказать, что копия точная` },
    body: {
      en: `<p>Stage 6 described a hash as a fingerprint: change one bit and it changes completely.</p><p>Forensics uses exactly that. The examiner hashes the original disk, say with SHA-256, and writes the value on the custody form. Then they hash the image. If the two match, the copy is bit-for-bit identical.</p><p>Months later in court, anyone can hash the original and the image again. Same values: nothing has changed since collection. This is why MD5 alone is no longer trusted for evidence: collisions can be made, so modern tools record SHA-256, often alongside the older hashes.</p>`,
      ru: `<p>Этап 6 описал хеш как отпечаток: измените один бит — и он изменится полностью.</p><p>Криминалистика пользуется именно этим. Эксперт вычисляет хеш исходного диска, например SHA-256, и записывает значение в форму хранения. Затем вычисляет хеш образа. Если они совпали, копия побитово идентична.</p><p>Через месяцы в суде любой может снова вычислить хеши оригинала и образа. Те же значения — значит, с момента сбора ничего не изменилось. Поэтому одному MD5 для доказательств больше не доверяют: коллизии можно создать, и современные средства записывают SHA-256, часто рядом со старыми хешами.</p>`,
    },
    take: { en: `Hash the original and the image; matching values prove an exact, unchanged copy.`, ru: `Хешируйте оригинал и образ; совпадение доказывает точную неизменённую копию.` } },

  { id: 's10-050', kind: 'picture', k: ['d7-c1', 'd7-c4'], lvl: 2,
    title: { en: `Order of volatility: collect what vanishes first`, ru: `Порядок волатильности: сначала то, что исчезает` },
    body: {
      en: `<p>Some evidence lasts years; some disappears when the power goes off or within seconds. Collect in the <b>order of volatility</b>, from most to least fleeting. That's why the first responder isolates a machine rather than shutting it down: memory holds running processes, network connections and sometimes encryption keys, and none of it survives a reboot.</p>`,
      ru: `<p>Одни доказательства живут годами, другие исчезают при выключении питания или за секунды. Собирайте в <b>порядке волатильности</b> — от самого летучего к самому стойкому. Поэтому первый на месте изолирует машину, а не выключает её: в памяти — запущенные процессы, сетевые соединения, иногда ключи шифрования, и ничего из этого не переживёт перезагрузку.</p>`,
    },
    dg: { title: { en: `Order of volatility (collect top first)`, ru: `Порядок волатильности (сначала верх)` }, h: 320,
      nodes: [
        ['cpu', 380, 40, { en: 'CPU registers, cache', ru: 'Регистры, кэш ЦП' }, { en: 'nanoseconds', ru: 'наносекунды' }, '⚡', 'bad', 300],
        ['ram', 380, 100, { en: 'RAM, ARP & process tables', ru: 'ОЗУ, таблицы ARP и процессов' }, { en: 'gone at power-off', ru: 'исчезают при выключении' }, '🧠', 'bad', 340],
        ['tmp', 380, 160, { en: 'Temp files, swap', ru: 'Временные файлы, подкачка' }, { en: 'overwritten soon', ru: 'скоро перезапишутся' }, '🔄', 'key', 340],
        ['disk', 380, 220, { en: 'Disk', ru: 'Диск' }, { en: 'image with a write blocker', ru: 'образ через блокиратор' }, '💽', 'ok', 340],
        ['arch', 380, 280, { en: 'Remote logs, backups, archives', ru: 'Удалённые журналы, бэкапы, архивы' }, { en: 'days to years', ru: 'от дней до лет' }, '🗄️', 'dim', 360],
      ],
      edges: [['cpu', 'ram', '', 'dash'], ['ram', 'tmp', '', 'dash'], ['tmp', 'disk', '', 'dash'], ['disk', 'arch', '', 'dash']],
      note: { en: `Pulling the plug skips straight to the disk and loses everything above it.`, ru: `Выдернуть вилку — значит сразу перейти к диску и потерять всё, что выше.` } },
    take: { en: `Registers, memory, temp, disk, remote logs: most fleeting first.`, ru: `Регистры, память, временные файлы, диск, удалённые журналы: сначала самое летучее.` } },

  { id: 's10-051', kind: 'think', k: ['d7-c1', 'd7-c4'], lvl: 2,
    title: { en: `The admin who tidied up`, ru: `Админ, который навёл порядок` },
    body: {
      en: `<p>Overnight, attackers created two admin accounts on a file server. In the morning, before telling anyone, the server's admin deleted the accounts, removed a strange script, cleared the security log "because it was full of junk", and rebooted. He reports it proudly: "Sorted, no harm done."</p><p>What's the problem, and what now?</p>`,
      ru: `<p>Ночью атакующие создали на файловом сервере две админские учётки. Утром, никому не сказав, администратор сервера удалил учётки, стёр странный скрипт, очистил журнал безопасности, «потому что он был забит мусором», и перезагрузил сервер. Он с гордостью докладывает: «Разобрался, вреда нет».</p><p>В чём проблема и что теперь?</p>`,
    },
    reveal: {
      en: `<p>He meant well, but he destroyed most of the evidence: the script that showed what the attackers did, the log that showed how they got in, and the memory that showed what was running. Nobody can now say whether data left, or whether other systems were touched. "No harm done" is a guess.</p><p>Now: open an incident, preserve what's left (disk image, remote copies of logs in the SIEM, the firewall's records), and look for the same accounts and script elsewhere. Then fix the process, not the person: training, and a rule to report first and change nothing.</p>`,
      ru: `<p>Он хотел как лучше, но уничтожил большую часть доказательств: скрипт, показывавший, что делали атакующие, журнал, показывавший, как они вошли, и память, показывавшую, что работало. Теперь никто не скажет, утекли ли данные и затронуты ли другие системы. «Вреда нет» — догадка.</p><p>Теперь: открыть инцидент, сохранить оставшееся (образ диска, удалённые копии журналов в SIEM, записи межсетевого экрана) и искать те же учётки и скрипт в других местах. Затем исправить процесс, а не человека: обучение и правило «сначала сообщи, ничего не меняй».</p>`,
    },
    take: { en: `Report first and change nothing; well-meant clean-up destroys the evidence.`, ru: `Сначала сообщите и ничего не меняйте; уборка из лучших побуждений уничтожает доказательства.` } },

  { id: 's10-052', kind: 'back', back: 's03-028', k: ['d2-c7', 'd7-c1'], lvl: 2,
    title: { en: `Legal hold again: stop the automatic deletion`, ru: `Снова юридическое удержание: остановите автоудаление` },
    body: {
      en: `<p>Stage 3 showed that retention rules delete data on schedule, and that a <b>legal hold</b> suspends them once litigation or an investigation is reasonably expected.</p><p>Incidents trigger this more often than people think. The moment legal counsel says a lawsuit or regulator is likely, the data that might matter must be kept: mailboxes, logs, chat, backups due to be overwritten.</p><p>In practice the danger is automation. A SIEM that keeps 90 days, a backup rotation, a mailbox policy that empties trash: each will quietly destroy evidence unless someone switches it off for the systems in scope, and writes down that they did.</p>`,
      ru: `<p>Этап 3 показал, что правила хранения удаляют данные по графику, а <b>юридическое удержание</b> (legal hold) приостанавливает их, как только разумно ожидать суда или расследования.</p><p>Инциденты запускают его чаще, чем думают. Как только юристы говорят, что вероятен иск или регулятор, нужные данные следует сохранить: почтовые ящики, журналы, чаты, бэкапы, которые вот-вот перезапишутся.</p><p>На практике опасность — автоматика. SIEM, хранящий 90 дней, ротация бэкапов, политика почты, очищающая корзину: каждая тихо уничтожит доказательства, если никто не отключит её для систем в рамках и не запишет, что сделал это.</p>`,
    },
    take: { en: `When legal expects a case, suspend automatic deletion for everything that might matter.`, ru: `Когда юристы ждут дела, приостановите автоудаление всего, что может понадобиться.` } },

  { id: 's10-053', kind: 'idea', k: ['d7-c1', 'd1-c5'], lvl: 2,
    title: { en: `eDiscovery: finding the needle you must hand over`, ru: `eDiscovery: найти иголку, которую нужно передать` },
    body: {
      en: `<p>In a lawsuit, each side can demand the other's relevant records. With millions of emails and files, that's a project of its own: <b>electronic discovery</b>.</p><p>The Electronic Discovery Reference Model (<b>EDRM</b>) lays out its steps:</p><ol><li>Information governance (knowing what you have, before any case)</li><li>Identification</li><li>Preservation</li><li>Collection</li><li>Processing (removing duplicates, extracting text)</li><li>Review</li><li>Analysis</li><li>Production (handing it over)</li><li>Presentation</li></ol><p>The first step is the cheapest. An organisation with a data inventory and retention rules finds what it needs in days; one without spends months and a fortune.</p>`,
      ru: `<p>В судебном споре каждая сторона может потребовать у другой относящиеся к делу записи. При миллионах писем и файлов это отдельный проект — <b>электронное раскрытие</b> (eDiscovery).</p><p>Модель Electronic Discovery Reference Model (<b>EDRM</b>) задаёт шаги:</p><ol><li>Управление информацией (знать, что у вас есть, ещё до любого дела)</li><li>Идентификация</li><li>Сохранение</li><li>Сбор</li><li>Обработка (удаление дубликатов, извлечение текста)</li><li>Просмотр</li><li>Анализ</li><li>Предоставление</li><li>Представление</li></ol><p>Первый шаг самый дешёвый. Организация с реестром данных и правилами хранения находит нужное за дни; без них — за месяцы и большие деньги.</p>`,
    },
    take: { en: `eDiscovery starts with information governance; knowing your data makes it cheap.`, ru: `eDiscovery начинается с управления информацией; знание своих данных делает его дешёвым.` } },

  { id: 's10-054', kind: 'back', back: 's09-056', k: ['d7-c1', 'd7-c5'], lvl: 2,
    title: { en: `The honeypot again: enticement vs entrapment`, ru: `Снова приманка: соблазнение и провокация` },
    body: {
      en: `<p>Stage 9 warned against a honeypot that offered free films. Here is the legal line behind that warning:</p><ul><li><b>Enticement</b>: making it easy for someone who already intends to break in, and watching. A server that looks vulnerable is enticement. It's legal and ethical, and what you record can be used.</li><li><b>Entrapment</b>: persuading someone to commit a crime they didn't intend, for example advertising "free confidential data, come and take it". It's illegal for law enforcement, a poor defence for a company, and it can make the evidence useless.</li></ul><p>Rule: offer an open door, never an invitation.</p>`,
      ru: `<p>Этап 9 предостерегал от приманки, предлагавшей бесплатные фильмы. Вот юридическая граница за этим предупреждением:</p><ul><li><b>Соблазнение</b> (enticement): облегчить задачу тому, кто уже намерен взломать, и наблюдать. Сервер, который выглядит уязвимым, — соблазнение. Это законно и этично, а записанное можно использовать.</li><li><b>Провокация</b> (entrapment): склонить человека к преступлению, которого он не замышлял, например объявить «бесплатные секретные данные, приходите и берите». Для правоохранителей это незаконно, для компании — плохая позиция, и доказательства могут стать бесполезными.</li></ul><p>Правило: предлагайте открытую дверь, а не приглашение.</p>`,
    },
    take: { en: `Enticement watches someone already intent; entrapment creates the crime.`, ru: `Соблазнение наблюдает за уже намеренным; провокация создаёт преступление.` } },

  { id: 's10-055', kind: 'idea', k: ['d7-c1', 'd1-c5'], lvl: 2,
    title: { en: `Every contact leaves a trace`, ru: `Любой контакт оставляет след` },
    body: {
      en: `<p>A French criminologist, Edmond Locard, put it simply: a criminal always leaves something at the scene and takes something away. This is <b>Locard's exchange principle</b>, and it holds online too. An intruder leaves log entries, files, registry changes and network connections; they take away data, and sometimes tools that point back to them.</p><p>Investigators also look at <b>MOM</b>:</p><ul><li><b>Motive</b>: why would someone do this?</li><li><b>Opportunity</b>: who had access, and when?</li><li><b>Means</b>: who had the skills and tools?</li></ul><p>For insiders, opportunity is often the strongest clue, which is why access logs matter so much.</p>`,
      ru: `<p>Французский криминалист Эдмон Локар сформулировал просто: преступник всегда что-то оставляет на месте и что-то уносит. Это <b>принцип обмена Локара</b>, и в сети он тоже работает. Взломщик оставляет записи в журналах, файлы, изменения реестра и сетевые соединения; уносит данные, а иногда и инструменты, указывающие на него.</p><p>Следователи смотрят и на <b>MOM</b>:</p><ul><li><b>Мотив</b> (motive): зачем кому-то это делать?</li><li><b>Возможность</b> (opportunity): у кого был доступ и когда?</li><li><b>Средства</b> (means): у кого были навыки и инструменты?</li></ul><p>У инсайдеров самая сильная улика — часто возможность, поэтому журналы доступа так важны.</p>`,
    },
    take: { en: `Locard: every contact leaves a trace. MOM: motive, opportunity, means.`, ru: `Локар: любой контакт оставляет след. MOM: мотив, возможность, средства.` } },

  { id: 's10-056', kind: 'think', k: ['d1-c5', 'd7-c4'], lvl: 2,
    title: { en: `Call the police?`, ru: `Звонить в полицию?` },
    body: {
      en: `<p>Your investigation shows that an outside group broke in and stole customer data. The security team wants to report it to law enforcement right away. The head of communications worries: "If we call the police, it'll be public, and they might seize our servers."</p><p>Who decides, and what do they weigh?</p>`,
      ru: `<p>Расследование показало, что внешняя группа взломала вас и украла данные клиентов. Команда безопасности хочет немедленно сообщить правоохранителям. Руководитель коммуникаций беспокоится: «Если позвоним в полицию, всё станет публичным, и они могут изъять наши серверы».</p><p>Кто решает и что нужно взвесить?</p>`,
    },
    reveal: {
      en: `<p><b>Senior management decides, with legal counsel</b>, ideally under a policy written in advance. Neither the security team nor communications decides alone.</p><p>For: law enforcement can get information from other countries and providers that you can't, may already know the group, and sometimes recovers money, as the FBI did for Colonial Pipeline. Some laws and regulators expect a report.</p><p>Against: less control over timing and publicity, and possible disruption. In practice, agencies usually work to limit disruption to victims. Whatever is decided, the evidence must already have been handled to criminal standards.</p>`,
      ru: `<p><b>Решает высшее руководство вместе с юристами</b>, в идеале по заранее написанной политике. Ни команда безопасности, ни коммуникации не решают в одиночку.</p><p>За: правоохранители могут получить сведения из других стран и от провайдеров, недоступные вам, могут уже знать группу и иногда возвращают деньги, как ФБР для Colonial Pipeline. Некоторые законы и регуляторы ожидают заявления.</p><p>Против: меньше контроля над сроками и оглаской, возможные помехи работе. На практике ведомства обычно стараются меньше мешать жертвам. Что бы ни решили, с доказательствами уже должны были обращаться по уголовным стандартам.</p>`,
    },
    take: { en: `Involving law enforcement is management's decision with legal, best set by policy in advance.`, ru: `Привлекать ли правоохранителей — решает руководство с юристами, лучше по заранее заданной политике.` } },

  { id: 's10-057', kind: 'idea', k: ['d8-c8', 'd1-c5'], lvl: 2,
    title: { en: `Who did it? Attribution is slow and rarely yours`, ru: `Кто это сделал? Атрибуция медленная и редко ваша задача` },
    body: {
      en: `<p>Victims want to know who attacked them. Answering with confidence takes time, intelligence sources and often governments.</p><p>The US and UK publicly blamed <b>North Korea</b> for WannaCry in December 2017, seven months later. They blamed <b>Russia's military intelligence</b> for NotPetya in February 2018, and in 2020 the US Justice Department charged six GRU officers over it and other attacks.</p><p>Attackers also plant false clues: code borrowed from other groups, comments in another language. For a company, the useful question is rarely "which country?" but "what did they do, how did they get in, and are they still here?"</p>`,
      ru: `<p>Жертвы хотят знать, кто их атаковал. Уверенный ответ требует времени, разведывательных источников, а часто и государств.</p><p>США и Великобритания публично обвинили в WannaCry <b>Северную Корею</b> в декабре 2017 года, через семь месяцев. В NotPetya они обвинили <b>военную разведку России</b> в феврале 2018 года, а в 2020 году Министерство юстиции США предъявило обвинения шести офицерам ГРУ за эту и другие атаки.</p><p>Атакующие ещё и подбрасывают ложные улики: код, позаимствованный у других групп, комментарии на другом языке. Для компании полезный вопрос редко «какая страна?», а скорее «что они сделали, как вошли и здесь ли они ещё?»</p>`,
    },
    take: { en: `Leave attribution to governments; focus on what happened, how, and whether they're still in.`, ru: `Атрибуцию оставьте государствам; ваше — что случилось, как и здесь ли они ещё.` } },

  { id: 's10-058', kind: 'think', k: ['d1-c6', 'd7-c4'], lvl: 1,
    title: { en: `"Let's hack them back"`, ru: `«Давайте взломаем их в ответ»` },
    body: {
      en: `<p>During an attack, your team traces the stolen data to a server abroad. A talented engineer says: "I can get into that box tonight and delete our files. We'd have our data back before the lawyers have even woken up."</p><p>What do you say?</p>`,
      ru: `<p>Во время атаки команда отследила украденные данные до сервера за границей. Талантливый инженер говорит: «Я могу сегодня ночью войти на этот сервер и стереть наши файлы. Данные вернутся раньше, чем проснутся юристы».</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p><b>No.</b> Breaking into someone else's computer is a crime almost everywhere, whatever your reason. The server may also belong to an innocent third party whose machine the attackers hijacked, such as a hospital or a small business, and your "deletion" could harm them. It might destroy evidence and alert the attackers.</p><p>Pass what you found to management and legal. They can involve law enforcement and the hosting provider, who can act lawfully. The Code of Ethics asks members to act <b>legally</b>: good intentions don't change that.</p>`,
      ru: `<p><b>Нет.</b> Проникновение в чужой компьютер почти везде преступление, какой бы ни была причина. Сервер может принадлежать невинной третьей стороне, чью машину захватили атакующие, например больнице или маленькой фирме, и ваше «удаление» может ей навредить. Оно может уничтожить доказательства и спугнуть атакующих.</p><p>Передайте найденное руководству и юристам. Они могут привлечь правоохранителей и хостинг-провайдера, которые действуют законно. Кодекс этики требует действовать <b>законно</b>: добрые намерения этого не меняют.</p>`,
    },
    take: { en: `Never hack back: it's illegal, may hit an innocent party, and ruins evidence.`, ru: `Никогда не взламывайте в ответ: это незаконно, может задеть невиновных и губит доказательства.` } },

  { id: 's10-059', kind: 'idea', k: ['d1-c9', 'd1-c4', 'd8-c8'], lvl: 2,
    title: { en: `Cyber insurance and the "act of war"`, ru: `Киберстрахование и «военные действия»` },
    body: {
      en: `<p>Transferring risk to an insurer, from stage 1, is a real option for incidents. But read the policy before you need it.</p><p>Merck, the drug maker, lost hundreds of millions to NotPetya and claimed on its property insurance. The insurers refused, citing the policy's <b>war exclusion</b>: governments had blamed the Russian military. Merck sued, and in 2022 a New Jersey court ruled the exclusion didn't apply to a cyberattack like this; the parties settled in 2024.</p><p>Since then, insurers have written explicit exclusions for state-backed attacks. Policies also often require approved response firms and prompt notice, so the insurer belongs on the incident contact list.</p>`,
      ru: `<p>Передача риска страховщику из этапа 1 — реальный вариант для инцидентов. Но прочитайте полис до того, как он понадобится.</p><p>Фармацевтическая компания Merck потеряла из-за NotPetya сотни миллионов и обратилась по страховке имущества. Страховщики отказали, сославшись на <b>исключение для военных действий</b>: правительства обвинили российских военных. Merck подала в суд, и в 2022 году суд Нью-Джерси постановил, что исключение к такой кибератаке не применяется; в 2024 году стороны урегулировали спор.</p><p>С тех пор страховщики прописывают явные исключения для атак при поддержке государств. Полисы часто требуют ещё и одобренных фирм реагирования и быстрого уведомления, так что страховщику место в списке контактов на случай инцидента.</p>`,
    },
    take: { en: `Insurance transfers incident risk, but its exclusions and notice rules must be known in advance.`, ru: `Страховка передаёт риск, но её исключения и правила уведомления нужно знать заранее.` } },

  { id: 's10-060', kind: 'back', back: 's05-014', k: ['d4-c6', 'd4-c3', 'd7-c4'], lvl: 2,
    title: { en: `The DDoS again, now with a playbook`, ru: `Снова DDoS, теперь со сценарием` },
    body: {
      en: `<p>In stage 5 a 200 Gbps flood swamped a 10 Gbps link, and the answer wasn't a bigger firewall but help upstream. As an incident, it gets a playbook:</p><ul><li><b>Detect</b>: is it an attack, or a sale that went viral? Traffic patterns, SYN floods, one source country.</li><li><b>Contain</b>: call the ISP or the DDoS scrubbing service, numbers in the plan; switch on rate limiting and SYN cookies.</li><li><b>Watch for a smoke screen</b>: attackers sometimes run a DDoS to distract the SOC while they break in elsewhere.</li><li><b>Report</b>: customers see the outage, so communications starts early.</li></ul>`,
      ru: `<p>На этапе 5 поток в 200 Гбит/с захлестнул канал в 10 Гбит/с, и ответом был не мощный межсетевой экран, а помощь выше по течению. Как инцидент он получает сценарий:</p><ul><li><b>Обнаружить</b>: это атака или распродажа, ставшая вирусной? Картина трафика, SYN-флуд, одна страна-источник.</li><li><b>Сдержать</b>: позвонить провайдеру или в службу очистки от DDoS — номера в плане; включить ограничение скорости и SYN cookies.</li><li><b>Помнить о дымовой завесе</b>: иногда DDoS устраивают, чтобы отвлечь SOC, пока взламывают в другом месте.</li><li><b>Сообщить</b>: клиенты видят сбой, поэтому коммуникации начинаются рано.</li></ul>`,
    },
    take: { en: `A DDoS playbook: confirm, call upstream, watch for a distraction, communicate early.`, ru: `Сценарий DDoS: подтвердить, звонить наверх по течению, искать отвлечение, сообщать рано.` } },

  { id: 's10-061', kind: 'idea', k: ['d7-c4', 'd7-c2'], lvl: 2,
    title: { en: `Playbooks and SOAR: the first ten minutes, written down`, ru: `Сценарии и SOAR: первые десять минут на бумаге` },
    body: {
      en: `<p>A <b>playbook</b> is a step-by-step guide for one type of incident: phishing, ransomware, lost laptop, compromised cloud key. It lists what to check, what to contain, who to call and what to record. At 3 a.m., a tired analyst follows it instead of improvising.</p><p>Stage 9's <b>SOAR</b> tools turn the routine steps into automation. For a reported phishing email: pull the same message from every mailbox, block the link, check who clicked, reset their sessions. That takes seconds instead of an hour.</p><p>Automation handles the repeatable part. Decisions with business impact stay with people.</p>`,
      ru: `<p><b>Сценарий</b> (playbook) — пошаговое руководство для одного типа инцидента: фишинг, вымогатель, потерянный ноутбук, скомпрометированный облачный ключ. В нём — что проверить, что сдержать, кому звонить и что записать. В 3 часа ночи уставший аналитик следует ему, а не импровизирует.</p><p>Инструменты <b>SOAR</b> из этапа 9 превращают рутинные шаги в автоматику. Для письма, о котором сообщили как о фишинге: убрать такое же письмо из всех ящиков, заблокировать ссылку, проверить, кто кликнул, сбросить их сессии. Секунды вместо часа.</p><p>Автоматика берёт повторяемую часть. Решения, влияющие на бизнес, остаются за людьми.</p>`,
    },
    take: { en: `Playbooks guide people through each incident type; SOAR automates the routine steps.`, ru: `Сценарии ведут людей по каждому типу инцидента; SOAR автоматизирует рутину.` } },

  { id: 's10-062', kind: 'vs', k: ['d7-c4', 'd1-c13'], lvl: 2,
    title: { en: `Central, distributed or outsourced response team`, ru: `Центральная, распределённая или внешняя команда` },
    body: {
      en: `<ul><li><b>Central</b>: one team handles incidents for the whole organisation. Simple and consistent; fits most mid-sized companies.</li><li><b>Distributed</b>: several teams, for example per region or business unit, with central coordination. Fits large, spread-out groups.</li><li><b>Coordinating</b>: a team that advises other teams without direct authority over them, like a national CERT.</li></ul><p>Staffing is a separate choice: in-house, partly outsourced (a <b>retainer</b> with a response firm for big incidents), or fully outsourced. Even when outsourced, the organisation keeps the <b>accountability</b> and the decisions: the vendor brings hands and skills.</p>`,
      ru: `<ul><li><b>Центральная</b>: одна команда ведёт инциденты для всей организации. Просто и единообразно; подходит большинству средних компаний.</li><li><b>Распределённая</b>: несколько команд, например по регионам или подразделениям, с центральной координацией. Подходит крупным разбросанным группам.</li><li><b>Координирующая</b>: команда, которая советует другим командам без прямой власти над ними, как национальный CERT.</li></ul><p>Укомплектование — отдельный выбор: свои сотрудники, частичный аутсорсинг (<b>договор на готовность</b> с фирмой реагирования для крупных инцидентов) или полный аутсорсинг. Даже при аутсорсинге <b>ответственность</b> и решения остаются у организации: поставщик даёт руки и навыки.</p>`,
    },
    take: { en: `Choose central, distributed or coordinating; outsource hands, never accountability.`, ru: `Выберите центральную, распределённую или координирующую; отдавайте руки, но не ответственность.` } },

  { id: 's10-063', kind: 'back', back: 's02-022', k: ['d1-c14', 'd7-c4'], lvl: 2,
    title: { en: `The phishing chain again: the report that starts the response`, ru: `Снова фишинговая цепочка: сообщение, с которого начинается реагирование` },
    body: {
      en: `<p>Stage 2 traced a phishing attack from the email to the stolen data. Most incidents still start somewhere on that chain, and the earliest sensor is a person.</p><p>When an employee presses "report phishing", that's <b>detection</b>. The faster it arrives, the less the attacker gets done. One early report lets the team pull the same email from everyone else's inbox before more people click.</p><p>That's why awareness training should end in a clear action: "report it, even if you clicked". And why the response to a report, including from someone who clicked, should be thanks, not blame.</p>`,
      ru: `<p>Этап 2 проследил фишинговую атаку от письма до украденных данных. Большинство инцидентов по-прежнему начинаются где-то на этой цепочке, и самый ранний датчик — человек.</p><p>Когда сотрудник жмёт «сообщить о фишинге», это <b>обнаружение</b>. Чем быстрее оно приходит, тем меньше успевает атакующий. Одно раннее сообщение позволяет команде убрать такое же письмо из ящиков всех остальных, пока не кликнули другие.</p><p>Поэтому обучение должно заканчиваться ясным действием: «сообщите, даже если кликнули». И поэтому ответ на сообщение, даже от того, кто кликнул, — благодарность, а не упрёк.</p>`,
    },
    take: { en: `A user's report is detection; make reporting easy and thank people for it.`, ru: `Сообщение пользователя — это обнаружение; сделайте его лёгким и благодарите за него.` } },

  { id: 's10-064', kind: 'think', k: ['d1-c14', 'd7-c4', 'd5-c1'], lvl: 1,
    title: { en: `"I typed my password into it"`, ru: `«Я ввела туда свой пароль»` },
    body: {
      en: `<p>Ten minutes ago a finance employee clicked a link in an email about an "unpaid invoice" and entered her company password on a login page. Then she noticed the address was wrong, and she's calling you, embarrassed.</p><p>What happens next, in order?</p>`,
      ru: `<p>Десять минут назад сотрудница финансов кликнула по ссылке в письме о «неоплаченном счёте» и ввела рабочий пароль на странице входа. Потом заметила неправильный адрес и звонит вам, смущаясь.</p><p>Что происходит дальше, по порядку?</p>`,
    },
    reveal: {
      en: `<ol><li><b>Thank her.</b> Ten minutes is a fast report.</li><li><b>Contain</b>: reset her password, revoke her active sessions and tokens, and check that no new MFA device or mail-forwarding rule was added.</li><li><b>Analyse</b>: check sign-in logs for logins from unusual places since the click, and what the account accessed.</li><li><b>Widen</b>: find who else received the email, pull it from their mailboxes and block the fake site.</li><li><b>Record</b> it as an incident, and escalate if the account was used.</li></ol><p>If her account had phishing-resistant MFA such as a passkey, the stolen password alone would have been useless.</p>`,
      ru: `<ol><li><b>Поблагодарить.</b> Десять минут — быстрое сообщение.</li><li><b>Сдержать</b>: сбросить пароль, отозвать активные сессии и токены, проверить, не добавлено ли новое устройство MFA или правило пересылки почты.</li><li><b>Проанализировать</b>: проверить журналы входов на входы из необычных мест после клика и то, к чему обращалась учётка.</li><li><b>Расширить</b>: найти, кто ещё получил письмо, убрать его из их ящиков и заблокировать поддельный сайт.</li><li><b>Записать</b> как инцидент и эскалировать, если учёткой воспользовались.</li></ol><p>Будь у неё устойчивая к фишингу MFA, например passkey, один украденный пароль был бы бесполезен.</p>`,
    },
    take: { en: `Thank, reset and revoke, check the logs, pull the email from everyone, record it.`, ru: `Поблагодарить, сбросить и отозвать, проверить журналы, убрать письмо у всех, записать.` } },

  { id: 's10-065', kind: 'idea', k: ['d7-c4', 'd1-c13'], lvl: 2,
    title: { en: `Incidents in the cloud: whose logs, whose hands?`, ru: `Инциденты в облаке: чьи журналы, чьи руки?` },
    body: {
      en: `<p>Shared responsibility from stage 7 applies to incidents too. In SaaS, the provider runs the servers: you can't image their disk or put their memory in an evidence bag. What you get is what the contract and the platform give you:</p><ul><li><b>Logs</b>: which ones exist, how long they're kept, and whether you have to pay for the detailed tier. Turn them on before the incident.</li><li><b>Notification</b>: how quickly the provider must tell you about an incident on their side.</li><li><b>Cooperation</b>: will they help an investigation, and preserve data on request?</li></ul><p>In IaaS you can snapshot your own disks and memory, but only if the team has practised it.</p>`,
      ru: `<p>Разделённая ответственность из этапа 7 действует и при инцидентах. В SaaS серверы держит провайдер: вы не снимете образ их диска и не положите их память в пакет для улик. У вас есть то, что дают договор и платформа:</p><ul><li><b>Журналы</b>: какие существуют, сколько хранятся и надо ли платить за подробный уровень. Включите их до инцидента.</li><li><b>Уведомление</b>: как быстро провайдер обязан сообщить об инциденте на своей стороне.</li><li><b>Содействие</b>: поможет ли он расследованию и сохранит ли данные по запросу?</li></ul><p>В IaaS можно снимать снимки собственных дисков и памяти, но только если команда это отрабатывала.</p>`,
    },
    take: { en: `In the cloud, your evidence is what the contract and logs give you; arrange it in advance.`, ru: `В облаке ваши доказательства — то, что дают договор и журналы; договоритесь заранее.` } },

  { id: 's10-066', kind: 'think', k: ['d7-c4', 'd7-c2'], lvl: 2,
    title: { en: `The cloud key on a public code site`, ru: `Облачный ключ на публичном сайте с кодом` },
    body: {
      en: `<p>A developer realises that, three hours ago, he pushed code to a public repository with an <b>access key</b> for your cloud account inside it. He has already deleted the file and pushed again. "It's gone now, right?"</p><p>What do you do?</p>`,
      ru: `<p>Разработчик понимает, что три часа назад отправил в публичный репозиторий код с <b>ключом доступа</b> к вашему облачному аккаунту. Он уже удалил файл и отправил изменения снова. «Теперь его нет, правда?»</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p>Assume it's been stolen. Automated bots scan public code sites for keys within minutes, and the old version stays in the repository's history.</p><ol><li><b>Revoke</b> the key at once and issue a new one where it's needed.</li><li><b>Check the cloud audit logs</b> for everything done with that key in the past three hours: new users, new keys, new virtual machines (often crypto-mining), data downloads.</li><li><b>Remove</b> anything the attacker created, and record it all as an incident.</li></ol><p>Afterwards: secret scanning before every push, and short-lived credentials instead of long-lived keys in code.</p>`,
      ru: `<p>Считайте, что ключ украден. Боты сканируют публичные сайты с кодом в поисках ключей за минуты, а старая версия остаётся в истории репозитория.</p><ol><li><b>Отзовите</b> ключ немедленно и выпустите новый там, где он нужен.</li><li><b>Проверьте журналы аудита облака</b> на всё, что делалось этим ключом за три часа: новые пользователи, новые ключи, новые виртуальные машины (часто для майнинга), выгрузка данных.</li><li><b>Удалите</b> всё, что создал атакующий, и оформите это как инцидент.</li></ol><p>После: проверка на секреты перед каждой отправкой и короткоживущие учётные данные вместо долгоживущих ключей в коде.</p>`,
    },
    take: { en: `A leaked key is stolen: revoke it, read the audit logs, clean up, then fix the pipeline.`, ru: `Утёкший ключ — украденный: отзовите, прочитайте журналы аудита, очистите, затем исправьте процесс.` } },

  { id: 's10-067', kind: 'idea', k: ['d7-c4'], lvl: 2,
    title: { en: `Tabletop exercises: rehearse before the real thing`, ru: `Штабные учения: репетиция до настоящего инцидента` },
    body: {
      en: `<p>A plan nobody has practised is a guess. A <b>tabletop exercise</b> is the cheapest practice: the CSIRT, management, legal and communications sit around a table while a facilitator plays out a scenario, step by step. "It's 7 a.m., the file servers show ransom notes. What do you do?" Then: "Now a journalist calls." "Now the backups turn out to be encrypted too."</p><p>Nothing is touched; only decisions are tested. The gaps that show up are always the same kind: an outdated phone list, nobody sure who can shut down the website, no way to reach staff if email is down.</p><p>Fix them, then run the next scenario.</p>`,
      ru: `<p>План, который никто не отрабатывал, — догадка. <b>Штабные учения</b> (tabletop exercise) — самая дешёвая тренировка: CSIRT, руководство, юристы и коммуникации сидят за столом, а ведущий шаг за шагом разыгрывает сценарий. «7 утра, на файловых серверах требования выкупа. Что делаете?» Затем: «Звонит журналист». «Оказалось, бэкапы тоже зашифрованы».</p><p>Ничего не трогают; проверяют только решения. Находятся всегда одни и те же пробелы: устаревший список телефонов, никто не уверен, кто может отключить сайт, нет способа связаться с людьми, если почта лежит.</p><p>Исправьте их и проведите следующий сценарий.</p>`,
    },
    take: { en: `Tabletops test decisions cheaply; they always find an outdated contact list.`, ru: `Штабные учения дёшево проверяют решения и всегда находят устаревший список контактов.` } },

  { id: 's10-068', kind: 'vs', k: ['d7-c4', 'd7-c2'], lvl: 2,
    title: { en: `Indicators of compromise vs indicators of attack`, ru: `Индикаторы компрометации и индикаторы атаки` },
    body: {
      en: `<ul><li><b>Indicators of compromise</b> (IoCs): evidence that something bad already happened. A known malware file hash, an attacker's IP address or domain, a ransom note's file name. Easy to share between organisations and to block, but easy for attackers to change.</li><li><b>Indicators of attack</b> (IoAs): signs of attacker <b>behaviour</b> in progress, whatever the tools. A process dumping passwords from memory, an accountant's PC connecting to forty servers, mass file renaming.</li></ul><p>Rule: IoCs answer "have we seen this exact thing?"; IoAs answer "is someone doing this kind of thing right now?" Good detection uses both.</p>`,
      ru: `<ul><li><b>Индикаторы компрометации</b> (IoC): свидетельства того, что плохое уже случилось. Хеш известного вредоноса, IP-адрес или домен атакующего, имя файла с требованием выкупа. Ими легко обмениваться между организациями и легко блокировать, но атакующим легко их сменить.</li><li><b>Индикаторы атаки</b> (IoA): признаки <b>поведения</b> атакующего в процессе, какими бы ни были инструменты. Процесс, вытаскивающий пароли из памяти, ПК бухгалтера, подключающийся к сорока серверам, массовое переименование файлов.</li></ul><p>Правило: IoC отвечают на «видели ли мы именно это?», IoA — на «делает ли кто-то такое прямо сейчас?». Хорошее обнаружение использует оба.</p>`,
    },
    take: { en: `IoCs are fingerprints left behind; IoAs are behaviour in progress.`, ru: `IoC — оставленные отпечатки; IoA — поведение в процессе.` } },

  { id: 's10-069', kind: 'link', k: ['d8-c8', 'd7-c4', 'd4-c8', 'd5-c4', 'd1-c13', 'd7-c1'], lvl: 3,
    title: { en: `NotPetya replayed with this stage`, ru: `NotPetya заново, с этим этапом` },
    body: {
      en: `<p>Replay a multinational on 27 June 2017:</p><ol><li><b>Supply chain</b> review flagged M.E.Doc as a high-risk vendor, and its PC sat in a restricted segment.</li><li><b>Segmentation</b> and limited admin rights stopped the spread at that segment.</li><li><b>EDR</b> raised an indicator of attack for password dumping and isolated the host.</li><li>The <b>playbook</b> said: isolate, don't power off; capture memory.</li><li>Out-of-band <b>communication</b> worked, because email was down.</li><li>Domain admin was assumed lost: <b>krbtgt reset twice</b>, directory checked.</li><li>Management decided not to pay: there was nothing to buy.</li><li><b>Evidence</b>, imaged and hashed, supported the insurance claim.</li></ol>`,
      ru: `<p>Переиграем международную компанию 27 июня 2017 года:</p><ol><li>Проверка <b>цепочки поставок</b> отметила M.E.Doc как рискованного поставщика, и его ПК стоял в ограниченном сегменте.</li><li><b>Сегментация</b> и ограниченные права админов остановили распространение на этом сегменте.</li><li><b>EDR</b> поднял индикатор атаки на извлечение паролей и изолировал хост.</li><li><b>Сценарий</b> гласил: изолировать, не выключать; снять память.</li><li>Внеполосная <b>связь</b> сработала, потому что почта лежала.</li><li>Админа домена сочли потерянным: <b>krbtgt сброшен дважды</b>, каталог проверен.</li><li>Руководство решило не платить: покупать было нечего.</li><li><b>Доказательства</b>, снятые образом и захешированные, подкрепили страховое требование.</li></ol>`,
    },
    take: { en: `Vendor risk, segments, EDR, playbook, second channel, krbtgt, evidence: each link limits the next.`, ru: `Риск поставщика, сегменты, EDR, сценарий, второй канал, krbtgt, доказательства: каждое звено ограничивает следующее.` } },

  { id: 's10-070', kind: 'recap', lvl: 1,
    title: { en: `Stage 10 in seven lines`, ru: `Этап 10 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s10-003', { en: `Event, incident, breach: each a narrower set, and "breach" can start a legal clock.`, ru: `Событие, инцидент, утечка: каждое уже, и «утечка» может запустить отсчёт.` }],
      ['s10-007', { en: `Prepare, detect and analyse, contain-eradicate-recover, learn.`, ru: `Подготовка, обнаружение и анализ, сдерживание-устранение-восстановление, уроки.` }],
      ['s10-016', { en: `Isolate, don't power off: contain without destroying evidence.`, ru: `Изолируйте, не выключайте: сдерживание без потери доказательств.` }],
      ['s10-022', { en: `Paying a ransom is management's decision, with legal, ideally made in advance.`, ru: `Платить ли выкуп — решает руководство с юристами, лучше заранее.` }],
      ['s10-036', { en: `GDPR 72 hours, NIS2 24 then 72: the clock starts at awareness.`, ru: `GDPR — 72 часа, NIS2 — 24, затем 72: отсчёт с момента осведомлённости.` }],
      ['s10-044', { en: `If it might become criminal, handle evidence to criminal standards from the start.`, ru: `Если дело может стать уголовным, сразу соблюдайте уголовные стандарты.` }],
      ['s10-047', { en: `Chain of custody, write blocker, hashed image: the original never changes.`, ru: `Цепочка хранения, блокиратор, хешированный образ: оригинал не меняется.` }],
    ],
    take: { en: `Next: software that defends itself.`, ru: `Дальше: программы, которые защищают себя.` } },
] });
