import fs from 'fs';

interface Race {
  id: string;
  name: string;
  description: string;
  buffs: {
    hp?: number;
    mp?: number;
    attack?: number;
    defense?: number;
    magicAttack?: number;
    magicDefense?: number;
    agility?: number;
    critRate?: number;
    critDamage?: number;
  }
}

// 100 unique fantasy races with minor balanced buffs
const RACES_DATA: Omit<Race, 'id'>[] = [
  // Humans & Near-Humans
  { name: 'Человек', description: 'Сбалансированная и адаптивная раса.', buffs: { hp: 10, mp: 10, attack: 1, defense: 1, agility: 1 } },
  { name: 'Высокий Человек', description: 'Отличаются высоким ростом и выносливостью.', buffs: { hp: 20, defense: 2 } },
  { name: 'Северянин', description: 'Суровые люди снегов.', buffs: { hp: 15, attack: 2 } },
  { name: 'Пустынник', description: 'Люди, привыкшие к зною и лишениям.', buffs: { agility: 3, hp: 10 } },
  { name: 'Полурослик', description: 'Маленькие, но очень ловкие.', buffs: { agility: 4, critRate: 2 } },
  
  // Elves
  { name: 'Высший Эльф', description: 'Гордые создания, предрасположенные к магии.', buffs: { magicAttack: 3, mp: 20 } },
  { name: 'Лесной Эльф', description: 'Эльфы, живущие в гармонии с лесом. Отличные стрелки.', buffs: { agility: 3, attack: 2 } },
  { name: 'Темный Эльф (Дроу)', description: 'Коварные эльфы подземного мира.', buffs: { magicAttack: 2, agility: 2, critDamage: 5 } },
  { name: 'Лунный Эльф', description: 'Черпают силу от лунного света.', buffs: { mp: 30, magicDefense: 2 } },
  { name: 'Солнечный Эльф', description: 'Несущие обжигающий свет.', buffs: { magicAttack: 4 } },
  { name: 'Снежный Эльф', description: 'Эльфы ледяных пустошей.', buffs: { defense: 2, magicDefense: 2 } },
  
  // Dwarves & Gnomes
  { name: 'Дворф (Гном)', description: 'Коренастые и невероятно крепкие воители.', buffs: { hp: 25, defense: 3 } },
  { name: 'Горный Дворф', description: 'Самые стойкие из своего рода.', buffs: { hp: 30, defense: 4, agility: -1 } },
  { name: 'Холмовой Дворф', description: 'Наделены отличным здоровьем.', buffs: { hp: 40 } },
  { name: 'Свирфнеблин', description: 'Глубинные гномы с предрасположенностью к скрытности.', buffs: { agility: 2, magicDefense: 3 } },
  { name: 'Карлик', description: 'Искусные механики с острым умом.', buffs: { magicAttack: 2, mp: 15 } },
  
  // Orcs, Goblins & Trollkind
  { name: 'Орк', description: 'Свирепые и сильные воины.', buffs: { attack: 4, hp: 15, magicAttack: -1 } },
  { name: 'Полуорк', description: 'Взяли силу орков и хитрость людей.', buffs: { attack: 3, hp: 10 } },
  { name: 'Урук-хай', description: 'Идеальные машины для убийства.', buffs: { attack: 5, critRate: 2 } },
  { name: 'Гоблин', description: 'Слабые, но необычайно вёрткие.', buffs: { agility: 5, attack: -1 } },
  { name: 'Хобгоблин', description: 'Дисциплинированные гоблины-воины.', buffs: { defense: 2, attack: 2 } },
  { name: 'Тролль', description: 'Огромные регенерирующие существа.', buffs: { hp: 50, agility: -2 } },
  { name: 'Огр', description: 'Крайне мощные, но неповоротливые.', buffs: { attack: 6, hp: 30, agility: -3 } },
  
  // Beastmen
  { name: 'Кицунэ (Человек-Лис)', description: 'Ловкие и магически одарённые лисицы.', buffs: { agility: 3, magicAttack: 2 } },
  { name: 'Некомата (Человек-Кот)', description: 'Исключительная грация и скорость.', buffs: { agility: 5, critRate: 3 } },
  { name: 'Лизардмен (Людоящер)', description: 'Покрыты плотной чешуей.', buffs: { defense: 4, hp: 10 } },
  { name: 'Драконид', description: 'Несут в себе кровь драконов.', buffs: { attack: 3, magicDefense: 3 } },
  { name: 'Минотавр', description: 'Полулюди-полубыки невероятной мощи.', buffs: { attack: 5, hp: 20 } },
  { name: 'Кентавр', description: 'Быстры как ветер.', buffs: { agility: 4, attack: 2 } },
  { name: 'Человек-Волк (Табакси/Вервольф)', description: 'Рожденные для охоты.', buffs: { attack: 3, agility: 2 } },
  { name: 'Человек-Медведь', description: 'Огромная физическая сила.', buffs: { attack: 4, defense: 2 } },
  { name: 'Человек-Ворон (Тенгу)', description: 'Внимательные и уклончивые.', buffs: { agility: 3, critDamage: 10 } },
  { name: 'Гнолл', description: 'Люди-гиены, обожающие хаос.', buffs: { critRate: 4, attack: 2 } },
  { name: 'Нага', description: 'Змеелюди, повелители ядов и магии.', buffs: { magicAttack: 3, defense: 2 } },
  
  // Undead & Demonic
  { name: 'Вампир', description: 'Питаются жизненной силой врагов.', buffs: { attack: 2, magicAttack: 2, hp: 10 } },
  { name: 'Высший Вампир', description: 'Древние властители ночи.', buffs: { magicAttack: 4, agility: 3 } },
  { name: 'Дампир', description: 'Полувампиры.', buffs: { attack: 2, agility: 2, hp: 10 } },
  { name: 'Скелет', description: 'Никогда не устают и не чувствуют боли.', buffs: { defense: 3, hp: 20 } },
  { name: 'Зомби', description: 'Медленные, но пугающе живучие.', buffs: { hp: 40, agility: -2 } },
  { name: 'Вурдалак', description: 'Кровожадные поедатели плоти.', buffs: { attack: 3, hp: 15 } },
  { name: 'Лич', description: 'Мастера некромантии.', buffs: { magicAttack: 5, mp: 30, hp: -10 } },
  { name: 'Призрак', description: 'Бестелесные сущности.', buffs: { magicDefense: 5, defense: 5, attack: -2, hp: -10 } },
  
  // Fiends & Celestial
  { name: 'Тифлинг', description: 'В их жилах течет кровь демонов.', buffs: { magicAttack: 3, critRate: 2 } },
  { name: 'Камбион', description: 'Полудемоны.', buffs: { attack: 3, magicAttack: 2 } },
  { name: 'Импы (Суккубы/Инкубы)', description: 'Мастера обмана и иллюзий.', buffs: { magicAttack: 3, agility: 2 } },
  { name: 'Демон', description: 'Порождение инфернальных планов.', buffs: { attack: 4, hp: 20 } },
  { name: 'Аазимар', description: 'Несут в себе божественный свет.', buffs: { magicDefense: 4, magicAttack: 2 } },
  { name: 'Нефилим', description: 'Падшие ангелы.', buffs: { attack: 3, magicAttack: 3 } },
  { name: 'Ангел', description: 'Слуги небес.', buffs: { magicDefense: 3, defense: 2, hp: 20 } },
  { name: 'Валькирия', description: 'Крылатые девы-воительницы.', buffs: { attack: 3, agility: 3 } },
  
  // Elementals
  { name: 'Ифрит (Огненный Дженази)', description: 'Существа из чистого пламени.', buffs: { magicAttack: 4, attack: 1 } },
  { name: 'Ундина (Водный Дженази)', description: 'Дети водоемов.', buffs: { mp: 30, magicDefense: 3 } },
  { name: 'Сильф (Воздушный Дженази)', description: 'Легкие как бриз.', buffs: { agility: 6 } },
  { name: 'Гном (Земляной Дженази)', description: 'Крепкие как скала.', buffs: { defense: 5, hp: 10 } },
  { name: 'Элементаль Льда', description: 'Созданы из вечной мерзлоты.', buffs: { magicDefense: 4, defense: 2 } },
  { name: 'Элементаль Молнии', description: 'Потрескивают от электричества.', buffs: { magicAttack: 3, agility: 3 } },
  { name: 'Дух Тени', description: 'Растворяются во мраке.', buffs: { agility: 4, critRate: 3 } },
  
  // Nature & Plant
  { name: 'Энт (Древень)', description: 'Шагающие деревья.', buffs: { hp: 60, agility: -4 } },
  { name: 'Дриада', description: 'Духи леса.', buffs: { magicAttack: 3, hp: 15 } },
  { name: 'Мандрагора', description: 'Разумные корни.', buffs: { mp: 20, magicDefense: 3 } },
  { name: 'Сарриен (Растение-человек)', description: 'Полулюди из симбиоза лозы.', buffs: { hp: 20, defense: 2 } },
  
  // Aquatic
  { name: 'Мерфолк (Сирена)', description: 'Хозяева морских глубин.', buffs: { mp: 20, agility: 2 } },
  { name: 'Тритон', description: 'Отличные воины под водой.', buffs: { attack: 2, defense: 2 } },
  { name: 'Акулочеловек', description: 'Свирепые водные охотники.', buffs: { attack: 4, hp: 10 } },
  { name: 'Краболюд', description: 'Имеют невероятно прочный панцирь.', buffs: { defense: 6, agility: -2 } },
  
  // Insectoid
  { name: 'Арахнид (Чародей-паук)', description: 'Хитрые ткачи судьбы.', buffs: { agility: 3, magicAttack: 2 } },
  { name: 'Мантис', description: 'Разумные богомолы с острыми лезвиями.', buffs: { attack: 3, critRate: 5 } },
  { name: 'Рой', description: 'Множество жуков в виде человека.', buffs: { defense: 3, hp: 15 } },
  { name: 'Скорпионоид', description: 'Имеют смертоносный ядовитый хвост.', buffs: { attack: 4, defense: 2 } },
  
  // Constructs & Artificial
  { name: 'Голем (Каменный)', description: 'Оживленные магией статуи.', buffs: { hp: 40, defense: 3, agility: -3 } },
  { name: 'Железный Голем', description: 'Практически непробиваемы.', buffs: { defense: 6, hp: 10, agility: -4 } },
  { name: 'Кованый (Варфордж)', description: 'Разумные механизмы.', buffs: { defense: 4, attack: 1 } },
  { name: 'Гомункул', description: 'Искусственно созданная жизнь.', buffs: { magicAttack: 2, mp: 20 } },
  
  // Cosmic & Weird
  { name: 'Аберрация', description: 'Пришедшие из-за грани реальности.', buffs: { magicAttack: 4, magicDefense: 4, hp: -10 } },
  { name: 'Иллитид (Пожиратель Разума)', description: 'Управляют сознанием других.', buffs: { magicAttack: 6, attack: -2 } },
  { name: 'Астральный Странник', description: 'Родом из звездных пустот.', buffs: { mp: 40, magicDefense: 2 } },
  { name: 'Пустотник', description: 'Создания энтропии.', buffs: { critDamage: 15, agility: 2 } },
  { name: 'Эхо', description: 'Копия кого-то, кто давно погиб.', buffs: { agility: 3, magicDefense: 2 } },
  { name: 'Мимик', description: 'Способны менять свою форму.', buffs: { hp: 15, defense: 2 } },
  
  // Mythological
  { name: 'Горгулья', description: 'Каменные крылатые защитники.', buffs: { defense: 5, agility: 1 } },
  { name: 'Кентавр', description: 'Легендарные гибриды.', buffs: { attack: 3, agility: 3 } },
  { name: 'Циклоп', description: 'Одноглазые гиганты', buffs: { attack: 5, hp: 20, critRate: -2 } },
  { name: 'Джинн', description: 'Существа из чистой магии.', buffs: { magicAttack: 4, mp: 25 } },

  // Goblins & little ones extra
  { name: 'Кендер', description: 'Очень любопытные и бесстрашные.', buffs: { agility: 5, mp: 10 } },
  { name: 'Гремлин', description: 'Ломают всё, к чему прикасаются.', buffs: { attack: 2, agility: 3, critRate: 3 } },
  { name: 'Кобольд', description: 'Маленькие дальние родственники драконов.', buffs: { agility: 4, magicDefense: 2 } },
  { name: 'Мурлок', description: 'Мглррмгл!', buffs: { agility: 3, hp: 10 } },
  
  // Shifters
  { name: 'Метаморф (Шифтер)', description: 'Меняют свой облик.', buffs: { agility: 2, defense: 2, attack: 2 } },
  { name: 'Чейнджлинг', description: 'Легко мимикрируют под других.', buffs: { magicDefense: 2, agility: 3 } },

  // Miscellaneous extra races to hit ~100
  { name: 'Йети', description: 'Обитатели заоблачных вершин.', buffs: { hp: 30, attack: 3 } },
  { name: 'Гарпия', description: 'Полуптицы.', buffs: { agility: 5, attack: 1 } },
  { name: 'Сатир', description: 'Любители выпивки и веселья.', buffs: { mp: 20, agility: 3 } },
  { name: 'Грифон', description: 'Благородные пернатые львы.', buffs: { attack: 4, agility: 2 } },
  { name: 'Киклоп', description: 'Ужасающие здоровяки.', buffs: { hp: 35, attack: 4 } },
  { name: 'Гуль', description: 'Падальщики кладбищ.', buffs: { attack: 3, agility: 2 } },
  { name: 'Дух Леса', description: 'Сгусток природной энергии.', buffs: { magicAttack: 3, mp: 25 } },
  { name: 'Черный Орк', description: 'Элита орочьего племени.', buffs: { attack: 5, defense: 2 } },
  { name: 'Серый Эльф', description: 'Истинные аристократы в магии.', buffs: { magicAttack: 5, mp: 10 } },
  { name: 'Мурелья', description: 'Крысолюди-ассасины.', buffs: { agility: 6, critRate: 5 } },
  { name: 'Дварф Хаоса', description: 'Злобные архитекторы.', buffs: { defense: 4, magicAttack: 2 } },
  { name: 'Человек-Акула', description: 'Мастера кровожадности.', buffs: { attack: 5, critRate: 2 } },
  { name: 'Сирена', description: 'Очаровывают своим голосом.', buffs: { magicAttack: 2, mp: 30 } },
  { name: 'Камнегрыз', description: 'Жуют драгоценные камни для силы.', buffs: { defense: 5, hp: 15 } }
];

let counter = 1;
const RACE_CATALOG = RACES_DATA.map(r => ({
  id: `race_${counter++}`,
  name: r.name,
  description: r.description,
  buffs: r.buffs
}));

let fileContent = `export interface RaceStats {
  hp?: number;
  mp?: number;
  attack?: number;
  defense?: number;
  magicAttack?: number;
  magicDefense?: number;
  agility?: number;
  critRate?: number;
  critDamage?: number;
}

export interface Race {
  id: string;
  name: string;
  description: string;
  buffs: RaceStats;
}

export const RACE_CATALOG: Record<string, Race> = {};
export const RACES_LIST: Race[] = [];

`;

RACE_CATALOG.forEach(r => {
   fileContent += `RACE_CATALOG['${r.id}'] = ${JSON.stringify(r)};\n`;
   fileContent += `RACES_LIST.push(RACE_CATALOG['${r.id}']);\n`;
});

fs.writeFileSync('races.ts', fileContent);
console.log(`Generated ${RACE_CATALOG.length} races`);
