import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HERO_POSTER = 'https://lh3.googleusercontent.com/aida/AEtjO1UOjfvxnuaQE3Ly1_XTuoGZfcA9k6L8Iba58D1zKe86_Jbo4XvEmBk6jgDlLWQ3_axS7LykZe3_wW-F3jZ9cbOzUBLFVYEWuD8p1vjDfYREoS8_0sg6Ppk9180033AJEBIFqzX6wwmH-zmCIbL4WVygkP5LOrANY0c3SzpFALQSRQduIgmZv0CPYLNF1h_RjEpkgp6szBJZ8n9EvXyuKG0PR9w0AF8HbIsAFLcZ-b2KN64RLidZnSXKraDX'

const FEATURES = [
  {
    title: 'Fault Detection',
    desc: 'Automatically identifies dust, cracks, damage, and shading from photos.',
    footerLabel: 'Classifiers',
    footerValue: 'Multi-Class CV',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1VX4slrqlZLzO4kma3uhpTfmooGH08F1TiWh-ha6Riseo2Qjv4MPQR10PaCuSz6suy2eKq16Y-6QR_pSk9O8WbczFK3sOq6aBE1vPhUoFJMmFshFK-1vSt3etNM025lMKoa3VFS0XKomm9hyADk-pvmW3Rpbrc59slFTs3rbXLA1JZh2WoyVsBg-f5W324CYiQQTHtQRJTQXaOVX_eHNtBZXjMzmpm7pyLxMfKpe4T8govLhuYtiQktiKrD',
  },
  {
    title: 'Severity Assessment',
    desc: 'Classifies each fault as Low, Medium, or High severity.',
    footerLabel: 'Risk Tiering',
    footerValue: '3 Levels',
    footerDot: true,
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1VXA1K493RwvzuqP7b2jhg8Bgp905A01YVlVNKIS7UI26Z43PTjiQ2lQ94cnjShvJsjQMSVGrK_kOSr0y91pYMeiI9ygJ54Vup0qCz-hA4vEz5xecW423L7SwQ4VuVG1v3OZbAeCvbCnD0bmsQoybHBkw9myMvz1YtX84lzWYQHGV6_X8ZYlQLI8Z9acalgr2dC_UFeQxy6gmwIHpgHp5WRIBnMLXyhBby90Nch55rkADzf123EAF_BYiIA',
  },
  {
    title: 'Smart Recommendations',
    desc: 'Get clear, actionable maintenance guidance for every fault.',
    footerLabel: 'Field Guidance',
    footerValue: 'Auto-Generated',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1W09OzzwEOzeO46p4avV9N2zR6aVK1GAjZlp7xjtCYFjLhOTtOcWigemJNB1f3Rj6Gd6NWKYgBgh2zSEjWXBlvNnp4o6MNKgck1NIWB5rfgbblh6b1c4eL2Zdmywk1urMDN9F1QEfocOSiUhJc-sVbEbqwOW0JbashA9iCsjqr3i8rhuS18-skrYHc6jQWfD3HS7rZ5vmS2-6uBgusR6j_MSYlT988MB_CDCWR_1W8ztdmtpOZV6IU26Jzq',
  },
  {
    title: 'Model Comparison: VGG16 vs MobileNetV2',
    desc: 'Powered by VGG16 and MobileNetV2, benchmarked for accuracy and speed.',
    footerLabel: 'Dual Architecture',
    footerValue: 'VGG16 / M-Net',
    footerOrange: true,
    img: null,
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Upload or Capture',
    desc: 'Snap a photo directly with a mobile device or upload high-res aerial drone imagery.',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1U3wfBxUUtfyKztK59D-UTRBz7jY3s8pI8gNulCaTFzRFlhll2BL8fcqhIumV8tR8ej0ofManGaN6FMsWppQX_WXMsPDp4h3PcaSvrVupv8tuNLC43GxcaGyR0RcyF6nPomZZOdFevzZhnxQyBQClIv9hD09UWLTbCBcyP8ZVBnVOstJhSSBZZ1RRGF3nDvlNEL6htV946i4hZvCur2ia76kCjLyfBQV4eIdW32Xs8UY7EhJ7mXQ0-AG5Dz',
  },
  {
    num: 2,
    title: 'AI Analysis',
    desc: 'Dual-model neural architectures evaluate surface anomalies and classify fault severity in seconds.',
    img: null,
  },
  {
    num: 3,
    title: 'Get Recommendations',
    desc: 'Receive prioritized maintenance schedules, cleaning steps, and component replacement alerts.',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1UvDZexR0zrtkZ--1rFLu1N6h7aqE0nZFEnW3NblqMPs81tcms6ct_GLdta2b4pFln27rKPR2lN28ZDVbfQnLH6At0Gg2eOCiv4Bosg7VV-XVU4DroxNF5grfALQALhjLNsJQpot0hutRClCokDNywi0lburhFyFjkuECuMK8Fi8Cv7kY7mzr88vSW2lpWcIFqdcFDQ7V1HSlRLqe-66T3nUN9K0WDI8Q1TgQxdFyKqxRRxDrkixPxYymQp',
  },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* ===== NAVBAR ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur border-zinc-200'
          : 'bg-transparent border-transparent'
      }`}>
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className={`font-semibold text-xl tracking-tight transition-colors ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
            Solara AI
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Documentation'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/ /g, '-')}`}
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-zinc-600 hover:text-zinc-900' : 'text-white/90 hover:text-[#F26B1D]'}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-zinc-600 hover:text-zinc-900' : 'text-white/90 hover:text-white'}`}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="text-sm bg-[#F26B1D] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d95d16] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ===== HERO SECTION ===== */}
        <section className="h-[90vh] min-h-[640px] relative w-full overflow-hidden flex items-center justify-center bg-black">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/Video.mp4" type="video/mp4" />
          </video>

          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

          {/* Centered hero content */}
          <div className="relative z-20 max-w-[760px] mx-auto px-6 text-center text-white pt-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F26B1D]"></span>
              <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase">AI-POWERED SOLAR MONITORING</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-6">
              Detect Solar Panel Faults Before They Cost You
            </h1>
            <p className="text-lg text-zinc-200 leading-relaxed max-w-[640px] mx-auto mb-8">
              Upload an inspection photograph to receive instant computer-vision fault detection, severity classification, and actionable maintenance recommendations for field engineers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/register" className="bg-[#F26B1D] hover:bg-[#d95d16] text-white px-6 py-3 rounded-lg font-medium transition-all inline-block">
                Get Started
              </Link>
              <Link to="/login" className="border border-white/80 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all inline-block">
                Log In
              </Link>
            </div>
          </div>

          {/* Scroll-down indicator */}
          <a
            href="#features"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white/80 hover:text-white cursor-pointer transition-colors"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="w-full bg-[#FAFAFA] border-y border-zinc-200/80 py-20 px-6" id="features">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl text-zinc-900 font-semibold mb-2">How Solara AI Helps</h2>
              <p className="text-sm text-zinc-600">Engineered for utility-scale fleets, commercial rooftops, and on-site field technicians.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feat) => (
                <div key={feat.title} className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col justify-between hover:border-zinc-300 transition-colors">
                  <div>
                    {feat.img ? (
                      <div className="w-16 h-16 rounded-lg border border-zinc-200 overflow-hidden mb-4 bg-zinc-50 flex items-center justify-center">
                        <img src={feat.img} alt={feat.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center mb-4">
                        <svg fill="none" height="28" width="28" viewBox="0 0 24 24" stroke="#F26B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" x2="18" y1="20" y2="10" />
                          <line x1="12" x2="12" y1="20" y2="4" />
                          <line x1="6" x2="6" y1="20" y2="14" />
                          <line x1="2" x2="22" y1="20" y2="20" />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-base text-zinc-900 font-semibold mb-1.5">{feat.title}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-500 text-xs">
                    <span>{feat.footerLabel}</span>
                    {feat.footerDot ? (
                      <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {feat.footerValue}
                      </span>
                    ) : (
                      <span className={`font-medium ${feat.footerOrange ? 'text-[#F26B1D]' : 'text-zinc-800'}`}>{feat.footerValue}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto bg-white" id="how-it-works">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl text-zinc-900 font-semibold mb-2">Get Results in Three Steps</h2>
              <p className="text-sm text-zinc-600">Seamless workflow designed for rapid diagnosis in the field or control room.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Connecting hairline */}
              <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-[1px] bg-zinc-200 z-0" />

              {STEPS.map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-[1.5px] border-[#F26B1D] text-[#F26B1D] bg-white font-semibold flex items-center justify-center mb-6 text-base">
                    {step.num}
                  </div>
                  {step.img ? (
                    <div className="w-[120px] h-[120px] rounded-xl border border-zinc-200 overflow-hidden mb-4 bg-zinc-50 flex-shrink-0">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-[120px] h-[120px] rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center mb-4 flex-shrink-0">
                      <svg fill="none" height="40" width="40" viewBox="0 0 24 24" stroke="#F26B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                        <line x1="3" x2="21" y1="9" y2="9" />
                        <line x1="9" x2="9" y1="21" y2="9" />
                        <circle cx="15" cy="15" r="2" />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-base text-zinc-900 font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA BAND ===== */}
        <section className="relative w-full overflow-hidden border-t border-b border-zinc-200/80 bg-[#FAFAFA] py-20 px-6 lg:px-12">
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          />
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-zinc-900 font-semibold mb-3">Start Monitoring Your Solar Panels Today</h2>
            <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
              Join renewable energy operators and field technicians improving yield and reducing downtime with Solara AI.
            </p>
            <Link to="/register" className="bg-[#F26B1D] hover:bg-[#d95d16] text-white px-8 py-3.5 rounded-lg font-medium transition-colors inline-block text-sm">
              Create Free Account
            </Link>
          </div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-zinc-200 py-6">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-zinc-900 font-semibold text-sm">Solara AI</span>
            <span className="text-zinc-300">|</span>
            <span className="text-xs text-zinc-500">&copy; 2026 Solara AI</span>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/login" className="text-xs text-zinc-500 hover:text-[#F26B1D] transition-colors">Login</Link>
            <Link to="/register" className="text-xs text-zinc-500 hover:text-[#F26B1D] transition-colors">Sign Up</Link>
            <a href="#" className="text-xs text-zinc-500 hover:text-[#F26B1D] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
