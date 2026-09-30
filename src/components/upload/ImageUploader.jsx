import { useRef } from 'react'
import { FiUploadCloud, FiImage, FiX } from 'react-icons/fi'

export default function ImageUploader({ onImageSelect, preview, onClear }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) onImageSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) onImageSelect(file)
  }

  if (preview) {
    return (
      <div className="relative">
        <img src={preview} alt="Preview" className="w-full max-h-80 object-contain rounded-lg border border-gray-200" />
        <button
          onClick={onClear}
          className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-sm font-medium text-gray-700 mb-1">Drop your image here, or click to browse</p>
      <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP</p>
    </div>
  )
}
