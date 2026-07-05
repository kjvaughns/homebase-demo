import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_GENTLE } from '../constants';
import { ClosePanel } from '../components/ClosePanel';
import { Caption, Green } from '../components/Caption';
import { FeatherIcon } from '../components/FeatherIcon';
import { TapDot, usePressScale } from '../components/TapDot';

// Sequence-relative: 0-330 (5.5s). Close-up panels + simulated tap.
// Real app: ProviderHomeScreen — greeting, 2x2 stat grid, Quick Quote card.

const STATS = [
  { icon: 'users', label: 'Clients', value: '24' },
  { icon: 'calendar', label: 'Upcoming', value: '8' },
  { icon: 'check-circle', label: 'Completed', value: '132' },
  { icon: 'bar-chart-2', label: 'This Month', value: '$6,240' },
];

const StatCell: React.FC<{ icon: string; label: string; value: string; delay: number }> = ({
  icon,
  label,
  value,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: SPRING_GENTLE });
  const opacity = interpolate(f, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const y = interpolate(s, [0, 1], [18, 0]);

  return (
    <div
      style={{
        background: C.card,
        borderRadius: 24,
        padding: '26px 28px',
        opacity,
        transform: `translateY(${y}px)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          background: C.greenLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FeatherIcon name={icon} size={22} color={C.green} />
      </div>
      <div>
        <div style={{ fontSize: 34, fontWeight: 700, color: C.white, fontFamily: FONT }}>{value}</div>
        <div style={{ fontSize: 15, color: C.muted, fontFamily: FONT, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
};

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [306, 330], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Greeting header
  const greetS = spring({ frame: frame - 10, fps, config: SPRING_GENTLE });
  const greetOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const greetY = interpolate(greetS, [0, 1], [20, 0]);

  // Quick Quote card
  const qqS = spring({ frame: frame - 140, fps, config: SPRING_GENTLE });
  const qqOpacity = interpolate(frame, [140, 158], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const qqY = interpolate(qqS, [0, 1], [26, 0]);

  // Simulated tap on Quick Quote at 230
  const TAP_AT = 230;
  const qqPress = usePressScale(frame, TAP_AT);

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 130,
        }}
      >
        <ClosePanel startFrame={28} width={720} tiltX={2.5} tiltY={-2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <TapDot startFrame={TAP_AT} x={360} y={560} />
            {/* Greeting card */}
            <div
              style={{
                opacity: greetOpacity,
                transform: `translateY(${greetY}px)`,
                background: C.card,
                borderRadius: 24,
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    background: C.greenLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    fontWeight: 700,
                    color: C.green,
                    fontFamily: FONT,
                  }}
                >
                  M
                </div>
                <div>
                  <div style={{ fontSize: 15, color: C.muted, fontFamily: FONT }}>Good morning,</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.white, fontFamily: FONT }}>Marcus</div>
                </div>
              </div>
              <FeatherIcon name="bell" size={22} color={C.muted} />
            </div>

            {/* 2x2 stat grid — real labels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {STATS.map((st, i) => (
                <StatCell key={st.label} {...st} delay={54 + i * 10} />
              ))}
            </div>

            {/* Quick Quote card — real feature */}
            <div
              style={{
                opacity: qqOpacity,
                transform: `translateY(${qqY}px) scale(${qqPress})`,
                background: C.greenLight,
                border: `1px solid rgba(56,174,95,0.3)`,
                borderRadius: 24,
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: C.green,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FeatherIcon name="zap" size={22} color="#fff" fill />
              </div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 600, color: C.white, fontFamily: FONT }}>Quick Quote</div>
                <div style={{ fontSize: 14, color: C.muted, fontFamily: FONT, marginTop: 2 }}>
                  Get an instant price from just an address.
                </div>
              </div>
            </div>
          </div>
        </ClosePanel>
      </AbsoluteFill>

      <Caption
        startFrame={80}
        eyebrow="Your Command Center"
        headline={
          <>
            Everything about your business. <Green>One glance.</Green>
          </>
        }
        sub="Clients · Jobs · Revenue · Quotes"
      />
    </AbsoluteFill>
  );
};
