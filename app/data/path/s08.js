'use strict';
// Learning path, stage 8: buildings, power and people safety. Site selection and the server room, CPTED and
// layered physical controls, doors, badges and visitors, fire detection and suppression, power and HVAC,
// RAID and hardware redundancy, people's safety (evacuation, duress, travel), and the building as a target.
CISSP.stage(8, { cards: [
  { id: 's08-001', kind: 'story', k: ['d3-c12', 'd3-c11'], lvl: 1,
    title: { en: `OVHcloud 2021: the night a data centre burned`, ru: `OVHcloud, 2021: ночь, когда сгорел дата-центр` },
    body: {
      en: `<p>Shortly after midnight on 10 March 2021, a fire broke out in <b>SBG2</b>, one of OVHcloud's data centre buildings in Strasbourg. By morning SBG2 was destroyed and part of the neighbouring SBG1 was gone too. The rest of the campus was shut down.</p><p>Millions of websites went offline. Some customers lost their data for good, because their backups sat in the same campus that burned. Reports afterwards pointed to electrical equipment as the starting point, and said the building had no automatic fire suppression.</p><p>No firewall, password or encryption key helps when the building itself is gone.</p>`,
      ru: `<p>Вскоре после полуночи 10 марта 2021 года загорелся <b>SBG2</b>, одно из зданий дата-центров OVHcloud в Страсбурге. К утру SBG2 был уничтожен, часть соседнего SBG1 тоже сгорела. Остальную площадку отключили.</p><p>Миллионы сайтов перестали работать. Часть клиентов потеряла данные навсегда, потому что резервные копии лежали на той же площадке, которая сгорела. По данным последующих отчётов, пожар начался в электрооборудовании, а автоматического пожаротушения в здании не было.</p><p>Никакой межсетевой экран, пароль или ключ шифрования не поможет, если не стало самого здания.</p>`,
    },
    take: { en: `Every logical control assumes the building, the power and the people are still there.`, ru: `Любая логическая мера предполагает, что здание, питание и люди всё ещё на месте.` } },

  { id: 's08-002', kind: 'idea', k: ['d3-c11', 'd1-c1'], lvl: 1,
    title: { en: `The layer under everything`, ru: `Слой под всем остальным` },
    body: {
      en: `<p>Physical security protects the things the other stages take for granted: the building, the power, the cooling and the people inside. Threats come in a few families:</p><ul><li><b>natural</b>: floods, storms, earthquakes, heat;</li><li><b>human-made</b>: theft, vandalism, sabotage, terrorism, a careless contractor;</li><li><b>technical or supply</b>: power loss, failed cooling, a burst pipe, a cut fibre line.</li></ul><p>Most of these hit <b>availability</b> first. Theft of a laptop or a disk hits <b>confidentiality</b>. And above all of them sits one rule this stage keeps coming back to: <b>people's lives come first</b>.</p>`,
      ru: `<p>Физическая безопасность защищает то, что остальные этапы принимают как данность: здание, питание, охлаждение и людей внутри. Угрозы делятся на несколько семейств:</p><ul><li><b>природные</b>: наводнения, бури, землетрясения, жара;</li><li><b>созданные людьми</b>: кража, вандализм, саботаж, терроризм, неосторожный подрядчик;</li><li><b>технические и инфраструктурные</b>: пропало питание, отказало охлаждение, прорвало трубу, перерезали оптику.</li></ul><p>Большинство из них бьёт прежде всего по <b>доступности</b>. Кража ноутбука или диска бьёт по <b>конфиденциальности</b>. А над всем этим — правило, к которому этап будет возвращаться: <b>жизнь людей важнее всего</b>.</p>`,
    },
    take: { en: `Physical threats are natural, human-made or technical; safety of people outranks all of them.`, ru: `Физические угрозы бывают природными, рукотворными и техническими; безопасность людей важнее их всех.` } },

  { id: 's08-003', kind: 'idea', k: ['d3-c11'], lvl: 1,
    title: { en: `Choosing a site`, ru: `Выбор площадки` },
    body: {
      en: `<p>The cheapest physical control is choosing a good place before you build. Things to check:</p><ul><li><b>Natural risk</b>: flood plains, fault lines, storm paths, wildfire areas.</li><li><b>Neighbours</b>: an airport flight path, a chemical plant, a railway carrying fuel.</li><li><b>Crime</b> in the area, and how far the police, fire service and hospital are.</li><li><b>Utilities</b>: two independent power feeds and two fibre routes, entering the building on different sides.</li><li><b>Visibility</b>: a data centre doesn't need a sign with the company logo.</li></ul><p>A site can't be patched later; a bad choice stays with you for decades.</p>`,
      ru: `<p>Самая дешёвая физическая мера — выбрать хорошее место до строительства. Что проверить:</p><ul><li><b>Природные риски</b>: поймы рек, разломы, пути ураганов, зоны лесных пожаров.</li><li><b>Соседей</b>: траекторию взлёта самолётов, химический завод, железную дорогу с цистернами.</li><li><b>Преступность</b> в районе и расстояние до полиции, пожарных и больницы.</li><li><b>Коммуникации</b>: два независимых ввода питания и два маршрута оптики, входящие в здание с разных сторон.</li><li><b>Заметность</b>: дата-центру не нужна вывеска с логотипом.</li></ul><p>Площадку нельзя «пропатчить»: плохой выбор остаётся с вами на десятилетия.</p>`,
    },
    take: { en: `Pick the site for its risks, neighbours, emergency services and utilities.`, ru: `Площадку выбирают по рискам, соседям, экстренным службам и коммуникациям.` } },

  { id: 's08-004', kind: 'story', k: ['d3-c12', 'd3-c11'], lvl: 1,
    title: { en: `Hurricane Sandy 2012: diesel in buckets`, ru: `Ураган «Сэнди», 2012: дизель в вёдрах` },
    body: {
      en: `<p>In October 2012, Hurricane Sandy flooded lower Manhattan. Several data centres there had generators on upper floors, which sounded sensible. But the fuel tanks and pumps that fed them were in the basements, and the basements filled with seawater.</p><p>At one hosting company in a building on Broad Street, staff and customers formed a <b>bucket brigade</b>, carrying diesel up 17 floors of stairs to keep the generator running for days.</p><p>The generator was fine. The design put one part of the power chain, the fuel supply, in the one place a flood reaches first.</p>`,
      ru: `<p>В октябре 2012 года ураган «Сэнди» затопил южный Манхэттен. У нескольких дата-центров генераторы стояли на верхних этажах, что звучит разумно. Но топливные баки и насосы, питавшие их, были в подвалах, а подвалы заполнила морская вода.</p><p>В одной хостинговой компании в здании на Брод-стрит сотрудники и клиенты выстроились <b>цепочкой с вёдрами</b> и несколько дней носили дизель по лестнице на 17 этажей, чтобы генератор продолжал работать.</p><p>Генератор был исправен. Проект поместил одно звено цепочки питания, подачу топлива, туда, куда вода приходит первой.</p>`,
    },
    take: { en: `Check every link of the chain: a generator is only as good as its fuel supply.`, ru: `Проверяйте каждое звено цепочки: генератор хорош настолько, насколько надёжна подача топлива.` } },

  { id: 's08-005', kind: 'think', k: ['d3-c11', 'd1-c9'], lvl: 2,
    title: { en: `Three buildings, one choice`, ru: `Три здания, один выбор` },
    body: {
      en: `<p>Your company is choosing a building for its new regional data centre. Three offers:</p><ul><li><b>A</b>: cheapest, beside a river, ground floor available, 40 minutes from the nearest fire station.</li><li><b>B</b>: mid-price, on a hill in a business park, two power feeds from different substations, 8 minutes from a fire station.</li><li><b>C</b>: most expensive, a landmark glass tower downtown, the data centre would be on the top floor with a view.</li></ul><p>Which would you recommend, and what would you still check?</p>`,
      ru: `<p>Компания выбирает здание для нового регионального дата-центра. Три предложения:</p><ul><li><b>A</b>: самое дешёвое, у реки, свободен первый этаж, до ближайшей пожарной части 40 минут.</li><li><b>B</b>: средняя цена, на холме в бизнес-парке, два ввода питания от разных подстанций, до пожарной части 8 минут.</li><li><b>C</b>: самое дорогое, известная стеклянная башня в центре, дата-центр — на последнем этаже с видом.</li></ul><p>Что бы вы рекомендовали и что ещё проверили бы?</p>`,
    },
    reveal: {
      en: `<p><b>B.</b> A saves money but stacks flood risk, a ground floor and a slow fire response: one bad night like Sandy and the savings are gone. C pays a premium for visibility, a top floor exposed to roof leaks and storms, and a glass building that is hard to secure.</p><p>Before signing for B, still check: the flood and earthquake history of the area, whether the two feeds really share no equipment, the fibre routes, the neighbours, and what the risk assessment says the site must survive. The best answer balances risk against cost; it isn't always the cheapest or the most impressive.</p>`,
      ru: `<p><b>B.</b> A экономит деньги, но складывает риск наводнения, первый этаж и медленную реакцию пожарных: одна ночь, как во время «Сэнди», — и экономии нет. C переплачивает за заметность, последний этаж страдает от протечек кровли и бурь, а стеклянное здание трудно защитить.</p><p>Перед подписанием B стоит проверить: историю наводнений и землетрясений в районе, действительно ли два ввода не имеют общего оборудования, маршруты оптики, соседей и то, что оценка рисков требует от площадки. Лучший ответ уравновешивает риск и стоимость; это не всегда самое дешёвое или самое впечатляющее.</p>`,
    },
    take: { en: `Choose the site that meets the risk assessment at a reasonable cost.`, ru: `Выбирайте площадку, которая отвечает оценке рисков по разумной цене.` } },

  { id: 's08-006', kind: 'picture', k: ['d3-c11', 'd3-c1'], lvl: 1,
    title: { en: `From the fence to the disk`, ru: `От забора до диска` },
    body: {
      en: `<p>Physical security is built in rings. An intruder has to get past the perimeter, then the entrance, then the floor, then the server room, then the rack. Each ring has its own controls, and each one buys time and leaves a trace. The last ring isn't physical at all: if a disk does leave the building, encryption keeps the data unreadable.</p>`,
      ru: `<p>Физическая безопасность строится кольцами. Нарушителю нужно пройти периметр, потом вход, потом этаж, потом серверную, потом стойку. У каждого кольца свои меры, и каждое выигрывает время и оставляет след. Последнее кольцо вообще не физическое: если диск всё же покинул здание, шифрование не даст прочитать данные.</p>`,
    },
    dg: { title: { en: `Rings of physical defense`, ru: `Кольца физической защиты` }, h: 300,
      zones: [[20, 30, 720, 120, { en: 'Outside and public areas', ru: 'Снаружи и общие зоны' }, 'untrust'], [20, 165, 720, 120, { en: 'Restricted areas', ru: 'Зоны ограниченного доступа' }, 'trust']],
      nodes: [
        ['p', 140, 95, { en: 'Perimeter', ru: 'Периметр' }, { en: 'fence, lights, bollards', ru: 'забор, свет, столбики' }, '🚧', 'dim'],
        ['e', 380, 95, { en: 'Entrance', ru: 'Вход' }, { en: 'guard, mantrap, badge', ru: 'охрана, шлюз, пропуск' }, '🚪', 'dim'],
        ['f', 620, 95, { en: 'Floor', ru: 'Этаж' }, { en: 'badge zones, cameras', ru: 'зоны пропусков, камеры' }, '🏢', 'ok'],
        ['r', 620, 230, { en: 'Server room', ru: 'Серверная' }, { en: 'biometrics, access log', ru: 'биометрия, журнал входа' }, '🔐', 'key'],
        ['k', 380, 230, { en: 'Rack', ru: 'Стойка' }, { en: 'locked cage', ru: 'запертая клетка' }, '🗄', 'key'],
        ['d', 140, 230, { en: 'Data', ru: 'Данные' }, { en: 'encrypted disks', ru: 'зашифрованные диски' }, '💾', 'key'],
      ],
      edges: [['p', 'e', '', 'dash'], ['e', 'f', '', 'dash'], ['f', 'r', '', 'dash'], ['r', 'k', '', 'dash'], ['k', 'd', '', 'dash']],
      note: { en: `Each ring should deter, delay or detect; together they give the guards time to respond.`, ru: `Каждое кольцо должно отпугивать, задерживать или обнаруживать; вместе они дают охране время отреагировать.` } },
    take: { en: `Rings of controls, from the fence to the encrypted disk.`, ru: `Кольца мер — от забора до зашифрованного диска.` } },

  { id: 's08-007', kind: 'back', back: 's01-031', k: ['d3-c1', 'd1-c11'], lvl: 1,
    title: { en: `Defense in depth again, made of concrete`, ru: `Эшелонированная защита снова, теперь из бетона` },
    body: {
      en: `<p>Remember <b>defense in depth</b> from stage 1: never rely on one wall. You've seen it as a network (stage 5) and as design principles (stage 7). Here it's literal.</p><p>A fence alone stops nobody determined. A fence, plus lighting, plus a camera, plus a guard, plus a mantrap, plus a locked rack is a different story: the intruder must beat all of them, and every layer is another chance to be seen.</p><p>It also mixes all three <b>control categories</b>: physical (locks, fences), technical (badge readers, sensors) and administrative (visitor policy, guard procedures).</p>`,
      ru: `<p>Помните <b>эшелонированную защиту</b> из этапа 1: никогда не полагаться на одну стену. Вы видели её в сети (этап 5) и в принципах проектирования (этап 7). Здесь она буквальна.</p><p>Один забор не остановит решительного человека. Забор, плюс освещение, плюс камера, плюс охранник, плюс шлюз, плюс запертая стойка — совсем другое дело: нарушителю нужно преодолеть всё это, и каждый слой — ещё один шанс его заметить.</p><p>Здесь смешиваются все три <b>категории мер</b>: физические (замки, заборы), технические (считыватели, датчики) и административные (правила для посетителей, инструкции охраны).</p>`,
    },
    take: { en: `Layers of physical, technical and administrative controls, each a chance to catch the intruder.`, ru: `Слои физических, технических и административных мер — каждый даёт шанс поймать нарушителя.` } },

  { id: 's08-008', kind: 'idea', k: ['d3-c11'], lvl: 1,
    title: { en: `Where the server room goes`, ru: `Где разместить серверную` },
    body: {
      en: `<p>Inside the building, the server room has its own rules:</p><ul><li><b>In the core</b>, on a middle floor: not the basement (floods), not the top floor (roof leaks, storms).</li><li><b>No exterior windows</b>, and walls that go from the real floor to the real ceiling, so nobody climbs over through a false ceiling.</li><li><b>One controlled entrance</b> for people; fire exits that only open outward and raise an alarm.</li><li><b>Positive air pressure</b>: when the door opens, air flows out, keeping dust and smoke out.</li><li>Its own cooling, fire detection and suppression, and no water pipes running overhead.</li></ul>`,
      ru: `<p>Внутри здания у серверной свои правила:</p><ul><li><b>В центре здания</b>, на среднем этаже: не в подвале (затопление), не на последнем этаже (протечки кровли, бури).</li><li><b>Без внешних окон</b>, со стенами от настоящего пола до настоящего потолка, чтобы никто не перелез через фальшпотолок.</li><li><b>Один контролируемый вход</b> для людей; аварийные выходы открываются только наружу и поднимают тревогу.</li><li><b>Положительное давление воздуха</b>: при открытии двери воздух выходит наружу и не пускает пыль и дым внутрь.</li><li>Своё охлаждение, обнаружение и тушение пожара и никаких водопроводных труб над головой.</li></ul>`,
    },
    take: { en: `Core of the building, middle floor, no windows, one door, positive pressure.`, ru: `Центр здания, средний этаж, без окон, одна дверь, положительное давление.` } },

  { id: 's08-009', kind: 'idea', k: ['d3-c11'], lvl: 2,
    title: { en: `CPTED: let the building do the work`, ru: `CPTED: пусть здание работает само` },
    body: {
      en: `<p><b>Crime Prevention Through Environmental Design</b> (CPTED) uses the layout itself to discourage crime, often at almost no cost:</p><ul><li><b>Natural access control</b>: paths, planters and bollards guide people to the one entrance you want them to use.</li><li><b>Natural surveillance</b>: open sight lines, good lighting, windows overlooking the car park. People behave when they feel seen.</li><li><b>Territorial reinforcement</b>: clear boundaries, signs and a cared-for look that say "this place belongs to someone".</li></ul><p>A well-kept, well-lit entrance with nowhere to hide deters more than a hidden camera.</p>`,
      ru: `<p><b>Предотвращение преступлений через проектирование среды</b> (CPTED) использует саму планировку, чтобы отбить охоту нарушать, часто почти бесплатно:</p><ul><li><b>Естественный контроль доступа</b>: дорожки, клумбы и столбики направляют людей к тому единственному входу, который вам нужен.</li><li><b>Естественное наблюдение</b>: открытые линии обзора, хорошее освещение, окна на парковку. Люди ведут себя прилично, когда чувствуют, что их видят.</li><li><b>Территориальное усиление</b>: чёткие границы, знаки и ухоженный вид, которые говорят: «у этого места есть хозяин».</li></ul><p>Ухоженный, светлый вход, где негде спрятаться, отпугивает лучше скрытой камеры.</p>`,
    },
    take: { en: `CPTED: natural access control, natural surveillance, territorial reinforcement.`, ru: `CPTED: естественный контроль доступа, естественное наблюдение, территориальное усиление.` } },

  { id: 's08-010', kind: 'vs', k: ['d3-c11', 'd1-c11'], lvl: 1,
    title: { en: `Deter vs delay vs detect vs respond`, ru: `Отпугнуть, задержать, обнаружить, отреагировать` },
    body: {
      en: `<p>Physical controls are usually described by what they do to the intruder, in order:</p><ul><li><b>Deter</b>: make them choose another target. Signs, lighting, visible cameras, guards.</li><li><b>Delay</b>: slow them down. Fences, locks, vaults, mantraps, locked racks.</li><li><b>Detect</b>: notice them. Motion sensors, door contacts, CCTV that someone watches, alarms.</li><li><b>Respond</b>: someone arrives. Guards, police, the incident process.</li></ul><p>The rule: <b>delay must last longer than the response takes</b>. A lock that holds for two minutes is useless if the guard needs ten.</p>`,
      ru: `<p>Физические меры обычно описывают по тому, что они делают с нарушителем, по порядку:</p><ul><li><b>Отпугнуть</b>: пусть выберет другую цель. Знаки, освещение, заметные камеры, охрана.</li><li><b>Задержать</b>: замедлить. Заборы, замки, хранилища, шлюзы, запертые стойки.</li><li><b>Обнаружить</b>: заметить. Датчики движения, датчики дверей, видеонаблюдение, за которым кто-то следит, сигнализация.</li><li><b>Отреагировать</b>: кто-то приходит. Охрана, полиция, процесс реагирования на инциденты.</li></ul><p>Правило: <b>задержка должна длиться дольше, чем занимает реакция</b>. Замок, который держит две минуты, бесполезен, если охране нужно десять.</p>`,
    },
    take: { en: `Deter, delay, detect, respond; the delay must outlast the response time.`, ru: `Отпугнуть, задержать, обнаружить, отреагировать; задержка должна быть дольше реакции.` } },

  { id: 's08-011', kind: 'idea', k: ['d3-c11'], lvl: 2,
    title: { en: `Fences, lights and bollards`, ru: `Заборы, свет и столбики` },
    body: {
      en: `<p>The outer ring, in numbers often quoted for the exam:</p><ul><li><b>Fences</b>: about 1 m (3–4 ft) keeps out casual walkers; about 2 m (6–7 ft) is hard to climb; 2.4 m (8 ft) with barbed or razor wire deters a determined intruder.</li><li><b>Lighting</b>: even and continuous along the perimeter, with no dark gaps, and lights pointing out at the approach rather than into the guards' eyes.</li><li><b>Bollards</b>: posts that stop a vehicle from driving through the front glass, while letting people walk past.</li></ul><p>These mostly deter and delay. Detection needs sensors or someone watching.</p>`,
      ru: `<p>Внешнее кольцо в цифрах, которые часто встречаются на экзамене:</p><ul><li><b>Заборы</b>: около 1 м отсекает случайных прохожих; около 2 м трудно перелезть; 2,4 м с колючей или режущей проволокой отпугивает решительного нарушителя.</li><li><b>Освещение</b>: равномерное и непрерывное вдоль периметра, без тёмных промежутков, светит наружу, на подходы, а не в глаза охране.</li><li><b>Столбики (болларды)</b>: не дают машине въехать в стеклянный фасад, но люди проходят свободно.</li></ul><p>Всё это в основном отпугивает и задерживает. Для обнаружения нужны датчики или наблюдатель.</p>`,
    },
    take: { en: `1 m deters the casual, 2 m the average climber, 2.4 m plus wire the determined.`, ru: `1 м — от случайных, 2 м — от обычных, 2,4 м с проволокой — от решительных.` } },

  { id: 's08-012', kind: 'think', k: ['d3-c11', 'd1-c11'], lvl: 2,
    title: { en: `A guard or a camera?`, ru: `Охранник или камера?` },
    body: {
      en: `<p>A small company's office has a side door to the loading area that is often propped open. The office manager proposes replacing the evening guard with four cameras recording to a disk, to save money.</p><p>What does the company lose, and what would you suggest?</p>`,
      ru: `<p>В офисе небольшой компании есть боковая дверь в зону разгрузки, которую часто подпирают, чтобы не закрывалась. Офис-менеджер предлагает ради экономии заменить вечернего охранника четырьмя камерами с записью на диск.</p><p>Что компания теряет и что бы вы предложили?</p>`,
    },
    reveal: {
      en: `<p>A camera that only records <b>deters</b> a little and helps investigate <b>afterwards</b>, but nobody is watching, so nothing <b>detects</b> or <b>responds</b> in the moment. A guard can notice the propped door, challenge a stranger and use judgment. That <b>discretion</b> is what cameras lack.</p><p>A sensible middle ground: a door contact that raises an alarm when the door stays open, a closer so it shuts itself, cameras for evidence, and a monitored alarm or a patrol for response. Choose by the risk, but know which functions each option actually covers.</p>`,
      ru: `<p>Камера, которая только записывает, немного <b>отпугивает</b> и помогает расследовать <b>потом</b>, но за ней никто не следит, так что в моменте ничего не <b>обнаруживается</b> и никто не <b>реагирует</b>. Охранник может заметить подпёртую дверь, остановить незнакомца и принять решение. Именно этой <b>способности к суждению</b> у камер нет.</p><p>Разумный компромисс: датчик на двери, который поднимает тревогу, если она долго открыта, доводчик, чтобы она закрывалась сама, камеры для доказательств и пультовая охрана или патруль для реагирования. Выбирайте по риску, но понимайте, какие функции закрывает каждый вариант.</p>`,
    },
    take: { en: `Recording cameras deter and record; only people judge and respond.`, ru: `Камеры с записью отпугивают и фиксируют; судить и реагировать могут только люди.` } },

  { id: 's08-013', kind: 'back', back: 's04-052', k: ['d5-c8', 'd7-c11'], lvl: 2,
    title: { en: `Tailgating again: the mantrap`, ru: `Проход «паровозиком» снова: шлюз` },
    body: {
      en: `<p>In stage 4 the turnstile stopped tailgaters. For a server room or a data centre entrance, the stronger version is a <b>mantrap</b>, now often called an <b>access control vestibule</b>: a small room with two doors that never open at the same time.</p><p>You badge in, the outer door closes behind you, and only then can the inner door open, often after a second check such as a PIN or a fingerprint. Some weigh the occupant or use a camera to count people, so two can't squeeze through on one badge. If something is wrong, the person is held between doors until a guard arrives.</p>`,
      ru: `<p>В этапе 4 «паровозиков» останавливал турникет. Для серверной или входа в дата-центр есть вариант сильнее — <b>шлюз</b> (mantrap, сейчас часто «тамбур контроля доступа»): маленькое помещение с двумя дверями, которые никогда не открываются одновременно.</p><p>Вы прикладываете пропуск, внешняя дверь закрывается за вами, и только тогда может открыться внутренняя, часто после второй проверки, например PIN-кода или отпечатка. Некоторые шлюзы взвешивают человека или считают людей камерой, чтобы двое не прошли по одному пропуску. Если что-то не так, человек остаётся между дверями до прихода охраны.</p>`,
    },
    take: { en: `A mantrap: two doors, never open together, one person at a time.`, ru: `Шлюз: две двери, никогда не открыты вместе, по одному человеку.` } },

  { id: 's08-014', kind: 'idea', k: ['d5-c8', 'd3-c11'], lvl: 1,
    title: { en: `Locks and badges`, ru: `Замки и пропуска` },
    body: {
      en: `<p>Every lock is a <b>delay</b> device: given time and tools, any lock opens. The types you'll meet:</p><ul><li><b>Preset (mechanical) locks</b>: a key. Cheap, but keys are copied and rarely returned.</li><li><b>Cipher (combination) locks</b>: a keypad code. Codes leak, so change them and shield the keypad from view.</li><li><b>Smart locks and badges</b>: a card or phone. Access is granted per person, revoked centrally, and every opening is logged.</li></ul><p>That last point is why offices moved to badges: you can see who entered, and you can switch off one person without changing every lock.</p>`,
      ru: `<p>Любой замок — средство <b>задержки</b>: при достаточном времени и инструментах открывается любой. Типы, которые встретятся:</p><ul><li><b>Механические замки</b>: ключ. Дёшево, но ключи копируют и редко возвращают.</li><li><b>Кодовые замки</b>: код на клавиатуре. Коды утекают, поэтому их меняют, а клавиатуру прикрывают от посторонних глаз.</li><li><b>Электронные замки и пропуска</b>: карта или телефон. Доступ выдаётся каждому лично, отзывается централизованно, и каждое открытие записывается.</li></ul><p>Последнее — причина, по которой офисы перешли на пропуска: видно, кто вошёл, и можно отключить одного человека, не меняя все замки.</p>`,
    },
    take: { en: `Locks only delay; badges add per-person access, central revocation and a log.`, ru: `Замки только задерживают; пропуска добавляют личный доступ, централизованный отзыв и журнал.` } },

  { id: 's08-015', kind: 'back', back: 's04-023', k: ['d5-c2', 'd5-c8'], lvl: 2,
    title: { en: `Biometrics again, at a real door`, ru: `Снова биометрия, у настоящей двери` },
    body: {
      en: `<p>In stage 4 you tuned a biometric scanner between false rejections and false acceptances. At a physical door, two more things matter:</p><ul><li><b>Throughput</b>: a reader that takes 15 seconds per person creates a queue at 9:00, and queues lead to propped doors and tailgating. Fast readers matter at busy entrances.</li><li><b>A fallback</b>: fingers get cut, readers break. Someone must be able to let a legitimate person in, with a guard checking ID, and that fallback must be logged too.</li></ul><p>That's why biometrics usually guard the inner rings, such as the server room, and badges handle the front door.</p>`,
      ru: `<p>В этапе 4 вы настраивали биометрический сканер между ложными отказами и ложными допусками. У физической двери важны ещё две вещи:</p><ul><li><b>Пропускная способность</b>: считыватель, которому нужно 15 секунд на человека, создаёт очередь в 9:00, а очереди ведут к подпёртым дверям и проходу «паровозиком». У оживлённых входов нужны быстрые считыватели.</li><li><b>Резервный способ</b>: пальцы режут, считыватели ломаются. Кто-то должен суметь впустить законного сотрудника, а охранник — проверить документ, и этот способ тоже должен записываться в журнал.</li></ul><p>Поэтому биометрия обычно охраняет внутренние кольца, например серверную, а пропуска — главный вход.</p>`,
    },
    take: { en: `At real doors, biometrics need throughput and a logged fallback.`, ru: `У настоящих дверей биометрии нужны скорость и резервный способ с журналом.` } },

  { id: 's08-016', kind: 'idea', k: ['d5-c8', 'd7-c11'], lvl: 1,
    title: { en: `Visitors, escorts and the server room log`, ru: `Посетители, сопровождение и журнал серверной` },
    body: {
      en: `<p>Visitors are where most physical rules get bent, so the rules need to be simple:</p><ul><li>Every visitor signs in, shows ID, gets a <b>visibly different badge</b>, and signs out.</li><li>Visitors are <b>escorted</b> in restricted areas, the whole time, by the person responsible for them.</li><li>Contractors in the server room are logged in and out, with what they came to do.</li><li>Staff are trained to <b>challenge</b> anyone without a badge, politely, or report them.</li></ul><p>The visitor log is also evidence: after an incident, it's how you know who was in the building.</p>`,
      ru: `<p>На посетителях нарушается большинство физических правил, поэтому правила должны быть простыми:</p><ul><li>Каждый посетитель регистрируется, показывает документ, получает <b>заметно отличающийся пропуск</b> и отмечает уход.</li><li>В зонах ограниченного доступа посетителей <b>сопровождают</b> всё время, и делает это ответственный за них сотрудник.</li><li>Вход и выход подрядчиков в серверную записываются вместе с целью визита.</li><li>Сотрудников учат вежливо <b>останавливать</b> любого без пропуска или сообщать о нём.</li></ul><p>Журнал посетителей — ещё и доказательство: после инцидента по нему узнают, кто был в здании.</p>`,
    },
    take: { en: `Sign in, distinct badge, escort, sign out; the log is evidence.`, ru: `Регистрация, особый пропуск, сопровождение, отметка об уходе; журнал — доказательство.` } },

  { id: 's08-017', kind: 'idea', k: ['d3-c11', 'd1-c11'], lvl: 2,
    title: { en: `Sensors that notice intruders`, ru: `Датчики, которые замечают нарушителя` },
    body: {
      en: `<p>Intrusion detection in a building is the physical cousin of an IDS:</p><ul><li><b>Door and window contacts</b>: a magnet that tells you something opened.</li><li><b>Motion sensors</b>: infrared (body heat), microwave or ultrasonic, for empty rooms at night.</li><li><b>Glass-break and vibration sensors</b>: for windows and walls.</li><li><b>CCTV</b>: detects only if someone or something is watching; otherwise it records.</li></ul><p>Like a network IDS, these produce false alarms: a cat, a draft, a delivery. Too many false alarms and guards stop responding, which is exactly what a patient intruder hopes for.</p>`,
      ru: `<p>Обнаружение вторжений в здании — физический родственник IDS:</p><ul><li><b>Датчики дверей и окон</b>: магнит, который сообщает, что что-то открылось.</li><li><b>Датчики движения</b>: инфракрасные (тепло тела), микроволновые или ультразвуковые — для пустых помещений ночью.</li><li><b>Датчики разбития стекла и вибрации</b>: для окон и стен.</li><li><b>Видеонаблюдение</b>: обнаруживает, только если за ним кто-то или что-то следит; иначе просто записывает.</li></ul><p>Как и сетевые IDS, они дают ложные тревоги: кошка, сквозняк, доставка. Слишком много ложных тревог — и охрана перестаёт реагировать, на что и рассчитывает терпеливый нарушитель.</p>`,
    },
    take: { en: `Physical sensors detect; false alarms wear down the response.`, ru: `Физические датчики обнаруживают; ложные тревоги изматывают реагирование.` } },

  { id: 's08-018', kind: 'link', k: ['d5-c8', 'd7-c2', 'd3-c11'], lvl: 2,
    title: { en: `One badge, one door, one log`, ru: `Один пропуск, одна дверь, один журнал` },
    body: {
      en: `<p>Tie the physical controls to everything earlier:</p><ul><li>The badge comes from the same <b>identity</b> as the laptop login, so joiners, movers and leavers update both (stage 4).</li><li>Badge rights follow <b>least privilege</b>: the finance team doesn't open the server room (stage 2).</li><li>Badge readers, door alarms and cameras send events to the <b>SIEM</b>, next to network logs.</li><li>Then the SIEM can spot what neither log shows alone: a badge-in at the server room by someone whose account is logged in from another country.</li></ul><p>Physical and logical security work best as one system.</p>`,
      ru: `<p>Свяжем физические меры со всем предыдущим:</p><ul><li>Пропуск выдаётся по той же <b>учётной записи</b>, что и вход в ноутбук, поэтому приём, перевод и увольнение меняют и то, и другое (этап 4).</li><li>Права пропуска следуют <b>минимальным привилегиям</b>: финансовый отдел не открывает серверную (этап 2).</li><li>Считыватели, дверная сигнализация и камеры отправляют события в <b>SIEM</b>, рядом с сетевыми журналами.</li><li>Тогда SIEM замечает то, чего не видно в каждом журнале по отдельности: вход в серверную по пропуску человека, чья учётка сейчас залогинена из другой страны.</li></ul><p>Физическая и логическая безопасность лучше всего работают как одна система.</p>`,
    },
    take: { en: `Same identity, same least privilege, same SIEM for doors and data.`, ru: `Одна учётка, одни минимальные привилегии, один SIEM для дверей и данных.` } },

  { id: 's08-019', kind: 'idea', k: ['d3-c12'], lvl: 1,
    title: { en: `Fire needs four things`, ru: `Огню нужны четыре вещи` },
    body: {
      en: `<p>Fire needs <b>fuel</b>, <b>heat</b>, <b>oxygen</b> and the <b>chemical chain reaction</b> between them (the fire tetrahedron). Every suppression method removes one: water removes heat, CO₂ and inert gases remove oxygen, some gases break the chain reaction.</p><p>Detection comes first, and detectors notice different stages:</p><ul><li><b>Smoke detectors</b>: ionization (fast, flaming fires) or photoelectric (slow, smouldering fires).</li><li><b>Heat detectors</b>: fixed temperature, or rate-of-rise, which triggers on a fast climb.</li><li><b>Flame detectors</b>: infrared or ultraviolet light from the flame itself.</li></ul><p>Smoke usually comes before heat, so smoke detection warns earlier.</p>`,
      ru: `<p>Огню нужны <b>топливо</b>, <b>тепло</b>, <b>кислород</b> и <b>цепная химическая реакция</b> между ними (пожарный тетраэдр). Любой способ тушения убирает одно из них: вода отводит тепло, CO₂ и инертные газы вытесняют кислород, некоторые газы обрывают цепную реакцию.</p><p>Сначала — обнаружение, и извещатели замечают разные стадии:</p><ul><li><b>Дымовые</b>: ионизационные (быстрое открытое горение) или фотоэлектрические (медленное тление).</li><li><b>Тепловые</b>: по фиксированной температуре или по скорости роста, срабатывающие на быстрый подъём.</li><li><b>Извещатели пламени</b>: инфракрасный или ультрафиолетовый свет самого пламени.</li></ul><p>Дым обычно появляется раньше жара, поэтому дымовые извещатели предупреждают раньше.</p>`,
    },
    take: { en: `Remove fuel, heat, oxygen or the chain reaction; detect smoke early.`, ru: `Уберите топливо, тепло, кислород или цепную реакцию; обнаруживайте дым рано.` } },

  { id: 's08-020', kind: 'vs', k: ['d3-c12'], lvl: 1,
    title: { en: `Fire classes: what's burning decides what you use`, ru: `Классы пожаров: что горит, тем и тушат` },
    body: {
      en: `<p>The exam uses the US classes:</p><ul><li><b>A</b>: ordinary combustibles, such as paper, wood and cloth. Water or foam.</li><li><b>B</b>: flammable liquids and gases. CO₂, foam, dry powder.</li><li><b>C</b>: energized electrical equipment. CO₂ or clean-agent gas, <b>never water</b>.</li><li><b>D</b>: combustible metals. Special dry powder.</li><li><b>K</b>: cooking oils and fats. Wet chemical.</li></ul><p>A server room fire usually starts as class C and becomes class A once cables and cabinets burn. Europe uses different letters, so read the fuel, not just the letter.</p>`,
      ru: `<p>Экзамен использует американские классы:</p><ul><li><b>A</b>: обычные горючие материалы — бумага, дерево, ткань. Вода или пена.</li><li><b>B</b>: горючие жидкости и газы. CO₂, пена, порошок.</li><li><b>C</b>: электрооборудование под напряжением. CO₂ или газовое тушение, <b>никогда не вода</b>.</li><li><b>D</b>: горючие металлы. Специальный порошок.</li><li><b>K</b>: кухонные масла и жиры. Специальные жидкие составы.</li></ul><p>Пожар в серверной обычно начинается как класс C и становится классом A, когда загораются кабели и шкафы. В Европе буквы другие, поэтому смотрите на то, что горит, а не только на букву.</p>`,
    },
    take: { en: `A paper, B liquids, C electrical (no water), D metals, K kitchen.`, ru: `A — бумага, B — жидкости, C — электричество (без воды), D — металлы, K — кухня.` } },

  { id: 's08-021', kind: 'vs', k: ['d3-c12'], lvl: 2,
    title: { en: `Wet pipe vs dry pipe vs pre-action vs deluge`, ru: `Wet pipe, dry pipe, pre-action и deluge` },
    body: {
      en: `<p>Four kinds of sprinkler system:</p><ul><li><b>Wet pipe</b>: pipes always full of water; a head opens when its bulb melts. Fastest and simplest, but a leak or a knock means water on equipment, and pipes can freeze.</li><li><b>Dry pipe</b>: pipes hold pressurized air; water enters only after a head opens. For unheated spaces. Slower.</li><li><b>Pre-action</b>: dry until a detector triggers, then the pipes fill; water flows only when a head also melts. Two events needed, so a broken head alone doesn't flood the room. <b>The usual choice for data centres.</b></li><li><b>Deluge</b>: all heads open at once. For high-hazard sites, never for computers.</li></ul>`,
      ru: `<p>Четыре вида спринклерных систем:</p><ul><li><b>Wet pipe (мокрые трубы)</b>: трубы всегда заполнены водой; головка открывается, когда лопается её колба. Быстрее и проще всего, но протечка или удар — это вода на оборудовании, а трубы могут замёрзнуть.</li><li><b>Dry pipe (сухие трубы)</b>: в трубах сжатый воздух; вода поступает только после открытия головки. Для неотапливаемых помещений. Медленнее.</li><li><b>Pre-action</b>: трубы сухие, пока не сработает извещатель, затем заполняются; вода идёт, только если ещё и головка вскрылась. Нужны два события, поэтому одна сломанная головка помещение не зальёт. <b>Обычный выбор для дата-центров.</b></li><li><b>Deluge (дренчерная)</b>: открываются все головки сразу. Для особо опасных объектов, никогда для компьютеров.</li></ul>`,
    },
    take: { en: `Data centres: pre-action, which needs both a detector and a melted head.`, ru: `Дата-центры: pre-action — нужны и сработавший извещатель, и вскрывшаяся головка.` } },

  { id: 's08-022', kind: 'idea', k: ['d3-c12', 'd7-c11'], lvl: 2,
    title: { en: `Gas instead of water`, ru: `Газ вместо воды` },
    body: {
      en: `<p>Gas suppression puts out a fire without wetting the equipment:</p><ul><li><b>Clean agents</b> such as FM-200 break the chain reaction and are safe for people at the design concentration.</li><li><b>Inert gases</b> such as Inergen, argon or nitrogen lower the oxygen enough to stop the fire, but not enough to suffocate people quickly.</li><li><b>CO₂</b> works well but is <b>deadly</b> at extinguishing levels, so it's only for unoccupied spaces, with a warning alarm and a delay before release.</li><li><b>Halon</b> was the classic, but its production was banned under the Montreal Protocol because it destroys ozone.</li></ul><p>Many data centres combine gas with pre-action sprinklers as the backup.</p>`,
      ru: `<p>Газовое тушение гасит пожар, не намочив оборудование:</p><ul><li><b>Чистые агенты</b>, например FM-200, обрывают цепную реакцию и безопасны для людей в расчётной концентрации.</li><li><b>Инертные газы</b> (Inergen, аргон, азот) снижают кислород достаточно, чтобы остановить огонь, но не настолько, чтобы люди быстро задохнулись.</li><li><b>CO₂</b> тушит хорошо, но <b>смертелен</b> в тушащей концентрации, поэтому только для помещений без людей, с предупредительной сиреной и задержкой выпуска.</li><li><b>Галон</b> был классикой, но его производство запретили Монреальским протоколом, потому что он разрушает озон.</li></ul><p>Многие дата-центры сочетают газ со спринклерами pre-action как резервом.</p>`,
    },
    take: { en: `Gas spares the equipment; CO₂ is deadly, halon is banned.`, ru: `Газ щадит оборудование; CO₂ смертелен, галон запрещён.` } },

  { id: 's08-023', kind: 'story', k: ['d3-c12'], lvl: 2,
    title: { en: `ING Romania 2016: the test that broke the disks`, ru: `ING в Румынии, 2016: учения, которые сломали диски` },
    body: {
      en: `<p>In September 2016, ING Bank's data centre in Bucharest ran a planned test of its inert-gas fire suppression system. There was no fire. The gas was released as designed.</p><p>The release was extremely loud, and the sound waves made the hard drives vibrate enough to fail. The bank's card payments, ATMs and online banking were down for about ten hours.</p><p>The lesson isn't "don't test". Testing found a real weakness, and the fix is known: <b>acoustic silencer nozzles</b> and keeping sensitive disks away from them. Every control has side effects; test it before a real emergency shows them to you.</p>`,
      ru: `<p>В сентябре 2016 года дата-центр ING Bank в Бухаресте проводил плановые учения системы пожаротушения инертным газом. Пожара не было. Газ выпустили, как и задумано.</p><p>Выпуск был очень громким, и звуковые волны раскачали жёсткие диски настолько, что они вышли из строя. Карточные платежи, банкоматы и онлайн-банк лежали около десяти часов.</p><p>Урок не в том, что «не надо тестировать». Тест нашёл настоящую слабость, а решение известно: <b>насадки-глушители</b> и диски подальше от них. У каждой меры есть побочные эффекты; проверьте её до того, как их покажет настоящая авария.</p>`,
    },
    take: { en: `Controls have side effects; testing finds them before an emergency does.`, ru: `У мер есть побочные эффекты; тест находит их раньше, чем авария.` } },

  { id: 's08-024', kind: 'think', k: ['d3-c12', 'd7-c11'], lvl: 2,
    title: { en: `Sprinklers in the server room?`, ru: `Спринклеры в серверной?` },
    body: {
      en: `<p>The building's fire engineer wants to extend the office's <b>wet-pipe</b> sprinklers into the new server room. The IT manager objects: "Water and servers don't mix. Let's use CO₂ flooding instead, it's the most effective."</p><p>Who is right?</p>`,
      ru: `<p>Пожарный инженер здания хочет продлить офисные спринклеры <b>wet pipe</b> в новую серверную. ИТ-менеджер возражает: «Вода и серверы несовместимы. Давайте затапливать CO₂, это эффективнее всего».</p><p>Кто прав?</p>`,
    },
    reveal: {
      en: `<p>Neither, fully. Wet pipe risks accidental water damage from one broken head. <b>CO₂ flooding</b> in a room people work in can kill them, so it fails the first test: <b>people's safety first</b>.</p><p>A better design: <b>early smoke detection</b>, a <b>clean-agent or inert-gas</b> system that is safe for occupants, with an alarm and evacuation time before release, and <b>pre-action</b> sprinklers as the backup, since codes often require water anyway. Also: an emergency power-off button by the door, and staff trained to leave, not to fight the fire.</p>`,
      ru: `<p>Ни один полностью. Wet pipe рискует залить оборудование из-за одной сломанной головки. <b>Затопление CO₂</b> помещения, где работают люди, может их убить, то есть проваливает первую проверку: <b>сначала безопасность людей</b>.</p><p>Лучший проект: <b>раннее обнаружение дыма</b>, система на <b>чистом агенте или инертном газе</b>, безопасная для людей, с сиреной и временем на эвакуацию до выпуска, и спринклеры <b>pre-action</b> как резерв, ведь нормы часто требуют воду в любом случае. Плюс кнопка аварийного отключения питания у двери и сотрудники, обученные уходить, а не тушить.</p>`,
    },
    take: { en: `Choose suppression that's safe for people first, then gentle on equipment.`, ru: `Выбирайте тушение, безопасное прежде всего для людей, а уже потом щадящее для техники.` } },

  { id: 's08-025', kind: 'back', back: 's07-010', k: ['d7-c11', 'd3-c1'], lvl: 2,
    title: { en: `Fail-safe again: someone pulls the fire alarm`, ru: `Снова fail-safe: кто-то дёргает пожарную тревогу` },
    body: {
      en: `<p>Stage 7 settled it: doors on escape routes <b>fail-safe</b>. When the fire alarm sounds or power fails, they unlock, because people's lives come first.</p><p>An intruder knows this too. Pull the fire alarm, and the badge-controlled doors on the escape route open, while everyone is busy leaving.</p><p>The answer is not to make those doors fail-secure. It's to cover the gap with other layers: cameras on escape doors, door alarms that log every opening, guards who watch the exits during an evacuation, and a check of sensitive rooms before people return. Safety stays non-negotiable; security adapts around it.</p>`,
      ru: `<p>Этап 7 это решил: двери на путях эвакуации — <b>fail-safe</b>. Когда звучит пожарная тревога или пропадает питание, они отпираются, потому что жизнь людей важнее.</p><p>Нарушитель тоже это знает. Дёрнул пожарную тревогу — и двери с пропусками на пути эвакуации открылись, пока все заняты выходом.</p><p>Ответ не в том, чтобы сделать эти двери fail-secure. Нужно закрыть брешь другими слоями: камеры на эвакуационных дверях, сигнализация, записывающая каждое открытие, охрана, наблюдающая за выходами во время эвакуации, и проверка важных помещений до возвращения людей. Безопасность людей не обсуждается; защита подстраивается под неё.</p>`,
    },
    take: { en: `Never trade people's safety for security; cover the gap with other layers.`, ru: `Никогда не жертвуйте безопасностью людей ради защиты; закройте брешь другими слоями.` } },

  { id: 's08-026', kind: 'idea', k: ['d3-c12'], lvl: 1,
    title: { en: `Power problems have names`, ru: `У проблем с питанием есть названия` },
    body: {
      en: `<p>The exam names power problems in short and long pairs:</p><ul><li>No power: <b>fault</b> (momentary) and <b>blackout</b> (prolonged).</li><li>Too little: <b>sag</b> (momentary) and <b>brownout</b> (prolonged).</li><li>Too much: <b>spike</b> (momentary) and <b>surge</b> (prolonged).</li></ul><p>Add <b>inrush</b>, the jump in demand when equipment switches on, which is why you don't power on a whole room at once, and <b>noise</b>: electromagnetic interference (EMI) and radio-frequency interference (RFI) that disturb the signal.</p><p>Memory trick: the short word in each pair is the short event.</p>`,
      ru: `<p>Экзамен называет проблемы с питанием парами «кратко — долго»:</p><ul><li>Нет питания: <b>fault</b> (кратковременно) и <b>blackout</b> (длительно).</li><li>Слишком мало: <b>sag</b> (кратковременно) и <b>brownout</b> (длительно).</li><li>Слишком много: <b>spike</b> (кратковременно) и <b>surge</b> (длительно).</li></ul><p>Плюс <b>inrush</b> — бросок потребления при включении оборудования, поэтому весь зал сразу не включают, и <b>помехи</b>: электромагнитные (EMI) и радиочастотные (RFI), искажающие сигнал.</p><p>Подсказка: в каждой паре короткое слово означает кратковременное событие.</p>`,
    },
    take: { en: `Fault/blackout, sag/brownout, spike/surge: momentary, then prolonged.`, ru: `Fault/blackout, sag/brownout, spike/surge: кратко, затем долго.` } },

  { id: 's08-027', kind: 'picture', k: ['d3-c12'], lvl: 2,
    title: { en: `The power path to a server`, ru: `Путь питания до сервера` },
    body: {
      en: `<p>Power reaches a server through a chain. The <b>utility grid</b> comes in, ideally on two feeds. An <b>automatic transfer switch</b> (ATS) moves the load to the <b>generator</b> when the grid fails. The <b>UPS</b> batteries carry the load for the seconds to minutes the generator needs to start. Then <b>PDUs</b> feed servers that have two power supplies each.</p>`,
      ru: `<p>Питание доходит до сервера по цепочке. Приходит <b>городская сеть</b>, в идеале двумя вводами. <b>Автоматический ввод резерва</b> (АВР) переключает нагрузку на <b>генератор</b>, когда сеть пропадает. Батареи <b>ИБП</b> держат нагрузку те секунды или минуты, пока генератор запускается. Дальше <b>PDU</b> питают серверы, у каждого из которых два блока питания.</p>`,
    },
    dg: { title: { en: `Grid, generator, UPS, rack`, ru: `Сеть, генератор, ИБП, стойка` }, h: 280,
      nodes: [
        ['g', 110, 80, { en: 'Utility grid', ru: 'Городская сеть' }, { en: 'two feeds if possible', ru: 'лучше два ввода' }, '⚡', 'dim'],
        ['n', 110, 210, { en: 'Generator', ru: 'Генератор' }, { en: 'runs for hours on fuel', ru: 'работает часами на топливе' }, '⛽', 'ok'],
        ['a', 310, 145, { en: 'ATS', ru: 'АВР' }, { en: 'automatic transfer switch', ru: 'автоматический ввод резерва' }, '🔀', 'key'],
        ['u', 500, 145, { en: 'UPS', ru: 'ИБП' }, { en: 'bridges the seconds', ru: 'закрывает секунды' }, '🔋', 'key'],
        ['r', 670, 145, { en: 'Racks', ru: 'Стойки' }, { en: 'two power supplies', ru: 'два блока питания' }, '🗄', 'ok'],
      ],
      edges: [['g', 'a', { en: 'mains', ru: 'сеть' }, 'ok'], ['n', 'a', { en: 'backup', ru: 'резерв' }, 'dash'], ['a', 'u', '', 'ok'], ['u', 'r', '', 'ok']],
      note: { en: `Test the generator under load and keep fuel contracts: Sandy showed the chain fails at its weakest link.`, ru: `Проверяйте генератор под нагрузкой и держите договоры на топливо: «Сэнди» показал, что цепь рвётся в самом слабом звене.` } },
    take: { en: `UPS for seconds to minutes, generator for hours, ATS to switch between them.`, ru: `ИБП — на секунды и минуты, генератор — на часы, АВР переключает между ними.` } },

  { id: 's08-028', kind: 'vs', k: ['d3-c12'], lvl: 2,
    title: { en: `UPS vs generator vs surge protector vs conditioner`, ru: `ИБП, генератор, сетевой фильтр и стабилизатор` },
    body: {
      en: `<ul><li><b>UPS</b> (uninterruptible power supply): batteries for short outages and a clean shutdown. An <b>online</b> (double-conversion) UPS always runs the load from its batteries, so there's no switch-over gap; a <b>standby</b> UPS switches only when power drops.</li><li><b>Generator</b>: long outages, hours or days, as long as fuel lasts. Takes time to start, so it needs a UPS in front.</li><li><b>Surge protector</b>: clips spikes and surges.</li><li><b>Power conditioner</b>: smooths sags, spikes and noise into clean power.</li></ul><p>Match the tool to the problem: the duration of the outage and the quality of the power.</p>`,
      ru: `<ul><li><b>ИБП</b> (источник бесперебойного питания): батареи на короткие отключения и корректное выключение. <b>Онлайн-ИБП</b> (двойное преобразование) всегда питает нагрузку через себя, поэтому паузы при переключении нет; <b>резервный</b> ИБП переключается, только когда питание пропало.</li><li><b>Генератор</b>: долгие отключения, часы или дни, пока есть топливо. Запускается не сразу, поэтому перед ним нужен ИБП.</li><li><b>Сетевой фильтр</b>: срезает скачки и перенапряжение.</li><li><b>Стабилизатор (кондиционер питания)</b>: сглаживает просадки, скачки и помехи в чистое питание.</li></ul><p>Подбирайте средство к проблеме: длительности отключения и качеству питания.</p>`,
    },
    take: { en: `UPS for short gaps, generator for long ones, conditioners for dirty power.`, ru: `ИБП — для коротких пропаданий, генератор — для долгих, стабилизатор — для грязного питания.` } },

  { id: 's08-029', kind: 'think', k: ['d3-c12', 'd1-c7'], lvl: 2,
    title: { en: `The generator nobody started`, ru: `Генератор, который никто не запускал` },
    body: {
      en: `<p>During a review you find: the data centre has a UPS rated for 15 minutes and a diesel generator. The generator's logbook shows it was last started three years ago, for five minutes, with no load connected. Nobody knows how much fuel is in the tank or who would deliver more.</p><p>What do you recommend?</p>`,
      ru: `<p>Во время проверки вы выясняете: у дата-центра есть ИБП на 15 минут и дизельный генератор. По журналу генератор последний раз запускали три года назад на пять минут, без нагрузки. Никто не знает, сколько топлива в баке и кто привезёт ещё.</p><p>Что вы порекомендуете?</p>`,
    },
    reveal: {
      en: `<p>Treat it as a control that <b>hasn't been shown to work</b>. Recommend: regular test runs <b>under real load</b>, including a transfer through the ATS, on a schedule (monthly is common); fuel checks and fuel kept fresh; a contract for priority fuel delivery during a regional disaster; and maintenance records.</p><p>Then connect it to continuity planning: the business impact analysis says how long the site must run on its own power, and that number sets the fuel needed. A backup that has never been tested is a hope, not a control.</p>`,
      ru: `<p>Считайте это мерой, <b>работа которой не доказана</b>. Рекомендации: регулярные запуски <b>под реальной нагрузкой</b>, с переключением через АВР, по графику (обычно ежемесячно); проверка топлива и его свежести; договор о приоритетной доставке топлива во время региональной катастрофы; журнал обслуживания.</p><p>Затем свяжите это с планированием непрерывности: анализ воздействия на бизнес говорит, сколько площадка должна работать на собственном питании, и эта цифра задаёт запас топлива. Резерв, который никогда не проверяли, — надежда, а не мера.</p>`,
    },
    take: { en: `An untested generator is a hope; test under load and secure the fuel.`, ru: `Непроверенный генератор — надежда; проверяйте под нагрузкой и обеспечьте топливо.` } },

  { id: 's08-030', kind: 'idea', k: ['d3-c12'], lvl: 1,
    title: { en: `Cooling and humidity`, ru: `Охлаждение и влажность` },
    body: {
      en: `<p>Servers turn almost all their power into heat. Without cooling, a full server room overheats in minutes.</p><ul><li><b>Temperature</b>: ASHRAE recommends roughly 18–27 °C (64–81 °F) at the server air intakes.</li><li><b>Humidity</b>: the classic exam range is 40–60%. Too dry causes <b>static electricity</b>; too humid causes <b>condensation and corrosion</b>.</li><li><b>Hot and cold aisles</b>: racks face each other so cold air goes in the front and hot air leaves the back, without mixing.</li><li>Water sensors under the raised floor, and redundant cooling units, because one failed unit shouldn't stop the room.</li></ul>`,
      ru: `<p>Серверы превращают почти всю потребляемую энергию в тепло. Без охлаждения заполненная серверная перегревается за минуты.</p><ul><li><b>Температура</b>: ASHRAE рекомендует примерно 18–27 °C на входе воздуха в серверы.</li><li><b>Влажность</b>: классический экзаменационный диапазон — 40–60%. Слишком сухо — <b>статическое электричество</b>; слишком влажно — <b>конденсат и коррозия</b>.</li><li><b>Горячие и холодные коридоры</b>: стойки стоят так, что холодный воздух входит спереди, а горячий выходит сзади, не смешиваясь.</li><li>Датчики воды под фальшполом и резервные кондиционеры, потому что отказ одного не должен останавливать зал.</li></ul>`,
    },
    take: { en: `About 18–27 °C, 40–60% humidity, hot and cold aisles, redundant cooling.`, ru: `Около 18–27 °C, влажность 40–60%, горячие и холодные коридоры, резервное охлаждение.` } },

  { id: 's08-031', kind: 'link', k: ['d3-c12', 'd1-c7', 'd2-c4'], lvl: 2,
    title: { en: `OVHcloud again: why the backups burned too`, ru: `Снова OVHcloud: почему сгорели и копии` },
    body: {
      en: `<p>Back to Strasbourg. Customers who kept backups on a server in another building on the same campus felt safe: different building, different hardware. Then one fire took the whole site.</p><p>The chain: a facility risk (fire) → a design choice (backups near production) → a lost asset (data) → a business problem (some customers couldn't restore at all). A backup has to survive the same disaster as the original, which means <b>a different site</b>, far enough away not to share the same flood, fire or power grid. Stage 12 returns to this in full.</p>`,
      ru: `<p>Вернёмся в Страсбург. Клиенты, державшие резервные копии на сервере в другом здании той же площадки, чувствовали себя в безопасности: другое здание, другое железо. А потом один пожар забрал всю площадку.</p><p>Цепочка: риск объекта (пожар) → проектное решение (копии рядом с рабочей системой) → потерянный актив (данные) → проблема бизнеса (часть клиентов не смогла восстановиться вообще). Резервная копия должна пережить ту же катастрофу, что и оригинал, а значит, нужна <b>другая площадка</b>, достаточно далёкая, чтобы не делить с ней наводнение, пожар или энергосеть. Этап 12 вернётся к этому подробно.</p>`,
    },
    dg: { title: { en: `Same campus vs another region`, ru: `Та же площадка или другой регион` }, h: 260,
      zones: [[20, 30, 440, 210, { en: 'One campus: one fire', ru: 'Одна площадка: один пожар' }, 'untrust'], [490, 30, 250, 210, { en: 'Another region', ru: 'Другой регион' }, 'trust']],
      nodes: [
        ['s', 130, 180, { en: 'Server', ru: 'Сервер' }, { en: 'building 2', ru: 'здание 2' }, '🖥', 'bad'],
        ['b', 340, 95, { en: 'Backup', ru: 'Копия' }, { en: 'building 1', ru: 'здание 1' }, '💾', 'bad'],
        ['o', 615, 140, { en: 'Backup copy', ru: 'Ещё копия' }, { en: 'far away', ru: 'далеко' }, '💾', 'ok'],
      ],
      edges: [['s', 'b', { en: 'nightly', ru: 'еженощно' }, 'bad'], ['s', 'o', { en: 'nightly', ru: 'еженощно' }, 'ok']],
      note: { en: `A copy in the next building protects against a failed server, not against a lost site.`, ru: `Копия в соседнем здании защищает от отказа сервера, но не от потери площадки.` } },
    take: { en: `A backup must not share the disaster: keep a copy at another site.`, ru: `Копия не должна разделять катастрофу: держите экземпляр на другой площадке.` } },

  { id: 's08-032', kind: 'idea', k: ['d7-c9'], lvl: 1,
    title: { en: `RAID: surviving a dead disk`, ru: `RAID: пережить смерть диска` },
    body: {
      en: `<p>Hard drives and SSDs wear out; in a room with thousands of them, one fails every few days. <b>RAID</b> (redundant array of independent disks) combines several disks so the system keeps running when one dies.</p><p>Three techniques:</p><ul><li><b>Striping</b>: split data across disks for speed. No protection on its own.</li><li><b>Mirroring</b>: write the same data to two disks.</li><li><b>Parity</b>: store extra calculated data that lets you rebuild a lost disk from the others.</li></ul><p>RAID protects <b>availability</b> against hardware failure. It isn't a backup, and the next cards show why.</p>`,
      ru: `<p>Жёсткие диски и SSD изнашиваются; в зале, где их тысячи, какой-то отказывает каждые несколько дней. <b>RAID</b> (избыточный массив независимых дисков) объединяет несколько дисков так, чтобы система продолжала работать, когда один умирает.</p><p>Три приёма:</p><ul><li><b>Чередование (striping)</b>: данные делятся между дисками ради скорости. Само по себе не защищает.</li><li><b>Зеркалирование</b>: одни и те же данные пишутся на два диска.</li><li><b>Чётность (parity)</b>: хранятся дополнительные вычисленные данные, по которым потерянный диск восстанавливают из остальных.</li></ul><p>RAID защищает <b>доступность</b> от отказа оборудования. Это не резервная копия, и следующие карточки покажут почему.</p>`,
    },
    take: { en: `RAID uses striping, mirroring and parity to survive a disk failure.`, ru: `RAID использует чередование, зеркалирование и чётность, чтобы пережить отказ диска.` } },

  { id: 's08-033', kind: 'vs', k: ['d7-c9'], lvl: 2,
    title: { en: `RAID 0 vs 1 vs 5 vs 6 vs 10`, ru: `RAID 0, 1, 5, 6 и 10` },
    body: {
      en: `<ul><li><b>RAID 0</b>: striping only. Fast, at least 2 disks, <b>no fault tolerance</b>: one disk fails, everything is lost.</li><li><b>RAID 1</b>: mirroring. 2 disks, survives 1 failure, half the space is the copy.</li><li><b>RAID 5</b>: striping with distributed parity. At least 3 disks, survives <b>1</b> failure.</li><li><b>RAID 6</b>: double parity. At least 4 disks, survives <b>2</b> failures, useful with big disks that take days to rebuild.</li><li><b>RAID 10</b> (1+0): mirrored pairs, striped. At least 4 disks, fast, survives one failure per pair.</li></ul><p>Trap: RAID 0 has a number but no redundancy.</p>`,
      ru: `<ul><li><b>RAID 0</b>: только чередование. Быстро, минимум 2 диска, <b>нет отказоустойчивости</b>: отказал один диск — потеряно всё.</li><li><b>RAID 1</b>: зеркало. 2 диска, переживает 1 отказ, половина места уходит на копию.</li><li><b>RAID 5</b>: чередование с распределённой чётностью. Минимум 3 диска, переживает <b>1</b> отказ.</li><li><b>RAID 6</b>: двойная чётность. Минимум 4 диска, переживает <b>2</b> отказа, полезен с большими дисками, которые восстанавливаются днями.</li><li><b>RAID 10</b> (1+0): зеркальные пары с чередованием. Минимум 4 диска, быстро, переживает по одному отказу в каждой паре.</li></ul><p>Ловушка: у RAID 0 есть номер, но нет избыточности.</p>`,
    },
    take: { en: `0 none, 1 mirror, 5 one-disk parity, 6 two-disk parity, 10 mirrored stripes.`, ru: `0 — нет защиты, 1 — зеркало, 5 — чётность на один диск, 6 — на два, 10 — зеркала с чередованием.` } },

  { id: 's08-034', kind: 'picture', k: ['d7-c9'], lvl: 2,
    title: { en: `Mirror vs parity, drawn`, ru: `Зеркало и чётность в картинке` },
    body: {
      en: `<p>In <b>RAID 1</b>, each disk holds a full copy, so you lose half the capacity. In <b>RAID 5</b>, data blocks and a parity block (P) are spread across all disks; any one missing block can be calculated from the rest. You lose only one disk's worth of capacity, but rebuilding a failed disk is slow and stresses the others.</p>`,
      ru: `<p>В <b>RAID 1</b> каждый диск хранит полную копию, поэтому теряется половина объёма. В <b>RAID 5</b> блоки данных и блок чётности (P) распределены по всем дискам; любой один недостающий блок вычисляется из остальных. Теряется объём лишь одного диска, но восстановление отказавшего диска идёт долго и нагружает остальные.</p>`,
    },
    dg: { title: { en: `RAID 1 and RAID 5`, ru: `RAID 1 и RAID 5` }, h: 250,
      zones: [[20, 30, 340, 200, { en: 'RAID 1: mirror', ru: 'RAID 1: зеркало' }, 'trust'], [390, 30, 350, 200, { en: 'RAID 5: distributed parity', ru: 'RAID 5: распределённая чётность' }, 'trust']],
      nodes: [
        ['m1', 100, 140, { en: 'Disk 1', ru: 'Диск 1' }, { en: 'A B C', ru: 'A B C' }, '💽', 'ok'],
        ['m2', 280, 140, { en: 'Disk 2', ru: 'Диск 2' }, { en: 'A B C', ru: 'A B C' }, '💽', 'ok'],
        ['p1', 455, 140, { en: 'Disk 1', ru: 'Диск 1' }, { en: 'A1 B1 P3', ru: 'A1 B1 P3' }, '💽', 'ok'],
        ['p2', 565, 140, { en: 'Disk 2', ru: 'Диск 2' }, { en: 'A2 P2 C1', ru: 'A2 P2 C1' }, '💽', 'ok'],
        ['p3', 675, 140, { en: 'Disk 3', ru: 'Диск 3' }, { en: 'P1 B2 C2', ru: 'P1 B2 C2' }, '💽', 'ok'],
      ],
      edges: [['m1', 'm2', { en: 'copy', ru: 'копия' }, 'both']],
      note: { en: `Both survive one dead disk. Neither survives deletion, ransomware or a fire.`, ru: `Оба переживают один умерший диск. Ни один не переживёт удаление, шифровальщика или пожар.` } },
    take: { en: `Mirror copies everything; parity rebuilds the missing piece.`, ru: `Зеркало копирует всё; чётность восстанавливает недостающее.` } },

  { id: 's08-035', kind: 'think', k: ['d7-c9', 'd1-c1'], lvl: 2,
    title: { en: `"We have RAID 6, so no backups"`, ru: `«У нас RAID 6, бэкапы не нужны»` },
    body: {
      en: `<p>A department runs its file server on a RAID 6 array of eight disks. To save on storage costs, the team lead proposes cancelling the nightly backup: "RAID 6 survives two disk failures at once. We're covered."</p><p>What's wrong with this argument?</p>`,
      ru: `<p>Отдел держит файловый сервер на массиве RAID 6 из восьми дисков. Чтобы сэкономить на хранилище, руководитель команды предлагает отменить ночной бэкап: «RAID 6 переживает отказ двух дисков сразу. Мы защищены».</p><p>Что не так с этим доводом?</p>`,
    },
    reveal: {
      en: `<p>RAID protects against <b>one kind</b> of failure: a disk dying. It copies everything instantly, including mistakes. Delete a folder, and it's deleted on every disk. Ransomware encrypts files, and RAID faithfully keeps the encrypted versions. A controller fault, a fire or a theft takes the whole array.</p><p>A backup is a separate copy, from an earlier point in time, ideally offline or at another site, that you can restore from. RAID is for <b>availability</b>; backups are for <b>recovery</b>. You need both.</p>`,
      ru: `<p>RAID защищает от <b>одного вида</b> отказа: смерти диска. Он мгновенно копирует всё, включая ошибки. Удалили папку — она удалена на всех дисках. Шифровальщик шифрует файлы — RAID добросовестно хранит зашифрованные версии. Отказ контроллера, пожар или кража забирают весь массив.</p><p>Резервная копия — отдельный экземпляр на более ранний момент времени, в идеале офлайн или на другой площадке, из которого можно восстановиться. RAID — для <b>доступности</b>, бэкапы — для <b>восстановления</b>. Нужно и то, и другое.</p>`,
    },
    take: { en: `RAID is not a backup: it copies deletions and ransomware too.`, ru: `RAID — не бэкап: он копирует и удаления, и шифровальщика.` } },

  { id: 's08-036', kind: 'idea', k: ['d7-c9', 'd3-c12'], lvl: 2,
    title: { en: `Redundancy everywhere, not just in disks`, ru: `Избыточность везде, а не только в дисках` },
    body: {
      en: `<p>RAID is one example of a broader habit: find every <b>single point of failure</b> and double it.</p><ul><li>Servers with <b>two power supplies</b>, each on a different power circuit.</li><li><b>N+1</b> cooling and UPS units: one more than you need, so one can fail or be serviced. <b>2N</b> means a full second set.</li><li><b>Clustering</b> and failover: if one server dies, another takes over.</li><li>Two network links from different providers.</li></ul><p>Each layer of redundancy costs money, so the business impact analysis decides how far to go: a payment system needs more than an internal wiki.</p>`,
      ru: `<p>RAID — один пример более общей привычки: найти каждую <b>единую точку отказа</b> и удвоить её.</p><ul><li>Серверы с <b>двумя блоками питания</b>, каждый на своей линии.</li><li>Кондиционеры и ИБП по схеме <b>N+1</b>: на один больше, чем нужно, чтобы один мог отказать или уйти на обслуживание. <b>2N</b> — полный второй комплект.</li><li><b>Кластеры</b> и переключение при отказе: умер один сервер — работу берёт другой.</li><li>Два сетевых канала от разных провайдеров.</li></ul><p>Каждый слой избыточности стоит денег, поэтому, как далеко идти, решает анализ воздействия на бизнес: платёжной системе нужно больше, чем внутренней вики.</p>`,
    },
    take: { en: `Find single points of failure and double them, as far as the BIA justifies.`, ru: `Найдите единые точки отказа и удвойте их — насколько оправдывает BIA.` } },

  { id: 's08-037', kind: 'back', back: 's01-006', k: ['d1-c1', 'd7-c9'], lvl: 1,
    title: { en: `Availability again: from the disk to the building`, ru: `Снова доступность: от диска до здания` },
    body: {
      en: `<p>Stage 1 defined <b>availability</b> as "there when you need it". This stage shows how many physical things it rests on:</p><ul><li>a disk: RAID;</li><li>a server: two power supplies, clustering;</li><li>a room: cooling, fire detection and suppression;</li><li>a building: UPS, generator, fuel, two power feeds;</li><li>a site: its location, and a second site far away.</li></ul><p>Each level protects against a bigger failure, and each one is useless if the level above it is gone. OVHcloud had redundancy inside the building; the building itself was the single point of failure.</p>`,
      ru: `<p>Этап 1 определил <b>доступность</b> как «есть, когда нужно». Этот этап показывает, на скольких физических вещах она держится:</p><ul><li>диск: RAID;</li><li>сервер: два блока питания, кластер;</li><li>помещение: охлаждение, обнаружение и тушение пожара;</li><li>здание: ИБП, генератор, топливо, два ввода питания;</li><li>площадка: её расположение и вторая площадка далеко.</li></ul><p>Каждый уровень защищает от более крупного отказа, и каждый бесполезен, если пропал уровень выше. У OVHcloud была избыточность внутри здания; единой точкой отказа стало само здание.</p>`,
    },
    take: { en: `Availability is layered: disk, server, room, building, site.`, ru: `Доступность многоуровнева: диск, сервер, помещение, здание, площадка.` } },

  { id: 's08-038', kind: 'idea', k: ['d7-c11'], lvl: 1,
    title: { en: `People first: getting everyone out`, ru: `Сначала люди: вывести всех` },
    body: {
      en: `<p>Every physical plan starts and ends with people's safety. In practice that means an <b>occupant emergency plan</b>:</p><ul><li>marked <b>evacuation routes</b> and exits that are never blocked or locked from inside;</li><li><b>fire wardens</b> per floor who sweep the area and help people who need it;</li><li>a <b>meeting point</b> outside, and a headcount, so you know if anyone is missing;</li><li>regular <b>drills</b>, so people move without thinking;</li><li>first aid kits, defibrillators and trained first aiders.</li></ul><p>Equipment, data and evidence can be replaced or recovered. People can't.</p>`,
      ru: `<p>Любой физический план начинается и заканчивается безопасностью людей. На практике это <b>план действий персонала при ЧС</b>:</p><ul><li>обозначенные <b>пути эвакуации</b> и выходы, которые никогда не загромождены и не заперты изнутри;</li><li><b>ответственные за эвакуацию</b> на каждом этаже, которые обходят этаж и помогают тем, кому нужно;</li><li><b>место сбора</b> снаружи и перекличка, чтобы знать, не пропал ли кто-то;</li><li>регулярные <b>учения</b>, чтобы люди действовали не задумываясь;</li><li>аптечки, дефибрилляторы и обученные сотрудники.</li></ul><p>Оборудование, данные и доказательства можно заменить или восстановить. Людей — нет.</p>`,
    },
    take: { en: `Routes, wardens, a meeting point, a headcount and drills.`, ru: `Пути эвакуации, ответственные, место сбора, перекличка и учения.` } },

  { id: 's08-039', kind: 'idea', k: ['d7-c11'], lvl: 2,
    title: { en: `Duress: when someone has a gun to your back`, ru: `Принуждение: когда вам угрожают` },
    body: {
      en: `<p>Sometimes the attacker doesn't sneak in; they force an employee to let them in. Controls for <b>duress</b>:</p><ul><li><b>Duress code or password</b>: a special PIN or phrase that seems to work normally but silently alerts security. A guard forced to open a door enters the duress PIN instead of the normal one.</li><li><b>Duress or panic alarms</b>: hidden buttons at reception, in cash rooms, at guard posts.</li><li><b>Training</b>: comply, don't resist, stay calm, remember details.</li></ul><p>The design assumes the employee's life matters more than what's behind the door, which is exactly the exam's priority.</p>`,
      ru: `<p>Иногда нарушитель не крадётся, а заставляет сотрудника впустить его. Меры против <b>принуждения</b>:</p><ul><li><b>Код или пароль принуждения</b>: особый PIN или фраза, которые вроде бы срабатывают как обычно, но скрытно поднимают тревогу. Охранник, которого заставляют открыть дверь, вводит PIN принуждения вместо обычного.</li><li><b>Тревожные кнопки</b>: скрытые кнопки на ресепшене, в кассах, на постах охраны.</li><li><b>Обучение</b>: подчиниться, не сопротивляться, сохранять спокойствие, запоминать детали.</li></ul><p>Такой проект исходит из того, что жизнь сотрудника важнее того, что за дверью, и это ровно приоритет экзамена.</p>`,
    },
    take: { en: `Duress codes and panic alarms signal silently; the employee complies.`, ru: `Коды принуждения и тревожные кнопки сигналят скрытно; сотрудник подчиняется.` } },

  { id: 's08-040', kind: 'back', back: 's03-034', k: ['d2-c5', 'd3-c11'], lvl: 2,
    title: { en: `Destruction again: it happens in a room`, ru: `Снова уничтожение: оно происходит в помещении` },
    body: {
      en: `<p>Stage 3 sorted sanitization into <b>clear, purge and destroy</b>. Physically, destruction needs a place and a process:</p><ul><li>Failed disks pulled from RAID arrays go into a <b>locked bin</b>, not a cardboard box by the door.</li><li>Shredders, crushers or degaussers sit in a controlled room, or a vetted vendor comes <b>on site</b> and destroys media while your staff watch.</li><li>Every disk is tracked by serial number from removal to a <b>certificate of destruction</b>.</li></ul><p>A data centre replaces disks every week. Without that chain, the RAID that protected availability becomes a stream of readable disks walking out of the building.</p>`,
      ru: `<p>Этап 3 разделил очистку носителей на <b>clear, purge и destroy</b>. Физически уничтожению нужны место и процесс:</p><ul><li>Отказавшие диски из RAID-массивов попадают в <b>запертый контейнер</b>, а не в коробку у двери.</li><li>Шредеры, прессы или размагничиватели стоят в контролируемом помещении, или проверенный подрядчик приезжает <b>на место</b> и уничтожает носители при ваших сотрудниках.</li><li>Каждый диск отслеживается по серийному номеру от извлечения до <b>акта об уничтожении</b>.</li></ul><p>Дата-центр меняет диски каждую неделю. Без этой цепочки RAID, защищавший доступность, превращается в поток читаемых дисков, уходящих из здания.</p>`,
    },
    take: { en: `Failed disks go to a locked bin, witnessed destruction and a certificate.`, ru: `Отказавшие диски — в запертый контейнер, уничтожение при свидетелях и акт.` } },

  { id: 's08-041', kind: 'think', k: ['d7-c11', 'd2-c3'], lvl: 2,
    title: { en: `A trip to a high-risk country`, ru: `Поездка в страну повышенного риска` },
    body: {
      en: `<p>A sales director is flying to a country known for state-sponsored espionage, for a week of meetings with a potential partner. They plan to take their usual laptop, with all customer contracts on it, and their work phone.</p><p>What would you advise?</p>`,
      ru: `<p>Коммерческий директор летит в страну, известную государственным шпионажем, на неделю переговоров с потенциальным партнёром. Он собирается взять свой обычный ноутбук со всеми договорами клиентов и рабочий телефон.</p><p>Что бы вы посоветовали?</p>`,
    },
    reveal: {
      en: `<p>Take a <b>loaner laptop and phone</b> with only what the trip needs: no customer archive, no saved passwords. Use full-disk encryption and the company VPN; avoid hotel and public Wi-Fi where possible. Expect devices may be inspected or copied at the border, and don't leave them in the hotel room.</p><p>Report a lost or seized device immediately. On return, <b>wipe or reimage</b> the loaner rather than plugging it back into the network. And brief the traveller before departure, including on their personal safety: no data is worth resisting officials or a robbery.</p>`,
      ru: `<p>Взять <b>временные ноутбук и телефон</b> только с тем, что нужно в поездке: без архива клиентов и сохранённых паролей. Полнодисковое шифрование и корпоративный VPN; по возможности избегать гостиничного и публичного Wi-Fi. Исходить из того, что на границе устройства могут осмотреть или скопировать, и не оставлять их в номере.</p><p>О потере или изъятии устройства сообщать немедленно. По возвращении <b>стереть или переустановить</b> временное устройство, а не подключать его обратно к сети. И проинструктировать сотрудника до поездки, включая его личную безопасность: никакие данные не стоят сопротивления властям или грабителю.</p>`,
    },
    take: { en: `Travel light: a loaner device, minimal data, wiped on return; safety first.`, ru: `Путешествуйте налегке: временное устройство, минимум данных, очистка по возвращении; безопасность прежде всего.` } },

  { id: 's08-042', kind: 'back', back: 's07-036', k: ['d3-c5', 'd4-c8'], lvl: 2,
    title: { en: `Industrial systems again: the building is one`, ru: `Снова промышленные системы: здание — тоже такая` },
    body: {
      en: `<p>In stage 7, industrial control systems ran grids and factories. Your own building runs on the same kind of technology: a <b>building management system</b> controls cooling, lighting, lifts and power, and the badge system controls doors. All of them are computers on a network.</p><p>Remember Target in 2013: the attackers got in with credentials stolen from an HVAC contractor. Treat building systems like OT: their own network segment, no direct internet access, vendor remote access through a controlled path, and an inventory. Someone who can turn off the cooling can take down a data centre without touching a server.</p>`,
      ru: `<p>В этапе 7 промышленные системы управляли энергосетями и заводами. Ваше собственное здание работает на той же технологии: <b>система управления зданием</b> (BMS) управляет охлаждением, светом, лифтами и питанием, а система пропусков — дверями. Всё это компьютеры в сети.</p><p>Вспомните Target в 2013 году: атакующие вошли с учётными данными, украденными у подрядчика по вентиляции и кондиционированию. Обращайтесь с системами здания как с OT: отдельный сегмент сети, без прямого выхода в интернет, удалённый доступ подрядчиков через контролируемый путь, инвентаризация. Тот, кто может выключить охлаждение, может положить дата-центр, не прикасаясь к серверам.</p>`,
    },
    take: { en: `Building systems are OT: segment them, inventory them, control vendor access.`, ru: `Системы здания — это OT: сегментируйте, инвентаризируйте, контролируйте доступ подрядчиков.` } },

  { id: 's08-043', kind: 'back', back: 's05-051', k: ['d4-c7', 'd5-c8'], lvl: 2,
    title: { en: `Wireless again: badges and signals leave the building`, ru: `Снова беспроводное: пропуска и сигналы выходят за стены` },
    body: {
      en: `<p>Stage 5 warned that short range is still real risk. Two physical twists:</p><ul><li><b>Badge cloning</b>: many older 125 kHz proximity cards send a fixed number with no cryptography. A reader hidden in a bag can copy one in a queue or a lift. Modern smart cards use challenge-response, so a copy is much harder.</li><li><b>Signals cross walls</b>: Wi-Fi reaches the car park. Place access points toward the middle of the building, tune their power, and use strong Wi-Fi authentication so being outside isn't enough to get in.</li></ul><p>A wall is a physical boundary, not a radio one.</p>`,
      ru: `<p>Этап 5 предупреждал: малая дальность — всё равно реальный риск. Два физических поворота:</p><ul><li><b>Клонирование пропусков</b>: многие старые proximity-карты на 125 кГц передают постоянный номер без всякой криптографии. Считыватель, спрятанный в сумке, копирует такую карту в очереди или лифте. Современные смарт-карты используют запрос-ответ, и скопировать их гораздо труднее.</li><li><b>Сигналы проходят сквозь стены</b>: Wi-Fi достаёт до парковки. Ставьте точки доступа ближе к центру здания, настраивайте мощность и используйте сильную аутентификацию Wi-Fi, чтобы одного нахождения снаружи было мало.</li></ul><p>Стена — физическая граница, но не радиограница.</p>`,
    },
    take: { en: `Old proximity badges clone easily; radio ignores walls.`, ru: `Старые proximity-пропуска легко клонируются; радио не замечает стен.` } },

  { id: 's08-044', kind: 'idea', k: ['d3-c11', 'd3-c10'], lvl: 3,
    title: { en: `Emanations: what equipment leaks`, ru: `Побочные излучения: что «утекает» из техники` },
    body: {
      en: `<p>Electronic equipment gives off electromagnetic signals as it works. With the right antenna nearby, some of them can be turned back into what was on a screen or a cable. This is the physical form of the side channels from stage 6. Government programmes study it under the name <b>TEMPEST</b>.</p><p>Countermeasures:</p><ul><li><b>Shielding</b> of equipment and cables, up to a <b>Faraday cage</b> around a whole room;</li><li><b>White noise</b>: broadcasting random signals that drown out the real ones;</li><li><b>Control zones</b>: enough distance that the signal fades before it reaches anyone outside.</li></ul><p>For most companies this is overkill; for military and intelligence sites it's standard.</p>`,
      ru: `<p>Электронное оборудование во время работы излучает электромагнитные сигналы. С подходящей антенной поблизости часть из них можно превратить обратно в то, что было на экране или в кабеле. Это физическая форма побочных каналов из этапа 6. Государственные программы изучают это под названием <b>TEMPEST</b>.</p><p>Меры:</p><ul><li><b>Экранирование</b> оборудования и кабелей, вплоть до <b>клетки Фарадея</b> вокруг всего помещения;</li><li><b>Белый шум</b>: случайные сигналы, заглушающие настоящие;</li><li><b>Контролируемые зоны</b>: достаточное расстояние, чтобы сигнал затухал раньше, чем дойдёт до посторонних.</li></ul><p>Для большинства компаний это избыточно; для военных и разведывательных объектов — стандарт.</p>`,
    },
    take: { en: `TEMPEST: shielding, Faraday cages, white noise, control zones.`, ru: `TEMPEST: экранирование, клетки Фарадея, белый шум, контролируемые зоны.` } },

  { id: 's08-045', kind: 'think', k: ['d7-c11', 'd5-c8'], lvl: 2,
    title: { en: `The fire alarm during a contractor visit`, ru: `Пожарная тревога во время визита подрядчика` },
    body: {
      en: `<p>You're escorting a contractor who is replacing a cooling unit in the server room. The fire alarm goes off. You can't see smoke. The contractor's tools and an open cabinet are next to the racks, and the escape door from the room will unlock when the alarm sounds.</p><p>Do you stay to keep the room secure until the alarm turns out to be false?</p>`,
      ru: `<p>Вы сопровождаете подрядчика, который меняет кондиционер в серверной. Срабатывает пожарная тревога. Дыма не видно. Инструменты подрядчика и открытый шкаф стоят рядом со стойками, а эвакуационная дверь из помещения при тревоге отопрётся.</p><p>Останетесь ли вы охранять помещение, пока не выяснится, что тревога ложная?</p>`,
    },
    reveal: {
      en: `<p><b>No. You leave, and you take the contractor with you.</b> You're responsible for your visitor's safety too, and they don't know the exits. Every alarm is treated as real until the fire service or wardens say otherwise. Report at the meeting point, so the headcount includes the contractor.</p><p>The room's security doesn't depend on you standing in it: cameras, door logs and the alarm on the escape door keep recording. Before work resumes, check the room and the cabinet. The open door is a risk to manage afterwards; a person trapped in a fire can't be undone.</p>`,
      ru: `<p><b>Нет. Вы уходите и уводите подрядчика с собой.</b> Вы отвечаете и за безопасность своего посетителя, а он не знает выходов. Любая тревога считается настоящей, пока пожарные или ответственные не скажут иначе. Отметьтесь на месте сбора, чтобы перекличка учла и подрядчика.</p><p>Защита помещения не зависит от того, стоите ли вы в нём: камеры, журналы дверей и сигнализация на эвакуационной двери продолжают запись. Перед возобновлением работ проверьте помещение и шкаф. Открытая дверь — риск, с которым разберутся потом; человека, оставшегося в огне, не вернуть.</p>`,
    },
    take: { en: `Evacuate yourself and your visitor; let the other layers guard the room.`, ru: `Эвакуируйтесь сами и выведите посетителя; помещение пусть охраняют другие слои.` } },

  { id: 's08-046', kind: 'link', k: ['d3-c11', 'd3-c12', 'd7-c9', 'd7-c11'], lvl: 2,
    title: { en: `OVHcloud, replayed with this stage's controls`, ru: `OVHcloud, переигранный с мерами этого этапа` },
    body: {
      en: `<p>Run the Strasbourg fire again, with everything from this stage:</p><ol><li><b>Power</b>: electrical equipment is inspected, and failures are isolated so one fault doesn't spread.</li><li><b>Detection</b>: early smoke detection raises the alarm while the fire is small.</li><li><b>Suppression</b>: gas or pre-action sprinklers act automatically, room by room.</li><li><b>People</b>: staff evacuate on a practised plan, and the fire service has a way to cut power fast.</li><li><b>Redundancy</b>: RAID and dual power keep servers running through small failures.</li><li><b>Another site</b>: backups in another region make even a lost building recoverable.</li></ol><p>No single layer is enough; together they turn a catastrophe into a bad week.</p>`,
      ru: `<p>Переиграем пожар в Страсбурге со всем, что есть в этом этапе:</p><ol><li><b>Питание</b>: электрооборудование проверяют, а отказы изолируют, чтобы одна неисправность не распространялась.</li><li><b>Обнаружение</b>: раннее обнаружение дыма поднимает тревогу, пока пожар мал.</li><li><b>Тушение</b>: газ или спринклеры pre-action срабатывают автоматически, по помещениям.</li><li><b>Люди</b>: сотрудники эвакуируются по отработанному плану, а у пожарных есть способ быстро отключить питание.</li><li><b>Избыточность</b>: RAID и двойное питание держат серверы при мелких отказах.</li><li><b>Другая площадка</b>: копии в другом регионе позволяют восстановиться даже после потери здания.</li></ol><p>Одного слоя мало; вместе они превращают катастрофу в тяжёлую неделю.</p>`,
    },
    take: { en: `Power, detection, suppression, people, redundancy, another site: all layers together.`, ru: `Питание, обнаружение, тушение, люди, избыточность, другая площадка — все слои вместе.` } },

  { id: 's08-047', kind: 'recap', lvl: 1,
    title: { en: `Stage 8 in seven lines`, ru: `Этап 8 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s08-003', { en: `Choose the site for its risks, neighbours, emergency services and utilities.`, ru: `Площадку выбирают по рискам, соседям, экстренным службам и коммуникациям.` }],
      ['s08-010', { en: `Deter, delay, detect, respond; the delay must outlast the response.`, ru: `Отпугнуть, задержать, обнаружить, отреагировать; задержка дольше реакции.` }],
      ['s08-013', { en: `A mantrap: two doors, never open together, one person at a time.`, ru: `Шлюз: две двери, никогда не открыты вместе, по одному человеку.` }],
      ['s08-021', { en: `Data centres use pre-action sprinklers, often behind a gas system.`, ru: `Дата-центры используют pre-action, часто как резерв газового тушения.` }],
      ['s08-026', { en: `Fault/blackout, sag/brownout, spike/surge: momentary, then prolonged.`, ru: `Fault/blackout, sag/brownout, spike/surge: кратко, затем долго.` }],
      ['s08-035', { en: `RAID keeps you running through a dead disk; it is not a backup.`, ru: `RAID держит систему при умершем диске, но это не бэкап.` }],
      ['s08-038', { en: `People first: evacuation routes, wardens, a headcount, drills.`, ru: `Сначала люди: пути эвакуации, ответственные, перекличка, учения.` }],
    ],
    take: { en: `Next: watching and testing, how you know the controls actually work.`, ru: `Дальше: наблюдение и проверка — как узнать, что меры действительно работают.` } },
] });
