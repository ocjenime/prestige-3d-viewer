import React, { useState } from 'react'
import useStore from '../../stores/useStore'
import { buildings, materialPresets } from '../../data/buildings'

export default function Sidebar() {
  const sidebarOpen = useStore((s) => s.sidebarOpen)
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const selectedFloor = useStore((s) => s.selectedFloor)
  const selectedUnit = useStore((s) => s.selectedUnit)
  const materialPreset = useStore((s) => s.materialPreset)
  const setSelectedFloor = useStore((s) => s.setSelectedFloor)
  const setSelectedUnit = useStore((s) => s.setSelectedUnit)
  const setMaterialPreset = useStore((s) => s.setMaterialPreset)

  const building = buildings[selectedBuilding]
  const [showAllFloors, setShowAllFloors] = useState(false)

  const displayedFloors = showAllFloors
    ? building.floors
    : building.floors.slice(-6)

  return (
    <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2>{building.name}</h2>
        <p>{building.description}</p>
      </div>

      <div className="sidebar-section">
        <h3>Property Statistics</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="label">Floors</div>
            <div className="value">{building.stats.floors}</div>
          </div>
          <div className="info-item">
            <div className="label">Total Units</div>
            <div className="value">{building.stats.units}</div>
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
          <div className="info-item">
            <div className="label">Parking</div>
            <div className="value">{building.stats.parkingSpaces}</div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Floor Selection</h3>
        <div className="floor-list">
          {displayedFloors.map((floor, idx) => {
            const actualIdx = showAllFloors ? idx : building.floors.length - 6 + idx
            return (
              <div
                key={actualIdx}
                className={`floor-item ${selectedFloor === actualIdx ? 'active' : ''}`}
                onClick={() => setSelectedFloor(selectedFloor === actualIdx ? null : actualIdx)}
              >
                <span className="floor-name">{floor.name}</span>
                <span className="floor-count">{floor.units.length} units</span>
              </div>
            )
          })}
        </div>
        {building.floors.length > 6 && (
          <button
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            onClick={() => setShowAllFloors(!showAllFloors)}
          >
            {showAllFloors ? 'Show Less' : `Show All ${building.floors.length} Floors`}
          </button>
        )}
      </div>

      {selectedFloor !== null && (
        <div className="sidebar-section">
          <h3>Units on {building.floors[selectedFloor].name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {building.floors[selectedFloor].units.map((unit) => (
              <div
                key={unit.id}
                className={`unit-card ${selectedUnit === unit.id ? 'selected' : ''}`}
                onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
              >
                <div className="unit-card-header">
                  <h4>{unit.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                  <span className="unit-id">{unit.id}</span>
                </div>
                <div className="unit-card-details">
                  <span>📐 {unit.area}</span>
                  {unit.rooms > 0 && <span>🛏 {unit.rooms} rooms</span>}
                  <span>💰 {unit.price}</span>
                </div>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`status-badge ${unit.status}`}>{unit.status}</span>
                  {unit.balcony !== undefined && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {unit.balcony ? '🌿 Balcony' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3>Material Finish</h3>
        <div className="material-grid">
          {Object.entries(materialPresets).map(([key, preset]) => (
            <div
              key={key}
              className={`material-option ${materialPreset === key ? 'active' : ''}`}
              onClick={() => setMaterialPreset(key)}
            >
              <div
                className="material-preview"
                style={{
                  background: `linear-gradient(135deg, ${preset.wall} 50%, ${preset.accent} 50%)`,
                }}
              />
              <span>{preset.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Contact Agent</h3>
        <div style={{
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '20px',
          }}>
            👤
          </div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Alexander Mercer</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>Senior Property Consultant</div>
          <button className="action-btn primary" style={{ width: '100%', justifyContent: 'center' }}>
            📞 +31 20 555 0123
          </button>
          <button className="action-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            ✉ Send Inquiry
          </button>
        </div>
      </div>
    </div>
  )
}
