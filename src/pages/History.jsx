import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/common/Loader'
import predictionApi from '../api/predictionApi'

const MOCK_DATA = [
  { _id: '1', faultType: 'Wafer Micro-Crack', severity: 'High', confidence: 96.8, array: 'Array 4 • String B2', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VySg7jzdggUM_mXvnrHHu4J1uKTAzxaqFlqVzCRIz7ZR9_9myMjO0FZIFqP5yr4gdIHA40gKynUoLz1Dj8_4G2LS4CuNHmuyBQ1sV5TBmptRlcx6Eqf0RISBnTGmIAnKwxMvqXvVrFcTMtyWrBL3LdjZ3sM7A31x4zeMxec64Tsq5yS6ILL0eEhKe9IBeWLFGA8ulkaLeb-yoT9LJDJ4ki4NLYD2Ks9SkInO4skR6y7Sqg7eOuY0CkPQRC', createdAt: '2025-10-14T09:42:00Z' },
  { _id: '2', faultType: 'Dust & Fine Soiling', severity: 'Low', confidence: 98.4, array: 'Array 1 • String A4', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UzT9GApX2iZGTmaB6zl3IEejrPnrgHD0kcaue74MymBmfzGYP4L1ZHo0Xg3_ahDElKkwfZo1t4ci5ELaq9tTQgAOZFAXogHi_LteBxOzki859oEStm-QRQAPRYUMIIn-Mf-t-8va1ALVn0m58Tu53ihlStsU7E2ktfLedV1B9UtrV8Gv5Pj68KDSRM4JE-lWSKaYcmnB1fYEJusGhY0B0UouJY8ReWQojOnclxUWGnNZrirsQ7S-vx7bhv', createdAt: '2025-10-14T09:15:00Z' },
  { _id: '3', faultType: 'Surface Debris', severity: 'Low', confidence: 94.2, array: 'Array 2 • String C1', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1W-4u_CaUF33uW0kXMr3M8sVk1ceDV4kGG_dKuSeQa8Phgipf59TMgsPwQxUvdHJZ0GUd23px9tKbKfZKkTEaqKipJ_U6QaE0vEYPUHivviJjTwkqCb-XCtyFchtbOSiX3BaobM2mPX_j5FEkmr5SunMOGlT4DSazNbxJJX6QNDA6s0NqY8Q3Sk50-uJgycnbDZMME0__C6-tMsaQ_S3I4Jx760Zn04zTMDdAD8G-FAneD8sO37jE1xeiNy', createdAt: '2025-10-13T14:10:00Z' },
  { _id: '4', faultType: 'Shading / Obstruction', severity: 'Medium', confidence: 91.5, array: 'Array 3 • String D2', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UfSkP5_6XGQLdcJLwRmyUuSDJIrgCOUjlyJvBfkHyZN8Cn3RHCvWO0SXl424K-k3RpPIaIGF_YC7CcL0D0eOxnDWcfuPLxFtuc7_YzoH41IPfvVic-Zd5KcDSHBVaO6nIy829IuVpIoUnzSHUw5GV_SMfbZNeT_djTPMQohG6gwF4KrvdsYDRFDJi62vKx2scFFYz9mG_VPfiyOQ_hiu7TWlHq2oipMoB0T3cTdjLeu3iuQvLCGv6FDlU9', createdAt: '2025-10-13T11:30:00Z' },
  { _id: '5', faultType: 'Physical Damage', severity: 'High', confidence: 99.1, array: 'Array 1 • String A7', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VySg7jzdggUM_mXvnrHHu4J1uKTAzxaqFlqVzCRIz7ZR9_9myMjO0FZIFqP5yr4gdIHA40gKynUoLz1Dj8_4G2LS4CuNHmuyBQ1sV5TBmptRlcx6Eqf0RISBnTGmIAnKwxMvqXvVrFcTMtyWrBL3LdjZ3sM7A31x4zeMxec64Tsq5yS6ILL0eEhKe9IBeWLFGA8ulkaLeb-yoT9LJDJ4ki4NLYD2Ks9SkInO4skR6y7Sqg7eOuY0CkPQRC', createdAt: '2025-10-12T16:45:00Z' },
  { _id: '6', faultType: 'Nominal (No Anomaly)', severity: 'Nominal', confidence: 99.6, array: 'Array 5 • String B1', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1W8sONQIY9f1mtjD5qmGFD1OGXiuZ7YGDtx8XmGMcspqaL4Z6hdAwuPGomeK5L0I_2NXLunTRgwGmqXqhk2TLoglNYeOZoDOAZ00yclqQ57mzHGDJVjzbo5AAgHmSqKOx5FBe3YXofAdi3hHn7gw8wFq6EQNf15N-1ZSmIRkZ5GSCMzIo9hjSPqVwryhBuwvoh6sZ_4LRQj5Upi--7-TRtc6xau5lKK3RViEu59Yu73QGTKYuQNTO76NcU', createdAt: '2025-10-12T13:20:00Z' },
  { _id: '7', faultType: 'Cell Delamination Risk', severity: 'Medium', confidence: 88.7, array: 'Array 2 • String B4', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Xrroh--NmJuO1JCbGXlraYrLPBcng5j3lTJyE5_5meySfdlIF9bKm3WX1oZifMGYj9sG-Mofb3AgcVFDaL_WNaUXf_F5aigg2ROGidZPiPDsOA7oIqjfCDSTapZE4YqYgJm_lq25XPGi-xGjbbA_6R-W9HVVXVtoAxWfC0-jltjCt_gux57qd6Wdk42FB5pSqCMrokAB0GBZNMbIJ17BLCZzZMb56YKcXsDfxX6sktfhBLMYOD-ax15NRa', createdAt: '2025-10-11T10:15:00Z' },
  { _id: '8', faultType: 'Dust & Fine Soiling', severity: 'Low', confidence: 97.3, array: 'Array 6 • String C3', imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UzT9GApX2iZGTmaB6zl3IEejrPnrgHD0kcaue74MymBmfzGYP4L1ZHo0Xg3_ahDElKkwfZo1t4ci5ELaq9tTQgAOZFAXogHi_LteBxOzki859oEStm-QRQAPRYUMIIn-Mf-t-8va1ALVn0m58Tu53ihlStsU7E2ktfLedV1B9UtrV8Gv5Pj68KDSRM4JE-lWSKaYcmnB1fYEJusGhY0B0UouJY8ReWQojOnclxUWGnNZrirsQ7S-vx7bhv', createdAt: '2025-10-10T15:50:00Z' },
]

const SEVERITY_DOT = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-amber-500',
  nominal: 'bg-emerald-500',
}

const FAULT_FILTER_OPTIONS = ['All Faults', 'Dust / Soiling', 'Micro-Cracking', 'Physical Damage', 'Shading / Obstruction', 'Nominal (No Fault)']

export default function History() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [faultFilter, setFaultFilter] = useState('All Faults')
  const [sortOption, setSortOption] = useState('newest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [, setTotalResults] = useState(0)
  const [useClientSide, setUseClientSide] = useState(false)
  const perPage = 10

  useEffect(() => {
    setPage(1)
  }, [searchQuery, faultFilter, sortOption])

  useEffect(() => {
    fetchHistory()
  }, [page, searchQuery, faultFilter, sortOption])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: perPage,
      }
      if (searchQuery) params.search = searchQuery
      if (faultFilter !== 'All Faults') params.faultType = faultFilter
      if (sortOption) params.sort = sortOption

      const res = await predictionApi.getHistory(params)
      const payload = res.data

      if (payload.predictions && typeof payload.totalPages === 'number') {
        setPredictions(payload.predictions)
        setTotalPages(payload.totalPages)
        setTotalResults(payload.total || payload.predictions.length)
        setUseClientSide(false)
      } else if (payload.data && typeof payload.totalPages === 'number') {
        setPredictions(payload.data)
        setTotalPages(payload.totalPages)
        setTotalResults(payload.total || payload.data.length)
        setUseClientSide(false)
      } else {
        const allData = payload.predictions || payload.data || payload || []
        const arr = Array.isArray(allData) ? allData : []
        setPredictions(arr)
        setTotalPages(1)
        setTotalResults(arr.length)
        setUseClientSide(true)
      }
    } catch (err) {
      if (!err.response) {
        console.warn('[Solara AI] Backend unreachable — showing mock history data')
      }
      setPredictions(MOCK_DATA)
      setTotalPages(1)
      setTotalResults(MOCK_DATA.length)
      setUseClientSide(true)
    } finally {
      setLoading(false)
    }
  }

  const clientFiltered = useClientSide
    ? predictions
        .filter((p) => {
          const matchesSearch = !searchQuery || p.faultType?.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesFault = faultFilter === 'All Faults' || p.faultType?.toLowerCase().includes(faultFilter.toLowerCase().split(' ')[0])
          return matchesSearch && matchesFault
        })
        .sort((a, b) => {
          if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
          if (sortOption === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
          if (sortOption === 'severity') {
            const order = { high: 0, medium: 1, low: 2, nominal: 3 }
            return (order[a.severity?.toLowerCase()] ?? 4) - (order[b.severity?.toLowerCase()] ?? 4)
          }
          if (sortOption === 'confidence') return (b.confidence || 0) - (a.confidence || 0)
          return 0
        })
    : predictions

  const displayTotalPages = useClientSide ? Math.ceil(clientFiltered.length / perPage) : totalPages
  const paginated = useClientSide
    ? clientFiltered.slice((page - 1) * perPage, page * perPage)
    : predictions

  const formatDateShort = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  if (loading) return <Loader text="Loading history..." />

  return (
    <div className="px-8 py-6 max-w-7xl w-full mx-auto">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-2">
        {/* Search */}
        <div className="relative w-full sm:w-[250px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search scans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#F26B1D] focus:ring-1 focus:ring-[#F26B1D] transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <select
              value={faultFilter}
              onChange={(e) => setFaultFilter(e.target.value)}
              className="appearance-none bg-white border border-zinc-300 rounded-lg px-3 py-2 pr-8 text-sm text-zinc-700 font-medium hover:border-zinc-400 focus:outline-none focus:border-[#F26B1D] focus:ring-1 focus:ring-[#F26B1D] transition-colors cursor-pointer"
            >
              {FAULT_FILTER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-zinc-300 rounded-lg px-3 py-2 pr-8 text-sm text-zinc-700 font-medium hover:border-zinc-400 focus:outline-none focus:border-[#F26B1D] focus:ring-1 focus:ring-[#F26B1D] transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="severity">Highest Severity</option>
              <option value="confidence">Highest Confidence</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table or Empty State */}
      {paginated.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <h2 className="text-base font-medium text-zinc-500 mb-1.5">No scans yet</h2>
          <p className="text-sm text-zinc-400 mb-4">Upload solar panel imagery to run neural defect analysis and build your fleet history.</p>
          <Link to="/analyze" className="text-sm text-[#F26B1D] hover:text-[#E05A0C] font-medium transition-colors">
            Analyze your first image
          </Link>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs font-medium text-zinc-500 tracking-normal">
                  <th scope="col" className="py-3 px-4 w-16">Image</th>
                  <th scope="col" className="py-3 px-4">Fault Type</th>
                  <th scope="col" className="py-3 px-4">Severity</th>
                  <th scope="col" className="py-3 px-4">Confidence</th>
                  <th scope="col" className="py-3 px-4">Date</th>
                  <th scope="col" className="py-3 px-4 text-right w-20"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm">
                {paginated.map((p) => {
                  const sevKey = (p.severity || 'low').toLowerCase()
                  return (
                    <tr key={p._id} className="hover:bg-zinc-50/75 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="w-10 h-10 rounded border border-zinc-200 overflow-hidden bg-zinc-50 shrink-0">
                          {p.imageUrl && <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-zinc-900">
                        {p.faultType}
                        {p.array && <span className="block text-xs text-zinc-400 font-normal">{p.array}</span>}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${SEVERITY_DOT[sevKey] || 'bg-zinc-400'} shrink-0`}></span>
                          <span className="text-xs text-zinc-600 font-normal">{p.severity}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-900 font-medium whitespace-nowrap">
                        {p.confidence}%
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap text-xs">
                        {formatDateShort(p.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link to={`/results/${p._id}`} className="text-[#F26B1D] font-medium text-sm hover:text-[#E05A0C] transition-colors">View</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {displayTotalPages > 1 && (
            <div className="py-8 flex items-center justify-center gap-6 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-zinc-500 hover:text-zinc-900 transition-colors disabled:text-zinc-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(displayTotalPages, 7) }, (_, i) => {
                let pageNum
                if (displayTotalPages <= 7) {
                  pageNum = i + 1
                } else if (page <= 4) {
                  pageNum = i + 1
                } else if (page >= displayTotalPages - 3) {
                  pageNum = displayTotalPages - 6 + i
                } else {
                  pageNum = page - 3 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`transition-colors ${page === pageNum ? 'text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-zinc-700'}`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              {displayTotalPages > 7 && <span className="text-zinc-300">...</span>}
              <button
                onClick={() => setPage((p) => Math.min(displayTotalPages, p + 1))}
                disabled={page === displayTotalPages}
                className="text-zinc-500 hover:text-zinc-900 transition-colors disabled:text-zinc-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
