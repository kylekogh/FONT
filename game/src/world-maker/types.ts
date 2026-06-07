import type { FactionId } from '../types/story';

export type TileType =
  | 'void'
  | 'floor'
  | 'wall'
  | 'door'
  | 'water'
  | 'hazard'
  | 'spawn'
  | 'exit'
  | 'npc_marker'
  | 'event_marker'
  | 'shop_marker'
  | 'rest_marker';

export interface Tile {
  type: TileType;
  npcId?: string;
  eventId?: string;
  label?: string;
}

export interface TileMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: Tile[][];
  tileSize: number;
  region: WorldRegion;
}

export type WorldRegion =
  | 'sora_inner_ring'
  | 'sora_industrial_ring'
  | 'sora_outer_ring'
  | 'guild_center'
  | 'mugen_entrance'
  | 'mugen_depth_1'
  | 'mugen_depth_2'
  | 'mugen_depth_3';

export type BankerRank = 'D' | 'C' | 'B' | 'A' | 'S';

export interface WorldNPC {
  id: string;
  name: string;
  faction: FactionId;
  rank: BankerRank;
  role: string;
  description: string;
  dialogueTreeId: string;
  sprite?: string;
  repeatable: boolean;
  requiredStanding?: number;
}

export interface QuestCondition {
  type: 'item' | 'standing' | 'switch' | 'floor_reached' | 'npc_spoken';
  value: string | number;
}

export interface QuestReward {
  gold?: number;
  hpPercent?: number;
  cardId?: string;
  relicId?: string;
  factionDelta?: { factionId: FactionId; amount: number };
}

export interface WorldQuest {
  id: string;
  title: string;
  description: string;
  giverId: string;
  conditions: QuestCondition[];
  rewards: QuestReward[];
  factionContext?: FactionId;
}

export type DialogueNodeType = 'line' | 'choice' | 'end';

export interface DialogueChoice {
  id: string;
  text: string;
  nextNodeId: string;
  requiresStanding?: number;
  requiresSwitch?: string;
}

export interface DialogueNode {
  id: string;
  type: DialogueNodeType;
  speakerId: string;
  speakerName: string;
  text: string;
  nextNodeId?: string;
  choices?: DialogueChoice[];
}

export interface DialogueTree {
  id: string;
  name: string;
  startNodeId: string;
  nodes: DialogueNode[];
}

export type FactionStandingMap = Partial<Record<FactionId, number>>;

export interface WorldState {
  switches: Record<string, boolean>;
  variables: Record<string, number>;
  factionStanding: FactionStandingMap;
  completedQuests: string[];
  spokenNPCs: string[];
}

export interface WorldMakerProject {
  id: string;
  name: string;
  maps: TileMap[];
  npcs: WorldNPC[];
  quests: WorldQuest[];
  dialogueTrees: DialogueTree[];
  worldState: WorldState;
  createdAt: number;
  updatedAt: number;
}
