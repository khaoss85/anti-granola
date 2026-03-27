import { ImageResponse } from 'next/og'

export const alt = 'Nullify — Detect & Block Invisible Meeting Transcription'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
              fontSize: '32px',
            }}
          >
            🛡️
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Nullify
          </span>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Detect & Block Invisible Meeting Transcription
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.1)',
              color: '#e4e4e7',
              fontSize: '18px',
            }}
          >
            Free & Open Source
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.1)',
              color: '#e4e4e7',
              fontSize: '18px',
            }}
          >
            macOS & Windows
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
