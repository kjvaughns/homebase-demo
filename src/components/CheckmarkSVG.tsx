import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C } from '../constants';

interface CheckmarkSVGProps {
  startFrame: number;
  size?: number;
}

const CIRCLE_LEN = 2 * Math.PI * 28;
const CHECK_LEN = 40;

export const CheckmarkSVG: React.FC<CheckmarkSVGProps> = ({ startFrame, size = 64 }) => {
  const frame = useCurrentFrame();
  const f = frame - startFrame;

  const circleOffset = interpolate(f, [0, 24], [CIRCLE_LEN, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const checkOffset = interpolate(f, [14, 32], [CHECK_LEN, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block' }}>
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke={C.green}
        strokeWidth="3"
        strokeDasharray={CIRCLE_LEN}
        strokeDashoffset={circleOffset}
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
      />
      <path
        d="M 20 33 L 28 41 L 44 24"
        fill="none"
        stroke={C.green}
        strokeWidth="4"
        strokeDasharray={CHECK_LEN}
        strokeDashoffset={checkOffset}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
