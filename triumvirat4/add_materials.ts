import fs from 'fs';

const itemsStr = fs.readFileSync('items.ts', 'utf-8');
const endMatch = itemsStr.match(/(\s*\}\s*);\s*export function parseItemId/);
if (endMatch) {
  const insertIndex = endMatch.index;
  const newItems = `,
  "enhance_stone_1": { "id": "enhance_stone_1", "name": "Малый Кристалл Энд", "type": "material", "rarity": "common", "price": 100, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_2": { "id": "enhance_stone_2", "name": "Кристалл Энд", "type": "material", "rarity": "uncommon", "price": 500, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_3": { "id": "enhance_stone_3", "name": "Большой Кристалл Энд", "type": "material", "rarity": "rare", "price": 2000, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_4": { "id": "enhance_stone_4", "name": "Великий Кристалл Энд", "type": "material", "rarity": "epic", "price": 10000, "description": "Используется у кузнеца для заточки снаряжения." },
  "enhance_stone_5": { "id": "enhance_stone_5", "name": "Легендарный Кристалл Энд", "type": "material", "rarity": "legendary", "price": 50000, "description": "Используется у кузнеца для заточки снаряжения." },
  "mat_pelt_1": { "id": "mat_pelt_1", "name": "Обычная Шкура", "type": "material", "rarity": "common", "price": 15, "description": "Шкура зверя. Можно продать в магазине." },
  "mat_pelt_2": { "id": "mat_pelt_2", "name": "Крепкая Шкура", "type": "material", "rarity": "uncommon", "price": 60, "description": "Шкура сильного зверя. Можно продать в магазине." },
  "mat_pelt_3": { "id": "mat_pelt_3", "name": "Редкая Шкура", "type": "material", "rarity": "rare", "price": 250, "description": "Ценная шкура. Можно продать в магазине." },
  "mat_bone_1": { "id": "mat_bone_1", "name": "Кость Монстра", "type": "material", "rarity": "common", "price": 10, "description": "Обычная кость. Можно продать." },
  "mat_fang_1": { "id": "mat_fang_1", "name": "Клык Зверя", "type": "material", "rarity": "uncommon", "price": 45, "description": "Острый клык. Можно продать." }
`;
  
  const updatedStr = itemsStr.substring(0, insertIndex) + newItems + itemsStr.substring(insertIndex);
  fs.writeFileSync('items.ts', updatedStr, 'utf-8');
  console.log('Added new items to items.ts');
} else {
  console.log('Could not find insertion point.');
}
