import * as fs from 'fs';

// @ts-ignore
const itemsContent = fs.readFileSync('items.ts', 'utf8');

const catalogMatch = itemsContent.match(/export const ITEM_CATALOG: Record<string, Item> = (\{[\s\S]*?\});/);

if (catalogMatch) {
  let catalogText = catalogMatch[1];
  catalogText = catalogText.replace(/ as any/g, '');
  const catalog = eval('(' + catalogText + ')');
  let output = '# База Знаний: Характеристики Предметов\n\nЗдесь представлены правильные базовые характеристики предметов, распределенные по классам и применению. Эти предметы используются для экипировки и обновляются в магазине (до +1 уровня к уровню персонажа).\n\n';
  
  const weapons = Object.values(catalog).filter((i: any) => i.type === 'weapon' && i.allowedClasses);
  output += '## Оружие\n';
  weapons.forEach((w: any) => {
    output += `- **${w.name}** [${w.rarity}] (Цена: ${w.price} 💰)\n  - Классы: ${w.allowedClasses.join(', ')}\n  - Характеристики: ${JSON.stringify(w.stats)}\n  - Описание: ${w.description}\n`;
  });
  
  const armors = Object.values(catalog).filter((i: any) => i.type === 'armor' && i.allowedClasses);
  output += '\n## Броня\n';
  armors.forEach((a: any) => {
    output += `- **${a.name}** [${a.rarity}] (Цена: ${a.price} 💰)\n  - Классы: ${a.allowedClasses.join(', ')}\n  - Характеристики: ${JSON.stringify(a.stats)}\n  - Описание: ${a.description}\n`;
  });

  const accs = Object.values(catalog).filter((i: any) => i.type === 'accessory' && i.allowedClasses);
  output += '\n## Аксессуары\n';
  accs.forEach((a: any) => {
    output += `- **${a.name}** [${a.rarity}] (Цена: ${a.price} 💰)\n  - Классы: ${a.allowedClasses.join(', ')}\n  - Характеристики: ${JSON.stringify(a.stats)}\n  - Описание: ${a.description}\n`;
  });

  fs.writeFileSync('knowledge_base_items.md', output);
  console.log('Knowledge base markdown generated.');
}
