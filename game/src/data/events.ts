export interface EventChoice {
  id: string;
  label: string;
  outcomeText: string;
  outcome: EventOutcome;
}

export interface EventOutcome {
  hpChange?: number;
  goldChange?: number;
  addRandomCard?: boolean;
  healPercent?: number;
  relicId?: string;
  nothing?: boolean;
}

export interface EventDefinition {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

export const ALL_EVENTS: EventDefinition[] = [
  {
    id: 'the_descent',
    title: 'The Descent',
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
  {
    id: 'unregistered_binder',
    title: 'Unregistered Binder',
    description:
      'Someone without a Guild card, working your floor. They have seen you. Neither of you moves first.',
    choices: [
      {
        id: 'let_them_pass',
        label: 'Let them pass',
        outcomeText: 'They nod once and keep walking. The floor is wide enough.',
        outcome: { nothing: true },
      },
      {
        id: 'report_them',
        label: 'Report them to the Guild',
        outcomeText: 'The Guild pays informants well. They always have.',
        outcome: { goldChange: 10 },
      },
      {
        id: 'challenge_them',
        label: 'Challenge them',
        outcomeText: 'Your knuckles ache. So do theirs.',
        outcome: { hpChange: -6 },
      },
    ],
  },
  {
    id: 'the_fragment',
    title: 'The Fragment',
    description:
      'Something came up from the deep — a piece of worked stone inscribed in a script no living person reads correctly. The scholars are excited. Something about it feels wrong.',
    choices: [
      {
        id: 'take_it',
        label: 'Take it',
        outcomeText: 'The weight of it settles in your pack. You will learn what it wants.',
        outcome: { addRandomCard: true },
      },
      {
        id: 'leave_it',
        label: 'Leave it',
        outcomeText: 'Some things belong to the deep. You feel cleaner for walking away.',
        outcome: { hpChange: 5 },
      },
      {
        id: 'study_it',
        label: 'Study it with the scholars',
        outcomeText:
          'Three hours pass. The scholars argue. The script remains unreadable. You learn nothing except that Mugen is older than anyone admits.',
        outcome: { nothing: true },
      },
    ],
  },
];

export function getEventById(id: string): EventDefinition | undefined {
  return ALL_EVENTS.find(e => e.id === id);
}
