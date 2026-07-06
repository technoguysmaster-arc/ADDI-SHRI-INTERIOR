import { useState } from 'react'
import { FaComments, FaTimes } from 'react-icons/fa'
import { submitLead } from '../../api/leadsApi'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../ui/AuthModal'

export default function ChatWidget() {
  const { isAuthenticated } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }

    setStatus('loading')
    try {
      await submitLead({ ...form, source_page: 'chat_widget' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="w-12 h-12 rounded-full bg-brand-primary text-white
                   flex items-center justify-center shadow-lg
                   hover:scale-110 transition-all duration-250"
      >
        {open ? <FaTimes size={18} /> : <FaComments size={20} />}
      </button>

      {/* Chat popup */}
      {open && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-mega overflow-hidden animate-fade-in-up">
          <div className="bg-brand-primary p-4">
            <h3 className="text-white font-semibold text-sm">Get a Free Consultation</h3>
            <p className="text-white/80 text-xs mt-0.5">We'll call you back within 24 hours</p>
          </div>
          <div className="p-4">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="text-brand-success text-3xl mb-2">✓</div>
                <p className="text-brand-darkGray font-medium text-sm">Thank you! We'll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="form-input text-sm py-2.5" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="form-input text-sm py-2.5" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." rows={3} className="form-input text-sm py-2.5 resize-none" />
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full text-sm py-2.5">
                  {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                </button>
                {status === 'error' && <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => handleSubmit()}
      />
    </div>
  )
}
