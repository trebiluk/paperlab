import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type FaceId = "front" | "back" | "left" | "right" | "top" | "bottom";

const FACES: Record<FaceId, { label: string; className: string }> = {
  front: { label: "Front", className: "bg-toy-front" },
  left: { label: "Left", className: "bg-toy-left" },
  right: { label: "Right", className: "bg-toy-right" },
  top: { label: "Top", className: "bg-toy-top" },
  bottom: { label: "Bottom", className: "bg-toy-bottom" },
  back: { label: "Back", className: "bg-toy-back" },
};

function Face({ id, showLabel, size }: { id: FaceId; showLabel: boolean; size: number }) {
  const meta = FACES[id];
  return (
    <div
      className={cn(
        "absolute top-0 left-0 flex items-center justify-center border border-ink/20 font-medium tracking-wide text-ink-soft",
        meta.className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.12),
        boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.38), inset 0 -1px 0 rgb(28 25 21 / 0.08)",
      }}
    >
      {showLabel ? meta.label : null}
    </div>
  );
}

export function SolidCube({
  size = 148,
  spinning = true,
  className,
}: {
  size?: number;
  spinning?: boolean;
  className?: string;
}) {
  const half = size / 2;
  const faceStyle = {
    width: size,
    height: size,
    boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -1px 0 rgb(28 25 21 / 0.1)",
  };
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size, perspective: size * 4 }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute left-1/2 rounded-[100%] bg-ink/20 blur-md"
        style={{
          width: size * 0.72,
          height: size * 0.16,
          bottom: -size * 0.04,
          transform: "translateX(-50%)",
        }}
      />
      <div
        className={cn("absolute inset-0", spinning && "cube-spin")}
        style={{
          transformStyle: "preserve-3d",
          transform: spinning ? undefined : "rotateX(-22deg) rotateY(32deg)",
        }}
      >
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-front"
          style={{ ...faceStyle, transform: `translateZ(${half}px)` }}
        />
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-back"
          style={{
            ...faceStyle,
            transform: `rotateY(180deg) translateZ(${half}px)`,
          }}
        />
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-right"
          style={{
            ...faceStyle,
            transform: `rotateY(90deg) translateZ(${half}px)`,
          }}
        />
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-left"
          style={{
            ...faceStyle,
            transform: `rotateY(-90deg) translateZ(${half}px)`,
          }}
        />
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-top"
          style={{
            ...faceStyle,
            transform: `rotateX(90deg) translateZ(${half}px)`,
          }}
        />
        <div
          className="absolute top-0 left-0 border border-ink/20 bg-toy-bottom"
          style={{
            ...faceStyle,
            transform: `rotateX(-90deg) translateZ(${half}px)`,
          }}
        />
      </div>
    </div>
  );
}

function Hinge({
  origin,
  transform,
  children,
}: {
  origin: string;
  transform: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        width: "100%",
        height: "100%",
        transformOrigin: origin,
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

export function FoldingCube({
  size = 72,
  unfold = 0,
  labels = true,
  className,
}: {
  size?: number;
  unfold?: number;
  labels?: boolean;
  className?: string;
}) {
  const fold = (1 - unfold) * 90;
  const s = size;
  const boxW = s * 3.6;
  const boxH = s * 4.6;
  const face = (id: FaceId) => <Face id={id} showLabel={labels} size={s} />;

  return (
    <div
      className={cn("relative mx-auto preserve-3d", className)}
      style={{ width: boxW, height: boxH, perspective: s * 12 }}
    >
      <div
        className="absolute"
        style={{
          width: s,
          height: s,
          left: (boxW - s) / 2,
          top: boxH / 2 - s * 0.85,
          transformStyle: "preserve-3d",
          transform: `rotateX(${-22 + unfold * 22}deg) rotateY(${30 - unfold * 30}deg)`,
        }}
      >
        {face("front")}

        <Hinge origin="left center" transform={`rotateY(${-fold}deg)`}>
          <div className="absolute" style={{ width: s, height: s, left: -s, top: 0 }}>
            {face("left")}
          </div>
        </Hinge>

        <Hinge origin="right center" transform={`rotateY(${fold}deg)`}>
          <div className="absolute" style={{ width: s, height: s, left: s, top: 0 }}>
            {face("right")}
          </div>
        </Hinge>

        <Hinge origin="center top" transform={`rotateX(${fold}deg)`}>
          <div className="absolute" style={{ width: s, height: s, left: 0, top: -s }}>
            {face("top")}
          </div>
        </Hinge>

        <Hinge origin="center bottom" transform={`rotateX(${-fold}deg)`}>
          <div
            className="absolute"
            style={{
              width: s,
              height: s,
              left: 0,
              top: s,
              transformStyle: "preserve-3d",
            }}
          >
            {face("bottom")}
            <Hinge origin="center bottom" transform={`rotateX(${-fold}deg)`}>
              <div className="absolute" style={{ width: s, height: s, left: 0, top: s }}>
                {face("back")}
              </div>
            </Hinge>
          </div>
        </Hinge>
      </div>
    </div>
  );
}

export function CubeStage({
  size = 68,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId();
  const [unfold, setUnfold] = useState(0);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="graph-paper rounded-xl px-2 py-4">
        <FoldingCube size={size} unfold={unfold} />
      </div>
      <label className="flex flex-col gap-2 text-xs font-medium tracking-wide text-muted">
        <span className="flex justify-between">
          <span>Folded cube</span>
          <span>Flat net</span>
        </span>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(unfold * 100)}
          onChange={(e) => setUnfold(Number(e.target.value) / 100)}
          className="h-11 w-full accent-pine"
          aria-label="Unfold the cube into a net"
          suppressHydrationWarning
        />
      </label>
    </div>
  );
}
