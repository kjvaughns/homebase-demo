import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_GENTLE, SPRING_SNAPPY } from '../constants';
import { ClosePanel } from '../components/ClosePanel';
import { Caption, Green } from '../components/Caption';
import { FeatherIcon } from '../components/FeatherIcon';
import { CheckmarkSVG } from '../components/CheckmarkSVG';

// Sequence-relative: 0-420 (7s)
// Real app: SimpleBookingScreen — 14-day date strip, time chips,
// "Repeat this service" toggle, "Deposit due now", "Request Appointment".

const DAYS = [
  { d: 'Wed', n: 8 },
  { d: 'Thu', n: 9 },
  { d: 'Fri', n: 10 },
  { d: 'Sat', n: 11 },
  { d: 'Sun', n: 12 },
  { d: 'Mon', n: 13 },
  { d: 'Tue', n: 14 },
];
const SELECTED_DAY = 10;
const CONFIRM_AT = 300;

export const BookingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [396, 420], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Day pop
  const dayF = frame - 70;
  const dayS = spring({ frame: dayF, fps, config: SPRING_SNAPPY });
  const dayScale = interpolate(dayS, [0, 0.6, 1], [0.6, 1.15, 1]);
  const dayOpacity = interpolate(dayF, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const timeOpacity = interpolate(frame, [110, 132], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Repeat toggle flips on
  const togF = frame - 160;
  const togS = spring({ frame: togF, fps, config: SPRING_SNAPPY });
  const knobX = interpolate(togS, [0, 1], [0, 22]);
  const togOn = togF > 8;
  const freqOpacity = interpolate(frame, [185, 207], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const depositOpacity = interpolate(frame, [215, 237], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Button tap + confirm
  const tapF = frame - CONFIRM_AT;
  const tapS = spring({ frame: tapF, fps, config: SPRING_SNAPPY });
  const tapScale = tapF >= 0 && tapF < 20 ? interpolate(tapS, [0, 0.5, 1], [1, 0.95, 1]) : 1;
  const confirmed = frame >= CONFIRM_AT + 14;
  const confOpacity = interpolate(frame, [CONFIRM_AT + 14, CONFIRM_AT + 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const panelDim = interpolate(frame, [CONFIRM_AT + 10, CONFIRM_AT + 26], [1, 0.25], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 130,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: panelDim }}>
            <ClosePanel startFrame={16} width={700} tiltX={2} tiltY={2} float={!confirmed}>
              <div
                style={{
                  background: C.card,
                  borderRadius: 28,
                  padding: '30px 34px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                }}
              >
                {/* Select Date — horizontal strip (real pattern) */}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, fontFamily: FONT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Select Date
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {DAYS.map((day) => {
                      const sel = day.n === SELECTED_DAY;
                      return (
                        <div
                          key={day.n}
                          style={{
                            flex: 1,
                            borderRadius: 16,
                            padding: '12px 0',
                            textAlign: 'center',
                            background: sel ? C.green : C.cardSecondary,
                            transform: sel ? `scale(${dayScale})` : 'none',
                            opacity: sel ? dayOpacity : 1,
                          }}
                        >
                          <div style={{ fontSize: 12, color: sel ? 'rgba(255,255,255,0.8)' : C.muted, fontFamily: FONT }}>
                            {day.d}
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: sel ? '#fff' : C.white, fontFamily: FONT, marginTop: 2 }}>
                            {day.n}
                          </div>
                          <div style={{ fontSize: 10, color: sel ? 'rgba(255,255,255,0.7)' : C.tertiary, fontFamily: FONT }}>
                            Jul
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Select Time */}
                <div style={{ opacity: timeOpacity }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, fontFamily: FONT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Select Time
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['9:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'].map((t) => {
                      const sel = t === '10:00 AM';
                      return (
                        <div
                          key={t}
                          style={{
                            padding: '12px 22px',
                            borderRadius: 14,
                            background: sel ? C.greenLight : C.cardSecondary,
                            border: sel ? `1.5px solid ${C.green}` : '1.5px solid transparent',
                            fontSize: 15,
                            fontWeight: sel ? 600 : 400,
                            color: sel ? C.green : C.muted,
                            fontFamily: FONT,
                          }}
                        >
                          {t}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Repeat this service — real toggle + frequency chips */}
                <div
                  style={{
                    background: C.cardSecondary,
                    borderRadius: 18,
                    padding: '18px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <FeatherIcon name="refresh-cw" size={18} color={C.green} />
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: C.white, fontFamily: FONT }}>
                          Repeat this service
                        </div>
                        <div style={{ fontSize: 12.5, color: C.muted, fontFamily: FONT }}>
                          Lock in regular visits on a schedule
                        </div>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div
                      style={{
                        width: 50,
                        height: 30,
                        borderRadius: 15,
                        background: togOn ? C.green : C.cardTertiary,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 3,
                          left: 3 + knobX,
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          background: '#fff',
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, opacity: freqOpacity }}>
                    {['Every 2 Weeks', 'Monthly', 'Quarterly'].map((fr) => {
                      const sel = fr === 'Every 2 Weeks';
                      return (
                        <div
                          key={fr}
                          style={{
                            padding: '8px 16px',
                            borderRadius: 12,
                            background: sel ? C.greenLight : C.card,
                            border: sel ? `1.5px solid ${C.green}` : '1.5px solid transparent',
                            fontSize: 13,
                            fontWeight: sel ? 600 : 400,
                            color: sel ? C.green : C.muted,
                            fontFamily: FONT,
                          }}
                        >
                          {fr}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Deposit line (real policy copy) */}
                <div
                  style={{
                    opacity: depositOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <FeatherIcon name="credit-card" size={17} color={C.green} />
                  <span style={{ fontSize: 14.5, color: C.muted, fontFamily: FONT }}>
                    A 25% deposit is required to confirm your booking ·{' '}
                    <span style={{ color: C.green, fontWeight: 600 }}>Deposit due now: $20.00</span>
                  </span>
                </div>

                {/* Request Appointment — real button copy, PrimaryButton style */}
                <div
                  style={{
                    opacity: depositOpacity,
                    transform: `scale(${tapScale})`,
                    background: C.green,
                    borderRadius: 14,
                    height: 58,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                    color: '#fff',
                    fontFamily: FONT,
                  }}
                >
                  Request Appointment
                </div>
              </div>
            </ClosePanel>
          </div>

          {/* Confirmation overlay */}
          {confirmed && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
                opacity: confOpacity,
              }}
            >
              <CheckmarkSVG startFrame={CONFIRM_AT + 14} size={110} />
              <div style={{ fontSize: 30, fontWeight: 800, color: C.green, fontFamily: FONT }}>
                Appointment Requested
              </div>
              <div style={{ fontSize: 15, color: C.muted, fontFamily: FONT }}>
                Thu Jul 10 · 10:00 AM · Deposit secured by Stripe
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>

      <Caption
        startFrame={40}
        eyebrow="Booked In Seconds"
        headline={
          <>
            Date. Time. Deposit. <Green>Done.</Green>
          </>
        }
        sub="Recurring visits · Deposits secured by Stripe"
      />
    </AbsoluteFill>
  );
};
