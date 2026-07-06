import { useState } from 'react'
import { submitLead } from '../../api/leadsApi'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../ui/AuthModal'

const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Office']
const BUDGET_OPTIONS = ['Under ₹5L', '₹5L–₹10L', '₹10L–₹20L', '₹20L–₹50L', 'Above ₹50L']

export default function PriceCalculator() {
  const { isAuthenticated } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', city: '', bhk_type: '', budget_range: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }

    setStatus('loading')
    try {
      await submitLead({ ...form, source_page: 'price_calculator' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-pad bg-brand-cream">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge mb-3">Free Estimate</span>
            <h2 className="section-title">Get Your Home Design Cost</h2>
            <p className="section-subtitle">Fill in your details and get a personalized quote within 24 hours</p>
          </div>

          {status === 'success' ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-card">
              <div className="text-5xl text-brand-success mb-4">✓</div>
              <h3 className="font-display text-2xl font-bold text-brand-secondary mb-2">Thank You!</h3>
              <p className="text-brand-midGray">Our design consultant will call you within 24 hours with a detailed estimate.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Delhi, Noida, Ghaziabad…" className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Property Type</label>
                  <select name="bhk_type" value={form.bhk_type} onChange={handleChange} className="form-input">
                    <option value="">Select BHK / Type</option>
                    {BHK_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-brand-darkGray mb-2">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map(b => (
                    <button key={b} type="button"
                      onClick={() => setForm({ ...form, budget_range: b })}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                        ${form.budget_range === b
                          ? 'bg-brand-primary text-white border-brand-primary'
                          : 'bg-white text-brand-darkGray border-brand-border hover:border-brand-primary'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full text-base py-4">
                {status === 'loading' ? 'Submitting…' : 'Get My Free Estimate →'}
              </button>
              {status === 'error' && <p className="text-red-500 text-xs text-center mt-3">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => handleSubmit()}
      />
    </section>
  )
}
