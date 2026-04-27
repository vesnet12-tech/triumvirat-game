import fs from 'fs';
const code = fs.readFileSync('server.ts', 'utf8');
const docs = code.match(/doc\s*\(\s*db\s*,\s*'([^']+)'/g) || [];
const collections = code.match(/collection\s*\(\s*db\s*,\s*'([^']+)'/g) || [];
const dSet = new Set(docs.map(m => m.split("'")[1]));
const cSet = new Set(collections.map(m => m.split("'")[1]));
console.log('Docs:', [...dSet]);
console.log('Collections:', [...cSet]);
