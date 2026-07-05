import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING } from '../constants';

interface ToastProps {
  startFrame: number;
  icon: string;
  title: string;
  body: string;
}

export const Toast: React.FC<ToastProps> = ({ startFrame, icon, title, body }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  if (f < 0 || f > 70) return null;

  const s = spring({ frame: f, fps, config: SPRING });
  const hideS = spring({ frame: f - 50, fps, config: SPRING });

  const translateY = f < 50
    ? interpolate(s, [0, 1], [-30, 0])
    : interpolate(hideS, [0, 1], [0, -30]);

  const opacity = f < 50
    ? interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
    : interpolate(f, [50, 70], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        left: 14,
        right: 14,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          background: COLORS.greenDim,
          border: `1px solid ${COLORS.greenBorder}`,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 10, color: COLORS.white, fontWeight: 700, fontFamily: 'sans-serif' }}>
          {title}
        </div>
        <div style={{ fontSize: 9, color: '#aaa', fontFamily: 'sans-serif', marginTop: 2 }}>
          {body}
        </div>
      </div>
    </div>
  );
};
