'use strict';
// Beginner layer for Domain 5: plain-words explanation, real-world example and diagrams per concept.

CISSP.explain(5, {
  'd5-c1': {
    plain: {
      en: `<p>At an airport you say your name (<b>identification</b>), show your passport (<b>authentication</b>), get a boarding pass that lets you into one gate (<b>authorization</b>), and cameras record where you went (<b>accountability</b>). Proof comes in three kinds: something you <b>know</b> (password), something you <b>have</b> (phone, security key), something you <b>are</b> (fingerprint). <b>MFA</b> means two or more <i>different</i> kinds; two passwords is still one factor.</p>`,
      ru: `<p>В аэропорту вы называете имя (<b>идентификация</b>), показываете паспорт (<b>аутентификация</b>), получаете посадочный, который пускает к одному выходу (<b>авторизация</b>), а камеры записывают, куда вы шли (<b>подотчётность</b>). Доказательства бывают трёх видов: то, что вы <b>знаете</b> (пароль), то, что у вас <b>есть</b> (телефон, ключ безопасности), то, чем вы <b>являетесь</b> (отпечаток пальца). <b>MFA</b> — это два и более <i>разных</i> вида; два пароля — всё ещё один фактор.</p>`,
    },
    ex: {
      en: `<p>In 2022 an Uber contractor's password was bought by an attacker, who then sent push notification after push notification until the tired contractor tapped "Approve" (MFA fatigue). Phishing-resistant MFA such as FIDO2 passkeys or hardware keys, which are bound to the real website, would have made the stolen password useless.</p>`,
      ru: `<p>В 2022 году атакующий купил пароль подрядчика Uber и затем слал push-уведомление за push-уведомлением, пока уставший подрядчик не нажал «Подтвердить» (MFA fatigue — «усталость от MFA»). Устойчивая к фишингу MFA, например ключи доступа FIDO2 (passkeys) или аппаратные ключи, привязанные к настоящему сайту, сделала бы украденный пароль бесполезным.</p>`,
    },
  },
  'd5-c2': {
    plain: {
      en: `<p>Biometrics use your body as the key. They are never a perfect match, so the system has a sensitivity dial. Set it too loose and strangers get in (<b>false accept</b>, type 2 error, the dangerous one). Set it too tight and the real owner is rejected (<b>false reject</b>, type 1 error, the annoying one). The point where both error rates are equal is the <b>CER</b> (crossover error rate); a lower CER means a more accurate system.</p>`,
      ru: `<p>Биометрия использует тело как ключ. Совпадение никогда не бывает идеальным, поэтому у системы есть регулятор чувствительности. Слишком мягко — пропускает чужих (<b>ложный допуск</b>, ошибка II рода, опасная). Слишком строго — отвергает владельца (<b>ложный отказ</b>, ошибка I рода, раздражающая). Точка, где обе ошибки равны, — <b>CER</b> (равный уровень ошибок); чем он ниже, тем точнее система.</p>`,
    },
    ex: {
      en: `<p>A data center uses palm-vein scanners at the server-room door. The security team tunes them strict (low false accepts) and accepts that staff sometimes need a second try. On employees' phones, Face ID is tuned for convenience, but phones add a PIN fallback and limit attempts. Unlike a password, a leaked fingerprint can't be changed, so biometric templates must be stored protected.</p>`,
      ru: `<p>Дата-центр использует сканеры вен ладони на двери серверной. Команда безопасности настраивает их строго (мало ложных допусков) и мирится с тем, что сотрудникам иногда нужна вторая попытка. На телефонах Face ID настроен на удобство, но есть запасной PIN и лимит попыток. В отличие от пароля, утёкший отпечаток пальца не поменять, поэтому биометрические шаблоны нужно хранить защищёнными.</p>`,
    },
  },
  'd5-c3': {
    plain: {
      en: `<p>Authorization models answer "who decides access?". <b>DAC</b> (discretionary): the file owner decides, like sharing a Google Doc. <b>MAC</b> (mandatory): the system decides by labels and clearances, nobody can override it, as in the military. <b>RBAC</b> (role-based): access comes with your job role, e.g. "Accountant". <b>ABAC</b> (attribute-based): rules combine many facts: "doctors may read records of their own patients, from a hospital device, during their shift".</p>`,
      ru: `<p>Модели авторизации отвечают на вопрос «кто решает о доступе?». <b>DAC</b> (дискреционная): решает владелец файла, как при расшаривании Google Doc. <b>MAC</b> (мандатная): решает система по меткам и допускам, никто не может это переопределить, как в армии. <b>RBAC</b> (ролевая): доступ даётся вместе с должностью, например «Бухгалтер». <b>ABAC</b> (атрибутная): правила сочетают много фактов: «врач может читать карты своих пациентов с больничного устройства во время смены».</p>`,
    },
    ex: {
      en: `<p>A bank gives everyone in the "Teller" role access to the teller app (RBAC). It adds an ABAC rule: wire transfers over €10,000 need a second approver and are only allowed from a branch device during business hours. A personal folder on the file share stays DAC: the employee decides who sees it.</p>`,
      ru: `<p>Банк даёт всем с ролью «Операционист» доступ к приложению операциониста (RBAC). Добавлено правило ABAC: переводы свыше €10 000 требуют второго согласующего и разрешены только с устройства отделения в рабочее время. Личная папка на файловом сервере остаётся DAC: сотрудник сам решает, кто её видит.</p>`,
    },
  },
  'd5-c4': {
    plain: {
      en: `<p>Kerberos works like a festival wristband. You show your ID once at the entrance and get a wristband (the <b>TGT</b>, ticket-granting ticket). At each stage you show the wristband to a booth (the <b>TGS</b>, ticket-granting service) and get a ticket for that stage. Your password never travels to the stages. Everything depends on the trusted central office (the <b>KDC</b>, key distribution center) and on synchronized clocks, because tickets expire.</p>`,
      ru: `<p>Kerberos похож на браслет фестиваля. Вы один раз показываете документ на входе и получаете браслет (<b>TGT</b>, билет на выдачу билетов). У каждой сцены вы показываете браслет кассе (<b>TGS</b>, служба выдачи билетов) и получаете билет на эту сцену. Пароль на сцены никогда не передаётся. Всё зависит от доверенного центрального офиса (<b>KDC</b>, центр распределения ключей) и синхронизированных часов, потому что билеты истекают.</p>`,
    },
    ex: {
      en: `<p>Every Windows domain login uses Kerberos: Active Directory domain controllers are the KDC. Attackers who steal the hash of the special "krbtgt" account can forge their own TGTs (a "golden ticket") and impersonate anyone. That is why incident responders reset the krbtgt password twice after a domain compromise.</p>`,
      ru: `<p>Каждый вход в домен Windows использует Kerberos: контроллеры домена Active Directory и есть KDC. Атакующий, укравший хеш специальной учётки «krbtgt», может сам подделывать TGT («золотой билет») и выдавать себя за кого угодно. Поэтому после компрометации домена специалисты по реагированию дважды меняют пароль krbtgt.</p>`,
    },
    dg: {
      title: { en: 'Kerberos authentication', ru: 'Аутентификация Kerberos' }, h: 280,
      zones: [[480, 30, 270, 160, { en: 'KDC (domain controller)', ru: 'KDC (контроллер домена)' }, 'trust']],
      nodes: [
        ['u', 100, 140, { en: 'User PC', ru: 'ПК пользователя' }, null, '💻'],
        ['as', 615, 75, { en: 'Authentication Service', ru: 'Служба аутентификации' }, 'AS', '🪪', 'key'],
        ['tgs', 615, 150, { en: 'Ticket-Granting Service', ru: 'Служба выдачи билетов' }, 'TGS', '🎫', 'key'],
        ['svc', 615, 245, { en: 'File server', ru: 'Файловый сервер' }, { en: 'the service', ru: 'нужный сервис' }, '🗄', 'ok'],
      ],
      edges: [
        ['u', 'as', { en: '1. log in', ru: '1. вход' }], ['as', 'u', { en: '2. TGT', ru: '2. TGT' }, 'key'],
        ['u', 'tgs', { en: '3. TGT + "file server"', ru: '3. TGT + «файл. сервер»' }], ['tgs', 'u', { en: '4. service ticket', ru: '4. билет сервиса' }, 'key'],
        ['u', 'svc', { en: '5. service ticket', ru: '5. билет сервиса' }, 'ok'],
      ],
      note: { en: 'Symmetric keys only. The KDC is a single point of failure, and clocks must agree within about 5 minutes or tickets are rejected.', ru: 'Только симметричные ключи. KDC — единая точка отказа, а часы должны совпадать примерно до 5 минут, иначе билеты отвергаются.' },
    },
  },
  'd5-c5': {
    plain: {
      en: `<p>Federation lets one organization vouch for its users to another, like a country whose passport is accepted at other borders. The <b>IdP</b> (identity provider) checks who you are; the <b>SP</b> (service provider, the app) trusts the IdP's signed statement. <b>SAML</b> does this with XML, mostly for enterprise web logins. <b>OAuth 2.0</b> is about <i>permission</i>: letting an app act for you without your password ("allow this app to read your calendar"). <b>OpenID Connect</b> adds login on top of OAuth ("Sign in with Google").</p>`,
      ru: `<p>Федерация позволяет одной организации ручаться за своих пользователей перед другой — как страна, чей паспорт принимают на чужих границах. <b>IdP</b> (поставщик идентификации) проверяет, кто вы; <b>SP</b> (поставщик сервиса, приложение) доверяет подписанному утверждению IdP. <b>SAML</b> делает это на XML, в основном для корпоративного входа в веб-приложения. <b>OAuth 2.0</b> — о <i>разрешениях</i>: позволить приложению действовать от вашего имени без пароля («разрешить этому приложению читать ваш календарь»). <b>OpenID Connect</b> добавляет вход поверх OAuth («Войти через Google»).</p>`,
    },
    ex: {
      en: `<p>A company uses Okta as its IdP. Employees open Salesforce, get redirected to Okta, log in once with MFA, and Okta sends Salesforce a signed SAML assertion. When someone leaves, disabling them in Okta cuts access to every federated app at once. Separately, a scheduling app asks "allow access to your Google Calendar?": that is OAuth, and the app never sees the Google password.</p>`,
      ru: `<p>Компания использует Okta как IdP. Сотрудник открывает Salesforce, его перенаправляют в Okta, он один раз входит с MFA, и Okta отправляет в Salesforce подписанное утверждение SAML. Когда человек увольняется, отключение в Okta сразу закрывает доступ ко всем федеративным приложениям. Отдельно: приложение для планирования спрашивает «разрешить доступ к Google Календарю?» — это OAuth, и пароль от Google приложение никогда не видит.</p>`,
    },
    dg: [{
      title: { en: 'SAML web single sign-on', ru: 'Единый вход SAML' }, h: 240,
      nodes: [
        ['u', 100, 130, { en: 'User browser', ru: 'Браузер' }, null, '💻'],
        ['sp', 600, 60, { en: 'Service provider', ru: 'Поставщик сервиса' }, { en: 'e.g. Salesforce', ru: 'например, Salesforce' }, '☁️'],
        ['idp', 600, 200, { en: 'Identity provider', ru: 'Поставщик идентификации' }, { en: 'e.g. Okta, Entra ID', ru: 'например, Okta, Entra ID' }, '🪪', 'key'],
      ],
      edges: [
        ['u', 'sp', { en: '1. open app', ru: '1. открыть' }], ['sp', 'u', { en: '2. go to IdP', ru: '2. иди к IdP' }, 'dash'],
        ['u', 'idp', { en: '3. log in + MFA', ru: '3. вход + MFA' }], ['idp', 'u', { en: '4. signed assertion', ru: '4. подписанное утв.' }, 'key'],
        ['sp', 'idp', { en: 'trust (metadata)', ru: 'доверие (метаданные)' }, 'ok dash both'],
      ],
      note: { en: 'The SP never sees the password. It checks the assertion signature with the IdP certificate it trusts.', ru: 'SP никогда не видит пароль. Он проверяет подпись утверждения сертификатом IdP, которому доверяет.' },
    }, {
      title: { en: 'OAuth 2.0 / OpenID Connect authorization code flow', ru: 'OAuth 2.0 / OpenID Connect: поток с кодом авторизации' }, h: 260,
      nodes: [
        ['u', 100, 60, { en: 'User', ru: 'Пользователь' }, { en: 'resource owner', ru: 'владелец ресурса' }, '🧑'],
        ['app', 100, 200, { en: 'Scheduling app', ru: 'Приложение' }, { en: 'client', ru: 'клиент' }, '📅'],
        ['as', 600, 60, { en: 'Authorization server', ru: 'Сервер авторизации' }, { en: 'Google accounts', ru: 'Google-аккаунт' }, '🪪', 'key'],
        ['rs', 600, 200, { en: 'Resource server', ru: 'Сервер ресурсов' }, { en: 'Calendar API', ru: 'API календаря' }, '🗓', 'ok'],
      ],
      edges: [
        ['u', 'as', { en: '1. log in + consent', ru: '1. вход + согласие' }], ['as', 'app', { en: '2. code → tokens', ru: '2. код → токены' }, 'key'],
        ['app', 'rs', { en: '3. access token', ru: '3. токен доступа' }, 'ok'],
      ],
      note: { en: 'OAuth gives an access token (what the app may do). OIDC adds an ID token (who the user is). The app never handles the password.', ru: 'OAuth выдаёт токен доступа (что приложению можно). OIDC добавляет ID-токен (кто пользователь). Приложение никогда не касается пароля.' },
    }],
  },
  'd5-c6': {
    plain: {
      en: `<p>Accounts have a life cycle that mirrors employment: <b>joiner</b> (create accounts with the access the role needs), <b>mover</b> (change job, so add the new access and <i>remove</i> the old), <b>leaver</b> (disable everything on the last day). Forgetting the "remove" in mover leads to <b>privilege creep</b>: long-serving staff who can access everything. Regular <b>access reviews</b> catch it, and <b>PAM</b> (privileged access management) keeps admin rights locked in a vault and hands them out only when needed.</p>`,
      ru: `<p>У учётных записей жизненный цикл, повторяющий работу человека: <b>приход</b> (создать учётки с доступом, нужным роли), <b>перевод</b> (смена должности: добавить новый доступ и <i>убрать</i> старый), <b>уход</b> (в последний день отключить всё). Если при переводе забывают «убрать», возникает <b>накопление привилегий</b>: старожилы с доступом ко всему. Регулярные <b>пересмотры доступа</b> это ловят, а <b>PAM</b> (управление привилегированным доступом) держит админ-права в хранилище и выдаёт их только по необходимости.</p>`,
    },
    ex: {
      en: `<p>HR enters a new hire in Workday. The IdP picks this up and, via <b>SCIM</b> (a standard API for provisioning), creates accounts in email, Slack and the CRM with the sales role. When the person moves to marketing, the CRM access is removed automatically. An admin who needs to patch a server checks out a one-hour credential from the PAM vault, and the session is recorded.</p>`,
      ru: `<p>HR заводит новичка в Workday. IdP это видит и через <b>SCIM</b> (стандартный API для провижининга) создаёт учётки в почте, Slack и CRM с ролью продавца. Когда человек переходит в маркетинг, доступ к CRM снимается автоматически. Админ, которому нужно пропатчить сервер, берёт из хранилища PAM учётные данные на час, а сессия записывается.</p>`,
    },
    dg: [{
      title: { en: 'Joiner / mover / leaver automation', ru: 'Автоматизация прихода, перевода и ухода' }, h: 260,
      nodes: [
        ['hr', 90, 130, { en: 'HR system', ru: 'HR-система' }, { en: 'source of truth', ru: 'источник истины' }, '🧾', 'key'],
        ['idp', 340, 130, { en: 'Identity provider', ru: 'Поставщик идентиф.' }, { en: 'roles + policies', ru: 'роли + политики' }, '🪪', 'key'],
        ['a1', 610, 50, { en: 'Email', ru: 'Почта' }, null, '📧', 'ok'],
        ['a2', 610, 130, 'Slack', null, '💬', 'ok'],
        ['a3', 610, 210, 'CRM', null, '📇', 'ok'],
      ],
      edges: [['hr', 'idp', { en: 'HR event', ru: 'событие HR' }], ['idp', 'a1', 'SCIM'], ['idp', 'a2', 'SCIM'], ['idp', 'a3', 'SCIM']],
      note: { en: 'Automation from HR means leavers lose access the same day, and periodic access reviews confirm nobody kept rights from an old role.', ru: 'Автоматизация от HR означает, что ушедшие теряют доступ в тот же день, а периодические пересмотры подтверждают, что никто не сохранил права старой роли.' },
    }, {
      title: { en: 'Privileged access management with just-in-time elevation', ru: 'PAM с выдачей прав just-in-time' }, h: 250,
      zones: [[250, 30, 260, 205, 'PAM', 'trust']],
      nodes: [
        ['adm', 100, 130, { en: 'Admin', ru: 'Админ' }, { en: 'normal account', ru: 'обычная учётка' }, '🧑‍💻'],
        ['req', 380, 75, { en: 'Request + approval', ru: 'Запрос + одобрение' }, { en: 'ticket, 1 hour', ru: 'заявка, 1 час' }, '✅', 'key'],
        ['vault', 380, 180, { en: 'Vault + session proxy', ru: 'Хранилище + прокси' }, { en: 'records the session', ru: 'записывает сессию' }, '🔐', 'key'],
        ['srv', 660, 180, { en: 'Server', ru: 'Сервер' }, { en: 'root password rotated', ru: 'пароль root ротируется' }, '🖥', 'ok'],
      ],
      edges: [['adm', 'req', { en: '1. ask', ru: '1. запрос' }], ['req', 'vault', '2'], ['vault', 'srv', { en: '3. temp access', ru: '3. временно' }, 'ok']],
      note: { en: 'No standing admin rights: the admin never learns the real password, the access expires, and every keystroke can be reviewed.', ru: 'Нет постоянных админ-прав: админ не знает настоящий пароль, доступ истекает, а каждое действие можно просмотреть.' },
    }],
  },
  'd5-c7': {
    plain: {
      en: `<p>A <b>directory</b> (like Active Directory or LDAP) is the company phone book of people, groups and computers that systems look up when they decide access. <b>SSO</b> (single sign-on) means logging in once and reaching many apps. It is more convenient and lets you enforce MFA in one place, but it is also one key for many doors: if the SSO account is stolen, everything opens. So SSO accounts need the strongest protection.</p>`,
      ru: `<p><b>Каталог</b> (например, Active Directory или LDAP) — корпоративный справочник людей, групп и компьютеров, к которому обращаются системы, решая о доступе. <b>SSO</b> (единый вход) — войти один раз и попасть во многие приложения. Это удобнее и позволяет требовать MFA в одном месте, но это и один ключ от многих дверей: если учётку SSO украдут, откроется всё. Поэтому учётки SSO требуют самой сильной защиты.</p>`,
    },
    ex: {
      en: `<p>After moving 200 apps behind SSO with Entra ID and requiring phishing-resistant MFA there, a company cut password-reset tickets by 70% and could offboard people with one click. The red team then went straight for the SSO: they targeted the help desk with a fake "I lost my phone" call to reset MFA. The fix: strict identity verification for help-desk resets.</p>`,
      ru: `<p>Переведя 200 приложений на SSO через Entra ID с обязательной устойчивой к фишингу MFA, компания сократила заявки на сброс пароля на 70% и стала отключать уволенных одним кликом. Red team тогда сразу пошла на SSO: позвонила в службу поддержки с легендой «я потерял телефон», чтобы сбросить MFA. Решение: строгая проверка личности при сбросах через поддержку.</p>`,
    },
  },
  'd5-c8': {
    plain: {
      en: `<p>Access control covers both doors and data. Physical access (badges, turnstiles, guards) and logical access (accounts, permissions) should be managed together: the same person, the same role, the same leaving date. A former employee whose badge still works is as dangerous as one whose VPN account still works.</p>`,
      ru: `<p>Контроль доступа охватывает и двери, и данные. Физический доступ (бейджи, турникеты, охрана) и логический (учётки, права) стоит управлять вместе: тот же человек, та же роль, та же дата ухода. Бывший сотрудник с работающим бейджем так же опасен, как и с работающей учёткой VPN.</p>`,
    },
    ex: {
      en: `<p>A company links its badge system to the same HR feed as its IdP. When a contractor's contract ends, both their laptop login and their building badge stop working at 18:00 that day. A badge-in at the server room by someone who isn't logged on anywhere in the building is flagged by the SIEM as suspicious.</p>`,
      ru: `<p>Компания подключает систему пропусков к той же HR-ленте, что и IdP. Когда у подрядчика заканчивается контракт, и вход в ноутбук, и пропуск в здание перестают работать в 18:00 того же дня. Вход по бейджу в серверную человека, который нигде в здании не залогинен, SIEM помечает как подозрительный.</p>`,
    },
  },
});
