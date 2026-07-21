import React, { Suspense, useState, useEffect } from 'react'
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

function CanvasErrorFallback() {
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
      }}>P</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 12 }}>
        Unable to Load 3D Viewer
      </h2>
      <p style={{ color: '#A0A0A8', maxWidth: 400, lineHeight: 1.6, marginBottom: 24 }}>
        Your browser doesn't support WebGL or hardware acceleration is disabled.
        Try Chrome, Firefox, or Edge with hardware acceleration enabled.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '12px 24px', background: '#C9A84C', color: '#0A0A0B',
          border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Inter', sans-serif",
        }}
      >
        Retry
      </button>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [webglError, setWebglError] = useState(false)
  const showBuildingInfo = useStore((s) => s.showBuildingInfo)
  const hoveredUnit = useStore((s) => s.hoveredUnit)
  const tourMode = useStore((s) => s.tourMode)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        setWebglError(true)
      }
    } catch (e) {
      setWebglError(true)
    }
    const timer = setTimeout(() => setLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) return <LoadingScreen />
  if (webglError) return <CanvasErrorFallback />

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{ position: [18, 12, 18], fov: 50, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.setClearColor('#E8E8E8')
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
        {tourMode && <TourIndicator />}
      </div>

      <Sidebar />
    </div>
  )
}
