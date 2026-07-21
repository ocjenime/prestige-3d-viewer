import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="brand-logo">A</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '6px',
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #FFFFFF, #2563FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        ARILUX D.O.O. (ZAGRAD)
      </div>
      <div style={{
        fontSize: '11px',
        color: '#2563FF',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: '36px',
        fontWeight: 600,
      }}>
        3D Prikaz Nekretnina
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '18px',
        fontWeight: 400,
      }}>
        Pripremamo vaše iskustvo...
      </div>
    </div>
  )
}
