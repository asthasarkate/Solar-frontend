export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const FAULT_TYPES = ['Dust', 'Cracks', 'Physical Damage', 'Shading']

export const SEVERITY_CONFIG = {
  Low: { color: 'bg-green-100 text-green-700', label: 'Low' },
  Medium: { color: 'bg-amber-100 text-amber-700', label: 'Medium' },
  High: { color: 'bg-red-100 text-red-700', label: 'High' },
}

export const FAULT_COLORS = {
  Dust: '#f97316',
  Cracks: '#ef4444',
  'Physical Damage': '#8b5cf6',
  Shading: '#3b82f6',
}
