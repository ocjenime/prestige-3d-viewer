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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const showBuildingInfo = useStore((s) => s.showBuildingInfo)
  const hoveredUnit = useStore((s) => s.hoveredUnit)
  const tourMode = useStore((s) => s.tourMode)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) return <LoadingScreen />

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{ position: [18, 12, 18], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
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
