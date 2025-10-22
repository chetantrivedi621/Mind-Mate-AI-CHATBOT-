import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/users/reset-password', {
        token,
        newPassword: formData.newPassword
      });
      
      setMessage('Password has been reset successfully!');
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Error resetting password. Please try again.'
      });
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
          <h2 className="login-form-title">Set New Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="New Password"
              />
              {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>

            {message && <span className="success-text">{message}</span>}
            {errors.submit && <span className="error-text">{errors.submit}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 