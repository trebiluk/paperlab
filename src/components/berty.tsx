import { cn } from "@/lib/utils";

/**
 * True 2:1 isometric prism.
 * Right step (rx, rx/2), left step (−lx, lx/2), down (0, h).
 */
function IsoPrism({
  ox,
  oy,
  rx,
  lx,
  h,
  top = "var(--color-toy-top)",
  left = "var(--color-toy-left)",
  right = "var(--color-pine)",
  grain,
  grid,
}: {
  ox: number;
  oy: number;
  rx: number;
  lx: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
  grain?: string;
  grid?: string;
}) {
  const T = [ox, oy] as const;
  const TR = [ox + rx, oy + rx / 2] as const;
  const TF = [ox + rx - lx, oy + rx / 2 + lx / 2] as const;
  const TL = [ox - lx, oy + lx / 2] as const;
  const D = h;
  const pts = (a: readonly number[], b: readonly number[], c: readonly number[], d: readonly number[]) =>
    `${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]} ${d[0]},${d[1]}`;
  const topPts = pts(T, TR, TF, TL);
  const leftPts = pts(TL, TF, [TF[0], TF[1] + D], [TL[0], TL[1] + D]);
  const rightPts = pts(TF, TR, [TR[0], TR[1] + D], [TF[0], TF[1] + D]);
  return (
    <g>
      <polygon points={topPts} fill={top} stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
      <polygon points={leftPts} fill={left} stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
      <polygon points={rightPts} fill={right} stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
      {grain ? (
        <>
          <polygon points={topPts} fill={grain} />
          <polygon points={leftPts} fill={grain} />
        </>
      ) : null}
      {grid ? (
        <>
          <polygon points={topPts} fill={grid} />
          <polygon points={leftPts} fill={grid} />
          <polygon points={rightPts} fill={grid} />
        </>
      ) : null}
    </g>
  );
}

/** Map an 8×8 pixel sheet onto the front-left face of an iso prism. */
function PixelFace({
  ox,
  oy,
  rx,
  lx,
  h,
  cells,
}: {
  ox: number;
  oy: number;
  rx: number;
  lx: number;
  h: number;
  cells: number[][];
}) {
  const n = 8;
  const colors = ["transparent", "var(--color-ink)", "var(--color-surface-2)", "var(--color-pine)", "var(--color-tape)"];
  return (
    <g transform={`matrix(${rx} ${rx / 2} 0 ${h} ${ox - lx} ${oy + lx / 2})`}>
      {cells.map((row, y) =>
        row.map((c, x) =>
          c ? (
            <rect
              key={`${x}-${y}`}
              x={x / n + 0.01}
              y={y / n + 0.01}
              width={1 / n - 0.02}
              height={1 / n - 0.02}
              fill={colors[c]}
            />
          ) : null,
        ),
      )}
    </g>
  );
}

/** Original robot skin — not a Minecraft character. 0 empty, 1 ink, 2 white. */
const BERTY_FACE = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 2, 2, 0],
  [0, 2, 1, 0, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function GlueTab({ x, y, w = 10, h = 8 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <polygon
        points={`${x},${y} ${x + w},${y + h * 0.35} ${x + w},${y + h * 0.65} ${x},${y + h}`}
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth="0.9"
      />
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + h}
        stroke="var(--color-ink)"
        strokeWidth="0.8"
        strokeDasharray="2 1.4"
      />
    </g>
  );
}

function BertyBody({ grain, grid }: { grain?: string; grid?: string }) {
  const head = { ox: 78, oy: 20, rx: 18, lx: 18, h: 18 };
  return (
    <g>
      <ellipse cx="78" cy="138" rx="30" ry="5.5" fill="var(--color-ink)" opacity="0.14" />

      {/* far leg */}
      <IsoPrism ox={88} oy={106} rx={8} lx={8} h={22} top="var(--color-moss)" left="var(--color-toy-left)" right="var(--color-pine)" grain={grain} grid={grid} />
      {/* near leg */}
      <IsoPrism ox={68} oy={108} rx={8} lx={8} h={22} top="var(--color-moss)" left="var(--color-toy-left)" right="var(--color-pine)" grain={grain} grid={grid} />

      {/* torso — same width as the head, half as deep (Steve proportions) */}
      <IsoPrism
        ox={78}
        oy={54}
        rx={18}
        lx={10}
        h={32}
        top="var(--color-toy-top)"
        left="var(--color-toy-left)"
        right="var(--color-pine)"
        grain={grain}
        grid={grid}
      />
      <GlueTab x={96} y={76} />

      {/* chest pixels */}
      <g transform={`matrix(18 9 0 32 ${78 - 10} ${54 + 5})`}>
        <rect x="0.28" y="0.36" width="0.14" height="0.14" fill="var(--color-pine)" />
        <rect x="0.48" y="0.36" width="0.14" height="0.14" fill="var(--color-ok)" />
      </g>

      {/* left arm — box glued at the shoulder */}
      <IsoPrism ox={54} oy={58} rx={8} lx={8} h={28} top="var(--color-toy-top)" left="var(--color-face-front)" right="var(--color-moss)" grain={grain} grid={grid} />

      {/* right arm — box at the other shoulder */}
      <IsoPrism ox={102} oy={56} rx={8} lx={8} h={28} top="var(--color-toy-top)" left="var(--color-face-front)" right="var(--color-moss)" grain={grain} grid={grid} />

      {/* head cube */}
      <IsoPrism
        ox={head.ox}
        oy={head.oy}
        rx={head.rx}
        lx={head.lx}
        h={head.h}
        top="var(--color-face-top)"
        left="var(--color-face-front)"
        right="var(--color-moss)"
        grain={grain}
        grid={grid}
      />
      <PixelFace {...head} cells={BERTY_FACE} />

      {/* antenna cube */}
      <IsoPrism ox={78} oy={6} rx={5.5} lx={5.5} h={6.5} top="var(--color-tape)" left="var(--color-toy-left)" right="var(--color-pine)" grid={grid} />
    </g>
  );
}

function GrainDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern id={`${uid}-grain`} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="2" r="0.35" fill="#1c1915" opacity="0.08" />
        <circle cx="4" cy="4.5" r="0.28" fill="#1c1915" opacity="0.06" />
      </pattern>
      <pattern id={`${uid}-pixels`} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1c1915" strokeWidth="0.35" opacity="0.16" />
      </pattern>
      <filter id={`${uid}-shadow`} x="-25%" y="-15%" width="150%" height="150%">
        <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="rgb(28 25 21)" floodOpacity="0.2" />
      </filter>
    </defs>
  );
}

/** Head net — the Minecraft-foldable version of Berty. Cut solid, fold dashed, glue the tabs. */
function HeadNet({ x = 0, y = 0, s = 18 }: { x?: number; y?: number; s?: number }) {
  const tab = s * 0.32;
  const faceAt = (fx: number, fy: number) => (
    <g>
      {BERTY_FACE.map((row, py) =>
        row.map((c, px) =>
          c ? (
            <rect
              key={`${px}-${py}`}
              x={fx + (px * s) / 8 + 0.4}
              y={fy + (py * s) / 8 + 0.4}
              width={s / 8 - 0.7}
              height={s / 8 - 0.7}
              fill={c === 1 ? "var(--color-ink)" : "var(--color-surface-2)"}
            />
          ) : null,
        ),
      )}
    </g>
  );
  const cell = (cx: number, cy: number, fill: string, dashed = true) => (
    <rect
      x={cx}
      y={cy}
      width={s}
      height={s}
      fill={fill}
      stroke="var(--color-ink)"
      strokeWidth="1.05"
      strokeDasharray={dashed ? "2.4 1.6" : undefined}
    />
  );
  const tri = (pts: string) => (
    <polygon
      points={pts}
      fill="var(--color-face-front)"
      stroke="var(--color-ink)"
      strokeWidth="1"
      strokeDasharray="2.2 1.5"
    />
  );
  const ox = x + tab + s;
  const oy = y + tab;
  return (
    <g>
      {/* paper sheet behind */}
      <rect
        x={x - 6}
        y={y - 8}
        width={s * 4 + tab * 2 + 18}
        height={s * 3 + tab * 2 + 16}
        rx="2"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="1.2"
      />
      <text x={x + 4} y={y + 2} fontSize="7" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
        HEAD · cut — fold -- glue
      </text>
      {/* top */}
      {cell(ox, oy, "var(--color-face-top)")}
      {tri(`${ox},${oy} ${ox + s / 2},${oy - tab} ${ox + s},${oy}`)}
      {/* row: left, front, right, back */}
      {cell(ox - s, oy + s, "var(--color-face-left)")}
      {cell(ox, oy + s, "var(--color-face-front)", false)}
      {faceAt(ox, oy + s)}
      {cell(ox + s, oy + s, "var(--color-moss)")}
      {cell(ox + 2 * s, oy + s, "var(--color-face-back)")}
      {tri(`${ox - s},${oy + s} ${ox - s - tab},${oy + s + s / 2} ${ox - s},${oy + 2 * s}`)}
      {tri(`${ox + 3 * s},${oy + s} ${ox + 3 * s + tab},${oy + s + s / 2} ${ox + 3 * s},${oy + 2 * s}`)}
      {/* bottom */}
      {cell(ox, oy + 2 * s, "var(--color-face-bottom)")}
      {tri(`${ox},${oy + 3 * s} ${ox + s / 2},${oy + 3 * s + tab} ${ox + s},${oy + 3 * s}`)}
    </g>
  );
}

/** Paper-cube shop teacher — papercraft figure: cube head, box limbs, pixel face. */
export function Berty({
  size = 64,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 150 150"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="BertyBot, a paper-cube robot foldable"
    >
      <GrainDefs uid="berty" />
      <g filter="url(#berty-shadow)" transform="translate(4 0)">
        <BertyBody grain="url(#berty-grain)" grid="url(#berty-pixels)" />
      </g>
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden>
      <polygon points="16,3 24,7.5 16,12 8,7.5" fill="var(--color-face-top)" />
      <polygon points="8,7.5 16,12 16,22 8,17.5" fill="var(--color-face-front)" />
      <polygon points="16,12 24,7.5 24,17.5 16,22" fill="var(--color-moss)" />
      {/* pixel eyes */}
      <rect x="10.2" y="11.2" width="2.6" height="2.6" fill="var(--color-surface-2)" />
      <rect x="14.4" y="12.2" width="2.6" height="2.6" fill="var(--color-surface-2)" />
      <rect x="11.2" y="12.2" width="1.1" height="1.1" fill="var(--color-ink)" />
      <rect x="15.4" y="13.2" width="1.1" height="1.1" fill="var(--color-ink)" />
      <rect x="11.4" y="16.4" width="5.2" height="1.1" fill="var(--color-ink)" />
      <polygon points="16,22 22,25 16,28.5 10,25" fill="var(--color-toy-top)" />
      <polygon points="10,25 16,28.5 16,31 10,27.5" fill="var(--color-toy-left)" />
    </svg>
  );
}

/** One letter sheet: head net, antenna, body, arms, and legs. Thick = cut. Dashed = fold. */
export function BertySheet({ className }: { className?: string }) {
  const s = 132;
  const ox = 290;
  const oy = 300;
  const face = BERTY_FACE;
  const dash = "7 5";
  return (
    <svg
      viewBox="0 0 850 1100"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="BertyBot cut and fold sheet. Thick line means cut. Dashed line means fold."
    >
      <rect width="850" height="1100" fill="#fffdf8" />
      <text x="425" y="48" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">
        BertyBot
      </text>
      <text x="425" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1f5c4e" fontFamily="Arial, Helvetica, sans-serif">
        Thick line = cut. Dashed line = fold. Triangles glue inside.
      </text>

      <polygon points={`${ox + s / 2},${oy - s - 36} ${ox},${oy - s} ${ox + s},${oy - s}`} fill="#e7f3ee" stroke="#1c1915" strokeWidth="3" />
      <polygon points={`${ox - s - 36},${oy + s / 2} ${ox - s},${oy} ${ox - s},${oy + s}`} fill="#e7f3ee" stroke="#1c1915" strokeWidth="3" />
      <polygon points={`${ox + 3 * s + 36},${oy + s / 2} ${ox + 3 * s},${oy} ${ox + 3 * s},${oy + s}`} fill="#e7f3ee" stroke="#1c1915" strokeWidth="3" />
      <polygon points={`${ox + s / 2},${oy + 2 * s + 36} ${ox},${oy + 2 * s} ${ox + s},${oy + 2 * s}`} fill="#e7f3ee" stroke="#1c1915" strokeWidth="3" />

      <rect x={ox} y={oy - s} width={s} height={s} fill="#e7f3ee" />
      <rect x={ox - s} y={oy} width={s} height={s} fill="#fffdf8" />
      <rect x={ox} y={oy} width={s} height={s} fill="#f3efe4" />
      <rect x={ox + s} y={oy} width={s} height={s} fill="#e7f3ee" />
      <rect x={ox + 2 * s} y={oy} width={s} height={s} fill="#fffdf8" />
      <rect x={ox} y={oy + s} width={s} height={s} fill="#fffdf8" />

      {face.map((row, py) =>
        row.map((c, px) =>
          c ? (
            <rect
              key={`${px}-${py}`}
              x={ox + (px * s) / 8 + 3}
              y={oy + (py * s) / 8 + 3}
              width={s / 8 - 6}
              height={s / 8 - 6}
              fill={c === 1 ? "#1c1915" : "#fffdf8"}
            />
          ) : null,
        ),
      )}

      <polyline
        points={`${ox},${oy - s} ${ox + s},${oy - s} ${ox + s},${oy} ${ox + 3 * s},${oy} ${ox + 3 * s},${oy + s} ${ox + s},${oy + s} ${ox + s},${oy + 2 * s} ${ox},${oy + 2 * s} ${ox},${oy + s} ${ox - s},${oy + s} ${ox - s},${oy} ${ox},${oy} ${ox},${oy - s}`}
        fill="none"
        stroke="#1c1915"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <line x1={ox} y1={oy} x2={ox + s} y2={oy} stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />
      <line x1={ox} y1={oy + s} x2={ox + s} y2={oy + s} stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />
      <line x1={ox} y1={oy} x2={ox} y2={oy + s} stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />
      <line x1={ox + s} y1={oy} x2={ox + s} y2={oy + s} stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />
      <line x1={ox + 2 * s} y1={oy} x2={ox + 2 * s} y2={oy + s} stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />

      <text x={ox + s / 2} y={oy - s + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">top</text>
      <text x={ox - s / 2} y={oy + 24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">left</text>
      <text x={ox + s * 1.5} y={oy + 24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">right</text>
      <text x={ox + s * 2.5} y={oy + 24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">back</text>
      <text x={ox + s / 2} y={oy + s + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">bottom</text>
      <text x={ox + s / 2} y={oy - s - 44} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1f5c4e" fontFamily="Arial, Helvetica, sans-serif">glue</text>
      <text x={ox - s - 8} y={oy + s / 2} textAnchor="end" fontSize="13" fontWeight="700" fill="#1f5c4e" fontFamily="Arial, Helvetica, sans-serif">glue</text>

      <text x="425" y="640" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">
        Cut these too. Fold only the dashed line on the body.
      </text>
      <rect x="70" y="680" width="220" height="160" fill="#fffdf8" stroke="#1c1915" strokeWidth="4" />
      <line x1="70" y1="760" x2="290" y2="760" stroke="#1c1915" strokeWidth="2.5" strokeDasharray={dash} />
      <text x="180" y="730" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">body</text>

      <rect x="340" y="680" width="52" height="52" fill="#e7f3ee" stroke="#1c1915" strokeWidth="4" />
      <text x="366" y="760" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">antenna</text>

      <rect x="450" y="700" width="150" height="36" fill="#fffdf8" stroke="#1c1915" strokeWidth="4" />
      <rect x="450" y="760" width="150" height="36" fill="#fffdf8" stroke="#1c1915" strokeWidth="4" />
      <text x="525" y="820" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">arms</text>

      <rect x="680" y="680" width="36" height="150" fill="#fffdf8" stroke="#1c1915" strokeWidth="4" />
      <rect x="740" y="680" width="36" height="150" fill="#fffdf8" stroke="#1c1915" strokeWidth="4" />
      <text x="728" y="860" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1915" fontFamily="Arial, Helvetica, sans-serif">legs</text>
    </svg>
  );
}

/** Home hero: assembled papercraft Berty + the printed head net on the desk. */
export function ShopStillLife({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 240"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="BertyBot papercraft figure and his cube-net foldable on a shop desk"
    >
      <defs>
        <pattern id="still-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--color-graph)" strokeWidth="0.45" />
        </pattern>
        <pattern id="still-grid-major" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--color-graph-major)" strokeWidth="1" />
        </pattern>
        <pattern id="still-grain" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="2" r="0.4" fill="var(--color-ink)" opacity="0.07" />
          <circle cx="5" cy="5" r="0.3" fill="var(--color-ink)" opacity="0.05" />
        </pattern>
        <pattern id="still-pixels" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1c1915" strokeWidth="0.35" opacity="0.14" />
        </pattern>
        <filter id="still-shadow" x="-15%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="rgb(28 25 21)" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="280" height="240" fill="var(--color-graph-paper)" />
      <rect width="280" height="240" fill="url(#still-grid)" />
      <rect width="280" height="240" fill="url(#still-grid-major)" />

      <rect x="14" y="198" width="252" height="12" rx="2" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="22" y="210" width="10" height="20" fill="var(--color-toy-right)" />
      <rect x="248" y="210" width="10" height="20" fill="var(--color-toy-right)" />

      {/* printed head net — the foldable, clear of the figure */}
      <g filter="url(#still-shadow)" transform="translate(158 114) rotate(-5)">
        <HeadNet s={15} />
      </g>

      {/* assembled figure */}
      <g filter="url(#still-shadow)" transform="translate(-6 18) scale(1.22)">
        <BertyBody grain="url(#still-grain)" grid="url(#still-pixels)" />
      </g>
    </svg>
  );
}
