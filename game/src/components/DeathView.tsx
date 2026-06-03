import type { RunState } from '../types';
import type { GameAction } from '../engine/gameReducer';
import styles from './DeathView.module.css';

interface Props {
  run: RunState;
  dispatch: (action: GameAction) => void;
}

export default function DeathView({ run, dispatch }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.headline}>You fell.</div>
      <p className={styles.sub}>The deep swallowed the light. That is what it does.</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.floor}</span>
          <span className={styles.statLabel}>Floor reached</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.deck.length}</span>
          <span className={styles.statLabel}>Cards in deck</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.stats.encountersWon}</span>
          <span className={styles.statLabel}>Encounters won</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.stats.damageDealt}</span>
          <span className={styles.statLabel}>Damage dealt</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.stats.damageTaken}</span>
          <span className={styles.statLabel}>Damage taken</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{run.stats.turnsPlayed}</span>
          <span className={styles.statLabel}>Turns played</span>
        </div>
      </div>

      <button
        className={styles.restartBtn}
        onClick={() => dispatch({ type: 'RETURN_TO_MENU' })}
      >
        Begin again
      </button>
    </div>
  );
}
