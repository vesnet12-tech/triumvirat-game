import fs from 'fs';
import { ITEM_CATALOG, Item } from './items.js';
import { MONSTER_CATALOG, Monster } from './monsters.js';

let updatedItems: Record<string, Item> = {};

for (const [id, item] of Object.entries(ITEM_CATALOG)) {
  let newItem = { ...item };
  if (item.type !== 'consumable' && item.type !== 'material') {
    newItem.price = Math.floor(newItem.price * 2.5); // 2.5x prices
  }
  updatedItems[id] = newItem;
}

let outputItems = `export type ItemType = 'weapon' | 'armor' | 'helmet' | 'shield' | 'accessory' | 'consumable' | 'material';

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
}

export interface InventoryItem {
  itemId: string;
  amount: number;
  sockets?: string[]; 
}

export const ITEM_CATALOG: Record<string, Item> = ${JSON.stringify(updatedItems, null, 2)};
`;

fs.writeFileSync('items.ts', outputItems);

let updatedMonsters: Record<string, Monster> = {};

for (const [id, m] of Object.entries(MONSTER_CATALOG)) {
  let newM = { ...m };
  newM.attack = Math.floor(newM.attack * 1.8);
  if (newM.magicAttack) newM.magicAttack = Math.floor(newM.magicAttack * 1.8);
  updatedMonsters[id] = newM;
}

let outputMonsters = `export interface Monster {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  magicDefense?: number;
  magicAttack?: number;
  agility: number;
  xpReward: number;
  goldReward: number;
  rarity: 'common' | 'elite' | 'boss';
  loot: { itemId: string; chance: number }[];
}

export const MONSTER_CATALOG: Record<string, Monster> = ${JSON.stringify(updatedMonsters, null, 2)};
`;

fs.writeFileSync('monsters.ts', outputMonsters);
console.log('Prices and monster damage raised!');
