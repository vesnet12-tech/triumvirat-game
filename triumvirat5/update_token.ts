
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import config from './firebase-applet-config.json' assert { type: 'json' };

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function updateToken() {
    const docRef = doc(db, 'settings', 'global');
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        console.log('Settings document not found');
        return;
    }
    const data = snap.data();
    data.vkToken = 'vk1.a.hxzX911A_4T1ZnSz_7AAl8ci1mxnTLogMwEAjq-pVX8pTOLFu4EV8TpOZZyjOHwYQa0VLTh5knXrPvtn1jpMSaGGSFFjqknB9DIVFV-J2pgFeBa4y2pbEWfRMNOpi8IOtvfasK2mKhs9vZZArcXLe95GkfAy8a3-tHQd_g1tbQ7m9oTboQEdyZ6-MEDNaHxuQkRruydpXnsaobbDMpKi4A';
    await setDoc(docRef, data);
    console.log('Token updated');
}

updateToken().catch(console.error);
