import { FiSun } from 'react-icons/fi'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <FiSun className="w-10 h-10 text-primary-500 animate-spin" />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  )
}
