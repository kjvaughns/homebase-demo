import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { TypingText } from '../components/TypingText';

// Sequence-relative frames: 0-240 (global 860-1100)

const HeroLine: React.FC<{
  text: string;
  size: number;
  weight: number;
  color: string;
  delay: number;
}> = ({ text, size, weight, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: SPRING_HEAVY });
  const x = interpolate(s, [0, 1], [30, 0]);
  const opacity = interpolate(f, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        fontSize: size,
        fontWeight: weight,
        color,
        fontFamily: FONT,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
      }}
    >
      {text}
    </div>
  );
};

export const Marketplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone shifts left
  const shiftS = spring({ frame, fps, config: SPRING_HEAVY });
  const phoneX = interpolate(shiftS, [0, 1], [0, -280]);

  const screenIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const pillsDelay = 50;
  const card1 = (() => {
    const f = frame - 80;
    const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
    return {
      opacity: interpolate(f, [0, 16], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      y: interpolate(s, [0, 1], [20, 0]),
    };
  })();
  const card2 = (() => {
    const f = frame - 92;
    const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
    return {
      opacity: interpolate(f, [0, 16], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      y: interpolate(s, [0, 1], [20, 0]),
    };
  })();

  // Book Now tap at rel 200 (global 1060)
  const tapF = frame - 200;
  const tapS = spring({ frame: tapF, fps, config: SPRING_SNAPPY });
  const tapScale = tapF >= 0 && tapF < 30 ? interpolate(tapS, [0, 0.5, 1], [1, 0.94, 1]) : 1;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translate(${phoneX}px, -20px)` }}>
          <PhoneFrame activeTab="Home">
            <div style={{ padding: '10px 14px', height: '100%', opacity: screenIn }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT, marginBottom: 9 }}>
                Explore Services
              </div>

              {/* Search bar with typing */}
              <div
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 11,
                  padding: '8px 12px',
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 10 }}>🔍</span>
                <TypingText
                  text="Lawn care near Dallas..."
                  startFrame={24}
                  charsPerSecond={14}
                  style={{ fontSize: 10, color: '#999', fontFamily: FONT }}
                />
              </div>

              {/* Category pills */}
              <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
                {[
                  { label: '🌿 Lawn Care', active: true },
                  { label: '🏠 Cleaning', active: false },
                  { label: '❄️ HVAC', active: false },
                  { label: '💧 Plumbing', active: false },
                ].map((p, i) => {
                  const pf = frame - pillsDelay - i * 6;
                  const ps = spring({ frame: pf, fps, config: SPRING_SNAPPY });
                  const pOpacity = interpolate(pf, [0, 12], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  });
                  return (
                    <div
                      key={p.label}
                      style={{
                        opacity: pOpacity,
                        transform: `translateY(${interpolate(ps, [0, 1], [10, 0])}px)`,
                        fontSize: 8,
                        padding: '4px 8px',
                        borderRadius: 8,
                        background: p.active ? C.greenDim : C.card,
                        border: `0.5px solid ${p.active ? C.greenBorder : C.border}`,
                        color: p.active ? C.green : C.muted,
                        fontFamily: FONT,
                        fontWeight: p.active ? 700 : 400,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.label}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  fontSize: 8,
                  color: C.muted,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: FONT,
                  marginBottom: 7,
                }}
              >
                Top Providers Near You
              </div>

              {/* Hero provider card */}
              <div
                style={{
                  opacity: card1.opacity,
                  transform: `translateY(${card1.y}px)`,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${C.green}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 8,
                }}
              >
                <div style={{ height: 40, background: 'linear-gradient(90deg, #0d2a1a, #0a1a0f)' }} />
                <div style={{ padding: '0 11px 10px', marginTop: -18 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: C.greenDim,
                      border: `1px solid ${C.greenBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    🌿
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                    Marcus's Lawn Co.
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{ fontSize: 9, color: C.amber }}>★★★★★</span>
                    <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>4.9 · 127 reviews</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {['Lawn Care', 'Edging', 'Leaf Cleanup'].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 7,
                          padding: '2px 6px',
                          borderRadius: 5,
                          background: '#161616',
                          border: `0.5px solid ${C.border}`,
                          color: '#999',
                          fontFamily: FONT,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.green, fontFamily: FONT, marginTop: 7 }}>
                    $65 / visit
                  </div>
                  <div
                    style={{
                      marginTop: 7,
                      background: C.green,
                      borderRadius: 9,
                      padding: '7px',
                      textAlign: 'center',
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#000',
                      fontFamily: FONT,
                      transform: `scale(${tapScale})`,
                    }}
                  >
                    Book Now →
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  opacity: card2.opacity,
                  transform: `translateY(${card2.y}px)`,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '10px 11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: '#161616',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  🏠
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                    ProClean Services
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                    <span style={{ fontSize: 8, color: C.amber }}>★★★★☆</span>
                    <span style={{ fontSize: 7, color: C.muted, fontFamily: FONT }}>4.7</span>
                  </div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: C.white, fontFamily: FONT }}>$120/visit</div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      {/* Right-side hero text */}
      <div
        style={{
          position: 'absolute',
          right: 200,
          top: '50%',
          transform: 'translateY(-60%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <HeroLine text="A homeowner" size={36} weight={300} color={C.white} delay={30} />
        <HeroLine text="finds Marcus" size={52} weight={900} color={C.white} delay={40} />
        <HeroLine text="in 30 seconds." size={36} weight={300} color={C.green} delay={50} />
      </div>

      <Caption
        startFrame={60}
        eyebrow="THE MARKETPLACE"
        sub="Free for homeowners · forever · no account needed to browse"
      />
    </AbsoluteFill>
  );
};
