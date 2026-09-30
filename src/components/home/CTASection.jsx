import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-b border-surface-variant bg-[#FAFAFA] py-16 px-6 lg:px-12">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW_Qpqn4sGaj7qUu9gOzLBlrcf9LqAM8feo1e0fNknwmHR0lUej9CCTpxzu0vVUBL97M32xitZIJRPjfjsVeB39_jRa66djjbFQA6yLMH0D__ufS4TPqKPSYbwW-xXFWIVBu8NOV9PDy235PVdJTHwmXCzJ-Qs5wKNdmGvstWYr9dOOVdsojWlhvAwxo2DHhDt2QShUVKwc1PBAoPkig36mr3qx2_0i0yFFMOIm10gHjY9IaVPw9wuzg"
        alt=""
      />
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-3">
          Start Monitoring Your Solar Panels Today
        </h2>
        <p className="font-body-md text-body-md text-secondary mb-6 leading-relaxed">
          Join renewable energy operators and field technicians improving yield and reducing downtime with Solara AI.
        </p>
        <div>
          <Link
            to="/register"
            className="font-label-md text-label-md bg-primary-container text-on-secondary px-8 py-3.5 rounded-xl font-medium border border-primary-container hover:bg-primary transition-colors inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  )
}
