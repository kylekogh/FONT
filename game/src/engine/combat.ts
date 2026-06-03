import type { CombatantState, CardEffect, StatusEffect } from '../types';

export function applyDamage(
  target: CombatantState,
  amount: number,
  attacker: CombatantState
): CombatantState {
  const isWeak = (attacker.statuses.weak ?? 0) > 0;
  const isVulnerable = (target.statuses.vulnerable ?? 0) > 0;

  let dmg = Math.floor(amount * (isWeak ? 0.75 : 1));
  dmg = Math.floor(dmg * (isVulnerable ? 1.5 : 1));

  const absorbed = Math.min(target.block, dmg);
  return {
    ...target,
    block: target.block - absorbed,
    hp: Math.max(0, target.hp - (dmg - absorbed)),
  };
}

export function applyBlock(target: CombatantState, amount: number): CombatantState {
  return { ...target, block: target.block + amount };
}

export function applyStatus(
  target: CombatantState,
  status: StatusEffect,
  stacks: number
): CombatantState {
  return {
    ...target,
    statuses: {
      ...target.statuses,
      [status]: (target.statuses[status] ?? 0) + stacks,
    },
  };
}

export function tickStatuses(target: CombatantState): CombatantState {
  const burn = target.statuses.burn ?? 0;
  const hp = burn > 0 ? Math.max(0, target.hp - burn) : target.hp;
  return {
    ...target,
    hp,
    block: 0,
    statuses: {
      ...target.statuses,
      weak: Math.max(0, (target.statuses.weak ?? 0) - 1),
      vulnerable: Math.max(0, (target.statuses.vulnerable ?? 0) - 1),
      burn: burn > 0 ? Math.max(0, burn - 1) : 0,
    },
  };
}

export function resolveEffect(
  effect: CardEffect,
  player: CombatantState,
  enemy: CombatantState
): { player: CombatantState; enemy: CombatantState } {
  switch (effect.type) {
    case 'deal_damage':
      return { player, enemy: applyDamage(enemy, effect.amount, player) };
    case 'gain_block':
      return { player: applyBlock(player, effect.amount), enemy };
    case 'apply_status':
      if (effect.target === 'enemy') {
        return { player, enemy: applyStatus(enemy, effect.status, effect.stacks) };
      }
      return { player: applyStatus(player, effect.status, effect.stacks), enemy };
    case 'deal_damage_per_status': {
      const stacks = enemy.statuses[effect.status] ?? 0;
      const dmg = stacks * effect.multiplier;
      return { player, enemy: applyDamage(enemy, dmg, player) };
    }
    case 'multiple':
      return effect.effects.reduce(
        (acc, e) => resolveEffect(e, acc.player, acc.enemy),
        { player, enemy }
      );
    default:
      return { player, enemy };
  }
}
