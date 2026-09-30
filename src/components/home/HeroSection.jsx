import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold text-secondary">
              AI-POWERED SOLAR MONITORING
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface font-semibold tracking-tight leading-tight mb-5">
            Detect Solar Panel Faults Before They Cost You
          </h1>
          <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-8 max-w-lg">
            Upload an inspection photograph to receive instant computer-vision fault detection, severity classification, and actionable maintenance recommendations for field engineers.
          </p>
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              to="/register"
              className="font-label-md text-label-md bg-primary-container text-on-secondary px-6 py-3 rounded-xl font-medium border border-primary-container hover:bg-primary transition-colors text-center inline-block"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="font-label-md text-label-md bg-surface-container-lowest text-on-surface px-6 py-3 rounded-xl font-medium border border-surface-variant hover:bg-surface transition-colors text-center inline-block"
            >
              Log In
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-variant w-full grid grid-cols-3 gap-4">
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">99.2%</div>
              <div className="font-body-sm text-body-sm text-secondary">Diagnostic Accuracy</div>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">&lt; 1.8s</div>
              <div className="font-body-sm text-body-sm text-secondary">Inference Latency</div>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dual-Core</div>
              <div className="font-body-sm text-body-sm text-secondary">VGG16 + MobileNet</div>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative rounded-xl border border-surface-variant overflow-hidden bg-surface">
            <img
              className="w-full h-80 sm:h-96 object-cover block"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6EuuVHmPqInjpcL76sg3hKhRD7NU0EVoOhnMs6amAiPSHFY6vhXKZAHq_FsQnxj8pEqcLlsFplj1oWUp6-MjmlhrnvZdFNeKbJg4YH5BusGapNepU4eMc-_RXNvwyrkuGlqVaANOomDkHOd0frF1brgX76-lbJuO5kTYILt3uaxzPsJ5AoCRSc9TmOTm_-R8xbc5ddhW6F44x8ldrL5-NHjqhAlKmXWCFFy8qWIU1sBoOiw71fyVGeQ"
              alt="Rooftop solar panel installation"
            />
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest/90 px-2.5 py-1 rounded-full border border-surface-variant font-label-sm text-label-sm text-on-surface backdrop-blur-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  STRING SCAN ACTIVE
                </span>
                <span className="font-label-sm text-label-sm text-on-surface bg-surface-container-lowest/90 px-2.5 py-1 rounded-full border border-surface-variant">
                  ROI: R-1042
                </span>
              </div>
              <div className="relative w-44 h-24 border-[1.5px] border-primary-container rounded-sm mx-auto mb-6 bg-primary-container/5 flex items-start justify-start p-1">
                <span className="bg-primary-container text-on-secondary text-[9px] px-1 font-mono uppercase font-semibold leading-tight rounded-[2px]">
                  SOILING / DUST
                </span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto bg-surface-container-lowest border border-surface-variant rounded-xl p-3 px-4 flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                <span className="font-label-md text-label-md text-on-surface font-medium">
                  Fault Detected: Dust — Low Severity
                </span>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container-low text-primary px-2 py-0.5 rounded border border-surface-variant">
                Confidence 98.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
