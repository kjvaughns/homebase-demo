import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_GENTLE, SPRING_SNAPPY } from '../constants';
import { ClosePanel } from '../components/ClosePanel';
import { Caption, Green } from '../components/Caption';

// Sequence-relative: 0-270 (4.5s)
// Real app: Business Insights — "Revenue, last 8 weeks" bar chart + stat tiles w/ deltas.

const BARS = [42, 58, 50, 72, 66, 88, 79, 100]; // % heights
const TILES = [
  { label: 'Revenue MTD', value: '$6,240', delta: '+18%' },
  { label: 'Jobs Completed', value: '32', delta: '+12%' },
  { label: 'Active Clients', value: '24', delta: '+4' },
  { label: 'Avg Job Value', value: '$195', delta: '+9%' },
];

export const InsightsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [246, 270], [1, 0], {
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
        <ClosePanel startFrame={12} width={760} tiltX={2} tiltY={2}>
          <div
            style={{
              background: C.card,
              borderRadius: 28,
              padding: '30px 34px',
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
            }}
          >
            <div>
              <div style={{ fontSize: 21, fontWeight: 600, color: C.white, fontFamily: FONT }}>
                Business Insights
              </div>
              <div style={{ fontSize: 14, color: C.muted, fontFamily: FONT, marginTop: 3 }}>
                Revenue, last 8 weeks
              </div>
            </div>

            {/* Bar chart — bars grow with stagger */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 190, padding: '0 6px' }}>
              {BARS.map((h, i) => {
                const f = frame - 44 - i * 6;
                const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
                const grow = interpolate(s, [0, 1], [0, 1]);
                const isPeak = i === BARS.length - 1;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      height: '100%',
                      gap: 8,
                    }}
                  >
                    {isPeak && (
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.green,
                          fontFamily: FONT,
                          opacity: interpolate(f, [14, 28], [0, 1], {
                            extrapolateRight: 'clamp',
                            extrapolateLeft: 'clamp',
                          }),
                        }}
                      >
                        $1,840
                      </div>
                    )}
                    <div
                      style={{
                        width: '100%',
                        height: `${h * grow * 0.82}%`,
                        borderRadius: 8,
                        background: isPeak ? C.green : C.greenLight,
                        border: isPeak ? 'none' : '1px solid rgba(56,174,95,0.25)',
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Stat tiles w/ deltas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14 }}>
              {TILES.map((t, i) => {
                const f = frame - 110 - i * 9;
                const s = spring({ frame: f, fps, config: SPRING_GENTLE });
                const opacity = interpolate(f, [0, 18], [0, 1], {
                  extrapolateRight: 'clamp',
                  extrapolateLeft: 'clamp',
                });
                return (
                  <div
                    key={t.label}
                    style={{
                      background: C.cardSecondary,
                      borderRadius: 18,
                      padding: '16px 18px',
                      opacity,
                      transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: FONT }}>
                      {t.value}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT, marginTop: 3 }}>{t.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.green, fontFamily: FONT, marginTop: 6 }}>
                      ↑ {t.delta}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ClosePanel>
      </AbsoluteFill>

      <Caption
        startFrame={70}
        eyebrow="Know Your Numbers"
        headline={
          <>
            Revenue, jobs, trends — <Green>tracked for you.</Green>
          </>
        }
        sub="Live insights from every completed job"
      />
    </AbsoluteFill>
  );
};
