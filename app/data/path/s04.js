'use strict';
// Learning path, stage 4: who are you? Identity and access. IAAA and factors, passwords and MFA, attacks on logins,
// biometrics, authorization models, directories and SSO, Kerberos, federation, the account lifecycle, PAM, physical access.
CISSP.stage(4, { cards: [
  { id: 's04-001', kind: 'story', k: ['d5-c1', 'd1-c14'], lvl: 1,
    title: { en: `Uber 2022: approve, just to make it stop`, ru: `Uber 2022: одобрить, лишь бы прекратилось` },
    body: {
      en: `<p>In September 2022, an attacker got the password of an Uber contractor. Uber said it was probably bought on the dark web after malware infected the contractor's personal device.</p><p>The password alone wasn't enough: each login sent a push request to the contractor's phone. So the attacker kept trying, again and again, and the contractor eventually approved one. Reports said the attacker also messaged the contractor posing as Uber IT, saying that approving would make the prompts stop.</p><p>Once inside, the attacker reached internal tools and announced the hack in the company's Slack.</p>`,
      ru: `<p>В сентябре 2022 года злоумышленник получил пароль подрядчика Uber. По словам компании, его, вероятно, купили в даркнете после того, как вредонос заразил личное устройство подрядчика.</p><p>Одного пароля было мало: каждый вход отправлял push-запрос на телефон подрядчика. Тогда злоумышленник стал пробовать снова и снова, и подрядчик в итоге одобрил один из запросов. По сообщениям, атакующий ещё и написал ему от имени IT Uber: мол, подтвердите — и запросы прекратятся.</p><p>Оказавшись внутри, он добрался до внутренних систем и объявил о взломе в корпоративном Slack.</p>`,
    },
    take: { en: `A second factor helps only if people understand what they are approving.`, ru: `Второй фактор помогает, только если человек понимает, что он подтверждает.` } },

  { id: 's04-002', kind: 'idea', k: ['d5-c1'], lvl: 1,
    title: { en: `Four questions every login answers`, ru: `Четыре вопроса, на которые отвечает каждый вход` },
    body: {
      en: `<ol><li><b>Identification</b>: who do you say you are? A username, an email, a badge number.</li><li><b>Authentication</b>: prove it. A password, a code from your phone, a fingerprint.</li><li><b>Authorization</b>: now that we know who you are, what may you do?</li><li><b>Accountability</b>: what did you actually do? Logs tie each action to one person.</li></ol><p>The four are often shortened to <b>IAAA</b>. Accountability only works if every person has their own account: a shared login leaves the logs unable to say who did it.</p>`,
      ru: `<ol><li><b>Идентификация</b>: кем вы себя называете? Логин, почта, номер пропуска.</li><li><b>Аутентификация</b>: докажите. Пароль, код с телефона, отпечаток пальца.</li><li><b>Авторизация</b>: теперь, когда мы знаем, кто вы, что вам можно?</li><li><b>Подотчётность</b>: что вы на самом деле сделали? Журналы связывают каждое действие с одним человеком.</li></ol><p>Вместе их сокращают до <b>IAAA</b>. Подотчётность работает, только если у каждого своя учётная запись: по общему логину журналы не скажут, кто это сделал.</p>`,
    },
    take: { en: `Claim, prove, permit, record.`, ru: `Заявить, доказать, разрешить, записать.` } },

  { id: 's04-003', kind: 'vs', k: ['d5-c1'], lvl: 1,
    title: { en: `Identification vs authentication vs authorization`, ru: `Идентификация, аутентификация, авторизация` },
    body: {
      en: `<p>Think of a hotel:</p><ul><li><b>Identification</b>: at the desk you say "I'm Anna Petrova, I have a booking."</li><li><b>Authentication</b>: you show your passport, and the clerk checks that the photo matches your face.</li><li><b>Authorization</b>: your key card opens room 412 and the gym, not other guests' rooms.</li></ul><p>An exam trick: typing a username is identification only. The password that follows is authentication. Deciding which folders you see is authorization.</p>`,
      ru: `<p>Представьте отель:</p><ul><li><b>Идентификация</b>: на ресепшене вы говорите «Я Анна Петрова, у меня бронь».</li><li><b>Аутентификация</b>: вы показываете паспорт, и администратор сверяет фото с лицом.</li><li><b>Авторизация</b>: ваша карта открывает номер 412 и спортзал, но не чужие номера.</li></ul><p>Экзаменационная ловушка: ввод логина — только идентификация. Пароль после него — аутентификация. Решение, какие папки вам видны, — авторизация.</p>`,
    },
    take: { en: `Saying who you are, proving it and being allowed in are three different steps.`, ru: `Назваться, доказать и получить разрешение — три разных шага.` } },

  { id: 's04-004', kind: 'think', k: ['d5-c1', 'd7-c2'], lvl: 1,
    title: { en: `Who deleted the price list?`, ru: `Кто удалил прайс-лист?` },
    body: {
      en: `<p>A small sales team of five shares one login, "sales", to the company's online shop admin panel. It's convenient: nobody waits for an account. One morning the price list is gone. The log says: deleted by "sales" at 23:40.</p><p>The team lead asks you to find out who did it. What can you tell him, and what do you change?</p>`,
      ru: `<p>Пятеро продавцов пользуются одним логином «sales» в админке интернет-магазина. Удобно: никто не ждёт учётку. Однажды утром прайс-лист исчез. В журнале: удалил «sales» в 23:40.</p><p>Руководитель просит выяснить, кто это сделал. Что вы ему скажете и что измените?</p>`,
    },
    reveal: {
      en: `<p><b>You can't tell him, and that is the finding.</b> With a shared account there is no accountability: the log names an account, not a person. It also can't be cleanly revoked when one of the five leaves.</p><p>Fix the cause: give each person their own account with only the rights they need, and keep the logs. If a shared account is truly unavoidable, put it in a vault that records who checked it out and when.</p>`,
      ru: `<p><b>Никак, и это и есть вывод.</b> При общей учётке нет подотчётности: журнал называет учётную запись, а не человека. К тому же её не отозвать аккуратно, когда один из пятерых уйдёт.</p><p>Устраните причину: каждому — своя учётка с нужными правами, журналы — сохранять. Если общая учётка действительно неизбежна, храните её в хранилище, которое записывает, кто и когда её брал.</p>`,
    },
    take: { en: `Shared accounts destroy accountability.`, ru: `Общие учётные записи уничтожают подотчётность.` } },

  { id: 's04-005', kind: 'idea', k: ['d5-c1'], lvl: 1,
    title: { en: `Three ways to prove it's you`, ru: `Три способа доказать, что это вы` },
    body: {
      en: `<p>Authentication factors come in three types:</p><ul><li><b>Something you know</b> (type 1): a password, a PIN, an answer to a question.</li><li><b>Something you have</b> (type 2): a phone with an authenticator app, a smart card, a hardware key.</li><li><b>Something you are</b> (type 3): a fingerprint, a face, an iris.</li></ul><p>Context can add more signals: <b>somewhere you are</b> (location, company network) and <b>something you do</b> (typing rhythm). Each type fails differently: knowledge can be phished, things can be stolen, and a fingerprint can't be changed.</p>`,
      ru: `<p>Факторы аутентификации бывают трёх типов:</p><ul><li><b>Знание</b> (тип 1): пароль, PIN, ответ на вопрос.</li><li><b>Владение</b> (тип 2): телефон с приложением-аутентификатором, смарт-карта, аппаратный ключ.</li><li><b>Свойство</b> (тип 3): отпечаток пальца, лицо, радужка.</li></ul><p>Контекст добавляет сигналы: <b>где вы</b> (местоположение, корпоративная сеть) и <b>что вы делаете</b> (ритм набора). Каждый тип ломается по-своему: знание выманивают фишингом, вещи крадут, а отпечаток не поменяешь.</p>`,
    },
    take: { en: `Know, have, are: each factor type fails in its own way.`, ru: `Знать, иметь, быть: каждый тип фактора ломается по-своему.` } },

  { id: 's04-006', kind: 'vs', k: ['d5-c1'], lvl: 1,
    title: { en: `Real MFA vs "two passwords"`, ru: `Настоящая MFA и «два пароля»` },
    body: {
      en: `<p><b>Multi-factor authentication</b> (MFA) means factors of <b>different types</b>. The point is that one kind of attack can't defeat both.</p><ul><li>Password + PIN: both are things you know. Still <b>single-factor</b>: one phishing page collects both.</li><li>Password + security question: the same.</li><li>Smart card + PIN: have + know. Real MFA.</li><li>Fingerprint + palm scan: both are things you are. Single-factor.</li></ul><p>Count the types, not the steps.</p>`,
      ru: `<p><b>Многофакторная аутентификация</b> (MFA) — это факторы <b>разных типов</b>. Смысл в том, чтобы одна атака не победила оба.</p><ul><li>Пароль + PIN: оба — знание. Всё ещё <b>однофакторная</b>: одна фишинговая страница соберёт и то, и другое.</li><li>Пароль + контрольный вопрос: то же самое.</li><li>Смарт-карта + PIN: владение + знание. Настоящая MFA.</li><li>Отпечаток + скан ладони: оба — свойство. Однофакторная.</li></ul><p>Считайте типы, а не шаги.</p>`,
    },
    take: { en: `Two things you know are still one factor.`, ru: `Два знания — всё ещё один фактор.` } },

  { id: 's04-007', kind: 'picture', k: ['d5-c1', 'd7-c2'], lvl: 1,
    title: { en: `The four steps, and how each one is attacked`, ru: `Четыре шага и как атакуют каждый` },
    body: {
      en: `<p>Each step of IAAA has its own typical failure. Uber's attacker beat authentication; many breaches then succeed because authorization gave the account far too much.</p>`,
      ru: `<p>У каждого шага IAAA свой типичный провал. Атакующий в Uber победил аутентификацию; многие взломы затем удаются потому, что авторизация дала учётке слишком много.</p>`,
    },
    dg: { title: { en: `IAAA and its weak points`, ru: `IAAA и слабые места` }, h: 250,
      nodes: [
        ['i', 95, 70, { en: 'Identify', ru: 'Идентификация' }, { en: 'username', ru: 'логин' }, '🪪', 'key'],
        ['a', 285, 70, { en: 'Authenticate', ru: 'Аутентификация' }, { en: 'factors', ru: 'факторы' }, '🔑', 'key'],
        ['z', 475, 70, { en: 'Authorize', ru: 'Авторизация' }, { en: 'permissions', ru: 'права' }, '🚪', 'key'],
        ['c', 665, 70, { en: 'Account', ru: 'Подотчётность' }, { en: 'logs', ru: 'журналы' }, '📜', 'key'],
        ['ib', 95, 190, { en: 'Guessed names', ru: 'Угаданные логины' }, { en: 'email format', ru: 'формат почты' }, '⚠', 'bad'],
        ['ab', 285, 190, { en: 'Stolen factors', ru: 'Украденные факторы' }, { en: 'phishing, push spam', ru: 'фишинг, спам push' }, '⚠', 'bad'],
        ['zb', 475, 190, { en: 'Too many rights', ru: 'Лишние права' }, { en: 'privilege creep', ru: 'накопление прав' }, '⚠', 'bad'],
        ['cb', 665, 190, { en: 'Shared accounts', ru: 'Общие учётки' }, { en: 'no one to blame', ru: 'некого спросить' }, '⚠', 'bad'],
      ],
      edges: [
        ['i', 'a', null], ['a', 'z', null], ['z', 'c', null],
        ['ib', 'i', null, 'bad'], ['ab', 'a', null, 'bad'], ['zb', 'z', null, 'bad'], ['cb', 'c', null, 'bad'],
      ] },
    take: { en: `Strong authentication doesn't fix loose authorization, or missing logs.`, ru: `Сильная аутентификация не исправит слабую авторизацию или отсутствие журналов.` } },

  { id: 's04-008', kind: 'idea', k: ['d5-c1'], lvl: 2,
    title: { en: `Passwords: what the modern rules actually say`, ru: `Пароли: что на самом деле говорят современные правила` },
    body: {
      en: `<p>Old rules (8 characters, a symbol, change every 90 days) produced <i>Summer2024!</i>, then <i>Autumn2024!</i>. NIST's guidance (SP 800-63B) now says:</p><ul><li><b>Length</b> matters most: long passphrases. When a password is the only factor, NIST's 2025 revision asks for at least 15 characters.</li><li><b>Check against breached-password lists</b> and reject known ones.</li><li><b>No forced periodic changes</b>, only when there are signs of compromise.</li><li><b>No composition rules</b> (must contain a digit and a symbol).</li><li><b>Limit login attempts</b>, and allow paste so password managers work.</li></ul>`,
      ru: `<p>Старые правила (8 символов, спецсимвол, смена каждые 90 дней) порождали <i>Summer2024!</i>, затем <i>Autumn2024!</i>. Рекомендации NIST (SP 800-63B) теперь такие:</p><ul><li>Важнее всего <b>длина</b>: длинные парольные фразы. Если пароль — единственный фактор, редакция NIST 2025 года требует не меньше 15 символов.</li><li><b>Проверять по базам утёкших паролей</b> и отклонять известные.</li><li><b>Без принудительной периодической смены</b>, только при признаках компрометации.</li><li><b>Без правил состава</b> («обязательно цифра и спецсимвол»).</li><li><b>Ограничивать число попыток</b> и разрешать вставку, чтобы работали менеджеры паролей.</li></ul>`,
    },
    take: { en: `Long, unique, unbreached, and changed when compromised, not by the calendar.`, ru: `Длинный, уникальный, не утёкший и меняется при компрометации, а не по календарю.` } },

  { id: 's04-009', kind: 'story', k: ['d5-c7', 'd5-c1', 'd2-c1'], lvl: 1,
    title: { en: `23andMe 2023: other sites' passwords, your relatives' data`, ru: `23andMe 2023: пароли с чужих сайтов, данные ваших родственников` },
    body: {
      en: `<p>In 2023, attackers took usernames and passwords leaked from <i>other</i> websites and tried them on the genetic testing service 23andMe. People who reused passwords let them into about <b>14,000 accounts</b>.</p><p>That was a small share of users, but many accounts had the "DNA Relatives" feature switched on. Through it, the attackers collected profile information on about <b>6.9 million people</b>: names, family links, ancestry.</p><p>23andMe did not require MFA at the time. It made MFA mandatory after the breach.</p>`,
      ru: `<p>В 2023 году злоумышленники взяли логины и пароли, утёкшие с <i>других</i> сайтов, и попробовали их на сервисе генетических тестов 23andMe. Люди, повторявшие пароли, впустили их примерно в <b>14 000 учётных записей</b>.</p><p>Это малая доля пользователей, но у многих была включена функция «ДНК-родственники». Через неё атакующие собрали данные профилей примерно <b>6,9 млн человек</b>: имена, родственные связи, происхождение.</p><p>Тогда 23andMe не требовала MFA. После утечки она сделала MFA обязательной.</p>`,
    },
    take: { en: `A password reused elsewhere is only as safe as the weakest site that stores it.`, ru: `Пароль, повторённый на других сайтах, защищён не лучше самого слабого из них.` } },

  { id: 's04-010', kind: 'vs', k: ['d5-c7'], lvl: 2,
    title: { en: `Brute force, dictionary, spraying, stuffing`, ru: `Перебор, словарь, spraying, stuffing` },
    body: {
      en: `<ul><li><b>Brute force</b>: try every combination against one account. Stopped by length and lockout.</li><li><b>Dictionary</b>: try likely words and common passwords. Stopped by breached-password checks.</li><li><b>Password spraying</b>: try <i>one</i> common password (Winter2025!) against <i>many</i> accounts, slowly, so no single account locks. Spotted by monitoring for many failures across accounts.</li><li><b>Credential stuffing</b>: replay username/password pairs leaked from another site, as at 23andMe. Stopped by MFA and unique passwords.</li></ul>`,
      ru: `<ul><li><b>Перебор</b> (brute force): все комбинации против одной учётки. Останавливают длина и блокировка.</li><li><b>Словарь</b>: вероятные слова и популярные пароли. Останавливает проверка по базам утечек.</li><li><b>Password spraying</b>: <i>один</i> популярный пароль (Winter2025!) против <i>многих</i> учёток, медленно, чтобы ни одна не заблокировалась. Замечают по множеству неудач в разных учётках.</li><li><b>Credential stuffing</b>: пары логин/пароль, утёкшие с другого сайта, как в 23andMe. Останавливают MFA и уникальные пароли.</li></ul>`,
    },
    take: { en: `Lockout stops brute force, not spraying; only MFA reliably stops stuffing.`, ru: `Блокировка останавливает перебор, но не spraying; stuffing надёжно останавливает только MFA.` } },

  { id: 's04-011', kind: 'back', back: 's01-011', k: ['d5-c1', 'd5-c6'], lvl: 1,
    title: { en: `Colonial Pipeline again: two missing controls on one account`, ru: `Снова Colonial Pipeline: две недостающие меры на одной учётке` },
    body: {
      en: `<p>In stage 1, ransomware stopped a fuel pipeline, starting from one old VPN password. Now you can name what was missing:</p><ul><li><b>No second factor</b> on the VPN. A leaked or reused password was enough to get in.</li><li><b>No clean-up</b>: the account was no longer in use, but nobody had disabled it. A dormant account is pure risk: no one needs it, and no one notices it logging in.</li></ul><p>Either control alone would likely have stopped that entry. Remote access is the first place to require MFA.</p>`,
      ru: `<p>На этапе 1 шифровальщик остановил трубопровод, а началось всё со старого пароля VPN. Теперь вы можете назвать, чего не хватало:</p><ul><li><b>Второго фактора</b> на VPN. Утёкшего или повторённого пароля хватило, чтобы войти.</li><li><b>Уборки</b>: учёткой больше не пользовались, но её никто не отключил. Неактивная учётка — чистый риск: она никому не нужна, и её вход никто не заметит.</li></ul><p>Любая из этих мер, скорее всего, закрыла бы этот вход. MFA в первую очередь нужна на удалённом доступе.</p>`,
    },
    take: { en: `MFA on remote access and disabling dormant accounts: two cheap controls, one avoided crisis.`, ru: `MFA на удалённом доступе и отключение неактивных учёток — две дешёвые меры и один предотвращённый кризис.` } },

  { id: 's04-012', kind: 'idea', k: ['d5-c1', 'd1-c14'], lvl: 2,
    title: { en: `MFA fatigue: wearing people down`, ru: `Усталость от MFA: взять измором` },
    body: {
      en: `<p>Push MFA is easy: a phone pops up "Approve sign-in?" and you tap yes. That ease is the weakness. An attacker who already has the password can send dozens of prompts, often late at night, until the tired or confused person taps yes. This is called <b>MFA fatigue</b> or push bombing, and it's what happened at Uber.</p><p>Fixes: <b>number matching</b> (type the number shown on the login screen into the app), showing the location of the request, limiting prompts, and teaching people that an unexpected prompt means someone has their password.</p>`,
      ru: `<p>Push-MFA проста: на телефоне всплывает «Подтвердить вход?», и вы нажимаете «да». В этой простоте и слабость. Атакующий, у которого уже есть пароль, может отправить десятки запросов, часто ночью, пока уставший или растерянный человек не нажмёт «да». Это называется <b>MFA fatigue</b> (push bombing), и именно так было в Uber.</p><p>Меры: <b>сопоставление чисел</b> (ввести в приложение число с экрана входа), показ места запроса, ограничение числа запросов и обучение: неожиданный запрос означает, что у кого-то есть ваш пароль.</p>`,
    },
    take: { en: `An unexpected MFA prompt is an alarm, not a nuisance: deny it and report it.`, ru: `Неожиданный запрос MFA — сигнал тревоги, а не помеха: отклоните и сообщите.` } },

  { id: 's04-013', kind: 'picture', k: ['d5-c1'], lvl: 2,
    title: { en: `Not all second factors are equal`, ru: `Вторые факторы не равны` },
    body: {
      en: `<p>From weakest to strongest. Any of them beats a password alone, but only the last one can't be phished, because it checks the website's real address itself.</p>`,
      ru: `<p>От слабого к сильному. Любой лучше одного пароля, но только последний нельзя выманить фишингом, потому что он сам проверяет настоящий адрес сайта.</p>`,
    },
    dg: { title: { en: `Second factors, weakest to strongest`, ru: `Вторые факторы: от слабого к сильному` }, h: 250,
      nodes: [
        ['s', 95, 70, { en: 'SMS code', ru: 'Код по SMS' }, null, '💬', 'bad'],
        ['t', 285, 70, { en: 'App code', ru: 'Код в приложении' }, { en: 'TOTP', ru: 'TOTP' }, '🔢', 'dim'],
        ['p', 475, 70, { en: 'Push + number', ru: 'Push + число' }, { en: 'number matching', ru: 'сопоставление' }, '📱', 'ok'],
        ['f', 665, 70, { en: 'FIDO2 / passkey', ru: 'FIDO2 / passkey' }, { en: 'bound to the site', ru: 'привязан к сайту' }, '🔐', 'key'],
        ['sw', 95, 190, { en: 'SIM swap', ru: 'Подмена SIM' }, { en: 'interception', ru: 'перехват' }, '⚠', 'bad'],
        ['tw', 285, 190, { en: 'Typed into', ru: 'Вводится' }, { en: 'a fake page', ru: 'на фальшивой странице' }, '⚠', 'bad'],
        ['pw', 475, 190, { en: 'Still phishable', ru: 'Можно выманить' }, { en: 'via proxy pages', ru: 'через прокси-сайт' }, '⚠', 'dim'],
        ['fw', 665, 190, { en: 'Phishing-resistant', ru: 'Устойчив к фишингу' }, null, '✅', 'ok'],
      ],
      edges: [
        ['s', 't', null], ['t', 'p', null], ['p', 'f', null],
        ['sw', 's', null, 'bad'], ['tw', 't', null, 'bad'], ['pw', 'p', null, 'dash'], ['fw', 'f', null, 'ok'],
      ] },
    take: { en: `Any MFA beats none; phishing-resistant MFA beats the rest.`, ru: `Любая MFA лучше никакой, а устойчивая к фишингу лучше остальных.` } },

  { id: 's04-014', kind: 'idea', k: ['d5-c1'], lvl: 2,
    title: { en: `Passwordless: nothing left to phish`, ru: `Без паролей: нечего выманивать` },
    body: {
      en: `<p><b>FIDO2</b> security keys and <b>passkeys</b> replace the password with a key pair. The private key stays on your device and never leaves it; the website keeps only the public key.</p><p>At login, the site sends a challenge, and your device signs it after you unlock it with a fingerprint or PIN. Crucially, the device signs only for the <b>exact website the key was registered with</b>. A fake page at a look-alike address gets nothing usable.</p><p>There is also nothing on the server worth stealing: a public key can't log anyone in.</p>`,
      ru: `<p>Ключи безопасности <b>FIDO2</b> и <b>passkeys</b> заменяют пароль парой ключей. Закрытый ключ остаётся на вашем устройстве и никогда его не покидает, сайт хранит только открытый.</p><p>При входе сайт присылает запрос, и устройство подписывает его, когда вы разблокируете его отпечатком или PIN. Главное: устройство подписывает только для <b>того самого сайта, где ключ был зарегистрирован</b>. Поддельная страница по похожему адресу не получит ничего полезного.</p><p>И на сервере нечего красть: по открытому ключу никого не впустишь.</p>`,
    },
    take: { en: `Passkeys check the site's address for you, so a fake page gets nothing.`, ru: `Passkeys сами проверяют адрес сайта, и подделка ничего не получает.` } },

  { id: 's04-015', kind: 'vs', k: ['d5-c7', 'd5-c1'], lvl: 2,
    title: { en: `Synchronous vs asynchronous tokens`, ru: `Синхронные и асинхронные токены` },
    body: {
      en: `<p>Code-generating tokens, in an app or on a small device, work in two ways:</p><ul><li><b>Synchronous</b>: token and server share a secret and stay in step. <b>TOTP</b> uses the time (a new code every 30 seconds); <b>HOTP</b> uses a counter that moves on each button press.</li><li><b>Asynchronous</b> (challenge-response): the server sends a random challenge, and the token computes the answer. Nothing has to stay in step.</li></ul><p>TOTP codes break if the token's clock drifts; HOTP codes stay valid until used.</p>`,
      ru: `<p>Токены, генерирующие коды (в приложении или на маленьком устройстве), работают двумя способами:</p><ul><li><b>Синхронные</b>: у токена и сервера общий секрет, и они идут в ногу. <b>TOTP</b> опирается на время (новый код каждые 30 секунд), <b>HOTP</b> — на счётчик, растущий при каждом нажатии.</li><li><b>Асинхронные</b> (запрос-ответ): сервер присылает случайный запрос, токен вычисляет ответ. Ничего синхронизировать не нужно.</li></ul><p>Коды TOTP ломаются, если часы токена уходят; коды HOTP действительны, пока ими не воспользовались.</p>`,
    },
    take: { en: `Synchronous: time or counter. Asynchronous: challenge and response.`, ru: `Синхронный — время или счётчик. Асинхронный — запрос и ответ.` } },

  { id: 's04-016', kind: 'back', back: 's02-022', k: ['d5-c1', 'd1-c14'], lvl: 2,
    title: { en: `The phishing chain again: which link passkeys cut`, ru: `Снова цепочка фишинга: какое звено режут passkeys` },
    body: {
      en: `<p>In stage 2, a phishing attack ran: email → click → fake login page → attacker logs in. Awareness tries to stop the click, but someone always clicks.</p><p>With a password and an app code, the fake page simply asks for both and passes them on in real time. With a passkey, the person can click, can even try to log in, and the attack still fails: the device sees the wrong address and refuses to sign.</p><p>That's why phishing-resistant MFA comes first for admins, finance and remote access.</p>`,
      ru: `<p>На этапе 2 фишинг шёл так: письмо → клик → поддельная страница входа → вход злоумышленника. Осведомлённость пытается остановить клик, но кто-то всегда кликнет.</p><p>При пароле и коде из приложения поддельная страница просто спрашивает оба и передаёт их дальше в реальном времени. С passkey человек может кликнуть и даже попытаться войти, а атака всё равно провалится: устройство видит чужой адрес и отказывается подписывать.</p><p>Поэтому устойчивую к фишингу MFA вводят в первую очередь для админов, финансов и удалённого доступа.</p>`,
    },
    take: { en: `Awareness reduces clicks; phishing-resistant MFA makes the click harmless.`, ru: `Осведомлённость уменьшает число кликов, а устойчивая к фишингу MFA делает клик безвредным.` } },

  { id: 's04-017', kind: 'story', k: ['d5-c1', 'd1-c14'], lvl: 2,
    title: { en: `MGM Resorts 2023: a call to the help desk`, ru: `MGM Resorts 2023: звонок в службу поддержки` },
    body: {
      en: `<p>In September 2023, attackers reportedly found an MGM employee's details on LinkedIn, called the company's IT help desk posing as that person, and got access to their account reset.</p><p>From there they spread through the network and deployed ransomware. Hotel room keys, slot machines and booking systems in Las Vegas were disrupted for days. MGM said the attack cost it about <b>$100 million</b>.</p><p>The strongest login is only as strong as the process that resets it.</p>`,
      ru: `<p>В сентябре 2023 года злоумышленники, по сообщениям, нашли данные сотрудника MGM в LinkedIn, позвонили в IT-поддержку компании от его имени и добились сброса доступа к его учётной записи.</p><p>Дальше они распространились по сети и запустили шифровальщик. Ключи от номеров, игровые автоматы и бронирование в отелях Лас-Вегаса сбоили несколько дней. По словам MGM, атака обошлась примерно в <b>100 млн долларов</b>.</p><p>Самый сильный вход защищён не лучше процесса его сброса.</p>`,
    },
    take: { en: `Account recovery is a login too, and often the weakest one.`, ru: `Восстановление доступа — тоже вход, и часто самый слабый.` } },

  { id: 's04-018', kind: 'think', k: ['d5-c1', 'd5-c6'], lvl: 2,
    title: { en: `"I lost my phone, please reset my MFA"`, ru: `«Я потерял телефон, сбросьте MFA»` },
    body: {
      en: `<p>You run the help desk. A caller says he is Marco from Finance, on a business trip, his phone was stolen, and he must approve payments within the hour. He knows his employee ID and his manager's name. He's polite but stressed.</p><p>What do you do?</p>`,
      ru: `<p>Вы руководите службой поддержки. Звонящий говорит, что он Марко из финансов, в командировке, телефон украли, а через час нужно подтвердить платежи. Он знает свой табельный номер и имя руководителя. Вежлив, но нервничает.</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>Verify through a channel the caller doesn't control, then reset.</b> An employee ID and a manager's name can be found online, and urgency is a classic lever.</p><p>Call back on the number in the HR record, or have his manager confirm by video, or check ID at a local office. Only then issue a temporary code, notify the user by another channel, and watch the account closely afterwards.</p><p>The tempting answer is to help a stressed colleague quickly. Write the verification steps down so staff can say "it's the procedure".</p>`,
      ru: `<p><b>Проверить через канал, который звонящий не контролирует, и только потом сбрасывать.</b> Табельный номер и имя руководителя можно найти в сети, а срочность — классический рычаг.</p><p>Перезвоните по номеру из кадровой записи, или пусть руководитель подтвердит по видеосвязи, или проверьте документы в местном офисе. Лишь затем выдайте временный код, уведомите пользователя по другому каналу и понаблюдайте за учёткой.</p><p>Соблазн — быстро помочь коллеге в стрессе. Запишите шаги проверки, чтобы сотрудники могли сказать: «такова процедура».</p>`,
    },
    take: { en: `Reset only after verifying the person out of band, by a written procedure.`, ru: `Сбрасывайте только после проверки по другому каналу и по записанной процедуре.` } },

  { id: 's04-019', kind: 'idea', k: ['d5-c1', 'd5-c6'], lvl: 2,
    title: { en: `Identity proofing: before the first password`, ru: `Подтверждение личности: до первого пароля` },
    body: {
      en: `<p>Every account rests on one earlier moment: when someone checked that the person getting it is really who they claim. This is <b>identity proofing</b> (registration).</p><ul><li>For staff: HR has seen ID documents; the account is created from the HR record, not from an email asking for one.</li><li>For customers: a document scan with a selfie, a bank check, or a letter to a known address.</li><li>The same strength is needed for <b>recovery</b>: resetting a lost factor is proofing all over again.</li></ul><p>NIST calls these levels IAL (proofing strength) and AAL (login strength).</p>`,
      ru: `<p>Каждая учётка опирается на один более ранний момент: когда кто-то проверил, что её получает действительно тот, кем он себя называет. Это <b>подтверждение личности</b> (регистрация, identity proofing).</p><ul><li>Для сотрудников: HR видел документы, учётка создаётся по кадровой записи, а не по письму с просьбой.</li><li>Для клиентов: скан документа с селфи, проверка через банк или письмо на известный адрес.</li><li>Та же строгость нужна для <b>восстановления</b>: сброс потерянного фактора — это подтверждение заново.</li></ul><p>В NIST это уровни IAL (строгость проверки личности) и AAL (строгость входа).</p>`,
    },
    take: { en: `A strong login on a badly proofed identity protects the wrong person.`, ru: `Сильный вход при плохо проверенной личности защищает не того человека.` } },

  { id: 's04-020', kind: 'idea', k: ['d5-c2'], lvl: 1,
    title: { en: `Biometrics: your body as a key`, ru: `Биометрия: тело как ключ` },
    body: {
      en: `<p>Biometrics measure something you are:</p><ul><li><b>Physiological</b>: fingerprint, face, iris (very accurate and stable over life), retina (the most accurate, but intrusive, and it can reveal health conditions), palm veins, hand geometry.</li><li><b>Behavioral</b>: voice, signature dynamics, typing rhythm, gait. These vary more from day to day.</li></ul><p>A biometric system never sees the "same" finger twice: each reading is slightly different. It compares a new reading with the stored template and decides whether they are close enough. That "close enough" is where errors come from.</p>`,
      ru: `<p>Биометрия измеряет свойства человека:</p><ul><li><b>Физиологические</b>: отпечаток, лицо, радужка (очень точна и не меняется всю жизнь), сетчатка (точнее всего, но инвазивна и может выдать болезни), вены ладони, геометрия руки.</li><li><b>Поведенческие</b>: голос, динамика подписи, ритм набора, походка. Они сильнее меняются день ото дня.</li></ul><p>Биометрическая система никогда не видит «тот же» палец дважды: каждое считывание немного другое. Она сравнивает новое считывание с сохранённым шаблоном и решает, достаточно ли они похожи. Из этого «достаточно» и берутся ошибки.</p>`,
    },
    take: { en: `Biometrics match "close enough", so they can be wrong both ways.`, ru: `Биометрия ищет «достаточно похожее», поэтому ошибается в обе стороны.` } },

  { id: 's04-021', kind: 'vs', k: ['d5-c2'], lvl: 2,
    title: { en: `False rejection vs false acceptance`, ru: `Ложный отказ и ложный допуск` },
    body: {
      en: `<ul><li><b>False rejection</b> (FRR, <b>Type I</b> error): the real person is turned away. Annoying: queues at the door, calls to the help desk.</li><li><b>False acceptance</b> (FAR, <b>Type II</b> error): an impostor is let in. Dangerous: this is the security failure.</li><li><b>CER</b> (crossover error rate, also EER): the setting where FAR equals FRR. Used to compare devices: the <b>lower</b> the CER, the more accurate the device.</li></ul><p>Memory hook: Type I keeps "I" (me) out; Type II lets "two" people in, me and the impostor.</p>`,
      ru: `<ul><li><b>Ложный отказ</b> (FRR, ошибка <b>I рода</b>): настоящего человека не пускают. Неприятно: очереди у двери, звонки в поддержку.</li><li><b>Ложный допуск</b> (FAR, ошибка <b>II рода</b>): впускают самозванца. Опасно: это и есть провал безопасности.</li><li><b>CER</b> (crossover error rate, или EER): настройка, при которой FAR равен FRR. По ней сравнивают устройства: чем <b>ниже</b> CER, тем точнее устройство.</li></ul><p>Подсказка: тип I не пускает «одного» (меня), тип II впускает «двоих» — меня и самозванца.</p>`,
    },
    take: { en: `Type II (false acceptance) is the security failure; lower CER means a better device.`, ru: `Тип II (ложный допуск) — провал безопасности; чем ниже CER, тем лучше устройство.` } },

  { id: 's04-022', kind: 'picture', k: ['d5-c2', 'd5-c8'], lvl: 2,
    title: { en: `One knob, two kinds of error`, ru: `Одна ручка, два вида ошибок` },
    body: {
      en: `<p>Tightening the match threshold lowers false acceptance and raises false rejection. Where you set it depends on what the door protects.</p>`,
      ru: `<p>Ужесточая порог совпадения, вы снижаете ложные допуски и повышаете ложные отказы. Где его выставить, зависит от того, что защищает дверь.</p>`,
    },
    dg: { title: { en: `Setting the threshold`, ru: `Выбор порога` }, h: 250,
      nodes: [
        ['l', 115, 70, { en: 'Loose setting', ru: 'Мягкая настройка' }, { en: 'FAR high: impostors in', ru: 'FAR высок: впустят чужих' }, '🔓', 'bad'],
        ['c', 380, 70, { en: 'CER', ru: 'CER' }, { en: 'FAR = FRR', ru: 'FAR = FRR' }, '⚖', 'key'],
        ['s', 645, 70, { en: 'Strict setting', ru: 'Строгая настройка' }, { en: 'FRR high: staff kept out', ru: 'FRR высок: не пустят своих' }, '🔒', 'dim'],
        ['g', 115, 190, { en: 'Gym locker', ru: 'Шкафчик в спортзале' }, { en: 'convenience first', ru: 'удобство важнее' }, '🏋', 'dim'],
        ['d', 645, 190, { en: 'Data center door', ru: 'Дверь дата-центра' }, { en: 'plus badge, plus guard', ru: 'плюс пропуск и охрана' }, '🏢', 'ok'],
      ],
      edges: [
        ['l', 'c', { en: 'tighten', ru: 'строже' }], ['c', 's', { en: 'tighten', ru: 'строже' }],
        ['g', 'l', { en: 'set here', ru: 'здесь' }, 'dash'], ['d', 's', { en: 'set here', ru: 'здесь' }, 'ok'],
      ] },
    take: { en: `High-security doors accept more false rejections to avoid false acceptances.`, ru: `На важных дверях мирятся с ложными отказами ради отсутствия ложных допусков.` } },

  { id: 's04-023', kind: 'think', k: ['d5-c2', 'd5-c8'], lvl: 2,
    title: { en: `Two scanners for the server room`, ru: `Два сканера для серверной` },
    body: {
      en: `<p>You compare two fingerprint scanners for the server room door. Scanner A: FAR 0.5%, FRR 1%. Scanner B: FAR 0.01%, FRR 4%. The facilities manager prefers A: "Engineers will hate being rejected by B."</p><p>Which do you recommend?</p>`,
      ru: `<p>Вы сравниваете два сканера отпечатков для двери серверной. Сканер A: FAR 0,5%, FRR 1%. Сканер B: FAR 0,01%, FRR 4%. Завхоз за A: «Инженеры возненавидят B за отказы».</p><p>Что вы порекомендуете?</p>`,
    },
    reveal: {
      en: `<p><b>Scanner B.</b> For a high-value room, false acceptance is the failure that matters: with A, one impostor in 200 attempts gets in; with B, one in 10,000.</p><p>The 4% false rejections are real, so plan for them: a second try usually works, and there's a fallback (badge plus PIN, or a guard who checks ID). The scanner should also be one factor of two, combined with a badge.</p><p>If the question were about a canteen turnstile, convenience would win.</p>`,
      ru: `<p><b>Сканер B.</b> Для ценного помещения важен именно ложный допуск: со сканером A пройдёт один самозванец из 200 попыток, с B — один из 10 000.</p><p>Ложные отказы в 4% реальны, поэтому продумайте их: вторая попытка обычно срабатывает, и есть запасной путь (пропуск плюс PIN или охранник, проверяющий документ). К тому же сканер должен быть одним из двух факторов, вместе с пропуском.</p><p>Если бы речь шла о турникете столовой, победило бы удобство.</p>`,
    },
    take: { en: `Choose the error rate by what the door protects.`, ru: `Выбирайте уровень ошибок по тому, что охраняет дверь.` } },

  { id: 's04-024', kind: 'story', k: ['d5-c2'], lvl: 2,
    title: { en: `OPM 2015: 5.6 million fingerprints that can't be changed`, ru: `OPM 2015: 5,6 млн отпечатков, которые не поменять` },
    body: {
      en: `<p>In 2015, the US Office of Personnel Management announced that attackers had stolen its background-check files: personal records of about <b>21.5 million</b> people who had applied for security clearances, along with their families and contacts.</p><p>Among the stolen data were the fingerprints of about <b>5.6 million</b> people. A password can be changed the same day. Those people will have the same fingerprints for the rest of their lives.</p>`,
      ru: `<p>В 2015 году Управление кадров США (OPM) сообщило, что злоумышленники похитили его файлы проверок: персональные данные примерно <b>21,5 млн</b> человек, подававших на допуск к секретным сведениям, а также их родственников и контактов.</p><p>Среди похищенного были отпечатки пальцев примерно <b>5,6 млн</b> человек. Пароль можно сменить в тот же день. Отпечатки у этих людей останутся теми же до конца жизни.</p>`,
    },
    take: { en: `A stolen password can be replaced; a stolen fingerprint can't.`, ru: `Украденный пароль можно заменить, украденный отпечаток — нет.` } },

  { id: 's04-025', kind: 'idea', k: ['d5-c2', 'd1-c4'], lvl: 2,
    title: { en: `Using biometrics wisely`, ru: `Как разумно использовать биометрию` },
    body: {
      en: `<ul><li><b>Keep templates local</b> where you can: a phone's fingerprint reader stores the template in a secure chip and only says "match" or "no match". A central database of fingerprints is a target like OPM's.</li><li><b>Use it as one factor</b>, not the only one: a fingerprint unlocks the key, the key proves you.</li><li><b>Mind privacy law</b>: biometric data is a special category under GDPR and needs a strong legal basis.</li><li><b>Plan for people</b>: enrollment time, throughput at busy doors, people whose fingerprints don't read well, and acceptance.</li></ul>`,
      ru: `<ul><li><b>Храните шаблоны локально</b>, где можно: сканер отпечатков телефона держит шаблон в защищённом чипе и отвечает только «совпало» или «нет». Центральная база отпечатков — мишень, как у OPM.</li><li><b>Используйте как один из факторов</b>, а не единственный: отпечаток открывает ключ, ключ доказывает, что это вы.</li><li><b>Помните о законах</b>: по GDPR биометрия — особая категория данных и требует веского правового основания.</li><li><b>Думайте о людях</b>: время регистрации, пропускная способность у загруженных дверей, люди с плохо читаемыми отпечатками и готовность пользоваться.</li></ul>`,
    },
    take: { en: `Biometrics work best as a local unlock, not as a central database.`, ru: `Биометрия лучше всего работает как локальная разблокировка, а не как центральная база.` } },

  { id: 's04-026', kind: 'idea', k: ['d5-c3'], lvl: 1,
    title: { en: `Authorization: who may do what to which thing`, ru: `Авторизация: кто, что и с чем может делать` },
    body: {
      en: `<p>After login, every request is a question: may this <b>subject</b> (a user or a program) perform this <b>action</b> (read, change, delete) on this <b>object</b> (a file, a record, a printer)?</p><p>Picture a big table: people as rows, files as columns, rights in the cells. That's an <b>access matrix</b>. Read one column and you get an <b>ACL</b> (access control list): who can use this file. Read one row and you get a <b>capability list</b>: everything this person can use.</p><p>The models that follow differ in who fills in the table, and how.</p>`,
      ru: `<p>После входа каждый запрос — это вопрос: может ли этот <b>субъект</b> (пользователь или программа) выполнить это <b>действие</b> (читать, менять, удалять) над этим <b>объектом</b> (файл, запись, принтер)?</p><p>Представьте большую таблицу: люди — строки, файлы — столбцы, права — в клетках. Это <b>матрица доступа</b>. Столбец — это <b>ACL</b> (список контроля доступа): кто может пользоваться файлом. Строка — <b>список возможностей</b> (capability list): всё, чем может пользоваться человек.</p><p>Модели, о которых дальше, различаются тем, кто и как заполняет таблицу.</p>`,
    },
    take: { en: `ACL: who can use this object. Capability list: what this subject can use.`, ru: `ACL — кто может пользоваться объектом. Capability list — чем может пользоваться субъект.` } },

  { id: 's04-027', kind: 'vs', k: ['d5-c3', 'd2-c1'], lvl: 1,
    title: { en: `DAC vs MAC: who holds the pen`, ru: `DAC и MAC: у кого ручка` },
    body: {
      en: `<ul><li><b>Discretionary access control</b> (DAC): the <b>owner</b> of a file decides who gets access, at their discretion. Sharing a document from your drive or setting folder permissions in Windows is DAC. Flexible, but a mistake or a malicious program running as you can share anything you own.</li><li><b>Mandatory access control</b> (MAC): the <b>system</b> decides, by comparing the user's clearance with the object's classification label. Users can't change it, even for their own files. Used in the military and in hardened systems such as SELinux.</li></ul>`,
      ru: `<ul><li><b>Дискреционное управление доступом</b> (DAC): <b>владелец</b> файла сам решает, кому дать доступ. Открыть документ со своего диска или задать права на папку в Windows — это DAC. Гибко, но ошибка или вредонос, работающий от вашего имени, может раздать всё, что вам принадлежит.</li><li><b>Мандатное управление доступом</b> (MAC): решает <b>система</b>, сравнивая допуск пользователя с меткой классификации объекта. Пользователь не может это изменить, даже для своих файлов. Применяется у военных и в защищённых системах вроде SELinux.</li></ul>`,
    },
    take: { en: `DAC: the owner decides. MAC: the labels decide, and nobody can override them.`, ru: `DAC — решает владелец. MAC — решают метки, и обойти их нельзя.` } },

  { id: 's04-028', kind: 'back', back: 's03-019', k: ['d2-c1', 'd5-c3', 'd7-c3'], lvl: 2,
    title: { en: `Labels from stage 3, now enforced by the system`, ru: `Метки из этапа 3 теперь применяет система` },
    body: {
      en: `<p>In stage 3, classification labels said how sensitive data is, and clearance plus need to know decided who may read it. Under MAC, those two ideas become machine rules:</p><ul><li>The system reads the file's label (Secret) and the user's clearance (Secret).</li><li>It also checks the user's <b>compartments</b>: a Secret clearance in "Navy" doesn't open Secret files in "Nuclear". Compartments are need to know, written into the label.</li></ul><p>The label set by the owner at creation now opens or shuts the door automatically.</p>`,
      ru: `<p>На этапе 3 метки классификации говорили, насколько чувствительны данные, а допуск и необходимость знать решали, кто их читает. В MAC эти две идеи становятся правилами машины:</p><ul><li>Система читает метку файла (Secret) и допуск пользователя (Secret).</li><li>Она проверяет и <b>категории</b> (compartments): допуск Secret по «флоту» не открывает файлы Secret по «ядерной программе». Категории — это необходимость знать, записанная в метку.</li></ul><p>Метка, поставленная владельцем при создании, теперь сама открывает или закрывает дверь.</p>`,
    },
    take: { en: `MAC = classification level plus compartments, checked by the machine every time.`, ru: `MAC = уровень классификации плюс категории, и машина проверяет их каждый раз.` } },

  { id: 's04-029', kind: 'idea', k: ['d5-c3', 'd7-c3'], lvl: 1,
    title: { en: `RBAC: permissions belong to jobs, not people`, ru: `RBAC: права принадлежат должностям, а не людям` },
    body: {
      en: `<p>In a company of 3,000, granting rights person by person becomes a mess nobody can review. <b>Role-based access control</b> (RBAC) groups permissions into <b>roles</b> that match jobs: "Accounts payable clerk", "Nurse, ward 4", "Help desk level 1".</p><p>People get roles, and roles carry the rights. A new clerk gets the clerk role on day one; when she moves to sales, she swaps roles instead of collecting more rights.</p><p>RBAC makes least privilege practical and fits companies with high staff turnover. The hard part is keeping the number of roles under control.</p>`,
      ru: `<p>В компании на 3000 человек выдача прав поштучно превращается в хаос, который никто не может проверить. <b>Ролевое управление доступом</b> (RBAC) собирает права в <b>роли</b>, соответствующие должностям: «Бухгалтер по расчётам с поставщиками», «Медсестра, отделение 4», «Поддержка, 1-я линия».</p><p>Людям дают роли, роли несут права. Новая сотрудница получает роль бухгалтера в первый же день; при переходе в продажи она меняет роль, а не копит права.</p><p>RBAC делает минимальные привилегии практичными и подходит компаниям с текучкой. Сложность — не дать числу ролей разрастись.</p>`,
    },
    take: { en: `Assign rights to roles and people to roles; change the role, not the rights.`, ru: `Права — ролям, люди — в роли; меняйте роль, а не права.` } },

  { id: 's04-030', kind: 'vs', k: ['d5-c3'], lvl: 2,
    title: { en: `Rule-based vs attribute-based vs risk-based`, ru: `На правилах, на атрибутах, на риске` },
    body: {
      en: `<ul><li><b>Rule-based</b>: global rules that apply to everyone, whoever they are. "No logins between 01:00 and 05:00." Firewall rules work this way.</li><li><b>Attribute-based</b> (ABAC): a policy combines attributes of the subject (department, clearance), the object (owner, label), the action and the environment (time, location, device). The most granular model, common in cloud and zero trust.</li><li><b>Risk-based</b> (adaptive): computes a risk score for each attempt. A login from a new country on an unknown device triggers an extra factor or a block.</li></ul>`,
      ru: `<ul><li><b>На правилах</b> (rule-based): глобальные правила для всех, кем бы они ни были. «Никаких входов с 01:00 до 05:00». Так работают правила межсетевого экрана.</li><li><b>На атрибутах</b> (ABAC): политика сочетает атрибуты субъекта (отдел, допуск), объекта (владелец, метка), действия и среды (время, место, устройство). Самая детальная модель, типична для облака и zero trust.</li><li><b>На риске</b> (адаптивная): для каждой попытки считается оценка риска. Вход из новой страны с незнакомого устройства требует ещё одного фактора или блокируется.</li></ul>`,
    },
    take: { en: `Rules apply to all; attributes describe the situation; risk scores adapt in real time.`, ru: `Правила — для всех; атрибуты описывают ситуацию; оценка риска подстраивается на лету.` } },

  { id: 's04-031', kind: 'think', k: ['d5-c3'], lvl: 2,
    title: { en: `Only her ward, only on shift`, ru: `Только своё отделение, только в смену` },
    body: {
      en: `<p>A hospital wants this rule: a nurse can open a patient's record only if the patient is on the nurse's ward, only during her shift, and only from a hospital device. Doctors on call can open any record in an emergency, and every such access is reviewed.</p><p>Plain RBAC gives "Nurse" access to records. Which model fits the rule better?</p>`,
      ru: `<p>Больница хочет такое правило: медсестра открывает карту пациента, только если пациент в её отделении, только в её смену и только с больничного устройства. Дежурные врачи в экстренном случае могут открыть любую карту, и каждый такой доступ проверяется.</p><p>Простой RBAC даёт роли «Медсестра» доступ к картам. Какая модель подходит лучше?</p>`,
    },
    reveal: {
      en: `<p><b>Attribute-based access control.</b> The decision depends on the nurse's ward and shift (subject), the patient's ward (object) and the device and time (environment). Roles alone can't express "her ward, now".</p><p>In practice the two work together: RBAC sets the broad role, ABAC narrows it with context. The emergency path, often called <b>break-glass</b>, is allowed but always logged and reviewed, because patient safety comes first.</p>`,
      ru: `<p><b>Управление доступом на основе атрибутов.</b> Решение зависит от отделения и смены медсестры (субъект), отделения пациента (объект), устройства и времени (среда). Одними ролями не выразить «её отделение, сейчас».</p><p>На практике они работают вместе: RBAC задаёт широкую роль, ABAC сужает её контекстом. Экстренный путь, «разбить стекло» (break-glass), разрешён, но всегда журналируется и проверяется, потому что жизнь пациента важнее.</p>`,
    },
    take: { en: `When access depends on context, roles need attributes.`, ru: `Когда доступ зависит от контекста, ролям нужны атрибуты.` } },

  { id: 's04-032', kind: 'picture', k: ['d5-c3'], lvl: 2,
    title: { en: `How an ABAC decision is made`, ru: `Как принимается решение в ABAC` },
    body: {
      en: `<p>Attributes from three sources go to a policy decision point, which compares them with the written policy and answers allow or deny.</p>`,
      ru: `<p>Атрибуты из трёх источников поступают в точку принятия решений, которая сверяет их с политикой и отвечает «разрешить» или «запретить».</p>`,
    },
    dg: { title: { en: `Attributes → policy → decision`, ru: `Атрибуты → политика → решение` }, h: 280,
      nodes: [
        ['s', 120, 50, { en: 'Subject', ru: 'Субъект' }, { en: 'nurse, ward 4, on shift', ru: 'медсестра, отд. 4, в смене' }, '🧑‍⚕️', 'dim'],
        ['o', 120, 140, { en: 'Object', ru: 'Объект' }, { en: 'record, patient in ward 4', ru: 'карта, пациент отд. 4' }, '📄', 'dim'],
        ['e', 120, 230, { en: 'Environment', ru: 'Среда' }, { en: '14:20, hospital tablet', ru: '14:20, больничный планшет' }, '🕑', 'dim'],
        ['p', 410, 140, { en: 'Policy decision', ru: 'Решение по политике' }, { en: 'same ward AND on shift', ru: 'то же отд. И в смене' }, '⚖', 'key'],
        ['y', 650, 80, { en: 'Allow', ru: 'Разрешить' }, null, '✅', 'ok'],
        ['n', 650, 200, { en: 'Deny', ru: 'Запретить' }, null, '⛔', 'bad'],
      ],
      edges: [
        ['s', 'p', null], ['o', 'p', null], ['e', 'p', null],
        ['p', 'y', { en: 'all true', ru: 'всё верно' }, 'ok'], ['p', 'n', { en: 'otherwise', ru: 'иначе' }, 'bad'],
      ] },
    take: { en: `ABAC asks about the person, the thing and the moment, every time.`, ru: `ABAC каждый раз спрашивает о человеке, объекте и моменте.` } },

  { id: 's04-033', kind: 'back', back: 's02-002', k: ['d7-c3', 'd5-c3'], lvl: 2,
    title: { en: `Separation of duties, built into the roles`, ru: `Разделение обязанностей, встроенное в роли` },
    body: {
      en: `<p>In stage 2, separation of duties meant that no one person both creates and approves a payment. RBAC is where that rule becomes enforceable.</p><p>Mark the roles "Payment requester" and "Payment approver" as <b>mutually exclusive</b>: the system refuses to give both to one person, even if a manager asks. Then an access review only has to look for conflicts between roles, not between thousands of single rights.</p><p>The same trick works anywhere: "developer" and "production deployer", "user admin" and "security log admin".</p>`,
      ru: `<p>На этапе 2 разделение обязанностей означало, что один человек не может и создать, и утвердить платёж. В RBAC это правило становится обязательным.</p><p>Пометьте роли «Инициатор платежа» и «Утверждающий платёж» как <b>взаимоисключающие</b>: система откажется дать обе одному человеку, даже по просьбе руководителя. Тогда пересмотр доступа ищет конфликты между ролями, а не между тысячами отдельных прав.</p><p>Так можно везде: «разработчик» и «выкладка в прод», «администратор пользователей» и «администратор журналов безопасности».</p>`,
    },
    take: { en: `Make conflicting roles mutually exclusive, and the system enforces separation of duties.`, ru: `Сделайте конфликтующие роли взаимоисключающими, и система сама обеспечит разделение обязанностей.` } },

  { id: 's04-034', kind: 'idea', k: ['d5-c7'], lvl: 1,
    title: { en: `Directories and single sign-on`, ru: `Каталоги и единый вход` },
    body: {
      en: `<p>A <b>directory</b> is the company's phone book for access: people, groups, computers and their attributes. Active Directory and LDAP-based directories are the classic ones; cloud identity providers such as Entra ID or Okta play the same part online.</p><p><b>Single sign-on</b> (SSO) builds on it: you log in once and reach mail, HR, CRM and dozens of apps without new passwords. People stop reusing and writing down passwords, and MFA is enforced in one place.</p><p>The flip side: one stolen SSO session opens every door. That account needs the strongest protection you have.</p>`,
      ru: `<p><b>Каталог</b> — корпоративный справочник для доступа: люди, группы, компьютеры и их атрибуты. Классика — Active Directory и каталоги на LDAP; облачные поставщики идентификации вроде Entra ID или Okta играют ту же роль в сети.</p><p><b>Единый вход</b> (SSO) строится на нём: вы входите один раз и попадаете в почту, HR, CRM и десятки приложений без новых паролей. Люди перестают повторять и записывать пароли, а MFA требуется в одном месте.</p><p>Обратная сторона: одна украденная сессия SSO открывает все двери. Этой учётке нужна самая сильная защита.</p>`,
    },
    take: { en: `SSO is one key for many doors: easier to protect well, and worse to lose.`, ru: `SSO — один ключ от многих дверей: его проще хорошо защитить и страшнее потерять.` } },

  { id: 's04-035', kind: 'link', k: ['d5-c7', 'd5-c6', 'd1-c8'], lvl: 2,
    title: { en: `SSO turns offboarding into one switch`, ru: `SSO превращает увольнение в один выключатель` },
    body: {
      en: `<p>Remember the sysadmin let go on a Friday afternoon in stage 2? Without SSO, IT must find and disable his accounts in 40 separate systems, and the one they miss becomes an orphaned account.</p><p>With every app connected to the directory, disabling one identity cuts off all of them at once, and the logs show the moment it happened. That's a strong argument for connecting even small apps to SSO.</p><p>Watch for what SSO doesn't cover: local admin accounts, shared vendor logins and API keys still need their own clean-up.</p>`,
      ru: `<p>Помните сисадмина, уволенного в пятницу днём на этапе 2? Без SSO IT должно найти и отключить его учётки в 40 разных системах, и пропущенная станет «осиротевшей».</p><p>Когда все приложения подключены к каталогу, отключение одной идентичности отрезает их все разом, и журнал фиксирует момент. Это сильный довод подключать к SSO даже мелкие приложения.</p><p>Следите за тем, что SSO не охватывает: локальные админские учётки, общие логины поставщиков и API-ключи всё равно нужно чистить отдельно.</p>`,
    },
    take: { en: `Central identity means central revocation: one switch, every door.`, ru: `Централизованная идентичность — централизованный отзыв: один выключатель, все двери.` } },

  { id: 's04-036', kind: 'idea', k: ['d5-c4'], lvl: 2,
    title: { en: `Kerberos: tickets instead of passwords`, ru: `Kerberos: билеты вместо паролей` },
    body: {
      en: `<p>Inside most Windows networks, SSO runs on <b>Kerberos</b>. Think of a fairground:</p><ul><li>At the entrance you show your ID once and get a wristband: the <b>ticket-granting ticket</b> (TGT), from the <b>Authentication Service</b>.</li><li>For each ride you show the wristband at the ticket booth, the <b>Ticket Granting Service</b>, and get a ride ticket: a <b>service ticket</b>.</li><li>The ride checks the ticket, not your ID.</li></ul><p>Both booths together are the <b>KDC</b> (key distribution center). Your password never crosses the network; tickets are encrypted with symmetric keys and expire.</p>`,
      ru: `<p>В большинстве Windows-сетей единый вход работает на <b>Kerberos</b>. Представьте парк аттракционов:</p><ul><li>На входе вы один раз показываете документ и получаете браслет — <b>билет на получение билетов</b> (TGT) от <b>службы аутентификации</b>.</li><li>Для каждого аттракциона вы показываете браслет в кассе — <b>службе выдачи билетов</b> (TGS) — и получаете билет на аттракцион, <b>сервисный билет</b>.</li><li>Аттракцион проверяет билет, а не документ.</li></ul><p>Обе кассы вместе — это <b>KDC</b> (центр распределения ключей). Пароль не передаётся по сети; билеты зашифрованы симметричными ключами и истекают.</p>`,
    },
    take: { en: `Prove yourself once to the KDC, then show tickets, never the password.`, ru: `Один раз докажите себя KDC, дальше показывайте билеты, а не пароль.` } },

  { id: 's04-037', kind: 'picture', k: ['d5-c4'], lvl: 2,
    title: { en: `Kerberos in three steps`, ru: `Kerberos в три шага` },
    body: {
      en: `<p>The laptop talks to the KDC twice and to the file server once. The file server never sees the password, and trusts the ticket because it was made with a key only it and the KDC share.</p>`,
      ru: `<p>Ноутбук обращается к KDC дважды и к файловому серверу один раз. Файловый сервер не видит пароля и доверяет билету, потому что тот сделан ключом, который знают только он и KDC.</p>`,
    },
    dg: { title: { en: `Login, ticket, access`, ru: `Вход, билет, доступ` }, h: 280,
      zones: [[300, 14, 250, 172, { en: 'KDC', ru: 'KDC' }, 'trust']],
      nodes: [
        ['c', 110, 140, { en: 'Your laptop', ru: 'Ваш ноутбук' }, { en: 'logs in once', ru: 'вход один раз' }, '💻', 'dim'],
        ['as', 425, 60, { en: 'Authentication Service', ru: 'Служба аутентификации' }, { en: 'issues the TGT', ru: 'выдаёт TGT' }, '🎟', 'key'],
        ['tgs', 425, 140, { en: 'Ticket Granting Service', ru: 'Служба выдачи билетов' }, { en: 'issues service tickets', ru: 'выдаёт билеты' }, '🎫', 'key'],
        ['f', 425, 240, { en: 'File server', ru: 'Файловый сервер' }, { en: 'checks the ticket', ru: 'проверяет билет' }, '🗄', 'ok'],
      ],
      edges: [
        ['c', 'as', { en: '1. get TGT', ru: '1. получить TGT' }, 'key'],
        ['c', 'tgs', { en: '2. TGT → ticket', ru: '2. TGT → билет' }, 'key'],
        ['c', 'f', { en: '3. ticket → access', ru: '3. билет → доступ' }, 'ok'],
      ] },
    take: { en: `Authentication Service → TGT; Ticket Granting Service → service ticket; service → access.`, ru: `Служба аутентификации → TGT; служба выдачи билетов → сервисный билет; сервис → доступ.` } },

  { id: 's04-038', kind: 'vs', k: ['d5-c4'], lvl: 2,
    title: { en: `Where Kerberos breaks`, ru: `Где ломается Kerberos` },
    body: {
      en: `<ul><li><b>The KDC is a single point of failure</b> and the crown jewel: if it's down nobody logs in; if it's taken, everything is.</li><li><b>Clocks must agree</b>, by default within 5 minutes, because tickets carry timestamps.</li><li><b>Pass-the-ticket</b>: a ticket stolen from a laptop's memory is reused elsewhere.</li><li><b>Kerberoasting</b>: service tickets requested for service accounts are cracked offline to recover weak passwords.</li><li><b>Golden ticket</b>: with the KDC's master key (the krbtgt account), attackers forge tickets for anyone, for as long as they want.</li></ul>`,
      ru: `<ul><li><b>KDC — единая точка отказа</b> и главная ценность: упал — никто не войдёт; захвачен — захвачено всё.</li><li><b>Часы должны совпадать</b>, по умолчанию в пределах 5 минут, потому что в билетах есть метки времени.</li><li><b>Pass-the-ticket</b>: билет, украденный из памяти ноутбука, используют в другом месте.</li><li><b>Kerberoasting</b>: сервисные билеты для сервисных учёток взламывают офлайн, чтобы узнать слабые пароли.</li><li><b>Golden ticket</b>: с главным ключом KDC (учётка krbtgt) атакующий подделывает билеты для кого угодно и на любой срок.</li></ul>`,
    },
    take: { en: `Protect the KDC like the master key it is, and give service accounts long random passwords.`, ru: `Охраняйте KDC как главный ключ и давайте сервисным учёткам длинные случайные пароли.` } },

  { id: 's04-039', kind: 'think', k: ['d5-c4'], lvl: 2,
    title: { en: `Monday morning: nobody can open the file shares`, ru: `Утро понедельника: никто не может открыть общие папки` },
    body: {
      en: `<p>Over the weekend, the network team replaced the server that gives all machines the time. On Monday, dozens of users in one office can't open file shares or internal sites; their passwords are correct, and other offices are fine. The help desk starts resetting passwords.</p><p>What's your first guess, and what do you tell the help desk?</p>`,
      ru: `<p>На выходных сетевая команда заменила сервер, раздающий время всем машинам. В понедельник десятки пользователей в одном офисе не могут открыть общие папки и внутренние сайты; пароли верные, в других офисах всё в порядке. Поддержка начинает сбрасывать пароли.</p><p>Какая ваша первая догадка и что вы скажете поддержке?</p>`,
    },
    reveal: {
      en: `<p><b>Clock skew: stop the password resets.</b> Kerberos tickets carry timestamps, and if a machine's clock drifts more than the allowed skew (5 minutes by default) from the KDC, tickets are rejected. The pattern fits: one office, right after a time-server change, correct passwords.</p><p>Fix the time source, let the clocks resync, and the logins come back. Needless resets just create more tickets for the help desk and weaken trust in the reset process.</p>`,
      ru: `<p><b>Рассинхронизация часов: прекратите сбрасывать пароли.</b> В билетах Kerberos есть метки времени, и если часы машины расходятся с KDC больше допустимого (по умолчанию 5 минут), билеты отвергаются. Картина сходится: один офис, сразу после смены сервера времени, пароли верные.</p><p>Исправьте источник времени, дайте часам синхронизироваться, и входы вернутся. Лишние сбросы лишь создают поддержке работу и подрывают доверие к процедуре сброса.</p>`,
    },
    take: { en: `In Kerberos, time is part of security: wrong clocks mean no tickets.`, ru: `В Kerberos время — часть безопасности: неверные часы — нет билетов.` } },

  { id: 's04-040', kind: 'idea', k: ['d5-c5'], lvl: 2,
    title: { en: `Federation: trusting someone else's login`, ru: `Федерация: доверие чужому входу` },
    body: {
      en: `<p>Kerberos works inside one company. But your staff also use Salesforce, Slack and a partner's portal. Should each keep its own copy of your passwords?</p><p><b>Federation</b> says no. Your company's <b>identity provider</b> (IdP) logs the person in, with your MFA and your rules, and sends the app a signed statement: "this is Anna from Finance, authenticated at 09:02." The app, the <b>service provider</b> (SP) or relying party, trusts that statement because it trusts your IdP's signing key.</p><p>When Anna leaves, disabling her in your directory locks her out of every federated app.</p>`,
      ru: `<p>Kerberos работает внутри одной компании. Но сотрудники пользуются ещё Salesforce, Slack и порталом партнёра. Должен ли каждый хранить свою копию ваших паролей?</p><p><b>Федерация</b> говорит: нет. <b>Поставщик идентификации</b> (IdP) вашей компании выполняет вход — с вашей MFA и вашими правилами — и отправляет приложению подписанное утверждение: «это Анна из финансов, вход в 09:02». Приложение, <b>поставщик услуг</b> (SP, relying party), верит ему, потому что доверяет ключу подписи вашего IdP.</p><p>Когда Анна уходит, отключение в вашем каталоге закрывает ей все федеративные приложения.</p>`,
    },
    take: { en: `The IdP proves who you are; the app trusts the IdP's signature, not a password.`, ru: `IdP доказывает, кто вы; приложение верит подписи IdP, а не паролю.` } },

  { id: 's04-041', kind: 'vs', k: ['d5-c5'], lvl: 2,
    title: { en: `SAML vs OAuth vs OpenID Connect`, ru: `SAML, OAuth и OpenID Connect` },
    body: {
      en: `<ul><li><b>SAML 2.0</b>: XML-based <b>assertions</b> from IdP to SP. The classic for corporate web SSO: log in to the company portal, open the HR system without a new login.</li><li><b>OAuth 2.0</b>: <b>authorization</b>, not authentication. It lets an app act on your behalf with a limited <b>access token</b>: "Allow this app to read your calendar." The app never sees your password.</li><li><b>OpenID Connect</b> (OIDC): an <b>authentication</b> layer on top of OAuth, adding an <b>ID token</b> that says who you are. Behind most "Sign in with…" buttons.</li></ul>`,
      ru: `<ul><li><b>SAML 2.0</b>: XML-<b>утверждения</b> от IdP к SP. Классика корпоративного веб-SSO: вошли на портал компании — открыли HR-систему без нового входа.</li><li><b>OAuth 2.0</b>: <b>авторизация</b>, а не аутентификация. Позволяет приложению действовать от вашего имени с ограниченным <b>токеном доступа</b>: «Разрешить приложению читать календарь». Пароль приложение не видит.</li><li><b>OpenID Connect</b> (OIDC): слой <b>аутентификации</b> поверх OAuth, добавляющий <b>ID-токен</b> — кто вы. За большинством кнопок «Войти через…».</li></ul>`,
    },
    take: { en: `SAML: enterprise SSO. OAuth: delegated access. OIDC: login on top of OAuth.`, ru: `SAML — корпоративный SSO. OAuth — делегированный доступ. OIDC — вход поверх OAuth.` } },

  { id: 's04-042', kind: 'picture', k: ['d5-c5', 'd5-c7'], lvl: 2,
    title: { en: `One login, many apps`, ru: `Один вход, много приложений` },
    body: {
      en: `<p>The app sends you to your company's IdP, the IdP checks you and returns a signed token. The app never handles your password, and every app reuses the same login.</p>`,
      ru: `<p>Приложение отправляет вас к IdP компании, IdP проверяет вас и возвращает подписанный токен. Приложение не касается пароля, и все приложения пользуются одним входом.</p>`,
    },
    dg: { title: { en: `Federated sign-in`, ru: `Федеративный вход` }, h: 290,
      nodes: [
        ['u', 110, 150, { en: 'Anna', ru: 'Анна' }, { en: 'browser', ru: 'браузер' }, '🧑', 'dim'],
        ['sp', 400, 60, { en: 'Cloud app (SP)', ru: 'Облачное приложение (SP)' }, { en: 'trusts the IdP', ru: 'доверяет IdP' }, '☁', 'ok'],
        ['idp', 400, 240, { en: 'Company IdP', ru: 'IdP компании' }, { en: 'password + MFA', ru: 'пароль + MFA' }, '🏢', 'key'],
        ['more', 660, 150, { en: 'Other apps', ru: 'Другие приложения' }, { en: 'Slack, CRM, payroll', ru: 'Slack, CRM, зарплата' }, '🧩', 'ok'],
      ],
      edges: [
        ['u', 'sp', { en: '1. open app', ru: '1. открыть' }],
        ['u', 'idp', { en: '2. sign in', ru: '2. войти' }, 'key'],
        ['idp', 'sp', { en: '3. signed token', ru: '3. токен с подписью' }, 'ok'],
        ['idp', 'more', { en: 'same login', ru: 'тот же вход' }, 'dash'],
      ] },
    take: { en: `Federation moves the password to one place you control.`, ru: `Федерация переносит пароль в одно место, которым вы управляете.` } },

  { id: 's04-043', kind: 'think', k: ['d5-c5', 'd1-c14'], lvl: 2,
    title: { en: `The password changed, the mail still leaks`, ru: `Пароль сменили, а почта всё утекает` },
    body: {
      en: `<p>An employee clicked a link to a "PDF viewer" and approved a screen saying the app wanted to "read and send mail on your behalf". Mail from her inbox is now being forwarded out. IT changed her password and reset her MFA an hour ago, but the forwarding continues.</p><p>Why, and what do you do?</p>`,
      ru: `<p>Сотрудница перешла по ссылке на «просмотрщик PDF» и одобрила экран, где приложение просило «читать и отправлять почту от вашего имени». Теперь письма из её ящика уходят наружу. Час назад IT сменило ей пароль и сбросило MFA, но пересылка продолжается.</p><p>Почему и что делать?</p>`,
    },
    reveal: {
      en: `<p><b>The attacker never had her password: the app holds an OAuth token she granted.</b> Changing the password doesn't revoke that consent. This is <b>consent phishing</b>.</p><p>Revoke the app's grant and its tokens, block the app for the whole company, check other users who approved it, and remove any forwarding rules. Then prevent a repeat: allow only admin-approved apps to request sensitive permissions, and teach people to read consent screens as carefully as login pages.</p>`,
      ru: `<p><b>Пароля у атакующего и не было: у приложения есть OAuth-токен, который она выдала.</b> Смена пароля не отзывает это согласие. Это <b>consent phishing</b> (фишинг согласия).</p><p>Отзовите разрешение приложения и его токены, заблокируйте приложение для всей компании, проверьте других, кто его одобрил, удалите правила пересылки. Затем предотвратите повтор: чувствительные разрешения — только для приложений, одобренных админом, а экраны согласия читать так же внимательно, как страницы входа.</p>`,
    },
    take: { en: `OAuth grants outlive password changes: revoke the token, not just the password.`, ru: `Разрешения OAuth переживают смену пароля: отзывайте токен, а не только пароль.` } },

  { id: 's04-044', kind: 'back', back: 's02-010', k: ['d5-c6', 'd1-c8', 'd5-c5'], lvl: 2,
    title: { en: `Joiner, mover, leaver: now automated`, ru: `Пришёл, перешёл, ушёл: теперь автоматически` },
    body: {
      en: `<p>In stage 2, access had to be switched off before the leaving conversation ended. With what you know now, the whole lifecycle can run on its own:</p><ol><li><b>HR</b> records a hire, a transfer or a leaving date.</li><li>The <b>identity system</b> creates, changes or disables the identity, with roles from the job title.</li><li>Connected apps follow through federation, or through <b>SCIM</b>, a standard for creating and removing accounts in cloud apps automatically.</li></ol><p>HR becomes the single source of truth, and nobody has to remember the 40 systems.</p>`,
      ru: `<p>На этапе 2 доступ нужно было отключить до конца разговора об увольнении. С тем, что вы знаете теперь, весь жизненный цикл может идти сам:</p><ol><li><b>HR</b> фиксирует приём, перевод или дату ухода.</li><li><b>Система управления идентификацией</b> создаёт, меняет или отключает идентичность с ролями по должности.</li><li>Подключённые приложения следуют за ней через федерацию или через <b>SCIM</b> — стандарт автоматического создания и удаления учёток в облачных приложениях.</li></ol><p>HR становится единым источником правды, и никому не нужно помнить про 40 систем.</p>`,
    },
    take: { en: `Drive accounts from the HR record, and let the systems follow automatically.`, ru: `Управляйте учётками от кадровой записи, а системы пусть следуют автоматически.` } },

  { id: 's04-045', kind: 'idea', k: ['d5-c6', 'd7-c3'], lvl: 1,
    title: { en: `Privilege creep and access reviews`, ru: `Накопление прав и пересмотр доступа` },
    body: {
      en: `<p>Ten years, four departments: an employee who kept every old right as she moved now has access to payroll, the warehouse system and the marketing budget. This is <b>privilege creep</b>.</p><p>Two controls stop it:</p><ul><li><b>On every move</b>: remove the old role before adding the new one.</li><li><b>Access reviews</b> (recertification): every quarter or half-year, managers and data owners confirm each person's access is still needed. Privileged accounts are reviewed more often.</li></ul><p>A review where the manager clicks "approve all" is theatre. Show reviewers what changed and what is unused.</p>`,
      ru: `<p>Десять лет, четыре отдела: сотрудница, сохранявшая все старые права при переходах, теперь имеет доступ к зарплатам, складской системе и маркетинговому бюджету. Это <b>накопление привилегий</b> (privilege creep).</p><p>Его останавливают две меры:</p><ul><li><b>При каждом переходе</b>: сначала убрать старую роль, потом добавить новую.</li><li><b>Пересмотр доступа</b> (ресертификация): раз в квартал или полгода руководители и владельцы данных подтверждают, что доступ ещё нужен. Привилегированные учётки — чаще.</li></ul><p>Пересмотр, где руководитель жмёт «одобрить всё», — театр. Покажите проверяющим, что изменилось и чем не пользуются.</p>`,
    },
    take: { en: `Remove old access on every move, and make someone re-confirm the rest regularly.`, ru: `Убирайте старый доступ при каждом переходе и регулярно подтверждайте остальной.` } },

  { id: 's04-046', kind: 'back', back: 's03-006', k: ['d2-c2', 'd5-c6'], lvl: 2,
    title: { en: `Who approves access? The data owner again`, ru: `Кто утверждает доступ? Снова владелец данных` },
    body: {
      en: `<p>In stage 3, the data owner classified the data and approved who gets access; the custodian applied it. Access requests and reviews follow the same split:</p><ul><li>The <b>owner</b> (head of HR for HR data) approves each request and confirms access in reviews.</li><li>The person's <b>manager</b> confirms the job still needs it.</li><li><b>IT</b>, the custodian, grants and removes the rights. It doesn't decide.</li></ul><p>If IT approves its own grants, nobody independent checks them: separation of duties again.</p>`,
      ru: `<p>На этапе 3 владелец данных классифицировал их и утверждал доступ, а хранитель применял решение. Запросы и пересмотры доступа устроены так же:</p><ul><li><b>Владелец</b> (директор по персоналу для кадровых данных) утверждает каждый запрос и подтверждает доступ при пересмотре.</li><li><b>Руководитель</b> человека подтверждает, что это нужно для работы.</li><li><b>IT</b>, хранитель, выдаёт и снимает права. Оно не решает.</li></ul><p>Если IT само утверждает свои выдачи, их никто независимо не проверяет: снова разделение обязанностей.</p>`,
    },
    take: { en: `Owner approves, manager confirms the need, IT carries it out.`, ru: `Владелец утверждает, руководитель подтверждает потребность, IT выполняет.` } },

  { id: 's04-047', kind: 'idea', k: ['d5-c6', 'd7-c3'], lvl: 2,
    title: { en: `Privileged access: the keys to the keys`, ru: `Привилегированный доступ: ключи от ключей` },
    body: {
      en: `<p>Admin accounts can create users, read any mailbox and switch off logging. <b>Privileged access management</b> (PAM) handles them separately:</p><ul><li><b>Separate admin accounts</b>: browse and read mail as a normal user; use the admin account only for admin work.</li><li><b>A vault</b> stores admin passwords, hands them out on request and changes them after use.</li><li><b>Just-in-time</b> access: rights are granted for a task and expire after an hour, instead of being permanent.</li><li><b>Session recording</b> and alerts on admin actions.</li></ul>`,
      ru: `<p>Админские учётки могут создавать пользователей, читать любую почту и отключать журналы. <b>Управление привилегированным доступом</b> (PAM) обращается с ними отдельно:</p><ul><li><b>Отдельные админские учётки</b>: в интернет и почту — как обычный пользователь, админская учётка — только для админской работы.</li><li><b>Хранилище</b> держит админские пароли, выдаёт их по запросу и меняет после использования.</li><li>Доступ <b>just-in-time</b>: права выдаются под задачу и истекают через час, а не навсегда.</li><li><b>Запись сессий</b> и оповещения о действиях админов.</li></ul>`,
    },
    take: { en: `Fewer admins, for less time, in separate accounts, recorded.`, ru: `Меньше админов, на меньшее время, в отдельных учётках, под запись.` } },

  { id: 's04-048', kind: 'link', k: ['d5-c6', 'd5-c1', 'd5-c7'], lvl: 2,
    title: { en: `Uber again: from one approved push to everything`, ru: `Снова Uber: от одного одобренного push ко всему` },
    body: {
      en: `<p>Back to the contractor who approved the push. How did one contractor login become access to many internal systems?</p><ul><li><b>Authentication</b>: push MFA without number matching, defeated by fatigue and a fake "IT" message.</li><li><b>Secrets in the open</b>: reports said a script on a network share contained hard-coded admin credentials for the company's privileged access system.</li><li><b>SSO and PAM</b>: with those, the attacker reached many connected tools.</li></ul><p>The vault was the right tool, but its own master key was left in a script anyone could read.</p>`,
      ru: `<p>Вернёмся к подрядчику, одобрившему push. Как один вход подрядчика превратился в доступ ко многим внутренним системам?</p><ul><li><b>Аутентификация</b>: push-MFA без сопоставления чисел, побеждённая усталостью и поддельным сообщением «от IT».</li><li><b>Секреты на виду</b>: по сообщениям, скрипт в общей сетевой папке содержал жёстко прописанные админские учётные данные системы управления привилегированным доступом.</li><li><b>SSO и PAM</b>: с ними атакующий добрался до множества подключённых инструментов.</li></ul><p>Хранилище было верным инструментом, но его собственный главный ключ лежал в скрипте, который мог прочитать каждый.</p>`,
    },
    take: { en: `Centralized access is strong only if its own keys are guarded best of all.`, ru: `Централизованный доступ силён, только если его собственные ключи охраняются лучше всего.` } },

  { id: 's04-049', kind: 'idea', k: ['d5-c6'], lvl: 2,
    title: { en: `Accounts that aren't people`, ru: `Учётки, которые не люди` },
    body: {
      en: `<p>Backups, integrations and scheduled jobs log in too, using <b>service accounts</b>. In many companies they outnumber the staff, and they are often forgotten.</p><ul><li>Give each one a <b>named human owner</b>, who answers in access reviews.</li><li>Grant only the rights the job needs, and block interactive login.</li><li>Use long random secrets managed by the system (Windows gMSA, cloud managed identities) instead of passwords typed into scripts.</li><li>Rename or disable <b>default accounts</b> ("admin", "sa") that come with products.</li></ul>`,
      ru: `<p>Резервное копирование, интеграции и задачи по расписанию тоже входят в систему — через <b>сервисные учётки</b>. Во многих компаниях их больше, чем сотрудников, и о них часто забывают.</p><ul><li>У каждой — <b>владелец-человек</b>, который отвечает за неё при пересмотре доступа.</li><li>Только права, нужные для задачи, и запрет интерактивного входа.</li><li>Длинные случайные секреты под управлением системы (gMSA в Windows, управляемые идентичности в облаке) вместо паролей, вписанных в скрипты.</li><li>Переименуйте или отключите <b>учётки по умолчанию</b> («admin», «sa»), которые приходят с продуктами.</li></ul>`,
    },
    take: { en: `Every service account needs an owner, minimal rights and a secret no human types.`, ru: `У каждой сервисной учётки — владелец, минимум прав и секрет, который никто не набирает руками.` } },

  { id: 's04-050', kind: 'idea', k: ['d5-c8', 'd5-c6'], lvl: 1,
    title: { en: `Doors and data: one identity`, ru: `Двери и данные: одна идентичность` },
    body: {
      en: `<p>Access control covers both <b>physical</b> access (badges, turnstiles, locked rooms, guards) and <b>logical</b> access (accounts, permissions). They protect the same assets: someone who walks into the server room can bypass many logical controls.</p><p>Manage them together: the same person, role and leaving date in both systems. A former employee whose badge still opens the building is as dangerous as one whose VPN still works.</p><p>The same principles apply to both: least privilege (which floors?), need to know, separation of duties and <b>default deny</b>.</p>`,
      ru: `<p>Контроль доступа охватывает и <b>физический</b> доступ (пропуска, турникеты, запертые помещения, охрана), и <b>логический</b> (учётки, права). Они защищают одни и те же активы: тот, кто вошёл в серверную, обходит многие логические меры.</p><p>Управляйте ими вместе: тот же человек, роль и дата ухода в обеих системах. Бывший сотрудник, чей пропуск ещё открывает здание, так же опасен, как тот, чей VPN ещё работает.</p><p>Принципы одни: минимальные привилегии (какие этажи?), необходимость знать, разделение обязанностей и <b>запрет по умолчанию</b>.</p>`,
    },
    take: { en: `Badge and account should start, change and end together.`, ru: `Пропуск и учётка должны появляться, меняться и исчезать вместе.` } },

  { id: 's04-051', kind: 'think', k: ['d5-c8', 'd7-c2'], lvl: 2,
    title: { en: `In the office and in Brazil at once`, ru: `В офисе и в Бразилии одновременно` },
    body: {
      en: `<p>At 10:15, the badge system shows Tomás entering the Madrid office. At 10:22, the VPN logs a successful login with his account from an IP address in Brazil. MFA was passed.</p><p>The VPN team says "MFA passed, so it's fine." What do you think, and what happens next?</p>`,
      ru: `<p>В 10:15 система пропусков показывает, что Томас вошёл в мадридский офис. В 10:22 VPN фиксирует успешный вход под его учёткой с IP-адреса в Бразилии. MFA пройдена.</p><p>Команда VPN говорит: «MFA пройдена, значит, всё нормально». Что вы думаете и что дальше?</p>`,
    },
    reveal: {
      en: `<p><b>Treat it as a likely compromise.</b> One person can't be in two places at once, and passing MFA only means a factor was used, perhaps through fatigue or a stolen session.</p><p>Follow the incident process: confirm with Tomás in person, end the VPN session, block the account until it's secured, and look at what the session touched. This is why linking physical and logical access is worth it: the badge log is the evidence that something is wrong.</p>`,
      ru: `<p><b>Считать это вероятной компрометацией.</b> Человек не может быть в двух местах сразу, а пройденная MFA означает лишь, что фактор был использован — возможно, через усталость или украденную сессию.</p><p>Действуйте по процессу реагирования: подтвердите у Томаса лично, завершите сессию VPN, заблокируйте учётку до её защиты и посмотрите, к чему обращалась сессия. Вот зачем связывать физический и логический доступ: журнал пропусков — доказательство, что что-то не так.</p>`,
    },
    take: { en: `When the badge and the login disagree, believe the badge and investigate the login.`, ru: `Если пропуск и вход противоречат друг другу, верьте пропуску и расследуйте вход.` } },

  { id: 's04-052', kind: 'back', back: 's02-020', k: ['d5-c8', 'd1-c14', 'd7-c11'], lvl: 2,
    title: { en: `Tailgating again: when the door itself says no`, ru: `Снова tailgating: когда «нет» говорит сама дверь` },
    body: {
      en: `<p>In stage 2, a friendly stranger with a coffee followed staff through a door. Training helps people say no, but a polite person holding a door is hard to retrain. Physical controls take the decision away:</p><ul><li><b>Mantrap</b> (access vestibule): two doors, and the second opens only when the first has closed, for one badge at a time.</li><li><b>Turnstiles</b> that count people per badge.</li><li><b>Badge plus PIN</b> or a biometric at sensitive rooms: two factors at the door.</li><li>A <b>guard</b> who can judge situations no rule foresaw.</li></ul>`,
      ru: `<p>На этапе 2 приветливый незнакомец с кофе проходил в дверь вслед за сотрудниками. Обучение помогает сказать «нет», но вежливого человека, придерживающего дверь, трудно переучить. Физические меры снимают с него это решение:</p><ul><li><b>Шлюз</b> (mantrap): две двери, вторая открывается, только когда закрылась первая, по одному пропуску за раз.</li><li><b>Турникеты</b>, считающие людей на каждый пропуск.</li><li><b>Пропуск плюс PIN</b> или биометрия у важных помещений: два фактора на двери.</li><li><b>Охранник</b>, способный оценить ситуации, которых не предусмотрело ни одно правило.</li></ul>`,
    },
    take: { en: `Don't rely on politeness at the door: let the door enforce one badge, one person.`, ru: `Не полагайтесь на вежливость у двери: пусть дверь сама требует «один пропуск — один человек».` } },

  { id: 's04-053', kind: 'idea', k: ['d5-c1'], lvl: 2,
    title: { en: `After login: sessions`, ru: `После входа: сессии` },
    body: {
      en: `<p>Logging in creates a <b>session</b>, and the session is what an attacker wants: steal the session cookie and you skip the password and the MFA.</p><ul><li><b>Timeouts</b>: end idle sessions, and limit how long any session lasts.</li><li><b>Re-authentication</b> for sensitive actions: changing bank details or adding an admin asks for the factor again.</li><li><b>Random session IDs</b>, sent only over encrypted connections, and invalidated on logout.</li><li><b>Lock the screen</b> when you walk away: an unlocked laptop is an open session.</li></ul>`,
      ru: `<p>Вход создаёт <b>сессию</b>, и именно она нужна атакующему: украв cookie сессии, он минует и пароль, и MFA.</p><ul><li><b>Тайм-ауты</b>: завершать бездействующие сессии и ограничивать срок любой сессии.</li><li><b>Повторная аутентификация</b> для важных действий: смена банковских реквизитов или добавление админа снова требует фактор.</li><li><b>Случайные идентификаторы сессий</b>, передаваемые только по шифрованным соединениям и аннулируемые при выходе.</li><li><b>Блокируйте экран</b>, уходя: незаблокированный ноутбук — открытая сессия.</li></ul>`,
    },
    take: { en: `A stolen session skips the login entirely, so keep sessions short and re-check for risky actions.`, ru: `Украденная сессия обходит вход целиком, поэтому держите сессии короткими и перепроверяйте рискованные действия.` } },

  { id: 's04-054', kind: 'link', k: ['d5-c3', 'd5-c1', 'd3-c1'], lvl: 2,
    title: { en: `Identity is the new perimeter`, ru: `Идентичность — новый периметр` },
    body: {
      en: `<p>Stage 1 introduced defense in depth: never one wall. In the past, the main wall was the office network: inside meant trusted. Today staff work from home, apps live in the cloud, and an attacker with a valid login is "inside" anywhere.</p><p>So identity becomes the wall that matters, and every request is checked: who is this (strong MFA), from which device, is this allowed right now (ABAC, risk-based access), and is it still needed (reviews)?</p><p>That idea is called <b>zero trust</b>, and you'll meet it again with networks in stage 5.</p>`,
      ru: `<p>Этап 1 познакомил с эшелонированной защитой: никогда не одна стена. Раньше главной стеной была офисная сеть: внутри — значит, доверенный. Сегодня люди работают из дома, приложения живут в облаке, а атакующий с действующим логином «внутри» где угодно.</p><p>Поэтому главной стеной становится идентичность, и каждый запрос проверяется: кто это (сильная MFA), с какого устройства, разрешено ли это сейчас (ABAC, доступ на основе риска) и нужно ли это ещё (пересмотр)?</p><p>Эта идея называется <b>zero trust</b>, и вы снова встретите её в сетях на этапе 5.</p>`,
    },
    take: { en: `When the network can't be trusted, every access decision rests on identity.`, ru: `Когда сети нельзя доверять, каждое решение о доступе опирается на идентичность.` } },

  { id: 's04-055', kind: 'recap', lvl: 1,
    title: { en: `Stage 4 in seven lines`, ru: `Этап 4 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s04-002', { en: `Identify, authenticate, authorize, account: unique IDs make the last one work.`, ru: `Идентифицировать, аутентифицировать, авторизовать, учесть: последнее работает только с уникальными ID.` }],
      ['s04-006', { en: `MFA means different factor types, not more steps.`, ru: `MFA — это разные типы факторов, а не больше шагов.` }],
      ['s04-013', { en: `Any MFA beats none; phishing-resistant MFA beats the rest.`, ru: `Любая MFA лучше никакой, устойчивая к фишингу — лучше остальных.` }],
      ['s04-021', { en: `False acceptance (Type II) is the security failure; lower CER is better.`, ru: `Ложный допуск (тип II) — провал безопасности; чем ниже CER, тем лучше.` }],
      ['s04-030', { en: `DAC: owner decides. MAC: labels. RBAC: roles. ABAC: attributes and context.`, ru: `DAC — владелец, MAC — метки, RBAC — роли, ABAC — атрибуты и контекст.` }],
      ['s04-041', { en: `SAML for enterprise SSO, OAuth for delegated access, OIDC for login.`, ru: `SAML — корпоративный SSO, OAuth — делегированный доступ, OIDC — вход.` }],
      ['s04-045', { en: `Remove old access on every move, and review the rest regularly.`, ru: `Убирайте старый доступ при каждом переходе и регулярно пересматривайте остальной.` }],
    ],
    take: { en: `Next: how machines talk to each other, and where attackers listen in.`, ru: `Дальше — как машины общаются между собой и где их подслушивают.` } },
] });
