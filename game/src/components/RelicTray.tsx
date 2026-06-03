import { useState } from 'react';
import { getRelicById } from '../data/relics';
import styles from './RelicTray.module.css';

interface Props {
  relicIds: string[];
}

export default function RelicTray({ relicIds }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (relicIds.length === 0) return null;

  return (
    <div className={styles.tray}>
      {relicIds.map(id => {
        const relic = getRelicById(id);
        if (!relic) return null;
        return (
          <div
            key={id}
            className={styles.relic}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.relicName}>{relic.name}</span>
            {hovered === id && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipName}>{relic.name}</div>
                <div className={styles.tooltipDesc}>{relic.description}</div>
                <div className={styles.tooltipFlavor}>{relic.flavor}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
