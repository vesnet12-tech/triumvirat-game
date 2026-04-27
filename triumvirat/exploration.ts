import { Keyboard, MessageContext } from 'vk-io';
import { WORLD_LOCATIONS } from './locations.js';
import { generateEnemy } from './combat.js';
import { MONSTER_CATALOG } from './monsters.js';
import { getItem, buildItemId } from './items.js';

const PATH_OPTIONS = [
  { label: '⬅️ Налево', cmd: 'explore_path_1' },
  { label: '➡️ Направо', cmd: 'explore_path_2' },
  { label: '⬆️ Прямо', cmd: 'explore_path_3' },
  { label: '🌲 В чащу', cmd: 'explore_path_5' },
  { label: '🧗 На гору', cmd: 'explore_climb' },
  { label: '🌊 К реке', cmd: 'explore_river' },
  { label: '🌑 В пещеру', cmd: 'explore_cave' },
  { label: '🌸 На поляну', cmd: 'explore_glade' },
  { label: '🪵 К вырубке', cmd: 'explore_logging' },
  { label: '🍄 В грибницу', cmd: 'explore_mushrooms' },
  { label: '🏚️ К заброшенной хижине', cmd: 'explore_cabin' },
  { label: '🌿 В густые заросли', cmd: 'explore_thicket' }
];

function generatePaths(excludeCmd: string = '') {
   const available = PATH_OPTIONS.filter(p => p.cmd !== excludeCmd);
   const shuffled = available.sort(() => 0.5 - Math.random());
   return shuffled.slice(0, 3);
}


export function getExplorationKeyboard(char: any) {
  const depth = char.rpg.locationDepth || 1;
  const kb = Keyboard.builder();
  const expState = char.rpg.exploreState;

  if (expState === 'enemy_spotted') {
      kb.textButton({ label: '⚔️ Напасть', payload: { command: 'explore_attack' }, color: Keyboard.NEGATIVE_COLOR })
        .textButton({ label: '🥷 Скрытно пройти', payload: { command: 'explore_stealth' }, color: Keyboard.PRIMARY_COLOR })
        .row()
        .textButton({ label: '⬅️ Отступить', payload: { command: 'explore_flee' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }

  if (expState === 'obstacle') {
      kb.textButton({ label: '🏃 Перепрыгнуть', payload: { command: 'explore_off_path' }, color: Keyboard.PRIMARY_COLOR })
        .textButton({ label: '🚶 Обойти', payload: { command: 'explore_around' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }

  if (expState === 'merchant') {
      kb.textButton({ label: '💰 Торговать', payload: { command: 'explore_trade' }, color: Keyboard.PRIMARY_COLOR })
        .textButton({ label: '⬅️ Уйти', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }
  
  if (expState === 'dead_end') {
      kb.textButton({ label: '⬅️ Вернуться назад', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }
  
  if (expState === 'npc_encounter') {
      kb.textButton({ label: '💬 Поговорить', payload: { command: 'explore_talk' }, color: Keyboard.PRIMARY_COLOR })
        .textButton({ label: '⬅️ Пройти мимо', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }
  
  if (expState === 'healing_stream') {
      kb.textButton({ label: '💧 Наполнить зелье и выпить', payload: { command: 'explore_drink_stream' }, color: Keyboard.POSITIVE_COLOR })
        .textButton({ label: '⬅️ Пройти мимо', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
      return kb;
  }

  if (!char.rpg.dynamicPaths || char.rpg.dynamicPaths.length === 0) {
      char.rpg.dynamicPaths = generatePaths('');
  }
  
  // Default dynamic exploration choices
  const paths = char.rpg.dynamicPaths;
  for (let i = 0; i < paths.length; i++) {
     kb.textButton({ label: paths[i].label, payload: { command: paths[i].cmd }, color: Keyboard.PRIMARY_COLOR });
     if (i === 1) kb.row(); // row break after 2 items
  }
  kb.row();

  if (char.rpg.foundNextDepth && depth < 3) {
    const nextKb = Keyboard.builder()
      .textButton({ label: `⬇️ Спуститься на Ур. ${depth + 1}`, payload: { command: 'go_deeper' }, color: Keyboard.POSITIVE_COLOR })
      .row()
      .textButton({ label: '⬅️ Остаться (потерять путь)', payload: { command: 'explore_leave_next' }, color: Keyboard.SECONDARY_COLOR });
    return nextKb;
  }
  
  if (char.rpg.foundBoss && depth === 3) {
    const bossKb = Keyboard.builder()
      .textButton({ label: `👹 Сразиться с Боссом`, payload: { command: 'boss_fight' }, color: Keyboard.NEGATIVE_COLOR })
      .row()
      .textButton({ label: '⬅️ Отступить (потерять след)', payload: { command: 'explore_leave_boss' }, color: Keyboard.SECONDARY_COLOR });
    return bossKb;
  }

  return kb.textButton({ label: '🏰 Вернуться в город', payload: { command: 'travel_city' }, color: Keyboard.POSITIVE_COLOR });
}

export function handleExplorationEvent(char: any, command: string): { msg: string, enemyToFight?: any } {
   const locId = char.location;
   const loc = WORLD_LOCATIONS.find(l => l.id === locId);
   const depth = char.rpg.locationDepth || 1;
   
   const overrideRoll = Math.random();
   if (overrideRoll < 0.01) {
       // 1% exact chance for healing stream
       char.rpg.exploreState = 'healing_stream';
       return { msg: `💧 Вы нашли бьющий из-под земли целебный источник. Вода кристально чистая и сверкает.` };
   } else if (overrideRoll < 0.03) {
       // 2% exact chance (0.01 to 0.03) for potion
       char.rpg.inventory = char.rpg.inventory || [];
       let pot = 'cons_1';
       let potName = 'Малое зелье здоровья';
       const r = Math.random() * 125;
       if (r < 5) {
           pot = 'cons_4';
           potName = 'Эликсир Жизни';
       } else if (r < 15) {
           pot = 'cons_3';
           potName = 'Большое зелье здоровья';
       } else if (r < 45) {
           pot = 'cons_2';
           potName = 'Среднее зелье здоровья';
       }
       
       const ex = char.rpg.inventory.find((i:any)=>i.itemId===pot);
       if (ex) ex.amount++;
       else char.rpg.inventory.push({ itemId: pot, amount: 1 });
       return { msg: `💫 Осматривая кусты, вы нашли ${potName}!` };
   }
   
   // Re-roll dynamic paths on move
   char.rpg.dynamicPaths = generatePaths(command);
   
   let eventTableOpts = [
      { type: 'monster', weight: 40 },
      { type: 'treasure', weight: 12 },
      { type: 'merchant', weight: 8 },
      { type: 'trap', weight: 12 },
      { type: 'evil_npc', weight: 8 },
      { type: 'nothing', weight: 10 },
      { type: 'obstacle', weight: 5 },
      { type: 'dead_end', weight: 5 }
   ];
   
   if (depth < 3 && !char.rpg.foundNextDepth) {
      eventTableOpts.push({ type: 'next_depth', weight: 15 });
   }
   if (depth === 3 && !char.rpg.foundBoss) {
      eventTableOpts.push({ type: 'boss', weight: 15 });
   }

   const totalWeight = eventTableOpts.reduce((acc, curr) => acc + curr.weight, 0);
   const roll = Math.random() * totalWeight;
   let currentWeight = 0;
   let chosenType = 'nothing';
   for (const ev of eventTableOpts) {
     currentWeight += ev.weight;
     if (roll <= currentWeight) {
        chosenType = ev.type;
        break;
     }
   }
   
   // Apply Event
   if (chosenType === 'monster') {
      const isNight = new Date().getHours() < 6 || new Date().getHours() > 22;
      const enemy = generateEnemy(char.rpg.level || 1, undefined, locId);
      char.rpg.exploreState = 'enemy_spotted';
      char.rpg.exploreEnemy = enemy;
      return { 
          msg: `⚠️ На дороге впереди вы замечаете врага: ${enemy.name}. Он вас пока не видит. Что будете делать?`
      };
   }
   
   if (chosenType === 'evil_npc') {
      const classes = ['Вор', 'Наемник', 'Ренегат', 'Бандит-Маг'];
      const eClass = classes[Math.floor(Math.random() * classes.length)];
      const enemy = generateEnemy(char.rpg.level || 1, undefined, locId) as any;
      enemy.name = `Агрессивный ${eClass}`;
      enemy.isNpc = true;
      enemy.npcClass = eClass;
      enemy.maxHp = Math.floor(enemy.maxHp * 1.5);
      enemy.hp = enemy.maxHp;
      return {
          msg: `🗡️ На вас внезапно выскакивает ${enemy.name}! "А ну стой! Гони золото, пока зубы целы!" - кричит он и бросается в атаку!`,
          enemyToFight: enemy
      };
   }
   
   if (chosenType === 'obstacle') {
       char.rpg.exploreState = 'obstacle';
       return { msg: `🧗 Вы уткнулись в преграду на пути.\n\nВы можете попытаться преодолеть её рывком или медленно обойти.` };
   }
   
   if (chosenType === 'healing_stream') {
       char.rpg.exploreState = 'healing_stream';
       return { msg: `✨ Вы обнаружили чистый целебный ручей. Его вода слабо светится.` };
   }
   
   if (chosenType === 'dead_end') {
       char.rpg.exploreState = 'dead_end';
       return { msg: `⛔ Оказалось, что эта тропа ведет в глухой тупик. Придется вернуться назад.` };
   }
   
   if (chosenType === 'merchant') {
       char.rpg.exploreState = 'merchant';
       return { msg: '🧙‍♂️ Вы наткнулись на палатку странствующего торговца! Хотите посмотреть его товары?' };
   }
   
   if (chosenType === 'npc_encounter') {
       char.rpg.exploreState = 'npc_encounter';
       return { msg: '👤 Впереди маячит фигура. Кажется, это один из местных. Хотите подойти и заговорить?' };
   }
   
   // Instant resolution events
   char.rpg.exploreState = null;
   
   if (chosenType === 'treasure') {
      const isGold = Math.random() < 0.5;
      if (isGold) {
         const gold = Math.floor(Math.random() * 50) + depth * 50;
         char.gold = (char.gold || 0) + gold;
         return { msg: `💫 Вы нашли спрятанный тайник! Внутри оказалось ${gold} 💰.` };
      } else {
         const hasStone = Math.random() < 0.3;
         if (hasStone) {
             const stones = ['enhance_stone_uncommon', 'enhance_stone_rare'];
             const sId = stones[Math.floor(Math.random() * stones.length)];
             const s = getItem(sId);
             if (char.rpg.inventory.length < 30) {
                 char.rpg.inventory = char.rpg.inventory || [];
                 const ex = char.rpg.inventory.find((i:any)=>i.itemId===sId);
                 if (ex) ex.amount++;
                 else char.rpg.inventory.push({ itemId: sId, amount: 1 });
                 return { msg: `💫 Вы нашли древний алтарь и забрали с него ${s?.name}!` };
             }
         }
         
         char.rpg.inventory = char.rpg.inventory || [];
         let pot = 'cons_1';
         let potName = 'Малое зелье здоровья';
         const r = Math.random() * 125;
         if (r < 5) {
             pot = 'cons_4';
             potName = 'Эликсир Жизни';
         } else if (r < 15) {
             pot = 'cons_3';
             potName = 'Большое зелье здоровья';
         } else if (r < 45) {
             pot = 'cons_2';
             potName = 'Среднее зелье здоровья';
         }
         
         const ex = char.rpg.inventory.find((i:any)=>i.itemId===pot);
         if (ex) ex.amount++;
         else char.rpg.inventory.push({ itemId: pot, amount: 1 });
         return { msg: `💫 Возле старого лагеря вы нашли ${potName}!` };
      }
   }
   
   if (chosenType === 'trap') {
       if (Math.random() < 0.5) {
           return { msg: `💨 Ловушка сработала, но вы успели увернуться в последний момент!` };
       }
       const hpLoss = Math.max(1, Math.floor((char.rpg.baseStats?.hp || 10) * 0.15));
       char.rpg.baseStats.hp = Math.max(1, char.rpg.baseStats.hp - hpLoss);
       let trapMsg = `🩸 Вы наступили на скрытую ловушку! Потеряно ${hpLoss} ХП.`;
       if (locId === 'loc_forest_whispering') {
          const forestTraps = [
             "Ядовитые шипы упали с ветвей!",
             "Вы провалились в охотничью волчью яму!",
             "Странная лиана обожгла вам руку!",
             "Споры грибов вызвали сильный кашель и слабость."
          ];
          trapMsg = `🩸 ${forestTraps[Math.floor(Math.random() * forestTraps.length)]} Потеряно ${hpLoss} ХП.`;
       }
       return { msg: trapMsg };
   }
   
   if (chosenType === 'next_depth') {
       char.rpg.foundNextDepth = true;
       return { msg: `🌌 Вы зашли глубже и нашли безопасный спуск на следующий уровень локации (Ур. ${depth + 1})!` };
   }
   
   if (chosenType === 'boss') {
       char.rpg.foundBoss = true;
       return { msg: `☠️ Путь привел вас к огромным вратам. За ними слышно тяжелое дыхание Владыки этой зоны (Босс).` };
   }
   
   let atmospheric = [
      "Вы продираетесь сквозь заросли. Вокруг тихо.",
      "Ничего необычного, только следы диких животных.",
      "Здесь недавно кто-то побывал. Костер еще теплый.",
      "Вдалеке слышен вой, но на вашем пути никого нет.",
      "Вы идете по тропинке, ветер слабо колышет ветви деревьев.",
      "Вы слышите странный шум, но он быстро стихает.",
      "Путник, шедший здесь до вас, оставил зарубку на дереве.",
   ];

   if (locId === 'loc_forest_whispering') {
       atmospheric.push(
         "Деревья в Шепчущем лесу тихо скрипят. Кажется, что они разговаривают.",
         "Светлячки кружат вокруг старого пня. Вы нашли несколько целебных трав на обочине, но они иссохли.",
         "Вы слышите странный шепот прямо над ухом: 'Уходи...'. Обернувшись, никого не замечаете.",
         "Вы замечаете странные грибы, которые светятся тусклым фиолетовым светом.",
         "Ветер пробегает по листве, и вам на мгновение кажется, что лес вздыхает.",
         "Странная тень мелькнула за деревьями и тут же исчезла. Вы крепче сжимаете оружие.",
         "Древние корни переплетают тропу, заставляя переступать через них с осторожностью."
       );
   }

   return { msg: `🍃 ${atmospheric[Math.floor(Math.random()*atmospheric.length)]}` };
}
