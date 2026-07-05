import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';

const START = FRAMES.s2;

const useAnim = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - START - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  return { s, opacity, f };
};

const StatCard: React.FC<{ label: string; value: string; delay: number }> = ({ label, value, delay }) => {
  const { s, opacity } = useAnim(delay);
  const translateY = interpolate(s, [0, 1], [10, 0]);
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: '8px 10px',
      flex: 1,
      opacity,
      transform: `translateY(${translateY}px)`,
    }}>
      <div style={{ fontSize: 7, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>{value}</div>
    </div>
  );
};

interface JobCardProps {
  name: string;
  amount: string;
  service: string;
  time: string;
  statusColor: string;
  statusText: string;
  delay: number;
}

const JobCard: React.FC<JobCardProps> = ({ name, amount, service, time, statusColor, statusText, delay }) => {
  const { s, opacity } = useAnim(delay);
  const translateY = interpolate(s, [0, 1], [12, 0]);
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: '8px 10px',
      opacity,
      transform: `translateY(${translateY}px)`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>{name}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, fontFamily: 'sans-serif' }}>{amount}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif' }}>{service} · {time}</span>
        <span style={{ fontSize: 8, color: statusColor, fontFamily: 'sans-serif' }}>{statusText}</span>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame: frame - START, fps, config: SPRING });
  const phoneTranslateY = interpolate(phoneS, [0, 1], [80, 0]);
  const phoneOpacity = interpolate(frame - START, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s3 - 20, FRAMES.s3], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const headerOpacity = interpolate(frame - START, [10, 28], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <div style={{ transform: `translateY(${phoneTranslateY}px)`, opacity: phoneOpacity }}>
        <PhoneFrame activeTab="Home">
          <div style={{ padding: '10px 14px', height: '100%', overflowY: 'hidden' }}>
            {/* Header */}
            <div style={{ opacity: headerOpacity, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>
                    Good morning, Marcus 👋
                  </div>
                  <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif' }}>Tuesday · 3 jobs today</div>
                </div>
                <div style={{
                  width: 30, height: 30, borderRadius: 15,
                  background: COLORS.greenDim, border: `1px solid ${COLORS.greenBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: COLORS.green, fontFamily: 'sans-serif',
                }}>M</div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <StatCard label="This Week" value="$1,240" delay={20} />
              <StatCard label="Jobs" value="8" delay={26} />
              <StatCard label="Overdue" value="$0" delay={32} />
            </div>

            {/* Job cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 2 }}>TODAY'S JOBS</div>
              <JobCard name="Sarah K." amount="$280" service="Lawn Care" time="10:00 AM" statusColor={COLORS.green} statusText="● Confirmed" delay={40} />
              <JobCard name="James R." amount="$350" service="HVAC" time="1:30 PM" statusColor={COLORS.amber} statusText="⏰ In 3h" delay={48} />
              <JobCard name="Diana M." amount="$195" service="Pressure Wash" time="Wed" statusColor={COLORS.blue} statusText="📅 Tomorrow" delay={56} />
            </div>
          </div>
        </PhoneFrame>
      </div>

      <Caption
        startFrame={START + 30}
        eyebrow="MEET MARCUS"
        headline={['His entire business.', 'One screen.']}
        sub="Lawn care · Dallas, TX"
      />
    </div>
  );
};
