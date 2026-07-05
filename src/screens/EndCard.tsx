import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING, FRAMES } from '../constants';
import { PhoneFrame } from '../components/PhoneFrame';

const START = FRAMES.s8;

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneExitF = frame - START;
  const phoneExitS = spring({ frame: phoneExitF, fps, config: SPRING });
  const phoneTranslateY = interpolate(phoneExitS, [0, 1], [0, 100]);
  const phoneOpacity = interpolate(phoneExitF, [0, 20], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const runF = frame - START - 20;
  const runOpacity = interpolate(runF, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const getF = frame - START - 30;
  const getS = spring({ frame: getF, fps, config: SPRING });
  const getScale = interpolate(getS, [0, 1], [0.9, 1]);
  const getOpacity = interpolate(getF, [0, 18], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const brandF = frame - START - 50;
  const brandOpacity = interpolate(brandF, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const urlF = frame - START - 65;
  const urlOpacity = interpolate(urlF, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div style={{
      width: 1920, height: 1080, background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Phone exiting */}
      {frame < START + 30 && (
        <div style={{
          position: 'absolute',
          transform: `translateY(${phoneTranslateY}px)`,
          opacity: phoneOpacity,
        }}>
          <PhoneFrame activeTab="Money">
            <div />
          </PhoneFrame>
        </div>
      )}

      {/* End card text */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          opacity: runOpacity,
          fontSize: 48,
          fontWeight: 300,
          color: COLORS.white,
          fontFamily: 'sans-serif',
          letterSpacing: -1,
        }}>
          Run your business.
        </div>

        <div style={{
          opacity: getOpacity,
          transform: `scale(${getScale})`,
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.green,
          fontFamily: 'sans-serif',
          letterSpacing: -1,
        }}>
          Get clients.
        </div>

        <div style={{
          opacity: brandOpacity,
          fontSize: 13,
          color: '#333',
          fontFamily: 'sans-serif',
          letterSpacing: 4,
          textTransform: 'uppercase',
          marginTop: 16,
        }}>
          HomeBase Pro
        </div>

        <div style={{
          opacity: urlOpacity,
          fontSize: 10,
          color: COLORS.ultraMuted,
          fontFamily: 'sans-serif',
          letterSpacing: 1,
        }}>
          Available on iOS · homebaseproapp.com
        </div>
      </div>
    </div>
  );
};
