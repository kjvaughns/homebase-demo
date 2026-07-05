import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

interface TypingTextProps {
  text: string;
  startFrame: number;
  charsPerSecond?: number;
  style?: React.CSSProperties;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  startFrame,
  charsPerSecond = 8,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  if (f < 0) return <span style={style} />;

  const charsShown = Math.min(text.length, Math.floor((f * charsPerSecond) / fps));
  const doneAtFrame = Math.ceil((text.length * fps) / charsPerSecond);
  const framesSinceDone = f - doneAtFrame;

  // Cursor: blinks while typing and for 30 frames after done, then hides
  const showCursorWindow = framesSinceDone < 30;
  const cursorOn = Math.floor(f / 15) % 2 === 0;

  return (
    <span style={style}>
      {text.slice(0, charsShown)}
      <span style={{ opacity: showCursorWindow && cursorOn ? 1 : 0 }}>|</span>
    </span>
  );
};
