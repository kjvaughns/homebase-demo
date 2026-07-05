import React from 'react';
import { C, FONT } from '../constants';
import { FeatherIcon } from './FeatherIcon';

// Provider tabs from client/navigation/ProviderTabNavigator.tsx
const TABS = [
  { label: 'Home', icon: 'home' },
  { label: 'Clients', icon: 'users' },
  { label: 'Schedule', icon: 'calendar' },
  { label: 'Financials', icon: 'bar-chart-2' },
  { label: 'More', icon: 'menu' },
];

interface IPhoneFrameProps {
  activeTab?: string;
  children: React.ReactNode;
}

// iPhone 15 Pro-style frame: titanium edge ring, thin uniform bezel,
// floating Dynamic Island, side buttons, SVG status glyphs.
export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ activeTab = 'Home', children }) => {
  return (
    <div style={{ position: 'relative', width: 384, height: 788 }}>
      {/* Side buttons */}
      {/* Action + volume (left) */}
      <div style={{ position: 'absolute', left: -3, top: 140, width: 3, height: 26, borderRadius: 2, background: 'linear-gradient(90deg, #3a3a3c, #6a6a6e)' }} />
      <div style={{ position: 'absolute', left: -3, top: 190, width: 3, height: 52, borderRadius: 2, background: 'linear-gradient(90deg, #3a3a3c, #6a6a6e)' }} />
      <div style={{ position: 'absolute', left: -3, top: 254, width: 3, height: 52, borderRadius: 2, background: 'linear-gradient(90deg, #3a3a3c, #6a6a6e)' }} />
      {/* Power (right) */}
      <div style={{ position: 'absolute', right: -3, top: 200, width: 3, height: 80, borderRadius: 2, background: 'linear-gradient(90deg, #6a6a6e, #3a3a3c)' }} />

      {/* Titanium edge ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 62,
          background: 'linear-gradient(145deg, #7a7a7e 0%, #4a4a4e 20%, #2e2e30 50%, #4e4e52 80%, #85858a 100%)',
          boxShadow: '0 50px 130px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.5)',
        }}
      />

      {/* Inner black bezel */}
      <div
        style={{
          position: 'absolute',
          inset: 3.5,
          borderRadius: 58,
          background: '#000',
        }}
      />

      {/* Screen */}
      <div
        style={{
          position: 'absolute',
          inset: 14,
          borderRadius: 47,
          background: C.bg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            flexShrink: 0,
            position: 'relative',
            zIndex: 30,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.white, fontFamily: FONT, letterSpacing: 0.2 }}>
            9:41
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Signal bars */}
            <svg width="17" height="11" viewBox="0 0 17 11" fill={C.white}>
              <rect x="0" y="7" width="3" height="4" rx="0.8" />
              <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
              <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
            </svg>
            {/* WiFi */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={C.white} strokeWidth="1.6" strokeLinecap="round">
              <path d="M 1.5 3.8 C 5.2 0.4 10.8 0.4 14.5 3.8" />
              <path d="M 4 6.4 C 6.4 4.3 9.6 4.3 12 6.4" />
              <path d="M 6.5 9 C 7.4 8.2 8.6 8.2 9.5 9" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke={C.white} strokeOpacity="0.4" />
              <rect x="2" y="2" width="15" height="8" rx="2" fill={C.white} />
              <path d="M 23 4 C 24 4.5 24 7.5 23 8 Z" fill={C.white} fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Dynamic Island — floating pill */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 118,
            height: 34,
            borderRadius: 20,
            background: '#000',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 12,
          }}
        >
          {/* Camera lens glint */}
          <div style={{ width: 9, height: 9, borderRadius: 5, background: '#0a0a14', boxShadow: 'inset 0 0 3px rgba(80,80,140,0.8)' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>{children}</div>

        {/* Floating pill tab bar (real app pattern) */}
        <div
          style={{
            position: 'absolute',
            bottom: 26,
            left: 16,
            right: 16,
            height: 58,
            borderRadius: 24,
            background: 'rgba(28,28,30,0.92)',
            border: `0.5px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 20,
          }}
        >
          {TABS.map((tab) => {
            const active = tab.label === activeTab;
            return (
              <div
                key={tab.label}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}
              >
                <FeatherIcon name={tab.icon} size={19} color={active ? C.green : C.tertiary} />
                {active && (
                  <span style={{ fontSize: 9, fontWeight: 500, color: C.green, fontFamily: FONT }}>
                    {tab.label}
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
            bottom: 7,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 130,
            height: 5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.35)',
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
};
