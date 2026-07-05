import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_SNAPPY, SPRING_GENTLE } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption, Green } from '../components/Caption';
import { Toast } from '../components/Toast';

// Sequence-relative frames: 0-300 (global 560-860)

const useCard = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
  const opacity = interpolate(f, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const translateY = interpolate(s, [0, 1], [20, 0]);
  return { opacity, translateY };
};

const StatBox: React.FC<{ value: string; label: string; valueColor?: string; delay: number; check?: boolean }> = ({
  value,
  label,
  valueColor = C.white,
  delay,
  check,
}) => {
  const { opacity, translateY } = useCard(delay);
  return (
    <div
      style={{
        flex: 1,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '10px 12px',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 800, color: valueColor, fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4 }}>
        {value}
        {check && <span style={{ fontSize: 9, color: C.green }}>✓</span>}
      </div>
      <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT, marginTop: 2 }}>{label}</div>
    </div>
  );
};

const JobCard: React.FC<{
  dotColor: string;
  name: string;
  service: string;
  time: string;
  amount: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  delay: number;
  pulseDot?: boolean;
}> = ({ dotColor, name, service, time, amount, badge, badgeBg, badgeColor, delay, pulseDot }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = useCard(delay);
  const pulse = pulseDot ? 1 + 0.3 * Math.sin((frame * 2 * Math.PI) / 60) : 1;
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '9px 11px',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          background: dotColor,
          transform: `scale(${pulse})`,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.white, fontFamily: FONT }}>{name}</div>
        <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>{service}</div>
        <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>{time}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: FONT }}>{amount}</div>
        <div
          style={{
            fontSize: 7,
            background: badgeBg,
            color: badgeColor,
            padding: '2px 6px',
            borderRadius: 5,
            fontFamily: FONT,
            fontWeight: 600,
          }}
        >
          {badge}
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen content fades in (cross-fade from AppReveal logo screen)
  const screenIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Breathing phone
  const breathe = 1 + 0.005 * Math.sin((frame * 2 * Math.PI) / 90);

  const headerOpacity = interpolate(frame, [6, 22], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const aiCard = (() => {
    const f = frame - 56;
    const s = spring({ frame: f, fps, config: SPRING_GENTLE });
    const opacity = interpolate(f, [0, 16], [0, 1], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    return { opacity, translateY: interpolate(s, [0, 1], [14, 0]) };
  })();

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translateY(-20px) scale(${breathe})` }}>
          <PhoneFrame activeTab="Home">
            <div style={{ padding: '10px 14px', height: '100%', position: 'relative', opacity: screenIn }}>
              {/* Header */}
              <div
                style={{
                  opacity: headerOpacity,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                    Good morning, Marcus 👋
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, fontFamily: FONT, marginTop: 1 }}>
                    Tuesday · July 8 · Dallas, TX
                  </div>
                </div>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: 'linear-gradient(135deg, #22c55e, #15803d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#000',
                    fontFamily: FONT,
                  }}
                >
                  M
                </div>
              </div>

              {/* Stat cards */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <StatBox value="$1,840" label="This Week" valueColor={C.green} delay={24} />
                <StatBox value="8" label="Active Jobs" delay={32} />
                <StatBox value="$0" label="Overdue" valueColor={C.green} delay={40} check />
              </div>

              {/* AI Insight card */}
              <div
                style={{
                  opacity: aiCard.opacity,
                  transform: `translateY(${aiCard.translateY}px)`,
                  background: 'linear-gradient(135deg, #0d1a0d, #0a0a0a)',
                  border: `0.5px solid ${C.greenBorder}`,
                  borderRadius: 12,
                  padding: '9px 11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 7,
                    color: C.green,
                    border: `0.5px solid ${C.greenBorder}`,
                    borderRadius: 5,
                    padding: '2px 5px',
                    fontFamily: FONT,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✦ AI
                </div>
                <div style={{ fontSize: 9, color: C.white, fontFamily: FONT, flex: 1, lineHeight: 1.35 }}>
                  You have 2 clients due for follow-up. Send reminders?
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: C.green,
                    fontFamily: FONT,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  Send →
                </div>
              </div>

              {/* Jobs */}
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
                Upcoming Jobs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <JobCard
                  dotColor={C.green}
                  name="Sarah K."
                  service="Lawn Care"
                  time="Today · 10:00 AM"
                  amount="$280"
                  badge="● Confirmed"
                  badgeBg={C.greenDim}
                  badgeColor={C.green}
                  delay={80}
                  pulseDot
                />
                <JobCard
                  dotColor={C.amber}
                  name="James R."
                  service="HVAC Maintenance"
                  time="Today · 1:30 PM"
                  amount="$350"
                  badge="⏰ In 3h"
                  badgeBg={C.amberDim}
                  badgeColor={C.amber}
                  delay={90}
                />
                <JobCard
                  dotColor={C.blue}
                  name="Diana M."
                  service="Pressure Washing"
                  time="Tomorrow · 9:00 AM"
                  amount="$195"
                  badge="📅 Tomorrow"
                  badgeBg="#0d1526"
                  badgeColor={C.blue}
                  delay={100}
                />
              </div>

              <Toast
                startFrame={200}
                icon="🔔"
                title="New Booking Request"
                body="Amanda L. wants Lawn Care · Thu Jul 10"
              />
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption
        startFrame={30}
        eyebrow="YOUR COMMAND CENTER"
        headline={
          <>
            Marcus opens HomeBase.
            <br />
            His whole week. <Green>Right there.</Green>
          </>
        }
        sub="Lawn care · Dallas, TX · 3 jobs today"
      />
    </AbsoluteFill>
  );
};
