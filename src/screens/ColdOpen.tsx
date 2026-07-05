import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dollarS = spring({ frame: frame - 20, fps, config: SPRING });
  const dollarScale = interpolate(dollarS, [0, 1], [0.85, 1]);
  const dollarOpacity = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const labelOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const subOpacity = interpolate(frame, [40, 58], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sub2Opacity = interpolate(frame, [48, 66], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const fadeOut = interpolate(frame, [FRAMES.s2 - 20, FRAMES.s2], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          opacity: labelOpacity,
          fontSize: 10,
          color: '#333',
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          marginBottom: 24,
        }}
      >
        EVERY HOME SERVICE PROVIDER
      </div>

      <div
        style={{
          opacity: dollarOpacity,
          transform: `scale(${dollarScale})`,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily: 'sans-serif',
          lineHeight: 1,
          marginBottom: 28,
        }}
      >
        $72,000
      </div>

      <div
        style={{
          opacity: subOpacity,
          fontSize: 14,
          color: COLORS.muted,
          fontFamily: 'sans-serif',
          marginBottom: 6,
        }}
      >
        lost every year to missed follow-ups,
      </div>

      <div
        style={{
          opacity: sub2Opacity,
          fontSize: 14,
          color: COLORS.muted,
          fontFamily: 'sans-serif',
        }}
      >
        manual invoicing, and chasing payments.
      </div>
    </div>
  );
};
