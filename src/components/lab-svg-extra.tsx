import {
  Caption,
  CrewPerson,
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

export function ExtraScene(id: string) {
  if (id.startsWith("boat")) return <Boat step={id} />;
  if (id.startsWith("catapult")) return <Catapult step={id} />;
  if (id.startsWith("chute")) return <Chute step={id} />;
  if (id.startsWith("balance")) return <Balance step={id} />;
  if (id.startsWith("chain")) return <Chain step={id} />;
  if (id.startsWith("envelope")) return <Envelope step={id} />;
  if (id.startsWith("crane")) return <Crane step={id} />;
  if (id.startsWith("flake")) return <Flake step={id} />;
  if (id.startsWith("ramp")) return <Ramp step={id} />;
  if (id.startsWith("hat")) return <Hat step={id} />;
  if (id.startsWith("mobius")) return <Mobius step={id} />;
  if (id.startsWith("cup")) return <Cup step={id} />;
  if (id.startsWith("beam")) return <Beam step={id} />;
  return null;
}

function Boat({ step }: { step: string }) {
  if (step === "boat-fold") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="40,110 120,38 200,110 180,150 60,150" />
        <Valley x1={120} y1={38} x2={120} y2={150} />
        <FoldArrow d="M70 108 Q92 86 112 108" />
        <Caption>Corners in · pull open</Caption>
      </g>
    );
  }
  if (step === "boat-load") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <ellipse cx="120" cy="136" rx="92" ry="16" fill="var(--color-toy-left)" opacity={0.45} />
        <PaperPoly points="54,118 120,84 186,118 170,140 70,140" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={94 + (i % 2) * 18} y={100 + Math.floor(i / 2) * 10} width="14" height="8" rx="1" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={0.8} />
        ))}
        <Caption>Clips in the middle</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <ellipse cx="120" cy="138" rx="94" ry="16" fill="var(--color-toy-left)" opacity={0.4} />
      <PaperPoly points="52,116 120,80 188,116 172,140 68,140" />
      <Caption>Hands off · count ten</Caption>
    </g>
  );
}

function Catapult({ step }: { step: string }) {
  if (step === "catapult-safe") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <rect x="36" y="118" width="12" height="28" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Desk y={144} />
        <rect x="92" y="96" width="28" height="18" rx="3" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="120" y="62" textAnchor="middle" fontSize="13" fontWeight={700} fill="var(--color-danger)" fontFamily="Figtree, sans-serif">
          Floor tape only
        </text>
        <Caption>Never at people</Caption>
      </g>
    );
  }
  if (step === "catapult-base") {
    return (
      <g>
        <ViewChip label="ISO" />
        <Sheet x={40} y={108} w={160} h={28} fill="var(--color-face-right)" />
        <rect x="108" y="90" width="88" height="12" rx="5" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Stiff base · pencil fulcrum</Caption>
      </g>
    );
  }
  if (step === "catapult-test") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <Sheet x={36} y={118} w={90} h={22} fill="var(--color-face-right)" />
        <rect x="70" y="108" width="70" height="8" rx="4" fill="var(--color-muted)" />
        <rect x="118" y="70" width="14" height="52" rx="3" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} transform="rotate(-28 125 96)" />
        <rect x="168" y="78" width="18" height="12" rx="2" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <path d="M148 82 Q176 48 204 68" fill="none" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#lab-arrow)" />
        <Caption>Press · let go · mark</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <Sheet x={36} y={118} w={90} h={22} fill="var(--color-face-right)" />
      <rect x="70" y="108" width="70" height="8" rx="4" fill="var(--color-muted)" />
      <rect x="108" y="48" width="16" height="72" rx="3" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <path d="M108 56 H136 V72 H108" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <Caption>Stiff arm · eraser pocket</Caption>
    </g>
  );
}

function Chute({ step }: { step: string }) {
  if (step === "chute-canopy") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={55} y={22} w={130} h={130} />
        <Valley x1={55} y1={22} x2={185} y2={152} />
        <Cut x1={55} y1={22} x2={185} y2={22} />
        <Caption>Cut a square canopy</Caption>
      </g>
    );
  }
  if (step === "chute-lines") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <Sheet x={55} y={18} w={130} h={70} />
        <line x1="55" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="185" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="90" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="150" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <circle cx="120" cy="148" r="8" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Equal lines · one clip</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <ellipse cx="120" cy="46" rx="72" ry="16" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M48 46 L120 140 L192 46" fill="none" stroke="var(--color-ink)" strokeWidth={1.6} />
      <circle cx="120" cy="148" r="8" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
      <path d="M120 8 L120 30" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#lab-arrow)" />
      <Caption>Canopy up · drop · count</Caption>
    </g>
  );
}

function Balance({ step }: { step: string }) {
  if (step === "balance-beam") {
    return (
      <g>
        <ViewChip label="TOP" />
        <Sheet x={28} y={78} w={184} h={22} fill="var(--color-face-right)" />
        <Valley x1={120} y1={68} x2={120} y2={110} />
        <Caption>Mark the exact middle</Caption>
      </g>
    );
  }
  if (step === "balance-fulcrum") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <rect x="28" y="86" width="184" height="16" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="108" y="100" width="24" height="12" rx="4" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Empty beam sits level</Caption>
      </g>
    );
  }
  if (step === "balance-pans") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <rect x="28" y="86" width="184" height="14" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="108" y="98" width="24" height="10" rx="4" fill="var(--color-muted)" />
        <rect x="30" y="68" width="36" height="24" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x="174" y="68" width="36" height="24" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Matching pans · matching distance</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <rect x="28" y="90" width="184" height="14" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x="108" y="102" width="24" height="10" rx="4" fill="var(--color-muted)" />
      <rect x="32" y="60" width="40" height="34" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={178} y={68 + i * 10} width="26" height="8" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={0.8} />
      ))}
      <Caption>Unknown vs. clips</Caption>
    </g>
  );
}

function Chain({ step }: { step: string }) {
  if (step === "chain-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={20} w={100} h={140} />
        {[0, 1, 2, 3].map((i) => (
          <Cut key={i} x1={70} y1={48 + i * 28} x2={170} y2={48 + i * 28} />
        ))}
        <Caption>Even strips</Caption>
      </g>
    );
  }
  if (step === "chain-loop") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <ellipse cx="120" cy="90" rx="50" ry="38" fill="none" stroke="var(--color-ink)" strokeWidth={9} />
        <rect x="152" y="70" width="28" height="18" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Overlap · press the joint</Caption>
      </g>
    );
  }
  if (step === "chain-load") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <ellipse cx="70" cy="48" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
        <ellipse cx="108" cy="70" rx="22" ry="16" fill="none" stroke="var(--color-moss)" strokeWidth={6} />
        <ellipse cx="146" cy="92" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
        <rect x="128" y="118" width="44" height="28" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Hang · count ten</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <ellipse cx="58" cy="70" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
      <ellipse cx="98" cy="90" rx="22" ry="16" fill="none" stroke="var(--color-moss)" strokeWidth={6} />
      <ellipse cx="140" cy="70" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
      <ellipse cx="180" cy="90" rx="22" ry="16" fill="none" stroke="var(--color-toy-left)" strokeWidth={6} />
      <Caption>Through the last ring · close</Caption>
    </g>
  );
}

function Envelope({ step }: { step: string }) {
  if (step === "envelope-note") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={58} y={48} w={124} h={80} fill="var(--color-surface-2)" />
        <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight={700} fill="var(--color-ink)" fontFamily="Figtree, sans-serif">
          a note
        </text>
        <Caption>The product sets the size</Caption>
      </g>
    );
  }
  if (step === "envelope-wrap") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={40} y={28} w={160} h={120} />
        <rect x="70" y="58" width="100" height="52" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <FoldArrow d="M40 88 H68" />
        <FoldArrow d="M200 88 H172" />
        <Caption>Sides over · bottom up</Caption>
      </g>
    );
  }
  if (step === "envelope-shake") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="50,70 190,70 190,130 50,130" />
        <PaperPoly points="50,70 120,100 190,70" fill="var(--color-toy-top)" />
        <path d="M88 44 L88 26 M88 44 L76 32 M88 44 L100 32" stroke="var(--color-pine)" strokeWidth={2} fill="none" />
        <Caption>Ten shakes · pass or fail</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <PaperPoly points="50,78 190,78 190,138 50,138" />
      <PaperPoly points="50,78 120,44 190,78" fill="var(--color-toy-top)" />
      <Valley x1={120} y1={44} x2={120} y2={100} />
      <Caption>Tuck the flap · no glue</Caption>
    </g>
  );
}

function Crane({ step }: { step: string }) {
  if (step === "crane-base") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,24 188,96 120,164 52,96" />
        <PaperPoly points="120,24 120,96 52,96" fill="var(--color-toy-top)" />
        <FoldArrow d="M160 70 Q140 88 128 96" />
        <Caption>Collapse to a square base</Caption>
      </g>
    );
  }
  if (step === "crane-bird") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <PaperPoly points="48,108 120,68 192,108 120,128" fill="var(--color-toy-top)" />
        <path d="M120 68 L152 32 L162 46" fill="none" stroke="var(--color-ink)" strokeWidth={2.2} />
        <path d="M120 68 L86 38" stroke="var(--color-ink)" strokeWidth={2.2} />
        <Caption>Neck · tail · tiny head</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <Desk y={150} />
      <PaperPoly points="40,112 120,76 200,112 120,132" fill="var(--color-toy-top)" />
      <path d="M120 76 L158 36 L168 50" fill="none" stroke="var(--color-ink)" strokeWidth={2.2} />
      <path d="M120 76 L82 42" stroke="var(--color-ink)" strokeWidth={2.2} />
      <Caption>Wings out · it should sit</Caption>
    </g>
  );
}

function Flake({ step }: { step: string }) {
  if (step === "flake-fold") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,22 202,152 38,152" />
        <Valley x1={120} y1={22} x2={120} y2={152} />
        <Caption>Fold a pizza wedge</Caption>
      </g>
    );
  }
  if (step === "flake-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="120,20 178,150 62,150" />
        <path d="M96 80 L112 92 L96 110" fill="none" stroke="var(--color-danger)" strokeWidth={2.2} />
        <path d="M148 70 L132 88 L148 108" fill="none" stroke="var(--color-danger)" strokeWidth={2.2} />
        <Caption>Cut edges · leave a bridge</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <polygon
          key={i}
          points="120,90 120,26 146,50"
          fill="var(--color-toy-top)"
          stroke="var(--color-ink)"
          strokeWidth={1.4}
          transform={`rotate(${i * 60} 120 90)`}
        />
      ))}
      <Caption>Open · count the copies</Caption>
    </g>
  );
}

function Ramp({ step }: { step: string }) {
  if (step === "ramp-fold") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={50} y={30} w={140} h={110} />
        {[0, 1, 2].map((i) => (
          <Valley key={i} x1={50} y1={58 + i * 24} x2={190} y2={58 + i * 24} />
        ))}
        <Caption>Fold a stiff board</Caption>
      </g>
    );
  }
  if (step === "ramp-set" || step === "ramp-steep") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <rect x="36" y="108" width="40" height="36" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <PaperPoly points="76,108 210,144 210,152 36,144 36,136" />
        <rect x="88" y="96" width="22" height="14" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Same book height</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="SIDE" />
      <rect x="36" y="108" width="40" height="36" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <PaperPoly points="76,108 220,148 220,156 36,144 36,136" fill="var(--color-toy-top)" />
      <rect x="150" y="122" width="22" height="14" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1} />
      <Caption>Longer run · same rise</Caption>
    </g>
  );
}

function Hat({ step }: { step: string }) {
  if (step === "hat-user") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <circle cx="120" cy="74" r="36" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <circle cx="120" cy="74" r="36" fill="url(#lab-grain)" />
        <path d="M70 96 Q120 152 170 96" fill="none" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="6 4" />
        <Caption>Who is it for? Measure</Caption>
      </g>
    );
  }
  if (step === "hat-walk") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <Desk y={148} />
        <PaperPoly points="50,70 190,70 168,118 72,118" />
        <PaperPoly points="88,70 120,34 152,70" fill="var(--color-toy-top)" />
        <Caption>Ten steps · hands off</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <PaperPoly points="48,78 192,78 172,128 68,128" />
      <PaperPoly points="84,78 120,30 156,78" fill="var(--color-toy-top)" />
      <Caption>Corners in · brim up</Caption>
    </g>
  );
}

function Mobius({ step }: { step: string }) {
  if (step === "mobius-loop") {
    return (
      <g>
        <ViewChip label="ISO" />
        <ellipse cx="120" cy="88" rx="72" ry="36" fill="none" stroke="var(--color-ink)" strokeWidth={11} />
        <rect x="178" y="74" width="22" height="16" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
        <Caption>Control · no twist</Caption>
      </g>
    );
  }
  if (step === "mobius-twist") {
    return (
      <g>
        <ViewChip label="ISO" />
        <path
          d="M50 88 C50 40 190 40 190 88 C190 136 50 136 50 88"
          fill="none"
          stroke="var(--color-toy-left)"
          strokeWidth={13}
        />
        <path d="M112 50 L130 74" stroke="var(--color-ink)" strokeWidth={3.2} />
        <Caption>One half-twist · then tape</Caption>
      </g>
    );
  }
  if (step === "mobius-predict") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={50} y={36} w={140} h={100} fill="var(--color-surface-2)" />
        <text x="120" y="90" textAnchor="middle" fontSize="13" fontWeight={700} fill="var(--color-ink)" fontFamily="Figtree, sans-serif">
          I think I will get ___
        </text>
        <Caption>Write it · then cut</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="TOP" />
      <ellipse cx="96" cy="90" rx="40" ry="28" fill="none" stroke="var(--color-ink)" strokeWidth={8} />
      <ellipse cx="150" cy="90" rx="40" ry="28" fill="none" stroke="var(--color-moss)" strokeWidth={8} />
      <Cut x1={70} y1={90} x2={176} y2={90} />
      <Caption>Cut the middle · record</Caption>
    </g>
  );
}

function Cup({ step }: { step: string }) {
  if (step === "cup-water") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <PaperPoly points="78,48 162,48 150,140 90,140" />
        <polygon points="84,70 156,70 148,128 96,128" fill="var(--color-toy-left)" opacity={0.5} />
        <rect x="48" y="148" width="144" height="10" fill="var(--color-line)" />
        <Caption>Two spoons · count thirty</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="DEV" />
      <PaperPoly points="120,28 196,104 120,160 44,104" />
      <PaperPoly points="70,92 120,64 170,92 120,112" fill="var(--color-toy-top)" />
      <Caption>Triangle · corners in · open</Caption>
    </g>
  );
}

function Brick({ x, y, w = 34, h = 20 }: { x: number; y: number; w?: number; h?: number }) {
  const hole = h * 0.2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2.5} fill="#b56860" stroke="var(--color-ink)" strokeWidth={1.5} />
      <rect x={x} y={y} width={w} height={4} fill="#c97b7b" opacity={0.7} />
      {[0.22, 0.5, 0.78].map((t) => (
        <ellipse
          key={t}
          cx={x + w * t}
          cy={y + h * 0.55}
          rx={hole * 0.85}
          ry={hole}
          fill="#ead9ce"
          stroke="var(--color-ink)"
          strokeWidth={0.9}
        />
      ))}
    </g>
  );
}

/** Shop hanger: pine stick seated on the plywood pads, jute, hanging circle. */
function Hanger({
  stickY = 32,
  circleCy = 118,
  bricks = 0,
}: {
  stickY?: number;
  circleCy?: number;
  bricks?: number;
}) {
  return (
    <g>
      <rect x={24} y={stickY} width={192} height={11} rx={2} fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <rect x={24} y={stickY} width={192} height={3} fill="var(--color-face-front)" opacity={0.45} />
      <ellipse cx="120" cy={stickY + 6} rx="6" ry="5" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
      <line x1="120" y1={stickY + 10} x2="86" y2={circleCy - 9} stroke="var(--color-ink-soft)" strokeWidth={1.35} />
      <line x1="120" y1={stickY + 10} x2="120" y2={circleCy - 11} stroke="var(--color-ink-soft)" strokeWidth={1.35} />
      <line x1="120" y1={stickY + 10} x2="154" y2={circleCy - 9} stroke="var(--color-ink-soft)" strokeWidth={1.35} />
      <ellipse cx="120" cy={circleCy + 3} rx="40" ry="6" fill="var(--color-ink)" opacity="0.1" />
      <ellipse cx="120" cy={circleCy} rx="40" ry="12" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.7} />
      <ellipse cx="120" cy={circleCy - 3} rx="34" ry="8" fill="var(--color-face-front)" opacity={0.55} />
      {bricks > 0
        ? Array.from({ length: bricks }, (_, i) => <Brick key={i} x={103} y={circleCy - 14 - i * 18} />)
        : null}
    </g>
  );
}

function CanyonCart() {
  return (
    <g>
      {/* wheels */}
      <ellipse cx="40" cy="160" rx="7" ry="4" fill="var(--color-ink)" />
      <ellipse cx="200" cy="160" rx="7" ry="4" fill="var(--color-ink)" />
      {/* legs */}
      <rect x="34" y="52" width="8" height="108" fill="var(--color-face-bottom)" stroke="var(--color-ink)" strokeWidth={1} />
      <rect x="198" y="52" width="8" height="108" fill="var(--color-face-bottom)" stroke="var(--color-ink)" strokeWidth={1} />
      {/* second shelf */}
      <path
        d="M28 128 H212 V140 H28 Z"
        fill="var(--color-muted)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      {/* U top shelf */}
      <path
        d="M22 28 H218 V56 H164 V78 H76 V56 H22 Z"
        fill="var(--color-faint)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* plywood pads + bolts */}
      <rect x={24} y={32} width={46} height={20} fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      <rect x={170} y={32} width={46} height={20} fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      <circle cx="47" cy="42" r="3.2" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={0.8} />
      <circle cx="193" cy="42" r="3.2" fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={0.8} />
    </g>
  );
}

function Beam({ step }: { step: string }) {
  if (step === "beam-crew") {
    return (
      <g>
        <CrewPerson cx={70} />
        <CrewPerson cx={120} leader />
        <CrewPerson cx={170} />
        <Caption>Crew of 2 or 3 · name a Leader</Caption>
      </g>
    );
  }
  if (step === "beam-spans") {
    return (
      <g>
        <ViewChip label="TOP" />
        <CanyonCart />
        <line x1="76" y1="88" x2="164" y2="88" stroke="var(--color-pine)" strokeWidth={2.6} />
        <line x1="76" y1="84" x2="76" y2="92" stroke="var(--color-pine)" strokeWidth={2} />
        <line x1="164" y1="84" x2="164" y2="92" stroke="var(--color-pine)" strokeWidth={2} />
        <text x="120" y="82" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
          short
        </text>
        <line x1="24" y1="18" x2="216" y2="18" stroke="var(--color-danger)" strokeWidth={2.4} />
        <line x1="24" y1="14" x2="24" y2="22" stroke="var(--color-danger)" strokeWidth={2} />
        <line x1="216" y1="14" x2="216" y2="22" stroke="var(--color-danger)" strokeWidth={2} />
        <text x="120" y="14" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-danger)" fontFamily="Figtree, sans-serif">
          long
        </text>
        <Hanger stickY={32} circleCy={108} />
        <Caption>Pick a span · circle must hang free</Caption>
      </g>
    );
  }
  if (step === "beam-kit") {
    return (
      <g>
        <ViewChip label="TOP" />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <PaperSheet key={`${r}-${c}`} x={28 + c * 38} y={26 + r * 28} w={32} h={24} />
          )),
        )}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={132}
            y={28 + i * 12}
            width={74}
            height={8}
            rx={2}
            fill="var(--color-toy-left)"
            stroke="var(--color-ink)"
            strokeWidth={1}
          />
        ))}
        <rect x={28} y={122} width={90} height={22} rx={11} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="73" y="137" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)" fontFamily="Figtree, sans-serif">
          36″
        </text>
        <Caption>6 sheets · 6 sticks · one yard of tape</Caption>
      </g>
    );
  }
  if (step === "beam-ideas") {
    return (
      <g>
        <ViewChip label="ISO" />
        <rect x={28} y={70} width={70} height={50} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={28} y={58} width={70} height={12} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={28} y={120} width={70} height={12} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="63" y="100" textAnchor="middle" fontSize="12" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
          I
        </text>
        <polygon points="140,128 158,46 176,128 194,46 212,128" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1="140" y1="128" x2="212" y2="128" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>I-beam or triangle · anything that spans</Caption>
      </g>
    );
  }
  if (step === "beam-build") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <rect x={36} y={72} width={168} height={28} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={36} y={60} width={168} height={12} rx={2} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={36} y={100} width={168} height={12} rx={2} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <path d="M94 48 H146 V64 H94 Z" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <line x1="70" y1="72" x2="70" y2="100" stroke="var(--color-tape)" strokeWidth={5} />
        <line x1="170" y1="72" x2="170" y2="100" stroke="var(--color-tape)" strokeWidth={5} />
        <Caption>Leave a seat on top for the hanger</Caption>
      </g>
    );
  }
  if (step === "beam-test") {
    return (
      <g>
        <ViewChip label="FRONT" />
        <CanyonCart />
        <rect x={28} y={30} width={184} height={14} rx={2} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Hanger stickY={30} circleCy={100} bricks={1} />
        <text x="120" y="152" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine)" fontFamily="Figtree, sans-serif">
          air — not the shelf
        </text>
        <Caption>Hang free · stay flat · 1 brick · count 7</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="FRONT" />
      <CanyonCart />
      <rect x={28} y={30} width={184} height={14} rx={2} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Hanger stickY={30} circleCy={96} bricks={3} />
      <Caption>Contest: add bricks · still free and flat</Caption>
    </g>
  );
}
