import React, { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { materialPresets } from '../../data/buildings'

const _lerpTarget = new THREE.Vector3()

function WindowRow({ width, z, y, buildingWidth, materialPreset, isNight }) {
  const preset = materialPresets[materialPreset]
  const windowWidth = 1.2
  const windowHeight = 1.6
  const gap = 0.8
  const count = Math.floor(buildingWidth / (windowWidth + gap))
  const startX = -(count * (windowWidth + gap)) / 2

  return (
    <group position={[0, y, z]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} position={[startX + i * (windowWidth + gap) + windowWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[windowWidth, windowHeight, 0.08]} />
          <meshPhysicalMaterial
            color={isNight ? '#FFD080' : preset.glass}
            metalness={0.1}
            roughness={0.02}
            transmission={isNight ? 0 : 0.7}
            thickness={0.5}
            ior={1.5}
            transparent
            opacity={isNight ? 0.95 : 0.5}
            envMapIntensity={2.0}
            emissive={isNight ? '#FFD080' : '#000000'}
            emissiveIntensity={isNight ? 0.5 : 0}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      ))}
      {z > 0 && Array.from({ length: count }, (_, i) => (
        <mesh
          key={`frame-h-${i}`}
          position={[startX + i * (windowWidth + gap) + windowWidth / 2, windowHeight / 2, 0.04]}
        >
          <boxGeometry args={[windowWidth + 0.06, 0.05, 0.06]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {z > 0 && Array.from({ length: count }, (_, i) => (
        <mesh
          key={`frame-v-${i}`}
          position={[startX + i * (windowWidth + gap) + windowWidth / 2, 0, 0.04]}
        >
          <boxGeometry args={[0.05, windowHeight + 0.06, 0.06]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Balcony({ width, depth, materialPreset }) {
  const preset = materialPresets[materialPreset]
  return (
    <group>
      <mesh position={[0, -0.02, depth / 2 + 0.4]} receiveShadow castShadow>
        <boxGeometry args={[width * 0.85, 0.12, 0.8]} />
        <meshPhysicalMaterial color="#D0D0D0" roughness={0.4} metalness={0.1} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>
      <mesh position={[0, 0.4, depth / 2 + 0.8]} castShadow>
        <boxGeometry args={[width * 0.85, 0.85, 0.04]} />
        <meshPhysicalMaterial color="#88BBDD" metalness={0.05} roughness={0.05} transmission={0.6} thickness={0.3} ior={1.5} transparent opacity={0.4} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      {[-1, 0, 1].map(i => (
        <mesh key={i} position={[i * (width * 0.85) / 2, 0.2, depth / 2 + 0.8]} castShadow>
          <boxGeometry args={[0.06, 0.8, 0.06]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Floor({ level, width, depth, materialPreset, isNight, isSelected }) {
  const preset = materialPresets[materialPreset]
  const floorHeight = 3.2
  const y = level * floorHeight
  const [hovered, setHovered] = useState(false)

  const buildingColor = useMemo(() => {
    if (isSelected) return preset.accent
    if (hovered) return '#C9A84C'
    return preset.wall
  }, [isSelected, hovered, preset])

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }, [])

  const showBalcony = level > 0 && level % 3 === 0

  return (
    <group position={[0, y, 0]}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[width, floorHeight - 0.05, depth]} />
        <meshPhysicalMaterial
          color={buildingColor}
          roughness={preset.wallRoughness ?? 0.6}
          metalness={preset.wallMetalness ?? 0.02}
          clearcoat={preset.clearcoat ?? 0.2}
          clearcoatRoughness={0.4}
          envMapIntensity={1.0}
        />
      </mesh>

      <WindowRow
        width={width}
        z={depth / 2 + 0.01}
        y={0}
        buildingWidth={width}
        materialPreset={materialPreset}
        isNight={isNight}
      />
      <WindowRow
        width={width}
        z={-depth / 2 - 0.01}
        y={0}
        buildingWidth={width}
        materialPreset={materialPreset}
        isNight={isNight}
      />

      {showBalcony && (
        <Balcony width={width} depth={depth} materialPreset={materialPreset} />
      )}

      {level % 5 === 0 && level > 0 && (
        <group>
          <mesh position={[0, -floorHeight / 2 + 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.4, 0.2, depth + 0.4]} />
            <meshPhysicalMaterial
              color={preset.accent}
              roughness={0.3}
              metalness={0.4}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

const MemoFloor = React.memo(Floor)

function SelectionOutline({ width, height, depth }) {
  const obj = useMemo(() => {
    const geo = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(width, height, depth)
    )
    const mat = new THREE.LineBasicMaterial({ color: '#C9A84C', transparent: true, opacity: 0.6 })
    return new THREE.LineSegments(geo, mat)
  }, [width, height, depth])

  return <primitive object={obj} />
}

function RooftopDetails({ width, depth, isNight }) {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[width * 0.3, 0.6, depth * 0.3]} />
        <meshPhysicalMaterial color="#666666" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[width * 0.25, 0, -depth * 0.2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.0, 12]} />
        <meshPhysicalMaterial color="#888888" roughness={0.3} metalness={0.6} clearcoat={0.5} />
      </mesh>
      {!isNight && (
        <>
          <pointLight position={[0, 0.5, 0]} intensity={0.1} color="#FFFFFF" distance={5} />
        </>
      )}
    </group>
  )
}

export default function Building({ building, index }) {
  const groupRef = useRef()
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const materialPreset = useStore((s) => s.materialPreset)
  const isNightMode = useStore((s) => s.isNightMode)
  const setSelectedBuilding = useStore((s) => s.setSelectedBuilding)
  const toggleBuildingInfo = useStore((s) => s.toggleBuildingInfo)
  const selectedFloor = useStore((s) => s.selectedFloor)

  const isSelected = selectedBuilding === index

  const buildingConfig = useMemo(() => {
    const configs = {
      'tower-a': { width: 12, depth: 10, floors: 25 },
      'villa-b': { width: 14, depth: 12, floors: 3 },
      'complex-c': { width: 16, depth: 14, floors: 18 },
    }
    return configs[building.id] || { width: 12, depth: 10, floors: 10 }
  }, [building.id])

  useFrame(() => {
    if (groupRef.current) {
      const targetScale = isSelected ? 1 : 0.95
      _lerpTarget.set(targetScale, targetScale, targetScale)
      groupRef.current.scale.lerp(_lerpTarget, 0.05)
    }
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    setSelectedBuilding(index)
    if (isSelected) toggleBuildingInfo()
  }, [index, isSelected, setSelectedBuilding, toggleBuildingInfo])

  const floorCount = isSelected ? building.floors.length : Math.min(4, building.floors.length)
  const outlineHeight = building.floors.length * 3.2

  return (
    <group ref={groupRef} position={building.position}>
      <group onClick={handleClick}>
        {Array.from({ length: floorCount }, (_, i) => {
          const shouldHighlight = isSelected && selectedFloor === i
          return (
            <MemoFloor
              key={i}
              level={i}
              width={buildingConfig.width}
              depth={buildingConfig.depth}
              materialPreset={materialPreset}
              isNight={isNightMode}
              isSelected={shouldHighlight}
            />
          )
        })}

        <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[buildingConfig.width + 1, 1, buildingConfig.depth + 1]} />
          <meshPhysicalMaterial
            color="#3A3A3A"
            roughness={0.7}
            metalness={0.08}
            clearcoat={0.15}
            clearcoatRoughness={0.6}
          />
        </mesh>

        {isSelected && (
          <group position={[0, outlineHeight / 2, 0]}>
            <SelectionOutline
              width={buildingConfig.width + 0.5}
              height={outlineHeight}
              depth={buildingConfig.depth + 0.5}
            />
          </group>
        )}

        <group position={[0, building.floors.length * 3.2 + 0.2, 0]}>
          <RooftopDetails
            width={buildingConfig.width}
            depth={buildingConfig.depth}
            isNight={isNightMode}
          />
        </group>
      </group>
    </group>
  )
}
