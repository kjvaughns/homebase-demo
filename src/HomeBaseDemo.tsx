import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { interpolate } from 'remotion';
import { FRAMES } from './constants';
import { ColdOpen } from './screens/ColdOpen';
import { Dashboard } from './screens/Dashboard';
import { Marketplace } from './screens/Marketplace';
import { BookingFlow } from './screens/BookingFlow';
import { Chat } from './screens/Chat';
import { Invoice } from './screens/Invoice';
import { Payout } from './screens/Payout';
import { EndCard } from './screens/EndCard';

const SceneLayer: React.FC<{
  startFrame: number;
  endFrame: number;
  children: React.ReactNode;
}> = ({ startFrame, endFrame, children }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame >= endFrame) return null;
  return <AbsoluteFill>{children}</AbsoluteFill>;
};

export const HomeBaseDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000000' }}>
      <SceneLayer startFrame={FRAMES.s1} endFrame={FRAMES.s2 + 1}>
        <ColdOpen />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s2} endFrame={FRAMES.s3 + 1}>
        <Dashboard />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s3} endFrame={FRAMES.s4 + 1}>
        <Marketplace />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s4} endFrame={FRAMES.s5 + 1}>
        <BookingFlow />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s5} endFrame={FRAMES.s6 + 1}>
        <Chat />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s6} endFrame={FRAMES.s7 + 1}>
        <Invoice />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s7} endFrame={FRAMES.s8 + 1}>
        <Payout />
      </SceneLayer>
      <SceneLayer startFrame={FRAMES.s8} endFrame={1801}>
        <EndCard />
      </SceneLayer>
    </AbsoluteFill>
  );
};
