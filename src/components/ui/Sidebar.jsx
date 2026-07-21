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
    : building.floors.slice(-8)

  const currentFloor = selectedFloor !== null ? building.floors[selectedFloor] : null

  return (
    <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2>{building.name}</h2>
        <p>{building.description}</p>
      </div>

      <div className="sidebar-section">
        <h3>Statistika Nekretnine</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="label">Spratovi</div>
            <div className="value">{building.stats.floors}</div>
          </div>
          <div className="info-item">
            <div className="label">Ukupno Jedinica</div>
            <div className="value">{building.stats.units}</div>
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
          <div className="info-item">
            <div className="label">Parking</div>
            <div className="value">{building.stats.parkingSpaces}</div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Odabir Sprata</h3>
        <div className="floor-list">
          {displayedFloors.map((floor, idx) => {
            const actualIdx = showAllFloors ? idx : building.floors.length - 8 + idx
            const isActive = selectedFloor === actualIdx
            return (
              <div
                key={actualIdx}
                className={`floor-item ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFloor(isActive ? null : actualIdx)}
              >
                <span className="floor-name">{floor.name}</span>
                <span className="floor-count">{floor.units.length} jedinica</span>
              </div>
            )
          })}
        </div>
        {building.floors.length > 8 && (
          <button
            style={{
              width: '100%',
              padding: '6px',
              marginTop: '6px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            onClick={() => setShowAllFloors(!showAllFloors)}
          >
            {showAllFloors ? 'Prikaži Manje' : `Prikaži Sve ${building.floors.length} Spratova`}
          </button>
        )}
      </div>

      {currentFloor && (
        <div className="sidebar-section">
          <h3>Jedinice na {currentFloor.name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentFloor.units.map((unit) => (
              <div
                key={unit.id}
                className={`unit-card ${selectedUnit === unit.id ? 'selected' : ''}`}
                onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
              >
                <div className="unit-card-header">
                  <h4>{unit.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                  <span className="unit-id">{unit.id}</span>
                </div>
                <div className="unit-card-details">
                  <span>{unit.area}</span>
                  {unit.rooms > 0 && <span>{unit.rooms} soba</span>}
                  <span>{unit.price}</span>
                </div>
                <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`status-badge ${unit.status}`}>{unit.status === 'available' ? 'Dostupno' : unit.status === 'sold' ? 'Prodato' : unit.status === 'reserved' ? 'Rezervisano' : unit.status}</span>
                  {unit.balcony !== undefined && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {unit.balcony ? 'Balkon' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3>Završna Obrada</h3>
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
        <h3>Kontakt Agent</h3>
        <div style={{
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontSize: '16px',
          }}>
            AM
          </div>
          <div style={{ fontWeight: 600, marginBottom: '3px', fontSize: 13 }}>Alexander Mercer</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>Viši Konsultant za Nekretnine</div>
          <button className="action-btn primary" style={{ width: '100%', justifyContent: 'center' }}>
            +387 61 555 012
          </button>
          <button className="action-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>
            Pošalji Upit
          </button>
        </div>
      </div>
    </div>
  )
}
