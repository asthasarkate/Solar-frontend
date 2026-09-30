import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PublicNavbar({ variant = 'home' }) {
  const { user } = useAuth()

  const showNav = variant === 'home'

  return (
    <header className="sticky top-0 w-full h-16 z-50 bg-surface-container-lowest border-b border-surface-variant">
      <div className="w-full max-w-[1200px] mx-auto px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight"
        >
          Solara AI
        </Link>

        {showNav && (
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-150 ease-in-out">
              Features
            </a>
            <a href="#how-it-works" className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-150 ease-in-out">
              How It Works
            </a>
            <a href="#documentation" className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-150 ease-in-out">
              Documentation
            </a>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="font-label-md text-label-md bg-primary-container text-on-primary px-4 py-2 rounded-xl border border-primary-container hover:bg-primary transition-colors duration-150 ease-in-out"
            >
              Dashboard
            </Link>
          ) : variant === 'login' ? (
            <Link
              to="/register"
              className="font-label-md text-label-md bg-primary-container text-on-primary px-4 py-2 rounded-xl border border-primary-container hover:bg-primary transition-colors duration-150 ease-in-out"
            >
              Sign Up
            </Link>
          ) : variant === 'register' ? (
            <Link
              to="/login"
              className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-150 ease-in-out font-medium"
            >
              Log In
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-150 ease-in-out font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="font-label-md text-label-md bg-primary-container text-on-primary px-4 py-2 rounded-xl border border-primary-container hover:bg-primary transition-colors duration-150 ease-in-out"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
