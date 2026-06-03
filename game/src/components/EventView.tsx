import type { GameState } from '../types';
import type { GameAction } from '../engine/gameReducer';
import { getCurrentEvent } from '../engine/gameReducer';
import styles from './EventView.module.css';

interface Props {
  gameState: GameState;
  dispatch: (action: GameAction) => void;
}

export default function EventView({ gameState, dispatch }: Props) {
  const event = getCurrentEvent(gameState);

  if (!event) {
    return (
      <div className={styles.root}>
        <p className={styles.desc}>Nothing here.</p>
        <button className={styles.choiceBtn} onClick={() => dispatch({ type: 'SKIP_DRAFT' })}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.desc}>{event.description}</p>
      <div className={styles.choices}>
        {event.choices.map(choice => (
          <button
            key={choice.id}
            className={styles.choiceBtn}
            onClick={() => dispatch({ type: 'SELECT_EVENT_CHOICE', choiceId: choice.id })}
          >
            <span className={styles.choiceLabel}>{choice.label}</span>
            <span className={styles.choiceOutcome}>{choice.outcomeText}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
