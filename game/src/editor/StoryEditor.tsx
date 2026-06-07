import { useState, useCallback } from 'react';
import type { StoryEventDefinition, StoryChoice, StoryOutcome, FactionId } from '../types/story';
import { STORY_EVENTS } from '../data/storyEvents';
import styles from './StoryEditor.module.css';

const FACTION_IDS: FactionId[] = ['guild', 'cult_of_mugen', 'veneration', 'iron_chorus', 'silent_market'];
const FACTION_LABELS: Record<FactionId, string> = {
  guild: 'The Guild',
  cult_of_mugen: 'Cult of Mugen',
  veneration: 'Veneration of Makami Shu',
  iron_chorus: 'Iron Chorus',
  silent_market: 'Silent Market',
};

function makeId(): string {
  return 'evt_' + Math.random().toString(36).slice(2, 9);
}

function blankChoice(): StoryChoice {
  return {
    id: makeId(),
    label: '',
    outcomeText: '',
    outcome: { nothing: true },
  };
}

function blankEvent(): StoryEventDefinition {
  return {
    id: makeId(),
    title: 'New Event',
    description: '',
    choices: [blankChoice()],
    trigger: 'map_event',
    flavorTags: [],
  };
}

interface ChoiceEditorProps {
  choice: StoryChoice;
  onChange: (updated: StoryChoice) => void;
  onRemove: () => void;
}

function ChoiceEditor({ choice, onChange, onRemove }: ChoiceEditorProps) {
  const setOutcome = (patch: Partial<StoryOutcome>) =>
    onChange({ ...choice, outcome: { ...choice.outcome, ...patch } });

  const toggleFactionDelta = (factionId: FactionId) => {
    const deltas = choice.outcome.factionDeltas ?? [];
    const existing = deltas.find(d => d.factionId === factionId);
    if (existing) {
      setOutcome({ factionDeltas: deltas.filter(d => d.factionId !== factionId) });
    } else {
      setOutcome({ factionDeltas: [...deltas, { factionId, amount: 5 }] });
    }
  };

  const setFactionDeltaAmount = (factionId: FactionId, amount: number) => {
    const deltas = (choice.outcome.factionDeltas ?? []).map(d =>
      d.factionId === factionId ? { ...d, amount } : d
    );
    setOutcome({ factionDeltas: deltas });
  };

  return (
    <div className={styles.choiceCard}>
      <div className={styles.choiceHeader}>
        <span className={styles.choiceTag}>Choice</span>
        <button className={styles.removeBtn} onClick={onRemove}>✕</button>
      </div>

      <label className={styles.fieldLabel}>Label</label>
      <input
        className={styles.input}
        value={choice.label}
        placeholder="e.g. Push deeper"
        onChange={e => onChange({ ...choice, label: e.target.value })}
      />

      <label className={styles.fieldLabel}>Outcome flavour text</label>
      <input
        className={styles.input}
        value={choice.outcomeText}
        placeholder="e.g. You lose something, but gain more ground."
        onChange={e => onChange({ ...choice, outcomeText: e.target.value })}
      />

      <div className={styles.outcomeRow}>
        <div className={styles.outcomeField}>
          <label className={styles.fieldLabel}>HP change</label>
          <input
            className={styles.inputSmall}
            type="number"
            value={choice.outcome.hpChange ?? ''}
            placeholder="0"
            onChange={e => setOutcome({ hpChange: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </div>
        <div className={styles.outcomeField}>
          <label className={styles.fieldLabel}>Gold change</label>
          <input
            className={styles.inputSmall}
            type="number"
            value={choice.outcome.goldChange ?? ''}
            placeholder="0"
            onChange={e => setOutcome({ goldChange: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </div>
        <div className={styles.outcomeField}>
          <label className={styles.fieldLabel}>Add random card</label>
          <input
            type="checkbox"
            checked={!!choice.outcome.addRandomCard}
            onChange={e => setOutcome({ addRandomCard: e.target.checked || undefined })}
          />
        </div>
      </div>

      <label className={styles.fieldLabel}>Faction standing changes</label>
      <div className={styles.factionGrid}>
        {FACTION_IDS.map(fId => {
          const delta = choice.outcome.factionDeltas?.find(d => d.factionId === fId);
          return (
            <div key={fId} className={styles.factionRow}>
              <input
                type="checkbox"
                checked={!!delta}
                onChange={() => toggleFactionDelta(fId)}
              />
              <span className={styles.factionLabel}>{FACTION_LABELS[fId]}</span>
              {delta && (
                <input
                  className={styles.inputTiny}
                  type="number"
                  value={delta.amount}
                  onChange={e => setFactionDeltaAmount(fId, Number(e.target.value))}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EventEditorProps {
  event: StoryEventDefinition;
  onChange: (updated: StoryEventDefinition) => void;
  onClose: () => void;
}

function EventEditor({ event, onChange, onClose }: EventEditorProps) {
  const updateChoice = (idx: number, updated: StoryChoice) => {
    const choices = event.choices.map((c, i) => (i === idx ? updated : c));
    onChange({ ...event, choices });
  };

  const removeChoice = (idx: number) => {
    onChange({ ...event, choices: event.choices.filter((_, i) => i !== idx) });
  };

  const addChoice = () => {
    onChange({ ...event, choices: [...event.choices, blankChoice()] });
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(event, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.eventEditor}>
      <div className={styles.editorTopBar}>
        <h2 className={styles.editorTitle}>Edit Event</h2>
        <div className={styles.editorActions}>
          <button className={styles.exportBtn} onClick={exportJSON}>Export JSON</button>
          <button className={styles.closeBtn} onClick={onClose}>← Back</button>
        </div>
      </div>

      <div className={styles.editorFields}>
        <label className={styles.fieldLabel}>Event ID</label>
        <input
          className={styles.input}
          value={event.id}
          onChange={e => onChange({ ...event, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
        />

        <label className={styles.fieldLabel}>Title</label>
        <input
          className={styles.input}
          value={event.title}
          onChange={e => onChange({ ...event, title: e.target.value })}
        />

        <label className={styles.fieldLabel}>Description</label>
        <textarea
          className={styles.textarea}
          value={event.description}
          rows={4}
          onChange={e => onChange({ ...event, description: e.target.value })}
        />

        <div className={styles.metaRow}>
          <div>
            <label className={styles.fieldLabel}>Trigger</label>
            <select
              className={styles.select}
              value={event.trigger ?? 'map_event'}
              onChange={e => onChange({ ...event, trigger: e.target.value as StoryEventDefinition['trigger'] })}
            >
              <option value="map_event">Map Event</option>
              <option value="npc_encounter">NPC Encounter</option>
              <option value="exploration">Exploration</option>
              <option value="combat_end">After Combat</option>
              <option value="rest_site">Rest Site</option>
            </select>
          </div>
          <div>
            <label className={styles.fieldLabel}>Faction Context</label>
            <select
              className={styles.select}
              value={event.factionContext ?? ''}
              onChange={e => onChange({ ...event, factionContext: (e.target.value as FactionId) || undefined })}
            >
              <option value="">None</option>
              {FACTION_IDS.map(f => (
                <option key={f} value={f}>{FACTION_LABELS[f]}</option>
              ))}
            </select>
          </div>
        </div>

        <label className={styles.fieldLabel}>Flavor tags (comma-separated)</label>
        <input
          className={styles.input}
          value={(event.flavorTags ?? []).join(', ')}
          placeholder="e.g. guild, authority, registration"
          onChange={e =>
            onChange({
              ...event,
              flavorTags: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
            })
          }
        />
      </div>

      <div className={styles.choicesSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Choices</h3>
          <button className={styles.addChoiceBtn} onClick={addChoice}>+ Add Choice</button>
        </div>
        {event.choices.map((choice, idx) => (
          <ChoiceEditor
            key={choice.id}
            choice={choice}
            onChange={updated => updateChoice(idx, updated)}
            onRemove={() => removeChoice(idx)}
          />
        ))}
      </div>

      <div className={styles.jsonPreview}>
        <h3 className={styles.sectionTitle}>JSON Preview</h3>
        <pre className={styles.jsonBlock}>{JSON.stringify(event, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function StoryEditor() {
  const [events, setEvents] = useState<StoryEventDefinition[]>(STORY_EVENTS);
  const [editing, setEditing] = useState<StoryEventDefinition | null>(null);

  const saveEvent = useCallback(
    (updated: StoryEventDefinition) => {
      setEvents(prev => prev.map(e => (e.id === updated.id ? updated : e)));
      setEditing(updated);
    },
    []
  );

  const createNew = () => {
    const e = blankEvent();
    setEvents(prev => [...prev, e]);
    setEditing(e);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string) as StoryEventDefinition;
        setEvents(prev => {
          const exists = prev.find(x => x.id === data.id);
          return exists ? prev.map(x => (x.id === data.id ? data : x)) : [...prev, data];
        });
        setEditing(data);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'font_story_events.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (editing) {
    return (
      <EventEditor
        event={editing}
        onChange={saveEvent}
        onClose={() => setEditing(null)}
      />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>FONT Story Editor</h1>
          <p className={styles.subtitle}>Author events for the world of Sora</p>
        </div>
        <div className={styles.topActions}>
          <label className={styles.importBtn}>
            Import JSON
            <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} />
          </label>
          <button className={styles.exportAllBtn} onClick={exportAll}>Export All</button>
          <button className={styles.newBtn} onClick={createNew}>+ New Event</button>
        </div>
      </div>

      <div className={styles.eventGrid}>
        {events.map(event => (
          <button key={event.id} className={styles.eventCard} onClick={() => setEditing(event)}>
            <div className={styles.eventCardHeader}>
              <span className={styles.eventTitle}>{event.title}</span>
              {event.factionContext && (
                <span className={styles.factionBadge}>{FACTION_LABELS[event.factionContext]}</span>
              )}
            </div>
            <p className={styles.eventDesc}>{event.description.slice(0, 100)}…</p>
            <div className={styles.eventMeta}>
              <span className={styles.eventId}>{event.id}</span>
              <span className={styles.choiceCount}>{event.choices.length} choices</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
