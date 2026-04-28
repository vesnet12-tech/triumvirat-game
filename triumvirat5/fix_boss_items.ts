import * as fs from 'fs';

const content = fs.readFileSync('items.ts', 'utf8');
const catalogMatch = content.match(/export const ITEM_CATALOG: Record<string, Item> = (\{([\s\S]+?)\});/);

if (catalogMatch) {
  let catalogText = catalogMatch[1].replace(/ as any/g, '');
  const catalog = eval('(' + catalogText + ')');

  catalog['boss_ent_acc'] = {
    "id": "boss_ent_acc",
    "name": "Кольцо Древнего Энта",
    "description": "Могущественное кольцо, выпадающее с босса Энта.",
    "type": "accessory",
    "rarity": "epic",
    "price": 10000,
    "stats": {"maxHp": 40, "defense": 10, "hpRegen": 2}
  };

  catalog['boss_ent_acc_leg'] = {
    "id": "boss_ent_acc_leg",
    "name": "Сердце Древнего Энта",
    "description": "Легендарное сердце Древнего Энта.",
    "type": "accessory",
    "rarity": "legendary",
    "price": 50000,
    "stats": {"maxHp": 100, "defense": 20, "hpRegen": 5}
  };
  
  catalog['arm_2'] = {
    "id": "arm_2",
    "name": "Железная броня",
    "description": "Базовая броня для начинающих.",
    "type": "armor",
    "rarity": "common",
    "price": 1000,
    "stats": {"defense": 5}
  };
  
  catalog['acc_1'] = {
    "id": "acc_1",
    "name": "Простое кольцо",
    "description": "Обычное кольцо.",
    "type": "accessory",
    "rarity": "common",
    "price": 500,
    "stats": {"maxHp": 5}
  };

  const newContent = content.substring(0, catalogMatch.index) + 'export const ITEM_CATALOG: Record<string, Item> = ' + JSON.stringify(catalog, null, 2) + ';\n' + content.substring(catalogMatch.index + catalogMatch[0].length);

  fs.writeFileSync('items.ts', newContent);
  console.log('Restored boss items.');
}
