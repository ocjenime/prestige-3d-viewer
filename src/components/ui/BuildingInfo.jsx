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
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px',
          }}
        >
          ✕
        </button>
      </div>
      <div className="subtitle">{building.description}</div>
      <div className="info-grid">
        <div className="info-item">
          <div className="label">Floors</div>
          <div className="value">{building.stats.floors}</div>
        </div>
        <div className="info-item">
          <div className="label">Total Area</div>
          <div className="value">{building.stats.totalArea}</div>
        </div>
        <div className="info-item">
          <div className="label">Price Range</div>
          <div className="value">{building.stats.priceRange}</div>
        </div>
        <div className="info-item">
          <div className="label">Completion</div>
          <div className="value">{building.stats.completionDate}</div>
        </div>
      </div>
    </div>
  )
}
