import React from 'react';
import { C, FONT } from '../constants';

const NAV_ITEMS = [
  { label: 'Home', icon: '🏠' },
  { label: 'Calendar', icon: '📅' },
  { label: 'Messages', icon: '💬' },
  { label: 'Clients', icon: '👥' },
  { label: 'Money', icon: '💰' },
];

interface PhoneFrameProps {
  activeTab: string;
  glowing?: boolean;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ activeTab, glowing, children }) => {
  return (
    <div
      style={{
        width: 360,
        height: 720,
        borderRadius: 48,
        background: 'linear-gradient(145deg, #111111, #0a0a0a)',
        border: '1.5px solid #222222',
        boxShadow: glowing
          ? '0 0 0 1px #1a1a1a, 0 40px 120px rgba(0,0,0,0.95), 0 0 80px rgba(34,197,94,0.2)'
          : '0 0 0 1px #1a1a1a, 0 40px 120px rgba(0,0,0,0.95), 0 0 60px rgba(34,197,94,0.08)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 22px',
          position: 'relative',
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, color: C.white, fontFamily: FONT }}>9:41</span>
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 6,
            transform: 'translateX(-50%)',
            width: 110,
            height: 26,
            borderRadius: 18,
            background: '#000',
          }}
        />
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} style={{ width: 2.5, height: h, background: C.white, borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Screen area */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          background: C.surface,
          position: 'relative',
        }}
      >
        {children}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          height: 58,
          background: '#080808',
          borderTop: '0.5px solid #141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexShrink: 0,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.label === activeTab;
          return (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  filter: active ? 'none' : 'grayscale(1) brightness(0.3)',
                }}
              >
                {item.icon}
              </span>
              {active && (
                <span style={{ fontSize: 8, color: C.green, fontFamily: FONT, fontWeight: 600 }}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 4,
          background: '#333',
          borderRadius: 2,
        }}
      />
    </div>
  );
};
