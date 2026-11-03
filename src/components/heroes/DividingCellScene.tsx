const CENTER = { x: 380, y: 160 };

type Cell = { x: number; y: number; size: number };

function ring(count: number, radius: number, size: number, startAngle: number): Cell[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (i / count) * Math.PI * 2;
    return {
      x: CENTER.x + Math.cos(angle) * radius,
      y: CENTER.y + Math.sin(angle) * radius * 0.55,
      size,
    };
  });
}

const GEN0: Cell[] = [{ x: CENTER.x, y: CENTER.y, size: 32 }];
const GEN1 = ring(2, 74, 23, 0);
const GEN2 = ring(4, 136, 16, Math.PI / 4);
const GEN3 = ring(8, 206, 9.5, Math.PI / 8);

function nearestParent(cell: Cell, parents: Cell[]) {
  let best = parents[0];
  let bestDist = Infinity;
  for (const p of parents) {
    const d = (p.x - cell.x) ** 2 + (p.y - cell.y) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return best;
}

export default function DividingCellScene() {
  const allCells = [
    ...GEN0.map((c, i) => ({ ...c, delay: 0, gen: 0, key: `g0-${i}` })),
    ...GEN1.map((c, i) => ({ ...c, delay: 0.7, gen: 1, key: `g1-${i}` })),
    ...GEN2.map((c, i) => ({ ...c, delay: 1.6, gen: 2, key: `g2-${i}` })),
    ...GEN3.map((c, i) => ({ ...c, delay: 2.6, gen: 3, key: `g3-${i}` })),
  ];

  const strands = [
    ...GEN1.map((c) => ({ from: GEN0[0], to: c })),
    ...GEN2.map((c) => ({ from: nearestParent(c, GEN1), to: c })),
    ...GEN3.map((c) => ({ from: nearestParent(c, GEN2), to: c })),
  ];

  return (
    <div className="cell-scene" aria-hidden="true">
      <svg
        viewBox="0 0 760 320"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="A single cell dividing again and again, glowing teal and violet against a dark field"
      >
        <defs>
          <radialGradient id="fieldGrad" cx="50%" cy="46%" r="75%">
            <stop offset="0%" stopColor="#161d2c" />
            <stop offset="60%" stopColor="#0a0d17" />
            <stop offset="100%" stopColor="#05060b" />
          </radialGradient>
          <radialGradient id="cellGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e4fff9" />
            <stop offset="22%" stopColor="#8df0dd" />
            <stop offset="55%" stopColor="#4fc9c0" />
            <stop offset="82%" stopColor="#6a5fc4" />
            <stop offset="100%" stopColor="#372e73" />
          </radialGradient>
          <radialGradient id="cellCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="cellGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="wideBloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <rect x="0" y="0" width="760" height="320" fill="url(#fieldGrad)" />

        {/* ambient bloom behind the whole cluster */}
        <circle cx={CENTER.x} cy={CENTER.y} r="150" fill="#3fb6ad" opacity="0.14" filter="url(#wideBloom)" />

        {/* faint specks, like particulate under a microscope */}
        {Array.from({ length: 30 }, (_, i) => {
          const x = (i * 83 + 17) % 760;
          const y = (i * 59 + 11) % 320;
          const r = (i % 3 === 0 ? 1.1 : 0.6) as number;
          return <circle key={`speck-${i}`} cx={x} cy={y} r={r} fill="#5a6b85" opacity="0.4" />;
        })}

        {/* cytoplasmic strands linking each cell to its parent */}
        <g stroke="#6fe0d1" strokeWidth="0.75" opacity="0.22">
          {strands.map((s, i) => (
            <line key={i} x1={s.from.x} y1={s.from.y} x2={s.to.x} y2={s.to.y} />
          ))}
        </g>

        <g filter="url(#cellGlow)">
          {allCells.map((c) => (
            <g
              key={c.key}
              className="cell"
              style={{
                // @ts-expect-error -- CSS custom properties
                "--delay": `${c.delay}s`,
                transformOrigin: `${c.x}px ${c.y}px`,
              }}
            >
              <circle cx={c.x} cy={c.y} r={c.size} fill="url(#cellGrad)" />
              <circle
                cx={c.x - c.size * 0.32}
                cy={c.y - c.size * 0.32}
                r={c.size * 0.38}
                fill="url(#cellCore)"
              />
              <circle
                cx={c.x}
                cy={c.y}
                r={c.size}
                fill="none"
                stroke="#cdfff5"
                strokeWidth="0.6"
                opacity="0.35"
              />
            </g>
          ))}
        </g>
      </svg>

      <style>{`
        .cell-scene {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          background: #05060b;
        }
        .cell-scene svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .cell {
          animation: cell-breathe 6s ease-in-out var(--delay) infinite;
        }
        @keyframes cell-breathe {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.07); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cell { animation: none; opacity: 0.92; }
        }
      `}</style>
    </div>
  );
}
