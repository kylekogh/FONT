export type RelicTrigger =
  | 'on_combat_start'
  | 'on_turn_start'
  | 'on_card_played'
  | 'on_attack'
  | 'on_take_damage'
  | 'passive';

export interface RelicDefinition {
  id: string;
  name: string;
  description: string;
  flavor: string;
  trigger: RelicTrigger;
}
