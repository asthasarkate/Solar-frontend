import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PublicNavbar from '../components/layout/PublicNavbar'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar variant="login" />

      <main className="flex-1 flex flex-col md:flex-row w-full min-h-[calc(100vh-64px)]">
        <section className="w-full md:w-[45%] lg:w-[42%] flex flex-col items-center justify-center px-6 py-12 md:py-16 bg-surface-container-lowest">
          <div className="w-full max-w-[380px] flex flex-col">
            <div className="mb-8">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-1.5">
                Log in
              </h1>
              <p className="font-body-md text-body-md text-secondary">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  className="w-full h-9 px-3 bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-secondary-fixed-dim transition-colors"
                  placeholder="technician@solara.ai"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full h-9 px-3 bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-secondary-fixed-dim transition-colors"
                  placeholder="••••••••••••"
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                <div className="flex justify-end mt-1.5">
                  <a href="#" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-10 flex items-center justify-center rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-medium border border-primary-container transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Signing in...' : 'Log In'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-surface-variant text-center">
              <p className="font-body-sm text-body-sm text-secondary">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium hover:underline ml-1">
                  Register
                </Link>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              <span className="font-label-sm text-label-sm text-secondary">All inspection nodes operational</span>
            </div>
          </div>
        </section>

        <section className="hidden md:block md:w-[55%] lg:w-[58%] border-l border-surface-variant relative bg-surface-container">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsiTCH2-Qjc6adtJl03LDeQTQnW4okN81EphSY9RoyWynetjObt7oijg0LbL5Mv3aYojsQXuDohnlxuhWKHdeKpyZxw_IK0LwNfspEnUNWzVg5AWpc_8KDph-jvjxBc9vtth5e-zF9yGsq98xQEIcjuYECnMQ6HMkjFOowDYuoaIYNyyFahNae4Tw06efZl8rGbX-4n3VMbDjRcAUDTHcPJNW6zJuvRpZmbkkzGklD-NYBL166oo24sQ"
            alt="Rooftop solar panel installation"
          />
        </section>
      </main>
    </div>
  )
}
