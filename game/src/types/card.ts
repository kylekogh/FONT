export type CardType = 'attack' | 'skill' | 'power';
export type Faction = 'kindled' | 'cult' | 'veneration' | 'guild' | 'weld' | 'neutral';

export type CardEffect =
  | { type: 'deal_damage'; amount: number }
  | { type: 'gain_block'; amount: number }
  | { type: 'apply_status'; status: StatusEffect; stacks: number; target: 'enemy' | 'self' }
  | { type: 'draw_cards'; amount: number }
  | { type: 'gain_energy'; amount: number }
  | { type: 'deal_damage_per_status'; status: StatusEffect; multiplier: number }
  | { type: 'multiple'; effects: CardEffect[] };

export type StatusEffect = 'weak' | 'vulnerable' | 'burn' | 'strength';

export interface CardDefinition {
  id: string;
  name: string;
  cost: number;
  type: CardType;
  faction: Faction;
  effects: CardEffect[];
  flavor: string;
  upgraded?: boolean;
  upgradeId?: string; // points to upgraded version
}

export interface CardInstance {
  instanceId: string;
  definition: CardDefinition;
}
