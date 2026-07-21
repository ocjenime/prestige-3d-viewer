export const buildings = [
  {
    id: 'tower-a',
    name: 'Azure Tower',
    type: 'luxury-residential',
    description: 'A 25-story luxury residential tower with panoramic city views, featuring floor-to-ceiling windows and premium finishes throughout.',
    stats: {
      floors: 25,
      units: 100,
      totalArea: '45,000 m²',
      priceRange: '€850,000 - €3,200,000',
      completionDate: 'Q4 2027',
      parkingSpaces: 150,
    },
    position: [0, 0, 0],
    floors: Array.from({ length: 25 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Ground Floor' : `Floor ${i + 1}`,
      units: i === 0
        ? [
            { id: `A-${i+1}-01`, type: 'lobby', area: '120 m²', price: '-', status: 'common', rooms: 0 },
            { id: `A-${i+1}-02`, type: 'retail', area: '200 m²', price: '€1,500,000', status: 'available', rooms: 0 },
          ]
        : [
            { id: `A-${i+1}-01`, type: 'penthouse', area: '280 m²', price: '€3,200,000', status: i < 3 ? 'available' : 'sold', rooms: 5, balcony: true },
            { id: `A-${i+1}-02`, type: '3-bed', area: '165 m²', price: '€1,450,000', status: Math.random() > 0.3 ? 'available' : 'reserved', rooms: 3, balcony: true },
            { id: `A-${i+1}-03`, type: '2-bed', area: '110 m²', price: '€850,000', status: Math.random() > 0.4 ? 'available' : 'sold', rooms: 2, balcony: true },
            { id: `A-${i+1}-04`, type: '3-bed', area: '155 m²', price: '€1,350,000', status: Math.random() > 0.5 ? 'available' : 'reserved', rooms: 3, balcony: false },
          ],
    })),
    color: '#E8E8E8',
    accentColor: '#2563EB',
  },
  {
    id: 'villa-b',
    name: 'Villa Meridian',
    type: 'ultra-luxury-villa',
    description: 'An exclusive collection of 12 ultra-luxury waterfront villas with private pools, smart home systems, and 24/7 concierge.',
    stats: {
      floors: 3,
      units: 12,
      totalArea: '8,400 m²',
      priceRange: '€4,500,000 - €12,000,000',
      completionDate: 'Q2 2027',
      parkingSpaces: 36,
    },
    position: [25, 0, 0],
    floors: Array.from({ length: 3 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Ground Floor' : i === 1 ? 'First Floor' : 'Rooftop',
      units: [
        { id: `B-${i+1}-01`, type: i === 0 ? 'villa-garden' : i === 1 ? 'master-suite' : 'roof-terrace', area: `${180 + i * 40} m²`, price: `€${4.5 + i * 2}M`, status: 'available', rooms: 4 + i },
      ],
    })),
    color: '#F5F0E8',
    accentColor: '#D97706',
  },
  {
    id: 'complex-c',
    name: 'Horizon Complex',
    type: 'mixed-use',
    description: 'A prestigious mixed-use development combining Grade A offices, luxury residences, and a boutique hotel with rooftop amenities.',
    stats: {
      floors: 18,
      units: 65,
      totalArea: '62,000 m²',
      priceRange: '€600,000 - €5,000,000',
      completionDate: 'Q1 2028',
      parkingSpaces: 300,
    },
    position: [-25, 0, 0],
    floors: Array.from({ length: 18 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Ground Floor' : i < 4 ? 'Commercial' : i < 12 ? 'Offices' : 'Residences',
      units: [
        { id: `C-${i+1}-01`, type: 'commercial', area: `${300 - i * 5} m²`, price: '€2,100,000', status: 'available', rooms: 0 },
        { id: `C-${i+1}-02`, type: 'office', area: `${200 + i * 10} m²`, price: '€1,800,000', status: 'available', rooms: 0 },
        { id: `C-${i+1}-03`, type: '2-bed', area: '120 m²', price: '€920,000', status: 'available', rooms: 2 },
      ],
    })),
    color: '#1E293B',
    accentColor: '#10B981',
  },
]

export const materialPresets = {
  'modern-white': { name: 'Modern White', wall: '#F8F8F8', floor: '#E5E5E5', accent: '#1E293B', glass: '#87CEEB' },
  'warm-stone': { name: 'Warm Stone', wall: '#D4C5A9', floor: '#C4B896', accent: '#8B7355', glass: '#A8D4E6' },
  'dark-luxury': { name: 'Dark Luxury', wall: '#2C2C2C', floor: '#1A1A1A', accent: '#C9A84C', glass: '#4A6E8A' },
  'marble-classic': { name: 'Marble Classic', wall: '#F0EDE8', floor: '#D6CFC3', accent: '#8B7D6B', glass: '#9AC4D8' },
  'wood-natural': { name: 'Natural Wood', wall: '#C4A882', floor: '#A68B5B', accent: '#5C4033', glass: '#7DB8CC' },
  'concrete-industrial': { name: 'Industrial', wall: '#9E9E9E', floor: '#757575', accent: '#E65100', glass: '#6BA3BE' },
}
