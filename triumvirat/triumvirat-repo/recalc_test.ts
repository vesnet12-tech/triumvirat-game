const PERCENTAGE_STATS = ['critRate', 'critDamage', 'resistPoison', 'resistFire', 'resistIce', 'resistLightning', 'resistDark', 'resistHoly'];

function recalculateStats(type, rarity, level, originalStats) {
    const rarityMult = { 'common': 1, 'uncommon': 1.4, 'rare': 2.0, 'epic': 3.5, 'legendary': 6 };
    const mult = rarityMult[rarity] || 1;
    
    const budget = 5 + level * 6 * mult; 
    
    let sumLinear = 0;
    for(let k in originalStats) {
        if (!PERCENTAGE_STATS.includes(k)) sumLinear += originalStats[k];
    }
    
    const newStats = { ...originalStats };
    if (sumLinear > 0) {
        for (let k in originalStats) {
            if (!PERCENTAGE_STATS.includes(k)) {
                let proportion = originalStats[k] / sumLinear;
                let newVal = Math.floor(budget * proportion);
                if (newVal < 1) newVal = 1;
                newStats[k] = newVal;
            }
        }
    }
    return newStats;
}

const wpn_1 = { attack: 5 }; // common
const wpn_7 = { attack: 420, critRate: 10, critDamage: 30, agility: 5 }; // epic
const wpn_8 = { magicAttack: 1655, maxMp: 4110, critRate: 20, critDamage: 60, resistDark: 20, resistHoly: 20 }; // legendary

console.log("Wpn 1 (Level 1):", recalculateStats('weapon', 'common', 1, wpn_1));
console.log("Wpn 1 (Level 20):", recalculateStats('weapon', 'common', 20, wpn_1));

console.log("Wpn 7 Epic (Level 1):", recalculateStats('weapon', 'epic', 1, wpn_7));
console.log("Wpn 7 Epic (Level 20):", recalculateStats('weapon', 'epic', 20, wpn_7));

console.log("Wpn 8 Leg (Level 1):", recalculateStats('weapon', 'legendary', 1, wpn_8));
console.log("Wpn 8 Leg (Level 50):", recalculateStats('weapon', 'legendary', 50, wpn_8));
