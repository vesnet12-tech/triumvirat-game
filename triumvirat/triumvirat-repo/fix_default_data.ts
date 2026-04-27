import * as fs from 'fs';

let text = fs.readFileSync('rpg.ts', 'utf8');

text = text.replace(/{ itemId: 'item_common_1', amount: 1 }/g, "{ itemId: 'hp_potion_1', amount: 3 }");
text = text.replace(/{ itemId: 'item_common_2', amount: 3 }/g, "");
text = text.replace(/\}[\s,\n]+\]/, "}\n  ]");

fs.writeFileSync('rpg.ts', text, 'utf8');

let stext = fs.readFileSync('server.ts', 'utf8');

const cleanupStr = `
          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }
`;

stext = stext.replace(/if \(\!char\.rpg\) char\.rpg = DEFAULT_RPG_DATA;/g, `if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;\n${cleanupStr}`);

fs.writeFileSync('server.ts', stext, 'utf8');
