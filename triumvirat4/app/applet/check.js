const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8');
const lines = code.split('\n');
let depth = 0;
let tryDepth = 0;

for (let i = 247; i < 2400; i++) {
  const line = lines[i];
  if (line === undefined) continue;
  
  // Remove string literals and comments to avoid false positives
  let cleanLine = line.replace(/'(?:\\\\.|[^\\\\'])*'/g, '').replace(/"(?:\\\\.|[^\\\\"])*"/g, '').replace(/\/\/.*/, '').replace(/\/\*[\s\S]*?\*\//g, '');
  
  const open = (cleanLine.match(/\{/g) || []).length;
  const close = (cleanLine.match(/\}/g) || []).length;
  
  depth += open - close;
  
  if (i === 263) { // line 264 (index 263) is `try {`
    tryDepth = depth;
  }
  
  if (i > 263 && depth < tryDepth) {
    console.log(`try block closed at line ${i + 1}: ${line}`);
    break;
  }
}
