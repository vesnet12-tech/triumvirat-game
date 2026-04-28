import * as fs from 'fs';

const NEW_ACC = [
  // Воин
  { id: 'acc_req_war_1', name: 'Кольцо Мужества', description: 'Символ чести обычного воина.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { maxHp: 30, attack: 5 }, allowedClasses: ['Воин'] },
  { id: 'acc_req_war_2', name: 'Амулет Ярости', description: 'Осколок метеорита на цепи.', type: 'accessory', rarity: 'epic', price: 15000, stats: { maxHp: 150, attack: 25, critDamage: 10 }, allowedClasses: ['Воин', 'Берсерк'] },
  // Маг
  { id: 'acc_req_mag_1', name: 'Кольцо Ума', description: 'Позволяет не забывать формулы.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { maxMp: 30, magicAttack: 5 }, allowedClasses: ['Маг', 'Иллюзионист'] },
  { id: 'acc_req_mag_2', name: 'Печать Архимага', description: 'Огромный сапфир, наполненный энергией омута.', type: 'accessory', rarity: 'epic', price: 15000, stats: { maxMp: 150, magicAttack: 35, mpRegen: 5 }, allowedClasses: ['Маг', 'Чернокнижник'] },
  // Разбойник
  { id: 'acc_req_rog_1', name: 'Амулет Ловкости', description: 'Делает шаги тише.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { agility: 8, attack: 5 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  { id: 'acc_req_rog_2', name: 'Кольцо Теней', description: 'Притягивает темноту.', type: 'accessory', rarity: 'epic', price: 15000, stats: { agility: 25, dodgeChance: 5, critRate: 5 }, allowedClasses: ['Разбойник', 'Ассасин'] },
  // Лучник
  { id: 'acc_req_arc_1', name: 'Глаз Орла', description: 'Заточка на точность.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { attack: 8, agility: 5 }, allowedClasses: ['Лучник', 'Охотник'] },
  { id: 'acc_req_arc_2', name: 'Браслет Ветров', description: 'Ускоряет полет стрел.', type: 'accessory', rarity: 'epic', price: 15000, stats: { attack: 25, agility: 15, critRate: 10 }, allowedClasses: ['Лучник'] },
  // Жрец
  { id: 'acc_req_pri_1', name: 'Символ Веры', description: 'Придаёт духовных сил.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { maxHp: 20, magicDefense: 8 }, allowedClasses: ['Жрец'] },
  { id: 'acc_req_pri_2', name: 'Слеза Ангела', description: 'Сияющий кристалл на серебряной цепочке.', type: 'accessory', rarity: 'epic', price: 15000, stats: { maxHp: 100, magicDefense: 35, hpRegen: 10 }, allowedClasses: ['Жрец', 'Паладин'] },
  // Паладин
  { id: 'acc_req_pal_1', name: 'Медальон Защитника', description: 'Знак верности долгу.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { defense: 8, magicDefense: 5 }, allowedClasses: ['Паладин'] },
  { id: 'acc_req_pal_2', name: 'Печать Храмовника', description: 'Древний артефакт ордена Света.', type: 'accessory', rarity: 'epic', price: 15000, stats: { defense: 30, magicDefense: 30, maxHp: 100 }, allowedClasses: ['Паладин'] },
  // Друид
  { id: 'acc_req_dru_1', name: 'Древесный Амулет', description: 'Резной кусочек старого дуба.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { maxHp: 20, maxMp: 20 }, allowedClasses: ['Друид'] },
  { id: 'acc_req_dru_2', name: 'Сердце Леса', description: 'Пульсирующий зелёный камень.', type: 'accessory', rarity: 'epic', price: 15000, stats: { maxHp: 120, maxMp: 120, hpRegen: 10 }, allowedClasses: ['Друид', 'Шаман'] },
  // Бард
  { id: 'acc_req_bar_1', name: 'Брошь Вдохновения', description: 'Помогает брать высокие ноты.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { maxMp: 25, agility: 5 }, allowedClasses: ['Бард'] },
  { id: 'acc_req_bar_2', name: 'Амулет Музы', description: 'Делает голос проникающим в мысли.', type: 'accessory', rarity: 'epic', price: 15000, stats: { maxMp: 100, magicAttack: 20, agility: 20 }, allowedClasses: ['Бард'] },
  // Монах
  { id: 'acc_req_mon_1', name: 'Четки Спокойствия', description: 'Успокаивают разум в бою.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { agility: 5, maxHp: 20 }, allowedClasses: ['Монах', 'Боец'] },
  { id: 'acc_req_mon_2', name: 'Пояс Мастера Ци', description: 'Фокусирует внутреннюю энергию.', type: 'accessory', rarity: 'epic', price: 15000, stats: { agility: 25, attack: 20, dodgeChance: 10 }, allowedClasses: ['Монах', 'Боец'] },
  // Некромант
  { id: 'acc_req_nec_1', name: 'Костяное Кольцо', description: 'Палец давно умершего колдуна.', type: 'accessory', rarity: 'uncommon', price: 2500, stats: { magicAttack: 8, maxMp: 15 }, allowedClasses: ['Некромант', 'Рыцарь Смерти'] },
  { id: 'acc_req_nec_2', name: 'Кулон Проклятых', description: 'Пьет жизнь из своего врага.', type: 'accessory', rarity: 'epic', price: 15000, stats: { magicAttack: 35, maxMp: 100, lifesteal: 5 }, allowedClasses: ['Некромант', 'Чернокнижник'] }
];

let content = fs.readFileSync('items.ts', 'utf8');

const itemsJSON = NEW_ACC.map(a => `
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
console.log('Accessories added!');
