import { useReducer, useState } from 'react';
import { gameReducer } from './engine/gameReducer';
import type { GameState } from './types';
import CombatView from './components/CombatView';
import MapView from './components/MapView';
import DraftView from './components/DraftView';
import EventView from './components/EventView';
import RestView from './components/RestView';
import RelicTray from './components/RelicTray';
import DeathView from './components/DeathView';
import VictoryView from './components/VictoryView';
import StoryEditor from './editor/StoryEditor';
import WorldMaker from './world-maker/WorldMaker';
import styles from './App.module.css';

type AppMode = 'game' | 'story-editor' | 'world-maker';

const INITIAL_APP_STATE: GameState = {
  phase: 'map',
  run: null,
  combat: null,
};

export default function App() {
  const [mode, setMode] = useState<AppMode>('game');
  const [state, dispatch] = useReducer(gameReducer, INITIAL_APP_STATE);

  if (mode === 'story-editor') {
    return (
      <div>
        <div className={styles.modeBar}>
          <button className={styles.modeBtn} onClick={() => setMode('game')}>← Game</button>
          <span className={styles.modeCurrent}>Story Editor</span>
          <button className={styles.modeBtn} onClick={() => setMode('world-maker')}>World Maker →</button>
        </div>
        <div className={styles.editorOffset}>
          <StoryEditor />
        </div>
      </div>
    );
  }

  if (mode === 'world-maker') {
    return (
      <div>
        <div className={styles.modeBar}>
          <button className={styles.modeBtn} onClick={() => setMode('story-editor')}>← Story Editor</button>
          <span className={styles.modeCurrent}>World Maker</span>
        </div>
        <div className={styles.editorOffset}>
          <WorldMaker />
        </div>
      </div>
    );
  }

  // Main menu (no run active)
  if (!state.run) {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.wordmark}>FONT</h1>
          <p className={styles.tagline}>your only limit is you</p>
          <p className={styles.subtitle}>A Game of Spirits &amp; Spark</p>
        </header>
        <main className={styles.main}>
          <button
            className={styles.startBtn}
            onClick={() => dispatch({ type: 'START_RUN' })}
          >
            Begin your run
          </button>
          <div className={styles.toolLinks}>
            <button className={styles.toolBtn} onClick={() => setMode('story-editor')}>
              Story Editor
            </button>
            <button className={styles.toolBtn} onClick={() => setMode('world-maker')}>
              World Maker
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { run } = state;

  return (
    <div className={styles.gameRoot}>
      {/* Relic tray — always visible during a run */}
      {(state.phase === 'map' || state.phase === 'combat') && run.player.relicIds.length > 0 && (
        <div className={styles.relicBar}>
          <RelicTray relicIds={run.player.relicIds} />
        </div>
      )}

      {state.phase === 'map' && (
        <MapView nodes={run.nodes} dispatch={dispatch} />
      )}

      {state.phase === 'combat' && state.combat && (
        <CombatView gameState={state} dispatch={dispatch} />
      )}

      {state.phase === 'draft' && (
        <DraftView gameState={state} dispatch={dispatch} />
      )}

      {state.phase === 'event' && (
        <EventView gameState={state} dispatch={dispatch} />
      )}

      {state.phase === 'rest' && (
        <RestView gameState={state} dispatch={dispatch} />
      )}

      {state.phase === 'victory' && (
        <VictoryView run={run} dispatch={dispatch} />
      )}

      {state.phase === 'death' && (
        <DeathView run={run} dispatch={dispatch} />
      )}
    </div>
  );
}
