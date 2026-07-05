import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_GENTLE } from '../constants';

interface CaptionProps {
  startFrame: number;
  eyebrow: string;
  headline?: React.ReactNode;
  sub?: string;
}

const useEntrance = (startFrame: number, delay: number, dist: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame - delay;
  const s = spring({ frame: f, fps, config: SPRING_GENTLE });
  const opacity = interpolate(f, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const translateY = interpolate(s, [0, 1], [dist, 0]);
  return { opacity, translateY };
};

export const Caption: React.FC<CaptionProps> = ({ startFrame, eyebrow, headline, sub }) => {
  const eyebrowAnim = useEntrance(startFrame, 0, 10);
  const headAnim = useEntrance(startFrame, 8, 16);
  const subAnim = useEntrance(startFrame, 18, 0);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 52,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          opacity: eyebrowAnim.opacity,
          transform: `translateY(${eyebrowAnim.translateY}px)`,
          fontSize: 9,
          letterSpacing: '0.22em',
          color: C.green,
          textTransform: 'uppercase',
          fontFamily: FONT,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      {headline && (
        <div
          style={{
            opacity: headAnim.opacity,
            transform: `translateY(${headAnim.translateY}px)`,
            fontSize: 28,
            fontWeight: 800,
            color: C.white,
            lineHeight: 1.15,
            maxWidth: 700,
            textAlign: 'center',
            fontFamily: FONT,
          }}
        >
          {headline}
        </div>
      )}
      {sub && (
        <div
          style={{
            opacity: subAnim.opacity,
            fontSize: 12,
            color: C.muted,
            marginTop: 8,
            fontFamily: FONT,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

export const Green: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.green }}>{children}</span>
);
