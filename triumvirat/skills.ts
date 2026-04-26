export type SkillType = 'damage' | 'heal' | 'buff' | 'passive' | 'debuff';

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: SkillType;
  power: number;
  mpCost?: number;
  hpCostPct?: number;
  cooldown?: number;
  dot?: { type: 'poison'|'bleed'|'burn'; duration: number; dmgPct: number };
  statusEffect?: { type: 'stun'|'silence'|'blind'|'heal_reduction'; duration: number; chance: number };
  buff?: { stat: string; valPct: number; duration: number };
  debuff?: { stat: string; valPct: number; duration: number };
  shieldPct?: number;
  vampirismPct?: number;
  synergy?: { requiredStatus: string; bonusDmgPct?: number; bonusVampirismPct?: number; armorPenetrationPct?: number };
  isPassive?: boolean;
  hitChance?: number;
  effectChance?: number;
  damageType?: 'physical' | 'magical';
}

export const CLASS_STARTING_SKILLS: Record<string, string[]> = {
  "Воин": [
    "w_dmg_1",
    "w_dmg_2",
    "w_buff_1",
    "w_buff_2",
    "w_pass_1"
  ],
  "Маг": [
    "m_dmg_1",
    "m_dmg_2",
    "m_dmg_3",
    "m_buff_1",
    "m_pass_1"
  ],
  "Разбойник": [
    "rg_dmg_1",
    "rg_dmg_2",
    "rg_debuff",
    "rg_buff_1",
    "rg_pass_1"
  ],
  "Лучник": [
    "луч_dmg_1",
    "луч_dmg_2",
    "луч_buff",
    "луч_utility",
    "луч_pass"
  ],
  "Жрец": [
    "pri_heal_1",
    "pri_dmg_1",
    "pri_buff_1",
    "pri_debuff",
    "pri_pass"
  ],
  "Паладин": [
    "pal_dmg_1",
    "pal_dmg_2",
    "pal_heal_1",
    "pal_buff_1",
    "pal_pass_1"
  ],
  "Чернокнижник": [
    "чер_dmg_1",
    "чер_dmg_2",
    "чер_buff",
    "чер_utility",
    "чер_pass"
  ],
  "Друид": [
    "дру_dmg_1",
    "дру_dmg_2",
    "дру_buff",
    "дру_utility",
    "дру_pass"
  ],
  "Бард": [
    "бар_dmg_1",
    "бар_dmg_2",
    "бар_buff",
    "бар_utility",
    "бар_pass"
  ],
  "Монах": [
    "мон_dmg_1",
    "мон_dmg_2",
    "мон_buff",
    "мон_utility",
    "мон_pass"
  ],
  "Некромант": [
    "nec_dmg_1",
    "nec_dmg_2",
    "nec_shield",
    "nec_debuff",
    "nec_pass_1"
  ],
  "Ассасин": [
    "асс_dmg_1",
    "асс_dmg_2",
    "асс_buff",
    "асс_utility",
    "асс_pass"
  ],
  "Берсерк": [
    "ber_dmg_1",
    "ber_dmg_2",
    "ber_buff",
    "ber_dmg_3",
    "ber_pass_1"
  ],
  "Шаман": [
    "шам_dmg_1",
    "шам_dmg_2",
    "шам_buff",
    "шам_utility",
    "шам_pass"
  ],
  "Рыцарь Смерти": [
    "рыц_dmg_1",
    "рыц_dmg_2",
    "рыц_buff",
    "рыц_utility",
    "рыц_pass"
  ],
  "Иллюзионист": [
    "илл_dmg_1",
    "илл_dmg_2",
    "илл_buff",
    "илл_utility",
    "илл_pass"
  ],
  "Алхимик": [
    "алх_dmg_1",
    "алх_dmg_2",
    "алх_buff",
    "алх_utility",
    "алх_pass"
  ],
  "Охотник": [
    "охо_dmg_1",
    "охо_dmg_2",
    "охо_buff",
    "охо_utility",
    "охо_pass"
  ],
  "Инженер": [
    "инж_dmg_1",
    "инж_dmg_2",
    "инж_buff",
    "инж_utility",
    "инж_pass"
  ],
  "Маг Крови": [
    "bm_dmg_1",
    "bm_dmg_2",
    "bm_heal_1",
    "bm_pass_1",
    "bm_pass_2"
  ],
  "Боец": [
    "бое_dmg_1",
    "бое_dmg_2",
    "бое_buff",
    "бое_utility",
    "бое_pass"
  ]
};

export const CLASSES: string[] = [
  "Воин",
  "Маг",
  "Разбойник",
  "Лучник",
  "Жрец",
  "Паладин",
  "Чернокнижник",
  "Друид",
  "Бард",
  "Монах",
  "Некромант",
  "Ассасин",
  "Берсерк",
  "Шаман",
  "Рыцарь Смерти",
  "Иллюзионист",
  "Алхимик",
  "Охотник",
  "Инженер",
  "Маг Крови",
  "Боец"
];

export const SUBCLASSES: Record<string, string[]> = {
  "Воин": [
    "Гладиатор",
    "Защитник",
    "Мастер меча"
  ],
  "Маг": [
    "Пиромант",
    "Криомант",
    "Арканист"
  ],
  "Разбойник": [
    "Вор",
    "Тень",
    "Дуэлянт"
  ],
  "Лучник": [
    "Снайпер",
    "Следопыт",
    "Арбалетчик"
  ],
  "Жрец": [
    "Целитель",
    "Инквизитор",
    "Оракул"
  ],
  "Паладин": [
    "Крестоносец",
    "Храмовник",
    "Мститель"
  ],
  "Чернокнижник": [
    "Демонолог",
    "Культист",
    "Оккультист"
  ],
  "Друид": [
    "Оборотень",
    "Хранитель рощи",
    "Повелитель стихий"
  ],
  "Бард": [
    "Менестрель",
    "Скальд",
    "Танцор с клинками"
  ],
  "Монах": [
    "Мастер ци",
    "Пьяный мастер",
    "Странник"
  ],
  "Некромант": [
    "Повелитель костей",
    "Жнец душ",
    "Мастер чумы"
  ],
  "Ассасин": [
    "Ниндзя",
    "Отравитель",
    "Ночной клинок"
  ],
  "Берсерк": [
    "Кровавый страж",
    "Дикарь",
    "Разрушитель"
  ],
  "Шаман": [
    "Говорящий с духами",
    "Повелитель бурь",
    "Знахарь"
  ],
  "Рыцарь Смерти": [
    "Владыка льда",
    "Рыцарь крови",
    "Нечестивец"
  ],
  "Иллюзионист": [
    "Мастер разума",
    "Трикстер",
    "Ткач снов"
  ],
  "Алхимик": [
    "Бомбардир",
    "Мутант",
    "Мастер зелий"
  ],
  "Охотник": [
    "Повелитель зверей",
    "Стрелок",
    "Траппер"
  ],
  "Инженер": [
    "Механик",
    "Изобретатель",
    "Сапер"
  ],
  "Маг Крови": [
    "Вампир",
    "Гемомант",
    "Жрец крови"
  ],
  "Боец": [
    "Мастер единоборств",
    "Уличный боец",
    "Кикбоксер"
  ]
};

export const SKILL_CATALOG: Record<string, Skill> = {
  "w_dmg_1": {
    "id": "w_dmg_1",
    "name": "Могучий удар",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% физического урона.",
    "power": 140
  },
  "w_dmg_2": {
    "id": "w_dmg_2",
    "name": "Рассечение",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 120% физ. урона и вызывает кровотечение (30%/ход).",
    "power": 120,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 30
    }
  },
  "w_buff_1": {
    "id": "w_buff_1",
    "name": "Клич ярости",
    "type": "buff",
    "mpCost": 20,
    "cooldown": 5,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает физ. атаку на 40% на 4 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 4
    }
  },
  "w_buff_2": {
    "id": "w_buff_2",
    "name": "Глухая оборона",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 5,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Увеличивает защиту на 70% и дает щит (15% от макс. ХП).",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 70,
      "duration": 3
    },
    "shieldPct": 15
  },
  "w_pass_1": {
    "id": "w_pass_1",
    "name": "Закалка",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает здоровье и защиту на 15%.",
    "power": 15
  },
  "m_dmg_1": {
    "id": "m_dmg_1",
    "name": "Огненный шар",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 160% маг. урона. Поджигает цель (40%/ход).",
    "power": 160,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 40
    }
  },
  "m_dmg_2": {
    "id": "m_dmg_2",
    "name": "Ледяное копье",
    "type": "damage",
    "mpCost": 25,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 180% маг. урона. Шанс 25% заморозить (оглушить).",
    "power": 180,
    "statusEffect": {
      "type": "stun",
      "chance": 25,
      "duration": 1
    }
  },
  "m_dmg_3": {
    "id": "m_dmg_3",
    "name": "Цепная молния",
    "type": "damage",
    "mpCost": 35,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит колоссальные 220% маг. урона.",
    "power": 220
  },
  "m_buff_1": {
    "id": "m_buff_1",
    "name": "Магический барьер",
    "type": "buff",
    "mpCost": 30,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Накладывает магический щит прочностью 30% от макс. ХП.",
    "power": 0,
    "shieldPct": 30
  },
  "m_pass_1": {
    "id": "m_pass_1",
    "name": "Тайные знания",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает магическую атаку на 20%.",
    "power": 20
  },
  "rg_dmg_1": {
    "id": "rg_dmg_1",
    "name": "Калечащий удар",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 130% физ. урона и отравляет цель (25%/ход).",
    "power": 130,
    "dot": {
      "type": "poison",
      "duration": 4,
      "dmgPct": 25
    }
  },
  "rg_dmg_2": {
    "id": "rg_dmg_2",
    "name": "Удар из тени",
    "type": "damage",
    "mpCost": 25,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Двойной шанс крита (базовая мощь 200%).",
    "power": 200
  },
  "rg_debuff": {
    "id": "rg_debuff",
    "name": "Бросок песка",
    "type": "debuff",
    "mpCost": 20,
    "cooldown": 3,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит слабый урон (50%), но имеет 80% шанс ослепить цель на 2 хода.",
    "power": 50,
    "statusEffect": {
      "type": "blind",
      "duration": 2,
      "chance": 80
    }
  },
  "rg_buff_1": {
    "id": "rg_buff_1",
    "name": "Жажда крови",
    "type": "buff",
    "mpCost": 20,
    "cooldown": 5,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает ловкость (и шанс уклонения) на 40% на 4 хода.",
    "power": 0,
    "buff": {
      "stat": "agility",
      "valPct": 40,
      "duration": 4
    }
  },
  "rg_pass_1": {
    "id": "rg_pass_1",
    "name": "Скрытность",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно повышает ловкость на 15%.",
    "power": 15
  },
  "луч_dmg_1": {
    "id": "луч_dmg_1",
    "name": "Базовая атака Лучник",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "луч_dmg_2": {
    "id": "луч_dmg_2",
    "name": "Специальный удар Лучник",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "луч_buff": {
    "id": "луч_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "луч_utility": {
    "id": "луч_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "луч_pass": {
    "id": "луч_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "pri_heal_1": {
    "id": "pri_heal_1",
    "name": "Святое исцеление",
    "type": "heal",
    "mpCost": 25,
    "cooldown": 1,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Мощное лечение Светом (300%).",
    "power": 300
  },
  "pri_dmg_1": {
    "id": "pri_dmg_1",
    "name": "Кара небесная",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона силами Света.",
    "power": 150
  },
  "pri_buff_1": {
    "id": "pri_buff_1",
    "name": "Благословение",
    "type": "buff",
    "mpCost": 30,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает силу атаки на 30% и дает небольшой щит.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 30,
      "duration": 4
    },
    "shieldPct": 10
  },
  "pri_debuff": {
    "id": "pri_debuff",
    "name": "Немота",
    "type": "debuff",
    "mpCost": 20,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Накладывает немоту на врага (запрещает маг. скиллы) на 2 хода.",
    "power": 10,
    "statusEffect": {
      "type": "silence",
      "duration": 2,
      "chance": 100
    }
  },
  "pri_pass": {
    "id": "pri_pass",
    "name": "Аура света",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает маг. защиту на 30% и маг. атаку на 10%.",
    "power": 20
  },
  "pal_dmg_1": {
    "id": "pal_dmg_1",
    "name": "Удар Света",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% магического урона.",
    "power": 140
  },
  "pal_dmg_2": {
    "id": "pal_dmg_2",
    "name": "Кара",
    "type": "damage",
    "mpCost": 25,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона. 30% шанс оглушить нечестивца.",
    "power": 150,
    "statusEffect": {
      "type": "stun",
      "chance": 30,
      "duration": 1
    }
  },
  "pal_heal_1": {
    "id": "pal_heal_1",
    "name": "Возложение рук",
    "type": "heal",
    "mpCost": 30,
    "cooldown": 3,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Мощное исцеление Светом (200% маг. атаки/защиты).",
    "power": 200
  },
  "pal_buff_1": {
    "id": "pal_buff_1",
    "name": "Аура защиты",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает защиту на 50% и дает небольшой щит.",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 50,
      "duration": 4
    },
    "shieldPct": 10
  },
  "pal_pass_1": {
    "id": "pal_pass_1",
    "name": "Святая клятва",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно повышает защиту и маг. защиту на 20%.",
    "power": 20
  },
  "чер_dmg_1": {
    "id": "чер_dmg_1",
    "name": "Базовая атака Чернокнижник",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "чер_dmg_2": {
    "id": "чер_dmg_2",
    "name": "Специальный удар Чернокнижник",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "чер_buff": {
    "id": "чер_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "чер_utility": {
    "id": "чер_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "чер_pass": {
    "id": "чер_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "дру_dmg_1": {
    "id": "дру_dmg_1",
    "name": "Базовая атака Друид",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "дру_dmg_2": {
    "id": "дру_dmg_2",
    "name": "Специальный удар Друид",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "дру_buff": {
    "id": "дру_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "дру_utility": {
    "id": "дру_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "дру_pass": {
    "id": "дру_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "бар_dmg_1": {
    "id": "бар_dmg_1",
    "name": "Базовая атака Бард",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "бар_dmg_2": {
    "id": "бар_dmg_2",
    "name": "Специальный удар Бард",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "бар_buff": {
    "id": "бар_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "бар_utility": {
    "id": "бар_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "бар_pass": {
    "id": "бар_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "мон_dmg_1": {
    "id": "мон_dmg_1",
    "name": "Базовая атака Монах",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "мон_dmg_2": {
    "id": "мон_dmg_2",
    "name": "Специальный удар Монах",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "мон_buff": {
    "id": "мон_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "мон_utility": {
    "id": "мон_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "мон_pass": {
    "id": "мон_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "nec_dmg_1": {
    "id": "nec_dmg_1",
    "name": "Похищение жизни",
    "type": "damage",
    "mpCost": 25,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 120% маг. урона. Возвращает 100% нанесенного урона в виде ХП.",
    "power": 120,
    "vampirismPct": 100
  },
  "nec_dmg_2": {
    "id": "nec_dmg_2",
    "name": "Стрела распада",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 180% маг. урона. Отравляет темной магией (40%/ход).",
    "power": 180,
    "dot": {
      "type": "poison",
      "duration": 3,
      "dmgPct": 40
    }
  },
  "nec_shield": {
    "id": "nec_shield",
    "name": "Костяная броня",
    "type": "buff",
    "mpCost": 35,
    "cooldown": 5,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Призывает костяной щит на 40% от макс. ХП.",
    "power": 0,
    "shieldPct": 40
  },
  "nec_debuff": {
    "id": "nec_debuff",
    "name": "Проклятие слабости",
    "type": "debuff",
    "mpCost": 25,
    "cooldown": 3,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Снижает физическую атаку врага на 30% на 3 хода.",
    "power": 50,
    "debuff": {
      "stat": "attack",
      "valPct": 30,
      "duration": 3
    }
  },
  "nec_pass_1": {
    "id": "nec_pass_1",
    "name": "Жатва душ",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает маг. атаку на 20%.",
    "power": 20
  },
  "асс_dmg_1": {
    "id": "асс_dmg_1",
    "name": "Базовая атака Ассасин",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "асс_dmg_2": {
    "id": "асс_dmg_2",
    "name": "Специальный удар Ассасин",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "асс_buff": {
    "id": "асс_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "асс_utility": {
    "id": "асс_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "асс_pass": {
    "id": "асс_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "ber_dmg_1": {
    "id": "ber_dmg_1",
    "name": "Яростный рубящий удар",
    "type": "damage",
    "mpCost": 10,
    "hpCostPct": 8,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Тратит 8% ХП. Наносит огромные 200% физ. урона.",
    "power": 200
  },
  "ber_dmg_2": {
    "id": "ber_dmg_2",
    "name": "Мясорубка",
    "type": "damage",
    "mpCost": 15,
    "hpCostPct": 5,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Тратит 5% ХП. 180% урона и сильное кровотечение (50%/ход).",
    "power": 180,
    "dot": {
      "type": "bleed",
      "duration": 4,
      "dmgPct": 50
    }
  },
  "ber_buff": {
    "id": "ber_buff",
    "name": "Безрассудство",
    "type": "buff",
    "mpCost": 0,
    "hpCostPct": 10,
    "cooldown": 5,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Жертвует 10% ХП, чтобы увеличить физ. атаку на 80% на 3 хода!",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 80,
      "duration": 3
    }
  },
  "ber_dmg_3": {
    "id": "ber_dmg_3",
    "name": "Добивание",
    "type": "damage",
    "mpCost": 30,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Жестокий завершающий удар (240% урона).",
    "power": 240
  },
  "ber_pass_1": {
    "id": "ber_pass_1",
    "name": "Неудержимость",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно повышает атаку на 25% и максимальное ХП на 10%.",
    "power": 25
  },
  "шам_dmg_1": {
    "id": "шам_dmg_1",
    "name": "Базовая атака Шаман",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "шам_dmg_2": {
    "id": "шам_dmg_2",
    "name": "Специальный удар Шаман",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "шам_buff": {
    "id": "шам_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "шам_utility": {
    "id": "шам_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "шам_pass": {
    "id": "шам_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "рыц_dmg_1": {
    "id": "рыц_dmg_1",
    "name": "Базовая атака Рыцарь Смерти",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "рыц_dmg_2": {
    "id": "рыц_dmg_2",
    "name": "Специальный удар Рыцарь Смерти",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "рыц_buff": {
    "id": "рыц_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "рыц_utility": {
    "id": "рыц_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "рыц_pass": {
    "id": "рыц_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "илл_dmg_1": {
    "id": "илл_dmg_1",
    "name": "Базовая атака Иллюзионист",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "илл_dmg_2": {
    "id": "илл_dmg_2",
    "name": "Специальный удар Иллюзионист",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "илл_buff": {
    "id": "илл_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "илл_utility": {
    "id": "илл_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "илл_pass": {
    "id": "илл_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "алх_dmg_1": {
    "id": "алх_dmg_1",
    "name": "Базовая атака Алхимик",
    "type": "damage",
    "mpCost": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% маг. урона.",
    "power": 150
  },
  "алх_dmg_2": {
    "id": "алх_dmg_2",
    "name": "Специальный удар Алхимик",
    "type": "damage",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "burn",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "алх_buff": {
    "id": "алх_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 40,
      "duration": 3
    }
  },
  "алх_utility": {
    "id": "алх_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "алх_pass": {
    "id": "алх_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "охо_dmg_1": {
    "id": "охо_dmg_1",
    "name": "Базовая атака Охотник",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "охо_dmg_2": {
    "id": "охо_dmg_2",
    "name": "Специальный удар Охотник",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "охо_buff": {
    "id": "охо_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "охо_utility": {
    "id": "охо_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "охо_pass": {
    "id": "охо_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "инж_dmg_1": {
    "id": "инж_dmg_1",
    "name": "Базовая атака Инженер",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "инж_dmg_2": {
    "id": "инж_dmg_2",
    "name": "Специальный удар Инженер",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "инж_buff": {
    "id": "инж_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "инж_utility": {
    "id": "инж_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "инж_pass": {
    "id": "инж_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  },
  "bm_dmg_1": {
    "id": "bm_dmg_1",
    "name": "Вампирское касание",
    "type": "damage",
    "mpCost": 0,
    "hpCostPct": 5,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Жертвует 5% ХП, наносит 130% маг. урона и исцеляет на 50% от нанесенного урона.",
    "power": 130,
    "vampirismPct": 50
  },
  "bm_dmg_2": {
    "id": "bm_dmg_2",
    "name": "Кровавое копье",
    "type": "damage",
    "mpCost": 0,
    "hpCostPct": 15,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Тратит 15% ХП для мощного удара в 250% маг. урона. Вызывает сильное кровотечение.",
    "power": 250,
    "dot": {
      "type": "bleed",
      "duration": 2,
      "dmgPct": 50
    }
  },
  "bm_heal_1": {
    "id": "bm_heal_1",
    "name": "Переливание",
    "type": "heal",
    "mpCost": 0,
    "hpCostPct": 5,
    "cooldown": 3,
    "damageType": "magical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Тратит 5% ХП, но восстанавливает 300% маг. атаки в виде лечения.",
    "power": 300
  },
  "bm_pass_1": {
    "id": "bm_pass_1",
    "name": "Ихор безумия",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Уникальная пассивка: повышает урон на 2% за каждые 5% потерянного здоровья.",
    "power": 0
  },
  "bm_pass_2": {
    "id": "bm_pass_2",
    "name": "Густая кровь",
    "type": "passive",
    "damageType": "magical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает здоровье на 15%.",
    "power": 15
  },
  "бое_dmg_1": {
    "id": "бое_dmg_1",
    "name": "Базовая атака Боец",
    "type": "damage",
    "mpCost": 15,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 150% физ. урона.",
    "power": 150
  },
  "бое_dmg_2": {
    "id": "бое_dmg_2",
    "name": "Специальный удар Боец",
    "type": "damage",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Наносит 140% урона и накладывает постепенный урон (35%/ход).",
    "power": 140,
    "dot": {
      "type": "bleed",
      "duration": 3,
      "dmgPct": 35
    }
  },
  "бое_buff": {
    "id": "бое_buff",
    "name": "Усиление класса",
    "type": "buff",
    "mpCost": 25,
    "cooldown": 4,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Повышает основную атаку на 40% на 3 хода.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 40,
      "duration": 3
    }
  },
  "бое_utility": {
    "id": "бое_utility",
    "name": "Тактический прием",
    "type": "debuff",
    "mpCost": 20,
    "damageType": "physical",
    "isPassive": false,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Слабый (80%) удар с 20% шансом на оглушение.",
    "power": 80,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    }
  },
  "бое_pass": {
    "id": "бое_pass",
    "name": "Основа класса",
    "type": "passive",
    "damageType": "physical",
    "isPassive": true,
    "hitChance": 100,
    "effectChance": 0,
    "description": "Пассивно увеличивает основные параметры на 15%.",
    "power": 15
  }
};
