import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING } from '../constants';

interface CaptionProps {
  startFrame: number;
  eyebrow: string;
  headline: string[];
  sub?: string;
}

const useEntrance = (startFrame: number, delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame - delay;
  const s = spring({ frame: f, fps, config: SPRING });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(s, [0, 1], [14, 0]);
  return { opacity, translateY };
};

export const Caption: React.FC<CaptionProps> = ({ startFrame, eyebrow, headline, sub }) => {
  const eyebrowAnim = useEntrance(startFrame, 0);
  const h1Anim = useEntrance(startFrame, 6);
  const h2Anim = useEntrance(startFrame, 12);
  const subAnim = useEntrance(startFrame, 18);

  const renderLine = (text: string, anim: { opacity: number; translateY: number }, fontSize: number, weight: number) => {
    const parts = text.split(/(<green>.*?<\/green>)/g);
    return (
      <div
        style={{
          opacity: anim.opacity,
          transform: `translateY(${anim.translateY}px)`,
          fontSize,
          fontWeight: weight,
          color: COLORS.white,
          fontFamily: 'sans-serif',
          lineHeight: 1.25,
        }}
      >
        {parts.map((part, i) => {
          if (part.startsWith('<green>')) {
            return (
              <span key={i} style={{ color: COLORS.green }}>
                {part.replace(/<\/?green>/g, '')}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  const lineAnims = [h1Anim, h2Anim];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <div
        style={{
          opacity: eyebrowAnim.opacity,
          transform: `translateY(${eyebrowAnim.translateY}px)`,
          fontSize: 10,
          color: COLORS.green,
          fontFamily: 'sans-serif',
          letterSpacing: 3,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {eyebrow}
      </div>
      {headline.map((line, i) =>
        renderLine(line, lineAnims[i] ?? h2Anim, 22, 800)
      )}
      {sub && (
        <div
          style={{
            opacity: subAnim.opacity,
            transform: `translateY(${subAnim.translateY}px)`,
            fontSize: 11,
            color: COLORS.muted,
            fontFamily: 'sans-serif',
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};
