export type FactionId = 'guild' | 'cult_of_mugen' | 'veneration' | 'iron_chorus' | 'silent_market';

export interface FactionDelta {
  factionId: FactionId;
  amount: number;
}

export interface DialogueLine {
  speakerId: string;
  speakerName: string;
  text: string;
}

export type QuestTriggerType = 'start' | 'complete' | 'fail' | 'advance';

export interface QuestTrigger {
  questId: string;
  type: QuestTriggerType;
}

export interface StoryOutcome {
  hpChange?: number;
  goldChange?: number;
  addRandomCard?: boolean;
  healPercent?: number;
  relicId?: string;
  nothing?: boolean;
  factionDeltas?: FactionDelta[];
  questTrigger?: QuestTrigger;
  dialogueLines?: DialogueLine[];
  switchSet?: Record<string, boolean>;
  variableSet?: Record<string, number>;
}

export interface StoryChoice {
  id: string;
  label: string;
  outcomeText: string;
  outcome: StoryOutcome;
  requiresSwitch?: string;
  requiresFaction?: { factionId: FactionId; minStanding: number };
}

export type StoryEventTrigger = 'map_event' | 'npc_encounter' | 'exploration' | 'combat_end' | 'rest_site';

export interface StoryEventDefinition {
  id: string;
  title: string;
  description: string;
  choices: StoryChoice[];
  trigger?: StoryEventTrigger;
  factionContext?: FactionId;
  flavorTags?: string[];
  requiresSwitch?: string;
}
