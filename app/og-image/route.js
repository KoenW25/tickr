import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Tckr logo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background:
            'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(14, 116, 144) 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: 72 }}>🎟</div>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Tckr
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: 'rgb(191, 219, 254)',
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          De online markt voor tickets
        </div>
      </div>
    ),
    size
  );
}
