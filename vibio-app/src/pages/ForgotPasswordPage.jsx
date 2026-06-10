import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setPopupMessage('')
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Email is invalid'

    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      if (errs.email === 'Email is invalid') {
        setPopupMessage('Email không hợp lệ')
        setTimeout(() => setPopupMessage(''), 3000)
      }
      return
    }

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setStep(2)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setPopupMessage('')
    const errs = {}
    if (!otp.trim()) errs.otp = 'OTP is required'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)

    if (otp === '123456') { // Mock correct OTP
      setStep(3)
    } else {
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPopupMessage('')
    const errs = {}
    if (!newPassword) errs.newPassword = 'Password is required'
    else if (newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters'

    // xac nhan mat khau
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="login-page" id="forgot-password-page">
      <div className="login-bg">
        <div className="login-bg__image" />
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
              Invalid OTP! Please try again.
            </div>
          )}

          <h1 className="login-card__title">
            {isSuccess ? 'Success!' : step === 1 ? 'Reset Password' : step === 2 ? 'Verify OTP' : 'New Password'}
          </h1>
          <p className="login-card__subtitle">
            {isSuccess
              ? 'Your password has been successfully reset.'
              : step === 1
                ? 'Enter your email to receive a reset link.'
                : step === 2
                  ? `Enter the 6-digit OTP sent to ${email}`
                  : 'Please enter your new password below.'}
          </p>

          {isSuccess ? (
            <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
              <Link to="/login" className="btn-submit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>Back to Sign In</Link>
            </div>
          ) : step === 1 ? (
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
          ) : step === 2 ? (
            <form className="login-form" onSubmit={handleOtpSubmit} noValidate>
              <div className={`input-group ${focusedField === 'otp' ? 'focused' : ''} ${otp ? 'has-value' : ''} ${errors.otp ? 'error' : ''}`}>
                <span className="input-group__icon">
                  <KeyIcon />
                </span>
                <div className="input-group__field">
                  <input
                    type="text"
                    id="input-otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onFocus={() => setFocusedField('otp')}
                    onBlur={() => setFocusedField(null)}
                    maxLength={6}
                    required
                  />
                  <label htmlFor="input-otp">Enter 6-digit OTP</label>
                </div>
                {errors.otp && <span className="input-group__error">{errors.otp}</span>}
              </div>

              <button type="submit" className={`btn-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? <span className="btn-submit__spinner" /> : 'Verify OTP'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <p>(For testing, use OTP: <strong>123456</strong>)</p>
              </div>
            </form>
          ) : (
            <form className="login-form" onSubmit={handlePasswordSubmit} noValidate>
              <div className={`input-group ${focusedField === 'newPassword' ? 'focused' : ''} ${newPassword ? 'has-value' : ''} ${errors.newPassword ? 'error' : ''}`}>
                <span className="input-group__icon">
                  <LockIcon />
                </span>
                <div className="input-group__field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="input-new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setFocusedField('newPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="input-new-password">New Password</label>
                </div>
                <button
                  type="button"
                  className="input-group__toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                {errors.newPassword && <span className="input-group__error">{errors.newPassword}</span>}
              </div>

              <div className={`input-group ${focusedField === 'confirmPassword' ? 'focused' : ''} ${confirmPassword ? 'has-value' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
                <span className="input-group__icon">
                  <LockIcon />
                </span>
                <div className="input-group__field">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    id="input-confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="input-confirm-password">Confirm Password</label>
                </div>
                <button
                  type="button"
                  className="input-group__toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                {errors.confirmPassword && <span className="input-group__error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className={`btn-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? <span className="btn-submit__spinner" /> : 'Change Password'}
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
