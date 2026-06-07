import type { StoryEventDefinition } from '../types/story';

export const STORY_EVENTS: StoryEventDefinition[] = [
  {
    id: 'guild_checkpoint',
    title: 'Guild Checkpoint',
    trigger: 'map_event',
    factionContext: 'guild',
    flavorTags: ['guild', 'authority', 'registration'],
    description:
      'Two Guild inspectors block the corridor. Rank badges, clipboard, the smell of certification ink. They want your Binder ID. You have one — the question is which name is on it.',
    choices: [
      {
        id: 'show_real',
        label: 'Show your real card',
        outcomeText: 'Your standing holds. They mark the log and step aside.',
        outcome: { factionDeltas: [{ factionId: 'guild', amount: 5 }], nothing: false },
      },
      {
        id: 'show_forged',
        label: 'Show a forged card',
        outcomeText: 'The ink smells wrong. One of them knows it. You run.',
        outcome: { hpChange: -10, factionDeltas: [{ factionId: 'guild', amount: -15 }] },
      },
      {
        id: 'bribe',
        label: 'Offer a coin and walk through',
        outcomeText: 'The older one pockets it without looking. The younger one stares at the floor.',
        outcome: { goldChange: -8, factionDeltas: [{ factionId: 'guild', amount: -3 }] },
      },
    ],
  },
  {
    id: 'mugen_cultist',
    title: 'A Devotee of the Depth',
    trigger: 'map_event',
    factionContext: 'cult_of_mugen',
    flavorTags: ['cult', 'ritual', 'transformation'],
    description:
      'They are kneeling at a crack in the wall where something hums. Their hands are in the seam. They do not seem to be in pain, exactly. They look up and see you.',
    choices: [
      {
        id: 'listen',
        label: 'Let them speak',
        outcomeText:
          'They speak for a long time. You do not understand all of it. You feel a pressure behind your eyes that was not there before.',
        outcome: {
          factionDeltas: [{ factionId: 'cult_of_mugen', amount: 10 }],
          dialogueLines: [
            {
              speakerId: 'cultist',
              speakerName: 'Devotee',
              text: 'Mugen does not take. It holds. Everything you lose here, it holds.',
            },
            {
              speakerId: 'cultist',
              speakerName: 'Devotee',
              text: 'Come back when the seam is wider. You will understand then.',
            },
          ],
        },
      },
      {
        id: 'pull_them_away',
        label: 'Pull them back from the wall',
        outcomeText: 'They scream. Something lets go of them — or they let go of something. They run.',
        outcome: {
          hpChange: -4,
          factionDeltas: [
            { factionId: 'cult_of_mugen', amount: -20 },
            { factionId: 'guild', amount: 5 },
          ],
        },
      },
      {
        id: 'walk_past',
        label: 'Walk past without engaging',
        outcomeText: 'You feel eyes on your back until you round the corner.',
        outcome: { nothing: true },
      },
    ],
  },
  {
    id: 'the_silent_trader',
    title: 'The Silent Trader',
    trigger: 'map_event',
    factionContext: 'silent_market',
    flavorTags: ['trade', 'market', 'information'],
    description:
      'No stall. No sign. A person seated on a folded cloth, three objects in front of them arranged with mathematical care. They make no sound. They hold your gaze.',
    choices: [
      {
        id: 'examine_objects',
        label: 'Pick up and examine the objects',
        outcomeText:
          'The first is warm. The second hums at a frequency you feel in your molars. You set the third down immediately without looking at it.',
        outcome: { addRandomCard: true, factionDeltas: [{ factionId: 'silent_market', amount: 8 }] },
      },
      {
        id: 'make_offer',
        label: 'Leave gold and take nothing',
        outcomeText: 'They incline their head exactly once. You have made a deposit in an account you cannot yet read.',
        outcome: { goldChange: -15, factionDeltas: [{ factionId: 'silent_market', amount: 20 }] },
      },
      {
        id: 'ignore',
        label: 'Keep moving',
        outcomeText: 'When you look back, there is no one there. There was never anyone there.',
        outcome: { nothing: true },
      },
    ],
  },
  {
    id: 'the_descent_extended',
    title: 'The Descent',
    trigger: 'map_event',
    flavorTags: ['depth', 'threshold', 'choice'],
    description:
      'The pull is here — a pressure low in the chest, behind the sternum. The deep is asking something of you.',
    choices: [
      {
        id: 'push_deeper',
        label: 'Push deeper',
        outcomeText: 'You lose something, but gain more ground.',
        outcome: { goldChange: 5, hpChange: -5 },
      },
      {
        id: 'hold_the_line',
        label: 'Hold the line',
        outcomeText: 'The pressure eases. Your body remembers how to breathe.',
        outcome: { hpChange: 8 },
      },
      {
        id: 'turn_back',
        label: 'Turn back',
        outcomeText: 'You take nothing. You leave nothing behind.',
        outcome: { nothing: true },
      },
    ],
  },
];

export function getStoryEventById(id: string): StoryEventDefinition | undefined {
  return STORY_EVENTS.find(e => e.id === id);
}

export function getStoryEventsByFaction(factionId: string): StoryEventDefinition[] {
  return STORY_EVENTS.filter(e => e.factionContext === factionId);
}

export function getStoryEventsByTrigger(trigger: string): StoryEventDefinition[] {
  return STORY_EVENTS.filter(e => e.trigger === trigger);
}
