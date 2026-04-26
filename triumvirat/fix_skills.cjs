const fs = require('fs');
let content = fs.readFileSync('skills.ts', 'utf-8');

const helpers = `
export const CLASS_STARTING_SKILLS: Record<string, string[]> = {
  "Воин": ["warrior_attack", "warrior_basic"],
  "Маг": ["mage_attack", "mage_basic"],
  "Разбойник": ["rogue_attack", "rogue_basic"],
  "Лучник": ["archer_attack", "archer_basic"],
  "Жрец": ["priest_attack", "priest_basic"],
  "Паладин": ["paladin_attack", "paladin_basic"],
  "Чернокнижник": ["warlock_attack", "warlock_basic"],
  "Друид": ["druid_attack", "druid_basic"],
  "Бард": ["bard_attack", "bard_basic"],
  "Монах": ["monk_attack", "monk_basic"],
  "Некромант": ["necromancer_attack", "necromancer_basic"],
  "Ассасин": ["assassin_attack", "assassin_basic"],
  "Берсерк": ["berserker_attack", "berserker_basic"],
  "Шаман": ["shaman_attack", "shaman_basic"],
  "Рыцарь Смерти": ["deathknight_attack", "deathknight_basic"],
  "Иллюзионист": ["illusionist_attack", "illusionist_basic"],
  "Алхимик": ["alchemist_attack", "alchemist_basic"],
  "Охотник": ["hunter_attack", "hunter_basic"],
  "Инженер": ["engineer_attack", "engineer_basic"],
  "Маг Крови": ["bloodmage_attack", "bloodmage_basic"],
  "Гоблин": ["goblin_attack", "goblin_basic"],
  "Боец": ["fighter_attack", "fighter_basic"],
  "Варвар": ["barbarian_attack", "barbarian_basic"]
};
`;

fs.writeFileSync('skills.ts', content + helpers);
