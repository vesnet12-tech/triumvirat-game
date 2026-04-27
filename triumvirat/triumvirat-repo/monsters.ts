export interface Monster {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp?: number;
  attack: number;
  defense: number;
  magicDefense?: number;
  magicAttack?: number;
  agility: number;
  xpReward?: number;
  goldReward?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'elite' | 'boss' | 'mythic' | 'legendary';
  loot: { itemId: string; chance: number }[];
  skills?: any[];
}

export const MONSTER_CATALOG: Record<string, Monster> = {
  "mob_forest_slime": {
    "id": "mob_forest_slime",
    "name": "Лесная Слизь",
    "rarity": "common",
    "level": 1,
    "hp": 15,
    "attack": 2,
    "defense": 1,
    "agility": 1,
    "loot": [
        {
            "itemId": "hp_potion_1",
            "chance": 0.1
        }
    ]
},
  "mob_forest_sprite": {
    "id": "mob_forest_sprite",
    "name": "Озлобленный Дух Леса",
    "rarity": "uncommon",
    "level": 2,
    "hp": 25,
    "attack": 4,
    "defense": 2,
    "agility": 4,
    "loot": [
        {
            "itemId": "hp_potion_1",
            "chance": 0.2
        }
    ]
},
  "mob_forest_boar": {
    "id": "mob_forest_boar",
    "name": "Дикий Кабан",
    "rarity": "common",
    "level": 2,
    "hp": 30,
    "attack": 3,
    "defense": 3,
    "agility": 2,
    "loot": [
        {
            "itemId": "mat_bone_1",
            "chance": 0.5
        }
    ]
},
  "mob_forest_troll": {
    "id": "mob_forest_troll",
    "name": "Молодой Тролль",
    "rarity": "uncommon",
    "level": 4,
    "hp": 80,
    "attack": 8,
    "defense": 5,
    "agility": 2,
    "loot": [
        {
            "itemId": "enhance_stone_1",
            "chance": 0.3
        }
    ]
},
  "mob_forest_dryad": {
    "id": "mob_forest_dryad",
    "name": "Искаженная Дриада",
    "rarity": "rare",
    "level": 4,
    "hp": 60,
    "attack": 10,
    "defense": 3,
    "agility": 6,
    "loot": [
        {
            "itemId": "enhance_stone_1",
            "chance": 0.4
        }
    ]
},
  "mob_forest_ent_young": {
    "id": "mob_forest_ent_young",
    "name": "Пробудившийся Корень",
    "rarity": "common",
    "level": 3,
    "hp": 50,
    "attack": 5,
    "defense": 6,
    "agility": 1,
    "loot": [
        {
            "itemId": "enhance_stone_1",
            "chance": 0.1
        }
    ]
},
  "mob_forest_dire_wolf": {
    "id": "mob_forest_dire_wolf",
    "name": "Свирепый Волк",
    "rarity": "uncommon",
    "level": 5,
    "hp": 90,
    "attack": 12,
    "defense": 4,
    "agility": 8,
    "loot": [
        {
            "itemId": "enhance_stone_2",
            "chance": 0.1
        }
    ]
},
  "mob_forest_hobgoblin": {
    "id": "mob_forest_hobgoblin",
    "name": "Хобгоблин-Вояка",
    "rarity": "common",
    "level": 5,
    "hp": 100,
    "attack": 10,
    "defense": 8,
    "agility": 4,
    "loot": [
        {
            "itemId": "enhance_stone_1",
            "chance": 0.5
        }
    ]
},
  "mob_forest_corrupted_ent": {
    "id": "mob_forest_corrupted_ent",
    "name": "Оскверненный Энт",
    "rarity": "rare",
    "level": 5,
    "hp": 150,
    "attack": 14,
    "defense": 10,
    "agility": 2,
    "loot": [
        {
            "itemId": "enhance_stone_2",
            "chance": 0.3
        }
    ]
},
  "mob_forest_shadow": {
    "id": "mob_forest_shadow",
    "name": "Лесная Тень",
    "rarity": "epic",
    "level": 5,
    "hp": 80,
    "attack": 18,
    "defense": 2,
    "agility": 10,
    "loot": [
        {
            "itemId": "enhance_stone_2",
            "chance": 0.5
        }
    ]
},
  "mob_forest_grizzly": {
    "id": "mob_forest_grizzly",
    "name": "Огромный Гризли",
    "rarity": "uncommon",
    "level": 5,
    "hp": 130,
    "attack": 16,
    "defense": 6,
    "agility": 3,
    "loot": [
        {
            "itemId": "mat_pelt_2",
            "chance": 0.8
        }
    ]
},
  "mob_forest_bandit": {
    "id": "mob_forest_bandit",
    "name": "Разбойник-Одиночка",
    "rarity": "rare",
    "level": 5,
    "hp": 110,
    "attack": 15,
    "defense": 5,
    "agility": 7,
    "loot": [
        {
            "itemId": "hp_potion_2",
            "chance": 0.3
        }
    ]
},

  "mob_forest_wolf": {
    "id": "mob_forest_wolf",
    "name": "Дикий Волк",
    "rarity": "common",
    "level": 1,
    "hp": 40,
    "attack": 8,
    "defense": 3,
    "agility": 8,
    "loot": [
      { "itemId": "hp_potion_1", "chance": 0.3 }
    ]
  },
  "mob_forest_goblin": {
    "id": "mob_forest_goblin",
    "name": "Лесной Гоблин",
    "rarity": "uncommon",
    "level": 3,
    "hp": 65,
    "attack": 12,
    "defense": 5,
    "agility": 6,
    "loot": [
      { "itemId": "hp_potion_1", "chance": 0.4 }
    ],
    "skills": ["w_dmg_1"]
  },
  "mob_forest_spider": {
    "id": "mob_forest_spider",
    "name": "Ядовитый Паук",
    "rarity": "common",
    "level": 2,
    "hp": 45,
    "attack": 10,
    "defense": 4,
    "agility": 9,
    "loot": [
      { "itemId": "hp_potion_1", "chance": 0.2 }
    ]
  },
  "mob_forest_bear": {
    "id": "mob_forest_bear",
    "name": "Разъяренный Медведь",
    "rarity": "rare",
    "level": 5,
    "hp": 150,
    "attack": 20,
    "defense": 10,
    "agility": 5,
    "loot": [
      { "itemId": "hp_potion_1", "chance": 0.8 },
      { "itemId": "enhance_stone_1", "chance": 0.3 }
    ],
    "skills": ["w_dmg_2"]
  },
  "boss_forest_ent": {
    "id": "boss_forest_ent",
    "name": "Древний Энт (Владыка Леса)",
    "rarity": "boss",
    "level": 6,
    "hp": 400,
    "attack": 25,
    "defense": 20,
    "agility": 3,
    "loot": [
      { "itemId": "enhance_stone_2", "chance": 1.0 },
      { "itemId": "hp_potion_2", "chance": 1.0 },
      { "itemId": "gem_dmg_1", "chance": 0.5 },
      { "itemId": "boss_ent_helm", "chance": 0.2 },
      { "itemId": "boss_ent_armor", "chance": 0.1 },
      { "itemId": "boss_ent_acc", "chance": 0.1 },
      { "itemId": "boss_ent_acc_leg", "chance": 0.005 }
    ],
    "skills": ["w_dmg_2", "w_buff_1"]
  }
};
