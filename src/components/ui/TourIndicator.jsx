import React from 'react'
import useStore from '../../stores/useStore'

export default function TourIndicator() {
  const toggleTourMode = useStore((s) => s.toggleTourMode)

  return (
    <div className="tour-indicator" onClick={toggleTourMode} style={{ cursor: 'pointer' }}>
      <div className="tour-dot" />
      <span>Virtuelni Obilazak Aktivan</span>
      <span style={{ fontWeight: 400, opacity: 0.7 }}>— Kliknite da zaustavite</span>
    </div>
  )
}
