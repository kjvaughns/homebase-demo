import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';

const START = FRAMES.s6;

const useAnim = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - START - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(s, [0, 1], [8, 0]);
  return { opacity, translateY, s, f };
};

const LineItem: React.FC<{ label: string; value: string; color?: string; delay: number }> = ({ label, value, color, delay }) => {
  const { opacity, translateY } = useAnim(delay);
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      opacity, transform: `translateY(${translateY}px)`,
      padding: '4px 0', borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <span style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif' }}>{label}</span>
      <span style={{ fontSize: 9, color: color ?? COLORS.white, fontFamily: 'sans-serif', fontWeight: 600 }}>{value}</span>
    </div>
  );
};

export const Invoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s7 - 20, FRAMES.s7], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const amountAnim = useAnim(10);

  // Checkmark
  const ckF = frame - 1440;
  const ckS = spring({ frame: ckF, fps, config: { mass: 0.5, damping: 12, stiffness: 200 } });
  const ckScale = interpolate(ckS, [0, 0.8, 1], [0, 1.2, 1]);
  const ckOpacity = interpolate(ckF, [0, 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <PhoneFrame activeTab="Money">
        <div style={{ padding: '10px 14px', height: '100%', position: 'relative' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif', marginBottom: 6 }}>
            Invoice #1047
          </div>

          {/* Amount */}
          <div style={{
            opacity: amountAnim.opacity,
            transform: `translateY(${amountAnim.translateY}px)`,
            textAlign: 'center', marginBottom: 14,
          }}>
            <div style={{ fontSize: 8, color: COLORS.muted, fontFamily: 'sans-serif', letterSpacing: 2, marginBottom: 4 }}>
              BALANCE DUE
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.green, fontFamily: 'sans-serif' }}>
              $48.75
            </div>
          </div>

          {/* Line items */}
          <LineItem label="Lawn Care Service" value="$65.00" delay={20} />
          <LineItem label="Completed Jul 10" value="" color={COLORS.muted} delay={26} />
          <LineItem label="Deposit paid" value="-$16.25" color={COLORS.amber} delay={32} />
          <LineItem label="Balance due" value="$48.75" color={COLORS.green} delay={38} />

          {/* Pay button */}
          <div style={{
            marginTop: 16,
            background: '#000',
            border: '1px solid #333',
            borderRadius: 10,
            padding: '10px',
            textAlign: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.white,
            fontFamily: 'sans-serif',
            opacity: frame - START > 50 ? 1 : 0,
          }}>
            Pay with Apple Pay 🍎
          </div>

          {/* Paid badge */}
          {frame >= 1440 && (
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${ckScale})`,
              opacity: ckOpacity,
              background: COLORS.greenDim,
              border: `2px solid ${COLORS.green}`,
              borderRadius: 50,
              width: 70,
              height: 70,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: 22 }}>✓</div>
              <div style={{ fontSize: 8, color: COLORS.green, fontFamily: 'sans-serif', fontWeight: 700 }}>Paid</div>
            </div>
          )}
        </div>
      </PhoneFrame>

      <Caption
        startFrame={START + 20}
        eyebrow="GET PAID"
        headline={['Invoice sent.', 'Two taps. Money moved.']}
        sub="Apple Pay · Stripe · Encrypted"
      />
    </div>
  );
};
