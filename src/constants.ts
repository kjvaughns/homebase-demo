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

// 36s @ 60fps = 2160 frames
export const F = {
  COLD_OPEN: 0,
  LOGO: 240,
  DASHBOARD: 400,
  INSIGHTS: 730,
  MARKETPLACE: 1000,
  BOOKING: 1360,
  PAYOUT: 1750,
  END: 1990,
  TOTAL: 2160,
};
