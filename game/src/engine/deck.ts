import type { CardDefinition, CardInstance } from '../types';

let instanceCounter = 0;

export function makeInstance(def: CardDefinition): CardInstance {
  return { instanceId: `card-${++instanceCounter}`, definition: def };
}

export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function drawCards(
  hand: CardInstance[],
  drawPile: CardInstance[],
  discard: CardInstance[],
  count: number
): { hand: CardInstance[]; drawPile: CardInstance[]; discard: CardInstance[] } {
  let pile = [...drawPile];
  let disc = [...discard];
  let h = [...hand];

  for (let i = 0; i < count; i++) {
    if (pile.length === 0) {
      if (disc.length === 0) break;
      pile = shuffle(disc);
      disc = [];
    }
    h = [...h, pile[0]];
    pile = pile.slice(1);
  }

  return { hand: h, drawPile: pile, discard: disc };
}

export function discardHand(
  hand: CardInstance[],
  discard: CardInstance[]
): { hand: CardInstance[]; discard: CardInstance[] } {
  return { hand: [], discard: [...discard, ...hand] };
}
