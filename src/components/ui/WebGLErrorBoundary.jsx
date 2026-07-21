import React from 'react'

export class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#0A0A0B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          color: '#fff',
          padding: '40px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#C9A84C',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '24px',
          }}>P</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '12px' }}>
            WebGL Not Available
          </h2>
          <p style={{ color: '#A0A0A8', maxWidth: '400px', lineHeight: 1.6, marginBottom: '24px' }}>
            Your browser or device doesn't support WebGL, which is required for 3D rendering.
            Please try a modern browser like Chrome, Firefox, or Edge with hardware acceleration enabled.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#C9A84C',
              color: '#0A0A0B',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Try Again
          </button>
          <p style={{ color: '#6B6B73', fontSize: '11px', marginTop: '16px' }}>
            Error: {this.state.error?.message || 'Unknown error'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
