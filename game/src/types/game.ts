import type { CardInstance } from './card';
import type { StatusEffect } from './card';

export type NodeType = 'encounter' | 'event' | 'rest' | 'shop' | 'boss';
export type GamePhase = 'map' | 'combat' | 'draft' | 'event' | 'rest' | 'victory' | 'death';

export type StatusState = Partial<Record<StatusEffect, number>>;

export interface CombatantState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  statuses: StatusState;
}

export interface EnemyIntent {
  label: string;
  type: 'attack' | 'defend' | 'buff' | 'debuff';
  value?: number;
}

export interface EnemyState extends CombatantState {
  intent: EnemyIntent;
  behaviorId: string;
  turnCount: number;
}

export interface PlayerState extends CombatantState {
  energy: number;
  maxEnergy: number;
  gold: number;
  relicIds: string[];
}

export interface CombatState {
  player: PlayerState;
  enemy: EnemyState;
  hand: CardInstance[];
  drawPile: CardInstance[];
  discardPile: CardInstance[];
  exhaustPile: CardInstance[];
  turn: number;
  phase: 'player_turn' | 'enemy_turn' | 'resolving';
}

export interface MapNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  connections: string[]; // node ids this connects to
  visited: boolean;
  available: boolean;
}

export interface RunState {
  deck: CardInstance[];
  player: Omit<PlayerState, 'block' | 'statuses' | 'energy'>;
  currentNodeId: string | null;
  nodes: MapNode[];
  floor: number;
  runComplete: boolean;
  outcome: 'victory' | 'death' | null;
  stats: RunStats;
}

export interface RunStats {
  encountersWon: number;
  cardsDrafted: number;
  relicsAcquired: number;
  turnsPlayed: number;
  damageDealt: number;
  damageTaken: number;
}

export interface GameState {
  phase: GamePhase;
  run: RunState | null;
  combat: CombatState | null;
}
