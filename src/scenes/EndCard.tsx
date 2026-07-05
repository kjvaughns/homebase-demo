import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';

// Sequence-relative frames: 0-100 (global 1700-1800)
// Spec global frames → relative: 1720→20, 1730→30, 1748→48, 1756→56, 1764→64, 1772→72, 1780→80

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone exits down
  const exitS = spring({ frame, fps, config: SPRING_HEAVY });
  const phoneY = interpolate(exitS, [0, 1], [0, 400]);
  const phoneScale = interpolate(exitS, [0, 1], [1, 0.8]);
  const phoneOpacity = interpolate(frame, [0, 16], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const runOpacity = interpolate(frame, [20, 36], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const runY = interpolate(frame, [20, 36], [10, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const getS = spring({ frame: frame - 30, fps, config: SPRING_HEAVY });
  const getScale = interpolate(getS, [0, 1], [0.85, 1]);
  const getOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const lineWidth = interpolate(frame, [48, 62], [0, 200], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const brandOpacity = interpolate(frame, [56, 68], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const iosOpacity = interpolate(frame, [64, 76], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const urlOpacity = interpolate(frame, [72, 84], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const badgeOpacity = interpolate(frame, [80, 92], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const bloomOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Final fade to black
  const finalFade = interpolate(frame, [90, 100], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Green bloom */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.04), transparent 60%)',
          opacity: bloomOpacity,
        }}
      />

      {/* Phone exiting */}
      {frame < 20 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              transform: `translateY(${phoneY - 20}px) scale(${phoneScale})`,
              opacity: phoneOpacity,
            }}
          >
            <PhoneFrame activeTab="Money" glowing>
              <div />
            </PhoneFrame>
          </div>
        </AbsoluteFill>
      )}

      {/* End card content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: finalFade,
        }}
      >
        <div
          style={{
            opacity: runOpacity,
            transform: `translateY(${runY}px)`,
            fontSize: 56,
            fontWeight: 300,
            color: C.white,
            fontFamily: FONT,
            letterSpacing: '-0.01em',
          }}
        >
          Run your business.
        </div>

        <div
          style={{
            opacity: getOpacity,
            transform: `scale(${getScale})`,
            fontSize: 64,
            fontWeight: 900,
            color: C.green,
            fontFamily: FONT,
            letterSpacing: '-0.02em',
          }}
        >
          Get clients.
        </div>

        <div
          style={{
            width: lineWidth,
            height: 1,
            background: C.faint,
            marginTop: 18,
            marginBottom: 6,
          }}
        />

        <div
          style={{
            opacity: brandOpacity,
            fontSize: 11,
            fontWeight: 600,
            color: C.white,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: FONT,
          }}
        >
          HomeBase Pro
        </div>

        <div style={{ opacity: iosOpacity, fontSize: 9, color: C.muted, fontFamily: FONT }}>
          Available on iOS
        </div>

        <div
          style={{
            opacity: urlOpacity,
            fontSize: 9,
            color: C.green,
            fontFamily: FONT,
            borderBottom: `0.5px solid ${C.greenBorder}`,
            paddingBottom: 1,
          }}
        >
          homebaseproapp.com
        </div>

        {/* App Store badge (inline SVG-ish) */}
        <div
          style={{
            opacity: badgeOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: `1px solid ${C.borderLight}`,
            borderRadius: 10,
            padding: '7px 16px',
            marginTop: 8,
          }}
        >
          <svg width="18" height="20" viewBox="0 0 18 20" fill={C.white}>
            <path d="M14.7 10.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9C4.8 5 3.3 6 2.5 7.5c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9zM12.4 3.2c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
          </svg>
          <div>
            <div style={{ fontSize: 7, color: C.muted, fontFamily: FONT }}>Download on the</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.white, fontFamily: FONT }}>App Store</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
