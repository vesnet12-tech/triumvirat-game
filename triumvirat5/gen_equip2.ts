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

const RARITIES = [
  { r: 'common', name: 'Обычн.', mult: 1, p: 1000 },
  { r: 'common', name: 'Прочн.', mult: 1.2, p: 1500 },
  { r: 'uncommon', name: 'Необычн.', mult: 1.6, p: 2500 },
  { r: 'uncommon', name: 'Редк.', mult: 2.0, p: 4000 },
  { r: 'uncommon', name: 'Особая', mult: 2.5, p: 6000 },
  { r: 'rare', name: 'Мастерск.', mult: 3.2, p: 9000 },
  { r: 'rare', name: 'Гранд.', mult: 4.0, p: 14000 },
  { r: 'epic', name: 'Эпическ.', mult: 5.5, p: 22000 },
  { r: 'epic', name: 'Мифическ.', mult: 7.0, p: 35000 },
  { r: 'legendary', name: 'Легендарн.', mult: 10.0, p: 60000 },
];

const ARMOR_TYPES = [
  {
    n: "Тяжелая броня", 
    desc: "Толстая сталь, отлично защищает от ударов, но тяжеловата.",
    s: (m: number) => ({ defense: Math.floor(6*m), maxHp: Math.floor(20*m), hpRegen: m >= 5 ? Math.floor(1*m) : undefined })
  },
  {
    n: "Средний доспех", 
    desc: "Кольчуга и кожа, баланс между защитой и мобильностью.",
    s: (m: number) => ({ defense: Math.floor(4*m), magicDefense: Math.floor(2*m), maxHp: Math.floor(15*m) })
  },
  {
    n: "Легкая куртка", 
    desc: "Позволяет быстро передвигаться и уклоняться от ранений.",
    s: (m: number) => ({ defense: Math.floor(3*m), agility: Math.floor(3 * Math.sqrt(m)), dodgeChance: m >= 4 ? Math.floor(1*Math.sqrt(m)): undefined })
  },
  {
    n: "Магическая мантия", 
    desc: "Пропитана зачарованными нитями, впитывает магию.",
    s: (m: number) => ({ magicDefense: Math.floor(6*m), maxMp: Math.floor(20*m), mpRegen: m >= 5 ? Math.floor(1*m) : undefined })
  },
  {
    n: "Одеяние ветра", 
    desc: "Не чувствуется на теле, идеально для ловкачей и монахов.",
    s: (m: number) => ({ defense: Math.floor(2*m), agility: Math.floor(4 * Math.sqrt(m)), attack: Math.floor(2 * Math.sqrt(m)), dodgeChance: m >= 3 ? Math.floor(2 * Math.sqrt(m)) : undefined })
  }
];

let aid = 1;
ARMOR_TYPES.forEach(at => {
  RARITIES.forEach((tier, i) => {
    const id = `arm_gen_${aid++}`;
    newCatalog[id] = {
      id: id,
      name: `${tier.name} ${at.n}`,
      description: at.desc,
      type: 'armor',
      rarity: tier.r,
      price: tier.p,
      stats: JSON.parse(JSON.stringify(at.s(tier.mult))), // remove undefineds
    };
  });
});

const ACC_TYPES = [
  { n: 'Амулет Убийцы', desc: "Камень, источающий жажду крови.", s: (m: number) => ({ attack: Math.floor(3*Math.sqrt(m)), agility: Math.floor(2*Math.sqrt(m)), critRate: Math.floor(2*Math.sqrt(m)), critDamage: Math.floor(5*Math.sqrt(m)) }) },
  { n: 'Кольцо Жизни', desc: "Дарит носителю удивительную выносливость.", s: (m: number) => ({ maxHp: Math.floor(30*m), hpRegen: Math.floor(2*Math.sqrt(m)), defense: Math.floor(2*m) }) },
  { n: 'Кулон Архимага', desc: "Пульсирует магической энергией.", s: (m: number) => ({ magicAttack: Math.floor(3*Math.sqrt(m)), maxMp: Math.floor(30*m), mpRegen: Math.floor(2*Math.sqrt(m)) }) },
  { n: 'Браслет Ветра', desc: "Шаги становятся невесомыми.", s: (m: number) => ({ agility: Math.floor(5*Math.sqrt(m)), dodgeChance: Math.floor(3*Math.sqrt(m)) }) },
  { n: 'Печать Крови', desc: "Питается болью врагов.", s: (m: number) => ({ attack: Math.floor(3*Math.sqrt(m)), lifesteal: Math.floor(2*Math.sqrt(m)) }) },
  { n: 'Амулет Защитника', desc: "Создает невидимый магический барьер.", s: (m: number) => ({ defense: Math.floor(4*m), magicDefense: Math.floor(4*m), maxHp: Math.floor(15*m) }) },
];

let accId = 1;
ACC_TYPES.forEach(at => {
  RARITIES.forEach((tier, i) => {
    const id = `acc_gen_${accId++}`;
    newCatalog[id] = {
      id: id,
      name: `${tier.name} ${at.n}`,
      description: at.desc,
      type: 'accessory',
      rarity: tier.r,
      price: tier.p,
      stats: JSON.parse(JSON.stringify(at.s(tier.mult)))
    };
  });
});

const newContent = content.substring(0, catalogMatch.index) + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(newCatalog, null, 2) + ';\n' + content.substring(catalogMatch.index + catalogMatch[0].length);

fs.writeFileSync('items.ts', newContent);
console.log(`Generated ${ARMOR_TYPES.length * 10} armors and ${ACC_TYPES.length * 10} accessories.`);
