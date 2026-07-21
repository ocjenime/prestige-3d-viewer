import React from 'react'
import { Grid } from '@react-three/drei'
import useStore from '../../stores/useStore'

export default function GroundPlane() {
  const isNightMode = useStore((s) => s.isNightMode)

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color={isNightMode ? '#0D1117' : '#E8E4DE'}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      <Grid
        position={[0, -0.99, 0]}
        args={[200, 200]}
        cellSize={2}
        cellThickness={0.5}
        cellColor={isNightMode ? '#1A2030' : '#D5D0C8'}
        sectionSize={10}
        sectionThickness={1}
        sectionColor={isNightMode ? '#253040' : '#C0B8A8'}
        fadeDistance={80}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-30, -0.98, 25]} receiveShadow>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial
          color={isNightMode ? '#0A1520' : '#C8D8E8'}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </>
  )
}
