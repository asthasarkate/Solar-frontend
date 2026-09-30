import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PublicNavbar from '../components/layout/PublicNavbar'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const getStrength = () => {
    if (!password) return 0
    let s = 0
    if (password.length >= 6) s++
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  }
  const strength = getStrength()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password })
      toast.success('Account created! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar variant="register" />

      <main className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)] w-full">
        <section className="w-full md:w-[45%] flex flex-col justify-between items-center px-6 py-12 md:py-16 bg-surface-container-lowest">
          <div className="w-full max-w-[380px] my-auto">
            <div className="mb-6">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-1">
                Create an account
              </h1>
              <p className="font-body-md text-body-md text-secondary">Create your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="full_name">
                  Full Name
                </label>
                <input
                  id="full_name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-[#E5E7EB] rounded-xl font-body-md text-body-md text-on-surface placeholder-[#A1A1AA] focus:outline-none focus:border-primary-container focus:ring-0 transition-colors"
                  placeholder="e.g. Alex Rivera"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-[#E5E7EB] rounded-xl font-body-md text-body-md text-on-surface placeholder-[#A1A1AA] focus:outline-none focus:border-primary-container focus:ring-0 transition-colors"
                  placeholder="technician@solara.ai"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-[#E5E7EB] rounded-xl font-body-md text-body-md text-on-surface placeholder-[#A1A1AA] focus:outline-none focus:border-primary-container focus:ring-0 transition-colors"
                  placeholder="Create a password"
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                <div aria-hidden="true" className="flex items-center gap-1.5 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? 'bg-primary-container' : 'bg-[#E5E7EB]'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? 'bg-primary-container' : 'bg-[#E5E7EB]'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-primary-container' : 'bg-[#E5E7EB]'}`}></div>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="confirm_password">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (val) => val === password || 'Passwords do not match',
                  })}
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-[#E5E7EB] rounded-xl font-body-md text-body-md text-on-surface placeholder-[#A1A1AA] focus:outline-none focus:border-primary-container focus:ring-0 transition-colors"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-10 bg-primary-container hover:bg-[#d95c14] active:bg-[#c24e0b] text-on-primary font-label-md text-label-md font-medium rounded-xl border border-primary-container transition-colors duration-150 flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="font-body-md text-body-md text-secondary">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-container font-medium hover:underline ml-1">
                  Log In
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full max-w-[380px] pt-8 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            <span className="font-label-sm text-label-sm text-secondary tracking-wide">All inspection nodes operational</span>
          </div>
        </section>

        <section className="hidden md:block md:w-[55%] border-l border-[#E5E7EB] bg-surface-container-lowest relative overflow-hidden">
          <img
            alt="Solar panel array field installation under daylight"
            className="w-full h-full object-cover select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWCY4lM00H8K6owjGFWdxNDlfhvHJfV6rXBSZUOGegnIdVp1mNsT_4RY5J9me73HaXz-4SFYifwjt2wWiO-U3bfcsF4RKbKbY5nomrNRL8a7_3VtyLxzzaaFSJDbS29ZtrccCAEP-lJdfx2qHYOKdDBHQwanmVvvD93rmpM9Ua0s9YW3adrIte2tdPYg8o-KA5sVgD2QnVf0jfSo8PYEje2IIU16KEzO8EM53RS2VGDljpVtjk7JPukA"
          />
        </section>
      </main>
    </div>
  )
}
