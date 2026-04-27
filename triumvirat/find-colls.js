import fs from 'fs';
const code = fs.readFileSync('server.ts', 'utf8');
const regex = /doc\(db,\s*'([^']+)'/g;
let match;
const collections = new Set();
while ((match = regex.exec(code)) !== null) {
  collections.add(match[1]);
}
console.log(Array.from(collections).join('\n'));
