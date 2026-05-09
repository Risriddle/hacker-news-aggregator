
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useNavigate} from "react-router-dom"
import '../css/Auth.css';

function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message || 'Invalid email or password.');
      return;
    }

    console.log(data, "logged in");
    login(data.data, data.jwtToken);
    localStorage.setItem('user', JSON.stringify(data.data));
    localStorage.setItem('token', data.jwtToken);
    navigate("/",{replace:true});
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__brand-dot" />
          Readmark
        </div>

        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__subtitle">Log in to see your saved stories.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email-input" className="auth-label">Email</label>
            <input
              id="email-input"
              name="email"
              required
              type="email"
              className="auth-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password-input" className="auth-label">Password</label>
            <input
              aria-describedby="password-hint"
              id="password-input"
              name="password"
              required
              type="password"
              className="auth-input"
              placeholder="Your password"
            />
            <p id="password-hint" className="auth-hint">
              Your password must be at least 8 characters long.
            </p>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="auth-btn__spinner" /> : 'Log in'}
          </button>

          <p className="auth-footer-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;