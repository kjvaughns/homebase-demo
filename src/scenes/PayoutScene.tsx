import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING_HEAVY } from '../constants';
import { ClosePanel } from '../components/ClosePanel';
import { Caption } from '../components/Caption';

// Sequence-relative: 0-380 (~6.3s): slam -> stat count-up -> Next Payout panel
// Real app: FinancialsScreen "Next Payout" card + Transactions rows w/ status pills.

const STATS_AT = 60;
const PANEL_AT = 200;

const ROWS = [
  { label: 'Invoice #1047 · Sarah K.', amount: '$280.00', pill: 'Paid', pillColor: '#38AE5F' },
  { label: 'Invoice #1046 · James R.', amount: '$350.00', pill: 'Paid', pillColor: '#38AE5F' },
  { label: 'Invoice #1048 · Diana M.', amount: '$195.00', pill: 'Sent', pillColor: '#60A5FA' },
];

export const PayoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [356, 380], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "You get paid." interstitial
  const bigS = spring({ frame: frame - 10, fps, config: SPRING_HEAVY });
  const bigScale = interpolate(bigS, [0, 1], [0.88, 1]);
  const bigOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const bigFade = interpolate(frame, [STATS_AT - 14, STATS_AT], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Real site stats — count up (CaseStudiesSection.tsx) */}
      {frame >= STATS_AT && frame < PANEL_AT && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 130,
            opacity: interpolate(frame, [PANEL_AT - 16, PANEL_AT], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          }}
        >
          {[
            { end: 3, fmt: (v: number) => `${Math.round(v)} min`, label: 'Average booking time' },
            { end: 68, fmt: (v: number) => `${Math.round(v)}%`, label: 'Recurring client rate' },
            { end: 2400, fmt: (v: number) => `$${Math.round(v).toLocaleString('en-US')}`, label: 'Avg monthly deposits' },
          ].map((st, i) => {
            const f = frame - STATS_AT - i * 10;
            const p = interpolate(f, [0, 50], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            const eased = 1 - Math.pow(1 - p, 3);
            const op = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            return (
              <div key={st.label} style={{ opacity: op, textAlign: 'center' }}>
                <div style={{ fontSize: 100, fontWeight: 900, color: C.green, fontFamily: FONT, letterSpacing: '-0.02em' }}>
                  {st.fmt(st.end * eased)}
                </div>
                <div style={{ fontSize: 24, color: C.muted, fontFamily: FONT, marginTop: 10 }}>{st.label}</div>
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* Interstitial */}
      {frame < STATS_AT && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: bigFade,
          }}
        >
          <div
            style={{
              opacity: bigOpacity,
              transform: `scale(${bigScale})`,
              fontSize: 84,
              fontWeight: 900,
              color: C.white,
              fontFamily: FONT,
              letterSpacing: '-0.02em',
            }}
          >
            You get <span style={{ color: C.green }}>paid.</span>
          </div>
        </AbsoluteFill>
      )}

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 130,
        }}
      >
        {frame >= PANEL_AT && (
          <div style={{ transform: 'scale(1.3)' }}>
          <ClosePanel startFrame={PANEL_AT} width={680} tiltX={2.5} tiltY={-2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Next Payout card — real copy pattern */}
              <div
                style={{
                  background: C.greenLight,
                  border: '1px solid rgba(56,174,95,0.3)',
                  borderRadius: 26,
                  padding: '26px 30px',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.green,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontFamily: FONT,
                    marginBottom: 8,
                  }}
                >
                  Next Payout
                </div>
                <div style={{ fontSize: 40, fontWeight: 800, color: C.white, fontFamily: FONT }}>
                  $1,240.00
                </div>
                <div style={{ fontSize: 15, color: C.muted, fontFamily: FONT, marginTop: 6 }}>
                  Friday, Jul 10 → Chase ••1234
                </div>
              </div>

              {/* Transactions rows */}
              <div style={{ background: C.card, borderRadius: 26, padding: '22px 30px' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.muted,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: FONT,
                    marginBottom: 14,
                  }}
                >
                  Transactions
                </div>
                {ROWS.map((r, i) => {
                  const f = frame - PANEL_AT - 24 - i * 10;
                  const opacity = interpolate(f, [0, 16], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  });
                  return (
                    <div
                      key={r.label}
                      style={{
                        opacity,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 0',
                        borderBottom: i < ROWS.length - 1 ? `0.5px solid ${C.border}` : 'none',
                      }}
                    >
                      <span style={{ fontSize: 15, color: C.white, fontFamily: FONT }}>{r.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: C.white, fontFamily: FONT }}>
                          {r.amount}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: r.pillColor,
                            background: `${r.pillColor}20`,
                            borderRadius: 10,
                            padding: '4px 12px',
                            fontFamily: FONT,
                          }}
                        >
                          {r.pill}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ClosePanel>
          </div>
        )}
      </AbsoluteFill>

      {frame >= PANEL_AT && (
        <Caption
          startFrame={PANEL_AT + 30}
          eyebrow="Powered by Stripe"
          headline={<>Invoices in. Payouts out. Automatic.</>}
          sub="Track every dollar from job to bank"
        />
      )}
    </AbsoluteFill>
  );
};
