const fs = require('fs');

let content = fs.readFileSync('locations.ts', 'utf8');

// Instead of parsing, we can just replace everything from "export const WORLD_LOCATIONS..." to the end.
// First, let's find the location data for eldoria and whispering forest from the text or rebuild it.
// Actually, it's easier to just match the array using Regex.

let locListMatch = content.match(/export const WORLD_LOCATIONS: LocationData\[\] = (\[[\s\S]*?\n\]);/);
if (locListMatch) {
  // It's a huge array, we can use basic JS evaluation.
  const oldText = locListMatch[1];
  
  const eldoriaStr = `  {
    "id": "loc_city_eldoria",
    "name": "Элдория",
    "type": "city",
    "levelMin": 1,
    "levelMax": 100,
    "description": "Столица королевства, центр торговли и ремесел. Здесь безопасно.",
    "monsters": [],
    "npcs": [
      {
        "id": "npc_eldoria_blacksmith",
        "name": "Кузнец Торвард",
        "description": "Мастер по заточке оружия и брони."
      }
    ]
  }`;
  
  const whisperingStr = `  {
    "id": "loc_forest_whispering",
    "name": "Шепчущий Лес",
    "type": "forest",
    "levelMin": 1,
    "levelMax": 5,
    "description": "Древний лес, полный загадок и слабых монстров.",
    "monsters": [ // these are existing ones, let's just make it empty and let monsters logic spawn by level
      "mob_loc_forest_whispering_1",
      "mob_loc_forest_whispering_2"
    ]
  }`;

  const newArrayStr = `[\n${eldoriaStr},\n${whisperingStr}\n]`;
  
  const newContent = content.replace(oldText, newArrayStr);
  fs.writeFileSync('locations.ts', newContent, 'utf8');
  console.log('Replaced WORLD_LOCATIONS successfully.');
} else {
  console.log('Could not find WORLD_LOCATIONS');
}
