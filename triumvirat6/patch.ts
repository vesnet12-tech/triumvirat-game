import fs from 'fs';

let code = fs.readFileSync('items.ts', 'utf8');

code = code.replace(/"price": 500, "description": "Шкура зверя/g, '"price": 80, "description": "Шкура зверя');
code = code.replace(/"price": 100, "description": "Шкура зверя/g, '"price": 80, "description": "Шкура зверя');
code = code.replace(/"price": \d+, "description": "Шкура сильного зверя/g, '"price": 300, "description": "Шкура сильного зверя');
code = code.replace(/"id": "mat_bone_1", "name": "Кость Монстра".*?"price": \d+,/g, '"id": "mat_bone_1", "name": "Кость Монстра", "type": "material", "rarity": "common", "price": 50,');
code = code.replace(/"id": "mat_fang_1", "name": "Клык Зверя".*?"price": \d+,/g, '"id": "mat_fang_1", "name": "Клык Зверя", "type": "material", "rarity": "uncommon", "price": 100,');
code = code.replace(/"id": "enhance_stone_1", "name": "Малый Кристалл Энд".*?"price": \d+,/g, '"id": "enhance_stone_1", "name": "Малый Кристалл Энд", "type": "material", "rarity": "common", "price": 100,');
code = code.replace(/"id": "enhance_stone_2", "name": "Кристалл Энд".*?"price": \d+,/g, '"id": "enhance_stone_2", "name": "Кристалл Энд", "type": "material", "rarity": "uncommon", "price": 500,');

code = code.replace(/"id": "cons_1",\s*"name": "Малое зелье здоровья".*?"price": \d+,/s, '"id": "cons_1",\n    "name": "Малое зелье здоровья",\n    "rarity": "common",\n    "healAmount": 50,\n    "price": 50,');
code = code.replace(/"id": "cons_2",\s*"name": "Среднее зелье здоровья".*?"price": \d+,/s, '"id": "cons_2",\n    "name": "Среднее зелье здоровья",\n    "rarity": "uncommon",\n    "healAmount": 150,\n    "price": 100,');
code = code.replace(/"id": "cons_3",\s*"name": "Большое зелье здоровья".*?"price": \d+,/s, '"id": "cons_3",\n    "name": "Большое зелье здоровья",\n    "rarity": "rare",\n    "healAmount": 400,\n    "price": 200,');
code = code.replace(/"id": "cons_4",\s*"name": "Эликсир Жизни".*?"price": \d+,/s, '"id": "cons_4",\n    "name": "Эликсир Жизни",\n    "rarity": "epic",\n    "healAmount": 1000,\n    "price": 500,');

// Because Regex dot match new line requires 's' flag which works in JS, let's also do these individually:
code = code.replace(/"name":\s*"Эликсир Жизни",\s*"rarity":\s*"epic",\s*"healAmount":\s*1000,\s*"price":\s*1500,/g, '"name": "Эликсир Жизни",\n    "rarity": "epic",\n    "healAmount": 1000,\n    "price": 500,');
code = code.replace(/"name":\s*"Среднее зелье здоровья",\s*"rarity":\s*"uncommon",\s*"healAmount":\s*150,\s*"price":\s*120,/g, '"name": "Среднее зелье здоровья",\n    "rarity": "uncommon",\n    "healAmount": 150,\n    "price": 100,');

fs.writeFileSync('items.ts', code);
console.log('done');
