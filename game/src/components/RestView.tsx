import { useState } from 'react';
import type { GameState } from '../types';
import type { GameAction } from '../engine/gameReducer';
import CardComponent from './CardComponent';
import styles from './RestView.module.css';

interface Props {
  gameState: GameState;
  dispatch: (action: GameAction) => void;
}

type RestMode = 'choose' | 'upgrade';

export default function RestView({ gameState, dispatch }: Props) {
  const [mode, setMode] = useState<RestMode>('choose');
  const [used, setUsed] = useState(false);

  if (!gameState.run) return null;

  const { run } = gameState;
  const healAmt = Math.floor(run.player.maxHp * 0.3);

  if (mode === 'upgrade') {
    return (
      <div className={styles.root}>
        <h2 className={styles.title}>Upgrade a Card</h2>
        <p className={styles.subtitle}>The dojo fire burns low. Choose what to temper.</p>
        <div className={styles.deck}>
          {run.deck.map(inst => {
            const canUpgrade = !!inst.definition.upgradeId && !inst.definition.upgraded;
            return (
              <button
                key={inst.instanceId}
                className={[styles.cardBtn, !canUpgrade ? styles.noUpgrade : ''].join(' ')}
                onClick={() => {
                  if (!canUpgrade || used) return;
                  setUsed(true);
                  dispatch({ type: 'REST_UPGRADE', instanceId: inst.instanceId });
                }}
                disabled={!canUpgrade || used}
              >
                <CardComponent
                  card={inst}
                  isPlayable={canUpgrade && !used}
                  showTooltip={true}
                  compact={true}
                />
              </button>
            );
          })}
        </div>
        {!used && (
          <button className={styles.backBtn} onClick={() => setMode('choose')}>
            Go back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Rest</h2>
      <p className={styles.subtitle}>The ache settles. For a moment, the deep is quiet.</p>

      <div className={styles.options}>
        <button
          className={styles.optionBtn}
          onClick={() => { setUsed(true); dispatch({ type: 'REST_HEAL' }); }}
          disabled={used}
        >
          <span className={styles.optionTitle}>Recover</span>
          <span className={styles.optionDesc}>Heal {healAmt} HP. ({run.player.hp} / {run.player.maxHp})</span>
        </button>

        <button
          className={styles.optionBtn}
          onClick={() => setMode('upgrade')}
          disabled={used}
        >
          <span className={styles.optionTitle}>Temper a card</span>
          <span className={styles.optionDesc}>Upgrade one card in your deck.</span>
        </button>
      </div>

      {/* Show current stats */}
      <div className={styles.stats}>
        <span className={styles.statLine}>HP: {run.player.hp} / {run.player.maxHp}</span>
        <span className={styles.statLine}>Cards in deck: {run.deck.length}</span>
      </div>
    </div>
  );
}
