import * as fs from 'fs';

const NEW_ITEMS = [
  { id: 'boss_ent_helm', name: 'Корона Шепчущего Леса', description: 'Сплетена из древних корней. Дает странную выносливость.', type: 'helmet', rarity: 'rare', price: 1000, stats: { hp: 50, defense: 25, magicDefense: 10 } },
  { id: 'boss_ent_armor', name: 'Кольчуга Древнего Энта', description: 'Кажется, что куски коры живут своей жизнью и защищают владельца.', type: 'armor', rarity: 'epic', price: 5000, stats: { hp: 120, defense: 45, maxHp: 120 } },
  { id: 'boss_ent_acc', name: 'Семя Владыки Леса', description: 'Наполняет энергией природы.', type: 'accessory', rarity: 'epic', price: 5000, stats: { magicAttack: 30, hp: 100 } },
  { id: 'boss_ent_acc_leg', name: 'Слеза Древнего Энта', description: 'Легендарный артефакт, изливающий нескончаемый поток жизни.', type: 'accessory', rarity: 'legendary', price: 25000, stats: { hp: 300, maxHp: 300, defense: 30, magicDefense: 30 } }
];

let itemsCode = fs.readFileSync('items.ts', 'utf8');

const itemsJSON = NEW_ITEMS.map(w => `
  "${w.id}": {
    "id": "${w.id}",
    "name": "${w.name}",
    "description": "${w.description}",
    "type": "${w.type}" as any,
    "rarity": "${w.rarity}" as any,
    "price": ${w.price},
    "stats": ${JSON.stringify(w.stats)}
  }`).join(',');

itemsCode = itemsCode.replace('export const ITEM_CATALOG: Record<string, Item> = {', 'export const ITEM_CATALOG: Record<string, Item> = {' + itemsJSON + ',');

fs.writeFileSync('items.ts', itemsCode);

// Now edit monsters.ts
let monstersCode = fs.readFileSync('monsters.ts', 'utf8');
const oldBoss = `
      { "itemId": "enhance_stone_2", "chance": 1.0 },
      { "itemId": "hp_potion_2", "chance": 1.0 },
      { "itemId": "gem_dmg_1", "chance": 0.5 }
`;

const newBoss = `
      { "itemId": "enhance_stone_2", "chance": 1.0 },
      { "itemId": "hp_potion_2", "chance": 1.0 },
      { "itemId": "gem_dmg_1", "chance": 0.5 },
      { "itemId": "boss_ent_helm", "chance": 0.2 },
      { "itemId": "boss_ent_armor", "chance": 0.1 },
      { "itemId": "boss_ent_acc", "chance": 0.1 },
      { "itemId": "boss_ent_acc_leg", "chance": 0.005 }
`;
monstersCode = monstersCode.replace(oldBoss.trim(), newBoss.trim());
fs.writeFileSync('monsters.ts', monstersCode);

console.log('Items & Boss drops injected!');
