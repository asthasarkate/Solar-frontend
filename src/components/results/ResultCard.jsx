import SeverityBadge from '../common/SeverityBadge'
import { formatDate } from '../../utils/formatDate'

export default function ResultCard({ result }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      {result.imageUrl && (
        <img
          src={result.imageUrl}
          alt="Analyzed panel"
          className="w-full max-h-64 object-contain rounded-lg border border-gray-100"
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Fault Type</p>
          <p className="text-sm font-semibold text-gray-900">{result.faultType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Severity</p>
          <SeverityBadge severity={result.severity} />
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Confidence</p>
          <p className="text-sm font-semibold text-gray-900">{result.confidence}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Date</p>
          <p className="text-sm font-semibold text-gray-900">{formatDate(result.createdAt)}</p>
        </div>
      </div>
      {result.recommendation && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">Recommendation</p>
          <p className="text-sm text-gray-700">{result.recommendation}</p>
        </div>
      )}
    </div>
  )
}
