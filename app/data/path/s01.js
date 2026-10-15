'use strict';
// Learning path, stage 1: why security exists. Assets, CIA, risk, controls, who decides, policies, ethics.
CISSP.stage(1, { cards: [
  { id: 's01-001', kind: 'story', k: ['d1-c13', 'd1-c9'], lvl: 1,
    title: { en: `How a heating contractor opened the door to 40 million cards`, ru: `Как подрядчик по отоплению открыл дверь к 40 миллионам карт` },
    body: {
      en: `<p>In late 2013, attackers stole data from about <b>40 million payment cards</b> at the US retailer Target, plus personal details of up to 70 million customers. They did not break into Target directly. First they stole the login of a small heating and air-conditioning contractor that had access to a Target supplier portal. From there they reached the store network and planted malware on the checkout terminals.</p><p>Target's monitoring tools did raise alerts. Nobody acted on them in time. The CEO resigned the next year.</p>`,
      ru: `<p>В конце 2013 года злоумышленники похитили данные примерно <b>40 миллионов платёжных карт</b> американской сети Target и личные данные до 70 миллионов клиентов. Напрямую Target они не взламывали. Сначала они украли логин небольшого подрядчика по отоплению и кондиционированию, у которого был доступ к порталу поставщиков Target. Оттуда добрались до сети магазинов и установили вредоносную программу на кассовые терминалы.</p><p>Системы мониторинга Target подняли тревогу, но вовремя на неё никто не отреагировал. Через год генеральный директор ушёл в отставку.</p>`,
    },
    take: { en: `Attackers go for the weakest link, and it is often outside your own walls.`, ru: `Атакуют самое слабое звено, и часто оно находится за пределами вашей компании.` } },

  { id: 's01-002', kind: 'idea', k: ['d1-c9'], lvl: 1,
    title: { en: `First question: what are we protecting?`, ru: `Первый вопрос: что мы защищаем?` },
    body: {
      en: `<p>Security starts with a list, not a firewall. An <b>asset</b> is anything of value to the organization: customer data, the payment system, the factory line, the brand and, above all, people.</p><p>You can't protect everything equally, and you shouldn't try. A cafeteria menu and a database of patient records need very different care. So the first job is to find the assets and ask what each one is worth, and what losing it would cost the business.</p>`,
      ru: `<p>Безопасность начинается со списка, а не с межсетевого экрана. <b>Актив</b> — всё, что ценно для организации: данные клиентов, платёжная система, производственная линия, бренд и прежде всего люди.</p><p>Защитить всё одинаково невозможно, да и не нужно. Меню столовой и база медицинских карт требуют совсем разной заботы. Поэтому первая задача — найти активы и понять, сколько стоит каждый и во что бизнесу обойдётся его потеря.</p>`,
    },
    take: { en: `You can't protect what you don't know you have.`, ru: `Нельзя защитить то, о существовании чего вы не знаете.` } },

  { id: 's01-003', kind: 'idea', k: ['d1-c1'], lvl: 1,
    title: { en: `Confidentiality: only the right eyes`, ru: `Конфиденциальность: только нужным глазам` },
    body: {
      en: `<p>Some information hurts when the wrong person sees it: salaries, medical records, a merger plan, a password. <b>Confidentiality</b> means only authorized people, programs or systems can read it.</p><p>The tools are familiar. Logins and permissions decide who may look, encryption makes stolen data unreadable, and a clean-desk rule keeps papers out of sight. The failure has a name too: <b>disclosure</b>, whether by a hacker, a lost laptop or an email sent to the wrong address.</p>`,
      ru: `<p>Есть информация, которая вредит, если её увидит не тот человек: зарплаты, медицинские карты, план слияния, пароль. <b>Конфиденциальность</b> означает, что прочитать её могут только уполномоченные люди, программы или системы.</p><p>Инструменты знакомы. Логины и права доступа решают, кому можно смотреть, шифрование делает украденные данные нечитаемыми, правило «чистого стола» убирает бумаги с глаз. У нарушения тоже есть имя — <b>раскрытие</b>: через хакера, потерянный ноутбук или письмо не тому адресату.</p>`,
    },
    take: { en: `Disclosure doesn't need a hacker: a misaddressed email counts too.`, ru: `Для раскрытия не нужен хакер: письмо не тому адресату — тоже утечка.` } },

  { id: 's01-004', kind: 'story', k: ['d1-c1'], lvl: 1,
    title: { en: `Stuxnet: the centrifuges looked fine on screen`, ru: `Stuxnet: на экранах центрифуги работали нормально` },
    body: {
      en: `<p>In 2010, researchers found a worm called <b>Stuxnet</b> in industrial control systems at Iran's uranium enrichment site in Natanz. It quietly changed the speed of the centrifuges, enough to wear them out. Meanwhile it played back recordings of normal readings to the operators' screens.</p><p>Nothing was stolen, and at first nothing stopped working. The attack was on <b>integrity</b>: neither the machines nor the data about them could be trusted any more, and for a long time nobody noticed.</p>`,
      ru: `<p>В 2010 году исследователи обнаружили червя <b>Stuxnet</b> в системах управления оборудованием иранского завода по обогащению урана в Натанзе. Он незаметно менял скорость вращения центрифуг — ровно так, чтобы они изнашивались. А на экраны операторов выводил записи нормальных показаний.</p><p>Ничего не украли, и поначалу ничего не остановилось. Атака была на <b>целостность</b>: ни машинам, ни данным о них больше нельзя было доверять, и долго этого никто не замечал.</p>`,
    },
    take: { en: `An integrity attack can be the most dangerous kind: everything looks normal while it isn't.`, ru: `Атака на целостность бывает самой опасной: всё выглядит нормально, хотя это не так.` } },

  { id: 's01-005', kind: 'idea', k: ['d1-c1'], lvl: 1,
    title: { en: `Integrity: nothing changes without permission`, ru: `Целостность: ничего не меняется без разрешения` },
    body: {
      en: `<p><b>Integrity</b> means data and systems are accurate and complete, and change only in authorized ways. A bank balance, a medicine dose or a delivery address is useless, or deadly, if someone can quietly edit it.</p><p>Integrity is protected by limiting who can write, by keeping logs of who changed what, and by mathematical checks (hashes and signatures, which come later in the path) that reveal any change. The failure is called <b>alteration</b>.</p>`,
      ru: `<p><b>Целостность</b> означает, что данные и системы точны и полны и меняются только разрешённым способом. Баланс счёта, доза лекарства или адрес доставки бесполезны или даже смертельно опасны, если их можно незаметно исправить.</p><p>Целостность защищают, ограничивая право на запись, ведя журналы «кто что изменил» и используя математические проверки (хеши и подписи — о них позже), которые выявляют любое изменение. Нарушение называется <b>изменением (alteration)</b>.</p>`,
    },
    take: { en: `Integrity = correct, complete and changed only by those allowed to.`, ru: `Целостность = верно, полно и меняется только теми, кому можно.` } },

  { id: 's01-006', kind: 'idea', k: ['d1-c1'], lvl: 1,
    title: { en: `Availability: there when you need it`, ru: `Доступность: на месте, когда нужно` },
    body: {
      en: `<p>The safest server is one that's unplugged, and it's also useless. <b>Availability</b> means that authorized users can reach data and systems when they need them, at the speed they need.</p><p>An online shop that's down on its busiest sales day, an emergency dispatch system that freezes, or files locked by ransomware are all availability failures. The failure is called <b>destruction</b> (or denial). It's protected by backups, spare equipment, extra capacity and tested recovery plans.</p>`,
      ru: `<p>Самый защищённый сервер — выключенный, но и самый бесполезный. <b>Доступность</b> означает, что уполномоченные пользователи получают данные и системы тогда, когда нужно, и с нужной скоростью.</p><p>Интернет-магазин, упавший в день распродажи, зависшая система вызова скорой, файлы, заблокированные шифровальщиком, — всё это нарушения доступности. Нарушение называется <b>уничтожением (destruction)</b> или отказом в обслуживании. Защита — резервные копии, запасное оборудование, запас мощности и проверенные планы восстановления.</p>`,
    },
    take: { en: `Confidentiality, Integrity, Availability: the CIA triad. Their opposites are Disclosure, Alteration, Destruction (DAD).`, ru: `Конфиденциальность, целостность, доступность — триада CIA. Противоположность — DAD: раскрытие, изменение, уничтожение.` } },

  { id: 's01-007', kind: 'picture', k: ['d1-c1'], lvl: 1,
    title: { en: `One patient record, three ways to fail`, ru: `Одна медкарта — три способа сломаться` },
    body: {
      en: `<p>Every security problem breaks at least one of the three properties. When you meet a new threat or control, ask: which one is it about?</p>`,
      ru: `<p>Любая проблема безопасности нарушает хотя бы одно из трёх свойств. Встречая новую угрозу или меру защиты, спрашивайте: о каком из них речь?</p>`,
    },
    dg: { title: { en: `CIA and its opposite, DAD`, ru: `CIA и её противоположность — DAD` }, h: 300,
      nodes: [
        ['rec', 380, 150, { en: 'Patient record', ru: 'Медкарта' }, null, '📋', 'key'],
        ['c', 140, 50, { en: 'Confidentiality', ru: 'Конфиденциальность' }, { en: 'only the right eyes', ru: 'только нужным глазам' }, '🔒', 'ok'],
        ['i', 620, 50, { en: 'Integrity', ru: 'Целостность' }, { en: 'no silent changes', ru: 'без тайных правок' }, '✅', 'ok'],
        ['a', 380, 260, { en: 'Availability', ru: 'Доступность' }, { en: 'there when needed', ru: 'на месте, когда нужно' }, '⏱', 'ok'],
      ],
      edges: [
        ['c', 'rec', { en: 'Disclosure: chart leaked', ru: 'Раскрытие: утечка' }, 'bad', 0, -14],
        ['i', 'rec', { en: 'Alteration: allergy edited', ru: 'Изменение: правка аллергии' }, 'bad', 0, -14],
        ['a', 'rec', { en: 'Destruction: ransomware', ru: 'Уничтожение: шифровальщик' }, 'bad', 110, 0],
      ],
      note: { en: `The arrows are the attacks; the green boxes are what each attack breaks.`, ru: `Стрелки — атаки, зелёные блоки — то, что каждая атака нарушает.` } },
    take: { en: `For any threat or control, name the property: C, I or A.`, ru: `Для любой угрозы или меры называйте свойство: C, I или A.` } },

  { id: 's01-008', kind: 'think', k: ['d1-c1', 'd1-c2'], lvl: 1,
    title: { en: `Which matters most: C, I or A?`, ru: `Что важнее всего: C, I или A?` },
    body: {
      en: `<p>You join a hospital as its first security specialist. The board asks: "Which should we put first for the patient records system: confidentiality, integrity or availability?"</p><p>What do you answer?</p>`,
      ru: `<p>Вы пришли в больницу первым специалистом по безопасности. Совет директоров спрашивает: «Что для системы медкарт ставить на первое место — конфиденциальность, целостность или доступность?»</p><p>Что вы ответите?</p>`,
    },
    reveal: {
      en: `<p>There is no universal ranking, and it isn't your call alone. The priority depends on the asset and the business. For an emergency room, availability and integrity can be a matter of life and death, while a leak "only" causes harm and fines. For a password vault, confidentiality wins.</p><p>Your job is to explain the trade-offs. <b>Management decides</b> the priority per asset. The instinct to answer "confidentiality, of course" is the classic beginner's mistake.</p>`,
      ru: `<p>Универсального порядка нет, и решать не вам одному. Приоритет зависит от актива и бизнеса. В приёмном отделении доступность и целостность — вопрос жизни и смерти, а утечка «всего лишь» вредит и грозит штрафами. Для хранилища паролей важнее конфиденциальность.</p><p>Ваша задача — объяснить компромиссы. <b>Решает руководство</b>, для каждого актива отдельно. Ответ «конечно, конфиденциальность» — типичная ошибка новичка.</p>`,
    },
    take: { en: `Security advises; the business decides which property matters most for each asset.`, ru: `Безопасность советует, бизнес решает, какое свойство важнее для каждого актива.` } },

  { id: 's01-009', kind: 'idea', k: ['d1-c1'], lvl: 1,
    title: { en: `Beyond CIA: is it genuine, and can they deny it?`, ru: `Кроме CIA: подлинно ли это и можно ли отпереться?` },
    body: {
      en: `<p>Two more properties come up all the time.</p><ul><li><b>Authenticity</b>: the message or data really comes from who it claims to. An email "from the CEO" asking for an urgent wire transfer fails this test.</li><li><b>Non-repudiation</b>: the sender can't later deny having sent or signed something. A handwritten signature on a contract does this on paper; a digital signature does it for data.</li></ul><p>Both matter whenever money, contracts or evidence are involved.</p>`,
      ru: `<p>Ещё два свойства встречаются постоянно.</p><ul><li><b>Аутентичность</b>: сообщение или данные действительно от того, кто указан. Письмо «от директора» с просьбой срочно перевести деньги эту проверку не проходит.</li><li><b>Неотказуемость</b>: отправитель не может потом отрицать, что отправил или подписал. На бумаге это делает подпись под договором, для данных — цифровая подпись.</li></ul><p>Оба свойства важны везде, где речь о деньгах, договорах и доказательствах.</p>`,
    },
    take: { en: `Authenticity: it's really from them. Non-repudiation: they can't deny it.`, ru: `Аутентичность: это действительно от них. Неотказуемость: они не смогут отпереться.` } },

  { id: 's01-010', kind: 'vs', k: ['d1-c1', 'd1-c4'], lvl: 1,
    title: { en: `Confidentiality vs privacy`, ru: `Конфиденциальность и приватность` },
    body: {
      en: `<p>They sound alike but answer different questions.</p><ul><li><b>Confidentiality</b> is a property of any information: trade secrets, source code, passwords. It's about <i>who may see it</i>.</li><li><b>Privacy</b> is about <i>personal</i> information and the rights of the person it describes: what is collected, why, how long it's kept and who it's shared with. Laws such as the EU's GDPR are privacy laws.</li></ul><p>You can keep data perfectly confidential and still break privacy, for example by collecting more than you need or using it for a purpose the person never agreed to.</p>`,
      ru: `<p>Звучат похоже, но отвечают на разные вопросы.</p><ul><li><b>Конфиденциальность</b> — свойство любой информации: коммерческой тайны, исходного кода, паролей. Это вопрос <i>кто может видеть</i>.</li><li><b>Приватность</b> касается <i>персональных</i> данных и прав человека, которого они описывают: что собирают, зачем, сколько хранят и кому передают. Законы вроде европейского GDPR — законы о приватности.</li></ul><p>Можно идеально хранить данные в тайне и всё равно нарушить приватность: например, собрать лишнее или использовать данные не для той цели, на которую человек соглашался.</p>`,
    },
    take: { en: `Confidentiality: who sees it. Privacy: whether you should have it and what you do with it.`, ru: `Конфиденциальность — кто видит. Приватность — вправе ли вы это иметь и что с этим делаете.` } },

  { id: 's01-011', kind: 'story', k: ['d1-c1', 'd1-c7'], lvl: 1,
    title: { en: `Colonial Pipeline: one old password, a week of fuel queues`, ru: `Colonial Pipeline: один старый пароль и неделя очередей за топливом` },
    body: {
      en: `<p>In May 2021, ransomware hit Colonial Pipeline, which carries a large share of the fuel used on the US East Coast. Attackers got in with the password of an old VPN account that was no longer in use and had no second login factor.</p><p>The malware hit business IT systems, not the pipeline controls. Still, the company shut the pipeline down for about five days as a precaution. Panic buying followed, and the company paid a ransom of about $4.4 million, part of which the US government later recovered.</p>`,
      ru: `<p>В мае 2021 года шифровальщик поразил Colonial Pipeline — трубопровод, по которому идёт значительная часть топлива для восточного побережья США. Злоумышленники вошли по паролю от старой учётной записи VPN, которой уже не пользовались и на которой не было второго фактора входа.</p><p>Пострадали офисные IT-системы, а не управление трубопроводом. Тем не менее компания из предосторожности остановила трубопровод примерно на пять дней. Начался ажиотаж на заправках, а компания заплатила выкуп около 4,4 млн долларов, часть которого правительство США позже вернуло.</p>`,
    },
    take: { en: `An availability failure in IT can stop the physical world, and it started with one forgotten account.`, ru: `Отказ доступности в IT может остановить физический мир, а началось всё с одной забытой учётной записи.` } },

  { id: 's01-012', kind: 'idea', k: ['d1-c9'], lvl: 1,
    title: { en: `Threat, vulnerability, risk`, ru: `Угроза, уязвимость, риск` },
    body: {
      en: `<p>Three words you will use every day:</p><ul><li><b>Threat</b>: something that could cause harm. A criminal gang, a flood, a careless employee.</li><li><b>Vulnerability</b>: a weakness a threat could use. An old unused account without a second factor, an unpatched server, a door that doesn't lock.</li><li><b>Risk</b>: the chance that a threat uses a vulnerability, combined with how bad the damage would be.</li></ul><p>In the Colonial story: the threat was a ransomware gang, the vulnerability the forgotten VPN account, and the risk was fuel stopping for millions of people.</p>`,
      ru: `<p>Три слова, которые вы будете использовать каждый день:</p><ul><li><b>Угроза</b> — то, что может причинить вред: преступная группа, наводнение, небрежный сотрудник.</li><li><b>Уязвимость</b> — слабое место, которым угроза может воспользоваться: забытая учётная запись без второго фактора, сервер без обновлений, незапирающаяся дверь.</li><li><b>Риск</b> — вероятность того, что угроза воспользуется уязвимостью, вместе с тяжестью ущерба.</li></ul><p>В истории Colonial угроза — группа вымогателей, уязвимость — забытая учётная запись VPN, а риск — остановка поставок топлива для миллионов людей.</p>`,
    },
    take: { en: `Risk = a threat meeting a vulnerability, weighed by the damage it would do.`, ru: `Риск = угроза встречается с уязвимостью, с поправкой на возможный ущерб.` } },

  { id: 's01-013', kind: 'picture', k: ['d1-c9', 'd1-c11'], lvl: 1,
    title: { en: `The risk chain, and where a control cuts it`, ru: `Цепочка риска и где её разрывает мера защиты` },
    body: {
      en: `<p>A threat needs a vulnerability to reach an asset. A control works by breaking a link in this chain, usually by removing or covering the vulnerability.</p>`,
      ru: `<p>Угрозе нужна уязвимость, чтобы добраться до актива. Мера защиты разрывает звено этой цепочки — обычно устраняет или прикрывает уязвимость.</p>`,
    },
    dg: { title: { en: `Threat → vulnerability → asset → impact`, ru: `Угроза → уязвимость → актив → ущерб` }, h: 250,
      nodes: [
        ['t', 95, 70, { en: 'Threat', ru: 'Угроза' }, { en: 'ransomware gang', ru: 'вымогатели' }, '👤', 'bad'],
        ['v', 290, 70, { en: 'Vulnerability', ru: 'Уязвимость' }, { en: 'old VPN account', ru: 'старый VPN-аккаунт' }, '🔓', 'bad'],
        ['a', 485, 70, { en: 'Asset', ru: 'Актив' }, { en: 'business systems', ru: 'бизнес-системы' }, '🏢', 'key'],
        ['i', 670, 70, { en: 'Impact', ru: 'Ущерб' }, { en: 'fuel stops', ru: 'нет топлива' }, '💥', 'bad'],
        ['c', 290, 200, { en: 'Control', ru: 'Мера защиты' }, { en: 'MFA, remove old accounts', ru: 'MFA, удалить старые учётки' }, '🛡', 'ok'],
      ],
      edges: [
        ['t', 'v', { en: 'exploits', ru: 'использует' }, 'bad'],
        ['v', 'a', { en: 'reaches', ru: 'достаёт' }, 'bad'],
        ['a', 'i', null, 'bad'],
        ['c', 'v', { en: 'closes', ru: 'закрывает' }, 'ok'],
      ] },
    take: { en: `Controls don't stop threats from existing; they remove the weakness the threat needs.`, ru: `Меры защиты не отменяют угрозы — они убирают слабое место, которое угрозе нужно.` } },

  { id: 's01-014', kind: 'idea', k: ['d1-c9'], lvl: 1,
    title: { en: `Likelihood × impact: sorting risks`, ru: `Вероятность × ущерб: как сортировать риски` },
    body: {
      en: `<p>A company has hundreds of risks and a limited budget. To decide where to start, rate each risk on two scales: how <b>likely</b> it is and how much <b>impact</b> it would have.</p><p>A meteor hitting the data center: huge impact, tiny likelihood. Staff clicking phishing links: moderate impact, very likely. Plot them on a grid and work from the top-right corner (likely and damaging) down. Words like low, medium and high are enough to start; this is called a <b>qualitative</b> assessment.</p>`,
      ru: `<p>У компании сотни рисков и ограниченный бюджет. Чтобы решить, с чего начать, каждый риск оценивают по двум шкалам: насколько он <b>вероятен</b> и каким будет <b>ущерб</b>.</p><p>Метеорит над дата-центром: огромный ущерб, ничтожная вероятность. Сотрудники кликают по фишинговым ссылкам: ущерб умеренный, вероятность очень высокая. Риски раскладывают по сетке и идут от правого верхнего угла (вероятно и больно) вниз. Для начала хватает слов «низкий, средний, высокий» — это <b>качественная</b> оценка.</p>`,
    },
    take: { en: `Fix the likely-and-damaging risks first, not the scariest-sounding ones.`, ru: `Сначала — вероятные и болезненные риски, а не те, что звучат страшнее.` } },

  { id: 's01-015', kind: 'back', back: 's01-007', k: ['d1-c1', 'd1-c9'], lvl: 1,
    title: { en: `Every risk names a property it threatens`, ru: `Каждый риск угрожает какому-то свойству` },
    body: {
      en: `<p>The triangle comes back here. When you write a risk down, say which of C, I and A it threatens, because that tells you which controls can help.</p><ul><li>Colonial Pipeline: <b>availability</b>. Backups and recovery plans help; encryption doesn't.</li><li>Target: <b>confidentiality</b> of card data. Network separation and monitoring help.</li><li>Stuxnet: <b>integrity</b>. Independent checks of the readings would have helped.</li></ul>`,
      ru: `<p>Треугольник снова с нами. Записывая риск, указывайте, какому из свойств C, I, A он угрожает: от этого зависит, какие меры помогут.</p><ul><li>Colonial Pipeline — <b>доступность</b>. Помогут резервные копии и планы восстановления, шифрование — нет.</li><li>Target — <b>конфиденциальность</b> данных карт. Помогут разделение сети и мониторинг.</li><li>Stuxnet — <b>целостность</b>. Помогла бы независимая проверка показаний.</li></ul>`,
    },
    take: { en: `Name the property first; the right controls follow from it.`, ru: `Сначала назовите свойство — правильные меры следуют из него.` } },

  { id: 's01-016', kind: 'vs', k: ['d1-c9'], lvl: 1,
    title: { en: `Threat vs vulnerability vs risk`, ru: `Угроза, уязвимость и риск: в чём разница` },
    body: {
      en: `<p>These three get mixed up constantly, in exam questions and in meetings.</p><ul><li><b>Threat</b>: <i>who or what</i> could harm you. You usually can't remove it, only watch it.</li><li><b>Vulnerability</b>: <i>the weakness</i>. This is what you fix.</li><li><b>Risk</b>: <i>how likely and how bad</i>. This is what management decides about.</li></ul><p>A quick test: "hackers" is a threat, "unpatched server" is a vulnerability, "a 30% chance per year of losing customer data" is a risk.</p>`,
      ru: `<p>Эти три понятия постоянно путают — и в экзаменационных вопросах, и на совещаниях.</p><ul><li><b>Угроза</b> — <i>кто или что</i> может навредить. Убрать её обычно нельзя, можно только следить.</li><li><b>Уязвимость</b> — <i>слабое место</i>. Именно её вы исправляете.</li><li><b>Риск</b> — <i>насколько вероятно и насколько больно</i>. Именно о нём принимает решение руководство.</li></ul><p>Быстрая проверка: «хакеры» — угроза, «сервер без обновлений» — уязвимость, «30% в год потерять данные клиентов» — риск.</p>`,
    },
    take: { en: `Watch threats, fix vulnerabilities, manage risk.`, ru: `За угрозами следят, уязвимости устраняют, рисками управляют.` } },

  { id: 's01-017', kind: 'think', k: ['d1-c9'], lvl: 1,
    title: { en: `A badly outdated server: high risk?`, ru: `Сервер без обновлений: высокий риск?` },
    body: {
      en: `<p>A scan finds a test server with a dozen known vulnerabilities. It sits in a lab with no connection to the internet or the office network, holds no real data, and is wiped every Friday.</p><p>The scan report marks it "critical". Is this a high risk for the company?</p>`,
      ru: `<p>Сканирование нашло тестовый сервер с дюжиной известных уязвимостей. Он стоит в лаборатории без подключения к интернету и офисной сети, реальных данных на нём нет, и каждую пятницу его стирают.</p><p>В отчёте сканера он помечен как «критический». Высокий ли это риск для компании?</p>`,
    },
    reveal: {
      en: `<p>Probably not. Many vulnerabilities are not the same as high risk. Here no threat can easily reach the server, and there's little of value on it, so both likelihood and impact are low.</p><p>A scanner rates the weakness; it doesn't know your business. A risk assessment combines the weakness with the threat and the asset's value. The low priority should still be recorded, so someone notices if the lab is ever connected to the network.</p>`,
      ru: `<p>Скорее всего, нет. Много уязвимостей — ещё не высокий риск. Угрозе до этого сервера просто не добраться, и ценного на нём почти нет: и вероятность, и ущерб низкие.</p><p>Сканер оценивает слабость, но не знает вашего бизнеса. Оценка риска соединяет слабость с угрозой и ценностью актива. Низкий приоритет всё равно стоит записать, чтобы кто-нибудь заметил, если лабораторию однажды подключат к сети.</p>`,
    },
    take: { en: `A vulnerability alone isn't a risk: it needs a threat that can reach it and an asset worth harming.`, ru: `Уязвимость сама по себе — не риск: нужна угроза, способная до неё дотянуться, и актив, которому можно навредить.` } },

  { id: 's01-018', kind: 'idea', k: ['d1-c9'], lvl: 2,
    title: { en: `Putting a price on risk: SLE and ALE`, ru: `Цена риска: SLE и ALE` },
    body: {
      en: `<p>Sometimes management wants numbers in money. A <b>quantitative</b> assessment uses a few simple formulas:</p><ul><li><b>AV</b>, asset value: what the asset is worth.</li><li><b>EF</b>, exposure factor: the share of that value one incident destroys (e.g. 40%).</li><li><b>SLE</b> = AV × EF: single loss expectancy, the cost of one incident.</li><li><b>ARO</b>: annualized rate of occurrence, how often per year (0.5 = once every two years).</li><li><b>ALE</b> = SLE × ARO: annualized loss expectancy, the expected loss per year.</li></ul>`,
      ru: `<p>Иногда руководству нужны цифры в деньгах. <b>Количественная</b> оценка использует несколько простых формул:</p><ul><li><b>AV</b> (asset value) — стоимость актива.</li><li><b>EF</b> (exposure factor) — доля стоимости, которую уничтожает один инцидент (например, 40%).</li><li><b>SLE</b> = AV × EF — ожидаемый ущерб от одного инцидента.</li><li><b>ARO</b> — сколько раз в год это случается (0,5 = раз в два года).</li><li><b>ALE</b> = SLE × ARO — ожидаемый ущерб за год.</li></ul>`,
    },
    take: { en: `SLE = AV × EF; ALE = SLE × ARO. ALE is the yardstick for what a control is worth.`, ru: `SLE = AV × EF; ALE = SLE × ARO. ALE — мерило того, сколько стоит защита.` } },

  { id: 's01-019', kind: 'picture', k: ['d1-c9'], lvl: 2,
    title: { en: `A flood in the server room, in numbers`, ru: `Наводнение в серверной в цифрах` },
    body: {
      en: `<p>A server room worth $100,000 sits in a basement. A flood would ruin 40% of it, and floods happen about once every two years.</p>`,
      ru: `<p>Серверная стоимостью 100 000 $ находится в подвале. Наводнение испортит 40% оборудования, а случаются они примерно раз в два года.</p>`,
    },
    dg: { title: { en: `From asset value to yearly loss`, ru: `От стоимости актива к годовому ущербу` }, h: 280,
      nodes: [
        ['av', 120, 60, { en: 'AV', ru: 'AV' }, { en: 'asset value $100,000', ru: 'стоимость 100 000 $' }, '🏢'],
        ['ef', 120, 210, { en: 'EF', ru: 'EF' }, { en: '40% destroyed', ru: 'уничтожено 40%' }, '🌊'],
        ['sle', 380, 135, { en: 'SLE $40,000', ru: 'SLE 40 000 $' }, { en: 'one flood', ru: 'одно наводнение' }, null, 'key'],
        ['aro', 640, 230, { en: 'ARO 0.5', ru: 'ARO 0,5' }, { en: 'once every 2 years', ru: 'раз в 2 года' }, '📅'],
        ['ale', 640, 60, { en: 'ALE $20,000', ru: 'ALE 20 000 $' }, { en: 'expected loss per year', ru: 'ожидаемый ущерб в год' }, null, 'bad'],
      ],
      edges: [
        ['av', 'sle', null, 'key'],
        ['ef', 'sle', null, 'key'],
        ['sle', 'ale', { en: '× ARO', ru: '× ARO' }, 'key'],
        ['aro', 'ale', null, 'key'],
      ],
      note: { en: `SLE = $100,000 × 0.4 = $40,000. ALE = $40,000 × 0.5 = $20,000 per year.`, ru: `SLE = 100 000 $ × 0,4 = 40 000 $. ALE = 40 000 $ × 0,5 = 20 000 $ в год.` } },
    take: { en: `This risk "costs" about $20,000 a year; keep that number for the next decision.`, ru: `Этот риск «стоит» около 20 000 $ в год — запомните число для следующего решения.` } },

  { id: 's01-020', kind: 'idea', k: ['d1-c9'], lvl: 1,
    title: { en: `Four things you can do with a risk`, ru: `Четыре варианта действий с риском` },
    body: {
      en: `<p>Once a risk is known, there are only four responses:</p><ul><li><b>Reduce</b> (mitigate): add a control. Move the servers upstairs, add a pump.</li><li><b>Transfer</b> (share): make someone else carry the cost, usually through insurance or a contract.</li><li><b>Avoid</b>: stop the activity. Don't keep servers in the basement at all.</li><li><b>Accept</b>: knowingly live with it, because fixing it costs more than it saves.</li></ul><p>Most risks get a mix: reduce a bit, insure the rest, accept what's left.</p>`,
      ru: `<p>Когда риск известен, вариантов ответа всего четыре:</p><ul><li><b>Снизить</b> (mitigate): добавить меру защиты. Перенести серверы наверх, поставить насос.</li><li><b>Передать</b> (transfer): переложить расходы на других — обычно через страховку или договор.</li><li><b>Избежать</b> (avoid): отказаться от деятельности. Вообще не держать серверы в подвале.</li><li><b>Принять</b> (accept): сознательно жить с риском, потому что устранение стоит дороже, чем экономит.</li></ul><p>Чаще всего это смесь: немного снизить, остальное застраховать, остаток принять.</p>`,
    },
    take: { en: `Reduce, transfer, avoid, accept. Ignoring a risk isn't on the list.`, ru: `Снизить, передать, избежать, принять. «Игнорировать» в списке нет.` } },

  { id: 's01-021', kind: 'think', k: ['d1-c9'], lvl: 2,
    title: { en: `Is this control worth buying?`, ru: `Стоит ли покупать эту защиту?` },
    body: {
      en: `<p>Back to the flooded basement: the expected loss (ALE) is $20,000 a year. A vendor offers a flood-protection system for <b>$30,000 a year</b>, including maintenance. It would cut the risk almost to zero.</p><p>The facilities manager says: "Safety first, let's buy it." What do you recommend?</p>`,
      ru: `<p>Вернёмся к подвалу: ожидаемый ущерб (ALE) — 20 000 $ в год. Поставщик предлагает систему защиты от затопления за <b>30 000 $ в год</b> вместе с обслуживанием. Она снизит риск почти до нуля.</p><p>Завхоз говорит: «Безопасность прежде всего, покупаем». Что вы порекомендуете?</p>`,
    },
    reveal: {
      en: `<p>Not this control, at least not at this price. It would cost $30,000 a year to prevent $20,000 of expected loss a year. A control should normally cost <b>less than the loss it prevents</b>.</p><p>Look for cheaper options (moving the equipment, a basic pump, insurance), or document that management accepts the risk. "Safety first" applies to people's lives; this is equipment. If people worked in that basement, the answer would change.</p>`,
      ru: `<p>Не эту защиту — во всяком случае, не за такие деньги. Она стоит 30 000 $ в год, а предотвращает 20 000 $ ожидаемого ущерба в год. Обычно защита должна стоить <b>меньше ущерба, который она предотвращает</b>.</p><p>Ищите варианты дешевле (перенести оборудование, простой насос, страховка) или задокументируйте, что руководство принимает риск. «Безопасность прежде всего» относится к жизни людей, а здесь оборудование. Если бы в подвале работали люди, ответ был бы другим.</p>`,
    },
    take: { en: `A control that costs more than the loss it prevents is a bad deal, except where lives are at stake.`, ru: `Защита дороже предотвращаемого ущерба — плохая сделка, если только речь не о жизни людей.` } },

  { id: 's01-022', kind: 'story', k: ['d1-c9', 'd7-c6'], lvl: 1,
    title: { en: `Equifax 2017: a fix that was available for two months`, ru: `Equifax, 2017: исправление было доступно два месяца` },
    body: {
      en: `<p>In March 2017, a serious flaw in Apache Struts, a popular web framework, was announced together with a fix. The credit bureau Equifax used Struts on a public dispute portal and didn't apply the fix. From mid-May, attackers used the flaw to get in, and they stayed for about two and a half months.</p><p>Personal data of about <b>147 million people</b> was taken. A device that should have inspected outgoing traffic wasn't working because its certificate had expired many months earlier. The settlement with US regulators was worth up to $700 million.</p>`,
      ru: `<p>В марте 2017 года объявили о серьёзной уязвимости в Apache Struts — популярном веб-фреймворке — и сразу выпустили исправление. Кредитное бюро Equifax использовало Struts на публичном портале для споров и исправление не установило. С середины мая злоумышленники входили через эту уязвимость и оставались внутри около двух с половиной месяцев.</p><p>Утекли персональные данные примерно <b>147 миллионов человек</b>. Устройство, которое должно было проверять исходящий трафик, не работало: его сертификат истёк много месяцев назад. Соглашение с регуляторами США обошлось компании до 700 млн долларов.</p>`,
    },
    take: { en: `A known vulnerability with an available fix is the cheapest risk to reduce, and the most embarrassing to ignore.`, ru: `Известная уязвимость с готовым исправлением — самый дешёвый в устранении риск и самый позорный для игнорирования.` } },

  { id: 's01-023', kind: 'idea', k: ['d1-c9'], lvl: 2,
    title: { en: `Risk never reaches zero`, ru: `Риск никогда не равен нулю` },
    body: {
      en: `<p>After you add controls, some risk always remains. This leftover is <b>residual risk</b>. The risk before controls is often called <b>inherent risk</b>.</p><p>The goal isn't zero. The goal is to bring residual risk below the level the organization is willing to live with, its <b>risk appetite</b>. A hospital and a startup will have very different appetites. Senior management sets the appetite and formally accepts the residual risk; the security team measures and reports it.</p>`,
      ru: `<p>После внедрения мер защиты какой-то риск всегда остаётся. Этот остаток — <b>остаточный риск</b>. Риск до мер защиты часто называют <b>исходным (inherent)</b>.</p><p>Цель — не ноль. Цель — снизить остаточный риск ниже уровня, с которым организация готова жить, — её <b>аппетита к риску</b>. У больницы и стартапа он очень разный. Высшее руководство задаёт аппетит и формально принимает остаточный риск; команда безопасности его измеряет и докладывает.</p>`,
    },
    take: { en: `Residual risk is fine as long as it's within the appetite and someone with authority has accepted it.`, ru: `Остаточный риск допустим, если он в пределах аппетита и его принял тот, у кого есть полномочия.` } },

  { id: 's01-024', kind: 'vs', k: ['d1-c9'], lvl: 2,
    title: { en: `Accept vs transfer vs ignore`, ru: `Принять, передать или проигнорировать` },
    body: {
      en: `<ul><li><b>Accept</b>: a documented decision by the risk owner, with a known cost, reviewed from time to time. Legitimate.</li><li><b>Transfer</b>: insurance or a contract pays for the damage. The money moves, but the <i>responsibility</i> doesn't: customers and regulators still blame you after a breach.</li><li><b>Ignore</b> (also called rejecting a risk): pretending it isn't there. Never acceptable, and after an incident it looks like negligence.</li></ul><p>Equifax didn't decide to accept the Struts risk; nobody acted on it. That's ignoring.</p>`,
      ru: `<ul><li><b>Принять</b> — задокументированное решение владельца риска, с известной ценой и периодическим пересмотром. Законно.</li><li><b>Передать</b> — ущерб оплатит страховка или контрагент по договору. Деньги переходят, а <i>ответственность</i> нет: после утечки клиенты и регуляторы всё равно спросят с вас.</li><li><b>Проигнорировать</b> (иногда говорят «отвергнуть риск») — делать вид, что его нет. Недопустимо никогда, а после инцидента выглядит как халатность.</li></ul><p>Equifax не решала принять риск Struts — просто никто ничего не сделал. Это игнорирование.</p>`,
    },
    take: { en: `Acceptance is a signed decision; ignoring is the absence of one. You can transfer cost, never accountability.`, ru: `Принятие — подписанное решение, игнорирование — его отсутствие. Передать можно расходы, но не ответственность.` } },

  { id: 's01-025', kind: 'back', back: 's01-012', k: ['d1-c9'], lvl: 1,
    title: { en: `Equifax, taken apart into threat, vulnerability and risk`, ru: `Equifax по полочкам: угроза, уязвимость, риск` },
    body: {
      en: `<p>Apply the three words to the Equifax story:</p><ul><li><b>Threat</b>: attackers scanning the internet for servers with the newly announced Struts flaw. After a big announcement this starts within days.</li><li><b>Vulnerability</b>: the unpatched portal, plus the broken traffic inspection that let data leave unnoticed.</li><li><b>Risk</b>: very likely (the flaw was public) and very damaging (data on almost half the US population).</li></ul><p>High likelihood and high impact put it in the top-right corner of the grid. It should have been first in line.</p>`,
      ru: `<p>Применим три слова к истории Equifax:</p><ul><li><b>Угроза</b> — злоумышленники, сканирующие интернет в поисках серверов с только что объявленной уязвимостью Struts. После громкого объявления это начинается в считаные дни.</li><li><b>Уязвимость</b> — портал без исправления плюс неработающая проверка трафика, из-за которой данные ушли незаметно.</li><li><b>Риск</b> — очень вероятный (уязвимость публичная) и очень болезненный (данные почти половины населения США).</li></ul><p>Высокая вероятность и высокий ущерб — правый верхний угол сетки. Этим нужно было заняться в первую очередь.</p>`,
    },
    take: { en: `A public flaw on an internet-facing system holding sensitive data is about as top-right as risk gets.`, ru: `Публичная уязвимость в доступной из интернета системе с чувствительными данными — правый верхний угол в чистом виде.` } },

  { id: 's01-026', kind: 'idea', k: ['d1-c11'], lvl: 1,
    title: { en: `Controls come in three materials`, ru: `Меры защиты бывают трёх «материалов»` },
    body: {
      en: `<p>A <b>control</b> (or safeguard, or countermeasure) is anything that reduces risk. By what it's made of, there are three categories:</p><ul><li><b>Administrative</b> (managerial): policies, procedures, training, background checks. They govern people.</li><li><b>Technical</b> (logical): passwords, encryption, firewalls, access permissions. They are built into systems.</li><li><b>Physical</b>: locks, fences, guards, cameras, fire suppression. You can touch them.</li></ul><p>Good protection combines all three. A firewall without a policy saying who may change it is only half a control.</p>`,
      ru: `<p><b>Мера защиты</b> (контроль, контрмера) — всё, что снижает риск. По тому, из чего она «сделана», есть три категории:</p><ul><li><b>Административные</b> (управленческие): политики, процедуры, обучение, проверка кандидатов. Они управляют людьми.</li><li><b>Технические</b> (логические): пароли, шифрование, межсетевые экраны, права доступа. Встроены в системы.</li><li><b>Физические</b>: замки, ограды, охрана, камеры, пожаротушение. Их можно потрогать.</li></ul><p>Хорошая защита сочетает все три. Межсетевой экран без политики о том, кто может менять его правила, — только половина меры.</p>`,
    },
    take: { en: `Administrative, technical, physical: people, systems, things.`, ru: `Административные, технические, физические: люди, системы, предметы.` } },

  { id: 's01-027', kind: 'picture', k: ['d1-c11', 'd3-c1'], lvl: 1,
    title: { en: `Three categories around one asset`, ru: `Три категории вокруг одного актива` },
    body: {
      en: `<p>Each category covers a different way in. An attacker who gets past one should still meet the other two.</p>`,
      ru: `<p>Каждая категория перекрывает свой путь. Злоумышленник, прошедший одну, должен упереться в две другие.</p>`,
    },
    dg: { title: { en: `Controls by category`, ru: `Меры по категориям` }, h: 300,
      nodes: [
        ['d', 380, 155, { en: 'Customer data', ru: 'Данные клиентов' }, null, '🗄', 'key'],
        ['adm', 150, 55, { en: 'Administrative', ru: 'Административные' }, { en: 'policy, training, hiring checks', ru: 'политика, обучение, проверки' }, '📄', 'ok'],
        ['tec', 610, 55, { en: 'Technical', ru: 'Технические' }, { en: 'MFA, encryption, firewall', ru: 'MFA, шифрование, МЭ' }, '💻', 'ok'],
        ['phy', 380, 260, { en: 'Physical', ru: 'Физические' }, { en: 'locks, guards, cameras', ru: 'замки, охрана, камеры' }, '🔐', 'ok'],
      ],
      edges: [
        ['adm', 'd', null, 'ok'],
        ['tec', 'd', null, 'ok'],
        ['phy', 'd', null, 'ok'],
      ] },
    take: { en: `If all your controls are technical, people and doors are wide open.`, ru: `Если все меры технические, люди и двери остаются открытыми.` } },

  { id: 's01-028', kind: 'idea', k: ['d1-c11'], lvl: 1,
    title: { en: `What a control does: its function`, ru: `Что мера делает: её функция` },
    body: {
      en: `<p>Controls are also sorted by <i>when</i> and <i>how</i> they act:</p><ul><li><b>Directive</b>: tells people what to do (a policy, a sign).</li><li><b>Deterrent</b>: discourages (a visible camera, a warning banner).</li><li><b>Preventive</b>: stops it happening (a lock, a password).</li><li><b>Detective</b>: notices it happening (an alarm, a log review).</li><li><b>Corrective</b>: limits the damage and fixes the problem (removing malware, patching).</li><li><b>Recovery</b>: restores normal operation (restoring backups).</li><li><b>Compensating</b>: a substitute when the usual control isn't possible.</li></ul><p>One control can have a category <i>and</i> a function: a guard is physical, deterrent and preventive.</p>`,
      ru: `<p>Меры делят и по тому, <i>когда</i> и <i>как</i> они работают:</p><ul><li><b>Директивные</b> — говорят, что делать (политика, табличка).</li><li><b>Сдерживающие</b> — отпугивают (заметная камера, предупреждение при входе).</li><li><b>Превентивные</b> — не дают случиться (замок, пароль).</li><li><b>Детективные</b> — замечают, что происходит (сигнализация, просмотр журналов).</li><li><b>Корректирующие</b> — ограничивают ущерб и устраняют проблему (удаление вредоноса, обновление).</li><li><b>Восстановительные</b> — возвращают нормальную работу (восстановление из копий).</li><li><b>Компенсирующие</b> — замена, когда обычная мера невозможна.</li></ul><p>У одной меры есть и категория, <i>и</i> функция: охранник — физическая, сдерживающая и превентивная мера.</p>`,
    },
    take: { en: `Category = what it's made of. Function = what it does and when.`, ru: `Категория — из чего мера. Функция — что она делает и когда.` } },

  { id: 's01-029', kind: 'vs', k: ['d1-c11'], lvl: 1,
    title: { en: `Preventive vs detective vs corrective`, ru: `Превентивные, детективные, корректирующие` },
    body: {
      en: `<p>The three most important functions follow a timeline:</p><ul><li><b>Preventive</b> works <i>before</i>: the door is locked, the bad login is refused.</li><li><b>Detective</b> works <i>during or after</i>: it can't stop anything, but it tells you something happened (an alarm, an alert, an audit).</li><li><b>Corrective</b> works <i>after</i>: it cleans up and fixes the cause (quarantining the infected laptop, patching the hole).</li></ul><p>Prevention always fails sometimes, so you need detection. Detection is useless without someone who acts on it, as Target learned.</p>`,
      ru: `<p>Три главные функции выстраиваются по времени:</p><ul><li><b>Превентивные</b> работают <i>до</i>: дверь заперта, неверный вход отклонён.</li><li><b>Детективные</b> работают <i>во время или после</i>: ничего не останавливают, но сообщают, что что-то произошло (сигнализация, оповещение, аудит).</li><li><b>Корректирующие</b> работают <i>после</i>: убирают последствия и устраняют причину (изолировать заражённый ноутбук, закрыть дыру).</li></ul><p>Предотвращение иногда не срабатывает, поэтому нужно обнаружение. А обнаружение бесполезно, если никто не реагирует, — как убедилась Target.</p>`,
    },
    take: { en: `Prevent before, detect during, correct after.`, ru: `Предотвратить до, обнаружить во время, исправить после.` } },

  { id: 's01-030', kind: 'think', k: ['d1-c11'], lvl: 1,
    title: { en: `What kind of control is a camera?`, ru: `Какая это мера — камера?` },
    body: {
      en: `<p>A company installs a video camera above the server room door. It records to a storage box, and the footage is reviewed when something goes missing.</p><p>Which category and function is it? Is it preventive?</p>`,
      ru: `<p>Компания повесила видеокамеру над дверью серверной. Запись идёт на накопитель, и её просматривают, когда что-то пропадает.</p><p>Какая это категория и функция? Она превентивная?</p>`,
    },
    reveal: {
      en: `<p>It's a <b>physical</b> control. Its main function is <b>detective</b>: it records what happened so you can find out later. If it's clearly visible, it is also <b>deterrent</b>, because people behave better when they know they're filmed.</p><p>It is <b>not preventive</b>. A camera can't stop someone from walking in; a lock can. That's the usual trap: a control that makes you <i>feel</i> safer isn't necessarily one that blocks anything.</p>`,
      ru: `<p>Это <b>физическая</b> мера. Её главная функция — <b>детективная</b>: она записывает происходящее, чтобы потом разобраться. Если камера на виду, она ещё и <b>сдерживающая</b>: люди ведут себя аккуратнее, когда знают, что их снимают.</p><p><b>Превентивной</b> она не является. Камера не помешает войти, а замок помешает. Это типичная ловушка: мера, с которой вам <i>спокойнее</i>, не обязательно что-то блокирует.</p>`,
    },
    take: { en: `Cameras detect and deter; locks prevent.`, ru: `Камеры обнаруживают и отпугивают, замки предотвращают.` } },

  { id: 's01-031', kind: 'idea', k: ['d3-c1', 'd1-c11'], lvl: 1,
    title: { en: `Defense in depth: never one wall`, ru: `Эшелонированная защита: никогда не одна стена` },
    body: {
      en: `<p>Medieval castles had a moat, outer walls, inner walls and a keep. Each layer could fail without the castle falling.</p><p><b>Defense in depth</b> (layered defense) applies the same idea: put several independent controls between a threat and an asset. Stolen password? MFA stops the login. MFA bypassed? The account can only reach a few systems. That fails too? Monitoring spots the unusual activity. Each layer buys time, and none of them has to be perfect.</p>`,
      ru: `<p>У средневекового замка были ров, внешние стены, внутренние стены и донжон. Любой слой мог пасть, а замок — устоять.</p><p><b>Эшелонированная защита</b> (defense in depth) делает то же самое: между угрозой и активом ставят несколько независимых мер. Украли пароль? Вход остановит MFA. Обошли MFA? Учётной записи доступны лишь несколько систем. Не сработало и это? Мониторинг заметит необычную активность. Каждый слой выигрывает время, и ни один не обязан быть идеальным.</p>`,
    },
    take: { en: `Assume each layer will fail sometimes; make sure the next one doesn't fail for the same reason.`, ru: `Исходите из того, что каждый слой иногда отказывает, и следите, чтобы следующий не отказал по той же причине.` } },

  { id: 's01-032', kind: 'link', k: ['d1-c11', 'd1-c13', 'd3-c1'], lvl: 2,
    title: { en: `Target again: which layers were missing?`, ru: `Снова Target: каких слоёв не хватило?` },
    body: {
      en: `<p>Now you can read the first story as a chain of missing layers:</p><ol><li><b>Administrative</b>: a contractor's account could reach a portal that led into the wider network. Supplier access wasn't strictly limited.</li><li><b>Technical (preventive)</b>: the network wasn't separated well enough, so the way in led all the way to the checkout terminals.</li><li><b>Technical (detective)</b>: the alerts fired, so detection worked.</li><li><b>Administrative (corrective)</b>: nobody had the clear duty and authority to respond, so detection achieved nothing.</li></ol><p>One layer working isn't defense in depth. Every layer had a gap.</p>`,
      ru: `<p>Теперь первую историю можно прочитать как цепочку недостающих слоёв:</p><ol><li><b>Административный</b>: учётная запись подрядчика давала доступ к порталу, который вёл во внутреннюю сеть. Доступ поставщиков не был жёстко ограничен.</li><li><b>Технический (превентивный)</b>: сеть была плохо разделена, и путь внутрь вёл прямо к кассовым терминалам.</li><li><b>Технический (детективный)</b>: оповещения сработали — обнаружение работало.</li><li><b>Административный (корректирующий)</b>: ни у кого не было чёткой обязанности и полномочий реагировать, поэтому обнаружение ничего не дало.</li></ol><p>Один работающий слой — ещё не эшелонированная защита. Пробел был в каждом слое.</p>`,
    },
    take: { en: `Detection without a response process is just an expensive record of your own breach.`, ru: `Обнаружение без процесса реагирования — просто дорогой протокол собственного взлома.` } },

  { id: 's01-033', kind: 'idea', k: ['d1-c2'], lvl: 1,
    title: { en: `Who decides? The people who own the business`, ru: `Кто решает? Те, кому принадлежит бизнес` },
    body: {
      en: `<p>Security specialists find risks, explain them and propose controls. They don't own the business, so they don't make the final call.</p><p><b>Senior management</b> (the board and executives) is ultimately accountable for security. It sets the risk appetite, approves policy, provides the budget and accepts residual risk. This is what <b>security governance</b> means: steering security from the top, in line with the company's goals. Security without executive support becomes a team that says "no" and gets ignored.</p>`,
      ru: `<p>Специалисты по безопасности находят риски, объясняют их и предлагают меры. Бизнес принадлежит не им, поэтому окончательное решение принимают не они.</p><p><b>Высшее руководство</b> (совет директоров и топ-менеджеры) в конечном счёте отвечает за безопасность. Оно задаёт аппетит к риску, утверждает политику, выделяет бюджет и принимает остаточный риск. Это и есть <b>управление безопасностью (governance)</b>: руководство безопасностью сверху в соответствии с целями компании. Безопасность без поддержки руководства превращается в команду, которая говорит «нет» и которую игнорируют.</p>`,
    },
    take: { en: `Accountability for security sits with senior management; it can't be delegated away.`, ru: `Ответственность за безопасность лежит на высшем руководстве, и делегировать её нельзя.` } },

  { id: 's01-034', kind: 'vs', k: ['d1-c2'], lvl: 2,
    title: { en: `Due diligence vs due care`, ru: `Due diligence и due care` },
    body: {
      en: `<p>Two legal-sounding terms that decide who's negligent after a breach:</p><ul><li><b>Due diligence</b>: doing your homework. Finding out what the risks are and what a reasonable company should do: assessments, research, writing the policy, checking that it's followed.</li><li><b>Due care</b>: actually doing it. Running the controls, applying the patches, acting the way a reasonable person would in the same situation.</li></ul><p>A memory aid: diligence is <i>knowing and checking</i>, care is <i>doing</i>. A company that knows about a risk (diligence) but does nothing (no care) has the worst position in court.</p>`,
      ru: `<p>Два юридических термина, от которых зависит, кого признают халатным после утечки:</p><ul><li><b>Due diligence</b> (должная осмотрительность) — сделать домашнюю работу: выяснить, какие есть риски и что сделала бы разумная компания. Оценки, исследования, написание политики, проверка её исполнения.</li><li><b>Due care</b> (должная забота) — действительно это делать: применять меры защиты, ставить обновления, поступать так, как поступил бы разумный человек на вашем месте.</li></ul><p>Подсказка: diligence — <i>знать и проверять</i>, care — <i>делать</i>. Хуже всего в суде положение компании, которая о риске знала (diligence), но ничего не сделала (нет care).</p>`,
    },
    take: { en: `Diligence = know and check. Care = do. Knowing and not doing looks like negligence.`, ru: `Diligence — знать и проверять. Care — делать. Знать и не делать — похоже на халатность.` } },

  { id: 's01-035', kind: 'idea', k: ['d1-c3'], lvl: 1,
    title: { en: `Policy, standard, procedure, guideline`, ru: `Политика, стандарт, процедура, руководство` },
    body: {
      en: `<p>Management's decisions reach the people who do the work through a chain of documents, from general to specific:</p><ul><li><b>Policy</b>: the <i>what</i> and <i>why</i>, approved by senior management. "Company laptops must protect stored data."</li><li><b>Standard</b>: the specific <i>which</i>. "Full-disk encryption with AES-256."</li><li><b>Baseline</b>: the minimum configuration for a type of system.</li><li><b>Procedure</b>: the step-by-step <i>how</i>. "1. Open settings… 2. Turn on…"</li><li><b>Guideline</b>: advice and good practice.</li></ul><p>All of them are mandatory except guidelines.</p>`,
      ru: `<p>Решения руководства доходят до исполнителей через цепочку документов — от общего к частному:</p><ul><li><b>Политика</b> — <i>что</i> и <i>зачем</i>, утверждает высшее руководство. «Данные на ноутбуках компании должны быть защищены».</li><li><b>Стандарт</b> — конкретное <i>чем</i>. «Полнодисковое шифрование AES-256».</li><li><b>Базовая конфигурация (baseline)</b> — минимальные настройки для типа систем.</li><li><b>Процедура</b> — пошаговое <i>как</i>. «1. Откройте настройки… 2. Включите…»</li><li><b>Руководство (guideline)</b> — советы и лучшие практики.</li></ul><p>Обязательны все, кроме руководств.</p>`,
    },
    take: { en: `Policy says why, standards say which, procedures say how; only guidelines are optional.`, ru: `Политика — зачем, стандарт — чем, процедура — как; необязательны только руководства.` } },

  { id: 's01-036', kind: 'picture', k: ['d1-c3'], lvl: 1,
    title: { en: `From the boardroom to the keyboard`, ru: `От зала совета директоров до клавиатуры` },
    body: {
      en: `<p>Each level adds detail and changes more often. A policy may last years; a procedure changes when the software does.</p>`,
      ru: `<p>Каждый уровень добавляет детали и меняется чаще. Политика может жить годами, процедура меняется вместе с программой.</p>`,
    },
    dg: { title: { en: `Document hierarchy`, ru: `Иерархия документов` }, h: 300,
      nodes: [
        ['p', 300, 40, { en: 'Policy', ru: 'Политика' }, { en: 'what and why, by management', ru: 'что и зачем, от руководства' }, '🏛', 'key'],
        ['s', 300, 115, { en: 'Standard', ru: 'Стандарт' }, { en: 'which technology, mandatory', ru: 'какая технология, обязателен' }, '📏'],
        ['b', 300, 190, { en: 'Baseline', ru: 'Базовая конфигурация' }, { en: 'minimum settings per system', ru: 'минимум настроек для системы' }, '⚙'],
        ['pr', 300, 265, { en: 'Procedure', ru: 'Процедура' }, { en: 'step by step, mandatory', ru: 'шаг за шагом, обязательна' }, '📝'],
        ['g', 610, 152, { en: 'Guideline', ru: 'Руководство' }, { en: 'advice, optional', ru: 'советы, необязательно' }, '💡', 'dim'],
      ],
      edges: [
        ['p', 's', null], ['s', 'b', null], ['b', 'pr', null],
        ['p', 'g', null, 'dash'],
      ] },
    take: { en: `The higher the document, the more general it is and the fewer people approve it.`, ru: `Чем выше документ, тем он общее и тем меньше людей его утверждают.` } },

  { id: 's01-037', kind: 'think', k: ['d1-c3'], lvl: 1,
    title: { en: `Which document should say "AES-256"?`, ru: `В каком документе писать «AES-256»?` },
    body: {
      en: `<p>The draft security policy, due for board approval, says: "All laptops must use BitLocker with AES-256 encryption and a 12-digit PIN."</p><p>A colleague thinks that's admirably precise. Is it the right place for that sentence?</p>`,
      ru: `<p>В проекте политики безопасности, который идёт на утверждение совету директоров, написано: «Все ноутбуки должны использовать BitLocker с шифрованием AES-256 и PIN-кодом из 12 цифр».</p><p>Коллеге нравится такая точность. Подходящее ли это место для этой фразы?</p>`,
    },
    reveal: {
      en: `<p>No. The policy should say <i>what</i> and <i>why</i>: "Data on portable devices must be protected against loss or theft." The product, algorithm and PIN length belong in a <b>standard</b>, and the setup steps in a <b>procedure</b>.</p><p>Why it matters: technology changes every few years. If the specifics are in the policy, every change needs the board again, so either the policy goes stale or the board rubber-stamps tech details it can't judge.</p>`,
      ru: `<p>Нет. Политика должна говорить <i>что</i> и <i>зачем</i>: «Данные на переносных устройствах должны быть защищены от потери и кражи». Продукт, алгоритм и длина PIN — это <b>стандарт</b>, а шаги настройки — <b>процедура</b>.</p><p>Почему это важно: технологии меняются каждые несколько лет. Если детали записаны в политике, каждое изменение снова идёт через совет директоров — и либо политика устаревает, либо совет подписывает технические детали, которые не может оценить.</p>`,
    },
    take: { en: `Keep technology out of policies; put it in standards.`, ru: `Технологии — не в политику, а в стандарты.` } },

  { id: 's01-038', kind: 'story', k: ['d1-c2', 'd1-c9'], lvl: 2,
    title: { en: `Capital One 2019: fined for the process, not just the hack`, ru: `Capital One, 2019: штраф за процесс, а не только за взлом` },
    body: {
      en: `<p>In 2019, a former cloud-provider employee exploited a misconfigured web application firewall at the US bank Capital One. She obtained data on about <b>100 million people</b> in the US and about 6 million in Canada.</p><p>In 2020, the US bank regulator OCC fined Capital One <b>$80 million</b>. The order didn't just blame the misconfiguration. It said the bank had failed to set up effective risk assessment before moving important systems to the cloud. The regulator was judging the bank's governance, its due diligence and due care, not just one technical mistake.</p>`,
      ru: `<p>В 2019 году бывшая сотрудница облачного провайдера воспользовалась неправильно настроенным межсетевым экраном веб-приложений в американском банке Capital One. Она получила данные примерно <b>100 миллионов человек</b> в США и около 6 миллионов в Канаде.</p><p>В 2020 году банковский регулятор США OCC оштрафовал Capital One на <b>80 млн долларов</b>. В решении виновата была не только ошибка настройки: регулятор указал, что банк не наладил эффективную оценку рисков перед переносом важных систем в облако. Оценивалось управление безопасностью — due diligence и due care, — а не одна техническая ошибка.</p>`,
    },
    take: { en: `Regulators ask whether you had a sound process, not only whether you were hacked.`, ru: `Регулятор спрашивает, был ли у вас здравый процесс, а не только взломали ли вас.` } },

  { id: 's01-039', kind: 'idea', k: ['d1-c2'], lvl: 1,
    title: { en: `Security serves the business`, ru: `Безопасность служит бизнесу` },
    body: {
      en: `<p>A company doesn't exist to be secure. It exists to treat patients, sell products or move fuel. Security exists to let it do that safely.</p><p>So a good security program starts from the business's <b>goals, mission and objectives</b>. If the company wants to launch a mobile app in six months, security's job is to make that launch safe, not to block it. A control that stops the business from working is a failed control, even if it's technically perfect.</p>`,
      ru: `<p>Компания существует не для того, чтобы быть защищённой. Она лечит пациентов, продаёт товары или перекачивает топливо. Безопасность нужна, чтобы она делала это без потерь.</p><p>Поэтому хорошая программа безопасности начинается с <b>целей и миссии</b> бизнеса. Если компания хочет через полгода запустить мобильное приложение, задача безопасности — сделать запуск безопасным, а не сорвать его. Мера, которая мешает бизнесу работать, — неудачная мера, даже если технически она безупречна.</p>`,
    },
    take: { en: `Security enables the business; it isn't the business.`, ru: `Безопасность помогает бизнесу, но не заменяет его.` } },

  { id: 's01-040', kind: 'back', back: 's01-034', k: ['d1-c2'], lvl: 2,
    title: { en: `Capital One through diligence and care`, ru: `Capital One через diligence и care` },
    body: {
      en: `<p>Sort the regulator's complaint into the two terms:</p><ul><li><b>Due diligence</b>: before moving to the cloud, the bank should have assessed the new risks and checked that its controls fit. The regulator said this assessment was not effective.</li><li><b>Due care</b>: the firewall should have been configured and reviewed carefully day to day. It wasn't.</li></ul><p>Missing diligence led to missing care: nobody had properly asked what could go wrong, so nobody checked the setting that did.</p>`,
      ru: `<p>Разложим претензию регулятора по двум терминам:</p><ul><li><b>Due diligence</b>: перед переходом в облако банк должен был оценить новые риски и проверить, подходят ли его меры защиты. Регулятор счёл эту оценку неэффективной.</li><li><b>Due care</b>: межсетевой экран нужно было тщательно настроить и регулярно проверять. Этого не сделали.</li></ul><p>Недостаток diligence привёл к недостатку care: никто толком не спросил, что может пойти не так, поэтому никто и не проверил настройку, которая подвела.</p>`,
    },
    take: { en: `Diligence tells you where care is needed. Skip it and care goes to the wrong places.`, ru: `Diligence подсказывает, где нужна care. Без неё забота уходит не туда.` } },

  { id: 's01-041', kind: 'idea', k: ['d1-c6'], lvl: 1,
    title: { en: `The ISC2 Code of Ethics: four canons, in order`, ru: `Кодекс этики ISC2: четыре принципа по порядку` },
    body: {
      en: `<p>Every CISSP agrees to a code of ethics. Its four canons are listed in priority order:</p><ol><li>Protect society, the common good, necessary public trust and confidence, and the infrastructure.</li><li>Act honorably, honestly, justly, responsibly and legally.</li><li>Provide diligent and competent service to principals (your employer or client).</li><li>Advance and protect the profession.</li></ol><p>When they conflict, the higher one wins: society comes before your employer, and your employer before the profession.</p>`,
      ru: `<p>Каждый CISSP обязуется соблюдать кодекс этики. Его четыре принципа идут в порядке приоритета:</p><ol><li>Защищать общество, общее благо, необходимое общественное доверие и инфраструктуру.</li><li>Действовать честно, порядочно, справедливо, ответственно и законно.</li><li>Добросовестно и компетентно служить своим доверителям (работодателю или клиенту).</li><li>Развивать и защищать профессию.</li></ol><p>При конфликте побеждает верхний: общество важнее работодателя, а работодатель — профессии.</p>`,
    },
    take: { en: `Society → honesty and law → employer → profession.`, ru: `Общество → честность и закон → работодатель → профессия.` } },

  { id: 's01-042', kind: 'think', k: ['d1-c6', 'd1-c4'], lvl: 2,
    title: { en: `"Let's not tell customers yet"`, ru: `«Давайте пока не говорить клиентам»` },
    body: {
      en: `<p>You confirm that customer personal data has leaked. Your manager says: "The quarter closes in three weeks. Let's keep this internal until then, and then we'll see."</p><p>What do you do?</p>`,
      ru: `<p>Вы подтвердили утечку персональных данных клиентов. Руководитель говорит: «Через три недели закрываем квартал. Пусть пока это останется внутри, а там посмотрим».</p><p>Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p>Don't go along with hiding it, and don't run to the press either. Use the proper channels: the incident response process, legal counsel, the privacy officer and, if needed, higher management. Many laws set deadlines for notifying regulators and affected people (for example, 72 hours to the regulator under the GDPR).</p><p>The canons back you up: protecting society and acting legally come before serving your employer. Document what you reported and to whom.</p>`,
      ru: `<p>Не соглашайтесь скрывать, но и в прессу не бегите. Действуйте через положенные каналы: процесс реагирования на инциденты, юристов, ответственного за защиту данных и при необходимости вышестоящее руководство. Многие законы задают сроки уведомления регуляторов и пострадавших (например, по GDPR — 72 часа для регулятора).</p><p>Кодекс на вашей стороне: защита общества и законность важнее интересов работодателя. Задокументируйте, о чём и кому вы сообщили.</p>`,
    },
    take: { en: `Escalate through proper channels; never conceal, never go rogue.`, ru: `Эскалируйте через положенные каналы: не скрывайте и не действуйте в одиночку.` } },

  { id: 's01-043', kind: 'link', k: ['d1-c1', 'd1-c9', 'd1-c2', 'd1-c3', 'd1-c11'], lvl: 2,
    title: { en: `The whole loop in one line`, ru: `Весь цикл в одной строке` },
    body: {
      en: `<p>Everything in this stage fits into one chain:</p><p><b>Assets</b> have value → threats against them put <b>C, I or A</b> at stake → each threat meets a <b>vulnerability</b>, and together they make a <b>risk</b> → <b>management</b> chooses to reduce, transfer, avoid or accept it → the decision becomes a <b>policy</b>, then standards and procedures → those put <b>controls</b> in place → monitoring checks they work → new threats appear, and the loop starts again.</p><p>Every later stage zooms into one part of this loop.</p>`,
      ru: `<p>Всё, что было на этом этапе, складывается в одну цепочку:</p><p><b>Активы</b> ценны → угрозы ставят под удар их <b>C, I или A</b> → угроза встречает <b>уязвимость</b>, вместе они дают <b>риск</b> → <b>руководство</b> решает снизить, передать, избежать или принять его → решение становится <b>политикой</b>, затем стандартами и процедурами → они вводят <b>меры защиты</b> → мониторинг проверяет, что меры работают → появляются новые угрозы, и цикл начинается заново.</p><p>Каждый следующий этап приближает одну часть этого цикла.</p>`,
    },
    take: { en: `Asset → CIA → threat + vulnerability = risk → decision → policy → control → monitor → repeat.`, ru: `Актив → CIA → угроза + уязвимость = риск → решение → политика → мера → мониторинг → снова.` } },

  { id: 's01-044', kind: 'idea', k: ['d1-c10', 'd1-c9'], lvl: 2,
    title: { en: `Security is never finished`, ru: `Безопасность никогда не бывает «готова»` },
    body: {
      en: `<p>New systems are bought, staff change, attackers find new tricks. A risk assessment from last year describes last year's company.</p><p>That's why frameworks describe risk management as a cycle. The NIST Risk Management Framework, for example, goes: prepare, categorize the system, select controls, implement them, assess them, authorize the system to run, and then <b>monitor</b> continuously, feeding what you learn back into the start. You'll meet these steps again later. For now, remember the shape: a loop, not a project with an end date.</p>`,
      ru: `<p>Покупаются новые системы, меняются сотрудники, злоумышленники придумывают новые приёмы. Прошлогодняя оценка рисков описывает прошлогоднюю компанию.</p><p>Поэтому фреймворки описывают управление рисками как цикл. Например, NIST Risk Management Framework: подготовка, категоризация системы, выбор мер, внедрение, оценка, разрешение на эксплуатацию и затем постоянный <b>мониторинг</b>, результаты которого возвращаются в начало. С этими шагами вы ещё встретитесь. Пока запомните форму: это цикл, а не проект с датой окончания.</p>`,
    },
    take: { en: `Risk management is a loop that never closes.`, ru: `Управление рисками — цикл, который не заканчивается.` } },

  { id: 's01-045', kind: 'recap', lvl: 1,
    title: { en: `Stage 1 in seven lines`, ru: `Этап 1 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s01-002', { en: `Start with assets: you can't protect what you don't know you have.`, ru: `Начинайте с активов: нельзя защитить то, о чём не знаешь.` }],
      ['s01-007', { en: `Every problem breaks C, I or A; name the property first.`, ru: `Любая проблема нарушает C, I или A — сначала назовите свойство.` }],
      ['s01-012', { en: `Risk = threat × vulnerability, weighed by impact.`, ru: `Риск = угроза × уязвимость с поправкой на ущерб.` }],
      ['s01-020', { en: `Reduce, transfer, avoid or accept; never ignore.`, ru: `Снизить, передать, избежать или принять — но не игнорировать.` }],
      ['s01-021', { en: `A control shouldn't cost more than the loss it prevents, unless lives are at stake.`, ru: `Защита не должна стоить дороже предотвращаемого ущерба, если речь не о жизни людей.` }],
      ['s01-029', { en: `Prevent before, detect during, correct after, and layer them.`, ru: `Предотвратить до, обнаружить во время, исправить после — и всё слоями.` }],
      ['s01-033', { en: `Management owns the risk and decides; policies carry its decisions down.`, ru: `Риском владеет и решает руководство, а политики доносят его решения.` }],
    ],
    take: { en: `Next: the part of the system that no firewall can patch, people.`, ru: `Дальше — часть системы, которую не закроет никакой межсетевой экран: люди.` } },
] });
