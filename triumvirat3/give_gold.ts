import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, where, getDocs, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const raw = fs.readFileSync('firebase-applet-config.json', 'utf-8');
const config = JSON.parse(raw);
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const q = query(collection(db, 'characters'), where('name', '==', 'Тетсу'));
  const snap = await getDocs(q);
  if (snap.empty) {
    console.log("Тетсу not found");
    return;
  }
  for (const docSnap of snap.docs) {
    let char = docSnap.data();
    let currentGold = char.gold || 0;
    currentGold += 3000;
    await setDoc(doc(db, 'characters', docSnap.id), { gold: currentGold }, { merge: true });
    console.log("Given 3000 gold to Тетсу. New gold: " + currentGold);
  }
}
run().then(() => process.exit(0)).catch(console.error);
