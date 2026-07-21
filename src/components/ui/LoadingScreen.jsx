import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="brand-logo">A</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '26px',
        fontWeight: 600,
        marginBottom: '8px',
        letterSpacing: '-0.02em',
      }}>
        ARILUX D.O.O. (ZAGRAD)
      </div>
      <div style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: '32px',
      }}>
        3D Prikaz Nekretnina
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '16px',
      }}>
        Pripremamo vaše iskustvo...
      </div>
    </div>
  )
}
