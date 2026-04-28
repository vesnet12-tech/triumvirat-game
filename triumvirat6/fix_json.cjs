const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

// The pattern:
//         }
//   },
//     "price": ...
//     "type": ...
//     "description": ...
//   },
// We want to transform:
//   },
//     "price":
// into
//     "price": (by removing the `  },` that incorrectly closed the parent early, BUT wait! `{ "attack": 5 }` needs a comma if there are subsequent fields!)

// Let's do something simpler: The user script closed the item object right after `stats`.
// `stats: { ... }\n  },\n    "price":`
// Let's replace `\n  },\n    "price":` with `,\n    "price":`

s = s.replace(/\n\s*\}\,\n\s*"price":/g, ',\n    "price":');
s = s.replace(/\n\s*\}\,\n\s*"type":/g, ',\n    "type":');
s = s.replace(/\n\s*\}\,\n\s*"description":/g, ',\n    "description":');
// maybe other floating keys:
s = s.replace(/\n\s*\}\,\n\s*"stats":/g, ',\n    "stats":');
s = s.replace(/\n\s*\}\,\n\s*"rarity":/g, ',\n    "rarity":');
s = s.replace(/\n\s*\}\,\n\s*"allowedClasses":/g, ',\n    "allowedClasses":');
s = s.replace(/\n\s*\}\,\n\s*"price":/g, ',\n    "price":');

// But beware that `stats` might end with `}` not `},`.
fs.writeFileSync('items.ts', s, 'utf8');
console.log('Fixed floating keys');
