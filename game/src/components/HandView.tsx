import type { CardInstance } from '../types';
import CardComponent from './CardComponent';
import styles from './HandView.module.css';

interface Props {
  hand: CardInstance[];
  playerEnergy: number;
  onPlayCard: (instanceId: string) => void;
}

export default function HandView({ hand, playerEnergy, onPlayCard }: Props) {
  return (
    <div className={styles.hand}>
      {hand.map((card, i) => {
        const isPlayable = playerEnergy >= card.definition.cost;
        const offset = hand.length > 1
          ? (i - (hand.length - 1) / 2) * 20
          : 0;
        const rotate = hand.length > 1
          ? (i - (hand.length - 1) / 2) * 3
          : 0;
        return (
          <div
            key={card.instanceId}
            className={styles.cardWrapper}
            style={{
              transform: `translateX(${offset}px) rotate(${rotate}deg)`,
              zIndex: i,
            }}
          >
            <CardComponent
              card={card}
              isPlayable={isPlayable}
              onClick={() => onPlayCard(card.instanceId)}
              showTooltip={true}
              compact={false}
            />
          </div>
        );
      })}
    </div>
  );
}
