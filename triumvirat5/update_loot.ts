import fs from 'fs';

const monstersStr = fs.readFileSync('monsters.ts', 'utf-8');

const newLines = monstersStr.split('\n').map(line => {
  if (line.trim() === '"loot": [],') {
    return `    "loot": [
      { "itemId": "mat_bone_1", "chance": 0.4 },
      { "itemId": "mat_pelt_1", "chance": 0.3 },
      { "itemId": "enhance_stone_1", "chance": 0.1 }
    ],`;
  }
  // Try matching without comma just in case
  if (line.trim() === '"loot": []') {
    return `    "loot": [
      { "itemId": "mat_bone_1", "chance": 0.4 },
      { "itemId": "mat_pelt_1", "chance": 0.3 },
      { "itemId": "enhance_stone_1", "chance": 0.1 }
    ]`;
  }
  return line;
});

fs.writeFileSync('monsters.ts', newLines.join('\n'), 'utf-8');
console.log('Updated loot in monsters.ts');
