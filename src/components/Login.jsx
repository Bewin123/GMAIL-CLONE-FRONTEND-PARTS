import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginMessage('');

    if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    try {
      const response = await axios.post('https://gmail-clone-backend-parts-4.onrender.com/api/login', { email, password });
      setLoginMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect to the dashboard or another page after login
    } catch (error) {
      console.error('Error logging in user:', error.response?.data || error.message);
      setLoginMessage(error.response?.data.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`input-field ${emailError ? 'error' : ''}`}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`input-field ${passwordError ? 'error' : ''}`}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        {loginMessage && <p className="success-message">{loginMessage}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;






