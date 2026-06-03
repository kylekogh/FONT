import type { MapNode, NodeType } from '../types';

// Generate a run map:
// 15 nodes in 5 tiers
// Tier 0: Start (1 node)
// Tier 1: 3 branches
// Tier 2: 2 converge (encounters/events)
// Tier 3: 3 branches
// Tier 4: Boss (1 node)
// Node types: ~6 encounters, 2 events, 2 rests, 1 shop, 1 elite, 1 boss, 1 start

function shuffleArr<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function generateMap(): MapNode[] {
  // Layout by tiers
  // Tier 0: node 0 (start)
  // Tier 1: nodes 1,2,3
  // Tier 2: nodes 4,5
  // Tier 3: nodes 6,7,8,9
  // Tier 4: node 10 (boss)
  // Extra nodes 11-14 as middle content spread

  // Simpler 5-tier approach
  // T0: [start]
  // T1: [encounter, encounter, event]
  // T2: [rest, elite]
  // T3: [encounter, encounter, shop]
  // T4: [encounter, rest] converge -> boss

  const tier1Types: NodeType[] = shuffleArr(['encounter', 'encounter', 'event'] as NodeType[]);
  const tier2Types: NodeType[] = shuffleArr(['rest', 'encounter'] as NodeType[]);
  const tier3Types: NodeType[] = shuffleArr(['encounter', 'event', 'shop'] as NodeType[]);
  const tier4Types: NodeType[] = shuffleArr(['encounter', 'rest'] as NodeType[]);

  const nodes: MapNode[] = [];

  function makeNode(id: string, type: NodeType, x: number, y: number, connections: string[]): MapNode {
    return { id, type, position: { x, y }, connections, visited: false, available: false };
  }

  // Tier 0 — start
  nodes.push(makeNode('n0', 'encounter', 50, 90, ['n1', 'n2', 'n3']));

  // Tier 1
  nodes.push(makeNode('n1', tier1Types[0], 20, 72, ['n4', 'n5']));
  nodes.push(makeNode('n2', tier1Types[1], 50, 72, ['n4', 'n5']));
  nodes.push(makeNode('n3', tier1Types[2], 80, 72, ['n5', 'n6']));

  // Tier 2
  nodes.push(makeNode('n4', tier2Types[0], 30, 54, ['n7', 'n8']));
  nodes.push(makeNode('n5', tier2Types[1], 65, 54, ['n8', 'n9']));

  // Tier 3 — elite on one branch
  nodes.push(makeNode('n6', 'elite', 85, 54, ['n9']));
  nodes.push(makeNode('n7', tier3Types[0], 20, 36, ['n10', 'n11']));
  nodes.push(makeNode('n8', tier3Types[1], 50, 36, ['n10', 'n11']));
  nodes.push(makeNode('n9', tier3Types[2], 75, 36, ['n11']));

  // Tier 4
  nodes.push(makeNode('n10', tier4Types[0], 30, 20, ['n12']));
  nodes.push(makeNode('n11', tier4Types[1], 65, 20, ['n12']));

  // Boss
  nodes.push(makeNode('n12', 'boss', 50, 5, []));

  // Mark start as available (player begins here, so we mark node 0 visited and its children available)
  nodes[0].visited = true;
  nodes[0].connections.forEach(cId => {
    const n = nodes.find(x => x.id === cId);
    if (n) n.available = true;
  });

  return nodes;
}

export function getAvailableNodes(nodes: MapNode[]): MapNode[] {
  return nodes.filter(n => n.available && !n.visited);
}

export function advanceMap(nodes: MapNode[], visitedId: string): MapNode[] {
  return nodes.map(n => {
    if (n.id === visitedId) {
      // Mark visited, update connections to available
      const updated = { ...n, visited: true, available: false };
      return updated;
    }
    return n;
  }).map(n => {
    // Find the visited node and make its connections available
    const visited = nodes.find(x => x.id === visitedId);
    if (visited && visited.connections.includes(n.id) && !n.visited) {
      return { ...n, available: true };
    }
    return n;
  });
}
