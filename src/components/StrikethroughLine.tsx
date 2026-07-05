import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C } from '../constants';

interface StrikethroughLineProps {
  startFrame: number;
  width: number;
}

export const StrikethroughLine: React.FC<StrikethroughLineProps> = ({ startFrame, width }) => {
  const frame = useCurrentFrame();
  const f = frame - startFrame;

  const offset = interpolate(f, [0, 20], [width, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  if (f < 0) return null;

  return (
    <svg
      width={width}
      height={4}
      style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}
    >
      <line
        x1="0"
        y1="2"
        x2={width}
        y2="2"
        stroke={C.red}
        strokeWidth="2"
        strokeDasharray={width}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
