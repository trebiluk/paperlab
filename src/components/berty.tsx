import { cn } from "@/lib/utils";

/** Paper-cube shop teacher — isometric cube, antenna, two paper feet. */
export function Berty({
  size = 64,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 108"
      width={size}
      height={size * (108 / 96)}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="BertyBot, a paper-cube robot"
    >
      <polygon points="48,4 58,18 48,18" fill="var(--color-pine)" />
      <polygon points="48,4 38,18 48,18" fill="var(--color-moss)" />
      <rect x="46" y="18" width="4" height="6" fill="var(--color-pine)" />
      <polygon points="48,24 84,44 48,64 12,44" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="12,44 48,64 48,100 12,80" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="48,64 84,44 84,80 48,100" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="28" y="46" width="9" height="9" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.8" />
      <rect x="41" y="46" width="9" height="9" fill="var(--color-surface-2)" stroke="var(--color-ink)" strokeWidth="0.8" />
      <rect x="31" y="49" width="3" height="3" fill="var(--color-ink)" />
      <rect x="44" y="49" width="3" height="3" fill="var(--color-ink)" />
      <path d="M30 58 H48" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
      <rect x="22" y="96" width="14" height="10" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
      <rect x="60" y="96" width="14" height="10" rx="1.5" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth="1" />
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
