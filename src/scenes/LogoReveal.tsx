import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';
import { Logo } from '../components/Logo';
import { PulseRing } from '../components/PulseRing';

// Sequence-relative: 0-160 (~2.7s)
export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame: frame - 8, fps, config: SPRING_HEAVY });
  const logoScale = interpolate(logoS, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const draw = interpolate(frame, [10, 50], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const nameOpacity = interpolate(frame, [56, 74], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const nameS = spring({ frame: frame - 56, fps, config: SPRING_HEAVY });
  const nameY = interpolate(nameS, [0, 1], [16, 0]);

  const tagOpacity = interpolate(frame, [84, 102], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const fadeOut = interpolate(frame, [140, 160], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <PulseRing startFrame={16} size={340} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
        }}
      >
        <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }}>
          <Logo size={170} draw={draw} />
        </div>

        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            fontSize: 42,
            fontWeight: 700,
            color: C.white,
            fontFamily: FONT,
            letterSpacing: '-0.01em',
          }}
        >
          HomeBase <span style={{ color: C.green }}>Pro</span>
        </div>

        <div
          style={{
            opacity: tagOpacity,
            fontSize: 16,
            fontWeight: 300,
            color: C.muted,
            letterSpacing: '0.06em',
            fontFamily: FONT,
          }}
        >
          Run your business. Get clients. Get paid.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
