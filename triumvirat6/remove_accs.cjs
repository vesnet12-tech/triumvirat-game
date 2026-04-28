const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

// I will parse the `items` object. Instead of full JS execution, I can rely on a regex to replace those entries?
// Let's do string manipulation.
let match = s.match(/(export const items:[^{]+\{)(.*)\n\};\n?$/is);
if (!match) throw new Error("Could not find items object");

let top = s.slice(0, match.index) + match[1] + '\n';
let body = match[2];

let blocks = body.split('\n  "');

let toKeep = [];
let removed = 0;

for (let i=0; i<blocks.length; i++) {
   if (i===0 && blocks[i].trim() === '') continue; // first split might be empty
   
   let block = (i===0 ? '' : '  "') + blocks[i];
   
   let isAcc = block.includes('"type": "accessory"');
   let isCommon = block.includes('"rarity": "common"') || block.includes('"rarity": "uncommon"');
   
   let isTarget = block.includes('"name": "Сапфир ярости"') || block.includes('"name": "Осколок звезды"');
   let hasNoStats = !block.includes('"stats": {');
   
   if (isAcc && isCommon && (isTarget || hasNoStats)) {
      removed++;
      continue;
   }
   
   toKeep.push(block);
}

console.log("Removed " + removed + " empty uncommon/common accessories");

let out = top + toKeep.join('\n  "') + '\n};\n';

fs.writeFileSync('items.ts', out, 'utf8');

