import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="font-light tracking-tight text-zinc-200 select-none text-[88px] leading-[96px] mb-3">
          404
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-sm text-zinc-500 max-w-xs mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center text-[13px] font-medium text-white bg-[#F26B1D] border border-[#F26B1D] rounded-xl px-6 py-2.5 transition-colors hover:bg-[#d95a12] active:bg-[#c24e0b] focus:outline-none focus:ring-1 focus:ring-[#F26B1D]"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  )
}
