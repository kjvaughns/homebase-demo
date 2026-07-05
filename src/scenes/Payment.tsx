import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_SNAPPY } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { CheckmarkSVG } from '../components/CheckmarkSVG';

// Sequence-relative frames: 0-70 (global 1540-1610)
// Apple Pay sheet at rel 50 (global 1590)

const SHEET_AT = 30;
const PAID_AT = 52;

export const Payment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone recenters
  const shiftS = spring({ frame, fps, config: SPRING_HEAVY });
  const phoneX = interpolate(shiftS, [0, 1], [-280, 0]);

  const screenIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Apple Pay sheet
  const sheetF = frame - SHEET_AT;
  const sheetS = spring({ frame: sheetF, fps, config: SPRING_SNAPPY });
  const sheetY = interpolate(sheetS, [0, 1], [200, 0]);
  const sheetVisible = sheetF >= 0 && frame < PAID_AT + 4;

  // Paid state
  const paidF = frame - PAID_AT;
  const paid = paidF >= 0;
  const paidS = spring({ frame: paidF, fps, config: SPRING_SNAPPY });
  const paidScale = interpolate(paidS, [0, 1], [0.85, 1]);
  const paidOpacity = interpolate(paidF, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const lineItem = (delay: number) =>
    interpolate(frame - delay, [0, 12], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translate(${phoneX}px, -20px)` }}>
          <PhoneFrame activeTab="Money">
            <div style={{ padding: '10px 14px', height: '100%', position: 'relative', opacity: screenIn }}>
              {!paid ? (
                <>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.white, fontFamily: FONT, marginBottom: 10 }}>
                    Invoice #HB-2847 · Marcus's Lawn Co.
                  </div>

                  {/* Amount block */}
                  <div
                    style={{
                      background: C.greenDim,
                      borderRadius: 10,
                      padding: 16,
                      marginBottom: 12,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 28, fontWeight: 900, color: C.green, fontFamily: FONT }}>$60.00</div>
                    <div
                      style={{
                        fontSize: 8,
                        color: C.green,
                        opacity: 0.6,
                        letterSpacing: '0.15em',
                        fontFamily: FONT,
                        marginTop: 3,
                      }}
                    >
                      BALANCE DUE
                    </div>
                  </div>

                  {/* Line items */}
                  {[
                    { label: 'Service: Lawn Care + Edging', value: '$80.00', color: C.white, d: 8 },
                    { label: 'Deposit paid', value: '-$20.00', color: C.green, d: 16 },
                    { label: 'Balance', value: '$60.00', color: C.white, d: 24, bold: true },
                  ].map((li) => (
                    <div
                      key={li.label}
                      style={{
                        opacity: lineItem(li.d),
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 0',
                        borderBottom: `0.5px solid ${C.border}`,
                      }}
                    >
                      <span style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>{li.label}</span>
                      <span
                        style={{
                          fontSize: li.bold ? 10 : 9,
                          color: li.color,
                          fontFamily: FONT,
                          fontWeight: li.bold ? 700 : 500,
                        }}
                      >
                        {li.value}
                      </span>
                    </div>
                  ))}

                  {/* Apple Pay button */}
                  <div
                    style={{
                      marginTop: 14,
                      background: C.white,
                      borderRadius: 10,
                      padding: '9px',
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#000',
                      fontFamily: FONT,
                    }}
                  >
                    Pay $60.00 with Apple Pay 🍎
                  </div>

                  {/* Apple Pay sheet */}
                  {sheetVisible && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: '#161616',
                        borderRadius: '18px 18px 0 0',
                        border: `0.5px solid ${C.borderLight}`,
                        padding: '18px 16px 24px',
                        transform: `translateY(${sheetY}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {/* Face ID scanning arcs */}
                      <svg width="36" height="36" viewBox="0 0 36 36">
                        <path
                          d="M 6 12 A 14 14 0 0 1 30 12"
                          fill="none"
                          stroke={C.green}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="40"
                          strokeDashoffset={interpolate(sheetF, [6, 18], [40, 0], {
                            extrapolateRight: 'clamp',
                            extrapolateLeft: 'clamp',
                          })}
                        />
                        <path
                          d="M 30 24 A 14 14 0 0 1 6 24"
                          fill="none"
                          stroke={C.green}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="40"
                          strokeDashoffset={interpolate(sheetF, [10, 22], [40, 0], {
                            extrapolateRight: 'clamp',
                            extrapolateLeft: 'clamp',
                          })}
                        />
                      </svg>
                      <div style={{ fontSize: 10, color: C.white, fontFamily: FONT, fontWeight: 600 }}>
                        Confirm with Face ID
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* PAID state */
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: C.greenDim,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    opacity: paidOpacity,
                  }}
                >
                  <CheckmarkSVG startFrame={PAID_AT} size={64} />
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      color: C.green,
                      fontFamily: FONT,
                      transform: `scale(${paidScale})`,
                    }}
                  >
                    $60.00 Paid
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: FONT }}>
                    Sent to Marcus · July 10, 2026 3:48 PM
                  </div>
                </div>
              )}
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption
        startFrame={6}
        eyebrow="THE HOMEOWNER SIDE"
        headline={<>Two taps. Paid.</>}
        sub="Apple Pay · Stripe · Instant"
      />
    </AbsoluteFill>
  );
};
