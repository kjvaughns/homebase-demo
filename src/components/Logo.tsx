import React from 'react';
import { C } from '../constants';

interface LogoProps {
  size?: number;
  color?: string;
  // 0..1 stroke draw progress; 1 = fully drawn (default)
  draw?: number;
}

// SVG replica of assets/images/icon.png: green house outline with a
// two-leaf sprout at the roof peak, arched door, and a base line.
export const Logo: React.FC<LogoProps> = ({ size = 96, color = C.green, draw = 1 }) => {
  const dash = 400;
  const offset = dash * (1 - Math.min(1, Math.max(0, draw)));

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* House outline (roof peak at 50,22 with gap to walls) */}
      <path
        d="M 30 46 L 50 28 L 70 46 L 70 68 L 30 68 Z"
        stroke={color}
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={dash}
        strokeDashoffset={offset}
      />
      {/* Sprout stem */}
      <path
        d="M 50 28 L 50 18"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={dash}
        strokeDashoffset={offset}
      />
      {/* Left leaf */}
      <path
        d="M 50 18 C 42 18 37 13 37 7 C 44 7 50 11 50 18 Z"
        fill={color}
        opacity={draw}
      />
      {/* Right leaf */}
      <path
        d="M 50 18 C 58 16 61 9 60 2 C 52 3 48 10 50 18 Z"
        fill={color}
        opacity={draw}
      />
      {/* Arched door (filled) */}
      <path
        d="M 44 68 L 44 58 C 44 53 47 51 50 51 C 53 51 56 53 56 58 L 56 68 Z"
        fill={color}
        opacity={draw}
      />
      {/* Base line */}
      <rect x="28" y="76" width="44" height="7" rx="3.5" fill={color} opacity={draw} />
    </svg>
  );
};
