const fs = require('fs');
const diff = require('child_process').execSync('git clone https://github.com/vesnet12-tech/triumvirat-game.git /tmp/tg && cd /tmp/tg && git diff main:triumvirat4/items.ts main:triumvirat5/items.ts | wc -l').toString();
console.log(diff);
