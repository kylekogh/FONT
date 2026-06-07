import type { WorldMakerProject, TileMap, WorldNPC, WorldQuest, DialogueTree, Tile, TileType } from './types';

function makeTile(type: TileType, label?: string): Tile {
  return label ? { type, label } : { type };
}

function makeBlankMap(id: string, name: string, w: number, h: number, region: TileMap['region']): TileMap {
  const tiles: Tile[][] = Array.from({ length: h }, (_, row) =>
    Array.from({ length: w }, (_, col) => {
      if (row === 0 || row === h - 1 || col === 0 || col === w - 1) return makeTile('wall');
      return makeTile('floor');
    })
  );
  return { id, name, width: w, height: h, tiles, tileSize: 32, region };
}

function placeSpecial(map: TileMap, row: number, col: number, tile: Tile): TileMap {
  const tiles = map.tiles.map(r => [...r]);
  tiles[row][col] = tile;
  return { ...map, tiles };
}

function buildInnerRing(): TileMap {
  let map = makeBlankMap('inner_ring', 'Sora — Inner Ring', 24, 18, 'sora_inner_ring');
  map = placeSpecial(map, 9, 12, makeTile('npc_marker', 'Izuru (Guild Rep)'));
  map = placeSpecial(map, 5, 5, makeTile('event_marker', 'Cracked Wall'));
  map = placeSpecial(map, 14, 18, makeTile('shop_marker', 'Backroom Trade'));
  map = placeSpecial(map, 3, 20, makeTile('door', 'Industrial Ring'));
  map = placeSpecial(map, 14, 20, makeTile('door', 'Industrial Ring'));
  map = placeSpecial(map, 17, 12, makeTile('exit', 'Mugen Entrance'));
  return map;
}

function buildIndustrialRing(): TileMap {
  let map = makeBlankMap('industrial_ring', 'Sora — Industrial Ring', 28, 20, 'sora_industrial_ring');
  map = placeSpecial(map, 10, 14, makeTile('npc_marker', 'Forge District Broker'));
  map = placeSpecial(map, 4, 8, makeTile('rest_marker', 'Binder Hostel'));
  map = placeSpecial(map, 16, 22, makeTile('event_marker', 'Guild Checkpoint'));
  map = placeSpecial(map, 1, 14, makeTile('door', 'Outer Ring'));
  map = placeSpecial(map, 10, 1, makeTile('door', 'Inner Ring'));
  return map;
}

function buildMugenEntrance(): TileMap {
  let map = makeBlankMap('mugen_entrance', 'Mugen — Entrance', 20, 16, 'mugen_entrance');
  map = placeSpecial(map, 8, 10, makeTile('npc_marker', 'Penitent Register'));
  map = placeSpecial(map, 14, 10, makeTile('exit', 'Depth 1'));
  map = placeSpecial(map, 1, 10, makeTile('door', 'Sora Inner Ring'));
  map = placeSpecial(map, 5, 3, makeTile('event_marker', 'Offering Wall'));
  map = placeSpecial(map, 5, 17, makeTile('event_marker', 'Warning Sigil'));
  for (let c = 8; c <= 12; c++) map = placeSpecial(map, 11, c, makeTile('hazard'));
  return map;
}

export const SORA_NPCS: WorldNPC[] = [
  {
    id: 'izuru',
    name: 'Izuru',
    faction: 'guild',
    rank: 'B',
    role: 'Guild Registration Officer',
    description: 'Stationed at the Inner Ring checkpoint. Knows every registered Binder by their smell.',
    dialogueTreeId: 'dialogue_izuru',
    repeatable: true,
    requiredStanding: 0,
  },
  {
    id: 'maret',
    name: 'Maret',
    faction: 'silent_market',
    rank: 'A',
    role: 'Silent Market Broker',
    description: 'Deals in information. Never speaks first. Always knows more than they let on.',
    dialogueTreeId: 'dialogue_maret',
    repeatable: false,
    requiredStanding: 10,
  },
  {
    id: 'penitent_register',
    name: 'The Penitent Register',
    faction: 'cult_of_mugen',
    rank: 'C',
    role: 'Mugen Entrance Keeper',
    description: 'Logs every descender. Their eyes are wrong — the irises are too dark, too still.',
    dialogueTreeId: 'dialogue_penitent_register',
    repeatable: true,
    requiredStanding: 0,
  },
];

export const SORA_QUESTS: WorldQuest[] = [
  {
    id: 'register_with_guild',
    title: 'Get Registered',
    description: 'Find Izuru at the Guild checkpoint and get your Binder ID sorted.',
    giverId: 'izuru',
    conditions: [{ type: 'npc_spoken', value: 'izuru' }],
    rewards: [
      { gold: 10 },
      { factionDelta: { factionId: 'guild', amount: 15 } },
    ],
    factionContext: 'guild',
  },
  {
    id: 'first_descent',
    title: 'First Descent',
    description: 'Enter Mugen and return.',
    giverId: 'penitent_register',
    conditions: [
      { type: 'switch', value: 'mugen_entered' },
      { type: 'floor_reached', value: 2 },
    ],
    rewards: [
      { hpPercent: 0.2 },
      { factionDelta: { factionId: 'cult_of_mugen', amount: 10 } },
    ],
  },
];

export const SORA_DIALOGUE_TREES: DialogueTree[] = [
  {
    id: 'dialogue_izuru',
    name: 'Izuru — Registration',
    startNodeId: 'izuru_greet',
    nodes: [
      {
        id: 'izuru_greet',
        type: 'choice',
        speakerId: 'izuru',
        speakerName: 'Izuru',
        text: 'You. Card out. I've got four more checkpoints to run before close.',
        choices: [
          { id: 'c1', text: 'Here's my card.', nextNodeId: 'izuru_checked' },
          { id: 'c2', text: 'What if I don't have one?', nextNodeId: 'izuru_no_card' },
          { id: 'c3', text: '[Leave]', nextNodeId: 'izuru_end' },
        ],
      },
      {
        id: 'izuru_checked',
        type: 'line',
        speakerId: 'izuru',
        speakerName: 'Izuru',
        text: 'Kindled. Rank D. Fine. Don't go deeper than your rank permits — Guild policy, not my rule.',
        nextNodeId: 'izuru_end',
      },
      {
        id: 'izuru_no_card',
        type: 'line',
        speakerId: 'izuru',
        speakerName: 'Izuru',
        text: 'Then you're unregistered. I can process you here — 10g registration fee. Or you walk back out.',
        nextNodeId: 'izuru_end',
      },
      {
        id: 'izuru_end',
        type: 'end',
        speakerId: 'izuru',
        speakerName: 'Izuru',
        text: '',
      },
    ],
  },
  {
    id: 'dialogue_penitent_register',
    name: 'Penitent Register — Entrance',
    startNodeId: 'pr_greet',
    nodes: [
      {
        id: 'pr_greet',
        type: 'choice',
        speakerId: 'penitent_register',
        speakerName: 'Penitent Register',
        text: 'Name. Depth intended. Reason.',
        choices: [
          { id: 'c1', text: 'Give my name and go.', nextNodeId: 'pr_logged' },
          { id: 'c2', text: 'What happens to the names you collect?', nextNodeId: 'pr_names' },
          { id: 'c3', text: '[Walk past without answering]', nextNodeId: 'pr_end' },
        ],
      },
      {
        id: 'pr_logged',
        type: 'line',
        speakerId: 'penitent_register',
        speakerName: 'Penitent Register',
        text: 'Logged. Mugen receives you. Come back whole.',
        nextNodeId: 'pr_end',
      },
      {
        id: 'pr_names',
        type: 'line',
        speakerId: 'penitent_register',
        speakerName: 'Penitent Register',
        text: 'The deep holds them. The names that don't come back — they're still here. Just further down.',
        nextNodeId: 'pr_end',
      },
      {
        id: 'pr_end',
        type: 'end',
        speakerId: 'penitent_register',
        speakerName: 'Penitent Register',
        text: '',
      },
    ],
  },
];

export function buildSoraTemplate(): WorldMakerProject {
  return {
    id: 'sora_default',
    name: 'Sora — Starter World',
    maps: [buildInnerRing(), buildIndustrialRing(), buildMugenEntrance()],
    npcs: SORA_NPCS,
    quests: SORA_QUESTS,
    dialogueTrees: SORA_DIALOGUE_TREES,
    worldState: {
      switches: {},
      variables: {},
      factionStanding: {
        guild: 0,
        cult_of_mugen: 0,
        veneration: 0,
        iron_chorus: 0,
        silent_market: 0,
      },
      completedQuests: [],
      spokenNPCs: [],
    },
    createdAt: 0,
    updatedAt: 0,
  };
}
