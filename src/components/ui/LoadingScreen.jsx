import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="brand-logo">P</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '8px',
        letterSpacing: '-0.02em',
      }}>
        Prestige Estates
      </div>
      <div style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: '32px',
      }}>
        3D Property Viewer
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '16px',
      }}>
        Preparing your experience...
      </div>
    </div>
  )
}
