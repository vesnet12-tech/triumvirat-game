import fs from 'fs';

let content = fs.readFileSync('monsters.ts', 'utf8');

// The logic is simple: string replace `    "agility":` with `    "skills": ["<skill>"],\n    "agility":` etc.
// But some monsters are specific.

const skillMap = {
  slime: ['m_dmg_1', 'p_dmg_1'],
  sprite: ['m_dmg_1'],
  boar: ['w_dmg_1'],
  wolf: ['w_dmg_2'],
  spider: ['p_dmg_1'],     // Poison
  bear: ['w_dmg_2', 'warrior_skill_1'],
  thief: ['r_dmg_1', 'rogue_skill_1'],
  bandit: ['w_dmg_1', 'warrior_skill_1'],
  troll: ['w_dmg_2', 'warrior_skill_2'],
  orc: ['w_dmg_2', 'warrior_skill_2'],
  shaman: ['m_dmg_2', 'mage_skill_1', 'p_dmg_1'],
  skeleton: ['w_dmg_1', 'warrior_skill_1'],
  zombie: ['p_dmg_1', 'w_dmg_1'],
  ghost: ['m_dmg_2', 'mage_skill_1'],
  vampire: ['m_dmg_3', 'vamp_skill_1', 'rogue_skill_3'],
  dragon: ['m_dmg_4', 'f_dmg_1', 'warrior_skill_3'],
  golem: ['warrior_skill_2', 'w_dmg_3'],
  default: ['w_dmg_1']
};

function getSkillsForMonster(name) {
  const n = name.toLowerCase();
  if (n.includes('слизь') || n.includes('slime')) return skillMap.slime;
  if (n.includes('дух') || n.includes('призрак')) return skillMap.ghost;
  if (n.includes('кабан') || n.includes('boar')) return skillMap.boar;
  if (n.includes('волк') || n.includes('wolf')) return skillMap.wolf;
  if (n.includes('паук') || n.includes('spider')) return skillMap.spider;
  if (n.includes('медведь') || n.includes('bear')) return skillMap.bear;
  if (n.includes('вор') || n.includes('thief')) return skillMap.thief;
  if (n.includes('бандит') || n.includes('разбойник')) return skillMap.bandit;
  if (n.includes('тролль') || n.includes('troll')) return skillMap.troll;
  if (n.includes('орк')) return skillMap.orc;
  if (n.includes('шаман') || n.includes('маг') || n.includes('культист')) return skillMap.shaman;
  if (n.includes('скелет') || n.includes('skeleton')) return skillMap.skeleton;
  if (n.includes('зомби') || n.includes('zombie') || n.includes('мертвец')) return skillMap.zombie;
  if (n.includes('вампир') || n.includes('vampire')) return skillMap.vampire;
  if (n.includes('дракон') || n.includes('dragon')) return skillMap.dragon;
  if (n.includes('голем') || n.includes('golem')) return skillMap.golem;
  if (n.includes('змей') || n.includes('snake')) return skillMap.spider;
  
  return skillMap.default;
}

const lines = content.split('\n');
let currentName = '';
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"name":')) {
    currentName = line.split('"')[3];
  }
  
  if (line.includes('"agility":')) {
    const skills = getSkillsForMonster(currentName);
    if (!line.includes('//')) {
      newLines.push(`    "skills": ["${skills.join('", "')}"],`);
    }
  }
  newLines.push(line);
}

fs.writeFileSync('monsters.ts', newLines.join('\n'));
console.log('Done!');
