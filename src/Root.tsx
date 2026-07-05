import React from 'react';
import { Composition } from 'remotion';
import { HomeBaseDemo } from './HomeBaseDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HomeBaseDemo"
        component={HomeBaseDemo}
        durationInFrames={1800}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
