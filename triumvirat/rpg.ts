import { Item, ITEM_CATALOG, ItemType, getItem, parseItemId } from './items.js';
import { SKILL_CATALOG } from './skills.js';

export interface ActiveStatus {
  id: string; 
  type: 'dot' | 'hot' | 'stun' | 'silence' | 'blind' | 'buff' | 'debuff' | 'heal_reduction';
  name: string; 
  duration: number; 
  value?: number; 
  stat?: string; 
}

export type GuildRank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'SSSR+';

export interface CombatState {
  enemy: any;
  isDefending: boolean;
  type?: 'arena' | 'wild';
  turnCounter: number;
  playerCooldowns: Record<string, number>;
  playerShield: number;
  enemyShield: number;
  playerStatuses: ActiveStatus[];
  enemyStatuses: ActiveStatus[];
}

export interface CharacterRPGData {
  level: number;
  xp: number;
  baseStats: {
    hp: number;
    maxHp: number;
    mp?: number;
    maxMp?: number;
    attack: number;
    defense: number;
    magicAttack?: number;
    magicDefense?: number;
    agility: number;
  };
  inventory: { itemId: string; amount: number }[];
  equipment: {
    weapon?: string;
    armor?: string;
    helmet?: string;
    shield?: string;
    accessory?: string;
  };
  rank: string;
  guildRank?: GuildRank;
  completedQuestsCount?: number;
  equippedSkills?: { active: string[], passive: string[] };
  unlockedSkills?: string[];
  customSkills?: { id: string, name: string, description: string, isPassive: boolean, power?: number, mpCost?: number, type?: string, hitChance?: number, effectChance?: number, damageType?: 'physical' | 'magical' }[];
  combat?: CombatState;
  location: 'city' | 'forest';
  workStats: { count: number; lastWorkDate: string };
  deathState?: 'alive' | 'waiting_revive' | 'dead';
  deathEndTime?: number;
  prisonEndTime?: number;
  prisonEscapeAttempted?: boolean;
  locationDepth?: number;
  house?: string;
  foodBuff?: { type: string, multiplier: number, charges: number };
}

export const DEFAULT_RPG_DATA: CharacterRPGData = {
  level: 1,
  xp: 0,
  baseStats: { hp: 100, maxHp: 100, mp: 50, maxMp: 50, attack: 5, defense: 5, magicAttack: 5, magicDefense: 5, agility: 5 },
  inventory: [
    { itemId: 'hp_potion_1', amount: 3 }
  ],
  equipment: {},
  rank: 'Новичок',
  guildRank: 'D',
  completedQuestsCount: 0,
  equippedSkills: { active: [], passive: [] },
  unlockedSkills: [],
  customSkills: [],
  location: 'city',
  workStats: { count: 0, lastWorkDate: '' },
};

export function getXpRequired(level: number): number {
  return level * 2000; // 2000 XP for lvl 2, 4000 for lvl 3, etc.
}

export function addXp(rpg: CharacterRPGData, amount: number): boolean {
  if (typeof rpg.level !== 'number') rpg.level = 1;
  if (typeof rpg.xp !== 'number') rpg.xp = 0;
  
  rpg.xp += amount;
  let leveledUp = false;
  let req = getXpRequired(rpg.level);
  
  while (rpg.xp >= req) {
    rpg.xp -= req;
    rpg.level += 1;
    
    // Random stat distribution
    const points = 6;
    for (let i = 0; i < points; i++) {
      const statsKeys = ['maxHp', 'maxMp', 'attack', 'defense', 'magicAttack', 'magicDefense', 'agility'];
      const statKey = statsKeys[Math.floor(Math.random() * statsKeys.length)];
      
      if (statKey === 'maxHp') {
        rpg.baseStats.maxHp += 10;
      } else if (statKey === 'maxMp') {
        rpg.baseStats.maxMp = (rpg.baseStats.maxMp || 50) + 10;
      } else if (statKey === 'attack') {
        rpg.baseStats.attack += 1;
      } else if (statKey === 'defense') {
        rpg.baseStats.defense += 1;
      } else if (statKey === 'magicAttack') {
        rpg.baseStats.magicAttack = (rpg.baseStats.magicAttack || 5) + 1;
      } else if (statKey === 'magicDefense') {
        rpg.baseStats.magicDefense = (rpg.baseStats.magicDefense || 5) + 1;
      } else if (statKey === 'agility') {
        rpg.baseStats.agility += 1;
      }
    }
    const totalStats = calculateTotalStats(rpg);
    rpg.baseStats.hp = totalStats.maxHp;
    rpg.baseStats.mp = totalStats.maxMp;
    leveledUp = true;
    req = getXpRequired(rpg.level);
  }
  return leveledUp;
}

export function calculateTotalStats(rpg: CharacterRPGData) {
  if (!rpg.baseStats) {
      rpg.baseStats = {
          hp: 100, maxHp: 100,
          mp: 50, maxMp: 50,
          attack: 5, magicAttack: 5,
          defense: 5, magicDefense: 5,
          agility: 5
      }
  }

  const stats = {
    hp: rpg.baseStats.hp || 10,
    maxHp: rpg.baseStats.maxHp || 10,
    mp: rpg.baseStats.mp || 0,
    maxMp: rpg.baseStats.maxMp || 0,
    attack: rpg.baseStats.attack || 1,
    defense: rpg.baseStats.defense || 0,
    magicAttack: rpg.baseStats.magicAttack || 0,
    magicDefense: rpg.baseStats.magicDefense || 0,
    agility: rpg.baseStats.agility || 1,
    critRate: 5, 
    critDamage: 50, 
    resistPoison: 0,
    resistFire: 0,
    resistIce: 0,
    resistLightning: 0,
    resistDark: 0,
    resistHoly: 0
  };
  const setCounts: Record<string, number> = {};

  for (const slot of Object.values(rpg.equipment)) {
    if (slot) {
      const { baseId, enhance, gems } = parseItemId(slot);
      const itemDef = getItem(baseId);
      if (itemDef) {
        if (itemDef.stats) {
          stats.hp += itemDef.stats.hp || 0;
          stats.maxHp += (itemDef.stats.maxHp || itemDef.stats.hp || 0);
          stats.mp = (stats.mp || 0) + (itemDef.stats.mp || 0);
          stats.maxMp = (stats.maxMp || 0) + (itemDef.stats.maxMp || itemDef.stats.mp || 0);
          stats.attack += (itemDef.stats.attack || 0) + (itemDef.type === 'weapon' ? enhance * 2 : 0);
          stats.magicAttack = (stats.magicAttack || 0) + (itemDef.stats.magicAttack || 0) + (itemDef.type === 'weapon' ? enhance * 2 : 0);
          stats.defense += (itemDef.stats.defense || 0) + ((itemDef.type === 'armor' || itemDef.type === 'shield' || itemDef.type === 'helmet') ? enhance * 2 : 0);
          stats.magicDefense = (stats.magicDefense || 0) + ((itemDef.stats.magicDefense || 0)) + ((itemDef.type === 'armor' || itemDef.type === 'shield' || itemDef.type === 'helmet') ? enhance * 2 : 0);
          stats.agility += (itemDef.stats.agility || 0) + (itemDef.type === 'accessory' ? enhance : 0);
          stats.critRate += itemDef.stats.critRate || 0;
          stats.critDamage += itemDef.stats.critDamage || 0;
          stats.resistPoison += itemDef.stats.resistPoison || 0;
          stats.resistFire += itemDef.stats.resistFire || 0;
          stats.resistIce += itemDef.stats.resistIce || 0;
          stats.resistLightning += itemDef.stats.resistLightning || 0;
          stats.resistDark += itemDef.stats.resistDark || 0;
          stats.resistHoly += itemDef.stats.resistHoly || 0;
          
          if (itemDef.type === 'accessory') {
             stats.hp += enhance * 5;
             stats.maxHp += enhance * 5;
          }
          if (itemDef.setName) {
            setCounts[itemDef.setName] = (setCounts[itemDef.setName] || 0) + 1;
          }
        }
        
        // Add gem stats
        if (gems && gems.length > 0) {
          for (const gemId of gems) {
            const gem = getItem(gemId);
            if (gem && gem.stats) {
              stats.hp += gem.stats.hp || 0;
              stats.maxHp += (gem.stats.maxHp || gem.stats.hp || 0);
              stats.mp += gem.stats.mp || 0;
              stats.maxMp += (gem.stats.maxMp || gem.stats.mp || 0);
              stats.attack += gem.stats.attack || 0;
              stats.magicAttack += gem.stats.magicAttack || 0;
              stats.defense += gem.stats.defense || 0;
              stats.magicDefense += gem.stats.magicDefense || 0;
              stats.agility += gem.stats.agility || 0;
              stats.critRate += gem.stats.critRate || 0;
              stats.critDamage += gem.stats.critDamage || 0;
              stats.resistPoison += gem.stats.resistPoison || 0;
              stats.resistFire += gem.stats.resistFire || 0;
              stats.resistIce += gem.stats.resistIce || 0;
              stats.resistLightning += gem.stats.resistLightning || 0;
              stats.resistDark += gem.stats.resistDark || 0;
              stats.resistHoly += gem.stats.resistHoly || 0;
            }
          }
        }
      }
    }
  }

  // Apply set bonuses
  for (const [setName, count] of Object.entries(setCounts)) {
    if (count >= 2) {
      stats.maxHp += 50; // 2-piece bonus
      stats.hp += 50;
    }
    if (count >= 4) {
      stats.attack += 20; // 4-piece bonus
      stats.defense += 20;
    }
  }
  
  if (rpg.equippedSkills && rpg.equippedSkills.passive) {
    let hpMultiplier = 1;
    let attackMultiplier = 1;
    let defenseMultiplier = 1;
    let agilityMultiplier = 1;

    for (const skillId of rpg.equippedSkills.passive) {
      const customSkill = rpg.customSkills?.find(s => s.id === skillId);
      const skill = customSkill || SKILL_CATALOG[skillId];
      
      if (skill && skill.isPassive) {
        // Passives give percentage increases to all stats based on power
        const multiplier = 1 + ((skill.power || 10) / 100);
        hpMultiplier += (multiplier - 1);
        attackMultiplier += (multiplier - 1);
        defenseMultiplier += (multiplier - 1);
        agilityMultiplier += (multiplier - 1);

        // Special logic for Ихор Безумия
        if (skillId === 'blood_mage_pass_1') {
           const currentHp = rpg.baseStats.hp || 1;
           const maxHp = rpg.baseStats.maxHp || 1;
           const lostHpPct = 100 - (currentHp / maxHp) * 100;
           if (lostHpPct > 0 && isFinite(lostHpPct)) {
              const stacks = Math.floor(lostHpPct / 5);
              attackMultiplier += stacks * 0.02; // +2% per 5% lost HP
           }
        }
      }
    }
    
    stats.maxHp = Math.floor(stats.maxHp * hpMultiplier);
    stats.hp = Math.min(stats.maxHp, Math.floor(stats.hp * hpMultiplier));
    stats.attack = Math.floor(stats.attack * attackMultiplier);
    stats.defense = Math.floor(stats.defense * defenseMultiplier);
    stats.agility = Math.floor(stats.agility * agilityMultiplier);
  }

  // Apply food buff
  if (rpg.foodBuff && rpg.foodBuff.charges > 0) {
    const fm = rpg.foodBuff.multiplier;
    stats.maxHp = Math.floor(stats.maxHp * fm);
    // Don't adjust current hp down, but optionally cap it
    stats.attack = Math.floor(stats.attack * fm);
    stats.defense = Math.floor(stats.defense * fm);
    stats.agility = Math.floor(stats.agility * fm);
    stats.magicAttack = Math.floor((stats.magicAttack || 0) * fm);
    stats.magicDefense = Math.floor((stats.magicDefense || 0) * fm);
  }
  
  return stats;
}

export function equipItem(rpg: CharacterRPGData, itemId: string, characterClass?: string): { success: boolean; message: string } {
  const invItem = rpg.inventory.find(i => i.itemId === itemId);
  if (!invItem || invItem.amount <= 0) {
    return { success: false, message: 'У вас нет этого предмета.' };
  }
  const item = getItem(itemId);
  if (!item) return { success: false, message: 'Предмет не найден в базе.' };
  
  if (item.level && item.level > (rpg.level || 1) + 50) {
    return { success: false, message: `Предмет слишком высокого уровня (макс. уровень предмета для вас: ${(rpg.level || 1) + 50}).` };
  }
  
  if (item.type === 'consumable' || item.type === 'material') {
    return { success: false, message: 'Этот предмет нельзя надеть.' };
  }

  if (item.allowedClasses && item.allowedClasses.length > 0 && characterClass) {
    if (!item.allowedClasses.includes(characterClass)) {
      return { success: false, message: `Этот предмет не подходит для вашего класса: ${characterClass}. Одно из: ${item.allowedClasses.join(', ')}.` };
    }
  }

  // If already equipped something in that slot, unequip it first (move to inventory)
  const currentEquipped = rpg.equipment[item.type as keyof typeof rpg.equipment];
  if (currentEquipped) {
    const existing = rpg.inventory.find(i => i.itemId === currentEquipped);
    if (existing) existing.amount += 1;
    else rpg.inventory.push({ itemId: currentEquipped, amount: 1 });
  }

  // Remove 1 from inventory
  invItem.amount -= 1;
  if (invItem.amount <= 0) {
    rpg.inventory = rpg.inventory.filter(i => i.itemId !== itemId);
  }

  // Equip
  rpg.equipment[item.type as keyof typeof rpg.equipment] = itemId;

  return { success: true, message: `Вы надели ${item.name}.` };
}

export function unequipItem(rpg: CharacterRPGData, slotOrName: string): { success: boolean; message: string } {
  // Find slot by name or slot type
  let slotToUnequip: keyof CharacterRPGData['equipment'] | undefined;
  
  const slotMap: Record<string, keyof CharacterRPGData['equipment']> = {
    'оружие': 'weapon', 'броня': 'armor', 'шлем': 'helmet', 'щит': 'shield', 'аксессуар': 'accessory',
    'weapon': 'weapon', 'armor': 'armor', 'helmet': 'helmet', 'shield': 'shield', 'accessory': 'accessory'
  };

  if (slotMap[slotOrName.toLowerCase()]) {
    slotToUnequip = slotMap[slotOrName.toLowerCase()];
  } else {
    // Try to find by item name
    for (const [slot, itemId] of Object.entries(rpg.equipment)) {
      if (itemId && getItem(itemId)?.name.toLowerCase() === slotOrName.toLowerCase()) {
        slotToUnequip = slot as keyof CharacterRPGData['equipment'];
        break;
      }
    }
  }

  if (!slotToUnequip) return { success: false, message: 'Слот или предмет не найден.' };

  const itemId = rpg.equipment[slotToUnequip];
  if (!itemId) return { success: false, message: 'В этом слоте ничего не надето.' };
  
  const item = getItem(itemId);
  
  // Add to inventory
  const existing = rpg.inventory.find(i => i.itemId === itemId);
  if (existing) existing.amount += 1;
  else rpg.inventory.push({ itemId, amount: 1 });

  // Remove from equipment
  delete rpg.equipment[slotToUnequip];

  return { success: true, message: `Вы сняли ${item?.name || itemId}.` };
}

export function useItem(rpg: CharacterRPGData, itemId: string): { success: boolean; message: string } {
  const invItem = rpg.inventory.find(i => i.itemId === itemId);
  if (!invItem || invItem.amount <= 0) {
    return { success: false, message: 'У вас нет этого предмета.' };
  }
  const item = getItem(itemId);
  if (!item) return { success: false, message: 'Предмет не найден в базе.' };

  if (item.type !== 'consumable') {
    return { success: false, message: 'Этот предмет нельзя использовать таким образом.' };
  }

  if (item.healAmount) {
    const totalStats = calculateTotalStats(rpg);
    if (rpg.baseStats.hp >= totalStats.maxHp) {
      return { success: false, message: 'У вас полное здоровье.' };
    }
    rpg.baseStats.hp = Math.min(totalStats.maxHp, rpg.baseStats.hp + item.healAmount);
  }

  // Consume
  invItem.amount -= 1;
  if (invItem.amount <= 0) {
    rpg.inventory = rpg.inventory.filter(i => i.itemId !== itemId);
  }

  return { success: true, message: `Вы использовали ${item.name}.` };
}

export function dropItem(rpg: CharacterRPGData, itemId: string): { success: boolean; message: string } {
  const invItem = rpg.inventory.find(i => i.itemId === itemId);
  if (!invItem || invItem.amount <= 0) {
    return { success: false, message: 'У вас нет этого предмета.' };
  }
  const item = getItem(itemId);
  
  invItem.amount -= 1;
  if (invItem.amount <= 0) {
    rpg.inventory = rpg.inventory.filter(i => i.itemId !== itemId);
  }

  return { success: true, message: `Вы выбросили ${item?.name || itemId}.` };
}
