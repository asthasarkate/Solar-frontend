import { Link } from 'react-router-dom'

export default function PublicFooter() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-variant mt-16">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Solara AI
          </span>
          <span className="hidden sm:inline text-secondary">&bull;</span>
          <span className="font-body-sm text-body-sm text-secondary">
            &copy; 2025 Solara AI Inc. Solar Infrastructure Intelligence. All rights reserved.
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a href="#features" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors duration-150">
            Features
          </a>
          <a href="#how-it-works" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors duration-150">
            How It Works
          </a>
          <a href="#documentation" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors duration-150">
            Documentation
          </a>
          <a href="#privacy" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors duration-150">
            Privacy Policy
          </a>
          <a href="#terms" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors duration-150">
            Terms of Service
          </a>
          <a href="#status" className="font-label-sm text-label-sm text-primary font-medium transition-colors duration-150">
            System Status
          </a>
        </nav>
      </div>
    </footer>
  )
}
