

import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import api from '../api/axios'
import '../css/Auth.css';

function SignUp() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
  setLoading(true);

   await api.post('/auth/register', {
    email: formData.get('email'),
    password: formData.get('password'),
  });

  setLoading(false);

  setSuccess(true);
  navigate("/login", { replace: true });

} catch (error) {
  setLoading(false);

  setError(
    error.response?.data?.message ||
    'Something went wrong. Please try again.'
  );
}
  }

  

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-card__brand-dot" />
          Readmark
        </div>

        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__subtitle">Start saving stories that matter to you.</p>

        {success ? (
          <div className="auth-success">
            <span className="auth-success__icon">✓</span>
            <p>Account created! You can now log in.</p>
          </div>
        ) : (
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
                placeholder="Min. 8 characters"
              />
              <p id="password-hint" className="auth-hint">
                Your password must be at least 8 characters long.
              </p>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-btn__spinner" /> : 'Sign up'}
            </button>

            <p className="auth-footer-link">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;