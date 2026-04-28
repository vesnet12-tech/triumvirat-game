import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(collection(db, 'characters'));
  let count = 0;
  for (const dbDoc of snapshot.docs) {
    const char = dbDoc.data() as any;
    if (char.deleted) {
      await deleteDoc(doc(db, 'characters', dbDoc.id));
      count++;
    }
  }
  console.log(`Deleted ${count} soft-deleted characters.`);
}

run().catch(console.error).then(() => process.exit(0));
