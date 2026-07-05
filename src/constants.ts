import type React from 'react';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});

export const FONT = `${fontFamily}, -apple-system, sans-serif`;

// HomeBase real design system — from client/constants/theme.ts (dark theme)
export const C = {
  bg: '#000000',
  card: '#1C1C1E',
  cardSecondary: '#2C2C2E',
  cardTertiary: '#3A3A3C',
  border: '#3A3A3C',
  green: '#38AE5F',
  greenPressed: '#2D9A4F',
  greenLight: 'rgba(56,174,95,0.12)',
  white: '#FFFFFF',
  muted: '#A0A0A0',
  tertiary: '#666666',
  faint: '#3A3A3C',
  red: '#EF4444',
  amber: '#FBBF24',
  blue: '#60A5FA',
};

export const SPRING_HEAVY = { mass: 1.2, damping: 14, stiffness: 120 };
export const SPRING_SNAPPY = { mass: 0.5, damping: 18, stiffness: 200 };
export const SPRING_GENTLE = { mass: 0.8, damping: 22, stiffness: 80 };

// 42s @ 60fps = 2520 frames
export const F = {
  COLD_OPEN: 0,
  LOGO: 260,
  AI_BOOKING: 440,
  DASHBOARD: 920,
  BOOKING: 1280,
  MONEY: 1700,
  MOAT: 2080,
  END: 2360,
  TOTAL: 2520,
};

// Website's signature gradient (from-primary to-emerald-400)
export const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(90deg, #38AE5F, #34d399)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

export const GREEN_GLOW = '0 0 30px rgba(56,174,95,0.4)';
