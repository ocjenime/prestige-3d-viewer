import React from 'react'
import useStore from '../../stores/useStore'
import { buildings } from '../../data/buildings'

export default function BuildingSelector() {
  const selectedBuilding = useStore((s) => s.selectedBuilding)
  const setSelectedBuilding = useStore((s) => s.setSelectedBuilding)

  return (
    <div className="bottom-bar">
      <div className="building-selector">
        {buildings.map((building, idx) => (
          <button
            key={building.id}
            className={`building-tab ${selectedBuilding === idx ? 'active' : ''}`}
            onClick={() => setSelectedBuilding(idx)}
          >
            {building.name}
          </button>
        ))}
      </div>
    </div>
  )
}
