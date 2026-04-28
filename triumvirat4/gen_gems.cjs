const fs = require('fs');

const adjectives = ['Кровавый', 'Темный', 'Призрачный', 'Сияющий', 'Святой', 'Проклятый', 'Огненный', 'Ледяной', 'Небесный', 'Ядовитый'];
const nouns = ['Рубин', 'Сапфир', 'Изумруд', 'Алмаз', 'Топаз', 'Аметист', 'Опал', 'Кварц', 'Оникс', 'Кристалл'];

let crystals = '';
let idCounter = 1;

for (let i = 0; i < adjectives.length; i++) {
  for (let j = 0; j < nouns.length; j++) {
     const name = `${adjectives[i]} ${nouns[j]}`;
     const id = `gem_${idCounter++}`;
     let rarity = 'uncommon';
     const r = Math.random();
     if (r < 0.1) rarity = 'epic';
     else if (r < 0.3) rarity = 'rare';
     
     const statKey = ['attack', 'magicAttack', 'defense', 'magicDefense', 'maxHp', 'maxMp', 'agility', 'critRate', 'critDamage', 'resistFire', 'resistIce', 'resistDark'][Math.floor(Math.random() * 12)];
     let statValue = Math.floor(Math.random() * 15) + 5;
     if (rarity === 'rare') statValue *= 2;
     if (rarity === 'epic') statValue *= 4;
     if (['critRate', 'resistFire', 'resistIce', 'resistDark'].includes(statKey)) statValue = Math.floor(statValue / 2) + 1;

     const price = Math.floor(statValue * 20 * (rarity === 'rare' ? 2 : rarity === 'epic' ? 5 : 1));

     crystals += `  '${id}': {"id":"${id}","name":"${name}","type":"material","rarity":"${rarity}","price":${price},"stats":{"${statKey}":${statValue}},"description":"Драгоценный камень для встройки в экипировку."},\n`;
  }
}

let itemsFile = fs.readFileSync('items.ts', 'utf8');

// Also give fixed slots to basic items manually later in server when buying/dropping
// For now let's just inject the gems into catalog
itemsFile = itemsFile.replace('};', crystals + '};\n');
fs.writeFileSync('items.ts', itemsFile);
