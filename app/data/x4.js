'use strict';
// Beginner layer for Domain 4: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(4, {
  'd4-c1': {
    plain: {
      en: `<p>The OSI model splits network communication into 7 layers, like sending a parcel: you write the letter (application), choose the language (presentation), keep the conversation going (session), pick tracked or untracked delivery (transport), write the street address (network), hand it to the local courier who knows the next hop (data link), and the truck drives on the road (physical). Each layer only talks to the one above and below it.</p>`,
      ru: `<p>Модель OSI делит сетевое общение на 7 уровней, как отправку посылки: вы пишете письмо (прикладной), выбираете язык (представления), поддерживаете разговор (сеансовый), выбираете доставку с отслеживанием или без (транспортный), пишете почтовый адрес (сетевой), отдаёте местному курьеру, который знает следующий пункт (канальный), и грузовик едет по дороге (физический). Каждый уровень общается только с соседними.</p>`,
    },
    ex: {
      en: `<p>"The website is down" can be any layer. A cut cable is layer 1. A wrong VLAN on a switch port is layer 2. A bad route or firewall ACL is layer 3. A blocked port 443 is layer 4. An expired certificate is layers 5–6. A crashed web app is layer 7. Network engineers troubleshoot from the bottom up; security people use the layers to say exactly where a control works.</p>`,
      ru: `<p>«Сайт не работает» может значить любой уровень. Перерезанный кабель — уровень 1. Неверный VLAN на порту коммутатора — уровень 2. Ошибочный маршрут или ACL межсетевого экрана — уровень 3. Заблокированный порт 443 — уровень 4. Просроченный сертификат — уровни 5–6. Упавшее веб-приложение — уровень 7. Сетевики ищут проблему снизу вверх; безопасники по уровням точно указывают, где работает мера защиты.</p>`,
    },
    dg: {
      title: { en: 'OSI layers with typical devices and protocols', ru: 'Уровни OSI с типичными устройствами и протоколами' }, h: 300,
      nodes: [
        ['l7', 150, 30, { en: '7 Application', ru: '7 Прикладной' }, null, null, 'key', 200], ['d7', 520, 30, 'HTTP, DNS, SMTP · WAF, proxy', null, null, 'dim', 330],
        ['l6', 150, 70, { en: '6 Presentation', ru: '6 Представления' }, null, null, 'key', 200], ['d6', 520, 70, { en: 'encoding, TLS encryption', ru: 'кодирование, шифрование TLS' }, null, null, 'dim', 330],
        ['l5', 150, 110, { en: '5 Session', ru: '5 Сеансовый' }, null, null, 'key', 200], ['d5', 520, 110, { en: 'session setup, RPC, NetBIOS', ru: 'установка сеанса, RPC, NetBIOS' }, null, null, 'dim', 330],
        ['l4', 150, 150, { en: '4 Transport', ru: '4 Транспортный' }, null, null, 'key', 200], ['d4', 520, 150, { en: 'TCP, UDP · ports · stateful FW', ru: 'TCP, UDP · порты · stateful МЭ' }, null, null, 'dim', 330],
        ['l3', 150, 190, { en: '3 Network', ru: '3 Сетевой' }, null, null, 'key', 200], ['d3', 520, 190, { en: 'IP, ICMP, IPsec · router', ru: 'IP, ICMP, IPsec · маршрутизатор' }, null, null, 'dim', 330],
        ['l2', 150, 230, { en: '2 Data link', ru: '2 Канальный' }, null, null, 'key', 200], ['d2', 520, 230, { en: 'MAC, Ethernet, Wi-Fi · switch', ru: 'MAC, Ethernet, Wi-Fi · коммутатор' }, null, null, 'dim', 330],
        ['l1', 150, 270, { en: '1 Physical', ru: '1 Физический' }, null, null, 'key', 200], ['d1', 520, 270, { en: 'cables, radio · hub, repeater', ru: 'кабели, радио · хаб, репитер' }, null, null, 'dim', 330],
      ],
      edges: [['l7', 'd7', null, 'dash'], ['l6', 'd6', null, 'dash'], ['l5', 'd5', null, 'dash'], ['l4', 'd4', null, 'dash'], ['l3', 'd3', null, 'dash'], ['l2', 'd2', null, 'dash'], ['l1', 'd1', null, 'dash']],
      note: { en: 'The TCP/IP model merges 5–7 into Application and 1–2 into Link (Network Access).', ru: 'Модель TCP/IP объединяет 5–7 в прикладной уровень, а 1–2 — в уровень сетевого доступа.' },
    },
  },
  'd4-c2': {
    plain: {
      en: `<p>TCP/IP is the internet's postal system. <b>IP</b> puts an address on each packet. <b>TCP</b> is registered mail: numbered, confirmed, resent if lost. <b>UDP</b> is a postcard: fast, no confirmation, fine for video calls and DNS. <b>Ports</b> say which program on the computer gets the packet: 443 for HTTPS, 22 for SSH, 53 for DNS. IPv4 addresses ran out, so IPv6 uses far longer addresses.</p>`,
      ru: `<p>TCP/IP — почтовая система интернета. <b>IP</b> ставит адрес на каждый пакет. <b>TCP</b> — заказное письмо: пронумеровано, подтверждено, при потере отправляется заново. <b>UDP</b> — открытка: быстро, без подтверждения, годится для видеозвонков и DNS. <b>Порты</b> говорят, какой программе на компьютере отдать пакет: 443 для HTTPS, 22 для SSH, 53 для DNS. Адреса IPv4 закончились, поэтому IPv6 использует гораздо более длинные адреса.</p>`,
    },
    ex: {
      en: `<p>A port scan of a company's public IP shows 443 (web) open, as expected, but also 3389 (RDP, Windows remote desktop). Exposed RDP is one of the most common ransomware entry points: attackers try password lists against it around the clock. Closing it on the firewall and requiring VPN plus MFA removes that path.</p>`,
      ru: `<p>Сканирование портов публичного IP компании показывает открытый 443 (веб), как и ожидалось, но также 3389 (RDP, удалённый рабочий стол Windows). Открытый в интернет RDP — один из самых частых входов для шифровальщиков: атакующие круглосуточно перебирают по нему пароли. Закрыть его на межсетевом экране и требовать VPN с MFA — и этот путь исчезает.</p>`,
    },
  },
  'd4-c3': {
    plain: {
      en: `<p>Before TCP talks, it shakes hands in three steps: "Can we talk?" (SYN), "Yes, can we?" (SYN-ACK), "Yes" (ACK). A <b>SYN flood</b> is a prank caller who dials thousands of times and hangs up after "Hello?": the server keeps every half-open line waiting until it has no lines left for real customers.</p>`,
      ru: `<p>Прежде чем говорить, TCP пожимает руки в три шага: «Поговорим?» (SYN), «Да, поговорим?» (SYN-ACK), «Да» (ACK). <b>SYN-флуд</b> — телефонный хулиган, который звонит тысячи раз и бросает трубку после «Алло?»: сервер держит каждую полуоткрытую линию в ожидании, пока не останется линий для настоящих клиентов.</p>`,
    },
    ex: {
      en: `<p>An online game's login servers go down every evening during a tournament. Packet captures show millions of SYNs from spoofed addresses. Turning on SYN cookies (the server stores nothing until the handshake completes) and putting the servers behind a DDoS scrubbing service such as Cloudflare or Akamai restores service.</p>`,
      ru: `<p>Серверы входа онлайн-игры падают каждый вечер во время турнира. Захват трафика показывает миллионы SYN с поддельных адресов. Включение SYN cookies (сервер ничего не хранит, пока рукопожатие не завершено) и вынос серверов за сервис очистки DDoS вроде Cloudflare или Akamai восстанавливают работу.</p>`,
    },
  },
  'd4-c4': {
    plain: {
      en: `<p>Network devices are the plumbing. A <b>switch</b> connects devices inside a network; a <b>router</b> connects networks. A <b>firewall</b> is a border guard checking every packet against rules: simple ones look only at addresses and ports (packet filter), better ones remember conversations (stateful), and next-generation firewalls recognize applications and users. An <b>IDS</b> is a security camera (it alerts); an <b>IPS</b> is a guard who can also block. A <b>WAF</b> (web application firewall) understands web attacks like SQL injection.</p>`,
      ru: `<p>Сетевые устройства — это водопровод. <b>Коммутатор</b> соединяет устройства внутри сети; <b>маршрутизатор</b> — сети между собой. <b>Межсетевой экран</b> — пограничник, сверяющий каждый пакет с правилами: простые смотрят только на адреса и порты (пакетный фильтр), получше запоминают разговоры (stateful), а межсетевые экраны нового поколения (NGFW) распознают приложения и пользователей. <b>IDS</b> — камера наблюдения (сообщает); <b>IPS</b> — охранник, который может ещё и остановить. <b>WAF</b> (экран веб-приложений) понимает веб-атаки вроде SQL-инъекций.</p>`,
    },
    ex: {
      en: `<p>An e-commerce company puts a NGFW at the internet edge, a WAF in front of its web shop in the DMZ, and an internal firewall between the DMZ and the databases. An IDS receives a copy of internal traffic to spot lateral movement without slowing anything down. When a new SQL injection campaign starts, the WAF blocks it before it reaches the shop's code.</p>`,
      ru: `<p>Интернет-магазин ставит NGFW на границе с интернетом, WAF перед магазином в DMZ и внутренний экран между DMZ и базами данных. IDS получает копию внутреннего трафика, чтобы замечать горизонтальное перемещение, ничего не замедляя. Когда начинается новая кампания SQL-инъекций, WAF блокирует её, не допуская до кода магазина.</p>`,
    },
    dg: {
      title: { en: 'Screened subnet (DMZ) with layered inspection', ru: 'Экранированная подсеть (DMZ) с многослойной проверкой' }, h: 290,
      zones: [[10, 40, 130, 235, { en: 'Internet', ru: 'Интернет' }, 'untrust'], [240, 40, 230, 235, 'DMZ', 'dmz'], [570, 40, 180, 235, { en: 'Internal', ru: 'Внутренняя' }, 'trust']],
      nodes: [
        ['in', 75, 155, { en: 'Users', ru: 'Пользователи' }, null, '🌐', null, 120],
        ['fw1', 190, 155, 'NGFW', null, '🧱', 'key', 90],
        ['waf', 355, 100, 'WAF', { en: 'blocks web attacks', ru: 'блок веб-атак' }, '🛡', 'key'],
        ['web', 355, 210, { en: 'Web shop', ru: 'Магазин' }, null, '🛒'],
        ['fw2', 520, 210, { en: 'Firewall', ru: 'МЭ' }, null, '🧱', 'key', 90],
        ['db', 660, 210, { en: 'Database', ru: 'База' }, null, '🗄', 'ok'],
        ['ids', 660, 100, 'IDS', { en: 'gets a copy', ru: 'получает копию' }, '👁'],
      ],
      edges: [['in', 'fw1'], ['fw1', 'waf'], ['waf', 'web'], ['web', 'fw2'], ['fw2', 'db'], ['fw2', 'ids', { en: 'mirror', ru: 'зеркало' }, 'dash']],
      note: { en: 'Two firewalls of different vendors ("dual-homed" DMZ) mean one product flaw does not open the whole path. IDS is passive (out of band); IPS and WAF are inline.', ru: 'Два экрана разных производителей означают, что уязвимость одного продукта не открывает весь путь. IDS пассивна (вне потока); IPS и WAF стоят в разрыв.' },
    },
  },
  'd4-c5': {
    plain: {
      en: `<p>Secure protocols wrap ordinary traffic in an armored envelope. <b>TLS</b> protects web and app traffic (the padlock in your browser). <b>IPsec</b> protects whole network packets, mostly for VPNs. <b>SSH</b> replaces the old, plaintext Telnet for remote administration. <b>DNSSEC</b> signs DNS answers so nobody can fake the address of bank.com. The rule: if an old protocol sends passwords in clear text (Telnet, FTP, HTTP), replace it with its secure twin.</p>`,
      ru: `<p>Безопасные протоколы заворачивают обычный трафик в бронированный конверт. <b>TLS</b> защищает веб- и прикладной трафик (замок в браузере). <b>IPsec</b> защищает сетевые пакеты целиком, в основном для VPN. <b>SSH</b> заменяет старый открытый Telnet для удалённого администрирования. <b>DNSSEC</b> подписывает ответы DNS, чтобы никто не подделал адрес bank.com. Правило: если старый протокол передаёт пароли открытым текстом (Telnet, FTP, HTTP), замените его безопасным близнецом.</p>`,
    },
    ex: {
      en: `<p>Two branch offices connect over the internet with an IPsec tunnel between their routers. Inside the head office, admins reach switches only via SSH, never Telnet, and the company's domain is DNSSEC-signed. IPsec has two modes: <b>transport</b> encrypts only the payload (host to host), <b>tunnel</b> wraps the whole original packet in a new one (gateway to gateway, the usual VPN case).</p>`,
      ru: `<p>Два филиала соединены через интернет туннелем IPsec между маршрутизаторами. Внутри головного офиса админы заходят на коммутаторы только по SSH, никогда по Telnet, а домен компании подписан DNSSEC. У IPsec два режима: <b>транспортный</b> шифрует только полезную нагрузку (узел–узел), <b>туннельный</b> заворачивает весь исходный пакет в новый (шлюз–шлюз, обычный случай VPN).</p>`,
    },
    dg: {
      title: { en: 'IPsec transport mode vs tunnel mode', ru: 'IPsec: транспортный и туннельный режимы' }, h: 240,
      zones: [[10, 30, 740, 90, { en: 'Transport mode: host ↔ host', ru: 'Транспортный режим: узел ↔ узел' }], [10, 135, 740, 95, { en: 'Tunnel mode: gateway ↔ gateway', ru: 'Туннельный режим: шлюз ↔ шлюз' }]],
      nodes: [
        ['th', 130, 80, { en: 'Original IP header', ru: 'Исходный IP-заголовок' }, { en: 'visible', ru: 'виден' }, null, 'dim', 200],
        ['te', 320, 80, 'ESP', null, null, 'key', 90],
        ['tp', 500, 80, { en: 'Payload', ru: 'Данные' }, { en: 'encrypted', ru: 'зашифрованы' }, '🔒', 'ok', 180],
        ['nh', 110, 185, { en: 'New IP header', ru: 'Новый IP-заголовок' }, { en: 'gateway addresses', ru: 'адреса шлюзов' }, null, 'dim', 180],
        ['ne', 265, 185, 'ESP', null, null, 'key', 90],
        ['oh', 430, 185, { en: 'Original header', ru: 'Исходный заголовок' }, { en: 'encrypted', ru: 'зашифрован' }, '🔒', 'ok', 190],
        ['op', 630, 185, { en: 'Payload', ru: 'Данные' }, { en: 'encrypted', ru: 'зашифрованы' }, '🔒', 'ok', 170],
      ],
      edges: [],
      note: { en: 'Tunnel mode hides who is really talking to whom inside the networks; transport mode hides only the content. AH gives integrity without encryption; ESP gives both.', ru: 'Туннельный режим скрывает, кто на самом деле общается внутри сетей; транспортный — только содержимое. AH даёт целостность без шифрования; ESP — и то, и другое.' },
    },
  },
  'd4-c6': {
    plain: {
      en: `<p>Network attacks target different layers. Someone can flood you with traffic until you can't serve customers (<b>DoS/DDoS</b>), sit secretly in the middle of a conversation (<b>man-in-the-middle</b>, often via fake ARP or a fake Wi-Fi hotspot), forge answers from the phone book (<b>DNS poisoning</b>), or pretend to be someone else's address (<b>spoofing</b>). Each has a matching defense: scrubbing services, encryption with certificate checks, DNSSEC, and filtering of forged addresses.</p>`,
      ru: `<p>Сетевые атаки бьют по разным уровням. Можно завалить трафиком так, что клиентов не обслужить (<b>DoS/DDoS</b>), тайно встать посередине разговора (<b>«человек посередине»</b>, часто через поддельный ARP или фальшивую точку Wi-Fi), подделать ответы «телефонной книги» (<b>отравление DNS</b>) или выдать себя за чужой адрес (<b>спуфинг</b>). У каждой есть защита: сервисы очистки трафика, шифрование с проверкой сертификатов, DNSSEC и фильтрация поддельных адресов.</p>`,
    },
    ex: {
      en: `<p>In 2016 the Mirai botnet, made of hundreds of thousands of hacked cameras and routers with default passwords, hit DNS provider Dyn with a massive DDoS. Twitter, Netflix, Reddit and GitHub became unreachable for millions of users on the US East Coast, even though their own servers were fine: their DNS was down.</p>`,
      ru: `<p>В 2016 году ботнет Mirai из сотен тысяч взломанных камер и роутеров с паролями по умолчанию обрушил мощную DDoS-атаку на DNS-провайдера Dyn. Twitter, Netflix, Reddit и GitHub стали недоступны для миллионов пользователей на восточном побережье США, хотя их собственные серверы работали: упал их DNS.</p>`,
    },
  },
  'd4-c7': {
    plain: {
      en: `<p>Wi-Fi is a network you can't put a fence around: anyone in the parking lot can listen. So it must be encrypted and authenticated. <b>WPA3</b> is the current standard; WEP and the original WPA are broken. At home everyone shares one password (Personal mode). In a company, each person logs in with their own account through <b>802.1X</b>: the access point asks a central <b>RADIUS</b> server "is this employee allowed?" before letting the device in (Enterprise mode).</p>`,
      ru: `<p>Wi-Fi — сеть, которую не обнести забором: слушать может любой на парковке. Поэтому её нужно шифровать и аутентифицировать. Текущий стандарт — <b>WPA3</b>; WEP и исходный WPA взломаны. Дома все используют один пароль (режим Personal). В компании каждый входит под своей учёткой через <b>802.1X</b>: точка доступа спрашивает центральный сервер <b>RADIUS</b> «можно ли этому сотруднику?», прежде чем пустить устройство (режим Enterprise).</p>`,
    },
    ex: {
      en: `<p>An employee leaves a company that uses one shared Wi-Fi password: in theory everyone's password must now change. With WPA3-Enterprise and 802.1X, IT simply disables the person's account and their laptop can no longer join. An attacker setting up an "evil twin" access point with the same network name also fails, because devices verify the RADIUS server's certificate.</p>`,
      ru: `<p>Из компании с одним общим паролем Wi-Fi уходит сотрудник: по-хорошему пароль надо менять всем. С WPA3-Enterprise и 802.1X IT просто отключает учётку человека, и его ноутбук больше не подключится. Атакующий, поднявший «злого двойника» точки доступа с тем же именем сети, тоже потерпит неудачу, потому что устройства проверяют сертификат сервера RADIUS.</p>`,
    },
    dg: {
      title: { en: 'WPA3-Enterprise with 802.1X', ru: 'WPA3-Enterprise с 802.1X' }, h: 240,
      zones: [[440, 40, 310, 185, { en: 'Corporate network', ru: 'Корпоративная сеть' }, 'trust']],
      nodes: [
        ['sup', 100, 130, { en: 'Laptop', ru: 'Ноутбук' }, { en: 'supplicant', ru: 'запрашивающий' }, '💻'],
        ['ap', 320, 130, { en: 'Access point', ru: 'Точка доступа' }, { en: 'authenticator', ru: 'аутентификатор' }, '📶', 'key'],
        ['rad', 560, 130, 'RADIUS', { en: 'authentication server', ru: 'сервер аутентификации' }, '🪪', 'key'],
        ['dir', 650, 200, { en: 'Directory', ru: 'Каталог' }, 'AD / Entra ID', '📚'],
      ],
      edges: [['sup', 'ap', { en: 'EAP', ru: 'EAP' }, 'both'], ['ap', 'rad', { en: 'RADIUS', ru: 'RADIUS' }, 'both'], ['rad', 'dir', null, 'dash both']],
      note: { en: 'Until the RADIUS server says yes, the access point only lets authentication traffic through. Each user gets their own encryption keys.', ru: 'Пока RADIUS не скажет «да», точка доступа пропускает только трафик аутентификации. Каждый пользователь получает свои ключи шифрования.' },
    },
  },
  'd4-c8': {
    plain: {
      en: `<p>Segmentation is building walls inside the network so an intruder in one room can't walk into all the others. <b>VLANs</b> are virtual walls on a switch. <b>Micro-segmentation</b> puts a wall around every single server or workload. <b>SDN</b> (software-defined networking) moves the "brain" of the network into central software: the controller decides the rules and the switches just follow them, so walls can be changed in seconds.</p>`,
      ru: `<p>Сегментация — стены внутри сети, чтобы нарушитель в одной комнате не мог пройти во все остальные. <b>VLAN</b> — виртуальные стены на коммутаторе. <b>Микросегментация</b> ставит стену вокруг каждого сервера или рабочей нагрузки. <b>SDN</b> (программно-определяемые сети) переносит «мозг» сети в центральное ПО: контроллер решает правила, а коммутаторы просто их выполняют, поэтому стены меняются за секунды.</p>`,
    },
    ex: {
      en: `<p>The 2017 NotPetya malware spread across Maersk's flat global network within hours, wiping about 49,000 laptops and thousands of servers; recovery reportedly cost around $300 million. A segmented network with only the necessary flows allowed between sites and server groups would have contained it to a fraction of that.</p>`,
      ru: `<p>В 2017 году NotPetya за считанные часы распространился по плоской глобальной сети Maersk, уничтожив около 49 000 ноутбуков и тысячи серверов; восстановление, по оценкам, стоило около $300 млн. Сегментированная сеть, где между площадками и группами серверов разрешены только необходимые потоки, ограничила бы ущерб малой частью этого.</p>`,
    },
    dg: [{
      title: { en: 'SDN: control plane separated from data plane', ru: 'SDN: плоскость управления отделена от плоскости данных' }, h: 250,
      zones: [[180, 25, 400, 75, { en: 'Control plane', ru: 'Плоскость управления' }, 'trust'], [20, 130, 720, 105, { en: 'Data plane', ru: 'Плоскость данных' }]],
      nodes: [
        ['app', 80, 60, { en: 'Admin / apps', ru: 'Админ / прил.' }, null, '🧑‍💻'],
        ['ctl', 380, 62, { en: 'SDN controller', ru: 'SDN-контроллер' }, { en: 'decides the rules', ru: 'решает правила' }, '🧠', 'key'],
        ['s1', 160, 190, { en: 'Switch', ru: 'Коммутатор' }, null, '🔀'],
        ['s2', 380, 190, { en: 'Switch', ru: 'Коммутатор' }, null, '🔀'],
        ['s3', 600, 190, { en: 'Switch', ru: 'Коммутатор' }, null, '🔀'],
      ],
      edges: [['app', 'ctl', { en: 'API', ru: 'API' }], ['ctl', 's1', null, 'key dash'], ['ctl', 's2', null, 'key dash'], ['ctl', 's3', null, 'key dash'], ['s1', 's2', null, 'both'], ['s2', 's3', null, 'both']],
      note: { en: 'The controller is a high-value target: whoever controls it controls the whole network, so protect its API with strong authentication.', ru: 'Контроллер — ценная цель: кто им владеет, тот управляет всей сетью, поэтому его API защищают сильной аутентификацией.' },
    }, {
      title: { en: 'Flat network vs micro-segmentation', ru: 'Плоская сеть и микросегментация' }, h: 230,
      zones: [[10, 30, 350, 190, { en: 'Flat: any server can reach any other', ru: 'Плоская: любой сервер видит любой' }, 'untrust'], [400, 30, 350, 190, { en: 'Micro-segmented: only allowed flows', ru: 'Микросегменты: только разрешённые потоки' }, 'trust']],
      nodes: [
        ['fa', 90, 90, 'Web', null, '🖥', 'bad'], ['fb', 280, 90, 'App', null, '🖥'], ['fc', 90, 180, 'HR', null, '🖥'], ['fd', 280, 180, 'DB', null, '🗄'],
        ['ma', 480, 90, 'Web', null, '🖥', 'bad'], ['mb', 670, 90, 'App', null, '🖥'], ['mc', 480, 180, 'HR', null, '🖥'], ['md', 670, 180, 'DB', null, '🗄'],
      ],
      edges: [['fa', 'fb', null, 'bad'], ['fa', 'fc', null, 'bad'], ['fa', 'fd', null, 'bad'], ['ma', 'mb', { en: 'allowed', ru: 'разрешено' }, 'ok'], ['mb', 'md', { en: 'allowed', ru: 'разрешено' }, 'ok']],
      note: { en: 'If the web server is compromised (red), in a flat network it reaches everything; with micro-segmentation it can only talk to the app tier.', ru: 'Если веб-сервер взломан (красный), в плоской сети он достаёт до всего; с микросегментацией он может говорить только с уровнем приложения.' },
    }],
  },
  'd4-c9': {
    plain: {
      en: `<p>A <b>VPN</b> (virtual private network) is a private, encrypted tunnel through the public internet. <b>Site-to-site</b> VPNs connect whole offices, always on, between routers. <b>Remote-access</b> VPNs connect one person's laptop to the office. Newer <b>ZTNA</b> (zero trust network access) gives a user access to one specific application after checking the user and device, instead of putting them on the whole network.</p>`,
      ru: `<p><b>VPN</b> (виртуальная частная сеть) — частный зашифрованный туннель через публичный интернет. <b>Site-to-site</b> VPN соединяют целые офисы, постоянно, между маршрутизаторами. VPN <b>удалённого доступа</b> подключают ноутбук одного человека к офису. Более новый <b>ZTNA</b> (доступ к сети с нулевым доверием) даёт доступ к одному конкретному приложению после проверки пользователя и устройства, а не пускает во всю сеть.</p>`,
    },
    ex: {
      en: `<p>In 2021 attackers got into Colonial Pipeline through a legacy VPN account that had no MFA and whose password had leaked. The company shut down the largest fuel pipeline on the US East Coast for days. MFA on every remote-access path, and disabling unused accounts, are the direct lessons.</p>`,
      ru: `<p>В 2021 году злоумышленники проникли в Colonial Pipeline через старую VPN-учётку без MFA, пароль от которой утёк. Компания на несколько дней остановила крупнейший топливопровод восточного побережья США. Прямые уроки: MFA на каждом пути удалённого доступа и отключение неиспользуемых учёток.</p>`,
    },
    dg: {
      title: { en: 'Site-to-site vs remote-access VPN', ru: 'VPN site-to-site и удалённого доступа' }, h: 260,
      zones: [[10, 30, 200, 120, { en: 'Branch office', ru: 'Филиал' }, 'trust'], [550, 30, 200, 210, { en: 'Head office', ru: 'Головной офис' }, 'trust']],
      nodes: [
        ['br', 110, 95, { en: 'Branch router', ru: 'Роутер филиала' }, null, '🔀', 'key'],
        ['hq', 650, 95, { en: 'VPN gateway', ru: 'VPN-шлюз' }, null, '🔀', 'key'],
        ['apps', 650, 195, { en: 'Internal apps', ru: 'Внутр. приложения' }, null, '🖥', 'ok'],
        ['home', 110, 215, { en: 'Remote worker', ru: 'Удалённый сотрудник' }, { en: 'VPN client + MFA', ru: 'VPN-клиент + MFA' }, '🏠'],
      ],
      edges: [['br', 'hq', { en: 'IPsec tunnel, always on', ru: 'туннель IPsec, всегда' }, 'key both'], ['home', 'hq', { en: 'TLS / IPsec on demand', ru: 'TLS / IPsec по запросу' }, 'key both'], ['hq', 'apps']],
      note: { en: 'Both tunnels physically cross the internet but the traffic inside is encrypted and authenticated.', ru: 'Оба туннеля физически идут через интернет, но трафик внутри зашифрован и аутентифицирован.' },
    },
  },
});
