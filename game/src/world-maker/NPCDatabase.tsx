import { useState } from 'react';
import type { WorldNPC, BankerRank } from './types';
import type { FactionId } from '../types/story';
import styles from './WorldMaker.module.css';

const FACTION_LABELS: Record<FactionId, string> = {
  guild: 'The Guild',
  cult_of_mugen: 'Cult of Mugen',
  veneration: 'Veneration of Makami Shu',
  iron_chorus: 'Iron Chorus',
  silent_market: 'Silent Market',
};

const RANKS: BankerRank[] = ['D', 'C', 'B', 'A', 'S'];
const FACTION_IDS: FactionId[] = ['guild', 'cult_of_mugen', 'veneration', 'iron_chorus', 'silent_market'];

function makeId() {
  return 'npc_' + Math.random().toString(36).slice(2, 7);
}

function blankNPC(): WorldNPC {
  return {
    id: makeId(),
    name: 'Unnamed NPC',
    faction: 'guild',
    rank: 'D',
    role: '',
    description: '',
    dialogueTreeId: '',
    repeatable: true,
  };
}

interface Props {
  npcs: WorldNPC[];
  onChange: (npcs: WorldNPC[]) => void;
}

export default function NPCDatabase({ npcs, onChange }: Props) {
  const [editing, setEditing] = useState<WorldNPC | null>(null);

  const save = (updated: WorldNPC) => {
    onChange(npcs.map(n => (n.id === updated.id ? updated : n)));
    setEditing(updated);
  };

  const addNew = () => {
    const n = blankNPC();
    onChange([...npcs, n]);
    setEditing(n);
  };

  const remove = (id: string) => {
    onChange(npcs.filter(n => n.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  if (editing) {
    return (
      <div className={styles.dbEditor}>
        <div className={styles.dbTopBar}>
          <h3 className={styles.dbTitle}>Edit NPC</h3>
          <button className={styles.backBtn} onClick={() => setEditing(null)}>← Back</button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Name</label>
          <input className={styles.inputSm} value={editing.name}
            onChange={e => save({ ...editing, name: e.target.value })} />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabelSm}>Faction</label>
            <select className={styles.selectSm} value={editing.faction}
              onChange={e => save({ ...editing, faction: e.target.value as FactionId })}>
              {FACTION_IDS.map(f => <option key={f} value={f}>{FACTION_LABELS[f]}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabelSm}>Rank</label>
            <select className={styles.selectSm} value={editing.rank}
              onChange={e => save({ ...editing, rank: e.target.value as BankerRank })}>
              {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Role</label>
          <input className={styles.inputSm} value={editing.role}
            placeholder="e.g. Guild Registration Officer"
            onChange={e => save({ ...editing, role: e.target.value })} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Description</label>
          <textarea className={styles.textareaSm} value={editing.description} rows={3}
            onChange={e => save({ ...editing, description: e.target.value })} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabelSm}>Dialogue tree ID</label>
          <input className={styles.inputSm} value={editing.dialogueTreeId}
            placeholder="e.g. dialogue_izuru"
            onChange={e => save({ ...editing, dialogueTreeId: e.target.value })} />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabelSm}>Min. standing to access</label>
            <input className={styles.inputSm} type="number" value={editing.requiredStanding ?? ''}
              placeholder="0"
              onChange={e => save({ ...editing, requiredStanding: e.target.value ? Number(e.target.value) : undefined })} />
          </div>
          <div className={styles.fieldGroupInline}>
            <label className={styles.fieldLabelSm}>Repeatable</label>
            <input type="checkbox" checked={editing.repeatable}
              onChange={e => save({ ...editing, repeatable: e.target.checked })} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dbRoot}>
      <div className={styles.dbTopBar}>
        <h3 className={styles.dbTitle}>NPC Database</h3>
        <button className={styles.addBtn} onClick={addNew}>+ Add NPC</button>
      </div>
      <table className={styles.dbTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Faction</th>
            <th>Rank</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {npcs.map(npc => (
            <tr key={npc.id} className={styles.dbRow} onClick={() => setEditing(npc)}>
              <td className={styles.tdName}>{npc.name}</td>
              <td><span className={styles.factionChip}>{FACTION_LABELS[npc.faction]}</span></td>
              <td className={styles.tdRank}>{npc.rank}</td>
              <td className={styles.tdRole}>{npc.role}</td>
              <td>
                <button className={styles.removeRowBtn} onClick={e => { e.stopPropagation(); remove(npc.id); }}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {npcs.length === 0 && <p className={styles.emptyState}>No NPCs yet. Add one to start building your world.</p>}
    </div>
  );
}
