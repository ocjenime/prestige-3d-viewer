import { create } from 'zustand'

const useStore = create((set, get) => ({
  selectedBuilding: 0,
  selectedFloor: null,
  selectedUnit: null,
  materialPreset: 'modern-white',
  isNightMode: false,
  showFloorPlan: false,
  showMeasurements: false,
  showVrMode: false,
  activeTool: 'orbit',
  cameraPosition: [15, 10, 15],
  showBuildingInfo: false,
  sidebarOpen: true,
  measurementPoints: [],
  hoveredUnit: null,
  tourMode: false,

  setSelectedBuilding: (idx) => set({ selectedBuilding: idx, selectedFloor: null, selectedUnit: null }),
  setSelectedFloor: (floor) => set({ selectedFloor: floor, selectedUnit: null }),
  setSelectedUnit: (unit) => set({ selectedUnit: unit }),
  setMaterialPreset: (preset) => set({ materialPreset: preset }),
  toggleNightMode: () => set((s) => ({ isNightMode: !s.isNightMode })),
  toggleFloorPlan: () => set((s) => ({ showFloorPlan: !s.showFloorPlan })),
  toggleMeasurements: () => set((s) => ({ showMeasurements: !s.showMeasurements, measurementPoints: [] })),
  toggleVrMode: () => set((s) => ({ showVrMode: !s.showVrMode })),
  setActiveTool: (tool) => set({ activeTool: tool }),
  toggleBuildingInfo: () => set((s) => ({ showBuildingInfo: !s.showBuildingInfo })),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setHoveredUnit: (unit) => set({ hoveredUnit: unit }),
  toggleTourMode: () => set((s) => ({ tourMode: !s.tourMode })),
  addMeasurementPoint: (point) => set((s) => {
    const pts = [...s.measurementPoints, point]
    if (pts.length > 2) return { measurementPoints: [point] }
    return { measurementPoints: pts }
  }),
  resetMeasurement: () => set({ measurementPoints: [] }),
}))

export default useStore
