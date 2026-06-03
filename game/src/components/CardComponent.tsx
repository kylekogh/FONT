import { useState } from 'react';
import type { CardInstance } from '../types';
import styles from './CardComponent.module.css';

interface Props {
  card: CardInstance;
  isPlayable: boolean;
  onClick?: () => void;
  showTooltip?: boolean;
  compact?: boolean;
}

function describeEffects(card: CardInstance): string {
  const def = card.definition;
  const parts: string[] = [];

  const describe = (effects: typeof def.effects) => {
    for (const e of effects) {
      switch (e.type) {
        case 'deal_damage':
          parts.push(`Deal ${e.amount} damage`);
          break;
        case 'gain_block':
          parts.push(`Gain ${e.amount} Block`);
          break;
        case 'apply_status':
          if (e.target === 'enemy') {
            parts.push(`Apply ${e.stacks} ${capitalize(e.status)} to enemy`);
          } else {
            parts.push(`Gain ${e.stacks} ${capitalize(e.status)}`);
          }
          break;
        case 'draw_cards':
          parts.push(`Draw ${e.amount} card${e.amount !== 1 ? 's' : ''}`);
          break;
        case 'gain_energy':
          parts.push(`Gain ${e.amount} energy`);
          break;
        case 'deal_damage_per_status':
          parts.push(`Deal ${e.multiplier} damage per ${e.status} on enemy`);
          break;
        case 'multiple':
          describe(e.effects);
          break;
      }
    }
  };

  describe(def.effects);
  return parts.join('. ');
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function typeColor(type: string): string {
  switch (type) {
    case 'attack': return '#C45050';
    case 'skill': return '#4A7EC4';
    case 'power': return '#8B5FC4';
    default: return '#888';
  }
}

export default function CardComponent({ card, isPlayable, onClick, showTooltip = true, compact = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const def = card.definition;
  const effectText = describeEffects(card);

  const pips = Array.from({ length: def.cost }, (_, i) => (
    <span key={i} className={styles.pip} />
  ));
  if (def.cost === 0) pips.push(<span key="zero" className={styles.pipZero}>0</span>);

  return (
    <div
      className={[
        styles.card,
        isPlayable ? styles.playable : styles.unplayable,
        compact ? styles.compact : '',
      ].join(' ')}
      onClick={isPlayable ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={isPlayable ? 'button' : undefined}
      tabIndex={isPlayable ? 0 : undefined}
      onKeyDown={isPlayable && onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      <div className={styles.topRow}>
        <span className={styles.cost}>
          {pips.length > 0 ? pips : <span className={styles.pipZero}>0</span>}
        </span>
        <span className={styles.name}>{def.name}</span>
        <span className={styles.type} style={{ color: typeColor(def.type) }}>
          {capitalize(def.type)}
        </span>
      </div>

      {!compact && (
        <>
          <div className={styles.divider} />
          <div className={styles.effectText}>{effectText || 'No effect'}</div>
          <div className={styles.flavor}>{def.flavor}</div>
        </>
      )}

      {showTooltip && hovered && compact && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipName}>{def.name}</div>
          <div className={styles.tooltipEffect}>{effectText}</div>
          <div className={styles.tooltipFlavor}>{def.flavor}</div>
        </div>
      )}
    </div>
  );
}
