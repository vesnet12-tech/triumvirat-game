import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function giveGold() {
  const q = query(collection(db, 'characters'), where('name', '==', 'Мару'));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    console.log("Maru not found via 'Мару', trying 'Maru'");
    const q2 = query(collection(db, 'characters'), where('name', '==', 'Maru'));
    const snapshot2 = await getDocs(q2);
    if (snapshot2.empty) {
        console.log("Maru not found.");
        return;
    }
    for (const d of snapshot2.docs) {
        const data = d.data();
        const gold = (data.rpg && data.rpg.gold) ? data.rpg.gold : (data.gold || 0);
        await setDoc(doc(db, 'characters', d.id), { gold: gold + 60000, rpg: { ...data.rpg, gold: gold + 60000 } }, { merge: true });
        console.log(`Gave 60000 gold to ${d.id}`);
    }
    return;
  }
  
  for (const d of snapshot.docs) {
      const data = d.data();
      const gold = (data.rpg && data.rpg.gold) ? data.rpg.gold : (data.gold || 0);
      await setDoc(doc(db, 'characters', d.id), { gold: gold + 60000, rpg: { ...data.rpg, gold: gold + 60000 } }, { merge: true });
      console.log(`Gave 60000 gold to ${d.id} (Мару)`);
  }
}

giveGold().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
