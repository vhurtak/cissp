'use strict';
// Learning path, stage 6: secrets and proof. Symmetric and asymmetric crypto, modes, hybrid crypto inside TLS,
// hashing, signatures, password storage, PKI and trust (DigiNotar), Heartbleed, attacks, TPM/HSM, key management.
CISSP.stage(6, { cards: [
  { id: 's06-001', kind: 'story', k: ['d3-c10', 'd3-c6'], lvl: 1,
    title: { en: `Enigma: a strong machine, broken by habits`, ru: `Enigma: сильная машина, которую сломали привычки` },
    body: {
      en: `<p>In the Second World War, the German military encrypted its radio traffic with the <b>Enigma</b> machine. With its daily settings, it had more possible keys than anyone could ever try by hand.</p><p>Polish mathematicians broke an early version in the 1930s, and the team at <b>Bletchley Park</b> kept breaking it through the war. The math helped, but people helped more: operators sent the same phrases every day, such as weather reports, and picked lazy settings. Each predictable word gave the codebreakers a foothold.</p>`,
      ru: `<p>Во Второй мировой войне немецкие военные шифровали радиосообщения машиной <b>Enigma</b>. С её ежедневными настройками вариантов ключа было больше, чем можно перебрать вручную.</p><p>Польские математики взломали раннюю версию ещё в 1930-х, а команда в <b>Блетчли-парке</b> взламывала её всю войну. Математика помогала, но люди помогали больше: операторы каждый день отправляли одни и те же фразы, например сводки погоды, и выбирали ленивые настройки. Каждое предсказуемое слово давало дешифровщикам зацепку.</p>`,
    },
    take: { en: `Ciphers rarely fall to math alone; they fall to how people use them.`, ru: `Шифры редко падают от одной математики; они падают от того, как ими пользуются.` } },

  { id: 's06-002', kind: 'idea', k: ['d3-c6', 'd3-c7', 'd1-c1'], lvl: 1,
    title: { en: `What cryptography can and can't do`, ru: `Что криптография может, а что нет` },
    body: {
      en: `<p>Cryptography gives you four things:</p><ul><li><b>Confidentiality</b>: only the right people can read it.</li><li><b>Integrity</b>: you can tell if it was changed.</li><li><b>Authenticity</b>: you know who it came from.</li><li><b>Nonrepudiation</b>: the sender can't later deny sending it.</li></ul><p>It doesn't give you <b>availability</b>. Encryption can even hurt it: lose the key, and the data is gone for you too. That's exactly what ransomware relies on.</p>`,
      ru: `<p>Криптография даёт четыре вещи:</p><ul><li><b>Конфиденциальность</b>: прочитать могут только нужные люди.</li><li><b>Целостность</b>: видно, если данные изменили.</li><li><b>Подлинность</b>: известно, от кого они пришли.</li><li><b>Неотказуемость</b>: отправитель не сможет потом отрицать отправку.</li></ul><p><b>Доступности</b> она не даёт. Шифрование может ей даже навредить: потеряли ключ — и данные пропали и для вас. Именно на этом строится вымогательское ПО.</p>`,
    },
    take: { en: `Crypto protects C and I and proves who; it never guarantees A.`, ru: `Криптография защищает C и I и доказывает «кто», но никогда не гарантирует A.` } },

  { id: 's06-003', kind: 'idea', k: ['d3-c6'], lvl: 1,
    title: { en: `Algorithm public, key secret`, ru: `Алгоритм открыт, ключ секретен` },
    body: {
      en: `<p>A few words first. <b>Plaintext</b> is the readable message; <b>ciphertext</b> is the scrambled result. The <b>algorithm</b> (cipher) is the recipe; the <b>key</b> is the secret setting that makes your result different from everyone else's.</p><p>In 1883, Auguste Kerckhoffs wrote the rule that still holds: a system must stay secure even if the enemy knows everything about it except the key. Algorithms are published and attacked in public for years; the ones that survive are trusted. Secrecy belongs in the key, which you can change.</p>`,
      ru: `<p>Сначала несколько слов. <b>Открытый текст</b> — читаемое сообщение, <b>шифртекст</b> — то, что получилось после шифрования. <b>Алгоритм</b> (шифр) — это рецепт, <b>ключ</b> — секретная настройка, из-за которой ваш результат отличается от чужого.</p><p>В 1883 году Огюст Керкгоффс сформулировал правило, которое действует до сих пор: система должна оставаться стойкой, даже если противник знает о ней всё, кроме ключа. Алгоритмы публикуют и годами атакуют открыто, и доверяют тем, что выстояли. Секрет должен быть в ключе, который можно сменить.</p>`,
    },
    take: { en: `Never rely on a secret algorithm; rely on a secret key.`, ru: `Не полагайтесь на секретный алгоритм; полагайтесь на секретный ключ.` } },

  { id: 's06-004', kind: 'vs', k: ['d3-c8', 'd3-c6'], lvl: 1,
    title: { en: `Encoding vs encryption vs hashing`, ru: `Кодирование, шифрование, хеширование` },
    body: {
      en: `<ul><li><b>Encoding</b> (Base64, URL encoding) changes the format so data travels safely. No key; anyone can reverse it. It hides nothing.</li><li><b>Encryption</b> scrambles data with a key. With the right key you get the original back. It protects confidentiality.</li><li><b>Hashing</b> turns any input into a short fixed-length fingerprint. It's one-way: there's no key and no way back. It protects integrity.</li></ul><p>A common audit finding: passwords "encrypted" in Base64. That's encoding, and it's the same as plaintext.</p>`,
      ru: `<ul><li><b>Кодирование</b> (Base64, URL-кодирование) меняет формат, чтобы данные безопасно передавались. Ключа нет, обратить может любой. Оно ничего не скрывает.</li><li><b>Шифрование</b> перемешивает данные с помощью ключа. С нужным ключом получаете оригинал обратно. Оно защищает конфиденциальность.</li><li><b>Хеширование</b> превращает любые данные в короткий отпечаток фиксированной длины. Оно одностороннее: ни ключа, ни пути назад. Оно защищает целостность.</li></ul><p>Частая находка аудита: пароли, «зашифрованные» в Base64. Это кодирование, то есть по сути открытый текст.</p>`,
    },
    take: { en: `Encoding hides nothing, encryption is reversible with a key, hashing is one-way.`, ru: `Кодирование ничего не прячет, шифрование обратимо с ключом, хеширование одностороннее.` } },

  { id: 's06-005', kind: 'idea', k: ['d3-c6'], lvl: 1,
    title: { en: `Symmetric: one key for both sides`, ru: `Симметричное: один ключ на обе стороны` },
    body: {
      en: `<p>In <b>symmetric</b> encryption, the same key locks and unlocks, like a house key you copy for your family. It's fast, so it's used for almost all bulk data: disks, files, network traffic.</p><p>Its weakness is <b>key distribution</b>: how do you get the key to the other side without someone copying it on the way? And since both sides hold the same key, either could have written a message, so symmetric crypto alone can't prove who sent it. No <b>nonrepudiation</b>.</p>`,
      ru: `<p>В <b>симметричном</b> шифровании один и тот же ключ запирает и отпирает, как ключ от дома, копию которого вы дали семье. Оно быстрое, поэтому им шифруют почти все большие объёмы: диски, файлы, сетевой трафик.</p><p>Слабое место — <b>распределение ключей</b>: как передать ключ другой стороне, чтобы его не скопировали по дороге? А раз ключ у обеих сторон одинаковый, сообщение мог написать любой из них, и симметричная криптография сама по себе не доказывает, кто отправил. <b>Неотказуемости</b> нет.</p>`,
    },
    take: { en: `Symmetric is fast but must share its secret, and can't prove who sent what.`, ru: `Симметричное быстрое, но должно делиться секретом и не доказывает, кто что отправил.` } },

  { id: 's06-006', kind: 'think', k: ['d3-c6'], lvl: 2,
    title: { en: `A key for every pair`, ru: `Ключ на каждую пару` },
    body: {
      en: `<p>A company with 100 branch offices wants every branch to talk privately to every other branch, using symmetric encryption with a separate key for each pair.</p><p>How many keys is that? And what's the real problem: the number, or something else?</p>`,
      ru: `<p>У компании 100 филиалов, и каждый должен общаться с каждым конфиденциально, с симметричным шифрованием и отдельным ключом для каждой пары.</p><p>Сколько это ключей? И в чём настоящая проблема: в их числе или в чём-то другом?</p>`,
    },
    reveal: {
      en: `<p><b>4,950 keys</b>: n(n−1)/2 = 100 × 99 / 2. Add a branch and you need 100 more.</p><p>The number is only half of it. Each key has to be delivered securely, stored, rotated and revoked when a branch is compromised. That's the <b>key distribution problem</b>, and it's why asymmetric crypto was invented: with key pairs, 100 branches need only 200 keys (2n), and the public half can be shared openly.</p>`,
      ru: `<p><b>4950 ключей</b>: n(n−1)/2 = 100 × 99 / 2. Добавили филиал — нужно ещё 100.</p><p>Число — только половина проблемы. Каждый ключ нужно безопасно доставить, хранить, менять и отзывать, если филиал скомпрометирован. Это <b>проблема распределения ключей</b>, и ради неё придумали асимметричную криптографию: с парами ключей 100 филиалам нужно всего 200 ключей (2n), а открытую половину можно раздавать свободно.</p>`,
    },
    take: { en: `Symmetric keys grow as n(n−1)/2; asymmetric as 2n.`, ru: `Симметричных ключей нужно n(n−1)/2, асимметричных — 2n.` } },

  { id: 's06-007', kind: 'vs', k: ['d3-c6'], lvl: 1,
    title: { en: `DES vs 3DES vs AES`, ru: `DES, 3DES и AES` },
    body: {
      en: `<ul><li><b>DES</b> (1977): 56-bit key. In 1998 a purpose-built machine found a DES key in days. Broken.</li><li><b>3DES</b>: DES three times, 112 bits of effective strength. A stopgap; now deprecated. (Why not "2DES"? The meet-in-the-middle attack makes double DES barely stronger than single DES.)</li><li><b>AES</b> (2001): chosen in an open competition, 128-bit blocks, 128-, 192- or 256-bit keys. Today's standard, built into most processors.</li></ul><p>Other names you may meet: Blowfish, Twofish, IDEA, RC5/RC6, and Skipjack.</p>`,
      ru: `<ul><li><b>DES</b> (1977): ключ 56 бит. В 1998 году специально построенная машина нашла ключ DES за несколько дней. Взломан.</li><li><b>3DES</b>: DES три раза, эффективная стойкость 112 бит. Временная мера, сейчас выведен из употребления. (Почему не «2DES»? Атака «встреча посередине» делает двойной DES почти не сильнее одинарного.)</li><li><b>AES</b> (2001): выбран на открытом конкурсе, блок 128 бит, ключи 128, 192 или 256 бит. Сегодняшний стандарт, встроен в большинство процессоров.</li></ul><p>Ещё встречаются Blowfish, Twofish, IDEA, RC5/RC6 и Skipjack.</p>`,
    },
    take: { en: `DES is broken, 3DES is retiring, AES is the answer.`, ru: `DES взломан, 3DES уходит, ответ — AES.` } },

  { id: 's06-008', kind: 'idea', k: ['d3-c6', 'd3-c10'], lvl: 2,
    title: { en: `Key length: every bit doubles the work`, ru: `Длина ключа: каждый бит удваивает работу` },
    body: {
      en: `<p>A <b>brute-force</b> attack tries every possible key. Each extra bit doubles the number of keys, so the gap between sizes is enormous. A 56-bit key has about 72 quadrillion options: a lot, but reachable. A 128-bit key has 2<sup>128</sup>: if every computer on Earth tried for billions of years, it still wouldn't finish.</p><p>The effort needed to break a cipher is called its <b>work factor</b>. Good crypto makes the work factor far higher than the value and lifetime of what it protects.</p>`,
      ru: `<p>Атака <b>полным перебором</b> пробует все возможные ключи. Каждый лишний бит удваивает их число, поэтому разница между длинами огромна. У 56-битного ключа около 72 квадриллионов вариантов: много, но достижимо. У 128-битного — 2<sup>128</sup>: если все компьютеры Земли будут перебирать миллиарды лет, они всё равно не закончат.</p><p>Усилия, нужные для взлома шифра, называют <b>трудоёмкостью</b> (work factor). Хорошая криптография делает её намного выше ценности и срока жизни того, что она защищает.</p>`,
    },
    take: { en: `Make breaking the key cost more than the secret is worth, for as long as it matters.`, ru: `Взлом ключа должен стоить дороже секрета — всё время, пока секрет важен.` } },

  { id: 's06-009', kind: 'picture', k: ['d3-c6'], lvl: 2,
    title: { en: `Same key, same block, same output`, ru: `Тот же ключ, тот же блок, тот же результат` },
    body: {
      en: `<p>Block ciphers encrypt 128 bits at a time. In <b>ECB</b> mode each block is encrypted on its own, so identical blocks give identical ciphertext, and patterns show through: an encrypted image is still recognizable. Modern modes mix in a unique number (IV or nonce) so repeats disappear.</p>`,
      ru: `<p>Блочные шифры шифруют по 128 бит за раз. В режиме <b>ECB</b> каждый блок шифруется отдельно, поэтому одинаковые блоки дают одинаковый шифртекст и узоры просвечивают: зашифрованную картинку всё ещё можно узнать. Современные режимы подмешивают уникальное число (IV или nonce), и повторы исчезают.</p>`,
    },
    dg: { title: { en: `ECB vs GCM`, ru: `ECB и GCM` }, h: 300,
      zones: [[20, 20, 720, 120, { en: 'ECB: never use', ru: 'ECB: не использовать' }, 'untrust'], [20, 160, 720, 125, { en: 'GCM: unique nonce, plus an integrity tag', ru: 'GCM: уникальный nonce и метка целостности' }, 'trust']],
      nodes: [
        ['p1', 135, 85, { en: 'Plaintext: A B A', ru: 'Открытый текст: A B A' }, null, null, 'dim', 210],
        ['k1', 385, 85, { en: 'AES, same key', ru: 'AES, тот же ключ' }, null, '🔑', 'key', 190],
        ['c1', 620, 85, { en: 'Ciphertext: X Y X', ru: 'Шифртекст: X Y X' }, { en: 'pattern visible', ru: 'узор виден' }, null, 'bad', 220],
        ['p2', 135, 230, { en: 'Plaintext: A B A', ru: 'Открытый текст: A B A' }, null, null, 'dim', 210],
        ['k2', 385, 230, { en: 'AES-GCM + nonce', ru: 'AES-GCM + nonce' }, null, '🔑', 'key', 190],
        ['c2', 620, 230, { en: 'Ciphertext: Q R Z', ru: 'Шифртекст: Q R Z' }, { en: 'no pattern, tamper-evident', ru: 'без узора, подделка видна' }, null, 'ok', 220],
      ],
      edges: [['p1', 'k1', null, 'bad'], ['k1', 'c1', null, 'bad'], ['p2', 'k2', null, 'ok'], ['k2', 'c2', null, 'ok']] },
    take: { en: `If identical input gives identical output, the ciphertext leaks patterns.`, ru: `Если одинаковый вход даёт одинаковый выход, шифртекст выдаёт узоры.` } },

  { id: 's06-010', kind: 'vs', k: ['d3-c6'], lvl: 2,
    title: { en: `ECB vs CBC vs CTR vs GCM`, ru: `ECB, CBC, CTR и GCM` },
    body: {
      en: `<ul><li><b>ECB</b>: each block alone. Leaks patterns. Never for real data.</li><li><b>CBC</b>: each block is mixed with the previous ciphertext, starting from a random IV. Sequential, and needs a separate integrity check.</li><li><b>CTR</b>: encrypts a counter and mixes it with the data, turning a block cipher into a stream. Fast and parallel; a nonce must never repeat with the same key.</li><li><b>GCM</b>: CTR plus a built-in integrity tag. This is <b>authenticated encryption</b> (AEAD), the default in TLS 1.3.</li></ul><p>CFB and OFB are older stream-like modes.</p>`,
      ru: `<ul><li><b>ECB</b>: каждый блок отдельно. Выдаёт узоры. Никогда для настоящих данных.</li><li><b>CBC</b>: каждый блок смешивается с предыдущим шифртекстом, начиная со случайного IV. Последовательный, и нужна отдельная проверка целостности.</li><li><b>CTR</b>: шифрует счётчик и смешивает его с данными, превращая блочный шифр в поточный. Быстрый и параллельный; nonce с тем же ключом не должен повторяться.</li><li><b>GCM</b>: CTR плюс встроенная метка целостности. Это <b>аутентифицированное шифрование</b> (AEAD), режим по умолчанию в TLS 1.3.</li></ul><p>CFB и OFB — более старые поточные режимы.</p>`,
    },
    take: { en: `Choose an authenticated mode such as GCM: secrecy and tamper detection together.`, ru: `Выбирайте аутентифицированный режим вроде GCM: секретность и обнаружение подделки вместе.` } },

  { id: 's06-011', kind: 'story', k: ['d3-c6', 'd3-c8'], lvl: 2,
    title: { en: `Adobe 2013: the password crossword`, ru: `Adobe 2013: кроссворд из паролей` },
    body: {
      en: `<p>In 2013, attackers stole a file of Adobe user accounts; the leaked copy held about 150 million records. The passwords weren't hashed. They were <b>encrypted with 3DES in ECB mode</b>, all with the same key, and the users' password <b>hints</b> sat next to them in plain text.</p><p>Nobody needed the key. Identical passwords had identical ciphertext, so people grouped them and read the hints: "1 to 6", "qwerty", "the usual". Millions of passwords were guessed like a crossword.</p>`,
      ru: `<p>В 2013 году злоумышленники украли файл с учётными записями пользователей Adobe; в утёкшей копии было около 150 миллионов записей. Пароли не хешировали. Их <b>зашифровали 3DES в режиме ECB</b> одним ключом на всех, а <b>подсказки</b> к паролям лежали рядом открытым текстом.</p><p>Ключ никому не понадобился. Одинаковые пароли давали одинаковый шифртекст, люди сгруппировали их и прочли подсказки: «от 1 до 6», «qwerty», «как обычно». Миллионы паролей разгадали, как кроссворд.</p>`,
    },
    take: { en: `Passwords must be hashed with a salt, not encrypted, and never in ECB.`, ru: `Пароли хешируют с солью, а не шифруют, и уж точно не в ECB.` } },

  { id: 's06-012', kind: 'idea', k: ['d3-c6'], lvl: 2,
    title: { en: `Block ciphers and stream ciphers`, ru: `Блочные и поточные шифры` },
    body: {
      en: `<p>A <b>block cipher</b> (AES) works on fixed chunks. A <b>stream cipher</b> generates a long pseudo-random keystream from the key and a nonce, and mixes it with the data bit by bit. Streams suit live traffic such as voice or radio links.</p><p><b>RC4</b> was the classic stream cipher, used in WEP and early TLS; it has known biases and is now banned. <b>ChaCha20</b> is the modern choice, fast on phones without AES hardware. Rule for every stream: never reuse a keystream, or two messages can be combined to cancel it out.</p>`,
      ru: `<p><b>Блочный шифр</b> (AES) работает с кусками фиксированного размера. <b>Поточный шифр</b> вырабатывает из ключа и nonce длинную псевдослучайную гамму и смешивает её с данными бит за битом. Потоки удобны для живого трафика: голоса, радиоканалов.</p><p><b>RC4</b> был классическим поточным шифром в WEP и раннем TLS; у него известные перекосы, и сейчас он запрещён. <b>ChaCha20</b> — современный выбор, быстрый на телефонах без аппаратного AES. Правило для любого потока: не использовать гамму повторно, иначе два сообщения можно сложить и гамма сократится.</p>`,
    },
    take: { en: `Streams are fast but fragile: a reused keystream breaks them.`, ru: `Потоки быстрые, но хрупкие: повторная гамма их ломает.` } },

  { id: 's06-013', kind: 'back', back: 's03-012', k: ['d2-c3', 'd3-c6'], lvl: 2,
    title: { en: `Data at rest again: where does the key sleep?`, ru: `Снова данные в покое: где спит ключ?` },
    body: {
      en: `<p>In stage 3 you met the three states of data. For data <b>at rest</b>, the answer is usually AES: full-disk encryption on laptops, encrypted databases, encrypted cloud storage.</p><p>Now the harder question: where is the key? Encryption with the key stored next to the data, in the same database, the same config file, the same backup, protects against almost nothing. An attacker who copies the data copies the key too. The security of encrypted data is the security of its key.</p>`,
      ru: `<p>На этапе 3 вы узнали о трёх состояниях данных. Для данных <b>в покое</b> ответ обычно AES: полнодисковое шифрование ноутбуков, шифрованные базы, шифрованное облачное хранилище.</p><p>Теперь вопрос труднее: где ключ? Шифрование, ключ от которого лежит рядом с данными — в той же базе, том же файле конфигурации, той же резервной копии, — почти ни от чего не защищает. Кто скопировал данные, скопировал и ключ. Защищённость зашифрованных данных — это защищённость их ключа.</p>`,
    },
    take: { en: `Encrypted data is exactly as safe as the place its key is kept.`, ru: `Зашифрованные данные защищены ровно настолько, насколько защищено место хранения ключа.` } },

  { id: 's06-014', kind: 'idea', k: ['d3-c7'], lvl: 1,
    title: { en: `Asymmetric: the open padlock`, ru: `Асимметричное: открытый замок` },
    body: {
      en: `<p>Imagine handing out open padlocks to anyone who asks. Anyone can put a message in a box and snap your padlock shut, but only you have the key that opens it.</p><p>That's <b>asymmetric</b> (public-key) crypto. You have a key pair: a <b>public key</b> you share with the world (the padlock) and a <b>private key</b> you never share (the key). What one key locks, only the other can open. The key distribution problem disappears: the public key can travel openly.</p><p>The price: it's hundreds of times slower than symmetric crypto.</p>`,
      ru: `<p>Представьте, что вы раздаёте открытые навесные замки всем желающим. Любой может положить сообщение в ящик и защёлкнуть ваш замок, но открыть его можете только вы своим ключом.</p><p>Это <b>асимметричная</b> криптография (с открытым ключом). У вас пара ключей: <b>открытый</b>, который вы даёте всем (замок), и <b>закрытый</b>, который вы никому не даёте (ключ). Что заперто одним ключом, открывается только другим. Проблема распределения исчезает: открытый ключ можно передавать открыто.</p><p>Цена: это в сотни раз медленнее симметричного шифрования.</p>`,
    },
    take: { en: `Share the public key freely; guard the private key with your life.`, ru: `Открытый ключ раздавайте свободно, закрытый берегите как зеницу ока.` } },

  { id: 's06-015', kind: 'picture', k: ['d3-c7'], lvl: 1,
    title: { en: `Lock with theirs, sign with yours`, ru: `Запираем чужим, подписываем своим` },
    body: {
      en: `<p>The same key pair is used two ways. For <b>secrecy</b>, you use the recipient's public key. For a <b>signature</b>, you use your own private key, and everyone checks it with your public key.</p>`,
      ru: `<p>Одна и та же пара ключей работает двумя способами. Для <b>секретности</b> берут открытый ключ получателя. Для <b>подписи</b> — свой закрытый ключ, а проверяют все вашим открытым.</p>`,
    },
    dg: { title: { en: `Encrypting vs signing`, ru: `Шифрование и подпись` }, h: 300,
      zones: [[10, 20, 740, 120, { en: 'Secrecy: only Bob can read', ru: 'Секретность: прочтёт только Боб' }, 'trust'], [10, 160, 740, 125, { en: 'Signature: everyone can check it is from Alice', ru: 'Подпись: любой проверит, что это от Алисы' }, 'trust']],
      nodes: [
        ['a1', 130, 85, { en: 'Alice', ru: 'Алиса' }, { en: "uses Bob's public key", ru: 'берёт открытый ключ Боба' }, '👩', 'ok', 230],
        ['m1', 385, 85, { en: '🔒 message', ru: '🔒 сообщение' }, { en: 'unreadable on the way', ru: 'нечитаемо в пути' }, null, 'key', 240],
        ['b1', 635, 85, { en: 'Bob', ru: 'Боб' }, { en: 'opens with his private key', ru: 'открывает своим закрытым' }, '👨', 'ok', 220],
        ['a2', 130, 230, { en: 'Alice', ru: 'Алиса' }, { en: 'signs with her private key', ru: 'подписывает своим закрытым' }, '👩', 'ok', 230],
        ['m2', 385, 230, { en: '✍ message + signature', ru: '✍ сообщение + подпись' }, { en: 'readable, but sealed', ru: 'читаемо, но запечатано' }, null, 'key', 240],
        ['b2', 635, 230, { en: 'Anyone', ru: 'Любой' }, { en: "checks with Alice's public key", ru: 'проверяет открытым Алисы' }, '👥', 'ok', 220],
      ],
      edges: [['a1', 'm1', null, 'ok'], ['m1', 'b1', null, 'ok'], ['a2', 'm2', null, 'ok'], ['m2', 'b2', null, 'ok']] },
    take: { en: `Encrypt with the recipient's public key; sign with your own private key.`, ru: `Шифруют открытым ключом получателя, подписывают своим закрытым.` } },

  { id: 's06-016', kind: 'think', k: ['d3-c7'], lvl: 1,
    title: { en: `Which key?`, ru: `Каким ключом?` },
    body: {
      en: `<p>Bob sends his lawyer, Carol, a confidential settlement offer. He wants two things: only Carol can read it, and Carol can prove it came from Bob.</p><p>Which keys does Bob use, and in what order?</p>`,
      ru: `<p>Боб отправляет своему юристу Кэрол конфиденциальное предложение о мировом соглашении. Ему нужно две вещи: прочитать может только Кэрол, и Кэрол может доказать, что письмо от Боба.</p><p>Какими ключами пользуется Боб и в каком порядке?</p>`,
    },
    reveal: {
      en: `<p><b>Two keys, from two different pairs.</b></p><ul><li>To prove it's from him, Bob <b>signs</b> with <b>his own private key</b>. Carol checks the signature with Bob's public key.</li><li>To keep it secret, Bob <b>encrypts</b> with <b>Carol's public key</b>. Only Carol's private key opens it.</li></ul><p>The usual order is sign, then encrypt, so the signature is hidden too. The trap on the exam: "encrypt with Bob's private key for confidentiality". Anyone with Bob's public key could read that.</p>`,
      ru: `<p><b>Два ключа из двух разных пар.</b></p><ul><li>Чтобы доказать авторство, Боб <b>подписывает</b> <b>своим закрытым ключом</b>. Кэрол проверяет подпись открытым ключом Боба.</li><li>Чтобы сохранить секретность, Боб <b>шифрует</b> <b>открытым ключом Кэрол</b>. Открыть может только её закрытый ключ.</li></ul><p>Обычный порядок — подписать, потом зашифровать, чтобы подпись тоже была скрыта. Ловушка на экзамене: «зашифровать закрытым ключом Боба для конфиденциальности». Это прочтёт любой, у кого есть открытый ключ Боба.</p>`,
    },
    take: { en: `Secrecy uses the recipient's keys; proof of origin uses the sender's.`, ru: `Секретность — ключи получателя, доказательство авторства — ключи отправителя.` } },

  { id: 's06-017', kind: 'vs', k: ['d3-c7'], lvl: 2,
    title: { en: `RSA vs ECC vs Diffie-Hellman`, ru: `RSA, ECC и Диффи — Хеллман` },
    body: {
      en: `<ul><li><b>RSA</b> (1977): security rests on how hard it is to factor the product of two huge primes. Encrypts, signs, exchanges keys. Keys of 2048 bits or more.</li><li><b>ECC</b> (elliptic curves): the same strength with much shorter keys; a 256-bit ECC key matches roughly 3072-bit RSA. Less computing and battery, so it suits phones, smart cards and IoT.</li><li><b>Diffie-Hellman</b> (1976): doesn't encrypt anything. Two parties agree on a shared secret over an open channel. ECDH is its elliptic-curve version.</li></ul><p>Also seen: DSA and ElGamal.</p>`,
      ru: `<ul><li><b>RSA</b> (1977): стойкость основана на трудности разложения произведения двух огромных простых чисел. Шифрует, подписывает, обменивается ключами. Ключи от 2048 бит.</li><li><b>ECC</b> (эллиптические кривые): та же стойкость при гораздо более коротких ключах; 256-битный ключ ECC примерно равен 3072-битному RSA. Меньше вычислений и батареи, поэтому подходит телефонам, смарт-картам и IoT.</li><li><b>Диффи — Хеллман</b> (1976): ничего не шифрует. Две стороны договариваются об общем секрете по открытому каналу. ECDH — его вариант на эллиптических кривых.</li></ul><p>Ещё встречаются DSA и Эль-Гамаль.</p>`,
    },
    take: { en: `RSA does everything, ECC does it smaller, Diffie-Hellman only agrees on a key.`, ru: `RSA умеет всё, ECC — то же компактнее, Диффи — Хеллман только договаривается о ключе.` } },

  { id: 's06-018', kind: 'idea', k: ['d3-c7'], lvl: 2,
    title: { en: `Diffie-Hellman: agreeing on a secret in public`, ru: `Диффи — Хеллман: договориться о секрете при всех` },
    body: {
      en: `<p>The classic picture is paint. Alice and Bob agree in public on a common colour. Each secretly mixes in a private colour and sends the result. Each then adds their own private colour to what they received. Both end up with the same final mix, and an eavesdropper who saw only the exchanged mixes can't separate them.</p><p>The catch: Diffie-Hellman doesn't check <b>who</b> you're talking to. An attacker in the middle can run one exchange with Alice and another with Bob. So it's always combined with authentication, usually a certificate and a signature.</p>`,
      ru: `<p>Классическая картинка — краски. Алиса и Боб публично выбирают общий цвет. Каждый тайно подмешивает свой секретный цвет и отправляет результат. Потом каждый добавляет свой секретный цвет к полученному. У обоих выходит одна и та же смесь, а подслушивающий, видевший только переданные смеси, не может их разделить.</p><p>Подвох: Диффи — Хеллман не проверяет, <b>с кем</b> вы говорите. Атакующий посередине может провести один обмен с Алисой, другой — с Бобом. Поэтому его всегда сочетают с аутентификацией, обычно с сертификатом и подписью.</p>`,
    },
    take: { en: `Diffie-Hellman makes a shared secret, but only authentication tells you with whom.`, ru: `Диффи — Хеллман создаёт общий секрет, но с кем — скажет только аутентификация.` } },

  { id: 's06-019', kind: 'picture', k: ['d3-c7', 'd3-c6'], lvl: 2,
    title: { en: `Hybrid crypto: the best of both`, ru: `Гибридная криптография: лучшее от обеих` },
    body: {
      en: `<p>Asymmetric crypto solves key distribution but is slow. Symmetric crypto is fast but needs a shared key. So real systems use both: asymmetric to agree on a fresh session key, then symmetric for all the data.</p>`,
      ru: `<p>Асимметричная криптография решает проблему распределения ключей, но медленная. Симметричная быстрая, но ей нужен общий ключ. Поэтому реальные системы используют обе: асимметричную — чтобы договориться о свежем сеансовом ключе, симметричную — для всех данных.</p>`,
    },
    dg: { title: { en: `How a TLS connection uses both`, ru: `Как соединение TLS использует обе` }, h: 300,
      zones: [[10, 20, 740, 120, { en: '1. Asymmetric: agree on a key (slow, tiny)', ru: '1. Асимметрично: договориться о ключе (медленно, мало)' }, 'trust'], [10, 160, 740, 125, { en: '2. Symmetric: encrypt the data (fast, bulk)', ru: '2. Симметрично: шифровать данные (быстро, много)' }, 'trust']],
      nodes: [
        ['b1', 115, 85, { en: 'Browser', ru: 'Браузер' }, null, '🌐', 'ok', 150],
        ['k', 385, 85, { en: '🔑 session key', ru: '🔑 сеансовый ключ' }, { en: 'ECDHE + server certificate', ru: 'ECDHE + сертификат сервера' }, null, 'key', 260],
        ['s1', 650, 85, { en: 'Server', ru: 'Сервер' }, null, '🖥', 'ok', 150],
        ['b2', 115, 230, { en: 'Browser', ru: 'Браузер' }, null, '🌐', 'ok', 150],
        ['d', 385, 230, { en: '🔒 pages, passwords, cookies', ru: '🔒 страницы, пароли, cookie' }, { en: 'AES-GCM with the session key', ru: 'AES-GCM сеансовым ключом' }, null, 'key', 260],
        ['s2', 650, 230, { en: 'Server', ru: 'Сервер' }, null, '🖥', 'ok', 150],
      ],
      edges: [['b1', 'k', null, 'both'], ['k', 's1', null, 'both'], ['b2', 'd', null, 'both'], ['d', 's2', null, 'both']] },
    take: { en: `Asymmetric to share the key, symmetric to move the data.`, ru: `Асимметрия — чтобы передать ключ, симметрия — чтобы передать данные.` } },

  { id: 's06-020', kind: 'back', back: 's05-038', k: ['d4-c5', 'd3-c7'], lvl: 2,
    title: { en: `The padlock again, now opened up`, ru: `Снова замочек, теперь изнутри` },
    body: {
      en: `<p>In stage 5, the padlock in the browser meant "the connection is encrypted, and the server proved its name". Now you can name the parts of a TLS 1.3 connection:</p><ul><li><b>ECDHE</b> agrees on a session key (Diffie-Hellman, stage-6 style).</li><li>The server's <b>certificate</b> and <b>signature</b> prove that the other end really is bank.example, which stops the man in the middle.</li><li><b>AES-GCM</b> or ChaCha20 encrypts and integrity-checks every byte.</li></ul><p>Three tools, each covering what the others can't.</p>`,
      ru: `<p>На этапе 5 замочек в браузере означал «соединение зашифровано, и сервер доказал своё имя». Теперь можно назвать части соединения TLS 1.3:</p><ul><li><b>ECDHE</b> договаривается о сеансовом ключе (Диффи — Хеллман, как на этом этапе).</li><li><b>Сертификат</b> и <b>подпись</b> сервера доказывают, что на том конце действительно bank.example, и это останавливает человека посередине.</li><li><b>AES-GCM</b> или ChaCha20 шифрует каждый байт и проверяет его целостность.</li></ul><p>Три инструмента, и каждый закрывает то, чего не могут другие.</p>`,
    },
    take: { en: `TLS = key agreement + certificate + authenticated encryption.`, ru: `TLS = согласование ключа + сертификат + аутентифицированное шифрование.` } },

  { id: 's06-021', kind: 'idea', k: ['d3-c7', 'd4-c5'], lvl: 3,
    title: { en: `Forward secrecy: recorded today, safe tomorrow`, ru: `Прямая секретность: записали сегодня, безопасно завтра` },
    body: {
      en: `<p>Suppose an attacker records your encrypted traffic for years, then one day steals the server's private key. Can they decrypt the recordings?</p><p>With old TLS that used RSA to send the session key, <b>yes</b>: the private key unlocks every past session key. With <b>ephemeral</b> Diffie-Hellman (the E in ECDHE), each session uses throwaway keys that are deleted afterwards. The server's private key only signs; it never decrypts anything. That's <b>forward secrecy</b>, and TLS 1.3 requires it.</p>`,
      ru: `<p>Пусть атакующий годами записывает ваш зашифрованный трафик, а однажды крадёт закрытый ключ сервера. Сможет ли он расшифровать записи?</p><p>Со старым TLS, где сеансовый ключ передавали через RSA, — <b>да</b>: закрытый ключ открывает все прошлые сеансовые ключи. С <b>эфемерным</b> Диффи — Хеллманом (буква E в ECDHE) каждый сеанс использует одноразовые ключи, которые потом удаляются. Закрытый ключ сервера только подписывает и ничего не расшифровывает. Это <b>прямая секретность</b> (forward secrecy), и TLS 1.3 её требует.</p>`,
    },
    take: { en: `With forward secrecy, a stolen key today can't open yesterday's traffic.`, ru: `С прямой секретностью украденный сегодня ключ не откроет вчерашний трафик.` } },

  { id: 's06-022', kind: 'idea', k: ['d3-c8'], lvl: 1,
    title: { en: `Hashing: a fingerprint for data`, ru: `Хеширование: отпечаток пальца для данных` },
    body: {
      en: `<p>A <b>hash function</b> takes any input, one word or a whole disk, and produces a short fixed-length value: the <b>digest</b>. A good hash has three properties:</p><ul><li><b>One-way</b>: you can't get the input back from the digest.</li><li><b>Avalanche</b>: change one character and about half the bits of the digest change.</li><li><b>Collision-resistant</b>: it's infeasible to find two different inputs with the same digest.</li></ul><p>Like a fingerprint, the digest identifies the data without containing it.</p>`,
      ru: `<p><b>Хеш-функция</b> берёт любые данные — одно слово или целый диск — и выдаёт короткое значение фиксированной длины: <b>дайджест</b>. У хорошего хеша три свойства:</p><ul><li><b>Односторонность</b>: по дайджесту нельзя получить исходные данные.</li><li><b>Лавинный эффект</b>: измените один символ — и поменяется примерно половина битов дайджеста.</li><li><b>Стойкость к коллизиям</b>: практически невозможно найти два разных входа с одинаковым дайджестом.</li></ul><p>Как отпечаток пальца, дайджест опознаёт данные, не содержа их.</p>`,
    },
    take: { en: `A hash identifies data and reveals any change, but can't be reversed.`, ru: `Хеш опознаёт данные и выдаёт любое изменение, но обратить его нельзя.` } },

  { id: 's06-023', kind: 'picture', k: ['d3-c8'], lvl: 1,
    title: { en: `One digit changed, everything changed`, ru: `Изменили одну цифру — изменилось всё` },
    body: {
      en: `<p>Whatever the input size, SHA-256 gives 256 bits. A one-digit change gives a digest with no visible relation to the first. That's why comparing digests catches any tampering, however small.</p>`,
      ru: `<p>Каким бы ни был вход, SHA-256 выдаёт 256 бит. Изменение одной цифры даёт дайджест, никак внешне не связанный с первым. Поэтому сравнение дайджестов ловит любое, даже крошечное, вмешательство.</p>`,
    },
    dg: { title: { en: `SHA-256 in action (digests shortened)`, ru: `SHA-256 в действии (дайджесты сокращены)` }, h: 300,
      nodes: [
        ['i1', 130, 55, { en: '"Pay Bob 100"', ru: '«Заплатить Бобу 100»' }, null, '📄', 'dim', 220],
        ['i2', 130, 150, { en: '"Pay Bob 900"', ru: '«Заплатить Бобу 900»' }, null, '📄', 'dim', 220],
        ['i3', 130, 245, { en: 'A 4 GB disk image', ru: 'Образ диска на 4 ГБ' }, null, '💽', 'dim', 220],
        ['h', 385, 150, { en: 'SHA-256', ru: 'SHA-256' }, { en: 'one-way', ru: 'односторонняя' }, '#', 'key', 150],
        ['o1', 625, 55, { en: '3f9a…e21c', ru: '3f9a…e21c' }, { en: '256 bits', ru: '256 бит' }, null, 'ok', 200],
        ['o2', 625, 150, { en: 'b07d…4a88', ru: 'b07d…4a88' }, { en: 'nothing in common', ru: 'ничего общего' }, null, 'bad', 200],
        ['o3', 625, 245, { en: '91c2…07fe', ru: '91c2…07fe' }, { en: 'still 256 bits', ru: 'всё те же 256 бит' }, null, 'ok', 200],
      ],
      edges: [['i1', 'h', null, 'dash'], ['i2', 'h', null, 'dash'], ['i3', 'h', null, 'dash'], ['h', 'o1', null, 'ok'], ['h', 'o2', null, 'bad'], ['h', 'o3', null, 'ok']],
      note: { en: `The digests are illustrative; real ones are 64 hex characters.`, ru: `Дайджесты условные; настоящие — 64 шестнадцатеричных символа.` } },
    take: { en: `Same input, same digest; any change, a completely different one.`, ru: `Тот же вход — тот же дайджест; любое изменение — совсем другой.` } },

  { id: 's06-024', kind: 'vs', k: ['d3-c8', 'd3-c10'], lvl: 2,
    title: { en: `MD5 and SHA-1 vs SHA-2 and SHA-3`, ru: `MD5 и SHA-1 против SHA-2 и SHA-3` },
    body: {
      en: `<ul><li><b>MD5</b> (128-bit): collisions can be made on a laptop. Fine to spot accidental corruption, useless against an attacker.</li><li><b>SHA-1</b> (160-bit): in 2017, Google and CWI Amsterdam published two different PDF files with the same SHA-1 digest. Retired for signatures and certificates.</li><li><b>SHA-2</b> (SHA-256, SHA-384, SHA-512): today's workhorse.</li><li><b>SHA-3</b>: a different internal design, a backup in case SHA-2 is ever weakened.</li></ul>`,
      ru: `<ul><li><b>MD5</b> (128 бит): коллизии делаются на ноутбуке. Годится, чтобы заметить случайную порчу, бесполезен против атакующего.</li><li><b>SHA-1</b> (160 бит): в 2017 году Google и CWI Amsterdam опубликовали два разных PDF-файла с одинаковым дайджестом SHA-1. Выведен из подписей и сертификатов.</li><li><b>SHA-2</b> (SHA-256, SHA-384, SHA-512): сегодняшняя рабочая лошадка.</li><li><b>SHA-3</b>: другое внутреннее устройство, запасной вариант на случай, если SHA-2 когда-нибудь ослабнет.</li></ul>`,
    },
    take: { en: `MD5 and SHA-1 are broken for security; use SHA-256 or better.`, ru: `MD5 и SHA-1 непригодны для безопасности; используйте SHA-256 или лучше.` } },

  { id: 's06-025', kind: 'story', k: ['d3-c10', 'd3-c8', 'd3-c9'], lvl: 2,
    title: { en: `Flame 2012: a forged Microsoft signature`, ru: `Flame 2012: поддельная подпись Microsoft` },
    body: {
      en: `<p>In 2012, researchers found <b>Flame</b>, a large espionage toolkit active in the Middle East. One trick stood out: it spread through Windows Update on local networks, and Windows accepted its files as genuine Microsoft code.</p><p>The attackers had found a Microsoft licensing service that still issued certificates signed with <b>MD5</b>. Using an MD5 collision, they crafted a certificate that matched a legitimate signature and could sign code. Microsoft revoked the certificates and stopped using MD5 there.</p>`,
      ru: `<p>В 2012 году исследователи нашли <b>Flame</b> — большой шпионский инструментарий, действовавший на Ближнем Востоке. Один приём выделялся: он распространялся через Windows Update в локальных сетях, и Windows принимала его файлы за подлинный код Microsoft.</p><p>Атакующие нашли службу лицензирования Microsoft, которая всё ещё выпускала сертификаты с подписью на основе <b>MD5</b>. С помощью коллизии MD5 они изготовили сертификат, подходивший под легитимную подпись и пригодный для подписи кода. Microsoft отозвала сертификаты и перестала использовать там MD5.</p>`,
    },
    take: { en: `A weak hash under a signature makes the signature forgeable.`, ru: `Слабый хеш под подписью делает подпись подделываемой.` } },

  { id: 's06-026', kind: 'idea', k: ['d3-c10', 'd3-c8'], lvl: 3,
    title: { en: `The birthday attack: why hashes need double length`, ru: `Атака «дней рождения»: почему хешу нужна двойная длина` },
    body: {
      en: `<p>How many people must be in a room before two share a birthday, more likely than not? Only <b>23</b>. You're not matching one fixed date; any pair counts, and the pairs grow fast.</p><p>Collisions in hashes work the same way. Finding <i>any</i> two inputs with the same n-bit digest takes about 2<sup>n/2</sup> tries, not 2<sup>n</sup>. So MD5's 128 bits give only about 64 bits of collision resistance, which is within reach. That's why SHA-256 is the minimum for signatures today.</p>`,
      ru: `<p>Сколько людей должно быть в комнате, чтобы у двоих скорее всего совпали дни рождения? Всего <b>23</b>. Вы ищете не одну заданную дату: подходит любая пара, а пар становится много очень быстро.</p><p>С коллизиями хешей так же. Чтобы найти <i>любые</i> два входа с одинаковым n-битным дайджестом, нужно около 2<sup>n/2</sup> попыток, а не 2<sup>n</sup>. Поэтому 128 бит MD5 дают лишь около 64 бит стойкости к коллизиям, а это уже достижимо. Вот почему для подписей сегодня минимум — SHA-256.</p>`,
    },
    take: { en: `An n-bit hash resists collisions only to about n/2 bits.`, ru: `n-битный хеш стоек к коллизиям лишь примерно на n/2 бит.` } },

  { id: 's06-027', kind: 'back', back: 's01-005', k: ['d1-c1', 'd3-c8'], lvl: 2,
    title: { en: `Integrity again: the hash on the download page`, ru: `Снова целостность: хеш на странице загрузки` },
    body: {
      en: `<p>In stage 1, integrity meant "nothing changes without permission". Hashing is how you check it. Many software sites list a SHA-256 digest next to each download: hash your copy, compare, and you know it wasn't corrupted.</p><p>But think like an attacker. If they can replace the file on the site, they can replace the digest on the same page. A bare hash proves the file matches the page, not that the page is honest. To know <b>who</b> published it, you need a key: an HMAC or, better, a digital signature.</p>`,
      ru: `<p>На этапе 1 целостность означала «ничего не меняется без разрешения». Хеширование — способ это проверить. Многие сайты публикуют рядом с каждой загрузкой дайджест SHA-256: посчитали хеш своей копии, сравнили — и знаете, что файл не испорчен.</p><p>Но подумайте как атакующий. Если он может подменить файл на сайте, он подменит и дайджест на той же странице. Голый хеш доказывает, что файл совпадает со страницей, но не что страница честная. Чтобы знать, <b>кто</b> опубликовал файл, нужен ключ: HMAC или, лучше, цифровая подпись.</p>`,
    },
    take: { en: `A hash shows that something changed; only a key shows who made it.`, ru: `Хеш показывает, что что-то изменилось; кто автор — покажет только ключ.` } },

  { id: 's06-028', kind: 'vs', k: ['d3-c8', 'd3-c7'], lvl: 2,
    title: { en: `Hash vs HMAC vs digital signature`, ru: `Хеш, HMAC и цифровая подпись` },
    body: {
      en: `<ul><li><b>Hash</b>: no key. Proves <b>integrity</b> against accidents, as long as the digest itself is trusted.</li><li><b>HMAC</b>: a hash mixed with a shared secret key. Proves <b>integrity and authenticity</b>: only someone with the key could produce it. But both sides hold the key, so either could have made it: no nonrepudiation. APIs and Kerberos use it.</li><li><b>Digital signature</b>: a hash signed with the sender's private key. Proves <b>integrity, authenticity and nonrepudiation</b>, and anyone can check it with the public key.</li></ul>`,
      ru: `<ul><li><b>Хеш</b>: без ключа. Доказывает <b>целостность</b> от случайностей, если самому дайджесту можно верить.</li><li><b>HMAC</b>: хеш, смешанный с общим секретным ключом. Доказывает <b>целостность и подлинность</b>: создать его мог только владелец ключа. Но ключ у обеих сторон, так что автором мог быть любой: неотказуемости нет. Используется в API и Kerberos.</li><li><b>Цифровая подпись</b>: хеш, подписанный закрытым ключом отправителя. Доказывает <b>целостность, подлинность и неотказуемость</b>, а проверить её может любой открытым ключом.</li></ul>`,
    },
    take: { en: `Hash: changed? HMAC: changed, and by a key holder? Signature: changed, and by exactly whom?`, ru: `Хеш: изменено? HMAC: изменено, и владельцем ключа? Подпись: изменено, и кем именно?` } },

  { id: 's06-029', kind: 'picture', k: ['d3-c7', 'd3-c8'], lvl: 2,
    title: { en: `A digital signature, step by step`, ru: `Цифровая подпись по шагам` },
    body: {
      en: `<p>The sender doesn't sign the whole document; they sign its hash, which is small and fast. The receiver hashes the document again, opens the signature with the sender's public key, and compares the two.</p>`,
      ru: `<p>Отправитель подписывает не весь документ, а его хеш: он маленький, и это быстро. Получатель заново хеширует документ, открывает подпись открытым ключом отправителя и сравнивает два значения.</p>`,
    },
    dg: { title: { en: `Sign, send, verify`, ru: `Подписать, отправить, проверить` }, h: 300,
      zones: [[10, 20, 740, 100, { en: 'Sender', ru: 'Отправитель' }, 'trust'], [10, 180, 740, 105, { en: 'Receiver', ru: 'Получатель' }, 'trust']],
      nodes: [
        ['d1', 100, 75, { en: 'document', ru: 'документ' }, null, '📄', 'dim', 140],
        ['h1', 270, 75, { en: 'hash', ru: 'хеш' }, null, '#', 'key', 140],
        ['s', 630, 75, { en: 'signature', ru: 'подпись' }, { en: "hash + sender's private key", ru: 'хеш + закрытый ключ отправителя' }, '✍', 'key', 220],
        ['d2', 100, 240, { en: 'document', ru: 'документ' }, null, '📄', 'dim', 140],
        ['h2', 270, 240, { en: 'hash again', ru: 'хеш заново' }, null, '#', 'key', 140],
        ['c', 440, 240, { en: 'equal?', ru: 'равны?' }, null, '⚖', 'ok', 120],
        ['v', 630, 240, { en: 'opened hash', ru: 'открытый хеш' }, { en: "with sender's public key", ru: 'открытым ключом отправителя' }, '🔓', 'key', 220],
      ],
      edges: [['d1', 'h1', null, 'key'], ['h1', 's', { en: 'sign', ru: 'подписать' }, 'key'], ['d1', 'd2', { en: 'sent', ru: 'отправлен' }, 'dash'], ['s', 'v', { en: 'sent', ru: 'отправлена' }, 'dash'], ['d2', 'h2', null, 'key'], ['h2', 'c', null, 'ok'], ['v', 'c', null, 'ok']],
      note: { en: `Equal: unchanged and from the key's owner. Different: reject it.`, ru: `Равны: не изменён и от владельца ключа. Разные: отклонить.` } },
    take: { en: `Sign the hash with the private key; verify with the public key and a fresh hash.`, ru: `Подписывают хеш закрытым ключом; проверяют открытым ключом и свежим хешем.` } },

  { id: 's06-030', kind: 'back', back: 's01-009', k: ['d1-c1', 'd3-c7'], lvl: 2,
    title: { en: `Nonrepudiation again: who holds the key?`, ru: `Снова неотказуемость: у кого ключ?` },
    body: {
      en: `<p>In stage 1, nonrepudiation meant "they can't deny it". Now you know the mechanism: only a digital signature gives it, because only the signer has the private key.</p><p>That "only" carries all the weight. If the private key sits on a shared server that five admins can reach, a valid signature proves that one of six people signed. Real nonrepudiation needs the key in a place only its owner controls: a smart card, a security key, a hardware module that requires the owner's PIN.</p>`,
      ru: `<p>На этапе 1 неотказуемость означала «отпереться не выйдет». Теперь вы знаете механизм: её даёт только цифровая подпись, потому что закрытый ключ есть только у подписавшего.</p><p>Всё держится на слове «только». Если закрытый ключ лежит на общем сервере, куда могут зайти пять администраторов, валидная подпись доказывает, что подписал один из шести человек. Настоящей неотказуемости нужен ключ там, где распоряжается только владелец: смарт-карта, ключ безопасности, аппаратный модуль с PIN-кодом владельца.</p>`,
    },
    take: { en: `A signature proves no more than the private key's custody does.`, ru: `Подпись доказывает не больше, чем позволяет хранение закрытого ключа.` } },

  { id: 's06-031', kind: 'think', k: ['d3-c7', 'd1-c1'], lvl: 3,
    title: { en: `"I never signed that"`, ru: `«Я этого не подписывал»` },
    body: {
      en: `<p>Your company runs an online contract platform. A customer disputes a contract: "I never signed it." Your logs show a valid digital signature made with the customer's key.</p><p>The keys, however, are generated and stored on your server. Customers click "Sign" after logging in with a password. Does the signature settle the dispute?</p>`,
      ru: `<p>Ваша компания держит онлайн-платформу для договоров. Клиент оспаривает договор: «Я его не подписывал». В журналах — валидная цифровая подпись ключом клиента.</p><p>Однако ключи создаются и хранятся на вашем сервере. Клиенты нажимают «Подписать» после входа по паролю. Решает ли подпись спор?</p>`,
    },
    reveal: {
      en: `<p><b>Not by itself.</b> The math proves the customer's key signed the contract. But your staff and anyone who breached your server could use that key, and so could anyone who phished the customer's password. The signature is only as strong as the weakest step to use it.</p><p>To make it hold up: keys generated and kept on the customer's device or a qualified signing service, strong authentication (MFA) before each signature, and tamper-evident logs. Policy and process decide whether nonrepudiation is real.</p>`,
      ru: `<p><b>Сама по себе — нет.</b> Математика доказывает, что договор подписан ключом клиента. Но этим ключом могли воспользоваться ваши сотрудники, любой, кто взломал сервер, и любой, кто выманил пароль клиента. Подпись не сильнее самого слабого шага к её использованию.</p><p>Чтобы подпись выдерживала спор: ключи создаются и хранятся на устройстве клиента или в квалифицированном сервисе подписи, перед каждой подписью — строгая аутентификация (MFA), журналы защищены от изменений. Реальна ли неотказуемость, решают политика и процессы.</p>`,
    },
    take: { en: `Nonrepudiation is a property of the whole process, not of the algorithm.`, ru: `Неотказуемость — свойство всего процесса, а не алгоритма.` } },

  { id: 's06-032', kind: 'story', k: ['d3-c8', 'd3-c10'], lvl: 2,
    title: { en: `LinkedIn 2012: hashed, but not salted`, ru: `LinkedIn 2012: хешировано, но без соли` },
    body: {
      en: `<p>In June 2012, about 6.5 million password hashes from LinkedIn appeared on a hacker forum. LinkedIn had done one thing right: the passwords were hashed. But they used plain <b>SHA-1</b> with <b>no salt</b>.</p><p>Without a salt, everyone with the password "linkedin123" had the same hash, and precomputed tables and fast GPUs cracked most of the list within days. In 2016 it turned out the 2012 breach was far bigger: about 117 million accounts were offered for sale.</p>`,
      ru: `<p>В июне 2012 года на хакерском форуме появились около 6,5 миллиона хешей паролей LinkedIn. Одно LinkedIn сделала правильно: пароли были захешированы. Но простым <b>SHA-1</b> и <b>без соли</b>.</p><p>Без соли у всех с паролем «linkedin123» был одинаковый хеш, и заранее вычисленные таблицы и быстрые видеокарты взломали большую часть списка за несколько дней. В 2016 году выяснилось, что утечка 2012 года была гораздо больше: на продажу выставили около 117 миллионов учётных записей.</p>`,
    },
    take: { en: `A fast, unsalted hash is only a short delay for a password cracker.`, ru: `Быстрый хеш без соли лишь ненадолго задерживает взломщика паролей.` } },

  { id: 's06-033', kind: 'idea', k: ['d3-c8'], lvl: 2,
    title: { en: `Storing passwords properly: salt and slow`, ru: `Как хранить пароли: соль и медленно` },
    body: {
      en: `<p>A server never needs your password, only a way to check it. So it stores a hash, made with two extra ingredients:</p><ul><li>A <b>salt</b>: a random value, different for each user, stored next to the hash. Same passwords now give different hashes, and precomputed tables become useless.</li><li>A <b>slow</b> function built for passwords: <b>Argon2</b>, <b>bcrypt</b>, <b>scrypt</b> or <b>PBKDF2</b>. One login barely notices; billions of guesses per second become a few thousand.</li></ul><p>Some systems add a <b>pepper</b>: a secret kept outside the database, for example in an HSM.</p>`,
      ru: `<p>Серверу не нужен ваш пароль, нужен только способ его проверить. Поэтому он хранит хеш, сделанный с двумя добавками:</p><ul><li><b>Соль</b>: случайное значение, своё у каждого пользователя, хранится рядом с хешем. Одинаковые пароли теперь дают разные хеши, и заранее вычисленные таблицы бесполезны.</li><li><b>Медленная</b> функция, созданная для паролей: <b>Argon2</b>, <b>bcrypt</b>, <b>scrypt</b> или <b>PBKDF2</b>. Один вход этого почти не замечает, а миллиарды попыток в секунду превращаются в несколько тысяч.</li></ul><p>Некоторые системы добавляют <b>перец</b> (pepper): секрет, который хранится вне базы, например в HSM.</p>`,
    },
    take: { en: `Passwords: unique salt, slow hash, never encryption.`, ru: `Пароли: уникальная соль, медленный хеш, никакого шифрования.` } },

  { id: 's06-034', kind: 'vs', k: ['d3-c10'], lvl: 2,
    title: { en: `Brute force vs dictionary vs rainbow table`, ru: `Перебор, словарь, радужные таблицы` },
    body: {
      en: `<ul><li><b>Brute force</b>: try every combination. Defeated by length: each extra character multiplies the work.</li><li><b>Dictionary</b>: try likely passwords first, leaked lists plus variations like "Summer2024!". Defeated by passwords that aren't in any list, and by checking new passwords against breach lists.</li><li><b>Rainbow table</b>: a huge precomputed table from hashes back to passwords, built once and reused against any unsalted database. Defeated by <b>salt</b>.</li></ul><p>All three work offline, after a hash database leaks, so no lockout policy can slow them down.</p>`,
      ru: `<ul><li><b>Полный перебор</b>: пробовать все комбинации. Побеждается длиной: каждый лишний символ умножает работу.</li><li><b>Словарь</b>: сначала пробовать вероятные пароли — утёкшие списки и вариации вроде «Summer2024!». Побеждается паролями, которых нет ни в одном списке, и проверкой новых паролей по спискам утечек.</li><li><b>Радужная таблица</b>: огромная заранее вычисленная таблица из хешей в пароли, построенная один раз и применимая к любой базе без соли. Побеждается <b>солью</b>.</li></ul><p>Все три работают офлайн, после утечки базы хешей, поэтому никакая блокировка учётной записи их не замедлит.</p>`,
    },
    take: { en: `Length beats brute force, uniqueness beats dictionaries, salt beats rainbow tables.`, ru: `Длина побеждает перебор, уникальность — словарь, соль — радужные таблицы.` } },

  { id: 's06-035', kind: 'back', back: 's04-008', k: ['d5-c1', 'd3-c8'], lvl: 2,
    title: { en: `The password rules again, from the server's side`, ru: `Снова правила паролей, со стороны сервера` },
    body: {
      en: `<p>In stage 4 you saw the modern advice: favour length over forced complexity, check new passwords against breach lists, don't force pointless changes. Now you can see why.</p><p>When a hash database leaks, the attacker guesses offline, at full speed, with no lockout. A long passphrase multiplies the brute-force work; a breach-list check removes the dictionary's first guesses; a slow, salted hash on the server slows every guess. Change a password when there's a sign it leaked, not by the calendar.</p>`,
      ru: `<p>На этапе 4 вы видели современные советы: длина важнее навязанной сложности, новые пароли сверяют со списками утечек, бессмысленная регулярная смена не нужна. Теперь видно почему.</p><p>Когда утекает база хешей, атакующий подбирает офлайн, на полной скорости и без блокировок. Длинная парольная фраза умножает работу перебора, проверка по утечкам убирает первые слова словаря, а медленный хеш с солью на сервере тормозит каждую попытку. Пароль меняют, когда есть признак утечки, а не по календарю.</p>`,
    },
    take: { en: `Password rules are designed for the day the hash database leaks.`, ru: `Правила паролей рассчитаны на день, когда утечёт база хешей.` } },

  { id: 's06-036', kind: 'idea', k: ['d3-c9'], lvl: 1,
    title: { en: `Whose public key is this, really?`, ru: `Чей это открытый ключ на самом деле?` },
    body: {
      en: `<p>Public keys solve key distribution, but they bring a new problem. When your browser receives a public key that claims to belong to your bank, how does it know? An attacker in the middle can hand over their own key with the bank's name on it, and every bit of encryption then protects the conversation with the attacker.</p><p>The answer is a trusted third party who checks identities and vouches for them: a <b>certificate authority</b>. The whole system around it is the <b>public key infrastructure</b>, PKI.</p>`,
      ru: `<p>Открытые ключи решают проблему распределения, но приносят новую. Когда браузер получает открытый ключ, якобы принадлежащий вашему банку, откуда ему знать, что это правда? Атакующий посередине может подсунуть свой ключ с названием банка, и тогда всё шифрование будет защищать разговор с атакующим.</p><p>Ответ — доверенная третья сторона, которая проверяет личность и ручается за неё: <b>удостоверяющий центр</b> (CA). Вся система вокруг него — <b>инфраструктура открытых ключей</b>, PKI.</p>`,
    },
    take: { en: `Encryption without knowing whose key it is just encrypts for the attacker.`, ru: `Шифрование без уверенности, чей это ключ, шифрует для атакующего.` } },

  { id: 's06-037', kind: 'idea', k: ['d3-c9'], lvl: 2,
    title: { en: `A certificate is a signed statement`, ru: `Сертификат — это подписанное заявление` },
    body: {
      en: `<p>An <b>X.509 certificate</b> says, in effect: "This public key belongs to bank.example. Signed, the certificate authority." Inside:</p><ul><li>the <b>subject</b> (who it's for) and their <b>public key</b>;</li><li>the <b>issuer</b> (which CA signed it) and a <b>serial number</b>;</li><li>a <b>validity period</b>: not before, not after;</li><li>allowed uses, such as server authentication or code signing;</li><li>the CA's <b>digital signature</b> over all of the above.</li></ul><p>The certificate itself isn't secret. The private key that matches it is.</p>`,
      ru: `<p><b>Сертификат X.509</b> по сути говорит: «Этот открытый ключ принадлежит bank.example. Подпись: удостоверяющий центр». Внутри:</p><ul><li><b>субъект</b> (для кого) и его <b>открытый ключ</b>;</li><li><b>издатель</b> (какой УЦ подписал) и <b>серийный номер</b>;</li><li><b>срок действия</b>: не раньше, не позже;</li><li>разрешённые применения, например аутентификация сервера или подпись кода;</li><li><b>цифровая подпись</b> УЦ поверх всего этого.</li></ul><p>Сам сертификат не секрет. Секрет — соответствующий ему закрытый ключ.</p>`,
    },
    take: { en: `A certificate binds a name to a public key, under a CA's signature.`, ru: `Сертификат связывает имя с открытым ключом под подписью УЦ.` } },

  { id: 's06-038', kind: 'picture', k: ['d3-c9'], lvl: 2,
    title: { en: `The chain of trust`, ru: `Цепочка доверия` },
    body: {
      en: `<p>Your browser and operating system ship with a short list of trusted <b>root CAs</b>. Roots are kept offline and sign a few <b>intermediate CAs</b>, which do the daily work. The browser follows the signatures up the chain until it reaches a root it already trusts.</p>`,
      ru: `<p>Браузер и операционная система поставляются с коротким списком доверенных <b>корневых УЦ</b>. Корни хранят офлайн, и они подписывают несколько <b>промежуточных УЦ</b>, которые выполняют ежедневную работу. Браузер идёт по подписям вверх по цепочке, пока не дойдёт до корня, которому уже доверяет.</p>`,
    },
    dg: { title: { en: `Root → intermediate → server`, ru: `Корень → промежуточный → сервер` }, h: 300,
      nodes: [
        ['r', 200, 50, { en: 'Root CA', ru: 'Корневой УЦ' }, { en: 'offline, in the trust store', ru: 'офлайн, в хранилище доверия' }, '🏛', 'key', 280],
        ['i', 200, 150, { en: 'Intermediate CA', ru: 'Промежуточный УЦ' }, { en: 'online, issues certificates', ru: 'онлайн, выпускает сертификаты' }, '🏢', 'key', 280],
        ['l', 200, 250, { en: 'bank.example', ru: 'bank.example' }, { en: 'server certificate', ru: 'сертификат сервера' }, '📜', 'ok', 280],
        ['b', 590, 150, { en: 'Browser', ru: 'Браузер' }, { en: 'checks signatures up to a root', ru: 'проверяет подписи до корня' }, '🌐', 'ok', 260],
      ],
      edges: [['r', 'i', { en: 'signs', ru: 'подписывает' }, 'key'], ['i', 'l', { en: 'signs', ru: 'подписывает' }, 'key'], ['l', 'b', { en: 'presented', ru: 'предъявлен' }, 'ok'], ['b', 'r', { en: 'already trusts', ru: 'уже доверяет' }, 'dash']] },
    take: { en: `Trust flows down from a root you already have, one signature at a time.`, ru: `Доверие спускается от уже известного корня, подпись за подписью.` } },

  { id: 's06-039', kind: 'vs', k: ['d3-c9'], lvl: 2,
    title: { en: `CRL vs OCSP vs OCSP stapling`, ru: `CRL, OCSP и OCSP stapling` },
    body: {
      en: `<p>When a private key leaks, its certificate must be <b>revoked</b> before it expires. How does a browser find out?</p><ul><li><b>CRL</b> (certificate revocation list): the CA publishes a signed list of revoked serial numbers. Simple, but lists grow large and are only as fresh as the last update.</li><li><b>OCSP</b>: the browser asks the CA about one certificate in real time. Fresher, but slower, and the CA learns which sites you visit.</li><li><b>OCSP stapling</b>: the server fetches a fresh signed OCSP answer itself and attaches it to the handshake. Fast and private.</li></ul>`,
      ru: `<p>Когда закрытый ключ утёк, сертификат нужно <b>отозвать</b> до истечения срока. Как браузер об этом узнает?</p><ul><li><b>CRL</b> (список отзыва): УЦ публикует подписанный список отозванных серийных номеров. Просто, но списки растут и свежи лишь на момент обновления.</li><li><b>OCSP</b>: браузер в реальном времени спрашивает УЦ об одном сертификате. Свежее, но медленнее, и УЦ узнаёт, какие сайты вы посещаете.</li><li><b>OCSP stapling</b>: сервер сам получает свежий подписанный ответ OCSP и прикладывает его к рукопожатию. Быстро и приватно.</li></ul>`,
    },
    take: { en: `CRL is a published list, OCSP is a live question, stapling brings the answer along.`, ru: `CRL — опубликованный список, OCSP — живой вопрос, stapling приносит ответ с собой.` } },

  { id: 's06-040', kind: 'story', k: ['d3-c9', 'd1-c13'], lvl: 2,
    title: { en: `DigiNotar 2011: the certificate authority that was hacked`, ru: `DigiNotar 2011: взломанный удостоверяющий центр` },
    body: {
      en: `<p><b>DigiNotar</b> was a Dutch certificate authority, trusted by every major browser and used by the Dutch government. In the summer of 2011, an attacker broke into its network and issued more than 500 fraudulent certificates, including one for <b>*.google.com</b>.</p><p>With it, someone intercepted the Gmail traffic of an estimated 300,000 people, mostly in Iran. To their browsers, everything looked normal: valid padlock, valid chain, trusted root. DigiNotar had noticed the intrusion weeks earlier, but didn't tell browser makers.</p>`,
      ru: `<p><b>DigiNotar</b> — нидерландский удостоверяющий центр, которому доверяли все крупные браузеры и которым пользовалось правительство Нидерландов. Летом 2011 года атакующий проник в его сеть и выпустил более 500 поддельных сертификатов, в том числе для <b>*.google.com</b>.</p><p>С его помощью кто-то перехватывал трафик Gmail примерно 300 тысяч человек, в основном в Иране. В их браузерах всё выглядело нормально: замочек, валидная цепочка, доверенный корень. DigiNotar заметил вторжение за несколько недель до этого, но не сообщил производителям браузеров.</p>`,
    },
    take: { en: `PKI is only as trustworthy as the least careful CA your browser trusts.`, ru: `PKI надёжна ровно настолько, насколько надёжен самый небрежный УЦ, которому доверяет браузер.` } },

  { id: 's06-041', kind: 'link', k: ['d3-c9', 'd1-c13', 'd1-c4'], lvl: 2,
    title: { en: `DigiNotar: how it was caught, and what it cost`, ru: `DigiNotar: как поймали и чего это стоило` },
    body: {
      en: `<p>The fake certificate was caught by <b>certificate pinning</b>: Chrome knew which CAs Google's own sites should use, warned a user in Iran, and the user reported it publicly.</p><p>Then the chain reaction:</p><ol><li>Browsers removed DigiNotar's root: every certificate it had issued stopped working.</li><li>The Dutch government took over its operations and had to replace certificates on its own services.</li><li>Within weeks, DigiNotar went bankrupt.</li></ol><p>A supplier's failure (stage 1) became a national incident, and hiding the breach made it fatal.</p>`,
      ru: `<p>Поддельный сертификат поймали благодаря <b>закреплению сертификатов</b> (pinning): Chrome знал, какие УЦ должны быть у сайтов самого Google, предупредил пользователя в Иране, и тот сообщил об этом публично.</p><p>Дальше — цепная реакция:</p><ol><li>Браузеры удалили корень DigiNotar: все выданные им сертификаты перестали работать.</li><li>Правительство Нидерландов взяло управление на себя и было вынуждено менять сертификаты на собственных сервисах.</li><li>Через несколько недель DigiNotar обанкротился.</li></ol><p>Провал поставщика (этап 1) стал национальным инцидентом, а сокрытие взлома сделало его смертельным.</p>`,
    },
    take: { en: `A CA sells trust; once it hides a breach, it has nothing left to sell.`, ru: `УЦ продаёт доверие; скрыв взлом, он остаётся без товара.` } },

  { id: 's06-042', kind: 'idea', k: ['d3-c9'], lvl: 3,
    title: { en: `Watching the watchers: Certificate Transparency`, ru: `Кто сторожит сторожей: Certificate Transparency` },
    body: {
      en: `<p>DigiNotar showed the weak spot of PKI: any trusted CA can issue a certificate for any domain. The industry's answer was to make every issuance public.</p><p>With <b>Certificate Transparency</b> (CT), CAs record each certificate in public, append-only logs; Chrome has required this since 2018. Domain owners can monitor the logs and spot a certificate they never requested. A <b>CAA</b> DNS record adds a second guard: it lists which CAs may issue for your domain at all.</p>`,
      ru: `<p>DigiNotar показал слабое место PKI: любой доверенный УЦ может выпустить сертификат для любого домена. Ответ отрасли — сделать каждый выпуск публичным.</p><p>С <b>Certificate Transparency</b> (CT) УЦ записывают каждый сертификат в публичные журналы, куда можно только добавлять; Chrome требует этого с 2018 года. Владельцы доменов могут следить за журналами и заметить сертификат, который они не заказывали. DNS-запись <b>CAA</b> — вторая защита: в ней указано, каким УЦ вообще разрешено выпускать сертификаты для вашего домена.</p>`,
    },
    take: { en: `Monitor CT logs for your domains; a certificate you didn't order is an incident.`, ru: `Следите за журналами CT для своих доменов: незаказанный сертификат — это инцидент.` } },

  { id: 's06-043', kind: 'think', k: ['d3-c9'], lvl: 2,
    title: { en: `The key file on a stolen laptop`, ru: `Файл ключа на украденном ноутбуке` },
    body: {
      en: `<p>An administrator's laptop is stolen from a car. It wasn't encrypted, and it held a copy of the private key for your customer portal's TLS certificate, which is valid for another ten months.</p><p>The admin suggests: "Let's just renew the certificate early, nobody will use it." What do you do?</p>`,
      ru: `<p>У администратора из машины украли ноутбук. Он не был зашифрован, и на нём лежала копия закрытого ключа для TLS-сертификата клиентского портала, который действует ещё десять месяцев.</p><p>Администратор предлагает: «Давай просто досрочно продлим сертификат, никто им не воспользуется». Что вы сделаете?</p>`,
    },
    reveal: {
      en: `<p><b>Treat the key as compromised.</b> Follow the incident process: generate a <b>new key pair</b>, get a new certificate for it, install it, then <b>revoke</b> the old certificate so nobody can impersonate the portal with it. "Renewing" with the same key would leave the stolen key valid and useful.</p><p>Then fix the causes: private keys don't belong on laptops (keep them in an HSM or key vault), and laptops need full-disk encryption. Report the theft too: the laptop may hold more than one secret.</p>`,
      ru: `<p><b>Считайте ключ скомпрометированным.</b> Запустите процесс реагирования на инцидент: создайте <b>новую пару ключей</b>, получите на неё новый сертификат, установите, а затем <b>отзовите</b> старый, чтобы никто не мог выдать себя за портал. «Продление» с тем же ключом оставило бы украденный ключ действующим и полезным.</p><p>Потом устраните причины: закрытым ключам не место на ноутбуках (храните их в HSM или хранилище ключей), а ноутбукам нужно полнодисковое шифрование. И сообщите о краже: на ноутбуке может быть не один секрет.</p>`,
    },
    take: { en: `A leaked private key means new keys and revocation, not just a new date.`, ru: `Утёкший закрытый ключ — это новые ключи и отзыв, а не просто новая дата.` } },

  { id: 's06-044', kind: 'story', k: ['d3-c10', 'd4-c5'], lvl: 2,
    title: { en: `Heartbleed 2014: the server that said too much`, ru: `Heartbleed 2014: сервер, который сболтнул лишнего` },
    body: {
      en: `<p>TLS has a small "heartbeat" feature: one side sends a short message and its length, and the other echoes it back to show the connection is alive. In April 2014, researchers disclosed that <b>OpenSSL</b>, used by a large share of the world's web servers, never checked the stated length.</p><p>Ask for "hat, 64,000 letters", and the server sent back "hat" plus 64 KB of whatever sat next to it in memory: session cookies, passwords, sometimes the server's <b>private key</b>. The bug had been in OpenSSL for two years, and its use left no trace in normal logs.</p>`,
      ru: `<p>В TLS есть маленькая функция heartbeat: одна сторона отправляет короткое сообщение и его длину, другая возвращает его обратно, показывая, что соединение живо. В апреле 2014 года исследователи сообщили, что <b>OpenSSL</b>, на котором работала большая доля веб-серверов мира, не проверял заявленную длину.</p><p>Попросите «кот, 64 000 букв» — и сервер вернёт «кот» плюс 64 КБ того, что лежало рядом в памяти: cookie сеансов, пароли, иногда <b>закрытый ключ</b> сервера. Ошибка жила в OpenSSL два года, а её использование не оставляло следов в обычных журналах.</p>`,
    },
    take: { en: `Perfect math can't save a careless implementation.`, ru: `Безупречная математика не спасёт небрежную реализацию.` } },

  { id: 's06-045', kind: 'link', k: ['d3-c9', 'd3-c10', 'd4-c5'], lvl: 3,
    title: { en: `Cleaning up after Heartbleed: the order matters`, ru: `Уборка после Heartbleed: порядок важен` },
    body: {
      en: `<p>Heartbleed tied together most of this stage. The right clean-up followed the chain of trust:</p><ol><li><b>Patch</b> OpenSSL first. New keys on a leaky server would leak too.</li><li>Generate <b>new key pairs</b> and get new certificates.</li><li><b>Revoke</b> the old certificates: their keys may have leaked.</li><li><b>End sessions</b> and ask users to change passwords, since both may have been read from memory.</li></ol><p>Servers with forward secrecy had one comfort: a stolen key couldn't decrypt traffic recorded before.</p>`,
      ru: `<p>Heartbleed связал воедино большую часть этого этапа. Правильная уборка шла по цепочке доверия:</p><ol><li>Сначала <b>обновить</b> OpenSSL. Новые ключи на дырявом сервере тоже утекут.</li><li>Создать <b>новые пары ключей</b> и получить новые сертификаты.</li><li><b>Отозвать</b> старые сертификаты: их ключи могли утечь.</li><li><b>Завершить сеансы</b> и попросить пользователей сменить пароли: и то и другое могли прочитать из памяти.</li></ol><p>У серверов с прямой секретностью было одно утешение: украденный ключ не расшифрует записанный ранее трафик.</p>`,
    },
    take: { en: `Patch, re-key, revoke, reset: in that order.`, ru: `Обновить, сменить ключи, отозвать, сбросить — именно в этом порядке.` } },

  { id: 's06-046', kind: 'idea', k: ['d3-c10'], lvl: 2,
    title: { en: `Most crypto fails in the implementation`, ru: `Криптография чаще всего ломается в реализации` },
    body: {
      en: `<p>Real breaks rarely defeat the algorithm. They exploit how it was built or used:</p><ul><li><b>Bad randomness</b>: in 2008, a code change in Debian's OpenSSL left only about 32,000 possible keys. Every SSH and TLS key made on those systems for two years could be guessed.</li><li><b>Reused random values</b>: in 2010, researchers showed Sony signed PlayStation 3 software with the same "random" number every time, which let them compute Sony's private key.</li><li><b>Bugs</b> like Heartbleed, and misuse like Adobe's ECB.</li></ul>`,
      ru: `<p>Настоящие взломы редко побеждают сам алгоритм. Они используют то, как его сделали или применили:</p><ul><li><b>Плохая случайность</b>: в 2008 году изменение в коде OpenSSL в Debian оставило всего около 32 000 возможных ключей. Каждый ключ SSH и TLS, созданный на таких системах за два года, можно было подобрать.</li><li><b>Повторное случайное значение</b>: в 2010 году исследователи показали, что Sony подписывала программы для PlayStation 3 каждый раз с одним и тем же «случайным» числом, и это позволило вычислить закрытый ключ Sony.</li><li><b>Ошибки</b> вроде Heartbleed и неправильное применение вроде ECB у Adobe.</li></ul>`,
    },
    take: { en: `Use proven libraries, keep them patched, and never improvise with randomness.`, ru: `Берите проверенные библиотеки, обновляйте их и не импровизируйте со случайностью.` } },

  { id: 's06-047', kind: 'vs', k: ['d3-c10'], lvl: 3,
    title: { en: `What the attacker has: four classic attack models`, ru: `Что есть у атакующего: четыре классические модели` },
    body: {
      en: `<ul><li><b>Ciphertext only</b>: just intercepted messages. The hardest position; frequency analysis breaks simple ciphers this way.</li><li><b>Known plaintext</b>: some messages and their encrypted versions. Enigma's daily weather reports gave Bletchley Park exactly this.</li><li><b>Chosen plaintext</b>: the attacker can get any text of their choice encrypted and study the output.</li><li><b>Chosen ciphertext</b>: the attacker can get chosen ciphertexts decrypted, for example by watching how a server reacts to tampered messages.</li></ul><p>A modern cipher must hold up in all four.</p>`,
      ru: `<ul><li><b>Только шифртекст</b>: лишь перехваченные сообщения. Самая трудная позиция; так частотный анализ ломает простые шифры.</li><li><b>Известный открытый текст</b>: некоторые сообщения и их зашифрованные версии. Ежедневные сводки погоды Enigma давали Блетчли-парку именно это.</li><li><b>Выбранный открытый текст</b>: атакующий может зашифровать любой текст на выбор и изучить результат.</li><li><b>Выбранный шифртекст</b>: атакующий может получить расшифровку выбранных шифртекстов, например наблюдая, как сервер реагирует на изменённые сообщения.</li></ul><p>Современный шифр должен выстоять во всех четырёх.</p>`,
    },
    take: { en: `The more the attacker can see or choose, the stronger the model, and the stronger the cipher must be.`, ru: `Чем больше атакующий видит и выбирает, тем сильнее модель и тем сильнее должен быть шифр.` } },

  { id: 's06-048', kind: 'idea', k: ['d3-c10', 'd3-c4'], lvl: 3,
    title: { en: `Side channels: listening to the machine`, ru: `Побочные каналы: подслушать машину` },
    body: {
      en: `<p>A <b>side-channel attack</b> doesn't touch the math. It measures what the device leaks while computing: how long each operation takes (<b>timing</b>), how much <b>power</b> it draws, its <b>electromagnetic</b> emissions, even <b>sound</b>. Small differences reveal bits of the key.</p><p><b>Fault injection</b> goes further: glitch the voltage or clock and study the wrong answers. Defences: constant-time code, and keys kept in hardware built to resist probing, such as smart cards, TPMs and HSMs.</p>`,
      ru: `<p><b>Атака по побочным каналам</b> не трогает математику. Она измеряет, что устройство выдаёт во время вычислений: сколько длится каждая операция (<b>время</b>), сколько <b>энергии</b> оно потребляет, его <b>электромагнитное</b> излучение и даже <b>звук</b>. Мелкие различия раскрывают биты ключа.</p><p><b>Внесение сбоев</b> идёт дальше: исказить напряжение или тактовую частоту и изучить неверные ответы. Защита: код с постоянным временем выполнения и ключи в оборудовании, устойчивом к зондированию, — смарт-картах, TPM и HSM.</p>`,
    },
    take: { en: `A device can leak its key through time, power and noise.`, ru: `Устройство может выдать ключ временем, энергией и шумом.` } },

  { id: 's06-049', kind: 'idea', k: ['d3-c9'], lvl: 2,
    title: { en: `The algorithm is easy; the keys are hard`, ru: `Алгоритм — это просто; ключи — это сложно` },
    body: {
      en: `<p>Choosing AES-256 takes a minute. Looking after its keys for ten years is the real work. Every breach in this stage came down to a key: made with bad randomness, stored next to the data, left on a laptop, leaked from memory, or trusted when it shouldn't have been.</p><p><b>Key management</b> covers a key's whole life, with a few firm rules: one key, one purpose (don't sign and encrypt with the same key); keys never in source code; and every key has an owner and an expiry.</p>`,
      ru: `<p>Выбрать AES-256 — дело минуты. Ухаживать за его ключами десять лет — вот настоящая работа. Каждый взлом на этом этапе сводился к ключу: сделан с плохой случайностью, лежал рядом с данными, остался на ноутбуке, утёк из памяти или пользовался доверием, которого не заслуживал.</p><p><b>Управление ключами</b> охватывает всю жизнь ключа, и в нём несколько твёрдых правил: один ключ — одно назначение (не подписывать и не шифровать одним ключом); ключи никогда не лежат в исходном коде; у каждого ключа есть владелец и срок.</p>`,
    },
    take: { en: `Crypto is usually lost through key management, not through the cipher.`, ru: `Криптографию обычно проигрывают в управлении ключами, а не в шифре.` } },

  { id: 's06-050', kind: 'picture', k: ['d3-c9'], lvl: 2,
    title: { en: `The life of a key`, ru: `Жизнь ключа` },
    body: {
      en: `<p>Each step has its own way to fail. Make a policy for each one, and make someone own it.</p>`,
      ru: `<p>На каждом шаге можно ошибиться по-своему. Нужна политика для каждого шага и ответственный за него.</p>`,
    },
    dg: { title: { en: `Key lifecycle`, ru: `Жизненный цикл ключа` }, h: 260,
      nodes: [
        ['g', 130, 60, { en: 'Generate', ru: 'Создание' }, { en: 'strong random numbers', ru: 'надёжный генератор случайных чисел' }, '🎲', 'key', 230],
        ['d', 380, 60, { en: 'Distribute', ru: 'Распределение' }, { en: 'over a protected channel', ru: 'по защищённому каналу' }, '📦', 'key', 230],
        ['s', 630, 60, { en: 'Store and use', ru: 'Хранение и применение' }, { en: 'HSM or key vault, not code', ru: 'HSM или хранилище, не код' }, '🔐', 'key', 230],
        ['r', 630, 200, { en: 'Rotate', ru: 'Смена' }, { en: 'on schedule and on suspicion', ru: 'по графику и при подозрении' }, '🔄', 'key', 230],
        ['v', 380, 200, { en: 'Revoke', ru: 'Отзыв' }, { en: 'when compromised or retired', ru: 'при компрометации или выводе' }, '⛔', 'bad', 230],
        ['x', 130, 200, { en: 'Destroy', ru: 'Уничтожение' }, { en: 'every copy, backups too', ru: 'все копии, и в резервных' }, '🗑', 'dim', 230],
      ],
      edges: [['g', 'd', null, 'key'], ['d', 's', null, 'key'], ['s', 'r', null, 'key'], ['r', 'v', null, 'key'], ['v', 'x', null, 'key']] },
    take: { en: `Generate well, store safely, rotate often, revoke fast, destroy completely.`, ru: `Создать надёжно, хранить безопасно, менять часто, отзывать быстро, уничтожать полностью.` } },

  { id: 's06-051', kind: 'vs', k: ['d3-c4'], lvl: 2,
    title: { en: `TPM vs HSM vs secure enclave`, ru: `TPM, HSM и защищённый анклав` },
    body: {
      en: `<ul><li><b>TPM</b> (Trusted Platform Module): a small chip in one computer. Protects that machine's keys, checks the boot process, and holds the disk encryption key.</li><li><b>HSM</b> (hardware security module): a dedicated, tamper-resistant appliance or cloud service. Generates and guards keys for a whole organization: CA root keys, payment keys, database keys. Keys can be used inside it, but not taken out.</li><li><b>Secure enclave / TEE</b> (Intel SGX, ARM TrustZone, Apple's Secure Enclave): an isolated area inside the processor that protects code and data <b>in use</b>.</li></ul>`,
      ru: `<ul><li><b>TPM</b> (доверенный платформенный модуль): маленький чип в одном компьютере. Защищает ключи этой машины, проверяет процесс загрузки и хранит ключ шифрования диска.</li><li><b>HSM</b> (аппаратный модуль безопасности): отдельное защищённое от вскрытия устройство или облачный сервис. Создаёт и охраняет ключи всей организации: корневые ключи УЦ, платёжные ключи, ключи баз данных. Ключами можно пользоваться внутри, но вынуть их нельзя.</li><li><b>Защищённый анклав / TEE</b> (Intel SGX, ARM TrustZone, Secure Enclave у Apple): изолированная область внутри процессора, защищающая код и данные <b>в использовании</b>.</li></ul>`,
    },
    take: { en: `TPM guards one machine, HSM guards the organization's keys, an enclave guards data in use.`, ru: `TPM охраняет одну машину, HSM — ключи организации, анклав — данные в использовании.` } },

  { id: 's06-052', kind: 'idea', k: ['d3-c4'], lvl: 2,
    title: { en: `What the TPM does at boot`, ru: `Что делает TPM при загрузке` },
    body: {
      en: `<ul><li><b>Secure boot</b>: each stage of startup checks the digital signature of the next; unsigned or altered boot code is refused. That stops rootkits that load before the operating system.</li><li><b>Measured boot</b>: the TPM records a hash of each component that loads. A server can later prove to a remote checker that it started clean; this is <b>attestation</b>.</li><li><b>Sealing</b>: the TPM releases the disk encryption key (for example BitLocker's) only if the measurements match. Move the disk to another machine, or tamper with the boot chain, and the key stays locked.</li></ul>`,
      ru: `<ul><li><b>Безопасная загрузка</b> (secure boot): каждый этап запуска проверяет цифровую подпись следующего; неподписанный или изменённый загрузочный код отвергается. Это останавливает руткиты, загружающиеся раньше операционной системы.</li><li><b>Измеряемая загрузка</b> (measured boot): TPM записывает хеш каждого загружаемого компонента. Позже сервер может доказать удалённой проверке, что запустился чистым; это <b>аттестация</b>.</li><li><b>Запечатывание</b> (sealing): TPM выдаёт ключ шифрования диска (например, BitLocker) только при совпадении измерений. Переставьте диск в другую машину или вмешайтесь в загрузку — ключ останется запертым.</li></ul>`,
    },
    take: { en: `The TPM uses signatures and hashes to make sure the machine starts the way it should.`, ru: `TPM с помощью подписей и хешей следит, чтобы машина запускалась как положено.` } },

  { id: 's06-053', kind: 'think', k: ['d3-c4', 'd2-c3'], lvl: 3,
    title: { en: `The lost laptop with BitLocker`, ru: `Потерянный ноутбук с BitLocker` },
    body: {
      en: `<p>A finance manager loses a laptop on a train. It has BitLocker full-disk encryption using the TPM only: the laptop boots straight to the Windows login screen with no extra PIN. It holds budget forecasts for an unannounced acquisition.</p><p>Is the data safe? Is there anything left to do?</p>`,
      ru: `<p>Финансовый менеджер потерял ноутбук в поезде. На нём полнодисковое шифрование BitLocker только с TPM: ноутбук сам загружается до экрана входа Windows, без дополнительного PIN. На нём прогнозы бюджета по неанонсированной сделке поглощения.</p><p>Данные в безопасности? Осталось ли что-то сделать?</p>`,
    },
    reveal: {
      en: `<p><b>Probably safe against a casual finder, and that's not enough here.</b> Pulling the disk gets a thief nothing. But with TPM-only mode the key is released automatically at boot, and researchers have shown that on some laptops it can be sniffed from the chip's connection. Windows login attacks are another path.</p><p>So follow the process: report it as a security incident, revoke the device's certificates and sessions, and let the data owner assess the risk. For highly sensitive roles, policy should require a <b>pre-boot PIN</b> on top of the TPM.</p>`,
      ru: `<p><b>Скорее всего, от случайного нашедшего — да, но здесь этого мало.</b> Вынутый диск вору ничего не даст. Но в режиме только с TPM ключ выдаётся автоматически при загрузке, и исследователи показали, что на некоторых ноутбуках его можно перехватить на линии связи с чипом. Атаки на вход в Windows — ещё один путь.</p><p>Поэтому действуйте по процессу: оформите инцидент безопасности, отзовите сертификаты и сеансы устройства, а оценку риска оставьте владельцу данных. Для особо чувствительных ролей политика должна требовать <b>PIN до загрузки</b> поверх TPM.</p>`,
    },
    take: { en: `Encryption lowers the risk of a lost device; the incident process still runs.`, ru: `Шифрование снижает риск потери устройства, но процесс реагирования всё равно запускается.` } },

  { id: 's06-054', kind: 'back', back: 's03-036', k: ['d2-c5', 'd3-c9'], lvl: 2,
    title: { en: `Crypto-shredding again: whose keys?`, ru: `Снова криптошреддинг: чьи ключи?` },
    body: {
      en: `<p>In stage 3, leaving a cloud provider ended with crypto-shredding: destroy the keys, and every copy of the data becomes noise. Now you can see what that requires.</p><p>Cloud key services offer levels of control: keys managed fully by the provider; <b>customer-managed keys</b> in the provider's KMS; <b>bring your own key</b> (BYOK), generated in your HSM and imported; or <b>hold your own key</b>, where the key never leaves your HSM. The more you hold, the more confidently you can shred, and the more you must protect and back up yourself.</p>`,
      ru: `<p>На этапе 3 уход от облачного провайдера закончился криптошреддингом: уничтожьте ключи — и все копии данных превратятся в шум. Теперь видно, что для этого нужно.</p><p>Облачные сервисы ключей дают разные уровни контроля: ключи полностью у провайдера; <b>ключи, управляемые клиентом</b>, в KMS провайдера; <b>свой ключ</b> (BYOK), созданный в вашем HSM и импортированный; или <b>ключ только у себя</b> (HYOK), который никогда не покидает ваш HSM. Чем больше у вас в руках, тем увереннее можно уничтожить ключ и тем больше приходится самим защищать и резервировать.</p>`,
    },
    take: { en: `You can only shred with keys you control, and you must never lose them by accident.`, ru: `Уничтожить можно только ключи, которыми вы управляете, и случайно терять их нельзя.` } },

  { id: 's06-055', kind: 'vs', k: ['d3-c9', 'd7-c3'], lvl: 3,
    title: { en: `Split knowledge vs dual control vs M of N`, ru: `Разделённое знание, двойной контроль, M из N` },
    body: {
      en: `<p>Some keys are too powerful for one person, such as a root CA key or a master database key.</p><ul><li><b>Split knowledge</b>: each person knows only part of the secret, for example half of a passphrase. Nobody can rebuild it alone.</li><li><b>Dual control</b>: two people must be present and act together, like the two keys of a bank vault.</li><li><b>M of N</b>: any M out of N key holders (say 3 of 5) can together recover the key. It tolerates absence, not collusion.</li></ul><p>It's separation of duties from stage 2, applied to keys.</p>`,
      ru: `<p>Некоторые ключи слишком сильны для одного человека, например корневой ключ УЦ или главный ключ базы данных.</p><ul><li><b>Разделённое знание</b>: каждый знает только часть секрета, например половину парольной фразы. Восстановить его в одиночку никто не может.</li><li><b>Двойной контроль</b>: двое должны присутствовать и действовать вместе, как два ключа от банковского хранилища.</li><li><b>M из N</b>: любые M из N держателей (например, 3 из 5) вместе восстанавливают ключ. Переживает отсутствие людей, но не сговор.</li></ul><p>Это разделение обязанностей с этапа 2, применённое к ключам.</p>`,
    },
    take: { en: `Make the most powerful keys need more than one person.`, ru: `Самым сильным ключам нужен не один человек.` } },

  { id: 's06-056', kind: 'idea', k: ['d3-c9'], lvl: 3,
    title: { en: `Key escrow and key recovery`, ru: `Депонирование и восстановление ключей` },
    body: {
      en: `<p>If an employee leaves or forgets their passphrase, can the company still read the encrypted business files? Only with a plan.</p><p><b>Key recovery</b> keeps a protected copy of encryption keys inside the organization, usable by designated recovery agents, ideally under M-of-N control. <b>Key escrow</b> gives a copy to a third party. The famous example: the US government's <b>Clipper chip</b> (1993), which would have put a copy of every phone key in government escrow; public opposition and a discovered flaw sank it.</p><p>Recover encryption keys, but never escrow signing keys: a copy of a signing key ruins nonrepudiation.</p>`,
      ru: `<p>Если сотрудник уволился или забыл парольную фразу, сможет ли компания прочитать зашифрованные рабочие файлы? Только если это продумано заранее.</p><p><b>Восстановление ключей</b> хранит защищённую копию ключей шифрования внутри организации для назначенных агентов восстановления, лучше всего под контролем M из N. <b>Депонирование</b> (key escrow) отдаёт копию третьей стороне. Знаменитый пример: <b>Clipper chip</b> правительства США (1993), который положил бы копию ключа каждого телефона на хранение государству; общественное сопротивление и найденный изъян его похоронили.</p><p>Ключи шифрования восстанавливают, а ключи подписи не депонируют никогда: копия ключа подписи губит неотказуемость.</p>`,
    },
    take: { en: `Keep a way back to encryption keys, never a spare copy of a signing key.`, ru: `Путь назад к ключам шифрования — да, запасная копия ключа подписи — никогда.` } },

  { id: 's06-057', kind: 'back', back: 's04-036', k: ['d5-c4', 'd3-c10'], lvl: 3,
    title: { en: `Kerberos again: the crypto under the tickets`, ru: `Снова Kerberos: криптография под билетами` },
    body: {
      en: `<p>In stage 4, Kerberos gave you tickets instead of sending passwords. Underneath it's all <b>symmetric</b> crypto: each service has a secret key derived from its account's password, and its tickets are encrypted with that key.</p><p>That enables <b>Kerberoasting</b>. Any logged-in user can request a ticket for a service, take it home and guess the service account's password offline, as fast as their GPUs allow. Defences: long random passwords for service accounts (or managed service accounts), AES instead of the old RC4 encryption, and alerts on unusual ticket requests.</p>`,
      ru: `<p>На этапе 4 Kerberos выдавал билеты вместо пересылки паролей. Под капотом там <b>симметричная</b> криптография: у каждой службы есть секретный ключ, полученный из пароля её учётной записи, и её билеты шифруются этим ключом.</p><p>Отсюда <b>Kerberoasting</b>. Любой вошедший пользователь может запросить билет к службе, унести его и подбирать пароль служебной учётной записи офлайн так быстро, как позволяют видеокарты. Защита: длинные случайные пароли служебных учётных записей (или управляемые служебные учётные записи), AES вместо старого шифрования RC4 и оповещения о необычных запросах билетов.</p>`,
    },
    take: { en: `A key derived from a weak password is a weak key, wherever it's used.`, ru: `Ключ из слабого пароля — слабый ключ, где бы его ни применяли.` } },

  { id: 's06-058', kind: 'idea', k: ['d3-c10', 'd5-c4'], lvl: 2,
    title: { en: `Replay: the valid message, sent twice`, ru: `Повтор: правильное сообщение, отправленное дважды` },
    body: {
      en: `<p>Encryption and signatures prove a message is genuine. They don't prove it's <b>new</b>. In a <b>replay attack</b>, the attacker records a valid message, such as a login or a "transfer €500" request, and simply sends it again later.</p><p>Defences make every message unique in time: a <b>nonce</b> (a number used once, which the server remembers), a <b>timestamp</b> with a short window (Kerberos rejects tickets whose clocks are more than five minutes apart by default), or a sequence number.</p>`,
      ru: `<p>Шифрование и подписи доказывают, что сообщение подлинное. Но не доказывают, что оно <b>новое</b>. При <b>атаке повтора</b> атакующий записывает правильное сообщение — вход или запрос «перевести 500 €» — и просто отправляет его снова позже.</p><p>Защита делает каждое сообщение уникальным во времени: <b>nonce</b> (число, используемое один раз, которое сервер запоминает), <b>метка времени</b> с коротким окном (Kerberos по умолчанию отвергает билеты, если часы расходятся больше чем на пять минут) или порядковый номер.</p>`,
    },
    take: { en: `Genuine isn't the same as fresh; add a nonce, timestamp or counter.`, ru: `Подлинное не значит свежее: добавьте nonce, метку времени или счётчик.` } },

  { id: 's06-059', kind: 'back', back: 's04-041', k: ['d5-c5', 'd5-c7', 'd3-c7'], lvl: 3,
    title: { en: `Federation again: everything rests on a signature`, ru: `Снова федерация: всё держится на подписи` },
    body: {
      en: `<p>In stage 4, an identity provider told apps who you are with a SAML assertion or an OpenID Connect ID token. Both are <b>digitally signed</b> by the identity provider. The app trusts the token only because the signature checks out against the provider's public key.</p><p>Two consequences. Apps must really verify the signature: some token libraries once accepted tokens marked "no signature" (alg: none). And the identity provider's <b>signing key</b> is the master key to every connected app: whoever steals it can sign in as anyone. Keep it in an HSM.</p>`,
      ru: `<p>На этапе 4 поставщик удостоверений сообщал приложениям, кто вы, с помощью утверждения SAML или ID-токена OpenID Connect. Оба <b>подписаны цифровой подписью</b> поставщика. Приложение верит токену только потому, что подпись сходится с его открытым ключом.</p><p>Два следствия. Приложения должны действительно проверять подпись: некоторые библиотеки когда-то принимали токены с пометкой «без подписи» (alg: none). А <b>ключ подписи</b> поставщика удостоверений — мастер-ключ ко всем подключённым приложениям: кто его украл, войдёт под кем угодно. Храните его в HSM.</p>`,
    },
    take: { en: `In federation, the identity provider's signing key is the key to everything.`, ru: `В федерации ключ подписи поставщика удостоверений — ключ от всего.` } },

  { id: 's06-060', kind: 'back', back: 's04-014', k: ['d5-c1', 'd3-c7'], lvl: 2,
    title: { en: `Passkeys again: public-key crypto in your pocket`, ru: `Снова passkeys: криптография с открытым ключом в кармане` },
    body: {
      en: `<p>In stage 4, passkeys left "nothing to phish". Here is why. At registration, your device creates a <b>key pair</b> for that one site. The site stores only the public key. At login, the site sends a random challenge, your device signs it with the private key after you unlock it, and the site checks the signature.</p><p>No shared secret ever travels or sits in the site's database, so a breach leaks nothing reusable. And the device signs only for the exact site it registered with, so a look-alike domain gets nothing.</p>`,
      ru: `<p>На этапе 4 passkeys оставляли «нечего выманивать». Вот почему. При регистрации устройство создаёт <b>пару ключей</b> для одного конкретного сайта. Сайт хранит только открытый ключ. При входе сайт присылает случайный вызов, устройство после разблокировки подписывает его закрытым ключом, а сайт проверяет подпись.</p><p>Общий секрет никогда не передаётся и не лежит в базе сайта, поэтому утечка не даёт ничего пригодного для повторного использования. А устройство подписывает только для того сайта, где регистрировалось, и сайт-двойник ничего не получит.</p>`,
    },
    take: { en: `A passkey is a signature on a fresh challenge, bound to one site.`, ru: `Passkey — это подпись свежего вызова, привязанная к одному сайту.` } },

  { id: 's06-061', kind: 'vs', k: ['d3-c9'], lvl: 2,
    title: { en: `S/MIME vs PGP: two ways to trust a key`, ru: `S/MIME и PGP: два способа доверять ключу` },
    body: {
      en: `<p>Both sign and encrypt email end to end, so even the mail servers can't read it. They differ in who vouches for keys.</p><ul><li><b>S/MIME</b> uses certificates from a CA, the same hierarchy as websites. It fits companies: the organization issues and manages everyone's certificates, and mail clients support it out of the box.</li><li><b>PGP</b> (and OpenPGP/GPG) uses a <b>web of trust</b>: users sign each other's keys, and you trust a key if people you trust have signed it. No central authority, but more work for each user.</li></ul>`,
      ru: `<p>Оба подписывают и шифруют почту из конца в конец, так что даже почтовые серверы её не прочтут. Разница — в том, кто ручается за ключи.</p><ul><li><b>S/MIME</b> использует сертификаты от УЦ, ту же иерархию, что и у сайтов. Подходит компаниям: организация выпускает сертификаты всем и управляет ими, а почтовые клиенты поддерживают это из коробки.</li><li><b>PGP</b> (и OpenPGP/GPG) использует <b>сеть доверия</b>: пользователи подписывают ключи друг друга, и вы доверяете ключу, если его подписали те, кому вы доверяете. Без центральной власти, но больше работы каждому.</li></ul>`,
    },
    take: { en: `S/MIME trusts a hierarchy; PGP trusts a web of people.`, ru: `S/MIME доверяет иерархии, PGP — сети людей.` } },

  { id: 's06-062', kind: 'back', back: 's05-054', k: ['d4-c9', 'd3-c7'], lvl: 3,
    title: { en: `VPNs again: the crypto in the corridor`, ru: `Снова VPN: криптография в коридоре` },
    body: {
      en: `<p>In stage 5, a VPN was a private corridor across the internet. Inside an IPsec VPN you'll now recognize every part. <b>IKE</b> sets up the tunnel: Diffie-Hellman to agree on keys, and certificates or a pre-shared key to prove each side's identity. <b>ESP</b> then carries the data with AES-GCM.</p><p>The weak spot is often the identity part. A short <b>pre-shared key</b>, the same for every site and never changed, can be guessed offline from a captured handshake. For anything beyond a lab, use certificates, or long random keys rotated on a schedule.</p>`,
      ru: `<p>На этапе 5 VPN был частным коридором через интернет. Внутри IPsec VPN вы теперь узнаете каждую часть. <b>IKE</b> строит туннель: Диффи — Хеллман для согласования ключей, сертификаты или общий ключ — чтобы доказать, кто на каждой стороне. Затем <b>ESP</b> несёт данные с AES-GCM.</p><p>Слабое место — часто именно часть про личность. Короткий <b>общий ключ</b> (pre-shared key), одинаковый для всех площадок и никогда не меняющийся, можно подобрать офлайн по перехваченному рукопожатию. Всё серьёзнее лаборатории — на сертификатах или длинных случайных ключах со сменой по графику.</p>`,
    },
    take: { en: `A VPN is only as strong as the way its ends prove who they are.`, ru: `VPN силён ровно настолько, насколько надёжно его концы доказывают, кто они.` } },

  { id: 's06-063', kind: 'back', back: 's01-004', k: ['d3-c7', 'd3-c9', 'd1-c13'], lvl: 3,
    title: { en: `Stuxnet again: signed by trusted companies`, ru: `Снова Stuxnet: подписан доверенными компаниями` },
    body: {
      en: `<p>Stuxnet, from stage 1, had another trick. Its drivers were <b>code-signed</b> with genuine certificates belonging to two Taiwanese hardware makers, Realtek and JMicron. The private keys had been stolen, so Windows saw software from known vendors and installed it.</p><p>A code signature proves <b>who</b> signed and that the code hasn't changed since. It doesn't prove the code is safe, or that the signer still controls the key. Software vendors' signing keys belong in an HSM, with a process around every signature.</p>`,
      ru: `<p>У Stuxnet с этапа 1 был ещё один приём. Его драйверы были <b>подписаны</b> настоящими сертификатами двух тайваньских производителей оборудования — Realtek и JMicron. Закрытые ключи украли, поэтому Windows видела программы известных поставщиков и устанавливала их.</p><p>Подпись кода доказывает, <b>кто</b> подписал и что код с тех пор не менялся. Она не доказывает, что код безопасен или что подписавший всё ещё контролирует свой ключ. Ключам подписи у разработчиков ПО место в HSM, а каждая подпись должна проходить через процесс.</p>`,
    },
    take: { en: `Signed means "from the key holder", not "safe".`, ru: `«Подписано» значит «от держателя ключа», а не «безопасно».` } },

  { id: 's06-064', kind: 'link', k: ['d3-c6', 'd3-c7', 'd1-c1'], lvl: 2,
    title: { en: `Ransomware: the same tools, pointed at you`, ru: `Вымогатели: те же инструменты, направленные на вас` },
    body: {
      en: `<p>Ransomware is hybrid crypto from this stage, used by the attacker. It encrypts each file with a fast symmetric key (AES or ChaCha20), then locks those keys with the attacker's <b>public key</b>. Only their private key, which never touches your network, can unlock them.</p><p>Brute force won't help: the math is sound. The defences come from other stages: patching and MFA to keep attackers out, segmentation to limit the spread, and offline backups that make the key worthless. Availability (stage 1) is what's held hostage.</p>`,
      ru: `<p>Вымогательское ПО — это гибридная криптография с этого этапа в руках атакующего. Оно шифрует каждый файл быстрым симметричным ключом (AES или ChaCha20), а затем запирает эти ключи <b>открытым ключом</b> атакующего. Открыть их может только его закрытый ключ, который никогда не бывает в вашей сети.</p><p>Перебор не поможет: математика надёжна. Защита — с других этапов: обновления и MFA, чтобы не пустить атакующего, сегментация, чтобы ограничить распространение, и офлайн-копии, которые обесценивают ключ. В заложниках — доступность (этап 1).</p>`,
    },
    take: { en: `You can't out-math ransomware; you out-prepare it.`, ru: `Вымогателя не победить математикой — только подготовкой.` } },

  { id: 's06-065', kind: 'idea', k: ['d3-c7', 'd3-c10'], lvl: 3,
    title: { en: `Quantum computers and the crypto clock`, ru: `Квантовые компьютеры и криптографические часы` },
    body: {
      en: `<p>A large enough quantum computer running <b>Shor's algorithm</b> would break RSA, ECC and Diffie-Hellman outright. <b>Grover's algorithm</b> only halves the strength of symmetric keys, so AES-256 stays safe.</p><p>Nobody has such a machine yet, but attackers can <b>harvest now, decrypt later</b>: record traffic today and wait. In 2024, NIST published the first post-quantum standards: <b>ML-KEM</b> (FIPS 203) for key exchange, and <b>ML-DSA</b> (FIPS 204) and <b>SLH-DSA</b> (FIPS 205) for signatures. Browsers already mix ML-KEM into TLS key exchange.</p>`,
      ru: `<p>Достаточно большой квантовый компьютер с <b>алгоритмом Шора</b> полностью сломал бы RSA, ECC и Диффи — Хеллмана. <b>Алгоритм Гровера</b> лишь вдвое снижает стойкость симметричных ключей, так что AES-256 остаётся безопасным.</p><p>Такой машины пока ни у кого нет, но атакующие могут <b>собирать сейчас, расшифровывать потом</b>: записать трафик сегодня и подождать. В 2024 году NIST опубликовал первые постквантовые стандарты: <b>ML-KEM</b> (FIPS 203) для обмена ключами, <b>ML-DSA</b> (FIPS 204) и <b>SLH-DSA</b> (FIPS 205) для подписей. Браузеры уже подмешивают ML-KEM в обмен ключами TLS.</p>`,
    },
    take: { en: `Quantum threatens public-key crypto first; symmetric survives with longer keys.`, ru: `Квантовые компьютеры угрожают прежде всего асимметрии; симметрия выживает с длинными ключами.` } },

  { id: 's06-066', kind: 'think', k: ['d3-c7', 'd1-c9'], lvl: 3,
    title: { en: `Where to start with post-quantum`, ru: `С чего начать переход на постквантовую криптографию` },
    body: {
      en: `<p>The board read a news article about quantum computers and asks you for a plan. The company has thousands of systems using RSA and ECC: websites, VPNs, code signing, encrypted archives of medical research that must stay confidential for 30 years.</p><p>Where do you start?</p>`,
      ru: `<p>Совет директоров прочитал статью о квантовых компьютерах и просит у вас план. В компании тысячи систем на RSA и ECC: сайты, VPN, подпись кода, зашифрованные архивы медицинских исследований, которые должны оставаться секретными 30 лет.</p><p>С чего вы начнёте?</p>`,
    },
    reveal: {
      en: `<p><b>With an inventory and a risk ranking, not a product.</b> First find where crypto is used, which algorithms, and who owns each system. Then rank by how long the data must stay secret: the 30-year medical archives are exposed to "harvest now, decrypt later" today, while a session cookie valid for an hour isn't.</p><p>Move the long-lived data first, and push for <b>crypto agility</b>: systems that can swap algorithms through configuration rather than a rewrite. The next migration will come too.</p>`,
      ru: `<p><b>С инвентаризации и ранжирования рисков, а не с продукта.</b> Сначала выясните, где используется криптография, какие алгоритмы и кто владеет каждой системой. Затем ранжируйте по тому, как долго данные должны оставаться секретными: 30-летние медицинские архивы уязвимы для «собирай сейчас, расшифруй потом» уже сегодня, а cookie сеанса на час — нет.</p><p>Первыми переводите долгоживущие данные и добивайтесь <b>криптогибкости</b>: чтобы системы меняли алгоритмы настройкой, а не переписыванием. Будет и следующая миграция.</p>`,
    },
    take: { en: `Inventory first, then protect what must stay secret longest.`, ru: `Сначала инвентаризация, потом защита того, что должно оставаться секретным дольше всего.` } },

  { id: 's06-067', kind: 'vs', k: ['d3-c6', 'd3-c7', 'd3-c8'], lvl: 2,
    title: { en: `Which tool for which goal`, ru: `Какой инструмент для какой цели` },
    body: {
      en: `<ul><li>Keep bulk data secret → <b>AES</b> (GCM) or ChaCha20.</li><li>Agree on a key with a stranger → <b>ECDHE</b> (or ML-KEM).</li><li>Detect accidental change → <b>SHA-256</b>.</li><li>Prove a message came from a partner who shares your key → <b>HMAC</b>.</li><li>Prove who signed, so they can't deny it → <b>digital signature</b> (RSA, ECDSA, ML-DSA).</li><li>Bind a public key to a name → <b>certificate</b> from a CA.</li><li>Store passwords → <b>Argon2</b>, bcrypt, scrypt or PBKDF2, with a salt.</li></ul>`,
      ru: `<ul><li>Сохранить в тайне большой объём данных → <b>AES</b> (GCM) или ChaCha20.</li><li>Договориться о ключе с незнакомцем → <b>ECDHE</b> (или ML-KEM).</li><li>Заметить случайное изменение → <b>SHA-256</b>.</li><li>Доказать, что сообщение от партнёра с общим ключом → <b>HMAC</b>.</li><li>Доказать, кто подписал, чтобы он не мог отпереться → <b>цифровая подпись</b> (RSA, ECDSA, ML-DSA).</li><li>Связать открытый ключ с именем → <b>сертификат</b> от УЦ.</li><li>Хранить пароли → <b>Argon2</b>, bcrypt, scrypt или PBKDF2 с солью.</li></ul>`,
    },
    take: { en: `Name the goal first; the tool follows from it.`, ru: `Сначала назовите цель, инструмент следует из неё.` } },

  { id: 's06-068', kind: 'think', k: ['d3-c6', 'd3-c10'], lvl: 2,
    title: { en: `"Our own algorithm, so nobody can know it"`, ru: `«Свой алгоритм — значит, никто его не знает»` },
    body: {
      en: `<p>A senior developer proposes encrypting customer files with an algorithm he designed himself. "AES is public, so attackers have studied it. Ours is secret, so it's safer." The project manager likes that it costs nothing.</p><p>What's your advice?</p>`,
      ru: `<p>Ведущий разработчик предлагает шифровать файлы клиентов алгоритмом собственной разработки. «AES публичный, атакующие его изучили. Наш секретный, значит, надёжнее». Руководителю проекта нравится, что это ничего не стоит.</p><p>Что вы посоветуете?</p>`,
    },
    reveal: {
      en: `<p><b>Use a standard algorithm from a well-maintained library.</b> AES has withstood decades of public attack by the best cryptographers; a home-made cipher has withstood nobody. Its secrecy lasts until someone reverse-engineers the program, and then it can't be changed the way a key can (Kerckhoffs, the start of this stage).</p><p>Contracts and regulations often require approved algorithms anyway, and an auditor will flag it. Spend the effort where crypto really fails: key management.</p>`,
      ru: `<p><b>Используйте стандартный алгоритм из хорошо поддерживаемой библиотеки.</b> AES десятилетиями выдерживает открытые атаки лучших криптографов; самодельный шифр не выдерживал никого. Его секретность продлится, пока кто-нибудь не разберёт программу, а сменить его, как ключ, уже не выйдет (Керкгоффс, начало этапа).</p><p>К тому же договоры и регуляторы часто требуют одобренных алгоритмов, и аудитор это отметит. Тратьте силы там, где криптография действительно ломается: на управление ключами.</p>`,
    },
    take: { en: `Don't roll your own crypto; roll good key management.`, ru: `Не изобретайте свой шифр — выстраивайте хорошее управление ключами.` } },

  { id: 's06-069', kind: 'link', k: ['d3-c6', 'd3-c7', 'd3-c8', 'd3-c9', 'd5-c1'], lvl: 2,
    title: { en: `One login, the whole stage at once`, ru: `Один вход — весь этап сразу` },
    body: {
      en: `<p>You open your bank's site and sign in. In under a second:</p><ol><li>The server presents its <b>certificate</b>; the browser follows the <b>chain</b> to a trusted root and checks revocation.</li><li><b>ECDHE</b> agrees on a fresh session key, signed by the server's private key.</li><li><b>AES-GCM</b> encrypts and integrity-checks your password on the way.</li><li>The server hashes it with your <b>salt</b> using a slow function and compares.</li><li>It issues a <b>signed</b> session token; HMAC or a signature stops tampering.</li></ol><p>Every link depends on a key kept somewhere safe.</p>`,
      ru: `<p>Вы открываете сайт банка и входите. Меньше чем за секунду:</p><ol><li>Сервер предъявляет <b>сертификат</b>; браузер проходит по <b>цепочке</b> до доверенного корня и проверяет отзыв.</li><li><b>ECDHE</b> договаривается о свежем сеансовом ключе, подписанном закрытым ключом сервера.</li><li><b>AES-GCM</b> шифрует ваш пароль в пути и проверяет его целостность.</li><li>Сервер хеширует его медленной функцией с вашей <b>солью</b> и сравнивает.</li><li>Он выдаёт <b>подписанный</b> токен сеанса; HMAC или подпись не дают его подделать.</li></ol><p>Каждое звено зависит от ключа, который где-то надёжно хранится.</p>`,
    },
    take: { en: `Real systems chain every crypto tool together, and every chain hangs on its keys.`, ru: `Реальные системы связывают все инструменты в цепь, и каждая цепь держится на ключах.` } },

  { id: 's06-070', kind: 'recap', lvl: 1,
    title: { en: `Stage 6 in seven lines`, ru: `Этап 6 в семи строках` },
    body: {
      en: `<p>Tap any line to go back to its card.</p>`,
      ru: `<p>Нажмите на строку, чтобы вернуться к карточке.</p>`,
    },
    items: [
      ['s06-005', { en: `Symmetric (AES) is fast but must share its key; it can't prove who sent what.`, ru: `Симметричное (AES) быстрое, но делится ключом и не доказывает авторство.` }],
      ['s06-016', { en: `Asymmetric: encrypt with the recipient's public key, sign with your own private key.`, ru: `Асимметричное: шифруют открытым ключом получателя, подписывают своим закрытым.` }],
      ['s06-019', { en: `Hybrid: asymmetric agrees on a session key, symmetric moves the data.`, ru: `Гибрид: асимметрия согласует сеансовый ключ, симметрия передаёт данные.` }],
      ['s06-028', { en: `Hash proves integrity, HMAC adds authenticity, a signature adds nonrepudiation.`, ru: `Хеш — целостность, HMAC добавляет подлинность, подпись — неотказуемость.` }],
      ['s06-033', { en: `Passwords: unique salt and a slow hash, never encryption.`, ru: `Пароли: уникальная соль и медленный хеш, никогда не шифрование.` }],
      ['s06-040', { en: `PKI is as trustworthy as its CAs: DigiNotar, revocation, CT logs.`, ru: `PKI надёжна, как её УЦ: DigiNotar, отзыв, журналы CT.` }],
      ['s06-049', { en: `Crypto is usually lost in key management: keep keys in an HSM, rotate, revoke.`, ru: `Криптографию обычно проигрывают в управлении ключами: HSM, смена, отзыв.` }],
    ],
    take: { en: `Next: building secure systems, where these tools become part of the architecture.`, ru: `Дальше: как строят защищённые системы, где эти инструменты становятся частью архитектуры.` } },
] });
