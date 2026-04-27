import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('./skills.ts', 'utf8');

const regex = /"([^"]+)":\s*\[\s*"([^"]+)",\s*("[^"]+"),\s*("[^"]+"),\s*("[^"]+"),\s*"([^"]+_pass(?:_1)?)"\s*\]/g;
let newPassives = "";

let match;
while ((match = regex.exec(content)) !== null) {
    const className = match[1];
    const passSkillName = match[6];
    
    // Generate a new passive name
    const newPassName = passSkillName.replace(/_1$/, '') + (passSkillName.endsWith('_1') ? '_2' : '_2');
    
    if (className !== "Маг Крови") { // Маг Крови already has 2 passives
        newPassives += `
  "${newPassName}": {
    "id": "${newPassName}",
    "name": "Синхронизация духа (${className})",
    "description": "Пассивно увеличивает максимальное здоровье на 15%.",
    "manaCost": 0,
    "cooldown": 0,
    "multiplier": 0,
    "isPassive": true,
    "buff": { "stat": "maxHp", "valPct": 15, "duration": 999 }
  },`;
    }
}

// Now replace in CLASS_STARTING_SKILLS
content = content.replace(/"([^"]+)":\s*\[\n\s*"([^"]+)",\n\s*"([^"]+)",\n\s*"([^"]+)",\n\s*"([^"]+)",\n\s*"([^"]+_pass(?:\_1)?)"\n\s*\]/g, (match, className, s1, s2, s3, s4, s5) => {
    if (className === "Маг Крови") return match;
    const newPassName = s5.replace(/_1$/, '') + (s5.endsWith('_1') ? '_2' : '_2');
    // The user wants 1 active and 2 passives. We'll give 3 actives and 2 passives, and select 1 active / 2 passives in character creation.
    return `"${className}": [\n    "${s1}",\n    "${s2}",\n    "${s3}",\n    "${s4}",\n    "${s5}",\n    "${newPassName}"\n  ]`;
});

content = content.replace("export const SKILL_CATALOG: Record<string, Skill> = {", "export const SKILL_CATALOG: Record<string, Skill> = {" + newPassives);

writeFileSync('./skills.ts', content, 'utf8');
console.log('Added passives');
