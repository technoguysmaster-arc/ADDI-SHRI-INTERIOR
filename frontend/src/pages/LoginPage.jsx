import { GoogleLogin } from '@react-oauth/google'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function LoginPage() {
  const { loginWithGoogle, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to home if already logged in
  if (isAuthenticated) {
    navigate('/')
    return null
  }

  const from = location.state?.from?.pathname || '/'

  const handleSuccess = async (credentialResponse) => {
    setLoading(true)
    setError('')
    const result = await loginWithGoogle(credentialResponse.credential)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | AADI SHRI INTERIOR</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-brand-cream">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-mega overflow-hidden border border-brand-border">
          {/* Top banner visual decoration */}
          <div className="bg-brand-secondary p-8 text-center text-white relative">
            <div className="absolute inset-0 bg-gradient-brand opacity-10" />
            <h2 className="font-display text-2xl font-bold tracking-tight">Welcome to Aadi Shri</h2>
            <p className="text-white/60 text-xs mt-1.5 uppercase tracking-wider font-semibold">
              Complete Interior & Exterior Solutions
            </p>
          </div>

          <div className="p-8">
            <p className="text-sm text-brand-darkGray text-center leading-relaxed mb-8">
              Please sign in using your Google account to get access to lead submissions, project calculators, and free consultations.
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
                  <span className="text-xs text-brand-midGray font-medium">Verifying account…</span>
                </div>
              ) : (
                <div className="w-full flex justify-center transform hover:scale-[1.02] transition-transform duration-200">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => setError('Google OAuth Login failed. Please try again.')}
                    useOneTap
                    shape="pill"
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                    width="100%"
                  />
                </div>
              )}

              {error && (
                <div className="w-full bg-red-50 text-red-600 rounded-xl p-3 text-xs text-center border border-red-100 font-medium">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border text-center">
              <span className="text-xs text-brand-midGray">
                By logging in, you agree to our Terms of Service and Privacy Policy.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
