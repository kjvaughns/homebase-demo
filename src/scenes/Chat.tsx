import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';

// Sequence-relative frames: 0-200 (global 1340-1540)

const ROTATING = ['Gate code.', 'Before & after.', 'Invoice sent.'];
const ROTATE_START = 20;
const ROTATE_HOLD = 20;
const SETTLE_START = ROTATE_START + ROTATING.length * ROTATE_HOLD; // 80

interface MsgProps {
  delay: number;
  outgoing?: boolean;
  invoice?: boolean;
  photo?: boolean;
  children: React.ReactNode;
}

const Msg: React.FC<MsgProps> = ({ delay, outgoing, invoice, photo, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
  const opacity = interpolate(f, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const y = interpolate(s, [0, 1], [12, 0]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: outgoing ? 'flex-end' : 'flex-start',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {photo ? (
        <div
          style={{
            width: 120,
            height: 70,
            background: '#181818',
            border: `0.5px solid ${C.border}`,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <span style={{ fontSize: 18 }}>📸</span>
          <span style={{ fontSize: 7, color: C.muted, fontFamily: FONT }}>{children}</span>
        </div>
      ) : (
        <div
          style={{
            maxWidth: '78%',
            background: invoice ? C.greenDim : outgoing ? C.green : '#151515',
            borderLeft: invoice ? `2px solid ${C.green}` : 'none',
            borderRadius: outgoing ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
            padding: '7px 10px',
            fontSize: 9,
            color: outgoing ? '#000' : invoice ? C.green : C.white,
            fontFamily: FONT,
            lineHeight: 1.4,
            fontWeight: outgoing || invoice ? 600 : 400,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone shifts left
  const shiftS = spring({ frame, fps, config: SPRING_HEAVY });
  const phoneX = interpolate(shiftS, [0, 1], [0, -280]);

  const screenIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Settled line
  const settleF = frame - SETTLE_START;
  const settleS = spring({ frame: settleF, fps, config: SPRING_HEAVY });
  const settleScale = interpolate(settleS, [0, 1], [0.9, 1]);
  const settleOpacity = interpolate(settleF, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translate(${phoneX}px, -20px)` }}>
          <PhoneFrame activeTab="Messages">
            <div
              style={{
                padding: '8px 12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: screenIn,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingBottom: 8,
                  borderBottom: `0.5px solid ${C.border}`,
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 12, color: C.muted }}>‹</span>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    background: C.greenDim,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                  }}
                >
                  🌿
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                    Marcus's Lawn Co.
                  </div>
                  <div style={{ fontSize: 7, color: C.green, fontFamily: FONT }}>● Online now</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <Msg delay={14}>Confirmed for Thu Jul 10 at 10am! See you then 🌿</Msg>
                <Msg delay={28} outgoing>
                  Perfect! Gate code is 4821, dog is friendly 😄
                </Msg>
                <Msg delay={42}>On my way! About 10 minutes out 🚗</Msg>
                <Msg delay={56} photo>
                  Before photo
                </Msg>
                <Msg delay={70} photo>
                  After photo
                </Msg>
                <Msg delay={84}>All done! Lawn looks great ✅</Msg>
                <Msg delay={100} invoice>
                  💰 Invoice sent — $60.00 remaining · Tap to pay
                </Msg>
              </div>

              {/* Composer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  background: C.card,
                  border: `0.5px solid ${C.border}`,
                  borderRadius: 16,
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 10 }}>🎤</span>
                <span style={{ fontSize: 10 }}>📷</span>
                <div style={{ flex: 1, fontSize: 9, color: C.faint, fontFamily: FONT }}>Message...</div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: C.green,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    color: '#000',
                  }}
                >
                  ↑
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      {/* Right-side rotating lines */}
      <div
        style={{
          position: 'absolute',
          right: 180,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {ROTATING.map((line, i) => {
          const f = frame - ROTATE_START - i * ROTATE_HOLD;
          if (f < 0 || f >= ROTATE_HOLD) return null;
          const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
          const y = interpolate(s, [0, 1], [20, 0]);
          const inOp = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          const outOp = interpolate(f, [ROTATE_HOLD - 5, ROTATE_HOLD - 1], [1, 0], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });
          return (
            <div
              key={line}
              style={{
                position: 'absolute',
                opacity: Math.min(inOp, outOp),
                transform: `translateY(${y}px)`,
                fontSize: 44,
                fontWeight: 800,
                color: C.white,
                fontFamily: FONT,
                whiteSpace: 'nowrap',
              }}
            >
              {line}
            </div>
          );
        })}
        {frame >= SETTLE_START && (
          <div
            style={{
              position: 'absolute',
              opacity: settleOpacity,
              transform: `scale(${settleScale})`,
              fontSize: 40,
              fontWeight: 800,
              color: C.green,
              fontFamily: FONT,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Everything
            <br />
            in one thread.
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
