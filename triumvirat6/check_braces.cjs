const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');
let depth = 0;
for (let i=0; i<s.length; i++) {
  if (s[i] === '{') depth++;
  if (s[i] === '}') depth--;
}
console.log('Final depth:', depth);
