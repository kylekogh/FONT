import type { CardDefinition } from '../types';

// Kindled starter cards — The Kindled faction
// Philosophy: combat as the path to expression. Heat in the chest, earned ache.
export const KINDLED_CARDS: CardDefinition[] = [
  {
    id: 'kindled_strike',
    name: 'Strike',
    cost: 1,
    type: 'attack',
    faction: 'kindled',
    effects: [{ type: 'deal_damage', amount: 6 }],
    flavor: 'The first step on the path. Every Kindled fighter knows it.',
  },
  {
    id: 'kindled_brace',
    name: 'Brace',
    cost: 1,
    type: 'skill',
    faction: 'kindled',
    effects: [{ type: 'gain_block', amount: 5 }],
    flavor: 'Hold the stance. The Star Path teaches this before anything else.',
  },
  {
    id: 'kindled_surge',
    name: 'Ardour Surge',
    cost: 2,
    type: 'attack',
    faction: 'kindled',
    effects: [{ type: 'deal_damage', amount: 14 }],
    flavor: 'The heat in your chest — let it run.',
  },
];

// Neutral starter cards (available to all factions)
export const NEUTRAL_CARDS: CardDefinition[] = [
  {
    id: 'neutral_bash',
    name: 'Bash',
    cost: 2,
    type: 'attack',
    faction: 'neutral',
    effects: [
      { type: 'deal_damage', amount: 8 },
      { type: 'apply_status', status: 'vulnerable', stacks: 2, target: 'enemy' },
    ],
    flavor: 'Break the guard. What comes next is yours.',
  },
];

export const ALL_CARDS: CardDefinition[] = [...KINDLED_CARDS, ...NEUTRAL_CARDS];

export function getCardById(id: string): CardDefinition | undefined {
  return ALL_CARDS.find(c => c.id === id);
}
