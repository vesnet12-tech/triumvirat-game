const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

let match = s.match(/(export const items:[^{]+\{)(.*)\n\};\n?$/is);
let top = s.slice(0, match.index) + match[1] + '\n';
let body = match[2];

let blocks = body.split(/\n\s*"(acc_[a-zA-Z0-9_]+|wpn_\d+|arm_\d+|helm_\d+|shield_\d+|gem_\d+|mat_\d+|cons_\d+)":\s*\{/g);
let toKeep = [];
let removed = 0;

toKeep.push(blocks[0]);

for (let i = 1; i < blocks.length; i += 2) {
    let key = blocks[i];
    let content = blocks[i+1];
    
    let block = '  "' + key + '": {' + content;
    
    let isAcc = block.includes('"type": "accessory"');
    let isCommon = block.includes('"rarity": "common"') || block.includes('"rarity": "uncommon"');
    
    let isTarget = block.includes('Сапфир Ярости') || block.includes('Осколок Звезды');
    
    // Check missing stats
    let statsMatch = block.match(/"stats":\s*\{([^\}]*)\}/);
    let emptyStats = !statsMatch || statsMatch[1].trim() === '';
    
    if (isAcc && isCommon && (isTarget || emptyStats)) {
       removed++;
       continue;
    }
    
    toKeep.push(block);
}

console.log("Removed " + removed + " accessories");
let out = top + toKeep.join('') + '\n};\n';
fs.writeFileSync('items.ts', out, 'utf8');
