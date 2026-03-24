"use client";

import Plasma from "@/components/ui/Plasma";

export function PlasmaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07050f_0%,#090714_100%)]" />

      <div className="absolute inset-0">
        <Plasma color="#33188b" speed={0.6} direction="pingpong" scale={1.1} opacity={0.88} mouseInteractive={false} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:32px_32px] opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(98,69,255,0.25),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(97,71,255,0.18),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,3,10,0.15)_0%,rgba(4,3,10,0.72)_70%,rgba(4,3,10,0.96)_100%)]" />
    </div>
  );
}
