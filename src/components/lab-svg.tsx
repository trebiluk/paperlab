import { ExtraScene } from "@/components/lab-svg-extra";
import { cn } from "@/lib/utils";

export function LabSvg({
  visual,
  className,
}: {
  visual: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={visual.replace(/-/g, " ")}
      shapeRendering="geometricPrecision"
    >
      <Scene id={visual} />
    </svg>
  );
}

function Sheet({ x, y, w, h, fill = "var(--color-face-front)" }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <rect x={x} y={y} width={w} height={h} fill={fill} stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
  );
}

function Caption({ children, y = 170 }: { children: string; y?: number }) {
  return (
    <text x="120" y={y} textAnchor="middle" fontSize="12" fill="var(--color-ink-soft)" fontFamily="Figtree, sans-serif" fontWeight={600}>
      {children}
    </text>
  );
}

function Dash({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="7 5" strokeLinecap="round" />;
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
  return ExtraScene(id) ?? <DefaultPaper />;
}

function DefaultPaper() {
  return (
    <g>
      <Sheet x={70} y={22} w={100} h={130} />
      <Dash x1={120} y1={22} x2={120} y2={152} />
      <Caption>One sheet</Caption>
    </g>
  );
}

function Dart({ step }: { step: string }) {
  if (step === "dart-1") {
    return (
      <g>
        <Sheet x={80} y={18} w={80} h={140} />
        <Dash x1={120} y1={18} x2={120} y2={158} />
        <Caption>Center crease</Caption>
      </g>
    );
  }
  if (step === "dart-2") {
    return (
      <g>
        <polygon points="120,20 168,78 168,158 72,158 72,78" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
        <Dash x1={120} y1={20} x2={120} y2={158} />
        <polygon points="120,20 168,78 120,78" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="120,20 72,78 120,78" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Corners in twice</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="36,92 200,70 200,86 120,96 200,106 200,122 36,100" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
      <polygon points="120,80 200,70 200,86 120,96" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.5} />
      <Caption>Wings match</Caption>
    </g>
  );
}

function Glider({ step }: { step: string }) {
  if (step === "glider-1") {
    return (
      <g>
        <Sheet x={50} y={40} w={140} h={100} />
        <rect x={50} y={40} width={140} height={22} fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={50} y={62} width={140} height={14} fill="var(--color-moss)" opacity={0.5} />
        <Caption>Heavy front strip</Caption>
      </g>
    );
  }
  if (step === "glider-2") {
    return (
      <g>
        <polygon points="28,90 212,90 200,70 40,70" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="28,90 212,90 200,108 40,108" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={108} y={70} width={24} height={50} fill="var(--color-pine)" />
        <Caption>Wide wings</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="30,96 210,96 198,78 42,78" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M50 78 Q70 68 90 78" fill="none" stroke="var(--color-pine)" strokeWidth={2} />
      <path d="M150 78 Q170 68 190 78" fill="none" stroke="var(--color-pine)" strokeWidth={2} />
      <Caption>Tiny up-bend to trim</Caption>
    </g>
  );
}

function Tower({ step }: { step: string }) {
  if (step === "tower-spec") {
    return (
      <g>
        <Sheet x={40} y={50} w={70} h={90} />
        <line x1={150} y1={30} x2={150} y2={150} stroke="var(--color-pine)" strokeWidth={3} />
        <polygon points="150,30 144,42 156,42" fill="var(--color-pine)" />
        <Caption>Tallest that stands</Caption>
      </g>
    );
  }
  if (step === "tower-ideas") {
    return (
      <g>
        <rect x={40} y={40} width={50} height={110} rx={22} fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M120 150 L128 40 L136 150 L144 40 L152 150 L160 40 L168 150" fill="none" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Tube or zigzag</Caption>
      </g>
    );
  }
  if (step === "tower-make") {
    return (
      <g>
        <ellipse cx="120" cy="42" rx="28" ry="10" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={92} y={42} width={56} height={108} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <ellipse cx="120" cy="150" rx="28" ry="10" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <Dash x1={120} y1={48} x2={120} y2={148} />
        <Caption>Roll a column</Caption>
      </g>
    );
  }
  return (
    <g>
      <rect x={100} y={36} width={40} height={100} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <line x1={88} y1={36} x2={88} y2={150} stroke="var(--color-pine)" strokeWidth={2} />
      <text x="78" y="100" fontSize="11" fill="var(--color-pine)" fontWeight={700} transform="rotate(-90 78 100)">cm</text>
      <Caption>Hands off · count ten</Caption>
    </g>
  );
}

function Bridge({ step }: { step: string }) {
  const books = (
    <g>
      <rect x={18} y={110} width={54} height={36} fill="var(--color-pine)" />
      <rect x={168} y={110} width={54} height={36} fill="var(--color-pine)" />
    </g>
  );
  if (step === "bridge-gap") {
    return (
      <g>
        {books}
        <Dash x1={72} y1={128} x2={168} y2={128} />
        <Caption>Span the gap</Caption>
      </g>
    );
  }
  if (step === "bridge-flat") {
    return (
      <g>
        {books}
        <path d="M28 110 Q120 150 212 110" fill="none" stroke="var(--color-ink)" strokeWidth={3} />
        <circle cx="120" cy="142" r="8" fill="var(--color-tape)" />
        <Caption>Flat sheet fails</Caption>
      </g>
    );
  }
  if (step === "bridge-beam") {
    return (
      <g>
        {books}
        <path d="M28 88 L72 88 L72 108 L168 108 L168 88 L212 88 L212 118 L28 118 Z" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Fold a beam</Caption>
      </g>
    );
  }
  return (
    <g>
      {books}
      <rect x={40} y={92} width={160} height={20} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x={108} y={72} width={24} height={22} rx={3} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <Caption>Load in the middle</Caption>
    </g>
  );
}

function Popup({ step }: { step: string }) {
  if (step === "popup-card") {
    return (
      <g>
        <polygon points="40,40 120,58 120,150 40,132" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="120,58 200,40 200,132 120,150" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>The card is a hinge</Caption>
      </g>
    );
  }
  if (step === "popup-cut") {
    return (
      <g>
        <Sheet x={70} y={20} w={100} h={140} />
        <line x1={120} y1={20} x2={120} y2={160} stroke="var(--color-ink)" strokeWidth={2} />
        <line x1={120} y1={55} x2={148} y2={55} stroke="var(--color-danger)" strokeWidth={2.4} />
        <line x1={120} y1={95} x2={148} y2={95} stroke="var(--color-danger)" strokeWidth={2.4} />
        <Caption>Two cuts from the fold</Caption>
      </g>
    );
  }
  if (step === "popup-v") {
    return (
      <g>
        <polygon points="36,50 120,70 120,150 36,130" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="120,70 204,50 204,130 120,150" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="92,88 148,88 148,118 92,118" fill="var(--color-toy-top)" stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Push the step through</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="36,50 120,70 120,150 36,130" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="120,70 204,50 204,130 120,150" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="100,48 140,48 132,88 108,88" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Caption>Glue on the step only</Caption>
    </g>
  );
}

function Pinwheel({ step }: { step: string }) {
  if (step === "square-cut") {
    return (
      <g>
        <Sheet x={78} y={22} w={84} h={120} />
        <polygon points="78,106 162,22 162,106" fill="var(--color-toy-top)" opacity={0.7} stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={78} y={22} width={84} height={22} fill="var(--color-tape)" opacity={0.85} />
        <Caption>Cut the leftover strip</Caption>
      </g>
    );
  }
  if (step === "pinwheel-cut") {
    return (
      <g>
        <Sheet x={55} y={22} w={130} h={130} />
        <Dash x1={55} y1={22} x2={185} y2={152} />
        <Dash x1={185} y1={22} x2={55} y2={152} />
        <circle cx="120" cy="87" r="10" fill="var(--color-surface)" stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Stop before the middle</Caption>
      </g>
    );
  }
  if (step === "pinwheel-fold" || step === "pinwheel-axle" || step === "pinwheel-spin") {
    return (
      <g>
        <polygon points="120,20 148,78 120,90 92,78" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="200,90 142,78 120,90 142,102" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="120,160 92,102 120,90 148,102" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="40,90 98,102 120,90 98,78" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <circle cx="120" cy="90" r="7" fill="var(--color-pine)" />
        <Caption>{step === "pinwheel-axle" ? "Pin through the hub" : step === "pinwheel-spin" ? "Blow · not too tight" : "Every other point in"}</Caption>
      </g>
    );
  }
  return <DefaultPaper />;
}

function Box({ step }: { step: string }) {
  if (step === "box-star") {
    return (
      <g>
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
        <Sheet x={55} y={22} w={130} h={130} />
        <polygon points="55,22 120,87 55,152" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.5} />
        <polygon points="185,22 120,87 185,152" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.5} />
        <polygon points="55,22 185,22 120,87" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.5} />
        <polygon points="55,152 185,152 120,87" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={1.5} />
        <Caption>Corners to center</Caption>
      </g>
    );
  }
  if (step === "box-fill") {
    return (
      <g>
        <polygon points="80,70 160,70 176,92 64,92" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="64,92 176,92 176,140 64,140" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={100} y={108} width={40} height={18} fill="var(--color-tape)" />
        <Caption>Fit a product</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="88,48 152,48 168,70 72,70" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="72,70 168,70 168,128 72,128" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="168,70 188,58 188,116 168,128" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth={2} />
      <Caption>Lift walls · tuck locks</Caption>
    </g>
  );
}

function Frog({ step }: { step: string }) {
  if (step === "frog-rect") {
    return (
      <g>
        <Sheet x={70} y={40} w={100} h={100} />
        <Caption>A squat rectangle</Caption>
      </g>
    );
  }
  if (step === "frog-hop") {
    return (
      <g>
        <ellipse cx="90" cy="120" rx="36" ry="14" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M90 120 Q140 40 190 88" fill="none" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="6 5" />
        <ellipse cx="190" cy="96" rx="20" ry="10" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Press · hop · mark</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="70,70 170,70 158,118 82,118" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="82,118 158,118 170,150 70,150" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x={92} y={78} width={14} height={12} fill="var(--color-surface-2)" />
      <rect x={134} y={78} width={14} height={12} fill="var(--color-surface-2)" />
      <Caption>The back is a spring</Caption>
    </g>
  );
}

function Lantern({ step }: { step: string }) {
  if (step === "lantern-safe") {
    return (
      <g>
        <circle cx="120" cy="80" r="36" fill="none" stroke="var(--color-danger)" strokeWidth={4} />
        <line x1={96} y1={56} x2={144} y2={104} stroke="var(--color-danger)" strokeWidth={4} />
        <rect x={108} y={70} width={24} height={32} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>No open flame</Caption>
      </g>
    );
  }
  if (step === "lantern-slits") {
    return (
      <g>
        <Sheet x={60} y={24} w={120} h={128} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={78} y1={40 + i * 16} x2={162} y2={40 + i * 16} stroke="var(--color-danger)" strokeWidth={2} />
        ))}
        <Caption>Stop before the rails</Caption>
      </g>
    );
  }
  if (step === "lantern-roll") {
    return (
      <g>
        <ellipse cx="120" cy="40" rx="40" ry="14" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={80} y={40} width={80} height={100} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <ellipse cx="120" cy="140" rx="40" ry="14" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Join a cylinder</Caption>
      </g>
    );
  }
  if (step === "lantern-handle") {
    return (
      <g>
        <path d="M90 36 Q120 8 150 36" fill="none" stroke="var(--color-pine)" strokeWidth={3} />
        <ellipse cx="120" cy="50" rx="42" ry="12" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M78 50 Q78 100 120 110 Q162 100 162 50" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Strip becomes a handle</Caption>
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="120" cy="48" rx="36" ry="12" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M84 48 Q70 100 120 130 Q170 100 156 48" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${92 + i * 12} 70 Q120 100 ${92 + i * 12} 118`} fill="none" stroke="var(--color-ink)" strokeWidth={1.4} />
      ))}
      <Caption>Push the ends · ribs open</Caption>
    </g>
  );
}

function Teller({ step }: { step: string }) {
  const petals = (
    <g>
      <polygon points="120,28 168,76 120,100 72,76" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="168,76 168,124 120,100" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="120,100 168,124 72,124" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="72,76 120,100 72,124" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={2} />
    </g>
  );
  if (step === "teller-1") {
    return (
      <g>
        <Sheet x={55} y={22} w={130} h={130} />
        <polygon points="55,22 185,22 120,87" fill="var(--color-toy-top)" opacity={0.8} />
        <Caption>Corners in · twice</Caption>
      </g>
    );
  }
  if (step === "teller-3") {
    return (
      <g>
        {petals}
        <text x="120" y="62" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)">word</text>
        <Caption>Colors · numbers · facts</Caption>
      </g>
    );
  }
  if (step === "teller-use") {
    return (
      <g>
        {petals}
        <Caption>Partner picks · you operate</Caption>
      </g>
    );
  }
  return (
    <g>
      {petals}
      <Caption>Open both ways</Caption>
    </g>
  );
}

function Weave({ step }: { step: string }) {
  if (step === "weave-cut") {
    return (
      <g>
        <Sheet x={70} y={20} w={100} h={140} />
        {[28, 52, 76].map((x) => (
          <line key={x} x1={70 + x} y1={20} x2={70 + x} y2={160} stroke="var(--color-danger)" strokeWidth={2} />
        ))}
        <Caption>Even strips</Caption>
      </g>
    );
  }
  if (step === "weave-warp") {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={48 + i * 30} y={28} width={22} height={124} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.5} />
        ))}
        <rect x={44} y={24} width={152} height={12} fill="var(--color-tape)" />
        <Caption>Warp · tape is a loom</Caption>
      </g>
    );
  }
  if (step === "weave-mat") {
    return (
      <g>
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
  if (step === "copter-cut") {
    return (
      <g>
        <Sheet x={100} y={16} w={40} h={148} />
        <line x1={120} y1={16} x2={120} y2={88} stroke="var(--color-danger)" strokeWidth={2.4} />
        <line x1={100} y1={96} x2={112} y2={96} stroke="var(--color-danger)" strokeWidth={2} />
        <line x1={128} y1={96} x2={140} y2={96} stroke="var(--color-danger)" strokeWidth={2} />
        <Caption>Slit · shoulders · stem</Caption>
      </g>
    );
  }
  if (step === "copter-drop") {
    return (
      <g>
        <rect x={112} y={70} width={16} height={70} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="120,70 178,48 178,62 120,84" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="120,70 62,92 62,106 120,84" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <path d="M120 28 L120 66" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" />
        <Caption>Drop · do not throw</Caption>
      </g>
    );
  }
  return (
    <g>
      <rect x={112} y={70} width={16} height={70} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <polygon points="120,70 186,52 186,66 120,84" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <polygon points="120,70 54,88 54,102 120,84" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Caption>One blade toward · one away</Caption>
    </g>
  );
}

function FlyTest() {
  return (
    <g>
      <line x1={40} y1={140} x2={210} y2={140} stroke="var(--color-ink)" strokeWidth={2} />
      <rect x={36} y={128} width={10} height={24} fill="var(--color-tape)" />
      <polygon points="70,100 150,86 150,98 110,104 150,110 150,122 70,108" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Caption>Same line · write the number</Caption>
    </g>
  );
}

function Iterate() {
  return (
    <g>
      <Sheet x={28} y={40} w={70} h={90} fill="var(--color-surface-2)" />
      <text x="63" y="88" textAnchor="middle" fontSize="14" fontWeight={700} fill="var(--color-muted)">v1</text>
      <path d="M108 85 L132 85" stroke="var(--color-pine)" strokeWidth={2.4} markerEnd="url(#lab-arrow)" />
      <Sheet x={142} y={40} w={70} h={90} />
      <text x="177" y="88" textAnchor="middle" fontSize="14" fontWeight={700} fill="var(--color-pine)">v2</text>
      <defs>
        <marker id="lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-pine)" />
        </marker>
      </defs>
      <Caption>Change one thing</Caption>
    </g>
  );
}

function System() {
  return (
    <g>
      {[
        [28, "In"],
        [98, "Process"],
        [168, "Out"],
      ].map(([x, label]) => (
        <g key={String(label)}>
          <rect x={Number(x)} y={60} width={52} height={52} rx={8} fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth={2} />
          <text x={Number(x) + 26} y={90} textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)">
            {label}
          </text>
        </g>
      ))}
      <path d="M80 86 H96" stroke="var(--color-pine)" strokeWidth={2} />
      <path d="M150 86 H166" stroke="var(--color-pine)" strokeWidth={2} />
      <Caption>Name the three parts</Caption>
    </g>
  );
}
