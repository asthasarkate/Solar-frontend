import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import predictionApi from '../api/predictionApi'

const PANEL_IMG = 'https://lh3.googleusercontent.com/aida/AEtjO1W8sONQIY9f1mtjD5qmGFD1OGXiuZ7YGDtx8XmGMcspqaL4Z6hdAwuPGomeK5L0I_2NXLunTRgwGmqXqhk2TLoglNYeOZoDOAZ00yclqQ57mzHGDJVjzbo5AAgHmSqKOx5FBe3YXofAdi3hHn7gw8wFq6EQNf15N-1ZSmIRkZ5GSCMzIo9hjSPqVwryhBuwvoh6sZ_4LRQj5Upi--7-TRtc6xau5lKK3RViEu59Yu73QGTKYuQNTO76NcU'
const GOOD_IMG = 'https://lh3.googleusercontent.com/aida/AEtjO1UzT9GApX2iZGTmaB6zl3IEejrPnrgHD0kcaue74MymBmfzGYP4L1ZHo0Xg3_ahDElKkwfZo1t4ci5ELaq9tTQgAOZFAXogHi_LteBxOzki859oEStm-QRQAPRYUMIIn-Mf-t-8va1ALVn0m58Tu53ihlStsU7E2ktfLedV1B9UtrV8Gv5Pj68KDSRM4JE-lWSKaYcmnB1fYEJusGhY0B0UouJY8ReWQojOnclxUWGnNZrirsQ7S-vx7bhv'
const BAD_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYD1bjVCNmgpKfoXwC1_lSj0bNA-N91UxJd73EfT9wePzkVR0tJZL52O6Mjw1P3iWmPhIO1gGEDzvpUh6A3Q9nc9l3NdSZ2qjm8Zim7P5O8zu55SQMcjfBIjhRiWETr32RjTZdf73wBODKx41cCEJPfWkVKom2JPD32khiNcv7THN8XH4jlc-fN6JJtaCemtTHThmzQoumDx8YyOGMeMC-43pwSQSw2YbPKvST7z1pCfBcon_bwSHQ6Q'

export default function Analyze() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [activeTab, setActiveTab] = useState('upload')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setCameraActive(false)
  }

  const handleTabChange = (tab) => {
    if (tab === 'upload') {
      stopCamera()
      setActiveTab('upload')
    } else {
      setActiveTab('camera')
      startCamera()
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } })
      streamRef.current = stream
      setCameraActive(true)
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
      }, 100)
    } catch {
      toast.error('Camera access denied')
      setActiveTab('upload')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type.startsWith('image/')) {
      setSelectedFile(dropped)
      setPreview(URL.createObjectURL(dropped))
    }
  }

  const handleBrowse = (e) => {
    const f = e.target.files[0]
    if (f) {
      setSelectedFile(f)
      setPreview(URL.createObjectURL(f))
    }
  }

  const handleCapture = () => {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    canvas.toBlob((blob) => {
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' })
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      stopCamera()
      setActiveTab('upload')
    }, 'image/jpeg', 0.92)
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return toast.error('Please select an image first')
    setAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      const res = await predictionApi.analyze(formData)
      const data = res.data
      const prediction = data.prediction || data
      const id = prediction._id || prediction.id || data._id || data.id
      toast.success('Analysis complete!')
      if (id) {
        navigate(`/results/${id}`, { state: { result: prediction } })
      } else {
        navigate('/results/new', { state: { result: prediction } })
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="px-6 pt-12 pb-20 max-w-[600px] w-full mx-auto">

      {/* Underline Tabs */}
      <div className="flex border-b border-zinc-200 mb-8">
        <button
          onClick={() => handleTabChange('upload')}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'upload'
              ? 'text-[#F26B1D] border-[#F26B1D]'
              : 'text-zinc-500 border-transparent hover:text-zinc-900'
          }`}
        >
          Upload Image
        </button>
        <button
          onClick={() => handleTabChange('camera')}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'camera'
              ? 'text-[#F26B1D] border-[#F26B1D]'
              : 'text-zinc-500 border-transparent hover:text-zinc-900'
          }`}
        >
          Use Camera
        </button>
      </div>

      {/* STATE 1: Upload Empty */}
      {activeTab === 'upload' && !preview && (
        <div className="space-y-6">
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="h-[400px] w-full border border-dashed border-zinc-400 hover:border-[#F26B1D] rounded-lg bg-white flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-[#FFF7ED] flex items-center justify-center text-zinc-400 group-hover:text-[#F26B1D] mb-4 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-base font-medium text-zinc-900 mb-1">Drag and drop an image here</p>
            <p className="text-sm text-zinc-500">or <span className="text-[#F26B1D] font-medium hover:underline">click to browse</span></p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleBrowse}
            className="hidden"
          />

          {/* Helper text */}
          <p className="text-xs text-zinc-400 text-center">
            Supported: JPG, PNG — clear, well-lit images work best
          </p>

          {/* Image Quality Guide */}
          <div className="pt-3 border-t border-zinc-200">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3 text-center">Image Quality Guide</p>
            <div className="flex items-center justify-center gap-6">
              {/* Good */}
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 p-2 rounded-lg w-[210px]">
                <div className="w-20 h-20 rounded border border-zinc-200 overflow-hidden shrink-0 bg-zinc-100">
                  <img src={GOOD_IMG} alt="Good Quality" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Good
                  </span>
                  <p className="text-[11px] text-zinc-500 leading-tight mt-1">Sharp, natural daylight, visible cell grid</p>
                </div>
              </div>

              {/* Avoid */}
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 p-2 rounded-lg w-[210px]">
                <div className="w-20 h-20 rounded border border-zinc-200 overflow-hidden shrink-0 bg-zinc-100">
                  <img src={BAD_IMG} alt="Avoid Quality" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    Avoid
                  </span>
                  <p className="text-[11px] text-zinc-500 leading-tight mt-1">Motion blur, heavy glare or dark shadows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: Camera Active */}
      {activeTab === 'camera' && !preview && (
        <div className="space-y-6">
          {/* Live camera preview */}
          <div className="h-[400px] w-full border border-zinc-200 rounded-lg overflow-hidden relative bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Viewfinder HUD overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>LIVE FEED • 1080p</span>
                </div>
                <span className="text-xs text-white/80 font-mono bg-black/40 px-2 py-1 rounded">AUTO-FOCUS</span>
              </div>

              {/* Framing target crosshairs */}
              <div className="self-center w-48 h-48 border border-white/40 rounded flex items-center justify-center relative">
                <div className="w-3 h-3 border-t-2 border-l-2 border-white absolute top-0 left-0"></div>
                <div className="w-3 h-3 border-t-2 border-r-2 border-white absolute top-0 right-0"></div>
                <div className="w-3 h-3 border-b-2 border-l-2 border-white absolute bottom-0 left-0"></div>
                <div className="w-3 h-3 border-b-2 border-r-2 border-white absolute bottom-0 right-0"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>

              <div className="text-center">
                <span className="text-xs text-white/80 bg-black/50 px-3 py-1 rounded-full">Position solar panel within target frame</span>
              </div>
            </div>
          </div>

          {/* Capture button */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={handleCapture}
              title="Capture Image"
              className="w-14 h-14 rounded-full border-[1.5px] border-[#F26B1D] flex items-center justify-center bg-white hover:bg-[#FFF7ED] transition-all active:scale-95 group focus:outline-none"
            >
              <span className="w-10 h-10 rounded-full bg-[#F26B1D] group-hover:bg-[#d95a12] transition-colors"></span>
            </button>
            <span className="text-xs text-zinc-400 mt-2 font-medium">Click to Capture</span>
          </div>
        </div>
      )}

      {/* STATE 3: Image Selected */}
      {preview && (
        <div className="space-y-6">
          {/* Image preview */}
          <div className="h-[400px] w-full border border-zinc-200 rounded-lg overflow-hidden relative bg-zinc-100">
            <img
              src={preview}
              alt="Selected solar panel"
              className="w-full h-full object-cover"
            />

            {/* Filename badge */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-zinc-200 rounded px-2.5 py-1 text-xs font-medium text-zinc-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{selectedFile?.name || 'captured-image.jpg'}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleClear}
              className="px-5 py-2.5 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-900 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              Remove
            </button>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-6 py-2.5 rounded-lg bg-[#F26B1D] hover:bg-[#d95a12] text-sm font-medium text-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <span>Analyze Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
