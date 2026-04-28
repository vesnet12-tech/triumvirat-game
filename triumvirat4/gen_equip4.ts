import * as fs from 'fs';

const content = fs.readFileSync('items.ts', 'utf8');
const catalogMatch = content.match(/export const ITEM_CATALOG: Record<string, Item> = (\{([\s\S]+?)\});/);

if (!catalogMatch) {
  console.log("Could not find ITEM_CATALOG");
  process.exit(1);
}

let catalogText = catalogMatch[1].replace(/ as any/g, '');
const catalog = eval('(' + catalogText + ')');

// Remove old generated armors and accessories
const newCatalog: any = {};
for (const key in catalog) {
    const type = catalog[key].type;
    // Keep weapons and pre-existing boss items
    if (type !== 'armor' && type !== 'helmet' && type !== 'accessory' && !key.startsWith('arm_new_') && !key.startsWith('acc_new_') && !key.startsWith('arm_gen_') && !key.startsWith('acc_gen_') && !key.startsWith('arm_req_') && !key.startsWith('acc_req_') && !key.startsWith('arm_t5_') && !key.startsWith('acc_t5_') && key !== 'boss_ent_acc' && key !== 'boss_ent_acc_leg') {
        newCatalog[key] = catalog[key];
    } else if (key === 'boss_ent_acc' || key === 'boss_ent_acc_leg') {
        newCatalog[key] = catalog[key];
    }
}

const RARITY_TIERS = [
  { tier: 1, r: 'common', tName: 'Обычный', mult: 1, p: 1500 },
  { tier: 2, r: 'uncommon', tName: 'Необычный', mult: 2.2, p: 4000 },
  { tier: 3, r: 'rare', tName: 'Редкий', mult: 4.0, p: 10000 },
  { tier: 4, r: 'epic', tName: 'Эпический', mult: 7.0, p: 25000 },
  { tier: 5, r: 'legendary', tName: 'Легендарный', mult: 12.0, p: 60000 },
];

const PERCENT_SCALING = [
  { tier: 1, val: 1 },
  { tier: 2, val: 2 },
  { tier: 3, val: 4 },
  { tier: 4, val: 7 },
  { tier: 5, val: 12 },
];

function getPercent(tier: number, base: number) {
   const scale = PERCENT_SCALING.find(p => p.tier === tier)?.val || 1;
   return Math.floor(scale * base);
}

const ARMOR_ARCHETYPES = [
  { id: 'plate', n: 'Латный Доспех', d: 'Сверхпрочная стальная броня.', stats: (m: number, t: number) => ({ defense: 10*m, maxHp: 20*m, resistFire: getPercent(t, 2) }) },
  { id: 'chain', n: 'Кольчуга', d: 'Надёжная защитная сетка', stats: (m: number, t: number) => ({ defense: 6*m, magicDefense: 4*m, maxHp: 15*m }) },
  { id: 'leather', n: 'Кожаная Куртка', d: 'Легко двигаться, неплохо защищает.', stats: (m: number, t: number) => ({ defense: 5*m, agility: 5*m }) },
  { id: 'robe', n: 'Магическая Мантия', d: 'Впитывает магические искажения.', stats: (m: number, t: number) => ({ magicDefense: 8*m, maxMp: 25*m }) },
  { id: 'mystic', n: 'Мистическое Одеяние', d: 'Защищает разум и дух.', stats: (m: number, t: number) => ({ magicDefense: 10*m, maxHp: 10*m, mpRegen: getPercent(t, 1.5) }) },
  { id: 'vampire', n: 'Броня Крови', d: 'Восполняет силы владельца за счет врагов.', stats: (m: number, t: number) => ({ defense: 5*m, lifesteal: getPercent(t, 1), attack: 3*m }) },
  { id: 'berserker', n: 'Облачение Ярости', d: 'Защита минимальна, главное — урон.', stats: (m: number, t: number) => ({ defense: 3*m, maxHp: 30*m, attack: 4*m, critDamage: getPercent(t, 2) }) },
  { id: 'knight', n: 'Доспех Рыцаря', d: 'Освященная броня.', stats: (m: number, t: number) => ({ defense: 8*m, magicDefense: 5*m, resistHoly: getPercent(t, 2), hpRegen: getPercent(t, 1) }) },
  { id: 'assassin', n: 'Доспех Тени', d: 'Сплошной камуфляж.', stats: (m: number, t: number) => ({ defense: 4*m, agility: 7*m, dodgeChance: getPercent(t, 1.5) }) },
  { id: 'warlock', n: 'Одеяние Скверны', d: 'Осколки душ вплетены в ткань.', stats: (m: number, t: number) => ({ magicDefense: 7*m, magicAttack: 5*m, resistDark: getPercent(t, 2) }) },
  { id: 'juggernaut', n: 'Броня Колосса', d: 'Невероятно массивная броня.', stats: (m: number, t: number) => ({ defense: 12*m, maxHp: 40*m, agility: -2*m }) },
  { id: 'wind', n: 'Доспех Ветра', d: 'Позволяет парить над полем боя.', stats: (m: number, t: number) => ({ agility: 10*m, dodgeChance: getPercent(t, 2) }) },
  { id: 'thorns', n: 'Шипастая Броня', d: 'Ранит нападающего.', stats: (m: number, t: number) => ({ defense: 7*m, attack: 5*m }) },
  { id: 'druid', n: 'Кора Первородного Энта', d: 'Живая природная броня.', stats: (m: number, t: number) => ({ defense: 6*m, magicDefense: 6*m, hpRegen: getPercent(t, 1.5), resistPoison: getPercent(t, 2) }) },
  { id: 'gladiator', n: 'Доспех Чемпиона', d: 'Броня ветеранов Арены.', stats: (m: number, t: number) => ({ defense: 7*m, attack: 3*m, agility: 3*m, critRate: getPercent(t, 1) }) },
  { id: 'geomancer', n: 'Каменная Роба', d: 'Создана из цельного куска гранита.', stats: (m: number, t: number) => ({ defense: 8*m, magicAttack: 4*m, maxMp: 12*m }) },
  { id: 'ice', n: 'Покров Стужи', d: 'Охлаждает пыл врагов.', stats: (m: number, t: number) => ({ defense: 5*m, magicDefense: 5*m, resistIce: getPercent(t, 3), maxHp: 15*m }) },
  { id: 'lightning', n: 'Громовой Табард', d: 'Искрится при каждом шаге.', stats: (m: number, t: number) => ({ agility: 6*m, attack: 4*m, resistLightning: getPercent(t, 3) }) },
  { id: 'sun', n: 'Броня Рассвета', d: 'Излучает тепло и свет.', stats: (m: number, t: number) => ({ defense: 7*m, magicDefense: 7*m, hpRegen: getPercent(t, 1.5), mpRegen: getPercent(t, 1.5) }) },
  { id: 'void', n: 'Броня Пустоты', d: 'Поглощает любой урон.', stats: (m: number, t: number) => ({ defense: 9*m, magicDefense: 9*m, maxHp: 25*m, dodgeChance: getPercent(t, 1) }) },
  { id: 'shadow', n: 'Теневой Доспех', d: 'Скрыт в вечной полутьме.', stats: (m: number, t: number) => ({ defense: 4*m, magicDefense: 4*m, agility: 8*m, resistDark: getPercent(t, 2) }) },
  { id: 'paladin', n: 'Кираса Паладина', d: 'Символ чистой веры.', stats: (m: number, t: number) => ({ defense: 9*m, magicDefense: 3*m, hpRegen: getPercent(t, 1) }) },
  { id: 'bone', n: 'Костяная Броня', d: 'Прочна и невероятно легка.', stats: (m: number, t: number) => ({ defense: 5*m, maxMp: 15*m, magicAttack: 2*m }) },
  { id: 'crystal', n: 'Кристаллический Доспех', d: 'Отражает магические удары.', stats: (m: number, t: number) => ({ defense: 3*m, magicDefense: 10*m, maxHp: 10*m }) },
  { id: 'dragon', n: 'Чешуя Дракона', d: 'Только самое горячее пламя способно ее повредить.', stats: (m: number, t: number) => ({ defense: 8*m, magicDefense: 6*m, resistFire: getPercent(t, 4) }) },
  { id: 'sea', n: 'Доспех Глубин', d: 'Покрыта илом и ракушками.', stats: (m: number, t: number) => ({ defense: 6*m, magicDefense: 5*m, resistIce: getPercent(t, 3), maxHp: 20*m }) },
  { id: 'forest', n: 'Покров Леса', d: 'Маскирует среди деревьев.', stats: (m: number, t: number) => ({ defense: 4*m, agility: 5*m, maxHp: 12*m, hpRegen: getPercent(t, 1) }) },
  { id: 'moon', n: 'Мантия Луны', d: 'Серебристый свет оберегает разум.', stats: (m: number, t: number) => ({ magicDefense: 9*m, magicAttack: 3*m, maxMp: 15*m }) },
  { id: 'star', n: 'Одеяние Звезд', d: 'Излучает неземную энергию.', stats: (m: number, t: number) => ({ magicDefense: 7*m, maxMp: 20*m, mpRegen: getPercent(t, 2) }) },
  { id: 'iron', n: 'Железная Броня', d: 'Самая простая, но надёжная защита.', stats: (m: number, t: number) => ({ defense: 7*m, maxHp: 10*m }) },
  { id: 'gold', n: 'Золотой Доспех', d: 'Тяжелый и выглядит богато.', stats: (m: number, t: number) => ({ defense: 6*m, maxHp: 10*m, resistHoly: getPercent(t, 1) }) },
  { id: 'silver', n: 'Серебряная Кольчуга', d: 'Отражает темную магию.', stats: (m: number, t: number) => ({ defense: 5*m, magicDefense: 5*m, resistDark: getPercent(t, 3) }) },
  { id: 'silk', n: 'Шелковая Роба', d: 'Тонкая, легкая ткань.', stats: (m: number, t: number) => ({ magicDefense: 5*m, agility: 3*m, maxMp: 10*m }) },
  { id: 'runic', n: 'Рунический Доспех', d: 'Испещрен магическими символами.', stats: (m: number, t: number) => ({ defense: 6*m, magicDefense: 6*m, magicAttack: 2*m }) },
  { id: 'beast', n: 'Шкура Зверя', d: 'Сила первобытной природы.', stats: (m: number, t: number) => ({ defense: 5*m, attack: 4*m, maxHp: 15*m }) },
  { id: 'ghost', n: 'Призрачный Саван', d: 'Оружие проходит сквозь него.', stats: (m: number, t: number) => ({ magicDefense: 8*m, dodgeChance: getPercent(t, 2) }) },
  { id: 'demon', n: 'Демоническая Броня', d: 'Пропитана злобой.', stats: (m: number, t: number) => ({ defense: 7*m, attack: 5*m, resistHoly: -getPercent(t, 1), resistDark: getPercent(t, 3) }) },
  { id: 'angel', n: 'Ангельское Одеяние', d: 'Светится внутренним светом.', stats: (m: number, t: number) => ({ magicDefense: 8*m, hpRegen: getPercent(t, 2), resistHoly: getPercent(t, 3), resistDark: -getPercent(t, 1) }) },
  { id: 'royal', n: 'Королевский Гвардеец', d: 'Церемониальный, но рабочий.', stats: (m: number, t: number) => ({ defense: 7*m, maxHp: 20*m, magicDefense: 2*m }) },
  { id: 'chaos', n: 'Броня Хаоса', d: 'Постоянно меняет форму.', stats: (m: number, t: number) => ({ defense: 5*m, magicDefense: 5*m, attack: 2*m, magicAttack: 2*m, agility: 2*m }) }
];

const ACC_ARCHETYPES = [
  { id: 'crit', n: 'Осколок Звезды', d: 'Увеличивает шанс крита.', stats: (m: number, t: number) => ({ critRate: getPercent(t, 1.5) }) },
  { id: 'crit_dmg', n: 'Сапфир Ярости', d: 'Увеличивает силу крита.', stats: (m: number, t: number) => ({ critDamage: getPercent(t, 4) }) },
  { id: 'life', n: 'Амулет Жизни', d: 'Дарует колоссальное здоровье.', stats: (m: number, t: number) => ({ maxHp: 30*m, hpRegen: getPercent(t, 1.5) }) },
  { id: 'mana', n: 'Амулет Маны', d: 'Расширяет магический резерв.', stats: (m: number, t: number) => ({ maxMp: 30*m, mpRegen: getPercent(t, 1.5) }) },
  { id: 'str', n: 'Пояс Силы', d: 'Чистая физическая мощь.', stats: (m: number, t: number) => ({ attack: 5*m, maxHp: 15*m }) },
  { id: 'int', n: 'Кольцо Мудреца', d: 'Стимулирует разум.', stats: (m: number, t: number) => ({ magicAttack: 5*m, maxMp: 15*m }) },
  { id: 'agi', n: 'Браслет Ветра', d: 'Ускоряет реакцию.', stats: (m: number, t: number) => ({ agility: 6*m, dodgeChance: getPercent(t, 1.5) }) },
  { id: 'def', n: 'Щит Компактный', d: 'Миниатюрный силовой барьер.', stats: (m: number, t: number) => ({ defense: 8*m, magicDefense: 4*m }) },
  { id: 'mdef', n: 'Сфера Отрицания', d: 'Рассеивает заклинания.', stats: (m: number, t: number) => ({ magicDefense: 8*m, defense: 4*m }) },
  { id: 'vam', n: 'Кулон Вампира', d: 'Превращает урон в жизнь.', stats: (m: number, t: number) => ({ lifesteal: getPercent(t, 1.2), attack: 3*m }) },
  { id: 'all', n: 'Кольцо Баланса', d: 'Усиливает все атрибуты понемногу.', stats: (m: number, t: number) => ({ maxHp: 10*m, maxMp: 10*m, attack: 2*m, defense: 2*m, magicAttack: 2*m, magicDefense: 2*m, agility: 2*m }) },
  { id: 'fire', n: 'Печать Ифрита', d: 'Увеличивает сопротивление огню.', stats: (m: number, t: number) => ({ resistFire: getPercent(t, 3), maxHp: 15*m }) },
  { id: 'ice', n: 'Ледяной Кристалл', d: 'Увеличивает сопротивление льду.', stats: (m: number, t: number) => ({ resistIce: getPercent(t, 3), magicDefense: 4*m }) },
  { id: 'lightning', n: 'Искра Бури', d: 'Увеличивает сопротивление молнии.', stats: (m: number, t: number) => ({ resistLightning: getPercent(t, 3), agility: 5*m }) },
  { id: 'poison', n: 'Противоядие в Колбе', d: 'Защищает от ядов.', stats: (m: number, t: number) => ({ resistPoison: getPercent(t, 3), maxHp: 20*m }) },
  { id: 'dark', n: 'Осколок Безмятежности', d: 'Отводит тьму.', stats: (m: number, t: number) => ({ resistDark: getPercent(t, 3), magicDefense: 5*m }) },
  { id: 'holy', n: 'Капля Солнца', d: 'Защищает от божественного гнева.', stats: (m: number, t: number) => ({ resistHoly: getPercent(t, 3), defense: 6*m }) },
  { id: 'berserk', n: 'Кольцо Ярости', d: 'Значительно повышает урон, понижая защиту.', stats: (m: number, t: number) => ({ attack: 8*m, critRate: getPercent(t, 1.5), defense: -4*m, magicDefense: -4*m }) },
  { id: 'sniper', n: 'Глаз Сокола', d: 'Фокусирует зрение на уязвимых точках.', stats: (m: number, t: number) => ({ agility: 5*m, critDamage: getPercent(t, 3) }) },
  { id: 'regen', n: 'Амулет Феникса', d: 'Быстро исцеляет раны.', stats: (m: number, t: number) => ({ hpRegen: getPercent(t, 1.5), mpRegen: getPercent(t, 1.5), maxHp: 10*m, maxMp: 10*m }) },
  { id: 'knight_acc', n: 'Орден Доблести', d: 'Дается за великие подвиги.', stats: (m: number, t: number) => ({ defense: 5*m, maxHp: 20*m, hpRegen: getPercent(t, 1) }) },
  { id: 'rogue_acc', n: 'Символ Тени', d: 'Улучшает скрытность.', stats: (m: number, t: number) => ({ agility: 4*m, dodgeChance: getPercent(t, 2) }) },
  { id: 'mage_acc', n: 'Глаз Тайны', d: 'Древний магический амулет.', stats: (m: number, t: number) => ({ magicAttack: 4*m, maxMp: 20*m, mpRegen: getPercent(t, 1) }) },
  { id: 'warrior_acc', n: 'Знак Битвы', d: 'Доспехи в миниатюре.', stats: (m: number, t: number) => ({ attack: 4*m, defense: 4*m }) },
  { id: 'priest_acc', n: 'Крест Света', d: 'Освящен многократно.', stats: (m: number, t: number) => ({ magicDefense: 5*m, resistHoly: getPercent(t, 2), hpRegen: getPercent(t, 1) }) },
  { id: 'hunter_acc', n: 'Клык Хищника', d: 'Острый, как бритва.', stats: (m: number, t: number) => ({ attack: 5*m, critRate: getPercent(t, 1) }) },
  { id: 'thief_acc', n: 'Скрытый Карман', d: 'Позволяет носить больше зелий.', stats: (m: number, t: number) => ({ agility: 5*m, maxHp: 10*m }) },
  { id: 'paladin_acc', n: 'Оберег Святого', d: 'Защищает даже от сильной тьмы.', stats: (m: number, t: number) => ({ defense: 4*m, resistDark: getPercent(t, 3) }) },
  { id: 'demon_acc', n: 'Рог Демона', d: 'Наполнен яростью преисподней.', stats: (m: number, t: number) => ({ attack: 6*m, magicAttack: 4*m, resistHoly: -getPercent(t, 2) }) },
  { id: 'dragon_acc', n: 'Чешуйка Дракона', d: 'Капля драконьей силы.', stats: (m: number, t: number) => ({ defense: 3*m, attack: 3*m, resistFire: getPercent(t, 2) }) },
  { id: 'nature_acc', n: 'Лист Вечности', d: 'Никогда не увядает.', stats: (m: number, t: number) => ({ maxHp: 15*m, maxMp: 15*m, hpRegen: getPercent(t, 1), mpRegen: getPercent(t, 1) }) },
  { id: 'ocean_acc', n: 'Жемчужина Глубин', d: 'Дыхание Океана.', stats: (m: number, t: number) => ({ magicDefense: 5*m, resistIce: getPercent(t, 3) }) },
  { id: 'time_acc', n: 'Песочные Часы', d: 'Управляет потоками времени.', stats: (m: number, t: number) => ({ agility: 5*m, dodgeChance: getPercent(t, 1) }) },
  { id: 'space_acc', n: 'Космическая Пыль', d: 'Частица далекой звезды.', stats: (m: number, t: number) => ({ magicAttack: 6*m, critDamage: getPercent(t, 2) }) },
  { id: 'blood_acc', n: 'Фиал Крови', d: 'Вкус крови освежает.', stats: (m: number, t: number) => ({ lifesteal: getPercent(t, 1.5), maxHp: 15*m }) },
  { id: 'spirit_acc', n: 'Кристалл Души', d: 'Хранит в себе часть вас.', stats: (m: number, t: number) => ({ maxMp: 25*m, magicDefense: 4*m }) },
  { id: 'iron_acc', n: 'Железный Кулак', d: 'Усиливает удары в ближнем бою.', stats: (m: number, t: number) => ({ attack: 5*m, defense: 3*m }) },
  { id: 'gold_acc', n: 'Золотой Слиток', d: 'Просто красиво.', stats: (m: number, t: number) => ({ maxHp: 5*m }) }, // Joke item, weak
  { id: 'crystal_acc', n: 'Кристальное Сердце', d: 'Прозрачное, но крепкое.', stats: (m: number, t: number) => ({ defense: 4*m, magicDefense: 4*m, maxHp: 20*m }) },
  { id: 'god_acc', n: 'Символ Абсолюта', d: 'Легендарная реликвия старых богов.', stats: (m: number, t: number) => ({ maxHp: 40*m, attack: 7*m, defense: 7*m, lifesteal: getPercent(t, 1.5), dodgeChance: getPercent(t, 1.5) }) }
];

// Special buffing effects for legendaries
const LEGENDARY_BUFFS_ARMOR = [
  { name: 'Сила Титана', desc: ' [Все базовые характеристики увеличены]' },
  { name: 'Благословение', desc: ' [Дарует невероятную выживаемость]' },
  { name: 'Неудержимость', desc: ' [Значительно повышает стойкость]' },
  { name: 'Вечная Тень', desc: ' [Дарует невероятную неуловимость]' }
];

const LEGENDARY_BUFFS_ACC = [
  { name: 'Мощь Предков', desc: ' [Усиливает основные параметры]' },
  { name: 'Аура Жизни', desc: ' [Значительный бонус к здоровью и защите]' },
  { name: 'Гнев Богов', desc: ' [Каждое попадание может стать фатальным]' },
  { name: 'Иллюзия', desc: ' [Дарует невероятную неуловимость]' },
  { name: 'Кровавая Жатва', desc: ' [Существенно увеличивает исцеление от атак]' }
];

let armorIdCount = 1;
ARMOR_ARCHETYPES.forEach(arch => {
  RARITY_TIERS.forEach(tier => {
    const id = `arm_t5_${armorIdCount++}`;
    let rawStats = arch.stats(tier.mult, tier.tier);
    let finalStats: any = {};
    for (let k in rawStats) {
       if (rawStats[k] && Math.abs(rawStats[k]) >= 1) {
          finalStats[k] = Math.floor(rawStats[k]);
       }
    }
    
    let suffix = '';
    // Legendary exclusive stat boosts
    if (tier.tier === 5) {
       let buffIndex = Math.floor(Math.random() * LEGENDARY_BUFFS_ARMOR.length);
       if (buffIndex === 0) {
           finalStats.defense = (finalStats.defense || 0) + 15;
           finalStats.magicDefense = (finalStats.magicDefense || 0) + 15;
       } else if (buffIndex === 1) {
           finalStats.maxHp = (finalStats.maxHp || 0) + 100;
           finalStats.hpRegen = (finalStats.hpRegen || 0) + 5;
           finalStats.resistPoison = (finalStats.resistPoison || 0) + 10;
       } else if (buffIndex === 2) {
           finalStats.defense = (finalStats.defense || 0) + 20;
           finalStats.resistFire = (finalStats.resistFire || 0) + 10;
           finalStats.resistIce = (finalStats.resistIce || 0) + 10;
       } else if (buffIndex === 3) {
           finalStats.dodgeChance = (finalStats.dodgeChance || 0) + 6;
           finalStats.agility = (finalStats.agility || 0) + 15;
       } 
       suffix = LEGENDARY_BUFFS_ARMOR[buffIndex].desc;
    }

    newCatalog[id] = {
      id,
      name: `${arch.n} (${tier.tName})`,
      description: arch.d + suffix,
      type: 'armor',
      rarity: tier.r,
      price: tier.p,
      stats: finalStats
    };
  });
});

let accIdCount = 1;
ACC_ARCHETYPES.forEach(arch => {
  RARITY_TIERS.forEach(tier => {
    const id = `acc_t5_${accIdCount++}`;
    let rawStats = arch.stats(tier.mult, tier.tier);
    let finalStats: any = {};
    for (let k in rawStats) {
       if (rawStats[k] && Math.abs(rawStats[k]) >= 1) {
          finalStats[k] = Math.floor(rawStats[k]);
       }
    }
    
    let suffix = '';
    // Legendary exclusive stat boosts
    if (tier.tier === 5) {
       let buffIndex = Math.floor(Math.random() * LEGENDARY_BUFFS_ACC.length);
       if (buffIndex === 0) {
           finalStats.attack = (finalStats.attack || 0) + 15;
           finalStats.defense = (finalStats.defense || 0) + 15;
           finalStats.agility = (finalStats.agility || 0) + 15;
       } else if (buffIndex === 1) {
           finalStats.maxHp = (finalStats.maxHp || 0) + 100;
           finalStats.magicDefense = (finalStats.magicDefense || 0) + 20;
       } else if (buffIndex === 2) {
           finalStats.critRate = (finalStats.critRate || 0) + 5;
           finalStats.critDamage = (finalStats.critDamage || 0) + 15;
       } else if (buffIndex === 3) {
           finalStats.dodgeChance = (finalStats.dodgeChance || 0) + 6;
       } else if (buffIndex === 4) {
           finalStats.lifesteal = (finalStats.lifesteal || 0) + 4;
       }
       suffix = LEGENDARY_BUFFS_ACC[buffIndex].desc;
    }
    
    newCatalog[id] = {
      id,
      name: `${arch.n} (${tier.tName})`,
      description: arch.d + suffix,
      type: 'accessory',
      rarity: tier.r,
      price: tier.p,
      stats: finalStats
    };
  });
});

const newContent = content.substring(0, catalogMatch.index) + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(newCatalog, null, 2) + ';\n' + content.substring(catalogMatch.index + catalogMatch[0].length);

fs.writeFileSync('items.ts', newContent);
console.log(`Generated ${ARMOR_ARCHETYPES.length * RARITY_TIERS.length} armors and ${ACC_ARCHETYPES.length * RARITY_TIERS.length} accessories.`);
