import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';

// Sequence-relative: 0-240 (4s). Dramatic beats + "Until now." slam.
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [30, 52], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const numS = spring({ frame: frame - 70, fps, config: SPRING_HEAVY });
  const numScale = interpolate(numS, [0, 0.7, 1], [0.78, 1.03, 1]);
  const numOpacity = interpolate(frame, [70, 84], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const subOpacity = interpolate(frame, [108, 128], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const blockFade = interpolate(frame, [172, 188], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "Until now." slams at 190
  const untilF = frame - 190;
  const untilS = spring({ frame: untilF, fps, config: SPRING_HEAVY });
  const untilScale = interpolate(untilS, [0, 0.7, 1], [0.7, 1.05, 1]);
  const untilOpacity = interpolate(untilF, [0, 6], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const untilOut = interpolate(frame, [228, 240], [1, 0], {
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
          opacity: blockFade,
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
            marginBottom: 32,
          }}
        >
          The average home service provider earns $97K/year.
        </div>

        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            fontSize: 104,
            fontWeight: 900,
            color: C.white,
            fontFamily: FONT,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 32,
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

      {frame >= 190 && (
        <AbsoluteFill
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: untilOut }}
        >
          <div
            style={{
              opacity: untilOpacity,
              transform: `scale(${untilScale})`,
              fontSize: 86,
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
