import React from 'react'
import useStore from '../../stores/useStore'

const tools = [
  { id: 'orbit', icon: '🔄', label: 'Orbit View', action: 'setActiveTool' },
  { id: 'floorplan', icon: '📋', label: 'Floor Plan', action: 'toggleFloorPlan' },
  { id: 'measure', icon: '📏', label: 'Measure', action: 'toggleMeasurements' },
  { id: 'night', icon: '🌙', label: 'Night Mode', action: 'toggleNightMode' },
  { id: 'info', icon: 'ℹ️', label: 'Building Info', action: 'toggleBuildingInfo' },
  { id: 'vr', icon: '🥽', label: 'VR Mode', action: 'toggleVrMode' },
  { id: 'tour', icon: '🎬', label: 'Virtual Tour', action: 'toggleTourMode' },
]

export default function Toolbar() {
  const activeTool = useStore((s) => s.activeTool)
  const isNightMode = useStore((s) => s.isNightMode)
  const showMeasurements = useStore((s) => s.showMeasurements)
  const showBuildingInfo = useStore((s) => s.showBuildingInfo)
  const showVrMode = useStore((s) => s.showVrMode)
  const tourMode = useStore((s) => s.tourMode)
  const setActiveTool = useStore((s) => s.setActiveTool)
  const toggleNightMode = useStore((s) => s.toggleNightMode)
  const toggleMeasurements = useStore((s) => s.toggleMeasurements)
  const toggleBuildingInfo = useStore((s) => s.toggleBuildingInfo)
  const toggleVrMode = useStore((s) => s.toggleVrMode)
  const toggleTourMode = useStore((s) => s.toggleTourMode)
  const addMeasurementPoint = useStore((s) => s.addMeasurementPoint)

  const isActive = (tool) => {
    switch (tool.id) {
      case 'orbit': return activeTool === 'orbit'
      case 'floorplan': return false
      case 'measure': return showMeasurements
      case 'night': return isNightMode
      case 'info': return showBuildingInfo
      case 'vr': return showVrMode
      case 'tour': return tourMode
      default: return false
    }
  }

  const handleClick = (tool) => {
    switch (tool.action) {
      case 'setActiveTool':
        setActiveTool(tool.id)
        break
      case 'toggleFloorPlan':
        useStore.getState().toggleFloorPlan()
        break
      case 'toggleMeasurements':
        toggleMeasurements()
        break
      case 'toggleNightMode':
        toggleNightMode()
        break
      case 'toggleBuildingInfo':
        toggleBuildingInfo()
        break
      case 'toggleVrMode':
        toggleVrMode()
        break
      case 'toggleTourMode':
        toggleTourMode()
        break
    }
  }

  return (
    <div className="toolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`toolbar-btn ${isActive(tool) ? 'active' : ''}`}
          onClick={() => handleClick(tool)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  )
}
