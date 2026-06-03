import type { GameState } from '../types';
import type { GameAction } from '../engine/gameReducer';
import { getDraftChoices } from '../engine/gameReducer';
import { getCardById } from '../data/cards';
import { makeInstance } from '../engine/deck';
import CardComponent from './CardComponent';
import styles from './DraftView.module.css';

interface Props {
  gameState: GameState;
  dispatch: (action: GameAction) => void;
}

export default function DraftView({ gameState, dispatch }: Props) {
  const choiceIds = getDraftChoices(gameState);
  const choices = choiceIds
    .map(id => getCardById(id))
    .filter((d): d is NonNullable<typeof d> => d !== undefined)
    .map(def => makeInstance(def));

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Choose a Card</h2>
      <p className={styles.subtitle}>Take what the path offers. Or leave it.</p>

      <div className={styles.cards}>
        {choices.map(card => (
          <button
            key={card.instanceId}
            className={styles.cardBtn}
            onClick={() => dispatch({ type: 'DRAFT_CARD', cardId: card.definition.id })}
          >
            <CardComponent
              card={card}
              isPlayable={true}
              showTooltip={false}
              compact={false}
            />
          </button>
        ))}
      </div>

      <button
        className={styles.skipBtn}
        onClick={() => dispatch({ type: 'SKIP_DRAFT' })}
      >
        Leave it. Continue.
      </button>
    </div>
  );
}
