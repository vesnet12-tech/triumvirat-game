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
    if (type !== 'armor' && type !== 'helmet' && type !== 'accessory' && !key.startsWith('arm_') && !key.startsWith('acc_')) {
        newCatalog[key] = catalog[key];
    } else if (key === 'boss_ent_acc' || key === 'boss_ent_acc_leg') {
        newCatalog[key] = catalog[key];
    }
}

const RARITY_TIERS = [
  { tier: 1, r: 'common', tName: 'Стандартный', mult: 1, p: 1500 },
  { tier: 2, r: 'uncommon', tName: 'Искусный', mult: 2.2, p: 4000 },
  { tier: 3, r: 'rare', tName: 'Редкий', mult: 3.5, p: 10000 },
  { tier: 4, r: 'epic', tName: 'Эпический', mult: 5.5, p: 25000 },
  { tier: 5, r: 'legendary', tName: 'Легендарный', mult: 9.0, p: 60000 },
];

const ARMOR_ARCHETYPES = [
  { id: 'plate', n: 'Латный Доспех', d: 'Сверхпрочная стальная броня.', stats: (m, t) => ({ defense: 8*m, maxHp: 15*m, resistFire: t>3?5*m:0 }) },
  { id: 'chain', n: 'Кольчуга', d: 'Надёжная защитная сетка', stats: (m, t) => ({ defense: 5*m, magicDefense: 3*m, maxHp: 10*m }) },
  { id: 'leather', n: 'Кожаная Куртка', d: 'Легко двигаться, неплохо защищает.', stats: (m, t) => ({ defense: 4*m, agility: 4*m }) },
  { id: 'robe', n: 'Магическая Мантия', d: 'Впитывает магические искажения.', stats: (m, t) => ({ magicDefense: 6*m, maxMp: 20*m }) },
  { id: 'mystic', n: 'Мистическое Одеяние', d: 'Защищает разум и дух.', stats: (m, t) => ({ magicDefense: 8*m, maxHp: 8*m, mpRegen: t>2?m:0 }) },
  { id: 'vampire', n: 'Броня Крови', d: 'Восполняет силы владельца за счет врагов.', stats: (m, t) => ({ defense: 4*m, lifesteal: t>2?Math.floor(m*1.5):1, attack: 2*m }) },
  { id: 'berserker', n: 'Облачение Ярости', d: 'Защита минимальна, главное — урон.', stats: (m, t) => ({ defense: 2*m, maxHp: 25*m, attack: 3*m, critDamage: t>2?2*m:0 }) },
  { id: 'knight', n: 'Доспех Рыцаря', d: 'Освященная броня.', stats: (m, t) => ({ defense: 7*m, magicDefense: 4*m, resistHoly: t>2?5*m:0, hpRegen: t>3?m:0 }) },
  { id: 'assassin', n: 'Доспех Тени', d: 'Сплошной камуфляж.', stats: (m, t) => ({ defense: 3*m, agility: 6*m, dodgeChance: t>2?m:0 }) },
  { id: 'warlock', n: 'Одеяние Скверны', d: 'Осколки душ вплетены в ткань.', stats: (m, t) => ({ magicDefense: 5*m, magicAttack: 4*m, resistDark: t>2?5*m:0 }) },
  { id: 'juggernaut', n: 'Броня Колосса', d: 'Невероятно массивная броня.', stats: (m, t) => ({ defense: 10*m, maxHp: 30*m, agility: -2*m }) },
  { id: 'wind', n: 'Доспех Ветра', d: 'Позволяет парить над полем боя.', stats: (m, t) => ({ agility: 8*m, dodgeChance: t>1?Math.floor(1.5*m):0 }) },
  { id: 'thorns', n: 'Шипастая Броня', d: 'Ранит нападающего.', stats: (m, t) => ({ defense: 6*m, attack: 4*m }) },
  { id: 'druid', n: 'Кора Первородного Энта', d: 'Живая природная броня.', stats: (m, t) => ({ defense: 5*m, magicDefense: 5*m, hpRegen: t>1?Math.floor(1.5*m):0, resistPoison: t>2?5*m:0 }) },
  { id: 'gladiator', n: 'Доспех Чемпиона', d: 'Броня ветеранов Арены.', stats: (m, t) => ({ defense: 6*m, attack: 2*m, agility: 2*m, critRate: t>2?m:0 }) },
  { id: 'geomancer', n: 'Каменная Роба', d: 'Создана из цельного куска гранита.', stats: (m, t) => ({ defense: 7*m, magicAttack: 3*m, maxMp: 10*m }) },
  { id: 'ice', n: 'Покров Стужи', d: 'Охлаждает пыл врагов.', stats: (m, t) => ({ defense: 4*m, magicDefense: 4*m, resistIce: t>1?8*m:0, maxHp: 10*m }) },
  { id: 'lightning', n: 'Громовой Табард', d: 'Искрится при каждом шаге.', stats: (m, t) => ({ agility: 5*m, attack: 3*m, resistLightning: t>1?8*m:0 }) },
  { id: 'sun', n: 'Броня Рассвета', d: 'Излучает тепло и свет.', stats: (m, t) => ({ defense: 6*m, magicDefense: 6*m, hpRegen: t>2?m:0, mpRegen: t>3?m:0 }) },
  { id: 'void', n: 'Броня Пустоты', d: 'Поглощает любой урон.', stats: (m, t) => ({ defense: 8*m, magicDefense: 8*m, maxHp: 20*m, dodgeChance: t>3?m:0 }) }
];

const ACC_ARCHETYPES = [
  { id: 'crit', n: 'Осколок Звезды (Крит)', d: 'Увеличивает шанс и силу крита.', stats: (m, t) => ({ critRate: 2*Math.sqrt(m)*t, critDamage: 5*m*t }) },
  { id: 'life', n: 'Амулет Жизни', d: 'Дарует колоссальное здоровье.', stats: (m, t) => ({ maxHp: 25*m, hpRegen: t>1?m:0 }) },
  { id: 'mana', n: 'Амулет Маны', d: 'Расширяет магический резерв.', stats: (m, t) => ({ maxMp: 25*m, mpRegen: t>1?m:0 }) },
  { id: 'str', n: 'Пояс Силы', d: 'Чистая физическая мощь.', stats: (m, t) => ({ attack: 4*m, maxHp: 15*m }) },
  { id: 'int', n: 'Кольцо Мудреца', d: 'Стимулирует разум.', stats: (m, t) => ({ magicAttack: 4*m, maxMp: 15*m }) },
  { id: 'agi', n: 'Браслет Ветра', d: 'Ускоряет реакцию.', stats: (m, t) => ({ agility: 5*m, dodgeChance: t>2?m:0 }) },
  { id: 'def', n: 'Щит Компактный', d: 'Миниатюрный силовой барьер.', stats: (m, t) => ({ defense: 6*m, magicDefense: 3*m }) },
  { id: 'mdef', n: 'Сфера Отрицания', d: 'Рассеивает заклинания.', stats: (m, t) => ({ magicDefense: 6*m, defense: 3*m }) },
  { id: 'vam', n: 'Кулон Вампира', d: 'Превращает урон в жизнь.', stats: (m, t) => ({ lifesteal: 2*t*Math.sqrt(m), attack: 2*m }) },
  { id: 'all', n: 'Кольцо Баланса', d: 'Усиливает все атрибуты понемногу.', stats: (m, t) => ({ maxHp: 10*m, maxMp: 10*m, attack: 2*m, defense: 2*m, magicAttack: 2*m, magicDefense: 2*m, agility: 2*m }) },
  { id: 'fire', n: 'Печать Ифрита', d: 'Увеличивает сопротивление огню.', stats: (m, t) => ({ resistFire: 10*m, maxHp: 15*m, hpRegen: t>2?m:0 }) },
  { id: 'ice', n: 'Ледяной Кристалл', d: 'Увеличивает сопротивление льду.', stats: (m, t) => ({ resistIce: 10*m, magicDefense: 4*m, maxMp: 10*m }) },
  { id: 'lightning', n: 'Искра Бури', d: 'Увеличивает сопротивление молнии.', stats: (m, t) => ({ resistLightning: 10*m, agility: 4*m, dodgeChance: t>2?m:0 }) },
  { id: 'poison', n: 'Противоядие в Колбе', d: 'Защищает от ядов.', stats: (m, t) => ({ resistPoison: 10*m, maxHp: 20*m, hpRegen: t>1?m:0 }) },
  { id: 'dark', n: 'Осколок Безмятежности', d: 'Отводит тьму.', stats: (m, t) => ({ resistDark: 10*m, magicDefense: 5*m, mpRegen: t>2?m:0 }) },
  { id: 'holy', n: 'Капля Солнца', d: 'Защищает от божественного гнева.', stats: (m, t) => ({ resistHoly: 10*m, defense: 5*m, hpRegen: t>1?m:0 }) },
  { id: 'berserk', n: 'Кольцо Ярости', d: 'Значительно повышает урон, понижая защиту.', stats: (m, t) => ({ attack: 6*m, critRate: 2*t, defense: -3*m, magicDefense: -3*m }) },
  { id: 'sniper', n: 'Глаз Сокола', d: 'Фокусирует зрение на уязвимых точках.', stats: (m, t) => ({ agility: 4*m, critDamage: 6*m*t, critRate: t }) },
  { id: 'regen', n: 'Амулет Феникса', d: 'Быстро исцеляет раны.', stats: (m, t) => ({ hpRegen: 3*m, mpRegen: 3*m, maxHp: 10*m, maxMp: 10*m }) },
  { id: 'god', n: 'Символ Абсолюта', d: 'Легендарная реликвия старых богов.', stats: (m, t) => ({ maxHp: 30*m, attack: 5*m, defense: 5*m, lifesteal: 2*t, dodgeChance: t }) }
];

let armorIdCount = 1;
ARMOR_ARCHETYPES.forEach(arch => {
  RARITY_TIERS.forEach(tier => {
    const id = `arm_new_${armorIdCount++}`;
    let rawStats = arch.stats(tier.mult, tier.tier);
    let finalStats: any = {};
    for (let k in rawStats) {
       if (rawStats[k] && Math.abs(rawStats[k]) >= 1) {
          finalStats[k] = Math.floor(rawStats[k]);
       }
    }
    newCatalog[id] = {
      id,
      name: `${arch.n} (${tier.tName})`,
      description: arch.d + (tier.tier === 5 ? ' Воистину легендарная вещь.' : ''),
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
    const id = `acc_new_${accIdCount++}`;
    let rawStats = arch.stats(tier.mult, tier.tier);
    let finalStats: any = {};
    for (let k in rawStats) {
       if (rawStats[k] && Math.abs(rawStats[k]) >= 1) {
          finalStats[k] = Math.floor(rawStats[k]);
       }
    }
    
    // special boost for legendaries
    if (tier.tier === 5) {
       if (finalStats.critRate) finalStats.critRate += 5;
       if (finalStats.dodgeChance) finalStats.dodgeChance += 5;
       if (finalStats.lifesteal) finalStats.lifesteal += 3;
    }
    
    newCatalog[id] = {
      id,
      name: `${arch.n} (${tier.tName})`,
      description: arch.d,
      type: 'accessory',
      rarity: tier.r,
      price: tier.p,
      stats: finalStats
    };
  });
});

const newContent = content.substring(0, catalogMatch.index) + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(newCatalog, null, 2) + ';\n' + content.substring(catalogMatch.index + catalogMatch[0].length);

fs.writeFileSync('items.ts', newContent);
console.log(`Generated 100 armors and 100 accessories.`);
