const fs = require('fs');
let content = fs.readFileSync('items.ts', 'utf-8');
content = content.replace("export const ITEM_CATALOG: Record<string, Item> = {\n...updatedItems\n}; // wait I can't overwrite this directly since it's huge. I'll read the EOF and append.", "export const ITEM_CATALOG: Record<string, Item> = {");

const helpers = `

export function parseItemId(id: string) {
  const match = id.match(/_s(\\d+)$/);
  const slots = match ? parseInt(match[1]) : 0;
  const baseId = match ? id.replace(/_s\\d+$/, '') : id;
  return { baseId, slots };
}

export function buildItemId(baseId: string, slots: number) {
  return slots > 0 ? \`\${baseId}_s\${slots}\` : baseId;
}

export function getItem(itemId: string): Item | undefined {
  if(!itemId) return undefined;
  const { baseId, slots } = parseItemId(itemId);
  const item = ITEM_CATALOG[baseId];
  if (!item) return undefined;
  return { ...item, maxSlots: Math.max(item.maxSlots || 0, slots) };
}

export function getItemByName(name: string): Item | undefined {
  return Object.values(ITEM_CATALOG).find(i => i.name === name);
}
`;

fs.writeFileSync('items.ts', content + helpers);
