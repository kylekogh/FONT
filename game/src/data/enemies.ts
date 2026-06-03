import type { EnemyIntent, EnemyState } from '../types';

export interface EnemyDefinition {
  id: string;
  name: string;
  hp: number;
  behaviorId: string;
  getIntent: (turnCount: number, currentHp: number) => EnemyIntent;
}

function attackIntent(value: number): EnemyIntent {
  return { label: `Attack ${value}`, type: 'attack', value };
}

function defendIntent(value: number): EnemyIntent {
  return { label: `Block ${value}`, type: 'defend', value };
}

function debuffIntent(label: string): EnemyIntent {
  return { label, type: 'debuff' };
}

export const ENEMY_DEFINITIONS: EnemyDefinition[] = [
  {
    id: 'ashfields_runner',
    name: 'Ashfields Runner',
    hp: 30,
    behaviorId: 'ashfields_runner',
    getIntent: (_turn, _hp) => attackIntent(5),
  },
  {
    id: 'limit_seeker',
    name: 'Limit-Seeker',
    hp: 45,
    behaviorId: 'limit_seeker',
    getIntent: (turn, _hp) => {
      const cycle = turn % 3;
      if (cycle === 0 || cycle === 1) return attackIntent(8);
      return attackIntent(15);
    },
  },
  {
    id: 'feral_binder',
    name: 'Feral Binder',
    hp: 38,
    behaviorId: 'feral_binder',
    getIntent: (turn, _hp) => {
      if (turn === 0) return debuffIntent('Weaken');
      return attackIntent(7);
    },
  },
  {
    id: 'venerator_guard',
    name: 'Venerator Guard',
    hp: 50,
    behaviorId: 'venerator_guard',
    getIntent: (turn, _hp) => {
      if (turn % 2 === 0) return defendIntent(10);
      return attackIntent(12);
    },
  },
  {
    id: 'dimmed_fighter',
    name: 'The Dimmed',
    hp: 42,
    behaviorId: 'dimmed_fighter',
    getIntent: (turn, _hp) => {
      if (turn % 2 === 0) return { label: 'Attack + Burn 2', type: 'attack', value: 8 };
      return attackIntent(8);
    },
  },
  {
    id: 'mugen_cultist',
    name: 'Mugen Cultist',
    hp: 35,
    behaviorId: 'mugen_cultist',
    getIntent: (turn, _hp) => {
      if (turn === 0) return debuffIntent('Expose');
      return attackIntent(10);
    },
  },
  {
    id: 'deepwalker',
    name: 'Deepwalker',
    hp: 55,
    behaviorId: 'deepwalker',
    getIntent: (_turn, _hp) => ({ label: 'Attack 3x4', type: 'attack', value: 12 }),
  },
  {
    id: 'the_rival',
    name: 'The Rival',
    hp: 120,
    behaviorId: 'the_rival',
    getIntent: (turn, hp) => {
      if (hp > 60) {
        // Phase 1
        if (turn % 3 === 2) return { label: 'Block + Menace', type: 'defend', value: 10 };
        return { label: 'Attack + Expose 1', type: 'attack', value: 12 };
      } else {
        // Phase 2 — more aggressive
        if (turn % 3 === 2) return { label: 'Block + Burn 3', type: 'defend', value: 10 };
        return { label: 'Heavy Attack + Burn 3', type: 'attack', value: 18 };
      }
    },
  },
];

export function getEnemyDefinition(id: string): EnemyDefinition | undefined {
  return ENEMY_DEFINITIONS.find(e => e.id === id);
}

export function makeEnemyState(def: EnemyDefinition): EnemyState {
  return {
    id: def.id,
    name: def.name,
    hp: def.hp,
    maxHp: def.hp,
    block: 0,
    statuses: {},
    behaviorId: def.behaviorId,
    turnCount: 0,
    intent: def.getIntent(0, def.hp),
  };
}

// Normal encounter pool (no boss, no elite)
export const ENCOUNTER_POOL = [
  'ashfields_runner',
  'limit_seeker',
  'feral_binder',
  'venerator_guard',
  'dimmed_fighter',
  'mugen_cultist',
];

export const ELITE_POOL = ['deepwalker', 'dimmed_fighter'];
export const BOSS_ID = 'the_rival';
