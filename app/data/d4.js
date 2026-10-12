'use strict';
CISSP.domain({
  id: 4, weight: 13,
  title: { en: 'Communication and Network Security', ru: 'Безопасность сетей и коммуникаций' },
  summary: {
    en: 'OSI and TCP/IP models, secure protocols (TLS, IPsec, SSH), network devices and firewalls, segmentation, wireless security, network attacks, converged protocols, SDN and secure communication channels.',
    ru: 'Модели OSI и TCP/IP, защищённые протоколы (TLS, IPsec, SSH), сетевые устройства и МЭ, сегментация, безопасность беспроводных сетей, сетевые атаки, конвергентные протоколы, SDN и защищённые каналы связи.',
  },
  objectives: [
    ['4.1', 'Apply secure design principles in network architectures (OSI/TCP-IP, IPv4/IPv6, secure protocols, converged protocols, micro-segmentation, wireless, cellular, CDN, SDN)'],
    ['4.2', 'Secure network components (operation of infrastructure, transmission media, NAC, endpoint security)'],
    ['4.3', 'Implement secure communication channels according to design (voice, video, collaboration, remote access, data communications, third-party connectivity)'],
  ],
  concepts: [
    {
      t: { en: 'OSI model', ru: 'Модель OSI' },
      b: {
        en: '<p>Mnemonic from the top: "<b>A</b>ll <b>P</b>eople <b>S</b>eem <b>T</b>o <b>N</b>eed <b>D</b>ata <b>P</b>rocessing" (7→1). From the bottom: "<b>P</b>lease <b>D</b>o <b>N</b>ot <b>T</b>hrow <b>S</b>ausage <b>P</b>izza <b>A</b>way". The TCP/IP model maps as follows: Application (OSI 5–7), Transport (4), Internet (3), Link / Network Access (1–2).</p>',
        ru: '<p>Мнемоника сверху: «<b>A</b>ll <b>P</b>eople <b>S</b>eem <b>T</b>o <b>N</b>eed <b>D</b>ata <b>P</b>rocessing» (7→1). Снизу: «<b>P</b>lease <b>D</b>o <b>N</b>ot <b>T</b>hrow <b>S</b>ausage <b>P</b>izza <b>A</b>way». Соответствие TCP/IP: Application (OSI 5–7), Transport (4), Internet (3), Link (1–2).</p>',
      },
      w: ['layers', { title: { en: 'OSI layers — click for protocols, devices and attacks', ru: 'Уровни OSI — протоколы, устройства и атаки' }, items: [
        { n: 7, t: 'Application', s: 'PDU: data', d: '<b>Protocols:</b> HTTP/HTTPS, DNS, SMTP, IMAP, SNMP, FTP, SSH, LDAP, DHCP (app-level)<br><b>Devices:</b> application proxy, WAF, NGFW (L7 inspection)<br><b>Attacks:</b> SQLi, XSS, phishing, DNS poisoning, malware' },
        { n: 6, t: 'Presentation', s: 'PDU: data', d: '<b>Functions:</b> data formatting, translation, encryption and compression (ASCII, JPEG, MPEG, TLS conceptually)<br><b>Attacks:</b> encoding/format-based attacks' },
        { n: 5, t: 'Session', s: 'PDU: data', d: '<b>Protocols:</b> NetBIOS, RPC, PPTP, SOCKS (circuit proxy)<br><b>Functions:</b> establish, manage and terminate sessions (simplex, half-duplex, full-duplex)<br><b>Attacks:</b> session hijacking' },
        { n: 4, t: 'Transport', s: 'PDU: segment (TCP) / datagram (UDP)', d: '<b>Protocols:</b> TCP (connection-oriented, reliable), UDP (connectionless), TLS (often placed here)<br><b>Devices:</b> stateful firewall, circuit-level proxy<br><b>Attacks:</b> SYN flood, port scanning, session hijacking (sequence prediction)' },
        { n: 3, t: 'Network', s: 'PDU: packet', d: '<b>Protocols:</b> IPv4/IPv6, ICMP, IPsec, IGMP, routing (OSPF, BGP, RIP)<br><b>Devices:</b> router, packet-filter firewall, L3 switch<br><b>Attacks:</b> IP spoofing, Smurf, ping of death, teardrop, route poisoning' },
        { n: 2, t: 'Data Link', s: 'PDU: frame', d: '<b>Protocols:</b> Ethernet (802.3), Wi-Fi (802.11), ARP, PPP, L2TP, 802.1Q VLAN, 802.1X (port-based NAC)<br><b>Sublayers:</b> LLC and MAC<br><b>Devices:</b> switch, bridge, wireless AP<br><b>Attacks:</b> ARP poisoning, MAC flooding, MAC spoofing, VLAN hopping' },
        { n: 1, t: 'Physical', s: 'PDU: bits', d: '<b>Media:</b> copper (twisted pair, coax), fiber, radio<br><b>Devices:</b> hub, repeater, cable, NIC (physical), modem<br><b>Attacks:</b> wiretapping, cable cutting, jamming, EMI' },
      ] }],
    },
    {
      t: { en: 'TCP/IP essentials', ru: 'Основы TCP/IP' },
      b: {
        en: `<ul><li><b>TCP</b>: connection-oriented, reliable, sequenced, three-way handshake (SYN → SYN/ACK → ACK). Flags: SYN, ACK, FIN, RST, PSH, URG. <b>UDP</b>: connectionless, best-effort, low overhead (DNS, VoIP, streaming, SNMP, DHCP).</li>
<li><b>Ports</b>: well-known 0–1023, registered 1024–49151, dynamic 49152–65535.</li>
<li><b>IPv4</b>: 32-bit. Private ranges per RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA is 169.254.0.0/16. <b>NAT</b> hides internal addresses.</li>
<li><b>IPv6</b>: 128-bit, IPsec support built in (optional to use), no broadcast, SLAAC. Watch for IPv6 tunneling that bypasses IPv4-only security controls.</li>
<li><b>ICMP</b>: diagnostics (ping, traceroute) and abused for DoS and reconnaissance. <b>ARP</b> maps IP to MAC and has no authentication, so it can be poisoned.</li></ul>`,
        ru: `<ul><li><b>TCP</b> — с установкой соединения, надёжный, упорядоченный, тройное рукопожатие (SYN → SYN/ACK → ACK). Флаги SYN, ACK, FIN, RST, PSH, URG. <b>UDP</b> — без соединения, «как получится», малые накладные расходы (DNS, VoIP, стриминг, SNMP, DHCP).</li>
<li><b>Порты</b>: well-known 0–1023, registered 1024–49151, динамические 49152–65535.</li>
<li><b>IPv4</b> — 32 бита. Частные диапазоны (RFC 1918): 10/8, 172.16/12, 192.168/16. APIPA — 169.254/16. <b>NAT</b> скрывает внутренние адреса.</li>
<li><b>IPv6</b> — 128 бит, встроенная поддержка IPsec (использовать не обязательно), нет broadcast, SLAAC. Риск: туннелирование IPv6 в обход мер, рассчитанных на IPv4.</li>
<li><b>ICMP</b> — диагностика (ping, traceroute), используется для DoS и разведки. <b>ARP</b> сопоставляет IP и MAC без аутентификации — подвержен отравлению.</li></ul>`,
      },
      w: ['compare', { title: { en: 'Ports to know', ru: 'Порты, которые нужно знать' }, cols: ['Port', 'Service', 'Secure alternative'], rows: [
        ['20/21', 'FTP (cleartext)', 'SFTP (22) or FTPS (989/990)'], ['22', 'SSH / SFTP / SCP', '—'], ['23', 'Telnet (cleartext)', 'SSH (22)'],
        ['25', 'SMTP', 'SMTP + STARTTLS (587), SMTPS (465)'], ['53', 'DNS (UDP/TCP)', 'DNSSEC (integrity), DoH/DoT 853 (privacy)'],
        ['67/68', 'DHCP', 'DHCP snooping'], ['69', 'TFTP (no auth)', 'Avoid / restrict'], ['80', 'HTTP', 'HTTPS (443)'], ['88', 'Kerberos', '—'],
        ['110 / 143', 'POP3 / IMAP', 'POP3S 995 / IMAPS 993'], ['161/162', 'SNMP', 'SNMPv3 (auth + encryption)'], ['389', 'LDAP', 'LDAPS (636)'],
        ['443', 'HTTPS (TLS)', '—'], ['445', 'SMB', 'SMB 3 with encryption, block at perimeter'], ['514', 'Syslog (UDP)', 'Syslog over TLS (6514)'],
        ['1433 / 3306', 'MS SQL / MySQL', 'Restrict, encrypt'], ['1812/1813', 'RADIUS', 'RADIUS over TLS (RadSec)'], ['3389', 'RDP', 'RDP via VPN / gateway + NLA, MFA'], ['49', 'TACACS+', '—'],
      ] }],
    },
    {
      t: { en: 'TCP three-way handshake and SYN flood', ru: 'Тройное рукопожатие TCP и SYN-флуд' },
      b: { en: '<p>A SYN flood sends many SYNs and never completes the handshake, which exhausts the server\'s half-open connection table. Mitigations: SYN cookies, rate limiting, upstream DDoS scrubbing.</p>', ru: '<p>SYN-флуд — масса SYN без завершения рукопожатия, переполняющая таблицу полуоткрытых соединений. Меры: SYN cookies, ограничение скорости, очистка трафика у провайдера.</p>' },
      w: ['flow', { title: 'TCP', steps: [
        { t: 'Client → SYN', d: 'Client sends SYN with initial sequence number x.' },
        { t: 'Server → SYN/ACK', d: 'Server allocates state (half-open), replies SYN with seq y, ACK x+1.' },
        { t: 'Client → ACK', d: 'Client acknowledges y+1. Connection established. In a SYN flood this ACK never arrives.' },
        { t: 'Data transfer', d: 'Sequenced, acknowledged, retransmitted if lost.' },
        { t: 'FIN / ACK teardown', d: 'Graceful close (FIN, ACK, FIN, ACK) or abrupt RST.' },
      ] }],
    },
    {
      t: { en: 'Network devices and firewalls', ru: 'Сетевые устройства и межсетевые экраны' },
      b: {
        en: `<ul><li><b>Hub</b> (L1, repeats to all ports), <b>switch</b> (L2, MAC table, VLANs), <b>router</b> (L3, routes between networks, ACLs), <b>gateway</b> (protocol translation, L7).</li>
<li><b>IDS</b> (detects and alerts, passive, out of band) vs <b>IPS</b> (inline, blocks). Detection methods: <b>signature/knowledge-based</b> (known attacks, few false positives, misses zero-days) and <b>anomaly/behavior-based</b> (baseline deviations, catches new attacks, more false positives). NIDS vs HIDS.</li>
<li><b>NAC</b> (802.1X): checks device identity and posture before network admission. Pre-admission vs post-admission, agent vs agentless.</li>
<li><b>Architectures</b>: <b>screened subnet / DMZ</b> (between two firewalls or a three-legged firewall), <b>bastion host</b> (hardened, exposed), dual-homed host, screened host.</li>
<li><b>Endpoint security</b>: EDR/XDR, host firewalls, application allow-listing, patching.</li></ul>`,
        ru: `<ul><li><b>Концентратор</b> (L1, повторяет на все порты), <b>коммутатор</b> (L2, таблица MAC, VLAN), <b>маршрутизатор</b> (L3, маршрутизация между сетями, ACL), <b>шлюз</b> (трансляция протоколов, L7).</li>
<li><b>IDS</b> — обнаруживает и оповещает (пассивно, вне потока); <b>IPS</b> — в потоке, блокирует. Методы: <b>сигнатурный</b> (известные атаки, мало ложных срабатываний, не видит zero-day) и <b>аномальный/поведенческий</b> (отклонение от базовой линии, ловит новое, больше ложных). NIDS и HIDS.</li>
<li><b>NAC</b> (802.1X): проверка устройства и его состояния до допуска в сеть. До/после допуска, с агентом и без.</li>
<li><b>Архитектуры</b>: <b>экранированная подсеть / DMZ</b> (между двумя МЭ или трёхногий МЭ), <b>бастион</b> (усиленный открытый хост), двухсетевой хост, экранированный хост.</li>
<li><b>Защита конечных точек</b>: EDR/XDR, локальные МЭ, белые списки приложений, патчи.</li></ul>`,
      },
      w: ['compare', { title: { en: 'Firewall types', ru: 'Типы межсетевых экранов' }, cols: ['Type', 'OSI', 'How it decides', 'Notes'], rows: [
        ['Static packet filter', 'L3', 'Header fields: src/dst IP, port, protocol', 'Fast, no state, easily fooled by spoofing'],
        ['Stateful inspection', 'L3–4', 'Tracks connection state table', 'Allows return traffic of established sessions'],
        ['Circuit-level proxy', 'L5', 'Validates session setup (e.g. SOCKS)', 'Doesn\'t inspect content'],
        ['Application-level proxy', 'L7', 'Inspects application content per protocol', 'Slowest, most granular. One proxy per protocol'],
        ['NGFW', 'L3–7', 'App awareness, user identity, IPS, TLS inspection', 'Deep packet inspection'],
        ['WAF', 'L7 (HTTP)', 'Inspects web requests for SQLi, XSS…', 'Protects web apps'],
      ] }],
    },
    {
      t: { en: 'Secure protocols: TLS, IPsec, SSH, DNSSEC', ru: 'Защищённые протоколы: TLS, IPsec, SSH, DNSSEC' },
      b: {
        en: `<ul><li><b>TLS</b>: replaced SSL (all SSL versions and TLS 1.0/1.1 are deprecated). Use TLS 1.2 or 1.3. The handshake uses asymmetric crypto and certificates to establish symmetric session keys. TLS 1.3 mandates <b>forward secrecy</b> (ephemeral DH).</li>
<li><b>IPsec</b> (L3): <b>AH</b> (Authentication Header) provides integrity and authentication but <b>no encryption</b>, and it breaks with NAT. <b>ESP</b> (Encapsulating Security Payload) provides confidentiality plus integrity. <b>Transport mode</b> protects only the payload (host to host). <b>Tunnel mode</b> encapsulates the whole packet (gateway to gateway VPN). <b>IKE</b> negotiates <b>Security Associations</b> (one SA per direction per protocol), identified by the SPI.</li>
<li><b>SSH</b>: encrypted remote shell and file transfer (SFTP, SCP). Replaces Telnet, rlogin and FTP.</li>
<li><b>DNSSEC</b>: signs DNS records, providing integrity and origin authentication, which prevents cache poisoning. It gives <b>no confidentiality</b>. DoH and DoT encrypt DNS queries.</li>
<li><b>Email</b>: S/MIME and PGP (end to end), plus SPF, DKIM and DMARC for anti-spoofing.</li>
<li><b>SNMPv3</b>: authentication and encryption. v1 and v2c use cleartext community strings.</li></ul>`,
        ru: `<ul><li><b>TLS</b> заменил SSL (все версии SSL, TLS 1.0/1.1 устарели). Использовать TLS 1.2/1.3. Рукопожатие: асимметрия и сертификаты для получения симметричных сессионных ключей. TLS 1.3 требует <b>прямую секретность</b> (эфемерный DH).</li>
<li><b>IPsec</b> (L3): <b>AH</b> — целостность и аутентификация, <b>без шифрования</b>, ломается при NAT. <b>ESP</b> — конфиденциальность + целостность. <b>Транспортный режим</b> защищает только полезную нагрузку (хост-хост). <b>Туннельный</b> инкапсулирует весь пакет (VPN шлюз-шлюз). <b>IKE</b> согласует <b>SA</b> (одна на направление и протокол), идентификатор — SPI.</li>
<li><b>SSH</b> — зашифрованная удалённая консоль и передача файлов (SFTP, SCP); замена Telnet, rlogin, FTP.</li>
<li><b>DNSSEC</b> подписывает записи DNS: целостность и подлинность источника, защита от отравления кеша. <b>Конфиденциальности нет</b>; DoH/DoT шифруют запросы.</li>
<li><b>Почта</b>: S/MIME, PGP (сквозное шифрование), SPF/DKIM/DMARC против подделки.</li>
<li><b>SNMPv3</b> — аутентификация и шифрование; v1/v2c — открытые community-строки.</li></ul>`,
      },
    },
    {
      t: { en: 'Network attacks', ru: 'Сетевые атаки' },
      b: { en: '<p>Know the name, the layer, and the countermeasure for each.</p>', ru: '<p>Знайте название, уровень и меру защиты для каждой.</p>' },
      w: ['compare', { title: { en: 'Common network attacks', ru: 'Распространённые сетевые атаки' }, cols: ['Attack', 'How it works', 'Countermeasure'], rows: [
        ['SYN flood', 'Half-open TCP connections exhaust server resources', 'SYN cookies, rate limiting, DDoS scrubbing'],
        ['Smurf', 'ICMP echo to broadcast address with spoofed victim source; amplification', 'Disable directed broadcast, filter ICMP'],
        ['Fraggle', 'Like Smurf but with UDP (echo/chargen)', 'Disable unused UDP services, filter broadcast'],
        ['Ping of death', 'Oversized ICMP packet (>65,535 bytes) crashes system', 'Patching'],
        ['Teardrop', 'Overlapping IP fragments crash reassembly', 'Patching, fragment filtering'],
        ['LAND', 'Packet with source = destination IP/port', 'Patching, ingress filtering'],
        ['ARP poisoning', 'Fake ARP replies redirect traffic (MITM)', 'Dynamic ARP Inspection, static ARP, 802.1X'],
        ['MAC flooding', 'Overflow switch CAM table so it acts like a hub', 'Port security (limit MACs per port)'],
        ['VLAN hopping', 'Switch spoofing or double tagging to reach other VLANs', 'Disable DTP/auto-trunking, change native VLAN'],
        ['DNS cache poisoning', 'Inject false records into resolver cache', 'DNSSEC, randomized source ports'],
        ['Session hijacking', 'Steal or predict session tokens / TCP sequence numbers', 'Encryption (TLS), random tokens, re-auth'],
        ['DDoS / amplification', 'Botnets, DNS/NTP/memcached reflection', 'Upstream scrubbing, CDN, BCP 38 ingress filtering'],
      ] }],
    },
    {
      t: { en: 'Wireless security', ru: 'Безопасность беспроводных сетей' },
      b: {
        en: `<ul><li><b>WEP</b>: RC4 with a 24-bit IV, broken. <b>WPA</b>: TKIP, a temporary fix, deprecated. <b>WPA2</b>: AES-CCMP, vulnerable to KRACK and offline PSK cracking. <b>WPA3</b>: SAE (Simultaneous Authentication of Equals) replaces PSK and resists offline dictionary attacks. Forward secrecy. 192-bit Enterprise mode.</li>
<li><b>Personal</b> (pre-shared key) vs <b>Enterprise</b> (802.1X with a RADIUS server, individual credentials).</li>
<li><b>802.1X</b> roles: <b>supplicant</b> (client), <b>authenticator</b> (AP or switch), <b>authentication server</b> (RADIUS).</li>
<li><b>EAP</b> methods: <b>EAP-TLS</b> (certificates on both sides, the strongest), <b>PEAP</b> and <b>EAP-TTLS</b> (TLS tunnel with server certificate, then password), <b>EAP-FAST</b> (Cisco, PAC), <b>LEAP</b> (Cisco, broken), EAP-MD5 (weak).</li>
<li>Attacks: rogue AP, <b>evil twin</b>, deauthentication, jamming, war driving. Hiding the SSID and MAC filtering are weak controls.</li>
<li><b>Bluetooth</b>: bluejacking (unsolicited messages), <b>bluesnarfing</b> (data theft), <b>bluebugging</b> (taking control). Others: Zigbee, NFC, RFID, Li-Fi, satellite, cellular (4G/5G).</li></ul>`,
        ru: `<ul><li><b>WEP</b> — RC4, IV 24 бита, взломан. <b>WPA</b> — TKIP, временная мера, устарел. <b>WPA2</b> — AES-CCMP; уязвим к KRACK и офлайн-подбору PSK. <b>WPA3</b> — SAE вместо PSK, устойчив к офлайн-словарным атакам, прямая секретность, Enterprise 192 бита.</li>
<li><b>Personal</b> (общий ключ) и <b>Enterprise</b> (802.1X + RADIUS, индивидуальные учётные данные).</li>
<li><b>802.1X</b>: <b>supplicant</b> (клиент), <b>authenticator</b> (AP или коммутатор), <b>authentication server</b> (RADIUS).</li>
<li><b>EAP</b>: <b>EAP-TLS</b> (сертификаты с обеих сторон — сильнейший), <b>PEAP</b> и <b>EAP-TTLS</b> (TLS-туннель по серверному сертификату, затем пароль), <b>EAP-FAST</b> (Cisco, PAC), <b>LEAP</b> (Cisco, взломан), EAP-MD5 (слабый).</li>
<li>Атаки: rogue AP, <b>evil twin</b>, деаутентификация, глушение, war driving. Скрытие SSID и фильтрация MAC — слабые меры.</li>
<li><b>Bluetooth</b>: bluejacking (спам-сообщения), <b>bluesnarfing</b> (кража данных), <b>bluebugging</b> (захват управления). Также Zigbee, NFC, RFID, Li-Fi, спутник, сотовая связь (4G/5G).</li></ul>`,
      },
    },
    {
      t: { en: 'Segmentation, SDN, converged protocols and media', ru: 'Сегментация, SDN, конвергентные протоколы, среды' },
      b: {
        en: `<ul><li><b>VLANs</b> provide logical segmentation at L2, and routing between them needs a router or L3 switch with ACLs. <b>Micro-segmentation</b> applies fine-grained policies down to the individual workload, which is key for zero trust. Also VXLAN and virtual networks.</li>
<li><b>SDN</b>: separates the <b>control plane</b> (the controller decides) from the <b>data plane</b> (switches forward). It gives centralized programmability, but the controller is a high-value target. <b>SD-WAN</b>.</li>
<li><b>Converged protocols</b>: <b>FCoE</b> (Fibre Channel over Ethernet), <b>iSCSI</b> (SCSI over IP, port 3260), <b>VoIP</b> (SIP + RTP. Secure with SIPS/TLS and SRTP, and put voice in its own VLAN), <b>MPLS</b> (label switching, which gives traffic isolation but not encryption).</li>
<li><b>CDN</b>: distributes content close to users and absorbs DDoS.</li>
<li><b>Media</b>: <b>twisted pair</b> (UTP/STP, Cat5e/6/6a, ~100 m, susceptible to EMI and crosstalk), <b>coaxial</b>, <b>fiber</b> (immune to EMI, hardest to tap, long distances). Plenum-rated cable for air spaces (no toxic smoke).</li>
<li><b>Topologies</b>: bus, star (most common, single point of failure at the center), ring, mesh (most redundant). Media access: <b>CSMA/CD</b> (wired Ethernet, detects collisions), <b>CSMA/CA</b> (Wi-Fi, avoids collisions), token passing.</li></ul>`,
        ru: `<ul><li><b>VLAN</b> — логическая сегментация на L2; между VLAN маршрутизирует маршрутизатор или L3-коммутатор с ACL. <b>Микросегментация</b> — детальные политики вплоть до отдельной нагрузки, ключ к zero trust. Также VXLAN и виртуальные сети.</li>
<li><b>SDN</b> отделяет <b>плоскость управления</b> (решает контроллер) от <b>плоскости данных</b> (коммутаторы пересылают). Централизованное программирование; контроллер — ценная цель. <b>SD-WAN</b>.</li>
<li><b>Конвергентные протоколы</b>: <b>FCoE</b> (Fibre Channel поверх Ethernet), <b>iSCSI</b> (SCSI поверх IP, порт 3260), <b>VoIP</b> (SIP + RTP; защита — SIPS/TLS, SRTP, отдельный голосовой VLAN), <b>MPLS</b> (коммутация по меткам: изоляция трафика, но не шифрование).</li>
<li><b>CDN</b> — доставка контента ближе к пользователю, поглощение DDoS.</li>
<li><b>Среды</b>: <b>витая пара</b> (UTP/STP, Cat5e/6/6a, ~100 м, подвержена ЭМП и перекрёстным помехам), <b>коаксиал</b>, <b>оптика</b> (невосприимчива к ЭМП, сложнее всего подключиться, большие расстояния). Plenum-кабель для воздуховодов (без токсичного дыма).</li>
<li><b>Топологии</b>: шина, звезда (самая распространённая, центр — единая точка отказа), кольцо, mesh (максимум избыточности). Доступ к среде: <b>CSMA/CD</b> (проводной Ethernet, обнаружение коллизий), <b>CSMA/CA</b> (Wi-Fi, предотвращение коллизий), передача маркера.</li></ul>`,
      },
    },
    {
      t: { en: 'Secure communication channels and remote access', ru: 'Защищённые каналы и удалённый доступ' },
      b: {
        en: `<ul><li><b>VPN</b>: IPsec (site-to-site, L3), TLS/SSL VPN (clientless or browser-based remote access), L2TP (no encryption, usually paired with IPsec), PPTP (insecure, legacy). <b>Split tunneling</b> lets traffic not bound for corporate go directly to the internet: convenient, but risky. <b>Full tunneling</b> sends everything through corporate controls.</li>
<li><b>Remote authentication</b>: <b>PAP</b> (cleartext, never), <b>CHAP</b> (challenge-response hash, periodic re-authentication), <b>EAP</b> (extensible framework). AAA servers: <b>RADIUS</b> (UDP, encrypts only the password, combines authentication and authorization), <b>TACACS+</b> (Cisco, TCP 49, encrypts the whole payload, separates the three As, good for device administration), <b>Diameter</b> (RADIUS successor, used in 4G/5G).</li>
<li><b>Voice, video and collaboration</b>: secure the conferencing platforms (meeting passwords, waiting rooms, E2EE), protect against vishing, toll fraud and PBX hacking (phreaking).</li>
<li><b>Third-party connectivity</b>: ISAs/MOUs, dedicated segments, least privilege, monitored jump hosts or bastions, time-bound access.</li>
<li><b>Remote access hardening</b>: MFA, posture checks via NAC, VDI, jump servers, never expose RDP directly to the internet.</li></ul>`,
        ru: `<ul><li><b>VPN</b>: IPsec (сеть-сеть, L3), TLS/SSL VPN (удалённый доступ через браузер, без клиента), L2TP (без шифрования, обычно с IPsec), PPTP (небезопасен, устарел). <b>Split tunneling</b> — некорпоративный трафик идёт напрямую в интернет: удобно, но рискованно. <b>Full tunneling</b> — весь трафик через корпоративные средства защиты.</li>
<li><b>Аутентификация удалённых пользователей</b>: <b>PAP</b> (открытым текстом — никогда), <b>CHAP</b> (запрос-ответ с хешем, периодическая переаутентификация), <b>EAP</b> (расширяемый фреймворк). AAA-серверы: <b>RADIUS</b> (UDP, шифрует только пароль, объединяет аутентификацию и авторизацию), <b>TACACS+</b> (Cisco, TCP 49, шифрует всё, разделяет три A, удобен для администрирования устройств), <b>Diameter</b> (преемник RADIUS, используется в 4G/5G).</li>
<li><b>Голос, видео, совместная работа</b>: защита платформ конференций (пароли, залы ожидания, E2EE), защита от вишинга, телефонного мошенничества и взлома АТС (фрикинг).</li>
<li><b>Подключение третьих сторон</b>: ISA/MOU, выделенные сегменты, минимальные привилегии, контролируемые jump-хосты и бастионы, доступ на ограниченное время.</li>
<li><b>Защита удалённого доступа</b>: MFA, проверка состояния (NAC), VDI, jump-серверы, никогда не выставлять RDP напрямую в интернет.</li></ul>`,
      },
    },
  ],
  terms: [
    ['OSI Layer 2', 'Data Link: frames, MAC addresses, switches, ARP, VLANs.', 'Канальный уровень: кадры, MAC, коммутаторы, ARP, VLAN.'],
    ['OSI Layer 3', 'Network: packets, IP addressing, routers, ICMP, IPsec.', 'Сетевой уровень: пакеты, IP, маршрутизаторы, ICMP, IPsec.'],
    ['OSI Layer 4', 'Transport: segments, TCP/UDP, ports.', 'Транспортный: сегменты, TCP/UDP, порты.'],
    ['Three-way handshake', 'SYN, SYN/ACK, ACK — establishes a TCP connection.', 'SYN, SYN/ACK, ACK — установка TCP-соединения.'],
    ['SYN flood', 'DoS by sending SYNs without completing the handshake.', 'DoS через SYN без завершения рукопожатия.'],
    ['Stateful firewall', 'Tracks session state to allow return traffic of established connections.', 'МЭ, отслеживающий состояние соединений.'],
    ['Application proxy', 'Layer 7 firewall that inspects content for a specific protocol.', 'МЭ 7 уровня, анализирующий содержимое конкретного протокола.'],
    ['Screened subnet (DMZ)', 'Network segment between untrusted and trusted networks hosting public services.', 'Сегмент между внешней и внутренней сетью для публичных сервисов.'],
    ['Bastion host', 'Hardened system exposed to an untrusted network.', 'Усиленный хост, доступный из недоверенной сети.'],
    ['IDS vs IPS', 'IDS detects and alerts (passive); IPS sits inline and blocks.', 'IDS обнаруживает и оповещает; IPS стоит в разрыве и блокирует.'],
    ['NAC', 'Network Access Control: checks identity and posture before granting network access (802.1X).', 'Контроль доступа к сети: проверка идентичности и состояния (802.1X).'],
    ['AH (IPsec)', 'Authentication Header: integrity and origin authentication, no confidentiality.', 'Заголовок аутентификации: целостность и подлинность, без шифрования.'],
    ['ESP (IPsec)', 'Encapsulating Security Payload: confidentiality + integrity.', 'Инкапсуляция полезной нагрузки: конфиденциальность + целостность.'],
    ['Tunnel mode', 'IPsec mode encrypting the entire original packet; used for gateway-to-gateway VPNs.', 'Режим IPsec, шифрующий весь исходный пакет; VPN шлюз-шлюз.'],
    ['Transport mode', 'IPsec mode protecting only the payload; host-to-host.', 'Режим IPsec, защищающий только полезную нагрузку; хост-хост.'],
    ['Security Association', 'One-way IPsec agreement on algorithms/keys, identified by SPI.', 'Однонаправленное соглашение IPsec об алгоритмах и ключах, идентификатор SPI.'],
    ['DNSSEC', 'Digitally signs DNS data for integrity and authenticity (no confidentiality).', 'Подпись DNS-данных: целостность и подлинность (без конфиденциальности).'],
    ['Forward secrecy', 'Compromise of a long-term key does not expose past session keys (ephemeral DH).', 'Компрометация долгосрочного ключа не раскрывает прошлые сессии.'],
    ['WPA3-SAE', 'Simultaneous Authentication of Equals; resists offline dictionary attacks on Wi-Fi passwords.', 'Аутентификация равных; устойчива к офлайн-подбору паролей Wi-Fi.'],
    ['EAP-TLS', 'EAP method using certificates on both client and server — strongest common method.', 'EAP с сертификатами на клиенте и сервере — самый сильный.'],
    ['PEAP', 'Protected EAP: TLS tunnel (server cert) protecting inner password auth.', 'EAP в TLS-туннеле (серверный сертификат) с внутренней парольной аутентификацией.'],
    ['Evil twin', 'Rogue AP impersonating a legitimate SSID to intercept traffic.', 'Поддельная точка доступа с легитимным SSID.'],
    ['Bluesnarfing', 'Unauthorized access to data on a Bluetooth device.', 'Несанкционированный доступ к данным через Bluetooth.'],
    ['ARP poisoning', 'Sending forged ARP replies to redirect traffic for MITM.', 'Подделка ARP-ответов для перенаправления трафика (MITM).'],
    ['VLAN hopping', 'Gaining access to traffic on other VLANs via switch spoofing or double tagging.', 'Доступ к другим VLAN через подмену коммутатора или двойное тегирование.'],
    ['SDN', 'Software-Defined Networking: separates control plane from data plane.', 'Программно-определяемые сети: разделение управления и передачи данных.'],
    ['Micro-segmentation', 'Fine-grained segmentation down to individual workloads.', 'Детальная сегментация до отдельных нагрузок.'],
    ['FCoE / iSCSI', 'Converged storage protocols: Fibre Channel over Ethernet / SCSI over IP.', 'Конвергентные протоколы хранения.'],
    ['SRTP', 'Secure RTP: encryption and integrity for VoIP media streams.', 'Защищённый RTP для голосовых потоков.'],
    ['RADIUS', 'AAA protocol over UDP; encrypts only the password; combines authN and authZ.', 'AAA по UDP; шифрует только пароль; объединяет аутентификацию и авторизацию.'],
    ['TACACS+', 'Cisco AAA over TCP 49; encrypts entire payload; separates AAA functions.', 'AAA Cisco по TCP 49; шифрует всё; разделяет функции AAA.'],
    ['CHAP', 'Challenge-Handshake Authentication Protocol; no cleartext password, periodic re-auth.', 'Аутентификация «запрос-ответ» без передачи пароля.'],
    ['Split tunneling', 'VPN config sending only corporate traffic through the tunnel.', 'Через VPN идёт только корпоративный трафик.'],
    ['CSMA/CD', 'Collision detection used by wired Ethernet.', 'Обнаружение коллизий в проводном Ethernet.'],
    ['CSMA/CA', 'Collision avoidance used by Wi-Fi.', 'Предотвращение коллизий в Wi-Fi.'],
  ],
  questions: [
    { o: '4.1', d: 1, q: 'At which OSI layer do routers primarily operate?', a: ['Network (Layer 3)', 'Data Link (Layer 2)', 'Transport (Layer 4)', 'Physical (Layer 1)'], c: 0,
      e: 'Routers make forwarding decisions based on IP addresses (Layer 3). Switches work at Layer 2.',
      r: 'Маршрутизаторы принимают решения по IP-адресам (уровень 3); коммутаторы — уровень 2.' },
    { o: '4.1', d: 1, q: 'Which OSI layer is responsible for converting data formats and encryption/compression?', a: ['Presentation', 'Session', 'Application', 'Transport'], c: 0,
      e: 'Layer 6 (Presentation) handles translation, encryption and compression.',
      r: 'Уровень 6 (представления) отвечает за преобразование, шифрование и сжатие.' },
    { o: '4.1', d: 2, q: 'ARP poisoning attacks operate at which OSI layer?', a: ['Data Link (Layer 2)', 'Network (Layer 3)', 'Transport (Layer 4)', 'Application (Layer 7)'], c: 0,
      e: 'ARP maps IP addresses to MAC addresses on the local segment, which is Layer 2 (often described as 2/3). It has no authentication.',
      r: 'ARP сопоставляет IP и MAC в локальном сегменте — уровень 2 (иногда 2/3); аутентификации нет.' },
    { o: '4.1', d: 1, q: 'What is the correct order of the TCP three-way handshake?', a: ['SYN, SYN/ACK, ACK', 'SYN, ACK, SYN/ACK', 'ACK, SYN, FIN', 'SYN, SYN, ACK/FIN'], c: 0,
      e: 'The client sends SYN, the server responds SYN/ACK, and the client sends ACK.',
      r: 'Клиент — SYN, сервер — SYN/ACK, клиент — ACK.' },
    { o: '4.1', d: 2, q: 'An attacker sends many TCP SYN packets with spoofed source addresses, filling the server\'s connection table. Which countermeasure is MOST effective?', a: ['SYN cookies', 'Disabling ICMP', 'Port security on switches', 'WPA3'], c: 0,
      e: 'With SYN cookies, the server avoids allocating state until the handshake completes.',
      r: 'SYN cookies позволяют серверу не выделять ресурсы до завершения рукопожатия.' },
    { o: '4.1', d: 2, q: 'An attacker sends ICMP echo requests to a network\'s broadcast address with the victim\'s IP as source. This is a:', a: ['Smurf attack', 'Fraggle attack', 'Teardrop attack', 'LAND attack'], c: 0,
      e: 'Smurf uses ICMP broadcast amplification. Fraggle is the UDP variant.',
      r: 'Smurf — усиление через ICMP broadcast; Fraggle — вариант с UDP.' },
    { o: '4.1', d: 2, q: 'Which IPsec component provides confidentiality?', a: ['Encapsulating Security Payload (ESP)', 'Authentication Header (AH)', 'Internet Key Exchange (IKE)', 'Security Parameter Index (SPI)'], c: 0,
      e: 'ESP encrypts the payload (and can authenticate it). AH provides integrity and authentication only, without encryption.',
      r: 'ESP шифрует (и может аутентифицировать); AH даёт только целостность и аутентификацию.' },
    { o: '4.3', d: 2, q: 'Two branch offices need a VPN between their gateways that encrypts the entire original IP packet, including headers. Which IPsec mode should be used?', a: ['Tunnel mode', 'Transport mode', 'AH-only mode', 'Aggressive mode'], c: 0,
      e: 'Tunnel mode encapsulates the whole original packet inside a new IP header, which is the standard for gateway-to-gateway VPNs.',
      r: 'Туннельный режим инкапсулирует весь исходный пакет в новый IP-заголовок — стандарт для VPN шлюз-шлюз.' },
    { o: '4.1', d: 2, q: 'What does DNSSEC provide?', a: ['Integrity and origin authentication of DNS responses', 'Confidentiality of DNS queries', 'Protection against DDoS on DNS servers', 'Load balancing of DNS traffic'], c: 0,
      e: 'DNSSEC signs records to prevent cache poisoning. It does NOT encrypt queries; DoH and DoT do that.',
      r: 'DNSSEC подписывает записи против отравления кеша, но НЕ шифрует запросы (это делают DoH/DoT).' },
    { o: '4.2', d: 2, q: 'Which firewall type inspects traffic at the application layer and requires a separate component for each protocol?', a: ['Application-level proxy firewall', 'Static packet filter', 'Stateful inspection firewall', 'Circuit-level proxy'], c: 0,
      e: 'Application proxies understand each protocol (HTTP, FTP…) and inspect its content. They are the most granular but slowest.',
      r: 'Прокси прикладного уровня понимают каждый протокол и анализируют содержимое — самые детальные, но медленные.' },
    { o: '4.2', d: 2, q: 'Which firewall type allows return traffic only if it matches an established connection in its state table?', a: ['Stateful inspection firewall', 'Static packet filter', 'Application-level proxy', 'Circuit-level proxy'], c: 0,
      e: 'Stateful firewalls track sessions and dynamically allow matching return traffic.',
      r: 'Stateful МЭ отслеживает сессии и динамически пропускает ответный трафик.' },
    { o: '4.2', d: 2, q: 'An IDS that detects deviations from a learned baseline of normal traffic is:', a: ['Anomaly (behavior) based', 'Signature based', 'Rule based on known exploits', 'Host based only'], c: 0,
      e: 'Anomaly-based detection can catch novel or zero-day attacks but produces more false positives. Signature-based detection only catches known patterns.',
      r: 'Аномальный метод может поймать новые атаки, но даёт больше ложных срабатываний; сигнатурный — только известные.' },
    { o: '4.2', d: 2, q: 'Where should a company place its public web server?', a: ['In a screened subnet (DMZ)', 'On the internal LAN', 'Directly on the internet with no firewall', 'On the same VLAN as the database servers'], c: 0,
      e: 'A DMZ isolates publicly accessible systems from the internal network.',
      r: 'DMZ изолирует публично доступные системы от внутренней сети.' },
    { o: '4.2', d: 2, q: 'Which technology checks that a device has current antivirus and patches before allowing it onto the network?', a: ['Network Access Control (NAC)', 'Stateful firewall', 'VLAN tagging', 'DNSSEC'], c: 0,
      e: 'NAC performs a posture assessment (pre-admission) and quarantines non-compliant devices.',
      r: 'NAC проверяет состояние устройства до допуска и помещает несоответствующие в карантин.' },
    { o: '4.1', d: 2, q: 'In an 802.1X deployment, which component is the wireless access point?', a: ['Authenticator', 'Supplicant', 'Authentication server', 'Certificate authority'], c: 0,
      e: 'The supplicant is the client, the authenticator is the AP or switch, and the authentication server is RADIUS.',
      r: 'Supplicant — клиент, authenticator — AP или коммутатор, authentication server — RADIUS.' },
    { o: '4.1', d: 2, q: 'Which EAP method provides the STRONGEST authentication by requiring certificates on both the client and the server?', a: ['EAP-TLS', 'PEAP', 'LEAP', 'EAP-MD5'], c: 0,
      e: 'EAP-TLS uses mutual certificate authentication. PEAP and TTLS need only a server certificate. LEAP and MD5 are weak.',
      r: 'EAP-TLS — взаимная аутентификация по сертификатам; PEAP/TTLS — только серверный сертификат; LEAP и MD5 слабые.' },
    { o: '4.1', d: 2, q: 'Which wireless security protocol replaced the pre-shared key handshake with Simultaneous Authentication of Equals (SAE)?', a: ['WPA3', 'WPA2', 'WPA', 'WEP'], c: 0,
      e: 'WPA3-Personal uses SAE (Dragonfly), which resists offline dictionary attacks and provides forward secrecy.',
      r: 'WPA3-Personal использует SAE (Dragonfly): устойчивость к офлайн-подбору и прямая секретность.' },
    { o: '4.1', d: 1, q: 'Which wireless protocol is considered broken because of its weak RC4 implementation and 24-bit IV?', a: ['WEP', 'WPA2-CCMP', 'WPA3', '802.1X'], c: 0,
      e: 'WEP can be cracked within minutes. Never use it.',
      r: 'WEP взламывается за минуты; не использовать.' },
    { o: '4.1', d: 2, q: 'An attacker sets up an access point with the same SSID as the corporate network to capture credentials. This is:', a: ['An evil twin attack', 'Bluejacking', 'War chalking', 'A replay attack'], c: 0,
      e: 'An evil twin impersonates a legitimate AP. Mutual authentication (EAP-TLS) and user training help.',
      r: 'Evil twin выдаёт себя за легитимную AP. Помогают взаимная аутентификация (EAP-TLS) и обучение.' },
    { o: '4.1', d: 2, q: 'Unauthorized access to a phone\'s contacts and messages via Bluetooth is called:', a: ['Bluesnarfing', 'Bluejacking', 'Bluebugging', 'Bluesmacking'], c: 0,
      e: 'Bluesnarfing is data theft. Bluejacking is unsolicited messages. Bluebugging is taking control of the device.',
      r: 'Bluesnarfing — кража данных; bluejacking — непрошеные сообщения; bluebugging — захват управления.' },
    { o: '4.2', d: 2, q: 'An attacker floods a switch with fake MAC addresses so that it starts broadcasting all frames. Which control prevents this?', a: ['Port security limiting MAC addresses per port', 'DNSSEC', 'Disabling ICMP', 'Stateful firewall'], c: 0,
      e: 'MAC flooding overflows the CAM table. Port security limits the number of learned MACs per port.',
      r: 'MAC-флуд переполняет CAM-таблицу; port security ограничивает число MAC на порт.' },
    { o: '4.1', d: 3, q: 'An attacker sends frames with two 802.1Q tags to reach a VLAN they are not assigned to. What is the BEST mitigation?', a: ['Change the native VLAN to an unused VLAN and disable auto-trunking', 'Enable WPA3', 'Use stronger passwords', 'Install antivirus on hosts'], c: 0,
      e: 'Double-tagging abuses the native VLAN. Setting an unused native VLAN and disabling DTP and trunk negotiation prevents VLAN hopping.',
      r: 'Двойное тегирование использует native VLAN; неиспользуемый native VLAN и отключение DTP предотвращают VLAN hopping.' },
    { o: '4.1', d: 2, q: 'What is the defining characteristic of Software-Defined Networking (SDN)?', a: ['Separation of the control plane from the data plane', 'Use of fiber optic cabling', 'Elimination of routers', 'Mandatory encryption of all traffic'], c: 0,
      e: 'SDN centralizes control in a controller that programs the forwarding devices. Protect the controller well.',
      r: 'SDN централизует управление в контроллере, программирующем устройства пересылки; контроллер надо защищать.' },
    { o: '4.1', d: 2, q: 'Which protocol carries SCSI commands over IP networks?', a: ['iSCSI', 'FCoE', 'MPLS', 'SIP'], c: 0,
      e: 'iSCSI runs over TCP/IP (port 3260). FCoE runs Fibre Channel directly over Ethernet, not IP.',
      r: 'iSCSI работает поверх TCP/IP (порт 3260); FCoE — Fibre Channel напрямую поверх Ethernet, без IP.' },
    { o: '4.3', d: 2, q: 'Which protocol should be used to protect the confidentiality of VoIP voice streams?', a: ['SRTP', 'SIP over UDP', 'H.323 without encryption', 'SNMPv2'], c: 0,
      e: 'SRTP encrypts the media (RTP) stream. SIP signaling should be protected with TLS (SIPS).',
      r: 'SRTP шифрует медиапоток (RTP); сигнализацию SIP защищают TLS (SIPS).' },
    { o: '4.2', d: 2, q: 'Which transmission medium is MOST resistant to EMI and eavesdropping?', a: ['Fiber optic', 'Unshielded twisted pair', 'Coaxial cable', 'Wireless 802.11'], c: 0,
      e: 'Fiber transmits light, so it is immune to EMI and very hard to tap without detection.',
      r: 'Оптика передаёт свет: невосприимчива к ЭМП, к ней трудно незаметно подключиться.' },
    { o: '4.2', d: 1, q: 'Which network topology provides the MOST redundancy?', a: ['Full mesh', 'Star', 'Bus', 'Ring'], c: 0,
      e: 'In a full mesh every node connects to every other node, so there is no single point of failure, but it is expensive.',
      r: 'В полном mesh каждый узел связан с каждым: нет единой точки отказа, но дорого.' },
    { o: '4.3', d: 2, q: 'Which AAA protocol encrypts the entire packet payload and separates authentication, authorization and accounting?', a: ['TACACS+', 'RADIUS', 'PAP', 'Kerberos'], c: 0,
      e: 'TACACS+ (TCP 49) encrypts everything and separates the three As. RADIUS (UDP) encrypts only the password.',
      r: 'TACACS+ (TCP 49) шифрует всё и разделяет три A; RADIUS (UDP) шифрует только пароль.' },
    { o: '4.3', d: 1, q: 'Which remote authentication protocol sends credentials in cleartext and should never be used?', a: ['PAP', 'CHAP', 'EAP-TLS', 'MS-CHAPv2 inside PEAP'], c: 0,
      e: 'PAP transmits the password in cleartext. CHAP uses a challenge-response hash.',
      r: 'PAP передаёт пароль открытым текстом; CHAP использует хеш «запрос-ответ».' },
    { o: '4.3', d: 2, q: 'A remote worker\'s VPN sends internet-bound traffic directly through their home ISP while corporate traffic goes through the tunnel. What is the PRIMARY risk?', a: ['The endpoint bypasses corporate security controls and can bridge threats into the corporate network', 'VPN throughput is reduced', 'Corporate traffic is not encrypted', 'DNS stops working'], c: 0,
      e: 'Split tunneling bypasses corporate inspection. A compromised endpoint can act as a bridge into the network.',
      r: 'Split tunneling обходит корпоративную инспекцию; скомпрометированная конечная точка может стать мостом в сеть.' },
    { o: '4.3', d: 2, q: 'What is the MOST secure way to provide administrators remote access to internal servers via RDP?', a: ['Through a VPN or RD gateway with MFA, never exposing RDP directly to the internet', 'Open TCP 3389 on the firewall to the internet', 'Use a non-standard port for RDP', 'Rely on complex passwords alone'], c: 0,
      e: 'Directly exposed RDP is a top ransomware vector. Use a VPN, gateway or jump host with MFA. Changing the port is only obscurity.',
      r: 'Открытый RDP — главный вектор вымогателей. Используйте VPN, шлюз или jump-хост с MFA; смена порта — лишь сокрытие.' },
    { o: '4.1', d: 2, q: 'Which property ensures that compromise of a server\'s long-term private key does not allow decryption of previously recorded TLS sessions?', a: ['Perfect forward secrecy', 'Certificate pinning', 'OCSP stapling', 'Key escrow'], c: 0,
      e: 'Forward secrecy uses ephemeral DH keys per session, and TLS 1.3 mandates it.',
      r: 'Прямая секретность использует эфемерные ключи DH для каждой сессии; TLS 1.3 её требует.' },
    { o: '4.1', d: 1, q: 'Which protocol should replace Telnet for secure remote administration?', a: ['SSH', 'FTP', 'SNMPv1', 'TFTP'], c: 0,
      e: 'SSH encrypts the session, while Telnet sends everything in cleartext.',
      r: 'SSH шифрует сессию; Telnet всё передаёт открытым текстом.' },
    { o: '4.1', d: 3, q: 'A security team notices IPv6 traffic tunneled inside IPv4 on a network that has only IPv4 firewall rules. What is the PRIMARY concern?', a: ['Tunneled IPv6 can bypass IPv4-only security controls and monitoring', 'IPv6 uses weaker encryption', 'IPv6 addresses are easier to spoof', 'Tunneling always causes a DoS'], c: 0,
      e: 'Transition mechanisms (6to4, Teredo) can create blind spots. Security tools must be IPv6-aware, or tunneling must be blocked.',
      r: 'Механизмы перехода (6to4, Teredo) создают «слепые зоны»; средства защиты должны понимать IPv6, либо туннели нужно блокировать.' },
    { o: '4.2', d: 3, q: 'A company wants to stop attacks that move laterally between workloads in the same data-center VLAN. What is the BEST approach?', a: ['Micro-segmentation with workload-level policies', 'A larger perimeter firewall', 'Increasing VLAN size', 'Disabling logging between servers'], c: 0,
      e: 'Micro-segmentation enforces east-west policy between individual workloads, which is a key zero trust technique.',
      r: 'Микросегментация применяет политику «восток-запад» между отдельными нагрузками — ключевая техника zero trust.' },
    { t: 'order', o: '4.1', d: 1, q: 'Order the OSI layers from Layer 1 (bottom) to Layer 7 (top).', items: ['Physical', 'Data Link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'],
      e: 'Please Do Not Throw Sausage Pizza Away.', r: 'Please Do Not Throw Sausage Pizza Away.' },
    { t: 'match', o: '4.1', d: 2, q: 'Match each device to the OSI layer at which it primarily operates.', pairs: [['Hub', 'Layer 1 — Physical'], ['Switch', 'Layer 2 — Data Link'], ['Router', 'Layer 3 — Network'], ['WAF', 'Layer 7 — Application']],
      e: 'Hub = bits, switch = frames/MAC, router = packets/IP, WAF = HTTP content.', r: 'Hub — биты, switch — кадры/MAC, router — пакеты/IP, WAF — содержимое HTTP.' },
    { t: 'match', o: '4.1', d: 2, q: 'Match the port to its service.', pairs: [['22', 'SSH'], ['53', 'DNS'], ['443', 'HTTPS'], ['3389', 'RDP'], ['389', 'LDAP']],
      e: 'Memorize the common well-known ports.', r: 'Выучите основные well-known порты.' },
  ],
});
