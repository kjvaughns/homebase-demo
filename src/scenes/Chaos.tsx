import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY, SPRING_GENTLE } from '../constants';
import { StrikethroughLine } from '../components/StrikethroughLine';

// Sequence-relative frames: 0-200
const WORDS = [
  { text: 'Chasing invoices.', color: C.white },
  { text: 'Missed follow-ups.', color: C.white },
  { text: 'No-show clients.', color: C.white },
  { text: '5 different apps.', color: C.white },
  { text: 'Zero recurring revenue.', color: C.red },
];

const WORD_HOLD = 22; // frames per word
const WORDS_START = 4;
const LIST_START = WORDS_START + WORDS.length * WORD_HOLD; // 114
const STRIKE_START = LIST_START + 40; // 154
const CLOSER_START = STRIKE_START + 14; // 168

const SlamWord: React.FC<{ text: string; color: string; startFrame: number }> = ({
  text,
  color,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;
  if (f < 0 || f >= WORD_HOLD) return null;

  const s = spring({ frame: f, fps, config: SPRING_HEAVY });
  const scale = interpolate(s, [0, 1], [0.85, 1]);
  const inOpacity = interpolate(f, [0, 6], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const outOpacity = interpolate(f, [WORD_HOLD - 5, WORD_HOLD - 1], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          opacity: Math.min(inOpacity, outOpacity),
          transform: `scale(${scale})`,
          fontSize: 52,
          fontWeight: 800,
          color,
          fontFamily: FONT,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const closerF = frame - CLOSER_START;
  const closerS = spring({ frame: closerF, fps, config: SPRING_GENTLE });
  const closerY = interpolate(closerS, [0, 1], [16, 0]);
  const closerOpacity = interpolate(closerF, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Faint noise texture substitute: very subtle radial vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)',
        }}
      />

      {/* Rapid-fire words */}
      {WORDS.map((w, i) => (
        <SlamWord key={i} text={w.text} color={w.color} startFrame={WORDS_START + i * WORD_HOLD} />
      ))}

      {/* Stacked list + strikethrough + closer */}
      {frame >= LIST_START && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {WORDS.map((w, i) => {
              const itemF = frame - LIST_START - i * 6;
              const itemOpacity = interpolate(itemF, [0, 12], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    fontSize: 18,
                    color: C.muted,
                    fontFamily: FONT,
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  <span style={{ color: C.red, marginRight: 10 }}>—</span>
                  {w.text}
                  <StrikethroughLine startFrame={STRIKE_START} width={w.text.length * 9 + 30} />
                </div>
              );
            })}
          </div>

          <div
            style={{
              opacity: closerOpacity,
              transform: `translateY(${closerY}px)`,
              fontSize: 32,
              color: C.green,
              fontWeight: 700,
              fontFamily: FONT,
              marginTop: 28,
            }}
          >
            HomeBase fixes all of it.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
