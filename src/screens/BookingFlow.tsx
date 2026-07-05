import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';
import { Caption } from '../components/Caption';
import { Toast } from '../components/Toast';

const START = FRAMES.s4;

const DAYS = [6, 7, 8, 9, 10, 11, 12, 13];

export const BookingFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [START, START + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const fadeOut = interpolate(frame, [FRAMES.s5 - 20, FRAMES.s5], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const calF = frame - START - 15;
  const calS = spring({ frame: calF, fps, config: SPRING });
  const calOpacity = interpolate(calF, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const day10F = frame - START - 40;
  const day10S = spring({ frame: day10F, fps, config: SPRING });
  const day10Scale = interpolate(day10S, [0, 1], [0.6, 1]);
  const day10Opacity = interpolate(day10F, [0, 14], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const timesF = frame - START - 60;
  const timesS = spring({ frame: timesF, fps, config: SPRING });
  const timesOpacity = interpolate(timesF, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const timesY = interpolate(timesS, [0, 1], [8, 0]);

  const summaryF = frame - START - 80;
  const summaryS = spring({ frame: summaryF, fps, config: SPRING });
  const summaryOpacity = interpolate(summaryF, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const summaryY = interpolate(summaryS, [0, 1], [10, 0]);

  // Pulse on confirm button
  const pulseF = (frame - START - 100) % 60;
  const pulseOpacity = interpolate(pulseF, [0, 30, 60], [0.6, 1, 0.6], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: sceneOpacity, position: 'relative',
    }}>
      <PhoneFrame activeTab="Calendar">
        <div style={{ padding: '10px 14px', height: '100%', position: 'relative' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif', marginBottom: 8 }}>
            Book Service
          </div>

          {/* Calendar header */}
          <div style={{
            opacity: calOpacity,
            transform: `translateY(${interpolate(calS, [0, 1], [8, 0])})`,
            marginBottom: 8,
          }}>
            <div style={{ fontSize: 10, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 6 }}>July 2026</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {DAYS.map(d => {
                const isSelected = d === 10;
                return (
                  <div key={d} style={{
                    width: 30, height: 30, borderRadius: 15,
                    background: isSelected ? 'transparent' : COLORS.card,
                    border: isSelected ? 'none' : `1px solid ${COLORS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: isSelected ? '#000' : COLORS.muted,
                    fontFamily: 'sans-serif', fontWeight: isSelected ? 700 : 400,
                    position: 'relative', overflow: 'visible',
                  }}>
                    {isSelected && (
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: 15,
                        background: COLORS.green,
                        transform: `scale(${day10Scale})`,
                        opacity: day10Opacity,
                      }} />
                    )}
                    <span style={{ position: 'relative', zIndex: 1, color: isSelected ? '#000' : COLORS.muted }}>
                      {d}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div style={{
            opacity: timesOpacity,
            transform: `translateY(${timesY}px)`,
            display: 'flex', gap: 6, marginBottom: 10,
          }}>
            {['9:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'].map(t => (
              <div key={t} style={{
                padding: '5px 8px', borderRadius: 8,
                background: t === '10:00 AM' ? COLORS.green : COLORS.card,
                border: `1px solid ${t === '10:00 AM' ? COLORS.green : COLORS.border}`,
                fontSize: 8, fontFamily: 'sans-serif',
                color: t === '10:00 AM' ? '#000' : COLORS.muted,
                fontWeight: t === '10:00 AM' ? 700 : 400,
              }}>{t}</div>
            ))}
          </div>

          {/* Summary card */}
          <div style={{
            opacity: summaryOpacity,
            transform: `translateY(${summaryY}px)`,
            background: COLORS.card,
            border: `1px solid ${COLORS.greenBorder}`,
            borderRadius: 10,
            padding: '8px 10px',
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: 'sans-serif', marginBottom: 2 }}>Booking Summary</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.white, fontFamily: 'sans-serif' }}>Lawn Care · Jul 10 · 10:00 AM</div>
            <div style={{ fontSize: 9, color: COLORS.green, fontFamily: 'sans-serif', marginTop: 2 }}>$16.25 deposit</div>
          </div>

          {/* CTA */}
          <div style={{
            background: COLORS.green,
            borderRadius: 10,
            padding: '8px',
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: '#000',
            fontFamily: 'sans-serif',
            opacity: frame - START > 100 ? pulseOpacity : 0,
          }}>
            Confirm &amp; Pay Deposit →
          </div>

          <Toast
            startFrame={980}
            icon="🎉"
            title="Booking Confirmed!"
            body="Marcus's Lawn Co. · Jul 10 · 10:00 AM"
          />
        </div>
      </PhoneFrame>

      <Caption
        startFrame={START + 20}
        eyebrow="INSTANT BOOKING"
        headline={['Pick a time.', 'Deposit captured. Done.']}
        sub="No calls. No back-and-forth."
      />
    </div>
  );
};
