'use strict';
CISSP.domain({
  id: 5, weight: 13,
  title: { en: 'Identity and Access Management (IAM)', ru: 'Управление идентификацией и доступом (IAM)' },
  summary: {
    en: 'Identification and authentication (factors, MFA, biometrics, passwordless), authorization models (DAC, MAC, RBAC, ABAC), SSO and federation (Kerberos, SAML, OAuth, OIDC), the identity lifecycle, PAM, and access-control attacks.',
    ru: 'Идентификация и аутентификация (факторы, MFA, биометрия, беспарольная), модели авторизации (DAC, MAC, RBAC, ABAC), SSO и федерация (Kerberos, SAML, OAuth, OIDC), жизненный цикл учётных записей, PAM и атаки на контроль доступа.',
  },
  objectives: [
    ['5.1', 'Control physical and logical access to assets'],
    ['5.2', 'Design identification and authentication strategy (groups/roles, AAA, MFA, SSO, session management, registration/proofing, federated identity, credential management, passwordless)'],
    ['5.3', 'Federated identity with a third-party service (on-premise, cloud, hybrid)'],
    ['5.4', 'Implement and manage authorization mechanisms (RBAC, rule based, MAC, DAC, ABAC, risk based)'],
    ['5.5', 'Manage the identity and access provisioning lifecycle'],
    ['5.6', 'Implement authentication systems'],
  ],
  concepts: [
    {
      t: { en: 'IAAA and authentication factors', ru: 'IAAA и факторы аутентификации' },
      b: {
        en: `<p><b>Identification</b> is claiming an identity (username, badge). <b>Authentication</b> is proving it. <b>Authorization</b> is what you're allowed to do. <b>Accountability</b> means actions are traced to the individual (needs unique IDs plus audit logs).</p>
<ul><li><b>Type 1, something you know</b>: password, PIN, passphrase. <b>Type 2, something you have</b>: smart card, hardware token, phone authenticator (TOTP/HOTP), FIDO2 key. <b>Type 3, something you are</b>: biometrics. Additional context factors are <b>somewhere you are</b> (location) and <b>something you do</b> (behavior, typing rhythm).</li>
<li><b>MFA</b> requires factors of <b>different types</b>. A password plus a PIN is still single-factor.</li>
<li><b>NIST SP 800-63B</b>: favor length (passphrases), screen against breached-password lists, <b>no forced periodic rotation</b> unless there is evidence of compromise, no composition rules, rate-limit attempts. SMS OTP is a "restricted" authenticator.</li>
<li><b>Passwordless</b>: FIDO2/WebAuthn and passkeys use public-key cryptography bound to the origin, which makes them <b>phishing-resistant</b>.</li>
<li><b>Identity proofing / registration</b>: verify the person is who they claim before issuing credentials (document checks, in-person verification). Identity Assurance Level (IAL), Authenticator Assurance Level (AAL).</li>
<li><b>Session management</b>: timeouts, re-authentication for sensitive actions, secure random session IDs, invalidation on logout.</li></ul>`,
        ru: `<p><b>Идентификация</b> — заявление личности (логин, бейдж). <b>Аутентификация</b> — доказательство. <b>Авторизация</b> — что разрешено. <b>Подотчётность</b> — действия привязаны к человеку (нужны уникальные ID и журналы).</p>
<ul><li><b>Тип 1 — знание</b>: пароль, PIN, парольная фраза. <b>Тип 2 — владение</b>: смарт-карта, токен, приложение (TOTP/HOTP), ключ FIDO2. <b>Тип 3 — свойство</b>: биометрия. Дополнительно контекст: <b>где вы</b> (местоположение) и <b>что вы делаете</b> (поведение, ритм набора).</li>
<li><b>MFA</b> — факторы <b>разных типов</b>; пароль + PIN — это всё ещё один фактор.</li>
<li><b>NIST SP 800-63B</b>: важна длина (парольные фразы), проверка по базам утёкших паролей, <b>без принудительной периодической смены</b> (если нет признаков компрометации), без правил сложности, ограничение числа попыток. SMS OTP — «ограниченный» аутентификатор.</li>
<li><b>Беспарольная аутентификация</b>: FIDO2/WebAuthn и passkeys — криптография с открытым ключом, привязанная к источнику, поэтому <b>устойчива к фишингу</b>.</li>
<li><b>Подтверждение личности</b> при регистрации: проверка документов, очная проверка. Уровни IAL и AAL.</li>
<li><b>Управление сессиями</b>: тайм-ауты, повторная аутентификация для критичных действий, случайные ID сессий, аннулирование при выходе.</li></ul>`,
      },
    },
    {
      t: { en: 'Biometrics', ru: 'Биометрия' },
      b: {
        en: `<p><b>Physiological</b>: fingerprint, face, iris (stable over a lifetime, very accurate), retina (most accurate but intrusive, can reveal health information), palm vein (used by Pearson VUE), hand geometry. <b>Behavioral</b>: voice, signature dynamics, keystroke dynamics, gait.</p>
<ul><li><b>Type I error = FRR</b> (False Rejection): a valid user is rejected. <b>Type II error = FAR</b> (False Acceptance): an impostor is accepted. Type II is <b>worse for security</b>.</li>
<li><b>CER/EER</b> (Crossover/Equal Error Rate): where FAR = FRR. It is the best single measure of accuracy; <b>lower is better</b>.</li>
<li>Other factors: enrollment time (~2 minutes), throughput (~6–10 seconds per person), user acceptance, privacy, and the fact that biometric data can't be revoked if stolen.</li></ul>`,
        ru: `<p><b>Физиологическая</b>: отпечаток, лицо, радужка (стабильна всю жизнь, очень точна), сетчатка (точнее всего, но инвазивна, может раскрыть сведения о здоровье), вены ладони (используется Pearson VUE), геометрия руки. <b>Поведенческая</b>: голос, динамика подписи, клавиатурный почерк, походка.</p>
<ul><li><b>Ошибка I рода = FRR</b> (ложный отказ): легитимный пользователь отвергнут. <b>Ошибка II рода = FAR</b> (ложный допуск): допущен самозванец. Тип II <b>хуже для безопасности</b>.</li>
<li><b>CER/EER</b> — точка, где FAR = FRR; лучшая единая мера точности, <b>чем ниже, тем лучше</b>.</li>
<li>Также: время регистрации (~2 мин), пропускная способность (~6–10 с на человека), принятие пользователями, приватность, невозможность «отозвать» украденную биометрию.</li></ul>`,
      },
      w: ['biometric'],
    },
    {
      t: { en: 'Authorization models', ru: 'Модели авторизации' },
      b: { en: '<p>Who decides access, and on what basis.</p>', ru: '<p>Кто решает о доступе и на каком основании.</p>' },
      w: ['compare', { title: { en: 'Access control models', ru: 'Модели контроля доступа' }, cols: ['Model', 'Who decides / basis', 'Typical use', 'Key point'], rows: [
        ['DAC — Discretionary', 'The <b>owner</b> of the object, via ACLs', 'Windows/Unix file permissions', 'Flexible, but vulnerable to Trojans and propagation of rights'],
        ['MAC — Mandatory', 'The <b>system</b>, comparing labels (clearance vs classification) + need-to-know', 'Military, government (SELinux)', 'Users cannot change permissions. Lattice-based, non-discretionary'],
        ['RBAC — Role-based', 'Admin assigns permissions to <b>roles</b> (job functions)', 'Enterprises with high turnover', 'Simplifies administration, supports least privilege and SoD'],
        ['Rule-based', 'Global <b>rules</b> applied to all subjects', 'Firewalls, time-of-day restrictions', 'Not tied to identity'],
        ['ABAC — Attribute-based', 'Policies over <b>attributes</b> of subject, object, action, environment', 'Cloud, zero trust, SDN', 'Most granular and contextual (XACML)'],
        ['Risk-based', 'Real-time <b>risk score</b> (location, device, behavior)', 'Adaptive / conditional access', 'Step-up MFA when risk is elevated'],
      ], note: { en: 'Non-discretionary = centrally administered (MAC, RBAC, rule-based). Also know the <b>access control matrix</b>: rows are capability lists (per subject), columns are ACLs (per object).', ru: 'Недискреционные — централизованно администрируемые (MAC, RBAC, rule-based). Также знайте <b>матрицу доступа</b>: строки — списки возможностей (по субъекту), столбцы — ACL (по объекту).' } }],
    },
    {
      t: { en: 'Kerberos', ru: 'Kerberos' },
      b: {
        en: `<p>Kerberos is a ticket-based SSO protocol that uses <b>symmetric</b> cryptography (AES) and a trusted third party, the <b>KDC</b>, which contains the <b>Authentication Service (AS)</b> and the <b>Ticket Granting Service (TGS)</b>. It runs on port 88. Passwords are never sent over the network.</p>
<p>Weaknesses: the KDC is a <b>single point of failure</b> and a high-value target. It requires <b>time synchronization</b> (default 5-minute skew). Tickets are cached on the client. Known attacks include <b>pass-the-ticket</b>, <b>golden ticket</b> (forged TGT using the krbtgt hash), <b>silver ticket</b> (forged service ticket) and <b>kerberoasting</b> (offline cracking of service account tickets).</p>`,
        ru: `<p>Kerberos — протокол SSO на основе билетов, <b>симметричная</b> криптография (AES), доверенная третья сторона — <b>KDC</b>, включающий <b>Authentication Service (AS)</b> и <b>Ticket Granting Service (TGS)</b>. Порт 88. Пароли по сети не передаются.</p>
<p>Слабые места: KDC — <b>единая точка отказа</b> и ценная цель; нужна <b>синхронизация времени</b> (по умолчанию 5 мин); билеты кешируются на клиенте. Атаки: <b>pass-the-ticket</b>, <b>golden ticket</b> (поддельный TGT по хешу krbtgt), <b>silver ticket</b> (поддельный сервисный билет), <b>kerberoasting</b> (офлайн-взлом билетов сервисных учёток).</p>`,
      },
      w: ['flow', { title: { en: 'Kerberos authentication flow', ru: 'Поток аутентификации Kerberos' }, steps: [
        { t: { en: 'User logs on', ru: 'Вход пользователя' }, d: { en: 'The client sends its identity (and a timestamp encrypted with a key derived from the password, "pre-authentication") to the AS. The password itself is never sent.', ru: 'Клиент отправляет AS свой ID и метку времени, зашифрованную ключом из пароля (pre-authentication). Сам пароль не передаётся.' } },
        { t: { en: 'AS issues TGT', ru: 'AS выдаёт TGT' }, d: { en: 'The AS verifies and returns a <b>TGT</b> (encrypted with the KDC/krbtgt key) and a session key encrypted with the user\'s key.', ru: 'AS проверяет и возвращает <b>TGT</b> (зашифрован ключом KDC/krbtgt) и сессионный ключ, зашифрованный ключом пользователя.' } },
        { t: { en: 'Request service ticket', ru: 'Запрос сервисного билета' }, d: { en: 'When accessing a service, the client sends the TGT and an authenticator to the <b>TGS</b>.', ru: 'При обращении к сервису клиент отправляет TGT и аутентификатор в <b>TGS</b>.' } },
        { t: { en: 'TGS issues service ticket', ru: 'TGS выдаёт билет' }, d: { en: 'The TGS returns a <b>service ticket</b> (ST) encrypted with the target service\'s key, plus a client–service session key.', ru: 'TGS возвращает <b>сервисный билет</b>, зашифрованный ключом сервиса, и сессионный ключ клиент–сервис.' } },
        { t: { en: 'Access service', ru: 'Доступ к сервису' }, d: { en: 'The client presents the ST and an authenticator to the service, which decrypts the ST with its own key and grants access. Mutual authentication is optional.', ru: 'Клиент предъявляет сервису билет и аутентификатор; сервис расшифровывает билет своим ключом и даёт доступ. Взаимная аутентификация опциональна.' } },
      ] }],
    },
    {
      t: { en: 'Federation: SAML, OAuth 2.0, OpenID Connect', ru: 'Федерация: SAML, OAuth 2.0, OpenID Connect' },
      b: {
        en: `<p><b>Federated identity</b> lets users of one organization use their home credentials with another (or with a cloud service) based on trust. The <b>Identity Provider (IdP)</b> authenticates the user. The <b>Service Provider (SP)</b> / <b>Relying Party (RP)</b> consumes the assertion.</p>
<ul><li><b>SAML 2.0</b>: XML-based <b>assertions</b> (authentication, attribute, authorization decision). Browser SSO for enterprise web apps. Roles: principal (user), IdP, SP.</li>
<li><b>OAuth 2.0</b>: an <b>authorization</b> framework, not authentication. It grants a client an <b>access token</b> to act on a resource with limited scope without sharing passwords ("Allow this app to read your calendar"). Use authorization code flow with <b>PKCE</b>.</li>
<li><b>OpenID Connect (OIDC)</b>: an <b>authentication</b> layer on top of OAuth 2.0. Issues an <b>ID token</b> (a JWT) with user identity claims. Modern web and mobile SSO ("Sign in with…").</li>
<li><b>Deployment</b>: on-premises (AD FS), cloud (IDaaS such as Entra ID or Okta), hybrid (directory sync). <b>Just-in-time (JIT) provisioning</b> creates accounts at first federated login. SCIM automates provisioning.</li></ul>`,
        ru: `<p><b>Федеративная идентичность</b> позволяет пользователям одной организации входить в другую (или в облачный сервис) со своими учётными данными на основе доверия. <b>Identity Provider (IdP)</b> аутентифицирует; <b>Service Provider (SP)</b> / <b>Relying Party (RP)</b> принимает утверждение.</p>
<ul><li><b>SAML 2.0</b> — XML-<b>утверждения</b> (аутентификация, атрибуты, решение об авторизации). Браузерный SSO для корпоративных веб-приложений. Роли: principal, IdP, SP.</li>
<li><b>OAuth 2.0</b> — фреймворк <b>авторизации</b>, не аутентификации: выдаёт клиенту <b>access token</b> для действий с ресурсом в ограниченном объёме без передачи пароля («разрешить приложению читать календарь»). Authorization code flow с <b>PKCE</b>.</li>
<li><b>OpenID Connect (OIDC)</b> — слой <b>аутентификации</b> поверх OAuth 2.0; выдаёт <b>ID token</b> (JWT) с утверждениями о пользователе. Современный SSO («Войти через…»).</li>
<li><b>Развёртывание</b>: on-prem (AD FS), облако (IDaaS: Entra ID, Okta), гибрид (синхронизация каталогов). <b>JIT-провижининг</b> создаёт учётку при первом федеративном входе; SCIM автоматизирует провижининг.</li></ul>`,
      },
      w: ['compare', { title: { en: 'Federation protocols', ru: 'Протоколы федерации' }, cols: ['', 'SAML 2.0', 'OAuth 2.0', 'OIDC'], rows: [
        ['Purpose', 'Authentication + authorization assertions', 'Delegated <b>authorization</b>', '<b>Authentication</b> (identity)'],
        ['Format', 'XML', 'Access token (often JWT, opaque allowed)', 'ID token = JWT + OAuth tokens'],
        ['Typical use', 'Enterprise web SSO', 'API access on user\'s behalf', 'Consumer/mobile login, modern SSO'],
        ['Parties', 'Principal, IdP, SP', 'Resource owner, client, authorization server, resource server', 'End user, OpenID Provider, Relying Party'],
      ] }],
    },
    {
      t: { en: 'Identity and access provisioning lifecycle', ru: 'Жизненный цикл учётных записей и доступа' },
      b: {
        en: `<ul><li><b>Provisioning</b>: create accounts based on role (joiner), with identity proofing and least privilege. Use automated workflows from HR.</li>
<li><b>Changes (mover)</b>: when a role changes, <b>remove the old access</b> and add the new. Failing to do so causes <b>privilege creep</b> (aggregation of rights).</li>
<li><b>Access reviews / recertification</b>: managers or owners periodically confirm access is still needed. Review privileged accounts more often.</li>
<li><b>Deprovisioning (leaver)</b>: disable promptly at termination, then delete after a retention period (keep for audit).</li>
<li><b>Privileged Access Management (PAM)</b>: password vaulting, session recording, <b>just-in-time</b> elevation, and separate admin accounts (don't browse as admin).</li>
<li><b>Service accounts</b>: non-interactive, least privilege, managed credentials and rotation (gMSA), owned by a named person.</li>
<li><b>Account policies</b>: lockout thresholds, disabling dormant accounts, renaming or disabling default accounts.</li></ul>`,
        ru: `<ul><li><b>Предоставление</b> — создание учёток по роли (новичок) с проверкой личности и минимальными правами; автоматизация из HR.</li>
<li><b>Перемещение</b> — при смене роли <b>убрать старые права</b> и добавить новые, иначе <b>накопление привилегий (privilege creep)</b>.</li>
<li><b>Пересмотр / ресертификация доступа</b> — руководители или владельцы регулярно подтверждают необходимость доступа; привилегированные — чаще.</li>
<li><b>Отзыв (уходящий)</b> — быстро отключить при увольнении, удалить после срока хранения (для аудита).</li>
<li><b>PAM</b> — хранилище паролей, запись сессий, повышение прав <b>just-in-time</b>, отдельные админ-учётки (не сидеть в интернете под админом).</li>
<li><b>Сервисные учётки</b> — неинтерактивные, минимальные права, управляемые пароли и ротация (gMSA), владелец — конкретный человек.</li>
<li><b>Политики</b>: порог блокировки, отключение неактивных учёток, переименование или отключение учёток по умолчанию.</li></ul>`,
      },
      w: ['flow', { title: 'Joiner → Mover → Leaver', noNum: false, steps: [
        { t: 'Identity proofing', d: 'Verify identity documents/HR record before creating credentials.' },
        { t: 'Provision (joiner)', d: 'Role-based access, least privilege, unique ID, MFA enrollment.' },
        { t: 'Review & recertify', d: 'Periodic owner/manager attestation; remove unneeded rights.' },
        { t: 'Change (mover)', d: 'Revoke previous role access before granting new — prevents privilege creep.' },
        { t: 'Deprovision (leaver)', d: 'Disable immediately at separation; retain for audit; then delete.' },
      ] }],
    },
    {
      t: { en: 'Authentication systems and SSO', ru: 'Системы аутентификации и SSO' },
      b: {
        en: `<ul><li><b>Directory services</b>: LDAP (389, LDAPS on 636), Active Directory (Kerberos + LDAP), X.500.</li>
<li><b>SSO</b> means one authentication, many systems. It improves usability and reduces password fatigue, but if the SSO credential is compromised, everything is exposed, so protect it with MFA.</li>
<li><b>AAA protocols</b>: RADIUS, TACACS+, Diameter (see Domain 4).</li>
<li><b>Credential management</b>: password managers and vaults, PKI and smart cards (CAC/PIV), hardware tokens: <b>synchronous</b> (time-based TOTP, or event/counter-based HOTP) vs <b>asynchronous</b> (challenge-response).</li>
<li><b>Access control attacks</b>: brute force, dictionary, <b>password spraying</b> (one common password against many accounts, which evades lockout), <b>credential stuffing</b> (reusing breached credentials), pass-the-hash, phishing and MFA fatigue (push bombing), and session hijacking.</li></ul>`,
        ru: `<ul><li><b>Службы каталогов</b>: LDAP (389, LDAPS 636), Active Directory (Kerberos + LDAP), X.500.</li>
<li><b>SSO</b>: одна аутентификация — много систем. Удобство и меньше «усталости от паролей», но компрометация SSO открывает всё — защищать MFA.</li>
<li><b>AAA-протоколы</b>: RADIUS, TACACS+, Diameter (см. Домен 4).</li>
<li><b>Управление учётными данными</b>: менеджеры паролей и хранилища, PKI и смарт-карты (CAC/PIV), аппаратные токены: <b>синхронные</b> (по времени TOTP, по счётчику HOTP) и <b>асинхронные</b> (запрос-ответ).</li>
<li><b>Атаки</b>: перебор, словарь, <b>password spraying</b> (один популярный пароль на много учёток, обходит блокировку), <b>credential stuffing</b> (утёкшие пары логин/пароль), pass-the-hash, фишинг и MFA fatigue (засыпание push-запросами), перехват сессий.</li></ul>`,
      },
    },
    {
      t: { en: 'Physical and logical access to assets', ru: 'Физический и логический доступ к активам' },
      b: {
        en: `<p>Access control applies to <b>information, systems, devices, facilities and applications</b>. Physical controls (badges, mantraps, guards, locks, biometrics at doors) and logical controls (ACLs, authentication, encryption) should be <b>integrated</b>. A converged physical and logical access system lets you detect anomalies such as a VPN login from abroad while the badge shows the person on site.</p>
<p>Principles: <b>least privilege</b>, <b>need to know</b>, <b>separation of duties</b>, <b>default deny</b>, and <b>constrained interfaces</b> (menus, restricted shells, database views).</p>`,
        ru: `<p>Контроль доступа распространяется на <b>информацию, системы, устройства, помещения и приложения</b>. Физические меры (бейджи, шлюзы, охрана, замки, биометрия на дверях) и логические (ACL, аутентификация, шифрование) следует <b>интегрировать</b>: единая система выявляет аномалии вроде входа по VPN из-за границы, когда бейдж показывает человека в офисе.</p>
<p>Принципы: <b>минимальные привилегии</b>, <b>need to know</b>, <b>разделение обязанностей</b>, <b>запрет по умолчанию</b>, <b>ограниченные интерфейсы</b> (меню, ограниченные оболочки, представления БД).</p>`,
      },
    },
  ],
  terms: [
    ['Identification', 'Claiming an identity (e.g., username).', 'Заявление личности (например, логин).'],
    ['Authentication', 'Proving the claimed identity.', 'Подтверждение заявленной личности.'],
    ['Authorization', 'Granting rights/permissions to an authenticated subject.', 'Предоставление прав аутентифицированному субъекту.'],
    ['Accountability', 'Tracing actions to an individual via unique IDs and audit logs.', 'Привязка действий к человеку через уникальные ID и журналы.'],
    ['MFA', 'Authentication using two or more different factor types.', 'Аутентификация двумя и более факторами разных типов.'],
    ['TOTP', 'Time-based One-Time Password (synchronous token).', 'Одноразовый пароль на основе времени.'],
    ['HOTP', 'HMAC-based (counter/event) One-Time Password.', 'Одноразовый пароль на основе счётчика.'],
    ['FIDO2 / WebAuthn', 'Phishing-resistant passwordless authentication using origin-bound public-key credentials.', 'Устойчивая к фишингу беспарольная аутентификация на открытых ключах.'],
    ['FRR (Type I)', 'False Rejection Rate: legitimate user rejected.', 'Доля ложных отказов: легитимному пользователю отказано.'],
    ['FAR (Type II)', 'False Acceptance Rate: impostor accepted — more serious.', 'Доля ложных допусков: допущен самозванец — опаснее.'],
    ['CER / EER', 'Crossover Error Rate where FAR = FRR; lower is more accurate.', 'Точка равенства FAR и FRR; чем ниже, тем точнее.'],
    ['DAC', 'Discretionary Access Control: owner sets permissions.', 'Дискреционный доступ: права задаёт владелец.'],
    ['MAC', 'Mandatory Access Control: system enforces labels and clearances.', 'Мандатный доступ: система сравнивает метки и допуски.'],
    ['RBAC', 'Role-Based Access Control: permissions assigned to job roles.', 'Ролевой доступ: права назначаются ролям.'],
    ['ABAC', 'Attribute-Based Access Control: policies over subject/object/environment attributes.', 'Доступ на основе атрибутов субъекта, объекта и среды.'],
    ['Rule-based access control', 'Global rules apply to all users (e.g., firewall rules, time restrictions).', 'Глобальные правила для всех (правила МЭ, ограничения по времени).'],
    ['Capability list', 'Row of the access matrix: what a subject can access.', 'Строка матрицы доступа: к чему имеет доступ субъект.'],
    ['ACL', 'Column of the access matrix: who can access an object.', 'Столбец матрицы доступа: кто имеет доступ к объекту.'],
    ['KDC', 'Kerberos Key Distribution Center: AS + TGS.', 'Центр распределения ключей Kerberos: AS + TGS.'],
    ['TGT', 'Ticket Granting Ticket issued by the AS; used to request service tickets.', 'Билет на получение билетов от AS.'],
    ['Golden ticket', 'Forged Kerberos TGT made with the krbtgt account hash.', 'Поддельный TGT, созданный с хешем krbtgt.'],
    ['Kerberoasting', 'Requesting service tickets and cracking service-account passwords offline.', 'Запрос сервисных билетов и офлайн-взлом паролей сервисных учёток.'],
    ['SAML', 'XML-based standard exchanging authentication/authorization assertions between IdP and SP.', 'XML-стандарт обмена утверждениями между IdP и SP.'],
    ['OAuth 2.0', 'Authorization framework issuing access tokens for delegated access.', 'Фреймворк авторизации, выдающий токены для делегированного доступа.'],
    ['OpenID Connect', 'Authentication layer on OAuth 2.0 issuing JWT ID tokens.', 'Слой аутентификации поверх OAuth 2.0 с ID-токенами JWT.'],
    ['IdP', 'Identity Provider: authenticates users and issues assertions/tokens.', 'Поставщик идентификации: аутентифицирует и выдаёт утверждения.'],
    ['Privilege creep', 'Accumulation of access rights as users change roles.', 'Накопление прав при смене ролей.'],
    ['PAM', 'Privileged Access Management: vaulting, JIT elevation, session monitoring for admin accounts.', 'Управление привилегированным доступом.'],
    ['Just-in-time access', 'Privileges granted only when needed and for a limited time.', 'Привилегии выдаются только при необходимости и на ограниченное время.'],
    ['Password spraying', 'Trying a few common passwords against many accounts to avoid lockout.', 'Перебор нескольких популярных паролей по многим учёткам.'],
    ['Credential stuffing', 'Using breached username/password pairs against other sites.', 'Использование утёкших пар логин/пароль на других сайтах.'],
    ['SCIM', 'System for Cross-domain Identity Management: standard for automated user provisioning.', 'Стандарт автоматического провижининга пользователей.'],
  ],
  questions: [
    { o: '5.2', d: 1, q: 'Which combination represents true multifactor authentication?', a: ['Smart card and PIN', 'Password and security question', 'Fingerprint and palm scan', 'Password and PIN'], c: 0,
      e: 'A smart card (have) plus a PIN (know) are different factor types. The other options combine factors of the same type.',
      r: 'Смарт-карта (владение) + PIN (знание) — разные типы; остальные варианты — один тип.' },
    { o: '5.2', d: 1, q: 'A user types a username. This step is:', a: ['Identification', 'Authentication', 'Authorization', 'Accountability'], c: 0,
      e: 'Typing a username is a claim of identity. Proving it (with a password) is authentication.',
      r: 'Ввод логина — заявление личности; доказательство (пароль) — аутентификация.' },
    { o: '5.2', d: 2, q: 'Which is required to ensure accountability in a system?', a: ['Unique user identification and audit logging', 'Shared administrator accounts', 'Strong encryption', 'Role-based access control'], c: 0,
      e: 'Without unique IDs and logs, actions can\'t be traced to an individual. Shared accounts destroy accountability.',
      r: 'Без уникальных ID и журналов действия не привязать к человеку; общие учётки разрушают подотчётность.' },
    { o: '5.2', d: 2, q: 'In biometrics, which error type is the MOST serious from a security perspective?', a: ['Type II — false acceptance', 'Type I — false rejection', 'Crossover error', 'Enrollment failure'], c: 0,
      e: 'Type II (FAR) lets an impostor in. Type I (FRR) only inconveniences legitimate users.',
      r: 'Тип II (FAR) впускает самозванца; тип I (FRR) лишь неудобен легитимным пользователям.' },
    { o: '5.2', d: 2, q: 'When comparing biometric devices, which metric BEST indicates overall accuracy?', a: ['Crossover Error Rate (CER)', 'False Rejection Rate alone', 'Throughput rate', 'Enrollment time'], c: 0,
      e: 'The CER is where FAR equals FRR. The lower the CER, the more accurate the device.',
      r: 'CER — точка, где FAR = FRR; чем ниже CER, тем точнее устройство.' },
    { o: '5.2', d: 2, q: 'According to current NIST SP 800-63B guidance, which password practice is recommended?', a: ['Screen new passwords against lists of commonly used and breached passwords', 'Force password changes every 30 days', 'Require at least one special character and one uppercase letter', 'Use password hints for recovery'], c: 0,
      e: 'NIST recommends length, breached-password screening, and no arbitrary periodic rotation or composition rules. Hints are prohibited.',
      r: 'NIST рекомендует длину, проверку по утёкшим паролям, без произвольной смены и правил сложности; подсказки запрещены.' },
    { o: '5.2', d: 2, q: 'Which authentication method is MOST resistant to phishing?', a: ['FIDO2/WebAuthn hardware security key', 'SMS one-time passcode', 'TOTP authenticator app', 'Security questions'], c: 0,
      e: 'FIDO2 binds the credential to the site\'s origin, so a phishing site can\'t use it. OTP codes can be relayed by a phishing proxy.',
      r: 'FIDO2 привязывает учётные данные к домену: фишинговый сайт не сможет их использовать. OTP-коды можно переслать через фишинговый прокси.' },
    { o: '5.4', d: 1, q: 'In which access control model does the data owner decide who has access to an object?', a: ['Discretionary Access Control (DAC)', 'Mandatory Access Control (MAC)', 'Rule-based access control', 'Lattice-based access control'], c: 0,
      e: 'In DAC the owner sets permissions at their discretion (e.g. NTFS ACLs).',
      r: 'В DAC владелец задаёт права по своему усмотрению (например, ACL NTFS).' },
    { o: '5.4', d: 2, q: 'A government system grants access by comparing a user\'s clearance with an object\'s classification label, and users cannot change permissions. This is:', a: ['Mandatory Access Control', 'Discretionary Access Control', 'Role-Based Access Control', 'Attribute-Based Access Control'], c: 0,
      e: 'MAC is enforced by the system based on labels. Users can\'t override it.',
      r: 'MAC применяется системой на основе меток; пользователи не могут его переопределить.' },
    { o: '5.4', d: 2, q: 'An organization with high employee turnover wants to simplify permission management by assigning permissions to job functions. Which model fits BEST?', a: ['RBAC', 'DAC', 'MAC', 'Rule-based'], c: 0,
      e: 'With RBAC, new hires get a role, and moving between jobs means changing the role.',
      r: 'В RBAC новичку назначают роль, при переходе меняют роль.' },
    { o: '5.4', d: 2, q: 'A policy states: "Doctors may view records of patients in their own department during their shift from a hospital-managed device." Which model can enforce this MOST directly?', a: ['ABAC', 'RBAC', 'DAC', 'MAC'], c: 0,
      e: 'The decision depends on several attributes (role, department, time, device), which is ABAC\'s strength.',
      r: 'Решение зависит от множества атрибутов (роль, отделение, время, устройство) — сильная сторона ABAC.' },
    { o: '5.4', d: 2, q: 'A firewall that blocks all traffic to a server outside business hours, regardless of user, is an example of:', a: ['Rule-based access control', 'Discretionary access control', 'Role-based access control', 'Identity-based access control'], c: 0,
      e: 'Global rules apply to all subjects without regard to their identity.',
      r: 'Глобальные правила действуют на всех субъектов вне зависимости от личности.' },
    { o: '5.4', d: 3, q: 'In an access control matrix, a row representing all the objects a single subject can access, and with what rights, is called a:', a: ['Capability list', 'Access control list', 'Security label', 'Clearance'], c: 0,
      e: 'Rows are capability lists (per subject). Columns are ACLs (per object).',
      r: 'Строки — списки возможностей (по субъекту), столбцы — ACL (по объекту).' },
    { o: '5.6', d: 2, q: 'In Kerberos, which component issues the Ticket Granting Ticket (TGT)?', a: ['Authentication Service (AS)', 'Ticket Granting Service (TGS)', 'The target application server', 'The client'], c: 0,
      e: 'The AS (part of the KDC) issues the TGT. The TGS issues service tickets.',
      r: 'AS (часть KDC) выдаёт TGT; TGS выдаёт сервисные билеты.' },
    { o: '5.6', d: 2, q: 'What is a major operational requirement of Kerberos?', a: ['Time synchronization between clients and the KDC', 'Public key certificates on all clients', 'Cleartext password transmission', 'A separate KDC for each user'], c: 0,
      e: 'Tickets and authenticators include timestamps, and the default tolerance is 5 minutes. Use NTP.',
      r: 'Билеты и аутентификаторы содержат метки времени; допуск по умолчанию 5 минут — нужен NTP.' },
    { o: '5.6', d: 2, q: 'What is the PRIMARY weakness of Kerberos from an availability perspective?', a: ['The KDC is a single point of failure', 'It uses asymmetric encryption, which is slow', 'Tickets never expire', 'It cannot support SSO'], c: 0,
      e: 'If the KDC is down, nobody can obtain tickets, so build in redundancy. It is also a prime target for attack.',
      r: 'Если KDC недоступен, никто не получит билеты — нужна избыточность; KDC также главная цель атак.' },
    { o: '5.6', d: 3, q: 'An attacker who compromised the krbtgt account hash creates TGTs for any user with arbitrary privileges. This is a:', a: ['Golden ticket attack', 'Silver ticket attack', 'Kerberoasting', 'Pass-the-hash'], c: 0,
      e: 'A golden ticket forges TGTs. A silver ticket forges service tickets with a service account hash. Kerberoasting cracks service tickets offline.',
      r: 'Golden ticket — подделка TGT; silver ticket — подделка сервисного билета по хешу сервисной учётки; kerberoasting — офлайн-взлом сервисных билетов.' },
    { o: '5.3', d: 2, q: 'Which standard uses XML assertions to exchange authentication and authorization data between an identity provider and a service provider?', a: ['SAML', 'OAuth 2.0', 'Kerberos', 'LDAP'], c: 0,
      e: 'SAML 2.0 uses XML assertions and is common for enterprise web SSO.',
      r: 'SAML 2.0 использует XML-утверждения; типичен для корпоративного веб-SSO.' },
    { o: '5.3', d: 2, q: 'A mobile app wants to post to a user\'s social media account without ever seeing the user\'s password. Which protocol is designed for this?', a: ['OAuth 2.0', 'SAML', 'RADIUS', 'Kerberos'], c: 0,
      e: 'OAuth 2.0 provides delegated authorization through scoped access tokens.',
      r: 'OAuth 2.0 обеспечивает делегированную авторизацию через ограниченные токены доступа.' },
    { o: '5.3', d: 2, q: 'Which protocol adds an authentication layer on top of OAuth 2.0 by issuing an ID token?', a: ['OpenID Connect', 'SAML', 'SCIM', 'XACML'], c: 0,
      e: 'OIDC issues JWT ID tokens that carry identity claims. Plain OAuth is about authorization only.',
      r: 'OIDC выдаёт ID-токены JWT с утверждениями о личности; OAuth — только авторизация.' },
    { o: '5.3', d: 2, q: 'In a federated SSO transaction, which party authenticates the user?', a: ['Identity provider', 'Service provider', 'Relying party application', 'Resource server'], c: 0,
      e: 'The IdP authenticates the user and issues assertions or tokens. The SP/RP trusts them.',
      r: 'IdP аутентифицирует и выдаёт утверждения/токены; SP/RP им доверяет.' },
    { o: '5.5', d: 2, q: 'An employee has moved through four departments over six years and still holds access from every previous role. This is:', a: ['Privilege creep', 'Separation of duties', 'Least privilege', 'Need to know'], c: 0,
      e: 'Privilege creep (aggregation) comes from not removing old access. Prevent it with mover processes and access reviews.',
      r: 'Privilege creep возникает, когда не удаляют старые права. Предотвращается процессами перевода и пересмотром доступа.' },
    { o: '5.5', d: 2, q: 'What is the BEST control to detect excessive permissions that accumulated over time?', a: ['Periodic access reviews (recertification) by managers or data owners', 'Stronger password policy', 'Annual security awareness training', 'Increasing log retention'], c: 0,
      e: 'Regular attestation of who has what access is how excessive rights are found and removed.',
      r: 'Регулярное подтверждение, у кого какие права, — способ найти и удалить лишние.' },
    { o: '5.5', d: 2, q: 'An employee is being transferred from Finance to Marketing. What should happen to their Finance access?', a: ['Remove it when the transfer takes effect and provision Marketing access based on the new role', 'Keep it in case they need to help former colleagues', 'Keep it for 90 days then review', 'Convert it to read-only permanently'], c: 0,
      e: 'Movers should lose their previous role\'s access. Anything else violates least privilege.',
      r: 'При переводе старые права удаляются; иначе нарушается принцип минимальных привилегий.' },
    { o: '5.5', d: 2, q: 'Which practice BEST reduces the risk of standing administrative privileges?', a: ['Just-in-time privileged access through a PAM solution', 'Giving all IT staff domain admin rights', 'Sharing a single admin password among the team', 'Disabling logging for admin accounts'], c: 0,
      e: 'JIT elevation grants privileges only when needed and for a limited time, with approval and recording.',
      r: 'JIT-повышение даёт привилегии только при необходимости, на время, с одобрением и записью.' },
    { o: '5.5', d: 1, q: 'When should the accounts of a terminated employee be disabled?', a: ['Immediately upon termination', 'After 30 days', 'After the next access review', 'When the manager requests it'], c: 0,
      e: 'Prompt deprovisioning prevents misuse. Retain the account (disabled) for audit, then delete it.',
      r: 'Немедленное отключение предотвращает злоупотребление; учётку сохраняют (отключённой) для аудита, затем удаляют.' },
    { o: '5.6', d: 2, q: 'An attacker tries the password "Winter2026!" against every account in the organization. This is:', a: ['Password spraying', 'Brute force', 'Credential stuffing', 'Rainbow table attack'], c: 0,
      e: 'Spraying tries one or a few common passwords across many accounts to stay under the lockout thresholds.',
      r: 'Spraying — один или несколько популярных паролей по многим учёткам, чтобы не превысить порог блокировки.' },
    { o: '5.6', d: 2, q: 'Users receive repeated MFA push notifications at 2 a.m. until one approves. Which control BEST mitigates this?', a: ['Number matching / phishing-resistant MFA and user reporting', 'Disabling MFA at night', 'Longer passwords', 'Account lockout after 3 pushes only'], c: 0,
      e: 'MFA fatigue is countered by number matching, context display, FIDO2 and training users to report unexpected prompts.',
      r: 'Против MFA fatigue — сопоставление чисел, показ контекста, FIDO2, обучение сообщать о неожиданных запросах.' },
    { o: '5.2', d: 2, q: 'What is the MAIN risk of single sign-on?', a: ['Compromise of one credential grants access to all connected systems', 'Users must remember more passwords', 'It prevents use of MFA', 'It increases help desk password reset calls'], c: 0,
      e: 'SSO concentrates risk ("keys to the kingdom"). Mitigate with strong MFA and monitoring.',
      r: 'SSO концентрирует риск («ключи от королевства»); снижать MFA и мониторингом.' },
    { o: '5.2', d: 2, q: 'Which token type generates a new code every 30–60 seconds based on a shared secret and the current time?', a: ['Synchronous time-based (TOTP)', 'Asynchronous challenge-response', 'Event-based HOTP', 'Static password token'], c: 0,
      e: 'TOTP depends on time synchronization. HOTP uses a counter. Asynchronous tokens respond to a server challenge.',
      r: 'TOTP зависит от синхронизации времени; HOTP — от счётчика; асинхронные отвечают на запрос сервера.' },
    { o: '5.1', d: 2, q: 'A badge system shows an employee entered the London office, while the VPN logs show the same user logging in from another country one minute later. What does this illustrate?', a: ['The value of correlating physical and logical access controls', 'A failure of RBAC', 'A normal roaming condition', 'A Type I biometric error'], c: 0,
      e: 'Integrating physical and logical access data reveals "impossible travel" and credential misuse.',
      r: 'Интеграция физического и логического доступа выявляет «невозможное перемещение» и злоупотребление учётными данными.' },
    { o: '5.2', d: 3, q: 'Before issuing a high-assurance credential to a new contractor, what should be done FIRST?', a: ['Identity proofing to verify the person is who they claim to be', 'Enrolling the contractor in MFA', 'Assigning them to an RBAC role', 'Configuring their session timeout'], c: 0,
      e: 'Registration starts with identity proofing (IAL). Without it, strong authenticators bind to an unverified identity.',
      r: 'Регистрация начинается с подтверждения личности (IAL); иначе сильные аутентификаторы привяжутся к непроверенной личности.' },
    { o: '5.3', d: 3, q: 'An organization uses a cloud IdP and wants user accounts in SaaS applications to be created and disabled automatically when HR updates records. What standard supports this?', a: ['SCIM', 'SAML', 'OIDC', 'LDAP referral'], c: 0,
      e: 'SCIM automates provisioning and deprovisioning across domains. SAML and OIDC handle authentication.',
      r: 'SCIM автоматизирует создание и отключение учёток между доменами; SAML и OIDC — аутентификация.' },
    { t: 'match', o: '5.4', d: 2, q: 'Match each access control model to its decision basis.', pairs: [['DAC', 'Owner\'s discretion'], ['MAC', 'Labels and clearances enforced by system'], ['RBAC', 'Job role'], ['ABAC', 'Attributes of subject, object and environment']],
      e: 'Know who decides in each model.', r: 'Знайте, кто принимает решение в каждой модели.' },
    { t: 'order', o: '5.6', d: 3, q: 'Order the Kerberos steps from logon to accessing a service.', items: ['Client authenticates to the AS', 'AS returns a TGT', 'Client presents TGT to the TGS', 'TGS returns a service ticket', 'Client presents the service ticket to the server'],
      e: 'AS → TGT → TGS → service ticket → service.', r: 'AS → TGT → TGS → сервисный билет → сервис.' },
  ],
});
