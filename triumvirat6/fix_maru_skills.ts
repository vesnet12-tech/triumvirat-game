import { getFirestore, collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from './firebase-applet-config.json' assert { type: 'json' };

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(query(collection(db, 'characters'), where('name', '==', 'Мару')));
  for (const dbDoc of snapshot.docs) {
    const char = dbDoc.data() as any;
    console.log(`Fixing skills for ${char.name}. Class: ${char.charClass}`);
    
    const startSkills = ['бое_dmg_1', 'бое_dmg_2', 'бое_buff', 'бое_utility', 'бое_pass'];
    if (!char.rpg) char.rpg = {};
    char.rpg.unlockedSkills = startSkills;
    char.rpg.equippedSkills = {
       active: ['бое_dmg_1', 'бое_dmg_2', 'бое_buff', 'бое_utility'],
       passive: ['бое_pass']
    };
    await updateDoc(doc(db, 'characters', dbDoc.id), { rpg: char.rpg });
    console.log(`${char.name} skills restored.`);
  }
}

run().catch(console.error).then(() => process.exit(0));
