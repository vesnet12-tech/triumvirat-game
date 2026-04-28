const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const guildRegex = /if \(payloadCommand === 'guild_quests'\) {[\s\S]*?if \(payloadCommand === 'guild_talk'\) {/m;
const newGuild = `if (payloadCommand === 'guild_quests') {
          let globalData = await getDoc(doc(db, 'sessions', 'guild_quests'));
          let guildBoard = globalData.exists() ? globalData.data() : { quests: [], lastRefresh: 0 };
          const nowMs = Date.now();
          const limitMs = 3 * 60 * 60 * 1000; // 3 hours
          const D_RANK_MOBS = Object.values(MONSTER_CATALOG).filter(m => m.level >= 1 && m.level <= 20).map(m=>m.id);
          const C_RANK_MOBS = Object.values(MONSTER_CATALOG).filter(m => m.level >= 20 && m.level <= 40).map(m=>m.id);
          
          if (!guildBoard.quests || guildBoard.quests.length === 0 || (nowMs - guildBoard.lastRefresh > limitMs)) {
            // refresh
            guildBoard.quests = [];
            for (let i=0; i<2; i++) {
              let mId = D_RANK_MOBS[Math.floor(Math.random()*D_RANK_MOBS.length)] || 'mob_loc_city_eldoria_5';
              let m = MONSTER_CATALOG[mId];
              guildBoard.quests.push({
                 id: 'q_d_' + i + '_' + nowMs,
                 rank: 'D',
                 title: \`Истребление: \${m.name}\`,
                 targetId: mId,
                 desc: \`Требуется убить монстра. Рекомендуемый уровень: \${m.level}-\${m.level+5}\`,
                 xpReward: m.level * 40,
                 goldReward: m.level * 30
              });
            }
            for (let i=0; i<2; i++) {
              let mId = C_RANK_MOBS[Math.floor(Math.random()*C_RANK_MOBS.length)] || 'mob_loc_forest_6';
              let m = MONSTER_CATALOG[mId];
              guildBoard.quests.push({
                 id: 'q_c_' + i + '_' + nowMs,
                 rank: 'C',
                 title: \`Охота: \${m.name}\`,
                 targetId: mId,
                 desc: \`Требуется убить опасного монстра. Рекомендуемый уровень: \${m.level}-\${m.level+10}\`,
                 xpReward: m.level * 50,
                 goldReward: m.level * 40
              });
            }
            guildBoard.lastRefresh = nowMs;
            await setDoc(doc(db, 'sessions', 'guild_quests'), guildBoard, { merge: true });
          }

          let compQ = char.rpg.completedQuests || [];
          let uncompleted = guildBoard.quests.filter(q => !compQ.includes(q.id));
          
          if (uncompleted.length === 0) {
              const msLeft = (guildBoard.lastRefresh + limitMs) - nowMs;
              const minsForm = Math.floor(msLeft / 60000);
              await context.send({
                 message: \`Вы выполнили все доступные задания на доске! Приходите позже.\\nОбновление доски заданий через: \${Math.floor(minsForm/60)} ч \${minsForm%60} мин.\`,
                 keyboard: Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR })
              });
              return;
          }

          let msg = "📜 Доска заданий:\\n\\n";
          let kb = Keyboard.builder();
          
          uncompleted.forEach((q, i) => {
             msg += \`[\${q.rank}-ранг] \${q.title}\\n\${q.desc}\\nНаграда: \${q.goldReward}💰 \${q.xpReward} XP\\n\\n\`;
             kb.textButton({ label: \`Принять \${q.rank}-ранг\`, payload: { command: 'guild_accept_' + q.id }, color: Keyboard.PRIMARY_COLOR }).row();
          });
          kb.textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: kb });
          return;
        }

        if (payloadCommand && payloadCommand.startsWith('guild_accept_')) {
          const qId = payloadCommand.replace('guild_accept_', '');
          let globalData = await getDoc(doc(db, 'sessions', 'guild_quests'));
          if (!globalData.exists()) return;
          let guildBoard = globalData.data();
          let q = guildBoard.quests.find(x => x.id === qId);
          if (!q) {
             await context.send('Квест не найден или уже устарел.');
             return;
          }
          if (!char.rpg.completedQuests) char.rpg.completedQuests = [];
          if (char.rpg.completedQuests.includes(qId)) {
             await context.send('Вы уже выполнили этот квест.');
             return;
          }
          
          char.rpg.activeQuest = Object.assign({}, q);
          await setDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          await context.send({
             message: \`Вы приняли задание: \${q.title}.\\nОтправляйтесь в путь и уничтожьте цель!\`,
             keyboard: Keyboard.builder()
                .textButton({ label: '🗺️ В путь', payload: { command: 'travel' }, color: Keyboard.PRIMARY_COLOR })
                .row()
                .textButton({ label: '⬅️ В гильдию', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR })
          });
          return;
        }

        if (payloadCommand === 'guild_talk') {`;

fs.writeFileSync('server.ts', code.replace(guildRegex, newGuild));
