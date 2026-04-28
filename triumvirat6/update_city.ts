import * as fs from 'fs';

let text = fs.readFileSync('server.ts', 'utf8');

const isMMOld = /const isMainMenuCommand = \[\'explore_\',.*?\].some\(cmd => payloadCommand\?\.startsWith\(cmd\) \|\| payloadCommand === cmd\);/;
const isMMNew = `const isMainMenuCommand = ['explore_', 'boss_fight', 'npc_', 'profile', 'stats', 'stats_page_', 'inventory', 'inv_page_', 'use', 'equipment', 'skills', 'skills_cat_', 'skill_view', 'shop', 'shop_cat', 'shop_item', 'shop_refresh', 'menu', 'hunt', 'combat', 'combat_back', 'combat_skills_menu', 'equip_skill', 'unequip_skill', 'work', 'work_port_', 'travel', 'travel_loc_page_', 'travel_select_', 'travel_confirm_', 'arena', 'arena_npc', 'eq_cat_', 'eq_page_', 'eq_item_view', 'gem_', 'shop_sell_menu', 'sell_page_', 'shop_sell_item', 'prison_escape', 'die_now', 'wait_revive', 'blacksmith', 'bs_page_', 'bs_select', 'bs_enhance', 'city_menu', 'city_explore', 'port_info', 'house_menu', 'house_buy', 'house_sleep', 'house_eat', 'house_sell', 'check_timer', 'close_menu', 'search_monsters', 'rest', 'go_deeper', 'travel_city', 'guild_', 'tavern_menu', 'tavern_sleep', 'party', 'tavern_drink', 'tavern_armwrestle', 'tavern_fight', 'tavern_ignore', 'city_event_give'].some(cmd => payloadCommand?.startsWith(cmd) || payloadCommand === cmd);`;
text = text.replace(isMMOld, isMMNew);

// Tavern menu
const tavernMenuOld = `        if (payloadCommand === 'tavern_menu') {
          const keyboard = Keyboard.builder()
            .textButton({ label: '🛏️ Снять комнату (100 💰)', payload: { command: 'tavern_sleep' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '⬅️ В город', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: \`🍺 Добро пожаловать в таверну!\\nЗдесь ты можешь отдохнуть и полностью восстановить ХП и МП.\\nУ тебя сейчас: \${char.gold || 0} 💰.\`, keyboard });
          return;
        }`;

const tavernMenuNew = `        if (payloadCommand === 'tavern_menu') {
          // Random event: Someone picks a fight
          if (Math.random() < 0.1) {
            const kb = Keyboard.builder()
              .textButton({ label: '⚔️ Напасть', payload: { command: 'tavern_fight' }, color: Keyboard.NEGATIVE_COLOR })
              .textButton({ label: '🚶‍♂️ Проигнорировать', payload: { command: 'tavern_ignore' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '⬅️ Сбежать в город', payload: { command: 'city_menu' }, color: Keyboard.PRIMARY_COLOR });
            await context.send({ message: '😠 Вы заходите в таверну, и какой-то пьяный громила вдруг начинает быковать на вас: "Эй, ты! Мне не нравится твоя рожа!"', keyboard: kb });
            return;
          }

          const keyboard = Keyboard.builder()
            .textButton({ label: '🍻 Выпить (50 💰)', payload: { command: 'tavern_drink' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '💪 Армрестлинг (1000 💰)', payload: { command: 'tavern_armwrestle' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '🛏️ Снять комнату (100 💰)', payload: { command: 'tavern_sleep' }, color: Keyboard.SECONDARY_COLOR })
            .row()
            .textButton({ label: '⬅️ В город', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: \`🍺 Добро пожаловать в таверну!\\nЗдесь всегда шумно, пахнет элем и жареным мясом.\\nУ тебя сейчас: \${char.gold || 0} 💰.\`, keyboard });
          return;
        }

        if (payloadCommand === 'tavern_ignore') {
           await context.send({ message: '🚶‍♂️ Вы просто проигнорировали пьянчугу и прошли к барной стойке. Он что-то буркнул себе под нос и отстал.', keyboard: getCityKeyboard() });
           return;
        }

        if (payloadCommand === 'tavern_fight') {
           // We can mock a quick combat or just a text result. Since there's a full combat system, we could start a combat with a "Drunkard"
           // but maybe simply resolve it textually to save time, or use the real combat engine. 
           // Let's use real combat engine if possible, but simplest is resolving textually. 
           const pStats = calculateTotalStats(char.rpg);
           // Calculate win chance ~70%
           if (Math.random() < 0.7 + (pStats.attack / 1000)) {
               const reward = Math.floor(Math.random() * 50) + 10;
               char.gold += reward;
               await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
               await context.send({ message: \`👊 Вы ловким ударом отправили громилу в нокаут! Толпа радостно загудела. В его карманах вы нашли \${reward} 💰.\`, keyboard: getCityKeyboard() });
           } else {
               const hpLoss = Math.floor(pStats.maxHp * 0.2);
               char.rpg.baseStats.hp = Math.max(1, char.rpg.baseStats.hp - hpLoss);
               await setDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
               await context.send({ message: \`🤕 Громила оказался неожиданно проворным и вмазал вам кружкой по голове! Вы потеряли \${hpLoss} ХП и с позором отступили.\`, keyboard: getCityKeyboard() });
           }
           return;
        }

        if (payloadCommand === 'tavern_drink') {
          if ((char.gold || 0) < 50) {
             await context.send('❌ У тебя недостаточно золота чтобы выпить (нужно 50 💰).');
             return;
          }
          char.gold -= 50;
          await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          
          const rnd = Math.random() * 100;
          const kb = Keyboard.builder().textButton({ label: '⬅️ Вернуться', payload: { command: 'tavern_menu' }, color: Keyboard.PRIMARY_COLOR });
          
          if (rnd < 5) { // 5% chance behind bars
             const fine = Math.floor((char.gold || 0) * 0.1); // 10% of gold
             char.gold -= fine;
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
             await context.send({ message: \`🚓 Вы напились до беспамятства и очнулись за решеткой! Стража содрала с вас штраф \${fine} 💰 за хулиганство.\`, keyboard: kb });
          } else if (rnd < 10) { // 5% chance with hobos
             char.rpg.baseStats.hp = Math.max(1, Math.floor(calculateTotalStats(char.rpg).maxHp * 0.5));
             await setDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: \`🗑️ Вы так сильно напились, что проснулись на улице в обнимку с бомжами. У вас жутко болит голова (потеряно 50% здоровья).\`, keyboard: kb });
          } else if (rnd < 20) {
             await context.send({ message: \`💃 После пятой кружки эля вы залезли на стол и начали исполнять зажигательные танцы. Посетители аплодировали!\`, keyboard: kb });
          } else if (rnd < 30) {
             const tip = 20;
             char.gold += tip;
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
             await context.send({ message: \`🎤 Вы так хорошо спели старую морскую песню пьяным голосом, что кто-то кинул вам \${tip} 💰.\`, keyboard: kb });
          } else if (rnd < 40) {
             await context.send({ message: \`🐐 Вы проснулись на сеновале за таверной. Рядом с вами мирно спит коза. Ничего не помните.\`, keyboard: kb });
          } else {
             await context.send({ message: \`🍻 Вы выпили кружку отличного дворфийского эля. На душе стало тепло и спокойно.\`, keyboard: kb });
          }
          return;
        }

        if (payloadCommand === 'tavern_armwrestle') {
          if ((char.gold || 0) < 1000) {
             await context.send('❌ Нужно 1000 💰 для ставки в армрестлинге.');
             return;
          }
          
          if (!char.rpg.armwrestleDate) char.rpg.armwrestleDate = '';
          if (!char.rpg.armwrestleCount) char.rpg.armwrestleCount = 0;
          
          const today = new Date().toISOString().split('T')[0];
          if (char.rpg.armwrestleDate !== today) {
              char.rpg.armwrestleDate = today;
              char.rpg.armwrestleCount = 0;
          }
          
          if (char.rpg.armwrestleCount >= 2) {
             await context.send('❌ Вы уже боролись 2 раза за сегодня. Приходите завтра, руки должны отдохнуть!');
             return;
          }

          char.rpg.armwrestleCount++;
          char.gold -= 1000;
          
          const pStats = calculateTotalStats(char.rpg);
          const strength = pStats.attack;
          const baseChance = 40; // 40%
          const extraChance = Math.floor(strength / 10);
          const winChance = baseChance + extraChance;
          const rnd = Math.random() * 100;
          
          const kb = Keyboard.builder().textButton({ label: '⬅️ Вернуться', payload: { command: 'tavern_menu' }, color: Keyboard.PRIMARY_COLOR });

          if (rnd <= winChance) {
             char.gold += 10000;
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: \`💪 Вы сцепились руками с местным чемпионом. Спустя минуту напряженной борьбы, вы прижали его руку к столу!\\n🎉 Вы выиграли 10000 💰!\`, keyboard: kb });
          } else {
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: \`💦 Вы боролись изо всех сил, но соперник оказался крепким орешком и прижал вашу руку. Вы проиграли ставку в 1000 💰.\`, keyboard: kb });
          }
          return;
        }
`;

text = text.replace(tavernMenuOld, tavernMenuNew);

// Now for City Events modifying `city_explore` logic
const cityExploreOld = `          if (Math.random() < 0.2) {
             const rnd = Math.random();
             if (rnd < 0.4) {
                await context.send(\`🍷 Гуляя по \${quarterName}, к вам подошел оборванец и выпросил монету. Вы отдали 10 💰.\`);
                char.gold = Math.max(0, (char.gold || 0) - 10);
             } else if (rnd < 0.8) {
                await context.send(\`💰 В переулке \${quarterName} вы нашли оброненный кошелек мертвого купца! Внутри оказалось 50 💰.\`);
                char.gold = (char.gold || 0) + 50;
             } else {
                await context.send(\`⚔️ В тёмной подворотне \${quarterName} на вас попытался напасть бандит! Но, оценив вашу экипировку, он извинился и скрылся.\`);
             }
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          } else {
            await context.send(\`Вы прогуливаетесь по локации: \${quarterName}. Вокруг суетятся жители, торговцы зазывают к палаткам, а стража лениво патрулирует улицы.\`);
          }`;

const cityExploreNew = `          if (Math.random() < 0.2) {
             const rnd = Math.random();
             if (rnd < 0.4) {
                const kb = Keyboard.builder()
                  .textButton({ label: 'Дать 10 💰', payload: { command: 'city_event_give' }, color: Keyboard.PRIMARY_COLOR })
                  .textButton({ label: 'Пройти мимо', payload: { command: 'city_explore', quarter }, color: Keyboard.SECONDARY_COLOR });
                await context.send({ message: \`🍷 Гуляя по \${quarterName}, к вам подошел грязный оборванец и начал жалобно просить монету на еду.\`, keyboard: kb });
                return;
             } else if (rnd < 0.8) {
                await context.send(\`💰 В переулке \${quarterName} вы нашли оброненный кошелек мертвого купца! Внутри оказалось 50 💰.\`);
                char.gold = (char.gold || 0) + 50;
             } else {
                await context.send(\`⚔️ В тёмной подворотне \${quarterName} на вас попытался напасть бандит! Но, оценив вашу экипировку, он извинился и скрылся.\`);
             }
             await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          } else {
            await context.send(\`Вы прогуливаетесь по локации: \${quarterName}. Вокруг суетятся жители, торговцы зазывают к палаткам, а стража лениво патрулирует улицы.\`);
          }`;

text = text.replace(cityExploreOld, cityExploreNew);

const cityEventGiveAdd = `
        if (payloadCommand === 'city_event_give') {
           if ((char.gold || 0) < 10) {
              await context.send({ message: 'К сожалению, у вас нет даже 10 золотых.', keyboard: getCityKeyboard() });
              return;
           }
           char.gold -= 10;
           await setDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
           await context.send({ message: 'Вы пожертвовали 10 💰. Бомж радостно поблагодарил вас и убежал. Ваша карма (наверное) стала чище.', keyboard: getCityKeyboard() });
           return;
        }
`;

text = text.replace("if (payloadCommand === 'tavern_sleep')", cityEventGiveAdd + "\\n        if (payloadCommand === 'tavern_sleep')");

fs.writeFileSync('server.ts', text);
console.log("Updated city logic successfully.");
