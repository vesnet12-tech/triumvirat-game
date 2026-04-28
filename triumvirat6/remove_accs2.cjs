const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

let match = s.match(/(export const items:[^{]+\{)(.*)\n\};\n?$/is);
let top = s.slice(0, match.index) + match[1] + '\n';
let body = match[2];

let blocks = body.split(/\n\s*"(acc_\d+|wpn_\d+|arm_\d+|helm_\d+|shield_\d+|gem_\d+|mat_\d+|cons_\d+)":\s*\{/g);
// Wait, split keeps the capturing groups if we use Regex.
// Yes! 
let toKeep = [];
let removed = 0;

toKeep.push(blocks[0]); // Whatever is before the first element

for (let i = 1; i < blocks.length; i += 2) {
    let key = blocks[i];
    let content = blocks[i+1];
    
    let block = '  "' + key + '": {' + content;
    
    let isAcc = block.includes('"type": "accessory"');
    let isCommon = block.includes('"rarity": "common"') || block.includes('"rarity": "uncommon"');
    
    let nameMatch = block.match(/"name":\s*"([^"]+)"/);
    let name = nameMatch ? nameMatch[1] : '';
    
    let isTarget = name.includes('Сапфир Ярости') || name.includes('Осколок Звезды');
    
    // Also if it literally has no stats?
    // Let's parse stats.
    let statsMatch = block.match(/"stats":\s*\{([^\}]+)\}/);
    let statCount = 0;
    if (statsMatch) {
       statCount = statsMatch[1].trim().split('\n').filter(l => l.trim().length > 0).length;
    }
    
    if (isAcc && isCommon && statCount === 0) {
       removed++;
       continue;
    }
    
    if (isAcc && isCommon && isTarget) {
       removed++;
       continue;
    }
    
    toKeep.push(block);
}

console.log("Removed " + removed + " common/uncommon accessories");

let out = top + toKeep.join('') + '\n};\n';

fs.writeFileSync('items.ts', out, 'utf8');
