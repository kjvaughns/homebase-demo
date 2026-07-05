import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, GRADIENT_TEXT, GREEN_GLOW, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { Logo } from '../components/Logo';

// Sequence-relative: 0-280 (~4.7s). The moat — from ComparisonSection.tsx on the website:
// "Most tools overcharge, lock you into contracts, or rent you leads."

const COMPETITORS = [
  { name: 'Jobber', price: '~$39/mo', note: 'tools only — no leads' },
  { name: 'Housecall Pro', price: '~$65/mo', note: 'basic, 1 user' },
  { name: 'ServiceTitan', price: '$300+/mo', note: 'annual contract' },
  { name: 'Thumbtack', price: '$15–80/lead', note: "you don't own them" },
];

const HB_AT = 130;

export const MoatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [256, 280], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const headOpacity = interpolate(frame, [6, 26], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Competitors dim once HomeBase lands
  const dimAmount = interpolate(frame, [HB_AT + 6, HB_AT + 26], [1, 0.3], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const hbF = frame - HB_AT;
  const hbS = spring({ frame: hbF, fps, config: SPRING_HEAVY });
  const hbScale = interpolate(hbS, [0, 0.7, 1], [0.8, 1.04, 1]);
  const hbOpacity = interpolate(hbF, [0, 12], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const pillOpacity = interpolate(frame, [HB_AT + 46, HB_AT + 66], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 44,
        }}
      >
        {/* Headline — real site copy */}
        <div
          style={{
            opacity: headOpacity,
            fontSize: 64,
            fontWeight: 900,
            color: C.white,
            fontFamily: FONT,
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Built for pros. <span style={{ ...GRADIENT_TEXT }}>Priced for pros.</span>
        </div>

        {/* Competitor row */}
        <div style={{ display: 'flex', gap: 26, opacity: dimAmount }}>
          {COMPETITORS.map((comp, i) => {
            const f = frame - 30 - i * 12;
            const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
            const opacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            return (
              <div
                key={comp.name}
                style={{
                  opacity,
                  transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 22,
                  padding: '26px 34px',
                  textAlign: 'center',
                  minWidth: 240,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: C.white, fontFamily: FONT }}>{comp.name}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: C.red, fontFamily: FONT, marginTop: 8 }}>
                  {comp.price}
                </div>
                <div style={{ fontSize: 17, color: C.muted, fontFamily: FONT, marginTop: 6 }}>{comp.note}</div>
              </div>
            );
          })}
        </div>

        {/* HomeBase card slams in */}
        {hbF >= 0 && (
          <div
            style={{
              opacity: hbOpacity,
              transform: `scale(${hbScale})`,
              background: C.greenLight,
              border: `2px solid ${C.green}`,
              borderRadius: 28,
              padding: '34px 60px',
              display: 'flex',
              alignItems: 'center',
              gap: 34,
              boxShadow: '0 0 60px rgba(56,174,95,0.35), 0 40px 100px rgba(0,0,0,0.7)',
            }}
          >
            <Logo size={78} />
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ fontSize: 34, fontWeight: 800, color: C.white, fontFamily: FONT }}>
                  HomeBase Pro
                </span>
                <span style={{ fontSize: 44, fontWeight: 900, color: C.green, fontFamily: FONT }}>$29.99/mo</span>
              </div>
              <div style={{ fontSize: 22, color: C.white, fontFamily: FONT, marginTop: 8, fontWeight: 500 }}>
                AI booking + built-in marketplace + payments. <span style={{ color: C.green, fontWeight: 700 }}>All of it.</span>
              </div>
            </div>
          </div>
        )}

        {/* The pricing hook pill — real site banner copy */}
        <div
          style={{
            opacity: pillOpacity,
            background: 'transparent',
            border: `1.5px solid ${C.green}`,
            borderRadius: 999,
            padding: '14px 34px',
            fontSize: 23,
            fontWeight: 600,
            color: C.green,
            fontFamily: FONT,
            boxShadow: GREEN_GLOW,
          }}
        >
          ✦ Free until you get your first paid booking
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
