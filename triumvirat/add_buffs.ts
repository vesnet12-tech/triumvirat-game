import { getFirestore, collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function addBuffs() {
  const charsRef = collection(db, 'characters');
  const q = query(charsRef, where('ownerId', '==', 741564311));
  const snapshot = await getDocs(q);
  
  for (const d of snapshot.docs) {
    const charData = d.data();
    if (charData.rpg && charData.rpg.baseStats) {
      charData.rpg.baseStats.hp += 10;
      charData.rpg.baseStats.mp += 10;
      charData.rpg.baseStats.attack += 10;
      charData.rpg.baseStats.defense += 10;
      charData.rpg.baseStats.magicAttack += 10;
      charData.rpg.baseStats.magicDefense += 10;
      charData.rpg.baseStats.agility += 10;
      charData.rpg.baseStats.maxHp = charData.rpg.baseStats.hp;
      charData.rpg.baseStats.maxMp = charData.rpg.baseStats.mp;
      
      await setDoc(doc(db, 'characters', d.id), { rpg: charData.rpg }, { merge: true });
      console.log(`Updated character ${charData.name} (${d.id})`);
    }
  }
}

addBuffs().then(() => console.log('Done'));
