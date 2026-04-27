import * as fs from 'fs';
import { SKILL_CATALOG } from './skills';

const statTypes = [
   { stat: 'trapDodge', name: 'шанс уклонения от ловушек' },
   { stat: 'combatDodge', name: 'маневренность (уворот в бою)' },
   { stat: 'bonusDmgPct', name: 'дополнительный урон всех атак' },
   { stat: 'maxHp', name: 'максимальное здоровье' },
   { stat: 'maxMp', name: 'максимальная мана' },
   { stat: 'attack', name: 'атака' },
   { stat: 'defense', name: 'защита' }
];

let modified = 0;

for (const id in SKILL_CATALOG) {
    const s = SKILL_CATALOG[id] as any;
    let changed = false;
    if (s.isPassive && s.description.includes('Постоянно улучшает вашу эффективность')) {
        const t = statTypes[Math.floor(Math.random() * statTypes.length)];
        const val = Math.floor(Math.random() * 10) + 10; // 10-20%
        s.description = `Пассивно увеличивает ${t.name} на ${val}%.`;
        s.buff = { stat: t.stat, valPct: val, duration: 999 };
        s.power = 0;
        changed = true;
    }
    
    // Check weak generic skills
    if (s.name.includes('Базовая атака ')) {
        s.power = Math.floor(s.power * 1.5) + 30; // buffed
        s.description = `Наносит ${s.power}% урона. (Улучшенная версия)`;
        changed = true;
    }
    if (s.name.includes('Специальный удар ')) {
        s.power = Math.floor(s.power * 1.8) + 50; 
        s.description = `Наносит ${s.power}% мощного урона. (Улучшенная версия)`;
        changed = true;
    }
    if (s.name.includes('Тактический прием')) {
        s.power = Math.floor(s.power * 1.5) + 20; 
        s.description = `Наносит ${s.power}% урона и ослабляет врага.`;
        s.debuff = { stat: 'defense', valPct: 20, duration: 2 };
        changed = true;
    }
    if (s.name.includes('Усиление класса')) {
        if (!s.buff) s.buff = { stat: 'attack', valPct: 40, duration: 3 };
        s.buff.valPct += 30;
        s.description = `Мощно увеличивает вашу боевую характеристику на ${s.buff.valPct}% на время боя.`;
        changed = true;
    }
    if (s.name.includes('Основа класса')) {
        s.description = `Пассивно увеличивает ваши характеристики на 15% и дает 15% уклонения в бою.`;
        s.buff = { stat: 'combatDodge', valPct: 15, duration: 999 };
        changed = true;
    }
    if (s.name.includes('Синхронизация духа')) {
        s.description = `Пассивно увеличивает здоровье на 15% и дает шанс уклонения от ловушек на 25%.`;
        s.power = 15;
        s.buff = { stat: 'trapDodge', valPct: 25, duration: 999 };
        changed = true;
    }

    if (changed) modified++;
}

let content = fs.readFileSync('skills.ts', 'utf8');
const startMarker = "export const SKILL_CATALOG: Record<string, Skill> = {";
const startIndex = content.indexOf(startMarker);

if (startIndex > -1) {
    const jsonStr = JSON.stringify(SKILL_CATALOG, null, 2);
    const newCatalog = "export const SKILL_CATALOG: Record<string, Skill> = " + jsonStr + ";\n";
    // Replace everything after startMarker with newCatalog
    const newContent = content.substring(0, startIndex) + newCatalog;
    fs.writeFileSync('skills.ts', newContent);
    console.log("Successfully rewrote skills.ts, modified " + modified + " skills");
} else {
    console.log("Could not find markers.");
}
