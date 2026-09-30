export default function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface-container-lowest" id="how-it-works">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
            Get Results in Three Steps
          </h2>
          <p className="font-body-md text-body-md text-secondary">
            Seamless workflow designed for rapid diagnosis in the field or control room.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-[1px] bg-surface-variant z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border-[1.5px] border-primary-container text-primary-container bg-surface-container-lowest font-semibold flex items-center justify-center mb-6 font-headline-sm text-headline-sm">
              1
            </div>
            <div className="w-[120px] h-[120px] rounded-xl border border-surface-variant overflow-hidden mb-4 bg-surface flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFJdQYDqyMmQT2SPvjHcmUPzf2bPNv3KRS1japF-FaA9XD787cPZ6Ehh7h-1po6Ru3sKB2li5jpRoUJ_nTza6eD42aGz9bM2R_41g5K18RirDIX8qv3ZItiQzQTGCTVioleNo7_CLPGmP__ICnrsPvW9vXZBx0dzrkGqKm1s3iGCEisAQx00BcrV0PXNJ4X7MtBZi0J78AoYBgO7yxvBdbPKd0t1yt3sBcZivtYusyf7Us1fgEHIUHwA"
                alt="Upload or capture"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
              Upload or Capture
            </h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed max-w-xs">
              Snap a photo directly with a mobile device or upload high-res aerial drone imagery.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border-[1.5px] border-primary-container text-primary-container bg-surface-container-lowest font-semibold flex items-center justify-center mb-6 font-headline-sm text-headline-sm">
              2
            </div>
            <div className="w-[120px] h-[120px] rounded-xl border border-surface-variant bg-surface flex items-center justify-center mb-4 flex-shrink-0">
              <svg fill="none" height="40" stroke="#F26B1D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="40">
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
                <line x1="3" x2="21" y1="9" y2="9"></line>
                <line x1="9" x2="9" y1="21" y2="9"></line>
                <circle cx="15" cy="15" r="2"></circle>
              </svg>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
              AI Analysis
            </h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed max-w-xs">
              Dual-model neural architectures evaluate surface anomalies and classify fault severity in seconds.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border-[1.5px] border-primary-container text-primary-container bg-surface-container-lowest font-semibold flex items-center justify-center mb-6 font-headline-sm text-headline-sm">
              3
            </div>
            <div className="w-[120px] h-[120px] rounded-xl border border-surface-variant overflow-hidden mb-4 bg-surface flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-aWUDhWEV_Ub6aZYDJeNdu5vfqp48kCvakxtfTbDAzDDprXtSPRsDCD29eQx9JIbfpR5hOzBRI_rw_PlZoMArPUjybJr1pX-5wraMT_CTdH5X_YJvSjlmcLmEct8qYD5SOCPpByblCtpu-xzERNMfio_4sByhE7igySlSubzRxud9yq2vPkyaBQD3_5Dh6KdH_FGRftumxTDMx7RKS6ILwlccxPcoOZBowpB4JUBVFbwOhQxRk9iNKA"
                alt="Get recommendations"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
              Get Recommendations
            </h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed max-w-xs">
              Receive prioritized maintenance schedules, cleaning steps, and component replacement alerts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
