import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['300', '400', '600', '700', '800', '900'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});

export const FONT = `${fontFamily}, -apple-system, sans-serif`;

export const C = {
  bg: '#000000',
  surface: '#0a0a0a',
  card: '#111111',
  cardHover: '#141414',
  border: '#1e1e1e',
  borderLight: '#2a2a2a',
  green: '#22c55e',
  greenDim: '#0d2a1a',
  greenBorder: '#1a3a1a',
  greenGlow: 'rgba(34,197,94,0.15)',
  white: '#ffffff',
  muted: '#555555',
  faint: '#2a2a2a',
  amber: '#f59e0b',
  amberDim: '#2a1e00',
  blue: '#3b82f6',
  red: '#ef4444',
};

export const SPRING_HEAVY = { mass: 1.2, damping: 14, stiffness: 120 };
export const SPRING_SNAPPY = { mass: 0.5, damping: 18, stiffness: 200 };
export const SPRING_GENTLE = { mass: 0.8, damping: 22, stiffness: 80 };

export const F = {
  COLD_OPEN: 0,
  CHAOS: 180,
  REVEAL: 380,
  DASHBOARD: 560,
  MARKETPLACE: 860,
  BOOKING: 1100,
  CHAT: 1340,
  MONEY: 1540,
  END: 1700,
  TOTAL: 1800,
};
