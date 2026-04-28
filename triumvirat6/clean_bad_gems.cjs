const fs = require('fs');

const file = 'items.ts';
let content = fs.readFileSync(file, 'utf8');

// Find all common/uncommon pure crit materials and remove them
const toRemove = [
  'gem_2', 'gem_3', 'gem_10', 'gem_17', 'gem_21', 'gem_27', 'gem_42', 
  'gem_52', 'gem_59', 'gem_64', 'gem_68', 'gem_77', 'gem_82',
  'gem_1', 'gem_11', 'gem_13', 'gem_14', 'gem_15', 'gem_18', 'gem_20', 'gem_23', 'gem_25', 'gem_29',
  'gem_31', 'gem_33', 'gem_34', 'gem_35', 'gem_36', 'gem_37', 'gem_41', 'gem_43', 'gem_44', 'gem_45',
  'gem_46', 'gem_51', 'gem_53', 'gem_54', 'gem_55', 'gem_56', 'gem_61', 'gem_63', 'gem_65', 'gem_67', 
  'gem_71', 'gem_73', 'gem_74', 'gem_75', 'gem_76', 'gem_81', 'gem_83', 'gem_84', 'gem_85', 'gem_86',
  'gem_91', 'gem_93', 'gem_94', 'gem_95', 'gem_96'
]; // Add a bunch of possible ones. 

// Actually let's use the find script to get EXACT keys that are common/uncommon materials with ONLY critRate/critDamage
const jsonMatch = content.match(/export const ITEM_CATALOG: Record<string, Item> = (\{[\s\S]*?\});\n/);
let badKeys = [];
if (jsonMatch) {
  let jsonStr = jsonMatch[1].replace(/as any/g, '');
  const items = eval('(' + jsonStr + ')');
  for (const key in items) {
     const item = items[key];
     if (item.type === 'material' && (item.rarity === 'common' || item.rarity === 'uncommon')) {
         const keys = Object.keys(item.stats || {});
         if (keys.length === 0) {
             if (key.startsWith('gem_')) badKeys.push(key);
         } else if (keys.length === 1 && (keys[0] === 'critRate' || keys[0] === 'critDamage')) {
             if (key.startsWith('gem_')) badKeys.push(key);
         } else if (keys.length === 2 && keys.includes('critRate') && keys.includes('critDamage')) {
             if (key.startsWith('gem_')) badKeys.push(key);
         }
     }
  }
}
console.log('Bad keys:', badKeys);

badKeys.forEach(k => {
   // regex to remove standard json block
   const regex = new RegExp(`  "${k}": \\{[\\s\\S]*?\\},?\\n`, 'g');
   content = content.replace(regex, '');
});

fs.writeFileSync(file, content, 'utf8');
console.log('Cleaned items.ts');
