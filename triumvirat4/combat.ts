import { CharacterRPGData, calculateTotalStats, ActiveStatus } from './rpg.js';
import { SKILL_CATALOG } from './skills.js';
import { MONSTER_CATALOG } from './monsters.js';
import { WORLD_LOCATIONS } from './locations.js';

export interface Enemy {
  id: string;
  name: string;
  level?: number;
  type?: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  magicAttack?: number;
  magicDefense?: number;
  agility?: number;
  xpReward?: number;
  goldReward: number;
  loot?: { itemId: string; chance: number }[];
  skills?: string[];
}

export function generateEnemy(level: number, forceName?: string, locationId?: string, depthObj?: number): Enemy {
  const monsters = Object.values(MONSTER_CATALOG);
  let base: any = null;
  let allowedMonstersObj = monsters;

  if (locationId) {
    const matchingLocs = WORLD_LOCATIONS.filter((l: any) => l.id === locationId || l.name === locationId || l.type === locationId);
    let aggregatedMonsterIds: string[] = [];
    matchingLocs.forEach(loc => {
      if (loc.monsters) aggregatedMonsterIds.push(...loc.monsters);
    });
    if (aggregatedMonsterIds.length > 0) {
      allowedMonstersObj = monsters.filter(m => aggregatedMonsterIds.includes(m.id));
    }
    
    // Depth logic for whispering forest
    if (locationId === 'loc_forest_whispering' && depthObj) {
      if (depthObj === 1) {
        allowedMonstersObj = allowedMonstersObj.filter(m => m.level === 1 || m.level === 2);
      } else if (depthObj === 2) {
        allowedMonstersObj = allowedMonstersObj.filter(m => m.level === 3 || m.level === 4);
      } else if (depthObj >= 3) {
        allowedMonstersObj = allowedMonstersObj.filter(m => m.level === 5);
      }
    }
  }

  // Filter based on biome if applicable
  if (locationId === 'wasteland') allowedMonstersObj = monsters.filter(m => m.level >= 21);
  if (locationId === 'mountain') allowedMonstersObj = monsters.filter(m => m.level >= 51);

  if (forceName) {
    const searchName = forceName.toLowerCase().replace(/['"]/g, '').trim();
    // First try the local allowed monsters
    base = allowedMonstersObj.find(m => m.name.toLowerCase() === searchName);
    if (!base) {
      base = allowedMonstersObj.find(m => m.name.toLowerCase().includes(searchName) || searchName.includes(m.name.toLowerCase()));
    }
    // If not found, try ALL monsters so quest monsters can appear!
    if (!base) {
       base = monsters.find(m => m.name.toLowerCase() === searchName);
    }
    if (!base) {
       base = monsters.find(m => m.name.toLowerCase().includes(searchName) || searchName.includes(m.name.toLowerCase()));
    }
  }

  if (!base && allowedMonstersObj.length > 0) {
    // Pick randomly from allowed
    base = allowedMonstersObj[Math.floor(Math.random() * allowedMonstersObj.length)];
  }

  // Fallback if allowed is completely empty (shouldn't happen)
  if (!base) {
    base = monsters[Math.floor(Math.random() * monsters.length)];
  }
  
  const depth = depthObj || 1;
  const effectiveLevel = level + ((depth - 1) * 3); // Depth adds +3 levels effectively per depth
  // In mountain or wasteland we effectively have much stronger start
  const locationOffset = locationId === 'wasteland' ? 20 : (locationId === 'mountain' ? 50 : 0);
  
  const targetLevel = Math.max(base.level, effectiveLevel + locationOffset);

  const scale = 1.3 + Math.max(0, (targetLevel - base.level) * 0.20); // Buffed scaling significantly
  
  const baseHp = base.hp || 10;
  const baseAttack = base.attack || 5;
  const baseDef = base.defense || 2;
  const baseAgi = base.agility || 5;
  const baseMagAtk = (base as any).magicAttack || Math.floor(baseAttack * 0.8);
  const baseMagDef = (base as any).magicDefense || Math.floor(baseDef * 0.8);
  
  const dynamicLoot = [...(base.loot || [])];

  // Materials
  dynamicLoot.push({ itemId: 'mat_bone_1', chance: 0.30 });
  if (targetLevel >= 5) dynamicLoot.push({ itemId: 'mat_fang_1', chance: 0.20 });
  if (targetLevel < 20) dynamicLoot.push({ itemId: 'mat_pelt_1', chance: 0.25 });
  else if (targetLevel < 50) dynamicLoot.push({ itemId: 'mat_pelt_2', chance: 0.20 });
  else dynamicLoot.push({ itemId: 'mat_pelt_3', chance: 0.15 });

  // Crystals (Enhance Stones)
  let crystalChance = 0.10;
  if (base.rarity === 'uncommon') crystalChance += 0.05;
  if (base.rarity === 'rare') crystalChance += 0.10;
  if (base.rarity === 'boss' || base.rarity === 'elite') crystalChance += 0.20;

  if (targetLevel < 15) dynamicLoot.push({ itemId: 'enhance_stone_1', chance: crystalChance });
  else if (targetLevel < 35) dynamicLoot.push({ itemId: 'enhance_stone_2', chance: crystalChance });
  else if (targetLevel < 60) dynamicLoot.push({ itemId: 'enhance_stone_3', chance: crystalChance });
  else if (targetLevel < 90) dynamicLoot.push({ itemId: 'enhance_stone_4', chance: crystalChance });
  else dynamicLoot.push({ itemId: 'enhance_stone_5', chance: crystalChance });

  return {
    id: base.id,
    name: base.name,
    level: targetLevel,
    hp: Math.max(1, Math.floor(baseHp * scale)),
    maxHp: Math.max(1, Math.floor(baseHp * scale)),
    attack: Math.max(1, Math.floor(baseAttack * scale)),
    defense: Math.floor(baseDef * scale),
    magicAttack: Math.floor(baseMagAtk * scale),
    magicDefense: Math.floor(baseMagDef * scale),
    agility: Math.floor(baseAgi * scale),
    xpReward: Math.floor(base.level * 25 * scale),
    goldReward: Math.floor(base.level * 15 * scale),
    loot: dynamicLoot,
    skills: base.skills || []
  };
}

function processStatuses(statuses: ActiveStatus[], hpRef: { hp: number; maxHp: number }, log: { msg: string }, ownerName: string) {
  let canAct = true;
  for (let i = statuses.length - 1; i >= 0; i--) {
    const s = statuses[i];
    if (s.type === 'dot') {
      const dmg = s.value || Math.floor(hpRef.maxHp * 0.05);
      hpRef.hp -= dmg;
      log.msg += `🦠 ${ownerName} получает ${dmg} урона от эффекта "${s.name}".\n`;
    } else if (s.type === 'hot') {
      const heal = s.value || Math.floor(hpRef.maxHp * 0.05);
      hpRef.hp = Math.min(hpRef.maxHp, hpRef.hp + heal);
      log.msg += `✨ ${ownerName} восстанавливает ${heal} ХП от эффекта "${s.name}".\n`;
    } else if (s.type === 'stun') {
      log.msg += `💫 ${ownerName} оглушен и пропускает ход!\n`;
      canAct = false;
    }
    s.duration--;
    if (s.duration <= 0) {
      log.msg += `⏳ Эффект "${s.name}" спал с ${ownerName}.\n`;
      statuses.splice(i, 1);
    }
  }
  return canAct;
}

export const MAGIC_CLASSES = ["Маг", "Жрец", "Чернокнижник", "Друид", "Иллюзионист", "Маг Крови", "Некромант", "Алхимик", "Шаман", "Жрица", "Волшебник", "Пиромант", "Криомант", "Арканист"];

export function processCombatTurn(rpg: CharacterRPGData, action: 'attack' | 'defend' | 'flee' | 'skill', skillId?: string, charClass?: string) {
  if (!rpg.combat) return { log: 'Нет активного боя.', ended: true, won: false, fled: false, xp: 0, gold: 0, lootDrops: [] };
  
  // Initialize extended state if missing
  if (rpg.combat.turnCounter === undefined) rpg.combat.turnCounter = 1;
  if (!rpg.combat.playerCooldowns) rpg.combat.playerCooldowns = {};
  if (rpg.combat.playerShield === undefined) rpg.combat.playerShield = 0;
  if (rpg.combat.enemyShield === undefined) rpg.combat.enemyShield = 0;
  if (!rpg.combat.playerStatuses) rpg.combat.playerStatuses = [];
  if (!rpg.combat.enemyStatuses) rpg.combat.enemyStatuses = [];

  const combat = rpg.combat;
  const enemy = combat.enemy;
  const stats = calculateTotalStats(rpg);
  let log = `--- ХОД ${combat.turnCounter} ---\n`;
  let xp = 0, gold = 0;
  let lootDrops: string[] = [];

  // 1. Process Player Statuses
  combat.isDefending = false;
  let playerHpRef = { hp: rpg.baseStats.hp, maxHp: stats.maxHp };
  let playerCanAct = processStatuses(combat.playerStatuses, playerHpRef, { get msg() { return log; }, set msg(v) { log = v; } }, "Вы");
  rpg.baseStats.hp = playerHpRef.hp;

  if (rpg.baseStats.hp <= 0) return handleDeath(log, rpg);

  // 2. Player Action Action
  if (playerCanAct) {
    if (action === 'flee') {
      const fleeChance = 50 + (stats.agility - enemy.agility) * 5;
      if (Math.random() * 100 < fleeChance) {
        log += `🏃 Вы успешно сбежали от ${enemy.name}!\n`;
        const combatType = rpg.combat?.type || 'wild';
        rpg.combat = null;

        if (rpg.foodBuff && rpg.foodBuff.charges > 0) {
          rpg.foodBuff.charges--;
          if (rpg.foodBuff.charges <= 0) rpg.foodBuff = undefined;
        }

        return { log, ended: true, won: false, fled: true, xp: 0, gold: 0, lootDrops: [], combatType };
      } else {
        log += `🏃 Попытка побега провалилась!\n`;
      }
    } else if (action === 'defend') {
      combat.isDefending = true;
      log += `🛡️ Вы встали в глухую защиту.\n`;
    } else if (action === 'attack') {
      performAttack(stats, enemy, combat, { get msg() { return log; }, set msg(v) { log = v; } }, "Вы", enemy.name, true, rpg, charClass);
    } else if (action === 'skill' && skillId) {
      // Validate CD
      if (combat.playerCooldowns[skillId] > 0) {
        return { log: `⏳ Навык перезаряжается (осталось ${combat.playerCooldowns[skillId]} ход.)!`, ended: false, won: false, fled: false, xp: 0, gold: 0, lootDrops: [] };
      }
      const skill = SKILL_CATALOG[skillId] || rpg.customSkills?.find(s => s.id === skillId);
      if (skill) {
        if (skill.mpCost && (rpg.baseStats.mp || 0) < skill.mpCost) {
           return { log: `💧 Недостаточно маны!`, ended: false, won: false, fled: false, xp: 0, gold: 0, lootDrops: [] };
        }
        if ((skill as any).hpCostPct) {
          const hpCost = Math.floor(rpg.baseStats.hp * ((skill as any).hpCostPct / 100));
          rpg.baseStats.hp -= hpCost;
          log += `🩸 Вы жертвуете ${hpCost} ХП ради силы.\n`;
        }
        if (skill.mpCost) rpg.baseStats.mp -= skill.mpCost;
        if ((skill as any).cooldown) combat.playerCooldowns[skillId] = (skill as any).cooldown;

        const isSilenced = combat.playerStatuses.some(s => s.type === 'silence');
        if (skill.damageType === 'magical' && isSilenced) {
          log += `🔇 Вы под немотой и не можете читать заклинания!\n`;
        } else {
          performSkill(skill, stats, enemy, combat, { get msg() { return log; }, set msg(v) { log = v; } }, rpg, "Вы", enemy.name, true);
        }
      }
    }
  }

  if (enemy.hp <= 0) return handleVictory(enemy, log, rpg);

  // 3. Process Enemy Statuses
  let enemyHpRef = { hp: enemy.hp, maxHp: enemy.maxHp };
  let enemyCanAct = processStatuses(combat.enemyStatuses, enemyHpRef, { get msg() { return log; }, set msg(v) { log = v; } }, enemy.name);
  enemy.hp = enemyHpRef.hp;

  if (enemy.hp <= 0) return handleVictory(enemy, log, rpg);

// ...
  // 4. Enemy Action
  if (enemyCanAct) {
    let usedSkill = false;
    
    // Insult logic
    if (enemy.isNpc && Math.random() < 0.4) {
       const insults = [
          "Тебе здесь не выжить, слабак!",
          "Ты бьешь как сопливая девчонка!",
          "Сдавайся, и я дарую тебе быструю смерть!",
          "Отдай свои вещи по-хорошему, и я сохраню тебе жизнь... ха-ха!",
          "Это все, на что ты способен?",
          "Я сделаю из твоих костей ожерелье!"
       ];
       log += `\n🗣️ ${enemy.name}: "${insults[Math.floor(Math.random() * insults.length)]}"\n`;
    }

    if (enemy.skills && enemy.skills.length > 0 && Math.random() < 0.25) {
       const skillId = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
       const enemySkill = SKILL_CATALOG[skillId];
       if (enemySkill) {
          usedSkill = true;
          performSkill(enemySkill, enemy, stats, combat, { get msg() { return log; }, set msg(v) { log = v; } }, rpg, enemy.name, "Вас", false);
       }
    } else if (enemy.isNpc && !usedSkill && Math.random() < 0.3) {
       // Evil NPC fallback skills if they don't have them in their object
       const genericSkills = ['w_dmg_1', 'r_dmg_1', 'm_dmg_1', 'p_dmg_1'];
       const skillId = genericSkills[Math.floor(Math.random() * genericSkills.length)];
       const enemySkill = SKILL_CATALOG[skillId];
       if (enemySkill) {
          usedSkill = true;
          performSkill(enemySkill, enemy, stats, combat, { get msg() { return log; }, set msg(v) { log = v; } }, rpg, enemy.name, "Вас", false);
       }
    }
    
    if (!usedSkill) {
       performAttack(enemy, stats, combat, { get msg() { return log; }, set msg(v) { log = v; } }, enemy.name, "Вас", false, rpg);
    }
  } else {
    // Enemy didn't act
  }

  if (rpg.baseStats.hp <= 0) return handleDeath(log, rpg);

  // 5. End of Turn
  combat.turnCounter++;
  for (const k in combat.playerCooldowns) {
    if (combat.playerCooldowns[k] > 0) combat.playerCooldowns[k]--;
  }

  return { log, ended: false, won: false, fled: false, xp: 0, gold: 0, lootDrops: [] };
}

function handleVictory(enemy: any, log: string, rpg: any) {
  log += `\n💀 ${enemy.name} повержен!\n`;
  const diff = (enemy.level || 1) - rpg.level;
  let xp = 0;
  if (diff === 0) {
    xp = 200;
  } else if (diff > 0) {
    xp = 200 + diff * 100;
  } else {
    xp = Math.floor(200 / Math.pow(2, Math.abs(diff)));
  }
  
  if (enemy.isBoss) {
    xp *= 2;
  }

  const gold = enemy.goldReward || enemy.level * 5;
  const arenaTokens = enemy.arenaTokens || 0;
  const lootDrops: string[] = [];
  if (enemy.loot) {
    enemy.loot.forEach((l: any) => { if (Math.random() <= l.chance) lootDrops.push(l.itemId); });
  }
  const combatType = rpg.combat?.type || 'wild';
  rpg.combat = null;

  if (rpg.foodBuff && rpg.foodBuff.charges > 0) {
    rpg.foodBuff.charges--;
    if (rpg.foodBuff.charges === 0) {
       rpg.foodBuff = undefined;
       log += `\n(Эффект сытости прошел)\n`;
    }
  }

  return { log, ended: true, won: true, fled: false, xp, gold, arenaTokens, lootDrops, combatType, enemyId: enemy.id };
}

function handleDeath(log: string, rpg: any) {
  log += `\n☠️ Вы погибли в бою...\n`;
  rpg.baseStats.hp = 0; 
  rpg.deathState = 'waiting_revive';
  rpg.deathEndTime = Date.now() + 10 * 60000;
  const combatType = rpg.combat?.type || 'wild';
  rpg.combat = null;

  if (rpg.foodBuff && rpg.foodBuff.charges > 0) {
    rpg.foodBuff.charges--;
    if (rpg.foodBuff.charges <= 0) rpg.foodBuff = undefined;
  }

  return { log, ended: true, won: false, fled: false, xp: 0, gold: 0, lootDrops: [], combatType };
}

function dealDamageToTarget(rawDmg: number, defStat: number, isEnemyAttacking: boolean, combat: any, rpgOrStatsObj: any, logRef: any, targetName: string) {
  // Use a multiplicative formula instead of flat subtraction to prevent 1-damage spam
  const safeDef = Math.max(0, defStat || 0);
  const safeDmg = Math.max(0, rawDmg || 0);
  let dmg = Math.floor(safeDmg * (100 / (100 + safeDef)));
  dmg = Math.max(1, dmg); // Ensure at least 1 damage
  
  if (isEnemyAttacking) {
    // Player is target
    if (combat.playerShield > 0) {
      if (combat.playerShield >= dmg) {
        combat.playerShield -= dmg;
        logRef.msg += `🛡️ Ваш щит поглотил ${dmg} урона.\n`;
        return 0;
      } else {
        dmg -= combat.playerShield;
        logRef.msg += `🛡️ Ваш щит поглотил часть урона и разрушился.\n`;
        combat.playerShield = 0;
      }
    }
    // Update player HP directly! Note stats is a copy, we MUST update rpg
    rpgOrStatsObj.baseStats.hp -= dmg;
    logRef.msg += `🩸 Вы получаете ${dmg} урона.\n`;
  } else {
    // Enemy is target
    if (combat.enemyShield > 0) {
      if (combat.enemyShield >= dmg) {
        combat.enemyShield -= dmg;
        logRef.msg += `🛡️ Щит противника поглотил ${dmg} урона.\n`;
        return 0;
      } else {
         dmg -= combat.enemyShield;
         logRef.msg += `🛡️ Щит противника разрушен.\n`;
         combat.enemyShield = 0;
      }
    }
    combat.enemy.hp -= dmg;
    logRef.msg += `⚔️ ${targetName} получает ${dmg} урона.\n`;
  }
  return dmg;
}

function performAttack(attacker: any, defender: any, combat: any, logRef: any, attackerName: string, defenderName: string, isPlayer: boolean, rpg: any, charClass?: string) {
  const hitRoll = Math.floor(Math.random() * 100) + 1;
  if (hitRoll === 100) { // 1% critical miss
    logRef.msg += `💨 ${attackerName} совершает критический промах!\n`;
    return;
  }
  
  let blindMod = 0;
  if (isPlayer && combat.playerStatuses.some((s:any) => s.type === 'blind')) blindMod = 30;
  if (!isPlayer && combat.enemyStatuses.some((s:any) => s.type === 'blind')) blindMod = 30;

  let extraDodge = 0;
  if (!isPlayer && attacker.isBoss) {} // Boss doesn't have passives yet
  if (!isPlayer) {
     const pStats = calculateTotalStats(rpg);
     extraDodge = pStats.combatDodge || 0;
  }
  let hitChance = 85 + Math.floor(attacker.agility / 2) - Math.floor(defender.agility / 2) - blindMod - extraDodge;
  hitChance = Math.max(10, Math.min(100, hitChance));
  
  if (hitRoll <= hitChance) {
    const isMagicClass = isPlayer && charClass && MAGIC_CLASSES.includes(charClass);
    let def = isMagicClass ? (defender.magicDefense || defender.defense) : defender.defense;
    if (!isPlayer && combat.isDefending) def *= 2; 
    
    let baseAtk = isMagicClass ? (attacker.magicAttack || attacker.attack) : attacker.attack;
    let rawDmg = baseAtk + Math.floor(Math.random() * 4) + 1;
    if (hitRoll <= (attacker.critRate || 5)) {
      const critMult = attacker.critDamage ? attacker.critDamage / 100 : 1.5;
      rawDmg *= critMult;
      logRef.msg += `💥 КРИТИЧЕСКИЙ УДАР! `;
    }
    dealDamageToTarget(Math.floor(rawDmg), def, !isPlayer, combat, isPlayer ? combat.enemy : rpg, logRef, defenderName);
  } else {
    logRef.msg += `💨 ${attackerName} промахивается по ${defenderName}.\n`;
  }
}

function performSkill(skill: any, stats: any, enemy: any, combat: any, logRef: any, rpg: any, attackerName: string, defenderName: string, isPlayer: boolean) {
  const roll = Math.random() * 100;
  if (roll > (skill.hitChance || 100)) {
     logRef.msg += `💨 ${attackerName} применяет ${skill.name}, но промахивается!\n`;
     return;
  }

  let atkStat = skill.damageType === 'magical' ? (stats.magicAttack || 5) : stats.attack;
  let defStat = skill.damageType === 'magical' ? (enemy.magicDefense || enemy.defense) : enemy.defense;
  
  // Synergy logic
  let power = skill.power || 100;
  let vampPct = skill.vampirismPct || 0;
  let shieldPct = skill.shieldPct || 0;
  const targetStatuses = isPlayer ? combat.enemyStatuses : combat.playerStatuses;
  
  if (skill.synergy) {
    const targetHasStatus = targetStatuses.some((s:any) => s.type === skill.synergy.requiredStatus || s.id === skill.synergy.requiredStatus);
    if (targetHasStatus) {
      logRef.msg += `🔥 Синергия сработала! `;
      if (skill.synergy.bonusDmgPct) power += skill.synergy.bonusDmgPct;
      if (skill.synergy.bonusVampirismPct) vampPct += skill.synergy.bonusVampirismPct;
      if (skill.synergy.armorPenetrationPct) {
        defStat = Math.floor(defStat * (1 - skill.synergy.armorPenetrationPct / 100));
      }
    }
  }

  // Effect execution
  if (skill.type === 'damage' || !skill.type) {
    const rawDmg = Math.floor(atkStat * (power / 100));
    // For enemy, stats is the enemy, enemy is the player (stats). rpg is passed as rpg.
    // dealDamageToTarget expects: rawDmg, defStat, isEnemyAttacking, combat, rpgOrStatsObj target, logRef, targetName
    const actualDmg = dealDamageToTarget(rawDmg, defStat, !isPlayer, combat, isPlayer ? combat.enemy : rpg, logRef, defenderName);
    
    if (vampPct > 0 && actualDmg > 0) {
      const heal = Math.floor(actualDmg * (vampPct / 100));
      if (isPlayer) {
         rpg.baseStats.hp = Math.min(stats.maxHp, rpg.baseStats.hp + heal);
      } else {
         stats.hp = Math.min(stats.maxHp, stats.hp + heal);
      }
      logRef.msg += `🧛 Вампиризм: ${heal} ХП поглощено!\n`;
    }
  } else if (skill.type === 'heal') {
    let base = skill.damageType === 'magical' ? (stats.magicDefense || 5) : stats.defense;
    const heal = Math.floor(base * (power / 100));
    if (isPlayer) {
       rpg.baseStats.hp = Math.min(stats.maxHp, rpg.baseStats.hp + heal);
    } else {
       stats.hp = Math.min(stats.maxHp, stats.hp + heal);
    }
    logRef.msg += `✨ ${skill.name}: восстановлено ${heal} ХП.\n`;
  }
  
  if (shieldPct > 0) {
    const shieldAmt = Math.floor((isPlayer ? stats.maxHp : stats.maxHp) * (shieldPct / 100));
    if (isPlayer) {
      combat.playerShield += shieldAmt;
    } else {
      combat.enemyShield += shieldAmt;
    }
    logRef.msg += `🛡️ Наложен щит прочностью ${shieldAmt}.\n`;
  }

  // Apply DoT
  if (skill.dot) {
    const dotDmg = Math.floor(atkStat * (skill.dot.dmgPct / 100));
    targetStatuses.push({
      id: skill.dot.type, type: 'dot', name: skill.dot.type === 'bleed' ? 'Кровотечение' : (skill.dot.type === 'poison' ? 'Яд' : 'Горение'),
      duration: skill.dot.duration, value: Math.max(1, dotDmg)
    });
    logRef.msg += `🩸 Наложен эффект: ${skill.dot.type} на ${skill.dot.duration}х.\n`;
  }

  // Apply Statuses (CC)
  if (skill.statusEffect) {
    if (Math.random() * 100 <= skill.statusEffect.chance) {
      let nameStr = 'Оглушение';
      if (skill.statusEffect.type === 'silence') nameStr = 'Немота';
      if (skill.statusEffect.type === 'blind') nameStr = 'Ослепление';
      if (skill.statusEffect.type === 'heal_reduction') nameStr = 'Срез исцеления';
      if (skill.statusEffect.type === 'steal_turn') nameStr = 'Пропуск хода';
      
      targetStatuses.push({
        id: skill.statusEffect.type, type: skill.statusEffect.type as any, name: nameStr,
        duration: skill.statusEffect.duration
      });
      logRef.msg += `🌀 ${defenderName} получает эффект: ${nameStr}!\n`;
    }
  }
}

