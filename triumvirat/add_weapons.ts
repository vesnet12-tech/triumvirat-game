import * as fs from 'fs';

const NEW_WEAPONS = [
  // Воин
  { id: 'wpn_req_war_1', name: 'Освященный Гладиус', description: 'Крепкий клинок для воина.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { attack: 40, defense: 10 }, allowedClasses: ['Воин'] },
  { id: 'wpn_req_war_2', name: 'Громовой Двуручник', description: 'Огромный меч, искрящийся молниями.', type: 'weapon', rarity: 'epic', price: 15000, stats: { attack: 120, critDamage: 20 }, allowedClasses: ['Воин', 'Берсерк'] },
  // Маг
  { id: 'wpn_req_mag_1', name: 'Посох Ясновидца', description: 'Усиливает магические потоки.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { magicAttack: 50, mp: 30 }, allowedClasses: ['Маг', 'Иллюзионист'] },
  { id: 'wpn_req_mag_2', name: 'Сфера Пустоты', description: 'Темный артефакт поражающей мощи.', type: 'weapon', rarity: 'epic', price: 15000, stats: { magicAttack: 140, magicDefense: 20 }, allowedClasses: ['Маг', 'Чернокнижник'] },
  // Разбойник
  { id: 'wpn_req_rog_1', name: 'Кинжал Тени', description: 'Лезвие, не отражающее свет.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { attack: 35, agility: 15 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  { id: 'wpn_req_rog_2', name: 'Парные Клинки Фантома', description: 'Режут пространство и время.', type: 'weapon', rarity: 'epic', price: 15000, stats: { attack: 110, critRate: 15, agility: 30 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  // Лучник
  { id: 'wpn_req_arc_1', name: 'Охотничий Длинный Лук', description: 'Отличный лук для стрельбы на дистанцию.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { attack: 45, agility: 5 }, allowedClasses: ['Лучник', 'Охотник'] },
  { id: 'wpn_req_arc_2', name: 'Штормовой Арбалет', description: 'Каждый выстрел подобен удару грома.', type: 'weapon', rarity: 'epic', price: 15000, stats: { attack: 130, critRate: 10 }, allowedClasses: ['Лучник'] },
  // Жрец
  { id: 'wpn_req_pri_1', name: 'Кадило Веры', description: 'Наполняет союзников светом.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { magicAttack: 40, magicDefense: 20 }, allowedClasses: ['Жрец'] },
  { id: 'wpn_req_pri_2', name: 'Священный Жезл Рассвета', description: 'Прогоняет тьму одним взмахом.', type: 'weapon', rarity: 'epic', price: 15000, stats: { magicAttack: 110, hp: 100 }, allowedClasses: ['Жрец', 'Паладин'] },
  // Паладин
  { id: 'wpn_req_pal_1', name: 'Булава Справедливости', description: 'Оружие святого воителя.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { attack: 30, defense: 25 }, allowedClasses: ['Паладин'] },
  { id: 'wpn_req_pal_2', name: 'Молот Небес', description: 'Карает грешников яркой вспышкой.', type: 'weapon', rarity: 'epic', price: 15000, stats: { attack: 100, magicAttack: 50, defense: 40 }, allowedClasses: ['Паладин'] },
  // Друид
  { id: 'wpn_req_dru_1', name: 'Осколок Древа Животных', description: 'Мощный природный артефакт.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { magicAttack: 35, attack: 20 }, allowedClasses: ['Друид'] },
  { id: 'wpn_req_dru_2', name: 'Коса Жизни и Смерти', description: 'Поддерживает баланс природы.', type: 'weapon', rarity: 'epic', price: 15000, stats: { magicAttack: 90, attack: 90 }, allowedClasses: ['Друид', 'Шаман'] },
  // Бард
  { id: 'wpn_req_bar_1', name: 'Зачарованная Флейта', description: 'Ее музыка сводит с ума врагов.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { magicAttack: 30, agility: 20 }, allowedClasses: ['Бард'] },
  { id: 'wpn_req_bar_2', name: 'Арфа Звездного Света', description: 'Струны из лунного луча.', type: 'weapon', rarity: 'epic', price: 15000, stats: { magicAttack: 90, mp: 150, agility: 40 }, allowedClasses: ['Бард'] },
  // Монах
  { id: 'wpn_req_mon_1', name: 'Тяжелые Кастеты', description: 'Атака в ближнем бою.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { attack: 35, agility: 10 }, allowedClasses: ['Монах', 'Боец'] },
  { id: 'wpn_req_mon_2', name: 'Перчатки Дракона', description: 'Излучают жар при ударе.', type: 'weapon', rarity: 'epic', price: 15000, stats: { attack: 110, critRate: 10, agility: 25 }, allowedClasses: ['Монах', 'Боец'] },
  // Некромант
  { id: 'wpn_req_nec_1', name: 'Книга Мертвых', description: 'Наполнена темной магией.', type: 'weapon', rarity: 'uncommon', price: 2500, stats: { magicAttack: 50, hp: -20 }, allowedClasses: ['Некромант', 'Рыцарь Смерти'] },
  { id: 'wpn_req_nec_2', name: 'Посох Черепов', description: 'Шепчет секреты мертвецов.', type: 'weapon', rarity: 'epic', price: 15000, stats: { magicAttack: 150, magicDefense: -20 }, allowedClasses: ['Некромант', 'Чернокнижник'] }
];

let content = fs.readFileSync('items.ts', 'utf8');

const itemsJSON = NEW_WEAPONS.map(w => `
  "${w.id}": {
    "id": "${w.id}",
    "name": "${w.name}",
    "description": "${w.description}",
    "type": "${w.type}" as any,
    "rarity": "${w.rarity}" as any,
    "price": ${w.price},
    "stats": ${JSON.stringify(w.stats)},
    "allowedClasses": ${JSON.stringify(w.allowedClasses)}
  }`).join(',');

// Insert into ITEM_CATALOG
content = content.replace('export const ITEM_CATALOG: Record<string, Item> = {', 'export const ITEM_CATALOG: Record<string, Item> = {' + itemsJSON + ',');

fs.writeFileSync('items.ts', content);
console.log('Weapons added!');
