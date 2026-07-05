import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';

// Sequence-relative: 0-300 (5s). Slower beats than v2.
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const numS = spring({ frame: frame - 120, fps, config: SPRING_HEAVY });
  const numScale = interpolate(numS, [0, 1], [0.8, 1]);
  const numOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const subOpacity = interpolate(frame, [170, 195], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const fadeOut = interpolate(frame, [276, 300], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            fontSize: 16,
            color: C.muted,
            fontWeight: 400,
            letterSpacing: '0.05em',
            fontFamily: FONT,
            marginBottom: 34,
          }}
        >
          The average home service provider earns $97K/year.
        </div>

        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            fontSize: 100,
            fontWeight: 900,
            color: C.white,
            fontFamily: FONT,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 34,
          }}
        >
          $31,000
        </div>

        <div
          style={{
            opacity: subOpacity,
            fontSize: 16,
            color: C.muted,
            lineHeight: 1.7,
            textAlign: 'center',
            fontFamily: FONT,
          }}
        >
          lost every year to no-shows, late payments,
          <br />
          and clients they never followed up with.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
