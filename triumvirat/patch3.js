import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "color: Keyboard.SECONDARY_COLOR })",
  \`color: Keyboard.SECONDARY_COLOR })
            .textButton({ label: '🎟 Рейтинг', payload: { command: 'guild_top' }, color: Keyboard.PRIMARY_COLOR })\`
);

// Add logic for guild_top
const guildTopLogic = \`
        if (payloadCommand === 'guild_top' || (char.location === 'city' && text.includes('рейтинг'))) {
          // get all players
          const allCharsSnap = await getDocs(collection(db, 'characters'));
          let avs: {name: string, quests: number, rank: string}[] = [];
          allCharsSnap.forEach(doc => {
             const d = doc.data();
             if (d.rpg) {
                avs.push({ name: d.name || 'Авантюрист', quests: (d.rpg.completedQuests?.length || 0), rank: d.rpg.guildRank || 'D' });
             }
          });
          
          // add NPCS
          const guildNpcs = [
            { name: 'Сильвер (Ветеран)', quests: 800, rank: 'A' },
            { name: 'Элиза (Черный маг)', quests: 600, rank: 'B' },
            { name: 'Гаррет (Одноглазый)', quests: 50, rank: 'C' },
            { name: 'Рен (Новичок)', quests: 2, rank: 'D' },
            { name: 'Владыка Мечей', quests: 2000, rank: 'S' }
          ];
          avs.push(...guildNpcs);
          
          avs.sort((a, b) => b.quests - a.quests);
          const top10 = avs.slice(0, 10);
          
          let msg = \\\`🏆 Топ-10 Авантюристов Гильдии:\\\\n\\\\n\\\`;
          top10.forEach((p, index) => {
             msg += \\\`\\\${index + 1}. \\\${p.name} — Ранг: \\\${p.rank} (Заданий: \\\${p.quests})\\\\n\\\`;
          });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 В гильдию', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
            
          await context.send({ message: msg, keyboard });
          return;
        }
\`;

code = code.replace(
  /if \\(payloadCommand === 'guild_talk'/,
  guildTopLogic + "\\n        if (payloadCommand === 'guild_talk'"
);

fs.writeFileSync('server.ts', code);
console.log('done guild top');
