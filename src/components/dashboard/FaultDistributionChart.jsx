import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { FAULT_COLORS } from '../../utils/constants'

export default function FaultDistributionChart({ data }) {
  const chartData = data || [
    { name: 'Dust', value: 0 },
    { name: 'Cracks', value: 0 },
    { name: 'Physical Damage', value: 0 },
    { name: 'Shading', value: 0 },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Fault Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={FAULT_COLORS[entry.name] || '#d1d5db'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
