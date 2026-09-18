import { useId } from "react";
import { FOLDABLES, foldableSize, type FoldableId } from "@/lib/foldables";
import { PAPERS, sheetLayout, type PaperId } from "@/lib/paper";
import { cn } from "@/lib/utils";
import {
  DimBadge,
  DrawingDefs,
  hatchUrl,
  LetterBadge,
  shadowUrl,
  svgMeasure,
} from "@/components/drawing-marks";

type Pt = [number, number];
type Box = { x: number; y: number; w: number; h: number };

const SQRT3 = Math.sqrt(3);

function mid(a: Pt, b: Pt): Pt {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function pts(list: Pt[]) {
  return list.map((p) => p.join(",")).join(" ");
}

function padBox(b: Box, p: number): Box {
  return { x: b.x - p, y: b.y - p, w: b.w + 2 * p, h: b.h + 2 * p };
}

function tabTrap(a: Pt, b: Pt, h: number, inset = 0.16): Pt[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const m = len * inset;
  const a1: Pt = [a[0] + ux * m, a[1] + uy * m];
  const b1: Pt = [b[0] - ux * m, b[1] - uy * m];
  const taper = h * 0.3;
  const a2: Pt = [a1[0] + nx * h + ux * taper, a1[1] + ny * h + uy * taper];
  const b2: Pt = [b1[0] + nx * h - ux * taper, b1[1] + ny * h - uy * taper];
  return [a1, a2, b2, b1];
}

function line(
  a: Pt,
  b: Pt,
  stroke: string,
  width: number,
  dash?: string,
  key?: string,
) {
  return (
    <line
      key={key}
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
    />
  );
}

function tightBox(
  id: FoldableId,
  W: number,
  H: number,
  primary: number,
  secondary: number,
  tabH: number,
): Box {
  const pad = Math.max(tabH * 0.55, W * 0.03);
  if (id === "tetrahedron") {
    const e = primary;
    const ht = (e * SQRT3) / 2;
    const ox = (W - 2 * e) / 2;
    const oy = Math.max(H * 0.08, (H - 2 * ht - tabH) * 0.35);
    return padBox({ x: ox - tabH, y: oy, w: 2 * e + 2 * tabH, h: 2 * ht + tabH }, pad);
  }
  if (id === "pyramid") {
    const a = primary;
    const ht = (a * SQRT3) / 2;
    const netW = a + 2 * ht;
    const netH = a + 2 * ht;
    const ox = (W - netW) / 2;
    const oy = Math.max(H * 0.05, (H - netH - tabH) * 0.2);
    return padBox({ x: ox - tabH, y: oy - tabH, w: netW + 2 * tabH, h: netH + 2 * tabH }, pad);
  }
  if (id === "prism") {
    const e = primary;
    const len = secondary;
    const ht = (e * SQRT3) / 2;
    const netW = 3 * e;
    const netH = len + 2 * ht;
    const ox = (W - netW) / 2;
    const oy = Math.max(H * 0.04, (H - netH - tabH) * 0.2);
    return padBox(
      { x: ox - tabH * 0.2, y: oy - tabH, w: netW + tabH * 1.4, h: netH + 2 * tabH },
      pad,
    );
  }
  if (id === "cylinder") {
    const d = primary;
    const h = secondary;
    const circ = Math.PI * d;
    const netW = circ + tabH;
    const netH = h + 2 * d;
    const ox = (W - netW) / 2;
    const oy = Math.max((H - netH) / 2, H * 0.04);
    return padBox({ x: ox, y: oy, w: netW, h: netH }, pad);
  }
  const r = primary;
  const slant = secondary;
  const theta = (2 * Math.PI * r) / slant;
  const apex: Pt = [W * 0.38, H * 0.12 + slant];
  const a0 = -Math.PI / 2 - theta / 2;
  const a1 = -Math.PI / 2 + theta / 2;
  const p0: Pt = [apex[0] + slant * Math.cos(a0), apex[1] + slant * Math.sin(a0)];
  const p1: Pt = [apex[0] + slant * Math.cos(a1), apex[1] + slant * Math.sin(a1)];
  const cx = W * 0.78;
  const cy = H * 0.28;
  const xs = [apex[0], p0[0], p1[0], apex[0], cx - r, cx + r];
  const ys = [apex[1], p0[1], p1[1], apex[1] - slant, cy - r - tabH, cy + r];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return padBox(
    {
      x: minX,
      y: minY,
      w: Math.max(...xs) - minX,
      h: Math.max(...ys) - minY,
    },
    pad,
  );
}

export function FoldableSvg({
  id,
  paper = "letter",
  showSheet = true,
  labels = true,
  tight = false,
  className,
}: {
  id: FoldableId;
  paper?: PaperId;
  showSheet?: boolean;
  labels?: boolean;
  tight?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const spec = PAPERS[paper];
  const layout = sheetLayout(spec);
  const { W, H, cutWidth, foldWidth, dash, font, small } = layout;
  const size = foldableSize(id, paper);
  const scale = W / spec.short;
  const tabH = size.primary * scale * 0.18;
  const box = tight
    ? tightBox(id, W, H, size.primary * scale, size.secondary * scale, tabH)
    : { x: 0, y: 0, w: W, h: H };
  const hatch = hatchUrl(uid);

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`Development of a ${FOLDABLES[id].name}`}
      shapeRendering="geometricPrecision"
    >
      <DrawingDefs uid={uid} s={size.primary * scale} />
      {showSheet && !tight ? (
        <rect
          width={W}
          height={H}
          fill="var(--color-surface-2)"
          filter={shadowUrl(uid)}
        />
      ) : null}
      {id === "tetrahedron" ? (
        <Tetra
          W={W}
          H={H}
          e={size.primary * scale}
          tabH={tabH}
          cutWidth={cutWidth}
          foldWidth={foldWidth}
          dash={dash}
          font={font}
          small={small}
          labels={labels}
          dim={svgMeasure(size.primaryLabel)}
          hatch={hatch}
        />
      ) : null}
      {id === "pyramid" ? (
        <Pyramid
          W={W}
          H={H}
          a={size.primary * scale}
          tabH={tabH}
          cutWidth={cutWidth}
          foldWidth={foldWidth}
          dash={dash}
          font={font}
          small={small}
          labels={labels}
          dim={svgMeasure(size.primaryLabel)}
          hatch={hatch}
        />
      ) : null}
      {id === "prism" ? (
        <Prism
          W={W}
          H={H}
          e={size.primary * scale}
          len={size.secondary * scale}
          tabH={tabH}
          cutWidth={cutWidth}
          foldWidth={foldWidth}
          dash={dash}
          font={font}
          small={small}
          labels={labels}
          dimE={svgMeasure(size.primaryLabel)}
          dimL={svgMeasure(size.secondaryLabel)}
          hatch={hatch}
        />
      ) : null}
      {id === "cylinder" ? (
        <Cylinder
          W={W}
          H={H}
          d={size.primary * scale}
          h={size.secondary * scale}
          tabH={tabH}
          cutWidth={cutWidth}
          foldWidth={foldWidth}
          dash={dash}
          font={font}
          small={small}
          labels={labels}
          dimD={svgMeasure(size.primaryLabel)}
          dimH={svgMeasure(size.secondaryLabel)}
          hatch={hatch}
        />
      ) : null}
      {id === "cone" ? (
        <Cone
          W={W}
          H={H}
          r={size.primary * scale}
          slant={size.secondary * scale}
          tabH={tabH}
          cutWidth={cutWidth}
          foldWidth={foldWidth}
          dash={dash}
          font={font}
          small={small}
          labels={labels}
          dimR={svgMeasure(size.primaryLabel)}
          dimL={svgMeasure(size.secondaryLabel)}
          hatch={hatch}
        />
      ) : null}
      {labels && !tight ? (
        <text
          x={W / 2}
          y={H - small * 1.2}
          textAnchor="middle"
          fontSize={small}
          fill="var(--color-faint)"
          fontFamily="Figtree, sans-serif"
        >
          Development of a {FOLDABLES[id].name.toLowerCase()} · {spec.sheetLabel} · 1:1
        </text>
      ) : null}
    </svg>
  );
}

function Face({
  p,
  fill,
  label,
  font,
  labels,
}: {
  p: Pt[];
  fill: string;
  label?: string;
  font: number;
  labels: boolean;
}) {
  const c = p.reduce(
    (acc, pt) => [acc[0] + pt[0] / p.length, acc[1] + pt[1] / p.length] as Pt,
    [0, 0] as Pt,
  );
  return (
    <g>
      <polygon points={pts(p)} fill={fill} strokeLinejoin="round" />
      {labels && label ? (
        <text
          x={c[0]}
          y={c[1] + font * 0.35}
          textAnchor="middle"
          fontSize={font * 0.8}
          fill="var(--color-ink-soft)"
          fontFamily="Figtree, sans-serif"
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Tab({
  a,
  b,
  h,
  mark,
  small,
  cutWidth,
  hatch,
}: {
  a: Pt;
  b: Pt;
  h: number;
  mark: string;
  small: number;
  cutWidth: number;
  hatch: string;
}) {
  const poly = tabTrap(a, b, h);
  const c = mid(poly[1], poly[2]);
  const r = Math.max(small * 0.85, 7);
  return (
    <g>
      <polygon
        points={pts(poly)}
        fill="color-mix(in oklab, var(--color-face-front) 55%, white)"
        stroke="var(--color-ink)"
        strokeWidth={cutWidth}
        strokeLinejoin="round"
      />
      <polygon points={pts(poly)} fill={hatch} opacity={0.85} />
      <LetterBadge x={c[0]} y={c[1]} r={r} letter={mark} tone="tab" />
    </g>
  );
}

function Seam({
  p,
  mark,
  small,
}: {
  p: Pt;
  mark: string;
  small: number;
}) {
  return (
    <LetterBadge x={p[0]} y={p[1]} r={Math.max(small * 0.85, 7)} letter={mark} tone="dest" />
  );
}

function Tetra({
  W,
  H,
  e,
  tabH,
  cutWidth,
  foldWidth,
  dash,
  font,
  small,
  labels,
  dim,
  hatch,
}: {
  W: number;
  H: number;
  e: number;
  tabH: number;
  cutWidth: number;
  foldWidth: number;
  dash: string;
  font: number;
  small: number;
  labels: boolean;
  dim: string;
  hatch: string;
}) {
  const ht = (e * SQRT3) / 2;
  const ox = (W - 2 * e) / 2;
  const oy = Math.max(H * 0.08, (H - 2 * ht - tabH) * 0.35);
  const T: Pt = [ox + e, oy];
  const BL: Pt = [ox, oy + 2 * ht];
  const BR: Pt = [ox + 2 * e, oy + 2 * ht];
  const ML = mid(T, BL);
  const MR = mid(T, BR);
  const MB = mid(BL, BR);
  return (
    <g>
      <Face p={[T, MR, ML]} fill="var(--color-face-top)" label="1" font={font} labels={labels} />
      <Face p={[ML, BL, MB]} fill="var(--color-face-left)" label="2" font={font} labels={labels} />
      <Face p={[MR, BR, MB]} fill="var(--color-face-right)" label="3" font={font} labels={labels} />
      <Face p={[ML, MB, MR]} fill="var(--color-face-front)" label="4" font={font} labels={labels} />
      <Tab a={ML} b={BL} h={tabH} mark="A" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={BR} b={MR} h={tabH} mark="B" small={small} cutWidth={cutWidth} hatch={hatch} />
      {line(T, ML, "var(--color-ink-soft)", foldWidth * 1.2, dash, "f1")}
      {line(T, MR, "var(--color-ink-soft)", foldWidth * 1.2, dash, "f2")}
      {line(ML, MR, "var(--color-ink-soft)", foldWidth * 1.2, dash, "f3")}
      {line(ML, MB, "var(--color-ink-soft)", foldWidth * 1.2, dash, "f4")}
      {line(MR, MB, "var(--color-ink-soft)", foldWidth * 1.2, dash, "f5")}
      {line(T, BL, "var(--color-ink)", cutWidth, undefined, "c1")}
      {line(T, BR, "var(--color-ink)", cutWidth, undefined, "c2")}
      {line(BL, BR, "var(--color-ink)", cutWidth, undefined, "c3")}
      {labels ? (
        <>
          <Seam p={[mid(T, MR)[0] + small * 0.9, mid(T, MR)[1] - small * 0.2]} mark="C" small={small} />
          <DimBadge x={ox + e} y={oy + 2 * ht + small * 2.2} text={dim} fontSize={small * 1.05} />
        </>
      ) : null}
    </g>
  );
}

function Pyramid({
  W,
  H,
  a,
  tabH,
  cutWidth,
  foldWidth,
  dash,
  font,
  small,
  labels,
  dim,
  hatch,
}: {
  W: number;
  H: number;
  a: number;
  tabH: number;
  cutWidth: number;
  foldWidth: number;
  dash: string;
  font: number;
  small: number;
  labels: boolean;
  dim: string;
  hatch: string;
}) {
  const ht = (a * SQRT3) / 2;
  const netW = a + 2 * ht;
  const netH = a + 2 * ht;
  const ox = (W - netW) / 2;
  const oy = Math.max(H * 0.05, (H - netH - tabH) * 0.2);
  const tl: Pt = [ox + ht, oy + ht];
  const tr: Pt = [ox + ht + a, oy + ht];
  const br: Pt = [ox + ht + a, oy + ht + a];
  const bl: Pt = [ox + ht, oy + ht + a];
  const n: Pt = [ox + ht + a / 2, oy];
  const e: Pt = [ox + netW, oy + ht + a / 2];
  const s: Pt = [ox + ht + a / 2, oy + netH];
  const w: Pt = [ox, oy + ht + a / 2];
  return (
    <g>
      <Face p={[tl, tr, br, bl]} fill="var(--color-face-bottom)" label="Base" font={font} labels={labels} />
      <Face p={[tl, n, tr]} fill="var(--color-face-top)" label="N" font={font} labels={labels} />
      <Face p={[tr, e, br]} fill="var(--color-face-right)" label="E" font={font} labels={labels} />
      <Face p={[br, s, bl]} fill="var(--color-face-front)" label="S" font={font} labels={labels} />
      <Face p={[bl, w, tl]} fill="var(--color-face-left)" label="W" font={font} labels={labels} />
      <Tab a={tr} b={n} h={tabH} mark="A" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={br} b={e} h={tabH} mark="B" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={bl} b={s} h={tabH} mark="C" small={small} cutWidth={cutWidth} hatch={hatch} />
      {line(tl, tr, "var(--color-ink-soft)", foldWidth * 1.2, dash, "fb1")}
      {line(tr, br, "var(--color-ink-soft)", foldWidth * 1.2, dash, "fb2")}
      {line(br, bl, "var(--color-ink-soft)", foldWidth * 1.2, dash, "fb3")}
      {line(bl, tl, "var(--color-ink-soft)", foldWidth * 1.2, dash, "fb4")}
      {line(n, tl, "var(--color-ink)", cutWidth, undefined, "cn1")}
      {line(n, tr, "var(--color-ink)", cutWidth, undefined, "cn2")}
      {line(e, tr, "var(--color-ink)", cutWidth, undefined, "ce1")}
      {line(e, br, "var(--color-ink)", cutWidth, undefined, "ce2")}
      {line(s, br, "var(--color-ink)", cutWidth, undefined, "cs1")}
      {line(s, bl, "var(--color-ink)", cutWidth, undefined, "cs2")}
      {line(w, bl, "var(--color-ink)", cutWidth, undefined, "cw1")}
      {line(w, tl, "var(--color-ink)", cutWidth, undefined, "cw2")}
      {labels ? (
        <>
          <Seam p={[w[0] - small * 1.15, w[1]]} mark="D" small={small} />
          <DimBadge x={ox + ht + a / 2} y={oy + ht + a / 2 + font * 1.15} text={dim} fontSize={small * 1.05} />
        </>
      ) : null}
    </g>
  );
}

function Prism({
  W,
  H,
  e,
  len,
  tabH,
  cutWidth,
  foldWidth,
  dash,
  font,
  small,
  labels,
  dimE,
  dimL,
  hatch,
}: {
  W: number;
  H: number;
  e: number;
  len: number;
  tabH: number;
  cutWidth: number;
  foldWidth: number;
  dash: string;
  font: number;
  small: number;
  labels: boolean;
  dimE: string;
  dimL: string;
  hatch: string;
}) {
  const ht = (e * SQRT3) / 2;
  const netW = 3 * e;
  const netH = len + 2 * ht;
  const ox = (W - netW) / 2;
  const oy = Math.max(H * 0.04, (H - netH - tabH) * 0.2);
  const y0 = oy + ht;
  const p = (c: number, r: number): Pt => [ox + c * e, y0 + r * len];
  const topA: Pt = [ox + e, y0];
  const topB: Pt = [ox + 2 * e, y0];
  const topC: Pt = [ox + 1.5 * e, oy];
  const botA: Pt = [ox + e, y0 + len];
  const botB: Pt = [ox + 2 * e, y0 + len];
  const botC: Pt = [ox + 1.5 * e, y0 + len + ht];
  return (
    <g>
      <Face p={[p(0, 0), p(1, 0), p(1, 1), p(0, 1)]} fill="var(--color-face-left)" label="Wall 1" font={font} labels={labels} />
      <Face p={[p(1, 0), p(2, 0), p(2, 1), p(1, 1)]} fill="var(--color-face-front)" label="Wall 2" font={font} labels={labels} />
      <Face p={[p(2, 0), p(3, 0), p(3, 1), p(2, 1)]} fill="var(--color-face-right)" label="Wall 3" font={font} labels={labels} />
      <Face p={[topA, topB, topC]} fill="var(--color-face-top)" label="End" font={font} labels={labels} />
      <Face p={[botA, botC, botB]} fill="var(--color-face-bottom)" label="End" font={font} labels={labels} />
      <Tab a={p(3, 1)} b={p(3, 0)} h={tabH} mark="A" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={topB} b={topC} h={tabH} mark="B" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={topC} b={topA} h={tabH} mark="C" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab a={botA} b={botC} h={tabH} mark="D" small={small} cutWidth={cutWidth} hatch={hatch} />
      {line(p(1, 0), p(1, 1), "var(--color-ink-soft)", foldWidth * 1.2, dash, "pw1")}
      {line(p(2, 0), p(2, 1), "var(--color-ink-soft)", foldWidth * 1.2, dash, "pw2")}
      {line(topA, topB, "var(--color-ink-soft)", foldWidth * 1.2, dash, "pt")}
      {line(botA, botB, "var(--color-ink-soft)", foldWidth * 1.2, dash, "pb")}
      {line(p(0, 0), p(3, 0), "var(--color-ink)", cutWidth, undefined, "ct")}
      {line(p(0, 1), p(3, 1), "var(--color-ink)", cutWidth, undefined, "cb")}
      {line(p(0, 0), p(0, 1), "var(--color-ink)", cutWidth, undefined, "cl")}
      {line(topA, topC, "var(--color-ink)", cutWidth, undefined, "cte1")}
      {line(topB, topC, "var(--color-ink)", cutWidth, undefined, "cte2")}
      {line(botA, botC, "var(--color-ink)", cutWidth, undefined, "cbe1")}
      {line(botB, botC, "var(--color-ink)", cutWidth, undefined, "cbe2")}
      {labels ? (
        <>
          <Seam
            p={[mid(botB, botC)[0] + small * 1.2, mid(botB, botC)[1] + small * 0.3]}
            mark="E"
            small={small}
          />
          <DimBadge x={ox + 1.5 * e} y={y0 + len / 2} text={dimL} fontSize={small * 1.05} />
          <DimBadge x={ox + 1.5 * e} y={oy - small * 0.2} text={dimE} fontSize={small} />
        </>
      ) : null}
    </g>
  );
}

function Cylinder({
  W,
  H,
  d,
  h,
  tabH,
  cutWidth,
  foldWidth,
  dash,
  font,
  small,
  labels,
  dimD,
  dimH,
  hatch,
}: {
  W: number;
  H: number;
  d: number;
  h: number;
  tabH: number;
  cutWidth: number;
  foldWidth: number;
  dash: string;
  font: number;
  small: number;
  labels: boolean;
  dimD: string;
  dimH: string;
  hatch: string;
}) {
  const circ = Math.PI * d;
  const rad = d / 2;
  const netW = circ + tabH;
  const netH = h + 2 * d;
  const ox = (W - netW) / 2;
  const oy = Math.max((H - netH) / 2, H * 0.04);
  const yRect = oy + d;
  const cx = ox + circ / 2;
  const top: Pt = [cx, oy + rad];
  const bot: Pt = [cx, yRect + h + rad];
  return (
    <g>
      <rect
        x={ox}
        y={yRect}
        width={circ}
        height={h}
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth={cutWidth}
        rx={cutWidth}
      />
      <circle
        cx={top[0]}
        cy={top[1]}
        r={rad}
        fill="var(--color-face-top)"
        stroke="var(--color-ink)"
        strokeWidth={cutWidth}
      />
      <circle
        cx={bot[0]}
        cy={bot[1]}
        r={rad}
        fill="var(--color-face-bottom)"
        stroke="var(--color-ink)"
        strokeWidth={cutWidth}
      />
      <Tab
        a={[ox + circ, yRect + h]}
        b={[ox + circ, yRect]}
        h={tabH}
        mark="A"
        small={small}
        cutWidth={cutWidth}
        hatch={hatch}
      />
      {line([ox, yRect], [ox + circ, yRect], "var(--color-ink-soft)", foldWidth * 1.2, dash, "ct")}
      {line([ox, yRect + h], [ox + circ, yRect + h], "var(--color-ink-soft)", foldWidth * 1.2, dash, "cb")}
      {labels ? (
        <>
          <text x={cx} y={yRect + h / 2 + font * 0.35} textAnchor="middle" fontSize={font * 0.8} fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
            Wall
          </text>
          <text x={cx} y={top[1] + small * 0.35} textAnchor="middle" fontSize={font * 0.7} fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
            Top
          </text>
          <text x={cx} y={bot[1] + small * 0.35} textAnchor="middle" fontSize={font * 0.7} fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
            Base
          </text>
          <DimBadge x={cx} y={yRect + h + d + small * 2} text={`${dimD} × ${dimH}`} fontSize={small * 1.05} />
        </>
      ) : null}
    </g>
  );
}

function Cone({
  W,
  H,
  r,
  slant,
  tabH,
  cutWidth,
  foldWidth,
  dash,
  font,
  small,
  labels,
  dimR,
  dimL,
  hatch,
}: {
  W: number;
  H: number;
  r: number;
  slant: number;
  tabH: number;
  cutWidth: number;
  foldWidth: number;
  dash: string;
  font: number;
  small: number;
  labels: boolean;
  dimR: string;
  dimL: string;
  hatch: string;
}) {
  const theta = (2 * Math.PI * r) / slant;
  const apex: Pt = [W * 0.38, H * 0.12 + slant];
  const a0 = -Math.PI / 2 - theta / 2;
  const a1 = -Math.PI / 2 + theta / 2;
  const p0: Pt = [apex[0] + slant * Math.cos(a0), apex[1] + slant * Math.sin(a0)];
  const p1: Pt = [apex[0] + slant * Math.cos(a1), apex[1] + slant * Math.sin(a1)];
  const large = theta > Math.PI ? 1 : 0;
  const sweep = 1;
  const d = `M ${apex[0]} ${apex[1]} L ${p0[0]} ${p0[1]} A ${slant} ${slant} 0 ${large} ${sweep} ${p1[0]} ${p1[1]} Z`;
  const cx = W * 0.78;
  const cy = H * 0.28;
  const rim: Pt = [apex[0] + slant * Math.cos(-Math.PI / 2), apex[1] + slant * Math.sin(-Math.PI / 2)];
  return (
    <g>
      <path d={d} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={cutWidth} strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r} fill="var(--color-face-bottom)" stroke="var(--color-ink)" strokeWidth={cutWidth} />
      <Tab a={p1} b={apex} h={tabH} mark="A" small={small} cutWidth={cutWidth} hatch={hatch} />
      <Tab
        a={[cx + r * 0.15, cy - r]}
        b={[cx - r * 0.15, cy - r]}
        h={tabH * 0.85}
        mark="B"
        small={small}
        cutWidth={cutWidth}
        hatch={hatch}
      />
      {line(apex, rim, "var(--color-ink-soft)", foldWidth * 1.2, dash, "cr")}
      {labels ? (
        <>
          <text x={apex[0]} y={apex[1] - slant * 0.38} textAnchor="middle" fontSize={font * 0.75} fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
            Lateral
          </text>
          <text x={cx} y={cy + small * 0.35} textAnchor="middle" fontSize={font * 0.7} fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
            Base
          </text>
          <DimBadge x={W / 2} y={H * 0.92} text={`r ${dimR} · slant ${dimL}`} fontSize={small * 1.05} />
        </>
      ) : null}
    </g>
  );
}

export function FoldableThumb({ id }: { id: FoldableId }) {
  return (
    <div className="graph-paper aspect-square overflow-hidden rounded-lg p-2.5">
      {id === "cube" ? (
        <MiniNet
          cells={[
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [1, 2],
            [1, 3],
          ]}
        />
      ) : (
        <FoldableSvg id={id} paper="letter" showSheet={false} labels={false} tight />
      )}
    </div>
  );
}

function MiniNet({ cells }: { cells: [number, number][] }) {
  const xs = cells.map((c) => c[0]);
  const ys = cells.map((c) => c[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const cols = Math.max(...xs) - minX + 1;
  const rows = Math.max(...ys) - minY + 1;
  const fills = [
    "var(--color-face-top)",
    "var(--color-face-left)",
    "var(--color-face-front)",
    "var(--color-face-right)",
    "var(--color-face-bottom)",
    "var(--color-face-back)",
  ];
  const pad = 0.12;
  return (
    <svg viewBox={`${-pad} ${-pad} ${cols + pad * 2} ${rows + pad * 2}`} className="h-full w-full">
      {cells.map(([x, y], i) => (
        <rect
          key={`${x}-${y}`}
          x={x - minX + 0.05}
          y={y - minY + 0.05}
          width={0.9}
          height={0.9}
          rx={0.08}
          fill={fills[i % fills.length]}
          stroke="var(--color-ink)"
          strokeWidth={0.04}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
