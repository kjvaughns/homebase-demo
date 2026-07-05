import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

// Ambient drifting green glows — cinematic depth on black. Deterministic.
export const BgFx: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame / 60;

  const x1 = 30 + 12 * Math.sin(t * 0.35);
  const y1 = 35 + 10 * Math.cos(t * 0.28);
  const x2 = 72 + 10 * Math.sin(t * 0.22 + 2);
  const y2 = 68 + 12 * Math.cos(t * 0.31 + 1);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(600px circle at ${x1}% ${y1}%, rgba(56,174,95,${0.06 * intensity}), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(700px circle at ${x2}% ${y2}%, rgba(52,211,153,${0.04 * intensity}), transparent 70%)`,
        }}
      />
      {/* Vignette for focus */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
