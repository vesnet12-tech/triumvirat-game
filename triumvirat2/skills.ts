export type SkillType = 'damage' | 'heal' | 'buff' | 'passive' | 'debuff';

export interface Skill {
  id: string;
  name: string;
  description: string;
  type?: SkillType;
  power?: number;
  mpCost?: number;
  multiplier?: number;
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
    "w_pass_1",
    "w_pass_2"
  ],
  "Маг": [
    "m_dmg_1",
    "m_dmg_2",
    "m_dmg_3",
    "m_buff_1",
    "m_pass_1",
    "m_pass_2"
  ],
  "Разбойник": [
    "rg_dmg_1",
    "rg_dmg_2",
    "rg_debuff",
    "rg_buff_1",
    "rg_pass_1",
    "rg_pass_2"
  ],
  "Лучник": [
    "луч_dmg_1",
    "луч_dmg_2",
    "луч_buff",
    "луч_utility",
    "луч_pass",
    "луч_pass_2"
  ],
  "Жрец": [
    "pri_heal_1",
    "pri_dmg_1",
    "pri_buff_1",
    "pri_debuff",
    "pri_pass",
    "pri_pass_2"
  ],
  "Паладин": [
    "pal_dmg_1",
    "pal_dmg_2",
    "pal_heal_1",
    "pal_buff_1",
    "pal_pass_1",
    "pal_pass_2"
  ],
  "Чернокнижник": [
    "чер_dmg_1",
    "чер_dmg_2",
    "чер_buff",
    "чер_utility",
    "чер_pass",
    "чер_pass_2"
  ],
  "Друид": [
    "дру_dmg_1",
    "дру_dmg_2",
    "дру_buff",
    "дру_utility",
    "дру_pass",
    "дру_pass_2"
  ],
  "Бард": [
    "бар_dmg_1",
    "бар_dmg_2",
    "бар_buff",
    "бар_utility",
    "бар_pass",
    "бар_pass_2"
  ],
  "Монах": [
    "мон_dmg_1",
    "мон_dmg_2",
    "мон_buff",
    "мон_utility",
    "мон_pass",
    "мон_pass_2"
  ],
  "Некромант": [
    "nec_dmg_1",
    "nec_dmg_2",
    "nec_shield",
    "nec_debuff",
    "nec_pass_1",
    "nec_pass_2"
  ],
  "Ассасин": [
    "асс_dmg_1",
    "асс_dmg_2",
    "асс_buff",
    "асс_utility",
    "асс_pass",
    "асс_pass_2"
  ],
  "Берсерк": [
    "ber_dmg_1",
    "ber_dmg_2",
    "ber_buff",
    "ber_dmg_3",
    "ber_pass_1",
    "ber_pass_2"
  ],
  "Шаман": [
    "шам_dmg_1",
    "шам_dmg_2",
    "шам_buff",
    "шам_utility",
    "шам_pass",
    "шам_pass_2"
  ],
  "Рыцарь Смерти": [
    "рыц_dmg_1",
    "рыц_dmg_2",
    "рыц_buff",
    "рыц_utility",
    "рыц_pass",
    "рыц_pass_2"
  ],
  "Иллюзионист": [
    "илл_dmg_1",
    "илл_dmg_2",
    "илл_buff",
    "илл_utility",
    "илл_pass",
    "илл_pass_2"
  ],
  "Алхимик": [
    "алх_dmg_1",
    "алх_dmg_2",
    "алх_buff",
    "алх_utility",
    "алх_pass",
    "алх_pass_2"
  ],
  "Охотник": [
    "охо_dmg_1",
    "охо_dmg_2",
    "охо_buff",
    "охо_utility",
    "охо_pass",
    "охо_pass_2"
  ],
  "Инженер": [
    "инж_dmg_1",
    "инж_dmg_2",
    "инж_buff",
    "инж_utility",
    "инж_pass",
    "инж_pass_2"
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
    "бое_pass",
    "бое_pass_2"
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
  "w_pass_2": {
    "id": "w_pass_2",
    "name": "Синхронизация духа (Воин)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "m_pass_2": {
    "id": "m_pass_2",
    "name": "Синхронизация духа (Маг)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "rg_pass_2": {
    "id": "rg_pass_2",
    "name": "Синхронизация духа (Разбойник)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "луч_pass_2": {
    "id": "луч_pass_2",
    "name": "Синхронизация духа (Лучник)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "pri_pass_2": {
    "id": "pri_pass_2",
    "name": "Синхронизация духа (Жрец)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "pal_pass_2": {
    "id": "pal_pass_2",
    "name": "Синхронизация духа (Паладин)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "чер_pass_2": {
    "id": "чер_pass_2",
    "name": "Синхронизация духа (Чернокнижник)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "дру_pass_2": {
    "id": "дру_pass_2",
    "name": "Синхронизация духа (Друид)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "бар_pass_2": {
    "id": "бар_pass_2",
    "name": "Синхронизация духа (Бард)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "мон_pass_2": {
    "id": "мон_pass_2",
    "name": "Синхронизация духа (Монах)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "nec_pass_2": {
    "id": "nec_pass_2",
    "name": "Синхронизация духа (Некромант)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "асс_pass_2": {
    "id": "асс_pass_2",
    "name": "Синхронизация духа (Ассасин)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "ber_pass_2": {
    "id": "ber_pass_2",
    "name": "Синхронизация духа (Берсерк)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "шам_pass_2": {
    "id": "шам_pass_2",
    "name": "Синхронизация духа (Шаман)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "рыц_pass_2": {
    "id": "рыц_pass_2",
    "name": "Синхронизация духа (Рыцарь Смерти)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "илл_pass_2": {
    "id": "илл_pass_2",
    "name": "Синхронизация духа (Иллюзионист)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "алх_pass_2": {
    "id": "алх_pass_2",
    "name": "Синхронизация духа (Алхимик)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "охо_pass_2": {
    "id": "охо_pass_2",
    "name": "Синхронизация духа (Охотник)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "инж_pass_2": {
    "id": "инж_pass_2",
    "name": "Синхронизация духа (Инженер)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
  "бое_pass_2": {
    "id": "бое_pass_2",
    "name": "Синхронизация духа (Боец)",
    "description": "Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.",
    "mpCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": {
      "stat": "trapDodge",
      "valPct": 25,
      "duration": 999
    },
    "power": 15
  },
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "magicAttack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
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
    "description": "Наносит 255% урона. (Улучшенная версия)",
    "power": 255
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
    "description": "Наносит 302% мощного урона. (Улучшенная версия)",
    "power": 302,
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
    "description": "Мощно увеличивает вашу боевую характеристику на 70% на время боя.",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 70,
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
    "description": "Наносит 140% урона и ослабляет врага.",
    "power": 140,
    "statusEffect": {
      "type": "stun",
      "chance": 20,
      "duration": 1
    },
    "debuff": {
      "stat": "defense",
      "valPct": 20,
      "duration": 2
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
    "description": "Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.",
    "power": 15,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "war_act_lvl_1": {
    "id": "war_act_lvl_1",
    "name": "Удар Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "war_act_lvl_2": {
    "id": "war_act_lvl_2",
    "name": "Выпад Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "war_act_lvl_3": {
    "id": "war_act_lvl_3",
    "name": "Слэш Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "war_act_lvl_4": {
    "id": "war_act_lvl_4",
    "name": "Пробивание Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "war_act_lvl_5": {
    "id": "war_act_lvl_5",
    "name": "Рывок Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "war_act_lvl_6": {
    "id": "war_act_lvl_6",
    "name": "Шквал Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "war_act_lvl_7": {
    "id": "war_act_lvl_7",
    "name": "Сокрушение Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "war_act_lvl_8": {
    "id": "war_act_lvl_8",
    "name": "Размах Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "war_act_lvl_9": {
    "id": "war_act_lvl_9",
    "name": "Взмах Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "war_act_lvl_10": {
    "id": "war_act_lvl_10",
    "name": "Бросок Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "war_pas_lvl_1": {
    "id": "war_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 19,
      "duration": 999
    }
  },
  "war_pas_lvl_2": {
    "id": "war_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "war_pas_lvl_3": {
    "id": "war_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает максимальное здоровье на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 13,
      "duration": 999
    }
  },
  "war_pas_lvl_4": {
    "id": "war_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальное здоровье на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 18,
      "duration": 999
    }
  },
  "war_pas_lvl_5": {
    "id": "war_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "war_pas_lvl_6": {
    "id": "war_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальное здоровье на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 18,
      "duration": 999
    }
  },
  "war_pas_lvl_7": {
    "id": "war_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает атака на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 13,
      "duration": 999
    }
  },
  "war_pas_lvl_8": {
    "id": "war_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает максимальное здоровье на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 12,
      "duration": 999
    }
  },
  "war_pas_lvl_9": {
    "id": "war_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 11,
      "duration": 999
    }
  },
  "war_pas_lvl_10": {
    "id": "war_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает атака на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 19,
      "duration": 999
    }
  },
  "mag_act_lvl_1": {
    "id": "mag_act_lvl_1",
    "name": "Стрела Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "mag_act_lvl_2": {
    "id": "mag_act_lvl_2",
    "name": "Сфера Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "mag_act_lvl_3": {
    "id": "mag_act_lvl_3",
    "name": "Взрыв Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mag_act_lvl_4": {
    "id": "mag_act_lvl_4",
    "name": "Луч Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "mag_act_lvl_5": {
    "id": "mag_act_lvl_5",
    "name": "Нова Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "mag_act_lvl_6": {
    "id": "mag_act_lvl_6",
    "name": "Вспышка Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mag_act_lvl_7": {
    "id": "mag_act_lvl_7",
    "name": "Кристалл Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "mag_act_lvl_8": {
    "id": "mag_act_lvl_8",
    "name": "Копье Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "mag_act_lvl_9": {
    "id": "mag_act_lvl_9",
    "name": "Разлом Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mag_act_lvl_10": {
    "id": "mag_act_lvl_10",
    "name": "Катаклизм Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "mag_pas_lvl_1": {
    "id": "mag_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 14,
      "duration": 999
    }
  },
  "mag_pas_lvl_2": {
    "id": "mag_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает максимальное здоровье на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 10,
      "duration": 999
    }
  },
  "mag_pas_lvl_3": {
    "id": "mag_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "mag_pas_lvl_4": {
    "id": "mag_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 19,
      "duration": 999
    }
  },
  "mag_pas_lvl_5": {
    "id": "mag_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 12,
      "duration": 999
    }
  },
  "mag_pas_lvl_6": {
    "id": "mag_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает атака на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 14,
      "duration": 999
    }
  },
  "mag_pas_lvl_7": {
    "id": "mag_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 11,
      "duration": 999
    }
  },
  "mag_pas_lvl_8": {
    "id": "mag_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 18,
      "duration": 999
    }
  },
  "mag_pas_lvl_9": {
    "id": "mag_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 19,
      "duration": 999
    }
  },
  "mag_pas_lvl_10": {
    "id": "mag_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "rog_act_lvl_1": {
    "id": "rog_act_lvl_1",
    "name": "Удар кинжалом Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "rog_act_lvl_2": {
    "id": "rog_act_lvl_2",
    "name": "Отравление Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "rog_act_lvl_3": {
    "id": "rog_act_lvl_3",
    "name": "Кровотечение Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "rog_act_lvl_4": {
    "id": "rog_act_lvl_4",
    "name": "Бросок Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "rog_act_lvl_5": {
    "id": "rog_act_lvl_5",
    "name": "Грязный прием Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "rog_act_lvl_6": {
    "id": "rog_act_lvl_6",
    "name": "Теневой шаг Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "rog_act_lvl_7": {
    "id": "rog_act_lvl_7",
    "name": "Засада Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "rog_act_lvl_8": {
    "id": "rog_act_lvl_8",
    "name": "Шип Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "rog_act_lvl_9": {
    "id": "rog_act_lvl_9",
    "name": "Порез Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "rog_act_lvl_10": {
    "id": "rog_act_lvl_10",
    "name": "Подлый удар Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "rog_pas_lvl_1": {
    "id": "rog_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 13,
      "duration": 999
    }
  },
  "rog_pas_lvl_2": {
    "id": "rog_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "rog_pas_lvl_3": {
    "id": "rog_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "rog_pas_lvl_4": {
    "id": "rog_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "rog_pas_lvl_5": {
    "id": "rog_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 17,
      "duration": 999
    }
  },
  "rog_pas_lvl_6": {
    "id": "rog_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "rog_pas_lvl_7": {
    "id": "rog_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 11,
      "duration": 999
    }
  },
  "rog_pas_lvl_8": {
    "id": "rog_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает максимальное здоровье на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 19,
      "duration": 999
    }
  },
  "rog_pas_lvl_9": {
    "id": "rog_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "rog_pas_lvl_10": {
    "id": "rog_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает атака на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 11,
      "duration": 999
    }
  },
  "arc_act_lvl_1": {
    "id": "arc_act_lvl_1",
    "name": "Выстрел Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "arc_act_lvl_2": {
    "id": "arc_act_lvl_2",
    "name": "Залп Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "arc_act_lvl_3": {
    "id": "arc_act_lvl_3",
    "name": "Пронзание Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "arc_act_lvl_4": {
    "id": "arc_act_lvl_4",
    "name": "Град стрел Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "arc_act_lvl_5": {
    "id": "arc_act_lvl_5",
    "name": "Прицельный выстрел Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "arc_act_lvl_6": {
    "id": "arc_act_lvl_6",
    "name": "Ловушка Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "arc_act_lvl_7": {
    "id": "arc_act_lvl_7",
    "name": "Отскок Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "arc_act_lvl_8": {
    "id": "arc_act_lvl_8",
    "name": "Снайпер Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "arc_act_lvl_9": {
    "id": "arc_act_lvl_9",
    "name": "Тень Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "arc_act_lvl_10": {
    "id": "arc_act_lvl_10",
    "name": "Охота Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "arc_pas_lvl_1": {
    "id": "arc_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 11,
      "duration": 999
    }
  },
  "arc_pas_lvl_2": {
    "id": "arc_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает атака на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 13,
      "duration": 999
    }
  },
  "arc_pas_lvl_3": {
    "id": "arc_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 17,
      "duration": 999
    }
  },
  "arc_pas_lvl_4": {
    "id": "arc_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 18,
      "duration": 999
    }
  },
  "arc_pas_lvl_5": {
    "id": "arc_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 18,
      "duration": 999
    }
  },
  "arc_pas_lvl_6": {
    "id": "arc_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальная мана на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 12,
      "duration": 999
    }
  },
  "arc_pas_lvl_7": {
    "id": "arc_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальное здоровье на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 14,
      "duration": 999
    }
  },
  "arc_pas_lvl_8": {
    "id": "arc_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "arc_pas_lvl_9": {
    "id": "arc_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "arc_pas_lvl_10": {
    "id": "arc_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает максимальное здоровье на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 12,
      "duration": 999
    }
  },
  "pri_act_lvl_1": {
    "id": "pri_act_lvl_1",
    "name": "Лечение Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "pri_act_lvl_2": {
    "id": "pri_act_lvl_2",
    "name": "Свет Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "pri_act_lvl_3": {
    "id": "pri_act_lvl_3",
    "name": "Кара Смертельный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical"
  },
  "pri_act_lvl_4": {
    "id": "pri_act_lvl_4",
    "name": "Слово Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "pri_act_lvl_5": {
    "id": "pri_act_lvl_5",
    "name": "Щит Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "pri_act_lvl_6": {
    "id": "pri_act_lvl_6",
    "name": "Благословение Яростный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical"
  },
  "pri_act_lvl_7": {
    "id": "pri_act_lvl_7",
    "name": "Очищение Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "pri_act_lvl_8": {
    "id": "pri_act_lvl_8",
    "name": "Молитва Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "pri_act_lvl_9": {
    "id": "pri_act_lvl_9",
    "name": "Аура Точный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical"
  },
  "pri_act_lvl_10": {
    "id": "pri_act_lvl_10",
    "name": "Воскрешение Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "pri_pas_lvl_1": {
    "id": "pri_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 17,
      "duration": 999
    }
  },
  "pri_pas_lvl_2": {
    "id": "pri_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 12,
      "duration": 999
    }
  },
  "pri_pas_lvl_3": {
    "id": "pri_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает атака на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 11,
      "duration": 999
    }
  },
  "pri_pas_lvl_4": {
    "id": "pri_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "pri_pas_lvl_5": {
    "id": "pri_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает максимальное здоровье на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 10,
      "duration": 999
    }
  },
  "pri_pas_lvl_6": {
    "id": "pri_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает защита на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 16,
      "duration": 999
    }
  },
  "pri_pas_lvl_7": {
    "id": "pri_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает атака на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 13,
      "duration": 999
    }
  },
  "pri_pas_lvl_8": {
    "id": "pri_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает защита на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 11,
      "duration": 999
    }
  },
  "pri_pas_lvl_9": {
    "id": "pri_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 13,
      "duration": 999
    }
  },
  "pri_pas_lvl_10": {
    "id": "pri_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает защита на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 16,
      "duration": 999
    }
  },
  "pal_act_lvl_1": {
    "id": "pal_act_lvl_1",
    "name": "Удар щитом Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "pal_act_lvl_2": {
    "id": "pal_act_lvl_2",
    "name": "Правосудие Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "pal_act_lvl_3": {
    "id": "pal_act_lvl_3",
    "name": "Освящение Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "pal_act_lvl_4": {
    "id": "pal_act_lvl_4",
    "name": "Свет Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "pal_act_lvl_5": {
    "id": "pal_act_lvl_5",
    "name": "Возложение Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "pal_act_lvl_6": {
    "id": "pal_act_lvl_6",
    "name": "Гнев Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "pal_act_lvl_7": {
    "id": "pal_act_lvl_7",
    "name": "Печать Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "pal_act_lvl_8": {
    "id": "pal_act_lvl_8",
    "name": "Крест Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "pal_act_lvl_9": {
    "id": "pal_act_lvl_9",
    "name": "Защита Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "pal_act_lvl_10": {
    "id": "pal_act_lvl_10",
    "name": "Возмездие Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "pal_pas_lvl_1": {
    "id": "pal_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 15,
      "duration": 999
    }
  },
  "pal_pas_lvl_2": {
    "id": "pal_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 18,
      "duration": 999
    }
  },
  "pal_pas_lvl_3": {
    "id": "pal_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает атака на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 11,
      "duration": 999
    }
  },
  "pal_pas_lvl_4": {
    "id": "pal_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 13,
      "duration": 999
    }
  },
  "pal_pas_lvl_5": {
    "id": "pal_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 18,
      "duration": 999
    }
  },
  "pal_pas_lvl_6": {
    "id": "pal_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 10,
      "duration": 999
    }
  },
  "pal_pas_lvl_7": {
    "id": "pal_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальная мана на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 15,
      "duration": 999
    }
  },
  "pal_pas_lvl_8": {
    "id": "pal_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 17,
      "duration": 999
    }
  },
  "pal_pas_lvl_9": {
    "id": "pal_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 12,
      "duration": 999
    }
  },
  "pal_pas_lvl_10": {
    "id": "pal_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 19,
      "duration": 999
    }
  },
  "wlo_act_lvl_1": {
    "id": "wlo_act_lvl_1",
    "name": "Тьма Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "wlo_act_lvl_2": {
    "id": "wlo_act_lvl_2",
    "name": "Проклятье Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "wlo_act_lvl_3": {
    "id": "wlo_act_lvl_3",
    "name": "Вытягивание Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "wlo_act_lvl_4": {
    "id": "wlo_act_lvl_4",
    "name": "Ритуал Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "wlo_act_lvl_5": {
    "id": "wlo_act_lvl_5",
    "name": "Демон Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "wlo_act_lvl_6": {
    "id": "wlo_act_lvl_6",
    "name": "Адский огонь Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "wlo_act_lvl_7": {
    "id": "wlo_act_lvl_7",
    "name": "Разложение Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "wlo_act_lvl_8": {
    "id": "wlo_act_lvl_8",
    "name": "Тлен Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "wlo_act_lvl_9": {
    "id": "wlo_act_lvl_9",
    "name": "Осквернение Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "wlo_act_lvl_10": {
    "id": "wlo_act_lvl_10",
    "name": "Мрак Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "wlo_pas_lvl_1": {
    "id": "wlo_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает защита на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 14,
      "duration": 999
    }
  },
  "wlo_pas_lvl_2": {
    "id": "wlo_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 16,
      "duration": 999
    }
  },
  "wlo_pas_lvl_3": {
    "id": "wlo_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 10,
      "duration": 999
    }
  },
  "wlo_pas_lvl_4": {
    "id": "wlo_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 17,
      "duration": 999
    }
  },
  "wlo_pas_lvl_5": {
    "id": "wlo_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "wlo_pas_lvl_6": {
    "id": "wlo_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 19,
      "duration": 999
    }
  },
  "wlo_pas_lvl_7": {
    "id": "wlo_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает защита на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 13,
      "duration": 999
    }
  },
  "wlo_pas_lvl_8": {
    "id": "wlo_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "wlo_pas_lvl_9": {
    "id": "wlo_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает максимальная мана на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 10,
      "duration": 999
    }
  },
  "wlo_pas_lvl_10": {
    "id": "wlo_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает максимальная мана на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 14,
      "duration": 999
    }
  },
  "dru_act_lvl_1": {
    "id": "dru_act_lvl_1",
    "name": "Гнев Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "dru_act_lvl_2": {
    "id": "dru_act_lvl_2",
    "name": "Корни Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "dru_act_lvl_3": {
    "id": "dru_act_lvl_3",
    "name": "Шипы Смертельный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical"
  },
  "dru_act_lvl_4": {
    "id": "dru_act_lvl_4",
    "name": "Исцеление Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "dru_act_lvl_5": {
    "id": "dru_act_lvl_5",
    "name": "Рой Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "dru_act_lvl_6": {
    "id": "dru_act_lvl_6",
    "name": "Укус Яростный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical"
  },
  "dru_act_lvl_7": {
    "id": "dru_act_lvl_7",
    "name": "Удар лапой Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "dru_act_lvl_8": {
    "id": "dru_act_lvl_8",
    "name": "Взбучка Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "dru_act_lvl_9": {
    "id": "dru_act_lvl_9",
    "name": "Звездопад Точный",
    "description": "Мощный классовый навык.",
    "type": "heal",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical"
  },
  "dru_act_lvl_10": {
    "id": "dru_act_lvl_10",
    "name": "Лунный огонь Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "dru_pas_lvl_1": {
    "id": "dru_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает защита на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 13,
      "duration": 999
    }
  },
  "dru_pas_lvl_2": {
    "id": "dru_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 17,
      "duration": 999
    }
  },
  "dru_pas_lvl_3": {
    "id": "dru_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает максимальное здоровье на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 10,
      "duration": 999
    }
  },
  "dru_pas_lvl_4": {
    "id": "dru_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 19,
      "duration": 999
    }
  },
  "dru_pas_lvl_5": {
    "id": "dru_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 19,
      "duration": 999
    }
  },
  "dru_pas_lvl_6": {
    "id": "dru_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 13,
      "duration": 999
    }
  },
  "dru_pas_lvl_7": {
    "id": "dru_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "dru_pas_lvl_8": {
    "id": "dru_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 19,
      "duration": 999
    }
  },
  "dru_pas_lvl_9": {
    "id": "dru_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "dru_pas_lvl_10": {
    "id": "dru_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "bar_act_lvl_1": {
    "id": "bar_act_lvl_1",
    "name": "Песня Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "bar_act_lvl_2": {
    "id": "bar_act_lvl_2",
    "name": "Гимн Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "bar_act_lvl_3": {
    "id": "bar_act_lvl_3",
    "name": "Аккорд Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bar_act_lvl_4": {
    "id": "bar_act_lvl_4",
    "name": "Соло Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "bar_act_lvl_5": {
    "id": "bar_act_lvl_5",
    "name": "Крещендо Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "bar_act_lvl_6": {
    "id": "bar_act_lvl_6",
    "name": "Мелодия Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bar_act_lvl_7": {
    "id": "bar_act_lvl_7",
    "name": "Ритм Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "bar_act_lvl_8": {
    "id": "bar_act_lvl_8",
    "name": "Шоу Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "bar_act_lvl_9": {
    "id": "bar_act_lvl_9",
    "name": "Шум Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bar_act_lvl_10": {
    "id": "bar_act_lvl_10",
    "name": "Мотив Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "bar_pas_lvl_1": {
    "id": "bar_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "bar_pas_lvl_2": {
    "id": "bar_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает максимальное здоровье на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 17,
      "duration": 999
    }
  },
  "bar_pas_lvl_3": {
    "id": "bar_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает максимальная мана на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 12,
      "duration": 999
    }
  },
  "bar_pas_lvl_4": {
    "id": "bar_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 11,
      "duration": 999
    }
  },
  "bar_pas_lvl_5": {
    "id": "bar_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 14,
      "duration": 999
    }
  },
  "bar_pas_lvl_6": {
    "id": "bar_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "bar_pas_lvl_7": {
    "id": "bar_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальная мана на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 15,
      "duration": 999
    }
  },
  "bar_pas_lvl_8": {
    "id": "bar_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "bar_pas_lvl_9": {
    "id": "bar_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "bar_pas_lvl_10": {
    "id": "bar_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает максимальная мана на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 18,
      "duration": 999
    }
  },
  "mon_act_lvl_1": {
    "id": "mon_act_lvl_1",
    "name": "Удар тигра Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "mon_act_lvl_2": {
    "id": "mon_act_lvl_2",
    "name": "Нова Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "mon_act_lvl_3": {
    "id": "mon_act_lvl_3",
    "name": "Ки Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mon_act_lvl_4": {
    "id": "mon_act_lvl_4",
    "name": "Пинок Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "mon_act_lvl_5": {
    "id": "mon_act_lvl_5",
    "name": "Дзен Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "mon_act_lvl_6": {
    "id": "mon_act_lvl_6",
    "name": "Буря Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mon_act_lvl_7": {
    "id": "mon_act_lvl_7",
    "name": "Волна Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "mon_act_lvl_8": {
    "id": "mon_act_lvl_8",
    "name": "Захват Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "mon_act_lvl_9": {
    "id": "mon_act_lvl_9",
    "name": "Сфера Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "mon_act_lvl_10": {
    "id": "mon_act_lvl_10",
    "name": "Стиль Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "mon_pas_lvl_1": {
    "id": "mon_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "mon_pas_lvl_2": {
    "id": "mon_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает атака на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 11,
      "duration": 999
    }
  },
  "mon_pas_lvl_3": {
    "id": "mon_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 19,
      "duration": 999
    }
  },
  "mon_pas_lvl_4": {
    "id": "mon_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "mon_pas_lvl_5": {
    "id": "mon_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 19,
      "duration": 999
    }
  },
  "mon_pas_lvl_6": {
    "id": "mon_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальная мана на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 15,
      "duration": 999
    }
  },
  "mon_pas_lvl_7": {
    "id": "mon_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 11,
      "duration": 999
    }
  },
  "mon_pas_lvl_8": {
    "id": "mon_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 17,
      "duration": 999
    }
  },
  "mon_pas_lvl_9": {
    "id": "mon_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает максимальная мана на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 17,
      "duration": 999
    }
  },
  "mon_pas_lvl_10": {
    "id": "mon_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает атака на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 14,
      "duration": 999
    }
  },
  "nec_act_lvl_1": {
    "id": "nec_act_lvl_1",
    "name": "Кость Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "nec_act_lvl_2": {
    "id": "nec_act_lvl_2",
    "name": "Череп Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "nec_act_lvl_3": {
    "id": "nec_act_lvl_3",
    "name": "Смерть Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "nec_act_lvl_4": {
    "id": "nec_act_lvl_4",
    "name": "Мрак Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "nec_act_lvl_5": {
    "id": "nec_act_lvl_5",
    "name": "Стая Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "nec_act_lvl_6": {
    "id": "nec_act_lvl_6",
    "name": "Чума Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "nec_act_lvl_7": {
    "id": "nec_act_lvl_7",
    "name": "Разложение Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "nec_act_lvl_8": {
    "id": "nec_act_lvl_8",
    "name": "Пробивание Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "nec_act_lvl_9": {
    "id": "nec_act_lvl_9",
    "name": "Прах Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "nec_act_lvl_10": {
    "id": "nec_act_lvl_10",
    "name": "Жатва Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "nec_pas_lvl_1": {
    "id": "nec_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "nec_pas_lvl_2": {
    "id": "nec_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает максимальная мана на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 17,
      "duration": 999
    }
  },
  "nec_pas_lvl_3": {
    "id": "nec_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "nec_pas_lvl_4": {
    "id": "nec_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 14,
      "duration": 999
    }
  },
  "nec_pas_lvl_5": {
    "id": "nec_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "nec_pas_lvl_6": {
    "id": "nec_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает защита на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 10,
      "duration": 999
    }
  },
  "nec_pas_lvl_7": {
    "id": "nec_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "nec_pas_lvl_8": {
    "id": "nec_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает максимальное здоровье на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 14,
      "duration": 999
    }
  },
  "nec_pas_lvl_9": {
    "id": "nec_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает атака на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 19,
      "duration": 999
    }
  },
  "nec_pas_lvl_10": {
    "id": "nec_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "ass_act_lvl_1": {
    "id": "ass_act_lvl_1",
    "name": "Клинок Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ass_act_lvl_2": {
    "id": "ass_act_lvl_2",
    "name": "Тень Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ass_act_lvl_3": {
    "id": "ass_act_lvl_3",
    "name": "Яд Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ass_act_lvl_4": {
    "id": "ass_act_lvl_4",
    "name": "Отравление Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ass_act_lvl_5": {
    "id": "ass_act_lvl_5",
    "name": "Шип Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ass_act_lvl_6": {
    "id": "ass_act_lvl_6",
    "name": "Фантом Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ass_act_lvl_7": {
    "id": "ass_act_lvl_7",
    "name": "Взмах Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ass_act_lvl_8": {
    "id": "ass_act_lvl_8",
    "name": "Удушение Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ass_act_lvl_9": {
    "id": "ass_act_lvl_9",
    "name": "Рывок Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ass_act_lvl_10": {
    "id": "ass_act_lvl_10",
    "name": "Смерть Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ass_pas_lvl_1": {
    "id": "ass_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "ass_pas_lvl_2": {
    "id": "ass_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает атака на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 17,
      "duration": 999
    }
  },
  "ass_pas_lvl_3": {
    "id": "ass_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает атака на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 14,
      "duration": 999
    }
  },
  "ass_pas_lvl_4": {
    "id": "ass_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "ass_pas_lvl_5": {
    "id": "ass_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает максимальная мана на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 18,
      "duration": 999
    }
  },
  "ass_pas_lvl_6": {
    "id": "ass_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "ass_pas_lvl_7": {
    "id": "ass_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "ass_pas_lvl_8": {
    "id": "ass_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "ass_pas_lvl_9": {
    "id": "ass_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "ass_pas_lvl_10": {
    "id": "ass_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 10,
      "duration": 999
    }
  },
  "ber_act_lvl_1": {
    "id": "ber_act_lvl_1",
    "name": "Кровожадность Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ber_act_lvl_2": {
    "id": "ber_act_lvl_2",
    "name": "Ярость Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ber_act_lvl_3": {
    "id": "ber_act_lvl_3",
    "name": "Размах Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ber_act_lvl_4": {
    "id": "ber_act_lvl_4",
    "name": "Удар Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ber_act_lvl_5": {
    "id": "ber_act_lvl_5",
    "name": "Сокрушение Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ber_act_lvl_6": {
    "id": "ber_act_lvl_6",
    "name": "Рев Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ber_act_lvl_7": {
    "id": "ber_act_lvl_7",
    "name": "Буйство Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "ber_act_lvl_8": {
    "id": "ber_act_lvl_8",
    "name": "Казнь Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ber_act_lvl_9": {
    "id": "ber_act_lvl_9",
    "name": "Рывок Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ber_act_lvl_10": {
    "id": "ber_act_lvl_10",
    "name": "Мясорубка Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "ber_pas_lvl_1": {
    "id": "ber_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 19,
      "duration": 999
    }
  },
  "ber_pas_lvl_2": {
    "id": "ber_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "ber_pas_lvl_3": {
    "id": "ber_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает максимальное здоровье на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 10,
      "duration": 999
    }
  },
  "ber_pas_lvl_4": {
    "id": "ber_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "ber_pas_lvl_5": {
    "id": "ber_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 12,
      "duration": 999
    }
  },
  "ber_pas_lvl_6": {
    "id": "ber_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 13,
      "duration": 999
    }
  },
  "ber_pas_lvl_7": {
    "id": "ber_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает защита на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 16,
      "duration": 999
    }
  },
  "ber_pas_lvl_8": {
    "id": "ber_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 11,
      "duration": 999
    }
  },
  "ber_pas_lvl_9": {
    "id": "ber_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "ber_pas_lvl_10": {
    "id": "ber_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает защита на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 13,
      "duration": 999
    }
  },
  "sha_act_lvl_1": {
    "id": "sha_act_lvl_1",
    "name": "Молния Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "sha_act_lvl_2": {
    "id": "sha_act_lvl_2",
    "name": "Тотем Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "sha_act_lvl_3": {
    "id": "sha_act_lvl_3",
    "name": "Землетрясение Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "sha_act_lvl_4": {
    "id": "sha_act_lvl_4",
    "name": "Шок Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "sha_act_lvl_5": {
    "id": "sha_act_lvl_5",
    "name": "Лава Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "sha_act_lvl_6": {
    "id": "sha_act_lvl_6",
    "name": "Исцеление Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "sha_act_lvl_7": {
    "id": "sha_act_lvl_7",
    "name": "Гром Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "sha_act_lvl_8": {
    "id": "sha_act_lvl_8",
    "name": "Возрождение Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "sha_act_lvl_9": {
    "id": "sha_act_lvl_9",
    "name": "Дух Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "sha_act_lvl_10": {
    "id": "sha_act_lvl_10",
    "name": "Буря Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "sha_pas_lvl_1": {
    "id": "sha_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 11,
      "duration": 999
    }
  },
  "sha_pas_lvl_2": {
    "id": "sha_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает максимальное здоровье на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 12,
      "duration": 999
    }
  },
  "sha_pas_lvl_3": {
    "id": "sha_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "sha_pas_lvl_4": {
    "id": "sha_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 18,
      "duration": 999
    }
  },
  "sha_pas_lvl_5": {
    "id": "sha_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает защита на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 17,
      "duration": 999
    }
  },
  "sha_pas_lvl_6": {
    "id": "sha_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальное здоровье на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 12,
      "duration": 999
    }
  },
  "sha_pas_lvl_7": {
    "id": "sha_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает атака на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 14,
      "duration": 999
    }
  },
  "sha_pas_lvl_8": {
    "id": "sha_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает атака на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 18,
      "duration": 999
    }
  },
  "sha_pas_lvl_9": {
    "id": "sha_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "sha_pas_lvl_10": {
    "id": "sha_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает защита на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 15,
      "duration": 999
    }
  },
  "dk_act_lvl_1": {
    "id": "dk_act_lvl_1",
    "name": "Лед Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "dk_act_lvl_2": {
    "id": "dk_act_lvl_2",
    "name": "Кровь Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "dk_act_lvl_3": {
    "id": "dk_act_lvl_3",
    "name": "Чума Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "dk_act_lvl_4": {
    "id": "dk_act_lvl_4",
    "name": "Удар Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "dk_act_lvl_5": {
    "id": "dk_act_lvl_5",
    "name": "Мрак Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "dk_act_lvl_6": {
    "id": "dk_act_lvl_6",
    "name": "Лик Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "dk_act_lvl_7": {
    "id": "dk_act_lvl_7",
    "name": "Хватка Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "dk_act_lvl_8": {
    "id": "dk_act_lvl_8",
    "name": "Смерть Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "dk_act_lvl_9": {
    "id": "dk_act_lvl_9",
    "name": "Обморожение Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "dk_act_lvl_10": {
    "id": "dk_act_lvl_10",
    "name": "Коса Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "dk_pas_lvl_1": {
    "id": "dk_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 10,
      "duration": 999
    }
  },
  "dk_pas_lvl_2": {
    "id": "dk_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "dk_pas_lvl_3": {
    "id": "dk_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 18,
      "duration": 999
    }
  },
  "dk_pas_lvl_4": {
    "id": "dk_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "dk_pas_lvl_5": {
    "id": "dk_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "dk_pas_lvl_6": {
    "id": "dk_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "dk_pas_lvl_7": {
    "id": "dk_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает защита на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 14,
      "duration": 999
    }
  },
  "dk_pas_lvl_8": {
    "id": "dk_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "dk_pas_lvl_9": {
    "id": "dk_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 13,
      "duration": 999
    }
  },
  "dk_pas_lvl_10": {
    "id": "dk_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "ill_act_lvl_1": {
    "id": "ill_act_lvl_1",
    "name": "Клон Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "ill_act_lvl_2": {
    "id": "ill_act_lvl_2",
    "name": "Фантом Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "ill_act_lvl_3": {
    "id": "ill_act_lvl_3",
    "name": "Зеркало Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ill_act_lvl_4": {
    "id": "ill_act_lvl_4",
    "name": "Иллюзия Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "ill_act_lvl_5": {
    "id": "ill_act_lvl_5",
    "name": "Свет Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "ill_act_lvl_6": {
    "id": "ill_act_lvl_6",
    "name": "Тень Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ill_act_lvl_7": {
    "id": "ill_act_lvl_7",
    "name": "Обман Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "ill_act_lvl_8": {
    "id": "ill_act_lvl_8",
    "name": "Вспышка Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "ill_act_lvl_9": {
    "id": "ill_act_lvl_9",
    "name": "Разум Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "ill_act_lvl_10": {
    "id": "ill_act_lvl_10",
    "name": "Марево Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "ill_pas_lvl_1": {
    "id": "ill_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 18,
      "duration": 999
    }
  },
  "ill_pas_lvl_2": {
    "id": "ill_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "ill_pas_lvl_3": {
    "id": "ill_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "ill_pas_lvl_4": {
    "id": "ill_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "ill_pas_lvl_5": {
    "id": "ill_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "ill_pas_lvl_6": {
    "id": "ill_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 14,
      "duration": 999
    }
  },
  "ill_pas_lvl_7": {
    "id": "ill_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальная мана на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 19,
      "duration": 999
    }
  },
  "ill_pas_lvl_8": {
    "id": "ill_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает максимальная мана на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 14,
      "duration": 999
    }
  },
  "ill_pas_lvl_9": {
    "id": "ill_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "ill_pas_lvl_10": {
    "id": "ill_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает защита на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 10,
      "duration": 999
    }
  },
  "alc_act_lvl_1": {
    "id": "alc_act_lvl_1",
    "name": "Зелье Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "alc_act_lvl_2": {
    "id": "alc_act_lvl_2",
    "name": "Бомба Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "alc_act_lvl_3": {
    "id": "alc_act_lvl_3",
    "name": "Слизь Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "alc_act_lvl_4": {
    "id": "alc_act_lvl_4",
    "name": "Токсин Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "alc_act_lvl_5": {
    "id": "alc_act_lvl_5",
    "name": "Кислота Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "alc_act_lvl_6": {
    "id": "alc_act_lvl_6",
    "name": "Колба Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "alc_act_lvl_7": {
    "id": "alc_act_lvl_7",
    "name": "Мутация Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "alc_act_lvl_8": {
    "id": "alc_act_lvl_8",
    "name": "Взрыв Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "alc_act_lvl_9": {
    "id": "alc_act_lvl_9",
    "name": "Микстура Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "alc_act_lvl_10": {
    "id": "alc_act_lvl_10",
    "name": "Реагент Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "alc_pas_lvl_1": {
    "id": "alc_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "alc_pas_lvl_2": {
    "id": "alc_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает атака на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 13,
      "duration": 999
    }
  },
  "alc_pas_lvl_3": {
    "id": "alc_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 11,
      "duration": 999
    }
  },
  "alc_pas_lvl_4": {
    "id": "alc_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "alc_pas_lvl_5": {
    "id": "alc_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает атака на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 19,
      "duration": 999
    }
  },
  "alc_pas_lvl_6": {
    "id": "alc_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает защита на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 10,
      "duration": 999
    }
  },
  "alc_pas_lvl_7": {
    "id": "alc_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает атака на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 10,
      "duration": 999
    }
  },
  "alc_pas_lvl_8": {
    "id": "alc_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 13,
      "duration": 999
    }
  },
  "alc_pas_lvl_9": {
    "id": "alc_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "alc_pas_lvl_10": {
    "id": "alc_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "hun_act_lvl_1": {
    "id": "hun_act_lvl_1",
    "name": "Выстрел Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "hun_act_lvl_2": {
    "id": "hun_act_lvl_2",
    "name": "Метка Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "hun_act_lvl_3": {
    "id": "hun_act_lvl_3",
    "name": "Зверь Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "hun_act_lvl_4": {
    "id": "hun_act_lvl_4",
    "name": "Капкан Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "hun_act_lvl_5": {
    "id": "hun_act_lvl_5",
    "name": "Бросок Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "hun_act_lvl_6": {
    "id": "hun_act_lvl_6",
    "name": "Стая Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "hun_act_lvl_7": {
    "id": "hun_act_lvl_7",
    "name": "Яд Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "hun_act_lvl_8": {
    "id": "hun_act_lvl_8",
    "name": "Клык Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "hun_act_lvl_9": {
    "id": "hun_act_lvl_9",
    "name": "Раздирание Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "hun_act_lvl_10": {
    "id": "hun_act_lvl_10",
    "name": "Охота Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "hun_pas_lvl_1": {
    "id": "hun_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 18,
      "duration": 999
    }
  },
  "hun_pas_lvl_2": {
    "id": "hun_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 11,
      "duration": 999
    }
  },
  "hun_pas_lvl_3": {
    "id": "hun_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает атака на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 19,
      "duration": 999
    }
  },
  "hun_pas_lvl_4": {
    "id": "hun_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 19,
      "duration": 999
    }
  },
  "hun_pas_lvl_5": {
    "id": "hun_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "hun_pas_lvl_6": {
    "id": "hun_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает атака на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 11,
      "duration": 999
    }
  },
  "hun_pas_lvl_7": {
    "id": "hun_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "hun_pas_lvl_8": {
    "id": "hun_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает максимальная мана на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 17,
      "duration": 999
    }
  },
  "hun_pas_lvl_9": {
    "id": "hun_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "hun_pas_lvl_10": {
    "id": "hun_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает атака на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 18,
      "duration": 999
    }
  },
  "eng_act_lvl_1": {
    "id": "eng_act_lvl_1",
    "name": "Турель Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "eng_act_lvl_2": {
    "id": "eng_act_lvl_2",
    "name": "Мина Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "eng_act_lvl_3": {
    "id": "eng_act_lvl_3",
    "name": "Гранаты Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "eng_act_lvl_4": {
    "id": "eng_act_lvl_4",
    "name": "Разряд Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "eng_act_lvl_5": {
    "id": "eng_act_lvl_5",
    "name": "Шилд Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "eng_act_lvl_6": {
    "id": "eng_act_lvl_6",
    "name": "Дрон Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "eng_act_lvl_7": {
    "id": "eng_act_lvl_7",
    "name": "Луч Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "eng_act_lvl_8": {
    "id": "eng_act_lvl_8",
    "name": "Лазер Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "eng_act_lvl_9": {
    "id": "eng_act_lvl_9",
    "name": "Гайка Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "eng_act_lvl_10": {
    "id": "eng_act_lvl_10",
    "name": "Базука Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "eng_pas_lvl_1": {
    "id": "eng_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "eng_pas_lvl_2": {
    "id": "eng_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 13,
      "duration": 999
    }
  },
  "eng_pas_lvl_3": {
    "id": "eng_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает защита на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 14,
      "duration": 999
    }
  },
  "eng_pas_lvl_4": {
    "id": "eng_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 10%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 10,
      "duration": 999
    }
  },
  "eng_pas_lvl_5": {
    "id": "eng_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает максимальное здоровье на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 13,
      "duration": 999
    }
  },
  "eng_pas_lvl_6": {
    "id": "eng_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальное здоровье на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 16,
      "duration": 999
    }
  },
  "eng_pas_lvl_7": {
    "id": "eng_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 16,
      "duration": 999
    }
  },
  "eng_pas_lvl_8": {
    "id": "eng_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 17,
      "duration": 999
    }
  },
  "eng_pas_lvl_9": {
    "id": "eng_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 18%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 18,
      "duration": 999
    }
  },
  "eng_pas_lvl_10": {
    "id": "eng_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "bm_act_lvl_1": {
    "id": "bm_act_lvl_1",
    "name": "Донор Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "magical"
  },
  "bm_act_lvl_2": {
    "id": "bm_act_lvl_2",
    "name": "Взрыв крови Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "magical"
  },
  "bm_act_lvl_3": {
    "id": "bm_act_lvl_3",
    "name": "Укус Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bm_act_lvl_4": {
    "id": "bm_act_lvl_4",
    "name": "Сфера крови Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "magical"
  },
  "bm_act_lvl_5": {
    "id": "bm_act_lvl_5",
    "name": "Пиявка Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "magical"
  },
  "bm_act_lvl_6": {
    "id": "bm_act_lvl_6",
    "name": "Жертва Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bm_act_lvl_7": {
    "id": "bm_act_lvl_7",
    "name": "Кровавый щит Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "magical"
  },
  "bm_act_lvl_8": {
    "id": "bm_act_lvl_8",
    "name": "Поток Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "magical"
  },
  "bm_act_lvl_9": {
    "id": "bm_act_lvl_9",
    "name": "Стигмата Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "magical",
    "buff": {
      "stat": "magicAttack",
      "valPct": 20,
      "duration": 3
    }
  },
  "bm_act_lvl_10": {
    "id": "bm_act_lvl_10",
    "name": "Алая луна Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "magical"
  },
  "bm_pas_lvl_1": {
    "id": "bm_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает максимальная мана на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 16,
      "duration": 999
    }
  },
  "bm_pas_lvl_2": {
    "id": "bm_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает защита на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 14,
      "duration": 999
    }
  },
  "bm_pas_lvl_3": {
    "id": "bm_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "bm_pas_lvl_4": {
    "id": "bm_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 12,
      "duration": 999
    }
  },
  "bm_pas_lvl_5": {
    "id": "bm_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 19,
      "duration": 999
    }
  },
  "bm_pas_lvl_6": {
    "id": "bm_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает максимальное здоровье на 11%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxHp",
      "valPct": 11,
      "duration": 999
    }
  },
  "bm_pas_lvl_7": {
    "id": "bm_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 12,
      "duration": 999
    }
  },
  "bm_pas_lvl_8": {
    "id": "bm_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "bm_pas_lvl_9": {
    "id": "bm_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 17%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 17,
      "duration": 999
    }
  },
  "bm_pas_lvl_10": {
    "id": "bm_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает маневренность (уворот в бою) на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "combatDodge",
      "valPct": 15,
      "duration": 999
    }
  },
  "fig_act_lvl_1": {
    "id": "fig_act_lvl_1",
    "name": "Хук Мощный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 115,
    "mpCost": 13,
    "cooldown": 2,
    "damageType": "physical"
  },
  "fig_act_lvl_2": {
    "id": "fig_act_lvl_2",
    "name": "Апперкот Стремительный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 130,
    "mpCost": 16,
    "cooldown": 1,
    "damageType": "physical"
  },
  "fig_act_lvl_3": {
    "id": "fig_act_lvl_3",
    "name": "Джеб Смертельный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 145,
    "mpCost": 19,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "fig_act_lvl_4": {
    "id": "fig_act_lvl_4",
    "name": "Комбо Ловкий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 160,
    "mpCost": 22,
    "cooldown": 1,
    "damageType": "physical"
  },
  "fig_act_lvl_5": {
    "id": "fig_act_lvl_5",
    "name": "Блок Хитрый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 175,
    "mpCost": 25,
    "cooldown": 2,
    "damageType": "physical"
  },
  "fig_act_lvl_6": {
    "id": "fig_act_lvl_6",
    "name": "Захват Яростный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 190,
    "mpCost": 28,
    "cooldown": 1,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "fig_act_lvl_7": {
    "id": "fig_act_lvl_7",
    "name": "Бросок Дикий",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 205,
    "mpCost": 31,
    "cooldown": 2,
    "damageType": "physical"
  },
  "fig_act_lvl_8": {
    "id": "fig_act_lvl_8",
    "name": "Уклон Грубый",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 220,
    "mpCost": 34,
    "cooldown": 1,
    "damageType": "physical"
  },
  "fig_act_lvl_9": {
    "id": "fig_act_lvl_9",
    "name": "Нокаут Точный",
    "description": "Мощный классовый навык.",
    "type": "buff",
    "power": 235,
    "mpCost": 37,
    "cooldown": 2,
    "damageType": "physical",
    "buff": {
      "stat": "attack",
      "valPct": 20,
      "duration": 3
    }
  },
  "fig_act_lvl_10": {
    "id": "fig_act_lvl_10",
    "name": "Пинок Коварный",
    "description": "Мощный классовый навык.",
    "type": "damage",
    "power": 250,
    "mpCost": 40,
    "cooldown": 1,
    "damageType": "physical"
  },
  "fig_pas_lvl_1": {
    "id": "fig_pas_lvl_1",
    "name": "Знание Стойкости",
    "description": "Пассивно увеличивает защита на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 19,
      "duration": 999
    }
  },
  "fig_pas_lvl_2": {
    "id": "fig_pas_lvl_2",
    "name": "Знание Мудрости",
    "description": "Пассивно увеличивает максимальная мана на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 15,
      "duration": 999
    }
  },
  "fig_pas_lvl_3": {
    "id": "fig_pas_lvl_3",
    "name": "Знание Силы",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 14%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 14,
      "duration": 999
    }
  },
  "fig_pas_lvl_4": {
    "id": "fig_pas_lvl_4",
    "name": "Знание Защиты",
    "description": "Пассивно увеличивает максимальная мана на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "maxMp",
      "valPct": 13,
      "duration": 999
    }
  },
  "fig_pas_lvl_5": {
    "id": "fig_pas_lvl_5",
    "name": "Знание Ловкости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 16,
      "duration": 999
    }
  },
  "fig_pas_lvl_6": {
    "id": "fig_pas_lvl_6",
    "name": "Знание Мастерства",
    "description": "Пассивно увеличивает защита на 16%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "defense",
      "valPct": 16,
      "duration": 999
    }
  },
  "fig_pas_lvl_7": {
    "id": "fig_pas_lvl_7",
    "name": "Знание Жестокости",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 15%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 15,
      "duration": 999
    }
  },
  "fig_pas_lvl_8": {
    "id": "fig_pas_lvl_8",
    "name": "Знание Могущества",
    "description": "Пассивно увеличивает дополнительный урон всех атак на 12%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "bonusDmgPct",
      "valPct": 12,
      "duration": 999
    }
  },
  "fig_pas_lvl_9": {
    "id": "fig_pas_lvl_9",
    "name": "Знание Равновесия",
    "description": "Пассивно увеличивает атака на 19%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "attack",
      "valPct": 19,
      "duration": 999
    }
  },
  "fig_pas_lvl_10": {
    "id": "fig_pas_lvl_10",
    "name": "Знание Воли",
    "description": "Пассивно увеличивает шанс уклонения от ловушек на 13%.",
    "isPassive": true,
    "type": "passive",
    "power": 0,
    "buff": {
      "stat": "trapDodge",
      "valPct": 13,
      "duration": 999
    }
  }
};

export const CLASS_LEVEL_SKILLS: Record<string, string[]> = {
  "Воин": [
    "war_act_lvl_1",
    "war_act_lvl_2",
    "war_act_lvl_3",
    "war_act_lvl_4",
    "war_act_lvl_5",
    "war_act_lvl_6",
    "war_act_lvl_7",
    "war_act_lvl_8",
    "war_act_lvl_9",
    "war_act_lvl_10",
    "war_pas_lvl_1",
    "war_pas_lvl_2",
    "war_pas_lvl_3",
    "war_pas_lvl_4",
    "war_pas_lvl_5",
    "war_pas_lvl_6",
    "war_pas_lvl_7",
    "war_pas_lvl_8",
    "war_pas_lvl_9",
    "war_pas_lvl_10"
  ],
  "Маг": [
    "mag_act_lvl_1",
    "mag_act_lvl_2",
    "mag_act_lvl_3",
    "mag_act_lvl_4",
    "mag_act_lvl_5",
    "mag_act_lvl_6",
    "mag_act_lvl_7",
    "mag_act_lvl_8",
    "mag_act_lvl_9",
    "mag_act_lvl_10",
    "mag_pas_lvl_1",
    "mag_pas_lvl_2",
    "mag_pas_lvl_3",
    "mag_pas_lvl_4",
    "mag_pas_lvl_5",
    "mag_pas_lvl_6",
    "mag_pas_lvl_7",
    "mag_pas_lvl_8",
    "mag_pas_lvl_9",
    "mag_pas_lvl_10"
  ],
  "Разбойник": [
    "rog_act_lvl_1",
    "rog_act_lvl_2",
    "rog_act_lvl_3",
    "rog_act_lvl_4",
    "rog_act_lvl_5",
    "rog_act_lvl_6",
    "rog_act_lvl_7",
    "rog_act_lvl_8",
    "rog_act_lvl_9",
    "rog_act_lvl_10",
    "rog_pas_lvl_1",
    "rog_pas_lvl_2",
    "rog_pas_lvl_3",
    "rog_pas_lvl_4",
    "rog_pas_lvl_5",
    "rog_pas_lvl_6",
    "rog_pas_lvl_7",
    "rog_pas_lvl_8",
    "rog_pas_lvl_9",
    "rog_pas_lvl_10"
  ],
  "Лучник": [
    "arc_act_lvl_1",
    "arc_act_lvl_2",
    "arc_act_lvl_3",
    "arc_act_lvl_4",
    "arc_act_lvl_5",
    "arc_act_lvl_6",
    "arc_act_lvl_7",
    "arc_act_lvl_8",
    "arc_act_lvl_9",
    "arc_act_lvl_10",
    "arc_pas_lvl_1",
    "arc_pas_lvl_2",
    "arc_pas_lvl_3",
    "arc_pas_lvl_4",
    "arc_pas_lvl_5",
    "arc_pas_lvl_6",
    "arc_pas_lvl_7",
    "arc_pas_lvl_8",
    "arc_pas_lvl_9",
    "arc_pas_lvl_10"
  ],
  "Жрец": [
    "pri_act_lvl_1",
    "pri_act_lvl_2",
    "pri_act_lvl_3",
    "pri_act_lvl_4",
    "pri_act_lvl_5",
    "pri_act_lvl_6",
    "pri_act_lvl_7",
    "pri_act_lvl_8",
    "pri_act_lvl_9",
    "pri_act_lvl_10",
    "pri_pas_lvl_1",
    "pri_pas_lvl_2",
    "pri_pas_lvl_3",
    "pri_pas_lvl_4",
    "pri_pas_lvl_5",
    "pri_pas_lvl_6",
    "pri_pas_lvl_7",
    "pri_pas_lvl_8",
    "pri_pas_lvl_9",
    "pri_pas_lvl_10"
  ],
  "Паладин": [
    "pal_act_lvl_1",
    "pal_act_lvl_2",
    "pal_act_lvl_3",
    "pal_act_lvl_4",
    "pal_act_lvl_5",
    "pal_act_lvl_6",
    "pal_act_lvl_7",
    "pal_act_lvl_8",
    "pal_act_lvl_9",
    "pal_act_lvl_10",
    "pal_pas_lvl_1",
    "pal_pas_lvl_2",
    "pal_pas_lvl_3",
    "pal_pas_lvl_4",
    "pal_pas_lvl_5",
    "pal_pas_lvl_6",
    "pal_pas_lvl_7",
    "pal_pas_lvl_8",
    "pal_pas_lvl_9",
    "pal_pas_lvl_10"
  ],
  "Чернокнижник": [
    "wlo_act_lvl_1",
    "wlo_act_lvl_2",
    "wlo_act_lvl_3",
    "wlo_act_lvl_4",
    "wlo_act_lvl_5",
    "wlo_act_lvl_6",
    "wlo_act_lvl_7",
    "wlo_act_lvl_8",
    "wlo_act_lvl_9",
    "wlo_act_lvl_10",
    "wlo_pas_lvl_1",
    "wlo_pas_lvl_2",
    "wlo_pas_lvl_3",
    "wlo_pas_lvl_4",
    "wlo_pas_lvl_5",
    "wlo_pas_lvl_6",
    "wlo_pas_lvl_7",
    "wlo_pas_lvl_8",
    "wlo_pas_lvl_9",
    "wlo_pas_lvl_10"
  ],
  "Друид": [
    "dru_act_lvl_1",
    "dru_act_lvl_2",
    "dru_act_lvl_3",
    "dru_act_lvl_4",
    "dru_act_lvl_5",
    "dru_act_lvl_6",
    "dru_act_lvl_7",
    "dru_act_lvl_8",
    "dru_act_lvl_9",
    "dru_act_lvl_10",
    "dru_pas_lvl_1",
    "dru_pas_lvl_2",
    "dru_pas_lvl_3",
    "dru_pas_lvl_4",
    "dru_pas_lvl_5",
    "dru_pas_lvl_6",
    "dru_pas_lvl_7",
    "dru_pas_lvl_8",
    "dru_pas_lvl_9",
    "dru_pas_lvl_10"
  ],
  "Бард": [
    "bar_act_lvl_1",
    "bar_act_lvl_2",
    "bar_act_lvl_3",
    "bar_act_lvl_4",
    "bar_act_lvl_5",
    "bar_act_lvl_6",
    "bar_act_lvl_7",
    "bar_act_lvl_8",
    "bar_act_lvl_9",
    "bar_act_lvl_10",
    "bar_pas_lvl_1",
    "bar_pas_lvl_2",
    "bar_pas_lvl_3",
    "bar_pas_lvl_4",
    "bar_pas_lvl_5",
    "bar_pas_lvl_6",
    "bar_pas_lvl_7",
    "bar_pas_lvl_8",
    "bar_pas_lvl_9",
    "bar_pas_lvl_10"
  ],
  "Монах": [
    "mon_act_lvl_1",
    "mon_act_lvl_2",
    "mon_act_lvl_3",
    "mon_act_lvl_4",
    "mon_act_lvl_5",
    "mon_act_lvl_6",
    "mon_act_lvl_7",
    "mon_act_lvl_8",
    "mon_act_lvl_9",
    "mon_act_lvl_10",
    "mon_pas_lvl_1",
    "mon_pas_lvl_2",
    "mon_pas_lvl_3",
    "mon_pas_lvl_4",
    "mon_pas_lvl_5",
    "mon_pas_lvl_6",
    "mon_pas_lvl_7",
    "mon_pas_lvl_8",
    "mon_pas_lvl_9",
    "mon_pas_lvl_10"
  ],
  "Некромант": [
    "nec_act_lvl_1",
    "nec_act_lvl_2",
    "nec_act_lvl_3",
    "nec_act_lvl_4",
    "nec_act_lvl_5",
    "nec_act_lvl_6",
    "nec_act_lvl_7",
    "nec_act_lvl_8",
    "nec_act_lvl_9",
    "nec_act_lvl_10",
    "nec_pas_lvl_1",
    "nec_pas_lvl_2",
    "nec_pas_lvl_3",
    "nec_pas_lvl_4",
    "nec_pas_lvl_5",
    "nec_pas_lvl_6",
    "nec_pas_lvl_7",
    "nec_pas_lvl_8",
    "nec_pas_lvl_9",
    "nec_pas_lvl_10"
  ],
  "Ассасин": [
    "ass_act_lvl_1",
    "ass_act_lvl_2",
    "ass_act_lvl_3",
    "ass_act_lvl_4",
    "ass_act_lvl_5",
    "ass_act_lvl_6",
    "ass_act_lvl_7",
    "ass_act_lvl_8",
    "ass_act_lvl_9",
    "ass_act_lvl_10",
    "ass_pas_lvl_1",
    "ass_pas_lvl_2",
    "ass_pas_lvl_3",
    "ass_pas_lvl_4",
    "ass_pas_lvl_5",
    "ass_pas_lvl_6",
    "ass_pas_lvl_7",
    "ass_pas_lvl_8",
    "ass_pas_lvl_9",
    "ass_pas_lvl_10"
  ],
  "Берсерк": [
    "ber_act_lvl_1",
    "ber_act_lvl_2",
    "ber_act_lvl_3",
    "ber_act_lvl_4",
    "ber_act_lvl_5",
    "ber_act_lvl_6",
    "ber_act_lvl_7",
    "ber_act_lvl_8",
    "ber_act_lvl_9",
    "ber_act_lvl_10",
    "ber_pas_lvl_1",
    "ber_pas_lvl_2",
    "ber_pas_lvl_3",
    "ber_pas_lvl_4",
    "ber_pas_lvl_5",
    "ber_pas_lvl_6",
    "ber_pas_lvl_7",
    "ber_pas_lvl_8",
    "ber_pas_lvl_9",
    "ber_pas_lvl_10"
  ],
  "Шаман": [
    "sha_act_lvl_1",
    "sha_act_lvl_2",
    "sha_act_lvl_3",
    "sha_act_lvl_4",
    "sha_act_lvl_5",
    "sha_act_lvl_6",
    "sha_act_lvl_7",
    "sha_act_lvl_8",
    "sha_act_lvl_9",
    "sha_act_lvl_10",
    "sha_pas_lvl_1",
    "sha_pas_lvl_2",
    "sha_pas_lvl_3",
    "sha_pas_lvl_4",
    "sha_pas_lvl_5",
    "sha_pas_lvl_6",
    "sha_pas_lvl_7",
    "sha_pas_lvl_8",
    "sha_pas_lvl_9",
    "sha_pas_lvl_10"
  ],
  "Рыцарь Смерти": [
    "dk_act_lvl_1",
    "dk_act_lvl_2",
    "dk_act_lvl_3",
    "dk_act_lvl_4",
    "dk_act_lvl_5",
    "dk_act_lvl_6",
    "dk_act_lvl_7",
    "dk_act_lvl_8",
    "dk_act_lvl_9",
    "dk_act_lvl_10",
    "dk_pas_lvl_1",
    "dk_pas_lvl_2",
    "dk_pas_lvl_3",
    "dk_pas_lvl_4",
    "dk_pas_lvl_5",
    "dk_pas_lvl_6",
    "dk_pas_lvl_7",
    "dk_pas_lvl_8",
    "dk_pas_lvl_9",
    "dk_pas_lvl_10"
  ],
  "Иллюзионист": [
    "ill_act_lvl_1",
    "ill_act_lvl_2",
    "ill_act_lvl_3",
    "ill_act_lvl_4",
    "ill_act_lvl_5",
    "ill_act_lvl_6",
    "ill_act_lvl_7",
    "ill_act_lvl_8",
    "ill_act_lvl_9",
    "ill_act_lvl_10",
    "ill_pas_lvl_1",
    "ill_pas_lvl_2",
    "ill_pas_lvl_3",
    "ill_pas_lvl_4",
    "ill_pas_lvl_5",
    "ill_pas_lvl_6",
    "ill_pas_lvl_7",
    "ill_pas_lvl_8",
    "ill_pas_lvl_9",
    "ill_pas_lvl_10"
  ],
  "Алхимик": [
    "alc_act_lvl_1",
    "alc_act_lvl_2",
    "alc_act_lvl_3",
    "alc_act_lvl_4",
    "alc_act_lvl_5",
    "alc_act_lvl_6",
    "alc_act_lvl_7",
    "alc_act_lvl_8",
    "alc_act_lvl_9",
    "alc_act_lvl_10",
    "alc_pas_lvl_1",
    "alc_pas_lvl_2",
    "alc_pas_lvl_3",
    "alc_pas_lvl_4",
    "alc_pas_lvl_5",
    "alc_pas_lvl_6",
    "alc_pas_lvl_7",
    "alc_pas_lvl_8",
    "alc_pas_lvl_9",
    "alc_pas_lvl_10"
  ],
  "Охотник": [
    "hun_act_lvl_1",
    "hun_act_lvl_2",
    "hun_act_lvl_3",
    "hun_act_lvl_4",
    "hun_act_lvl_5",
    "hun_act_lvl_6",
    "hun_act_lvl_7",
    "hun_act_lvl_8",
    "hun_act_lvl_9",
    "hun_act_lvl_10",
    "hun_pas_lvl_1",
    "hun_pas_lvl_2",
    "hun_pas_lvl_3",
    "hun_pas_lvl_4",
    "hun_pas_lvl_5",
    "hun_pas_lvl_6",
    "hun_pas_lvl_7",
    "hun_pas_lvl_8",
    "hun_pas_lvl_9",
    "hun_pas_lvl_10"
  ],
  "Инженер": [
    "eng_act_lvl_1",
    "eng_act_lvl_2",
    "eng_act_lvl_3",
    "eng_act_lvl_4",
    "eng_act_lvl_5",
    "eng_act_lvl_6",
    "eng_act_lvl_7",
    "eng_act_lvl_8",
    "eng_act_lvl_9",
    "eng_act_lvl_10",
    "eng_pas_lvl_1",
    "eng_pas_lvl_2",
    "eng_pas_lvl_3",
    "eng_pas_lvl_4",
    "eng_pas_lvl_5",
    "eng_pas_lvl_6",
    "eng_pas_lvl_7",
    "eng_pas_lvl_8",
    "eng_pas_lvl_9",
    "eng_pas_lvl_10"
  ],
  "Маг Крови": [
    "bm_act_lvl_1",
    "bm_act_lvl_2",
    "bm_act_lvl_3",
    "bm_act_lvl_4",
    "bm_act_lvl_5",
    "bm_act_lvl_6",
    "bm_act_lvl_7",
    "bm_act_lvl_8",
    "bm_act_lvl_9",
    "bm_act_lvl_10",
    "bm_pas_lvl_1",
    "bm_pas_lvl_2",
    "bm_pas_lvl_3",
    "bm_pas_lvl_4",
    "bm_pas_lvl_5",
    "bm_pas_lvl_6",
    "bm_pas_lvl_7",
    "bm_pas_lvl_8",
    "bm_pas_lvl_9",
    "bm_pas_lvl_10"
  ],
  "Боец": [
    "fig_act_lvl_1",
    "fig_act_lvl_2",
    "fig_act_lvl_3",
    "fig_act_lvl_4",
    "fig_act_lvl_5",
    "fig_act_lvl_6",
    "fig_act_lvl_7",
    "fig_act_lvl_8",
    "fig_act_lvl_9",
    "fig_act_lvl_10",
    "fig_pas_lvl_1",
    "fig_pas_lvl_2",
    "fig_pas_lvl_3",
    "fig_pas_lvl_4",
    "fig_pas_lvl_5",
    "fig_pas_lvl_6",
    "fig_pas_lvl_7",
    "fig_pas_lvl_8",
    "fig_pas_lvl_9",
    "fig_pas_lvl_10"
  ]
};
