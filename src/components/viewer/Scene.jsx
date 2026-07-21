import React, { useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'
import Building from './Building'
import MeasurementLine from './MeasurementLine'
import GroundPlane from './GroundPlane'
import Effects from './Effects'

export default function Scene() {
  const isNightMode = useStore((s) => s.isNightMode)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const measurementPoints = useStore((s) => s.measurementPoints)

  return (
    <>
      <color attach="background" args={[isNightMode ? '#070B14' : '#DDE4EC']} />
      <fog attach="fog" args={[isNightMode ? '#070B14' : '#DDE4EC', 40, 90]} />

      {isNightMode ? (
        <>
          <ambientLight intensity={0.08} color="#2A3550" />
          <directionalLight
            position={[20, 30, 15]}
            intensity={0.3}
            color="#5566AA"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={100}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
            shadow-bias={-0.0005}
          />
          <pointLight position={[-15, 12, -10]} intensity={1.2} color="#C9A84C" distance={50} decay={2} />
          <pointLight position={[15, 8, 12]} intensity={0.6} color="#4466AA" distance={40} decay={2} />
          <pointLight position={[0, 2, -15]} intensity={0.4} color="#FFAA44" distance={30} decay={2} />
          <spotLight
            position={[-20, 25, 0]}
            angle={0.4}
            penumbra={0.8}
            intensity={1.0}
            color="#8899CC"
            castShadow
            distance={60}
          />
        </>
      ) : (
        <>
          <ambientLight intensity={0.35} color="#E8EEF5" />
          <directionalLight
            position={[20, 35, 15]}
            intensity={2.0}
            color="#FFF8F0"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={100}
            shadow-camera-left={-45}
            shadow-camera-right={45}
            shadow-camera-top={45}
            shadow-camera-bottom={-45}
            shadow-bias={-0.0003}
            shadow-normalBias={0.02}
          />
          <directionalLight position={[-15, 20, -10]} intensity={0.6} color="#B8D4F0" />
          <directionalLight position={[5, 10, -20]} intensity={0.3} color="#F5E6D0" />
          <hemisphereLight args={['#87CEEB', '#C4B896', 0.4]} />
          <pointLight position={[0, 5, 20]} intensity={0.5} color="#FFEEDD" distance={40} decay={2} />
        </>
      )}

      {buildings.map((building, idx) => (
        <Building key={building.id} building={building} index={idx} />
      ))}

      <GroundPlane />

      <Environment preset="city" environmentIntensity={isNightMode ? 0.15 : 0.35} />

      {showMeasurements && measurementPoints.length >= 2 && (
        <MeasurementLine points={measurementPoints} />
      )}

      <OrbitControls
        makeDefault
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={8}
        maxDistance={45}
        enableDamping
        dampingFactor={0.05}
        target={[0, 5, 0]}
      />

      <Effects isNight={isNightMode} />
    </>
  )
}
