import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SPRING_GENTLE } from '../constants';

interface ClosePanelProps {
  startFrame: number;
  width?: number;
  tiltX?: number;
  tiltY?: number;
  float?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

// Oversized UI fragment floating on black: spring entrance, soft shadow,
// slight 3D tilt, subtle idle bob.
export const ClosePanel: React.FC<ClosePanelProps> = ({
  startFrame,
  width = 700,
  tiltX = 3,
  tiltY = -3,
  float = true,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const s = spring({ frame: f, fps, config: SPRING_GENTLE });
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  const y = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const bob = float ? 4 * Math.sin((frame * 2 * Math.PI) / 240) : 0;

  return (
    <div style={{ perspective: 1400, ...style }}>
      <div
        style={{
          width,
          opacity,
          transform: `translateY(${y + bob}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          boxShadow: '0 60px 140px rgba(0,0,0,0.85), 0 20px 60px rgba(0,0,0,0.6)',
          borderRadius: 32,
        }}
      >
        {children}
      </div>
    </div>
  );
};
