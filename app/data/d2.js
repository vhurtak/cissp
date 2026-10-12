'use strict';
CISSP.domain({
  id: 2, weight: 10,
  title: { en: 'Asset Security', ru: 'Безопасность активов' },
  summary: {
    en: 'Identifying and classifying information and assets, ownership roles, handling, the data lifecycle, retention, and selecting data security controls (DLP, encryption, sanitization).',
    ru: 'Идентификация и классификация информации и активов, роли владения, обращение, жизненный цикл данных, хранение и выбор мер защиты данных (DLP, шифрование, санитизация).',
  },
  objectives: [
    ['2.1', 'Identify and classify information and assets'],
    ['2.2', 'Establish information and asset handling requirements'],
    ['2.3', 'Provision information and assets securely'],
    ['2.4', 'Manage data lifecycle'],
    ['2.5', 'Ensure appropriate asset retention (e.g., End of Life (EOL), End of Support (EOS))'],
    ['2.6', 'Determine data security controls and compliance requirements'],
  ],
  concepts: [
    {
      t: { en: 'Classification and labeling', ru: 'Классификация и маркировка' },
      b: {
        en: `<p>You can't protect what you don't know you have. Start with an <b>asset inventory</b>, assign an <b>owner</b>, then <b>classify</b> by value, sensitivity, criticality and legal requirements. Classification determines the security controls.</p>
<ul><li><b>Government / military</b>: Top Secret (exceptionally grave damage), Secret (serious damage), Confidential (damage), Unclassified. Also CUI (Controlled Unclassified Information).</li>
<li><b>Commercial</b> (typical): Confidential/Proprietary → Private → Sensitive → Public.</li></ul>
<p><b>Marking/labeling</b>: physical labels and metadata so handling is clear, including unclassified items (to avoid confusion). <b>Declassification</b> lowers the level when sensitivity drops; a media sanitization decision must follow the <i>original</i> classification. The <b>data owner</b> decides the classification, not IT.</p>`,
        ru: `<p>Нельзя защитить то, о чём не знаешь. Сначала <b>инвентаризация</b>, назначение <b>владельца</b>, затем <b>классификация</b> по ценности, чувствительности, критичности и правовым требованиям. Классификация определяет меры защиты.</p>
<ul><li><b>Гос/военная</b>: Top Secret (исключительно тяжкий ущерб), Secret (серьёзный), Confidential (ущерб), Unclassified; также CUI.</li>
<li><b>Коммерческая</b> (типично): Confidential/Proprietary → Private → Sensitive → Public.</li></ul>
<p><b>Маркировка</b> — физические метки и метаданные, чтобы порядок обращения был ясен; маркируют и несекретное, чтобы избежать путаницы. <b>Рассекречивание</b> — понижение уровня при снижении чувствительности; решения по санитизации носителей принимаются по <i>исходному</i> уровню. Классифицирует <b>владелец данных</b>, а не ИТ.</p>`,
      },
      w: ['layers', { title: { en: 'Government classification levels', ru: 'Гос. уровни классификации' }, items: [
        { n: 'TS', t: 'Top Secret', d: { en: 'Unauthorized disclosure could cause <b>exceptionally grave</b> damage to national security.', ru: 'Раскрытие может причинить <b>исключительно тяжкий</b> ущерб.' } },
        { n: 'S', t: 'Secret', d: { en: '<b>Serious</b> damage.', ru: '<b>Серьёзный</b> ущерб.' } },
        { n: 'C', t: 'Confidential', d: { en: '<b>Damage</b>.', ru: '<b>Ущерб</b>.' } },
        { n: 'U', t: 'Unclassified', d: { en: 'No damage to national security. May still be CUI or FOUO, needing protection from public release.', ru: 'Без ущерба нацбезопасности; может быть CUI/FOUO с ограничением публикации.' } },
      ] }],
    },
    {
      t: { en: 'Data roles', ru: 'Роли в отношении данных' },
      b: { en: '<p>Know who decides, who implements and who uses. On the exam, the <b>owner</b> is accountable and the <b>custodian</b> does the hands-on work.</p>', ru: '<p>Кто решает, кто реализует, кто использует. На экзамене <b>владелец</b> подотчётен, <b>хранитель</b> выполняет практическую работу.</p>' },
      w: ['compare', { title: { en: 'Roles', ru: 'Роли' }, cols: ['Role', 'Responsibility'], rows: [
        ['Data owner', 'Senior/business person accountable for the data. Classifies it, approves access, defines protection requirements.'],
        ['Data controller', '(GDPR) decides purposes and means of processing personal data.'],
        ['Data processor', 'Processes data on behalf of the controller (e.g. a cloud or payroll provider).'],
        ['Data custodian', 'Implements the controls day to day: backups, patching, access configuration (usually IT).'],
        ['Data steward', 'Ensures data quality, metadata and business usage meet governance rules.'],
        ['System owner', 'Responsible for the system that processes data; ensures controls are in place on it.'],
        ['Administrator', 'Grants access according to the owner\'s decisions.'],
        ['User', 'Accesses data per policy; must follow handling rules.'],
        ['Data subject', 'The person the personal data is about.'],
      ] }],
    },
    {
      t: { en: 'Data states and protections', ru: 'Состояния данных и защита' },
      b: { en: '<p>Protect data in all three states. Data <b>in use</b> is the hardest to protect.</p>', ru: '<p>Защищать нужно все три состояния; данные <b>в использовании</b> защитить сложнее всего.</p>' },
      w: ['compare', { title: { en: 'Three states of data', ru: 'Три состояния данных' }, cols: ['State', 'Where', 'Key protections'], rows: [
        ['At rest', 'Disks, databases, backups, USB', 'Full-disk / database / file encryption (AES), access control, physical security'],
        ['In transit (motion)', 'Networks', 'TLS, IPsec VPN, SSH. Link encryption (each hop) vs end-to-end encryption'],
        ['In use', 'Memory, CPU', 'Access control, secure enclaves / confidential computing (TEE), homomorphic encryption, memory protection'],
      ] }],
    },
    {
      t: { en: 'Data lifecycle', ru: 'Жизненный цикл данных' },
      b: { en: '<p>Security must be applied at every phase. Classification happens at creation and is revisited over time.</p>', ru: '<p>Защита нужна на каждом этапе. Классификация — при создании, затем пересматривается.</p>' },
      w: ['flow', { title: { en: 'Data lifecycle', ru: 'Жизненный цикл' }, steps: [
        { t: 'Create / Collect', d: { en: 'Classify at creation. Collect only what you need (data minimization, collection limitation).', ru: 'Классифицировать при создании; собирать только необходимое (минимизация).' } },
        { t: 'Store', d: { en: 'Encrypt at rest, control access, back up per the RPO.', ru: 'Шифрование, контроль доступа, бэкапы по RPO.' } },
        { t: 'Use', d: { en: 'Least privilege, DLP, monitoring, masking in non-production.', ru: 'Минимальные привилегии, DLP, мониторинг, маскирование в тестовых средах.' } },
        { t: 'Share', d: { en: 'Encrypt in transit, DRM/IRM, contractual controls with recipients.', ru: 'Шифрование при передаче, DRM/IRM, договорные меры.' } },
        { t: 'Archive', d: { en: 'Retain per legal and business requirements and keep it readable (format and hardware obsolescence).', ru: 'Хранение по требованиям закона и бизнеса; сохранять читаемость (устаревание форматов).' } },
        { t: 'Destroy', d: { en: 'Sanitize according to classification (clear, purge, destroy). Verify and document.', ru: 'Санитизация по классификации (clear/purge/destroy), проверка и документирование.' } },
      ] }],
    },
    {
      t: { en: 'Data remanence and media sanitization', ru: 'Остаточные данные и санитизация носителей' },
      b: {
        en: `<p><b>Data remanence</b> is data that remains after deletion. Deleting a file or a quick format only removes pointers. SSDs complicate wiping because of wear leveling and spare blocks, so overwriting is unreliable. Use the built-in secure erase, cryptographic erase, or physical destruction.</p>
<p>The <b>degaussing</b> strong magnetic field erases magnetic media (HDD, tape) but has <b>no effect on SSDs/flash or optical media</b>, and often makes HDDs unusable.</p>
<p><b>Crypto-shredding / cryptographic erase</b>: encrypt the data and then destroy the keys. This is especially useful in the cloud, where you can't physically destroy the provider's disks.</p>`,
        ru: `<p><b>Остаточные данные</b> сохраняются после удаления: удаление файла или быстрое форматирование убирает только указатели. На SSD перезапись ненадёжна из-за wear leveling и резервных блоков: используйте встроенное secure erase, криптографическое стирание или уничтожение.</p>
<p><b>Размагничивание</b> стирает магнитные носители (HDD, ленты), но <b>не действует на SSD/flash и оптику</b> и часто выводит HDD из строя.</p>
<p><b>Crypto-shredding</b>: данные зашифрованы, ключи уничтожаются. Особенно полезно в облаке, где нельзя физически уничтожить диски провайдера.</p>`,
      },
      w: ['compare', { title: 'NIST SP 800-88 sanitization', cols: ['Method', 'Protects against', 'Examples', 'Media reusable?'], rows: [
        ['Clear', 'Simple, non-invasive recovery (keyboard attacks, standard tools)', 'Overwrite with standard read/write commands, factory reset', 'Yes'],
        ['Purge', 'State-of-the-art laboratory recovery', 'Degaussing, block erase / secure erase, cryptographic erase', 'Usually (except degaussed HDD)'],
        ['Destroy', 'Everything, i.e. recovery is infeasible', 'Shredding, disintegration, incineration, pulverizing, melting', 'No'],
      ], note: { en: 'Choose the method by classification and whether the media will leave your control. For the most sensitive data on SSDs, physical destruction is the safest answer.', ru: 'Метод выбирают по классификации и по тому, покинет ли носитель ваш контроль. Для самых чувствительных данных на SSD — физическое уничтожение.' } }],
    },
    {
      t: { en: 'Data security controls: scoping, tailoring and protection techniques', ru: 'Меры защиты данных: scoping, tailoring и техники' },
      b: {
        en: `<ul><li><b>Baseline</b>: a starting set of controls (e.g. NIST 800-53 low/moderate/high, CIS Benchmarks).</li>
<li><b>Scoping</b>: deciding which baseline controls apply (removing those that don't). <b>Tailoring</b>: modifying controls to fit the mission (parameters, compensating controls).</li>
<li><b>DLP</b>: network DLP (inspects traffic), endpoint DLP (USB, printing, copy and paste), and discovery (scans storage for sensitive data). DLP depends on classification and labels.</li>
<li><b>DRM / IRM</b>: persistent protection that travels with the file (view, print and forward restrictions, expiry).</li>
<li><b>CASB</b>: visibility and control between users and cloud services (shadow IT discovery, DLP, access policies).</li>
<li><b>Pseudonymization</b>: identifiers are replaced but re-identification is possible with extra info (still personal data under GDPR). <b>Anonymization</b>: irreversible, so it is no longer personal data. <b>Tokenization</b>: replaces a value (e.g. a PAN) with a random token, with the mapping held in a secure vault. <b>Data masking</b>: hides parts of data (e.g. ****1234) for display or test environments.</li></ul>`,
        ru: `<ul><li><b>Базовый набор</b> — стартовый набор мер (NIST 800-53 low/moderate/high, CIS Benchmarks).</li>
<li><b>Scoping</b> — какие меры базового набора применимы (лишние убираем). <b>Tailoring</b> — адаптация мер под миссию (параметры, компенсирующие меры).</li>
<li><b>DLP</b>: сетевой (трафик), на конечных точках (USB, печать, буфер обмена), discovery (поиск чувствительных данных в хранилищах). Зависит от классификации и меток.</li>
<li><b>DRM / IRM</b> — защита, которая «путешествует» с файлом (запрет печати и пересылки, срок действия).</li>
<li><b>CASB</b> — видимость и контроль между пользователями и облаками (теневые ИТ, DLP, политики доступа).</li>
<li><b>Псевдонимизация</b> — идентификаторы заменены, но восстановимы с доп. информацией (по GDPR это всё ещё ПДн). <b>Анонимизация</b> — необратима, ПДн больше нет. <b>Токенизация</b> — значение (например, номер карты) заменяется случайным токеном, соответствие хранится в защищённом хранилище. <b>Маскирование</b> — частичное скрытие (****1234) для отображения и тестовых сред.</li></ul>`,
      },
    },
    {
      t: { en: 'Retention, EOL/EOS and secure provisioning', ru: 'Хранение, EOL/EOS и безопасное предоставление' },
      b: {
        en: `<ul><li><b>Retention policy</b>: keep data as long as legally and business required, <b>and no longer</b>. Over-retention increases breach impact and e-discovery cost. Legal hold overrides normal destruction schedules.</li>
<li><b>EOL</b> (End of Life): the vendor stops selling the product. <b>EOS</b> (End of Support): no more patches, which means increased risk. Plan replacement, isolate the system, or use compensating controls.</li>
<li><b>Secure provisioning</b>: maintain the asset inventory (hardware, software and licensing), assign ownership, use approved and hardened configurations, and track assets through to disposal.</li>
<li><b>Data sovereignty / residency</b>: data is subject to the laws of the country where it is stored.</li></ul>`,
        ru: `<ul><li><b>Политика хранения</b>: хранить столько, сколько требует закон и бизнес, <b>и не дольше</b>. Лишнее хранение увеличивает ущерб от утечки и стоимость e-discovery. Legal hold (юридическое удержание) отменяет обычное уничтожение.</li>
<li><b>EOL</b> — производитель прекратил продажи; <b>EOS</b> — нет патчей, риск растёт. План замены, изоляция или компенсирующие меры.</li>
<li><b>Безопасное предоставление</b>: инвентаризация (оборудование, ПО, лицензии), владельцы, утверждённые защищённые конфигурации, учёт до утилизации.</li>
<li><b>Суверенитет / резидентность данных</b>: на данные распространяются законы страны хранения.</li></ul>`,
      },
    },
  ],
  terms: [
    ['Data owner', 'Person accountable for data: classifies it and approves access.', 'Владелец данных: подотчётен, классифицирует и одобряет доступ.'],
    ['Data custodian', 'Implements and maintains protections specified by the owner (often IT).', 'Хранитель: реализует и поддерживает меры, заданные владельцем (обычно ИТ).'],
    ['Data steward', 'Responsible for data quality and governance-aligned business use.', 'Распорядитель: качество данных и их использование по правилам.'],
    ['Data remanence', 'Residual data remaining on media after deletion or formatting.', 'Остаточные данные на носителе после удаления/форматирования.'],
    ['Clear (800-88)', 'Sanitization protecting against simple non-invasive recovery; e.g. overwrite.', 'Очистка: защита от простого восстановления; например, перезапись.'],
    ['Purge (800-88)', 'Sanitization protecting against laboratory recovery; e.g. degauss, crypto erase.', 'Удаление: защита от лабораторного восстановления; размагничивание, крипто-стирание.'],
    ['Destroy (800-88)', 'Renders media unusable and recovery infeasible: shred, incinerate, disintegrate.', 'Уничтожение: носитель непригоден, восстановление невозможно.'],
    ['Degaussing', 'Erasing magnetic media with a strong magnetic field; ineffective on SSD and optical media.', 'Размагничивание; не действует на SSD и оптику.'],
    ['Crypto-shredding', 'Destroying encryption keys so encrypted data becomes unrecoverable.', 'Уничтожение ключей, делающее зашифрованные данные невосстановимыми.'],
    ['Scoping', 'Selecting which baseline controls apply to a system.', 'Отбор применимых мер из базового набора.'],
    ['Tailoring', 'Modifying baseline controls to fit the organization\'s mission and environment.', 'Адаптация мер базового набора под организацию.'],
    ['DLP', 'Data Loss Prevention: detects/blocks sensitive data leaving via network, endpoint, or cloud.', 'Предотвращение утечек: обнаружение/блокировка вывода чувствительных данных.'],
    ['DRM / IRM', 'Digital/Information Rights Management: persistent usage controls attached to content.', 'Управление цифровыми правами: постоянный контроль использования контента.'],
    ['CASB', 'Cloud Access Security Broker: enforces security policy between users and cloud services.', 'Посредник безопасности доступа к облакам.'],
    ['Tokenization', 'Replacing sensitive values with non-sensitive tokens mapped in a secure vault.', 'Замена чувствительных значений токенами с хранением соответствия в защищённом хранилище.'],
    ['Pseudonymization', 'Replacing identifiers so data can only be re-identified with additional, separately held info.', 'Замена идентификаторов; повторная идентификация возможна только с доп. данными.'],
    ['Anonymization', 'Irreversibly removing identifiers so individuals cannot be re-identified.', 'Необратимое удаление идентификаторов.'],
    ['Data masking', 'Obscuring parts of data (e.g. ****1234), often for test or display.', 'Частичное скрытие данных (****1234), часто для тестов/отображения.'],
    ['EOL / EOS', 'End of Life (no longer sold) / End of Support (no more patches).', 'Конец продаж / конец поддержки (нет патчей).'],
    ['Legal hold', 'Requirement to preserve relevant data for litigation, overriding normal retention/destruction.', 'Требование сохранить данные для суда вопреки обычным срокам уничтожения.'],
    ['CUI', 'Controlled Unclassified Information: unclassified US government info needing safeguarding.', 'Контролируемая несекретная информация (США).'],
    ['Data sovereignty', 'Data is subject to the laws of the country in which it is located.', 'На данные распространяются законы страны их нахождения.'],
  ],
  questions: [
    { o: '2.1', d: 1, q: 'Who should determine the classification level of a set of business data?', a: ['The data owner', 'The data custodian', 'The security administrator', 'The end users'], c: 0,
      e: 'The owner (a business manager) is accountable for the data and decides its classification and who can access it.',
      r: 'Владелец (бизнес-руководитель) подотчётен за данные и определяет их классификацию и доступ.' },
    { o: '2.1', d: 1, q: 'What is the FIRST step in an asset security program?', a: ['Identify and inventory assets', 'Encrypt all sensitive data', 'Deploy DLP', 'Write a destruction policy'], c: 0,
      e: 'You cannot classify or protect assets you don\'t know about. Inventory comes first, then ownership and classification.',
      r: 'Нельзя классифицировать и защитить то, о чём не знаешь. Сначала инвентаризация, затем владельцы и классификация.' },
    { o: '2.1', d: 2, q: 'In the US government classification scheme, unauthorized disclosure of which level could cause "serious damage" to national security?', a: ['Secret', 'Top Secret', 'Confidential', 'Unclassified'], c: 0,
      e: 'Top Secret: exceptionally grave damage. Secret: serious damage. Confidential: damage.',
      r: 'Top Secret — исключительно тяжкий ущерб, Secret — серьёзный, Confidential — ущерб.' },
    { o: '2.1', d: 2, q: 'What is the PRIMARY purpose of data classification?', a: ['To determine the appropriate level of protection based on value and sensitivity', 'To reduce storage costs', 'To decide which backup technology to use', 'To satisfy auditors'], c: 0,
      e: 'Classification drives the protection requirements and lets you spend on controls in proportion to value and sensitivity.',
      r: 'Классификация определяет требования к защите, чтобы тратить на меры пропорционально ценности и чувствительности.' },
    { o: '2.2', d: 2, q: 'Why should media containing public, unclassified information still be labeled?', a: ['To prevent confusion and ensure unlabeled media isn\'t mistakenly assumed safe', 'Because labeling is required by GDPR', 'To make the media easier to degauss', 'Labels are not needed for unclassified media'], c: 0,
      e: 'Consistent labeling of all media avoids errors. Unlabeled media should be treated as sensitive until classified.',
      r: 'Единообразная маркировка всех носителей исключает ошибки; немаркированный носитель следует считать чувствительным до классификации.' },
    { o: '2.6', d: 1, q: 'Which sanitization method is INEFFECTIVE for solid-state drives?', a: ['Degaussing', 'Physical shredding', 'Cryptographic erase', 'Manufacturer secure erase command'], c: 0,
      e: 'SSDs store data in flash cells, not magnetically, so degaussing has no effect on the data.',
      r: 'SSD хранят данные во flash-ячейках, а не магнитно, поэтому размагничивание бесполезно.' },
    { o: '2.6', d: 2, q: 'An organization is decommissioning SSDs that stored top-secret data. Which method provides the HIGHEST assurance?', a: ['Physical destruction (shredding/disintegration)', 'Overwriting with zeros three times', 'Degaussing', 'Quick format'], c: 0,
      e: 'Because of wear leveling and spare areas, overwriting is unreliable on SSDs, and degaussing doesn\'t work. For the most sensitive data, destroy the media.',
      r: 'Из-за wear leveling перезапись SSD ненадёжна, размагничивание не работает. Для самых чувствительных данных — уничтожение.' },
    { o: '2.6', d: 2, q: 'According to NIST SP 800-88, which category does degaussing a hard disk fall into?', a: ['Purge', 'Clear', 'Destroy', 'Erasure'], c: 0,
      e: 'Degaussing is a purge technique: it protects against laboratory recovery.',
      r: 'Размагничивание относится к Purge: защищает от лабораторного восстановления.' },
    { o: '2.4', d: 2, q: 'A company uses an IaaS provider and wants to ensure its data is unrecoverable when a storage volume is deleted. What is the MOST practical approach?', a: ['Cryptographic erasure (destroying the encryption keys)', 'Physically shredding the provider\'s disks', 'Degaussing the volumes', 'Overwriting the volume with random data seven times'], c: 0,
      e: 'Customers can\'t physically access cloud media. Encrypting data with customer-controlled keys and destroying the keys renders it unreadable.',
      r: 'Клиент не имеет физического доступа к носителям в облаке. Шифрование своими ключами и их уничтожение делает данные нечитаемыми.' },
    { o: '2.6', d: 2, q: 'An organization starts from the NIST SP 800-53 moderate baseline and removes controls that do not apply to its systems. This is:', a: ['Scoping', 'Tailoring', 'Benchmarking', 'Hardening'], c: 0,
      e: 'Scoping selects the controls that apply. Tailoring modifies the selected controls (e.g. their parameters) to fit the environment.',
      r: 'Scoping — отбор применимых мер; tailoring — адаптация выбранных мер (например, параметров) под среду.' },
    { o: '2.6', d: 2, q: 'Which technology restricts printing, forwarding and copying of a document even after it has been emailed outside the organization?', a: ['Digital/Information Rights Management (DRM/IRM)', 'Network DLP', 'Full-disk encryption', 'TLS'], c: 0,
      e: 'DRM/IRM attaches persistent usage policies to the content itself. DLP and TLS no longer protect the data once it has left.',
      r: 'DRM/IRM прикрепляет политики использования к самому контенту; DLP и TLS не защищают данные после их выхода.' },
    { o: '2.6', d: 2, q: 'A DLP solution is failing to detect sensitive documents leaving the network. What is the MOST likely underlying problem?', a: ['Data has not been properly classified and labeled', 'The firewall is misconfigured', 'Users have not completed awareness training', 'The IDS signatures are out of date'], c: 0,
      e: 'DLP relies on knowing what is sensitive, through classification, labels and patterns. Without classification, DLP can\'t work effectively.',
      r: 'DLP опирается на знание, что чувствительно (классификация, метки, шаблоны). Без классификации он неэффективен.' },
    { o: '2.6', d: 3, q: 'A retailer replaces stored credit card numbers with random values and keeps the mapping in a hardened vault, reducing PCI DSS scope. This is:', a: ['Tokenization', 'Hashing', 'Data masking', 'Anonymization'], c: 0,
      e: 'Tokenization substitutes a random token and keeps a reversible mapping in a vault, which removes most systems from PCI scope.',
      r: 'Токенизация: случайный токен с обратимым соответствием в хранилище; выводит большинство систем из-под PCI.' },
    { o: '2.6', d: 3, q: 'Under GDPR, how is pseudonymized data treated?', a: ['It is still personal data because re-identification is possible with additional information', 'It is anonymous data and outside GDPR scope', 'It is classified as special category data', 'It no longer requires a lawful basis for processing'], c: 0,
      e: 'Pseudonymization reduces risk but is reversible, so GDPR still applies. Only truly anonymized data falls outside GDPR.',
      r: 'Псевдонимизация снижает риск, но обратима, поэтому GDPR применяется. Вне GDPR только действительно анонимизированные данные.' },
    { o: '2.6', d: 1, q: 'Which state of data is the MOST difficult to protect with encryption?', a: ['Data in use', 'Data at rest', 'Data in transit', 'Archived data'], c: 0,
      e: 'Data must normally be decrypted in memory to be processed. Confidential computing and homomorphic encryption address this but are specialized.',
      r: 'Для обработки данные обычно расшифровываются в памяти. Конфиденциальные вычисления и гомоморфное шифрование решают это, но специфичны.' },
    { o: '2.5', d: 2, q: 'Which is the BEST reason to destroy data at the end of its retention period?', a: ['To reduce liability and the impact of a potential breach or legal discovery', 'To free up storage space', 'To improve system performance', 'Because all data must be destroyed after one year'], c: 0,
      e: 'Data kept longer than necessary increases legal exposure (e-discovery) and breach impact. Storage savings are a side benefit.',
      r: 'Лишнее хранение увеличивает юридические риски (e-discovery) и ущерб от утечки; экономия места — побочный эффект.' },
    { o: '2.5', d: 2, q: 'A company receives notice of pending litigation. What should happen to the relevant records scheduled for destruction next week?', a: ['Place them under legal hold and preserve them', 'Destroy them per the retention policy', 'Move them to an offsite archive and then destroy them', 'Anonymize them before destruction'], c: 0,
      e: 'A legal hold suspends normal destruction. Destroying relevant evidence could be spoliation and carry legal penalties.',
      r: 'Legal hold приостанавливает уничтожение; уничтожение релевантных доказательств — нарушение с юридическими санкциями.' },
    { o: '2.5', d: 2, q: 'A critical legacy system has reached End of Support. Replacement will take a year. What is the BEST interim action?', a: ['Isolate the system and apply compensating controls while planning replacement', 'Continue operating it as-is', 'Immediately shut it down', 'Remove it from the asset inventory'], c: 0,
      e: 'An EOS system gets no patches. Reduce exposure through segmentation, strict access and monitoring until it can be replaced.',
      r: 'EOS-система не получает патчей: снижайте риск (сегментация, строгий доступ, мониторинг) до замены.' },
    { o: '2.1', d: 2, q: 'Who performs routine backups and implements access controls specified by the data owner?', a: ['Data custodian', 'Data steward', 'Data subject', 'Data controller'], c: 0,
      e: 'The custodian implements the owner\'s protection requirements day to day.',
      r: 'Хранитель ежедневно реализует требования владельца к защите.' },
    { o: '2.6', d: 2, q: 'A developer needs realistic data for testing a new application. Which is the BEST approach?', a: ['Use masked or synthetic data instead of production data', 'Copy the production database to the test environment', 'Give the developer read-only access to production', 'Encrypt the production copy with the developer\'s key'], c: 0,
      e: 'Production data in test environments is a common source of leaks. Masking or synthetic data keeps realism without the exposure.',
      r: 'Продуктивные данные в тестовой среде — частый источник утечек. Маскированные/синтетические данные сохраняют реализм без риска.' },
    { o: '2.6', d: 2, q: 'Which control BEST helps discover unsanctioned cloud applications (shadow IT) in use by employees?', a: ['Cloud Access Security Broker (CASB)', 'Full-disk encryption', 'Host-based firewall', 'Hardware security module'], c: 0,
      e: 'A CASB provides visibility into cloud usage and enforces policies, including shadow IT discovery.',
      r: 'CASB даёт видимость использования облаков и применяет политики, включая обнаружение теневых ИТ.' },
    { o: '2.3', d: 2, q: 'Which practice BEST supports secure provisioning of new laptops to employees?', a: ['Deploying from an approved, hardened baseline image and recording the asset in inventory', 'Letting users install the OS of their choice', 'Shipping laptops with default vendor configuration', 'Assigning laptops without tracking serial numbers'], c: 0,
      e: 'Secure provisioning means a known-good, hardened configuration plus asset tracking and ownership.',
      r: 'Безопасное предоставление — проверенная защищённая конфигурация, учёт и назначение владельца.' },
    { o: '2.4', d: 3, q: 'Data originally classified Secret was later declassified to Unclassified. The hard drives that stored it are being disposed of. What should drive the sanitization method?', a: ['The highest classification the media ever held', 'The current Unclassified status', 'The cost of the drives', 'The user\'s preference'], c: 0,
      e: 'Media is sanitized based on the most sensitive data it ever contained, since remnants of the higher classification may still exist.',
      r: 'Санитизация — по самому высокому уровню, который когда-либо хранился: могли остаться следы.' },
    { t: 'order', o: '2.4', d: 1, q: 'Arrange the phases of the data lifecycle in order.', items: ['Create', 'Store', 'Use', 'Share', 'Archive', 'Destroy'],
      e: 'Create → Store → Use → Share → Archive → Destroy (the CSA lifecycle).', r: 'Создание → хранение → использование → обмен → архив → уничтожение.' },
    { t: 'match', o: '2.6', d: 2, q: 'Match the NIST SP 800-88 category to its example.', pairs: [['Clear', 'Overwrite using standard write commands'], ['Purge', 'Cryptographic erase or degaussing'], ['Destroy', 'Shredding or incineration']],
      e: 'Clear defeats simple recovery, purge defeats lab recovery, and destroy makes the media unusable.', r: 'Clear — от простого восстановления, Purge — от лабораторного, Destroy — носитель непригоден.' },
  ],
});
