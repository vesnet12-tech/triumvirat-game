import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const fbConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app);

async function run() {
  const snapshot = await getDocs(collection(db, 'characters'));
  let count = 0;
  for (const item of snapshot.docs) {
    const data = item.data();
    if (data.rpg) {
      data.rpg.inventory = [];
      data.rpg.equipment = {
        weapon: null,
        armor: null,
        accessory: null
      };
      await setDoc(doc(db, 'characters', item.id), { rpg: data.rpg }, { merge: true });
      count++;
    }
  }
  console.log(`Cleared items for ${count} characters.`);
}

run().catch(console.error).then(() => process.exit(0));
