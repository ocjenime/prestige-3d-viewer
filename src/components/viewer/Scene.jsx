import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'
import Building from './Building'
import MeasurementLine from './MeasurementLine'
import GroundPlane from './GroundPlane'

export default function Scene() {
  const isNightMode = useStore((s) => s.isNightMode)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const measurementPoints = useStore((s) => s.measurementPoints)

  return (
    <>
      <color attach="background" args={[isNightMode ? '#0A0E1A' : '#E8E8E8']} />
      <fog attach="fog" args={[isNightMode ? '#0A0E1A' : '#E8E8E8', 50, 100]} />

      {isNightMode ? (
        <>
          <ambientLight intensity={0.2} color="#6B7AA1" />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.5}
            color="#8899BB"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, 15, -10]} intensity={0.8} color="#C9A84C" distance={50} />
          <pointLight position={[10, 5, 10]} intensity={0.3} color="#6B7AA1" distance={30} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.6} color="#FFFFFF" />
          <directionalLight
            position={[15, 25, 15]}
            intensity={1.2}
            color="#FFFFFF"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <directionalLight position={[-10, 10, -10]} intensity={0.3} color="#87CEEB" />
          <hemisphereLight args={['#87CEEB', '#E8E4DE', 0.3]} />
        </>
      )}

      {buildings.map((building, idx) => (
        <Building key={building.id} building={building} index={idx} />
      ))}

      <GroundPlane />

      {showMeasurements && measurementPoints.length >= 2 && (
        <MeasurementLine points={measurementPoints} />
      )}

      <OrbitControls
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={8}
        maxDistance={50}
        enableDamping
        dampingFactor={0.05}
        target={[0, 5, 0]}
      />
    </>
  )
}
