import React, { Suspense, useState, useEffect, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import useStore from './stores/useStore'
import Scene from './components/viewer/Scene'
import Sidebar from './components/ui/Sidebar'
import Toolbar from './components/ui/Toolbar'
import TopBar from './components/ui/TopBar'
import BuildingSelector from './components/ui/BuildingSelector'
import BuildingInfo from './components/ui/BuildingInfo'
import LoadingScreen from './components/ui/LoadingScreen'
import Tooltip3D from './components/ui/Tooltip3D'
import TourIndicator from './components/ui/TourIndicator'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute', inset: 0,
          background: '#0A0A0B',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", color: '#fff',
          padding: '40px', textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, background: '#C9A84C', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, marginBottom: 24,
          }}>A</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 12 }}>
            Greška 3D Prikazivača
          </h2>
          <p style={{ color: '#A0A0A8', maxWidth: 400, lineHeight: 1.6, marginBottom: 8 }}>
            {this.state.error?.message || 'Došlo je do greške prilikom učitavanja 3D prikazivača.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px', background: '#C9A84C', color: '#0A0A0B',
              border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            }}
          >
            Pokušaj Ponovo
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function ThreeCanvas() {
  const showBuildingInfo = useStore((s) => s.showBuildingInfo)
  const hoveredUnit = useStore((s) => s.hoveredUnit)
  const tourMode = useStore((s) => s.tourMode)
  const selectedUnit = useStore((s) => s.selectedUnit)

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{ position: [45, 32, 45], fov: 40, near: 0.1, far: 500 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'default', toneMapping: 4, toneMappingExposure: 1.1 }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#87CEEB')
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        <TopBar />
        <Toolbar />
        <BuildingSelector />
        {showBuildingInfo && <BuildingInfo />}
        {hoveredUnit && <Tooltip3D />}
        {selectedUnit && !hoveredUnit && <Tooltip3D />}
        {tourMode && <TourIndicator />}
      </div>

      <Sidebar />
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) return <LoadingScreen />

  return (
    <ErrorBoundary>
      <ThreeCanvas />
    </ErrorBoundary>
  )
}
