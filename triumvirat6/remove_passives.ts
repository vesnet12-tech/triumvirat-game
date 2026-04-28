import * as fs from 'fs';

// Read skills.ts and remove everything with type: 'passive'
let content = fs.readFileSync('skills.ts', 'utf8');

// It's going to be easier to extract the catalog, filter, and rewrite.
// Let's just do a simple replacement if we can, or evaluate it.
// We can use a trick: the file starts with some enums and interfaces.
const prefix = content.substring(0, content.indexOf('export const SKILL_CATALOG'));
let catalogText = content.substring(content.indexOf('export const SKILL_CATALOG'));

// Replace `export const SKILL_CATALOG: Record<string, Skill> = {` with `{`
catalogText = catalogText.replace('export const SKILL_CATALOG: Record<string, Skill> = ', '').replace(/;$/, '');
const catalog = eval('(' + catalogText + ')');

const newCatalog: any = {};
for (const key in catalog) {
    if (catalog[key].type !== 'passive' && !catalog[key].isPassive) {
        newCatalog[key] = catalog[key];
    }
}

const newContent = prefix + 'export const SKILL_CATALOG: Record<string, Skill> = ' + JSON.stringify(newCatalog, null, 2) + ';\n';
fs.writeFileSync('skills.ts', newContent);
console.log('Removed passives!');
