import fs from 'fs';
import { SKILL_CATALOG, CLASSES } from './skills.js';

let starting = {};

for (const c of CLASSES) {
   // from gen_skills.ts:
   let abbrev = "";
   switch(c) {
      case "Воин": abbrev = "w_"; break;
      case "Маг": abbrev = "m_"; break;
      case "Маг Крови": abbrev = "bm_"; break;
      case "Разбойник": abbrev = "rg_"; break;
      case "Паладин": abbrev = "pal_"; break;
      case "Некромант": abbrev = "nec_"; break;
      case "Берсерк": abbrev = "ber_"; break;
      case "Жрец": abbrev = "pri_"; break;
      default: abbrev = c.substring(0, 3).toLowerCase() + "_"; break;
   }
   
   let skillsForClass = Object.keys(SKILL_CATALOG).filter(id => id.startsWith(abbrev));
   
   // It's possible some base skills were "pri_heal_1", etc.
   // Let's just group them!
   starting[c] = skillsForClass;
}

let content = fs.readFileSync('skills.ts', 'utf-8');
content = content.replace("export const CLASSES: string[] =", "export const CLASS_STARTING_SKILLS: Record<string, string[]> = " + JSON.stringify(starting, null, 2) + ";\n\nexport const CLASSES: string[] =");
fs.writeFileSync('skills.ts', content);
