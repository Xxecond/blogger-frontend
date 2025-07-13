import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../services/authService';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await signupUser(email, password);

    if (!result.error) {
      if (rememberMe) {
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('userEmail');
      }

      setMessage('✅ Signup successful! Check your email to verify.');
      setTimeout(() => navigate('/login?signup=true'), 3000);
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        <form onSubmit={handleSignup}>
          <h2>Create an Account</h2>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box password-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {' '}Remember me
            </label>
          </div>

          <button type="submit" className="btn">Signup</button>

          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

          {message && (
            <p className={message.startsWith('✅') ? 'success' : 'error'}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
