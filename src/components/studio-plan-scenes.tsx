import { Caption, FoldArrow, PaperPoly, PaperSheet, Valley, ViewChip } from "@/components/paper-gfx";

/** Diagrams for studio labs that have no step pictures of their own. */

function Sheet(props: { x: number; y: number; w: number; h: number }) {
  return <PaperSheet {...props} />;
}

export function StudioPlanScene(id: string) {
  if (!id.startsWith("studio-")) return null;
  return <Scene step={id} />;
}

function Scene({ step }: { step: string }) {
  if (step === "studio-cube-grid") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={48} y={28} w={144} h={124} />
        {[0, 1, 2, 3].map((i) => (
          <Valley key={`h${i}`} x1={48} y1={28 + i * 31} x2={192} y2={28 + i * 31} />
        ))}
        {[0, 1, 2].map((i) => (
          <Valley key={`v${i}`} x1={48 + i * 48} y1={59} x2={48 + i * 48} y2={121} />
        ))}
        <Caption>Six squares · a cross</Caption>
      </g>
    );
  }
  if (step === "studio-cube-lines") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={24} w={100} h={130} />
        <line x1={70} y1={24} x2={170} y2={24} stroke="var(--color-ink)" strokeWidth={3.2} />
        <Valley x1={120} y1={24} x2={120} y2={154} />
        <Caption>Thick = cut · dash = fold</Caption>
      </g>
    );
  }
  if (step === "studio-cube-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="96,28 144,28 144,56 176,56 176,104 144,104 144,152 96,152 96,104 64,104 64,56 96,56" />
        <Caption>Cut the thick outline</Caption>
      </g>
    );
  }
  if (step === "studio-cube-close") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="78,52 150,52 168,74 60,74" fill="var(--color-toy-top)" />
        <PaperPoly points="60,74 168,74 168,136 60,136" />
        <PaperPoly points="168,74 186,58 186,120 168,136" fill="var(--color-pine)" />
        <Caption>Glue tabs inside · close it</Caption>
      </g>
    );
  }
  if (step === "studio-balloon-pinch") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={60} y={30} w={120} h={120} />
        <Valley x1={120} y1={30} x2={120} y2={150} />
        <Valley x1={60} y1={90} x2={180} y2={90} />
        <FoldArrow d="M78 48 Q120 90 162 132" />
        <Caption>Pinch the middle</Caption>
      </g>
    );
  }
  if (step === "studio-balloon-puff") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="86,48 154,48 170,70 70,70" fill="var(--color-toy-top)" />
        <PaperPoly points="70,70 170,70 170,128 70,128" />
        <PaperPoly points="170,70 186,56 186,114 170,128" fill="var(--color-face-left)" />
        <Caption>Blow once · no glue</Caption>
      </g>
    );
  }
  if (step === "studio-folds-valley") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={28} w={100} h={120} />
        <Valley x1={70} y1={88} x2={170} y2={88} />
        <FoldArrow d="M120 60 Q120 100 120 118" />
        <Caption>Toward you · valley</Caption>
      </g>
    );
  }
  if (step === "studio-folds-mountain") {
    return (
      <g>
        <ViewChip label="SIDE" />
        <PaperPoly points="70,120 120,70 170,120" />
        <Caption>Away from you · mountain</Caption>
      </g>
    );
  }
  if (step === "studio-folds-book") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={78} y={28} w={84} h={120} />
        <Valley x1={120} y1={28} x2={120} y2={148} />
        <FoldArrow d="M150 70 Q132 90 150 112" />
        <Caption>Edge to edge · open it</Caption>
      </g>
    );
  }
  if (step === "studio-draw-cut") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={64} y={28} w={112} h={120} />
        <line x1={78} y1={70} x2={162} y2={70} stroke="var(--color-ink)" strokeWidth={3.4} />
        <Caption>Thick line · cut</Caption>
      </g>
    );
  }
  if (step === "studio-draw-fold") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={64} y={28} w={112} h={120} />
        <Valley x1={78} y1={90} x2={162} y2={90} />
        <Caption>Dashed line · fold</Caption>
      </g>
    );
  }
  if (step === "studio-draw-size") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={36} w={100} h={90} />
        <line x1={70} y1={140} x2={170} y2={140} stroke="var(--color-pine)" strokeWidth={2} />
        <Caption>Arrow · write the size</Caption>
      </g>
    );
  }
  if (step === "studio-nets-cross") {
    return (
      <g>
        <ViewChip label="DEV" />
        <PaperPoly points="96,24 144,24 144,56 176,56 176,104 144,104 144,152 96,152 96,104 64,104 64,56 96,56" />
        <Caption>Count the faces</Caption>
      </g>
    );
  }
  if (step === "studio-nets-overlap") {
    return (
      <g>
        <ViewChip label="DEV" />
        <Sheet x={70} y={40} w={70} h={70} />
        <PaperPoly points="110,70 170,70 170,130 110,130" fill="var(--color-tape)" />
        <Caption>Two squares · one spot · fail</Caption>
      </g>
    );
  }
  if (step === "studio-nets-pass") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="78,52 150,52 168,74 60,74" fill="var(--color-toy-top)" />
        <PaperPoly points="60,74 168,74 168,132 60,132" />
        <PaperPoly points="168,74 186,58 186,116 168,132" fill="var(--color-pine)" />
        <Caption>Each face has a spot · pass</Caption>
      </g>
    );
  }
  if (step === "studio-solids-flat") {
    return (
      <g>
        <ViewChip label="ISO" />
        <PaperPoly points="80,50 156,50 172,72 64,72" fill="var(--color-toy-top)" />
        <PaperPoly points="64,72 172,72 172,134 64,134" />
        <Caption>Flat faces · a polyhedron</Caption>
      </g>
    );
  }
  if (step === "studio-solids-wrap") {
    return (
      <g>
        <ViewChip label="ISO" />
        <ellipse cx="120" cy="96" rx="54" ry="40" fill="var(--color-toy-front)" stroke="var(--color-ink)" strokeWidth={2} />
        <Caption>A wrap · not a polyhedron</Caption>
      </g>
    );
  }
  return (
    <g>
      <ViewChip label="DEV" />
      <Sheet x={70} y={28} w={100} h={120} />
      <Caption>One sheet</Caption>
    </g>
  );
}
