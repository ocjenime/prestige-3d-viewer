import React, { useMemo } from 'react'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'
import Building from './Building'
import MeasurementLine from './MeasurementLine'
import GroundPlane from './GroundPlane'
import Effects from './Effects'

function Lights({ isNight }) {
  if (isNight) {
    return (
      <>
        <ambientLight intensity={0.06} color="#1A2040" />
        <directionalLight
          position={[30, 40, 20]}
          intensity={0.25}
          color="#4455AA"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={120}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-bias={-0.0004}
        />
        <pointLight position={[-15, 12, -10]} intensity={1.5} color="#88AAFF" distance={50} decay={2} />
        <pointLight position={[15, 8, 12]} intensity={0.8} color="#4488FF" distance={40} decay={2} />
        <pointLight position={[0, 2, -18]} intensity={0.5} color="#FF8833" distance={35} decay={2} />
        <pointLight position={[-30, 4, 5]} intensity={0.4} color="#5588CC" distance={25} decay={2} />
        <pointLight position={[30, 4, -5]} intensity={0.4} color="#5588CC" distance={25} decay={2} />
        <spotLight position={[-25, 30, 0]} angle={0.45} penumbra={0.9} intensity={1.2} color="#3366AA" castShadow distance={70} />
        <spotLight position={[25, 25, 15]} angle={0.35} penumbra={0.8} intensity={0.6} color="#667799" distance={50} />
      </>
    )
  }
  return (
    <>
      <ambientLight intensity={0.4} color="#EEF2F7" />
      <directionalLight
        position={[30, 45, 25]}
        intensity={2.5}
        color="#FFFAF0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={150}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-20, 25, -15]} intensity={0.5} color="#C8DCF0" />
      <directionalLight position={[10, 15, -25]} intensity={0.3} color="#FFF0DD" />
      <hemisphereLight args={['#87CEEB', '#8B7355', 0.35]} />
      <pointLight position={[0, 8, 25]} intensity={0.4} color="#FFEEDD" distance={50} decay={2} />
    </>
  )
}

export default function Scene() {
  const isNightMode = useStore((s) => s.isNightMode)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const measurementPoints = useStore((s) => s.measurementPoints)

  return (
    <>
      <color attach="background" args={[isNightMode ? '#050A14' : '#7EC8E3']} />
      <fog attach="fog" args={[isNightMode ? '#050A14' : '#B8D8EC', 80, 200]} />

      {!isNightMode && (
        <Sky
          distance={450000}
          sunPosition={[100, 40, 80]}
          inclination={0.52}
          azimuth={0.25}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          rayleigh={0.5}
          turbidity={8}
        />
      )}

      <Lights isNight={isNightMode} />

      {buildings.map((building, idx) => (
        <Building key={building.id} building={building} index={idx} />
      ))}

      <GroundPlane />

      <Environment preset="city" environmentIntensity={isNightMode ? 0.2 : 0.4} />

      {showMeasurements && measurementPoints.length >= 2 && (
        <MeasurementLine points={measurementPoints} />
      )}

      <OrbitControls
        makeDefault
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={15}
        maxDistance={100}
        enableDamping
        dampingFactor={0.04}
        target={[0, 8, 0]}
      />

      <Effects isNight={isNightMode} />
    </>
  )
}
