import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C } from '../constants';

interface PulseRingProps {
  startFrame: number;
  size?: number;
}

export const PulseRing: React.FC<PulseRingProps> = ({ startFrame, size = 400 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {[0, 1, 2].map((i) => {
        const f = frame - startFrame - i * 12;
        if (f < 0 || f > 60) return null;
        const scale = interpolate(f, [0, 60], [1, 2.5], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });
        const opacity = interpolate(f, [0, 60], [1, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1.5px solid ${C.green}`,
              transform: `scale(${scale})`,
              opacity: opacity * 0.5,
            }}
          />
        );
      })}
    </div>
  );
};
