import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';

const START = FRAMES.s5;

interface BubbleProps {
  text: string;
  outgoing: boolean;
  delay: number;
}

const Bubble: React.FC<BubbleProps> = ({ text, outgoing, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - START - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(s, [0, 1], [10, 0]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: outgoing ? 'flex-end' : 'flex-start',
      opacity,
      transform: `translateY(${translateY}px)`,
    }}>
      <div style={{
        maxWidth: '75%',
        background: outgoing ? COLORS.green : COLORS.card,
        border: outgoing ? 'none' : `1px solid ${COLORS.border}`,
        borderRadius: outgoing ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
        padding: '7px 10px',
        fontSize: 9,
        color: outgoing ? '#000' : COLORS.white,
        fontFamily: 'sans-serif',
        lineHeight: 1.4,
        fontWeight: outgoing ? 600 : 400,
      }}>
        {text}
      </div>
    </div>
  );
};

export const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s6 - 20, FRAMES.s6], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <PhoneFrame activeTab="Messages">
        <div style={{ padding: '10px 14px', height: '100%' }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
            paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              background: COLORS.greenDim, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 12,
            }}>🌿</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>
                Marcus's Lawn Co.
              </div>
              <div style={{ fontSize: 8, color: COLORS.green, fontFamily: 'sans-serif' }}>● Online</div>
            </div>
          </div>

          {/* Bubbles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Bubble text="Confirmed for Thu Jul 10 at 10am! 🌿" outgoing={false} delay={10} />
            <Bubble text="Gate code is 4821. Dog's friendly 😄" outgoing={true} delay={22} />
            <Bubble text="I'll send before & after photos 📸" outgoing={false} delay={34} />
            <Bubble text="Job complete ✅ Invoice sent — $48.75 remaining" outgoing={false} delay={46} />
          </div>
        </div>
      </PhoneFrame>

      <Caption
        startFrame={START + 20}
        eyebrow="NO PHONE TAG"
        headline={['Gate code. Photos.', 'Invoice. One thread.']}
        sub="Real-time messaging built in"
      />
    </div>
  );
};
