import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/originalSetDoc = setDoc;/g, 'originalSetDoc = setDoc_TEMP;');
code = code.replace(/setLogLevel\('silent'\);\nconst originalSetDoc = setDoc_TEMP;/, "setLogLevel('silent');\nimport { setDoc as originalSetDocFn } from 'firebase/firestore';\nconst originalSetDoc = originalSetDocFn;");
code = code.replace(/setDoc\(/g, 'safeSetDoc(');
code = code.replace(/import { getFirestore, doc, safeSetDoc,/g, "import { getFirestore, doc, setDoc,");
fs.writeFileSync('server.ts', code);
console.log('done');
