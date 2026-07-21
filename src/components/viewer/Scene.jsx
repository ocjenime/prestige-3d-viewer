import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Grid, Sky, Stars } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'
import Building from './Building'
import MeasurementLine from './MeasurementLine'
import GroundPlane from './GroundPlane'

export default function Scene() {
  const isNightMode = useStore((s) => s.isNightMode)
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const measurementPoints = useStore((s) => s.measurementPoints)
  const controlsRef = useRef()

  return (
    <>
      <color attach="background" args={[isNightMode ? '#0A0E1A' : '#F0F0F0']} />
      <fog attach="fog" args={[isNightMode ? '#0A0E1A' : '#E8E8E8', 40, 120]} />

      {isNightMode ? (
        <>
          <ambientLight intensity={0.15} color="#4A5568" />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.3}
            color="#6B7AA1"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, 15, -10]} intensity={0.5} color="#C9A84C" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.6} color="#F5F5F5" />
          <directionalLight
            position={[15, 25, 15]}
            intensity={1.2}
            color="#FFFFFF"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={100}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
          />
          <directionalLight position={[-10, 10, -10]} intensity={0.3} color="#87CEEB" />
          <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} />
        </>
      )}

      {buildings.map((building, idx) => (
        <Building key={building.id} building={building} index={idx} />
      ))}

      <GroundPlane />
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={isNightMode ? 0.4 : 0.25}
        scale={100}
        blur={2}
        far={20}
      />

      {showMeasurements && measurementPoints.length >= 2 && (
        <MeasurementLine points={measurementPoints} />
      )}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={60}
        enableDamping
        dampingFactor={0.05}
        target={[0, 5, 0]}
      />

      <Environment preset="city" background={false} />
    </>
  )
}
