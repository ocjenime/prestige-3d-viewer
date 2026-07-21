import React from 'react'
import useStore from '../../stores/useStore'

export default function TopBar() {
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const sidebarOpen = useStore((s) => s.sidebarOpen)

  return (
    <div className="top-bar">
      <div className="brand">
        <div className="brand-logo">P</div>
        <div className="brand-text">
          <h1>Prestige Estates</h1>
          <span>3D Property Viewer</span>
        </div>
      </div>

      <div className="top-actions">
        <button className="action-btn" onClick={toggleSidebar}>
          {sidebarOpen ? '▶ Hide Details' : '◀ Show Details'}
        </button>
        <button className="action-btn primary">
          📞 Schedule Viewing
        </button>
      </div>
    </div>
  )
}
