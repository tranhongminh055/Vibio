import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import './LoginPage.css'

/* ——— SVG Icon helpers ——— */
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [popupMessage, setPopupMessage] = useState('')

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Email format is invalid'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMessage('')
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      if (errs.email === 'Email format is invalid') {
        setPopupMessage('Email không hợp lệ')
        setTimeout(() => setPopupMessage(''), 3000)
      } else if (errs.password === 'Password must be at least 6 characters') {
        setPopupMessage('Mật khẩu quá ngắn')
        setTimeout(() => setPopupMessage(''), 3000)
      }
      return
    }

    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('vibio_authenticated', 'true')
      localStorage.setItem('vibio_user', userCredential.user.email)
      navigate('/home')
    } catch (err) {
      console.error('Login Error:', err)
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setPopupMessage('Sai email hoặc mật khẩu')
      } else {
        setPopupMessage('Lỗi kết nối tới Firebase')
      }
      setTimeout(() => setPopupMessage(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <div className="login-page" id="signin-page">
      {/* Video Watermark Background */}
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

      <header className="login-header" id="signin-header">
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
          <Link to="/register" className="btn-signin" id="btn-register" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Sign Up</Link>
        </nav>
      </header>

      <main className="login-main">
        <div className="login-card" id="signin-card">
          <div className="login-card__glow" />

          {/* Error Popup Overlay */}
          {popupMessage && (
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--vibio-red, #E50914)',
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
              animation: 'errorSlide 0.3s ease-out',
              whiteSpace: 'nowrap'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {popupMessage}
            </div>
          )}

          <h1 className="login-card__title">Sign In</h1>
          <p className="login-card__subtitle">
            Welcome back to VIBIO.
          </p>

          <form className="login-form" id="signin-form" onSubmit={handleSubmit} noValidate>
            <div className={`input-group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''} ${errors.email ? 'error' : ''}`}>
              <span className="input-group__icon">
                <UserIcon />
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

            <div className={`input-group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has-value' : ''} ${errors.password ? 'error' : ''}`}>
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <div className="input-group__field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="input-password">Password</label>
              </div>
              <button
                type="button"
                className="input-group__toggle"
                id="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.password && <span className="input-group__error">{errors.password}</span>}
            </div>

            <div className="login-form__options" id="signin-form-options">
              <label className="checkbox-group" id="checkbox-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="checkbox-group__box">
                  {remember && <CheckIcon />}
                </span>
                <span className="checkbox-group__label">Remember me</span>
              </label>
              <Link to="/forgot-password" className="link-forgot" id="link-forgot">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className={`btn-submit ${isLoading ? 'loading' : ''}`}
              id="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-submit__spinner" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="login-card__footer">
            New to VIBIO?{' '}
            <Link to="/register" className="link-login" id="link-register">Sign up now</Link>
          </p>

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
