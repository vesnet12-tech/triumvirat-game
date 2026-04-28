import * as fs from 'fs';

let content = fs.readFileSync('exploration.ts', 'utf8');

const pathOpts = `const PATH_OPTIONS = [
  { label: '⬅️ Налево', cmd: 'explore_path_1' },
  { label: '➡️ Направо', cmd: 'explore_path_2' },
  { label: '⬆️ Прямо', cmd: 'explore_path_3' },
  { label: '🌲 В чащу', cmd: 'explore_path_5' },
  { label: '🧗 На гору', cmd: 'explore_climb' },
  { label: '🌊 К реке', cmd: 'explore_river' },
  { label: '🌑 В пещеру', cmd: 'explore_cave' },
  { label: '🌸 На поляну', cmd: 'explore_glade' },
  { label: '🪵 К вырубке', cmd: 'explore_logging' },
  { label: '🍄 В грибницу', cmd: 'explore_mushrooms' },
  { label: '🏚️ К заброшенной хижине', cmd: 'explore_cabin' },
  { label: '🌿 В густые заросли', cmd: 'explore_thicket' }
];

function generatePaths(excludeCmd: string = '') {
   const available = PATH_OPTIONS.filter(p => p.cmd !== excludeCmd);
   const shuffled = available.sort(() => 0.5 - Math.random());
   return shuffled.slice(0, 3);
}
`;

content = content.replace(/const PATH_OPTIONS = \[[\s\S]*?function generatePaths\(\) \{[\s\S]*?\n\}/, pathOpts);

content = content.replace(/char\.rpg\.dynamicPaths = generatePaths\(\);/g, "char.rpg.dynamicPaths = generatePaths(command);");
content = content.replace(/char\.rpg\.dynamicPaths = generatePaths\(\);/g, "char.rpg.dynamicPaths = generatePaths();"); // Wait, I already replaced it above

fs.writeFileSync('exploration.ts', content, 'utf8');
