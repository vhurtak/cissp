'use strict';
// Learning path, stage 9: watching and testing. Tests vs assessments vs audits, vulnerability scanning and SCAP,
// penetration testing and its permission, reporting, exceptions and disclosure, SOC reports, logging and the SIEM,
// detective and preventive tools, and the metrics that tell management whether the program works.
CISSP.stage(9, { cards: [
  { id: 's09-001', kind: 'story', k: ['d6-c2', 'd7-c2', 'd7-c6'], lvl: 1,
    title: { en: `Equifax again: the scan that came back clean`, ru: `Снова Equifax: скан, который ничего не нашёл` },
    body: {
      en: `<p>Stage 1 told how Equifax left a known Apache Struts flaw unpatched in 2017. The testing side of the story is just as instructive.</p><p>A week after the alert in March, the security team <b>ran a scan</b> to find vulnerable servers. It didn't find the dispute portal, so nobody patched it. Attackers got in that May.</p><p>Equifax also had a device that inspected outgoing encrypted traffic. Its certificate had <b>expired 19 months earlier</b>, so it saw nothing. When staff renewed it at the end of July, suspicious traffic showed up almost at once. By then data on about 147 million people was gone.</p>`,
      ru: `<p>Этап 1 рассказывал, как Equifax в 2017 году не закрыла известную уязвимость Apache Struts. Сторона проверок в этой истории не менее поучительна.</p><p>Через неделю после мартовского предупреждения команда безопасности <b>запустила сканирование</b>, чтобы найти уязвимые серверы. Портал для споров оно не нашло, и его никто не пропатчил. В мае туда вошли атакующие.</p><p>Ещё у Equifax было устройство, проверявшее исходящий зашифрованный трафик. Его сертификат <b>истёк за 19 месяцев до этого</b>, и оно ничего не видело. Когда в конце июля сертификат обновили, подозрительный трафик обнаружился почти сразу. К тому времени данные примерно 147 миллионов человек уже утекли.</p>`,
    },
    take: { en: `A control you never check can be silently broken: the scan missed, the monitor was blind.`, ru: `Меру, которую не проверяют, можно сломать незаметно: скан промахнулся, монитор ослеп.` } },

  { id: 's09-002', kind: 'idea', k: ['d6-c1'], lvl: 1,
    title: { en: `How do you know a control works?`, ru: `Откуда вы знаете, что мера работает?` },
    body: {
      en: `<p>Every earlier stage added controls: MFA, firewalls, encryption, badges, sprinklers. Buying and installing them is the easy part. The hard question is whether they still work today, on every system they're supposed to cover.</p><p>That confidence has a name: <b>assurance</b>. You get it by checking, and this stage is about the ways to check:</p><ul><li><b>testing</b> controls (scans, pentests, restore tests);</li><li><b>watching</b> them run (logs, alerts, metrics);</li><li>asking someone <b>independent</b> to look (audits).</li></ul><p>Management needs this evidence to make decisions, and regulators and customers ask for it too.</p>`,
      ru: `<p>Каждый прошлый этап добавлял меры: MFA, межсетевые экраны, шифрование, пропуска, спринклеры. Купить и установить их — простая часть. Трудный вопрос — работают ли они сегодня, на всех системах, которые должны защищать.</p><p>У этой уверенности есть имя: <b>гарантия</b> (assurance). Её получают проверкой, и этот этап — о способах проверять:</p><ul><li><b>тестировать</b> меры (сканы, пентесты, тестовые восстановления);</li><li><b>наблюдать</b> за их работой (журналы, оповещения, метрики);</li><li>просить <b>независимого</b> человека посмотреть (аудит).</li></ul><p>Руководству эти доказательства нужны для решений, а регуляторы и клиенты тоже их требуют.</p>`,
    },
    take: { en: `Assurance is earned by testing, watching and independent review.`, ru: `Гарантию зарабатывают тестами, наблюдением и независимой проверкой.` } },

  { id: 's09-003', kind: 'vs', k: ['d6-c1'], lvl: 1,
    title: { en: `Test vs assessment vs audit`, ru: `Тест, оценка и аудит` },
    body: {
      en: `<ul><li><b>Test</b>: checks that one specific control works. "Does the backup restore?" "Is port 23 closed?" The answer is usually pass or fail.</li><li><b>Assessment</b>: a broad review of a system or program. It combines tests, interviews and document reviews, and ends with <b>recommendations</b>.</li><li><b>Audit</b>: a formal, <b>independent</b> evaluation against agreed criteria (a standard, a contract, a law). It rests on evidence and ends with an <b>opinion</b> that others can rely on.</li></ul><p>Rule: a test answers "does it work?", an assessment "how are we doing?", an audit "can outsiders trust it?"</p>`,
      ru: `<ul><li><b>Тест</b>: проверяет, что работает одна конкретная мера. «Восстанавливается ли бэкап?» «Закрыт ли порт 23?» Ответ обычно «да» или «нет».</li><li><b>Оценка</b> (assessment): широкий анализ системы или программы. Объединяет тесты, интервью и изучение документов и заканчивается <b>рекомендациями</b>.</li><li><b>Аудит</b>: формальная <b>независимая</b> проверка по согласованным критериям (стандарт, договор, закон). Опирается на доказательства и заканчивается <b>заключением</b>, на которое могут полагаться другие.</li></ul><p>Правило: тест отвечает «работает ли?», оценка — «как у нас дела?», аудит — «могут ли посторонние этому доверять?»</p>`,
    },
    take: { en: `Test: one control. Assessment: the whole picture. Audit: independent, against criteria.`, ru: `Тест — одна мера. Оценка — вся картина. Аудит — независимо, по критериям.` } },

  { id: 's09-004', kind: 'vs', k: ['d6-c1'], lvl: 1,
    title: { en: `Internal vs external vs third-party`, ru: `Внутренний, внешний и третьей стороной` },
    body: {
      en: `<ul><li><b>Internal</b>: your own staff, often the internal audit team. Cheaper, knows the business, but less independent.</li><li><b>External</b>: an outside firm <b>you</b> hire, for example for a pentest or a readiness review. More independent, but you choose them and you pay them.</li><li><b>Third-party</b>: an outside party working <b>for someone else</b>, such as a regulator's examiner, a customer's auditor, or the auditor who writes a vendor's SOC report.</li></ul><p>The more outsiders need to rely on the result, the more independence it needs.</p>`,
      ru: `<ul><li><b>Внутренний</b>: собственные сотрудники, часто отдел внутреннего аудита. Дешевле, знает бизнес, но менее независим.</li><li><b>Внешний</b>: сторонняя фирма, которую нанимаете <b>вы</b>, например для пентеста или проверки готовности. Независимее, но выбираете и платите им вы.</li><li><b>Третьей стороной</b>: внешняя сторона, работающая <b>на кого-то другого</b>: проверяющий регулятора, аудитор клиента или аудитор, пишущий SOC-отчёт поставщика.</li></ul><p>Чем больше посторонним нужно полагаться на результат, тем больше нужно независимости.</p>`,
    },
    take: { en: `Internal is cheapest, third-party most independent; choose by who must rely on it.`, ru: `Внутренний дешевле, третьей стороной независимее; выбирайте по тому, кто будет полагаться.` } },

  { id: 's09-005', kind: 'idea', k: ['d6-c1', 'd1-c9'], lvl: 2,
    title: { en: `A test strategy: what, how often, where`, ru: `Стратегия проверок: что, как часто, где` },
    body: {
      en: `<p>You can't test everything every day, so the strategy starts from <b>risk</b>:</p><ul><li><b>What</b>: the systems that hold the most valuable data or face the internet come first.</li><li><b>How often</b>: driven by criticality, how fast the system changes, and what laws or contracts demand. A payment site might be scanned weekly and pentested every year and after big changes.</li><li><b>Where</b>: on-premises, in the cloud or both. Cloud providers have their own testing rules; read them and get permission where needed before you scan their platform.</li></ul><p>The guiding question: what assurance do stakeholders need, and what's the cheapest reliable way to give it?</p>`,
      ru: `<p>Проверять всё каждый день невозможно, поэтому стратегия начинается с <b>риска</b>:</p><ul><li><b>Что</b>: первыми идут системы с самыми ценными данными или смотрящие в интернет.</li><li><b>Как часто</b>: зависит от критичности, скорости изменений системы и требований законов или договоров. Платёжный сайт могут сканировать еженедельно и пентестить раз в год и после крупных изменений.</li><li><b>Где</b>: on-premises, в облаке или и там, и там. У облачных провайдеров свои правила тестирования; прочитайте их и получите разрешение, где нужно, прежде чем сканировать их платформу.</li></ul><p>Главный вопрос: какая уверенность нужна заинтересованным сторонам и каков самый дешёвый надёжный способ её дать?</p>`,
    },
    take: { en: `Test the riskiest and fastest-changing systems most, and follow the cloud provider's rules.`, ru: `Чаще всего проверяйте самое рискованное и быстро меняющееся; соблюдайте правила облачного провайдера.` } },

  { id: 's09-006', kind: 'think', k: ['d6-c1', 'd6-c7'], lvl: 2,
    title: { en: `"We'll audit ourselves"`, ru: `«Мы проверим себя сами»` },
    body: {
      en: `<p>The board's audit committee wants assurance that the new access-control program works. The CISO offers: "My team built it and knows it best. We'll audit it and present the results next month."</p><p>Is that a good plan?</p>`,
      ru: `<p>Комитет по аудиту совета директоров хочет уверенности, что новая программа управления доступом работает. CISO предлагает: «Моя команда её построила и знает лучше всех. Мы её проверим и представим результаты в следующем месяце».</p><p>Хороший ли это план?</p>`,
    },
    reveal: {
      en: `<p>Not for this purpose. The team that built the controls has an obvious conflict of interest: they'd be marking their own homework. A <b>self-assessment</b> is useful for finding gaps early, and they should do one.</p><p>But the board asked for assurance, which needs <b>independence</b>: internal audit, which reports to the audit committee rather than to the CISO, or an external firm. The CISO's job is to support them with evidence, not to grade the result.</p>`,
      ru: `<p>Не для этой цели. У команды, построившей меры, очевидный конфликт интересов: она будет проверять собственную домашнюю работу. <b>Самооценка</b> полезна, чтобы найти пробелы пораньше, и её стоит провести.</p><p>Но совет просил гарантию, а ей нужна <b>независимость</b>: внутренний аудит, подотчётный комитету по аудиту, а не CISO, или внешняя фирма. Задача CISO — поддержать их доказательствами, а не выставлять оценку.</p>`,
    },
    take: { en: `Builders can self-assess; assurance for the board needs someone independent.`, ru: `Создатели могут оценить себя; гарантия для совета требует независимого проверяющего.` } },

  { id: 's09-007', kind: 'back', back: 's01-034', k: ['d1-c2', 'd6-c1'], lvl: 2,
    title: { en: `Due diligence again: testing is how you prove it`, ru: `Снова должная осмотрительность: проверка — способ её доказать` },
    body: {
      en: `<p>Stage 1 split the duty in two: <b>due diligence</b> is finding out what needs doing, and <b>due care</b> is actually doing it and keeping it done.</p><p>Testing and monitoring belong to both halves. Assessments and scans are diligence: they find the gaps. Regular retests, log reviews and audits are care made visible: they show the controls kept working after the project ended.</p><p>When a regulator or a court asks "what did you do?", a policy alone is a weak answer. Dated scan results, fixed findings and an audit opinion are a strong one.</p>`,
      ru: `<p>Этап 1 разделил обязанность на две части: <b>должная осмотрительность</b> (due diligence) — выяснить, что нужно сделать, а <b>должная забота</b> (due care) — действительно делать это и поддерживать.</p><p>Тесты и мониторинг относятся к обеим половинам. Оценки и сканы — это осмотрительность: они находят пробелы. Регулярные повторные тесты, анализ журналов и аудиты — видимая забота: они показывают, что меры продолжали работать после окончания проекта.</p><p>Когда регулятор или суд спрашивает «что вы сделали?», одна политика — слабый ответ. Датированные результаты сканов, закрытые находки и заключение аудита — сильный.</p>`,
    },
    take: { en: `Tests and audits turn due diligence and due care into evidence.`, ru: `Тесты и аудиты превращают осмотрительность и заботу в доказательства.` } },

  { id: 's09-008', kind: 'idea', k: ['d6-c2'], lvl: 1,
    title: { en: `Vulnerability scanning: checking for known holes`, ru: `Сканирование уязвимостей: поиск известных дыр` },
    body: {
      en: `<p>A <b>vulnerability scanner</b> is software that probes systems and compares what it finds against a database of known weaknesses: missing patches, old software versions, weak settings, default passwords.</p><p>Scans come in layers:</p><ul><li><b>Discovery</b>: what devices and open ports exist at all?</li><li><b>Network vulnerability scan</b>: what known flaws do those services have?</li><li><b>Web application</b> and <b>database</b> scans look deeper into one kind of system.</li></ul><p>Scanners are fast and cheap, so they run often. Their limit is in the name: they find <b>known</b> problems, on the systems you point them at.</p>`,
      ru: `<p><b>Сканер уязвимостей</b> — программа, которая опрашивает системы и сравнивает найденное с базой известных слабостей: отсутствующими патчами, старыми версиями ПО, слабыми настройками, паролями по умолчанию.</p><p>Сканы бывают нескольких уровней:</p><ul><li><b>Обнаружение</b>: какие устройства и открытые порты вообще есть?</li><li><b>Сетевое сканирование уязвимостей</b>: какие известные изъяны есть у этих сервисов?</li><li>Сканы <b>веб-приложений</b> и <b>баз данных</b> смотрят глубже в один вид систем.</li></ul><p>Сканеры быстрые и дешёвые, поэтому запускаются часто. Их предел — в названии: они находят <b>известные</b> проблемы на тех системах, на которые их направили.</p>`,
    },
    take: { en: `Scanners find known weaknesses fast, but only where you point them.`, ru: `Сканеры быстро находят известные слабости, но только там, куда их направили.` } },

  { id: 's09-009', kind: 'vs', k: ['d6-c2'], lvl: 2,
    title: { en: `Credentialed vs non-credentialed scan`, ru: `Скан с учётными данными и без` },
    body: {
      en: `<ul><li><b>Non-credentialed</b> (unauthenticated): the scanner looks from outside, like an attacker on the network. It sees open ports and service banners and guesses versions from them. It misses much, and produces more false alarms.</li><li><b>Credentialed</b> (authenticated): the scanner logs in with an account and reads the installed software, patch levels and settings directly. Far more accurate and complete.</li></ul><p>Use both: credentialed scans to know your real state, non-credentialed ones to see what an outsider sees. Protect the scanning account carefully: it has access to everything it scans.</p>`,
      ru: `<ul><li><b>Без учётных данных</b> (неаутентифицированный): сканер смотрит снаружи, как атакующий в сети. Он видит открытые порты и баннеры сервисов и угадывает по ним версии. Многое пропускает и даёт больше ложных тревог.</li><li><b>С учётными данными</b> (аутентифицированный): сканер входит под учётной записью и читает установленное ПО, уровни патчей и настройки напрямую. Гораздо точнее и полнее.</li></ul><p>Используйте оба: скан с учётными данными — чтобы знать реальное состояние, без — чтобы видеть то, что видит посторонний. Учётную запись сканера тщательно защищайте: у неё доступ ко всему, что она сканирует.</p>`,
    },
    take: { en: `Credentialed scans show the truth; non-credentialed ones show the attacker's view.`, ru: `Скан с учётными данными показывает правду, без них — взгляд атакующего.` } },

  { id: 's09-010', kind: 'vs', k: ['d6-c2'], lvl: 2,
    title: { en: `False positive vs false negative`, ru: `Ложноположительный и ложноотрицательный` },
    body: {
      en: `<ul><li><b>False positive</b>: the tool reports a problem that isn't there. A scanner flags an old version, but the vendor backported the fix. It wastes time and erodes trust in the tool.</li><li><b>False negative</b>: the tool misses a real problem. Equifax's scan reported nothing on the portal that was vulnerable.</li></ul><p>False negatives are more dangerous, because nobody goes looking for a problem they've been told doesn't exist. A clean scan report means "nothing found", not "nothing there".</p><p>The same pair applies to every detector: IDS, anti-malware, DLP, biometrics.</p>`,
      ru: `<ul><li><b>Ложноположительный</b> (false positive): инструмент сообщает о проблеме, которой нет. Сканер отмечает старую версию, но производитель перенёс исправление в неё. Тратит время и подрывает доверие к инструменту.</li><li><b>Ложноотрицательный</b> (false negative): инструмент пропускает реальную проблему. Скан Equifax ничего не сообщил об уязвимом портале.</li></ul><p>Ложноотрицательные опаснее: никто не ищет проблему, о которой сказали, что её нет. Чистый отчёт сканера означает «ничего не найдено», а не «ничего нет».</p><p>Та же пара относится к любому детектору: IDS, антивирусу, DLP, биометрии.</p>`,
    },
    take: { en: `A false negative is worse: "nothing found" is not "nothing there".`, ru: `Ложноотрицательный хуже: «ничего не найдено» — не «ничего нет».` } },

  { id: 's09-011', kind: 'back', back: 's05-010', k: ['d4-c3', 'd6-c2', 'd4-c6'], lvl: 2,
    title: { en: `The handshake again: how a port scan works`, ru: `Снова рукопожатие: как работает сканирование портов` },
    body: {
      en: `<p>Stage 5 showed the TCP handshake: SYN, SYN-ACK, ACK. Port scanners such as Nmap use it to ask each port "are you there?"</p><ul><li>The scanner sends a <b>SYN</b>. A <b>SYN-ACK</b> back means the port is <b>open</b>. The scanner then sends a reset instead of finishing, which is why it's called a half-open or SYN scan.</li><li>A <b>reset</b> (RST) back means <b>closed</b>: the host is there, nothing listens.</li><li><b>No answer</b>, or an error message, means <b>filtered</b>: a firewall is in the way.</li></ul><p>Attackers run the same scan during reconnaissance, so unexpected scans in your logs are an early warning.</p>`,
      ru: `<p>Этап 5 показал TCP-рукопожатие: SYN, SYN-ACK, ACK. Сканеры портов, такие как Nmap, используют его, чтобы спросить у каждого порта «ты здесь?»</p><ul><li>Сканер шлёт <b>SYN</b>. Ответ <b>SYN-ACK</b> значит, что порт <b>открыт</b> (open). Затем сканер вместо завершения шлёт сброс, поэтому такой скан называют полуоткрытым или SYN-сканом.</li><li>Ответ <b>сброс</b> (RST) значит <b>закрыт</b> (closed): хост есть, но никто не слушает.</li><li><b>Нет ответа</b> или сообщение об ошибке значит <b>фильтруется</b> (filtered): мешает межсетевой экран.</li></ul><p>Атакующие запускают тот же скан на разведке, поэтому неожиданные сканы в журналах — ранний сигнал.</p>`,
    },
    take: { en: `SYN-ACK: open. RST: closed. Silence: filtered.`, ru: `SYN-ACK — открыт. RST — закрыт. Тишина — фильтруется.` } },

  { id: 's09-012', kind: 'idea', k: ['d6-c2'], lvl: 2,
    title: { en: `CVE, CVSS and the rest of SCAP`, ru: `CVE, CVSS и остальной SCAP` },
    body: {
      en: `<p>Thousands of tools need to talk about the same flaws in the same words. <b>SCAP</b> (Security Content Automation Protocol) is a set of standards for that:</p><ul><li><b>CVE</b>: a unique name for each known vulnerability, like CVE-2017-5638 for the Equifax Struts flaw.</li><li><b>CVSS</b>: a severity score from 0 to 10.</li><li><b>CPE</b>: names for platforms (products and versions).</li><li><b>CCE</b>: names for configuration settings.</li><li><b>XCCDF</b>: a language for security checklists.</li><li><b>OVAL</b>: a language for testing a system's actual state.</li></ul><p>Memory hook: CVE says <i>which</i> flaw, CVSS says <i>how bad</i>, CPE says <i>on what</i>.</p>`,
      ru: `<p>Тысячам инструментов нужно говорить об одних и тех же изъянах одними словами. <b>SCAP</b> (Security Content Automation Protocol) — набор стандартов для этого:</p><ul><li><b>CVE</b>: уникальное имя каждой известной уязвимости, например CVE-2017-5638 для уязвимости Struts у Equifax.</li><li><b>CVSS</b>: оценка серьёзности от 0 до 10.</li><li><b>CPE</b>: имена платформ (продуктов и версий).</li><li><b>CCE</b>: имена параметров конфигурации.</li><li><b>XCCDF</b>: язык чек-листов безопасности.</li><li><b>OVAL</b>: язык проверки фактического состояния системы.</li></ul><p>Подсказка: CVE говорит, <i>какой</i> изъян, CVSS — <i>насколько плохо</i>, CPE — <i>на чём</i>.</p>`,
    },
    take: { en: `CVE names the flaw, CVSS scores it, CPE names the platform.`, ru: `CVE называет изъян, CVSS оценивает, CPE называет платформу.` } },

  { id: 's09-013', kind: 'picture', k: ['d6-c2', 'd7-c6'], lvl: 2,
    title: { en: `Vulnerability management is a loop`, ru: `Управление уязвимостями — это цикл` },
    body: {
      en: `<p>A scan on its own changes nothing. It's one step in a cycle that starts with knowing what you own, because a server missing from the inventory is never scanned. Findings are ranked, fixed by their owners, then <b>scanned again</b> to verify. The results go to management, and the cycle starts over as new systems and new flaws appear.</p>`,
      ru: `<p>Скан сам по себе ничего не меняет. Это один шаг цикла, который начинается со знания того, чем вы владеете: сервер, которого нет в реестре, никогда не сканируют. Находки ранжируют, владельцы их устраняют, затем <b>сканируют снова</b> для проверки. Результаты уходят руководству, и цикл начинается заново, по мере того как появляются новые системы и новые изъяны.</p>`,
    },
    dg: { title: { en: `The vulnerability management cycle`, ru: `Цикл управления уязвимостями` }, h: 300,
      zones: [[20, 30, 720, 250, { en: 'Repeats continuously', ru: 'Повторяется непрерывно' }, 'trust']],
      nodes: [
        ['inv', 140, 220, { en: 'Inventory', ru: 'Реестр' }, { en: 'what do we own?', ru: 'чем мы владеем?' }, '📋', 'key'],
        ['scan', 140, 95, { en: 'Discover', ru: 'Обнаружить' }, { en: 'scan, feeds, reports', ru: 'сканы, фиды, отчёты' }, '🔍', 'ok'],
        ['rank', 380, 95, { en: 'Prioritize', ru: 'Приоритет' }, { en: 'severity × exposure', ru: 'серьёзность × доступность' }, '⚖️', 'ok'],
        ['fix', 620, 95, { en: 'Remediate', ru: 'Устранить' }, { en: 'patch, reconfigure', ru: 'патч, настройка' }, '🔧', 'ok'],
        ['ver', 620, 220, { en: 'Verify', ru: 'Проверить' }, { en: 'rescan', ru: 'повторный скан' }, '✅', 'ok'],
        ['rep', 380, 220, { en: 'Report', ru: 'Отчитаться' }, { en: 'trends to management', ru: 'тренды руководству' }, '📊', 'dim'],
      ],
      edges: [['inv', 'scan', '', 'key'], ['scan', 'rank', '', 'ok'], ['rank', 'fix', '', 'ok'], ['fix', 'ver', '', 'ok'], ['ver', 'rep', '', 'ok'], ['rep', 'inv', '', 'dash']],
      note: { en: `Equifax broke the loop twice: the portal wasn't found, and the fix was never verified.`, ru: `Equifax разорвала цикл дважды: портал не нашли, а исправление не проверили.` } },
    take: { en: `Inventory, discover, prioritize, fix, verify, report, repeat.`, ru: `Реестр, обнаружение, приоритет, устранение, проверка, отчёт, повтор.` } },

  { id: 's09-014', kind: 'think', k: ['d6-c2', 'd1-c9'], lvl: 2,
    title: { en: `3,000 findings: which first?`, ru: `3000 находок: что первым?` },
    body: {
      en: `<p>The monthly scan returns 3,000 findings. Two of them:</p><ul><li><b>A</b>: CVSS 9.8 on a test server in an isolated lab network, with no real data.</li><li><b>B</b>: CVSS 7.5 on the internet-facing customer portal. The flaw is on CISA's Known Exploited Vulnerabilities list: attackers are using it right now.</li></ul><p>The team's rule is "highest CVSS first". Which do you fix first?</p>`,
      ru: `<p>Ежемесячный скан выдал 3000 находок. Две из них:</p><ul><li><b>A</b>: CVSS 9.8 на тестовом сервере в изолированной лабораторной сети, без реальных данных.</li><li><b>B</b>: CVSS 7.5 на клиентском портале, доступном из интернета. Уязвимость есть в списке CISA Known Exploited Vulnerabilities: её эксплуатируют прямо сейчас.</li></ul><p>Правило команды — «сначала самый высокий CVSS». Что вы исправите первым?</p>`,
    },
    reveal: {
      en: `<p><b>B.</b> CVSS measures how bad a flaw is in general. It doesn't know that A is unreachable and holds nothing of value, or that B faces the internet and holds customer data.</p><p>Prioritize by <b>risk</b>: severity, plus exposure, plus the value of the asset, plus whether the flaw is actually being exploited (CISA's KEV list, or EPSS, a score that estimates the chance of exploitation). A still gets fixed, just not first. And change the team's rule.</p>`,
      ru: `<p><b>B.</b> CVSS измеряет, насколько плох изъян вообще. Он не знает, что A недостижим и не хранит ничего ценного, а B смотрит в интернет и хранит данные клиентов.</p><p>Приоритет — по <b>риску</b>: серьёзность плюс доступность снаружи плюс ценность актива плюс то, эксплуатируется ли изъян на деле (список KEV от CISA или EPSS — оценка вероятности эксплуатации). A всё равно исправят, просто не первым. И поменяйте правило команды.</p>`,
    },
    take: { en: `Fix by risk, not by raw CVSS: exposure, asset value and active exploitation count.`, ru: `Исправляйте по риску, а не по голому CVSS: важны доступность, ценность актива и реальная эксплуатация.` } },

  { id: 's09-015', kind: 'back', back: 's01-012', k: ['d1-c9', 'd6-c2'], lvl: 1,
    title: { en: `Threat, vulnerability, risk again: what a scanner measures`, ru: `Снова угроза, уязвимость, риск: что измеряет сканер` },
    body: {
      en: `<p>Stage 1 separated three words: a <b>vulnerability</b> is a weakness, a <b>threat</b> is something that could exploit it, and <b>risk</b> is the chance and the cost of that actually happening.</p><p>A scanner sees only the first. It reports weaknesses and a generic severity. It doesn't know who is attacking your industry, what each system is worth, or which controls stand in front of it.</p><p>That's why a scan report is raw material for the risk process, not its result. Someone who knows the business still has to turn "1,200 vulnerabilities" into "these ten risks matter this month".</p>`,
      ru: `<p>Этап 1 развёл три слова: <b>уязвимость</b> — слабость, <b>угроза</b> — то, что может ею воспользоваться, <b>риск</b> — вероятность и цена того, что это действительно произойдёт.</p><p>Сканер видит только первое. Он сообщает о слабостях и общей серьёзности. Он не знает, кто атакует вашу отрасль, сколько стоит каждая система и какие меры стоят перед ней.</p><p>Поэтому отчёт сканера — сырьё для процесса управления рисками, а не его результат. Человек, знающий бизнес, всё равно должен превратить «1200 уязвимостей» в «эти десять рисков важны в этом месяце».</p>`,
    },
    take: { en: `Scanners measure vulnerabilities; people who know the business turn them into risks.`, ru: `Сканеры измеряют уязвимости; люди, знающие бизнес, превращают их в риски.` } },

  { id: 's09-016', kind: 'story', k: ['d6-c2', 'd1-c13', 'd7-c2'], lvl: 2,
    title: { en: `MOVEit 2023: a hole no scanner knew`, ru: `MOVEit, 2023: дыра, о которой не знал ни один сканер` },
    body: {
      en: `<p>MOVEit Transfer is a product companies use to exchange large files with partners. Around 27 May 2023, the Cl0p ransomware gang began exploiting an unknown <b>SQL injection flaw</b> in it, a zero-day. Progress, the vendor, published a fix on 31 May, but by then Cl0p had stolen files from servers around the world.</p><p>More than 2,500 organisations were hit, and tens of millions of people. Many victims had never run MOVEit themselves: their <b>payroll provider</b> or another vendor did.</p><p>Patched, fully scanned servers were breached, because no scanner can check for a flaw nobody has reported yet.</p>`,
      ru: `<p>MOVEit Transfer — продукт, через который компании обмениваются большими файлами с партнёрами. Примерно с 27 мая 2023 года группировка Cl0p начала эксплуатировать в нём неизвестную <b>SQL-инъекцию</b> — уязвимость нулевого дня. Производитель, Progress, выпустил исправление 31 мая, но к тому времени Cl0p уже украла файлы с серверов по всему миру.</p><p>Пострадали больше 2500 организаций и десятки миллионов людей. Многие жертвы сами MOVEit не использовали: его использовал их <b>расчётчик зарплаты</b> или другой поставщик.</p><p>Взломали пропатченные и полностью просканированные серверы: ни один сканер не может искать изъян, о котором ещё никто не сообщил.</p>`,
    },
    take: { en: `Scanning covers known flaws; zero-days are caught by monitoring, limiting exposure and planning for breach.`, ru: `Сканы покрывают известное; нулевой день ловят мониторинг, ограничение доступности и готовность к взлому.` } },

  { id: 's09-017', kind: 'vs', k: ['d6-c2', 'd6-c3'], lvl: 1,
    title: { en: `Vulnerability scan vs assessment vs penetration test`, ru: `Скан уязвимостей, оценка уязвимостей и пентест` },
    body: {
      en: `<ul><li><b>Vulnerability scan</b>: automated, frequent, wide. Lists known weaknesses. Doesn't try to use them.</li><li><b>Vulnerability assessment</b>: scans plus human analysis. Removes false positives, adds context, ranks by risk, recommends fixes.</li><li><b>Penetration test</b>: a skilled person actually <b>exploits</b> weaknesses, chains them together, and shows how far an attacker could get. Slower, narrower, more expensive, riskier to run.</li></ul><p>Rule: a scan says "this door looks unlocked"; a pentest opens it, walks in and shows you what's inside.</p>`,
      ru: `<ul><li><b>Скан уязвимостей</b>: автоматический, частый, широкий. Перечисляет известные слабости. Не пытается ими воспользоваться.</li><li><b>Оценка уязвимостей</b>: сканы плюс анализ человеком. Отсеивает ложные срабатывания, добавляет контекст, ранжирует по риску, рекомендует исправления.</li><li><b>Тест на проникновение</b>: опытный человек действительно <b>эксплуатирует</b> слабости, соединяет их в цепочку и показывает, как далеко пройдёт атакующий. Медленнее, уже, дороже, рискованнее.</li></ul><p>Правило: скан говорит «эта дверь, похоже, не заперта»; пентест открывает её, входит и показывает, что внутри.</p>`,
    },
    take: { en: `Scan lists, assessment analyses, pentest exploits.`, ru: `Скан перечисляет, оценка анализирует, пентест эксплуатирует.` } },

  { id: 's09-018', kind: 'idea', k: ['d6-c3', 'd1-c6'], lvl: 1,
    title: { en: `A pentest is an attack with permission`, ru: `Пентест — атака с разрешением` },
    body: {
      en: `<p>Technically, a penetration test and a crime use the same tools. The only difference is <b>permission</b>, so it has to be solid:</p><ul><li><b>Written authorization</b> from senior management who actually own the systems. A verbal OK from an IT manager isn't enough.</li><li><b>Scope</b>: exactly which systems, addresses, buildings and people are in, and which are out.</li><li><b>Rules of engagement</b>: when testing may happen, which techniques are allowed (social engineering? denial of service?), how found data is handled, and who to call if something breaks.</li></ul><p>Testers keep the signed letter on them. They may need to show it at 2 a.m.</p>`,
      ru: `<p>Технически пентест и преступление используют одни и те же инструменты. Единственная разница — <b>разрешение</b>, поэтому оно должно быть надёжным:</p><ul><li><b>Письменное разрешение</b> высшего руководства, которое действительно владеет системами. Устного «ок» от ИТ-менеджера недостаточно.</li><li><b>Рамки</b> (scope): какие именно системы, адреса, здания и люди входят, а какие нет.</li><li><b>Правила проведения</b> (rules of engagement): когда можно тестировать, какие техники разрешены (социальная инженерия? отказ в обслуживании?), как обращаться с найденными данными и кому звонить, если что-то сломалось.</li></ul><p>Тестировщики носят подписанное письмо с собой. Его может понадобиться показать в 2 часа ночи.</p>`,
    },
    take: { en: `No written authorization, scope and rules of engagement: no pentest.`, ru: `Нет письменного разрешения, рамок и правил — нет пентеста.` } },

  { id: 's09-019', kind: 'story', k: ['d6-c3', 'd1-c6'], lvl: 2,
    title: { en: `Iowa 2019: the pentesters who went to jail`, ru: `Айова, 2019: пентестеры, попавшие в тюрьму` },
    body: {
      en: `<p>In September 2019, two employees of the security firm Coalfire were testing physical security at the Dallas County courthouse in Iowa. Shortly after midnight they set off the alarm. When the sheriff's deputies arrived, the testers showed their authorization letter.</p><p>They were arrested anyway and spent the night in jail, charged with burglary. The state court administration had hired them, but the <b>county owned the building</b>, and its sheriff hadn't agreed to anything. The contract was also unclear on whether breaking in at night was allowed.</p><p>The charges were later dropped. The lesson: the person who signs must have authority over everything in scope.</p>`,
      ru: `<p>В сентябре 2019 года два сотрудника охранной компании Coalfire проверяли физическую безопасность здания суда округа Даллас в Айове. Вскоре после полуночи они включили сигнализацию. Когда приехали помощники шерифа, тестировщики показали письмо с разрешением.</p><p>Их всё равно арестовали, и ночь они провели в тюрьме по обвинению во взломе. Наняла их судебная администрация штата, но <b>зданием владел округ</b>, а его шериф ни на что не соглашался. Договор к тому же не говорил ясно, разрешено ли проникать ночью.</p><p>Обвинения позже сняли. Урок: подписывающий должен иметь полномочия над всем, что входит в рамки.</p>`,
    },
    take: { en: `Authorization must come from whoever actually owns every target in scope.`, ru: `Разрешение должно исходить от фактического владельца каждой цели в рамках.` } },

  { id: 's09-020', kind: 'think', k: ['d6-c3', 'd1-c6', 'd1-c13'], lvl: 2,
    title: { en: `The password that opens a partner's system`, ru: `Пароль, открывающий систему партнёра` },
    body: {
      en: `<p>You're pentesting a company's web application, which is in scope. On the server you find a configuration file with credentials for a <b>partner company's</b> API. They would probably let you into the partner's customer database.</p><p>Showing that would make a dramatic finding. What do you do?</p>`,
      ru: `<p>Вы проводите пентест веб-приложения компании; оно в рамках. На сервере вы находите файл конфигурации с учётными данными к API <b>компании-партнёра</b>. Скорее всего, они пустят вас в базу клиентов партнёра.</p><p>Показать это — эффектная находка. Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>Stop at the boundary.</b> The partner never authorized you, and your client can't authorize access to someone else's system. Using those credentials would be unauthorized access, whatever your intentions.</p><p>Record the finding: credentials for a third party stored in plain text, a serious risk on its own. Tell your client contact promptly, so they can rotate the credentials and inform the partner. If testing the partner side matters, the partner must sign its own authorization. The Code of Ethics asks you to act <b>legally</b> and honourably, not to make the most dramatic report.</p>`,
      ru: `<p><b>Остановитесь на границе.</b> Партнёр вам ничего не разрешал, а ваш клиент не может разрешить доступ к чужой системе. Использование этих данных было бы несанкционированным доступом, какими бы ни были намерения.</p><p>Зафиксируйте находку: учётные данные третьей стороны в открытом виде — серьёзный риск сам по себе. Сразу сообщите контактному лицу клиента, чтобы данные сменили и предупредили партнёра. Если важно проверить сторону партнёра, он должен подписать собственное разрешение. Кодекс этики требует действовать <b>законно</b> и честно, а не делать самый эффектный отчёт.</p>`,
    },
    take: { en: `Out of scope means stop, record and report, even when the next step is easy.`, ru: `Вне рамок — значит остановиться, записать и сообщить, даже если следующий шаг прост.` } },

  { id: 's09-021', kind: 'vs', k: ['d6-c3'], lvl: 1,
    title: { en: `Black box vs grey box vs white box`, ru: `Чёрный, серый и белый ящик` },
    body: {
      en: `<ul><li><b>Black box</b> (zero knowledge): testers get only a company name or an address range, like an outside attacker. Realistic, but slow: much of the budget goes on reconnaissance.</li><li><b>Grey box</b> (partial knowledge): some information, such as a normal user account or a network diagram. Simulates an insider or an attacker who has already phished someone.</li><li><b>White box</b> (full knowledge): source code, architecture, admin access to documentation. The most thorough per hour spent.</li></ul><p>Rule: the less the testers know, the more realistic the attack, and the less of the system they'll cover for the same money.</p>`,
      ru: `<ul><li><b>Чёрный ящик</b> (нулевые знания): тестировщики получают только название компании или диапазон адресов, как внешний атакующий. Реалистично, но медленно: большая часть бюджета уходит на разведку.</li><li><b>Серый ящик</b> (частичные знания): часть сведений, например обычная учётная запись или схема сети. Имитирует инсайдера или атакующего, который уже кого-то зафишил.</li><li><b>Белый ящик</b> (полные знания): исходный код, архитектура, доступ к документации. Самый тщательный в пересчёте на час работы.</li></ul><p>Правило: чем меньше знают тестировщики, тем реалистичнее атака и тем меньше системы они охватят за те же деньги.</p>`,
    },
    take: { en: `Black box is realistic, white box is thorough, grey box sits between.`, ru: `Чёрный ящик реалистичен, белый тщателен, серый посередине.` } },

  { id: 's09-022', kind: 'picture', k: ['d6-c3'], lvl: 2,
    title: { en: `The four phases of a pentest`, ru: `Четыре фазы пентеста` },
    body: {
      en: `<p>NIST SP 800-115 describes a pentest in four phases. <b>Planning</b> produces the signed scope and rules. <b>Discovery</b> gathers information and finds weaknesses. <b>Attack</b> exploits them; each foothold often reveals new systems, so testers loop back to discovery from there. <b>Reporting</b> runs throughout, not just at the end: a critical finding is reported at once.</p>`,
      ru: `<p>NIST SP 800-115 описывает пентест в четырёх фазах. <b>Планирование</b> даёт подписанные рамки и правила. <b>Обнаружение</b> собирает сведения и находит слабости. <b>Атака</b> их эксплуатирует; каждый плацдарм часто открывает новые системы, и тестировщики оттуда возвращаются к обнаружению. <b>Отчётность</b> идёт всё время, а не только в конце: критичную находку сообщают сразу.</p>`,
    },
    dg: { title: { en: `Pentest phases (NIST SP 800-115)`, ru: `Фазы пентеста (NIST SP 800-115)` }, h: 290,
      nodes: [
        ['plan', 130, 80, { en: 'Planning', ru: 'Планирование' }, { en: 'scope, rules, signature', ru: 'рамки, правила, подпись' }, '📝', 'key'],
        ['disc', 380, 80, { en: 'Discovery', ru: 'Обнаружение' }, { en: 'recon, scans', ru: 'разведка, сканы' }, '🔍', 'ok'],
        ['att', 630, 80, { en: 'Attack', ru: 'Атака' }, { en: 'exploit, escalate', ru: 'эксплуатация, повышение' }, '🎯', 'bad'],
        ['rep', 380, 230, { en: 'Reporting', ru: 'Отчётность' }, { en: 'throughout and at the end', ru: 'всё время и в конце' }, '📄', 'dim', 260],
      ],
      edges: [['plan', 'disc', '', 'ok'], ['disc', 'att', { en: 'pivot', ru: 'новые цели' }, 'both'], ['plan', 'rep', '', 'dash'], ['disc', 'rep', '', 'dash'], ['att', 'rep', '', 'dash']],
      note: { en: `The attack phase loops back to discovery each time a new system comes into reach.`, ru: `Фаза атаки возвращается к обнаружению каждый раз, когда становится доступна новая система.` } },
    take: { en: `Planning, discovery, attack (looping back), reporting throughout.`, ru: `Планирование, обнаружение, атака (с возвратом), отчётность всё время.` } },

  { id: 's09-023', kind: 'vs', k: ['d6-c3'], lvl: 1,
    title: { en: `Red team vs blue team vs purple vs white`, ru: `Красная, синяя, фиолетовая и белая команды` },
    body: {
      en: `<ul><li><b>Red team</b>: the attackers. Unlike a pentest, which tries to find as many holes as possible, a red team pursues a goal ("reach the payment system") quietly, to test detection and response too.</li><li><b>Blue team</b>: the defenders, usually the security operations centre.</li><li><b>Purple team</b>: red and blue working together, sharing what each attack looked like, so defences improve during the exercise rather than after.</li><li><b>White team</b>: the referees. They set the rules, watch both sides and can stop the exercise.</li></ul>`,
      ru: `<ul><li><b>Красная команда</b>: атакующие. В отличие от пентеста, который ищет как можно больше дыр, красная команда тихо идёт к цели («добраться до платёжной системы»), чтобы проверить ещё и обнаружение, и реагирование.</li><li><b>Синяя команда</b>: защитники, обычно центр мониторинга безопасности (SOC).</li><li><b>Фиолетовая команда</b>: красные и синие работают вместе и делятся тем, как выглядела каждая атака, чтобы защита улучшалась во время учения, а не после.</li><li><b>Белая команда</b>: судьи. Они задают правила, наблюдают за обеими сторонами и могут остановить учение.</li></ul>`,
    },
    take: { en: `Red attacks, blue defends, purple shares, white referees.`, ru: `Красные атакуют, синие защищают, фиолетовые делятся, белые судят.` } },

  { id: 's09-024', kind: 'idea', k: ['d6-c3', 'd7-c5'], lvl: 2,
    title: { en: `Breach and attack simulation: a pentest that never stops`, ru: `Имитация взломов и атак: пентест, который не прекращается` },
    body: {
      en: `<p>A pentest is a snapshot: two weeks of testing, then a year of changes nobody tested. <b>Breach and attack simulation</b> (BAS) tools fill the gap. They run safe, automated versions of real attack techniques every day: a fake phishing payload, a simulated credential theft, a harmless file sent out the way stolen data would be.</p><p>Each technique is usually mapped to <b>MITRE ATT&amp;CK</b>, so the result reads like "we block 80% of these techniques and detect 60%". When a change quietly breaks a control, the next run shows it.</p><p>BAS doesn't replace human testers, who find what no script expects.</p>`,
      ru: `<p>Пентест — снимок: две недели тестов, затем год изменений, которые никто не проверял. Инструменты <b>имитации взломов и атак</b> (BAS) закрывают этот разрыв. Каждый день они запускают безопасные автоматические версии реальных техник атак: фальшивую фишинговую нагрузку, имитацию кражи учётных данных, безобидный файл, отправленный наружу тем же путём, что и украденные данные.</p><p>Каждая техника обычно привязана к <b>MITRE ATT&amp;CK</b>, и результат выглядит как «мы блокируем 80% этих техник и обнаруживаем 60%». Когда изменение тихо ломает меру, следующий запуск это покажет.</p><p>BAS не заменяет людей-тестировщиков, которые находят то, чего не ждёт ни один скрипт.</p>`,
    },
    take: { en: `BAS tests controls against known techniques continuously; humans still find the unexpected.`, ru: `BAS непрерывно проверяет меры против известных техник; неожиданное всё ещё находят люди.` } },

  { id: 's09-025', kind: 'back', back: 's02-022', k: ['d1-c14', 'd6-c3', 'd6-c5'], lvl: 2,
    title: { en: `Phishing again: testing the people layer`, ru: `Снова фишинг: проверка слоя людей` },
    body: {
      en: `<p>Stage 2 took a phishing attack apart step by step. You can test each step the same way you test a firewall:</p><ul><li><b>Phishing simulations</b>: fake but realistic emails sent to staff. Measure not only who clicks, but who <b>reports</b>, and how fast.</li><li><b>Vishing</b>: calls to the help desk asking for a password reset.</li><li><b>Physical tests</b>: tailgating into the office, leaving USB sticks in the car park.</li></ul><p>These need the same written authorization and rules as a technical pentest, plus care for people: the goal is to improve training, never to shame the person who fell for it.</p>`,
      ru: `<p>Этап 2 разобрал фишинговую атаку по шагам. Каждый шаг можно проверить так же, как межсетевой экран:</p><ul><li><b>Имитация фишинга</b>: поддельные, но реалистичные письма сотрудникам. Измеряйте не только, кто кликнул, но и кто <b>сообщил</b> и как быстро.</li><li><b>Вишинг</b>: звонки в службу поддержки с просьбой сбросить пароль.</li><li><b>Физические тесты</b>: проход в офис за кем-то, флешки на парковке.</li></ul><p>Здесь нужны те же письменное разрешение и правила, что и для технического пентеста, плюс бережность к людям: цель — улучшить обучение, а не пристыдить того, кто попался.</p>`,
    },
    take: { en: `Test people with permission, measure reporting as well as clicks, and never shame.`, ru: `Проверяйте людей с разрешением, измеряйте сообщения, а не только клики, и не стыдите.` } },

  { id: 's09-026', kind: 'back', back: 's05-049', k: ['d4-c7', 'd6-c2'], lvl: 2,
    title: { en: `Wi-Fi again: looking for the access point nobody approved`, ru: `Снова Wi-Fi: поиск точки доступа, которую никто не одобрял` },
    body: {
      en: `<p>Stage 5 listed the attacks on Wi-Fi: evil twins, rogue access points, weak encryption. A <b>wireless assessment</b> looks for them on purpose:</p><ul><li>Walk or drive around the site with a scanner, listing every network and access point in range.</li><li>Compare them with the approved list. An unknown access point plugged into an office socket is a <b>rogue</b>: a hole straight past the firewall.</li><li>Check what the approved ones use: WPA2 or WPA3 with 802.1X, not WEP or one shared password.</li></ul><p>Wireless intrusion detection systems do the same continuously, with sensors in the building.</p>`,
      ru: `<p>Этап 5 перечислил атаки на Wi-Fi: «злых двойников», несанкционированные точки доступа, слабое шифрование. <b>Беспроводная оценка</b> ищет их нарочно:</p><ul><li>Обойти или объехать площадку со сканером, составив список всех сетей и точек доступа в зоне приёма.</li><li>Сравнить со списком одобренных. Неизвестная точка доступа, воткнутая в офисную розетку, — <b>несанкционированная</b> (rogue): дыра прямо в обход межсетевого экрана.</li><li>Проверить, что используют одобренные: WPA2 или WPA3 с 802.1X, а не WEP или общий пароль.</li></ul><p>Беспроводные системы обнаружения вторжений делают то же непрерывно, с датчиками в здании.</p>`,
    },
    take: { en: `A wireless assessment finds rogue access points and weak settings before attackers do.`, ru: `Беспроводная оценка находит чужие точки доступа и слабые настройки раньше атакующих.` } },

  { id: 's09-027', kind: 'think', k: ['d6-c3', 'd6-c1'], lvl: 2,
    title: { en: `"The pentest found nothing"`, ru: `«Пентест ничего не нашёл»` },
    body: {
      en: `<p>The annual pentest report arrives: no high or critical findings. The IT director wants to tell the board "we're secure" and cut next year's testing budget.</p><p>What questions would you ask before agreeing?</p>`,
      ru: `<p>Пришёл отчёт ежегодного пентеста: ни одной высокой или критичной находки. ИТ-директор хочет сказать совету «мы защищены» и урезать бюджет на тесты в следующем году.</p><p>Какие вопросы вы зададите, прежде чем согласиться?</p>`,
    },
    reveal: {
      en: `<p>A clean result is good news only if the test was meaningful. Ask:</p><ul><li><b>Scope</b>: did it cover the systems that matter most, or only what was easy to approve?</li><li><b>Depth</b>: how many days, and black box or with credentials? A short black-box test may simply have run out of time.</li><li><b>Date</b>: what has changed since?</li><li><b>Detection</b>: did the blue team notice the testers at all?</li></ul><p>Then report it honestly: "no serious findings within this scope, on these dates". A pentest is a sample, not a guarantee.</p>`,
      ru: `<p>Чистый результат — хорошая новость, только если тест был содержательным. Спросите:</p><ul><li><b>Рамки</b>: охватил ли он самые важные системы или только то, что было легко согласовать?</li><li><b>Глубина</b>: сколько дней, чёрный ящик или с учётными данными? Короткому тесту чёрного ящика могло просто не хватить времени.</li><li><b>Дата</b>: что изменилось с тех пор?</li><li><b>Обнаружение</b>: заметила ли синяя команда тестировщиков вообще?</li></ul><p>Затем доложите честно: «серьёзных находок нет в этих рамках, на эти даты». Пентест — выборка, а не гарантия.</p>`,
    },
    take: { en: `"Nothing found" means nothing found in that scope, depth and week.`, ru: `«Ничего не найдено» — значит, ничего в этих рамках, этой глубине и на этой неделе.` } },

  { id: 's09-028', kind: 'idea', k: ['d6-c6'], lvl: 1,
    title: { en: `The report: two audiences, one sensitive document`, ru: `Отчёт: две аудитории, один чувствительный документ` },
    body: {
      en: `<p>A test is only as useful as its report, and the report has two readers:</p><ul><li><b>Management</b> reads the <b>executive summary</b>: what the risks are in business terms, how serious, and what decisions or money are needed. No exploit code.</li><li><b>Technical teams</b> read the findings: what was found, where, how to reproduce it, evidence, and how to fix it.</li></ul><p>Every finding gets a risk rating, so the two parts agree on what matters most.</p><p>The report itself is a map of your weaknesses. Classify it, limit who gets it, and store it like any other confidential data.</p>`,
      ru: `<p>Тест полезен ровно настолько, насколько полезен отчёт, а у отчёта два читателя:</p><ul><li><b>Руководство</b> читает <b>резюме для руководства</b>: какие риски в терминах бизнеса, насколько серьёзно, какие нужны решения или деньги. Без кода эксплойтов.</li><li><b>Технические команды</b> читают находки: что найдено, где, как воспроизвести, доказательства и как исправить.</li></ul><p>Каждая находка получает оценку риска, чтобы обе части сходились в том, что важнее всего.</p><p>Сам отчёт — карта ваших слабостей. Классифицируйте его, ограничьте круг получателей и храните как любые конфиденциальные данные.</p>`,
    },
    take: { en: `Executive summary for decisions, technical detail for fixes; protect the report itself.`, ru: `Резюме — для решений, детали — для исправлений; сам отчёт защищайте.` } },

  { id: 's09-029', kind: 'idea', k: ['d6-c6', 'd7-c6'], lvl: 1,
    title: { en: `A finding isn't closed until it's retested`, ru: `Находка не закрыта, пока не проверена повторно` },
    body: {
      en: `<p>Findings go into a tracking system, like any other work:</p><ul><li>each one gets an <b>owner</b> (the team that runs the system, not the security team);</li><li>a <b>deadline</b> set by its risk, for example critical in 15 days, high in 30;</li><li>a fix that goes through normal <b>change management</b>, so it doesn't break production;</li><li>a <b>retest</b> that proves it's actually fixed.</li></ul><p>"Ticket closed" and "vulnerability gone" aren't the same thing. Equifax's staff were told to patch; nobody verified that the portal had been.</p>`,
      ru: `<p>Находки попадают в систему учёта, как любая другая работа:</p><ul><li>у каждой есть <b>владелец</b> (команда, эксплуатирующая систему, а не команда безопасности);</li><li><b>срок</b>, заданный риском, например критичные за 15 дней, высокие за 30;</li><li>исправление проходит обычное <b>управление изменениями</b>, чтобы не сломать продакшен;</li><li><b>повторная проверка</b> доказывает, что исправлено на самом деле.</li></ul><p>«Тикет закрыт» и «уязвимости нет» — не одно и то же. Сотрудникам Equifax велели установить патч; никто не проверил, что на портале его установили.</p>`,
    },
    take: { en: `Owner, deadline by risk, change management, retest.`, ru: `Владелец, срок по риску, управление изменениями, повторная проверка.` } },

  { id: 's09-030', kind: 'think', k: ['d6-c6', 'd1-c9', 'd2-c7'], lvl: 2,
    title: { en: `The machine that can't be patched`, ru: `Машина, которую нельзя пропатчить` },
    body: {
      en: `<p>The scan flags a critical flaw on a PC that controls a laboratory analyser. The analyser's vendor supports only Windows 7 and refuses to certify anything newer. Replacing the analyser costs €400,000 and isn't budgeted until 2028.</p><p>The security analyst marks the finding "accepted" in the tracker so it stops appearing in reports. What should actually happen?</p>`,
      ru: `<p>Скан отмечает критичную уязвимость на ПК, управляющем лабораторным анализатором. Производитель анализатора поддерживает только Windows 7 и отказывается сертифицировать что-то новее. Замена анализатора стоит 400 000 € и не заложена в бюджет до 2028 года.</p><p>Аналитик безопасности помечает находку в трекере как «принятую», чтобы она перестала появляться в отчётах. Что должно происходить на самом деле?</p>`,
    },
    reveal: {
      en: `<p>An <b>exception</b>, handled properly:</p><ul><li><b>Document</b> the risk and why it can't be fixed now.</li><li>Add <b>compensating controls</b>: isolate the PC in its own network segment, block internet access, allow only the analyser's traffic, monitor it closely.</li><li>Get <b>formal risk acceptance</b> from the business owner with the authority to accept it, such as the head of the lab, not the analyst.</li><li>Set an <b>expiry and review date</b>, tied to the replacement plan.</li></ul><p>An exception is a managed decision with an end date, not a way to hide a finding.</p>`,
      ru: `<p><b>Исключение</b>, оформленное правильно:</p><ul><li><b>Задокументировать</b> риск и почему его нельзя устранить сейчас.</li><li>Добавить <b>компенсирующие меры</b>: вынести ПК в отдельный сегмент сети, закрыть доступ в интернет, разрешить только трафик анализатора, внимательно его мониторить.</li><li>Получить <b>формальное принятие риска</b> от владельца со стороны бизнеса, у которого есть на это полномочия, например руководителя лаборатории, а не аналитика.</li><li>Задать <b>срок действия и дату пересмотра</b>, привязанные к плану замены.</li></ul><p>Исключение — управляемое решение с датой окончания, а не способ спрятать находку.</p>`,
    },
    take: { en: `Exception: documented, compensated, accepted by the right owner, with an expiry date.`, ru: `Исключение: задокументировано, компенсировано, принято нужным владельцем, со сроком.` } },

  { id: 's09-031', kind: 'vs', k: ['d6-c6'], lvl: 1,
    title: { en: `Coordinated vs full disclosure`, ru: `Скоординированное и полное раскрытие` },
    body: {
      en: `<p>What should someone do after finding a flaw in <b>another company's</b> product?</p><ul><li><b>Coordinated</b> (responsible) <b>disclosure</b>: report it privately to the vendor, give them reasonable time to fix it (90 days is a common default), then publish details together with the fix.</li><li><b>Full disclosure</b>: publish everything at once. It pressures slow vendors, but gives attackers a head start over everyone using the product.</li><li><b>Non-disclosure</b>: keep it secret, or sell it. Leaves users exposed with no fix coming.</li></ul><p><b>Bug bounty</b> programs invite coordinated reports and pay for them. The exam favours coordinated disclosure.</p>`,
      ru: `<p>Что делать тому, кто нашёл изъян в продукте <b>чужой компании</b>?</p><ul><li><b>Скоординированное</b> (ответственное) <b>раскрытие</b>: сообщить производителю приватно, дать разумный срок на исправление (частый вариант по умолчанию — 90 дней), затем опубликовать подробности вместе с исправлением.</li><li><b>Полное раскрытие</b>: опубликовать всё сразу. Давит на медленных производителей, но даёт атакующим фору над всеми, кто пользуется продуктом.</li><li><b>Нераскрытие</b>: держать в секрете или продать. Пользователи остаются уязвимы, а исправления не будет.</li></ul><p>Программы <b>bug bounty</b> приглашают к скоординированным сообщениям и платят за них. Экзамен предпочитает скоординированное раскрытие.</p>`,
    },
    take: { en: `Tell the vendor privately, allow time to fix, then publish together.`, ru: `Сообщить производителю приватно, дать время, затем публиковать вместе.` } },

  { id: 's09-032', kind: 'back', back: 's05-019', k: ['d4-c6', 'd6-c6'], lvl: 2,
    title: { en: `Kaminsky again: a disclosure done right`, ru: `Снова Каминский: раскрытие, сделанное правильно` },
    body: {
      en: `<p>Stage 5 told how Dan Kaminsky found, in 2008, that almost any DNS server could be poisoned. Publishing that at once would have handed attackers the internet's phone book.</p><p>Instead he contacted the vendors privately. In March 2008, engineers from many DNS vendors met in secret at Microsoft. On <b>8 July 2008</b> they released patches together, across products, on the same day. Kaminsky asked other researchers not to speculate about details until his talk at Black Hat in August.</p><p>Details leaked about two weeks early, but by then most large servers were already patched. That's what coordination buys: a head start for the defenders.</p>`,
      ru: `<p>Этап 5 рассказывал, как Дэн Каминский в 2008 году обнаружил, что отравить можно почти любой DNS-сервер. Опубликовать это сразу значило бы отдать атакующим телефонную книгу интернета.</p><p>Вместо этого он приватно связался с производителями. В марте 2008 года инженеры многих производителей DNS тайно встретились в Microsoft. <b>8 июля 2008 года</b> они вместе выпустили патчи для разных продуктов в один день. Каминский попросил других исследователей не строить догадок о деталях до его доклада на Black Hat в августе.</p><p>Детали утекли примерно на две недели раньше, но к тому времени большинство крупных серверов уже были пропатчены. Вот что даёт координация: фору защитникам.</p>`,
    },
    take: { en: `Coordinated disclosure gives defenders the head start.`, ru: `Скоординированное раскрытие даёт фору защитникам.` } },

  { id: 's09-033', kind: 'think', k: ['d6-c6', 'd1-c6'], lvl: 2,
    title: { en: `The vendor that doesn't answer`, ru: `Производитель, который не отвечает` },
    body: {
      en: `<p>While configuring a popular building-access product at work, you discover that its admin interface can be opened without a password. You reported it to the vendor 100 days ago. No fix, no reply.</p><p>A colleague says: "Post it on social media, that'll make them move." What do you do?</p>`,
      ru: `<p>Настраивая на работе популярный продукт контроля доступа в здания, вы обнаружили, что его панель администратора открывается без пароля. Вы сообщили производителю 100 дней назад. Ни исправления, ни ответа.</p><p>Коллега говорит: «Выложи в соцсети, это их расшевелит». Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p>First, protect your own organization: restrict access to that interface and tell your manager. You found it at work, so your employer's policy applies before your personal judgement.</p><p>Then <b>escalate, don't detonate</b>: report through a coordinator such as CERT/CC or your national CSIRT, which can reach the vendor and warn customers. If public disclosure comes, it should follow a stated deadline and include <b>mitigations</b>, not a ready-made attack. The Code of Ethics puts protecting society first; a viral post that helps attackers before users can react doesn't.</p>`,
      ru: `<p>Сначала защитите свою организацию: ограничьте доступ к этой панели и сообщите руководителю. Вы нашли это на работе, поэтому политика работодателя важнее вашего личного мнения.</p><p>Затем <b>эскалируйте, а не взрывайте</b>: сообщите через координатора, такого как CERT/CC или национальный CSIRT, который может достучаться до производителя и предупредить клиентов. Если дело дойдёт до публичного раскрытия, оно должно следовать объявленному сроку и содержать <b>меры смягчения</b>, а не готовую атаку. Кодекс этики ставит защиту общества на первое место; вирусный пост, который помогает атакующим раньше, чем пользователи успеют отреагировать, ей не служит.</p>`,
    },
    take: { en: `Protect your own systems, escalate through a coordinator, publish mitigations with a deadline.`, ru: `Защитите свои системы, эскалируйте через координатора, публикуйте меры по объявленному сроку.` } },

  { id: 's09-034', kind: 'idea', k: ['d6-c7'], lvl: 1,
    title: { en: `What makes an audit an audit`, ru: `Что делает аудит аудитом` },
    body: {
      en: `<p>An audit has four ingredients:</p><ul><li><b>Criteria</b>: what you're measured against, such as ISO 27001, PCI DSS, a contract or a law.</li><li><b>Independence</b>: the auditor doesn't report to, or work in, the area being audited. Internal auditors report to the board's audit committee for this reason.</li><li><b>Evidence</b>: samples, logs, screenshots and interviews, not just policies. "Show me" rather than "tell me".</li><li><b>An opinion</b> that other people can rely on.</li></ul><p>Auditors find and report; they don't fix. If an auditor designed the control, they can't independently audit it later.</p>`,
      ru: `<p>У аудита четыре составляющие:</p><ul><li><b>Критерии</b>: с чем сравнивают, например ISO 27001, PCI DSS, договор или закон.</li><li><b>Независимость</b>: аудитор не подчиняется проверяемому подразделению и не работает в нём. Поэтому внутренние аудиторы отчитываются перед комитетом по аудиту совета директоров.</li><li><b>Доказательства</b>: выборки, журналы, снимки экрана и интервью, а не только политики. «Покажите», а не «расскажите».</li><li><b>Заключение</b>, на которое могут полагаться другие.</li></ul><p>Аудиторы находят и сообщают, но не исправляют. Если аудитор спроектировал меру, позже он не сможет независимо её проверить.</p>`,
    },
    take: { en: `Criteria, independence, evidence, opinion; auditors report, they don't fix.`, ru: `Критерии, независимость, доказательства, заключение; аудитор сообщает, но не исправляет.` } },

  { id: 's09-035', kind: 'vs', k: ['d6-c7'], lvl: 1,
    title: { en: `SOC 1 vs SOC 2 vs SOC 3`, ru: `SOC 1, SOC 2 и SOC 3` },
    body: {
      en: `<p>When you outsource payroll or use a SaaS product, you can't audit the vendor yourself. Instead the vendor hires an auditor, who writes a <b>SOC report</b> (System and Organization Controls, under the US standard SSAE 18; ISAE 3402 is the international one).</p><ul><li><b>SOC 1</b>: controls that affect your <b>financial reporting</b>. Read by your financial auditors.</li><li><b>SOC 2</b>: controls for security, availability, processing integrity, confidentiality and privacy (the Trust Services Criteria). Detailed, shared under NDA. The usual one for cloud vendors.</li><li><b>SOC 3</b>: the same criteria as SOC 2, as a short <b>public</b> summary without the test details.</li></ul>`,
      ru: `<p>Когда вы отдаёте расчёт зарплаты на аутсорсинг или пользуетесь SaaS, проверить поставщика сами вы не можете. Вместо этого поставщик нанимает аудитора, который пишет <b>SOC-отчёт</b> (System and Organization Controls, по американскому стандарту SSAE 18; международный — ISAE 3402).</p><ul><li><b>SOC 1</b>: меры, влияющие на вашу <b>финансовую отчётность</b>. Читают ваши финансовые аудиторы.</li><li><b>SOC 2</b>: меры по безопасности, доступности, целостности обработки, конфиденциальности и приватности (Trust Services Criteria). Подробный, передаётся под NDA. Обычный выбор для облачных поставщиков.</li><li><b>SOC 3</b>: те же критерии, что у SOC 2, в виде короткой <b>публичной</b> сводки без деталей тестов.</li></ul>`,
    },
    take: { en: `SOC 1: finance. SOC 2: security, detailed, under NDA. SOC 3: public summary.`, ru: `SOC 1 — финансы. SOC 2 — безопасность, подробно, под NDA. SOC 3 — публичная сводка.` } },

  { id: 's09-036', kind: 'vs', k: ['d6-c7'], lvl: 2,
    title: { en: `Type I vs Type II`, ru: `Тип I и тип II` },
    body: {
      en: `<p>SOC 1 and SOC 2 reports each come in two types:</p><ul><li><b>Type I</b>: the auditor checks that the controls are <b>suitably designed</b>, as of <b>one date</b>. It shows the controls exist on paper and in place.</li><li><b>Type II</b>: the auditor also tests that they <b>operated effectively</b> over a <b>period</b>, usually 6 to 12 months, by sampling evidence across it. It shows the controls actually worked, day after day.</li></ul><p>Rule: Type I is a photograph, Type II is a film. When assurance matters, ask for a recent SOC 2 Type II.</p>`,
      ru: `<p>Отчёты SOC 1 и SOC 2 бывают двух типов:</p><ul><li><b>Тип I</b>: аудитор проверяет, что меры <b>правильно спроектированы</b>, на <b>одну дату</b>. Показывает, что меры существуют на бумаге и внедрены.</li><li><b>Тип II</b>: аудитор ещё и проверяет, что они <b>эффективно работали</b> в течение <b>периода</b>, обычно от 6 до 12 месяцев, делая выборки доказательств за весь период. Показывает, что меры действительно работали день за днём.</li></ul><p>Правило: тип I — фотография, тип II — фильм. Когда важна уверенность, просите свежий SOC 2 Type II.</p>`,
    },
    take: { en: `Type I: designed, on one date. Type II: worked, over a period.`, ru: `Тип I — спроектировано, на дату. Тип II — работало, за период.` } },

  { id: 's09-037', kind: 'picture', k: ['d6-c7', 'd1-c13'], lvl: 2,
    title: { en: `Whose report covers what`, ru: `Чей отчёт что покрывает` },
    body: {
      en: `<p>The vendor's auditor tests the vendor's controls and issues the SOC 2 report, which the vendor passes to you. Two things in it are easy to miss. The vendor may run on a <b>sub-service organization</b>, such as a cloud host, that the report <b>carves out</b> rather than covers. And the report lists <b>complementary user entity controls</b> (CUECs): the controls it assumes <b>you</b> operate, like reviewing your own users' access.</p>`,
      ru: `<p>Аудитор поставщика проверяет его меры и выпускает отчёт SOC 2, который поставщик передаёт вам. Две вещи в нём легко пропустить. Поставщик может работать на <b>субсервисной организации</b>, например облачном хостинге, которую отчёт <b>исключает</b> (carve-out), а не покрывает. И в отчёте перечислены <b>дополнительные меры пользователя</b> (CUEC): меры, которые, как предполагается, выполняете <b>вы</b>, например пересмотр доступа собственных пользователей.</p>`,
    },
    dg: { title: { en: `SOC 2: who tests, who relies`, ru: `SOC 2: кто проверяет, кто полагается` }, h: 300,
      zones: [[20, 30, 250, 250, { en: 'You', ru: 'Вы' }, 'trust'], [290, 30, 450, 250, { en: 'Vendor side', ru: 'Сторона поставщика' }, 'untrust']],
      nodes: [
        ['you', 145, 110, { en: 'Your company', ru: 'Ваша компания' }, { en: 'user entity: CUECs', ru: 'пользователь: CUEC' }, '🏢', 'key'],
        ['ven', 420, 110, { en: 'SaaS vendor', ru: 'SaaS-поставщик' }, { en: 'service organization', ru: 'сервисная организация' }, '☁️', 'ok'],
        ['aud', 420, 235, { en: 'Auditor', ru: 'Аудитор' }, { en: 'independent CPA firm', ru: 'независимая фирма' }, '🧾', 'dim'],
        ['host', 640, 235, { en: 'Cloud host', ru: 'Облачный хостинг' }, { en: 'often carved out', ru: 'часто исключён' }, '🖥', 'bad'],
      ],
      edges: [['aud', 'ven', { en: 'tests controls', ru: 'проверяет' }, 'ok'], ['ven', 'you', { en: 'SOC 2', ru: 'SOC 2' }, 'key'], ['host', 'ven', '', 'dash']],
      note: { en: `Read the scope, the exceptions, the carve-outs and your own CUECs, not just the opinion.`, ru: `Читайте рамки, исключения, carve-out и свои CUEC, а не только заключение.` } },
    take: { en: `A SOC 2 covers the vendor's scope; carve-outs and your CUECs are on you.`, ru: `SOC 2 покрывает рамки поставщика; carve-out и ваши CUEC — на вас.` } },

  { id: 's09-038', kind: 'think', k: ['d6-c7', 'd1-c13', 'd1-c2'], lvl: 2,
    title: { en: `The vendor's two-year-old report`, ru: `Отчёт поставщика двухлетней давности` },
    body: {
      en: `<p>You're about to sign with a SaaS vendor that will store your customers' personal data. Asked for assurance, they send a <b>SOC 3</b> and a <b>SOC 2 Type I</b> dated two years ago, and say: "We're SOC 2 compliant."</p><p>Is that enough?</p>`,
      ru: `<p>Вы собираетесь подписать договор с SaaS-поставщиком, который будет хранить персональные данные ваших клиентов. На просьбу о гарантиях он присылает <b>SOC 3</b> и <b>SOC 2 Type I</b> двухлетней давности и говорит: «Мы соответствуем SOC 2».</p><p>Этого достаточно?</p>`,
    },
    reveal: {
      en: `<p>No. The SOC 3 is a marketing summary. The Type I only says the controls were designed well, on one day two years ago. There's no such thing as being "SOC 2 compliant": there are reports, with dates, scopes and results.</p><p>Ask for a <b>current SOC 2 Type II</b> that covers the service you're buying, under NDA. Read the exceptions the auditor found, the carve-outs and the CUECs you must operate. If the period ended months ago, ask for a <b>bridge letter</b> covering the gap. Then put a right-to-audit clause and breach notification terms in the contract.</p>`,
      ru: `<p>Нет. SOC 3 — маркетинговая сводка. Type I говорит лишь, что меры были хорошо спроектированы в один день два года назад. «Соответствия SOC 2» не бывает: бывают отчёты с датами, рамками и результатами.</p><p>Попросите <b>актуальный SOC 2 Type II</b>, покрывающий покупаемую услугу, под NDA. Прочитайте исключения, найденные аудитором, carve-out и CUEC, которые должны выполнять вы. Если период закончился месяцы назад, попросите <b>bridge letter</b> на промежуток. Затем внесите в договор право на аудит и условия уведомления о взломе.</p>`,
    },
    take: { en: `Ask for a current SOC 2 Type II for the right scope, and read it.`, ru: `Просите актуальный SOC 2 Type II на нужные рамки и читайте его.` } },

  { id: 's09-039', kind: 'back', back: 's02-016', k: ['d1-c13', 'd6-c7'], lvl: 2,
    title: { en: `Vendors again: assurance you can check`, ru: `Снова поставщики: гарантия, которую можно проверить` },
    body: {
      en: `<p>Stage 2 said vendors are people with access, and stages 3 and 5 kept finding vendors at the root of breaches. Now you have the tools to check them, roughly in order of effort:</p><ul><li>a <b>security questionnaire</b>: cheap, but self-reported;</li><li><b>certifications and reports</b>: ISO 27001, SOC 2 Type II, PCI DSS;</li><li>a <b>right-to-audit</b> clause, and using it for critical vendors;</li><li><b>monitoring</b>: their breach news, their attack surface, and their access in your logs.</li></ul><p>MOVEit showed why this goes beyond the vendors you signed with: your vendor's vendor holds your data too.</p>`,
      ru: `<p>Этап 2 сказал, что поставщики — это люди с доступом, а этапы 3 и 5 снова и снова находили поставщиков у истоков взломов. Теперь у вас есть инструменты, чтобы их проверять, примерно по возрастанию усилий:</p><ul><li><b>анкета безопасности</b>: дёшево, но со слов самого поставщика;</li><li><b>сертификаты и отчёты</b>: ISO 27001, SOC 2 Type II, PCI DSS;</li><li>пункт о <b>праве на аудит</b> и его использование для критичных поставщиков;</li><li><b>мониторинг</b>: новости об их взломах, их поверхность атаки и их доступ в ваших журналах.</li></ul><p>MOVEit показал, почему это выходит за пределы поставщиков, с которыми вы подписали договор: поставщик вашего поставщика тоже хранит ваши данные.</p>`,
    },
    take: { en: `Questionnaire, reports, right to audit, monitoring, including your vendors' vendors.`, ru: `Анкета, отчёты, право на аудит, мониторинг — включая поставщиков ваших поставщиков.` } },

  { id: 's09-040', kind: 'vs', k: ['d6-c7'], lvl: 2,
    title: { en: `ISO 27001 certificate vs SOC 2 report`, ru: `Сертификат ISO 27001 и отчёт SOC 2` },
    body: {
      en: `<ul><li><b>ISO 27001</b>: an international standard for an information security <b>management system</b> (ISMS). An accredited certification body audits it and issues a <b>certificate</b>, valid for three years with yearly surveillance audits. Public, short, pass or fail. Read the <b>scope</b> on the certificate: it may cover one office.</li><li><b>SOC 2</b>: an <b>attestation report</b> by an independent auditor (a CPA firm) on specific controls against the Trust Services Criteria. Long, detailed, lists each test and any exceptions, shared under NDA.</li></ul><p>Rule: ISO 27001 says the management system is certified; SOC 2 Type II shows how specific controls performed.</p>`,
      ru: `<ul><li><b>ISO 27001</b>: международный стандарт <b>системы управления</b> информационной безопасностью (СУИБ). Аккредитованный орган по сертификации проводит аудит и выдаёт <b>сертификат</b> на три года с ежегодными надзорными аудитами. Публичный, краткий, «прошёл или нет». Читайте <b>область</b> в сертификате: она может охватывать один офис.</li><li><b>SOC 2</b>: <b>отчёт о заверении</b> от независимого аудитора (фирмы CPA) по конкретным мерам против Trust Services Criteria. Длинный, подробный, перечисляет каждый тест и все исключения, передаётся под NDA.</li></ul><p>Правило: ISO 27001 говорит, что система управления сертифицирована; SOC 2 Type II показывает, как работали конкретные меры.</p>`,
    },
    take: { en: `ISO 27001 certifies the management system; SOC 2 reports on the controls.`, ru: `ISO 27001 сертифицирует систему управления; SOC 2 отчитывается о мерах.` } },

  { id: 's09-041', kind: 'back', back: 's07-053', k: ['d3-c3', 'd6-c7', 'd1-c10'], lvl: 2,
    title: { en: `Three kinds of "someone checked"`, ru: `Три вида «кто-то проверил»` },
    body: {
      en: `<p>Stage 7 separated <b>certification</b> (a technical evaluation of a system) from <b>accreditation</b> (management formally accepting the risk and authorizing it to run). This stage added audits. They're easy to blur, so put them side by side:</p><ul><li><b>Product evaluation</b> (Common Criteria, EAL): is this product built securely, as tested in a lab?</li><li><b>Authorization</b> (RMF): is this system, in our environment, acceptable to operate? An official signs.</li><li><b>Audit</b> (SOC 2, ISO 27001): does this organization's set of controls meet the criteria, and did it work?</li></ul><p>Each answers a different question; none replaces the others.</p>`,
      ru: `<p>Этап 7 развёл <b>сертификацию</b> (техническая оценка системы) и <b>аккредитацию</b> (руководство формально принимает риск и разрешает эксплуатацию). Этот этап добавил аудиты. Их легко смешать, поэтому поставим рядом:</p><ul><li><b>Оценка продукта</b> (Common Criteria, EAL): надёжно ли построен этот продукт по результатам лабораторных тестов?</li><li><b>Авторизация</b> (RMF): допустимо ли эксплуатировать эту систему в нашей среде? Подписывает должностное лицо.</li><li><b>Аудит</b> (SOC 2, ISO 27001): соответствует ли набор мер этой организации критериям и работал ли он?</li></ul><p>Каждый отвечает на свой вопрос; ни один не заменяет другие.</p>`,
    },
    take: { en: `Evaluation judges a product, authorization a system, audit an organization.`, ru: `Оценка судит продукт, авторизация — систему, аудит — организацию.` } },

  { id: 's09-042', kind: 'story', k: ['d7-c2', 'd7-c5', 'd1-c13'], lvl: 1,
    title: { en: `Target again: the alarm that rang`, ru: `Снова Target: тревога, которая прозвучала` },
    body: {
      en: `<p>Stage 1 told how attackers reached Target's checkout systems through a heating contractor in 2013. What's less known is that Target's tools <b>saw them</b>.</p><p>Months earlier, Target had installed a malware detection system from FireEye. In late November, as the attackers installed their card-stealing malware, it raised alerts. Target's security team in Bangalore noticed and passed them on to the operations centre in Minneapolis. More alerts followed. Nobody acted. A setting that would have removed the malware automatically had been switched off.</p><p>Card data kept flowing out for about two more weeks, until the US Justice Department told Target.</p>`,
      ru: `<p>Этап 1 рассказывал, как в 2013 году атакующие добрались до кассовых систем Target через подрядчика по отоплению. Менее известно то, что инструменты Target <b>их видели</b>.</p><p>За несколько месяцев до этого Target установила систему обнаружения вредоносного ПО от FireEye. В конце ноября, когда атакующие ставили программу для кражи карт, она подняла тревогу. Команда безопасности Target в Бангалоре заметила это и передала в операционный центр в Миннеаполисе. Последовали новые тревоги. Никто ничего не сделал. Настройка, которая удалила бы вредонос автоматически, была выключена.</p><p>Данные карт продолжали утекать ещё около двух недель, пока Target не сообщило Министерство юстиции США.</p>`,
    },
    take: { en: `Detection only matters if someone owns the alert and acts on it.`, ru: `Обнаружение имеет смысл, только если у тревоги есть владелец и он действует.` } },

  { id: 's09-043', kind: 'idea', k: ['d7-c2'], lvl: 1,
    title: { en: `Logs: the system's diary`, ru: `Журналы: дневник системы` },
    body: {
      en: `<p>Almost everything can write a log: servers, firewalls, applications, cloud consoles, badge readers. A useful log entry answers <b>who</b> did <b>what</b>, <b>when</b>, from <b>where</b>, and whether it <b>succeeded</b>.</p><p>Logs serve three purposes: noticing attacks as they happen, investigating afterwards, and proving to auditors that controls ran. For all three:</p><ul><li><b>Centralize</b> them, because a log on the hacked machine can be erased.</li><li><b>Synchronize clocks</b> (NTP), or you can't put events from different systems in order.</li><li><b>Keep</b> them as long as policy and law require, and no longer.</li></ul>`,
      ru: `<p>Журнал может вести почти всё: серверы, межсетевые экраны, приложения, облачные консоли, считыватели пропусков. Полезная запись отвечает, <b>кто</b> сделал <b>что</b>, <b>когда</b>, <b>откуда</b> и <b>успешно ли</b>.</p><p>У журналов три назначения: замечать атаки по ходу, расследовать потом и доказывать аудиторам, что меры работали. Для всех трёх:</p><ul><li><b>Централизуйте</b> их: журнал на взломанной машине можно стереть.</li><li><b>Синхронизируйте часы</b> (NTP), иначе события разных систем не выстроить по порядку.</li><li><b>Храните</b> столько, сколько требуют политика и закон, и не дольше.</li></ul>`,
    },
    take: { en: `Who, what, when, where, outcome; centralized, time-synced, kept per policy.`, ru: `Кто, что, когда, откуда, результат; централизованно, с синхронным временем, по политике хранения.` } },

  { id: 's09-044', kind: 'picture', k: ['d7-c2', 'd6-c5', 'd1-c11'], lvl: 2,
    title: { en: `From log lines to a response`, ru: `От строк журнала до реакции` },
    body: {
      en: `<p>Logs from many sources flow into a <b>SIEM</b>, which puts them in one format and <b>correlates</b> them: a failed login burst, then a success, then a large download is an alert, though each event alone is noise. A copy goes to protected storage for investigations and audits. Alerts reach an analyst, often helped by <b>SOAR</b> playbooks, and real ones become incidents.</p>`,
      ru: `<p>Журналы из многих источников стекаются в <b>SIEM</b>, которая приводит их к одному формату и <b>коррелирует</b>: всплеск неудачных входов, затем успешный вход, затем большая выгрузка — это тревога, хотя каждое событие по отдельности — шум. Копия уходит в защищённое хранилище для расследований и аудитов. Тревоги попадают к аналитику, которому часто помогают сценарии <b>SOAR</b>, а настоящие становятся инцидентами.</p>`,
    },
    dg: { title: { en: `The monitoring pipeline`, ru: `Конвейер мониторинга` }, h: 310,
      nodes: [
        ['srv', 110, 70, { en: 'Servers, apps', ru: 'Серверы, приложения' }, '', '🖥', 'dim'],
        ['fw', 110, 155, { en: 'Network devices', ru: 'Сетевые устройства' }, '', '🧱', 'dim'],
        ['bdg', 110, 240, { en: 'Cloud, badges', ru: 'Облако, пропуска' }, '', '☁️', 'dim'],
        ['siem', 380, 155, { en: 'SIEM', ru: 'SIEM' }, { en: 'normalize, correlate', ru: 'нормализует, коррелирует' }, '🧠', 'key'],
        ['store', 380, 270, { en: 'Write-once storage', ru: 'Хранилище без перезаписи' }, '', '🗄', 'ok'],
        ['soar', 630, 80, { en: 'Analyst + SOAR', ru: 'Аналитик + SOAR' }, { en: 'triage, playbooks', ru: 'разбор, сценарии' }, '👩‍💻', 'ok'],
        ['ir', 630, 230, { en: 'Incident', ru: 'Инцидент' }, { en: 'response process', ru: 'процесс реагирования' }, '🚨', 'bad'],
      ],
      edges: [['srv', 'siem', '', 'dash'], ['fw', 'siem', '', 'dash'], ['bdg', 'siem', '', 'dash'], ['siem', 'store', '', 'ok'], ['siem', 'soar', { en: 'alert', ru: 'тревога' }, 'key'], ['soar', 'ir', '', 'bad']],
      note: { en: `Target's pipeline worked up to the analyst; the last arrow was missing.`, ru: `У Target конвейер работал до аналитика; не хватало последней стрелки.` } },
    take: { en: `Collect, correlate, store safely, alert, and make sure a person acts.`, ru: `Собрать, коррелировать, надёжно хранить, оповестить — и чтобы человек действовал.` } },

  { id: 's09-045', kind: 'vs', k: ['d7-c2'], lvl: 2,
    title: { en: `SIEM vs SOAR vs UEBA`, ru: `SIEM, SOAR и UEBA` },
    body: {
      en: `<ul><li><b>SIEM</b> (security information and event management): collects and correlates logs, raises alerts, keeps records for investigations and compliance. It <b>sees</b>.</li><li><b>SOAR</b> (security orchestration, automation and response): runs playbooks when an alert fires, such as enriching it, isolating a laptop or disabling an account. It <b>acts</b>.</li><li><b>UEBA</b> (user and entity behaviour analytics): learns what normal looks like for each user and device and flags departures, like an accountant downloading source code at 3 a.m. It <b>notices the unusual</b>, useful against insiders and stolen accounts.</li></ul>`,
      ru: `<ul><li><b>SIEM</b> (управление информацией и событиями безопасности): собирает и коррелирует журналы, поднимает тревоги, хранит записи для расследований и соответствия требованиям. Она <b>видит</b>.</li><li><b>SOAR</b> (оркестрация, автоматизация и реагирование): запускает сценарии при тревоге, например обогащает её, изолирует ноутбук или блокирует учётную запись. Она <b>действует</b>.</li><li><b>UEBA</b> (поведенческая аналитика пользователей и сущностей): узнаёт, что нормально для каждого пользователя и устройства, и отмечает отклонения, например бухгалтера, качающего исходный код в 3 часа ночи. Она <b>замечает необычное</b>, что полезно против инсайдеров и украденных учёток.</li></ul>`,
    },
    take: { en: `SIEM sees, SOAR acts, UEBA spots the unusual.`, ru: `SIEM видит, SOAR действует, UEBA замечает необычное.` } },

  { id: 's09-046', kind: 'think', k: ['d7-c2', 'd6-c5'], lvl: 2,
    title: { en: `10,000 alerts a day`, ru: `10 000 тревог в день` },
    body: {
      en: `<p>Your new SIEM produces about 10,000 alerts a day. Three analysts can look at perhaps 300. They've started closing alerts in bulk without reading them. Management proposes either hiring ten more analysts or switching off the noisiest rules.</p><p>What would you do?</p>`,
      ru: `<p>Новая SIEM выдаёт около 10 000 тревог в день. Три аналитика могут посмотреть, пожалуй, 300. Они начали закрывать тревоги пачками, не читая. Руководство предлагает либо нанять ещё десять аналитиков, либо отключить самые шумные правила.</p><p>Что бы вы сделали?</p>`,
    },
    reveal: {
      en: `<p>Neither, at least not first. This is <b>alert fatigue</b>, and it's how Target's alerts got lost.</p><ul><li><b>Tune</b>: review the noisiest rules, fix false positives, and use thresholds (clipping levels) instead of switching rules off.</li><li><b>Prioritize</b> by asset: an alert on the payment server outranks one on a printer.</li><li><b>Correlate</b>, so ten related events become one alert.</li><li><b>Automate</b> the routine triage with SOAR.</li></ul><p>Then measure: what share of alerts turn out to be real? That number tells you whether more staff are needed.</p>`,
      ru: `<p>Ни то, ни другое, по крайней мере не первым делом. Это <b>усталость от тревог</b>, и именно так потерялись тревоги Target.</p><ul><li><b>Настройте</b>: разберите самые шумные правила, исправьте ложные срабатывания и используйте пороги (clipping levels) вместо отключения правил.</li><li><b>Расставьте приоритеты</b> по активам: тревога на платёжном сервере важнее, чем на принтере.</li><li><b>Коррелируйте</b>, чтобы десять связанных событий стали одной тревогой.</li><li><b>Автоматизируйте</b> рутинный разбор через SOAR.</li></ul><p>Затем измеряйте: какая доля тревог оказывается настоящей? Это число скажет, нужны ли ещё люди.</p>`,
    },
    take: { en: `Fight alert fatigue by tuning, prioritizing, correlating and automating, then measure.`, ru: `С усталостью от тревог борются настройкой, приоритетами, корреляцией и автоматизацией, затем измеряют.` } },

  { id: 's09-047', kind: 'idea', k: ['d6-c5', 'd7-c2'], lvl: 2,
    title: { en: `Clipping levels and sampling: reading less, seeing more`, ru: `Пороги и выборка: читать меньше, видеть больше` },
    body: {
      en: `<p>Nobody reads every log line. Two old techniques decide which ones get attention:</p><ul><li>A <b>clipping level</b> is a threshold of normal mistakes. One failed login is a typo; five in a minute on the same account crosses the line and raises an alert. Below the threshold, events are recorded but not escalated.</li><li><b>Sampling</b> reviews a subset of records, for example 50 of this month's 4,000 access changes. <b>Statistical</b> sampling picks them at random, so the result can be extended to the whole set; picking by judgement can't be.</li></ul><p>Auditors use sampling the same way when they test whether a control operated all year.</p>`,
      ru: `<p>Никто не читает каждую строку журнала. Два старых приёма решают, на что обратить внимание:</p><ul><li><b>Порог</b> (clipping level) — допустимое число обычных ошибок. Один неудачный вход — опечатка; пять за минуту на одной учётке переходят черту и поднимают тревогу. Ниже порога события записываются, но не эскалируются.</li><li><b>Выборка</b> проверяет часть записей, например 50 из 4000 изменений доступа за месяц. <b>Статистическая</b> выборка выбирает их случайно, поэтому вывод можно распространить на весь набор; выбор «на глаз» так не работает.</li></ul><p>Аудиторы так же используют выборку, когда проверяют, работала ли мера весь год.</p>`,
    },
    take: { en: `Clipping levels filter noise; random samples let a few records speak for all.`, ru: `Пороги отсекают шум; случайная выборка позволяет немногим записям говорить за все.` } },

  { id: 's09-048', kind: 'back', back: 's04-051', k: ['d7-c2', 'd5-c1'], lvl: 2,
    title: { en: `Brazil again: a correlation rule`, ru: `Снова Бразилия: правило корреляции` },
    body: {
      en: `<p>Stage 4 asked what it means when the same account is used in the office and in Brazil within an hour. Now you can see where that question gets answered: in a <b>correlation rule</b> in the SIEM.</p><p>The rule joins events from different sources: the VPN log gives a location, the badge system says the person is in the building, the identity provider shows a new device. Each event alone looks fine. Together they're "impossible travel", and the alert can trigger a SOAR playbook: force a new MFA check, suspend the session, open a ticket.</p><p>Correlation is what turns logs from records into a detective control.</p>`,
      ru: `<p>Этап 4 спрашивал, что значит, когда одну учётку используют в офисе и в Бразилии в течение часа. Теперь видно, где на этот вопрос отвечают: в <b>правиле корреляции</b> в SIEM.</p><p>Правило соединяет события из разных источников: журнал VPN даёт местоположение, система пропусков говорит, что человек в здании, провайдер идентификации показывает новое устройство. Каждое событие по отдельности выглядит нормально. Вместе это «невозможное перемещение», и тревога может запустить сценарий SOAR: потребовать новую проверку MFA, приостановить сессию, открыть тикет.</p><p>Корреляция превращает журналы из записей в обнаруживающую меру.</p>`,
    },
    take: { en: `Correlation joins harmless-looking events into one meaningful alert.`, ru: `Корреляция соединяет безобидные на вид события в одну осмысленную тревогу.` } },

  { id: 's09-049', kind: 'idea', k: ['d7-c2', 'd3-c8'], lvl: 2,
    title: { en: `Attackers delete logs, so protect them`, ru: `Атакующие удаляют журналы, поэтому их защищают` },
    body: {
      en: `<p>One of the first things a skilled intruder does is clean up: clear the event log, edit out their own lines, change the clock. Logs are evidence, and they need protection:</p><ul><li><b>Forward</b> them off the machine at once, to a central collector.</li><li>Store them <b>write-once</b> or append-only, so even administrators can't change old entries.</li><li><b>Hash</b> or sign batches, so any edit is detectable (stage 6).</li><li><b>Separate duties</b>: the people whose actions are logged shouldn't administer the log system.</li><li>Alert when a source <b>goes quiet</b>: silence is a signal too.</li></ul>`,
      ru: `<p>Одно из первых действий опытного нарушителя — замести следы: очистить журнал событий, вырезать свои строки, перевести часы. Журналы — доказательства, и их нужно защищать:</p><ul><li>Сразу <b>пересылайте</b> их с машины на центральный сборщик.</li><li>Храните их в режиме <b>однократной записи</b> или только добавления, чтобы даже администраторы не могли менять старые записи.</li><li><b>Хешируйте</b> или подписывайте пакеты, чтобы любое изменение было заметно (этап 6).</li><li><b>Разделяйте обязанности</b>: те, чьи действия журналируются, не должны администрировать систему журналов.</li><li>Поднимайте тревогу, когда источник <b>замолкает</b>: тишина — тоже сигнал.</li></ul>`,
    },
    take: { en: `Ship logs off the box, make them write-once, hash them, and watch for silence.`, ru: `Отправляйте журналы с машины, храните без перезаписи, хешируйте и следите за тишиной.` } },

  { id: 's09-050', kind: 'vs', k: ['d7-c2'], lvl: 2,
    title: { en: `Threat intelligence vs threat hunting`, ru: `Разведка угроз и охота за угрозами` },
    body: {
      en: `<ul><li><b>Threat intelligence</b>: knowledge about attackers from outside sources, such as feeds, industry groups (ISACs) and vendor reports. It comes as <b>indicators of compromise</b> (IOCs: file hashes, IP addresses, domain names) and as <b>TTPs</b> (tactics, techniques and procedures: how a group operates). STIX is a format for sharing it, TAXII a way to transport it.</li><li><b>Threat hunting</b>: analysts <b>proactively</b> search your own environment for attackers that alerts missed, starting from a hypothesis: "if Cl0p were here, what would we see?"</li></ul><p>Attackers change IP addresses easily and habits slowly, so hunting for TTPs lasts longer than blocking IOCs.</p>`,
      ru: `<ul><li><b>Разведка угроз</b> (threat intelligence): знания об атакующих из внешних источников, таких как фиды, отраслевые объединения (ISAC) и отчёты производителей. Приходит в виде <b>индикаторов компрометации</b> (IOC: хеши файлов, IP-адреса, доменные имена) и <b>TTP</b> (тактики, техники и процедуры: как действует группа). STIX — формат обмена, TAXII — способ передачи.</li><li><b>Охота за угрозами</b> (threat hunting): аналитики <b>проактивно</b> ищут в собственной среде атакующих, которых пропустили тревоги, начиная с гипотезы: «если бы Cl0p был здесь, что бы мы увидели?»</li></ul><p>IP-адреса атакующие меняют легко, а привычки медленно, поэтому охота по TTP живёт дольше, чем блокировка IOC.</p>`,
    },
    take: { en: `Intelligence tells you what to look for; hunting goes and looks.`, ru: `Разведка говорит, что искать; охота идёт и ищет.` } },

  { id: 's09-051', kind: 'back', back: 's09-016', k: ['d7-c2', 'd6-c2', 'd1-c13'], lvl: 2,
    title: { en: `MOVEit again: hunting with indicators`, ru: `Снова MOVEit: охота по индикаторам` },
    body: {
      en: `<p>When the MOVEit flaw became public on 31 May 2023, patching was only half the job. The attackers had been active for days, so every MOVEit owner also had to ask: <b>were we already hit?</b></p><p>Progress and CISA published indicators of compromise, including a web shell file named <b>human2.aspx</b> left on breached servers, the attackers' IP addresses, and unusual database activity. Defenders searched their servers and web logs for them, going back weeks.</p><p>Organizations that kept those logs, centrally and long enough, could answer the question. Those that didn't had to assume the worst and notify as if data had been taken.</p>`,
      ru: `<p>Когда 31 мая 2023 года уязвимость MOVEit стала публичной, патч был только половиной работы. Атакующие действовали уже несколько дней, поэтому каждому владельцу MOVEit нужно было спросить: <b>нас уже взломали?</b></p><p>Progress и CISA опубликовали индикаторы компрометации, включая файл веб-шелла <b>human2.aspx</b>, оставленный на взломанных серверах, IP-адреса атакующих и необычную активность в базе данных. Защитники искали их на своих серверах и в веб-журналах, на недели назад.</p><p>Организации, хранившие эти журналы централизованно и достаточно долго, могли ответить на вопрос. Остальным пришлось предполагать худшее и уведомлять так, будто данные украли.</p>`,
    },
    take: { en: `After a zero-day, patch and then hunt: logs decide whether you can say "not us".`, ru: `После нулевого дня — патч, затем охота: журналы решают, сможете ли вы сказать «не нас».` } },

  { id: 's09-052', kind: 'idea', k: ['d7-c5', 'd1-c11'], lvl: 1,
    title: { en: `Anti-malware grew up: from signatures to EDR`, ru: `Антивирус повзрослел: от сигнатур к EDR` },
    body: {
      en: `<p>Malware detection has three methods, and modern tools combine them:</p><ul><li><b>Signature</b>: match files against known malware. Precise, but blind to anything new or slightly changed.</li><li><b>Heuristic</b>: look for suspicious traits in the code, such as self-modifying or packed sections.</li><li><b>Behavioural</b>: watch what a program does. Word starting PowerShell, which then encrypts hundreds of files, is bad whatever its hash.</li></ul><p><b>EDR</b> (endpoint detection and response) records activity on every laptop and server, alerts, and lets responders isolate a machine remotely. <b>XDR</b> extends that across email, network and cloud. All of it needs central management and automatic updates.</p>`,
      ru: `<p>У обнаружения вредоносного ПО три метода, и современные инструменты их сочетают:</p><ul><li><b>Сигнатурный</b>: сравнение файлов с известным вредоносом. Точный, но слеп ко всему новому или слегка изменённому.</li><li><b>Эвристический</b>: поиск подозрительных черт в коде, таких как самоизменяющиеся или упакованные участки.</li><li><b>Поведенческий</b>: наблюдение за тем, что делает программа. Word, запускающий PowerShell, который затем шифрует сотни файлов, — плохо, каким бы ни был хеш.</li></ul><p><b>EDR</b> (обнаружение и реагирование на конечных точках) записывает активность на каждом ноутбуке и сервере, поднимает тревоги и позволяет удалённо изолировать машину. <b>XDR</b> распространяет это на почту, сеть и облако. Всё это требует централизованного управления и автообновлений.</p>`,
    },
    take: { en: `Signatures catch the known, behaviour catches the new; EDR records and responds.`, ru: `Сигнатуры ловят известное, поведение — новое; EDR записывает и реагирует.` } },

  { id: 's09-053', kind: 'vs', k: ['d7-c5'], lvl: 1,
    title: { en: `Allow list vs deny list`, ru: `Белый и чёрный список` },
    body: {
      en: `<ul><li><b>Deny list</b> (blacklist): everything runs except what's known to be bad. Easy to live with, but every new piece of malware is allowed until someone adds it.</li><li><b>Allow list</b> (whitelist): nothing runs unless it's approved, by publisher signature, file hash or path. Unknown malware simply doesn't start. It's the stronger control, but every new tool and update needs approval, which is why it's common on servers, kiosks and industrial PCs, where software rarely changes.</li></ul><p>Rule: the deny list blocks what you know is bad; the allow list blocks everything you haven't said is good.</p>`,
      ru: `<ul><li><b>Чёрный список</b> (deny list): запускается всё, кроме известного плохого. С ним легко жить, но каждый новый вредонос разрешён, пока его кто-нибудь не добавит.</li><li><b>Белый список</b> (allow list): ничего не запускается без одобрения — по подписи издателя, хешу файла или пути. Неизвестный вредонос просто не стартует. Это более сильная мера, но каждый новый инструмент и обновление требуют одобрения, поэтому он распространён на серверах, киосках и промышленных ПК, где ПО меняется редко.</li></ul><p>Правило: чёрный список блокирует то, что вы знаете как плохое; белый блокирует всё, что вы не назвали хорошим.</p>`,
    },
    take: { en: `Allow lists stop unknown malware but cost effort; best where software rarely changes.`, ru: `Белый список останавливает неизвестный вредонос, но требует усилий; лучше там, где ПО меняется редко.` } },

  { id: 's09-054', kind: 'idea', k: ['d7-c5'], lvl: 2,
    title: { en: `Sandboxing: let it run where it can't hurt`, ru: `Песочница: пусть запустится там, где не навредит` },
    body: {
      en: `<p>Some files are neither known good nor known bad: a new attachment, a download from an unfamiliar site. A <b>sandbox</b> opens them in an isolated virtual machine and watches what happens. Does the document try to download something? Change the registry? Contact an unknown server? If so, the real copy is blocked before it reaches anyone.</p><p>Email gateways and EDR tools often do this automatically, which is called <b>detonation</b>.</p><p>Attackers know it: some malware checks whether it's in a virtual machine, or waits an hour before doing anything, to outlast the sandbox. That's why sandboxing is one layer, not the whole defense.</p>`,
      ru: `<p>Некоторые файлы ни заведомо хорошие, ни заведомо плохие: новое вложение, загрузка с незнакомого сайта. <b>Песочница</b> открывает их в изолированной виртуальной машине и смотрит, что произойдёт. Пытается ли документ что-то скачать? Изменить реестр? Связаться с неизвестным сервером? Если да, настоящая копия блокируется раньше, чем дойдёт до кого-либо.</p><p>Почтовые шлюзы и EDR часто делают это автоматически; это называют <b>детонацией</b>.</p><p>Атакующие это знают: некоторый вредонос проверяет, не в виртуальной ли он машине, или ждёт час, прежде чем что-то делать, чтобы пересидеть песочницу. Поэтому песочница — один слой, а не вся защита.</p>`,
    },
    take: { en: `A sandbox watches unknown code in isolation; evasive malware means it's one layer of several.`, ru: `Песочница наблюдает за неизвестным кодом в изоляции; уклончивый вредонос делает её одним слоем из нескольких.` } },

  { id: 's09-055', kind: 'vs', k: ['d7-c5'], lvl: 2,
    title: { en: `Honeypot vs honeynet vs honeytoken vs darknet`, ru: `Honeypot, honeynet, honeytoken и darknet` },
    body: {
      en: `<p>Decoys work because legitimate users have no reason to touch them, so any contact is suspicious:</p><ul><li><b>Honeypot</b>: one fake system that looks valuable, such as a "finance-db" server.</li><li><b>Honeynet</b>: a whole network of decoys, for studying how attackers move.</li><li><b>Honeytoken</b>: a fake record or credential, such as a dummy admin password in a script or a fake customer row. If it's ever used, someone stole it.</li><li><b>Darknet</b>: unused address space. Nothing lives there, so any traffic to it is scanning or misconfiguration.</li></ul><p>They detect, distract and teach. They must be isolated so they can't become a launch pad.</p>`,
      ru: `<p>Приманки работают, потому что законным пользователям незачем их трогать, и любое касание подозрительно:</p><ul><li><b>Honeypot</b>: одна фальшивая система, выглядящая ценной, например сервер «finance-db».</li><li><b>Honeynet</b>: целая сеть приманок, чтобы изучать, как перемещаются атакующие.</li><li><b>Honeytoken</b>: фальшивая запись или учётные данные, например пароль администратора-пустышки в скрипте или выдуманная строка клиента. Если их использовали, значит, их украли.</li><li><b>Darknet</b>: неиспользуемое адресное пространство. Там ничего нет, поэтому любой трафик туда — сканирование или ошибка настройки.</li></ul><p>Они обнаруживают, отвлекают и учат. Их нужно изолировать, чтобы они не стали плацдармом.</p>`,
    },
    take: { en: `Decoys catch attackers because nobody legitimate ever touches them.`, ru: `Приманки ловят атакующих, потому что законный пользователь их никогда не трогает.` } },

  { id: 's09-056', kind: 'think', k: ['d7-c5', 'd1-c4', 'd1-c6'], lvl: 2,
    title: { en: `The honeypot that offers free films`, ru: `Honeypot, предлагающий бесплатные фильмы` },
    body: {
      en: `<p>A team sets up a honeypot. One engineer suggests going further: post on hacker forums that the server is unprotected and full of pirated films, to attract attackers and then hand their details to the police. Another suggests that when someone breaks in, the team should attack the intruder's computer back.</p><p>What do you think of each idea?</p>`,
      ru: `<p>Команда ставит honeypot. Один инженер предлагает пойти дальше: написать на хакерских форумах, что сервер не защищён и набит пиратскими фильмами, чтобы привлечь атакующих, а потом передать их данные полиции. Другой предлагает, когда кто-нибудь вломится, атаковать компьютер нарушителя в ответ.</p><p>Что вы думаете о каждой идее?</p>`,
    },
    reveal: {
      en: `<p>Both are out. Leaving an attractive, vulnerable-looking system for someone who is already looking is <b>enticement</b>, and that's acceptable. Advertising it to persuade people to commit an offence they hadn't planned is <b>entrapment</b>: it can make evidence unusable and expose the company legally.</p><p><b>Hacking back</b> is illegal in most countries, and the "intruder's" machine is often another victim. Observe, collect evidence, report. Run honeypot plans past legal counsel before launch.</p>`,
      ru: `<p>Обе не годятся. Оставить привлекательную, уязвимую на вид систему для того, кто и так ищет, — <b>приманивание</b> (enticement), и это допустимо. Рекламировать её, чтобы склонить людей к правонарушению, которое они не планировали, — <b>провокация</b> (entrapment): она может сделать доказательства негодными и подставить компанию юридически.</p><p><b>Ответный взлом</b> незаконен в большинстве стран, а машина «нарушителя» часто оказывается ещё одной жертвой. Наблюдайте, собирайте доказательства, сообщайте. Планы honeypot согласуйте с юристами до запуска.</p>`,
    },
    take: { en: `Enticement yes, entrapment no, and never hack back.`, ru: `Приманивать можно, провоцировать нельзя, взламывать в ответ — никогда.` } },

  { id: 's09-057', kind: 'back', back: 's05-027', k: ['d4-c4', 'd7-c5'], lvl: 2,
    title: { en: `IDS and IPS again, now in the operations centre`, ru: `Снова IDS и IPS, теперь в центре мониторинга` },
    body: {
      en: `<p>Stage 5 compared the <b>IDS</b>, which watches and alerts, with the <b>IPS</b>, which sits in line and blocks. In operations they come in more places:</p><ul><li><b>NIDS/NIPS</b>: on the network, at the perimeter and between segments.</li><li><b>HIDS/HIPS</b>: on a single host, seeing what the network can't, including decrypted traffic and local changes. EDR is its modern descendant.</li><li><b>WAF</b>: an IPS specialized for web applications.</li><li><b>Wireless IDS</b>: watching the air for rogue access points.</li></ul><p>Each one is a sensor feeding the SIEM. A blocking IPS also needs the same change control as a firewall, because a bad rule can stop the business.</p>`,
      ru: `<p>Этап 5 сравнил <b>IDS</b>, которая наблюдает и оповещает, с <b>IPS</b>, которая стоит в разрыве и блокирует. В эксплуатации они встречаются в большем числе мест:</p><ul><li><b>NIDS/NIPS</b>: в сети, на периметре и между сегментами.</li><li><b>HIDS/HIPS</b>: на одном хосте; видят то, чего не видит сеть, включая расшифрованный трафик и локальные изменения. EDR — их современный потомок.</li><li><b>WAF</b>: IPS, специализированная на веб-приложениях.</li><li><b>Беспроводная IDS</b>: следит за эфиром в поисках чужих точек доступа.</li></ul><p>Каждая — датчик, питающий SIEM. Блокирующей IPS нужен тот же контроль изменений, что и межсетевому экрану: плохое правило может остановить бизнес.</p>`,
    },
    take: { en: `Network, host, web and wireless sensors all feed one picture.`, ru: `Сетевые, хостовые, веб- и беспроводные датчики складываются в одну картину.` } },

  { id: 's09-058', kind: 'idea', k: ['d7-c5', 'd1-c13'], lvl: 2,
    title: { en: `Buying the watching: MSSP and MDR`, ru: `Покупка наблюдения: MSSP и MDR` },
    body: {
      en: `<p>Monitoring around the clock takes at least five or six analysts per seat, and many companies can't hire them. They buy it instead:</p><ul><li>an <b>MSSP</b> (managed security service provider) runs tools such as the SIEM and firewalls and forwards alerts;</li><li>an <b>MDR</b> (managed detection and response) service also investigates and takes agreed actions, like isolating a laptop at 3 a.m.</li></ul><p>Machine learning helps both sort the noise, but it brings its own false positives, and attackers test their tools against it.</p><p>What you can't outsource is <b>accountability</b>. The contract must say who may act, how fast, and who is woken up. Target had alerts and a team; what failed was the hand-off.</p>`,
      ru: `<p>Круглосуточный мониторинг требует минимум пяти-шести аналитиков на одно рабочее место, и многие компании не могут их нанять. Они это покупают:</p><ul><li><b>MSSP</b> (провайдер управляемых услуг безопасности) ведёт инструменты, такие как SIEM и межсетевые экраны, и пересылает тревоги;</li><li>сервис <b>MDR</b> (управляемое обнаружение и реагирование) ещё и расследует и выполняет согласованные действия, например изолирует ноутбук в 3 часа ночи.</li></ul><p>Машинное обучение помогает обоим разбирать шум, но приносит свои ложные срабатывания, а атакующие проверяют на нём свои инструменты.</p><p>Чего нельзя отдать — это <b>подотчётность</b>. Договор должен говорить, кто может действовать, как быстро и кого будят. У Target были тревоги и команда; подвела передача.</p>`,
    },
    take: { en: `You can outsource the monitoring, never the accountability.`, ru: `Мониторинг можно отдать, подотчётность — никогда.` } },

  { id: 's09-059', kind: 'back', back: 's02-024', k: ['d6-c5', 'd1-c2'], lvl: 2,
    title: { en: `KPIs and KRIs again, for the whole program`, ru: `Снова KPI и KRI, для всей программы` },
    body: {
      en: `<p>Stage 2 asked whether the awareness program works, and measured it. The same two kinds of number apply to the whole security program:</p><ul><li><b>KPI</b> (key performance indicator): how well a process runs. Mean time to patch critical flaws; share of alerts handled within an hour; share of staff who completed training.</li><li><b>KRI</b> (key risk indicator): an early warning that risk is rising. Number of internet-facing systems with critical flaws past their deadline; number of open exceptions; privileged accounts without MFA.</li></ul><p>Management needs a few of each, with trends and targets, not a 40-page scan export.</p>`,
      ru: `<p>Этап 2 спрашивал, работает ли программа осведомлённости, и измерял её. Те же два вида чисел применимы ко всей программе безопасности:</p><ul><li><b>KPI</b> (ключевой показатель эффективности): насколько хорошо работает процесс. Среднее время закрытия критичных уязвимостей; доля тревог, обработанных в течение часа; доля сотрудников, прошедших обучение.</li><li><b>KRI</b> (ключевой индикатор риска): ранний сигнал роста риска. Число систем, доступных из интернета, с критичными уязвимостями после срока; число открытых исключений; привилегированные учётки без MFA.</li></ul><p>Руководству нужно по нескольку тех и других, с трендами и целями, а не 40-страничная выгрузка сканера.</p>`,
    },
    take: { en: `KPIs show how well processes run; KRIs warn that risk is rising.`, ru: `KPI показывают, как работают процессы; KRI предупреждают о росте риска.` } },

  { id: 's09-060', kind: 'idea', k: ['d6-c5', 'd5-c6'], lvl: 2,
    title: { en: `Evidence that the routine controls ran`, ru: `Доказательства того, что рутинные меры выполнялись` },
    body: {
      en: `<p>Many controls aren't tools but routines, and routines quietly stop. Collect evidence that they ran:</p><ul><li><b>Account management</b>: were leavers disabled on time? Were the quarterly access reviews done and signed?</li><li><b>Backup verification</b>: not "the job succeeded", but a <b>test restore</b> that worked.</li><li><b>Training</b>: completion rates, and phishing-simulation results.</li><li><b>DR and BC tests</b>: when they were run, and what failed.</li><li><b>Management review</b>: leadership looked at these numbers and made decisions, recorded in minutes.</li></ul><p>These are the records auditors sample, so keeping them is part of the control.</p>`,
      ru: `<p>Многие меры — не инструменты, а рутина, а рутина тихо останавливается. Собирайте доказательства, что она выполнялась:</p><ul><li><b>Управление учётными записями</b>: уволившихся вовремя отключили? Ежеквартальные пересмотры доступа проведены и подписаны?</li><li><b>Проверка бэкапов</b>: не «задание завершилось успешно», а <b>тестовое восстановление</b>, которое сработало.</li><li><b>Обучение</b>: доля прошедших и результаты имитаций фишинга.</li><li><b>Тесты DR и BC</b>: когда проводились и что не сработало.</li><li><b>Рассмотрение руководством</b>: руководство посмотрело на эти числа и приняло решения, записанные в протоколе.</li></ul><p>Именно эти записи проверяют выборкой аудиторы, поэтому их ведение — часть меры.</p>`,
    },
    take: { en: `Routines stop quietly; keep records that they ran, because auditors will sample them.`, ru: `Рутина останавливается тихо; храните записи о её выполнении — аудиторы будут их проверять.` } },

  { id: 's09-061', kind: 'think', k: ['d6-c5', 'd1-c7'], lvl: 2,
    title: { en: `Green dashboard, every night`, ru: `Зелёная панель каждую ночь` },
    body: {
      en: `<p>The backup dashboard has shown "success" every night for three years. The IT manager presents this to the auditors as evidence that recovery is under control. Asked when a restore was last tested, she says: "We've never needed one, so never."</p><p>What does the dashboard actually prove?</p>`,
      ru: `<p>Панель резервного копирования три года каждую ночь показывает «успешно». ИТ-менеджер предъявляет это аудиторам как доказательство того, что восстановление под контролем. На вопрос, когда в последний раз проверяли восстановление, она отвечает: «Ни разу не понадобилось, поэтому никогда».</p><p>Что на самом деле доказывает панель?</p>`,
    },
    reveal: {
      en: `<p>Only that a job finished without reporting an error. It doesn't prove the backup contains the right data, isn't corrupted, can be decrypted with keys you still have, or can be restored within the time the business needs.</p><p>Schedule regular <b>test restores</b>: individual files often, a whole critical system at least yearly, timed against the recovery objectives. Record the results. Until then, report the backups as an untested control. A backup that has never been restored is a hope, not a control.</p>`,
      ru: `<p>Лишь то, что задание завершилось без сообщения об ошибке. Она не доказывает, что в копии нужные данные, что она не повреждена, что её можно расшифровать ключами, которые у вас ещё есть, и восстановить за то время, которое нужно бизнесу.</p><p>Запланируйте регулярные <b>тестовые восстановления</b>: отдельные файлы часто, целую критичную систему хотя бы раз в год, с замером времени по целям восстановления. Записывайте результаты. До тех пор докладывайте о бэкапах как о непроверенной мере. Бэкап, который ни разу не восстанавливали, — надежда, а не мера.</p>`,
    },
    take: { en: `Only a test restore proves a backup works.`, ru: `Только тестовое восстановление доказывает, что бэкап работает.` } },

  { id: 's09-062', kind: 'back', back: 's03-023', k: ['d2-c6', 'd7-c2'], lvl: 2,
    title: { en: `DLP again: watching what leaves`, ru: `Снова DLP: наблюдение за тем, что уходит` },
    body: {
      en: `<p>Stage 3 introduced <b>DLP</b> as a way to spot sensitive data on its way out. In the operations centre it becomes part of <b>egress monitoring</b>, watching everything that leaves:</p><ul><li>large or unusual uploads, like Equifax's months of outbound traffic;</li><li><b>beaconing</b>: a machine contacting the same unknown server every 60 seconds, the heartbeat of command-and-control malware;</li><li>DNS queries with long random names, which can smuggle data out;</li><li>traffic to file-sharing sites or new cloud accounts.</li></ul><p>This is why Equifax's expired certificate mattered: the device that should have watched the outbound traffic couldn't read it.</p>`,
      ru: `<p>Этап 3 представил <b>DLP</b> как способ заметить чувствительные данные на выходе. В центре мониторинга она становится частью <b>мониторинга исходящего трафика</b>, наблюдения за всем, что уходит:</p><ul><li>большие или необычные выгрузки, как месяцы исходящего трафика Equifax;</li><li><b>маячки</b> (beaconing): машина связывается с одним и тем же неизвестным сервером каждые 60 секунд — пульс вредоноса с управляющим сервером;</li><li>DNS-запросы с длинными случайными именами, через которые можно выносить данные;</li><li>трафик на файлообменники и в новые облачные учётки.</li></ul><p>Вот почему был важен истёкший сертификат Equifax: устройство, которое должно было следить за исходящим трафиком, не могло его прочитать.</p>`,
    },
    take: { en: `Watch what leaves: big uploads, beacons, odd DNS, new destinations.`, ru: `Следите за тем, что уходит: большие выгрузки, маячки, странный DNS, новые адресаты.` } },

  { id: 's09-063', kind: 'idea', k: ['d6-c5', 'd1-c10'], lvl: 2,
    title: { en: `Continuous monitoring: assurance every day, not once a year`, ru: `Непрерывный мониторинг: уверенность каждый день, а не раз в год` },
    body: {
      en: `<p>An annual audit says how things were. <b>Information security continuous monitoring</b> (ISCM, NIST SP 800-137) aims to know how things are, all the time. It's the "monitor" step of the RMF loop from stage 7, made into a program:</p><ol><li><b>Define</b> a strategy: what to measure, based on risk.</li><li><b>Establish</b> the program: metrics, frequencies, tools.</li><li><b>Implement</b>: collect the data, automatically where possible.</li><li><b>Analyze and report</b> the findings.</li><li><b>Respond</b>: fix, accept or escalate.</li><li><b>Review and update</b> the strategy itself.</li></ol><p>"Continuous" means as often as the risk requires, not literally every second.</p>`,
      ru: `<p>Ежегодный аудит говорит, как было. <b>Непрерывный мониторинг информационной безопасности</b> (ISCM, NIST SP 800-137) стремится знать, как есть, всё время. Это шаг «мониторинг» из цикла RMF этапа 7, превращённый в программу:</p><ol><li><b>Определить</b> стратегию: что измерять, исходя из риска.</li><li><b>Создать</b> программу: метрики, частоты, инструменты.</li><li><b>Внедрить</b>: собирать данные, по возможности автоматически.</li><li><b>Анализировать и сообщать</b> о находках.</li><li><b>Реагировать</b>: исправить, принять или эскалировать.</li><li><b>Пересматривать и обновлять</b> саму стратегию.</li></ol><p>«Непрерывно» значит так часто, как требует риск, а не буквально каждую секунду.</p>`,
    },
    take: { en: `ISCM: define, establish, implement, analyze and report, respond, review.`, ru: `ISCM: определить, создать, внедрить, анализировать и сообщать, реагировать, пересматривать.` } },

  { id: 's09-064', kind: 'vs', k: ['d6-c4', 'd7-c2'], lvl: 2,
    title: { en: `Synthetic transactions vs real user monitoring`, ru: `Синтетические транзакции и мониторинг реальных пользователей` },
    body: {
      en: `<ul><li><b>Synthetic transactions</b>: a script acts like a user every few minutes: logs in, searches, adds to basket, checks out with a test account. It's <b>active</b> and proactive: it finds a broken login page at 4 a.m., before customers do, and it works even when nobody is using the system.</li><li><b>Real user monitoring</b> (RUM): <b>passively</b> records what actual users experience, such as page load times and errors. It shows real behaviour, but only once real users have hit the problem.</li></ul><p>Rule: synthetic tests the paths you predicted; RUM shows the ones people really take. Stage 11 goes deeper into testing software itself.</p>`,
      ru: `<ul><li><b>Синтетические транзакции</b>: скрипт каждые несколько минут ведёт себя как пользователь: входит, ищет, кладёт в корзину, оформляет заказ с тестовой учётки. Это <b>активная</b> и упреждающая проверка: она находит сломанную страницу входа в 4 утра, раньше клиентов, и работает, даже когда системой никто не пользуется.</li><li><b>Мониторинг реальных пользователей</b> (RUM): <b>пассивно</b> записывает, что испытывают настоящие пользователи, например время загрузки страниц и ошибки. Показывает реальное поведение, но только когда реальные пользователи уже наткнулись на проблему.</li></ul><p>Правило: синтетика проверяет пути, которые вы предсказали; RUM показывает те, по которым люди ходят на самом деле. Этап 11 подробнее о тестировании самих программ.</p>`,
    },
    take: { en: `Synthetic: scripted and proactive. RUM: real users, passive.`, ru: `Синтетика — по скрипту, заранее. RUM — реальные пользователи, пассивно.` } },

  { id: 's09-065', kind: 'back', back: 's06-046', k: ['d3-c10', 'd6-c2', 'd3-c9'], lvl: 2,
    title: { en: `Crypto again: test the configuration, not the maths`, ru: `Снова криптография: проверяйте настройку, а не математику` },
    body: {
      en: `<p>Stage 6 said crypto almost always fails in the implementation, not the algorithm. That's good news for testing, because configurations can be scanned:</p><ul><li><b>Protocol versions</b>: no SSL or TLS 1.0 and 1.1 still enabled.</li><li><b>Cipher suites</b>: no export-grade, RC4 or other broken choices.</li><li><b>Certificates</b>: valid chain, strong keys, and above all the <b>expiry date</b>.</li><li><b>Stored secrets</b>: passwords hashed with a slow, salted function; no keys in source code.</li></ul><p>Keep an inventory of every certificate with alerts before expiry. Equifax had hundreds of expired certificates, and one of them blinded the device that would have spotted the theft.</p>`,
      ru: `<p>Этап 6 говорил, что криптография почти всегда ломается в реализации, а не в алгоритме. Для проверок это хорошая новость: настройки можно сканировать:</p><ul><li><b>Версии протоколов</b>: не включены ли ещё SSL или TLS 1.0 и 1.1.</li><li><b>Наборы шифров</b>: нет ли экспортных, RC4 и других сломанных вариантов.</li><li><b>Сертификаты</b>: правильная цепочка, стойкие ключи и прежде всего <b>срок действия</b>.</li><li><b>Хранимые секреты</b>: пароли хешированы медленной функцией с солью; нет ключей в исходном коде.</li></ul><p>Ведите реестр всех сертификатов с оповещением до истечения. У Equifax были сотни истёкших сертификатов, и один из них ослепил устройство, которое заметило бы кражу.</p>`,
    },
    take: { en: `Scan protocols, ciphers and certificates, and track every expiry date.`, ru: `Сканируйте протоколы, шифры и сертификаты и отслеживайте каждый срок истечения.` } },

  { id: 's09-066', kind: 'back', back: 's05-004', k: ['d4-c1', 'd7-c5', 'd4-c4'], lvl: 2,
    title: { en: `The seven layers again: which sensor sees what`, ru: `Снова семь уровней: какой датчик что видит` },
    body: {
      en: `<p>Stage 5 placed one attack on each OSI layer. Detection tools also live at particular layers, and each is blind above or below its own:</p><ul><li><b>Layer 2</b>: switch port security and NAC notice a new MAC address or ARP spoofing.</li><li><b>Layers 3–4</b>: firewalls and network IDS see addresses, ports and floods, but not what's inside encrypted traffic.</li><li><b>Layer 7</b>: a WAF, a proxy or a next-generation firewall understands web requests and can spot SQL injection.</li><li><b>On the host</b>: EDR sees processes and files after decryption.</li></ul><p>The SIEM sits above them all, joining their partial views into one.</p>`,
      ru: `<p>Этап 5 поместил по одной атаке на каждый уровень OSI. Средства обнаружения тоже живут на определённых уровнях, и каждое слепо выше или ниже своего:</p><ul><li><b>Уровень 2</b>: защита портов коммутатора и NAC замечают новый MAC-адрес или подмену ARP.</li><li><b>Уровни 3–4</b>: межсетевые экраны и сетевые IDS видят адреса, порты и флуд, но не содержимое зашифрованного трафика.</li><li><b>Уровень 7</b>: WAF, прокси или межсетевой экран нового поколения понимают веб-запросы и замечают SQL-инъекцию.</li><li><b>На хосте</b>: EDR видит процессы и файлы после расшифровки.</li></ul><p>SIEM стоит над всеми, соединяя их частичные картины в одну.</p>`,
    },
    take: { en: `Each sensor sees one layer; the SIEM joins them.`, ru: `Каждый датчик видит свой уровень; SIEM их соединяет.` } },

  { id: 's09-067', kind: 'link', k: ['d6-c2', 'd6-c6', 'd7-c2', 'd6-c5', 'd6-c7', 'd7-c6'], lvl: 2,
    title: { en: `Equifax replayed with this stage`, ru: `Equifax заново, с этим этапом` },
    body: {
      en: `<p>Replay 2017 with everything from this stage:</p><ol><li>An <b>inventory</b> lists the dispute portal, so the scan targets it.</li><li>A <b>credentialed scan</b> reads the Struts version directly and flags it.</li><li>The finding gets an owner and a 48-hour deadline, and a <b>rescan</b> confirms the fix.</li><li>A <b>KRI</b>, "internet-facing critical flaws past deadline", turns red for management if it slips.</li><li>A <b>certificate inventory</b> renews the inspection device's certificate before it expires.</li><li><b>Egress monitoring</b> and SIEM correlation flag months of unusual outbound traffic.</li><li>An <b>audit</b> samples the patch process and finds the gap before attackers do.</li></ol><p>Any one of these might have shortened the breach; together they make it unlikely.</p>`,
      ru: `<p>Переиграем 2017 год со всем, что есть в этом этапе:</p><ol><li><b>Реестр</b> содержит портал для споров, и скан на него нацелен.</li><li><b>Скан с учётными данными</b> читает версию Struts напрямую и отмечает её.</li><li>У находки есть владелец и срок 48 часов, а <b>повторный скан</b> подтверждает исправление.</li><li><b>KRI</b> «критичные уязвимости в интернете после срока» краснеет для руководства, если что-то сорвалось.</li><li><b>Реестр сертификатов</b> обновляет сертификат устройства проверки до истечения.</li><li><b>Мониторинг исходящего трафика</b> и корреляция в SIEM отмечают месяцы необычной выгрузки.</li><li><b>Аудит</b> проверяет выборкой процесс патчей и находит пробел раньше атакующих.</li></ol><p>Любая из мер могла сократить взлом; вместе они делают его маловероятным.</p>`,
    },
    take: { en: `Inventory, scan, verify, measure, watch, audit: every link checks another.`, ru: `Реестр, скан, проверка, метрики, наблюдение, аудит: каждое звено проверяет другое.` } },

  { id: 's09-068', kind: 'think', k: ['d6-c6', 'd6-c7', 'd6-c3'], lvl: 2,
    title: { en: `"Send us your pentest report"`, ru: `«Пришлите нам отчёт о пентесте»` },
    body: {
      en: `<p>A large prospective customer's procurement team writes: "Before we sign, send us your latest penetration test report, in full." Sales is keen: it's the biggest deal of the year, and the report shows only medium findings, all being fixed.</p><p>Do you send it?</p>`,
      ru: `<p>Отдел закупок крупного потенциального клиента пишет: «Перед подписанием пришлите ваш последний отчёт о тесте на проникновение, полностью». Продажи горят желанием: это крупнейшая сделка года, а в отчёте только средние находки, и все исправляются.</p><p>Вы его пришлёте?</p>`,
    },
    reveal: {
      en: `<p>Not the full report. It's a detailed map of your weaknesses, with reproduction steps, and once sent you can't control where it goes.</p><p>Give the customer what they actually need, assurance, in the form made for outsiders:</p><ul><li>a <b>SOC 2 Type II</b> report under NDA, or an ISO 27001 certificate;</li><li>a <b>letter of attestation</b> from the testing firm: scope, dates, number of findings by severity, remediation status;</li><li>answers to their security questionnaire.</li></ul><p>If they insist on details, offer a supervised read-only review. Report to the audience: this audience needs assurance, not exploit steps.</p>`,
      ru: `<p>Не полный отчёт. Это подробная карта ваших слабостей с шагами воспроизведения, и после отправки вы не контролируете, куда она пойдёт.</p><p>Дайте клиенту то, что ему действительно нужно, — уверенность — в форме, предназначенной для посторонних:</p><ul><li>отчёт <b>SOC 2 Type II</b> под NDA или сертификат ISO 27001;</li><li><b>письмо-подтверждение</b> от фирмы-тестировщика: рамки, даты, число находок по уровням, статус устранения;</li><li>ответы на их анкету безопасности.</li></ul><p>Если настаивают на деталях, предложите просмотр под наблюдением, без копий. Отчёт — по аудитории: этой аудитории нужна уверенность, а не шаги эксплуатации.</p>`,
    },
    take: { en: `Outsiders get assurance (SOC 2, attestation letter), not the map of your weaknesses.`, ru: `Посторонним — уверенность (SOC 2, письмо-подтверждение), а не карту ваших слабостей.` } },

  { id: 's09-069', kind: 'recap', lvl: 1,
    title: { en: `Stage 9 in seven lines`, ru: `Этап 9 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s09-003', { en: `Test checks a control, assessment the whole picture, audit is independent.`, ru: `Тест проверяет меру, оценка — картину, аудит независим.` }],
      ['s09-010', { en: `A false negative is worse: "nothing found" isn't "nothing there".`, ru: `Ложноотрицательный хуже: «не найдено» — не «нет».` }],
      ['s09-014', { en: `Fix by risk: severity, exposure, asset value, active exploitation.`, ru: `Исправляйте по риску: серьёзность, доступность, ценность, эксплуатация.` }],
      ['s09-018', { en: `A pentest needs written authorization, scope and rules of engagement.`, ru: `Пентесту нужны письменное разрешение, рамки и правила.` }],
      ['s09-030', { en: `Exceptions: documented, compensated, accepted by the owner, with an expiry.`, ru: `Исключения: документ, компенсация, принятие владельцем, срок.` }],
      ['s09-036', { en: `SOC 2 Type II: controls worked over a period, not on one day.`, ru: `SOC 2 Type II: меры работали за период, а не в один день.` }],
      ['s09-046', { en: `Alerts need tuning and an owner; Target's tools saw the attack.`, ru: `Тревогам нужны настройка и владелец; инструменты Target видели атаку.` }],
    ],
    take: { en: `Next: when things go wrong, how to handle an incident.`, ru: `Дальше: когда что-то пошло не так — как вести инцидент.` } },
] });
