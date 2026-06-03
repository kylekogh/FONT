import type { PlayerState } from '../types';
import styles from './PlayerHUD.module.css';

interface Props {
  player: PlayerState;
}

function statusLabel(status: string, stacks: number): string {
  switch (status) {
    case 'burn': return `Burn ${stacks}`;
    case 'weak': return `Weak ${stacks}`;
    case 'vulnerable': return `Vulnerable ${stacks}`;
    case 'strength': return `Str ${stacks}`;
    default: return `${status} ${stacks}`;
  }
}

export default function PlayerHUD({ player }: Props) {
  const hpPct = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const statusEntries = Object.entries(player.statuses).filter(([, v]) => v > 0);

  const energyPips = Array.from({ length: player.maxEnergy }, (_, i) => (
    <span
      key={i}
      className={i < player.energy ? styles.pipActive : styles.pipEmpty}
    />
  ));

  return (
    <div className={styles.hud}>
      <div className={styles.name}>{player.name}</div>

      <div className={styles.hpRow}>
        <div className={styles.hpBar}>
          <div className={styles.hpFill} style={{ width: `${hpPct}%` }} />
        </div>
        <span className={styles.hpText}>{player.hp} / {player.maxHp}</span>
      </div>

      {player.block > 0 && (
        <div className={styles.block}>Block {player.block}</div>
      )}

      <div className={styles.energyRow}>
        {energyPips}
        <span className={styles.energyLabel}>{player.energy} / {player.maxEnergy}</span>
      </div>

      {statusEntries.length > 0 && (
        <div className={styles.statuses}>
          {statusEntries.map(([s, v]) => (
            <span key={s} className={[styles.statusBadge, styles[s]].join(' ')}>
              {statusLabel(s, v)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
