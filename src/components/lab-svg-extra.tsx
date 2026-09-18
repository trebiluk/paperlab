function Sheet({
  x,
  y,
  w,
  h,
  fill = "var(--color-face-front)",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={fill}
      stroke="var(--color-ink)"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  );
}

function Caption({ children, y = 170 }: { children: string; y?: number }) {
  return (
    <text
      x="120"
      y={y}
      textAnchor="middle"
      fontSize="12"
      fill="var(--color-ink-soft)"
      fontFamily="Figtree, sans-serif"
      fontWeight={600}
    >
      {children}
    </text>
  );
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
        <polygon
          points="40,110 120,40 200,110 180,150 60,150"
          fill="var(--color-face-front)"
          stroke="var(--color-ink)"
          strokeWidth={2}
        />
        <line x1="120" y1="40" x2="120" y2="150" stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="7 5" />
        <Caption>Corners in · pull open</Caption>
      </g>
    );
  }
  if (step === "boat-load") {
    return (
      <g>
        <ellipse cx="120" cy="130" rx="88" ry="18" fill="var(--color-toy-left)" opacity={0.55} />
        <polygon points="58,118 120,88 182,118 168,138 72,138" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={96 + (i % 2) * 18} y={100 + Math.floor(i / 2) * 10} width="14" height="8" rx="1" fill="var(--color-muted)" />
        ))}
        <Caption>Clips in the middle</Caption>
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="120" cy="132" rx="90" ry="18" fill="var(--color-toy-left)" opacity={0.5} />
      <polygon points="55,116 120,84 185,116 170,138 70,138" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <Caption>Hands off · count ten</Caption>
    </g>
  );
}

function Catapult({ step }: { step: string }) {
  if (step === "catapult-safe") {
    return (
      <g>
        <rect x="36" y="118" width="12" height="28" fill="var(--color-tape)" />
        <line x1="42" y1="146" x2="210" y2="146" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="92" y="96" width="28" height="18" rx="3" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="120" y="64" textAnchor="middle" fontSize="13" fontWeight={700} fill="var(--color-danger)">
          Floor tape only
        </text>
        <Caption>Never at people</Caption>
      </g>
    );
  }
  if (step === "catapult-base") {
    return (
      <g>
        <Sheet x={40} y={108} w={160} h={28} fill="var(--color-face-right)" />
        <rect x="108" y="92" width="88" height="10" rx="5" fill="var(--color-muted)" />
        <Caption>Stiff base · pencil fulcrum</Caption>
      </g>
    );
  }
  if (step === "catapult-test") {
    return (
      <g>
        <Sheet x={36} y={118} w={90} h={22} fill="var(--color-face-right)" />
        <rect x="70" y="108" width="70" height="8" rx="4" fill="var(--color-muted)" />
        <rect x="118" y="70" width="14" height="52" rx="3" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} transform="rotate(-28 125 96)" />
        <rect x="168" y="78" width="18" height="12" rx="2" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <path d="M148 82 Q176 50 200 70" fill="none" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" />
        <Caption>Press · let go · mark</Caption>
      </g>
    );
  }
  return (
    <g>
      <Sheet x={36} y={118} w={90} h={22} fill="var(--color-face-right)" />
      <rect x="70" y="108" width="70" height="8" rx="4" fill="var(--color-muted)" />
      <rect x="108" y="48" width="16" height="72" rx="3" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <path d="M108 56 H132 V70 H108" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <Caption>Stiff arm · eraser pocket</Caption>
    </g>
  );
}

function Chute({ step }: { step: string }) {
  if (step === "chute-canopy") {
    return (
      <g>
        <Sheet x={55} y={22} w={130} h={130} />
        <line x1="55" y1="22" x2="185" y2="152" stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="7 5" />
        <Caption>Cut a square canopy</Caption>
      </g>
    );
  }
  if (step === "chute-lines") {
    return (
      <g>
        <Sheet x={55} y={18} w={130} h={70} />
        <line x1="55" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="185" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="90" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <line x1="150" y1="88" x2="120" y2="140" stroke="var(--color-ink)" strokeWidth={1.6} />
        <circle cx="120" cy="148" r="7" fill="var(--color-muted)" />
        <Caption>Equal lines · one clip</Caption>
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="120" cy="48" rx="70" ry="16" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M50 48 L120 140 L190 48" fill="none" stroke="var(--color-ink)" strokeWidth={1.6} />
      <circle cx="120" cy="148" r="7" fill="var(--color-muted)" />
      <path d="M120 8 L120 32" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="5 4" />
      <Caption>Canopy up · drop · count</Caption>
    </g>
  );
}

function Balance({ step }: { step: string }) {
  if (step === "balance-beam") {
    return (
      <g>
        <Sheet x={28} y={78} w={184} h={22} fill="var(--color-face-right)" />
        <line x1="120" y1="70" x2="120" y2="108" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="6 4" />
        <Caption>Mark the exact middle</Caption>
      </g>
    );
  }
  if (step === "balance-fulcrum") {
    return (
      <g>
        <rect x="28" y="86" width="184" height="16" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="108" y="98" width="24" height="10" rx="4" fill="var(--color-muted)" />
        <Caption>Empty beam sits level</Caption>
      </g>
    );
  }
  if (step === "balance-pans") {
    return (
      <g>
        <rect x="28" y="86" width="184" height="14" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="108" y="96" width="24" height="10" rx="4" fill="var(--color-muted)" />
        <rect x="30" y="70" width="36" height="22" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x="174" y="70" width="36" height="22" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Matching pans · matching distance</Caption>
      </g>
    );
  }
  return (
    <g>
      <rect x="28" y="90" width="184" height="14" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x="108" y="100" width="24" height="10" rx="4" fill="var(--color-muted)" />
      <rect x="32" y="62" width="40" height="32" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={178} y={70 + i * 10} width="26" height="8" fill="var(--color-muted)" />
      ))}
      <Caption>Unknown vs. clips</Caption>
    </g>
  );
}

function Chain({ step }: { step: string }) {
  if (step === "chain-cut") {
    return (
      <g>
        <Sheet x={70} y={20} w={100} h={140} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="70" y1={48 + i * 28} x2="170" y2={48 + i * 28} stroke="var(--color-danger)" strokeWidth={2} />
        ))}
        <Caption>Even strips</Caption>
      </g>
    );
  }
  if (step === "chain-loop") {
    return (
      <g>
        <ellipse cx="120" cy="90" rx="48" ry="36" fill="none" stroke="var(--color-ink)" strokeWidth={8} />
        <rect x="150" y="70" width="28" height="18" fill="var(--color-tape)" />
        <Caption>Overlap · press the joint</Caption>
      </g>
    );
  }
  if (step === "chain-load") {
    return (
      <g>
        <ellipse cx="70" cy="50" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
        <ellipse cx="108" cy="70" rx="22" ry="16" fill="none" stroke="var(--color-moss)" strokeWidth={6} />
        <ellipse cx="146" cy="92" rx="22" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth={6} />
        <rect x="128" y="118" width="44" height="28" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Hang · count ten</Caption>
      </g>
    );
  }
  return (
    <g>
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
        <Sheet x={58} y={48} w={124} h={80} fill="var(--color-surface-2)" />
        <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight={700} fill="var(--color-ink)">
          a note
        </text>
        <Caption>The product sets the size</Caption>
      </g>
    );
  }
  if (step === "envelope-wrap") {
    return (
      <g>
        <Sheet x={40} y={28} w={160} h={120} />
        <rect x="70" y="58" width="100" height="52" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <path d="M40 88 H70" stroke="var(--color-pine)" strokeWidth={2} />
        <path d="M170 88 H200" stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Sides over · bottom up</Caption>
      </g>
    );
  }
  if (step === "envelope-shake") {
    return (
      <g>
        <polygon points="50,70 190,70 190,130 50,130" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M50 70 L120 100 L190 70" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M88 44 L88 28 M88 44 L78 34 M88 44 L98 34" stroke="var(--color-pine)" strokeWidth={2} fill="none" />
        <Caption>Ten shakes · pass or fail</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="50,78 190,78 190,138 50,138" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M50 78 L120 48 L190 78" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <line x1="120" y1="48" x2="120" y2="100" stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="6 4" />
      <Caption>Tuck the flap · no glue</Caption>
    </g>
  );
}

function Crane({ step }: { step: string }) {
  if (step === "crane-base") {
    return (
      <g>
        <polygon points="120,28 188,96 120,164 52,96" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="120,28 120,96 52,96" fill="var(--color-toy-top)" opacity={0.85} stroke="var(--color-ink)" strokeWidth={1.6} />
        <Caption>Collapse to a square base</Caption>
      </g>
    );
  }
  if (step === "crane-bird") {
    return (
      <g>
        <polygon points="48,108 120,70 192,108 120,128" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M120 70 L150 36 L158 48" fill="none" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M120 70 L88 40" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Neck · tail · tiny head</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="40,112 120,78 200,112 120,132" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <path d="M120 78 L156 40 L164 52" fill="none" stroke="var(--color-ink)" strokeWidth={2.2} />
      <path d="M120 78 L84 44" stroke="var(--color-ink)" strokeWidth={2.2} />
      <ellipse cx="120" cy="148" rx="36" ry="6" fill="var(--color-line)" />
      <Caption>Wings out · it should sit</Caption>
    </g>
  );
}

function Flake({ step }: { step: string }) {
  if (step === "flake-fold") {
    return (
      <g>
        <polygon points="120,24 200,152 40,152" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1="120" y1="24" x2="120" y2="152" stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="6 4" />
        <Caption>Fold a pizza wedge</Caption>
      </g>
    );
  }
  if (step === "flake-cut") {
    return (
      <g>
        <polygon points="120,22 176,150 64,150" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M96 80 L112 92 L96 110" fill="none" stroke="var(--color-danger)" strokeWidth={2.2} />
        <path d="M148 70 L132 88 L148 108" fill="none" stroke="var(--color-danger)" strokeWidth={2.2} />
        <Caption>Cut edges · leave a bridge</Caption>
      </g>
    );
  }
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <polygon
          key={i}
          points="120,90 120,28 142,48"
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
        <Sheet x={50} y={30} w={140} h={110} />
        {[0, 1, 2].map((i) => (
          <line key={i} x1="50" y1={58 + i * 24} x2="190" y2={58 + i * 24} stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="6 4" />
        ))}
        <Caption>Fold a stiff board</Caption>
      </g>
    );
  }
  if (step === "ramp-set" || step === "ramp-steep") {
    return (
      <g>
        <rect x="36" y="108" width="40" height="36" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <polygon points="76,108 210,144 210,152 36,144 36,136" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x="88" y="96" width="22" height="14" fill="var(--color-muted)" />
        <Caption>Same book height</Caption>
      </g>
    );
  }
  return (
    <g>
      <rect x="36" y="108" width="40" height="36" fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <polygon points="76,108 220,148 220,156 36,144 36,136" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <rect x="150" y="122" width="22" height="14" fill="var(--color-muted)" />
      <Caption>Longer run · same rise</Caption>
    </g>
  );
}

function Hat({ step }: { step: string }) {
  if (step === "hat-user") {
    return (
      <g>
        <circle cx="120" cy="78" r="36" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <path d="M70 96 Q120 150 170 96" fill="none" stroke="var(--color-pine)" strokeWidth={2} strokeDasharray="6 4" />
        <Caption>Who is it for? Measure</Caption>
      </g>
    );
  }
  if (step === "hat-walk") {
    return (
      <g>
        <polygon points="50,70 190,70 168,118 72,118" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="88,70 120,36 152,70" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1="40" y1="148" x2="200" y2="148" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>Ten steps · hands off</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="48,78 192,78 172,128 68,128" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="84,78 120,32 156,78" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={2} />
      <Caption>Corners in · brim up</Caption>
    </g>
  );
}

function Mobius({ step }: { step: string }) {
  if (step === "mobius-loop") {
    return (
      <g>
        <ellipse cx="120" cy="88" rx="70" ry="36" fill="none" stroke="var(--color-ink)" strokeWidth={10} />
        <rect x="178" y="74" width="22" height="16" fill="var(--color-tape)" />
        <Caption>Control · no twist</Caption>
      </g>
    );
  }
  if (step === "mobius-twist") {
    return (
      <g>
        <path
          d="M50 88 C50 40 190 40 190 88 C190 136 50 136 50 88"
          fill="none"
          stroke="var(--color-toy-left)"
          strokeWidth={12}
        />
        <path d="M112 52 L128 72" stroke="var(--color-ink)" strokeWidth={3} />
        <Caption>One half-twist · then tape</Caption>
      </g>
    );
  }
  if (step === "mobius-predict") {
    return (
      <g>
        <Sheet x={50} y={36} w={140} h={100} fill="var(--color-surface-2)" />
        <text x="120" y="90" textAnchor="middle" fontSize="13" fontWeight={700} fill="var(--color-ink)">
          I think I will get ___
        </text>
        <Caption>Write it · then cut</Caption>
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="96" cy="90" rx="40" ry="28" fill="none" stroke="var(--color-ink)" strokeWidth={8} />
      <ellipse cx="150" cy="90" rx="40" ry="28" fill="none" stroke="var(--color-moss)" strokeWidth={8} />
      <line x1="70" y1="90" x2="176" y2="90" stroke="var(--color-danger)" strokeWidth={2} strokeDasharray="6 4" />
      <Caption>Cut the middle · record</Caption>
    </g>
  );
}

function Cup({ step }: { step: string }) {
  if (step === "cup-water") {
    return (
      <g>
        <polygon points="78,48 162,48 150,140 90,140" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <polygon points="84,70 156,70 148,128 96,128" fill="var(--color-toy-left)" opacity={0.55} />
        <rect x="48" y="148" width="144" height="10" fill="var(--color-line)" />
        <Caption>Two spoons · count thirty</Caption>
      </g>
    );
  }
  return (
    <g>
      <polygon points="120,28 196,104 120,160 44,104" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
      <polygon points="70,92 120,64 170,92 120,112" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Caption>Triangle · corners in · open</Caption>
    </g>
  );
}

function Brick({ x, y, w = 36, h = 22 }: { x: number; y: number; w?: number; h?: number }) {
  const hole = h * 0.22;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill="#c97b7b" stroke="var(--color-ink)" strokeWidth={1.6} />
      {[0.22, 0.5, 0.78].map((t) => (
        <circle key={t} cx={x + w * t} cy={y + h * 0.5} r={hole} fill="#f4e7dc" stroke="var(--color-ink)" strokeWidth={1} />
      ))}
    </g>
  );
}

/** Shop hanger: pine stick, three strings, round picture circle. */
function Hanger({
  stickY = 58,
  circleCy = 118,
  brick = false,
  bricks = 0,
}: {
  stickY?: number;
  circleCy?: number;
  brick?: boolean;
  bricks?: number;
}) {
  const n = brick ? Math.max(1, bricks) : bricks;
  return (
    <g>
      <rect x={78} y={stickY} width={84} height={10} rx={2} fill="var(--color-toy-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <ellipse cx="120" cy={stickY + 5} rx="5" ry="4" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1} />
      <line x1="120" y1={stickY + 9} x2="88" y2={circleCy - 8} stroke="var(--color-ink-soft)" strokeWidth={1.3} />
      <line x1="120" y1={stickY + 9} x2="120" y2={circleCy - 10} stroke="var(--color-ink-soft)" strokeWidth={1.3} />
      <line x1="120" y1={stickY + 9} x2="152" y2={circleCy - 8} stroke="var(--color-ink-soft)" strokeWidth={1.3} />
      <ellipse cx="120" cy={circleCy} rx="38" ry="11" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.6} />
      {n > 0
        ? Array.from({ length: n }, (_, i) => <Brick key={i} x={102} y={circleCy - 12 - i * 20} />)
        : null}
    </g>
  );
}

function CartTop() {
  return (
    <g>
      {/* U-shaped top shelf */}
      <path
        d="M18 28 H222 V58 H168 V78 H72 V58 H18 Z"
        fill="var(--color-muted)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <rect x={22} y={32} width={48} height={22} fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      <rect x={170} y={32} width={48} height={22} fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      {/* second shelf */}
      <rect x={28} y={148} width={184} height={10} fill="var(--color-muted)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <line x1="36" y1="58" x2="36" y2="148" stroke="var(--color-ink-soft)" strokeWidth={2} />
      <line x1="204" y1="58" x2="204" y2="148" stroke="var(--color-ink-soft)" strokeWidth={2} />
    </g>
  );
}

function Beam({ step }: { step: string }) {
  if (step === "beam-crew") {
    return (
      <g>
        {[70, 120, 170].map((cx, i) => (
          <g key={cx}>
            <circle cx={cx} cy={70} r={16} fill={i === 1 ? "var(--color-pine)" : "var(--color-toy-top)"} stroke="var(--color-ink)" strokeWidth={2} />
            <rect x={cx - 18} y={90} width={36} height={40} rx={12} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
          </g>
        ))}
        <text x="120" y="56" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine-fg)">
          L
        </text>
        <Caption>Crew of 2 or 3 · name a Leader</Caption>
      </g>
    );
  }
  if (step === "beam-spans") {
    return (
      <g>
        <CartTop />
        {/* short span ticks */}
        <line x1="86" y1="68" x2="154" y2="68" stroke="var(--color-pine)" strokeWidth={2.4} />
        <line x1="86" y1="64" x2="86" y2="72" stroke="var(--color-pine)" strokeWidth={2} />
        <line x1="154" y1="64" x2="154" y2="72" stroke="var(--color-pine)" strokeWidth={2} />
        <text x="120" y="92" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine)">
          short
        </text>
        {/* long span */}
        <line x1="28" y1="20" x2="212" y2="20" stroke="var(--color-danger)" strokeWidth={2.4} />
        <line x1="28" y1="16" x2="28" y2="24" stroke="var(--color-danger)" strokeWidth={2} />
        <line x1="212" y1="16" x2="212" y2="24" stroke="var(--color-danger)" strokeWidth={2} />
        <text x="120" y="16" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-danger)">
          long
        </text>
        <Hanger stickY={48} circleCy={118} />
        <Caption>Pick a span · circle must hang free</Caption>
      </g>
    );
  }
  if (step === "beam-kit") {
    return (
      <g>
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={28 + c * 38}
              y={28 + r * 28}
              width={32}
              height={24}
              fill="var(--color-face-front)"
              stroke="var(--color-ink)"
              strokeWidth={1.5}
            />
          )),
        )}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={130}
            y={30 + i * 12}
            width={72}
            height={7}
            rx={2}
            fill="var(--color-toy-left)"
            stroke="var(--color-ink)"
            strokeWidth={1}
          />
        ))}
        <rect x={28} y={122} width={90} height={22} rx={11} fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="73" y="137" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-ink)">
          36″
        </text>
        <Caption>6 sheets · 6 sticks · one yard of tape</Caption>
      </g>
    );
  }
  if (step === "beam-ideas") {
    return (
      <g>
        <rect x={28} y={70} width={70} height={50} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={28} y={58} width={70} height={12} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={28} y={120} width={70} height={12} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <text x="63" y="100" textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-pine)">
          I
        </text>
        <polygon points="140,128 158,48 176,128 194,48 212,128" fill="none" stroke="var(--color-ink)" strokeWidth={2} />
        <line x1="140" y1="128" x2="212" y2="128" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>I-beam or triangle · anything that spans</Caption>
      </g>
    );
  }
  if (step === "beam-build") {
    return (
      <g>
        <rect x={36} y={72} width={168} height={28} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={36} y={60} width={168} height={12} rx={2} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <rect x={36} y={100} width={168} height={12} rx={2} fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth={1.6} />
        {/* saddle for the hanger */}
        <path d="M96 52 H144 V64 H96 Z" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth={1.4} />
        <line x1="70" y1="72" x2="70" y2="100" stroke="var(--color-tape)" strokeWidth={4} />
        <line x1="170" y1="72" x2="170" y2="100" stroke="var(--color-tape)" strokeWidth={4} />
        <Caption>Leave a seat on top for the hanger</Caption>
      </g>
    );
  }
  if (step === "beam-test") {
    return (
      <g>
        <CartTop />
        <rect x={70} y={46} width={100} height={14} rx={2} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
        <Hanger stickY={34} circleCy={108} brick />
        <text x="120" y="142" textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-pine)">
          air — not the shelf
        </text>
        <Caption>Hang free · stay flat · 1 brick · count 7</Caption>
      </g>
    );
  }
  return (
    <g>
      <CartTop />
      <rect x={70} y={46} width={100} height={14} rx={2} fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth={1.6} />
      <Hanger stickY={34} circleCy={104} bricks={3} />
      <Caption>Contest: add bricks · still free and flat</Caption>
    </g>
  );
}
