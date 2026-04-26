import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('./items.ts', 'utf8');

// A quick and dirty regex replace for the price field based on rarity/type.
content = content.replace(/"id":\s*"(.*?)",(?:.|\n)*?"type":\s*"(.*?)"/g, (match, id, type) => {
   // Actually, regex matching json accurately in a big file is risky.
   return match;
});
