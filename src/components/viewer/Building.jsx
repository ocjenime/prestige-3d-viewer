import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { materialPresets } from '../../data/buildings'

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
        <mesh key={i} position={[startX + i * (windowWidth + gap) + windowWidth / 2, 0, 0]} castShadow>
          <boxGeometry args={[windowWidth, windowHeight, 0.05]} />
          <meshPhysicalMaterial
            color={isNight ? '#FFE4A0' : preset.glass}
            metalness={0.1}
            roughness={0.05}
            transmission={isNight ? 0 : 0.6}
            transparent
            opacity={isNight ? 0.95 : 0.7}
            emissive={isNight ? '#FFE4A0' : '#000000'}
            emissiveIntensity={isNight ? 0.4 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

function Floor({ level, width, depth, materialPreset, isNight, buildingData, isSelected }) {
  const preset = materialPresets[materialPreset]
  const floorHeight = 3.2
  const y = level * floorHeight

  const [hovered, setHovered] = useState(false)

  const buildingColor = useMemo(() => {
    if (isSelected) return preset.accent
    if (hovered) return '#C9A84C'
    return preset.wall
  }, [isSelected, hovered, preset])

  return (
    <group position={[0, y, 0]}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[width, floorHeight - 0.05, depth]} />
        <meshPhysicalMaterial
          color={buildingColor}
          roughness={0.85}
          metalness={0.05}
          clearcoat={0.1}
          clearcoatRoughness={0.3}
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

      {level % 5 === 0 && level > 0 && (
        <mesh position={[0, -floorHeight / 2 + 0.05, 0]} castShadow>
          <boxGeometry args={[width + 0.3, 0.15, depth + 0.3]} />
          <meshPhysicalMaterial color={preset.accent} roughness={0.4} metalness={0.3} />
        </mesh>
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
  const isVisible = useMemo(() => {
    if (isSelected) return true
    return true
  }, [isSelected])

  const buildingConfig = useMemo(() => {
    const configs = {
      'tower-a': { width: 12, depth: 10, floors: 25 },
      'villa-b': { width: 14, depth: 12, floors: 3 },
      'complex-c': { width: 16, depth: 14, floors: 18 },
    }
    return configs[building.id] || { width: 12, depth: 10, floors: 10 }
  }, [building.id])

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = isSelected ? 1 : 0.95
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} position={building.position}>
      <group
        onClick={(e) => {
          e.stopPropagation()
          setSelectedBuilding(index)
          if (isSelected) toggleBuildingInfo()
        }}
      >
        {Array.from({ length: building.floors.length }, (_, i) => {
          const floorData = building.floors[i]
          const shouldHighlight = isSelected && selectedFloor === i

          if (!isSelected && i > 3) {
            return null
          }

          return (
            <Floor
              key={i}
              level={i}
              width={buildingConfig.width}
              depth={buildingConfig.depth}
              materialPreset={materialPreset}
              isNight={isNightMode}
              buildingData={floorData}
              isSelected={shouldHighlight}
            />
          )
        })}

        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[buildingConfig.width + 1, 1, buildingConfig.depth + 1]} />
          <meshPhysicalMaterial color="#3A3A3A" roughness={0.9} metalness={0.1} />
        </mesh>

        {isSelected && (
          <lineSegments position={[0, (building.floors.length * 3.2) / 2, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(buildingConfig.width + 0.5, building.floors.length * 3.2, buildingConfig.depth + 0.5)]} />
            <lineBasicMaterial color="#C9A84C" linewidth={1} transparent opacity={0.6} />
          </lineSegments>
        )}
      </group>
    </group>
  )
}
