import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { C, F } from './constants';
import { ColdOpen } from './scenes/ColdOpen';
import { Chaos } from './scenes/Chaos';
import { AppReveal } from './scenes/AppReveal';
import { Dashboard } from './scenes/Dashboard';
import { Marketplace } from './scenes/Marketplace';
import { BookingFlow } from './scenes/BookingFlow';
import { Chat } from './scenes/Chat';
import { Payment } from './scenes/Payment';
import { Payout } from './scenes/Payout';
import { EndCard } from './scenes/EndCard';

export const HomeBaseDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Sequence from={F.COLD_OPEN} durationInFrames={F.CHAOS - F.COLD_OPEN}>
        <ColdOpen />
      </Sequence>
      <Sequence from={F.CHAOS} durationInFrames={F.REVEAL - F.CHAOS}>
        <Chaos />
      </Sequence>
      <Sequence from={F.REVEAL} durationInFrames={F.DASHBOARD - F.REVEAL}>
        <AppReveal />
      </Sequence>
      <Sequence from={F.DASHBOARD} durationInFrames={F.MARKETPLACE - F.DASHBOARD}>
        <Dashboard />
      </Sequence>
      <Sequence from={F.MARKETPLACE} durationInFrames={F.BOOKING - F.MARKETPLACE}>
        <Marketplace />
      </Sequence>
      <Sequence from={F.BOOKING} durationInFrames={F.CHAT - F.BOOKING}>
        <BookingFlow />
      </Sequence>
      <Sequence from={F.CHAT} durationInFrames={F.MONEY - F.CHAT}>
        <Chat />
      </Sequence>
      <Sequence from={F.MONEY} durationInFrames={70}>
        <Payment />
      </Sequence>
      <Sequence from={F.MONEY + 70} durationInFrames={F.END - F.MONEY - 70}>
        <Payout />
      </Sequence>
      <Sequence from={F.END} durationInFrames={F.TOTAL - F.END}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
