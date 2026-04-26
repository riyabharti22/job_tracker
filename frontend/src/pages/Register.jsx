import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="card">

        <div className="left">
          <h2>Create Your Account</h2>
          <p>Start tracking your applications easily</p>
        </div>

        <div className="right">
          <div className="login-box">

            <h3>Register</h3>

            {error && <p className="error">{error}</p>}
            {success && <p style={{ color: 'green', marginBottom: '12px' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="submit">CREATE ACCOUNT</button>
            </form>

            <p className="register">
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}