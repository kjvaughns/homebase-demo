import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';

const START = FRAMES.s3;

const useAnim = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - START - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(s, [0, 1], [12, 0]);
  return { opacity, translateY };
};

export const Marketplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s4 - 20, FRAMES.s4], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const card1 = useAnim(20);
  const card2 = useAnim(30);

  const searchS = spring({ frame: frame - START - 10, fps, config: SPRING });
  const searchOpacity = interpolate(frame - START - 10, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <PhoneFrame activeTab="Explore">
        <div style={{ padding: '10px 14px', height: '100%' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif', marginBottom: 10 }}>
            Find Services
          </div>

          {/* Search */}
          <div style={{
            opacity: searchOpacity,
            transform: `translateY(${interpolate(searchS, [0, 1], [8, 0])})`,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: '8px 12px',
            fontSize: 10,
            color: COLORS.muted,
            fontFamily: 'sans-serif',
            marginBottom: 14,
          }}>
            🔍 Lawn care near Dallas...
          </div>

          {/* Card 1 */}
          <div style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.greenBorder}`,
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 8,
            opacity: card1.opacity,
            transform: `translateY(${card1.translateY}px)`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>
                  🌿 Marcus's Lawn Co.
                </div>
                <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif', marginTop: 2 }}>
                  ★★★★★ 4.9 · 127 reviews
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, fontFamily: 'sans-serif' }}>$65</div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {['Lawn Care', 'Edging', 'Cleanup'].map(tag => (
                <div key={tag} style={{
                  background: COLORS.greenDim, border: `1px solid ${COLORS.greenBorder}`,
                  borderRadius: 4, padding: '2px 6px',
                  fontSize: 7, color: COLORS.green, fontFamily: 'sans-serif',
                }}>{tag}</div>
              ))}
            </div>
            <div style={{
              background: COLORS.green, borderRadius: 8,
              padding: '6px', textAlign: 'center',
              fontSize: 9, fontWeight: 700, color: '#000', fontFamily: 'sans-serif',
            }}>
              Book Now
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: '10px 12px',
            opacity: card2.opacity,
            transform: `translateY(${card2.translateY}px)`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>
                  🏠 ProClean Services
                </div>
                <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif', marginTop: 2 }}>
                  ★★★★☆ 4.7 · 89 reviews
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>$120</div>
            </div>
          </div>
        </div>
      </PhoneFrame>

      <Caption
        startFrame={START + 20}
        eyebrow="THE MARKETPLACE"
        headline={['A homeowner finds Marcus', 'in 30 seconds.']}
        sub="Free for homeowners · forever"
      />
    </div>
  );
};
