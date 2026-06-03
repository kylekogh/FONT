import type { EnemyState, PlayerState, EnemyIntent } from '../types';
import { getEnemyDefinition } from '../data/enemies';
import { applyDamage, applyBlock, applyStatus } from './combat';

export function getEnemyIntent(enemy: EnemyState): EnemyIntent {
  const def = getEnemyDefinition(enemy.behaviorId);
  if (!def) return { label: 'Unknown', type: 'attack', value: 0 };
  return def.getIntent(enemy.turnCount, enemy.hp);
}

export interface EnemyTurnResult {
  player: PlayerState;
  enemy: EnemyState;
  log: string;
}

export function executeEnemyTurn(
  enemy: EnemyState,
  player: PlayerState,
  relicIds: string[]
): EnemyTurnResult {
  const behaviorId = enemy.behaviorId;
  const turn = enemy.turnCount;
  let updatedPlayer: PlayerState = { ...player };
  let updatedEnemy: EnemyState = { ...enemy };
  let log = '';

  // Check for hollow_shard relic (first time taking damage, gain block equal to dmg)
  // This is handled in the reducer when damage is taken

  switch (behaviorId) {
    case 'ashfields_runner': {
      // Always attacks for 5
      updatedPlayer = applyDamage(updatedPlayer, 5, updatedEnemy) as PlayerState;
      log = `${enemy.name} attacks for 5 damage.`;
      break;
    }

    case 'limit_seeker': {
      // Cycle: attack(8) / attack(8) / heavy(15)
      const cycle = turn % 3;
      if (cycle === 0 || cycle === 1) {
        updatedPlayer = applyDamage(updatedPlayer, 8, updatedEnemy) as PlayerState;
        log = `${enemy.name} attacks for 8 damage.`;
      } else {
        updatedPlayer = applyDamage(updatedPlayer, 15, updatedEnemy) as PlayerState;
        log = `${enemy.name} surges forward — 15 damage.`;
      }
      break;
    }

    case 'feral_binder': {
      if (turn === 0) {
        updatedPlayer = applyStatus(updatedPlayer, 'weak', 2) as PlayerState;
        log = `${enemy.name} binds your hands — Weak 2.`;
      } else {
        updatedPlayer = applyDamage(updatedPlayer, 7, updatedEnemy) as PlayerState;
        log = `${enemy.name} attacks for 7 damage.`;
      }
      break;
    }

    case 'venerator_guard': {
      if (turn % 2 === 0) {
        updatedEnemy = applyBlock(updatedEnemy, 10) as EnemyState;
        log = `${enemy.name} raises their guard — gains 10 block.`;
      } else {
        updatedPlayer = applyDamage(updatedPlayer, 12, updatedEnemy) as PlayerState;
        log = `${enemy.name} attacks for 12 damage.`;
      }
      break;
    }

    case 'dimmed_fighter': {
      if (turn % 2 === 0) {
        updatedPlayer = applyDamage(updatedPlayer, 8, updatedEnemy) as PlayerState;
        updatedPlayer = applyStatus(updatedPlayer, 'burn', 2) as PlayerState;
        log = `${enemy.name} attacks for 8 damage and applies Burn 2.`;
      } else {
        updatedPlayer = applyDamage(updatedPlayer, 8, updatedEnemy) as PlayerState;
        log = `${enemy.name} attacks for 8 damage.`;
      }
      break;
    }

    case 'mugen_cultist': {
      if (turn === 0) {
        updatedPlayer = applyStatus(updatedPlayer, 'vulnerable', 2) as PlayerState;
        log = `${enemy.name} exposes you — Vulnerable 2.`;
      } else {
        updatedPlayer = applyDamage(updatedPlayer, 10, updatedEnemy) as PlayerState;
        log = `${enemy.name} attacks for 10 damage.`;
      }
      break;
    }

    case 'deepwalker': {
      // 3 hits of 4
      for (let i = 0; i < 3; i++) {
        updatedPlayer = applyDamage(updatedPlayer, 4, updatedEnemy) as PlayerState;
      }
      log = `${enemy.name} strikes three times — 3x4 damage.`;
      break;
    }

    case 'the_rival': {
      // Phase 1 (hp > 60): attack(12) + Vulnerable every non-3rd turn, else gain 10 block
      // Phase 2 (hp <= 60): attack(18) + Burn(3), every 3rd gain 10 block
      if (enemy.hp > 60) {
        if (turn % 3 === 2) {
          updatedEnemy = applyBlock(updatedEnemy, 10) as EnemyState;
          updatedPlayer = applyStatus(updatedPlayer, 'vulnerable', 1) as PlayerState;
          log = `The Rival steadies — gains 10 block and exposes you.`;
        } else {
          updatedPlayer = applyDamage(updatedPlayer, 12, updatedEnemy) as PlayerState;
          updatedPlayer = applyStatus(updatedPlayer, 'vulnerable', 1) as PlayerState;
          log = `The Rival attacks for 12 damage and exposes you.`;
        }
      } else {
        if (turn % 3 === 2) {
          updatedEnemy = applyBlock(updatedEnemy, 10) as EnemyState;
          updatedPlayer = applyStatus(updatedPlayer, 'burn', 3) as PlayerState;
          log = `The Rival ignites — gains 10 block and applies Burn 3.`;
        } else {
          updatedPlayer = applyDamage(updatedPlayer, 18, updatedEnemy) as PlayerState;
          updatedPlayer = applyStatus(updatedPlayer, 'burn', 3) as PlayerState;
          log = `The Rival erupts — 18 damage and Burn 3.`;
        }
      }
      break;
    }

    default: {
      updatedPlayer = applyDamage(updatedPlayer, 5, updatedEnemy) as PlayerState;
      log = `${enemy.name} attacks for 5 damage.`;
    }
  }

  // Handle hollow_shard relic — gain block equal to first damage taken
  // This is handled in the reducer since we need to track "first hit this combat"

  // Apply strength bonus to damage — strength adds to all attacks
  // (Already handled in applyDamage via attacker.statuses.strength in resolveEffect)

  // Increment turn count for next time
  const def = getEnemyDefinition(updatedEnemy.behaviorId);
  const nextTurn = updatedEnemy.turnCount + 1;
  const nextIntent = def ? def.getIntent(nextTurn, updatedEnemy.hp) : updatedEnemy.intent;

  updatedEnemy = {
    ...updatedEnemy,
    turnCount: nextTurn,
    intent: nextIntent,
  };

  // Suppress unused variable warning
  void relicIds;

  return { player: updatedPlayer, enemy: updatedEnemy, log };
}
