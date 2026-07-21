export const buildings = [
  {
    id: 'tower-a',
    name: 'Azure Toranj',
    type: 'luksuzno-stambeni',
    description: 'Luksuzni stambeni toranj od 25 spratova sa panoramskim pogledom na grad, prozorima od poda do plafona i vrhunskom završnom obradom.',
    stats: {
      floors: 25,
      units: 100,
      totalArea: '45.000 m²',
      priceRange: '€850.000 - €3.200.000',
      completionDate: 'Q4 2027',
      parkingSpaces: 150,
    },
    position: [0, 0, 0],
    floors: Array.from({ length: 25 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Prizemlje' : `Sprat ${i + 1}`,
      units: i === 0
        ? [
            { id: `A-${i+1}-01`, type: 'lobi', area: '120 m²', price: '-', status: 'common', rooms: 0 },
            { id: `A-${i+1}-02`, type: 'poslovni-prostor', area: '200 m²', price: '€1.500.000', status: 'available', rooms: 0 },
          ]
        : [
            { id: `A-${i+1}-01`, type: 'penthouse', area: '280 m²', price: '€3.200.000', status: i < 3 ? 'available' : 'sold', rooms: 5, balcony: true },
            { id: `A-${i+1}-02`, type: '3-sobni', area: '165 m²', price: '€1.450.000', status: Math.random() > 0.3 ? 'available' : 'reserved', rooms: 3, balcony: true },
            { id: `A-${i+1}-03`, type: '2-sobni', area: '110 m²', price: '€850.000', status: Math.random() > 0.4 ? 'available' : 'sold', rooms: 2, balcony: true },
            { id: `A-${i+1}-04`, type: '3-sobni', area: '155 m²', price: '€1.350.000', status: Math.random() > 0.5 ? 'available' : 'reserved', rooms: 3, balcony: false },
          ],
    })),
    color: '#E8E8E8',
    accentColor: '#2563EB',
  },
  {
    id: 'villa-b',
    name: 'Villa Meridian',
    type: 'ultra-luksuzna-vila',
    description: 'Ekskluzivna kolekcija od 12 ultra-luksuznih vikendica uz vodu sa privatnim bazenima, pametnim kućnim sistemima i 24/7 concierge uslugom.',
    stats: {
      floors: 3,
      units: 12,
      totalArea: '8.400 m²',
      priceRange: '€4.500.000 - €12.000.000',
      completionDate: 'Q2 2027',
      parkingSpaces: 36,
    },
    position: [25, 0, 0],
    floors: Array.from({ length: 3 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Prizemlje' : i === 1 ? 'Prvi Sprat' : 'Krov',
      units: [
        { id: `B-${i+1}-01`, type: i === 0 ? 'vila-vrt' : i === 1 ? 'glavna-soba' : 'krovna-terasa', area: `${180 + i * 40} m²`, price: `€${4.5 + i * 2}M`, status: 'available', rooms: 4 + i },
      ],
    })),
    color: '#F5F0E8',
    accentColor: '#D97706',
  },
  {
    id: 'complex-c',
    name: 'Horizon Kompleks',
    type: 'mješovita-upotreba',
    description: 'Prestižni mješoviti projekat koji kombinuje kancelarije klase A, luksuzne stanove i butik hotel sa krovnom ponudom.',
    stats: {
      floors: 18,
      units: 65,
      totalArea: '62.000 m²',
      priceRange: '€600.000 - €5.000.000',
      completionDate: 'Q1 2028',
      parkingSpaces: 300,
    },
    position: [-25, 0, 0],
    floors: Array.from({ length: 18 }, (_, i) => ({
      level: i + 1,
      name: i === 0 ? 'Prizemlje' : i < 4 ? 'Komersalni' : i < 12 ? 'Kancelarije' : 'Stanovi',
      units: [
        { id: `C-${i+1}-01`, type: 'komersalni', area: `${300 - i * 5} m²`, price: '€2.100.000', status: 'available', rooms: 0 },
        { id: `C-${i+1}-02`, type: 'kancelarija', area: `${200 + i * 10} m²`, price: '€1.800.000', status: 'available', rooms: 0 },
        { id: `C-${i+1}-03`, type: '2-sobni', area: '120 m²', price: '€920.000', status: 'available', rooms: 2 },
      ],
    })),
    color: '#1E293B',
    accentColor: '#10B981',
  },
]

export const materialPresets = {
  'modern-white': {
    name: 'Moderna Bijela',
    wall: '#F2F0ED', floor: '#E8E4DD', accent: '#1E293B', glass: '#B8D8EA',
    wallRoughness: 0.35, wallMetalness: 0.02, clearcoat: 0.4,
  },
  'warm-stone': {
    name: 'Topli Kamen',
    wall: '#D4C5A9', floor: '#C4B896', accent: '#8B7355', glass: '#A8D4E6',
    wallRoughness: 0.65, wallMetalness: 0.01, clearcoat: 0.15,
  },
  'dark-luxury': {
    name: 'Tamni Luksuz',
    wall: '#1A1A1A', floor: '#111111', accent: '#C9A84C', glass: '#4A6E8A',
    wallRoughness: 0.25, wallMetalness: 0.15, clearcoat: 0.7,
  },
  'marble-classic': {
    name: 'Mramorna Klasika',
    wall: '#F0EDE8', floor: '#D6CFC3', accent: '#8B7D6B', glass: '#9AC4D8',
    wallRoughness: 0.15, wallMetalness: 0.05, clearcoat: 0.8,
  },
  'wood-natural': {
    name: 'Prirodno Drvo',
    wall: '#C4A882', floor: '#A68B5B', accent: '#5C4033', glass: '#7DB8CC',
    wallRoughness: 0.75, wallMetalness: 0.0, clearcoat: 0.1,
  },
  'concrete-industrial': {
    name: 'Industrijski',
    wall: '#8A8A8A', floor: '#666666', accent: '#E65100', glass: '#6BA3BE',
    wallRoughness: 0.85, wallMetalness: 0.0, clearcoat: 0.05,
  },
}
