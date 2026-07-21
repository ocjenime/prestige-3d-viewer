import React, { useMemo } from 'react'
import * as THREE from 'three'
import useStore from '../../stores/useStore'

function SimpleGrid({ size = 100, divisions = 50, color = '#D5D0C8' }) {
  const geometry = useMemo(() => {
    const points = []
    const half = size / 2
    const step = size / divisions
    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step
      points.push(new THREE.Vector3(pos, 0, -half))
      points.push(new THREE.Vector3(pos, 0, half))
      points.push(new THREE.Vector3(-half, 0, pos))
      points.push(new THREE.Vector3(half, 0, pos))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [size, divisions])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </lineSegments>
  )
}

function Road({ position, width, length, color }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[width * 0.6, length]} />
        <meshPhysicalMaterial color="#555555" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 2.4, 8]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[1.2, 12, 10]} />
        <meshPhysicalMaterial color="#2D5A27" roughness={0.85} metalness={0} clearcoat={0.1} />
      </mesh>
      <mesh position={[0.3, 3.8, 0.3]} castShadow>
        <sphereGeometry args={[0.7, 10, 8]} />
        <meshPhysicalMaterial color="#3A7A33" roughness={0.85} metalness={0} clearcoat={0.1} />
      </mesh>
    </group>
  )
}

export default function GroundPlane() {
  const isNightMode = useStore((s) => s.isNightMode)

  return (
    <group position={[0, -1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshPhysicalMaterial
          color={isNightMode ? '#0A0E15' : '#D4CCBE'}
          roughness={0.9}
          metalness={0}
          clearcoat={0.05}
          envMapIntensity={0.3}
        />
      </mesh>

      <group rotation={[-Math.PI / 2, 0, 0]}>
        <SimpleGrid size={100} divisions={50} color={isNightMode ? '#151D2A' : '#C8C0B0'} />
      </group>

      <Road position={[0, 0.01, 20]} width={8} length={120} color="#3A3A3A" />
      <Road position={[-25, 0.01, 0]} width={6} length={120} color="#3A3A3A" />

      {!isNightMode && (
        <>
          <Tree position={[8, 0, 18]} />
          <Tree position={[-12, 0, 18]} />
          <Tree position={[18, 0, 18]} />
          <Tree position={[-22, 0, 15]} />
          <Tree position={[30, 0, 18]} />
          <Tree position={[-35, 0, 18]} />
          <Tree position={[-28, 0, 12]} />
          <Tree position={[25, 0, 15]} />
        </>
      )}

      {isNightMode && (
        <>
          <pointLight position={[5, 3, 18]} intensity={0.8} color="#FFD080" distance={15} decay={2} />
          <pointLight position={[-15, 3, 18]} intensity={0.6} color="#FFD080" distance={12} decay={2} />
          <pointLight position={[-25, 3, 5]} intensity={0.5} color="#FFD080" distance={12} decay={2} />
        </>
      )}
    </group>
  )
}
