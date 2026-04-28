import * as fs from 'fs';
import { ITEM_CATALOG } from './items.js'; // Wait, ts-node can just import it.

let badKeys: string[] = [];

for (const key in ITEM_CATALOG) {
   const item = ITEM_CATALOG[key] as any;
   if (item.type === 'material' && (item.rarity === 'common' || item.rarity === 'uncommon') && key.startsWith('gem_')) {
       const stats = item.stats || {};
       const statKeys = Object.keys(stats);
       if (statKeys.length === 0) {
           badKeys.push(key);
       } else if (statKeys.length === 1 && (statKeys[0] === 'critRate' || statKeys[0] === 'critDamage')) {
           badKeys.push(key);
       } else if (statKeys.length === 2 && statKeys.includes('critRate') && statKeys.includes('critDamage')) {
           badKeys.push(key);
       }
   }
}

console.log("BAD KEYS:", badKeys);

let content = fs.readFileSync('items.ts', 'utf8');

badKeys.forEach(k => {
   const regex = new RegExp(`  "${k}": \\{[\\s\\S]*?\\},?\\n`, 'g');
   content = content.replace(regex, '');
});

fs.writeFileSync('items.ts', content, 'utf8');
console.log('Done cleaning items.ts');
