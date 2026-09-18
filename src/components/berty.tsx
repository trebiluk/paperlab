import { cn } from "@/lib/utils";

/**
 * Iso box: top vertex (ox, oy), half-width s, height h.
 * Right step (+s, +s/2), left step (−s, +s/2), down (0, h).
 */
function IsoBox({
  ox,
  oy,
  s,
  h,
  top = "var(--color-toy-top)",
  left = "var(--color-toy-left)",
  right = "var(--color-pine)",
  grain,
}: {
  ox: number;
  oy: number;
  s: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
  grain?: string;
}) {
  const topPts = `${ox},${oy} ${ox + s},${oy + s / 2} ${ox},${oy + s} ${ox - s},${oy + s / 2}`;
  const leftPts = `${ox - s},${oy + s / 2} ${ox},${oy + s} ${ox},${oy + s + h} ${ox - s},${oy + s / 2 + h}`;
  const rightPts = `${ox},${oy + s} ${ox + s},${oy + s / 2} ${ox + s},${oy + s / 2 + h} ${ox},${oy + s + h}`;
  return (
    <g>
      <polygon points={topPts} fill={top} stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points={leftPts} fill={left} stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points={rightPts} fill={right} stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      {grain ? (
        <>
          <polygon points={topPts} fill={grain} />
          <polygon points={leftPts} fill={grain} />
        </>
      ) : null}
    </g>
  );
}

function BertyBody({ grain }: { grain?: string }) {
  return (
    <g>
      {/* shadow */}
      <ellipse cx="60" cy="132" rx="28" ry="5.5" fill="var(--color-ink)" opacity="0.14" />

      {/* left arm (down, holding a pencil) */}
      <g>
        <path
          d="M33 80 L16 102 L24 106 L40 84 Z"
          fill="var(--color-toy-left)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <ellipse cx="18" cy="108" rx="8" ry="7" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth="1.1" />
        <rect x="5" y="96" width="5" height="26" rx="1.2" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="0.85" />
        <polygon points="5,96 10,96 7.5,88" fill="var(--color-pine)" />
      </g>

      {/* right arm (waving) */}
      <g>
        <path
          d="M84 74 L112 46 L120 54 L92 80 Z"
          fill="var(--color-pine)"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <ellipse cx="118" cy="46" rx="10" ry="9" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth="1.15" />
        <path
          d="M124 36 L128 28 M130 44 L138 40 M128 54 L134 60"
          stroke="var(--color-ink)"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </g>

      {/* body */}
      <IsoBox ox={60} oy={62} s={26} h={30} grain={grain} />

      {/* chest panel */}
      <rect x="42" y="90" width="16" height="14" rx="2" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.9" />
      <circle cx="47" cy="97" r="2.1" fill="var(--color-pine)" />
      <circle cx="53" cy="97" r="2.1" fill="var(--color-ok)" />

      {/* neck */}
      <rect x="54" y="58" width="12" height="7" rx="1" fill="var(--color-moss)" stroke="var(--color-ink)" strokeWidth="0.9" />

      {/* head */}
      <IsoBox
        ox={60}
        oy={22}
        s={18}
        h={18}
        top="var(--color-face-top)"
        left="var(--color-face-front)"
        right="var(--color-moss)"
        grain={grain}
      />

      {/* antenna */}
      <rect x="58.4" y="8" width="3.2" height="14" rx="0.6" fill="var(--color-pine)" />
      <polygon points="60,1 70,12 50,12" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="0.8" strokeLinejoin="round" />
      <polygon points="60,1 50,12 60,12" fill="var(--color-moss)" />
      <circle cx="60" cy="13" r="2.4" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="0.7" />

      {/* face on the front-left head face */}
      <ellipse cx="47.5" cy="41.5" rx="5.2" ry="5.6" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="1" />
      <ellipse cx="58.5" cy="43.5" rx="5.2" ry="5.6" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="1" />
      <circle cx="48.8" cy="42.4" r="2.2" fill="var(--color-ink)" />
      <circle cx="59.8" cy="44.4" r="2.2" fill="var(--color-ink)" />
      <circle cx="50" cy="41.4" r="0.75" fill="var(--color-surface-2)" />
      <circle cx="61" cy="43.4" r="0.75" fill="var(--color-surface-2)" />
      <path
        d="M47 52 Q53.5 57.5 60.5 53"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* feet */}
      <rect x="32" y="124" width="18" height="8" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
      <rect x="70" y="124" width="18" height="8" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
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
      <filter id={`${uid}-shadow`} x="-25%" y="-15%" width="150%" height="150%">
        <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="rgb(28 25 21)" floodOpacity="0.2" />
      </filter>
    </defs>
  );
}

/** Paper-cube shop teacher — head, body, waving arm, pencil. */
export function Berty({
  size = 64,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="BertyBot, a paper-cube robot"
    >
      <GrainDefs uid="berty" />
      <g filter="url(#berty-shadow)" transform="translate(8 0)">
        <BertyBody grain="url(#berty-grain)" />
      </g>
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden>
      <polygon points="16,2 21,8 16,8" fill="var(--color-pine)" />
      <polygon points="16,2 11,8 16,8" fill="var(--color-moss)" />
      <rect x="15.2" y="8" width="1.6" height="2.2" fill="var(--color-pine)" />
      {/* tiny head */}
      <polygon points="16,10.5 23,14.5 16,18.5 9,14.5" fill="var(--color-face-top)" />
      <polygon points="9,14.5 16,18.5 16,24 9,20" fill="var(--color-face-front)" />
      <polygon points="16,18.5 23,14.5 23,20 16,24" fill="var(--color-moss)" />
      <circle cx="13.2" cy="18.2" r="1.15" fill="var(--color-surface-2)" />
      <circle cx="16.6" cy="18.8" r="1.15" fill="var(--color-surface-2)" />
      <circle cx="13.4" cy="18.4" r="0.45" fill="var(--color-ink)" />
      <circle cx="16.8" cy="19" r="0.45" fill="var(--color-ink)" />
      {/* body hint */}
      <polygon points="16,24 22,27 16,30 10,27" fill="var(--color-toy-top)" />
      <polygon points="10,27 16,30 16,31.5 10,28.5" fill="var(--color-toy-left)" />
    </svg>
  );
}

/** Home hero: Berty standing on a shop desk. Props stay on the desk — not on the robot. */
export function ShopStillLife({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 240"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="BertyBot, a paper robot, standing on a shop desk"
    >
      <defs>
        <pattern id="still-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="var(--color-line)" strokeWidth="0.6" />
        </pattern>
        <pattern id="still-grain" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="2" r="0.4" fill="var(--color-ink)" opacity="0.07" />
          <circle cx="5" cy="5" r="0.3" fill="var(--color-ink)" opacity="0.05" />
        </pattern>
        <filter id="still-shadow" x="-15%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="rgb(28 25 21)" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="280" height="240" fill="var(--color-bg-warm)" />
      <rect width="280" height="240" fill="url(#still-grid)" opacity="0.45" />

      {/* desk */}
      <rect x="16" y="196" width="248" height="12" rx="2" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="24" y="208" width="10" height="20" fill="var(--color-toy-right)" />
      <rect x="246" y="208" width="10" height="20" fill="var(--color-toy-right)" />

      {/* dart parked on the desk, left — clearly a plane, not an arm */}
      <g filter="url(#still-shadow)" transform="translate(18 168) rotate(-8)">
        <polygon
          points="4,18 78,8 78,16 40,20 78,24 78,32 4,22"
          fill="var(--color-face-front)"
          stroke="var(--color-ink)"
          strokeWidth="1.3"
        />
        <polygon points="40,12 78,8 78,16 40,20" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.1" />
      </g>

      {/* cube on the right */}
      <g filter="url(#still-shadow)" transform="translate(198 148)">
        <polygon points="28,4 54,18 28,32 2,18" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <polygon points="2,18 28,32 28,56 2,42" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <polygon points="28,32 54,18 54,42 28,56" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <polygon points="28,4 54,18 28,32 2,18" fill="url(#still-grain)" />
      </g>

      {/* tape roll on the desk edge */}
      <g transform="translate(198 188)">
        <ellipse cx="18" cy="12" rx="16" ry="7" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="1.2" />
        <ellipse cx="18" cy="10" rx="7" ry="3.2" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.9" />
      </g>

      {/* Berty — the robot, standing on the desk */}
      <g filter="url(#still-shadow)" transform="translate(78 18) scale(1.22)">
        <BertyBody grain="url(#still-grain)" />
      </g>
    </svg>
  );
}
