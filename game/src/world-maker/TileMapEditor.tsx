import { useRef, useEffect, useState, useCallback } from 'react';
import type { TileMap, TileType, Tile } from './types';
import styles from './WorldMaker.module.css';

const TILE_COLORS: Record<TileType, string> = {
  void: '#0E0D1A',
  floor: '#26233F',
  wall: '#141228',
  door: '#E6B94E',
  water: '#4A7EC4',
  hazard: '#C45050',
  spawn: '#4A9C6E',
  exit: '#8B5FC4',
  npc_marker: '#E6B94E',
  event_marker: '#F4ECDA',
  shop_marker: '#4A9C6E',
  rest_marker: '#4A7EC4',
};

const TILE_ICONS: Partial<Record<TileType, string>> = {
  door: '▶',
  npc_marker: 'N',
  event_marker: '!',
  shop_marker: '$',
  rest_marker: '♡',
  spawn: '✦',
  exit: '▼',
  hazard: '×',
};

const TILE_PALETTE: Array<{ type: TileType; label: string }> = [
  { type: 'floor', label: 'Floor' },
  { type: 'wall', label: 'Wall' },
  { type: 'void', label: 'Void' },
  { type: 'door', label: 'Door' },
  { type: 'water', label: 'Water' },
  { type: 'hazard', label: 'Hazard' },
  { type: 'spawn', label: 'Spawn' },
  { type: 'exit', label: 'Exit' },
  { type: 'npc_marker', label: 'NPC' },
  { type: 'event_marker', label: 'Event' },
  { type: 'shop_marker', label: 'Shop' },
  { type: 'rest_marker', label: 'Rest' },
];

interface Props {
  map: TileMap;
  onChange: (updated: TileMap) => void;
}

function drawMap(canvas: HTMLCanvasElement, map: TileMap, hoveredTile: { r: number; c: number } | null) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const ts = map.tileSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < map.height; r++) {
    for (let c = 0; c < map.width; c++) {
      const tile = map.tiles[r]?.[c] ?? { type: 'void' };
      const x = c * ts;
      const y = r * ts;

      ctx.fillStyle = TILE_COLORS[tile.type];
      ctx.fillRect(x, y, ts, ts);

      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, ts, ts);

      const icon = TILE_ICONS[tile.type];
      if (icon) {
        ctx.font = `${Math.floor(ts * 0.55)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#0E0D1A';
        ctx.globalAlpha = 0.85;
        ctx.fillText(icon, x + ts / 2, y + ts / 2);
        ctx.globalAlpha = 1;
      }

      if (hoveredTile && hoveredTile.r === r && hoveredTile.c === c) {
        ctx.fillStyle = 'rgba(230,185,78,0.2)';
        ctx.fillRect(x, y, ts, ts);
        ctx.strokeStyle = 'rgba(230,185,78,0.6)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, ts, ts);
      }
    }
  }
}

export default function TileMapEditor({ map, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTile, setActiveTile] = useState<TileType>('floor');
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null);
  const [painting, setPainting] = useState(false);
  const [tileLabel, setTileLabel] = useState('');

  const ts = map.tileSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = map.width * ts;
    canvas.height = map.height * ts;
    drawMap(canvas, map, hovered);
  }, [map, hovered, ts]);

  const getTile = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): { r: number; c: number } => {
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = (map.width * ts) / rect.width;
      const scaleY = (map.height * ts) / rect.height;
      return {
        r: Math.floor(((e.clientY - rect.top) * scaleY) / ts),
        c: Math.floor(((e.clientX - rect.left) * scaleX) / ts),
      };
    },
    [map.width, map.height, ts]
  );

  const paintTile = useCallback(
    (r: number, c: number) => {
      if (r < 0 || r >= map.height || c < 0 || c >= map.width) return;
      const newTile: Tile = { type: activeTile };
      if (tileLabel) newTile.label = tileLabel;
      const tiles = map.tiles.map((row, ri) =>
        ri === r ? row.map((tile, ci) => (ci === c ? newTile : tile)) : row
      );
      onChange({ ...map, tiles });
    },
    [map, activeTile, tileLabel, onChange]
  );

  return (
    <div className={styles.mapEditorRoot}>
      <div className={styles.mapToolbar}>
        <div className={styles.paletteGrid}>
          {TILE_PALETTE.map(({ type, label }) => (
            <button
              key={type}
              className={`${styles.paletteBtn} ${activeTile === type ? styles.paletteBtnActive : ''}`}
              onClick={() => setActiveTile(type)}
            >
              <span
                className={styles.paletteSwatch}
                style={{ background: TILE_COLORS[type] }}
              >
                {TILE_ICONS[type] ?? ''}
              </span>
              <span className={styles.paletteLabel}>{label}</span>
            </button>
          ))}
        </div>
        <div className={styles.labelField}>
          <label className={styles.fieldLabelSm}>Tile label (optional)</label>
          <input
            className={styles.inputSm}
            value={tileLabel}
            placeholder="e.g. North Gate"
            onChange={e => setTileLabel(e.target.value)}
          />
        </div>
        <div className={styles.mapInfo}>
          <span className={styles.mapInfoText}>{map.name}</span>
          <span className={styles.mapInfoText}>{map.width}×{map.height} tiles</span>
          {hovered && (
            <span className={styles.mapInfoText}>
              [{hovered.r},{hovered.c}] {map.tiles[hovered.r]?.[hovered.c]?.type ?? '—'}
              {map.tiles[hovered.r]?.[hovered.c]?.label ? ` — ${map.tiles[hovered.r][hovered.c].label}` : ''}
            </span>
          )}
        </div>
      </div>

      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          className={styles.mapCanvas}
          style={{ cursor: 'crosshair' }}
          onMouseDown={e => {
            setPainting(true);
            const { r, c } = getTile(e);
            paintTile(r, c);
          }}
          onMouseMove={e => {
            const { r, c } = getTile(e);
            setHovered({ r, c });
            if (painting) paintTile(r, c);
          }}
          onMouseUp={() => setPainting(false)}
          onMouseLeave={() => {
            setPainting(false);
            setHovered(null);
          }}
        />
      </div>
    </div>
  );
}
