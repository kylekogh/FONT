import type { CombatState } from '../types';
import type { GameAction } from '../engine/gameReducer';
import { getCombatLog } from '../engine/gameReducer';
import type { GameState } from '../types';
import PlayerHUD from './PlayerHUD';
import EnemyView from './EnemyView';
import HandView from './HandView';
import styles from './CombatView.module.css';

interface Props {
  gameState: GameState;
  dispatch: (action: GameAction) => void;
}

export default function CombatView({ gameState, dispatch }: Props) {
  const combat = gameState.combat as CombatState;
  const log = getCombatLog(gameState);

  if (!combat) return null;

  const isPlayerTurn = combat.phase === 'player_turn';

  return (
    <div className={styles.root}>
      <div className={styles.arena}>
        <PlayerHUD player={combat.player} />
        <div className={styles.center}>
          <div className={styles.turnLabel}>Turn {combat.turn}</div>
          <div className={styles.log}>
            {log.slice(-3).map((line, i) => (
              <div key={i} className={styles.logLine}>{line}</div>
            ))}
          </div>
          <div className={styles.pileInfo}>
            <span className={styles.pileCount}>Draw {combat.drawPile.length}</span>
            <span className={styles.pileSep}>/</span>
            <span className={styles.pileCount}>Discard {combat.discardPile.length}</span>
          </div>
        </div>
        <EnemyView enemy={combat.enemy} />
      </div>

      <div className={styles.handArea}>
        <HandView
          hand={combat.hand}
          playerEnergy={combat.player.energy}
          onPlayCard={(id) => dispatch({ type: 'PLAY_CARD', instanceId: id })}
        />
        <button
          className={styles.endTurnBtn}
          onClick={() => dispatch({ type: 'END_TURN' })}
          disabled={!isPlayerTurn}
        >
          End Turn
        </button>
      </div>
    </div>
  );
}
