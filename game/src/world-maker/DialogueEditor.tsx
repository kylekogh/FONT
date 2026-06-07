import { useState } from 'react';
import type { DialogueTree, DialogueNode, DialogueChoice, DialogueNodeType } from './types';
import styles from './WorldMaker.module.css';

function makeId() {
  return 'node_' + Math.random().toString(36).slice(2, 7);
}

function makeChoiceId() {
  return 'c_' + Math.random().toString(36).slice(2, 7);
}

function blankNode(type: DialogueNodeType = 'line'): DialogueNode {
  return {
    id: makeId(),
    type,
    speakerId: 'player',
    speakerName: 'Character',
    text: '',
    nextNodeId: undefined,
    choices: type === 'choice' ? [{ id: makeChoiceId(), text: '', nextNodeId: '' }] : undefined,
  };
}

function blankTree(): DialogueTree {
  const startId = makeId();
  return {
    id: 'dialogue_' + Math.random().toString(36).slice(2, 7),
    name: 'New Dialogue',
    startNodeId: startId,
    nodes: [{ id: startId, type: 'line', speakerId: 'npc', speakerName: 'NPC', text: '' }],
  };
}

interface NodeEditorProps {
  node: DialogueNode;
  allNodes: DialogueNode[];
  onChange: (updated: DialogueNode) => void;
}

function NodeEditor({ node, allNodes, onChange }: NodeEditorProps) {
  const setChoice = (idx: number, updated: DialogueChoice) =>
    onChange({ ...node, choices: (node.choices ?? []).map((c, i) => (i === idx ? updated : c)) });

  const addChoice = () =>
    onChange({ ...node, choices: [...(node.choices ?? []), { id: makeChoiceId(), text: '', nextNodeId: '' }] });

  const removeChoice = (idx: number) =>
    onChange({ ...node, choices: (node.choices ?? []).filter((_, i) => i !== idx) });

  return (
    <div className={styles.dialogueNode}>
      <div className={styles.dialogueNodeHeader}>
        <span className={styles.nodeIdBadge}>{node.id}</span>
        <select
          className={styles.selectXs}
          value={node.type}
          onChange={e => onChange({ ...node, type: e.target.value as DialogueNodeType })}
        >
          <option value="line">Line</option>
          <option value="choice">Choice</option>
          <option value="end">End</option>
        </select>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Speaker ID</label>
          <input className={styles.inputXs} value={node.speakerId}
            onChange={e => onChange({ ...node, speakerId: e.target.value })} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Speaker Name</label>
          <input className={styles.inputXs} value={node.speakerName}
            onChange={e => onChange({ ...node, speakerName: e.target.value })} />
        </div>
      </div>

      {node.type !== 'end' && (
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Text</label>
          <textarea className={styles.textareaSm} value={node.text} rows={2}
            onChange={e => onChange({ ...node, text: e.target.value })} />
        </div>
      )}

      {node.type === 'line' && (
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Next node</label>
          <select className={styles.selectSm} value={node.nextNodeId ?? ''}
            onChange={e => onChange({ ...node, nextNodeId: e.target.value || undefined })}>
            <option value="">— none —</option>
            {allNodes.filter(n => n.id !== node.id).map(n => (
              <option key={n.id} value={n.id}>{n.id} ({n.speakerName}: {n.text.slice(0, 30)})</option>
            ))}
          </select>
        </div>
      )}

      {node.type === 'choice' && (
        <div className={styles.choicesList}>
          <div className={styles.sectionMini}>
            <span className={styles.fieldLabelSm}>Choices</span>
            <button className={styles.tinyBtn} onClick={addChoice}>+ add</button>
          </div>
          {(node.choices ?? []).map((choice, idx) => (
            <div key={choice.id} className={styles.choiceRowInline}>
              <input
                className={styles.inputXs}
                placeholder="Choice text"
                value={choice.text}
                onChange={e => setChoice(idx, { ...choice, text: e.target.value })}
              />
              <select
                className={styles.selectXs}
                value={choice.nextNodeId}
                onChange={e => setChoice(idx, { ...choice, nextNodeId: e.target.value })}
              >
                <option value="">→ node</option>
                {allNodes.filter(n => n.id !== node.id).map(n => (
                  <option key={n.id} value={n.id}>{n.id}</option>
                ))}
              </select>
              <button className={styles.removeBtn} onClick={() => removeChoice(idx)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  trees: DialogueTree[];
  onChange: (trees: DialogueTree[]) => void;
}

export default function DialogueEditor({ trees, onChange }: Props) {
  const [activeTree, setActiveTree] = useState<DialogueTree | null>(trees[0] ?? null);

  const saveTree = (updated: DialogueTree) => {
    const next = trees.map(t => (t.id === updated.id ? updated : t));
    onChange(next);
    setActiveTree(updated);
  };

  const addTree = () => {
    const t = blankTree();
    onChange([...trees, t]);
    setActiveTree(t);
  };

  const addNode = (type: DialogueNodeType) => {
    if (!activeTree) return;
    const n = blankNode(type);
    saveTree({ ...activeTree, nodes: [...activeTree.nodes, n] });
  };

  const updateNode = (updated: DialogueNode) => {
    if (!activeTree) return;
    saveTree({ ...activeTree, nodes: activeTree.nodes.map(n => (n.id === updated.id ? updated : n)) });
  };

  const removeNode = (id: string) => {
    if (!activeTree) return;
    saveTree({ ...activeTree, nodes: activeTree.nodes.filter(n => n.id !== id) });
  };

  return (
    <div className={styles.dialogueRoot}>
      <div className={styles.dialogueSidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.fieldLabelSm}>Dialogue Trees</span>
          <button className={styles.tinyBtn} onClick={addTree}>+ new</button>
        </div>
        {trees.map(t => (
          <button
            key={t.id}
            className={`${styles.treeBtn} ${activeTree?.id === t.id ? styles.treeBtnActive : ''}`}
            onClick={() => setActiveTree(t)}
          >
            {t.name}
          </button>
        ))}
        {trees.length === 0 && <p className={styles.emptyState}>No trees yet.</p>}
      </div>

      {activeTree ? (
        <div className={styles.dialogueMain}>
          <div className={styles.dialogueTopBar}>
            <input
              className={styles.treeNameInput}
              value={activeTree.name}
              onChange={e => saveTree({ ...activeTree, name: e.target.value })}
            />
            <div className={styles.addNodeBtns}>
              <button className={styles.tinyBtn} onClick={() => addNode('line')}>+ Line</button>
              <button className={styles.tinyBtn} onClick={() => addNode('choice')}>+ Choice</button>
              <button className={styles.tinyBtn} onClick={() => addNode('end')}>+ End</button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabelSm}>Start node</label>
            <select
              className={styles.selectSm}
              value={activeTree.startNodeId}
              onChange={e => saveTree({ ...activeTree, startNodeId: e.target.value })}
            >
              {activeTree.nodes.map(n => (
                <option key={n.id} value={n.id}>{n.id}</option>
              ))}
            </select>
          </div>

          <div className={styles.nodesList}>
            {activeTree.nodes.map(node => (
              <div key={node.id} className={styles.nodeWrapper}>
                <NodeEditor
                  node={node}
                  allNodes={activeTree.nodes}
                  onChange={updateNode}
                />
                <button className={styles.removeNodeBtn} onClick={() => removeNode(node.id)}>Remove node</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.dialogueEmpty}>
          <p className={styles.emptyState}>Select or create a dialogue tree to begin.</p>
        </div>
      )}
    </div>
  );
}
