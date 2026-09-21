import { ExtraScene } from "@/components/lab-svg-extra";
import {
  Caption,
  Cut,
  Desk,
  FoldArrow,
  GfxProvider,
  LabBackdrop,
  LabDefs,
  PaperPoly,
  PaperSheet,
  Valley,
  ViewChip,
  useArrow,
  useGrain,
  useShadow,
} from "@/components/paper-gfx";
import { cn } from "@/lib/utils";
import { useId } from "react";

export function LabSvg({
  visual,
  className,
  decorative,
}: {
  visual: string;
  className?: string;
  decorative?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 180"
      className={cn("h-full w-full", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : visual.replace(/-/g, " ")}
      shapeRendering="geometricPrecision"
    >
      <GfxProvider uid={uid}>
        <LabDefs uid={uid} />
        <LabBackdrop uid={uid} />
        <Scene id={visual} />
      </GfxProvider>
    </svg>
  );
}

function Sheet(props: { x: number; y: number; w: number; h: number; fill?: string }) {
  return <PaperSheet {...props} />;
}

function Dash(props: { x1: number; y1: number; x2: number; y2: number }) {
  return <Valley {...props} />;
}

function Scene({ id }: { id: string }) {
  if (id.startsWith("dart")) return <Dart step={id} />;
  if (id.startsWith("glider")) return <Glider step={id} />;
  if (id.startsWith("tower")) return <Tower step={id} />;
  if (id.startsWith("bridge")) return <Bridge step={id} />;
  if (id.startsWith("popup")) return <Popup step={id} />;
  if (id.startsWith("pinwheel") || id === "square-cut") return <Pinwheel step={id} />;
  if (id.startsWith("box")) return <Box step={id} />;
  if (id.startsWith("frog")) return <Frog step={id} />;
  if (id.startsWith("lantern")) return <Lantern step={id} />;
  if (id.startsWith("teller")) return <Teller step={id} />;
  if (id.startsWith("weave")) return <Weave step={id} />;
  if (id.startsWith("copter")) return <Copter step={id} />;
  if (id === "spec-line" || id === "fly-test") return <FlyTest />;
  if (id === "iterate") return <Iterate />;
  if (id === "system") return <System />;
  const extra = ExtraScene(id);
  if (extra) return extra;
  return <DefaultPaper missing={id} />;
}

function DefaultPaper({ missing }: { missing?: string }) {
  return (
    <g>
      <ViewChip label="DEV" />
      <Sheet x={70} y={22} w={100} h={130} />
      <Dash x1={120} y1={22} x2={120} y2={152} />
      <FoldArrow d="M138 70 Q158 88 138 108" />
      <Caption>{missing ? `Missing: ${missing}` : "One sheet"}</Caption>
    </g>
  );
}

function Dart({ step }: { step: string }) {
  if (step === "dart-1") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={80} y={18} w={80} h={140} />
        <Dash x1={120} y1={18} x2={120} y2={158} />
        <FoldArrow d="M142 50 Q162 78 142 110" />
        <Caption>Center crease</Caption>
      </g>
    );
  }
  if (step === "dart-2") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,20 168,78 168,158 72,158 72,78" />
        <Dash x1={120} y1={20} x2={120} y2={158} />
        <PaperPoly points="120,20 168,78 120,78" fill="var(--color-toy-top)" />
        <PaperPoly points="120,20 72,78 120,78" fill="var(--color-toy-left)" />
        <FoldArrow d="M168 58 Q148 48 128 58" />
        <FoldArrow d="M72 58 Q92 48 112 58" />
        <Caption>Corners in twice</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="TOP" />
      <Desk y={136} />
      <PaperPoly points="28,100 208,72 208,90 118,102 208,114 208,132 28,108" />
      <PaperPoly points="118,84 208,72 208,90 118,102" fill="var(--color-toy-top)" />
      <PaperPoly points="118,102 208,114 208,132 118,118" fill="var(--color-toy-left)" />
      <Caption>Wings match</Caption>
    </g>
  );
}

function Glider({ step }: { step: string }) {
  if (step === "glider-1") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={50} y={40} w={140} h={100} />
        <rect x={50} y={40} width={140} height={22} fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={50} y={62} width={140} height={14} fill="var(--color-moss)" opacity={0.45} />
        <FoldArrow d="M70 38 Q70 22 90 22" />
        <Caption>Heavy front strip</Caption>
      </g>
    );
  }
  if (step === "glider-2") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="28,96 212,96 200,72 40,72" fill="var(--color-toy-top)" />
        <PaperPoly points="28,96 212,96 200,118 40,118" />
        <rect x={108} y={72} width={24} height={56} fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <Caption>Wide wings</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <PaperPoly points="30,104 210,104 198,82 42,82" fill="var(--color-toy-top)" />
      <path d="M50 82 Q70 68 90 82" fill="none" stroke="var(--color-pine)" strokeWidth={2.2} />
      <path d="M150 82 Q170 68 190 82" fill="none" stroke="var(--color-pine)" strokeWidth={2.2} />
      <Caption>Tiny up-bend to trim</Caption>
    </g>
  );
}

function Tower({ step }: { step: string }) {
  const grain = useGrain();
  if (step === "tower-spec") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <Sheet x={40} y={50} w={70} h={90} />
        <line x1={158} y1={28} x2={158} y2={150} stroke="var(--color-pine)" strokeWidth={3} />
        <polygon points="158,28 151,42 165,42" fill="var(--color-pine)" />
        <text x="174" y="92" fontSize="11" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
          up
        </text>
        <Caption>Tallest that stands</Caption>
      </g>
    );
  }
  if (step === "tower-ideas") {
    return (
      <g>
        <ViewChip label="ISO" />
        <ellipse cx="64" cy="42" rx="22" ry="8" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={42} y={42} width={44} height={108} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <ellipse cx="64" cy="150" rx="22" ry="8" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <path d="M128 150 L138 36 L148 150 L158 36 L168 150 L178 36 L188 150" fill="none" stroke="var(--color-ink)" strokeWidth={2.2} strokeLinejoin="round" />
        <Caption>Tube or zigzag</Caption>
      </g>
    );
  }
  if (step === "tower-make") {
    return (
      <g>
        <ViewChip label="ISO" />
        <Desk />
        <ellipse cx="120" cy="36" rx="30" ry="11" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={90} y={36} width={60} height={112} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={90} y={36} width={60} height={112} fill={grain} />
        <ellipse cx="120" cy="148" rx="30" ry="11" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <Dash x1={120} y1={42} x2={120} y2={144} />
        <Caption>Roll a column</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <Desk />
      <rect x={102} y={28} width={36} height={120} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x={102} y={28} width={36} height={120} fill={grain} />
      <line x1={84} y1={28} x2={84} y2={148} stroke="var(--color-pine)" strokeWidth={2} />
      <text
        x="74"
        y="100"
        fontSize="11"
        fill="var(--color-pine)"
        fontWeight={700}
        transform="rotate(-90 74 100)"
        fontFamily="Figtree, sans-serif"
      >
        cm
      </text>
      <Caption>Hands off · count ten</Caption>
    </g>
  );
}

function Bridge({ step }: { step: string }) {
  const books = (
    <g>
      <rect x={16} y={108} width={56} height={14} fill="var(--color-pine)" />
      <rect x={18} y={120} width={52} height={12} fill="var(--color-moss)" />
      <rect x={20} y={132} width={48} height={12} fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1} />
      <rect x={168} y={108} width={56} height={14} fill="var(--color-pine)" />
      <rect x={170} y={120} width={52} height={12} fill="var(--color-moss)" />
      <rect x={172} y={132} width={48} height={12} fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1} />
    </g>
  );
  if (step === "bridge-gap") {
    return (
      <g>
        <ViewChip label="FRONT" />
        {books}
        <Dash x1={72} y1={126} x2={168} y2={126} />
        <text x="120" y="118" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
          span
        </text>
        <Caption>Span the gap</Caption>
      </g>
    );
  }
  if (step === "bridge-flat") {
    return (
      <g>
        <ViewChip label="FRONT" />
        {books}
        <path d="M28 108 Q120 158 212 108" fill="none" stroke="var(--color-ink)" strokeWidth={3.2} />
        <circle cx="120" cy="146" r="8" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Flat sheet fails</Caption>
      </g>
    );
  }
  if (step === "bridge-beam") {
    return (
      <g>
        <ViewChip label="ISO" />
        {books}
        <PaperPoly points="24,84 72,84 72,106 168,106 168,84 216,84 216,122 24,122" />
        <rect x={72} y={84} width={96} height={8} fill="var(--color-toy-left)" />
        <Caption>Fold a beam</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      {books}
      <PaperPoly points="36,90 204,90 204,114 36,114" />
      <rect x={108} y={68} width={24} height={24} rx={3} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <Caption>Load in the middle</Caption>
    </g>
  );
}

function Popup({ step }: { step: string }) {
  if (step === "popup-card") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="36,38 120,58 120,152 36,132" fill="var(--color-toy-left)" />
        <PaperPoly points="120,58 204,38 204,132 120,152" />
        <Caption>The card is a hinge</Caption>
      </g>
    );
  }
  if (step === "popup-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={20} w={100} h={140} />
        <line x1={120} y1={20} x2={120} y2={160} stroke="var(--color-ink)" strokeWidth={2} />
        <Cut x1={120} y1={55} x2={150} y2={55} />
        <Cut x1={120} y1={95} x2={150} y2={95} />
        <Caption>Two cuts from the fold</Caption>
      </g>
    );
  }
  if (step === "popup-v") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="36,50 120,70 120,150 36,130" fill="var(--color-toy-left)" />
        <PaperPoly points="120,70 204,50 204,130 120,150" />
        <PaperPoly points="90,84 150,84 150,118 90,118" fill="var(--color-toy-top)" />
        <FoldArrow d="M150 100 Q170 100 170 80" />
        <Caption>Push the step through</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="ISO" />
      <PaperPoly points="36,50 120,70 120,150 36,130" fill="var(--color-toy-left)" />
      <PaperPoly points="120,70 204,50 204,130 120,150" />
      <PaperPoly points="100,44 140,44 132,86 108,86" fill="var(--color-pine)" />
      <Caption>Glue on the step only</Caption>
    </g>
  );
}

function Pinwheel({ step }: { step: string }) {
  if (step === "square-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={78} y={22} w={84} h={120} />
        <PaperPoly points="78,106 162,22 162,106" fill="var(--color-toy-top)" />
        <rect x={78} y={22} width={84} height={22} fill="var(--color-tape)" opacity={0.9} />
        <Cut x1={78} y1={106} x2={162} y2={106} />
        <Caption>Cut the leftover strip</Caption>
      </g>
    );
  }
  if (step === "pinwheel-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <Dash x1={55} y1={22} x2={185} y2={152} />
        <Dash x1={185} y1={22} x2={55} y2={152} />
        <Cut x1={55} y1={22} x2={108} y2={75} />
        <Cut x1={185} y1={22} x2={132} y2={75} />
        <circle cx="120" cy="87" r="11" fill="var(--color-surface)" stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Stop before the middle</Caption>
      </g>
    );
  }
  if (step === "pinwheel-fold") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="120,16 152,76 120,90 88,76" fill="var(--color-toy-top)" />
        <PaperPoly points="204,90 144,76 120,90 144,104" />
        <PaperPoly points="120,164 88,104 120,90 152,104" fill="var(--color-toy-left)" />
        <PaperPoly points="36,90 96,104 120,90 96,76" fill="var(--color-moss)" />
        <circle cx="120" cy="90" r="8" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={1.2} />
        <FoldArrow d="M168 52 Q148 62 136 78" />
        <FoldArrow d="M72 52 Q92 62 104 78" />
        <Caption>Every other point in</Caption>
      </g>
    );
  }
  if (step === "pinwheel-axle") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <Desk y={142} />
        <rect x="116" y="48" width="8" height="96" rx="2" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <PaperPoly points="86,70 154,58 164,78 96,90" fill="var(--color-toy-top)" />
        <PaperPoly points="86,90 154,78 164,98 96,110" fill="var(--color-toy-left)" />
        <circle cx="120" cy="84" r="7" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={1.2} />
        <circle cx="120" cy="40" r="10" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.2} />
        <Caption>Pin through the hub</Caption>
      </g>
    );
  }
  if (step === "pinwheel-spin") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="120,16 152,76 120,90 88,76" fill="var(--color-toy-top)" />
        <PaperPoly points="204,90 144,76 120,90 144,104" />
        <PaperPoly points="120,164 88,104 120,90 152,104" fill="var(--color-toy-left)" />
        <PaperPoly points="36,90 96,104 120,90 96,76" fill="var(--color-moss)" />
        <circle cx="120" cy="90" r="8" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={1.2} />
        <path
          d="M28 48 Q48 28 78 38"
          fill="none"
          stroke="var(--color-pine)"
          strokeWidth={2}
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <path
          d="M212 48 Q192 28 162 38"
          fill="none"
          stroke="var(--color-pine)"
          strokeWidth={2}
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <Caption>Blow · not too tight</Caption>
      </g>
    );
  }
  return <DefaultPaper />;
}

function Box({ step }: { step: string }) {
  if (step === "box-star") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <Dash x1={120} y1={22} x2={120} y2={152} />
        <Dash x1={55} y1={87} x2={185} y2={87} />
        <Dash x1={55} y1={22} x2={185} y2={152} />
        <Dash x1={185} y1={22} x2={55} y2={152} />
        <Caption>Plus and X</Caption>
      </g>
    );
  }
  if (step === "box-blintz") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <PaperPoly points="55,22 120,87 55,152" fill="var(--color-toy-left)" />
        <PaperPoly points="185,22 120,87 185,152" fill="var(--color-toy-top)" />
        <PaperPoly points="55,22 185,22 120,87" />
        <PaperPoly points="55,152 185,152 120,87" fill="var(--color-moss)" />
        <FoldArrow d="M70 36 Q96 60 112 78" />
        <Caption>Corners to center</Caption>
      </g>
    );
  }
  if (step === "box-fill") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="80,68 160,68 178,92 62,92" fill="var(--color-toy-top)" />
        <PaperPoly points="62,92 178,92 178,142 62,142" />
        <PaperPoly points="178,92 198,80 198,128 178,142" fill="var(--color-pine)" />
        <rect x={100} y={110} width={40} height={18} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Fit a product</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="ISO" />
      <PaperPoly points="88,44 152,44 170,68 70,68" fill="var(--color-toy-top)" />
      <PaperPoly points="70,68 170,68 170,130 70,130" />
      <PaperPoly points="170,68 192,54 192,116 170,130" fill="var(--color-pine)" />
      <Valley x1={70} y1={88} x2={170} y2={88} />
      <Caption>Lift walls · tuck locks</Caption>
    </g>
  );
}

function Frog({ step }: { step: string }) {
  const arrow = useArrow();
  if (step === "frog-rect") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={40} w={100} h={100} />
        <Caption>A squat rectangle</Caption>
      </g>
    );
  }
  if (step === "frog-hop") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <Desk y={140} />
        <ellipse cx="86" cy="122" rx="36" ry="14" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M90 118 Q140 36 194 86" fill="none" stroke="var(--color-pine)" strokeWidth={2.2} strokeDasharray="6 5" markerEnd={arrow} />
        <ellipse cx="194" cy="94" rx="20" ry="10" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Press · hop · mark</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <PaperPoly points="70,70 170,70 158,118 82,118" fill="var(--color-toy-top)" />
      <PaperPoly points="82,118 158,118 170,150 70,150" fill="var(--color-moss)" />
      <rect x={92} y={78} width={14} height={12} fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth={1} />
      <rect x={134} y={78} width={14} height={12} fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth={1} />
      <Caption>The back is a spring</Caption>
    </g>
  );
}

function Lantern({ step }: { step: string }) {
  const grain = useGrain();
  if (step === "lantern-safe") {
    return (
      <g>
        <circle cx="120" cy="78" r="40" fill="none" stroke="var(--color-danger)" strokeWidth={4} />
        <line x1={94} y1={52} x2={146} y2={104} stroke="var(--color-danger)" strokeWidth={4} />
        <PaperPoly points="108,64 132,64 132,104 108,104" />
        <Caption>No open flame</Caption>
      </g>
    );
  }
  if (step === "lantern-slits") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={60} y={24} w={120} h={128} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Cut key={i} x1={78} y1={40 + i * 16} x2={162} y2={40 + i * 16} />
        ))}
        <Caption>Stop before the rails</Caption>
      </g>
    );
  }
  if (step === "lantern-roll") {
    return (
      <g>
        <ViewChip label="ISO" />
        <ellipse cx="120" cy="40" rx="42" ry="14" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={78} y={40} width={84} height={100} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={78} y={40} width={84} height={100} fill={grain} />
        <ellipse cx="120" cy="140" rx="42" ry="14" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Join a cylinder</Caption>
      </g>
    );
  }
  if (step === "lantern-handle") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <path d="M88 34 Q120 4 152 34" fill="none" stroke="var(--color-pine)" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx="120" cy="50" rx="44" ry="12" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M76 50 Q76 104 120 116 Q164 104 164 50" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M76 50 Q76 104 120 116 Q164 104 164 50" fill={grain} />
        <Caption>Strip becomes a handle</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <ellipse cx="120" cy="46" rx="38" ry="12" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M82 46 Q66 102 120 134 Q174 102 158 46" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M82 46 Q66 102 120 134 Q174 102 158 46" fill={grain} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${90 + i * 12} 68 Q120 102 ${90 + i * 12} 122`} fill="none" stroke="var(--color-ink)" strokeWidth={1.4} />
      ))}
      <Caption>Push the ends · ribs open</Caption>
    </g>
  );
}

function Teller({ step }: { step: string }) {
  const petals = (
    <g>
      <PaperPoly points="120,24 172,74 120,100 68,74" fill="var(--color-toy-top)" />
      <PaperPoly points="172,74 172,126 120,100" />
      <PaperPoly points="120,100 172,126 68,126" fill="var(--color-toy-left)" />
      <PaperPoly points="68,74 120,100 68,126" fill="var(--color-moss)" />
    </g>
  );
  if (step === "teller-1") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <PaperPoly points="55,22 185,22 120,87" fill="var(--color-toy-top)" />
        <FoldArrow d="M70 36 Q96 58 112 78" />
        <Caption>Corners in · twice</Caption>
      </g>
    );
  }
  if (step === "teller-3") {
    return (
      <g>
        <ViewChip label="TOP" />
        {petals}
        <text x="120" y="62" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)" fontFamily="Figtree, sans-serif">
          word
        </text>
        <Caption>Colors · numbers · facts</Caption>
      </g>
    );
  }
  if (step === "teller-use") {
    return (
      <g>
        <ViewChip label="TOP" />
        {petals}
        <Caption>Partner picks · you operate</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="TOP" />
      {petals}
      <Caption>Open both ways</Caption>
    </g>
  );
}

function Weave({ step }: { step: string }) {
  if (step === "weave-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={20} w={100} h={140} />
        {[28, 52, 76].map((x) => (
          <Cut key={x} x1={70 + x} y1={20} x2={70 + x} y2={160} />
        ))}
        <Caption>Even strips</Caption>
      </g>
    );
  }
  if (step === "weave-warp") {
    return (
      <g>
        <ViewChip label="TOP" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={48 + i * 30}
            y={28}
            width={22}
            height={124}
            fill="var(--color-face-front)"
            stroke="var(--color-ink)"
            strokeWidth={1.5}
          />
        ))}
        <rect x={44} y={24} width={152} height={12} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Warp · tape is a loom</Caption>
      </g>
    );
  }
  if (step === "weave-mat") {
    return (
      <g>
        <ViewChip label="TOP" />
        <rect x={50} y={30} width={140} height={120} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        {[0, 1, 2, 3, 4, 5].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={56 + c * 26}
              y={36 + r * 18}
              width={24}
              height={16}
              fill={(r + c) % 2 === 0 ? "var(--color-toy-top)" : "var(--color-toy-left)"}
            />
          )),
        )}
        <Caption>Checkerboard · hem the ends</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="TOP" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`w${i}`} x={48 + i * 30} y={28} width={22} height={124} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.4} />
      ))}
      <rect x={40} y={70} width={160} height={20} fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <rect x={40} y={108} width={160} height={20} fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Caption>Over · under · next row flips</Caption>
    </g>
  );
}

function Copter({ step }: { step: string }) {
  const arrow = useArrow();
  if (step === "copter-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={100} y={16} w={40} h={148} />
        <Cut x1={120} y1={16} x2={120} y2={88} />
        <Cut x1={100} y1={96} x2={112} y2={96} />
        <Cut x1={128} y1={96} x2={140} y2={96} />
        <Caption>Slit · shoulders · stem</Caption>
      </g>
    );
  }
  if (step === "copter-drop") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <rect x={112} y={70} width={16} height={70} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <PaperPoly points="120,70 178,46 178,62 120,84" fill="var(--color-toy-top)" />
        <PaperPoly points="120,70 62,92 62,108 120,84" fill="var(--color-toy-left)" />
        <path d="M120 18 L120 64" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" markerEnd={arrow} />
        <Caption>Drop · do not throw</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <rect x={112} y={70} width={16} height={70} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <PaperPoly points="120,70 186,50 186,66 120,84" fill="var(--color-toy-top)" />
      <PaperPoly points="120,70 54,88 54,104 120,84" fill="var(--color-toy-left)" />
      <Caption>One blade toward · one away</Caption>
    </g>
  );
}

function FlyTest() {
  return (
    <g>
      <ViewChip label="SIDE" />
      <Desk y={140} />
      <rect x={32} y={128} width={10} height={24} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
      <PaperPoly points="64,96 158,78 158,92 112,100 158,108 158,122 64,106" />
      <path d="M70 88 Q120 70 170 84" fill="none" stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="5 4" />
      <Caption>Same line · write the number</Caption>
    </g>
  );
}

function Iterate() {
  return (
    <g>
      <ViewChip label="DEV" />
      <Sheet x={28} y={40} w={70} h={90} fill="var(--color-surface-2)" />
      <text x="63" y="88" textAnchor="middle" fontSize="14" fontWeight={700} fill="var(--color-muted)" fontFamily="Figtree, sans-serif">
        v1
      </text>
      <FoldArrow d="M108 85 L132 85" />
      <Sheet x={142} y={40} w={70} h={90} />
      <text x="177" y="88" textAnchor="middle" fontSize="14" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
        v2
      </text>
      <Caption>Change one thing</Caption>
    </g>
  );
}

function System() {
  const shadow = useShadow();
  return (
    <g>
      <ViewChip label="DEV" />
      {[
        [28, "In"],
        [98, "Process"],
        [168, "Out"],
      ].map(([x, label]) => (
        <g key={String(label)}>
          <rect
            x={Number(x)}
            y={58}
            width={52}
            height={52}
            rx={8}
            fill="var(--color-surface)"
            stroke="var(--color-ink)"
            strokeWidth={2}
            filter={shadow}
          />
          <text
            x={Number(x) + 26}
            y={88}
            textAnchor="middle"
            fontSize="11"
            fontWeight={700}
            fill="var(--color-ink)"
            fontFamily="Figtree, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}
      <FoldArrow d="M80 84 H96" />
      <FoldArrow d="M150 84 H166" />
      <Caption>Name the three parts</Caption>
    </g>
  );
}
