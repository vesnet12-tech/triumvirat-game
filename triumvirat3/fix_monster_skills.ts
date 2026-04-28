import fs from 'fs';
import { SKILL_CATALOG } from './skills.js';

let content = fs.readFileSync('monsters.ts', 'utf8');
const validSkills = Object.keys(SKILL_CATALOG);

const skillMap = {
  slime: ['m_dmg_1'],
  sprite: ['m_dmg_1', 'm_buff_1'],
  boar: ['w_dmg_1'],
  wolf: ['w_dmg_2'],
  spider: ['rg_dmg_1', 'rg_debuff'],     // Poison/bleeds
  bear: ['w_dmg_2', 'w_buff_1'],
  thief: ['rg_dmg_1', 'rg_dmg_2'],
  bandit: ['w_dmg_1', 'rg_dmg_1'],
  troll: ['w_dmg_2', 'w_buff_1'],
  orc: ['w_dmg_2', 'w_buff_2'],
  shaman: ['m_dmg_2', 'm_debuff_1', 'pri_debuff'],
  skeleton: ['w_dmg_1'],
  zombie: ['w_dmg_1', 'rg_debuff'],
  ghost: ['m_dmg_2', 'm_debuff_1'],
  vampire: ['m_dmg_3', 'dk_vamp_1', 'dk_debuff_1'],
  dragon: ['m_dmg_4', 'f_dmg_1', 'w_dmg_4'],
  golem: ['w_buff_2', 'w_dmg_3'],
  default: ['w_dmg_1']
};

function getSkillsForMonster(name) {
  const n = name.toLowerCase();
  let selected = skillMap.default;
  if (n.includes('слизь') || n.includes('slime')) selected = skillMap.slime;
  else if (n.includes('дух') || n.includes('призрак')) selected = skillMap.ghost;
  else if (n.includes('кабан') || n.includes('boar')) selected = skillMap.boar;
  else if (n.includes('волк') || n.includes('wolf')) selected = skillMap.wolf;
  else if (n.includes('паук') || n.includes('spider')) selected = skillMap.spider;
  else if (n.includes('медведь') || n.includes('bear')) selected = skillMap.bear;
  else if (n.includes('вор') || n.includes('thief')) selected = skillMap.thief;
  else if (n.includes('бандит') || n.includes('разбойник')) selected = skillMap.bandit;
  else if (n.includes('тролль') || n.includes('troll')) selected = skillMap.troll;
  else if (n.includes('орк')) selected = skillMap.orc;
  else if (n.includes('шаман') || n.includes('маг') || n.includes('культист')) selected = skillMap.shaman;
  else if (n.includes('скелет') || n.includes('skeleton')) selected = skillMap.skeleton;
  else if (n.includes('зомби') || n.includes('zombie') || n.includes('мертвец')) selected = skillMap.zombie;
  else if (n.includes('вампир') || n.includes('vampire')) selected = skillMap.vampire;
  else if (n.includes('дракон') || n.includes('dragon')) selected = skillMap.dragon;
  else if (n.includes('голем') || n.includes('golem')) selected = skillMap.golem;
  else if (n.includes('змей') || n.includes('snake')) selected = skillMap.spider;
  
  return selected.filter(s => validSkills.includes(s));
}

const lines = content.split('\n');
let currentName = '';
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"name":')) {
    currentName = line.split('"')[3];
  }
  
  if (line.includes('"skills":')) {
    const skills = getSkillsForMonster(currentName);
    if (skills.length === 0) Object.assign(skills, ['w_dmg_1']);
    newLines.push(`    "skills": ["${skills.join('", "')}"],`);
  } else {
    newLines.push(line);
  }
}

fs.writeFileSync('monsters.ts', newLines.join('\n'));
console.log('Fixed skills again!');
