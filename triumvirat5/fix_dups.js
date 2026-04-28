import fs from 'fs';
const lines = fs.readFileSync('monsters.ts', 'utf8').split('\n');
const fixedLines = [];
let insideMonster = false;
let seenSkills = false;

for (const line of lines) {
  if (line.includes('": {')) {
    seenSkills = false;
  }
  
  if (line.includes('"skills":')) {
    if (seenSkills) {
      continue; // Skip duplicate
    }
    seenSkills = true;
  }
  
  fixedLines.push(line);
}

fs.writeFileSync('monsters.ts', fixedLines.join('\n'));
console.log('Fixed duplicates');
