const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

// The main buggy pattern:
//     "stats": {
//       "attack": 35
//             }
//     }
//     "description":

s = s.replace(/\n\s*\}\n\s*\}\n\s*"description":/g, '\n    },\n    "description":');
// Also maybe price or type or allowedClasses got orphaned?
s = s.replace(/\n\s*\}\n\s*\}\n\s*"allowedClasses":/g, '\n    },\n    "allowedClasses":');
s = s.replace(/\n\s*\}\n\s*\}\n\s*"price":/g, '\n    },\n    "price":');
s = s.replace(/\n\s*\}\n\s*\}\n\s*"type":/g, '\n    },\n    "type":');
s = s.replace(/\n\s*\}\n\s*\}\n\s*"rarity":/g, '\n    },\n    "rarity":');
s = s.replace(/\n\s*\}\n\s*\}\n\s*"name":/g, '\n    },\n    "name":');
s = s.replace(/\n\s*\}\n\s*\}\n\s*"id":/g, '\n    },\n    "id":');

fs.writeFileSync('items.ts', s, 'utf8');
console.log('Fixed brace closures');
