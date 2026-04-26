export interface ArenaNPC {
  id: string;
  name: string;
  charClass: string;
  avatar?: string;
  description: string;
}

export const ARENA_NPCS: ArenaNPC[] = [
  { id: 'arena_npc_1', name: 'Гаррош Костолом', charClass: 'Варвар', description: 'Свирепый воин, который никогда не проигрывал в честном бою.' },
  { id: 'arena_npc_2', name: 'Лираэль Тень', charClass: 'Ассасин', description: 'Ловкая убийца из далеких земель, чьи кинжалы всегда находят цель.' },
  { id: 'arena_npc_3', name: 'Игниций Пламенный', charClass: 'Пиромант', description: 'Вспыльчивый маг, предпочитающий превращать арену в пепелище.' },
  { id: 'arena_npc_4', name: 'Торвальд Железный', charClass: 'Рыцарь', description: 'Непробиваемый танк арены, закованный в тяжелую броню.' },
  { id: 'arena_npc_5', name: 'Эльдария Лучница', charClass: 'Охотник', description: 'Точный стрелок, который поражает врагов издалека, не дав им подойти.' },
  { id: 'arena_npc_6', name: 'Малкорн Темный', charClass: 'Некромант', description: 'Использует темную магию и проклятия, чтобы ослабить своих противников.' },
  { id: 'arena_npc_7', name: 'Фрейя Исцеляющая', charClass: 'Жрец', description: 'Боевая жрица, способная как исцелять, так и карать светом.' },
  { id: 'arena_npc_8', name: 'Зефир Неуловимый', charClass: 'Монах', description: 'Мастер боевых искусств, использующий энергию Ци для молниеносных ударов.' },
  { id: 'arena_npc_9', name: 'Бальтазар Дикий', charClass: 'Друид', description: 'В бою часто принимает облик свирепого медведя или стаи волков.' },
  { id: 'arena_npc_10', name: 'Сильвана Ветрокрылая', charClass: 'Бард', description: 'Завораживает противников своими песнями, прежде чем нанести смертельный удар.' }
];

// Special Arena Items (Token shop)
export const ARENA_ITEMS = [
  { itemId: 'wpn_7', id: 'wpn_7', name: 'Кровавый клинок (Epic)', cost: 150, type: 'weapon', statsMult: 1.5 },
  { itemId: 'arm_6', id: 'arm_6', name: 'Ледяная мантия теней (Epic)', cost: 200, type: 'armor', statsMult: 1.5 },
  { itemId: 'acc_5', id: 'acc_5', name: 'Древний кристалл Титана (Epic)', cost: 250, type: 'accessory', statsMult: 2 },
  { itemId: 'wpn_8', id: 'wpn_8', name: 'Великий Посох Архимага (Legendary)', cost: 500, type: 'weapon', statsMult: 3 },
  { itemId: 'arm_7', id: 'arm_7', name: 'Таинственная чешуя Дракона (Legendary)', cost: 500, type: 'armor', statsMult: 3 }
];
