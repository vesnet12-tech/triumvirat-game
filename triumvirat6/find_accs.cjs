const fs = require('fs');
let content = fs.readFileSync('items.ts', 'utf8');
const match = content.match(/export const ITEM_CATALOG: Record<string, Item> = (\{[\s\S]*?\});\n/);
if (match) {
  let jsonStr = match[1].replace(/as any/g, '');
  const items = eval('(' + jsonStr + ')');
  for (const key in items) {
     const item = items[key];
     if (item.type === 'accessory') {
         console.log(key, item.name, item.rarity, JSON.stringify(item.stats));
     }
  }
}
