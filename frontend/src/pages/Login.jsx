import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem('rememberedEmail')
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        'https://job-tracker-1-5afr.onrender.com/api/auth/login',
        form
      );
      if (!res.data.token) throw new Error('No token received');
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', form.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="left">
          <h2>Welcome to My Dashboard</h2>
          <p>Login to access your account</p>
        </div>

        <div className="right">
          <div className="login-box">
            <h3>Login</h3>

            {error && <p className="error">{error}</p>}

            {showForgot && (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '14px',
                fontSize: '13px',
                color: '#1d4ed8',
                textAlign: 'center',
              }}>
                📧 Please contact us at <strong>support@jobtracker.com</strong> to reset your password.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'LOG IN'}
              </button>
            </form>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <span
                className="forgot"
                onClick={() => setShowForgot(!showForgot)}
              >
                Forgot password?
              </span>
            </div>

            <p className="register">
              Don't have an account?{' '}
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}