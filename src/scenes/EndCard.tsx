import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_GENTLE } from '../constants';
import { IPhoneFrame } from '../components/iPhoneFrame';
import { Logo } from '../components/Logo';
import { FeatherIcon } from '../components/FeatherIcon';

// Sequence-relative: 0-170 (~2.8s)

const MINI_STATS = [
  { label: 'Clients', value: '24', icon: 'users' },
  { label: 'Upcoming', value: '8', icon: 'calendar' },
  { label: 'Completed', value: '132', icon: 'check-circle' },
  { label: 'This Month', value: '$6,240', icon: 'bar-chart-2' },
];

const PhoneScreen: React.FC = () => (
  <div style={{ padding: '4px 16px' }}>
    {/* Header like real HeaderTitle: logo + green wordmark */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
      <Logo size={22} />
      <span style={{ fontSize: 15, fontWeight: 600, color: C.green, fontFamily: FONT }}>HomeBase Pro</span>
    </div>
    {/* Greeting */}
    <div
      style={{
        background: C.card,
        borderRadius: 16,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          background: C.greenLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: C.green,
          fontFamily: FONT,
        }}
      >
        M
      </div>
      <div>
        <div style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>Good morning,</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT }}>Marcus</div>
      </div>
    </div>
    {/* Stat grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {MINI_STATS.map((st) => (
        <div key={st.label} style={{ background: C.card, borderRadius: 14, padding: '10px 12px' }}>
          <FeatherIcon name={st.icon} size={13} color={C.green} />
          <div style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: FONT, marginTop: 6 }}>
            {st.value}
          </div>
          <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>{st.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - 6, fps, config: SPRING_GENTLE });
  const phoneOpacity = interpolate(frame, [6, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const phoneY = interpolate(phoneS, [0, 1], [50, 0]);

  const runOpacity = interpolate(frame, [26, 46], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const getS = spring({ frame: frame - 40, fps, config: SPRING_HEAVY });
  const getScale = interpolate(getS, [0, 1], [0.88, 1]);
  const getOpacity = interpolate(frame, [40, 58], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const metaOpacity = interpolate(frame, [70, 92], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const badgeOpacity = interpolate(frame, [90, 112], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const finalFade = interpolate(frame, [152, 170], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: finalFade }}>
      {/* Subtle green bloom */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 38% 50%, rgba(56,174,95,0.05), transparent 55%)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 110,
        }}
      >
        {/* Realistic iPhone, angled */}
        <div
          style={{
            opacity: phoneOpacity,
            transform: `translateY(${phoneY}px) scale(0.82) rotate(-4deg)`,
            perspective: 1200,
          }}
        >
          <IPhoneFrame activeTab="Home">
            <PhoneScreen />
          </IPhoneFrame>
        </div>

        {/* Text block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640 }}>
          <div
            style={{
              opacity: runOpacity,
              fontSize: 52,
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
              transformOrigin: 'left center',
              fontSize: 60,
              fontWeight: 900,
              color: C.green,
              fontFamily: FONT,
              letterSpacing: '-0.02em',
            }}
          >
            Get clients.
          </div>

          <div style={{ opacity: metaOpacity, display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
            <Logo size={34} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: C.white,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: FONT,
              }}
            >
              HomeBase Pro
            </span>
          </div>

          <div style={{ opacity: metaOpacity, fontSize: 13, color: C.muted, fontFamily: FONT }}>
            Available on iOS · <span style={{ color: C.green }}>homebaseproapp.com</span>
          </div>

          {/* App Store badge */}
          <div
            style={{
              opacity: badgeOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '9px 18px',
              width: 'fit-content',
              marginTop: 6,
            }}
          >
            <svg width="20" height="23" viewBox="0 0 18 20" fill={C.white}>
              <path d="M14.7 10.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9C4.8 5 3.3 6 2.5 7.5c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9zM12.4 3.2c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
            </svg>
            <div>
              <div style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>Download on the</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.white, fontFamily: FONT }}>App Store</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
