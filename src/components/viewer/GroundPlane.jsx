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
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [size, divisions])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </lineSegments>
  )
}

export default function GroundPlane() {
  const isNightMode = useStore((s) => s.isNightMode)

  return (
    <group position={[0, -1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color={isNightMode ? '#0D1117' : '#E8E4DE'}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      <group rotation={[-Math.PI / 2, 0, 0]}>
        <SimpleGrid size={100} divisions={50} color={isNightMode ? '#1A2030' : '#D5D0C8'} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-30, 0.02, 25]} receiveShadow>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial
          color={isNightMode ? '#0A1520' : '#C8D8E8'}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}
