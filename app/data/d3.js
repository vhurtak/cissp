'use strict';
CISSP.domain({
  id: 3, weight: 13,
  title: { en: 'Security Architecture and Engineering', ru: 'Архитектура и инженерия безопасности' },
  summary: {
    en: 'Secure design principles, formal security models, evaluation criteria, system capabilities, architecture vulnerabilities (cloud, IoT, ICS), cryptography and PKI, cryptanalytic attacks, and physical/facility security.',
    ru: 'Принципы безопасного проектирования, формальные модели, критерии оценки, возможности систем, уязвимости архитектур (облака, IoT, АСУ ТП), криптография и PKI, криптоаналитические атаки, физическая безопасность.',
  },
  objectives: [
    ['3.1', 'Research, implement, and manage engineering processes using secure design principles'],
    ['3.2', 'Understand the fundamental concepts of security models (Biba, Star Model, Bell-LaPadula)'],
    ['3.3', 'Select controls based upon systems security requirements'],
    ['3.4', 'Understand security capabilities of Information Systems (memory protection, TPM, encryption/decryption)'],
    ['3.5', 'Assess and mitigate the vulnerabilities of security architectures, designs, and solution elements'],
    ['3.6', 'Select and determine cryptographic solutions'],
    ['3.7', 'Understand methods of cryptanalytic attacks'],
    ['3.8', 'Apply security principles to site and facility design'],
    ['3.9', 'Design site and facility security controls'],
    ['3.10', 'Manage the information system lifecycle'],
  ],
  concepts: [
    {
      t: { en: 'Secure design principles', ru: 'Принципы безопасного проектирования' },
      b: {
        en: `<ul><li><b>Threat modeling</b> early. <b>Least privilege</b>. <b>Defense in depth</b> (layered controls). <b>Separation of duties</b>.</li>
<li><b>Secure defaults</b>: secure out of the box (deny by default).</li>
<li><b>Fail securely</b>: on failure, stay in a secure state. <b>Fail-secure / fail-closed</b> (a door stays locked, a firewall blocks) protects assets. <b>Fail-safe / fail-open</b> protects <b>people</b> (fire exits unlock). When life safety is involved, fail-safe wins.</li>
<li><b>Keep it simple</b> (economy of mechanism): complexity is the enemy of security.</li>
<li><b>Zero Trust</b>: "never trust, always verify". No implicit trust based on network location. Every request is authenticated, authorized and continuously evaluated (NIST SP 800-207: policy engine, policy administrator, policy enforcement point). Uses micro-segmentation.</li>
<li><b>Trust but verify</b>: the traditional perimeter model that zero trust replaces.</li>
<li><b>Privacy by design</b> (Cavoukian's 7 principles): proactive, privacy as default, embedded into design, full functionality, end-to-end security, visibility, respect for the user.</li>
<li><b>Shared responsibility</b> (cloud) and <b>SASE</b> (Secure Access Service Edge: SD-WAN plus cloud-delivered security such as SWG, CASB, ZTNA and FWaaS).</li></ul>`,
        ru: `<ul><li><b>Моделирование угроз</b> на раннем этапе; <b>минимальные привилегии</b>; <b>эшелонированная защита</b>; <b>разделение обязанностей</b>.</li>
<li><b>Безопасность по умолчанию</b> — запрет по умолчанию.</li>
<li><b>Безопасный отказ</b>: при сбое оставаться в безопасном состоянии. <b>Fail-secure / fail-closed</b> (дверь заперта, МЭ блокирует) защищает активы. <b>Fail-safe / fail-open</b> защищает <b>людей</b> (пожарные выходы открываются). Если речь о жизни — fail-safe.</li>
<li><b>Простота</b> — сложность враг безопасности.</li>
<li><b>Zero Trust</b>: «никогда не доверяй, всегда проверяй». Нет неявного доверия по сетевому расположению; каждый запрос аутентифицируется, авторизуется и непрерывно оценивается (NIST SP 800-207: policy engine, policy administrator, policy enforcement point). Микросегментация.</li>
<li><b>Trust but verify</b> — традиционная периметровая модель, которую заменяет zero trust.</li>
<li><b>Privacy by design</b> (7 принципов Кавукян): проактивность, приватность по умолчанию, встроенность, полная функциональность, сквозная защита, прозрачность, уважение к пользователю.</li>
<li><b>Разделённая ответственность</b> (облака) и <b>SASE</b> (SD-WAN + облачная безопасность: SWG, CASB, ZTNA, FWaaS).</li></ul>`,
      },
    },
    {
      t: { en: 'Security models', ru: 'Модели безопасности' },
      b: {
        en: `<ul><li><b>Bell-LaPadula</b> (confidentiality, military): <i>no read up</i> (Simple Security Property), <i>no write down</i> (* Property), Strong * Property (read/write only at own level). Ignores integrity.</li>
<li><b>Biba</b> (integrity): <i>no read down</i> (Simple Integrity Axiom), <i>no write up</i> (* Integrity Axiom), no invoking subjects at a higher integrity level. Mnemonic: Biba is the inverse of BLP.</li>
<li><b>Clark-Wilson</b> (integrity, commercial): subjects access objects only through programs (an <b>access triple</b>: subject–program–object). Constrained Data Items (CDI), Unconstrained Data Items (UDI), Integrity Verification Procedures (IVP), Transformation Procedures (TP). Enforces well-formed transactions and separation of duties.</li>
<li><b>Brewer-Nash ("Chinese Wall")</b>: dynamic access control that prevents conflicts of interest. Once you access Bank A's data, Bank B's data becomes off-limits.</li>
<li><b>Graham-Denning</b>: 8 protection rules for creating and deleting subjects and objects and granting rights. <b>Harrison-Ruzzo-Ullman (HRU)</b>: extends it and addresses the integrity of access rights. <b>Take-Grant</b>: rights transfer as a graph (take, grant, create, remove).</li>
<li><b>State machine</b> (system always in a secure state), <b>information flow</b>, <b>noninterference</b> (high-level actions don't affect what low-level users see, which counters covert channels), and the <b>lattice-based</b> model (upper and lower bounds of access).</li></ul>`,
        ru: `<ul><li><b>Bell-LaPadula</b> (конфиденциальность, военные): <i>нельзя читать вверх</i> (Simple Security Property), <i>нельзя писать вниз</i> (* Property); Strong * — чтение и запись только на своём уровне. Целостность не учитывает.</li>
<li><b>Biba</b> (целостность): <i>нельзя читать вниз</i>, <i>нельзя писать вверх</i>, нельзя вызывать субъекты более высокого уровня. Biba — «зеркало» BLP.</li>
<li><b>Clark-Wilson</b> (целостность, коммерция): доступ к объектам только через программы (<b>тройка</b> субъект–программа–объект). CDI, UDI, IVP, TP. Корректные транзакции и разделение обязанностей.</li>
<li><b>Brewer-Nash («китайская стена»)</b>: динамический контроль, предотвращающий конфликт интересов. Получил доступ к данным банка A — данные банка B закрыты.</li>
<li><b>Graham-Denning</b>: 8 правил создания и удаления субъектов и объектов и передачи прав. <b>HRU</b> развивает её и учитывает целостность прав доступа. <b>Take-Grant</b>: передача прав как граф.</li>
<li><b>Машина состояний</b> (всегда безопасное состояние), <b>информационный поток</b>, <b>невмешательство</b> (действия высокого уровня не влияют на то, что видит низкий, — против скрытых каналов), <b>решётка</b> (верхние и нижние границы доступа).</li></ul>`,
      },
      w: ['secModels'],
    },
    {
      t: { en: 'Evaluation criteria and system authorization', ru: 'Критерии оценки и авторизация систем' },
      b: {
        en: `<p><b>Common Criteria (ISO/IEC 15408)</b>: the international standard for evaluating product security. A <b>Protection Profile (PP)</b> states what the customer needs. A <b>Security Target (ST)</b> states what the vendor claims. The <b>Target of Evaluation (TOE)</b> is the product being evaluated. <b>EAL1–EAL7</b> express evaluation assurance, i.e. how thoroughly the product was tested, <i>not</i> how secure it is.</p>
<p>Historic criteria: TCSEC (Orange Book, US, confidentiality only: D, C1, C2, B1, B2, B3, A1) and ITSEC (Europe, functionality and assurance rated separately).</p>
<p><b>Certification</b>: technical evaluation of the controls. <b>Accreditation / authorization</b>: management formally accepts the risk and approves operation (ATO).</p>`,
        ru: `<p><b>Common Criteria (ISO/IEC 15408)</b> — международный стандарт оценки безопасности продуктов. <b>Protection Profile (PP)</b> — что нужно заказчику; <b>Security Target (ST)</b> — что заявляет производитель; <b>TOE</b> — оцениваемый продукт. <b>EAL1–EAL7</b> — уровень доверия к оценке (насколько тщательно проверено), а <i>не</i> мера защищённости.</p>
<p>Исторические: TCSEC (Orange Book, США, только конфиденциальность: D, C1, C2, B1, B2, B3, A1), ITSEC (Европа, функциональность и доверие оцениваются отдельно).</p>
<p><b>Сертификация</b> — техническая оценка мер. <b>Аккредитация / авторизация</b> — руководство формально принимает риск и разрешает эксплуатацию (ATO).</p>`,
      },
      w: ['layers', { title: 'Common Criteria EAL', items: [
        { n: 'EAL1', t: 'Functionally tested', d: 'Some confidence needed; threats not serious.' },
        { n: 'EAL2', t: 'Structurally tested', d: 'Developer provides design info and test results.' },
        { n: 'EAL3', t: 'Methodically tested and checked', d: 'Moderate assurance; positive security engineering at design stage.' },
        { n: 'EAL4', t: 'Methodically designed, tested, and reviewed', d: 'Highest level economically feasible to retrofit to an existing product line; common for commercial OSs.' },
        { n: 'EAL5', t: 'Semi-formally designed and tested', d: 'Rigorous commercial development practices with specialist security engineering.' },
        { n: 'EAL6', t: 'Semi-formally verified design and tested', d: 'High-risk situations; high value assets.' },
        { n: 'EAL7', t: 'Formally verified design and tested', d: 'Extremely high-risk situations; formal methods.' },
      ] }],
    },
    {
      t: { en: 'Security capabilities of information systems', ru: 'Механизмы безопасности систем' },
      b: {
        en: `<ul><li><b>Trusted Computing Base (TCB)</b>: all hardware, firmware and software that enforce security. The <b>security perimeter</b> separates the TCB from everything else.</li>
<li><b>Reference monitor</b>: the abstract concept that mediates <b>all</b> access of subjects to objects. It must be tamper-proof, always invoked, and small enough to verify. The <b>security kernel</b> is its implementation.</li>
<li><b>Protection rings</b>: ring 0 = kernel (most privileged), rings 1–2 = drivers and OS services, ring 3 = user applications. Privileged and supervisor mode versus user mode.</li>
<li><b>Memory protection</b>: process isolation, ASLR, DEP/NX, virtual memory.</li>
<li><b>TPM</b> (Trusted Platform Module): a motherboard chip that stores keys, supports secure boot and measured boot (attestation), and full-disk encryption key sealing (BitLocker). An <b>HSM</b> is a dedicated tamper-resistant device for key generation and storage at scale. A <b>TEE / secure enclave</b> (Intel SGX, ARM TrustZone) isolates code and data in use.</li>
<li><b>Virtualization</b>: the hypervisor is Type 1 (bare metal) or Type 2 (hosted). Risks: VM escape, VM sprawl.</li></ul>`,
        ru: `<ul><li><b>TCB</b> — всё оборудование, прошивки и ПО, обеспечивающие безопасность; <b>периметр безопасности</b> отделяет TCB от остального.</li>
<li><b>Монитор обращений</b> — абстракция, опосредующая <b>все</b> обращения субъектов к объектам: защищён от вмешательства, вызывается всегда, достаточно мал для проверки. <b>Ядро безопасности</b> — его реализация.</li>
<li><b>Кольца защиты</b>: 0 — ядро (максимальные привилегии), 1–2 — драйверы и службы ОС, 3 — пользовательские приложения. Режим супервизора против пользовательского.</li>
<li><b>Защита памяти</b>: изоляция процессов, ASLR, DEP/NX, виртуальная память.</li>
<li><b>TPM</b> — чип на плате: хранение ключей, secure и measured boot (аттестация), привязка ключа шифрования диска (BitLocker). <b>HSM</b> — отдельное устойчивое к вскрытию устройство для генерации и хранения ключей в масштабе. <b>TEE / анклав</b> (SGX, TrustZone) изолирует код и данные в использовании.</li>
<li><b>Виртуализация</b>: гипервизор Type 1 (bare metal) и Type 2 (поверх ОС). Риски: VM escape, VM sprawl.</li></ul>`,
      },
    },
    {
      t: { en: 'Architecture vulnerabilities', ru: 'Уязвимости архитектур' },
      b: {
        en: `<ul><li><b>Database</b>: <b>aggregation</b> (combining low-sensitivity data reveals sensitive info) and <b>inference</b> (deducing sensitive info from available data). Countered by polyinstantiation, cell suppression, noise and perturbation, and views.</li>
<li><b>Covert channels</b>: <b>timing</b> (modulating resource timing) and <b>storage</b> (writing to shared storage). <b>TOCTOU</b> / race conditions. <b>Maintenance hooks / backdoors</b>.</li>
<li><b>ICS / SCADA / OT</b>: availability and safety first, legacy protocols (Modbus, DNP3) without authentication, long lifecycles. Use segmentation (Purdue model), unidirectional gateways, and careful patching.</li>
<li><b>IoT / embedded</b>: default credentials, no updates, weak crypto. Segment them and change defaults.</li>
<li><b>Cloud</b>: IaaS, PaaS, SaaS. Deployment models: public, private, community, hybrid. Watch for multitenancy, data remanence, and misconfiguration.</li>
<li><b>Containers / microservices / serverless</b>: image provenance, secrets management, orchestration security, API security.</li>
<li><b>Edge / fog computing</b>, <b>HPC</b>, <b>distributed systems</b>, <b>mobile</b>: each has its own attack surface.</li></ul>`,
        ru: `<ul><li><b>БД</b>: <b>агрегация</b> (сочетание малочувствительных данных раскрывает чувствительное) и <b>вывод (inference)</b> (логическое выведение секретов). Против — полиинстанцирование, подавление ячеек, шум и возмущение, представления (views).</li>
<li><b>Скрытые каналы</b>: <b>временные</b> (модуляция времени ресурсов) и <b>каналы памяти</b> (запись в общее хранилище). <b>TOCTOU</b> и гонки. <b>Отладочные «лазейки» / бэкдоры</b>.</li>
<li><b>АСУ ТП / SCADA / OT</b>: приоритет доступности и безопасности людей, устаревшие протоколы без аутентификации (Modbus, DNP3), долгий жизненный цикл. Сегментация (модель Purdue), однонаправленные шлюзы, осторожное обновление.</li>
<li><b>IoT / встраиваемые</b>: пароли по умолчанию, нет обновлений, слабая криптография. Сегментировать, менять умолчания.</li>
<li><b>Облака</b>: IaaS, PaaS, SaaS; модели развёртывания — публичное, частное, общественное, гибридное. Мультиарендность, остаточные данные, ошибки конфигурации.</li>
<li><b>Контейнеры / микросервисы / serverless</b>: происхождение образов, секреты, безопасность оркестрации и API.</li>
<li><b>Edge / fog</b>, <b>HPC</b>, <b>распределённые</b>, <b>мобильные</b> — свои поверхности атаки.</li></ul>`,
      },
      w: ['sharedResp'],
    },
    {
      t: { en: 'Symmetric cryptography', ru: 'Симметричная криптография' },
      b: {
        en: `<p>Symmetric crypto uses one shared secret key. It is fast and good for bulk data, but has a <b>key distribution problem</b> and <b>no nonrepudiation</b>. Number of keys = n(n−1)/2.</p>
<ul><li><b>DES</b>: 64-bit block, 56-bit key, broken. <b>3DES</b>: 112/168-bit effective, deprecated. <b>2DES</b> is vulnerable to meet-in-the-middle.</li>
<li><b>AES (Rijndael)</b>: 128-bit block, 128/192/256-bit keys. The current standard.</li>
<li>Others: Blowfish, Twofish, IDEA, RC5/RC6, Skipjack (Clipper chip, key escrow). <b>Stream ciphers</b>: RC4 (broken) and ChaCha20.</li>
<li><b>Modes</b>: <b>ECB</b> (identical blocks give identical ciphertext, never use), <b>CBC</b> (IV, chaining), <b>CFB/OFB</b> (stream-like), <b>CTR</b> (parallelizable), <b>GCM</b> (CTR + authentication, i.e. AEAD, used in TLS 1.3).</li></ul>
<p>Confusion (substitution) and diffusion (permutation) are Shannon's principles. The <b>work factor</b> is the effort needed to break the cipher.</p>`,
        ru: `<p>Симметричная криптография — один общий секретный ключ. Быстро, подходит для больших объёмов, но есть <b>проблема распределения ключей</b> и <b>нет неотказуемости</b>. Число ключей = n(n−1)/2.</p>
<ul><li><b>DES</b>: блок 64 бита, ключ 56 бит — взломан. <b>3DES</b>: эффективно 112/168 бит, устарел. <b>2DES</b> уязвим к meet-in-the-middle.</li>
<li><b>AES (Rijndael)</b>: блок 128 бит, ключи 128/192/256. Современный стандарт.</li>
<li>Другие: Blowfish, Twofish, IDEA, RC5/RC6, Skipjack (Clipper, депонирование ключей). <b>Потоковые</b>: RC4 (взломан), ChaCha20.</li>
<li><b>Режимы</b>: <b>ECB</b> (одинаковые блоки дают одинаковый шифртекст — не использовать), <b>CBC</b> (IV, сцепление), <b>CFB/OFB</b> (как поток), <b>CTR</b> (параллелизуется), <b>GCM</b> (CTR + аутентификация = AEAD, используется в TLS 1.3).</li></ul>
<p>Перемешивание (confusion, подстановка) и рассеивание (diffusion, перестановка) — принципы Шеннона. <b>Work factor</b> — трудоёмкость взлома.</p>`,
      },
      w: ['cipher'],
    },
    {
      t: { en: 'Asymmetric cryptography, hashing and signatures', ru: 'Асимметричная криптография, хеши и подписи' },
      b: {
        en: `<p>Asymmetric crypto uses a key pair: a <b>public key</b> (shared) and a <b>private key</b> (secret). It is slow and used for key exchange and signatures. Number of keys = 2n.</p>
<ul><li><b>Confidentiality</b>: encrypt with the <b>recipient's public</b> key, so only they can decrypt with their private key.</li>
<li><b>Signature (integrity, authenticity, nonrepudiation)</b>: hash the message, then encrypt the hash with the <b>sender's private</b> key. Anyone verifies with the sender's public key.</li>
<li><b>RSA</b>: based on factoring large primes. <b>ECC</b>: elliptic curves give the same strength with shorter keys (256-bit ECC ≈ 3072-bit RSA), good for mobile and IoT. <b>Diffie-Hellman</b>: key agreement over an insecure channel, no authentication by itself (MITM risk), discrete logarithm. <b>ElGamal</b>, <b>DSA</b>.</li>
<li><b>Hashing</b>: one-way, fixed length, integrity. MD5 (128-bit) and SHA-1 (160-bit) are broken for collisions. Use SHA-2 (SHA-256/384/512) or SHA-3. <b>HMAC</b> = hash + shared secret, giving integrity and authenticity but <b>not</b> nonrepudiation. Password storage uses <b>salted</b>, slow hashes (bcrypt, scrypt, Argon2, PBKDF2).</li>
<li><b>Hybrid crypto</b> (TLS): asymmetric to exchange a symmetric session key, symmetric for the data.</li>
<li><b>Post-quantum</b>: Shor's algorithm threatens RSA, ECC and DH. NIST standardized ML-KEM (FIPS 203), ML-DSA (FIPS 204) and SLH-DSA (FIPS 205) in 2024. Grover's algorithm halves symmetric strength, so use AES-256.</li></ul>`,
        ru: `<p>Пара ключей: <b>открытый</b> (публикуется) и <b>закрытый</b> (секретный). Медленно; для обмена ключами и подписей. Число ключей = 2n.</p>
<ul><li><b>Конфиденциальность</b>: шифруем <b>открытым ключом получателя</b>, расшифровать может только он своим закрытым.</li>
<li><b>Подпись (целостность, подлинность, неотказуемость)</b>: хеш сообщения шифруется <b>закрытым ключом отправителя</b>; проверяют его открытым ключом.</li>
<li><b>RSA</b> — факторизация больших чисел. <b>ECC</b> — эллиптические кривые: та же стойкость при меньших ключах (256 бит ECC ≈ 3072 бит RSA), хороши для мобильных устройств и IoT. <b>Диффи-Хеллман</b> — согласование ключа по открытому каналу, сам по себе без аутентификации (риск MITM), дискретный логарифм. <b>ElGamal</b>, <b>DSA</b>.</li>
<li><b>Хеширование</b>: одностороннее, фиксированная длина, целостность. MD5 (128) и SHA-1 (160) взломаны по коллизиям; использовать SHA-2 или SHA-3. <b>HMAC</b> = хеш + общий секрет: целостность и подлинность, но <b>не</b> неотказуемость. Пароли хранят с <b>солью</b> и медленными функциями (bcrypt, scrypt, Argon2, PBKDF2).</li>
<li><b>Гибридная схема</b> (TLS): асимметрия для обмена сессионным ключом, симметрия для данных.</li>
<li><b>Постквантовая</b>: алгоритм Шора угрожает RSA, ECC, DH. NIST в 2024 стандартизировал ML-KEM (FIPS 203), ML-DSA (204), SLH-DSA (205). Гровер вдвое ослабляет симметрию — использовать AES-256.</li></ul>`,
      },
      w: ['keyCount'],
    },
    {
      t: { en: 'Hashing in action', ru: 'Хеширование на практике' },
      b: { en: '<p>Change one character and watch the digest change completely. That is why a hash detects tampering.</p>', ru: '<p>Измените один символ — дайджест изменится полностью. Поэтому хеш обнаруживает подмену.</p>' },
      w: ['hashDemo'],
    },
    {
      t: { en: 'PKI and key management', ru: 'PKI и управление ключами' },
      b: {
        en: `<ul><li><b>CA</b> (Certificate Authority) signs certificates. The <b>RA</b> (Registration Authority) verifies identity for the CA. The trust chain runs root CA (kept offline) → intermediate CA → end-entity certificate.</li>
<li><b>X.509 certificate</b>: subject, public key, issuer, validity period, serial number, and the CA's signature.</li>
<li><b>Revocation</b>: <b>CRL</b> (periodically published list), <b>OCSP</b> (real-time query), <b>OCSP stapling</b> (the server attaches a fresh OCSP response). <b>Certificate pinning</b>.</li>
<li><b>Key lifecycle</b>: generation (strong RNG), distribution, storage (HSM), rotation, revocation, destruction. Use separate keys for separate purposes.</li>
<li><b>Key escrow</b>: a third party holds a copy of keys. <b>Key recovery</b>: recovery agents with <b>M of N control</b> (split knowledge plus dual control).</li>
<li><b>Applications</b>: TLS, S/MIME and PGP (web of trust) for email, code signing, IPsec, digital rights, blockchain.</li></ul>`,
        ru: `<ul><li><b>CA</b> подписывает сертификаты; <b>RA</b> проверяет личность для CA. Цепочка доверия: корневой CA (офлайн) → промежуточный → конечный сертификат.</li>
<li><b>X.509</b>: субъект, открытый ключ, издатель, срок действия, серийный номер, подпись CA.</li>
<li><b>Отзыв</b>: <b>CRL</b> (периодический список), <b>OCSP</b> (запрос в реальном времени), <b>OCSP stapling</b> (сервер прикладывает свежий ответ OCSP). <b>Пиннинг</b> сертификатов.</li>
<li><b>Жизненный цикл ключей</b>: генерация (надёжный ГСЧ), распределение, хранение (HSM), ротация, отзыв, уничтожение. Отдельные ключи для разных целей.</li>
<li><b>Депонирование (escrow)</b> — копия ключей у третьей стороны; <b>восстановление ключей</b> — агенты по схеме <b>M из N</b> (разделённое знание + двойной контроль).</li>
<li><b>Применение</b>: TLS, S/MIME и PGP (сеть доверия) для почты, подпись кода, IPsec, DRM, блокчейн.</li></ul>`,
      },
      w: ['flow', { title: { en: 'Digital signature: sign and verify', ru: 'ЭЦП: подпись и проверка' }, steps: [
        { t: { en: 'Hash message', ru: 'Хеш сообщения' }, d: { en: 'The sender computes H(m) with e.g. SHA-256.', ru: 'Отправитель вычисляет H(m), например SHA-256.' } },
        { t: { en: 'Sign with sender PRIVATE key', ru: 'Подписать ЗАКРЫТЫМ ключом' }, d: { en: 'Sig = Encrypt(H(m), sender private key). Only the sender can do this, which gives nonrepudiation.', ru: 'Подпись = шифрование H(m) закрытым ключом отправителя. Может только отправитель — неотказуемость.' } },
        { t: { en: 'Send m + Sig (+ cert)', ru: 'Отправить m + подпись (+ серт.)' }, d: { en: 'The signature does NOT provide confidentiality. Encrypt separately with the recipient\'s public key if needed.', ru: 'Подпись НЕ даёт конфиденциальности; при необходимости отдельно шифровать открытым ключом получателя.' } },
        { t: { en: 'Verify with sender PUBLIC key', ru: 'Проверить ОТКРЫТЫМ ключом' }, d: { en: 'The recipient decrypts Sig with the sender\'s public key (validated via the CA chain and revocation check) to recover H(m).', ru: 'Получатель расшифровывает подпись открытым ключом отправителя (проверенным по цепочке CA и отзыву).' } },
        { t: { en: 'Compare hashes', ru: 'Сравнить хеши' }, d: { en: 'Recompute H(m). If they match, the message wasn\'t altered and came from the key holder.', ru: 'Пересчитать H(m). Совпадает — сообщение не изменено и пришло от владельца ключа.' } },
      ] }],
    },
    {
      t: { en: 'Cryptanalytic attacks', ru: 'Криптоаналитические атаки' },
      b: {
        en: `<ul><li><b>Brute force</b>: try every key. Defeated by key length. <b>Dictionary</b>, <b>rainbow tables</b> (precomputed hashes, defeated by <b>salt</b>).</li>
<li><b>Ciphertext-only</b> (attacker has only ciphertext, the hardest), <b>known plaintext</b> (has plaintext/ciphertext pairs), <b>chosen plaintext</b> (can encrypt chosen input), <b>chosen ciphertext</b> (can decrypt chosen input).</li>
<li><b>Frequency analysis</b>: breaks simple substitution ciphers.</li>
<li><b>Birthday attack</b>: looks for hash collisions. A hash of n bits gives ~2<sup>n/2</sup> collision resistance.</li>
<li><b>Meet-in-the-middle</b>: the reason 2DES ≈ DES strength.</li>
<li><b>Side-channel</b> (timing, power, EM, acoustic), <b>fault injection</b>, <b>implementation attacks</b> (bugs, not math), <b>replay</b> (use nonces and timestamps), <b>pass-the-hash</b>, <b>Kerberos attacks</b> (golden/silver ticket, kerberoasting), <b>ransomware</b> (crypto used offensively).</li>
<li><b>Social engineering / rubber-hose</b>: coercing the key holder is often the easiest attack.</li></ul>`,
        ru: `<ul><li><b>Полный перебор</b> — против него длина ключа; <b>словарь</b>, <b>радужные таблицы</b> (предвычисленные хеши) — против них <b>соль</b>.</li>
<li><b>Только шифртекст</b> (самая трудная), <b>известный открытый текст</b> (есть пары), <b>выбранный открытый текст</b> (можно шифровать своё), <b>выбранный шифртекст</b> (можно расшифровывать своё).</li>
<li><b>Частотный анализ</b> ломает простую подстановку.</li>
<li><b>Атака «дней рождения»</b> — поиск коллизий; стойкость n-битного хеша к коллизиям ~2<sup>n/2</sup>.</li>
<li><b>Meet-in-the-middle</b> — поэтому 2DES ≈ DES.</li>
<li><b>Побочные каналы</b> (время, питание, ЭМ, акустика), <b>внедрение сбоев</b>, <b>атаки на реализацию</b> (ошибки, а не математика), <b>повтор</b> (защита: nonce и метки времени), <b>pass-the-hash</b>, <b>атаки на Kerberos</b> (golden/silver ticket, kerberoasting), <b>вымогатели</b>.</li>
<li><b>Социальная инженерия / «терморектальный криптоанализ»</b> — принуждение владельца ключа часто проще всего.</li></ul>`,
      },
    },
    {
      t: { en: 'Site and facility design', ru: 'Проектирование площадки и здания' },
      b: {
        en: `<ul><li><b>Site selection</b>: crime rate, natural disaster risk (flood plains, fault lines), proximity to emergency services, visibility, utilities.</li>
<li><b>CPTED</b> (Crime Prevention Through Environmental Design): <b>natural access control</b> (landscaping, bollards guiding entry), <b>natural surveillance</b> (open sight lines, lighting, windows), <b>territorial reinforcement</b> (clear boundaries, signage, a sense of ownership). Also maintenance and activity support.</li>
<li><b>Server room / data center</b>: in the core of the building (not the top floor or basement), no exterior windows, single controlled entry, positive air pressure, raised floor, hot and cold aisles.</li>
<li><b>Layered physical defense</b>: perimeter → building → floor → room → rack.</li>
<li>Wiring closets and media storage get access control and environmental monitoring. Evidence storage needs restricted access and logs.</li></ul>`,
        ru: `<ul><li><b>Выбор площадки</b>: преступность, природные риски (поймы, разломы), близость экстренных служб, заметность, коммуникации.</li>
<li><b>CPTED</b>: <b>естественный контроль доступа</b> (ландшафт, столбики, направляющие ко входу), <b>естественное наблюдение</b> (открытые линии обзора, освещение, окна), <b>территориальное усиление</b> (чёткие границы, знаки, чувство принадлежности). Также обслуживание и поддержка активности.</li>
<li><b>Серверная / ЦОД</b>: в центре здания (не верхний этаж и не подвал), без внешних окон, один контролируемый вход, положительное давление воздуха, фальшпол, горячие и холодные коридоры.</li>
<li><b>Эшелонированная физическая защита</b>: периметр → здание → этаж → помещение → стойка.</li>
<li>Кроссовые и хранилища носителей — контроль доступа и мониторинг среды; хранилище доказательств — ограниченный доступ и журналы.</li></ul>`,
      },
    },
    {
      t: { en: 'Facility controls: fire, power, HVAC, perimeter', ru: 'Меры для объекта: пожар, питание, климат, периметр' },
      b: {
        en: `<p><b>Fire</b> needs fuel, heat and oxygen, plus the chemical reaction (the tetrahedron). Detection: ionization or photoelectric smoke detectors, heat detectors (rate-of-rise or fixed temperature), flame detectors.</p>
<p><b>Water suppression</b>: <b>wet pipe</b> (always filled, fastest, risk of leaks and freezing), <b>dry pipe</b> (air pressure, for cold areas), <b>pre-action</b> (dry until detection, then fills, and a head must melt — <b>best for data centers</b>), <b>deluge</b> (all heads open, for high-hazard areas). <b>Gas</b>: FM-200, Inergen, CO₂ (dangerous to people). Halon is banned (ozone).</p>
<p><b>Power</b>: <b>fault</b> (momentary loss), <b>blackout</b> (prolonged loss), <b>sag</b> (momentary low voltage), <b>brownout</b> (prolonged low), <b>spike</b> (momentary high), <b>surge</b> (prolonged high), <b>inrush</b>, and noise (EMI, RFI). Controls: UPS (short-term), generator (long-term), surge protectors, power conditioners.</p>
<p><b>HVAC</b>: ~18–27°C (64.4–80.6°F) per ASHRAE. Humidity 40–60%: too low causes static, too high causes corrosion and condensation.</p>
<p><b>Perimeter</b>: fences 3–4 ft (1 m) deter casual trespassers, 6–7 ft (2 m) are too hard to climb easily, 8 ft (2.4 m) + barbed wire deter determined intruders. Bollards, lighting, guards (discretion and judgment), dogs, CCTV, mantraps/access control vestibules (prevent tailgating), turnstiles, locks (preset, cipher, smart), badges and proximity cards, intrusion alarms.</p>`,
        ru: `<p><b>Пожар</b> = топливо + тепло + кислород (+ цепная реакция — тетраэдр). Обнаружение: ионизационные и фотоэлектрические дымовые, тепловые (по скорости роста или фиксированной температуре), извещатели пламени.</p>
<p><b>Водяное тушение</b>: <b>wet pipe</b> (всегда заполнено, быстрее всего, риск протечек и замерзания), <b>dry pipe</b> (под давлением воздуха, для холодных зон), <b>pre-action</b> (сухо до срабатывания датчика, затем заполняется, и должен расплавиться спринклер — <b>лучше для ЦОД</b>), <b>deluge</b> (все головки открыты, для высокоопасных зон). <b>Газ</b>: FM-200, Inergen, CO₂ (опасен для людей). Галон запрещён (озон).</p>
<p><b>Питание</b>: <b>fault</b> (кратковременное пропадание), <b>blackout</b> (длительное), <b>sag</b> (кратковременная просадка), <b>brownout</b> (длительная просадка), <b>spike</b> (кратковременный скачок), <b>surge</b> (длительное повышение), <b>inrush</b>, помехи (EMI, RFI). Меры: ИБП (кратковременно), генератор (долговременно), сетевые фильтры, стабилизаторы.</p>
<p><b>Климат</b>: ~18–27°C (ASHRAE), влажность 40–60%: ниже — статика, выше — коррозия и конденсат.</p>
<p><b>Периметр</b>: забор 1 м отпугивает случайных, 2 м трудно перелезть, 2,4 м + колючая проволока — против решительных нарушителей. Столбики, освещение, охрана (умеет принимать решения), собаки, CCTV, шлюзы (против tailgating), турникеты, замки, бейджи и proximity-карты, сигнализация.</p>`,
      },
      w: ['compare', { title: { en: 'Fire classes (US) and suppression', ru: 'Классы пожаров (США) и тушение' }, cols: ['Class', 'Fuel', 'Suppression'], rows: [
        ['A', 'Common combustibles (paper, wood)', 'Water, soda acid'],
        ['B', 'Flammable liquids, gases', 'CO₂, foam, dry powder, gas (FM-200)'],
        ['C', 'Electrical equipment', 'CO₂, gas (FM-200), non-conductive agents. NO water'],
        ['D', 'Combustible metals', 'Dry powder'],
        ['K', 'Kitchen oils, fats', 'Wet chemical'],
      ] }],
    },
    {
      t: { en: 'Information system lifecycle', ru: 'Жизненный цикл информационной системы' },
      b: { en: '<p>Security is built in at every stage of the system lifecycle (ISO/IEC/IEEE 15288, NIST SP 800-160), not bolted on.</p>', ru: '<p>Безопасность закладывается на каждом этапе жизненного цикла системы (ISO/IEC/IEEE 15288, NIST SP 800-160), а не «прикручивается» потом.</p>' },
      w: ['flow', { title: { en: 'System lifecycle', ru: 'Жизненный цикл системы' }, steps: [
        { t: 'Stakeholder needs & requirements', d: 'Capture business needs and security/privacy requirements; classify information.' },
        { t: 'Architecture & design', d: 'Apply secure design principles, threat modeling, select controls.' },
        { t: 'Development / implementation', d: 'Secure coding, hardened components, supply chain checks.' },
        { t: 'Verification & validation', d: 'Testing that controls meet requirements; certification.' },
        { t: 'Transition / deployment', d: 'Secure configuration, accreditation/authorization (ATO), training.' },
        { t: 'Operations & maintenance', d: 'Patching, monitoring, change and configuration management, continuous monitoring.' },
        { t: 'Retirement / disposal', d: 'Data retention/migration, media sanitization, decommissioning, update inventory.' },
      ] }],
    },
  ],
  terms: [
    ['Bell-LaPadula', 'Confidentiality model: no read up, no write down.', 'Модель конфиденциальности: не читать вверх, не писать вниз.'],
    ['Biba', 'Integrity model: no read down, no write up.', 'Модель целостности: не читать вниз, не писать вверх.'],
    ['Clark-Wilson', 'Integrity model using access triples (subject–program–object) and well-formed transactions.', 'Модель целостности: тройки субъект–программа–объект, корректные транзакции.'],
    ['Brewer-Nash', 'Chinese Wall model preventing conflicts of interest dynamically.', '«Китайская стена»: динамически предотвращает конфликт интересов.'],
    ['Reference monitor', 'Abstract machine mediating all subject-to-object access; tamperproof, always invoked, verifiable.', 'Абстрактный механизм, опосредующий все обращения.'],
    ['Security kernel', 'Hardware/software implementation of the reference monitor.', 'Реализация монитора обращений.'],
    ['TCB', 'Trusted Computing Base — all protection mechanisms enforcing security policy.', 'Совокупность механизмов, обеспечивающих политику безопасности.'],
    ['TPM', 'Motherboard chip for key storage, secure/measured boot, attestation.', 'Чип на плате для ключей, доверенной загрузки, аттестации.'],
    ['HSM', 'Hardware Security Module: tamper-resistant device for generating and storing keys.', 'Аппаратный модуль для генерации и хранения ключей.'],
    ['EAL', 'Common Criteria Evaluation Assurance Level 1–7 (depth of testing).', 'Уровень доверия к оценке Common Criteria 1–7.'],
    ['Aggregation', 'Combining non-sensitive data to derive sensitive information.', 'Сочетание несекретных данных для получения секретных.'],
    ['Inference', 'Deducing sensitive information from available data.', 'Логическое выведение секретной информации.'],
    ['Polyinstantiation', 'Multiple records with the same key at different classification levels to prevent inference.', 'Несколько записей с одним ключом на разных уровнях против inference.'],
    ['Covert channel', 'Unintended communication path: timing or storage.', 'Непредусмотренный канал связи: временной или канал памяти.'],
    ['TOCTOU', 'Time-of-check to time-of-use race condition.', 'Гонка между проверкой и использованием.'],
    ['AES', 'Symmetric block cipher (Rijndael), 128-bit block, 128/192/256-bit keys.', 'Симметричный блочный шифр, блок 128, ключи 128/192/256.'],
    ['ECB', 'Block mode where identical plaintext blocks give identical ciphertext — insecure.', 'Режим, где одинаковые блоки дают одинаковый шифртекст — небезопасен.'],
    ['GCM', 'Galois/Counter Mode: authenticated encryption (confidentiality + integrity).', 'Аутентифицированное шифрование (конфиденциальность + целостность).'],
    ['RSA', 'Asymmetric algorithm based on difficulty of factoring large primes.', 'Асимметричный алгоритм на сложности факторизации.'],
    ['ECC', 'Elliptic Curve Cryptography: strong security with short keys.', 'Криптография на эллиптических кривых: высокая стойкость при коротких ключах.'],
    ['Diffie-Hellman', 'Key agreement protocol over an insecure channel; vulnerable to MITM without authentication.', 'Согласование ключа по открытому каналу; без аутентификации уязвим к MITM.'],
    ['HMAC', 'Hash-based MAC using a shared key: integrity + authenticity, no nonrepudiation.', 'MAC на основе хеша с общим ключом: целостность и подлинность, без неотказуемости.'],
    ['Salt', 'Random value added to passwords before hashing to defeat rainbow tables.', 'Случайное значение к паролю перед хешированием против радужных таблиц.'],
    ['OCSP', 'Online Certificate Status Protocol: real-time revocation check.', 'Протокол онлайн-проверки статуса сертификата.'],
    ['CRL', 'Certificate Revocation List published by a CA.', 'Список отозванных сертификатов.'],
    ['Key escrow', 'Third party holds copies of encryption keys.', 'Хранение копий ключей третьей стороной.'],
    ['M of N control', 'Requires M of N authorized people to perform a key recovery operation.', 'Требует M из N уполномоченных для восстановления ключа.'],
    ['Birthday attack', 'Finding hash collisions; work ≈ 2^(n/2).', 'Поиск коллизий хеша; трудоёмкость ≈ 2^(n/2).'],
    ['Meet-in-the-middle', 'Attack that reduces double encryption (2DES) to near single strength.', 'Атака, сводящая двойное шифрование (2DES) почти к одинарному.'],
    ['CPTED', 'Crime Prevention Through Environmental Design: natural access control, surveillance, territorial reinforcement.', 'Предотвращение преступлений средствами среды.'],
    ['Pre-action sprinkler', 'Dry pipe that fills on detection and discharges when a head melts — preferred for data centers.', 'Сухая труба заполняется по датчику, срабатывает при плавлении головки — для ЦОД.'],
    ['Brownout', 'Prolonged low voltage.', 'Длительное пониженное напряжение.'],
    ['Surge', 'Prolonged high voltage.', 'Длительное повышенное напряжение.'],
    ['Zero Trust', 'Never trust, always verify; no implicit trust based on network location.', 'Никогда не доверяй, всегда проверяй; нет доверия по сетевому расположению.'],
    ['Fail-secure', 'On failure, system defaults to a secure (closed/locked) state.', 'При сбое система переходит в защищённое (закрытое) состояние.'],
    ['Fail-safe', 'On failure, defaults to protecting people (e.g., doors unlock).', 'При сбое приоритет — защита людей (двери открываются).'],
  ],
  questions: [
    { o: '3.2', d: 1, q: 'Which security model is primarily concerned with confidentiality and enforces "no read up, no write down"?', a: ['Bell-LaPadula', 'Biba', 'Clark-Wilson', 'Brewer-Nash'], c: 0,
      e: 'Bell-LaPadula is the military confidentiality model. Biba (integrity) is the reverse: no read down, no write up.',
      r: 'Bell-LaPadula — военная модель конфиденциальности. Biba (целостность) — наоборот: не читать вниз, не писать вверх.' },
    { o: '3.2', d: 2, q: 'In the Biba model, a subject at "Medium" integrity attempts to read an object at "Low" integrity. What happens?', a: ['Denied — no read down', 'Allowed — reading down is always permitted', 'Allowed only with a waiver', 'Denied — no read up'], c: 0,
      e: 'The Biba Simple Integrity Axiom forbids reading down, so that low-integrity data cannot contaminate the subject.',
      r: 'Simple Integrity Axiom в Biba запрещает читать вниз, чтобы низкоцелостные данные не «заразили» субъект.' },
    { o: '3.2', d: 2, q: 'A subject with Secret clearance attempts to write to a Confidential document under Bell-LaPadula. What is the result?', a: ['Denied by the * (star) property', 'Allowed by the simple security property', 'Allowed because writing down preserves integrity', 'Denied by the simple integrity axiom'], c: 0,
      e: 'The * property forbids writing down, which would leak Secret information into a lower classification.',
      r: '* property запрещает писать вниз: это была бы утечка секретной информации на более низкий уровень.' },
    { o: '3.2', d: 2, q: 'Which model enforces integrity by requiring users to access data only through approved programs (access triples) and well-formed transactions?', a: ['Clark-Wilson', 'Biba', 'Bell-LaPadula', 'Take-Grant'], c: 0,
      e: 'Clark-Wilson uses subject–program–object triples, Transformation Procedures and Integrity Verification Procedures. It is commercial-oriented.',
      r: 'Clark-Wilson — тройки субъект–программа–объект, TP и IVP; коммерческая ориентация.' },
    { o: '3.2', d: 2, q: 'A consulting firm must prevent a consultant who has worked on Bank A\'s data from accessing competitor Bank B\'s data. Which model applies?', a: ['Brewer-Nash (Chinese Wall)', 'Biba', 'Graham-Denning', 'Bell-LaPadula'], c: 0,
      e: 'Brewer-Nash dynamically changes access based on previous access to prevent conflicts of interest.',
      r: 'Brewer-Nash динамически меняет доступ по истории обращений, предотвращая конфликт интересов.' },
    { o: '3.2', d: 3, q: 'Which model ensures that actions at a higher security level do not affect what users at a lower level can observe, addressing covert channels?', a: ['Noninterference model', 'Take-Grant model', 'State machine model', 'Lattice model'], c: 0,
      e: 'Noninterference prevents high-level activity from being observable at lower levels, which defeats inference and covert channels.',
      r: 'Модель невмешательства не даёт наблюдать действия высокого уровня с низкого (против inference и скрытых каналов).' },
    { o: '3.4', d: 2, q: 'Which concept mediates every access attempt by subjects to objects and must be tamperproof, always invoked, and small enough to be verified?', a: ['Reference monitor', 'Security perimeter', 'Trusted platform module', 'Hypervisor'], c: 0,
      e: 'The reference monitor is the abstract concept. The security kernel implements it within the TCB.',
      r: 'Монитор обращений — абстракция; ядро безопасности реализует его внутри TCB.' },
    { o: '3.4', d: 1, q: 'In the protection ring model, which ring has the MOST privilege?', a: ['Ring 0', 'Ring 1', 'Ring 2', 'Ring 3'], c: 0,
      e: 'Ring 0 is the kernel (most privileged). Ring 3 is user applications.',
      r: 'Кольцо 0 — ядро (максимум привилегий), кольцо 3 — пользовательские приложения.' },
    { o: '3.4', d: 2, q: 'A laptop must ensure its disk encryption key is released only if the boot components have not been tampered with. Which component provides this?', a: ['Trusted Platform Module (TPM)', 'Hardware Security Module (HSM)', 'BIOS password', 'Self-encrypting drive alone'], c: 0,
      e: 'The TPM measures the boot chain into its PCRs and "seals" the key so that it is released only if the measurements match.',
      r: 'TPM измеряет цепочку загрузки в PCR и «запечатывает» ключ: выдаёт его, только если измерения совпадают.' },
    { o: '3.4', d: 2, q: 'What does a Common Criteria Evaluation Assurance Level (EAL) indicate?', a: ['How thoroughly the product was evaluated and tested', 'How secure the product is against all attacks', 'The number of security features in the product', 'The product\'s compliance with ISO 27001'], c: 0,
      e: 'The EAL expresses confidence in the evaluation (rigor and depth), not absolute security. It is measured against the Security Target claims.',
      r: 'EAL выражает доверие к оценке (глубина и строгость), а не абсолютную защищённость; измеряется относительно заявлений Security Target.' },
    { o: '3.3', d: 2, q: 'In Common Criteria, which document describes the security requirements a customer needs for a class of products?', a: ['Protection Profile', 'Security Target', 'Target of Evaluation', 'Evaluation Technical Report'], c: 0,
      e: 'A Protection Profile is the "I want" from customers. The Security Target is the "I will provide" from the vendor. The TOE is the product.',
      r: 'Protection Profile — «хочу» заказчика, Security Target — «обеспечу» производителя, TOE — продукт.' },
    { o: '3.10', d: 2, q: 'What is the difference between certification and accreditation?', a: ['Certification is the technical evaluation; accreditation is management\'s formal acceptance of risk to operate', 'They are identical terms', 'Accreditation is technical testing; certification is management approval', 'Certification applies only to hardware'], c: 0,
      e: 'Certification is the technical evaluation of the controls. Accreditation (authorization) is the official management decision to operate the system and accept the residual risk.',
      r: 'Сертификация — техническая оценка мер; аккредитация (авторизация) — официальное решение руководства эксплуатировать и принять остаточный риск.' },
    { o: '3.5', d: 2, q: 'A user with access to several unclassified databases combines the data to determine the location of a classified military unit. This is:', a: ['Aggregation', 'Polyinstantiation', 'Data mining permissions abuse', 'Covert timing channel'], c: 0,
      e: 'Aggregation combines low-sensitivity items into higher-sensitivity knowledge. Inference is deducing information by reasoning. Both are relevant here, but "combining" is the key word.',
      r: 'Агрегация — сочетание малочувствительных данных в более чувствительное знание. Inference — логический вывод. Ключевое слово — «сочетает».' },
    { o: '3.5', d: 3, q: 'Which database technique creates multiple records with the same primary key at different classification levels to prevent inference attacks?', a: ['Polyinstantiation', 'Normalization', 'Concurrency control', 'Tokenization'], c: 0,
      e: 'Polyinstantiation lets a low-cleared user see a cover-story record, so they can\'t infer that a classified record exists.',
      r: 'Полиинстанцирование показывает пользователю с низким допуском «легенду», чтобы он не догадался о секретной записи.' },
    { o: '3.5', d: 2, q: 'A process signals information by modulating its CPU usage so another process can observe the timing. This is a:', a: ['Covert timing channel', 'Covert storage channel', 'Maintenance hook', 'TOCTOU attack'], c: 0,
      e: 'Timing channels convey information by modulating the use of a resource over time. Storage channels write to a shared storage location.',
      r: 'Временной канал передаёт информацию модуляцией использования ресурса во времени; канал памяти — через общее хранилище.' },
    { o: '3.5', d: 2, q: 'What is the GREATEST security concern with industrial control systems (ICS/SCADA)?', a: ['Legacy protocols lacking authentication and the priority of availability/safety, which limits patching', 'Excessive use of encryption', 'Too many software updates', 'Lack of user interfaces'], c: 0,
      e: 'ICS often runs insecure legacy protocols (Modbus, DNP3) and cannot be patched or rebooted easily. Segmentation is key.',
      r: 'АСУ ТП используют небезопасные протоколы (Modbus, DNP3), их трудно обновлять и перезагружать. Ключ — сегментация.' },
    { o: '3.5', d: 2, q: 'In which cloud service model is the customer responsible for patching the guest operating system?', a: ['IaaS', 'SaaS', 'PaaS', 'None — the provider always patches the OS'], c: 0,
      e: 'In IaaS the customer manages the OS and everything above it. In PaaS and SaaS the provider manages the OS.',
      r: 'В IaaS клиент управляет ОС и всем выше; в PaaS и SaaS ОС управляет провайдер.' },
    { o: '3.5', d: 3, q: 'An attacker running code in a guest VM breaks out and executes commands on the hypervisor. This is called:', a: ['VM escape', 'VM sprawl', 'Hyperjacking via phishing', 'Side loading'], c: 0,
      e: 'VM escape compromises the isolation between guests and the host, which is one of the most severe virtualization risks.',
      r: 'VM escape нарушает изоляцию между гостями и хостом — один из самых серьёзных рисков виртуализации.' },
    { o: '3.1', d: 2, q: 'An electronic door lock on an emergency exit unlocks when power fails. This design is:', a: ['Fail-safe', 'Fail-secure', 'Fail-closed', 'Fail-soft'], c: 0,
      e: 'Fail-safe protects people by allowing exit. Fail-secure would keep the door locked to protect assets. Life safety wins.',
      r: 'Fail-safe защищает людей, позволяя выйти; fail-secure оставил бы дверь запертой ради активов. Жизнь важнее.' },
    { o: '3.1', d: 2, q: 'Which principle is the core of a Zero Trust architecture?', a: ['Never trust, always verify — no implicit trust based on network location', 'Trust all internal traffic and inspect only external traffic', 'Use a single strong perimeter firewall', 'Grant access once per day after VPN login'], c: 0,
      e: 'Zero Trust (NIST SP 800-207) removes implicit trust. Each request is authenticated and authorized using identity, device posture and context.',
      r: 'Zero Trust (NIST SP 800-207) убирает неявное доверие: каждый запрос аутентифицируется и авторизуется по идентичности, состоянию устройства и контексту.' },
    { o: '3.1', d: 3, q: 'In NIST SP 800-207, which Zero Trust component makes the access decision based on policy and inputs such as identity and threat intelligence?', a: ['Policy Engine', 'Policy Enforcement Point', 'Policy Administrator', 'Certificate Authority'], c: 0,
      e: 'The Policy Engine decides. The Policy Administrator establishes or tears down the session based on that decision. The PEP enables, monitors and terminates connections.',
      r: 'Policy Engine принимает решение; Policy Administrator устанавливает или разрывает сессию; PEP пропускает, контролирует и закрывает соединения.' },
    { o: '3.6', d: 1, q: 'How many keys are required for 10 users to communicate securely with each other using symmetric encryption?', a: ['45', '20', '10', '90'], c: 0,
      e: 'n(n−1)/2 = 10×9/2 = 45. With asymmetric crypto it would be 2n = 20.',
      r: 'n(n−1)/2 = 10×9/2 = 45. В асимметрии было бы 2n = 20.' },
    { o: '3.6', d: 1, q: 'Alice wants to send Bob a message that only Bob can read. Which key should she use to encrypt it?', a: ['Bob\'s public key', 'Alice\'s private key', 'Alice\'s public key', 'Bob\'s private key'], c: 0,
      e: 'For confidentiality, encrypt with the recipient\'s public key. Only Bob\'s private key can decrypt it.',
      r: 'Для конфиденциальности шифруют открытым ключом получателя; расшифровать может только закрытый ключ Боба.' },
    { o: '3.6', d: 2, q: 'Alice digitally signs a document. Which key does Bob use to verify the signature?', a: ['Alice\'s public key', 'Alice\'s private key', 'Bob\'s private key', 'A shared symmetric key'], c: 0,
      e: 'Alice signs with her private key, and anyone verifies with her public key.',
      r: 'Алиса подписывает закрытым ключом, проверяет любой её открытым ключом.' },
    { o: '3.6', d: 2, q: 'Which block cipher mode should NOT be used because identical plaintext blocks produce identical ciphertext blocks?', a: ['ECB', 'CBC', 'GCM', 'CTR'], c: 0,
      e: 'ECB leaks patterns (the famous "ECB penguin"). CBC, CTR and GCM use IVs or nonces.',
      r: 'ECB выдаёт закономерности («пингвин ECB»). CBC, CTR, GCM используют IV или nonce.' },
    { o: '3.6', d: 2, q: 'Which algorithm provides equivalent security to RSA with much shorter keys, making it ideal for mobile devices?', a: ['Elliptic Curve Cryptography (ECC)', 'Triple DES', 'Diffie-Hellman with 1024-bit keys', 'MD5'], c: 0,
      e: 'ECC achieves comparable strength with far smaller keys (≈256-bit ECC vs 3072-bit RSA), which saves CPU and battery.',
      r: 'ECC даёт сопоставимую стойкость при гораздо меньших ключах (≈256 бит против 3072 RSA), экономя CPU и батарею.' },
    { o: '3.6', d: 2, q: 'Which of the following provides integrity and authenticity but NOT nonrepudiation?', a: ['HMAC', 'Digital signature', 'RSA signature with SHA-256', 'ECDSA'], c: 0,
      e: 'HMAC uses a shared key, so either party could have generated it, and you can\'t prove which one did.',
      r: 'В HMAC общий ключ: создать мог любой из участников, авторство не доказуемо.' },
    { o: '3.6', d: 2, q: 'What is the PRIMARY weakness of the Diffie-Hellman key exchange on its own?', a: ['It does not authenticate the parties, so it is vulnerable to man-in-the-middle attacks', 'It requires a pre-shared key', 'It cannot generate symmetric keys', 'It is based on factoring large primes'], c: 0,
      e: 'Plain DH has no authentication. It is combined with certificates and signatures (e.g. in TLS) to prevent MITM.',
      r: 'Чистый DH не аутентифицирует стороны; его сочетают с сертификатами и подписями (как в TLS) против MITM.' },
    { o: '3.6', d: 2, q: 'Why are passwords hashed with a unique salt?', a: ['To defeat precomputed rainbow table attacks and make identical passwords hash differently', 'To allow the password to be decrypted later', 'To make hashing faster', 'To provide nonrepudiation'], c: 0,
      e: 'A salt makes each hash unique, so precomputed tables are useless and identical passwords aren\'t revealed.',
      r: 'Соль делает каждый хеш уникальным: предвычисленные таблицы бесполезны, одинаковые пароли не видны.' },
    { o: '3.6', d: 2, q: 'Which mechanism lets a web server provide a time-stamped, CA-signed certificate status to clients during the TLS handshake, reducing load on the CA?', a: ['OCSP stapling', 'CRL distribution point', 'Certificate pinning', 'Key escrow'], c: 0,
      e: 'With OCSP stapling, the server fetches and "staples" the OCSP response, which improves privacy and performance.',
      r: 'При OCSP stapling сервер сам получает ответ OCSP и прикладывает его — лучше приватность и производительность.' },
    { o: '3.6', d: 3, q: 'An organization wants to recover encrypted data if an employee leaves, but no single administrator should be able to recover keys alone. What should it use?', a: ['Key recovery with M of N control', 'Key escrow with one administrator', 'Storing keys in a shared spreadsheet', 'Disabling encryption for departing employees'], c: 0,
      e: 'M of N control requires several recovery agents to cooperate, enforcing split knowledge and dual control.',
      r: 'M из N требует участия нескольких агентов — разделённое знание и двойной контроль.' },
    { o: '3.6', d: 3, q: 'Which algorithm was standardized by NIST in 2024 as a post-quantum key encapsulation mechanism?', a: ['ML-KEM (FIPS 203, based on CRYSTALS-Kyber)', 'RSA-4096', 'ECDH P-521', 'AES-512'], c: 0,
      e: 'FIPS 203 (ML-KEM) is the lattice-based PQC KEM. FIPS 204 (ML-DSA) and 205 (SLH-DSA) are signatures. RSA and ECC are vulnerable to Shor\'s algorithm.',
      r: 'FIPS 203 (ML-KEM) — решёточный постквантовый KEM; 204 и 205 — подписи. RSA и ECC уязвимы к алгоритму Шора.' },
    { o: '3.7', d: 2, q: 'An attacker has a collection of encrypted messages and their corresponding plaintexts. Which attack can they perform?', a: ['Known plaintext attack', 'Ciphertext-only attack', 'Chosen ciphertext attack', 'Birthday attack'], c: 0,
      e: 'Having plaintext/ciphertext pairs (without choosing them) is a known plaintext attack.',
      r: 'Наличие пар открытый/шифрованный текст (не выбранных самим) — атака по известному открытому тексту.' },
    { o: '3.7', d: 2, q: 'Why does double DES (2DES) provide little more security than single DES?', a: ['Meet-in-the-middle attack', 'Birthday attack', 'Frequency analysis', 'Replay attack'], c: 0,
      e: 'Meet-in-the-middle reduces 2DES to roughly 2^57 work instead of 2^112. That is why 3DES was used.',
      r: 'Meet-in-the-middle сводит 2DES к ~2^57 операций вместо 2^112, поэтому использовали 3DES.' },
    { o: '3.7', d: 3, q: 'An attacker measures how long a smart card takes to perform cryptographic operations to deduce the private key. This is a:', a: ['Side-channel attack', 'Brute-force attack', 'Chosen plaintext attack', 'Rainbow table attack'], c: 0,
      e: 'Timing, power and electromagnetic analysis are side-channel attacks. They exploit the implementation, not the math.',
      r: 'Анализ времени, питания и ЭМ — атаки по побочным каналам: эксплуатируют реализацию, а не математику.' },
    { o: '3.7', d: 2, q: 'For a hash function with a 128-bit output, roughly how much work does a birthday attack require to find a collision?', a: ['2^64', '2^128', '2^32', '2^127'], c: 0,
      e: 'Collision resistance is about 2^(n/2). That is why longer hashes (SHA-256+) are needed.',
      r: 'Стойкость к коллизиям ≈ 2^(n/2), поэтому нужны длинные хеши (SHA-256+).' },
    { o: '3.9', d: 2, q: 'Which water-based fire suppression system is generally BEST for a data center?', a: ['Pre-action', 'Wet pipe', 'Deluge', 'Dry pipe without detection'], c: 0,
      e: 'Pre-action needs a detection event before the pipes fill, and a head must activate before water flows. That minimizes accidental discharge.',
      r: 'В pre-action трубы заполняются только после срабатывания датчика, а вода идёт после срабатывания головки — минимум случайных проливов.' },
    { o: '3.9', d: 1, q: 'Which fire class involves electrical equipment and must NOT be suppressed with water?', a: ['Class C', 'Class A', 'Class B', 'Class K'], c: 0,
      e: 'Class C is electrical (US). Use CO₂ or clean agents. Class A is common combustibles, B is liquids, K is kitchen.',
      r: 'Класс C — электрооборудование (США): CO₂ или чистые агенты. A — обычные материалы, B — жидкости, K — кухня.' },
    { o: '3.9', d: 1, q: 'A prolonged period of low voltage is called a:', a: ['Brownout', 'Sag', 'Surge', 'Fault'], c: 0,
      e: 'A sag is momentary low voltage and a brownout is prolonged. A spike is momentary high and a surge is prolonged high.',
      r: 'Sag — кратковременное понижение, brownout — длительное; spike — кратковременное повышение, surge — длительное.' },
    { o: '3.9', d: 2, q: 'What is the ideal relative humidity range for a data center?', a: ['40–60%', '10–20%', '70–90%', '0–10%'], c: 0,
      e: 'Below ~40% causes static discharge. Above ~60% causes condensation and corrosion.',
      r: 'Ниже ~40% — статика, выше ~60% — конденсат и коррозия.' },
    { o: '3.9', d: 2, q: 'Which physical control BEST prevents tailgating into a data center?', a: ['Mantrap (access control vestibule)', 'CCTV camera', 'Warning sign', 'Perimeter fence'], c: 0,
      e: 'A mantrap allows one person through at a time, with authentication between two doors. CCTV only detects.',
      r: 'Шлюз пропускает по одному с аутентификацией между двумя дверями; CCTV лишь обнаруживает.' },
    { o: '3.8', d: 2, q: 'Placing benches and lighting near building entrances so that employees naturally observe visitors is an example of which CPTED strategy?', a: ['Natural surveillance', 'Territorial reinforcement', 'Natural access control', 'Target hardening'], c: 0,
      e: 'Natural surveillance maximizes visibility of people\'s activity. Access control guides movement. Territorial reinforcement creates a sense of ownership.',
      r: 'Естественное наблюдение повышает видимость; естественный контроль доступа направляет движение; территориальное усиление создаёт чувство принадлежности.' },
    { o: '3.8', d: 2, q: 'Where is the BEST location for a server room within a multi-story building?', a: ['In the center of a middle floor', 'In the basement', 'On the top floor near the roof', 'On the ground floor next to the lobby'], c: 0,
      e: 'The center of the building on a middle floor avoids flooding (basement), roof leaks and storms (top floor), and public access (lobby).',
      r: 'Центр здания на среднем этаже: нет затопления (подвал), протечек крыши (верх) и публичного доступа (холл).' },
    { o: '3.9', d: 2, q: 'What minimum fence height is generally considered to deter a determined intruder?', a: ['8 feet (2.4 m) with barbed wire', '3 feet (1 m)', '4 feet (1.2 m)', '6 feet (1.8 m) with no topping'], c: 0,
      e: '3–4 ft deters casual trespassers, 6–7 ft is too hard to climb easily, and 8 ft plus barbed wire deters determined intruders.',
      r: '1 м отпугивает случайных, 2 м трудно перелезть, 2,4 м + колючая проволока — против решительных.' },
    { o: '3.6', d: 2, q: 'Which TLS 1.3 cipher mode provides both confidentiality and integrity (AEAD)?', a: ['AES-GCM', 'AES-ECB', 'AES-CBC without MAC', 'RC4'], c: 0,
      e: 'GCM is authenticated encryption. TLS 1.3 allows only AEAD ciphers (AES-GCM, ChaCha20-Poly1305, AES-CCM).',
      r: 'GCM — аутентифицированное шифрование; TLS 1.3 допускает только AEAD (AES-GCM, ChaCha20-Poly1305, AES-CCM).' },
    { o: '3.4', d: 3, q: 'Which technology protects data while it is being processed by isolating code and data in a hardware-protected region of memory?', a: ['Trusted Execution Environment / secure enclave', 'Full disk encryption', 'TLS 1.3', 'Data masking'], c: 0,
      e: 'TEEs (Intel SGX, AMD SEV, ARM TrustZone) protect data in use, which is the basis of confidential computing.',
      r: 'TEE (Intel SGX, AMD SEV, ARM TrustZone) защищают данные в использовании — основа конфиденциальных вычислений.' },
    { t: 'match', o: '3.6', d: 2, q: 'Match the cryptographic goal to the mechanism that BEST provides it.', pairs: [['Confidentiality', 'Encrypt with recipient\'s public key'], ['Nonrepudiation', 'Sign with sender\'s private key'], ['Integrity only', 'Hash (SHA-256)'], ['Integrity + authenticity with shared key', 'HMAC']],
      e: 'Each goal maps to a distinct mechanism. Know which key is used for what.', r: 'Каждой цели — свой механизм; важно знать, какой ключ для чего.' },
    { t: 'order', o: '3.9', d: 2, q: 'Order the fence heights from least to most deterrent.', items: ['3–4 ft: deters casual trespassers', '6–7 ft: too hard to climb easily', '8 ft + barbed wire: deters determined intruders'],
      e: 'Taller fences, and toppings such as barbed wire, increase the deterrence.', r: 'Чем выше забор и есть колючая проволока, тем сильнее сдерживание.' },
  ],
});
