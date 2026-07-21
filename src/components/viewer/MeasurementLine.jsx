import React, { useMemo } from 'react'
import * as THREE from 'three'

function MeasureLine({ points }) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...points[0]),
      new THREE.Vector3(...points[1]),
    ])
    const mat = new THREE.LineBasicMaterial({ color: '#C9A84C' })
    return new THREE.Line(geo, mat)
  }, [points])

  return <primitive object={lineObj} />
}

export default function MeasurementLine({ points }) {
  const distance = useMemo(() => {
    if (!points || points.length < 2) return 0
    const p1 = new THREE.Vector3(...points[0])
    const p2 = new THREE.Vector3(...points[1])
    return p1.distanceTo(p2).toFixed(2)
  }, [points])

  const midPoint = useMemo(() => {
    if (!points || points.length < 2) return [0, 0.5, 0]
    return [
      (points[0][0] + points[1][0]) / 2,
      (points[0][1] + points[1][1]) / 2 + 0.5,
      (points[0][2] + points[1][2]) / 2,
    ]
  }, [points])

  if (!points || points.length < 2) return null

  return (
    <group>
      <MeasureLine points={points} />

      {[0, 1].map((i) => (
        <mesh key={i} position={points[i]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial color="#C9A84C" />
        </mesh>
      ))}

      <sprite position={midPoint}>
        <spriteMaterial color="#C9A84C" transparent opacity={0.9} />
      </sprite>
    </group>
  )
}
