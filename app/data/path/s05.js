'use strict';
// Learning path, stage 5: how machines talk. Layers and addresses, TCP/UDP and the handshake, denial of service,
// local-network and DNS attacks, firewalls and DMZs, segmentation, secure protocols, wireless, remote access.
CISSP.stage(5, { cards: [
  { id: 's05-001', kind: 'story', k: ['d4-c6', 'd4-c2'], lvl: 1,
    title: { en: `Mirai 2016: cameras that took down the internet`, ru: `Mirai 2016: камеры, которые уронили интернет` },
    body: {
      en: `<p>In 2016, a piece of malware called <b>Mirai</b> scanned the internet for cheap connected devices: security cameras, video recorders, home routers. Many still had their factory username and password, and Mirai tried a short list of about 60 common pairs. Hundreds of thousands of devices joined its botnet.</p><p>On 21 October 2016, the botnet flooded <b>Dyn</b>, a company that answers DNS lookups for many big websites. For hours, people in the US and Europe couldn't reach Twitter, Netflix, Reddit and GitHub, although none of those sites was attacked directly.</p>`,
      ru: `<p>В 2016 году вредонос <b>Mirai</b> сканировал интернет в поисках дешёвых подключённых устройств: камер наблюдения, видеорегистраторов, домашних роутеров. Многие всё ещё работали с заводскими логином и паролем, а Mirai перебирал короткий список примерно из 60 популярных пар. Сотни тысяч устройств вошли в его ботнет.</p><p>21 октября 2016 года ботнет обрушил поток трафика на <b>Dyn</b> — компанию, которая отвечает на DNS-запросы для многих крупных сайтов. Несколько часов люди в США и Европе не могли открыть Twitter, Netflix, Reddit и GitHub, хотя ни один из этих сайтов напрямую не атаковали.</p>`,
    },
    take: { en: `On a network, your weakest neighbour and your quietest dependency are part of your risk.`, ru: `В сети ваш самый слабый сосед и самая незаметная зависимость — часть вашего риска.` } },

  { id: 's05-002', kind: 'idea', k: ['d4-c2'], lvl: 1,
    title: { en: `A network is envelopes inside envelopes`, ru: `Сеть — это конверты в конвертах` },
    body: {
      en: `<p>Everything that crosses a network is cut into small <b>packets</b>. Each packet carries a piece of data plus addresses, like a letter in an envelope:</p><ul><li>an <b>IP address</b> says which machine it's for, like a building's street address;</li><li>a <b>port</b> says which program on that machine, like a flat number: 443 for a website, 25 for mail;</li><li>a <b>MAC address</b> identifies the network card on the local network, like the name on the letterbox.</li></ul><p>Most network attacks lie about one of these addresses, or flood a machine with more envelopes than it can open.</p>`,
      ru: `<p>Всё, что идёт по сети, режется на маленькие <b>пакеты</b>. Каждый пакет несёт кусок данных и адреса, как письмо в конверте:</p><ul><li><b>IP-адрес</b> — какой машине, как адрес дома;</li><li><b>порт</b> — какой программе на этой машине, как номер квартиры: 443 для сайта, 25 для почты;</li><li><b>MAC-адрес</b> — какая сетевая карта в локальной сети, как фамилия на почтовом ящике.</li></ul><p>Большинство сетевых атак либо лгут об одном из этих адресов, либо заваливают машину конвертами, которые она не успевает вскрывать.</p>`,
    },
    take: { en: `IP finds the machine, the port finds the program, MAC finds the card next door.`, ru: `IP находит машину, порт — программу, MAC — карту по соседству.` } },

  { id: 's05-003', kind: 'idea', k: ['d4-c1'], lvl: 1,
    title: { en: `Why networking is split into layers`, ru: `Зачем сеть делят на уровни` },
    body: {
      en: `<p>Sending a web page involves very different jobs: turning bits into electrical or radio signals, delivering a frame to the next device, finding a route across the world, making sure nothing is lost, and finally showing the page.</p><p>The <b>OSI model</b> splits these jobs into seven <b>layers</b>. Each layer does one job and only talks to the layers right above and below it. That's useful for security: when you hear "a layer 2 attack" or "a layer 7 firewall", the number tells you what the attack touches and what the control can see.</p>`,
      ru: `<p>Чтобы передать веб-страницу, нужны очень разные работы: превратить биты в электрический или радиосигнал, доставить кадр до соседнего устройства, найти маршрут через полмира, проследить, чтобы ничего не потерялось, и наконец показать страницу.</p><p><b>Модель OSI</b> делит эти работы на семь <b>уровней</b>. Каждый делает одно дело и общается только с соседними уровнями. Для безопасности это удобно: «атака второго уровня» или «межсетевой экран седьмого уровня» — номер сразу говорит, что затрагивает атака и что видит защита.</p>`,
    },
    take: { en: `A layer number tells you what an attack touches and what a control can see.`, ru: `Номер уровня говорит, что затрагивает атака и что видит защита.` } },

  { id: 's05-004', kind: 'picture', k: ['d4-c1', 'd4-c6'], lvl: 1,
    title: { en: `Seven layers, one attack on each`, ru: `Семь уровней и атака на каждом` },
    body: {
      en: `<p>From the top: "All People Seem To Need Data Processing". Each layer has its own protocols, its own devices and its own attacks. A control protects only the layers it understands.</p>`,
      ru: `<p>Сверху вниз по-английски запоминают фразой «All People Seem To Need Data Processing». У каждого уровня свои протоколы, свои устройства и свои атаки. Защита охраняет только те уровни, которые понимает.</p>`,
    },
    dg: { title: { en: `OSI layers and typical attacks`, ru: `Уровни OSI и типичные атаки` }, h: 410,
      nodes: [
        ['l7', 200, 35, { en: '7 Application', ru: '7 Прикладной' }, { en: 'HTTP, DNS, SMTP', ru: 'HTTP, DNS, SMTP' }, null, 'key', 240],
        ['l6', 200, 91, { en: '6 Presentation', ru: '6 Представления' }, { en: 'encoding, TLS*', ru: 'кодировки, TLS*' }, null, 'key', 240],
        ['l5', 200, 147, { en: '5 Session', ru: '5 Сеансовый' }, { en: 'sessions', ru: 'сеансы' }, null, 'key', 240],
        ['l4', 200, 203, { en: '4 Transport', ru: '4 Транспортный' }, { en: 'TCP, UDP, ports', ru: 'TCP, UDP, порты' }, null, 'key', 240],
        ['l3', 200, 259, { en: '3 Network', ru: '3 Сетевой' }, { en: 'IP, routers', ru: 'IP, маршрутизаторы' }, null, 'key', 240],
        ['l2', 200, 315, { en: '2 Data link', ru: '2 Канальный' }, { en: 'MAC, switches', ru: 'MAC, коммутаторы' }, null, 'key', 240],
        ['l1', 200, 371, { en: '1 Physical', ru: '1 Физический' }, { en: 'cables, radio', ru: 'кабели, радио' }, null, 'key', 240],
        ['a7', 570, 35, { en: 'SQL injection, DNS poisoning', ru: 'SQL-инъекция, отравление DNS' }, null, '⚠', 'bad', 300],
        ['a6', 570, 91, { en: 'Downgrade to weak crypto', ru: 'Понижение до слабого шифра' }, null, '⚠', 'bad', 300],
        ['a5', 570, 147, { en: 'Session hijacking', ru: 'Перехват сеанса' }, null, '⚠', 'bad', 300],
        ['a4', 570, 203, { en: 'SYN flood, port scan', ru: 'SYN flood, сканирование портов' }, null, '⚠', 'bad', 300],
        ['a3', 570, 259, { en: 'IP spoofing, Smurf', ru: 'Подмена IP, Smurf' }, null, '⚠', 'bad', 300],
        ['a2', 570, 315, { en: 'ARP poisoning, MAC flood', ru: 'Отравление ARP, MAC flood' }, null, '⚠', 'bad', 300],
        ['a1', 570, 371, { en: 'Wiretap, jamming', ru: 'Прослушка кабеля, глушение' }, null, '⚠', 'bad', 300],
      ],
      edges: [
        ['a7', 'l7', null, 'bad'], ['a6', 'l6', null, 'bad'], ['a5', 'l5', null, 'bad'], ['a4', 'l4', null, 'bad'],
        ['a3', 'l3', null, 'bad'], ['a2', 'l2', null, 'bad'], ['a1', 'l1', null, 'bad'],
      ],
      note: { en: `* TLS doesn't fit one layer neatly; it is usually placed between 4 and 7.`, ru: `* TLS не укладывается ровно в один уровень; его обычно помещают между 4 и 7.` } },
    take: { en: `Know the layer, and you know which control can even see the attack.`, ru: `Знаете уровень — знаете, какая защита вообще способна увидеть атаку.` } },

  { id: 's05-005', kind: 'vs', k: ['d4-c1', 'd4-c2'], lvl: 1,
    title: { en: `OSI model vs TCP/IP model`, ru: `Модель OSI и модель TCP/IP` },
    body: {
      en: `<p>OSI is the teaching map with seven layers. <b>TCP/IP</b> is the model the internet actually runs on, with four:</p><ul><li><b>Application</b> = OSI 5, 6 and 7 (HTTP, DNS, mail).</li><li><b>Transport</b> = OSI 4 (TCP, UDP).</li><li><b>Internet</b> = OSI 3 (IP, ICMP).</li><li><b>Link</b> (network access) = OSI 1 and 2 (Ethernet, Wi-Fi).</li></ul><p>Exam questions usually use OSI numbers. When someone says "layer 3", they mean IP and routers in either model.</p>`,
      ru: `<p>OSI — учебная карта из семи уровней. <b>TCP/IP</b> — модель, на которой реально работает интернет, в ней четыре уровня:</p><ul><li><b>Прикладной</b> = OSI 5, 6 и 7 (HTTP, DNS, почта).</li><li><b>Транспортный</b> = OSI 4 (TCP, UDP).</li><li><b>Межсетевой</b> = OSI 3 (IP, ICMP).</li><li><b>Канальный</b> (доступ к сети) = OSI 1 и 2 (Ethernet, Wi-Fi).</li></ul><p>На экзамене обычно говорят номерами OSI. «Третий уровень» в обеих моделях означает IP и маршрутизаторы.</p>`,
    },
    take: { en: `Seven layers to learn with, four to run the internet on.`, ru: `Семь уровней, чтобы учиться, четыре — чтобы работал интернет.` } },

  { id: 's05-006', kind: 'think', k: ['d4-c1', 'd4-c4'], lvl: 1,
    title: { en: `"Our firewall blocks it"`, ru: `«Наш межсетевой экран это блокирует»` },
    body: {
      en: `<p>A penetration test finds that the customer login form is open to SQL injection: typing a crafted string into the username field returns the whole customer table.</p><p>The network team says there's nothing to worry about: "Our firewall only allows port 443 from the internet." Are they right?</p>`,
      ru: `<p>Тест на проникновение показал, что форма входа для клиентов уязвима к SQL-инъекции: специально подобранная строка в поле логина возвращает всю таблицу клиентов.</p><p>Сетевая команда спокойна: «Наш межсетевой экран пропускает из интернета только порт 443». Они правы?</p>`,
    },
    reveal: {
      en: `<p><b>No.</b> The attack arrives through port 443, the very port the firewall allows. A packet filter sees addresses and ports (layers 3 and 4); the injection lives in the content of the request (layer 7).</p><p>The real fix is in the code: parameterized queries and input validation. A <b>web application firewall</b> that reads requests can add a layer, but it doesn't replace fixing the cause.</p>`,
      ru: `<p><b>Нет.</b> Атака приходит через порт 443 — тот самый, который экран разрешает. Пакетный фильтр видит адреса и порты (уровни 3 и 4), а инъекция живёт в содержимом запроса (уровень 7).</p><p>Настоящее исправление — в коде: параметризованные запросы и проверка ввода. <b>Межсетевой экран для веб-приложений</b> (WAF), читающий запросы, может добавить слой, но не заменяет устранения причины.</p>`,
    },
    take: { en: `A control can't stop what happens on a layer it can't see.`, ru: `Защита не остановит то, что происходит на невидимом ей уровне.` } },

  { id: 's05-007', kind: 'idea', k: ['d4-c2'], lvl: 1,
    title: { en: `Public and private addresses, and NAT`, ru: `Публичные и частные адреса и NAT` },
    body: {
      en: `<p>An IPv4 address is 32 bits, written like 203.0.113.7. There aren't enough for every device, so three ranges are <b>private</b>, reused inside every home and office and never routed on the internet: <b>10.0.0.0/8</b>, <b>172.16.0.0/12</b> and <b>192.168.0.0/16</b>.</p><p><b>NAT</b> (network address translation) lets many private devices share one public address. As a side effect, outsiders can't start connections to inside machines unless a rule allows it. Useful, but NAT is not a firewall, and it does nothing about traffic your users start.</p>`,
      ru: `<p>Адрес IPv4 — это 32 бита, записанные как 203.0.113.7. Их на все устройства не хватает, поэтому три диапазона <b>частные</b>: их повторно используют в каждом доме и офисе и никогда не маршрутизируют в интернете: <b>10.0.0.0/8</b>, <b>172.16.0.0/12</b> и <b>192.168.0.0/16</b>.</p><p><b>NAT</b> (трансляция адресов) позволяет многим частным устройствам делить один публичный адрес. Побочный эффект: снаружи нельзя начать соединение с внутренней машиной, если правило этого не разрешает. Полезно, но NAT — не межсетевой экран и ничего не делает с трафиком, который начинают ваши пользователи.</p>`,
    },
    take: { en: `NAT hides addresses; it doesn't inspect anything.`, ru: `NAT прячет адреса, но ничего не проверяет.` } },

  { id: 's05-008', kind: 'vs', k: ['d4-c2', 'd4-c5'], lvl: 1,
    title: { en: `Cleartext ports and their secure replacements`, ru: `Открытые протоколы и их защищённые замены` },
    body: {
      en: `<p>Many old protocols send everything, passwords included, as readable text. Each has a secure successor:</p><ul><li><b>Telnet</b> (23) → <b>SSH</b> (22) for remote shells.</li><li><b>FTP</b> (20/21) → <b>SFTP</b> (over SSH) or FTPS.</li><li><b>HTTP</b> (80) → <b>HTTPS</b> (443).</li><li><b>SNMP v1/v2c</b> (161) → <b>SNMPv3</b> with authentication and encryption.</li><li><b>LDAP</b> (389) → <b>LDAPS</b> (636).</li></ul><p>Ports 0–1023 are "well-known", reserved for standard services. Knowing which ones are cleartext tells you what an eavesdropper can read.</p>`,
      ru: `<p>Многие старые протоколы передают всё, включая пароли, открытым текстом. У каждого есть защищённый преемник:</p><ul><li><b>Telnet</b> (23) → <b>SSH</b> (22) для удалённой консоли.</li><li><b>FTP</b> (20/21) → <b>SFTP</b> (поверх SSH) или FTPS.</li><li><b>HTTP</b> (80) → <b>HTTPS</b> (443).</li><li><b>SNMP v1/v2c</b> (161) → <b>SNMPv3</b> с аутентификацией и шифрованием.</li><li><b>LDAP</b> (389) → <b>LDAPS</b> (636).</li></ul><p>Порты 0–1023 — «общеизвестные», закреплённые за стандартными службами. Зная, какие из них открытые, вы знаете, что прочтёт подслушивающий.</p>`,
    },
    take: { en: `If a protocol has a secure twin, the old one shouldn't be on your network.`, ru: `Если у протокола есть защищённый двойник, старому не место в вашей сети.` } },

  { id: 's05-009', kind: 'idea', k: ['d4-c2'], lvl: 1,
    title: { en: `TCP and UDP: registered mail and postcards`, ru: `TCP и UDP: заказное письмо и открытка` },
    body: {
      en: `<p>Layer 4 offers two ways to send data:</p><ul><li><b>TCP</b> is like registered mail. It sets up a connection first, numbers every piece, confirms delivery and resends what's lost. Websites, email and file transfers use it.</li><li><b>UDP</b> is like a postcard. Send and forget: no connection, no confirmation, very little overhead. DNS lookups, voice and video calls and streaming use it, because a late packet is worse than a lost one.</li></ul><p>For security, UDP's lack of a handshake matters: the sender's address is easy to fake, which makes UDP services handy for amplification attacks.</p>`,
      ru: `<p>Уровень 4 предлагает два способа отправки:</p><ul><li><b>TCP</b> — как заказное письмо. Сначала устанавливает соединение, нумерует каждый кусок, подтверждает доставку и пересылает потерянное. Им пользуются сайты, почта, передача файлов.</li><li><b>UDP</b> — как открытка. Отправил и забыл: без соединения, без подтверждения, почти без накладных расходов. Им пользуются DNS, голосовые и видеозвонки, стриминг: опоздавший пакет хуже потерянного.</li></ul><p>Для безопасности важно, что у UDP нет рукопожатия: адрес отправителя легко подделать, и UDP-службы удобны для атак с усилением.</p>`,
    },
    take: { en: `TCP confirms who it's talking to; UDP takes the sender's word for it.`, ru: `TCP убеждается, с кем говорит; UDP верит отправителю на слово.` } },

  { id: 's05-010', kind: 'picture', k: ['d4-c3'], lvl: 1,
    title: { en: `The handshake, and how a SYN flood abuses it`, ru: `Рукопожатие и как его использует SYN flood` },
    body: {
      en: `<p>Every TCP connection starts with three messages. After the first one, the server reserves memory and waits. A SYN flood sends thousands of first messages from fake addresses and never sends the third.</p>`,
      ru: `<p>Каждое TCP-соединение начинается с трёх сообщений. После первого сервер резервирует память и ждёт. SYN flood присылает тысячи первых сообщений с поддельных адресов и никогда не отправляет третье.</p>`,
    },
    dg: { title: { en: `SYN → SYN/ACK → ACK`, ru: `SYN → SYN/ACK → ACK` }, h: 300,
      zones: [[20, 20, 720, 120, { en: 'Normal connection', ru: 'Обычное соединение' }, 'trust'], [20, 160, 720, 125, { en: 'SYN flood', ru: 'SYN flood' }, 'untrust']],
      nodes: [
        ['c', 130, 85, { en: 'Client', ru: 'Клиент' }, null, '💻', 'ok'],
        ['s', 630, 85, { en: 'Server', ru: 'Сервер' }, { en: 'connection open', ru: 'соединение открыто' }, '🖥', 'ok'],
        ['b', 130, 230, { en: 'Bots', ru: 'Боты' }, { en: 'spoofed sources', ru: 'поддельные адреса' }, '🤖', 'bad'],
        ['v', 630, 230, { en: 'Server', ru: 'Сервер' }, { en: 'table of half-open', ru: 'таблица полуоткрытых' }, '🖥', 'bad'],
      ],
      edges: [
        ['c', 's', { en: 'SYN → SYN/ACK → ACK', ru: 'SYN → SYN/ACK → ACK' }, 'both'],
        ['b', 'v', { en: 'SYN, SYN, SYN… no ACK', ru: 'SYN, SYN, SYN… без ACK' }, 'bad'],
      ] },
    take: { en: `A SYN flood fills the server's waiting list with guests who never arrive.`, ru: `SYN flood забивает список ожидания сервера гостями, которые никогда не придут.` } },

  { id: 's05-011', kind: 'idea', k: ['d4-c3', 'd4-c6'], lvl: 2,
    title: { en: `Stopping a SYN flood`, ru: `Как остановить SYN flood` },
    body: {
      en: `<p>The server's table of half-open connections is small. Once it's full, real customers can't connect: an availability attack.</p><ul><li><b>SYN cookies</b>: the server keeps no memory after the first message. It encodes what it needs into its reply, and rebuilds it only when a real ACK comes back.</li><li><b>Rate limiting</b> and shorter timeouts for half-open connections.</li><li><b>Upstream scrubbing</b>: a provider in front of you filters the flood before it reaches your link.</li></ul><p>On the exam, "half-open connections" and "SYN cookies" point to the same attack.</p>`,
      ru: `<p>Таблица полуоткрытых соединений у сервера невелика. Когда она заполнена, настоящие клиенты не могут подключиться: это атака на доступность.</p><ul><li><b>SYN cookies</b>: сервер ничего не запоминает после первого сообщения. Нужное он кодирует в свой ответ и восстанавливает, только когда вернётся настоящий ACK.</li><li><b>Ограничение частоты</b> и более короткие тайм-ауты для полуоткрытых соединений.</li><li><b>Очистка у провайдера</b>: стоящий перед вами сервис отфильтровывает поток до вашего канала.</li></ul><p>На экзамене «полуоткрытые соединения» и «SYN cookies» указывают на одну и ту же атаку.</p>`,
    },
    take: { en: `Don't spend memory on a stranger until they finish the handshake.`, ru: `Не тратьте память на незнакомца, пока он не закончил рукопожатие.` } },

  { id: 's05-012', kind: 'back', back: 's01-006', k: ['d1-c1', 'd4-c6'], lvl: 1,
    title: { en: `Availability again: when the attack is just volume`, ru: `Снова доступность: когда атака — это просто объём` },
    body: {
      en: `<p>In stage 1, availability meant "there when you need it". Mirai didn't steal a single record or change a single byte. Confidentiality and integrity were fine. Yet Twitter and Netflix were unreachable, and for a business that sells online, unreachable means lost revenue.</p><p>That's the nature of <b>denial of service</b>: the cheapest attack to launch, often the hardest to stop alone, and always aimed at the A in CIA. Plan for it the way you plan for a power cut: who you call, what keeps running, what customers see.</p>`,
      ru: `<p>На этапе 1 доступность означала «есть, когда нужно». Mirai не украл ни одной записи и не изменил ни одного байта. С конфиденциальностью и целостностью всё было в порядке. Но Twitter и Netflix были недоступны, а для бизнеса, который продаёт онлайн, недоступность — это потерянная выручка.</p><p>Такова природа <b>отказа в обслуживании</b>: самая дешёвая атака, которую часто труднее всего остановить в одиночку, и всегда направленная на A в CIA. Планируйте её, как отключение электричества: кому звонить, что продолжит работать, что увидят клиенты.</p>`,
    },
    take: { en: `Denial of service attacks availability alone, and that alone can stop a business.`, ru: `Отказ в обслуживании бьёт только по доступности, и одного этого хватает, чтобы остановить бизнес.` } },

  { id: 's05-013', kind: 'idea', k: ['d4-c6'], lvl: 2,
    title: { en: `DoS, DDoS and amplification`, ru: `DoS, DDoS и усиление` },
    body: {
      en: `<p>A <b>DoS</b> comes from one source and can often be blocked by its address. A <b>DDoS</b> comes from thousands of machines at once, usually a botnet like Mirai, so there's no single address to block.</p><p><b>Amplification</b> makes it worse. The attacker sends small requests to public servers (DNS, NTP, memcached) with the victim's address faked as the sender. The servers send much larger answers to the victim. In 2018, GitHub was hit by about <b>1.35 Tbps</b> this way, using memcached servers; its DDoS protection provider absorbed it within about ten minutes.</p>`,
      ru: `<p><b>DoS</b> идёт из одного источника, и его часто можно заблокировать по адресу. <b>DDoS</b> идёт сразу с тысяч машин, обычно из ботнета вроде Mirai, и заблокировать один адрес не выйдет.</p><p><b>Усиление</b> (amplification) делает хуже. Атакующий шлёт маленькие запросы публичным серверам (DNS, NTP, memcached), подставив адрес жертвы как отправителя. Серверы отправляют жертве гораздо более крупные ответы. В 2018 году так ударили по GitHub — около <b>1,35 Тбит/с</b> через серверы memcached; провайдер защиты от DDoS погасил атаку примерно за десять минут.</p>`,
    },
    take: { en: `Spoofed source plus a chatty server equals someone else's flood.`, ru: `Подделанный отправитель плюс болтливый сервер — и поток идёт к кому-то другому.` } },

  { id: 's05-014', kind: 'think', k: ['d4-c6', 'd1-c7'], lvl: 2,
    title: { en: `"Buy a bigger firewall"`, ru: `«Купите межсетевой экран помощнее»` },
    body: {
      en: `<p>Your online shop goes down for three hours on a sale day: a DDoS of 200 Gbps against a 10 Gbps internet link. The next morning the director says: "Buy the biggest firewall on the market so this never happens again."</p><p>What do you recommend?</p>`,
      ru: `<p>Ваш интернет-магазин лёг на три часа в день распродажи: DDoS на 200 Гбит/с против канала в 10 Гбит/с. Наутро директор говорит: «Купите самый мощный межсетевой экран на рынке, чтобы это не повторилось».</p><p>Что вы порекомендуете?</p>`,
    },
    reveal: {
      en: `<p><b>A firewall can't help here.</b> The flood fills the 10 Gbps link before any packet reaches your equipment, however big it is. Volumetric attacks must be stopped <b>upstream</b>: by your ISP, a DDoS scrubbing service or a CDN with far more capacity than any attacker.</p><p>Treat it as a business continuity question: what does an hour offline cost on a sale day? That number decides how much protection is worth buying, and the contract should be in place before the next attack, not during it.</p>`,
      ru: `<p><b>Межсетевой экран здесь не поможет.</b> Поток забивает канал 10 Гбит/с раньше, чем пакет дойдёт до вашего оборудования, каким бы мощным оно ни было. Объёмные атаки останавливают <b>выше по течению</b>: у провайдера, в сервисе очистки от DDoS или в CDN, у которых ёмкость больше, чем у любого атакующего.</p><p>Это вопрос непрерывности бизнеса: сколько стоит час простоя в день распродажи? Эта цифра решает, сколько стоит покупать защиты, а договор должен быть заключён до следующей атаки, а не во время неё.</p>`,
    },
    take: { en: `You can't filter a flood at the end of a pipe that's already full.`, ru: `Поток не отфильтровать на конце трубы, которая уже заполнена.` } },

  { id: 's05-015', kind: 'link', k: ['d4-c6', 'd5-c1', 'd4-c8'], lvl: 2,
    title: { en: `Mirai's way in: three old lessons`, ru: `Как вошёл Mirai: три старых урока` },
    body: {
      en: `<p>Mirai didn't use any clever exploit. It combined failures you already know:</p><ol><li><b>Default passwords</b> (stage 4): factory credentials, the same on every device, published in manuals.</li><li><b>Cleartext management</b>: Telnet left open to the whole internet.</li><li><b>No inventory or segmentation</b> (stage 3 and this stage): owners didn't know the cameras were exposed, and nothing kept them off the open internet.</li></ol><p>For a company, the lesson is: every connected device is a computer. Change its password, close what it doesn't need, put it on its own network segment.</p>`,
      ru: `<p>Mirai не использовал никаких хитрых эксплойтов. Он сложил провалы, которые вы уже знаете:</p><ol><li><b>Пароли по умолчанию</b> (этап 4): заводские учётные данные, одинаковые на всех устройствах и напечатанные в инструкциях.</li><li><b>Открытое управление</b>: Telnet, доступный всему интернету.</li><li><b>Нет учёта и сегментации</b> (этап 3 и этот этап): владельцы не знали, что камеры торчат наружу, и ничто не отделяло их от открытого интернета.</li></ol><p>Урок для компании: каждое подключённое устройство — компьютер. Смените пароль, закройте лишнее, вынесите его в отдельный сегмент сети.</p>`,
    },
    take: { en: `Every connected device is a computer, and needs the same basic care.`, ru: `Каждое подключённое устройство — компьютер, и ему нужен тот же базовый уход.` } },

  { id: 's05-016', kind: 'idea', k: ['d4-c2', 'd4-c6'], lvl: 2,
    title: { en: `ARP: the local network trusts everyone`, ru: `ARP: локальная сеть верит всем` },
    body: {
      en: `<p>Inside one local network, machines find each other by MAC address. <b>ARP</b> is how a laptop asks "who has 192.168.1.1, the router?" and gets back a MAC address. ARP has no authentication: any machine can answer, and the laptop believes the last answer it got.</p><p>In <b>ARP poisoning</b>, an attacker on the same network keeps announcing "I am the router". Traffic now flows through them: a <b>man-in-the-middle</b> who can read or change anything not encrypted. Defences: <b>Dynamic ARP Inspection</b> on switches, 802.1X to keep strangers off the network, and encryption everywhere.</p>`,
      ru: `<p>Внутри одной локальной сети машины находят друг друга по MAC-адресу. <b>ARP</b> — это способ, которым ноутбук спрашивает «у кого 192.168.1.1, у роутера?» и получает в ответ MAC-адрес. Аутентификации в ARP нет: ответить может любая машина, и ноутбук верит последнему ответу.</p><p>При <b>отравлении ARP</b> атакующий в той же сети всё время объявляет: «Роутер — это я». Теперь трафик идёт через него: это <b>человек посередине</b>, который читает или меняет всё незашифрованное. Защита: <b>Dynamic ARP Inspection</b> на коммутаторах, 802.1X, чтобы чужие не попадали в сеть, и шифрование везде.</p>`,
    },
    take: { en: `On a local network, anyone can claim to be the router unless the switch checks.`, ru: `В локальной сети любой может назваться роутером, если коммутатор этого не проверяет.` } },

  { id: 's05-017', kind: 'vs', k: ['d4-c4'], lvl: 1,
    title: { en: `Hub vs switch vs router`, ru: `Концентратор, коммутатор, маршрутизатор` },
    body: {
      en: `<ul><li>A <b>hub</b> (layer 1) repeats every signal to every port. Anyone plugged in sees everyone's traffic. Obsolete.</li><li>A <b>switch</b> (layer 2) learns which MAC address sits on which port and sends each frame only there. It can also split one physical network into <b>VLANs</b>.</li><li>A <b>router</b> (layer 3) moves packets between different networks using IP addresses, and can filter them with access control lists.</li></ul><p>A rule of thumb: the higher the layer, the more the device understands, and the more it can decide.</p>`,
      ru: `<ul><li><b>Концентратор</b> (hub, уровень 1) повторяет каждый сигнал на все порты. Любой подключившийся видит весь трафик. Устарел.</li><li><b>Коммутатор</b> (switch, уровень 2) запоминает, какой MAC-адрес за каким портом, и отправляет каждый кадр только туда. Ещё он умеет делить одну физическую сеть на <b>VLAN</b>.</li><li><b>Маршрутизатор</b> (router, уровень 3) переносит пакеты между разными сетями по IP-адресам и может фильтровать их списками доступа.</li></ul><p>Правило: чем выше уровень, тем больше устройство понимает и тем больше может решать.</p>`,
    },
    take: { en: `Hub shouts to all, switch delivers to one, router connects networks.`, ru: `Концентратор кричит всем, коммутатор доставляет одному, маршрутизатор соединяет сети.` } },

  { id: 's05-018', kind: 'idea', k: ['d4-c6', 'd4-c4'], lvl: 2,
    title: { en: `Attacks on the switch`, ru: `Атаки на коммутатор` },
    body: {
      en: `<ul><li><b>MAC flooding</b>: the attacker sends frames from thousands of fake MAC addresses until the switch's address table overflows. Many switches then fall back to sending everything to every port, like a hub, and the attacker can listen. Defence: <b>port security</b>, a limit on MAC addresses per port.</li><li><b>VLAN hopping</b>: tricking a switch into treating the attacker's port as a trunk that carries all VLANs, or sending frames with two VLAN tags. Defence: turn off automatic trunking and don't use the default native VLAN for users.</li></ul>`,
      ru: `<ul><li><b>MAC flooding</b>: атакующий шлёт кадры с тысяч поддельных MAC-адресов, пока таблица адресов коммутатора не переполнится. Многие коммутаторы тогда начинают слать всё на все порты, как концентратор, и атакующий может слушать. Защита: <b>port security</b>, ограничение числа MAC-адресов на порт.</li><li><b>VLAN hopping</b>: заставить коммутатор считать порт атакующего транком, который несёт все VLAN, или прислать кадры с двумя метками VLAN. Защита: выключить автоматический транкинг и не использовать native VLAN по умолчанию для пользователей.</li></ul>`,
    },
    take: { en: `A switch's defaults favour convenience; harden them like any server's.`, ru: `Настройки коммутатора по умолчанию — ради удобства; укрепляйте их, как у любого сервера.` } },

  { id: 's05-019', kind: 'story', k: ['d4-c2', 'd4-c6', 'd4-c5'], lvl: 2,
    title: { en: `Kaminsky 2008: the internet's phone book could be forged`, ru: `Каминский, 2008: телефонную книгу интернета можно было подделать` },
    body: {
      en: `<p><b>DNS</b> turns names like bank.example into IP addresses. Your computer asks a <b>resolver</b>, which remembers (caches) answers for a while.</p><p>In 2008, researcher Dan Kaminsky found a way to <b>poison</b> that cache quickly: flood the resolver with forged answers until one is accepted. Then everyone using that resolver who typed the bank's name would be sent to the attacker's server.</p><p>Before going public, he worked in secret with vendors, and a coordinated patch was released for many DNS products at once in July 2008. It randomized source ports so forged answers became much harder to guess.</p>`,
      ru: `<p><b>DNS</b> превращает имена вроде bank.example в IP-адреса. Ваш компьютер спрашивает <b>резолвер</b>, который какое-то время помнит (кеширует) ответы.</p><p>В 2008 году исследователь Дэн Каминский нашёл способ быстро <b>отравить</b> этот кеш: заваливать резолвер поддельными ответами, пока один не примут. Тогда всех, кто пользуется этим резолвером и вводит имя банка, отправляли бы на сервер атакующего.</p><p>До публикации он тайно работал с производителями, и в июле 2008 года для многих DNS-продуктов одновременно вышло согласованное исправление. Оно рандомизировало порты отправителя, и подделку стало намного труднее угадать.</p>`,
    },
    take: { en: `If DNS lies, every correct name you type leads to the wrong place.`, ru: `Если DNS лжёт, каждое правильно набранное имя ведёт не туда.` } },

  { id: 's05-020', kind: 'vs', k: ['d4-c5'], lvl: 2,
    title: { en: `DNSSEC vs DNS over HTTPS`, ru: `DNSSEC и DNS over HTTPS` },
    body: {
      en: `<p>Two fixes for DNS that solve different problems:</p><ul><li><b>DNSSEC</b> adds digital signatures to DNS records. The resolver can check that an answer really comes from the domain's owner and wasn't changed: <b>integrity and origin</b>. It doesn't hide anything: anyone on the path still sees which names you look up.</li><li><b>DoH / DoT</b> (DNS over HTTPS or TLS) encrypt the lookup between you and the resolver: <b>confidentiality</b>. They don't prove the resolver's answer is genuine.</li></ul><p>Exam trap: DNSSEC provides no confidentiality.</p>`,
      ru: `<p>Два исправления DNS, которые решают разные задачи:</p><ul><li><b>DNSSEC</b> добавляет к записям DNS цифровые подписи. Резолвер может проверить, что ответ действительно от владельца домена и не изменён: <b>целостность и подлинность источника</b>. Ничего не скрывает: любой на пути видит, какие имена вы запрашиваете.</li><li><b>DoH / DoT</b> (DNS поверх HTTPS или TLS) шифруют запрос между вами и резолвером: <b>конфиденциальность</b>. Подлинность ответа резолвера они не доказывают.</li></ul><p>Ловушка экзамена: DNSSEC не даёт конфиденциальности.</p>`,
    },
    take: { en: `DNSSEC proves the answer is genuine; DoH hides the question.`, ru: `DNSSEC доказывает подлинность ответа, DoH прячет вопрос.` } },

  { id: 's05-021', kind: 'idea', k: ['d4-c4'], lvl: 1,
    title: { en: `A firewall is a list of rules, read top to bottom`, ru: `Межсетевой экран — список правил, читаемый сверху вниз` },
    body: {
      en: `<p>A <b>firewall</b> sits between networks and decides, packet by packet or connection by connection, what may pass. Its rules read like: "allow from anywhere to the web server on port 443", "allow from the accounting network to the finance database on port 1433".</p><p>Two habits matter more than the brand:</p><ul><li><b>Default deny</b>: the last rule blocks everything not explicitly allowed.</li><li><b>Order</b>: most firewalls stop at the first matching rule, so a broad "allow" near the top silently overrides every careful rule below it.</li></ul><p>Filtering traffic leaving the network (<b>egress</b>) matters as much as filtering what comes in.</p>`,
      ru: `<p><b>Межсетевой экран</b> стоит между сетями и решает — по пакетам или по соединениям, — что может пройти. Его правила выглядят так: «разрешить отовсюду к веб-серверу на порт 443», «разрешить из сети бухгалтерии к базе финансов на порт 1433».</p><p>Две привычки важнее марки:</p><ul><li><b>Запрет по умолчанию</b>: последнее правило блокирует всё, что явно не разрешено.</li><li><b>Порядок</b>: большинство экранов останавливаются на первом совпавшем правиле, поэтому широкое «разрешить» вверху тихо отменяет все аккуратные правила ниже.</li></ul><p>Фильтровать исходящий трафик (<b>egress</b>) так же важно, как входящий.</p>`,
    },
    take: { en: `Deny by default, and remember that the first matching rule wins.`, ru: `Запрет по умолчанию, и помните: побеждает первое совпавшее правило.` } },

  { id: 's05-022', kind: 'vs', k: ['d4-c4'], lvl: 2,
    title: { en: `Packet filter vs stateful vs proxy vs next-generation`, ru: `Пакетный фильтр, stateful, прокси и NGFW` },
    body: {
      en: `<ul><li><b>Packet filter</b> (layer 3–4): checks each packet's addresses and ports on its own, with no memory. Fast, easy to fool.</li><li><b>Stateful inspection</b>: remembers connections, so it lets in only replies to conversations started from inside.</li><li><b>Application proxy</b> (layer 7): ends the connection, reads the actual request, and makes a new one. Slower, but understands content. A <b>WAF</b> is a proxy for web apps.</li><li><b>Next-generation firewall</b> (NGFW): stateful plus application awareness, user identity and intrusion prevention in one box.</li></ul>`,
      ru: `<ul><li><b>Пакетный фильтр</b> (уровни 3–4): проверяет адреса и порты каждого пакета по отдельности, без памяти. Быстрый, легко обмануть.</li><li><b>Stateful-инспекция</b>: помнит соединения и впускает только ответы на разговоры, начатые изнутри.</li><li><b>Прокси приложений</b> (уровень 7): завершает соединение, читает сам запрос и создаёт новое. Медленнее, но понимает содержимое. <b>WAF</b> — прокси для веб-приложений.</li><li><b>Межсетевой экран нового поколения</b> (NGFW): stateful плюс понимание приложений, учёт пользователей и предотвращение вторжений в одном устройстве.</li></ul>`,
    },
    take: { en: `The more a firewall understands, the more it can block, and the slower it runs.`, ru: `Чем больше экран понимает, тем больше может заблокировать и тем медленнее работает.` } },

  { id: 's05-023', kind: 'think', k: ['d4-c4', 'd7-c6'], lvl: 2,
    title: { en: `The rule from the night of the outage`, ru: `Правило из ночи аварии` },
    body: {
      en: `<p>During a firewall review you find rule number 3 of 400: "allow any source to any destination, any port". Its comment says "temp fix, payment outage, 14 March". That was two years ago. Nobody remembers who added it, and the payment team is nervous: "If you remove it, something might break."</p><p>What do you do?</p>`,
      ru: `<p>При пересмотре правил межсетевого экрана вы находите правило № 3 из 400: «разрешить с любого источника куда угодно, любой порт». Комментарий: «временно, авария платежей, 14 марта». Это было два года назад. Кто его добавил, никто не помнит, а команда платежей нервничает: «Уберёте — что-нибудь сломается».</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p>Rule 3 makes the other 397 below it meaningless: <b>the firewall is effectively off</b>. It must go, but through <b>change management</b>, not with a sudden deletion.</p><p>Find out what traffic actually matches it (the firewall logs can show this), write specific rules for the legitimate flows, get approval, remove rule 3 in a planned window with a rollback plan, and then fix the process: emergency changes need an owner, an expiry date and a review afterwards.</p>`,
      ru: `<p>Правило 3 делает бессмысленными остальные 397 под ним: <b>экран фактически выключен</b>. Его нужно убрать, но через <b>управление изменениями</b>, а не внезапным удалением.</p><p>Выясните, какой трафик на самом деле под него попадает (это покажут журналы экрана), напишите точные правила для законных потоков, получите одобрение, удалите правило 3 в плановое окно с планом отката и затем исправьте процесс: у срочных изменений должны быть владелец, срок действия и разбор после.</p>`,
    },
    take: { en: `A temporary rule without an expiry date is a permanent hole.`, ru: `Временное правило без срока действия — постоянная дыра.` } },

  { id: 's05-024', kind: 'picture', k: ['d4-c4', 'd4-c8'], lvl: 1,
    title: { en: `The DMZ: a lobby between the street and the offices`, ru: `DMZ: вестибюль между улицей и офисами` },
    body: {
      en: `<p>Servers the public must reach sit in their own zone. If one is hacked, the attacker is still outside the internal network, with a second firewall to cross.</p>`,
      ru: `<p>Серверы, к которым должна обращаться публика, стоят в собственной зоне. Если один взломан, атакующий всё ещё снаружи внутренней сети, и перед ним второй межсетевой экран.</p>`,
    },
    dg: { title: { en: `Screened subnet (DMZ)`, ru: `Экранированная подсеть (DMZ)` }, h: 300,
      zones: [[15, 40, 150, 220, { en: 'Internet', ru: 'Интернет' }, 'untrust'], [255, 40, 230, 220, { en: 'DMZ', ru: 'DMZ' }, 'dmz'], [575, 40, 170, 220, { en: 'Internal', ru: 'Внутренняя сеть' }, 'trust']],
      nodes: [
        ['u', 90, 150, { en: 'Visitors', ru: 'Посетители' }, null, '🌍', 'dim', 110],
        ['f1', 210, 150, { en: 'FW', ru: 'МЭ' }, null, '🧱', 'key', 70],
        ['web', 370, 100, { en: 'Web server', ru: 'Веб-сервер' }, null, '🖥', 'ok', 160],
        ['mail', 370, 200, { en: 'Mail relay', ru: 'Почтовый шлюз' }, null, '✉', 'ok', 160],
        ['f2', 530, 150, { en: 'FW', ru: 'МЭ' }, null, '🧱', 'key', 70],
        ['db', 660, 100, { en: 'Database', ru: 'База данных' }, null, '🗄', 'ok', 140],
        ['pc', 660, 200, { en: 'Staff PCs', ru: 'ПК сотрудников' }, null, '💻', 'ok', 140],
      ],
      edges: [
        ['u', 'f1', null], ['f1', 'web', { en: '443', ru: '443' }, 'ok'], ['f1', 'mail', { en: '25', ru: '25' }, 'ok'],
        ['web', 'f2', null, 'dash'], ['f2', 'db', null, 'ok'], ['f2', 'pc', null, 'dash'],
      ],
      note: { en: `The internet never talks to the inside directly. The DMZ can only reach the inside on the few ports it needs.`, ru: `Интернет никогда не обращается внутрь напрямую. Из DMZ внутрь можно только на те немногие порты, которые нужны.` } },
    take: { en: `Put what the public touches where its failure can't reach what the public mustn't.`, ru: `Размещайте то, чего касается публика, там, откуда его взлом не дотянется до того, чего ей касаться нельзя.` } },

  { id: 's05-025', kind: 'idea', k: ['d4-c4'], lvl: 2,
    title: { en: `Bastion hosts and other firewall layouts`, ru: `Бастионы и другие схемы межсетевых экранов` },
    body: {
      en: `<p>The exam names a few classic layouts:</p><ul><li><b>Screened subnet</b>: the DMZ from the last card, between two firewalls or on a third leg of one firewall.</li><li><b>Bastion host</b>: a server deliberately exposed to attack, so it's stripped to the minimum: one job, no extra software, every patch, full logging.</li><li><b>Dual-homed host</b>: one machine with two network cards, one on each side, that must never route between them by itself.</li><li><b>Screened host</b>: a router filters traffic so outsiders can reach only one hardened host.</li></ul>`,
      ru: `<p>На экзамене встречаются несколько классических схем:</p><ul><li><b>Экранированная подсеть</b>: DMZ из прошлой карточки, между двумя экранами или на третьем интерфейсе одного.</li><li><b>Бастион</b> (bastion host): сервер, намеренно выставленный под удар, поэтому урезанный до минимума: одна задача, ничего лишнего, все обновления, полное журналирование.</li><li><b>Dual-homed host</b>: одна машина с двумя сетевыми картами, по одной на каждой стороне, которая сама не должна маршрутизировать между ними.</li><li><b>Screened host</b>: маршрутизатор фильтрует трафик так, что снаружи доступен только один укреплённый хост.</li></ul>`,
    },
    take: { en: `Whatever faces the internet should do one job and nothing else.`, ru: `Всё, что смотрит в интернет, должно делать одну работу и ничего больше.` } },

  { id: 's05-026', kind: 'back', back: 's01-031', k: ['d3-c1', 'd4-c4'], lvl: 1,
    title: { en: `Defense in depth, drawn as a network`, ru: `Эшелонированная защита в виде сети` },
    body: {
      en: `<p>In stage 1, the castle had a moat, walls and a keep. A company network can be built the same way:</p><ol><li>DDoS protection at the provider.</li><li>An edge firewall with default deny.</li><li>A DMZ for public servers.</li><li>An internal firewall between the DMZ and the offices.</li><li>Separate segments inside: staff, servers, payment systems.</li><li>A host firewall and endpoint protection on each machine.</li><li>Encryption, so a tapped link reveals nothing.</li></ol><p>None of these is perfect. Each one turns a single mistake into something the attacker must repeat several times.</p>`,
      ru: `<p>На этапе 1 у замка были ров, стены и донжон. Сеть компании можно построить так же:</p><ol><li>Защита от DDoS у провайдера.</li><li>Пограничный экран с запретом по умолчанию.</li><li>DMZ для публичных серверов.</li><li>Внутренний экран между DMZ и офисами.</li><li>Отдельные сегменты внутри: сотрудники, серверы, платёжные системы.</li><li>Хостовый экран и защита на каждой машине.</li><li>Шифрование, чтобы прослушанный канал ничего не дал.</li></ol><p>Ни один слой не идеален. Каждый превращает одну ошибку в то, что атакующему придётся повторить несколько раз.</p>`,
    },
    take: { en: `Layers on a network make one mistake not enough.`, ru: `Слои в сети делают одной ошибки недостаточно.` } },

  { id: 's05-027', kind: 'vs', k: ['d4-c4'], lvl: 2,
    title: { en: `IDS vs IPS, signature vs anomaly`, ru: `IDS и IPS, сигнатуры и аномалии` },
    body: {
      en: `<ul><li>An <b>IDS</b> (intrusion detection system) watches a copy of the traffic and <b>raises alerts</b>. It sits beside the flow and can't block anything by itself.</li><li>An <b>IPS</b> (intrusion prevention system) sits <b>inline</b>, in the path, and drops malicious traffic. A false positive here blocks real customers.</li></ul><p>How they recognize an attack:</p><ul><li><b>Signature-based</b>: matches known patterns. Few false alarms, but blind to new attacks.</li><li><b>Anomaly-based</b>: learns what's normal and flags deviations. Catches new attacks, raises more false alarms.</li></ul><p>Both come as network (NIDS) or host (HIDS) versions.</p>`,
      ru: `<ul><li><b>IDS</b> (система обнаружения вторжений) смотрит копию трафика и <b>поднимает тревогу</b>. Она стоит сбоку от потока и сама ничего не блокирует.</li><li><b>IPS</b> (система предотвращения вторжений) стоит <b>в разрыве</b>, на пути трафика, и отбрасывает вредоносное. Ложное срабатывание здесь блокирует настоящих клиентов.</li></ul><p>Как они узнают атаку:</p><ul><li><b>По сигнатурам</b>: сравнивают с известными шаблонами. Мало ложных тревог, но новых атак не видят.</li><li><b>По аномалиям</b>: изучают норму и отмечают отклонения. Ловят новое, но чаще ошибаются.</li></ul><p>Обе бывают сетевыми (NIDS) и хостовыми (HIDS).</p>`,
    },
    take: { en: `IDS tells you, IPS stops it; signatures know the past, anomalies notice the new.`, ru: `IDS сообщает, IPS останавливает; сигнатуры знают прошлое, аномалии замечают новое.` } },

  { id: 's05-028', kind: 'back', back: 's01-032', k: ['d4-c8', 'd1-c13'], lvl: 1,
    title: { en: `Target again: from the heating vendor to the checkout lanes`, ru: `Снова Target: от подрядчика по отоплению до касс` },
    body: {
      en: `<p>In stage 1, Target's attackers entered with a heating contractor's login. The question this stage can answer is: <b>why could a supplier portal lead to the checkout terminals at all?</b></p><p>A US Senate committee report in 2014 concluded that Target had not properly isolated its most sensitive systems. Once inside, the attackers moved across the network to the point-of-sale systems, collected card data on an internal server and sent it out to servers they controlled.</p><p>A vendor portal, office PCs and card terminals have nothing to say to each other. On a well-segmented network, they can't.</p>`,
      ru: `<p>На этапе 1 атакующие вошли в Target с логином подрядчика по отоплению. Вопрос, на который отвечает этот этап: <b>почему портал поставщиков вообще мог привести к кассовым терминалам?</b></p><p>Доклад комитета Сената США в 2014 году заключил, что Target не изолировала должным образом самые чувствительные системы. Оказавшись внутри, атакующие прошли по сети к кассовым системам, собрали данные карт на внутреннем сервере и отправили их на свои серверы.</p><p>Порталу поставщиков, офисным ПК и кассам не о чем говорить друг с другом. В хорошо сегментированной сети они и не могут.</p>`,
    },
    take: { en: `If systems have no reason to talk, the network shouldn't let them.`, ru: `Если системам незачем общаться, сеть не должна им это позволять.` } },

  { id: 's05-029', kind: 'picture', k: ['d4-c8'], lvl: 1,
    title: { en: `Flat network vs segmented network`, ru: `Плоская сеть и сегментированная` },
    body: {
      en: `<p>On the left, one stolen vendor login reaches everything. On the right, the same login lands in a small zone, and every path to the card systems crosses a filter that says no.</p>`,
      ru: `<p>Слева один украденный логин подрядчика достаёт до всего. Справа тот же логин попадает в маленькую зону, и любой путь к карточным системам проходит через фильтр, который говорит «нет».</p>`,
    },
    dg: { title: { en: `One stolen login, two networks`, ru: `Один украденный логин, две сети` }, h: 300,
      zones: [[10, 30, 350, 255, { en: 'Flat', ru: 'Плоская' }, 'untrust'], [400, 30, 350, 255, { en: 'Segmented', ru: 'Сегментированная' }, 'trust']],
      nodes: [
        ['fv', 100, 90, { en: 'Vendor portal', ru: 'Портал' }, null, '🔑', 'bad', 130],
        ['fo', 275, 90, { en: 'Office PCs', ru: 'Офисные ПК' }, null, '💻', 'bad', 130],
        ['fp', 100, 220, { en: 'Checkouts', ru: 'Кассы' }, null, '💳', 'bad', 130],
        ['fs', 275, 220, { en: 'Servers', ru: 'Серверы' }, null, '🗄', 'bad', 130],
        ['sv', 470, 90, { en: 'Vendor portal', ru: 'Портал' }, null, '🔑', 'bad', 130],
        ['sf', 670, 155, { en: 'Filter', ru: 'Фильтр' }, { en: 'default deny', ru: 'запрет' }, '🧱', 'key', 120],
        ['sp', 470, 220, { en: 'Checkouts', ru: 'Кассы' }, null, '💳', 'ok', 130],
      ],
      edges: [
        ['fv', 'fo', null, 'bad'], ['fv', 'fp', null, 'bad'], ['fv', 'fs', null, 'bad'], ['fs', 'fp', null, 'bad'],
        ['sv', 'sf', { en: 'blocked', ru: 'заблокировано' }, 'bad', 30, -20], ['sf', 'sp', { en: 'only payment flows', ru: 'только платежи' }, 'ok', 40, 20],
      ] },
    take: { en: `Segmentation turns "they got in" into "they got into one small room".`, ru: `Сегментация превращает «они проникли» в «они проникли в одну маленькую комнату».` } },

  { id: 's05-030', kind: 'idea', k: ['d4-c8', 'd4-c4'], lvl: 2,
    title: { en: `VLANs: separate networks on the same switches`, ru: `VLAN: отдельные сети на тех же коммутаторах` },
    body: {
      en: `<p>Buying separate switches for every department would be expensive. A <b>VLAN</b> (virtual LAN) splits one switch into several logical networks: staff, guests, phones, cameras, payment terminals. Machines in different VLANs can't reach each other directly.</p><p>To talk across VLANs, traffic must go through a router or a layer 3 switch, and that's where you put the <b>access control lists</b> that decide which flows are allowed. A VLAN without filtering between them is just a tidier flat network.</p>`,
      ru: `<p>Покупать отдельные коммутаторы для каждого отдела дорого. <b>VLAN</b> (виртуальная локальная сеть) делит один коммутатор на несколько логических сетей: сотрудники, гости, телефоны, камеры, платёжные терминалы. Машины из разных VLAN не видят друг друга напрямую.</p><p>Чтобы общаться между VLAN, трафик должен пройти через маршрутизатор или коммутатор третьего уровня, и именно там ставят <b>списки доступа</b>, решающие, какие потоки разрешены. VLAN без фильтрации между ними — просто более аккуратная плоская сеть.</p>`,
    },
    take: { en: `VLANs separate; the filters between them protect.`, ru: `VLAN разделяют, а защищают фильтры между ними.` } },

  { id: 's05-031', kind: 'think', k: ['d4-c8', 'd4-c7', 'd1-c13'], lvl: 2,
    title: { en: `The smart building wants the office Wi-Fi`, ru: `Умному зданию нужен офисный Wi-Fi` },
    body: {
      en: `<p>Facilities has bought a smart system: sensors that control heating, lights and meeting-room screens. The installer asks for the office Wi-Fi password, "so the sensors can reach our cloud and our engineers can maintain them remotely."</p><p>The facilities manager just wants it working by Monday. What do you suggest?</p>`,
      ru: `<p>Хозяйственный отдел купил умную систему: датчики, управляющие отоплением, светом и экранами в переговорных. Установщик просит пароль от офисного Wi-Fi, «чтобы датчики ходили в наше облако, а инженеры обслуживали их удалённо».</p><p>Завхозу нужно, чтобы всё заработало к понедельнику. Что вы предложите?</p>`,
    },
    reveal: {
      en: `<p><b>Say yes to the project, no to the office network.</b> Remember Target: the way in was a heating vendor.</p><p>Put the devices on their own <b>IoT segment</b> (a separate VLAN or SSID) that can only reach the vendor's cloud and nothing internal. Change default passwords and add the devices to the inventory. For the vendor's remote maintenance, agree terms in the contract and give them a controlled, logged path rather than the Wi-Fi password.</p>`,
      ru: `<p><b>«Да» проекту, «нет» офисной сети.</b> Вспомните Target: вход был через подрядчика по отоплению.</p><p>Поместите устройства в отдельный <b>IoT-сегмент</b> (свой VLAN или SSID), из которого доступно только облако поставщика и ничего внутреннего. Смените пароли по умолчанию и внесите устройства в учёт. Для удалённого обслуживания согласуйте условия в договоре и дайте поставщику контролируемый путь с журналированием, а не пароль от Wi-Fi.</p>`,
    },
    take: { en: `Connected things get their own segment, not your office network.`, ru: `Подключённым вещам — свой сегмент, а не офисная сеть.` } },

  { id: 's05-032', kind: 'back', back: 's04-054', k: ['d4-c8', 'd3-c1'], lvl: 2,
    title: { en: `Zero trust on the network: micro-segmentation`, ru: `Zero trust в сети: микросегментация` },
    body: {
      en: `<p>Stage 4 ended with "identity is the new perimeter": don't trust a request just because it comes from inside. The network version of that idea is <b>micro-segmentation</b>.</p><p>Instead of a few large zones, every workload gets its own small policy: the web server may talk to the app server on one port, the app server to the database on one port, and nothing else. In data centres and clouds, this is enforced by software on each host, not by physical firewalls.</p><p>An attacker who takes over one server finds that almost nothing answers.</p>`,
      ru: `<p>Этап 4 закончился фразой «идентичность — новый периметр»: не доверяйте запросу только потому, что он изнутри. Сетевая версия этой идеи — <b>микросегментация</b>.</p><p>Вместо нескольких больших зон у каждой нагрузки своя маленькая политика: веб-сервер может говорить с сервером приложений на одном порту, сервер приложений — с базой на одном порту, и больше ничего. В центрах обработки данных и облаках это обеспечивает программа на каждом хосте, а не физические экраны.</p><p>Атакующий, захвативший один сервер, обнаруживает, что ему почти никто не отвечает.</p>`,
    },
    take: { en: `Zero trust on the network: every flow must be allowed on its own.`, ru: `Zero trust в сети: каждый поток должен быть разрешён отдельно.` } },

  { id: 's05-033', kind: 'idea', k: ['d4-c8'], lvl: 2,
    title: { en: `SDN: the network's brain, moved into software`, ru: `SDN: мозг сети переехал в программу` },
    body: {
      en: `<p>A classic switch both <b>decides</b> where traffic goes (the <b>control plane</b>) and <b>forwards</b> it (the <b>data plane</b>). Software-defined networking separates the two: a central <b>controller</b> decides for the whole network, and switches simply forward as told.</p><p>The benefit: one change in the controller applies everywhere at once, which is what makes micro-segmentation and quick isolation practical. The risk: the controller is now the most valuable target in the network. Protect it like a domain controller: strong access control, its own segment, full logging.</p>`,
      ru: `<p>Классический коммутатор и <b>решает</b>, куда пойдёт трафик (<b>плоскость управления</b>), и <b>пересылает</b> его (<b>плоскость данных</b>). Программно-определяемая сеть разделяет их: центральный <b>контроллер</b> решает за всю сеть, а коммутаторы просто пересылают, как велено.</p><p>Плюс: одно изменение в контроллере сразу действует везде, и это делает практичными микросегментацию и быструю изоляцию. Риск: контроллер теперь самая ценная цель в сети. Защищайте его как контроллер домена: строгий доступ, отдельный сегмент, полное журналирование.</p>`,
    },
    take: { en: `Centralize the network's decisions, and you centralize the target too.`, ru: `Централизуете решения сети — централизуете и цель.` } },

  { id: 's05-034', kind: 'back', back: 's01-004', k: ['d4-c8', 'd3-c1'], lvl: 2,
    title: { en: `Stuxnet again: the air gap that wasn't`, ru: `Снова Stuxnet: воздушный зазор, которого не было` },
    body: {
      en: `<p>The strongest separation is an <b>air gap</b>: no network connection at all. Iran's Natanz enrichment plant, from stage 1, was built that way. Stuxnet is widely believed to have got in on <b>USB drives</b> carried by people who worked there or with its contractors.</p><p>So an air gap is a strong control, not a magic one. It has to be backed by rules about what media may cross it, scanning of anything that does, and people who understand why. The same applies to any segment: a USB stick or a laptop moving between zones is a network link too.</p>`,
      ru: `<p>Самое сильное разделение — <b>воздушный зазор</b> (air gap): никакого сетевого подключения. Так был устроен иранский завод по обогащению в Натанзе из этапа 1. Считается, что Stuxnet попал туда на <b>USB-накопителях</b>, которые приносили сотрудники или подрядчики.</p><p>Значит, воздушный зазор — сильная мера, но не волшебная. Ей нужны правила о том, какие носители могут его пересекать, проверка всего, что пересекает, и люди, понимающие зачем. Это верно для любого сегмента: флешка или ноутбук, переходящие между зонами, — тоже сетевое соединение.</p>`,
    },
    take: { en: `Anything that crosses a gap, a USB stick included, is a network connection.`, ru: `Всё, что пересекает зазор, включая флешку, — сетевое соединение.` } },

  { id: 's05-035', kind: 'idea', k: ['d4-c8'], lvl: 2,
    title: { en: `Everything over IP: converged networks`, ru: `Всё поверх IP: конвергентные сети` },
    body: {
      en: `<p>Phones, storage and industrial systems used to have their own networks. Now most of them run over ordinary IP and Ethernet:</p><ul><li><b>VoIP</b>: phone calls (SIP to set up, RTP to carry voice). Secure with SIPS/TLS and SRTP, and give voice its own VLAN.</li><li><b>iSCSI</b> and <b>FCoE</b>: storage disks reached over the network.</li><li><b>MPLS</b>: providers' label switching that keeps customers' traffic apart, but doesn't encrypt it.</li></ul><p>Convergence saves money, but one network outage or one attacker on it now reaches phones, storage and data together.</p>`,
      ru: `<p>Раньше у телефонов, хранилищ и промышленных систем были собственные сети. Теперь большинство работает поверх обычных IP и Ethernet:</p><ul><li><b>VoIP</b>: телефонные звонки (SIP устанавливает, RTP несёт голос). Защищают SIPS/TLS и SRTP, а голосу дают свой VLAN.</li><li><b>iSCSI</b> и <b>FCoE</b>: диски хранилищ по сети.</li><li><b>MPLS</b>: коммутация по меткам у провайдеров, которая разделяет трафик клиентов, но не шифрует его.</li></ul><p>Конвергенция экономит деньги, но один сбой сети или один атакующий в ней теперь достают сразу до телефонов, хранилищ и данных.</p>`,
    },
    take: { en: `One network for everything means one failure reaches everything.`, ru: `Одна сеть для всего — один сбой для всего.` } },

  { id: 's05-036', kind: 'vs', k: ['d4-c8'], lvl: 2,
    title: { en: `Copper vs fiber vs radio`, ru: `Медь, оптика и радио` },
    body: {
      en: `<ul><li><b>Twisted pair copper</b> (Cat 5e/6/6a): cheap, up to about 100 m. Affected by electrical interference (EMI) and crosstalk, and it leaks signals that can be tapped.</li><li><b>Fiber optic</b>: light instead of electricity. Immune to EMI, long distances, and the hardest to tap without being noticed.</li><li><b>Wireless</b>: no cable at all, so anyone in range can listen. Protection must come from encryption.</li></ul><p>One physical detail the exam likes: cable run through air-handling spaces must be <b>plenum-rated</b>, so a fire doesn't fill the building with toxic smoke.</p>`,
      ru: `<ul><li><b>Медная витая пара</b> (Cat 5e/6/6a): дёшево, до 100 м. Страдает от электромагнитных помех (EMI) и перекрёстных наводок, а её излучение можно перехватить.</li><li><b>Оптоволокно</b>: свет вместо тока. Не боится помех, тянется далеко, и его труднее всего прослушать незаметно.</li><li><b>Беспроводная связь</b>: кабеля нет вовсе, слушать может любой в зоне досягаемости. Защищать приходится шифрованием.</li></ul><p>Физическая деталь, которую любит экзамен: кабель в вентиляционных пространствах должен быть <b>plenum</b>-класса, чтобы при пожаре здание не заполнилось ядовитым дымом.</p>`,
    },
    take: { en: `Fiber is hardest to tap, radio is easiest; encrypt whatever you can't guard.`, ru: `Оптику прослушать труднее всего, радио — легче всего; шифруйте то, что не можете охранять.` } },

  { id: 's05-037', kind: 'back', back: 's03-012', k: ['d2-c3', 'd4-c5'], lvl: 1,
    title: { en: `Data in transit: now you know where it travels`, ru: `Данные в движении: теперь вы знаете, где они едут` },
    body: {
      en: `<p>Stage 3 named three states of data: at rest, in transit, in use. "In transit" now has a map: a packet crosses Wi-Fi, a switch, a router, a provider's lines and someone else's data centre. Each hop is a place where it can be read (sniffing) or changed (man-in-the-middle).</p><p>You can't guard every cable in the world, so data in transit is protected by <b>encryption between the endpoints</b>: TLS for apps and websites, IPsec or a VPN for whole networks, SSH for administration. Then it doesn't matter much who carries the envelope.</p>`,
      ru: `<p>Этап 3 назвал три состояния данных: в покое, в движении, в использовании. У «движения» теперь есть карта: пакет проходит Wi-Fi, коммутатор, маршрутизатор, линии провайдера и чужой центр обработки данных. Каждый узел — место, где его можно прочитать (прослушка) или изменить (человек посередине).</p><p>Охранять каждый кабель в мире невозможно, поэтому данные в движении защищают <b>шифрованием между конечными точками</b>: TLS для приложений и сайтов, IPsec или VPN для целых сетей, SSH для администрирования. Тогда уже не так важно, кто несёт конверт.</p>`,
    },
    take: { en: `You can't guard the road, so seal the envelope.`, ru: `Дорогу не уберечь, поэтому запечатайте конверт.` } },

  { id: 's05-038', kind: 'idea', k: ['d4-c5'], lvl: 1,
    title: { en: `What the padlock means, and what it doesn't`, ru: `Что значит замок в браузере, а что нет` },
    body: {
      en: `<p>The padlock in a browser means the connection uses <b>TLS</b>. TLS gives you three things: the traffic is <b>encrypted</b>, it can't be <b>changed</b> unnoticed, and the server has shown a <b>certificate</b> for that name, issued by an authority your browser trusts.</p><p>It doesn't mean the site is honest. A phishing site can get a valid certificate for its own lookalike name in minutes.</p><p>Versions matter: all SSL versions and TLS 1.0 and 1.1 are deprecated. Use <b>TLS 1.2 or 1.3</b>. How the keys and certificates work comes in stage 6.</p>`,
      ru: `<p>Замок в браузере означает, что соединение использует <b>TLS</b>. TLS даёт три вещи: трафик <b>зашифрован</b>, его нельзя незаметно <b>изменить</b>, а сервер предъявил <b>сертификат</b> на это имя от центра, которому доверяет ваш браузер.</p><p>Это не значит, что сайт честный. Фишинговый сайт за минуты получает действительный сертификат на собственное похожее имя.</p><p>Версии важны: все версии SSL и TLS 1.0 и 1.1 устарели. Используйте <b>TLS 1.2 или 1.3</b>. Как устроены ключи и сертификаты — на этапе 6.</p>`,
    },
    take: { en: `The padlock proves you're talking privately to that name, not that the name is honest.`, ru: `Замок доказывает, что вы приватно говорите с этим именем, а не что имя честное.` } },

  { id: 's05-039', kind: 'think', k: ['d4-c5', 'd4-c2'], lvl: 2,
    title: { en: `"It's only Telnet inside our network"`, ru: `«Это всего лишь Telnet внутри нашей сети»` },
    body: {
      en: `<p>Your network engineers manage 200 switches and routers with Telnet. You suggest moving to SSH. The lead engineer objects: "Telnet is only reachable from the internal network. Nobody outside can see it, and our old scripts depend on it."</p><p>How do you respond?</p>`,
      ru: `<p>Сетевые инженеры управляют 200 коммутаторами и маршрутизаторами через Telnet. Вы предлагаете перейти на SSH. Ведущий инженер возражает: «Telnet доступен только из внутренней сети. Снаружи его никто не видит, а наши старые скрипты от него зависят».</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p><b>"Internal" is not "trusted".</b> Telnet sends the admin passwords in cleartext. Anyone on the inside who can sniff traffic, say, a phished laptop or an attacker using ARP poisoning, collects the keys to every network device.</p><p>Plan the move to SSH as a normal change: update the scripts, disable Telnet on the devices, and keep management traffic on its own segment. Assume an attacker is already inside, and decide what they could read.</p>`,
      ru: `<p><b>«Внутренний» не значит «доверенный».</b> Telnet передаёт пароли администраторов открытым текстом. Любой внутри, кто может слушать трафик, например через фишинговый ноутбук или отравление ARP, соберёт ключи от всех сетевых устройств.</p><p>Спланируйте переход на SSH как обычное изменение: обновите скрипты, отключите Telnet на устройствах и держите управляющий трафик в отдельном сегменте. Исходите из того, что атакующий уже внутри, и решите, что он смог бы прочитать.</p>`,
    },
    take: { en: `Cleartext inside the network is a gift to the first attacker who gets in.`, ru: `Открытый текст внутри сети — подарок первому вошедшему атакующему.` } },

  { id: 's05-040', kind: 'picture', k: ['d4-c5', 'd4-c9'], lvl: 2,
    title: { en: `IPsec: transport mode vs tunnel mode`, ru: `IPsec: транспортный и туннельный режим` },
    body: {
      en: `<p>IPsec protects IP packets themselves, at layer 3, so every application benefits without changing. Transport mode wraps only the contents; tunnel mode wraps the whole original packet, addresses included.</p>`,
      ru: `<p>IPsec защищает сами IP-пакеты на уровне 3, поэтому выигрывает любое приложение без изменений. Транспортный режим заворачивает только содержимое, туннельный — весь исходный пакет вместе с адресами.</p>`,
    },
    dg: { title: { en: `What IPsec wraps`, ru: `Что заворачивает IPsec` }, h: 300,
      zones: [[20, 20, 720, 120, { en: 'Transport mode: host to host', ru: 'Транспортный режим: хост — хост' }, 'trust'], [20, 160, 720, 125, { en: 'Tunnel mode: gateway to gateway (site VPN)', ru: 'Туннельный режим: шлюз — шлюз (VPN между офисами)' }, 'trust']],
      nodes: [
        ['h1', 110, 85, { en: 'Server A', ru: 'Сервер A' }, null, '🖥', 'ok', 130],
        ['p1', 380, 85, { en: 'IP header | 🔒 data', ru: 'IP-заголовок | 🔒 данные' }, { en: 'real addresses visible', ru: 'адреса видны' }, null, 'key', 230],
        ['h2', 650, 85, { en: 'Server B', ru: 'Сервер B' }, null, '🖥', 'ok', 130],
        ['g1', 110, 230, { en: 'Office gateway', ru: 'Шлюз офиса' }, null, '🏢', 'ok', 150],
        ['p2', 380, 230, { en: 'new header | 🔒 whole packet', ru: 'новый заголовок | 🔒 весь пакет' }, { en: 'inner addresses hidden', ru: 'внутренние адреса скрыты' }, null, 'key', 250],
        ['g2', 650, 230, { en: 'DC gateway', ru: 'Шлюз ЦОД' }, null, '🏭', 'ok', 150],
      ],
      edges: [['h1', 'p1', null, 'ok'], ['p1', 'h2', null, 'ok'], ['g1', 'p2', null, 'ok'], ['p2', 'g2', null, 'ok']] },
    take: { en: `Transport protects the contents; tunnel protects the contents and who's talking.`, ru: `Транспортный режим защищает содержимое, туннельный — ещё и то, кто с кем говорит.` } },

  { id: 's05-041', kind: 'vs', k: ['d4-c5'], lvl: 2,
    title: { en: `AH vs ESP`, ru: `AH и ESP` },
    body: {
      en: `<p>IPsec has two protocols, and the exam loves the difference:</p><ul><li><b>AH</b> (Authentication Header): proves the packet came from the peer and wasn't changed: <b>integrity and authentication, no encryption</b>. Because it also protects the IP header, it breaks when NAT rewrites addresses.</li><li><b>ESP</b> (Encapsulating Security Payload): <b>encryption plus integrity</b>. This is what almost every VPN uses.</li></ul><p>Before any of this, <b>IKE</b> negotiates the keys and settings. Each agreed setup is a <b>security association</b> (SA), one per direction.</p>`,
      ru: `<p>В IPsec два протокола, и экзамен любит разницу между ними:</p><ul><li><b>AH</b> (Authentication Header): доказывает, что пакет от собеседника и не изменён: <b>целостность и аутентификация, без шифрования</b>. Поскольку он защищает и IP-заголовок, он ломается, когда NAT переписывает адреса.</li><li><b>ESP</b> (Encapsulating Security Payload): <b>шифрование плюс целостность</b>. Его использует почти каждый VPN.</li></ul><p>До всего этого <b>IKE</b> согласует ключи и параметры. Каждая согласованная настройка — <b>ассоциация безопасности</b> (SA), по одной на направление.</p>`,
    },
    take: { en: `AH authenticates, ESP also encrypts; if it must be secret, it's ESP.`, ru: `AH подтверждает подлинность, ESP ещё и шифрует; если нужна тайна — это ESP.` } },

  { id: 's05-042', kind: 'idea', k: ['d4-c5', 'd4-c9'], lvl: 2,
    title: { en: `Protect the network's own controls`, ru: `Защитите органы управления самой сети` },
    body: {
      en: `<p>Whoever controls the switches, routers and firewalls controls everything that flows through them. So management traffic gets extra care:</p><ul><li><b>Encrypted protocols only</b>: SSH, HTTPS, SNMPv3.</li><li>A separate <b>management network</b> (out-of-band), not reachable from staff PCs or the internet.</li><li>Admins log in through a <b>jump host</b> with MFA, and every command is logged.</li><li>Device admin logins checked by a central AAA server such as TACACS+, so a leaver loses access everywhere at once.</li></ul>`,
      ru: `<p>Кто управляет коммутаторами, маршрутизаторами и экранами, тот управляет всем, что через них проходит. Поэтому за управляющим трафиком особый уход:</p><ul><li><b>Только шифрованные протоколы</b>: SSH, HTTPS, SNMPv3.</li><li>Отдельная <b>сеть управления</b> (out-of-band), недоступная с ПК сотрудников и из интернета.</li><li>Администраторы входят через <b>jump-хост</b> с MFA, и каждая команда журналируется.</li><li>Входы админов на устройства проверяет центральный AAA-сервер, например TACACS+, чтобы уволившийся терял доступ везде сразу.</li></ul>`,
    },
    take: { en: `The network's control panel deserves its own locked room.`, ru: `Пульту управления сетью нужна своя запертая комната.` } },

  { id: 's05-043', kind: 'back', back: 's02-021', k: ['d4-c5', 'd1-c14'], lvl: 2,
    title: { en: `The CFO's email again: can the domain vouch for it?`, ru: `Снова письмо финансового директора: может ли домен за него поручиться?` },
    body: {
      en: `<p>In stage 2, an "urgent" email from the CFO asked for a payment. Ordinary email lets anyone write any sender address. Three DNS-based checks let a domain say which mail is really its own:</p><ul><li><b>SPF</b>: a list of servers allowed to send mail for the domain.</li><li><b>DKIM</b>: the sending server signs each message, and the public key sits in DNS.</li><li><b>DMARC</b>: the domain's policy for mail that fails: report, quarantine or reject.</li></ul><p>They stop exact forgeries of your domain, not lookalikes such as examp1e.com. So the call-back rule from stage 2 still stands.</p>`,
      ru: `<p>На этапе 2 «срочное» письмо финансового директора требовало платежа. Обычная почта позволяет кому угодно написать любой адрес отправителя. Три проверки на основе DNS позволяют домену сказать, какая почта действительно его:</p><ul><li><b>SPF</b>: список серверов, которым можно отправлять почту от имени домена.</li><li><b>DKIM</b>: отправляющий сервер подписывает каждое письмо, а открытый ключ лежит в DNS.</li><li><b>DMARC</b>: политика домена для писем, не прошедших проверку: сообщить, в карантин или отклонить.</li></ul><p>Они останавливают точную подделку вашего домена, но не похожие имена вроде examp1e.com. Поэтому правило обратного звонка из этапа 2 в силе.</p>`,
    },
    take: { en: `SPF, DKIM and DMARC stop forged senders, not lookalike ones.`, ru: `SPF, DKIM и DMARC останавливают поддельных отправителей, но не похожих.` } },

  { id: 's05-044', kind: 'story', k: ['d4-c7'], lvl: 1,
    title: { en: `TJX: a store's Wi-Fi, tens of millions of cards`, ru: `TJX: Wi-Fi одного магазина и десятки миллионов карт` },
    body: {
      en: `<p>In 2007, TJX, the owner of T.J. Maxx and Marshalls, disclosed that attackers had stolen data on at least <b>45.7 million</b> payment cards; later estimates were higher. The intrusion began in 2005, reportedly from a car park near a Marshalls store in Minnesota.</p><p>The store's wireless network was protected with <b>WEP</b>, an encryption scheme already known to be broken. Once on the store network, the attackers worked their way to the central systems and kept collecting data for well over a year. Their leader, Albert Gonzalez, was sentenced to 20 years in 2010.</p>`,
      ru: `<p>В 2007 году TJX, владелец сетей T.J. Maxx и Marshalls, сообщил, что злоумышленники украли данные как минимум <b>45,7 млн</b> платёжных карт; более поздние оценки были выше. Взлом начался в 2005 году, по сообщениям, с парковки у магазина Marshalls в Миннесоте.</p><p>Беспроводная сеть магазина была защищена <b>WEP</b> — шифрованием, о взломанности которого уже было известно. Попав в сеть магазина, атакующие добрались до центральных систем и собирали данные больше года. Их лидер Альберт Гонсалес в 2010 году получил 20 лет.</p>`,
    },
    take: { en: `Wireless reaches the car park; its protection must assume someone is sitting there.`, ru: `Беспроводная сеть достаёт до парковки; её защита должна исходить из того, что там кто-то сидит.` } },

  { id: 's05-045', kind: 'vs', k: ['d4-c7'], lvl: 1,
    title: { en: `WEP vs WPA vs WPA2 vs WPA3`, ru: `WEP, WPA, WPA2 и WPA3` },
    body: {
      en: `<ul><li><b>WEP</b>: RC4 with a tiny 24-bit initialization vector. Broken; can be cracked in minutes.</li><li><b>WPA</b>: a quick fix (TKIP) that ran on old hardware. Deprecated.</li><li><b>WPA2</b>: AES encryption (CCMP). Still common. With a shared password, a captured handshake can be cracked offline if the password is weak.</li><li><b>WPA3</b>: replaces the shared-password handshake with <b>SAE</b>, which resists offline guessing, and adds forward secrecy.</li></ul><p>Choose WPA3 where devices support it, WPA2 with AES otherwise, and never WEP or TKIP.</p>`,
      ru: `<ul><li><b>WEP</b>: RC4 с крошечным 24-битным вектором инициализации. Сломан, взламывается за минуты.</li><li><b>WPA</b>: быстрая заплатка (TKIP) для старого оборудования. Устарела.</li><li><b>WPA2</b>: шифрование AES (CCMP). Всё ещё распространён. С общим паролем перехваченное рукопожатие можно взломать офлайн, если пароль слабый.</li><li><b>WPA3</b>: заменяет рукопожатие по общему паролю на <b>SAE</b>, устойчивое к офлайн-подбору, и добавляет прямую секретность.</li></ul><p>Выбирайте WPA3, где устройства поддерживают, иначе WPA2 с AES, и никогда — WEP или TKIP.</p>`,
    },
    take: { en: `WPA3 if you can, WPA2-AES if you must, WEP never.`, ru: `WPA3 — если можно, WPA2-AES — если нужно, WEP — никогда.` } },

  { id: 's05-046', kind: 'idea', k: ['d4-c7', 'd5-c7'], lvl: 2,
    title: { en: `One Wi-Fi password for everyone, or a login each?`, ru: `Один пароль Wi-Fi на всех или вход у каждого?` },
    body: {
      en: `<p>Wi-Fi comes in two modes:</p><ul><li><b>Personal</b> (PSK): one pre-shared password for everyone. Fine at home. In an office, every employee, ex-employee and visitor who ever got the password can join, and changing it means updating every device.</li><li><b>Enterprise</b> (802.1X): each person logs in with their own account or certificate, checked by a central server. Leavers lose Wi-Fi when their account is disabled, and the logs show who connected.</li></ul><p>Notice the stage 4 lesson again: a shared secret means no accountability.</p>`,
      ru: `<p>Wi-Fi бывает в двух режимах:</p><ul><li><b>Personal</b> (PSK): один общий пароль для всех. Дома нормально. В офисе подключиться может каждый сотрудник, бывший сотрудник и гость, когда-либо узнавший пароль, а смена пароля означает перенастройку всех устройств.</li><li><b>Enterprise</b> (802.1X): каждый входит со своей учёткой или сертификатом, которые проверяет центральный сервер. Уволившийся теряет Wi-Fi, когда отключают его учётку, а журналы показывают, кто подключался.</li></ul><p>Снова урок этапа 4: общий секрет — нет подотчётности.</p>`,
    },
    take: { en: `In an office, Wi-Fi should know who you are, not just what the password is.`, ru: `В офисе Wi-Fi должен знать, кто вы, а не только какой пароль.` } },

  { id: 's05-047', kind: 'picture', k: ['d4-c7', 'd5-c7', 'd4-c4'], lvl: 2,
    title: { en: `802.1X: three roles at the door`, ru: `802.1X: три роли у двери` },
    body: {
      en: `<p>The same scheme works for Wi-Fi and for wired switch ports. The access point or switch doesn't decide anything itself: it holds the door shut until the authentication server says yes.</p>`,
      ru: `<p>Та же схема работает для Wi-Fi и для портов коммутатора. Точка доступа или коммутатор сами ничего не решают: они держат дверь закрытой, пока сервер аутентификации не скажет «да».</p>`,
    },
    dg: { title: { en: `Supplicant, authenticator, authentication server`, ru: `Запрашивающий, аутентификатор, сервер аутентификации` }, h: 270,
      nodes: [
        ['s', 110, 60, { en: 'Laptop', ru: 'Ноутбук' }, { en: 'supplicant', ru: 'запрашивающий' }, '💻', 'dim', 150],
        ['a', 380, 150, { en: 'Access point / switch', ru: 'Точка доступа / коммутатор' }, { en: 'authenticator', ru: 'аутентификатор' }, '📶', 'key', 230],
        ['r', 650, 60, { en: 'RADIUS server', ru: 'Сервер RADIUS' }, { en: 'authentication server', ru: 'сервер аутентификации' }, '🛂', 'ok', 190],
        ['d', 650, 230, { en: 'Directory', ru: 'Каталог' }, { en: 'accounts, groups', ru: 'учётки, группы' }, '📇', 'ok', 170],
        ['n', 110, 230, { en: 'Network', ru: 'Сеть' }, { en: 'the right VLAN', ru: 'нужный VLAN' }, '🌐', 'ok', 150],
      ],
      edges: [
        ['s', 'a', { en: '1. credentials (EAP)', ru: '1. учётные данные (EAP)' }, null, -20, -12],
        ['a', 'r', { en: '2. relays', ru: '2. передаёт' }, null, 20, -12],
        ['r', 'd', { en: 'checks', ru: 'проверяет' }, 'dash'],
        ['a', 'n', { en: '3. port opens', ru: '3. порт открыт' }, 'ok', 10, 8],
      ] },
    take: { en: `The access point holds the door; the RADIUS server decides who walks through.`, ru: `Точка доступа держит дверь, а кто войдёт, решает сервер RADIUS.` } },

  { id: 's05-048', kind: 'back', back: 's04-034', k: ['d5-c7', 'd4-c7'], lvl: 2,
    title: { en: `The directory again, now behind the Wi-Fi`, ru: `Снова каталог, теперь за Wi-Fi` },
    body: {
      en: `<p>In stage 4, the directory became the single place where accounts live, so one switch could end a leaver's access to every app. With 802.1X, the network joins that list: the RADIUS server asks the same directory.</p><p>Disable the account, and the laptop loses Wi-Fi, the wired port and the VPN at the same moment. Group membership can also decide <b>which</b> network you land on: staff VLAN, contractor VLAN or none.</p><p>One identity, checked at the network door as well as at the application door.</p>`,
      ru: `<p>На этапе 4 каталог стал единым местом, где живут учётки, и один рубильник отключал уволившемуся все приложения. С 802.1X в этот список входит и сеть: сервер RADIUS спрашивает тот же каталог.</p><p>Отключите учётку — и ноутбук одновременно теряет Wi-Fi, проводной порт и VPN. Членство в группах может решать и то, <b>в какую</b> сеть вы попадёте: VLAN сотрудников, подрядчиков или никакую.</p><p>Одна идентичность, проверяемая и у двери сети, и у двери приложения.</p>`,
    },
    take: { en: `With 802.1X, disabling an account also unplugs its network access.`, ru: `С 802.1X отключение учётки заодно отключает её от сети.` } },

  { id: 's05-049', kind: 'idea', k: ['d4-c7'], lvl: 2,
    title: { en: `Attacks on Wi-Fi`, ru: `Атаки на Wi-Fi` },
    body: {
      en: `<ul><li><b>Rogue access point</b>: an unapproved access point plugged into the office network, by an employee who wanted better signal or by an attacker. It's a hole in the wall.</li><li><b>Evil twin</b>: a fake access point with the same name as a real one. Devices connect, and the attacker sits in the middle.</li><li><b>Deauthentication</b>: forged "disconnect" messages knock devices off, so they reconnect, maybe to the twin. Protected management frames (required in WPA3) block this.</li><li><b>Jamming</b>: radio noise that stops everything.</li></ul><p>Hiding the network name and filtering MAC addresses are weak: both are easy to see and to fake.</p>`,
      ru: `<ul><li><b>Несанкционированная точка доступа</b> (rogue AP): неучтённая точка, подключённая к офисной сети, — сотрудником, которому не хватало сигнала, или атакующим. Это дыра в стене.</li><li><b>Злой двойник</b> (evil twin): поддельная точка с тем же именем, что и настоящая. Устройства подключаются, а атакующий оказывается посередине.</li><li><b>Деаутентификация</b>: поддельные сообщения «отключиться» выбивают устройства, и они переподключаются, возможно, к двойнику. Защищённые служебные кадры (обязательны в WPA3) это блокируют.</li><li><b>Глушение</b>: радиошум, который останавливает всё.</li></ul><p>Скрытое имя сети и фильтрация MAC-адресов — слабые меры: оба легко увидеть и подделать.</p>`,
    },
    take: { en: `On radio, anyone can pretend to be your network; make devices check before they trust.`, ru: `В эфире кто угодно может притвориться вашей сетью; пусть устройства проверяют, прежде чем доверять.` } },

  { id: 's05-050', kind: 'think', k: ['d4-c7', 'd4-c9'], lvl: 2,
    title: { en: `"Airport_Free_WiFi"`, ru: `«Airport_Free_WiFi»` },
    body: {
      en: `<p>A sales manager, waiting for a flight, connects her company laptop to "Airport_Free_WiFi". The browser shows a certificate warning on the company's webmail. She clicks "continue anyway" because the meeting starts in five minutes.</p><p>Back in the office, she mentions it. What happened, probably, and what should the company change?</p>`,
      ru: `<p>Менеджер по продажам в ожидании рейса подключает рабочий ноутбук к «Airport_Free_WiFi». Браузер показывает предупреждение о сертификате на корпоративной почте. Она нажимает «всё равно продолжить»: встреча через пять минут.</p><p>Вернувшись в офис, она упоминает об этом. Что, вероятно, произошло и что компании стоит изменить?</p>`,
    },
    reveal: {
      en: `<p><b>Likely an evil twin doing a man-in-the-middle</b>: the warning was TLS doing its job, and clicking through gave her password away. Treat it as an incident: reset her password, end her sessions, check the mailbox for new rules or logins.</p><p>Then fix it so the next person isn't in the same spot: an <b>always-on VPN</b> on company laptops, phishing-resistant MFA, and training that a certificate warning on a known site means "stop", not "continue". She reported it, so thank her.</p>`,
      ru: `<p><b>Скорее всего, злой двойник и атака «человек посередине»</b>: предупреждение было TLS, делающим свою работу, а клик «продолжить» отдал пароль. Отнеситесь к этому как к инциденту: сбросьте пароль, завершите её сессии, проверьте ящик на новые правила и входы.</p><p>Затем исправьте так, чтобы следующий человек не оказался в том же положении: <b>постоянно включённый VPN</b> на рабочих ноутбуках, устойчивая к фишингу MFA и обучение: предупреждение о сертификате на знакомом сайте значит «стоп», а не «продолжить». Она сообщила — поблагодарите её.</p>`,
    },
    take: { en: `A certificate warning on a familiar site is an alarm; clicking through switches it off.`, ru: `Предупреждение о сертификате на знакомом сайте — тревога; клик «продолжить» её выключает.` } },

  { id: 's05-051', kind: 'idea', k: ['d4-c7'], lvl: 2,
    title: { en: `Bluetooth, NFC and RFID: short range, real risk`, ru: `Bluetooth, NFC и RFID: малая дальность, настоящий риск` },
    body: {
      en: `<p>Short-range radio feels safe because the attacker must be close. In a train, a café or a lobby, they are.</p><ul><li><b>Bluejacking</b>: unsolicited messages to nearby phones. Annoying, mostly harmless.</li><li><b>Bluesnarfing</b>: stealing data (contacts, files) through a Bluetooth weakness.</li><li><b>Bluebugging</b>: taking control of the device: calls, messages, the microphone.</li><li><b>RFID and NFC</b>: many older access badges can be read from a short distance and copied.</li></ul><p>Basics: turn Bluetooth discovery off, patch devices, and use badges that need a cryptographic challenge rather than a fixed number.</p>`,
      ru: `<p>Короткое радио кажется безопасным: атакующему нужно быть рядом. В поезде, кафе или вестибюле он рядом.</p><ul><li><b>Bluejacking</b>: непрошеные сообщения на соседние телефоны. Раздражает, в основном безвредно.</li><li><b>Bluesnarfing</b>: кража данных (контакты, файлы) через уязвимость Bluetooth.</li><li><b>Bluebugging</b>: захват управления устройством: звонки, сообщения, микрофон.</li><li><b>RFID и NFC</b>: многие старые пропуска можно прочитать с небольшого расстояния и скопировать.</li></ul><p>Основы: выключить видимость Bluetooth, обновлять устройства и использовать пропуска с криптографической проверкой, а не с постоянным номером.</p>`,
    },
    take: { en: `Jacking annoys, snarfing steals, bugging controls.`, ru: `Jacking раздражает, snarfing крадёт, bugging управляет.` } },

  { id: 's05-052', kind: 'idea', k: ['d4-c4', 'd4-c9'], lvl: 2,
    title: { en: `NAC: checking the device, not only the person`, ru: `NAC: проверка устройства, а не только человека` },
    body: {
      en: `<p>802.1X checks who is connecting. <b>Network access control</b> (NAC) can also check <b>what</b> is connecting: is this a company device, is its disk encrypted, is the antivirus running, are patches recent?</p><ul><li><b>Pre-admission</b>: check before the device gets on the network. A failing laptop lands in a quarantine VLAN with access only to the update servers.</li><li><b>Post-admission</b>: keep checking after it's on, and act if something changes.</li></ul><p>NAC can work with an installed agent or agentless, by scanning the device from the network.</p>`,
      ru: `<p>802.1X проверяет, кто подключается. <b>Контроль сетевого доступа</b> (NAC) может проверить ещё и <b>что</b> подключается: корпоративное ли это устройство, зашифрован ли диск, работает ли антивирус, свежие ли обновления?</p><ul><li><b>До допуска</b> (pre-admission): проверка до входа в сеть. Не прошедший ноутбук попадает в карантинный VLAN с доступом только к серверам обновлений.</li><li><b>После допуска</b> (post-admission): проверять и дальше и реагировать, если что-то изменилось.</li></ul><p>NAC работает с установленным агентом или без него, сканируя устройство по сети.</p>`,
    },
    take: { en: `A valid user on an infected laptop is still an infected laptop.`, ru: `Законный пользователь на заражённом ноутбуке — всё равно заражённый ноутбук.` } },

  { id: 's05-053', kind: 'vs', k: ['d4-c7', 'd5-c7'], lvl: 2,
    title: { en: `EAP-TLS vs PEAP vs LEAP`, ru: `EAP-TLS, PEAP и LEAP` },
    body: {
      en: `<p><b>EAP</b> is a framework: it carries many different login methods inside 802.1X. The ones to know:</p><ul><li><b>EAP-TLS</b>: certificates on both sides, the client and the server. No password to phish. The strongest, but each device needs its own certificate.</li><li><b>PEAP</b> and <b>EAP-TTLS</b>: the server shows a certificate and builds a TLS tunnel, then the user logs in with a password inside it. Safe only if devices really check that server certificate.</li><li><b>LEAP</b> (an old Cisco method) and <b>EAP-MD5</b>: weak, avoid.</li></ul>`,
      ru: `<p><b>EAP</b> — это каркас: он переносит внутри 802.1X множество разных способов входа. Важно знать:</p><ul><li><b>EAP-TLS</b>: сертификаты с обеих сторон, у клиента и у сервера. Нет пароля, который можно выманить. Самый сильный, но каждому устройству нужен свой сертификат.</li><li><b>PEAP</b> и <b>EAP-TTLS</b>: сервер предъявляет сертификат и строит TLS-туннель, а внутри пользователь входит с паролем. Безопасно, только если устройства действительно проверяют сертификат сервера.</li><li><b>LEAP</b> (старый метод Cisco) и <b>EAP-MD5</b>: слабые, избегать.</li></ul>`,
    },
    take: { en: `Certificates on both ends beat a password in a tunnel.`, ru: `Сертификаты с обеих сторон лучше пароля в туннеле.` } },

  { id: 's05-054', kind: 'idea', k: ['d4-c9'], lvl: 1,
    title: { en: `VPNs: a private corridor across a public network`, ru: `VPN: частный коридор через общую сеть` },
    body: {
      en: `<p>A <b>VPN</b> (virtual private network) builds an encrypted tunnel across the internet, so traffic inside it can't be read or changed on the way.</p><ul><li><b>Site-to-site</b>: links two offices, or an office and a cloud network, gateway to gateway. Usually IPsec in tunnel mode. Users don't notice it.</li><li><b>Remote access</b>: links one person's device to the company network. Either an IPsec client or a <b>TLS VPN</b>, which can work through a browser.</li></ul><p>Old protocols to recognize and avoid: <b>PPTP</b> (broken) and <b>L2TP</b> on its own, which doesn't encrypt and is normally paired with IPsec.</p>`,
      ru: `<p><b>VPN</b> (виртуальная частная сеть) строит через интернет зашифрованный туннель, и трафик внутри нельзя прочитать или изменить по дороге.</p><ul><li><b>Site-to-site</b>: соединяет два офиса или офис и облачную сеть, шлюз со шлюзом. Обычно IPsec в туннельном режиме. Пользователи его не замечают.</li><li><b>Удалённый доступ</b>: соединяет устройство одного человека с сетью компании. Либо клиент IPsec, либо <b>TLS VPN</b>, который может работать через браузер.</li></ul><p>Старые протоколы, которые надо узнавать и избегать: <b>PPTP</b> (взломан) и <b>L2TP</b> сам по себе — он не шифрует и обычно идёт в паре с IPsec.</p>`,
    },
    take: { en: `A VPN protects the road, not the traveller: the device and the login still matter.`, ru: `VPN защищает дорогу, а не путника: устройство и вход по-прежнему важны.` } },

  { id: 's05-055', kind: 'picture', k: ['d4-c9'], lvl: 2,
    title: { en: `Full tunnel vs split tunnel`, ru: `Полный и раздельный туннель` },
    body: {
      en: `<p>With a <b>full tunnel</b>, all of the laptop's traffic goes through the company and its filters. With a <b>split tunnel</b>, only company traffic does; everything else goes straight to the internet. Split is faster and cheaper, but the laptop is then on two networks at once, and only one of them is watched.</p>`,
      ru: `<p>При <b>полном туннеле</b> весь трафик ноутбука идёт через компанию и её фильтры. При <b>раздельном</b> (split) — только корпоративный, а остальное идёт напрямую в интернет. Раздельный быстрее и дешевле, но ноутбук тогда сразу в двух сетях, и наблюдают только за одной.</p>`,
    },
    dg: { title: { en: `Where the traffic goes`, ru: `Куда идёт трафик` }, h: 300,
      zones: [[20, 20, 720, 120, { en: 'Full tunnel', ru: 'Полный туннель' }, 'trust'], [20, 160, 720, 125, { en: 'Split tunnel', ru: 'Раздельный туннель' }, 'untrust']],
      nodes: [
        ['l1', 100, 85, { en: 'Laptop', ru: 'Ноутбук' }, null, '💻', 'ok', 120],
        ['c1', 370, 85, { en: 'Company', ru: 'Компания' }, { en: 'filters, logging', ru: 'фильтры, журналы' }, '🏢', 'key', 170],
        ['i1', 640, 85, { en: 'Internet', ru: 'Интернет' }, null, '🌍', 'dim', 130],
        ['l2', 100, 225, { en: 'Laptop', ru: 'Ноутбук' }, null, '💻', 'dim', 120],
        ['c2', 370, 195, { en: 'Company', ru: 'Компания' }, null, '🏢', 'key', 130],
        ['i2', 640, 250, { en: 'Internet', ru: 'Интернет' }, { en: 'unfiltered', ru: 'без фильтров' }, '🌍', 'bad', 150],
      ],
      edges: [
        ['l1', 'c1', { en: 'everything', ru: 'всё' }, 'ok'], ['c1', 'i1', null, 'ok'],
        ['l2', 'c2', { en: 'work apps', ru: 'рабочее' }, 'ok', 0, -12], ['l2', 'i2', { en: 'the rest', ru: 'остальное' }, 'bad', 0, 12],
      ] },
    take: { en: `Split tunneling trades visibility for speed; make that a decision, not a default.`, ru: `Раздельный туннель меняет видимость на скорость; пусть это будет решением, а не настройкой по умолчанию.` } },

  { id: 's05-056', kind: 'back', back: 's02-016', k: ['d4-c9', 'd1-c13'], lvl: 2,
    title: { en: `Vendors with access, now on the network`, ru: `Подрядчики с доступом, теперь в сети` },
    body: {
      en: `<p>In stage 2: vendors are people with access too. On the network, that access needs its own design:</p><ul><li>An agreement first: an <b>interconnection security agreement</b> (ISA) or contract terms saying what may connect, how, and who is responsible.</li><li>A dedicated entry point: a <b>jump host</b> or vendor portal with MFA, not a VPN into the whole network.</li><li>Reach only the systems they maintain, in their own segment.</li><li><b>Time-bound</b> access, switched on for the job and off afterwards, with sessions recorded.</li></ul><p>Target's heating vendor needed one portal, not a path to the checkouts.</p>`,
      ru: `<p>На этапе 2: подрядчики — тоже люди с доступом. В сети этому доступу нужна своя конструкция:</p><ul><li>Сначала договорённость: <b>соглашение о безопасности соединения</b> (ISA) или условия договора — что может подключаться, как и кто отвечает.</li><li>Отдельная точка входа: <b>jump-хост</b> или портал для подрядчиков с MFA, а не VPN во всю сеть.</li><li>Доступ только к обслуживаемым системам, в их отдельном сегменте.</li><li>Доступ <b>на время</b>: включается под работу и выключается после, сеансы записываются.</li></ul><p>Подрядчику Target по отоплению был нужен один портал, а не путь к кассам.</p>`,
    },
    take: { en: `Third-party access: agreed, narrow, temporary and recorded.`, ru: `Доступ третьих сторон: согласованный, узкий, временный и записанный.` } },

  { id: 's05-057', kind: 'vs', k: ['d4-c9'], lvl: 2,
    title: { en: `PAP vs CHAP vs EAP`, ru: `PAP, CHAP и EAP` },
    body: {
      en: `<p>Three ways a remote connection can check a login:</p><ul><li><b>PAP</b>: sends the username and password in cleartext. Never use it.</li><li><b>CHAP</b>: the server sends a random challenge; the client answers with a hash of the challenge and the password. The password itself never crosses the line, and the server can repeat the challenge during the session.</li><li><b>EAP</b>: not a method but a framework that carries other methods: certificates, tokens, passwords inside TLS.</li></ul><p>If an exam answer offers PAP, it's there to be rejected.</p>`,
      ru: `<p>Три способа проверить вход при удалённом подключении:</p><ul><li><b>PAP</b>: передаёт логин и пароль открытым текстом. Никогда не использовать.</li><li><b>CHAP</b>: сервер шлёт случайный вызов, клиент отвечает хешем вызова и пароля. Сам пароль не идёт по линии, а сервер может повторять вызов во время сеанса.</li><li><b>EAP</b>: не метод, а каркас для других методов: сертификатов, токенов, паролей внутри TLS.</li></ul><p>Если в ответах экзамена есть PAP, он там, чтобы его отвергли.</p>`,
    },
    take: { en: `PAP shows the password, CHAP proves it, EAP carries whatever proof you choose.`, ru: `PAP показывает пароль, CHAP доказывает его, EAP переносит любое выбранное доказательство.` } },

  { id: 's05-058', kind: 'think', k: ['d4-c9', 'd1-c3'], lvl: 2,
    title: { en: `"Just open RDP to my home PC"`, ru: `«Просто откройте RDP на мой домашний ПК»` },
    body: {
      en: `<p>The finance director needs to work on the accounting server this weekend. He asks IT to "open remote desktop to the server from the internet, just for the weekend. My password is strong." He is senior, and he's in a hurry.</p><p>What do you do?</p>`,
      ru: `<p>Финансовому директору нужно поработать на бухгалтерском сервере в выходные. Он просит IT «открыть удалённый рабочий стол к серверу из интернета, только на выходные. У меня сильный пароль». Он старший по должности и торопится.</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>Help him work, but don't expose RDP to the internet.</b> Internet-facing remote desktop is scanned within minutes and is one of the most common ways ransomware gets in. A strong password doesn't help against an unpatched RDP flaw, and "just for the weekend" rules tend to stay.</p><p>Offer the approved path: the company VPN with MFA, or a remote desktop gateway or virtual desktop behind MFA. If no such path exists, that's the real finding, and the policy should say how remote access is granted.</p>`,
      ru: `<p><b>Помогите ему работать, но не выставляйте RDP в интернет.</b> Доступный из интернета удалённый рабочий стол находят сканеры за минуты, и это один из самых частых входов шифровальщиков. Сильный пароль не спасёт от неисправленной уязвимости RDP, а правила «только на выходные» обычно остаются.</p><p>Предложите одобренный путь: корпоративный VPN с MFA или шлюз удалённых рабочих столов / виртуальный рабочий стол за MFA. Если такого пути нет, это и есть настоящий вывод, а политика должна описывать, как выдаётся удалённый доступ.</p>`,
    },
    take: { en: `Never put remote desktop straight on the internet; give people a safe road instead.`, ru: `Не выставляйте удалённый рабочий стол прямо в интернет; дайте людям безопасную дорогу.` } },

  { id: 's05-059', kind: 'vs', k: ['d4-c9', 'd5-c7'], lvl: 2,
    title: { en: `RADIUS vs TACACS+ vs Diameter`, ru: `RADIUS, TACACS+ и Diameter` },
    body: {
      en: `<p>Three central AAA servers (authentication, authorization, accounting):</p><ul><li><b>RADIUS</b>: the common choice for Wi-Fi, VPN and network access. Runs over UDP, <b>encrypts only the password</b>, and combines authentication and authorization in one step.</li><li><b>TACACS+</b>: from Cisco, runs over TCP port 49, <b>encrypts the whole message</b>, and keeps the three As separate, so it can authorize each command an admin types. Preferred for managing network devices.</li><li><b>Diameter</b>: RADIUS's successor, more reliable and extensible, used in 4G and 5G mobile networks.</li></ul>`,
      ru: `<p>Три центральных AAA-сервера (аутентификация, авторизация, учёт):</p><ul><li><b>RADIUS</b>: обычный выбор для Wi-Fi, VPN и доступа к сети. Работает по UDP, <b>шифрует только пароль</b> и объединяет аутентификацию и авторизацию в один шаг.</li><li><b>TACACS+</b>: от Cisco, работает по TCP, порт 49, <b>шифрует всё сообщение</b> и разделяет три A, поэтому может авторизовать каждую команду администратора. Предпочтителен для управления сетевыми устройствами.</li><li><b>Diameter</b>: преемник RADIUS, надёжнее и расширяемее, используется в мобильных сетях 4G и 5G.</li></ul>`,
    },
    take: { en: `RADIUS for users joining the network, TACACS+ for admins running it.`, ru: `RADIUS — для пользователей, входящих в сеть, TACACS+ — для админов, которые ею управляют.` } },

  { id: 's05-060', kind: 'idea', k: ['d4-c9', 'd4-c8'], lvl: 2,
    title: { en: `Calls and meetings are network traffic too`, ru: `Звонки и встречи — тоже сетевой трафик` },
    body: {
      en: `<p>Voice and video run over the same networks as everything else, with their own risks:</p><ul><li><b>Eavesdropping</b> on calls: use encrypted media (SRTP) and keep phones in their own VLAN.</li><li><b>Toll fraud</b>: attackers break into a company phone system (PBX) and make expensive calls at its cost, often at night or weekends.</li><li><b>Meeting hijacking</b>: in 2020, uninvited people joining video calls became common enough to get a name, "Zoom-bombing". Meeting passwords, waiting rooms and not posting links publicly fixed most of it.</li><li><b>Vishing</b> (stage 2) uses the phone network itself.</li></ul>`,
      ru: `<p>Голос и видео идут по тем же сетям, что и всё остальное, со своими рисками:</p><ul><li><b>Прослушивание</b> звонков: шифруйте медиа (SRTP) и держите телефоны в отдельном VLAN.</li><li><b>Телефонное мошенничество</b> (toll fraud): атакующие взламывают офисную АТС (PBX) и совершают дорогие звонки за её счёт, часто ночью или в выходные.</li><li><b>Захват встреч</b>: в 2020 году незваные гости на видеозвонках стали так обычны, что получили название «Zoom-bombing». Пароли встреч, залы ожидания и непубликуемые ссылки устранили большую часть проблемы.</li><li><b>Вишинг</b> (этап 2) использует саму телефонную сеть.</li></ul>`,
    },
    take: { en: `Treat the phone system and meeting tools as servers: patched, locked down, watched.`, ru: `Относитесь к АТС и сервисам встреч как к серверам: обновлены, закрыты, под наблюдением.` } },

  { id: 's05-061', kind: 'link', k: ['d4-c6', 'd4-c2', 'd1-c7'], lvl: 2,
    title: { en: `Dyn: how someone else's outage became yours`, ru: `Dyn: как чужая авария стала вашей` },
    body: {
      en: `<p>Back to the first card. Twitter and Netflix weren't attacked; their <b>DNS provider</b> was. Without DNS, browsers couldn't find their servers, so for users the sites were simply gone.</p><p>That chain ties stages together:</p><ul><li><b>Supply chain</b> (stage 1): a provider is part of your system.</li><li><b>Single point of failure</b>: one DNS provider for everything.</li><li><b>Continuity</b> (stage 12): after the attack, many companies added a second DNS provider and put content behind a CDN able to absorb floods.</li></ul><p>Ask of every dependency: if it disappears for a day, what do we lose?</p>`,
      ru: `<p>Вернёмся к первой карточке. Twitter и Netflix не атаковали — атаковали их <b>DNS-провайдера</b>. Без DNS браузеры не могли найти их серверы, и для пользователей сайты просто исчезли.</p><p>Эта цепочка связывает этапы:</p><ul><li><b>Цепочка поставок</b> (этап 1): провайдер — часть вашей системы.</li><li><b>Единая точка отказа</b>: один DNS-провайдер на всё.</li><li><b>Непрерывность</b> (этап 12): после атаки многие компании добавили второго DNS-провайдера и спрятали контент за CDN, способную поглощать потоки.</li></ul><p>Спрашивайте о каждой зависимости: если она пропадёт на день, что мы потеряем?</p>`,
    },
    take: { en: `A dependency you didn't list is a single point of failure you didn't plan for.`, ru: `Неучтённая зависимость — незапланированная единая точка отказа.` } },

  { id: 's05-062', kind: 'vs', k: ['d4-c6'], lvl: 2,
    title: { en: `Smurf, Fraggle, ping of death, teardrop, LAND`, ru: `Smurf, Fraggle, ping of death, teardrop, LAND` },
    body: {
      en: `<p>Old attacks, still on the exam. Each has a one-line signature:</p><ul><li><b>Smurf</b>: ICMP echo (ping) sent to a broadcast address with the victim's address as sender; every host replies to the victim. Fix: disable directed broadcasts.</li><li><b>Fraggle</b>: the same with UDP.</li><li><b>Ping of death</b>: an oversized ping (over 65,535 bytes after reassembly) crashes the receiver.</li><li><b>Teardrop</b>: overlapping fragments confuse reassembly.</li><li><b>LAND</b>: a packet whose source and destination are both the victim.</li></ul><p>The last three are fixed by patching the network stack.</p>`,
      ru: `<p>Старые атаки, которые всё ещё на экзамене. У каждой своя примета в одну строку:</p><ul><li><b>Smurf</b>: эхо-запрос ICMP (ping) на широковещательный адрес с адресом жертвы как отправителя; отвечают жертве все хосты. Защита: отключить направленную широковещательную рассылку.</li><li><b>Fraggle</b>: то же самое через UDP.</li><li><b>Ping of death</b>: слишком большой ping (больше 65 535 байт после сборки) роняет получателя.</li><li><b>Teardrop</b>: перекрывающиеся фрагменты сбивают сборку.</li><li><b>LAND</b>: пакет, у которого и отправитель, и получатель — жертва.</li></ul><p>Последние три лечатся обновлением сетевого стека.</p>`,
    },
    take: { en: `Smurf is ICMP, Fraggle is UDP; the malformed-packet attacks die with patching.`, ru: `Smurf — это ICMP, Fraggle — UDP; атаки кривыми пакетами лечатся обновлениями.` } },

  { id: 's05-063', kind: 'think', k: ['d4-c6', 'd7-c4'], lvl: 2,
    title: { en: `Two machines with one MAC address`, ru: `Две машины с одним MAC-адресом` },
    body: {
      en: `<p>Users on the third floor complain the network is slow. An engineer looks at a laptop's ARP table and notices that the router's IP address now points to the MAC address of a desktop PC in the marketing department. The desktop's user is on holiday.</p><p>The engineer wants to walk over and unplug it right away. What do you think?</p>`,
      ru: `<p>Пользователи третьего этажа жалуются на медленную сеть. Инженер смотрит ARP-таблицу ноутбука и видит, что IP-адрес роутера теперь указывает на MAC-адрес настольного ПК в отделе маркетинга. Его хозяин в отпуске.</p><p>Инженер хочет немедленно пойти и выдернуть кабель. Что вы думаете?</p>`,
    },
    reveal: {
      en: `<p>This looks like <b>ARP poisoning</b>: the desktop is posing as the router and seeing the floor's traffic, probably because it's compromised. That makes it an <b>incident</b>, so follow the incident process rather than improvising.</p><p>Containment is right, but do it so evidence survives: isolate the port at the switch (or move it to a quarantine VLAN) instead of pulling power, which would wipe memory. Then find out what it captured, change any passwords sent in cleartext, and turn on Dynamic ARP Inspection.</p>`,
      ru: `<p>Похоже на <b>отравление ARP</b>: ПК выдаёт себя за роутер и видит трафик этажа, вероятно, потому что скомпрометирован. Значит, это <b>инцидент</b>, и нужно действовать по процессу реагирования, а не импровизировать.</p><p>Сдерживание правильно, но так, чтобы сохранились доказательства: изолируйте порт на коммутаторе (или переведите в карантинный VLAN), а не выключайте питание — это сотрёт память. Затем выясните, что он перехватил, смените пароли, ходившие открытым текстом, и включите Dynamic ARP Inspection.</p>`,
    },
    take: { en: `Contain at the switch, not at the power plug: isolation keeps the evidence.`, ru: `Сдерживайте на коммутаторе, а не у розетки: изоляция сохраняет доказательства.` } },

  { id: 's05-064', kind: 'idea', k: ['d4-c2'], lvl: 2,
    title: { en: `IPv6: the network you might not be watching`, ru: `IPv6: сеть, за которой вы, возможно, не следите` },
    body: {
      en: `<p><b>IPv6</b> uses 128-bit addresses, enough for every device many times over. It has no broadcast, devices can configure their own addresses (SLAAC), and IPsec support is built into the standard, though using it is optional.</p><p>The security catch: most operating systems turn IPv6 on by default. A company that wrote all its firewall rules and monitoring for IPv4 may have a second, unwatched network running alongside, and IPv6 can also be <b>tunnelled</b> inside IPv4 past filters that don't look inside. Either secure IPv6 as carefully as IPv4, or disable it deliberately.</p>`,
      ru: `<p><b>IPv6</b> использует 128-битные адреса — их хватит на каждое устройство много раз. В нём нет широковещательной рассылки, устройства могут сами назначать себе адреса (SLAAC), а поддержка IPsec заложена в стандарт, хотя использовать его не обязательно.</p><p>Подвох для безопасности: большинство ОС включают IPv6 по умолчанию. Компания, написавшая все правила экранов и мониторинг под IPv4, может иметь рядом вторую, неохраняемую сеть, а IPv6 ещё и можно <b>туннелировать</b> внутри IPv4 мимо фильтров, которые не заглядывают внутрь. Либо защищайте IPv6 так же тщательно, как IPv4, либо осознанно отключайте.</p>`,
    },
    take: { en: `A protocol you didn't plan for is a network you don't monitor.`, ru: `Незапланированный протокол — сеть, за которой вы не следите.` } },

  { id: 's05-065', kind: 'back', back: 's05-001', k: ['d4-c6', 'd4-c4'], lvl: 2,
    title: { en: `Mirai again: if every network checked what it sent out`, ru: `Снова Mirai: если бы каждая сеть проверяла, что отправляет` },
    body: {
      en: `<p>Mirai's cameras scanned the internet and flooded Dyn from inside thousands of home and business networks. Almost none of those networks looked at what was <b>leaving</b> them.</p><p><b>Egress filtering</b> would have helped in two ways:</p><ul><li>A camera has no reason to start Telnet sessions to random addresses or send gigabits to a DNS provider. Blocking outbound traffic that devices don't need limits the damage.</li><li>Providers that drop packets with <b>spoofed source addresses</b> (a practice known as BCP 38) make reflection and amplification attacks much harder.</li></ul>`,
      ru: `<p>Камеры Mirai сканировали интернет и заваливали Dyn изнутри тысяч домашних и корпоративных сетей. Почти ни одна из этих сетей не смотрела, что из неё <b>выходит</b>.</p><p><b>Фильтрация исходящего трафика</b> (egress) помогла бы дважды:</p><ul><li>Камере незачем начинать Telnet-сессии к случайным адресам или слать гигабиты DNS-провайдеру. Блокировка ненужного устройствам исходящего трафика ограничивает ущерб.</li><li>Провайдеры, отбрасывающие пакеты с <b>поддельными адресами отправителя</b> (практика BCP 38), сильно затрудняют атаки с отражением и усилением.</li></ul>`,
    },
    take: { en: `Filter what leaves, so your network can't become someone else's weapon.`, ru: `Фильтруйте исходящее, чтобы ваша сеть не стала чужим оружием.` } },

  { id: 's05-066', kind: 'idea', k: ['d4-c4'], lvl: 2,
    title: { en: `The endpoint: the last layer`, ru: `Конечная точка: последний слой` },
    body: {
      en: `<p>Laptops leave the office, phones join hotel Wi-Fi, and servers in the cloud may sit behind no company firewall at all. So each device must defend itself too:</p><ul><li>A <b>host firewall</b>, default deny for incoming connections.</li><li><b>EDR</b> (endpoint detection and response): watches behaviour on the device and can isolate it remotely.</li><li><b>Application allow-listing</b> on fixed-purpose machines such as tills and kiosks.</li><li>Patching, disk encryption, and no admin rights for daily work.</li></ul><p>When everything else fails, this layer is what's left between the attacker and the data.</p>`,
      ru: `<p>Ноутбуки уезжают из офиса, телефоны подключаются к гостиничному Wi-Fi, а облачные серверы могут вообще не стоять за экраном компании. Поэтому каждое устройство тоже должно защищать себя:</p><ul><li><b>Хостовый межсетевой экран</b>, запрет входящих соединений по умолчанию.</li><li><b>EDR</b> (обнаружение и реагирование на конечных точках): следит за поведением на устройстве и может удалённо его изолировать.</li><li><b>Белые списки приложений</b> на машинах с одной задачей, вроде касс и киосков.</li><li>Обновления, шифрование диска и никаких прав админа для повседневной работы.</li></ul><p>Когда всё остальное отказало, между атакующим и данными остаётся этот слой.</p>`,
    },
    take: { en: `Every device should be able to survive on a hostile network by itself.`, ru: `Каждое устройство должно уметь выжить во враждебной сети само.` } },

  { id: 's05-067', kind: 'picture', k: ['d4-c9', 'd4-c7', 'd4-c4', 'd4-c8', 'd4-c5', 'd3-c1'], lvl: 2,
    title: { en: `One request from a home office to the database`, ru: `Один запрос из домашнего офиса к базе данных` },
    body: {
      en: `<p>Everything in this stage, on one path. Each hop has its own control, and each control covers a failure of the one before it.</p>`,
      ru: `<p>Весь этап на одном пути. У каждого перехода своя мера, и каждая прикрывает отказ предыдущей.</p>`,
    },
    dg: { title: { en: `Layers along the path`, ru: `Слои вдоль пути` }, h: 270,
      nodes: [
        ['l', 95, 70, { en: 'Laptop', ru: 'Ноутбук' }, { en: 'EDR, host firewall', ru: 'EDR, хостовый МЭ' }, '💻', 'ok', 160],
        ['w', 285, 70, { en: 'Home Wi-Fi', ru: 'Домашний Wi-Fi' }, { en: 'WPA3', ru: 'WPA3' }, '📶', 'dim', 160],
        ['v', 475, 70, { en: 'VPN', ru: 'VPN' }, { en: 'MFA, NAC check', ru: 'MFA, проверка NAC' }, '🔐', 'key', 160],
        ['f', 665, 70, { en: 'Firewall', ru: 'Межсетевой экран' }, { en: 'default deny', ru: 'запрет по умолч.' }, '🧱', 'key', 160],
        ['s', 665, 200, { en: 'App segment', ru: 'Сегмент прилож.' }, { en: 'micro-segmented', ru: 'микросегменты' }, '🧩', 'ok', 160],
        ['d', 380, 200, { en: 'Database', ru: 'База данных' }, { en: 'TLS, one port', ru: 'TLS, один порт' }, '🗄', 'ok', 160],
      ],
      edges: [['l', 'w', null], ['w', 'v', null], ['v', 'f', null], ['f', 's', null], ['s', 'd', null]] },
    take: { en: `Defense in depth on a network: every hop gets its own check.`, ru: `Эшелонированная защита в сети: у каждого перехода своя проверка.` } },

  { id: 's05-068', kind: 'think', k: ['d4-c9', 'd4-c7', 'd1-c9'], lvl: 2,
    title: { en: `Four problems, one week: which first?`, ru: `Четыре проблемы, одна неделя: что первым?` },
    body: {
      en: `<p>You join a 150-person distribution company as its first security lead. In week one you find:</p><ol><li>Remote desktop on the file server is open to the internet.</li><li>The warehouse Wi-Fi uses WEP.</li><li>The network is flat: office, warehouse scanners and servers in one segment.</li><li>Switches are managed over Telnet.</li></ol><p>You can't fix everything at once. Where do you start, and why?</p>`,
      ru: `<p>Вы пришли первым руководителем безопасности в дистрибьюторскую компанию на 150 человек. За первую неделю нашли:</p><ol><li>Удалённый рабочий стол файлового сервера открыт в интернет.</li><li>Wi-Fi склада на WEP.</li><li>Сеть плоская: офис, складские сканеры и серверы в одном сегменте.</li><li>Коммутаторами управляют по Telnet.</li></ol><p>Всё сразу не исправить. С чего начнёте и почему?</p>`,
    },
    reveal: {
      en: `<p><b>Rank by risk: who can reach it, and how easily.</b></p><ol><li><b>Exposed RDP</b> first: anyone on the internet can try it, and it's a top ransomware entry. Close it today and give a VPN with MFA instead.</li><li><b>WEP</b> next: anyone in the car park can join, as at TJX.</li><li><b>Segmentation</b>: bigger work, so plan it, starting with servers.</li><li><b>Telnet</b>: real, but reachable only from inside; fixing 3 shrinks it.</li></ol><p>Tell management what you found, the order and why: they own the risk.</p>`,
      ru: `<p><b>Ранжируйте по риску: кто может добраться и насколько легко.</b></p><ol><li><b>Открытый RDP</b> первым: попробовать может любой в интернете, это один из главных входов шифровальщиков. Закройте сегодня, взамен — VPN с MFA.</li><li><b>WEP</b> следом: подключиться может любой на парковке, как в TJX.</li><li><b>Сегментация</b>: большая работа, спланируйте её, начиная с серверов.</li><li><b>Telnet</b>: реальный риск, но доступен только изнутри; исправление 3 его сужает.</li></ol><p>Сообщите руководству, что нашли, в каком порядке и почему: риск принадлежит им.</p>`,
    },
    take: { en: `Fix first what the most people can reach most easily.`, ru: `Сначала исправляйте то, до чего легче всего добраться большинству.` } },

  { id: 's05-069', kind: 'recap', lvl: 1,
    title: { en: `Stage 5 in seven lines`, ru: `Этап 5 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s05-004', { en: `Seven OSI layers: a control only protects the layers it can see.`, ru: `Семь уровней OSI: защита охраняет только видимые ей уровни.` }],
      ['s05-014', { en: `DDoS floods the link, so it's stopped upstream, and planned for in advance.`, ru: `DDoS забивает канал, поэтому его останавливают выше по течению и планируют заранее.` }],
      ['s05-021', { en: `Firewalls: default deny, first match wins, filter what leaves too.`, ru: `Экраны: запрет по умолчанию, побеждает первое совпадение, фильтруйте и исходящее.` }],
      ['s05-029', { en: `Segment the network so one stolen login lands in one small room.`, ru: `Сегментируйте сеть, чтобы один украденный логин попадал в одну маленькую комнату.` }],
      ['s05-037', { en: `You can't guard the road: encrypt data in transit (TLS, IPsec ESP, SSH).`, ru: `Дорогу не уберечь: шифруйте данные в движении (TLS, IPsec ESP, SSH).` }],
      ['s05-046', { en: `Office Wi-Fi: WPA3 or WPA2-AES, with 802.1X logins, never WEP.`, ru: `Офисный Wi-Fi: WPA3 или WPA2-AES со входом через 802.1X, никогда не WEP.` }],
      ['s05-058', { en: `Remote access goes through a VPN or gateway with MFA, never raw RDP.`, ru: `Удалённый доступ — через VPN или шлюз с MFA, никогда не голый RDP.` }],
    ],
    take: { en: `Next: the mathematics underneath all this: how encryption, hashes and certificates work.`, ru: `Дальше — математика под всем этим: как работают шифрование, хеши и сертификаты.` } },
] });
