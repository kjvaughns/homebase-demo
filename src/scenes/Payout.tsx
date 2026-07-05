import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Toast } from '../components/Toast';
import { PulseRing } from '../components/PulseRing';

// Sequence-relative frames: 0-90 (global 1610-1700)
// BigText interstitial 0-30, money screen 30-90, tap at rel 50 (global 1660)

const SCREEN_AT = 30;
const TAP_AT = 50;

export const Payout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Interstitial
  const heGetsOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const amtS = spring({ frame: frame - 6, fps, config: SPRING_HEAVY });
  const amtScale = interpolate(amtS, [0, 0.7, 1], [0.7, 1.06, 1]);
  const amtOpacity = interpolate(frame, [6, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const interFade = interpolate(frame, [SCREEN_AT - 6, SCREEN_AT + 4], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Phone fades in during interstitial
  const phoneOpacity = interpolate(frame, [SCREEN_AT - 8, SCREEN_AT + 8], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const el = (delay: number) => {
    const f = frame - SCREEN_AT - delay;
    const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
    return {
      opacity: interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
      y: interpolate(s, [0, 1], [16, 0]),
    };
  };

  const balCard = el(4);
  const stats = [el(16), el(24), el(32)];
  const rows = [el(40), el(48)];

  // Balance number slam
  const balS = spring({ frame: frame - SCREEN_AT - 8, fps, config: SPRING_HEAVY });
  const balScale = interpolate(balS, [0, 1], [0.85, 1]);

  // Tap
  const tapF = frame - TAP_AT;
  const tapS = spring({ frame: tapF, fps, config: SPRING_SNAPPY });
  const tapScale = tapF >= 0 && tapF < 20 ? interpolate(tapS, [0, 0.5, 1], [1, 0.93, 1]) : 1;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Interstitial */}
      {frame < SCREEN_AT + 6 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            opacity: interFade,
            zIndex: 10,
            background: C.bg,
          }}
        >
          <div
            style={{
              opacity: heGetsOpacity,
              fontSize: 72,
              fontWeight: 900,
              color: C.white,
              fontFamily: FONT,
              letterSpacing: '-0.02em',
            }}
          >
            He gets paid.
          </div>
          <div
            style={{
              opacity: amtOpacity,
              transform: `scale(${amtScale})`,
              fontSize: 80,
              fontWeight: 900,
              color: C.green,
              fontFamily: FONT,
              letterSpacing: '-0.02em',
            }}
          >
            $1,885.00
          </div>
        </AbsoluteFill>
      )}

      <PulseRing startFrame={SCREEN_AT + 8} size={420} />

      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: 'translateY(-20px)', opacity: phoneOpacity }}>
          <PhoneFrame activeTab="Money" glowing>
            <div style={{ padding: '10px 14px', height: '100%', position: 'relative' }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT }}>Money</div>
                <div style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>Earnings &amp; Payouts</div>
              </div>

              {/* Balance card */}
              <div
                style={{
                  opacity: balCard.opacity,
                  transform: `translateY(${balCard.y}px)`,
                  background: C.greenDim,
                  border: `1px solid ${C.greenBorder}`,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    color: C.green,
                    opacity: 0.6,
                    letterSpacing: '0.15em',
                    fontFamily: FONT,
                    marginBottom: 4,
                  }}
                >
                  AVAILABLE BALANCE
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: C.green,
                    fontFamily: FONT,
                    transform: `scale(${balScale})`,
                    transformOrigin: 'left center',
                    marginBottom: 10,
                  }}
                >
                  $1,885.00
                </div>
                <div
                  style={{
                    background: C.green,
                    borderRadius: 9,
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#000',
                    fontFamily: FONT,
                    transform: `scale(${tapScale})`,
                  }}
                >
                  Instant Payout → Bank
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: C.muted,
                    textAlign: 'center',
                    fontFamily: FONT,
                    marginTop: 5,
                  }}
                >
                  Arrives in ~30 minutes
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {[
                  { v: '$6,240', l: 'July Earnings', anim: stats[0] },
                  { v: '12', l: 'Jobs Completed', anim: stats[1] },
                  { v: '$0', l: 'Overdue', anim: stats[2], check: true },
                ].map((s2) => (
                  <div
                    key={s2.l}
                    style={{
                      flex: 1,
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: '8px 9px',
                      opacity: s2.anim.opacity,
                      transform: `translateY(${s2.anim.y}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: C.white,
                        fontFamily: FONT,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      {s2.v}
                      {s2.check && <span style={{ fontSize: 8, color: C.green }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 7, color: C.muted, fontFamily: FONT, marginTop: 2 }}>{s2.l}</div>
                  </div>
                ))}
              </div>

              {/* Recent payouts */}
              <div
                style={{
                  fontSize: 8,
                  color: C.muted,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: FONT,
                  marginBottom: 6,
                }}
              >
                Recent Payouts
              </div>
              {[
                { l: 'Jul 9 · 4 jobs · Chase ••4821', v: '+$910.00 ✓', anim: rows[0] },
                { l: 'Jul 7 · 3 jobs · Chase ••4821', v: '+$640.00 ✓', anim: rows[1] },
              ].map((r) => (
                <div
                  key={r.l}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: `0.5px solid ${C.border}`,
                    opacity: r.anim.opacity,
                    transform: `translateY(${r.anim.y}px)`,
                  }}
                >
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>{r.l}</span>
                  <span style={{ fontSize: 9, color: C.green, fontFamily: FONT, fontWeight: 600 }}>{r.v}</span>
                </div>
              ))}

              <Toast
                startFrame={TAP_AT + 8}
                icon="⚡"
                title="Payout Initiated"
                body="$1,885.00 → Chase ••4821 · Arrives ~3:19 PM"
              />
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
