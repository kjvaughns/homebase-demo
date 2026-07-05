import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';

interface BigTextProps {
  startFrame: number;
  primary: string;
  primarySize?: number;
  primaryColor?: string;
  secondary?: string;
  secondaryDelay?: number;
}

export const BigText: React.FC<BigTextProps> = ({
  startFrame,
  primary,
  primarySize = 80,
  primaryColor = C.white,
  secondary,
  secondaryDelay = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const s = spring({ frame: f, fps, config: SPRING_HEAVY });
  const scale = interpolate(s, [0, 1], [0.88, 1]);
  const opacity = interpolate(f, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const sf = f - secondaryDelay;
  const secOpacity = interpolate(sf, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontSize: primarySize,
          fontWeight: 900,
          color: primaryColor,
          fontFamily: FONT,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        {primary}
      </div>
      {secondary && (
        <div
          style={{
            opacity: secOpacity,
            fontSize: 20,
            fontWeight: 300,
            color: C.muted,
            letterSpacing: '0.05em',
            fontFamily: FONT,
          }}
        >
          {secondary}
        </div>
      )}
    </div>
  );
};
