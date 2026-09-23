import {
  Caption,
  Cut,
  Desk,
  FoldArrow,
  PaperPoly,
  PaperSheet,
  Valley,
  ViewChip,
} from "@/components/paper-gfx";

function Sheet(props: { x: number; y: number; w: number; h: number; fill?: string }) {
  return <PaperSheet {...props} />;
}

export function CraftScene(id: string) {
  if (id.startsWith("kite")) return <Kite step={id} />;
  if (id.startsWith("bag")) return <Bag step={id} />;
  if (id.startsWith("wallet") || id === "portrait-valleys" || id === "pocket-cover-hems" || id === "load-cards" || id === "ten-shake" || id === "one-change-retest") return <Wallet step={id} />;
  if (id.startsWith("frame")) return <Frame step={id} />;
  if (id.startsWith("flower")) return <Flower step={id} />;
  if (id.startsWith("grabber")) return <Grabber step={id} />;
  if (id.startsWith("whirly")) return <Whirligig step={id} />;
  return null;
}

function Kite({ step }: { step: string }) {
  if (step === "kite-blank") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,22 196,90 120,158 44,90" />
        <Valley x1={120} y1={22} x2={120} y2={158} />
        <FoldArrow d="M150 70 Q168 90 150 110" />
        <Caption>Diamond · spine crease</Caption>
      </g>
    );
  }
  if (step === "kite-bridle") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="120,20 188,88 120,156 52,88" />
        <Valley x1={120} y1={20} x2={120} y2={156} />
        <circle cx="120" cy="48" r="4" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <circle cx="120" cy="100" r="4" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <path d="M120 48 L168 78 L120 100" fill="none" stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Two tape joints · bridle loop</Caption>
      </g>
    );
  }
  if (step === "kite-tail") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="120,18 178,78 120,118 62,78" />
        <path
          d="M120 118 C128 132 110 146 124 160"
          fill="none"
          stroke="var(--color-toy-right)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <Caption>Leftover strip is the tail</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <Desk y={150} />
      <PaperPoly points="86,28 150,62 86,98 48,62" />
      <path d="M86 98 C94 114 78 128 90 142" fill="none" stroke="var(--color-toy-right)" strokeWidth={3.5} />
      <path d="M150 62 L200 88" stroke="var(--color-pine)" strokeWidth={2} />
      <Caption>Walk · count five · no running</Caption>
    </g>
  );
}

function Bag({ step }: { step: string }) {
  if (step === "bag-net") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={18} w={100} h={140} />
        <Valley x1={120} y1={18} x2={120} y2={158} />
        <Valley x1={70} y1={128} x2={170} y2={128} />
        <Caption>Tube crease · floor strip</Caption>
      </g>
    );
  }
  if (step === "bag-bottom") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="70,70 150,50 190,78 110,102" fill="var(--color-face-top)" />
        <PaperPoly points="70,70 110,102 110,150 70,118" fill="var(--color-face-left)" />
        <PaperPoly points="110,102 190,78 190,126 110,150" />
        <Caption>Square bottom · sit test</Caption>
      </g>
    );
  }
  if (step === "bag-handles") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="64,70 176,70 168,150 72,150" />
        <path d="M88 70 C88 28 152 28 152 70" fill="none" stroke="var(--color-ink)" strokeWidth={3} />
        <path d="M104 70 C104 44 136 44 136 70" fill="none" stroke="var(--color-ink)" strokeWidth={3} />
        <Caption>Loops glued inside the hem</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <Desk y={150} />
      <PaperPoly points="78,62 162,62 154,140 86,140" />
      <path d="M96 62 C96 30 144 30 144 62" fill="none" stroke="var(--color-ink)" strokeWidth={3} />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={98 + i * 12}
          y={100}
          width="10"
          height="22"
          rx="1"
          fill="var(--color-moss)"
          stroke="var(--color-ink)"
          strokeWidth={0.8}
        />
      ))}
      <Caption>Six sticks · 3 m walk</Caption>
    </g>
  );
}

function Wallet({ step }: { step: string }) {
  if (step === "portrait-valleys") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={80} y={20} w={80} h={140} />
        <Valley x1={80} y1={90} x2={160} y2={90} />
        <FoldArrow d="M172 128 Q188 110 172 92" />
        <Caption>Pocket height first</Caption>
      </g>
    );
  }
  if (step === "pocket-cover-hems") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <Sheet x={64} y={40} w={112} h={100} fill="var(--color-face-right)" />
        <PaperPoly points="64,88 176,88 176,140 64,140" fill="var(--color-face-front)" />
        <Valley x1={78} y1={88} x2={78} y2={140} />
        <Valley x1={162} y1={88} x2={162} y2={140} />
        <Caption>Bottom up · side hems</Caption>
      </g>
    );
  }
  if (step === "load-cards") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <Sheet x={58} y={48} w={124} h={88} fill="var(--color-face-right)" />
        <rect x="74" y="64" width="92" height="14" rx="1" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1} />
        <rect x="74" y="80" width="92" height="14" rx="1" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1} />
        <rect x="74" y="96" width="92" height="14" rx="1" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Three scraps · then close</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <Desk y={148} />
      <Sheet x={70} y={88} w={100} h={48} />
      <path d="M170 100 Q196 70 188 48" fill="none" stroke="var(--color-pine)" strokeWidth={2.2} strokeDasharray="5 4" />
      <Caption>Ten shakes over the desk</Caption>
    </g>
  );
}

function Frame({ step }: { step: string }) {
  if (step === "frame-window") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <rect x="82" y="52" width="76" height="58" fill="var(--color-bg-warm)" stroke="var(--color-danger)" strokeWidth={2.2} />
        <Cut x1={82} y1={52} x2={158} y2={52} />
        <Caption>Front leaf only · fat border</Caption>
      </g>
    );
  }
  if (step === "frame-stand") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <Sheet x={70} y={36} w={88} h={100} />
        <PaperPoly points="158,70 196,128 158,128" fill="var(--color-face-right)" />
        <Caption>Three-side glue · easel back</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <Desk y={150} />
      <Sheet x={62} y={28} w={116} h={108} />
      <rect x="86" y="48" width="68" height="52" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <text x="120" y="78" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)" fontFamily="Figtree, sans-serif">
        3×5
      </text>
      <Caption>Hands off · count ten</Caption>
    </g>
  );
}

function Flower({ step }: { step: string }) {
  if (step === "flower-fan") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,28 188,88 120,148 52,88" />
        <Valley x1={120} y1={28} x2={120} y2={148} />
        <Valley x1={52} y1={88} x2={188} y2={88} />
        <FoldArrow d="M142 58 Q158 88 142 118" />
        <Caption>Square · fold a packet</Caption>
      </g>
    );
  }
  if (step === "flower-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="96,30 150,30 150,150 96,150" fill="var(--color-face-right)" />
        <path d="M150 48 C176 70 176 110 150 132" fill="none" stroke="var(--color-danger)" strokeWidth={2.4} />
        <Cut x1={150} y1={48} x2={150} y2={60} />
        <Caption>One cut · leave the hub</Caption>
      </g>
    );
  }
  if (step === "flower-open") {
    return (
      <g>
        <ViewChip label="TOP" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i * Math.PI) / 3 - Math.PI / 2;
          const x = 120 + Math.cos(a) * 48;
          const y = 86 + Math.sin(a) * 48;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="22"
              ry="14"
              transform={`rotate(${(i * 60)} ${x} ${y})`}
              fill="var(--color-toy-front)"
              stroke="var(--color-ink)"
              strokeWidth={1.6}
            />
          );
        })}
        <circle cx="120" cy="86" r="14" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Same cut on every petal</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <Desk y={150} />
      <ellipse cx="120" cy="58" rx="36" ry="16" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <ellipse cx="88" cy="78" rx="22" ry="14" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <ellipse cx="152" cy="78" rx="22" ry="14" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <rect x="114" y="86" width="12" height="56" rx="3" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <Caption>Rolled stem · stands ten</Caption>
    </g>
  );
}

function Grabber({ step }: { step: string }) {
  if (step === "grabber-arms") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={44} y={50} w={152} h={28} />
        <Sheet x={44} y={102} w={152} h={28} fill="var(--color-face-right)" />
        <Valley x1={44} y1={64} x2={196} y2={64} />
        <Caption>Two strips · fold as beams</Caption>
      </g>
    );
  }
  if (step === "grabber-hinge") {
    return (
      <g>
        <ViewChip label="TOP" />
        <rect x="40" y="70" width="150" height="16" rx="3" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.8} transform="rotate(-18 115 78)" />
        <rect x="40" y="94" width="150" height="16" rx="3" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.8} transform="rotate(18 115 102)" />
        <circle cx="92" cy="90" r="7" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Fastener is the fulcrum</Caption>
      </g>
    );
  }
  if (step === "grabber-grip") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <Desk y={148} />
        <rect x="48" y="88" width="110" height="14" rx="3" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} transform="rotate(-12 103 95)" />
        <rect x="48" y="118" width="110" height="14" rx="3" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.6} transform="rotate(12 103 125)" />
        <rect x="148" y="102" width="22" height="16" rx="3" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <Caption>Lip on the tips · lift three</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <rect x="28" y="118" width="12" height="28" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
      <Desk y={146} />
      <rect x="70" y="84" width="100" height="12" rx="3" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} transform="rotate(-8 120 90)" />
      <rect x="148" y="92" width="18" height="12" rx="2" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      <Caption>1 m carry · tips off faces</Caption>
    </g>
  );
}

function Whirligig({ step }: { step: string }) {
  if (step === "whirly-disk") {
    return (
      <g>
        <ViewChip label="TOP" />
        <circle cx="88" cy="90" r="44" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <circle cx="160" cy="90" r="44" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
        <FoldArrow d="M118 90 L132 90" />
        <Caption>Two disks · glue back to back</Caption>
      </g>
    );
  }
  if (step === "whirly-string") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <circle cx="120" cy="90" r="48" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <circle cx="108" cy="90" r="4" fill="var(--color-ink)" />
        <circle cx="132" cy="90" r="4" fill="var(--color-ink)" />
        <path d="M24 90 H108" stroke="var(--color-pine)" strokeWidth={2.2} />
        <path d="M132 90 H216" stroke="var(--color-pine)" strokeWidth={2.2} />
        <Caption>Two holes · loops for fingers</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <circle cx="120" cy="90" r="40" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M120 90 L148 70" stroke="var(--color-ink)" strokeWidth={1.4} />
      <path d="M36 90 H80" stroke="var(--color-pine)" strokeWidth={2.2} />
      <path d="M160 90 H204" stroke="var(--color-pine)" strokeWidth={2.2} />
      <path d="M88 42 A44 44 0 0 1 152 42" fill="none" stroke="var(--color-moss)" strokeWidth={1.8} strokeDasharray="5 4" />
      <Caption>Twirl · pull · count five</Caption>
    </g>
  );
}
