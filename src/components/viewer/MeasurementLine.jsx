import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function MeasurementLine({ points }) {
  const distance = useMemo(() => {
    if (points.length < 2) return 0
    const p1 = new THREE.Vector3(...points[0])
    const p2 = new THREE.Vector3(...points[1])
    return p1.distanceTo(p2).toFixed(2)
  }, [points])

  const midPoint = useMemo(() => {
    if (points.length < 2) return [0, 0, 0]
    return [
      (points[0][0] + points[1][0]) / 2,
      (points[0][1] + points[1][1]) / 2 + 0.5,
      (points[0][2] + points[1][2]) / 2,
    ]
  }, [points])

  if (points.length < 2) return null

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([...points[0], ...points[1]])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#C9A84C" linewidth={2} />
      </line>

      {[0, 1].map((i) => (
        <mesh key={i} position={points[i]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#C9A84C" />
        </mesh>
      ))}

      <sprite position={midPoint}>
        <spriteMaterial color="#1A1A1D" transparent opacity={0.9} />
        <sprite scale={[3, 0.8, 1]}>
          <meshBasicMaterial color="#C9A84C" transparent opacity={0} />
        </sprite>
      </sprite>
    </group>
  )
}
