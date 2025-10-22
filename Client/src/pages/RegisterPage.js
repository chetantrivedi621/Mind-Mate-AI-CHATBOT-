import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all solid icons to the library
library.add(fas);

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
    
    // Also clear API error when user makes any change
    if (apiError) {
      setApiError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users', 
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.token) {
        await login(response.data);
        navigate('/chat');
      } else {
        setApiError('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.request) {
        setApiError('Server not responding. Please try again later.');
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left Section */}
        <div className="register-left">
          <div className="logo-container">
          <model-viewer
            src="/3d-robot.glb"
            alt="Logo"
            class="register-logo"
            auto-rotate
            camera-controls
            ar
            style={{ width: '20rem', height: '20rem' }}>
          </model-viewer>
          </div>
          <h2 className="welcome-text">AI-CHATBOT</h2>
          <p className="brand-description">
            Your AI companion for intelligent conversations
          </p>
        </div>

        {/* Right Section */}
        <div className="register-right">
          <h2 className="register-form-title">Create Your Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="name" className="input-label">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password (min. 6 characters)"
                  autoComplete="new-password"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Create Account'
              )}
            </button>

            {apiError && <div className="error-message">{apiError}</div>}
            
            <div className="login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;