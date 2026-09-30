import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/common/Loader'
import predictionApi from '../api/predictionApi'
import { formatDate } from '../utils/formatDate'

const MOCK_SCANS = [
  { _id: '1', faultType: 'Dust & Fine Soiling', severity: 'Low', confidence: 96.2, imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UzT9GApX2iZGTmaB6zl3IEejrPnrgHD0kcaue74MymBmfzGYP4L1ZHo0Xg3_ahDElKkwfZo1t4ci5ELaq9tTQgAOZFAXogHi_LteBxOzki859oEStm-QRQAPRYUMIIn-Mf-t-8va1ALVn0m58Tu53ihlStsU7E2ktfLedV1B9UtrV8Gv5Pj68KDSRM4JE-lWSKaYcmnB1fYEJusGhY0B0UouJY8ReWQojOnclxUWGnNZrirsQ7S-vx7bhv', createdAt: new Date().toISOString() },
  { _id: '2', faultType: 'Wafer Micro-Crack', severity: 'High', confidence: 99.1, imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VySg7jzdggUM_mXvnrHHu4J1uKTAzxaqFlqVzCRIz7ZR9_9myMjO0FZIFqP5yr4gdIHA40gKynUoLz1Dj8_4G2LS4CuNHmuyBQ1sV5TBmptRlcx6Eqf0RISBnTGmIAnKwxMvqXvVrFcTMtyWrBL3LdjZ3sM7A31x4zeMxec64Tsq5yS6ILL0eEhKe9IBeWLFGA8ulkaLeb-yoT9LJDJ4ki4NLYD2Ks9SkInO4skR6y7Sqg7eOuY0CkPQRC', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: '3', faultType: 'Normal / No Anomaly', severity: 'Low', confidence: 99.8, imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1W8sONQIY9f1mtjD5qmGFD1OGXiuZ7YGDtx8XmGMcspqaL4Z6hdAwuPGomeK5L0I_2NXLunTRgwGmqXqhk2TLoglNYeOZoDOAZ00yclqQ57mzHGDJVjzbo5AAgHmSqKOx5FBe3YXofAdi3hHn7gw8wFq6EQNf15N-1ZSmIRkZ5GSCMzIo9hjSPqVwryhBuwvoh6sZ_4LRQj5Upi--7-TRtc6xau5lKK3RViEu59Yu73QGTKYuQNTO76NcU', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '4', faultType: 'Surface Debris', severity: 'Low', confidence: 94.7, imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UzT9GApX2iZGTmaB6zl3IEejrPnrgHD0kcaue74MymBmfzGYP4L1ZHo0Xg3_ahDElKkwfZo1t4ci5ELaq9tTQgAOZFAXogHi_LteBxOzki859oEStm-QRQAPRYUMIIn-Mf-t-8va1ALVn0m58Tu53ihlStsU7E2ktfLedV1B9UtrV8Gv5Pj68KDSRM4JE-lWSKaYcmnB1fYEJusGhY0B0UouJY8ReWQojOnclxUWGnNZrirsQ7S-vx7bhv', createdAt: new Date(Date.now() - 90000000).toISOString() },
  { _id: '5', faultType: 'Cell Delamination Risk', severity: 'Medium', confidence: 97.3, imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VySg7jzdggUM_mXvnrHHu4J1uKTAzxaqFlqVzCRIz7ZR9_9myMjO0FZIFqP5yr4gdIHA40gKynUoLz1Dj8_4G2LS4CuNHmuyBQ1sV5TBmptRlcx6Eqf0RISBnTGmIAnKwxMvqXvVrFcTMtyWrBL3LdjZ3sM7A31x4zeMxec64Tsq5yS6ILL0eEhKe9IBeWLFGA8ulkaLeb-yoT9LJDJ4ki4NLYD2Ks9SkInO4skR6y7Sqg7eOuY0CkPQRC', createdAt: new Date(Date.now() - 172800000).toISOString() },
]

const MOCK_FAULTS = [
  { name: 'Dust / Soiling', count: 124, pct: 57.9, color: 'bg-[#E26829]' },
  { name: 'Micro-Cracking', count: 46, pct: 21.5, color: 'bg-[#F08E54]' },
  { name: 'Physical Damage', count: 28, pct: 13.1, color: 'bg-[#F7B286]' },
  { name: 'Shading / Obstruction', count: 16, pct: 7.5, color: 'bg-[#E4E4E7]' },
]

const severityDot = (s) => {
  if (s === 'High') return 'bg-red-500'
  if (s === 'Medium') return 'bg-orange-500'
  return 'bg-amber-500'
}

const severityLabel = (s) => {
  if (s === 'High') return 'High Severity'
  if (s === 'Medium') return 'Medium Severity'
  return 'Low Severity'
}

const FAULT_COLORS = ['bg-[#E26829]', 'bg-[#F08E54]', 'bg-[#F7B286]', 'bg-[#E4E4E7]']

export default function Dashboard() {
  const { user } = useAuth()
  const [scans, setScans] = useState([])
  const [faults, setFaults] = useState(MOCK_FAULTS)
  const [stats, setStats] = useState({ totalScans: 0, faultsDetected: 0, mostCommon: '—', avgConfidence: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await predictionApi.getHistory({ limit: 1000, page: 1 })
      const payload = res.data
      const allPredictions = payload.predictions || payload.data || payload || []
      const predictions = Array.isArray(allPredictions) ? allPredictions : []

      const recent = predictions.slice(0, 5)
      setScans(recent.length ? recent : MOCK_SCANS)

      if (predictions.length === 0) {
        setFaults(MOCK_FAULTS)
        setStats({ totalScans: 0, faultsDetected: 0, mostCommon: '—', avgConfidence: 0 })
      } else {
        const totalScans = payload.total || predictions.length
        const faultsDetected = predictions.filter(p => p.faultType && !p.faultType.toLowerCase().includes('normal') && !p.faultType.toLowerCase().includes('nominal')).length

        const faultCounts = {}
        predictions.forEach((p) => {
          if (p.faultType) {
            faultCounts[p.faultType] = (faultCounts[p.faultType] || 0) + 1
          }
        })
        const total = predictions.length
        const mapped = Object.entries(faultCounts)
          .map(([name, count], i) => ({
            name,
            count,
            pct: +((count / total) * 100).toFixed(1),
            color: FAULT_COLORS[i % FAULT_COLORS.length],
          }))
          .sort((a, b) => b.count - a.count)
        if (mapped.length) setFaults(mapped)

        const mostCommon = mapped.length > 0 ? mapped[0].name : '—'
        const avgConfidence = predictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / total

        setStats({
          totalScans,
          faultsDetected,
          mostCommon,
          avgConfidence: +avgConfidence.toFixed(1),
        })
      }
    } catch (err) {
      if (!err.response) {
        console.warn('[Solara AI] Backend unreachable — showing mock dashboard data')
      }
      setScans(MOCK_SCANS)
      setFaults(MOCK_FAULTS)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader text="Loading dashboard..." />

  const firstName = user?.name?.split(' ')[0] || 'User'
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-10 flex flex-col gap-8 max-w-[1440px] w-full mx-auto">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-[#18181B] tracking-tight">
            Welcome back, {firstName}
          </h2>
          <p className="font-body-sm text-body-sm text-[#71717A] mt-0.5">
            {dateStr} &bull; Utility Fleet Sector 4
          </p>
        </div>
        <Link
          to="/analyze"
          className="bg-[#F26B1D] hover:bg-[#D95A10] active:bg-[#C24E0B] text-white font-label-md text-label-md px-4 py-2.5 rounded-[6px] border border-[#F26B1D] flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
          <span>Analyze New Image</span>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5">
          <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#71717A] font-medium mb-1">TOTAL SCANS</div>
          <div className="font-numeric-metric text-numeric-metric font-bold text-[#18181B]">{stats.totalScans.toLocaleString()}</div>
          <div className="font-body-sm text-body-sm text-[#71717A] mt-1">Monitored across fleet</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5">
          <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#71717A] font-medium mb-1">FAULTS DETECTED</div>
          <div className="font-numeric-metric text-numeric-metric font-bold text-[#18181B]">{stats.faultsDetected.toLocaleString()}</div>
          <div className="font-body-sm text-body-sm text-[#71717A] mt-1">Anomalies identified</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5">
          <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#71717A] font-medium mb-1">MOST COMMON FAULT</div>
          <div className="font-headline-lg text-headline-lg font-bold text-[#18181B] truncate">{stats.mostCommon}</div>
          <div className="font-body-sm text-body-sm text-[#71717A] mt-1">
            {faults.length > 0 ? `${faults[0]?.pct || 0}% of detected anomalies` : 'No faults yet'}
          </div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5">
          <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#71717A] font-medium mb-1">AVG CONFIDENCE</div>
          <div className="font-numeric-metric text-numeric-metric font-bold text-[#18181B]">{stats.avgConfidence}%</div>
          <div className="font-body-sm text-body-sm text-[#71717A] mt-1">Dual-model ensemble</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-[8px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-6">
              <h3 className="font-headline-sm text-headline-sm font-semibold text-[#18181B]">Fault Distribution</h3>
              <span className="font-body-sm text-body-sm text-[#71717A]">Categorized anomaly counts across {stats.faultsDetected} detections</span>
            </div>
            <div className="space-y-6 pt-2 pb-4">
              {faults.map((f) => (
                <div key={f.name}>
                  <div className="flex justify-between items-center mb-1.5 font-label-md text-label-md">
                    <span className="text-[#18181B] font-medium">{f.name}</span>
                    <div className="space-x-3 text-right flex items-center">
                      <span className="text-[#71717A] font-numeric-metric text-xs font-normal">{f.count} scans</span>
                      <span className="text-[#18181B] font-medium">{f.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-[#F4F4F5] rounded-full overflow-hidden">
                    <div className={`h-full ${f.color || 'bg-[#E26829]'} rounded-full`} style={{ width: `${f.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] pt-4 mt-4 flex justify-between items-center font-body-sm text-body-sm text-[#71717A]">
            <span>Model Inferences: ResNet-50 + YOLO-Solar-v4</span>
            <span>Dataset calibrated: Sector 4-B</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-[8px] p-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-headline-sm text-headline-sm font-semibold text-[#18181B]">Recent Scans</h3>
            <Link to="/history" className="font-label-sm text-label-sm text-[#F26B1D] hover:text-[#D95A10] font-medium transition-colors">
              View all
            </Link>
          </div>
          <p className="font-body-sm text-body-sm text-[#71717A] mb-4">5 most recent automated model inferences</p>

          <div className="divide-y divide-[#F4F4F5]">
            {scans.map((scan) => (
              <div key={scan._id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[6px] border border-[#E5E7EB] overflow-hidden shrink-0 bg-[#FAFAFA]">
                    {scan.imageUrl && (
                      <img src={scan.imageUrl} alt={scan.faultType} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-label-md text-label-md font-medium text-[#18181B] truncate">{scan.faultType}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${severityDot(scan.severity)} inline-block shrink-0`}></span>
                      <span className="font-body-sm text-body-sm text-[#71717A]">{severityLabel(scan.severity)}</span>
                    </div>
                  </div>
                </div>
                <span className="font-body-sm text-body-sm text-[#71717A] shrink-0 whitespace-nowrap">{formatDate(scan.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
