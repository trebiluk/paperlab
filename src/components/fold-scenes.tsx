import { Cut, Desk, FoldArrow, Mountain, PaperPoly, PaperSheet, Valley } from "@/components/paper-gfx";

/** The 16 step pictures LabSvg did not draw. No words. */
export function FoldScene(id: string) {
  if (id === "scrap-flat") {
    return (
      <g>
        <PaperSheet x={58} y={28} w={124} h={124} />
      </g>
    );
  }
  if (id === "valley-toward") {
    return (
      <g>
        <PaperPoly points="48,120 120,48 192,120 168,150 72,150" />
        <Valley x1={120} y1={48} x2={120} y2={150} />
        <FoldArrow d="M78 118 Q100 88 118 118" />
      </g>
    );
  }
  if (id === "mountain-away") {
    return (
      <g>
        <PaperPoly points="70,36 170,36 190,140 50,140" />
        <Mountain x1={120} y1={36} x2={120} y2={140} />
        <FoldArrow d="M150 70 Q128 96 150 122" />
      </g>
    );
  }
  if (id === "fold-unfold-tuck") {
    return (
      <g>
        <PaperSheet x={60} y={30} w={120} h={120} />
        <Valley x1={120} y1={30} x2={120} y2={150} />
        <FoldArrow d="M86 90 H150" />
        <FoldArrow d="M154 90 H92" />
      </g>
    );
  }
  if (id === "dashed-valley-match") {
    return (
      <g>
        <PaperSheet x={62} y={28} w={116} h={124} />
        <Valley x1={120} y1={28} x2={120} y2={152} />
        <Cut x1={62} y1={28} x2={178} y2={28} />
      </g>
    );
  }
  if (id === "diag-a") {
    return (
      <g>
        <PaperSheet x={55} y={24} w={130} h={130} fill="var(--color-toy-front)" />
        <Valley x1={55} y1={24} x2={185} y2={154} />
        <FoldArrow d="M70 130 Q100 90 140 70" />
      </g>
    );
  }
  if (id === "diag-b") {
    return (
      <g>
        <PaperSheet x={55} y={24} w={130} h={130} fill="var(--color-toy-front)" />
        <Valley x1={55} y1={154} x2={185} y2={24} />
        <Valley x1={55} y1={24} x2={185} y2={154} />
      </g>
    );
  }
  if (id === "petal") {
    return (
      <g>
        <PaperPoly points="120,28 168,90 120,152 72,90" fill="var(--color-toy-front)" />
        <Valley x1={96} y1={118} x2={120} y2={78} />
        <Valley x1={144} y1={118} x2={120} y2={78} />
        <FoldArrow d="M120 130 Q120 100 120 70" />
      </g>
    );
  }
  if (id === "petal-back") {
    return (
      <g>
        <PaperPoly points="120,26 176,88 120,154 64,88" fill="var(--color-toy-left)" />
        <Valley x1={92} y1={120} x2={120} y2={72} />
        <Valley x1={148} y1={120} x2={120} y2={72} />
        <FoldArrow d="M150 40 Q170 20 150 16" />
      </g>
    );
  }
  if (id === "narrow") {
    return (
      <g>
        <PaperPoly points="120,22 150,88 120,158 90,88" fill="var(--color-toy-front)" />
        <Mountain x1={120} y1={22} x2={120} y2={158} />
        <Valley x1={104} y1={120} x2={120} y2={88} />
        <Valley x1={136} y1={120} x2={120} y2={88} />
      </g>
    );
  }
  if (id === "neck") {
    return (
      <g>
        <PaperPoly points="70,120 120,78 170,120 120,138" fill="var(--color-toy-front)" />
        <path d="M120 78 L148 36" fill="none" stroke="#1c1915" strokeWidth="2.2" />
        <Mountain x1={132} y1={60} x2={148} y2={36} />
        <FoldArrow d="M138 70 Q150 48 140 36" />
      </g>
    );
  }
  if (id === "tail") {
    return (
      <g>
        <PaperPoly points="78,118 120,80 162,118 120,136" fill="var(--color-toy-front)" />
        <path d="M120 80 L86 40" fill="none" stroke="#1c1915" strokeWidth="2.2" />
        <path d="M120 80 L156 46" fill="none" stroke="#1c1915" strokeWidth="2.2" />
        <Mountain x1={100} y1={64} x2={86} y2={40} />
      </g>
    );
  }
  if (id === "head") {
    return (
      <g>
        <PaperPoly points="80,120 120,82 160,120 120,136" fill="var(--color-toy-front)" />
        <path d="M120 82 L152 40 L166 52" fill="none" stroke="#1c1915" strokeWidth="2.4" />
        <Mountain x1={148} y1={48} x2={166} y2={52} />
      </g>
    );
  }
  if (id === "wings") {
    return (
      <g>
        <Desk y={146} />
        <PaperPoly points="36,108 120,72 204,108 120,128" fill="var(--color-toy-top)" />
        <path d="M120 72 L158 34 L170 48" fill="none" stroke="#1c1915" strokeWidth="2.2" />
        <path d="M120 72 L78 42" stroke="#1c1915" strokeWidth="2.2" />
      </g>
    );
  }
  if (id === "balloon-up") {
    return (
      <g>
        <PaperPoly points="120,24 176,88 120,150 64,88" fill="var(--color-face-front)" />
        <Valley x1={92} y1={110} x2={120} y2={48} />
        <Valley x1={148} y1={110} x2={120} y2={48} />
        <FoldArrow d="M84 120 Q100 70 118 48" />
        <FoldArrow d="M156 120 Q140 70 122 48" />
      </g>
    );
  }
  if (id === "balloon-pockets") {
    return (
      <g>
        <PaperPoly points="120,30 168,90 120,148 72,90" />
        <Valley x1={96} y1={90} x2={120} y2={90} />
        <Valley x1={144} y1={90} x2={120} y2={90} />
        <FoldArrow d="M78 90 H112" />
        <FoldArrow d="M162 90 H128" />
      </g>
    );
  }
  return null;
}
