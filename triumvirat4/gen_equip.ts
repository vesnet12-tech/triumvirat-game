import * as fs from 'fs';

const content = fs.readFileSync('items.ts', 'utf8');
const catalogMatch = content.match(/export const ITEM_CATALOG: Record<string, Item> = (\{([\s\S]+?)\});/);

if (!catalogMatch) {
  console.log("Could not find ITEM_CATALOG");
  process.exit(1);
}

let catalogText = catalogMatch[1].replace(/ as any/g, '');
const catalog = eval('(' + catalogText + ')');

// Remove old armors and accessories
const newCatalog: any = {};
for (const key in catalog) {
    const type = catalog[key].type;
    if (type !== 'armor' && type !== 'helmet' && type !== 'accessory' && !key.startsWith('arm_req_') && !key.startsWith('acc_req_')) {
        newCatalog[key] = catalog[key];
    }
}

const CLASSES = [
  "Воин", "Маг", "Разбойник", "Лучник", "Жрец", 
  "Паладин", "Друид", "Бард", "Монах", "Некромант", 
  "Ассасин", "Берсерк", "Шаман", "Рыцарь Смерти", 
  "Иллюзионист", "Алхимик", "Охотник", "Инженер", 
  "Чернокнижник", "Боец"
];

const RARITIES = [
  { r: 'common', name: 'Обычн.', mult: 1, p: 1000 },
  { r: 'common', name: 'Прочн.', mult: 1.2, p: 1500 },
  { r: 'uncommon', name: 'Необычн.', mult: 1.5, p: 2500 },
  { r: 'uncommon', name: 'Редк.', mult: 1.8, p: 3500 },
  { r: 'uncommon', name: 'Особая', mult: 2.0, p: 5000 },
  { r: 'rare', name: 'Мастерск.', mult: 2.5, p: 8000 },
  { r: 'rare', name: 'Гранд.', mult: 3.0, p: 12000 },
  { r: 'epic', name: 'Эпическ.', mult: 4.0, p: 20000 },
  { r: 'epic', name: 'Мифическ.', mult: 4.5, p: 30000 },
  { r: 'legendary', name: 'Легендарн.', mult: 6.0, p: 50000 },
];

function getStatsForClass(cls: string, mult: number) {
  let stats: any = {};
  if (['Воин', 'Берсерк', 'Рыцарь Смерти', 'Паладин'].includes(cls)) {
    stats.defense = Math.floor(4 * mult);
    stats.maxHp = Math.floor(10 * mult);
    if (mult >= 4.0) stats.hpRegen = Math.floor(1 * mult);
  } else if (['Маг', 'Иллюзионист', 'Чернокнижник', 'Алхимик', 'Некромант'].includes(cls)) {
    stats.magicDefense = Math.floor(5 * mult);
    stats.maxMp = Math.floor(12 * mult);
    if (mult >= 4.0) stats.mpRegen = Math.floor(1 * mult);
  } else if (['Разбойник', 'Ассасин', 'Лучник', 'Охотник', 'Инженер'].includes(cls)) {
    stats.defense = Math.floor(3 * mult);
    stats.agility = Math.floor(2 * mult);
    if (mult >= 4.0) stats.dodgeChance = Math.floor(1 * mult);
  } else if (['Жрец', 'Бард'].includes(cls)) {
    stats.magicDefense = Math.floor(4 * mult);
    stats.maxHp = Math.floor(8 * mult);
    stats.maxMp = Math.floor(8 * mult);
	if (mult >= 4.0) stats.mpRegen = Math.floor(1 * mult);
  } else if (['Друид', 'Шаман', 'Монах', 'Боец'].includes(cls)) {
    stats.defense = Math.floor(3 * mult);
    stats.maxHp = Math.floor(9 * mult);
    stats.agility = Math.floor(1 * mult);
	if (mult >= 4.0) stats.dodgeChance = Math.floor(1 * mult);
  }
  return stats;
}

const engNames: any = {
  "Воин": "war", "Маг": "mag", "Разбойник": "rog", "Лучник": "arc", "Жрец": "pri",
  "Паладин": "pal", "Друид": "dru", "Бард": "bar", "Монах": "mon", "Некромант": "nec",
  "Ассасин": "ass", "Берсерк": "ber", "Шаман": "sha", "Рыцарь Смерти": "dk",
  "Иллюзионист": "ill", "Алхимик": "alc", "Охотник": "hun", "Инженер": "eng",
  "Чернокнижник": "wlo", "Боец": "fig"
};

let aid = 1;
for (const cls of CLASSES) {
  RARITIES.forEach((tier, i) => {
    const id = `arm_${engNames[cls]}_${i+1}`;
    newCatalog[id] = {
      id: id,
      name: `${tier.name} броня (${cls})`,
      description: `Броня, предназначенная для класса ${cls}.`,
      type: 'armor',
      rarity: tier.r,
      price: tier.p,
      stats: getStatsForClass(cls, tier.mult),
      allowedClasses: [cls]
    };
  });
}

// Generate Accessories (no classes)
const ACC_TYPES = [
  { n: 'Амулет Здоровья', s: { maxHp: 8 } },
  { n: 'Кольцо Маны', s: { maxMp: 8 } },
  { n: 'Пояс Силы', s: { attack: 2 } },
  { n: 'Амулет Защиты', s: { defense: 2 } },
  { n: 'Кольцо Мага', s: { magicAttack: 2 } },
  { n: 'Оберег Духа', s: { magicDefense: 2 } },
  { n: 'Браслет Ловкости', s: { agility: 2 } },
  { n: 'Кольцо Острого Глаза', s: { critRate: 1 } },
  { n: 'Амулет Вампира', s: { lifesteal: 1 } },
  { n: 'Плащ Теней', s: { dodgeChance: 1 } }
];

let accId = 1;
ACC_TYPES.forEach(at => {
  RARITIES.forEach((tier, i) => {
    const id = `acc_gen_${accId++}`;
    const stats: any = {};
    for (let k in at.s) {
      stats[k] = Math.floor((at.s as any)[k] * tier.mult);
    }
    
    newCatalog[id] = {
      id: id,
      name: `${tier.name} ${at.n}`,
      description: `Универсальный могущественный аксессуар.`,
      type: 'accessory',
      rarity: tier.r,
      price: tier.p,
      stats: stats
    };
  });
});

const newContent = content.substring(0, catalogMatch.index) + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(newCatalog, null, 2) + ';\n' + content.substring(catalogMatch.index + catalogMatch[0].length);

fs.writeFileSync('items.ts', newContent);
console.log(`Generated ${CLASSES.length * 10} armors and ${ACC_TYPES.length * 10} accessories.`);
