import type {
  GameState,
  CombatState,
  RunState,
  PlayerState,
  EnemyState,
  MapNode,
  CardInstance,
} from '../types';
import { getStarterDeckDefs, getDraftPool, getCardById } from '../data/cards';
import { getEnemyDefinition, makeEnemyState, ENCOUNTER_POOL, ELITE_POOL, BOSS_ID } from '../data/enemies';
import { getEventById } from '../data/events';
import { generateMap, advanceMap } from '../data/mapGenerator';
import { makeInstance, shuffle, drawCards, discardHand } from './deck';
import { resolveEffect, tickStatuses, applyBlock, applyStatus, applyDamage } from './combat';
import { executeEnemyTurn } from './enemyAI';

// ── Action types ────────────────────────────────────────────────────────────

export type GameAction =
  | { type: 'START_RUN' }
  | { type: 'SELECT_NODE'; nodeId: string }
  | { type: 'START_COMBAT'; enemyId: string }
  | { type: 'PLAY_CARD'; instanceId: string }
  | { type: 'END_TURN' }
  | { type: 'END_COMBAT' }
  | { type: 'DRAFT_CARD'; cardId: string }
  | { type: 'SKIP_DRAFT' }
  | { type: 'SELECT_EVENT_CHOICE'; choiceId: string }
  | { type: 'REST_HEAL' }
  | { type: 'REST_UPGRADE'; instanceId: string }
  | { type: 'RETURN_TO_MENU' };

// ── Initial states ──────────────────────────────────────────────────────────

export const INITIAL_STATE: GameState = {
  phase: 'map',
  run: null,
  combat: null,
};

// The pre-run state (menu)
export const MENU_STATE: GameState = {
  phase: 'map',
  run: null,
  combat: null,
};

function buildStarterDeck(): CardInstance[] {
  return getStarterDeckDefs().map(def => makeInstance(def));
}

function makeInitialPlayer(): PlayerState {
  return {
    id: 'player',
    name: 'The Kindled',
    hp: 80,
    maxHp: 80,
    block: 0,
    statuses: {},
    energy: 3,
    maxEnergy: 3,
    gold: 0,
    relicIds: [],
  };
}

function makeInitialRun(): RunState {
  const deck = buildStarterDeck();
  const player = makeInitialPlayer();
  const nodes = generateMap();
  return {
    deck,
    player: {
      id: player.id,
      name: player.name,
      hp: player.hp,
      maxHp: player.maxHp,
      gold: player.gold,
      relicIds: player.relicIds,
    },
    currentNodeId: null,
    nodes,
    floor: 0,
    runComplete: false,
    outcome: null,
    stats: {
      encountersWon: 0,
      cardsDrafted: 0,
      relicsAcquired: 0,
      turnsPlayed: 0,
      damageDealt: 0,
      damageTaken: 0,
    },
  };
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getEnemyIdForNode(node: MapNode): string {
  if (node.type === 'boss') return BOSS_ID;
  if (node.type === 'elite') return pickRandom(ELITE_POOL);
  return pickRandom(ENCOUNTER_POOL);
}

function applyRelicPassives(player: PlayerState): PlayerState {
  // ardour_stone — +1 max energy
  if (player.relicIds.includes('ardour_stone')) {
    return { ...player, maxEnergy: 4 };
  }
  return player;
}

function startCombat(run: RunState, enemyId: string): CombatState {
  const def = getEnemyDefinition(enemyId);
  if (!def) throw new Error(`Unknown enemy: ${enemyId}`);

  const enemy: EnemyState = makeEnemyState(def);

  const basePlayer: PlayerState = {
    id: run.player.id,
    name: run.player.name,
    hp: run.player.hp,
    maxHp: run.player.maxHp,
    block: 0,
    statuses: {},
    energy: run.player.relicIds.includes('ardour_stone') ? 4 : 3,
    maxEnergy: run.player.relicIds.includes('ardour_stone') ? 4 : 3,
    gold: run.player.gold,
    relicIds: run.player.relicIds,
  };

  // Apply relic: burning_coal — apply 1 burn to enemy at combat start
  let combatEnemy = enemy;
  if (run.player.relicIds.includes('burning_coal')) {
    combatEnemy = applyStatus(combatEnemy, 'burn', 1) as EnemyState;
  }

  const shuffledDeck = shuffle(run.deck);
  const { hand, drawPile, discard } = drawCards([], shuffledDeck, [], 5);

  // star_path_token — draw 1 extra card on turn 1
  let finalHand = hand;
  let finalDrawPile = drawPile;
  let finalDiscard = discard;
  if (run.player.relicIds.includes('star_path_token')) {
    const result = drawCards(hand, drawPile, discard, 1);
    finalHand = result.hand;
    finalDrawPile = result.drawPile;
    finalDiscard = result.discard;
  }

  return {
    player: basePlayer,
    enemy: combatEnemy,
    hand: finalHand,
    drawPile: finalDrawPile,
    discardPile: finalDiscard,
    exhaustPile: [],
    turn: 1,
    phase: 'player_turn',
  };
}

// ── State flags for relic tracking ─────────────────────────────────────────
// We track these as fields on CombatState. Since we can't modify the type easily,
// we use a side-channel approach via a separate context object stored transiently.
// For simplicity, we track these in the combat log approach by encoding state
// into the existing CombatState structure via unused fields.

// Actually we'll add them as optional fields and cast. Let me use a local approach.

interface ExtendedCombatState extends CombatState {
  weldFocusUsed?: boolean;
  hollowShardUsed?: boolean;
  combatLog: string[];
  draftChoices?: string[]; // card ids
  currentEventId?: string;
  currentNodeId?: string;
}

// ── Reducer ─────────────────────────────────────────────────────────────────

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_RUN': {
      const run = makeInitialRun();
      return {
        phase: 'map',
        run,
        combat: null,
      };
    }

    case 'RETURN_TO_MENU': {
      return {
        phase: 'map',
        run: null,
        combat: null,
      };
    }

    case 'SELECT_NODE': {
      if (!state.run) return state;
      const node = state.run.nodes.find(n => n.id === action.nodeId);
      if (!node || !node.available || node.visited) return state;

      const updatedNodes = advanceMap(state.run.nodes, action.nodeId);
      const updatedRun: RunState = {
        ...state.run,
        nodes: updatedNodes,
        currentNodeId: action.nodeId,
        floor: state.run.floor + 1,
      };

      if (node.type === 'encounter' || node.type === 'elite' || node.type === 'boss') {
        const enemyId = getEnemyIdForNode(node);
        const combatState = startCombat(updatedRun, enemyId) as ExtendedCombatState;
        combatState.combatLog = [`Combat begins. You face ${getEnemyDefinition(enemyId)?.name ?? enemyId}.`];
        combatState.currentNodeId = action.nodeId;
        return {
          phase: 'combat',
          run: updatedRun,
          combat: combatState,
        };
      }

      if (node.type === 'event') {
        const eventIds = ['the_descent', 'unregistered_binder', 'the_fragment'];
        const eventId = pickRandom(eventIds);
        const ext = { combatLog: [], currentEventId: eventId, currentNodeId: action.nodeId } as Partial<ExtendedCombatState>;
        return {
          phase: 'event',
          run: updatedRun,
          combat: { ...state.combat, ...ext } as CombatState,
        };
      }

      if (node.type === 'rest') {
        return {
          phase: 'rest',
          run: updatedRun,
          combat: null,
        };
      }

      if (node.type === 'shop') {
        // For now, shop just returns to map (can expand later)
        return {
          phase: 'map',
          run: updatedRun,
          combat: null,
        };
      }

      return { ...state, run: updatedRun };
    }

    case 'START_COMBAT': {
      if (!state.run) return state;
      const combatState = startCombat(state.run, action.enemyId) as ExtendedCombatState;
      combatState.combatLog = [`Combat begins.`];
      return {
        phase: 'combat',
        run: state.run,
        combat: combatState,
      };
    }

    case 'PLAY_CARD': {
      if (!state.combat || state.combat.phase !== 'player_turn') return state;
      if (!state.run) return state;

      const ext = state.combat as ExtendedCombatState;
      const cardInst = ext.hand.find(c => c.instanceId === action.instanceId);
      if (!cardInst) return state;

      const def = cardInst.definition;
      if (ext.player.energy < def.cost) return state;

      let player = { ...ext.player, energy: ext.player.energy - def.cost };
      let enemy = { ...ext.enemy };
      const log: string[] = [...(ext.combatLog ?? [])];

      // Apply weld_focus relic — first attack deals +3
      let weldFocusUsed = ext.weldFocusUsed ?? false;
      let extraDamage = 0;
      if (def.type === 'attack' && player.relicIds.includes('weld_focus') && !weldFocusUsed) {
        extraDamage = 3;
        weldFocusUsed = true;
      }

      // Handle draw_cards and gain_energy as special effects not in resolveEffect
      let newHand = ext.hand.filter(c => c.instanceId !== action.instanceId);
      let drawPile = ext.drawPile;
      let discardPile = ext.discardPile;

      // For each effect, check for draw/energy, resolve others
      const processEffects = (effects: typeof def.effects) => {
        for (const effect of effects) {
          if (effect.type === 'draw_cards') {
            const result = drawCards(newHand, drawPile, discardPile, effect.amount);
            newHand = result.hand;
            drawPile = result.drawPile;
            discardPile = result.discard;
          } else if (effect.type === 'gain_energy') {
            player = { ...player, energy: player.energy + effect.amount };
          } else if (effect.type === 'multiple') {
            processEffects(effect.effects);
          } else {
            // Apply extra damage for weld_focus on first attack effect
            let effectToResolve = effect;
            if (effect.type === 'deal_damage' && extraDamage > 0) {
              effectToResolve = { ...effect, amount: effect.amount + extraDamage };
              extraDamage = 0; // only once
            }
            const result = resolveEffect(effectToResolve, player, enemy);
            player = result.player as PlayerState;
            enemy = result.enemy as EnemyState;
          }
        }
      };

      processEffects(def.effects);

      // Track damage dealt
      const dmgDealt = (ext.enemy.hp - enemy.hp);
      const updatedStats = {
        ...state.run.stats,
        damageDealt: state.run.stats.damageDealt + Math.max(0, dmgDealt),
      };

      log.push(`You play ${def.name}.`);

      // Move card to discard (unless power — powers stay but we simplify: all to discard)
      discardPile = [...discardPile, cardInst];

      // Check if enemy died from card effect
      if (enemy.hp <= 0) {
        const currentNode = state.run.nodes.find(n => n.id === (ext.currentNodeId ?? state.run?.currentNodeId));
        const isBoss = currentNode?.type === 'boss';

        const winStats = {
          ...updatedStats,
          encountersWon: updatedStats.encountersWon + 1,
        };
        const updatedRunPlayer = {
          ...state.run.player,
          hp: player.hp,
        };

        if (isBoss) {
          return {
            phase: 'victory',
            run: {
              ...state.run,
              player: updatedRunPlayer,
              runComplete: true,
              outcome: 'victory',
              stats: winStats,
            },
            combat: null,
          };
        }

        const draftPool = getDraftPool();
        const shuffledPool = shuffle(draftPool);
        const choices = shuffledPool.slice(0, 3).map(c => c.id);

        return {
          phase: 'draft',
          run: {
            ...state.run,
            player: updatedRunPlayer,
            stats: winStats,
          },
          combat: {
            ...ext,
            player,
            enemy: enemy as EnemyState,
            hand: newHand,
            drawPile,
            discardPile,
            combatLog: log.slice(-5),
            weldFocusUsed,
            draftChoices: choices,
          } as ExtendedCombatState,
        };
      }

      const newCombat: ExtendedCombatState = {
        ...ext,
        player,
        enemy: enemy as EnemyState,
        hand: newHand,
        drawPile,
        discardPile,
        combatLog: log.slice(-5),
        weldFocusUsed,
      };

      return {
        ...state,
        run: { ...state.run, stats: updatedStats },
        combat: newCombat,
      };
    }

    case 'END_TURN': {
      if (!state.combat || !state.run) return state;
      const ext = state.combat as ExtendedCombatState;
      const log: string[] = [...(ext.combatLog ?? [])];

      // 1. Discard hand
      const { hand: emptyHand, discard: afterDiscard } = discardHand(ext.hand, ext.discardPile);

      // 2. Tick player statuses (burn ticks, weak/vuln reduce, block resets)
      const tickedPlayer = tickStatuses({ ...ext.player, block: ext.player.block }) as PlayerState;

      // 3. Enemy acts
      const enemyResult = executeEnemyTurn(ext.enemy, tickedPlayer, state.run.player.relicIds);
      let updatedPlayer = enemyResult.player as PlayerState;
      const updatedEnemy = enemyResult.enemy as EnemyState;
      log.push(enemyResult.log);

      // hollow_shard — first time taking damage this combat, gain block equal to damage
      const hollowShardUsed = ext.hollowShardUsed ?? false;
      if (
        state.run.player.relicIds.includes('hollow_shard') &&
        !hollowShardUsed &&
        enemyResult.player.hp < tickedPlayer.hp
      ) {
        const dmgTaken = tickedPlayer.hp - enemyResult.player.hp;
        updatedPlayer = applyBlock(updatedPlayer, dmgTaken) as PlayerState;
        log.push(`Hollow Shard activates — you gain ${dmgTaken} block.`);
      }
      const newHollowShardUsed = hollowShardUsed || (enemyResult.player.hp < tickedPlayer.hp);

      // 4. Track damage taken
      const damageTaken = Math.max(0, tickedPlayer.hp - updatedPlayer.hp);
      const updatedStats = {
        ...state.run.stats,
        damageTaken: state.run.stats.damageTaken + damageTaken,
        turnsPlayed: state.run.stats.turnsPlayed + 1,
      };

      // 5. Tick enemy statuses
      const tickedEnemy = tickStatuses(updatedEnemy) as EnemyState;

      // 6. Draw new hand (5 cards)
      const drawCount = state.run.player.relicIds.includes('star_path_token') && ext.turn === 0 ? 6 : 5;
      const { hand: newHand, drawPile, discard: newDiscard } = drawCards(
        emptyHand,
        ext.drawPile,
        afterDiscard,
        drawCount
      );

      // 7. Restore energy
      const maxEnergy = state.run.player.relicIds.includes('ardour_stone') ? 4 : 3;
      const restoredPlayer: PlayerState = {
        ...updatedPlayer,
        energy: maxEnergy,
        maxEnergy,
      };

      // 8. Check enemy dead
      if (tickedEnemy.hp <= 0) {
        const currentNode = state.run.nodes.find(n => n.id === (ext.currentNodeId ?? state.run?.currentNodeId));
        const isBoss = currentNode?.type === 'boss';

        const winStats = {
          ...updatedStats,
          encountersWon: updatedStats.encountersWon + 1,
        };

        const updatedRunPlayer = {
          ...state.run.player,
          hp: restoredPlayer.hp,
          maxHp: restoredPlayer.maxHp,
        };

        if (isBoss) {
          return {
            phase: 'victory',
            run: {
              ...state.run,
              player: updatedRunPlayer,
              runComplete: true,
              outcome: 'victory',
              stats: winStats,
            },
            combat: null,
          };
        }

        // Regular combat won — go to draft
        const draftPool = getDraftPool();
        const shuffledPool = shuffle(draftPool);
        const choices = shuffledPool.slice(0, 3).map(c => c.id);

        return {
          phase: 'draft',
          run: {
            ...state.run,
            player: updatedRunPlayer,
            stats: winStats,
          },
          combat: {
            ...ext,
            player: restoredPlayer,
            enemy: tickedEnemy,
            hand: newHand,
            drawPile,
            discardPile: newDiscard,
            combatLog: log.slice(-5),
            draftChoices: choices,
            hollowShardUsed: newHollowShardUsed,
          } as ExtendedCombatState,
        };
      }

      // 9. Check player dead
      if (updatedPlayer.hp <= 0) {
        const updatedRunPlayer = {
          ...state.run.player,
          hp: 0,
        };
        return {
          phase: 'death',
          run: {
            ...state.run,
            player: updatedRunPlayer,
            runComplete: true,
            outcome: 'death',
            stats: updatedStats,
          },
          combat: null,
        };
      }

      const newCombat: ExtendedCombatState = {
        ...ext,
        player: restoredPlayer,
        enemy: tickedEnemy,
        hand: newHand,
        drawPile,
        discardPile: newDiscard,
        turn: ext.turn + 1,
        combatLog: log.slice(-5),
        hollowShardUsed: newHollowShardUsed,
      };

      return {
        ...state,
        run: { ...state.run, stats: updatedStats },
        combat: newCombat,
      };
    }

    case 'END_COMBAT': {
      if (!state.run) return state;
      const ext = state.combat as ExtendedCombatState | null;

      // Check if boss was killed
      const currentNode = state.run.nodes.find(n => n.id === (ext?.currentNodeId ?? state.run?.currentNodeId));
      const isBoss = currentNode?.type === 'boss';

      if (isBoss) {
        const updatedRunPlayer = {
          ...state.run.player,
          hp: ext?.player.hp ?? state.run.player.hp,
        };
        return {
          phase: 'victory',
          run: {
            ...state.run,
            player: updatedRunPlayer,
            runComplete: true,
            outcome: 'victory',
          },
          combat: null,
        };
      }

      const draftPool = getDraftPool();
      const shuffledPool = shuffle(draftPool);
      const choices = shuffledPool.slice(0, 3).map(c => c.id);

      return {
        phase: 'draft',
        run: state.run,
        combat: {
          ...ext,
          draftChoices: choices,
        } as CombatState,
      };
    }

    case 'DRAFT_CARD': {
      if (!state.run) return state;
      const def = getCardById(action.cardId);
      if (!def) return state;

      const newInstance = makeInstance(def);
      const updatedDeck = [...state.run.deck, newInstance];
      const updatedStats = {
        ...state.run.stats,
        cardsDrafted: state.run.stats.cardsDrafted + 1,
      };

      return {
        phase: 'map',
        run: {
          ...state.run,
          deck: updatedDeck,
          stats: updatedStats,
        },
        combat: null,
      };
    }

    case 'SKIP_DRAFT': {
      return {
        phase: 'map',
        run: state.run,
        combat: null,
      };
    }

    case 'SELECT_EVENT_CHOICE': {
      if (!state.run) return state;
      const ext = state.combat as ExtendedCombatState | null;
      const eventId = ext?.currentEventId;
      if (!eventId) return state;

      const eventDef = getEventById(eventId);
      if (!eventDef) return state;

      const choice = eventDef.choices.find(c => c.id === action.choiceId);
      if (!choice) return state;

      let updatedPlayer = { ...state.run.player };
      let updatedDeck = [...state.run.deck];

      if (choice.outcome.hpChange) {
        const newHp = Math.max(1, Math.min(updatedPlayer.hp + choice.outcome.hpChange, updatedPlayer.maxHp));
        updatedPlayer = { ...updatedPlayer, hp: newHp };
      }

      if (choice.outcome.goldChange) {
        updatedPlayer = { ...updatedPlayer, gold: updatedPlayer.gold + choice.outcome.goldChange };
      }

      if (choice.outcome.healPercent) {
        const healed = Math.floor(updatedPlayer.maxHp * choice.outcome.healPercent);
        updatedPlayer = { ...updatedPlayer, hp: Math.min(updatedPlayer.maxHp, updatedPlayer.hp + healed) };
      }

      if (choice.outcome.addRandomCard) {
        const pool = getDraftPool();
        const randDef = pickRandom(pool);
        updatedDeck = [...updatedDeck, makeInstance(randDef)];
      }

      return {
        phase: 'map',
        run: {
          ...state.run,
          player: updatedPlayer,
          deck: updatedDeck,
        },
        combat: null,
      };
    }

    case 'REST_HEAL': {
      if (!state.run) return state;
      const healAmt = Math.floor(state.run.player.maxHp * 0.3);
      const newHp = Math.min(state.run.player.maxHp, state.run.player.hp + healAmt);
      return {
        phase: 'map',
        run: {
          ...state.run,
          player: { ...state.run.player, hp: newHp },
        },
        combat: null,
      };
    }

    case 'REST_UPGRADE': {
      if (!state.run) return state;
      const inst = state.run.deck.find(c => c.instanceId === action.instanceId);
      if (!inst) return state;

      const upgradeId = inst.definition.upgradeId;
      if (!upgradeId) return state;

      const upgradedDef = getCardById(upgradeId);
      if (!upgradedDef) return state;

      const newDeck = state.run.deck.map(c =>
        c.instanceId === action.instanceId
          ? makeInstance(upgradedDef)
          : c
      );

      return {
        phase: 'map',
        run: { ...state.run, deck: newDeck },
        combat: null,
      };
    }

    default:
      return state;
  }
}

// Helper to get current event from state
export function getCurrentEvent(state: GameState) {
  const ext = state.combat as ExtendedCombatState | null;
  const eventId = ext?.currentEventId;
  if (!eventId) return null;
  return getEventById(eventId);
}

// Helper to get draft choices
export function getDraftChoices(state: GameState): string[] {
  const ext = state.combat as ExtendedCombatState | null;
  return ext?.draftChoices ?? [];
}

// Helper to get combat log
export function getCombatLog(state: GameState): string[] {
  const ext = state.combat as ExtendedCombatState | null;
  return ext?.combatLog ?? [];
}

// Helper to check if enemy is alive
export function isEnemyDead(state: GameState): boolean {
  return (state.combat?.enemy.hp ?? 1) <= 0;
}

// Avoid unused import warning
void applyDamage;
void applyRelicPassives;
