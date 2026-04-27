import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

// 1. In guild_menu, add "Мое задание" button if char has active quest
code = code.replace(
  /color: Keyboard\.PRIMARY_COLOR \}\)/,
  `color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: (char.rpg?.activeQuest ? '🔴 Мое задание' : '📋 Управление заданием'), payload: { command: 'guild_my_quest' }, color: (char.rpg?.activeQuest ? Keyboard.NEGATIVE_COLOR : Keyboard.SECONDARY_COLOR) })`
);

// 2. Add guild_my_quest logic
const myQuestLogic = `
        if (payloadCommand === 'guild_my_quest') {
          if (!char.rpg.activeQuest) {
             const kb = Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
             await context.send({ message: 'У вас нет активного задания.', keyboard: kb });
             return;
          }
          const q = char.rpg.activeQuest;
          const kb = Keyboard.builder();
          let msg = \`🔴 Текущее задание:\\n[$\{q.rank}-ранг] $\{q.title}\\n$\{q.desc}\\nПрогресс: $\{q.progress || 0} / $\{q.targetCount}\\nНаграда: $\{q.goldReward}💰 $\{q.xpReward} XP\\n\`;
          
          let canComplete = false;
          if (q.type === 'gather') {
             const invItem = (char.rpg.inventory || []).find((i: any) => i.itemId === q.targetId);
             const amount = invItem ? invItem.amount : 0;
             msg += \`\\nВ инвентаре нужных предметов: $\{amount} / $\{q.targetCount}\`;
             if (amount >= q.targetCount) canComplete = true;
          } else {
             if ((q.progress || 0) >= q.targetCount) canComplete = true;
          }

          if (canComplete) {
             kb.textButton({ label: '✅ Сдать задание', payload: { command: 'guild_complete_quest' }, color: Keyboard.POSITIVE_COLOR }).row();
          }
          kb.textButton({ label: '❌ Отклонить/Уйти', payload: { command: 'guild_abandon_quest' }, color: Keyboard.NEGATIVE_COLOR }).row();
          kb.textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_abandon_quest') {
          char.rpg.activeQuest = null;
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          const kb = Keyboard.builder().textButton({ label: '⬅️ В гильдию', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: 'Вы отказались от задания.', keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_complete_quest') {
          if (!char.rpg.activeQuest) return;
          const q = char.rpg.activeQuest;
          
          let canComplete = false;
          if (q.type === 'gather') {
             const invIndex = (char.rpg.inventory || []).findIndex((i: any) => i.itemId === q.targetId);
             if (invIndex >= 0 && char.rpg.inventory[invIndex].amount >= q.targetCount) {
                 char.rpg.inventory[invIndex].amount -= q.targetCount;
                 if (char.rpg.inventory[invIndex].amount <= 0) char.rpg.inventory.splice(invIndex, 1);
                 canComplete = true;
             }
          } else {
             if ((q.progress || 0) >= q.targetCount) canComplete = true;
          }

          if (canComplete) {
             char.gold = (char.gold || 0) + q.goldReward;
             const leveledUp = addXp(char.rpg, q.xpReward);
             if (!char.rpg.completedQuests) char.rpg.completedQuests = [];
             char.rpg.completedQuests.push(q.id);
             char.rpg.activeQuest = null;
             
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             
             const kb = Keyboard.builder().textButton({ label: '⬅️ В гильдию', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
             await context.send({ message: \`✅ Задание "\\\${q.title}" выполнено!\\nВы получили $\{q.goldReward}💰 и $\{q.xpReward} XP.\`, keyboard: kb });
             return;
          }
        }
`;

code = code.replace(
  /if \(payloadCommand === 'guild_talk'/,
  myQuestLogic + "\n        if (payloadCommand === 'guild_talk'"
);

// 3. Update quest generation to give at least 200 gold and 300 xp, and include 'gather' quests
// To be safe with the generator, we'll replace the block from "if (!guildBoard.quests || guildBoard.quests.length === 0 || (nowMs - guildBoard.lastRefresh > limitMs)) {" to "guildBoard.lastRefresh = nowMs;"
const questGenLogic = `
          if (!guildBoard.quests || guildBoard.quests.length === 0 || (nowMs - guildBoard.lastRefresh > limitMs)) {
            guildBoard.quests = [];
            const MATERIAL_IDS = ['mat_pelt_1', 'mat_pelt_2', 'mat_bone_1', 'mat_fang_1', 'enhance_stone_1'];
            for (let i=0; i<3; i++) {
              let isGather = Math.random() < 0.3;
              let mId = D_RANK_MOBS[Math.floor(Math.random()*D_RANK_MOBS.length)] || 'mob_loc_city_eldoria_5';
              let m = MONSTER_CATALOG[mId];
              let targetCount = Math.floor(Math.random() * 3) + 3;
              let wildLocs = WORLD_LOCATIONS.filter(l => l.type !== 'city');
              let loc = wildLocs.length > 0 ? wildLocs[Math.floor(Math.random() * wildLocs.length)] : WORLD_LOCATIONS[0];
              
              if (isGather) {
                  let matId = MATERIAL_IDS[Math.floor(Math.random()*MATERIAL_IDS.length)];
                  let matInfo = Object.values(ITEM_CATALOG).find(i => i.id === matId) ||Items?.[matId] || { name: 'Материал' };
                  guildBoard.quests.push({
                     id: 'q_d_' + i + '_' + nowMs,
                     rank: 'D',
                     type: 'gather',
                     title: \`Сбор: $\{matInfo.name}\`,
                     targetId: matId,
                     targetCount: targetCount,
                     locationName: 'Любая',
                     desc: \`Соберите $\{targetCount} $\{matInfo.name} с монстров.\`,
                     xpReward: Math.max(300, m.level * 40 * targetCount),
                     goldReward: Math.max(200, m.level * 50 * targetCount)
                  });
              } else {
                  guildBoard.quests.push({
                     id: 'q_d_' + i + '_' + nowMs,
                     rank: 'D',
                     type: 'kill',
                     title: \`Истребление: $\{m.name}\`,
                     targetId: mId,
                     targetCount: targetCount,
                     locationName: loc.name,
                     desc: \`Требуется убить $\{targetCount} $\{m.name}. Локация: $\{loc.name}. Рекомендуемый уровень: $\{m.level}-$\{m.level+5}\`,
                     xpReward: Math.max(300, m.level * 40 * targetCount),
                     goldReward: Math.max(200, m.level * 50 * targetCount)
                  });
              }
            }
            guildBoard.lastRefresh = nowMs;
`;

code = code.replace(
  /if \(\!guildBoard\.quests \|\| guildBoard\.quests\.length === 0(.*?)guildBoard\.lastRefresh = nowMs;/s,
  questGenLogic
);

// Prevent active quest from restarting or picking up when we already have one
code = code.replace(
  /char\.rpg\.activeQuest = Object\.assign\(\{\}, q\);/,
  `if (char.rpg.activeQuest) { await context.send('Сначала завершите или отмените текущее задание!'); return; } char.rpg.activeQuest = Object.assign({}, q); char.rpg.activeQuest.progress = 0;`
);

// 4. Combat Tracking
// When the player wins in typical combat or single turn combat, increment progress for the enemy targeted!
// Let's find "if (result.won) {" and add activeQuest tracking.
code = code.replace(
  /if \(result\.won\) \{/g,
  `if (result.won) {
            if (char.rpg.activeQuest && char.rpg.activeQuest.type !== 'gather' && char.rpg.combat && char.rpg.combat.enemy && char.rpg.activeQuest.targetId === char.rpg.combat.enemy.id) {
                 char.rpg.activeQuest.progress = (char.rpg.activeQuest.progress || 0) + 1;
                 (result as any).log += \`\\n\\n🎯 Прогресс задания: $\{char.rpg.activeQuest.progress} / $\{char.rpg.activeQuest.targetCount}\`;
            }`
);

fs.writeFileSync('server.ts', code);
console.log('done server update');
