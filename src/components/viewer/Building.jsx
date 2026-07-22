import React, { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../../stores/useStore'
import { materialPresets } from '../../data/buildings'

const _lerpTarget = new THREE.Vector3()

function WindowPane({ x, y, z, w, h, isNight, glass, windowId, unitStatus, isUnitSelected }) {
  const [hovered, setHovered] = useState(false)
  const setHoveredUnit = useStore((s) => s.setHoveredUnit)
  const setSelectedUnit = useStore((s) => s.setSelectedUnit)
  const selectedUnit = useStore((s) => s.selectedUnit)
  const buildings = useStore.getState ? null : null

  const statusColor = unitStatus === 'available' ? '#22C55E' : unitStatus === 'sold' ? '#EF4444' : unitStatus === 'reserved' ? '#FBBF24' : null
  const isSelected = selectedUnit === windowId

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    if (windowId && unitStatus && unitStatus !== 'common') {
      setSelectedUnit(isSelected ? null : windowId)
    }
  }, [windowId, unitStatus, isSelected, setSelectedUnit])

  const handleOver = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (windowId && unitStatus) {
      setHoveredUnit({ id: windowId, status: unitStatus })
    }
  }, [windowId, unitStatus, setHoveredUnit])

  const handleOut = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = 'default'
    setHoveredUnit(null)
  }, [setHoveredUnit])

  const emissiveColor = isNight ? '#FFD080' : (isSelected ? '#2563FF' : (hovered ? '#2563FF' : '#000000'))
  const emissiveStrength = isNight ? 0.6 : (isSelected ? 0.3 : (hovered ? 0.15 : 0))

  return (
    <group>
      <mesh
        position={[x, y, z]}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <boxGeometry args={[w, h, 0.06]} />
        <meshPhysicalMaterial
          color={isNight ? '#FFD080' : glass}
          metalness={0.1}
          roughness={0.02}
          transmission={isNight ? 0 : 0.7}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={isNight ? (isSelected ? 1 : 0.85) : (isSelected ? 0.7 : 0.45)}
          envMapIntensity={2.5}
          emissive={emissiveColor}
          emissiveIntensity={emissiveStrength}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {isSelected && statusColor && (
        <mesh position={[x, y - h / 2 - 0.15, z + 0.06]}>
          <boxGeometry args={[w * 0.5, 0.08, 0.02]} />
          <meshBasicMaterial color={statusColor} />
        </mesh>
      )}
    </group>
  )
}

function WindowRow({ width, z, y, buildingWidth, materialPreset, isNight, floorIndex, buildingData }) {
  const preset = materialPresets[materialPreset]
  const windowWidth = 1.4
  const windowHeight = 1.8
  const gap = 0.6
  const count = Math.floor(buildingWidth / (windowWidth + gap))
  const startX = -(count * (windowWidth + gap)) / 2
  const units = buildingData?.floors?.[floorIndex]?.units || []

  return (
    <group position={[0, y, z]}>
      {Array.from({ length: count }, (_, i) => {
        const unitIdx = i % units.length
        const unit = units[unitIdx] || null
        const wId = unit ? unit.id : null
        const wStatus = unit ? unit.status : null
        return (
          <React.Fragment key={i}>
            <WindowPane
              x={startX + i * (windowWidth + gap) + windowWidth / 2}
              y={0}
              z={0}
              w={windowWidth}
              h={windowHeight}
              isNight={isNight}
              glass={preset.glass}
              windowId={wId}
              unitStatus={wStatus}
            />
            <mesh position={[startX + i * (windowWidth + gap) + windowWidth / 2, windowHeight / 2 + 0.01, 0.035]}>
              <boxGeometry args={[windowWidth + 0.06, 0.04, 0.05]} />
              <meshPhysicalMaterial color="#1A1A1E" metalness={0.85} roughness={0.15} clearcoat={0.6} />
            </mesh>
            <mesh position={[startX + i * (windowWidth + gap) + windowWidth / 2, -windowHeight / 2 - 0.01, 0.035]}>
              <boxGeometry args={[windowWidth + 0.06, 0.04, 0.05]} />
              <meshPhysicalMaterial color="#1A1A1E" metalness={0.85} roughness={0.15} clearcoat={0.6} />
            </mesh>
            <mesh position={[startX + i * (windowWidth + gap) - gap / 2 + 0.01, 0, 0.035]}>
              <boxGeometry args={[0.04, windowHeight + 0.06, 0.05]} />
              <meshPhysicalMaterial color="#1A1A1E" metalness={0.85} roughness={0.15} clearcoat={0.6} />
            </mesh>
            <mesh position={[startX + i * (windowWidth + gap) + windowWidth + gap / 2 - 0.01, 0, 0.035]}>
              <boxGeometry args={[0.04, windowHeight + 0.06, 0.05]} />
              <meshPhysicalMaterial color="#1A1A1E" metalness={0.85} roughness={0.15} clearcoat={0.6} />
            </mesh>
          </React.Fragment>
        )
      })}
    </group>
  )
}

function Balcony({ x, width, materialPreset }) {
  const preset = materialPresets[materialPreset]
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, -0.04, 0.55]} receiveShadow castShadow>
        <boxGeometry args={[width - 0.2, 0.1, 1.0]} />
        <meshPhysicalMaterial color="#E0E0E0" roughness={0.35} metalness={0.08} clearcoat={0.4} clearcoatRoughness={0.3} />
      </mesh>
      <mesh position={[0, 0.42, 1.0]} castShadow>
        <boxGeometry args={[width - 0.2, 0.88, 0.03]} />
        <meshPhysicalMaterial color="#C8E0F0" metalness={0.02} roughness={0.05} transmission={0.65} thickness={0.3} ior={1.5} transparent opacity={0.35} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      {[-1, 0, 1].map(i => (
        <mesh key={i} position={[i * (width - 0.2) / 2, 0.2, 1.0]} castShadow>
          <boxGeometry args={[0.05, 0.85, 0.05]} />
          <meshPhysicalMaterial color="#2A2A2E" metalness={0.8} roughness={0.2} clearcoat={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -0.04, 1.0]} castShadow>
        <boxGeometry args={[width - 0.2, 0.05, 0.05]} />
        <meshPhysicalMaterial color="#2A2A2E" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Floor({ level, width, depth, materialPreset, isNight, buildingData, buildingIndex }) {
  const preset = materialPresets[materialPreset]
  const floorHeight = 3.2
  const y = level * floorHeight
  const selectedFloor = useStore((s) => s.selectedFloor)
  const setSelectedFloor = useStore((s) => s.setSelectedFloor)
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const setSelectedBuilding = useStore((s) => s.setSelectedBuilding)
  const isHighlighted = selectedBuilding === buildingIndex && selectedFloor === level

  const buildingColor = useMemo(() => {
    if (isHighlighted) return preset.accent
    return preset.wall
  }, [isHighlighted, preset])

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    if (selectedBuilding !== buildingIndex) {
      setSelectedBuilding(buildingIndex)
      setSelectedFloor(level)
    } else {
      setSelectedFloor(selectedFloor === level ? null : level)
    }
  }, [level, selectedFloor, selectedBuilding, buildingIndex, setSelectedFloor, setSelectedBuilding])

  const showBalcony = level > 0
  const balconySpacing = width / 4

  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow onClick={handleClick}>
        <boxGeometry args={[width, floorHeight - 0.04, depth]} />
        <meshPhysicalMaterial
          color={buildingColor}
          roughness={preset.wallRoughness ?? 0.6}
          metalness={preset.wallMetalness ?? 0.02}
          clearcoat={preset.clearcoat ?? 0.2}
          clearcoatRoughness={0.35}
          envMapIntensity={1.2}
        />
      </mesh>

      <WindowRow
        width={width}
        z={depth / 2 + 0.02}
        y={0}
        buildingWidth={width}
        materialPreset={materialPreset}
        isNight={isNight}
        floorIndex={level}
        buildingData={buildingData}
      />
      <WindowRow
        width={width}
        z={-depth / 2 - 0.02}
        y={0}
        buildingWidth={width}
        materialPreset={materialPreset}
        isNight={isNight}
        floorIndex={level}
        buildingData={buildingData}
      />

      {showBalcony && Array.from({ length: 3 }, (_, i) => (
        <Balcony
          key={i}
          x={-balconySpacing + i * balconySpacing}
          width={balconySpacing * 0.85}
          materialPreset={materialPreset}
        />
      ))}

      {level % 5 === 0 && level > 0 && (
        <mesh position={[0, -floorHeight / 2 + 0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[width + 0.3, 0.15, depth + 0.3]} />
          <meshPhysicalMaterial
            color={preset.accent}
            roughness={0.25}
            metalness={0.45}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
            envMapIntensity={1.8}
          />
        </mesh>
      )}

      {isHighlighted && (
        <mesh position={[0, -floorHeight / 2 - 0.02, depth / 2 + 0.03]}>
          <planeGeometry args={[width, floorHeight - 0.06]} />
          <meshBasicMaterial color={preset.accent} transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

const MemoFloor = React.memo(Floor)

function RooftopDetails({ width, depth, isNight }) {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[width * 0.35, 0.8, depth * 0.35]} />
        <meshPhysicalMaterial color="#555555" roughness={0.5} metalness={0.35} clearcoat={0.2} />
      </mesh>
      <mesh position={[width * 0.22, 0.3, -depth * 0.18]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 12]} />
        <meshPhysicalMaterial color="#777777" roughness={0.25} metalness={0.65} clearcoat={0.6} />
      </mesh>
      <mesh position={[-width * 0.2, 0.25, depth * 0.2]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshPhysicalMaterial color="#4A4A4A" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[width + 0.6, 0.2, depth + 0.6]} />
        <meshPhysicalMaterial color="#5A5A5A" roughness={0.7} metalness={0.15} />
      </mesh>
      {isNight && (
        <pointLight position={[0, 1, 0]} intensity={0.3} color="#FFD080" distance={8} decay={2} />
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

  const isSelected = selectedBuilding === index

  const buildingConfig = useMemo(() => {
    const configs = {
      'tower-a': { width: 12, depth: 10 },
      'villa-b': { width: 14, depth: 12 },
      'complex-c': { width: 16, depth: 14 },
    }
    return configs[building.id] || { width: 12, depth: 10 }
  }, [building.id])

  useFrame(() => {
    if (groupRef.current) {
      const targetScale = isSelected ? 1 : 0.97
      _lerpTarget.set(targetScale, targetScale, targetScale)
      groupRef.current.scale.lerp(_lerpTarget, 0.04)
    }
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    setSelectedBuilding(index)
  }, [index, setSelectedBuilding])

  return (
    <group ref={groupRef} position={building.position}>
      <group onClick={handleClick}>
        {Array.from({ length: building.floors.length }, (_, i) => (
          <MemoFloor
            key={i}
            level={i}
            width={buildingConfig.width}
            depth={buildingConfig.depth}
            materialPreset={materialPreset}
            isNight={isNightMode}
            buildingData={building}
            buildingIndex={index}
          />
        ))}

        <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[buildingConfig.width + 1.2, 1, buildingConfig.depth + 1.2]} />
          <meshPhysicalMaterial
            color="#333333"
            roughness={0.65}
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.5}
          />
        </mesh>

        <group position={[0, building.floors.length * 3.2 - 1.6, 0]}>
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
