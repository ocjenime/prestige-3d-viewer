import React, { useMemo } from 'react'
import * as THREE from 'three'
import useStore from '../../stores/useStore'

function Sidewalk({ position, width, length, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.04, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#C8C0B0" roughness={0.8} />
      </mesh>
      {Array.from({ length: Math.floor(length / 3) }, (_, i) => (
        <mesh key={i} position={[0, 0.045, -length / 2 + i * 3 + 1.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, 0.02]} />
          <meshStandardMaterial color="#A8A098" />
        </mesh>
      ))}
    </group>
  )
}

function Road({ position, width, length, rotation = 0 }) {
  const dashes = Math.floor(length / 3.5)
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.03, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.034, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.6, length]} />
        <meshStandardMaterial color="#444444" roughness={0.92} />
      </mesh>
      {Array.from({ length: dashes }, (_, i) => (
        <mesh key={i} position={[0, 0.038, -length / 2 + i * 3.5 + 1.75]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 1.8]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  )
}

function Tree({ position, scale = 1, variant = 0 }) {
  const trunkH = 2.5 + variant * 0.5
  const canopyR = 1.2 + variant * 0.3
  const green = ['#1E6A18', '#2A7A22', '#1D5A15', '#2D8A28'][variant % 4]
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, trunkH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, trunkH, 6]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[0, trunkH + canopyR * 0.5, 0]} castShadow>
        <sphereGeometry args={[canopyR, 8, 6]} />
        <meshStandardMaterial color={green} roughness={0.85} />
      </mesh>
      <mesh position={[canopyR * 0.4, trunkH + canopyR * 0.7, canopyR * 0.3]} castShadow>
        <sphereGeometry args={[canopyR * 0.6, 8, 6]} />
        <meshStandardMaterial color={green} roughness={0.85} />
      </mesh>
    </group>
  )
}

function FruitTree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 3, 6]} />
        <meshStandardMaterial color="#6B4226" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[1.0, 8, 6]} />
        <meshStandardMaterial color="#2D7A26" roughness={0.85} />
      </mesh>
      {[0, 1.2, 2.4, 3.6, 5.0].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.5, 3.4 + (i % 2) * 0.2, Math.sin(angle) * 0.5]} castShadow>
          <sphereGeometry args={[0.1, 6, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#CC3333' : '#DD5522'} />
        </mesh>
      ))}
    </group>
  )
}

function BosnianHouse({ position, width = 8, depth = 7, height = 3.5, wallColor = '#F0EDE8', roofColor = '#C04020', hasFence = true, hasYard = true, rotation = 0 }) {
  const floorH = 3.2
  const floors = Math.round(height / floorH)
  const roofH = 2.2

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {hasYard && (
        <mesh position={[0, 0.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width + 3, depth + 4]} />
          <meshStandardMaterial color="#4A8A3A" roughness={0.92} />
        </mesh>
      )}

      {hasFence && (
        <>
          {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dz], i) => (
            <mesh key={i} position={[dx * (width / 2 + 1.3), 0.4, dz * (depth / 2 + 1.8)]} castShadow>
              <boxGeometry args={[i < 2 ? 0.06 : width + 2.6, 0.8, i < 2 ? depth + 3.6 : 0.06]} />
              <meshStandardMaterial color="#E8E0D4" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[0, 0.85, depth / 2 + 1.8]} castShadow>
            <boxGeometry args={[width + 2.6, 0.06, 0.04]} />
            <meshStandardMaterial color="#8A8078" roughness={0.7} />
          </mesh>
        </>
      )}

      {Array.from({ length: floors }, (_, i) => (
        <group key={i}>
          <mesh position={[0, i * floorH + floorH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[width, floorH - 0.04, depth]} />
            <meshPhysicalMaterial
              color={wallColor}
              roughness={0.75}
              metalness={0.01}
              clearcoat={0.1}
              clearcoatRoughness={0.6}
            />
          </mesh>

          <mesh position={[0, i * floorH + floorH / 2, depth / 2 + 0.02]}>
            <planeGeometry args={[width * 0.75, floorH * 0.55]} />
            <meshPhysicalMaterial
              color="#8ABED8"
              metalness={0.05}
              roughness={0.1}
              transmission={0.5}
              thickness={0.3}
              transparent
              opacity={0.5}
              clearcoat={0.8}
            />
          </mesh>

          <mesh position={[0, i * floorH + floorH * 0.78, depth / 2 + 0.025]}>
            <boxGeometry args={[width * 0.75 + 0.06, 0.04, 0.03]} />
            <meshStandardMaterial color="#5A5048" roughness={0.6} />
          </mesh>
          <mesh position={[0, i * floorH + floorH * 0.22, depth / 2 + 0.025]}>
            <boxGeometry args={[width * 0.75 + 0.06, 0.04, 0.03]} />
            <meshStandardMaterial color="#5A5048" roughness={0.6} />
          </mesh>

          {[-1, 0, 1].map(s => (
            <mesh key={s} position={[s * (width * 0.75 / 2 + 0.02), i * floorH + floorH / 2, depth / 2 + 0.025]}>
              <boxGeometry args={[0.04, floorH * 0.55 + 0.06, 0.03]} />
              <meshStandardMaterial color="#5A5048" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, floors * floorH + roofH / 2, 0]} castShadow>
        <coneGeometry args={[Math.max(width, depth) * 0.72, roofH, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.65} metalness={0.05} />
      </mesh>

      <mesh position={[0, floors * floorH - 0.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[width + 0.3, 0.12, depth + 0.3]} />
        <meshStandardMaterial color="#8A8078" roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.03, depth / 2 + 0.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial color="#6B5A48" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Fence({ start, end, posts = 8 }) {
  const dx = end[0] - start[0]
  const dz = end[1] - start[1]
  const len = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dz, dx)
  const cx = (start[0] + end[0]) / 2
  const cz = (start[1] + end[1]) / 2

  return (
    <group position={[cx, 0, cz]} rotation={[0, -angle, 0]}>
      {Array.from({ length: posts + 1 }, (_, i) => (
        <mesh key={i} position={[-len / 2 + i * (len / posts), 0.5, 0]} castShadow>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
          <meshStandardMaterial color="#7A7A7E" roughness={0.6} metalness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[len, 0.04, 0.03]} />
        <meshStandardMaterial color="#7A7A7E" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  )
}

function StreetLamp({ position, isNight }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 5, 6]} />
        <meshStandardMaterial color="#4A4A4E" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 5.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.12, 8]} />
        <meshStandardMaterial color="#555555" roughness={0.5} />
      </mesh>
      {isNight && (
        <>
          <mesh position={[0, 5.0, 0]}>
            <sphereGeometry args={[0.1, 8, 6]} />
            <meshStandardMaterial color="#FFE8B0" emissive="#FFE8B0" emissiveIntensity={2} />
          </mesh>
          <pointLight position={[0, 5.0, 0]} intensity={1.2} color="#FFE8B0" distance={18} decay={2} />
        </>
      )}
    </group>
  )
}

function SmallBench({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.4, 0.06, 0.35]} />
        <meshStandardMaterial color="#6B4A28" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.6, -0.14]} castShadow>
        <boxGeometry args={[1.4, 0.4, 0.04]} />
        <meshStandardMaterial color="#6B4A28" roughness={0.85} />
      </mesh>
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0.18, 0]} castShadow>
          <boxGeometry args={[0.06, 0.35, 0.35]} />
          <meshStandardMaterial color="#3A3A3E" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function SmallFountain({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.0, 2.3, 0.5, 16]} />
        <meshStandardMaterial color="#B8B0A0" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.25, 16]} />
        <meshPhysicalMaterial color="#3A7A9E" transmission={0.3} clearcoat={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8, 8]} />
        <meshStandardMaterial color="#A8A090" roughness={0.6} />
      </mesh>
    </group>
  )
}

function GrassPatch({ position, width, length }) {
  return (
    <mesh position={[position[0], 0.02, position[2]]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#3A8A32" roughness={0.92} />
    </mesh>
  )
}

function ParkingLot({ position, spots = 12, rotation = 0 }) {
  const cols = Math.min(spots, 6)
  const rows = Math.ceil(spots / cols)
  const spotW = 2.8
  const spotL = 5.0
  const gap = 0.15
  const totalW = cols * (spotW + gap)
  const totalL = rows * (spotL + gap)

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[totalW + 2, totalL + 2]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.95} />
      </mesh>
      {Array.from({ length: spots }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = -totalW / 2 + col * (spotW + gap) + spotW / 2
        const z = -totalL / 2 + row * (spotL + gap) + spotL / 2
        return (
          <mesh key={i} position={[x, 0.015, z]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[spotW, spotL]} />
            <meshStandardMaterial color="#4A4A4A" roughness={0.9} />
          </mesh>
        )
      })}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <mesh key={i} position={[0, 0.012, -totalL / 2 + i * (spotL + gap)]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[totalW, 0.06]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function SmallShop({ position, width = 5, depth = 4, height = 3.2, wallColor = '#E8E4DD', signColor = '#2563FF', rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial color={wallColor} roughness={0.7} metalness={0.01} clearcoat={0.1} />
      </mesh>
      <mesh position={[0, height * 0.7, depth / 2 + 0.02]}>
        <planeGeometry args={[width * 0.85, height * 0.5]} />
        <meshPhysicalMaterial color="#8ABED8" transmission={0.5} roughness={0.1} transparent opacity={0.5} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, height + 0.3, depth / 2 + 0.05]} castShadow>
        <boxGeometry args={[width * 0.6, 0.4, 0.08]} />
        <meshStandardMaterial color={signColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, height + 1.2, 0]} castShadow>
        <coneGeometry args={[Math.max(width, depth) * 0.7, 1.5, 4]} />
        <meshStandardMaterial color="#B84030" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function GroundPlane() {
  const isNightMode = useStore((s) => s.isNightMode)

  return (
    <group position={[0, -1, 0]}>
      <mesh position={[0, -0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color={isNightMode ? '#080C12' : '#6A9A50'} roughness={0.92} />
      </mesh>

      <GrassPatch position={[-10, 0, 0]} width={20} length={20} />
      <GrassPatch position={[10, 0, 0]} width={18} length={18} />

      <Road position={[0, 0.03, 20]} width={7} length={120} />
      <Road position={[-25, 0.03, 0]} width={5} length={100} rotation={Math.PI / 2} />
      <Road position={[25, 0.03, 0]} width={5} length={100} rotation={Math.PI / 2} />

      <Sidewalk position={[0, 0.04, 16]} width={3} length={115} />
      <Sidewalk position={[0, 0.04, 24]} width={3} length={115} />
      <Sidewalk position={[-22, 0.04, 0]} width={3} length={95} rotation={Math.PI / 2} />
      <Sidewalk position={[22, 0.04, 0]} width={3} length={95} rotation={Math.PI / 2} />

      <ParkingLot position={[35, 0, -12]} spots={12} />
      <ParkingLot position={[-35, 0, -12]} spots={10} />

      <SmallFountain position={[0, 0, 10]} />

      <Tree position={[12, 0, 18]} scale={1.0} variant={0} />
      <Tree position={[-12, 0, 18]} scale={0.9} variant={1} />
      <Tree position={[20, 0, 18]} scale={1.1} variant={2} />
      <Tree position={[-20, 0, 18]} scale={0.85} variant={3} />
      <Tree position={[30, 0, 18]} scale={0.95} variant={0} />
      <Tree position={[-30, 0, 18]} scale={1.0} variant={1} />
      <Tree position={[-42, 0, 18]} scale={0.9} variant={2} />
      <Tree position={[42, 0, 18]} scale={1.05} variant={0} />

      <Tree position={[10, 0, -16]} scale={0.95} variant={1} />
      <Tree position={[-10, 0, -16]} scale={1.0} variant={2} />
      <Tree position={[20, 0, -16]} scale={0.85} variant={3} />
      <Tree position={[-20, 0, -16]} scale={0.9} variant={0} />
      <Tree position={[35, 0, -16]} scale={1.0} variant={1} />
      <Tree position={[-35, 0, -16]} scale={0.95} variant={2} />

      <FruitTree position={[6, 0, 10]} />
      <FruitTree position={[-6, 0, 10]} />
      <FruitTree position={[3, 0, -5]} />
      <FruitTree position={[-3, 0, -5]} />
      <FruitTree position={[15, 0, 5]} />
      <FruitTree position={[-15, 0, 5]} />

      <SmallBench position={[4, 0, 10]} />
      <SmallBench position={[-4, 0, 10]} />
      <SmallBench position={[8, 0, 7]} rotation={-Math.PI / 2} />
      <SmallBench position={[-8, 0, 7]} rotation={Math.PI / 2} />

      <StreetLamp position={[4, 0, 16.5]} isNight={isNightMode} />
      <StreetLamp position={[-4, 0, 16.5]} isNight={isNightMode} />
      <StreetLamp position={[15, 0, 16.5]} isNight={isNightMode} />
      <StreetLamp position={[-15, 0, 16.5]} isNight={isNightMode} />
      <StreetLamp position={[0, 0, -16.5]} isNight={isNightMode} />
      <StreetLamp position={[12, 0, -16.5]} isNight={isNightMode} />
      <StreetLamp position={[-12, 0, -16.5]} isNight={isNightMode} />

      <Fence start={[-50, 28]} end={[50, 28]} posts={18} />
      <Fence start={[-50, -28]} end={[50, -28]} posts={18} />

      <BosnianHouse position={[48, 0, 12]} width={7} depth={6} height={3.5} wallColor="#F0EDE8" roofColor="#C04020" />
      <BosnianHouse position={[48, 0, -2]} width={8} depth={7} height={6.5} wallColor="#E8E4DD" roofColor="#B83828" />
      <BosnianHouse position={[48, 0, -16]} width={7} depth={6} height={3.5} wallColor="#F5F0E8" roofColor="#C84830" />

      <BosnianHouse position={[-48, 0, 12]} width={8} depth={7} height={6.5} wallColor="#E8E0D4" roofColor="#B83828" />
      <BosnianHouse position={[-48, 0, -2]} width={7} depth={6} height={3.5} wallColor="#F0EDE8" roofColor="#C04020" />
      <BosnianHouse position={[-48, 0, -16]} width={9} depth={7} height={6.5} wallColor="#E4DCD0" roofColor="#A83020" />

      <BosnianHouse position={[10, 0, -35]} width={8} depth={7} height={6.5} wallColor="#F0EDE8" roofColor="#C04020" />
      <BosnianHouse position={[-10, 0, -35]} width={7} depth={6} height={3.5} wallColor="#E8E4DD" roofColor="#B83828" />
      <BosnianHouse position={[25, 0, -35]} width={9} depth={7} height={6.5} wallColor="#E8E0D4" roofColor="#C84830" />
      <BosnianHouse position={[-25, 0, -35]} width={8} depth={6} height={3.5} wallColor="#F5F0E8" roofColor="#A83020" />
      <BosnianHouse position={[40, 0, -35]} width={7} depth={6} height={3.5} wallColor="#E4DCD0" roofColor="#C04020" />
      <BosnianHouse position={[-40, 0, -35]} width={8} depth={7} height={6.5} wallColor="#E8E4DD" roofColor="#B83828" />

      <SmallShop position={[55, 0, 38]} width={5} depth={4} height={3.2} signColor="#2563FF" />
      <SmallShop position={[-55, 0, 38]} width={5} depth={4} height={3.2} signColor="#FF6A1F" />

      <BosnianHouse position={[55, 0, 45]} width={7} depth={6} height={3.5} wallColor="#F0EDE8" roofColor="#C04020" rotation={Math.PI} />
      <BosnianHouse position={[-55, 0, 45]} width={8} depth={7} height={6.5} wallColor="#E8E0D4" roofColor="#B83828" rotation={Math.PI} />

      <BosnianHouse position={[60, 0, 15]} width={8} depth={7} height={6.5} wallColor="#E8E4DD" roofColor="#A83020" rotation={Math.PI / 2} />
      <BosnianHouse position={[-60, 0, 15]} width={7} depth={6} height={3.5} wallColor="#F5F0E8" roofColor="#C84830" rotation={-Math.PI / 2} />

      {isNightMode && (
        <>
          <pointLight position={[4, 5, 20]} intensity={1.0} color="#FFE8B0" distance={16} decay={2} />
          <pointLight position={[-4, 5, 20]} intensity={0.8} color="#FFE8B0" distance={14} decay={2} />
          <pointLight position={[15, 5, 20]} intensity={0.7} color="#FFE8B0" distance={12} decay={2} />
          <pointLight position={[-15, 5, 20]} intensity={0.7} color="#FFE8B0" distance={12} decay={2} />
          <pointLight position={[0, 5, -20]} intensity={0.6} color="#FFE8B0" distance={12} decay={2} />
          <pointLight position={[-25, 3, -10]} intensity={0.4} color="#FFE8B0" distance={10} decay={2} />
          <pointLight position={[25, 3, -10]} intensity={0.4} color="#FFE8B0" distance={10} decay={2} />
        </>
      )}
    </group>
  )
}
