import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/doodle-chatbot-home-image.svg" alt="Logo" className="login-logo" />
          <h2 className="welcome-text">Reset Password</h2>
          <p className="register-link">
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </div>

        <div className="login-right">
          <h2 className="login-form-title">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {message && <span className="success-text">{message}</span>}
            {error && <span className="error-text">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 