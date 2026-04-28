const fs = require('fs');
let s = fs.readFileSync('items.ts', 'utf8');

// There are a few errors in the python generated items.ts:
// 1. Missing `}` for `stats`:
//    "stats": { ...some stuff... } [MISSING `}`]
//    "description": ... 
// OR
//    "stats": { ...some stuff... } [MISSING `}`]
//   },
// 
// 2. Early close:
//    "stats": { ...some stuff... }
//   },
//     "price": 100
//     "type": "weapon"
//   },

let lines = s.split('\n');
let fixed = [];
let inStats = false;
let inItem = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('"stats": {')) {
     inStats = true;
     // wait, maybe it closes on the same line?
     if (line.includes('}')) inStats = false;
  } else if (inStats) {
     // if we are in stats, and the line is just `  },`
     // or `    "description":`
     if (line.match(/^  \},$/)) {
         fixed.push('    }'); // close stats
         inStats = false;
     } else if (line.match(/^\s*"(description|price|rarity|type|name|id)":/)) {
         fixed.push('    },'); // close stats with comma
         inStats = false;
     }
  }

  // Handle early close. If line is `  },` and the next line is `    "price":`
  if (line.match(/^  \},$/) && i + 1 < lines.length && lines[i+1].match(/^\s*"(price|type|description|rarity|name|id)":/)) {
      // it was an early close. DO NOT push `  },`, just push nothing (or maybe `,` to the previous line if it was stats)
      // Actually we already closed stats. We just don't push this `},`.
      let prevLines = fixed.length;
      if (prevLines > 0 && !fixed[prevLines-1].endsWith(',')) {
         // if previous line didn't end with comma, we might need one? 
         // wait, let's just skip it, and it will continue.
      }
      continue; 
  }
  
  fixed.push(line);
}

fs.writeFileSync('items.ts.fixed', fixed.join('\n'), 'utf8');
