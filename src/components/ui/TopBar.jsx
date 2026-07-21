import React from 'react'
import useStore from '../../stores/useStore'

export default function TopBar() {
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const sidebarOpen = useStore((s) => s.sidebarOpen)

  return (
    <div className="top-bar">
      <div className="brand">
        <div className="brand-logo">
          <img src={`${import.meta.env.BASE_URL}logo-arilux.svg`} alt="ARILUX" />
        </div>
        <div className="brand-text">
          <h1>ARILUX D.O.O. (ZAGRAD)</h1>
          <span>3D Prikaz Nekretnina</span>
        </div>
      </div>

      <div className="top-actions">
        <button className="action-btn" onClick={toggleSidebar}>
          {sidebarOpen ? 'Sakrij' : 'Detalji'}
        </button>
        <button className="action-btn primary">
          Zakaži Obilazak
        </button>
      </div>
    </div>
  )
}
