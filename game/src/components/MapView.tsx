import type { MapNode, NodeType } from '../types';
import type { GameAction } from '../engine/gameReducer';
import styles from './MapView.module.css';

interface Props {
  nodes: MapNode[];
  dispatch: (action: GameAction) => void;
}

function nodeIcon(type: NodeType): string {
  switch (type) {
    case 'encounter': return 'FIGHT';
    case 'event': return 'EVENT';
    case 'rest': return 'REST';
    case 'shop': return 'SHOP';
    case 'boss': return 'BOSS';
    case 'elite': return 'ELITE';
    default: return '?';
  }
}

export default function MapView({ nodes, dispatch }: Props) {
  // SVG coordinate system: x and y are percentages of the SVG viewport
  const svgWidth = 400;
  const svgHeight = 500;

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>The Path Into Mugen</h2>
      <div className={styles.mapContainer}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className={styles.svg}
        >
          {/* Draw connections */}
          {nodes.map(node =>
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              const x1 = (node.position.x / 100) * svgWidth;
              const y1 = (node.position.y / 100) * svgHeight;
              const x2 = (target.position.x / 100) * svgWidth;
              const y2 = (target.position.y / 100) * svgHeight;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={x1} y1={y1}
                  x2={x2} y2={y2}
                  className={[
                    styles.edge,
                    node.visited ? styles.edgeVisited : styles.edgeLocked,
                  ].join(' ')}
                />
              );
            })
          )}

          {/* Draw nodes */}
          {nodes.map(node => {
            const cx = (node.position.x / 100) * svgWidth;
            const cy = (node.position.y / 100) * svgHeight;
            const r = node.type === 'boss' ? 22 : 16;

            let fillColor = '#26233F';
            if (node.visited) fillColor = '#1a1830';
            else if (node.available) fillColor = '#3a3060';

            let strokeColor = '#302C4A';
            if (node.visited) strokeColor = '#302C4A';
            else if (node.available) strokeColor = '#E6B94E';

            if (node.type === 'boss') strokeColor = '#C45050';
            if (node.type === 'elite') strokeColor = '#8B5FC4';

            return (
              <g
                key={node.id}
                onClick={node.available && !node.visited ? () => dispatch({ type: 'SELECT_NODE', nodeId: node.id }) : undefined}
                className={node.available && !node.visited ? styles.clickable : ''}
              >
                <circle
                  cx={cx} cy={cy} r={r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={node.available && !node.visited ? 2 : 1}
                  opacity={node.visited ? 0.4 : 1}
                />
                <text
                  x={cx} y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={styles.nodeLabel}
                  fill={node.available && !node.visited ? '#E6B94E' : '#888'}
                  fontSize={node.type === 'boss' ? 8 : 7}
                >
                  {nodeIcon(node.type)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className={styles.hint}>Select a highlighted node to advance.</p>
    </div>
  );
}
