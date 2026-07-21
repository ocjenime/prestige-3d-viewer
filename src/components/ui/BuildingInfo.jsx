import React from 'react'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'

export default function BuildingInfo() {
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const toggleBuildingInfo = useStore((s) => s.toggleBuildingInfo)
  const building = buildings[selectedBuilding]

  return (
    <div className="building-info-overlay">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <h2>{building.name}</h2>
        <button
          onClick={toggleBuildingInfo}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.2s',
          }}
        >
          ✕
        </button>
      </div>
      <div className="subtitle">{building.description}</div>
      <div className="info-grid">
        <div className="info-item">
          <div className="label">Spratovi</div>
          <div className="value">{building.stats.floors}</div>
        </div>
        <div className="info-item">
          <div className="label">Ukupna Površina</div>
          <div className="value">{building.stats.totalArea}</div>
        </div>
        <div className="info-item">
          <div className="label">Cjenovni Raspon</div>
          <div className="value">{building.stats.priceRange}</div>
        </div>
        <div className="info-item">
          <div className="label">Završetak</div>
          <div className="value">{building.stats.completionDate}</div>
        </div>
      </div>
    </div>
  )
}
