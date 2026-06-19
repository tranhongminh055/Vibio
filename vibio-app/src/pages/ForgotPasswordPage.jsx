import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import './LoginPage.css'

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export default function ForgotPasswordPage() {
  const videoRef = useRef(null)

  /* Auto-unmute video on first user interaction (click/key/touch) */
  useEffect(() => {
    const unmute = () => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.play().catch(() => {})
      }
      document.removeEventListener('click', unmute)
      document.removeEventListener('keydown', unmute)
      document.removeEventListener('touchstart', unmute)
    }
    document.addEventListener('click', unmute, { once: true })
    document.addEventListener('keydown', unmute, { once: true })
    document.addEventListener('touchstart', unmute, { once: true })
    return () => {
      document.removeEventListener('click', unmute)
      document.removeEventListener('keydown', unmute)
      document.removeEventListener('touchstart', unmute)
    }
  }, [])

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setShowPopup(false)
    setPopupMessage('')
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Email is invalid'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      setShowPopup(true)
      if (error.code === 'auth/user-not-found') {
        setPopupMessage('Tài khoản không tồn tại.')
      } else if (error.code === 'auth/invalid-email') {
        setPopupMessage('Email không hợp lệ.')
      } else {
        setPopupMessage('Có lỗi xảy ra. Vui lòng thử lại.')
      }
      setTimeout(() => setShowPopup(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page" id="forgot-password-page">
      <div className="login-bg">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="login-bg__video"
        >
          <source src="/videos/Resident Evil 9 Requiem - Official Trailer  State of Play 2026 - IGN (1080p, h264).mp4" type="video/mp4" />
        </video>
        <div className="login-bg__overlay" />
        <div className="login-bg__vignette" />
      </div>

      <div className="watermark" aria-hidden="true">
        <span className="watermark__text">VIBIO</span>
      </div>

      <header className="login-header" id="forgot-header">
        <div className="login-header__logo">
          <span className="logo-text">VIBIO</span>
        </div>
        <nav className="login-header__nav">
          <button className="btn-language" id="btn-language">
            <span>🌐</span> English
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          <Link to="/login" className="btn-signin" id="btn-signin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Sign In</Link>
        </nav>
      </header>

      <main className="login-main">
        <div className="login-card" id="forgot-card">
          <div className="login-card__glow" />

          {/* Error Popup Overlay */}
          {showPopup && (
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--vibio-red)',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 16px rgba(229, 9, 20, 0.5)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'errorSlide 0.3s ease-out'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {popupMessage || 'Đã có lỗi xảy ra!'}
            </div>
          )}

          <h1 className="login-card__title">
            {isSuccess ? 'Check Your Inbox' : 'Reset Password'}
          </h1>
          <p className="login-card__subtitle">
            {isSuccess
              ? `We have sent a password reset link to ${email}. Please check your inbox and follow the instructions.`
              : 'Enter your email to receive a reset link.'}
          </p>

          {isSuccess ? (
            <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
              <Link to="/login" className="btn-submit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>Back to Sign In</Link>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleEmailSubmit} noValidate>
              <div className={`input-group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''} ${errors.email ? 'error' : ''}`}>
                <span className="input-group__icon">
                  <MailIcon />
                </span>
                <div className="input-group__field">
                  <input
                    type="email"
                    id="input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="input-email">Email Address</label>
                </div>
                {errors.email && <span className="input-group__error">{errors.email}</span>}
              </div>

              <button type="submit" className={`btn-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? <span className="btn-submit__spinner" /> : 'Send Reset Link'}
              </button>
            </form>
          )}

          {!isSuccess && (
            <p className="login-card__footer">
              Remember your password?{' '}
              <Link to="/login" className="link-login" id="link-login">Sign in now</Link>
            </p>
          )}

          <div className="login-card__accent login-card__accent--tl" />
          <div className="login-card__accent login-card__accent--br" />
        </div>
      </main>

      <footer className="login-footer" id="login-footer">
        <p>&copy; 2026 VIBIO. All rights reserved.</p>
      </footer>
    </div>
  )
}
