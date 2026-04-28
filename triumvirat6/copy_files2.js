const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      if (childItemName === 'tmp_repo' || childItemName === 'node_modules' || childItemName === '.git') return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    if (src.includes('firebase-applet-config.json')) return;
    if (src.includes('package-lock.json')) return;
    
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync('/app/applet/tmp_repo', '/app/applet');
console.log('Done copying files');
