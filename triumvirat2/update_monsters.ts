import * as fs from 'fs';

const updatedMonstersFile = `export interface Monster {
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
  rarity: 'common' | 'uncommon' | 'rare' | 'elite' | 'boss' | 'mythic' | 'legendary';
  loot: { itemId: string; chance: number }[];
  skills?: any[];
}

export const MONSTER_CATALOG: Record<string, Monster> = {
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
      { "itemId": "gem_dmg_1", "chance": 0.5 }
    ],
    "skills": ["w_dmg_2", "w_buff_1"]
  }
};
`;

fs.writeFileSync('monsters.ts', updatedMonstersFile, 'utf8');
