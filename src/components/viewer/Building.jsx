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

  const windowColor = isNight ? '#FFE4A0' : preset.glass

  return (
    <group position={[0, y, z]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} position={[startX + i * (windowWidth + gap) + windowWidth / 2, 0, 0]} castShadow>
          <boxGeometry args={[windowWidth, windowHeight, 0.05]} />
          <meshStandardMaterial
            color={windowColor}
            metalness={isNight ? 0 : 0.2}
            roughness={isNight ? 0.3 : 0.1}
            transparent
            opacity={isNight ? 0.95 : 0.6}
            emissive={isNight ? '#FFE4A0' : '#000000'}
            emissiveIntensity={isNight ? 0.3 : 0}
          />
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

  return (
    <group position={[0, y, 0]}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[width, floorHeight - 0.05, depth]} />
        <meshStandardMaterial
          color={buildingColor}
          roughness={0.85}
          metalness={0.05}
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
          <meshStandardMaterial color={preset.accent} roughness={0.4} metalness={0.3} />
        </mesh>
      )}
    </group>
  )
}

const MemoFloor = React.memo(Floor)

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

  const edgesGeo = useMemo(() => {
    return new THREE.EdgesGeometry(
      new THREE.BoxGeometry(buildingConfig.width + 0.5, building.floors.length * 3.2, buildingConfig.depth + 0.5)
    )
  }, [buildingConfig.width, buildingConfig.depth, building.floors.length])

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

        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[buildingConfig.width + 1, 1, buildingConfig.depth + 1]} />
          <meshStandardMaterial color="#3A3A3A" roughness={0.9} metalness={0.1} />
        </mesh>

        {isSelected && (
          <lineSegments position={[0, (building.floors.length * 3.2) / 2, 0]} geometry={edgesGeo}>
            <lineBasicMaterial color="#C9A84C" transparent opacity={0.6} />
          </lineSegments>
        )}
      </group>
    </group>
  )
}
