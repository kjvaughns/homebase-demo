import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { Toast } from '../components/Toast';

const START = FRAMES.s7;

const useAnim = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - START - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(s, [0, 1], [10, 0]);
  return { opacity, translateY };
};

export const Payout: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s8 - 20, FRAMES.s8], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const stat1 = useAnim(15);
  const stat2 = useAnim(22);
  const payoutCard = useAnim(35);
  const rec1 = useAnim(55);
  const rec2 = useAnim(63);

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <PhoneFrame activeTab="Money">
        <div style={{ padding: '10px 14px', height: '100%', position: 'relative' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif', marginBottom: 10 }}>
            Earnings
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <div style={{
              flex: 1,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: '8px 10px',
              opacity: stat1.opacity,
              transform: `translateY(${stat1.translateY}px)`,
            }}>
              <div style={{ fontSize: 7, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 2 }}>Available</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.green, fontFamily: 'sans-serif' }}>$1,885</div>
            </div>
            <div style={{
              flex: 1,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: '8px 10px',
              opacity: stat2.opacity,
              transform: `translateY(${stat2.translateY}px)`,
            }}>
              <div style={{ fontSize: 7, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 2 }}>This Month</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.white, fontFamily: 'sans-serif' }}>$6,240</div>
            </div>
          </div>

          {/* Payout card */}
          <div style={{
            background: COLORS.greenDim,
            border: `1px solid ${COLORS.greenBorder}`,
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 10,
            opacity: payoutCard.opacity,
            transform: `translateY(${payoutCard.translateY}px)`,
          }}>
            <div style={{ fontSize: 8, color: COLORS.green, letterSpacing: 2, fontFamily: 'sans-serif', marginBottom: 4 }}>
              READY TO WITHDRAW
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.white, fontFamily: 'sans-serif', marginBottom: 8 }}>
              $1,885.00
            </div>
            <div style={{
              background: COLORS.green, borderRadius: 8,
              padding: '6px', textAlign: 'center',
              fontSize: 9, fontWeight: 700, color: '#000', fontFamily: 'sans-serif',
              marginBottom: 4,
            }}>
              Instant Payout → Bank
            </div>
            <div style={{ fontSize: 8, color: COLORS.muted, fontFamily: 'sans-serif', textAlign: 'center' }}>~30 min</div>
          </div>

          {/* Recent payouts */}
          <div style={{ fontSize: 8, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 6 }}>RECENT</div>
          {[
            { label: 'Jul 8 payout · Chase ••4821', amount: '$1,420' },
            { label: 'Jul 1 payout · Chase ••4821', amount: '$980' },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '5px 0', borderBottom: `1px solid ${COLORS.border}`,
              opacity: i === 0 ? rec1.opacity : rec2.opacity,
              transform: `translateY(${i === 0 ? rec1.translateY : rec2.translateY}px)`,
            }}>
              <span style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif' }}>{p.label}</span>
              <span style={{ fontSize: 9, color: COLORS.white, fontFamily: 'sans-serif', fontWeight: 600 }}>{p.amount}</span>
            </div>
          ))}

          <Toast startFrame={1600} icon="⚡" title="Payout Sent" body="$1,885.00 → Chase ••4821" />
        </div>
      </PhoneFrame>

      <Caption
        startFrame={START + 20}
        eyebrow="INSTANT PAYOUT"
        headline={['$1,885 hits his bank.', '30 minutes.']}
        sub="Stripe Connect · No waiting"
      />
    </div>
  );
};
