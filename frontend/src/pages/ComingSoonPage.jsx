import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function ComingSoonPage() {
  return (
    <>
      <Helmet>
        <title>Coming Soon | AADI SHRI INTERIOR</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-brand-cream">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-mega border border-brand-border">
          <span className="badge mb-4">Under Construction</span>
          <h1 className="font-display text-3xl font-bold text-brand-secondary mb-3">
            Something Beautiful is Coming
          </h1>
          <p className="text-brand-midGray text-sm leading-relaxed mb-8">
            Our editorial team is crafting premium design ideas, styling tips, and vastu guides to inspire your space. Stay tuned!
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="btn-primary w-full">
              Back to Home
            </Link>
            <Link to="/contact" className="btn-outline w-full justify-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
