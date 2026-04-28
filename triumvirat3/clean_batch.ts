import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, writeBatch, query, limit } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function cleanBatch() {
  const charsSnap = await getDocs(query(collection(db, "characters"), limit(200)));
  let batch = writeBatch(db);
  let count = 0;
  let totalFixed = 0;

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
         batch.update(docSnap.ref, { "rpg.inventory": newInv });
         count++;
         totalFixed++;
      }
    }
  }
  if (count > 0) {
      await batch.commit();
      console.log(`Committed final batch, total fixed: ${totalFixed}`);
  } else {
      console.log('Nothing to fix in this batch.');
  }
  console.log("Done");
  process.exit(0);
}
cleanBatch();
