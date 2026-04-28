import fs from 'fs';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };
import { CLASS_STARTING_SKILLS, SKILL_CATALOG } from './skills.js';

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(collection(db, 'characters'));
  for (const dbDoc of snapshot.docs) {
    const char = dbDoc.data() as any;
    if (char.rpg) {
      let changed = false;
      
      const unlocked = char.rpg.unlockedSkills || [];
      const newUnlocked = new Set<string>();
      unlocked.forEach((s: string) => {
        if (SKILL_CATALOG[s]) {
          newUnlocked.add(s);
        }
      });
      
      // Check if we need to add starter skills
      if (char.charClass && CLASS_STARTING_SKILLS[char.charClass]) {
         for (const start of CLASS_STARTING_SKILLS[char.charClass]) {
            if (!newUnlocked.has(start)) {
               newUnlocked.add(start);
               changed = true;
            }
         }
      }

      const active = char.rpg.equippedSkills?.active || [];
      const passive = char.rpg.equippedSkills?.passive || [];
      const newActive = active.filter((s: string) => SKILL_CATALOG[s]);
      const newPassive = passive.filter((s: string) => SKILL_CATALOG[s]);

      if (changed || newActive.length !== active.length || newPassive.length !== passive.length) {
         if (!char.rpg.equippedSkills) char.rpg.equippedSkills = {};
         char.rpg.equippedSkills.active = newActive;
         char.rpg.equippedSkills.passive = newPassive;
         
         // try to equip class starter active & passive if we have empty slots
         if (char.charClass && CLASS_STARTING_SKILLS[char.charClass]) {
              for (const start of CLASS_STARTING_SKILLS[char.charClass]) {
                  const s = SKILL_CATALOG[start];
                  if (s && !s.isPassive && !char.rpg.equippedSkills.active.includes(start) && char.rpg.equippedSkills.active.length < 6) {
                      char.rpg.equippedSkills.active.push(start);
                  }
                  if (s && s.isPassive && !char.rpg.equippedSkills.passive.includes(start) && char.rpg.equippedSkills.passive.length < 6) {
                      char.rpg.equippedSkills.passive.push(start);
                  }
              }
         }

         char.rpg.unlockedSkills = Array.from(newUnlocked);
         await setDoc(doc(db, 'characters', dbDoc.id), { rpg: char.rpg }, { merge: true });
         console.log(`Updated char ${char.name} (${char.charClass}) skills`);
      }
    }
  }
}

run().catch(console.error).then(() => process.exit(0));
