import * as fs from 'fs';

const items = JSON.parse(fs.readFileSync('items.ts', 'utf8').replace('export const ITEM_CATALOG: Record<string, Item> = {', '{').replace(/};$/, '}'));

// Fix prices
items['cons_1'].price = 50; 
items['mat_pelt_1'].price = 100;
items['mat_pelt_2'].price = 300;
items['mat_bone_1'].price = 50;
items['mat_fang_1'].price = 100;

let newContent = 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(items, null, 2) + ';';

// Add the original parsing function back because JSON.stringify removed it
const parseFunc = `\n\nexport function parseItemId(id: string) {
  // Pattern: baseId+enhance_sSlots#level[gem1,gem2]
  // Example: wpn_1+5_s2#10[gem_attack_1,gem_crit_1]
  
  let baseId = id;
  let enhance = 0;
  let slots = 0;
  let level = 1;
  let gems: string[] = [];
  
  // Extract gems
  const gemMatch = baseId.match(/\\[(.*?)\\]$/);
  if (gemMatch) {
    gems = gemMatch[1].split(',').filter(Boolean);
    baseId = baseId.replace(/\\[.*?\\]$/, '');
  }
  
  // Extract level
  const levelMatch = baseId.match(/#(\\d+)$/);
  if (levelMatch) {
    level = parseInt(levelMatch[1]);
    baseId = baseId.replace(/#\\d+$/, '');
  }
  
  // Extract slots
  const slotMatch = baseId.match(/_s(\\d+)$/);
  if (slotMatch) {
    slots = parseInt(slotMatch[1]);
    baseId = baseId.replace(/_s\\d+$/, '');
  }
  
  // Extract enhance
  const enhanceMatch = baseId.match(/\\+(\\d+)$/);
  if (enhanceMatch) {
    enhance = parseInt(enhanceMatch[1]);
    baseId = baseId.replace(/\\+\\d+$/, '');
  }
  
  return { baseId, enhance, slots, level, gems };
}

export function buildItemId(baseId: string, enhance: number, slots: number, gems: string[] = [], level: number = 1) {
  let res = baseId;
  if (enhance > 0) res += \`+\${enhance}\`;
  if (slots > 0) res += \`_s\${slots}\`;
  if (level > 1) res += \`#\${level}\`;
  if (gems.length > 0) res += \`[\${gems.join(',')}]\`;
  return res;
}`;

fs.writeFileSync('items.ts', newContent + parseFunc);
console.log('Prices updated!');
