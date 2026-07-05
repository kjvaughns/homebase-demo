import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TapDotProps {
  startFrame: number;
  x: number; // position within parent (absolute)
  y: number;
}

// Simulated fingertip: dot appears, presses (shrinks), releases with a ripple.
export const TapDot: React.FC<TapDotProps> = ({ startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const f = frame - startFrame;
  if (f < 0 || f > 40) return null;

  // Dot: fade in (0-6), press down scale (6-14), release + fade (14-26)
  const dotOpacity = interpolate(f, [0, 5, 16, 26], [0, 0.85, 0.85, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const dotScale = interpolate(f, [0, 6, 12, 20], [1.3, 1, 0.75, 1.1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Ripple on release
  const rippleF = f - 12;
  const rippleScale = interpolate(rippleF, [0, 22], [0.5, 2.6], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const rippleOpacity = interpolate(rippleF, [0, 22], [0.5, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 200, pointerEvents: 'none' }}>
      {rippleF >= 0 && (
        <div
          style={{
            position: 'absolute',
            left: -28,
            top: -28,
            width: 56,
            height: 56,
            borderRadius: 28,
            border: '2px solid rgba(255,255,255,0.9)',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: 22,
          background: 'rgba(255,255,255,0.55)',
          boxShadow: '0 0 24px rgba(255,255,255,0.35)',
          transform: `scale(${dotScale})`,
          opacity: dotOpacity,
        }}
      />
    </div>
  );
};

// Helper: press-scale for the tapped element (matches app's pressScale 0.97)
export const usePressScale = (frame: number, tapFrame: number): number => {
  const f = frame - tapFrame;
  if (f < 6 || f > 22) return 1;
  return interpolate(f, [6, 12, 22], [1, 0.96, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
};
