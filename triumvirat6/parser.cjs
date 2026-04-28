const fs = require('fs');

let text = fs.readFileSync('items.ts', 'utf8');

let blocks = [];
let currentBlock = [];
let lines = text.split('\n');

let insideExport = false;

for (let line of lines) {
    if (line.includes('export const items')) {
        insideExport = true;
        continue;
    }
    if (!insideExport) continue;

    if (line.match(/^\s*"[a-zA-Z0-9_]+":\s*\{/)) {
        if (currentBlock.length > 0) {
            blocks.push(currentBlock.join('\n'));
        }
        currentBlock = [line];
    } else {
        currentBlock.push(line);
    }
}
if (currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n'));
}

let items = {};

for (let block of blocks) {
    let idMatch = block.match(/"id":\s*"([^"]+)"/);
    if (!idMatch) continue;
    let id = idMatch[1];
    
    let nameMatch = block.match(/"name":\s*"([^"]+)"/);
    let typeMatch = block.match(/"type":\s*"([^"]+)"/);
    let rarityMatch = block.match(/"rarity":\s*"([^"]+)"/);
    let priceMatch = block.match(/"price":\s*(\d+)/);
    let descMatch = block.match(/"description":\s*"([^"]+)"/);
    
    let item = { id };
    if (nameMatch) item.name = nameMatch[1];
    if (typeMatch) item.type = typeMatch[1];
    if (rarityMatch) item.rarity = rarityMatch[1];
    if (priceMatch) item.price = Number(priceMatch[1]);
    if (descMatch) item.description = descMatch[1];
    
    // Parse stats
    let statsMatch = block.match(/"stats":\s*\{([^\}]+)\}/);
    if (statsMatch) {
        let statsStr = statsMatch[1];
        let stats = {};
        for (let statLine of statsStr.split(',')) {
            let kv = statLine.match(/"([^"]+)":\s*([\-\d]+)/);
            if (kv) {
                stats[kv[1]] = Number(kv[2]);
            }
        }
        item.stats = stats;
    }

    // Parse allowedClasses
    let acMatch = block.match(/"allowedClasses":\s*\[([^\]]+)\]/);
    if (acMatch) {
         let clsStr = acMatch[1];
         let arr = [];
         let m;
         let qRegex = /"([^"]+)"/g;
         while ((m = qRegex.exec(clsStr)) !== null) {
              arr.push(m[1]);
         }
         item.allowedClasses = arr;
    }

    items[id] = item;
}

// Convert back to string
let out = ['import { Item } from \'./rpg\';\n'];
out.push('export const items: Record<string, Item> = {');
for (let [k, v] of Object.entries(items)) {
    out.push(`  "${k}": ${JSON.stringify(v, null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n')},`);
}
out.push('};\n');

fs.writeFileSync('items.ts', out.join('\n'), 'utf8');
console.log('Fixed completely!');
