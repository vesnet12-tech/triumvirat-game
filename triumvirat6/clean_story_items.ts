import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function clean() {
  const charsSnap = await getDocs(collection(db, "characters"));
  for (const docSnap of charsSnap.docs) {
    const data = docSnap.data();
    if(data.rpg && data.rpg.inventory) {
      const inv = data.rpg.inventory;
      let changed = false;
      const newInv = inv.filter((item: any) => {
        if (typeof item === 'string') {
          changed = true;
          return false;
        }
        if (typeof item === 'object') {
           if(item.type === 'story' || item.itemId === 'story') {
              changed = true;
              return false;
           }
        }
        return true;
      });
      if(changed) {
         console.log(`Cleaning char ${docSnap.id}`);
         await setDoc(doc(db, "characters", docSnap.id), { rpg: { ...data.rpg, inventory: newInv } }, { merge: true });
      }
    }
  }
  console.log("Done");
}
clean();
