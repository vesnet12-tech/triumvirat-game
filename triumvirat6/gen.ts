import fs from 'fs';
import { WORLD_LOCATIONS, LocationData } from './locations.js';

const biomeAdjectives: Record<string, string[]> = {
  city: ['Уличный', 'Теневой', 'Зараженный', 'Озверевший', 'Свирепый', 'Вороватый', 'Безумный', 'Безжалостный'],
  forest: ['Дикий', 'Лесной', 'Корневой', 'Ядовитый', 'Темный', 'Древний', 'Свирепый', 'Кровавый', 'Чащобный'],
  cave: ['Пещерный', 'Глубинный', 'Каменный', 'Кристальный', 'Слепой', 'Омерзительный', 'Эхо-', 'Подземный'],
  dungeon: ['Проклятый', 'Скелетный', 'Ритуальный', 'Безжалостный', 'Мутировавший', 'Скрытный', 'Темный'],
  mountain: ['Горный', 'Морозный', 'Скалистый', 'Громовой', 'Парящий', 'Пепельный', 'Снежный', 'Ветреный'],
  ruins: ['Павший', 'Восставший', 'Древний', 'Призрачный', 'Бездушный', 'Ржавый', 'Забытый'],
  plains: ['Степной', 'Ветреный', 'Солнечный', 'Блуждающий', 'Одинокий', 'Костяной', 'Дикий'],
  swamp: ['Смердящий', 'Чумной', 'Гнилой', 'Топкий', 'Жабий', 'Мутный', 'Трясинный'],
  wasteland: ['Изнеможденный', 'Пепельный', 'Скорпионий', 'Жгучий', 'Пустотный', 'Безумный'],
  island: ['Береговой', 'Тропический', 'Утонувший', 'Морской', 'Соленый', 'Песчаный']
};

const biomeNouns: Record<string, string[]> = {
  city: ['Вор', 'Крысолак', 'Бандит', 'Убийца', 'Головорез', 'Пёс', 'Мутант', 'Скунс', 'Слизень', 'Грабитель'],
  forest: ['Волк', 'Паук', 'Медведь', 'Энт', 'Охотник', 'Гоблин', 'Орк', 'Слизень', 'Кабан', 'Жук'],
  cave: ['Нетопырь', 'Тролль', 'Голем', 'Червь', 'Кобольд', 'Скелет', 'Скорпион', 'Слизень', 'Жук', 'Демон'],
  dungeon: ['Страж', 'Культист', 'Воин', 'Некромант', 'Вурдалак', 'Упырь', 'Мясник', 'Палач', 'Минотавр', 'Горгулья'],
  mountain: ['Грифон', 'Йети', 'Тролль', 'Элементаль', 'Гарпия', 'Голем', 'Орел', 'Дракон', 'Громовержец', 'Огр'],
  ruins: ['Призрак', 'Лич', 'Маг', 'Зомби', 'Бандит', 'Мародер', 'Конструкт', 'Убийца', 'Воин Тьмы', 'Осквернитель'],
  plains: ['Стервятник', 'Гиена', 'Кабан', 'Элементаль', 'Голем', 'Гарпия', 'Леопард', 'Разбойник', 'Сайгак', 'Шаман'],
  swamp: ['Утопленник', 'Трясинник', 'Грибовик', 'Пиявка', 'Змей', 'Крокодил', 'Слизень', 'Огонек', 'Ведьмак', 'Грязевик'],
  wasteland: ['Скорпион', 'Червь', 'Пустотник', 'Элементаль', 'Скелет', 'Мародер', 'Муравей', 'Саранча', 'Стервятник', 'Безумец'],
  island: ['Мурлок', 'Краб', 'Пират', 'Утопленник', 'Слизень', 'Ящер', 'Рыбочеловек', 'Черепах', 'Убийца', 'Сирена']
};

const mobSkills = [
  'mob_skill_steal_turn', 'mob_skill_pack_howl', 'mob_skill_laceration', 
  'mob_skill_magic_shield', 'mob_skill_flash', 'mob_skill_crushing',
  'mob_skill_acid_spit', 'mob_skill_web', 'mob_skill_charge', 
  'mob_skill_life_drain', 'mob_skill_fireball', 'mob_skill_frostbolt', 
  'mob_skill_screech', 'mob_skill_smash', 'mob_skill_bite', 'mob_skill_poison_sting'
];

const monsters: any = {};
const newLocations: LocationData[] = [];
const rarityPool = ['common', 'common', 'common', 'uncommon', 'uncommon', 'rare'];

let mobCounter = 0;

for (const loc of WORLD_LOCATIONS) {
  const locMonsters: string[] = [];
  const numMonsters = Math.floor(Math.random() * 3) + 7; // 7 to 9 monsters per loc
  
  const bAdjectives = biomeAdjectives[loc.type] || biomeAdjectives['forest'];
  const bNouns = biomeNouns[loc.type] || biomeNouns['forest'];

  for (let i = 0; i < numMonsters; i++) {
    mobCounter++;
    const adj = bAdjectives[Math.floor(Math.random() * bAdjectives.length)];
    const noun = bNouns[Math.floor(Math.random() * bNouns.length)];
    let rarity = rarityPool[Math.floor(Math.random() * rarityPool.length)];
    if (i === numMonsters - 1) rarity = 'boss'; // Guarantee 1 boss per location

    const id = `mob_${loc.id}_${mobCounter}`;
    const name = `${adj} ${noun}`;
    
    let scaleLevel = loc.levelMin + Math.floor(Math.random() * ((loc.levelMax > loc.levelMin ? loc.levelMax : loc.levelMin + 5) - loc.levelMin + 1));
    if (scaleLevel < 1) scaleLevel = 1;

    const hpMultiplier = rarity === 'boss' ? 50 : rarity === 'rare' ? 25 : rarity === 'uncommon' ? 15 : 10;
    const hp = scaleLevel * hpMultiplier;
    const atkMultiplier = rarity === 'boss' ? 4 : (rarity === 'rare' ? 2.5 : (rarity === 'uncommon' ? 1.8 : 1.2));
    const attack = Math.floor(scaleLevel * atkMultiplier) + 5;
    const defMultiplier = rarity === 'boss' ? 2.5 : (rarity === 'rare' ? 1.5 : (rarity === 'uncommon' ? 1.0 : 0.5));
    const defense = Math.floor(scaleLevel * defMultiplier);
    const agility = Math.floor(Math.random() * 15) + (rarity === 'boss' ? 10 : 0);

    const mkSkills: string[] = [];
    const numSkills = rarity === 'boss' ? 3 : (rarity === 'rare' ? 2 : 1);
    for (let s=0; s<numSkills; s++) {
      mkSkills.push(mobSkills[Math.floor(Math.random() * mobSkills.length)]);
    }

    monsters[id] = {
      id,
      name,
      rarity: rarity as any,
      level: scaleLevel,
      hp,
      attack,
      defense,
      agility,
      loot: [],
      skills: [...new Set(mkSkills)] // unique skills
    };
    locMonsters.push(id);
  }
  
  newLocations.push({ ...loc, monsters: locMonsters });
}

let resMonsters = `export interface MonsterLoot {
  itemId: string;
  chance: number; // 0.0 to 1.0
}

export interface Monster {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'boss';
  level: number;
  hp: number;
  attack: number;
  defense: number;
  agility: number;
  loot: MonsterLoot[];
  skills?: string[]; // IDs of skills
}

export const MONSTER_CATALOG: Record<string, Monster> = ${JSON.stringify(monsters, null, 2)};
`;
fs.writeFileSync('monsters.ts', resMonsters);

let resLocations = `export interface LocationData {
  id: string;
  name: string;
  type: 'city' | 'forest' | 'cave' | 'dungeon' | 'mountain' | 'ruins' | 'plains' | 'swamp' | 'wasteland' | 'island';
  levelMin: number;
  levelMax: number;
  description: string;
  monsters?: string[];
}

export const WORLD_LOCATIONS: LocationData[] = ${JSON.stringify(newLocations, null, 2)};
`;
fs.writeFileSync('locations.ts', resLocations);
console.log(`Generated ${Object.keys(monsters).length} monsters across ${newLocations.length} locations!`);
