import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_SNAPPY } from '../constants';

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

  if (f < 0 || f > 100) return null;

  const s = spring({ frame: f, fps, config: SPRING_SNAPPY });
  const translateY = interpolate(s, [0, 1], [-40, 0]);
  const entryOpacity = interpolate(f, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const exitOpacity = interpolate(f, [80, 98], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 12,
        right: 12,
        zIndex: 100,
        background: 'rgba(17,17,17,0.97)',
        border: '0.5px solid #2a2a2a',
        borderRadius: 14,
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        transform: `translateY(${translateY}px)`,
        opacity: Math.min(entryOpacity, exitOpacity),
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: C.greenDim,
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
        <div style={{ fontSize: 10, fontWeight: 700, color: C.white, fontFamily: FONT }}>{title}</div>
        <div style={{ fontSize: 9, color: '#888', fontFamily: FONT, marginTop: 1 }}>{body}</div>
      </div>
    </div>
  );
};
