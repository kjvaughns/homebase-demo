import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { C, F } from './constants';
import { BgFx } from './components/BgFx';
import { ColdOpen } from './scenes/ColdOpen';
import { LogoReveal } from './scenes/LogoReveal';
import { AIBookingScene } from './scenes/AIBookingScene';
import { DashboardScene } from './scenes/DashboardScene';
import { BookingScene } from './scenes/BookingScene';
import { PayoutScene } from './scenes/PayoutScene';
import { MoatScene } from './scenes/MoatScene';
import { EndCard } from './scenes/EndCard';

export const HomeBaseDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgFx />
      <Sequence from={F.COLD_OPEN} durationInFrames={F.LOGO - F.COLD_OPEN}>
        <ColdOpen />
      </Sequence>
      <Sequence from={F.LOGO} durationInFrames={F.AI_BOOKING - F.LOGO}>
        <LogoReveal />
      </Sequence>
      <Sequence from={F.AI_BOOKING} durationInFrames={F.DASHBOARD - F.AI_BOOKING}>
        <AIBookingScene />
      </Sequence>
      <Sequence from={F.DASHBOARD} durationInFrames={F.BOOKING - F.DASHBOARD}>
        <DashboardScene />
      </Sequence>
      <Sequence from={F.BOOKING} durationInFrames={F.MONEY - F.BOOKING}>
        <BookingScene />
      </Sequence>
      <Sequence from={F.MONEY} durationInFrames={F.MOAT - F.MONEY}>
        <PayoutScene />
      </Sequence>
      <Sequence from={F.MOAT} durationInFrames={F.END - F.MOAT}>
        <MoatScene />
      </Sequence>
      <Sequence from={F.END} durationInFrames={F.TOTAL - F.END}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
