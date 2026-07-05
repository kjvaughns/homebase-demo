import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { PulseRing } from '../components/PulseRing';

// Sequence-relative frames: 0-180 (global 380-560)
export const AppReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: SPRING_HEAVY });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const y = interpolate(s, [0, 1], [200, 0]);
  const rot = interpolate(s, [0, 1], [8, 0]);
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Logo sequence 60-120 (global 440-500)
  const logoOpacity = interpolate(frame, [60, 76], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const nameOpacity = interpolate(frame, [78, 94], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const tagOpacity = interpolate(frame, [96, 112], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Screen cross-fade out at 140 (global 520) — dashboard takes over next scene
  const screenFade = interpolate(frame, [140, 158], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <PulseRing startFrame={20} size={420} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `translateY(${y - 20}px) scale(${scale}) rotate(${rot}deg)`,
            opacity,
          }}
        >
          <PhoneFrame activeTab="Home" glowing>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                opacity: screenFade,
              }}
            >
              <div
                style={{
                  opacity: logoOpacity,
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: C.greenDim,
                  border: `1px solid ${C.greenBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                }}
              >
                🏠
              </div>
              <div
                style={{
                  opacity: nameOpacity,
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.white,
                  fontFamily: FONT,
                }}
              >
                HomeBase Pro
              </div>
              <div
                style={{
                  opacity: tagOpacity,
                  fontSize: 10,
                  color: C.muted,
                  fontFamily: FONT,
                }}
              >
                Your business. Automated.
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption
        startFrame={50}
        eyebrow="INTRODUCING"
        headline={
          <>
            One app to run your business
            <br />
            and get more customers.
          </>
        }
        sub="iOS · Free to download · homebaseproapp.com"
      />
    </AbsoluteFill>
  );
};
