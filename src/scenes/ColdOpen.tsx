import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';

// Sequence-relative frames: 0-180
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const numS = spring({ frame: frame - 80, fps, config: SPRING_HEAVY });
  const numScale = interpolate(numS, [0, 1], [0.8, 1]);
  const numOpacity = interpolate(frame, [80, 96], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const subOpacity = interpolate(frame, [110, 128], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Block 1 fades out at 150
  const blockFade = interpolate(frame, [148, 162], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "Until now." slams at 160
  const untilF = frame - 160;
  const untilS = spring({ frame: untilF, fps, config: SPRING_HEAVY });
  const untilScale = interpolate(untilS, [0, 0.7, 1], [0.7, 1.05, 1]);
  const untilOpacity = interpolate(untilF, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Block 1: the stat */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: blockFade,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            fontSize: 14,
            color: C.muted,
            fontWeight: 400,
            letterSpacing: '0.05em',
            fontFamily: FONT,
            marginBottom: 30,
          }}
        >
          The average home service provider earns $97K/year.
        </div>

        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            fontSize: 96,
            fontWeight: 900,
            color: C.white,
            fontFamily: FONT,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 30,
          }}
        >
          $31,000
        </div>

        <div
          style={{
            opacity: subOpacity,
            fontSize: 14,
            color: C.muted,
            lineHeight: 1.6,
            textAlign: 'center',
            fontFamily: FONT,
          }}
        >
          lost every year to no-shows, late payments,
          <br />
          and clients they never followed up with.
        </div>
      </AbsoluteFill>

      {/* Block 2: "Until now." */}
      {frame >= 160 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              opacity: untilOpacity,
              transform: `scale(${untilScale})`,
              fontSize: 80,
              fontWeight: 900,
              color: C.green,
              fontFamily: FONT,
              letterSpacing: '-0.02em',
            }}
          >
            Until now.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
