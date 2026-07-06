import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { submitLead } from '../api/leadsApi'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/ui/AuthModal'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function ContactPage() {
  const { isAuthenticated } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    if (e) e.preventDefault()
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }

    setStatus('loading')
    try {
      await submitLead({ ...form, source_page: 'contact_page' })
      setStatus('success')
    } catch { setStatus('error') }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | AADI SHRI INTERIOR</title>
        <meta name="description" content="Get in touch with AADI SHRI INTERIOR. Book a free consultation for your home or office interior design project." />
      </Helmet>
      <section className="section-pad">
        <div className="container-main">
          <div className="text-center mb-12">
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">Let's start designing your dream space</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-card">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="text-5xl text-brand-success mb-4">✓</div>
                  <h3 className="font-display text-2xl font-bold text-brand-secondary mb-2">Message Sent!</h3>
                  <p className="text-brand-midGray">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className="form-input" placeholder="Delhi, Noida, Ghaziabad…" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkGray mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="form-input resize-none" placeholder="Tell us about your project…" />
                  </div>
                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full py-4 text-base">
                    {status === 'loading' ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: FaPhone,       label: 'Call Us',           value: '+91 95074 92111' },
                { icon: FaEnvelope,    label: 'Email Us',          value: 'info@aadishriinterior.com' },
                { icon: FaMapMarkerAlt,label: 'Our Office',        value: 'New Delhi, India' },
                { icon: FaClock,       label: 'Working Hours',     value: 'Mon – Sat: 10:00 AM – 7:00 PM' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-secondary text-sm">{label}</div>
                    <div className="text-brand-midGray text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => handleSubmit()}
      />
    </>
  )
}
