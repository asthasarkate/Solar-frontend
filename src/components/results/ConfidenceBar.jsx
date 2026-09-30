export default function ConfidenceBar({ value }) {
  const getColor = (v) => {
    if (v >= 80) return 'bg-green-500'
    if (v >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-500">Confidence</span>
        <span className="text-xs font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
