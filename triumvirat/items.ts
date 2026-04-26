export type ItemType = 'weapon' | 'armor' | 'helmet' | 'shield' | 'accessory' | 'consumable' | 'material';

export interface ItemStats {
  hp?: number;
  maxHp?: number;
  mp?: number;
  maxMp?: number;
  attack?: number;
  defense?: number;
  magicAttack?: number;
  magicDefense?: number;
  agility?: number;
  critRate?: number;
  critDamage?: number;
  resistPoison?: number;
  resistFire?: number;
  resistIce?: number;
  resistLightning?: number;
  resistDark?: number;
  resistHoly?: number;
}

export interface Item {
  allowedClasses?: string[];
  id: string;
  name: string;
  type: ItemType;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  price: number;
  stats?: ItemStats;
  description: string;
  healAmount?: number;
  setName?: string;
  maxSlots?: number; 
  level?: number;
}

export function getItemLevel(item: Item): number {
  return item.level || 1;
}

export interface InventoryItem {
  itemId: string;
  amount: number;
  sockets?: string[]; 
}

export const ITEM_CATALOG: Record<string, Item> = {
  "wpn_1": {
    "id": "wpn_1",
    "name": "Простой меч",
    "rarity": "common",
    "stats": {
      "attack": 5
    },
    "price": 1790,
    "type": "weapon",
    "description": "Оружие (common)"
  },
  "wpn_2": {
    "id": "wpn_2",
    "name": "Грубый посох",
    "rarity": "common",
    "stats": {
      "magicAttack": 15,
      "maxMp": 20
    },
    "price": 1750,
    "type": "weapon",
    "description": "Оружие (common)"
  },
  "wpn_3": {
    "id": "wpn_3",
    "name": "Тупой лук",
    "rarity": "common",
    "stats": {
      "attack": 9
    },
    "price": 1240,
    "type": "weapon",
    "description": "Оружие (common)"
  },
  "wpn_4": {
    "id": "wpn_4",
    "name": "Тяжелый длинный меч",
    "rarity": "uncommon",
    "stats": {
      "attack": 35
    },
    "price": 5200,
    "type": "weapon",
    "description": "Оружие (uncommon)"
  },
  "wpn_5": {
    "id": "wpn_5",
    "name": "Крепкий посох ученика",
    "rarity": "uncommon",
    "stats": {
      "magicAttack": 50,
      "maxMp": 85
    },
    "price": 5860,
    "type": "weapon",
    "description": "Оружие (uncommon)"
  },
  "wpn_6": {
    "id": "wpn_6",
    "name": "Отличный лук",
    "rarity": "rare",
    "stats": {
      "attack": 125
    },
    "price": 18190,
    "type": "weapon",
    "description": "Оружие (rare)"
  },
  "wpn_7": {
    "id": "wpn_7",
    "name": "Кровавый клинок",
    "rarity": "epic",
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "price": 88910,
    "type": "weapon",
    "description": "Оружие (epic)"
  },
  "wpn_8": {
    "id": "wpn_8",
    "name": "Великий Посох Архимага",
    "rarity": "legendary",
    "stats": {
      "magicAttack": 1655,
      "maxMp": 4110,
      "critRate": 20,
      "critDamage": 60,
      "resistDark": 20,
      "resistHoly": 20
    },
    "price": 506660,
    "type": "weapon",
    "description": "Оружие (legendary)"
  },
  "wpn_9": {
    "id": "wpn_9",
    "name": "Редкий кинжал убийцы",
    "rarity": "rare",
    "stats": {
      "attack": 125
    },
    "price": 22150,
    "type": "weapon",
    "description": "Оружие (rare)"
  },
  "wpn_10": {
    "id": "wpn_10",
    "name": "Идеальный лук Рока",
    "rarity": "legendary",
    "stats": {
      "attack": 1655,
      "critRate": 20,
      "critDamage": 60,
      "agility": 15,
      "maxHp": 150
    },
    "price": 422020,
    "type": "weapon",
    "description": "Оружие (legendary)"
  },
  "arm_1": {
    "id": "arm_1",
    "name": "Дырявая туника",
    "rarity": "common",
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "price": 1660,
    "type": "armor",
    "description": "Броня (common)"
  },
  "arm_2": {
    "id": "arm_2",
    "name": "Изношенная куртка",
    "rarity": "common",
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "price": 1580,
    "type": "armor",
    "description": "Броня (common)"
  },
  "arm_3": {
    "id": "arm_3",
    "name": "Железная кираса стражника",
    "rarity": "uncommon",
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "price": 6790,
    "type": "armor",
    "description": "Броня (uncommon)"
  },
  "arm_4": {
    "id": "arm_4",
    "name": "Усиленная роба адепта",
    "rarity": "uncommon",
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "price": 5060,
    "type": "armor",
    "description": "Броня (uncommon)"
  },
  "arm_5": {
    "id": "arm_5",
    "name": "Серебряный доспех",
    "rarity": "rare",
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "price": 19860,
    "type": "armor",
    "description": "Броня (rare)"
  },
  "arm_6": {
    "id": "arm_6",
    "name": "Ледяная мантия теней",
    "rarity": "epic",
    "stats": {
      "defense": 325,
      "magicDefense": 405,
      "maxMp": 750,
      "maxHp": 50,
      "resistPoison": 20,
      "resistFire": 20
    },
    "price": 83310,
    "type": "armor",
    "description": "Броня (epic)"
  },
  "arm_7": {
    "id": "arm_7",
    "name": "Таинственная чешуя Дракона",
    "rarity": "legendary",
    "stats": {
      "defense": 1265,
      "magicDefense": 630,
      "maxHp": 3210,
      "resistIce": 30,
      "resistLightning": 30,
      "resistFire": 30
    },
    "price": 451110,
    "type": "armor",
    "description": "Броня (legendary)"
  },
  "acc_1": {
    "id": "acc_1",
    "name": "Старое кольцо",
    "rarity": "common",
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "price": 1590,
    "type": "accessory",
    "description": "Аксессуар (common)"
  },
  "acc_2": {
    "id": "acc_2",
    "name": "Изящный кулон здоровья",
    "rarity": "uncommon",
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "price": 6470,
    "type": "accessory",
    "description": "Аксессуар (uncommon)"
  },
  "acc_3": {
    "id": "acc_3",
    "name": "Надежный браслет мага",
    "rarity": "uncommon",
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "price": 4900,
    "type": "accessory",
    "description": "Аксессуар (uncommon)"
  },
  "acc_4": {
    "id": "acc_4",
    "name": "Рунный амулет ловкости",
    "rarity": "rare",
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "price": 16110,
    "type": "accessory",
    "description": "Аксессуар (rare)"
  },
  "acc_5": {
    "id": "acc_5",
    "name": "Древний кристалл Титана",
    "rarity": "epic",
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "price": 70820,
    "type": "accessory",
    "description": "Аксессуар (epic)"
  },
  "acc_6": {
    "id": "acc_6",
    "name": "Сияющий венец Всевластия",
    "rarity": "legendary",
    "stats": {
      "agility": 820,
      "maxHp": 4320,
      "attack": 40,
      "critRate": 15,
      "critDamage": 50
    },
    "price": 408160,
    "type": "accessory",
    "description": "Аксессуар (legendary)"
  },
  "cons_1": {
    "id": "cons_1",
    "name": "Малое зелье здоровья",
    "rarity": "common",
    "healAmount": 50,
    "price": 30,
    "type": "consumable",
    "description": "Восстанавливает 50 ХП."
  },
  "cons_2": {
    "id": "cons_2",
    "name": "Среднее зелье здоровья",
    "rarity": "uncommon",
    "healAmount": 150,
    "price": 120,
    "type": "consumable",
    "description": "Восстанавливает 150 ХП."
  },
  "cons_3": {
    "id": "cons_3",
    "name": "Большое зелье здоровья",
    "rarity": "rare",
    "healAmount": 400,
    "price": 400,
    "type": "consumable",
    "description": "Восстанавливает 400 ХП."
  },
  "cons_4": {
    "id": "cons_4",
    "name": "Эликсир Жизни",
    "rarity": "epic",
    "healAmount": 1000,
    "price": 1500,
    "type": "consumable",
    "description": "Восстанавливает 1000 ХП."
  },
  "wpn_100": {
    "id": "wpn_100",
    "name": "Добротный Инструмент",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5920,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_101": {
    "id": "wpn_101",
    "name": "Качественный Лютня",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5270,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_102": {
    "id": "wpn_102",
    "name": "Ледяной Топор",
    "type": "weapon",
    "rarity": "epic",
    "price": 68740,
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_103": {
    "id": "wpn_103",
    "name": "Надежный Дубина",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 7090,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Варвар, Берсерк, Гоблин, Боец",
    "allowedClasses": [
      "Варвар",
      "Берсерк",
      "Гоблин",
      "Боец"
    ]
  },
  "wpn_104": {
    "id": "wpn_104",
    "name": "Искусный Инструмент",
    "type": "weapon",
    "rarity": "rare",
    "price": 18230,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_105": {
    "id": "wpn_105",
    "name": "Божественный Копье",
    "type": "weapon",
    "rarity": "legendary",
    "price": 468480,
    "stats": {
      "attack": 1655,
      "critRate": 20,
      "critDamage": 60,
      "agility": 15,
      "maxHp": 150
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_106": {
    "id": "wpn_106",
    "name": "Рунный Копье",
    "type": "weapon",
    "rarity": "rare",
    "price": 23060,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_107": {
    "id": "wpn_107",
    "name": "Обычный Меч",
    "type": "weapon",
    "rarity": "common",
    "price": 1630,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Паладин, Рыцарь Смерти",
    "allowedClasses": [
      "Воин",
      "Паладин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_108": {
    "id": "wpn_108",
    "name": "Отличный Кинжал",
    "type": "weapon",
    "rarity": "rare",
    "price": 21240,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_109": {
    "id": "wpn_109",
    "name": "Тяжелый Кровавый кристалл",
    "type": "weapon",
    "rarity": "common",
    "price": 1430,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_110": {
    "id": "wpn_110",
    "name": "Отличный Посох",
    "type": "weapon",
    "rarity": "rare",
    "price": 18690,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_111": {
    "id": "wpn_111",
    "name": "Тупой Лютня",
    "type": "weapon",
    "rarity": "common",
    "price": 1350,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_112": {
    "id": "wpn_112",
    "name": "Рунный Лук",
    "type": "weapon",
    "rarity": "rare",
    "price": 19130,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_113": {
    "id": "wpn_113",
    "name": "Дешевый перчатки",
    "type": "weapon",
    "rarity": "common",
    "price": 1620,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_114": {
    "id": "wpn_114",
    "name": "Тупой теней",
    "type": "weapon",
    "rarity": "common",
    "price": 1240,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_115": {
    "id": "wpn_115",
    "name": "Тяжелый Лютня",
    "type": "weapon",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_116": {
    "id": "wpn_116",
    "name": "Редкий Коса",
    "type": "weapon",
    "rarity": "rare",
    "price": 19880,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_117": {
    "id": "wpn_117",
    "name": "Надежный Коса",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6540,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_118": {
    "id": "wpn_118",
    "name": "Дешевый Топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1660,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_119": {
    "id": "wpn_119",
    "name": "Крепкий искусного убийцы",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6930,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_120": {
    "id": "wpn_120",
    "name": "Дешевый Кинжал",
    "type": "weapon",
    "rarity": "common",
    "price": 1530,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_121": {
    "id": "wpn_121",
    "name": "Качественный Кровавый кристалл",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6260,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_122": {
    "id": "wpn_122",
    "name": "Тренировочный Коса",
    "type": "weapon",
    "rarity": "common",
    "price": 1560,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_123": {
    "id": "wpn_123",
    "name": "Острая Коса",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 7010,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_124": {
    "id": "wpn_124",
    "name": "Качественный Арбалет",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 7050,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Лучник, Инженер, Ассасин",
    "allowedClasses": [
      "Лучник",
      "Инженер",
      "Ассасин"
    ]
  },
  "wpn_125": {
    "id": "wpn_125",
    "name": "Отличный Меч",
    "type": "weapon",
    "rarity": "rare",
    "price": 19760,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Воин, Паладин, Рыцарь Смерти",
    "allowedClasses": [
      "Воин",
      "Паладин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_126": {
    "id": "wpn_126",
    "name": "Тренировочный Инструмент",
    "type": "weapon",
    "rarity": "common",
    "price": 1350,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_127": {
    "id": "wpn_127",
    "name": "Тяжелый Лук",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 4830,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_128": {
    "id": "wpn_128",
    "name": "Старый Перчатки",
    "type": "weapon",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_129": {
    "id": "wpn_129",
    "name": "Эпический Топор берсерка",
    "type": "weapon",
    "rarity": "epic",
    "price": 62680,
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_130": {
    "id": "wpn_130",
    "name": "Хороший Дубина",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5250,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Варвар, Берсерк, Гоблин, Боец",
    "allowedClasses": [
      "Варвар",
      "Берсерк",
      "Гоблин",
      "Боец"
    ]
  },
  "wpn_131": {
    "id": "wpn_131",
    "name": "Старый перчатки",
    "type": "weapon",
    "rarity": "common",
    "price": 1390,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_132": {
    "id": "wpn_132",
    "name": "Рунный копье",
    "type": "weapon",
    "rarity": "rare",
    "price": 21960,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_133": {
    "id": "wpn_133",
    "name": "Рунный лук",
    "type": "weapon",
    "rarity": "rare",
    "price": 22910,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_134": {
    "id": "wpn_134",
    "name": "Тяжелый меч",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5960,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Воин, Паладин, Рыцарь Смерти",
    "allowedClasses": [
      "Воин",
      "Паладин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_135": {
    "id": "wpn_135",
    "name": "Тупой копье",
    "type": "weapon",
    "rarity": "common",
    "price": 1460,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_136": {
    "id": "wpn_136",
    "name": "Ледяной посох",
    "type": "weapon",
    "rarity": "epic",
    "price": 76470,
    "stats": {
      "magicAttack": 420,
      "maxMp": 1040,
      "critRate": 10,
      "critDamage": 30
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_137": {
    "id": "wpn_137",
    "name": "Редкий инструмент",
    "type": "weapon",
    "rarity": "rare",
    "price": 21630,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_138": {
    "id": "wpn_138",
    "name": "Серебряный посох",
    "type": "weapon",
    "rarity": "rare",
    "price": 19900,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_139": {
    "id": "wpn_139",
    "name": "Тупой топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1340,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_140": {
    "id": "wpn_140",
    "name": "Тупой копье",
    "type": "weapon",
    "rarity": "common",
    "price": 1750,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_141": {
    "id": "wpn_141",
    "name": "Тренировочный кинжал",
    "type": "weapon",
    "rarity": "common",
    "price": 1620,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_142": {
    "id": "wpn_142",
    "name": "Хороший Лютня",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 7110,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_143": {
    "id": "wpn_143",
    "name": "Рунный Копье",
    "type": "weapon",
    "rarity": "rare",
    "price": 21150,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_144": {
    "id": "wpn_144",
    "name": "Свирепый Перчатки",
    "type": "weapon",
    "rarity": "rare",
    "price": 23650,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_145": {
    "id": "wpn_145",
    "name": "Боевой Топор",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5020,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_146": {
    "id": "wpn_146",
    "name": "Надежный Дубина",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5180,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Варвар, Берсерк, Гоблин, Боец",
    "allowedClasses": [
      "Варвар",
      "Берсерк",
      "Гоблин",
      "Боец"
    ]
  },
  "wpn_147": {
    "id": "wpn_147",
    "name": "Крепкий Копье",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5750,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_148": {
    "id": "wpn_148",
    "name": "Эпический Лук",
    "type": "weapon",
    "rarity": "epic",
    "price": 83910,
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_149": {
    "id": "wpn_149",
    "name": "Опасный Инструмент",
    "type": "weapon",
    "rarity": "rare",
    "price": 17500,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_150": {
    "id": "wpn_150",
    "name": "Изношенный Инструмент",
    "type": "weapon",
    "rarity": "common",
    "price": 1570,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_151": {
    "id": "wpn_151",
    "name": "Свирепый Кровавый кристалл",
    "type": "weapon",
    "rarity": "rare",
    "price": 16260,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_152": {
    "id": "wpn_152",
    "name": "Качественный Кровавый кристалл",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6900,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_153": {
    "id": "wpn_153",
    "name": "Ледяной Посох",
    "type": "weapon",
    "rarity": "epic",
    "price": 80920,
    "stats": {
      "magicAttack": 420,
      "maxMp": 1040,
      "critRate": 10,
      "critDamage": 30
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_154": {
    "id": "wpn_154",
    "name": "Искусный Инструмент",
    "type": "weapon",
    "rarity": "rare",
    "price": 22090,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_155": {
    "id": "wpn_155",
    "name": "Острая Коса",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5520,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_156": {
    "id": "wpn_156",
    "name": "Магический перчатки",
    "type": "weapon",
    "rarity": "rare",
    "price": 23270,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_157": {
    "id": "wpn_157",
    "name": "Тупой Копье",
    "type": "weapon",
    "rarity": "common",
    "price": 1360,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Паладин, Воин, Рыцарь Смерти",
    "allowedClasses": [
      "Паладин",
      "Воин",
      "Рыцарь Смерти"
    ]
  },
  "wpn_158": {
    "id": "wpn_158",
    "name": "Эпический Кинжал",
    "type": "weapon",
    "rarity": "epic",
    "price": 74750,
    "stats": {
      "magicAttack": 420,
      "maxMp": 1040,
      "critRate": 10,
      "critDamage": 30
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_159": {
    "id": "wpn_159",
    "name": "Ржавый Кристалл крови",
    "type": "weapon",
    "rarity": "common",
    "price": 1260,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_160": {
    "id": "wpn_160",
    "name": "Редкий Коса",
    "type": "weapon",
    "rarity": "rare",
    "price": 20830,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_161": {
    "id": "wpn_161",
    "name": "Тренировочный Кинжал",
    "type": "weapon",
    "rarity": "common",
    "price": 1590,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_162": {
    "id": "wpn_162",
    "name": "Качественный Инструмент",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5300,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_163": {
    "id": "wpn_163",
    "name": "Тренировочный Инструмент",
    "type": "weapon",
    "rarity": "common",
    "price": 1550,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_164": {
    "id": "wpn_164",
    "name": "Острый Инструмент",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5550,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Инженер, Алхимик",
    "allowedClasses": [
      "Инженер",
      "Алхимик"
    ]
  },
  "wpn_165": {
    "id": "wpn_165",
    "name": "Свирепый Перчатки",
    "type": "weapon",
    "rarity": "rare",
    "price": 23400,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_166": {
    "id": "wpn_166",
    "name": "Зачарованный Лук",
    "type": "weapon",
    "rarity": "rare",
    "price": 21930,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_167": {
    "id": "wpn_167",
    "name": "Рунный Перчатки",
    "type": "weapon",
    "rarity": "rare",
    "price": 23790,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_168": {
    "id": "wpn_168",
    "name": "Железный Кровавый кристалл",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6440,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_169": {
    "id": "wpn_169",
    "name": "Изношенный Дубина",
    "type": "weapon",
    "rarity": "common",
    "price": 1550,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Варвар, Берсерк, Гоблин, Боец",
    "allowedClasses": [
      "Варвар",
      "Берсерк",
      "Гоблин",
      "Боец"
    ]
  },
  "wpn_170": {
    "id": "wpn_170",
    "name": "Дешевый Топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1670,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_171": {
    "id": "wpn_171",
    "name": "Могущественный Арбалет",
    "type": "weapon",
    "rarity": "epic",
    "price": 75910,
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "description": "Вместительный урон. Уникально для: Лучник, Инженер, Ассасин",
    "allowedClasses": [
      "Лучник",
      "Инженер",
      "Ассасин"
    ]
  },
  "wpn_172": {
    "id": "wpn_172",
    "name": "Хороший Лук",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6970,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_173": {
    "id": "wpn_173",
    "name": "Пылающий Коса",
    "type": "weapon",
    "rarity": "epic",
    "price": 76350,
    "stats": {
      "magicAttack": 420,
      "maxMp": 1040,
      "critRate": 10,
      "critDamage": 30
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_174": {
    "id": "wpn_174",
    "name": "Громовой Кинжал",
    "type": "weapon",
    "rarity": "epic",
    "price": 64020,
    "stats": {
      "magicAttack": 420,
      "maxMp": 1040,
      "critRate": 10,
      "critDamage": 30
    },
    "description": "Вместительный урон. Уникально для: Разбойник, Ассасин, Иллюзионист",
    "allowedClasses": [
      "Разбойник",
      "Ассасин",
      "Иллюзионист"
    ]
  },
  "wpn_175": {
    "id": "wpn_175",
    "name": "Магический Коса",
    "type": "weapon",
    "rarity": "rare",
    "price": 20270,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_176": {
    "id": "wpn_176",
    "name": "Магический Кровавый кристалл",
    "type": "weapon",
    "rarity": "rare",
    "price": 22980,
    "stats": {
      "magicAttack": 125,
      "maxMp": 310
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_177": {
    "id": "wpn_177",
    "name": "Тренировочный Перчатки",
    "type": "weapon",
    "rarity": "common",
    "price": 1460,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_178": {
    "id": "wpn_178",
    "name": "Зачарованный Топор",
    "type": "weapon",
    "rarity": "rare",
    "price": 21410,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_179": {
    "id": "wpn_179",
    "name": "Боевая Лютня",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5350,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_180": {
    "id": "wpn_180",
    "name": "Железный Посох",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6360,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_181": {
    "id": "wpn_181",
    "name": "Тупой Топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1550,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_182": {
    "id": "wpn_182",
    "name": "Грубый Лютня",
    "type": "weapon",
    "rarity": "common",
    "price": 1700,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Бард",
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_183": {
    "id": "wpn_183",
    "name": "Грубый Кровавый кристалл",
    "type": "weapon",
    "rarity": "common",
    "price": 1220,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_184": {
    "id": "wpn_184",
    "name": "Крепкий Топор",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5100,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_185": {
    "id": "wpn_185",
    "name": "Стальной Посох",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 4940,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_186": {
    "id": "wpn_186",
    "name": "Железный Посох",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5160,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_187": {
    "id": "wpn_187",
    "name": "Тупой Топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1370,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_188": {
    "id": "wpn_188",
    "name": "Магический Лук",
    "type": "weapon",
    "rarity": "rare",
    "price": 16740,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_189": {
    "id": "wpn_189",
    "name": "Качественный Кровавый кристалл",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6330,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Маг Крови",
    "allowedClasses": [
      "Маг Крови"
    ]
  },
  "wpn_190": {
    "id": "wpn_190",
    "name": "Тренировочный Коса",
    "type": "weapon",
    "rarity": "common",
    "price": 1760,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_191": {
    "id": "wpn_191",
    "name": "Тупой Топор",
    "type": "weapon",
    "rarity": "common",
    "price": 1600,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Воин, Берсерк, Охотник",
    "allowedClasses": [
      "Воин",
      "Берсерк",
      "Охотник"
    ]
  },
  "wpn_192": {
    "id": "wpn_192",
    "name": "Проклятый Перчатки",
    "type": "weapon",
    "rarity": "epic",
    "price": 74470,
    "stats": {
      "attack": 420,
      "critRate": 10,
      "critDamage": 30,
      "agility": 5
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_193": {
    "id": "wpn_193",
    "name": "Мифриловый Лук",
    "type": "weapon",
    "rarity": "rare",
    "price": 22620,
    "stats": {
      "attack": 125
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_194": {
    "id": "wpn_194",
    "name": "Изношенный Посох",
    "type": "weapon",
    "rarity": "common",
    "price": 1460,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_195": {
    "id": "wpn_195",
    "name": "Простой Перчатки",
    "type": "weapon",
    "rarity": "common",
    "price": 1200,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_196": {
    "id": "wpn_196",
    "name": "Боевая Коса",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 6880,
    "stats": {
      "magicAttack": 35,
      "maxMp": 85
    },
    "description": "Вместительный урон. Уникально для: Некромант, Чернокнижник, Рыцарь Смерти, Маг Крови",
    "allowedClasses": [
      "Некромант",
      "Чернокнижник",
      "Рыцарь Смерти",
      "Маг Крови"
    ]
  },
  "wpn_197": {
    "id": "wpn_197",
    "name": "Дешевый Посох",
    "type": "weapon",
    "rarity": "common",
    "price": 1390,
    "stats": {
      "magicAttack": 9,
      "maxMp": 20
    },
    "description": "Вместительный урон. Уникально для: Маг, Чернокнижник, Друид, Жрец, Алхимик, Шаман, Иллюзионист, Монах, Некромант",
    "allowedClasses": [
      "Маг",
      "Чернокнижник",
      "Друид",
      "Жрец",
      "Алхимик",
      "Шаман",
      "Иллюзионист",
      "Монах",
      "Некромант"
    ]
  },
  "wpn_198": {
    "id": "wpn_198",
    "name": "Добротный Перчатки",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 5790,
    "stats": {
      "attack": 35
    },
    "description": "Вместительный урон. Уникально для: Боец, Монах",
    "allowedClasses": [
      "Боец",
      "Монах"
    ]
  },
  "wpn_199": {
    "id": "wpn_199",
    "name": "Тяжелый Лук",
    "type": "weapon",
    "rarity": "common",
    "price": 1610,
    "stats": {
      "attack": 9
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "arm_200": {
    "id": "arm_200",
    "name": "Дырявая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1270,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_201": {
    "id": "arm_201",
    "name": "Добротная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 7090,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_202": {
    "id": "arm_202",
    "name": "Тяжелая Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1680,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_203": {
    "id": "arm_203",
    "name": "Тяжелая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1690,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_204": {
    "id": "arm_204",
    "name": "Грубая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1780,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_205": {
    "id": "arm_205",
    "name": "Изношенная Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_206": {
    "id": "arm_206",
    "name": "Магическая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 22690,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_207": {
    "id": "arm_207",
    "name": "Мифриловые Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 23260,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_208": {
    "id": "arm_208",
    "name": "Надежная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6540,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_209": {
    "id": "arm_209",
    "name": "Призрачная Одеяние",
    "type": "armor",
    "rarity": "epic",
    "price": 61040,
    "stats": {
      "defense": 325,
      "magicDefense": 405,
      "maxMp": 750,
      "maxHp": 50,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_210": {
    "id": "arm_210",
    "name": "Легкая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 21490,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_211": {
    "id": "arm_211",
    "name": "Зачарованная Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 20510,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_212": {
    "id": "arm_212",
    "name": "Мифриловые Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 16670,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_213": {
    "id": "arm_213",
    "name": "Дырявая Латы",
    "type": "armor",
    "rarity": "common",
    "price": 1520,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_214": {
    "id": "arm_214",
    "name": "Тяжелая Латы",
    "type": "armor",
    "rarity": "common",
    "price": 1360,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_215": {
    "id": "arm_215",
    "name": "Проклятая Латы",
    "type": "armor",
    "rarity": "epic",
    "price": 63880,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_216": {
    "id": "arm_216",
    "name": "Слоистая Кольчуга",
    "type": "armor",
    "rarity": "rare",
    "price": 17880,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_217": {
    "id": "arm_217",
    "name": "Надежная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6630,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_218": {
    "id": "arm_218",
    "name": "Ржавая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1480,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_219": {
    "id": "arm_219",
    "name": "Стальная Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6660,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_220": {
    "id": "arm_220",
    "name": "Зачарованная Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 23780,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_221": {
    "id": "arm_221",
    "name": "Боевая Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6100,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_222": {
    "id": "arm_222",
    "name": "Эльфийская Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 19450,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_223": {
    "id": "arm_223",
    "name": "Сшитая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1600,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_224": {
    "id": "arm_224",
    "name": "Обычная Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1330,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_225": {
    "id": "arm_225",
    "name": "Кольчужная Мантия",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5560,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_226": {
    "id": "arm_226",
    "name": "Сшитая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1210,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_227": {
    "id": "arm_227",
    "name": "Добротная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6370,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_228": {
    "id": "arm_228",
    "name": "Надежная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6390,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_229": {
    "id": "arm_229",
    "name": "Старая Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1680,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_230": {
    "id": "arm_230",
    "name": "Прочная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6570,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_231": {
    "id": "arm_231",
    "name": "Удобная Кожаная броня",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5050,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_232": {
    "id": "arm_232",
    "name": "Удобная Кожаная броня",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5320,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_233": {
    "id": "arm_233",
    "name": "Боевая Мантия",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6160,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_234": {
    "id": "arm_234",
    "name": "Обычная Латы",
    "type": "armor",
    "rarity": "common",
    "price": 1230,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_235": {
    "id": "arm_235",
    "name": "Проклятая Кольчуга",
    "type": "armor",
    "rarity": "epic",
    "price": 80180,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_236": {
    "id": "arm_236",
    "name": "Магическая Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 16510,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_237": {
    "id": "arm_237",
    "name": "Тяжелая Латы",
    "type": "armor",
    "rarity": "common",
    "price": 1780,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_238": {
    "id": "arm_238",
    "name": "Дырявая Латы",
    "type": "armor",
    "rarity": "common",
    "price": 1300,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_239": {
    "id": "arm_239",
    "name": "Мифриловые Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 23800,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_240": {
    "id": "arm_240",
    "name": "Боевая Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5120,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_241": {
    "id": "arm_241",
    "name": "Тяжелая Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1400,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_242": {
    "id": "arm_242",
    "name": "Ржавая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_243": {
    "id": "arm_243",
    "name": "Кожаная Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1520,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_244": {
    "id": "arm_244",
    "name": "Железная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6580,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_245": {
    "id": "arm_245",
    "name": "Удобная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5790,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_246": {
    "id": "arm_246",
    "name": "Железная Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6730,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_247": {
    "id": "arm_247",
    "name": "Эпическая Кожаная броня",
    "type": "armor",
    "rarity": "epic",
    "price": 63410,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_248": {
    "id": "arm_248",
    "name": "Стальная Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5080,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_249": {
    "id": "arm_249",
    "name": "Стальная Мантия",
    "type": "armor",
    "rarity": "uncommon",
    "price": 7190,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_250": {
    "id": "arm_250",
    "name": "Искусная Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 21710,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_251": {
    "id": "arm_251",
    "name": "Серебряная Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 17120,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_252": {
    "id": "arm_252",
    "name": "Драконья Латы",
    "type": "armor",
    "rarity": "epic",
    "price": 77960,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_253": {
    "id": "arm_253",
    "name": "Удобная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6360,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_254": {
    "id": "arm_254",
    "name": "Редкая Кожаная броня",
    "type": "armor",
    "rarity": "rare",
    "price": 23740,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_255": {
    "id": "arm_255",
    "name": "Удобная Кожаная броня",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6460,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_256": {
    "id": "arm_256",
    "name": "Костяная Мантия",
    "type": "armor",
    "rarity": "epic",
    "price": 87320,
    "stats": {
      "defense": 325,
      "magicDefense": 405,
      "maxMp": 750,
      "maxHp": 50,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_257": {
    "id": "arm_257",
    "name": "Боевая Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6040,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_258": {
    "id": "arm_258",
    "name": "Легкая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 17770,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_259": {
    "id": "arm_259",
    "name": "Прочная Кольчуга",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6120,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_260": {
    "id": "arm_260",
    "name": "Эпическая Кожаная броня",
    "type": "armor",
    "rarity": "epic",
    "price": 63710,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_261": {
    "id": "arm_261",
    "name": "Тяжелая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1510,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_262": {
    "id": "arm_262",
    "name": "Грубая Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1480,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_263": {
    "id": "arm_263",
    "name": "Тяжелая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1750,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_264": {
    "id": "arm_264",
    "name": "Сшитая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1610,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_265": {
    "id": "arm_265",
    "name": "Удобная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6360,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_266": {
    "id": "arm_266",
    "name": "Рунная Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 22690,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_267": {
    "id": "arm_267",
    "name": "Легкая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 17950,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_268": {
    "id": "arm_268",
    "name": "Стальная Мантия",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6660,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_269": {
    "id": "arm_269",
    "name": "Грубая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_270": {
    "id": "arm_270",
    "name": "Железная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 7140,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_271": {
    "id": "arm_271",
    "name": "Дырявая Мантия",
    "type": "armor",
    "rarity": "common",
    "price": 1660,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_272": {
    "id": "arm_272",
    "name": "Крепкая Кожаная броня",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5460,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_273": {
    "id": "arm_273",
    "name": "Слоистая Кольчуга",
    "type": "armor",
    "rarity": "rare",
    "price": 20280,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_274": {
    "id": "arm_274",
    "name": "Добротная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 6310,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_275": {
    "id": "arm_275",
    "name": "Магическая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 16900,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_276": {
    "id": "arm_276",
    "name": "Ржавая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1280,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_277": {
    "id": "arm_277",
    "name": "Изношенная Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1320,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_278": {
    "id": "arm_278",
    "name": "Сшитая Кольчуга",
    "type": "armor",
    "rarity": "common",
    "price": 1240,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_279": {
    "id": "arm_279",
    "name": "Простая Кожаная броня",
    "type": "armor",
    "rarity": "common",
    "price": 1560,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_280": {
    "id": "arm_280",
    "name": "Изношенная Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1460,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_281": {
    "id": "arm_281",
    "name": "Эпическая Мантия",
    "type": "armor",
    "rarity": "epic",
    "price": 60350,
    "stats": {
      "defense": 325,
      "magicDefense": 405,
      "maxMp": 750,
      "maxHp": 50,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_282": {
    "id": "arm_282",
    "name": "Усиленная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 7180,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_283": {
    "id": "arm_283",
    "name": "Зачарованная Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 22510,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_284": {
    "id": "arm_284",
    "name": "Ледяная Латы",
    "type": "armor",
    "rarity": "epic",
    "price": 68450,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_285": {
    "id": "arm_285",
    "name": "Магическая Кольчуга",
    "type": "armor",
    "rarity": "rare",
    "price": 22080,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_286": {
    "id": "arm_286",
    "name": "Искусная Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 18990,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_287": {
    "id": "arm_287",
    "name": "Серебряная Кольчуга",
    "type": "armor",
    "rarity": "rare",
    "price": 23460,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_288": {
    "id": "arm_288",
    "name": "Изношенная Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1330,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_289": {
    "id": "arm_289",
    "name": "Темная Кожаная броня",
    "type": "armor",
    "rarity": "epic",
    "price": 63380,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Разбойник, Лучник, Ассасин, Охотник, Друид, Боец, Монах"
  },
  "arm_290": {
    "id": "arm_290",
    "name": "Мифриловые Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 17660,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_291": {
    "id": "arm_291",
    "name": "Редкая Мантия",
    "type": "armor",
    "rarity": "rare",
    "price": 16410,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_292": {
    "id": "arm_292",
    "name": "Проклятая Кольчуга",
    "type": "armor",
    "rarity": "epic",
    "price": 81450,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Жрец, Охотник, Инженер"
  },
  "arm_293": {
    "id": "arm_293",
    "name": "Рунная Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 17280,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_294": {
    "id": "arm_294",
    "name": "Железная Мантия",
    "type": "armor",
    "rarity": "uncommon",
    "price": 5690,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Жрец, Чернокнижник, Иллюзионист, Некромант, Алхимик, Бард, Шаман, Маг Крови"
  },
  "arm_295": {
    "id": "arm_295",
    "name": "Мифриловые Латы",
    "type": "armor",
    "rarity": "rare",
    "price": 20000,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "arm_296": {
    "id": "arm_296",
    "name": "Магическая Одеяние",
    "type": "armor",
    "rarity": "rare",
    "price": 21980,
    "stats": {
      "defense": 95,
      "magicDefense": 125,
      "maxMp": 225
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_297": {
    "id": "arm_297",
    "name": "Грубая Одеяние",
    "type": "armor",
    "rarity": "common",
    "price": 1490,
    "stats": {
      "defense": 8,
      "magicDefense": 9,
      "maxMp": 7
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_298": {
    "id": "arm_298",
    "name": "Удобная Одеяние",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4870,
    "stats": {
      "defense": 27,
      "magicDefense": 35,
      "maxMp": 56
    },
    "description": "Защитный доспех. Уникально для: Маг, Монах, Боец, Маг Крови"
  },
  "arm_299": {
    "id": "arm_299",
    "name": "Усиленная Латы",
    "type": "armor",
    "rarity": "uncommon",
    "price": 7090,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защитный доспех. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_300": {
    "id": "helm_300",
    "name": "Гвардейский Шляпа",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1720,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_301": {
    "id": "helm_301",
    "name": "Стальная Маска",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1642,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_302": {
    "id": "helm_302",
    "name": "Стальная Шляпа",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1550,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_303": {
    "id": "helm_303",
    "name": "Костяной Шляпа",
    "type": "helmet",
    "rarity": "epic",
    "price": 16885,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_304": {
    "id": "helm_304",
    "name": "Дешевый Шляпа",
    "type": "helmet",
    "rarity": "common",
    "price": 332,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_305": {
    "id": "helm_305",
    "name": "Кованый Кожаный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1460,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_306": {
    "id": "helm_306",
    "name": "Простой Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 332,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_307": {
    "id": "helm_307",
    "name": "Устрашающий Копюшон",
    "type": "helmet",
    "rarity": "epic",
    "price": 19120,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_308": {
    "id": "helm_308",
    "name": "Рыцарский Шляпа",
    "type": "helmet",
    "rarity": "rare",
    "price": 4382,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_309": {
    "id": "helm_309",
    "name": "Костяной Маска",
    "type": "helmet",
    "rarity": "epic",
    "price": 18172,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_310": {
    "id": "helm_310",
    "name": "Легкий Шляпа",
    "type": "helmet",
    "rarity": "common",
    "price": 362,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_311": {
    "id": "helm_311",
    "name": "Эпический Кожаный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 16865,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_312": {
    "id": "helm_312",
    "name": "Редкий Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 5930,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_313": {
    "id": "helm_313",
    "name": "Прочный Копюшон",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1760,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_314": {
    "id": "helm_314",
    "name": "Мифриловый Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5697,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_315": {
    "id": "helm_315",
    "name": "Кожаный Маска",
    "type": "helmet",
    "rarity": "common",
    "price": 365,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_316": {
    "id": "helm_316",
    "name": "Тяжелый Латный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1435,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_317": {
    "id": "helm_317",
    "name": "Гвардейский Корона",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1770,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_318": {
    "id": "helm_318",
    "name": "Рыцарский Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 5922,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_319": {
    "id": "helm_319",
    "name": "Редкий Шляпа",
    "type": "helmet",
    "rarity": "rare",
    "price": 4177,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_320": {
    "id": "helm_320",
    "name": "Дешевый Маска",
    "type": "helmet",
    "rarity": "common",
    "price": 400,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_321": {
    "id": "helm_321",
    "name": "Эпический Кожаный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 17575,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_322": {
    "id": "helm_322",
    "name": "Гвардейский Кожаный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1707,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_323": {
    "id": "helm_323",
    "name": "Зачарованный Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5285,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_324": {
    "id": "helm_324",
    "name": "Искусный Маска",
    "type": "helmet",
    "rarity": "rare",
    "price": 5642,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_325": {
    "id": "helm_325",
    "name": "Тяжелый Шляпа",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1390,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_326": {
    "id": "helm_326",
    "name": "Дешевый Корона",
    "type": "helmet",
    "rarity": "common",
    "price": 410,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_327": {
    "id": "helm_327",
    "name": "Устрашающий Копюшон",
    "type": "helmet",
    "rarity": "epic",
    "price": 20837,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_328": {
    "id": "helm_328",
    "name": "Драконий Шляпа",
    "type": "helmet",
    "rarity": "epic",
    "price": 19427,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_329": {
    "id": "helm_329",
    "name": "Магический Латный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 4892,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_330": {
    "id": "helm_330",
    "name": "Украшенный Копюшон",
    "type": "helmet",
    "rarity": "rare",
    "price": 5320,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_331": {
    "id": "helm_331",
    "name": "Эпическая Шляпа",
    "type": "helmet",
    "rarity": "epic",
    "price": 21472,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_332": {
    "id": "helm_332",
    "name": "Обычный Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 412,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_333": {
    "id": "helm_333",
    "name": "Кожаный Копюшон",
    "type": "helmet",
    "rarity": "common",
    "price": 317,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_334": {
    "id": "helm_334",
    "name": "Треснувший Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 402,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_335": {
    "id": "helm_335",
    "name": "Простой Шляпа",
    "type": "helmet",
    "rarity": "common",
    "price": 382,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_336": {
    "id": "helm_336",
    "name": "Прочный Латный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1665,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_337": {
    "id": "helm_337",
    "name": "Надежный Кожаный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1335,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_338": {
    "id": "helm_338",
    "name": "Могущественный Корона",
    "type": "helmet",
    "rarity": "epic",
    "price": 22322,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_339": {
    "id": "helm_339",
    "name": "Драконий Шляпа",
    "type": "helmet",
    "rarity": "epic",
    "price": 20752,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_340": {
    "id": "helm_340",
    "name": "Мифриловый Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5530,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_341": {
    "id": "helm_341",
    "name": "Костяной Латный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 17845,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_342": {
    "id": "helm_342",
    "name": "Дешевый Шляпа",
    "type": "helmet",
    "rarity": "common",
    "price": 440,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_343": {
    "id": "helm_343",
    "name": "Искусный Шляпа",
    "type": "helmet",
    "rarity": "rare",
    "price": 5955,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_344": {
    "id": "helm_344",
    "name": "Коралловый Корона",
    "type": "helmet",
    "rarity": "epic",
    "price": 16727,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_345": {
    "id": "helm_345",
    "name": "Могущественный Корона",
    "type": "helmet",
    "rarity": "epic",
    "price": 16405,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_346": {
    "id": "helm_346",
    "name": "Прочный Копюшон",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1655,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_347": {
    "id": "helm_347",
    "name": "Серебряный Латный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 4897,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_348": {
    "id": "helm_348",
    "name": "Стальная Корона",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1772,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_349": {
    "id": "helm_349",
    "name": "Легкий Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 345,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_350": {
    "id": "helm_350",
    "name": "Кованый Корона",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1750,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_351": {
    "id": "helm_351",
    "name": "Искусный Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 4842,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_352": {
    "id": "helm_352",
    "name": "Украшенный Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 4227,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_353": {
    "id": "helm_353",
    "name": "Грубый Корона",
    "type": "helmet",
    "rarity": "common",
    "price": 387,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_354": {
    "id": "helm_354",
    "name": "Стальная Маска",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1417,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_355": {
    "id": "helm_355",
    "name": "Серебряный Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 4742,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_356": {
    "id": "helm_356",
    "name": "Рыцарский Копюшон",
    "type": "helmet",
    "rarity": "rare",
    "price": 5307,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_357": {
    "id": "helm_357",
    "name": "Легкий Маска",
    "type": "helmet",
    "rarity": "common",
    "price": 430,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_358": {
    "id": "helm_358",
    "name": "Драконий Кожаный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 15452,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_359": {
    "id": "helm_359",
    "name": "Мифриловый Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 4995,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_360": {
    "id": "helm_360",
    "name": "Драконий Маска",
    "type": "helmet",
    "rarity": "epic",
    "price": 17950,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_361": {
    "id": "helm_361",
    "name": "Могущественный Корона",
    "type": "helmet",
    "rarity": "epic",
    "price": 18552,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_362": {
    "id": "helm_362",
    "name": "Зачарованный Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5075,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_363": {
    "id": "helm_363",
    "name": "Редкий Маска",
    "type": "helmet",
    "rarity": "rare",
    "price": 4362,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_364": {
    "id": "helm_364",
    "name": "Редкий Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5532,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_365": {
    "id": "helm_365",
    "name": "Зачарованный Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 4355,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_366": {
    "id": "helm_366",
    "name": "Закрытый Кожаный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1437,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_367": {
    "id": "helm_367",
    "name": "Тяжелый Кожаный шлем",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1232,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_368": {
    "id": "helm_368",
    "name": "Гвардейский Копюшон",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1455,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_369": {
    "id": "helm_369",
    "name": "Треснувший Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 312,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_370": {
    "id": "helm_370",
    "name": "Ржавый Копюшон",
    "type": "helmet",
    "rarity": "common",
    "price": 392,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_371": {
    "id": "helm_371",
    "name": "Рогатый Маска",
    "type": "helmet",
    "rarity": "rare",
    "price": 5282,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_372": {
    "id": "helm_372",
    "name": "Треснувший Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 342,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_373": {
    "id": "helm_373",
    "name": "Ржавый Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 412,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_374": {
    "id": "helm_374",
    "name": "Легкий Шляпа",
    "type": "helmet",
    "rarity": "common",
    "price": 377,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_375": {
    "id": "helm_375",
    "name": "Искусный Маска",
    "type": "helmet",
    "rarity": "rare",
    "price": 4632,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_376": {
    "id": "helm_376",
    "name": "Дешевый Корона",
    "type": "helmet",
    "rarity": "common",
    "price": 425,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_377": {
    "id": "helm_377",
    "name": "Старый Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 327,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_378": {
    "id": "helm_378",
    "name": "Эпический Кожаный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 20812,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_379": {
    "id": "helm_379",
    "name": "Медная Корона",
    "type": "helmet",
    "rarity": "common",
    "price": 345,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_380": {
    "id": "helm_380",
    "name": "Мифриловый Кожаный шлем",
    "type": "helmet",
    "rarity": "rare",
    "price": 5557,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_381": {
    "id": "helm_381",
    "name": "Грубый Маска",
    "type": "helmet",
    "rarity": "common",
    "price": 382,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_382": {
    "id": "helm_382",
    "name": "Великий Маска",
    "type": "helmet",
    "rarity": "legendary",
    "price": 120937,
    "stats": {
      "defense": 1265,
      "magicDefense": 630,
      "maxHp": 3210,
      "resistIce": 30,
      "resistLightning": 30,
      "resistFire": 30
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_383": {
    "id": "helm_383",
    "name": "Стальная Шляпа",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1300,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Бард, Алхимик, Маг, Ведьма"
  },
  "helm_384": {
    "id": "helm_384",
    "name": "Железный Маска",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1560,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_385": {
    "id": "helm_385",
    "name": "Простой Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 307,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_386": {
    "id": "helm_386",
    "name": "Рыцарский Корона",
    "type": "helmet",
    "rarity": "rare",
    "price": 5322,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_387": {
    "id": "helm_387",
    "name": "Легкий Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 372,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_388": {
    "id": "helm_388",
    "name": "Кровавый Кожаный шлем",
    "type": "helmet",
    "rarity": "epic",
    "price": 16205,
    "stats": {
      "defense": 325,
      "magicDefense": 150,
      "maxHp": 810,
      "resistPoison": 20,
      "resistFire": 20
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_389": {
    "id": "helm_389",
    "name": "Древний Маска",
    "type": "helmet",
    "rarity": "legendary",
    "price": 105925,
    "stats": {
      "defense": 1265,
      "magicDefense": 630,
      "maxHp": 3210,
      "resistIce": 30,
      "resistLightning": 30,
      "resistFire": 30
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_390": {
    "id": "helm_390",
    "name": "Треснувший Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 330,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_391": {
    "id": "helm_391",
    "name": "Грубый Маска",
    "type": "helmet",
    "rarity": "common",
    "price": 422,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Ассасин, Рыцарь Смерти, Боец, Чернокнижник, Маг Крови"
  },
  "helm_392": {
    "id": "helm_392",
    "name": "Великий Кожаный шлем",
    "type": "helmet",
    "rarity": "legendary",
    "price": 100862,
    "stats": {
      "defense": 1265,
      "magicDefense": 630,
      "maxHp": 3210,
      "resistIce": 30,
      "resistLightning": 30,
      "resistFire": 30
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "helm_393": {
    "id": "helm_393",
    "name": "Легкий Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 335,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_394": {
    "id": "helm_394",
    "name": "Рогатый Копюшон",
    "type": "helmet",
    "rarity": "rare",
    "price": 4575,
    "stats": {
      "defense": 95,
      "magicDefense": 45,
      "maxHp": 235
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_395": {
    "id": "helm_395",
    "name": "Старый Копюшон",
    "type": "helmet",
    "rarity": "common",
    "price": 400,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_396": {
    "id": "helm_396",
    "name": "Железный Корона",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1245,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Маг, Жрец, Рыцарь Смерти, Маг Крови"
  },
  "helm_397": {
    "id": "helm_397",
    "name": "Гвардейский Копюшон",
    "type": "helmet",
    "rarity": "uncommon",
    "price": 1357,
    "stats": {
      "defense": 27,
      "magicDefense": 11,
      "maxHp": 66
    },
    "description": "Защита головы. Уникально для: Разбойник, Ассасин, Маг, Иллюзионист, Некромант, Лучник"
  },
  "helm_398": {
    "id": "helm_398",
    "name": "Обычный Латный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 387,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Воин, Паладин, Рыцарь Смерти, Берсерк"
  },
  "helm_399": {
    "id": "helm_399",
    "name": "Простой Кожаный шлем",
    "type": "helmet",
    "rarity": "common",
    "price": 337,
    "stats": {
      "defense": 8,
      "magicDefense": 1,
      "maxHp": 17
    },
    "description": "Защита головы. Уникально для: Охотник, Инженер, Боец, Монах"
  },
  "acc_400": {
    "id": "acc_400",
    "name": "Простой Реликвия",
    "type": "accessory",
    "rarity": "common",
    "price": 1740,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_401": {
    "id": "acc_401",
    "name": "Иллюзорный Браслет",
    "type": "accessory",
    "rarity": "epic",
    "price": 73950,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_402": {
    "id": "acc_402",
    "name": "Изящный Ожерелье",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6940,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_403": {
    "id": "acc_403",
    "name": "Обычный Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1230,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_404": {
    "id": "acc_404",
    "name": "Хороший Браслет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5250,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_405": {
    "id": "acc_405",
    "name": "Яркий Реликвия",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5650,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_406": {
    "id": "acc_406",
    "name": "Чистый Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5890,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_407": {
    "id": "acc_407",
    "name": "Зачарованный Талисман",
    "type": "accessory",
    "rarity": "rare",
    "price": 19190,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_408": {
    "id": "acc_408",
    "name": "Изящный Браслет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6280,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_409": {
    "id": "acc_409",
    "name": "Крепкий Амулет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 7080,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_410": {
    "id": "acc_410",
    "name": "Древний Кольцо",
    "type": "accessory",
    "rarity": "epic",
    "price": 63350,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_411": {
    "id": "acc_411",
    "name": "Золотой Реликвия",
    "type": "accessory",
    "rarity": "rare",
    "price": 18130,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_412": {
    "id": "acc_412",
    "name": "Зачарованный Браслет",
    "type": "accessory",
    "rarity": "rare",
    "price": 21240,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_413": {
    "id": "acc_413",
    "name": "Сложный Брошь",
    "type": "accessory",
    "rarity": "rare",
    "price": 21080,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_414": {
    "id": "acc_414",
    "name": "Медный Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_415": {
    "id": "acc_415",
    "name": "Золотое Ожерелье",
    "type": "accessory",
    "rarity": "rare",
    "price": 20090,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_416": {
    "id": "acc_416",
    "name": "Рунный Серьги",
    "type": "accessory",
    "rarity": "rare",
    "price": 16630,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_417": {
    "id": "acc_417",
    "name": "Дешевый Реликвия",
    "type": "accessory",
    "rarity": "common",
    "price": 1310,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_418": {
    "id": "acc_418",
    "name": "Крепкий Браслет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6810,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_419": {
    "id": "acc_419",
    "name": "Иллюзорный Талисман",
    "type": "accessory",
    "rarity": "epic",
    "price": 88540,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_420": {
    "id": "acc_420",
    "name": "Серебряный Серьги",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6320,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_421": {
    "id": "acc_421",
    "name": "Тусклый Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1670,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_422": {
    "id": "acc_422",
    "name": "Красивый Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5980,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_423": {
    "id": "acc_423",
    "name": "Платиновый Талисман",
    "type": "accessory",
    "rarity": "epic",
    "price": 63210,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_424": {
    "id": "acc_424",
    "name": "Крепкий Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6140,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_425": {
    "id": "acc_425",
    "name": "Проклятый Брошь",
    "type": "accessory",
    "rarity": "epic",
    "price": 75150,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_426": {
    "id": "acc_426",
    "name": "Медный Реликвия",
    "type": "accessory",
    "rarity": "common",
    "price": 1280,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_427": {
    "id": "acc_427",
    "name": "Осколочный Реликвия",
    "type": "accessory",
    "rarity": "common",
    "price": 1340,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_428": {
    "id": "acc_428",
    "name": "Кровавый Серьги",
    "type": "accessory",
    "rarity": "epic",
    "price": 65910,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_429": {
    "id": "acc_429",
    "name": "Изящный Ожерелье",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6100,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_430": {
    "id": "acc_430",
    "name": "Золотой Браслет",
    "type": "accessory",
    "rarity": "rare",
    "price": 16960,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_431": {
    "id": "acc_431",
    "name": "Магический Талисман",
    "type": "accessory",
    "rarity": "rare",
    "price": 21990,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_432": {
    "id": "acc_432",
    "name": "Хороший Браслет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6940,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_433": {
    "id": "acc_433",
    "name": "Рунный Браслет",
    "type": "accessory",
    "rarity": "rare",
    "price": 22490,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_434": {
    "id": "acc_434",
    "name": "Золотой Реликвия",
    "type": "accessory",
    "rarity": "rare",
    "price": 16240,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_435": {
    "id": "acc_435",
    "name": "Красивый Реликвия",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6210,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_436": {
    "id": "acc_436",
    "name": "Медный Кольцо",
    "type": "accessory",
    "rarity": "common",
    "price": 1290,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_437": {
    "id": "acc_437",
    "name": "Иллюзорный Талисман",
    "type": "accessory",
    "rarity": "epic",
    "price": 60970,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_438": {
    "id": "acc_438",
    "name": "Редкий Браслет",
    "type": "accessory",
    "rarity": "rare",
    "price": 22360,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_439": {
    "id": "acc_439",
    "name": "Ценный Брошь",
    "type": "accessory",
    "rarity": "rare",
    "price": 16030,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_440": {
    "id": "acc_440",
    "name": "Красивый Талисман",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6070,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_441": {
    "id": "acc_441",
    "name": "Железный Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5190,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_442": {
    "id": "acc_442",
    "name": "Тусклый Амулет",
    "type": "accessory",
    "rarity": "common",
    "price": 1660,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "maxMp": 17,
      "magicAttack": 3
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_443": {
    "id": "acc_443",
    "name": "Старый Серьги",
    "type": "accessory",
    "rarity": "common",
    "price": 1590,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_444": {
    "id": "acc_444",
    "name": "Простой Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1350,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_445": {
    "id": "acc_445",
    "name": "Золотой Амулет",
    "type": "accessory",
    "rarity": "rare",
    "price": 19050,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "maxMp": 235,
      "magicAttack": 47
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_446": {
    "id": "acc_446",
    "name": "Платиновый Серьги",
    "type": "accessory",
    "rarity": "epic",
    "price": 88430,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_447": {
    "id": "acc_447",
    "name": "Божественный Серьги",
    "type": "accessory",
    "rarity": "legendary",
    "price": 425100,
    "stats": {
      "agility": 820,
      "maxHp": 4320,
      "attack": 40,
      "critRate": 15,
      "critDamage": 50
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_448": {
    "id": "acc_448",
    "name": "Проклятый Брошь",
    "type": "accessory",
    "rarity": "epic",
    "price": 60710,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_449": {
    "id": "acc_449",
    "name": "Простой Кольцо",
    "type": "accessory",
    "rarity": "common",
    "price": 1320,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_450": {
    "id": "acc_450",
    "name": "Магический Реликвия",
    "type": "accessory",
    "rarity": "rare",
    "price": 20660,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_451": {
    "id": "acc_451",
    "name": "Крепкий Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5140,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_452": {
    "id": "acc_452",
    "name": "Потускневший Амулет",
    "type": "accessory",
    "rarity": "common",
    "price": 1470,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "maxMp": 17,
      "magicAttack": 3
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_453": {
    "id": "acc_453",
    "name": "Серебряное Кольцо",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6610,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_454": {
    "id": "acc_454",
    "name": "Золотой Талисман",
    "type": "accessory",
    "rarity": "rare",
    "price": 21620,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_455": {
    "id": "acc_455",
    "name": "Старый Амулет",
    "type": "accessory",
    "rarity": "common",
    "price": 1410,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "maxMp": 17,
      "magicAttack": 3
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_456": {
    "id": "acc_456",
    "name": "Хороший Серьги",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 7010,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_457": {
    "id": "acc_457",
    "name": "Ценный Талисман",
    "type": "accessory",
    "rarity": "rare",
    "price": 18650,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_458": {
    "id": "acc_458",
    "name": "Мифический Серьги",
    "type": "accessory",
    "rarity": "legendary",
    "price": 473900,
    "stats": {
      "agility": 820,
      "maxHp": 4320,
      "attack": 40,
      "critRate": 15,
      "critDamage": 50
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_459": {
    "id": "acc_459",
    "name": "Потускневший Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1710,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_460": {
    "id": "acc_460",
    "name": "Ценный Ожерелье",
    "type": "accessory",
    "rarity": "rare",
    "price": 21910,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_461": {
    "id": "acc_461",
    "name": "Крепкий Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5340,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_462": {
    "id": "acc_462",
    "name": "Серебряный Амулет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6390,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_463": {
    "id": "acc_463",
    "name": "Вечный Талисман",
    "type": "accessory",
    "rarity": "legendary",
    "price": 472660,
    "stats": {
      "agility": 820,
      "maxHp": 4320,
      "attack": 40,
      "critRate": 15,
      "critDamage": 50
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_464": {
    "id": "acc_464",
    "name": "Красивый Серьги",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6630,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_465": {
    "id": "acc_465",
    "name": "Эпический Браслет",
    "type": "accessory",
    "rarity": "epic",
    "price": 86030,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_466": {
    "id": "acc_466",
    "name": "Иллюзорный Брошь",
    "type": "accessory",
    "rarity": "epic",
    "price": 60680,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_467": {
    "id": "acc_467",
    "name": "Хороший Амулет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5570,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_468": {
    "id": "acc_468",
    "name": "Платиновый Амулет",
    "type": "accessory",
    "rarity": "epic",
    "price": 71740,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "maxMp": 760,
      "magicAttack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_469": {
    "id": "acc_469",
    "name": "Легендарная Брошь",
    "type": "accessory",
    "rarity": "legendary",
    "price": 448860,
    "stats": {
      "agility": 820,
      "maxHp": 4320,
      "attack": 40,
      "critRate": 15,
      "critDamage": 50
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_470": {
    "id": "acc_470",
    "name": "Полезный Браслет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4820,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_471": {
    "id": "acc_471",
    "name": "Яркий Талисман",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6740,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_472": {
    "id": "acc_472",
    "name": "Медный Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1650,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_473": {
    "id": "acc_473",
    "name": "Кровавый Брошь",
    "type": "accessory",
    "rarity": "epic",
    "price": 64290,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_474": {
    "id": "acc_474",
    "name": "Ценный Серьги",
    "type": "accessory",
    "rarity": "rare",
    "price": 21580,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_475": {
    "id": "acc_475",
    "name": "Платиновый Амулет",
    "type": "accessory",
    "rarity": "epic",
    "price": 88900,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "maxMp": 760,
      "magicAttack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_476": {
    "id": "acc_476",
    "name": "Яркий Ожерелье",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5190,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_477": {
    "id": "acc_477",
    "name": "Платиновый Серьги",
    "type": "accessory",
    "rarity": "epic",
    "price": 84160,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_478": {
    "id": "acc_478",
    "name": "Загадочный Браслет",
    "type": "accessory",
    "rarity": "epic",
    "price": 67850,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_479": {
    "id": "acc_479",
    "name": "Золотое Кольцо",
    "type": "accessory",
    "rarity": "rare",
    "price": 18530,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_480": {
    "id": "acc_480",
    "name": "Изящный Серьги",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5280,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_481": {
    "id": "acc_481",
    "name": "Чистый Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6750,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_482": {
    "id": "acc_482",
    "name": "Потускневший Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1250,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_483": {
    "id": "acc_483",
    "name": "Деревянный Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1590,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_484": {
    "id": "acc_484",
    "name": "Красивый Амулет",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5500,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "maxMp": 66,
      "magicAttack": 13
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_485": {
    "id": "acc_485",
    "name": "Обычный Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1270,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_486": {
    "id": "acc_486",
    "name": "Крепкий Талисман",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6840,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_487": {
    "id": "acc_487",
    "name": "Рунный Амулет",
    "type": "accessory",
    "rarity": "rare",
    "price": 22410,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "maxMp": 235,
      "magicAttack": 47
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_488": {
    "id": "acc_488",
    "name": "Простой Браслет",
    "type": "accessory",
    "rarity": "common",
    "price": 1540,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_489": {
    "id": "acc_489",
    "name": "Крепкий Брошь",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 6140,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_490": {
    "id": "acc_490",
    "name": "Золотой Серьги",
    "type": "accessory",
    "rarity": "rare",
    "price": 20530,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_491": {
    "id": "acc_491",
    "name": "Простой Кольцо",
    "type": "accessory",
    "rarity": "common",
    "price": 1290,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_492": {
    "id": "acc_492",
    "name": "Резной Серьги",
    "type": "accessory",
    "rarity": "rare",
    "price": 19800,
    "stats": {
      "agility": 60,
      "maxHp": 320,
      "attack": 45
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_493": {
    "id": "acc_493",
    "name": "Крепкий Ожерелье",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 5310,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_494": {
    "id": "acc_494",
    "name": "Медный Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1700,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_495": {
    "id": "acc_495",
    "name": "Платиновый Кольцо",
    "type": "accessory",
    "rarity": "epic",
    "price": 76210,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_496": {
    "id": "acc_496",
    "name": "Тусклый Талисман",
    "type": "accessory",
    "rarity": "common",
    "price": 1690,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_497": {
    "id": "acc_497",
    "name": "Могущественный Реликвия",
    "type": "accessory",
    "rarity": "epic",
    "price": 89600,
    "stats": {
      "agility": 200,
      "maxHp": 1020,
      "attack": 15,
      "critRate": 8,
      "critDamage": 25
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_498": {
    "id": "acc_498",
    "name": "Яркий Ожерелье",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4900,
    "stats": {
      "agility": 15,
      "maxHp": 95,
      "attack": 11
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "acc_499": {
    "id": "acc_499",
    "name": "Тусклый Серьги",
    "type": "accessory",
    "rarity": "common",
    "price": 1700,
    "stats": {
      "agility": 2,
      "maxHp": 30,
      "attack": 1
    },
    "description": "Украшение или реликвия. Подходит всем классам."
  },
  "gem_1": {
    "id": "gem_1",
    "name": "Необычный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 60,
    "stats": {
      "resistDark": 3
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_2": {
    "id": "gem_2",
    "name": "Хороший Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "critRate": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_3": {
    "id": "gem_3",
    "name": "Ограненный Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "critRate": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_4": {
    "id": "gem_4",
    "name": "Эпический Алмаз",
    "type": "material",
    "rarity": "epic",
    "price": 4800,
    "stats": {
      "magicAttack": 48
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_5": {
    "id": "gem_5",
    "name": "Необычный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 220,
    "stats": {
      "maxHp": 11
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_6": {
    "id": "gem_6",
    "name": "Ограненный Аметист",
    "type": "material",
    "rarity": "uncommon",
    "price": 80,
    "stats": {
      "resistFire": 4
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_7": {
    "id": "gem_7",
    "name": "Чистый Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "defense": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_8": {
    "id": "gem_8",
    "name": "Необычный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "resistFire": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_9": {
    "id": "gem_9",
    "name": "Необычный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "resistIce": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_10": {
    "id": "gem_10",
    "name": "Чистый Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "critRate": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_11": {
    "id": "gem_11",
    "name": "Ограненный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "resistDark": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_12": {
    "id": "gem_12",
    "name": "Сверкающий Сапфир",
    "type": "material",
    "rarity": "epic",
    "price": 4400,
    "stats": {
      "magicDefense": 44
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_13": {
    "id": "gem_13",
    "name": "Необычный Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "resistFire": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_14": {
    "id": "gem_14",
    "name": "Идеальный Алмаз",
    "type": "material",
    "rarity": "epic",
    "price": 4800,
    "stats": {
      "maxMp": 48
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_15": {
    "id": "gem_15",
    "name": "Ограненный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "resistIce": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_16": {
    "id": "gem_16",
    "name": "Необычный Аметист",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "resistDark": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_17": {
    "id": "gem_17",
    "name": "Хороший Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "critRate": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_18": {
    "id": "gem_18",
    "name": "Ограненный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 300,
    "stats": {
      "maxMp": 15
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_19": {
    "id": "gem_19",
    "name": "Ограненный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "resistDark": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_20": {
    "id": "gem_20",
    "name": "Хороший Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "resistDark": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_21": {
    "id": "gem_21",
    "name": "Ограненный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 280,
    "stats": {
      "critDamage": 14
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_22": {
    "id": "gem_22",
    "name": "Чистый Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "resistFire": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_23": {
    "id": "gem_23",
    "name": "Редкий Изумруд",
    "type": "material",
    "rarity": "rare",
    "price": 760,
    "stats": {
      "critRate": 19
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_24": {
    "id": "gem_24",
    "name": "Ограненный Алмаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 260,
    "stats": {
      "maxMp": 13
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_25": {
    "id": "gem_25",
    "name": "Ограненный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "maxHp": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_26": {
    "id": "gem_26",
    "name": "Необычный Аметист",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "maxMp": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_27": {
    "id": "gem_27",
    "name": "Хороший Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 260,
    "stats": {
      "critDamage": 13
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_28": {
    "id": "gem_28",
    "name": "Ограненный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 220,
    "stats": {
      "magicAttack": 11
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_29": {
    "id": "gem_29",
    "name": "Ограненный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 260,
    "stats": {
      "agility": 13
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_30": {
    "id": "gem_30",
    "name": "Хороший Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 280,
    "stats": {
      "magicAttack": 14
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_31": {
    "id": "gem_31",
    "name": "Сияющий Рубин",
    "type": "material",
    "rarity": "rare",
    "price": 360,
    "stats": {
      "resistFire": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_32": {
    "id": "gem_32",
    "name": "Необычный Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 220,
    "stats": {
      "magicAttack": 11
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_33": {
    "id": "gem_33",
    "name": "Большой Изумруд",
    "type": "material",
    "rarity": "rare",
    "price": 360,
    "stats": {
      "critRate": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_34": {
    "id": "gem_34",
    "name": "Сверкающий Алмаз",
    "type": "material",
    "rarity": "epic",
    "price": 2500,
    "stats": {
      "resistDark": 25
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_35": {
    "id": "gem_35",
    "name": "Сияющий Топаз",
    "type": "material",
    "rarity": "rare",
    "price": 480,
    "stats": {
      "maxHp": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_36": {
    "id": "gem_36",
    "name": "Хороший Аметист",
    "type": "material",
    "rarity": "uncommon",
    "price": 360,
    "stats": {
      "magicDefense": 18
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_37": {
    "id": "gem_37",
    "name": "Ограненный Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "resistIce": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_38": {
    "id": "gem_38",
    "name": "Сияющий Кварц",
    "type": "material",
    "rarity": "rare",
    "price": 880,
    "stats": {
      "defense": 22
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_39": {
    "id": "gem_39",
    "name": "Чистый Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "resistIce": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_40": {
    "id": "gem_40",
    "name": "Безупречный Кристалл",
    "type": "material",
    "rarity": "rare",
    "price": 800,
    "stats": {
      "maxHp": 20
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_41": {
    "id": "gem_41",
    "name": "Идеальный Рубин",
    "type": "material",
    "rarity": "epic",
    "price": 4400,
    "stats": {
      "critDamage": 44
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_42": {
    "id": "gem_42",
    "name": "Чистый Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "critDamage": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_43": {
    "id": "gem_43",
    "name": "Редкий Изумруд",
    "type": "material",
    "rarity": "rare",
    "price": 640,
    "stats": {
      "critRate": 16
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_44": {
    "id": "gem_44",
    "name": "Ограненный Алмаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "agility": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_45": {
    "id": "gem_45",
    "name": "Ограненный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "resistIce": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_46": {
    "id": "gem_46",
    "name": "Редкий Аметист",
    "type": "material",
    "rarity": "rare",
    "price": 800,
    "stats": {
      "maxMp": 20
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_47": {
    "id": "gem_47",
    "name": "Хороший Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 220,
    "stats": {
      "maxMp": 11
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_48": {
    "id": "gem_48",
    "name": "Ограненный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "agility": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_49": {
    "id": "gem_49",
    "name": "Безупречный Оникс",
    "type": "material",
    "rarity": "rare",
    "price": 480,
    "stats": {
      "magicDefense": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_50": {
    "id": "gem_50",
    "name": "Хороший Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 240,
    "stats": {
      "maxMp": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_51": {
    "id": "gem_51",
    "name": "Большой Рубин",
    "type": "material",
    "rarity": "rare",
    "price": 360,
    "stats": {
      "critRate": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_52": {
    "id": "gem_52",
    "name": "Ограненный Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "critRate": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_53": {
    "id": "gem_53",
    "name": "Чистый Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 240,
    "stats": {
      "attack": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_54": {
    "id": "gem_54",
    "name": "Хороший Алмаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 80,
    "stats": {
      "resistDark": 4
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_55": {
    "id": "gem_55",
    "name": "Хороший Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 360,
    "stats": {
      "agility": 18
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_56": {
    "id": "gem_56",
    "name": "Сверкающий Аметист",
    "type": "material",
    "rarity": "epic",
    "price": 2100,
    "stats": {
      "resistFire": 21
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_57": {
    "id": "gem_57",
    "name": "Необычный Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "attack": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_58": {
    "id": "gem_58",
    "name": "Хороший Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "agility": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_59": {
    "id": "gem_59",
    "name": "Хороший Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "critDamage": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_60": {
    "id": "gem_60",
    "name": "Необычный Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 220,
    "stats": {
      "attack": 11
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_61": {
    "id": "gem_61",
    "name": "Необычный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 240,
    "stats": {
      "maxMp": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_62": {
    "id": "gem_62",
    "name": "Хороший Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "magicDefense": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_63": {
    "id": "gem_63",
    "name": "Ограненный Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 280,
    "stats": {
      "magicAttack": 14
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_64": {
    "id": "gem_64",
    "name": "Необычный Алмаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 80,
    "stats": {
      "critRate": 4
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_65": {
    "id": "gem_65",
    "name": "Необычный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 380,
    "stats": {
      "magicDefense": 19
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_66": {
    "id": "gem_66",
    "name": "Безупречный Аметист",
    "type": "material",
    "rarity": "rare",
    "price": 1360,
    "stats": {
      "magicAttack": 34
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_67": {
    "id": "gem_67",
    "name": "Сияющий Опал",
    "type": "material",
    "rarity": "rare",
    "price": 1040,
    "stats": {
      "magicAttack": 26
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_68": {
    "id": "gem_68",
    "name": "Необычный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "critRate": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_69": {
    "id": "gem_69",
    "name": "Необычный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 60,
    "stats": {
      "resistFire": 3
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_70": {
    "id": "gem_70",
    "name": "Чистый Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "agility": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_71": {
    "id": "gem_71",
    "name": "Сверкающий Рубин",
    "type": "material",
    "rarity": "epic",
    "price": 2000,
    "stats": {
      "attack": 20
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_72": {
    "id": "gem_72",
    "name": "Редкий Сапфир",
    "type": "material",
    "rarity": "rare",
    "price": 880,
    "stats": {
      "attack": 22
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_73": {
    "id": "gem_73",
    "name": "Хороший Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "resistDark": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_74": {
    "id": "gem_74",
    "name": "Сияющий Алмаз",
    "type": "material",
    "rarity": "rare",
    "price": 1280,
    "stats": {
      "defense": 32
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_75": {
    "id": "gem_75",
    "name": "Чистый Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 320,
    "stats": {
      "magicDefense": 16
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_76": {
    "id": "gem_76",
    "name": "Древний Аметист",
    "type": "material",
    "rarity": "epic",
    "price": 3900,
    "stats": {
      "resistFire": 39
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_77": {
    "id": "gem_77",
    "name": "Ограненный Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "critRate": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_78": {
    "id": "gem_78",
    "name": "Сияющий Кварц",
    "type": "material",
    "rarity": "rare",
    "price": 1360,
    "stats": {
      "maxMp": 34
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_79": {
    "id": "gem_79",
    "name": "Чистый Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "agility": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_80": {
    "id": "gem_80",
    "name": "Ограненный Кристалл",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "resistFire": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_81": {
    "id": "gem_81",
    "name": "Необычный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 200,
    "stats": {
      "attack": 10
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_82": {
    "id": "gem_82",
    "name": "Хороший Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 80,
    "stats": {
      "critRate": 4
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_83": {
    "id": "gem_83",
    "name": "Ограненный Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "magicDefense": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_84": {
    "id": "gem_84",
    "name": "Редкий Алмаз",
    "type": "material",
    "rarity": "rare",
    "price": 480,
    "stats": {
      "resistDark": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_85": {
    "id": "gem_85",
    "name": "Необычный Топаз",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "maxHp": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_86": {
    "id": "gem_86",
    "name": "Безупречный Аметист",
    "type": "material",
    "rarity": "rare",
    "price": 480,
    "stats": {
      "attack": 12
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_87": {
    "id": "gem_87",
    "name": "Сияющий Опал",
    "type": "material",
    "rarity": "rare",
    "price": 1200,
    "stats": {
      "defense": 30
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_88": {
    "id": "gem_88",
    "name": "Редкий Кварц",
    "type": "material",
    "rarity": "rare",
    "price": 1360,
    "stats": {
      "magicDefense": 34
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_89": {
    "id": "gem_89",
    "name": "Необычный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 380,
    "stats": {
      "agility": 19
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_90": {
    "id": "gem_90",
    "name": "Сияющий Кристалл",
    "type": "material",
    "rarity": "rare",
    "price": 1120,
    "stats": {
      "maxHp": 28
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_91": {
    "id": "gem_91",
    "name": "Необычный Рубин",
    "type": "material",
    "rarity": "uncommon",
    "price": 160,
    "stats": {
      "resistDark": 8
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_92": {
    "id": "gem_92",
    "name": "Хороший Сапфир",
    "type": "material",
    "rarity": "uncommon",
    "price": 60,
    "stats": {
      "resistDark": 3
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_93": {
    "id": "gem_93",
    "name": "Ограненный Изумруд",
    "type": "material",
    "rarity": "uncommon",
    "price": 140,
    "stats": {
      "magicDefense": 7
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_94": {
    "id": "gem_94",
    "name": "Эпический Алмаз",
    "type": "material",
    "rarity": "epic",
    "price": 5200,
    "stats": {
      "defense": 52
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_95": {
    "id": "gem_95",
    "name": "Эпический Топаз",
    "type": "material",
    "rarity": "epic",
    "price": 3600,
    "stats": {
      "attack": 36
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_96": {
    "id": "gem_96",
    "name": "Ограненный Аметист",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "resistFire": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_97": {
    "id": "gem_97",
    "name": "Чистый Опал",
    "type": "material",
    "rarity": "uncommon",
    "price": 180,
    "stats": {
      "agility": 9
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_98": {
    "id": "gem_98",
    "name": "Необычный Кварц",
    "type": "material",
    "rarity": "uncommon",
    "price": 120,
    "stats": {
      "resistDark": 6
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_99": {
    "id": "gem_99",
    "name": "Необычный Оникс",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "stats": {
      "resistFire": 5
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "gem_100": {
    "id": "gem_100",
    "name": "Сияющий Кристалл",
    "type": "material",
    "rarity": "rare",
    "price": 720,
    "stats": {
      "attack": 18
    },
    "description": "Драгоценный камень для встройки в экипировку."
  },
  "enhance_stone_1": { "id": "enhance_stone_1", "name": "Малый Кристалл Энд", "type": "material", "rarity": "common", "price": 100, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_2": { "id": "enhance_stone_2", "name": "Кристалл Энд", "type": "material", "rarity": "uncommon", "price": 500, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_3": { "id": "enhance_stone_3", "name": "Большой Кристалл Энд", "type": "material", "rarity": "rare", "price": 2000, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_4": { "id": "enhance_stone_4", "name": "Великий Кристалл Энд", "type": "material", "rarity": "epic", "price": 10000, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_5": { "id": "enhance_stone_5", "name": "Легендарный Кристалл Энд", "type": "material", "rarity": "legendary", "price": 50000, "description": "Используется у кузнеца для заточки снаряжения." },
  "mat_pelt_1": { "id": "mat_pelt_1", "name": "Обычная Шкура", "type": "material", "rarity": "common", "price": 15, "description": "Шкура зверя. Можно продать в магазине." },
  "mat_pelt_2": { "id": "mat_pelt_2", "name": "Крепкая Шкура", "type": "material", "rarity": "uncommon", "price": 60, "description": "Шкура сильного зверя. Можно продать в магазине." },
  "mat_pelt_3": { "id": "mat_pelt_3", "name": "Редкая Шкура", "type": "material", "rarity": "rare", "price": 250, "description": "Ценная шкура. Можно продать в магазине." },
  "mat_bone_1": { "id": "mat_bone_1", "name": "Кость Монстра", "type": "material", "rarity": "common", "price": 10, "description": "Обычная кость. Можно продать." },
  "mat_fang_1": { "id": "mat_fang_1", "name": "Клык Зверя", "type": "material", "rarity": "uncommon", "price": 45, "description": "Острый клык. Можно продать." }

};


export function parseItemId(id: string) {
  // Pattern: baseId+enhance_sSlots#level[gem1,gem2]
  // Example: wpn_1+5_s2#10[gem_attack_1,gem_crit_1]
  
  let baseId = id;
  let enhance = 0;
  let slots = 0;
  let level = 1;
  let gems: string[] = [];
  
  // Extract gems
  const gemMatch = baseId.match(/\[(.*?)\]$/);
  if (gemMatch) {
    gems = gemMatch[1].split(',').filter(Boolean);
    baseId = baseId.replace(/\[.*?\]$/, '');
  }
  
  // Extract level
  const levelMatch = baseId.match(/#(\d+)$/);
  if (levelMatch) {
    level = parseInt(levelMatch[1]);
    baseId = baseId.replace(/#\d+$/, '');
  }
  
  // Extract slots
  const slotMatch = baseId.match(/_s(\d+)$/);
  if (slotMatch) {
    slots = parseInt(slotMatch[1]);
    baseId = baseId.replace(/_s\d+$/, '');
  }
  
  // Extract enhance
  const enhanceMatch = baseId.match(/\+(\d+)$/);
  if (enhanceMatch) {
    enhance = parseInt(enhanceMatch[1]);
    baseId = baseId.replace(/\+\d+$/, '');
  }
  
  return { baseId, enhance, slots, level, gems };
}

export function buildItemId(baseId: string, enhance: number, slots: number, gems: string[] = [], level: number = 1) {
  let res = baseId;
  if (enhance > 0) res += `+${enhance}`;
  if (slots > 0) res += `_s${slots}`;
  if (level > 1) res += `#${level}`;
  if (gems.length > 0) res += `[${gems.join(',')}]`;
  return res;
}

const PERCENTAGE_STATS = ['critRate', 'critDamage', 'resistPoison', 'resistFire', 'resistIce', 'resistLightning', 'resistDark', 'resistHoly'];

export function getItem(itemId: string): Item | undefined {
  if(!itemId) return undefined;
  const { baseId, slots, level } = parseItemId(itemId);
  const item = ITEM_CATALOG[baseId];
  if (!item) return undefined;
  
  const cloned = JSON.parse(JSON.stringify(item)) as Item;
  cloned.maxSlots = Math.max(cloned.maxSlots || 0, slots);
  cloned.level = level;
  if (level > 1) cloned.name += ` [${level} ур]`;
  
  if (cloned.stats && ['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(cloned.type)) {
     const rarityMult: Record<string, number> = { 'common': 1, 'uncommon': 1.4, 'rare': 2.0, 'epic': 3.5, 'legendary': 6 };
     const mult = rarityMult[cloned.rarity] || 1;
     
     const isMagicWeapon = cloned.type === 'weapon' && cloned.stats.magicAttack && !cloned.stats.attack;

     // Base budget based on item level + item rarity. 
     // Accessories have a slightly lower multiplier to prevent excessive HP stacking.
     const budgetMult = cloned.type === 'accessory' ? 3 : 6;
     
     // Magic weapons get higher base budget to compensate for splitting budget with MP
     const baseBudget = cloned.type === 'accessory' ? 2 : (isMagicWeapon ? 15 : 5);
     
     const budget = baseBudget + level * budgetMult * mult;
     
     let sumLinear = 0;
     for (let k in cloned.stats) {
         if (!PERCENTAGE_STATS.includes(k) && typeof cloned.stats[k as keyof ItemStats] === 'number') {
             sumLinear += cloned.stats[k as keyof ItemStats] as number;
         }
     }
     
     if (sumLinear > 0) {
         for (let k in cloned.stats) {
             if (!PERCENTAGE_STATS.includes(k) && typeof cloned.stats[k as keyof ItemStats] === 'number') {
                 let proportion = (cloned.stats[k as keyof ItemStats] as number) / sumLinear;
                 
                 let newVal = 0;
                 if (cloned.rarity === 'common') {
                     let baseVal = (item.stats as any)[k] as number;
                     newVal = baseVal + (level - 1) * 2 * proportion;
                 } else if (cloned.rarity === 'uncommon') {
                     let baseVal = (item.stats as any)[k] as number;
                     newVal = baseVal + (level - 1) * 3 * proportion;
                 } else {
                     newVal = budget * proportion;
                 }
                 
                 newVal = Math.floor(newVal);
                 if (newVal < 1) newVal = 1;
                 (cloned.stats as any)[k] = newVal;
             }
         }
     }
  }
  
  if (['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(cloned.type)) {
     const rarityMult: Record<string, number> = { 'common': 1, 'uncommon': 1.4, 'rare': 2.0, 'epic': 3.5, 'legendary': 6 };
     const mult = rarityMult[cloned.rarity] || 1;
     
     const basePrices: Record<string, number> = { 'common': 1000, 'uncommon': 2500, 'rare': 6000, 'epic': 15000, 'legendary': 50000 };
     let basePriceTemp = basePrices[cloned.rarity] || 1000;
     cloned.price = Math.floor(basePriceTemp + basePriceTemp * (level - 1) * 0.4);
  } else if (cloned.type === 'consumable') {
     cloned.price = cloned.rarity === 'rare' ? 2500 : (cloned.rarity === 'uncommon' ? 1500 : 1000);
  } else if (cloned.type === 'material' || (cloned.type as any) === 'junk') {
     cloned.price = 1000;
  }
  
  cloned.price = Math.max(1000, cloned.price);

  return cloned;
}

export function getItemByName(name: string): Item | undefined {
  return Object.values(ITEM_CATALOG).find(i => i.name === name);
}
