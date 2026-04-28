
import { getFirestore, collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(query(collection(db, 'characters'), where('name', '==', 'Мару')));
  for (const dbDoc of snapshot.docs) {
    const char = dbDoc.data() as any;
    console.log(`Reviving ${char.name}. Current deathState: ${char.rpg.deathState}`);
    
    char.rpg.deathState = 'alive'; // Set to 'alive'
    char.rpg.hp = 100; // Assuming 100 HP is reviving fullly or at least alive
    
    await updateDoc(doc(db, 'characters', dbDoc.id), { rpg: char.rpg });
    console.log(`${char.name} revived.`);
  }
}

run().catch(console.error).then(() => process.exit(0));
