import * as fs from 'fs';

let content = fs.readFileSync('exploration.ts', 'utf8');

content = content.replace(/const pot = 'hp_potion_1';/g, "char.rpg.inventory = char.rpg.inventory || [];\n         const pot = 'hp_potion_1';");

content = content.replace(/const ex = char\.rpg\.inventory\.find\(\(i:any\)=>i\.itemId===sId\);/g, "char.rpg.inventory = char.rpg.inventory || [];\n                 const ex = char.rpg.inventory.find((i:any)=>i.itemId===sId);");

fs.writeFileSync('exploration.ts', content, 'utf8');
