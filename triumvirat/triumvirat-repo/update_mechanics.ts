import * as fs from 'fs';

let rpgText = fs.readFileSync('rpg.ts', 'utf8');
if (!rpgText.includes('combatDodge')) {
    // Add new stats to initial stats map
    const replace1 = `    resistDark: 0,
    resistHoly: 0`;
    const newStats = `    resistDark: 0,
    resistHoly: 0,
    trapDodge: 0,
    combatDodge: 0,
    bonusDmgPct: 0,
    healDmgPct: 0,
    reflectChance: 0,
    dropRate: 0`;
    rpgText = rpgText.replace(replace1, newStats);
    
    // Add logic to parse skill.buff if it's passive
    const replace2 = `if (skill && skill.isPassive) {`;
    const newLogic = `if (skill && skill.isPassive) {
        if (skill.buff) {
           if (skill.buff.stat === 'trapDodge') stats.trapDodge += skill.buff.valPct;
           if (skill.buff.stat === 'combatDodge') stats.combatDodge += skill.buff.valPct;
           if (skill.buff.stat === 'bonusDmgPct') stats.bonusDmgPct += skill.buff.valPct;
           if (skill.buff.stat === 'maxHp') hpMultiplier += skill.buff.valPct / 100;
           if (skill.buff.stat === 'maxMp') stats.maxMp = Math.floor(stats.maxMp * (1 + skill.buff.valPct / 100));
           if (skill.buff.stat === 'attack') attackMultiplier += skill.buff.valPct / 100;
           if (skill.buff.stat === 'defense') defenseMultiplier += skill.buff.valPct / 100;
        }`;
    rpgText = rpgText.replace(replace2, newLogic);
    
    fs.writeFileSync('rpg.ts', rpgText);
    console.log("Updated rpg.ts");
}

let expText = fs.readFileSync('exploration.ts', 'utf8');
if (!expText.includes('trapDodge')) {
    const r1 = `if (Math.random() < 0.5) {`;
    const r1New = `const stats = char.rpg.baseStats; // BaseStats actually doesn't have it, we need calculateTotalStats
       const rStats = require('./rpg.js').calculateTotalStats(char.rpg);
       const tDodge = rStats.trapDodge || 0;
       if (Math.random() * 100 < 50 + tDodge) {`;
    expText = expText.replace(r1, r1New);
    fs.writeFileSync('exploration.ts', expText);
    console.log("Updated exploration.ts");
}

let combatText = fs.readFileSync('combat.ts', 'utf8');
if (!combatText.includes('combatDodge')) {
    const hitC = `let hitChance = 85 + Math.floor(attacker.agility / 2) - Math.floor(defender.agility / 2) - blindMod;`;
    const hitCNew = `let extraDodge = 0;
  if (!isPlayer && attacker.isBoss) {} // Boss doesn't have passives yet
  if (!isPlayer) {
     const pStats = require('./rpg.js').calculateTotalStats(char.rpg);
     extraDodge = pStats.combatDodge || 0;
  }
  let hitChance = 85 + Math.floor(attacker.agility / 2) - Math.floor(defender.agility / 2) - blindMod - extraDodge;`;
    combatText = combatText.replace(hitC, hitCNew);

    const dmgC = `logRef.msg += \`💥 \${attackerName} наносит критический урон!\\n\`;
  }`;
    const dmgCNew = `logRef.msg += \`💥 \${attackerName} наносит критический урон!\\n\`;
  }
  if (isPlayer) {
     const pStats = require('./rpg.js').calculateTotalStats(char.rpg);
     if (pStats.bonusDmgPct) {
         damage = Math.floor(damage * (1 + pStats.bonusDmgPct / 100));
     }
  }`;
    combatText = combatText.replace(dmgC, dmgCNew);
    
    fs.writeFileSync('combat.ts', combatText);
    console.log("Updated combat.ts");
}
