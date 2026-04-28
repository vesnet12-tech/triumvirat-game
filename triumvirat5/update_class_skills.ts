import fs from 'fs';
import { CLASSES, SKILL_CATALOG } from './skills.ts';

const prefixes: Record<string, string> = {
  "Воин": "warrior",
  "Маг": "mage",
  "Разбойник": "rogue",
  "Лучник": "archer",
  "Жрец": "cleric",
  "Паладин": "paladin",
  "Чернокнижник": "warlock",
  "Друид": "druid",
  "Бард": "bard",
  "Монах": "monk",
  "Некромант": "necromancer",
  "Ассасин": "assassin",
  "Берсерк": "berserker",
  "Шаман": "shaman",
  "Рыцарь Смерти": "death", // death_knight is typical but I saw 'death' prefix in output
  "Иллюзионист": "illusionist",
  "Алхимик": "alchemist",
  "Охотник": "hunter",
  "Инженер": "engineer",
  "Маг Крови": "blood",
  "Боец": "brawler"
};

const missingClasses: string[] = [];
const startingSkillsMap: Record<string, string[]> = {};

for (const cls of CLASSES) {
  const prefix = prefixes[cls] || 'unknown';
  let keys = Object.keys(SKILL_CATALOG).filter(k => k.startsWith(prefix));
  
  if (cls === 'Рыцарь Смерти') {
     keys = Object.keys(SKILL_CATALOG).filter(k => k.startsWith('death_knight'));
     if (keys.length === 0) keys = Object.keys(SKILL_CATALOG).filter(k => k.startsWith('death'));
  }
  if (cls === 'Маг Крови') {
     keys = Object.keys(SKILL_CATALOG).filter(k => k.startsWith('blood_mage') || k.startsWith('blood'));
  }

  if (keys.length > 0) {
    // Collect up to 1 damage, 1 buff, 1 passive
    const dmg = keys.find(k => SKILL_CATALOG[k].type === 'damage' && !SKILL_CATALOG[k].isPassive);
    const buff = keys.find(k => (SKILL_CATALOG[k].type === 'heal' || SKILL_CATALOG[k].type === 'buff') && !SKILL_CATALOG[k].isPassive);
    const pass = keys.find(k => SKILL_CATALOG[k].isPassive);
    const start = [];
    if (dmg) start.push(dmg);
    if (buff) start.push(buff);
    if (pass) start.push(pass);
    if (start.length === 0) {
       start.push(...keys.slice(0, 3));
    }
    startingSkillsMap[cls] = start;
  } else {
    missingClasses.push(cls);
    startingSkillsMap[cls] = [];
  }
}

console.log('Missing classes with NO skills:', missingClasses);
console.log('Starter map:', startingSkillsMap);
