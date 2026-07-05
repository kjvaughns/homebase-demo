import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';

interface PunchWordProps {
  startFrame: number;
  duration?: number;
  text: string;
  color?: string;
  size?: number;
}

// Full-screen single word that SLAMS in and cuts out. Dramatic beat.
export const PunchWord: React.FC<PunchWordProps> = ({
  startFrame,
  duration = 40,
  text,
  color = C.white,
  size = 88,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;
  if (f < 0 || f >= duration) return null;

  const s = spring({ frame: f, fps, config: SPRING_HEAVY });
  const scale = interpolate(s, [0, 0.7, 1], [0.72, 1.04, 1]);
  const inOpacity = interpolate(f, [0, 5], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const outOpacity = interpolate(f, [duration - 8, duration - 1], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.bg,
        zIndex: 50,
      }}
    >
      <div
        style={{
          opacity: Math.min(inOpacity, outOpacity),
          transform: `scale(${scale})`,
          fontSize: size,
          fontWeight: 900,
          color,
          fontFamily: FONT,
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
