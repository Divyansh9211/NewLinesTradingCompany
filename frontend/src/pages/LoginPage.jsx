import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/layout/Footer';

function LoginPage() {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();

  useEffect(() => {
    document.body.classList.add('login-page-body');
    const prevTitle = document.title;
    document.title = 'NLTC | Login & Signup';
    return () => {
      document.body.classList.remove('login-page-body');
      document.title = prevTitle;
    };
  }, []);

  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please provide email/phone and password');
      return;
    }

    const res = await login({ email: loginEmail.trim(), password: loginPassword });

    if (res.success) {
      setLoginSuccess('Login Successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setLoginError(res.message || 'Invalid email or password');
    }
  };

  // Signup handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setSignupError('Please fill in all required fields');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setSignupError('Please agree to Terms & Conditions');
      return;
    }

    const res = await register({
      name: signupName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim(),
      password: signupPassword,
    });

    if (res.success) {
      setSignupSuccess('Account Created Successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } else {
      setSignupError(res.message || 'Registration failed');
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div className="background-overlay"></div>

      {/* Main Container */}
      <div className="main-container">
        {/* Header */}
        <header className="header">
          <Link to="/">
            <img src="/NLTClogo.png" alt="NLTC Logo" className="logo" />
          </Link>
          <p className="tagline">
            <span className="gold-text">Premium</span>{' '}
            <span className="red-text">Party Decorations </span> items for Every Celebration
          </p>
          <div className="tag-line-design">
            <span className="red-line"></span>
            <span className="gold-dot"></span>
            <span className="gold-line"></span>
          </div>
        </header>

        {/* Form Wrapper */}
        <section className="form-wrapper">
          {/* Login Card */}
          <div className="login-card glass-card">
            <div className="circle-icon login-icon">
              <i className="fa-regular fa-user"></i>
            </div>

            <h2>
              Welcome <span>Back!</span>
            </h2>

            <p className="sub-heading">Login to continue to your account</p>

            {loginError && (
              <div
                style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid red',
                  color: 'red',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                {loginError}
              </div>
            )}

            {loginSuccess && (
              <div
                style={{
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  border: '1px solid #2e7d32',
                  color: '#2e7d32',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                {loginSuccess}
              </div>
            )}

            <form className="login-form" onSubmit={handleLoginSubmit}>
              {/* Email */}
              <div className={`input-box ${loginEmail ? 'active' : ''}`}>
                <i className="fa-regular fa-user left-icon"></i>
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className={`input-box ${loginPassword ? 'active' : ''}`}>
                <i className="fa-solid fa-lock left-icon"></i>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  id="loginPassword"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa-regular ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'} right-icon togglePassword`}
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              {/* Remember */}
              <div className="remember-forgot">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}{' '}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span></span>
              <p>Or login with</p>
              <span></span>
            </div>

            {/* Social Login */}
            <div className="social-icons">
              <a href="#" className="social-btn google-btn" onClick={(e) => e.preventDefault()}>
                <svg className="google-icon" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </a>
              <a href="#" className="social-btn facebook-btn" onClick={(e) => e.preventDefault()}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social-btn email-btn" onClick={(e) => e.preventDefault()}>
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>

            <div className="bottom-text">
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                Sign Up
              </a>
            </div>
          </div>

          {/* Middle OR Divider */}
          <div className="middle-divider">
            <div className="or-circle">
              <span>or</span>
            </div>
          </div>

          {/* Signup Card */}
          <div className="signup-card glass-card">
            <div className="circle-icon signup-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>

            <h2>
              Create <span>Your Account</span>
            </h2>

            <p className="sub-heading">Join us and start exploring</p>

            {signupError && (
              <div
                style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid red',
                  color: 'red',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                {signupError}
              </div>
            )}

            {signupSuccess && (
              <div
                style={{
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  border: '1px solid #2e7d32',
                  color: '#2e7d32',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                {signupSuccess}
              </div>
            )}

            <form className="signup-form" onSubmit={handleSignupSubmit}>
              {/* Full Name */}
              <div className={`input-box ${signupName ? 'active' : ''}`}>
                <i className="fa-regular fa-user left-icon"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className={`input-box ${signupEmail ? 'active' : ''}`}>
                <i className="fa-regular fa-envelope left-icon"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className={`input-box ${signupPhone ? 'active' : ''}`}>
                <i className="fa-solid fa-phone left-icon"></i>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className={`input-box ${signupPassword ? 'active' : ''}`}>
                <i className="fa-solid fa-lock left-icon"></i>
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  id="signupPassword"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa-regular ${showSignupPassword ? 'fa-eye-slash' : 'fa-eye'} right-icon togglePassword`}
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              {/* Confirm Password */}
              <div className={`input-box ${confirmPassword ? 'active' : ''}`}>
                <i className="fa-solid fa-lock left-icon"></i>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} right-icon togglePassword`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              {/* Terms */}
              <div className="terms">
                <label>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>
                    I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a> and{' '}
                    <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Signup Button */}
              <button className="signup-btn" type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}{' '}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <div className="bottom-text">
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Login
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LoginPage;
