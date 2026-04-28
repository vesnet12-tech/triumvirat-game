import * as fs from 'fs';

let content = fs.readFileSync('locations.ts', 'utf8');

const whistlingForestRegex = /("id": "loc_forest_whispering",[\s\S]*?"monsters": \[)[\s\S]*?(\])/;

content = content.replace(whistlingForestRegex, '$1\n      "mob_forest_wolf",\n      "mob_forest_goblin",\n      "mob_forest_spider",\n      "mob_forest_bear"\n    $2');

fs.writeFileSync('locations.ts', content, 'utf8');
