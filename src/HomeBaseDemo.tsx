import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { C, F } from './constants';
import { ColdOpen } from './scenes/ColdOpen';
import { LogoReveal } from './scenes/LogoReveal';
import { DashboardScene } from './scenes/DashboardScene';
import { InsightsScene } from './scenes/InsightsScene';
import { MarketplaceScene } from './scenes/MarketplaceScene';
import { BookingScene } from './scenes/BookingScene';
import { PayoutScene } from './scenes/PayoutScene';
import { EndCard } from './scenes/EndCard';

export const HomeBaseDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Sequence from={F.COLD_OPEN} durationInFrames={F.LOGO - F.COLD_OPEN}>
        <ColdOpen />
      </Sequence>
      <Sequence from={F.LOGO} durationInFrames={F.DASHBOARD - F.LOGO}>
        <LogoReveal />
      </Sequence>
      <Sequence from={F.DASHBOARD} durationInFrames={F.INSIGHTS - F.DASHBOARD}>
        <DashboardScene />
      </Sequence>
      <Sequence from={F.INSIGHTS} durationInFrames={F.MARKETPLACE - F.INSIGHTS}>
        <InsightsScene />
      </Sequence>
      <Sequence from={F.MARKETPLACE} durationInFrames={F.BOOKING - F.MARKETPLACE}>
        <MarketplaceScene />
      </Sequence>
      <Sequence from={F.BOOKING} durationInFrames={F.PAYOUT - F.BOOKING}>
        <BookingScene />
      </Sequence>
      <Sequence from={F.PAYOUT} durationInFrames={F.END - F.PAYOUT}>
        <PayoutScene />
      </Sequence>
      <Sequence from={F.END} durationInFrames={F.TOTAL - F.END}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
