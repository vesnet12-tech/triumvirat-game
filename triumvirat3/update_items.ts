import fs from 'fs';
import { ITEM_CATALOG, Item, ItemType, ItemStats } from './items.js';

function isMagicWeapon(name: string, classes: string[] = []) {
  const n = name.toLowerCase();
  const magClasses = ['маг', 'чернокнижник', 'жрец', 'иллюзионист', 'некромант', 'маг крови', 'алхимик', 'друид', 'бард'];
  if (n.includes('посох') || n.includes('жезл') || n.includes('книга') || n.includes('сфера') || n.includes('кристалл') || n.includes('мантия') || n.includes('маг') || n.includes('амулет') || n.includes('одеяние') || n.includes('духовн') || n.includes('заклинат') || n.includes('колдун') || n.includes('ведьм') || n.includes('колдовск')) return true;
  for (let cl of classes) {
     if (magClasses.includes(cl.toLowerCase())) return true;
  }
  return false;
}

const RARITY_MULTIPLIERS = {
  'common': 1,
  'uncommon': 2.5,
  'rare': 5,
  'epic': 10,
  'legendary': 25
};

const RARITY_PRICES = {
  'common': 150,
  'uncommon': 600,
  'rare': 2000,
  'epic': 7500,
  'legendary': 50000
};

const updatedCatalog: Record<string, Item> = {};

for (const [id, item] of Object.entries(ITEM_CATALOG)) {
  let newItem = { ...item };
  
  if (item.type === 'consumable' || item.type === 'material') {
    if (item.type === 'consumable') {
       newItem.price = RARITY_PRICES[item.rarity as keyof typeof RARITY_PRICES] / 5; // Cheaper consumables
    }
    updatedCatalog[id] = newItem;
    continue;
  }

  // Parse implicit level from item id if procedurally generated, or assume logic based on rarity
  let impliedLevel = 5;
  if (item.rarity === 'uncommon') impliedLevel = 15;
  if (item.rarity === 'rare') impliedLevel = 30;
  if (item.rarity === 'epic') impliedLevel = 50;
  if (item.rarity === 'legendary') impliedLevel = 80;

  // Base multiplier
  const mult = RARITY_MULTIPLIERS[item.rarity as keyof typeof RARITY_MULTIPLIERS];
  const stats: ItemStats = {};

  const isMagic = isMagicWeapon(item.name, item.allowedClasses || []);

  if (item.type === 'weapon') {
    if (isMagic) {
      stats.magicAttack = Math.floor(impliedLevel * mult * 0.8) + 5;
      stats.maxMp = Math.floor(impliedLevel * mult * 2) + 10;
    } else {
      stats.attack = Math.floor(impliedLevel * mult * 0.8) + 5;
    }
    
    // Add cool buffs for epic/legendary weapons
    if (item.rarity === 'epic') {
       stats.critRate = 10;
       stats.critDamage = 30;
       if (isMagic) {
           stats.magicAttack += 15;
           stats.maxMp += 30;
       } else {
           stats.attack += 15;
           stats.agility = 5;
       }
    }
    if (item.rarity === 'legendary') {
       stats.critRate = 20;
       stats.critDamage = 60;
       if (isMagic) {
           stats.magicAttack += 50;
           stats.maxMp += 100;
           stats.resistDark = 20;
           stats.resistHoly = 20;
       } else {
           stats.attack += 50;
           stats.agility = 15;
           stats.maxHp = 150;
       }
    }
  } else if (item.type === 'armor' || item.type === 'helmet' || item.type === 'shield') {
    stats.defense = Math.floor(impliedLevel * mult * 0.6) + 5;
    
    if (isMagic) {
      stats.magicDefense = Math.floor(impliedLevel * mult * 0.8) + 5;
      stats.maxMp = Math.floor(impliedLevel * mult * 1.5);
    } else {
      stats.magicDefense = Math.floor(impliedLevel * mult * 0.3);
      stats.maxHp = Math.floor(impliedLevel * mult * 1.5) + 10;
    }

    if (item.rarity === 'epic') {
       stats.defense += 20;
       stats.maxHp = (stats.maxHp || 0) + 50;
       stats.resistPoison = 20;
       stats.resistFire = 20;
    }
    if (item.rarity === 'legendary') {
       stats.defense += 60;
       stats.magicDefense += 30;
       stats.maxHp = (stats.maxHp || 0) + 200;
       stats.resistIce = 30;
       stats.resistLightning = 30;
       stats.resistFire = 30;
    }
  } else if (item.type === 'accessory') {
    stats.agility = Math.floor(impliedLevel * mult * 0.4);
    stats.maxHp = Math.floor(impliedLevel * mult * 2) + 20;
    if (isMagic) {
       stats.maxMp = Math.floor(impliedLevel * mult * 1.5) + 10;
       stats.magicAttack = Math.floor(impliedLevel * mult * 0.3) + 2;
    } else {
       stats.attack = Math.floor(impliedLevel * mult * 0.3);
    }

    if (item.rarity === 'epic') {
       stats.critRate = 8;
       stats.critDamage = 25;
       if (isMagic) stats.magicAttack = 15;
       else stats.attack = 15;
    }
    if (item.rarity === 'legendary') {
       stats.critRate = 15;
       stats.critDamage = 50;
       stats.agility += 20;
       if (isMagic) {
           stats.magicAttack = 40;
           stats.maxMp += 150;
       } else {
           stats.attack = 40;
           stats.maxHp += 300;
       }
    }
  }
  
  // Custom manual override for some basic weapons so they don't look completely generic, if they had stats before
  if (item.stats && id == 'wpn_1') stats.attack = 5;
  if (item.stats && id == 'wpn_2') stats.magicAttack = 5;
  
  newItem.stats = stats;
  // Increase price dramatically
  let targetPrice = RARITY_PRICES[item.rarity as keyof typeof RARITY_PRICES];
  // Add some randomness
  targetPrice = Math.floor(targetPrice * (0.8 + Math.random() * 0.4));
  newItem.price = targetPrice;

  updatedCatalog[id] = newItem;
}

// Re-write the file
let code = fs.readFileSync('items.ts', 'utf-8');
const regex = /export const ITEM_CATALOG:\s*Record<string,\s*Item>\s*=\s*{[\s\S]*?};/g;

const replacement = 'export const ITEM_CATALOG: Record<string, Item> = {\n' + 
  Object.entries(updatedCatalog).map(([k, v]) => `  '${k}': ${JSON.stringify(v)}`).join(',\n') + '\n};';

code = code.replace(regex, replacement);
fs.writeFileSync('items.ts', code);
console.log('Successfully updated items!');
