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
  hpRegen?: number;
  mpRegen?: number;
  lifesteal?: number;
  dodgeChance?: number;
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
  "wpn_req_war_1": {
    "id": "wpn_req_war_1",
    "name": "Освященный Гладиус",
    "description": "Крепкий клинок для воина.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "attack": 6,
      "defense": 10
    },
    "allowedClasses": [
      "Воин"
    ]
  },
  "wpn_req_war_2": {
    "id": "wpn_req_war_2",
    "name": "Громовой Двуручник",
    "description": "Огромный меч, искрящийся молниями.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "attack": 14,
      "critDamage": 20
    },
    "allowedClasses": [
      "Воин",
      "Берсерк"
    ]
  },
  "wpn_req_mag_1": {
    "id": "wpn_req_mag_1",
    "name": "Посох Ясновидца",
    "description": "Усиливает магические потоки.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "magicAttack": 7,
      "mp": 30
    },
    "allowedClasses": [
      "Маг",
      "Иллюзионист"
    ]
  },
  "wpn_req_mag_2": {
    "id": "wpn_req_mag_2",
    "name": "Сфера Пустоты",
    "description": "Темный артефакт поражающей мощи.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "magicAttack": 15,
      "magicDefense": 20
    },
    "allowedClasses": [
      "Маг",
      "Чернокнижник"
    ]
  },
  "wpn_req_rog_1": {
    "id": "wpn_req_rog_1",
    "name": "Кинжал Тени",
    "description": "Лезвие, не отражающее свет.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "attack": 6,
      "agility": 15
    },
    "allowedClasses": [
      "Разбойник",
      "Ассасин"
    ]
  },
  "wpn_req_rog_2": {
    "id": "wpn_req_rog_2",
    "name": "Парные Клинки Фантома",
    "description": "Режут пространство и время.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "attack": 13,
      "critRate": 15,
      "agility": 30
    },
    "allowedClasses": [
      "Разбойник",
      "Ассасин"
    ]
  },
  "wpn_req_arc_1": {
    "id": "wpn_req_arc_1",
    "name": "Охотничий Длинный Лук",
    "description": "Отличный лук для стрельбы на дистанцию.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "attack": 7,
      "agility": 5
    },
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
  },
  "wpn_req_arc_2": {
    "id": "wpn_req_arc_2",
    "name": "Штормовой Арбалет",
    "description": "Каждый выстрел подобен удару грома.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "attack": 15,
      "critRate": 10
    },
    "allowedClasses": [
      "Лучник"
    ]
  },
  "wpn_req_pri_1": {
    "id": "wpn_req_pri_1",
    "name": "Кадило Веры",
    "description": "Наполняет союзников светом.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "magicAttack": 6,
      "magicDefense": 20
    },
    "allowedClasses": [
      "Жрец"
    ]
  },
  "wpn_req_pri_2": {
    "id": "wpn_req_pri_2",
    "name": "Священный Жезл Рассвета",
    "description": "Прогоняет тьму одним взмахом.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "magicAttack": 13,
      "hp": 100
    },
    "allowedClasses": [
      "Жрец",
      "Паладин"
    ]
  },
  "wpn_req_pal_1": {
    "id": "wpn_req_pal_1",
    "name": "Булава Справедливости",
    "description": "Оружие святого воителя.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "attack": 5,
      "defense": 25
    },
    "allowedClasses": [
      "Паладин"
    ]
  },
  "wpn_req_pal_2": {
    "id": "wpn_req_pal_2",
    "name": "Молот Небес",
    "description": "Карает грешников яркой вспышкой.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "attack": 12,
      "magicAttack": 7,
      "defense": 15
    },
    "allowedClasses": [
      "Паладин"
    ]
  },
  "wpn_req_dru_1": {
    "id": "wpn_req_dru_1",
    "name": "Осколок Древа Животных",
    "description": "Мощный природный артефакт.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "magicAttack": 6,
      "attack": 4
    },
    "allowedClasses": [
      "Друид"
    ]
  },
  "wpn_req_dru_2": {
    "id": "wpn_req_dru_2",
    "name": "Коса Жизни и Смерти",
    "description": "Поддерживает баланс природы.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "magicAttack": 11,
      "attack": 11
    },
    "allowedClasses": [
      "Друид",
      "Шаман"
    ]
  },
  "wpn_req_bar_1": {
    "id": "wpn_req_bar_1",
    "name": "Зачарованная Флейта",
    "description": "Ее музыка сводит с ума врагов.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "magicAttack": 5,
      "agility": 20
    },
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_req_bar_2": {
    "id": "wpn_req_bar_2",
    "name": "Арфа Звездного Света",
    "description": "Струны из лунного луча.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "magicAttack": 11,
      "mp": 150,
      "agility": 40
    },
    "allowedClasses": [
      "Бард"
    ]
  },
  "wpn_req_mon_1": {
    "id": "wpn_req_mon_1",
    "name": "Тяжелые Кастеты",
    "description": "Атака в ближнем бою.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "attack": 6,
      "agility": 10
    },
    "allowedClasses": [
      "Монах",
      "Боец"
    ]
  },
  "wpn_req_mon_2": {
    "id": "wpn_req_mon_2",
    "name": "Перчатки Дракона",
    "description": "Излучают жар при ударе.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "attack": 13,
      "critRate": 10,
      "agility": 25
    },
    "allowedClasses": [
      "Монах",
      "Боец"
    ]
  },
  "wpn_req_nec_1": {
    "id": "wpn_req_nec_1",
    "name": "Книга Мертвых",
    "description": "Наполнена темной магией.",
    "type": "weapon",
    "rarity": "uncommon",
    "price": 2500,
    "stats": {
      "magicAttack": 7,
      "hp": -20
    },
    "allowedClasses": [
      "Некромант",
      "Рыцарь Смерти"
    ]
  },
  "wpn_req_nec_2": {
    "id": "wpn_req_nec_2",
    "name": "Посох Черепов",
    "description": "Шепчет секреты мертвецов.",
    "type": "weapon",
    "rarity": "epic",
    "price": 15000,
    "stats": {
      "magicAttack": 16,
      "magicDefense": -20
    },
    "allowedClasses": [
      "Некромант",
      "Чернокнижник"
    ]
  },
  "cons_1": {
    "id": "cons_1",
    "name": "Малое зелье здоровья",
    "rarity": "common",
    "healAmount": 50,
    "price": 50,
    "type": "consumable",
    "description": "Восстанавливает 50 ХП."
  },
  "cons_2": {
    "id": "cons_2",
    "name": "Среднее зелье здоровья",
    "rarity": "uncommon",
    "healAmount": 150,
    "price": 100,
    "type": "consumable",
    "description": "Восстанавливает 150 ХП."
  },
  "cons_3": {
    "id": "cons_3",
    "name": "Большое зелье здоровья",
    "rarity": "rare",
    "healAmount": 400,
    "price": 200,
    "type": "consumable",
    "description": "Восстанавливает 400 ХП."
  },
  "cons_4": {
    "id": "cons_4",
    "name": "Эликсир Жизни",
    "rarity": "epic",
    "healAmount": 1000,
    "price": 500,
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
      "magicAttack": 6,
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
      "magicAttack": 6,
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
      "attack": 15,
      "critRate": 10,
      "critDamage": 30,
      "agility": 1
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
      "attack": 6
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
      "magicAttack": 14,
      "maxMp": 30
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
      "attack": 15,
      "critRate": 20,
      "critDamage": 60,
      "agility": 15,
      "maxHp": 30
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
      "attack": 14
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
      "attack": 3
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 3,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 3,
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
      "attack": 14
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
      "attack": 3
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
      "magicAttack": 3,
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
      "magicAttack": 3,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 6,
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
      "attack": 3
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
      "magicAttack": 6,
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
      "magicAttack": 3,
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
      "magicAttack": 6,
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
      "magicAttack": 3,
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
      "magicAttack": 6,
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
      "attack": 6
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
      "attack": 14
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
      "magicAttack": 3,
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
      "attack": 6
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
      "attack": 3
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
      "attack": 15,
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
      "attack": 6
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
      "attack": 3
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
      "attack": 14
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
      "attack": 14
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
      "attack": 6
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
      "attack": 3
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
      "magicAttack": 15,
      "maxMp": 30,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 14,
      "maxMp": 30
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
      "attack": 3
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
      "attack": 3
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
      "magicAttack": 3,
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
      "magicAttack": 6,
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
      "attack": 14
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
      "attack": 14
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
      "attack": 6
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
      "attack": 6
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
      "attack": 6
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
      "attack": 15,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 3,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 6,
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
      "magicAttack": 15,
      "maxMp": 30,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 6,
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
      "attack": 14
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
      "attack": 3
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
      "magicAttack": 15,
      "maxMp": 30,
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
      "magicAttack": 3,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 3,
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
      "magicAttack": 6,
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
      "magicAttack": 3,
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
      "magicAttack": 6,
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
      "attack": 14
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
      "attack": 14
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
      "attack": 14
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
      "magicAttack": 6,
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
      "attack": 3
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
      "attack": 3
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
      "attack": 15,
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
      "attack": 6
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
      "magicAttack": 15,
      "maxMp": 30,
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
      "magicAttack": 15,
      "maxMp": 30,
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
      "magicAttack": 14,
      "maxMp": 30
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
      "magicAttack": 14,
      "maxMp": 30
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
      "attack": 3
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
      "attack": 14
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
      "magicAttack": 6,
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
      "magicAttack": 6,
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
      "attack": 3
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
      "magicAttack": 3,
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
      "magicAttack": 3,
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
      "attack": 6
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
      "magicAttack": 6,
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
      "magicAttack": 6,
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
      "attack": 3
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
      "attack": 14
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
      "magicAttack": 6,
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
      "magicAttack": 3,
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
      "attack": 3
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
      "attack": 15,
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
      "attack": 14
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
      "magicAttack": 3,
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
      "attack": 3
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
      "magicAttack": 6,
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
      "magicAttack": 3,
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
      "attack": 6
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
      "attack": 3
    },
    "description": "Вместительный урон. Уникально для: Лучник, Охотник",
    "allowedClasses": [
      "Лучник",
      "Охотник"
    ]
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
      "magicAttack": 15
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
      "magicDefense": 15
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
      "magicAttack": 15
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
      "defense": 15
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
      "magicDefense": 15
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
      "defense": 15
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
      "attack": 15
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
  "enhance_stone_1": {
    "id": "enhance_stone_1",
    "name": "Малый Кристалл Энд",
    "type": "material",
    "rarity": "common",
    "price": 100,
    "description": "Используется у кузнеца для заточки снаряжения."
  },
  "enhance_stone_2": {
    "id": "enhance_stone_2",
    "name": "Кристалл Энд",
    "type": "material",
    "rarity": "uncommon",
    "price": 500,
    "description": "Используется у кузнеца для заточки снаряжения."
  },
  "enhance_stone_3": {
    "id": "enhance_stone_3",
    "name": "Большой Кристалл Энд",
    "type": "material",
    "rarity": "rare",
    "price": 2000,
    "description": "Используется у кузнеца для заточки снаряжения."
  },
  "enhance_stone_4": {
    "id": "enhance_stone_4",
    "name": "Великий Кристалл Энд",
    "type": "material",
    "rarity": "epic",
    "price": 10000,
    "description": "Используется у кузнеца для заточки снаряжения."
  },
  "enhance_stone_5": {
    "id": "enhance_stone_5",
    "name": "Легендарный Кристалл Энд",
    "type": "material",
    "rarity": "legendary",
    "price": 50000,
    "description": "Используется у кузнеца для заточки снаряжения."
  },
  "mat_pelt_1": {
    "id": "mat_pelt_1",
    "name": "Обычная Шкура",
    "type": "material",
    "rarity": "common",
    "price": 80,
    "description": "Шкура зверя. Можно продать в магазине."
  },
  "mat_pelt_2": {
    "id": "mat_pelt_2",
    "name": "Крепкая Шкура",
    "type": "material",
    "rarity": "uncommon",
    "price": 300,
    "description": "Шкура сильного зверя. Можно продать в магазине."
  },
  "mat_pelt_3": {
    "id": "mat_pelt_3",
    "name": "Редкая Шкура",
    "type": "material",
    "rarity": "rare",
    "price": 400,
    "description": "Ценная шкура. Можно продать в магазине."
  },
  "mat_bone_1": {
    "id": "mat_bone_1",
    "name": "Кость Монстра",
    "type": "material",
    "rarity": "common",
    "price": 50,
    "description": "Обычная кость. Можно продать."
  },
  "mat_fang_1": {
    "id": "mat_fang_1",
    "name": "Клык Зверя",
    "type": "material",
    "rarity": "uncommon",
    "price": 100,
    "description": "Острый клык. Можно продать."
  },
  "boss_ent_acc": {
    "id": "boss_ent_acc",
    "name": "Кольцо Древнего Энта",
    "description": "Могущественное кольцо, выпадающее с босса Энта.",
    "type": "accessory",
    "rarity": "epic",
    "price": 10000,
    "stats": {
      "maxHp": 40,
      "defense": 10,
      "hpRegen": 2
    }
  },
  "boss_ent_acc_leg": {
    "id": "boss_ent_acc_leg",
    "name": "Сердце Древнего Энта",
    "description": "Легендарное сердце Древнего Энта.",
    "type": "accessory",
    "rarity": "legendary",
    "price": 50000,
    "stats": {
      "maxHp": 100,
      "defense": 20,
      "hpRegen": 5
    }
  },
  "arm_t5_1": {
    "id": "arm_t5_1",
    "name": "Латный Доспех (Обычный)",
    "description": "Сверхпрочная стальная броня.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 10,
      "maxHp": 20,
      "resistFire": 2
    }
  },
  "arm_t5_2": {
    "id": "arm_t5_2",
    "name": "Латный Доспех (Необычный)",
    "description": "Сверхпрочная стальная броня.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 22,
      "maxHp": 44,
      "resistFire": 4
    }
  },
  "arm_t5_3": {
    "id": "arm_t5_3",
    "name": "Латный Доспех (Редкий)",
    "description": "Сверхпрочная стальная броня.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 40,
      "maxHp": 80,
      "resistFire": 8
    }
  },
  "arm_t5_4": {
    "id": "arm_t5_4",
    "name": "Латный Доспех (Эпический)",
    "description": "Сверхпрочная стальная броня.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 70,
      "maxHp": 140,
      "resistFire": 14
    }
  },
  "arm_t5_5": {
    "id": "arm_t5_5",
    "name": "Латный Доспех (Легендарный)",
    "description": "Сверхпрочная стальная броня. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 140,
      "maxHp": 240,
      "resistFire": 34,
      "resistIce": 10
    }
  },
  "arm_t5_6": {
    "id": "arm_t5_6",
    "name": "Кольчуга (Обычный)",
    "description": "Надёжная защитная сетка",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 6,
      "magicDefense": 4,
      "maxHp": 15
    }
  },
  "arm_t5_7": {
    "id": "arm_t5_7",
    "name": "Кольчуга (Необычный)",
    "description": "Надёжная защитная сетка",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 13,
      "magicDefense": 8,
      "maxHp": 33
    }
  },
  "arm_t5_8": {
    "id": "arm_t5_8",
    "name": "Кольчуга (Редкий)",
    "description": "Надёжная защитная сетка",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 24,
      "magicDefense": 16,
      "maxHp": 60
    }
  },
  "arm_t5_9": {
    "id": "arm_t5_9",
    "name": "Кольчуга (Эпический)",
    "description": "Надёжная защитная сетка",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 42,
      "magicDefense": 28,
      "maxHp": 105
    }
  },
  "arm_t5_10": {
    "id": "arm_t5_10",
    "name": "Кольчуга (Легендарный)",
    "description": "Надёжная защитная сетка [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 72,
      "magicDefense": 48,
      "maxHp": 180,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_11": {
    "id": "arm_t5_11",
    "name": "Кожаная Куртка (Обычный)",
    "description": "Легко двигаться, неплохо защищает.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "agility": 5
    }
  },
  "arm_t5_12": {
    "id": "arm_t5_12",
    "name": "Кожаная Куртка (Необычный)",
    "description": "Легко двигаться, неплохо защищает.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "agility": 11
    }
  },
  "arm_t5_13": {
    "id": "arm_t5_13",
    "name": "Кожаная Куртка (Редкий)",
    "description": "Легко двигаться, неплохо защищает.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "agility": 20
    }
  },
  "arm_t5_14": {
    "id": "arm_t5_14",
    "name": "Кожаная Куртка (Эпический)",
    "description": "Легко двигаться, неплохо защищает.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "agility": 35
    }
  },
  "arm_t5_15": {
    "id": "arm_t5_15",
    "name": "Кожаная Куртка (Легендарный)",
    "description": "Легко двигаться, неплохо защищает. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 60,
      "agility": 75,
      "dodgeChance": 6
    }
  },
  "arm_t5_16": {
    "id": "arm_t5_16",
    "name": "Магическая Мантия (Обычный)",
    "description": "Впитывает магические искажения.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 8,
      "maxMp": 25
    }
  },
  "arm_t5_17": {
    "id": "arm_t5_17",
    "name": "Магическая Мантия (Необычный)",
    "description": "Впитывает магические искажения.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 17,
      "maxMp": 55
    }
  },
  "arm_t5_18": {
    "id": "arm_t5_18",
    "name": "Магическая Мантия (Редкий)",
    "description": "Впитывает магические искажения.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 32,
      "maxMp": 100
    }
  },
  "arm_t5_19": {
    "id": "arm_t5_19",
    "name": "Магическая Мантия (Эпический)",
    "description": "Впитывает магические искажения.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 56,
      "maxMp": 175
    }
  },
  "arm_t5_20": {
    "id": "arm_t5_20",
    "name": "Магическая Мантия (Легендарный)",
    "description": "Впитывает магические искажения. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 96,
      "maxMp": 300,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_21": {
    "id": "arm_t5_21",
    "name": "Мистическое Одеяние (Обычный)",
    "description": "Защищает разум и дух.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 10,
      "maxHp": 10,
      "mpRegen": 1
    }
  },
  "arm_t5_22": {
    "id": "arm_t5_22",
    "name": "Мистическое Одеяние (Необычный)",
    "description": "Защищает разум и дух.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 22,
      "maxHp": 22,
      "mpRegen": 3
    }
  },
  "arm_t5_23": {
    "id": "arm_t5_23",
    "name": "Мистическое Одеяние (Редкий)",
    "description": "Защищает разум и дух.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 40,
      "maxHp": 40,
      "mpRegen": 6
    }
  },
  "arm_t5_24": {
    "id": "arm_t5_24",
    "name": "Мистическое Одеяние (Эпический)",
    "description": "Защищает разум и дух.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 70,
      "maxHp": 70,
      "mpRegen": 10
    }
  },
  "arm_t5_25": {
    "id": "arm_t5_25",
    "name": "Мистическое Одеяние (Легендарный)",
    "description": "Защищает разум и дух. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 135,
      "maxHp": 120,
      "mpRegen": 18,
      "defense": 15
    }
  },
  "arm_t5_26": {
    "id": "arm_t5_26",
    "name": "Броня Крови (Обычный)",
    "description": "Восполняет силы владельца за счет врагов.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "lifesteal": 1,
      "attack": 3
    }
  },
  "arm_t5_27": {
    "id": "arm_t5_27",
    "name": "Броня Крови (Необычный)",
    "description": "Восполняет силы владельца за счет врагов.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "lifesteal": 2,
      "attack": 6
    }
  },
  "arm_t5_28": {
    "id": "arm_t5_28",
    "name": "Броня Крови (Редкий)",
    "description": "Восполняет силы владельца за счет врагов.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "lifesteal": 4,
      "attack": 12
    }
  },
  "arm_t5_29": {
    "id": "arm_t5_29",
    "name": "Броня Крови (Эпический)",
    "description": "Восполняет силы владельца за счет врагов.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "lifesteal": 7,
      "attack": 21
    }
  },
  "arm_t5_30": {
    "id": "arm_t5_30",
    "name": "Броня Крови (Легендарный)",
    "description": "Восполняет силы владельца за счет врагов. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 80,
      "lifesteal": 12,
      "attack": 36,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_31": {
    "id": "arm_t5_31",
    "name": "Облачение Ярости (Обычный)",
    "description": "Защита минимальна, главное — урон.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 3,
      "maxHp": 30,
      "attack": 4,
      "critDamage": 2
    }
  },
  "arm_t5_32": {
    "id": "arm_t5_32",
    "name": "Облачение Ярости (Необычный)",
    "description": "Защита минимальна, главное — урон.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 6,
      "maxHp": 66,
      "attack": 8,
      "critDamage": 4
    }
  },
  "arm_t5_33": {
    "id": "arm_t5_33",
    "name": "Облачение Ярости (Редкий)",
    "description": "Защита минимальна, главное — урон.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 12,
      "maxHp": 120,
      "attack": 16,
      "critDamage": 8
    }
  },
  "arm_t5_34": {
    "id": "arm_t5_34",
    "name": "Облачение Ярости (Эпический)",
    "description": "Защита минимальна, главное — урон.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 21,
      "maxHp": 210,
      "attack": 28,
      "critDamage": 14
    }
  },
  "arm_t5_35": {
    "id": "arm_t5_35",
    "name": "Облачение Ярости (Легендарный)",
    "description": "Защита минимальна, главное — урон. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 36,
      "maxHp": 360,
      "attack": 48,
      "critDamage": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_36": {
    "id": "arm_t5_36",
    "name": "Доспех Рыцаря (Обычный)",
    "description": "Освященная броня.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 8,
      "magicDefense": 5,
      "resistHoly": 2,
      "hpRegen": 1
    }
  },
  "arm_t5_37": {
    "id": "arm_t5_37",
    "name": "Доспех Рыцаря (Необычный)",
    "description": "Освященная броня.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 17,
      "magicDefense": 11,
      "resistHoly": 4,
      "hpRegen": 2
    }
  },
  "arm_t5_38": {
    "id": "arm_t5_38",
    "name": "Доспех Рыцаря (Редкий)",
    "description": "Освященная броня.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 32,
      "magicDefense": 20,
      "resistHoly": 8,
      "hpRegen": 4
    }
  },
  "arm_t5_39": {
    "id": "arm_t5_39",
    "name": "Доспех Рыцаря (Эпический)",
    "description": "Освященная броня.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 56,
      "magicDefense": 35,
      "resistHoly": 14,
      "hpRegen": 7
    }
  },
  "arm_t5_40": {
    "id": "arm_t5_40",
    "name": "Доспех Рыцаря (Легендарный)",
    "description": "Освященная броня. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 96,
      "magicDefense": 60,
      "resistHoly": 24,
      "hpRegen": 12,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_41": {
    "id": "arm_t5_41",
    "name": "Доспех Тени (Обычный)",
    "description": "Сплошной камуфляж.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 4,
      "agility": 7,
      "dodgeChance": 1
    }
  },
  "arm_t5_42": {
    "id": "arm_t5_42",
    "name": "Доспех Тени (Необычный)",
    "description": "Сплошной камуфляж.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 8,
      "agility": 15,
      "dodgeChance": 3
    }
  },
  "arm_t5_43": {
    "id": "arm_t5_43",
    "name": "Доспех Тени (Редкий)",
    "description": "Сплошной камуфляж.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 16,
      "agility": 28,
      "dodgeChance": 6
    }
  },
  "arm_t5_44": {
    "id": "arm_t5_44",
    "name": "Доспех Тени (Эпический)",
    "description": "Сплошной камуфляж.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 28,
      "agility": 49,
      "dodgeChance": 10
    }
  },
  "arm_t5_45": {
    "id": "arm_t5_45",
    "name": "Доспех Тени (Легендарный)",
    "description": "Сплошной камуфляж. [Дарует невероятную выживаемость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 48,
      "agility": 84,
      "dodgeChance": 18,
      "maxHp": 100,
      "hpRegen": 5,
      "resistPoison": 10
    }
  },
  "arm_t5_46": {
    "id": "arm_t5_46",
    "name": "Одеяние Скверны (Обычный)",
    "description": "Осколки душ вплетены в ткань.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 7,
      "magicAttack": 5,
      "resistDark": 2
    }
  },
  "arm_t5_47": {
    "id": "arm_t5_47",
    "name": "Одеяние Скверны (Необычный)",
    "description": "Осколки душ вплетены в ткань.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 15,
      "magicAttack": 11,
      "resistDark": 4
    }
  },
  "arm_t5_48": {
    "id": "arm_t5_48",
    "name": "Одеяние Скверны (Редкий)",
    "description": "Осколки душ вплетены в ткань.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 28,
      "magicAttack": 20,
      "resistDark": 8
    }
  },
  "arm_t5_49": {
    "id": "arm_t5_49",
    "name": "Одеяние Скверны (Эпический)",
    "description": "Осколки душ вплетены в ткань.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 49,
      "magicAttack": 35,
      "resistDark": 14
    }
  },
  "arm_t5_50": {
    "id": "arm_t5_50",
    "name": "Одеяние Скверны (Легендарный)",
    "description": "Осколки душ вплетены в ткань. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 84,
      "magicAttack": 60,
      "resistDark": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_51": {
    "id": "arm_t5_51",
    "name": "Броня Колосса (Обычный)",
    "description": "Невероятно массивная броня.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 12,
      "maxHp": 40,
      "agility": -2
    }
  },
  "arm_t5_52": {
    "id": "arm_t5_52",
    "name": "Броня Колосса (Необычный)",
    "description": "Невероятно массивная броня.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 26,
      "maxHp": 88,
      "agility": -5
    }
  },
  "arm_t5_53": {
    "id": "arm_t5_53",
    "name": "Броня Колосса (Редкий)",
    "description": "Невероятно массивная броня.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 48,
      "maxHp": 160,
      "agility": -8
    }
  },
  "arm_t5_54": {
    "id": "arm_t5_54",
    "name": "Броня Колосса (Эпический)",
    "description": "Невероятно массивная броня.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 84,
      "maxHp": 280,
      "agility": -14
    }
  },
  "arm_t5_55": {
    "id": "arm_t5_55",
    "name": "Броня Колосса (Легендарный)",
    "description": "Невероятно массивная броня. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 164,
      "maxHp": 480,
      "agility": -24,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_56": {
    "id": "arm_t5_56",
    "name": "Доспех Ветра (Обычный)",
    "description": "Позволяет парить над полем боя.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 10,
      "dodgeChance": 2
    }
  },
  "arm_t5_57": {
    "id": "arm_t5_57",
    "name": "Доспех Ветра (Необычный)",
    "description": "Позволяет парить над полем боя.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 22,
      "dodgeChance": 4
    }
  },
  "arm_t5_58": {
    "id": "arm_t5_58",
    "name": "Доспех Ветра (Редкий)",
    "description": "Позволяет парить над полем боя.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 40,
      "dodgeChance": 8
    }
  },
  "arm_t5_59": {
    "id": "arm_t5_59",
    "name": "Доспех Ветра (Эпический)",
    "description": "Позволяет парить над полем боя.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 70,
      "dodgeChance": 14
    }
  },
  "arm_t5_60": {
    "id": "arm_t5_60",
    "name": "Доспех Ветра (Легендарный)",
    "description": "Позволяет парить над полем боя. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 135,
      "dodgeChance": 30
    }
  },
  "arm_t5_61": {
    "id": "arm_t5_61",
    "name": "Шипастая Броня (Обычный)",
    "description": "Ранит нападающего.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "attack": 5
    }
  },
  "arm_t5_62": {
    "id": "arm_t5_62",
    "name": "Шипастая Броня (Необычный)",
    "description": "Ранит нападающего.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "attack": 11
    }
  },
  "arm_t5_63": {
    "id": "arm_t5_63",
    "name": "Шипастая Броня (Редкий)",
    "description": "Ранит нападающего.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "attack": 20
    }
  },
  "arm_t5_64": {
    "id": "arm_t5_64",
    "name": "Шипастая Броня (Эпический)",
    "description": "Ранит нападающего.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "attack": 35
    }
  },
  "arm_t5_65": {
    "id": "arm_t5_65",
    "name": "Шипастая Броня (Легендарный)",
    "description": "Ранит нападающего. [Дарует невероятную выживаемость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 84,
      "attack": 60,
      "maxHp": 100,
      "hpRegen": 5,
      "resistPoison": 10
    }
  },
  "arm_t5_66": {
    "id": "arm_t5_66",
    "name": "Кора Первородного Энта (Обычный)",
    "description": "Живая природная броня.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 6,
      "magicDefense": 6,
      "hpRegen": 1,
      "resistPoison": 2
    }
  },
  "arm_t5_67": {
    "id": "arm_t5_67",
    "name": "Кора Первородного Энта (Необычный)",
    "description": "Живая природная броня.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 13,
      "magicDefense": 13,
      "hpRegen": 3,
      "resistPoison": 4
    }
  },
  "arm_t5_68": {
    "id": "arm_t5_68",
    "name": "Кора Первородного Энта (Редкий)",
    "description": "Живая природная броня.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 24,
      "magicDefense": 24,
      "hpRegen": 6,
      "resistPoison": 8
    }
  },
  "arm_t5_69": {
    "id": "arm_t5_69",
    "name": "Кора Первородного Энта (Эпический)",
    "description": "Живая природная броня.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 42,
      "magicDefense": 42,
      "hpRegen": 10,
      "resistPoison": 14
    }
  },
  "arm_t5_70": {
    "id": "arm_t5_70",
    "name": "Кора Первородного Энта (Легендарный)",
    "description": "Живая природная броня. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 72,
      "magicDefense": 72,
      "hpRegen": 18,
      "resistPoison": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_71": {
    "id": "arm_t5_71",
    "name": "Доспех Чемпиона (Обычный)",
    "description": "Броня ветеранов Арены.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "attack": 3,
      "agility": 3,
      "critRate": 1
    }
  },
  "arm_t5_72": {
    "id": "arm_t5_72",
    "name": "Доспех Чемпиона (Необычный)",
    "description": "Броня ветеранов Арены.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "attack": 6,
      "agility": 6,
      "critRate": 2
    }
  },
  "arm_t5_73": {
    "id": "arm_t5_73",
    "name": "Доспех Чемпиона (Редкий)",
    "description": "Броня ветеранов Арены.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "attack": 12,
      "agility": 12,
      "critRate": 4
    }
  },
  "arm_t5_74": {
    "id": "arm_t5_74",
    "name": "Доспех Чемпиона (Эпический)",
    "description": "Броня ветеранов Арены.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "attack": 21,
      "agility": 21,
      "critRate": 7
    }
  },
  "arm_t5_75": {
    "id": "arm_t5_75",
    "name": "Доспех Чемпиона (Легендарный)",
    "description": "Броня ветеранов Арены. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 99,
      "attack": 36,
      "agility": 36,
      "critRate": 12,
      "magicDefense": 15
    }
  },
  "arm_t5_76": {
    "id": "arm_t5_76",
    "name": "Каменная Роба (Обычный)",
    "description": "Создана из цельного куска гранита.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 8,
      "magicAttack": 4,
      "maxMp": 12
    }
  },
  "arm_t5_77": {
    "id": "arm_t5_77",
    "name": "Каменная Роба (Необычный)",
    "description": "Создана из цельного куска гранита.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 17,
      "magicAttack": 8,
      "maxMp": 26
    }
  },
  "arm_t5_78": {
    "id": "arm_t5_78",
    "name": "Каменная Роба (Редкий)",
    "description": "Создана из цельного куска гранита.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 32,
      "magicAttack": 16,
      "maxMp": 48
    }
  },
  "arm_t5_79": {
    "id": "arm_t5_79",
    "name": "Каменная Роба (Эпический)",
    "description": "Создана из цельного куска гранита.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 56,
      "magicAttack": 28,
      "maxMp": 84
    }
  },
  "arm_t5_80": {
    "id": "arm_t5_80",
    "name": "Каменная Роба (Легендарный)",
    "description": "Создана из цельного куска гранита. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 116,
      "magicAttack": 48,
      "maxMp": 144,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_81": {
    "id": "arm_t5_81",
    "name": "Покров Стужи (Обычный)",
    "description": "Охлаждает пыл врагов.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "magicDefense": 5,
      "resistIce": 3,
      "maxHp": 15
    }
  },
  "arm_t5_82": {
    "id": "arm_t5_82",
    "name": "Покров Стужи (Необычный)",
    "description": "Охлаждает пыл врагов.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "magicDefense": 11,
      "resistIce": 6,
      "maxHp": 33
    }
  },
  "arm_t5_83": {
    "id": "arm_t5_83",
    "name": "Покров Стужи (Редкий)",
    "description": "Охлаждает пыл врагов.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "magicDefense": 20,
      "resistIce": 12,
      "maxHp": 60
    }
  },
  "arm_t5_84": {
    "id": "arm_t5_84",
    "name": "Покров Стужи (Эпический)",
    "description": "Охлаждает пыл врагов.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "magicDefense": 35,
      "resistIce": 21,
      "maxHp": 105
    }
  },
  "arm_t5_85": {
    "id": "arm_t5_85",
    "name": "Покров Стужи (Легендарный)",
    "description": "Охлаждает пыл врагов. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 60,
      "magicDefense": 60,
      "resistIce": 36,
      "maxHp": 180,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_86": {
    "id": "arm_t5_86",
    "name": "Громовой Табард (Обычный)",
    "description": "Искрится при каждом шаге.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 6,
      "attack": 4,
      "resistLightning": 3
    }
  },
  "arm_t5_87": {
    "id": "arm_t5_87",
    "name": "Громовой Табард (Необычный)",
    "description": "Искрится при каждом шаге.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 13,
      "attack": 8,
      "resistLightning": 6
    }
  },
  "arm_t5_88": {
    "id": "arm_t5_88",
    "name": "Громовой Табард (Редкий)",
    "description": "Искрится при каждом шаге.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 24,
      "attack": 16,
      "resistLightning": 12
    }
  },
  "arm_t5_89": {
    "id": "arm_t5_89",
    "name": "Громовой Табард (Эпический)",
    "description": "Искрится при каждом шаге.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 42,
      "attack": 28,
      "resistLightning": 21
    }
  },
  "arm_t5_90": {
    "id": "arm_t5_90",
    "name": "Громовой Табард (Легендарный)",
    "description": "Искрится при каждом шаге. [Дарует невероятную выживаемость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 72,
      "attack": 48,
      "resistLightning": 36,
      "maxHp": 100,
      "hpRegen": 5,
      "resistPoison": 10
    }
  },
  "arm_t5_91": {
    "id": "arm_t5_91",
    "name": "Броня Рассвета (Обычный)",
    "description": "Излучает тепло и свет.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "magicDefense": 7,
      "hpRegen": 1,
      "mpRegen": 1
    }
  },
  "arm_t5_92": {
    "id": "arm_t5_92",
    "name": "Броня Рассвета (Необычный)",
    "description": "Излучает тепло и свет.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "magicDefense": 15,
      "hpRegen": 3,
      "mpRegen": 3
    }
  },
  "arm_t5_93": {
    "id": "arm_t5_93",
    "name": "Броня Рассвета (Редкий)",
    "description": "Излучает тепло и свет.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "magicDefense": 28,
      "hpRegen": 6,
      "mpRegen": 6
    }
  },
  "arm_t5_94": {
    "id": "arm_t5_94",
    "name": "Броня Рассвета (Эпический)",
    "description": "Излучает тепло и свет.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "magicDefense": 49,
      "hpRegen": 10,
      "mpRegen": 10
    }
  },
  "arm_t5_95": {
    "id": "arm_t5_95",
    "name": "Броня Рассвета (Легендарный)",
    "description": "Излучает тепло и свет. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 104,
      "magicDefense": 84,
      "hpRegen": 18,
      "mpRegen": 18,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_96": {
    "id": "arm_t5_96",
    "name": "Броня Пустоты (Обычный)",
    "description": "Поглощает любой урон.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 9,
      "magicDefense": 9,
      "maxHp": 25,
      "dodgeChance": 1
    }
  },
  "arm_t5_97": {
    "id": "arm_t5_97",
    "name": "Броня Пустоты (Необычный)",
    "description": "Поглощает любой урон.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 19,
      "magicDefense": 19,
      "maxHp": 55,
      "dodgeChance": 2
    }
  },
  "arm_t5_98": {
    "id": "arm_t5_98",
    "name": "Броня Пустоты (Редкий)",
    "description": "Поглощает любой урон.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 36,
      "magicDefense": 36,
      "maxHp": 100,
      "dodgeChance": 4
    }
  },
  "arm_t5_99": {
    "id": "arm_t5_99",
    "name": "Броня Пустоты (Эпический)",
    "description": "Поглощает любой урон.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 63,
      "magicDefense": 63,
      "maxHp": 175,
      "dodgeChance": 7
    }
  },
  "arm_t5_100": {
    "id": "arm_t5_100",
    "name": "Броня Пустоты (Легендарный)",
    "description": "Поглощает любой урон. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 123,
      "magicDefense": 123,
      "maxHp": 300,
      "dodgeChance": 12
    }
  },
  "arm_t5_101": {
    "id": "arm_t5_101",
    "name": "Теневой Доспех (Обычный)",
    "description": "Скрыт в вечной полутьме.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 4,
      "magicDefense": 4,
      "agility": 8,
      "resistDark": 2
    }
  },
  "arm_t5_102": {
    "id": "arm_t5_102",
    "name": "Теневой Доспех (Необычный)",
    "description": "Скрыт в вечной полутьме.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 8,
      "magicDefense": 8,
      "agility": 17,
      "resistDark": 4
    }
  },
  "arm_t5_103": {
    "id": "arm_t5_103",
    "name": "Теневой Доспех (Редкий)",
    "description": "Скрыт в вечной полутьме.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 16,
      "magicDefense": 16,
      "agility": 32,
      "resistDark": 8
    }
  },
  "arm_t5_104": {
    "id": "arm_t5_104",
    "name": "Теневой Доспех (Эпический)",
    "description": "Скрыт в вечной полутьме.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 28,
      "magicDefense": 28,
      "agility": 56,
      "resistDark": 14
    }
  },
  "arm_t5_105": {
    "id": "arm_t5_105",
    "name": "Теневой Доспех (Легендарный)",
    "description": "Скрыт в вечной полутьме. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 48,
      "magicDefense": 48,
      "agility": 111,
      "resistDark": 24,
      "dodgeChance": 6
    }
  },
  "arm_t5_106": {
    "id": "arm_t5_106",
    "name": "Кираса Паладина (Обычный)",
    "description": "Символ чистой веры.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 9,
      "magicDefense": 3,
      "hpRegen": 1
    }
  },
  "arm_t5_107": {
    "id": "arm_t5_107",
    "name": "Кираса Паладина (Необычный)",
    "description": "Символ чистой веры.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 19,
      "magicDefense": 6,
      "hpRegen": 2
    }
  },
  "arm_t5_108": {
    "id": "arm_t5_108",
    "name": "Кираса Паладина (Редкий)",
    "description": "Символ чистой веры.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 36,
      "magicDefense": 12,
      "hpRegen": 4
    }
  },
  "arm_t5_109": {
    "id": "arm_t5_109",
    "name": "Кираса Паладина (Эпический)",
    "description": "Символ чистой веры.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 63,
      "magicDefense": 21,
      "hpRegen": 7
    }
  },
  "arm_t5_110": {
    "id": "arm_t5_110",
    "name": "Кираса Паладина (Легендарный)",
    "description": "Символ чистой веры. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 108,
      "magicDefense": 36,
      "hpRegen": 12,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_111": {
    "id": "arm_t5_111",
    "name": "Костяная Броня (Обычный)",
    "description": "Прочна и невероятно легка.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "maxMp": 15,
      "magicAttack": 2
    }
  },
  "arm_t5_112": {
    "id": "arm_t5_112",
    "name": "Костяная Броня (Необычный)",
    "description": "Прочна и невероятно легка.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "maxMp": 33,
      "magicAttack": 4
    }
  },
  "arm_t5_113": {
    "id": "arm_t5_113",
    "name": "Костяная Броня (Редкий)",
    "description": "Прочна и невероятно легка.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "maxMp": 60,
      "magicAttack": 8
    }
  },
  "arm_t5_114": {
    "id": "arm_t5_114",
    "name": "Костяная Броня (Эпический)",
    "description": "Прочна и невероятно легка.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "maxMp": 105,
      "magicAttack": 14
    }
  },
  "arm_t5_115": {
    "id": "arm_t5_115",
    "name": "Костяная Броня (Легендарный)",
    "description": "Прочна и невероятно легка. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 60,
      "maxMp": 180,
      "magicAttack": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_116": {
    "id": "arm_t5_116",
    "name": "Кристаллический Доспех (Обычный)",
    "description": "Отражает магические удары.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 3,
      "magicDefense": 10,
      "maxHp": 10
    }
  },
  "arm_t5_117": {
    "id": "arm_t5_117",
    "name": "Кристаллический Доспех (Необычный)",
    "description": "Отражает магические удары.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 6,
      "magicDefense": 22,
      "maxHp": 22
    }
  },
  "arm_t5_118": {
    "id": "arm_t5_118",
    "name": "Кристаллический Доспех (Редкий)",
    "description": "Отражает магические удары.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 12,
      "magicDefense": 40,
      "maxHp": 40
    }
  },
  "arm_t5_119": {
    "id": "arm_t5_119",
    "name": "Кристаллический Доспех (Эпический)",
    "description": "Отражает магические удары.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 21,
      "magicDefense": 70,
      "maxHp": 70
    }
  },
  "arm_t5_120": {
    "id": "arm_t5_120",
    "name": "Кристаллический Доспех (Легендарный)",
    "description": "Отражает магические удары. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 56,
      "magicDefense": 120,
      "maxHp": 120,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_121": {
    "id": "arm_t5_121",
    "name": "Чешуя Дракона (Обычный)",
    "description": "Только самое горячее пламя способно ее повредить.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 8,
      "magicDefense": 6,
      "resistFire": 4
    }
  },
  "arm_t5_122": {
    "id": "arm_t5_122",
    "name": "Чешуя Дракона (Необычный)",
    "description": "Только самое горячее пламя способно ее повредить.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 17,
      "magicDefense": 13,
      "resistFire": 8
    }
  },
  "arm_t5_123": {
    "id": "arm_t5_123",
    "name": "Чешуя Дракона (Редкий)",
    "description": "Только самое горячее пламя способно ее повредить.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 32,
      "magicDefense": 24,
      "resistFire": 16
    }
  },
  "arm_t5_124": {
    "id": "arm_t5_124",
    "name": "Чешуя Дракона (Эпический)",
    "description": "Только самое горячее пламя способно ее повредить.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 56,
      "magicDefense": 42,
      "resistFire": 28
    }
  },
  "arm_t5_125": {
    "id": "arm_t5_125",
    "name": "Чешуя Дракона (Легендарный)",
    "description": "Только самое горячее пламя способно ее повредить. [Дарует невероятную выживаемость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 96,
      "magicDefense": 72,
      "resistFire": 48,
      "maxHp": 100,
      "hpRegen": 5,
      "resistPoison": 10
    }
  },
  "arm_t5_126": {
    "id": "arm_t5_126",
    "name": "Доспех Глубин (Обычный)",
    "description": "Покрыта илом и ракушками.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 6,
      "magicDefense": 5,
      "resistIce": 3,
      "maxHp": 20
    }
  },
  "arm_t5_127": {
    "id": "arm_t5_127",
    "name": "Доспех Глубин (Необычный)",
    "description": "Покрыта илом и ракушками.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 13,
      "magicDefense": 11,
      "resistIce": 6,
      "maxHp": 44
    }
  },
  "arm_t5_128": {
    "id": "arm_t5_128",
    "name": "Доспех Глубин (Редкий)",
    "description": "Покрыта илом и ракушками.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 24,
      "magicDefense": 20,
      "resistIce": 12,
      "maxHp": 80
    }
  },
  "arm_t5_129": {
    "id": "arm_t5_129",
    "name": "Доспех Глубин (Эпический)",
    "description": "Покрыта илом и ракушками.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 42,
      "magicDefense": 35,
      "resistIce": 21,
      "maxHp": 140
    }
  },
  "arm_t5_130": {
    "id": "arm_t5_130",
    "name": "Доспех Глубин (Легендарный)",
    "description": "Покрыта илом и ракушками. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 87,
      "magicDefense": 75,
      "resistIce": 36,
      "maxHp": 240
    }
  },
  "arm_t5_131": {
    "id": "arm_t5_131",
    "name": "Покров Леса (Обычный)",
    "description": "Маскирует среди деревьев.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 4,
      "agility": 5,
      "maxHp": 12,
      "hpRegen": 1
    }
  },
  "arm_t5_132": {
    "id": "arm_t5_132",
    "name": "Покров Леса (Необычный)",
    "description": "Маскирует среди деревьев.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 8,
      "agility": 11,
      "maxHp": 26,
      "hpRegen": 2
    }
  },
  "arm_t5_133": {
    "id": "arm_t5_133",
    "name": "Покров Леса (Редкий)",
    "description": "Маскирует среди деревьев.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 16,
      "agility": 20,
      "maxHp": 48,
      "hpRegen": 4
    }
  },
  "arm_t5_134": {
    "id": "arm_t5_134",
    "name": "Покров Леса (Эпический)",
    "description": "Маскирует среди деревьев.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 28,
      "agility": 35,
      "maxHp": 84,
      "hpRegen": 7
    }
  },
  "arm_t5_135": {
    "id": "arm_t5_135",
    "name": "Покров Леса (Легендарный)",
    "description": "Маскирует среди деревьев. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 63,
      "agility": 60,
      "maxHp": 144,
      "hpRegen": 12,
      "magicDefense": 15
    }
  },
  "arm_t5_136": {
    "id": "arm_t5_136",
    "name": "Мантия Луны (Обычный)",
    "description": "Серебристый свет оберегает разум.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 9,
      "magicAttack": 3,
      "maxMp": 15
    }
  },
  "arm_t5_137": {
    "id": "arm_t5_137",
    "name": "Мантия Луны (Необычный)",
    "description": "Серебристый свет оберегает разум.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 19,
      "magicAttack": 6,
      "maxMp": 33
    }
  },
  "arm_t5_138": {
    "id": "arm_t5_138",
    "name": "Мантия Луны (Редкий)",
    "description": "Серебристый свет оберегает разум.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 36,
      "magicAttack": 12,
      "maxMp": 60
    }
  },
  "arm_t5_139": {
    "id": "arm_t5_139",
    "name": "Мантия Луны (Эпический)",
    "description": "Серебристый свет оберегает разум.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 63,
      "magicAttack": 21,
      "maxMp": 105
    }
  },
  "arm_t5_140": {
    "id": "arm_t5_140",
    "name": "Мантия Луны (Легендарный)",
    "description": "Серебристый свет оберегает разум. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 123,
      "magicAttack": 36,
      "maxMp": 180,
      "defense": 15
    }
  },
  "arm_t5_141": {
    "id": "arm_t5_141",
    "name": "Одеяние Звезд (Обычный)",
    "description": "Излучает неземную энергию.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 7,
      "maxMp": 20,
      "mpRegen": 2
    }
  },
  "arm_t5_142": {
    "id": "arm_t5_142",
    "name": "Одеяние Звезд (Необычный)",
    "description": "Излучает неземную энергию.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 15,
      "maxMp": 44,
      "mpRegen": 4
    }
  },
  "arm_t5_143": {
    "id": "arm_t5_143",
    "name": "Одеяние Звезд (Редкий)",
    "description": "Излучает неземную энергию.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 28,
      "maxMp": 80,
      "mpRegen": 8
    }
  },
  "arm_t5_144": {
    "id": "arm_t5_144",
    "name": "Одеяние Звезд (Эпический)",
    "description": "Излучает неземную энергию.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 49,
      "maxMp": 140,
      "mpRegen": 14
    }
  },
  "arm_t5_145": {
    "id": "arm_t5_145",
    "name": "Одеяние Звезд (Легендарный)",
    "description": "Излучает неземную энергию. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 84,
      "maxMp": 240,
      "mpRegen": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_146": {
    "id": "arm_t5_146",
    "name": "Железная Броня (Обычный)",
    "description": "Самая простая, но надёжная защита.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "maxHp": 10
    }
  },
  "arm_t5_147": {
    "id": "arm_t5_147",
    "name": "Железная Броня (Необычный)",
    "description": "Самая простая, но надёжная защита.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "maxHp": 22
    }
  },
  "arm_t5_148": {
    "id": "arm_t5_148",
    "name": "Железная Броня (Редкий)",
    "description": "Самая простая, но надёжная защита.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "maxHp": 40
    }
  },
  "arm_t5_149": {
    "id": "arm_t5_149",
    "name": "Железная Броня (Эпический)",
    "description": "Самая простая, но надёжная защита.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "maxHp": 70
    }
  },
  "arm_t5_150": {
    "id": "arm_t5_150",
    "name": "Железная Броня (Легендарный)",
    "description": "Самая простая, но надёжная защита. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 104,
      "maxHp": 120,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_151": {
    "id": "arm_t5_151",
    "name": "Золотой Доспех (Обычный)",
    "description": "Тяжелый и выглядит богато.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 6,
      "maxHp": 10,
      "resistHoly": 1
    }
  },
  "arm_t5_152": {
    "id": "arm_t5_152",
    "name": "Золотой Доспех (Необычный)",
    "description": "Тяжелый и выглядит богато.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 13,
      "maxHp": 22,
      "resistHoly": 2
    }
  },
  "arm_t5_153": {
    "id": "arm_t5_153",
    "name": "Золотой Доспех (Редкий)",
    "description": "Тяжелый и выглядит богато.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 24,
      "maxHp": 40,
      "resistHoly": 4
    }
  },
  "arm_t5_154": {
    "id": "arm_t5_154",
    "name": "Золотой Доспех (Эпический)",
    "description": "Тяжелый и выглядит богато.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 42,
      "maxHp": 70,
      "resistHoly": 7
    }
  },
  "arm_t5_155": {
    "id": "arm_t5_155",
    "name": "Золотой Доспех (Легендарный)",
    "description": "Тяжелый и выглядит богато. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 92,
      "maxHp": 120,
      "resistHoly": 12,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_156": {
    "id": "arm_t5_156",
    "name": "Серебряная Кольчуга (Обычный)",
    "description": "Отражает темную магию.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "magicDefense": 5,
      "resistDark": 3
    }
  },
  "arm_t5_157": {
    "id": "arm_t5_157",
    "name": "Серебряная Кольчуга (Необычный)",
    "description": "Отражает темную магию.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "magicDefense": 11,
      "resistDark": 6
    }
  },
  "arm_t5_158": {
    "id": "arm_t5_158",
    "name": "Серебряная Кольчуга (Редкий)",
    "description": "Отражает темную магию.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "magicDefense": 20,
      "resistDark": 12
    }
  },
  "arm_t5_159": {
    "id": "arm_t5_159",
    "name": "Серебряная Кольчуга (Эпический)",
    "description": "Отражает темную магию.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "magicDefense": 35,
      "resistDark": 21
    }
  },
  "arm_t5_160": {
    "id": "arm_t5_160",
    "name": "Серебряная Кольчуга (Легендарный)",
    "description": "Отражает темную магию. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 75,
      "magicDefense": 75,
      "resistDark": 36
    }
  },
  "arm_t5_161": {
    "id": "arm_t5_161",
    "name": "Шелковая Роба (Обычный)",
    "description": "Тонкая, легкая ткань.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 5,
      "agility": 3,
      "maxMp": 10
    }
  },
  "arm_t5_162": {
    "id": "arm_t5_162",
    "name": "Шелковая Роба (Необычный)",
    "description": "Тонкая, легкая ткань.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 11,
      "agility": 6,
      "maxMp": 22
    }
  },
  "arm_t5_163": {
    "id": "arm_t5_163",
    "name": "Шелковая Роба (Редкий)",
    "description": "Тонкая, легкая ткань.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 20,
      "agility": 12,
      "maxMp": 40
    }
  },
  "arm_t5_164": {
    "id": "arm_t5_164",
    "name": "Шелковая Роба (Эпический)",
    "description": "Тонкая, легкая ткань.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 35,
      "agility": 21,
      "maxMp": 70
    }
  },
  "arm_t5_165": {
    "id": "arm_t5_165",
    "name": "Шелковая Роба (Легендарный)",
    "description": "Тонкая, легкая ткань. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 60,
      "agility": 36,
      "maxMp": 120,
      "defense": 20,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_166": {
    "id": "arm_t5_166",
    "name": "Рунический Доспех (Обычный)",
    "description": "Испещрен магическими символами.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 6,
      "magicDefense": 6,
      "magicAttack": 2
    }
  },
  "arm_t5_167": {
    "id": "arm_t5_167",
    "name": "Рунический Доспех (Необычный)",
    "description": "Испещрен магическими символами.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 13,
      "magicDefense": 13,
      "magicAttack": 4
    }
  },
  "arm_t5_168": {
    "id": "arm_t5_168",
    "name": "Рунический Доспех (Редкий)",
    "description": "Испещрен магическими символами.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 24,
      "magicDefense": 24,
      "magicAttack": 8
    }
  },
  "arm_t5_169": {
    "id": "arm_t5_169",
    "name": "Рунический Доспех (Эпический)",
    "description": "Испещрен магическими символами.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 42,
      "magicDefense": 42,
      "magicAttack": 14
    }
  },
  "arm_t5_170": {
    "id": "arm_t5_170",
    "name": "Рунический Доспех (Легендарный)",
    "description": "Испещрен магическими символами. [Значительно повышает стойкость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 92,
      "magicDefense": 72,
      "magicAttack": 24,
      "resistFire": 10,
      "resistIce": 10
    }
  },
  "arm_t5_171": {
    "id": "arm_t5_171",
    "name": "Шкура Зверя (Обычный)",
    "description": "Сила первобытной природы.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "attack": 4,
      "maxHp": 15
    }
  },
  "arm_t5_172": {
    "id": "arm_t5_172",
    "name": "Шкура Зверя (Необычный)",
    "description": "Сила первобытной природы.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "attack": 8,
      "maxHp": 33
    }
  },
  "arm_t5_173": {
    "id": "arm_t5_173",
    "name": "Шкура Зверя (Редкий)",
    "description": "Сила первобытной природы.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "attack": 16,
      "maxHp": 60
    }
  },
  "arm_t5_174": {
    "id": "arm_t5_174",
    "name": "Шкура Зверя (Эпический)",
    "description": "Сила первобытной природы.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "attack": 28,
      "maxHp": 105
    }
  },
  "arm_t5_175": {
    "id": "arm_t5_175",
    "name": "Шкура Зверя (Легендарный)",
    "description": "Сила первобытной природы. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 60,
      "attack": 48,
      "maxHp": 180,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_176": {
    "id": "arm_t5_176",
    "name": "Призрачный Саван (Обычный)",
    "description": "Оружие проходит сквозь него.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 8,
      "dodgeChance": 2
    }
  },
  "arm_t5_177": {
    "id": "arm_t5_177",
    "name": "Призрачный Саван (Необычный)",
    "description": "Оружие проходит сквозь него.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 17,
      "dodgeChance": 4
    }
  },
  "arm_t5_178": {
    "id": "arm_t5_178",
    "name": "Призрачный Саван (Редкий)",
    "description": "Оружие проходит сквозь него.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 32,
      "dodgeChance": 8
    }
  },
  "arm_t5_179": {
    "id": "arm_t5_179",
    "name": "Призрачный Саван (Эпический)",
    "description": "Оружие проходит сквозь него.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 56,
      "dodgeChance": 14
    }
  },
  "arm_t5_180": {
    "id": "arm_t5_180",
    "name": "Призрачный Саван (Легендарный)",
    "description": "Оружие проходит сквозь него. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 111,
      "dodgeChance": 24,
      "defense": 15
    }
  },
  "arm_t5_181": {
    "id": "arm_t5_181",
    "name": "Демоническая Броня (Обычный)",
    "description": "Пропитана злобой.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "attack": 5,
      "resistHoly": -1,
      "resistDark": 3
    }
  },
  "arm_t5_182": {
    "id": "arm_t5_182",
    "name": "Демоническая Броня (Необычный)",
    "description": "Пропитана злобой.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "attack": 11,
      "resistHoly": -2,
      "resistDark": 6
    }
  },
  "arm_t5_183": {
    "id": "arm_t5_183",
    "name": "Демоническая Броня (Редкий)",
    "description": "Пропитана злобой.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "attack": 20,
      "resistHoly": -4,
      "resistDark": 12
    }
  },
  "arm_t5_184": {
    "id": "arm_t5_184",
    "name": "Демоническая Броня (Эпический)",
    "description": "Пропитана злобой.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "attack": 35,
      "resistHoly": -7,
      "resistDark": 21
    }
  },
  "arm_t5_185": {
    "id": "arm_t5_185",
    "name": "Демоническая Броня (Легендарный)",
    "description": "Пропитана злобой. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 99,
      "attack": 60,
      "resistHoly": -12,
      "resistDark": 36,
      "magicDefense": 15
    }
  },
  "arm_t5_186": {
    "id": "arm_t5_186",
    "name": "Ангельское Одеяние (Обычный)",
    "description": "Светится внутренним светом.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 8,
      "hpRegen": 2,
      "resistHoly": 3,
      "resistDark": -1
    }
  },
  "arm_t5_187": {
    "id": "arm_t5_187",
    "name": "Ангельское Одеяние (Необычный)",
    "description": "Светится внутренним светом.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 17,
      "hpRegen": 4,
      "resistHoly": 6,
      "resistDark": -2
    }
  },
  "arm_t5_188": {
    "id": "arm_t5_188",
    "name": "Ангельское Одеяние (Редкий)",
    "description": "Светится внутренним светом.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 32,
      "hpRegen": 8,
      "resistHoly": 12,
      "resistDark": -4
    }
  },
  "arm_t5_189": {
    "id": "arm_t5_189",
    "name": "Ангельское Одеяние (Эпический)",
    "description": "Светится внутренним светом.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 56,
      "hpRegen": 14,
      "resistHoly": 21,
      "resistDark": -7
    }
  },
  "arm_t5_190": {
    "id": "arm_t5_190",
    "name": "Ангельское Одеяние (Легендарный)",
    "description": "Светится внутренним светом. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 96,
      "hpRegen": 24,
      "resistHoly": 36,
      "resistDark": -12,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_191": {
    "id": "arm_t5_191",
    "name": "Королевский Гвардеец (Обычный)",
    "description": "Церемониальный, но рабочий.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 7,
      "maxHp": 20,
      "magicDefense": 2
    }
  },
  "arm_t5_192": {
    "id": "arm_t5_192",
    "name": "Королевский Гвардеец (Необычный)",
    "description": "Церемониальный, но рабочий.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 15,
      "maxHp": 44,
      "magicDefense": 4
    }
  },
  "arm_t5_193": {
    "id": "arm_t5_193",
    "name": "Королевский Гвардеец (Редкий)",
    "description": "Церемониальный, но рабочий.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 28,
      "maxHp": 80,
      "magicDefense": 8
    }
  },
  "arm_t5_194": {
    "id": "arm_t5_194",
    "name": "Королевский Гвардеец (Эпический)",
    "description": "Церемониальный, но рабочий.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 49,
      "maxHp": 140,
      "magicDefense": 14
    }
  },
  "arm_t5_195": {
    "id": "arm_t5_195",
    "name": "Королевский Гвардеец (Легендарный)",
    "description": "Церемониальный, но рабочий. [Дарует невероятную неуловимость]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 84,
      "maxHp": 240,
      "magicDefense": 24,
      "dodgeChance": 6,
      "agility": 15
    }
  },
  "arm_t5_196": {
    "id": "arm_t5_196",
    "name": "Броня Хаоса (Обычный)",
    "description": "Постоянно меняет форму.",
    "type": "armor",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "magicDefense": 5,
      "attack": 2,
      "magicAttack": 2,
      "agility": 2
    }
  },
  "arm_t5_197": {
    "id": "arm_t5_197",
    "name": "Броня Хаоса (Необычный)",
    "description": "Постоянно меняет форму.",
    "type": "armor",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "magicDefense": 11,
      "attack": 4,
      "magicAttack": 4,
      "agility": 4
    }
  },
  "arm_t5_198": {
    "id": "arm_t5_198",
    "name": "Броня Хаоса (Редкий)",
    "description": "Постоянно меняет форму.",
    "type": "armor",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "magicDefense": 20,
      "attack": 8,
      "magicAttack": 8,
      "agility": 8
    }
  },
  "arm_t5_199": {
    "id": "arm_t5_199",
    "name": "Броня Хаоса (Эпический)",
    "description": "Постоянно меняет форму.",
    "type": "armor",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "magicDefense": 35,
      "attack": 14,
      "magicAttack": 14,
      "agility": 14
    }
  },
  "arm_t5_200": {
    "id": "arm_t5_200",
    "name": "Броня Хаоса (Легендарный)",
    "description": "Постоянно меняет форму. [Все базовые характеристики увеличены]",
    "type": "armor",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 75,
      "magicDefense": 75,
      "attack": 24,
      "magicAttack": 24,
      "agility": 24
    }
  },
  "acc_t5_1": {
    "id": "acc_t5_1",
    "name": "Осколок Звезды (Обычный)",
    "description": "Увеличивает шанс крита.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "critRate": 1
    }
  },
  "acc_t5_2": {
    "id": "acc_t5_2",
    "name": "Осколок Звезды (Необычный)",
    "description": "Увеличивает шанс крита.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "critRate": 3
    }
  },
  "acc_t5_3": {
    "id": "acc_t5_3",
    "name": "Осколок Звезды (Редкий)",
    "description": "Увеличивает шанс крита.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "critRate": 6
    }
  },
  "acc_t5_4": {
    "id": "acc_t5_4",
    "name": "Осколок Звезды (Эпический)",
    "description": "Увеличивает шанс крита.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "critRate": 10
    }
  },
  "acc_t5_5": {
    "id": "acc_t5_5",
    "name": "Осколок Звезды (Легендарный)",
    "description": "Увеличивает шанс крита. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "critRate": 18,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_6": {
    "id": "acc_t5_6",
    "name": "Сапфир Ярости (Обычный)",
    "description": "Увеличивает силу крита.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "critDamage": 4
    }
  },
  "acc_t5_7": {
    "id": "acc_t5_7",
    "name": "Сапфир Ярости (Необычный)",
    "description": "Увеличивает силу крита.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "critDamage": 8
    }
  },
  "acc_t5_8": {
    "id": "acc_t5_8",
    "name": "Сапфир Ярости (Редкий)",
    "description": "Увеличивает силу крита.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "critDamage": 16
    }
  },
  "acc_t5_9": {
    "id": "acc_t5_9",
    "name": "Сапфир Ярости (Эпический)",
    "description": "Увеличивает силу крита.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "critDamage": 28
    }
  },
  "acc_t5_10": {
    "id": "acc_t5_10",
    "name": "Сапфир Ярости (Легендарный)",
    "description": "Увеличивает силу крита. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "critDamage": 48,
      "dodgeChance": 6
    }
  },
  "acc_t5_11": {
    "id": "acc_t5_11",
    "name": "Амулет Жизни (Обычный)",
    "description": "Дарует колоссальное здоровье.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxHp": 30,
      "hpRegen": 1
    }
  },
  "acc_t5_12": {
    "id": "acc_t5_12",
    "name": "Амулет Жизни (Необычный)",
    "description": "Дарует колоссальное здоровье.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxHp": 66,
      "hpRegen": 3
    }
  },
  "acc_t5_13": {
    "id": "acc_t5_13",
    "name": "Амулет Жизни (Редкий)",
    "description": "Дарует колоссальное здоровье.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxHp": 120,
      "hpRegen": 6
    }
  },
  "acc_t5_14": {
    "id": "acc_t5_14",
    "name": "Амулет Жизни (Эпический)",
    "description": "Дарует колоссальное здоровье.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxHp": 210,
      "hpRegen": 10
    }
  },
  "acc_t5_15": {
    "id": "acc_t5_15",
    "name": "Амулет Жизни (Легендарный)",
    "description": "Дарует колоссальное здоровье. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxHp": 360,
      "hpRegen": 18,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_16": {
    "id": "acc_t5_16",
    "name": "Амулет Маны (Обычный)",
    "description": "Расширяет магический резерв.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxMp": 30,
      "mpRegen": 1
    }
  },
  "acc_t5_17": {
    "id": "acc_t5_17",
    "name": "Амулет Маны (Необычный)",
    "description": "Расширяет магический резерв.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxMp": 66,
      "mpRegen": 3
    }
  },
  "acc_t5_18": {
    "id": "acc_t5_18",
    "name": "Амулет Маны (Редкий)",
    "description": "Расширяет магический резерв.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxMp": 120,
      "mpRegen": 6
    }
  },
  "acc_t5_19": {
    "id": "acc_t5_19",
    "name": "Амулет Маны (Эпический)",
    "description": "Расширяет магический резерв.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxMp": 210,
      "mpRegen": 10
    }
  },
  "acc_t5_20": {
    "id": "acc_t5_20",
    "name": "Амулет Маны (Легендарный)",
    "description": "Расширяет магический резерв. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxMp": 360,
      "mpRegen": 18,
      "dodgeChance": 6
    }
  },
  "acc_t5_21": {
    "id": "acc_t5_21",
    "name": "Пояс Силы (Обычный)",
    "description": "Чистая физическая мощь.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 5,
      "maxHp": 15
    }
  },
  "acc_t5_22": {
    "id": "acc_t5_22",
    "name": "Пояс Силы (Необычный)",
    "description": "Чистая физическая мощь.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 11,
      "maxHp": 33
    }
  },
  "acc_t5_23": {
    "id": "acc_t5_23",
    "name": "Пояс Силы (Редкий)",
    "description": "Чистая физическая мощь.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 20,
      "maxHp": 60
    }
  },
  "acc_t5_24": {
    "id": "acc_t5_24",
    "name": "Пояс Силы (Эпический)",
    "description": "Чистая физическая мощь.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 35,
      "maxHp": 105
    }
  },
  "acc_t5_25": {
    "id": "acc_t5_25",
    "name": "Пояс Силы (Легендарный)",
    "description": "Чистая физическая мощь. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 60,
      "maxHp": 180,
      "dodgeChance": 6
    }
  },
  "acc_t5_26": {
    "id": "acc_t5_26",
    "name": "Кольцо Мудреца (Обычный)",
    "description": "Стимулирует разум.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicAttack": 5,
      "maxMp": 15
    }
  },
  "acc_t5_27": {
    "id": "acc_t5_27",
    "name": "Кольцо Мудреца (Необычный)",
    "description": "Стимулирует разум.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicAttack": 11,
      "maxMp": 33
    }
  },
  "acc_t5_28": {
    "id": "acc_t5_28",
    "name": "Кольцо Мудреца (Редкий)",
    "description": "Стимулирует разум.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicAttack": 20,
      "maxMp": 60
    }
  },
  "acc_t5_29": {
    "id": "acc_t5_29",
    "name": "Кольцо Мудреца (Эпический)",
    "description": "Стимулирует разум.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicAttack": 35,
      "maxMp": 105
    }
  },
  "acc_t5_30": {
    "id": "acc_t5_30",
    "name": "Кольцо Мудреца (Легендарный)",
    "description": "Стимулирует разум. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicAttack": 60,
      "maxMp": 180,
      "maxHp": 100,
      "magicDefense": 20
    }
  },
  "acc_t5_31": {
    "id": "acc_t5_31",
    "name": "Браслет Ветра (Обычный)",
    "description": "Ускоряет реакцию.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 6,
      "dodgeChance": 1
    }
  },
  "acc_t5_32": {
    "id": "acc_t5_32",
    "name": "Браслет Ветра (Необычный)",
    "description": "Ускоряет реакцию.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 13,
      "dodgeChance": 3
    }
  },
  "acc_t5_33": {
    "id": "acc_t5_33",
    "name": "Браслет Ветра (Редкий)",
    "description": "Ускоряет реакцию.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 24,
      "dodgeChance": 6
    }
  },
  "acc_t5_34": {
    "id": "acc_t5_34",
    "name": "Браслет Ветра (Эпический)",
    "description": "Ускоряет реакцию.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 42,
      "dodgeChance": 10
    }
  },
  "acc_t5_35": {
    "id": "acc_t5_35",
    "name": "Браслет Ветра (Легендарный)",
    "description": "Ускоряет реакцию. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 72,
      "dodgeChance": 24
    }
  },
  "acc_t5_36": {
    "id": "acc_t5_36",
    "name": "Щит Компактный (Обычный)",
    "description": "Миниатюрный силовой барьер.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 8,
      "magicDefense": 4
    }
  },
  "acc_t5_37": {
    "id": "acc_t5_37",
    "name": "Щит Компактный (Необычный)",
    "description": "Миниатюрный силовой барьер.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 17,
      "magicDefense": 8
    }
  },
  "acc_t5_38": {
    "id": "acc_t5_38",
    "name": "Щит Компактный (Редкий)",
    "description": "Миниатюрный силовой барьер.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 32,
      "magicDefense": 16
    }
  },
  "acc_t5_39": {
    "id": "acc_t5_39",
    "name": "Щит Компактный (Эпический)",
    "description": "Миниатюрный силовой барьер.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 56,
      "magicDefense": 28
    }
  },
  "acc_t5_40": {
    "id": "acc_t5_40",
    "name": "Щит Компактный (Легендарный)",
    "description": "Миниатюрный силовой барьер. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 96,
      "magicDefense": 68,
      "maxHp": 100
    }
  },
  "acc_t5_41": {
    "id": "acc_t5_41",
    "name": "Сфера Отрицания (Обычный)",
    "description": "Рассеивает заклинания.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 8,
      "defense": 4
    }
  },
  "acc_t5_42": {
    "id": "acc_t5_42",
    "name": "Сфера Отрицания (Необычный)",
    "description": "Рассеивает заклинания.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 17,
      "defense": 8
    }
  },
  "acc_t5_43": {
    "id": "acc_t5_43",
    "name": "Сфера Отрицания (Редкий)",
    "description": "Рассеивает заклинания.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 32,
      "defense": 16
    }
  },
  "acc_t5_44": {
    "id": "acc_t5_44",
    "name": "Сфера Отрицания (Эпический)",
    "description": "Рассеивает заклинания.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 56,
      "defense": 28
    }
  },
  "acc_t5_45": {
    "id": "acc_t5_45",
    "name": "Сфера Отрицания (Легендарный)",
    "description": "Рассеивает заклинания. [Каждое попадание может стать фатальным]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 96,
      "defense": 48,
      "critRate": 5,
      "critDamage": 15
    }
  },
  "acc_t5_46": {
    "id": "acc_t5_46",
    "name": "Кулон Вампира (Обычный)",
    "description": "Превращает урон в жизнь.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "lifesteal": 1,
      "attack": 3
    }
  },
  "acc_t5_47": {
    "id": "acc_t5_47",
    "name": "Кулон Вампира (Необычный)",
    "description": "Превращает урон в жизнь.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "lifesteal": 2,
      "attack": 6
    }
  },
  "acc_t5_48": {
    "id": "acc_t5_48",
    "name": "Кулон Вампира (Редкий)",
    "description": "Превращает урон в жизнь.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "lifesteal": 4,
      "attack": 12
    }
  },
  "acc_t5_49": {
    "id": "acc_t5_49",
    "name": "Кулон Вампира (Эпический)",
    "description": "Превращает урон в жизнь.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "lifesteal": 8,
      "attack": 21
    }
  },
  "acc_t5_50": {
    "id": "acc_t5_50",
    "name": "Кулон Вампира (Легендарный)",
    "description": "Превращает урон в жизнь. [Каждое попадание может стать фатальным]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "lifesteal": 14,
      "attack": 36,
      "critRate": 5,
      "critDamage": 15
    }
  },
  "acc_t5_51": {
    "id": "acc_t5_51",
    "name": "Кольцо Баланса (Обычный)",
    "description": "Усиливает все атрибуты понемногу.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxHp": 10,
      "maxMp": 10,
      "attack": 2,
      "defense": 2,
      "magicAttack": 2,
      "magicDefense": 2,
      "agility": 2
    }
  },
  "acc_t5_52": {
    "id": "acc_t5_52",
    "name": "Кольцо Баланса (Необычный)",
    "description": "Усиливает все атрибуты понемногу.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxHp": 22,
      "maxMp": 22,
      "attack": 4,
      "defense": 4,
      "magicAttack": 4,
      "magicDefense": 4,
      "agility": 4
    }
  },
  "acc_t5_53": {
    "id": "acc_t5_53",
    "name": "Кольцо Баланса (Редкий)",
    "description": "Усиливает все атрибуты понемногу.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxHp": 40,
      "maxMp": 40,
      "attack": 8,
      "defense": 8,
      "magicAttack": 8,
      "magicDefense": 8,
      "agility": 8
    }
  },
  "acc_t5_54": {
    "id": "acc_t5_54",
    "name": "Кольцо Баланса (Эпический)",
    "description": "Усиливает все атрибуты понемногу.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxHp": 70,
      "maxMp": 70,
      "attack": 14,
      "defense": 14,
      "magicAttack": 14,
      "magicDefense": 14,
      "agility": 14
    }
  },
  "acc_t5_55": {
    "id": "acc_t5_55",
    "name": "Кольцо Баланса (Легендарный)",
    "description": "Усиливает все атрибуты понемногу. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxHp": 220,
      "maxMp": 120,
      "attack": 24,
      "defense": 24,
      "magicAttack": 24,
      "magicDefense": 44,
      "agility": 24
    }
  },
  "acc_t5_56": {
    "id": "acc_t5_56",
    "name": "Печать Ифрита (Обычный)",
    "description": "Увеличивает сопротивление огню.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistFire": 3,
      "maxHp": 15
    }
  },
  "acc_t5_57": {
    "id": "acc_t5_57",
    "name": "Печать Ифрита (Необычный)",
    "description": "Увеличивает сопротивление огню.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistFire": 6,
      "maxHp": 33
    }
  },
  "acc_t5_58": {
    "id": "acc_t5_58",
    "name": "Печать Ифрита (Редкий)",
    "description": "Увеличивает сопротивление огню.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistFire": 12,
      "maxHp": 60
    }
  },
  "acc_t5_59": {
    "id": "acc_t5_59",
    "name": "Печать Ифрита (Эпический)",
    "description": "Увеличивает сопротивление огню.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistFire": 21,
      "maxHp": 105
    }
  },
  "acc_t5_60": {
    "id": "acc_t5_60",
    "name": "Печать Ифрита (Легендарный)",
    "description": "Увеличивает сопротивление огню. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistFire": 36,
      "maxHp": 180,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_61": {
    "id": "acc_t5_61",
    "name": "Ледяной Кристалл (Обычный)",
    "description": "Увеличивает сопротивление льду.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistIce": 3,
      "magicDefense": 4
    }
  },
  "acc_t5_62": {
    "id": "acc_t5_62",
    "name": "Ледяной Кристалл (Необычный)",
    "description": "Увеличивает сопротивление льду.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistIce": 6,
      "magicDefense": 8
    }
  },
  "acc_t5_63": {
    "id": "acc_t5_63",
    "name": "Ледяной Кристалл (Редкий)",
    "description": "Увеличивает сопротивление льду.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistIce": 12,
      "magicDefense": 16
    }
  },
  "acc_t5_64": {
    "id": "acc_t5_64",
    "name": "Ледяной Кристалл (Эпический)",
    "description": "Увеличивает сопротивление льду.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistIce": 21,
      "magicDefense": 28
    }
  },
  "acc_t5_65": {
    "id": "acc_t5_65",
    "name": "Ледяной Кристалл (Легендарный)",
    "description": "Увеличивает сопротивление льду. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistIce": 36,
      "magicDefense": 48,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_66": {
    "id": "acc_t5_66",
    "name": "Искра Бури (Обычный)",
    "description": "Увеличивает сопротивление молнии.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistLightning": 3,
      "agility": 5
    }
  },
  "acc_t5_67": {
    "id": "acc_t5_67",
    "name": "Искра Бури (Необычный)",
    "description": "Увеличивает сопротивление молнии.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistLightning": 6,
      "agility": 11
    }
  },
  "acc_t5_68": {
    "id": "acc_t5_68",
    "name": "Искра Бури (Редкий)",
    "description": "Увеличивает сопротивление молнии.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistLightning": 12,
      "agility": 20
    }
  },
  "acc_t5_69": {
    "id": "acc_t5_69",
    "name": "Искра Бури (Эпический)",
    "description": "Увеличивает сопротивление молнии.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistLightning": 21,
      "agility": 35
    }
  },
  "acc_t5_70": {
    "id": "acc_t5_70",
    "name": "Искра Бури (Легендарный)",
    "description": "Увеличивает сопротивление молнии. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistLightning": 36,
      "agility": 75,
      "attack": 15,
      "defense": 15
    }
  },
  "acc_t5_71": {
    "id": "acc_t5_71",
    "name": "Противоядие в Колбе (Обычный)",
    "description": "Защищает от ядов.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistPoison": 3,
      "maxHp": 20
    }
  },
  "acc_t5_72": {
    "id": "acc_t5_72",
    "name": "Противоядие в Колбе (Необычный)",
    "description": "Защищает от ядов.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistPoison": 6,
      "maxHp": 44
    }
  },
  "acc_t5_73": {
    "id": "acc_t5_73",
    "name": "Противоядие в Колбе (Редкий)",
    "description": "Защищает от ядов.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistPoison": 12,
      "maxHp": 80
    }
  },
  "acc_t5_74": {
    "id": "acc_t5_74",
    "name": "Противоядие в Колбе (Эпический)",
    "description": "Защищает от ядов.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistPoison": 21,
      "maxHp": 140
    }
  },
  "acc_t5_75": {
    "id": "acc_t5_75",
    "name": "Противоядие в Колбе (Легендарный)",
    "description": "Защищает от ядов. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistPoison": 36,
      "maxHp": 240,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_76": {
    "id": "acc_t5_76",
    "name": "Осколок Безмятежности (Обычный)",
    "description": "Отводит тьму.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistDark": 3,
      "magicDefense": 5
    }
  },
  "acc_t5_77": {
    "id": "acc_t5_77",
    "name": "Осколок Безмятежности (Необычный)",
    "description": "Отводит тьму.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistDark": 6,
      "magicDefense": 11
    }
  },
  "acc_t5_78": {
    "id": "acc_t5_78",
    "name": "Осколок Безмятежности (Редкий)",
    "description": "Отводит тьму.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistDark": 12,
      "magicDefense": 20
    }
  },
  "acc_t5_79": {
    "id": "acc_t5_79",
    "name": "Осколок Безмятежности (Эпический)",
    "description": "Отводит тьму.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistDark": 21,
      "magicDefense": 35
    }
  },
  "acc_t5_80": {
    "id": "acc_t5_80",
    "name": "Осколок Безмятежности (Легендарный)",
    "description": "Отводит тьму. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistDark": 36,
      "magicDefense": 60,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_81": {
    "id": "acc_t5_81",
    "name": "Капля Солнца (Обычный)",
    "description": "Защищает от божественного гнева.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "resistHoly": 3,
      "defense": 6
    }
  },
  "acc_t5_82": {
    "id": "acc_t5_82",
    "name": "Капля Солнца (Необычный)",
    "description": "Защищает от божественного гнева.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "resistHoly": 6,
      "defense": 13
    }
  },
  "acc_t5_83": {
    "id": "acc_t5_83",
    "name": "Капля Солнца (Редкий)",
    "description": "Защищает от божественного гнева.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "resistHoly": 12,
      "defense": 24
    }
  },
  "acc_t5_84": {
    "id": "acc_t5_84",
    "name": "Капля Солнца (Эпический)",
    "description": "Защищает от божественного гнева.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "resistHoly": 21,
      "defense": 42
    }
  },
  "acc_t5_85": {
    "id": "acc_t5_85",
    "name": "Капля Солнца (Легендарный)",
    "description": "Защищает от божественного гнева. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "resistHoly": 36,
      "defense": 72,
      "dodgeChance": 6
    }
  },
  "acc_t5_86": {
    "id": "acc_t5_86",
    "name": "Кольцо Ярости (Обычный)",
    "description": "Значительно повышает урон, понижая защиту.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 8,
      "critRate": 1,
      "defense": -4,
      "magicDefense": -4
    }
  },
  "acc_t5_87": {
    "id": "acc_t5_87",
    "name": "Кольцо Ярости (Необычный)",
    "description": "Значительно повышает урон, понижая защиту.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 17,
      "critRate": 3,
      "defense": -9,
      "magicDefense": -9
    }
  },
  "acc_t5_88": {
    "id": "acc_t5_88",
    "name": "Кольцо Ярости (Редкий)",
    "description": "Значительно повышает урон, понижая защиту.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 32,
      "critRate": 6,
      "defense": -16,
      "magicDefense": -16
    }
  },
  "acc_t5_89": {
    "id": "acc_t5_89",
    "name": "Кольцо Ярости (Эпический)",
    "description": "Значительно повышает урон, понижая защиту.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 56,
      "critRate": 10,
      "defense": -28,
      "magicDefense": -28
    }
  },
  "acc_t5_90": {
    "id": "acc_t5_90",
    "name": "Кольцо Ярости (Легендарный)",
    "description": "Значительно повышает урон, понижая защиту. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 111,
      "critRate": 18,
      "defense": -33,
      "magicDefense": -48,
      "agility": 15
    }
  },
  "acc_t5_91": {
    "id": "acc_t5_91",
    "name": "Глаз Сокола (Обычный)",
    "description": "Фокусирует зрение на уязвимых точках.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 5,
      "critDamage": 3
    }
  },
  "acc_t5_92": {
    "id": "acc_t5_92",
    "name": "Глаз Сокола (Необычный)",
    "description": "Фокусирует зрение на уязвимых точках.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 11,
      "critDamage": 6
    }
  },
  "acc_t5_93": {
    "id": "acc_t5_93",
    "name": "Глаз Сокола (Редкий)",
    "description": "Фокусирует зрение на уязвимых точках.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 20,
      "critDamage": 12
    }
  },
  "acc_t5_94": {
    "id": "acc_t5_94",
    "name": "Глаз Сокола (Эпический)",
    "description": "Фокусирует зрение на уязвимых точках.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 35,
      "critDamage": 21
    }
  },
  "acc_t5_95": {
    "id": "acc_t5_95",
    "name": "Глаз Сокола (Легендарный)",
    "description": "Фокусирует зрение на уязвимых точках. [Каждое попадание может стать фатальным]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 60,
      "critDamage": 51,
      "critRate": 5
    }
  },
  "acc_t5_96": {
    "id": "acc_t5_96",
    "name": "Амулет Феникса (Обычный)",
    "description": "Быстро исцеляет раны.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "hpRegen": 1,
      "mpRegen": 1,
      "maxHp": 10,
      "maxMp": 10
    }
  },
  "acc_t5_97": {
    "id": "acc_t5_97",
    "name": "Амулет Феникса (Необычный)",
    "description": "Быстро исцеляет раны.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "hpRegen": 3,
      "mpRegen": 3,
      "maxHp": 22,
      "maxMp": 22
    }
  },
  "acc_t5_98": {
    "id": "acc_t5_98",
    "name": "Амулет Феникса (Редкий)",
    "description": "Быстро исцеляет раны.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "hpRegen": 6,
      "mpRegen": 6,
      "maxHp": 40,
      "maxMp": 40
    }
  },
  "acc_t5_99": {
    "id": "acc_t5_99",
    "name": "Амулет Феникса (Эпический)",
    "description": "Быстро исцеляет раны.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "hpRegen": 10,
      "mpRegen": 10,
      "maxHp": 70,
      "maxMp": 70
    }
  },
  "acc_t5_100": {
    "id": "acc_t5_100",
    "name": "Амулет Феникса (Легендарный)",
    "description": "Быстро исцеляет раны. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "hpRegen": 18,
      "mpRegen": 18,
      "maxHp": 120,
      "maxMp": 120,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_101": {
    "id": "acc_t5_101",
    "name": "Орден Доблести (Обычный)",
    "description": "Дается за великие подвиги.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 5,
      "maxHp": 20,
      "hpRegen": 1
    }
  },
  "acc_t5_102": {
    "id": "acc_t5_102",
    "name": "Орден Доблести (Необычный)",
    "description": "Дается за великие подвиги.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 11,
      "maxHp": 44,
      "hpRegen": 2
    }
  },
  "acc_t5_103": {
    "id": "acc_t5_103",
    "name": "Орден Доблести (Редкий)",
    "description": "Дается за великие подвиги.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 20,
      "maxHp": 80,
      "hpRegen": 4
    }
  },
  "acc_t5_104": {
    "id": "acc_t5_104",
    "name": "Орден Доблести (Эпический)",
    "description": "Дается за великие подвиги.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 35,
      "maxHp": 140,
      "hpRegen": 7
    }
  },
  "acc_t5_105": {
    "id": "acc_t5_105",
    "name": "Орден Доблести (Легендарный)",
    "description": "Дается за великие подвиги. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 60,
      "maxHp": 240,
      "hpRegen": 12,
      "dodgeChance": 6
    }
  },
  "acc_t5_106": {
    "id": "acc_t5_106",
    "name": "Символ Тени (Обычный)",
    "description": "Улучшает скрытность.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 4,
      "dodgeChance": 2
    }
  },
  "acc_t5_107": {
    "id": "acc_t5_107",
    "name": "Символ Тени (Необычный)",
    "description": "Улучшает скрытность.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 8,
      "dodgeChance": 4
    }
  },
  "acc_t5_108": {
    "id": "acc_t5_108",
    "name": "Символ Тени (Редкий)",
    "description": "Улучшает скрытность.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 16,
      "dodgeChance": 8
    }
  },
  "acc_t5_109": {
    "id": "acc_t5_109",
    "name": "Символ Тени (Эпический)",
    "description": "Улучшает скрытность.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 28,
      "dodgeChance": 14
    }
  },
  "acc_t5_110": {
    "id": "acc_t5_110",
    "name": "Символ Тени (Легендарный)",
    "description": "Улучшает скрытность. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 48,
      "dodgeChance": 30
    }
  },
  "acc_t5_111": {
    "id": "acc_t5_111",
    "name": "Глаз Тайны (Обычный)",
    "description": "Древний магический амулет.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicAttack": 4,
      "maxMp": 20,
      "mpRegen": 1
    }
  },
  "acc_t5_112": {
    "id": "acc_t5_112",
    "name": "Глаз Тайны (Необычный)",
    "description": "Древний магический амулет.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicAttack": 8,
      "maxMp": 44,
      "mpRegen": 2
    }
  },
  "acc_t5_113": {
    "id": "acc_t5_113",
    "name": "Глаз Тайны (Редкий)",
    "description": "Древний магический амулет.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicAttack": 16,
      "maxMp": 80,
      "mpRegen": 4
    }
  },
  "acc_t5_114": {
    "id": "acc_t5_114",
    "name": "Глаз Тайны (Эпический)",
    "description": "Древний магический амулет.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicAttack": 28,
      "maxMp": 140,
      "mpRegen": 7
    }
  },
  "acc_t5_115": {
    "id": "acc_t5_115",
    "name": "Глаз Тайны (Легендарный)",
    "description": "Древний магический амулет. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicAttack": 48,
      "maxMp": 240,
      "mpRegen": 12,
      "maxHp": 100,
      "magicDefense": 20
    }
  },
  "acc_t5_116": {
    "id": "acc_t5_116",
    "name": "Знак Битвы (Обычный)",
    "description": "Доспехи в миниатюре.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 4,
      "defense": 4
    }
  },
  "acc_t5_117": {
    "id": "acc_t5_117",
    "name": "Знак Битвы (Необычный)",
    "description": "Доспехи в миниатюре.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 8,
      "defense": 8
    }
  },
  "acc_t5_118": {
    "id": "acc_t5_118",
    "name": "Знак Битвы (Редкий)",
    "description": "Доспехи в миниатюре.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 16,
      "defense": 16
    }
  },
  "acc_t5_119": {
    "id": "acc_t5_119",
    "name": "Знак Битвы (Эпический)",
    "description": "Доспехи в миниатюре.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 28,
      "defense": 28
    }
  },
  "acc_t5_120": {
    "id": "acc_t5_120",
    "name": "Знак Битвы (Легендарный)",
    "description": "Доспехи в миниатюре. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 48,
      "defense": 48,
      "dodgeChance": 6
    }
  },
  "acc_t5_121": {
    "id": "acc_t5_121",
    "name": "Крест Света (Обычный)",
    "description": "Освящен многократно.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 5,
      "resistHoly": 2,
      "hpRegen": 1
    }
  },
  "acc_t5_122": {
    "id": "acc_t5_122",
    "name": "Крест Света (Необычный)",
    "description": "Освящен многократно.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 11,
      "resistHoly": 4,
      "hpRegen": 2
    }
  },
  "acc_t5_123": {
    "id": "acc_t5_123",
    "name": "Крест Света (Редкий)",
    "description": "Освящен многократно.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 20,
      "resistHoly": 8,
      "hpRegen": 4
    }
  },
  "acc_t5_124": {
    "id": "acc_t5_124",
    "name": "Крест Света (Эпический)",
    "description": "Освящен многократно.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 35,
      "resistHoly": 14,
      "hpRegen": 7
    }
  },
  "acc_t5_125": {
    "id": "acc_t5_125",
    "name": "Крест Света (Легендарный)",
    "description": "Освящен многократно. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 60,
      "resistHoly": 24,
      "hpRegen": 12,
      "dodgeChance": 6
    }
  },
  "acc_t5_126": {
    "id": "acc_t5_126",
    "name": "Клык Хищника (Обычный)",
    "description": "Острый, как бритва.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 5,
      "critRate": 1
    }
  },
  "acc_t5_127": {
    "id": "acc_t5_127",
    "name": "Клык Хищника (Необычный)",
    "description": "Острый, как бритва.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 11,
      "critRate": 2
    }
  },
  "acc_t5_128": {
    "id": "acc_t5_128",
    "name": "Клык Хищника (Редкий)",
    "description": "Острый, как бритва.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 20,
      "critRate": 4
    }
  },
  "acc_t5_129": {
    "id": "acc_t5_129",
    "name": "Клык Хищника (Эпический)",
    "description": "Острый, как бритва.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 35,
      "critRate": 7
    }
  },
  "acc_t5_130": {
    "id": "acc_t5_130",
    "name": "Клык Хищника (Легендарный)",
    "description": "Острый, как бритва. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 75,
      "critRate": 12,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_131": {
    "id": "acc_t5_131",
    "name": "Скрытый Карман (Обычный)",
    "description": "Позволяет носить больше зелий.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 5,
      "maxHp": 10
    }
  },
  "acc_t5_132": {
    "id": "acc_t5_132",
    "name": "Скрытый Карман (Необычный)",
    "description": "Позволяет носить больше зелий.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 11,
      "maxHp": 22
    }
  },
  "acc_t5_133": {
    "id": "acc_t5_133",
    "name": "Скрытый Карман (Редкий)",
    "description": "Позволяет носить больше зелий.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 20,
      "maxHp": 40
    }
  },
  "acc_t5_134": {
    "id": "acc_t5_134",
    "name": "Скрытый Карман (Эпический)",
    "description": "Позволяет носить больше зелий.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 35,
      "maxHp": 70
    }
  },
  "acc_t5_135": {
    "id": "acc_t5_135",
    "name": "Скрытый Карман (Легендарный)",
    "description": "Позволяет носить больше зелий. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 75,
      "maxHp": 120,
      "attack": 15,
      "defense": 15
    }
  },
  "acc_t5_136": {
    "id": "acc_t5_136",
    "name": "Оберег Святого (Обычный)",
    "description": "Защищает даже от сильной тьмы.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 4,
      "resistDark": 3
    }
  },
  "acc_t5_137": {
    "id": "acc_t5_137",
    "name": "Оберег Святого (Необычный)",
    "description": "Защищает даже от сильной тьмы.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 8,
      "resistDark": 6
    }
  },
  "acc_t5_138": {
    "id": "acc_t5_138",
    "name": "Оберег Святого (Редкий)",
    "description": "Защищает даже от сильной тьмы.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 16,
      "resistDark": 12
    }
  },
  "acc_t5_139": {
    "id": "acc_t5_139",
    "name": "Оберег Святого (Эпический)",
    "description": "Защищает даже от сильной тьмы.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 28,
      "resistDark": 21
    }
  },
  "acc_t5_140": {
    "id": "acc_t5_140",
    "name": "Оберег Святого (Легендарный)",
    "description": "Защищает даже от сильной тьмы. [Существенно увеличивает исцеление от атак]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 48,
      "resistDark": 36,
      "lifesteal": 4
    }
  },
  "acc_t5_141": {
    "id": "acc_t5_141",
    "name": "Рог Демона (Обычный)",
    "description": "Наполнен яростью преисподней.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 6,
      "magicAttack": 4,
      "resistHoly": -2
    }
  },
  "acc_t5_142": {
    "id": "acc_t5_142",
    "name": "Рог Демона (Необычный)",
    "description": "Наполнен яростью преисподней.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 13,
      "magicAttack": 8,
      "resistHoly": -4
    }
  },
  "acc_t5_143": {
    "id": "acc_t5_143",
    "name": "Рог Демона (Редкий)",
    "description": "Наполнен яростью преисподней.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 24,
      "magicAttack": 16,
      "resistHoly": -8
    }
  },
  "acc_t5_144": {
    "id": "acc_t5_144",
    "name": "Рог Демона (Эпический)",
    "description": "Наполнен яростью преисподней.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 42,
      "magicAttack": 28,
      "resistHoly": -14
    }
  },
  "acc_t5_145": {
    "id": "acc_t5_145",
    "name": "Рог Демона (Легендарный)",
    "description": "Наполнен яростью преисподней. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 87,
      "magicAttack": 48,
      "resistHoly": -24,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_146": {
    "id": "acc_t5_146",
    "name": "Чешуйка Дракона (Обычный)",
    "description": "Капля драконьей силы.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 3,
      "attack": 3,
      "resistFire": 2
    }
  },
  "acc_t5_147": {
    "id": "acc_t5_147",
    "name": "Чешуйка Дракона (Необычный)",
    "description": "Капля драконьей силы.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 6,
      "attack": 6,
      "resistFire": 4
    }
  },
  "acc_t5_148": {
    "id": "acc_t5_148",
    "name": "Чешуйка Дракона (Редкий)",
    "description": "Капля драконьей силы.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 12,
      "attack": 12,
      "resistFire": 8
    }
  },
  "acc_t5_149": {
    "id": "acc_t5_149",
    "name": "Чешуйка Дракона (Эпический)",
    "description": "Капля драконьей силы.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 21,
      "attack": 21,
      "resistFire": 14
    }
  },
  "acc_t5_150": {
    "id": "acc_t5_150",
    "name": "Чешуйка Дракона (Легендарный)",
    "description": "Капля драконьей силы. [Существенно увеличивает исцеление от атак]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 36,
      "attack": 36,
      "resistFire": 24,
      "lifesteal": 4
    }
  },
  "acc_t5_151": {
    "id": "acc_t5_151",
    "name": "Лист Вечности (Обычный)",
    "description": "Никогда не увядает.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxHp": 15,
      "maxMp": 15,
      "hpRegen": 1,
      "mpRegen": 1
    }
  },
  "acc_t5_152": {
    "id": "acc_t5_152",
    "name": "Лист Вечности (Необычный)",
    "description": "Никогда не увядает.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxHp": 33,
      "maxMp": 33,
      "hpRegen": 2,
      "mpRegen": 2
    }
  },
  "acc_t5_153": {
    "id": "acc_t5_153",
    "name": "Лист Вечности (Редкий)",
    "description": "Никогда не увядает.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxHp": 60,
      "maxMp": 60,
      "hpRegen": 4,
      "mpRegen": 4
    }
  },
  "acc_t5_154": {
    "id": "acc_t5_154",
    "name": "Лист Вечности (Эпический)",
    "description": "Никогда не увядает.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxHp": 105,
      "maxMp": 105,
      "hpRegen": 7,
      "mpRegen": 7
    }
  },
  "acc_t5_155": {
    "id": "acc_t5_155",
    "name": "Лист Вечности (Легендарный)",
    "description": "Никогда не увядает. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxHp": 180,
      "maxMp": 180,
      "hpRegen": 12,
      "mpRegen": 12,
      "dodgeChance": 6
    }
  },
  "acc_t5_156": {
    "id": "acc_t5_156",
    "name": "Жемчужина Глубин (Обычный)",
    "description": "Дыхание Океана.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicDefense": 5,
      "resistIce": 3
    }
  },
  "acc_t5_157": {
    "id": "acc_t5_157",
    "name": "Жемчужина Глубин (Необычный)",
    "description": "Дыхание Океана.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicDefense": 11,
      "resistIce": 6
    }
  },
  "acc_t5_158": {
    "id": "acc_t5_158",
    "name": "Жемчужина Глубин (Редкий)",
    "description": "Дыхание Океана.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicDefense": 20,
      "resistIce": 12
    }
  },
  "acc_t5_159": {
    "id": "acc_t5_159",
    "name": "Жемчужина Глубин (Эпический)",
    "description": "Дыхание Океана.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicDefense": 35,
      "resistIce": 21
    }
  },
  "acc_t5_160": {
    "id": "acc_t5_160",
    "name": "Жемчужина Глубин (Легендарный)",
    "description": "Дыхание Океана. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicDefense": 60,
      "resistIce": 36,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_161": {
    "id": "acc_t5_161",
    "name": "Песочные Часы (Обычный)",
    "description": "Управляет потоками времени.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "agility": 5,
      "dodgeChance": 1
    }
  },
  "acc_t5_162": {
    "id": "acc_t5_162",
    "name": "Песочные Часы (Необычный)",
    "description": "Управляет потоками времени.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "agility": 11,
      "dodgeChance": 2
    }
  },
  "acc_t5_163": {
    "id": "acc_t5_163",
    "name": "Песочные Часы (Редкий)",
    "description": "Управляет потоками времени.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "agility": 20,
      "dodgeChance": 4
    }
  },
  "acc_t5_164": {
    "id": "acc_t5_164",
    "name": "Песочные Часы (Эпический)",
    "description": "Управляет потоками времени.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "agility": 35,
      "dodgeChance": 7
    }
  },
  "acc_t5_165": {
    "id": "acc_t5_165",
    "name": "Песочные Часы (Легендарный)",
    "description": "Управляет потоками времени. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "agility": 60,
      "dodgeChance": 12,
      "maxHp": 100,
      "magicDefense": 20
    }
  },
  "acc_t5_166": {
    "id": "acc_t5_166",
    "name": "Космическая Пыль (Обычный)",
    "description": "Частица далекой звезды.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "magicAttack": 6,
      "critDamage": 2
    }
  },
  "acc_t5_167": {
    "id": "acc_t5_167",
    "name": "Космическая Пыль (Необычный)",
    "description": "Частица далекой звезды.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "magicAttack": 13,
      "critDamage": 4
    }
  },
  "acc_t5_168": {
    "id": "acc_t5_168",
    "name": "Космическая Пыль (Редкий)",
    "description": "Частица далекой звезды.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "magicAttack": 24,
      "critDamage": 8
    }
  },
  "acc_t5_169": {
    "id": "acc_t5_169",
    "name": "Космическая Пыль (Эпический)",
    "description": "Частица далекой звезды.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "magicAttack": 42,
      "critDamage": 14
    }
  },
  "acc_t5_170": {
    "id": "acc_t5_170",
    "name": "Космическая Пыль (Легендарный)",
    "description": "Частица далекой звезды. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "magicAttack": 72,
      "critDamage": 24,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_171": {
    "id": "acc_t5_171",
    "name": "Фиал Крови (Обычный)",
    "description": "Вкус крови освежает.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "lifesteal": 1,
      "maxHp": 15
    }
  },
  "acc_t5_172": {
    "id": "acc_t5_172",
    "name": "Фиал Крови (Необычный)",
    "description": "Вкус крови освежает.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "lifesteal": 3,
      "maxHp": 33
    }
  },
  "acc_t5_173": {
    "id": "acc_t5_173",
    "name": "Фиал Крови (Редкий)",
    "description": "Вкус крови освежает.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "lifesteal": 6,
      "maxHp": 60
    }
  },
  "acc_t5_174": {
    "id": "acc_t5_174",
    "name": "Фиал Крови (Эпический)",
    "description": "Вкус крови освежает.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "lifesteal": 10,
      "maxHp": 105
    }
  },
  "acc_t5_175": {
    "id": "acc_t5_175",
    "name": "Фиал Крови (Легендарный)",
    "description": "Вкус крови освежает. [Усиливает основные параметры]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "lifesteal": 18,
      "maxHp": 180,
      "attack": 15,
      "defense": 15,
      "agility": 15
    }
  },
  "acc_t5_176": {
    "id": "acc_t5_176",
    "name": "Кристалл Души (Обычный)",
    "description": "Хранит в себе часть вас.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxMp": 25,
      "magicDefense": 4
    }
  },
  "acc_t5_177": {
    "id": "acc_t5_177",
    "name": "Кристалл Души (Необычный)",
    "description": "Хранит в себе часть вас.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxMp": 55,
      "magicDefense": 8
    }
  },
  "acc_t5_178": {
    "id": "acc_t5_178",
    "name": "Кристалл Души (Редкий)",
    "description": "Хранит в себе часть вас.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxMp": 100,
      "magicDefense": 16
    }
  },
  "acc_t5_179": {
    "id": "acc_t5_179",
    "name": "Кристалл Души (Эпический)",
    "description": "Хранит в себе часть вас.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxMp": 175,
      "magicDefense": 28
    }
  },
  "acc_t5_180": {
    "id": "acc_t5_180",
    "name": "Кристалл Души (Легендарный)",
    "description": "Хранит в себе часть вас. [Существенно увеличивает исцеление от атак]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxMp": 300,
      "magicDefense": 48,
      "lifesteal": 4
    }
  },
  "acc_t5_181": {
    "id": "acc_t5_181",
    "name": "Железный Кулак (Обычный)",
    "description": "Усиливает удары в ближнем бою.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "attack": 5,
      "defense": 3
    }
  },
  "acc_t5_182": {
    "id": "acc_t5_182",
    "name": "Железный Кулак (Необычный)",
    "description": "Усиливает удары в ближнем бою.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "attack": 11,
      "defense": 6
    }
  },
  "acc_t5_183": {
    "id": "acc_t5_183",
    "name": "Железный Кулак (Редкий)",
    "description": "Усиливает удары в ближнем бою.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "attack": 20,
      "defense": 12
    }
  },
  "acc_t5_184": {
    "id": "acc_t5_184",
    "name": "Железный Кулак (Эпический)",
    "description": "Усиливает удары в ближнем бою.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "attack": 35,
      "defense": 21
    }
  },
  "acc_t5_185": {
    "id": "acc_t5_185",
    "name": "Железный Кулак (Легендарный)",
    "description": "Усиливает удары в ближнем бою. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "attack": 60,
      "defense": 36,
      "dodgeChance": 6
    }
  },
  "acc_t5_186": {
    "id": "acc_t5_186",
    "name": "Золотой Слиток (Обычный)",
    "description": "Просто красиво.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxHp": 5
    }
  },
  "acc_t5_187": {
    "id": "acc_t5_187",
    "name": "Золотой Слиток (Необычный)",
    "description": "Просто красиво.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxHp": 11
    }
  },
  "acc_t5_188": {
    "id": "acc_t5_188",
    "name": "Золотой Слиток (Редкий)",
    "description": "Просто красиво.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxHp": 20
    }
  },
  "acc_t5_189": {
    "id": "acc_t5_189",
    "name": "Золотой Слиток (Эпический)",
    "description": "Просто красиво.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxHp": 35
    }
  },
  "acc_t5_190": {
    "id": "acc_t5_190",
    "name": "Золотой Слиток (Легендарный)",
    "description": "Просто красиво. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxHp": 60,
      "dodgeChance": 6
    }
  },
  "acc_t5_191": {
    "id": "acc_t5_191",
    "name": "Кристальное Сердце (Обычный)",
    "description": "Прозрачное, но крепкое.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "defense": 4,
      "magicDefense": 4,
      "maxHp": 20
    }
  },
  "acc_t5_192": {
    "id": "acc_t5_192",
    "name": "Кристальное Сердце (Необычный)",
    "description": "Прозрачное, но крепкое.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "defense": 8,
      "magicDefense": 8,
      "maxHp": 44
    }
  },
  "acc_t5_193": {
    "id": "acc_t5_193",
    "name": "Кристальное Сердце (Редкий)",
    "description": "Прозрачное, но крепкое.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "defense": 16,
      "magicDefense": 16,
      "maxHp": 80
    }
  },
  "acc_t5_194": {
    "id": "acc_t5_194",
    "name": "Кристальное Сердце (Эпический)",
    "description": "Прозрачное, но крепкое.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "defense": 28,
      "magicDefense": 28,
      "maxHp": 140
    }
  },
  "acc_t5_195": {
    "id": "acc_t5_195",
    "name": "Кристальное Сердце (Легендарный)",
    "description": "Прозрачное, но крепкое. [Значительный бонус к здоровью и защите]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "defense": 48,
      "magicDefense": 68,
      "maxHp": 340
    }
  },
  "acc_t5_196": {
    "id": "acc_t5_196",
    "name": "Символ Абсолюта (Обычный)",
    "description": "Легендарная реликвия старых богов.",
    "type": "accessory",
    "rarity": "common",
    "price": 1500,
    "stats": {
      "maxHp": 40,
      "attack": 7,
      "defense": 7,
      "lifesteal": 1,
      "dodgeChance": 1
    }
  },
  "acc_t5_197": {
    "id": "acc_t5_197",
    "name": "Символ Абсолюта (Необычный)",
    "description": "Легендарная реликвия старых богов.",
    "type": "accessory",
    "rarity": "uncommon",
    "price": 4000,
    "stats": {
      "maxHp": 88,
      "attack": 15,
      "defense": 15,
      "lifesteal": 3,
      "dodgeChance": 3
    }
  },
  "acc_t5_198": {
    "id": "acc_t5_198",
    "name": "Символ Абсолюта (Редкий)",
    "description": "Легендарная реликвия старых богов.",
    "type": "accessory",
    "rarity": "rare",
    "price": 10000,
    "stats": {
      "maxHp": 160,
      "attack": 28,
      "defense": 28,
      "lifesteal": 6,
      "dodgeChance": 6
    }
  },
  "acc_t5_199": {
    "id": "acc_t5_199",
    "name": "Символ Абсолюта (Эпический)",
    "description": "Легендарная реликвия старых богов.",
    "type": "accessory",
    "rarity": "epic",
    "price": 25000,
    "stats": {
      "maxHp": 280,
      "attack": 49,
      "defense": 49,
      "lifesteal": 10,
      "dodgeChance": 10
    }
  },
  "acc_t5_200": {
    "id": "acc_t5_200",
    "name": "Символ Абсолюта (Легендарный)",
    "description": "Легендарная реликвия старых богов. [Дарует невероятную неуловимость]",
    "type": "accessory",
    "rarity": "legendary",
    "price": 60000,
    "stats": {
      "maxHp": 480,
      "attack": 84,
      "defense": 84,
      "lifesteal": 18,
      "dodgeChance": 24
    }
  }
};








export function getItemByName(name: string): Item | undefined {
  return Object.values(ITEM_CATALOG).find(i => i.name.toLowerCase() === name.toLowerCase());
}

export function parseItemId(itemId: string) {
  // Pattern: baseId+enhance_sSlots#level[gem1,gem2]
  let baseId = itemId;
  let enhance = 0;
  let slots = 0;
  let level = 1;
  let gems: string[] = [];
  
  if (baseId.includes('[')) {
    const gemStr = baseId.substring(baseId.indexOf('[') + 1, baseId.indexOf(']'));
    gems = gemStr.split(',').filter(g => g);
    baseId = baseId.substring(0, baseId.indexOf('['));
  }
  
  const levelMatch = baseId.match(/#(\d+)$/);
  if (levelMatch) {
    level = parseInt(levelMatch[1], 10);
    baseId = baseId.replace(/#\d+$/, '');
  }

  const slotMatch = baseId.match(/_s(\d+)$/);
  if (slotMatch) {
    slots = parseInt(slotMatch[1], 10);
    baseId = baseId.replace(/_s\d+$/, '');
  }
  
  const enhanceMatch = baseId.match(/\+(\d+)$/);
  if (enhanceMatch) {
    enhance = parseInt(enhanceMatch[1], 10);
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

export function getItem(itemId: string): Item | undefined {
  const { baseId, enhance, slots, level, gems } = parseItemId(itemId);
  const baseItem = ITEM_CATALOG[baseId];
  if (!baseItem) return undefined;
  
  const cloned = JSON.parse(JSON.stringify(baseItem)) as Item;
  cloned.id = itemId;
  cloned.level = level;
  if (level > 1) cloned.name += ` [${level} ур]`;
  if (enhance > 0) cloned.name += ` +${enhance}`;
  
  if (cloned.stats && ['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(cloned.type)) {
    // scale stats with level
    const PERCENTAGE_STATS = ['critRate', 'critDamage', 'resistPoison', 'resistFire', 'resistIce', 'resistLightning', 'resistDark', 'resistHoly'];
    
    let sumLinear = 0;
    for (let k in cloned.stats) {
        if (!PERCENTAGE_STATS.includes(k) && typeof (cloned.stats as any)[k] === 'number') {
            sumLinear += (cloned.stats as any)[k];
        }
    }

    if (sumLinear > 0) {
      for (let k in cloned.stats) {
          if (!PERCENTAGE_STATS.includes(k) && typeof (cloned.stats as any)[k] === 'number') {
                let baseVal = (baseItem.stats as any)[k] as number;
                let rarityBonus = 0;
                if (cloned.rarity === 'uncommon') rarityBonus = 0.5;
                else if (cloned.rarity === 'rare') rarityBonus = 1.2;
                else if (cloned.rarity === 'epic') rarityBonus = 2.5;
                else if (cloned.rarity === 'legendary') rarityBonus = 4.0;
                
                let newVal = baseVal + (level - 1) * (baseVal * 0.15 + rarityBonus);
                
                newVal = Math.floor(newVal);
                if (newVal < 1) newVal = 1;
                (cloned.stats as any)[k] = newVal;
          }
      }
    }
    
    // enhance bonus
    if (enhance > 0) {
      const mult = 1 + (0.1 * enhance);
      for (let k in cloned.stats) {
        if (!PERCENTAGE_STATS.includes(k) && typeof (cloned.stats as any)[k] === 'number') {
           (cloned.stats as any)[k] = Math.floor((cloned.stats as any)[k] * mult);
        }
      }
    }
    
    const basePrices: any = { 'common': 1000, 'uncommon': 2500, 'rare': 6000, 'epic': 15000, 'legendary': 50000 };
    let basePriceTemp = basePrices[cloned.rarity] || 1000;
    cloned.price = Math.floor(basePriceTemp + basePriceTemp * (level - 1) * 0.4);
    cloned.price = Math.max(1000, cloned.price);
  }
  
  return cloned;
}
