import * as fs from 'fs';

const NEW_ARMORS = [
  // Воин
  { id: 'arm_req_war_1', name: 'Кираса Ополченца', description: 'Стандартная защита воина.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 25, maxHp: 50 }, allowedClasses: ['Воин'] },
  { id: 'arm_req_war_2', name: 'Латы Титана', description: 'Непробиваемая броня великих воинов.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 80, maxHp: 250, hpRegen: 10 }, allowedClasses: ['Воин', 'Берсерк'] },
  // Маг
  { id: 'arm_req_mag_1', name: 'Мантия Ученика', description: 'Легкая мантия, пропитанная маной.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { magicDefense: 20, maxMp: 50 }, allowedClasses: ['Маг', 'Иллюзионист'] },
  { id: 'arm_req_mag_2', name: 'Одеяние Архимага', description: 'Защищает от любых магических всплесков.', type: 'armor', rarity: 'epic', price: 15000, stats: { magicDefense: 70, maxMp: 200, mpRegen: 10 }, allowedClasses: ['Маг', 'Чернокнижник'] },
  // Разбойник
  { id: 'arm_req_rog_1', name: 'Кожаная Куртка Вора', description: 'Удобна для скрытных перемещений.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 15, agility: 10 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  { id: 'arm_req_rog_2', name: 'Доспех Тени', description: 'Силуэт сливается с темнотой.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 50, agility: 30, dodgeChance: 10 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  // Лучник
  { id: 'arm_req_arc_1', name: 'Кольчуга Охотника', description: 'Не стесняет движений.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 18, agility: 10 }, allowedClasses: ['Лучник', 'Охотник'] },
  { id: 'arm_req_arc_2', name: 'Доспех Ветрокрылых', description: 'Легкий и прочный как сталь.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 55, agility: 25, attack: 20 }, allowedClasses: ['Лучник'] },
  // Жрец
  { id: 'arm_req_pri_1', name: 'Одеяние Послушника', description: 'Служит защитой верующему.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { magicDefense: 25, maxHp: 30 }, allowedClasses: ['Жрец'] },
  { id: 'arm_req_pri_2', name: 'Ризы Святости', description: 'Благословленные самими небесами.', type: 'armor', rarity: 'epic', price: 15000, stats: { magicDefense: 75, maxHp: 150, hpRegen: 15 }, allowedClasses: ['Жрец', 'Паладин'] },
  // Паладин
  { id: 'arm_req_pal_1', name: 'Броня Заступника', description: 'Крепкая броня начинающего рыцаря.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 25, magicDefense: 10 }, allowedClasses: ['Паладин'] },
  { id: 'arm_req_pal_2', name: 'Святые Латы', description: 'Отражают удары и исцеляют раны.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 85, magicDefense: 40, attack: 20 }, allowedClasses: ['Паладин'] },
  // Друид
  { id: 'arm_req_dru_1', name: 'Накидка Лесника', description: 'Сплетена из крепких лиан.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 15, maxHp: 40 }, allowedClasses: ['Друид'] },
  { id: 'arm_req_dru_2', name: 'Кора Старого Энта', description: 'Твёрже железа.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 60, magicDefense: 30, maxHp: 200 }, allowedClasses: ['Друид', 'Шаман'] },
  // Бард
  { id: 'arm_req_bar_1', name: 'Камзол Музыканта', description: 'Для выступлений и защиты.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 10, agility: 15 }, allowedClasses: ['Бард'] },
  { id: 'arm_req_bar_2', name: 'Доспех Золотой Струны', description: 'Усиливает резонанс магии.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 40, magicDefense: 50, maxMp: 100 }, allowedClasses: ['Бард'] },
  // Монах
  { id: 'arm_req_mon_1', name: 'Одежда Аскета', description: 'Просторная и удобная ткань.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { defense: 15, agility: 15 }, allowedClasses: ['Монах', 'Боец'] },
  { id: 'arm_req_mon_2', name: 'Одеяние Дянь-Шаня', description: 'Наполнено энергией ци.', type: 'armor', rarity: 'epic', price: 15000, stats: { defense: 60, agility: 40, hpRegen: 20 }, allowedClasses: ['Монах', 'Боец'] },
  // Некромант
  { id: 'arm_req_nec_1', name: 'Одеяние Могильщика', description: 'Пропитано запахом смерти.', type: 'armor', rarity: 'uncommon', price: 2500, stats: { magicDefense: 20, maxMp: 40 }, allowedClasses: ['Некромант', 'Рыцарь Смерти'] },
  { id: 'arm_req_nec_2', name: 'Мантия Безвременья', description: 'Создана из душ падших врагов.', type: 'armor', rarity: 'epic', price: 15000, stats: { magicDefense: 65, maxMp: 150, magicAttack: 30 }, allowedClasses: ['Некромант', 'Чернокнижник'] }
];

let content = fs.readFileSync('items.ts', 'utf8');

const itemsJSON = NEW_ARMORS.map(a => `
  "${a.id}": {
    "id": "${a.id}",
    "name": "${a.name}",
    "description": "${a.description}",
    "type": "${a.type}" as any,
    "rarity": "${a.rarity}" as any,
    "price": ${a.price},
    "stats": ${JSON.stringify(a.stats)},
    "allowedClasses": ${JSON.stringify(a.allowedClasses)}
  }`).join(',');

content = content.replace('export const ITEM_CATALOG: Record<string, Item> = {', 'export const ITEM_CATALOG: Record<string, Item> = {' + itemsJSON + ',');

fs.writeFileSync('items.ts', content);
console.log('Armors added!');
