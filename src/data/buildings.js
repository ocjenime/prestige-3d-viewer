export const buildings = [
  {
    id: 'tower-a',
    name: 'Azure Toranj',
    type: 'luksuzno-stambeni',
    description: 'Luksuzni stambeni toranj od 10 spratova sa panoramskim pogledom na grad, prozorima od poda do plafona i vrhunskom završnom obradom.',
    stats: {
      floors: 10,
      units: 40,
      totalArea: '18.000 m²',
      priceRange: '€450.000 - €1.200.000',
      completionDate: 'Q4 2027',
      parkingSpaces: 60,
    },
    position: [0, 0, 0],
    floors: [
      {
        name: 'Prizemlje',
        units: [
          { id: 'A-G1', type: 'poslovni-prostor', area: '120 m²', rooms: 0, price: '€450.000', status: 'available', balcony: false },
          { id: 'A-G2', type: 'poslovni-prostor', area: '95 m²', rooms: 0, price: '€380.000', status: 'available', balcony: false },
        ],
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        name: `${i + 1}. Sprat`,
        units: [
          { id: `A-${i + 1}1`, type: 'trosobni-stan', area: '165 m²', rooms: 3, price: '€750.000', status: i < 3 ? 'sold' : 'available', balcony: true },
          { id: `A-${i + 1}2`, type: 'dvosobni-stan', area: '110 m²', rooms: 2, price: '€450.000', status: i < 2 ? 'reserved' : 'available', balcony: true },
        ],
      })),
    ],
    colors: { wall: '#E8E8E8', accent: '#2563EB' },
  },
  {
    id: 'villa-b',
    name: 'Villa Meridian',
    type: 'ultra-luksuzna-vila',
    description: 'Ultra-luksuzna vila sa tri nivoa, privatnim vrtom i panoramskim terasama.',
    stats: {
      floors: 3,
      units: 12,
      totalArea: '8.400 m²',
      priceRange: '€4.500.000 - €12.000.000',
      completionDate: 'Q2 2027',
      parkingSpaces: 36,
    },
    position: [22, 0, 0],
    floors: [
      {
        name: 'Prizemlje',
        units: [
          { id: 'V-G1', type: 'vrt-vila', area: '180 m²', rooms: 4, price: '€4.500.000', status: 'available', balcony: false },
        ],
      },
      {
        name: '1. Sprat',
        units: [
          { id: 'V-11', type: 'master-suita', area: '220 m²', rooms: 5, price: '€6.500.000', status: 'available', balcony: true },
        ],
      },
      {
        name: '2. Sprat',
        units: [
          { id: 'V-21', type: 'penthouse', area: '260 m²', rooms: 6, price: '€8.500.000', status: 'reserved', balcony: true },
        ],
      },
    ],
    colors: { wall: '#F5F0E8', accent: '#D97706' },
  },
  {
    id: 'complex-c',
    name: 'Horizon Kompleks',
    type: 'mjesovita-upotreba',
    description: 'Moderan mješoviti kompleks sa kancelarijama, stanovima i poslovnim prostorima.',
    stats: {
      floors: 10,
      units: 30,
      totalArea: '12.000 m²',
      priceRange: '€300.000 - €800.000',
      completionDate: 'Q1 2028',
      parkingSpaces: 50,
    },
    position: [-22, 0, 0],
    floors: [
      {
        name: 'Prizemlje',
        units: [
          { id: 'H-G1', type: 'poslovni-prostor', area: '300 m²', rooms: 0, price: '€800.000', status: 'available', balcony: false },
          { id: 'H-G2', type: 'poslovni-prostor', area: '200 m²', rooms: 0, price: '€550.000', status: 'available', balcony: false },
          { id: 'H-G3', type: 'poslovni-prostor', area: '150 m²', rooms: 0, price: '€400.000', status: 'sold', balcony: false },
        ],
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        name: `${i + 1}. Sprat`,
        units: [
          { id: `H-${i + 1}1`, type: 'kancelarija', area: '180 m²', rooms: 0, price: '€500.000', status: i < 2 ? 'sold' : 'available', balcony: false },
          { id: `H-${i + 1}2`, type: 'kancelarija', area: '120 m²', rooms: 0, price: '€350.000', status: i < 1 ? 'reserved' : 'available', balcony: false },
          { id: `H-${i + 1}3`, type: 'dvosobni-stan', area: '95 m²', rooms: 2, price: '€300.000', status: 'available', balcony: true },
        ],
      })),
    ],
    colors: { wall: '#1E293B', accent: '#10B981' },
  },
]

export const materialPresets = {
  'modern-white': {
    name: 'Moderna Bijela',
    wall: '#F2F0ED', floor: '#E8E4DD', accent: '#2563FF', glass: '#B8D8EA',
    wallRoughness: 0.35, wallMetalness: 0.02, clearcoat: 0.4,
  },
  'warm-stone': {
    name: 'Topli Kamen',
    wall: '#D4C5A9', floor: '#C4B896', accent: '#FF6A1F', glass: '#A8D4E6',
    wallRoughness: 0.65, wallMetalness: 0.01, clearcoat: 0.15,
  },
  'dark-luxury': {
    name: 'Tamni Luksuz',
    wall: '#1A1A1A', floor: '#111111', accent: '#3B82F6', glass: '#4A6E8A',
    wallRoughness: 0.25, wallMetalness: 0.15, clearcoat: 0.7,
  },
  'marble-classic': {
    name: 'Mramorna Klasika',
    wall: '#F0EDE8', floor: '#D6CFC3', accent: '#2563FF', glass: '#9AC4D8',
    wallRoughness: 0.15, wallMetalness: 0.05, clearcoat: 0.8,
  },
  'wood-natural': {
    name: 'Prirodno Drvo',
    wall: '#C4A882', floor: '#A68B5B', accent: '#FF6A1F', glass: '#7DB8CC',
    wallRoughness: 0.75, wallMetalness: 0.0, clearcoat: 0.1,
  },
  'concrete-industrial': {
    name: 'Industrijski',
    wall: '#8A8A8A', floor: '#666666', accent: '#FF6A1F', glass: '#6BA3BE',
    wallRoughness: 0.85, wallMetalness: 0.0, clearcoat: 0.05,
  },
}
