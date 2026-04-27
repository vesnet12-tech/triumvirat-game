import * as fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

const logicStr = `
          if (char.rpg.exploreWaitEnd) {
             const left = Math.ceil((char.rpg.exploreWaitEnd - Date.now()) / 1000);
             if (left > 0) {
                 const kbWait = Keyboard.builder()
                    .textButton({ label: '⏳ Обновить', payload: { command: 'check_explore' }, color: Keyboard.PRIMARY_COLOR })
                    .inline();
                 await context.send({ message: \`⏳ Вы все еще исследуете это место... Осталось \${left} сек.\`, keyboard: kbWait });
                 return;
             } else {
                 char.rpg.exploreWaitEnd = null;
                 // Proceed to resolve
             }
          }
          
          const isPathCmd = ['explore_path_', 'explore_climb', 'explore_river', 'explore_cave', 'explore_glade', 'explore_logging', 'explore_mushrooms', 'explore_cabin', 'explore_thicket', 'explore_forward', 'explore_left', 'explore_right'].some(p => payloadCommand.startsWith(p));
          
          if (isPathCmd && !char.rpg.exploreWaitEnd && payloadCommand !== 'check_explore') {
              const waitTime = Math.floor(Math.random() * 5 + 5) * 1000;
              char.rpg.exploreWaitEnd = Date.now() + waitTime;
              char.rpg.pendingExploreCmd = payloadCommand;
              await setDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              
              const kbWait = Keyboard.builder()
                .textButton({ label: '⏳ Как успехи?', payload: { command: 'check_explore' }, color: Keyboard.PRIMARY_COLOR })
                .inline();
                
              await context.send({ message: \`🚶 Вы направились туда. Осмотр займет около \${Math.ceil(waitTime/1000)} сек.\`, keyboard: kbWait });
              
              setTimeout(async () => {
                 try {
                     const freshSnap = await getDoc(doc(db, 'characters', char.id));
                     if (!freshSnap.exists()) return;
                     const freshChar = freshSnap.data();
                     // Only resolve if it's expired and still has pending
                     if (freshChar.rpg.exploreWaitEnd && freshChar.rpg.exploreWaitEnd <= Date.now() + 500 && freshChar.rpg.pendingExploreCmd) {
                        freshChar.rpg.exploreWaitEnd = null;
                        const eventCmd = freshChar.rpg.pendingExploreCmd;
                        freshChar.rpg.pendingExploreCmd = null;
                        freshChar.id = char.id;
                        
                        const rez = handleExplorationEvent(freshChar, eventCmd);
                        
                        if (rez.enemyToFight) {
                           freshChar.rpg.combat = { enemy: rez.enemyToFight, isDefending: false, playerCooldowns: {}, turnCounter: 1, playerShield: 0, enemyShield: 0, playerStatuses: [], enemyStatuses: [] };
                           await setDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(freshChar.rpg)) }, { merge: true });
                           await renderCombatUI(context, freshChar, \`\\n[СИСТЕМА]: \${rez.msg}\`);
                           return;
                        }
                        
                        await setDoc(doc(db, 'characters', char.id), { gold: freshChar.gold || 0, rpg: JSON.parse(JSON.stringify(freshChar.rpg)) }, { merge: true });
                        await context.send({ message: \`\\n[СИСТЕМА]: \${rez.msg}\`, keyboard: getWildKeyboard(freshChar) });
                     }
                 } catch (e) {
                     console.error("Timeout explore error", e);
                 }
              }, waitTime + 500);
              return;
          }
          
          if (payloadCommand === 'check_explore') {
             if (char.rpg.exploreWaitEnd && char.rpg.exploreWaitEnd <= Date.now()) {
                payloadCommand = char.rpg.pendingExploreCmd || 'explore_forward';
                char.rpg.exploreWaitEnd = null;
                char.rpg.pendingExploreCmd = null;
             } else {
                 return; // handled above or invalid
             }
          }
`;

// we need to replace existing exploreWaitEnd logic and inject this.
const oldLogicRegex = /if \(char\.rpg\.exploreWaitEnd\) \{[\s\S]*?if \(char\.rpg\.exploreState === 'enemy_spotted'\) \{/;

if (oldLogicRegex.test(code)) {
    code = code.replace(oldLogicRegex, logicStr + "\n          if (char.rpg.exploreState === 'enemy_spotted') {");
    fs.writeFileSync('server.ts', code);
    console.log("Success inject");
} else {
    console.log("Failed to find regex");
}
