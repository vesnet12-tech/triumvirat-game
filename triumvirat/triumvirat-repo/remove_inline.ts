import * as fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(/\.inline\(\)/g, '');
fs.writeFileSync('server.ts', content);
console.log('Removed all .inline() calls.');
