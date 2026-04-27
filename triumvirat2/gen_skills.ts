import * as fs from 'fs';

const CLASSES = [
  "Воин", "Маг", "Разбойник", "Лучник", "Жрец",
  "Паладин", "Чернокнижник", "Друид", "Бард", "Монах",
  "Некромант", "Ассасин", "Берсерк", "Шаман", "Рыцарь Смерти",
  "Иллюзионист", "Алхимик", "Охотник", "Инженер", "Маг Крови", "Боец"
];

const SUBCLASSES = {
  "Воин": ["Гладиатор", "Защитник", "Мастер меча"],
  "Маг": ["Пиромант", "Криомант", "Арканист"],
  "Разбойник": ["Вор", "Тень", "Дуэлянт"],
  "Лучник": ["Снайпер", "Следопыт", "Арбалетчик"],
  "Жрец": ["Целитель", "Инквизитор", "Оракул"],
  "Паладин": ["Крестоносец", "Храмовник", "Мститель"],
  "Чернокнижник": ["Демонолог", "Культист", "Оккультист"],
  "Друид": ["Оборотень", "Хранитель рощи", "Повелитель стихий"],
  "Бард": ["Менестрель", "Скальд", "Танцор с клинками"],
  "Монах": ["Мастер ци", "Пьяный мастер", "Странник"],
  "Некромант": ["Повелитель костей", "Жнец душ", "Мастер чумы"],
  "Ассасин": ["Ниндзя", "Отравитель", "Ночной клинок"],
  "Берсерк": ["Кровавый страж", "Дикарь", "Разрушитель"],
  "Шаман": ["Говорящий с духами", "Повелитель бурь", "Знахарь"],
  "Рыцарь Смерти": ["Владыка льда", "Рыцарь крови", "Нечестивец"],
  "Иллюзионист": ["Мастер разума", "Трикстер", "Ткач снов"],
  "Алхимик": ["Бомбардир", "Мутант", "Мастер зелий"],
  "Охотник": ["Повелитель зверей", "Стрелок", "Траппер"],
  "Инженер": ["Механик", "Изобретатель", "Сапер"],
  "Маг Крови": ["Вампир", "Гемомант", "Жрец крови"],
  "Боец": ["Мастер единоборств", "Уличный боец", "Кикбоксер"]
};

let classConfigs = {
  "Воин": {
    style: "physical",
    baseSkills: [
      { id: "w_dmg_1", name: "Могучий удар", type: "damage", power: 140, mpCost: 15, desc: "Наносит 140% физического урона." },
      { id: "w_dmg_2", name: "Рассечение", type: "damage", power: 120, mpCost: 20, dot: {type: 'bleed', duration: 3, dmgPct: 30}, desc: "Наносит 120% физ. урона и вызывает кровотечение (30%/ход)." },
      { id: "w_buff_1", name: "Клич ярости", type: "buff", power: 0, mpCost: 20, cooldown: 5, buff: {stat: 'attack', valPct: 40, duration: 4}, desc: "Повышает физ. атаку на 40% на 4 хода." },
      { id: "w_buff_2", name: "Глухая оборона", type: "buff", power: 0, mpCost: 25, cooldown: 5, buff: {stat: 'defense', valPct: 70, duration: 3}, shieldPct: 15, desc: "Увеличивает защиту на 70% и дает щит (15% от макс. ХП)." },
      { id: "w_pass_1", name: "Закалка", type: "passive", power: 15, isPassive: true, desc: "Пассивно увеличивает здоровье и защиту на 15%." }
    ]
  },
  "Маг": {
    style: "magical",
    baseSkills: [
      { id: "m_dmg_1", name: "Огненный шар", type: "damage", power: 160, mpCost: 20, dot: {type: 'burn', duration: 3, dmgPct: 40}, desc: "Наносит 160% маг. урона. Поджигает цель (40%/ход)." },
      { id: "m_dmg_2", name: "Ледяное копье", type: "damage", power: 180, mpCost: 25, statusEffect: {type: 'stun', chance: 25, duration: 1}, desc: "Наносит 180% маг. урона. Шанс 25% заморозить (оглушить)." },
      { id: "m_dmg_3", name: "Цепная молния", type: "damage", power: 220, mpCost: 35, desc: "Наносит колоссальные 220% маг. урона." },
      { id: "m_buff_1", name: "Магический барьер", type: "buff", power: 0, mpCost: 30, cooldown: 4, shieldPct: 30, desc: "Накладывает магический щит прочностью 30% от макс. ХП." },
      { id: "m_pass_1", name: "Тайные знания", type: "passive", power: 20, isPassive: true, desc: "Пассивно увеличивает магическую атаку на 20%." }
    ]
  },
  "Маг Крови": {
    style: "magical",
    baseSkills: [
      { id: "bm_dmg_1", name: "Вампирское касание", type: "damage", power: 130, mpCost: 0, hpCostPct: 5, vampirismPct: 50, desc: "Жертвует 5% ХП, наносит 130% маг. урона и исцеляет на 50% от нанесенного урона." },
      { id: "bm_dmg_2", name: "Кровавое копье", type: "damage", power: 250, mpCost: 0, hpCostPct: 15, dot: {type: 'bleed', duration: 2, dmgPct: 50}, desc: "Тратит 15% ХП для мощного удара в 250% маг. урона. Вызывает сильное кровотечение." },
      { id: "bm_heal_1", name: "Переливание", type: "heal", power: 300, mpCost: 0, hpCostPct: 5, cooldown: 3, desc: "Тратит 5% ХП, но восстанавливает 300% маг. атаки в виде лечения." },
      { id: "bm_pass_1", name: "Ихор безумия", type: "passive", power: 0, isPassive: true, desc: "Уникальная пассивка: повышает урон на 2% за каждые 5% потерянного здоровья." },
      { id: "bm_pass_2", name: "Густая кровь", type: "passive", power: 15, isPassive: true, desc: "Пассивно увеличивает здоровье на 15%." }
    ]
  },
  "Разбойник": {
    style: "physical",
    baseSkills: [
      { id: "rg_dmg_1", name: "Калечащий удар", type: "damage", power: 130, mpCost: 15, dot: {type: 'poison', duration: 4, dmgPct: 25}, desc: "Наносит 130% физ. урона и отравляет цель (25%/ход)." },
      { id: "rg_dmg_2", name: "Удар из тени", type: "damage", power: 200, mpCost: 25, desc: "Двойной шанс крита (базовая мощь 200%)." },
      { id: "rg_debuff", name: "Бросок песка", type: "debuff", power: 50, mpCost: 20, cooldown: 3, statusEffect: {type: 'blind', duration: 2, chance: 80}, desc: "Наносит слабый урон (50%), но имеет 80% шанс ослепить цель на 2 хода." },
      { id: "rg_buff_1", name: "Жажда крови", type: "buff", power: 0, mpCost: 20, cooldown: 5, buff: {stat: 'agility', valPct: 40, duration: 4}, desc: "Повышает ловкость (и шанс уклонения) на 40% на 4 хода." },
      { id: "rg_pass_1", name: "Скрытность", type: "passive", power: 15, isPassive: true, desc: "Пассивно повышает ловкость на 15%." }
    ]
  },
  "Паладин": {
    style: "physical", // hybrid but mainly phys
    baseSkills: [
      { id: "pal_dmg_1", name: "Удар Света", type: "damage", power: 140, mpCost: 20, damageType: "magical", desc: "Наносит 140% магического урона." },
      { id: "pal_dmg_2", name: "Кара", type: "damage", power: 150, mpCost: 25, statusEffect: {type: 'stun', chance: 30, duration: 1}, desc: "Наносит 150% физ. урона. 30% шанс оглушить нечестивца." },
      { id: "pal_heal_1", name: "Возложение рук", type: "heal", power: 200, mpCost: 30, cooldown: 3, desc: "Мощное исцеление Светом (200% маг. атаки/защиты)." },
      { id: "pal_buff_1", name: "Аура защиты", type: "buff", power: 0, mpCost: 25, cooldown: 4, buff: {stat: 'defense', valPct: 50, duration: 4}, shieldPct: 10, desc: "Повышает защиту на 50% и дает небольшой щит." },
      { id: "pal_pass_1", name: "Святая клятва", type: "passive", power: 20, isPassive: true, desc: "Пассивно повышает защиту и маг. защиту на 20%." }
    ]
  },
  "Некромант": {
    style: "magical",
    baseSkills: [
      { id: "nec_dmg_1", name: "Похищение жизни", type: "damage", power: 120, mpCost: 25, vampirismPct: 100, desc: "Наносит 120% маг. урона. Возвращает 100% нанесенного урона в виде ХП." },
      { id: "nec_dmg_2", name: "Стрела распада", type: "damage", power: 180, mpCost: 20, dot: {type: 'poison', duration: 3, dmgPct: 40}, desc: "Наносит 180% маг. урона. Отравляет темной магией (40%/ход)." },
      { id: "nec_shield", name: "Костяная броня", type: "buff", power: 0, mpCost: 35, cooldown: 5, shieldPct: 40, desc: "Призывает костяной щит на 40% от макс. ХП." },
      { id: "nec_debuff", name: "Проклятие слабости", type: "debuff", power: 50, mpCost: 25, cooldown: 3, debuff: {stat: 'attack', valPct: 30, duration: 3}, desc: "Снижает физическую атаку врага на 30% на 3 хода." },
      { id: "nec_pass_1", name: "Жатва душ", type: "passive", power: 20, isPassive: true, desc: "Пассивно увеличивает маг. атаку на 20%." }
    ]
  },
  "Берсерк": {
    style: "physical",
    baseSkills: [
      { id: "ber_dmg_1", name: "Яростный рубящий удар", type: "damage", power: 200, mpCost: 10, hpCostPct: 8, desc: "Тратит 8% ХП. Наносит огромные 200% физ. урона." },
      { id: "ber_dmg_2", name: "Мясорубка", type: "damage", power: 180, mpCost: 15, dot: {type: 'bleed', duration: 4, dmgPct: 50}, hpCostPct: 5, desc: "Тратит 5% ХП. 180% урона и сильное кровотечение (50%/ход)." },
      { id: "ber_buff", name: "Безрассудство", type: "buff", power: 0, mpCost: 0, hpCostPct: 10, cooldown: 5, buff: {stat: 'attack', valPct: 80, duration: 3}, desc: "Жертвует 10% ХП, чтобы увеличить физ. атаку на 80% на 3 хода!" },
      { id: "ber_dmg_3", name: "Добивание", type: "damage", power: 240, mpCost: 30, desc: "Жестокий завершающий удар (240% урона)." },
      { id: "ber_pass_1", name: "Неудержимость", type: "passive", power: 25, isPassive: true, desc: "Пассивно повышает атаку на 25% и максимальное ХП на 10%." }
    ]
  },
  "Жрец": {
    style: "magical",
    baseSkills: [
      { id: "pri_heal_1", name: "Святое исцеление", type: "heal", power: 300, mpCost: 25, cooldown: 1, desc: "Мощное лечение Светом (300%)." },
      { id: "pri_dmg_1", name: "Кара небесная", type: "damage", power: 150, mpCost: 15, damageType: 'magical', desc: "Наносит 150% маг. урона силами Света." },
      { id: "pri_buff_1", name: "Благословение", type: "buff", power: 0, mpCost: 30, cooldown: 4, buff: {stat: 'attack', valPct: 30, duration: 4}, shieldPct: 10, desc: "Повышает силу атаки на 30% и дает небольшой щит." },
      { id: "pri_debuff", name: "Немота", type: "debuff", power: 10, mpCost: 20, cooldown: 4, statusEffect: {type: 'silence', duration: 2, chance: 100}, desc: "Накладывает немоту на врага (запрещает маг. скиллы) на 2 хода." },
      { id: "pri_pass", name: "Аура света", type: "passive", power: 20, isPassive: true, desc: "Пассивно увеличивает маг. защиту на 30% и маг. атаку на 10%." }
    ]
  }
};

// Generics for missing classes
function generateGenericClassInfo(className) {
  const isMagic = ["Бард", "Иллюзионист", "Алхимик", "Шаман", "Чернокнижник", "Друид"].includes(className);
  const dmgType = isMagic ? "magical" : "physical";
  const costAttr = isMagic ? "mpCost" : "mpCost"; // can refine
  const abbrev = className.substring(0, 3).toLowerCase();
  
  return {
    style: dmgType,
    baseSkills: [
      { id: abbrev + "_dmg_1", name: "Базовая атака " + className, type: "damage", power: 150, mpCost: 15, desc: "Наносит 150% " + (isMagic ? "маг." : "физ.") + " урона." },
      { id: abbrev + "_dmg_2", name: "Специальный удар " + className, type: "damage", power: 140, mpCost: 20, dot: {type: isMagic ? 'burn' : 'bleed', duration: 3, dmgPct: 35}, desc: "Наносит 140% урона и накладывает постепенный урон (35%/ход)." },
      { id: abbrev + "_buff", name: "Усиление класса", type: "buff", power: 0, mpCost: 25, cooldown: 4, buff: {stat: isMagic ? 'magicAttack' : 'attack', valPct: 40, duration: 3}, desc: "Повышает основную атаку на 40% на 3 хода." },
      { id: abbrev + "_utility", name: "Тактический прием", type: "debuff", power: 80, mpCost: 20, statusEffect: {type: 'stun', chance: 20, duration: 1}, desc: "Слабый (80%) удар с 20% шансом на оглушение." },
      { id: abbrev + "_pass", name: "Основа класса", type: "passive", power: 15, isPassive: true, desc: "Пассивно увеличивает основные параметры на 15%." }
    ]
  };
}

const finalCatalog = {};

for (const c of CLASSES) {
  const cData = classConfigs[c] || generateGenericClassInfo(c);
  
  for (const s of cData.baseSkills) {
    const sClone = { ...s };
    // Ensure damageType is set for magical classes if not explicitly provided
    if (!sClone.damageType && sClone.type !== 'passive' && sClone.type !== 'buff') {
      sClone.damageType = cData.style;
    }
    if (sClone.type === 'buff' || sClone.type === 'heal' || sClone.type === 'passive') {
        sClone.damageType = cData.style; // Let's just assign style
    }
    
    // Setup generic skill structure
    finalCatalog[sClone.id] = {
      id: sClone.id,
      name: sClone.name,
      type: sClone.type,
      mpCost: sClone.mpCost,
      hpCostPct: sClone.hpCostPct,
      cooldown: sClone.cooldown,
      damageType: sClone.damageType || 'physical',
      isPassive: sClone.isPassive || false,
      hitChance: sClone.hitChance || 100,
      effectChance: sClone.effectChance || 0,
      description: sClone.desc,
      power: sClone.power,
      dot: sClone.dot,
      statusEffect: sClone.statusEffect,
      buff: sClone.buff,
      debuff: sClone.debuff,
      shieldPct: sClone.shieldPct,
      vampirismPct: sClone.vampirismPct,
      synergy: sClone.synergy
    };
  }
}

// Convert to string layout
let output = "export type SkillType = 'damage' | 'heal' | 'buff' | 'passive' | 'debuff';\n\n" +
"export interface Skill {\n" +
"  id: string;\n" +
"  name: string;\n" +
"  description: string;\n" +
"  type: SkillType;\n" +
"  power: number;\n" +
"  mpCost: number;\n" +
"  hpCostPct?: number;\n" +
"  cooldown?: number;\n" +
"  dot?: { type: 'poison'|'bleed'|'burn'; duration: number; dmgPct: number };\n" +
"  statusEffect?: { type: 'stun'|'silence'|'blind'|'heal_reduction'; duration: number; chance: number };\n" +
"  buff?: { stat: string; valPct: number; duration: number };\n" +
"  debuff?: { stat: string; valPct: number; duration: number };\n" +
"  shieldPct?: number;\n" +
"  vampirismPct?: number;\n" +
"  synergy?: { requiredStatus: string; bonusDmgPct?: number; bonusVampirismPct?: number; armorPenetrationPct?: number };\n" +
"  isPassive?: boolean;\n" +
"  hitChance?: number;\n" +
"  effectChance?: number;\n" +
"  damageType?: 'physical' | 'magical';\n" +
"}\n\n" +
"export const CLASSES: string[] = " + JSON.stringify(CLASSES, null, 2) + ";\n\n" +
"export const SUBCLASSES: Record<string, string[]> = " + JSON.stringify(SUBCLASSES, null, 2) + ";\n\n" +
"export const SKILL_CATALOG: Record<string, Skill> = " + JSON.stringify(finalCatalog, null, 2) + ";\n";

fs.writeFileSync('skills.ts', output);
console.log('skills.ts regenerated successfully!');
