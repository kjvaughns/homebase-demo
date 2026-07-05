import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_SNAPPY, SPRING_GENTLE } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { Toast } from '../components/Toast';
import { CheckmarkSVG } from '../components/CheckmarkSVG';

// Sequence-relative frames: 0-240 (global 1100-1340)
// Tap+confirm at rel 180 (global 1280); toast rel 190 (global 1290)

const CONFIRM_AT = 180;

const CAL_DAYS = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
];
const JOB_DAYS = [8, 9, 11];

export const BookingFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides back to center
  const shiftS = spring({ frame, fps, config: SPRING_HEAVY });
  const phoneX = interpolate(shiftS, [0, 1], [-280, 0]);

  const screenIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Elements
  const svcOpacity = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const edgingCheckOpacity = interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const calOpacity = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Day 10 pop
  const dayF = frame - 60;
  const dayS = spring({ frame: dayF, fps, config: SPRING_SNAPPY });
  const dayScale = interpolate(dayS, [0, 0.6, 1], [0, 1.3, 1]);

  const slotsOpacity = interpolate(frame, [76, 92], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Summary springs up
  const sumF = frame - 96;
  const sumS = spring({ frame: sumF, fps, config: SPRING_GENTLE });
  const sumY = interpolate(sumS, [0, 1], [30, 0]);
  const sumOpacity = interpolate(sumF, [0, 16], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Pulsing pay button
  const pulse = 1 + 0.02 * Math.sin((frame * 2 * Math.PI) / 60);
  // Tap
  const tapF = frame - CONFIRM_AT;
  const tapS = spring({ frame: tapF, fps, config: SPRING_SNAPPY });
  const tapScale = tapF >= 0 && tapF < 20 ? interpolate(tapS, [0, 0.5, 1], [1, 0.93, 1]) : 1;

  // Flash
  const flash =
    tapF >= 0 && tapF < 8
      ? interpolate(tapF, [0, 4, 8], [1, 0.7, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
      : 1;

  // Confirmation state
  const confF = frame - CONFIRM_AT - 8;
  const confirmed = confF >= 0;
  const confS = spring({ frame: confF, fps, config: SPRING_SNAPPY });
  const confScale = interpolate(confS, [0, 1], [0.8, 1]);
  const confOpacity = interpolate(confF, [0, 12], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translate(${phoneX}px, -20px)` }}>
          <PhoneFrame activeTab="Calendar">
            <div style={{ padding: '10px 14px', height: '100%', position: 'relative', opacity: screenIn * flash }}>
              {!confirmed ? (
                <>
                  {/* Progress */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[true, true, false].map((on, i) => (
                        <div
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            background: on ? C.green : C.faint,
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>Step 2 of 3</span>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 700, color: C.white, fontFamily: FONT, marginBottom: 8 }}>
                    Book Marcus's Lawn Co.
                  </div>

                  {/* Service card */}
                  <div
                    style={{
                      opacity: svcOpacity,
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 11,
                      padding: '8px 10px',
                      marginBottom: 9,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.white, fontFamily: FONT }}>
                      🌿 Lawn Care — Standard
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                      <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>
                        <span style={{ color: C.green, opacity: edgingCheckOpacity }}>☑</span> Edging +$15
                      </span>
                      <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>☐ Leaf Cleanup +$20</span>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div style={{ opacity: calOpacity, marginBottom: 8 }}>
                    <div
                      style={{
                        fontSize: 8,
                        color: C.muted,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontFamily: FONT,
                        marginBottom: 5,
                      }}
                    >
                      Select a Date — July 2026
                    </div>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                        <div
                          key={d}
                          style={{
                            width: 30,
                            textAlign: 'center',
                            fontSize: 8,
                            color: C.muted,
                            fontFamily: FONT,
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                    {CAL_DAYS.map((week, wi) => (
                      <div key={wi} style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
                        {week.map((d, di) => {
                          const isSelected = d === 10;
                          const isPast = d !== null && d < 8;
                          const hasJob = d !== null && JOB_DAYS.includes(d);
                          return (
                            <div
                              key={di}
                              style={{
                                width: 30,
                                height: 30,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                              }}
                            >
                              {isSelected && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    inset: 2,
                                    borderRadius: 13,
                                    background: C.green,
                                    transform: `scale(${dayScale})`,
                                  }}
                                />
                              )}
                              <span
                                style={{
                                  position: 'relative',
                                  fontSize: 9,
                                  fontFamily: FONT,
                                  fontWeight: isSelected ? 700 : 400,
                                  color: isSelected ? '#000' : isPast ? C.faint : '#999',
                                }}
                              >
                                {d ?? ''}
                              </span>
                              {hasJob && !isSelected && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 3,
                                    width: 3,
                                    height: 3,
                                    borderRadius: 2,
                                    background: C.green,
                                    opacity: 0.6,
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Time slots */}
                  <div style={{ opacity: slotsOpacity, marginBottom: 9 }}>
                    <div
                      style={{
                        fontSize: 8,
                        color: C.muted,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontFamily: FONT,
                        marginBottom: 5,
                      }}
                    >
                      Select a Time
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'].map((t) => {
                        const sel = t === '10:00 AM';
                        return (
                          <div
                            key={t}
                            style={{
                              fontSize: 8,
                              padding: '5px 7px',
                              borderRadius: 8,
                              background: sel ? C.greenDim : C.card,
                              border: `1px solid ${sel ? C.green : C.border}`,
                              color: sel ? C.green : C.muted,
                              fontFamily: FONT,
                              fontWeight: sel ? 700 : 400,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  <div
                    style={{
                      opacity: sumOpacity,
                      transform: `translateY(${sumY}px)`,
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 11,
                      padding: '8px 10px',
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ fontSize: 9, fontWeight: 600, color: C.white, fontFamily: FONT }}>
                      Marcus's Lawn Co. · Lawn Care + Edging
                    </div>
                    <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT, marginTop: 2 }}>
                      Thu Jul 10, 2026 · 10:00 AM · ~2 hours
                    </div>
                    <div style={{ height: 0.5, background: C.border, margin: '6px 0' }} />
                    <div style={{ textAlign: 'right', fontSize: 8, color: C.muted, fontFamily: FONT }}>
                      Subtotal: $80.00
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 9, color: C.amber, fontFamily: FONT, marginTop: 2 }}>
                      Deposit (25%): $20.00
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 8, color: C.muted, fontFamily: FONT, marginTop: 2 }}>
                      Balance due after: $60.00
                    </div>
                  </div>

                  {/* Pay button */}
                  <div
                    style={{
                      background: C.green,
                      borderRadius: 10,
                      padding: '8px',
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#000',
                      fontFamily: FONT,
                      boxShadow: '0 0 20px rgba(34,197,94,0.3)',
                      transform: `scale(${pulse * tapScale})`,
                      opacity: sumOpacity,
                    }}
                  >
                    Confirm &amp; Pay $20.00 →
                  </div>
                </>
              ) : (
                /* Confirmation state */
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    opacity: confOpacity,
                  }}
                >
                  <CheckmarkSVG startFrame={CONFIRM_AT + 8} size={72} />
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: C.green,
                      fontFamily: FONT,
                      transform: `scale(${confScale})`,
                    }}
                  >
                    Booking Confirmed!
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, fontFamily: FONT }}>
                    Thu Jul 10 · 10:00 AM · Marcus's Lawn Co.
                  </div>
                  <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>
                    $20.00 deposit charged to Visa ••4821
                  </div>
                </div>
              )}

              <Toast
                startFrame={190}
                icon="🎉"
                title="You're booked!"
                body="Marcus's Lawn Co. · Jul 10 · 10am · Confirmation #HB-8821"
              />
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption
        startFrame={24}
        eyebrow="INSTANT BOOKING"
        headline={<>No calls. No texts. Just tap.</>}
        sub="25% deposit captured instantly · Stripe-secured"
      />
    </AbsoluteFill>
  );
};
