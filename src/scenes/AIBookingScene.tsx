import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, GRADIENT_TEXT, GREEN_GLOW, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { CheckmarkSVG } from '../components/CheckmarkSVG';
import { TypingText } from '../components/TypingText';

// Sequence-relative: 0-480 (8s). The site's hero feature: AI books jobs for you.
// Mirrors AIDemoSection.tsx on homebaseproapp.com: 9:47 PM lead -> AI quote -> booked in under 2 min.

const Bubble: React.FC<{
  delay: number;
  ai?: boolean;
  children: React.ReactNode;
}> = ({ delay, ai, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
  const opacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const y = interpolate(s, [0, 1], [18, 0]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: ai ? 'flex-start' : 'flex-end',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: '85%',
          background: ai ? C.card : C.green,
          border: ai ? `1px solid ${C.border}` : 'none',
          borderRadius: ai ? '22px 22px 22px 6px' : '22px 22px 6px 22px',
          padding: '18px 24px',
          fontSize: 22,
          color: ai ? C.white : '#fff',
          fontFamily: FONT,
          lineHeight: 1.45,
          fontWeight: ai ? 400 : 500,
          boxShadow: ai ? 'none' : GREEN_GLOW,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const AIBookingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [456, 480], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Left text block entrances
  const l1 = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const l2S = spring({ frame: frame - 24, fps, config: SPRING_HEAVY });
  const l2 = interpolate(frame, [24, 42], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const l3S = spring({ frame: frame - 44, fps, config: SPRING_HEAVY });
  const l3 = interpolate(frame, [44, 62], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const subOpacity = interpolate(frame, [70, 92], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Chat panel
  const panelS = spring({ frame: frame - 40, fps, config: SPRING_HEAVY });
  const panelOpacity = interpolate(frame, [40, 62], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const panelX = interpolate(panelS, [0, 1], [80, 0]);

  // Booked confirmation
  const bookedF = frame - 330;
  const bookedS = spring({ frame: bookedF, fps, config: SPRING_HEAVY });
  const bookedScale = interpolate(bookedS, [0, 0.7, 1], [0.8, 1.04, 1]);
  const bookedOpacity = interpolate(bookedF, [0, 14], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 100,
          padding: '0 90px',
        }}
      >
        {/* Left: giant narrative text */}
        <div style={{ flex: 1, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ opacity: l1, fontSize: 34, color: C.muted, fontFamily: FONT, fontWeight: 400 }}>
            It's 9:47 PM. A lead comes in.
          </div>
          <div
            style={{
              opacity: l2,
              transform: `translateX(${interpolate(l2S, [0, 1], [40, 0])}px)`,
              fontSize: 84,
              fontWeight: 900,
              color: C.white,
              fontFamily: FONT,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            You're off the clock.
          </div>
          <div
            style={{
              opacity: l3,
              transform: `translateX(${interpolate(l3S, [0, 1], [40, 0])}px)`,
              fontSize: 84,
              fontWeight: 900,
              fontFamily: FONT,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              ...GRADIENT_TEXT,
            }}
          >
            Your AI isn't.
          </div>
          <div style={{ opacity: subOpacity, fontSize: 24, color: C.muted, fontFamily: FONT, marginTop: 14 }}>
            Instant lead response · Smart quotes · Auto-scheduling
          </div>
        </div>

        {/* Right: AI chat demo panel */}
        <div
          style={{
            width: 760,
            opacity: panelOpacity,
            transform: `translateX(${panelX}px)`,
            background: '#101010',
            border: `1px solid ${C.border}`,
            borderRadius: 32,
            padding: '34px 38px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 60px 140px rgba(0,0,0,0.85)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
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
              S
            </div>
            <div>
              <div style={{ fontSize: 21, fontWeight: 700, color: C.white, fontFamily: FONT }}>Sarah M.</div>
              <div style={{ fontSize: 16, color: C.muted, fontFamily: FONT }}>New lead · 9:47 PM</div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                fontSize: 15,
                fontWeight: 700,
                color: C.green,
                background: C.greenLight,
                borderRadius: 12,
                padding: '7px 16px',
                fontFamily: FONT,
              }}
            >
              ✦ AI responding
            </div>
          </div>

          <Bubble delay={90} ai>
            My kitchen sink is leaking — can someone come tomorrow?
          </Bubble>
          <Bubble delay={150}>
            <TypingText
              text="I can help! Based on your description, the estimate is $80 – $150. Mike has 10:00 AM open tomorrow — want me to book it?"
              startFrame={155}
              charsPerSecond={38}
              style={{ fontSize: 22, color: '#fff', fontFamily: FONT }}
            />
          </Bubble>
          <Bubble delay={280} ai>
            Yes, perfect! 🙌
          </Bubble>

          {/* Booked card */}
          {bookedF >= 0 && (
            <div
              style={{
                opacity: bookedOpacity,
                transform: `scale(${bookedScale})`,
                background: C.greenLight,
                border: `1.5px solid ${C.green}`,
                borderRadius: 22,
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: GREEN_GLOW,
              }}
            >
              <CheckmarkSVG startFrame={334} size={56} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.green, fontFamily: FONT }}>Job Booked</div>
                <div style={{ fontSize: 18, color: C.muted, fontFamily: FONT, marginTop: 2 }}>
                  In under 2 minutes — while you slept
                </div>
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
