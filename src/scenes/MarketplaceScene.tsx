import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_GENTLE } from '../constants';
import { ClosePanel } from '../components/ClosePanel';
import { Caption, Green } from '../components/Caption';
import { FeatherIcon } from '../components/FeatherIcon';
import { TypingText } from '../components/TypingText';
import { TapDot, usePressScale } from '../components/TapDot';
import { PunchWord } from '../components/PunchWord';

// Sequence-relative: 0-360 (6s), opens with punch word + ends with Book Now tap
// Real app: FindScreen search "Search services..." + ProviderCard
// (avatar, name, blue verified check, rating (count), distance, $/hr green, tag pills)

export const MarketplaceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [336, 360], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const searchS = spring({ frame: frame - 48, fps, config: SPRING_GENTLE });
  const searchOpacity = interpolate(frame, [48, 66], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const searchY = interpolate(searchS, [0, 1], [24, 0]);

  const bookS = spring({ frame: frame - 190, fps, config: SPRING_GENTLE });
  const bookOpacity = interpolate(frame, [190, 208], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Simulated tap on Book Now
  const TAP_AT = 270;
  const bookPress = usePressScale(frame, TAP_AT);

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <PunchWord startFrame={0} duration={44} text="Get found." color={C.green} />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          paddingBottom: 130,
        }}
      >
        {/* Search bar close-up */}
        <div
          style={{
            opacity: searchOpacity,
            transform: `translateY(${searchY}px)`,
            width: 640,
            background: C.card,
            borderRadius: 20,
            padding: '20px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        >
          <FeatherIcon name="search" size={22} color={C.muted} />
          <TypingText
            text="Lawn care near Dallas"
            startFrame={70}
            charsPerSecond={14}
            style={{ fontSize: 19, color: C.white, fontFamily: FONT }}
          />
        </div>

        {/* Oversized provider card — real ProviderCard layout */}
        <ClosePanel startFrame={120} width={640} tiltX={2.5} tiltY={-2}>
          <div
            style={{
              background: C.card,
              borderRadius: 28,
              padding: '28px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              position: 'relative',
            }}
          >
            <TapDot startFrame={TAP_AT} x={320} y={236} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                  background: C.greenLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.green,
                  fontFamily: FONT,
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                    Marcus's Lawn Co.
                  </span>
                  <FeatherIcon name="check-circle" size={19} color={C.blue} />
                </div>
                <div style={{ fontSize: 14, color: C.muted, fontFamily: FONT, marginTop: 2 }}>Marcus Johnson</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: C.green, fontFamily: FONT }}>$65</span>
                <span style={{ fontSize: 14, color: C.muted, fontFamily: FONT }}>/hr</span>
              </div>
            </div>

            <div style={{ height: 1, background: C.border }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FeatherIcon name="star" size={17} color={C.amber} fill />
              <span style={{ fontSize: 16, fontWeight: 600, color: C.white, fontFamily: FONT }}>4.9</span>
              <span style={{ fontSize: 14, color: C.muted, fontFamily: FONT }}>(127 reviews)</span>
              <span style={{ fontSize: 14, color: C.tertiary, fontFamily: FONT }}>·</span>
              <span style={{ fontSize: 14, color: C.muted, fontFamily: FONT }}>2.1 mi away</span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {['Lawn Care', 'Edging'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    background: C.greenLight,
                    borderRadius: 12,
                    padding: '6px 14px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.green,
                    fontFamily: FONT,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Book Now — PrimaryButton style: green, radius 12, height 50 */}
            <div
              style={{
                opacity: bookOpacity,
                transform: `scale(${interpolate(bookS, [0, 1], [0.96, 1]) * bookPress})`,
                background: C.green,
                borderRadius: 14,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 17,
                fontWeight: 600,
                color: '#fff',
                fontFamily: FONT,
              }}
            >
              Book Now
            </div>
          </div>
        </ClosePanel>
      </AbsoluteFill>

      <Caption
        startFrame={150}
        eyebrow="Homeowners Find You"
        headline={
          <>
            Verified profile. Real reviews. <Green>Booked direct.</Green>
          </>
        }
        sub="Free for homeowners to browse and book"
      />
    </AbsoluteFill>
  );
};
