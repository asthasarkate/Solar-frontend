export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#FAFAFA] border-t border-b border-surface-variant py-16" id="features">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
            How Solara AI Helps
          </h2>
          <p className="font-body-md text-body-md text-secondary">
            Engineered for utility-scale fleets, commercial rooftops, and on-site field technicians.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-card-padding flex flex-col justify-between hover:border-outline-variant transition-colors">
            <div>
              <div className="w-16 h-16 rounded-lg border border-surface-variant overflow-hidden mb-4 bg-surface-container-low flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsv_2kIqhcwwqSUpZVFKV-2Z6OBA5O75XP7CnbFIeFj1NELcT01HELQeInlv6JL1Rr28PoSuBYU2d8dHmEPkw4RGd9bl-89p1Oz9SGSOSNsD8LUuSJhY7ucIZtSSqAF_69b4ktRdYwPaBuJ9-AhEsFsdxTyIlLKpjnh5EzhBw18uKKSdzmsoKAsJDN9dG7P_jAGSW0XDJvMAHp24dtCEHXPj9dRPU1oxxZW6t9HuGGxo1WpTMJgCRIg"
                  alt="Solar cell micro-crack"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1.5">
                Fault Detection
              </h3>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                Automatically identifies dust, cracks, damage, and shading from photos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between text-secondary font-label-sm text-label-sm">
              <span>Classifiers</span>
              <span className="font-medium text-on-surface">Multi-Class CV</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-card-padding flex flex-col justify-between hover:border-outline-variant transition-colors">
            <div>
              <div className="w-16 h-16 rounded-lg border border-surface-variant overflow-hidden mb-4 bg-surface-container-low flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR_t2KbIxW2JlqAHvmUtZEDqvePPcqKOuQkXxhLvHZfcTKsfDgtNwukciUfdnoXGp9csbMaBQgietdlvSnRWAY7U_6q_4rVVeLVzXRBK8_tFSnP6jaa9xQQsr9Dd9IBAck34fJeHrKumnz3tB41NIg-J4ia3gJ6x9w0Iwd1pMZFI3kDF-xURM9z1-1eCGCBoAyjXTfhxNcGtHW6JxDzT4dUBkI3_ZmYEzwoObEp5TT77yB2z-eKQbgXg"
                  alt="Dust covered solar panel"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1.5">
                Severity Assessment
              </h3>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                Classifies each fault as Low, Medium, or High severity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between text-secondary font-label-sm text-label-sm">
              <span>Risk Tiering</span>
              <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 3 Levels
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-card-padding flex flex-col justify-between hover:border-outline-variant transition-colors">
            <div>
              <div className="w-16 h-16 rounded-lg border border-surface-variant overflow-hidden mb-4 bg-surface-container-low flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO5bVB9tFjz7ieNRJrwrnjRcwYGcZ--Lvhp-Ndhd1BZ9Z_xbMUc3y81TRGniyOiaLJRbUVEK44IC9_3_221s1rCtoQOKeiG-TorSSh0_yzfOI9dg1o-yClzNXwvn_cBLW9m3vmr_zZyd0_q3dJiijlJl4zz2lSe90OhHqJYL9Elrc3UMAyyknt4aeZkKqWmnL7AJn0B6Hjsic5hTK7ws_BddsF09iz6ZeGSkqMt6Lg7dyt-cam4ettow"
                  alt="Field technician"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1.5">
                Smart Recommendations
              </h3>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                Get clear, actionable maintenance guidance for every fault.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between text-secondary font-label-sm text-label-sm">
              <span>Field Guidance</span>
              <span className="font-medium text-on-surface">Auto-Generated</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-card-padding flex flex-col justify-between hover:border-outline-variant transition-colors">
            <div>
              <div className="w-16 h-16 rounded-lg border border-surface-variant bg-surface flex items-center justify-center mb-4">
                <svg fill="none" height="28" stroke="#F26B1D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="28">
                  <line x1="18" x2="18" y1="20" y2="10"></line>
                  <line x1="12" x2="12" y1="20" y2="4"></line>
                  <line x1="6" x2="6" y1="20" y2="14"></line>
                  <line x1="2" x2="22" y1="20" y2="20"></line>
                </svg>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1.5">
                Model Comparison
              </h3>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                Powered by VGG16 and MobileNetV2, benchmarked for accuracy and speed.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-variant flex items-center justify-between text-secondary font-label-sm text-label-sm">
              <span>Dual Architecture</span>
              <span className="font-medium text-primary">VGG16 / M-Net</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
