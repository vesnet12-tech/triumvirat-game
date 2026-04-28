import { getFirestore, collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(query(collection(db, 'characters'), where('name', '==', 'Баал')));
  for (const dbDoc of snapshot.docs) {
    const char = dbDoc.data() as any;
    console.log(`Updating ${char.name} gold from ${char.gold} to 5000`);
    await updateDoc(doc(db, 'characters', dbDoc.id), { gold: 5000 });
  }
}

run().catch(console.error).then(() => process.exit(0));
