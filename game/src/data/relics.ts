import type { RelicDefinition } from '../types';

export const ALL_RELICS: RelicDefinition[] = [
  {
    id: 'burning_coal',
    name: 'Burning Coal',
    description: 'At the start of combat, apply 1 Burn to all enemies.',
    flavor: 'A coal from the Star Path forge. Still warm.',
    trigger: 'on_combat_start',
  },
  {
    id: 'ardour_stone',
    name: 'Ardour Stone',
    description: 'Gain 1 maximum energy.',
    flavor: 'Condensed standing. Carry it and feel the weight of every fight you have won.',
    trigger: 'passive',
  },
  {
    id: 'star_path_token',
    name: 'Star Path Token',
    description: 'At the start of your first turn each combat, draw 1 additional card.',
    flavor: 'Entry token to the dojo. Stamped with the Champion\'s seal.',
    trigger: 'on_turn_start',
  },
  {
    id: 'weld_focus',
    name: 'Weld Focus',
    description: 'Your first attack each combat deals +3 damage.',
    flavor: "Fae's work. It carries something.",
    trigger: 'on_attack',
  },
  {
    id: 'hollow_shard',
    name: 'Hollow Shard',
    description: 'The first time you take damage each combat, gain block equal to the damage taken.',
    flavor: 'A fragment of a broken bond. Still remembers how to hold.',
    trigger: 'on_take_damage',
  },
];

export function getRelicById(id: string): RelicDefinition | undefined {
  return ALL_RELICS.find(r => r.id === id);
}
