import React from 'react'
import useStore from '../../stores/useStore'

export default function Tooltip3D() {
  const hoveredUnit = useStore((s) => s.hoveredUnit)

  if (!hoveredUnit) return null

  return (
    <div style={{
      position: 'absolute',
      right: '24px',
      top: '80px',
      zIndex: 30,
    }}>
      <div className="tooltip-3d">
        <h4>{hoveredUnit.type?.replace('-', ' ')}</h4>
        <p>Area: {hoveredUnit.area}</p>
        <p>Price: {hoveredUnit.price}</p>
        <p style={{ color: hoveredUnit.status === 'available' ? 'var(--success)' : 'var(--error)' }}>
          {hoveredUnit.status?.toUpperCase()}
        </p>
      </div>
    </div>
  )
}
