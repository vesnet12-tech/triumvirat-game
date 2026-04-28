import * as fs from 'fs';

let content = fs.readFileSync('skills.ts', 'utf8');

const prefixMatch = content.match(/([\s\S]*?)export const SKILL_CATALOG/);
const prefix = prefixMatch ? prefixMatch[1] : '';

// Just extract the object part.
const objMatch = content.match(/export const SKILL_CATALOG: Record<string, Skill> = (\{[\s\S]*?\});/);
if (objMatch) {
    const catalog = eval('(' + objMatch[1] + ')');
    const newCatalog: any = {};
    for (const key in catalog) {
        if (catalog[key].type !== 'passive' && !catalog[key].isPassive) {
            newCatalog[key] = catalog[key];
        }
    }
    const newContent = prefix + 'export const SKILL_CATALOG: Record<string, Skill> = ' + JSON.stringify(newCatalog, null, 2) + ';\n';
    fs.writeFileSync('skills.ts', newContent);
    console.log('Removed passives!');
} else {
    console.log('Failed to parse catalog object.');
}
