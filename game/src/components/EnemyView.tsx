import type { EnemyState } from '../types';
import styles from './EnemyView.module.css';

interface Props {
  enemy: EnemyState;
}

function intentIcon(type: EnemyState['intent']['type']): string {
  switch (type) {
    case 'attack': return '⚔';
    case 'defend': return '🛡';
    case 'buff': return '↑';
    case 'debuff': return '↓';
    default: return '?';
  }
}

function statusLabel(status: string, stacks: number): string {
  switch (status) {
    case 'burn': return `Burn ${stacks}`;
    case 'weak': return `Weak ${stacks}`;
    case 'vulnerable': return `Vulnerable ${stacks}`;
    case 'strength': return `Strength ${stacks}`;
    default: return `${status} ${stacks}`;
  }
}

export default function EnemyView({ enemy }: Props) {
  const hpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
  const statusEntries = Object.entries(enemy.statuses).filter(([, v]) => v > 0);

  return (
    <div className={styles.panel}>
      <div className={styles.name}>{enemy.name}</div>

      <div className={styles.hpRow}>
        <div className={styles.hpBar}>
          <div className={styles.hpFill} style={{ width: `${hpPct}%` }} />
        </div>
        <span className={styles.hpText}>{enemy.hp} / {enemy.maxHp}</span>
      </div>

      {enemy.block > 0 && (
        <div className={styles.block}>Block {enemy.block}</div>
      )}

      {statusEntries.length > 0 && (
        <div className={styles.statuses}>
          {statusEntries.map(([s, v]) => (
            <span key={s} className={[styles.statusBadge, styles[s]].join(' ')}>
              {statusLabel(s, v)}
            </span>
          ))}
        </div>
      )}

      <div className={styles.intent}>
        <span className={styles.intentIcon}>{intentIcon(enemy.intent.type)}</span>
        <span className={styles.intentLabel}>{enemy.intent.label}</span>
      </div>
    </div>
  );
}
