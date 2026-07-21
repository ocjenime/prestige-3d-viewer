import React, { useRef } from 'react'
import { OrbitControls, Environment, ContactShadows, Sky, Stars } from '@react-three/drei'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'
import Building from './Building'
import MeasurementLine from './MeasurementLine'
import GroundPlane from './GroundPlane'

export default function Scene() {
  const isNightMode = useStore((s) => s.isNightMode)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const measurementPoints = useStore((s) => s.measurementPoints)
  const controlsRef = useRef()

  return (
    <>
      <color attach="background" args={[isNightMode ? '#0A0E1A' : '#F0F0F0']} />
      <fog attach="fog" args={[isNightMode ? '#0A0E1A' : '#E8E8E8', 50, 100]} />

      {isNightMode ? (
        <>
          <ambientLight intensity={0.15} color="#4A5568" />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.4}
            color="#6B7AA1"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <pointLight position={[-10, 15, -10]} intensity={0.5} color="#C9A84C" distance={40} />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.5} color="#F5F5F5" />
          <directionalLight
            position={[15, 25, 15]}
            intensity={1.0}
            color="#FFFFFF"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <directionalLight position={[-10, 10, -10]} intensity={0.2} color="#87CEEB" />
          <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} />
        </>
      )}

      {buildings.map((building, idx) => (
        <Building key={building.id} building={building} index={idx} />
      ))}

      <GroundPlane />
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={isNightMode ? 0.3 : 0.2}
        scale={50}
        blur={2}
        far={15}
      />

      {showMeasurements && measurementPoints.length >= 2 && (
        <MeasurementLine points={measurementPoints} />
      )}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={8}
        maxDistance={50}
        enableDamping
        dampingFactor={0.05}
        target={[0, 5, 0]}
      />

      <Environment preset="city" background={false} />
    </>
  )
}
