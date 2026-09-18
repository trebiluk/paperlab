import { cn } from "@/lib/utils";

/** Paper-cube shop teacher — isometric cube, antenna, tabs, two paper feet. */
export function Berty({
  size = 64,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 112"
      width={size}
      height={size * (112 / 96)}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="BertyBot, a paper-cube robot"
    >
      <defs>
        <pattern id="berty-grain" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="2" r="0.35" fill="#1c1915" opacity="0.08" />
          <circle cx="4" cy="4.5" r="0.28" fill="#1c1915" opacity="0.06" />
        </pattern>
        <filter id="berty-shadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="rgb(28 25 21)" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="48" cy="104" rx="28" ry="5" fill="var(--color-ink)" opacity="0.12" />
      <g filter="url(#berty-shadow)">
        <polygon points="48,2 60,16 48,16" fill="var(--color-pine)" />
        <polygon points="48,2 36,16 48,16" fill="var(--color-moss)" />
        <rect x="46.2" y="16" width="3.6" height="7" fill="var(--color-pine)" />
        <circle cx="48" cy="15" r="2.2" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="0.6" />
        <polygon points="48,23 86,44 48,65 10,44" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
        <polygon points="10,44 48,65 48,102 10,81" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
        <polygon points="48,65 86,44 86,81 48,102" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="1.15" strokeLinejoin="round" />
        <polygon points="48,23 86,44 48,65 10,44" fill="url(#berty-grain)" />
        <polygon points="10,44 48,65 48,102 10,81" fill="url(#berty-grain)" />
        {/* glue tab on right */}
        <polygon points="86,52 94,48 94,62 86,66" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth="0.9" />
        {/* eyes */}
        <rect x="26" y="46" width="10" height="10" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.85" />
        <rect x="40" y="46" width="10" height="10" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.85" />
        <rect x="29" y="49.5" width="4" height="4" fill="var(--color-ink)" />
        <rect x="43" y="49.5" width="4" height="4" fill="var(--color-ink)" />
        <rect x="30.2" y="50.4" width="1.4" height="1.4" fill="var(--color-surface-2)" />
        <rect x="44.2" y="50.4" width="1.4" height="1.4" fill="var(--color-surface-2)" />
        <path d="M28 59 H48" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
        {/* pocket + pencil */}
        <rect x="22" y="70" width="16" height="12" rx="1.2" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth="0.8" />
        <rect x="28" y="62" width="3.2" height="16" rx="0.6" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="0.6" />
        <polygon points="28,62 31.2,62 29.6,57" fill="var(--color-pine)" />
      </g>
      <rect x="20" y="98" width="16" height="10" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
      <rect x="60" y="98" width="16" height="10" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden>
      <polygon points="16,1.5 20.5,8 16,8" fill="var(--color-pine)" />
      <polygon points="16,1.5 11.5,8 16,8" fill="var(--color-moss)" />
      <rect x="15" y="8" width="2" height="2.2" fill="var(--color-pine)" />
      <polygon points="16,10 26,15.5 16,21 6,15.5" fill="var(--color-toy-top)" />
      <polygon points="6,15.5 16,21 16,28.5 6,23" fill="var(--color-toy-left)" />
      <polygon points="16,21 26,15.5 26,23 16,28.5" fill="var(--color-pine)" />
    </svg>
  );
}

/** Home hero: Berty on a shop desk with a dart, cube, and tape. */
export function ShopStillLife({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="BertyBot on a shop desk with a paper dart, cube, and tape"
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
      <rect width="280" height="220" fill="var(--color-bg-warm)" />
      <rect width="280" height="220" fill="url(#still-grid)" opacity="0.45" />
      <rect x="8" y="168" width="264" height="14" rx="2" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="16" y="182" width="10" height="22" fill="var(--color-toy-right)" />
      <rect x="254" y="182" width="10" height="22" fill="var(--color-toy-right)" />

      {/* dart */}
      <g filter="url(#still-shadow)" transform="translate(8 96) rotate(-12)">
        <polygon points="8,28 118,12 118,24 62,30 118,36 118,48 8,34" fill="var(--color-face-front)" stroke="var(--color-ink)" strokeWidth="1.4" />
        <polygon points="62,18 118,12 118,24 62,30" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.1" />
      </g>

      {/* cube */}
      <g filter="url(#still-shadow)" transform="translate(196 92)">
        <polygon points="36,4 68,22 36,40 4,22" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.3" />
        <polygon points="4,22 36,40 36,72 4,54" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth="1.3" />
        <polygon points="36,40 68,22 68,54 36,72" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="1.3" />
        <polygon points="36,4 68,22 36,40 4,22" fill="url(#still-grain)" />
      </g>

      {/* tape roll */}
      <g transform="translate(214 148)">
        <ellipse cx="22" cy="18" rx="22" ry="10" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="1.3" />
        <ellipse cx="22" cy="14" rx="10" ry="4.5" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="1" />
      </g>

      {/* Berty */}
      <g transform="translate(86 18)">
        <Berty size={118} />
      </g>
    </svg>
  );
}
