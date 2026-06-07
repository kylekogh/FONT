import { useState, useCallback } from 'react';
import type { WorldMakerProject, TileMap, WorldNPC, DialogueTree } from './types';
import { buildSoraTemplate } from './soraTemplate';
import TileMapEditor from './TileMapEditor';
import NPCDatabase from './NPCDatabase';
import DialogueEditor from './DialogueEditor';
import styles from './WorldMaker.module.css';

type Tab = 'maps' | 'npcs' | 'dialogue' | 'quests' | 'export';

export default function WorldMaker() {
  const [project, setProject] = useState<WorldMakerProject>(buildSoraTemplate);
  const [activeTab, setActiveTab] = useState<Tab>('maps');
  const [activeMapId, setActiveMapId] = useState<string>(project.maps[0]?.id ?? '');

  const activeMap = project.maps.find(m => m.id === activeMapId) ?? project.maps[0];

  const updateMap = useCallback((updated: TileMap) => {
    setProject(p => ({ ...p, maps: p.maps.map(m => (m.id === updated.id ? updated : m)) }));
  }, []);

  const updateNPCs = useCallback((npcs: WorldNPC[]) => {
    setProject(p => ({ ...p, npcs }));
  }, []);

  const updateDialogue = useCallback((trees: DialogueTree[]) => {
    setProject(p => ({ ...p, dialogueTrees: trees }));
  }, []);

  const exportProject = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_').toLowerCase()}.font-world.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string) as WorldMakerProject;
        setProject(data);
        setActiveMapId(data.maps[0]?.id ?? '');
      } catch {
        alert('Invalid .font-world.json file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const TABS: Array<{ key: Tab; label: string; count?: number }> = [
    { key: 'maps', label: 'Maps', count: project.maps.length },
    { key: 'npcs', label: 'NPCs', count: project.npcs.length },
    { key: 'dialogue', label: 'Dialogue', count: project.dialogueTrees.length },
    { key: 'quests', label: 'Quests', count: project.quests.length },
    { key: 'export', label: 'Export' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>FONT World Maker</h1>
          <p className={styles.subtitle}>Build in the world of Sora</p>
        </div>
        <div className={styles.headerActions}>
          <input
            className={styles.projectName}
            value={project.name}
            onChange={e => setProject(p => ({ ...p, name: e.target.value }))}
          />
          <label className={styles.importBtnSm}>
            Import
            <input type="file" accept=".json" onChange={importProject} style={{ display: 'none' }} />
          </label>
          <button className={styles.newProjectBtn} onClick={() => {
            if (confirm('Reset to Sora template? All unsaved changes will be lost.')) {
              const t = buildSoraTemplate();
              setProject(t);
              setActiveMapId(t.maps[0]?.id ?? '');
            }
          }}>
            Reset to Template
          </button>
        </div>
      </div>

      <div className={styles.tabBar}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.count !== undefined && <span className={styles.tabCount}>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'maps' && (
          <div className={styles.mapsLayout}>
            <div className={styles.mapList}>
              {project.maps.map(m => (
                <button
                  key={m.id}
                  className={`${styles.mapListItem} ${m.id === activeMapId ? styles.mapListItemActive : ''}`}
                  onClick={() => setActiveMapId(m.id)}
                >
                  <span className={styles.mapListName}>{m.name}</span>
                  <span className={styles.mapListMeta}>{m.width}×{m.height}</span>
                </button>
              ))}
            </div>
            {activeMap && (
              <TileMapEditor map={activeMap} onChange={updateMap} />
            )}
          </div>
        )}

        {activeTab === 'npcs' && (
          <NPCDatabase npcs={project.npcs} onChange={updateNPCs} />
        )}

        {activeTab === 'dialogue' && (
          <DialogueEditor trees={project.dialogueTrees} onChange={updateDialogue} />
        )}

        {activeTab === 'quests' && (
          <div className={styles.questsTab}>
            <div className={styles.questList}>
              {project.quests.map(q => (
                <div key={q.id} className={styles.questCard}>
                  <div className={styles.questTitle}>{q.title}</div>
                  <p className={styles.questDesc}>{q.description}</p>
                  <div className={styles.questMeta}>
                    <span className={styles.questId}>{q.id}</span>
                    <span className={styles.questId}>Giver: {q.giverId}</span>
                    <span className={styles.questId}>{q.conditions.length} condition(s)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.questHint}>
              Quest authoring via the Story Editor. Quests are linked to story events through questTrigger outcomes.
            </p>
          </div>
        )}

        {activeTab === 'export' && (
          <div className={styles.exportTab}>
            <h2 className={styles.exportTitle}>Export World</h2>
            <p className={styles.exportDesc}>
              Export your world as a <code>.font-world.json</code> file. This file can be imported back into the World Maker or consumed by the FONT game runtime to load your maps, NPCs, quests, and dialogue.
            </p>
            <div className={styles.exportStats}>
              <div className={styles.statBox}><span className={styles.statNum}>{project.maps.length}</span><span className={styles.statLabel}>Maps</span></div>
              <div className={styles.statBox}><span className={styles.statNum}>{project.npcs.length}</span><span className={styles.statLabel}>NPCs</span></div>
              <div className={styles.statBox}><span className={styles.statNum}>{project.quests.length}</span><span className={styles.statLabel}>Quests</span></div>
              <div className={styles.statBox}><span className={styles.statNum}>{project.dialogueTrees.length}</span><span className={styles.statLabel}>Dialogue Trees</span></div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>{project.dialogueTrees.reduce((sum, t) => sum + t.nodes.length, 0)}</span>
                <span className={styles.statLabel}>Total Nodes</span>
              </div>
            </div>
            <button className={styles.exportMainBtn} onClick={exportProject}>
              Export {project.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
