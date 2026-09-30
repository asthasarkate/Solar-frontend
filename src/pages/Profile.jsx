import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/common/Loader'
import authApi from '../api/authApi'
import predictionApi from '../api/predictionApi'
import { formatDate } from '../utils/formatDate'

const AVATAR_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VNkW4SMCCeBZvck-xrw_xYPiivttnGOcQw8HMAdptONwTCZpXi95AkP20RUfbEqEe0IJ0U6UzZMXwoIzenFw7niAvCvAUo_u1UXUEHQMYUqh0KcI9AUtvWLAsj1PtQKDFkTak8cV0cLqRaSd9ppgfKgPiWCYGPcrLJY-dDYn3eLdAoopI4Ii9PV_A3FXjqy6PDManJM6Tf0vvfO_80rl5iQfp0IgmOmRvTCcPMpZAmXfWeesTi8Dj7b-Wt'

export default function Profile() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [scanCount, setScanCount] = useState(0)
  const [avatarMode, setAvatarMode] = useState('initials')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  })

  useEffect(() => {
    reset({ name: user?.name || '', email: user?.email || '' })
    fetchScanCount()
  }, [user])

  const fetchScanCount = async () => {
    try {
      const res = await predictionApi.getHistory()
      const predictions = res.data.predictions || res.data || []
      setScanCount(Array.isArray(predictions) ? predictions.length : 0)
    } catch {
      setScanCount(0)
    }
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const res = await authApi.updateProfile({ name: data.name })
      updateUser(res.data.user || res.data)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const memberDate = user?.createdAt ? formatDate(user.createdAt) : 'March 12, 2024'

  if (!user) return <Loader />

  return (
    <div className="bg-surface-container-lowest px-4 pt-12 pb-16">
      <div className="max-w-[500px] mx-auto">

        {/* User Identity Block */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-3">
            <div className="w-[72px] h-[72px] rounded-full border border-zinc-200 overflow-hidden flex items-center justify-center bg-zinc-100">
              {avatarMode === 'photo' ? (
                <img alt={user.name} src={AVATAR_URL} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl text-zinc-600 font-semibold select-none">{initials}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => setAvatarMode(avatarMode === 'initials' ? 'photo' : 'initials')}
            className="text-xs text-zinc-400 hover:text-zinc-700 underline-offset-2 hover:underline transition-colors mb-2 cursor-pointer inline-flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.3" />
            </svg>
            Change Photo
          </button>

          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">{user.name}</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{user.email}</p>
        </div>

        {/* Section 1: Account Details */}
        <section className="border border-zinc-200 bg-white rounded-xl p-6 mb-6">
          <h3 className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-5">Account Details</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-zinc-900 mb-1.5" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#F26B1D] transition-colors"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-medium text-zinc-900 mb-1.5" htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                type="email"
                value={user.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-500"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#F26B1D] text-white text-[13px] font-medium rounded-xl hover:bg-[#d95a12] transition-colors active:scale-[0.99] disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>

        {/* Section 2: Account Info */}
        <section className="border border-zinc-200 bg-white rounded-xl p-6 mb-8">
          <h3 className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-3">Account Info</h3>
          <div className="divide-y-0">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-500">Member Since</span>
              <span className="text-[13px] font-semibold text-zinc-900">{memberDate}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-500">Total Scans</span>
              <span className="text-[13px] font-semibold text-zinc-900">{scanCount.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Bottom Action */}
        <div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50 rounded-xl text-[13px] font-medium transition-colors"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  )
}
