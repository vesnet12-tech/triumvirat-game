import fs from 'fs';
import path from 'path';

function findFiles(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, callback);
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.cjs')) {
      callback(filePath);
    }
  }
}

const docs = new Set();
const collections = new Set();
findFiles('.', (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const dMatch = code.match(/doc\s*\(\s*db\s*,\s*['"]([^'"]+)['"]/g) || [];
  const cMatch = code.match(/collection\s*\(\s*db\s*,\s*['"]([^'"]+)['"]/g) || [];
  dMatch.forEach(m => docs.add(m.split(/['"]/)[1]));
  cMatch.forEach(m => collections.add(m.split(/['"]/)[1]));
});

console.log('Docs:', [...docs]);
console.log('Collections:', [...collections]);
