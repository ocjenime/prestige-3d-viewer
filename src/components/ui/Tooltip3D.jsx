import React from 'react'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'

const statusMap = {
  available: 'Dostupno',
  sold: 'Prodato',
  reserved: 'Rezervisano',
  common: 'Zajedničko',
}

export default function Tooltip3D() {
  const hoveredUnit = useStore((s) => s.hoveredUnit)
  const selectedUnit = useStore((s) => s.selectedUnit)
  const selectedBuilding = useStore((s) => s.selectedBuilding)

  const unitInfo = hoveredUnit || (selectedUnit ? findUnit(selectedUnit, buildings[selectedBuilding]) : null)
  if (!unitInfo) return null

  const statusColors = {
    available: 'var(--success)',
    sold: 'var(--error)',
    reserved: 'var(--warning)',
  }

  return (
    <div style={{
      position: 'absolute',
      right: '24px',
      top: '80px',
      zIndex: 30,
    }}>
      <div className="tooltip-3d">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h4 style={{ textTransform: 'capitalize' }}>
            {(unitInfo.type || '').replace(/-/g, ' ')}
          </h4>
          <span style={{
            fontSize: 10,
            background: 'var(--bg-tertiary)',
            padding: '2px 8px',
            borderRadius: 4,
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            {unitInfo.id}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p>Površina: {unitInfo.area}</p>
          {unitInfo.rooms > 0 && <p>Sobe: {unitInfo.rooms}</p>}
          <p>Cijena: {unitInfo.price}</p>
        </div>
        <div style={{
          marginTop: 8,
          padding: '4px 12px',
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          background: `${statusColors[unitInfo.status] || '#666'}20`,
          color: statusColors[unitInfo.status] || '#666',
          textAlign: 'center',
        }}>
          {statusMap[unitInfo.status] || unitInfo.status}
        </div>
      </div>
    </div>
  )
}

function findUnit(unitId, building) {
  if (!building || !building.floors) return null
  for (const floor of building.floors) {
    for (const unit of floor.units) {
      if (unit.id === unitId) return unit
    }
  }
  return null
}
