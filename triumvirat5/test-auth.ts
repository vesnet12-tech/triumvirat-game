import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import config from './firebase-applet-config.json' assert { type: 'json' };

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

async function test() {
  try {
    console.log("Reading characters unauthenticated...");
    const snap = await getDocs(collection(db, 'characters'));
    console.log("Unauthenticated read success:", snap.size, "characters");
  } catch (e: any) {
    console.error("Unauthenticated read failed:", e.message);
  }

  try {
    console.log("Writing to characters unauthenticated...");
    await setDoc(doc(db, 'characters', 'test_auth'), { test: true });
    console.log("Unauthenticated write success");
  } catch (e: any) {
    console.error("Unauthenticated write failed:", e.message);
  }

  try {
    console.log("Signing in anonymously...");
    await signInAnonymously(auth);
    console.log("Signed in. uid:", auth.currentUser?.uid);
  } catch(e:any) {
    console.error("Sign in failed:", e.message);
  }

  try {
    console.log("Reading characters authenticated...");
    const snap = await getDocs(collection(db, 'characters'));
    console.log("Authenticated read success:", snap.size, "characters");
  } catch (e: any) {
    console.error("Authenticated read failed:", e.message);
  }

  try {
    console.log("Writing to characters authenticated...");
    await setDoc(doc(db, 'characters', 'test_auth'), { test: true });
    console.log("Authenticated write success");
  } catch (e: any) {
    console.error("Authenticated write failed:", e.message);
  }

  process.exit(0);
}

test();
