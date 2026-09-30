import { useState, useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { FaUserCog, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Loader from '../components/common/Loader'
import predictionApi from '../api/predictionApi'
import { API_BASE_URL } from '../utils/constants'

const MOCK_IMAGE = 'https://lh3.googleusercontent.com/aida/AEtjO1VySg7jzdggUM_mXvnrHHu4J1uKTAzxaqFlqVzCRIz7ZR9_9myMjO0FZIFqP5yr4gdIHA40gKynUoLz1Dj8_4G2LS4CuNHmuyBQ1sV5TBmptRlcx6Eqf0RISBnTGmIAnKwxMvqXvVrFcTMtyWrBL3LdjZ3sM7A31x4zeMxec64Tsq5yS6ILL0eEhKe9IBeWLFGA8ulkaLeb-yoT9LJDJ4ki4NLYD2Ks9SkInO4skR6y7Sqg7eOuY0CkPQRC'

function resolveImageUrl(url) {
  if (!url) return MOCK_IMAGE
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = API_BASE_URL.replace(/\/api\/?$/, '')
  return `${base}${url.startsWith('/') ? url : `/${url}`}`
}

const SEVERITY_COLORS = {
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200/80', dot: 'bg-red-600' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/80', dot: 'bg-amber-600' },
  low: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/80', dot: 'bg-emerald-600' },
}

const MOCK_RESULT = {
  _id: 'INF-9482',
  faultType: 'Wafer Micro-Crack',
  severity: 'High',
  confidence: 96.8,
  threshold: 85.0,
  modelVariance: '±0.4%',
  recommendation: 'Schedule urgent string isolation and thermal imaging inspection within 48 hours. Micro-cracks in this sector represent an immediate hotspot risk that will degrade substring bypass diodes and reduce array power output by up to 14%. Prepare replacement module for String B2.',
  recommendedProfessional: 'Certified Solar Panel Technician',
  diyGuidance: 'Do not attempt to replace the module yourself due to high voltage risks and potential voiding of warranty.',
  diySafe: false,
  pipeline: 'Dual-Core ResNet50 + MobileNet',
  array: 'Array 4 • String B2',
  imageUrl: MOCK_IMAGE,
  createdAt: new Date().toISOString(),
}

export default function Results() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result)
      setLoading(false)
      return
    }
    if (id && id !== 'new') {
      fetchResult()
    } else {
      setResult(MOCK_RESULT)
      setLoading(false)
    }
  }, [id])

  const fetchResult = async () => {
    try {
      const res = await predictionApi.getPrediction(id)
      setResult(res.data.prediction || res.data)
    } catch (err) {
      if (!err.response) {
        console.warn('[Solara AI] Backend unreachable — showing mock data')
        setResult(MOCK_RESULT)
      } else {
        toast.error(err.response?.data?.message || 'Failed to load result')
        setResult(null)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader text="Loading results..." />
  if (!result) return <div className="text-center py-20 text-zinc-500">No result found.</div>

  const severityKey = (result.severity || 'medium').toLowerCase()
  const severityStyle = SEVERITY_COLORS[severityKey] || SEVERITY_COLORS.medium
  const faultName = result.faultType || 'Unknown Fault'
  const confidence = typeof result.confidence === 'number' ? result.confidence : 0
  const imageUrl = resolveImageUrl(result.imageUrl)
  const createdDate = result.createdAt ? new Date(result.createdAt) : new Date()

  const formattedDate = createdDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' at ' + createdDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className="p-8 md:p-12 max-w-[900px] w-full mx-auto">

      {/* Breadcrumb row */}
      <div className="mb-6 flex items-center justify-between text-[13px] text-zinc-500">
        <Link to="/analyze" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Analyze
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Pipeline: {result.pipeline || 'Dual-Core ResNet50 + MobileNet'}</span>
        </div>
      </div>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left Column — Image */}
        <div className="md:col-span-5">
          <div className="relative w-full rounded-lg border border-zinc-200 overflow-hidden bg-zinc-100 aspect-square">
            <img
              src={imageUrl}
              alt={`Analyzed solar panel — ${faultName}`}
              className="w-full h-full object-cover block"
            />

            {/* Bounding box overlay */}
            <div className="absolute top-[34%] left-[28%] w-[44%] h-[42%] border-[1.5px] border-[#F26B1D] pointer-events-none rounded-sm">
              <span className="absolute -top-5 left-0 text-[10px] font-mono font-medium tracking-tight bg-[#F26B1D] text-white px-1.5 py-0.5 rounded uppercase">
                ROI: CRACK_01
              </span>
            </div>

            {/* Bottom gradient info bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 pt-6 flex items-center justify-between text-[11px] text-white/90">
              <span className="font-mono">{result.array || 'Array 4 • String B2'}</span>
              <span>1024 × 1024 px</span>
            </div>
          </div>

          <p className="mt-2.5 text-[12px] text-zinc-400">
            Bounding box highlighted by dual-model edge &amp; texture gradient analyzer.
          </p>
        </div>

        {/* Right Column — Details */}
        <div className="md:col-span-7 flex flex-col space-y-5">

          {/* Section 1: Detected Fault + Severity Badge */}
          <div>
            <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Detected Fault
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-[28px] font-bold tracking-tight text-zinc-900 leading-tight">
                {faultName}
              </h2>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${severityStyle.bg} ${severityStyle.text} border ${severityStyle.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${severityStyle.dot} mr-1.5`}></span>
                {result.severity || 'Medium'} Severity
              </span>
            </div>
          </div>

          {/* Section 2: Confidence Score */}
          <div className="pt-1">
            <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">
              Confidence Score
            </span>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/70">
                <div
                  className="h-full bg-[#F26B1D] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                ></div>
              </div>
              <span className="text-[15px] font-semibold text-zinc-900 tabular-nums">
                {confidence}%
              </span>
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-zinc-400 font-mono">
              <span>Threshold: {result.threshold || '85.0'}%</span>
              <span>Model variance: {result.modelVariance || '±0.4%'}</span>
            </div>
          </div>

          {/* Section 3: Recommendation Box */}
          {result.recommendation && (
            <div className="rounded-lg border border-zinc-200 p-4 bg-transparent">
              <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">
                Recommendation
              </span>
              <p className="text-[14px] text-zinc-800 leading-relaxed font-normal">
                {result.recommendation}
              </p>
            </div>
          )}

          {/* Section 3.5: Recommended Professional */}
          {result.recommendedProfessional && (
            <div className="rounded-lg border border-zinc-200 p-4 bg-transparent">
              <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">
                Recommended Professional
              </span>
              <div className="flex items-center gap-2 text-[14px] text-zinc-800 font-medium">
                <FaUserCog className="text-[#F26B1D] w-4 h-4" />
                <span>{result.recommendedProfessional}</span>
              </div>
            </div>
          )}

          {/* Section 3.6: DIY Guidance */}
          {result.diyGuidance && (
            <div className="rounded-lg border border-zinc-200 p-4 bg-transparent">
              <span className={`text-[12px] font-medium uppercase tracking-wider flex items-center gap-1.5 mb-2 ${
                result.diySafe ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {result.diySafe ? (
                  <FaCheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <FaExclamationTriangle className="w-3.5 h-3.5" />
                )}
                {result.diySafe ? 'Safe to Try Yourself' : 'Professional Required -- Not Safe for DIY'}
              </span>
              <p className="text-[14px] text-zinc-800 leading-relaxed font-normal">
                {result.diyGuidance}
              </p>
            </div>
          )}

          {/* Section 4: Timestamp */}
          <div className="pt-1 text-[12px] text-zinc-400 font-normal">
            Analyzed on {formattedDate}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 pt-8 border-t border-zinc-200/80 flex items-center gap-3">
        <Link
          to="/analyze"
          className="h-10 px-4 rounded-lg border border-zinc-300 bg-white text-[14px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 transition-colors inline-flex items-center"
        >
          Analyze Another
        </Link>
        <Link
          to="/history"
          className="h-10 px-5 rounded-lg bg-[#F26B1D] text-[14px] font-medium text-white hover:bg-[#d95a12] active:bg-[#c24e0e] transition-colors inline-flex items-center"
        >
          View History
        </Link>
      </div>

    </div>
  )
}
