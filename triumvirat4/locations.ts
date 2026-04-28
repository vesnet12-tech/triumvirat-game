export interface LocationData {
  id: string;
  name: string;
  type: 'city' | 'forest' | 'cave' | 'dungeon' | 'mountain' | 'ruins' | 'plains' | 'swamp' | 'wasteland' | 'island';
  levelMin: number;
  levelMax: number;
  description: string;
  monsters?: string[];
  npcs?: { id: string; name: string; description: string }[];
}

export const WORLD_LOCATIONS: LocationData[] = [
  {
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
  },
  {
    "id": "loc_forest_whispering",
    "name": "Шепчущий Лес",
    "type": "forest",
    "levelMin": 1,
    "levelMax": 5,
    "description": "Древний лес, полный загадок и слабых монстров.",
    "monsters": [
      "mob_forest_slime", "mob_forest_wolf", "mob_forest_boar", "mob_forest_spider", "mob_forest_sprite",
      "mob_forest_bear", "mob_forest_goblin", "mob_forest_troll", "mob_forest_dryad", "mob_forest_ent_young",
      "mob_forest_dire_wolf", "mob_forest_hobgoblin", "mob_forest_corrupted_ent", "mob_forest_shadow", "mob_forest_grizzly", "mob_forest_bandit"
    ]
  }
];
