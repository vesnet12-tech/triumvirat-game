import * as fs from 'fs';

let content = fs.readFileSync('items.ts', 'utf8');

const regex = /export const ITEM_CATALOG: Record<string, Item> = (\{[\s\S]*?\});/;
const match = content.match(regex);

if (match) {
  let catalogText = match[1].replace(/ as any/g, '');
  const catalog = eval('(' + catalogText + ')');
  const newCatalog: any = {};
  
  for (const key in catalog) {
    const item = catalog[key];
    if (['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(item.type)) {
      if (item.allowedClasses && item.allowedClasses.length > 0) {
        newCatalog[key] = item;
      }
    } else {
      newCatalog[key] = item;
    }
  }

  const newPrefix = content.substring(0, match.index);
  const newContent = newPrefix + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(newCatalog, null, 2) + ';\n';
  fs.writeFileSync('items.ts', newContent);
  console.log('Cleaned equipment!');
}
