import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { FiCamera, FiRefreshCw } from 'react-icons/fi'

export default function CameraCapture({ onCapture }) {
  const webcamRef = useRef(null)
  const [captured, setCaptured] = useState(null)

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) setCaptured(imageSrc)
  }

  const confirm = () => {
    if (captured) {
      const file = dataURLtoFile(captured, 'camera-capture.jpg')
      onCapture(file, captured)
    }
  }

  const retake = () => setCaptured(null)

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new File([u8arr], filename, { type: mime })
  }

  if (captured) {
    return (
      <div className="space-y-4">
        <img src={captured} alt="Captured" className="w-full max-h-80 object-contain rounded-lg border border-gray-200" />
        <div className="flex gap-3">
          <button
            onClick={confirm}
            className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Use Photo
          </button>
          <button
            onClick={retake}
            className="flex items-center justify-center gap-2 border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Retake
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full"
          videoConstraints={{ facingMode: 'environment' }}
        />
      </div>
      <button
        onClick={capture}
        className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
      >
        <FiCamera className="w-4 h-4" />
        Capture Photo
      </button>
    </div>
  )
}
