import React, { useMemo } from 'react'
import * as THREE from 'three'
import useStore from '../../stores/useStore'

function Sidewalk({ position, width, length, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial color="#D8D0C4" roughness={0.75} metalness={0} clearcoat={0.05} />
      </mesh>
      {Array.from({ length: Math.floor(length / 3) }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, -length / 2 + 1.5 + i * 3]} receiveShadow>
          <planeGeometry args={[width, 0.02]} />
          <meshPhysicalMaterial color="#B0A898" roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}

function Road({ position, width, length, rotation = 0 }) {
  const dashes = Math.floor(length / 4)
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial color="#2A2A2A" roughness={0.92} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} receiveShadow>
        <planeGeometry args={[width * 0.65, length]} />
        <meshPhysicalMaterial color="#333333" roughness={0.88} metalness={0} />
      </mesh>
      {Array.from({ length: dashes }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, -length / 2 + 2 + i * 4]}>
          <planeGeometry args={[0.12, 2.0]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function ParkingLot({ position, spots = 20, rotation = 0 }) {
  const spotW = 2.8
  const spotL = 5.5
  const gap = 0.15
  const cols = Math.min(spots, 10)
  const rows = Math.ceil(spots / cols)
  const totalW = cols * (spotW + gap)
  const totalL = rows * (spotL + gap)

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[totalW + 2, totalL + 2]} />
        <meshPhysicalMaterial color="#3A3A3A" roughness={0.9} metalness={0} />
      </mesh>
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          if (row * cols + col >= spots) return null
          const x = -totalW / 2 + col * (spotW + gap) + spotW / 2
          const z = -totalL / 2 + row * (spotL + gap) + spotL / 2
          return (
            <mesh key={`${row}-${col}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.015, z]}>
              <planeGeometry args={[spotW, spotL]} />
              <meshPhysicalMaterial color="#444444" roughness={0.85} metalness={0} />
            </mesh>
          )
        })
      )}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <mesh key={`h${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -totalL / 2 + i * (spotL + gap)]}>
          <planeGeometry args={[totalW, 0.08]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
        <meshPhysicalMaterial color="#4A2E14" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 3.8, 0]} castShadow>
        <sphereGeometry args={[1.4, 14, 11]} />
        <meshPhysicalMaterial color="#1E5A1A" roughness={0.85} metalness={0} clearcoat={0.08} />
      </mesh>
      <mesh position={[0.4, 4.4, 0.3]} castShadow>
        <sphereGeometry args={[0.8, 10, 9]} />
        <meshPhysicalMaterial color="#2D7A26" roughness={0.85} metalness={0} clearcoat={0.08} />
      </mesh>
      <mesh position={[-0.3, 4.1, -0.2]} castShadow>
        <sphereGeometry args={[0.6, 10, 8]} />
        <meshPhysicalMaterial color="#3A8A33" roughness={0.85} metalness={0} clearcoat={0.08} />
      </mesh>
    </group>
  )
}

function PalmTree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4.4, 8]} />
        <meshPhysicalMaterial color="#6B4226" roughness={0.85} metalness={0} />
      </mesh>
      {[0, 72, 144, 216, 288].map(angle => {
        const rad = (angle * Math.PI) / 180
        return (
          <mesh key={angle} position={[Math.cos(rad) * 1.2, 4.8, Math.sin(rad) * 1.2]} rotation={[0.5, rad, 0]} castShadow>
            <boxGeometry args={[0.15, 0.08, 2.0]} />
            <meshPhysicalMaterial color="#2A7A22" roughness={0.8} metalness={0} />
          </mesh>
        )
      })}
    </group>
  )
}

function Bench({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.6, 0.08, 0.4]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.8} metalness={0} />
      </mesh>
      <mesh position={[0, 0.7, -0.16]} castShadow>
        <boxGeometry args={[1.6, 0.5, 0.06]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.8} metalness={0} />
      </mesh>
      {[-0.6, 0.6].map(x => (
        <mesh key={x} position={[x, 0.2, 0]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.4]} />
          <meshPhysicalMaterial color="#2A2A2E" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function StreetLamp({ position, isNight }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 5, 8]} />
        <meshPhysicalMaterial color="#3A3A3E" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 5.2, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.15, 8]} />
        <meshPhysicalMaterial color="#555555" roughness={0.4} metalness={0.6} />
      </mesh>
      {isNight && (
        <>
          <pointLight position={[0, 5.0, 0]} intensity={1.5} color="#FFD080" distance={20} decay={2} castShadow />
          <mesh position={[0, 5.15, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#FFE8B0" />
          </mesh>
        </>
      )}
    </group>
  )
}

function Fence({ start, end, posts = 8 }) {
  const sx = start[0], sz = start[1]
  const ex = end[0], ez = end[1]
  return (
    <group>
      {Array.from({ length: posts + 1 }, (_, i) => {
        const t = i / posts
        const x = sx + (ex - sx) * t
        const z = sz + (ez - sz) * t
        return (
          <mesh key={i} position={[x, 0.5, z]} castShadow>
            <boxGeometry args={[0.08, 1.0, 0.08]} />
            <meshPhysicalMaterial color="#2A2A2E" roughness={0.3} metalness={0.75} />
          </mesh>
        )
      })}
      <mesh position={[(sx + ex) / 2, 0.85, (sz + ez) / 2]} castShadow>
        <boxGeometry args={[Math.sqrt((ex - sx) ** 2 + (ez - sz) ** 2), 0.04, 0.03]} />
        <meshPhysicalMaterial color="#2A2A2E" roughness={0.3} metalness={0.75} />
      </mesh>
    </group>
  )
}

function Fountain({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.6, 24]} />
        <meshPhysicalMaterial color="#C8C0B0" roughness={0.35} metalness={0.1} clearcoat={0.5} />
      </mesh>
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.3, 24]} />
        <meshPhysicalMaterial color="#3A7A9E" roughness={0.05} metalness={0.1} transmission={0.4} thickness={0.3} clearcoat={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 1.0, 12]} />
        <meshPhysicalMaterial color="#B8B0A0" roughness={0.4} metalness={0.2} clearcoat={0.3} />
      </mesh>
    </group>
  )
}

function GrassPatch({ position, width, length }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[position[0], 0.02, position[2]]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <meshPhysicalMaterial color="#3A8A32" roughness={0.9} metalness={0} clearcoat={0.05} />
    </mesh>
  )
}

function Planter({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshPhysicalMaterial color="#8A7A6A" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.7, 10, 8]} />
        <meshPhysicalMaterial color="#2A7A22" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  )
}

function ContextBuilding({ position, width, depth, height, color }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial color={color} roughness={0.7} metalness={0.05} clearcoat={0.15} />
      </mesh>
      {Array.from({ length: Math.floor(height / 3) }, (_, floor) =>
        Array.from({ length: Math.floor(width / 3) }, (_, col) => (
          <mesh
            key={`${floor}-${col}`}
            position={[
              -width / 2 + 1.5 + col * 3,
              1.5 + floor * 3,
              depth / 2 + 0.02,
            ]}
          >
            <boxGeometry args={[1.2, 1.6, 0.05]} />
            <meshPhysicalMaterial
              color="#8AACCC"
              metalness={0.1}
              roughness={0.05}
              transmission={0.5}
              thickness={0.3}
              transparent
              opacity={0.4}
              clearcoat={1.0}
            />
          </mesh>
        ))
      )}
    </group>
  )
}

export default function GroundPlane() {
  const isNightMode = useStore((s) => s.isNightMode)

  const treeRow1 = useMemo(() => [
    [10, 0, 22], [-14, 0, 22], [20, 0, 22], [-24, 0, 22],
    [32, 0, 22], [-36, 0, 22], [44, 0, 22], [-48, 0, 22],
    [56, 0, 22], [-60, 0, 22],
  ], [])

  const treeRow2 = useMemo(() => [
    [10, 0, -22], [-14, 0, -22], [20, 0, -22], [-24, 0, -22],
    [32, 0, -22], [-36, 0, -22], [44, 0, -22], [-48, 0, -22],
  ], [])

  return (
    <group position={[0, -1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshPhysicalMaterial
          color={isNightMode ? '#080C12' : '#C4B896'}
          roughness={0.92}
          metalness={0}
          clearcoat={0.03}
          envMapIntensity={0.2}
        />
      </mesh>

      <GrassPatch position={[-10, 0, 0]} width={30} length={30} />
      <GrassPatch position={[10, 0, 0]} width={25} length={25} />
      <GrassPatch position={[0, 0, 30]} width={50} length={12} />
      <GrassPatch position={[0, 0, -30]} width={50} length={12} />

      <Road position={[0, 0.03, 24]} width={10} length={140} />
      <Road position={[-30, 0.03, 0]} width={8} length={140} rotation={Math.PI / 2} />
      <Road position={[30, 0.03, 0]} width={8} length={140} rotation={Math.PI / 2} />

      <Sidewalk position={[0, 0.04, 19]} width={12} length={130} />
      <Sidewalk position={[0, 0.04, -19]} width={12} length={130} />
      <Sidewalk position={[-18, 0.04, 0]} width={5} length={120} rotation={Math.PI / 2} />
      <Sidewalk position={[18, 0.04, 0]} width={5} length={120} rotation={Math.PI / 2} />

      <ParkingLot position={[40, 0, -15]} spots={30} />
      <ParkingLot position={[-40, 0, -15]} spots={24} />

      <Fountain position={[0, 0, 12]} />

      {treeRow1.map((pos, i) => (
        <Tree key={`t1-${i}`} position={pos} scale={0.9 + Math.random() * 0.3} />
      ))}
      {treeRow2.map((pos, i) => (
        <Tree key={`t2-${i}`} position={pos} scale={0.9 + Math.random() * 0.3} />
      ))}

      <PalmTree position={[8, 0, 15]} />
      <PalmTree position={[-8, 0, 15]} />
      <PalmTree position={[5, 0, 28]} />
      <PalmTree position={[-5, 0, 28]} />

      <Bench position={[6, 0, 12]} rotation={Math.PI} />
      <Bench position={[-6, 0, 12]} rotation={Math.PI} />
      <Bench position={[12, 0, 8]} rotation={-Math.PI / 2} />
      <Bench position={[-12, 0, 8]} rotation={Math.PI / 2} />

      <Planter position={[15, 0, 10]} />
      <Planter position={[-15, 0, 10]} />
      <Planter position={[15, 0, -10]} />
      <Planter position={[-15, 0, -10]} />

      <StreetLamp position={[6, 0, 19]} isNight={isNightMode} />
      <StreetLamp position={[-6, 0, 19]} isNight={isNightMode} />
      <StreetLamp position={[18, 0, 19]} isNight={isNightMode} />
      <StreetLamp position={[-18, 0, 19]} isNight={isNightMode} />
      <StreetLamp position={[0, 0, -19]} isNight={isNightMode} />
      <StreetLamp position={[15, 0, -19]} isNight={isNightMode} />
      <StreetLamp position={[-15, 0, -19]} isNight={isNightMode} />

      <Fence start={[-60, 30]} end={[60, 30]} posts={20} />
      <Fence start={[-60, -30]} end={[60, -30]} posts={20} />

      <ContextBuilding position={[55, 0, 15]} width={8} depth={8} height={20} color="#9A9080" />
      <ContextBuilding position={[-55, 0, 15]} width={10} depth={6} height={14} color="#8A8578" />
      <ContextBuilding position={[55, 0, -10]} width={7} depth={7} height={25} color="#A09888" />
      <ContextBuilding position={[-55, 0, -10]} width={9} depth={8} height={18} color="#8A8070" />
      <ContextBuilding position={[0, 0, -40]} width={12} depth={10} height={12} color="#B0A898" />
      <ContextBuilding position={[40, 0, -40]} width={8} depth={8} height={16} color="#9A9585" />
      <ContextBuilding position={[-40, 0, -40]} width={10} depth={8} height={22} color="#8A8575" />
      <ContextBuilding position={[70, 0, 0]} width={8} depth={8} height={30} color="#7A7568" />
      <ContextBuilding position={[-70, 0, 0]} width={10} depth={10} height={15} color="#A09888" />

      {isNightMode && (
        <>
          <pointLight position={[6, 6, 24]} intensity={1.2} color="#FFD080" distance={18} decay={2} />
          <pointLight position={[-6, 6, 24]} intensity={1.0} color="#FFD080" distance={15} decay={2} />
          <pointLight position={[18, 6, 24]} intensity={0.8} color="#FFD080" distance={15} decay={2} />
          <pointLight position={[-18, 6, 24]} intensity={0.8} color="#FFD080" distance={15} decay={2} />
          <pointLight position={[0, 6, -24]} intensity={0.8} color="#FFD080" distance={15} decay={2} />
          <pointLight position={[-30, 3, -15]} intensity={0.5} color="#FFD080" distance={12} decay={2} />
          <pointLight position={[30, 3, -15]} intensity={0.5} color="#FFD080" distance={12} decay={2} />
        </>
      )}
    </group>
  )
}
