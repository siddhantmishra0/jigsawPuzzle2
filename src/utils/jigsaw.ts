export type TabType = 0 | 1 | -1; // 0 = flat, 1 = out, -1 = in

// Piece definitions mapping the 3x3 grid (index 0 to 8)
// Edges are defined as: top, right, bottom, left
export const puzzleShapes: Record<number, { t: TabType, r: TabType, b: TabType, l: TabType }> = {
  0: { t: 0, r: 1, b: 1, l: 0 },
  1: { t: 0, r: -1, b: 1, l: -1 },
  2: { t: 0, r: 0, b: -1, l: 1 },
  3: { t: -1, r: 1, b: -1, l: 0 },
  4: { t: -1, r: 1, b: 1, l: -1 },
  5: { t: 1, r: 0, b: -1, l: -1 },
  6: { t: 1, r: 1, b: 0, l: 0 },
  7: { t: -1, r: -1, b: 0, l: -1 },
  8: { t: 1, r: 0, b: 0, l: 1 },
};

/**
 * Generates an SVG path for a puzzle piece.
 * The core grid cell is `size` x `size`. 
 * To accommodate tabs, the actual SVG viewBox needs to be larger.
 * We offset the starting point by `offset` so tabs can extend into negative coordinates relative to the cell boundary.
 */
export function getPuzzlePath(pieceIndex: number, size = 100, offset = 25): string {
  const shape = puzzleShapes[pieceIndex];
  if (!shape) return '';

  const { t, r, b, l } = shape;

  let path = `M ${offset} ${offset}`;

  // Helper to draw an edge
  // dx, dy: direction of the edge (1 or 0)
  // nx, ny: outward normal direction (for drawing tabs)
  const drawEdge = (tab: TabType, dx: number, dy: number, nx: number, ny: number) => {
    if (tab === 0) {
      // Flat line
      return ` l ${dx * size} ${dy * size}`;
    }

    const t = tab; // 1 (out) or -1 (in)
    // Instead of doing complicated relative math, we just use the pre-calculated standard horizontal edge going from 0,0 to size,0
    // and apply rotation/translation logic to the string directly. But it's easier to just compute absolute points if we track current pos.
    
    // Actually, `l` (relative line) and `c` (relative cubic bezier) are perfect for this.
    // Base edge goes from 0,0 to size,0.
    // If Tab OUT (t=1):
    // Line to (35, 0) -> `l 35 0`
    // Bezier to (50, -20) with controls (40, 0), (30, -20) 
    // Bezier to (65, 0) with controls (70, -20), (60, 0)
    // Line to (100, 0)
    
    // Let's parameterize the relative commands:
    const step1 = size * 0.38;
    const cp1x = size * 0.05 * dx + size * 0.0 * nx * t;
    const cp1y = size * 0.05 * dy + size * 0.0 * ny * t;
    
    const cp2x = size * -0.1 * dx + size * 0.2 * nx * t;
    const cp2y = size * -0.1 * dy + size * 0.2 * ny * t;
    
    const p1x = size * 0.12 * dx + size * 0.25 * nx * t;
    const p1y = size * 0.12 * dy + size * 0.25 * ny * t;
    
    const cp3x = size * 0.22 * dx + size * 0.0 * nx * t;
    const cp3y = size * 0.22 * dy + size * 0.0 * ny * t;

    const cp4x = size * 0.07 * dx - size * 0.25 * nx * t;
    const cp4y = size * 0.07 * dy - size * 0.25 * ny * t;

    const p2x = size * 0.12 * dx - size * 0.25 * nx * t;
    const p2y = size * 0.12 * dy - size * 0.25 * ny * t;

    const l1 = ` l ${step1 * dx} ${step1 * dy}`;
    const c1 = ` c ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1x} ${p1y}`;
    const c2 = ` c ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${p2x} ${p2y}`;
    const l2 = ` l ${step1 * dx} ${step1 * dy}`;

    return l1 + c1 + c2 + l2;
  };

  // Top edge (moves right: dx=1, dy=0. outward normal is UP: nx=0, ny=-1)
  path += drawEdge(t, 1, 0, 0, -1);
  // Right edge (moves down: dx=0, dy=1. outward normal is RIGHT: nx=1, ny=0)
  path += drawEdge(r, 0, 1, 1, 0);
  // Bottom edge (moves left: dx=-1, dy=0. outward normal is DOWN: nx=0, ny=1)
  path += drawEdge(b, -1, 0, 0, 1);
  // Left edge (moves up: dx=0, dy=-1. outward normal is LEFT: nx=-1, ny=0)
  path += drawEdge(l, 0, -1, -1, 0);

  path += " Z";
  return path;
}
