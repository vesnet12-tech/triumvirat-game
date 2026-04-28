const fs = require('fs');
let text = fs.readFileSync('items.ts', 'utf8');

// The pattern:
//     "stats": {
//       "SOME_KEY": SOME_VAL
// 
// 
//   },
const rx = /("stats": \{\s*"[a-zA-Z]+":\s*-?\d+(?:,\s*"[a-zA-Z]+":\s*-?\d+)*\s+)\s*\},/g;
text = text.replace(rx, '$1    }\n  },');

fs.writeFileSync('items.ts', text, 'utf8');
console.log('Fixed missing stats closing brace');
