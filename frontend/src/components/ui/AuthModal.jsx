import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { loginWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSuccess = async (credentialResponse) => {
    setLoading(true)
    setError('')
    const result = await loginWithGoogle(credentialResponse.credential)
    setLoading(true) // keep spinner for transition
    if (result.success) {
      if (onSuccess) onSuccess()
      onClose()
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-secondary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-mega overflow-hidden border border-brand-border animate-fade-in-up z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-lightGray text-brand-darkGray
                     flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
        >
          <FaTimes size={14} />
        </button>

        {/* Brand Header */}
        <div className="bg-brand-secondary p-6 text-center text-white">
          <h3 className="font-display text-xl font-bold">Authentication Required</h3>
          <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider font-semibold">
            Please log in to continue
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-brand-darkGray text-center leading-relaxed mb-6">
            To submit your inquiry and get a customized quote, please quickly sign in with your Google account.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
                <span className="text-xs text-brand-midGray font-medium">Authenticating…</span>
              </div>
            ) : (
              <div className="w-full flex justify-center transform hover:scale-[1.02] transition-transform duration-200">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => setError('Google Login failed.')}
                  shape="pill"
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                  width="100%"
                />
              </div>
            )}

            {error && (
              <div className="w-full bg-red-50 text-red-600 rounded-xl p-2.5 text-xs text-center border border-red-100 font-medium">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border text-center text-[10px] text-brand-midGray">
            Secured via Google OAuth 2.0
          </div>
        </div>
      </div>
    </div>
  )
}
