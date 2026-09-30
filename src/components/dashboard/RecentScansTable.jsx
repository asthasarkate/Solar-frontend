import { Link } from 'react-router-dom'
import SeverityBadge from '../common/SeverityBadge'
import { formatDate } from '../../utils/formatDate'

export default function RecentScansTable({ scans }) {
  if (!scans?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Scans</h3>
        <p className="text-sm text-gray-400 text-center py-8">No scans yet. Analyze your first panel!</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Scans</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="pb-3 font-medium">Image</th>
              <th className="pb-3 font-medium">Fault</th>
              <th className="pb-3 font-medium">Severity</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan._id} className="border-b border-gray-50 last:border-0">
                <td className="py-3">
                  {scan.imageUrl && (
                    <img src={scan.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                  )}
                </td>
                <td className="py-3 font-medium text-gray-900">{scan.faultType}</td>
                <td className="py-3"><SeverityBadge severity={scan.severity} /></td>
                <td className="py-3 text-gray-500">{formatDate(scan.createdAt)}</td>
                <td className="py-3">
                  <Link to={`/results/${scan._id}`} className="text-primary-500 hover:text-primary-600 font-medium text-xs">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
