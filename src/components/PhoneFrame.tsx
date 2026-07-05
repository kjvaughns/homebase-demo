import React from 'react';
import { COLORS } from '../constants';

const NAV_ITEMS = [
  { label: 'Home', icon: '⌂' },
  { label: 'Calendar', icon: '◫' },
  { label: 'Messages', icon: '◻' },
  { label: 'Clients', icon: '◯' },
  { label: 'Money', icon: '$' },
];

interface PhoneFrameProps {
  activeTab: string;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ activeTab, children }) => {
  return (
    <div
      style={{
        width: 340,
        height: 680,
        borderRadius: 44,
        background: '#0a0a0a',
        border: '1.5px solid #222',
        boxShadow: '0 0 60px rgba(34,197,94,0.12), 0 0 120px rgba(34,197,94,0.05)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 100,
          height: 24,
          background: '#000',
          borderRadius: '0 0 16px 16px',
          alignSelf: 'center',
          marginTop: 0,
          zIndex: 10,
        }}
      />

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          background: COLORS.bg,
          position: 'relative',
        }}
      >
        {children}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          height: 64,
          background: '#0a0a0a',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 8,
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
              <span style={{ fontSize: 16, color: active ? COLORS.green : '#333' }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: 8,
                  color: active ? COLORS.green : '#333',
                  fontFamily: 'sans-serif',
                  fontWeight: active ? 700 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
